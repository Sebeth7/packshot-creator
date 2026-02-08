# Session S10 - Corrections Phase 5 (audit codebase)

**Date** : 8 fevrier 2026
**Modele** : Claude Opus 4.6
**Duree estimee** : ~45 min
**Build** : OK (0 erreur)

---

## Contexte

Travail a partir de l'audit `livrables/audit-phase5-codebase.md` qui identifiait 10 problemes residuels dans le codebase. Phase d'arbitrage PO avant implementation : toutes les propositions validees.

---

## Modifications realisees

### Haute priorite

- **Overflow mobile 375px** : 3 corrections sur `/fr` (homepage) et `/fr/ia-photo-produit`. Glow hero passe de `-inset-6` a `inset-0`, 2 images sans contrainte responsive corrigees (`w-full h-auto` + `sizes`).
- **EmbedFrame.tsx supprime** : composant mort (jamais importe), remplace depuis longtemps par ROICalculatorWizard et MachineSelector natifs.

### Moyenne priorite

- **16 images machines** : remplacement des SVG placeholder par les `.avif` reelles dans `machine-selector/lib/machines.ts`. 12 images directes + 4 partages de visuels (meme gamme).
- **TailorMadeSection** : corrige le namespace i18n (`tailorMade` au lieu de `home`), ajoute 6 icones Lucide, remplace l'image CDN Webflow par `next/image` local, aligne sur le brandbook.
- **Factorisation 5 landings SEO** : creation de `PackshotLandingTemplate.tsx` (195 lignes). Les 5 pages (bijoux, mode, e-commerce, amazon, industriel) passent de ~247 lignes chacune a ~40 lignes de config. Total : 1235 → 400 lignes.
- **Typos** : `Jusqu'a` → `Jusqu'a` dans 3 fichiers.

### Basse priorite

- **Migration i18n de 4 pages** : `a-propos`, `cgu`, `mentions-legales`, `confidentialite` passees de ternaires `isFr ?` hardcodes a `next-intl` avec `getTranslations()`. 87 ternaires elimines, ~200 cles i18n ajoutees dans `fr.json` / `en.json`.

---

## Fichiers crees

| Fichier | Role |
|---|---|
| `components/templates/PackshotLandingTemplate.tsx` | Template partage pour les 5 landings SEO |

## Fichiers supprimes

| Fichier | Raison |
|---|---|
| `components/shared/EmbedFrame.tsx` | Code mort, jamais importe |

## Fichiers modifies (14)

- `app/[lang]/page.tsx` (home - glow fix)
- `app/[lang]/ia-photo-produit/page.tsx` (images responsive)
- `app/[lang]/packshot-bijoux/page.tsx` (refactorise)
- `app/[lang]/packshot-mode/page.tsx` (refactorise)
- `app/[lang]/packshot-e-commerce/page.tsx` (refactorise)
- `app/[lang]/packshot-amazon/page.tsx` (refactorise + typo)
- `app/[lang]/packshot-industriel/page.tsx` (refactorise + typo)
- `app/[lang]/industrie-defense/page.tsx` (typo)
- `app/[lang]/a-propos/page.tsx` (migration i18n)
- `app/[lang]/cgu/page.tsx` (migration i18n)
- `app/[lang]/mentions-legales/page.tsx` (migration i18n)
- `app/[lang]/confidentialite/page.tsx` (migration i18n)
- `components/machine-selector/lib/machines.ts` (vraies images)
- `components/sections/TailorMadeSection.tsx` (corrige)
- `messages/fr.json` + `messages/en.json` (~200 cles ajoutees)

---

## Reste a faire (hors scope cette session)

- **P7.1** Benchmark Lighthouse sur 5 pages cles (pas encore fait)
- **P2.4** Page calendrier Pipedrive (en attente URL embed du PO)
- **ROI Calculator Step3** : capture leads Pipedrive + email non connectee
- **TailorMadeSection** : composant pret mais pas encore integre dans une page
- **P10** Checklist post-deploiement + monitoring
