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
      '/de/blog/welches-bildformat-ist-das-beste-fur-das-web': '/en/blog/best-image-format-for-the-web',
      '/de/blog/8-schritte-zur-professionellen-schmuckfotografie': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/de/guide/welche-ausrustung-fur-schmuckfotografie-wahlen': '/en/guide/which-equipment-to-choose-for-jewelry-photo',
      '/de/guide/welche-einstellungen-zum-fotografieren-von-schmuck': '/en/guide/what-settings-to-photograph-jewelry',
      '/de/fotostudio/alphashot-g2': '/en/studio-photo/alphashot-g2',
      '/nl/blog/8-stappen-voor-professionele-sieradenfotografie': '/en/blog/8-steps-to-professional-jewelry-photography',
      '/nl/guide/welke-instellingen-om-sieraden-te-fotograferen': '/en/guide/what-settings-to-photograph-jewelry',
    };

    if (/^\/(de|es|nl)(\/|$)/.test(pathname)) {
      const target = LANG_SPECIFIC_REDIRECTS[pathname] || '/en';
      return Response.redirect(`${url.origin}${target}`, 301);
    }

    const isNextJS = NEXTJS_PATTERNS.some((p) => p.test(pathname));
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
