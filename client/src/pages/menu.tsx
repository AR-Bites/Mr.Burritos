import React from "react";
import { useParams } from "wouter";
import Navigation from "@/components/navigation";
import MenuGrid from "@/components/menu-grid";
import Footer from "@/components/footer";

// Category-specific food background images
const categoryBackgroundImages = {
  "tacos": "/attached_assets/_D1A7788_1756996889294.jpg",
  "burritos": "/attached_assets/_MG_8604_1756995764264.jpg",
  "burgers": "/attached_assets/_MG_8355_1756995433426.jpg",
  "favorites": "/attached_assets/_D1A8089_1756996564018.jpg",
  "sides": "/attached_assets/_D1A8311_1756996759114.jpg",
  "sauces": "/attached_assets/sauces-final.jpg",
  "kids": "/attached_assets/_MG_8459_1756996066769.jpg",
  "drinks": "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
  "healthy_corner": "/attached_assets/_D1A8240_1756996852560.jpg",
  "vegetarian": "/attached_assets/_D1A8224_1756996419454.jpg",
  "offers": "/attached_assets/_D1A8060_1756995890967.jpg",
  "all": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
};

const getCategoryBackgroundImage = (category: string): string => {
  return categoryBackgroundImages[category as keyof typeof categoryBackgroundImages] || categoryBackgroundImages.all;
};

// Category display names mapping
const categoryDisplayNames = {
  "mains": "Main Dishes",
  "appetizers": "Appetizers & Sides", 
  "drinks": "Beverages",
  "desserts": "Desserts",
  "kids": "Kids Meals",
  "all": "All Menu Items",
  // Route-specific display names
  "burritos": "Burritos",
  "tacos": "Tacos", 
  "burgers": "Burgers",
  "favorites": "Customer Favorites",
  "healthy-corner": "Healthy Corner",
  "vegetarian": "Vegetarian Options",
  "sides": "Sides",
  "sauces": "Sauces",
  "kids-meal": "Kids Meals",
  "offers": "Special Offers"
};

// Category route to actual category mapping
const categoryRouteMapping = {
  "burritos": "burritos",
  "tacos": "tacos",
  "burgers": "burgers",
  "favorites": "favorites", 
  "healthy-corner": "healthy_corner",
  "vegetarian": "vegetarian",
  "sides": "sides",
  "sauces": "sauces",
  "kids-meal": "kids",
  "drinks": "drinks", 
  "offers": "offers",
  "mains": "mains",
  "appetizers": "appetizers",
  "kids": "kids"
};

export default function Menu() {
  const { category } = useParams<{ category?: string }>();
  const routeCategory = category || "all";
  const actualCategory = categoryRouteMapping[routeCategory as keyof typeof categoryRouteMapping] || routeCategory;
  
  // Preload all images immediately when this component mounts
  React.useEffect(() => {
    Object.values(categoryBackgroundImages).forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);
  // First try route-specific name, then fall back to category name
  const displayName = categoryDisplayNames[routeCategory as keyof typeof categoryDisplayNames] || 
                     categoryDisplayNames[actualCategory as keyof typeof categoryDisplayNames] || "Menu";
  
  return (
    <>
      {/* Simple background - let browser handle caching */}
      <div 
        className="fixed inset-0 w-full h-full bg-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${getCategoryBackgroundImage(actualCategory)}")`,
          zIndex: -1
        }}
      />
      
      <div className="min-h-screen relative">
        <Navigation />
        <div id="menu" className="pt-20">
          {/* Hero Header */}
          <div className="text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">
                {displayName}
              </h1>
              <p className="text-xl md:text-2xl font-semibold opacity-90 drop-shadow-lg">
                Authentic Mexican Cuisine with 3D Models
              </p>
            </div>
          </div>
          
          <MenuGrid initialCategory={actualCategory} />
        </div>
        <Footer />
      </div>
    </>
  );
}