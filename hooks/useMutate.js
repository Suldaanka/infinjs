import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutate(endpoint, queryKey, options = {}) {
    const queryClient = useQueryClient();
    const {
        method = 'POST', // Default to POST if not specified
        headers = { 'Content-Type': 'application/json' }, // Default headers
        ...mutationOptions // Other useMutation options
    } = options;

    const mutationFn = async (body) => {
        const res = await fetch(endpoint, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined // Only include body if it exists
        });
        if (!res.ok) throw new Error('Mutation failed');
        return res.json();
    };



    const mutation = useMutation({
        mutationFn,
        onSuccess: () => queryClient.invalidateQueries({ queryKey}),
        ...mutationOptions
    });

    return {
        ...mutation,
        // Add more descriptive names
        execute: mutation.mutate,
        executeAsync: mutation.mutateAsync
    };
}