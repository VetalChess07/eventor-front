import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/providers/router';
import ThemeProvider from './app/providers/themeProvider/ui/ThemeProvider';

import { ErrorBoundary } from './app/providers/ErrorBoundary';

import '@app/styles/index.scss';
import { LocalizationProvider } from './app/providers/localizationProvider';
import { SnackbarProvider } from './shared/ui/Snackbar/Snackbar';
import { StoreProvider } from './app/providers/storeProvider';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <LocalizationProvider>
            <SnackbarProvider>
              <StoreProvider>
                <AppRouter />
              </StoreProvider>
            </SnackbarProvider>
          </LocalizationProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
