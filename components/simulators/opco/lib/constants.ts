import type {
  OPCO,
  OPCOCode,
  SecteurActivite,
  FormationDisponible,
  EtapeDemandeFinancement,
} from './types';

/**
 * Données des 11 OPCO avec leurs plafonds 2026
 * Source: OPCO_Qualiopi_Specs_Simulateur.md
 */
export const OPCO_DATA: Record<OPCOCode, OPCO> = {
  AFDAS: {
    code: 'AFDAS',
    nom: 'AFDAS',
    secteurs: ['culture-media'],
    siteWeb: 'https://www.afdas.com',
    plafonds: {
      moins11: { montantAnnuelMax: 5000, tauxHoraire: 30 },
      de11a49: { montantAnnuelMax: 3000, tauxHoraire: 25 },
      plus50: { montantAnnuelMax: 2000, tauxHoraire: 20 },
    },
  },
  ATLAS: {
    code: 'ATLAS',
    nom: 'OPCO Atlas',
    secteurs: ['banque-assurance'],
    siteWeb: 'https://www.opco-atlas.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 18000, tauxHoraire: 40, plafondHeures: 150 },
      de11a49: { montantAnnuelMax: 15000, tauxHoraire: 35, plafondHeures: 150 },
      plus50: { montantAnnuelMax: 10000, tauxHoraire: 30, plafondHeures: 100 },
    },
  },
  AKTO: {
    code: 'AKTO',
    nom: 'AKTO',
    secteurs: ['services-entreprises'],
    siteWeb: 'https://www.akto.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 5000, tauxHoraire: 30 },
      de11a49: { montantAnnuelMax: 3500, tauxHoraire: 25 },
      plus50: { montantAnnuelMax: 2500, tauxHoraire: 20 },
    },
  },
  OPCO2I: {
    code: 'OPCO2I',
    nom: 'OPCO 2i',
    secteurs: ['industrie'],
    siteWeb: 'https://www.opco2i.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 6000, tauxHoraire: 35 },
      de11a49: { montantAnnuelMax: 4500, tauxHoraire: 30 },
      plus50: { montantAnnuelMax: 3000, tauxHoraire: 25 },
    },
  },
  OPCO_MOBILITES: {
    code: 'OPCO_MOBILITES',
    nom: 'OPCO Mobilités',
    secteurs: ['transport-logistique'],
    siteWeb: 'https://www.opcomobilites.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 2100, tauxHoraire: 30 },
      de11a49: { montantAnnuelMax: 3600, tauxHoraire: 25 },
      plus50: { montantAnnuelMax: 4150, tauxHoraire: 20 },
    },
  },
  OPCO_EP: {
    code: 'OPCO_EP',
    nom: 'OPCO Entreprises de Proximité',
    secteurs: ['commerce-proximite', 'e-commerce'],
    siteWeb: 'https://www.opcoep.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 5000, tauxHoraire: 30, description: 'Plafond TPE favorable' },
      de11a49: { montantAnnuelMax: 3000, tauxHoraire: 25 },
      plus50: { montantAnnuelMax: 2000, tauxHoraire: 20, description: 'Plafond réduit' },
    },
  },
  OPCO_SANTE: {
    code: 'OPCO_SANTE',
    nom: 'OPCO Santé',
    secteurs: ['sante'],
    siteWeb: 'https://www.opco-sante.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 5000, tauxHoraire: 30 },
      de11a49: { montantAnnuelMax: 4000, tauxHoraire: 28 },
      plus50: { montantAnnuelMax: 3000, tauxHoraire: 25 },
    },
  },
  CONSTRUCTYS: {
    code: 'CONSTRUCTYS',
    nom: 'Constructys',
    secteurs: ['btp'],
    siteWeb: 'https://www.constructys.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 6000, tauxHoraire: 35 },
      de11a49: { montantAnnuelMax: 4500, tauxHoraire: 30 },
      plus50: { montantAnnuelMax: 3500, tauxHoraire: 25 },
    },
  },
  OPCOMMERCE: {
    code: 'OPCOMMERCE',
    nom: 'Opcommerce',
    secteurs: ['commerce-distribution'],
    siteWeb: 'https://www.lopcommerce.com',
    plafonds: {
      moins11: { montantAnnuelMax: 5000, tauxHoraire: 30 },
      de11a49: { montantAnnuelMax: 3500, tauxHoraire: 28 },
      plus50: { montantAnnuelMax: 2500, tauxHoraire: 22 },
    },
  },
  OCAPIAT: {
    code: 'OCAPIAT',
    nom: 'OCAPIAT',
    secteurs: ['agriculture'],
    siteWeb: 'https://www.ocapiat.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 5000, tauxHoraire: 30 },
      de11a49: { montantAnnuelMax: 4000, tauxHoraire: 28 },
      plus50: { montantAnnuelMax: 3000, tauxHoraire: 25 },
    },
  },
  UNIFORMATION: {
    code: 'UNIFORMATION',
    nom: 'Uniformation',
    secteurs: ['social-sport'],
    siteWeb: 'https://www.uniformation.fr',
    plafonds: {
      moins11: { montantAnnuelMax: 5000, tauxHoraire: 30 },
      de11a49: { montantAnnuelMax: 10000, tauxHoraire: 28 },
      plus50: { montantAnnuelMax: 15000, tauxHoraire: 25 },
    },
  },
};

