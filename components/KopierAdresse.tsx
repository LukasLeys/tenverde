'use client';

import { useState } from 'react';
import { Icon } from './Blatt';

type Props = { adresse: string; texte: { kopieren: string; kopiert: string; kopierFehler: string } };

export function KopierAdresse({ adresse, texte }: Props) {
  const [zustand, setZustand] = useState<'ruhe' | 'ok' | 'fehler'>('ruhe');

  async function kopiere() {
    try {
      await navigator.clipboard.writeText(adresse);
      setZustand('ok');
    } catch {
      setZustand('fehler');
    }
    window.setTimeout(() => setZustand('ruhe'), 2400);
  }

  return (
    <button type="button" className="copy" onClick={kopiere} aria-live="polite">
      <Icon name={zustand === 'ok' ? 'check' : 'copy'} />
      <span>{zustand === 'ok' ? texte.kopiert : zustand === 'fehler' ? texte.kopierFehler : texte.kopieren}</span>
    </button>
  );
}
