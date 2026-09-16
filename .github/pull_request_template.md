<!--
Gabarit imposé. Une PR incomplète n'est pas relisible et ne se merge pas.
Procédure complète : docs/seo-geo/02-PROCEDURE.md
-->

## Quoi

<!-- Ce qui change, en une ou deux phrases. -->

## Pourquoi

<!-- Le constat ou la mesure qui le justifie. Chiffré si possible.
     Référence au chantier : docs/seo-geo/06-CHANTIERS.md, ex. « C5 ». -->

## Effet SEO attendu

<!-- Ce qui devrait bouger, et sous quel délai.
     Une PR sans effet mesurable attendu n'est pas prête : si on ne sait pas ce
     que le changement doit produire, on ne saura pas non plus s'il a marché. -->

## Risque

<!-- Ce qui peut casser, et comment on le verrait. -->

## Rollback

<!-- La commande exacte pour revenir en arrière.
     git revert <sha> -m 1 && git push origin main -->

---

## Zone

- [ ] **Verte** — je merge après CI verte et Preview contrôlée
- [ ] **Orange** — j'attends l'arbitrage de Sébastien, je ne merge pas
- [ ] **Rouge** — ne devrait pas arriver : passer par `docs/seo-geo/BOITE-AUX-LETTRES.md`

## Contrôles

- [ ] `npx tsc --noEmit` vert
- [ ] `npx next build` vert en local
- [ ] Specs Playwright concernées lancées sur le Preview
- [ ] Pages modifiées ouvertes dans un navigateur sur le Preview
- [ ] Entrée ajoutée à `docs/seo-geo/JOURNAL.md`
- [ ] `docs/seo-geo/ETAT.md` à jour

## Après le merge

- [ ] `node scripts/seo/smoke.mjs https://sysnext.vercel.app` dans les 15 minutes
- [ ] Pages modifiées contrôlées dans Chrome sur `www.packshot-creator.com`
- [ ] Résultat du contrôle reporté dans l'entrée du journal
