# Cloudflare Worker - PackshotCreator Router

## Description

Ce Worker Cloudflare agit comme un routeur intelligent pour la migration progressive de Webflow vers Next.js.

**Principe :** Le Worker intercepte les requêtes vers packshot-creator.com et les route soit vers :
- **Next.js (Vercel)** — pour les pages déjà migrées
- **Webflow** — pour les pages non encore migrées

**Avantages :**
- ✅ Migration progressive page par page
- ✅ Zéro impact SEO (même domaine)
- ✅ Rollback instantané (modifier Worker)
- ✅ Zéro downtime

## Installation

```bash
# Installer Wrangler CLI
npm install -g wrangler

# Login Cloudflare
wrangler login
```

## Configuration

1. Mettre à jour `wrangler.toml` avec l'URL Vercel correcte
2. Mettre à jour `src/index.js` avec les routes migrées

## Déploiement

```bash
# Dev local (test)
wrangler dev

# Déployer en production
wrangler deploy

# Voir les logs
wrangler tail
```

## Mise à jour des routes

Après chaque migration de page :

1. Ouvrir `src/index.js`
2. Ajouter la route dans `MIGRATED_ROUTES`
3. Déployer : `wrangler deploy`

Exemple :
```javascript
const MIGRATED_ROUTES = [
  '/',
  '/en',
  '/blog/quel-format-d-image-pour-le-web',
  // etc.
];
```

## Rollback

Si une page migrée pose problème :

1. Retirer la route de `MIGRATED_ROUTES`
2. Déployer : `wrangler deploy`
3. Le trafic revient immédiatement vers Webflow

## Debug

Chaque réponse contient un header `X-Served-By` :
- `nextjs` — servi par Next.js (Vercel)
- `webflow` — servi par Webflow

Vérifier :
```bash
curl -I https://packshot-creator.com/
# Voir le header X-Served-By
```

## Notes

- Ne PAS déployer le Worker avant d'avoir l'URL Vercel
- Mettre à jour `NEXTJS_ORIGIN` dans `wrangler.toml`
- Tracker les routes migrées dans `src/routes.json` (documentation)
