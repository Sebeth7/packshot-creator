# Rapport Session S5B - Enrichissement Contenu & Fiches Machines

**Date** : 8 fevrier 2026
**Session** : S5B (2 parties)
**Statut** : TERMINE
**Commits** : `a2fbfa0` (contenu) + `42babd7` (fiches machines)
**Build** : OK (158 pages, 0 erreurs)
**Lignes ajoutees** : +1423 (878 + 545)

---

## Resume

Session S5B en 2 parties :
1. **S5B-part1** : Enrichissement Studios Hub + Homepage + harmonisation brandbook MachineSelector
2. **S5B-part2 (fiches machines)** : 4 nouvelles sections sur les 16 fiches machines `/studio-photo/[slug]` apres comparaison avec Orbitvu

---

## PARTIE 1 : Studios Hub + Homepage

### 1.1 Studios Hub (`/studios-photo-automatises`)

**Fichiers modifies (6) :**
| Fichier | Modifications |
|---------|---------------|
| `app/[lang]/studios-photo-automatises/page.tsx` | Refonte majeure (+230 lignes) |
| `components/machine-selector/components/MachineCard.tsx` | Harmonisation couleurs brandbook |
| `components/machine-selector/components/FilterBar.tsx` | Harmonisation couleurs brandbook |
| `components/machine-selector/components/MachineModal.tsx` | Harmonisation + lien fiche complete |
| `messages/fr.json` | +129 cles i18n (photoTypes, trust, support, faqStudios) |
| `messages/en.json` | +129 cles i18n |

**5 sections ajoutees :**
| Section | Description |
|---------|-------------|
| Types de photo | 4 cartes (packshot, 360, mode, flat-lay) avec stats et liens |
| MachineSelector | Embed du composant existant (16 machines, zero duplication) |
| Trust / Social Proof | 3 stats (500+ clients, 20 ans, 50+ pays) + placeholder logos |
| Accompagnement | 3 etapes sur fond dark gradient avec glass-morphism |
| FAQ Studios | 6 questions expandables + schema.org FAQPage |

**Harmonisation couleurs MachineSelector :**
- `brand-red` remplace par `very-peri-600` (3 composants)
- `gray-*` remplace par `future-dusk-*` / `neutral-*`
- `rounded-xl` remplace par `rounded-2xl` (cartes)

### 1.2 Homepage (`/`)

**Fichiers modifies (3) :**
| Fichier | Modifications |
|---------|---------------|
| `app/[lang]/page.tsx` | +148 lignes (3 sections) |
| `messages/fr.json` | cles gallery, whyAutomate, midCta |
| `messages/en.json` | idem EN |

**3 sections ajoutees :**
| Section | Description |
|---------|-------------|
| Galerie Resultats | Grid masonry 6 images produit (placeholders .avif) |
| Mid CTA | Bande dark gradient avec 2 CTA : devis + calculer ROI |
| Pourquoi Automatiser | 3 blocs texte+image alternes (competences, scalabilite, savoir-faire) |

### 1.3 Quick-fixes S5A

- `app/[lang]/academy/page.tsx` : ajout `id="qualiopi"` sur section Qualiopi (ancre manquante)
- `MachineModal.tsx` : ajout lien "Voir la fiche complete" vers `/studio-photo/{id}`

---

## PARTIE 2 : Fiches Machines (16 pages)

### Methodologie

