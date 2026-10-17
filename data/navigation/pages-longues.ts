/**
 * Registre de la navigation des pages longues (règle D44, R-UX-LONG).
 *
 * Une règle par famille de gabarits, pas une barre sur chaque URL :
 * - `barre`     : sommaire horizontal collant mutualisé (components/navigation/SommaireCollant.tsx) ;
 * - `laterale`  : sommaire latéral du blog (components/blog/TableOfContents.tsx), conservé ;
 * - `statique`  : sommaire dans la page, sans élément collant ajouté ;
 * - `aucune`    : pas de navigation persistante (page courte, page de liste, outil).
 *
 * DÉCISION LAURENT DU 15/10/2026 — double navigation. La règle antérieure (« une page ne
 * cumule jamais deux navigations collantes ») est abandonnée. Une page longue éligible
 * porte désormais DEUX navigations synchronisées : la barre horizontale en haut ET le
 * sommaire vertical à droite, mêmes ancres, même section active (un seul scroll-spy,
 * composants de components/navigation/). Le déploiement est progressif :
 * - `forme` reste la navigation PRIMAIRE historique de la famille (barre OU latérale) ;
 * - `secondeForme` nomme la navigation complémentaire que la double navigation ajoute ;
 * - `piloteSecondeForme` liste les pages où cette seconde forme est déjà activée (Phase A).
 *   La généralisation par famille (Phase B) remplacera cette liste par `'toutes'`.
 *
 * Les gabarits lisent `barreActive()` (barre) et `formeSecondeActive()` (seconde forme) :
 * une nouvelle page d'une famille active reçoit sa navigation primaire sans modification ;
 * une page gelée ne reçoit rien avant sa date de sortie. Toute exception porte son motif et
 * sa condition de sortie.
 *
 * Inventaire et mesures : audit du 03/10/2026 (309 URL, livrables 01 et 02).
 */

export type Langue = 'fr' | 'en' | 'de-ch';
export type Forme = 'barre' | 'laterale' | 'statique' | 'aucune';
export type Statut = 'ADOPT' | 'ADAPT' | 'KEEP' | 'EXCLUDE' | 'HOLD';

export interface Exception {
  slug: string;
  /** Langue concernée ; absente = toutes les langues. */
  langue?: Langue;
  motif: string;
  /** Condition ou date de sortie de l'exception. */
  jusqua: string;
}

export interface RegleFamille {
  famille: string;
  gabarit: string;
  /** Navigation primaire historique de la famille. */
  forme: Forme;
  statut: Statut;
  /** Barre activée : pour toute la famille (`'toutes'`) ou pour une liste de pages. */
  portee: 'toutes' | { slug: string; langue?: Langue }[];
  /**
   * Navigation complémentaire ajoutée par la double navigation (D44, 15/10/2026). Pour une
   * famille `forme: 'barre'`, c'est `'laterale'` ; pour `forme: 'laterale'`, c'est `'barre'`.
   */
  secondeForme?: 'barre' | 'laterale';
  /**
   * Pages où la seconde forme est activée (Phase A). `'toutes'` à la généralisation
   * (Phase B). Une page gelée (exception) ne reçoit jamais la seconde forme.
   */
  piloteSecondeForme?: 'toutes' | { slug: string; langue?: Langue }[];
  exceptions: Exception[];
  note: string;
}

const PR27 = 'PR #27 ouverte (contenu du guide modifié par la PR)';
const FIN_PR27 = 'clôture de #27';

