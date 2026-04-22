import { Dispatch, SetStateAction } from 'react';
import { InputProps } from '@mui/material';

export interface InputMaping<T> {
  id?: string | number;
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  params?: Partial<InputProps>;
}
