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
