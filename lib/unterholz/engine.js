/* tenverde Unterholz: Wurzelnetz per Space Colonization, aufsteigende Sporen,
   Lichtfeld um den Zeiger (auf Touch folgt es dem Scrollen). Liest die Seite über
   data-calm (ruhige Textflächen), data-anchor (Wuchsstellen), data-ring, data-strong,
   data-bloom, .w (Wörter, die auf Licht reagieren) und #rosette (Blattrosette).
   Übernommen aus Entwurf 08 Leuchtwald, verpackt für React: erzeugeUnterholz(canvas)
   liefert relayout() für Seitenwechsel und destroy() zum Aufräumen. */
export function erzeugeUnterholz(canvas) {
  'use strict';
  var Forest = { ready: false, relayout: function () {} };
  var cleanups = [];
  function on(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    cleanups.push(function () { target.removeEventListener(type, fn, opts); });
  }

  var ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarse = window.matchMedia('(hover: none), (pointer: coarse)');

  // Blattarten der Marke, ohne die 35-Grad-Drehung: Spitze zeigt nach oben, Ansatz unten bei y 58.
  var SPECIES = [
    [{ d: 'M32 58C14 46 12 22 32 6C52 22 50 46 32 58ZM30.4 52L32 14L33.6 52Z', f: 'evenodd' }],
    [{ d: 'M32 61V35', s: 3.6 }, { d: 'M31 39C20 41 9 34 7 20C21 18 30 26 31 39Z', f: 'nonzero' }, { d: 'M33 34C33 19 43 8 58 7C59 22 48 34 33 34Z', f: 'nonzero' }],
    [{ d: 'M32 59C13 47 11 22 32 5C53 22 51 47 32 59ZM30.3 14H33.7V24.3H42.5V27.7H33.7V51H30.3V27.7H21.5V24.3H30.3Z', f: 'evenodd' }],
    [{ d: 'M32 58C14 46 12 22 32 6Z', f: 'nonzero' }, { d: 'M34.5 10C50 24 48 45 34.5 55.5', s: 3.2 }],
    [{ d: 'M32 61V20', s: 3.6 }, { d: 'M32 45C15 41 13 18 32 6C51 18 49 41 32 45', s: 3.6 }]
  ];
  var HUES = [
    [134, 232, 223], // Sporen cyan
    [187, 168, 244], // Sporen lila
    [170, 226, 186], // Wurzel hellgrün
    [166, 200, 246]  // Eisblau
  ];
  var BLOOM = [243, 255, 247];

  if (!ctx || typeof Path2D === 'undefined') {
    return { relayout: function () {}, destroy: function () {} };
  }
  var SP = SPECIES.map(function (parts) {
    return parts.map(function (p) { return { path: new Path2D(p.d), f: p.f, s: p.s }; });
  });

  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function glowSprite(rgb, size) {
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gr.addColorStop(0, 'rgba(' + Math.min(255, rgb[0] + 60) + ',' + Math.min(255, rgb[1] + 40) + ',' + Math.min(255, rgb[2] + 30) + ',1)');
    gr.addColorStop(0.18, 'rgba(' + rgb.join(',') + ',0.55)');
    gr.addColorStop(0.5, 'rgba(' + rgb.join(',') + ',0.12)');
    gr.addColorStop(1, 'rgba(' + rgb.join(',') + ',0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, size, size);
    return c;
  }
  function softSprite(rgb, size) {
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gr.addColorStop(0, 'rgba(' + rgb.join(',') + ',0.5)');
    gr.addColorStop(0.35, 'rgba(' + rgb.join(',') + ',0.16)');
    gr.addColorStop(1, 'rgba(' + rgb.join(',') + ',0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, size, size);
    return c;
  }
  var SPR = HUES.map(function (h) { return glowSprite(h, 64); });
  var HALO = [softSprite([134, 232, 223], 256), softSprite([187, 168, 244], 256), softSprite([220, 255, 238], 256)];

  var W = 0, H = 0, VW = 0, VH = 0, DPR = 1;
  var net = null;        // Wurzelnetz
  var leaves = [];       // Blätter am Netz
  var anchors = [];      // Wuchsstellen der Abschnitte
  var calm = [];         // ruhige Flächen unter Text
  var words = [];        // Wörter, die auf Licht reagieren
  var rosette = null;
  var spores = [];
  var running = false, rafId = 0;
  var t0 = performance.now();
  var lastScroll = window.scrollY;

  var light = { x: 0, y: 0, tx: 0, ty: 0, active: false, strength: 0 };
  var pointerSeen = false;
  var lastPointer = 0;

  function docRect(el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
  }

  function measure() {
    VW = window.innerWidth;
    VH = window.innerHeight;
    W = document.documentElement.clientWidth;
    H = Math.max(document.documentElement.scrollHeight, VH);
    DPR = Math.min(window.devicePixelRatio || 1, VW < 700 ? 1.5 : 1.75);
    canvas.width = Math.round(VW * DPR);
    canvas.height = Math.round(VH * DPR);

    calm = Array.prototype.map.call(document.querySelectorAll('[data-calm]'), function (el) {
      var r = docRect(el);
      var p = 28;
      return { x: r.x - p, y: r.y - p, w: r.w + 2 * p, h: r.h + 2 * p };
    });

    anchors = Array.prototype.map.call(document.querySelectorAll('[data-anchor]'), function (el) {
      var r = docRect(el);
      var bloomEl = el.closest('[data-bloom]');
      return {
        el: el,
        bloomEl: bloomEl,
        x: r.x + r.w / 2,
        y: r.y + r.h / 2,
        rw: r.w, rh: r.h,
        ring: el.hasAttribute('data-ring'),
        strong: el.hasAttribute('data-strong'),
        node: -1, mask: null, depth: 0,
        pulse: -1e9, hover: 0, hoverT: 0, seen: false, visible: false
      };
    });

    var ro = document.getElementById('rosette');
    rosette = null;
    if (ro) {
      var rr = docRect(ro);
      rosette = { x: rr.x + rr.w / 2, y: rr.y + rr.h / 2, r: rr.w / 2 };
      // Unterseiten: eigene Blüte aus einer Blattart (data-art 0 bis 4) mit eigener Farbfolge (data-farben, z. B. "1,3,0")
      if (ro.dataset.art != null) rosette.art = Number(ro.dataset.art);
      if (ro.dataset.farben) rosette.farben = ro.dataset.farben.split(',').map(Number);
      if (ro.dataset.blaetter) rosette.n = Number(ro.dataset.blaetter);
    }

    words = Array.prototype.map.call(document.querySelectorAll('.w'), function (el) {
      var r = docRect(el);
      return { el: el, x: r.x + r.w / 2, y: r.y + r.h / 2, lit: 0 };
    });
  }

  function inCalm(x, y) {
    for (var i = 0; i < calm.length; i++) {
      var c = calm[i];
      if (x > c.x && x < c.x + c.w && y > c.y && y < c.y + c.h) return true;
    }
    return false;
  }

  /* Space Colonization: Anziehungspunkte verteilen, Knoten wachsen in Richtung
     der Punkte, die ihnen am nächsten liegen. Jeder Punkt merkt sich seinen
     nächsten Knoten, so prüft jede Runde nur die neu gewachsenen Knoten. */
  function grow() {
    var R = rng(20261020 + (W | 0));
    var small = W < 700;
    var step = small ? 9 : 11;
    var infl = small ? 150 : 210;
    var kill = step * 1.7;
    var density = small ? 1 / 5200 : 1 / 7600;

    var ax = [], ay = [], aw = [];
    var count = Math.round(W * H * density);
    for (var i = 0; i < count; i++) {
      var x = R() * W, y = R() * H;
      if (inCalm(x, y) && R() > 0.14) continue;
      ax.push(x); ay.push(y); aw.push(1);
    }
    anchors.forEach(function (a) {
      var n = a.ring ? (a.strong ? 70 : 34) : 14;
      for (var k = 0; k < n; k++) {
        var ang = R() * Math.PI * 2;
        var px, py;
        if (a.ring) {
          var ex = a.rw / 2 + 30 + R() * (a.strong ? 120 : 60);
          var ey = a.rh / 2 + 30 + R() * (a.strong ? 120 : 60);
          px = a.x + Math.cos(ang) * ex; py = a.y + Math.sin(ang) * ey;
        } else {
          var rad = 26 + R() * 90;
          px = a.x + Math.cos(ang) * rad; py = a.y + Math.sin(ang) * rad;
        }
        if (px < 4 || px > W - 4) continue;
        ax.push(px); ay.push(py); aw.push(1);
      }
    });
    var A = ax.length;
    var alive = new Uint8Array(A).fill(1);
    var nearest = new Int32Array(A).fill(-1);
    var nearD = new Float32Array(A).fill(1e9);

    var cs = infl;
    var gcols = Math.ceil(W / cs) + 1;
    var grid = new Map();
    for (i = 0; i < A; i++) {
      var key = Math.floor(ay[i] / cs) * gcols + Math.floor(ax[i] / cs);
      var arr = grid.get(key);
      if (!arr) grid.set(key, arr = []);
      arr.push(i);
    }

    var nx = [], ny = [], par = [], dep = [], kids = [];
    function addNode(x, y, p) {
      var id = nx.length;
      nx.push(x); ny.push(y); par.push(p);
      dep.push(p < 0 ? 0 : dep[p] + Math.hypot(x - nx[p], y - ny[p]));
      kids.push(0);
      if (p >= 0) kids[p]++;
      return id;
    }
    function touch(id) {
      var gx = Math.floor(nx[id] / cs), gy = Math.floor(ny[id] / cs);
      for (var oy = -1; oy <= 1; oy++) for (var ox = -1; ox <= 1; ox++) {
        var list = grid.get((gy + oy) * gcols + (gx + ox));
        if (!list) continue;
        for (var j = 0; j < list.length; j++) {
          var a = list[j];
          if (!alive[a]) continue;
          var d = Math.hypot(ax[a] - nx[id], ay[a] - ny[id]);
          if (d < kill) { alive[a] = 0; continue; }
          if (d < infl && d < nearD[a]) { nearD[a] = d; nearest[a] = id; }
        }
      }
    }

    var seeds = [];
    if (rosette) seeds.push([rosette.x, rosette.y]);
    seeds.push([W * 0.08, 0], [W * 0.5, 0], [W * 0.94, 0]);
    seeds.forEach(function (s) { touch(addNode(s[0], s[1], -1)); });

    var maxNodes = small ? 4200 : 7000;
    var dirx = [], diry = [], dcnt = [];
    var stalls = 0;
    for (var it = 0; it < 4000 && nx.length < maxNodes; it++) {
      var N = nx.length;
      for (i = dirx.length; i < N; i++) { dirx.push(0); diry.push(0); dcnt.push(0); }
      var any = false;
      for (var a = 0; a < A; a++) {
        if (!alive[a] || nearest[a] < 0) continue;
        var n = nearest[a];
        var dx = ax[a] - nx[n], dy = ay[a] - ny[n];
        var l = Math.hypot(dx, dy) || 1;
        dirx[n] += dx / l; diry[n] += dy / l; dcnt[n]++;
        any = true;
      }
      if (!any) {
        // Lücke überbrücken: den obersten noch freien Punkt mit dem nächsten Knoten verbinden
        var best = -1;
        for (a = 0; a < A; a++) if (alive[a] && (best < 0 || ay[a] < ay[best])) best = a;
        if (best < 0 || ++stalls > 80) break;
        var bn = 0, bd = 1e12;
        for (i = 0; i < N; i++) {
          var dd = (nx[i] - ax[best]) * (nx[i] - ax[best]) + (ny[i] - ay[best]) * (ny[i] - ay[best]);
          if (dd < bd) { bd = dd; bn = i; }
        }
        var cur = bn, guard = 0;
        while (Math.hypot(ax[best] - nx[cur], ay[best] - ny[cur]) > infl * 0.8 && guard++ < 400) {
          var ddx = ax[best] - nx[cur], ddy = ay[best] - ny[cur];
          var dl = Math.hypot(ddx, ddy);
          var wob = (R() - 0.5) * 0.5;
          var ux = ddx / dl + wob * (ddy / dl), uy = ddy / dl - wob * (ddx / dl);
          var ul = Math.hypot(ux, uy);
          cur = addNode(nx[cur] + ux / ul * step, ny[cur] + uy / ul * step, cur);
          touch(cur);
        }
        continue;
      }
      var added = [];
      for (n = 0; n < N; n++) {
        if (!dcnt[n]) continue;
        var vx = dirx[n] / dcnt[n], vy = diry[n] / dcnt[n];
        dirx[n] = diry[n] = dcnt[n] = 0;
        if (kids[n] >= 3) continue;
        vx += (R() - 0.5) * 0.45; vy += (R() - 0.5) * 0.45 + 0.06;
        var vl = Math.hypot(vx, vy) || 1;
        var px2 = nx[n] + vx / vl * step, py2 = ny[n] + vy / vl * step;
        if (px2 < 0 || px2 > W) continue;
        added.push(addNode(px2, py2, n));
      }
      for (i = 0; i < added.length; i++) touch(added[i]);
      if (!added.length && ++stalls > 80) break;
    }

    var M = nx.length;
    var desc = new Float32Array(M);
    for (i = M - 1; i > 0; i--) if (par[i] >= 0) desc[par[i]] += desc[i] + 1;

    var X = Float32Array.from(nx), Y = Float32Array.from(ny), P = Int32Array.from(par), D = Float32Array.from(dep);
    var Wd = new Float32Array(M), C = new Float32Array(M);
    var bucket = 256, buckets = [];
    for (i = 0; i < M; i++) {
      Wd[i] = Math.min(4.2, 0.55 + 0.26 * Math.pow(desc[i], 0.45));
      if (P[i] < 0) continue;
      var mx = (X[i] + X[P[i]]) / 2, my = (Y[i] + Y[P[i]]) / 2;
      C[i] = inCalm(mx, my) ? 0.04 : 1;
      var b = Math.floor(Math.min(Y[i], Y[P[i]]) / bucket);
      (buckets[b] || (buckets[b] = [])).push(i);
    }

    // Blätter an Spitzen und vereinzelt entlang des Netzes
    leaves = [];
    var maxLeaves = small ? 240 : 520;
    for (i = 1; i < M && leaves.length < maxLeaves; i++) {
      if (P[i] < 0) continue;
      var tip = kids[i] === 0;
      if (!(tip ? R() < 0.62 : R() < 0.018)) continue;
      var lx = X[i], ly = Y[i];
      var cf = inCalm(lx, ly);
      if (cf && R() < 0.97) continue;
      var ang2 = Math.atan2(Y[i] - Y[P[i]], X[i] - X[P[i]]) + (R() - 0.5) * 1.3;
      leaves.push({
        x: lx, y: ly, a: ang2,
        s: (tip ? 9 : 6) + R() * (tip ? 16 : 9),
        v: Math.floor(R() * 5),
        h: Math.floor(R() * 4),
        c: cf ? 0.1 : 1,
        ph: R() * 6.28
      });
    }
    var lb = [];
    leaves.forEach(function (lf, k) { var b = Math.floor(lf.y / bucket); (lb[b] || (lb[b] = [])).push(k); });

    net = { X: X, Y: Y, P: P, D: D, Wd: Wd, C: C, M: M, buckets: buckets, lb: lb, bucket: bucket };

    // Pfade von jeder Wuchsstelle zurück zur Wurzel
    anchors.forEach(function (an) {
      var bi = -1, bd2 = 1e12;
      for (var k = 0; k < M; k++) {
        var q = (X[k] - an.x) * (X[k] - an.x) + (Y[k] - an.y) * (Y[k] - an.y);
        if (q < bd2) { bd2 = q; bi = k; }
      }
      an.node = bi;
      an.mask = new Uint8Array(M);
      an.depth = D[bi];
      var c2 = bi, g2 = 0;
      while (c2 >= 0 && g2++ < 5000) { an.mask[c2] = 1; c2 = P[c2]; }
    });
  }

  function makeSpores() {
    var R = rng(77);
    var n = Math.round(Math.max(55, Math.min(240, VW * VH / 7200)));
    spores = [];
    for (var i = 0; i < n; i++) {
      var z = 0.3 + R() * 0.7;
      spores.push({
        x: R() * VW, y: R() * VH, z: z,
        vy: -(6 + R() * 22) * z,
        sw: 6 + R() * 18, ph: R() * 6.28, fr: 0.2 + R() * 0.6,
        r: (0.9 + R() * 2.6) * z,
        h: R() < 0.45 ? 0 : (R() < 0.6 ? 1 : (R() < 0.5 ? 2 : 3)),
        a: 0.35 + R() * 0.6
      });
    }
  }

  /* ---------- Zeichnen ---------- */

  var LEVELS = 12;
  var WCLS = [0.9, 1.7, 2.8, 4.2];
  var paths = [];
  function color(level) {
    var k = level / (LEVELS - 1);
    // Wurzel dunkel, dann hellgrün, ganz oben Weißblüte
    var a = [52, 84, 66], b = [158, 214, 176], c = BLOOM;
    var r, g, bl;
    if (k < 0.6) { var u = k / 0.6; r = a[0] + (b[0] - a[0]) * u; g = a[1] + (b[1] - a[1]) * u; bl = a[2] + (b[2] - a[2]) * u; }
    else { var v = (k - 0.6) / 0.4; r = b[0] + (c[0] - b[0]) * v; g = b[1] + (c[1] - b[1]) * v; bl = b[2] + (c[2] - b[2]) * v; }
    return 'rgba(' + (r | 0) + ',' + (g | 0) + ',' + (bl | 0) + ',' + (0.38 + 0.62 * k).toFixed(3) + ')';
  }
  var COLORS = [];
  for (var li = 0; li < LEVELS; li++) COLORS.push(color(li));

  function anchorBoost(an, x, y, i, t) {
    var v = 0;
    var dt = t - an.pulse;
    if (an.mask && dt > 0 && dt < 3.2) {
      if (an.mask[i]) {
        var front = an.depth - 1300 + dt * 1100;
        var d = Math.abs(net.D[i] - front);
        if (d < 160) v += (1 - d / 160) * 1.1;
      }
      var arrive = dt - 1.18;
      if (arrive > 0) {
        var rad = Math.max(an.rw, an.rh) * 0.6 + 120;
        var dist = Math.hypot(x - an.x, y - an.y);
        if (dist < rad) v += (1 - dist / rad) * Math.exp(-arrive * 1.4) * 1.1;
      }
    }
    if (an.hover > 0.01 || an.strong && an.visible) {
      var rad2 = Math.max(an.rw, an.rh) * 0.55 + (an.strong ? 220 : 170);
      var dist2 = Math.hypot(x - an.x, y - an.y);
      if (dist2 < rad2) v += (1 - dist2 / rad2) * (an.hover * 0.9 + (an.strong && an.visible ? 0.45 : 0));
    }
    return v;
  }

  function draw(now) {
    var t = (now - t0) / 1000;
    var still = reduce.matches;
    var sy = window.scrollY;
    var dScroll = sy - lastScroll;
    lastScroll = sy;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, VW, VH);

    // Lichtpunkt
    if (!still) updateLight(t, sy);
    var lx = light.x, ly = light.y + sy, LR = VW < 700 ? 170 : 230;
    var ls = still ? 0 : light.strength;

    // Bodennebel
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.5;
    ctx.drawImage(HALO[0], -VW * 0.3, VH * 0.55, VW * 1.6, VH * 0.9);
    ctx.globalAlpha = 0.28;
    ctx.drawImage(HALO[1], VW * 0.1, -VH * 0.4, VW * 1.2, VH * 0.9);

    // Lichtfeld um den Zeiger
    if (ls > 0.01) {
      var hs = LR * 3.2;
      ctx.globalAlpha = 0.34 * ls;
      ctx.drawImage(HALO[0], light.x - hs / 2 - 18, light.y - hs / 2 + 10, hs, hs);
      ctx.globalAlpha = 0.24 * ls;
      ctx.drawImage(HALO[1], light.x - hs / 2 + 26, light.y - hs / 2 - 14, hs, hs);
      ctx.globalAlpha = 0.22 * ls;
      ctx.drawImage(HALO[2], light.x - hs / 4, light.y - hs / 4, hs / 2, hs / 2);
    }
    ctx.globalAlpha = 1;

    ctx.translate(0, -sy);
    var top = sy - 60, bot = sy + VH + 60;

    if (net) {
      var X = net.X, Y = net.Y, P = net.P, D = net.D, Wd = net.Wd, C = net.C;
      for (var p = 0; p < LEVELS * WCLS.length; p++) paths[p] = null;
      var b0 = Math.max(0, Math.floor((top - 300) / net.bucket)), b1 = Math.floor(bot / net.bucket);
      var activeAnchors = anchors.filter(function (an) {
        return (t - an.pulse < 3.2) || an.hover > 0.01 || (an.strong && an.visible);
      });
      for (var b = b0; b <= b1; b++) {
        var list = net.buckets[b];
        if (!list) continue;
        for (var k = 0; k < list.length; k++) {
          var i = list[k], pi = P[i];
          var mx = (X[i] + X[pi]) * 0.5, my = (Y[i] + Y[pi]) * 0.5;
          if (my < top - 20 || my > bot + 20) continue;
          var v = 0.1 + (still ? 0.12 : 0.1 * (0.5 + 0.5 * Math.sin(D[i] / 95 - t * 1.3)));
          if (ls > 0.01) {
            var dd = Math.hypot(mx - lx, my - ly);
            if (dd < LR) { var q2 = 1 - dd / LR; v += q2 * q2 * 1.05 * ls; }
          }
          for (var aa = 0; aa < activeAnchors.length; aa++) v += anchorBoost(activeAnchors[aa], mx, my, i, t);
          v *= C[i];
          var lev = Math.min(LEVELS - 1, Math.max(0, Math.round(v * (LEVELS - 1))));
          var w = Wd[i], wc = w < 1.2 ? 0 : w < 2.2 ? 1 : w < 3.4 ? 2 : 3;
          var idx = lev * 4 + wc;
          var path = paths[idx] || (paths[idx] = new Path2D());
          path.moveTo(X[pi], Y[pi]);
          path.lineTo(X[i], Y[i]);
        }
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'round';
      for (var lv = 0; lv < LEVELS; lv++) {
        for (var wc2 = 0; wc2 < 4; wc2++) {
          var pth = paths[lv * 4 + wc2];
          if (!pth) continue;
          ctx.strokeStyle = COLORS[lv];
          ctx.lineWidth = WCLS[wc2];
          ctx.stroke(pth);
        }
      }
      // Glühen der hellen Adern
      ctx.globalCompositeOperation = 'lighter';
      for (lv = 4; lv < LEVELS; lv++) {
        for (wc2 = 0; wc2 < 4; wc2++) {
          pth = paths[lv * 4 + wc2];
          if (!pth) continue;
          ctx.strokeStyle = lv > 8 ? 'rgba(200,255,236,' + (0.03 * (lv - 3)).toFixed(3) + ')' : 'rgba(134,232,223,' + (0.022 * (lv - 3)).toFixed(3) + ')';
          ctx.lineWidth = WCLS[wc2] + 2.5 + lv * 0.3;
          ctx.stroke(pth);
        }
      }

      // Blätter
      for (b = b0; b <= b1; b++) {
        var ll = net.lb[b];
        if (!ll) continue;
        for (k = 0; k < ll.length; k++) {
          var lf = leaves[ll[k]];
          if (lf.y < top || lf.y > bot) continue;
          var e = 0.12 + (still ? 0.1 : 0.06 * Math.sin(t * 0.9 + lf.ph));
          if (ls > 0.01) {
            var dl = Math.hypot(lf.x - lx, lf.y - ly);
            if (dl < LR * 1.15) { var q3 = 1 - dl / (LR * 1.15); e += q3 * q3 * 1.25 * ls; }
          }
          for (aa = 0; aa < activeAnchors.length; aa++) e += anchorBoost(activeAnchors[aa], lf.x, lf.y, -1, t) * 0.9;
          e = Math.min(1.25, e * lf.c);
          drawLeaf(lf.x, lf.y, lf.a + (still ? 0 : Math.sin(t * 0.7 + lf.ph) * 0.06), lf.s * (1 + e * 0.18), lf.v, HUES[lf.h], e);
        }
      }
    }

    // Rosette der Marke im ersten Bild
    if (rosette && rosette.y + rosette.r > top && rosette.y - rosette.r < bot) drawRosette(t, still, lx, ly, ls);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // Sporen steigen wie umgekehrter Regen
    ctx.globalCompositeOperation = 'lighter';
    var dt = Math.min(0.05, (now - (draw.last || now)) / 1000);
    draw.last = now;
    for (var s = 0; s < spores.length; s++) {
      var sp = spores[s];
      if (!still) {
        sp.y += sp.vy * dt - dScroll * sp.z * 0.55;
        if (sp.y < -12) { sp.y = VH + 12; sp.x = Math.random() * VW; }
        else if (sp.y > VH + 12) { sp.y = -12; sp.x = Math.random() * VW; }
      }
      var x = sp.x + (still ? 0 : Math.sin(t * sp.fr + sp.ph) * sp.sw);
      var al = sp.a * (0.65 + 0.35 * Math.sin(t * 1.7 + sp.ph * 3));
      if (ls > 0.01) {
        var ds = Math.hypot(x - light.x, sp.y - light.y);
        if (ds < LR * 1.3) al += (1 - ds / (LR * 1.3)) * 0.8 * ls;
      }
      if (inCalm(x, sp.y + sy)) al *= 0.15;
      var sz = sp.r * 7;
      ctx.globalAlpha = Math.min(1, al);
      ctx.drawImage(SPR[sp.h], x - sz / 2, sp.y - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    // Wörter erhellen sich in der Nähe des Lichts
    if (!still) {
      var WR = VW < 700 ? 200 : 300;
      for (var wi = 0; wi < words.length; wi++) {
        var wd = words[wi];
        var lit = 0;
        if (ls > 0.01) {
          var dw = Math.hypot(wd.x - lx, (wd.y - ly) * 1.4);
          if (dw < WR) lit = Math.pow(1 - dw / WR, 1.4) * ls;
        }
        if (Math.abs(lit - wd.lit) > 0.015) {
          wd.lit = lit;
          wd.el.style.setProperty('--lit', lit.toFixed(3));
        }
      }
    }
  }

  function drawLeaf(x, y, ang, size, v, rgb, e) {
    var sc = size / 52;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang + Math.PI / 2);
    ctx.scale(sc, sc);
    ctx.translate(-32, -58);
    var mix = Math.max(0, Math.min(1, (e - 0.45) / 0.7));
    var r = rgb[0] + (BLOOM[0] - rgb[0]) * mix, g = rgb[1] + (BLOOM[1] - rgb[1]) * mix, bl = rgb[2] + (BLOOM[2] - rgb[2]) * mix;
    var col = 'rgba(' + (r | 0) + ',' + (g | 0) + ',' + (bl | 0) + ',';
    var parts = SP[v];
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < parts.length; i++) {
      var pt = parts[i];
      if (pt.s) {
        ctx.strokeStyle = col + Math.min(1, 0.2 + e * 0.75).toFixed(3) + ')';
        ctx.lineWidth = pt.s;
        ctx.lineCap = 'round';
        ctx.stroke(pt.path);
      } else {
        ctx.fillStyle = col + Math.min(0.95, 0.1 + e * 0.7).toFixed(3) + ')';
        ctx.fill(pt.path, pt.f);
      }
    }
    ctx.restore();
    if (e > 0.35) {
      var gs = size * (1.6 + e);
      ctx.globalAlpha = Math.min(0.7, (e - 0.35) * 0.8);
      ctx.drawImage(SPR[rgb === HUES[1] ? 1 : 0], x - gs / 2, y - gs / 2, gs, gs);
      ctx.globalAlpha = 1;
    }
  }

  function drawRosette(t, still, lx, ly, ls) {
    var N = rosette.n || 23, cx = rosette.x, cy = rosette.y, R = rosette.r * 0.92;
    var farben = rosette.farben || [1, 0, 2];
    var spin = still ? 0 : t * 0.012;
    ctx.globalCompositeOperation = 'lighter';
    // Kernlicht
    var core = R * 1.5;
    ctx.globalAlpha = 0.22;
    ctx.drawImage(HALO[0], cx - core / 2, cy - core / 2, core, core);
    ctx.globalAlpha = 0.4;
    ctx.drawImage(HALO[1], cx - core * 0.75 + R * 0.2, cy - core * 0.75, core * 1.5, core * 1.5);
    ctx.globalAlpha = 1;
    for (var i = N - 1; i >= 0; i--) {
      var k = i / (N - 1);
      var ang = i * 2.39996 + spin;
      var breathe = still ? 1 : 1 + 0.03 * Math.sin(t * 0.8 + i * 0.37);
      var len = R * (0.26 + 0.74 * Math.sqrt(k)) * breathe;
      var tipx = cx + Math.cos(ang) * len * 0.9, tipy = cy + Math.sin(ang) * len * 0.9;
      var e = 0.2 + (1 - k) * 0.22;
      if (ls > 0.01) {
        var d = Math.hypot(tipx - lx, tipy - ly);
        var rr = R * 0.7;
        if (d < rr) { var q = 1 - d / rr; e += q * q * 1.1 * ls; len *= 1 + q * 0.07 * ls; }
      }
      var rgb = k > 0.66 ? HUES[farben[0]] : k > 0.33 ? HUES[farben[1]] : HUES[farben[2]];
      var v = rosette.art != null ? rosette.art : i % 7 === 3 ? 4 : i % 5 === 2 ? 3 : 0;
      var sc = len / 52;
      var mix = Math.max(0, Math.min(0.85, (e - 0.55) / 0.8));
      var r = rgb[0] + (BLOOM[0] - rgb[0]) * mix, g = rgb[1] + (BLOOM[1] - rgb[1]) * mix, bl = rgb[2] + (BLOOM[2] - rgb[2]) * mix;
      var col = 'rgba(' + (r | 0) + ',' + (g | 0) + ',' + (bl | 0) + ',';
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang + Math.PI / 2);
      ctx.scale(sc, sc);
      ctx.translate(-32, -58);
      var parts = SP[v];
      for (var j = 0; j < parts.length; j++) {
        var pt = parts[j];
        if (pt.s) {
          ctx.strokeStyle = col + Math.min(1, 0.3 + e * 0.6).toFixed(3) + ')';
          ctx.lineWidth = Math.max(pt.s * 0.3, 1.6 / sc);
          ctx.lineCap = 'round';
          ctx.stroke(pt.path);
        } else {
          ctx.fillStyle = col + Math.min(0.5, 0.045 + e * 0.13).toFixed(3) + ')';
          ctx.fill(pt.path, pt.f);
          ctx.strokeStyle = col + Math.min(1, 0.18 + e * 0.5).toFixed(3) + ')';
          ctx.lineWidth = 1.1 / sc;
          ctx.stroke(pt.path);
        }
      }
      ctx.restore();
    }
  }

  /* ---------- Licht ---------- */
  function updateLight(t, sy) {
    var idleX, idleY;
    var touchMode = coarse.matches;
    if (touchMode || !pointerSeen) {
      // Einführung: das Licht wandert über die Überschrift zur Rosette, dann folgt es dem Scrollen
      var intro = Math.min(1, t / 3.2);
      var h1 = words.length ? words : null;
      if (intro < 1 && h1 && sy < VH * 0.5) {
        var e = 1 - Math.pow(1 - intro, 3);
        var first = h1[0], last = h1[Math.min(h1.length - 1, 5)];
        var sx0 = first.x - 80, sy0 = first.y - sy;
        var tx = rosette ? rosette.x : last.x, ty = (rosette ? rosette.y : last.y) - sy;
        idleX = sx0 + (tx - sx0) * e;
        idleY = sy0 + (ty - sy0) * e + Math.sin(e * Math.PI) * -40;
      } else {
        idleX = VW * (0.5 + 0.34 * Math.sin(sy / 520 + t * 0.12));
        idleY = VH * (0.42 + 0.08 * Math.sin(t * 0.25));
        if (sy < VH * 0.4 && rosette && !touchMode) {
          idleX = rosette.x + Math.cos(t * 0.3) * rosette.r * 0.35;
          idleY = rosette.y - sy + Math.sin(t * 0.4) * rosette.r * 0.3;
        }
      }
      light.tx = idleX; light.ty = idleY;
      light.strength += (0.85 - light.strength) * 0.04;
    } else {
      var since = performance.now() - lastPointer;
      light.strength += ((since > 6000 ? 0.55 : 1) - light.strength) * 0.06;
    }
    var k = pointerSeen && !coarse.matches ? 0.22 : 0.06;
    light.x += (light.tx - light.x) * k;
    light.y += (light.ty - light.y) * k;
  }

  on(window, 'pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    if (!pointerSeen) { light.x = e.clientX; light.y = e.clientY; }
    pointerSeen = true;
    lastPointer = performance.now();
    light.tx = e.clientX; light.ty = e.clientY;
  }, { passive: true });
  on(document, 'pointerleave', function () { pointerSeen = false; });

  /* Wuchsstellen: Puls beim Hinscrollen, Blüte bei Hover und Fokus */
  function wireAnchors() {
    anchors.forEach(function (an) {
      var host = an.bloomEl || an.el;
      if (host.__wired) return;
      host.__wired = true;
      function on() { setHover(host, 1); }
      function off() { setHover(host, 0); }
      host.addEventListener('mouseenter', on);
      host.addEventListener('mouseleave', off);
      host.addEventListener('focusin', on);
      host.addEventListener('focusout', off);
    });
  }
  function setHover(host, val) {
    anchors.forEach(function (an) {
      if ((an.bloomEl || an.el) === host) { an.hoverTarget = val; if (val) an.pulse = Math.max(an.pulse, (performance.now() - t0) / 1000 - 1.2); }
    });
    if (host.classList.contains('growth')) host.classList.toggle('is-lit', !!val);
  }

  var io = null;
  function observeAnchors() {
    if (!('IntersectionObserver' in window)) return;
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var an = anchors.filter(function (a) { return a.el === en.target; })[0];
        if (!an) return;
        an.visible = en.isIntersecting;
        var now = (performance.now() - t0) / 1000;
        if (en.isIntersecting && now - an.pulse > 4) an.pulse = now;
      });
    }, { threshold: 0.3 });
    anchors.forEach(function (an) { io.observe(an.el); });
  }

  function tickHover() {
    for (var i = 0; i < anchors.length; i++) {
      var an = anchors[i];
      var target = an.hoverTarget || 0;
      an.hover += (target - an.hover) * 0.12;
    }
  }

  // Sparstufe: Dauern Bilder auf einem Gerät länger als 24 ms, wird nur jedes zweite gezeichnet,
  // damit Scrollen und Eingaben flüssig bleiben.
  var avgDt = 16, lastFrame = 0, sparen = false, ungerade = false;
  function frame(now) {
    rafId = 0;
    if (!running) return;
    if (lastFrame) {
      avgDt += (Math.min(100, now - lastFrame) - avgDt) * 0.05;
      if (!sparen && avgDt > 24) sparen = true;
      else if (sparen && avgDt < 13) sparen = false;
    }
    lastFrame = now;
    ungerade = !ungerade;
    if (!sparen || ungerade) {
      tickHover();
      draw(now);
    }
    rafId = requestAnimationFrame(frame);
  }
  function start() {
    if (reduce.matches) { running = false; renderStill(); return; }
    if (running) return;
    running = true;
    lastFrame = 0;
    draw.last = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }
  var stillQueued = false;
  function renderStill() {
    if (stillQueued) return;
    stillQueued = true;
    requestAnimationFrame(function (n) { stillQueued = false; draw(n); });
  }

  function build() {
    measure();
    grow();
    makeSpores();
    wireAnchors();
    observeAnchors();
    light.x = light.tx = VW * 0.3; light.y = light.ty = VH * 0.5;
    Forest.ready = true;
  }

  Forest.relayout = function () {
    var keepPulse = anchors.map(function (a) { return a.pulse; });
    measure();
    grow();
    wireAnchors();
    observeAnchors();
    anchors.forEach(function (a, i) { if (keepPulse[i] != null) a.pulse = keepPulse[i]; });
    if (!running) renderStill();
  };

  var resizeTimer = 0, lastW = 0, lastH = 0;
  on(window, 'resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var w = document.documentElement.clientWidth;
      var h = document.documentElement.scrollHeight;
      if (w !== lastW || Math.abs(h - lastH) > 120) {
        lastW = w; lastH = h;
        Forest.relayout();
        makeSpores();
      } else {
        VW = window.innerWidth; VH = window.innerHeight;
        canvas.width = Math.round(VW * DPR); canvas.height = Math.round(VH * DPR);
      }
      if (!running) renderStill();
    }, 180);
  });
  on(window, 'scroll', function () { if (!running) renderStill(); }, { passive: true });
  on(document, 'visibilitychange', function () { if (document.hidden) stop(); else start(); });
  var onReduce = function () { if (reduce.matches) { stop(); renderStill(); } else start(); };
  if (reduce.addEventListener) reduce.addEventListener('change', onReduce);

  function boot() {
    build();
    lastW = document.documentElement.clientWidth;
    lastH = document.documentElement.scrollHeight;
    start();
  }
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  var booted = false;
  function once() { if (!booted) { booted = true; boot(); } }
  fontsReady.then(once, once);
  var onceTimer = setTimeout(once, 1500);
  on(window, 'load', function () { if (booted) Forest.relayout(); });
  Forest.destroy = function () {
    stop();
    clearTimeout(onceTimer);
    clearTimeout(resizeTimer);
    booted = true;
    if (io) io.disconnect();
    if (reduce.removeEventListener) reduce.removeEventListener('change', onReduce);
    cleanups.forEach(function (fn) { fn(); });
    cleanups = [];
  };
  return Forest;
}
