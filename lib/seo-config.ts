export const NOINDEX_EN_BLOG_SLUGS = new Set([
  'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026',
  'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
  'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet',
  'financement-formation-opco-guide-complet-pour-studios-photo-2026',
  'formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026',
  'guide-achat-studio-2026',
  'ia-photo-produit-guide-2026',
  'orbitvu-vs-concurrents',
  'photographie-2d-de-produits',
  'photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre',
  'photographie-de-produits-a-360-degres-en-interne',
]);

// Tous les hubs /en/industrie/* servent du contenu FR (data secteurs
// monolingues, vérifié h1 par h1 le 12/06/2026). Noindex RÉVERSIBLE (D9) —
// bascule en 301 ciblée seulement si l'export backlinks révèle des liens externes.
export const NOINDEX_EN_INDUSTRIE_SLUGS = new Set([
  'automobile-pieces-detachees',
  'bijoux-joaillerie',
  'chaussures',
  'cosmetiques-beaute',
  'defense-securite',
  'electronique-hightech',
  'food-alimentaire',
  'horlogerie',
  'industrie-manufacturiere',
  'jouets-puericulture',
  'lunetterie',
  'mobilier-decoration',
  'mode-textile',
  'pieces-techniques-industrie',
  'sante-medical',
  'sport-outdoor',
  'vin-spiritueux',
]);

// Les 6 fiches formation servent du contenu FR sur /en/ (content/formations/*.json
// monolingues, vérifié page par page le 12/06/2026). Les hubs academy
// (/academy, formations-packshot, formations-ia, simulateur-opco, calendrier)
// sont réellement traduits → hors lot.
export const NOINDEX_EN_ACADEMY_SLUGS = new Set([
  'elearning-autonome-niveau-1',
  'niveau-1-fondation-blended',
  'niveau-1-fondation-presentiel',
  'niveau-2-maitrise-blended',
  'niveau-2-maitrise-presentiel',
  'niveau-3-expert-presentiel',
]);

export const NOINDEX_EN_SOLUTIONS_SLUGS = new Set([
  'documentation-probatoire',
  'documentation-qualite-produit',
  'documentation-technique-visuelle',
]);
