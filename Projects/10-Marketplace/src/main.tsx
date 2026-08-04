import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FilterProvider } from './Context/filters'
import { ModalProvider } from './Context/modal'
import App from './App'

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <FilterProvider>
    <ModalProvider>
      <App/>
    </ModalProvider>
    </FilterProvider>
    
  </StrictMode>
)