import type { Metadata } from 'next';
import { KontaktBluete, Kriterien, Lichtung, MailKnopf, spracheAus, WeiterLink } from '@/components/Bausteine';
import { Leuchtwort } from '@/components/Leuchtwort';
import { inhalt } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { pfad, SPRACHEN } from '@/lib/routen';

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache).strategie;
  return seitenMeta('strategie', sprache, t.titel, t.lead);
}

export default async function Strategie({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache);
  const s = t.strategie;

  return (
    <>
      <section className="subhero wrap" aria-labelledby="seite-title">
        <div className="rosette-anchor rosette-anchor--sub" id="rosette" data-art="1" data-farben="0,2,3" data-blaetter="13" aria-hidden="true" />
        <div className="subhero__text" data-calm="">
          <Leuchtwort as="h1" id="seite-title">
            {s.h1}
          </Leuchtwort>
          <p className="lead">{s.lead}</p>
        </div>
      </section>

      <section className="section section--tight wrap" aria-labelledby="startups-title">
        <div className="split">
          <div data-calm="">
            <Leuchtwort as="h2" id="startups-title">
              {s.startupsH2}
            </Leuchtwort>
            <div className="prose">
              {s.startupsText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="list-title">{s.schickenH3}</h3>
            <ul className="vein-list vein-list--plain">
              {s.schicken.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <Lichtung id="startups-kriterien" titel={t.startups.titel}>
            <Kriterien liste={t.startups.kriterien} />
            <div className="clearing__links">
              <MailKnopf href={t.startups.mail} text={t.startups.cta} />
            </div>
          </Lichtung>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="immo-title">
        <div className="split">
          <div data-calm="">
            <Leuchtwort as="h2" id="immo-title">
              {s.immoH2}
            </Leuchtwort>
            <div className="prose">
              {s.immoText.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="subhero__actions">
              <WeiterLink href={pfad('ankaufsprofil', sprache)}>{t.start.zumProfil}</WeiterLink>
            </div>
          </div>
          <Lichtung id="immo-kriterien" titel={t.immobilien.titel} farbe="lilac">
            <Kriterien liste={t.immobilien.kriterien} />
            <div className="clearing__links">
              <MailKnopf href={t.immobilien.mail} text={t.immobilien.cta} lila />
            </div>
          </Lichtung>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="prinzipien-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="prinzipien-title">
            {s.prinzipienH2}
          </Leuchtwort>
        </div>
        <ul className="principles" data-calm="" data-anchor="">
          {s.prinzipien.map((p) => (
            <li key={p.titel}>
              <h3>{p.titel}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <KontaktBluete sprache={sprache} titel={t.start.kontaktH2} />
    </>
  );
}
