// packshot-router: Cloudflare Worker de migration Webflow → Next.js
// Route /fr/* et /en/* vers Vercel (Next.js), le reste vers Webflow

const NEXTJS_PATTERNS = [
  /^\/(fr|en)(\/|$)/,    // /fr, /en et tout sous-chemin
  /^\/_next\//,           // Assets Next.js (JS, CSS, images)
  /^\/images\//,          // Images statiques (public/images/)
  /^\/logos\//,           // Logos (public/logos/)
  /^\/api\//,             // API routes Next.js
  /^\/calculateur-roi/,   // Page non-localisée
  /^\/sitemap\.xml$/,     // Sitemap généré par Next.js
  /^\/favicon/,           // Favicons
  /^\/robots\.txt$/,      // robots.txt
];

// Slugs blog qui existent comme pages statiques dans Next.js
// Tout autre slug sous /(fr|en)/blog/ ou /(fr|en)/guide/ → Webflow
const NEXTJS_BLOG_SLUGS = new Set([
  'blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026',
  'blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026',
  'budget-studio-photo-automatise',
  'comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet',
  'comparatif-orbitvu-ortery-styleshoots-2026',
  'financement-formation-opco-guide-complet-pour-studios-photo-2026',
  'formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026',
  'guide-achat-studio-2026',
  'ia-photo-produit-guide-2026',
  'orbitvu-vs-concurrents',
  'prestataire-packshot-vs-studio-interne',
  'studio-ia-vs-ia-generative',
]);