export const NAVIGATION_PAGES_LONGUES: readonly RegleFamille[] = [
  {
    famille: 'guide',
    gabarit: 'app/[lang]/guide/[slug]/page.tsx',
    forme: 'barre',
    statut: 'ADOPT',
    portee: 'toutes',
    secondeForme: 'laterale',
    // Phase A : un seul guide en double navigation, le temps du contrôle pixel.
    piloteSecondeForme: [
      { slug: 'comment-faire-focus-stacking-pour-photographier-bague', langue: 'fr' },
      { slug: 'how-to-do-focus-stacking-for-ring-photography', langue: 'en' },
    ],
    exceptions: [
      { slug: 'comment-faire-photos-multi-angles-chaussures', langue: 'fr', motif: PR27, jusqua: FIN_PR27 },
      { slug: 'comment-positionner-montre-avant-shooting-photo', langue: 'fr', motif: PR27, jusqua: FIN_PR27 },
      { slug: 'realiser-animation-360-professionnelle-chaussures', langue: 'fr', motif: PR27, jusqua: FIN_PR27 },
    ],
    note: 'Étapes numérotées = sections ; libellés = titres d’étape existants. 47 guides, 6 682 à 12 552 px.',
  },
  {
    famille: 'fiche-machine',
    gabarit: 'app/[lang]/studio-photo/[slug]/page.tsx',
    forme: 'barre',
    statut: 'ADAPT',
    portee: 'toutes',
    secondeForme: 'laterale',
    // Phase A : une seule fiche en double navigation (toutes langues : id de machine commun).
    piloteSecondeForme: [{ slug: 'alphashot-pro-g2' }],
    exceptions: [],
    note: 'Sections à titre (vidéo, avantages, caractéristiques, logiciel, accessoires, systèmes similaires, formation, FAQ). 39 fiches, 11 732 à 12 647 px. Colonne FAQ collante à 128 px : compatible.',
  },
  {
    famille: 'blog-dedie-sans-sommaire',
    gabarit: 'app/[lang]/blog/<page dédiée>/page.tsx',
    forme: 'barre',
    statut: 'ADOPT',
    portee: [{ slug: 'studio-ia-vs-ia-generative' }, { slug: 'comparatif-orbitvu-ortery-styleshoots-2026' }],
    exceptions: [
      { slug: 'budget-studio-photo-automatise', motif: 'PR #27 ouverte (fichier de la page modifié)', jusqua: FIN_PR27 },
      { slug: 'prestataire-packshot-vs-studio-interne', motif: 'Critère C1 non atteint : 6 362 à 6 613 px (seuil indicatif 7 200 px)', jusqua: 'réévaluation si la page s’allonge' },
    ],
    note: 'Pages à colonnes max-w-4xl, sans sommaire.',
  },
  {
    famille: 'landing-ia',
    gabarit: 'app/[lang]/ia-photo-produit/page.tsx',
    forme: 'barre',
    statut: 'ADAPT',
    portee: 'toutes',
    exceptions: [],
    note: 'Cinq sections à titre dont la FAQ ; 11 026 à 12 149 px. Ancre existante #resultats réutilisée. Hors pilote Studios ; deuxième vague commerciale (addendum marché du 02/10, conditionnée par #77 et la validation des claims) : la barre est à reprendre dans la restructuration éditoriale.',
  },
  {
    famille: 'landing-gamme',
    gabarit: 'app/[lang]/studios-photo-automatises/page.tsx',
    forme: 'barre',
    statut: 'ADAPT',
    portee: [{ slug: 'studios-photo-automatises', langue: 'fr' }],
    secondeForme: 'laterale',
    // Phase A : landing Studios FR seulement (#108, GO final de Laurent du 17/10/2026).
    piloteSecondeForme: [{ slug: 'studios-photo-automatises', langue: 'fr' }],
    exceptions: [
      {
        slug: 'studios-photo-automatises',
        langue: 'en',
        motif: 'Gabarit transitoire EN : la nouvelle landing FR n’est pas traduite (arbitrage P2 de Laurent du 16/10/2026) ; sections sans identifiant',
        jusqua: 'traduction de la landing FR validée (D42, étape 7)',
      },
      {
        slug: 'studios-photo-automatises',
        langue: 'de-ch',
        motif: 'Gabarit transitoire de-ch : la nouvelle landing FR n’est pas traduite (arbitrage P2 de Laurent du 16/10/2026) ; sections sans identifiant',
        jusqua: 'traduction de la landing FR validée (D42, étape 7)',
      },
    ],
    note: 'Landing FR de #108, rendue par _components/LandingStudios.tsx (accord de principe de Laurent du 16/10/2026, GO_ARBITRAGE_D44_STUDIOS ; GO final du 17/10/2026) : neuf sections à titre et la FAQ, libellés = titres de section ; chaîne de production (S1) = sommaire statique de la page, juste avant la première section : la barre apparaît quand cette section atteint la barre (repli de R-UX-LONG § 3.1) et disparaît avant la demande de démonstration (ancreFin). Double navigation (D44, 15/10) par DoubleNavigationStructuree : sommaire latéral en surimpression à partir de 1 280 px, largeur réservée par les conteneurs (xl:pr-80) ; barre seule de 1 024 à 1 279 px ; rien de collant en dessous. Ancre #calculateur-roi : lot AR-01 autonome, sans lien avec la barre.',
  },
  {
    famille: 'solution',
    gabarit: 'app/[lang]/solutions/[slug]/page.tsx',
    forme: 'barre',
    statut: 'ADAPT',
    portee: 'toutes',
    exceptions: [],
    note: 'Quatre sections de contenu et la FAQ ; 10 123 à 10 177 px. Colonnes collantes à 128 px : compatibles.',
  },
  {
    famille: 'blog-commun',
    gabarit: 'app/[lang]/blog/[slug]/page.tsx',
    forme: 'laterale',
    statut: 'KEEP',
    portee: [],
    secondeForme: 'barre',
    // Phase A : un seul article en double navigation (barre ajoutée au sommaire latéral),
    // les deux langues de la même page. Mêmes ancres (h2 + h3 de l'article).
    piloteSecondeForme: [
      { slug: 'images-ia-metadonnees-marketplaces' },
      { slug: 'ai-product-images-metadata-marketplaces' },
    ],
    exceptions: [],
    note: 'Sommaire latéral corrigé (PR UX-BLOG). Barre horizontale ajoutée en double navigation (D44, 15/10). 122 articles.',
  },
  {
    famille: 'blog-dedie-avec-sommaire',
    gabarit: 'pages dédiées utilisant TableOfContents',
    forme: 'laterale',
    statut: 'HOLD',
    portee: [],
    exceptions: [
      { slug: 'guide-achat-studio-2026', motif: 'PR #109 (successeur de #64) et #27 ouvertes', jusqua: 'clôture de #109 et #27' },
      { slug: 'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026', motif: 'PR #109 ouverte (successeur de #64)', jusqua: 'clôture de #109' },
      { slug: 'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026', motif: 'PR #109 ouverte (successeur de #64)', jusqua: 'clôture de #109' },
      { slug: 'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet', motif: 'PR #109 ouverte (successeur de #64)', jusqua: 'clôture de #109' },
      { slug: 'orbitvu-vs-concurrents', motif: 'PR #109 ouverte (successeur de #64)', jusqua: 'clôture de #109' },
      { slug: 'ia-photo-produit-guide-2026', motif: 'PR #109 ouverte (successeur de #64)', jusqua: 'clôture de #109' },
    ],
    note: 'Navigation existante conservée ; le correctif du composant partagé s’y applique sans modifier leurs fichiers.',
  },
  {
    famille: 'landing-mode',
    gabarit: 'components/landings/PackshotMode.tsx',
    forme: 'barre',
    statut: 'HOLD',
    portee: [],
    exceptions: [{ slug: 'packshot-mode', motif: 'Mesure Mode (D39), barre d’origine conservée', jusqua: '26/11/2026 (J+56), puis contrôle de parité' }],
    note: 'Référence de la forme A ; implémentation d’origine components/landings/SommaireCollant.tsx.',
  },
  {
    famille: 'landing-f5',
    gabarit: 'components/landings/PackshotEcommerce.tsx',
    forme: 'statique',
    statut: 'HOLD',
    portee: [],
    exceptions: [{ slug: 'packshot-e-commerce', motif: 'Mesure F5 (D37) ; choix délibéré sans élément collant (commit 03fff2e)', jusqua: '23/11/2026 (J+56), puis décision de Laurent' }],
    note: 'Sommaire de page et liens « Retour au sommaire ».',
  },
  {
    famille: 'hub-sectoriel',
    gabarit: 'app/[lang]/industrie/[slug]/page.tsx',
    forme: 'aucune',
    statut: 'EXCLUDE',
    portee: [],
    exceptions: [{ slug: 'mode-textile', motif: 'Ne pas perturber la mesure Mode', jusqua: '26/11/2026' }],
    note: 'Trois sections de contenu hors FAQ (critère C2 non atteint).',
  },
  {
    famille: 'accueil',
    gabarit: 'app/[lang]/page.tsx',
    forme: 'aucune',
    statut: 'EXCLUDE',
    portee: [],
    exceptions: [{ slug: '', motif: 'Mesure de marque M5', jusqua: '28/10/2026' }],
    note: 'Page de marque, sections visuelles.',
  },
  {
    famille: 'exclues',
    gabarit: 'landings Amazon / Industriel, industrie-defense, pédagogiques, légales, distributeur, hubs, outils',
    forme: 'aucune',
    statut: 'EXCLUDE',
    portee: [],
    exceptions: [],
    note: 'Pages courtes, de liste ou d’outil (moins de 7 200 px ou moins de quatre sections de contenu) ; industrie-defense : D10 ; landings Amazon et Industriel : trois sections de contenu.',
  },
];

