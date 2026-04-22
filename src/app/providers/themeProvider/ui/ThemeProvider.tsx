import { ReactNode } from 'react';

import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import themeConfig from '../config/themeConfig';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  return <ThemeProviderMUI theme={themeConfig}>{children}</ThemeProviderMUI>;
};

export default ThemeProvider;
