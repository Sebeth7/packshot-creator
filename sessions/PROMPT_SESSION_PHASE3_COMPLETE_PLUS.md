# Session — Phase 3 complète + suite migration blog/guides

> **Tu prends la suite d'une mission critique** : finaliser la migration du blog/guides Webflow → Next.js sur `packshot-creator.com`. Les phases 1, 2 et 3 mini sont terminées et en prod. Reste Phase 3 complète (55 EN blog + 22 EN guides), Phase 4 (validation SEO GSC) et Phase 5 (optim top 20). **Pas le droit à l'erreur** : le blog représente 47,6 % du trafic organique du site.

---

## 1. Lectures obligatoires AVANT toute action

Lis ces fichiers dans cet ordre. Ils contiennent l'historique, les décisions tranchées, les pièges connus.

### A. Handover Phase 2 (référence vivante)
**Fichier** : `sessions/PROMPT_MIGRATION_BLOG_PHASE2.md`
- Lis l'**intégralité**. Sections particulièrement importantes :
  - §1 Plan global 5 phases
  - §3 Décisions immuables
  - §6 Proto article pilote (à respecter)
  - §7 Pièges (15 cas particuliers)
  - §10 Plan Phase 3 (à exécuter dans cette session)
  - §11 Règles de fonctionnement
  - §13.G Décisions tranchées le 19/04

### B. Mémoires Claude Code (chargées automatiquement par MEMORY.md)
- `feedback_webflow_draft_vs_live.md` — règle critique : `isDraft` ≠ non-servi, vérifier `lastPublished`
- `feedback_vercel_project.md` — JAMAIS le CLI Vercel, dashboard sysnext uniquement
- `feedback_work_method.md` — travailler en profondeur, pas survoler
- `feedback_max_automation_rule.md` — analyser Seb vs Claude, prendre tout ce qui est techniquement possible
- `feedback_no_consciousness_language.md` — pas de vocabulaire conscience/intentions chez Claude
- `feedback_copywriting_francais.md` — Claude ne rédige pas le copywriting commercial final, Seb rédige
- `project_blog_migration_plan.md` — état du plan, à actualiser à la fin

### C. Code de référence
- `lib/content.ts` — source de vérité locale (créée Phase 2 étape 1)
- `lib/blog.ts` — combine STATIC_ARTICLES + content migré
- `cloudflare-worker/src/index.js` — routing Worker, **C'EST CE QUE TU VAS MODIFIER**
- `app/[lang]/blog/[slug]/page.tsx` — template article (proto Phase 2)
- `app/[lang]/guide/[slug]/page.tsx` — template guide

---

## 2. Contexte projet en 30 secondes

**Site** : `www.packshot-creator.com` — vitrine Sysnext / PackshotCreator (rachat janvier 2026, dirigeant Seb Ducros).

**Architecture cohabitation** :
- Cloudflare Worker en frontline → route entre Next.js (Vercel `sysnext.vercel.app`) et Webflow (`packshot-creator-staging.webflow.io`)
- Le staging Webflow EST la prod Webflow (un seul projet) — ne jamais le débrancher tant que migration pas validée
- Next.js sert les pages produit, industrie, academy, calculateur ROI, et désormais (Phase 2/3 mini) les articles FR migrés
- Webflow sert encore les 55 EN blog + 22 EN guides en attendant Phase 3 complète

**Migration blog/guides — corpus** :
- 60 articles FR (57 published + 3 drafts whitelistés)
- 55 articles EN (52 published + 3 drafts whitelistés)
- 22 guides FR + 22 guides EN (le 22ᵉ EN = un draft-mais-live migré le 19/04)
- 470 images locales sous `public/images/{blog,guides}/<fileId>.<ext>`
- 12 articles statiques TSX (intouchables, sous `app/[lang]/blog/<slug>/`)

---

## 3. État exact au début de la session

### 3.1 Branche et commits
- Branche : `main`
- Dernier commit migration : `054e6b8 fix(blog): listing affiche tous les articles en SSR`
- Worker version prod : `8bcf1b7c-5b47-44e2-927c-42cc3513da7d` (déployé le 01/05)
- Tous mes commits Phase 2/3 mini sont sur `origin/main`

### 3.2 Ce qui marche en prod (`www.packshot-creator.com`)

