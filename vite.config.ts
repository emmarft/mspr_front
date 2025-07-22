import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api-produits': 'http://localhost:3001',
      '/api-clients': 'http://localhost:3333',
      '/api-commandes': 'http://localhost:3003',
      '/api-auth': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-auth/, '/payetonkawa/api/v1/auth')
      }
    }
  }
})