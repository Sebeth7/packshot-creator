# Audit Phase 5 - Etat du Codebase PackshotCreator

**Date** : 2026-02-08
**Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (fr/en)
**Total pages** : 31 fichiers `page.tsx` (dont 1 hors `[lang]`)

---

## 1. Inventaire des pages

### Pages principales

| Chemin relatif | Lignes | Sections identifiees |
|---|---:|---|
| `app/[lang]/page.tsx` | 595 | Hero, Client Logos, Three Pillars, Key Stats, Hybrid Approach, Product Spotlight, Industries (12), Blog (3), FAQ (6), Final CTA |
| `app/[lang]/studios-photo-automatises/page.tsx` | 250 | Hero, Three Pillars, Product Grid (6 machines), ROI Calculator, Final CTA |
| `app/[lang]/ia-photo-produit/page.tsx` | 262 | Hero (BlendAI), Manifeste, Features (4 cards), Before/After, Compatible Studios, Final CTA |
| `app/[lang]/academy/page.tsx` | 311 | Hero (Qualiopi), Qualiopi, Formations (Packshot + IA), Tools (Simulator + Calendar), FAQ (5), Final CTA |
| `app/[lang]/contact/page.tsx` | 154 | Hero, Form Pipedrive + Info (Contact, Showroom, FAQ) |
| `app/[lang]/blog/page.tsx` | 171 | Hero, Articles Grid, CTA |
| `app/[lang]/a-propos/page.tsx` | 241 | Hero, Mission, Values (3), Timeline (9 milestones), Stats (4), CTA |

### Pages Studio Photo

| Chemin relatif | Lignes | Sections identifiees |
|---|---:|---|
| `app/[lang]/studio-photo/selecteur-machines/page.tsx` | 137 | Hero, Machine Selector (dynamic), CTA |
| `app/[lang]/studio-photo/[slug]/page.tsx` | 503 | Hero Product, IA Ready Banner, Key Advantages, Technical Specs, Use Cases, ROI CTA, Training, Final CTA |

### Pages Industrie

| Chemin relatif | Lignes | Sections identifiees |
|---|---:|---|
| `app/[lang]/industrie/page.tsx` | 285 | Hero, 12 Sectors Grid, Benefits, Workflow, Final CTA |
| `app/[lang]/industrie/[slug]/page.tsx` | 298 | Hero, Problematiques, Solutions, Cas Clients, FAQ, CTA, Other Sectors |
| `app/[lang]/industrie-defense/page.tsx` | 414 | Hero Premium, Points de douleur, Technologies, Segments, Chiffres, Cas d'usage, Machines, Conformite, FAQ, CTA |

### Landings SEO (5 identiques + 2 specifiques)

| Chemin relatif | Lignes | Sections |
|---|---:|---|
| `packshot-bijoux/mode/e-commerce/amazon/industriel` | ~247 | Hero, Benefits, Stats, Machines, FAQ, CTA |
| `besoins-photographie-produit` | 249 | Hero, Needs, Solution Path, Sectors, FAQ, CTA |
| `questions-cles-photographie-produit` | 174 | Hero, Categories, Q&A, CTA |

### Blog & Guides

| Chemin relatif | Lignes | Sections |
|---|---:|---|
| `blog/[slug]` | 331 | Header, Featured Image, Content (Sanity OU Webflow), CTA |
| `guide/page.tsx` | 152 | Hero, Guide Grid, CTA |
| `guide/[slug]` | 263 | Hero, Image, Introduction, Steps, FAQ, CTA |

---

## 2. TODO / Placeholders

| Fichier | Contenu |
|---|---|
| `components/shared/EmbedFrame.tsx` | 2 TODO: URLs Tally et Typeform non remplaces |
| `components/calculators/ROICalculator/steps/Step3Results.tsx` | TODO: Envoi API Pipedrive + email |
| `components/sections/TailorMadeSection.tsx` | Icon placeholder |
| `components/machine-selector/lib/machines.ts` | 16 machines avec PLACEHOLDER_IMAGES SVG |
| `app/[lang]/studio-photo/[slug]/page.tsx` | Fallback `placeholder-medium.svg` |

---

## 3. Comparaison Orbitvu.com vs PackshotCreator

### Homepage

| Section | Orbitvu | PackshotCreator | Gap |
|---|---|---|---|
| Hero + CTA | Oui | Oui | OK |
| Stats/Chiffres | 9500 companies, 100M images, 100K hours | 20 ans, 500 entreprises, 12 secteurs, 20 studios | OK |
| Categories produits avec visuels | 4 categories illustrees | 3 piliers (sans visuels) | MANQUE visuels |
| Benefices detailles (3 blocs) | Software/Hardware integration | Approche Hybride (3 steps) | OK |
| Gamme complete produits | 10+ device cards | 1 seul best-seller | MANQUE gamme |
| CTA band intermediaire | Oui (Get offer + Calculate ROI) | Non | MANQUE |
| Benefices approfondis | 3 sections detaillees | Non | MANQUE |
| Support/Accompagnement | Oui | Non | MANQUE |
| Logos clients | Oui (Trusted by) | Oui | OK |
| Case studies | Oui | Non | MANQUE |
| Industries | 5 avec visuels | 12 grille simple | OK mais enrichir |
| FAQ | Non | Oui (6 items) | AVANTAGE PC |
| Blog | Non | Oui (3 articles) | AVANTAGE PC |

### Studios Hub (/products vs /studios-photo-automatises)

| Section | Orbitvu /products | PackshotCreator /studios | Gap |
|---|---|---|---|
| Filtrage par categorie | 4 categories cliquables | Non | MANQUE |
| Description par categorie | Texte + stats + photo | Non | MANQUE |
| Nombre de machines affichees | 10+ | 6 sur 16 | MANQUE 10 machines |
| Trust/Social proof | 9500 brands, 50+ markets | Non | MANQUE |
| Bulk photography section | Oui (detaillee) | Non | MANQUE |
| Support process | 3 etapes illustrees | Non | MANQUE |
| FAQ | 8 questions specifiques | Non | MANQUE |
| ROI Calculator | Lien externe | Integre dans la page | AVANTAGE PC |

---

## 4. Points d'attention

1. **EmbedFrame.tsx** : 2 TODO URLs non remplaces
2. **ROI Calculator Step3** : Capture leads non connectee a Pipedrive
3. **Machine Selector** : 16 machines avec images placeholder SVG
4. **5 landings SEO** identiques en structure -- potentiel de factorisation
5. **blog/[slug]** : Structure doublee (Sanity + Webflow)
6. **a-propos** : Hardcoded fr/en inline (pas de next-intl)
7. **90 composants** au total sous `components/`
