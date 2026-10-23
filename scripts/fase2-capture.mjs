/**
 * Fase 2 visual captures — Selected Work cases + Lab.
 * Usage: node scripts/fase2-capture.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "art", "audit", "fase2");
const base = process.argv[2] || "http://127.0.0.1:8090";
fs.mkdirSync(outDir, { recursive: true });

async function shot(page, name) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = { base, captures: [], checks: {} };

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await desktop.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });

  for (const id of ["purosuco", "layout-plus", "fire-sim", "iris-publica", "lab"]) {
    await page.evaluate((target) => {
      document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await page.waitForTimeout(500);
    await shot(page, `desktop-${id}.png`);
    report.captures.push(`desktop-${id}.png`);
  }

  report.checks.nav = await page.evaluate(() =>
    [...document.querySelectorAll('nav a')].map((a) => a.textContent?.trim())
  );
  report.checks.progressAtLab = await page.evaluate(() => window.__sculptureProgress ?? null);
  report.checks.demand = await page.evaluate(async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { ok: false };
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return { ok: false };
    let draws = 0;
    for (const name of ["drawArrays", "drawElements"]) {
      const orig = gl[name].bind(gl);
      gl[name] = (...args) => {
        draws++;
        return orig(...args);
      };
    }
    draws = 0;
    await new Promise((r) => setTimeout(r, 700));
    return { staticDraws: draws, demandLikely: draws === 0 };
  });

  await desktop.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
  });
  const mpage = await mobile.newPage();
  await mpage.goto(base + "/", { waitUntil: "networkidle" });
  for (const id of ["purosuco", "lab"]) {
    await mpage.evaluate((target) => {
      document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await mpage.waitForTimeout(500);
    await shot(mpage, `mobile-${id}.png`);
    report.captures.push(`mobile-${id}.png`);
  }
  await mobile.close();

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
