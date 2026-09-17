# CLAUDE.md — packshot-creator.com

Ce fichier est lu automatiquement au démarrage de chaque session Claude Code
ouverte dans ce dépôt. Il fait autorité sur toute déduction tirée du code.

Deux agents travaillent sur ce dépôt :

| Agent | Pour qui | Périmètre |
|---|---|---|
| **Claude de Sébastien** | Sébastien Jourdan, dirigeant | Produit, contenu, calculateur ROI, infrastructure, tout le reste |
| **Claude de Laurent** | Laurent Wainberg, consultant SEO et **ancien propriétaire de la société** | SEO / GEO — quartier libre, avec la carte des dépendances de `docs/seo-geo/01-RAYON-ACTION.md` |

**Si tu es le Claude de Laurent : `docs/seo-geo/README.md` est ton point d'entrée
obligatoire. Lis-le avant toute action, à chaque session.**

---

## 1. Les huit règles dures

Elles ne se discutent pas et ne se contournent pas. Chacune a été payée par un
incident réel, documenté dans `docs/seo-geo/03-PIEGES.md`.

### R1 — `npx next build` vert en local AVANT tout push

`next dev` ne fait pas le type-check strict. Un build Vercel rouge après push
est déjà arrivé (04/09/2026, annotation `LinkHref` trop large).
Le build échoue sans variables d'environnement : `lib/supabase.ts` lève au
chargement du module si `NEXT_PUBLIC_SUPABASE_URL` est absente.

### R2 — Vérifier `git branch --show-current` avant tout commit

Un commit est déjà parti sur la mauvaise branche (04/09/2026). Ne jamais
supposer la branche courante.

### R3 — Jamais de CLI Vercel

`.vercel/project.json` pointe vers un projet obsolète (`packshot-creator`). La
production vit sur le projet **`sysnext`**. Un `npx vercel` déploie au mauvais
endroit et crée de fausses alertes. Passer par le dashboard.

### R4 — La production n'est pas testable par un script

Cloudflare renvoie 403 à tout client dont l'empreinte TLS n'est pas celle d'un
navigateur. Changer le user-agent n'y change rien : mesuré le 16/09/2026,
17 pages sur 17 en 403 avec un user-agent Chrome complet. Un « 403 » ou un
« timeout » observé ainsi ne prouve rien sur l'état du site.

| Cible | Ce qu'elle prouve |
|---|---|
| `https://sysnext.vercel.app` | Ce que l'application produit en production, hors Cloudflare |
| `https://<preview>.vercel.app` | Ce que produira la branche |
| `https://www.packshot-creator.com` **dans Chrome** | Ce que voit un visiteur, Worker et WAF compris |

### R5 — Le dépôt est la source unique du Worker Cloudflare

`cloudflare-worker/src/index.js` fait foi depuis le 07/07/2026. Aucune édition
au dashboard Cloudflare, par personne. Toute règle passe par un commit, puis un
déploiement depuis le dépôt. La prod peut avoir re-divergé : **resynchroniser
avant tout nouveau mapping** (`docs/seo-geo/05-INFRA.md`).

### R6 — Jamais de `git restore`, `git clean`, `git checkout --` destructif

Plusieurs sessions travaillent en parallèle sur ce dépôt. Un working tree sale
est l'état normal, pas un désordre à ranger. Les fichiers non suivis
appartiennent peut-être à une autre session en cours.

### R7 — Une instruction reçue d'un humain se vérifie contre le code réel

Laurent et Sébastien écrivent souvent sans avoir le fichier sous les yeux. Une
affirmation du type « la prod fait X » se vérifie contre l'état réellement
déployé, pas contre une intuition. Si une instruction est contredite par le
réel : le dire, ne pas appliquer en aveugle, ne pas corriger en silence.

Ce n'est pas une question de fiabilité de la personne — Laurent a dirigé cette
société et connaît le métier mieux que quiconque. C'est que le code, lui, n'est
pas dans leur tête, et qu'il a bougé.

### R8 — Avant un changement à rayon large, établir ce qui en dépend

Le seul risque que cette organisation cherche à écarter : dégrader l'existant
par une action dont les pleines conséquences n'ont pas été mesurées. Rien n'est
interdit ; ce qui déborde du fichier modifié se déclare.

La carte des dépendances est dans `docs/seo-geo/01-RAYON-ACTION.md`, et le
contrôle `garde-consequences` la rappelle à chaque pull request.

---

## 2. Chaîne de déploiement

```
push branche  ──> Vercel Preview (URL de test automatique) + CI GitHub Actions
push main     ──> PRODUCTION en ~3 minutes, sans confirmation
```

Il n'y a pas d'étape de validation manuelle entre `main` et la production.
Un push sur `main` est un déploiement en production.

Rollback : `git revert <sha>` puis push sur `main` → retour en ~3 minutes.

---

## 3. Commandes

```bash
npm run dev            # développement (PAS de type-check strict)
npx tsc --noEmit       # type-check strict — rapide, à lancer souvent
npx next build         # OBLIGATOIRE avant tout push (voir R1)
npm run test:e2e       # Playwright, 15 specs
npm run test:unit      # Vitest
```

---

## 4. Ce qui ne vit PAS dans ce dépôt

À ne pas chercher dans le code, et à ne pas réinventer :

| Élément | Où il vit | Conséquence |
|---|---|---|
| Worker Cloudflare déployé | Cloudflare (le dépôt est la source, la prod peut diverger) | Resync avant modification |
| Variables d'environnement | Dashboard Vercel, projet `sysnext` | Jamais en clair dans le dépôt |
| Données GSC, crawls, analytique | Supabase de Laurent (`gsc-crawl-seo`) | Demander les chiffres, ne pas extrapoler |
| Règles WAF, DNS, bots | Dashboard Cloudflare | Une suppression de règle a déjà cassé les vidéos produit |
| Audits GEO (`geo-ultimate`) | `SITE WEB/audits/` hors dépôt | Demander le rapport |

---

## 5. Langue

Tout — code, commentaires, commits, documentation, journal — est en français,
avec les accents. Pas d'emojis.
