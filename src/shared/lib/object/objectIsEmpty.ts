export function objectIsEmpty(obj: object) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}
