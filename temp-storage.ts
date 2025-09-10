import { type MenuItem, type InsertMenuItem, type CartItem, type InsertCartItem, CATEGORIES } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Menu items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  searchMenuItems(query: string): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  // Cart items
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<string, MenuItem>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.menuItems = new Map();
    this.cartItems = new Map();
    this.seedMenuItems();
  }

  private seedMenuItems() {
    const items: MenuItem[] = [
      // 🌮 TACOS
      {
        id: "1",
        name: "Chicken Grilled (Hard)",
        description: "Grilled chicken in crispy hard shell taco with fresh toppings",
        price: "1.70 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["grilled chicken", "hard taco shell", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/tacos/chicken-hard-taco.glb"
      },
      {
        id: "2",
        name: "Chicken Grilled (Soft)",
        description: "Grilled chicken in soft flour tortilla with fresh toppings",
        price: "1.85 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["grilled chicken", "soft tortilla", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/tacos/chicken-soft-taco.glb"
      },
      {
        id: "3",
        name: "Beef (Hard)",
        description: "Seasoned ground beef in crispy hard shell taco",
        price: "1.75 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["ground beef", "hard taco shell", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/tacos/beef-hard-taco.glb"
      },
      {
        id: "4",
        name: "Beef (Soft)",
        description: "Seasoned ground beef in soft flour tortilla",
        price: "1.99 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["ground beef", "soft tortilla", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/tacos/beef-soft-taco.glb"
      },
      {
        id: "5",
        name: "Hawaiian",
        description: "Tropical fusion taco with pineapple and ham",
        price: "1.80 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["ham", "pineapple", "soft tortilla", "lettuce", "cheese"],
        isAvailable: true,
        modelPath: "/models/tacos/hawaiian-taco.glb"
      },
      {
        id: "6",
        name: "Cherry Beef",
        description: "Sweet and savory beef taco with cherry sauce",
        price: "1.99 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["beef", "cherry sauce", "soft tortilla", "lettuce"],
        isAvailable: true,
        modelPath: "/models/tacos/cherry-beef-taco.glb"
      },
      {
        id: "7",
        name: "Dynamite Chicken",
        description: "Spicy chicken taco with explosive flavor",
        price: "1.85 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 3,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["spicy chicken", "dynamite sauce", "soft tortilla", "lettuce"],
        isAvailable: true,
        modelPath: "/models/tacos/dynamite-chicken-taco.glb"
      },
      {
        id: "8",
        name: "Dynamite Shrimp",
        description: "Crispy shrimp with spicy dynamite sauce",
        price: "2.49 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 3,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["shrimp", "dynamite sauce", "soft tortilla", "cabbage"],
        isAvailable: true,
        modelPath: "/models/tacos/dynamite-shrimp-taco.glb"
      },
      {
        id: "9",
        name: "Birria Taco (2 pcs)",
        description: "Tender slow-cooked beef in corn tortillas with consommé for dipping",
        price: "6.00 JD",
        category: CATEGORIES.TACOS,
        imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["birria beef", "corn tortillas", "consommé", "onions", "cilantro"],
        isAvailable: true,
        modelPath: "/models/tacos/birria-taco.glb"
      },

      // 🌯 BURRITOS
      {
        id: "10",
        name: "Super Burrito (Chicken 12\")",
        description: "Large chicken burrito with rice, beans, cheese, and fresh toppings",
        price: "5.25 JD",
        category: CATEGORIES.BURRITOS,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["grilled chicken", "rice", "beans", "cheese", "lettuce", "tomato", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/burritos/super-chicken-burrito.glb"
      },
      {
        id: "11",
        name: "Super Burrito (Beef 12\")",
        description: "Large beef burrito with rice, beans, cheese, and fresh toppings",
        price: "5.49 JD",
        category: CATEGORIES.BURRITOS,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["ground beef", "rice", "beans", "cheese", "lettuce", "tomato", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/burritos/super-beef-burrito.glb"
      },
      {
        id: "12",
        name: "California Style Burrito 12\"",
        description: "West coast style burrito with fresh avocado and unique toppings",
        price: "5.25 JD",
        category: CATEGORIES.BURRITOS,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken", "avocado", "rice", "beans", "cheese", "sour cream", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/burritos/california-burrito.glb"
      },
      {
        id: "13",
        name: "Dynamite Burrito 12\"",
        description: "Spicy burrito with dynamite sauce and bold flavors",
        price: "5.25 JD",
        category: CATEGORIES.BURRITOS,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 3,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["spicy chicken", "dynamite sauce", "rice", "beans", "cheese", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/burritos/dynamite-burrito.glb"
      },
      {
        id: "14",
        name: "Burrito Bowl (Customize your own)",
        description: "Build your own burrito bowl with your choice of ingredients",
        price: "5.25 JD",
        category: CATEGORIES.BURRITOS,
        imageUrl: "https://pixabay.com/get/g10911d1a7c3f29d43466505cb30da4bf371fba7f0ee302c56d5ea6eeabc22ac91c97f8ff897a8b17ae687fd9f791ef3dd22fc30c6da155e3cc9be390b2ba55a2_1280.jpg",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["rice", "beans", "choice of protein", "cheese", "lettuce", "tomato"],
        isAvailable: true,
        modelPath: "/models/burritos/burrito-bowl.glb"
      },
      {
        id: "15",
        name: "Zinger 12\"",
        description: "Crispy fried chicken burrito with special zinger sauce",
        price: "4.20 JD",
        category: CATEGORIES.BURRITOS,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["fried chicken", "zinger sauce", "lettuce", "tomato", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/burritos/zinger-burrito.glb"
      },
      {
        id: "16",
        name: "Turkey Burrito 10\"",
        description: "Lean turkey burrito with fresh vegetables",
        price: "1.85 JD",
        category: CATEGORIES.BURRITOS,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["turkey", "lettuce", "tomato", "cheese", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/burritos/turkey-burrito.glb"
      },

      // 🍔 BURGERS
      {
        id: "17",
        name: "Chicken Grilled (2 pcs)",
        description: "Two grilled chicken burgers with fresh toppings",
        price: "3.75 JD",
        category: CATEGORIES.BURGERS,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["grilled chicken", "burger bun", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/burgers/chicken-grilled-burger.glb"
      },
      {
        id: "18",
        name: "Classic (2 pcs)",
        description: "Two classic beef burgers with traditional toppings",
        price: "4.75 JD",
        category: CATEGORIES.BURGERS,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["beef patty", "burger bun", "lettuce", "tomato", "cheese", "pickles"],
        isAvailable: true,
        modelPath: "/models/burgers/classic-burger.glb"
      },
      {
        id: "19",
        name: "Mushroom (2 pcs)",
        description: "Two burgers topped with sautéed mushrooms",
        price: "4.75 JD",
        category: CATEGORIES.BURGERS,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["beef patty", "mushrooms", "burger bun", "lettuce", "cheese"],
        isAvailable: true,
        modelPath: "/models/burgers/mushroom-burger.glb"
      },
      {
        id: "20",
        name: "Mr. Smokey (2 pcs)",
        description: "Two smoky flavored burgers with special BBQ sauce",
        price: "4.75 JD",
        category: CATEGORIES.BURGERS,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["beef patty", "BBQ sauce", "burger bun", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/burgers/smokey-burger.glb"
      },

      // ⭐ FAVORITES
      {
        id: "21",
        name: "Arabian Fajita",
        description: "Middle Eastern inspired fajita with aromatic spices",
        price: "3.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["chicken", "onions", "bell peppers", "arabian spices", "tortillas"],
        isAvailable: true,
        modelPath: "/models/favorites/arabian-fajita.glb"
      },
      {
        id: "22",
        name: "Fajita Platter (Elvis)",
        description: "Premium fajita platter with guacamole and sour cream (+1.00 JD for extras)",
        price: "5.99 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["chicken", "bell peppers", "onions", "guacamole", "sour cream", "tortillas"],
        isAvailable: true,
        modelPath: "/models/favorites/elvis-fajita-platter.glb"
      },
      {
        id: "23",
        name: "Quesadilla Chicken",
        description: "Grilled flour tortilla filled with chicken and melted cheese",
        price: "5.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["grilled chicken", "cheese", "flour tortilla", "bell peppers"],
        isAvailable: true,
        modelPath: "/models/favorites/chicken-quesadilla.glb"
      },
      {
        id: "24",
        name: "Quesadilla Beef",
        description: "Grilled flour tortilla filled with seasoned beef and cheese",
        price: "5.49 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["ground beef", "cheese", "flour tortilla", "onions"],
        isAvailable: true,
        modelPath: "/models/favorites/beef-quesadilla.glb"
      },
      {
        id: "25",
        name: "Quesadilla Birria",
        description: "Premium birria beef quesadilla with consommé for dipping",
        price: "6.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["birria beef", "cheese", "flour tortilla", "consommé"],
        isAvailable: true,
        modelPath: "/models/favorites/birria-quesadilla.glb"
      },
      {
        id: "26",
        name: "Quesadilla Vegetarian",
        description: "Grilled tortilla with mixed vegetables and cheese",
        price: "4.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["bell peppers", "onions", "mushrooms", "cheese", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/favorites/vegetarian-quesadilla.glb"
      },
      {
        id: "27",
        name: "Tostada Chicken",
        description: "Crispy flat tortilla topped with chicken and fresh toppings",
        price: "4.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["grilled chicken", "crispy tortilla", "beans", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/favorites/chicken-tostada.glb"
      },
      {
        id: "28",
        name: "Tostada Beef",
        description: "Crispy flat tortilla topped with seasoned beef and fresh toppings",
        price: "5.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["ground beef", "crispy tortilla", "beans", "lettuce", "tomato", "cheese"],
        isAvailable: true,
        modelPath: "/models/favorites/beef-tostada.glb"
      },
      {
        id: "29",
        name: "Dynamite Bowl Chicken",
        description: "Spicy chicken bowl with dynamite sauce over rice",
        price: "4.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://pixabay.com/get/g10911d1a7c3f29d43466505cb30da4bf371fba7f0ee302c56d5ea6eeabc22ac91c97f8ff897a8b17ae687fd9f791ef3dd22fc30c6da155e3cc9be390b2ba55a2_1280.jpg",
        spiceLevel: 3,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["spicy chicken", "rice", "dynamite sauce", "lettuce", "tomato"],
        isAvailable: true,
        modelPath: "/models/favorites/dynamite-chicken-bowl.glb"
      },
      {
        id: "30",
        name: "Dynamite Bowl Shrimp",
        description: "Crispy shrimp bowl with spicy dynamite sauce over rice",
        price: "6.25 JD",
        category: CATEGORIES.FAVORITES,
        imageUrl: "https://pixabay.com/get/g10911d1a7c3f29d43466505cb30da4bf371fba7f0ee302c56d5ea6eeabc22ac91c97f8ff897a8b17ae687fd9f791ef3dd22fc30c6da155e3cc9be390b2ba55a2_1280.jpg",
        spiceLevel: 3,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["crispy shrimp", "rice", "dynamite sauce", "cabbage", "tomato"],
        isAvailable: true,
        modelPath: "/models/favorites/dynamite-shrimp-bowl.glb"
      },

      // 🍟 SIDES
      {
        id: "31",
        name: "Garlic Tortilla",
        description: "Warm flour tortilla with garlic butter",
        price: "1.49 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["flour tortilla", "garlic butter"],
        isAvailable: true,
        modelPath: "/models/sides/garlic-tortilla.glb"
      },
      {
        id: "32",
        name: "Tortilla Chips & Salsa",
        description: "Crispy tortilla chips served with fresh salsa",
        price: "1.45 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1582169296194-854173e19d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["corn tortilla chips", "tomato salsa", "onions", "cilantro"],
        isAvailable: true,
        modelPath: "/models/sides/chips-salsa.glb"
      },
      {
        id: "33",
        name: "Curly Fries",
        description: "Seasoned spiral-cut potato fries",
        price: "1.60 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["potatoes", "seasoning"],
        isAvailable: true,
        modelPath: "/models/sides/curly-fries.glb"
      },
      {
        id: "34",
        name: "French Fries / Steak Fries",
        description: "Classic crispy potato fries",
        price: "1.45 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["potatoes", "salt"],
        isAvailable: true,
        modelPath: "/models/sides/french-fries.glb"
      },
      {
        id: "35",
        name: "Mexican Fries",
        description: "Fries topped with Mexican cheese and spices",
        price: "3.49 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["potatoes", "mexican cheese", "jalapeños", "spices"],
        isAvailable: true,
        modelPath: "/models/sides/mexican-fries.glb"
      },
      {
        id: "36",
        name: "Chicken Fries",
        description: "Crispy chicken tenders served with fries",
        price: "4.75 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken tenders", "fries", "coating"],
        isAvailable: true,
        modelPath: "/models/sides/chicken-fries.glb"
      },
      {
        id: "37",
        name: "Dynamite Chicken Fries",
        description: "Spicy chicken tenders with dynamite sauce and fries",
        price: "4.75 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 3,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["spicy chicken tenders", "dynamite sauce", "fries"],
        isAvailable: true,
        modelPath: "/models/sides/dynamite-chicken-fries.glb"
      },
      {
        id: "38",
        name: "Nachos Vegetarian",
        description: "Crispy tortilla chips with cheese and vegetarian toppings",
        price: "3.99 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["tortilla chips", "cheese", "jalapeños", "tomatoes", "onions"],
        isAvailable: true,
        modelPath: "/models/sides/vegetarian-nachos.glb"
      },
      {
        id: "39",
        name: "Nachos Chicken",
        description: "Loaded nachos with grilled chicken and cheese",
        price: "4.99 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["tortilla chips", "grilled chicken", "cheese", "jalapeños", "sour cream"],
        isAvailable: true,
        modelPath: "/models/sides/chicken-nachos.glb"
      },
      {
        id: "40",
        name: "Nachos Beef",
        description: "Loaded nachos with seasoned beef and cheese",
        price: "5.25 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["tortilla chips", "ground beef", "cheese", "jalapeños", "sour cream"],
        isAvailable: true,
        modelPath: "/models/sides/beef-nachos.glb"
      },
      {
        id: "41",
        name: "Chicken Tenders",
        description: "Crispy breaded chicken tenders",
        price: "2.85 JD",
        category: CATEGORIES.SIDES,
        imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken breast", "breadcrumbs", "seasoning"],
        isAvailable: true,
        modelPath: "/models/sides/chicken-tenders.glb"
      },

      // 🥣 SAUCES
      {
        id: "42",
        name: "Sour Cream",
        description: "Creamy sour cream for dipping",
        price: "0.50 JD",
        category: CATEGORIES.SAUCES,
        imageUrl: "https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["sour cream"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "43",
        name: "Guacamole",
        description: "Fresh avocado dip with lime and spices",
        price: "1.25 JD",
        category: CATEGORIES.SAUCES,
        imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["avocado", "lime", "onion", "cilantro", "jalapeños"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "44",
        name: "Salsa Verde",
        description: "Green tomatillo salsa with medium heat",
        price: "0.65 JD",
        category: CATEGORIES.SAUCES,
        imageUrl: "https://images.unsplash.com/photo-1582169296194-854173e19d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["tomatillos", "jalapeños", "onion", "garlic", "cilantro"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "45",
        name: "Extra Cheese",
        description: "Additional melted cheese",
        price: "0.65 JD",
        category: CATEGORIES.SAUCES,
        imageUrl: "https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["mexican cheese"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "46",
        name: "Mexican Hot Sauce",
        description: "Traditional spicy Mexican sauce",
        price: "0.50 JD",
        category: CATEGORIES.SAUCES,
        imageUrl: "https://images.unsplash.com/photo-1582169296194-854173e19d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 3,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["hot peppers", "vinegar", "garlic", "spices"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "47",
        name: "Dynamite",
        description: "Signature spicy dynamite sauce",
        price: "0.60 JD",
        category: CATEGORIES.SAUCES,
        imageUrl: "https://images.unsplash.com/photo-1582169296194-854173e19d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 3,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["mayo", "hot sauce", "spices"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "48",
        name: "Ranch",
        description: "Cool and creamy ranch dressing",
        price: "0.60 JD",
        category: CATEGORIES.SAUCES,
        imageUrl: "https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["mayo", "buttermilk", "herbs", "garlic"],
        isAvailable: true,
        modelPath: null
      },

      // 🥗 HEALTHY CORNER
      {
        id: "49",
        name: "Healthy Burrito (600 Kcal)",
        description: "Nutritious burrito with lean protein and fresh vegetables",
        price: "4.49 JD",
        category: CATEGORIES.HEALTHY_CORNER,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["grilled chicken", "brown rice", "black beans", "lettuce", "tomato", "whole wheat tortilla"],
        isAvailable: true,
        modelPath: "/models/healthy/healthy-burrito.glb"
      },
      {
        id: "50",
        name: "Healthy Platter (400 Kcal)",
        description: "Light and nutritious platter with balanced portions",
        price: "4.49 JD",
        category: CATEGORIES.HEALTHY_CORNER,
        imageUrl: "https://pixabay.com/get/g10911d1a7c3f29d43466505cb30da4bf371fba7f0ee302c56d5ea6eeabc22ac91c97f8ff897a8b17ae687fd9f791ef3dd22fc30c6da155e3cc9be390b2ba55a2_1280.jpg",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["grilled chicken", "mixed greens", "quinoa", "vegetables", "light dressing"],
        isAvailable: true,
        modelPath: "/models/healthy/healthy-platter.glb"
      },
      {
        id: "51",
        name: "Keto Burrito (600 Kcal)",
        description: "Low-carb burrito with high protein and healthy fats",
        price: "4.49 JD",
        category: CATEGORIES.HEALTHY_CORNER,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["grilled chicken", "cauliflower rice", "avocado", "cheese", "lettuce wrap"],
        isAvailable: true,
        modelPath: "/models/healthy/keto-burrito.glb"
      },
      {
        id: "52",
        name: "Keto Burger 150g (500 Kcal)",
        description: "Protein-rich burger with lettuce wrap instead of bun",
        price: "4.49 JD",
        category: CATEGORIES.HEALTHY_CORNER,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["beef patty", "lettuce wrap", "cheese", "tomato", "avocado"],
        isAvailable: true,
        modelPath: "/models/healthy/keto-burger.glb"
      },
      {
        id: "53",
        name: "Taco Salad",
        description: "Fresh salad with Mexican flavors (+Chicken +1.25 JD)",
        price: "3.49 JD",
        category: CATEGORIES.HEALTHY_CORNER,
        imageUrl: "https://pixabay.com/get/g10911d1a7c3f29d43466505cb30da4bf371fba7f0ee302c56d5ea6eeabc22ac91c97f8ff897a8b17ae687fd9f791ef3dd22fc30c6da155e3cc9be390b2ba55a2_1280.jpg",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["mixed greens", "tomatoes", "corn", "beans", "cheese", "tortilla strips"],
        isAvailable: true,
        modelPath: "/models/healthy/taco-salad.glb"
      },

      // 🥬 VEGETARIAN
      {
        id: "54",
        name: "Vegetarian Taco",
        description: "Fresh vegetable taco with beans and cheese",
        price: "1.50 JD",
        category: CATEGORIES.VEGETARIAN,
        imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["black beans", "lettuce", "tomato", "cheese", "soft tortilla"],
        isAvailable: true,
        modelPath: "/models/vegetarian/vegetarian-taco.glb"
      },
      {
        id: "55",
        name: "Vegetarian Burrito",
        description: "Hearty burrito filled with beans, rice, and fresh vegetables",
        price: "3.99 JD",
        category: CATEGORIES.VEGETARIAN,
        imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["rice", "black beans", "cheese", "lettuce", "tomato", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/vegetarian/vegetarian-burrito.glb"
      },
      {
        id: "56",
        name: "Vegetarian Nachos",
        description: "Loaded nachos with beans, vegetables, and cheese",
        price: "4.49 JD",
        category: CATEGORIES.VEGETARIAN,
        imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        ingredients: ["tortilla chips", "black beans", "cheese", "jalapeños", "tomatoes", "onions"],
        isAvailable: true,
        modelPath: "/models/vegetarian/vegetarian-nachos.glb"
      },
      {
        id: "57",
        name: "Vegetarian Quesadilla",
        description: "Grilled tortilla with mixed vegetables and cheese",
        price: "4.25 JD",
        category: CATEGORIES.VEGETARIAN,
        imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["bell peppers", "onions", "mushrooms", "cheese", "flour tortilla"],
        isAvailable: true,
        modelPath: "/models/vegetarian/vegetarian-quesadilla.glb"
      },

      // 🥤 DRINKS
      {
        id: "58",
        name: "Water",
        description: "Refreshing bottled water",
        price: "0.35 JD",
        category: CATEGORIES.DRINKS,
        imageUrl: "https://images.unsplash.com/photo-1550593479-fe794e2fb850?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["water"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "59",
        name: "Soft Drinks",
        description: "Variety of carbonated soft drinks",
        price: "0.50 JD",
        category: CATEGORIES.DRINKS,
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["carbonated water", "flavoring"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "60",
        name: "Juice",
        description: "Fresh fruit juice selection",
        price: "0.75 JD",
        category: CATEGORIES.DRINKS,
        imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["fruit juice"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "61",
        name: "Jarritos",
        description: "Mexican soda with natural fruit flavors",
        price: "2.00 JD",
        category: CATEGORIES.DRINKS,
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["carbonated water", "natural fruit flavoring", "cane sugar"],
        isAvailable: true,
        modelPath: null
      },
      {
        id: "62",
        name: "Redbull",
        description: "Energy drink for an extra boost",
        price: "2.00 JD",
        category: CATEGORIES.DRINKS,
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        ingredients: ["caffeine", "taurine", "b-vitamins"],
        isAvailable: true,
        modelPath: null
      },

      // 🍴 OFFERS
      {
        id: "63",
        name: "Tex Mex (4 ppl)",
        description: "Family combo: 4 Chicken Tacos, 1 Chicken Tostada, 1 Chicken Quesadilla, 1 Beef Nachos, 1 Chicken Burrito, 4 Soft Drinks",
        price: "24.99 JD",
        category: CATEGORIES.OFFERS,
        imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken tacos", "chicken tostada", "chicken quesadilla", "beef nachos", "chicken burrito", "soft drinks"],
        isAvailable: true,
        modelPath: "/models/offers/tex-mex-combo.glb"
      },
      {
        id: "64",
        name: "Dueto (2 ppl)",
        description: "Couple combo: 1 Chicken Tostada, 1 Chicken Quesadilla, Garlic Tortilla, Fries, 2 Soft Drinks",
        price: "12.49 JD",
        category: CATEGORIES.OFFERS,
        imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken tostada", "chicken quesadilla", "garlic tortilla", "fries", "soft drinks"],
        isAvailable: true,
        modelPath: "/models/offers/dueto-combo.glb"
      },
      {
        id: "65",
        name: "Taco Kit Chicken (5 ppl)",
        description: "Chicken taco kit for 5 people with all the fixings",
        price: "16.99 JD",
        category: CATEGORIES.OFFERS,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 1,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken", "taco shells", "lettuce", "cheese", "tomatoes", "sauces"],
        isAvailable: true,
        modelPath: "/models/offers/chicken-taco-kit.glb"
      },
      {
        id: "66",
        name: "Taco Kit Mix (5 ppl)",
        description: "Mixed taco kit with chicken and beef for 5 people",
        price: "17.99 JD",
        category: CATEGORIES.OFFERS,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken", "beef", "taco shells", "lettuce", "cheese", "tomatoes", "sauces"],
        isAvailable: true,
        modelPath: "/models/offers/mix-taco-kit.glb"
      },
      {
        id: "67",
        name: "Taco Kit Beef (5 ppl)",
        description: "Beef taco kit for 5 people with all the fixings",
        price: "18.99 JD",
        category: CATEGORIES.OFFERS,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 2,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["beef", "taco shells", "lettuce", "cheese", "tomatoes", "sauces"],
        isAvailable: true,
        modelPath: "/models/offers/beef-taco-kit.glb"
      },

      // 👶 KIDS MEALS
      {
        id: "68",
        name: "Mini Burger (Fries & Juice)",
        description: "Kid-sized burger with fries and juice",
        price: "3.99 JD",
        category: CATEGORIES.KIDS,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["mini beef patty", "burger bun", "cheese", "fries", "juice"],
        isAvailable: true,
        modelPath: "/models/kids/mini-burger-meal.glb"
      },
      {
        id: "69",
        name: "Taco (Soft or Hard, Fries & Juice)",
        description: "Kid-friendly taco with fries and juice",
        price: "3.99 JD",
        category: CATEGORIES.KIDS,
        imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["mild chicken", "taco shell", "cheese", "fries", "juice"],
        isAvailable: true,
        modelPath: "/models/kids/kids-taco-meal.glb"
      },
      {
        id: "70",
        name: "Chicken Tenders (Fries & Juice)",
        description: "Crispy chicken tenders with fries and juice",
        price: "3.99 JD",
        category: CATEGORIES.KIDS,
        imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        spiceLevel: 0,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        ingredients: ["chicken tenders", "fries", "juice"],
        isAvailable: true,
        modelPath: "/models/kids/chicken-tenders-meal.glb"
      }
    ];

    items.forEach(item => this.menuItems.set(item.id, item));
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(item => item.category === category);
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async searchMenuItems(query: string): Promise<MenuItem[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.menuItems.values()).filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerQuery))
    );
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const item: MenuItem = { 
      ...insertItem, 
      id, 
      spiceLevel: insertItem.spiceLevel ?? 0,
      isVegetarian: insertItem.isVegetarian ?? false,
      isVegan: insertItem.isVegan ?? false,
      isGlutenFree: insertItem.isGlutenFree ?? false,
      isAvailable: insertItem.isAvailable ?? true
    };
    this.menuItems.set(id, item);
    return item;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItems = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === insertItem.sessionId && item.menuItemId === insertItem.menuItemId
    );

    if (existingItems.length > 0) {
      const existingItem = existingItems[0];
      existingItem.quantity += insertItem.quantity ?? 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const item: CartItem = { ...insertItem, id, quantity: insertItem.quantity ?? 1 };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeCartItem(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const itemsToRemove = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);

    itemsToRemove.forEach(id => this.cartItems.delete(id));
    return true;
  }
}

export const storage = new MemStorage();