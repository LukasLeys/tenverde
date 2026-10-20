/* tenverde · Vorschlag 02 Wertpapier
   Live-Guilloche (Trochoiden), Seilband-Rahmen, Siegel, Sprachumschaltung. */
(function () {
  'use strict';

  var TAU = Math.PI * 2;
  var root = document.documentElement;
  var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function reduced() { return !!reduceMQ.matches; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function easeOutExpo(x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); }

  /* ------------------------------------------------------------------
     Sprache
     ------------------------------------------------------------------ */
  var T = {
    de: {
      docTitle: 'tenverde GmbH · Beteiligungsgesellschaft in Innsbruck',
      skip: 'Zum Inhalt springen',
      brandLabel: 'tenverde, zum Seitenanfang',
      navLabel: 'Hauptnavigation',
      navCompanies: 'Unternehmen', navLooking: 'Gesucht', navAbout: 'Über mich', navContact: 'Kontakt',
      langLabel: 'Sprache',
      heroTitle: 'Wir investieren in Dinge, die wachsen.',
      heroLead: 'tenverde ist meine Beteiligungsgesellschaft mit Sitz in Innsbruck. Hier liegen meine Softwareunternehmen, meine Beteiligungen an Startups und meine Immobilien.',
      ctaLooking: 'Was ich suche', ctaContact: 'Kontakt aufnehmen',
      rosetteLabel: 'Live gezeichnete Guilloche-Rosette mit dem tenverde-Blatt in der Mitte',
      companiesTitle: 'Unternehmen, die ich selbst aufbaue',
      coupon: 'Kupon',
      newTab: ' (öffnet in neuem Tab)',
      c1: 'KI-Software für juristische Arbeit. Recherche, Entwürfe und Prüfung von Dokumenten für Kanzleien und Rechtsabteilungen.',
      c2: 'Software für Immobilien. Digitale Werkzeuge für Eigentümer, Verwalter und Makler.',
      c3: 'KI-Anwendungen für Unternehmen. Automatisierung von Abläufen, die heute noch von Hand laufen.',
      c4: 'Der Krypto-Podcast aus Wien. Bitcoin, Blockchain und Kryptoökonomie verständlich eingeordnet.',
      lookingTitle: 'Ich suche Startups und Immobilien.',
      lookingLead: 'tenverde investiert eigenes Kapital und hält langfristig. Ich entscheide selbst und schnell, ohne Fonds und ohne Komitee.',
      startupsTitle: 'Startup-Beteiligungen',
      kStage: 'Phase', kSectors: 'Branchen', vSectors: 'Software, KI, LegalTech, PropTech',
      kRegion: 'Region', vRegionS: 'Österreich, Deutschland, Schweiz',
      kTicket: 'Ticket', vTicket: 'nach Absprache',
      kPlus: 'Dazu', vPlus: 'Erfahrung aus Gründung, Produkt und Recht. Kontakte zu Kanzleien und in die Immobilienbranche.',
      slip: 'Zeichnungsschein', to: 'An', subject: 'Betreff',
      sendDeck: 'Pitch Deck senden',
      estateTitle: 'Immobilien',
      kAssets: 'Objekte', vAssets: 'Wohnhäuser, Zinshäuser, Grundstücke mit Widmung',
      vRegionE: 'Tirol und Westösterreich',
      kCondition: 'Zustand', vCondition: 'Bestand, gern mit Sanierungs- oder Entwicklungsbedarf',
      kDeals: 'Ankauf', vDeals: 'direkt von Eigentümern oder über Makler, auch off-market',
      sendExpose: 'Exposé senden',
      portrait: 'Porträt Lukas Leys folgt',
      aboutSr: 'Über mich: ',
      role: 'Gründer und Geschäftsführer der tenverde GmbH',
      bio: 'Ich gründe Softwareunternehmen und investiere in junge Firmen und in Immobilien. tenverde bündelt das unter einem Dach. Was ich aufbaue, will ich lange halten und in Ruhe wachsen lassen.',
      linkedin: 'Profil auf LinkedIn',
      contactTitle: 'Schreiben Sie mir.',
      country: 'Österreich',
      imprint: 'Impressum', privacy: 'Datenschutz'
    },
    en: {
      docTitle: 'tenverde GmbH · Holding company in Innsbruck',
      skip: 'Skip to content',
      brandLabel: 'tenverde, back to top',
      navLabel: 'Main navigation',
      navCompanies: 'Companies', navLooking: 'Looking for', navAbout: 'About', navContact: 'Contact',
      langLabel: 'Language',
      heroTitle: 'We invest in things that grow.',
      heroLead: 'tenverde is my holding company, based in Innsbruck. It holds my software companies, my stakes in startups and my real estate.',
      ctaLooking: 'What I look for', ctaContact: 'Get in touch',
      rosetteLabel: 'Live drawn guilloche rosette with the tenverde leaf at its centre',
      companiesTitle: 'Companies I am building',
      coupon: 'Coupon',
      newTab: ' (opens in a new tab)',
      c1: 'AI software for legal work. Research, drafting and document review for law firms and in-house teams.',
      c2: 'Software for real estate. Digital tools for owners, property managers and agents.',
      c3: 'AI applications for businesses. Automating workflows that still run by hand today.',
      c4: 'The crypto podcast from Vienna. Bitcoin, blockchain and the crypto economy explained clearly.',
      lookingTitle: 'I am looking for startups and real estate.',
      lookingLead: 'tenverde invests its own capital and holds for the long term. I decide myself and quickly, with no fund and no committee.',
      startupsTitle: 'Startup investments',
      kStage: 'Stage', kSectors: 'Sectors', vSectors: 'Software, AI, LegalTech, PropTech',
      kRegion: 'Region', vRegionS: 'Austria, Germany, Switzerland',
      kTicket: 'Ticket', vTicket: 'by arrangement',
      kPlus: 'Plus', vPlus: 'Experience in founding, product and law. Contacts to law firms and the real estate industry.',
      slip: 'Subscription slip', to: 'To', subject: 'Subject',
      sendDeck: 'Send pitch deck',
      estateTitle: 'Real estate',
      kAssets: 'Assets', vAssets: 'Residential and multi-family buildings, zoned plots',
      vRegionE: 'Tyrol and western Austria',
      kCondition: 'Condition', vCondition: 'Existing stock, ideally in need of renovation or development',
      kDeals: 'Deals', vDeals: 'directly from owners or through agents, off-market welcome',
      sendExpose: 'Send exposé',
      portrait: 'Portrait of Lukas Leys to follow',
      aboutSr: 'About: ',
      role: 'Founder and managing director of tenverde GmbH',
      bio: 'I found software companies and invest in young businesses and in real estate. tenverde brings all of it under one roof. What I build, I intend to hold for a long time and let grow at its own pace.',
      linkedin: 'Profile on LinkedIn',
      contactTitle: 'Write to me.',
      country: 'Austria',
      imprint: 'Legal notice', privacy: 'Privacy'
    }
  };
  var META = {
    de: 'tenverde ist die Beteiligungsgesellschaft von Lukas Leys in Innsbruck: Softwareunternehmen, Beteiligungen an Startups und Immobilien.',
    en: 'tenverde is the holding company of Lukas Leys in Innsbruck: software companies, stakes in startups and real estate.'
  };

  function applyLang(lang, store) {
    if (!T[lang]) lang = 'de';
    var d = T[lang];
    root.lang = lang;
    document.title = d.docTitle;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', META[lang]);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (d[k] != null) el.textContent = d[k];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2 && d[p[1]] != null) el.setAttribute(p[0], d[p[1]]);
      });
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    if (store) { try { localStorage.setItem('tenverde-lang', lang); } catch (e) { /* Speicher gesperrt */ } }
    // Rahmen neu vermessen, Textlänge ändert die Höhe
    scheduleFrames();
  }

  function initialLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) { q = null; }
    if (q === 'en' || q === 'de') return q;
    try {
      var s = localStorage.getItem('tenverde-lang');
      if (s === 'en' || s === 'de') return s;
    } catch (e) { /* Speicher gesperrt */ }
    return 'de';
  }

  /* ------------------------------------------------------------------
     Statische Siegel (SVG-Guilloche)
     ------------------------------------------------------------------ */
  function ringPath(cx, cy, o) {
    var d = '';
    var pts = o.pts || Math.max(o.n * 10, 160);
    for (var j = 0; j < o.M; j++) {
      var phi = TAU * j / o.M;
      for (var i = 0; i <= pts; i++) {
        var t = TAU * i / pts;
        var e = 1 + (o.env || 0) * Math.cos((o.p || 0) * t + (o.psi || 0));
        var r = o.r0 + o.amp * e * Math.sin(o.n * t + phi);
        d += (i ? 'L' : 'M') + (cx + r * Math.cos(t)).toFixed(1) + ' ' + (cy + r * Math.sin(t)).toFixed(1);
      }
    }
    return d;
  }

  var SEALS = {
    stamp: { rings: [{ r0: 76, amp: 15, n: 10, M: 8, sw: 0.7 }], circles: [96, 58] },
    c1: { rings: [{ r0: 84, amp: 9, n: 18, M: 20, env: 0.3, p: 6 }, { r0: 61, amp: 8, n: 11, M: 14, env: 0.45, p: 11, u: 1 }], circles: [97, 94, 73, 49] },
    c2: { rings: [{ r0: 82, amp: 11, n: 14, M: 16, env: 0.4, p: 7 }, { r0: 58, amp: 7, n: 7, M: 12, u: 1 }], circles: [97, 70, 47] },
    c3: { rings: [{ r0: 84, amp: 9, n: 22, M: 18 }, { r0: 60, amp: 9, n: 9, M: 14, env: 0.5, p: 9, u: 1 }], circles: [97, 95, 72, 48] },
    c4: { rings: [{ r0: 83, amp: 10, n: 12, M: 18, env: 0.35, p: 12 }, { r0: 60, amp: 8, n: 15, M: 12, u: 1 }], circles: [97, 72, 49] },
    ka: { rings: [{ r0: 76, amp: 14, n: 16, M: 12, env: 0.3, p: 8 }], circles: [96, 52] },
    kb: { rings: [{ r0: 76, amp: 14, n: 11, M: 12, env: 0.3, p: 11 }], circles: [96, 52] },
    issuer: {
      rings: [
        { r0: 86, amp: 8.5, n: 32, M: 22, env: 0.3, p: 8, pts: 520 },
        { r0: 66, amp: 9, n: 17, M: 16, env: 0.5, p: 17, u: 1, pts: 360 },
        { r0: 46, amp: 6, n: 24, M: 12, pts: 300 }
      ],
      circles: [98.5, 96.5, 76.5, 55, 37]
    }
  };

  function drawSeal(svg) {
    var spec = SEALS[svg.getAttribute('data-seal')];
    if (!spec) return;
    var h = '';
    spec.rings.forEach(function (o) {
      h += '<path d="' + ringPath(100, 100, o) + '" stroke-width="' + (o.sw || 0.55) + '"' +
        (o.u ? ' style="stroke:#D47F4C;stroke-opacity:.9"' : ' stroke-opacity=".85"') + '/>';
    });
    spec.circles.forEach(function (r, i) {
      h += '<circle cx="100" cy="100" r="' + r + '" stroke-width="' + (i === 0 ? 1.1 : 0.6) + '"/>';
    });
    svg.innerHTML = h;
  }

  function drawPortrait(svg) {
    var cx = 200, cy = 250, RX = 186, RY = 236;
    var h = '';
    // Hintergrundgravur: konzentrische Wellenovale
    var d = '';
    var N = 46;
    for (var k = 1; k <= N; k++) {
      var s = k / N;
      var pts = 220;
      for (var i = 0; i <= pts; i++) {
        var t = TAU * i / pts;
        var w = 1 + 0.022 * Math.sin(14 * t + k * 0.55) * s;
        var x = cx + RX * 0.86 * s * w * Math.cos(t);
        var y = cy + RY * 0.86 * s * w * Math.sin(t);
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
    }
    h += '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="0.45" stroke-opacity=".55" vector-effect="non-scaling-stroke"/>';
    // Seilband um das Oval
    var rope = '';
    for (var j = 0; j < 5; j++) {
      var pts2 = 900;
      for (var m = 0; m <= pts2; m++) {
        var tt = TAU * m / pts2;
        var sc = 0.905 + 0.035 * (0.5 + 0.5 * Math.sin(72 * tt + TAU * j / 5));
        rope += (m ? 'L' : 'M') + (cx + RX * sc * Math.cos(tt)).toFixed(1) + ' ' + (cy + RY * sc * Math.sin(tt)).toFixed(1);
      }
    }
    h += '<path d="' + rope + '" fill="none" stroke="currentColor" stroke-width="0.6" vector-effect="non-scaling-stroke"/>';
    h += '<ellipse cx="200" cy="250" rx="' + (RX * 0.885) + '" ry="' + (RY * 0.885) + '" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/>';
    h += '<ellipse cx="200" cy="250" rx="' + (RX * 0.96) + '" ry="' + (RY * 0.96) + '" fill="none" stroke="currentColor" stroke-width="0.6" vector-effect="non-scaling-stroke"/>';
    h += '<ellipse cx="200" cy="250" rx="' + RX + '" ry="' + RY + '" fill="none" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke"/>';
    svg.innerHTML = h;
  }

  /* ------------------------------------------------------------------
     Seilband-Rahmen, beim Scrollen eingezeichnet
     ------------------------------------------------------------------ */
  var frames = [];

  function rrSegments(w, h, r) {
    var q = Math.PI / 2;
    return [
      { len: w - 2 * r, f: function (u) { return [r + u, 0, 0, 1]; } },
      { len: q * r, f: function (u) { var a = -q + u / r; return [w - r + r * Math.cos(a), r + r * Math.sin(a), -Math.cos(a), -Math.sin(a)]; } },
      { len: h - 2 * r, f: function (u) { return [w, r + u, -1, 0]; } },
      { len: q * r, f: function (u) { var a = u / r; return [w - r + r * Math.cos(a), h - r + r * Math.sin(a), -Math.cos(a), -Math.sin(a)]; } },
      { len: w - 2 * r, f: function (u) { return [w - r - u, h, 0, -1]; } },
      { len: q * r, f: function (u) { var a = q + u / r; return [r + r * Math.cos(a), h - r + r * Math.sin(a), -Math.cos(a), -Math.sin(a)]; } },
      { len: h - 2 * r, f: function (u) { return [0, h - r - u, 1, 0]; } },
      { len: q * r, f: function (u) { var a = Math.PI + u / r; return [r + r * Math.cos(a), r + r * Math.sin(a), -Math.cos(a), -Math.sin(a)]; } }
    ];
  }

  function buildFrame(fr) {
    var host = fr.host, svg = fr.svg;
    var w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    if (fr.w === w && fr.h === h) return;
    fr.w = w; fr.h = h;
    var small = w < 640;
    var band = (+host.getAttribute('data-band') || 10) * (small ? 0.75 : 1);
    var K = +host.getAttribute('data-strands') || 5;
    var a = small ? 6 : 10;
    var r = a + band + 10;
    var segs = rrSegments(w, h, r);
    var P = 0; segs.forEach(function (s) { P += s.len; });
    var waves = Math.max(8, Math.round(P / (band * 2.1)));
    var N = Math.round(P / 2.5);
    var samples = new Array(N);
    var si = 0, acc = 0;
    for (var i = 0; i < N; i++) {
      var s = (i / N) * P;
      while (si < segs.length - 1 && s > acc + segs[si].len) { acc += segs[si].len; si++; }
      samples[i] = segs[si].f(s - acc);
      samples[i].push(s / P);
    }
    var NS = 'http://www.w3.org/2000/svg';
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.innerHTML = '';
    function rect(d, sw, op) {
      var el = document.createElementNS(NS, 'rect');
      el.setAttribute('x', d); el.setAttribute('y', d);
      el.setAttribute('width', Math.max(0, w - 2 * d)); el.setAttribute('height', Math.max(0, h - 2 * d));
      el.setAttribute('rx', Math.max(0, r - d));
      el.setAttribute('stroke', 'currentColor'); el.setAttribute('stroke-width', sw);
      if (op) el.setAttribute('stroke-opacity', op);
      svg.appendChild(el);
    }
    rect(a - 3, 1.1);
    rect(a + band + 3, 0.8);
    rect(a + band + 6.5, 0.5, 0.7);
    fr.paths = [];
    for (var k = 0; k < K; k++) {
      var d = '';
      var ph = TAU * k / K;
      for (var n = 0; n < N; n++) {
        var sm = samples[n];
        var off = a + band / 2 + (band / 2) * Math.sin(TAU * waves * sm[4] + ph);
        d += (n ? 'L' : 'M') + (sm[0] + sm[2] * off).toFixed(1) + ' ' + (sm[1] + sm[3] * off).toFixed(1);
      }
      d += 'Z';
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('pathLength', '1');
      p.setAttribute('stroke', 'currentColor');
      p.setAttribute('stroke-width', k % 2 ? '0.55' : '0.75');
      p.setAttribute('stroke-dasharray', '1 1');
      svg.appendChild(p);
      fr.paths.push(p);
    }
    paintFrame(fr);
  }

  function paintFrame(fr) {
    if (!fr.paths) return;
    var p = fr.p;
    fr.paths.forEach(function (path, k) {
      var pk = clamp(p * 1.25 - k * 0.05, 0, 1);
      path.setAttribute('stroke-dashoffset', (1 - pk).toFixed(4));
    });
  }

  var frameQueued = false;
  function scheduleFrames() {
    if (frameQueued) return;
    frameQueued = true;
    requestAnimationFrame(function () {
      frameQueued = false;
      frames.forEach(buildFrame);
      updateFrameProgress();
    });
  }

  function updateFrameProgress() {
    var vh = window.innerHeight || 800;
    frames.forEach(function (fr) {
      if (fr.hero) return;
      if (reduced()) { fr.p = 1; paintFrame(fr); return; }
      var rc = fr.host.getBoundingClientRect();
      var p = clamp((vh * 0.95 - rc.top) / (Math.min(rc.height, vh) * 0.75), 0, 1);
      if (p > fr.p) { fr.p = p; paintFrame(fr); }
    });
  }

  function initFrames() {
    document.querySelectorAll('.frame').forEach(function (host) {
      var svg = host.querySelector(':scope > .rope');
      if (!svg) return;
      frames.push({ host: host, svg: svg, p: 0, hero: host.getAttribute('data-frame') === 'hero' });
    });
    frames.forEach(buildFrame);
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(scheduleFrames);
      frames.forEach(function (fr) { ro.observe(fr.host); });
    } else {
      window.addEventListener('resize', scheduleFrames);
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; updateFrameProgress(); });
    }, { passive: true });
    updateFrameProgress();

    var hero = frames.filter(function (f) { return f.hero; })[0];
    if (hero) {
      if (reduced()) { hero.p = 1; paintFrame(hero); }
      else {
        var t0 = performance.now();
        (function step(now) {
          var x = clamp((now - t0) / 2200, 0, 1);
          hero.p = easeOutExpo(x);
          paintFrame(hero);
          if (x < 1) requestAnimationFrame(step);
        })(t0);
      }
    }
  }

  /* ------------------------------------------------------------------
     Live-Guilloche der Urkunde
     ------------------------------------------------------------------ */
  function Rosette(el) {
    var cv = el.querySelector('canvas');
    var ctx = cv.getContext('2d');
    if (!ctx) return;
    var size = 0, R = 0, dpr = 1;
    var st = { mx: 0, my: 0, tx: 0, ty: 0, t: 0, intro: reduced() ? 1 : 0 };
    var visible = true, running = false, last = 0, lastDraw = 0, introStart = 0;
    var INK = '13,59,46';
    var grad = null;

    function resize() {
      var w = el.clientWidth;
      if (!w) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = w; R = w / 2;
      cv.width = Math.round(w * dpr); cv.height = Math.round(w * dpr);
      grad = null;
      draw();
    }

    function band(o) {
      // o: r0, amp, n, M, env, p, psi, rot (Bruchteile von R)
      var r0 = o.r0 * R, amp = o.amp * R;
      var pts = Math.round(clamp(TAU * r0 / 4.2, o.n * 8, 1100));
      ctx.beginPath();
      for (var j = 0; j < o.M; j++) {
        var phi = TAU * j / o.M;
        for (var i = 0; i <= pts; i++) {
          var t = TAU * i / pts;
          var e = 1 + o.env * Math.cos(o.p * t + o.psi);
          var r = r0 + amp * e * Math.sin(o.n * t + phi + o.twist * Math.sin(t * o.p * 0.5));
          var a = t + o.rot;
          var x = r * Math.cos(a), y = r * Math.sin(a);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    function hypo(o) {
      // Hypotrochoide: x = (A-b)cos t + d cos((A-b)/b t), y = (A-b) sin t - d sin((A-b)/b t)
      var A = o.A * R, b = A * o.ratio, d0 = o.d * R;
      var k = (A - b) / b;
      var turns = o.turns;
      var pts = Math.round(turns * clamp(TAU * (A - b) / 4.5, 120, 900));
      ctx.beginPath();
      for (var c = 0; c < o.copies; c++) {
        var d = d0 * (0.45 + 0.55 * c / Math.max(1, o.copies - 1));
        var rot = o.rot + c * o.spin;
        for (var i = 0; i <= pts; i++) {
          var t = turns * TAU * i / pts;
          var x = (A - b) * Math.cos(t) + d * Math.cos(k * t);
          var y = (A - b) * Math.sin(t) - d * Math.sin(k * t);
          var cr = Math.cos(rot), sr = Math.sin(rot);
          var X = x * cr - y * sr, Y = x * sr + y * cr;
          if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
        }
      }
      ctx.stroke();
    }

    function ring(f, lw, alpha) {
      ctx.beginPath();
      ctx.arc(0, 0, f * R, 0, TAU);
      ctx.lineWidth = lw;
      ctx.strokeStyle = 'rgba(' + INK + ',' + alpha + ')';
      ctx.stroke();
    }

    function draw() {
      if (!size) return;
      var mx = st.mx, my = st.my, t = st.t;
      var breath = Math.sin(t * 0.55);
      var lw = clamp(R / 640, 0.5, 0.85);
      var small = size < 640;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(R, R);
      if (st.intro < 1) {
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.001, R * easeOutExpo(st.intro) * 1.02), 0, TAU);
        ctx.clip();
      }
      ctx.lineJoin = 'round';

      // Ringlinien
      ring(0.985, lw * 1.8, 0.9);
      ring(0.972, lw, 0.7);
      ring(0.79, lw * 1.4, 0.85);
      ring(0.776, lw, 0.6);
      ring(0.565, lw, 0.7);
      ring(0.548, lw * 1.4, 0.85);
      ring(0.415, lw * 1.2, 0.8);

      // 1 Außenband (Tiefdruck)
      ctx.lineWidth = lw;
      ctx.strokeStyle = 'rgba(' + INK + ',0.72)';
      band({ r0: 0.878, amp: 0.072 * (1 + 0.05 * breath + my * 0.12), n: 26, M: small ? 22 : 30,
        env: 0.32 + mx * 0.16, p: 13, psi: t * 0.18 + mx * 1.6, rot: t * 0.012, twist: 0.25 + my * 0.5 });

      // 2 Unterdruck-Band, Irisdruck Orange bis Violett
      if (!grad) {
        grad = ctx.createLinearGradient(-R, -R, R, R);
        grad.addColorStop(0, 'rgba(226,128,70,0.95)');
        grad.addColorStop(0.45, 'rgba(214,132,124,0.9)');
        grad.addColorStop(1, 'rgba(128,104,190,0.95)');
      }
      ctx.lineWidth = lw * 1.05;
      ctx.strokeStyle = grad;
      band({ r0: 0.668, amp: 0.088 * (1 + 0.06 * breath), n: 14, M: small ? 20 : 28,
        env: 0.48 - my * 0.18, p: 7, psi: -t * 0.22 - mx * 1.2, rot: -t * 0.018, twist: 0.4 + mx * 0.35 });

      // 3 Innenband (Tiefdruck)
      ctx.lineWidth = lw;
      ctx.strokeStyle = 'rgba(' + INK + ',0.78)';
      band({ r0: 0.482, amp: 0.05 * (1 + 0.08 * breath + my * 0.15), n: 30, M: small ? 14 : 20,
        env: 0.25, p: 5, psi: t * 0.3 + mx, rot: t * 0.02, twist: 0.2 });

      // 4 Hypotrochoide um das Medaillon
      ctx.lineWidth = lw * 0.9;
      ctx.strokeStyle = 'rgba(' + INK + ',0.7)';
      hypo({ A: 0.487, ratio: 7 / 24, d: 0.058 * (1 + my * 0.25 + 0.06 * breath), turns: 7, copies: small ? 4 : 6,
        spin: 0.012 + mx * 0.01, rot: -t * 0.025 + mx * 0.3 });

      ctx.restore();
    }

    function loop(now) {
      if (!running) return;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      st.t += dt;
      st.mx += (st.tx - st.mx) * 0.045;
      st.my += (st.ty - st.my) * 0.045;
      if (st.intro < 1) st.intro = clamp((now - introStart) / 2400, 0, 1);
      if (now - lastDraw >= 30) { lastDraw = now; draw(); }
      requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduced() || !visible || document.hidden) return;
      running = true; last = 0;
      if (!introStart) introStart = performance.now();
      requestAnimationFrame(loop);
    }
    function stop() { running = false; }

    window.addEventListener('pointermove', function (e) {
      if (!running || !R) return;
      var rc = el.getBoundingClientRect();
      st.tx = clamp((e.clientX - (rc.left + R)) / R, -1, 1);
      st.ty = clamp((e.clientY - (rc.top + R)) / R, -1, 1);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) start(); else stop();
      }).observe(el);
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    var onReduce = function () { if (reduced()) { stop(); st.intro = 1; st.mx = st.my = 0; draw(); } else start(); };
    if (reduceMQ.addEventListener) reduceMQ.addEventListener('change', onReduce);

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(el);
    else window.addEventListener('resize', resize);
    resize();
    start();
  }

  /* ------------------------------------------------------------------
     Start
     ------------------------------------------------------------------ */
  document.querySelectorAll('svg[data-seal]').forEach(drawSeal);
  document.querySelectorAll('svg[data-portrait]').forEach(drawPortrait);
  initFrames();
  applyLang(initialLang(), false);
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang'), true); });
  });
  var ros = document.querySelector('.rosette');
  if (ros) Rosette(ros);
})();
