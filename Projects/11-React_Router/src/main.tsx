import './style.css'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
import { I18nProvider } from './Context/i18n'
import { RouterProvider } from './Context/Router'

createRoot(document.getElementById('app') as HTMLElement).render(

  <StrictMode>
    <RouterProvider>
    <I18nProvider>
    <App/>
    </I18nProvider>
    </RouterProvider>
  </StrictMode>
)
