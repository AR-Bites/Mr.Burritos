import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "@shared/schema";

export function useMenu(category?: string) {
  return useQuery<MenuItem[]>({
    queryKey: ["/api/menu", { category }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category && category !== "all") {
        params.append("category", category);
      }

      const url = params.toString() ? `/api/menu?${params}` : "/api/menu";
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