// ============================================================
// Pages définitivement supprimées → 410 Gone
// Source : audit GSC complet (128 URLs en 404 confirmées)
// ============================================================
const GONE_PATHS = new Set([
  // FR blog (sans préfixe langue — anciennes URLs pré-Webflow)
  '/blog/11-ans-deja',
  '/blog/chaussures-homme-luxe-lelegance-en-ligne',
  '/blog/codes-et-dernieres-tendances-pour-vos-visuels-produits-sur-les-reseaux-sociaux',
  '/blog/comment-mieux-exporter-son-vin-en-chine-quel-role-jouent-les-visuels-e-commerce',
  '/blog/comment-permettre-a-vos-visiteurs-de-voir-vos-produits-sous-plusieurs-angles',
  '/blog/comment-photographier-des-petits-objets-pour-votre-e-commerce',
  '/blog/conseils-dexperts-pour-des-visuels-produits-efficaces',
  '/blog/decouvrez-lhistoire-dun-fail-du-e-commerce',
  '/blog/donnez-du-relief-a-votre-communication-maestrobot3d-par-packshotcreator',
  '/blog/e-commerce-8-elements-indispensables-pour-reussi',
  '/blog/e-commerce-astuces-diminution-taux-de-rebond',
  '/blog/e-commerce-avec-quel-materiel-photographier-de-petits-objets-en-studio',
  '/blog/e-commerce-comment-prendre-en-photo-vos-bijoux-et-creations-en-studio',
  '/blog/e-commerce-du-stock-physique-de-produits-au-stock-numerique',
  '/blog/e-commerce-les-4-arguments-justifiant-la-necessite-de-produire-vos-propres-visuels',
  '/blog/evolution-du-e-commerce-et-photographie-de-produits',
  '/blog/guide-photo-ecommerce-2018',
  '/blog/instagram-pinterest-lequel-pour-vos-visuels',
  '/blog/la-loupe-cest-bien-le-zoom-progressif-cest-mieux',
  '/blog/les-5-lois-de-lattraction-visuelle-dans-le-e-commerce',
  '/blog/les-animations-nouvelles-cles-de-reussite-pour-vos-sites-e-commerce',
  '/blog/les-conseils-de-packshotcreator-pour-2016-dans-le-livre-blanc-de-wizishop',
  '/blog/limportance-du-visuel-pour-un-site-web-e-commerce',
  '/blog/nouveautes-2018-photos-ecommerce',
  '/blog/offrez-a-vos-e-shoppers-un-confort-de-navigation-optimal-sur-votre-site-e-commerce',
  '/blog/optimisez-la-gestion-budgetaire-de-votre-studio-photo-interne',
  '/blog/packshotcreator-lance-son-nouveau-livre-blanc',
  '/blog/peut-on-faire-de-bonnes-images-sans-bon-materiel-photo',
  '/blog/photographie-de-produits-gerez-les-reflets-et-la-transparence',
  '/blog/photos-e-commerce-4-millions-dinternautes-a-seduire-quotidiennement-a-laide-de-centaines-de-photos-de-produits',
  '/blog/retour-du-salon-mondial-de-la-realite-augmentee-awe',
  '/blog/solution-ecommerce-wizishop-nouvelle-version',
  '/blog/studio-photo-interne-ecommerce',
  '/blog/studio-photo-maison-photographie-produit',
  '/blog/une-seconde-vie-pour-vos-photos-de-produits-avec-pinterest',
  '/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22',
  '/blog/webinar-augmenter-votre-taux-de-conversion-grace-a-des-visuels-produit-en-360',
  // EN pages diverses
  '/en/ads-generaliste',
  '/en/besoins',
  '/en/packshot-automatise-packshotcreator',
  '/en/questions-cles',
  '/en/thank-you-page',
  // EN blog
  '/en/blog/11-years-service-product-photography',
  '/en/blog/3-good-practices-for-organizing-the-production-of-your-internal-photo-studio2',
  '/en/blog/3d-object-relief-communication',
  '/en/blog/4-reasons-producing-ecommerce-visuals',
  '/en/blog/automated-photography-solutions-comparison',
  '/en/blog/awe-show-return',
  '/en/blog/boost-your-conversion-rate-with-product-visuals-4-mistakes-to-avoid',
  '/en/blog/can-one-take-good-product-photos-without-good-material',
  '/en/blog/display-clothes-photo-flatlay',
  '/en/blog/e-commerce-8-elements-success-copy',
  '/en/blog/e-commerce-million-users-seduce',
  '/en/blog/e-commerce-stockroom-digital-inventory',
  '/en/blog/e-commerce-tips-reduce-bounce-rate',
  '/en/blog/evolution-e-commerce-packshot',
  '/en/blog/expert-tips-product-photography',
  '/en/blog/guidelines-trends-social-media-images',
  '/en/blog/homemade-photo-studio-product-photography',
  '/en/blog/how-better-export-wine-china-role-e-commerce',
  '/en/blog/how-visitors-see-products-multiple-perspectives',
  '/en/blog/htlm5-360-animations-keys-success-e-commerce',
  '/en/blog/importance-visuals-e-commerce-website',
  '/en/blog/in-house-photo-studio-economies-scale',
  '/en/blog/instagram-pinterest-which-your-e-commerce',
  '/en/blog/law-visual-attraction-ecommerce',
  '/en/blog/luxury-shoes-elegance-online',
  '/en/blog/magnifying-glass-good-zoom-better',
  '/en/blog/news-e-commerce-photos',
  '/en/blog/offer-e-shoppers-optimal-browsing',
  '/en/blog/optimize-budget-management-photo-studio',
  '/en/blog/packshot-invest-orbitvu-photo-studios',
  '/en/blog/packshotcreator-white-book-e-commerce',
  '/en/blog/photograph-a-ring-like-a-professional-in-8-steps',
  '/en/blog/photograph-small-objetcs-e-commerce',
  '/en/blog/photographing-ring-8-steps',
  '/en/blog/product-photo-guide',
  '/en/blog/product-photography-reflections-transparency',
  '/en/blog/roi-in-house-photo-studio',
  '/en/blog/second-life-products-pinterest-e-commerce',
  '/en/blog/small-items-macrophotography-studio',
  '/en/blog/story-e-commerce-failure',
  '/en/blog/tips-wizishop-by-packshotcreator',
  '/en/blog/use-photo-studio-virtual-reality-2',
  '/en/blog/visuals-in-house-saves-time-budget',
  '/en/blog/visuals-referencing-your-e-commerce',
  '/en/blog/webinar-increase-conversion-rate',
  '/en/blog/wizishop-new-version',
  // EN guides
  '/en/guide/animation-360-focus-stacking',
  '/en/guide/comment-photographier-lunettes-e-commerce',
  '/en/guide/convert-product-color-in-product-photography',
  '/en/guide/equipement-photo-360-bijoux',
  '/en/guide/guide-montre',
  '/en/guide/guide-photo-bijoux-pierres-precieuses',
  '/en/guide/realiser-animation-360-professionnelle-chaussures',
  '/en/guide/what-settings-photograph-jewelry',
  '/en/guide/which-settings-for-jewelry-photography',
  // FR guides (sans préfixe)
  '/guide/5-videos-chaussures-ia-alphashot-pro-g2',
  '/guide/conversion-de-couleur',
  '/guide/equipement-photo-360-bijoux',
  '/guide/guide-montre',
  '/guide/guide-photo-bijoux-pierres-precieuses',
  // Legacy paths (ftp, resources, pages, old products)
  '/ftp/PackshotViewer/3D-leicanew/HTML5Viewer.html',
  '/ftp/SYSNEXT_CGV_EN.pdf',
  '/ftp/Sysnext_CGS_EN.pdf',
  '/ftp/Sysnext_CGS_FR.pdf',
  '/ftp/libro-blanco-problematicas-e-business-fotografia-2-0.pdf',
  '/new-get-the-best-out-of-the-new-packshotcreator-2013-software-with-your-nikon-slr-camera',
  '/new-product-photography-software',
  '/pages/tools-components-photography',
  '/resources/files/2019/03/en-packshotcreator-r3-installation-guide.pdf',
]);

