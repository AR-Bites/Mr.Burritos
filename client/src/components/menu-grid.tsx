import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/hooks/use-menu";
import { useModelPreloader } from "@/hooks/use-model-preloader";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/menu-card";
import SearchFilters, { type FilterState } from "@/components/search-filters";
import type { MenuItem } from "@/data/menu-data";
import { MODEL_MAPPING } from "@/data/model-mapping";

interface MenuGridProps {
  initialCategory?: string;
}

export default function MenuGrid({ initialCategory = "all" }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // Update activeCategory when initialCategory changes (URL navigation)
  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    spicy: false,
  });
  const [visibleItems, setVisibleItems] = useState(9);

  const { data: menuItems = [], isLoading } = useMenu(activeCategory);

  // Extract model paths for preloading
  const modelPaths = useMemo(() => {
    return menuItems
      .map(item => MODEL_MAPPING[item.id])
      .filter(Boolean) as string[];
  }, [menuItems]);

  // Preload 3D models
  useModelPreloader(modelPaths);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item: MenuItem) => {
      const matchesFilters = 
        (!activeFilters.vegetarian || item.isVegetarian) &&
        (!activeFilters.vegan || item.isVegan) &&
        (!activeFilters.glutenFree || item.isGlutenFree) &&
        (!activeFilters.spicy || item.spiceLevel > 0);

      return matchesFilters;
    });
  }, [menuItems, activeFilters]);

  const displayedItems = filteredItems.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  if (isLoading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-t-2xl"></div>
                <div className="bg-white p-6 rounded-b-2xl">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {initialCategory === "all" && (
        <SearchFilters
          onCategoryChange={setActiveCategory}
          onFilterChange={setActiveFilters}
          activeCategory={activeCategory}
          activeFilters={activeFilters}
        />
      )}
      
      <section className="py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${JSON.stringify(activeFilters)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            >
              {displayedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground mb-4">No items found matching your criteria</p>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </motion.div>
          )}

          {visibleItems < filteredItems.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-12"
            >
              <Button
                onClick={loadMore}
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-none px-8 py-4 text-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                data-testid="button-load-more"
              >
                Load More Delicious Items
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
