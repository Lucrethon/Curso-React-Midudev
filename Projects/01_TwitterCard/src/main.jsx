import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'

// Ejercicio: UI de Twitter

const root = createRoot(document.getElementById('root'))

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

root.render(
  <App />
);

// Usually, component are created in a separate file