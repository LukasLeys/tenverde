export type BlattArt = 'leaf-1' | 'leaf-2' | 'leaf-3' | 'leaf-4' | 'leaf-5';

/** Einmal pro Seite: alle Varianten der Bildmarke und die Symbole als SVG-Sprite. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="leaf-1" viewBox="0 0 64 64">
          <g transform="rotate(35 32 32)">
            <path fillRule="evenodd" d="M32 58C14 46 12 22 32 6C52 22 50 46 32 58ZM30.4 52L32 14L33.6 52Z" />
          </g>
        </symbol>
        <symbol id="leaf-2" viewBox="0 0 64 64">
          <path d="M32 61V35" fill="none" strokeWidth="3.6" strokeLinecap="round" />
          <path stroke="none" d="M31 39C20 41 9 34 7 20C21 18 30 26 31 39Z" />
          <path stroke="none" d="M33 34C33 19 43 8 58 7C59 22 48 34 33 34Z" />
        </symbol>
        <symbol id="leaf-3" viewBox="0 0 64 64">
          <path stroke="none" fillRule="evenodd" d="M32 59C13 47 11 22 32 5C53 22 51 47 32 59ZM30.3 14H33.7V24.3H42.5V27.7H33.7V51H30.3V27.7H21.5V24.3H30.3Z" />
        </symbol>
        <symbol id="leaf-4" viewBox="0 0 64 64">
          <g transform="rotate(35 32 32)">
            <path stroke="none" d="M32 58C14 46 12 22 32 6Z" />
            <path d="M34.5 10C50 24 48 45 34.5 55.5" fill="none" strokeWidth="3.2" strokeLinecap="round" />
          </g>
        </symbol>
        <symbol id="leaf-5" viewBox="0 0 64 64">
          <g transform="rotate(35 32 32)" fill="none" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 61V20" />
            <path d="M32 45C15 41 13 18 32 6C51 18 49 41 32 45" />
          </g>
        </symbol>
        <symbol id="ico-arrow" viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8" /></symbol>
        <symbol id="ico-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
        <symbol id="ico-down" viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6" /></symbol>
        <symbol id="ico-mail" viewBox="0 0 24 24"><path d="M4 6h16v12H4zM4 7l8 6 8-6" /></symbol>
        <symbol id="ico-copy" viewBox="0 0 24 24"><path d="M9 9h10v10H9zM5 15V5h10" /></symbol>
        <symbol id="ico-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
        <symbol id="ico-star" viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8z" /></symbol>
      </defs>
    </svg>
  );
}

export function Blatt({ art = 'leaf-1', className }: { art?: BlattArt; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <use href={`#${art}`} />
    </svg>
  );
}

export function Icon({ name, className }: { name: 'arrow' | 'right' | 'down' | 'mail' | 'copy' | 'check' | 'star'; className?: string }) {
  return (
    <svg className={className ?? 'ico'} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <use href={`#ico-${name}`} />
    </svg>
  );
}
