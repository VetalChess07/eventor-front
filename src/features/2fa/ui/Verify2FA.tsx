import { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

import api from '@/shared/api/axiosConfig';
import { TG_USER } from '@/shared/const/localStorage';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/redux/useAppDispatch';
import { setUser } from '@/entities/user/model/slice/userSlice';

export const Verify2FA = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const userInfoStr = localStorage.getItem(TG_USER);
      const userInfoObj = userInfoStr ? JSON.parse(userInfoStr) : null;

      const res = await api.post(
        `login-2fa`,
        { code, user_info: userInfoObj },
        { withCredentials: true },
      );

      if (res.data.status === 200 || res.data.status === 201) {
        setSuccess(true);
        setError('');
        dispatch(setUser(res.data.data));

        navigate('/');
      } else {
        setError('Неверный код. Попробуйте снова.');
      }
    } catch (err) {
      setError('Ошибка проверки кода.');
    }
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Подтвердите 2FA
      </Typography>

      <TextField
        value={code}
        onChange={(e) => {
          const onlyNums = e.target.value.replace(/\D/g, '');
          setCode(onlyNums);
        }}
        variant="outlined"
        sx={{ mt: 1 }}
        placeholder="Код XXXXXX"
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerify}
          style={{ marginTop: 10 }}
        >
          Подтвердить
        </Button>
      </div>

      {error && (
        <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography
          variant="body2"
          color="success.main"
          style={{ marginTop: 10 }}
        >
          Успешно! Перенаправление...
        </Typography>
      )}
    </div>
  );
};
