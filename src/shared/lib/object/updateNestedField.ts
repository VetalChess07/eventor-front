type UpdateNestedFieldParams<T> = {
  obj: T;
  path: string[];
  value: unknown;
};

export const updateNestedField = <T extends Record<string, any>>({
  obj,
  path,
  value,
}: UpdateNestedFieldParams<T>): T => {
  if (path.length === 1) {
    return { ...obj, [path[0]]: value };
  }

  const [key, ...rest] = path;
  return {
    ...obj,
    [key]: updateNestedField({
      obj: obj[key],
      path: rest,
      value,
    }),
  };
};
