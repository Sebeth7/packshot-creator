# Session Design — Guide methodologique

> Ce document explique la METHODE de travail, pas les regles design (qui sont dans design-system.md).

## Regle d'or

**Tu ameliores le DESIGN des sections existantes. Tu ne changes PAS la structure de la page.**

- Ne PAS ajouter de nouvelles sections
- Ne PAS supprimer de sections
- Ne PAS inventer de contenu (chiffres, textes, paragraphes)
- Ne PAS copier les sections de la Home
- Si tu penses qu'une modification structurelle serait benefique, DEMANDE a l'utilisateur AVANT

**Ton scope** : layout, typographie, couleurs de fond, animations, labels categorie, bold selectif, placeholders d'images, spacing. C'est deja enorme.

---

## Phase 1 — Lecture (obligatoire, dans cet ordre)

1. `design-system.md` — les principes design, les couleurs, la typo, les animations, les anti-patterns
2. `app/[lang]/page.tsx` — la Home refaite, comme EXEMPLE d'implementation des principes (pas comme modele a copier)
3. Le fichier de ta page — comprendre la structure existante, les sections, le contenu
4. Les traductions FR de ta page dans `messages/fr.json` — comprendre le copy

---

## Phase 2 — Audit visuel (obligatoire, ne PAS sauter)

1. Naviguer sur la page deployee dans Chrome : `https://sysnext.vercel.app/fr/[PAGE]`
2. Scroller lentement du haut en bas
3. Prendre des screenshots de chaque section
4. **Produire un diagnostic ecrit** : pour CHAQUE section existante, noter :
   - Layout actuel
   - Ce qui fonctionne deja bien (ne pas toucher ce qui marche)
   - Ce qui viole les principes du design system
   - Comment l'ameliorer SANS changer la structure

Si Chrome timeout ou ne repond pas, insister (recharger, attendre). Ne JAMAIS sauter l'audit visuel.

---

## Phase 3 — Plan (obligatoire, AVANT d'implementer)

Presenter a l'utilisateur un plan section par section :

```
Section X — [Nom]
- Etat actuel : [description]
- Modifications prevues : [liste]
- Ce que je ne touche PAS : [ce qui marche deja]
```

**Attendre la validation** de l'utilisateur avant de commencer l'implementation.

Meme si le prompt dit "mode autonome", les modifications structurelles ou le contenu invente DOIVENT etre valides. L'autonomie porte sur l'execution du plan valide, pas sur les decisions de contenu.

---

## Phase 4 — Implementation

Pour chaque section existante, appliquer les principes du design-system :

### Checklist par section (ameliorations purement visuelles)

- [ ] **Label categorie** : ajouter si absent (`text-xs font-semibold uppercase tracking-[0.2em]`)
- [ ] **Titre** : passer en taille display si trop petit (`text-4xl lg:text-6xl`)
- [ ] **Bold selectif** : identifier 2-3 mots cles dans les paragraphes, passer en `t.rich()` avec balises `<bold>`
- [ ] **Fond** : verifier que 2 sections adjacentes n'ont pas le meme fond. Changer si necessaire (voir palette design-system section 2)
- [ ] **Animations** : varier les directions (pas tout "up"), ajouter scale-in sur les visuels, utiliser AnimatedCounter sur les stats
- [ ] **Spacing** : verifier `py-20 lg:py-32` sur les sections, `h-12`/`h-14` sur les CTAs
- [ ] **Layout** : si 2 sections consecutives ont le meme layout (ex: 2 grilles 3 colonnes), proposer de varier l'une d'elles
- [ ] **Images** : si une zone est vide et beneficierait d'un visuel, ajouter un placeholder

### Ce qui est INTERDIT sans validation
- Ajouter une section qui n'existe pas
- Supprimer une section
- Changer le contenu textuel (sauf ajout de balises `<bold>`)
- Inventer des chiffres ou des statistiques
- Modifier la navigation ou les liens

### Traductions
- Mettre a jour FR (labels, bold tags)
- Creer les equivalents EN
- Ne JAMAIS inventer de contenu — les labels sont descriptifs ("NOS STUDIOS", "FAQ"), pas creatifs

---

## Phase 5 — Verification

1. `npm run build` — zero erreur
2. Si possible, naviguer sur la page deployee et verifier le rendu
3. Commit + push avec message descriptif

---

## Inspiration Apple (usage occasionnel)

Consulter les pages Apple SEULEMENT si tu as besoin d'inspiration pour un layout specifique que le design-system ne couvre pas. Le but est de comprendre les PRINCIPES Apple (hierarchie, respiration, variete), pas de copier leurs sections.

- `https://www.apple.com/fr/` — Bento grid, variete de tuiles
- `https://www.apple.com/fr/iphone-17e/` — Label+titre+visuel, bento asymetrique
- `https://www.apple.com/fr/macbook-pro/` — Fond noir, typo geante, stats animees

**ATTENTION** : Apple est un site B2C de produits grand public. Nous sommes un site B2B de solutions industrielles. L'inspiration est dans la TECHNIQUE (typo, layout, animation), pas dans le TON ou la STRUCTURE.
