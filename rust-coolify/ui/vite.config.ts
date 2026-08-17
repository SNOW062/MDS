import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Docker daxilində əlçatan olmaq üçün host qoyuruq
    port: 5173,
    strictPort: true,
    allowedHosts: true, // Proxy vasitəsilə daxil olmaq üçün bütün hostlara icazə veririk
    watch: {
      usePolling: true, // Windows/WSL2 fayl izləmə problemini həll edir
      interval: 100
    },
    proxy: {
      '/api': {
        target: 'http://app:9000', // Docker compose daxilindəki app servisi
        changeOrigin: true,
        secure: false,
      }
    }
  }


})
