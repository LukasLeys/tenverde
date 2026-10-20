// Screenshots mitten aus der Seite, mit laufender Szene (für die Sichtprüfung des Unterholzes).
// Aufruf: node tools/scroll-shots.mjs <basis-url> <ordner>
import { chromium } from 'playwright-core';
const [basis, ordner] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PFAD || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [name, w, h] of [['1440', 1440, 900], ['390', 390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  for (const [seite, ziel] of [['/', '#projekte'], ['/', '#strategie'], ['/kontakt', 'main'], ['/strategie', 'main']]) {
    await p.goto(basis + seite, { waitUntil: 'networkidle' });
    await p.waitForTimeout(1200);
    if (ziel !== 'main') await p.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: 'start' }), ziel);
    if (w > 800) await p.mouse.move(w * 0.35, h * 0.45, { steps: 8 });
    await p.waitForTimeout(2600);
    await p.screenshot({ path: `${ordner}/scroll-${name}${seite.replace(/\//g, '_')}${ziel.replace('#', '_')}.png` });
  }
  await p.close();
}
await b.close();
