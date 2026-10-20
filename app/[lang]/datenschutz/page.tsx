import type { Metadata } from 'next';
import { spracheAus } from '@/components/Bausteine';
import { Leuchtwort } from '@/components/Leuchtwort';
import { Platzhalter } from '@/components/Platzhalter';
import { ADRESSE, EMAIL } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { SPRACHEN } from '@/lib/routen';

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const sprache = await spracheAus(params);
  return seitenMeta('datenschutz', sprache, sprache === 'de' ? 'Datenschutz' : 'Privacy');
}

export default async function Datenschutz({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const de = sprache === 'de';
  const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;
  return (
    <section className="subhero wrap legal" aria-labelledby="seite-title">
      <div data-calm="">
        <Leuchtwort as="h1" id="seite-title">
          {de ? 'Datenschutz' : 'Privacy'}
        </Leuchtwort>
        <p>
          {de
            ? `Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist die ${ADRESSE.firma}, ${ADRESSE.strasse}, ${ADRESSE.ort}, Österreich, `
            : `The controller for personal data processed on this website is ${ADRESSE.firma}, ${ADRESSE.strasse}, ${ADRESSE.ort}, Austria, `}
          {mail}.
        </p>

        <h2>{de ? 'Besuch der Website' : 'Visiting this website'}</h2>
        <p>
          {de
            ? 'Diese Website setzt keine Cookies, speichert nichts in Ihrem Browser und verwendet keine Analyse- oder Trackingdienste. Beim Aufruf speichert der Hosting-Anbieter '
            : 'This website sets no cookies, stores nothing in your browser and uses no analytics or tracking services. When you visit, the hosting provider '}
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA,
          {de
            ? ' technisch notwendige Server-Logdaten wie IP-Adresse, Datum, Uhrzeit und aufgerufene Seite. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden nach '
            : ' stores technically necessary server logs such as IP address, date, time and the page requested. The legal basis is our legitimate interest in secure operation (Art. 6(1)(f) GDPR). Logs are deleted after '}
          <Platzhalter>{de ? 'Frist ergänzen' : 'period to add'}</Platzhalter>
          {de ? ' gelöscht.' : '.'}
        </p>

        <p>
          {de
            ? 'Vercel betreibt ein weltweites Netz von Servern. Die Seiten werden möglichst nah am Besucher ausgeliefert, die Serverfunktionen laufen in Frankfurt am Main. Eine Übermittlung von Daten in die USA ist dabei nicht ausgeschlossen. Sie erfolgt auf Grundlage der Standardvertragsklauseln der Europäischen Kommission und des Auftragsverarbeitungsvertrags mit Vercel. '
            : 'Vercel operates a worldwide network of servers. Pages are delivered from locations close to the visitor, server functions run in Frankfurt am Main. A transfer of data to the USA cannot be ruled out. It is based on the European Commission’s standard contractual clauses and the data processing agreement with Vercel. '}
          <Platzhalter>{de ? 'rechtlich prüfen' : 'legal review'}</Platzhalter>
        </p>

        <h3>{de ? 'Schriftarten' : 'Fonts'}</h3>
        <p>
          {de
            ? 'Die Schriften Jost und Figtree werden von dieser Website selbst ausgeliefert. Es werden dabei keine Daten an Google oder andere Schriftanbieter übertragen.'
            : 'The fonts Jost and Figtree are served by this website itself. No data is sent to Google or any other font provider.'}
        </p>

        <h3>{de ? 'Kontakt per E-Mail' : 'Contact by email'}</h3>
        <p>
          {de
            ? 'Wenn Sie uns schreiben, verarbeiten wir Ihre Angaben und mitgesendete Unterlagen wie Pitch Decks, Exposés oder Projektbeschreibungen, um Ihre Anfrage zu bearbeiten (Art. 6 Abs. 1 lit. b und f DSGVO). Wir geben diese Daten nicht ohne Ihre Zustimmung weiter und löschen sie, sobald sie für die Bearbeitung nicht mehr nötig sind und keine gesetzlichen Aufbewahrungspflichten bestehen.'
            : 'When you write to us, we process your details and any documents you send, such as pitch decks, exposés or project descriptions, to handle your enquiry (Art. 6(1)(b) and (f) GDPR). We do not pass this data on without your consent and delete it once it is no longer needed and no statutory retention period applies.'}
        </p>

        <h3>{de ? 'Links zu anderen Websites' : 'Links to other websites'}</h3>
        <p>
          {de
            ? 'Links zu LinkedIn und zu den Websites unserer Projekte öffnen Seiten anderer Anbieter. Erst wenn Sie einem Link folgen, gelten deren Datenschutzbestimmungen.'
            : "Links to LinkedIn and to our projects' websites open pages of other providers. Their privacy policies apply only once you follow such a link."}
        </p>

        <h2>{de ? 'Ihre Rechte' : 'Your rights'}</h2>
        <p>
          {de
            ? 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine Nachricht an '
            : 'You have the right of access, rectification, erasure, restriction of processing, data portability and objection. A message to '}
          {mail}
          {de
            ? ' genügt. Beschwerden können Sie bei der Österreichischen Datenschutzbehörde einbringen, Barichgasse 40-42, 1030 Wien, '
            : ' is enough. You can lodge a complaint with the Austrian Data Protection Authority, Barichgasse 40-42, 1030 Vienna, '}
          <a href="https://www.dsb.gv.at" target="_blank" rel="noopener">
            dsb.gv.at
          </a>
          .
        </p>
      </div>
    </section>
  );
}
