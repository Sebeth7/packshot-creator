# Prompt generique — Session design de page

> Copier le bloc ci-dessous et remplacer [PAGE] et [CHEMIN].

---

```
Tu travailles sur le site PackshotCreator — distributeur exclusif Orbitvu (systemes photo automatises) pour la France et la Suisse.

- Framework : Next.js App Router, next-intl (FR/EN), Tailwind CSS v4, Framer Motion
- URL : https://sysnext.vercel.app/fr
- Dossier : /Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator

## Ta mission

Ameliorer le DESIGN de la page : [PAGE]
Fichier : [CHEMIN]

IMPORTANT — Tu ameliores le design visuel des sections EXISTANTES. Tu ne changes PAS la structure de la page. Tu ne supprimes pas de sections. Tu n'ajoutes pas de sections. Tu n'inventes pas de contenu.

## Methode — Suivre EXACTEMENT dans cet ordre

### Etape 1 — Lire les documents de reference
1. Lis `design-system.md` a la racine — ce sont les principes design (couleurs, typo, animations, anti-patterns). Les patterns decrits sont des outils, PAS une checklist.
2. Lis `sessions/TEMPLATE-SESSION-DESIGN.md` — c'est ta methode de travail.
3. Lis `app/[lang]/page.tsx` (la Home) — c'est un EXEMPLE d'implementation, PAS un modele a copier.
4. Lis le fichier de ta page + ses traductions FR dans messages/fr.json.

### Etape 2 — Audit visuel (OBLIGATOIRE)
1. Navigue sur https://sysnext.vercel.app/fr/[PAGE] dans Chrome
2. Scrolle lentement du haut en bas, prends des screenshots de chaque section
3. Produis un diagnostic ECRIT : pour chaque section, note ce qui marche, ce qui ne marche pas, et ce que tu ferais pour l'ameliorer

### Etape 3 — Plan (OBLIGATOIRE AVANT d'implementer)
Presente-moi un plan section par section AVANT de coder quoi que ce soit :
- Section X : modifications prevues / ce que je ne touche pas
Attends mon feu vert.

### Etape 4 — Implementation
Pour chaque section existante, appliquer les principes du design-system :
- Labels categorie si absents
- Titres en taille display (text-4xl lg:text-6xl)
- Bold selectif dans les paragraphes (t.rich avec <bold>)
- Rythme narratif des fonds (pas 2 fonds identiques consecutifs)
- Animations variees (directions left/right, scale-in sur visuels, AnimatedCounter sur stats)
- Spacing correct (py-20 lg:py-32)
- Placeholders d'images la ou une zone vide beneficierait d'un visuel
- Mettre a jour traductions FR et EN

### Etape 5 — Build et livraison
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
