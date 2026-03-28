export interface Secteur {
  slug: string;
  titre: string;
  description: string;
  hero: {
    titre: string;
    sousTitre: string;
    description: string;
  };
  problematiques: {
    titre: string;
    items: string[];
  };
  solutions: {
    titre: string;
    items: {
      type?: 'hardware' | 'ia';
      titre: string;
      description: string;
      avantages: string[];
    }[];
  };
  casClients?: {
    titre: string;
    description: string;
  }[];
  useCases?: {
    titre: string;
    processus: string;
    fonctionsOrbitvu: string[];
    valeur: string;
  }[];
  cta: {
    titre: string;
    description: string;
  };
  faq?: { question: string; answer: string }[];
}

export const secteurs: Secteur[] = [
  // 1. CHAUSSURES
  {
    slug: 'chaussures',
    titre: 'Photo Produit Professionnelle pour Chaussures & Sneakers',
    description:
      'Solutions packshot et IA pour chaussures : studios automatisés Orbitvu et BlendAI pour vos catalogues e-commerce.',
    hero: {
      titre: 'Photo Produit Chaussures : Packshot & IA Lifestyle',
      sousTitre: 'Automatisez votre production visuelle sneakers et chaussures',
      description:
        'Capturez tous les détails (coutures, matières, semelles) avec nos studios photo automatisés puis transformez vos packshots en visuels lifestyle IA en quelques clics.',
    },
    problematiques: {
      titre: 'Défis Photo Produit Chaussures',
      items: [
        'Photographier les paires de manière cohérente (vue latérale, dessus, semelle)',
        'Capturer les matières (cuir, daim, textile) avec fidélité',
        'Gérer les reflets sur les sneakers vernies et semelles brillantes',
        'Produire des visuels lifestyle (ambiances urbaines, lifestyle) coûteux en shooting',
        'Catalogues importants (50-500+ SKUs/saison) nécessitant rapidité',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Packshot & IA',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Photo Automatisés Orbitvu',
          description:
            'Photographie packshot haute résolution avec cohérence absolue',
          avantages: [
            'Positionnement précis : vues latérale, dessus, semelle reproductibles',
            'Éclairage optimisé matières (cuir brillant, textile mat, semelles)',
            'Détourage automatique fond blanc parfait',
            '360° packshot pour vues interactives (rotation produit)',
            'Workflow rapide : 20-30 paires/heure photographiées',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Studio - IA Lifestyle',
          description:
            'Transformez vos packshots en visuels lifestyle urbains, sport, street',
          avantages: [
            'Contextes lifestyle : rue urbaine, skateparks, coffee shops, studio mode',
            'Styles personnalisés : streetwear, luxe, sport performance',
            'Production série : 50-200 visuels lifestyle en 1-2h (vs jours en shooting)',
            'Cohérence marque : même ambiance visuelle sur tout le catalogue',
            'ROI immédiat : -80% coûts vs shootings lifestyle traditionnels',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Marque Sneakers 250 SKUs/saison',
        description:
          'Réduit délais production visuels de 3 semaines → 48h. Budget photo -70%. 3 visuels/produit : packshot + 2 lifestyles IA urbains.',
      },
    ],
    cta: {
      titre: 'Automatisez vos visuels chaussures',
      description:
        'Devis personnalisé studio Orbitvu + formation BlendAI pour votre catalogue sneakers.',
    },
    faq: [
      { question: 'Combien de paires de chaussures peut-on photographier par jour ?', answer: 'Avec un studio Orbitvu automatisé, vous pouvez photographier 20 à 30 paires par heure en packshot fond blanc, soit 150 à 200 paires par jour avec les vues latérale, dessus et semelle.' },
      { question: 'Comment gérer les reflets sur les chaussures vernies ou les sneakers brillantes ?', answer: 'Les studios Orbitvu intègrent un éclairage polarisé qui contrôle les reflets sur les matières brillantes (vernis, cuir laqué, semelles). Le réglage est automatique et reproductible.' },
      { question: 'Peut-on créer des visuels lifestyle sneakers sans shooting photo ?', answer: 'Oui, BlendAI Studio transforme vos packshots fond blanc en visuels lifestyle réalistes : ambiances urbaines, skateparks, coffee shops. Production de 50 à 200 visuels en 1 à 2 heures.' },
      { question: 'Le packshot 360° est-il adapté aux chaussures ?', answer: 'Absolument. La rotation 360° permet aux clients de voir la chaussure sous tous les angles (coutures, semelle, talon). C\'est un atout majeur pour réduire les retours e-commerce.' },
    ],
  },

  // 2. BIJOUX / JOAILLERIE
  {
    slug: 'bijoux-joaillerie',
    titre: 'Photo Produit Bijoux & Joaillerie Haute Précision',
    description:
      'Studios photo automatisés pour bijoux : capture pierres précieuses, reflets or et argent. IA lifestyle luxe.',
    hero: {
      titre: 'Photo Bijoux Professionnelle : Précision & Luxe',
      sousTitre: 'Capturez chaque détail : pierres, reflets métaux, sertissages',
      description:
        'Solutions packshot haute résolution pour bijoux et joaillerie + IA lifestyle mises en scène luxe (portés, ambiances haut de gamme).',
    },
    problematiques: {
      titre: 'Défis Photo Bijoux',
      items: [
        'Capturer reflets métaux (or, argent, platine) sans surexposition',
        'Photographier pierres précieuses avec brillance et feux réalistes',
        'Profondeur de champ extrême (focus stacking bijoux 3D)',
        'Taille produits minuscule nécessitant macrophotographie',
        'Visuels portés lifestyle (mannequins, mains) coûteux et longs à produire',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Bijoux',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Orbitvu Joaillerie',
          description: 'Packshot haute résolution avec focus stacking automatique',
          avantages: [
            'Focus stacking : netteté absolue sur toute la profondeur bijou 3D',
            'Éclairage polarisé : contrôle reflets métaux, sublimation pierres',
            'Macrophotographie : capture détails microscopiques (sertissages, poinçons)',
            '360° bijoux : rotation interactive pour vente en ligne',
            'Cohérence colorimétrique : or 18k rendu identique sur tout le catalogue',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Luxe',
          description: 'Visuels portés et mises en scène haut de gamme via IA',
          avantages: [
            'Portés IA : bagues sur mains élégantes, colliers sur mannequins',
            'Ambiances luxe : décors marbre, velours, écrin joaillerie',
            'Styles personnalisés : ADN visuel marque (Cartier-like, Tiffany-like...)',
            'Production rapide : 20-50 visuels lifestyle en 1h',
            'ROI : -90% coûts vs shooting mannequin joaillerie',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Joaillier 150 créations/an',
        description:
          'Packshot focus stacking + 3 visuels lifestyle IA/bijou. Délais -75%. Qualité image 300% supérieure vs photographe manuel.',
      },
    ],
    cta: {
      titre: 'Sublimez vos bijoux',
      description:
        'Devis studio Orbitvu joaillerie + démo BlendAI lifestyle luxe gratuite.',
    },
    faq: [
      { question: 'Comment photographier les pierres précieuses avec leur brillance réelle ?', answer: 'Les studios Orbitvu utilisent un éclairage polarisé et le focus stacking automatique pour capturer les feux des pierres précieuses (diamants, saphirs, rubis) avec une netteté et une brillance fidèles.' },
      { question: 'Qu\'est-ce que le focus stacking pour la photo bijoux ?', answer: 'Le focus stacking combine automatiquement plusieurs prises de vue à différentes profondeurs de champ pour obtenir une netteté absolue sur l\'ensemble du bijou 3D, des sertissages aux détails microscopiques.' },
      { question: 'Peut-on créer des visuels portés bijoux sans mannequin ?', answer: 'Oui, BlendAI génère des visuels portés réalistes : bagues sur mains élégantes, colliers sur mannequins, dans des ambiances luxe (marbre, velours, écrin). Production de 20 à 50 visuels par heure.' },
      { question: 'La photo packshot bijoux est-elle adaptée à la vente en ligne ?', answer: 'Les studios Orbitvu produisent des packshots HD fond blanc avec rotation 360° interactive, idéaux pour les fiches produit e-commerce joaillerie. Le détourage est automatique.' },
    ],
  },

  // 3. MOBILIER / DÉCORATION
  {
    slug: 'mobilier-decoration',
    titre: 'Photo Mobilier & Décoration : Packshot & Mises en Scène IA',
    description:
      'Studios grand format pour meubles + IA pour créer ambiances intérieures réalistes (salon, chambre, bureau).',
    hero: {
      titre: 'Photo Mobilier Pro : Packshot & Ambiances Décoration',
      sousTitre: 'Du packshot fond blanc aux mises en scène intérieures IA',
      description:
        'Photographiez vos meubles sur fond blanc puis créez instantanément des mises en scène lifestyle (salons, chambres, bureaux) via IA.',
    },
    problematiques: {
      titre: 'Défis Photo Mobilier',
      items: [
        'Taille produits volumineux : tables, canapés, armoires (2-3m)',
        'Shootings mises en scène onéreux (location studios, décorateurs)',
        'Cohérence catalogues difficile sur 100-500+ références',
        'Délais longs : 1-2 jours shooting/10 meubles',
        'Impossibilité montrer meubles dans tous styles déco (scandinave, industriel, luxe...)',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Mobilier',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Grand Format Orbitvu',
          description: 'Packshot meubles jusqu\'à 3m avec éclairage 360°',
          avantages: [
            'Grands volumes : plateaux 2×3m, hauteur 2.5m',
            'Packshot 360° : rotations meubles interactives e-commerce',
            'Fond blanc parfait : détourage auto, gain temps retouche',
            'Cohérence absolue : même lumière/angle sur tout le catalogue',
            'Rapidité : 15-25 meubles packshot/jour (vs 5-10 shooting classique)',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Mises en Scène Intérieures',
          description: 'Placez vos meubles dans ambiances décoration réalistes',
          avantages: [
            'Styles déco multiples : scandinave, industriel, luxe, bohème, minimaliste',
            'Pièces variées : salon, chambre, bureau, salle à manger',
            'Cohérence marque : même ambiance sur toute la collection',
            'Production série : 50-100 visuels ambiances/jour',
            'ROI : -85% vs shootings décoration traditionnels',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'E-commerçant mobilier 300 SKUs',
        description:
          'Packshot + 2 ambiances IA/meuble (scandinave + industriel). Délais -80%. Taux conversion +35% grâce visuels contextualisés.',
      },
    ],
    cta: {
      titre: 'Optimisez vos visuels mobilier',
      description: 'Devis studio grand format + démo mises en scène IA.',
    },
    faq: [
      { question: 'Quelle taille maximale de meuble peut-on photographier ?', answer: 'Les studios Orbitvu grand format acceptent des meubles jusqu\'à 3 mètres avec des plateaux de 2x3m et une hauteur de 2,5m. Canapés, armoires, tables : tous les formats sont pris en charge.' },
      { question: 'Peut-on montrer un meuble dans différents styles de décoration ?', answer: 'Oui, BlendAI place vos meubles dans des ambiances réalistes : scandinave, industriel, luxe, bohème, minimaliste. Vous pouvez générer plusieurs mises en scène par produit en quelques minutes.' },
      { question: 'Combien de meubles peut-on photographier par jour ?', answer: 'En moyenne 15 à 25 meubles par jour en packshot fond blanc avec rotation 360°, contre 5 à 10 en shooting classique. Le workflow est entièrement automatisé.' },
      { question: 'Les mises en scène IA sont-elles réalistes pour le mobilier ?', answer: 'BlendAI produit des visuels très réalistes avec gestion des ombres, des reflets et de la perspective. Les meubles sont intégrés naturellement dans des pièces (salon, chambre, bureau) avec un rendu photoréaliste.' },
    ],
  },

  // 4. FOOD / ALIMENTAIRE
  {
    slug: 'food-alimentaire',
    titre: 'Photo Produit Alimentaire : Packshot & Food Styling IA',
    description:
      'Packshot produits alimentaires emballés + IA food styling (recettes, dressages, ambiances culinaires).',
    hero: {
      titre: 'Photo Food Professionnelle : Packshot & Styling Culinaire IA',
      sousTitre: 'Du packshot emballage au food styling lifestyle',
      description:
        'Photographiez vos produits alimentaires packagés puis créez visuels food styling (recettes, dressages, ambiances) via IA.',
    },
    problematiques: {
      titre: 'Défis Photo Food',
      items: [
        'Packshot emballages : reflets plastiques, transparences difficiles',
        'Food styling onéreux : stylistes culinaires, ingrédients frais périssables',
        'Shootings recettes longs : 1 jour/5-10 recettes',
        'Cohérence visuels difficile sur gammes larges (100+ produits)',
        'Impossibilité montrer produits dans tous contextes (petit-déjeuner, snack, dîner...)',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Food',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Alimentaire',
          description: 'Packshot produits emballés haute fidélité',
          avantages: [
            'Gestion reflets : contrôle reflets emballages plastiques/verre',
            'Transparences : liquides visibles dans bouteilles transparentes',
            'Détourage auto fond blanc : gain temps retouche',
            '360° packagings : rotations interactives e-commerce',
            'Rapidité : 30-50 packagings/jour',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Food Styling IA',
          description: 'Créez visuels recettes et dressages culinaires',
          avantages: [
            'Recettes IA : produits intégrés dans plats cuisinés réalistes',
            'Dressages pros : assiettes stylisées restaurant gastronomique',
            'Ambiances lifestyle : petit-déj, brunch, apéro, dîner famille',
            'Production rapide : 20-50 visuels recettes/jour',
            'ROI : -90% vs shootings food styling traditionnels',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Marque bio 80 produits',
        description:
          'Packshot + 2 visuels recettes IA/produit. Délais -85%. Engagement Instagram +120% grâce visuels food styling.',
      },
    ],
    useCases: [
      {
        titre: 'Contrôle qualité emballages',
        processus: 'Documentation standardisée des emballages pour les audits IFS, BRC et HACCP. Vérification visuelle de l\'étiquetage, de l\'intégrité des scellés et de la conformité packaging.',
        fonctionsOrbitvu: ['Templates', 'Comparaison', 'Multi-export'],
        valeur: 'Photos standardisées prêtes pour les audits de conformité',
      },
      {
        titre: 'Standardisation multi-marchés',
        processus: 'Produire des visuels identiques pour les mêmes produits déclinés sur plusieurs marchés, avec des packagings différents mais un cadrage et un éclairage constants.',
        fonctionsOrbitvu: ['Templates', '74 LED', 'Export multi-format'],
        valeur: 'Cohérence visuelle garantie sur tous les marchés',
      },
    ],
    cta: {
      titre: 'Sublimez vos produits alimentaires',
      description: 'Devis packshot food + démo styling culinaire IA.',
    },
    faq: [
      { question: 'Comment gérer les reflets sur les emballages plastiques alimentaires ?', answer: 'Les studios Orbitvu utilisent un éclairage polarisé qui contrôle les reflets sur les emballages plastiques, les films transparents et les bouteilles en verre. Le rendu est net et fidèle.' },
      { question: 'Peut-on créer des visuels recettes sans food styling physique ?', answer: 'Oui, BlendAI génère des visuels food styling réalistes : vos produits intégrés dans des plats cuisinés, des dressages gastronomiques ou des ambiances culinaires (petit-déjeuner, brunch, apéro).' },
      { question: 'Le packshot 360° fonctionne-t-il pour les produits alimentaires ?', answer: 'Oui, la rotation 360° est idéale pour les packagings alimentaires : elle permet de montrer les informations nutritionnelles, la liste des ingrédients et le design sur toutes les faces.' },
      { question: 'Combien de produits alimentaires peut-on photographier par jour ?', answer: 'En moyenne 30 à 50 packagings par jour avec détourage automatique fond blanc. Le workflow est optimisé pour les gammes larges de produits alimentaires.' },
    ],
  },

  // 5. COSMÉTIQUES / BEAUTÉ
  {
    slug: 'cosmetiques-beaute',
    titre: 'Photo Cosmétiques & Beauté : Packshot & Lifestyle Luxe IA',
    description:
      'Studios photo pour cosmétiques (flacons, pots) + IA lifestyle beauté (portés, ambiances spa, luxe).',
    hero: {
      titre: 'Photo Cosmétiques Pro : Packshot & Lifestyle Beauté',
      sousTitre: 'Capturez vos produits beauté et créez ambiances lifestyle luxe',
      description:
        'Packshot haute résolution (flacons, pots, tubes) + visuels lifestyle IA (portés, ambiances spa, luxe).',
    },
    problematiques: {
      titre: 'Défis Photo Cosmétiques',
      items: [
        'Reflets flacons verre/plastique brillant difficiles à contrôler',
        'Transparences : liquides visibles dans flacons (sérums, parfums)',
        'Packaging luxe : textures (nacré, doré, velours) à rendre fidèlement',
        'Visuels portés lifestyle (mains, visages) coûteux (mannequins, maquilleurs)',
        'Cohérence gammes 50-200+ références difficile manuellement',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Cosmétiques',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Beauté',
          description: 'Packshot haute fidélité flacons, pots, tubes',
          avantages: [
            'Gestion reflets : contrôle reflets verre/plastique brillants',
            'Transparences parfaites : liquides visibles dans flacons transparents',
            'Textures luxe : rendu fidèle textures nacré, doré, velours',
            'Détourage auto : fond blanc parfait sans retouche manuelle',
            '360° packagings : rotations interactives flacons',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Beauté',
          description: 'Visuels portés et ambiances luxe via IA',
          avantages: [
            'Portés IA : produits sur mains, visages mannequins diversifiés',
            'Ambiances spa/luxe : décors marbre, bois zen, textiles doux',
            'Styles personnalisés : ADN marque (Sephora-like, luxe parisien...)',
            'Production série : 30-100 visuels lifestyle/jour',
            'ROI : -85% vs shootings mannequins beauté',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Marque cosmétiques bio 120 SKUs',
        description:
          'Packshot + 3 visuels lifestyle IA (porté, ambiance spa, zoom texture). Conversion e-commerce +40%.',
      },
    ],
    cta: {
      titre: 'Sublimez vos cosmétiques',
      description: 'Devis packshot beauté + démo lifestyle luxe IA.',
    },
    faq: [
      { question: 'Comment photographier des flacons transparents avec le liquide visible ?', answer: 'Les studios Orbitvu gèrent les transparences grâce à un éclairage spécifique qui rend les liquides visibles dans les flacons (sérums, parfums, huiles) tout en contrôlant les reflets du verre.' },
      { question: 'Peut-on créer des visuels portés cosmétiques sans mannequin ?', answer: 'Oui, BlendAI génère des visuels portés réalistes : produits sur mains, visages de mannequins diversifiés, dans des ambiances spa et luxe. Production de 30 à 100 visuels lifestyle par jour.' },
      { question: 'Comment rendre fidèlement les textures luxe des packagings ?', answer: 'Les studios Orbitvu capturent les textures nacrées, dorées et velours avec une fidélité colorimétrique absolue. L\'éclairage est calibré pour sublimer les finitions premium.' },
      { question: 'Le détourage automatique fonctionne-t-il sur les produits cosmétiques ?', answer: 'Oui, le détourage automatique produit un fond blanc parfait même sur les flacons transparents ou les produits aux contours complexes (pots, tubes, sprays).' },
    ],
  },

  // 6. MODE / TEXTILE
  {
    slug: 'mode-textile',
    titre: 'Photo Produit Mode & Textile : Packshot Vêtements & Mannequins IA',
    description:
      'Studios packshot vêtements à plat/mannequin invisible + IA mannequins lifestyle (portés réalistes).',
    hero: {
      titre: 'Photo Mode Pro : Packshot & Mannequins Lifestyle IA',
      sousTitre: 'Du packshot vêtement plat aux portés mannequins IA',
      description:
        'Packshot textile professionnel (plat, mannequin invisible) + visuels portés mannequins IA lifestyle.',
    },
    problematiques: {
      titre: 'Défis Photo Mode',
      items: [
        'Packshot à plat : tomber vêtement peu valorisant vs porté',
        'Mannequin invisible : rendu volume mais nécessite matériel spécialisé',
        'Shootings mannequins lifestyle très coûteux (mannequins, stylistes, studio)',
        'Délais longs : 1 jour/20-30 vêtements portés',
        'Cohérence lookbook difficile sur collections 100-500+ pièces',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Mode',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Textile',
          description: 'Packshot plat, mannequin invisible, 360°',
          avantages: [
            'Packshot plat haute qualité : textures tissus fidèles',
            'Mannequin invisible : volume vêtement valorisé sans mannequin visible',
            '360° textile : rotations interactives vêtements portés',
            'Détourage auto : fond blanc parfait',
            'Rapidité : 50-100 vêtements packshot/jour',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Mannequins Lifestyle',
          description: 'Vêtements portés par mannequins IA réalistes',
          avantages: [
            'Mannequins IA diversifiés : morphologies, ethnies, âges variés',
            'Contextes lifestyle : rue urbaine, café, bureau, soirée',
            'Styles personnalisés : ADN marque (streetwear, luxe, casual...)',
            'Production série : 100-300 visuels portés/jour',
            'ROI : -80% vs shootings mannequins physiques',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Marque vêtements 400 SKUs/saison',
        description:
          'Packshot mannequin invisible + 2 visuels portés IA lifestyle. Délais -75%. Taux retour -15% (visualisation portée améliorée).',
      },
    ],
    cta: {
      titre: 'Optimisez vos visuels mode',
      description: 'Devis packshot textile + démo mannequins IA.',
    },
    faq: [
      { question: 'Qu\'est-ce que le mannequin invisible en photo mode ?', answer: 'Le mannequin invisible (ghost mannequin) est une technique où le vêtement est photographié sur un mannequin puis le mannequin est retiré numériquement, donnant un effet de volume 3D sans mannequin visible.' },
      { question: 'Peut-on créer des visuels portés par des mannequins IA ?', answer: 'Oui, BlendAI génère des mannequins IA diversifiés (morphologies, ethnies, âges) portant vos vêtements dans des contextes lifestyle : rue urbaine, café, bureau, soirée. 100 à 300 visuels par jour.' },
      { question: 'Combien de vêtements peut-on photographier en packshot par jour ?', answer: 'En packshot à plat ou mannequin invisible, vous pouvez photographier 50 à 100 vêtements par jour avec détourage automatique fond blanc et cohérence absolue sur toute la collection.' },
      { question: 'Les visuels IA remplacent-ils les shootings mannequins physiques ?', answer: 'BlendAI réduit de 80% le besoin de shootings mannequins physiques. Les visuels portés IA sont utilisés pour les fiches produit e-commerce, les lookbooks et les réseaux sociaux.' },
    ],
  },

  // 7. ÉLECTRONIQUE / HIGH-TECH
  {
    slug: 'electronique-hightech',
    titre: 'Photo Produit Électronique & High-Tech : Packshot Précis & Lifestyle IA',
    description:
      'Studios packshot électronique (smartphones, écouteurs, ordinateurs) + IA lifestyle tech (ambiances bureau, nomade).',
    hero: {
      titre: 'Photo Électronique Pro : Packshot & Lifestyle Tech',
      sousTitre: 'Capturez détails techniques et créez ambiances high-tech',
      description:
        'Packshot haute résolution produits électroniques + visuels lifestyle IA (bureaux modernes, nomadisme digital).',
    },
    problematiques: {
      titre: 'Défis Photo High-Tech',
      items: [
        'Reflets écrans difficiles à contrôler (smartphones, tablettes, ordinateurs)',
        'Détails techniques à capturer (ports, boutons, textures aluminium)',
        'Packagings premium : boîtes Apple-like, finitions luxe à rendre fidèlement',
        'Visuels lifestyle tech (bureaux, coworking) coûteux à produire',
        'Catalogues larges (50-300+ SKUs) nécessitant rapidité',
      ],
    },
    solutions: {
      titre: 'Nos Solutions High-Tech',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Électronique',
          description: 'Packshot haute résolution produits électroniques',
          avantages: [
            'Gestion reflets écrans : éclairage polarisé contrôlé',
            'Détails macro : capture ports USB, boutons, textures alu/plastique',
            'Packagings premium : rendu fidèle boîtes luxe, finitions',
            '360° produits : rotations interactives smartphones, écouteurs',
            'Rapidité : 40-80 produits électroniques/jour',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Tech',
          description: 'Produits intégrés dans ambiances tech/bureau modernes',
          avantages: [
            'Ambiances bureau moderne : espaces coworking, home office, startups',
            'Lifestyle nomade : cafés, aéroports, trains',
            'Contextes usage : gaming, productivité, créativité',
            'Production rapide : 50-150 visuels lifestyle/jour',
            'ROI : -80% vs shootings lifestyle tech',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Marque accessoires tech 200 SKUs',
        description:
          'Packshot + 2 visuels lifestyle IA (bureau moderne + nomade). Conversion Amazon +25% grâce contextualisation.',
      },
    ],
    cta: {
      titre: 'Optimisez vos visuels électronique',
      description: 'Devis packshot high-tech + démo lifestyle tech IA.',
    },
    faq: [
      { question: 'Comment éviter les reflets sur les écrans lors du packshot ?', answer: 'Les studios Orbitvu utilisent un éclairage polarisé qui élimine les reflets parasites sur les écrans de smartphones, tablettes et ordinateurs portables tout en conservant le rendu réaliste.' },
      { question: 'Le packshot 360° est-il adapté aux petits produits électroniques ?', answer: 'Oui, les studios Orbitvu capturent des rotations 360° précises pour les écouteurs, montres connectées, smartphones et accessoires. Le macro permet de montrer ports USB, boutons et textures.' },
      { question: 'Peut-on créer des visuels lifestyle tech sans shooting en bureau ?', answer: 'BlendAI place vos produits dans des ambiances réalistes : bureaux modernes, espaces coworking, home office, cafés. Production de 50 à 150 visuels lifestyle par jour.' },
      { question: 'Comment gérer les packagings premium type Apple ?', answer: 'Les studios Orbitvu capturent fidèlement les finitions premium : textures aluminium brossé, boîtes de présentation luxe, accessoires. L\'éclairage est calibré pour les matériaux high-tech.' },
    ],
    useCases: [
      {
        titre: 'Inspection visuelle PCB',
        processus: 'Détection de micro-défauts de soudure sur cartes électroniques via focus stacking et éclairage rasant contrôlé. Remplacement de l\'inspection manuelle (taux d\'erreur 20-30%).',
        fonctionsOrbitvu: ['SuperFocus', 'Éclairage rasant', '74 LED individuelles'],
        valeur: 'Détection micro-défauts soudure, réduction du taux d\'erreur d\'inspection',
      },
      {
        titre: 'Gestion obsolescence composants (DMSMS)',
        processus: 'Créer une base de référence visuelle haute résolution des composants avant obsolescence pour identification future et recherche de pièces de remplacement.',
        fonctionsOrbitvu: ['SuperFocus macro', '360°', 'Archivage', 'Auto-naming'],
        valeur: 'Base de référence DMSMS, identification fiable des composants obsolescents',
      },
    ],
  },

  // 8. PIÈCES TECHNIQUES / INDUSTRIE
  {
    slug: 'pieces-techniques-industrie',
    titre: 'Photo Pièces Techniques & Industrielles : Packshot Précision',
    description:
      'Studios packshot pour pièces techniques, mécaniques, industrielles. Netteté absolue, mesures visibles.',
    hero: {
      titre: 'Photo Pièces Techniques : Précision & Détails',
      sousTitre: 'Packshot haute résolution pour pièces mécaniques et industrielles',
      description:
        'Capturez tous les détails techniques : filetages, usinages, dimensions, matériaux.',
    },
    problematiques: {
      titre: 'Défis Photo Pièces Techniques',
      items: [
        'Détails microscopiques : filetages, usinages, gravures à capturer',
        'Pièces métalliques : reflets acier/alu difficiles à contrôler',
        'Catalogues B2B énormes (500-5000+ références) nécessitant rapidité',
        'Besoin visibilité dimensions, matériaux, finitions précises',
        'Photos manuelles incohérentes sur catalogues larges',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Pièces Techniques',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Industriel',
          description: 'Packshot haute résolution pièces techniques',
          avantages: [
            'Macrophotographie : capture filetages, usinages, détails microscopiques',
            'Gestion reflets métaux : contrôle reflets acier, aluminium, laiton',
            'Focus stacking : netteté absolue pièces 3D complexes',
            '360° pièces : rotations interactives pour catalogues techniques',
            'Rapidité : 50-150 pièces/jour selon taille',
            'Cohérence absolue : même rendu sur milliers de références',
          ],
        },
        {
          type: 'hardware',
          titre: 'Workflow Catalogues Industriels',
          description: 'Automatisation complète production visuels catalogues B2B',
          avantages: [
            'Batch processing : traitement automatisé 100-500 pièces/jour',
            'Nomenclatures intégrées : codes produits/dimensions sur visuels',
            'Export formats multiples : web, print, PDF catalogues',
            'Base données visuels : recherche rapide par référence/dimension',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Fabricant pièces auto 2000 références',
        description:
          'Packshot automatisé 360° + nomenclature intégrée. Catalogue complet photographié en 3 semaines (vs 6 mois manuellement).',
      },
    ],
    useCases: [
      {
        titre: 'Catalogue SAV équipements',
        processus: 'Créer et maintenir un catalogue visuel de 50 000+ pièces détachées pour le service après-vente. Scan code-barres, capture automatique en vues standardisées, export vers ERP/PIM.',
        fonctionsOrbitvu: ['360°', 'Auto-naming SKU', 'Multi-format', 'IQ Mask'],
        valeur: 'Autonomie documentaire interne, catalogues toujours à jour',
      },
      {
        titre: 'Documentation d\'assemblage',
        processus: 'Photographier chaque étape d\'assemblage en multi-angles pour créer des manuels techniques visuels standardisés et reproductibles entre sites.',
        fonctionsOrbitvu: ['Multi-angles', 'Templates', 'Annotations'],
        valeur: 'Manuels techniques visuels standardisés multi-sites',
      },
    ],
    cta: {
      titre: 'Automatisez vos catalogues techniques',
      description: 'Devis packshot industriel pour gros volumes.',
    },
    faq: [
      { question: 'Peut-on photographier des pièces métalliques sans reflets parasites ?', answer: 'Les studios Orbitvu intègrent un éclairage polarisé qui contrôle les reflets sur l\'acier, l\'aluminium et le laiton. Le rendu est fidèle sans surexposition ni reflets parasites.' },
      { question: 'Comment photographier des pièces très petites (filetages, usinages) ?', answer: 'La macrophotographie Orbitvu capture les détails microscopiques : filetages, usinages, gravures, poinçons. Le focus stacking assure une netteté absolue sur toute la profondeur de la pièce.' },
      { question: 'Quel volume de pièces techniques peut-on traiter par jour ?', answer: 'En batch processing automatisé, 50 à 150 pièces par jour selon la taille, avec nomenclatures intégrées (codes produits, dimensions) et export multi-formats.' },
      { question: 'L\'intégration avec notre ERP/PIM est-elle possible ?', answer: 'Oui, les studios Orbitvu s\'intègrent avec les systèmes PIM/ERP via export automatisé avec nomenclatures, codes produits et dimensions directement liés aux visuels.' },
    ],
  },

  // 9. AUTOMOBILE (pièces détachées)
  {
    slug: 'automobile-pieces-detachees',
    titre: 'Photo Pièces Détachées Automobile : Packshot Pro Garage & E-commerce',
    description:
      'Studios packshot pièces auto : précision technique, rotations 360°, catalogues e-commerce garage.',
    hero: {
      titre: 'Photo Pièces Auto Pro : Packshot Haute Précision',
      sousTitre: 'Catalogues pièces détachées automobile professionnels',
      description:
        'Packshot pièces auto haute résolution : filtres, plaquettes, optiques, pare-chocs. 360° et détails techniques.',
    },
    problematiques: {
      titre: 'Défis Photo Pièces Auto',
      items: [
        'Catalogues gigantesques : 1000-10000+ références à photographier',
        'Pièces variées : petites (joints) vs grandes (pare-chocs)',
        'Matériaux mixtes : plastique, métal, caoutchouc sur même pièce',
        'Besoin rotations 360° pour identification pièces par garagistes',
        'Délais urgents : nouvelles pièces à ajouter chaque semaine',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Pièces Auto',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Automobile',
          description: 'Packshot automatisé pièces détachées tous formats',
          avantages: [
            'Multi-formats : studios petites pièces → grands éléments carrosserie',
            '360° automatique : rotations identification rapide pièces',
            'Détourage fond blanc : intégration directe e-commerce',
            'Macrophotographie : détails joints, connecteurs, filetages',
            'Rapidité : 100-300 pièces/jour selon formats',
          ],
        },
        {
          type: 'hardware',
          titre: 'Workflow Catalogues Pièces Auto',
          description: 'Intégration automatique ERP/e-commerce',
          avantages: [
            'Import nomenclatures : codes OEM, dimensions, compatibilités',
            'Export multi-formats : web, marketplaces (eBay Motors, Amazon Auto)',
            'Base données visuels : recherche par marque/modèle/année',
            'Mise à jour continue : ajout nouvelles pièces quotidien',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Distributeur pièces auto 5000 SKUs',
        description:
          'Packshot + 360° automatisés. Catalogue complet en 6 semaines. Ventes e-commerce +60% (visibilité pièces améliorée).',
      },
    ],
    useCases: [
      {
        titre: 'QC sortie de production',
        processus: 'Contrôle qualité visuel en bout de ligne : comparaison automatique de chaque pièce avec l\'échantillon de référence (golden sample) pour détecter les défauts surface et peinture.',
        fonctionsOrbitvu: ['Templates', 'Ghost Image', 'Éclairage contrôlé'],
        valeur: 'Détection défauts automatisée, élimination de la variabilité humaine',
      },
      {
        titre: 'Catalogage aftermarket e-commerce',
        processus: 'Photographier 500+ pièces/jour en packshot + 360° avec export automatique vers les marketplaces et le catalogue e-commerce interne.',
        fonctionsOrbitvu: ['360°', 'Multi-export', 'Auto-naming OEM', 'IQ Mask'],
        valeur: 'Réduction de 70% du time-to-market vs sous-traitance photo',
      },
    ],
    cta: {
      titre: 'Automatisez vos catalogues pièces auto',
      description: 'Devis packshot automobile gros volumes.',
    },
    faq: [
      { question: 'Comment gérer un catalogue de plusieurs milliers de pièces auto ?', answer: 'Les studios Orbitvu en batch processing automatisé traitent 100 à 300 pièces par jour avec import des nomenclatures OEM, codes compatibilité et export direct vers vos plateformes e-commerce.' },
      { question: 'Le 360° aide-t-il les garagistes à identifier les pièces ?', answer: 'Oui, la rotation 360° permet aux professionnels d\'identifier visuellement les pièces sous tous les angles sans ambiguïté, réduisant les erreurs de commande et les retours.' },
      { question: 'Peut-on photographier des pièces de tailles très différentes ?', answer: 'Les studios Orbitvu couvrent tous les formats : des petits joints et connecteurs en macrophotographie aux grands éléments de carrosserie (pare-chocs, capots) sur plateaux grand format.' },
      { question: 'Comment le studio détecte-t-il les défauts en sortie de production ?', answer: 'Le workflow de comparaison superpose l\'image capturée avec le golden sample via Ghost Image. Les écarts de surface, couleur ou finition sont immédiatement visibles. Les templates garantissent des conditions d\'éclairage identiques à chaque contrôle.' },
    ],
  },

  // 10. JOUETS / PUÉRICULTURE
  {
    slug: 'jouets-puericulture',
    titre: 'Photo Jouets & Puériculture : Packshot & Ambiances Enfants IA',
    description:
      'Studios packshot jouets/puériculture + IA lifestyle (chambres enfants, aires de jeu).',
    hero: {
      titre: 'Photo Jouets Pro : Packshot & Lifestyle Enfants',
      sousTitre: 'Packshot produits + ambiances chambres enfants IA',
      description:
        'Packshot jouets haute qualité + visuels lifestyle IA (enfants jouant, chambres colorées).',
    },
    problematiques: {
      titre: 'Défis Photo Jouets',
      items: [
        'Packagings colorés : couleurs vives à rendre fidèlement',
        'Produits variés : petits jouets vs grands (vélos, toboggans)',
        'Visuels lifestyle (enfants jouant) très réglementés et coûteux',
        'Catalogues saisonniers larges : 200-500 jouets Noël/rentrée',
        'Besoin visuels ludiques attractifs vs packshot seul peu engageant',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Jouets',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Jouets',
          description: 'Packshot packagings et produits déballés',
          avantages: [
            'Couleurs fidèles : rendu précis couleurs vives jouets',
            'Multi-formats : petits jouets → grands équipements (vélos, toboggans)',
            '360° jouets : rotations interactives produits déballés',
            'Packshot packaging + produit : 2 visuels automatiques',
            'Rapidité : 80-150 jouets/jour',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Enfants',
          description: 'Jouets intégrés dans ambiances ludiques',
          avantages: [
            'Chambres enfants colorées : décors ludiques, aires de jeu',
            'Contextes usage : parcs, plages, salons familiaux',
            'Styles personnalisés : univers marque (Lego-like, Fisher-Price-like)',
            'Production rapide : 50-100 visuels lifestyle/jour',
            'Conformité : pas de vrais enfants photographiés (évite réglementations strictes)',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Marque jouets éducatifs 180 SKUs',
        description:
          'Packshot + 2 visuels ambiances IA enfants. Conversion e-commerce +45% (visualisation usage améliorée).',
      },
    ],
    cta: {
      titre: 'Optimisez vos visuels jouets',
      description: 'Devis packshot + démo lifestyle enfants IA.',
    },
    faq: [
      { question: 'Comment rendre fidèlement les couleurs vives des jouets ?', answer: 'Les studios Orbitvu sont calibrés colorimétriquement pour un rendu précis des couleurs vives. Les rouges, jaunes et bleus des jouets sont reproduits fidèlement sur les photos packshot.' },
      { question: 'Peut-on photographier les jouets dans leur emballage ET déballés ?', answer: 'Oui, le workflow Orbitvu permet de capturer 2 visuels automatiques : le packaging complet et le produit déballé, avec détourage fond blanc pour les deux.' },
      { question: 'Les visuels lifestyle IA évitent-ils les réglementations sur les photos d\'enfants ?', answer: 'Oui, BlendAI crée des ambiances ludiques (chambres enfants, aires de jeu) sans photographier de vrais enfants, ce qui évite les réglementations strictes sur l\'image des mineurs.' },
      { question: 'Comment gérer les catalogues saisonniers importants (Noël, rentrée) ?', answer: 'Les studios Orbitvu traitent 80 à 150 jouets par jour. Un catalogue saisonnier de 200 à 500 jouets peut être photographié en 2 à 4 jours avec packshot + visuels lifestyle IA.' },
    ],
  },

  // 11. SPORT / OUTDOOR
  {
    slug: 'sport-outdoor',
    titre: 'Photo Produit Sport & Outdoor : Packshot & Lifestyle Aventure IA',
    description:
      'Studios packshot équipements sport/outdoor + IA lifestyle (montagnes, trails, sports extrêmes).',
    hero: {
      titre: 'Photo Sport Pro : Packshot & Lifestyle Aventure',
      sousTitre: 'Équipements sport/outdoor en action via IA',
      description:
        'Packshot technique équipements + visuels lifestyle IA (montagnes, trails, sports extrêmes).',
    },
    problematiques: {
      titre: 'Défis Photo Sport',
      items: [
        'Packshot seul peu engageant vs produit en action',
        'Shootings outdoor (montagnes, trails) logistiquement complexes et coûteux',
        'Matériels techniques : détails (coutures, zips, membranes) à capturer',
        'Besoin visuels lifestyle inspirants pour conversion',
        'Catalogues saisonniers larges : ski hiver, trail été (200-400 SKUs/saison)',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Sport',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Sport',
          description: 'Packshot haute résolution équipements techniques',
          avantages: [
            'Détails techniques : coutures, zips, membranes Gore-Tex visibles',
            'Packshot portés mannequin invisible : volume vêtements valorisé',
            '360° équipements : rotations sacs à dos, chaussures trail',
            'Détourage auto fond blanc : intégration e-commerce',
            'Rapidité : 60-120 produits/jour',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI Lifestyle Aventure',
          description: 'Équipements en action via IA (montagnes, trails, sports)',
          avantages: [
            'Contextes outdoor : montagnes, forêts, trails, escalade, ski',
            'Athletes IA : sportifs en action portant équipements',
            'Conditions extrêmes : neige, pluie, brouillard, soleil',
            'Styles personnalisés : ADN marque (Patagonia-like, North Face-like)',
            'Production rapide : 50-150 visuels lifestyle/jour',
            'ROI : -90% vs shootings outdoor montagne',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Marque trail running 120 produits',
        description:
          'Packshot + 3 visuels lifestyle IA (montagne, forêt, ultra-trail). Engagement Instagram +180%.',
      },
    ],
    cta: {
      titre: 'Sublimez vos équipements outdoor',
      description: 'Devis packshot sport + démo lifestyle aventure IA.',
    },
    faq: [
      { question: 'Peut-on créer des visuels outdoor (montagne, trail) sans shooting extérieur ?', answer: 'Oui, BlendAI génère des visuels lifestyle outdoor réalistes : montagnes, forêts, trails, neige, pluie. Vos équipements sont intégrés dans des contextes aventure sans quitter le studio.' },
      { question: 'Comment capturer les détails techniques des vêtements sport ?', answer: 'Les studios Orbitvu capturent les détails techniques en haute résolution : coutures renforcées, zips étanches, membranes respirantes, textures des tissus techniques.' },
      { question: 'Le packshot mannequin invisible fonctionne-t-il pour les vêtements sport ?', answer: 'Oui, le mannequin invisible valorise le volume des vestes, pantalons et polaires sport. Le rendu 3D est idéal pour les fiches produit e-commerce outdoor.' },
      { question: 'Comment gérer les catalogues saisonniers ski/trail ?', answer: 'Les studios Orbitvu traitent 60 à 120 produits par jour. Un catalogue saisonnier de 200 à 400 SKUs peut être photographié en 2 à 4 jours avec packshot + visuels lifestyle aventure IA.' },
    ],
  },

  // 12. SANTÉ / MÉDICAL
  {
    slug: 'sante-medical',
    titre: 'Photo Produit Médical & Santé : Packshot Précision Réglementaire',
    description:
      'Studios packshot dispositifs médicaux, produits santé. Précision, conformité réglementaire.',
    hero: {
      titre: 'Photo Médical Pro : Packshot Haute Précision Conforme',
      sousTitre: 'Dispositifs médicaux, produits santé photographiés avec précision',
      description:
        'Packshot conforme réglementations dispositifs médicaux, produits santé, matériel médical.',
    },
    problematiques: {
      titre: 'Défis Photo Médical',
      items: [
        'Précision absolue requise : détails dispositifs médicaux critiques',
        'Conformité réglementaire : photos doivent respecter normes CE/FDA',
        'Matériels variés : petits (seringues) vs grands (lits médicaux)',
        'Catalogues techniques B2B/professionnels santé : milliers références',
        'Besoin visuels neutres, professionnels, sans enjolivement',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Médical',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Packshot Médical',
          description: 'Packshot haute précision dispositifs médicaux',
          avantages: [
            'Précision absolue : capture détails critiques dispositifs médicaux',
            'Macrophotographie : seringues, instruments chirurgicaux, implants',
            'Multi-formats : petits dispositifs → grands équipements (lits, IRM)',
            '360° dispositifs : rotations interactives catalogues professionnels',
            'Conformité : visuels neutres, professionnels, conformes réglementations',
            'Rapidité : 50-200 dispositifs/jour selon taille',
          ],
        },
        {
          type: 'hardware',
          titre: 'Workflow Catalogues Médicaux',
          description: 'Automatisation catalogues B2B professionnels santé',
          avantages: [
            'Nomenclatures intégrées : codes CE, FDA, dimensions, matériaux',
            'Export formats multiples : catalogues PDF, e-commerce B2B',
            'Base données visuels : recherche par référence/catégorie médicale',
            'Traçabilité : historique visuels par lot/série dispositif',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Fabricant dispositifs médicaux 800 SKUs',
        description:
          'Packshot conforme + nomenclatures intégrées. Catalogue certifié CE en 4 semaines. Validation réglementaire simplifiée.',
      },
    ],
    useCases: [
      {
        titre: 'Documentation de lot conforme',
        processus: 'Intégrer des photos standardisées dans les dossiers de lot de chaque dispositif médical. Traçabilité visuelle complète pour les audits FDA et ANSM.',
        fonctionsOrbitvu: ['Templates', 'Focus stacking', 'Horodatage', 'Export'],
        valeur: 'Documentation de lot inattaquable, prête pour les audits réglementaires',
      },
      {
        titre: 'Catalogage instruments chirurgicaux',
        processus: 'Identifier visuellement chaque instrument avec précision via vues 360° et détourage automatique pour les systèmes de suivi de stérilisation et d\'inventaire.',
        fonctionsOrbitvu: ['360°', 'IQ Mask', 'SuperFocus', 'Auto-naming'],
        valeur: 'Identification visuelle précise, conformité ISO 13485',
      },
    ],
    cta: {
      titre: 'Catalogues médicaux conformes',
      description: 'Devis packshot médical précision + conformité.',
    },
    faq: [
      { question: 'Les photos packshot médical respectent-elles les normes CE/FDA ?', answer: 'Les studios Orbitvu produisent des visuels neutres, professionnels et conformes aux exigences de documentation réglementaire CE et FDA. Chaque visuel est traçable par lot et série.' },
      { question: 'Peut-on photographier des dispositifs médicaux de toutes tailles ?', answer: 'Oui, de la seringue aux lits médicaux : macrophotographie pour les petits instruments chirurgicaux, studios grand format pour les équipements volumineux (IRM, fauteuils).' },
      { question: 'Comment intégrer les photos dans nos catalogues professionnels santé ?', answer: 'L\'export est automatisé avec nomenclatures intégrées : codes CE, FDA, dimensions, matériaux. Les visuels sont directement exploitables pour catalogues PDF et e-commerce B2B.' },
      { question: 'Quelle traçabilité pour les visuels de dispositifs médicaux ?', answer: 'Le workflow Orbitvu assure une traçabilité complète : historique par lot, série et opérateur. Chaque visuel est horodaté et lié à sa référence produit pour l\'audit réglementaire.' },
    ],
  },

  // 13. INDUSTRIE MANUFACTURIÈRE
  {
    slug: 'industrie-manufacturiere',
    titre: 'Photo Produit Industrie Manufacturière : Packshot & Documentation',
    description:
      'Studios photo automatisés pour l\'industrie manufacturière. Documentation technique, catalogues pièces détachées, contrôle qualité visuel.',
    hero: {
      titre: 'Solutions Photo pour l\'Industrie Manufacturière',
      sousTitre: 'Documentez vos produits et pièces avec précision',
      description:
        'Automatisez la documentation visuelle de vos produits manufacturés : pièces détachées, assemblages, contrôle qualité. Standardisation et intégration PIM/ERP.',
    },
    problematiques: {
      titre: 'Défis Photo Industrie Manufacturière',
      items: [
        'Volume important de références à documenter (500-10 000+ pièces)',
        'Nécessité de standardisation visuelle sur tout le catalogue technique',
        'Surfaces métalliques et réflectives complexes (acier, alu, laiton)',
        'Intégration avec les systèmes PIM/ERP existants',
        'Besoin de traçabilité et cohérence sur les mises à jour catalogue',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Industrie Manufacturière',
      items: [
        {
          type: 'hardware',
          titre: 'Studios Automatisés Haute Cadence',
          description:
            'Productivité, régularité et intégration pour vos catalogues industriels',
          avantages: [
            'Productivité : 100-300 pièces photographiées par jour',
            'Régularité absolue : même éclairage, même cadrage sur chaque référence',
            'Intégration directe PIM/ERP via nomenclatures et codes produit',
            'Multi-formats : de la petite pièce au sous-ensemble volumineux',
            'Workflow automatisé : capture, détourage, export en quelques secondes',
          ],
        },
        {
          type: 'hardware',
          titre: 'Photo 360° & Documentation Technique',
          description:
            'Documentation complète pour catalogues et réduction des retours SAV',
          avantages: [
            'Rotations 360° interactives pour identification pièces sans ambiguïté',
            'Réduction des retours SAV grâce à une meilleure visualisation',
            'Macrophotographie pour détails techniques (filetages, usinages)',
            'Export multi-formats : web, PDF catalogues, applications mobiles',
          ],
        },
        {
          type: 'ia',
          titre: 'IA Retouche & Normalisation',
          description:
            'Détourage automatique et normalisation visuelle par IA',
          avantages: [
            'Détourage automatique IQ Mask pour fond blanc normalisé',
            'Cohérence colorimétrique sur l\'ensemble du catalogue',
            'Traitement par lots pour mises à jour catalogue rapides',
            'Archivage structuré par référence, famille et catégorie produit',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Fabricant équipements industriels 3000 références',
        description:
          'Catalogue complet photographié en 4 semaines (vs 4 mois manuellement). Intégration PIM automatisée. Erreurs de commande -40% grâce aux visuels 360°.',
      },
    ],
    useCases: [
      {
        titre: 'Station QC visuelle en production',
        processus: 'Intégrer une station de contrôle qualité photographique en bout de ligne de production. Comparaison automatique avec l\'échantillon de référence pour détecter les écarts visuels.',
        fonctionsOrbitvu: ['Templates', 'Ghost Image', 'Éclairage contrôlé', 'Export QMS'],
        valeur: 'Élimination de l\'erreur humaine en inspection visuelle',
      },
      {
        titre: 'Catalogue SAV multi-sites',
        processus: 'Standardiser la documentation visuelle de 50 000+ pièces détachées entre plusieurs usines avec les mêmes paramètres de capture, même éclairage, mêmes vues.',
        fonctionsOrbitvu: ['Templates', '360°', 'Auto-naming', 'Intégration ERP'],
        valeur: 'Cohérence visuelle entre sites, mises à jour continues du catalogue',
      },
      {
        titre: 'Manuels techniques visuels',
        processus: 'Créer des manuels d\'assemblage et de maintenance illustrés avec vues multi-angles standardisées de chaque sous-ensemble et pièce critique.',
        fonctionsOrbitvu: ['Multi-angles', 'SuperFocus', '360° interactif'],
        valeur: 'Formation accélérée des techniciens, documentation multi-sites',
      },
    ],
    cta: {
      titre: 'Optimisez votre documentation produit',
      description:
        'Devis personnalisé studio automatisé pour votre catalogue industriel.',
    },
    faq: [
      { question: 'Combien de pièces industrielles peut-on photographier par jour ?', answer: 'En production automatisée haute cadence, 100 à 300 pièces par jour avec détourage automatique, nomenclatures intégrées et export direct vers votre PIM/ERP.' },
      { question: 'L\'intégration PIM/ERP est-elle native ?', answer: 'Oui, les studios Orbitvu s\'intègrent avec vos systèmes PIM et ERP via export automatisé des visuels avec codes produits, dimensions et métadonnées directement liés à vos nomenclatures.' },
      { question: 'La photo 360° réduit-elle les retours SAV ?', answer: 'Les rotations 360° interactives permettent une identification sans ambiguïté des pièces, réduisant significativement les erreurs de commande et les retours SAV dans les catalogues B2B.' },
      { question: 'Comment assurer la cohérence sur un catalogue de milliers de références ?', answer: 'Le studio automatisé garantit le même éclairage, le même cadrage et la même colorimétrie sur chaque référence. Le workflow standardisé élimine les variations entre opérateurs.' },
    ],
  },

  // 14. DÉFENSE & SÉCURITÉ
  {
    slug: 'defense-securite',
    titre: 'Documentation Visuelle Défense & Sécurité : Conforme, Traçable, Sécurisée',
    description:
      'Studios photo automatisés pour la défense et l\'industrie de sécurité. Documentation MRO, inventaire anti-contrefaçon, catalogage IUID/UID, workflow air-gapped sans cloud.',
    hero: {
      titre: 'Documentation Visuelle pour la Défense et la Sécurité',
      sousTitre: 'MRO, inventaire, anti-contrefaçon, formation : au-delà du packshot',
      description:
        'Studios photo sur site, workflows air-gapped et traçabilité complète pour la documentation de vos matériels, l\'inventaire de pièces détachées et le suivi de maintenance.',
    },
    problematiques: {
      titre: 'Défis de la documentation visuelle en défense',
      items: [
        'Documentation photographique par smartphone non standardisée : angles, éclairages et opérateurs variables, inutilisable pour les audits',
        'Impossibilité de prouver la conformité visuelle dans le temps sans référence photographique reproductible',
        'Identification visuelle des pièces détachées peu fiable : contrefaçon et stock excédentaire non identifié',
        'Confidentialité stricte : aucune donnée visuelle ne peut transiter par le cloud ou quitter le site',
        'Manuels de maintenance textuels insuffisants pour la formation des nouveaux techniciens',
        'Absence de traçabilité photographique dans les rapports de non-conformité (NCR)',
      ],
    },
    solutions: {
      titre: 'Nos Solutions Défense & Sécurité',
      items: [
        {
          titre: 'Documentation MRO standardisée',
          description:
            'Capturez l\'état de chaque pièce avant et après intervention avec une répétabilité certifiable',
          avantages: [
            'Workflow avant/après : même éclairage, même angle, comparaison automatique via Ghost Image',
            'Détection de dégradation temporelle par superposition d\'images horodatées',
            'Rapports d\'intervention illustrés générés automatiquement',
            'Intégration GMAO/CMMS (Maximo, SAP PM) pour traçabilité complète',
          ],
        },
        {
          titre: 'Inventaire & anti-contrefaçon',
          description:
            'Identification visuelle fiable de chaque pièce pour vos catalogues et inventaires conformes',
          avantages: [
            'Catalogage 360° avec nommage automatique SKU/NSN conforme NATO',
            'Empreintes visuelles haute résolution via SuperFocus pour détection de contrefaçon',
            'Documentation conforme IUID/UID et MIL-STD-130',
            'Fonctionnement 100% hors ligne (air-gapped), stockage local chiffré',
          ],
        },
        {
          titre: 'Formation technique immersive',
          description:
            'Créez des supports de formation interactifs sans immobiliser l\'équipement',
          avantages: [
            'Vues 360° interactives avec hotspots cliquables sur les détails critiques',
            'Modèles 3D de pièces via photogrammétrie pour intégration AR/VR',
            'Manuels techniques visuels standardisés multi-angles',
            'Export compatible LMS et systèmes de formation existants',
          ],
        },
      ],
    },
    useCases: [
      {
        titre: 'Documentation MRO aéronautique',
        processus: 'Capturer l\'état des pièces avant et après chaque intervention de maintenance sur aéronefs militaires. Créer une base de référence visuelle pour le suivi de dégradation.',
        fonctionsOrbitvu: ['Ghost Image', '360°', 'Templates', 'Color Beautifier'],
        valeur: 'Preuve de conformité reproductible pour audits AS9100 et MIL-STD',
      },
      {
        titre: 'Inventaire pièces véhicules blindés',
        processus: 'Photographier et cataloguer chaque pièce détachée avec identification standardisée pour les systèmes de gestion de stock défense.',
        fonctionsOrbitvu: ['360°', 'Auto-naming SKU', 'DAM', 'SuperFocus'],
        valeur: 'Identification visuelle fiable, réduction du stock excédentaire',
      },
      {
        titre: 'Anti-contrefaçon supply chain',
        processus: 'Créer des empreintes visuelles haute résolution de chaque pièce authentique pour détecter les contrefaçons dans la chaîne d\'approvisionnement.',
        fonctionsOrbitvu: ['SuperFocus', 'Éclairage 74 LED', 'Templates', 'Archivage'],
        valeur: 'Détection d\'anomalies de surface, base de référence anti-contrefaçon',
      },
      {
        titre: 'Formation maintenance sans immobilisation',
        processus: 'Générer des vues 360° interactives et des modèles 3D de pièces critiques pour former les techniciens sans immobiliser l\'équipement opérationnel.',
        fonctionsOrbitvu: ['360° interactif', 'Photogrammétrie', 'SUN Cloud', 'Export AR/VR'],
        valeur: 'Formation immersive, équipement reste opérationnel',
      },
    ],
    cta: {
      titre: 'Une solution adaptée à vos contraintes',
      description:
        'Échangeons sur vos exigences de confidentialité, traçabilité et documentation pour concevoir un déploiement sur mesure.',
    },
    faq: [
      { question: 'Le studio peut-il fonctionner entièrement hors ligne (air-gapped) ?', answer: 'Oui, les studios Orbitvu fonctionnent 100% hors ligne. Aucune donnée n\'est envoyée sur le cloud. Le stockage est local avec chiffrement des données visuelles au repos et en transit. C\'est le mode de fonctionnement standard pour les sites classifiés.' },
      { question: 'Comment le système détecte-t-il la dégradation des pièces dans le temps ?', answer: 'La fonction Ghost Image superpose l\'image actuelle avec la photo de référence de la pièce. Combinée aux templates sauvegardés (même éclairage, même angle), elle permet une comparaison visuelle objective et horodatée, intervention après intervention.' },
      { question: 'Le nommage des fichiers est-il compatible avec les systèmes NATO (NSN) ?', answer: 'Oui, l\'export automatisé permet un nommage conforme NSN (NATO Stock Number) ou IUID/UID selon vos référentiels. L\'intégration avec vos systèmes de gestion (SAP, Maximo, ERP) est directe via les formats d\'export multi-format.' },
      { question: 'Peut-on créer des supports de formation AR/VR à partir des captures ?', answer: 'Oui, les sessions photogrammétrie permettent de générer des modèles 3D exportables aux formats gITF et USDZ pour intégration en réalité augmentée. Les vues 360° interactives avec hotspots sont également disponibles via Orbitvu SUN Cloud.' },
      { question: 'Comment le système aide-t-il à lutter contre la contrefaçon ?', answer: 'Le SuperFocus (focus stacking) combiné aux 74 LED individuellement contrôlables crée des empreintes visuelles haute résolution de chaque pièce authentique. Ces références standardisées permettent de détecter les anomalies de surface caractéristiques des pièces contrefaites.' },
      { question: 'Quel est le déploiement type sur un site sécurisé ?', answer: 'Les studios sont compacts et déployables en quelques heures sur site client. L\'installation inclut la configuration des templates métier, la formation des opérateurs et l\'intégration avec vos systèmes existants. Maintenance et support sont assurés sur site par nos techniciens.' },
    ],
  },

  // 15. LUNETTERIE & OPTIQUE
  {
    slug: 'lunetterie',
    titre: 'Photo Produit Professionnelle pour Lunetterie & Optique',
    description:
      'Solutions packshot et IA pour montures optiques et solaires : studios automatisés Orbitvu avec gestion des reflets et transparences.',
    hero: {
      titre: 'Lunetterie & Optique',
      sousTitre: 'Packshot montures sans reflets, visuels lifestyle par IA',
      description:
        'Les montures optiques et solaires exigent une maîtrise parfaite des reflets sur les verres et des matières (métal, acétate, titane). Nos studios Orbitvu et l\'IA BlendAI produisent des visuels catalogue et lifestyle à la hauteur de vos collections.',
    },
    problematiques: {
      titre: 'Les défis de la photo de lunettes',
      items: [
        'Reflets parasites sur les verres et le métal',
        'Rendu fidèle des couleurs et matières (acétate, titane, or)',
        'Volumes de collection importants (200-800 montures/saison)',
        'Besoin de visuels portés et lifestyle pour le e-commerce',
      ],
    },
    solutions: {
      titre: 'Solutions packshot et IA pour la lunetterie',
      items: [
        {
          type: 'hardware',
          titre: 'Studio Orbitvu — Packshot montures',
          description:
            'Éclairage LED anti-reflets optimisé pour les verres et surfaces métalliques. Packshot fond blanc, 360° et détourage automatique.',
          avantages: [
            'Éclairage polarisé pour éliminer les reflets',
            'Rendu fidèle des couleurs et textures',
            'Packshot automatisé en moins de 10 secondes',
            'Vue 360° pour les boutiques en ligne',
          ],
        },
        {
          type: 'ia',
          titre: 'BlendAI.studio — Visuels lifestyle optique',
          description:
            'Générez des visuels portés et des mises en scène lifestyle à partir de vos packshots, sans mannequin ni photographe.',
          avantages: [
            'Visuels portés générés par IA à partir du packshot',
            'Ambiances personnalisables par collection',
            'Production série rapide pour les catalogues saisonniers',
            'Cohérence visuelle sur toute la gamme',
          ],
        },
      ],
    },
    casClients: [
      {
        titre: 'Opticien premium — 400 montures/saison',
        description:
          'Passage de 2 semaines à 3 jours pour le shooting collection. Qualité constante sur les reflets et les couleurs. Budget photo réduit de 65%.',
      },
    ],
    cta: {
      titre: 'Testez avec vos montures',
      description:
        'Réservez une démo personnalisée avec vos propres montures. 30 minutes pour voir la différence.',
    },
    faq: [
      { question: 'Comment gérez-vous les reflets sur les verres ?', answer: 'Nos studios utilisent un éclairage LED polarisé et des protocoles de prise de vue spécifiques à la lunetterie. Les reflets parasites sont éliminés dès la capture, sans retouche nécessaire.' },
      { question: 'Peut-on photographier des montures en métal très réfléchissant ?', answer: 'Oui, l\'éclairage LED circulaire des studios Orbitvu est conçu pour maîtriser les reflets sur toutes les surfaces : métal poli, titane brossé, acétate brillant.' },
      { question: 'L\'IA peut-elle générer des visuels portés à partir d\'un simple packshot ?', answer: 'Oui, BlendAI.studio génère des visuels portés réalistes à partir du packshot monture. Vous choisissez le style de mannequin et l\'ambiance par collection.' },
    ],
  },
];
