'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { seiteVonPfad, pfad } from '@/lib/routen';

// Fängt unerwartete Fehler beim Rendern ab, damit Besucher nie eine leere Seite sehen.
export default function Fehler({ reset }: { error: Error; reset: () => void }) {
  const { sprache } = seiteVonPfad(usePathname());
  const de = sprache === 'de';
  return (
    <section className="subhero wrap" aria-labelledby="fehler-title">
      <div className="subhero__text" data-calm="">
        <h1 id="fehler-title">{de ? 'Hier ist etwas schiefgelaufen.' : 'Something went wrong here.'}</h1>
        <p className="lead">
          {de
            ? 'Die Seite konnte nicht geladen werden. Versuchen Sie es noch einmal oder schreiben Sie an office@tenverde.at.'
            : 'The page could not be loaded. Please try again or write to office@tenverde.at.'}
        </p>
        <div className="notfound__links">
          <button type="button" className="btn btn--bloom" onClick={reset}>
            <span>{de ? 'Erneut versuchen' : 'Try again'}</span>
          </button>
          <Link className="textlink" href={pfad('start', sprache)}>
            <span>{de ? 'Zur Startseite' : 'Back to home'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
