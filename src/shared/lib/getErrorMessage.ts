import { SerializedError } from '@reduxjs/toolkit';
import { DefaultErrorResponse } from '../types/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | unknown,
  fallback = 'Неизвестная ошибка',
): string => {
  if (!error) return fallback;

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const queryError = error as FetchBaseQueryError;

    // FetchBaseQueryError
    if (
      typeof queryError.data === 'object' &&
      queryError.data &&
      'error' in queryError.data
    ) {
      return (queryError.data as DefaultErrorResponse).error;
    }

    if (queryError.status === 'PARSING_ERROR')
      return 'Некорректный ответ от сервера';

    return `Ошибка ${queryError.status}`;
  }

  // SerializedError
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as SerializedError).message ?? fallback);
  }

  return fallback;
};
