import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  TextField,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import api from '@/shared/api/axiosConfig';
import { useSetup2FA } from '../model/hooks/useSetup2FA';
import { TG_USER } from '@/shared/const/localStorage';
import { RoutePath } from '@/shared/config/routeConfig';

export const Setup2FA = () => {
  const navigate = useNavigate();
  const { name: themeName } = useParams();

  const { loading, error, data, disable2FA, setError } = useSetup2FA();

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');

  const handleVerify2FA = async () => {
    try {
      const userInfoStr = localStorage.getItem(TG_USER);
      const userInfoObj = userInfoStr ? JSON.parse(userInfoStr) : null;

      const res = await api.post(
        'login-2fa',
        { code, user_info: userInfoObj },
        { withCredentials: true },
      );

      navigate(RoutePath.lototrons);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Ошибка при проверке 2FA');
    }
  };

  const handleDisable2FA = async () => {
    const ok = await disable2FA();
    if (ok) navigate(`/theme/${themeName}`);
  };

  if (loading) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack
      gap={2}
      alignItems={'center'}
      sx={{ padding: 3, textAlign: 'center' }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Настройка двухфакторной аутентификации
      </Typography>

      {data && (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Сканируйте QR-код через Google Authenticator
          </Typography>

          <img
            src={data.data.qr}
            alt="QR Code for 2FA"
            style={{ width: 220, height: 220, borderRadius: 10 }}
          />
          {!showCodeInput ? (
            <Button
              onClick={() => setShowCodeInput(true)}
              variant="contained"
              sx={{ mt: 3, fontSize: 16, px: 3, py: 1.2, borderRadius: 2 }}
            >
              Я настроил 2FA
            </Button>
          ) : (
            <>
              <Stack justifyContent={'flex-start'} alignItems={'flex-start'}>
                <Typography variant="body1" sx={{ my: 1 }}>
                  Введите код из приложения:
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
              </Stack>

              <Button
                onClick={handleVerify2FA}
                variant="contained"
                sx={{ mt: 2, fontSize: 16, px: 3, py: 1.2, borderRadius: 2 }}
              >
                Подтвердить 2FA
              </Button>

              <Box
                sx={{ width: '100%', height: 1, border: '1px solid #D4E7FF66' }}
              ></Box>
            </>
          )}
        </>
      )}
    </Stack>
  );
};
