import api from '@/shared/api/axiosConfig';
import { Dispatch, SetStateAction } from 'react';
import { AxiosError } from 'axios';

type logoutParams = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  sucsessCallback?: () => void;
};

export const logout = async ({
  setIsLoading,
  setError,
  sucsessCallback,
}: logoutParams) => {
  try {
    setIsLoading(true);
    setError(null);
    const res = await api.post('/users/logout');
    localStorage.removeItem('token');

    window.location.reload();
    sucsessCallback?.();

    return res.data;
  } catch (err) {
    console.error(err);

    if (err instanceof AxiosError) {
      const message = err.response?.data?.error || 'Ошибка выхода';
      setError(message);
    }

    return null;
  } finally {
    setIsLoading(false);
  }
};
