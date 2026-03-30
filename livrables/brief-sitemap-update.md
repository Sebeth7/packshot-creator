# Brief : Mise a jour complete du sitemap

> Ce document est un brief pour une session Claude Code dediee.
> Objectif : mettre a jour `app/sitemap.ts` pour qu'il reflète 100% des pages reelles du site.
> Date : 29 mars 2026

---

## Fichier a modifier

`app/sitemap.ts` — generateur de sitemap dynamique Next.js.

Le sitemap est genere au build/runtime par cette fonction qui combine :
- Des pages statiques hardcodees (`mainPages`)
- Des pages secteur generees depuis une constante `SECTORS`
- Des pages machine generees depuis une constante `MACHINES`
- Des articles blog dynamiques via `getAllArticles()` (Sanity + Webflow)
- Des guides dynamiques via `getWebflowGuides()` (Webflow)

---

## Problemes identifies (29 mars 2026)

### 1. SECTORS incomplet — 14 au lieu de 16

Le sitemap a :
```
chaussures, bijoux-joaillerie, mobilier-decoration, food-alimentaire,
cosmetiques-beaute, mode-textile, electronique-hightech,
pieces-techniques-industrie, automobile-pieces-detachees,
jouets-puericulture, sport-outdoor, sante-medical,
industrie-manufacturiere, defense-securite
```

Il manque (presents dans `data/secteurs.ts`) :
- `lunetterie`
- `vin-spiritueux`

**Source de verite** : `data/secteurs.ts` exporte un array `secteurs` avec 16 objets ayant chacun un `slug`.

**Fix recommande** : importer les slugs depuis data/secteurs.ts au lieu de les hardcoder :
```ts
import { secteurs } from '@/data/secteurs';
const SECTORS = secteurs.map(s => s.slug);
```

### 2. Pages SOLUTIONS absentes

3 pages `/solutions/[slug]` existent mais ne sont pas du tout dans le sitemap :
- `documentation-technique-visuelle`
- `documentation-qualite-produit`
- `documentation-probatoire`

**Source de verite** : `data/solutions.ts` exporte un array `solutions` avec 3 objets ayant chacun un `slug`.

