import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItem } from "@shared/schema";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (menuItemId: string, quantity: number) => void;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    staleTime: 0,
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ menuItemId, quantity }: { menuItemId: string; quantity: number }) => {
      const response = await apiRequest("POST", "/api/cart", { menuItemId, quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await apiRequest("PUT", `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const addToCart = (menuItemId: string, quantity: number) => {
    addToCartMutation.mutate({ menuItemId, quantity });
  };

  const updateCartItem = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartMutation.mutate({ id, quantity });
    }
  };

  const removeFromCart = (id: string) => {
    removeFromCartMutation.mutate(id);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
