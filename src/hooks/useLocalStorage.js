import { useState, useEffect, useCallback } from 'react';

/**
 * A small useState-compatible hook that persists its value to localStorage.
 * Reads happen once (lazy initializer); writes happen on every change.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn(`Could not read localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Could not write localStorage key "${key}":`, error);
    }
  }, [key, value]);

  const updateValue = useCallback((next) => {
    setValue((prev) => (typeof next === 'function' ? next(prev) : next));
  }, []);

  return [value, updateValue];
}
