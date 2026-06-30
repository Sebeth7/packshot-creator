export interface SolutionStat {
  valeur: string;
  label: string;
  titre: string;
  description: string;
}

export interface SolutionEtape {
  titre: string;
  description: string;
  fonctionsOrbitvu: string[];
}

export interface SolutionSecteur {
  slug: string;
  nom: string;
  useCase: string;
}

export interface Solution {
  slug: string;
  titre: string;
  description: string;
  hero: {
    badge: string;
    titre: string;
    sousTitre: string;
    description: string;
  };
  probleme: {
    titre: string;
    description: string;
    stats: SolutionStat[];
  };
  workflow: {
    titre: string;
    description: string;
    etapes: SolutionEtape[];
  };
  secteurs: {
    titre: string;
    description: string;
    items: SolutionSecteur[];
  };
  machineIds: string[];
  reference?: {
    texte: string;
    role: string;
    secteur: string;
  };
  faq: { question: string; answer: string }[];
  cta: {
    titre: string;
    description: string;
  };
}

export const solutions: Solution[] = [
  // ═══════════════════════════════════════════════════════════
  // 1. DOCUMENTATION TECHNIQUE VISUELLE
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'documentation-technique-visuelle',
    titre: 'Documentation Technique Visuelle : Studios Photo Industriels | PackshotCreator',
    description:
      'Créez une documentation technique visuelle standardisée et toujours à jour. Studios photo automatisés pour bureaux d\'études, services techniques et gestionnaires de patrimoine.',
    hero: {
      badge: 'DOCUMENTATION TECHNIQUE',
      titre: 'Vos manuels techniques sont obsolètes avant d\'être imprimés',
      sousTitre: 'La documentation visuelle standardisée change tout',
      description:
        'Bureaux d\'études, services techniques, gestionnaires de patrimoine : créez des catalogues illustrés, des manuels d\'assemblage et des fiches produit toujours à jour, sans dépendre d\'un photographe.',
    },
    probleme: {
      titre: 'Le problème que vous connaissez',
      description: 'La documentation technique visuelle est le parent pauvre de l\'industrie. Les conséquences sont mesurables.',
      stats: [
        {
          valeur: '5-50€',
          label: 'par image en sous-traitance',
          titre: 'Coûts prohibitifs',
          description:
            'Avec des catalogues de 10 000+ références, la sous-traitance photo devient un gouffre financier. Et les visuels arrivent avec des semaines de retard.',
        },
        {
          valeur: '20-30%',
          label: 'de taux d\'erreur',
          titre: 'Inspection visuelle défaillante',
          description:
            'L\'inspection manuelle souffre de la fatigue, de la subjectivité et du turnover. Sans référence photographique standardisée, les faux positifs et négatifs se multiplient.',
        },
        {
          valeur: '0',
          label: 'standardisation entre sites',
          titre: 'Documentation inconsistante',
          description:
            'Photos smartphone, éclairages variables, angles incohérents. Quand le photographe ou le technicien part, le savoir-faire part avec lui.',
        },
      ],
    },
    workflow: {
      titre: 'Comment nos systèmes résolvent ça',
      description: 'Un workflow en 3 étapes pour une documentation technique toujours à jour, standardisée et intégrée à vos systèmes.',
      etapes: [
        {
          titre: 'Capture standardisée',
          description:
            'Templates sauvegardés : mêmes conditions d\'éclairage (74 LED individuelles), même angle, même fond à chaque prise de vue. N\'importe quel opérateur obtient le même résultat dès la première heure. Focus stacking pour une netteté absolue sur les pièces 3D complexes.',
          fonctionsOrbitvu: ['Templates', '74 LED', 'Focus stacking', 'Multi-angles', '360°'],
        },
        {
          titre: 'Intégration nomenclature',
          description:
            'Chaque visuel est automatiquement lié à son code article, sa désignation et ses métadonnées EXIF. Export direct vers vos systèmes PIM/ERP (SAP, Oracle, Infor) sans ressaisie. Numérotation et nommage conformes à vos références internes.',
          fonctionsOrbitvu: ['Auto-naming SKU', 'Métadonnées EXIF', 'Export PIM/ERP', 'Batch processing'],
        },
        {
          titre: 'Documentation vivante',
          description:
            'Comparaison avant/après par superposition d\'images (Ghost Image) pour détecter l\'usure ou les écarts. Vues 360° interactives pour des manuels techniques immersifs. Export multi-formats (PDF, web, print) pour des catalogues toujours synchronisés avec la gamme réelle.',
          fonctionsOrbitvu: ['Ghost Image', '360° interactif', 'Multi-format export', 'Archivage HD'],
        },
      ],
    },
    secteurs: {
      titre: 'Secteurs concernés',
      description: 'La documentation technique visuelle transforme les processus dans tous les secteurs industriels.',
      items: [
        {
          slug: 'defense-securite',
          nom: 'Aéronautique & Défense',
          useCase: 'First Article Inspection, documentation MRO, conformité AS9100. Un acteur majeur de l\'aéronautique française standardise sa documentation technique multi-sites avec nos systèmes.',
        },
        {
          slug: 'pieces-techniques-industrie',
          nom: 'Pièces Techniques & Industrielles',
          useCase: 'Catalogage SAV 50 000+ références, documentation d\'assemblage multi-angles, nomenclature visuelle intégrée ERP.',
        },
        {
          slug: 'industrie-manufacturiere',
          nom: 'Industrie Manufacturière',
          useCase: 'QC sortie production, documentation composants, rapports de non-conformité avec photos standardisées.',
        },
        {
          slug: 'automobile-pieces-detachees',
          nom: 'Automobile & Pièces Détachées',
          useCase: 'Catalogage aftermarket 500+ pièces/jour, documentation e-commerce, qualité zéro variation entre sites.',
        },
        {
          slug: 'sante-medical',
          nom: 'Santé & Médical',
          useCase: 'Documentation lots dispositifs médicaux, traçabilité complète, conformité FDA/ISO 13485.',
        },
        {
          slug: 'electronique-hightech',
          nom: 'Électronique & High-Tech',
          useCase: 'Documentation composants obsolescents (DMSMS), inspection PCB par focus stacking, base de référence macro.',
        },
      ],
    },
    machineIds: ['alphashot-micro-v2', 'alphashot-pro-g2', 'alphashot-xl-pro-v2', 'alphastudio-compact-v2'],
    reference: {
      texte: 'Nous avons standardisé la documentation visuelle de nos pièces sur 3 sites de production. Le même opérateur ou un nouveau — le résultat est identique. Les litiges fournisseurs ont diminué significativement.',
      role: 'Responsable documentation technique',
      secteur: 'Acteur majeur de l\'aéronautique',
    },
    faq: [
      {
        question: 'Comment créer une documentation technique illustrée standardisée ?',
        answer: 'Les studios Orbitvu utilisent des templates sauvegardés qui garantissent les mêmes conditions de prise de vue à chaque capture : éclairage (74 LED individuelles), angle, fond, distance. N\'importe quel opérateur reproduit le même résultat sans formation photo. Le focus stacking assure une netteté absolue sur les pièces 3D complexes.',
      },
      {
        question: 'Peut-on créer un catalogue interactif de pièces en 3D/360° ?',
        answer: 'Oui. Les studios Orbitvu capturent automatiquement des vues 360° de chaque pièce. Ces vues interactives peuvent être intégrées dans vos manuels techniques, portails SAV ou plateformes de formation, permettant à l\'utilisateur de faire tourner la pièce et de zoomer sur les détails.',
      },
      {
        question: 'Comment intégrer les visuels dans notre ERP/PIM existant ?',
        answer: 'Les studios Orbitvu exportent automatiquement les visuels avec métadonnées complètes (code article, désignation, dimensions) vers vos systèmes PIM/ERP — SAP, Oracle, Infor et autres. L\'auto-naming par code-barres ou QR élimine toute ressaisie manuelle.',
      },
      {
        question: 'La documentation reste-t-elle à jour quand la gamme évolue ?',
        answer: 'Oui. Le batch processing permet de re-photographier rapidement les pièces modifiées avec les mêmes templates. La fonction Ghost Image superpose l\'ancienne et la nouvelle version pour vérifier visuellement les écarts. Les catalogues sont re-générés en multi-formats (PDF, web, print) en quelques clics.',
      },
      {
        question: 'Quel volume de pièces peut-on documenter par jour ?',
        answer: 'En batch processing automatisé, 50 à 150 pièces par jour selon la taille et la complexité des vues requises. Pour un catalogue complet de 10 000 références, comptez 3 à 6 mois avec un seul opérateur à temps partiel.',
      },
      {
        question: 'Comment garantir la conformité de la documentation (AS9100, ISO 13485) ?',
        answer: 'La répétabilité des studios Orbitvu (templates verrouillés, éclairage calibré, métadonnées horodatées) produit une documentation photographique standardisée et traçable. Les rapports de non-conformité intègrent automatiquement des photos multi-angles avec horodatage et référence pièce.',
      },
    ],
    cta: {
      titre: 'Modernisez votre documentation technique',
      description: 'Devis personnalisé pour votre documentation technique visuelle.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // 2. DOCUMENTATION QUALITÉ PRODUIT
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'documentation-qualite-produit',
    titre: 'Documentation Photo Qualité Produit : Traçabilité & Conformité | PackshotCreator',
    description:
      'Studios photo automatisés pour la documentation qualité produit : traçabilité visuelle, rapports de conformité, prototypage R&D. Répétabilité certifiable.',
    hero: {
      badge: 'QUALITÉ & TRAÇABILITÉ',
      titre: 'Votre documentation qualité repose encore sur des photos smartphone ?',
      sousTitre: 'La traçabilité visuelle standardisée élimine les zones d\'ombre',
      description:
        'Responsables qualité, R&D, supply chain : créez une documentation photographique répétable, horodatée et intégrée à vos processus ISO. Sans dépendre d\'un photographe.',
    },
    probleme: {
      titre: 'Ce que ça vous coûte',
      description: 'L\'absence de documentation visuelle standardisée a des conséquences directes sur la qualité, les litiges et la conformité.',
      stats: [
        {
          valeur: '20-30%',
          label: 'de taux d\'erreur inspection manuelle',
          titre: 'Inspection visuelle défaillante',
          description:
            'La fatigue, la subjectivité et le turnover des inspecteurs génèrent des faux positifs et négatifs. Sans référence photographique standardisée, les rapports NCR manquent de preuves visuelles exploitables.',
        },
        {
          valeur: '0',
          label: 'de comparaison possible dans le temps',
          titre: 'Pas de traçabilité visuelle',
          description:
            'Sans photos standardisées dans le temps, impossible de documenter l\'évolution d\'un produit : usure, corrosion, fatigue, écarts entre lots. Les audits ISO en souffrent.',
        },
        {
          valeur: '5-50€',
          label: 'par image en sous-traitance',
          titre: 'Coût et délai prohibitifs',
          description:
            'La sous-traitance photo pour la documentation qualité est lente et coûteuse. Les visuels arrivent après les décisions. L\'internalisation avec un studio automatisé divise le coût par 10.',
        },
      ],
    },
    workflow: {
      titre: 'Comment nos systèmes résolvent ça',
      description: 'Un workflow de documentation qualité qui garantit la répétabilité, la traçabilité et l\'intégration dans vos processus existants.',
      etapes: [
        {
          titre: 'Capture répétable et certifiable',
          description:
            'Templates verrouillés : mêmes conditions d\'éclairage (74 LED), même angle, même distance à chaque prise de vue. Le résultat est identique quel que soit l\'opérateur ou le moment. La répétabilité est la base de toute documentation qualité recevable.',
          fonctionsOrbitvu: ['Templates verrouillés', '74 LED calibrées', 'Focus stacking', 'Métadonnées EXIF'],
        },
        {
          titre: 'Comparaison et détection d\'écarts',
          description:
            'La fonction Ghost Image superpose l\'image de référence ("golden sample") et la nouvelle capture pour détecter visuellement les écarts : usure, défaut de surface, variation dimensionnelle. Documentation avant/après standardisée pour chaque intervention.',
          fonctionsOrbitvu: ['Ghost Image', 'Comparaison avant/après', 'Multi-angles', 'Horodatage'],
        },
        {
          titre: 'Intégration qualité et export',
          description:
            'Les visuels sont automatiquement nommés (lot, référence, date) et exportés vers vos systèmes qualité (QMS) ou ERP. Rapports de non-conformité avec photos multi-angles intégrées. Prêt pour les audits ISO 9001, AS9100, FDA, ISO 13485.',
          fonctionsOrbitvu: ['Auto-naming', 'Export QMS/ERP', 'Rapports NCR', 'Archivage traçable'],
        },
      ],
    },
    secteurs: {
      titre: 'Secteurs concernés',
      description: 'La documentation qualité visuelle répond aux exigences de traçabilité dans tous les secteurs réglementés.',
      items: [
        {
          slug: 'defense-securite',
          nom: 'Aéronautique & Défense',
          useCase: 'First Article Inspection répétable, conformité AS9100, documentation visuelle certifiable pour audits.',
        },
        {
          slug: 'pieces-techniques-industrie',
          nom: 'Pièces Techniques & Industrielles',
          useCase: 'Traçabilité produit fini, comparaison entre lots, documentation litiges fournisseurs.',
        },
        {
          slug: 'sante-medical',
          nom: 'Santé & Médical',
          useCase: 'Documentation lots dispositifs médicaux, conformité FDA/ISO 13485, traçabilité complète.',
        },
        {
          slug: 'industrie-manufacturiere',
          nom: 'Industrie Manufacturière',
          useCase: 'QC sortie production, détection défauts surface/peinture, rapports NCR visuels.',
        },
        {
          slug: 'electronique-hightech',
          nom: 'Électronique & High-Tech',
          useCase: 'Inspection PCB par focus stacking, détection micro-défauts soudure, documentation composants.',
        },
        {
          slug: 'automobile-pieces-detachees',
          nom: 'Automobile',
          useCase: 'QC sortie production, détection défauts surface/peinture, documentation conformité fournisseurs.',
        },
      ],
    },
    machineIds: ['alphashot-pro-g2', 'alphashot-xl-pro-v2', 'alphashot-micro-v2', 'alphastudio-compact-v2'],
    reference: {
      texte: 'Nous utilisons les studios Orbitvu pour documenter chaque étape de notre processus qualité. La répétabilité des prises de vue a transformé nos rapports de non-conformité — les litiges fournisseurs se règlent plus vite avec des preuves visuelles standardisées.',
      role: 'Responsable qualité',
      secteur: 'Industriel français, secteur réglementé',
    },
    faq: [
      {
        question: 'Comment photographier des produits pour la documentation qualité ?',
        answer: 'Les studios Orbitvu utilisent des templates sauvegardés qui garantissent les mêmes conditions de prise de vue à chaque capture. L\'éclairage calibré (74 LED), l\'angle fixe et la distance contrôlée produisent une documentation photographique répétable et exploitable pour les audits qualité.',
      },
      {
        question: 'Peut-on détecter visuellement les défauts par comparaison avec une référence ?',
        answer: 'Oui. La fonction Ghost Image superpose l\'image de référence ("golden sample") et la nouvelle capture. Les écarts de surface, de couleur, de dimensions ou de finition sont immédiatement visibles. Cette comparaison peut être horodatée et archivée.',
      },
      {
        question: 'La documentation photo est-elle recevable pour les audits ISO/AS9100 ?',
        answer: 'La répétabilité des studios Orbitvu (templates verrouillés, métadonnées horodatées, conditions d\'éclairage calibrées) produit une documentation photographique standardisée et traçable. Les rapports intègrent automatiquement des photos multi-angles avec référence pièce et horodatage.',
      },
      {
        question: 'Comment intégrer les photos qualité dans notre QMS ou ERP ?',
        answer: 'Les studios Orbitvu exportent automatiquement les visuels avec métadonnées complètes (lot, référence, date, opérateur) vers vos systèmes qualité — SAP QM, Greenlight Guru, MasterControl, ETQ. L\'auto-naming élimine toute ressaisie manuelle.',
      },
      {
        question: 'Peut-on documenter l\'état avant/après une intervention (R&D, réparation) ?',
        answer: 'Oui. Le workflow avant/après utilise les mêmes templates pour capturer l\'état initial et final de la pièce. La superposition Ghost Image permet une comparaison visuelle directe. Idéal pour le prototypage R&D, la validation avant-série et le suivi de réparation.',
      },
      {
        question: 'Quel est le gain par rapport à la documentation photo manuelle ?',
        answer: 'Un studio automatisé produit 50 à 150 photos standardisées par jour, contre 10 à 20 en photo manuelle avec qualité variable. Le coût par image descend à environ 1€ après amortissement, contre 5 à 50€ en sous-traitance. La répétabilité élimine les reprises.',
      },
    ],
    cta: {
      titre: 'Fiabilisez votre documentation qualité',
      description: 'Devis personnalisé pour votre documentation qualité produit.',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // 3. DOCUMENTATION PROBATOIRE
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'documentation-probatoire',
    titre: 'Documentation Probatoire & Patrimoine : Studio Photo à Valeur de Preuve | PackshotCreator',
    description:
      'Studios photo automatisés pour documentation à valeur probante : expertise judiciaire, numérisation patrimoine, sinistres. Répétabilité certifiable, archivage HD.',
    hero: {
      badge: 'DOCUMENTATION PROBATOIRE',
      titre: 'Une photo ne vaut preuve que si elle est reproductible',
      sousTitre: 'La répétabilité certifiable au service de la valeur probatoire',
      description:
        'Experts judiciaires, musées, assureurs : créez une documentation photographique standardisée, horodatée et reproductible. La seule approche recevable quand l\'image fait foi.',
    },
    probleme: {
      titre: 'Pourquoi vos photos ne suffisent pas',
      description: 'En expertise, en patrimoine ou en assurance, une photo non standardisée n\'a aucune valeur probatoire.',
      stats: [
        {
          valeur: '0',
          label: 'de répétabilité avec un smartphone',
          titre: 'Photos non reproductibles',
          description:
            'Éclairage variable, angle approximatif, distance non contrôlée. Deux photos du même objet prises à des moments différents ne sont pas comparables. En expertise judiciaire, c\'est rédhibitoire.',
        },
        {
          valeur: '100%',
          label: 'des conditions maîtrisées',
          titre: 'Répétabilité exigée',
          description:
            'Tribunaux, assureurs et institutions exigent une documentation photographique dont les conditions de capture sont documentées et reproductibles. Les templates Orbitvu répondent nativement à cette exigence.',
        },
        {
          valeur: '1000+',
          label: 'objets par collection',
          titre: 'Volumes de numérisation',
          description:
            'Musées, maisons de vente et gestionnaires de patrimoine doivent numériser des collections entières avec une qualité constante. La cadence manuelle est incompatible avec ces volumes.',
        },
      ],
    },
    workflow: {
      titre: 'Comment nos systèmes garantissent la valeur probatoire',
      description: 'Un workflow conçu pour la reproductibilité totale et l\'archivage à valeur de preuve.',
      etapes: [
        {
          titre: 'Conditions de capture verrouillées',
          description:
            'Templates sauvegardés avec paramètres verrouillés : éclairage (74 LED individuelles, intensité et position programmées), angle, distance, fond. Chaque capture est reproductible à l\'identique, par n\'importe quel opérateur, à n\'importe quel moment.',
          fonctionsOrbitvu: ['Templates verrouillés', '74 LED programmables', 'Paramètres sauvegardés', 'Répétabilité totale'],
        },
        {
          titre: 'Documentation multi-angles exhaustive',
          description:
            'Capture automatique en multi-angles et 360° pour une documentation complète de l\'objet sous tous ses aspects. Le focus stacking garantit une netteté absolue sur toute la profondeur. Chaque détail est visible et archivé.',
          fonctionsOrbitvu: ['360° automatique', 'Multi-angles', 'Focus stacking', 'Macro haute résolution'],
        },
        {
          titre: 'Archivage et métadonnées probatoires',
          description:
            'Chaque image embarque des métadonnées complètes : horodatage, conditions de capture, référence objet, opérateur. Export en haute résolution avec données EXIF intégrées. La chaîne de traçabilité est documentée de la capture à l\'archivage.',
          fonctionsOrbitvu: ['Métadonnées EXIF complètes', 'Horodatage', 'Archivage HD', 'Export multi-formats'],
        },
      ],
    },
    secteurs: {
      titre: 'Domaines d\'application',
      description: 'La documentation probatoire concerne tous les domaines où l\'image fait foi.',
      items: [
        {
          slug: 'defense-securite',
          nom: 'Expertise & Justice',
          useCase: 'Documentation d\'objets pour expertise judiciaire : contrefaçon, litiges, sinistres. Photos reproductibles et horodatées à valeur de preuve.',
        },
        {
          slug: 'pieces-techniques-industrie',
          nom: 'Patrimoine & Collections',
          useCase: 'Numérisation standardisée d\'oeuvres, objets d\'art, pièces de musée. Archivage HD multi-angles pour conservation et catalogage. Cas client : Pompéi.',
        },
        {
          slug: 'sante-medical',
          nom: 'Assurance & Sinistres',
          useCase: 'Documentation d\'objets pour dossiers de sinistres, expertises et recours. Neutralité garantie par les conditions standardisées.',
        },
        {
          slug: 'industrie-manufacturiere',
          nom: 'Traçabilité Industrielle',
          useCase: 'Documentation d\'état avant/après intervention. Preuve visuelle de l\'état initial pour litiges fournisseurs et garanties.',
        },
      ],
    },
    machineIds: ['alphashot-micro-v2', 'alphashot-pro-g2', 'alphashot-xl-pro-v2'],
    reference: {
      texte: 'La standardisation des prises de vue nous a permis de numériser des collections entières avec une qualité et une cohérence impossibles à atteindre manuellement. Chaque objet est documenté dans des conditions identiques et reproductibles.',
      role: 'Responsable numérisation',
      secteur: 'Institution patrimoniale européenne',
    },
    faq: [
      {
        question: 'Comment garantir la valeur probatoire d\'une photographie ?',
        answer: 'La valeur probatoire repose sur la reproductibilité et la traçabilité. Les studios Orbitvu utilisent des templates verrouillés (éclairage, angle, distance) qui garantissent que deux photos du même objet prises à des moments différents seront identiques. Les métadonnées EXIF (horodatage, conditions) documentent la chaîne de capture.',
      },
      {
        question: 'Quelle différence avec un studio photo classique pour la documentation probatoire ?',
        answer: 'Un studio classique dépend de l\'opérateur : éclairage manuel, angle approximatif, résultats variables. Un studio Orbitvu utilise des paramètres programmés et sauvegardés. La répétabilité est native, pas dépendante du savoir-faire humain. C\'est cette répétabilité documentée qui donne la valeur probatoire.',
      },
      {
        question: 'Peut-on numériser une collection de musée avec ces systèmes ?',
        answer: 'Oui. Les studios Orbitvu capturent automatiquement des vues multi-angles et 360° en haute résolution avec focus stacking. La cadence (50-150 objets/jour) est compatible avec la numérisation de collections entières. PackshotCreator a accompagné la numérisation d\'objets archéologiques de Pompéi.',
      },
      {
        question: 'Les photos sont-elles exploitables pour une expertise judiciaire ?',
        answer: 'Les conditions de capture standardisées (éclairage calibré, fond neutre, distance contrôlée) et les métadonnées horodatées produisent une documentation photographique dont la neutralité et la reproductibilité sont documentées. C\'est une base solide pour l\'expertise.',
      },
      {
        question: 'Comment archiver les images avec leurs métadonnées probatoires ?',
        answer: 'Chaque image est exportée en haute résolution avec métadonnées EXIF complètes intégrées : horodatage, conditions de capture, référence objet, opérateur. L\'export multi-formats (TIFF, PNG, JPEG) permet l\'intégration dans vos systèmes d\'archivage existants.',
      },
      {
        question: 'Quel est l\'investissement pour un studio à usage probatoire ?',
        answer: 'L\'investissement varie selon le studio retenu (Alphashot Micro, Pro G2, XL Pro) et votre volume de production — utilisez le calculateur ROI pour estimer votre cas, ou contactez-nous pour un devis personnalisé. L\'amortissement est rapide : le coût par image descend à environ 1€ contre 15-50€ en prestation externe, avec une qualité et une répétabilité incomparables.',
      },
    ],
    cta: {
      titre: 'Donnez une valeur de preuve à vos images',
      description: 'Devis personnalisé pour votre documentation probatoire.',
    },
  },
];
