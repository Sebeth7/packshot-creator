// Maillage interne éditorial — verticaux (P1 bijoux/horlogerie + P5 mode/chaussures/lunetterie).
// Plan de maillage chirurgical, rapport SEO/GEO Laurent juin 2026.
//
// Principe : les liens sont rendus côté TEMPLATE (sections dédiées), sans aucune
// modification de la prose des articles/guides. Trois mappings :
//   - SECTOR_RESOURCES_MAP  : hub /industrie/[slug] -> guides & articles      (P1.A / P5.B)
//   - CONTENT_PRODUCT_MAP   : guide|article -> studio recommandé (tunnel)     (P1.B / P1.D / P5.A)
//   - GUIDE_RELATED_MAP     : guide -> guides & articles « pour aller plus loin » (P1.C)
//   - MONEY_PAGE_RESOURCES_MAP : money page -> guides & articles du même univers
//
// Tous les slugs sont vérifiés présents dans content/{guides,blog}/fr et
// components/calculators/ROICalculator/lib/machines.ts.

// P1.A / P5.B — Ressources affichées sur la page hub /industrie/[slug]
export const SECTOR_RESOURCES_MAP: Record<string, { guides: string[]; articles: string[] }> = {
  // 2026-09 — Couverture étendue aux 17 hubs. Crawl du 17/09 : Link Score du
  // blog et des guides = 1, contre 84 à 89 pour les pages commerciales, avec
  // 5,8 et 6,9 liens entrants uniques en moyenne. Les hubs irriguent désormais
  // 2 à 4 contenus de leur propre univers.
  'automobile-pieces-detachees': {
    guides: [
      'comment-creer-vues-multi-angles-automatique-objet',
    ],
    articles: [
      'oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg',
      'orbitvu-lautomatisation-au-service-de-la-photographie-3d-360deg',
    ],
  },
  'bijoux-joaillerie': {
    guides: [
      'quel-equipement-choisir-pour-photo-bijoux',
      'quels-reglages-pour-photographier-bijoux',
    ],
    articles: [
      'joailliers-nos-conseils-pour-reussir-vos-visuels-produits',
      'photographier-une-bague-comme-un-professionnel-en-8-etapes',
    ],
  },
  'chaussures': {
    guides: [
      'comment-faire-photos-multi-angles-chaussures',
      'comment-faire-video-chaussures',
      'realiser-animation-360-professionnelle-chaussures',
    ],
    articles: [
      'la-chaussure-un-secteur-incontournable-du-e-commerce-dynamise-avec-packshotcreator',
    ],
  },
  'cosmetiques-beaute': {
    guides: [
      'comment-sublimer-texture-rouge-a-levres-photo-avec-ia',
      'comment-mettre-en-valeur-textures-produits-packshot',
    ],
    articles: [
      'ia-lumieres-virtuelles-revolution-packshot',
      'migrer-ancien-packshotcreator',
    ],
  },
  'defense-securite': {
    guides: [
      'comment-creer-vues-multi-angles-automatique-objet',
      'comment-obtenir-couleurs-fideles-photographie-produit',
    ],
    articles: [
      'alphashot-xl-g2-photo-mesures-donnees-produit',
    ],
  },
  'electronique-hightech': {
    guides: [
      'comment-obtenir-fond-blanc-parfait-sans-detourage-produit',
      'comment-mettre-en-valeur-textures-produits-packshot',
    ],
    articles: [
      'comment-avoir-meilleures-images-amazon',
      'photographie-360-amazon',
    ],
  },
  'food-alimentaire': {
    guides: [
      'comment-obtenir-couleurs-fideles-photographie-produit',
      'visuels-collection-produits-homogenes',
    ],
    articles: [
      'alphashot-xl-g2-photo-mesures-donnees-produit',
    ],
  },
  'horlogerie': {
    guides: [
      'comment-positionner-montre-avant-shooting-photo',
      'comment-nettoyer-montre-avant-shooting',
      'comment-prendre-photo-nette-bijoux-sans-fond',
    ],
    articles: [
      'joailliers-nos-conseils-pour-reussir-vos-visuels-produits',
    ],
  },
  'industrie-manufacturiere': {
    guides: [
      'comment-creer-vues-multi-angles-automatique-objet',
      'visuels-collection-produits-homogenes',
    ],
    articles: [
      'alphashot-xl-g2-photo-mesures-donnees-produit',
      'est-il-utile-dinternaliser-sa-production-de-photos-packshot',
    ],
  },
  'jouets-puericulture': {
    guides: [
      'comment-mettre-en-valeur-textures-produits-packshot',
      'visuels-collection-produits-homogenes',
    ],
    articles: [
      'comment-avoir-meilleure-photo-produit-e-commerce',
      'migrer-ancien-packshotcreator',
    ],
  },
  'lunetterie': {
    guides: [
      'comment-photographier-lunettes-e-commerce',
      'comment-faire-animation-360-objet-transparent',
    ],
    articles: [
      'eclairage-photos-produits',
    ],
  },
  'mobilier-decoration': {
    guides: [
      'comment-obtenir-couleurs-fideles-photographie-produit',
    ],
    articles: [
      'meubles-decorations-comment-etre-plus-visibles-sur-le-web',
      'eclairage-packshots-360-3d-produits',
    ],
  },
  'mode-textile': {
    guides: [
      'visuels-collection-produits-homogenes',
    ],
    articles: [
      'photographie-de-produits-comment-presenter-vos-vetements',
      'promod-revolutionne-ses-shootings-photos-de-mode',
      'comment-shotflow-permet-accelerer-production-contenus-visuels-mode',
    ],
  },
  'pieces-techniques-industrie': {
    guides: [
      'comment-creer-vues-multi-angles-automatique-objet',
      'comment-obtenir-couleurs-fideles-photographie-produit',
    ],
    articles: [
      'alphashot-xl-g2-photo-mesures-donnees-produit',
    ],
  },
  'sante-medical': {
    guides: [
      'comment-obtenir-fond-blanc-parfait-sans-detourage-produit',
      'comment-obtenir-couleurs-fideles-photographie-produit',
    ],
    articles: [
      'quel-studio-photo-type-pour-vos-shootings-produits-en-interne',
    ],
  },
  'sport-outdoor': {
    guides: [
      'comment-faire-photos-multi-angles-chaussures',
      'realiser-animation-360-professionnelle-chaussures',
    ],
    articles: [
      'revolution-e-commerce-les-animations-3d-spheriques-de-produits-pour-le-sport',
    ],
  },
  'vin-spiritueux': {
    guides: [
      'comment-faire-animation-360-objet-transparent',
      'comment-obtenir-fond-blanc-parfait-sans-detourage-produit',
    ],
    articles: [
      'eclairage-photos-produits',
    ],
  },
};

