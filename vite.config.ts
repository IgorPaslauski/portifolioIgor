import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  // Define a base com base no ambiente ou comando
  base: command === "build" ? "/portifolioIgor/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
}));
