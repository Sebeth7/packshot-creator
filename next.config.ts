import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

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
    return [
      // ============================================================
      // BLOC 1 - Pages FR sans préfixe /fr/ (ancien site Webflow)
      // Le middleware next-intl fait un 307, ces redirections 301
      // prennent priorité et préservent le SEO.
      // ============================================================

      // Pages statiques FR
      { source: '/contact', destination: '/fr/contact', statusCode: 301 },
      { source: '/a-propos', destination: '/fr/a-propos', statusCode: 301 },
      { source: '/mentions-legales', destination: '/fr/mentions-legales', statusCode: 301 },
      { source: '/confidentialite', destination: '/fr/confidentialite', statusCode: 301 },
      { source: '/cgu', destination: '/fr/cgu', statusCode: 301 },
      { source: '/ia-photo-produit', destination: '/fr/ia-photo-produit', statusCode: 301 },
      { source: '/studios-photo-automatises', destination: '/fr/studios-photo-automatises', statusCode: 301 },
      { source: '/e-commerce', destination: '/fr/blog', statusCode: 301 },

      // Routes dynamiques FR
      { source: '/blog', destination: '/fr/blog', statusCode: 301 },
      { source: '/blog/:slug', destination: '/fr/blog/:slug', statusCode: 301 },
      { source: '/industrie', destination: '/fr/industrie', statusCode: 301 },
      { source: '/industrie/:slug', destination: '/fr/industrie/:slug', statusCode: 301 },
      { source: '/guide', destination: '/fr/guide', statusCode: 301 },
      { source: '/guide/:slug', destination: '/fr/guide/:slug', statusCode: 301 },
      { source: '/academy', destination: '/fr/academy', statusCode: 301 },
      { source: '/academy/:path*', destination: '/fr/academy/:path*', statusCode: 301 },

      // ============================================================
      // BLOC 2 - Anciennes URLs Webflow renommées
      // ============================================================

      // Secteurs (anciennes URLs packshot-secteur-*)
      { source: '/packshot-secteur-chaussures', destination: '/fr/industrie/chaussures', statusCode: 301 },
      { source: '/packshot-secteur-bijouterie', destination: '/fr/industrie/bijoux-joaillerie', statusCode: 301 },
      { source: '/packshot-secteur-meuble', destination: '/fr/industrie/mobilier-decoration', statusCode: 301 },
      { source: '/packshot-secteur-mode-accessoires', destination: '/fr/industrie/mode-textile', statusCode: 301 },
      { source: '/packshot-secteur-pieces-techniques', destination: '/fr/industrie/pieces-techniques-industrie', statusCode: 301 },
      { source: '/packshot-secteur-e-commerce', destination: '/fr/blog', statusCode: 301 },

      // Hubs renommés
      { source: '/studio-photo', destination: '/fr/studios-photo-automatises', statusCode: 301 },
      { source: '/blendai', destination: '/fr/ia-photo-produit', statusCode: 301 },

      // Pages supprimées/fusionnées
      { source: '/logiciel', destination: '/fr/ia-photo-produit', statusCode: 301 },
      { source: '/formation', destination: '/fr/academy', statusCode: 301 },
      { source: '/formations', destination: '/fr/academy', statusCode: 301 },

      // Produits EN - Corrections de slugs (Webflow → Next.js)
      // Individuelles AVANT le catch-all car les slugs ont changé
      { source: '/en/photo-studio/alphashot-micro', destination: '/en/studio-photo/alphashot-micro-v2', statusCode: 301 },
      { source: '/en/photo-studio/alphashot-xl', destination: '/en/studio-photo/alphashot-xl-v2', statusCode: 301 },
      { source: '/en/photo-studio/alphastudio-compact', destination: '/en/studio-photo/alphastudio-compact-v2', statusCode: 301 },
      { source: '/en/photo-studio/alphastudio-xxl', destination: '/en/studio-photo/alphastudio-xxl-v2', statusCode: 301 },
      { source: '/en/photo-studio/e-comm-studio', destination: '/en/studio-photo/e-comm-studio-plus', statusCode: 301 },
      { source: '/en/photo-studio/360-turntables', destination: '/en/studios-photo-automatises', statusCode: 301 },
      // Catch-all pour les slugs inchangés (alphashot-360, alphashot-g2, etc.)
      { source: '/en/photo-studio/:slug', destination: '/en/studio-photo/:slug', statusCode: 301 },

      // Aussi corriger les accès directs à /studio-photo/ avec anciens slugs
      { source: '/en/studio-photo/alphashot-micro', destination: '/en/studio-photo/alphashot-micro-v2', statusCode: 301 },
      { source: '/en/studio-photo/alphashot-xl', destination: '/en/studio-photo/alphashot-xl-v2', statusCode: 301 },
      { source: '/en/studio-photo/alphastudio-compact', destination: '/en/studio-photo/alphastudio-compact-v2', statusCode: 301 },
      { source: '/en/studio-photo/alphastudio-xxl', destination: '/en/studio-photo/alphastudio-xxl-v2', statusCode: 301 },
      { source: '/en/studio-photo/e-comm-studio', destination: '/en/studio-photo/e-comm-studio-plus', statusCode: 301 },
      { source: '/en/studio-photo/360-turntables', destination: '/en/studios-photo-automatises', statusCode: 301 },

      // Contact variantes
      { source: '/fr/contact/demande-demo', destination: '/fr/contact?subject=demo', statusCode: 301 },
      { source: '/en/contact/request-demo', destination: '/en/contact?subject=demo', statusCode: 301 },
      { source: '/fr/contact/demande-devis-formation', destination: '/fr/contact?subject=formation', statusCode: 301 },
      { source: '/en/contact/training-quote', destination: '/en/contact?subject=training', statusCode: 301 },

      // ============================================================
      // BLOC 2b - Pages supprimées / URLs restructurées
      // ============================================================

      // Produits (ancienne URL sans /fr/)
      { source: '/produits', destination: '/fr/studio-photo/selecteur-machines', statusCode: 301 },

      // Industrie bouteilles → food-alimentaire
      { source: '/industrie/bouteilles', destination: '/fr/industrie/food-alimentaire', statusCode: 301 },

      // Guide supprimé (n'existe pas dans le nouveau site)
      { source: '/guide/modifier-couleur-produit-photo', destination: '/fr/blog', statusCode: 301 },
      { source: '/en/guide/modifier-couleur-produit-photo', destination: '/en/blog', statusCode: 301 },

      // Webflow-specific paths
      { source: '/gestion-workflow-shotflow', destination: '/fr/ia-photo-produit', statusCode: 301 },
      { source: '/ancien-studio-photo', destination: '/fr/studios-photo-automatises', statusCode: 301 },
      { source: '/packshot-packshotcreator', destination: '/fr', statusCode: 301 },
      { source: '/packshot-packshotcreator/:slug', destination: '/fr', statusCode: 301 },
      { source: '/accessoires', destination: '/fr/studios-photo-automatises', statusCode: 301 },
      { source: '/accessoires/:slug', destination: '/fr/studios-photo-automatises', statusCode: 301 },

      // ============================================================
      // BLOC 3 - Langues DE/ES/NL → /en
      // Redirections individuelles (URLs >20 clics GSC 3 mois)
      // placées AVANT les catch-all (Next.js évalue dans l'ordre)
      // ============================================================

      // ES - Blog
      { source: '/es/blog/como-elige-mejor-objectivo-foto-paquete', destination: '/en/blog/how-to-choose-best-lens-for-product-photography', statusCode: 301 },
      { source: '/es/blog/aprender-fotografia-joyas-ecommerce', destination: '/en/blog/technique-photograph-jewelry-tutorial', statusCode: 301 },
      { source: '/es/blog/8-pasos-para-fotografiar-joyas-profesionalmente', destination: '/en/blog/8-steps-to-professional-jewelry-photography', statusCode: 301 },

      // ES - Guides
      { source: '/es/guide/que-equipo-elegir-para-foto-joyas', destination: '/en/guide/which-equipment-to-choose-for-jewelry-photo', statusCode: 301 },
      { source: '/es/guide/que-ajustes-para-fotografiar-joyas', destination: '/en/guide/what-settings-to-photograph-jewelry', statusCode: 301 },
      { source: '/es/guide/como-fotografiar-gafas-para-e-commerce', destination: '/en/guide/how-to-photograph-glasses-for-e-commerce', statusCode: 301 },
      { source: '/es/guide/como-posicionar-reloj-para-fotos-producto', destination: '/en/guide/how-to-position-watch-before-shooting-photo', statusCode: 301 },

      // DE - Blog
      { source: '/de/blog/welches-bildformat-ist-das-beste-fur-das-web', destination: '/en/blog/best-image-format-for-the-web', statusCode: 301 },
      { source: '/de/blog/8-schritte-zur-professionellen-schmuckfotografie', destination: '/en/blog/8-steps-to-professional-jewelry-photography', statusCode: 301 },

      // DE - Guides
      { source: '/de/guide/welche-ausrustung-fur-schmuckfotografie-wahlen', destination: '/en/guide/which-equipment-to-choose-for-jewelry-photo', statusCode: 301 },
      { source: '/de/guide/welche-einstellungen-zum-fotografieren-von-schmuck', destination: '/en/guide/what-settings-to-photograph-jewelry', statusCode: 301 },

      // DE - Machines
      { source: '/de/fotostudio/alphashot-g2', destination: '/en/studio-photo/alphashot-g2', statusCode: 301 },

      // NL - Blog
      { source: '/nl/blog/8-stappen-voor-professionele-sieradenfotografie', destination: '/en/blog/8-steps-to-professional-jewelry-photography', statusCode: 301 },

      // NL - Guides
      { source: '/nl/guide/welke-instellingen-om-sieraden-te-fotograferen', destination: '/en/guide/what-settings-to-photograph-jewelry', statusCode: 301 },

      // Catch-all DE/ES/NL → /en
      { source: '/de', destination: '/en', statusCode: 301 },
      { source: '/de/:path*', destination: '/en', statusCode: 301 },
      { source: '/es', destination: '/en', statusCode: 301 },
      { source: '/es/:path*', destination: '/en', statusCode: 301 },
      { source: '/nl', destination: '/en', statusCode: 301 },
      { source: '/nl/:path*', destination: '/en', statusCode: 301 },
    ];
  },
};


export default withNextIntl(withMDX(nextConfig));
