'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leuchtwort } from '@/components/Leuchtwort';
import { inhalt } from '@/lib/inhalt';
import { pfad, seiteVonPfad } from '@/lib/routen';

export default function NichtGefunden() {
  const { sprache } = seiteVonPfad(usePathname());
  const t = inhalt(sprache);
  return (
    <section className="subhero wrap" aria-labelledby="seite-title">
      <title>{`${t.nichtGefunden.titel} · tenverde`}</title>
      <meta name="robots" content="noindex" />
      <div className="subhero__text" data-calm="">
        <Leuchtwort as="h1" id="seite-title">
          {t.nichtGefunden.h1}
        </Leuchtwort>
        <p className="lead">{t.nichtGefunden.text}</p>
        <div className="notfound__links">
          <Link className="btn btn--bloom" href={pfad('start', sprache)}>
            <span>{t.ui.zurueck}</span>
          </Link>
          {t.nav.map((n) => (
            <Link key={n.seite} className="textlink" href={pfad(n.seite, sprache)}>
              <span>{n.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
