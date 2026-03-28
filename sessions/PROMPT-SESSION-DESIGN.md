# Prompt generique — Session design de page

> Copier le bloc ci-dessous et remplacer [PAGE] et [CHEMIN].

---

```
Tu travailles sur le site PackshotCreator — distributeur exclusif Orbitvu (systemes photo automatises) pour la France et la Suisse.

- Framework : Next.js App Router, next-intl (FR/EN), Tailwind CSS v4, Framer Motion
- URL : https://sysnext.vercel.app/fr
- Dossier : /Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator

## Skills a activer

- `/frontend-design` — Design UI premium, anti-generique. A utiliser pour CHAQUE modification de section.
- `/page-cro` — Valider que les choix de layout servent la conversion. A utiliser quand tu finalises une section.
- `/copywriting` — Si le copy doit etre ajuste en meme temps que le layout.

## Ta mission

Ameliorer le DESIGN de la page : [PAGE]
Fichier : [CHEMIN]

IMPORTANT — Tu ameliores le design visuel des sections EXISTANTES. Tu ne changes PAS la structure de la page. Tu ne supprimes pas de sections. Tu n'ajoutes pas de sections. Tu n'inventes pas de contenu.

## Methode — Suivre EXACTEMENT dans cet ordre

### Etape 1 — Lire les documents de reference
1. Lis `design-system.md` a la racine — principes design, techniques premium, anti-patterns.
2. Lis `sessions/TEMPLATE-SESSION-DESIGN.md` — methode de travail detaillee.

### Etape 2 — Analyse visuelle de la Home (OBLIGATOIRE)
La Home (`app/[lang]/page.tsx`) a ete redesignee avec les techniques Apple. Tu dois la VOIR, pas juste la lire.
1. Navigue sur https://sysnext.vercel.app/fr/ dans Chrome
2. Scrolle lentement du haut en bas, prends des screenshots
3. Analyse section par section : comment les principes du design-system sont concretement appliques (labels, titres display, bold selectif, animations, fonds, images)
4. NOTE ce que tu observes — c'est ta reference visuelle de qualite

### Etape 3 — Analyse visuelle d'Apple (OBLIGATOIRE)
Tu dois construire ta propre comprehension des techniques Apple. Ne te fie pas uniquement aux descriptions du design-system.
1. Navigue sur https://www.apple.com/fr/ — scrolle, observe la home (bento grid, hierarchie, respiration)
2. Navigue sur https://www.apple.com/fr/iphone-17e/ — observe une page produit (label+titre+visuel, carrousel, bento asymetrique)
3. Pour chaque page : note les techniques de layout, typographie, image sizing, contraste de fonds, animations
4. Compare avec notre site : identifie les ecarts et les opportunites pour ta page

### Etape 4 — Audit visuel de ta page (OBLIGATOIRE)
1. Navigue sur https://sysnext.vercel.app/fr/[PAGE] dans Chrome
2. Scrolle lentement, prends des screenshots de chaque section
3. Lis le fichier source + traductions FR
4. Produis un diagnostic ECRIT : pour chaque section, note ce qui marche, ce qui ne marche pas, et comment l'ameliorer en appliquant les techniques Apple que tu as observees

### Etape 5 — Verifier et corriger la documentation
Compare ce que tu as observe (Home + Apple + ta page) avec ce que dit le design-system.md :
- Si une regle du design-system est incorrecte ou incomplete, CORRIGE-LA
- Si une technique que tu as observee sur la Home ou Apple n'est pas documentee, AJOUTE-LA
- Si un anti-pattern n'est pas liste, AJOUTE-LE
- Commit les corrections au design-system.md AVANT de travailler sur ta page

### Etape 6 — Plan (OBLIGATOIRE AVANT d'implementer)
Presente-moi un plan section par section AVANT de coder quoi que ce soit :
- Section X : etat actuel / modifications prevues / ce que je ne touche pas
Attends mon feu vert.

### Etape 7 — Implementation
Apres validation, pour chaque section existante :
- Labels categorie si absents
- Titres en taille display (text-4xl lg:text-6xl)
- Bold selectif dans les paragraphes (t.rich avec <bold>)
- Rythme narratif des fonds (pas 2 fonds identiques consecutifs)
- Animations variees (directions left/right, scale-in sur visuels, AnimatedCounter sur stats)
- Spacing correct (py-20 lg:py-32)
- Placeholders d'images la ou une zone vide beneficierait d'un visuel (voir design-system section 5.3)
- Mettre a jour traductions FR et EN

### Etape 8 — Build et livraison
npm run build (zero erreur). Commit + push.

## Regles strictes

- Ne JAMAIS ajouter de sections qui n'existent pas dans la page
- Ne JAMAIS inventer de contenu (chiffres, textes, paragraphes)
- Ne JAMAIS copier les sections de la Home (Pain Points, Breather, etc.)
- Terminologie : "systemes" (jamais "machines"), "Photo studio + IA", BlendAI.studio
- type="button" sur tout Button dans un form (sauf submit)
- Ne JAMAIS lancer le dev server sans demander
- Ne JAMAIS utiliser le CLI Vercel
- Traductions toujours FR + EN synchronisees
```
