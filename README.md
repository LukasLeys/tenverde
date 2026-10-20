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
- Schriften Jost und Figtree werden selbst gehostet (`lib/schriften.ts`, Dateien aus `@fontsource-variable`).
- `vorschlaege/` und `design_handoff_tenverde_website/`: Entwurfsrunden und ursprüngliche Bauanleitung, nicht Teil des Builds.

## Lebenslauf

Stationen mit `pruefen: true` in `lib/inhalt.ts` stammen aus öffentlichen Profilen und sind noch nicht bestätigt. Live werden sie nicht gezeigt. Mit `TENVERDE_VORSCHAU=1` erscheinen sie markiert, zum Durchsehen. Nach Bestätigung `pruefen` entfernen.

## Vor dem Livegang offen

- Domain: `tenverde.at` ist angenommen (`DOMAIN` in `lib/routen.ts`).
- Impressum: Firmenbuchnummer, UID, Unternehmensgegenstand und Kammermitgliedschaft prüfen (markierte Stellen).
- Datenschutz: Hosting-Anbieter und Aufbewahrungsfrist der Server-Logs eintragen.
- Porträt von Lukas Leys einsetzen (Komponente `Portraet` in `components/Bausteine.tsx`).
- Lebenslauf bestätigen und ergänzen (Ausbildung, Jahreszahlen).
- Beschreibungen von immobily.io und beamswerk.ai bestätigen.

## Deployment

Für Vercel vorbereitet: keine Umgebungsvariablen nötig. Sicherheits-Header (CSP, HSTS, X-Frame-Options und weitere) setzt `next.config.ts` im Production-Build.
