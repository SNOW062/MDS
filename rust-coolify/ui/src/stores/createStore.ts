import { useState, useEffect } from 'react';

export function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => state,
    setState: (nextState: Partial<T> | ((state: T) => Partial<T>)) => {
      const next = typeof nextState === 'function' ? nextState(state) : nextState;
      state = { ...state, ...next };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener: (state: T) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    useStore: <U>(selector: (state: T) => U = (s) => s as unknown as U): U => {
      const [selectedValue, setSelectedValue] = useState(() => selector(state));

      useEffect(() => {
        const listener = (currentState: T) => {
          setSelectedValue(selector(currentState));
        };
        listeners.add(listener);
        return () => {
          listeners.delete(listener);
        };
      }, [selector]);

      return selectedValue;
    }
  };
}
