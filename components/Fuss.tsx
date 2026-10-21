import Link from 'next/link';
import { ADRESSE, EMAIL, TELEFON, inhalt } from '@/lib/inhalt';
import { pfad, type Sprache } from '@/lib/routen';
import { Blatt } from './Blatt';

export function Fuss({ sprache }: { sprache: Sprache }) {
  const t = inhalt(sprache);
  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div className="foot__brand">
          <Link className="brand brand--small" href={pfad('start', sprache)} aria-label={t.ui.marke}>
            <Blatt art="leaf-1" />
            <span>tenverde</span>
          </Link>
          <p>{t.fuss.zeile}</p>
        </div>
        <nav aria-label={t.ui.fussNav}>
          <ul className="foot__list">
            {t.nav.map((n) => (
              <li key={n.seite}>
                <Link href={pfad(n.seite, sprache)}>{n.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="foot__addr">
          {ADRESSE.firma}
          <br />
          {ADRESSE.strasse}
          <br />
          {ADRESSE.ort}, {t.ui.land}
          <br />
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <br />
          <a href={TELEFON.href}>{TELEFON.anzeige}</a>
        </address>
      </div>
      <div className="wrap foot__base">
        <p>© {new Date().getFullYear()} tenverde GmbH</p>
        <nav aria-label={t.ui.rechtliches}>
          <ul className="foot__legal">
            <li>
              <Link href={pfad('impressum', sprache)}>{t.fuss.impressum}</Link>
            </li>
            <li>
              <Link href={pfad('datenschutz', sprache)}>{t.fuss.datenschutz}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
