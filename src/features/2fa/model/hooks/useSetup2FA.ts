import { useState, useEffect } from 'react';
import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/const/localStorage';

type Setup2FAResponse = {
  status: 200;
  data: {
    qr: string;
  };
};

export const useSetup2FA = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Setup2FAResponse | null>(null);

  const fetch2FA = async () => {
    try {
      setLoading(true);
      setError(null);

      const userInfoStr = localStorage.getItem(TG_USER);

      const userInfoObj = userInfoStr ? JSON.parse(userInfoStr) : null;

      const res = await api.post<Setup2FAResponse>(
        'setup-2fa',
        { user_info: userInfoObj },
        {
          withCredentials: true,
        },
      );

      setData(res.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Ошибка при получении 2FA');
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    try {
      setLoading(true);
      setError(null);

      await api.post('disable-2fa', {}, { withCredentials: true });

      return true;
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Ошибка при отключении 2FA');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch2FA();
  }, []);

  return {
    loading,
    error,
    data,
    fetch2FA,
    disable2FA,
    setError,
  };
};
