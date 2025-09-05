import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema } from "@shared/schema";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve 3D model files from attached_assets with proper MIME type
  app.use('/attached_assets', (req, res, next) => {
    if (req.path.endsWith('.glb')) {
      res.setHeader('Content-Type', 'model/gltf-binary');
    }
    next();
  }, express.static(path.join(process.cwd(), 'attached_assets')));

  // Menu items routes
  app.get("/api/menu", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let items;
      if (search) {
        items = await storage.searchMenuItems(search as string);
      } else if (category && category !== 'all') {
        items = await storage.getMenuItemsByCategory(category as string);
      } else {
        items = await storage.getMenuItems();
      }
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu/:id", async (req, res) => {
    try {
      const item = await storage.getMenuItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu item" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as any).sessionID || 'anonymous';
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as any).sessionID || 'anonymous';
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId,
      });
      
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      const updatedItem = await storage.updateCartItem(req.params.id, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeCartItem(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as any).sessionID || 'anonymous';
      await storage.clearCart(sessionId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
