/**
 * Visual audit captures — Playwright viewports + canvas dumps + scroll poses.
 * Usage: node scripts/audit-capture.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "art", "audit");
const base = process.argv[2] || "http://127.0.0.1:8090";

fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "390x844", width: 390, height: 844 },
];

async function waitSculpture(page, tTarget = null, { requireCanvas = true } = {}) {
  if (requireCanvas) {
    await page.waitForFunction(() => {
      const c = document.querySelector("canvas");
      return c && c.width > 8 && c.height > 8;
    }, { timeout: 20000 });
  } else {
    await page.waitForSelector("#home svg", { timeout: 15000 });
  }
  await page.waitForTimeout(500);
  if (tTarget != null && requireCanvas) {
    await page.waitForFunction(
      (t) => window.__sculptureAudit && Math.abs(window.__sculptureAudit.t - t) < 0.04,
      tTarget,
      { timeout: 15000 }
    );
  }
}

async function saveCanvas(page, file) {
  const dataUrl = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    if (!c) return null;
    return c.toDataURL("image/png");
  });
  if (!dataUrl) throw new Error("no canvas for " + file);
  const b64 = dataUrl.split("base64,").pop();
  fs.writeFileSync(path.join(outDir, file), Buffer.from(b64, "base64"));
}

async function scrollToProgress(page, targetT) {
  await page.evaluate((t) => {
    const home = document.getElementById("home");
    const work = document.getElementById("work");
    if (!home || !work) return;
    // Exact inverse of useSectionProgress measure()
    const start = home.offsetTop + home.offsetHeight * 0.32;
    const end = work.offsetTop + 48;
    const minSpan = Math.max(480, Math.round(window.innerHeight * 0.65));
    const span = Math.max(end - start, minSpan);
    const scrollY = start + span * t - window.innerHeight * 0.3;
    window.scrollTo({ top: Math.max(0, scrollY), behavior: "instant" });
  }, targetT);
  await page.waitForTimeout(500);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = { base, captures: [], checks: {} };

  // --- Hero viewports (closed) ---
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await waitSculpture(page, 0);
    const shot = `after-hero-${vp.name}.png`;
    await page.screenshot({ path: path.join(outDir, shot), fullPage: false });
    await saveCanvas(page, `after-canvas-closed-${vp.name}.png`);
    report.captures.push(shot);
    await context.close();
  }

  // --- Pose sequence at 1440 ---
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await waitSculpture(page);

    await scrollToProgress(page, 0);
    await waitSculpture(page, 0);
    await page.screenshot({ path: path.join(outDir, "after-closed.png") });
    await saveCanvas(page, "after-closed-canvas.png");

    await scrollToProgress(page, 0.2);
    await page.waitForTimeout(400);
    report.checks.unlock = await page.evaluate(() => window.__sculptureProgress ?? null);
    await page.screenshot({ path: path.join(outDir, "after-unlock.png") });
    await saveCanvas(page, "after-unlock-canvas.png");

    await scrollToProgress(page, 0.52);
    await page.waitForTimeout(400);
    const tOpen = await page.evaluate(() => ({
      t: window.__sculptureAudit?.t ?? null,
      p: window.__sculptureProgress ?? null,
    }));
    await page.screenshot({ path: path.join(outDir, "after-opening.png") });
    await saveCanvas(page, "after-opening-canvas.png");
    report.checks.opening = tOpen;

    await scrollToProgress(page, 1);
    await page.waitForTimeout(300);
    const t1 = await page.evaluate(() => window.__sculptureAudit?.t ?? null);
    await page.screenshot({ path: path.join(outDir, "after-work.png") });
    await saveCanvas(page, "after-work-canvas.png");
    report.checks.workT = t1;

    // Reverse scroll reconstruct
    await scrollToProgress(page, 0);
    await page.waitForTimeout(400);
    const tBack = await page.evaluate(() => window.__sculptureAudit?.t ?? null);
    await page.screenshot({ path: path.join(outDir, "pose-reverse-closed.png") });
    await saveCanvas(page, "pose-reverse-closed-canvas.png");
    report.checks.reverseT = tBack;
    report.checks.reverseOk = Math.abs(tBack ?? 1) < 0.03;

    // Demand-mode: hook draw calls; static window should stay at 0 new draws
    const idle = await page.evaluate(async () => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return { ok: false };
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) return { ok: false, reason: "no gl" };
      let draws = 0;
      const wrap = (name) => {
        const orig = gl[name].bind(gl);
        gl[name] = (...args) => {
          draws++;
          return orig(...args);
        };
      };
      wrap("drawArrays");
      wrap("drawElements");
      wrap("drawArraysInstanced");
      wrap("drawElementsInstanced");
      draws = 0;
      await new Promise((r) => setTimeout(r, 900));
      const staticDraws = draws;
      window.scrollBy(0, 40);
      await new Promise((r) => setTimeout(r, 200));
      const afterScroll = draws;
      return {
        ok: true,
        staticDraws,
        afterScroll,
        demandLikely: staticDraws === 0 && afterScroll > 0,
        auditAt: window.__sculptureAudit?.at ?? null,
      };
    });
    report.checks.idle = idle;

    // Anchor #work
    await page.goto(base + "/#work", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const anchorT = await page.evaluate(() => window.__sculptureAudit?.t ?? null);
    await page.screenshot({ path: path.join(outDir, "anchor-work.png") });
    report.checks.anchorWorkT = anchorT;

    await context.close();
  }

  // --- Fallback SVG ---
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(base + "/?fallback=1", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const fb = await page.evaluate(() => ({
      canvas: !!document.querySelector("canvas"),
      svg: !!document.querySelector("#home svg"),
      paths: document.querySelectorAll("#home svg *").length,
    }));
    await page.screenshot({ path: path.join(outDir, "fallback-svg-1440.png") });
    report.checks.fallback = fb;
    await context.close();
  }

  // --- Reduced motion (forces SVG fallback — no canvas) ---
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await waitSculpture(page, null, { requireCanvas: false });
    await scrollToProgress(page, 0.6);
    await page.waitForTimeout(400);
    const rm = await page.evaluate(() => ({
      canvas: !!document.querySelector("canvas"),
      svg: !!document.querySelector("#home svg"),
      progress: window.__sculptureProgress ?? null,
    }));
    await page.screenshot({ path: path.join(outDir, "reduced-motion.png") });
    report.checks.reducedMotion = rm;
    await context.close();
  }

  fs.writeFileSync(path.join(outDir, "capture-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
