/**
 * Final portfolio audit — multi-viewport captures + behavioral checks.
 * Usage: node scripts/final-audit-capture.mjs [baseUrl]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "art", "audit", "final");
const base = process.argv[2] || "http://127.0.0.1:8765";
fs.mkdirSync(outDir, { recursive: true });

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844, isMobile: true },
  { name: "360x800", width: 360, height: 800, isMobile: true },
];

const SECTIONS = ["home", "work", "lab", "engineering", "contact"];

async function shot(page, name, { fullPage = false } = {}) {
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(outDir, name), fullPage });
}

async function saveCanvas(page, name) {
  const dataUrl = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    return c ? c.toDataURL("image/png") : null;
  });
  if (!dataUrl) return false;
  fs.writeFileSync(
    path.join(outDir, name),
    Buffer.from(dataUrl.split("base64,").pop(), "base64")
  );
  return true;
}

async function scrollToId(page, id) {
  await page.evaluate((t) => {
    document.getElementById(t)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, id);
  await page.waitForTimeout(550);
}

async function auditPage(page, report, tag) {
  const checks = {};

  checks.overflowX = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflow: doc.scrollWidth > doc.clientWidth + 2,
    };
  });

  checks.headings = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3")].map((el) => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 80),
    }))
  );

  checks.nav = await page.evaluate(() =>
    [...document.querySelectorAll("nav a, header a[href^='#']")].map((a) => ({
      text: a.textContent?.trim(),
      href: a.getAttribute("href"),
    }))
  );

  checks.links = await page.evaluate(async () => {
    const candidates = [
      ...document.querySelectorAll(
        'a[href^="http"], a[href^="mailto:"], a[download], a[href$=".pdf"]'
      ),
    ];
    const seen = new Set();
    const out = [];
    for (const a of candidates) {
      const href = a.href || a.getAttribute("href");
      if (!href || seen.has(href)) continue;
      seen.add(href);
      if (href.startsWith("mailto:")) {
        out.push({ href, ok: href.includes("@"), kind: "mailto" });
        continue;
      }
      try {
        const res = await fetch(href, { method: "HEAD", mode: "no-cors" }).catch(() => null);
        // no-cors opaque — for same-origin use cors
        const same = href.startsWith(location.origin);
        if (same) {
          const r = await fetch(href, { method: "HEAD" });
          out.push({ href, ok: r.ok, status: r.status, kind: "same" });
        } else {
          out.push({ href, ok: null, kind: "external", note: "not probed (CORS)" });
        }
      } catch (e) {
        out.push({ href, ok: false, error: String(e) });
      }
    }
    return out;
  });

  checks.console = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") checks.console.push(msg.text());
  });
  page.on("pageerror", (err) => checks.console.push(String(err)));

  const progressBySection = {};
  for (const id of SECTIONS) {
    await scrollToId(page, id);
    progressBySection[id] = await page.evaluate(() => window.__sculptureProgress ?? null);
    await shot(page, `${tag}-${id}.png`);
    if (id === "home" || id === "engineering" || id === "contact") {
      await saveCanvas(page, `${tag}-canvas-${id}.png`);
    }
  }

  // reverse
  const reverse = [];
  for (const id of ["contact", "engineering", "lab", "work", "home"]) {
    await scrollToId(page, id);
    reverse.push({
      id,
      t: await page.evaluate(() => window.__sculptureProgress ?? null),
    });
  }
  checks.reverse = reverse;
  checks.progressBySection = progressBySection;

  // demand-mode
  await scrollToId(page, "contact");
  checks.demand = await page.evaluate(async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return { ok: false, reason: "no-canvas" };
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return { ok: false, reason: "no-gl" };
    let draws = 0;
    for (const name of ["drawArrays", "drawElements"]) {
      const orig = gl[name].bind(gl);
      gl[name] = (...args) => {
        draws++;
        return orig(...args);
      };
    }
    draws = 0;
    await new Promise((r) => setTimeout(r, 800));
    return { staticDraws: draws, demandLikely: draws === 0 };
  });

  // lab filter
  await scrollToId(page, "lab");
  checks.lab = await page.evaluate(async () => {
    const input = document.querySelector('#lab input, #lab [type="search"], #lab input[type="text"]');
    const cardsBefore = document.querySelectorAll("#lab a, #lab li, #lab article").length;
    const filterBtn = [...document.querySelectorAll("#lab button")].map((b) =>
      b.textContent?.trim()
    );
    return {
      hasFilterControl: Boolean(input) || filterBtn.length > 0,
      filterButtons: filterBtn.slice(0, 12),
      cardsApprox: cardsBefore,
      archiveText: document.querySelector("#lab")?.innerText?.slice(0, 400) || "",
    };
  });

  // focusables / skip?
  checks.a11y = await page.evaluate(() => {
    const focusables = [
      ...document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ),
    ];
    const tiny = focusables
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          label: el.getAttribute("aria-label") || el.textContent?.trim().slice(0, 40),
          w: Math.round(r.width),
          h: Math.round(r.height),
        };
      })
      .filter((x) => x.w > 0 && x.h > 0 && (x.w < 24 || x.h < 24));
    return {
      focusableCount: focusables.length,
      tinyTargets: tiny.slice(0, 20),
      hasH1: Boolean(document.querySelector("h1")),
      landmarkMain: Boolean(document.querySelector("main")),
      landmarkNav: Boolean(document.querySelector("nav")),
    };
  });

  // SEO head
  checks.seo = await page.evaluate(() => {
    const meta = (name) =>
      document.querySelector(`meta[name="${name}"]`)?.content ||
      document.querySelector(`meta[property="${name}"]`)?.content ||
      null;
    return {
      title: document.title,
      description: meta("description"),
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      ogTitle: meta("og:title"),
      ogImage: meta("og:image"),
      ogUrl: meta("og:url"),
      twitterCard: meta("twitter:card"),
      themeColor: meta("theme-color"),
      lang: document.documentElement.lang,
    };
  });

  // full page home (desktop-ish tags only)
  if (!tag.includes("390") && !tag.includes("360") && !tag.includes("768")) {
    await scrollToId(page, "home");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await shot(page, `${tag}-home-full.png`, { fullPage: true });
  } else if (tag.includes("390")) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await shot(page, `${tag}-home-full.png`, { fullPage: true });
  }

  // #contact direct
  await page.goto(base + "/#contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  checks.anchorContact = await page.evaluate(() => window.__sculptureProgress ?? null);
  await shot(page, `${tag}-anchor-contact.png`);

  report.viewports[tag] = checks;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const report = { base, at: new Date().toISOString(), viewports: {}, reducedMotion: {} };

  // Primary desktop deep audit
  {
    const vp = VIEWPORTS.find((v) => v.name === "1440x900");
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    const pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(String(e)));
    page.on("console", (msg) => {
      if (msg.type() === "error") pageErrors.push(msg.text());
    });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    await auditPage(page, report, "1440x900");
    report.pageErrors = pageErrors;
    await ctx.close();
  }

  // Other viewports — hero + contact + overflow
  for (const vp of VIEWPORTS.filter((v) => v.name !== "1440x900")) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: Boolean(vp.isMobile),
    });
    const page = await ctx.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(700);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
    }));

    await shot(page, `${vp.name}-hero.png`);
    for (const id of ["work", "lab", "engineering", "contact"]) {
      await scrollToId(page, id);
      await shot(page, `${vp.name}-${id}.png`);
    }
    report.viewports[vp.name] = {
      overflow,
      progress: Object.fromEntries(
        await Promise.all(
          SECTIONS.map(async (id) => {
            await scrollToId(page, id);
            const t = await page.evaluate(() => window.__sculptureProgress ?? null);
            return [id, t];
          })
        )
      ),
    };
    await ctx.close();
  }

  // Reduced motion
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const hasCanvas = await page.evaluate(() => Boolean(document.querySelector("canvas")));
    const hasSvg = await page.evaluate(() => Boolean(document.querySelector("svg")));
    await shot(page, "reduced-motion-hero.png");
    await scrollToId(page, "contact");
    await shot(page, "reduced-motion-contact.png");
    report.reducedMotion = { hasCanvas, hasSvg };
    await ctx.close();
  }

  // Theme toggle light mode visual check
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const toggle = page.getByRole("button", { name: /tema/i });
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(500);
      await shot(page, "theme-light-hero.png");
      const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      report.themeLight = { background: bg };
    }
    await ctx.close();
  }

  fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
