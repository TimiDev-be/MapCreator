import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
      exclude: "",
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Wydzielanie bibliotek do osobnych plików
          if (
            id.includes("maplibre-gl") ||
            id.includes("maplibre-react-components")
          ) {
            return "maplibre";
          }
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router-dom")
          ) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
