import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from './components/ui/sonner';
import { AppRoutes } from './routes';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <AppRoutes />
          <Toaster position="top-center" />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;