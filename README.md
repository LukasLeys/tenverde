# tenverde.at

Website der tenverde GmbH (Lukas Leys, Innsbruck). Next.js 15 mit App Router, statisch vorgerendert, Deutsch und Englisch.

## Starten

```bash
npm install
npm run dev          # http://localhost:3200
npm run check        # Typprüfung, Lint, Production-Build
npm run build && npm start
node tools/pruefe-seiten.mjs http://localhost:3200 --shots <ordner>   # alle Seiten, beide Sprachen, Desktop und Handy
```

`tools/pruefe-seiten.mjs` braucht Chromium. Ein anderer Pfad lässt sich mit `CHROMIUM_PFAD` setzen.

## Aufbau

- `app/[lang]/…`: alle Seiten. Deutsch liegt ohne Präfix an der Wurzel (`/strategie`), Englisch unter `/en` mit englischen Adressen (`/en/strategy`). `middleware.ts` übersetzt die öffentlichen Adressen auf die internen Ordner und leitet `/de/…` sowie deutsche Slugs unter `/en` um.
- `lib/routen.ts`: Seiten und ihre Adressen je Sprache.
- `lib/inhalt.ts`: alle sichtbaren Texte, Projekte, Kriterien, Lebenslauf und E-Mail-Vorlagen. Texte ändern heißt diese Datei ändern.
- `lib/unterholz/engine.js`: die Canvas-Szene (Wurzelnetz, Sporen, Lichtfeld, Blattrosette). Sie liest die Seite über `data-calm`, `data-anchor`, `data-ring`, `data-strong`, `data-bloom`, `.w` und `#rosette`.
- `components/`: Kopf, Fuß, Bausteine, Blatt-Sprite, Leuchtwörter, Kopierknopf.
- `app/globals.css`: das gesamte Styling, Farben als Variablen in `:root`.
- Schrift Geist wird selbst gehostet (`lib/schriften.ts`, Datei aus `@fontsource-variable/geist`).
- `vorschlaege/` und `design_handoff_tenverde_website/`: Entwurfsrunden und ursprüngliche Bauanleitung, nicht Teil des Builds.

## Lebenslauf

Stationen mit `pruefen: true` in `lib/inhalt.ts` stammen aus öffentlichen Profilen und sind noch nicht bestätigt. Live werden sie nicht gezeigt. Mit `TENVERDE_VORSCHAU=1` erscheinen sie markiert, zum Durchsehen. Nach Bestätigung `pruefen` entfernen.

## Betrieb

- Live: https://tenverde.vercel.app (Vercel-Projekt `tenverde`, Team NeoJuris). Jeder Push auf `main` wird automatisch ausgeliefert.
- Serverfunktionen laufen in Frankfurt (`vercel.json`). Sicherheits-Header (CSP, HSTS, X-Frame-Options und weitere) setzt `next.config.ts` im Production-Build.
- Suchmaschinen sind gesperrt (`noindex`, robots.txt `Disallow: /`), bis in Vercel für Production `TENVERDE_INDEXIEREN=1` gesetzt ist. Erst freischalten, wenn die Seite unter tenverde.at läuft und Impressum und Datenschutz vollständig sind.
- CI (`.github/workflows/ci.yml`): Typprüfung, Lint, Build und das Prüfskript über alle Seiten.
- Die Szene schaltet auf langsamen Geräten in eine Sparstufe (nur jedes zweite Bild) und steht bei „Bewegung reduzieren“ still.

## Offen

Alle offenen Angaben und Entscheidungen stehen in `FRAGEN.md`. Markierte Platzhalter auf der Seite (lila hinterlegt) zeigen, wo im Impressum und Datenschutz noch etwas fehlt.
