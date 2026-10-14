# S16 — traduction EN des 3 articles · décision de conservation du contenu FR (Laurent, 14/10)

**Date** : 2026-10-14 · Claude de Laurent · Base `main` `2ae6e15` · **GO_MERGE = NO · PUBLICATION = NO**

## Arbitrage de Laurent (14/10) — remplace l'assainissement éditorial précédent

**Décision : conserver toutes les affirmations existantes du contenu FR.**
- Les 15 neutralisations éditoriales préparées plus tôt dans S16 sont **annulées** : les 3 fichiers FR sont **restaurés à l'identique de `main`** (diff FR vs `main` = 0).
- Aucune affirmation commerciale n'est supprimée, atténuée ni reformulée ; chiffres, superlatifs, garanties, dates et références produits d'origine **inchangés**.
- Ce n'est **pas** une validation factuelle des affirmations : c'est une décision de **conservation** du contenu FR existant. Les claims restent **de source non établie** (voir ci-dessous).
- Aucune question posée à Sébastien (indisponible) ; la question S16 (ex-Q27) n'a pas été publiée sur `main` et a été retirée de la branche.

## Travail technique réalisé : traduction EN

Traduction **fidèle** FR→EN des 3 articles encore en français sous `/en`, depuis la version FR restaurée (= `main`) :
- `content/blog/en/photographie-2d-de-produits.json`
- `content/blog/en/photographie-de-produits-a-360-degres-en-interne.json`
- `content/blog/en/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre.json`

Règles appliquées :
- Traduction de tout le texte français (corps HTML, `title`, `h1`, `description`, `alt`, `figcaption`), **y compris les affirmations commerciales**, sans les renforcer ni les supprimer (ex. « leader mondial » → « world leader », « 20 000 utilisateurs / 35 pays » → « 20,000 users in 35 countries », « garantissent » → « guarantee », « Depuis 2001 » → « Since 2001 »).
- HTML, `<figure>`, images (`src`, `alt` traduit), iframes, `[embed]`, classes et attributs : **préservés** ; balises en séquence identique (contrôle de parité).
- Liens internes : **déjà en `/en/`** dans les fichiers EN — conservés tels quels. Slugs et URL inchangés.
- `noindex` conservé : les 3 slugs restent dans `NOINDEX_EN_BLOG_SLUGS` → `/en/blog/<slug>` = `robots: index:false, follow:true`.

## Claims conservés — source non établie (trace)

Conservés tels quels dans FR **et** EN, **non vérifiés par une source primaire** dans cette mission (à ne pas présenter comme faits établis) :
- 2D : « leader mondial » / « world leader » ; « 20 000 utilisateurs dans 35 pays » / « 20,000 users in 35 countries » ; « plus de 70 brevets » / « more than 70 patents » ; superlatifs logiciel.
- 360° : « best-sellers » ; « Depuis 2001 » / « Since 2001 » (lié à l'arbitrage de date D33, hors périmètre) ; superlatifs résultats.
- 3D : « le flux de travail le plus rapide et le plus productif » / « the fastest and most productive workflow » ; « qualité d'image exceptionnelle » / « exceptional image quality ».

## Obstacles restants — à la seule PUBLICATION (hors de cette PR)

- Validation D42 de Sébastien **pour publier** (non requise pour le codage technique ; non sollicitée ici, Sébastien indisponible).
- Levée du `noindex` = gate D9 distinct (`GO_LEVEE_NOINDEX = NO`).
- GO_MERGE distinct de Laurent.

La présente PR livre les **3 traductions EN terminées** + cette trace d'arbitrage. Aucune publication, aucun merge.
