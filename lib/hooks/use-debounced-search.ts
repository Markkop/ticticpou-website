import { useState, useEffect, useCallback } from 'react';
import { useAsync } from './use-async';

export interface UseSearchReturn<T> {
  query: string;
  results: T[];
  loading: boolean;
  error: Error | null;
  setQuery: (query: string) => void;
  clearResults: () => void;
}

export function useDebouncedSearch<T>(
  searchFunction: (query: string) => Promise<T[]>,
  delay: number = 300,
  minQueryLength: number = 2
): UseSearchReturn<T> {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const { data: results, loading, error, execute } = useAsync(searchFunction);

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  // Execute search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length >= minQueryLength) {
      execute(debouncedQuery);
    }
  }, [debouncedQuery, minQueryLength, execute]);

  const clearResults = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    results: results || [],
    loading,
    error,
    setQuery,
    clearResults,
  };
}