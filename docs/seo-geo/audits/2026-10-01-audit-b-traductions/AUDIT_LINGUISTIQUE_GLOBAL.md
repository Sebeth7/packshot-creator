# Audit B : qualité des traductions historiques Webflow

**Date** : 01/10/2026 · **Auteur** : Claude de Laurent · **Mode** : recherche, lecture seule
**Base** : `main` `17fc0b3` (01/10/2026) · **Pages servies** : `sysnext.vercel.app`, relevé du 01/10/2026
**Statut** : livrable d'audit. Aucun fichier du site n'a été modifié. Aucune PR n'a été créée ni modifiée. Aucun appel payant.

Fichiers liés, dans le même dossier :

| Fichier | Contenu |
|---|---|
| `INVENTAIRE_WEBFLOW_TRADUCTIONS.csv` | Les 125 articles servis, une ligne par URL (35 colonnes) |
| `TABLEAU_FAMILLES_EDITORIALES.csv` | Les 63 familles (60 Webflow et 3 natives), avec les colonnes demandées par la mission |
| `ANOMALIES_DETAILLEES.csv` | Les 2 174 anomalies, une ligne chacune : 1 869 issues de la relecture, 305 de la détection automatique |
| `CLAIMS_A_REVERIFIER.csv` | Les 574 affirmations chiffrées ou commerciales à revérifier |
| `DOSSIERS_RETRADUCTION_P1/` | Les 11 dossiers prioritaires, avec texte actuel, original, anomalies, proposition et métadonnées |
| `PLAN_REDEPLOIEMENT_TRADUCTIONS.md` | Les lots de PR proposés, avec les tests |

Les CSV utilisent le séparateur `;` et l'encodage UTF-8.

---

## 0. Synthèse décisionnelle

