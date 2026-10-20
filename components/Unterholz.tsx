'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { erzeugeUnterholz, type Unterholz as Szene } from '@/lib/unterholz/engine';

/** Der leuchtende Waldboden hinter jeder Seite. Wird bei Seitenwechsel und Höhenänderung neu vermessen. */
export function Unterholz() {
  const ref = useRef<HTMLCanvasElement>(null);
  const szene = useRef<Szene | null>(null);
  const pfad = usePathname();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = erzeugeUnterholz(canvas);
    szene.current = s;

    let timer = 0;
    let letzteHoehe = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - letzteHoehe) < 120) return;
      letzteHoehe = h;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => s.ready && s.relayout(), 200);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      s.destroy();
      szene.current = null;
    };
  }, []);

  useEffect(() => {
    const s = szene.current;
    if (!s || !s.ready) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => s.relayout()));
    return () => cancelAnimationFrame(id);
  }, [pfad]);

  return <canvas ref={ref} className="understory" aria-hidden="true" />;
}
