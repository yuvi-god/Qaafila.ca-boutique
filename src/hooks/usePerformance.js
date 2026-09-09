import { useCallback } from 'react';

// Debounce hook for search
export const useDebounce = (callback, delay) => {
  const timeoutRef = React.useRef(null);
  
  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

// Throttle hook
export const useThrottle = (callback, delay) => {
  const lastRunRef = React.useRef(Date.now());
  
  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRunRef.current >= delay) {
        callback(...args);
        lastRunRef.current = now;
      }
    },
    [callback, delay]
  );
};

// Memoization hook
export const useMemo = (factory, deps) => {
  const memoRef = React.useRef(null);
  const depsRef = React.useRef(null);
  
  if (!depsRef.current || !areDepsEqual(depsRef.current, deps)) {
    memoRef.current = factory();
    depsRef.current = deps;
  }
  
  return memoRef.current;
};

const areDepsEqual = (prevDeps, nextDeps) => {
  if (prevDeps.length !== nextDeps.length) return false;
  return prevDeps.every((dep, i) => dep === nextDeps[i]);
};