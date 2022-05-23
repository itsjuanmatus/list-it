import { useState, useEffect } from 'react';

const useLocalStorage = (name: string) => {
  const [value, setValue] = useState<any>('');

  useEffect(() => {
    setValue(localStorage.getItem(name));
  }, []);

  return value;
};

export default useLocalStorage;
