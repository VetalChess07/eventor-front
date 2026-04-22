import { transformDataToOptions } from './transformDataToOptions/transformDataToOptions';

export const mapDataToOptions = (values: string[], labels: string[]) => {
  return transformDataToOptions({
    labels: [...labels],
    values: [...values],
  });
};
