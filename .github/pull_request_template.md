<!--
Procédure complète : docs/seo-geo/02-PROCEDURE.md
Carte des dépendances : docs/seo-geo/01-RAYON-ACTION.md
-->

## Quoi

<!-- Ce qui change, en une ou deux phrases. -->

## Pourquoi

<!-- Le constat ou la mesure qui le justifie. Chiffré si possible.
     Référence au chantier : docs/seo-geo/06-CHANTIERS.md, ex. « C5 ». -->

## Effet SEO attendu

<!-- Ce qui devrait bouger, et sous quel délai.
     Si on ne sait pas ce que le changement doit produire, on ne saura pas non
     plus s'il a marché. -->

## Rayon d'action

<!-- OBLIGATOIRE seulement si le diff touche un fichier à rayon large — le
     contrôle garde-consequences te dira lesquels, et ce qui en dépend.
     Un changement purement local peut supprimer cette section.

     Il ne s'agit pas de demander une permission : il s'agit d'avoir regardé
     avant d'agir. Quatre questions, quelques lignes chacune. -->

**Ce qui dépend de ce que je touche** —

**Ce qui casserait si je me trompe** —

**Comment je le verrais, et sous quel délai** —

**Comment je reviens en arrière** —

---

## Contrôles

- [ ] `npx tsc --noEmit` vert
- [ ] `npx next build` vert en local
- [ ] Specs Playwright concernées lancées sur le Preview
- [ ] Pages modifiées ouvertes dans un navigateur sur le Preview
- [ ] Entrée ajoutée à `docs/seo-geo/JOURNAL.md`
- [ ] `docs/seo-geo/ETAT.md` à jour

<!-- Si le changement touche la capture de leads (app/api, components/forms) :
     aucun test automatique ne la couvre. Envoyer un vrai formulaire depuis le
     Preview. Un lead perdu ne laisse aucune trace. -->

## Après le merge

- [ ] `node scripts/seo/smoke.mjs https://sysnext.vercel.app` dans les 15 minutes
- [ ] Pages modifiées contrôlées dans Chrome sur `www.packshot-creator.com`
- [ ] Résultat du contrôle reporté dans l'entrée du journal
