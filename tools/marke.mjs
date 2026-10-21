// Erzeugt das Logo-Set (SVG und PNG), Profilbilder und Banner für X und LinkedIn in marke/.
// Die Wortmarke ist Geist 500 in Pfaden (marke/quelle/wortmarke.json, aus der Schriftdatei gezogen),
// die Proportionen entsprechen der Marke im Seitenkopf. Banner und Profilbilder nutzen die echte
// Szene der Startseite. Aufruf: node tools/marke.mjs [basis-url]
import { chromium } from 'playwright-core';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';

const basis = process.argv[2] || 'http://localhost:3200';
const WORT = JSON.parse(readFileSync('marke/quelle/wortmarke.json', 'utf8'))['500'];
const BLATT = 'M32 58C14 46 12 22 32 6C52 22 50 46 32 58ZM30.4 52L32 14L33.6 52Z';

// Farben: Leuchtwald der Website und das Waldgrün des ursprünglichen Logos
const FARBEN = {
  hell: { blatt: '#f3fff7', wort: '#f3fff7', name: 'Weißblüte für dunkle Flächen' },
  leuchtend: { blatt: '#86e8df', wort: '#f3fff7', name: 'Cyan und Weißblüte für dunkle Flächen' },
  gruen: { blatt: '#1e7a46', wort: '#10251a', name: 'Waldgrün und Tiefgrün für helle Flächen' },
  schwarz: { blatt: '#090f0b', wort: '#090f0b', name: 'Einfarbig dunkel' },
};

// Maße in Einheiten der Schriftgröße 100 (Seitenkopf: Blatt 30 px, Schrift 22,4 px).
// Sichtbarer Abstand von der Blattkante bis zum t: 0,34 em (Variante B, gewählt am 21.10.2026).
const FS = 100;
const BLATT_GROESSE = (30 / 22.4) * FS;
const s = FS / WORT.upm;
const BLATT_RECHTS = 48.71; // sichtbare rechte Kante des gedrehten Blatts im 64er-Feld
const ABSTAND = (BLATT_RECHTS / 64) * BLATT_GROESSE + 0.34 * FS - WORT.xmin * s - BLATT_GROESSE;

function blatt(farbe, x, y, groesse) {
  const k = groesse / 64;
  return `<g transform="translate(${x} ${y}) scale(${k}) rotate(35 32 32)"><path fill="${farbe}" fill-rule="evenodd" d="${BLATT}"/></g>`;
}
function wort(farbe, x, grundlinie) {
  return `<g transform="translate(${x} ${grundlinie}) scale(${s})"><path fill="${farbe}" d="${WORT.d}"/></g>`;
}

// Bausteine je Form, noch ohne viewBox (die wird im Browser eng um den Inhalt gemessen)
const FORMEN = {
  bildmarke: (f) => blatt(f.blatt, 0, 0, 64),
  wortmarke: (f) => wort(f.wort, 0, 0),
  horizontal: (f) => {
    // Grundlinie wie im Seitenkopf: Mitte des Blatts liegt 0,355 em über der Grundlinie
    const mitte = BLATT_GROESSE / 2;
    return blatt(f.blatt, 0, 0, BLATT_GROESSE) + wort(f.wort, BLATT_GROESSE + ABSTAND, mitte + 0.355 * FS);
  },
  gestapelt: (f) => {
    const breite = (WORT.xmax - WORT.xmin) * s;
    const g = BLATT_GROESSE * 1.5;
    return blatt(f.blatt, breite / 2 - g / 2 + WORT.xmin * s, 0, g) + wort(f.wort, 0, g + 0.92 * FS);
  },
};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PFAD || '/opt/pw-browsers/chromium' });
const seite = await browser.newPage();
for (const o of ['svg', 'png', 'profilbild', 'banner']) mkdirSync(`marke/${o}`, { recursive: true });

async function engesSvg(inhalt, rand) {
  await seite.setContent(`<svg xmlns="http://www.w3.org/2000/svg" id="m" width="4000" height="4000">${inhalt}</svg>`);
  // Sichtbare Kontur abtasten: getBBox zählt die Kontrollpunkte der Kurven mit und wäre zu weit
  const b = await seite.evaluate(() => {
    const svg = document.getElementById('m');
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const pfad of svg.querySelectorAll('path')) {
      const m = svg.getScreenCTM().inverse().multiply(pfad.getScreenCTM());
      const laenge = pfad.getTotalLength();
      const n = Math.max(400, Math.ceil(laenge / 2));
      for (let i = 0; i <= n; i++) {
        const q = pfad.getPointAtLength((laenge * i) / n).matrixTransform(m);
        x0 = Math.min(x0, q.x); y0 = Math.min(y0, q.y); x1 = Math.max(x1, q.x); y1 = Math.max(y1, q.y);
      }
    }
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  });
  const p = Math.max(b.w, b.h) * rand;
  const vb = [b.x - p, b.y - p, b.w + 2 * p, b.h + 2 * p].map((v) => Math.round(v * 100) / 100);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${vb[2]}" height="${vb[3]}">${inhalt}</svg>\n`;
}

async function png(svg, datei, breite, hintergrund) {
  const [, , w, h] = svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  const hoehe = Math.round((breite * h) / w);
  const p = await browser.newPage({ viewport: { width: breite, height: hoehe } });
  await p.setContent(`<html><body style="margin:0;background:${hintergrund || 'transparent'}">${svg.replace('<svg ', `<svg style="display:block;width:${breite}px;height:${hoehe}px" `)}</body></html>`);
  await p.screenshot({ path: datei, omitBackground: !hintergrund });
  await p.close();
}

