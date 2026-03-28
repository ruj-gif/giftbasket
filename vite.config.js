import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Make sure this is just a slash for most deployments
  server: {
    port: 3000, 
    proxy: {
      // Directs any call starting with /api to the Qobo server
      '/api': {
        target: 'https://api.qobo.dev',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})