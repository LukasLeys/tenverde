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

// Open-Graph-Bild: echte Rosette der Startseite, ohne Text, dazu die Wortmarke
const p = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
await p.goto(basis + '/', { waitUntil: 'networkidle' });
await p.addStyleTag({ content: `
  .top, .hero__text, .page > *:not(main), main > *:not(.hero), nextjs-portal { display: none !important; }
  .hero { min-height: 630px !important; }
  #og-marke { position: fixed; left: 72px; bottom: 72px; z-index: 30; display: flex; align-items: center; gap: 22px; color: #f3fff7; font-family: var(--f-display); font-weight: 250; }
  #og-marke svg { width: 76px; height: 76px; fill: #f3fff7; filter: drop-shadow(0 0 14px rgba(134,232,223,.7)); }
  #og-marke b { font-weight: 300; font-size: 104px; letter-spacing: -0.01em; line-height: 1; text-shadow: 0 0 28px rgba(134,232,223,.45); }
  #og-marke span { display: block; font-family: var(--f-text); font-weight: 500; font-size: 26px; color: #a9bdb0; margin-top: 10px; letter-spacing: 0.02em; }
  .rosette-anchor { right: 2% !important; width: 560px !important; }
`});
await p.evaluate(() => {
  const d = document.createElement('div');
  d.id = 'og-marke';
  d.innerHTML = '<svg viewBox="0 0 64 64"><use href="#leaf-1"/></svg><div><b>tenverde</b><span>Innsbruck · Wien</span></div>';
  document.body.appendChild(d);
  window.dispatchEvent(new Event('resize'));
});
await p.waitForTimeout(4500);
await p.screenshot({ path: 'app/opengraph-image.png' });
await browser.close();
console.log('ok');
