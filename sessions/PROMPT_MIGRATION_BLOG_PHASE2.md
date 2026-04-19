# Session Phase 2 — Migration blog+guides : templates Next.js lisent `content/`

> **Contexte** : session précédente du 17-19/04/2026 a exécuté Phase 0 (vérification) + Phase 0.5 (fix mapping Webflow) + Phase 1 (extraction complète des articles/guides + images).
> Cette session attaque la **Phase 2** : adapter Next.js pour lire depuis les fichiers locaux au lieu de l'API Webflow.
>
> **Impératif** : pas le droit à l'erreur — le blog représente 47,6% du trafic organique du site.
> **Règle d'or** : tout ce qui est commité n'a PAS encore été basculé en prod (Phase 3 fera le basculement Worker). Donc Phase 2 travaille sur la preview Vercel `sysnext.vercel.app` uniquement. La prod (`www.packshot-creator.com`) continue de servir Webflow via le Cloudflare Worker pendant toute la Phase 2.
>
> ⚠️ **Ce prompt est dédié à la migration blog/guides**. Il ne doit pas être confondu avec l'ancien `PROMPT_SESSION_PHASE2.md` (racine repo) qui concerne une Phase 2 différente (sélecteur machines, OPCO) datée de janvier 2026.

---

## Table des matières

