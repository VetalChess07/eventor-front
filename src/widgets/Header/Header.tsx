import { memo } from 'react';
import { Box } from '@mui/material';
import { Logo } from '../Logo/Logo';

export const Header = memo(() => (
  <Box
    component="header"
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '40px',
      paddingTop: 'var(--padding-lg)',
      paddingBottom: 'var(--padding-lg)',
      paddingRight: 'var(--padding-sm)',
      paddingLeft: 'var(--padding-sm)',
      backgroundColor: 'var(--secondary-bg)',
    }}
  >
    <Logo />
  </Box>
));
