import MuiSnackbar from '@mui/material/Snackbar';
import { createContext, useContext, useState, ReactNode, useRef } from 'react';

export type SnackbarContextType = {
  showSnackbar: (
    message: string,
    type: 'success' | 'warning' | 'error',
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: 'success' | 'warning' | 'error';
  } | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showSnackbar = (
    message: string,
    type: 'success' | 'warning' | 'error',
  ) => {
    // Очистим таймер, если он есть
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSnackbar(null);

    timeoutRef.current = setTimeout(() => {
      setSnackbar({ message, type });
    }, 50);
  };

  const handleClose = () => {
    setSnackbar(null);
  };

  const getBackgroundColor = (type: 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <MuiSnackbar
          key={snackbar.message} // важно для принудительного перерендеринга
          open={!!snackbar}
          message={snackbar.message}
          onClose={handleClose}
          autoHideDuration={3000}
          style={{
            zIndex: 1000000000000000,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          ContentProps={{
            style: {
              backgroundColor: getBackgroundColor(snackbar.type),
              color: 'white',
            },
          }}
        />
      )}
    </SnackbarContext.Provider>
  );
};
