import { Box, Container } from '@mui/material';
import { Header } from '@/widgets/Header/Header';
import { Footer } from '@/widgets/Footer/Footer';
import { Nav } from '@/widgets/Nav/Nav';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
      <Header />
      <Box display="flex" flex={1} minHeight={0}>
        <Nav />
        <Box
          component="main"
          flex={1}
          minWidth={0}
          py={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          minHeight="100dvh"
        >
          <Container maxWidth="lg">{children}</Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export const LoaderWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <Box
    width="100%"
    height="100dvh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    {children}
  </Box>
);
