import { useState, useCallback } from 'react';

export interface UseAsyncReturn<T, TArgs extends unknown[] = unknown[]> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  execute: (...args: TArgs) => Promise<T>;
  reset: () => void;
}

export function useAsync<T, TArgs extends unknown[] = unknown[]>(
  asyncFunction: (...args: TArgs) => Promise<T>
): UseAsyncReturn<T, TArgs> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (...args: TArgs): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, error, loading, execute, reset };
}