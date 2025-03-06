import './App.css'
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './services/Routes';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import ErrorBoundary from './components/error/ErrorBoundary'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // primary-blue
    },
  },
})

function App() {
  const helmetContext = {};

  //useGoogleAnalytics();
  //useGoogleTagManager();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider context={helmetContext}>
          <AppRoutes />
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
