import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Import static menu data for offline deployment
import { MENU_ITEMS } from '../data/menu-data';

// Offline-first query function
const offlineQueryFn: QueryFunction = async ({ queryKey }) => {
  const url = queryKey[0] as string;
  
  // Handle menu API calls with static data
  if (url === '/api/menu') {
    return MENU_ITEMS.slice(0, 20); // Return first 20 items including all burgers
  }
  
  if (url.startsWith('/api/menu?category=')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const category = urlParams.get('category');
    if (category) {
      return MENU_ITEMS.filter(item => item.category === category);
    }
    return MENU_ITEMS.slice(0, 20);
  }
  
  // Return empty array for other requests in static deployment
  return [];
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: offlineQueryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
