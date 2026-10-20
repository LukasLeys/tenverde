/** Sichtbar markierte Stelle, die vor dem Livegang ergänzt werden muss. */
export function Platzhalter({ children }: { children: React.ReactNode }) {
  return <mark className="platzhalter">{children}</mark>;
}
