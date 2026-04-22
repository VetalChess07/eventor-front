import { fetchBaseQuery, FetchArgs } from '@reduxjs/toolkit/query/react';

export const getTokenFromLocalStorage = () =>
  localStorage.getItem('token') || '';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'https://your-backend.com/api',
  prepareHeaders: (headers) => {
    const token = getTokenFromLocalStorage();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQuery = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
) => {
  return rawBaseQuery(args, api, extraOptions);
};
