import { Utensils, Pizza, Drumstick, IceCream, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/menu-data";

interface SearchFiltersProps {
  onCategoryChange: (category: string) => void;
  onFilterChange: (filters: FilterState) => void;
  activeCategory: string;
  activeFilters: FilterState;
}

export interface FilterState {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  spicy: boolean;
}

export default function SearchFilters({
  onCategoryChange,
  onFilterChange,
  activeCategory,
  activeFilters,
}: SearchFiltersProps) {

  const categoryIcons = {
    all: Utensils,
    [CATEGORIES.APPETIZERS]: Pizza,
    [CATEGORIES.MAINS]: Drumstick,
    [CATEGORIES.DESSERTS]: IceCream,
    [CATEGORIES.DRINKS]: Coffee,
  };

  const categories = [
    { key: "all", label: "All Items" },
    { key: CATEGORIES.APPETIZERS, label: "Appetizers" },
    { key: CATEGORIES.MAINS, label: "Main Courses" },
    { key: CATEGORIES.DESSERTS, label: "Desserts" },
    { key: CATEGORIES.DRINKS, label: "Drinks" },
  ];


  const handleFilterToggle = (filterKey: keyof FilterState) => {
    const newFilters = {
      ...activeFilters,
      [filterKey]: !activeFilters[filterKey],
    };
    onFilterChange(newFilters);
  };

  return (
    <section className="py-8 bg-gradient-to-r from-primary/5 to-secondary/5" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">Our Menu</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Mexican flavors crafted with love and traditional recipes passed down through generations
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category, index) => {
            const IconComponent = categoryIcons[category.key as keyof typeof categoryIcons];
            const isActive = activeCategory === category.key;
            
            return (
              <motion.button
                key={category.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(category.key)}
                className={`filter-chip px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-foreground hover:bg-primary hover:text-white"
                }`}
                data-testid={`button-category-${category.key}`}
              >
                <IconComponent className="w-4 h-4 mr-2 inline" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
