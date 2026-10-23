/**
 * Capture PoC audit screenshots via Playwright if available, else exit with instructions.
 * Prefer running via the Cursor browser CDP session; this is a fallback CLI.
 */
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "art", "audit");
await mkdir(outDir, { recursive: true });
console.log("Audit output dir:", outDir);
console.log("Use browser CDP captures from the agent session; CLI playwright not required.");
