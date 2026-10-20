import type { MetadataRoute } from 'next';
import { DOMAIN, SEITEN, type Seite } from '@/lib/routen';

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(SEITEN) as Seite[]).flatMap((seite) =>
    (['de', 'en'] as const).map((sprache) => ({
      url: `${DOMAIN}${SEITEN[seite][sprache]}`,
      changeFrequency: 'monthly' as const,
      priority: seite === 'start' ? 1 : seite === 'impressum' || seite === 'datenschutz' ? 0.2 : 0.7,
      alternates: { languages: { de: `${DOMAIN}${SEITEN[seite].de}`, en: `${DOMAIN}${SEITEN[seite].en}` } },
    })),
  );
}