1. [Mission globale et position dans le plan](#1-mission-globale-et-position-dans-le-plan)
2. [État exact au début de Phase 2](#2-état-exact-au-début-de-phase-2)
3. [Décisions produit déjà prises (immuables)](#3-décisions-produit-déjà-prises-immuables)
4. [Architecture des données en place](#4-architecture-des-données-en-place)
5. [Fichiers clés du projet](#5-fichiers-clés-du-projet)
6. [Proto article pilote à reproduire](#6-proto-article-pilote-à-reproduire)
7. [Pièges et cas particuliers](#7-pièges-et-cas-particuliers)
8. [Plan Phase 2 détaillé](#8-plan-phase-2-détaillé)
9. [Critères de validation](#9-critères-de-validation)
10. [Plan Phase 3 qui suivra](#10-plan-phase-3-qui-suivra)
11. [Règles de fonctionnement](#11-règles-de-fonctionnement)
12. [Environnement et commandes utiles](#12-environnement-et-commandes-utiles)
13. [Annexes](#13-annexes)

---

## 1. Mission globale et position dans le plan

### Le plan global de migration

Migration du blog et des guides Webflow → Next.js. Volumes :
- **60 articles FR** (57 publiés + 3 drafts whitelistés)
- **55 articles EN** (52 publiés + 3 drafts whitelistés — **5 articles FR n'ont pas de version EN**)
- **22 guides FR** + **21 guides EN** (1 guide FR n'a pas de version EN)

### Plan 5 phases

| Phase | Objet | État | Commits clés |
|---|---|---|---|
| **Phase 0** | Vérification préalable | ✅ fait | — |
| **Phase 0.5** | Fix critique mapping Webflow (champs `name` → `contenu`, etc.) | ✅ fait | `70c5d0b`, `b647a8f` |
| **Phase 0.6** | Proto article complet (FAQ, auteur, catégorie, alternates, badge retiré) | ✅ fait | `65b6740` |
| **Phase 0.7** | Nettoyage Worker 15 URLs legacy → 410, réconciliation WIP 16/04, déploiement | ✅ fait | `4a322ed`, `cbe99aa`, `f2018f1` |
| **Phase 1** | Extraction script + 158 JSON + 476 assets locaux | ✅ fait | `b563faa`, `56d4bc3`, `58197bf`, `55feeba` |
| **Phase 2** | Templates Next.js lisent `content/` (au lieu de API Webflow) | 🔜 **cette session** | — |
| **Phase 3** | Basculement Cloudflare Worker vers Next.js pour tout le blog/guide | À venir | — |
| **Phase 4** | Validation SEO (curl tests + GSC submit) | À venir | — |
| **Phase 5** | Optim SEO/GEO top 20 articles (métadonnées, Schema, maillage — pas le texte) | À venir | — |

### Position actuelle : début Phase 2

- Tous les articles/guides migrés existent sous forme de JSON dans `content/`
- Toutes les images sont en local sous `public/images/{blog,guides}/<fileId>.<ext>`
- Le template article blog fonctionne sur preview Vercel **avec API Webflow** (proto complet)
- Le template guide fonctionne **avec API Webflow** aussi
- **Le listing blog ne fonctionne pas bien** (mélange FR+EN actuellement)
- **Le sitemap est vide** côté Webflow (0 URLs blog/guide Webflow dans `app/sitemap.ts`)

### Pourquoi Phase 2 est critique

Phase 2 est la plus risquée car :
1. Elle change la **source de vérité** pour le contenu blog/guide (API → fichiers locaux)
2. Elle doit préserver **parfaitement** les URLs, slugs, hreflang, metadata existantes
3. Elle conditionne Phase 3 (basculement Worker) : sans Phase 2 solide, le basculement Worker expose un site cassé

---

## 2. État exact au début de Phase 2

### 2.1 Repository state

- Branche : `main`
- Dernier commit : `55feeba` — `fix(extraction): prefix guides images /images/guides au lieu de /images/guide`
- Repo remote : `https://github.com/Sebeth7/packshot-creator.git`
- Permission : **push direct sur `main` est autorisé** dans cette session (Seb l'a validé plusieurs fois) — mais toujours demander pour `push --force` ou actions destructrices

### 2.2 Fichiers créés par Phase 1 (mis à jour 19/04 post-migration guide EN)

```
content/
  blog/
    alternates.json                    # { webflowItemId: { fr: 'slug', en: 'slug' } }
    fr/<slug>.json                     # 60 articles
    en/<slug>.json                     # 55 articles
  guides/
    alternates.json
    fr/<slug>.json                     # 22 guides
    en/<slug>.json                     # 22 guides (21 + 1 draft whitelisté migré le 19/04)

public/images/
  blog/<fileId>.<avif|mp4>             # 305 blog assets
  guides/<fileId>.<avif>               # 165 guide assets

scripts/
  extract-webflow-content.mjs          # le script d'extraction (Phase 1)

sessions/
  fr-subdomain-mapping-v3.csv          # CSV mapping fr.subdomain → Next.js
  extract-report.json                  # rapport du dernier run extraction
  PROMPT_MIGRATION_BLOG_PHASE2.md      # ce document
```

### 2.3 Schéma exact des JSON `content/blog/<lang>/<slug>.json`

```typescript
interface MigratedArticle {
  webflowItemId: string;          // shared FR/EN, clé pour alternates
  lang: 'fr' | 'en';
  slug: string;                   // slug dans la lang courante
  title: string;                  // champ Webflow `name`
  h1: string;                     // champ `titre-principal-h1-et-metatitre` fallback sur `name`
  metaTitle: string | null;       // champ `meta-titre` pour <title>
  description: string;            // champ `meta-description`
  date: string;                   // ISO string (champ `date` ou fallback `lastPublished`, `createdOn`)
  image: string | null;           // `/images/blog/<fileId>.avif` (local)
  imageSource: string | null;     // URL CDN originale (audit trail)
  category: string | null;        // label résolu : "E-commerce", "Actualités", "Produits", "Innovations" (EN idem sauf "News" pour Actualités)
  categoryId: string | null;      // ID brut du CMS (pour tri/filtre)
  author: string | null;          // "Laurent Wainberg" (seul auteur dans le corpus)
  readingTime: number | null;     // minutes, depuis champ `temps-de-lecture`
  content: string;                // HTML rewrité (liens + img repointés local)
  faqs: { question: string; answer: string }[];   // 0 à 5 paires (texte plat, pas HTML)
  _stats: {                       // stats internes du rewrite — peut être retiré en Phase 2 avant commit
    imageUrls: number;
    kept: number;
    rewritten: number;
    unlinked: number;
    total: number;
  };
  source: 'webflow';              // toujours 'webflow' car c'est l'origine
}
```

### 2.4 Schéma des guides `content/guides/<lang>/<slug>.json`

```typescript
interface MigratedGuide {
  webflowItemId: string;
  lang: 'fr' | 'en';
  slug: string;
  title: string;                  // champ `name`
  h1: string;                     // champ `titre-principal` fallback `name`
  metaTitle: string | null;
  description: string;
  date: string;
  image: string | null;           // `/images/guides/<fileId>.avif`
  imageSource: string | null;
  categoryId: string | null;      // champ `categorie-3` — 6 valeurs options, labels PAS résolus (à faire si besoin listing)
  duration: string | null;        // champ `champ-duree` (ex: "10 min")
  tool: string | null;            // champ `champ-outil`
  logistics: string | null;       // champ `champ-logistique`
  introText: string;              // HTML rewrité
  introMedia: string | null;      // champ `premiere-image-video` (HTML raw non rewrité — probablement embed)
  steps: {
    position: number;             // 1..10
    title: string;
    content: string;              // HTML rewrité
    image: string | null;
    imageSource: string | null;
    structuredText: string | null;   // texte brut pour Schema.org HowToStep
  }[];
  faqs: { question: string; answer: string }[];
  source: 'webflow';
}
```

### 2.5 Schéma des `alternates.json`

```typescript
interface Alternates {
  [webflowItemId: string]: {
    fr: string | null;   // slug FR — null si FR-only absent (cas extrêmes rares)
    en: string | null;   // slug EN — null si pas d'alternate EN (5 articles, 1 guide)
  };
}
```

### 2.6 Articles sans version EN (5 + 1)

**Blog** — ces 5 articles FR n'ont PAS d'alternate EN. Sur leur page `/fr/blog/<slug>`, il ne faut **PAS** générer `<link rel="alternate" hreflang="en">` :
- `oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg`
- `revolution-e-commerce-les-animations-3d-spheriques-de-produits-pour-le-sport`
- `promod-revolutionne-ses-shootings-photos-de-mode`
- `boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter`
- `les-visuels-au-service-du-referencement-de-votre-e-commerce`

**Guide** — aucun désormais (depuis le 19/04). Il en restait 1 (`realiser-animation-360-professionnelle-chaussures`) jusqu'à la découverte que son alternate EN `create-professional-360-animation-of-shoes` était **servi en prod par Webflow** malgré `isDraft: true` côté API. Le guide EN a été migré via `GUIDE_DRAFTS_TO_KEEP` dans le script. Corpus : 22/22 FR/EN paires complètes. Détail en §7.15.

### 2.7 Drafts whitelistés (3 blog)

Ces 3 articles sont `isDraft: true` dans Webflow mais **doivent être migrés et publiés** sur Next.js (décision Seb du 16/04) :
- `photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre`
- `photographie-2d-de-produits`
- `photographie-de-produits-a-360-degres-en-interne` (14 images — article riche, bon test visuel)

Les 3 existent en FR ET en EN dans les JSON extraits.

---

## 3. Décisions produit déjà prises (immuables)

Ces décisions ont été tranchées avec Seb. **Ne pas les remettre en question sans raison forte**.

### 3.1 Architecture data

- **JSON par langue** (pas fichier unique bi-lang) : `content/blog/fr/<slug>.json` + `content/blog/en/<slug>.json`. Plus simple pour le routing.
- **Index alternates séparé** : `content/blog/alternates.json` indexé par `webflowItemId`, valeur `{ fr: slug|null, en: slug|null }`. Sert pour `generateStaticParams` et `alternates.languages`.
- **Images partagées à plat par `fileId` Webflow** : `public/images/blog/<fileId>.<ext>`. Déduplication naturelle quand FR et EN utilisent le même `fileId`. 9% des articles ont une hero différente entre FR et EN — dans ce cas, 2 fileId distincts, 2 fichiers distincts, pas de conflit.
- **Pas de slug FR collision avec slug EN** : vérifié côté corpus, aucun slug identique entre langues pour blog ni guides.

### 3.2 Contenu

- **Le texte humain des articles n'est PAS réécrit**. Seuls les liens et URLs d'images sont modifiés. C'est un impératif : Seb est très clair là-dessus, mémoire projet confirmée. Les améliorations SEO/GEO (Phase 5) portent sur métadonnées + Schema.org + maillage, jamais sur le texte.
- **Category résolue via mapping hardcodé** (4 valeurs blog + 1 auteur — cf. §12.6 et §12.7)
- **FAQ rendue** avec Schema.org FAQPage (pattern copié de `app/[lang]/guide/[slug]/page.tsx`)
- **Badge "Archive Webflow" retiré** du template (i18n key `webflowArchive` supprimée de fr.json + en.json)
- **Images : toujours AVIF** sauf GIF animés → MP4 (règle projet)
- **Pas de pages légales** (CGU, confidentialité, mentions) — exclues du scope migration

### 3.3 Liens dans le contenu

Stratégie **rewrite strict / unlink** appliquée par le script d'extraction :

| Cas | Action |
|---|---|
| Lien externe (http non-packshot) | Gardé tel quel |
| Ancre `#id`, `mailto:`, `tel:` | Gardé |
| `https://www.packshot-creator.com/path` | Normalisé en `/{lang}{path}` |
| `/xxx` relatif déjà `/fr/` ou `/en/` | Gardé |
| `/blog/<slug>` | Résolu via corpus `blog.slugToItemId` → `/{lang}/blog/<slug-in-lang>`, sinon unlink |
| `/guide/<slug>` | Idem pour guides |
| `/industrie/<slug>` / `/studio-photo/<slug>` / whitelist de préfixes connus | Préfixé `/{lang}` |
| `/sector/<slug-EN>` | Résolu via `SECTOR_SLUG_MAP` EN→FR slug → `/{lang}/industrie/<slug-fr>` |
| `/photo-studio/<slug>` | Aliasé en `/studio-photo/<slug>` puis préfixé |
| `/formations-photographie-produits-packshotcreator` | Mappé à `/academy/formations-packshot` |
| `/createur-des-studios-photos-connectes` | Mappé à `/a-propos` |
| `/gestion-workflow-shotflow` | Mappé à `/ia-photo-produit` |
| `/produits` | Mappé à `/studios-photo-automatises` |
| `https://fr.packshot-creator.com/...` | Résolu via `sessions/fr-subdomain-mapping-v3.csv` (37 rewrite / 19 unlink) |
| Tout le reste relatif inconnu | **Unlink** (retire `<a>`, garde texte) |

**Résultat global** : 47.9% rewrite, 46.1% kept (externes), 6.0% unlink sur 1011 liens blog.

Les règles sont **déjà appliquées dans les JSON `content/`** — Phase 2 n'a rien à rewriter, juste à consommer le champ `content`.

### 3.4 Liens pointant vers staging Webflow — contexte critique

⚠️ **Info sensible découverte en Phase 0.7** : `packshot-creator-staging.webflow.io` **est le même projet Webflow que la prod** (un seul site dans Webflow, `shortName=packshot-creator-staging`). **NE PAS le débrancher** tant que Phase 3 n'est pas faite. Débrancher = casser le blog+guides en prod qui tournent encore sur Webflow.

Cf. section Pièges, § 7.1.

---

## 4. Architecture des données en place

### 4.1 Cartographie content ↔ template ↔ URLs

```
┌─────────────────────────────────────────┐
│ content/blog/fr/<slug>.json             │──┐
├─────────────────────────────────────────┤  │
│ content/blog/en/<slug>.json             │  │    → /{lang}/blog/<slug>
├─────────────────────────────────────────┤  │
│ content/blog/alternates.json            │  │
└─────────────────────────────────────────┘  │
                                             │
         ┌───────────────────────┐           │
         │ lib/content.ts        │◀──────────┘
         │ (à créer Phase 2)     │
         └──────────┬────────────┘
                    │
                    ▼
  ┌──────────────────────────────────────────┐
  │ app/[lang]/blog/[slug]/page.tsx          │
  │ app/[lang]/blog/page.tsx (listing)       │
  │ app/[lang]/guide/[slug]/page.tsx         │
  │ app/[lang]/guide/page.tsx (listing)      │
  │ app/sitemap.ts                           │
  └──────────────────────────────────────────┘
```

### 4.2 Cohabitation avec les articles statiques

**12 articles sont des pages TSX statiques** (dossiers sous `app/[lang]/blog/<slug>/`), pas issus du CMS. Ils sont définis dans `lib/blog.ts` via `STATIC_ARTICLES`. Ils **NE DOIVENT PAS** être touchés. Liste (extrait de `lib/blog.ts`) :

- `budget-studio-photo-automatise`
- `prestataire-packshot-vs-studio-interne`
- `comparatif-orbitvu-ortery-styleshoots-2026`
- `studio-ia-vs-ia-generative`
- `ia-photo-produit-guide-2026`
- `blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026`
- `blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026`
- `orbitvu-vs-concurrents`
- `guide-achat-studio-2026`
- `comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet`
- `financement-formation-opco-guide-complet-pour-studios-photo-2026`
- `formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026`

Ces 12 slugs :
- Sont dans `NEXTJS_BLOG_SLUGS` du Worker (pour le routing preserve)
- Sont dans `STATIC_ARTICLES` de `lib/blog.ts` (pour le listing)
- **Le routing Next.js prend leur dossier `app/[lang]/blog/<slug>/page.tsx` en priorité** sur le template dynamique `app/[lang]/blog/[slug]/page.tsx`
- Ne sont PAS dans `content/blog/*/` — le script d'extraction Webflow ne les voit pas (ils n'existent pas dans le CMS)

**Implication Phase 2** : la page de listing doit additionner :
- Les 12 `STATIC_ARTICLES` filtrés par lang (certains n'existent peut-être qu'en FR)
- Les 60 (FR) ou 55 (EN) `content/blog/<lang>/*.json`
- Total attendu : ~72 FR / ~67 EN dans le listing

Vérifier quels `STATIC_ARTICLES` ont leurs dossiers en FR et EN. La structure actuelle du repo doit être lue : `ls "app/[lang]/blog/"`.

### 4.3 Worker Cloudflare — routage actuel

Fichier : `cloudflare-worker/src/index.js`

Aujourd'hui (post-Phase 0.7, déployé le 18/04) :
- `/` → 301 → `/fr`
- `/fr/*` → Next.js
- `/en/*` → Next.js
- `/blog/<slug>` → Webflow **sauf** si slug dans `NEXTJS_BLOG_SLUGS` (12 slugs statiques)
- `/blog/<slug-en>` dans `BLOG_EN_REDIRECTS` → 301 vers `/en/blog/<slug-en>`
- `/guide/<slug>` → Webflow
- `/fr/guide/<slug>` → Next.js (template lit encore Webflow API — cf. bug cross-session)
- `/en/guide/<slug>` → Webflow **sauf** si slug dans `GUIDE_EN_REDIRECTS` (3 slugs)
- `/industry/*` catch-all → 301 `/en/industrie`
- `/secteur/*` catch-all → handlers variés (certains vers Next.js)
- `GONE_PATHS` : 345 entrées → 410 Gone
- `LEGACY_REDIRECTS` : ~80 entrées → 301

**Pour Phase 2, on ne touche PAS au Worker** (c'est Phase 3). Phase 2 travaille uniquement côté Next.js + deploy Vercel.

---

## 5. Fichiers clés du projet

### 5.1 Fichiers à MODIFIER en Phase 2

| Fichier | État actuel | Action Phase 2 |
|---|---|---|
| `lib/webflow.ts` | Version Phase 0.5/0.6 : mapping correct, supporte locale, alternates. **Utilisée** par `app/[lang]/blog/[slug]/page.tsx` et le listing. | À **garder tel quel** (utile pour future re-extraction ou fallback). Le template n'en dépendra plus. |
| `lib/webflow-guides.ts` | Version d'origine : pas de locale, mais mapping correct. **Utilisée** par `app/[lang]/guide/[slug]/page.tsx`. | Même traitement : garder en tant qu'historique, template ne dépend plus. |
| `lib/blog.ts` | Fusionne `STATIC_ARTICLES` (12) avec `getWebflowArticles()`. Ne filtre pas par langue. | **Refactor** : ajouter paramètre `lang`, remplacer `getWebflowArticles` par lecture `content/blog/<lang>/*.json`, préserver l'interface `Article` (statics compatibles) |
| `app/[lang]/blog/[slug]/page.tsx` | Proto complet validé (commit `65b6740`). Lit Webflow via `getWebflowArticle(slug, lang)`. | Remplacer par lecture `content/blog/<lang>/<slug>.json`. Ajouter `generateStaticParams`. Conserver toute la logique proto (FAQ, Schema, alternates, auteur, catégorie, breadcrumb). |
| `app/[lang]/blog/page.tsx` | Listing actuel : `getAllArticles(0)` mélange FR+EN (bug existant). Hero + grid + filtre catégorie. | Filtrer par lang, afficher 72 FR / 67 EN, préserver filtre catégorie. |
| `app/[lang]/guide/[slug]/page.tsx` | Lit Webflow. Correct fonctionnellement (mapping OK). | Remplacer source par `content/guides/<lang>/<slug>.json`. Ajouter `generateStaticParams`. |
| `app/[lang]/guide/page.tsx` | Listing FR uniquement actuellement (sitemap confirme 0 /en/guide/). | Adapter pour FR + EN (21 guides EN à publier). |
| `app/sitemap.ts` | Actuel 167 URLs : 12 static blog FR+EN + 22 guide FR uniquement. **PAS d'articles Webflow** (commentaire ligne 112 du code). | Étendre avec : 60 `/fr/blog/` + 55 `/en/blog/` + 22 `/fr/guide/` + 21 `/en/guide/` = **~331 URLs total**. Lire via `fs.readdirSync` de `content/`. |

### 5.2 Fichiers à créer en Phase 2

| Fichier | Rôle |
|---|---|
| `lib/content.ts` | Nouvelle source de vérité côté Next.js pour blog + guides. Fonctions : `getArticle(slug, lang)`, `getAllArticles(lang, limit?)`, `getAllArticleSlugs(lang)`, `getGuide(slug, lang)`, `getAllGuides(lang)`, `getAllGuideSlugs(lang)`, `getBlogAlternates(webflowItemId)`, `getGuideAlternates(webflowItemId)`. **Lit les JSON au build** via `fs/promises` + `path.join`. |

### 5.3 Fichiers à NE PAS TOUCHER

- `cloudflare-worker/src/index.js` (Phase 3)
- `app/[lang]/blog/<slug>/page.tsx` pour les 12 slugs statiques (ce sont des dossiers individuels)
- `next.config.ts` (redirections déjà gérées par Worker)
- `middleware.ts` (next-intl matcher, pas pertinent pour Phase 2)
- `content/**` (déjà généré, ne pas ré-éditer à la main — re-run le script si besoin)
- `public/images/{blog,guides}/**` (déjà téléchargé et converti)
- `scripts/extract-webflow-content.mjs` sauf si une règle business change
- Toutes les pages produit/industrie/etc. sans lien avec blog

### 5.4 Composants et helpers existants à réutiliser

- `components/blog/` :
  - `TableOfContents` : sommaire h2/h3 sticky sidebar
  - `ArticleCTA` : bloc CTA fin d'article (déjà dans le proto)
  - `RelatedArticles` : articles similaires (prend `currentSlug`, `category`, `lang`)
  - `BlogGrid` : grille pour le listing
  - Il y a aussi `components/blog/ComparisonTable.tsx` (hors scope Phase 2)
- `components/hero/` : `HeroSection` (compact, align, title JSX)
- `components/animations/` : `FadeInView`, `SmoothScroll`, `StaggerContainer`, `StaggerItem`, `AnimatedCounter`
- `components/seo/SchemaOrg.tsx` : exports `organizationSchema()`, `breadcrumbSchema(items)`, `articleSchema({...})`, et le composant `<SchemaOrg schema={[...]} />`
- `lib/blog-utils.ts` : `processHtmlContent(html)` → `{ processedHtml, wordCount, headings: HeadingData[] }`, `calculateReadingTime(wordCount)`, type `HeadingData`
- `lib/sanitize.ts` : `sanitizeHtml(html)` **no-op documenté** (jsdom incompatible Vercel, contenu contrôlé CMS)
- `@/i18n/routing` : `Link` (utiliser celui-là, **pas** `next/link`, pour préserver les liens locale-aware)
- `next-intl/server` : `getTranslations({ locale, namespace })`

---

## 6. Proto article pilote à reproduire

Le commit `65b6740` a validé le proto complet pour `app/[lang]/blog/[slug]/page.tsx`. Phase 2 doit **préserver** tous ces comportements en changeant uniquement la source de données.

### 6.1 Rendu attendu

Pour un article FR (`/fr/blog/quel-format-d-image-pour-le-web`) :
- `<title>` = `meta-titre` (ex: *"Formats d'image web : le guide pour la photographie produit"*)
- `<h1>` dans le HeroSection = `h1` / `titre-principal-h1-et-metatitre` (distinct du title dans 60/73 cas)
- Breadcrumb hero : `Accueil / Blog / E-commerce` (FR) ou `Home / Blog / E-commerce` (EN)
- Date formatée dans la locale (`toLocaleDateString`)
- Icon Clock + "X min de lecture" (utilise `readingTime` JSON si présent, sinon `calculateReadingTime(wordCount)`)
- Icon User + nom auteur si présent (fallback `Laurent Wainberg`)
- Image hero sous le hero (via `<img src={imageUrl}>` dans `<FadeInView>`)
- Contenu `dangerouslySetInnerHTML={{ __html: sanitizeHtml(processed.processedHtml) }}` dans `<article>` avec classes prose
- `<TableOfContents>` mobile (collapsible) + desktop (sticky sidebar)
- `<ArticleCTA lang={lang} />`
- `<RelatedArticles currentSlug={slug} category={category} lang={lang} />`
- Section FAQ (5 `<details>` accordion avec `ChevronRight` group-open rotate)
- `<SchemaOrg>` avec 4 schemas : Organization, BreadcrumbList, Article (author Person si nommé), FAQPage (si FAQs > 0)
- `<link rel="alternate" hreflang="fr">` + `hreflang="en">` **basés sur les vrais slugs** du `alternates.json` (pas une simple substitution)
- Canonical : `https://www.packshot-creator.com/{lang}/blog/{slug}`

### 6.2 Prose classes Tailwind pour le HTML Webflow

Définies dans le template actuel lignes 52-65 (CONSERVER tel quel) :
```js
const articleProseClasses = [
  'prose prose-lg max-w-none',
  'prose-headings:font-heading prose-headings:text-future-dusk-900',
  'prose-p:text-future-dusk-600 prose-p:leading-relaxed',
  'prose-li:text-future-dusk-600',
  'prose-strong:text-future-dusk-900',
  'prose-a:text-very-peri-600 hover:prose-a:text-very-peri-700',
  '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24',
  '[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-future-dusk-800 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24',
  '[&_blockquote]:border-l-4 [&_blockquote]:border-very-peri-500 [&_blockquote]:italic [&_blockquote]:pl-4 [&_blockquote]:text-future-dusk-500',
  '[&_:not(pre)>code]:bg-neutral-100 [&_:not(pre)>code]:rounded [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-sm',
  '[&_img]:rounded-lg [&_img]:shadow-sm [&_img]:my-8',
].join(' ');
```

### 6.3 i18n keys utilisées

Namespace `blogArticle` (dans `messages/fr.json` et `messages/en.json`) :
- `toc` : "Sommaire" / "Table of Contents"
- `readingTime` : "{minutes} min de lecture" / "{minutes} min read"
- `backToBlog` : "Retour au blog" / "Back to blog"
- `home` : "Accueil" / "Home"
- `defaultCategory` : "Article" (fallback si pas de category résolue)
- `faqHeading` : "Questions fréquentes" / "Frequently asked questions" (ajouté en Phase 0.6)
- `ctaHeading`, `ctaDescription`, `ctaDemo`, `ctaRoi`
- `relatedHeading`, `readArticle`

**Key retirée** : `webflowArchive` (le badge a été supprimé, ne pas le remettre).

### 6.4 Pièges du proto à connaître

- **`articleSchema({ author })`** : la fonction détecte `author !== 'PackshotCreator'` pour émettre un `Person` nommé. Donc passer `webflowArticle.author` (qui vaut `"Laurent Wainberg"`) fait bien émettre un Person complet.
- **Le hero `title` prop de `HeroSection` accepte du JSX**. Le breadcrumb est inclus dedans. C'est volontaire.
- **`RelatedArticles` prend `category` en string label**. Si null, fallback à "Articles similaires" sans filtre. Vérifier son comportement actuel si utilisé dans un contexte null.
- **`HeroSection compact` + `align="left"`** : layout serré pour les headers d'article.
- **L'image hero est rendue en dehors du HeroSection** (dans un `<FadeInView>` avec `-mt-6 relative z-10`), pas comme `backgroundImage`. C'est volontaire — le hero est sobre, l'image vient overlap par-dessous.

---

## 7. Pièges et cas particuliers

### 7.1 Staging Webflow == Prod Webflow

**Un seul site Webflow** dans l'organisation, `shortName=packshot-creator-staging`, qui est pointé par **tous** les custom domains (`www.packshot-creator.com`, `fr./de./es./nl.packshot-creator.com`, etc.). Il sert actuellement le blog/guides en prod via le Worker.

**Ne JAMAIS essayer de "débrancher le staging"** tant que Phase 3 n'est pas terminée. Le déconnecter = casser 47% du trafic organique.

Le vrai débranchement se fera après Phase 3 validée, via le dashboard Webflow (Settings → Hosting → unpublish), à la décision de Seb uniquement.

### 7.2 Slugs FR ≠ EN

**Tous** les slugs de guides FR diffèrent de leurs EN (21/21). 60/73 articles EN ont un `h1` différent du `name` (title). Corollaires :
- `alternates.languages` dans `generateMetadata` **doit** lire `content/blog/alternates.json` pour obtenir le slug de l'autre langue, pas substituer `fr`↔`en` dans l'URL.
- `getWebflowArticle` / `getArticle` **doit** prendre le paramètre `lang` pour chercher dans le bon index.

Exemple :
- FR : `/fr/blog/quel-format-d-image-pour-le-web`
- EN : `/en/blog/best-image-format-for-the-web`
- Même `webflowItemId` = `67dd331edc2f76e4765a968b` (présent dans chaque JSON)

### 7.3 Lecture des JSON — options

Deux stratégies possibles pour lire `content/` :

**A. Lecture synchrone au build (recommandé pour SSG)**
```ts
import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();
export function getArticle(slug: string, lang: 'fr' | 'en') {
  const file = path.join(ROOT, 'content/blog', lang, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
```

**B. Lecture async avec cache module-level**
```ts
import fs from 'node:fs/promises';
let cache: Map<string, MigratedArticle> | null = null;
async function loadAll() { /* ... */ }
```

L'option A est plus simple et fonctionne bien avec `generateStaticParams` + RSC. À préférer sauf raison forte.

### 7.4 `generateStaticParams` — critique pour Phase 2

Actuellement le template blog n'en a pas → Next.js rend chaque route à la demande. Pour Phase 2, on doit le **pré-générer au build** via `generateStaticParams` qui retourne `{ lang, slug }[]`.

```ts
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['fr', 'en'] as const) {
    const slugs = getAllArticleSlugs(lang);
    for (const slug of slugs) params.push({ lang, slug });
  }
  return params;
}
```

**Mais attention** : ce template `app/[lang]/blog/[slug]/page.tsx` est aussi touché par les 12 dossiers statiques. Les `generateStaticParams` du template dynamique doivent **exclure les 12 slugs statiques** pour éviter le conflit (le dossier statique prend la priorité, mais Next peut warner sur le chevauchement).

### 7.5 URLs encoding — non-breaking hyphen

Il existe UNE URL avec un caractère `U+2011` (non-breaking hyphen) : `/les-animations-nouvelles-cles-de-reussite-pour-vos-sites-e‑commerce`. Elle est :
- Gérée dans `GONE_PATHS` du Worker avec 3 variantes (Unicode, `%E2%80%91`, `%e2%80%91`)
- Marquée `unlink` dans le CSV v3
- Absente des 60 slugs à migrer (elle est dans GONE_PATHS non dans le corpus)

**Phase 2 n'a rien à faire de spécifique pour cette URL**, mais si un template affiche une URL avec ce caractère, faire attention à l'encoding (React ne l'encode pas automatiquement).

### 7.6 Le "listing bug" actuel

`app/[lang]/blog/page.tsx` appelle `getAllArticles(0)` de `lib/blog.ts` qui :
- Mélange FR+EN sans filtrage par langue
- Affiche les 12 statics correctement
- Affiche les articles Webflow mais avec description/image vides (même après fix Phase 0.5, car le listing utilisait la signature sans locale)

Phase 2 doit corriger **les deux** bugs : ajouter `lang` au filtre + lire depuis content local.

### 7.7 Le sitemap est silencieusement amputé

`app/sitemap.ts` ligne ~112 a un commentaire expliquant que les articles Webflow ne sont PAS inclus dans le sitemap live (ils retournaient `slug = undefined` avec le mapping buggé). Phase 2 doit supprimer ce commentaire et inclure les 158 nouvelles URLs.

Impact SEO : sitemap passe de 167 à ~331 URLs. GSC aura besoin d'une re-submission après Phase 3.

### 7.8 `sanitizeHtml` est un no-op documenté

`lib/sanitize.ts` retourne le HTML tel quel. La raison : `isomorphic-dompurify` / `jsdom` ne sont pas compatibles avec le runtime Vercel (`ERR_REQUIRE_ESM`). Le HTML vient du CMS Webflow, source contrôlée. **Ne pas essayer de le remplacer sans raison forte**.

### 7.9 `processHtmlContent` ne touche pas h1

`lib/blog-utils.ts`:`processHtmlContent()` traite les h2 et h3 (ajoute des IDs, alimente la ToC). Pas les h1. C'est voulu : le HTML Webflow n'a normalement pas de h1 (le h1 est dans le HeroSection). Si un article a un h1 dans son contenu, il sera affiché tel quel sans ID.

### 7.10 Le Worker a été redéployé le 18/04

Après réconciliation du WIP 16/04 (commit `4a322ed`) et ajout des 15 URLs legacy (`cbe99aa`) + fix encoding (`f2018f1`), le Worker a été déployé via `wrangler deploy`. Conséquence :
- Git HEAD = prod Worker = cohérent
- Prochains `wrangler deploy` partent du bon état

**Phase 2 ne déploie PAS le Worker**. Phase 3 le fera.

### 7.11 Guides `categorie-3` non résolu

Le champ `categorie-3` des guides est un ID (option) que le script d'extraction copie brut dans `categoryId` sans résoudre en label. Les 6 options existent dans le schéma CMS mais n'ont pas été mappées. Si le template guide listing doit filtrer par catégorie, Phase 2 devra :
- Soit ajouter un mapping dans `lib/content.ts`
- Soit résoudre côté script (re-run extract nécessaire)

À trancher avec Seb au début de Phase 2 — probablement minoritaire comme besoin.

### 7.12 Le template guide existant lit encore Webflow

`app/[lang]/guide/[slug]/page.tsx` (266 lignes) appelle `getWebflowGuide(slug)` de `lib/webflow-guides.ts`. Cette fonction **ne prend PAS de locale en paramètre**, donc sur `/en/guide/<slug-en>`, elle cherche dans la collection par défaut (FR) et retourne 404.

Ce bug est connu (doc V2 en parle). Phase 2 le résout en remplaçant par `getGuide(slug, lang)` de `lib/content.ts`.

### 7.13 L'article riche `photographie-de-produits-a-360-degres-en-interne`

Cet article (draft whitelisté, 14 images) est le meilleur test visuel pour Phase 2. Le charger sur preview doit afficher :
- 14 images `<img>` servies depuis `/images/blog/<fileId>.avif`
- ToC automatique h2/h3
- Breadcrumb avec catégorie résolue
- 5 FAQs
- Auteur Laurent Wainberg

### 7.14 `lib/blog.ts` exporte une interface `Article`

`Article = WebflowArticle | StaticArticle`. Cette union est consommée par le listing. Si on change la source, il faut :
- Soit créer un nouveau type `MigratedArticle` et faire `Article = MigratedArticle | StaticArticle`
- Soit faire que `MigratedArticle` satisfait `WebflowArticle` (elle devrait, c'est un superset)

Préserver la shape existante évite les régressions ailleurs.

### 7.15 Le guide EN `create-professional-360-animation-of-shoes` — MIGRÉ le 19/04

**Cas traité, résolu.** Commit `4393491`.

**Découverte** : malgré `isDraft: true` côté API Webflow, ce guide est **servi en prod** par Webflow (HTTP 200, `x-served-by: webflow`). Raison : `lastPublished` est non-null (`2025-06-23T10:14:09.011Z`). Webflow continue de servir la dernière version publiée d'un item jusqu'à une nouvelle publication du site, même si l'item a été repassé en draft côté CMS. Si on n'avait pas migré, Phase 3 aurait transformé cette URL live en 404.

**Règle générale à appliquer pour toute migration Webflow → Next.js** :
- `isDraft: true` + `lastPublished: null` → non servi en prod, safe à ignorer
- `isDraft: true` + `lastPublished: <date>` → **servi en prod**, à migrer via whitelist

Vérification exhaustive faite le 19/04 :
- 22 FR guides, 22 EN guides — 1 seul cas `draft-mais-live` (celui-ci)
- 80 FR blog, 80 EN blog non-archivés — **0 cas** `draft-mais-live`
- Aucun item archivé dans les collections
- Aucun published avec `lastPublished` null (aberration)

**Mécanisme mis en place dans `scripts/extract-webflow-content.mjs`** :
```js
const GUIDE_DRAFTS_TO_KEEP = new Set([
  'create-professional-360-animation-of-shoes',
]);
```
Filtres `mapGuideItem` et `filterGuide` respectent la whitelist comme pour `DRAFTS_TO_KEEP` côté blog.

**État corpus après migration** :
- `content/guides/en/create-professional-360-animation-of-shoes.json` créé (9 étapes, 5 FAQs, 10 images, toutes dédupliquées avec FR via `fileId` partagés)
- `content/guides/alternates.json` mis à jour : paire complète pour l'itemId `67ee891719af08cfa4ebfacf`
- Bénéfice SEO collatéral : 5 JSON (2 blog + 3 guides) ont eu leurs liens internes vers ce slug EN restaurés (auparavant unlinkés)

---

## 8. Plan Phase 2 détaillé

Ordre recommandé. Commit entre chaque étape. Push après chaque commit. Valider sur preview `sysnext.vercel.app` avant de passer au suivant.

### Étape 1 — `lib/content.ts` (fondation)

Créer le module qui expose toutes les données. Aucune modif de template à ce stade.

Fonctions à fournir :
```ts
// Blog
export function getArticle(slug: string, lang: 'fr' | 'en'): MigratedArticle | null
export function getAllArticles(lang: 'fr' | 'en'): MigratedArticle[]
export function getAllArticleSlugs(lang: 'fr' | 'en'): string[]
export function getBlogAlternates(webflowItemId: string): { fr: string | null, en: string | null }

// Guides
export function getGuide(slug: string, lang: 'fr' | 'en'): MigratedGuide | null
export function getAllGuides(lang: 'fr' | 'en'): MigratedGuide[]
export function getAllGuideSlugs(lang: 'fr' | 'en'): string[]
export function getGuideAlternates(webflowItemId: string): { fr: string | null, en: string | null }
```

Et les interfaces `MigratedArticle`, `MigratedGuide` exportées (cf. §2.3 et §2.4).

Implémentation : lecture sync de fichiers via `fs.readFileSync` au build. Cache module-level optionnel (pas obligatoire, Next.js cache de toute façon les RSC).

Valider : importer dans un petit test ou juste checker que `npm run build` passe sans erreur.

Commit : `feat(content): lib/content.ts — source locale pour blog et guides migrés`.

### Étape 2 — `app/[lang]/blog/[slug]/page.tsx`

Remplacer les imports `getWebflowArticle, getArticleAlternates` par `getArticle, getBlogAlternates`.

Ajouter `generateStaticParams` en excluant les 12 slugs statiques (intersection avec `STATIC_ARTICLES`). Exemple de logique :
```ts
const STATIC_SLUGS = new Set([/* 12 slugs — importer de lib/blog */]);
export async function generateStaticParams() {
  const out = [];
  for (const lang of ['fr', 'en'] as const) {
    for (const slug of getAllArticleSlugs(lang)) {
      if (!STATIC_SLUGS.has(slug)) out.push({ lang, slug });
    }
  }
  return out;
}
```

Adapter le reste pour utiliser `MigratedArticle` :
- `webflowArticle.content` reste la même shape
- `webflowArticle.h1`, `webflowArticle.metaTitle`, `webflowArticle.author`, `webflowArticle.readingTime`, `webflowArticle.faqs` — même shape que le proto
- **Changement crucial** : `webflowArticle.image` est maintenant un path local `/images/blog/<fileId>.avif` (pas une URL CDN). Le `<img src={imageUrl}>` continue de marcher puisque Next.js sert statiquement `public/`.

`alternates.languages` : utiliser `getBlogAlternates(webflowArticle.webflowItemId)` pour émettre les slugs distincts (déjà fait en Phase 0.6, mais avec l'API — maintenant avec les JSON).

Tester :
- `/fr/blog/quel-format-d-image-pour-le-web` → 200, image `/images/blog/67dd2ff...avif` visible
- `/en/blog/best-image-format-for-the-web` → 200, contenu EN
- `/fr/blog/oscaro-com-...` (FR-only) → 200, sans hreflang EN
- `/fr/blog/photographie-de-produits-a-360-degres-en-interne` (draft riche) → 200, 14 images

Commit : `feat(blog): template article lit depuis content/ au lieu de Webflow API`.

### Étape 3 — `app/[lang]/guide/[slug]/page.tsx`

Similaire à l'étape 2 mais pour les guides.

Préserver les patterns guides existants (Schema.org HowTo, FAQ, 10 étapes, etc.). Le guide est déjà fonctionnel via API — on change juste la source.

`generateStaticParams` : lister les 22 FR + 21 EN slugs. Pas de statics à exclure ici (tous les guides viennent de Webflow).

Tester :
- `/fr/guide/quel-equipement-choisir-pour-photo-bijoux` → 200 avec image locale
- `/en/guide/which-equipment-to-choose-for-jewelry-photo` → 200
- `/fr/guide/realiser-animation-360-professionnelle-chaussures` (FR-only) → 200, sans hreflang EN

Commit : `feat(guide): template guide lit depuis content/ au lieu de Webflow API`.

### Étape 4 — `lib/blog.ts` refactor

Modifier pour que `getAllArticles(lang, limit?)` prenne la lang en paramètre et combine `STATIC_ARTICLES` filtrés + `getAllArticles(lang)` du content.

**Attention** : `STATIC_ARTICLES` est FR-centré pour le moment (titres/descriptions en français). Vérifier combien de dossiers `app/[lang]/blog/<slug>` existent en EN. Si les 12 statics ont bien leurs traductions EN, filtrer par dossier existant. Sinon, ce sera 12 statics FR uniquement, + ce que les statics ont en EN (à inventorier).

La shape `Article = MigratedArticle | StaticArticle` à maintenir pour compatibilité.

Commit : `feat(blog): lib/blog.ts supporte lang, combine statics + content migré`.

### Étape 5 — `app/[lang]/blog/page.tsx` (listing)

Remplacer `getAllArticles(0)` par `getAllArticles(lang, 0)`.

Tests attendus :
- `/fr/blog` : ~72 articles (12 statics + 60 migrés)
- `/en/blog` : ~67 articles (12 statics EN si existants + 55 migrés)
- Filtres par catégorie fonctionnent
- Hero article (premier) s'affiche avec image locale

Commit : `feat(blog): listing filtré par langue, articles migrés inclus`.

### Étape 6 — `app/[lang]/guide/page.tsx` (listing)

Idem pour guides :
- `/fr/guide` : 22 guides
- `/en/guide` : 21 guides (nouveau — actuellement pas dans le sitemap)

Commit : `feat(guide): listing filtré par langue, 21 guides EN exposés`.

### Étape 7 — `app/sitemap.ts`

Supprimer le commentaire "Webflow articles exclus". Itérer `content/blog/<lang>/*.json` et `content/guides/<lang>/*.json` pour générer les URLs.

Résultat attendu : sitemap passe à ~331 URLs. Tester avec `curl https://sysnext.vercel.app/sitemap.xml | xmllint --xpath "count(//*[local-name()='url'])" -`.

Commit : `feat(sitemap): inclure les 158 articles/guides migrés (~331 URLs)`.

### Étape 8 — Validation finale preview

- [ ] Les 10 articles du top trafic GSC s'affichent correctement (cf. liste §12.8)
- [ ] Les 3 drafts whitelistés s'affichent
- [ ] Les 5 articles FR-only n'ont pas de hreflang EN
- [ ] Le guide FR-only idem
- [ ] Images locales partout (search `cdn.prod.website-files.com` dans le HTML servi → 0 occurrences pour les articles migrés)
- [ ] Schema.org FAQPage présent sur articles avec FAQs
- [ ] Core Web Vitals acceptables (LCP, CLS, INP) — test Lighthouse sur 2-3 articles
- [ ] Sitemap valide XML, ~331 URLs

Commit global (si rien n'a été committé) + push + validation preview.

---

## 9. Critères de validation

### 9.1 Fonctionnel

- [ ] 60 articles FR accessibles `/fr/blog/<slug>` sans Webflow API en fond (vérifier logs dev)
- [ ] 55 articles EN accessibles `/en/blog/<slug>`
- [ ] 22 guides FR + 21 guides EN accessibles
- [ ] Les 12 articles statiques toujours fonctionnels (pas cassés par le refactor)
- [ ] Listings blog et guides filtrent par lang et affichent tout
- [ ] FAQ rendue avec Schema.org
- [ ] Hreflang alternates EN↔FR corrects pour les articles appairés
- [ ] Hreflang absent pour 5 articles FR-only et 1 guide FR-only

### 9.2 Technique

- [ ] `npm run build` passe sans warning nouveau
- [ ] Temps de build acceptable (pas d'explosion due au file I/O)
- [ ] Pas d'appel à `api.webflow.com` dans les templates (grep pour vérifier)
- [ ] `generateStaticParams` génère ~158 routes dynamiques + 24 statiques
- [ ] Sitemap valide à ~331 URLs
- [ ] Les fichiers JSON content ne sont pas dans le bundle client (doivent rester server-side)

### 9.3 SEO

- [ ] Canonical URL correct sur chaque page
- [ ] `<title>` = `metaTitle` (avec fallback `title`)
- [ ] `<h1>` = `h1` (distinct de title dans 60/73 cas EN)
- [ ] Schema.org Article + Organization + BreadcrumbList + FAQPage
- [ ] OpenGraph avec image locale
- [ ] Pas de régression Lighthouse score sur un article témoin

### 9.4 Non-régression

- [ ] La home `/fr` et `/en` fonctionnent
- [ ] Les pages industrie, studio-photo, academy, etc. pas impactées
- [ ] Le calculateur ROI toujours OK
- [ ] `/fr/outil-financement` toujours OK (page standalone)
- [ ] Worker Cloudflare non modifié (git diff cloudflare-worker/ = vide)

---

## 10. Plan Phase 3 qui suivra

Pour mémoire — ne PAS l'exécuter en Phase 2.

### 10.1 Objectif Phase 3

Basculer le Worker pour que le blog + guides soient servis par Next.js (et non plus par Webflow). C'est le moment où la prod `www.packshot-creator.com/blog/<slug-fr>` commence à renvoyer le nouveau design.

### 10.2 Modifications Worker à prévoir

Fichier `cloudflare-worker/src/index.js` :

1. Ajouter **301 `/blog/<slug-fr>` → `/fr/blog/<slug-fr>`** pour chaque slug FR migré (60 slugs). Préserver `BLOG_EN_REDIRECTS` tel quel (déjà géré).
2. Ajouter **301 `/guide/<slug-fr>` → `/fr/guide/<slug-fr>`** (22 slugs). Préserver `GUIDE_EN_REDIRECTS`.
3. Modifier `isWebflowContent(pathname)` pour NE PLUS router vers Webflow (retourner `false` systématiquement pour blog+guide).
4. Supprimer les handlers Webflow proxy pour `/blog/*` et `/guide/*`.
5. Laisser `GONE_PATHS`, `LEGACY_REDIRECTS` intacts.

### 10.3 Basculement progressif recommandé

Déploiement en 3 vagues :
- Vague 1 : 10 articles à plus faible trafic (validation qualitative)
- Vague 2 : 40 articles mid-trafic
- Vague 3 : top 20 (les plus critiques)

Test après chaque vague avec `curl -sI` pour vérifier le status 200 + `x-vercel-id` (confirme que c'est Next.js qui répond, pas Webflow).

### 10.4 Validation SEO (Phase 4)

Après Phase 3 complète :
- Soumission du nouveau sitemap dans GSC
- Demande de validation GSC pour le rapport "Introuvable (404)"
- Inspection URL sur 5-10 articles top
- Monitor impressions/clics pendant 2 semaines

### 10.5 Débranchement Webflow

Seulement après Phase 4 validée (rankings préservés). Action manuelle côté Seb via dashboard Webflow → Project Settings → Hosting → Unpublish.

---

## 11. Règles de fonctionnement

### 11.1 Règles générales (validées par Seb, mémoire)

- **Travailler en profondeur**, pas en surface. Pas sauter d'étapes par facilité.
- **Vérifier avant d'affirmer**. Tester chaque point technique. Chrome + API + code doivent se recouper.
- **Ne JAMAIS modifier la mission sans demander**. Poser la question si pas clair.
- **Ne pas lancer le dev server local sans demander**.
- **URL de test** : `sysnext.vercel.app` (preview), PAS `packshot-creator.com` (prod).
- **Pas de vocabulaire suggérant conscience/intentions/états mentaux chez Claude**.
- **Benchmark transversal avant fix** : la "référence" voisine doit être validée par rapport au reste du projet, pas juste à la cible cassée.
- **Seb ne rédige pas de copywriting français commercial final via Claude** : Claude produit structures/matière, Seb rédige.
- **À chaque tâche** : analyser ce qui est possible sans Seb vs avec, demander accès manquants, prendre TOUT ce qui est techniquement possible.
- **Seb ne donne jamais d'instructions gratuites** : une formulation laxe = marge DANS le cadre, pas flou.
- **Images non utilisées** = reliquats ancien layout, ne pas auditer ni recycler.

### 11.2 Règles techniques

- **JAMAIS utiliser le CLI Vercel** — déploiement via dashboard sysnext uniquement.
- **Wrangler OK** pour le Worker (CLI standard Cloudflare).
- **Commits séparés par phase logique** avec messages descriptifs.
- **Push direct sur main autorisé** (permission validée). Pas de PR requise pour ce repo.
- **Pas de `--no-verify`** ni de skip hooks sans demande explicite.
- **Le Worker est le SEUL endroit** pour gérer les 301 non-lang. `next.config.ts` ne les voit jamais.
- **Le contenu textuel des articles NE DOIT PAS être réécrit** par Claude. On migre humain tel quel.
- **`type="button"`** toujours sur les `<Button>` dans un form (règle projet).

### 11.3 Mémoire

Ordre de priorité en cas de conflit :
1. État actuel du code (git, Read) → vérité absolue
2. Mémoire intégrée Claude Code `memory/` → faits et décisions
3. MemPalace (MCP) → historique profond des sessions anciennes

Avant d'agir sur un souvenir mémoire, vérifier l'état actuel du code. Si contradiction, le code prime.

### 11.4 Scope à ne pas élargir

- **Pas de pages légales** (CGU, confidentialité, mentions) — exclues du scope migration.
- **Pas de Defense** hors Safran (décision prise en session pilote).
- **Pas de rédaction IA** des articles migrés.

---

## 12. Environnement et commandes utiles

### 12.1 Contexte session

- Machine : macOS (Darwin 25.3.0), shell zsh
- Node : supportant `--env-file=.env.local`
- `sharp@^0.34.5`, `jspdf@^4.0.0`, `next-intl`, TypeScript ^5
- ffmpeg installé via Homebrew (`/opt/homebrew/bin/ffmpeg`)
- `.env.local` contient les clés Webflow :
  ```
  WEBFLOW_API_KEY=...
  WEBFLOW_SITE_ID=6682a557f105555299d5aeae
  WEBFLOW_BLOG_COLLECTION_ID=6685662bd0d7d8a6212d90c4
  WEBFLOW_GUIDE_COLLECTION_ID=66f2cb08d65bdab9b9190401
  ```
  Utiliser `set -a && source .env.local && set +a` ou `node --env-file=.env.local`.

### 12.2 Commandes fréquentes

```bash
# Working directory
cd "/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator"

# Build
npm run build

# Re-run extraction (idempotent, skip si images déjà téléchargées)
node --env-file=.env.local scripts/extract-webflow-content.mjs

# Deploy Worker (si Phase 3)
cd cloudflare-worker && npx wrangler deploy

# Test preview URL
curl -sI https://sysnext.vercel.app/fr/blog/quel-format-d-image-pour-le-web

# Test assets
curl -sI https://sysnext.vercel.app/images/blog/67dd2ff25622e5086d8a6d85.avif
```

### 12.3 Webflow API — champs réels articles

Collection BLOG (`6685662bd0d7d8a6212d90c4`), champs `fieldData` :
```
name, slug, contenu, image-principale {fileId, url, alt}, date,
categorie (Option id), auteur (Option id), meta-titre, meta-description,
titre-principal-h1-et-metatitre, temps-de-lecture (number),
faq---question-1..5, faq---reponse-1..5,
article-du-jour (boolean)
```

### 12.4 Webflow API — champs réels guides

Collection GUIDES (`66f2cb08d65bdab9b9190401`) :
```
name, slug, image-principale, meta-titre, meta-description,
titre-principal, texte-introduction, premiere-image-video,
categorie-3 (Option id), champ-duree, champ-outil, champ-logistique,
titre-etape-1..10, texte-etape-1..10, image-etape-1..10,
texte-etape-1..6---donnees-structurees-2  (N=1..6 seulement, pas 10),
question-1..5---faq, reponse-1..5---faq
```

### 12.5 Webflow cmsLocaleId

- FR (primary) : pas de param (default)
- EN : `672e1f1758256ef525dbc4c7`
- DE `672e2272f83ff47bc96e92f2`, ES `672e2272f83ff47bc96e92f3`, NL `672e2272f83ff47bc96e92f4` — existent mais **PAS migrés** (trafic historique abandonné)

### 12.6 Catégories blog (4 valeurs, labels résolus)

```js
{
  '5f78e051722c291d8cbf5ec9fea26fc5': { fr: 'Actualités', en: 'News' },
  '104a291d655dd1b3985ecb9a34c0df8a': { fr: 'E-commerce', en: 'E-commerce' },
  '21dbdefef81c6afd88ac0fb6b4a61478': { fr: 'Produits', en: 'Products' },
  'a0975835d398d479f43208215ebfea18': { fr: 'Innovations', en: 'Innovations' },
}
```

### 12.7 Auteurs (1 seul)

```js
{ '1ee1af407b1304f8ec54d409bf4544ab': 'Laurent Wainberg' }
```

### 12.8 Top 10 articles par trafic GSC (3 mois au 16/04)

Priorité pour les tests visuels :
1. `/blog/quel-format-d-image-pour-le-web` — 200 clics / 31k imp.
2. `/blog/materiel-photo-guide-photographie-packshot` — 148 / 16k
3. `/blog/guide-photographie-packshot-pourquoi-faire-packshots` — 147 / 22k
4. `/blog/comment-choisir-objectif-en-photographie-packshot` — 85 / 6k
5. `/en/blog/how-to-choose-best-lens-for-product-photography` — 79 / 27k
6. `/en/blog/packshot-photography-guide-why-make-product-packshots` — 73 / 32k
7. `/blog/comment-avoir-meilleures-images-amazon` — 68 / 4k
8. `/en/blog/8-steps-to-professional-jewelry-photography` — 60 / 7k
9. `/en/blog/tips-photo-framing-composition` — 57 / 9k
10. `/en/blog/best-image-format-for-the-web` — 32 / 35k (CTR à améliorer en Phase 5)

Top 5 guides :
1. `/en/guide/which-equipment-to-choose-for-jewelry-photo` — 138 / 17k
2. `/guide/quel-equipement-choisir-pour-photo-bijoux` — 119 / 4k
3. `/guide/modifier-couleur-produit-photo` — 77 / 3k
4. `/en/guide/what-settings-to-photograph-jewelry` — 57 / 18k

---

## 13. Annexes

### A. Historique des commits de la migration

```
55feeba fix(extraction): prefix guides images /images/guides au lieu de /images/guide
58197bf feat(assets): 476 images migrées de Webflow (AVIF + MP4)
56d4bc3 feat(content): 158 articles+guides extraits de Webflow
b563faa feat(migration): script d'extraction Webflow → JSON + assets locaux
964e724 docs(migration): CSV v3 mapping fr.packshot-creator.com
f2018f1 fix(worker): ajouter variantes URL-encoded pour le non-breaking hyphen
cbe99aa fix(worker): 15 landing legacy fr.packshot-creator → 410 Gone
4a322ed chore(worker): commiter le nettoyage 404/410 du 16/04 (déjà déployé)
65b6740 feat(blog): proto article complet avant industrialisation
b647a8f fix(blog): masquer les IDs de réf Webflow non résolus (catégorie, auteur)
70c5d0b fix(blog): corriger le mapping Webflow et le support de la locale EN
ef57c19 fix: déplacer outil-financement sous [lang] pour URL /fr/outil-financement
43cf530 feat: restaurer comparateur financement leasing/prêt/achat sur /outil-financement
```

### B. CSV fr-subdomain-mapping-v3

`sessions/fr-subdomain-mapping-v3.csv` contient 56 lignes avec colonnes :
- `legacy_path` : chemin sur `fr.packshot-creator.com`
- `occurrences` : nombre d'occurrences dans le corpus
- `action` : `rewrite` ou `unlink`
- `target` : cible si rewrite (relative sans préfixe lang)
- `reason` : `blog-match`, `guide-match`, `nextjs-redirect`, `nextjs-page-direct`, `410-gone`

**Phase 2 n'a pas besoin de ce CSV** — les décisions sont déjà appliquées dans le HTML `content`. Mais si on doit re-run le script d'extraction (ex. nouveau article publié), le CSV reste la référence.

### C. `NEXTJS_BLOG_SLUGS` du Worker (12 slugs statiques)

Cf. fichier `cloudflare-worker/src/index.js` ligne ~20 ou importer la liste depuis `lib/blog.ts`.

### D. `BLOG_EN_REDIRECTS` du Worker (33 slugs)

Liste dans `cloudflare-worker/src/index.js` (WIP committé dans `4a322ed`). Ces slugs EN sont redirigés de `/blog/<slug>` → `/en/blog/<slug>`. À préserver.

### E. `GUIDE_EN_REDIRECTS` du Worker (3 slugs)

- `create-professional-360-animation-of-shoes`
- `how-to-do-focus-stacking-for-ring-photography`
- `how-to-take-multi-angle-photos-of-shoes`

⚠️ Le premier (`create-professional-360-animation-of-shoes`) est le **draft EN** du guide FR `realiser-animation-360-professionnelle-chaussures`. Il n'est PAS dans le corpus migré. Cf. §7.15 pour décision à prendre.

### F. Mémoires Claude utiles

Fichiers dans `~/.claude/projects/-Users-photodif-Documents-SYSNEXT-SITE-WEB/memory/` :
- `user_seb.md` — Seb Ducros, dirigeant PackshotCreator
- `feedback_vercel_project.md` — Jamais de CLI Vercel
- `feedback_work_method.md` — Profondeur, pas survoler
- `feedback_images_approach.md` — AVIF, pas d'images inutiles
- `project_blog_migration_plan.md` — Plan migration (ce doc le détaille)
- `project_migration_live_status.md` — État prod post-16/04

### G. Décisions en attente au début Phase 2 — TRANCHÉES le 19/04

1. **Guide EN draft** `create-professional-360-animation-of-shoes` → **MIGRÉ** (commit `4393491`). Cf. §7.15. Motif : URL live en prod via Webflow malgré `isDraft: true`.
2. **Résolution `categorie-3` guides** → **non, pas nécessaire Phase 2**. Le listing guide actuel (`app/[lang]/guide/page.tsx`) n'utilise aucune catégorie (pas de filtre, pas de tri, pas de badge). À rediscuter Phase 5 si un filtre SEO devient pertinent.
3. **Composant `RelatedArticles` côté guides** → **n'existe pas, pas ajouté Phase 2**. Amélioration fonctionnelle hors scope « changer la source sans casser ». À rediscuter Phase 5.
4. **Traductions EN manquantes dans `STATIC_ARTICLES`** → **status quo accepté**. Inventaire : sur les 12 articles statiques, **4** ont un namespace i18n complet FR+EN (`blogBudget`, `blogStudioIa`, `blogPrestataire`, `blogComparatif`), **8** ont leurs metas hardcodées en français dans le `page.tsx`. Sur `/en/blog/<slug>` ces 8 servent le contenu FR — dégradation SEO EN connue, hors scope Phase 2. Les 12 apparaissent dans le listing FR **ET** EN (cohérent avec le routing Worker + `[lang]` dynamique). À rediscuter Phase 5.

### G.bis — Bug collatéral découvert et qui sera corrigé par le refactor

`app/[lang]/guide/[slug]/page.tsx` ligne ~32 émet des `alternates.languages` avec le **même slug** pour fr et en :
```ts
languages: { fr: `/fr/guide/${slug}`, en: `/en/guide/${slug}` }
```
Or **21 slugs FR sur 22 diffèrent de leur EN** (et 22/22 après migration du draft). Le refactor étape 3 (template guide lit `content/`) corrigera ce bug SEO automatiquement en passant par `getGuideAlternates(webflowItemId)`.

### H. Fichiers dossier sessions/

- `PROMPT_SESSION_MIGRATION_BLOG.md` — le prompt V2 qui a lancé cette migration (lire avant de commencer si doute)
- `fr-subdomain-mapping-v3.csv` — le mapping final
- `extract-report.json` — dernier rapport d'extraction
- `PROMPT_MIGRATION_BLOG_PHASE2.md` — **ce document**

---

## Derniers mots

Phase 2 est du refactor ciblé — pas de nouveaux concepts à inventer, tout est déjà décidé et préparé. Le risque principal est d'oublier un détail du proto (FAQ, alternates distincts, badge retiré, classes prose, i18n keys) en basculant la source.

**Avant de coder** : relire §6 (proto pilote) et §7 (pièges). Faire un `git log --oneline` pour voir les derniers commits. Ouvrir `content/blog/fr/quel-format-d-image-pour-le-web.json` pour avoir la shape sous les yeux.

**Test témoin principal** : `/fr/blog/quel-format-d-image-pour-le-web` — doit rendre identique à la preview Phase 0.6 mais **sans aucun appel Webflow**.

Bon travail.

---

*Document rédigé le 2026-04-19 à la fin de la session Phase 1. Auteur : Claude Opus 4.7 (1M context) pour Seb Ducros.*
