import { memo } from 'react';
import {
  Box,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
  TypographyProps,
} from '@mui/material';

import cls from './Input.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export type InputProps = TextFieldProps & {
  sxInner?: SxProps<Theme> | undefined;
  sxLabel?: SxProps<Theme> | undefined;
  classNameInner?: string;
  labelVariant?: TypographyProps['variant'];
  errorText?: string;
};

export const Input = memo((props: InputProps) => {
  const {
    label,
    onChange,
    value,
    disabled,
    variant = 'outlined',
    sxLabel,
    labelVariant,
    sxInner,
    classNameInner,
    error,
    errorText = '',
    id,
    type = 'text',
    ...other
  } = props;

  return (
    <Box sx={sxInner} className={classNames(cls.Input, {}, [classNameInner])}>
      {label && (
        <Typography
          sx={{ color: 'var(--ligth)', ...(sxLabel ?? {}) }}
          component="label"
          htmlFor={id}
          textAlign="left"
          variant={labelVariant}
        >
          {label}
        </Typography>
      )}
      <TextField
        fullWidth
        variant={variant}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={!!error}
        id={id}
        type={type}
        {...other}
      />
      {error && (
        <Typography sx={{ color: 'var(--danger-color)' }} variant="overline">
          {errorText}
        </Typography>
      )}
    </Box>
  );
});