// Studio recommandé : machine + ancre optionnelle (texte explicite porteur du
// mot-clé). Si pas d'ancre, le composant en génère une à partir du nom + useCases.
export interface ProductRecommendation {
  machineId: string;
  anchorFr?: string;
  anchorEn?: string;
  anchorDe?: string;
}

// P1.B / P1.D / P5.A — Studio recommandé (tunnel de conversion) sur guides & articles
export const CONTENT_PRODUCT_MAP: Record<string, ProductRecommendation> = {
  // P1.B/D — Guides bijoux/montre -> studio macro (ancre auto : micro-v2 a des useCases)
  'quel-equipement-choisir-pour-photo-bijoux': { machineId: 'alphashot-micro-v2' },
  'quels-reglages-pour-photographier-bijoux': { machineId: 'alphashot-micro-v2' },
  'comment-positionner-montre-avant-shooting-photo': { machineId: 'alphashot-micro-v2' },
  'comment-nettoyer-montre-avant-shooting': { machineId: 'alphashot-micro-v2' },
  'comment-faire-focus-stacking-pour-photographier-bague': { machineId: 'alphashot-micro-v2' },
  // P1.B — Articles bijoux
  'joailliers-nos-conseils-pour-reussir-vos-visuels-produits': { machineId: 'alphashot-micro-v2' },
  'photographier-une-bague-comme-un-professionnel-en-8-etapes': { machineId: 'alphashot-micro-v2' },
  // P5.A — Tunnels autres verticaux (ancre explicite : ces machines n'ont pas de useCases)
  'photographie-de-produits-comment-presenter-vos-vetements': {
    machineId: 'fashion-studio',
    anchorFr: 'studio photo automatisé pour la mode et le textile',
    anchorEn: 'automated photo studio for fashion & textile',
  },
  'comment-faire-photos-multi-angles-chaussures': {
    machineId: 'fashion-studio',
    anchorFr: 'studio photo multi-angles pour chaussures',
    anchorEn: 'multi-angle photo studio for footwear',
  },
  'comment-photographier-lunettes-e-commerce': {
    machineId: 'e-comm-studio-plus',
    anchorFr: 'studio photo e-commerce pour lunetterie',
    anchorEn: 'e-commerce photo studio for eyewear',
  },
  // 2026-07 — Article machine Alphashot XL G2 (photo + données) -> tunnel studio XL G2 (FR/EN/DE)
  'alphashot-xl-g2-photo-mesures-donnees-produit': {
    machineId: 'alphashot-xl-g2',
    anchorFr: 'studio photo automatisé Alphashot XL G2 — photo, mesures et données',
  },
  'alphashot-xl-g2-product-photos-measurements-data': {
    machineId: 'alphashot-xl-g2',
    anchorEn: 'Alphashot XL G2 — automated photo, measurement & data studio',
  },
  'alphashot-xl-g2-produktfotos-masse-gewicht-daten': {
    machineId: 'alphashot-xl-g2',
    anchorDe: 'Alphashot XL G2 — automatisiertes Foto-, Mess- und Datenstudio',
  },
  // 2026-09 — Article migration des anciens studios PackshotCreator -> tunnel Alphashot Pro G2
  // (le studio dont l'assistant d'éclairage IA porte l'argument de l'article) (FR/EN/DE)
  'migrer-ancien-packshotcreator': {
    machineId: 'alphashot-pro-g2',
    anchorFr: "studio photo automatisé Alphashot Pro G2 avec assistant d'éclairage IA",
  },
  'migrate-legacy-packshotcreator-studio': {
    machineId: 'alphashot-pro-g2',
    anchorEn: 'Alphashot Pro G2 automated photo studio with AI lighting assistant',
  },
  'altes-packshotcreator-studio-migrieren': {
    machineId: 'alphashot-pro-g2',
    anchorDe: 'Automatisiertes Fotostudio Alphashot Pro G2 mit KI-Lichtassistent',
  },
};

