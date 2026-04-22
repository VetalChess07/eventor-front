import { SetURLSearchParams } from 'react-router-dom';

type SetQueryParamsParams = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  key: string;
  value: string;
};
export const setQueryParams = ({
  searchParams,
  setSearchParams,
  key,
  value,
}: SetQueryParamsParams) => {
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.set(key, value);
  setSearchParams(newParams);
};
