'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { pfad, seiteVonPfad, type Seite, type Sprache } from '@/lib/routen';
import { Blatt } from './Blatt';

type Props = {
  sprache: Sprache;
  nav: { seite: Seite; text: string }[];
  ui: { marke: string; navLabel: string; menue: string; menueZu: string; sprache: string };
};

export function Kopf({ sprache, nav, ui }: Props) {
  const pfadname = usePathname();
  const { seite } = seiteVonPfad(pfadname);
  const [offen, setOffen] = useState(false);
  const knopf = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => setOffen(false), [pfadname]);

  useEffect(() => {
    if (!offen) return;
    navRef.current?.querySelector('a')?.focus();
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOffen(false);
        knopf.current?.focus();
      }
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [offen]);

  return (
    <header className="top">
      <div className="wrap top__inner">
        <Link className="brand" href={pfad('start', sprache)} aria-label={ui.marke}>
          <Blatt art="leaf-1" />
          <span>tenverde</span>
        </Link>
        <nav className={`nav${offen ? ' is-open' : ''}`} id="nav" ref={navRef} aria-label={ui.navLabel}>
          <ul>
            {nav.map((n) => (
              <li key={n.seite}>
                <Link href={pfad(n.seite, sprache)} aria-current={seite === n.seite ? 'page' : undefined}>
                  {n.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lang" role="group" aria-label={ui.sprache}>
          <Link href={pfad(seite ?? 'start', 'de')} hrefLang="de" lang="de" aria-current={sprache === 'de' ? 'true' : undefined}>
            DE
          </Link>
          <Link href={pfad(seite ?? 'start', 'en')} hrefLang="en" lang="en" aria-current={sprache === 'en' ? 'true' : undefined}>
            EN
          </Link>
        </div>
        <button
          ref={knopf}
          className="menu-btn"
          type="button"
          aria-expanded={offen}
          aria-controls="nav"
          onClick={() => setOffen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {offen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
          <span>{ui.menue}</span>
        </button>
      </div>
    </header>
  );
}
