import type { Metadata } from 'next';
import { inhalt } from './inhalt';
import { DOMAIN, pfad, type Seite, type Sprache } from './routen';

// Vorschaubild für alle Seiten; liegt als Metadaten-Datei unter app/[lang]/opengraph-image.jpg.
const OG_BILD = '/de/opengraph-image.jpg';

/** Titel, Beschreibung, kanonische Adresse und Sprachalternativen für eine Seite. */
export function seitenMeta(seite: Seite, sprache: Sprache, titel?: string, beschreibung?: string): Metadata {
  const t = inhalt(sprache);
  const url = pfad(seite, sprache);
  return {
    title: titel ? `${titel} · tenverde` : t.meta.titel,
    description: beschreibung ?? t.meta.beschreibung,
    alternates: {
      canonical: url,
      languages: { de: pfad(seite, 'de'), en: pfad(seite, 'en'), 'x-default': pfad(seite, 'de') },
    },
    openGraph: {
      type: 'website',
      url: `${DOMAIN}${url}`,
      siteName: 'tenverde',
      locale: sprache === 'de' ? 'de_AT' : 'en_US',
      title: titel ? `${titel} · tenverde` : t.meta.titel,
      description: beschreibung ?? t.meta.beschreibung,
      images: [{ url: OG_BILD, width: 1200, height: 630, alt: 'tenverde' }],
    },
    twitter: { card: 'summary_large_image', images: [OG_BILD] },
  };
}
