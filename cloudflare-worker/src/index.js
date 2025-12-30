// Routes migrées vers Next.js (à mettre à jour au fur et à mesure)
const MIGRATED_ROUTES = [
  // Mission 0 : Setup (page test - décommenter après déploiement Vercel)
  // '/',
  // '/en',
  // '/de',
  // '/es',
  // '/nl',
  // Mission 1 : Pages 404 (redirections 301 gérées par Next.js)
  // Mission 2 : TOP 5 pages (P1)
  // Mission 3 : Pages 6-10 (P2)
  // Mission 4 : Pages 11-13 (P3)
  // Mission 5 : Bulk migration
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Déterminer si la route est migrée vers Next.js
    const isMigrated = MIGRATED_ROUTES.some(route =>
      pathname === route || pathname.startsWith(route + '/')
    );

    // Choisir l'origine appropriée
    const origin = isMigrated ? env.NEXTJS_ORIGIN : env.WEBFLOW_ORIGIN;

    // Construire l'URL cible
    const targetUrl = new URL(pathname + url.search, origin);

    // Effectuer la requête proxy
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // Créer une nouvelle réponse avec headers modifiés
    const newResponse = new Response(response.body, response);

    // Ajouter header pour debug (à retirer en production)
    newResponse.headers.set('X-Served-By', isMigrated ? 'nextjs' : 'webflow');
    newResponse.headers.set('X-Worker-Version', '1.0.0');

    return newResponse;
  },
};
