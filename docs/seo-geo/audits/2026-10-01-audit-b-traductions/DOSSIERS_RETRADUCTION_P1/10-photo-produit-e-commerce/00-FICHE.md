# Fiche — famille 670e262cabb4626493da23e4

Dossier de retraduction P1 (audit B, 01/10/2026). Sujet : dix conseils pratiques pour réussir ses photos produit e-commerce (principes du packshot, nombre d'images, angles, détails, lifestyle, installation, dimensions, optimisation web, SEO, matériel), suivis d'une FAQ orientée studios Orbitvu.

## Identité

| Langue | URL | Fichier source | Slug |
|---|---|---|---|
| FR | https://www.packshot-creator.com/fr/blog/comment-avoir-meilleure-photo-produit-e-commerce | `content/blog/fr/comment-avoir-meilleure-photo-produit-e-commerce.json` | conservé |
| EN | https://www.packshot-creator.com/en/blog/how-to-e-commerce-product-photography | `content/blog/en/how-to-e-commerce-product-photography.json` | conservé |
| de-ch | aucune version | — | — |

- Identifiant Webflow : `670e262cabb4626493da23e4` (item créé vers le 15/10/2024 d'après l'horodatage de l'ObjectId, inférence) ; `date` affichée : 06/03/2024 ; `dateModified` : absente.
- Catégorie : E-commerce ; temps de lecture : 7 min ; auteur affiché : « PackshotCreator » (« Laurent Wainberg » à l'import, voir `06`, point 11).
- Correspondance des langues : `content/blog/alternates.json`, clé `670e262cabb4626493da23e4` (fr / en).
- Historique depuis l'import Webflow `56d4bc32` (18/04/2026) : `44d780f1` (images rapatriées du CDN Webflow, FR et EN), `8ae45f63` (auteur, FR et EN), `ed5dc135` (FR : lien « animation à 360 degrés » vers `/fr/studio-photo/selecteur-machines`), `3cfa2e73` (FR et EN : lien « secteur du mobilier » vers `/industrie/mobilier-decoration`), `1ebb469c` (EN : lien « 360 degree animation » vers `/en/studios-photo-automatises`). Le texte lui-même n'a pas changé depuis l'import : seuls des liens, des chemins d'images et l'auteur ont été modifiés.
- Anciennes URL redirigées vers la page FR dans le Worker du dépôt : `/comment-avoir-meilleure-photo-produit-e-commerce`, `/fr/focus-sur-les-photos-e-commerce-0`, `/articles/focus-sur-les-photos-e-commerce-0`, `/guide-photo-ecommerce-2018`.
- PR concernée : aucune PR ouverte ne modifie cette famille (information fournie le 01/10/2026).

## Trafic (Search Console, fourni pour ce dossier)

| Périmètre | Clics 365 j | Impressions 90 j | Position moyenne |
|---|---|---|---|
| Famille | 149 | — | — |
| FR | 47 (dont 38 sur l'ancienne URL Webflow) | 4 327 | 16,8 |
| EN | 102 | 3 140 | 60,0 |

Requêtes principales (365 jours, `GSC_REQUETES_P1.md`) :

- FR : « photo produit » (520 impressions, position 14,6), « photo produit e-commerce » (478 ; 14,7), « photo e commerce » (412 ; 14,6), « photo pour vente en ligne » (354 ; 11,0), « photo e-commerce astuces » (263 ; 4,7), « photographe produit e commerce » (236 ; 23,6). Aucun clic sur ces requêtes.
- EN : « product photography for ecommerce » (819 ; 59,3), « ecommerce product photography » (631 ; 61,9), « e commerce product photography » (468 ; 17,4), « photography for ecommerce » (438 ; 32,9), « e commerce photography » (431 ; 16,2).

## Origine linguistique

**FR → EN, établie par preuve interne** (revue linguistique, vérifiée contre `01-TEXTE_ACTUEL.md`).

Indices dans la version EN :

- déterminant français resté tel quel : « La quality of your visuals can play a decisive role » ;
- « she returns it desirable, clear and incurring » : « elle le rend désirable, clair et engageant » mal lu (« rend » pris pour « rendre », « engageant » rendu par « incurring ») ;
- « One 360 degree animation » (« Une » rendu par « One ») ; « Is of Show how the product is installed » (« est de montrer ») ;
- « natural referencing or SEO (Search Engine Optimization) in English » : la mention « en anglais » du FR traduite telle quelle ;
- calques « product sheet » (fiche produit), « including here are » (dont voici), « Download a Sitemap » (Téléchargez une sitemap) ;
- les quatre textes alternatifs descriptifs de la version EN sont restés en français, et les liens Yoast SEO et Rank Math SEO visent fr.wordpress.org.

Les versions ES, DE et NL de l'ancien site Webflow n'ont pas été extraites ; elles ne changent pas ce constat.

## Verdict par langue

| Langue | Qualité (revue) | Verdict | Traitement proposé |
|---|---|---|---|
| FR | B | Français natif, clair, publiable après retouches locales : accords, prépositions, connecteurs, typographie, deux alts Webflow, claims à adoucir. | Retouches seulement (57 entrées, dont 2 majeures). |
| EN | D | Traduction automatique non relue : introduction incompréhensible, calques, majuscules parasites, mots collés réels (« tooptimize », « touse »), contresens (« Download a Sitemap », « cropping »), alts en français. | Retraduction complète depuis le FR corrigé (73 entrées, dont 1 bloquante et 25 majeures). |

## Résumé des décisions proposées

1. **FR** : corrections locales sans changement de sens ni de structure ; intertitres 2, 5, 7 et 9 harmonisés à l'impératif ; espace manquante « site.Voici » rétablie ; « Téléchargez une sitemap » devient « Soumettez un sitemap ».
2. **EN** : texte intégralement retraduit en anglais américain depuis le FR corrigé, avec « product photography for e-commerce » dans le chapeau et le `title`, et « e-commerce product photography » en tête du H1 et du `<title>`.
3. **Claims** : « infaillibles » / « foolproof » retirés ; garanties du point 10 et de la FAQ adoucies (« garantit » → « permet », « facilite », « aide à ») ; promesse « en quelques minutes seulement » conservée et soumise à Sébastien.
4. **Métadonnées** : metaTitle FR ramené à 58 caractères, descriptions FR et EN dans la cible 140-155, alts réécrits d'après les images (plus de valeurs `__wf_reserved_*`, plus d'alt français dans la page EN). Slugs conservés.
5. **Liens** : mêmes cibles, sauf deux changements soumis à Laurent : lien ajouté sur « guide plus poussé » (même guide que le point 1) et, en EN, liens Yoast SEO et Rank Math SEO vers wordpress.org.
6. **Auteur** : « PackshotCreator » conservé (remplacement délibéré, commit `8ae45f63`) ; décision Laurent et Sébastien.
7. **Rectification de la revue** : l'image du point 10 n'est pas différente entre FR et EN ; c'est le même fichier sous deux noms.

Fichiers du dossier : `01-TEXTE_ACTUEL.md`, `02-ORIGINAL_RETROUVE.md` (entrées), `03-ANOMALIES_ANNOTEES.md`, `04-PROPOSITION_FR.md`, `04-PROPOSITION_EN.md`, `05-METADONNEES_PROPOSEES.md`, `06-VALIDATION_HUMAINE.md` (18 points).
