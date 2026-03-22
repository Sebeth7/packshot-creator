# Plan d'orchestration des sessions (v2 — 22/03/2026)

> Mis a jour par la session pilote apres audit complet du codebase et validation avec Seb.
> Changements vs v1 : S1-bis remplace S1, Blog hub hors scope, pages oubliees reportees, QW page-creation reportes, 4 articles GEO au lieu de 2.

## Vue d'ensemble

```
PHASE 1 (parallele) — AUDIT READ-ONLY
  ├── S1-bis : Audit images complet rerun (browser, agents, READ-ONLY)
  └── S2 : Verification mobile + responsive (browser, READ-ONLY)

PHASE 2 (parallele, apres Phase 1)
  ├── S3 : SEO Quick Wins (7 QW sur pages existantes)
  ├── S4 : Contenu GEO (4 articles statiques Next.js)
  └── Seb : Generation images Banana 2 (hors Claude, a partir du checklist S1-bis)

PHASE 3 (sequentiel, apres Phase 2 + images Seb)
  └── S5 : Integration images + redimensionnement blog

PHASE 4 (parallele, apres Phase 3)
  ├── S6a : Academy hub + Formations x2 + A propos (layout/design)
  └── S6b : Template produits x16 + Contact + Defense

PHASE 5 (sequentiel, apres Phase 4)
  └── S7 : Polish final + images batch 2 si necessaire
```

## Zones de fichiers exclusives (anti-collision)

| Session | Fichiers MODIFIABLES | Fichiers INTERDITS |
|---------|---------------------|-------------------|
| S1-bis | `livrables/hero-assets-checklist.md` uniquement | Tout le code |
| S2 | `sessions/S2-rapport-mobile.md` uniquement | Tout le code |
| S3 | `components/seo/SchemaOrg.tsx`, `app/[lang]/studio-photo/[slug]/page.tsx` (schema+badge), `app/[lang]/guide/[slug]/page.tsx` (schema FAQ), meta des pages existantes, `messages/*.json` (cles meta) | Pas de nouveau contenu, pas de layout |
| S4 | NOUVELLES pages dans `app/[lang]/blog/`, NOUVELLES cles dans `messages/*.json` | Pages existantes, cles existantes |
| S5 | Toutes les pages `app/[lang]/**/*.tsx`, `components/templates/`, `public/images/` | `messages/*.json`, `components/animations/`, `components/seo/` |
| S6a | `app/[lang]/academy/**`, `app/[lang]/a-propos/`, cles traduction de ces pages | Pages batch 2, pages traitees |
| S6b | `app/[lang]/studio-photo/[slug]/page.tsx`, `app/[lang]/contact/`, `app/[lang]/industrie-defense/`, `components/forms/PipedriveContactForm.tsx`, cles traduction de ces pages | Pages batch 1, pages traitees |

## Regles anti-collision

1. **S1-bis et S2** sont READ-ONLY → parallelisables entre elles et avec tout
2. **S3 et S4** sont parallelisables car :
   - S3 modifie des CLES EXISTANTES et des schemas
   - S4 cree de NOUVELLES CLES et de NOUVELLES PAGES
   - Aucun overlap sur les memes namespaces
3. **S5** touche potentiellement tous les fichiers pages → doit etre seule
4. **S6a et S6b** touchent des fichiers completement differents → parallelisables
5. **messages/*.json** : chaque session ne touche que les namespaces de SES pages
   - S3 : cles meta existantes (meta.title, meta.description)
   - S4 : nouvelles cles (blogStudioIa.*, blogBudget.*, blogPrestataire.*, blogComparatif.*)
   - S6a : academyHub.*, formation.*, about.*
   - S6b : studioProduct.* (nouveau), contact.*, industrieDefense.*

## Checklist par phase

### Phase 1
- [ ] S1-bis lance et termine → hero-assets-checklist.md mis a jour
- [ ] S2 lance et termine → S2-rapport-mobile.md cree
- [ ] Session pilote revoit les rapports S1-bis et S2

### Phase 2
- [ ] S3 lance → QW appliques, rapport cree
- [ ] S4 lance → 4 articles crees, build OK
- [ ] Seb genere les images avec Banana 2 a partir du checklist S1-bis
- [ ] Session pilote revoit les rapports S3 et S4

### Phase 3
- [ ] S5 lance (apres que Seb ait place les images dans public/images/)
- [ ] Session pilote verifie l'integration

### Phase 4
- [ ] S6a lance → Academy, Formations, A propos redesignes
- [ ] S6b lance → Template produit, Contact, Defense redesignes
- [ ] Session pilote revoit les 2 rapports

### Phase 5
- [ ] S7 : polish final, corrections, images supplementaires si besoin

## Hors scope (reporte)
- Blog hub (dynamique Sanity/Webflow)
- Pages besoins-photographie-produit, questions-cles, guide hub
- Pages legales (CGU, confidentialite, mentions)
- QW necessitant creation de pages (QW#8 packshot def, QW#10 workflow, QW#14 photo auto)
- QW#15 (non documente)
