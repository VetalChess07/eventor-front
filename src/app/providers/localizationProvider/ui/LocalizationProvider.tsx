import { ReactNode } from 'react';

import { LocalizationProvider as LocalizationProviderMUI } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider = ({
  children,
}: LocalizationProviderProps) => {
  dayjs.locale('ru');

  return <LocalizationProviderMUI>{children}</LocalizationProviderMUI>;
};
