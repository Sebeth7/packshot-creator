import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  async redirects() {
    // Source unique des redirects legacy / langue / Webflow → Next.js : le Worker
    // Cloudflare DÉPLOYÉ (géré par Laurent via Cloudflare, qui déploie hors repo —
    // cloudflare-worker/src/index.js n'est PAS la source de vérité). Couverture
    // vérifiée le 12/06/2026 contre la version déployée : LEGACY_REDIRECTS /
    // GONE_PATHS / handlers /blog/* /guide/* /academy/* /industrie/*
    // /studio-photo/* /accessoires* /packshot-packshotcreator* /secteur/*
    // /industry/* /(de|es|nl)/* etc. (cf. RAPPORT_WIP_ARBITRAGE.md)
    //
    // On garde ici UNIQUEMENT les redirects qui s'appliquent à des paths déjà routés
    // vers Vercel (préfixe /fr/ ou /en/) et qui font une réécriture interne Next.js.
    // Tout redirect sans préfixe langue serait court-circuité par le Worker → ne pas
    // l'ajouter ici, l'ajouter au Worker à la place.
    return [
      // ============================================================
      // Corrections de slugs EN (Webflow → Next.js) — paths /en/*
      // Tous routés vers Vercel par le Worker (NEXTJS_PATTERNS)
      // ============================================================

      // /en/photo-studio/* (ancien namespace Webflow) → /en/studio-photo/* (Next.js)
      // Slugs renommés AVANT le catch-all
      { source: '/en/photo-studio/alphashot-micro', destination: '/en/studio-photo/alphashot-micro-v2', statusCode: 301 },
      { source: '/en/photo-studio/alphashot-xl', destination: '/en/studio-photo/alphashot-xl-v2', statusCode: 301 },
      { source: '/en/photo-studio/alphastudio-compact', destination: '/en/studio-photo/alphastudio-compact-v2', statusCode: 301 },
      { source: '/en/photo-studio/alphastudio-xxl', destination: '/en/studio-photo/alphastudio-xxl-v2', statusCode: 301 },
      { source: '/en/photo-studio/e-comm-studio', destination: '/en/studio-photo/e-comm-studio-plus', statusCode: 301 },
      { source: '/en/photo-studio/360-turntables', destination: '/en/studios-photo-automatises', statusCode: 301 },
      { source: '/en/photo-studio/:slug', destination: '/en/studio-photo/:slug', statusCode: 301 },

      // Accès directs à /en/studio-photo/ avec anciens slugs
      { source: '/en/studio-photo/alphashot-micro', destination: '/en/studio-photo/alphashot-micro-v2', statusCode: 301 },
      { source: '/en/studio-photo/alphashot-xl', destination: '/en/studio-photo/alphashot-xl-v2', statusCode: 301 },
      { source: '/en/studio-photo/alphastudio-compact', destination: '/en/studio-photo/alphastudio-compact-v2', statusCode: 301 },
      { source: '/en/studio-photo/alphastudio-xxl', destination: '/en/studio-photo/alphastudio-xxl-v2', statusCode: 301 },
      { source: '/en/studio-photo/e-comm-studio', destination: '/en/studio-photo/e-comm-studio-plus', statusCode: 301 },
      { source: '/en/studio-photo/360-turntables', destination: '/en/studios-photo-automatises', statusCode: 301 },

      // Segment /studio-photo nu (sans suffixe) — pas de page index dans app/[lang]/studio-photo/.
      // Consolider vers le hub canonique /studios-photo-automatises (cohérent avec le Worker
      // qui fait déjà '/studio-photo' → '/fr/studios-photo-automatises' pour le path sans langue).
      { source: '/fr/studio-photo', destination: '/fr/studios-photo-automatises', statusCode: 301 },
      { source: '/en/studio-photo', destination: '/en/studios-photo-automatises', statusCode: 301 },

      // ============================================================
      // Consolidation page bijoux (rapport Laurent V4) : l'ancienne page
      // "money" /packshot-bijoux est fusionnée dans le hub sectoriel canonique
      // /industrie/bijoux-joaillerie. 301 unique, même locale, pas de chaîne.
      // (Forme sans préfixe langue → gérée par le Worker si besoin, cf. note plus haut.)
      // ============================================================
      { source: '/fr/packshot-bijoux', destination: '/fr/industrie/bijoux-joaillerie', statusCode: 301 },
      { source: '/en/packshot-bijoux', destination: '/en/industrie/bijoux-joaillerie', statusCode: 301 },

      // ============================================================
      // Variantes formulaire contact (paramètres pré-remplis)
      // ============================================================
      { source: '/fr/contact/demande-demo', destination: '/fr/contact?subject=demo', statusCode: 301 },
      { source: '/en/contact/request-demo', destination: '/en/contact?subject=demo', statusCode: 301 },
      { source: '/fr/contact/demande-devis-formation', destination: '/fr/contact?subject=formation', statusCode: 301 },
      { source: '/en/contact/training-quote', destination: '/en/contact?subject=training', statusCode: 301 },

      // ============================================================
      // /en/* — pages Webflow EN renommées en Next.js EN
      // ============================================================

      // Pages statiques EN (slugs Webflow → slugs Next.js)
      { source: '/en/workflow-management-shotflow', destination: '/en/ia-photo-produit', statusCode: 301 },
      { source: '/en/industry', destination: '/en/industrie', statusCode: 301 },
      { source: '/en/key-questions-product-photography', destination: '/en/questions-cles-photographie-produit', statusCode: 301 },
      { source: '/en/trainings-product-photography', destination: '/en/academy', statusCode: 301 },
      { source: '/en/products', destination: '/en/studio-photo/selecteur-machines', statusCode: 301 },
      { source: '/en/creator-connected-photo-studios', destination: '/en/studios-photo-automatises', statusCode: 301 },
      { source: '/en/automate-product-photography-packshotcreator', destination: '/en/studios-photo-automatises', statusCode: 301 },
      { source: '/en/needs-product-photography', destination: '/en/besoins-photographie-produit', statusCode: 301 },
      { source: '/en/old-photo-studio', destination: '/en/studios-photo-automatises', statusCode: 301 },
      { source: '/en/disclaimer', destination: '/en/mentions-legales', statusCode: 301 },
      { source: '/en/confidentiality', destination: '/en/confidentialite', statusCode: 301 },
      { source: '/en/actualites', destination: '/en/blog', statusCode: 301 },
      { source: '/en/e-commerce', destination: '/en/blog', statusCode: 301 },
      { source: '/en/blog-produits', destination: '/en/blog', statusCode: 301 },
      { source: '/en/innovations', destination: '/en/blog', statusCode: 301 },
      { source: '/en/sitemap', destination: '/en', statusCode: 301 },
      { source: '/en/guides', destination: '/en/guide', statusCode: 301 },

      // Anciens secteurs EN (slug FR sur /en/)
      { source: '/en/packshot-secteur-chaussures', destination: '/en/industrie/chaussures', statusCode: 301 },
      { source: '/en/packshot-secteur-e-commerce', destination: '/en/blog', statusCode: 301 },
      { source: '/en/packshot-secteur-bijouterie', destination: '/en/industrie/bijoux-joaillerie', statusCode: 301 },
      { source: '/en/packshot-secteur-mode-accessoires', destination: '/en/industrie/mode-textile', statusCode: 301 },
      { source: '/en/packshot-secteur-pieces-techniques', destination: '/en/industrie/pieces-techniques-industrie', statusCode: 301 },
      { source: '/en/packshot-secteur-meuble', destination: '/en/industrie/mobilier-decoration', statusCode: 301 },
      { source: '/en/packshot-packshotcreator', destination: '/en', statusCode: 301 },
      { source: '/en/packshot-packshotcreator/:slug', destination: '/en', statusCode: 301 },

      // Secteurs EN (slugs anglais Webflow → Next.js industrie)
      { source: '/en/sector/art-and-antiquities', destination: '/en/industrie', statusCode: 301 },
      { source: '/en/sector/culinary', destination: '/en/industrie/food-alimentaire', statusCode: 301 },
      { source: '/en/sector/beauty', destination: '/en/industrie/cosmetiques-beaute', statusCode: 301 },
      { source: '/en/sector/jewelry', destination: '/en/industrie/bijoux-joaillerie', statusCode: 301 },
      { source: '/en/sector/wine-spirits', destination: '/en/industrie/vin-spiritueux', statusCode: 301 },
      { source: '/en/sector/footwear', destination: '/en/industrie/chaussures', statusCode: 301 },
      { source: '/en/sector/components', destination: '/en/industrie/pieces-techniques-industrie', statusCode: 301 },
      { source: '/en/sector/electronics', destination: '/en/industrie/electronique-hightech', statusCode: 301 },
      { source: '/en/sector/sport', destination: '/en/industrie/sport-outdoor', statusCode: 301 },
      { source: '/en/sector/eyewear', destination: '/en/industrie/lunetterie', statusCode: 301 },
      { source: '/en/sector/fashion', destination: '/en/industrie/mode-textile', statusCode: 301 },
      { source: '/en/sector/furniture', destination: '/en/industrie/mobilier-decoration', statusCode: 301 },

      // Le guide a un équivalent EN re-migré (alternates: webflowItemId 67ee4fe74bff9cef22954f2e)
      // Préserver le PageRank de l'ancienne URL Webflow EN qui héritait du slug FR.
      { source: '/en/guide/modifier-couleur-produit-photo', destination: '/en/guide/change-product-photo-color', statusCode: 301 },
    ];
  },
};


export default withNextIntl(nextConfig);
