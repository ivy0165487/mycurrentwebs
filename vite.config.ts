import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mycurrentwebs/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