1. Comparaison visuelle fiche Orbitvu (`orbitvu.com/product/alphashot-pro-g2/`) vs notre fiche (`/fr/studio-photo/alphashot-pro-g2`)
2. Identification de 15 sections Orbitvu vs 8 sections existantes
3. Proposition de 6 enrichissements (#A-#F) au PO
4. PO valide #A, #C, #D, #F (4 sur 6)
5. Implementation sur le template unique (toutes les 16 pages d'un coup)

### Decisions PO

| # | Enrichissement | Decision | Raison |
|---|---------------|----------|--------|
| #A | Chiffres cles (Key Stats) | VALIDE | Impact SEO + visuel fort |
| #B | Specs techniques tableau | REPORTE | Donnees insuffisantes dans machines.ts |
| #C | FAQ + schema.org | VALIDE | SEO rich snippets |
| #D | Machines similaires | VALIDE | Maillage interne, retention |
| #E | Use cases par secteur | REPORTE | Redondant avec sections existantes |
| #F | CTA intermediaire | VALIDE | Conversion mid-page |

### Fichiers modifies (3)

| Fichier | Lignes | Modifications |
|---------|--------|---------------|
| `components/calculators/ROICalculator/lib/types.ts` | 176 | +15 lignes : interfaces `BilingualFaqItem`, `KeyStat`, champs optionnels `faqItems?` et `keyStats?` sur `Machine` |
| `components/calculators/ROICalculator/lib/machines.ts` | 870 | +368 lignes : 64 FAQ (4/machine) + 48 KeyStats (3/machine) pour les 16 machines |
| `app/[lang]/studio-photo/[slug]/page.tsx` | 662 | +165 lignes : 4 nouvelles sections + helper `getSimilarMachines()` + FAQ schema.org |

### 4 sections ajoutees aux fiches machines

| Section | Position | Description |
|---------|----------|-------------|
| **#A Key Stats** | Apres IA Ready | 3 gros chiffres par machine (capacite, stat differenciante, automatisation) en `StaggerContainer` |
| **#F CTA intermediaire** | Apres Use Cases | Dark gradient avec "Voir en action", 2 boutons devis/demo, showrooms Paris/Lausanne |
| **#D Machines similaires** | Apres CTA intermediaire | 3 cartes machines filtrees par `tailleCategories` en commun, lien vers fiche |
| **#C FAQ** | Avant CTA final | 4 questions accordion `<details>` par machine + `faqSchema` dans SchemaOrg |

### Donnees ajoutees par machine

**FAQ (4 par machine, 64 au total) :**
- Orientees PackshotCreator distributeur France (OPCO, Qualiopi, showrooms, leasing)
- Pas de prix mentionnes
- Bilingues FR/EN (`BilingualFaqItem`)

**Key Stats (3 par machine, 48 au total) :**
- Stat 1 : capacite/jour (ex: "500+ prod/jour")
- Stat 2 : stat differenciante (ex: "0.3s/photo", "150cm max", "4K video")
- Stat 3 : niveau automatisation (ex: "100% automatise")
- Bilingues FR/EN (`KeyStat`)

### SEO

- FAQ schema.org (`faqSchema`) ajoute au `<SchemaOrg>` de chaque fiche machine
- 64 questions/reponses indexables par Google (rich snippets potentiels)
- Maillage interne renforce via section "Machines similaires"
- Pas de risque de cannibalisation SEO avec Orbitvu (contenus FR vs EN, domaines differents)

---

## Architecture - Impact global S5B

### Fichiers crees
| Fichier | Role |
|---------|------|
| `livrables/prompts-sessions/S5B-fiches-machines.md` | Prompt session fiches machines |
| `livrables/S5B-rapport-intermediaire.md` | Rapport intermediaire part 1 |

### Fichiers modifies (total S5B)
| Fichier | Part |
|---------|------|
| `app/[lang]/page.tsx` | Part 1 |
| `app/[lang]/studios-photo-automatises/page.tsx` | Part 1 |
| `app/[lang]/studio-photo/[slug]/page.tsx` | Part 2 |
| `app/[lang]/academy/page.tsx` | Quick-fix |
| `components/machine-selector/components/MachineCard.tsx` | Part 1 |
| `components/machine-selector/components/FilterBar.tsx` | Part 1 |
| `components/machine-selector/components/MachineModal.tsx` | Part 1 |
| `components/calculators/ROICalculator/lib/machines.ts` | Part 2 |
| `components/calculators/ROICalculator/lib/types.ts` | Part 2 |
| `messages/fr.json` | Part 1 |
| `messages/en.json` | Part 1 |

**Total : 11 fichiers modifies, 2 fichiers crees, +1423 lignes**

---

## Images placeholder a fournir (PO)

| Image | Usage |
|-------|-------|
| `/images/gallery/packshot-fondBlanc.avif` | Homepage galerie |
| `/images/gallery/360-product.avif` | Homepage galerie |
| `/images/gallery/fashion-model.avif` | Homepage galerie |
| `/images/gallery/flatlay-composition.avif` | Homepage galerie |
| `/images/gallery/jewelry-macro.avif` | Homepage galerie |
| `/images/gallery/furniture-large.avif` | Homepage galerie |
| `/images/why-automate/noSkills.avif` | Homepage "Pourquoi automatiser" |
| `/images/why-automate/scalability.avif` | Homepage "Pourquoi automatiser" |
| `/images/why-automate/knowHow.avif` | Homepage "Pourquoi automatiser" |

---

## Verification visuelle requise

Les pages suivantes doivent etre verifiees visuellement par le PO :

1. **Homepage** `/fr` : galerie, mid CTA, pourquoi automatiser
2. **Studios Hub** `/fr/studios-photo-automatises` : MachineSelector, types photo, trust, accompagnement, FAQ
3. **Fiche machine** `/fr/studio-photo/alphashot-pro-g2` (representative) : key stats, CTA intermediaire, machines similaires, FAQ
4. **Fiche machine EN** `/en/studio-photo/alphashot-pro-g2` : verifier traductions EN

---

## Recommandations pour sessions suivantes

1. **#B Specs techniques** : ajouter un tableau detaille quand les donnees techniques completes seront disponibles
2. **#E Use cases secteurs** : envisager des liens vers `/industrie/[slug]` depuis les fiches machines
3. **Images machines** : remplacer les SVG line-art par de vraies photos produit (impact visuel majeur)
4. **Videos** : ajouter des embeds YouTube quand les URLs seront fournies par le PO
