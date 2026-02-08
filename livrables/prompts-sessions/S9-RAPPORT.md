# S9-RAPPORT - Tests SEO, Redirections, Responsive

**Date** : 2026-02-08
**Modele** : Claude Opus 4.6
**Fichiers crees** : `e2e/seo.spec.ts`, `e2e/redirections.spec.ts`, `e2e/responsive.spec.ts`, `e2e/internal-links.spec.ts`
**Fichiers modifies** : `messages/fr.json`, `messages/en.json` (fix cles industrieDefense), `playwright.config.ts` (timeout)

---

## Resume global

| Suite | Tests | Pass | Fail |
|---|---|---|---|
| Redirections 301 | 62 | 62 | 0 |
| SEO (status, title, desc, canonical, hreflang, JSON-LD, OG, images) | 253 | 246 | 7 |
| Responsive (mobile/tablet/desktop) | 48 | 44 | 4 |
| Liens internes | 3 | 2 | 1 |
| **TOTAL** | **366** | **354** | **12** |

**Taux de reussite : 96.7%**

---

## Bug bloquant corrige en cours de session

### next-intl INVALID_KEY dans industrieDefense (CORRIGE)

Les fichiers de traduction `messages/fr.json` et `messages/en.json` contenaient des cles avec des `.` dans le namespace `industrieDefense` (ex: `"pain1.title"`, `"tech1.name"`, `"seg1.norms"`). next-intl interdit les `.` dans les cles car c'est le separateur de nesting.

**Correction** : 64 cles par fichier converties en objets imbriques.
Avant : `"pain1.title": "..."` -> Apres : `"pain1": { "title": "..." }`

Le composant `app/[lang]/industrie-defense/page.tsx` et le data file `data/industrie-defense.ts` n'ont pas eu besoin de modification car `t('painPoints.pain1.title')` fonctionne avec la structure imbriquee.

**Impact** : Ce bug causait un Internal Server Error 500 sur TOUTES les pages en mode dev (car `layout.tsx` appelle `getMessages()` qui charge toutes les traductions). Le build passait car la validation est differente.

---

## Detail des 12 echecs

### SEO - Title (2 echecs)

| Page | Valeur | Limite | Ecart |
|---|---|---|---|
| `/fr` (homepage) | 72 caracteres | < 70 | +2 |
| `/fr/academy` | 70 caracteres | < 70 | = 70 (egal, pas strictement inferieur) |

**Recommandation** : Raccourcir les meta titles de ces 2 pages de quelques caracteres.

### SEO - Meta description (5 echecs)

| Page | Valeur | Limite | Ecart |
|---|---|---|---|
| `/fr` (homepage) | 170 caracteres | < 160 | +10 |
| `/en` (homepage) | 168 caracteres | < 160 | +8 |
| `/fr/industrie` | 171 caracteres | < 160 | +11 |
| `/en/industrie` | 163 caracteres | < 160 | +3 |
| `/en/packshot-bijoux` | 166 caracteres | < 160 | +6 |

**Recommandation** : Raccourcir les meta descriptions de ces 5 pages. Google tronque au-dela de 155-160 caracteres.

### Responsive - Mobile 375px (4 echecs)

| Page | Probleme |
|---|---|
| `/fr` | `div.relative` deborde a 383px (viewport 375px) - scroll horizontal |
| `/fr` | Meme element detecte par le test overflow |
| `/fr/ia-photo-produit` | `div.relative` deborde a 383px - scroll horizontal |
| `/fr/ia-photo-produit` | Meme element detecte par le test overflow |

**Recommandation** : Identifier le `div.relative` responsable (probablement un conteneur hero ou un slider). Ajouter `overflow-hidden` sur le parent ou ajuster les marges negatives.

### Liens internes (1 echec)

| Page source | Lien casse | Status |
|---|---|---|
| `/fr/studios-photo-automatises` | `/fr/studio-photo/alphashot-xl` | 404 |

**Cause** : Le slug a change de `alphashot-xl` a `alphashot-xl-v2`. La page studios fait reference a l'ancien slug.
**Recommandation** : Mettre a jour le lien dans le composant studios-photo-automatises OU ajouter une redirection `/fr/studio-photo/alphashot-xl` -> `/fr/studio-photo/alphashot-xl-v2` dans `next.config.ts`.

---

## Suites de tests completement vertes

### Redirections 301 (62/62)
- Pages FR sans prefixe (14 redirections)
- Anciennes URLs Webflow (13 redirections)
- Machines EN photo-studio -> studio-photo (11 redirections)
- DE/ES/NL individuelles - 14 redirections (rapport S1)
- DE/ES/NL catch-all (6 tests)
- Contact variantes (4 redirections)

### SEO - Status codes (37/37)
Toutes les pages retournent 200.

### SEO - Canonical (37/37)
Toutes les pages ont un canonical vers `www.packshot-creator.com`.

### SEO - Hreflang (17/17)
Toutes les pages bilingues ont hreflang `fr` et `en`, sans `de`, `es`, `nl`.

### SEO - JSON-LD Schema (37/37)
Tous les schemas JSON-LD sont valides.

### SEO - Open Graph (37/37)
Toutes les pages ont `og:title` et `og:description`.

### SEO - Images alt (4/4)
Toutes les images testees ont des attributs `alt`.

### Responsive tablet/desktop (32/32)
Aucun overflow sur tablette et desktop.

### Liens internes homepage FR et EN (2/2)
Aucun lien casse sur les deux homepages.

---

## Build

`npm run build` passe sans erreur.

---

## Actions correctives recommandees (par priorite)

1. **P1 - Lien casse alphashot-xl** : Ajouter redirection FR `/fr/studio-photo/alphashot-xl` -> `/fr/studio-photo/alphashot-xl-v2` dans `next.config.ts` (comme fait pour EN)
2. **P2 - Meta descriptions trop longues** : Raccourcir 5 descriptions (homepage FR/EN, industrie FR/EN, packshot-bijoux EN)
3. **P2 - Meta titles trop longs** : Raccourcir 2 titles (homepage FR, academy FR)
4. **P3 - Overflow mobile** : Investiguer le `div.relative` qui deborde sur homepage et ia-photo-produit
