/**
 * Registre de la navigation des pages longues (règle D44, R-UX-LONG).
 *
 * Une règle par famille de gabarits, pas une barre sur chaque URL :
 * - `barre`     : sommaire horizontal collant mutualisé (components/navigation/SommaireCollant.tsx) ;
 * - `laterale`  : sommaire latéral du blog (components/blog/TableOfContents.tsx), conservé ;
 * - `statique`  : sommaire dans la page, sans élément collant ajouté ;
 * - `aucune`    : pas de navigation persistante (page courte, page de liste, outil).
 *
 * Une page ne cumule jamais deux navigations collantes. Les gabarits lisent
 * `barreActive()` : une nouvelle page d'une famille active (guide, fiche…) reçoit la
 * barre sans autre modification ; une page gelée ne la reçoit pas avant sa date de sortie.
 * Toute exception porte son motif et sa condition de sortie.
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
  forme: Forme;
  statut: Statut;
  /** Barre activée : pour toute la famille (`'toutes'`) ou pour une liste de pages. */
  portee: 'toutes' | { slug: string; langue?: Langue }[];
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
    statut: 'HOLD',
    portee: [],
    exceptions: [
      {
        slug: 'studios-photo-automatises',
        motif: 'Pilote Studios coordonné avec Landings & Hubs et le Maillage V2 ; J0 commun proposé le 29/10/2026 (scénario P2). Arbitrage de Laurent du 03/10 : barre retirée de #85',
        jusqua: 'chantier commercial Studios, sous validation spécifique',
      },
    ],
    note: 'Éligible (cinq sections à titre dont la FAQ ; 11 941 à 13 248 px) mais gabarit non branché. Ancre #calculateur-roi : lot AR-01 autonome, sans lien avec la barre.',
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
    exceptions: [],
    note: 'Sommaire latéral corrigé (PR UX-BLOG) ; aucune barre horizontale superposée. 122 articles.',
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

/** Libellés de la barre, identiques à ceux validés sur Mode (`packshotMode.sommaire`). */
export const LIBELLES_BARRE: Record<Langue, { titre: string; libelle: string }> = {
  fr: { titre: 'Sommaire', libelle: 'Accès rapide aux sections' },
  en: { titre: 'Contents', libelle: 'Quick access to sections' },
  'de-ch': { titre: 'Inhalt', libelle: 'Schnellzugriff auf die Abschnitte' },
};
