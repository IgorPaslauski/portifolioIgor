/**
 * Production smoke test against the live domain.
 * Usage: node scripts/prod-smoke.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "art", "audit", "production");
const base = (process.argv[2] || "https://paslauski.com.br").replace(/\/$/, "");
fs.mkdirSync(outDir, { recursive: true });

async function shot(page, name) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
}

async function scrollTo(page, id) {
  await page.evaluate((t) => {
    document.getElementById(t)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, id);
  await page.waitForTimeout(550);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = {
    base,
    at: new Date().toISOString(),
    checks: {},
    static: {},
    errors: [],
  };

  // Static assets
  for (const asset of [
    "/projects.json",
    "/navs.json",
    "/sculpture/monogram.glb",
    "/cv-igor-paslauski.pdf",
    "/favicon.ico",
    "/CNAME",
  ]) {
    try {
      const res = await fetch(base + asset, { method: "HEAD", redirect: "follow" });
      report.static[asset] = { status: res.status, ok: res.ok };
    } catch (e) {
      report.static[asset] = { ok: false, error: String(e) };
    }
  }

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    // Temporary: custom-domain cert may still be *.github.io during provisioning.
    ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => report.errors.push(`page: ${e}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") report.errors.push(`console: ${msg.text()}`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && res.url().startsWith(base)) {
      report.errors.push(`http ${res.status()} ${res.url()}`);
    }
  });

  await page.goto(base + "/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);

  report.checks.seo = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || null,
    ogTitle: document.querySelector('meta[property="og:title"]')?.content || null,
    themeColor: document.querySelector('meta[name="theme-color"]')?.content || null,
    lang: document.documentElement.lang,
  }));

  report.checks.themeToggle = await page.evaluate(() =>
    Boolean(document.querySelector('button[aria-label*="tema" i]'))
  );

  report.checks.canvas = await page.evaluate(() => Boolean(document.querySelector("canvas")));
  await shot(page, "desktop-hero.png");

  const progress = {};
  for (const id of ["home", "work", "lab", "engineering", "contact"]) {
    await scrollTo(page, id);
    progress[id] = {
      t: await page.evaluate(() => window.__sculptureProgress ?? null),
      nav: await page.evaluate(
        () => document.querySelector('nav a[aria-current="true"]')?.textContent?.trim() || null
      ),
    };
    await shot(page, `desktop-${id}.png`);
  }
  report.checks.progress = progress;

  report.checks.lab = await page.evaluate(() => {
    const titles = [...document.querySelectorAll("#lab ul.divide-y li p.font-medium")].map((el) =>
      el.textContent?.trim()
    );
    return {
      count: titles.length,
      sample: titles.slice(0, 3),
      alert: document.querySelector("#lab [role='alert']")?.textContent?.trim() || null,
    };
  });

  await page.fill("#lab-filter", "PortGo");
  await page.waitForTimeout(200);
  report.checks.labFilter = await page.evaluate(() =>
    [...document.querySelectorAll("#lab ul.divide-y li p.font-medium")].map((el) =>
      el.textContent?.trim()
    )
  );
  await page.fill("#lab-filter", "");

  report.checks.medium = await page.evaluate(() => ({
    error: document.querySelector("#lab")?.innerText.includes("Artigos indisponíveis") || false,
    link: Boolean(document.querySelector('a[href*="medium.com"]')),
  }));

  report.checks.contact = await page.evaluate(async () => {
    const mail = document.querySelector('a[href^="mailto:"]');
    const cv = document.querySelector('a[download="cv-igor-paslauski.pdf"]');
    let cvStatus = null;
    if (cv) {
      try {
        const r = await fetch(cv.href, { method: "HEAD" });
        cvStatus = r.status;
      } catch {
        cvStatus = "error";
      }
    }
    return {
      email: mail?.getAttribute("href") || null,
      cvPresent: Boolean(cv),
      cvStatus,
      linkedin: Boolean(document.querySelector('a[href*="linkedin.com"]')),
      github: Boolean(document.querySelector('a[href*="github.com"]')),
    };
  });

  // reverse
  const reverse = [];
  for (const id of ["contact", "engineering", "lab", "work", "home"]) {
    await scrollTo(page, id);
    reverse.push({
      id,
      t: await page.evaluate(() => window.__sculptureProgress ?? null),
      nav: await page.evaluate(
        () => document.querySelector('nav a[aria-current="true"]')?.textContent?.trim() || null
      ),
    });
  }
  report.checks.reverse = reverse;

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

  // Anchors
  for (const hash of ["#work", "#lab", "#contact"]) {
    await page.goto(base + "/" + hash, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(800);
    report.checks[`anchor${hash}`] = await page.evaluate(() => ({
      t: window.__sculptureProgress ?? null,
      nav: document.querySelector('nav a[aria-current="true"]')?.textContent?.trim() || null,
      hash: location.hash,
    }));
    await shot(page, `desktop-anchor-${hash.slice(1)}.png`);
  }

  await ctx.close();

  // Reduced motion / fallback
  {
    const rm = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
      ignoreHTTPSErrors: true,
    });
    const p = await rm.newPage();
    await p.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
    await p.waitForTimeout(800);
    report.checks.reducedMotion = await p.evaluate(() => ({
      canvas: Boolean(document.querySelector("canvas")),
      svg: Boolean(document.querySelector("svg")),
    }));
    await shot(p, "desktop-reduced-motion.png");
    await rm.close();
  }

  // Mobile
  {
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      ignoreHTTPSErrors: true,
    });
    const m = await mobile.newPage();
    await m.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
    await m.waitForTimeout(900);
    await shot(m, "mobile-hero.png");
    await scrollTo(m, "lab");
    report.checks.mobileLab = await m.evaluate(
      () => [...document.querySelectorAll("#lab ul.divide-y li p.font-medium")].length
    );
    await shot(m, "mobile-lab.png");
    await scrollTo(m, "contact");
    await shot(m, "mobile-contact.png");
    await mobile.close();
  }

  // Filter critical errors (ignore known Medium/rss noise)
  report.criticalErrors = report.errors.filter(
    (e) =>
      !/rss2json|medium\.com|CORS|cloudflare/i.test(e) &&
      !/net::ERR_FAILED.*rss/i.test(e)
  );

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
