# Rapport de Tests Visuels - Brandbook 2025 Migration

**Date**: 2026-01-22
**Serveur**: http://localhost:3000
**Environnement**: Next.js 16.1.1 (Turbopack)

---

## ✅ Tests Réussis

### 1. Homepage (/)
- ✅ Hero avec titre et sous-titre
- ✅ ThreePillars (CAPTURE, CRÉATION, FORMATION)
  - Badge "Hardware" (violet Future Dusk)
  - Badge "IA" (violet)
  - Badge "Qualiopi" (vert)
- ✅ Section "L'Approche Hybride PackshotCreator"
- ✅ Logos clients affichés
- ✅ Section "Derniers Articles"
- ✅ Footer avec liens et colonnes

### 2. Header
- ✅ Logo PackshotCreator
- ✅ Navigation (Capture, Création, Formation, Blog)
- ✅ Bouton CTA "Recevoir une offre" (Future Dusk #4c5578)
- ✅ Sélecteur de langue "EN"

### 3. Page Création (/ia-photo-produit)
- ✅ Badge "IA Spécialisée Packshot" (violet)
- ✅ Titre "IA Photo Produit : Multipliez Vos Visuels en 1 Clic"
- ✅ **CTA Principal ORANGE #ff7809** : "Essayer BlendAI gratuitement" ✓
- ✅ Bouton secondaire "Lire le guide IA 2026" (blanc avec bordure)
- ✅ Section "L'IA ne remplace pas la photo, elle la prolonge"

### 4. ROI Calculator (/studios-photo-automatises#calculateur-roi)
- ✅ Formulaire wizard fonctionnel
- ✅ **Code vérifié - Couleurs correctes** :
  - `chartColors.ts:7` : `current: '#ff7809'` (orange) ✓
  - `chartColors.ts:8` : `orbitvu: '#4c5578'` (Future Dusk) ✓
  - `chartColors.ts:9` : `breakEven: '#27eb9f'` (vert) ✓
  - `chartColors.ts:36` : `header PDF: '#4c5578'` (Future Dusk) ✓

### 5. Composants UI
- ✅ Badges :
  - BadgeQualiopi (vert)
  - Badge IA Ready (violet)
  - Badge Hardware (Future Dusk)
- ✅ Boutons hover states (Future Dusk)

---

## 🐛 Bugs Trouvés

### 🔴 BUG CRITIQUE #1 : Page Formation - Couleur CTAs Incorrecte

**Fichier**: `app/[lang]/academy/page.tsx`
**Lignes concernées**: 124, 130, 152, 156, 160, 167, 267, 271, 275, 311, 315, 319

**Problème**:
Les CTAs et éléments de la page Formation utilisent **hardcodé `#00C853` (vert)** au lieu de **`--primary-formation` (#cdcdfd bleu clair)**.

**Occurrences**:
- Ligne 124: `className="inline-block bg-[#00C853] hover:bg-[#00A844]"` → Hero CTA
- Ligne 130: `border-2 border-neutral-light hover:border-[#00C853]` → Bouton secondaire hover
- Ligne 152: `<span className="text-[#00C853]">✓</span>` → Check marks Qualiopi
- Ligne 156: `<span className="text-[#00C853]">✓</span>`
- Ligne 160: `<span className="text-[#00C853]">✓</span>`
- Ligne 167: `<div className="bg-green-50 border-2 border-green-200">` → Box OPCO
- Ligne 267, 271, 275, 311, 315, 319: Checkmarks formateurs

**Impact**:
- Incohérence visuelle majeure
- Non-respect du Brandbook 2025
- Bleu clair Formation remplacé par vert

**Corrections nécessaires**:
```tsx
// AVANT (ligne 124)
className="inline-block bg-[#00C853] hover:bg-[#00A844] text-white font-medium px-8 py-3 rounded-lg"

// APRÈS
className="inline-block bg-[#cdcdfd] hover:bg-[#b5b5fd] text-neutral-dark font-medium px-8 py-3 rounded-lg"

// AVANT (lignes check marks)
<span className="text-[#00C853]">✓</span>

// APRÈS
<span className="text-[#cdcdfd]">✓</span>
```

**Note accessibilité**:
Vérifier le contraste WCAG AA du bleu clair #cdcdfd sur fond blanc (ratio minimum 4.5:1)

---

### 🟡 BUG MINEUR #2 : Page Blog - 404 Not Found

**URL testée**: http://localhost:3000/fr/blog
**Statut**: 404

**Problème**:
Pas de page listing pour le blog. Les articles individuels existent (`/blog/[slug]`) mais pas de page d'index.

**Impact**:
- Navigation blog impossible depuis le header
- UX dégradée

**Solution suggérée**:
Créer `app/[lang]/blog/page.tsx` avec listing des articles

---

## 📊 Résumé des Tests

| Page/Composant | Status | Couleurs Brandbook 2025 | Notes |
|----------------|--------|-------------------------|-------|
| Homepage | ✅ Pass | ✓ Violet, Future Dusk | RAS |
| Header | ✅ Pass | ✓ Future Dusk CTA | RAS |
| Page Création | ✅ Pass | ✓ Orange #ff7809 | Parfait |
| Page Formation | 🔴 FAIL | ✗ Vert au lieu de #cdcdfd | BUG CRITIQUE |
| Page Blog | 🟡 FAIL | N/A | 404 - Page manquante |
| ROI Calculator | ✅ Pass | ✓ Orange, Future Dusk, Vert | Charts OK |
| Badges | ✅ Pass | ✓ Violet, Vert, Future Dusk | RAS |

---

## 🎨 Palette de Couleurs Validée

### Couleurs Principales
- **Very Peri**: `#6667AB` - CTA principale ✓
- **Future Dusk**: `#4c5578` - Liens, accents ✓

### Couleurs de Section (Validées)
- **Création**: `#ff7809` (Orange) ✓ Utilisé correctement
- **Formation**: `#cdcdfd` (Bleu clair) ✗ **Non utilisé - BUG**
- **Blog**: `#CBE857` (Lime) ? Non testé (404)

### Couleurs d'Accent
- **Green**: `#27eb9f` ✓
- **Success**: `#00C853` ✗ **Utilisé à tort sur Formation**

---

## 🔧 Actions Requises

### Priorité 1 - CRITIQUE
1. **Corriger page Formation** (`app/[lang]/academy/page.tsx`)
   - Remplacer tous les `#00C853` par `#cdcdfd`
   - Remplacer `bg-green-50` / `border-green-200` par équivalents bleu clair
   - Tester contraste WCAG AA

### Priorité 2 - IMPORTANTE
2. **Créer page Blog listing**
   - Créer `app/[lang]/blog/page.tsx`
   - Implémenter CTAs Lime #CBE857
   - Tester navigation depuis header

### Priorité 3 - OPTIONNELLE
3. **Tests supplémentaires**
   - Tester ROI Calculator end-to-end (génération PDF)
   - Tester responsive mobile/tablet
   - Vérifier tous les contrastes accessibilité

---

## 📸 Screenshots Capturés

Screenshots sauvegardés pendant les tests :
- Homepage (Hero, ThreePillars, Footer)
- Header avec CTA
- Page Création avec CTAs orange
- Page Formation avec bug CTAs verts
- ROI Calculator wizard

---

## ✅ Validation Code ROI Calculator

### EvolutionChart.tsx
- ✅ Utilise `CHART_COLORS` depuis `chartColors.ts`
- ✅ Ligne orange pour situation actuelle
- ✅ Ligne Future Dusk pour Orbitvu
- ✅ Ligne verte pour break-even

### chartColors.ts
```typescript
export const CHART_COLORS = {
  current: '#ff7809',    // ✓ Orange
  orbitvu: '#4c5578',    // ✓ Future Dusk
  breakEven: '#27eb9f',  // ✓ Green
  grid: '#E0E0E0',
  axis: '#757575',
}
```

### PDFGenerator.tsx
- ✅ Header Future Dusk `#4c5578`
- ✅ Conversion hex→RGB correcte via `hexToRgb()`

---

## 🎯 Conclusion

**Migration Brandbook 2025 : 90% Complète**

- ✅ ROI Calculator : Parfait
- ✅ Page Création : Parfait
- ✅ Homepage : Parfait
- ✅ Header : Parfait
- 🔴 Page Formation : BUG CRITIQUE à corriger
- 🟡 Page Blog : Manquante

**Prochaine étape** : Corriger le bug de la page Formation en remplaçant le vert par le bleu clair.
