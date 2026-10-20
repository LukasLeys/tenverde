import type { Metadata } from 'next';
import { Icon } from '@/components/Blatt';
import { KontaktBluete, Kriterien, Lichtung, MailKnopf, spracheAus } from '@/components/Bausteine';
import { Leuchtwort } from '@/components/Leuchtwort';
import { inhalt } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { SPRACHEN } from '@/lib/routen';

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache).ankauf;
  return seitenMeta('ankaufsprofil', sprache, t.titel, t.lead);
}

export default async function Ankaufsprofil({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache);
  const a = t.ankauf;

  return (
    <>
      <section className="subhero subhero--split wrap" aria-labelledby="seite-title">
        <div className="subhero__text" data-calm="">
          <Leuchtwort as="h1" id="seite-title">
            {a.h1}
          </Leuchtwort>
          <p className="lead">{a.lead}</p>
          <div className="subhero__actions">
            <MailKnopf href={t.immobilien.mail} text={t.immobilien.cta} lila />
          </div>
        </div>
        <Lichtung id="profil-title" titel={a.profilH2} farbe="lilac" as="h2">
          <Kriterien liste={t.immobilien.kriterien} />
        </Lichtung>
      </section>

      <section className="section wrap" aria-labelledby="airbnb-title">
        <div className="split">
          <div data-calm="">
            <Leuchtwort as="h2" id="airbnb-title">
              {a.airbnbH2}
            </Leuchtwort>
            <p className="badge badge--spaced">
              <Icon name="star" />
              {t.ueber.superhost}
            </p>
            <div className="prose">
              <p>{a.airbnbText}</p>
            </div>
          </div>
          <div data-calm="">
            <h2 className="h-small" id="braucht-title">
              {a.brauchtH2}
            </h2>
            <ul className="vein-list vein-list--plain vein-list--lilac" aria-labelledby="braucht-title" data-anchor="">
              {a.braucht.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="makler-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="makler-title">
            {a.maklerH2}
          </Leuchtwort>
          <p className="lead">{a.maklerText}</p>
          <div className="subhero__actions">
            <MailKnopf href={t.immobilien.mail} text={t.immobilien.cta} lila />
          </div>
        </div>
      </section>

      <KontaktBluete sprache={sprache} titel={t.start.kontaktH2} />
    </>
  );
}
