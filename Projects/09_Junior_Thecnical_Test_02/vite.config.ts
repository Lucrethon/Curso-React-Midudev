import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite lee este archivo al arrancar
export default defineConfig({
  // Aquí es donde "inyectas" los superpoderes
  plugins: [react()]
})