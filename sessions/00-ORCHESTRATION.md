# Plan d'orchestration des sessions

## Vue d'ensemble

```
PHASE 1 (parallele)
  ├── Session S1 : Audit images complet (READ-ONLY)
  └── Session S2 : Verification mobile + responsive (READ-ONLY)

PHASE 2 (parallele, apres Phase 1)
  ├── Session S3 : SEO Quick Wins (fichiers traduction + meta)
  ├── Session S4 : Contenu GEO (NOUVELLES pages)
  └── Seb : Generation images Banana 2 (hors Claude)

PHASE 3 (sequentiel, apres Phase 2)
  └── Session S5 : Integration images + layouts images (tous fichiers pages)

PHASE 4 (parallele, apres Phase 3)
  ├── Session S6a : Pages secondaires batch 1 (Academy, Blog, A propos)
  └── Session S6b : Pages secondaires batch 2 (produits /studio-photo/[slug], Contact, Defense)

PHASE 5 (sequentiel, apres Phase 4)
  └── Session S7 : Images batch 2 + polish final
```

## Zones de fichiers exclusives (anti-collision)

| Session | Fichiers MODIFIABLES | Fichiers INTERDITS |
|---------|---------------------|-------------------|
| S1 | `livrables/hero-assets-checklist.md` uniquement | Tout le code |
| S2 | Aucun (rapport .md dans sessions/) | Tout le code |
| S3 | `messages/fr.json`, `messages/en.json`, fichiers meta des pages existantes | Pas de nouveau contenu |
| S4 | NOUVELLES pages dans `app/[lang]/`, NOUVELLES cles dans messages/*.json | Pages existantes |
| S5 | Toutes les pages `app/[lang]/**`, `components/templates/`, `public/images/` | messages/*.json |
| S6a | `app/[lang]/academy/**`, `app/[lang]/blog/**`, `app/[lang]/a-propos/` | Pages batch 2 |
| S6b | `app/[lang]/studio-photo/**`, `app/[lang]/contact/`, `app/[lang]/industrie-defense/` | Pages batch 1 |

## Regles
- Les sessions READ-ONLY (S1, S2) peuvent tourner en parallele de TOUT
- S3 et S4 peuvent tourner en parallele car S3 touche les CLES EXISTANTES et S4 cree de NOUVELLES CLES
- S6a et S6b touchent des fichiers completement differents = parallelisables
- Toujours lire PLAN_PROD.md en debut de session
- Toujours mettre a jour PLAN_PROD.md en fin de session
