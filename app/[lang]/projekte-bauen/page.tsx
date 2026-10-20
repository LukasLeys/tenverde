import type { Metadata } from 'next';
import { KontaktBluete, MailKnopf, spracheAus } from '@/components/Bausteine';
import { Leuchtwort } from '@/components/Leuchtwort';
import { inhalt } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { SPRACHEN } from '@/lib/routen';

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache).bauen;
  return seitenMeta('bauen', sprache, t.titel, t.lead);
}

const ARTEN = ['leaf-4', 'leaf-2', 'leaf-1'] as const;
const FARBEN = ['', ' field--moss', ' field--lilac'];

export default async function ProjekteBauen({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache);
  const b = t.bauen;

  return (
    <>
      <section className="subhero wrap" aria-labelledby="seite-title">
        <div className="rosette-anchor rosette-anchor--sub" id="rosette" data-art="4" data-farben="1,3,0" data-blaetter="11" aria-hidden="true" />
        <div className="subhero__text" data-calm="">
          <Leuchtwort as="h1" id="seite-title">
            {b.h1}
          </Leuchtwort>
          <p className="lead">{b.lead}</p>
          <div className="subhero__actions">
            <a className="btn btn--bloom" href={b.mail}>
              <span>{b.cta}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section section--tight wrap" aria-labelledby="womit-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="womit-title">
            {b.womitH2}
          </Leuchtwort>
        </div>
        <ul className="fields">
          {b.womit.map((w, i) => (
            <li key={w.titel} className={`field${FARBEN[i]}`} data-calm="">
              <svg className="species" viewBox="0 0 64 64" aria-hidden="true" data-anchor="">
                <use href={`#${ARTEN[i]}`} />
              </svg>
              <h3>{w.titel}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap" aria-labelledby="wie-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="wie-title">
            {b.wieH2}
          </Leuchtwort>
        </div>
        <ol className="steps" data-calm="" data-anchor="">
          {b.wie.map((w) => (
            <li key={w.titel}>
              <h3>{w.titel}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ol>
        <div className="subhero__actions">
          <MailKnopf href={b.mail} text={b.cta} lila />
        </div>
      </section>

      <KontaktBluete sprache={sprache} titel={t.start.kontaktH2} />
    </>
  );
}
