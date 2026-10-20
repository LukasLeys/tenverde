// Aufruf: node tools/shot.mjs <html-datei> <ausgabe-präfix> [--wait ms]
import { createRequire } from 'module';
const require = createRequire('/tmp/claude-0/-home-user/6a431244-3092-5137-8630-283f3d3b7377/scratchpad/fonts/');
const { chromium } = require('playwright-core');
const [file, prefix] = process.argv.slice(2);
const waitArg = process.argv.indexOf('--wait');
const wait = waitArg > 0 ? Number(process.argv[waitArg + 1]) : 2500;
const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', proxy });
const url = 'file://' + (file.startsWith('/') ? file : process.cwd() + '/' + file);
for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'networkidle' }).catch(e => errors.push('goto: ' + e.message));
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${prefix}-${name}-viewport.png` });
  await page.screenshot({ path: `${prefix}-${name}-full.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${name}: horizontal overflow ${overflow}px; height ${await page.evaluate(() => document.documentElement.scrollHeight)}px`);
  if (errors.length) console.log(`${name} errors:\n  ` + errors.join('\n  '));
  await ctx.close();
}
await browser.close();
