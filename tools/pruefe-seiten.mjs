// Prüft alle Seiten in DE und EN: Status, horizontaler Überlauf, Konsolenfehler, Links ohne Ziel.
// Aufruf: node tools/pruefe-seiten.mjs [basis-url] [--shots <ordner>]
import { chromium } from 'playwright-core';

const basis = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:3200';
const si = process.argv.indexOf('--shots');
const shots = si > 0 ? process.argv[si + 1] : null;
const seiten = [
  '/', '/strategie', '/ankaufsprofil', '/projekte-bauen', '/ueber-mich', '/kontakt', '/impressum', '/datenschutz',
  '/en', '/en/strategy', '/en/acquisition-profile', '/en/build-with-me', '/en/about', '/en/contact', '/en/legal-notice', '/en/privacy',
  '/gibt-es-nicht', '/en/does-not-exist',
];
const executablePath = process.env.CHROMIUM_PFAD || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath });
let fehler = 0;
for (const [name, w, h] of [['desktop', 1440, 900], ['mobil', 360, 800]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  for (const s of seiten) {
    const page = await ctx.newPage();
    const probleme = [];
    page.on('pageerror', (e) => probleme.push('JS: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') probleme.push('Konsole: ' + m.text()); });
    const res = await page.goto(basis + s, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const status = res?.status();
    const erwartet = s.includes('gibt-es-nicht') || s.includes('does-not-exist') ? 404 : 200;
    if (status !== erwartet) probleme.push(`Status ${status}, erwartet ${erwartet}`);
    if (erwartet === 404) { const i = probleme.findIndex((p) => p.includes('status of 404')); if (i >= 0) probleme.splice(i, 1); }
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll('h1').length,
      lang: document.documentElement.lang,
      leereLinks: [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href')).length,
      bilderOhneAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
      title: document.title,
    }));
    if (info.overflow > 0) probleme.push(`Überlauf ${info.overflow}px`);
    if (info.h1 !== 1) probleme.push(`${info.h1} h1`);
    if (info.leereLinks) probleme.push(`${info.leereLinks} Links ohne href`);
    if (info.bilderOhneAlt) probleme.push(`${info.bilderOhneAlt} Bilder ohne alt`);
    const sollLang = s.startsWith('/en') ? 'en' : 'de';
    if (info.lang !== sollLang) probleme.push(`lang=${info.lang}`);
    if (shots) {
      const datei = `${shots}/${name}${s.replace(/\//g, '_') || '_start'}.png`;
      await page.screenshot({ path: datei });
    }
    console.log(`${probleme.length ? 'FEHLER' : 'ok    '} ${name} ${s}  [${info.title}]${probleme.length ? '\n         ' + probleme.join('\n         ') : ''}`);
    fehler += probleme.length;
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(fehler ? `\n${fehler} Problem(e)` : '\nAlle Seiten ok');
process.exit(fehler ? 1 : 0);
