/**
 * D9-11 — EN watchmaking sector. Source: French secteur on main 0f960b5,
 * S7 corpus 2026-10-11, Laurent decisions 2026-10-11.
 * Keep existing BlendAI card and current commercial claims, without adding
 * new product capabilities. Not an authorization to publish/index.
 *
 * G5 du 11/10/2026 : claims maintenus provisoirement (décision de Laurent du
 * 11/10), NON ÉTABLIS par une source ; publication bloquée sans décision au
 * GO_PUBLICATION (question SB-L1, Orbitvu O4) :
 * - « Polarized lighting » / « polarized LED lighting » (aucune source S6, ni
 *   le catalogue 2026 : « contrôle avancé de l'éclairage » seulement) ;
 * - « less than two hours from Geneva » (showroom) ;
 * - CTA du gabarit « Get a free quote » (gratuité non sourcée).
 */
import type { Secteur } from './secteurs';

export const secteurHorlogerieEn: Secteur = {
  slug: 'horlogerie',
  titre: 'Watch Product Photography: Packshots & 360° Views',
  description: 'Automated photo studios for watches and watchmaking: macro focus stacking, reflection control on sapphire crystals and cases, packshots, 360° views and AI lifestyle images.',
  hero: {
    titre: 'Watch Photography: Packshots & 360° for Watchmaking',
    sousTitre: 'Dials, complications, straps: every detail captured',
    description: 'Orbitvu automated photo studios for watch brands, manufacturers and suppliers: high-resolution packshots, 360° rotation and macro photography with reflection control on sapphire crystals and polished cases.',
  },
  problematiques: {
    titre: 'Watch photography challenges',
    items: [
      'Reflections on sapphire crystals, polished cases and metal bracelets',
      'Full sharpness from the flange to the dial base (macro depth of field)',
      'Repeatable positioning of hands and straps across entire series',
      'Visual consistency across versions of the same watch (dials, finishes, straps)',
      'Confidentiality of prototypes and new releases: outsourcing photography exposes them before launch',
    ],
  },
  solutions: {
    titre: 'Our watchmaking solutions',
    items: [
      {
        type: 'hardware',
        titre: 'Orbitvu watchmaking studios',
        description: 'High-resolution packshots and 360° views produced in-house, with automatic focus stacking',
        avantages: [
          'Focus stacking: sharpness across dials, markers, hands and complications',
          'Polarized lighting: controlled reflections on sapphire crystals, polished cases and bracelet links',
          'High-resolution macro: guilloché patterns, stone settings and engravings captured in detail',
          'Interactive 360° rotation: show the watch from every angle for e-commerce',
          'In-house production: prototypes and new models stay within your premises',
        ],
      },
      {
        type: 'ia',
        titre: 'BlendAI Lifestyle for Watchmaking',
        description: 'Turn your packshots into premium lifestyle visuals',
        avantages: [
          'AI wrist shots: watches worn in business, sports or evening settings',
          'Luxury settings: marble, leather, fine wood and illuminated displays',
          'Collection consistency: the same visual identity across your references',
          'Series production: generate lifestyle variations in minutes',
        ],
      },
    ],
  },
  // Deliberately no casClients: source FR contains an unvalidated placeholder,
  // and this template does not currently render casClients.
  cta: {
    titre: 'Equip your watchmaking production',
    description: 'Request a quote for an Orbitvu watch studio and a demonstration with your own watches in France or Switzerland.',
  },
  faq: [
    {
      question: 'How can I photograph a watch without reflections on sapphire crystal?',
      answer: 'Orbitvu studios use polarized LED lighting to control unwanted reflections on sapphire crystals, polished cases and metal bracelets during capture, without manual retouching.',
    },
    {
      question: 'Can 360° watch packshots be automated?',
      answer: 'Yes. The 360° rotation is fully automated: the watch is photographed from every angle in minutes, and the interactive result can be embedded directly in an e-commerce product page.',
    },
    {
      question: 'Do you deliver and install in Switzerland?',
      answer: 'Yes. PackshotCreator is the official Orbitvu distributor for France and Switzerland. Delivery, installation and on-site training are offered throughout Switzerland, including the Jura Arc and Lake Geneva region. Swiss contact: +41 44 580 43 84.',
    },
    {
      question: 'Can we test a studio with our own watches before buying?',
      answer: 'Yes. Our showroom, less than two hours from Geneva, welcomes you by appointment for a demonstration with your own watches and assistance from our experts.',
    },
    {
      question: 'How can we keep prototypes confidential before launch?',
      answer: 'By bringing visual production in-house with an automated studio, your prototypes stay on your premises: no external photography provider has access to your new releases before they are unveiled.',
    },
  ],
};
