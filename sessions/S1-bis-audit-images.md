# Session S1-bis : Audit images complet (rerun approfondi)

## Objectif
Parcourir TOUTES les pages du site section par section et produire un inventaire exhaustif des besoins images avec recommandation de type (A/B/C) pour chaque section.

Le premier audit (S1) etait incomplet : il couvrait 14 pages sur ~25, et les recommandations de type par section manquaient pour la plupart des pages. Ce S1-bis est un rerun COMPLET et approfondi.

## Contexte projet

**PackshotCreator** distribue les systemes photo automatises Orbitvu (leader mondial, fabrication europeenne) en France et Suisse. Le site a ete redesigne avec un concept "Studio Light" : chaque section a un layout unique (split sticky, bento grid, timeline, ruban stats, asymetrique). Les composants motion (TextReveal, ScrollReveal, SpringCard, FadeInView) sont utilises partout.

**URL du site** : `https://sysnext.vercel.app/fr`
**Dossier projet** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`

## Types d'images

- **Type A** : AVIF transparent (fond transparent + ombre portee). Pour elements qui "flottent" dans le layout. Ex : un studio photo detoure avec ombre. Fonctionne avec les animations motion (SpringCard, ScrollReveal). Poids max : 50 KB.
- **Type B** : Photo full-width arriere-plan de section. L'image passe derriere le texte/contenu avec overlay si necessaire. Poids max : 80 KB.
- **Type C** : Pas d'image necessaire. La section est assez impactante/aeree sans image. NE PAS mettre des images partout — garder le design epure.

**IMPORTANT** : Le type C est un choix valide et souhaitable pour beaucoup de sections. Un site professionnel et epure est l'objectif. Faire preuve de bon sens : une image ne doit etre recommandee que si elle apporte une vraie valeur (illustration d'un concept, credibilite, emotion).

## Methode de travail

Tu peux et tu DOIS utiliser des agents pour paralleliser l'audit. Voici l'approche :

1. Lire d'abord le fichier `livrables/hero-assets-checklist.md` pour connaitre l'etat actuel des images
2. Pour chaque page ci-dessous :
   a. Naviguer sur `https://sysnext.vercel.app/fr/{path}`
   b. Scroller section par section
   c. Pour CHAQUE section, noter :
      - Numero et nom de la section
      - A-t-elle deja une image ?
      - Si oui, est-elle appropriee ? (format, taille, pertinence)
      - Si non, en a-t-elle besoin ? → Type A, B ou C
      - Si A ou B : description du visuel a creer, dimensions recommandees, nom de fichier propose
3. Pour les pages qui utilisent un TEMPLATE (packshot-*, studio-photo/*), auditer le template + 1-2 pages representatives

## Pages a auditer

### Pages principales (audit individuel complet)
1. `/fr` (Home) — 11 sections. Refaire l'audit sans les biais pre-injectes par la session precedente
2. `/fr/studios-photo-automatises` — 10 sections. C'est la PAGE REFERENCE qualite
3. `/fr/ia-photo-produit` — 10 sections + cross-links
4. `/fr/industrie` — 8 sections + cross-links
5. `/fr/academy` — 6 sections + hero
6. `/fr/academy/formations-packshot` — 5 sections + hero
7. `/fr/academy/formations-ia` — 6 sections + hero
8. `/fr/contact` — 4 sections
9. `/fr/a-propos` — 6 sections + hero
10. `/fr/industrie-defense` — 10 sections

### Pages via template (audit du template + 1 representative)
11. `/fr/packshot-bijoux` (representatif du PackshotLandingTemplate, 7 sections)
12. `/fr/studio-photo/alphashot-pro-g2` (representatif des 16 pages produit, ~12 sections)

### Pages secteurs (spot-check 2-3 sur 14)
13. `/fr/industrie/cosmetiques`
14. `/fr/industrie/automobile`
15. `/fr/industrie/bijoux`

### NE PAS auditer
- Pages legales (CGU, confidentialite, mentions)
- Blog hub et articles (dynamiques Sanity/Webflow, hors scope)
- Guide hub et articles (Webflow, hors scope)
- Pages besoins-photographie-produit et questions-cles (reportees)
- Page calculateur et calculateur-roi (internes/utilitaires)

## Images deja en place (resume)

**Homepage** : hero responsive (5 variantes), 10 logos clients SVG, 3 piliers AVIF (1024x1024, ~25KB), 12 icones secteurs SVG, 1 machine (alphashot-pro-g2). MANQUANTES : 6 images galerie, 3 images "why automate".

**Studios** : hero responsive (5 variantes), 3 piliers AVIF (memes que Home).

**IA** : hero illustration pillar-ia, 4 before/after AVIF (cosmetiques + mode), 2 feature illustrations AVIF. 10 paires before/after supplementaires DISPONIBLES mais non utilisees dans le layout actuel (reliquats ancien design — ne pas les auditer, ce n'est pas pertinent).

**Industrie hub** : hero responsive (5 variantes).

**Secteurs x12** : hero par secteur responsive (5 variantes chacun) + 8 exemples produits AVIF.

**Machines** : 12 images machines AVIF + 5 placeholders SVG + 3 hero slides carousel.

**Academy, Contact, A propos, Blog** : hero images EXISTENT dans le dossier mais ne sont PAS utilisees dans le code actuel (reliquats ancien layout — ne pas recommander de les reutiliser).

## Livrable

Mettre a jour le fichier `livrables/hero-assets-checklist.md` en ajoutant pour CHAQUE page auditee :
- Un tableau section par section avec le type recommande (A/B/C)
- Pour les types A et B : description du visuel, dimensions, nom de fichier, priorite (HAUTE/MOYENNE/BASSE)
- Le statut : EN PLACE, A GENERER, ou PAS NECESSAIRE

Format recommande par page :

```
### Recommandations section par section

| # | Section | Type actuel | Recommandation | Description visuel | Dimensions | Fichier | Priorite |
|---|---------|-------------|----------------|-------------------|------------|---------|----------|
| 1 | Hero | Image EN PLACE | OK | - | - | - | - |
| 2 | Social Proof | Pas d'image | C (garder aere) | - | - | - | - |
| 3 | Pain Points | Pas d'image | A (AVIF transparent) | Illustration concept "time to market" | 800x800 | illustrations/pain-time.avif | MOYENNE |
```

## Contraintes
- Session READ-ONLY sur le code. Ne modifier AUCUN fichier .tsx/.json
- Seul fichier modifiable : `livrables/hero-assets-checklist.md`
- Ne PAS generer d'images. Produire uniquement les specs.
- Format AVIF pour tout (pas PNG).
- Les images seront generees par le proprietaire avec Banana 2 (Gemini)
- Faire preuve de BON SENS : un site epure et professionnel, pas de surcharge visuelle
