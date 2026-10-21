import localFont from 'next/font/local';

// Selbst gehostet (DSGVO): die Datei kommt aus @fontsource-variable und wird mit der Seite ausgeliefert.
// Geist trägt Titel und Text; globals.css leitet --f-display und --f-text davon ab.
export const geist = localFont({
  src: '../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--f-geist',
  display: 'swap',
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
});
