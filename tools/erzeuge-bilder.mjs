// Erzeugt apple-icon.png, favicon.ico-Vorlage und das Open-Graph-Bild aus der laufenden Seite.
// Aufruf: node tools/erzeuge-bilder.mjs [basis-url]
import { chromium } from 'playwright-core';
import { readFileSync } from 'fs';

const basis = process.argv[2] || 'http://localhost:3200';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PFAD || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

// Icons aus dem SVG
const svg = readFileSync('app/icon.svg', 'utf8');
for (const [datei, groesse] of [['app/apple-icon.png', 180], ['tools/favicon-48.png', 48]]) {
  const p = await browser.newPage({ viewport: { width: groesse, height: groesse } });
  await p.setContent(`<html><body style="margin:0;background:#090f0b">${svg.replace('<svg ', `<svg width="${groesse}" height="${groesse}" `)}</body></html>`);
  await p.screenshot({ path: datei, omitBackground: false });
  await p.close();
}

// Open-Graph-Bild: echte Rosette der Startseite, dazu das Logo aus marke/ (vorher node tools/marke.mjs)
const p = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
await p.goto(basis + '/', { waitUntil: 'networkidle' });
await p.addStyleTag({ content: `
  .top, .hero__text, .page > *:not(main), main > *:not(.hero), nextjs-portal { display: none !important; }
  .hero { min-height: 630px !important; }
  #og-marke { position: fixed; left: 72px; bottom: 72px; z-index: 30; color: #f3fff7; }
  #og-marke svg { display: block; height: 80px; width: auto; filter: drop-shadow(0 0 18px rgba(134,232,223,.5)); }
  #og-marke span { display: block; font-family: var(--f-text); font-weight: 400; font-size: 28px; color: #a9bdb0; margin-top: 22px; letter-spacing: 0.005em; }
  .hero > .rosette-anchor { position: fixed !important; left: 640px !important; top: 35px !important; width: 560px !important; max-width: none !important; margin: 0 !important; flex: none !important; }
`});
await p.evaluate((marke) => {
  const d = document.createElement('div');
  d.id = 'og-marke';
  d.innerHTML = marke + '<span>Innsbruck · Wien</span>';
  document.body.appendChild(d);
  window.dispatchEvent(new Event('resize'));
}, readFileSync('marke/quelle/horizontal-hell-ohne-rand.svg', 'utf8'));
await p.waitForTimeout(4500);
await p.screenshot({ path: 'app/opengraph-image.png' });
await browser.close();
console.log('ok');
