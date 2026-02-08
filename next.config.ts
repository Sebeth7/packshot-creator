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

      // Produits EN (ancien path /photo-studio/ → nouveau /studio-photo/)
      { source: '/en/photo-studio/:slug', destination: '/en/studio-photo/:slug', statusCode: 301 },

      // Contact variantes
      { source: '/fr/contact/demande-demo', destination: '/fr/contact?subject=demo', statusCode: 301 },
      { source: '/en/contact/request-demo', destination: '/en/contact?subject=demo', statusCode: 301 },
      { source: '/fr/contact/demande-devis-formation', destination: '/fr/contact?subject=formation', statusCode: 301 },
      { source: '/en/contact/training-quote', destination: '/en/contact?subject=training', statusCode: 301 },

      // Webflow-specific paths
      { source: '/gestion-workflow-shotflow', destination: '/fr/ia-photo-produit', statusCode: 301 },
      { source: '/ancien-studio-photo', destination: '/fr/studios-photo-automatises', statusCode: 301 },
      { source: '/packshot-packshotcreator', destination: '/fr', statusCode: 301 },
      { source: '/packshot-packshotcreator/:slug', destination: '/fr', statusCode: 301 },
      { source: '/accessoires', destination: '/fr/studios-photo-automatises', statusCode: 301 },
      { source: '/accessoires/:slug', destination: '/fr/studios-photo-automatises', statusCode: 301 },

      // ============================================================
      // BLOC 3 - Langues DE/ES/NL → blendai.studio
      // ============================================================
      { source: '/de', destination: 'https://blendai.studio', statusCode: 301 },
      { source: '/de/:path*', destination: 'https://blendai.studio', statusCode: 301 },
      { source: '/es', destination: 'https://blendai.studio', statusCode: 301 },
      { source: '/es/:path*', destination: 'https://blendai.studio', statusCode: 301 },
      { source: '/nl', destination: 'https://blendai.studio', statusCode: 301 },
      { source: '/nl/:path*', destination: 'https://blendai.studio', statusCode: 301 },
    ];
  },
};


export default withNextIntl(withMDX(nextConfig));
