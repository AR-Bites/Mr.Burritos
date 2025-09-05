import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "wouter";

interface CategoryMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCategorySelect?: () => void;
}

// Map display categories to actual database categories
const categoryMapping = {
  "burritos": "burritos",
  "tacos": "tacos", 
  "burgers": "burgers",
  "favorites": "favorites",
  "healthy corner": "healthy_corner",
  "vegetarian": "vegetarian",
  "sides": "sides",
  "sauces": "sauces",
  "kids meal": "kids",
  "drinks": "drinks",
  "offers": "offers"
};

const categories = [
  { name: "burritos", description: "Authentic Mexican Cuisine with 3D Models", displayName: "Main Dishes" },
  { name: "tacos", description: "Traditional Street Food Experience", displayName: "Main Dishes" },
  { name: "burgers", description: "Grilled Burgers & American Favorites", displayName: "Burgers" },
  { name: "favorites", description: "Customer's Most Loved Dishes", displayName: "Main Dishes" },
  { name: "healthy corner", description: "Fresh & Nutritious Options", displayName: "Main Dishes" },
  { name: "vegetarian", description: "Plant-Based Mexican Delights", displayName: "Main Dishes" },
  { name: "sides", description: "Perfect Accompaniments", displayName: "Appetizers & Sides" },
  { name: "sauces", description: "Authentic Mexican Salsas", displayName: "Appetizers & Sides" },
  { name: "kids meal", description: "Kid-Friendly Mexican Favorites", displayName: "Kids Meals" },
  { name: "drinks", description: "Refreshing Beverages", displayName: "Beverages" },
  { name: "offers", description: "Special Deals & Combos", displayName: "Main Dishes" }
];

export default function CategoryMenu({ isOpen = true, onClose, onCategorySelect }: CategoryMenuProps) {
  if (isOpen === false) return null;
  
  const handleCategoryClick = () => {
    onCategorySelect?.();
    onClose?.();
  };

  return (
    <>
      {/* Backdrop to block everything */}
      <div 
        className="fixed inset-0 z-[99998]" 
        style={{ backgroundColor: 'white', width: '100vw', height: '100vh' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex flex-col"
        style={{ backgroundColor: 'white', width: '100vw', height: '100vh' }}
        data-testid="category-menu-overlay"
      >
      {/* Header with close button */}
      <div className="flex justify-end p-6">
        <button
          onClick={onClose}
          className="p-2 hover:bg-blue-300 rounded-full transition-colors"
          data-testid="button-close-menu"
        >
          <X size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Categories list */}
      <div className="flex-1 flex flex-col justify-start items-center px-6 pb-20 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-sm space-y-2 py-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Link
                href={`/menu/${category.name.replace(' ', '-')}`}
                onClick={handleCategoryClick}
                className="block w-full text-center py-3 hover:bg-red-100 transition-colors duration-200 border-b border-red-200 last:border-b-0"
                data-testid={`link-category-${category.name.replace(' ', '-')}`}
              >
                <div className="text-xl font-black text-red-700 uppercase tracking-wide mb-1">
                  {category.name}
                </div>
                <div className="text-sm text-red-500 font-medium">
                  {category.description}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
    </>
  );
}