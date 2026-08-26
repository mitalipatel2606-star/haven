import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

const STORAGE_KEY = 'fernway:favorites';

/**
 * Encapsulates everything the app needs to know about favorited
 * properties: reading them from localStorage, checking membership,
 * and adding/removing/toggling entries. Consumers never touch
 * localStorage or IDs directly.
 */
export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(STORAGE_KEY, []);

  const isFavorite = useCallback(
    (propertyId) => favoriteIds.includes(propertyId),
    [favoriteIds]
  );

  const addFavorite = useCallback(
    (propertyId) => {
      setFavoriteIds((prev) => (prev.includes(propertyId) ? prev : [...prev, propertyId]));
    },
    [setFavoriteIds]
  );

  const removeFavorite = useCallback(
    (propertyId) => {
      setFavoriteIds((prev) => prev.filter((id) => id !== propertyId));
    },
    [setFavoriteIds]
  );

  const toggleFavorite = useCallback(
    (propertyId) => {
      setFavoriteIds((prev) =>
        prev.includes(propertyId)
          ? prev.filter((id) => id !== propertyId)
          : [...prev, propertyId]
      );
    },
    [setFavoriteIds]
  );

  const favoriteCount = useMemo(() => favoriteIds.length, [favoriteIds]);

  return { favoriteIds, isFavorite, addFavorite, removeFavorite, toggleFavorite, favoriteCount };
}