function regle(famille: string): RegleFamille | undefined {
  return NAVIGATION_PAGES_LONGUES.find((r) => r.famille === famille);
}

/** La page reçoit-elle la barre horizontale collante ? */
export function barreActive(famille: string, langue: Langue, slug: string): boolean {
  const r = regle(famille);
  if (!r || r.forme !== 'barre' || r.statut === 'HOLD' || r.statut === 'EXCLUDE') return false;
  if (r.exceptions.some((e) => e.slug === slug && (!e.langue || e.langue === langue))) return false;
  if (r.portee === 'toutes') return true;
  return r.portee.some((p) => p.slug === slug && (!p.langue || p.langue === langue));
}

/**
 * Quelle seconde navigation (double navigation D44) cette page reçoit-elle, en plus de sa
 * navigation primaire ? `'laterale'` pour une famille à barre (guide, fiche), `'barre'`
 * pour une famille à sommaire latéral (blog). `null` si la page n'est pas (encore) en
 * double navigation, ou si elle est gelée.
 */
export function formeSecondeActive(famille: string, langue: Langue, slug: string): 'barre' | 'laterale' | null {
  const r = regle(famille);
  if (!r || !r.secondeForme || !r.piloteSecondeForme) return null;
  if (r.statut === 'HOLD' || r.statut === 'EXCLUDE') return null;
  if (r.exceptions.some((e) => e.slug === slug && (!e.langue || e.langue === langue))) return null;
  // Une seconde forme 'laterale' complète la barre : celle-ci doit être active.
  if (r.secondeForme === 'laterale' && !barreActive(famille, langue, slug)) return null;
  const dansPilote =
    r.piloteSecondeForme === 'toutes' ||
    r.piloteSecondeForme.some((p) => p.slug === slug && (!p.langue || p.langue === langue));
  return dansPilote ? r.secondeForme : null;
}

