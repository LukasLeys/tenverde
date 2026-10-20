/* tenverde · Vorschlag 05 Piktogramme
   Sprache, Fallblatt-Piktogramme, Wegweiser-Menü. Inhalt ist ohne Skript vollständig sichtbar. */
(function () {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';
  var root = document.documentElement;
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(motionQuery && motionQuery.matches);

  /* ---------- Sprache ---------- */
  var EN = {
    'skip': 'Skip to content',
    'menu': 'Menu',
    'nav.aria': 'Main navigation',
    'lang.aria': 'Choose language',
    'nav.companies': 'Companies',
    'nav.looking': 'Looking for',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'We invest in things that grow.',
    'hero.lead': 'tenverde is my holding company, based in Innsbruck. It holds my software companies, my stakes in startups and my real estate.',
    'hero.cta': 'Get in touch',
    'hero.cta2': 'What I look for',
    'hero.fig': 'The tenverde pictogram family: leaf, startups, real estate, software, podcast, law. Every pictogram is built on the leaf.',
    'anim.pause': 'Pause animation',
    'anim.play': 'Resume animation',
    'index.aria': 'Show pictogram',
    'pic.leaf': 'Leaf',
    'pic.seed': 'Startups',
    'pic.house': 'Real estate',
    'pic.code': 'Software',
    'pic.waves': 'Podcast',
    'pic.scales': 'Law',
    'co.title': 'Companies I am building',
    'co.1': 'AI software for legal work. Research, drafting and document review for law firms and in-house teams.',
    'co.2': 'Software for real estate. Digital tools for owners, property managers and agents.',
    'co.3': 'AI applications for businesses. Automating workflows that still run by hand today.',
    'co.4': 'The crypto podcast from Vienna. Bitcoin, blockchain and the crypto economy explained clearly.',
    'newtab': '(opens in a new tab)',
    'look.title': 'I am looking for startups and real estate.',
    'look.lead': 'tenverde invests its own capital and holds for the long term. I decide myself and quickly, with no fund and no committee.',
    's.title': 'Startup investments',
    's.stage.l': 'Stage',
    's.sec.l': 'Sectors',
    's.sec.v': 'Software, AI, LegalTech, PropTech',
    'reg.l': 'Region',
    's.reg.v': 'Austria, Germany, Switzerland',
    's.tic.v': 'by arrangement',
    's.plus.l': 'Plus',
    's.plus.v': 'Experience in founding, product and law. Contacts to law firms and the real estate industry.',
    's.cta': 'Send pitch deck',
    'r.title': 'Real estate',
    'r.obj.l': 'Assets',
    'r.obj.v': 'Residential and multi-family buildings, zoned plots',
    'r.reg.v': 'Tyrol and western Austria',
    'r.cond.l': 'Condition',
    'r.cond.v': 'Existing stock, ideally in need of renovation or development',
    'r.deal.l': 'Deals',
    'r.deal.v': 'directly from owners or through agents, off-market welcome',
    'r.cta': 'Send exposé',
    'about.title': 'About',
    'about.role': 'Founder and managing director of tenverde GmbH',
    'about.text': 'I found software companies and invest in young businesses and in real estate. tenverde brings all of it under one roof. What I build, I intend to hold for a long time and let grow at its own pace.',
    'about.link': 'Profile on LinkedIn',
    'portrait': 'Placeholder: portrait of Lukas Leys to follow',
    'portrait.label': 'Portrait of Lukas Leys to follow',
    'contact.title': 'Write to me.',
    'contact.country': 'Austria',
    'foot.imprint': 'Legal notice',
    'foot.privacy': 'Privacy',
    '_title': 'tenverde GmbH · Innsbruck',
    '_desc': 'tenverde is my holding company, based in Innsbruck. It holds my software companies, my stakes in startups and my real estate.'
  };
  var DE = {
    'anim.pause': 'Animation anhalten',
    'anim.play': 'Animation fortsetzen'
  };
  var LABELS = {
    de: ['tenverde', 'Startups', 'Immobilien', 'Software', 'Podcast', 'Recht'],
    en: ['tenverde', 'Startups', 'Real estate', 'Software', 'Podcast', 'Law']
  };
  var FAMILY = ['p-leaf', 'p-seed', 'p-house', 'p-code', 'p-waves', 'p-scales'];

  var textNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var ariaNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-aria]'));
  textNodes.forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in DE)) DE[k] = el.textContent; });
  ariaNodes.forEach(function (el) { var k = el.getAttribute('data-i18n-aria'); if (!(k in DE)) DE[k] = el.getAttribute('aria-label'); });
  var metaDesc = document.querySelector('meta[name="description"]');
  DE._title = document.title;
  DE._desc = metaDesc ? metaDesc.getAttribute('content') : '';

  var lang = 'de';
  function t(key) { var d = lang === 'en' ? EN : DE; return key in d ? d[key] : DE[key]; }

  function applyLang(next, store) {
    lang = next === 'en' ? 'en' : 'de';
    root.setAttribute('lang', lang);
    textNodes.forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    ariaNodes.forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.title = t('_title');
    if (metaDesc) metaDesc.setAttribute('content', t('_desc'));
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    updatePauseLabel();
    if (hero) showWord(LABELS[lang][hero.index], true);
    if (store) { try { localStorage.setItem('tenverde-lang', lang); } catch (e) { /* Speicher gesperrt */ } }
  }

  /* ---------- Fallblatt ---------- */
  function buildFlap(el) {
    var id = el.getAttribute('data-flap');
    var n = parseInt(el.getAttribute('data-slats'), 10) || 6;
    var withGrid = el.hasAttribute('data-grid');
    el.textContent = '';
    var slats = [];
    for (var i = 0; i < n; i++) {
      var s = document.createElement('span');
      s.className = 'slat';
      s.style.top = (i * 100 / n) + '%';
      s.style.height = (100 / n) + '%';
      var svg = document.createElementNS(SVGNS, 'svg');
      svg.setAttribute('viewBox', '0 0 64 64');
      svg.setAttribute('focusable', 'false');
      svg.style.top = (-i * 100) + '%';
      svg.style.height = (n * 100) + '%';
      if (withGrid) {
        var g = document.createElementNS(SVGNS, 'use');
        g.setAttribute('href', '#g-grid');
        g.setAttribute('class', 'grid');
        svg.appendChild(g);
      }
      var u = document.createElementNS(SVGNS, 'use');
      u.setAttribute('href', '#' + id);
      svg.appendChild(u);
      s.appendChild(svg);
      el.appendChild(s);
      slats.push({ s: s, u: u });
    }
    return { el: el, slats: slats, current: id, home: id, timers: [] };
  }

  function flipTo(f, id, stagger) {
    if (f.current === id) return;
    f.current = id;
    f.timers.forEach(clearTimeout);
    f.timers = [];
    var canAnimate = !reduced && typeof f.el.animate === 'function';
    f.slats.forEach(function (sl, i) {
      if (!canAnimate) { sl.u.setAttribute('href', '#' + id); return; }
      f.timers.push(setTimeout(function () {
        var close = sl.s.animate(
          [{ transform: 'scaleY(1)', filter: 'brightness(1)' }, { transform: 'scaleY(0)', filter: 'brightness(.55)' }],
          { duration: 90, easing: 'cubic-bezier(.55,0,1,.45)', fill: 'forwards' }
        );
        close.onfinish = function () {
          sl.u.setAttribute('href', '#' + f.current);
          sl.s.animate(
            [{ transform: 'scaleY(0)', filter: 'brightness(.55)' }, { transform: 'scaleY(1)', filter: 'brightness(1)' }],
            { duration: 140, easing: 'cubic-bezier(.16,1,.3,1)' }
          );
          close.cancel();
        };
      }, i * (stagger || 50)));
    });
  }

  /* ---------- Ziffernblatt mit Buchstaben ---------- */
  var wordEl = document.getElementById('flapword');
  var POOL = 'abcdefghijklmnopqrstuvwxyz';
  var wordRaf = 0;
  function showWord(word, instant) {
    if (!wordEl) return;
    cancelAnimationFrame(wordRaf);
    var chars = word.split('');
    var max = 11;
    var cells = [];
    wordEl.textContent = '';
    for (var i = 0; i < max; i++) {
      var c = document.createElement('span');
      var ch = chars[i] || '';
      c.className = 'cell' + (ch === '' || ch === ' ' ? ' blank' : '');
      wordEl.appendChild(c);
      cells.push({ el: c, target: ch, steps: (instant || reduced) ? 0 : 2 + i });
    }
    var lastTick = 0;
    function render(t) {
      if (t - lastTick < 42 && lastTick) { wordRaf = requestAnimationFrame(render); return; }
      lastTick = t;
      var pending = false;
      cells.forEach(function (c) {
        if (c.target === '' || c.target === ' ') { c.el.textContent = ''; return; }
        if (c.steps > 0) {
          var r = POOL.charAt(Math.floor(Math.random() * POOL.length));
          c.el.textContent = c.target === c.target.toUpperCase() ? r.toUpperCase() : r;
          c.steps--; pending = true;
        } else {
          c.el.textContent = c.target;
        }
      });
      if (pending) wordRaf = requestAnimationFrame(render);
    }
    wordRaf = requestAnimationFrame(render);
    if (instant || reduced) render(performance.now() + 100);
  }

  /* ---------- Bühne im ersten Bildschirm ---------- */
  var hero = null;
  var boardEl = document.getElementById('board');
  var pauseBtn = document.getElementById('pause');
  var indexBtns = Array.prototype.slice.call(document.querySelectorAll('.index button'));
  var PERIOD = 2800;

  function updatePauseLabel() {
    if (!pauseBtn || !hero) return;
    var stopped = hero.paused || reduced;
    pauseBtn.setAttribute('aria-pressed', hero.paused ? 'true' : 'false');
    pauseBtn.setAttribute('aria-label', t(stopped ? 'anim.play' : 'anim.pause'));
    pauseBtn.querySelector('use').setAttribute('href', stopped ? '#i-play' : '#i-pause');
  }

  function showIndex(i, instant) {
    hero.index = i;
    flipTo(hero.flap, FAMILY[i], 55);
    showWord(LABELS[lang][i], instant);
    indexBtns.forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
  }

  if (boardEl) {
    hero = {
      flap: buildFlap(boardEl),
      index: 0,
      paused: false,
      visible: true,
      running: false,
      raf: 0,
      last: 0,
      acc: 0
    };

    var tick = function (now) {
      if (!hero.running) return;
      if (hero.last) hero.acc += now - hero.last;
      hero.last = now;
      if (hero.acc >= PERIOD) {
        hero.acc = 0;
        showIndex((hero.index + 1) % FAMILY.length);
      }
      hero.raf = requestAnimationFrame(tick);
    };
    var setRunning = function () {
      var should = hero.visible && !document.hidden && !hero.paused && !reduced;
      if (should && !hero.running) {
        hero.running = true; hero.last = 0;
        hero.raf = requestAnimationFrame(tick);
      } else if (!should && hero.running) {
        hero.running = false;
        cancelAnimationFrame(hero.raf);
      }
    };
    hero.setRunning = setRunning;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        hero.visible = entries[0].isIntersecting;
        setRunning();
      }, { threshold: 0.15 }).observe(boardEl);
    }
    document.addEventListener('visibilitychange', setRunning);

    indexBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        hero.acc = 0;
        showIndex(parseInt(b.getAttribute('data-show'), 10));
      });
    });
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        if (reduced) {
          showIndex((hero.index + 1) % FAMILY.length);
          return;
        }
        hero.paused = !hero.paused;
        hero.acc = 0;
        updatePauseLabel();
        setRunning();
      });
    }
  }

  /* ---------- Piktogramme der Firmen und Blätter ---------- */
  var smallFlaps = [];
  document.querySelectorAll('[data-flap]').forEach(function (el) {
    if (el === boardEl) return;
    smallFlaps.push(buildFlap(el));
  });
  function bindHover(trigger, f) {
    var seq = [];
    var run = function () {
      if (reduced) return;
      seq.forEach(clearTimeout);
      flipTo(f, 'p-leaf', 40);
      seq = [setTimeout(function () { flipTo(f, f.home, 40); }, 420)];
    };
    trigger.addEventListener('mouseenter', run);
    trigger.addEventListener('focus', run);
  }
  smallFlaps.forEach(function (f) {
    var trigger = f.el.closest('.result, .sheet, .contact');
    if (!trigger) return;
    var target = trigger.classList.contains('sheet') || trigger.classList.contains('contact')
      ? trigger.querySelector('.btn, .mail-sign') : trigger;
    if (target) bindHover(target, f);
    if (trigger.classList.contains('sheet') || trigger.classList.contains('contact')) {
      var head = trigger.querySelector('.sheet-head, .contact-picto');
      if (head) bindHover(head, f);
    }
  });

  /* ---------- Menü auf kleinen Bildschirmen ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('hauptnav');
  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
    });
  }

  /* ---------- Bewegung reduzieren ---------- */
  function onMotionChange() {
    reduced = !!(motionQuery && motionQuery.matches);
    if (hero) { updatePauseLabel(); hero.setRunning(); }
  }
  if (motionQuery) {
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionChange);
    else if (motionQuery.addListener) motionQuery.addListener(onMotionChange);
  }

  /* ---------- Start ---------- */
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang'), true); });
  });
  var initial = 'de';
  try { var stored = localStorage.getItem('tenverde-lang'); if (stored === 'en' || stored === 'de') initial = stored; } catch (e) { /* Speicher gesperrt */ }
  try {
    var q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'de') initial = q;
  } catch (e) { /* alte Browser */ }
  applyLang(initial, false);
  if (hero) { updatePauseLabel(); hero.setRunning(); }
})();
