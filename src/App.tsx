import './App.css'
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './services/Routes';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import ErrorBoundary from './components/error/ErrorBoundary'
import { useState, useEffect } from 'react';
import LoadingScreen from './components/splash/LoadingScreen';
import { BrowserRouter as Router } from 'react-router-dom'
import { CmsDataProvider } from './services/CmsProvider';
import ActionButtons from './components/actionButtons';
import { FavoritesProvider } from './hooks/FavoritesContext';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 30, 74)', // primary-dark-blue
    },
  },
})

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const helmetContext = {};

  // Proveravamo da li smo na početnoj strani
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/landing';

  // Prikazujemo loading screen samo na početnoj strani
  useEffect(() => {
    if (!isHomePage) {
      // Ako nismo na početnoj strani, odmah završavamo loading
      setIsLoading(false);
    } else {
      // Povećano vreme za prikaz animacije loga
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Povećano sa 600ms na 1000ms
      
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FavoritesProvider>
          <CmsDataProvider defaultLang = "sr">
            <HelmetProvider context={helmetContext}>
              <Router>
                <div className="App">
                  {isHomePage && <LoadingScreen loading={isLoading} />}
                  <AppRoutes />
                  <ActionButtons />
                </div>
              </Router>
            </HelmetProvider>
          </CmsDataProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
