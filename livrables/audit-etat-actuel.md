# Audit Etat Actuel - PackshotCreator
**Date** : 8 fevrier 2026
**Auteur** : Claude Opus 4.6
**Scope** : Codebase complete (hors node_modules, .next, livrables, playwright-report, test-results)

---

## 1. TODO / FIXME / PLACEHOLDER dans le code

### 1.1 EmbedFrame.tsx - URLs factices (CRITIQUE)
**Fichier** : `components/shared/EmbedFrame.tsx`
- **Ligne 56-57** : `// TODO: Remplacer par l'URL Tally reelle` -> URL = `https://tally.so/embed/YOUR_TALLY_FORM_ID`
- **Ligne 77-78** : `// TODO: Remplacer par l'URL Typeform reelle` -> URL = `https://form.typeform.com/to/YOUR_TYPEFORM_ID`
- **Impact** : FAIBLE - Ce fichier est du **code mort**. Aucun autre fichier n'importe `EmbedFrame`, `ROICalculator` (export Tally) ou `MachineSelectionTool` (export Typeform). Le vrai calculateur ROI est dans `components/calculators/ROICalculator/`. Ce fichier peut etre supprime.

### 1.2 Step3Results.tsx - Pipedrive TODO (IMPORTANT)
**Fichier** : `components/calculators/ROICalculator/steps/Step3Results.tsx`
- **Ligne 92** : `// TODO: Envoyer via API (Pipedrive + email)`
- **Contexte** : La fonction `handleSendPDF` capture l'email mais fait seulement un telechargement local du PDF au lieu d'envoyer via Pipedrive API + email.
- **Impact** : MOYEN - Le calculateur ROI fonctionne, mais les leads ne sont pas captures dans Pipedrive.

### 1.3 TailorMadeSection.tsx - Placeholder icones
**Fichier** : `components/sections/TailorMadeSection.tsx`
- **Ligne 34** : `{/* Icon placeholder - you can add SVG icons here */}`
- **Ligne 35-37** : Les icones sont des carres colores generiques (`div className="w-6 h-6 bg-secondary-orbitvu rounded"`) au lieu de vraies icones Lucide.
- **Ligne 21** : Le heading est **hardcode en anglais** : `A <span ...>tailor-made solution</span>` -- pas de traduction `next-intl`.
- **Impact** : MOYEN - Section visible sur la homepage avec des icones placeholder et du texte non traduit.

### 1.4 MachineRecommendation.tsx - Image placeholder
**Fichier** : `components/calculators/ROICalculator/results/MachineRecommendation.tsx`
- **Ligne 45** : `{/* Image placeholder */}`
- **Impact** : FAIBLE - Le composant n'affiche pas d'image machine dans les resultats ROI.

---

## 2. Images machines : 16/16 en placeholder

**Fichier** : `components/machine-selector/lib/machines.ts`

Toutes les 16 machines utilisent des images placeholder SVG generiques :

| Placeholder | Machines (count) |
|---|---|
| `placeholder-small.svg` | alphashot-micro-v2, alphashot-360, alphashot-g2 (3) |
| `placeholder-medium.svg` | alphashot-pro-g2, alphashot-xl-v2, alphashot-xl-wine-v2, alphashot-xl-pro-v2 (4) |
| `placeholder-flatlay.svg` | alphadesk, alphatable (2) |
| `placeholder-large.svg` | alphastudio-compact-v2, alphastudio-xxl-v2 (2) |
| `placeholder-xlarge.svg` | fashion-studio-basic, fashion-studio, bike-studio, furniture-studio, e-comm-studio-plus (5) |

**Cependant**, de vraies images AVIF existent dans `public/images/machines/` (12 fichiers .avif). Le fichier `app/[lang]/studio-photo/[slug]/page.tsx` (lignes 14-31) a deja un mapping correct `imageMap` qui associe chaque machine a son image reelle.

**Action requise** : Mettre a jour `machines.ts` pour utiliser les images AVIF au lieu des placeholders.

---

## 3. Page a-propos : texte hardcode sans next-intl

**Fichier** : `app/[lang]/a-propos/page.tsx`
- **0 import** de `getTranslations` ou `useTranslations`
- **15 occurrences** de `isFr ?` ternaire avec texte inline
- Tout le contenu est hardcode : hero, histoire, valeurs, timeline, stats, CTA
- **Impact** : MOYEN - La page fonctionne en FR/EN mais les textes ne sont pas dans les fichiers de traduction, ce qui cree une incoherence dans l'architecture i18n.

**Autres pages sans next-intl (meme pattern)** :
- `app/[lang]/cgu/page.tsx` (29 occurrences `isFr ?`)
- `app/[lang]/mentions-legales/page.tsx` (21 occurrences)
- `app/[lang]/confidentialite/page.tsx` (22 occurrences)

**Total** : 303 occurrences `isFr ?` reparties dans 24 fichiers. Certaines sont justifiees (layout.tsx, slug pages) mais 4 pages entieres (a-propos, cgu, mentions-legales, confidentialite) n'utilisent aucune traduction next-intl.

---

## 4. Landing SEO : potentiel de factorisation ELEVE

Les 5 pages landing SEO ont une structure **quasi identique** :
- `app/[lang]/packshot-bijoux/page.tsx` (247 lignes)
- `app/[lang]/packshot-mode/page.tsx` (247 lignes)
- `app/[lang]/packshot-e-commerce/page.tsx` (247 lignes)
- `app/[lang]/packshot-amazon/page.tsx` (246 lignes)
- `app/[lang]/packshot-industriel/page.tsx` (246 lignes)

