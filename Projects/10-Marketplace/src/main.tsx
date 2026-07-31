import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FilterProvider } from './Context/filters'
import App from './App'

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <FilterProvider>
      <App/>
    </FilterProvider>
  </StrictMode>
)