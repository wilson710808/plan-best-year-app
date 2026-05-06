import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ws/03-plan-best-year/',
  server: {
    host: '0.0.0.0',
    port: 3003
  },
  preview: {
    host: '0.0.0.0',
    port: 3003
  }
})
