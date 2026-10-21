import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon } from '@/components/Blatt';
import { KontaktBluete, Kriterien, Lichtung, MailKnopf, Portraet, Projekte, spracheAus, WeiterLink } from '@/components/Bausteine';
import { Leuchtwort } from '@/components/Leuchtwort';
import { inhalt } from '@/lib/inhalt';
import { seitenMeta } from '@/lib/meta';
import { pfad } from '@/lib/routen';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return seitenMeta('start', await spracheAus(params));
}

export default async function Startseite({ params }: { params: Promise<{ lang: string }> }) {
  const sprache = await spracheAus(params);
  const t = inhalt(sprache);
  const s = t.start;

  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="rosette-anchor" id="rosette" aria-hidden="true" />
        <div className="hero__text" data-calm="">
          <Leuchtwort as="h1" id="hero-title">
            {s.h1}
          </Leuchtwort>
          <p className="lead">{s.lead}</p>
          <div className="hero__actions">
            <Link className="btn btn--bloom" href={pfad('strategie', sprache)}>
              <span>{s.cta1}</span>
              <Icon name="right" />
            </Link>
            <Link className="textlink" href={pfad('kontakt', sprache)}>
              <span>{s.cta2}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap" id="projekte" aria-labelledby="projekte-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="projekte-title">
            {s.projekteH2}
          </Leuchtwort>
          <p className="lead">{s.projekteLead}</p>
        </div>
        <Projekte projekte={t.projekte} neuerTab={t.ui.neuerTab} websiteFolgt={s.websiteFolgt} />
      </section>

      <section className="section wrap" id="strategie" aria-labelledby="strategie-title">
        <div className="section__head" data-calm="">
          <Leuchtwort as="h2" id="strategie-title">
            {s.strategieH2}
          </Leuchtwort>
          <p className="lead">{s.strategieLead}</p>
        </div>
        <div className="clearings clearings--zeilen">
          <Lichtung id="startups-title" titel={s.startupsH3}>
            <p className="clearing__text">{s.startupsText}</p>
            <Kriterien liste={t.startups.kriterien} />
            <div className="clearing__links">
              <MailKnopf href={t.startups.mail} text={t.startups.cta} />
              <WeiterLink href={pfad('strategie', sprache)}>{s.zurStrategie}</WeiterLink>
            </div>
          </Lichtung>
          <Lichtung id="immo-title" titel={s.immoH3} farbe="lilac">
            <p className="clearing__text">{s.immoText}</p>
            <Kriterien liste={t.immobilien.kriterien} />
            <div className="clearing__links">
              <MailKnopf href={t.immobilien.mail} text={t.immobilien.cta} lila />
              <WeiterLink href={pfad('ankaufsprofil', sprache)}>{s.zumProfil}</WeiterLink>
            </div>
          </Lichtung>
        </div>
      </section>

      <section className="section wrap" id="bauen" aria-labelledby="bauen-title">
        <div className="split">
          <div className="section__head" data-calm="">
            <Leuchtwort as="h2" id="bauen-title">
              {s.bauenH2}
            </Leuchtwort>
            <p className="lead">{s.bauenText}</p>
            <div className="subhero__actions">
              <MailKnopf href={t.bauen.mail} text={s.bauenCta} />
              <WeiterLink href={pfad('bauen', sprache)}>{t.bauen.titel}</WeiterLink>
            </div>
          </div>
          <ul className="vein-list vein-list--lilac" data-calm="" data-anchor="">
            {t.bauen.womit.map((w) => (
              <li key={w.titel}>
                <h3>{w.titel}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" id="ueber-uns" aria-labelledby="about-title">
        <div className="about">
          <Portraet text={t.ueber.portraet} />
          <div className="about__text" data-calm="">
            <Leuchtwort as="h2" id="about-title">
              {s.ueberH2}
            </Leuchtwort>
            <p className="role">{t.ueber.rolle}</p>
            <p className="bio">{s.ueberText}</p>
            <div className="about__links">
              <WeiterLink href={pfad('ueber', sprache)}>{s.ueberCta}</WeiterLink>
            </div>
          </div>
        </div>
      </section>

      <KontaktBluete sprache={sprache} titel={s.kontaktH2} />
    </>
  );
}
