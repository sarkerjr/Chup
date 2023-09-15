import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT) || 3000,
  },
  plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 1600,

    rollupOptions: {
      output: {
        format: 'es',
        strict: false,
        entryFileNames: 'index.js',
        dir: 'dist/',
      },
    },
  },
});