| Route | Backend | Statut |
|---|---|---|
| `/fr/blog/<slug-fr>` (60 migrés) | Next.js | ✅ 200, version Phase 2 servie |
| `/fr/blog/<slug-statique>` (×12) | Next.js | ✅ 200 |
| `/fr/blog` (listing) | Next.js | ✅ 72 articles SSR (modif 02/05) |
| `/fr/guide/<slug>` (22) | Next.js | ✅ 200 |
| `/fr/guide` (listing) | Next.js | ✅ 22 guides |
| `/en/blog/<slug-en>` (55 migrés) | **Webflow** | ⚠️ 200 mais ancienne version |
| `/en/blog/<slug-statique>` (×12) | Next.js | ✅ 200 (titres FR pour 8/12, dégradation connue) |
| `/en/blog` (listing) | Next.js | ✅ 67 articles SSR |
| `/en/guide/<slug>` (22) | **Webflow** | ⚠️ 200 mais ancienne version |
| `/en/guide` (listing) | Next.js | ✅ 22 guides |
| Sitemap `/sitemap.xml` | Next.js | ✅ 304 URLs, 0 en 404 |

### 3.3 Décisions tranchées (rappel)
- Pas de réécriture du texte humain (règle ferme)
- Les 12 statiques apparaissent dans listings FR ET EN (8/12 sans i18n EN — dégradation acceptée)
- Pas de mapping `categorie-3` guides (pas de filtre catégorie)
- Pas de `RelatedGuides` côté guides (Phase 5 candidate)
- Pas de pages légales (CGU, mentions, confidentialité) dans le scope migration

