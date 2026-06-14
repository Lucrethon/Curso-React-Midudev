import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// el componente StricMode te avisa cuando se esta utilizando codigo desactualizado de React 
// tambien, con cada renderizacion, ejecuta un efecto, ejecuta un cleanUp para limpiar y después ejecuta el efecto otra vez 
// asi se asegura de que el componente funciona correctamente y el useEffect tambien