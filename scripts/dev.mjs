/**
 * Start Vite from the realpath of the repo.
 * Desktop junction (C:\\Users\\…\\Portifolio → D:\\ArquivosMovidos\\…) makes
 * Vite's dep optimizer throw TypeError reading 'imports' when cwd is the junction.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = fs.realpathSync(path.join(scriptDir, ".."));
process.chdir(root);

const child = spawn("npx", ["vite", ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 1));
