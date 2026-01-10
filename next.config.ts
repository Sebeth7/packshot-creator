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
      // PRIORITÉ 1 - Duplication SEO (Cannibalisation) - 6 redirections
      {
        source: '/packshot-secteur-chaussures',
        destination: '/industrie/chaussures',
        permanent: true,
      },
      {
        source: '/packshot-secteur-bijouterie',
        destination: '/industrie/bijoux',
        permanent: true,
      },
      {
        source: '/packshot-secteur-meuble',
        destination: '/industrie/meubles',
        permanent: true,
      },
      {
        source: '/packshot-secteur-mode-accessoires',
        destination: '/industrie/shootings-photo',
        permanent: true,
      },
      {
        source: '/packshot-secteur-pieces-techniques',
        destination: '/industrie/pieces-techniques',
        permanent: true,
      },
      {
        source: '/packshot-secteur-e-commerce',
        destination: '/e-commerce',
        permanent: true,
      },

      // PRIORITÉ 2 - Architecture 3 Piliers (Hubs) - 2 redirections
      {
        source: '/studio-photo',
        destination: '/studios-photo-automatises',
        permanent: true,
      },
      {
        source: '/blendai',
        destination: '/ia-photo-produit',
        permanent: true,
      },

      // PRIORITÉ 3 - Langues (Redirections externes) - 9 redirections (3 langues × 3)
      {
        source: '/de',
        destination: 'https://blendai.studio',
        permanent: true,
      },
      {
        source: '/de/:path*',
        destination: 'https://blendai.studio',
        permanent: true,
      },
      {
        source: '/es',
        destination: 'https://blendai.studio',
        permanent: true,
      },
      {
        source: '/es/:path*',
        destination: 'https://blendai.studio',
        permanent: true,
      },
      {
        source: '/nl',
        destination: 'https://blendai.studio',
        permanent: true,
      },
      {
        source: '/nl/:path*',
        destination: 'https://blendai.studio',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
