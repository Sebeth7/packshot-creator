# Session Design — Guide methodologique

> Ce document explique la METHODE de travail, pas les regles design (qui sont dans design-system.md).
> Les etapes sont dans un ordre precis. Ne PAS sauter d'etape.

## Regle d'or

**Tu ameliores le DESIGN des sections existantes. Tu ne changes PAS la structure de la page.**

- Ne PAS ajouter de nouvelles sections
- Ne PAS supprimer de sections
- Ne PAS inventer de contenu (chiffres, textes, paragraphes)
- Ne PAS copier les sections de la Home
- Si tu penses qu'une modification structurelle serait benefique, DEMANDE a l'utilisateur AVANT

**Ton scope** : layout, typographie, couleurs de fond, animations, labels categorie, bold selectif, placeholders d'images, spacing. C'est deja enorme.

---

## Phase 1 — Lecture des documents

1. `design-system.md` — principes, couleurs, typo, animations, techniques premium, anti-patterns
2. Le fichier de ta page — comprendre la structure existante, les sections, le contenu
3. Les traductions FR de ta page dans `messages/fr.json` — comprendre le copy

---

## Phase 2 — Analyse visuelle de la Home (OBLIGATOIRE)

La Home est ta reference de qualite. Tu dois la VOIR dans Chrome, pas juste lire le code.

1. Naviguer sur `https://sysnext.vercel.app/fr/` dans Chrome
2. Scroller lentement du haut en bas, prendre des screenshots
3. Pour CHAQUE section, noter :
   - Le label categorie (texte, couleur, position)
   - La taille du titre (display ou non)
   - Le bold selectif dans les paragraphes
   - Le fond (quelle couleur, quel contraste avec la section precedente)
   - L'animation (direction, type, timing)
   - Les images (taille, position, ratio)
   - Le layout (split, grille, asymetrique, etc.)
4. Ceci devient ta reference visuelle. Tu dois atteindre CE niveau de qualite sur ta page.

**ATTENTION** : tu analyses la Home pour comprendre le NIVEAU DE QUALITE, pas pour copier ses sections. Chaque page a sa propre structure.

---

## Phase 3 — Analyse visuelle d'Apple (OBLIGATOIRE)

Tu dois construire ta propre comprehension des techniques Apple. Le design-system les decrit, mais tu dois les VOIR pour les comprendre.

1. Naviguer sur `https://www.apple.com/fr/` — observer la home
   - Comment les sections respirent (espaces, 1 idee par ecran)
   - Le bento grid (tuiles de tailles differentes, chacune avec son ambiance)
   - L'alternance fond clair / sombre
2. Naviguer sur `https://www.apple.com/fr/iphone-17e/` — observer une page produit
   - La hierarchie : label categorie → titre geant gradient → description → visuel immersif
   - Les tailles d'images (elles DOMINENT, le texte accompagne)
   - Le bold sur les mots cles dans les paragraphes
   - Les carrousels horizontaux de features
3. Pour chaque page, noter les techniques qui s'appliqueraient a TA page

**ATTENTION** : Apple est B2C grand public, nous sommes B2B industriel. Inspire-toi des TECHNIQUES (typo, layout, animation, images), pas du ton ou de la structure.

---

## Phase 4 — Audit visuel de ta page (OBLIGATOIRE)

1. Naviguer sur `https://sysnext.vercel.app/fr/[PAGE]` dans Chrome
2. Scroller lentement, prendre des screenshots de chaque section
3. **Produire un diagnostic ecrit** : pour CHAQUE section existante, noter :
   - Layout actuel
   - Ce qui fonctionne deja bien (ne PAS toucher ce qui marche)
   - Ce qui viole les principes du design system
   - Comment l'ameliorer en appliquant les techniques Apple observees
   - Ou des images/placeholders ajouteraient de la valeur

Si Chrome timeout ou ne repond pas, insister (recharger, attendre). Ne JAMAIS sauter l'audit visuel.

---

## Phase 5 — Auto-correction de la documentation

**Le design-system.md est un document vivant.** Apres avoir observe la Home, Apple, et ta page, verifie que la documentation est correcte et complete :

- Si une regle du design-system est incorrecte ou obsolete → **CORRIGE-LA**
- Si une technique que tu as observee n'est pas documentee → **AJOUTE-LA**
- Si un anti-pattern que tu as identifie n'est pas liste → **AJOUTE-LE**
- Si un exemple de code est faux → **CORRIGE-LE**

Commit les corrections au design-system.md AVANT de travailler sur ta page.
Cela permet aux sessions suivantes de beneficier de tes observations.

---

## Phase 6 — Plan (OBLIGATOIRE, AVANT d'implementer)

Presenter a l'utilisateur un plan section par section :

```
Section X — [Nom]
- Etat actuel : [description]
- Modifications prevues : [liste precise]
- Ce que je ne touche PAS : [ce qui marche deja]
- Images/placeholders a ajouter : [oui/non, ou]
```

**Attendre la validation** de l'utilisateur avant de commencer l'implementation.

---

## Phase 7 — Implementation

Pour chaque section existante, appliquer les principes du design-system :

### Checklist par section

- [ ] **Label categorie** : ajouter si absent (`text-xs font-semibold uppercase tracking-[0.2em]`)
- [ ] **Titre** : passer en taille display si trop petit (`text-4xl lg:text-6xl`)
- [ ] **Bold selectif** : identifier 2-3 mots cles dans les paragraphes, passer en `t.rich()` avec balises `<bold>`
- [ ] **Fond** : verifier que 2 sections adjacentes n'ont pas le meme fond. Changer si necessaire
- [ ] **Animations** : varier les directions (pas tout "up"), scale-in sur visuels, AnimatedCounter sur stats
- [ ] **Spacing** : verifier `py-20 lg:py-32` sur les sections, `h-12`/`h-14` sur les CTAs
- [ ] **Layout** : si 2 sections consecutives ont le meme layout, proposer de varier l'une d'elles (voir alternatives section 5.2 du design-system)
- [ ] **Images** : si une zone vide beneficierait d'un visuel, ajouter un placeholder (voir section 5.3 du design-system)
- [ ] **CTA final** : si la page a un CTA final avec 2 cartes, verifier que le contenu est DISTINCT entre les cartes (pas le meme titre/description)

### Ce qui est INTERDIT sans validation
- Ajouter une section qui n'existe pas
- Supprimer une section
- Changer le contenu textuel (sauf ajout de balises `<bold>`)
- Inventer des chiffres ou des statistiques
- Modifier la navigation ou les liens

### Traductions
- Mettre a jour FR (labels, bold tags)
- Creer les equivalents EN
- Ne JAMAIS inventer de contenu

---

## Phase 8 — Verification

1. `npm run build` — zero erreur
2. Naviguer sur la page deployee et verifier le rendu dans Chrome
3. Comparer avec les screenshots de l'audit initial : l'amelioration est-elle visible ?
4. Commit + push avec message descriptif

---

## Composants disponibles

```
AnimatedCounter — compteur anime whileInView (end, prefix, suffix, duration)
FadeInView — fade directionnel (direction: up/down/left/right, delay)
ScrollReveal — parallax Y + opacity au scroll (offset, scale: bool)
TextReveal — titre mot par mot (as: h1-h3, staggerSpeed)
SpringCard — micro-interactions hover/tap (hoverY, hoverScale)
StaggerContainer + StaggerItem — animations en cascade (stagger, direction)
HeroSection + HeroVideo/HeroBackground — hero reutilisable (layout, badge, ctas)
```
