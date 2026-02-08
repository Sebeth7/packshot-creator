# S5B - Rapport Intermédiaire : Enrichissement Contenu

**Date** : 8 février 2026
**Session** : S5B - Enrichissement contenu des pages
**Statut** : 2/6 pages traitées, 1 prompt prêt pour session suivante

---

## Pages traitées

### PAGE 1 : Studios Hub (`/fr/studios-photo-automatises`)

**Fichiers modifiés :**
- `app/[lang]/studios-photo-automatises/page.tsx` - Refonte majeure
- `components/machine-selector/components/MachineCard.tsx` - Harmonisation couleurs brandbook
- `components/machine-selector/components/FilterBar.tsx` - Harmonisation couleurs brandbook
- `components/machine-selector/components/MachineModal.tsx` - Harmonisation couleurs + lien "Voir fiche complète"
- `messages/fr.json` - Ajout sections photoTypes, trust, support, faqStudios
- `messages/en.json` - Idem EN

**Sections ajoutées :**
| Section | Description |
|---------|-------------|
| B - Types de photo | 4 cartes (packshot, 360, mode, flat-lay) avec stats et liens |
| A - MachineSelector | Embed du composant existant (16 machines, zéro duplication) |
| C - Trust/Social Proof | 3 stats (500+ clients, 20 ans, 50+ pays) + placeholder logos |
| D - Accompagnement | 3 étapes sur fond dark gradient avec glass-morphism |
| E - FAQ Studios | 6 questions expandables + schema.org FAQPage |

**Harmonisation couleurs MachineSelector :**
- `brand-red` → `very-peri-600`
- `gray-*` → `future-dusk-*` / `neutral-*`
- `rounded-xl` → `rounded-2xl` (cartes)

### PAGE 2 : Homepage (`/fr`)

**Fichiers modifiés :**
- `app/[lang]/page.tsx` - Ajout 3 sections
- `messages/fr.json` - Ajout sections gallery, whyAutomate, midCta
- `messages/en.json` - Idem EN

**Sections ajoutées :**
| Section | Description |
|---------|-------------|
| A - Galerie Résultats | Grid masonry 6 images produit (placeholders .avif) |
| C - Mid CTA | Bande dark avec 2 options : "Demander un devis" / "Calculer mon ROI" |
| B - Pourquoi Automatiser | 3 blocs texte+image alternés (no skills, scalability, know-how) |

**Images placeholder à fournir par le PO :**
- `/images/gallery/packshot-fondBlanc.avif`
- `/images/gallery/360-product.avif`
- `/images/gallery/fashion-model.avif`
- `/images/gallery/flatlay-composition.avif`
- `/images/gallery/jewelry-macro.avif`
- `/images/gallery/furniture-large.avif`
- `/images/why-automate/noSkills.avif`
- `/images/why-automate/scalability.avif`
- `/images/why-automate/knowHow.avif`

### Quick-fixes S5A (réalisés en début de session)
- `app/[lang]/academy/page.tsx` : ajout `id="qualiopi"` sur section Qualiopi
- `MachineModal.tsx` : ajout lien "Voir la fiche complète → /studio-photo/{id}"

---

## Pages restantes

| # | Page | Statut | Note |
|---|------|--------|------|
| 3 | IA Photo Produit | SKIP | PO a décidé de ne pas analyser |
| 4 | Academy | SKIP | PO a décidé de ne pas analyser |
| 5 | A Propos | SKIP | PO a décidé de ne pas analyser |
| 6 | Fiches Machines | **PROMPT PRÊT** | Voir `livrables/prompts-sessions/S5B-fiches-machines.md` |

---

## Build
Tous les builds passent sans erreur. Le serveur dev fonctionne sur port 3333.
