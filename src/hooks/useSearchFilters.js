import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const DEFAULT_FILTERS = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: '',
  category: 'All',
  maxPrice: '',
  minRating: '',
  sort: 'recommended',
};

/**
 * Reads/writes the search & filter state directly to and from the URL
 * query string. This is what makes a filtered search shareable and
 * survivable across a refresh, and keeps back/forward navigation sensible
 * since each filter change is a real history entry driven by the URL.
 */
export function useSearchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      destination: searchParams.get('destination') ?? DEFAULT_FILTERS.destination,
      checkIn: searchParams.get('checkIn') ?? DEFAULT_FILTERS.checkIn,
      checkOut: searchParams.get('checkOut') ?? DEFAULT_FILTERS.checkOut,
      guests: searchParams.get('guests') ?? DEFAULT_FILTERS.guests,
      category: searchParams.get('category') ?? DEFAULT_FILTERS.category,
      maxPrice: searchParams.get('maxPrice') ?? DEFAULT_FILTERS.maxPrice,
      minRating: searchParams.get('minRating') ?? DEFAULT_FILTERS.minRating,
      sort: searchParams.get('sort') ?? DEFAULT_FILTERS.sort,
    }),
    [searchParams]
  );

  const setFilter = useCallback(
    (key, value) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const isDefault = !value || value === DEFAULT_FILTERS[key];
          if (isDefault) {
            next.delete(key);
          } else {
            next.set(key, value);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setFilters = useCallback(
    (partial) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(partial).forEach(([key, value]) => {
            const isDefault = !value || value === DEFAULT_FILTERS[key];
            if (isDefault) {
              next.delete(key);
            } else {
              next.set(key, value);
            }
          });
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).filter(
      ([key, value]) => key !== 'sort' && value && value !== DEFAULT_FILTERS[key]
    ).length;
  }, [filters]);

  return { filters, setFilter, setFilters, clearFilters, activeFilterCount };
}
