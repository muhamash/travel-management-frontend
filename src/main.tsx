import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { store } from './redux/store';
import { appRouter } from './routes/index.ts';

createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <ThemeProvider
      storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={appRouter}>
          <App />
        </RouterProvider>
        <Toaster position='top-center' />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);