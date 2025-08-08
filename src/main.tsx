import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import App from './App.tsx'
import './index.css'
import { appRouter } from './routes/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
