# Référentiels du calculateur ROI conversationnel — DRAFTS à valider

**Statut : DRAFT — aucune entrée non validée ne sera présentée comme un chiffre certifié.**
Source de vérité technique : `lib/roiChat/referentiels.ts`. Ce document est la vue de validation
pour Seb : corriger les valeurs directement ici ou en séance, je répercute dans le code et je
passe les entrées en `status: 'valide'`.

Tant qu'une entrée est en DRAFT, le chat la présente comme « estimation de marché à confirmer »
(consigne verrouillée dans le system prompt + avertissement dans les retours de tools).

---

## a) Coûts de marché (baselines contrefactuelles)

Sourcé par benchmarks web août 2026 (prestataires FR : brique-lab.fr, packshot-paris.fr,
photographe-360.com, lestudiohonore.fr, eshopstudio.com ; salaires : Hellowork, FranceCV, Jooble).

| Poste | Fourchette | Médiane retenue | Unité | Statut |
|---|---|---|---|---|
| Packshot fond blanc (presta) | 15-40 € | **25 €** (18 € en lot de 100) | photo | DRAFT |
| Packshot créatif (presta) | 30-80 € | **50 €** | photo | DRAFT |
| Ghost mannequin / piqué (presta) | 24-80 € | **40 €** | photo | DRAFT |
| Vue 360° (presta) | 80-150 € | **120 €** | produit | DRAFT |
| Lifestyle avec mannequin | 80-200 € | **120 €** (journée studio 2 000-5 000 €) | look | DRAFT |
| Journée shooting presta (hors mannequin) | 800-2 000 € | **1 200 €** | jour | DRAFT |
| Photographe salarié (coût employeur) | 3 500-4 800 € | **4 000 €** | mois | DRAFT |

Notes :
- Retouche basique incluse dans la plupart des devis presta ; retouche créative +5-20 €/image.
- La médiane photographe salarié colle à la constante 4 000 €/mois du calculateur (cohérence voulue).

**Questions pour validation :**
1. Les médianes te semblent-elles justes par rapport à ce que tes clients paient réellement ?
2. Faut-il des fourchettes différentes par secteur (horlogerie vs e-commerce généraliste) ?
3. La ligne « journée shooting presta » est la moins sourcée — la garder, l'affiner ou la retirer ?

## b) Gains par typologie de fonction

| Fonction | min/produit | €/produit | Statut |
|---|---|---|---|
| Mesure/pesée + capture données (MDC) | 8 min | 4 € | ✅ **VALIDÉ** (Seb 02/08, vMeasure/Cubiscan, plancher) |
| Packshot automatisé (vs manuel interne) | ~12 min | ~6 € | DRAFT |
| 360° automatisé (vs presta) | — | 100 € | DRAFT |
| Vidéo produit automatisée (vs presta) | — | 60 € | DRAFT |
| Ghost mannequin automatisé (vs presta) | — | 30 € | DRAFT |

Notes :
- Packshot : hypothèse 15 min de prise de vue + retouche manuelle vs 2-3 min en machine
  (détourage auto). C'est une estimation interne, pas un benchmark — à valider ou corriger.
- 360°/vidéo/ghost : gains exprimés en « coût presta évité » (baseline contrefactuelle),
  valeurs prudentes sous la médiane du référentiel a).

**Questions pour validation :**
1. Le 12 min/produit du packshot manuel te paraît-il réaliste (ordre de grandeur constaté chez tes clients) ?
2. Vidéo : 60 €/produit est peu sourcé — as-tu des prix presta réels côté clients ?
3. D'autres fonctions à ajouter (flat-lay, mesures colorimétriques, IA génération de fonds…) ?

---

Après ta validation : je passe les entrées confirmées en `status: 'valide'` dans
`lib/roiChat/referentiels.ts` (une ligne à changer par entrée) et le chat cesse de les
étiqueter « à confirmer ».
