/** Resolve a file under `public/` against Vite `base` (works at `/` or subpaths). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = path.replace(/^\//, "");
  return `${base}${normalized}`;
}
