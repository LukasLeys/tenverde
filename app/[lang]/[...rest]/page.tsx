import { notFound } from 'next/navigation';

// Fängt jede unbekannte Adresse ab, damit die 404 im Layout der Sprache erscheint.
export default function Unbekannt() {
  notFound();
}
