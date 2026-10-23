/**
 * Fase A validation captures.
 * Usage: node scripts/fase-a-capture.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "art", "audit", "fase-a");
const base = process.argv[2] || "http://127.0.0.1:8765";
fs.mkdirSync(outDir, { recursive: true });

async function shot(page, name) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
}

async function scrollTo(page, id) {
  await page.evaluate((t) => {
    document.getElementById(t)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, id);
  await page.waitForTimeout(500);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = { base, at: new Date().toISOString(), checks: {} };

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  report.checks.themeToggle = await page.evaluate(() =>
    Boolean(document.querySelector('button[aria-label*="tema" i], button[aria-label*="theme" i]'))
  );

  report.checks.heroHasToggleInHeader = await page.evaluate(() => {
    const header = document.querySelector("header");
    if (!header) return null;
    return {
      buttons: [...header.querySelectorAll("button")].map((b) => b.getAttribute("aria-label")),
      hasSunMoon: Boolean(header.querySelector("svg.lucide-sun, svg.lucide-moon")),
    };
  });

  await shot(page, "desktop-hero-no-theme.png");

  await scrollTo(page, "lab");
  await page.waitForTimeout(400);
  report.checks.lab = await page.evaluate(() => {
    const items = [...document.querySelectorAll("#lab li")].map((li) =>
      li.textContent?.trim().slice(0, 80)
    );
    const alert = document.querySelector("#lab [role='alert']")?.textContent?.trim();
    const filter = document.querySelector("#lab-filter");
    return {
      itemCount: items.filter((t) => t && !t.includes("Nenhum")).length,
      firstItems: items.slice(0, 5),
      alert: alert || null,
      filterEnabled: filter ? !filter.disabled : false,
      hasEmptyFilterMsg: items.some((t) => t?.includes("Nenhum item para este filtro")),
      hasUnavailable: Boolean(alert?.includes("indisponível")),
    };
  });
  await shot(page, "desktop-lab-loaded.png");

  // Filter smoke
  await page.fill("#lab-filter", "PortGo");
  await page.waitForTimeout(200);
  report.checks.labFilter = await page.evaluate(() => {
    const items = [...document.querySelectorAll("#lab ul.divide-y li")].map((li) =>
      li.querySelector("p.font-medium")?.textContent?.trim()
    );
    return { titles: items.filter(Boolean) };
  });
  await page.fill("#lab-filter", "");
  await page.waitForTimeout(150);

  // Nav active across sections
  const navActive = {};
  for (const id of ["work", "lab", "engineering", "contact"]) {
    await scrollTo(page, id);
    await page.waitForTimeout(350);
    navActive[id] = await page.evaluate(() => {
      const current = document.querySelector('nav a[aria-current="true"]');
      return {
        label: current?.textContent?.trim() || null,
        href: current?.getAttribute("href") || null,
      };
    });
    await shot(page, `desktop-nav-${id}.png`);
  }
  report.checks.navActive = navActive;

  // Direct #contact
  await page.goto(base + "/#contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  report.checks.anchorContact = await page.evaluate(() => ({
    t: window.__sculptureProgress ?? null,
    nav: document.querySelector('nav a[aria-current="true"]')?.textContent?.trim() || null,
  }));
  await shot(page, "desktop-anchor-contact.png");

  // Sculpture demand + reverse
  const reverse = [];
  for (const id of ["contact", "engineering", "lab", "work"]) {
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

  report.checks.copyLeak = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      experiencesJson: text.includes("experiences.json"),
      fontesReadme: /Fontes:\s*README/i.test(text),
      fontesJson: /Fontes:.*\.json/i.test(text),
    };
  });

  report.checks.cv = await page.evaluate(async () => {
    const a = document.querySelector('a[download="cv-igor-paslauski.pdf"]');
    if (!a) return { present: false };
    const res = await fetch(a.href, { method: "HEAD" });
    return { present: true, status: res.status, ok: res.ok };
  });

  report.pageErrors = errors.filter(
    (e) => !e.includes("rss2json") && !e.includes("CORS") && !e.includes("cloudflare")
  );
  report.rawErrorsSample = errors.slice(0, 8);

  // Mobile
  await ctx.close();
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const m = await mobile.newPage();
  await m.goto(base + "/", { waitUntil: "networkidle" });
  await m.waitForTimeout(700);
  report.checks.mobileThemeToggle = await m.evaluate(() =>
    Boolean(document.querySelector('button[aria-label*="tema" i]'))
  );
  await shot(m, "mobile-hero-no-theme.png");
  await scrollTo(m, "lab");
  await m.waitForTimeout(400);
  report.checks.mobileLabCount = await m.evaluate(
    () =>
      [...document.querySelectorAll("#lab ul.divide-y li p.font-medium")].length
  );
  await shot(m, "mobile-lab-loaded.png");
  await mobile.close();

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
