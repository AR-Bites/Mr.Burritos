import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(), // Changed to text to match storage
  category: varchar("category", { length: 50 }).notNull(),
  imageUrl: text("image_url").notNull(),
  spiceLevel: integer("spice_level").notNull().default(0), // 0-3
  isVegetarian: boolean("is_vegetarian").notNull().default(false),
  isVegan: boolean("is_vegan").notNull().default(false),
  isGlutenFree: boolean("is_gluten_free").notNull().default(false),
  ingredients: jsonb("ingredients").$type<string[]>().notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  modelPath: text("model_path").default(null), // Optional 3D model path
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  menuItemId: varchar("menu_item_id").notNull().references(() => menuItems.id),
  quantity: integer("quantity").notNull().default(1),
  sessionId: varchar("session_id").notNull(),
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
});

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

// Categories enum for type safety
export const CATEGORIES = {
  TACOS: "tacos",
  BURRITOS: "burritos", 
  BURGERS: "burgers",
  FAVORITES: "favorites",
  SIDES: "sides",
  SAUCES: "sauces",
  HEALTHY_CORNER: "healthy_corner",
  VEGETARIAN: "vegetarian",
  DRINKS: "drinks",
  OFFERS: "offers",
  KIDS: "kids",
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];