/** Vue d'ensemble : quelles navigations (barre haute, sommaire latéral) une page porte. */
export function navigationPageLongue(
  famille: string,
  langue: Langue,
  slug: string,
): { barre: boolean; laterale: boolean } {
  const r = regle(famille);
  const seconde = formeSecondeActive(famille, langue, slug);
  const barre = barreActive(famille, langue, slug) || seconde === 'barre';
  // Latéral : navigation primaire du blog (rendue dès qu'il y a des titres), ou seconde
  // forme d'une page structurée en double navigation.
  const laterale = r?.forme === 'laterale' || seconde === 'laterale';
  return { barre, laterale };
}

/** Libellés de la barre, identiques à ceux validés sur Mode (`packshotMode.sommaire`). */
export const LIBELLES_BARRE: Record<Langue, { titre: string; libelle: string }> = {
  fr: { titre: 'Sommaire', libelle: 'Accès rapide aux sections' },
  en: { titre: 'Contents', libelle: 'Quick access to sections' },
  'de-ch': { titre: 'Inhalt', libelle: 'Schnellzugriff auf die Abschnitte' },
};

/** Nom accessible du sommaire latéral, distinct de celui de la barre (deux repères). */
export const LIBELLES_LATERAL: Record<Langue, string> = {
  fr: 'Sommaire de la page',
  en: 'Page contents',
  'de-ch': 'Seiteninhalt',
};
