import type { Metadata } from 'next';
import { MailKnopf, spracheAus } from '@/components/Bausteine';
import { KopierAdresse } from '@/components/KopierAdresse';
import { Leuchtwort } from '@/components/Leuchtwort';
import { ADRESSE, EMAIL, inhalt } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { SPRACHEN } from '@/lib/routen';

export function generateStaticParams() {
  return SPRACHEN.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache).kontakt;
  return seitenMeta('kontakt', sprache, t.titel, t.lead);
}

export default async function Kontakt({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache);
  const k = t.kontakt;
  const mails = { startups: t.startups.mail, immobilien: t.immobilien.mail, bauen: t.bauen.mail };

  return (
    <>
      <section className="subhero kontakt-hero wrap" aria-labelledby="seite-title">
        <div className="rosette-anchor rosette-anchor--sub" id="rosette" data-art="0" data-farben="3,0,1" data-blaetter="17" aria-hidden="true" />
        <div className="subhero__text" data-calm="">
          <Leuchtwort as="h1" id="seite-title">
            {k.h1}
          </Leuchtwort>
          <p className="lead">{k.lead}</p>
          <div className="kontakt-mail" data-anchor="" data-strong="">
            <a className="mail mail--links" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="kontakt-mail__neben">
              <KopierAdresse adresse={EMAIL} texte={t.ui} />
              <p className="hint">{k.mailHinweis}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight wrap" aria-labelledby="anliegen-title">
        <div className="split">
          <div data-calm="">
            <h2 id="anliegen-title">{k.anliegenH2}</h2>
            <ol className="vein-list routes-list" data-anchor="">
              {k.wege.map((w, i) => (
                <li key={w.key}>
                  <h3>{w.titel}</h3>
                  <p>{w.text}</p>
                  <div className="routes-list__cta">
                    <MailKnopf href={mails[w.key]} text={w.cta} lila={i === 1} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="kontakt-post" data-calm="">
            <h2 className="h-small">{k.adresseH2}</h2>
            <address>
              {ADRESSE.firma}
              <br />
              {ADRESSE.strasse}
              <br />
              {ADRESSE.ort}, {t.ui.land}
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
