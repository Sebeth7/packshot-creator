# Fiche — famille 67d0561565ef40a9406f1bac · « Photographier une bague comme un professionnel en 8 étapes »

Audit B, dossier de retraduction P1, 01/10/2026. Base : `main` `17fc0b3`. Lecture seule du dépôt.

## Identité

| Élément | Valeur |
|---|---|
| ID famille (Webflow) | `67d0561565ef40a9406f1bac` (item créé le 11/03/2025 d'après l'ObjectId) |
| Sujet | Tutoriel en 8 étapes pour photographier une bague avec le studio Orbitvu Alphashot Micro Pro v2 (objectif macro, plateau transparent, adhésif, spots, réflecteurs, éclairage, retouche, plateau noir), suivi d'une FAQ productivité et ROI |
| FR | `https://www.packshot-creator.com/fr/blog/photographier-une-bague-comme-un-professionnel-en-8-etapes` — `content/blog/fr/photographier-une-bague-comme-un-professionnel-en-8-etapes.json` |
| EN | `https://www.packshot-creator.com/en/blog/8-steps-to-professional-jewelry-photography` — `content/blog/en/8-steps-to-professional-jewelry-photography.json` |
| de-ch | aucune version (`content/blog/alternates.json` : fr + en) |
| Date affichée / auteur | 11/04/2023 / « PackshotCreator » (import : « Laurent Wainberg », remplacé par `8ae45f63`) |
| Catégorie | Innovations |
| Maillage entrant (dépôt) | `data/content-maillage.ts` : article listé pour le secteur bijoux, tunnel vers `alphashot-micro-v2`, « Pour aller plus loin » de deux guides bijoux ; Worker : nombreuses anciennes URL redirigées vers l'EN, `/comment-photographier-bijoux-studio` vers le FR |
| PR concernée | aucune PR ouverte ne modifie cette famille |

## Trafic (GSC, fourni par la consigne)

| Périmètre | Clics 365 j | Détail | Impressions 90 j | Position moyenne |
|---|---|---|---|---|
| Famille | 365 | — | — | — |
| FR | 86 | dont 80 sur l'ancienne URL Webflow | 863 | 19,9 |
| EN | 279 | dont 122 sur d'anciennes URL redirigées | 3 124 | 15,0 |

L'EN porte 76 % des clics de la famille. Requêtes à préserver (`GSC_REQUETES_P1.md`) : EN « professional jewelry photography » (487 impr.), « how to photograph rings » (310), « ring photography » (270), « ring product photography », « how to take ring photo », « how to take pictures of rings » ; FR « photo bague » (135), « bague photo » (97), « photographie bijoux », « shooting photo bijoux », « packshot bijoux ».

## Origine linguistique et preuve

- **Sens de traduction : FR → EN, établi par preuve interne** (revue, vérifiée sur le HTML) :
  - mots français restés dans l'EN : « **Les** reflections of light », « **La** precision And the clearness », « photos **Uniques** », « appear **Net** and Brilliant » ;
  - contresens typiques d'une traduction automatique depuis le français : « intensité » → *loudness*, « jaunes » → *yolks*, « pièce » → *room*, « objectif » → *purpose* et *objective*, « professionnelle » → *occupational*, « matières » → *Subjects* ;
  - preuve structurelle : 20 articles anglais collés à la balise suivante (19 `mot<strong>`, 1 `the<a>`), exactement là où le FR a une élision (`l'<strong>éclat</strong>` → `the<strong>sheen</strong>`) : la traduction a été faite sur le HTML français ;
  - 7 textes alternatifs sur 8 restés en français dans l'EN.
- **Source primaire du FR : SOURCE ORIGINALE NON ÉTABLIE pour une partie du texte.** La section « Présentation vidéo » contient des calques de l'anglais (« caméra », « la solution », « spotlight », « objectif 100mm macro », « appareils photo sans miroir ») qui laissent penser qu'elle adapte un texte anglais (documentation Orbitvu ?), et la FAQ porte un artefact d'outil (« détails36 »). Aucune source n'est conservée dans le dépôt ni dans l'import Webflow (`56d4bc32`) ; les versions ES, DE et NL de l'ancien site n'ont pas été extraites.
- **Historique** : texte inchangé depuis l'import Webflow, hormis les cibles de liens (maillage `ed5dc135`, `1ebb469c`), la migration des images (`44d780f1`) et l'auteur (`8ae45f63`). Aucun nom de personne remplacé dans le corps.

## Verdict par langue

| Langue | Qualité (revue) | Verdict | Traitement proposé |
|---|---|---|---|
| FR | C | Français globalement natif mais texte publicitaire redondant ; 2 phrases agrammaticales (étape 5), 1 phrase illogique (Superfocus), 1 phrase sans sens (« interaction virtuelle »), contradiction interne (« unique pour maintenir » contre étape 3), 3 noms pour le même produit, calques, artefact « détails36 », chiffre de capacité en désaccord avec le catalogue | **Réécriture partielle** : `04-PROPOSITION_FR.md` |
| EN | D | Traduction automatique brute non relue : mots français, contresens, majuscules parasites, 20 mots collés, phrases incompréhensibles, 7 alt en français et 1 alt réservé | **Retraduction intégrale** depuis le FR corrigé : `04-PROPOSITION_EN.md` |
| de-ch | — | Pas de version | — |

## Résumé des décisions proposées

1. **FR** : correction de la syntaxe, des calques et de la typographie ; nom unique « Alphashot Micro Pro v2 » ; « plateau noir » partout à l'étape 8 ; phrase « interaction virtuelle » retirée et marquée `[À VALIDER]` ; claims adoucis sans jamais être renforcés (« unique pour maintenir », « garantir », « précision inégalée », « augmente vos ventes », « garantit » en FAQ) ; claims non sourcés conservés et listés (150/jour contre 200 au catalogue, f/16-f/22, préréglages par matériau, USB Type-C, « exclusif ») ; gras ramené de 209 à environ 100 segments ; paragraphes vides Webflow supprimés.
2. **EN** : retraduction complète en anglais américain, fidèle au FR corrigé ; title et H1 « How to photograph rings like a pro in 8 steps », metaTitle « Ring photography: how to photograph rings in 8 steps », description portant « professional jewelry photography » ; 8 alt anglais.
3. **Métadonnées FR** : title, H1 et metaTitle inchangés ; description réécrite (le cadrage promis n'est pas traité).
4. **Slugs** : conservés tous les deux ; le slug EN, plus large que le sujet, porte la première requête EN et concentre les redirections (analyse en `05`).
5. **Liens et médias** : mêmes cibles (dont le lien EN vers une page industrie non indexée, signalé), mêmes `src` dans le même ordre, vidéo inchangée.
6. **À trancher** : 35 points dans `06-VALIDATION_HUMAINE.md`, dont la génération produit à confirmer auprès d'Orbitvu (l'Alphashot Micro Pro v2 reste au catalogue du site, donc non délisté côté site), l'image de montre hors sujet, l'auteur et la date.

## Fichiers du dossier

- `01-TEXTE_ACTUEL.md`, `02-ORIGINAL_RETROUVE.md` : entrées (non modifiées).
- `03-ANOMALIES_ANNOTEES.md` : 196 entrées (FR 68 + 3 métadonnées, EN 118 + 2 métadonnées, 5 globales).
- `04-PROPOSITION_FR.md`, `04-PROPOSITION_EN.md` : textes intégraux proposés.
- `05-METADONNEES_PROPOSEES.md` : métadonnées, alt, intertitres, analyse des slugs.
- `06-VALIDATION_HUMAINE.md` : 35 points de décision.
