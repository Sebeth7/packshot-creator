# Référentiels du calculateur ROI conversationnel — état de validation

**Validation Seb du 06/08/2026 appliquée.** Source de vérité technique : `lib/roiChat/referentiels.ts`.
Les entrées DRAFT restantes sont présentées par le chat comme « estimation à confirmer ».

---

## a) Coûts de marché — ✅ VALIDÉS (Seb 06/08/2026)

### Grille généraliste (benchmarks web confirmés « globalement bons »)

| Poste | Fourchette | Médiane | Unité | Statut |
|---|---|---|---|---|
| Packshot fond blanc | 15-40 € | **25 €** (18 € en lot de 100) | photo | ✅ validé |
| Packshot créatif | 30-80 € | **50 €** | photo | ✅ validé |
| Ghost mannequin / piqué | 24-80 € | **40 €** | photo | ✅ validé |
| Vue 360° | 80-150 € | **120 €** | produit | ✅ validé |
| Lifestyle avec mannequin | 80-200 € | **120 €** (journée studio 2 000-5 000 €) | look | ✅ validé |
| Photographe salarié (coût employeur) | 3 500-4 800 € | **4 000 €** | mois | ✅ validé |
| ~~Journée shooting presta~~ | — | — | — | ❌ RETIRÉE (Seb 06/08) |

### Grille sectorielle packshot (données Seb 06/08/2026)

| Secteur | Médiane | Rapport qualité | Statut |
|---|---|---|---|
| Horlogerie / joaillerie / luxe | **60 €/photo** | ×0,5 à ×1,5 | ✅ validé |
| Cosmétique | **50 €/photo** | ×0,8 à ×1,5 | ✅ validé |
| Vins & spiritueux | **35 €/photo** | (fourchette indicative, médian seul acté) | ✅ validé |
| Mobilier / gros produits | **40 €/photo** | (fourchette indicative, médian seul acté) | ✅ validé |

Usage : le chat privilégie l'entrée sectorielle quand le secteur du client est connu, et peut
afficher ces tarifs à titre d'information utilisateur quand c'est pertinent.

## b) Gains par typologie de fonction — DRAFT maintenu pendant le rodage (décision Seb 06/08)

| Fonction | min/produit | €/produit | Statut |
|---|---|---|---|
| Mesure/pesée + capture données (MDC) | 8 min | 4 € | ✅ **VALIDÉ** (Seb 02/08, vMeasure/Cubiscan, plancher) |
| Packshot automatisé (vs manuel interne) | ~12 min | ~6 € | DRAFT — étiqueté « à confirmer » |
| 360° automatisé (vs presta) | — | 100 € | DRAFT — étiqueté « à confirmer » |
| Vidéo produit automatisée (vs presta) | — | 60 € | DRAFT — étiqueté « à confirmer » |
| Ghost mannequin automatisé (vs presta) | — | 30 € | DRAFT — étiqueté « à confirmer » |

Ces 4 drafts seront confrontés aux cas réels pendant le rodage interne, puis validés ou corrigés.
