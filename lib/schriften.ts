import localFont from 'next/font/local';

// Selbst gehostet (DSGVO): Dateien kommen aus @fontsource-variable und werden mit der Seite ausgeliefert.
export const jost = localFont({
  src: '../node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--f-display',
  display: 'swap',
  fallback: ['Futura', 'Century Gothic', 'sans-serif'],
});

export const figtree = localFont({
  src: '../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2',
  weight: '300 900',
  variable: '--f-text',
  display: 'swap',
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
});
