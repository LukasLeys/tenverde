import type { Seite, Sprache } from './routen';

export type NavEintrag = { seite: Seite; text: string };
export type Kontaktweg = { titel: string; text: string; cta: string; key: 'startups' | 'immobilien' | 'bauen' };

// Alle sichtbaren Texte der Website. Fakten stammen aus PRODUCT.md und den Angaben von Lukas Leys.
// Keine Gedankenstriche, keine Emojis, keine erfundenen Zahlen oder Referenzen.

export const EMAIL = 'office@tenverde.at';
export const LINKEDIN = 'https://www.linkedin.com/in/lukasleys/';
export const ADRESSE = {
  firma: 'tenverde GmbH',
  strasse: 'Kirschentalgasse 14/D21',
  ort: '6020 Innsbruck',
};

export type Projekt = {
  name: string;
  /** Ohne url wird kein Link gezeigt, z. B. solange die Website noch nicht erreichbar ist. */
  url?: string;
  anzeige: string;
  art: 'leaf-1' | 'leaf-2' | 'leaf-3' | 'leaf-4' | 'leaf-5';
  farbe: 'cyan' | 'moss' | 'lilac' | 'ice';
  feld: string;
  text: string;
};

export type Kriterium = { k: string; v: string };

export type Station = {
  zeit?: string;
  titel: string;
  ort?: string;
  text: string;
  link?: { href: string; text: string };
  /** true: aus öffentlichem Profil übernommen und noch nicht von Lukas bestätigt. Wird live nicht gezeigt. */
  pruefen?: boolean;
};

function mailto(betreff: string, text?: string) {
  const q = new URLSearchParams({ subject: betreff });
  if (text) q.set('body', text);
  return `mailto:${EMAIL}?${q.toString().replace(/\+/g, '%20')}`;
}