function shouldReturn410(path) {
  // 1. Exact match
  if (GONE_PATHS.has(path)) return true;
  // 2. Pattern: suffix -mod or contains -old-
  if (path.endsWith('-mod') || path.includes('-old-')) return true;
  // 3. Prefix: /ftp/ /resources/ /pages/
  if (path.startsWith('/ftp/') || path.startsWith('/resources/') || path.startsWith('/pages/')) return true;
  // 4. Double lang prefix /en/en/
  if (path.startsWith('/en/en/')) return true;
  return false;
}

function isWebflowContent(pathname) {
  // /(fr|en)/blog/:slug → Webflow si le slug n'est pas dans Next.js
  const blogMatch = pathname.match(/^\/(fr|en)\/blog\/([^/]+)$/);
  if (blogMatch && !NEXTJS_BLOG_SLUGS.has(blogMatch[2])) return true;

  // /en/guide/:slug → Webflow (guides EN existent sur Webflow, pas dans Next.js)
  // /fr/guide/:slug → Next.js (les guides FR sont fetchés via l'API Webflow CMS par Next.js)
  if (/^\/en\/guide\/[^/]+$/.test(pathname)) return true;

  return false;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Non-www → www (301) pour éviter contenu dupliqué
    if (url.hostname === 'packshot-creator.com') {
      const wwwUrl = new URL(url);
      wwwUrl.hostname = 'www.packshot-creator.com';
      return Response.redirect(wwwUrl.toString(), 301);
    }

    // Racine → /fr (301 SEO-friendly)
    if (pathname === '/') {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `${url.origin}/fr`,
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Anciennes URLs FR sans préfixe /fr/ → redirection 301
    // (dans le Worker car next.config.ts ne les voit jamais — le Worker route vers Webflow avant)
    const LEGACY_REDIRECTS = {
      '/contact': '/fr/contact',
      '/a-propos': '/fr/a-propos',
      '/mentions-legales': '/fr/mentions-legales',
      '/confidentialite': '/fr/confidentialite',
      '/cgu': '/fr/cgu',
      '/ia-photo-produit': '/fr/ia-photo-produit',
      '/studios-photo-automatises': '/fr/studios-photo-automatises',
      '/e-commerce': '/fr/blog',
      '/industrie': '/fr/industrie',
      '/studio-photo': '/fr/studios-photo-automatises',
      '/blendai': '/fr/ia-photo-produit',
      '/logiciel': '/fr/ia-photo-produit',
      '/formation': '/fr/academy',
      '/formations': '/fr/academy',
      '/produits': '/fr/studios-photo-automatises',
      '/gestion-workflow-shotflow': '/fr/ia-photo-produit',
      '/ancien-studio-photo': '/fr/studios-photo-automatises',
      '/packshot-secteur-chaussures': '/fr/industrie/chaussures',
      '/packshot-secteur-bijouterie': '/fr/industrie/bijoux-joaillerie',
      '/packshot-secteur-meuble': '/fr/industrie/mobilier-decoration',
      '/packshot-secteur-mode-accessoires': '/fr/industrie/mode-textile',
      '/packshot-secteur-pieces-techniques': '/fr/industrie/pieces-techniques-industrie',
      '/packshot-secteur-e-commerce': '/fr/blog',
    };

    // Vérifier les redirections exactes
    if (LEGACY_REDIRECTS[pathname]) {
      return Response.redirect(`${url.origin}${LEGACY_REDIRECTS[pathname]}`, 301);
    }

    // Redirections index uniquement (les /blog/:slug et /guide/:slug restent sur Webflow)
    if (pathname === '/blog') {
      return Response.redirect(`${url.origin}/fr/blog`, 301);
    }
    if (pathname === '/guide') {
      return Response.redirect(`${url.origin}/fr/guide`, 301);
    }
    if (pathname === '/academy') {
      return Response.redirect(`${url.origin}/fr/academy`, 301);
    }
    // /blog/:slug et /guide/:slug → PAS de redirect, servis par Webflow (contenu legacy encore live)
    // /academy/:path → PAS de redirect, servi par Webflow (slugs différents entre Webflow et Next.js)
    if (pathname.startsWith('/industrie/')) {
      return Response.redirect(`${url.origin}/fr${pathname}`, 301);
    }
    if (pathname.startsWith('/packshot-packshotcreator')) {
      return Response.redirect(`${url.origin}/fr`, 301);
    }
    if (pathname.startsWith('/studio-photo/')) {
      return Response.redirect(`${url.origin}/fr${pathname}`, 301);
    }
    if (pathname.startsWith('/accessoires')) {
      return Response.redirect(`${url.origin}/fr/studios-photo-automatises`, 301);
    }

    // DE/ES/NL → /en (301) — ces langues ne sont plus maintenues
    // Redirections spécifiques pour les pages à fort trafic GSC
    const LANG_SPECIFIC_REDIRECTS = {
      '/es/blog/como-elige-mejor-objectivo-foto-paquete': '/en/blog/how-to-choose-best-lens-for-product-photography',
      '/es/blog/aprender-fotografia-joyas-ecommerce': '/en/blog/technique-photograph-jewelry-tutorial',
      '/es/blog/8-pasos-para-fotografiar-joyas-profesionalmente': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/es/guide/que-equipo-elegir-para-foto-joyas': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/es/guide/que-ajustes-para-fotografiar-joyas': '/en/guide/what-settings-to-photograph-jewelry',
      '/es/guide/como-fotografiar-gafas-para-e-commerce': '/en/guide/how-to-photograph-glasses-for-e-commerce',
      '/es/guide/como-posicionar-reloj-para-fotos-producto': '/en/guide/how-to-position-watch-before-shooting-photo',
      '/es/guide/crear-animacion-360-profesional-de-zapatos': '/en/guide/create-professional-360-animation-of-shoes',
      '/es/guide/como-hacer-video-zapatos': '/en/guide/how-to-make-shoe-video',
      '/de/blog/welches-bildformat-ist-das-beste-fur-das-web': '/en/blog/best-image-format-for-the-web',
      '/de/blog/8-schritte-zur-professionellen-schmuckfotografie': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/de/guide/welche-ausrustung-fur-schmuckfotografie-wahlen': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/de/guide/wie-man-schuhvideo-macht': '/en/guide/how-to-make-shoe-video',
      '/de/guide/welche-einstellungen-zum-fotografieren-von-schmuck': '/en/guide/what-settings-to-photograph-jewelry',
      '/de/fotostudio/alphashot-g2': '/en/studio-photo/alphashot-g2',
      '/nl/blog/8-stappen-voor-professionele-sieradenfotografie': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/nl/guide/welke-instellingen-om-sieraden-te-fotograferen': '/en/guide/what-settings-to-photograph-jewelry',
    };

    if (/^\/(de|es|nl)(\/|$)/.test(pathname)) {
      const target = LANG_SPECIFIC_REDIRECTS[pathname] || '/en';
      return Response.redirect(`${url.origin}${target}`, 301);
    }

    // ============================================================
    // 410 Gone — Pages définitivement supprimées (pré-Webflow + legacy)
    // Interceptées AVANT le proxy Webflow pour éviter des 404 soft
    // ============================================================
    if (shouldReturn410(pathname)) {
      return new Response(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Gone | PackshotCreator</title><meta name="robots" content="noindex"><meta http-equiv="refresh" content="5;url=${url.origin}/fr"></head><body><p>This page has been permanently removed.</p><p>Redirecting to <a href="${url.origin}/fr">packshot-creator.com</a>…</p></body></html>`,
        {
          status: 410,
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=86400',
            'X-Robots-Tag': 'noindex, nofollow',
          },
        }
      );
    }

    // Blog/guide avec slug Webflow → forcer vers Webflow (évite 500 Next.js)
    const forceWebflow = isWebflowContent(pathname);
    const isNextJS = !forceWebflow && NEXTJS_PATTERNS.some((p) => p.test(pathname));
    const origin = isNextJS ? env.NEXTJS_ORIGIN : env.WEBFLOW_ORIGIN;

    const targetUrl = new URL(pathname + url.search, origin);

    const headers = new Headers(request.headers);
    // Garder le Host original (www.packshot-creator.com) pour que Vercel
    // reconnaisse le domaine configuré dans le projet

    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual',
    });

    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });

    newResponse.headers.set('X-Served-By', isNextJS ? 'nextjs' : 'webflow');

    return newResponse;
  },
};
