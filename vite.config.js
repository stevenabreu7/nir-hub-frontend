import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Determine if in production
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    // Set up proxy for API requests to avoid CORS issues in development
    proxy: {
      '/api': {
        target: 'https://nir-hub-042025.web.app',
        changeOrigin: true,
        secure: true
      }
    }
  },
  // For GitHub Pages deployment - only use the base in production
  base: isProduction ? '/NIR-hub-frontend/' : '/'
})