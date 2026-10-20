/* Lorbeerkuppel: hunderte tenverde Blätter auf einer Halbkugel.
   Jedes Blatt liegt tangential auf der Kugel, dreht sich um seine Mittelrippe
   und fängt Licht. In Ruhe atmet die Kuppel, nahe am Zeiger wenden sich die Blätter. */
(function () {
  'use strict';
  var canvas = document.getElementById('kuppel');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d', { alpha: true });
  var bühne = canvas.closest('.fassade') || canvas;
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  var LEAF = new Path2D('M32 58C14 46 12 22 32 6C52 22 50 46 32 58ZM30.4 52L32 14L33.6 52Z');
  var OUTER = new Path2D('M32 58C14 46 12 22 32 6C52 22 50 46 32 58Z');
  var HALF = new Path2D('M32 58C14 46 12 22 32 6Z');
  var LEVELS = 20;
  var sprites = [];
  var spriteSize = 96;

  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function mix(a, b, t) {
    var x = hex(a), y = hex(b);
    return 'rgb(' + Math.round(x[0] + (y[0] - x[0]) * t) + ',' + Math.round(x[1] + (y[1] - x[1]) * t) + ',' + Math.round(x[2] + (y[2] - x[2]) * t) + ')';
  }

  function buildSprites(size) {
    spriteSize = size;
    sprites = [];
    for (var k = 0; k < LEVELS; k++) {
      var b = k / (LEVELS - 1);
      var e = b * b * (3 - 2 * b);
      var c = document.createElement('canvas');
      c.width = c.height = size;
      var g = c.getContext('2d');
      g.scale(size / 64, size / 64);
      /* Lorbeergrün nur im Inneren: sichtbar durch die Mittelrippe */
      g.fillStyle = '#1F3A2B';
      g.fill(OUTER);
      /* Blattgold, erste Schicht: Körper von Bronze bis Hellgold */
      var lin = g.createLinearGradient(20, 56, 44, 8);
      lin.addColorStop(0, mix('#3A2606', '#B3801C', e));
      lin.addColorStop(0.42, mix('#7A5412', '#EBC14E', e));
      lin.addColorStop(0.78, mix('#A57A24', '#FCE8A4', e));
      lin.addColorStop(1, mix('#83601C', '#FFF8DC', e));
      g.fillStyle = lin;
      g.fill(LEAF, 'evenodd');
      /* zweite Schicht: eine Blatthälfte liegt im Schatten der Rippe */
      g.save();
      g.clip(HALF);
      g.fillStyle = 'rgba(28,17,3,' + (0.34 - 0.2 * b).toFixed(3) + ')';
      g.fillRect(0, 0, 64, 64);
      g.restore();
      /* dritte Schicht: Glanzband, wächst mit dem Licht */
      if (b > 0.3) {
        var a = Math.pow((b - 0.3) / 0.7, 2) * 0.85;
        g.save();
        g.clip(LEAF, 'evenodd');
        var h = g.createLinearGradient(12, 16, 52, 48);
        h.addColorStop(0, 'rgba(255,248,222,0)');
        h.addColorStop(0.38, 'rgba(255,248,222,0)');
        h.addColorStop(0.47, 'rgba(255,250,232,' + a.toFixed(3) + ')');
        h.addColorStop(0.53, 'rgba(255,255,246,' + a.toFixed(3) + ')');
        h.addColorStop(0.64, 'rgba(255,248,222,0)');
        h.addColorStop(1, 'rgba(255,248,222,0)');
        g.fillStyle = h;
        g.fillRect(0, 0, 64, 64);
        g.restore();
      }
      g.lineWidth = 0.9;
      g.strokeStyle = 'rgba(36,24,5,' + (0.6 - 0.3 * b).toFixed(3) + ')';
      g.stroke(OUTER);
      sprites.push(c);
    }
  }

  /* reproduzierbarer Zufall, damit die Kuppel bei jedem Laden gleich gebaut ist */
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  var W = 0, H = 0, dpr = 1, R = 0, cx = 0, cy = 0, cutY = 0, leafLen = 20;
  var leaves = [];
  var CUT = 0.2;

  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }

  function layout() {
    var rect = canvas.getBoundingClientRect();
    W = Math.max(1, rect.width); H = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    var base = Math.max(6, H * 0.035);
    R = Math.min(W / 2 - W * 0.025, (H - base - H * 0.03) / (1 + CUT));
    cx = W / 2;
    cutY = H - base;
    cy = cutY - CUT * R;

    var spacing = Math.max(13, R * 0.072);
    var N = Math.round(4 * Math.PI * R * R / (spacing * spacing));
    leafLen = spacing * 1.75;
    var rand = rng(1898);
    var golden = Math.PI * (3 - Math.sqrt(5));
    leaves = [];
    for (var i = 0; i < N; i++) {
      var y = 1 - 2 * (i + 0.5) / N;
      var r = Math.sqrt(1 - y * y);
      var th = i * golden;
      var n = [Math.cos(th) * r, y, Math.sin(th) * r];
      if (n[2] < -0.01) continue;
      var sy = cy - n[1] * R;
      if (sy - leafLen * 0.5 > cutY) continue;
      /* Spitze zeigt zum Scheitel, mit Streuung wie an einem Zweig */
      var up = [0, 1, 0];
      var t = [up[0] - n[0] * n[1], up[1] - n[1] * n[1], up[2] - n[2] * n[1]];
      if (Math.hypot(t[0], t[1], t[2]) < 0.05) t = [0, 0, -1];
      t = norm(t);
      var phi = (rand() - 0.5) * 1.9;
      var nt = cross(n, t);
      t = norm([t[0] * Math.cos(phi) + nt[0] * Math.sin(phi), t[1] * Math.cos(phi) + nt[1] * Math.sin(phi), t[2] * Math.cos(phi) + nt[2] * Math.sin(phi)]);
      /* leichtes Abheben der Spitze von der Kugel */
      var p = (rand() - 0.3) * 0.7;
      var n2 = norm([n[0] * Math.cos(p) + t[0] * Math.sin(p), n[1] * Math.cos(p) + t[1] * Math.sin(p), n[2] * Math.cos(p) + t[2] * Math.sin(p)]);
      var t2 = norm([t[0] * Math.cos(p) - n[0] * Math.sin(p), t[1] * Math.cos(p) - n[1] * Math.sin(p), t[2] * Math.cos(p) - n[2] * Math.sin(p)]);
      var b = cross(n2, t2);
      leaves.push({
        sx: cx + n[0] * R, sy: sy, z: n[2], nx: n[0], ny: n[1],
        n: n2, t: t2, b: b,
        a0: (rand() - 0.5) * 1.2,
        ph: rand() * 6.283,
        len: leafLen * (0.82 + rand() * 0.4),
        extra: 0
      });
    }
    leaves.sort(function (a, b) { return a.z - b.z; });
    var px = Math.ceil(leafLen * 1.3 * dpr * 64 / 52);
    px = Math.max(40, Math.min(180, px));
    if (Math.abs(px - spriteSize) > 4 || !sprites.length) buildSprites(px);
  }

  /* Licht */
  var L = norm([-0.5, 0.55, 0.68]);
  var Ltarget = L.slice();
  var V = [0, 0, 1];
  var pointer = { x: 0, y: 0, active: false, last: 0 };
  var startTime = performance.now();

  function draw(now, still) {
    var time = (now - startTime) / 1000;
    if (!still) {
      if (pointer.active) {
        var lx = (pointer.x - cx) / R, ly = -(pointer.y - cy) / R;
        Ltarget = norm([lx * 0.95, ly * 0.95, 0.72]);
      } else {
        var w = time * 0.16;
        Ltarget = norm([Math.cos(w) * 0.62, 0.42 + Math.sin(w * 1.3) * 0.22, 0.7]);
      }
      L = norm([L[0] + (Ltarget[0] - L[0]) * 0.07, L[1] + (Ltarget[1] - L[1]) * 0.07, L[2] + (Ltarget[2] - L[2]) * 0.07]);
    }
    var Hh = norm([L[0] + V[0], L[1] + V[1], L[2] + V[2]]);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* dunkles Gitter unter dem Laub */
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, cutY); ctx.clip();
    var rg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
    rg.addColorStop(0, '#2B2416');
    rg.addColorStop(1, '#0B0B0A');
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.97, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    /* Einlauf: ein Lichtband streicht einmal über die Kuppel */
    var sweepP = still ? 1 : Math.min(1, (now - startTime) / 2600);
    var sweepE = 1 - Math.pow(2, -10 * sweepP);
    var sweepX = cx - R * 1.5 + sweepE * R * 3;
    var sweepA = 0.75 * (1 - sweepP);
    var reach = R * 0.3;

    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, cutY); ctx.clip();
    var half = spriteSize / 2;
    for (var i = 0; i < leaves.length; i++) {
      var lf = leaves[i];
      var target = 0, local = 0;
      if (!still && pointer.active) {
        var dx = lf.sx - pointer.x, dy = lf.sy - pointer.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < reach) {
          var f = 1 - d / reach; f = f * f;
          target = f * 1.5 * (dx >= 0 ? 1 : -1);
          local = f;
        }
      }
      lf.extra += (target - lf.extra) * (still ? 1 : 0.11);
      var breath = still ? 0 : 0.3 * Math.sin(time * 0.75 + lf.nx * 2.4 + lf.ny * 1.9 + lf.ph * 0.25);
      var a = lf.a0 + breath + lf.extra;
      var ca = Math.cos(a), sa = Math.sin(a);
      var n = lf.n, b = lf.b, t = lf.t;
      var bx = b[0] * ca + n[0] * sa, by = b[1] * ca + n[1] * sa;
      var nn = [n[0] * ca - b[0] * sa, n[1] * ca - b[1] * sa, n[2] * ca - b[2] * sa];
      var back = nn[2] < 0;
      if (back) { nn[0] = -nn[0]; nn[1] = -nn[1]; nn[2] = -nn[2]; }
      var diff = Math.max(0, dot(nn, L));
      var spec = Math.pow(Math.max(0, dot(nn, Hh)), 26);
      var lum = 0.17 + 0.56 * diff + 0.9 * spec + local * 0.35;
      if (sweepA > 0.001) {
        var q = (lf.sx - sweepX) / (R * 0.28);
        lum += sweepA * Math.exp(-q * q);
      }
      /* Rand der Kugel und der Fuß liegen tiefer im Schatten */
      lum *= 0.62 + 0.38 * Math.max(0, lf.z);
      if (back) lum *= 0.82;
      var idx = Math.round(Math.max(0, Math.min(1, lum)) * (LEVELS - 1));
      var k = lf.len / (spriteSize * 52 / 64);
      ctx.setTransform(bx * k * dpr, -by * k * dpr, -t[0] * k * dpr, t[1] * k * dpr, lf.sx * dpr, lf.sy * dpr);
      ctx.drawImage(sprites[idx], -half, -half);
    }
    ctx.restore();

    /* Tambour: die Kuppel ruht auf einem schwarzen Sockel */
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#0B0B0A';
    ctx.fillRect(cx - R * 1.04, cutY, R * 2.08, H - cutY);
  }

  /* Takt passt sich dem Gerät an: braucht ein Bild zu lange, wird seltener gezeichnet.
     In Ruhe genügt halber Takt, die Kuppel atmet langsam. */
  var running = false, visible = true, raf = 0, frameNo = 0, cost = 8;
  function loop(now) {
    if (!running) return;
    frameNo++;
    var settled = !pointer.active && now - startTime > 2800;
    var step = cost > 22 ? 3 : (cost > 11 || settled) ? 2 : 1;
    if (frameNo % step === 0) {
      var t0 = performance.now();
      draw(now, false);
      cost = cost * 0.9 + (performance.now() - t0) * 0.1;
    }
    raf = requestAnimationFrame(loop);
  }
  function update() {
    var should = visible && !document.hidden && !motionQuery.matches;
    if (should && !running) { running = true; raf = requestAnimationFrame(loop); }
    else if (!should && running) { running = false; cancelAnimationFrame(raf); }
    if (motionQuery.matches) draw(performance.now(), true);
  }

  layout();
  draw(performance.now(), motionQuery.matches);
  update();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      update();
    }, { rootMargin: '40px' }).observe(canvas);
  }
  document.addEventListener('visibilitychange', update);
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', update);

  var resizeTimer = 0;
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { layout(); draw(performance.now(), motionQuery.matches || !running); }, 60);
    }).observe(canvas);
  }

  function setPointer(e) {
    var rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  }
  bühne.addEventListener('pointermove', setPointer, { passive: true });
  bühne.addEventListener('pointerdown', setPointer, { passive: true });
  bühne.addEventListener('pointerleave', function () { pointer.active = false; });
  canvas.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') setTimeout(function () { pointer.active = false; }, 900); });
})();
