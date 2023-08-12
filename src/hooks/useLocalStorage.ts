import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string): [string, (value: string) => void] {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue !== null ? storedValue : initialValue;

  const [value, setValue] = useState<string>(initial);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, updateValue];
}


