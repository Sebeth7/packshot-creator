# S2b - RAPPORT : Landing SEOs (Amazon, Industriel) + 2 nouveaux secteurs

**Date** : 8 fevrier 2026
**Modele** : Claude Opus 4.6
**Duree** : ~15 min
**Statut** : TERMINE

---

## Pages creees

| Page | URL FR | URL EN |
|------|--------|--------|
| Packshot Amazon | `/fr/packshot-amazon` | `/en/packshot-amazon` |
| Packshot Industriel | `/fr/packshot-industriel` | `/en/packshot-industriel` |

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
| Amazon | Alphashot 360, Alphashot G2 |
| Industriel | Alphashot XL v2, Alphashot Pro G2 |

---

## Cles de traduction ajoutees

### messages/fr.json & messages/en.json
- `packshotAmazon` : meta, hero, benefits (5 items), stats (3), machines, faq (3 Q/R), cta
- `packshotIndustriel` : meta, hero, benefits (5 items), stats (3), machines, faq (3 Q/R), cta

---

## 2 nouveaux secteurs ajoutes

### data/secteurs.ts

| # | Slug | Titre |
|---|------|-------|
| 13 | `industrie-manufacturiere` | Industrie Manufacturiere |
| 14 | `defense-securite` | Defense & Securite |

Chaque secteur suit l'interface `Secteur` avec : hero, problematiques (5 items), solutions (3 items avec avantages), casClients (1), cta.

### SectorGrid mis a jour
- 2 nouvelles entrees ajoutees dans `DEFAULT_SECTORS` (components/shared/SectorGrid.tsx)
- Icones : `Factory` pour industrie, `Shield` pour defense
- Texte "12 secteurs" mis a jour vers "14 secteurs" dans :
  - `app/[lang]/industrie/page.tsx` (badge hero + bouton CTA)
  - `app/[lang]/industrie/[slug]/page.tsx` (bouton "Voir les secteurs")

---

## Schemas JSON-LD

### Landing SEO (Amazon, Industriel)
Chaque page inclut 3 schemas :
- `organizationSchema()` - schema Organisation PackshotCreator
- `breadcrumbSchema()` - fil d'Ariane (Accueil > Page)
- `faqSchema()` - FAQPage avec 3 questions/reponses

### Secteurs (Industrie Manufacturiere, Defense)
Pages generees par la route dynamique `app/[lang]/industrie/[slug]/page.tsx` qui inclut deja :
- `organizationSchema()`
- `breadcrumbSchema()` (Accueil > Industries > Secteur)

---

## SEO

Chaque landing SEO dispose de :
- `generateMetadata()` avec title (< 60 chars), description (120-155 chars)
- `alternates.languages` (fr/en)
- `alternates.canonical` vers `https://www.packshot-creator.com/...`
- H1 unique et optimise pour le mot-cle cible
- OpenGraph title + description

---

## Decisions techniques

### Pathnames i18n
Meme decision que S2a : pas de pathnames differencies par locale. Les pages utilisent le meme slug pour FR et EN (`/fr/packshot-amazon`, `/en/packshot-amazon`). Coherent avec le pattern existant.

### Animations
Utilisation de `FadeInView`, `StaggerContainer`, `StaggerItem` depuis `@/components/animations`. Compatible `useReducedMotion`.

---

## Build

`npm run build` : OK (0 erreur TypeScript)
152 pages generees avec succes (vs 144 en S2a = +8 pages : 2 landing + 2x2 secteurs x2 langues).

---

## Fichiers crees

- `app/[lang]/packshot-amazon/page.tsx`
- `app/[lang]/packshot-industriel/page.tsx`

## Fichiers modifies

- `messages/fr.json` (+2 blocs de traduction : packshotAmazon, packshotIndustriel)
- `messages/en.json` (+2 blocs de traduction : packshotAmazon, packshotIndustriel)
- `data/secteurs.ts` (+2 secteurs : industrie-manufacturiere, defense-securite)
- `components/shared/SectorGrid.tsx` (+2 entrees DEFAULT_SECTORS + imports Factory/Shield)
- `app/[lang]/industrie/page.tsx` (12 -> 14 secteurs dans les textes)
- `app/[lang]/industrie/[slug]/page.tsx` (12 -> 14 secteurs dans le bouton)