const de = {
  meta: {
    titel: 'tenverde GmbH · Beteiligungen, Startups und Immobilien in Innsbruck und Wien',
    kurz: 'tenverde',
    beschreibung:
      'tenverde ist die Beteiligungsgesellschaft von Lukas Leys in Innsbruck. Softwareunternehmen, frühe Beteiligungen an Startups und Wohnungen in Innsbruck und Wien.',
  },
  ui: {
    skip: 'Zum Inhalt springen',
    marke: 'tenverde, zur Startseite',
    navLabel: 'Hauptnavigation',
    menue: 'Menü',
    menueZu: 'Menü schließen',
    sprache: 'Sprache wählen',
    neuerTab: '(öffnet in neuem Tab)',
    kopieren: 'Adresse kopieren',
    kopiert: 'Kopiert',
    kopierFehler: 'Bitte markieren und kopieren',
    zurueck: 'Zur Startseite',
    land: 'Österreich',
    fussNav: 'Weitere Seiten',
    rechtliches: 'Rechtliches',
  },
  nav: [
    { seite: 'strategie', text: 'Strategie' },
    { seite: 'ankaufsprofil', text: 'Ankaufsprofil' },
    { seite: 'bauen', text: 'Projekte bauen' },
    { seite: 'ueber', text: 'Über mich' },
    { seite: 'kontakt', text: 'Kontakt' },
  ] as NavEintrag[],
  fuss: {
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    zeile: 'Beteiligungen, Startups und Immobilien. Innsbruck und Wien.',
  },

  start: {
    // Geschütztes Leerzeichen hält „die wachsen.“ zusammen: Umbruch wie im Entwurf.
    h1: 'Wir investieren in Dinge, die\u00A0wachsen.',
    lead:
      'tenverde ist meine Beteiligungsgesellschaft mit Sitz in Innsbruck. Ich baue Softwareunternehmen auf, beteilige mich früh an Startups und kaufe Wohnungen in Innsbruck und Wien.',
    cta1: 'Was ich suche',
    cta2: 'Kontakt aufnehmen',
    projekteH2: 'Projekte, die ich selbst aufbaue',
    projekteLead: 'Software für Recht, Immobilien und Unternehmen, dazu ein Podcast über Krypto. Alles liegt unter dem Dach von tenverde.',
    websiteFolgt: 'Website folgt',
    strategieH2: 'Wo ich investiere',
    strategieLead:
      'tenverde investiert eigenes Kapital und hält langfristig. Ich entscheide selbst und schnell, ohne Fonds und ohne Komitee.',
    startupsH3: 'Startups, früh',
    startupsText: 'Am liebsten bin ich von Anfang an dabei, wenn ein Team noch klein ist und das Produkt gerade entsteht.',
    immoH3: 'Wohnungen in Innsbruck und Wien',
    immoText: 'Ich kaufe vor allem Wohnungen mit 2 bis 3 Zimmern, bevorzugt Neubau. Wohnungen, die sich für Airbnb eignen, immer gern.',
    zurStrategie: 'Strategie lesen',
    zumProfil: 'Zum Ankaufsprofil',
    bauenH2: 'Ich baue auch gern mit.',
    bauenText:
      'Neben dem Investieren baue ich selbst Projekte. Wenn Sie etwas aufbauen wollen und dafür jemanden suchen, der mit anpackt, melden Sie sich. Wir schauen uns Ihr Projekt gemeinsam an.',
    bauenCta: 'Projekt vorstellen',
    ueberH2: 'Lukas Leys',
    ueberText:
      'Ich gründe Softwareunternehmen, investiere in junge Firmen und kaufe Wohnungen. tenverde bündelt das unter einem Dach. Was ich aufbaue, will ich lange halten und in Ruhe wachsen lassen.',
    superhost: 'Airbnb Superhost',
    ueberCta: 'Mehr über mich',
    kontaktH2: 'Schreiben Sie mir.',
  },

  projekte: [
    {
      name: 'neojuris.ai',
      url: 'https://neojuris.ai',
      anzeige: 'neojuris.ai',
      art: 'leaf-4',
      farbe: 'cyan',
      feld: 'Recht und KI',
      text: 'KI-Software für juristische Arbeit. Recherche, Entwürfe und Prüfung von Dokumenten für Kanzleien und Rechtsabteilungen.',
    },
    {
      name: 'immobily.io',
      url: 'https://immobily.io',
      anzeige: 'immobily.io',
      art: 'leaf-2',
      farbe: 'moss',
      feld: 'Immobilien',
      text: 'KI-Agent für Immobilien in Österreich. Behält Immobilie, Markt und Recht im Blick, erkennt Chancen und erinnert rechtzeitig. Für Eigentümer, Vermieter, Makler und Investoren.',
    },
    {
      name: 'beamswerk.ai',
      anzeige: 'beamswerk.ai',
      art: 'leaf-5',
      farbe: 'lilac',
      feld: 'KI für Unternehmen',
      text: 'KI-Anwendungen für Unternehmen. Automatisierung von Abläufen, die heute noch von Hand laufen.',
    },
    {
      name: 'Die Kryptologen',
      url: 'https://diekryptologen.com/',
      anzeige: 'diekryptologen.com',
      art: 'leaf-1',
      farbe: 'ice',
      feld: 'Podcast',
      text: 'Der Krypto-Podcast aus Wien. Bitcoin, Blockchain und Kryptoökonomie verständlich eingeordnet.',
    },
  ] satisfies Projekt[],

  startups: {
    titel: 'Startup-Beteiligungen',
    kriterien: [
      { k: 'Phase', v: 'Pre-Seed und Seed, wenn möglich von Anfang an' },
      { k: 'Branchen', v: 'Software, KI, LegalTech, PropTech' },
      { k: 'Region', v: 'Österreich, Deutschland, Schweiz' },
      { k: 'Ticket', v: 'nach Absprache' },
      { k: 'Dazu', v: 'Erfahrung aus Gründung, Produkt und Recht. Kontakte zu Kanzleien und in die Immobilienbranche.' },
    ] satisfies Kriterium[],
    cta: 'Pitch Deck senden',
    mail: mailto('Pitch Deck', 'Hallo Lukas,\n\nanbei unser Pitch Deck.\n\nTeam:\nProdukt:\nStand der Finanzierung:\n\nViele Grüße'),
  },

  immobilien: {
    titel: 'Ankaufsprofil Wohnungen',
    kriterien: [
      { k: 'Lage', v: 'Innsbruck und Umgebung, Wien' },
      { k: 'Objekt', v: 'Wohnungen mit 2 bis 3 Zimmern' },
      { k: 'Zustand', v: 'bevorzugt Neubau' },
      { k: 'Nutzung', v: 'Wohnungen, die sich für Airbnb eignen, immer gern' },
      { k: 'Ankauf', v: 'direkt von Eigentümern oder über Makler, auch off-market' },
    ] satisfies Kriterium[],
    cta: 'Exposé senden',
    mail: mailto(
      'Immobilie',
      'Hallo Lukas,\n\nich habe eine Wohnung für Sie.\n\nLage:\nZimmer und Fläche:\nBaujahr oder Neubau:\nPreisvorstellung:\n\nExposé und Fotos im Anhang.\n\nViele Grüße',
    ),
  },

  strategie: {
    titel: 'Strategie',
    h1: 'Früh dabei. Lange dabei.',
    lead:
      'tenverde investiert eigenes Kapital in zwei Felder: junge Softwareunternehmen und Wohnungen in Innsbruck und Wien. Ich entscheide selbst und schnell, ohne Fonds und ohne Komitee, und halte langfristig.',
    startupsH2: 'Ich steige gern früh ein.',
    startupsText: [
      'Am liebsten bin ich von Anfang an dabei, wenn ein Team noch klein ist und ein Produkt gerade entsteht. Genau dort helfen Erfahrung aus Gründung, Produkt und Recht am meisten.',
      'Ich baue selbst Software für Recht, Immobilien und Unternehmen. Gründerinnen und Gründer bekommen deshalb jemanden, der die Arbeit kennt und mitdenkt.',
    ],
    schickenH3: 'Was ich zum Start brauche',
    schicken: ['Ihr Pitch Deck', 'ein paar Sätze zu Team und Produkt', 'den Stand der aktuellen Finanzierungsrunde'],
    immoH2: 'Wohnungen in Innsbruck und Wien.',
    immoText: [
      'Bei Immobilien konzentriere ich mich auf zwei Städte: Innsbruck und Wien. Ich suche vor allem Wohnungen mit 2 bis 3 Zimmern, bevorzugt Neubau.',
      'Als Airbnb Superhost weiß ich, worauf es bei Wohnungen für die kurzfristige Vermietung ankommt. Solche Wohnungen sind mir immer willkommen.',
    ],
    prinzipienH2: 'Wie ich investiere',
    prinzipien: [
      { titel: 'Eigenes Kapital', text: 'tenverde investiert eigenes Geld. Es gibt keine Investoren, denen ich berichten muss.' },
      { titel: 'Schnelle Entscheidung', text: 'Ich entscheide selbst, ohne Fonds und ohne Komitee. Sie wissen bald, woran Sie sind.' },
      { titel: 'Langer Atem', text: 'Was ich kaufe und aufbaue, will ich lange halten und in Ruhe wachsen lassen.' },
    ],
  },

  ankauf: {
    titel: 'Ankaufsprofil',
    h1: 'Ich kaufe Wohnungen in Innsbruck und Wien.',
    lead:
      'Sie verkaufen eine Wohnung oder betreuen als Makler ein passendes Objekt? Hier steht, wonach ich suche. Ich kaufe direkt, entscheide selbst und rasch.',
    profilH2: 'Das Profil',
    airbnbH2: 'Gern auch für Airbnb.',
    airbnbText:
      'Ich bin selbst Airbnb Superhost. Wohnungen, die sich für die kurzfristige Vermietung eignen, sind mir deshalb immer willkommen: gute Lage, sinnvoller Grundriss, eine Hausordnung, die es zulässt.',
    brauchtH2: 'Was ich von Ihnen brauche',
    braucht: [
      'Lage mit Adresse oder Bezirk',
      'Zimmer, Wohnfläche und Stockwerk',
      'Baujahr oder Hinweis auf Neubau',
      'Preisvorstellung',
      'Exposé, Grundriss und Fotos, soweit vorhanden',
    ],
    maklerH2: 'Makler sind willkommen.',
    maklerText: 'Ob direkt vom Eigentümer oder über einen Makler: Ich prüfe jedes passende Angebot, auch off-market. Schicken Sie die Unterlagen, ich melde mich, sobald ich sie gesehen habe.',
  },

  bauen: {
    titel: 'Projekte bauen',
    h1: 'Lassen Sie uns etwas bauen.',
    lead:
      'Ich investiere nicht nur, ich baue auch selbst gern. Wenn Sie ein Projekt haben und jemanden suchen, der mitbaut, schreiben Sie mir. Wir schauen uns Ihr Projekt gemeinsam an.',
    womitH2: 'Woran ich baue',
    womit: [
      { titel: 'Software und KI', text: 'Mit neojuris.ai und beamswerk.ai baue ich KI-Software für Recht und für Unternehmen.' },
      { titel: 'Immobilien', text: 'immobily.io ist ein KI-Agent für Immobilien in Österreich. Dazu kaufe und vermiete ich selbst.' },
      { titel: 'Medien', text: 'Mit Die Kryptologen erklären wir Bitcoin, Blockchain und Kryptoökonomie verständlich.' },
    ],
    wieH2: 'Wie wir anfangen',
    wie: [
      { titel: 'Sie schreiben mir', text: 'Ein paar Sätze reichen: was Sie bauen wollen, wo Sie stehen und was Sie suchen.' },
      { titel: 'Wir schauen es uns an', text: 'In einem Gespräch gehen wir Ihr Projekt gemeinsam durch.' },
      { titel: 'Wir entscheiden', text: 'Passt es, überlegen wir, wie wir zusammenarbeiten: als Mitgründer, Investor oder Partner.' },
    ],
    cta: 'Projekt vorstellen',
    mail: mailto('Projekt', 'Hallo Lukas,\n\nich möchte Ihnen ein Projekt vorstellen.\n\nWorum es geht:\nWo wir stehen:\nWas wir suchen:\n\nViele Grüße'),
  },

  ueber: {
    titel: 'Über mich',
    h1: 'Lukas Leys',
    rolle: 'Gründer und Geschäftsführer der tenverde GmbH',
    text: [
      'Ich gründe Softwareunternehmen, investiere in junge Firmen und kaufe Wohnungen in Innsbruck und Wien. tenverde bündelt das unter einem Dach.',
      'Was ich aufbaue, will ich lange halten und in Ruhe wachsen lassen. Das gilt für Firmen genauso wie für Wohnungen.',
    ],
    portraet: 'Porträt Lukas Leys folgt',
    superhost: 'Airbnb Superhost',
    superhostText: 'Ich vermiete selbst über Airbnb und bin dort Superhost.',
    lebenslaufH2: 'Lebenslauf',
    pruefenHinweis: 'Aus öffentlichem Profil übernommen, bitte bestätigen',
    stationen: [
      {
        zeit: 'heute',
        titel: 'tenverde GmbH',
        ort: 'Innsbruck',
        text: 'Gründer und Geschäftsführer. Beteiligungsgesellschaft für meine Softwareunternehmen, Startup-Beteiligungen und Immobilien.',
      },
      {
        zeit: 'heute',
        titel: 'neojuris.ai',
        ort: 'Innsbruck',
        text: 'Aufbau einer KI-Software für juristische Arbeit: Recherche, Entwürfe und Prüfung von Dokumenten.',
        link: { href: 'https://neojuris.ai', text: 'neojuris.ai' },
      },
      {
        zeit: 'heute',
        titel: 'immobily.io',
        text: 'Aufbau eines KI-Agenten für Immobilien in Österreich, für Eigentümer, Vermieter, Makler und Investoren.',
        link: { href: 'https://immobily.io', text: 'immobily.io' },
      },
      {
        zeit: 'heute',
        titel: 'beamswerk.ai',
        text: 'Aufbau von KI-Anwendungen, die Abläufe in Unternehmen automatisieren.',
      },
      {
        zeit: 'heute',
        titel: 'Die Kryptologen',
        ort: 'Wien',
        text: 'Podcast über Bitcoin, Blockchain und Kryptoökonomie.',
        link: { href: 'https://diekryptologen.com/', text: 'diekryptologen.com' },
      },
      {
        zeit: 'heute',
        titel: 'Airbnb Superhost',
        text: 'Kurzzeitvermietung von Wohnungen über Airbnb.',
      },
      {
        zeit: 'seit 2020',
        titel: 'kontractory',
        ort: 'Wien',
        text: 'Gründer und CEO eines Legal-Tech-Unternehmens.',
        pruefen: true,
      },
      {
        zeit: '2021 bis 2023',
        titel: 'Podcast Krypto.Logisch',
        text: 'Gastgeber eines Podcasts über Krypto.',
        pruefen: true,
      },
      {
        titel: 'Validvent',
        text: 'Mitgründer. Beratung zu Krypto und Staking.',
        pruefen: true,
      },
      {
        zeit: '2018',
        titel: 'Rechtsfux',
        text: 'Gründer.',
        pruefen: true,
      },
      {
        titel: 'Ehrenamt',
        text: 'Chainlink Community Advocate in Österreich. Co-Leitung einer NEOS-Arbeitsgruppe zur Kryptoökonomie.',
        pruefen: true,
      },
    ] satisfies Station[],
    themenH2: 'Themen, die mich beschäftigen',
    themen: ['Recht und LegalTech', 'Künstliche Intelligenz', 'Immobilien', 'Kurzzeitvermietung', 'Krypto und Blockchain', 'Frühe Startups'],
    linkedin: 'Profil auf LinkedIn',
  },

  kontakt: {
    titel: 'Kontakt',
    h1: 'Schreiben Sie mir.',
    lead: 'Am schnellsten erreichen Sie mich per E-Mail. Sagen Sie kurz, worum es geht, und schicken Sie mit, was Sie haben.',
    wege: [
      { titel: 'Startup', text: 'Pitch Deck, ein paar Sätze zu Team und Produkt, Stand der Runde.', cta: 'Pitch Deck senden', key: 'startups' },
      { titel: 'Immobilie', text: 'Lage, Zimmer, Fläche, Preisvorstellung, Exposé und Fotos.', cta: 'Exposé senden', key: 'immobilien' },
      { titel: 'Projekt', text: 'Was Sie bauen wollen, wo Sie stehen und was Sie suchen.', cta: 'Projekt vorstellen', key: 'bauen' },
    ] as Kontaktweg[],
    anliegenH2: 'Worum geht es?',
    adresseH2: 'Post',
    mailHinweis: 'Falls sich kein E-Mail-Programm öffnet, kopieren Sie die Adresse.',
  },

  rechtliches: {
    platzhalter: 'ergänzen',
  },

  nichtGefunden: {
    titel: 'Seite nicht gefunden',
    h1: 'Hier wächst noch nichts.',
    text: 'Diese Seite gibt es nicht oder nicht mehr. Vielleicht hilft einer dieser Wege weiter.',
  },
};