### 3.4 Sessions parallèles à respecter
D'autres sessions travaillent en parallèle. À chaque action :
1. **Toujours** `git branch --show-current` avant de commit/push (cas vu : switch transparent vers `feat/sysnext-industrial`)
2. **Toujours** `git add <fichier-précis>`, **JAMAIS** `git add -A` ni `git add .`
3. Si un fichier est modifié dans le WD et que tu n'es pas l'auteur, **NE PAS** le toucher (probablement WIP d'une autre session)

---

## 4. Mission de la session — Phase 3 complète

### 4.1 Objectif
Basculer les **55 articles EN blog + 22 guides EN** vers Next.js, comme la Phase 3 mini l'a fait pour les 60 FR. Aujourd'hui ils répondent 200 mais via Webflow ancienne version (sans les améliorations Phase 2 : alternates correctes, FAQ Schema, images locales, bug `/en/guide` corrigé).

### 4.2 Plan en 4 étapes

**Étape 1 — Worker : extension `NEXTJS_BLOG_SLUGS` aux 55 EN**

Fichier : `cloudflare-worker/src/index.js`

- Lire les 55 slugs EN depuis `ls content/blog/en | sed 's/\.json$//'` (devrait retourner 55)
- Ajouter ces 55 slugs au `Set` `NEXTJS_BLOG_SLUGS` après les 60 FR (commentaire `// === 55 articles EN migrés (Phase 3 complète — 2026-XX-XX) ===`)
- Total final attendu : 12 + 60 + 55 = **127 slugs** dans le Set
- Vérifier `node --check cloudflare-worker/src/index.js` (syntaxe)

**Étape 2 — Worker : retirer le proxy Webflow pour `/en/guide/*`**

Toujours dans `cloudflare-worker/src/index.js`, fonction `isWebflowContent` ligne ~505 :

```js
// ACTUEL (à retirer)
if (/^\/en\/guide\/[^/]+$/.test(pathname)) return true;
```

Cette ligne route `/en/guide/<slug>` vers Webflow. À supprimer pour que tout `/en/guide/*` tombe en fallback Next.js (le template lit déjà `content/guides/en/`).

**Étape 3 — Cleanup `GUIDE_EN_REDIRECTS`**

Le slug `create-professional-360-animation-of-shoes` y est encore (commit `4393491` l'a migré). Mais le redirect 301 `/guide/<slug>` → `/en/guide/<slug>` reste valide (visiteurs externes peuvent arriver sur l'URL legacy). À discuter avec Seb : laisser tel quel ou retirer ?
- **Default safe** : laisser en place. Le 301 mène désormais vers Next.js qui sert le contenu.

**Étape 4 — Deploy + validation**

```bash
cd cloudflare-worker
npx wrangler deploy
```

Tests :
1. Sample 15 articles EN migrés en prod : doivent passer à 200 + `x-served-by: nextjs`
2. Sample 22 guides EN : idem
3. Non-régression : 60 FR blog + 22 FR guides + 12 statics (×2 langues) + sitemap toujours OK

### 4.3 Critères de validation

```bash
# 55 EN blog
for slug in $(ls content/blog/en | sed 's/\.json$//'); do
  HEADERS=$(curl -sI "https://www.packshot-creator.com/en/blog/$slug")
  CODE=$(echo "$HEADERS" | head -1 | awk '{print $2}')
  SERVED=$(echo "$HEADERS" | grep -i "x-served-by" | awk '{print $2}' | tr -d '\r')
  echo "$CODE $SERVED $slug"
done | grep -v "200 nextjs" | head
# Attendu : aucune ligne (toutes en 200 + nextjs)

# 22 EN guides
for slug in $(ls content/guides/en | sed 's/\.json$//'); do
  CODE=$(curl -so /dev/null -w "%{http_code}" "https://www.packshot-creator.com/en/guide/$slug")
  echo "$CODE $slug"
done | grep -v "^200" | head
# Attendu : aucune ligne
```

### 4.4 Commit attendu

```
feat(worker): Phase 3 complète — bascule 55 EN blog + 22 EN guides vers Next.js

- NEXTJS_BLOG_SLUGS étendu aux 55 slugs EN migrés (total 127 slugs)
- isWebflowContent : retrait du match /en/guide/* (fallback Next.js)
- Le sitemap (304 URLs) sert maintenant 100% Next.js, plus aucune URL via
  Webflow ancienne version

Worker version <ID> deployed.
Tests post-deploy : 55 EN blog + 22 EN guides → 200 + x-served-by: nextjs.
0 régression sur FR blog/guides ni statics.
```

---

## 5. Suite après Phase 3 complète

### 5.1 Phase 4 — Validation SEO GSC (à faire 24-48h après Phase 3 complète)
**Action de Seb, pas de Claude** :
- Re-soumettre `https://www.packshot-creator.com/sitemap.xml` dans Google Search Console
- Demander validation du rapport « Introuvable (404) »
- Inspecter URL sur 5-10 articles top
- Monitoring impressions/clics 2 semaines

Si la validation se passe bien → débranchement Webflow possible :
- Dashboard Webflow → Settings → Hosting → Unpublish
- Action irréversible, à faire seulement quand Seb a confirmation que les rankings sont préservés

### 5.2 Phase 5 — Optim SEO/GEO top 20 (chantier édito + tech)

Top 10 articles GSC à 3 mois (cf. handover §12.8) :
1. `/blog/quel-format-d-image-pour-le-web` — 200 clics / 31k imp.
2. `/blog/materiel-photo-guide-photographie-packshot` — 148 / 16k
3. `/blog/guide-photographie-packshot-pourquoi-faire-packshots` — 147 / 22k
4. ... (10 au total, voir handover)

Actions Phase 5 :
- **Métadonnées** : `<title>`, meta description, OpenGraph affinés
- **Schema.org enrichi** : FAQPage si manque, HowTo si pertinent, sameAs auteur
- **Maillage interne** : ajout de liens contextuels (ne pas casser les URLs)
- **PAS de réécriture du texte humain** (règle ferme)

Pour les choix éditoriaux : Seb décide. Claude prépare les structures, propositions de titres/descriptions, listes de liens internes pertinents.

### 5.3 Tâches secondaires en attente
- **8 STATIC_ARTICLES sans i18n EN** : leurs metas restent en français sur `/en/blog/<slug>`. À traduire avec Seb (skill `redaction-francaise`) ou laisser tel quel.
- **Mapping `categorie-3` guides** : 6 IDs bruts dans `categoryId`, à mapper si on ajoute un filtre catégorie au listing.
- **`RelatedGuides`** : composant à créer (analogue `RelatedArticles`) si on veut un bloc « guides similaires ».
- **`cloudflare-worker/src/index.js.backup-2026-04-14`** : fichier non-tracké à supprimer ou ajouter au `.gitignore`.

### 5.4 Mémoire à actualiser après Phase 3 complète
- `project_blog_migration_plan.md` : marquer Phase 3 complète terminée, mettre à jour l'état
- Ajouter `feedback_*.md` si découvertes nouvelles

---

## 6. Règles absolues à respecter pendant TOUTE la session

### 6.1 Tests et déploiement
- **URL de test** : `sysnext.vercel.app` (preview) avant prod
- **Prod** : `www.packshot-creator.com`
- **Le déploiement Worker** : `cd cloudflare-worker && npx wrangler deploy` (autorisé)
- **Le déploiement Vercel** : automatique au push sur `main`. JAMAIS le CLI Vercel.

### 6.2 Git
- Toujours `git branch --show-current` avant chaque commit
- Toujours `git add <fichier-précis>` (pas `-A` ni `.`)
- Push direct sur `main` autorisé (validé par Seb)
- Pas de `--no-verify`, pas de force-push sans validation explicite
- Si une opération git est destructrice (stash, reset, force-push), demander à Seb avant

### 6.3 Code et contenu
- Texte humain des articles **JAMAIS** réécrit par Claude
- Pas de pages légales (CGU, mentions, confidentialité) dans le scope migration
- Travailler en profondeur, pas survoler
- Vérifier avant d'affirmer (curl, grep, read code)
- Poser une question plutôt que supposer en cas de doute

### 6.4 Communication
- Pas de vocabulaire suggérant conscience/intentions chez Claude
- Le texte commercial français final est rédigé par Seb, pas Claude
- Réponses concises (≤100 mots final response sauf cas qui exigent plus de détail)
- Texte entre tool calls ≤25 mots

---

## 7. Commandes utiles

```bash
# Working directory
cd "/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator"

# Branche actuelle
git branch --show-current   # doit être main

# Compter le corpus
ls content/blog/fr | wc -l   # 60
ls content/blog/en | wc -l   # 55
ls content/guides/fr | wc -l # 22
ls content/guides/en | wc -l # 22

# Build (vérifier zéro régression)
npm run build 2>&1 | grep -iE "error|warn|failed"

# Re-run extraction (idempotent)
node --env-file=.env.local scripts/extract-webflow-content.mjs

# Deploy Worker
cd cloudflare-worker && npx wrangler deploy

# Headers prod (qui sert ?)
curl -sI "https://www.packshot-creator.com/<path>" | grep -iE "^http|x-served-by|x-vercel"

# Sitemap count
curl -s "https://www.packshot-creator.com/sitemap.xml" | grep -c "<loc>"
```

---

## 8. Pièges à connaître (rappel synthétique)

1. **Switch de branche silencieux** : Seb a plusieurs sessions, peut switcher pendant que tu travailles. Vérifier la branche avant chaque commit.
2. **Webflow `isDraft` ≠ non-servi** : toujours vérifier `lastPublished` non-null pour détecter les drafts-mais-live (cf. mémoire dédiée).
3. **Staging Webflow == prod Webflow** : un seul projet, ne jamais débrancher tant que migration pas validée.
4. **`generateStaticParams` × 12 statiques** : exclure les `STATIC_ARTICLE_SLUGS` du paramétrage dynamique pour éviter chevauchements de routes.
5. **Cache Vercel pour le sitemap** : compter ~2 min de purge après push. Tester avec `?v=$(date +%s)` pour bust cache CDN.
6. **Format date hétérogène** : STATIC_ARTICLES = `'YYYY-MM-DD'`, migrés = ISO complet. Le parser dans `app/[lang]/blog/page.tsx` détecte la présence du `T`.
7. **Liens dans le texte des articles** : déjà rewrités par le script d'extraction, ne PAS retoucher manuellement (sinon désynchro avec une future re-extraction).

---

## 9. Au démarrage, fais ces 3 choses

1. **Confirme** en 5-10 lignes : (a) ta compréhension de la mission, (b) les 2-3 risques qui t'inquiètent le plus, (c) l'ordre proposé pour les 4 étapes Phase 3 complète
2. **Vérifie l'état repo** : `git branch --show-current`, `git log --oneline -n 5`, `git status --short | head`
3. **Vérifie l'état prod actuel** : sample 5 EN blog + 5 EN guides via curl pour confirmer qu'on est bien dans l'état pré-Phase 3 complète

Puis attends mon `go` avant de commencer l'étape 1.

---

## 10. Bon travail

La Phase 3 complète est du refactor ciblé et bien préparé. Le risque principal : oublier un test de non-régression sur les 60 FR blog ou les guides FR. Suis le plan, valide chaque étape, commit/deploy proprement. Tu peux le faire.
