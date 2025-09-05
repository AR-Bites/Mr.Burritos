// Perfect matching of menu items to 3D models based on names and food types
export const MODEL_MAPPING: Record<string, string> = {
  // TACOS Section - New models with exact name matching
  "1": "/attached_assets/Hard_Chicken_And_Hard_Beef_Taco(Tacos_Category)_1757009490556.glb", // Chicken Grilled (Hard)
  "2": "/attached_assets/Hard_Chicken_And_Hard_Beef_Taco(Tacos_Category)_1757009490556.glb", // Chicken Grilled (Soft) - same model
  "3": "/attached_assets/Hard_Chicken_And_Hard_Beef_Taco(Tacos_Category)_1757009490556.glb", // Beef (Hard)
  "4": "/attached_assets/Hard_Chicken_And_Hard_Beef_Taco(Tacos_Category)_1757009490556.glb", // Beef (Soft)
  "5": "/attached_assets/Hawaiian(Tacos_Category)_1757010380842.glb", // Hawaiian
  "6": "/attached_assets/Cherry_Beef_Taco(Tacos_Category)_1757009271262.glb", // Cherry Beef
  "7": "/attached_assets/Dynamite_Chicken(Tacos_Category)_1757010358338.glb", // Dynamite Chicken
  "8": "/attached_assets/Dynamite_Shrimp(Tacos_Category)_1757010369033.glb", // Dynamite Shrimp
  "9": "/attached_assets/Birria_Taco(Tacos_Category)_1757009224043.glb", // Birria Taco (2 pcs)

  // BURRITOS Section - New models with exact name matching
  "10": "/attached_assets/California_Style_Chicken_Or_Beef_Burrito(Burritos_Category)_1757009260552.glb", // Super Burrito Chicken
  "11": "/attached_assets/California_Style_Chicken_Or_Beef_Burrito(Burritos_Category)_1757009260552.glb", // Super Burrito Beef
  "12": "/attached_assets/California_Style_Chicken_Or_Beef_Burrito(Burritos_Category)_1757009260552.glb", // California Style
  "13": "/attached_assets/Dynamite_Burrito(Burritos_Category)_1757009319976.glb", // Dynamite Burrito
  "14": "/attached_assets/Burrito_Bowl_Chicken(Burritos_Category)_1757010346004.glb", // Burrito Bowl
  "15": "/attached_assets/Zinger(Burritos_Category)_1757009718810.glb", // Zinger
  "16": "/attached_assets/Vegetarian_Burrito(Vegetarian_Category)_1757009704097.glb", // Turkey Burrito

  // BURGERS Section - New models with exact name matching
  "17": "/attached_assets/Chicken_Grilled_And_Classic_Burger(Burgers_Category)_1757009282438.glb", // Chicken Grilled
  "18": "/attached_assets/Chicken_Grilled_And_Classic_Burger(Burgers_Category)_1757009282438.glb", // Classic
  "19": "/attached_assets/Mushroom_and_Mr_Smokey_Burgers(Burgers_Category)_1757009563301.glb", // Mushroom
  "20": "/attached_assets/Mushroom_and_Mr_Smokey_Burgers(Burgers_Category)_1757009563301.glb", // Mr. Smokey

  // FAVORITES Section - New models with exact name matching
  "21": "/attached_assets/Fajita_Burrito(Burritos_Category)_1757009354376.glb", // Arabian Fajita
  "22": "/attached_assets/Fajita_Platter(Favorites_Category)_1757009365917.glb", // Fajita Platter
  "23": "/attached_assets/Quesadilla(Favorites_Category)_1757009639433.glb", // Quesadilla Chicken
  "24": "/attached_assets/Quesadilla(Favorites_Category)_1757009639433.glb", // Quesadilla Beef
  "25": "/attached_assets/Quesadilla(Favorites_Category)_1757009639433.glb", // Quesadilla Birria
  "26": "/attached_assets/Quesadilla(Favorites_Category)_1757009639433.glb", // Quesadilla Vegetarian
  "27": "/attached_assets/Tostada(Favorites_Category)_1757010402694.glb", // Tostada Chicken
  "28": "/attached_assets/Tostada(Favorites_Category)_1757010402694.glb", // Tostada Beef
  "29": "/attached_assets/Dynamite_Bowl(Favorites_Category)_1757009297747.glb", // Dynamite Bowl Chicken
  "30": "/attached_assets/Dynamite_Bowl(Favorites_Category)_1757009297747.glb", // Dynamite Bowl Shrimp

  // SIDES Section
  "31": "/attached_assets/Garlic_Tortilla(Sides_Category)_1757009382662.glb", // Garlic Tortilla
  "35": "/attached_assets/Mexican_Fries(Sides_Category)_1757009528617.glb", // Mexican Fries
  "37": "/attached_assets/Dynamite_Chicken_Fries_1757009333112.glb", // Dynamite Chicken Fries
  "38": "/attached_assets/Nachos(Sides_Category)_1757009627864.glb", // Nachos Vegetarian
  "39": "/attached_assets/Nachos(Sides_Category)_1757009627864.glb", // Nachos Chicken
  "40": "/attached_assets/Nachos(Sides_Category)_1757009627864.glb", // Nachos Beef
  "41": "/attached_assets/Tenders(Kids_Meals_Category)_1757009691845.glb", // Chicken Tenders

  // HEALTHY CORNER Section
  "49": "/attached_assets/Vegetarian_Burrito(Vegetarian_Category)_1757009704097.glb", // Healthy Burrito
  "50": "/attached_assets/Healthy_Platter(Healthy_Corner_Category)_1757009513885.glb", // Healthy Platter
  "53": "/attached_assets/Taco_Salad(Healthy_Corner_Category)_1757010391057.glb", // Taco Salad

  // VEGETARIAN Section
  "54": "/attached_assets/Hard_Chicken_And_Hard_Beef_Taco(Tacos_Category)_1757009490556.glb", // Vegetarian Taco
  "55": "/attached_assets/Vegetarian_Burrito(Vegetarian_Category)_1757009704097.glb", // Vegetarian Burrito
  "56": "/attached_assets/Nachos(Sides_Category)_1757009627864.glb", // Vegetarian Nachos
  "57": "/attached_assets/Quesadilla(Favorites_Category)_1757009639433.glb", // Vegetarian Quesadilla

  // OFFERS Section
  "63": "/attached_assets/Taco_Kit(Offers_Category)_1757009658196.glb", // Tex Mex (4 ppl)
  "64": "/attached_assets/Taco_Kit(Offers_Category)_1757009658196.glb", // Dueto (2 ppl)
  "65": "/attached_assets/Taco_Kit(Offers_Category)_1757009658196.glb", // Taco Kit Chicken
  "66": "/attached_assets/Taco_Kit(Offers_Category)_1757009658196.glb", // Taco Kit Mix
  "67": "/attached_assets/Taco_Kit(Offers_Category)_1757009658196.glb", // Taco Kit Beef

  // KIDS MEALS Section
  "68": "/attached_assets/Chicken_Grilled_And_Classic_Burger(Burgers_Category)_1757009282438.glb", // Mini Burger
  "69": "/attached_assets/Taco_Soft(Kids_Meals_Catgories)_1757009677820.glb", // Taco (Soft or Hard)
  "70": "/attached_assets/Tenders(Kids_Meals_Category)_1757009691845.glb", // Chicken Tenders
};

