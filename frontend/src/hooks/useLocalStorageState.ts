import { useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const saved = window.localStorage.getItem(key);
    if (!saved) {
      return initialValue;
    }

    try {
      return JSON.parse(saved) as T;
    } catch {
      return initialValue;
    }
  });

  const updateState = (value: T | ((current: T) => T)) => {
    setState((current) => {
      const nextValue = typeof value === "function" ? (value as (current: T) => T)(current) : value;
      window.localStorage.setItem(key, JSON.stringify(nextValue));
      return nextValue;
    });
  };

  return [state, updateState] as const;
}
