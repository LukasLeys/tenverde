// Seiten und ihre Adressen je Sprache. Deutsch liegt ohne Präfix an der Wurzel,
// Englisch unter /en mit englischen Slugs. Intern liegen alle Seiten unter app/[lang]/<intern>.

export const SPRACHEN = ['de', 'en'] as const;
export type Sprache = (typeof SPRACHEN)[number];

export function istSprache(wert: string): wert is Sprache {
  return (SPRACHEN as readonly string[]).includes(wert);
}

export const SEITEN = {
  start: { intern: '', de: '/', en: '/en' },
  strategie: { intern: 'strategie', de: '/strategie', en: '/en/strategy' },
  ankaufsprofil: { intern: 'ankaufsprofil', de: '/ankaufsprofil', en: '/en/acquisition-profile' },
  bauen: { intern: 'projekte-bauen', de: '/projekte-bauen', en: '/en/build-with-me' },
  ueber: { intern: 'ueber-mich', de: '/ueber-mich', en: '/en/about' },
  kontakt: { intern: 'kontakt', de: '/kontakt', en: '/en/contact' },
  impressum: { intern: 'impressum', de: '/impressum', en: '/en/legal-notice' },
  datenschutz: { intern: 'datenschutz', de: '/datenschutz', en: '/en/privacy' },
} as const;

export type Seite = keyof typeof SEITEN;

export function pfad(seite: Seite, sprache: Sprache): string {
  return SEITEN[seite][sprache];
}

/** Englischer Slug → interner Ordnername, z. B. "strategy" → "strategie". */
export const EN_ZU_INTERN: Record<string, string> = Object.fromEntries(
  Object.values(SEITEN)
    .filter((s) => s.intern)
    .map((s) => [s.en.replace('/en/', ''), s.intern]),
);

/** Interner Ordnername → englischer Slug, für Weiterleitungen alter oder falscher Adressen. */
export const INTERN_ZU_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_ZU_INTERN).map(([en, intern]) => [intern, en]),
);

export const DOMAIN = 'https://tenverde.at';

/**
 * Suchmaschinen dürfen die Seite erst indexieren, wenn sie unter der finalen Domain läuft und
 * Impressum und Datenschutz vollständig sind. Freischalten mit TENVERDE_INDEXIEREN=1 (nur Production).
 */
export const INDEXIEREN = process.env.TENVERDE_INDEXIEREN === '1';

/** Öffentliche Adresse → Seite und Sprache, z. B. "/en/about" → { seite: "ueber", sprache: "en" }. */
export function seiteVonPfad(pfadname: string): { seite: Seite | null; sprache: Sprache } {
  const p = pfadname.replace(/\/$/, '') || '/';
  const sprache: Sprache = p === '/en' || p.startsWith('/en/') ? 'en' : 'de';
  const eintrag = (Object.keys(SEITEN) as Seite[]).find((k) => SEITEN[k][sprache] === p);
  return { seite: eintrag ?? null, sprache };
}