// P1.C — « Pour aller plus loin » sur les guides (reconnecte notamment
// l'article orphelin « photographier-une-bague »).
export const GUIDE_RELATED_MAP: Record<string, { guides: string[]; articles: string[] }> = {
  'quel-equipement-choisir-pour-photo-bijoux': {
    guides: ['quels-reglages-pour-photographier-bijoux'],
    articles: ['photographier-une-bague-comme-un-professionnel-en-8-etapes'],
  },
  'comment-faire-focus-stacking-pour-photographier-bague': {
    guides: [],
    articles: ['photographier-une-bague-comme-un-professionnel-en-8-etapes'],
  },
};

// 2026-09 — Ressources affichées sur les 6 money pages : les 4 landings
// packshot-*, /studios-photo-automatises et /ia-photo-produit. Même principe
// que SECTOR_RESOURCES_MAP — rendu côté template, aucune prose modifiée.
export const MONEY_PAGE_RESOURCES_MAP: Record<string, { guides: string[]; articles: string[] }> = {
  'packshot-amazon': {
    guides: [
      'comment-obtenir-fond-blanc-parfait-sans-detourage-produit',
    ],
    articles: [
      'comment-avoir-meilleures-images-amazon',
      'photographie-360-amazon',
    ],
  },
  'packshot-e-commerce': {
    guides: [
      'visuels-collection-produits-homogenes',
    ],
    articles: [
      'comment-avoir-meilleure-photo-produit-e-commerce',
      'e-commerce-comment-mettre-en-place-votre-studio-photo',
      'taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques',
    ],
  },
  'packshot-mode': {
    guides: [
      'comment-faire-photos-multi-angles-chaussures',
    ],
    articles: [
      'photographie-de-produits-comment-presenter-vos-vetements',
      'promod-revolutionne-ses-shootings-photos-de-mode',
    ],
  },
  'packshot-industriel': {
    guides: [
      'comment-creer-vues-multi-angles-automatique-objet',
    ],
    articles: [
      'alphashot-xl-g2-photo-mesures-donnees-produit',
      'est-il-utile-dinternaliser-sa-production-de-photos-packshot',
    ],
  },
  'studios-photo-automatises': {
    guides: [],
    articles: [
      'quel-retour-sur-investissement-avec-un-studio-photo-en-interne',
      'quel-studio-photo-type-pour-vos-shootings-produits-en-interne',
      'votre-studio-photo-interne-3-bonnes-pratiques-pour-lorganiser',
      'acheter-studio-photo-packshot-occasion',
      'migrer-ancien-packshotcreator',
    ],
  },
  'ia-photo-produit': {
    guides: [
      'comment-creer-animation-360-avec-assistant-ia-orbitvu',
    ],
    articles: [
      'generer-images-produit-ia',
      'ia-lumieres-virtuelles-revolution-packshot',
      'comment-ia-revolutionne-production-visuelle',
    ],
  },
};
