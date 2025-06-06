import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', //
        changeOrigin: true,
        secure: false,
      },
    },
  },
});