import './App.css'
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './services/Routes';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import ErrorBoundary from './components/error/ErrorBoundary'
import { useState, useEffect } from 'react';
import SplashScreen from './components/splash/SplashScreen';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // primary-blue
    },
  },
})

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const helmetContext = {};

  // Proveravamo da li smo na početnoj strani i da li treba prikazati splash screen
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/landing';
  const shouldShowSplash = isHomePage; // Uvek prikazujemo splash pri refreshu početne strane

  // Ako nismo na početnoj, preskačemo splash screen
  useEffect(() => {
    if (!shouldShowSplash) {
      setIsLoading(false);
    }
  }, [shouldShowSplash]);

  // Prikazujemo glavni sadržaj nakon što se završi loading
  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  //useGoogleAnalytics();
  //useGoogleTagManager();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider context={helmetContext}>
          {isLoading && shouldShowSplash ? (
            <SplashScreen finishLoading={handleFinishLoading} />
          ) : (
            <AppRoutes />
          )}
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
