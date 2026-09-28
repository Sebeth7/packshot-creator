# Cloudflare Worker - PackshotCreator Router

## Description

Le Worker `packshot-router` s'exécute devant le site (routes déclarées dans
`wrangler.toml`). Il porte :

- les redirections des anciennes URL (site Webflow débranché le 24/05/2026,
  anciens sous-domaines `fr.`, `de.`, `news.`…) ;
- les réponses 410 (`GONE_PATHS`) ;
- le passage direct des sous-domaines servis par un tiers (`PASSTHROUGH_HOSTS`) ;
- le proxy de tout le reste vers `NEXTJS_ORIGIN` (Vercel, projet `sysnext`).

Il n'existe plus d'origine Webflow : la variable `WEBFLOW_ORIGIN`, inutilisée
par le code, a été retirée de `wrangler.toml` le 28/09/2026.

## Source de vérité et déploiement

`src/index.js` fait foi (CLAUDE.md, règle R5). Aucune édition au dashboard
Cloudflare. Avant tout nouveau mapping : resynchroniser le dépôt avec la version
déployée, puis déployer depuis le dépôt et contrôler les URL témoins.
Procédure complète : `docs/seo-geo/05-INFRA.md`.

## Tests

`test/*.test.ts` (Vitest) : redirections legacy, lot F, héritage de-ch,
unicité des clés des tables.

## Debug

Les réponses proxifiées vers Next.js portent l'en-tête `X-Served-By: nextjs`.
