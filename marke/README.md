# tenverde Logo-Set

Erzeugt mit `node tools/marke.mjs` gegen die laufende Website (`npm run build && npm start`). Die Wortmarke ist Geist 500 als Pfad (`quelle/wortmarke.json`, aus `@fontsource-variable/geist` gezogen). Blatt, Schriftzug und Abstand stehen im selben Verhältnis wie im Kopf der Website. Sichtbarer Abstand von der Blattkante bis zum t: 0,34 der Schriftgröße.

## Inhalt

- `svg/` und `png/`: vier Formen (bildmarke, wortmarke, horizontal, gestapelt) in vier Farbstellungen
  - `hell`: Weißblüte `#F3FFF7`, für dunkle Flächen
  - `leuchtend`: Blatt Cyan `#86E8DF`, Schrift Weißblüte, für dunkle Flächen
  - `gruen`: Blatt Waldgrün `#1E7A46`, Schrift Tiefgrün `#10251A`, für helle Flächen
  - `schwarz`: einfarbig `#090F0B`
  - PNG transparent, 2.000 px breit (Bildmarke 1.024 px)
- `profilbild/`: dunkel (leuchtend), Waldgrün, hell; je SVG, 1.024 px und 400 px. Das Blatt liegt im inneren Kreis.
- `banner/`: X 1.500 × 500, LinkedIn Profil 1.584 × 396, LinkedIn Unternehmensseite 1.128 × 191, dazu das Vorschaubild der Website 1.200 × 630.

## Einsatz

- Horizontal ist die Hauptform. Gestapelt für quadratische Flächen. Bildmarke allein als Profilbild oder Favicon.
- Freiraum rund um das Logo: mindestens die Höhe des kleinen „e“.
- Mindestgröße horizontal 96 px oder 25 mm breit, darunter nur die Bildmarke (ab 16 px).
