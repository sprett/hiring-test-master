import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  base: '/',
  define: {
    globalThis: 'globalThis',
  },
  publicDir: false,
  server: {
    port: 9001,
    host: true,
  },
  resolve: {
    alias: {
      server: path.resolve(__dirname, './src/server/'),
      client: path.resolve(__dirname, './src/client/'),
      store: path.resolve(__dirname, './src/client/store/'),
    },
  },
  plugins: [
    react(),
    tsconfigPaths()
  ],
  build: {
    emptyOutDir: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupVitest.js']
  },
});
