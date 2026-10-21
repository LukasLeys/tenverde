// Ganze Seiten mit leuchtender Szene über die volle Länge: das Fenster wird so hoch wie die Seite,
// damit die feste Canvas-Fläche alles abdeckt. Aufruf: node tools/ganzseiten.mjs <basis-url> <ordner>
import { chromium } from 'playwright-core';
const [basis, ordner] = process.argv.slice(2);
const seiten = [
  ['start', '/'], ['strategie', '/strategie'], ['ankaufsprofil', '/ankaufsprofil'], ['projekte-bauen', '/projekte-bauen'],
  ['ueber-uns', '/ueber-uns'], ['kontakt', '/kontakt'], ['impressum', '/impressum'], ['datenschutz', '/datenschutz'],
  ['en-start', '/en'], ['en-strategy', '/en/strategy'], ['en-acquisition-profile', '/en/acquisition-profile'], ['en-build-with-us', '/en/build-with-us'],
  ['en-about', '/en/about'], ['en-contact', '/en/contact'], ['en-legal-notice', '/en/legal-notice'], ['en-privacy', '/en/privacy'],
  ['404', '/gibt-es-nicht'],
];
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PFAD || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [geraet, w, h] of [['desktop', 1440, 900], ['mobil', 390, 844]]) {
  for (const [name, pfad] of seiten) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    await p.goto(basis + pfad, { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    // Höhen, die am Fenster hängen (100svh, 44svh), auf das echte Bildschirmmaß einfrieren
    await p.addStyleTag({ content: `.hero { min-height: ${h}px !important; } @media (max-width: 860px) { .hero { padding-top: ${Math.round(h * 0.44)}px !important; } }` });
    await p.waitForTimeout(200);
    const hoehe = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.setViewportSize({ width: w, height: hoehe });
    await p.waitForTimeout(3200);
    await p.screenshot({ path: `${ordner}/${geraet}-${name}.png` });
    await ctx.close();
  }
}
await b.close();
console.log('ok');
