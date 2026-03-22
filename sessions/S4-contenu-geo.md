# Session S4 : Contenu GEO prioritaire

## Objectif
Creer 2 pages de contenu strategique pour le SEO/GEO :
1. Article "Studio automatise + IA vs IA generative pure"
2. Page "Quel budget pour un studio photo automatise ?"

## Contexte
Tu es dans le dossier `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`.

PackshotCreator est ABSENT TOTAL sur la requete "photo produit IA" — captee par Claid, Flair, Pebblely.
Aucune page ne repond a l'intention pricing ("studio photo automatique prix").
Ces 2 contenus sont identifies comme GEO Tier 1 dans PLAN_PROD.md section 3.6.

## Decisions cles a respecter
- "systemes" pas "machines"
- "Packshot pro + IA" pas "hybride"
- BlendAI.studio = solution proprietaire customisable
- Le contenu doit etre LLM-friendly : comprehensible par ChatGPT, Perplexity, Claude
- Triple vocation : LLM-friendly + SEO + Conversion

## Methode
1. Lire PLAN_PROD.md sections 1, 3.2, 3.4, 3.6
2. Lire la page IA existante pour comprendre le positionnement
3. Creer les pages avec le design "Studio Light" (layouts varies, TextReveal, ScrollReveal, SpringCard)
4. Ajouter les traductions FR + EN
5. Ajouter Schema.org (Article, FAQPage)
6. Ajouter les routes et le maillage interne

## Fichiers modifiables
- NOUVEAUX fichiers dans `app/[lang]/blog/` ou `app/[lang]/` (nouvelles pages)
- NOUVELLES cles dans `messages/fr.json` et `messages/en.json` (ajouter a la fin, ne pas modifier l'existant)
- `app/[lang]/layout.tsx` ou navigation si besoin d'ajouter les liens

## Fichiers INTERDITS
- Pages existantes (Home, Studios, IA, Industrie, packshot-*)
- Cles de traduction existantes

## Livrable
- 2 pages creees, build OK
- Schema.org en place
- Rapport dans `sessions/S4-rapport-geo.md`
- Mise a jour PLAN_PROD.md
