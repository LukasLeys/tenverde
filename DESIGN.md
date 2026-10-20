---
name: tenverde
description: Leuchtwald. Nächtlicher Waldboden, auf dem ein Wurzelnetz alle Seiten verbindet und leuchtet, wo Aufmerksamkeit hinfällt.
colors:
  loam: "#090f0b"
  loam-2: "#0e1712"
  cyan: "#86e8df"
  lilac: "#bba8f4"
  ice: "#a6c8f6"
  moss: "#b7e5c3"
  vein: "#9fd3ae"
  bloom: "#f3fff7"
  head: "#dcebe1"
  text: "#d4e3d9"
  text-2: "#a9bdb0"
  text-3: "#8ea596"
  line: "rgba(159, 211, 174, 0.22)"
typography:
  display:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(2.6rem, 6.6vw, 6rem)"
    fontWeight: 200
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 4rem)"
    fontWeight: 250
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title-small:
    fontFamily: "Jost, Futura, Century Gothic, sans-serif"
    fontSize: "clamp(1.4rem, 2vw, 1.75rem)"
    fontWeight: 300
    lineHeight: 1.1
  lead:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "tnum"
  label:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.01em"
rounded:
  pill: "999px"
  menu: "12px"
  focus: "6px"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  max: "82rem"
  section: "clamp(6rem, 11vw, 10.5rem)"
  section-tight: "clamp(4.5rem, 9vw, 8rem)"
  clearing: "clamp(2rem, 4vw, 3.5rem)"
  target: "44px"
components:
  button-bloom:
    backgroundColor: "{colors.bloom}"
    textColor: "{colors.loam}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.5rem"
  button-glow:
    backgroundColor: "rgba(134, 232, 223, 0.07)"
    textColor: "{colors.bloom}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.5rem"
  button-glow-hover:
    backgroundColor: "rgba(134, 232, 223, 0.16)"
    textColor: "{colors.bloom}"
  button-lilac:
    backgroundColor: "rgba(187, 168, 244, 0.08)"
    textColor: "{colors.bloom}"
    rounded: "{rounded.pill}"
    padding: "0 1.75rem"
    height: "3.5rem"
  nav-link:
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 0.85rem"
    height: "44px"
  nav-link-active:
    backgroundColor: "rgba(134, 232, 223, 0.08)"
    textColor: "{colors.bloom}"
  lang-active:
    backgroundColor: "{colors.bloom}"
    textColor: "{colors.loam}"
    rounded: "{rounded.pill}"
  chip:
    backgroundColor: "rgba(13, 21, 16, 0.85)"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem"
  badge:
    backgroundColor: "rgba(187, 168, 244, 0.1)"
    textColor: "{colors.bloom}"
    rounded: "{rounded.pill}"
    padding: "0 1rem 0 0.8rem"
    height: "2.5rem"
  clearing:
    textColor: "{colors.text}"
    padding: "{spacing.clearing}"
---

# Design System: tenverde

## Overview

**Creative North Star: "Der Leuchtwald"**

Wachstum ist Licht. Die Seite ist ein nächtlicher Waldboden aus warmem Grünschwarz. Ein Wurzelnetz wächst als Canvas-Szene (`lib/unterholz/engine.js`) hinter allen Seiten, verbindet die Abschnitte und leuchtet dort, wo Aufmerksamkeit hinfällt: Ein Lichtfeld folgt dem Zeiger (auf Touch dem Scrollen), weckt Wurzeln, Blätter und einzelne Wörter, und Lichtpulse laufen beim Scrollen zu jedem Abschnitt. Bei reduzierter Bewegung zeigt die Szene ein stilles Bild.

Text liegt nie direkt auf dem Netz, sondern auf ruhigen, abgedunkelten Lichtungen. Titel sind sehr leicht und groß, Licht ist das einzige Ornament. Es gibt keine gerahmten Karten: Inhalte wachsen als Gewächse, Kriterien hängen an feinen Adern, Knöpfe sind Leuchtpillen. Abgelehnt ist die übliche Investorenseite (dunkler Hero mit einem Neon-Akzent, Logo-Raster, Kennzahlenkacheln).

Die Bildmarke Blatt (fünf Varianten) ist das Saatgut des Systems: Sie ist Logo, Artzeichen der Projekte, Blattform im Wurzelnetz und Baustein der Rosette im ersten Bild.

