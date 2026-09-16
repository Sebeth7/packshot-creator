# 04 — Les surfaces SEO

Quel fichier pilote quelle sortie. À consulter **avant** de chercher dans le
code : la plupart des sorties SEO de ce site sont centralisées, et la tentation
de les modifier page par page produit des divergences.

---

## Tableau de correspondance

| Sortie SEO | Fichier qui la pilote | Zone |
|---|---|---|
| `<title>`, `<meta description>` | `generateMetadata` de chaque page (**46 fichiers**) + `messages/*.json` + les JSON d'articles | Verte |
| `<link rel="canonical">` | `generateMetadata`, via `alternates.canonical` | Verte |
| `<link rel="alternate" hreflang>` | **`lib/hreflang.ts`** → `buildLanguages`, appelé dans chaque `generateMetadata` | Verte |
| `<meta robots>` (noindex) | **`lib/seo-config.ts`** (sets `NOINDEX_EN_*`), lu par 4 gabarits de page | Verte |
| `sitemap.xml` | **`app/sitemap.ts`** | Verte |
| `robots.txt` | **`public/robots.txt`** (fichier statique) | Verte |
| `llms.txt` | **`public/llms.txt`** (fichier statique) | Verte |
| JSON-LD (Organization, Product, Offer, FAQPage, ItemList) | **`components/seo/SchemaOrg.tsx`** | Verte |
| Correspondances entre langues | `content/blog/alternates.json` (61), `content/guides/alternates.json` (22) | Verte |
| Sélecteur de langue | **`i18n/deChCoverage.ts`** → `localeSwitchHref` | Verte |
| Couverture `de-ch` | `i18n/deChCoverage.ts` | Verte |
| Maillage interne (tunnels, hubs) | **`data/content-maillage.ts`** + `components/maillage/MaillageSections.tsx` | Verte |
| Liens de navigation, footer | `components/layout/Footer.tsx`, `Header.tsx`, `NavLink.tsx` | Verte |
| Redirections avec préfixe de langue | `next.config.ts`, bloc `redirects()` | Verte |
| Redirections sans préfixe, legacy, sous-domaines | **`cloudflare-worker/src/index.js`** | Verte, avec resync |
| Contenu des pages secteurs | `data/secteurs.ts`, `secteurs-de-ch.ts` | Verte |
| Rattachement secteur ↔ machine | `data/sector-machine-map.ts`, `sector-related-map.ts` | Verte |
| Routage de locale | `i18n/routing.ts`, `middleware.ts` | **Rouge** |
| Optimisation d'images | `next.config.ts`, bloc `images` | **Rouge** |

---

## Les cinq règles de structure

### 1. Le hreflang est centralisé — ne le pose jamais à la main

`lib/hreflang.ts` expose `buildLanguages(frPath, {en, deCh})`. Toutes les pages
passent par là.

| Annotation | Cible | Logique |
|---|---|---|
| `fr` | `/fr/...` | France et francophonie générique |
| `fr-CH` | **la même URL `/fr`** | La page FR sert aussi la Suisse romande, sans dupliquer |
| `en` | `/en/...` | Uniquement si un équivalent anglais **indexable** existe |
| `de-CH` | `/de-ch/...` | Suisse **alémanique** seulement. Sans rapport avec `fr-CH` |
| `x-default` | `/fr` | — |

**Le piège** : passer `en` pour une page dont l'équivalent anglais est en
`noindex`. On déclare alors un alternate vers une page que Google ne doit pas
indexer. Vérifie `lib/seo-config.ts` avant de passer `en`.

`de-ch` s'omet si la page n'a pas d'équivalent — et l'équivalent doit être
réellement prérendu, sinon c'est un 404 (piège C3).

### 2. Le `noindex` est centralisé — quatre sets, sept lecteurs

`lib/seo-config.ts` :

| Set | Contenu | Volume |
|---|---|---|
| `NOINDEX_EN_BLOG_SLUGS` | Articles `/en` servant du contenu français | 11 |
| `NOINDEX_EN_INDUSTRIE_SLUGS` | Hubs secteurs `/en` monolingues français | 17 |
| `NOINDEX_EN_ACADEMY_SLUGS` | Fiches formation `/en` | 6 |
| `NOINDEX_EN_SOLUTIONS_SLUGS` | Pages solutions `/en` | 3 |

Lu par : `app/sitemap.ts`, `lib/blog.ts`, `i18n/deChCoverage.ts`, et les
gabarits `blog/[slug]`, `industrie/[slug]`, `academy/[slug]`,
`solutions/[slug]`.

**Un slug retiré d'un set réactive la page simultanément dans la balise robots,
le sitemap et le sélecteur de langue.** C'est le mécanisme de réactivation prévu
pour la traduction des 30 pages : traduire, puis retirer le slug.

Ces `noindex` sont **réversibles par conception**. Ils basculeraient en 301 seulement
si un export de backlinks révélait des liens externes entrants.

### 3. Le schema vit dans un seul composant

`components/seo/SchemaOrg.tsx` porte tous les types. Points d'attention connus :

● `productSchema` — le `price` au niveau `Offer` est une **mensualité de
  leasing** (prix comptant × 1,3 / 60 mois). Décision assumée du 04/09/2026
● `AggregateOffer` sur les pages de gamme
● Les `@id` sont partagés entre entités depuis la refonte du 08/05/2026 — ne
  pas les renuméroter
● Aucun schema ne se supprime sans arbitrage (garde-fou posé par Laurent)

### 4. Deux moteurs de redirection, une frontière nette

```
URL sans préfixe de langue        ──> Worker Cloudflare
URL avec /fr/ /en/ /de-ch/        ──> next.config.ts redirects()
```

Poser une redirection du mauvais côté de la frontière produit une règle morte
qui n'est jamais atteinte (piège E6). Le Worker s'exécute en premier et
court-circuite tout ce qui n'a pas de préfixe.

Le Worker porte aussi : les 410 (`GONE_PATHS`), les redirections legacy Webflow,
le routage des sous-domaines, la bascule `/de/*` → `/de-ch/*`, et la racine
`/` → `/fr`.

### 5. Le maillage interne a une structure nommée

`data/content-maillage.ts` :

● **Tunnels de conversion** — le chemin article → page commerciale
● **Hubs secteurs** — les points de convergence par marché

Le constat de l'audit du 03/09/2026 : les hubs reçoivent 163 liens entrants, les
fiches machines 28. Le footer ne contenait **aucun** lien vers une fiche machine
— une colonne « Nos studios » a été ajoutée dans la branche
`feat/audit-laurent-0309`, non mergée à ce jour.

---

## Les tests qui couvrent ces surfaces

| Spec Playwright | Ce qu'elle protège |
|---|---|
| `e2e/seo.spec.ts` | Statuts 200, metas, canonical, hreflang, JSON-LD sur ~37 pages |
| `e2e/internal-links-all.spec.ts` | Tous les liens internes répondent |
| `e2e/redirections.spec.ts` | Les redirections aboutissent |
| `e2e/language-switch.spec.ts` | Le sélecteur de langue |
| `e2e/anchors.spec.ts` | Les ancres |
| `e2e/cta-destinations.spec.ts` | Les CTA pointent au bon endroit |
| `e2e/external-links.spec.ts` | Les liens sortants |

**Quand tu touches une surface, ajoute ou étends la spec correspondante.** Le
test est ce qui empêche la régression de revenir dans six mois, quand personne
ne se souviendra pourquoi c'était comme ça.
