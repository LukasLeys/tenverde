import type { Metadata } from 'next';
import { spracheAus } from '@/components/Bausteine';
import { Leuchtwort } from '@/components/Leuchtwort';
import { Platzhalter } from '@/components/Platzhalter';
import { ADRESSE, EMAIL, TELEFON } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { SPRACHEN } from '@/lib/routen';

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const sprache = await spracheAus(params);
  return seitenMeta('impressum', sprache, sprache === 'de' ? 'Impressum' : 'Legal notice');
}

export default async function Impressum({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const de = sprache === 'de';
  return (
    <section className="subhero wrap legal" aria-labelledby="seite-title">
      <div data-calm="">
        <Leuchtwort as="h1" id="seite-title">
          {de ? 'Impressum' : 'Legal notice'}
        </Leuchtwort>
        <p>
          {de
            ? 'Informationspflicht nach § 5 ECG, § 14 UGB, § 63 GewO und Offenlegung nach § 25 MedienG'
            : 'Information pursuant to § 5 ECG, § 14 UGB, § 63 GewO and disclosure pursuant to § 25 MedienG (Austria)'}
        </p>
        <p>
          <strong>{ADRESSE.firma}</strong>
          <br />
          {ADRESSE.strasse}
          <br />
          {ADRESSE.ort}, {de ? 'Österreich' : 'Austria'}
        </p>
        <p>
          {de ? 'Geschäftsführer' : 'Managing director'}: Mag. Lukas Leys, MSc, BSc
          <br />
          {de ? 'Unternehmensgegenstand' : 'Business purpose'}:{' '}
          {de ? 'Beteiligungen, Softwareentwicklung, Immobilien' : 'investments, software development, real estate'}{' '}
          <Platzhalter>{de ? 'prüfen' : 'check'}</Platzhalter>
          <br />
          {de ? 'Firmenbuchnummer' : 'Company register number'}: FN 485841 y
          <br />
          {de ? 'Firmenbuchgericht: Landesgericht Innsbruck' : 'Register court: Regional Court of Innsbruck'}
          <br />
          {de ? 'UID-Nummer' : 'VAT ID'}: ATU73321005
        </p>
        <p>
          {de ? 'E-Mail' : 'Email'}: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <br />
          {de ? 'Telefon' : 'Phone'}: <a href={TELEFON.href}>{TELEFON.anzeige}</a>
        </p>
        <p>
          {de ? 'Mitglied der Wirtschaftskammer Tirol' : 'Member of the Tyrolean Chamber of Commerce'}{' '}
          <Platzhalter>{de ? 'prüfen' : 'check'}</Platzhalter>
          <br />
          {de ? 'Aufsichtsbehörde: Stadtmagistrat Innsbruck' : 'Supervisory authority: City of Innsbruck'}
          <br />
          {de ? 'Anwendbare Rechtsvorschriften: Gewerbeordnung, abrufbar unter ' : 'Applicable regulations: Austrian Trade Regulation Act, available at '}
          <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener">
            ris.bka.gv.at
          </a>
        </p>
        <p>
          {de
            ? 'Medieninhaber und Herausgeber: tenverde GmbH. Gesellschafter: Lukas Leys (100 %). Grundlegende Richtung: Information über die Tätigkeiten der Gesellschaft und ihres Geschäftsführers.'
            : "Media owner and publisher: tenverde GmbH. Shareholder: Lukas Leys (100 %). Purpose: information about the company's activities and its managing director."}
        </p>
        <h2>{de ? 'Haftung für Links' : 'Liability for links'}</h2>
        <p>
          {de
            ? 'Diese Website verweist auf Websites anderer Anbieter. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich. Bei Bekanntwerden rechtswidriger Inhalte entfernen wir entsprechende Links umgehend.'
            : 'This website links to websites of other providers. Their operators are solely responsible for their content. If we become aware of unlawful content, we will remove the link promptly.'}
        </p>
      </div>
    </section>
  );
}
