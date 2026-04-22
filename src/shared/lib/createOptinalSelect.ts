export const createOptinalSelect = (
  values?: string[] | number[],
  labels?: string[] | number[],
) => {
  if (!values || !labels) return [];

  const res = [];

  for (let i = 0; i < values.length; i++) {
    res.push({ value: values[i], label: labels[i] });
  }

  return res;
};
