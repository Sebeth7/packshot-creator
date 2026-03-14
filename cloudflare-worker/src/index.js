// Worker packshot-router : proxy Next.js pour les routes migrées
// IMPORTANT : Ce fichier est la config de référence.
// Le Worker déployé sur Cloudflare est redirections-410 qui contient aussi
// la logique 410. La section ci-dessous est intégrée dans le Worker déployé.

// Routes migrées vers Next.js (servies depuis Vercel)
const MIGRATED_ROUTES = [
  '/calculateur-roi',
];

// Origin Next.js (Vercel)
const NEXTJS_ORIGIN = 'https://packshot-creator.vercel.app';
