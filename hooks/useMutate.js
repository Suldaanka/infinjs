
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutate(endpoint, queryKey) {
    const queryClient = useQueryClient();
  
    const mutationFn = async (body) => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Mutation failed');
      return res.json();
    };
  
    const mutation = useMutation({
      mutationFn,
      onSuccess: () => queryClient.invalidateQueries(queryKey)
    });
  
    return {
      ...mutation,
      // Add more descriptive names
      execute: mutation.mutate,
      executeAsync: mutation.mutateAsync
    };
  }