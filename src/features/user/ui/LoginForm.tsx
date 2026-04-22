import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import { useLoginMutation } from '@/entities/user/model/api/user.api';
import { setUser } from '@/entities/user/model/slice/userSlice';
import { RoutePath } from '@/shared/config/routeConfig';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { useAppDispatch } from '@/shared/lib/hooks/redux/useAppDispatch';
import { Input } from '@/shared/ui/Input/Input';

export const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await loginMutation({
        login: login.trim(),
        password,
      }).unwrap();

      localStorage.setItem('token', result.data.token);
      dispatch(setUser(result.data));
      navigate(RoutePath.lototrons, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, 'Ошибка входа'));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: { xs: 'calc(100dvh - 32px)', sm: 'calc(100dvh - 64px)' },
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 0, sm: 2 },
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: '8px',
          background: 'rgba(35, 38, 47, 0.94)',
          border: '1px solid rgba(212, 231, 255, 0.18)',
          boxShadow: '0 24px 70px rgba(12, 18, 32, 0.28)',
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography
              component="h1"
              sx={{
                color: '#FFFFFF',
                fontFamily: 'Inter-Bold',
                fontSize: { xs: '1.75rem', sm: '2rem' },
                lineHeight: 1.15,
              }}
            >
              Вход в админку
            </Typography>
            <Typography
              sx={{
                color: '#AEB6CA',
                fontSize: '1rem',
                lineHeight: 1.45,
              }}
            >
              Используйте логин и пароль администратора.
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: 'rgba(212, 231, 255, 0.14)' }} />

          {error && (
            <Alert severity="error" sx={{ borderRadius: '6px' }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2}>
            <Input
              label="Логин"
              sxLabel={{ color: '#FFFFFF' }}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              fullWidth
              autoComplete="username"
              autoFocus={!isMobile}
              disabled={isLoading}
            />

            <Input
              label="Пароль"
              sxLabel={{ color: '#FFFFFF' }}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
              disabled={isLoading}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'Скрыть пароль' : 'Показать пароль'
                        }
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        disabled={isLoading}
                        sx={{ color: '#DCE0ED' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !login.trim() || !password}
            fullWidth
            startIcon={
              isLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <LoginIcon />
              )
            }
            sx={{
              minHeight: 52,
              '&:active': {
                transform: 'scale(0.98)',
              },
              '&:hover': {
                transform: 'translateY(-1px)',
              },
            }}
          >
            {isLoading ? 'Входим...' : 'Войти'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
