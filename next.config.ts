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
      { source: '/contact', destination: '/fr/contact', permanent: true },
      { source: '/a-propos', destination: '/fr/a-propos', permanent: true },
      { source: '/mentions-legales', destination: '/fr/mentions-legales', permanent: true },
      { source: '/confidentialite', destination: '/fr/confidentialite', permanent: true },
      { source: '/cgu', destination: '/fr/cgu', permanent: true },
      { source: '/ia-photo-produit', destination: '/fr/ia-photo-produit', permanent: true },
      { source: '/studios-photo-automatises', destination: '/fr/studios-photo-automatises', permanent: true },
      { source: '/e-commerce', destination: '/fr/e-commerce', permanent: true },

      // Routes dynamiques FR
      { source: '/blog', destination: '/fr/blog', permanent: true },
      { source: '/blog/:slug', destination: '/fr/blog/:slug', permanent: true },
      { source: '/industrie', destination: '/fr/industrie', permanent: true },
      { source: '/industrie/:slug', destination: '/fr/industrie/:slug', permanent: true },
      { source: '/guide', destination: '/fr/guide', permanent: true },
      { source: '/guide/:slug', destination: '/fr/guide/:slug', permanent: true },
      { source: '/academy', destination: '/fr/academy', permanent: true },
      { source: '/academy/:path*', destination: '/fr/academy/:path*', permanent: true },

      // ============================================================
      // BLOC 2 - Anciennes URLs Webflow renommées
      // ============================================================

      // Secteurs (anciennes URLs packshot-secteur-*)
      { source: '/packshot-secteur-chaussures', destination: '/fr/industrie/chaussures', permanent: true },
      { source: '/packshot-secteur-bijouterie', destination: '/fr/industrie/bijoux-joaillerie', permanent: true },
      { source: '/packshot-secteur-meuble', destination: '/fr/industrie/mobilier-decoration', permanent: true },
      { source: '/packshot-secteur-mode-accessoires', destination: '/fr/industrie/mode-textile', permanent: true },
      { source: '/packshot-secteur-pieces-techniques', destination: '/fr/industrie/pieces-techniques-industrie', permanent: true },
      { source: '/packshot-secteur-e-commerce', destination: '/fr/e-commerce', permanent: true },

      // Hubs renommés
      { source: '/studio-photo', destination: '/fr/studios-photo-automatises', permanent: true },
      { source: '/blendai', destination: '/fr/ia-photo-produit', permanent: true },

      // Pages supprimées/fusionnées
      { source: '/logiciel', destination: '/fr/ia-photo-produit', permanent: true },
      { source: '/formation', destination: '/fr/academy', permanent: true },
      { source: '/formations', destination: '/fr/academy', permanent: true },

      // Produits EN (ancien path /photo-studio/ → nouveau /studio-photo/)
      { source: '/en/photo-studio/:slug', destination: '/en/studio-photo/:slug', permanent: true },

      // Contact variantes
      { source: '/fr/contact/demande-demo', destination: '/fr/contact?subject=demo', permanent: true },
      { source: '/en/contact/request-demo', destination: '/en/contact?subject=demo', permanent: true },
      { source: '/fr/contact/demande-devis-formation', destination: '/fr/contact?subject=formation', permanent: true },
      { source: '/en/contact/training-quote', destination: '/en/contact?subject=training', permanent: true },

      // Webflow-specific paths
      { source: '/gestion-workflow-shotflow', destination: '/fr/ia-photo-produit', permanent: true },
      { source: '/ancien-studio-photo', destination: '/fr/studios-photo-automatises', permanent: true },
      { source: '/packshot-packshotcreator', destination: '/fr', permanent: true },
      { source: '/packshot-packshotcreator/:slug', destination: '/fr', permanent: true },
      { source: '/accessoires', destination: '/fr/studios-photo-automatises', permanent: true },
      { source: '/accessoires/:slug', destination: '/fr/studios-photo-automatises', permanent: true },

      // ============================================================
      // BLOC 3 - Langues DE/ES/NL → blendai.studio
      // ============================================================
      { source: '/de', destination: 'https://blendai.studio', permanent: true },
      { source: '/de/:path*', destination: 'https://blendai.studio', permanent: true },
      { source: '/es', destination: 'https://blendai.studio', permanent: true },
      { source: '/es/:path*', destination: 'https://blendai.studio', permanent: true },
      { source: '/nl', destination: 'https://blendai.studio', permanent: true },
      { source: '/nl/:path*', destination: 'https://blendai.studio', permanent: true },
    ];
  },
};


export default withNextIntl(withMDX(nextConfig));
