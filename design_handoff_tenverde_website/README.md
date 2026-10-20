# Bauanleitung: tenverde GmbH Website

## Überblick
Kleine zweisprachige Website (DE/EN) der tenverde GmbH, Beteiligungsgesellschaft von Lukas Leys in Innsbruck. Eine Startseite (Ein-Seiter) plus eine Seite für Impressum und Datenschutz. Zweck: Tätigkeiten und Person vorstellen, Startup- und Immobilienangebote einwerben (per E-Mail).

## Über die Dateien
Die Dateien in `design/` sind **Design-Referenzen in HTML**: Sie zeigen Aussehen und Verhalten, sind aber kein Produktionscode. Aufgabe ist, sie in einer echten Umgebung nachzubauen. Gibt es noch keine, empfohlen: **Astro** (statisch, schnell, i18n eingebaut) oder schlichtes HTML/CSS. Kein JavaScript-Framework nötig; einzige Interaktion ist der Sprachumschalter.

Die `.dc.html`-Dateien laufen nur in der Design-Umgebung. Zum Ansehen im Browser dienen sie als Referenz für Struktur, Texte und Inline-Styles.

## Fidelity
**High-fidelity.** Farben, Schriften, Abstände und Texte sind final und sollen exakt übernommen werden. Ausnahmen sind unten unter "Offene Punkte" aufgeführt.

## Design Tokens

### Farben
| Name | Hex | Verwendung |
|---|---|---|
| paper | #EDF0E8 | Seitenhintergrund |
| ink | #10251A | Text, Primär-Button, aktiver Sprachbutton |
| green | #1E7A46 | Logo, Links, Nummern, Hover-Farbe |
| muted | #3E5546 | Sekundärtext auf paper, Footer |
| body-soft | #2E4537 | Fließtext im Über-mich-Abschnitt |
| leaf-bg | #C4D9C0 | großes Hero-Blatt (Dekor) |
| deep | #0F3320 | Hintergrund Abschnitt "Gesucht" |
| on-deep | #E9F0E4 | Text auf deep |
| on-deep-soft | #C9D9CB | Einleitungstext auf deep |
| on-deep-label | #A9C2AD | Labels (dt) auf deep |
| leaf-light | #8FD19E | Zwischenüberschriften und Logo auf deep |
| contact-bg | #DCE5D6 | Hintergrund Kontakt-Abschnitt |
| marker | #F2E29B | nur Platzhalter-Markierung im Impressum, vor Livegang entfernen |

### Schriften
- **Newsreader** (Google Fonts, Variable mit opsz 6..72), Gewichte 400 und 500, für Wortmarke und alle Überschriften.
- **Hanken Grotesk**, Gewichte 400, 500, 600, für Fließtext, Navigation und Buttons.
- Wegen DSGVO **selbst hosten** (z. B. via fontsource), keine Einbindung von fonts.googleapis.com im Livebetrieb.
- Body: `-webkit-font-smoothing: antialiased`. Überschriften mit `text-wrap: balance`, Fließtext mit `text-wrap: pretty`.

### Typo-Skala (fluid, clamp)
| Element | Schrift | Größe | Gewicht | line-height | letter-spacing |
|---|---|---|---|---|---|
| Wortmarke Header | Newsreader | 28px | 500 | normal | -0.01em |
| H1 Hero | Newsreader | clamp(52px, 9vw, 128px) | 400 | 0.98 | -0.025em, max-width 11ch |
| H2 Abschnitt | Newsreader | clamp(36px, 5vw, 60px) | 400 | 1.05 | -0.015em |
| H2 Gesucht | Newsreader | clamp(40px, 6vw, 76px) | 400 | 1.02 | -0.02em, max-width 16ch |
| H2 Name (Lukas Leys) | Newsreader | clamp(44px, 6vw, 80px) | 400 | 1 | -0.02em |
| H3 Gesucht | Newsreader | clamp(32px, 3.6vw, 44px) | 400 | 1.1 | |
| Projektname | Newsreader | clamp(40px, 6vw, 80px) | 400 | 1 | -0.02em |
| E-Mail Kontakt | Newsreader | clamp(34px, 6.5vw, 92px) | 400 | 1 | -0.02em |
| Lead | Hanken Grotesk | clamp(19px, 1.6vw, 22px) | 400 | 1.55 | |
| Fließtext | Hanken Grotesk | 18 bis 21px | 400 | 1.5 bis 1.6 | |
| Navigation | Hanken Grotesk | 17px | 400 | | white-space: nowrap |
| Buttons | Hanken Grotesk | 17px | 600 | | |
| Footer | Hanken Grotesk | 16px | 400 | | |

