import type { Metadata } from 'next';
import { ExternerLink, KontaktBluete, Portraet, spracheAus } from '@/components/Bausteine';
import { Leuchtwort } from '@/components/Leuchtwort';
import { inhalt, LINKEDIN, ZEIGE_UNBESTAETIGT } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { SPRACHEN } from '@/lib/routen';

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache).ueber;
  return seitenMeta('ueber', sprache, t.titel, t.text[0]);
}

export default async function UeberMich({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache);
  const u = t.ueber;
  const stationen = u.stationen.filter((s) => !s.pruefen || ZEIGE_UNBESTAETIGT);

  return (
    <>
      <section className="subhero wrap" aria-labelledby="seite-title">
        <div className="about">
          <Portraet text={u.portraet} />
          <div className="about__text" data-calm="">
            <Leuchtwort as="h1" id="seite-title">
              {u.h1}
            </Leuchtwort>
            <p className="role">{u.rolle}</p>
            <div className="prose about__prose">
              {u.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="about__links">
              <ExternerLink className="textlink" href={LINKEDIN} neuerTab={t.ui.neuerTab}>
                {u.linkedin}
              </ExternerLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="lebenslauf-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="lebenslauf-title">
            {u.lebenslaufH2}
          </Leuchtwort>
        </div>
        <ol className="timeline" data-calm="" data-anchor="">
          {stationen.map((s, i) => (
            <li key={s.titel} className={s.pruefen ? 'is-pruefen' : undefined}>
              <p className="timeline__zeit">{s.zeit && s.zeit !== stationen[i - 1]?.zeit ? s.zeit : ''}</p>
              <div className="timeline__body">
                <h3>
                  {s.titel}
                  {s.ort ? <span className="timeline__ort">, {s.ort}</span> : null}
                </h3>
                <p>{s.text}</p>
                {s.link ? (
                  <ExternerLink href={s.link.href} neuerTab={t.ui.neuerTab}>
                    {s.link.text}
                  </ExternerLink>
                ) : null}
                {s.pruefen ? <p className="pruefen">{u.pruefenHinweis}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap" aria-labelledby="themen-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="themen-title">
            {u.themenH2}
          </Leuchtwort>
          <ul className="chips">
            {u.themen.map((th) => (
              <li key={th}>{th}</li>
            ))}
          </ul>
        </div>
      </section>

      <KontaktBluete sprache={sprache} titel={t.start.kontaktH2} />
    </>
  );
}
