/**
 * Cadrage structuré pré-conversation du mode public (Seb 07/08, 2e chantier UX).
 *
 * Principe : tout ce qui est prédéterminable (réponses fermées, listes courtes)
 * est capté AVANT le premier tour LLM par des chips instantanées — zéro latence,
 * dossier pré-rempli — puis envoyé comme premier message « profil » que le
 * conseiller capte d'un coup. Les questions ouvertes et chiffrées restent à la
 * conversation. Réduit ~10 tours d'IA à 4-5.
 *
 * Les secteurs reprennent les catégories industries du site (data/secteurs.ts) ;
 * les cas d'usage viennent du contenu publié (e-commerce/catalogue, contrôle
 * qualité/production — cf. industrieDefense.useCases — documentation technique,
 * marketing).
 */

export interface OnboardingAnswers {
  situation?: string;
  secteur?: string;
  taille?: string;
  contenus?: string[];
  casUsage?: string[];
  dejaConseille?: string;
}

export interface OnboardingQuestion {
  key: keyof OnboardingAnswers;
  /** Question affichée (wording draft — plume finale : Seb) */
  question: string;
  /** Raison affichée sous la question (micro-pédagogie) */
  pourquoi: string;
  options: string[];
  multi?: boolean;
}

/** Catégories industries du site (data/secteurs.ts), libellés courts. */
export const ONBOARDING_SECTEURS = [
  'Bijoux & joaillerie',
  'Horlogerie',
  'Lunetterie',
  'Mode & textile',
  'Chaussures & sneakers',
  'Cosmétiques & beauté',
  'Santé, médical & pharma',
  'Vins & spiritueux',
  'Food & alimentaire',
  'Mobilier & décoration',
  'Électronique & high-tech',
  'Jouets & puériculture',
  'Sport & outdoor',
  'Automobile & pièces détachées',
  'Aéronautique, défense & sécurité',
  'Industrie manufacturière',
  'Pièces techniques',
  'Autre secteur',
];

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    key: 'situation',
    question: 'Votre situation actuelle : comment produisez-vous vos photos produit aujourd’hui ?',
    pourquoi: 'C’est la base de la comparaison : votre étude mesure l’écart avec l’existant.',
    options: [
      'En interne',
      'Avec un prestataire externe',
      'Les deux',
      'Lancement d’activité — rien d’existant',
    ],
  },
  {
    key: 'secteur',
    question: 'Quel est votre secteur d’activité ?',
    pourquoi: 'Chaque secteur a ses contraintes photo et ses références de coûts de marché.',
    options: ONBOARDING_SECTEURS,
  },
  {
    key: 'taille',
    question: 'Quelle taille fait la majorité de vos produits ?',
    pourquoi: 'La taille détermine les studios adaptés à votre production.',
    options: ['Moins de 30 cm', '30 à 60 cm', '60 à 150 cm', 'Plus de 150 cm'],
  },
  {
    key: 'contenus',
    question: 'Quels contenus voulez-vous produire ?',
    pourquoi: 'Les fonctions nécessaires orientent le choix du studio.',
    options: ['Packshots', 'Vues 360°', 'Vidéos', 'Données produit (mesures, OCR)'],
    multi: true,
  },
  {
    key: 'casUsage',
    question: 'À quoi ces visuels sont-ils destinés ?',
    pourquoi: 'Le cas d’usage précise le studio et les gains à chiffrer.',
    options: [
      'E-commerce & marketplaces',
      'Catalogue & documentation technique',
      'Contrôle qualité & production',
      'Marketing & réseaux sociaux',
    ],
    multi: true,
  },
  {
    key: 'dejaConseille',
    question: 'Notre équipe commerciale vous a-t-elle déjà conseillé un modèle ?',
    pourquoi: 'Si oui, votre étude portera sur le modèle recommandé.',
    options: ['Oui', 'Non'],
  },
];

/** Marqueur du premier message issu du cadrage — reconnu par le prompt public. */
export const ONBOARDING_MESSAGE_PREFIX = 'Voici mon profil :';

/** Construit le premier message utilisateur à partir des réponses du cadrage. */
export function buildOnboardingMessage(answers: OnboardingAnswers): string {
  const parts: string[] = [];
  if (answers.secteur) parts.push(`secteur ${answers.secteur}`);
  if (answers.situation) parts.push(`production actuelle : ${answers.situation.toLowerCase()}`);
  if (answers.taille) parts.push(`produits : ${answers.taille.toLowerCase()}`);
  if (answers.contenus?.length) parts.push(`contenus visés : ${answers.contenus.join(', ').toLowerCase()}`);
  if (answers.casUsage?.length) parts.push(`destination des visuels : ${answers.casUsage.join(', ').toLowerCase()}`);
  if (answers.dejaConseille === 'Oui') {
    parts.push('votre équipe commerciale m’a déjà conseillé un modèle');
  } else if (answers.dejaConseille === 'Non') {
    parts.push('aucun modèle ne m’a encore été conseillé');
  }
  return `${ONBOARDING_MESSAGE_PREFIX} ${parts.join(' ; ')}.`;
}

/** Pré-remplissage immédiat du panneau dossier (avant le tour LLM). */
export function buildOnboardingDossier(answers: OnboardingAnswers): {
  secteur?: string;
  situation?: string;
  tailleProduits?: string;
  typesContenu?: string[];
  casUsage?: string[];
} {
  const out: ReturnType<typeof buildOnboardingDossier> = {};
  if (answers.secteur && answers.secteur !== 'Autre secteur') out.secteur = answers.secteur;
  if (answers.situation) out.situation = answers.situation;
  if (answers.taille) out.tailleProduits = answers.taille;
  if (answers.contenus?.length) out.typesContenu = answers.contenus;
  if (answers.casUsage?.length) out.casUsage = answers.casUsage;
  return out;
}