export type Inhalt = typeof de;

const en: Inhalt = {
  meta: {
    titel: 'tenverde GmbH · Investments, startups and real estate in Innsbruck and Vienna',
    kurz: 'tenverde',
    beschreibung:
      'tenverde is the holding company of Lukas Leys in Innsbruck. Software companies, early stakes in startups and apartments in Innsbruck and Vienna.',
  },
  ui: {
    skip: 'Skip to content',
    marke: 'tenverde, to the home page',
    navLabel: 'Main navigation',
    menue: 'Menu',
    menueZu: 'Close menu',
    sprache: 'Choose language',
    neuerTab: '(opens in a new tab)',
    kopieren: 'Copy address',
    kopiert: 'Copied',
    kopierFehler: 'Please select and copy',
    zurueck: 'Back to home',
    land: 'Austria',
    fussNav: 'More pages',
    rechtliches: 'Legal',
  },
  nav: [
    { seite: 'strategie', text: 'Strategy' },
    { seite: 'ankaufsprofil', text: 'Acquisition profile' },
    { seite: 'bauen', text: 'Build with me' },
    { seite: 'ueber', text: 'About' },
    { seite: 'kontakt', text: 'Contact' },
  ],
  fuss: {
    impressum: 'Legal notice',
    datenschutz: 'Privacy',
    zeile: 'Investments, startups and real estate. Innsbruck and Vienna.',
  },

  start: {
    h1: 'We invest in things that grow.',
    lead:
      'tenverde is my holding company, based in Innsbruck. I build software companies, invest early in startups and buy apartments in Innsbruck and Vienna.',
    cta1: 'What I look for',
    cta2: 'Get in touch',
    projekteH2: 'Projects I am building',
    projekteLead: 'Software for law, real estate and businesses, plus a podcast about crypto. All of it sits under the tenverde roof.',
    websiteFolgt: 'Website coming soon',
    strategieH2: 'Where I invest',
    strategieLead: 'tenverde invests its own capital and holds for the long term. I decide myself and quickly, with no fund and no committee.',
    startupsH3: 'Startups, early',
    startupsText: 'I like to be there from the very start, while the team is still small and the product is taking shape.',
    immoH3: 'Apartments in Innsbruck and Vienna',
    immoText: 'Mostly apartments with 2 to 3 rooms, ideally new builds. Apartments suited to Airbnb are always welcome.',
    zurStrategie: 'Read the strategy',
    zumProfil: 'See the acquisition profile',
    bauenH2: 'I like to build, too.',
    bauenText:
      'Besides investing, I build projects myself. If you want to build something and are looking for someone to roll up their sleeves with you, get in touch. We will look at your project together.',
    bauenCta: 'Present your project',
    ueberH2: 'Lukas Leys',
    ueberText:
      'I found software companies, invest in young businesses and buy apartments. tenverde brings all of it under one roof. What I build, I intend to hold for a long time and let grow at its own pace.',
    superhost: 'Airbnb Superhost',
    ueberCta: 'More about me',
    kontaktH2: 'Write to me.',
  },

  projekte: [
    { ...de.projekte[0], feld: 'Law and AI', text: 'AI software for legal work. Research, drafting and document review for law firms and in-house teams.' },
    { ...de.projekte[1], feld: 'Real estate', text: 'AI agent for real estate in Austria. Keeps an eye on property, market and law, spots opportunities and sends timely reminders. For owners, landlords, agents and investors.' },
    { ...de.projekte[2], feld: 'AI for businesses', text: 'AI applications for businesses. Automating workflows that still run by hand today.' },
    { ...de.projekte[3], feld: 'Podcast', text: 'The crypto podcast from Vienna. Bitcoin, blockchain and the crypto economy explained clearly.' },
  ],

  startups: {
    titel: 'Startup investments',
    kriterien: [
      { k: 'Stage', v: 'Pre-seed and seed, from the very start if possible' },
      { k: 'Sectors', v: 'Software, AI, LegalTech, PropTech' },
      { k: 'Region', v: 'Austria, Germany, Switzerland' },
      { k: 'Ticket', v: 'by arrangement' },
      { k: 'Plus', v: 'Experience in founding, product and law. Contacts to law firms and the real estate industry.' },
    ],
    cta: 'Send pitch deck',
    mail: mailto('Pitch deck', 'Hi Lukas,\n\nplease find our pitch deck attached.\n\nTeam:\nProduct:\nFunding round:\n\nBest regards'),
  },

  immobilien: {
    titel: 'Apartment acquisition profile',
    kriterien: [
      { k: 'Location', v: 'Innsbruck and surroundings, Vienna' },
      { k: 'Property', v: 'Apartments with 2 to 3 rooms' },
      { k: 'Condition', v: 'ideally new builds' },
      { k: 'Use', v: 'apartments suited to Airbnb are always welcome' },
      { k: 'Deals', v: 'directly from owners or through agents, off-market welcome' },
    ],
    cta: 'Send exposé',
    mail: mailto(
      'Property',
      'Hi Lukas,\n\nI have an apartment for you.\n\nLocation:\nRooms and size:\nYear built or new build:\nAsking price:\n\nExposé and photos attached.\n\nBest regards',
    ),
  },

  strategie: {
    titel: 'Strategy',
    h1: 'In early. In for the long run.',
    lead:
      'tenverde invests its own capital in two fields: young software companies and apartments in Innsbruck and Vienna. I decide myself and quickly, with no fund and no committee, and hold for the long term.',
    startupsH2: 'I like to come in early.',
    startupsText: [
      'I prefer to be there from the very start, while the team is still small and a product is taking shape. That is where experience in founding, product and law helps most.',
      'I build software for law, real estate and businesses myself. Founders get someone who knows the work and thinks along.',
    ],
    schickenH3: 'What I need to start',
    schicken: ['your pitch deck', 'a few sentences on team and product', 'the status of your current funding round'],
    immoH2: 'Apartments in Innsbruck and Vienna.',
    immoText: [
      'In real estate I focus on two cities: Innsbruck and Vienna. I mainly look for apartments with 2 to 3 rooms, ideally new builds.',
      'As an Airbnb Superhost I know what matters for short-term rentals. Apartments suited to that are always welcome.',
    ],
    prinzipienH2: 'How I invest',
    prinzipien: [
      { titel: 'Own capital', text: 'tenverde invests its own money. There are no investors I report to.' },
      { titel: 'Quick decisions', text: 'I decide myself, with no fund and no committee. You will soon know where you stand.' },
      { titel: 'Patience', text: 'What I buy and build, I intend to hold for a long time and let grow at its own pace.' },
    ],
  },

  ankauf: {
    titel: 'Acquisition profile',
    h1: 'I buy apartments in Innsbruck and Vienna.',
    lead:
      'Are you selling an apartment, or do you represent a suitable property as an agent? This is what I am looking for. I buy directly and decide myself, quickly.',
    profilH2: 'The profile',
    airbnbH2: 'Airbnb welcome.',
    airbnbText:
      'I am an Airbnb Superhost myself. Apartments suited to short-term rentals are therefore always welcome: a good location, a sensible layout and house rules that allow it.',
    brauchtH2: 'What I need from you',
    braucht: [
      'location with address or district',
      'rooms, floor area and floor',
      'year built or a note on new build',
      'asking price',
      'exposé, floor plan and photos, where available',
    ],
    maklerH2: 'Agents are welcome.',
    maklerText:
      'Directly from the owner or through an agent: I review every suitable offer, off-market too. Send the documents and I will get back to you once I have seen them.',
  },

  bauen: {
    titel: 'Build with me',
    h1: 'Let us build something.',
    lead:
      'I do more than invest, I also like to build. If you have a project and are looking for someone to build it with, write to me. We will look at your project together.',
    womitH2: 'What I build',
    womit: [
      { titel: 'Software and AI', text: 'With neojuris.ai and beamswerk.ai I build AI software for law and for businesses.' },
      { titel: 'Real estate', text: 'immobily.io is an AI agent for real estate in Austria. I also buy and rent out apartments myself.' },
      { titel: 'Media', text: 'With Die Kryptologen we explain bitcoin, blockchain and the crypto economy clearly.' },
    ],
    wieH2: 'How we start',
    wie: [
      { titel: 'You write to me', text: 'A few sentences are enough: what you want to build, where you are and what you are looking for.' },
      { titel: 'We take a look', text: 'We go through your project together in a conversation.' },
      { titel: 'We decide', text: 'If it fits, we work out how to collaborate: as co-founder, investor or partner.' },
    ],
    cta: 'Present your project',
    mail: mailto('Project', 'Hi Lukas,\n\nI would like to present a project to you.\n\nWhat it is about:\nWhere we are:\nWhat we are looking for:\n\nBest regards'),
  },

  ueber: {
    titel: 'About',
    h1: 'Lukas Leys',
    rolle: 'Founder and managing director of tenverde GmbH',
    text: [
      'I found software companies, invest in young businesses and buy apartments in Innsbruck and Vienna. tenverde brings all of it under one roof.',
      'What I build, I intend to hold for a long time and let grow at its own pace. That goes for companies as much as for apartments.',
    ],
    portraet: 'Portrait of Lukas Leys to follow',
    superhost: 'Airbnb Superhost',
    superhostText: 'I rent out apartments on Airbnb myself and I am a Superhost there.',
    lebenslaufH2: 'Résumé',
    pruefenHinweis: 'Taken from a public profile, please confirm',
    stationen: [
      { ...de.ueber.stationen[0], zeit: 'today', text: 'Founder and managing director. Holding company for my software companies, startup stakes and real estate.' },
      { ...de.ueber.stationen[1], zeit: 'today', text: 'Building AI software for legal work: research, drafting and document review.' },
      { ...de.ueber.stationen[2], zeit: 'today', text: 'Building an AI agent for real estate in Austria, for owners, landlords, agents and investors.' },
      { ...de.ueber.stationen[3], zeit: 'today', text: 'Building AI applications that automate workflows in companies.', },
      { ...de.ueber.stationen[4], zeit: 'today', ort: 'Vienna', text: 'Podcast about bitcoin, blockchain and the crypto economy.' },
      { ...de.ueber.stationen[5], zeit: 'today', text: 'Short-term rental of apartments on Airbnb.' },
      { ...de.ueber.stationen[6], zeit: 'since 2020', ort: 'Vienna', text: 'Founder and CEO of a legal tech company.' },
      { ...de.ueber.stationen[7], zeit: '2021 to 2023', titel: 'Podcast Krypto.Logisch', text: 'Host of a podcast about crypto.' },
      { ...de.ueber.stationen[8], text: 'Co-founder. Crypto and staking consultancy.' },
      { ...de.ueber.stationen[9], text: 'Founder.' },
      { ...de.ueber.stationen[10], titel: 'Volunteering', text: 'Chainlink Community Advocate in Austria. Co-lead of a NEOS working group on the crypto economy.' },
    ],
    themenH2: 'Topics I work on',
    themen: ['Law and LegalTech', 'Artificial intelligence', 'Real estate', 'Short-term rentals', 'Crypto and blockchain', 'Early-stage startups'],
    linkedin: 'Profile on LinkedIn',
  },

  kontakt: {
    titel: 'Contact',
    h1: 'Write to me.',
    lead: 'Email is the fastest way to reach me. Tell me briefly what it is about and send along what you have.',
    wege: [
      { titel: 'Startup', text: 'Pitch deck, a few sentences on team and product, status of the round.', cta: 'Send pitch deck', key: 'startups' },
      { titel: 'Property', text: 'Location, rooms, floor area, asking price, exposé and photos.', cta: 'Send exposé', key: 'immobilien' },
      { titel: 'Project', text: 'What you want to build, where you are and what you are looking for.', cta: 'Present your project', key: 'bauen' },
    ],
    anliegenH2: 'What is it about?',
    adresseH2: 'Post',
    mailHinweis: 'If no email app opens, copy the address.',
  },

  rechtliches: {
    platzhalter: 'to add',
  },

  nichtGefunden: {
    titel: 'Page not found',
    h1: 'Nothing grows here yet.',
    text: 'This page does not exist or no longer exists. One of these paths may help.',
  },
};

export const INHALT: Record<Sprache, Inhalt> = { de, en };

export function inhalt(sprache: Sprache): Inhalt {
  return INHALT[sprache];
}

/** Unbestätigte Lebenslaufstationen nur in der Vorschau zeigen (TENVERDE_VORSCHAU=1), nie live. */
export const ZEIGE_UNBESTAETIGT = process.env.TENVERDE_VORSCHAU === '1';
