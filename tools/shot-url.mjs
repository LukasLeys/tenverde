// Aufruf: node tools/shot-url.mjs <url> <ausgabe-präfix> [--wait ms] [--full]
import { chromium } from 'playwright-core';
const [url, prefix] = process.argv.slice(2);
const wi = process.argv.indexOf('--wait');
const wait = wi > 0 ? Number(process.argv[wi + 1]) : 2500;
const full = process.argv.includes('--full');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
  const res = await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${prefix}-${name}.png`, fullPage: full });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${name}: status ${res?.status()} overflow ${overflow}px height ${await page.evaluate(() => document.documentElement.scrollHeight)}`);
  if (errors.length) console.log('  ' + errors.slice(0, 8).join('\n  '));
  await ctx.close();
}
await browser.close();
