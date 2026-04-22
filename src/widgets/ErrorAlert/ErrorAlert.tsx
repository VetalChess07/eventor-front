import React from 'react';
import { Alert, AlertProps } from '@mui/material';

interface ErrorAlertProps extends Omit<AlertProps, 'severity'> {
  message?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message = 'Произошла ошибка',
  ...rest
}) => {
  return (
    <Alert severity="error" {...rest}>
      {message}
    </Alert>
  );
};