1. Le chiffre de 125 articles est exact (63 FR, 57 EN, 5 de-ch, tous servis en 200), mais seuls **115 viennent de Webflow** (60 FR, 55 EN). Les 3 de-ch des familles Webflow ont été créés dans le dépôt le 27/06/2026, et 7 articles sont natifs.
2. **L'anglais est le problème principal** : sur les 55 articles EN, 42 sont notés D (traduction automatique visible), 9 C, 1 B et 3 X (contenu français servi sous `/en`).
3. **Le français est utilisable mais à retoucher** : sur 60 articles, 31 sont notés B, 28 C et 1 D. On y trouve du Title Case, des calques de l'anglais, des métadonnées incohérentes et des chiffres non sourcés.
4. **Sens de traduction** : il est **prouvé FR → EN dans 52 familles sur 60**, par des mots français restés dans l'anglais (« La creation of product visuals », « Les tariffs ») et par la typographie française (« : »). Une famille a été traduite de l'anglais vers le français. Pour les 7 autres, la mention est « SOURCE ORIGINALE NON ÉTABLIE ».
5. **Défaut le plus grave, sans rapport avec la traduction.** Les commits `8ae45f63` et `4dde4f23` du 12/06/2026 devaient seulement changer le champ `author`. Ils ont remplacé « Laurent Wainberg » par « PackshotCreator » à **31 endroits, dans 14 fichiers et 8 familles**. Le `<title>` servi est ainsi « PackshotCreator, fondateur de PackshotCreator – Interview », et le comparatif affirme que « PackshotCreator a été créé par PackshotCreator ».
6. **Des corrections n'ont été faites que dans une langue.** Les prix des studios ont été retirés de l'EN mais restent dans le FR de l'article ROI (« 12.000 € à 30.000 € »). « Exclusif » a été corrigé en EN mais reste en FR dans `focus-sur-lhyperfocus`, contrairement à D6. La réécriture FR de mai n'a pas été reportée dans l'EN.
7. **Textes alternatifs** : 190 `alt` sont des marqueurs Webflow servis tels quels (`__wf_reserved_inherit` ou `__wf_reserved_decorative`), sur 73 articles. Les `alt` de 23 articles EN sont restés en français.
8. **Affirmations à revérifier** : 574 sont relevées. 13 traductions ou réécritures renforcent une affirmation. Plusieurs données produit contredisent le catalogue du site (Furniture Studio « 4 tonnes » contre 500 kg, Pro G2 50 cm contre 35 × 35 × 40 cm).
9. **Priorisation des 60 familles** : P0 intégrité pour 15, P1 SEO pour 8, P2 pour 19, P3 pour 18. Deux familles P0 (le guide « packshot » et le format d'image) sont aussi les deux premières en trafic.
10. **11 dossiers P1 sont prêts.** Ils contiennent les textes intégraux actuels, l'original importé, les anomalies, une proposition FR, EN et de-ch, et des métadonnées. Ce sont des **propositions** : le français client relève de la validation de Sébastien (D42 étape 5, `01-RAYON-ACTION.md`).
11. **Arbitrages indispensables** :
    - le nom du fondateur (Laurent et Sébastien) ;
    - le sort des 3 pages EN en français ;
    - les prix FR résiduels ;
    - l'effort sur `/en`, gelé par D17, à arbitrer face à la qualité D.
12. **Rien n'a été publié ni modifié.** D42 n'est pas fusionnée (PR #76 brouillon) ; elle est appliquée ici à titre de référence.

---

## 1. Corpus et provenance

### 1.1 Chiffres revérifiés

| Mesure | Valeur au 01/10/2026 | Source |
|---|---|---|
| Articles servis par le gabarit `app/[lang]/blog/[slug]` | **125** : 63 FR, 57 EN, 5 de-ch | `content/blog/{fr,en,de-ch}/*.json` |
| Réponse HTTP sur l'origine de production | **125 sur 125 en 200** | `https://sysnext.vercel.app/<lang>/blog/<slug>`, 01/10/2026 |
| `<title>`, `description` et H1 servis identiques au JSON | 125 sur 125 | HTML servi téléchargé et comparé |
| Présents dans le sitemap de l'origine | 122 sur 125 | `sitemap.xml` ; manquent les 3 EN à slug français, servis en `noindex, follow` |
| Familles (`webflowItemId`) | 63 | `content/blog/alternates.json` (62 entrées), plus `generer-images-produit-ia` qui n'y figure pas (aucun hreflang servi) |

| Périmètre | FR | EN | de-ch | Total | Familles |
|---|---|---|---|---|---|
| **Hérités de Webflow** (import `56d4bc32`, 18/04/2026) | 60 | 55 | — | 115 | 60 |
| **de-ch dérivés d'une famille Webflow**, créés dans le dépôt (`6a1f2f39`, 27/06/2026) | — | — | 3 | 3 | (déjà comptées) |
| **Natifs**, hors périmètre | 3 | 2 | 2 | 7 | 3 |
| **Total servi** | 63 | 57 | 5 | 125 | 63 |

Les 7 articles natifs (`alphashot-xl-g2-*` ×3, `migrer-ancien-packshotcreator` ×3, `generer-images-produit-ia`) portent eux aussi `"source": "webflow"` et un `webflowItemId`. Ce sont des champs de schéma hérités (`lib/content.ts`, l. 1-6), pas une preuve d'origine. Ils sont inventoriés mais non audités. Quatre d'entre eux sont modifiés par la PR #77.

**Hors périmètre, non audités** : les 47 guides (`content/guides/`, 22 FR, 22 EN, 3 de-ch), eux aussi importés par `56d4bc32`, et les 10 articles statiques TSX.

### 1.2 Ce que l'import a conservé, et ce qu'il a perdu

- **Seule version d'origine disponible** : l'extraction du 18/04/2026 (`56d4bc32`, `scripts/extract-webflow-content.mjs`, API Webflow v2). Son message de commit : « Aucune donnée textuelle n'a été réécrite : migration stricte du contenu humain. »
- **Aucun export brut** n'est conservé. Le script et l'intégration API ont été supprimés le 28/09/2026 (`e93b246e`).
- **Locales extraites** : FR et EN. Le script interroge la locale primaire sans paramètre (`CMS_LOCALE_ID = { fr: null, en: '672e1f17…' }`) : **FR était la locale primaire du CMS**. C'est un fait de structure, pas la preuve de la langue de rédaction.
- **Locales perdues** : l'ancien site servait aussi `/de/blog/*`, `/es/blog/*` et `/nl/blog/*` (tables `DE_CH_MAP` et `LANG_SPECIFIC_REDIRECTS` du Worker). Il reste de la demande dans GSC, par exemple 44 clics sur 365 jours pour `/de/blog/8-schritte-zur-professionellen-schmuckfotografie`. Ces textes ne sont pas dans le dépôt.
- **Les 3 de-ch** reprennent les slugs exacts de trois anciennes URL `/de/blog/*`. La source de leur texte n'est pas documentée (`6a1f2f39` : « 6 pages B1 préexistantes »). La relecture établit que les trois sont traduits du FR (preuve interne). Le texte des anciennes versions `/de/` reste **SOURCE ORIGINALE NON ÉTABLIE**.
- **Dates** : l'horodatage des `webflowItemId` (format ObjectId) date 11 items du 15/10/2024 et 49 de la période du 19/12/2024 au 24/06/2025. Les dates affichées remontent pourtant à 2017-2024. [Inférence] Les articles ont été recréés dans la collection Webflow en 2024-2025 et antidatés ; leurs versions antérieures (ancien site, sous-domaine `fr.`) ne sont pas conservées. Cela repose sur des schémas observés : le format ObjectId de MongoDB, utilisé par l'API Webflow v2.
- **Modifications depuis l'import** : sur les 115 fichiers, le corps est identique à plus de 95 % dans 112 cas (seuls les liens et les images ont été réécrits). Trois réécritures sont notables : `quel-format-d-image-pour-le-web` FR (`586bf083`, similarité 0,69), `guide-photographie-packshot-pourquoi-faire-packshots` FR et EN (`a8a3d3f6`, `37da2e28`, similarité 0,92 et 0,91). Seize commits postérieurs ont modifié les articles hérités (liste dans l'inventaire, colonne `NB_COMMITS`), dont le retrait des prix (`3cfa2e73`, 32 fichiers) et le changement d'auteur (`8ae45f63`, 93 fichiers).

### 1.3 Sources examinées, dans l'ordre demandé

| # | Source | Résultat |
|---|---|---|
| 1 | Fichiers déployés et pages servies | Base de l'audit |
| 2 | Historique Git complet (700 commits ; le clone a été complété avec `--unshallow`) | Import `56d4bc32` ; remplacement de nom (§ 3.1) ; corrections faites dans une seule langue (§ 3.4) |
| 3 | Exports Webflow conservés | Aucun export brut. Seulement `sessions/extract-report.json` et `sessions/fr-subdomain-mapping-v3.csv` |
| 4 | Datasets internes (`gsc-crawl-seo`, lecture seule, sans coût) | `pages` et `page_versions` partent du 28/05/2026, après la migration : aucune version Webflow. `gsc_metrics_page` et `gsc_metrics` donnent trafic et requêtes. Pages Orbitvu crawlées (`orbitvu.com`, `orbitvu.fr`) : aucune reprise mot pour mot sur 26 phrases-tests issues de 24 articles. `backlinks` : 8 articles en reçoivent |
| 5 | Archives | `archive.org/wayback/available` répond (instantanés présents). `web.archive.org` refuse la connexion depuis le conteneur : **aucun contenu archivé récupéré** |
| 6 | Source publique originale | Non consultée : aucune n'est identifiée comme original d'un article du corpus |

---

## 2. Méthode

1. **Détection automatique** sur les 125 fichiers : Title Case, mélange de langues, `alt` et légendes, formats de nombres, typographie, doublons, cohérence title / H1 / metaTitle, puis comparaison avec le HTML servi. Un premier passage remplaçait les balises par des espaces et a produit de faux « Packshot Creator » et de fausses « espaces avant virgule ». Le détecteur a été corrigé. Ces faux positifs ne figurent dans aucun livrable : le HTML réel est `Packshot<em>Creator</em>`, rendu « PackshotCreator ».
2. **Relecture intégrale de chaque version** de 60 familles (10 relecteurs en parallèle, FR, EN et de-ch comparés paragraphe par paragraphe). Chaque extrait cité a été **vérifié par script, mot pour mot**, contre le texte source.
3. **Grille de notation** : `A` publiable ; `B` correct, avec 5 retouches mineures au plus ; `C` dégradé, à réécrire en partie ; `D` traduction automatique visible, à retraduire entièrement ; `X` mauvaise langue ou absent.
4. **Sens de traduction** : retenu comme prouvé seulement s'il existe des traces objectives dans le texte cible. Sinon, la mention est « SOURCE ORIGINALE NON ÉTABLIE ». Le FR n'a jamais été présumé original.
5. **Priorité SEO** (`gsc-crawl-seo`, lecture seule, données au 28/09/2026) : clics sur 365 jours de la famille, URL actuelles et anciennes URL redirigées par le Worker, plus impressions sur 90 jours. Seuils : P1 à partir de 150 clics ou 5 000 impressions ; P2 à partir de 40 clics ou 1 000 impressions ; P3 en dessous.
6. **Priorité de reprise** : **P0** en cas de défaut d'intégrité servi (nom remplacé, contenu dans la mauvaise langue, paragraphe corrompu, statistique déformée, prix) ; sinon **P1**, **P2** ou **P3** selon la priorité SEO et la qualité.

---

## 3. Résultats

### 3.1 Qualité par langue

| Langue | A | B | C | D | X | Fichiers |
|---|---|---|---|---|---|---|
| FR | 0 | 31 | 28 | 1 | 0 | 60 |
| EN | 0 | 1 | 9 | 42 | 3 | 55 |
| de-ch | 0 | 2 | 1 | 0 | 0 | 3 |

Erreurs listées par la relecture : **1 869**. Elles se répartissent ainsi : 77 bloquantes (65 EN, 12 FR), 769 majeures et 1 023 mineures. Comme chaque relecteur ne citait que 10 mineures représentatives par langue, le volume réel estimé est d'environ **2 381 en EN, 1 016 en FR et 36 en de-ch**.

| Catégorie | FR | EN | de-ch | Total |
|---|---|---|---|---|
| Traduction automatique | 0 | 356 | 0 | 356 |
| Autre (faits datés, liens, typographie lourde, contradictions) | 264 | 74 | 5 | 343 |
| Calque | 97 | 181 | 12 | 290 |
| Faux ami, terminologie métier | 41 | 192 | 4 | 237 |
| Unités, dates, légendes, `alt` | 97 | 38 | 2 | 137 |
| Incompréhensible | 25 | 82 | 1 | 108 |
| Mélange linguistique | 22 | 64 | 3 | 89 |
| Appellation (Orbitvu, PackshotCreator, noms) | 44 | 29 | 2 | 75 |
| Title Case | 58 | 15 | 1 | 74 |
| Incohérence SEO, H1, corps | 55 | 11 | 1 | 67 |
| Structure (manquant, doublé, inversé) | 36 | 18 | 0 | 54 |
| Titre traduit littéralement | 3 | 23 | 0 | 26 |
| Claim renforcé | 9 | 3 | 1 | 13 |

### 3.2 Sens de traduction

| Constat | Familles | Exemples de preuve |
|---|---|---|
| **FR → EN, preuve interne** | 52 | « La creation of product visuals Has become a major strategic challenge In the e-commerce » (`automate-creation-product-photographs-animations`) ; « In the industry of modus , tea Rapidity is essential. » (`how-shotflow-accelerates-…`) ; « THElighting is Themost decisive element… Sa managements, her streaming, sound loudness » (`advantages-toplight-…`) ; « Store goals in a airtight box » (objectifs → *goals*) ; « Automatic removal of funds » (fonds → *funds*) ; « she can suggest themes » (l'IA, *elle*) ; « adds Ocean. » (Océane) ; espace avant « : » conservée dans 32 articles EN |
| **EN → FR, preuve interne** | 1 | `photographie-3d-de-produits-…` : « la consistance » (*consistency*), « téléchargées sur le web » (*uploaded*), « zoom profond » (*deep zoom*). La source anglaise n'est pas dans le dépôt |
| **SOURCE ORIGINALE NON ÉTABLIE** | 7 | 5 familles FR seul ; 2 familles où l'EN est une copie du FR (`photographie-2d-de-produits`, `photographie-de-produits-a-360-degres-en-interne`). [Inférence] Leur FR porte des calques de l'anglais (« éclairage consistant », « versatiles ») ; une source anglaise est probable, mais elle n'est pas prouvée |
| **de-ch** | 3 | Traduits du FR dans les trois cas : `alt` français conservés, calques (« natürliches Ranking »), remplacement du nom repris du FR |

[Inférence] Les fragments du type « La creation of… Has become… In the… » montrent une traduction automatique segment par segment. Le HTML a été découpé aux balises `<strong>` : chaque morceau a été traduit séparément et les déterminants français sont restés en place. Cela repose sur des schémas observés.

---

## 4. Constats transversaux

### 4.1 Nom du fondateur remplacé (31 occurrences, 14 fichiers, 8 familles)

Le commit `8ae45f63` (12/06/2026) annonce : « Remplace l'auteur hérité de Webflow par PackshotCreator ». `4dde4f23` (même jour) : « Inclut l'auteur générique PackshotCreator sur ces 13 fichiers ». Les deux ont aussi remplacé le nom dans les textes, hors du champ `author`.

| Famille (slug FR) | Fichiers | Emplacements | Commit | Texte servi aujourd'hui |
|---|---|---|---|---|
| `decryptages-interviewe-laurent-wainberg-…` | FR, EN | 8 par langue : title, h1, metaTitle, description, « rappelle », « souligne », ancre GNPP, FAQ | `8ae45f63` | « Interview de PackshotCreator, fondateur de PackshotCreator » |
| `comparatif-de-solutions-de-photographie-automatisee` | FR, EN | corps | `8ae45f63` | « PackshotCreator , a été créé par PackshotCreator il y a plus de vingt ans. Il est à l'origine… » |
| `lancement-dune-serie-debooks-dediee-au-ecommerce` | FR, EN | corps, 2 par langue | `8ae45f63` | « Dans cet ouvrage, PackshotCreator, fondateur de PackshotCreator, partage son expertise » |
| `acheter-studio-photo-packshot-occasion` | EN | 2 attributions de citation | `8ae45f63` | « explain PackshotCreator Founder and manager of PackshotCreator » |
| `comment-automatiser-la-creation-…` | FR, EN | attribution de citation | `4dde4f23` | « — PackshotCreator, fondateur et dirigeant de PackshotCreator » |
| `focus-sur-lhyperfocus` | FR, EN | corps | `4dde4f23` | « C'est PackshotCreator qui, anticipant les besoins… a pris l'initiative » |
| `guide-photographie-packshot-pourquoi-faire-packshots` | FR, EN (et de-ch traduit ensuite) | ligne de crédit | `8ae45f63` | « Article publié à l'origine par PackshotCreator » |
| `quel-format-d-image-pour-le-web` | FR (et de-ch traduit ensuite) | ligne de crédit | `8ae45f63` | idem |

Pour les deux dernières lignes, le remplacement a peut-être été voulu, dans la logique de l'auteur générique : à confirmer par Sébastien. Les six premières produisent des phrases absurdes ou fausses. **Source de reconstruction** : l'import `56d4bc32`, qui contient le texte d'origine. Pour le rétablissement, le dossier P1 n° 01 est prêt, et le lot L0 du plan couvre l'ensemble.

### 4.2 Contenu français servi sous `/en` (3 pages)

`/en/blog/photographie-2d-de-produits`, `/en/blog/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre` et `/en/blog/photographie-de-produits-a-360-degres-en-interne` présentent les caractéristiques suivantes :

- slug, title, H1, corps et `alt` en français ; seule la description est en anglais ;
- réponse 200, `<html lang="en">`, `noindex, follow` (`NOINDEX_EN_BLOG_SLUGS`), hors sitemap.

Ce sont les 3 « drafts-to-keep » de l'import. Les trois articles FR décrivent comme actuelle l'ancienne gamme PackshotCreator (LiveStudio, LuminaPad, PackshotSpin, PackshotSphere, Packshot Alto Mark II). Or `logiciel-packshotcreator-ortery-perdu-solution` indique la fin du support au 31/12/2024. Le trafic est nul (1 clic sur 365 jours pour l'ensemble). La décision est à prendre au lot L1.

### 4.3 Corrections faites dans une seule langue

| Article | Langue corrigée | Langue oubliée | Preuve |
|---|---|---|---|
| `quel-retour-sur-investissement-avec-un-studio-photo-en-interne` | EN : prix remplacés par « contact us for a personalized quote » (`3cfa2e73`, motif « violation contractuelle Orbitvu ») | **FR** : « Studio photo automatisé, appareil photo et objectif, ordinateur Coût : 12.000 € à 30.000 € (environ 350 €/mois sur 5 ans) », toujours servi | `content/blog/fr/…json`, servi en 200 le 01/10 |
| `focus-sur-lhyperfocus` | EN : « official distributor » (`74dff0ce`) | **FR** : « PackshotCreator distribue exclusivement les solutions Orbitvu » (contraire à D6) | idem |
| `quel-format-d-image-pour-le-web` | FR réécrit le 07/05/2026 (`586bf083`, environ 420 mots de promotion Orbitvu retirés) | **EN** non réaligné | comparaison avec l'import |
| `acheter-studio-photo-packshot-occasion` | FR réécrit en 2025 | **EN** = ancien article (cas « Chloé », 2019), seules l'introduction et la FAQ correspondent | relecture |
| `logiciel-packshotcreator-ortery-perdu-solution` | — | FR et EN : « distributeur exclusif d'Ortery » laissé volontairement par `74dff0ce` (historique) | à arbitrer au regard de D6 |

### 4.4 Majuscules et métadonnées françaises

- **Title Case** dans 16 title, H1 ou metaTitle FR et dans 14 articles pour les intertitres (49 intertitres). Exemples : « 8 Défis de Contenu Visuel pour l'E-Commerce en 2025 » ; « Studios Photo Packshot : Automatisez et Optimisez Vos Visuel » ; « Technologies les Plus Impactantes Façonnant l'Avenir de la Photographie pour le Commerce Électronique ». Le Title Case était déjà présent à l'import.
- **Incohérences** entre title, H1, metaTitle et description dans 67 cas relevés. Par exemple, `est-il-utile-dinternaliser-…` a pour title « Est-il utile d'internaliser sa production de photos packshot ? » et pour H1 « Studios photo Orbitvu : rentabiliser vos visuels produits ». La description de `revolution-e-commerce-…` publie « 64 % de CA en hausse », alors que le corps dit « dans 64 % des cas ».
- **Millésimes périmés** : « en 2025 » apparaît dans des H1, des FAQ et des corps (`8-defis-…`, `logiciel-…-perdu`, `votre-studio-photo-interne-…`).
- **Longueurs** : 55 metaTitle dépassent 65 caractères ; 44 descriptions dépassent 165 caractères ; 9 metaTitle sont absents. Emojis (📸, 👉) dans 8 metaTitle ou descriptions, sur 6 articles.

### 4.5 Textes alternatifs et légendes

- **190 marqueurs Webflow** servis comme `alt` : 167 `__wf_reserved_inherit` et 23 `__wf_reserved_decorative`. Ils touchent 73 articles : 36 FR, 35 EN et 2 de-ch. Le code ne les neutralise pas : vérifié dans le HTML servi.
- **69 `alt` dans une autre langue que la page**, sur 26 articles (23 EN avec des `alt` français). [Inférence] Webflow ne localisait pas l'`alt` des images du texte riche.
- Coquilles et erreurs : « massacra » pour « mascara » ; « Alphashot XXL » au lieu d'AlphaStudio XXL ; légende « Credit: » non traduite en de-ch ; une vidéo `.mp4` insérée dans un `<img>` (`taux-de-conversion-…`), qui ne s'affiche pas.
- Crédits de provenance à conserver : « JJ Harrison, CC BY-SA 3.0 » (format d'image, 3 langues) ; source YouTube (réalité virtuelle).

### 4.6 Affirmations à revérifier (574)

- **Renforcées par traduction ou réécriture (13)** : « près de 60 % » devient « up to 60% » ; « créer une meilleure photo produit » devient « the best-selling… photo » ; « relativement automatisé » devient « weitgehend automatisiert » (de-ch) ; une FAQ affirme « le meilleur compromis » alors que le corps dit qu'il n'y a « pas forcément de solution supérieure » ; « Réduisez de 40 % » perd son « jusqu'à » (étude de cas anonyme).
- **Données produit contraires au catalogue du site** :
  - Furniture Studio « jusqu'à 4 tonnes », contre 500 kg dans `machines.ts` ;
  - Pro G2 « 50 × 50 × 50 cm », contre 35 × 35 × 40 cm ;
  - « 150 bijoux par jour » dans la FAQ, contre 200 dans le catalogue ;
  - Alphadesk et Alphashot G2 cités alors qu'ils sont délistés ;
  - version d'Orbitvu Station différente entre le corps (24.1.0) et la FAQ (24.2.0).
- **Statistiques sans source ou incohérentes** :
  - Gartner, McKinsey, Estée Lauder ;
  - IKEA à 25 % puis 20 % ;
  - 400 € × 221 jours = 88 400 €, et non les 92 400 € affichés ;
  - « 5 tests » annoncés pour 4 décrits ;
  - un gain de 142 s contredit par les mesures.
- **Erreurs techniques** :
  - explication du DPI fausse dans les 3 langues (`guide-photographie-packshot-…`) ;
  - « même une petite profondeur de champ ne suffit pas » (contresens) ;
  - une FAQ ShotFlow rattache des fiches produits à ISO 16684-1, qui porte sur les métadonnées XMP.

### 4.7 Dates et obsolescence

- **Antidatage** : une date de publication antérieure à la création de l'item Webflow, pour la majorité des familles (§ 1.2).
- **Dates techniques** : 3 articles FR seul sont datés du 30/12/2025 alors que leur contenu est daté en interne (« nouvelle version 2013 » chez Oscaro, « cet automne », « l'année dernière »). `de-la-photographie-2d-aux-modeles-3d-…` est daté du 01/10/2025, pour un item créé le 03/03/2025. Les 3 EN à slug français sont datés du 08/11/2024, date qui correspond à l'horodatage de la locale EN de Webflow (`672e1f17…`) [Inférence].
- **Faits datés** :
  - « Créée en 2003 » et « dès 2003 » dans l'interview, contre D33 (création en 2001) ;
  - interview WiziShop de 2018 ;
  - « en 2025 » ;
  - un article daté de 2017 qui cite Orbitvu, alors qu'un autre article du site (`focus-sur-lhyperfocus`) date la distribution d'Orbitvu de 2023 ;
  - l'offre de reprise « actuellement » valable dans un article de 2024.

### 4.8 Structure

- **Paragraphe corrompu** dans les deux langues (`utilisez-votre-studio-photo-…`) : « Un autremaine où la VR et la photogrammétrie apportent une réelle valeur ajoun client d' O… ». Il bloque la publication.
- **Ancien texte resté sous la réécriture** (`la-chaussure-…`) : 6,2 contre 5,7 paires, 380 € contre 330 €.
- **Doublons** : intertitres et sections doublés (`avantage-du-e-commerce-…`) ; puces doublées (`comment-ia-…`) ; paragraphe APS-C doublé (`comment-choisir-objectif-…`).
- **Corruptions et incohérences** :
  - réponse 4 de la FAQ EN corrompue, avec des modèles répétés en boucle (`5-questions-before-…`) ;
  - H1 tronqués aux volets 4 et 5 du guide ;
  - « 5 Best Practices » annoncées mais jamais développées (`les-visuels-au-service-…`).
- **Mots collés** en EN quand une balise `<strong>` suit sans espace : « asdimmable », « theAlphatable », « The Packshot teamCreator ».

### 4.9 Appellations

| Forme | Constat | À trancher |
|---|---|---|
| PackshotCreator | Le HTML d'origine écrit `Packshot<em>Creator</em>` (style de l'ancienne marque) ; une balise est mal placée dans `Packshot<em>Creato</em>r` (interview) | Graphie unique « PackshotCreator » sans italique |
| ShotFlow / Shotflow | 252 « ShotFlow » contre 6 « Shotflow » dans `content/blog` | Graphie officielle |
| Hyperfocus / SuperFocus | `joailliers-…` dit « Hyperfocus » ; le reste du dépôt dit « SuperFocus » | Nom de la fonction |
| Alphashot Micro v2 / Micro Pro v2 / Micro PRO V2 | Trois graphies dans la même famille | Nom catalogue |
| « exclusif » | FR `focus-sur-lhyperfocus` (Orbitvu) : contraire à D6 ; Ortery (historique) | D6 |

### 4.10 de-ch (3 articles)

| Article | Note | Points principaux |
|---|---|---|
| `leitfaden-packshot-fotografie-warum-packshots-machen` | C | Calques du FR (« Das gesagt », « natürliches Ranking »). « Verpackungsfoto » attribué au Québec. 7 `alt` français. 4 liens vers `/fr/`. Remplacement du nom repris. « weitgehend automatisiert » renforce le texte. Erreur DPI héritée |
| `produkt-vorstellen-leitfaden-packshot-fotografie` | B | Allemand naturel. 20 liens envoient vers des pages `/fr/`. Graphies Micro v2 variables |
| `welches-bildformat-ist-das-beste-fur-das-web` | B | Allemand suisse correct (aucun « ß »). « Credit: » non traduit. Lien Cloudinary erroné et versions 24.1.0 / 24.2.0 hérités du FR. Remplacement du nom repris. Backlink AS 64 vers l'ancienne URL `/de/` : **le slug ne doit pas changer** |

Dans les trois cas, la catégorie servie est « Innovations » et non une forme allemande (déjà relevé par le rapport maître du 26/09, annexe D, ligne 122).

### 4.11 Défauts vus hors du champ linguistique (non traités)

- `generer-images-produit-ia` (natif) n'a aucun hreflang servi : la famille est absente de `alternates.json`.
- Liens erronés relevés par la relecture (détail dans `ANOMALIES_DETAILLEES.csv`, catégorie « autre ») :
  - « Cloudinary » mène à thecssagency.com ;
  - « BrightRiver » mène à pixelz.com ;
  - « Social Media Examiner » mène à OptiMonk ;
  - une URL invalide `http://gs-new-features-…` ;
  - un lien « Alphashot Pro G2 » mène à l'Alphashot G2, délistée.
- Pages EN qui renvoient vers `/fr/academy` sans prévenir le lecteur.
- 28 articles servent dans leur HTML une visionneuse 360° Orbitvu chargée par script tiers (`<script src="//orbitvu.co/share/…">`, dans `<div data-rt-embed-type='true'>`). [Non vérifié] On ne sait pas si ce script s'exécute ni s'il se charge avant consentement : à contrôler dans Chrome, comme les iframes tierces déjà listées dans `ETAT.md`. Les rendus Markdown des dossiers P1 ne reproduisent pas ces éléments ; le dossier 08 le signale.
- Worker : l'ancienne URL EN `/how-to-e-commerce-product-photography` redirige vers `/en/studios-photo-automatises` et non vers l'article EN, alors que l'URL FR équivalente mène à l'article FR (relevé par le dossier P1 n° 10, non vérifié en production).
- Image principale de `quel-format-d-image-pour-le-web` (3 langues) : capture d'un écran Orbitvu marqué « For internal use only! ». Vérifier que sa diffusion publique est autorisée (relevé par le dossier P1 n° 03).
- `e2e/redirections.spec.ts` (l. 126) attend `/de/blog/welches-bildformat-…` → EN, alors que le Worker redirige vers la version de-ch (contradiction déjà relevée par le rapport maître du 26/09, § 5.6).

---

## 5. Priorisation (60 familles Webflow)

| Priorité | Familles | Définition |
|---|---|---|
| **P0 — intégrité** | 15 | 8 noms remplacés, 3 contenus FR sous `/en`, 1 paragraphe corrompu, 1 FAQ EN corrompue, 1 description qui déforme des statistiques, 1 prix FR résiduel |
| **P1** | 8 | Priorité SEO P1, sans défaut P0 |
| **P2** | 19 | Priorité SEO P2 et qualité C ou D dans une langue |
| **P3** | 18 | Le reste ; trafic faible. Pour la plupart, l'arbitrage « conserver, fusionner ou retirer » passe avant toute traduction (D5, D16) |

Liste complète, triée par priorité puis par trafic :

| Prio. | Slug FR | FR | EN | de-ch | Prio. SEO | Clics 365 j (famille) | Recommandation de la relecture |
|---|---|---|---|---|---|---|---|
| P0 | `guide-photographie-packshot-pourquoi-faire-packshots` | B | D | C | P1 | 804 | retraduction complète (EN), retouches FR et de-ch, ligne de crédit |
| P0 | `quel-format-d-image-pour-le-web` | B | D | B | P1 | 605 | retraduction EN depuis le FR actuel, retouches FR et de-ch |
| P0 | `comparatif-de-solutions-de-photographie-automatisee` | C | C | — | P2 | 115 | arbitrage éditorial (recoupe #64) |
| P0 | `utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle` | C | D | — | P2 | 76 | retraduction complète, après réparation du paragraphe corrompu |
| P0 | `est-il-utile-dinternaliser-sa-production-de-photos-packshot` | C | D | — | P2 | 66 | retraduction complète (FAQ EN corrompue ; recoupe #27) |
| P0 | `acheter-studio-photo-packshot-occasion` | C | D | — | P2 | 54 | arbitrage éditorial (EN = autre article) |
| P0 | `focus-sur-lhyperfocus` | B | D | — | P2 | 45 | retraduction complète, « exclusivement » FR |
| P0 | `comment-automatiser-la-creation-de-vos-photographies-animations-de-produits` | B | D | — | P2 | 28 | arbitrage éditorial (citation), puis retraduction EN |
| P0 | `decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator` | C | D | — | P3 | 24 | rétablir le nom, réécriture partielle FR, retraduction EN |
| P0 | `quel-retour-sur-investissement-avec-un-studio-photo-en-interne` | C | D | — | P3 | 15 | arbitrage sur les prix FR, puis réécriture |
| P0 | `lancement-dune-serie-debooks-dediee-au-ecommerce` | C | D | — | P3 | 3 | arbitrage éditorial (2017, livre blanc sans lien) |
| P0 | `photographie-de-produits-a-360-degres-en-interne` | C | X | — | P3 | 1 | arbitrage (ancienne gamme, EN en français ; recoupe #27) |
| P0 | `photographie-2d-de-produits` | C | X | — | P3 | 0 | arbitrage (ancienne gamme, EN en français ; recoupe #70) |
| P0 | `photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre` | C | X | — | P3 | 0 | arbitrage (ancienne gamme, EN en français) |
| P0 | `revolution-e-commerce-les-animations-3d-spheriques-de-produits-pour-le-sport` | C | — | — | P3 | 0 | arbitrage (description fausse, cas client ancien) |
| P1 | `comment-choisir-objectif-en-photographie-packshot` | B | D | — | P1 | 713 | retraduction complète |
| P1 | `materiel-photo-guide-photographie-packshot` | B | D | — | P1 | 526 | retraduction EN, retouches FR |
| P1 | `photographier-une-bague-comme-un-professionnel-en-8-etapes` | C | D | — | P1 | 365 | retraduction EN, réécriture partielle FR |
| P1 | `logiciel-packshotcreator-ortery-perdu-solution` | B | D | — | P1 | 251 | retraduction complète |
| P1 | `joailliers-nos-conseils-pour-reussir-vos-visuels-produits` | B | C | — | P1 | 189 | réécriture partielle |
| P1 | `conseils-photo-le-cadrage-et-la-composition` | B | D | — | P1 | 168 | retraduction complète |
| P1 | `comment-avoir-meilleure-photo-produit-e-commerce` | B | D | — | P1 | 149 | retraduction complète |
| P1 | `comment-avoir-des-photos-professionnelles-guide-packshot-produit` | B | D | — | P1 | 49 | retraduction complète |
| P2 | `comment-avoir-meilleures-images-amazon` | B | D | — | P2 | 140 | retraduction complète (recoupe #27) |
| P2 | `comment-maitriser-le-flou-dans-la-photographie-de-produits` | B | D | — | P2 | 133 | retraduction complète |
| P2 | `photographie-de-produits-comment-presenter-vos-vetements` | B | D | — | P2 | 126 | retraduction complète |
| P2 | `5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste` | B | D | — | P2 | 93 | retraduction EN, arbitrage title et H1 |
| P2 | `e-commerce-comment-mettre-en-place-votre-studio-photo` | B | D | — | P2 | 86 | retraduction EN, retouches FR |
| P2 | `avantage-du-e-commerce-pour-les-entreprises` | C | D | — | P2 | 76 | retraduction complète |
| P2 | `comment-mettre-en-valeur-un-produit-guide-photographie-packshot` | B | C | B | P2 | 71 | réécriture partielle (recoupe #27) |
| P2 | `quel-studio-photo-type-pour-vos-shootings-produits-en-interne` | B | D | — | P2 | 70 | retraduction complète |
| P2 | `meubles-decorations-comment-etre-plus-visibles-sur-le-web` | B | D | — | P2 | 70 | retraduction complète, données produit |
| P2 | `comment-ia-revolutionne-production-visuelle` | C | D | — | P2 | 61 | arbitrage (statistiques sans source) |
| P2 | `eclairage-photos-produits` | C | D | — | P2 | 48 | retraduction complète (recoupe #27) |
| P2 | `e-commerce-quel-est-le-reel-impact-des-visuels` | B | D | — | P2 | 40 | retraduction complète (backlink AS 80) |
| P2 | `de-la-photographie-2d-aux-modeles-3d-de-vos-produits-introduction-a-la-photogrammetrie` | C | C | — | P2 | 39 | arbitrage (chiffres contradictoires) |
| P2 | `pourquoi-choisir-orbitvu-photographie-packshot` | C | D | — | P2 | 38 | retraduction complète |
| P2 | `8-defis-prodution-contenu-visuel` | C | D | — | P2 | 35 | arbitrage (plus de 30 statistiques sans source) |
| P2 | `avantages-toplight-photographie-produits` | B | D | — | P2 | 35 | retraduction complète |
| P2 | `photographie-360-amazon` | B | D | — | P2 | 31 | retraduction complète |
| P2 | `optimiser-travail-production-visuelle` | C | D | — | P2 | 15 | retraduction complète |
| P2 | `choix-media-guide-de-la-photographie-packshot-4` | B | D | — | P2 | 13 | retraduction complète |
| P3 | `votre-studio-photo-interne-3-bonnes-pratiques-pour-lorganiser` | B | B | — | P3 | 27 | retouches |
| P3 | `ia-lumieres-virtuelles-revolution-packshot` | C | C | — | P3 | 27 | arbitrage (spécifications Pro G2) |
| P3 | `la-chaussure-un-secteur-incontournable-du-e-commerce-dynamise-avec-packshotcreator` | C | D | — | P3 | 23 | réécriture partielle (ancien texte resté) |
| P3 | `eclairage-packshots-360-3d-produits` | B | D | — | P3 | 16 | retraduction complète |
| P3 | `e-commerce-8-elements-indispensables-pour-reussir` | B | C | — | P3 | 4 | arbitrage (date 2017) |
| P3 | `comment-shotflow-permet-optimiser-production-contenu` | C | C | — | P3 | 3 | réécriture partielle |
| P3 | `orbitvu-lautomatisation-au-service-de-la-photographie-3d-360deg` | C | D | — | P3 | 3 | retraduction complète (sert à l'e2e YouTube) |
| P3 | `e-commerce-4-fondamentaux-pour-reduire-les-abandons-de-panier` | B | D | — | P3 | 2 | retouches FR, retraduction EN |
| P3 | `taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques` | B | C | — | P3 | 2 | retouches (`.mp4` dans `<img>`) |
| P3 | `comment-shotflow-ameliore-suivi-taches-en-temps-reel` | C | C | — | P3 | 2 | arbitrage (statistiques de FAQ, client nommé) |
| P3 | `evolution-e-commerce-packshot` | C | D | — | P3 | 1 | retraduction complète (recoupe #64) |
| P3 | `comment-shotflow-permet-accelerer-production-contenus-visuels-mode` | C | D | — | P3 | 1 | arbitrage (EN incompréhensible) |
| P3 | `interview-visuels-ecommerce-wizishop` | B | D | — | P3 | 1 | arbitrage (2018) |
| P3 | `promod-revolutionne-ses-shootings-photos-de-mode` | C | — | — | P3 | 1 | arbitrage (ancienne gamme ; recoupe #27) |
| P3 | `optimiser-collaboration-equipe-success-story-shotflow` | B | D | — | P3 | 0 | retraduction complète |
| P3 | `boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter` | B | — | — | P3 | 0 | retouches |
| P3 | `les-visuels-au-service-du-referencement-de-votre-e-commerce` | D | — | — | P3 | 0 | arbitrage (2017, promesse non tenue) |
| P3 | `oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg` | C | — | — | P3 | 0 | arbitrage (2013) |

---

## 6. Limites et contrôles non effectués

- **Production `www`** : non contrôlée (R4). La preuve vient de l'origine `sysnext.vercel.app`. Le contrôle dans Chrome sur `www` reste à faire.
- **Archives** : `web.archive.org` est inaccessible depuis le conteneur. Aucun texte Webflow antérieur à avril 2026 n'a été récupéré, et aucune version `/de/`, `/es/` ni `/nl/`.
- **Images** : les `alt` proposés s'appuient sur le nom de fichier, la légende et le texte voisin. Quelques images ont été ouvertes par les relecteurs, sans contrôle systématique. Les propositions marquées « [à vérifier sur l'image] » demandent une vérification humaine.
- **Faits métier** : aucun fait n'a été vérifié auprès d'Orbitvu, d'Ortery ni d'une source publique. Les contradictions sont relevées par comparaison avec le dépôt (`machines.ts`, `DECISIONS.md`, articles voisins) et non tranchées.
- **Sens de traduction** : il est prouvé par des traces internes au texte. Il n'est jamais établi par une date de rédaction, que rien ne conserve.
- **Relecture** : chaque relecteur a listé toutes les erreurs bloquantes et majeures, mais seulement jusqu'à 10 erreurs mineures par langue. Les totaux de mineures sont donc estimés.
- **GSC** : les données courent jusqu'au 28/09/2026 (fenêtre P0-H en cours jusqu'au 08/10). Les clics sont comptés tous pays, sans le filtre FR et CH de D24. Les priorités en sont indicatives.
- **Hors périmètre** : les 47 guides, les 10 articles TSX statiques, les 7 articles natifs, les textes de `messages/*.json` et les pages produit.
- **Rien n'a été écrit** dans `JOURNAL.md`, `ETAT.md` ni `DECISIONS.md`, la mission étant en lecture seule. Une entrée de JOURNAL prête à reprendre figure dans `PLAN_REDEPLOIEMENT_TRADUCTIONS.md`.
