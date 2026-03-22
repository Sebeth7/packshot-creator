# Session S1 : Audit images complet

## Objectif
Parcourir TOUTES les pages du site via le browser (sysnext.vercel.app) et produire un inventaire exhaustif des besoins images, section par section.

## Contexte
Tu es dans le dossier `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`.

Le site PackshotCreator a ete redesigne avec un concept "Studio Light" (layouts varies, composants motion). Beaucoup de sections manquent d'images. Le but est de produire un document de specs pour que le proprietaire genere les images lui-meme.

## Methode de travail
1. Lire d'abord `PLAN_PROD.md` (sections 0 et 2) pour comprendre l'etat actuel
2. Lire `livrables/hero-assets-checklist.md` pour voir l'inventaire existant
3. Pour CHAQUE page listee ci-dessous :
   a. Naviguer sur `https://sysnext.vercel.app/fr/{path}`
   b. Scroller section par section, prendre un screenshot de chaque
   c. Pour chaque section, determiner :
      - A-t-elle deja une image ?
      - Si non, en a-t-elle besoin ? (ne pas en mettre partout, garder aere)
      - Type recommande : **A** (AVIF transparent flottant avec ombre), **B** (photo full-width arriere-plan), **C** (pas d'image)
      - Description du visuel a creer
      - Dimensions recommandees
      - Nom de fichier propose

## Types d'images
- **Type A** : AVIF transparent (fond transparent + ombre portee). Pour elements qui "flottent" dans le layout. Ex: un studio photo detoure avec ombre. Supporte les animations motion (SpringCard, ScrollReveal).
- **Type B** : Photo full-width arriere-plan de section (comme le hero Home avec sa video). L'image passe derriere le texte/contenu.
- **Type C** : Pas d'image necessaire. La section est assez aeree/impactante sans.

## Pages a auditer (dans cet ordre)
1. `/fr` (Home) — DEJA FAIT partiellement, a completer
2. `/fr/studios-photo-automatises`
3. `/fr/ia-photo-produit`
4. `/fr/industrie`
5. `/fr/packshot-bijoux`
6. `/fr/packshot-mode`
7. `/fr/packshot-e-commerce`
8. `/fr/packshot-amazon`
9. `/fr/packshot-industriel`
10. `/fr/academy`
11. `/fr/contact`
12. `/fr/a-propos`
13. `/fr/industrie-defense`
14. `/fr/studio-photo/alphashot-micro-v2` (une page produit representative)

## Decisions deja prises (Home)
- S1 Hero : OK (video)
- S2 Social Proof : C (pas d'image)
- S3 Pain Points : C (pas d'image, garder aere)
- S4 Hybrid : A (AVIF transparent dans le heading sticky)
- S5 Product Spotlight : OK (Alphashot + mini gallery). Possibilite de remplacer mini gallery par AVIF transparents
- S6 Temoignages : C (pas d'image, garder aere)
- S7 Pourquoi automatiser : A ou B (a decider selon rendu)
- S8 Industries : possibilite de remplacer icones par mini photos produit AVIF transparent
- S9 Mid CTA : B (photo full-width arriere-plan)
- S10 FAQ : C (optionnel)
- S11 Final CTA : A ou B (a decider)

## Livrable
Mettre a jour le fichier `livrables/hero-assets-checklist.md` avec :
- Les nouvelles sections identifiees
- Le type (A/B/C) pour chaque
- Les specs de generation (dimensions, description du visuel, nom de fichier)
- Le statut "A GENERER" pour les nouvelles images

## Contraintes
- Cette session est READ-ONLY sur le code. Ne modifier AUCUN fichier .tsx/.json
- Seul fichier modifiable : `livrables/hero-assets-checklist.md`
- Ne PAS generer d'images. Produire uniquement les specs.
- Format AVIF pour tout. Les images transparentes sont en AVIF (pas PNG).
- Poids max : 50KB pour les illustrations, 80KB pour les backgrounds full-width
