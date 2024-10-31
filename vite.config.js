import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    chunkSizeWarningLimit: 500,
    outDir: "./dist",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@core": fileURLToPath(new URL("./src/core", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@service": fileURLToPath(
        new URL("./src/services/sections", import.meta.url)
      ),
      "@utils": fileURLToPath(new URL("./src/libs/utils", import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
});
