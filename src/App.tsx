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

  // Proveravamo da li smo na početnoj strani
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/landing';

  // Prikazujemo loading screen samo na početnoj strani
  useEffect(() => {
    if (!isHomePage) {
      // Ako nismo na početnoj strani, odmah završavamo loading
      setIsLoading(false);
    } else {
      // Ako smo na početnoj strani, prikazujemo loading screen 3 sekunde
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider context={helmetContext}>
          <Router>
            <div className="App">
              {isHomePage && <LoadingScreen loading={isLoading} />}
              <AppRoutes />
            </div>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
