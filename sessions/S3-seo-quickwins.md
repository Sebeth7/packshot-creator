# Session S3 : SEO Quick Wins (13 restants)

## Objectif
Implementer les 13 quick wins SEO identifies mais non appliques. Potentiel : +325-655 clics/an.

## Contexte
Tu es dans le dossier `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`.

2 quick wins sur 15 ont deja ete appliques (QW#1 Homepage "packshot", QW#7 Hub IA "packshot logiciel").
Les 13 restants sont documentes dans les fichiers d'audit SEO.

## Methode
1. Lire `PLAN_PROD.md` sections 3.5 et 3.2 (mots-cles strategiques)
2. Lire les fichiers d'audit SEO :
   - Chercher dans `docs/` ou `livrables/` les fichiers GAP_ANALYSIS ou SEO
3. Pour chaque quick win :
   - Identifier le mot-cle cible et la page concernee
   - Modifier les meta title/description dans le code ou les traductions
   - Ajuster le H1/H2 si necessaire
   - Verifier que les changements ne cassent pas la version EN

## Fichiers modifiables
- `messages/fr.json` (cles meta existantes)
- `messages/en.json` (cles meta existantes)
- `app/[lang]/*/page.tsx` (uniquement les blocs generateMetadata)

## Fichiers INTERDITS
- Ne PAS modifier le contenu des sections (body)
- Ne PAS toucher aux layouts ou composants
- Ne PAS creer de nouvelles pages

## Livrable
- Les 13 quick wins appliques
- Liste des changements dans `sessions/S3-rapport-seo.md`
- Mise a jour de PLAN_PROD.md section 3.5