// Function to get 3D model path for a menu item
export function getModelPath(itemId: string): string | null {
  return MODEL_MAPPING[itemId] || null;
}

// Function to check if an item has a 3D model
export function hasModel(itemId: string): boolean {
  return itemId in MODEL_MAPPING;
}

// All available 3D models - each assigned to a menu item
export const AVAILABLE_MODELS = [
  "1-dynamite bowl_1756916613906.glb", // Burrito Bowl
  "2-fahita burrito_1756916625949.glb", // Fajita Burritos
  "3-fahita platter_1756916638887.glb", // Fajita Platter
  "4-hard chicken and hard beef_1756916673171.glb", // Hard Tacos
  "5-healthy platter__1756916699390.glb", // Unused
  "6-mexican fries_1756916717240.glb", // Unused
  "7-nachos ( beef, chicken , vege)_1756916738360.glb", // Unused
  "9-Object 8_1756916749930.glb", // Unused
  "11-Object 42_1756916772179.glb", // Unused
  "12-periya taco_1756916784847.glb", // Special Tacos
  "13-super burrito beef_1756916814446.glb", // Super Burrito Beef
  "14-Object 60_1756916841962.glb", // Unused
  "15-Object 15_1756916853217.glb", // Unused
  "17-grilled chicken burger_1756916864182.glb", // All Burgers
  "18-taco kit_1756916979854.glb", // Taco Varieties
  "21-Object 5_1756916988657.glb", // Unused
  "22-Object 11_1756916995086.glb", // Unused
  "24-Object 80_1756917007153.glb", // Unused
  "California_Or_Chicken_Burrito(Finished)_1756917128922.glb", // California/Chicken Burritos
  "kids meal soft taco_1756917134815.glb", // Soft Tacos
  "Kids_Meal_Hard_Taco(Finished)_1756917170405.glb", // Hard Taco Varieties
  "Object_25(Finished)_1756917184779.glb", // Unused
  "Object_73(finished)_1756917204614.glb", // Unused
  "quasedilla_1756917218077.glb", // All Quesadillas
  "Tenders_Kids_Meal(Finished)_1756917229330.glb", // Unused
  "Vegetarian_Burrito(Finished)_1756917243499.glb" // Vegetarian Items
];