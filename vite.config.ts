import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  // O workspace às vezes é um atalho. Sem root explícito o Vite mistura
  // C: e D: e o build emite index.html com caminho absoluto.
  root: path.resolve(__dirname),
  //base: command === "build" ? "/portifolioIgor/" : "/",
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
