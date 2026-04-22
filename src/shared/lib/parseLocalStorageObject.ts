export function parseLocalStorageObject<T = object>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as T;
    }
    return null;
  } catch {
    return null;
  }
}
