import { User } from '@/entities/user';
import api, { ApiError, ApiErrorAuth } from '@/shared/api/axiosConfig';
import { DefaulResponse } from '@/shared/types/api';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';

type checkIsAdminParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  successCallback?: (data: User) => void;
  errorCallback?: () => void;
  error2FACallback?: () => void;
  noUserInfoCallback?: () => void;
};

export const checkIsAdmin = async ({
  setIsLoading,
  setError,
  errorCallback,
  error2FACallback,
  successCallback,
  noUserInfoCallback,
}: checkIsAdminParams) => {
  try {
    setIsLoading(true);
    setError(null);

    const res = await api.post<DefaulResponse<User>>('users/check_admin');
    successCallback?.(res.data.data);

    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.data.requires2FA) {
        error2FACallback?.();
        setError('Истекла сессия');
        return;
      }

      const axiosError = err as AxiosError<ApiError>;
      const message = err.response?.data.message as AxiosError<ApiErrorAuth>;
      const apiError = axiosError?.response?.data.text ?? 'Неизвестная ошибка';

      setError(`${message ?? apiError}`);
      noUserInfoCallback?.();
      errorCallback?.();
    }
    return null;
  } finally {
    setIsLoading(false);
  }
};
