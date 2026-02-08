# S2a - RAPPORT : Landing SEOs (Bijoux, Mode, E-commerce)

**Date** : 8 fevrier 2026
**Modele** : Claude Opus 4.6
**Duree** : ~30 min
**Statut** : TERMINE

---

## Pages creees

| Page | URL FR | URL EN |
|------|--------|--------|
| Packshot Bijoux | `/fr/packshot-bijoux` | `/en/packshot-bijoux` |
| Packshot Mode | `/fr/packshot-mode` | `/en/packshot-mode` |
| Packshot E-commerce | `/fr/packshot-e-commerce` | `/en/packshot-e-commerce` |

### Structure de chaque page (6 sections)
1. **Hero** - gradient brandbook, H1 SEO optimise, badge secteur avec icone Lucide, 2 CTA
2. **Benefices** - 5 cards avec icones Lucide, grille responsive 3 colonnes
3. **Chiffres cles** - 3 stats en Very Peri bold
4. **Machines recommandees** - cards avec avantages depuis `machines.ts`
5. **FAQ** - 3 questions/reponses avec schema FAQPage
6. **CTA final** - gradient Very Peri, 2 boutons

---

## Machines recommandees par page

| Page | Machines |
|------|----------|
| Bijoux | Alphashot Micro Pro v2, Alphashot XL v2 |
| Mode | Alphashot XL v2, Alphadesk v2, Alphastudio XXL Pro v2 |
| E-commerce | Alphashot 360, Alphashot G2, Alphashot Micro Pro v2 |

---

## Cles de traduction ajoutees

### messages/fr.json & messages/en.json
- `packshotBijoux` : meta, hero, benefits (5 items), stats (3), machines, faq (3 Q/R), cta
- `packshotMode` : meta, hero, benefits (5 items), stats (3), machines, faq (3 Q/R), cta
- `packshotEcommerce` : meta, hero, benefits (5 items), stats (3), machines, faq (3 Q/R), cta

---

## Schemas JSON-LD

Chaque page inclut 3 schemas :
- `organizationSchema()` - schema Organisation PackshotCreator
- `breadcrumbSchema()` - fil d'Ariane (Accueil > Page)
- `faqSchema()` - FAQPage avec 3 questions/reponses

`faqSchema` existait deja dans `components/seo/SchemaOrg.tsx` - pas de modification necessaire.

---

## SEO

Chaque page dispose de :
- `generateMetadata()` avec title (< 60 chars), description (120-155 chars)
- `alternates.languages` (fr/en)
- `alternates.canonical` vers `https://www.packshot-creator.com/...`
- H1 unique et optimise pour le mot-cle cible
- OpenGraph title + description

---

## Decisions techniques

### Pathnames i18n
Le prompt demandait d'ajouter des pathnames dans `routing.ts` pour des URLs differentes en EN (ex: `/en/packshot-jewelry`).

**Decision** : NON implemente. Le routing actuel (`localePrefix: 'always'` sans `pathnames`) ne supporte pas de mapping par locale. Ajouter `pathnames` a `defineRouting` changerait le typage de `Link`, `redirect`, etc. dans tout le projet et casserait les pages existantes.

Les pages utilisent le meme slug FR pour les deux locales (`/en/packshot-bijoux`), coherent avec le pattern des pages industrie existantes. Le contenu est entierement localise via `next-intl`.

### Animations
Utilisation de `FadeInView`, `StaggerContainer`, `StaggerItem` depuis `@/components/animations` comme les pages existantes. Compatible `useReducedMotion`.

---

## Build

`npm run build` : OK (0 erreur, 0 warning TypeScript)
144 pages generees avec succes.

---

## Fichiers modifies/crees

### Crees
- `app/[lang]/packshot-bijoux/page.tsx`
- `app/[lang]/packshot-mode/page.tsx`
- `app/[lang]/packshot-e-commerce/page.tsx`

### Modifies
- `messages/fr.json` (+3 blocs de traduction)
- `messages/en.json` (+3 blocs de traduction)
