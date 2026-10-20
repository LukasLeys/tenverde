/* tenverde Kartenblatt: Gelände, Weg, Lupe und Sprache. */
(() => {
  'use strict';
  const D = document, R = D.documentElement;
  const mqRuhe = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFein = matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------------- Sprache ---------------- */
  const EN = {
    'meta.title': 'tenverde GmbH · Innsbruck',
    'meta.desc': 'tenverde is the holding company of Lukas Leys, based in Innsbruck. Software companies, stakes in startups and real estate.',
    'skip': 'Skip to content',
    'karte.alt': 'Topographic map sheet, freely generated: contour lines, rock, forest, glacier and a red trail connecting the sections.',
    'marke.alt': 'tenverde, back to top',
    'nav.alt': 'Main navigation',
    'sprache.alt': 'Language',
    'nav.u': 'Companies', 'nav.g': 'Looking for', 'nav.m': 'About', 'nav.k': 'Contact',
    'hero.titel': 'We invest in things that grow.',
    'hero.lead': 'tenverde is my holding company, based in Innsbruck. It holds my software companies, my stakes in startups and my real estate.',
    'hero.blatt': 'Sheet Innsbruck',
    'hero.cta1': 'What I look for', 'hero.cta2': 'Get in touch',
    'leg.titel': 'Legend', 'leg.hoehe': 'Contour line', 'leg.fels': 'Rock', 'leg.wald': 'Forest', 'leg.eis': 'Glacier',
    'leg.wasser': 'Water', 'leg.weg': 'Trail', 'leg.huette': 'Hut', 'leg.punkt': 'Survey point', 'leg.ziel': 'Destination',
    'leg.massstab': 'Scale 1:25,000',
    'u.titel': 'Companies I am building',
    'neu': '(opens in a new tab)',
    'u.1': 'AI software for legal work. Research, drafting and document review for law firms and in-house teams.',
    'u.2': 'Software for real estate. Digital tools for owners, property managers and agents.',
    'u.3': 'AI applications for businesses. Automating workflows that still run by hand today.',
    'u.4': 'The crypto podcast from Vienna. Bitcoin, blockchain and the crypto economy explained clearly.',
    'g.titel': 'I am looking for startups and real estate.',
    'g.intro': 'tenverde invests its own capital and holds for the long term. I decide myself and quickly, with no fund and no committee.',
    'r1.titel': 'Startup investments',
    'r1.k1': 'Stage', 'r1.v1': 'Pre-Seed, Seed',
    'r1.k2': 'Sectors', 'r1.v2': 'Software, AI, LegalTech, PropTech',
    'r1.k3': 'Region', 'r1.v3': 'Austria, Germany, Switzerland',
    'r1.k4': 'Ticket', 'r1.v4': 'by arrangement',
    'r1.k5': 'Plus', 'r1.v5': 'Experience in founding, product and law. Contacts to law firms and the real estate industry.',
    'r1.cta': 'Send pitch deck',
    'r2.titel': 'Real estate',
    'r2.k1': 'Assets', 'r2.v1': 'Residential and multi-family buildings, zoned plots',
    'r2.k2': 'Region', 'r2.v2': 'Tyrol and western Austria',
    'r2.k3': 'Condition', 'r2.v3': 'Existing stock, ideally in need of renovation or development',
    'r2.k4': 'Deals', 'r2.v4': 'directly from owners or through agents, off-market welcome',
    'r2.cta': 'Send exposé',
    'm.portraet': 'Portrait of Lukas Leys to follow',
    'm.rolle': 'Founder and managing director of tenverde GmbH',
    'm.text': 'I found software companies and invest in young businesses and in real estate. tenverde brings all of it under one roof. What I build, I intend to hold for a long time and let grow at its own pace.',
    'm.link': 'Profile on LinkedIn',
    'k.titel': 'Write to me.',
    'k.land': 'Austria',
    'k.koord': '47.2692° N · 11.4041° E',
    'f.imp': 'Legal notice', 'f.ds': 'Privacy',
    'f.hinweis': 'Terrain freely generated. Not an official map.',
    'lupe.linie': 'Contour', 'lupe.o': 'E'
  };
  const DE = { 'lupe.linie': 'Höhenlinie', 'lupe.o': 'O' };
  const textEls = [...D.querySelectorAll('[data-i18n]')];
  const attrEls = [...D.querySelectorAll('[data-i18n-attr]')];
  textEls.forEach(el => { DE[el.dataset.i18n] = el.textContent; });
  attrEls.forEach(el => el.dataset.i18nAttr.split(';').forEach(p => {
    const [a, k] = p.split(':'); DE[k] = el.getAttribute(a);
  }));
  let sprache = 'de';
  const t = k => (sprache === 'en' ? EN : DE)[k];
  function setzeSprache(l, merken) {
    sprache = l === 'en' ? 'en' : 'de';
    const d = sprache === 'en' ? EN : DE;
    textEls.forEach(el => { const v = d[el.dataset.i18n]; if (v != null) el.textContent = v; });
    attrEls.forEach(el => el.dataset.i18nAttr.split(';').forEach(p => {
      const [a, k] = p.split(':'); if (d[k] != null) el.setAttribute(a, d[k]);
    }));
    R.lang = sprache;
    D.querySelectorAll('.sprache button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === sprache)));
    if (merken) { try { localStorage.setItem('tenverde-lang', sprache); } catch (e) { /* ohne Speicher */ } }
    lupeText();
  }
  let start = 'de';
  try { const s = localStorage.getItem('tenverde-lang'); if (s === 'en' || s === 'de') start = s; } catch (e) { /* ohne Speicher */ }
  try { const q = new URLSearchParams(location.search).get('lang'); if (q === 'en' || q === 'de') start = q; } catch (e) { /* egal */ }
  D.querySelectorAll('.sprache button').forEach(b => b.addEventListener('click', () => {
    setzeSprache(b.dataset.lang, true);
    planeNeubau();
  }));

  /* ---------------- Rauschen ---------------- */
  const perm = new Uint8Array(512);
  (() => {
    const p = Array.from({ length: 256 }, (_, i) => i);
    let s = 20261020;
    const rnd = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
    for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const v = p[i]; p[i] = p[j]; p[j] = v; }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  })();
  const GX = [1, -1, 0, 0, .7071, -.7071, .7071, -.7071], GY = [0, 0, 1, -1, .7071, .7071, -.7071, -.7071];
  function rauschen(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, X = xi & 255, Y = yi & 255;
    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10), v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
    const aa = perm[perm[X] + Y] & 7, ab = perm[perm[X] + Y + 1] & 7, ba = perm[perm[X + 1] + Y] & 7, bb = perm[perm[X + 1] + Y + 1] & 7;
    const n00 = GX[aa] * xf + GY[aa] * yf, n10 = GX[ba] * (xf - 1) + GY[ba] * yf;
    const n01 = GX[ab] * xf + GY[ab] * (yf - 1), n11 = GX[bb] * (xf - 1) + GY[bb] * (yf - 1);
    const a = n00 + u * (n10 - n00), b = n01 + u * (n11 - n01);
    return a + v * (b - a);
  }
  function zufall(i, j) {
    let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  const glatt = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };

  /* ---------------- Blattrahmen und Gelände ---------------- */
  const M_PRO_PX = 6.615;          // 1:25.000 bei 96 dpi
  const INTERVALL = 40, ZAEHL = 200;
  const L = { w: 1440, h: 6000, cx: 720, fluss: 5000, ax: 720, ay: 5200, E0: 0, N0: 0, schmal: false };

  function hoehe(x, y) {
    const X = (x - L.cx) / 430, Y = y / 430;
    const wx = rauschen(X * .55 + 11.3, Y * .55 + 3.7) * .9;
    const wy = rauschen(X * .55 - 7.1, Y * .55 + 19.2) * .9;
    const xx = X + wx, yy = Y + wy;
    let r = 0, amp = .5, fr = 1, sum = 0;
    for (let i = 0; i < 4; i++) {
      let n = 1 - Math.abs(rauschen(xx * fr + i * 17.1, yy * fr - i * 9.3));
      n *= n; r += n * amp; sum += amp; amp *= .5; fr *= 2.03;
    }
    r /= sum;
    const f = rauschen(xx * 1.7 + 40.2, yy * 1.7 - 20.6) * .6 + rauschen(xx * 3.6 - 8.4, yy * 3.6 + 5.1) * .25;
    const c = (r - .66) * 1.7 + f * .7;
    let B, A;
    if (y <= L.fluss) {
      const tt = y / L.fluss, e = tt * tt * (3 - 2 * tt);
      B = 590 + 2050 * (1 - e);
      A = 30 + 860 * Math.pow(1 - tt, 1.25);
    } else {
      const s = Math.min(1, (y - L.fluss) / 1100);
      B = 590 + 300 * s * s; A = 30 + 220 * s;
    }
    return Math.max(578 + 6 * rauschen(x / 60, y / 60), B + A * c);
  }
  const waldMaske = (x, y) => rauschen(x / 260 + 50.5, y / 260 - 30.2) + .5 * rauschen(x / 90 + 3.3, y / 90 + 7.7);
  function flussY(x) {
    return L.fluss + 24 * Math.sin(x / 210 + .6) + 12 * Math.sin(x / 83 + 2.1) + 34 * rauschen(x / 320, 5.5);
  }

  /* UTM Zone 32, WGS84 */
  const UA = 6378137, UF = 1 / 298.257223563, K0 = .9996, E2 = UF * (2 - UF), EP2 = E2 / (1 - E2), L0 = 9 * Math.PI / 180;
  function nachUtm(latG, lonG) {
    const p = latG * Math.PI / 180, l = lonG * Math.PI / 180;
    const sp = Math.sin(p), cp = Math.cos(p), tp = Math.tan(p);
    const N = UA / Math.sqrt(1 - E2 * sp * sp), T = tp * tp, C = EP2 * cp * cp, A = cp * (l - L0);
    const e4 = E2 * E2, e6 = e4 * E2;
    const M = UA * ((1 - E2 / 4 - 3 * e4 / 64 - 5 * e6 / 256) * p - (3 * E2 / 8 + 3 * e4 / 32 + 45 * e6 / 1024) * Math.sin(2 * p)
      + (15 * e4 / 256 + 45 * e6 / 1024) * Math.sin(4 * p) - (35 * e6 / 3072) * Math.sin(6 * p));
    const E = 500000 + K0 * N * (A + (1 - T + C) * A ** 3 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * EP2) * A ** 5 / 120);
    const No = K0 * (M + N * tp * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A ** 4 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * EP2) * A ** 6 / 720));
    return [E, No];
  }
  function ausUtm(E, No) {
    const e4 = E2 * E2, e6 = e4 * E2;
    const mu = (No / K0) / (UA * (1 - E2 / 4 - 3 * e4 / 64 - 5 * e6 / 256));
    const e1 = (1 - Math.sqrt(1 - E2)) / (1 + Math.sqrt(1 - E2));
    const p1 = mu + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 ** 4 / 32) * Math.sin(4 * mu)
      + (151 * e1 ** 3 / 96) * Math.sin(6 * mu) + (1097 * e1 ** 4 / 512) * Math.sin(8 * mu);
    const s1 = Math.sin(p1), c1 = Math.cos(p1), t1 = Math.tan(p1);
    const N1 = UA / Math.sqrt(1 - E2 * s1 * s1), T1 = t1 * t1, C1 = EP2 * c1 * c1;
    const R1 = UA * (1 - E2) / Math.pow(1 - E2 * s1 * s1, 1.5), Dd = (E - 500000) / (N1 * K0);
    const lat = p1 - (N1 * t1 / R1) * (Dd * Dd / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * EP2) * Dd ** 4 / 24
      + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * EP2 - 3 * C1 * C1) * Dd ** 6 / 720);
    const lon = L0 + (Dd - (1 + 2 * T1 + C1) * Dd ** 3 / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * EP2 + 24 * T1 * T1) * Dd ** 5 / 120) / c1;
    return [lat * 180 / Math.PI, lon * 180 / Math.PI];
  }
  const [IBK_E, IBK_N] = nachUtm(47.2692, 11.4041);
  const pxNachUtm = (x, y) => [L.E0 + (x - L.ax) * M_PRO_PX, L.N0 - (y - L.ay) * M_PRO_PX];

  /* ---------------- Kacheln ---------------- */
  const karte = D.getElementById('karte');
  const KACHEL = 1020, RAST = 4;
  let kacheln = [], generation = 0;
  const dpr = () => Math.min(1.5, window.devicePixelRatio || 1);

  function feld(y0, w, h) {
    const nx = Math.ceil(w / RAST) + 2, ny = Math.ceil(h / RAST) + 2;
    const g = new Float32Array(nx * ny);
    for (let j = 0; j < ny; j++) {
      const y = y0 + j * RAST;
      for (let i = 0; i < nx; i++) g[j * nx + i] = hoehe(i * RAST, y);
    }
    return { g, nx, ny };
  }

  function marschieren(F, ox, oy, schritt, levelFn, nimm) {
    const { g, nx, ny } = F;
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = g[j * nx + i], b = g[j * nx + i + 1], c = g[(j + 1) * nx + i + 1], d = g[(j + 1) * nx + i];
        const mn = Math.min(a, b, c, d), mx = Math.max(a, b, c, d);
        const l0 = Math.ceil(mn / INTERVALL) * INTERVALL;
        for (let lv = l0; lv <= mx; lv += INTERVALL) {
          if (levelFn && !levelFn(lv)) continue;
          const x = ox + i * schritt, y = oy + j * schritt;
          const fall = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
          if (fall === 0 || fall === 15) continue;
          const oben = [x + schritt * (lv - a) / (b - a), y];
          const rechts = [x + schritt, y + schritt * (lv - b) / (c - b)];
          const unten = [x + schritt * (lv - d) / (c - d), y + schritt];
          const links = [x, y + schritt * (lv - a) / (d - a)];
          let s;
          switch (fall) {
            case 1: case 14: s = [links, unten]; break;
            case 2: case 13: s = [unten, rechts]; break;
            case 3: case 12: s = [links, rechts]; break;
            case 4: case 11: s = [oben, rechts]; break;
            case 5: nimm(lv, links, oben, i, j); s = [unten, rechts]; break;
            case 6: case 9: s = [oben, unten]; break;
            case 7: case 8: s = [links, oben]; break;
            case 10: nimm(lv, links, unten, i, j); s = [oben, rechts]; break;
          }
          nimm(lv, s[0], s[1], i, j);
        }
      }
    }
  }

  function zeichneKachel(k, animieren) {
    const meine = generation;
    const { y0, h } = k, w = L.w, r = dpr();
    const cv = D.createElement('canvas');
    cv.width = Math.round(w * r); cv.height = Math.round(h * r);
    cv.style.cssText = `top:${y0}px;width:${w}px;height:${h}px`;
    const ctx = cv.getContext('2d');
    ctx.scale(r, r);
    const F = feld(y0, w, h);
    const { g, nx, ny } = F;
    const steil = new Float32Array(nx * ny);

    /* Flächen: Wald, Gletscher, Fels, Schummerung */
    const bild = new ImageData(nx, ny);
    const px = bild.data;
    const lx = -.55, ly = -.62, lz = .56;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const id = j * nx + i, hv = g[id];
        const gx = (g[j * nx + Math.min(nx - 1, i + 1)] - g[j * nx + Math.max(0, i - 1)]) / (2 * RAST);
        const gy = (g[Math.min(ny - 1, j + 1) * nx + i] - g[Math.max(0, j - 1) * nx + i]) / (2 * RAST);
        const st = Math.hypot(gx, gy); steil[id] = st;
        let rr = 0, gg = 0, bb = 0, aa = 0;
        const mische = (cr, cg, cb, ca) => {
          if (ca <= 0) return;
          const na = ca + aa * (1 - ca);
          rr = (cr * ca + rr * aa * (1 - ca)) / na; gg = (cg * ca + gg * aa * (1 - ca)) / na; bb = (cb * ca + bb * aa * (1 - ca)) / na; aa = na;
        };
        const X = i * RAST, Y = y0 + j * RAST;
        const wm = waldMaske(X, Y);
        const wald = glatt(680, 760, hv) * (1 - glatt(1700, 1860, hv)) * glatt(-.22, -.05, wm) * (1 - glatt(4.5, 6.5, st));
        mische(196, 222, 176, wald * .78);
        const eis = glatt(2800, 2870, hv) * (1 - glatt(6, 9, st));
        mische(218, 234, 246, eis * .96);
        const fels = glatt(2050, 2250, hv) * glatt(3.2, 5.5, st) * (1 - eis);
        mische(150, 143, 134, fels * .16);
        const nxv = -gx / M_PRO_PX * 2.2, nyv = -gy / M_PRO_PX * 2.2, nl = Math.hypot(nxv, nyv, 1);
        const lam = (nxv * lx + nyv * ly + lz) / nl;
        const schatten = Math.max(0, Math.min(.17, (lz - lam) * .45));
        mische(78, 66, 56, schatten);
        const o = id * 4;
        px[o] = rr; px[o + 1] = gg; px[o + 2] = bb; px[o + 3] = aa * 255;
      }
    }
    const klein = D.createElement('canvas');
    klein.width = nx; klein.height = ny;
    klein.getContext('2d').putImageData(bild, 0, 0);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(klein, 0, 0, nx * RAST, ny * RAST);

    /* Waldzeichen */
    ctx.strokeStyle = 'rgba(62,107,58,.5)'; ctx.lineWidth = .8;
    ctx.beginPath();
    const WS = 12;
    for (let gy0 = Math.floor(y0 / WS); gy0 * WS < y0 + h; gy0++) {
      for (let gx0 = 0; gx0 * WS < w; gx0++) {
        const zx = gx0 * WS + (zufall(gx0, gy0) - .5) * 9, zy = gy0 * WS + (zufall(gy0 + 99, gx0) - .5) * 9;
        const i = Math.round(zx / RAST), j = Math.round((zy - y0) / RAST);
        if (i < 0 || j < 0 || i >= nx || j >= ny) continue;
        const hv = g[j * nx + i];
        const wald = glatt(680, 760, hv) * (1 - glatt(1700, 1860, hv)) * glatt(-.22, -.05, waldMaske(zx, zy)) * (1 - glatt(4.5, 6.5, steil[j * nx + i]));
        if (wald > .6 && zufall(gx0 + 7, gy0 - 3) < .55) { ctx.moveTo(zx + 1.5, zy - y0); ctx.arc(zx, zy - y0, 1.5, 0, Math.PI * 2); }
      }
    }
    ctx.stroke();

    /* Fluss */
    const fy = L.fluss;
    if (fy + 120 > y0 && fy - 120 < y0 + h) {
      ctx.beginPath();
      for (let x = -10; x <= w + 10; x += 6) { const yy = flussY(x) - 7 - y0; x < 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
      for (let x = w + 10; x >= -10; x -= 6) ctx.lineTo(x, flussY(x) + 7 - y0);
      ctx.closePath();
      ctx.fillStyle = '#DCEAF5'; ctx.fill();
      ctx.strokeStyle = '#2B679C'; ctx.lineWidth = 1.3; ctx.stroke();
    }

    /* Siedlung um das Ziel */
    const sr = L.schmal ? 120 : 280;
    if (L.ay + sr > y0 && L.ay - sr < y0 + h) {
      ctx.fillStyle = 'rgba(70,64,58,.55)';
      const BS = 11;
      for (let by = Math.floor((L.ay - sr) / BS); by * BS < L.ay + sr; by++) {
        for (let bx = Math.floor((L.ax - sr) / BS); bx * BS < L.ax + sr; bx++) {
          const cx = bx * BS, cy = by * BS;
          if (cy < y0 - 8 || cy > y0 + h + 8) continue;
          const d = Math.hypot(cx - L.ax, cy - L.ay);
          if (d < 34 || d > sr) continue;
          const dx = cx - L.ax, dy = cy - L.ay;
          if (L.schmal ? (dx > 18 && dx < 300 && Math.abs(dy) < 44) : (Math.abs(dx) < 205 && dy > 24 && dy < 150)) continue;
          if (Math.abs(cy - flussY(cx)) < 18) continue;
          const p = Math.pow(1 - d / sr, 1.4) * .9;
          if (zufall(bx + 311, by - 77) > p) continue;
          const ang = rauschen(cx / 200, cy / 200) > 0 ? .35 : -.2;
          const bw = 3 + zufall(bx, by + 5) * 5, bh = 3 + zufall(bx - 9, by) * 4;
          ctx.save(); ctx.translate(cx, cy - y0); ctx.rotate(ang); ctx.fillRect(-bw / 2, -bh / 2, bw, bh); ctx.restore();
        }
      }
    }

    /* Höhenlinien sammeln */
    const proLevel = new Map(), marken = [];
    marschieren(F, 0, y0, RAST, null, (lv, p, q, i, j) => {
      const st = steil[j * nx + i];
      if (st > 9.5) return;
      if (lv < 600) return;
      let arr = proLevel.get(lv); if (!arr) { arr = []; proLevel.set(lv, arr); }
      arr.push(p[0], p[1] - y0, q[0], q[1] - y0);
      if (lv % ZAEHL === 0 && st > 1.1 && st < 5 && p[0] > 60 && p[0] < w - 60 && zufall(i * 3 + lv, j + 17) < .02) {
        const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2 - y0;
        if (my > 14 && my < h - 14 && marken.every(m => Math.hypot(m.x - mx, m.y - my) > 300)) {
          let a = Math.atan2(q[1] - p[1], q[0] - p[0]);
          if (a > Math.PI / 2) a -= Math.PI; if (a < -Math.PI / 2) a += Math.PI;
          marken.push({ x: mx, y: my, a, lv });
        }
      }
    });
    const levels = [...proLevel.keys()].sort((a, b) => a - b);

    /* Fels: Schraffen hangabwärts */
    function felsZeichnen() {
      ctx.strokeStyle = 'rgba(88,84,80,.62)'; ctx.lineWidth = .8; ctx.lineCap = 'round';
      ctx.beginPath();
      const S = 6;
      for (let gy0 = Math.floor(y0 / S); gy0 * S < y0 + h; gy0++) {
        for (let gx0 = 0; gx0 * S < w; gx0++) {
          const zx = gx0 * S + (zufall(gx0 - 5, gy0) - .5) * 4, zy = gy0 * S + (zufall(gy0, gx0 + 3) - .5) * 4;
          const i = Math.round(zx / RAST), j = Math.round((zy - y0) / RAST);
          if (i < 1 || j < 1 || i >= nx - 1 || j >= ny - 1) continue;
          const hv = g[j * nx + i], st = steil[j * nx + i];
          const fels = glatt(1980, 2150, hv) * glatt(4.2, 7, st) * (1 - glatt(2800, 2870, hv) * (1 - glatt(6, 9, st)));
          if (fels < .45 || zufall(gx0 + 1, gy0 + 1) > fels * .7) continue;
          const gx = g[j * nx + i + 1] - g[j * nx + i - 1], gy = g[(j + 1) * nx + i] - g[(j - 1) * nx + i];
          const n = Math.hypot(gx, gy) || 1, len = 2.5 + Math.min(5, st * .45);
          ctx.moveTo(zx, zy - y0); ctx.lineTo(zx - gx / n * len, zy - y0 - gy / n * len);
        }
      }
      ctx.stroke();
    }

    function clipMarken() {
      ctx.beginPath(); ctx.rect(-2, -2, w + 4, h + 4);
      ctx.font = '500 12px "Barlow Semi Condensed", sans-serif';
      for (const m of marken) {
        const tw = ctx.measureText(String(m.lv)).width + 8;
        const c = Math.cos(m.a), s = Math.sin(m.a), hw = tw / 2, hh = 7;
        const pts = [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]].map(([u, v]) => [m.x + u * c - v * s, m.y + u * s + v * c]);
        ctx.moveTo(pts[0][0], pts[0][1]); for (let q = 3; q >= 1; q--) ctx.lineTo(pts[q][0], pts[q][1]); ctx.closePath();
      }
      ctx.clip('evenodd');
    }
    function levelZeichnen(lv) {
      const arr = proLevel.get(lv); if (!arr) return;
      const zaehl = lv % ZAEHL === 0, eis = lv >= 2840;
      ctx.strokeStyle = eis ? 'rgba(74,135,188,.9)' : (zaehl ? 'rgba(128,80,36,.92)' : 'rgba(156,102,51,.78)');
      ctx.lineWidth = zaehl ? 1.4 : .75;
      ctx.beginPath();
      for (let q = 0; q < arr.length; q += 4) { ctx.moveTo(arr[q], arr[q + 1]); ctx.lineTo(arr[q + 2], arr[q + 3]); }
      ctx.stroke();
    }
    function abschluss() {
      felsZeichnen();
      ctx.save();
      ctx.font = '500 12px "Barlow Semi Condensed", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#7A4A1E';
      for (const m of marken) { ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.a); ctx.fillText(String(m.lv), 0, .5); ctx.restore(); }
      ctx.restore();
      rasterUndRahmen(ctx, y0, h, w);
      if (fy + 120 > y0 && fy - 120 < y0 + h) flussName(ctx, y0, w);
    }

    karte.appendChild(cv);
    k.cv = cv;
    if (!animieren) {
      ctx.save(); clipMarken(); ctx.lineCap = 'round'; levels.forEach(levelZeichnen); ctx.restore();
      abschluss();
      return;
    }
    /* Das Gelände wächst vom Tal nach oben */
    cv.style.opacity = '0';
    cv.style.transition = 'opacity .9s cubic-bezier(.16,1,.3,1)';
    requestAnimationFrame(() => { cv.style.opacity = '1'; });
    const dauer = 1700, t0 = performance.now();
    let gezeichnet = 0;
    (function schritt(jetzt) {
      if (meine !== generation) return;
      const p = Math.min(1, (jetzt - t0) / dauer), e = 1 - Math.pow(2, -10 * p);
      const ziel = p >= 1 ? levels.length : Math.floor(levels.length * e);
      if (ziel > gezeichnet) {
        ctx.save(); clipMarken(); ctx.lineCap = 'round';
        for (let q = gezeichnet; q < ziel; q++) levelZeichnen(levels[q]);
        ctx.restore(); gezeichnet = ziel;
      }
      if (p < 1) requestAnimationFrame(schritt); else abschluss();
    })(t0);
  }

  function flussName(ctx, y0, w) {
    ctx.save();
    ctx.font = 'italic 500 24px Spectral, Georgia, serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const orte = L.schmal ? [w * .72] : [w * .16, w * .86];
    for (const x of orte) {
      const y = flussY(x) - y0 - 22, a = Math.atan2(flussY(x + 20) - flussY(x - 20), 40);
      ctx.save(); ctx.translate(x, y); ctx.rotate(a);
      ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(251,249,243,.95)'; ctx.lineJoin = 'round';
      const txt = 'I n n';
      ctx.strokeText(txt, 0, 0); ctx.fillStyle = '#2B679C'; ctx.fillText(txt, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  function rasterUndRahmen(ctx, y0, h, w) {
    const [Ea] = pxNachUtm(0, 0), [Eb] = pxNachUtm(w, 0);
    const [, Na] = pxNachUtm(0, y0 + h), [, Nb] = pxNachUtm(0, y0);
    ctx.save();
    ctx.strokeStyle = 'rgba(70,104,140,.34)'; ctx.lineWidth = 1;
    ctx.beginPath();
    for (let E = Math.ceil(Ea / 1000) * 1000; E <= Eb; E += 1000) { const x = Math.round(L.ax + (E - L.E0) / M_PRO_PX) + .5; ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    const nLinien = [];
    for (let N = Math.ceil(Na / 1000) * 1000; N <= Nb; N += 1000) { const y = Math.round(L.ay - (N - L.N0) / M_PRO_PX - y0) + .5; ctx.moveTo(0, y); ctx.lineTo(w, y); nLinien.push([N, y]); }
    ctx.stroke();

    /* Rahmen mit Minutenteilung */
    const fr = L.schmal ? 6 : 14, br = L.schmal ? 4 : 6;
    for (const seite of [0, 1]) {
      const xIn = seite ? w - fr : fr, xOut = seite ? w - fr + br : fr - br;
      let letzte = null, ya = 0;
      for (let y = 0; y <= h; y += 2) {
        const [E, N] = pxNachUtm(xIn, y0 + y), [lat] = ausUtm(E, N);
        const min = Math.floor(lat * 60);
        if (letzte === null) { letzte = min; ya = y; continue; }
        if (min !== letzte || y >= h) {
          ctx.fillStyle = (letzte & 1) ? '#201C17' : '#FBF9F3';
          ctx.fillRect(Math.min(xIn, xOut), ya, br, y - ya);
          if (!L.schmal && seite === 1 && min !== letzte) {
            const d = Math.floor(min / 60), m = min - d * 60 + (min < letzte ? 1 : 0);
            ctx.font = '500 12px "Barlow Semi Condensed", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
            ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(251,249,243,.95)';
            const txt = `${d}°${String(m).padStart(2, '0')}′`;
            ctx.strokeText(txt, xIn - 6, y); ctx.fillStyle = '#201C17'; ctx.fillText(txt, xIn - 6, y);
          }
          letzte = min; ya = y;
        }
      }
      ctx.strokeStyle = '#201C17'; ctx.lineWidth = 1;
      ctx.beginPath();
      const a = Math.round(xIn) + .5, b = Math.round(xOut) + .5;
      ctx.moveTo(a, 0); ctx.lineTo(a, h); ctx.moveTo(b, 0); ctx.lineTo(b, h); ctx.stroke();
    }
    if (!L.schmal) {
      ctx.font = '500 12px "Barlow Semi Condensed", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      for (const [N, y] of nLinien) {
        const km = Math.round(N / 1000), txt = String(km);
        ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(251,249,243,.95)';
        ctx.strokeText(txt, fr + 6, y); ctx.fillStyle = '#3D5A7A'; ctx.fillText(txt, fr + 6, y);
      }
    }
    ctx.restore();
  }

  /* ---------------- Weg ---------------- */
  const svgNS = 'http://www.w3.org/2000/svg';
  const spur = D.getElementById('spur');
  let probe = [], spurBereit = false, introStart = 0, introVon = 0;

  function wp(id) {
    const el = D.querySelector(`[data-wp="${id}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return null;
    return { x: r.left + r.width / 2 + scrollX, y: r.top + r.height / 2 + scrollY };
  }
  function kehren(pkte) {
    const aus = [pkte[0]];
    const amp = L.schmal ? 10 : Math.min(120, L.w * .07);
    for (let q = 1; q < pkte.length; q++) {
      const a = pkte[q - 1], b = pkte[q], dy = b.y - a.y;
      if (dy > 200) {
        const n = Math.max(2, Math.round(dy / (L.schmal ? 150 : 210)));
        for (let k = 1; k < n; k++) {
          const f = k / n, seite = (k % 2 ? 1 : -1) * (zufall(q, k) * .5 + .6);
          let x = a.x + (b.x - a.x) * f + seite * amp;
          x = Math.max(L.schmal ? 14 : 40, Math.min(L.w - (L.schmal ? 14 : 40), x));
          aus.push({ x, y: a.y + dy * f + (zufall(k, q) - .5) * 20 });
        }
      }
      aus.push(b);
    }
    return aus;
  }
  function pfadD(p) {
    let d = `M${p[0].x.toFixed(1)},${p[0].y.toFixed(1)}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      d += `C${(p1.x + (p2.x - p0.x) / 6).toFixed(1)},${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ${(p2.x - (p3.x - p1.x) / 6).toFixed(1)},${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  }
  function baueSpur() {
    spur.setAttribute('width', L.w); spur.setAttribute('height', L.h);
    spur.setAttribute('viewBox', `0 0 ${L.w} ${L.h}`);
    spur.replaceChildren();
    const r1e = wp('r1e'), r2s = wp('r2s');
    const gestapelt = r1e && r2s && r2s.y > r1e.y;
    const wege = gestapelt
      ? [['start', 'hero', 'h1', 'h2', 'h3', 'h4', 'gabel', 'r1s', 'r1e', 'r2s', 'r2e', 'autor', 'ziel']]
      : [['start', 'hero', 'h1', 'h2', 'h3', 'h4', 'gabel', 'r1s', 'r1e', 'autor', 'ziel'], ['gabel', 'r2s', 'r2e', 'autor']];
    let haupt = null;
    wege.forEach((ids, n) => {
      const pk = ids.map(wp).filter(Boolean);
      if (pk.length < 2) return;
      const d = pfadD(kehren(pk));
      for (const cls of ['spur-halo', 'spur']) {
        const p = D.createElementNS(svgNS, 'path'); p.setAttribute('d', d); p.setAttribute('class', cls); spur.appendChild(p);
        if (n === 0 && cls === 'spur') haupt = p;
      }
    });
    const tip = D.createElementNS(svgNS, 'circle'); tip.setAttribute('r', '6'); tip.setAttribute('class', 'spitze'); spur.appendChild(tip);
    probe = [];
    if (haupt) {
      const len = haupt.getTotalLength();
      let maxY = -1e9;
      for (let s = 0; s <= len; s += 6) { const pt = haupt.getPointAtLength(s); maxY = Math.max(maxY, pt.y); probe.push({ x: pt.x, y: pt.y, m: maxY }); }
    }
    spurBereit = true;
    const st = wp('start');
    introVon = st ? st.y - 12 : 0;
    stelleSpur();
  }
  function stelleSpur() {
    if (!spurBereit) return;
    const tip = spur.querySelector('.spitze');
    if (mqRuhe.matches) { spur.style.clipPath = 'none'; if (tip) tip.style.display = 'none'; return; }
    const maxScroll = R.scrollHeight - innerHeight;
    let ziel = scrollY >= maxScroll - 4 ? L.h + 10 : scrollY + innerHeight * .74;
    if (introStart) {
      const p = Math.min(1, (performance.now() - introStart) / 1500);
      const e = 1 - Math.pow(2, -10 * p);
      ziel = introVon + (ziel - introVon) * e;
      if (p >= 1) introStart = 0; else requestAnimationFrame(stelleSpur);
    }
    spur.style.clipPath = `inset(0 0 ${Math.max(0, L.h - ziel).toFixed(1)}px 0)`;
    if (tip && probe.length) {
      let pt = probe[probe.length - 1];
      for (const q of probe) { if (q.m >= ziel) { pt = q; break; } }
      const fertig = pt === probe[probe.length - 1] && ziel >= pt.y;
      tip.style.display = fertig ? 'none' : '';
      tip.setAttribute('cx', pt.x.toFixed(1)); tip.setAttribute('cy', Math.min(pt.y, ziel).toFixed(1));
    }
  }

  /* ---------------- Porträtfläche ---------------- */
  function portraetLinien() {
    const svg = D.getElementById('portraet-linien');
    if (!svg) return;
    let html = '';
    for (let k = 1; k <= 13; k++) {
      let d = '';
      for (let s = 0; s <= 72; s++) {
        const th = s / 72 * Math.PI * 2, c = Math.cos(th), sn = Math.sin(th);
        const r = k * 13 * (1 + .2 * rauschen(c * 1.4 + k * .06 + 3, sn * 1.4 - k * .04));
        d += (s ? 'L' : 'M') + (120 + c * r * 1.05).toFixed(1) + ',' + (138 + sn * r * 1.2).toFixed(1);
      }
      html += `<path d="${d}Z" fill="none" stroke="${k % 5 === 0 ? '#80502A' : '#9C6633'}" stroke-width="${k % 5 === 0 ? 1.4 : .8}" opacity=".8"/>`;
    }
    svg.innerHTML = html;
  }

  /* ---------------- Lupe ---------------- */
  const lupe = D.getElementById('lupe');
  const LR = 130;
  const lcv = lupe.querySelector('canvas'), lctx = lcv.getContext('2d');
  const ring = lupe.querySelector('.ring'), ablesung = lupe.querySelector('.ablesung');
  let zeiger = null, lupeGeplant = false, letzteLv = null;
  (() => {
    const r = dpr(), s = LR * 2;
    lcv.width = s * r; lcv.height = s * r; lcv.style.width = lcv.style.height = s + 'px';
    lctx.scale(r, r);
    ring.setAttribute('width', s); ring.setAttribute('height', s); ring.setAttribute('viewBox', `0 0 ${s} ${s}`);
    let t = '';
    for (let a = 0; a < 360; a += 10) {
      const rad = (a - 90) * Math.PI / 180, lang = a % 90 === 0 ? 11 : (a % 30 === 0 ? 7 : 4);
      t += `<line x1="${LR + Math.cos(rad) * 70}" y1="${LR + Math.sin(rad) * 70}" x2="${LR + Math.cos(rad) * (70 - lang)}" y2="${LR + Math.sin(rad) * (70 - lang)}" stroke="#201C17" stroke-width="${a % 90 === 0 ? 1.6 : 1}"/>`;
    }
    ring.innerHTML = `<circle cx="${LR}" cy="${LR}" r="72" fill="none" stroke="#FBF9F3" stroke-width="5" opacity=".9"/>
      <circle cx="${LR}" cy="${LR}" r="70" fill="none" stroke="#201C17" stroke-width="1.4"/>${t}
      <path d="M${LR} ${LR - 76} l-6 -10 h12 z" fill="#C42A1F"/>
      <path d="M${LR - 16} ${LR}h10M${LR + 6} ${LR}h10M${LR} ${LR - 16}v10M${LR} ${LR + 6}v10" stroke="#201C17" stroke-width="1.4"/>
      <circle cx="${LR}" cy="${LR}" r="2" fill="#C42A1F"/>`;
  })();
  function dms(v) {
    let d = Math.floor(v), mf = (v - d) * 60, m = Math.floor(mf), s = Math.round((mf - m) * 60);
    if (s === 60) { s = 0; m++; } if (m === 60) { m = 0; d++; }
    return `${d}°${String(m).padStart(2, '0')}′${String(s).padStart(2, '0')}″`;
  }
  function lupeText() {
    if (!zeiger || !L.E0) return;
    const x = zeiger.x + scrollX, y = zeiger.y + scrollY;
    const [E, N] = pxNachUtm(x, y), [lat, lon] = ausUtm(E, N);
    ablesung.innerHTML = `${dms(lat)} N&ensp;${dms(lon)} ${t('lupe.o')}<br>${t('lupe.linie')} <b>${letzteLv ?? ''}</b>`;
  }
  function lupeZeichnen() {
    lupeGeplant = false;
    if (!zeiger || !L.E0) return;
    const x = zeiger.x + scrollX, y = zeiger.y + scrollY;
    const ueber = zeiger.ziel && zeiger.ziel.closest && zeiger.ziel.closest('.tafel, a, button, .kopf, .leiste, h1, h2');
    lupe.classList.toggle('an', !ueber && y < L.h);
    lupe.style.transform = `translate(${(zeiger.x - LR).toFixed(1)}px, ${(zeiger.y - LR).toFixed(1)}px)`;
    const hv = hoehe(x, y);
    const lv = Math.max(600, Math.round(hv / INTERVALL) * INTERVALL);
    letzteLv = lv;
    const S = 3, n = Math.ceil(LR * 2 / S) + 1;
    const g = new Float32Array(n * n), ox = x - LR, oy = y - LR;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) g[j * n + i] = hoehe(ox + i * S, oy + j * S);
    lctx.clearRect(0, 0, LR * 2, LR * 2);
    const segs = [];
    marschieren({ g, nx: n, ny: n }, 0, 0, S, l => l === lv, (l, p, q) => segs.push(p, q));
    lctx.lineCap = 'round';
    for (const [st, lw] of [['rgba(251,249,243,.95)', 6], ['#6E3F14', 2.6]]) {
      lctx.strokeStyle = st; lctx.lineWidth = lw; lctx.beginPath();
      for (let q = 0; q < segs.length; q += 2) { lctx.moveTo(segs[q][0], segs[q][1]); lctx.lineTo(segs[q + 1][0], segs[q + 1][1]); }
      lctx.stroke();
    }
    lctx.globalCompositeOperation = 'destination-in';
    const rg = lctx.createRadialGradient(LR, LR, 40, LR, LR, LR);
    rg.addColorStop(0, 'rgba(0,0,0,1)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
    lctx.fillStyle = rg; lctx.fillRect(0, 0, LR * 2, LR * 2);
    lctx.globalCompositeOperation = 'source-over';
    ablesung.style.transform = `translate(${LR + 62}px, ${LR + 52}px)`;
    if (zeiger.x + 260 > innerWidth) ablesung.style.transform = `translate(${LR - 62 - ablesung.offsetWidth}px, ${LR + 52}px)`;
    lupeText();
  }
  function planeLupe() { if (!lupeGeplant) { lupeGeplant = true; requestAnimationFrame(lupeZeichnen); } }
  if (mqFein.matches) {
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      zeiger = { x: e.clientX, y: e.clientY, ziel: e.target }; planeLupe();
    }, { passive: true });
    D.addEventListener('pointerleave', () => lupe.classList.remove('an'));
    R.addEventListener('mouseleave', () => lupe.classList.remove('an'));
  }

  /* ---------------- Aufbau ---------------- */
  let beobachter = null;
  function layoutMessen() {
    const fuss = D.querySelector('.leiste');
    L.w = R.clientWidth;
    L.h = Math.ceil(fuss.offsetTop + fuss.offsetHeight);
    L.cx = L.w / 2;
    L.schmal = L.w < 760;
    const z = wp('ziel');
    if (z) { L.ax = z.x; L.ay = z.y; }
    const k = D.getElementById('kontakt');
    L.fluss = k ? k.offsetTop + (L.schmal ? 70 : 112) : L.h - 600;
    L.E0 = IBK_E; L.N0 = IBK_N;
    karte.style.height = L.h + 'px';
  }
  function kachelnAufbauen(erstesMal) {
    generation++;
    if (beobachter) beobachter.disconnect();
    karte.replaceChildren();
    kacheln = [];
    for (let y0 = 0; y0 < L.h; y0 += KACHEL) kacheln.push({ y0, h: Math.min(KACHEL, L.h - y0), fertig: false });
    const animiert = erstesMal && !mqRuhe.matches;
    const sichtbar = kacheln.filter(k => k.y0 < scrollY + innerHeight && k.y0 + k.h > scrollY);
    sichtbar.forEach(k => { k.fertig = true; zeichneKachel(k, animiert); });
    const meine = generation;
    beobachter = new IntersectionObserver(eintraege => {
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        const k = kacheln[+e.target.dataset.k];
        if (k && !k.fertig && meine === generation) { k.fertig = true; zeichneKachel(k, false); }
        beobachter.unobserve(e.target);
      }
    }, { rootMargin: '900px 0px' });
    kacheln.forEach((k, i) => {
      if (k.fertig) return;
      const platz = D.createElement('div');
      platz.dataset.k = i;
      platz.style.cssText = `position:absolute;left:0;width:1px;top:${k.y0}px;height:${k.h}px`;
      karte.appendChild(platz); beobachter.observe(platz);
    });
    /* übrige Kacheln nacheinander im Leerlauf zeichnen */
    const leer = window.requestIdleCallback || (f => setTimeout(f, 60));
    const weiter = () => {
      if (meine !== generation) return;
      const k = kacheln.find(q => !q.fertig);
      if (!k) return;
      k.fertig = true; zeichneKachel(k, false);
      leer(weiter, { timeout: 400 });
    };
    setTimeout(() => leer(weiter, { timeout: 400 }), animiert ? 1900 : 50);
  }
  let alt = { w: 0, h: 0, fluss: 0, ax: 0, ay: 0 };
  function neubau(erstesMal) {
    layoutMessen();
    const geaendert = erstesMal || L.w !== alt.w || Math.abs(L.h - alt.h) > 40 || Math.abs(L.fluss - alt.fluss) > 30
      || Math.abs(L.ax - alt.ax) > 30 || Math.abs(L.ay - alt.ay) > 30;
    if (geaendert) kachelnAufbauen(erstesMal);
    alt = { w: L.w, h: L.h, fluss: L.fluss, ax: L.ax, ay: L.ay };
    baueSpur();
    if (erstesMal && !mqRuhe.matches) { introStart = performance.now(); requestAnimationFrame(stelleSpur); }
  }
  let neubauTimer = 0;
  function planeNeubau() { clearTimeout(neubauTimer); neubauTimer = setTimeout(() => neubau(false), 220); }

  setzeSprache(start, false);
  portraetLinien();
  const bereit = D.fonts && D.fonts.ready ? Promise.race([D.fonts.ready, new Promise(r => setTimeout(r, 2500))]) : Promise.resolve();
  bereit.then(() => {
    neubau(true);
    let rafS = false;
    addEventListener('scroll', () => {
      if (rafS) return; rafS = true;
      requestAnimationFrame(() => { rafS = false; stelleSpur(); if (zeiger) planeLupe(); });
    }, { passive: true });
    let breite = innerWidth;
    addEventListener('resize', () => { if (innerWidth !== breite) { breite = innerWidth; planeNeubau(); } });
    if ('ResizeObserver' in window) {
      let hAlt = D.body.offsetHeight;
      new ResizeObserver(() => { const h = D.body.offsetHeight; if (Math.abs(h - hAlt) > 20) { hAlt = h; planeNeubau(); } }).observe(D.body);
    }
    mqRuhe.addEventListener && mqRuhe.addEventListener('change', stelleSpur);
  });
})();
