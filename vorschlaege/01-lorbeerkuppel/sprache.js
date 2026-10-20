/* Sprachumschalter DE/EN. Standard DE, Wahl in localStorage 'tenverde-lang', ?lang=en hat Vorrang. */
(function () {
  'use strict';
  var T = {
    de: {
      title: 'tenverde · Beteiligungsgesellschaft in Innsbruck',
      description: 'tenverde ist die Beteiligungsgesellschaft von Lukas Leys mit Sitz in Innsbruck: Softwareunternehmen, Beteiligungen an Startups und Immobilien.',
      skip: 'Zum Inhalt springen',
      navLabel: 'Hauptnavigation',
      homeLabel: 'tenverde, zum Seitenanfang',
      langLabel: 'Sprache wählen',
      navUnternehmen: 'Unternehmen',
      navGesucht: 'Gesucht',
      navUeber: 'Über mich',
      navKontakt: 'Kontakt',
      kuppelLabel: 'Kuppel aus Hunderten vergoldeter tenverde Blätter, nach dem Vorbild der Wiener Secession',
      motto1: 'Wir investieren in Dinge,',
      motto2: 'die wachsen.',
      heroText: 'tenverde ist meine Beteiligungsgesellschaft mit Sitz in Innsbruck. Hier liegen meine Softwareunternehmen, meine Beteiligungen an Startups und meine Immobilien.',
      heroDoor: 'Was ich suche',
      heroContact: 'Kontakt aufnehmen',
      untTitle: 'Unternehmen, die ich selbst aufbaue',
      untNeojuris: 'KI-Software für juristische Arbeit. Recherche, Entwürfe und Prüfung von Dokumenten für Kanzleien und Rechtsabteilungen.',
      untImmobily: 'Software für Immobilien. Digitale Werkzeuge für Eigentümer, Verwalter und Makler.',
      untBeamswerk: 'KI-Anwendungen für Unternehmen. Automatisierung von Abläufen, die heute noch von Hand laufen.',
      untKrypto: 'Der Krypto-Podcast aus Wien. Bitcoin, Blockchain und Kryptoökonomie verständlich eingeordnet.',
      newTab: '(öffnet in neuem Tab)',
      gesTitle: 'Ich suche Startups und Immobilien.',
      gesText: 'tenverde investiert eigenes Kapital und hält langfristig. Ich entscheide selbst und schnell, ohne Fonds und ohne Komitee.',
      stTitle: 'Startup-Beteiligungen',
      stPhaseL: 'Phase',
      stBranchenL: 'Branchen',
      stBranchen: 'Software, KI, LegalTech, PropTech',
      stRegionL: 'Region',
      stRegion: 'Österreich, Deutschland, Schweiz',
      stTicket: 'nach Absprache',
      stDazuL: 'Dazu',
      stDazu: 'Erfahrung aus Gründung, Produkt und Recht. Kontakte zu Kanzleien und in die Immobilienbranche.',
      stAction: 'Pitch Deck senden',
      stSubject: 'Betreff „Pitch Deck“',
      imTitle: 'Immobilien',
      imObjekteL: 'Objekte',
      imObjekte: 'Wohnhäuser, Zinshäuser, Grundstücke mit Widmung',
      imRegionL: 'Region',
      imRegion: 'Tirol und Westösterreich',
      imZustandL: 'Zustand',
      imZustand: 'Bestand, gern mit Sanierungs- oder Entwicklungsbedarf',
      imAnkaufL: 'Ankauf',
      imAnkauf: 'direkt von Eigentümern oder über Makler, auch off-market',
      imAction: 'Exposé senden',
      imSubject: 'Betreff „Immobilie“',
      portrait: 'Porträt Lukas Leys folgt',
      role: 'Gründer und Geschäftsführer der tenverde GmbH',
      aboutText: 'Ich gründe Softwareunternehmen und investiere in junge Firmen und in Immobilien. tenverde bündelt das unter einem Dach. Was ich aufbaue, will ich lange halten und in Ruhe wachsen lassen.',
      linkedin: 'Profil auf LinkedIn',
      contactTitle: 'Schreiben Sie mir.',
      city: '6020 Innsbruck, Österreich',
      legalLabel: 'Rechtliches',
      impressum: 'Impressum',
      datenschutz: 'Datenschutz'
    },
    en: {
      title: 'tenverde · Holding company in Innsbruck',
      description: 'tenverde is the holding company of Lukas Leys, based in Innsbruck: software companies, stakes in startups and real estate.',
      skip: 'Skip to content',
      navLabel: 'Main navigation',
      homeLabel: 'tenverde, back to top',
      langLabel: 'Choose language',
      navUnternehmen: 'Companies',
      navGesucht: 'Looking for',
      navUeber: 'About',
      navKontakt: 'Contact',
      kuppelLabel: 'Dome of hundreds of gilded tenverde leaves, modelled on the Vienna Secession',
      motto1: 'We invest in things',
      motto2: 'that grow.',
      heroText: 'tenverde is my holding company, based in Innsbruck. It holds my software companies, my stakes in startups and my real estate.',
      heroDoor: 'What I look for',
      heroContact: 'Get in touch',
      untTitle: 'Companies I am building',
      untNeojuris: 'AI software for legal work. Research, drafting and document review for law firms and in-house teams.',
      untImmobily: 'Software for real estate. Digital tools for owners, property managers and agents.',
      untBeamswerk: 'AI applications for businesses. Automating workflows that still run by hand today.',
      untKrypto: 'The crypto podcast from Vienna. Bitcoin, blockchain and the crypto economy explained clearly.',
      newTab: '(opens in a new tab)',
      gesTitle: 'I am looking for startups and real estate.',
      gesText: 'tenverde invests its own capital and holds for the long term. I decide myself and quickly, with no fund and no committee.',
      stTitle: 'Startup investments',
      stPhaseL: 'Stage',
      stBranchenL: 'Sectors',
      stBranchen: 'Software, AI, LegalTech, PropTech',
      stRegionL: 'Region',
      stRegion: 'Austria, Germany, Switzerland',
      stTicket: 'by arrangement',
      stDazuL: 'Plus',
      stDazu: 'Experience in founding, product and law. Contacts to law firms and the real estate industry.',
      stAction: 'Send pitch deck',
      stSubject: 'Subject “Pitch Deck”',
      imTitle: 'Real estate',
      imObjekteL: 'Assets',
      imObjekte: 'Residential and multi-family buildings, zoned plots',
      imRegionL: 'Region',
      imRegion: 'Tyrol and western Austria',
      imZustandL: 'Condition',
      imZustand: 'Existing stock, ideally in need of renovation or development',
      imAnkaufL: 'Deals',
      imAnkauf: 'directly from owners or through agents, off-market welcome',
      imAction: 'Send exposé',
      imSubject: 'Subject “Immobilie”',
      portrait: 'Portrait of Lukas Leys to follow',
      role: 'Founder and managing director of tenverde GmbH',
      aboutText: 'I found software companies and invest in young businesses and in real estate. tenverde brings all of it under one roof. What I build, I intend to hold for a long time and let grow at its own pace.',
      linkedin: 'Profile on LinkedIn',
      contactTitle: 'Write to me.',
      city: '6020 Innsbruck, Austria',
      legalLabel: 'Legal',
      impressum: 'Legal notice',
      datenschutz: 'Privacy'
    }
  };

  function apply(lang, persist) {
    var d = T[lang];
    document.documentElement.lang = lang;
    document.title = d.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', d.description);
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (d[key] != null) els[i].textContent = d[key];
    }
    var attrs = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrs.length; j++) {
      attrs[j].getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2 && d[p[1]] != null) attrs[j].setAttribute(p[0], d[p[1]]);
      });
    }
    var btns = document.querySelectorAll('.sprache button');
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute('aria-pressed', btns[k].getAttribute('data-lang') === lang ? 'true' : 'false');
    }
    if (persist) {
      try { localStorage.setItem('tenverde-lang', lang); } catch (e) { /* Speicher nicht verfügbar */ }
    }
  }

  var lang = 'de';
  var fromUrl = null;
  try { fromUrl = new URLSearchParams(window.location.search).get('lang'); } catch (e) { fromUrl = null; }
  if (fromUrl === 'en' || fromUrl === 'de') {
    lang = fromUrl;
  } else {
    try {
      var saved = localStorage.getItem('tenverde-lang');
      if (saved === 'en' || saved === 'de') lang = saved;
    } catch (e) { /* Speicher nicht verfügbar */ }
  }
  apply(lang, false);

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.sprache button') : null;
    if (!b) return;
    var next = b.getAttribute('data-lang');
    if (T[next]) apply(next, true);
  });
})();
