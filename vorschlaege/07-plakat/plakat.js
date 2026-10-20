/* tenverde · Vorschlag 07 Plakat: Sprache, Jahreszeiten, Bühnenebenen */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---------- Sprache ---------- */
  var T = {
    de: {
      title: 'tenverde · Beteiligungsgesellschaft in Innsbruck',
      desc: 'tenverde ist meine Beteiligungsgesellschaft mit Sitz in Innsbruck. Hier liegen meine Softwareunternehmen, meine Beteiligungen an Startups und meine Immobilien.',
      skip: 'Zum Inhalt',
      stage: 'Gezeichnete Plakatlandschaft: die Nordkette über Innsbruck, davor Wälder und das Inntal, darüber die Bildmarke von tenverde als Sonne',
      brand: 'tenverde, zum Anfang',
      navLabel: 'Hauptnavigation',
      nav1: 'Unternehmen', nav2: 'Gesucht', nav3: 'Über mich', nav4: 'Kontakt',
      langLabel: 'Sprache', langDe: 'Deutsch', langEn: 'Englisch',
      heroTitle: 'Wir investieren in Dinge, die wachsen.',
      heroLead: 'tenverde ist meine Beteiligungsgesellschaft mit Sitz in Innsbruck. Hier liegen meine Softwareunternehmen, meine Beteiligungen an Startups und meine Immobilien.',
      heroCta1: 'Was ich suche', heroCta2: 'Kontakt aufnehmen',
      coTitle: 'Unternehmen, die ich selbst aufbaue',
      co1: 'KI-Software für juristische Arbeit. Recherche, Entwürfe und Prüfung von Dokumenten für Kanzleien und Rechtsabteilungen.',
      co2: 'Software für Immobilien. Digitale Werkzeuge für Eigentümer, Verwalter und Makler.',
      co3: 'KI-Anwendungen für Unternehmen. Automatisierung von Abläufen, die heute noch von Hand laufen.',
      co4: 'Der Krypto-Podcast aus Wien. Bitcoin, Blockchain und Kryptoökonomie verständlich eingeordnet.',
      newTab: '(öffnet in neuem Tab)',
      seTitle: 'Ich suche Startups und Immobilien.',
      seLead: 'tenverde investiert eigenes Kapital und hält langfristig. Ich entscheide selbst und schnell, ohne Fonds und ohne Komitee.',
      stTitle: 'Startup-Beteiligungen',
      stK1: 'Phase', stK2: 'Branchen', stK3: 'Region', stK4: 'Ticket', stK5: 'Dazu',
      stV2: 'Software, KI, LegalTech, PropTech',
      stV3: 'Österreich, Deutschland, Schweiz',
      stV4: 'nach Absprache',
      stV5: 'Erfahrung aus Gründung, Produkt und Recht. Kontakte zu Kanzleien und in die Immobilienbranche.',
      stCta: 'Pitch Deck senden',
      reTitle: 'Immobilien',
      reK1: 'Objekte', reK2: 'Region', reK3: 'Zustand', reK4: 'Ankauf',
      reV1: 'Wohnhäuser, Zinshäuser, Grundstücke mit Widmung',
      reV2: 'Tirol und Westösterreich',
      reV3: 'Bestand, gern mit Sanierungs- oder Entwicklungsbedarf',
      reV4: 'direkt von Eigentümern oder über Makler, auch off-market',
      reCta: 'Exposé senden',
      portrait: 'Porträt Lukas Leys folgt',
      portraitAlt: 'Platzhalter: Porträt Lukas Leys folgt',
      role: 'Gründer und Geschäftsführer der tenverde GmbH',
      about: 'Ich gründe Softwareunternehmen und investiere in junge Firmen und in Immobilien. tenverde bündelt das unter einem Dach. Was ich aufbaue, will ich lange halten und in Ruhe wachsen lassen.',
      linkedin: 'Profil auf LinkedIn',
      koTitle: 'Schreiben Sie mir.',
      country: 'Österreich',
      imprint: 'Impressum', privacy: 'Datenschutz'
    },
    en: {
      title: 'tenverde · Holding company in Innsbruck',
      desc: 'tenverde is my holding company, based in Innsbruck. It holds my software companies, my stakes in startups and my real estate.',
      skip: 'Skip to content',
      stage: 'Drawn poster landscape: the Nordkette above Innsbruck, with forests and the Inn valley in front and the tenverde leaf mark as the sun',
      brand: 'tenverde, back to top',
      navLabel: 'Main navigation',
      nav1: 'Companies', nav2: 'Looking for', nav3: 'About', nav4: 'Contact',
      langLabel: 'Language', langDe: 'German', langEn: 'English',
      heroTitle: 'We invest in things that grow.',
      heroLead: 'tenverde is my holding company, based in Innsbruck. It holds my software companies, my stakes in startups and my real estate.',
      heroCta1: 'What I look for', heroCta2: 'Get in touch',
      coTitle: 'Companies I am building',
      co1: 'AI software for legal work. Research, drafting and document review for law firms and in-house teams.',
      co2: 'Software for real estate. Digital tools for owners, property managers and agents.',
      co3: 'AI applications for businesses. Automating workflows that still run by hand today.',
      co4: 'The crypto podcast from Vienna. Bitcoin, blockchain and the crypto economy explained clearly.',
      newTab: '(opens in a new tab)',
      seTitle: 'I am looking for startups and real estate.',
      seLead: 'tenverde invests its own capital and holds for the long term. I decide myself and quickly, with no fund and no committee.',
      stTitle: 'Startup investments',
      stK1: 'Stage', stK2: 'Sectors', stK3: 'Region', stK4: 'Ticket', stK5: 'Plus',
      stV2: 'Software, AI, LegalTech, PropTech',
      stV3: 'Austria, Germany, Switzerland',
      stV4: 'by arrangement',
      stV5: 'Experience in founding, product and law. Contacts to law firms and the real estate industry.',
      stCta: 'Send pitch deck',
      reTitle: 'Real estate',
      reK1: 'Assets', reK2: 'Region', reK3: 'Condition', reK4: 'Deals',
      reV1: 'Residential and multi-family buildings, zoned plots',
      reV2: 'Tyrol and western Austria',
      reV3: 'Existing stock, ideally in need of renovation or development',
      reV4: 'directly from owners or through agents, off-market welcome',
      reCta: 'Send exposé',
      portrait: 'Portrait of Lukas Leys to follow',
      portraitAlt: 'Placeholder: portrait of Lukas Leys to follow',
      role: 'Founder and managing director of tenverde GmbH',
      about: 'I found software companies and invest in young businesses and in real estate. tenverde brings all of it under one roof. What I build, I intend to hold for a long time and let grow at its own pace.',
      linkedin: 'Profile on LinkedIn',
      koTitle: 'Write to me.',
      country: 'Austria',
      imprint: 'Legal notice', privacy: 'Privacy'
    }
  };

  var metaDesc = document.querySelector('meta[name="description"]');
  var langButtons = document.querySelectorAll('.lang button');

  function setLang(lang, store) {
    var d = T[lang] || T.de;
    root.lang = lang;
    document.title = d.title;
    if (metaDesc) metaDesc.setAttribute('content', d.desc);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (d[k] != null) el.textContent = d[k];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (d[k] != null) el.setAttribute('aria-label', d[k]);
    });
    langButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    if (store) { try { localStorage.setItem('tenverde-lang', lang); } catch (e) { /* Speicher gesperrt */ } }
  }

  var lang = 'de';
  try { var saved = localStorage.getItem('tenverde-lang'); if (saved === 'de' || saved === 'en') lang = saved; } catch (e) { /* ohne Speicher */ }
  try { var q = new URLSearchParams(location.search).get('lang'); if (q === 'de' || q === 'en') lang = q; } catch (e) { /* alte Browser */ }
  setLang(lang, false);
  langButtons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); measure(); });
  });

  /* ---------- Bühne: Maße ---------- */
  var stage = document.getElementById('stage');
  var header = document.getElementById('kopf');
  var caption = document.querySelector('.caption');
  var lastW = 0;

  function measure() {
    if (!stage || !caption) return;
    var y = window.scrollY || 0;
    var capTop = caption.getBoundingClientRect().top + y;
    var hdr = header ? header.getBoundingClientRect().bottom + y : 72;
    var band = Math.max(36, Math.min(80, window.innerHeight * 0.07));
    var h = Math.max(hdr + 140, capTop - band);
    root.style.setProperty('--s', hdr + 'px');
    root.style.setProperty('--h', h + 'px');
    lastW = window.innerWidth;
  }
  measure();
  window.addEventListener('resize', function () {
    if (window.innerWidth !== lastW) measure();
    kick();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  /* ---------- Jahreszeiten und aktueller Abschnitt ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main > section'));
  var navLinks = document.querySelectorAll('.nav a');
  function setSeason(sec) {
    var s = sec.getAttribute('data-season') || 'summer';
    if (root.getAttribute('data-season') !== s) root.setAttribute('data-season', s);
    navLinks.forEach(function (a) {
      if (a.getAttribute('href') === '#' + sec.id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setSeason(e.target); });
    }, { rootMargin: '-48% 0px -48% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Ebenen: Zeiger und Scrollen ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var layers = {};
  document.querySelectorAll('.layer').forEach(function (el) { layers[el.getAttribute('data-l')] = el; });

  var cur = { mx: 0, my: 0, p: 0, o: 0 };
  var tgt = { mx: 0, my: 0, p: 0, o: 0 };
  var raf = 0;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function targets() {
    var vh = window.innerHeight;
    var y = window.scrollY || 0;
    tgt.p = clamp(y / (vh * 0.85));
    /* An jeder Abschnittsgrenze schließen sich die Kulissen kurz und gehen wieder auf. */
    var breath = 0;
    for (var i = 1; i < sections.length; i++) {
      var top = sections[i].getBoundingClientRect().top;
      var d = Math.abs(top - vh * 0.5) / vh;
      breath = Math.max(breath, 1 - d / 0.32);
    }
    tgt.o = tgt.p * (1 - 0.55 * clamp(breath));
  }

  function apply() {
    var vh = window.innerHeight;
    var mx = cur.mx, my = cur.my, p = cur.p, o = cur.o;
    function t(el, xPct, xPx, yPx) {
      if (el) el.style.transform = 'translate3d(' + xPct.toFixed(2) + '%,' + yPx.toFixed(1) + 'px,0) translateX(' + xPx.toFixed(1) + 'px)';
    }
    t(layers.sun, 0, mx * -6, my * -4 - p * vh * 0.03);
    t(layers.far, 0, mx * -10, my * -5 + p * vh * 0.05);
    t(layers.mid, 0, mx * -13, my * -6 + p * vh * 0.07);
    t(layers.valley, 0, mx * -16, my * -7 + p * vh * 0.09);
    t(layers.nearL, -o * 46, mx * -24, my * -9 + p * vh * 0.07);
    t(layers.nearR, o * 46, mx * -24, my * -9 + p * vh * 0.07);
    t(layers.foreL, -o * 92, mx * -40, my * -14 + p * vh * 0.12);
    t(layers.foreR, o * 92, mx * -40, my * -14 + p * vh * 0.12);
  }

  function tick() {
    raf = 0;
    targets();
    var moving = false;
    ['mx', 'my', 'p', 'o'].forEach(function (k) {
      var diff = tgt[k] - cur[k];
      if (Math.abs(diff) > 0.0005) { cur[k] += diff * 0.1; moving = true; } else cur[k] = tgt[k];
    });
    apply();
    if (moving && !document.hidden) raf = requestAnimationFrame(tick);
  }
  function kick() {
    if (reduce.matches) return;
    if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
  }
  function resetStatic() {
    Object.keys(layers).forEach(function (k) { layers[k].style.transform = ''; });
  }

  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    tgt.mx = (e.clientX / window.innerWidth) * 2 - 1;
    tgt.my = (e.clientY / window.innerHeight) * 2 - 1;
    kick();
  }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; } else kick();
  });
  var onReduce = function () { if (reduce.matches) { if (raf) cancelAnimationFrame(raf); raf = 0; resetStatic(); } else kick(); };
  if (reduce.addEventListener) reduce.addEventListener('change', onReduce); else if (reduce.addListener) reduce.addListener(onReduce);

  if (!reduce.matches) {
    targets();
    cur.p = tgt.p; cur.o = tgt.o;
    apply();
  }
})();
