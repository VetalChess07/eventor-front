import { createTheme } from '@mui/material/styles';

import { componentsConfig } from './components';
import { typographyConfig } from './typography';
import { breakpointsConfig } from './breakpoints';

const themeConfig = createTheme({
  breakpoints: breakpointsConfig,
  typography: typographyConfig,
  components: componentsConfig,
});

export default themeConfig;