**Key Characteristics:**
- Grünschwarzer Grund mit zwei sehr schwachen Lichtnebeln (Cyan oben rechts, Lila unten links) und dunkler Vignette.
- Lebende Canvas-Szene als Hintergrund aller Seiten, gesteuert über Datenattribute im Markup.
- Jost 200 bis 300 für Titel, Figtree für Text.
- Weißblüte nur für das aktive oder wichtigste Element.
- Tiefe entsteht durch Glühen, nie durch Schlagschatten oder Rahmen.

## Colors

Ein dunkler, warmer Waldboden mit kaltem Sporenlicht in vier Artfarben und einem einzigen hellen Blütenweiß.

### Primary
- **Sporencyan** (cyan): Hauptlicht. Glühen der Marke, Rand und Schein der Leuchtpille, aktive Navigation, Links im Lebenslauf und in Rechtstexten, Standardfarbe der Lichtungen und Adern. Auch `accent-color`.

### Secondary
- **Sporenlila** (lilac): Zweites Licht. Lila Leuchtpille, Unterstreichung der Textlinks, Porträtfläche, Superhost-Marke, Schrittnummern, Rolle unter dem Namen, markierte unbestätigte Lebenslaufstationen. Auch Auswahlfarbe des Texts.

### Tertiary
- **Eisblau** (ice) und **Moos** (moss): Artfarben. Gemeinsam mit Cyan und Lila färben sie die vier Projektgewächse und die Lichtungen auf der Kontaktseite. Keine Textfarben für Fließtext.
- **Wurzelgrün** (vein): Stiel des Triebs am Ende der Hauptüberschrift; im Canvas der Grundton der Wurzeln (dort als `170, 226, 186`).

### Neutral
- **Loam** (loam): Grund jeder Seite, Text auf der Weißblüte.
- **Tiefer Loam** (loam-2): Grund des Porträts.
- **Weißblüte** (bloom): nur aktives Element: Leuchtpille, gewählte Sprache, Hover von Links und Titeln, Knoten der Adern, die E-Mail-Adresse, Fokusring (`--focus`).
- **Titelgrau** (head): Farbe der Überschriften im Ruhezustand.
- **Text** (text), **Text 2** (text-2), **Text 3** (text-3): Fließtext, Beschreibungen unter Titeln, Nebenangaben wie Orte im Lebenslauf.
- **Ader** (line): feine Linien in Kopfzeile, Fuß, Sprachumschalter, Chips.

### Named Rules
**The Eine-Blüte Rule.** Weißblüte ist dem aktiven oder wichtigsten Element vorbehalten. Pro Ansicht gibt es höchstens eine gefüllte Leuchtpille.

**The Artfarben Rule.** Farbige Elemente setzen ihre Farbe über die lokale Variable `--c` (cyan, lilac, ice, moss) und leiten Schein, Adern und Beschriftungen per `color-mix` davon ab. Keine neuen Farbtöne pro Bauteil.

## Typography

**Display Font:** Jost (mit Futura, Century Gothic, sans-serif), variabel 100 bis 900, selbst gehostet
**Body Font:** Figtree (mit Segoe UI, system-ui, sans-serif), variabel 300 bis 900, selbst gehostet

**Character:** Jost in sehr leichten Schnitten wirkt wie Licht auf dunklem Grund, geometrisch und still. Figtree trägt den Text klar und freundlich.

### Hierarchy
- **Display** (h1): Hauptüberschrift des ersten Bildes, höchstens 11,5ch breit; auf Unterseiten kleiner (`clamp(2.5rem, 6vw, 5.25rem)`, 16ch). Wörter erscheinen nacheinander aus der Unschärfe.
- **Headline** (h2): Abschnittstitel; dieselbe Leichtigkeit auch für die E-Mail-Adresse.
- **Title** (h3): Projektnamen, Lichtungstitel.
- **Title small**: Titel in Ader-Listen, Schritten und Lebenslauf, dort meist in Weißblüte.
- **Lead**: Einleitung unter Titeln, 36 bis 40rem breit.
- **Body**: Fließtext, `.prose` höchstens 40rem, Rechtstexte 65ch. Ziffern tabellarisch.
- **Label**: Navigation, Sprachumschalter, Zeiten im Lebenslauf, Fußzeile. Keine Großbuchstaben-Kicker.

