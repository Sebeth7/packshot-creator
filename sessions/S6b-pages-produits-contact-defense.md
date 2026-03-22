# Session S6b : Pages secondaires batch 2 (Produits, Contact, Defense)

## Objectif
Appliquer le traitement UX/design "Studio Light" aux pages produits individuelles, contact et defense.

## Contexte
Tu es dans le dossier `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`.

Les pages produits `/studio-photo/[slug]` sont 16 pages individuelles pour chaque systeme Orbitvu.
Elles ont probablement un template partage (comme les packshot-*).

## Pages a traiter
1. `/fr/studio-photo/[slug]` (16 pages machines) — via leur template
2. `/fr/contact` — form qualifiant, trust bar
3. `/fr/industrie-defense` — logos/cas clients defense

## Methode
1. Identifier le template des pages produits (probablement dans components/ ou un layout)
2. Appliquer le meme redesign que PackshotLandingTemplate : stats ribbon, split layouts, dark sections
3. Pour Contact : ajouter questions de tri dans le form, renforcer la trust bar
4. Pour Defense : ajouter du contenu specifique (logos, cas clients, conformite)

## Fichiers modifiables
- `app/[lang]/studio-photo/**`
- `app/[lang]/contact/page.tsx`
- `app/[lang]/industrie-defense/page.tsx`
- Template des pages produits (a identifier)
- Cles de traduction UNIQUEMENT pour ces pages

## Fichiers INTERDITS
- Pages batch 1 (academy, blog, a-propos)
- Pages deja traitees (Home, Studios, IA, Industrie, packshot-*)

## Livrable
- Pages redesignees
- Build OK
- Rapport dans `sessions/S6b-rapport.md`
- Mise a jour PLAN_PROD.md
