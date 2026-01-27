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
      titre: string;
      description: string;
      avantages: string[];
    }[];
  };
  casClients?: {
    titre: string;
    description: string;
  }[];
  cta: {
    titre: string;
    description: string;
  };
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
    cta: {
      titre: 'Sublimez vos produits alimentaires',
      description: 'Devis packshot food + démo styling culinaire IA.',
    },
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
    },
    cta: {
      titre: 'Sublimez vos cosmétiques',
      description: 'Devis packshot beauté + démo lifestyle luxe IA.',
    },
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
    },
    cta: {
      titre: 'Optimisez vos visuels mode',
      description: 'Devis packshot textile + démo mannequins IA.',
    },
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
    },
    cta: {
      titre: 'Automatisez vos catalogues techniques',
      description: 'Devis packshot industriel pour gros volumes.',
    },
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
    },
    cta: {
      titre: 'Automatisez vos catalogues pièces auto',
      description: 'Devis packshot automobile gros volumes.',
    },
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
    },
    cta: {
      titre: 'Optimisez vos visuels jouets',
      description: 'Devis packshot + démo lifestyle enfants IA.',
    },
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
    },
    cta: {
      titre: 'Sublimez vos équipements outdoor',
      description: 'Devis packshot sport + démo lifestyle aventure IA.',
    },
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
    },
    cta: {
      titre: 'Catalogues médicaux conformes',
      description: 'Devis packshot médical précision + conformité.',
    },
  },
];