### Named Rules
**The Leichtgewicht Rule.** Titel stehen in Jost 200 bis 300; je größer, desto leichter. Fett gibt es nur im Text (500 bis 600 für Knöpfe und Beschriftungen).

**The Leuchtwort Rule.** Wörter in Titeln sind einzeln adressierbar (`.w`) und reagieren über `--lit` auf das Lichtfeld. Sie werden heller und glühen, ändern aber nie ihre Größe oder Laufweite.

## Layout

Eine zentrierte Spalte bis 82rem mit fließendem Rand (`--gutter`). Abschnitte haben großzügigen Abstand nach oben (`--section`, auf dichteren Unterseiten `section-tight`). Das erste Bild der Startseite ist bildschirmhoch: links Titel, Einleitung und Leuchtpille, rechts die Rosette (`#rosette`) über dem Wurzelnetz; unter 860px steht die Rosette oben, der Text darunter, die Leuchtpille in voller Breite (unter 520px). Unterseiten beginnen mit Titel und Einleitung links oben; Strategie, Projekte bauen und Kontakt tragen eine eigene, kleinere Rosette rechts (über `data-art`, `data-farben`, `data-blaetter`), die unter 960px entfällt.

Die vier Projekte stehen im 12-Spalten-Raster versetzt wie Gewächse (gerade Einträge tiefer gesetzt), mobil einspaltig mit Einzug für jeden zweiten. Lichtungen stehen paarweise, Prinzipien, Schritte, Felder und Kontaktwege dreispaltig; unter 960px wird alles einspaltig. Die Navigation klappt unter 1024px in ein Menü. Alle Ziele sind mindestens 44px hoch.

### Named Rules
**The Lichtung Rule.** Text sitzt auf ruhigen Flächen. Elemente mit Text tragen `data-calm`, damit die Szene dort Wurzeln und Sporen dimmt; Lichtungen haben eine radial auslaufende, abgedunkelte Fläche statt eines Kastens.

**The Wuchsstelle Rule.** Wo das Wurzelnetz andocken soll, steht `data-anchor`; `data-ring` zeichnet einen Lichtring, `data-strong` hält ihn hell, `data-bloom` lässt die Stelle bei Hover und Fokus aufblühen. Neue Abschnitte werden über diese Attribute an die Szene angeschlossen, nicht über eigene Effekte.

## Elevation & Depth

Es gibt keine Schlagschatten zur Erhebung. Tiefe entsteht durch Licht: mehrlagiges Glühen in Cyan und Lila, innere Haarlinien (`inset 0 0 0 1px`) statt Rahmen, abgedunkelte Lichtungen über der Szene und eine dunkle Vignette (`body::after`). Die Ebenen sind fest: Canvas (0), Vignette (1), Seite (2), Kopf (20).

### Shadow Vocabulary
- **Blütenschein**: vierlagiger Schein der gefüllten Leuchtpille (weißer Innenrand, dann Mint, Cyan, Lila mit wachsendem Radius bis 120px).
- **Glühpille**: Innenrand in Artfarbe mit 55 bis 60 Prozent Deckkraft plus weicher Schein `0 4px 24px` mit 12 Prozent.
- **Knoten**: Weißblütenpunkt mit Ring in Artfarbe und Schein bis 22px; markiert Adern, Prinzipien und Lebenslaufstationen.
- **Textlicht**: `text-shadow` in Cyan oder Lila für Marke, Navigation, Textlinks und die E-Mail-Adresse.
- **Artenschein**: `drop-shadow` in der Artfarbe für Blattmarken, beim Aufblühen weiß verstärkt.

### Named Rules
**The Licht-statt-Schatten Rule.** Erhebung zeigt sich als Glühen in den Weltfarben. Dunkle, versetzte Schatten gibt es nur einmal, sehr weich, unter dem Porträt.

## Shapes

Die Form ist rund und organisch. Alles Bedienbare ist eine Pille (`999px`); Knoten und Schrittnummern sind Kreise. Lichtungen haben keine Kante, sie laufen radial aus. Linien sind 1px fein und meist als Verlauf angelegt, der ausblendet (Adern, Lebenslauf, Prinzipien). Das Porträt hat oben einen Bogen und unten weiche Ecken (`999px 999px 2rem 2rem`). Das mobile Menü nutzt `12px` für seine Zeilen.

## Components

