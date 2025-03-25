import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// path is now "@/components/ui/button"
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Build to Django's static directory
    chunkSizeWarningLimit: 2000,
    outDir: '../static/dist',
    emptyOutDir: true,
    manifest: true,
  },
  server: {
    port: 5173, //default running port set
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})