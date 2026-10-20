import { createElement, type ReactNode } from 'react';

type Props = { as?: 'h1' | 'h2' | 'h3' | 'p'; id?: string; className?: string; children: string };

/** Setzt jedes Wort als eigenes Element, damit das Unterholz es in Zeigernähe aufleuchten lässt. */
export function Leuchtwort({ as = 'h2', id, className, children }: Props) {
  const teile: ReactNode[] = [];
  children.split(/[ \t\n]+/).forEach((wort, i, alle) => {
    const letztes = i === alle.length - 1;
    teile.push(
      <span key={i} className={letztes && as === 'h1' ? 'w w--trieb' : 'w'} style={{ ['--i' as string]: i }}>
        {wort}
        {letztes && as === 'h1' ? <Trieb /> : null}
      </span>,
    );
    if (!letztes) teile.push(' ');
  });
  return createElement(as, { id, className, 'data-lit': '' }, teile);
}

/** Ein Trieb mit Knoten wächst aus dem letzten Buchstaben jeder Hauptüberschrift. */
function Trieb() {
  return (
    <svg className="trieb" viewBox="0 0 48 64" aria-hidden="true" focusable="false">
      <path className="trieb__stiel" d="M2 62C10 56 14 46 16 36C18 26 24 18 34 12" />
      <path className="trieb__zweig" d="M16 38C22 36 27 38 30 43" />
      <path className="trieb__blatt" d="M34 12C33 6 37 1 44 0C45 7 41 12 34 12Z" />
      <circle className="trieb__knoten" cx="16" cy="37" r="2.2" />
      <circle className="trieb__knoten" cx="30.5" cy="43.5" r="1.8" />
      <circle className="trieb__knoten trieb__knoten--hell" cx="34" cy="12" r="2.4" />
    </svg>
  );
}
