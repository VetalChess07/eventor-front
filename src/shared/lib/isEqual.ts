export const isEqual = (a: unknown, b: unknown, flag: boolean = true) => {
  return flag ? a === b : a !== b;
};
