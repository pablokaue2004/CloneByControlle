import { CssBaseline } from '@mui/material';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

import { ErrorBoundary } from 'react-error-boundary';
import { Theme } from 'themes';
import { AuthProvider } from './context/AuthProvider';
import Error from './components/Error';

import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider theme={responsiveFontSizes(Theme)}>
      <CssBaseline />
      <AuthProvider>
        <ErrorBoundary FallbackComponent={Error}>
          <AppRoutes />
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
