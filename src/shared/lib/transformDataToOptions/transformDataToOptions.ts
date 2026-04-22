type TransformDataToOptionsType = {
  values: string[];
  labels: string[];
};

export const transformDataToOptions = ({
  labels,
  values,
}: TransformDataToOptionsType): Array<{
  value: string | number;
  label: string;
}> | null => {
  return labels.length === values.length
    ? values.map((value, index) => ({
        value,
        label: labels[index],
      }))
    : null;
};
