import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

// Workspace may be a Desktop junction (C:\Users\… → D:\ArquivosMovidos\…).
// Vite's dep optimizer crashes when cwd/symlink and resolved root disagree
// (TypeError: reading 'imports'). Always pin root + cache to the real path.
const rootDir = fs.realpathSync(path.resolve(__dirname));

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  root: rootDir,
  cacheDir: path.join(rootDir, "node_modules/.vite"),
  //base: command === "build" ? "/portifolioIgor/" : "/",
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [rootDir],
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.join(rootDir, "src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
}));
