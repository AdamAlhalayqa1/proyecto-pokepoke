import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://AdamAlhalayqa1.github.io/proyecto-pokepoke/', 
  resolve: {
    alias: {
      '@': '/src', 
    },
    
  },
  server: {
    port: 3000, // Define un puerto estándar para el servidor
  },
  build: {
    outDir: 'dist', // Define la salida de compilación
    sourcemap: true, // Facilita la depuración
  },
});