### Structure commune (6 sections identiques)
1. **Hero** : gradient bg, badge avec icone, h1, subtitle, 2 CTA buttons
2. **Benefits** : grille 3 colonnes, 5 cards avec icones
3. **Stats** : 3 stats centrees
4. **Machines** : grille de machine cards (varies : 2 ou 3 colonnes)
5. **FAQ** : 3 questions/reponses
6. **CTA** : gradient bg, heading, 2 buttons

### Differences entre pages
| Element | Varie |
|---|---|
| Namespace i18n | `packshotBijoux`, `packshotMode`, etc. |
| Icone badge hero | `Gem`, `Shirt`, `ShoppingCart`, `Wrench` |
| BENEFIT_ICONS | 5 icones differentes par page |
| MACHINE_IDS | 2-3 machines differentes par page |
| Grille machines | `md:grid-cols-2` (bijoux, amazon, industriel) vs `md:grid-cols-3` (mode, e-commerce) |

### Recommandation
Creer un composant partage `LandingSEOTemplate.tsx` parametrable avec :
- `namespace: string`
- `heroIcon: LucideIcon`
- `heroBadge: string`
- `benefitIcons: LucideIcon[]`
- `machineIds: string[]`
- `machineGridCols: 2 | 3`

Chaque page se reduirait a ~30 lignes de configuration.

### Typo detectee
`Jusqu'a` (sans accent) dans 3 fichiers au lieu de `Jusqu'a` :
- `app/[lang]/packshot-amazon/page.tsx:170`
- `app/[lang]/packshot-industriel/page.tsx:170`
- `app/[lang]/industrie-defense/page.tsx:291`

### Strings hardcodees dans les landings (non traduites)
Chaque landing contient ~5 strings inline `isFr ?` au lieu de `t()` :
- "Voir les studios" / "View studios"
- "Jusqu'a {tailleMax}" / "Up to {tailleMax}"
- "photos/jour" / "photos/day"
- "Demander un devis" / "Request a quote"
- Badge text (ex: "Bijoux & Joaillerie")

---

## 5. Echecs de tests P9 (responsive overflow mobile)

### 4 tests en echec sur viewport mobile (375px)

| Test | Page | Type |
|---|---|---|
| `/fr` renders without horizontal scroll | `/fr` | scroll horizontal |
| `/fr` has no elements overflowing viewport | `/fr` | overflow elements |
| `/fr/ia-photo-produit` renders without horizontal scroll | `/fr/ia-photo-produit` | scroll horizontal |
| `/fr/ia-photo-produit` has no elements overflowing viewport | `/fr/ia-photo-produit` | overflow elements |

**Analyse des screenshots** :
- **Homepage `/fr`** : Le hero avec l'image "gamme complete studios photo" semble causer un debordement a 375px de largeur. Les logos clients et sections suivantes sont OK.
- **IA Photo Produit `/fr/ia-photo-produit`** : Le hero avec l'illustration isometrique deborde legerement.

**Cause probable** : Elements avec des tailles fixes ou des padding qui ne s'adaptent pas correctement sous 375px. Le test detecte tout element dont `rect.right > window.innerWidth + 5`.

### Autres echecs de tests (hors responsive)
- **SEO** : 6 echecs de tests meta description/title (pages /fr, /fr/academy, /en et autres)
- **Internal links** : 1 echec sur la page studios

---

## 6. Autres problemes detectes

### 6.1 Code mort : EmbedFrame.tsx
**Fichier** : `components/shared/EmbedFrame.tsx` (91 lignes)
- Jamais importe nulle part dans le projet
- Contient des URLs factices (YOUR_TALLY_FORM_ID, YOUR_TYPEFORM_ID)
- **Action** : Supprimer le fichier

### 6.2 TailorMadeSection : image externe Webflow CDN
**Fichier** : `components/sections/TailorMadeSection.tsx`
- **Ligne 54** : `src="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/66c5d754fa02ad5dbebd4999_image_working_on_ortery.webp"`
- Image chargee depuis le CDN Webflow au lieu d'etre hebergee localement
- **Risque** : Si Webflow coupe l'ancien CDN, l'image disparait

### 6.3 TailorMadeSection : utilise des classes CSS legacy
- Classes `bg-secondary-orbitvu/10`, `text-neutral-dark`, `text-neutral-medium`, `border-neutral-light`, `decoration-secondary-orbitvu` qui ne correspondent pas au design system Tailwind v4 (future-dusk/very-peri)

---

## Resume des priorites

| # | Issue | Severite | Effort |
|---|---|---|---|
| 1 | Overflow mobile /fr et /fr/ia-photo-produit (4 tests) | HAUTE | 1-2h |
| 2 | Pipedrive API integration (Step3Results) | HAUTE | 4-8h |
| 3 | Images machines placeholder -> AVIF (machines.ts) | MOYENNE | 30min |
| 4 | TailorMadeSection (icones, heading, image CDN, classes) | MOYENNE | 1h |
| 5 | Factoriser 5 landing SEO en composant template | MOYENNE | 2-3h |
| 6 | Typo "Jusqu'a" -> "Jusqu'a" (3 fichiers) | FAIBLE | 5min |
| 7 | Pages sans next-intl (a-propos, cgu, mentions, confid.) | FAIBLE | 4-6h |
| 8 | Inline `isFr ?` dans les landings (5 strings x 5 pages) | FAIBLE | 1h |
| 9 | Supprimer EmbedFrame.tsx (code mort) | FAIBLE | 5min |
| 10 | Echecs tests SEO meta (6 tests) | A VERIFIER | variable |
