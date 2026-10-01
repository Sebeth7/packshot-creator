# Validation humaine — famille 67e41233cb2c0c8643c00c89

Points qui exigent une décision avant toute publication. Décideurs pressentis : **Sébastien** (copywriting FR, faits commerciaux, produits, prix, conformité distributeur), **Laurent** (historique de la société, SEO), **les deux** (noms de personnes, témoignages). Les renvois `FR-xx` / `EN-xx` pointent vers `03-ANOMALIES_ANNOTEES.md`.

Ce que la famille ne contient pas : aucun prix, aucun témoignage client, aucun nom de personne dans le corps, aucune mention d'Orbitvu, de Shotflow ni de PackshotCreator dans le texte (la marque n'apparaît que dans le champ `author`). Pas de version de-ch.

---

1. **Validation du texte FR corrigé** — Sébastien.
   `04-PROPOSITION_FR.md` retouche la prose client-facing (33 anomalies FR, dont une majeure, l'alt Webflow). Les corrections restent proches de l'existant : typographie, grammaire (« Laissez-le respirer », « ce ne sont pas »), anglicismes de la FAQ, trois alts, un lien ajouté.
   *Si on ne tranche pas* : rien n'est publié ; le FR actuel reste en ligne avec ses défauts, et la retraduction EN, qui se recale sur le FR validé (D38, D42 étape 7), reste bloquée.

2. **Claims retirés des métadonnées** — Sébastien (promesse commerciale), Laurent (effet SEO).
   Retirés du `metaTitle` et de la `description` FR et EN : « 6 règles / 6 Framing Rules » et « 6 conseils essentiels / 6 essential tips » (le corps compte cinq sections de conseil, la 6e est un renvoi vers l'Alphashot Pro G2), « Images Qui Convertissent / Images That Convert » et « véritables outils de vente / real sales tools » (aucune donnée de conversion dans le texte). FR-01, FR-02, EN-02, EN-03.
   *Si on ne tranche pas* : les métadonnées actuelles restent, avec un `metaTitle` FR en Title Case de 76 caractères tronqué en SERP.

3. **Métadonnées EN de la langue la plus performante** — Laurent.
   L'EN porte 135 des 168 clics de la famille et son seul backlink. Proposé : `h1` « Product photography composition: framing rules that help you sell », `metaTitle` « Product Photography Rules: Framing and Composition Tips », nouvelle `description` (`05`). Ces valeurs placent « product photography rules » (636 impressions, position 12,6) et « product photography composition » (8 clics, position 7,1) en tête. Variantes conservatrices : garder le `metaTitle` actuel, qui est en anglais correct, et ne corriger que « composing » dans le `h1` (« Photo tips: framing and composition to sell »). À trancher aussi : les termes « thirds lines » et « power points » retenus pour « lignes de force » et « points forts » (EN-30, EN-34), plus usuels en anglais que les calques actuels.
   *Si on ne tranche pas* : on publie le corps EN retraduit avec le `metaTitle`, le `h1` et la `description` EN actuels ; c'est sans risque de classement, mais les claims de l'EN restent en place.

4. **Lien ajouté vers l'article chaussures** — Laurent (maillage), Sébastien (pertinence de la cible).
   La phrase « Découvrez par exemple comment une boutique en ligne peut photographier ses chaussures… » n'avait pas de lien. La proposition lie `/fr/blog/la-chaussure-un-secteur-incontournable-du-e-commerce-dynamise-avec-packshotcreator` et `/en/blog/shoes-the-unmissable-e-business-sector-boosted-with-packshotcreator` (les deux versions d'une même famille, `alternates.json` `67e2c85e5c55bbc58cc3080a`). Réserves : la cible traite de la photographie de chaussures en interne de façon générale, ce n'est pas le cas d'une boutique précise ; la page EN cible est elle-même une traduction automatique de faible qualité (« En 2022 », « Les French consumers »). FR-21, EN-41.
   *Si on ne tranche pas* : publier la variante sans lien fournie en note dans `04` (« Une boutique en ligne peut par exemple photographier ses chaussures avec un studio photo interne pour obtenir un rendu homogène, cohérent et percutant. » / « An online store can, for example, photograph its shoes with an in-house photo studio to get uniform, consistent and striking results. »).

5. **« garantir un rendu homogène, cohérent et percutant »** — Sébastien.
   Promesse attachée au studio interne, sans source dans le texte. Atténuée en « obtenir » / « get ». FR-21, EN-41.
   *Si on ne tranche pas* : la version atténuée est la plus prudente et peut être publiée telle quelle ; revenir à « garantir » exige une source.

6. **Sens de « le regard du modèle tombe sur l'un des points forts »** — Sébastien.
   La proposition retient la lecture usuelle en composition : placer les yeux du modèle sur un point fort (FR-20, EN-35). L'autre lecture possible serait « le modèle regarde vers un point fort ».
   *Si on ne tranche pas* : la phrase reste marquée `[À VALIDER]` et ne peut pas être publiée ; repli prudent, garder la formulation actuelle en FR (« faites en sorte que le regard du modèle tombe sur l'un des points forts ») et la traduire littéralement en EN (« make sure the model's gaze falls on one of the power points »).

7. **Filtre polarisant et reflets (FAQ 3)** — Sébastien, idéalement avec l'avis d'un photographe.
   L'actuel promet d'« éliminer les reflets spéculaires » avec des « polariseurs », dans une réponse qui cite les objets métalliques. Un filtre polarisant n'agit pas de la même façon sur toutes les surfaces ; la proposition dit seulement « atténuer certains reflets spéculaires », sans ajouter de précision technique (FR-27, EN-49). La FAQ est reprise dans le JSON-LD `FAQPage`.
   *Si on ne tranche pas* : la formulation atténuée est publiable telle quelle ; elle est moins précise qu'une réponse validée par un photographe, mais ne promet plus un résultat inexact.

8. **Chiffres et affirmations techniques conservés sans source** — Sébastien.
   Conservés tels quels, sans renforcement : « Placez votre éclairage à 45° par rapport au produit » ; « faible sensibilité ISO (100 à 200) » ; « ouverture moyenne (f/8 à f/11) » ; « La règle des tiers est une méthode classique de composition visuelle, héritée de la peinture » ; « C'est une règle de base en photographie » ; « le fond blanc est la norme sur les sites e-commerce » (actuel : « soit standard »). Ce sont des repères courants du métier, sans source dans l'article.
   *Si on ne tranche pas* : ils restent tels quels, comme aujourd'hui.

9. **Date de publication 16/09/2017** — Laurent (historique), avec avis SEO.
   L'item Webflow date du 26/03/2025 (horodatage ObjectId, inférence), les deux images du corps des 20 et 26/03/2025, et le texte cite l'Alphashot Pro G2. Le 16/09/2017 peut être la date d'une première version de l'article sous l'ancienne direction, réécrite en 2025 ; seul Laurent peut le dire. Options : garder 2017, ou redater et renseigner `dateModified` (le champ est absent). FR-03, EN-04.
   *Si on ne tranche pas* : la date de 2017 reste affichée et dans le balisage, incohérente avec la mention d'un produit récent.

10. **Auteur : « PackshotCreator » ou « Laurent Wainberg »** — Laurent et Sébastien.
    L'import Webflow attribuait l'article à Laurent Wainberg ; le commit `8ae45f63` (12/06/2026) l'a remplacé par « PackshotCreator », choix revendiqué (« cohérence E-E-A-T avec le schema Organization »). Aucun nom de personne n'a été remplacé dans le corps ; le remplacement n'étant pas établi comme fautif, la proposition ne rétablit pas l'auteur importé et laisse la décision aux deux intéressés (FR-04).
    *Si on ne tranche pas* : l'auteur reste « PackshotCreator ».

11. **Image principale : flacon de parfum, alt = `h1`** — Sébastien (choix de l'image), Laurent (gabarit, SEO).
    `/images/blog/67e40ec4413f376fe0ddd41c.avif` montre un flacon de parfum rose cuivré gravé « LOST IN YOU », sans rapport direct avec le cadrage ; c'est aussi l'`og:image`. Son alt est le `h1`, imposé par le gabarit commun à tous les articles ; le rendre descriptif suppose un nouveau champ et une modification du gabarit (rayon large). Alts descriptifs préparés dans `05`. FR-05, EN-04.
    *Si on ne tranche pas* : image et alt inchangés ; en EN, l'alt suivra le `h1` retenu au point 3.

12. **Schéma de la règle des tiers en français sur la page EN** — Sébastien.
    `/images/blog/67dbae6aaff27501162f332a.avif` porte les libellés « LIGNES DE FORCE » et « POINTS FORTS ». Une version anglaise serait un nouveau fichier, donc un nouveau `src`, ce que ce dossier ne fait pas. L'alt EN proposé décrit le schéma en anglais. EN-32.
    *Si on ne tranche pas* : le schéma français reste sur la page EN ; l'alt anglais suffit pour l'accessibilité.

13. **Produit cité et graphie** — Sébastien.
    Graphie unique dans la famille : « Alphashot Pro G2 », lien vers `/fr|en/studio-photo/alphashot-pro-g2`. Historique : à l'import, l'ancre « Alphashot Pro G2 » pointait vers `/studio-photo/alphashot-g2`, que le Worker redirige vers l'**Alphashot XL G2** ; le commit `1ebb469c` (07/07/2026) a aligné le lien sur l'ancre. La proposition garde Pro G2. À confirmer : c'est bien ce modèle que l'article doit citer comme exemple de studio photo e-commerce.
    *Si on ne tranche pas* : le lien actuel vers l'Alphashot Pro G2 est conservé.
