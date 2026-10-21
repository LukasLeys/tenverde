// Nimmt die Website mit verschiedenen Schriftpaaren auf. Die Schriften werden nur für die Aufnahme
// eingeblendet (CSP umgangen), die Website selbst bleibt unverändert.
// Aufruf: node tools/schriftvergleich.mjs <basis-url> <ordner>
import { chromium } from 'playwright-core';
const [basis, ordner] = process.argv.slice(2);

const PAARE = {
  jost: { css: null, display: null, text: null, w: {} },
  geist: {
    css: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap',
    display: "'Geist'", text: "'Geist'", w: { h1: 300, h2: 300, h3: 400 }, ls: { h1: '-0.045em', h2: '-0.035em' },
  },
  satoshi: {
    css: 'https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap',
    display: "'Satoshi'", text: "'Satoshi'", w: { h1: 300, h2: 400, h3: 500 }, ls: { h1: '-0.04em', h2: '-0.03em' },
  },
  inter: {
    css: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&family=Inter:wght@400;500;600&display=swap',
    display: "'Inter Tight'", text: "'Inter'", w: { h1: 300, h2: 300, h3: 400 }, ls: { h1: '-0.045em', h2: '-0.035em' },
  },
  mona: {
    css: 'https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,300..600&display=swap',
    display: "'Mona Sans'", text: "'Mona Sans'", w: { h1: 300, h2: 300, h3: 400 }, ls: { h1: '-0.035em', h2: '-0.025em' }, stretch: '112%',
  },
  instrument: {
    css: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&display=swap',
    display: "'Instrument Serif'", text: "'Instrument Sans'", w: { h1: 400, h2: 400, h3: 400 }, ls: { h1: '-0.02em', h2: '-0.015em' },
  },
  funnel: {
    css: 'https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500&family=Funnel+Sans:wght@400;500;600&display=swap',
    display: "'Funnel Display'", text: "'Funnel Sans'", w: { h1: 300, h2: 300, h3: 400 }, ls: { h1: '-0.04em', h2: '-0.03em' },
  },
};

function stil(p) {
  if (!p.css) return '';
  return `
    html:root { --f-display: ${p.display}, sans-serif !important; --f-text: ${p.text}, sans-serif !important; }
    body { font-family: ${p.text}, sans-serif !important; }
    h1, .subhero h1 { font-weight: ${p.w.h1} !important; letter-spacing: ${p.ls.h1} !important; ${p.stretch ? `font-stretch: ${p.stretch};` : ''} }
    h2 { font-weight: ${p.w.h2} !important; letter-spacing: ${p.ls.h2} !important; ${p.stretch ? `font-stretch: ${p.stretch};` : ''} }
    h3 { font-weight: ${p.w.h3} !important; }
    .mail { font-weight: ${p.w.h1} !important; letter-spacing: ${p.ls.h1} !important; }
    .brand span { font-weight: 500 !important; letter-spacing: -0.02em !important; }`;
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PFAD || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [name, p] of Object.entries(PAARE)) {
  for (const [geraet, w, h] of [['desktop', 1440, 900], ['mobil', 390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, bypassCSP: true });
    await ctx.addInitScript(({ css, regeln }) => {
      if (!css) return;
      document.addEventListener('DOMContentLoaded', () => {
        const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = css; document.head.appendChild(l);
        const s = document.createElement('style'); s.textContent = regeln; document.head.appendChild(s);
      });
    }, { css: p.css, regeln: stil(p) });
    const page = await ctx.newPage();
    const ansichten = geraet === 'desktop'
      ? [['start', '/', null], ['projekte', '/', '#projekte'], ['strategie', '/strategie', null], ['kontakt', '/kontakt', null]]
      : [['start', '/', null], ['strategie', '/strategie', null]];
    for (const [ansicht, pfad, anker] of ansichten) {
      await page.goto(basis + pfad, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(600);
      await page.evaluate(() => window.dispatchEvent(new Event('resize')));
      if (anker) await page.evaluate((a) => document.querySelector(a).scrollIntoView({ block: 'start' }), anker);
      await page.waitForTimeout(3200);
      await page.screenshot({ path: `${ordner}/${name}-${geraet}-${ansicht}.png` });
    }
    await ctx.close();
  }
}
await browser.close();
console.log('ok');
