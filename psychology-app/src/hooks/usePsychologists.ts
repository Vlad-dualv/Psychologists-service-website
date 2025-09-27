import { useState, useCallback } from 'react';
import { Psychologist, SortOption, SortOrder } from '@/lib/types';
import { fetchSortedPsychologists } from '@/lib/firebase';

interface UsePsychologistsReturn {
  psychologists: Psychologist[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  sort: (sortBy: SortOption, order: SortOrder) => Promise<void>;
}

export const usePsychologists = (
  initialLimit: number = 3
): UsePsychologistsReturn => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [lastKey, setLastKey] = useState<string | undefined>();
  const [currentSort, setCurrentSort] = useState<{
    sortBy: SortOption;
    order: SortOrder;
  }>({ sortBy: 'name', order: 'asc' });

  const fetchInitial = useCallback(async (
    sortBy: SortOption = 'name',
    order: SortOrder = 'asc'
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchSortedPsychologists(
        sortBy,
        order,
        initialLimit
      );
      
      setPsychologists(result.psychologists);
      setHasMore(result.hasMore);
      setLastKey(result.lastKey);
      setCurrentSort({ sortBy, order });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch psychologists');
      setPsychologists([]);
    } finally {
      setLoading(false);
    }
  }, [initialLimit]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    
    setLoadingMore(true);
    setError(null);
    
    try {
      const result = await fetchSortedPsychologists(
        currentSort.sortBy,
        currentSort.order,
        initialLimit,
        lastKey
      );
      
      setPsychologists(prev => [...prev, ...result.psychologists]);
      setHasMore(result.hasMore);
      setLastKey(result.lastKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more psychologists');
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, currentSort.sortBy, currentSort.order, initialLimit, lastKey]);

  const sort = useCallback(async (sortBy: SortOption, order: SortOrder) => {
    await fetchInitial(sortBy, order);
  }, [fetchInitial]);

  const refresh = useCallback(async () => {
    await fetchInitial(currentSort.sortBy, currentSort.order);
  }, [fetchInitial, currentSort.sortBy, currentSort.order]);

  return {
    psychologists,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    sort
  }}