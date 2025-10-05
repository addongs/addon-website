import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
    server: {
    host: '0.0.0.0', // explicitly expose network
    port: 5173
  },
    base: '/addon-website/', // <-- tells Vite the site is under this subpath

});
