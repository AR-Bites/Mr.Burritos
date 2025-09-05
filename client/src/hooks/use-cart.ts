import { useContext } from "react";
import { CartContext } from "@/components/cart-context";

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
