import type { Secteur } from './secteurs';

export const secteursDeCh: Secteur[] = [
  // SCHMUCK & UHREN (bijoux-joaillerie)
  {
    slug: 'schmuck',
    titre: 'Hochpräzise Produktfotografie für Schmuck & Uhren',
    description:
      'Automatisierte Fotostudios für Schmuck: Erfassung von Edelsteinen, Gold- und Silberreflexen. KI-Lifestyle im Luxussegment.',
    hero: {
      titre: 'Professionelle Schmuckfotografie: Präzision & Luxus',
      sousTitre: 'Erfassen Sie jedes Detail: Steine, Metallreflexe, Fassungen',
      description:
        'Hochauflösende Packshot-Lösungen für Schmuck und Uhren + KI-Lifestyle für hochwertige Inszenierungen (getragen, Premium-Ambiente).',
    },
    problematiques: {
      titre: 'Herausforderungen der Schmuckfotografie',
      items: [
        'Metallreflexe (Gold, Silber, Platin) ohne Überbelichtung erfassen',
        'Edelsteine mit realistischem Glanz und Feuer fotografieren',
        'Extreme Schärfentiefe (Focus Stacking bei 3D-Schmuck)',
        'Winzige Produktgrössen, die Makrofotografie erfordern',
        'Getragene Lifestyle-Bilder (Models, Hände) sind teuer und langwierig zu produzieren',
      ],
    },
    solutions: {
      titre: 'Unsere Lösungen für Schmuck',
      items: [
        {
          type: 'hardware',
          titre: 'Orbitvu Studios für Schmuck',
          description: 'Hochauflösender Packshot mit automatischem Focus Stacking',
          avantages: [
            'Focus Stacking: absolute Schärfe über die gesamte Tiefe des 3D-Schmucks',
            'Polarisiertes Licht: Kontrolle der Metallreflexe, Veredelung der Steine',
            'Makrofotografie: Erfassung mikroskopischer Details (Fassungen, Punzen)',
            '360°-Schmuck: interaktive Rotation für den Online-Verkauf',
            'Farbkonsistenz: 18k Gold im gesamten Katalog identisch wiedergegeben',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Luxus',
          description: 'Getragene Bilder und hochwertige Inszenierungen per KI',
          avantages: [
            'Getragen per KI: Ringe an eleganten Händen, Halsketten an Models',
            'Luxus-Ambiente: Marmor-, Samt- und Schmuckschatullen-Kulissen',
            'Individuelle Stile: visuelle Marken-DNA (Cartier-like, Tiffany-like ...)',
            'Schnelle Produktion: 20-50 Lifestyle-Bilder in 1 Stunde',
            'ROI: -90% Kosten gegenüber einem Model-Shooting für Schmuck',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Juwelier mit 150 Kreationen/Jahr',
        description:
          'Focus-Stacking-Packshot + 3 KI-Lifestyle-Bilder pro Schmuckstück. Durchlaufzeiten -75%. Bildqualität 300% höher als bei manueller Fotografie.',
      },
    ],
    cta: {
      titre: 'Bringen Sie Ihren Schmuck zur Geltung',
      description:
        'Offerte für ein Orbitvu Schmuck-Studio + kostenlose BlendAI Lifestyle-Luxus-Demo.',
    },
    faq: [
      { question: 'Wie fotografiert man Edelsteine mit ihrem echten Glanz?', answer: 'Die Orbitvu Studios nutzen polarisiertes Licht und automatisches Focus Stacking, um das Feuer von Edelsteinen (Diamanten, Saphire, Rubine) mit originalgetreuer Schärfe und Brillanz zu erfassen.' },
      { question: 'Was ist Focus Stacking in der Schmuckfotografie?', answer: 'Focus Stacking kombiniert automatisch mehrere Aufnahmen mit unterschiedlicher Schärfentiefe, um absolute Schärfe über das gesamte 3D-Schmuckstück zu erzielen – von den Fassungen bis zu den mikroskopischen Details.' },
      { question: 'Kann man getragene Schmuckbilder ohne Model erstellen?', answer: 'Ja, BlendAI erzeugt realistische getragene Bilder: Ringe an eleganten Händen, Halsketten an Models, in luxuriösem Ambiente (Marmor, Samt, Schmuckschatulle). Produktion von 20 bis 50 Bildern pro Stunde.' },
      { question: 'Eignet sich die Packshot-Fotografie von Schmuck für den Online-Verkauf?', answer: 'Die Orbitvu Studios produzieren HD-Packshots mit weissem Hintergrund und interaktiver 360°-Rotation, ideal für die Produktseiten im Schmuck-E-Commerce. Das Freistellen erfolgt automatisch.' },
    ],
  },

  // UHREN (horlogerie)
  {
    slug: 'uhren',
    titre: 'Produktfotografie Uhren: Packshot & 360° für Uhren',
    description:
      'Automatisierte Fotostudios für Uhren und Uhrmacherei: Makro-Focus-Stacking, Beherrschung der Reflexe auf Saphirglas und Gehäusen. Packshot, 360° und KI-Lifestyle.',
    hero: {
      titre: 'Uhrenfotografie: Packshot Uhrmacherei & 360°',
      sousTitre: 'Zifferblätter, Komplikationen, Armbänder: jedes Detail erfasst',
      description:
        'Automatisierte Orbitvu Fotostudios für Marken, Manufakturen und Uhren-Zulieferer: hochauflösender Packshot, 360°-Rotation und Makro mit Beherrschung der Reflexe auf Saphirgläsern und polierten Gehäusen.',
    },
    problematiques: {
      titre: 'Herausforderungen der Uhrenfotografie',
      items: [
        'Reflexe auf Saphirgläsern, polierten Gehäusen und Metallarmbändern',
        'Durchgehende Schärfe vom Rehaut bis zum Zifferblattgrund (Makro-Schärfentiefe)',
        'Reproduzierbare Positionierung von Zeigern und Armbändern über ganze Serien hinweg',
        'Visuelle Konsistenz zwischen Varianten derselben Referenz (Zifferblätter, Finishes, Armbänder)',
        'Vertraulichkeit von Prototypen und Neuheiten: ein ausgelagertes Shooting legt sie vor dem Launch offen',
      ],
    },
    solutions: {
      titre: 'Unsere Lösungen für die Uhrmacherei',
      items: [
        {
          type: 'hardware',
          titre: 'Orbitvu Studios für Uhren',
          description:
            'Hochauflösender Packshot und 360° im eigenen Haus, mit automatischem Focus Stacking',
          avantages: [
            'Focus Stacking: absolute Schärfe auf Zifferblatt, Indizes, Zeigern und Komplikationen',
            'Polarisiertes Licht: beherrschte Reflexe auf Saphirglas, polierten Gehäusen und Gliedern',
            'Hochauflösendes Makro: Guillochierungen, Fassungen und Gravuren originalgetreu wiedergegeben',
            'Interaktive 360°-Rotation: die Uhr aus allen Blickwinkeln für den E-Commerce',
            'Internalisierte Produktion: Prototypen und Neuheiten bleiben in Ihren Mauern',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Uhren',
          description:
            'Verwandeln Sie Ihre Packshots in hochwertige Lifestyle-Bilder',
          avantages: [
            'KI-getragen: Uhren am Handgelenk in Business-, Sport- oder Abend-Ambiente',
            'Luxus-Kulissen: Marmor, Leder, Edelhölzer, beleuchtete Vitrine',
            'Kollektionskonsistenz: dieselbe visuelle DNA über alle Referenzen',
            'Serienproduktion: Lifestyle-Varianten in wenigen Minuten generiert',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: '[CAS_CLIENT_A_VALIDER] Schweizer Uhrmacher',
        description:
          '[CAS_CLIENT_A_VALIDER] Zu dokumentierender Kundenfall eines Schweizer Uhrmachers (Genf / Vallée de Joux): Internalisierung der Packshot- und 360°-Produktion.',
      },
    ],
    cta: {
      titre: 'Rüsten Sie Ihre Uhrenproduktion aus',
      description:
        'Offerte für ein Orbitvu Uhren-Studio + Demo mit Ihren eigenen Uhren, in Frankreich oder in der Schweiz.',
    },
    faq: [
      { question: 'Wie fotografiert man eine Uhr ohne Reflexe auf dem Saphirglas?', answer: 'Die Orbitvu Studios nutzen polarisiertes LED-Licht, das störende Reflexe auf Saphirglas, polierten Gehäusen und Metallarmbändern bereits bei der Aufnahme beseitigt – ohne manuelle Retusche.' },
      { question: 'Kann man den 360°-Packshot einer Uhr automatisieren?', answer: 'Ja. Die 360°-Rotation ist vollständig automatisiert: Die Uhr wird in wenigen Minuten aus allen Blickwinkeln fotografiert, mit einer interaktiven Darstellung, die sich direkt in eine E-Commerce-Produktseite einbinden lässt.' },
      { question: 'Liefern und installieren Sie in der Schweiz?', answer: 'Ja. PackshotCreator ist offizieller Orbitvu-Distributor für Frankreich und die Schweiz: Lieferung, Installation und Schulung vor Ort werden in der ganzen Schweiz gewährleistet, insbesondere im Jurabogen und im Genferseebecken. Kontakt Schweiz: +41 44 580 43 84.' },
      { question: 'Kann man ein Studio mit den eigenen Uhren vor dem Kauf testen?', answer: 'Ja. Unser Showroom, weniger als 2 Stunden von Genf entfernt, empfängt Sie nach Vereinbarung für eine Demonstration mit Ihren eigenen Uhren, begleitet von unseren Experten.' },
      { question: 'Wie wahrt man die Vertraulichkeit von Prototypen vor einem Launch?', answer: 'Durch die Internalisierung der visuellen Produktion mit einem automatisierten Studio verlassen Ihre Prototypen nie Ihre Räumlichkeiten: Kein externer Dienstleister erhält Zugang zu den Neuheiten vor ihrer offiziellen Vorstellung.' },
    ],
  },

  // BRILLEN (lunetterie)
  {
    slug: 'brillen',
    titre: 'Professionelle Produktfotografie für Brillen & Optik',
    description:
      'Packshot- und KI-Lösungen für optische Fassungen und Sonnenbrillen: automatisierte Orbitvu Studios mit Beherrschung von Reflexen und Transparenzen.',
    hero: {
      titre: 'Brillen & Optik',
      sousTitre: 'Packshot von Fassungen ohne Reflexe, Lifestyle-Bilder per KI',
      description:
        'Optische Fassungen und Sonnenbrillen verlangen eine perfekte Beherrschung der Reflexe auf den Gläsern und der Materialien (Metall, Acetat, Titan). Unsere Orbitvu Studios und die KI BlendAI produzieren Katalog- und Lifestyle-Bilder auf dem Niveau Ihrer Kollektionen.',
    },
    problematiques: {
      titre: 'Die Herausforderungen der Brillenfotografie',
      items: [
        'Störende Reflexe auf Gläsern und Metall',
        'Originalgetreue Wiedergabe von Farben und Materialien (Acetat, Titan, Gold)',
        'Grosse Kollektionsvolumen (200-800 Fassungen/Saison)',
        'Bedarf an getragenen Bildern und Lifestyle-Visuals für den E-Commerce',
      ],
    },
    solutions: {
      titre: 'Packshot- und KI-Lösungen für die Brillenbranche',
      items: [
        {
          type: 'hardware',
          titre: 'Orbitvu Studio — Packshot Fassungen',
          description:
            'Entspiegeltes LED-Licht, optimiert für Gläser und Metalloberflächen. Packshot auf weissem Hintergrund, 360° und automatisches Freistellen.',
          avantages: [
            'Polarisiertes Licht zur Beseitigung von Reflexen',
            'Originalgetreue Wiedergabe von Farben und Texturen',
            'Automatisierter Packshot in weniger als 10 Sekunden',
            '360°-Ansicht für Online-Shops',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI.studio — Lifestyle-Bilder Optik',
          description:
            'Erzeugen Sie getragene Bilder und Lifestyle-Inszenierungen aus Ihren Packshots, ohne Model und ohne Fotograf.',
          avantages: [
            'Per KI aus dem Packshot generierte getragene Bilder',
            'Pro Kollektion anpassbare Ambiente',
            'Schnelle Serienproduktion für saisonale Kataloge',
            'Visuelle Konsistenz über die gesamte Produktpalette',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Premium-Optiker — 400 Fassungen/Saison',
        description:
          'Reduktion des Kollektions-Shootings von 2 Wochen auf 3 Tage. Gleichbleibende Qualität bei Reflexen und Farben. Fotobudget um 65% gesenkt.',
      },
    ],
    cta: {
      titre: 'Testen Sie es mit Ihren Fassungen',
      description:
        'Buchen Sie eine personalisierte Demo mit Ihren eigenen Fassungen. 30 Minuten, um den Unterschied zu sehen.',
    },
    faq: [
      { question: 'Wie beherrschen Sie die Reflexe auf den Gläsern?', answer: 'Unsere Studios verwenden polarisiertes LED-Licht und brillenspezifische Aufnahmeprotokolle. Störende Reflexe werden bereits bei der Aufnahme beseitigt, ohne notwendige Retusche.' },
      { question: 'Kann man stark reflektierende Metallfassungen fotografieren?', answer: 'Ja, das ringförmige LED-Licht der Orbitvu Studios ist darauf ausgelegt, Reflexe auf allen Oberflächen zu beherrschen: poliertes Metall, gebürstetes Titan, glänzendes Acetat.' },
      { question: 'Kann die KI getragene Bilder aus einem einfachen Packshot generieren?', answer: 'Ja, BlendAI.studio generiert realistische getragene Bilder aus dem Fassungs-Packshot. Sie wählen den Model-Stil und das Ambiente pro Kollektion.' },
    ],
  },

  // SCHOENHEIT (cosmetiques-beaute)
  {
    slug: 'schoenheit',
    titre: 'Fotografie Kosmetik & Beauty: Packshot & KI-Lifestyle Luxus',
    description:
      'Fotostudios für Kosmetik (Flakons, Tiegel) + KI-Lifestyle Beauty (getragen, Spa-Ambiente, Luxus).',
    hero: {
      titre: 'Kosmetikfotografie Pro: Packshot & Lifestyle Beauty',
      sousTitre: 'Erfassen Sie Ihre Beauty-Produkte und kreieren Sie Luxus-Lifestyle-Ambiente',
      description:
        'Hochauflösender Packshot (Flakons, Tiegel, Tuben) + KI-Lifestyle-Bilder (getragen, Spa-Ambiente, Luxus).',
    },
    problematiques: {
      titre: 'Herausforderungen der Kosmetikfotografie',
      items: [
        'Schwer kontrollierbare Reflexe auf Glas- und glänzenden Kunststoffflakons',
        'Transparenzen: in Flakons sichtbare Flüssigkeiten (Seren, Parfums)',
        'Luxus-Verpackung: Texturen (perlmutt, golden, samtig) originalgetreu wiedergeben',
        'Getragene Lifestyle-Bilder (Hände, Gesichter) teuer (Models, Make-up-Artists)',
        'Konsistenz über Produktreihen von 50-200+ Referenzen manuell schwierig',
      ],
    },
    solutions: {
      titre: 'Unsere Lösungen für Kosmetik',
      items: [
        {
          type: 'hardware',
          titre: 'Beauty-Packshot-Studios',
          description: 'Originalgetreuer Packshot von Flakons, Tiegeln, Tuben',
          avantages: [
            'Reflexbeherrschung: Kontrolle der Reflexe auf glänzendem Glas/Kunststoff',
            'Perfekte Transparenzen: in transparenten Flakons sichtbare Flüssigkeiten',
            'Luxus-Texturen: originalgetreue Wiedergabe von Perlmutt-, Gold- und Samttexturen',
            'Automatisches Freistellen: perfekter weisser Hintergrund ohne manuelle Retusche',
            '360°-Verpackungen: interaktive Flakon-Rotationen',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Beauty',
          description: 'Getragene Bilder und Luxus-Ambiente per KI',
          avantages: [
            'KI-getragen: Produkte auf Händen, Gesichtern diverser Models',
            'Spa-/Luxus-Ambiente: Marmor-, Zenholz-, weiche-Textil-Kulissen',
            'Individuelle Stile: Marken-DNA (Sephora-like, Pariser Luxus ...)',
            'Serienproduktion: 30-100 Lifestyle-Bilder/Tag',
            'ROI: -85% gegenüber Beauty-Model-Shootings',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Bio-Kosmetikmarke 120 SKUs',
        description:
          'Packshot + 3 KI-Lifestyle-Bilder (getragen, Spa-Ambiente, Textur-Zoom). E-Commerce-Conversion +40%.',
      },
    ],
    cta: {
      titre: 'Bringen Sie Ihre Kosmetik zur Geltung',
      description: 'Offerte für Beauty-Packshot + Demo KI-Lifestyle Luxus.',
    },
    faq: [
      { question: 'Wie fotografiert man transparente Flakons mit sichtbarer Flüssigkeit?', answer: 'Die Orbitvu Studios beherrschen Transparenzen dank einer speziellen Beleuchtung, die Flüssigkeiten in den Flakons sichtbar macht (Seren, Parfums, Öle), während die Glasreflexe kontrolliert werden.' },
      { question: 'Kann man getragene Kosmetikbilder ohne Model erstellen?', answer: 'Ja, BlendAI generiert realistische getragene Bilder: Produkte auf Händen, Gesichtern diverser Models, in Spa- und Luxus-Ambiente. Produktion von 30 bis 100 Lifestyle-Bildern pro Tag.' },
      { question: 'Wie gibt man die Luxus-Texturen der Verpackungen originalgetreu wieder?', answer: 'Die Orbitvu Studios erfassen perlmuttartige, goldene und samtige Texturen mit absoluter Farbtreue. Die Beleuchtung ist kalibriert, um Premium-Finishes zur Geltung zu bringen.' },
      { question: 'Funktioniert das automatische Freistellen bei Kosmetikprodukten?', answer: 'Ja, das automatische Freistellen erzeugt einen perfekten weissen Hintergrund, selbst bei transparenten Flakons oder Produkten mit komplexen Konturen (Tiegel, Tuben, Sprays).' },
    ],
  },

  // ELEKTRONIK (electronique-hightech)
  {
    slug: 'elektronik',
    titre: 'Produktfotografie Elektronik & High-Tech: Präziser Packshot & KI-Lifestyle',
    description:
      'Elektronik-Packshot-Studios (Smartphones, Kopfhörer, Computer) + KI-Lifestyle Tech (Büro-, mobile Ambiente).',
    hero: {
      titre: 'Elektronikfotografie Pro: Packshot & Lifestyle Tech',
      sousTitre: 'Erfassen Sie technische Details und kreieren Sie High-Tech-Ambiente',
      description:
        'Hochauflösender Packshot von Elektronikprodukten + KI-Lifestyle-Bilder (moderne Büros, digitales Nomadentum).',
    },
    problematiques: {
      titre: 'Herausforderungen der High-Tech-Fotografie',
      items: [
        'Schwer kontrollierbare Bildschirmreflexe (Smartphones, Tablets, Computer)',
        'Zu erfassende technische Details (Anschlüsse, Tasten, Aluminiumtexturen)',
        'Premium-Verpackungen: Apple-like-Boxen, Luxus-Finishes originalgetreu wiedergeben',
        'Teuer zu produzierende Tech-Lifestyle-Bilder (Büros, Coworking)',
        'Grosse Kataloge (50-300+ SKUs) erfordern Schnelligkeit',
      ],
    },
    solutions: {
      titre: 'Unsere Lösungen für High-Tech',
      items: [
        {
          type: 'hardware',
          titre: 'Elektronik-Packshot-Studios',
          description: 'Hochauflösender Packshot von Elektronikprodukten',
          avantages: [
            'Beherrschung von Bildschirmreflexen: kontrolliertes polarisiertes Licht',
            'Makro-Details: Erfassung von USB-Anschlüssen, Tasten, Alu-/Kunststofftexturen',
            'Premium-Verpackungen: originalgetreue Wiedergabe von Luxus-Boxen, Finishes',
            '360°-Produkte: interaktive Rotationen von Smartphones, Kopfhörern',
            'Schnelligkeit: 40-80 Elektronikprodukte/Tag',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Tech',
          description: 'Produkte integriert in moderne Tech-/Büro-Ambiente',
          avantages: [
            'Moderne Büro-Ambiente: Coworking-Spaces, Home Office, Start-ups',
            'Mobiler Lifestyle: Cafés, Flughäfen, Züge',
            'Nutzungskontexte: Gaming, Produktivität, Kreativität',
            'Schnelle Produktion: 50-150 Lifestyle-Bilder/Tag',
            'ROI: -80% gegenüber Tech-Lifestyle-Shootings',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Tech-Zubehörmarke 200 SKUs',
        description:
          'Packshot + 2 KI-Lifestyle-Bilder (modernes Büro + mobil). Amazon-Conversion +25% dank Kontextualisierung.',
      },
    ],
    cta: {
      titre: 'Optimieren Sie Ihre Elektronik-Bilder',
      description: 'Offerte für High-Tech-Packshot + Demo KI-Lifestyle Tech.',
    },
    faq: [
      { question: 'Wie vermeidet man Reflexe auf Bildschirmen beim Packshot?', answer: 'Die Orbitvu Studios verwenden polarisiertes Licht, das störende Reflexe auf den Bildschirmen von Smartphones, Tablets und Laptops beseitigt und dabei die realistische Wiedergabe bewahrt.' },
      { question: 'Ist der 360°-Packshot für kleine Elektronikprodukte geeignet?', answer: 'Ja, die Orbitvu Studios erfassen präzise 360°-Rotationen für Kopfhörer, Smartwatches, Smartphones und Zubehör. Das Makro ermöglicht es, USB-Anschlüsse, Tasten und Texturen zu zeigen.' },
      { question: 'Kann man Tech-Lifestyle-Bilder ohne Büro-Shooting erstellen?', answer: 'BlendAI platziert Ihre Produkte in realistischen Ambiente: moderne Büros, Coworking-Spaces, Home Office, Cafés. Produktion von 50 bis 150 Lifestyle-Bildern pro Tag.' },
      { question: 'Wie geht man mit Premium-Verpackungen vom Typ Apple um?', answer: 'Die Orbitvu Studios erfassen Premium-Finishes originalgetreu: gebürstete Aluminiumtexturen, Luxus-Präsentationsboxen, Zubehör. Die Beleuchtung ist auf High-Tech-Materialien kalibriert.' },
    ],
    useCases: [
      {
        titre: 'Visuelle PCB-Inspektion',
        processus: 'Erkennung von Mikro-Lötfehlern auf Leiterplatten mittels Focus Stacking und kontrolliertem Streiflicht. Ersatz der manuellen Inspektion (Fehlerquote 20-30%).',
        fonctionsOrbitvu: ['SuperFocus', 'Streiflicht', '74 individuelle LEDs'],
        valeur: 'Erkennung von Mikro-Lötfehlern, Reduktion der Inspektionsfehlerquote',
      },
      {
        titre: 'Management der Bauteil-Obsoleszenz (DMSMS)',
        processus: 'Aufbau einer hochauflösenden visuellen Referenzdatenbank der Bauteile vor der Obsoleszenz für die spätere Identifikation und die Suche nach Ersatzteilen.',
        fonctionsOrbitvu: ['SuperFocus Makro', '360°', 'Archivierung', 'Auto-Naming'],
        valeur: 'DMSMS-Referenzdatenbank, zuverlässige Identifikation obsoleszenter Bauteile',
      },
    ],
  },

  // SPORT (sport-outdoor)
  {
    slug: 'sport',
    titre: 'Produktfotografie Sport & Outdoor: Packshot & KI-Lifestyle Abenteuer',
    description:
      'Packshot-Studios für Sport-/Outdoor-Ausrüstung + KI-Lifestyle (Berge, Trails, Extremsport).',
    hero: {
      titre: 'Sportfotografie Pro: Packshot & Lifestyle Abenteuer',
      sousTitre: 'Sport-/Outdoor-Ausrüstung in Aktion per KI',
      description:
        'Technischer Packshot von Ausrüstung + KI-Lifestyle-Bilder (Berge, Trails, Extremsport).',
    },
    problematiques: {
      titre: 'Herausforderungen der Sportfotografie',
      items: [
        'Packshot allein wenig ansprechend gegenüber Produkt in Aktion',
        'Outdoor-Shootings (Berge, Trails) logistisch komplex und teuer',
        'Technische Ausrüstung: Details (Nähte, Reissverschlüsse, Membranen) zu erfassen',
        'Bedarf an inspirierenden Lifestyle-Bildern für die Conversion',
        'Grosse saisonale Kataloge: Ski im Winter, Trail im Sommer (200-400 SKUs/Saison)',
      ],
    },
    solutions: {
      titre: 'Unsere Lösungen für Sport',
      items: [
        {
          type: 'hardware',
          titre: 'Sport-Packshot-Studios',
          description: 'Hochauflösender Packshot technischer Ausrüstung',
          avantages: [
            'Technische Details: Nähte, Reissverschlüsse, sichtbare Gore-Tex-Membranen',
            'Packshot getragen mit Geistermannequin: Volumen der Kleidung zur Geltung gebracht',
            '360°-Ausrüstung: Rotationen von Rucksäcken, Trailschuhen',
            'Automatisches Freistellen auf weissem Hintergrund: E-Commerce-Integration',
            'Schnelligkeit: 60-120 Produkte/Tag',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Abenteuer',
          description: 'Ausrüstung in Aktion per KI (Berge, Trails, Sport)',
          avantages: [
            'Outdoor-Kontexte: Berge, Wälder, Trails, Klettern, Ski',
            'KI-Athleten: Sportler in Aktion mit Ausrüstung',
            'Extreme Bedingungen: Schnee, Regen, Nebel, Sonne',
            'Individuelle Stile: Marken-DNA (Patagonia-like, North-Face-like)',
            'Schnelle Produktion: 50-150 Lifestyle-Bilder/Tag',
            'ROI: -90% gegenüber Outdoor-Bergshootings',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Trailrunning-Marke 120 Produkte',
        description:
          'Packshot + 3 KI-Lifestyle-Bilder (Berg, Wald, Ultra-Trail). Instagram-Engagement +180%.',
      },
    ],
    cta: {
      titre: 'Bringen Sie Ihre Outdoor-Ausrüstung zur Geltung',
      description: 'Offerte für Sport-Packshot + Demo KI-Lifestyle Abenteuer.',
    },
    faq: [
      { question: 'Kann man Outdoor-Bilder (Berg, Trail) ohne Aussen-Shooting erstellen?', answer: 'Ja, BlendAI generiert realistische Outdoor-Lifestyle-Bilder: Berge, Wälder, Trails, Schnee, Regen. Ihre Ausrüstung wird in Abenteuerkontexte integriert, ohne das Studio zu verlassen.' },
      { question: 'Wie erfasst man die technischen Details von Sportbekleidung?', answer: 'Die Orbitvu Studios erfassen technische Details hochauflösend: verstärkte Nähte, wasserdichte Reissverschlüsse, atmungsaktive Membranen, Texturen technischer Stoffe.' },
      { question: 'Funktioniert der Packshot mit Geistermannequin für Sportbekleidung?', answer: 'Ja, das Geistermannequin bringt das Volumen von Sportjacken, -hosen und -fleeces zur Geltung. Die 3D-Wiedergabe ist ideal für Outdoor-E-Commerce-Produktseiten.' },
      { question: 'Wie geht man mit saisonalen Ski-/Trail-Katalogen um?', answer: 'Die Orbitvu Studios verarbeiten 60 bis 120 Produkte pro Tag. Ein saisonaler Katalog von 200 bis 400 SKUs kann in 2 bis 4 Tagen mit Packshot + KI-Lifestyle-Abenteuerbildern fotografiert werden.' },
    ],
  },

  // MODE (mode-textile)
  {
    slug: 'mode',
    titre: 'Produktfotografie Mode & Textil: Packshot Kleidung & KI-Mannequins',
    description:
      'Packshot-Studios für Kleidung flach/Geistermannequin + KI-Lifestyle-Mannequins (realistisch getragen).',
    hero: {
      titre: 'Modefotografie Pro: Packshot & KI-Lifestyle-Mannequins',
      sousTitre: 'Vom flachen Kleidungs-Packshot zu getragenen KI-Mannequins',
      description:
        'Professioneller Textil-Packshot (flach, Geistermannequin) + getragene KI-Lifestyle-Mannequin-Bilder.',
    },
    problematiques: {
      titre: 'Herausforderungen der Modefotografie',
      items: [
        'Flacher Packshot: Fall der Kleidung wenig vorteilhaft gegenüber getragen',
        'Geistermannequin: gibt Volumen wieder, erfordert aber Spezialausrüstung',
        'Lifestyle-Mannequin-Shootings sehr teuer (Models, Stylisten, Studio)',
        'Lange Durchlaufzeiten: 1 Tag/20-30 getragene Kleidungsstücke',
        'Lookbook-Konsistenz schwierig bei Kollektionen von 100-500+ Teilen',
      ],
    },
    solutions: {
      titre: 'Unsere Lösungen für Mode',
      items: [
        {
          type: 'hardware',
          titre: 'Textil-Packshot-Studios',
          description: 'Packshot flach, Geistermannequin, 360°',
          avantages: [
            'Hochwertiger flacher Packshot: originalgetreue Stofftexturen',
            'Geistermannequin: Kleidungsvolumen ohne sichtbares Mannequin zur Geltung gebracht',
            '360°-Textil: interaktive Rotationen getragener Kleidung',
            'Automatisches Freistellen: perfekter weisser Hintergrund',
            'Schnelligkeit: 50-100 Kleidungsstücke/Tag',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle-Mannequins',
          description: 'Kleidung getragen von realistischen KI-Mannequins',
          avantages: [
            'Diverse KI-Mannequins: unterschiedliche Körperformen, Ethnien, Altersgruppen',
            'Lifestyle-Kontexte: Stadtstrasse, Café, Büro, Abend',
            'Individuelle Stile: Marken-DNA (Streetwear, Luxus, Casual ...)',
            'Serienproduktion: 100-300 getragene Bilder/Tag',
            'ROI: -80% gegenüber physischen Mannequin-Shootings',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Bekleidungsmarke 400 SKUs/Saison',
        description:
          'Packshot mit Geistermannequin + 2 getragene KI-Lifestyle-Bilder. Durchlaufzeiten -75%. Retourenquote -15% (verbesserte Darstellung des getragenen Zustands).',
      },
    ],
    cta: {
      titre: 'Optimieren Sie Ihre Mode-Bilder',
      description: 'Offerte für Textil-Packshot + Demo KI-Mannequins.',
    },
    faq: [
      { question: 'Was ist das Geistermannequin in der Modefotografie?', answer: 'Das Geistermannequin (Ghost Mannequin) ist eine Technik, bei der die Kleidung auf einem Mannequin fotografiert und das Mannequin anschliessend digital entfernt wird, was einen 3D-Volumeneffekt ohne sichtbares Mannequin erzeugt.' },
      { question: 'Kann man von KI-Mannequins getragene Bilder erstellen?', answer: 'Ja, BlendAI generiert diverse KI-Mannequins (Körperformen, Ethnien, Altersgruppen), die Ihre Kleidung in Lifestyle-Kontexten tragen: Stadtstrasse, Café, Büro, Abend. 100 bis 300 Bilder pro Tag.' },
      { question: 'Wie viele Kleidungsstücke kann man pro Tag im Packshot fotografieren?', answer: 'Im flachen Packshot oder mit Geistermannequin können Sie 50 bis 100 Kleidungsstücke pro Tag fotografieren, mit automatischem Freistellen auf weissem Hintergrund und absoluter Konsistenz über die gesamte Kollektion.' },
      { question: 'Ersetzen die KI-Bilder physische Mannequin-Shootings?', answer: 'BlendAI reduziert den Bedarf an physischen Mannequin-Shootings um 80%. Die getragenen KI-Bilder werden für E-Commerce-Produktseiten, Lookbooks und soziale Netzwerke verwendet.' },
    ],
  },

  // WEIN (vin-spiritueux)
  {
    slug: 'wein',
    titre: 'Produktfotografie Wein & Spirituosen: Flaschen-Packshot & KI-Lifestyle',
    description:
      'Automatisierte Fotostudios für Wein- und Spirituosenflaschen: Beherrschung der Glasreflexe, Etikettentreue und KI-Inszenierungen Keller, Bar, Tisch.',
    hero: {
      titre: 'Flaschenfotografie Wein & Spirituosen: Packshot & KI-Lifestyle',
      sousTitre: 'Bringen Sie Ihre Cuvées mit Bildern auf dem Niveau der grössten Weingüter zur Geltung',
      description:
        'Erfassen Sie jede Flasche mit perfekter Treue – lesbare Etiketten, beherrschte Reflexe, bewahrte Weinfarben – und kreieren Sie dann per KI Inszenierungen in Keller, Bar oder am gastronomischen Tisch.',
    },
    problematiques: {
      titre: 'Herausforderungen der Wein- & Spirituosenfotografie',
      items: [
        'Störende Reflexe auf dem Glas (Flaschen, Flakons, Karaffen)',
        'Lesbarkeit und Farbtreue der Etiketten (Goldprägungen, Reliefs, strukturiertes Papier)',
        'Unterschiedliche Flaschenformen (Bordeaux, Burgunder, Elsässer, Champagner, Flöte, Pot)',
        'Kapseln und Agraffen aus Metall erzeugen unkontrollierte Reflexe',
        'Lifestyle-Shootings in Keller oder Bar teuer und logistisch komplex',
        'Entfernung der komplexen Rückenetiketten in der Postproduktion aufwendig (Barcodes, gesetzliche Angaben auf der Rückseite)',
        'Grosse saisonale Volumen (Weinmessen, Primeurs, Jahresendfeste)',
      ],
    },
    solutions: {
      titre: 'Unsere Lösungen für Wein & Spirituosen',
      items: [
        {
          type: 'hardware',
          titre: 'Alphashot XL Wine v2 — Dediziertes Flaschenstudio',
          description:
            'Speziell für die Flaschenfotografie konzipiert, mit auf Glas und Etiketten optimierter Beleuchtung',
          avantages: [
            'Polarisiertes Anti-Reflex-Licht für Glas: Beseitigung störender Reflexe bereits bei der Aufnahme',
            'Kalibrierte Beleuchtungszone für Etiketten: perfekte Lesbarkeit, Goldprägungen und Reliefs bewahrt',
            'Kompatibel mit allen Formen: Bordeaux, Burgunder, Champagner, Magnum, Spirituosenflakon',
            '360°-Flasche: interaktive Rotation, die Etikett, Rückenetikett und Kapsel zeigt',
            'Automatisches Freistellen auf weissem Hintergrund für Kataloge und E-Commerce',
            'Schneller Workflow: 20-40 Flaschen/Stunde fotografiert',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Studio — KI-Inszenierungen',
          description:
            'Verwandeln Sie Ihre Packshots in Lifestyle-Bilder Keller, Bar, gastronomischer Tisch',
          avantages: [
            'Keller-Ambiente: Steingewölbe, Fässer, gedämpftes Licht',
            'Bar- & Restaurant-Ambiente: Holztresen, Cocktails, Lounge-Atmosphäre',
            'Speise-Wein-Kombinationen: gedeckter Tisch, Käse, Wurstwaren, gastronomische Gerichte',
            'Saisonale Ambiente: Weinlese, Feste, Sommerterrasse',
            'Serienproduktion: 30-100 Lifestyle-Bilder in wenigen Stunden',
            'ROI: -85% Kosten gegenüber Lifestyle-Shootings vor Ort (Keller, Schloss, Restaurant)',
          ],
        },
      ],
    },
    useCases: [
      {
        titre: 'Katalog Weingut',
        processus: 'Fotografieren Sie das gesamte Sortiment (Cuvées, Jahrgänge, Formate) mit konsistenter Wiedergabe für die Website, die technischen Datenblätter und die Fachmessen.',
        fonctionsOrbitvu: ['Flaschen-Templates', '360°', 'Multi-Export PDF/Web'],
        valeur: 'Vollständiger visueller Katalog, bereit für Web und Druck in wenigen Tagen',
      },
      {
        titre: 'E-Commerce Gastronomie & Weinhändler',
        processus: 'Produktion von Packshot- und Lifestyle-Bildern für B2B-Plattformen (Cafés, Hotels, Restaurants) und Online-Weinhändler, die einheitliche Bilder für Kataloge mit mehreren hundert Referenzen benötigen.',
        fonctionsOrbitvu: ['Automatisches Freistellen', 'Multi-Format-Export', 'Batch-Workflow'],
        valeur: 'Schnelle Integration in die E-Commerce-Plattformen der Gastronomie',
      },
      {
        titre: 'Kommunikation Importeur / Distributor',
        processus: 'Versorgen Sie Importeure und Distributoren mit professionellen, einsatzbereiten Bildern für ihre eigenen Verkaufsunterlagen (Kataloge, Datenblätter, soziale Netzwerke).',
        fonctionsOrbitvu: ['Templates', 'HD-Export', 'Metadaten'],
        valeur: 'Standardisierte Bilder für das gesamte Vertriebsnetz',
      },
    ],
    cta: {
      titre: 'Bringen Sie Ihre Flaschen zur Geltung',
      description:
        'Buchen Sie eine Demo mit Ihren eigenen Flaschen. 30 Minuten, um den Alphashot XL Wine Unterschied zu sehen.',
    },
    faq: [
      { question: 'Wie beseitigt man Reflexe auf Glasflaschen?', answer: 'Der Alphashot XL Wine v2 verwendet polarisiertes LED-Licht, das speziell für Glas kalibriert ist. Störende Reflexe werden bereits bei der Aufnahme beseitigt, ohne Retusche. Das Protokoll funktioniert bei klarem, getöntem Glas und Spirituosenflakons.' },
      { question: 'Werden Etiketten mit Goldprägungen oder Reliefs gut wiedergegeben?', answer: 'Ja, die dedizierte Beleuchtungszone für Etiketten bewahrt Heissfolienprägungen, Prägungen und Papiertexturen. Die Farbtreue wird durch eine 74-Punkt-LED-Kalibrierung gewährleistet.' },
      { question: 'Kann man alle Flaschenformen fotografieren?', answer: 'Das Studio akzeptiert alle gängigen Formen: Bordeaux, Burgunder, Elsässer, Champagner, Magnum, Halbflasche und Spirituosenflakons. Ein verstellbares Haltesystem hält jede Flasche perfekt gerade.' },
      { question: 'Wie bewältigt man grosse Volumen während der Weinmesse-Saison?', answer: 'Der automatisierte Workflow ermöglicht es, 20 bis 40 Flaschen pro Stunde zu fotografieren. An einem Tag können Sie 150 bis 300 Referenzen mit Packshot auf weissem Hintergrund, Freistellen und Multi-Format-Export verarbeiten.' },
      { question: 'Sind die KI-Lifestyle-Bilder für Wein realistisch?', answer: 'BlendAI generiert realistische Inszenierungen: Steinkeller, Verkostungstisch, Bartresen. Die Flaschen werden mit Beherrschung von Schatten, Reflexen und kohärentem Umgebungslicht integriert.' },
    ],
  },
];
