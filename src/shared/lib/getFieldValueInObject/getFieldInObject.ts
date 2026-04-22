export const getFieldValueInObject = <T>(
  data: T[],
  key: keyof T,
  value: string | number,
) => {
  return data.find((el) => el[key] == value) ?? null;
};