/**
 * Mapping secteur -> OPCO
 */
export const SECTEUR_TO_OPCO: Record<SecteurActivite, OPCOCode> = {
  'culture-media': 'AFDAS',
  'banque-assurance': 'ATLAS',
  'services-entreprises': 'AKTO',
  'industrie': 'OPCO2I',
  'transport-logistique': 'OPCO_MOBILITES',
  'commerce-proximite': 'OPCO_EP',
  'e-commerce': 'OPCO_EP',
  'sante': 'OPCO_SANTE',
  'btp': 'CONSTRUCTYS',
  'commerce-distribution': 'OPCOMMERCE',
  'agriculture': 'OCAPIAT',
  'social-sport': 'UNIFORMATION',
  'autre': 'OPCO_EP', // Par défaut
};

/**
 * Formations PackshotCreator disponibles
 */
export const FORMATIONS_DISPONIBLES: FormationDisponible[] = [
  {
    id: 'initiation-packshot',
    nom: {
      fr: 'Formation Packshot Initiation',
      en: 'Packshot Initiation Training',
    },
    duree: 14, // 2 jours
    prixHT: 1200,
    niveau: 'initiation',
    description: {
      fr: 'Maîtrisez les bases de la photo produit professionnelle avec les studios Orbitvu.',
      en: 'Master the basics of professional product photography with Orbitvu studios.',
    },
  },
  {
    id: 'perfectionnement-packshot',
    nom: {
      fr: 'Formation Packshot Perfectionnement',
      en: 'Advanced Packshot Training',
    },
    duree: 21, // 3 jours
    prixHT: 1800,
    niveau: 'perfectionnement',
    description: {
      fr: 'Approfondissez vos compétences : éclairage avancé, retouche et workflow optimisé.',
      en: 'Deepen your skills: advanced lighting, retouching and optimized workflow.',
    },
  },
  {
    id: 'expert-packshot',
    nom: {
      fr: 'Formation Packshot Expert',
      en: 'Expert Packshot Training',
    },
    duree: 35, // 5 jours
    prixHT: 2800,
    niveau: 'expert',
    description: {
      fr: 'Formation complète pour devenir expert : 360°, vidéo, ghost mannequin et automatisation.',
      en: 'Complete training to become an expert: 360°, video, ghost mannequin and automation.',
    },
  },
  {
    id: 'ia-photo-produit',
    nom: {
      fr: 'Formation IA Photo Produit',
      en: 'AI Product Photography Training',
    },
    duree: 14, // 2 jours
    prixHT: 1500,
    niveau: 'perfectionnement',
    description: {
      fr: 'Intégrez l\'intelligence artificielle dans votre workflow photo produit avec BlendAI.',
      en: 'Integrate artificial intelligence into your product photo workflow with BlendAI.',
    },
  },
  {
    id: 'formation-blended',
    nom: {
      fr: 'Formation Blended (E-learning + Présentiel)',
      en: 'Blended Training (E-learning + On-site)',
    },
    duree: 21, // 1 jour présentiel + 14h e-learning
    prixHT: 1100,
    niveau: 'initiation',
    description: {
      fr: 'Formule flexible combinant e-learning autonome et journée présentielle.',
      en: 'Flexible format combining autonomous e-learning and on-site day.',
    },
  },
  {
    id: 'elearning-autonome',
    nom: {
      fr: 'E-learning Autonome',
      en: 'Self-paced E-learning',
    },
    duree: 14,
    prixHT: 450,
    niveau: 'initiation',
    description: {
      fr: 'Formation 100% en ligne à votre rythme avec vidéos et quiz.',
      en: '100% online training at your own pace with videos and quizzes.',
    },
  },
];

/**
 * Étapes standard de demande de financement OPCO
 */
