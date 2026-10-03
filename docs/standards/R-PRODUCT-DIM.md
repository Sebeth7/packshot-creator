# R-PRODUCT-DIM — Caractéristiques dimensionnelles des produits

**Décision** : D45 (`docs/seo-geo/DECISIONS.md`), Laurent, 03/10/2026.
**Statut** : principe approuvé le 03/10/2026 ; inscrit par #87 (brouillon au 03/10) ; appliqué à la fusion des PR de mise en œuvre : #83 (référentiel, contrôle) ; contrôle en CI : #86.
**Portée** : toute caractéristique dimensionnelle d'une machine affichée, calculée ou transmise par le site, dans les trois langues, quel que soit l'environnement Claude qui la modifie.
**Mise en œuvre** : référentiel `data/produits/fiches-techniques.ts` ; écarts connus `data/produits/ecarts-connus.ts` ; contrôle `lib/produits/__tests__/coherence-dimensions.test.ts` ; registre `docs/standards/registre-ecarts-dimensions.md` ; inventaire `npx tsx scripts/produits/inventaire-mentions.mts`.

---

## 1. Principe

Une caractéristique dimensionnelle produit possède une définition non ambiguë, une référence de version et une source traçable. Elle ne diverge pas entre les consommateurs du site. Quand elle est réutilisée, une donnée partagée est préférée à plusieurs valeurs saisies indépendamment.

Une contradiction non résolue reste inscrite comme telle. Une valeur fabricant supposée erronée n'est jamais corrigée automatiquement. Deux générations de produits ne sont jamais assimilées.

---

## 2. Définitions obligatoires

| Notion | Définition | Champ du référentiel | Unité |
|---|---|---|---|
| Dimensions maximales du produit photographiable | Plus grand objet que le studio accepte, selon le fabricant | `objetMax` (site : `psc.objetMax`) | cm |
| Encombrement extérieur de la machine | Dimensions du matériel, selon le fabricant | `machine` (site : `psc.encombrement`) | cm |
| Plateau | Diamètre du plateau tournant, quand le fabricant le donne | `plateauCm` | cm |
| Charge maximale | Poids maximal de l'objet, avec son type : objet, ponctuelle, surfacique | `charges[]` (site : `psc.chargeKg`) | kg |
| Ordre des axes | Convention : largeur × profondeur × hauteur quand le fabricant donne les axes (`axes: 'W×D×H'`) ; sinon triplet dans l'ordre de la source, `axes: 'non-precises'`, sans affectation | `axes` | — |
| Génération ou version commerciale | Nom PSC, nom fabricant, correspondance `etablie`, `non-etablie` ou `sans-source` | `nomPsc`, `fabricant.nom`, `version` | — |
| Source primaire | Page ou document du fabricant, recopié mot pour mot. Un fichier dérivé du code n'en est pas une | `fabricant.source.url`, `intitule` | — |
| Date de vérification | Date et heure du relevé | `fabricant.source.releveLe` | UTC |
| Statut de validation métier | `conforme` (correspondance numérique avec la fiche fabricant consultée ; ne valide pas la version commerciale), `ecart` (erreur démontrée, catégorie A), `a-arbitrer` (catégorie B), `non-verifiable` ; points de Q20 | `statuts`, `q20` | — |

Un nom PSC suffixé (« Pro v2 », « v2 ») et un nom fabricant sans suffixe ne sont réputés identiques qu'après validation écrite de Sébastien (même logique que D29 pour XL v2 / XL G2).

---

## 3. Règles d'écriture

1. Une dimension, une charge ou un encombrement ne change dans un catalogue de machines qu'avec la mise à jour du référentiel, de sa source et de sa date, dans le même commit, pour les deux catalogues.
2. Les messages des trois langues (landings, FAQ) portent les mêmes nombres que le référentiel ; le test le vérifie pour les tableaux et FAQ surveillés.
3. Quand la source ne donne pas les axes, l'affichage public garde l'ordre du fabricant et la mention « axes non précisés » (pratique de Mode).
4. Catégorie A (même produit, valeur du site différente de la source) : correction technique possible, avec source, tests et contrôle des consommateurs, après accord de Sébastien sur le périmètre (catalogues de machines : son périmètre).
5. Catégorie B (version non établie, sources contradictoires, source absente) : aucune valeur remplacée avant la réponse de Sébastien. Ne jamais recopier une fiche publique du fabricant sur un produit dont la version commerciale n'est pas établie.
6. Une valeur retirée est inscrite dans `VALEURS_RETIREES` ; le test empêche son retour (XXL 100 × 70 × 190 cm, retirée le 01/10/2026).
7. Une valeur d'une page sous mesure (F5 jusqu'au 23/11, Mode jusqu'au 26/11) attend la fin du gel, sauf décision contraire de Laurent.
8. La prose des articles (`content/blog/**`) n'est pas réécrite par le Claude de Laurent : les écarts y sont listés au registre et transmis à Sébastien (D42).
9. Aucune redirection XL n'est modifiée au titre de cette règle (D29).

---

## 4. Contrôle automatisé

`lib/produits/__tests__/coherence-dimensions.test.ts` (Vitest) échoue si :
- une machine d'un catalogue n'a pas de fiche au référentiel, ou l'inverse ;
- `dimensionsMax`, `studioFootprint` ou `poidsMaxKg` d'un catalogue diffère du référentiel ;
- `tailleMax` ou `poidsMax` diffère entre les deux catalogues, ou `tailleMax` contredit `dimensionsMax` ;
- une FAQ ou un chiffre clé de fiche (FAQ visible et FAQPage) cite une dimension étrangère à la fiche ;
- une ligne de tableau des landings Mode et F5, ou la FAQ XXL, contredit le référentiel, ou diffère entre FR, EN et de-ch ;
- un triplet des blocs surveillés n'appartient à aucune machine ;
- une valeur retirée réapparaît ;
- un statut du référentiel ne correspond pas aux valeurs en présence, ou une contradiction n'a pas de point de Q20 ;
- `evaluateMachine` n'accepte plus l'objet maximal d'une machine ou accepte 1 cm de plus ; XXL : 90 cm accepté, 91 refusé, rotation, 100 kg accepté, 101 refusé ;
- un écart commercial entre catalogues (catégories de taille, cadences) apparaît ou disparaît sans mise à jour de `ecarts-connus.ts`.

Détection prouvée le 03/10/2026 par trois mutations temporaires (6, 4 et 1 échecs).

Le contrôle bloque en CI une fois l'étape Vitest ajoutée à `pr-checks.yml` (PR CI).

---

## 5. Protocole en cas de contradiction

1. Inscrire les deux valeurs, leurs sources et leurs dates (référentiel, registre).
2. Ne modifier aucune valeur affichée.
3. Poser la question à Sébastien par `BOITE-AUX-LETTRES.md` (Q20 en cours au 03/10).
4. Après réponse : référentiel, deux catalogues, messages des trois langues, FAQ, registre, JOURNAL ; relancer Vitest.
5. Étape suivante, après arbitrage : les deux catalogues dérivent leurs dimensions du référentiel (suppression de la double saisie).
