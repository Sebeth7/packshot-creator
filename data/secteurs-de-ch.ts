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
];
