import { useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

import cls from './ButtonLogout.module.scss';

import { logout } from '@/features/checkISAdmin/model/servise/logout';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig';

export const ButtonLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const sucsessCallback = () => {
    navigate(RoutePath.auth);
  };

  const onLogout = async () => {
    await logout({
      setIsLoading,
      setError,
      sucsessCallback,
    });
  };

  return (
    <div className={cls.wrapper}>
      <Button
        onClick={onLogout}
        className={cls.ButtonLogout}
        startIcon={!isLoading ? <Logout /> : null}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={20} /> : 'Выйти'}
      </Button>

      {error && (
        <Typography color="error" className={cls.error}>
          {error}
        </Typography>
      )}
    </div>
  );
};
