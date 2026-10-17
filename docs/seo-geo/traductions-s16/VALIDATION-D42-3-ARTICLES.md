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

---

## Correctif factuel de date — fait métier de Laurent du 16/10/2026

**Fait métier validé par Laurent (16/10)** :
- **Sysnext** est une société, **créée en 2001**.
- **PackshotCreator** est une **marque commerciale de Sysnext**, **lancée en 2004**.
- PackshotCreator **n'est pas** une société indépendante.
- Cette clarification du 16/10 **prévaut** sur la confusion de dates de l'ancien arbitrage **D33 (25/09)**, **sans annuler** les autres dispositions de D33.

**Correction appliquée (GO_CODE_146_DATE, GO_COMMIT/PUSH_146_DATE)** — article 360° uniquement, FR et EN, une phrase chacune (lien `selecteur-machines` et structure HTML préservés) :
- FR : « Depuis 2001, PackshotCreator développe des plateaux tournants et des studios photo 360° … » → « **Sysnext, société créée en 2001, propose aujourd'hui des [plateaux tournants et des studios photo 360°](/fr/studio-photo/selecteur-machines) sous sa marque commerciale PackshotCreator, lancée en 2004.** »
- EN : « Since 2001, PackshotCreator has been developing turntables and 360° photo studios … » → « **Founded in 2001, Sysnext now offers [turntables and 360° photography studios](/en/studio-photo/selecteur-machines) under its PackshotCreator commercial brand, launched in 2004.** »
- Formulation volontairement neutre : **n'affirme pas** que ces équipements étaient commercialisés dès 2001 ni 2004 (« propose aujourd'hui » / « now offers »). Fichiers : `content/blog/{fr,en}/photographie-de-produits-a-360-degres-en-interne.json`. Aucune autre occurrence de 2001 remplacée ; aucun lien, ALT, média, slug, Hn, canonical, hreflang, JSON-LD ni autre paragraphe modifié.

**Données structurées Organization — identification, non modifiées** :
- `components/seo/SchemaOrg.tsx` → `organizationSchema()` : `name: 'PackshotCreator'`, `foundingDate: '2004'`. **Cohérent** avec le fait métier (marque lancée 2004). **Non modifié** (hors périmètre #146 ; aucun GO). [Inférence] Question de conception distincte, à trancher séparément : faut-il décrire l'Organization comme **Sysnext** (entité juridique, 2001) plutôt que la marque ? À ne pas traiter dans #146.

**Clarification D33 à consigner dans `DECISIONS.md` (préparée, NON appliquée ici)** — fichier partagé, vérifier le propriétaire et les collisions éventuelles avec #152 avant écriture. Formulation proposée :
> **D33 — clarification du 16/10/2026 (Laurent).** Sysnext est la société, créée en 2001. PackshotCreator est sa marque commerciale, lancée en 2004 ; ce n'est pas une société indépendante. Toute mention « depuis 2001 » se rapporte à Sysnext, non à la marque PackshotCreator. Cette clarification prévaut sur la confusion de dates du D33 du 25/09 et n'annule aucune autre disposition de D33.

**Claims restant NON VALIDÉS (HOLD D42, inchangés par ce correctif)** : « world leader », « more than 70 patents », « 20,000 users in 35 countries », superlatifs et garanties de vitesse/résultat. Non supprimés, non renforcés. La correction de date **n'est pas** une validation D42 générale.

**`noindex` D9 conservé.** GO_MERGE = NON, GO_PUBLICATION = NON, GO_LEVEE_NOINDEX = NON, GO_TEST_REEL = NON.

---

## Exception D42 ponctuelle — décision de Laurent du 16/10/2026 (limitée à #146)

**CLAIMS HISTORIQUES CONSERVÉS, NON VALIDÉS.** Laurent confirme la conservation des affirmations historiques des trois articles FR et **autorise la mise en ligne des traductions EN fidèles**, sans amplification, en conservant leur statut **NON VÉRIFIÉ**.

Portée de l'exception (ne vaut que pour #146) :
- **Ne constitue aucune validation factuelle** des mentions « world leader », « more than 70 patents », « 20,000 users in 35 countries », superlatifs ni garanties.
- **N'autorise ni ajout ni renforcement** d'un claim.
- **Ne s'étend à aucun autre article.**
- **Conserve intégralement** le `noindex` D9 ; **ne vaut pas** GO de levée du `noindex`.
- Reconnaît que les pages restent **accessibles par URL directe** malgré le `noindex`.

**QA Chrome groupée (Laurent, 16/10)** : PASS sur les 4 pages (3 EN + correction FR 360°) ; correction Sysnext 2001 / marque PackshotCreator lancée 2004 vérifiée sur Preview.

**Séquencement (point 6 de l'ordre du 16/10)** : le resync final et la fusion de #146 attendent la **stabilisation de la fusion de #131** (ouverte, Draft, non fusionnée au 16/10), pour ne pas résoudre deux fois les mêmes conflits documentaires. GO_RESYNC_146 / GO_COMMIT-PUSH_RESYNC_146 = OUI strictement après ce changement de `main`. GO_MERGE_146 = OUI conditionnel ; GO_PUBLICATION_146 = OUI conditionnel distinct, après fusion ; GO_LEVÉE_NOINDEX = NON.

**Clarification D33** : à reporter dans `DECISIONS.md` par le propriétaire du fichier lors de la prochaine opération documentaire autorisée (pas de PR isolée).