### Buttons
Leuchtpillen: weich, hell, leise aufsteigend.
- **Shape:** Pille, 3.5rem hoch.
- **Bloom (primär):** Weißblüte mit dunklem Text und Blütenschein. Eine pro Ansicht. Hover: 2px nach oben, Schein heller.
- **Glow:** zart cyanfarbene Füllung mit cyanfarbenem Innenrand, Text in Weißblüte, Mail-Symbol rechts. Für E-Mail-Handlungen in Lichtungen.
- **Lilac:** dieselbe Pille in Lila für die Immobilien- und Projektwege.
- **Textlink:** Text mit lila Unterstreichung und Pfeil, für Verweise auf Unterseiten.
- **Übergänge:** 0,3 bis 0,35s mit `--ease` (`cubic-bezier(0.16, 1, 0.3, 1)`).

### Chips
- **Style:** Themen als Pillen auf dunkler Fläche mit Innenrand in `line`. Nur Anzeige, keine Auswahl.
- **Badge:** lila Pille mit Sternsymbol für die Superhost-Angabe.

### Cards / Containers
- Es gibt keine Karten. Die **Lichtung** ersetzt sie: kein Rahmen, kein Radius, Innenabstand `clearing`, abgedunkelte Fläche mit Lichtfleck der Artfarbe oben links, Titel in Weißblüte.
- **Kriterien** stehen als Definitionsliste in zwei Spalten mit feinen Adern in Artfarbe darüber; Begriffe in getönter Artfarbe.

### Inputs / Fields
Es gibt keine Formulare. Kontakt läuft ausschließlich per E-Mail. Der einzige Bedienknopf außerhalb der Links ist **Adresse kopieren** (dunkle Pille mit Innenrand, Hover in Cyan).

### Navigation
- Fester Kopf mit Verlauf von Loam nach transparent; Marke links mit glühendem Blatt.
- Links als Pillen in Figtree 500 mit Textlicht; aktive Seite in Weißblüte auf zartem Cyan.
- Sprachumschalter als Pillenpaar, gewählte Sprache gefüllt in Weißblüte.
- Unter 1024px ein Menüknopf; das Menü öffnet sich als Liste mit großen Zeilen.

### Gewächs (Signatur)
Projekte erscheinen als Blattmarke (`.species`, 5.5rem) in ihrer Artfarbe mit Name, Text und Außenlink. Bei Licht, Hover oder Fokus wird das Blatt weiß, wächst auf 108 Prozent und dreht sich um 6 Grad, der Titel glüht.

### Ader-Liste (Signatur)
Senkrechte, ausblendende Linie in Artfarbe mit leuchtenden Knoten pro Eintrag. Varianten: Lebenslauf (Zeit links, Ader in der Mitte), Prinzipien (waagrechte Ader über drei Spalten), schlichte Aufzählung.

### Leuchtadresse und Trieb
Die E-Mail-Adresse ist das größte Element der Kontaktbereiche: Jost 250 in Weißblüte mit vierlagigem Textlicht. Am letzten Wort der Hauptüberschrift wächst ein kleiner Trieb (Stiel in Wurzelgrün, Zweig in Lila, Blatt in Cyan).

## Do's and Don'ts

### Do:
- **Do** Farben nur über die Variablen in `:root` führen und Bauteilfarben über `--c` setzen.
- **Do** jeden neuen Textbereich mit `data-calm` vor der Szene beruhigen und Wuchsstellen mit `data-anchor` anschließen.
- **Do** Titel in Jost 200 bis 300 setzen, Text in Figtree.
- **Do** Tiefe durch Glühen und Innenränder zeigen.
- **Do** für reduzierte Bewegung eine stille Szene ohne Einblendungen zeigen.
- **Do** Zielflächen mindestens 44px hoch halten.

### Don't:
- **Don't** gerahmte Karten, Kachelraster oder Kennzahlenkacheln bauen; Inhalte stehen auf Lichtungen oder an Adern.
- **Don't** Weißblüte als Flächenfarbe für mehr als ein Element pro Ansicht verwenden.
- **Don't** harte oder versetzte Schatten setzen.
- **Don't** Kicker oder Großbuchstaben-Zeilen über Titel stellen.
- **Don't** Symbole als Schriftzeichen setzen; Symbole kommen als SVG aus dem Sprite.
- **Don't** Schriften von fremden Servern laden.
