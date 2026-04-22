import React from 'react';
import { Box, Container, Stack } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
      <Stack
        component="main"
        flex={1}
        py={4}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        width="100%"
      >
        <Container maxWidth="sm">{children}</Container>
      </Stack>
    </Box>
  );
};
