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
import TagManager from 'react-gtm-module'
import PageTracker from './services/PageTracker';
import { AuthProvider } from './services/AuthProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 30, 74)', // primary-dark-blue
    },
  },
})


function App() {
 // const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const helmetContext = {};

  // Check if we're on the home page
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/landing';

  // Show loading screen only on home page
  useEffect(() => {
    if (!isHomePage) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  // Initial GTM setup
  useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-K6SP5HZJ'
    });
  }, []);

  // Track page views on route change
  // useEffect(() => {
  //   TagManager.dataLayer({
  //     dataLayer: {
  //       event: 'pageview',
  //       page_path: location.pathname,
  //       page_location: window.location.href,
  //       page_title: document.title // This will capture the updated title
  //     }
  //   });
  // }, [location]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <FavoritesProvider>
            <CmsDataProvider defaultLang="sr">
              <HelmetProvider context={helmetContext}>
                <Router>
                  <div className="App">
                    {isHomePage && <LoadingScreen loading={isLoading} />}
                    <PageTracker />
                    <AppRoutes />
                    <ActionButtons />
                  </div>
                </Router>
              </HelmetProvider>
            </CmsDataProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
