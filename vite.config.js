import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "https://AdamAlhalayqa1.github.io/proyecto-pokepoke/",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 3000,
    historyApiFallback: true, // Reenvía todas las rutas al index.html
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
