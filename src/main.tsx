import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-multi-carousel/lib/styles.css'
import reportWebVitals from '~/reportWebVitals.ts'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import router from './routes.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

reportWebVitals();