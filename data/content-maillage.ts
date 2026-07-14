// Maillage interne éditorial — verticaux (P1 bijoux/horlogerie + P5 mode/chaussures/lunetterie).
// Plan de maillage chirurgical, rapport SEO/GEO Laurent juin 2026.
//
// Principe : les liens sont rendus côté TEMPLATE (sections dédiées), sans aucune
// modification de la prose des articles/guides. Trois mappings :
//   - SECTOR_RESOURCES_MAP  : hub /industrie/[slug] -> guides & articles      (P1.A / P5.B)
//   - CONTENT_PRODUCT_MAP   : guide|article -> studio recommandé (tunnel)     (P1.B / P1.D / P5.A)
//   - GUIDE_RELATED_MAP     : guide -> guides & articles « pour aller plus loin » (P1.C)
//
// Tous les slugs sont vérifiés présents dans content/{guides,blog}/fr et
// components/calculators/ROICalculator/lib/machines.ts.

// P1.A / P5.B — Ressources affichées sur la page hub /industrie/[slug]
export const SECTOR_RESOURCES_MAP: Record<string, { guides: string[]; articles: string[] }> = {
  // P1.A — vertical bijoux/horlogerie
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
  'horlogerie': {
    guides: [
      'comment-positionner-montre-avant-shooting-photo',
      'comment-nettoyer-montre-avant-shooting',
    ],
    articles: [],
  },
  // P5.B — guides verticaux sous-maillés reconnectés à leur hub
  'mode-textile': {
    guides: [],
    articles: ['photographie-de-produits-comment-presenter-vos-vetements'],
  },
  'chaussures': {
    guides: ['comment-faire-photos-multi-angles-chaussures'],
    articles: [],
  },
  'lunetterie': {
    guides: ['comment-photographier-lunettes-e-commerce'],
    articles: [],
  },
  // 2026-07 — Liens entrants vers l'article machine Alphashot XL G2 (photo + mesures + données)
  'food-alimentaire': {
    guides: [],
    articles: ['alphashot-xl-g2-photo-mesures-donnees-produit'],
  },
  'pieces-techniques-industrie': {
    guides: [],
    articles: ['alphashot-xl-g2-photo-mesures-donnees-produit'],
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