// 1. Logos: vier Formen in vier Farben, als SVG und als PNG (transparent, 2.000 px breit)
const liste = [];
for (const [form, bau] of Object.entries(FORMEN)) {
  for (const [farbe, f] of Object.entries(FARBEN)) {
    const svg = await engesSvg(bau(f), form === 'bildmarke' ? 0.04 : 0.03);
    const name = `tenverde-${form}-${farbe}`;
    writeFileSync(`marke/svg/${name}.svg`, svg);
    await png(svg, `marke/png/${name}.png`, form === 'bildmarke' ? 1024 : 2000);
    liste.push({ form, farbe, name });
  }
}

// 2. Profilbilder und App-Icon: Blatt auf Fläche, kreisfest (Inhalt im inneren Kreis)
const icon = (hg, f, glow) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="l" cx="50%" cy="46%" r="60%"><stop offset="0" stop-color="${glow ? '#173a32' : hg}"/><stop offset="1" stop-color="${hg}"/></radialGradient>
    <filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="26"/></filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#l)"/>
  ${glow ? `<g filter="url(#g)" opacity="0.75">${blatt('#86e8df', 512 - 380, 512 - 380, 760)}</g>` : ''}
  ${blatt(f, 512 - 380, 512 - 380, 760)}
  ${glow ? `<g transform="translate(132 132) scale(${760 / 64}) rotate(35 32 32)"><path fill="${hg}" d="M30.4 52L32 14L33.6 52Z"/></g>` : ''}
</svg>\n`;
for (const [name, hg, f, glow] of [
  ['tenverde-profilbild-dunkel', '#090f0b', '#f3fff7', true],
  ['tenverde-profilbild-gruen', '#1e7a46', '#f3fff7', false],
  ['tenverde-profilbild-hell', '#edf0e8', '#1e7a46', false],
]) {
  const svg = icon(hg, f, glow);
  writeFileSync(`marke/profilbild/${name}.svg`, svg);
  await png(svg, `marke/profilbild/${name}.png`, 1024, hg);
  await png(svg, `marke/profilbild/${name}-400.png`, 400, hg);
}

// 3. Banner: echte Szene der Startseite, Rosette und Marke so gesetzt, dass das Profilbild nichts verdeckt
const lockup = await engesSvg(FORMEN.horizontal(FARBEN.hell), 0);
// Ohne Rand, für Banner und das Vorschaubild der Website (tools/erzeuge-bilder.mjs)
writeFileSync('marke/quelle/horizontal-hell-ohne-rand.svg', lockup);
const BANNER = [
  { name: 'tenverde-banner-x', w: 1500, h: 500, rosette: { x: 1165, y: 250, d: 560 }, marke: { x: 120, y: 120, h: 96 }, zeile: true },
  { name: 'tenverde-banner-linkedin-profil', w: 1584, h: 396, rosette: { x: 1320, y: 198, d: 430 }, marke: { x: 420, y: 128, h: 84 }, zeile: true },
  { name: 'tenverde-banner-linkedin-unternehmen', w: 1128, h: 191, rosette: { x: 930, y: 96, d: 250 }, marke: { x: 300, y: 52, h: 52 }, zeile: true, klein: true },
];
for (const b of BANNER) {
  const p = await browser.newPage({ viewport: { width: b.w, height: b.h }, reducedMotion: 'no-preference' });
  await p.goto(basis + '/', { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: `
    .top, .hero__text, .page > *:not(main), main > *:not(.hero), nextjs-portal { display: none !important; }
    html, body { overflow: hidden !important; }
    .hero { min-height: ${b.h}px !important; height: ${b.h}px !important; padding: 0 !important; }
    .hero > .rosette-anchor { position: fixed !important; left: ${b.rosette.x - b.rosette.d / 2}px !important; top: ${b.rosette.y - b.rosette.d / 2}px !important;
      width: ${b.rosette.d}px !important; max-width: none !important; margin: 0 !important; flex: none !important; transform: none !important; }
    #banner-marke { position: fixed; left: ${b.marke.x}px; top: ${b.marke.y}px; z-index: 30; color: #f3fff7; font-family: var(--f-text); }
    #banner-marke svg { display: block; height: ${b.marke.h}px; width: auto; filter: drop-shadow(0 0 ${b.klein ? 10 : 18}px rgba(134,232,223,.45)); }
    #banner-marke p { margin: ${b.klein ? 10 : 22}px 0 0; font-size: ${b.klein ? 15 : 26}px; font-weight: 400; color: #a9bdb0; letter-spacing: 0.005em; }
  `});
  await p.evaluate(({ svg, zeile }) => {
    const d = document.createElement('div');
    d.id = 'banner-marke';
    d.innerHTML = svg + (zeile ? '<p>Software und Beteiligungen · Innsbruck und Wien</p>' : '');
    document.body.appendChild(d);
    window.dispatchEvent(new Event('resize'));
  }, { svg: lockup, zeile: b.zeile });
  await p.waitForTimeout(5000);
  await p.screenshot({ path: `marke/banner/${b.name}.png` });
  await p.close();
}

writeFileSync('marke/quelle/liste.json', JSON.stringify(liste, null, 2) + '\n');
await browser.close();
console.log('ok');