**Fix** : ajouter une section solutions similaire aux secteurs :
```ts
import { solutions } from '@/data/solutions';
const solutionPages = solutions.flatMap((s) => [
  { path: `/fr/solutions/${s.slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
  { path: `/en/solutions/${s.slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
]);
```

### 3. Blog articles statiques absents

4 articles blog sont des pages statiques Next.js (pas du CMS), mais ne sont pas dans le sitemap :
- `budget-studio-photo-automatise`
- `prestataire-packshot-vs-studio-interne`
- `comparatif-orbitvu-ortery-styleshoots-2026`
- `studio-ia-vs-ia-generative`

**Source de verite** : dossiers dans `app/[lang]/blog/` (hors `[slug]`).

**Fix** : les ajouter dans mainPages, ou creer une section dediee.

### 4. Page `/calculateur` absente

`app/[lang]/calculateur/page.tsx` existe (ancien calculateur interne) mais n'est pas dans le sitemap. Verifier si c'est volontaire (noindex?) ou un oubli.

### 5. BUG CRITIQUE : 80 URLs `/blog/undefined`

Le sitemap genere 80 URLs du type `/fr/blog/undefined` et `/en/blog/undefined`.

**Cause** : `getAllArticles(0)` dans sitemap.ts appelle `getWebflowArticles()` qui retourne des items Webflow. Le champ `slug` de certains items Webflow est `undefined` (probablement des items non publies ou des drafts sans slug).

**Source du bug** dans `lib/webflow.ts` ligne 44 :
```ts
return data.items.map((item: any) => ({
  slug: item.slug,  // ← peut etre undefined si l'item n'a pas de slug
  ...
}));
```

Et dans `app/sitemap.ts` :
```ts
const articles = await getAllArticles(0);
blogPages = articles.flatMap((article) => [
  { path: `/fr/blog/${article.slug}`, ... },  // ← article.slug = undefined
  { path: `/en/blog/${article.slug}`, ... },
]);
```

**Fix** : filtrer les articles sans slug :
```ts
blogPages = articles
  .filter((article) => article.slug && article.slug !== 'undefined')
  .flatMap((article) => [
    { path: `/fr/blog/${article.slug}`, ... },
    { path: `/en/blog/${article.slug}`, ... },
  ]);
```

Meme fix a appliquer pour les guides :
```ts
guidePages = guides
  .filter((guide) => guide.slug)
  .flatMap((guide) => [
    { path: `/fr/guide/${guide.slug}`, ... },
    { path: `/en/guide/${guide.slug}`, ... },
  ]);
```

---

## Inventaire complet des pages attendues dans le sitemap

### Pages statiques (FR + EN = x2 chaque)

Toutes dans `mainPages`. Cocher = deja present. Ajouter les manquants.

| Page | Path FR | Present ? |
|---|---|---|
| Homepage | `/fr` | Oui |
| Studios photo | `/fr/studios-photo-automatises` | Oui |
| IA photo produit | `/fr/ia-photo-produit` | Oui |
| Academy hub | `/fr/academy` | Oui |
| Formations packshot | `/fr/academy/formations-packshot` | Oui |
| Formations IA | `/fr/academy/formations-ia` | Oui |
| Simulateur OPCO | `/fr/academy/simulateur-opco` | Oui |
| Calendrier | `/fr/academy/calendrier` | Oui |
| Industrie hub | `/fr/industrie` | Oui |
| Industrie defense | `/fr/industrie-defense` | Oui |
| Blog hub | `/fr/blog` | Oui |
| Guide hub | `/fr/guide` | Oui |
| Contact | `/fr/contact` | Oui |
| A propos | `/fr/a-propos` | Oui |
| Calculateur ROI | `/fr/calculateur-roi` | Oui |
| Selecteur machines | `/fr/studio-photo/selecteur-machines` | Oui |
| Packshot Amazon | `/fr/packshot-amazon` | Oui |
| Packshot Bijoux | `/fr/packshot-bijoux` | Oui |
| Packshot E-commerce | `/fr/packshot-e-commerce` | Oui |
| Packshot Industriel | `/fr/packshot-industriel` | Oui |
| Packshot Mode | `/fr/packshot-mode` | Oui |
| Besoins photo | `/fr/besoins-photographie-produit` | Oui |
| Questions cles | `/fr/questions-cles-photographie-produit` | Oui |
| CGU | `/fr/cgu` | Oui |
| Confidentialite | `/fr/confidentialite` | Oui |
| Mentions legales | `/fr/mentions-legales` | Oui |
| **Blog : budget studio** | **`/fr/blog/budget-studio-photo-automatise`** | **NON** |
| **Blog : prestataire vs interne** | **`/fr/blog/prestataire-packshot-vs-studio-interne`** | **NON** |
| **Blog : comparatif** | **`/fr/blog/comparatif-orbitvu-ortery-styleshoots-2026`** | **NON** |
| **Blog : studio IA vs generative** | **`/fr/blog/studio-ia-vs-ia-generative`** | **NON** |
| Calculateur interne | `/fr/calculateur` | **NON** (verifier si noindex voulu) |

### Pages dynamiques — Secteurs (FR + EN)

**Source de verite** : `data/secteurs.ts` → array `secteurs`, champ `slug`

16 slugs :
```
chaussures
bijoux-joaillerie
mobilier-decoration
food-alimentaire
cosmetiques-beaute
mode-textile
electronique-hightech
pieces-techniques-industrie
automobile-pieces-detachees
jouets-puericulture
sport-outdoor
sante-medical
industrie-manufacturiere
defense-securite
lunetterie              ← MANQUANT
vin-spiritueux          ← MANQUANT
```

### Pages dynamiques — Machines (FR + EN)

**Source de verite** : constante `MACHINES` dans sitemap.ts (OU `components/machine-selector/lib/machines.ts`)

16 slugs — tous presents :
```
alphashot-micro-v2, alphashot-360, alphashot-g2, alphashot-pro-g2,
alphashot-xl-v2, alphashot-xl-wine-v2, alphashot-xl-pro-v2,
alphadesk, alphatable, alphastudio-compact-v2, alphastudio-xxl-v2,
fashion-studio-basic, fashion-studio, bike-studio,
furniture-studio, e-comm-studio-plus
```

### Pages dynamiques — Solutions (FR + EN)

**Source de verite** : `data/solutions.ts` → array `solutions`, champ `slug`

3 slugs — **TOUS MANQUANTS** :
```
documentation-technique-visuelle
documentation-qualite-produit
documentation-probatoire
```

### Pages dynamiques — Blog (FR + EN)

**Source** : `getAllArticles(0)` combine Sanity + Webflow

Articles Sanity/Webflow connus au 29/03/2026 (slugs non-undefined) :
```
blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026
blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026
comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet
financement-formation-opco-guide-complet-pour-studios-photo-2026
formation-photo-produit-professionnelle-maitriser-studios-orbitvu-et-ia-en-2026
guide-achat-studio-2026
ia-photo-produit-guide-2026
orbitvu-vs-concurrents
test-mdx-configuration
```

**Note** : ces slugs changent dynamiquement selon le contenu CMS. Le sitemap les genere deja correctement SAUF le bug undefined.

### Pages dynamiques — Guides (FR + EN)

**Source** : `getWebflowGuides()` depuis Webflow API

22 guides connus au 29/03/2026 :
```
animation-360-focus-stacking
comment-creer-animation-360-avec-assistant-ia-orbitvu
comment-creer-video-360-objet-art
comment-creer-vues-multi-angles-automatique-objet
comment-faire-animation-360-objet-transparent
comment-faire-focus-stacking-pour-photographier-bague
comment-faire-focus-stacking-pour-photographier-bracelet
comment-faire-photos-multi-angles-chaussures
comment-faire-video-chaussures
comment-mettre-en-valeur-textures-produits-packshot
comment-nettoyer-montre-avant-shooting
comment-obtenir-couleurs-fideles-photographie-produit
comment-obtenir-fond-blanc-parfait-sans-detourage-produit
comment-photographier-lunettes-e-commerce
comment-positionner-montre-avant-shooting-photo
comment-prendre-photo-nette-bijoux-sans-fond
comment-sublimer-texture-rouge-a-levres-photo-avec-ia
modifier-couleur-produit-photo
quel-equipement-choisir-pour-photo-bijoux
quels-reglages-pour-photographier-bijoux
realiser-animation-360-professionnelle-chaussures
visuels-collection-produits-homogenes
```

**Note** : ces slugs changent dynamiquement. Le sitemap les genere deja correctement.

### Pages exclues du sitemap (volontairement)

| Page | Raison |
|---|---|
| `app/calculateur-roi/page.tsx` (standalone) | Duplique `/[lang]/calculateur-roi` — pas de prefixe langue, probablement un fallback |
| `app/studio/[[...tool]]/page.tsx` | Sanity Studio admin — ne doit PAS etre indexe |
| `app/[lang]/academy/[slug]/page.tsx` | Dynamique Sanity — les slugs ne sont pas connus a build time sans API call |

---

## Resume des modifications a faire

| # | Action | Fichier | Priorite |
|---|---|---|---|
| 1 | Ajouter `lunetterie` et `vin-spiritueux` a SECTORS | `app/sitemap.ts` | HAUTE |
| 2 | Ajouter section Solutions (3 pages) | `app/sitemap.ts` | HAUTE |
| 3 | Ajouter 4 articles blog statiques dans mainPages | `app/sitemap.ts` | HAUTE |
| 4 | Filtrer articles sans slug (fix bug undefined) | `app/sitemap.ts` | CRITIQUE |
| 5 | Filtrer guides sans slug (prevention) | `app/sitemap.ts` | MOYENNE |
| 6 | Verifier si `/calculateur` doit etre dans le sitemap | Question a poser a Seb | BASSE |

**Apres fix, le sitemap doit contenir :**
- 26 pages statiques FR + 26 EN = 52
- 16 secteurs FR + 16 EN = 32 (actuellement 28, +4)
- 16 machines FR + 16 EN = 32
- 3 solutions FR + 3 EN = 6 (actuellement 0, +6)
- 4 blog statiques FR + 4 EN = 8 (actuellement 0, +8)
- ~9 blog dynamiques FR + 9 EN = ~18
- ~22 guides FR + 22 EN = ~44
- **Total attendu : ~192 URLs valides** (actuellement 333 dont 160 undefined)

---

## Fichiers de reference

| Fichier | Role |
|---|---|
| `app/sitemap.ts` | Fichier a modifier |
| `data/secteurs.ts` | Source de verite secteurs (16 slugs) |
| `data/solutions.ts` | Source de verite solutions (3 slugs) |
| `components/machine-selector/lib/machines.ts` | Reference machines |
| `lib/blog.ts` | Aggregateur blog (Sanity + Webflow) |
| `lib/webflow.ts` | Fetch articles Webflow |
| `lib/sanity-blog.ts` | Fetch articles Sanity |
| `lib/webflow-guides.ts` | Fetch guides Webflow |
| `i18n/routing.ts` | Locales supportees : `['fr', 'en']` |

## Validation post-fix

1. `npm run build` — doit passer sans erreur
2. Demarrer le serveur et fetch `/sitemap.xml`
3. Verifier : 0 URL contenant "undefined"
4. Verifier : les 2 nouveaux secteurs sont presents
5. Verifier : les 3 solutions sont presentes
6. Verifier : les 4 articles blog statiques sont presents
7. Compter le total : devrait etre ~192 URLs (± articles CMS dynamiques)
