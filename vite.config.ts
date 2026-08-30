import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        privacy: path.resolve(__dirname, "politica-de-confidentialitate/index.html"),
        terms: path.resolve(__dirname, "termeni-si-conditii/index.html"),
        imprint: path.resolve(__dirname, "date-legale/index.html"),
        thanks: path.resolve(__dirname, "multumim/index.html"),
        notFound: path.resolve(__dirname, "404.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
