/**
 * Fase 3 captures — Engineering, Closing, reverse scroll, #contact.
 * Usage: node scripts/fase3-capture.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "art", "audit", "fase3");
const base = process.argv[2] || "http://127.0.0.1:8090";
fs.mkdirSync(outDir, { recursive: true });

async function shot(page, name) {
  await page.waitForTimeout(450);
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
}

async function saveCanvas(page, name) {
  const dataUrl = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    return c ? c.toDataURL("image/png") : null;
  });
  if (!dataUrl) return;
  fs.writeFileSync(
    path.join(outDir, name),
    Buffer.from(dataUrl.split("base64,").pop(), "base64")
  );
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = { base, captures: [], checks: {} };

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });

  for (const id of ["engineering", "contact"]) {
    await page.evaluate((t) => {
      document.getElementById(t)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await page.waitForTimeout(600);
    await shot(page, `desktop-${id}.png`);
    await saveCanvas(page, `canvas-${id}.png`);
    report.captures.push(`desktop-${id}.png`);
    report.checks[id] = await page.evaluate(() => window.__sculptureProgress ?? null);
  }

  // Direct #contact
  await page.goto(base + "/#contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await shot(page, "desktop-anchor-contact.png");
  report.checks.anchorContact = await page.evaluate(() => window.__sculptureProgress ?? null);

  // Reverse: contact → engineering → lab
  const reverse = [];
  for (const id of ["contact", "engineering", "lab"]) {
    await page.evaluate((t) => {
      document.getElementById(t)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await page.waitForTimeout(500);
    const t = await page.evaluate(() => window.__sculptureProgress ?? null);
    reverse.push({ id, t });
  }
  report.checks.reverse = reverse;

  report.checks.nav = await page.evaluate(() =>
    [...document.querySelectorAll("nav a")].map((a) => a.textContent?.trim())
  );

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

  report.checks.cv = await page.evaluate(async () => {
    const a = document.querySelector('a[download="cv-igor-paslauski.pdf"]');
    if (!a) return { present: false };
    try {
      const res = await fetch(a.href, { method: "HEAD" });
      return { present: true, href: a.getAttribute("href"), ok: res.ok, status: res.status };
    } catch {
      return { present: true, href: a.getAttribute("href"), ok: false };
    }
  });

  await ctx.close();

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
  });
  const m = await mobile.newPage();
  await m.goto(base + "/", { waitUntil: "networkidle" });
  for (const id of ["engineering", "contact"]) {
    await m.evaluate((t) => {
      document.getElementById(t)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await m.waitForTimeout(500);
    await shot(m, `mobile-${id}.png`);
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
