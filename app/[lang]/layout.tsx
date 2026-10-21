import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../globals.css';
import { Sprite } from '@/components/Blatt';
import { Fuss } from '@/components/Fuss';
import { Kopf } from '@/components/Kopf';
import { Unterholz } from '@/components/Unterholz';
import { ADRESSE, EMAIL, LINKEDIN, TELEFON, inhalt } from '@/lib/inhalt';
import { DOMAIN, INDEXIEREN, SPRACHEN, istSprache } from '@/lib/routen';
import { geist } from '@/lib/schriften';

export const dynamicParams = false;

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#090f0b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!istSprache(lang)) return {};
  const t = inhalt(lang);
  return {
    metadataBase: new URL(DOMAIN),
    title: t.meta.titel,
    description: t.meta.beschreibung,
    applicationName: 'tenverde',
    authors: [{ name: 'Lukas Leys' }],
    formatDetection: { telephone: false, email: false, address: false },
    robots: INDEXIEREN ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!istSprache(lang)) notFound();
  const t = inhalt(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${DOMAIN}/#organisation`,
        name: 'tenverde GmbH',
        url: DOMAIN,
        email: EMAIL,
        telephone: TELEFON.href.replace('tel:', ''),
        vatID: 'ATU73321005',
        logo: `${DOMAIN}/icon.svg`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: ADRESSE.strasse,
          postalCode: '6020',
          addressLocality: 'Innsbruck',
          addressCountry: 'AT',
        },
        founder: { '@id': `${DOMAIN}/#lukas-leys` },
      },
      {
        '@type': 'Person',
        '@id': `${DOMAIN}/#lukas-leys`,
        name: 'Lukas Leys',
        jobTitle: t.ueber.rolle,
        worksFor: { '@id': `${DOMAIN}/#organisation` },
        sameAs: [LINKEDIN],
      },
    ],
  };

  return (
    <html lang={lang} className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#inhalt">
          {t.ui.skip}
        </a>
        <Sprite />
        <Unterholz />
        <Kopf sprache={lang} nav={t.nav} ui={t.ui} />
        <div className="page">
          <main id="inhalt">{children}</main>
          <Fuss sprache={lang} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
