export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);

    return item ? (item as T) : null;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return null;
  }
};
