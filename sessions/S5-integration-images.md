# Session S5 : Integration images

## Objectif
Integrer les images generees par Seb dans le code. Modifier les layouts pour accueillir les types A (transparent flottant) et B (full-width background).

## Prerequis
- Session S1 terminee (audit images = specs dans hero-assets-checklist.md)
- Seb a genere les images et les a placees dans `public/images/`
- Session S2 terminee (fixes responsive si necessaire)

## Contexte
Tu es dans le dossier `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`.

## Methode
1. Lire `livrables/hero-assets-checklist.md` pour voir la liste des images et leurs emplacements
2. Verifier que les images sont presentes dans `public/images/`
3. Pour chaque image de type A (transparent flottant) :
   - Utiliser `<Image>` Next.js avec les bonnes dimensions
   - Wrapper dans un composant motion si appropriate (SpringCard pour hover, ScrollReveal pour parallax)
   - Pas de border-radius ni overflow-hidden (l'image flotte avec son ombre)
4. Pour chaque image de type B (full-width background) :
   - Utiliser `<Image fill>` en position absolute derriere le contenu
   - Ajouter un overlay si necessaire pour la lisibilite du texte
   - object-cover pour le cadrage
5. Convertir en AVIF si les images fournies sont en PNG
6. Optimiser les poids (sharp, quality 60-70)

## Fichiers modifiables
- Tous les fichiers `app/[lang]/**/*.tsx`
- `components/templates/PackshotLandingTemplate.tsx`
- `public/images/**` (ajout/optimisation d'images)

## Fichiers INTERDITS
- `messages/fr.json`, `messages/en.json` (pas de changement de traductions)

## Livrable
- Toutes les images integrees
- Build OK
- Rapport dans `sessions/S5-rapport-images.md`
- Mise a jour hero-assets-checklist.md (statuts "A GENERER" → "EN PLACE")
- Mise a jour PLAN_PROD.md