export const ETAPES_DEMANDE_STANDARD: EtapeDemandeFinancement[] = [
  {
    numero: 1,
    titre: 'Identifier votre OPCO',
    description: 'Confirmez votre rattachement auprès de votre service RH ou sur le site de l\'OPCO.',
    delai: 'Immédiat',
  },
  {
    numero: 2,
    titre: 'Constituer le dossier',
    description: 'Rassemblez les documents nécessaires pour la demande.',
    delai: '3-5 jours',
    documents: [
      'Devis de formation signé',
      'Programme détaillé de formation',
      'Certification Qualiopi de l\'organisme',
      'Convention de formation',
    ],
  },
  {
    numero: 3,
    titre: 'Déposer la demande',
    description: 'Soumettez votre demande en ligne sur l\'espace de votre OPCO.',
    delai: '15 à 30 jours avant le début de formation',
  },
  {
    numero: 4,
    titre: 'Attendre la validation',
    description: 'L\'OPCO étudie votre dossier et vous envoie l\'accord de prise en charge.',
    delai: '15 à 30 jours après dépôt',
  },
  {
    numero: 5,
    titre: 'Suivre la formation',
    description: 'Participez à la formation et conservez les justificatifs (émargement, attestation).',
  },
  {
    numero: 6,
    titre: 'Transmettre les justificatifs',
    description: 'Envoyez les documents de fin de formation pour déclencher le paiement.',
    delai: '30 jours après la formation',
  },
];

/**
 * Labels pour les statuts professionnels
 */
export const STATUT_LABELS = {
  'salarie-cdi': {
    fr: 'Salarié(e) en CDI',
    en: 'Permanent employee (CDI)',
  },
  'salarie-cdd': {
    fr: 'Salarié(e) en CDD',
    en: 'Fixed-term employee (CDD)',
  },
  'interimaire': {
    fr: 'Intérimaire',
    en: 'Temporary worker',
  },
  'dirigeant-salarie': {
    fr: 'Dirigeant(e) salarié(e)',
    en: 'Salaried executive',
  },
  'auto-entrepreneur': {
    fr: 'Auto-entrepreneur (sans salarié)',
    en: 'Self-employed (no employees)',
  },
  'auto-entrepreneur-avec-salaries': {
    fr: 'Auto-entrepreneur (avec salarié(s))',
    en: 'Self-employed (with employees)',
  },
  'demandeur-emploi': {
    fr: 'Demandeur d\'emploi',
    en: 'Job seeker',
  },
  'autre': {
    fr: 'Autre situation',
    en: 'Other situation',
  },
} as const;

/**
 * Labels pour les tranches d'effectif
 */
export const EFFECTIF_LABELS = {
  'moins-11': {
    fr: 'Moins de 11 salariés',
    en: 'Less than 11 employees',
  },
  '11-49': {
    fr: '11 à 49 salariés',
    en: '11 to 49 employees',
  },
  '50-249': {
    fr: '50 à 249 salariés',
    en: '50 to 249 employees',
  },
  '250-plus': {
    fr: '250 salariés et plus',
    en: '250 or more employees',
  },
} as const;

/**
 * Labels pour les secteurs d'activité
 */
export const SECTEUR_LABELS = {
  'culture-media': {
    fr: 'Culture, médias, sport',
    en: 'Culture, media, sports',
  },
  'banque-assurance': {
    fr: 'Banque, assurance, conseil',
    en: 'Banking, insurance, consulting',
  },
  'services-entreprises': {
    fr: 'Services aux entreprises',
    en: 'Business services',
  },
  'industrie': {
    fr: 'Industrie',
    en: 'Industry',
  },
  'transport-logistique': {
    fr: 'Transport, logistique',
    en: 'Transport, logistics',
  },
  'commerce-proximite': {
    fr: 'Commerce de proximité, artisanat',
    en: 'Local retail, crafts',
  },
  'e-commerce': {
    fr: 'E-commerce, vente à distance',
    en: 'E-commerce, distance selling',
  },
  'sante': {
    fr: 'Santé, médico-social',
    en: 'Health, medical-social',
  },
  'btp': {
    fr: 'BTP, construction',
    en: 'Construction, building',
  },
  'commerce-distribution': {
    fr: 'Commerce, grande distribution',
    en: 'Retail, large-scale distribution',
  },
  'agriculture': {
    fr: 'Agriculture, agroalimentaire',
    en: 'Agriculture, food industry',
  },
  'social-sport': {
    fr: 'Social, sport, animation',
    en: 'Social, sports, recreation',
  },
  'autre': {
    fr: 'Autre secteur',
    en: 'Other sector',
  },
} as const;
