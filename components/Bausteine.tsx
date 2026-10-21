import Image from 'next/image';
import Link from 'next/link';
import lukasLeys from '@/bilder/lukas-leys.jpg';
import { ADRESSE, EMAIL, TELEFON, inhalt, type Kriterium, type Projekt } from '@/lib/inhalt';
import { istSprache, type Sprache } from '@/lib/routen';
import { notFound } from 'next/navigation';
import { Icon } from './Blatt';
import { KopierAdresse } from './KopierAdresse';
import { Leuchtwort } from './Leuchtwort';

/** Liest die Sprache aus den Routenparametern; alles andere ist eine 404. */
export async function spracheAus(params: Promise<{ lang: string }>): Promise<Sprache> {
  const { lang } = await params;
  if (!istSprache(lang)) notFound();
  return lang;
}

export function ExternerLink({
  href,
  children,
  className,
  neuerTab,
  vor,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  neuerTab: string;
  /** Steht vor dem Linktext, z. B. ein Logo. */
  vor?: React.ReactNode;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener">
      {vor}
      <span>{children}</span>
      <span className="sr-only"> {neuerTab}</span>
      <Icon name="arrow" />
    </a>
  );
}

export function Projekte({ projekte, neuerTab, websiteFolgt }: { projekte: Projekt[]; neuerTab: string; websiteFolgt: string }) {
  return (
    <ul className="growths">
      {projekte.map((p) => (
        <li key={p.name} className={`growth growth--${p.farbe}`} data-bloom="">
          <svg className="species" viewBox="0 0 64 64" aria-hidden="true" data-anchor="">
            <use href={`#${p.art}`} />
          </svg>
          <div className="growth__body" data-calm="">
            <div className="growth__kopf">
              <h3>{p.name}</h3>
              <span className="pille">{p.feld}</span>
            </div>
            <p>{p.text}</p>
            {p.url ? (
              <ExternerLink
                className="ext"
                href={p.url}
                neuerTab={neuerTab}
                vor={p.logo ? <Image className="ext__logo" src={p.logo} alt="" width={24} height={24} /> : null}
              >
                {p.anzeige}
              </ExternerLink>
            ) : (
              <p className="ext ext--bald">{websiteFolgt}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Kriterien({ liste }: { liste: Kriterium[] }) {
  return (
    <dl className="criteria">
      {liste.map((k) => (
        <div key={k.k} style={{ display: 'contents' }}>
          <dt>{k.k}</dt>
          <dd>{k.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Lichtung({
  id,
  titel,
  farbe,
  children,
  as: Tag = 'h3',
}: {
  id: string;
  titel: string;
  farbe?: 'lilac' | 'ice';
  children: React.ReactNode;
  as?: 'h2' | 'h3';
}) {
  return (
    <article className={`clearing${farbe ? ` clearing--${farbe}` : ''}`} data-calm="" data-anchor="" data-ring="" aria-labelledby={id}>
      <Tag id={id}>{titel}</Tag>
      {children}
    </article>
  );
}

export function MailKnopf({ href, text, lila }: { href: string; text: string; lila?: boolean }) {
  return (
    <a className={`btn btn--glow${lila ? ' btn--lilac' : ''}`} href={href}>
      <span>{text}</span>
      <Icon name="mail" />
    </a>
  );
}

export function WeiterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="textlink" href={href}>
      <span>{children}</span>
      <Icon name="right" />
    </Link>
  );
}

export function KontaktBluete({ sprache, titel, mitHinweis }: { sprache: Sprache; titel: string; mitHinweis?: boolean }) {
  const t = inhalt(sprache);
  return (
    <section className="section contact wrap" id="kontakt" aria-labelledby="kontakt-title">
      <div className="contact__bloom" data-calm="" data-anchor="" data-ring="" data-strong="">
        <Leuchtwort as="h2" id="kontakt-title">
          {titel}
        </Leuchtwort>
        <div className="mail-row">
          <a className="mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <KopierAdresse adresse={EMAIL} texte={t.ui} />
          {mitHinweis ? <p className="hint">{t.kontakt.mailHinweis}</p> : null}
        </div>
        <address>
          {ADRESSE.firma}
          <br />
          {ADRESSE.strasse}
          <br />
          {ADRESSE.ort}, {t.ui.land}
          <br />
          <a href={TELEFON.href}>{TELEFON.anzeige}</a>
        </address>
      </div>
    </section>
  );
}

export function Portraet({ text }: { text: string }) {
  return (
    <div className="portrait" data-calm="" data-anchor="" data-ring="">
      <Image src={lukasLeys} alt={text} fill sizes="(max-width: 860px) 17rem, 22rem" placeholder="blur" />
    </div>
  );
}
