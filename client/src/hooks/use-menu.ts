import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "@/data/menu-data";
import { MENU_ITEMS } from "@/data/menu-data";

export function useMenu(category?: string) {
  return useQuery<MenuItem[]>({
    queryKey: ["static-menu", { category }],
    queryFn: async () => {
      // Use static data instead of API call
      if (!category || category === "all") {
        return MENU_ITEMS;
      }
      
      // Filter by category
      return MENU_ITEMS.filter(item => item.category === category);
    },
    staleTime: Infinity, // Static data never gets stale
  });
}
