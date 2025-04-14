"use client";

import { useQuery } from "@tanstack/react-query";

export function useFetch(endpoint, queryKey, options = {}) {
  const fetchData = async () => {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  return useQuery({
    queryKey,
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    ...options
  });
}