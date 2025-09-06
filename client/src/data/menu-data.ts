// Define categories locally for deployment
export const CATEGORIES = {
  TACOS: "tacos",
  BURRITOS: "burritos", 
  BURGERS: "burgers",
  FAVORITES: "favorites",
  SIDES: "sides",
  SAUCES: "sauces",
  KIDS: "kids",
  DRINKS: "drinks",
  HEALTHY_CORNER: "healthy_corner",
  VEGETARIAN: "vegetarian",
  OFFERS: "offers",
  APPETIZERS: "appetizers",
  MAINS: "mains", 
  DESSERTS: "desserts"
} as const;

// Define MenuItem type locally
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  spiceLevel: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  ingredients: string[];
  isAvailable: boolean;
  modelPath?: string;
}

// Define CartItem type locally  
export interface CartItem {
  id: string;
  menuItemId: string;
  quantity: number;
  sessionId: string;
}

export const MENU_ITEMS: MenuItem[] = [
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
    modelPath: "/attached_assets/Hard_Chicken_And_Hard_Beef_Taco(Tacos_Category)_1757009490556.glb"
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
    modelPath: "/attached_assets/Taco_Soft(Kids_Meals_Catgories)_1757009677820.glb"
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
    modelPath: "/attached_assets/Hard_Chicken_And_Hard_Beef_Taco(Tacos_Category)_1757009490556.glb"
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
    modelPath: "/attached_assets/Taco_Soft(Kids_Meals_Catgories)_1757009677820.glb"
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
    modelPath: "/attached_assets/Hawaiian(Tacos_Category)_1757010380842.glb"
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
    modelPath: "/attached_assets/Cherry_Beef_Taco(Tacos_Category)_1757009271262.glb"
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
    modelPath: "/attached_assets/Dynamite_Chicken(Tacos_Category)_1757010358338.glb"
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
    modelPath: "/attached_assets/Dynamite_Shrimp(Tacos_Category)_1757010369033.glb"
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
    modelPath: "/attached_assets/Birria_Taco(Tacos_Category)_1757009224043.glb"
  },

  // 🌯 BURRITOS
  {
    id: "10",
    name: "California Style Chicken",
    description: "California-style chicken burrito with rice, beans, and fresh ingredients",
    price: "5.25 JD",
    category: CATEGORIES.BURRITOS,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["grilled chicken", "rice", "beans", "cheese", "lettuce", "tomato", "flour tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/California_Style_Chicken_Or_Beef_Burrito(Burritos_Category)_1757009260552.glb"
  },
  {
    id: "11",
    name: "California Style Beef",
    description: "California-style beef burrito with rice, beans, and fresh ingredients",
    price: "5.49 JD",
    category: CATEGORIES.BURRITOS,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["seasoned beef", "rice", "beans", "cheese", "lettuce", "tomato", "flour tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/California_Style_Chicken_Or_Beef_Burrito(Burritos_Category)_1757009260552.glb"
  },
  {
    id: "12",
    name: "Super Burrito Beef",
    description: "Large super beef burrito with premium ingredients",
    price: "5.75 JD",
    category: CATEGORIES.BURRITOS,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["seasoned beef", "rice", "beans", "cheese", "sour cream", "flour tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/13-super burrito beef_1756916814446.glb"
  },
  {
    id: "13",
    name: "Fajita Burrito",
    description: "Fajita-style burrito with grilled peppers and onions",
    price: "5.25 JD",
    category: CATEGORIES.BURRITOS,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["grilled chicken", "bell peppers", "onions", "rice", "flour tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/Fajita_Burrito(Burritos_Category)_1757009354376.glb"
  },
  {
    id: "14",
    name: "Dynamite Burrito",
    description: "Spicy burrito with dynamite sauce and premium fillings",
    price: "5.99 JD",
    category: CATEGORIES.BURRITOS,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 3,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["spicy chicken", "dynamite sauce", "rice", "beans", "cheese", "flour tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/Dynamite_Burrito(Burritos_Category)_1757009319976.glb"
  },
  {
    id: "15",
    name: "Burrito Bowl Chicken",
    description: "All the burrito goodness in a bowl with chicken - fully customizable",
    price: "4.99 JD",
    category: CATEGORIES.BURRITOS,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["grilled chicken", "rice", "beans", "toppings", "sauces"],
    isAvailable: true,
    modelPath: "/attached_assets/Burrito_Bowl_Chicken(Burritos_Category)_1757010346004.glb"
  },
  {
    id: "16",
    name: "Zinger Burrito",
    description: "Crispy spicy chicken burrito with special zinger sauce",
    price: "5.49 JD",
    category: CATEGORIES.BURRITOS,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 3,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["crispy spicy chicken", "zinger sauce", "rice", "lettuce", "flour tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/Zinger(Burritos_Category)_1757009718810.glb"
  },

  // 🍔 BURGERS
  {
    id: "17",
    name: "Chicken Grilled",
    description: "Grilled chicken burger with fresh toppings",
    price: "3.75 JD",
    category: CATEGORIES.BURGERS,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["grilled chicken", "burger bun", "lettuce", "tomato", "cheese"],
    isAvailable: true,
    modelPath: "/attached_assets/Chicken_Grilled_And_Classic_Burger(Burgers_Category)_1757009282438.glb"
  },
  {
    id: "18",
    name: "Classic Burger",
    description: "Classic beef burger with traditional toppings",
    price: "4.75 JD",
    category: CATEGORIES.BURGERS,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["beef patty", "burger bun", "lettuce", "tomato", "cheese", "pickles"],
    isAvailable: true,
    modelPath: "/attached_assets/Chicken_Grilled_And_Classic_Burger(Burgers_Category)_1757009282438.glb"
  },
  {
    id: "19",
    name: "Mushroom Burger",
    description: "Burger topped with sautéed mushrooms",
    price: "4.75 JD",
    category: CATEGORIES.BURGERS,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["beef patty", "mushrooms", "burger bun", "lettuce", "cheese"],
    isAvailable: true,
    modelPath: "/attached_assets/Mushroom_and_Mr_Smokey_Burgers(Burgers_Category)_1757009563301.glb"
  },
  {
    id: "20",
    name: "Mr. Smokey Burger",
    description: "Smoky flavored burger with special BBQ sauce",
    price: "4.75 JD",
    category: CATEGORIES.BURGERS,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["beef patty", "BBQ sauce", "burger bun", "lettuce", "tomato", "cheese"],
    isAvailable: true,
    modelPath: "/attached_assets/Mushroom_and_Mr_Smokey_Burgers(Burgers_Category)_1757009563301.glb"
  },

  // 🌟 FAVORITES
  {
    id: "21",
    name: "Dynamite Bowl",
    description: "Explosive flavors in a bowl with rice, beans, and signature dynamite sauce",
    price: "5.25 JD",
    category: CATEGORIES.FAVORITES,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 3,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["rice", "black beans", "chicken", "dynamite sauce", "corn", "lettuce"],
    isAvailable: true,
    modelPath: "/attached_assets/Dynamite_Bowl(Favorites_Category)_1757009297747.glb"
  },
  {
    id: "22",
    name: "Fajita Platter",
    description: "Sizzling fajita platter with grilled meat, peppers, and warm tortillas",
    price: "6.75 JD",
    category: CATEGORIES.FAVORITES,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["grilled beef", "bell peppers", "onions", "tortillas", "guacamole", "sour cream"],
    isAvailable: true,
    modelPath: "/attached_assets/Fajita_Platter(Favorites_Category)_1757009365917.glb"
  },
  {
    id: "23",
    name: "Quesadilla",
    description: "Grilled tortilla filled with cheese and your choice of meat",
    price: "3.95 JD",
    category: CATEGORIES.FAVORITES,
    imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["flour tortilla", "cheese", "chicken", "onions", "peppers"],
    isAvailable: true,
    modelPath: "/attached_assets/Quesadilla(Favorites_Category)_1757009639433.glb"
  },
  {
    id: "24",
    name: "Tostada",
    description: "Crispy tostada shell topped with beans, meat, and fresh toppings",
    price: "2.85 JD",
    category: CATEGORIES.FAVORITES,
    imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["crispy tortilla", "refried beans", "ground beef", "lettuce", "cheese", "tomato"],
    isAvailable: true,
    modelPath: "/attached_assets/Tostada(Favorites_Category)_1757010402694.glb"
  },

  // 🍟 SIDES
  {
    id: "25",
    name: "Mexican Fries",
    description: "Golden fries topped with cheese, jalapeños, and Mexican spices",
    price: "2.95 JD",
    category: CATEGORIES.SIDES,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["french fries", "cheese sauce", "jalapeños", "Mexican seasoning"],
    isAvailable: true,
    modelPath: "/attached_assets/Mexican_Fries(Sides_Category)_1757009528617.glb"
  },
  {
    id: "26",
    name: "Nachos (Beef, Chicken, Vegetarian)",
    description: "Crispy tortilla chips with melted cheese and choice of topping",
    price: "3.75 JD",
    category: CATEGORIES.SIDES,
    imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["tortilla chips", "cheese", "choice of protein", "jalapeños", "sour cream"],
    isAvailable: true,
    modelPath: "/attached_assets/Nachos(Sides_Category)_1757009627864.glb"
  },
  {
    id: "27",
    name: "Garlic Tortilla",
    description: "Warm tortilla brushed with garlic butter and herbs",
    price: "1.50 JD",
    category: CATEGORIES.SIDES,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["flour tortilla", "garlic butter", "herbs"],
    isAvailable: true,
    modelPath: "/attached_assets/Garlic_Tortilla(Sides_Category)_1757009382662.glb"
  },

  // 👶 KIDS MEALS
  {
    id: "28",
    name: "Kids Hard Taco",
    description: "Kid-sized hard taco with mild chicken and cheese",
    price: "2.25 JD",
    category: CATEGORIES.KIDS,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["hard taco shell", "mild chicken", "cheese", "lettuce"],
    isAvailable: true,
    modelPath: "/attached_assets/Hard_Taco(Kids_Meals_Category)_1757009504270.glb"
  },
  {
    id: "29",
    name: "Kids Soft Taco",
    description: "Kid-sized soft taco with mild chicken and cheese",
    price: "2.50 JD",
    category: CATEGORIES.KIDS,
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["soft tortilla", "mild chicken", "cheese", "lettuce"],
    isAvailable: true,
    modelPath: "/attached_assets/kids meal soft taco_1756917134815.glb"
  },
  {
    id: "30",
    name: "Kids Chicken Tenders",
    description: "Crispy chicken tenders served with kid-friendly sides",
    price: "3.25 JD",
    category: CATEGORIES.KIDS,
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["chicken tenders", "fries", "ranch sauce"],
    isAvailable: true,
    modelPath: "/attached_assets/Tenders(Kids_Meals_Category)_1757009691845.glb"
  },

  // 🥗 HEALTHY CORNER
  {
    id: "31",
    name: "Healthy Platter",
    description: "Fresh and nutritious platter with grilled proteins and vegetables",
    price: "6.50 JD",
    category: CATEGORIES.HEALTHY_CORNER,
    imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["grilled chicken", "mixed greens", "tomatoes", "cucumbers", "avocado"],
    isAvailable: true,
    modelPath: "/attached_assets/Healthy_Platter(Healthy_Corner_Category)_1757009513885.glb"
  },
  {
    id: "32",
    name: "Taco Salad",
    description: "Fresh salad served in a crispy taco shell with healthy toppings",
    price: "4.75 JD",
    category: CATEGORIES.HEALTHY_CORNER,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["crispy taco shell", "mixed greens", "grilled chicken", "black beans", "corn", "avocado"],
    isAvailable: true,
    modelPath: "/attached_assets/Taco_Salad(Healthy_Corner_Category)_1757010391057.glb"
  },

  // 🌱 VEGETARIAN
  {
    id: "33",
    name: "Vegetarian Burrito",
    description: "Hearty burrito filled with beans, rice, vegetables, and cheese",
    price: "4.25 JD",
    category: CATEGORIES.VEGETARIAN,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["black beans", "rice", "bell peppers", "onions", "cheese", "flour tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/Vegetarian_Burrito(Vegetarian_Category)_1757009704097.glb"
  },

  // 🎁 OFFERS
  {
    id: "34",
    name: "Taco Kit",
    description: "Complete taco kit with shells, meat, and all the fixings",
    price: "12.95 JD",
    category: CATEGORIES.OFFERS,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["taco shells", "seasoned beef", "cheese", "lettuce", "tomatoes", "sour cream"],
    isAvailable: true,
    modelPath: "/attached_assets/Taco_Kit(Offers_Category)_1757009658196.glb"
  },

  // 🥤 DRINKS
  {
    id: "35",
    name: "Fresh Horchata",
    description: "Traditional Mexican rice drink with cinnamon",
    price: "2.25 JD",
    category: CATEGORIES.DRINKS,
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    ingredients: ["rice milk", "cinnamon", "vanilla", "sugar"],
    isAvailable: true
  },
  {
    id: "36",
    name: "Agua Fresca",
    description: "Refreshing fruit water with natural flavors",
    price: "1.95 JD",
    category: CATEGORIES.DRINKS,
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    ingredients: ["fresh fruit", "water", "lime", "sugar"],
    isAvailable: true
  },

  // 🌶️ SAUCES
  {
    id: "37",
    name: "Salsa Verde",
    description: "Tangy green salsa made with tomatillos and jalapeños",
    price: "0.75 JD",
    category: CATEGORIES.SAUCES,
    imageUrl: "https://images.unsplash.com/photo-1582169296193-986ef43b0ff2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    ingredients: ["tomatillos", "jalapeños", "onion", "cilantro", "lime"],
    isAvailable: true
  },
  {
    id: "38",
    name: "Chipotle Sauce",
    description: "Smoky and spicy sauce made with chipotle peppers",
    price: "0.85 JD",
    category: CATEGORIES.SAUCES,
    imageUrl: "https://images.unsplash.com/photo-1582169296193-986ef43b0ff2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 3,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    ingredients: ["chipotle peppers", "tomatoes", "onion", "garlic", "vinegar"],
    isAvailable: true
  },

  // 🥟 APPETIZERS
  {
    id: "39",
    name: "Mexican Street Corn",
    description: "Grilled corn on the cob with mayo, cheese, and chili powder",
    price: "2.50 JD",
    category: CATEGORIES.APPETIZERS,
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["corn", "mayonnaise", "cotija cheese", "chili powder", "lime"],
    isAvailable: true
  },

  // 🍽️ MAINS
  {
    id: "40",
    name: "Carne Asada Plate",
    description: "Grilled marinated steak served with rice, beans, and tortillas",
    price: "8.95 JD",
    category: CATEGORIES.MAINS,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    ingredients: ["grilled steak", "rice", "black beans", "tortillas", "pico de gallo"],
    isAvailable: true
  },

  // 🍰 DESSERTS
  {
    id: "41",
    name: "Tres Leches Cake",
    description: "Traditional Mexican sponge cake soaked in three types of milk",
    price: "3.50 JD",
    category: CATEGORIES.DESSERTS,
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["sponge cake", "evaporated milk", "condensed milk", "heavy cream", "cinnamon"],
    isAvailable: true
  },

  // Additional items using available 3D models
  {
    id: "42",
    name: "Dynamite Chicken Fries",
    description: "Crispy chicken fries with explosive dynamite sauce",
    price: "3.75 JD",
    category: CATEGORIES.SIDES,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 3,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["chicken fries", "dynamite sauce", "spices"],
    isAvailable: true,
    modelPath: "/attached_assets/Dynamite_Chicken_Fries_1757009333112.glb"
  },
  {
    id: "43",
    name: "Periya Taco",
    description: "Special large-style taco with premium ingredients",
    price: "2.95 JD",
    category: CATEGORIES.TACOS,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 2,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["premium beef", "soft tortilla", "special sauce", "vegetables"],
    isAvailable: true,
    modelPath: "/attached_assets/12-periya taco_1756916784847.glb"
  },
  {
    id: "44",
    name: "Kids Meal Combo",
    description: "Complete kids meal with burger and sides",
    price: "4.25 JD",
    category: CATEGORIES.KIDS,
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["mini burger", "fries", "drink", "toy"],
    isAvailable: true,
    modelPath: "/attached_assets/Kids_Meal_Hard_Taco(Finished)_1756917170405.glb"
  },
  {
    id: "45",
    name: "Kids Tender Meal",
    description: "Tender meal specially designed for kids",
    price: "3.95 JD",
    category: CATEGORIES.KIDS,
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["chicken tenders", "fries", "ketchup"],
    isAvailable: true,
    modelPath: "/attached_assets/Tenders_Kids_Meal(Finished)_1756917229330.glb"
  },
  {
    id: "46",
    name: "Classic Quesadilla",
    description: "Traditional cheese quesadilla with perfect crispy tortilla",
    price: "3.25 JD",
    category: CATEGORIES.FAVORITES,
    imageUrl: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["flour tortilla", "cheese blend"],
    isAvailable: true,
    modelPath: "/attached_assets/quasedilla_1756917218077.glb"
  },
  {
    id: "47",
    name: "Vegetarian Special",
    description: "Special vegetarian burrito with fresh ingredients",
    price: "4.50 JD",
    category: CATEGORIES.VEGETARIAN,
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["black beans", "rice", "vegetables", "cheese", "tortilla"],
    isAvailable: true,
    modelPath: "/attached_assets/Vegetarian_Burrito(Finished)_1756917243499.glb"
  },

  // Additional items to use remaining models
  {
    id: "48",
    name: "Grilled Chicken Burger Special",
    description: "Special grilled chicken burger with premium ingredients",
    price: "4.25 JD",
    category: CATEGORIES.BURGERS,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    spiceLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ["grilled chicken", "burger bun", "lettuce", "tomato", "special sauce"],
    isAvailable: true,
    modelPath: "/attached_assets/17-grilled chicken burger_1756916864182.glb"
  }
];