Keine Schrift unter 15px (nur DE/EN-Umschalter hat 15px).

### Abstände
- Seitliches Padding aller Abschnitte: `clamp(20px, 5vw, 72px)`
- Inhaltsbreite: `max-width: 1240px; margin: 0 auto` (Impressum: 760px)
- Abschnitts-Padding vertikal: `clamp(56px, 8vw, 112px)` bis `clamp(64px, 9vw, 128px)`
- Header: Padding 22px vertikal

### Radien, Linien, Schatten
- Buttons und Sprachumschalter: `border-radius: 999px`
- Rahmen nur an Sekundär-Button und Umschalter: 1.5px solid ink
- **Keine** Schatten, **keine** Karten, **keine** dekorativen Trennlinien. Abschnitte werden nur durch Weißraum und Hintergrundwechsel getrennt.

## Logo
Bildmarke "Blatt" plus Wortmarke "tenverde" (klein geschrieben, Newsreader 500). Fünf Varianten liegen in `assets/` als SVG (viewBox 0 0 64 64, Farbe #1E7A46):
1. `leaf-1-blatt.svg` Blatt mit ausgesparter Mittelrippe, 35° gedreht (**Standard**)
2. `leaf-2-keimling.svg` zwei Blätter an einem Stiel
3. `leaf-3-t-blatt.svg` Rippen bilden ein "t"
4. `leaf-4-halbblatt.svg` eine Hälfte gefüllt, eine als Kontur
5. `leaf-5-linie.svg` Monoline

Auf dunklem Grund Farbe #8FD19E. Lockup: Marke 34px, Abstand 10px, Wortmarke 28px. Favicon: gewählte Variante als SVG, zusätzlich PNG 32px und 180px (apple-touch-icon). Übersicht aller Varianten: `design/tenverde Logo.dc.html`.

## Seiten

### 1. Startseite (`design/tenverde Website.dc.html`)
Reihenfolge der Abschnitte:

**Header** (flex, space-between, wrap, gap 16px 32px)
- Links: Logo-Lockup, Link auf #top
- Rechts: Nav-Links Unternehmen (#unternehmen), Gesucht (#gesucht), Über mich (#person), Kontakt (#kontakt), Farbe ink, Hover green, gap 8px 28px. Danach DE/EN-Umschalter (zwei Buttons in einer Pille, aktiv = Hintergrund ink + Text paper, inaktiv = transparent + ink, Padding 6px 12px).

**Hero** (#top)
- Großes Blatt (Logo-Marke in #C4D9C0) absolut rechts, `right: -8vw`, vertikal zentriert, Breite `min(64vw, 760px)`, quadratisch, angeschnitten (overflow hidden auf Section), pointer-events none.
- H1: "Wir investieren in Dinge, die wachsen." / "We invest in things that grow."
- Lead (max 34em): "tenverde ist meine Beteiligungsgesellschaft mit Sitz in Innsbruck. Hier liegen meine Softwareunternehmen, meine Beteiligungen an Startups und meine Immobilien."
- Buttons (gap 14px, margin-top 36px): Primär "Was ich suche" → #gesucht (ink, Padding 15px 24px, Hover green). Sekundär "Kontakt aufnehmen" → #kontakt (Kontur, Hover Kontur und Text green).

**Unternehmen** (#unternehmen)
- H2 "Unternehmen, die ich selbst aufbaue"
- Liste aus 4 Zeilen, jede Zeile ist ein Link (neuer Tab). Grid `repeat(auto-fit, minmax(min(100%,340px),1fr))`, gap 10px 56px, baseline. Links: Nummer (17px, 600, green) + Name (Newsreader groß). Rechts: Beschreibung (muted, max 30em). Hover: ganze Zeile färbt Name green.
  1. neojuris.ai → https://neojuris.ai
  2. immobily.io → https://immobily.io
  3. beamswerk.ai → https://beamswerk.ai
  4. Die Kryptologen → https://diekryptologen.com/
- Texte siehe Designdatei.

**Gesucht** (#gesucht, Hintergrund deep)
- H2 "Ich suche Startups und Immobilien.", Lead darunter.
- Zwei Spalten, Grid `repeat(auto-fit, minmax(min(100%,420px),1fr))`, gap 56px / clamp(40px,6vw,96px).
- Je Spalte: H3 (leaf-light), dann eine Definitionsliste `<dl>` als Grid `minmax(110px,auto) 1fr`, gap 16px 28px, 19px. dt in on-deep-label, dd in on-deep.
- Startups: Phase, Branchen, Region, Ticket, Dazu. Immobilien: Objekte, Region, Zustand, Ankauf.
- Abschluss je Spalte: "Pitch Deck bitte an office@tenverde.at" bzw. "Exposé bitte an …" (mailto mit Betreff "Pitch Deck" bzw. "Immobilie").

**Über mich** (#person)
- Grid zwei Spalten (auto-fit, min 340px), unten ausgerichtet.
- Links: Porträtfoto 4:5, max 440px, ohne Rundung.
- Rechts: H2 "Lukas Leys", Rolle (19px 600), Absatz, Link "Profil auf LinkedIn" → https://www.linkedin.com/in/lukasleys/

**Kontakt** (#kontakt, Hintergrund contact-bg)
- H2 "Schreiben Sie mir.", große E-Mail als mailto-Link (Unterstreichung 2px, Offset 0.12em), Adresse: tenverde GmbH, Kirschentalgasse 14/D21, 6020 Innsbruck, Österreich.

**Footer**
- Links: Logo-Marke 20px + "© 2026 tenverde GmbH". Rechts: Impressum, Datenschutz (→ Impressum-Seite #datenschutz). 16px, muted.

### 2. Impressum und Datenschutz (`design/Impressum.dc.html`)
- Gleicher Header (Logo verlinkt zur Startseite, Link "Zur Startseite", Umschalter).
- Inhalt einspaltig, max 760px, 18px / 1.6.
- Impressum nach § 5 ECG, § 14 UGB, § 63 GewO, § 25 MedienG. Datenschutz mit Anker `#datenschutz`.
- Gelb markierte Stellen sind Platzhalter (siehe unten).

## Verhalten
- **Sprache:** Standard DE. Umschalter speichert Wahl in `localStorage` (Schlüssel `tenverde-lang`) und setzt `<html lang>`. `?lang=en` in der URL hat Vorrang. Für SEO besser: eigene Pfade `/` und `/en/` mit `hreflang`-Tags; der Umschalter verlinkt dann zwischen beiden.
- **Scrollen:** `scroll-behavior: smooth` für Anker.
- **Hover:** nur Farbwechsel, keine Animationen, keine Transitions nötig (optional 150ms color).
- **Responsive:** alles fluid über clamp und auto-fit-Grids. Kein fester Breakpoint nötig. Header bricht unter ca. 900px in zwei Zeilen um. Getestet ab 360px Breite.
- Kein Formular, kein Tracking, keine Cookies.

## Assets
- `assets/leaf-*.svg` Logo-Varianten (in diesem Projekt gezeichnet)
- Porträtfoto Lukas Leys: liefert der Kunde (4:5, mind. 900 × 1125 px, WebP/AVIF)
- Keine weiteren Bilder oder Icons

## Offene Punkte vor Livegang
- E-Mail-Adresse office@tenverde.at bestätigen
- Impressum: Firmenbuchnummer, UID, Unternehmensgegenstand, Kammermitgliedschaft, Aufsichtsbehörde prüfen
- Datenschutz: Hosting-Anbieter und Log-Aufbewahrungsdauer eintragen
- Beschreibungen immobily.io und beamswerk.ai vom Kunden bestätigen lassen
- Logo-Variante final wählen (Standard 1)
- Schriften lokal hosten
- Meta-Tags: Title "tenverde GmbH", Description, Open-Graph-Bild

## Dateien
- `design/tenverde Website.dc.html` Startseite
- `design/Impressum.dc.html` Impressum und Datenschutz
- `design/tenverde Logo.dc.html` Logo-Varianten
- `design/Leaf.dc.html` Logo-Komponente (SVG-Pfade aller Varianten)
- `assets/` Logo-SVGs
