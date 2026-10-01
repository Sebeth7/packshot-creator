# Fiche — interview du fondateur (dossier P1 n° 01)

## Identité

| Élément | Valeur |
|---|---|
| Famille (ID Webflow) | `67e2ad276291f90c1cf0dc8b` |
| Sujet | Portrait rétrospectif de Sysnext / PackshotCreator construit autour de l'interview de son fondateur, Laurent Wainberg : débuts, critiques des photographes, croissance, formation, partenariat Orbitvu |
| FR | `https://www.packshot-creator.com/fr/blog/decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator` — `content/blog/fr/decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator.json` |
| EN | `https://www.packshot-creator.com/en/blog/interview-laurent-wainberg-founder-packshotcreator` — `content/blog/en/interview-laurent-wainberg-founder-packshotcreator.json` |
| de-ch | aucune version (`content/blog/alternates.json` : FR et EN seulement) |
| Anciennes URL Webflow | FR `/blog/decryptages-interviewe-…` et `/decryptages-interviewe-…` redirigées vers `/fr/blog/…` ; EN `/blog/interview-laurent-wainberg-founder-packshotcreator` redirigée vers `/en/blog/…` (`BLOG_EN_REDIRECTS`) ; versions ES, DE et NL en 410 (`GONE_PATHS`) — `cloudflare-worker/src/index.js` |
| Dates | publiée « 2017-10-04 » selon le JSON, sans `dateModified` ; item Webflow créé le 25/03/2025 (horodatage de l'ObjectId, inférence) ; importée le 18/04/2026 (`56d4bc32`) |
| État vérifié | `main` `17fc0b3` (01/10/2026), servi en 200 sur `sysnext.vercel.app` le 01/10/2026 |
| Trafic GSC | FR : 18 clics sur 365 jours, dont 17 sur l'ancienne URL Webflow ; 27 impressions sur 90 jours. EN : 6 clics sur 365 jours ; 53 impressions sur 90 jours. Requêtes de marque : « packshot creator », position 3,8 en EN ; « sysnext » en FR ; « laurent wainberg », position 2,8 en EN |
| Priorité | SEO faible, mais défaut **bloquant servi en production** |
| PR concernée | aucune PR ouverte ne modifie ces fichiers |

## Pourquoi ce dossier est le n° 1

Le commit `8ae45f63` (12/06/2026, « chore(content): auteur générique PackshotCreator sur les articles migrés ») ne devait changer que le champ `author`. Il a aussi remplacé « Laurent Wainberg » par « PackshotCreator » à huit endroits par langue : title, h1, metaTitle, description, deux attributions de citation (« rappelle », « souligne »), ancre du lien GNPP et réponse de la FAQ 1. Le diff du commit le confirme champ par champ.

Ce qui est servi aujourd'hui :

- `<title>` : « PackshotCreator, fondateur de PackshotCreator – Interview » (FR) et « PackshotCreator, founder of PackshotCreator — Interview » (EN) ;
- deux citations à la première personne signées d'une marque ;
- un JSON-LD `FAQPage` qui affirme : « C'est PackshotCreator, fondateur de la société Sysnext… » ;
- en EN, en plus, une phrase incompréhensible : « That's exactly what Packshot was offering.Creator ».

Le nom de Laurent Wainberg n'apparaît plus nulle part dans le contenu du site, hors URL.

## Origine linguistique

**Source originale établie : français. Traduction FR → EN, par traduction automatique non relue.** Preuve interne, reprise de la revue et vérifiée contre `01-TEXTE_ACTUEL.md` et `02-ORIGINAL_RETROUVE.md` :

- « les visuels produits sont un levier stratégique » rendu par « the visuals produced are a strategic driver » : « produits » lu comme un participe ;
- « caissons automatisés de prise de vue à LED » rendu par « Automated LED cameras » ;
- partitifs français restés en anglais : « they needed productivity, of standardizing, and of a internal control » ;
- balise `Packshot<em>Creator</em>` du HTML français coupée par la traduction : « Packshot was offering.Creator », « Packshot StudiosCreator » ;
- calques « The human at the heart of the device » (« dispositif »), « a new proof » (« une nouvelle preuve »), « references » (« références ») ;
- typographie française restée dans l'anglais : espace avant le deux-points (« Agri-food : », « here : ») ;
- dans la version importée : « Since 2016, PackshotCreator also offers specialized training In product photography : ».

## Verdict par langue

| Langue | Qualité (revue) | Verdict | Travail proposé |
|---|---|---|---|
| FR | C | Langue native correcte, éditorialement dégradée | **Réécriture partielle** : nom rétabli à huit endroits, date alignée sur D33, chronologie mise au passé, retouches ponctuelles de langue et de mise en forme ; prose de Sébastien conservée ailleurs |
| EN | D | Traduction automatique non relue | **Retraduction complète** depuis `04-PROPOSITION_FR.md` |
| de-ch | — | sans objet | — |

Anomalies relevées (03) : 92 (41 FR, 51 EN), dont 9 bloquantes. Points à valider (06) : 23.

## Résumé des décisions proposées

1. **Nom du fondateur rétabli** d'après l'import `56d4bc32` dans le title, le h1, le metaTitle, la description, les deux attributions de citation, l'ancre GNPP et la FAQ 1, en FR et en EN. Décision de Laurent et de Sébastien, accord explicite de Sébastien requis (06, point 1).
2. **Champ `author` non modifié** (« PackshotCreator », choix de Sébastien) : signalé, décision séparée (06, point 2).
3. **Date de création** : « Créée en 2003 » devient « Créée en 2001 [D33] ». « Dès 2003 » dans la FAQ 1 est **conservé** et marqué [D33], contrairement à la consigne reçue. Cette date porte sur le premier système, pas sur la création, et D33 ne la contredit pas. Le raisonnement est détaillé dans 06, point 4.
4. **Graphie unique « PackshotCreator »** en romain : l'italique d'origine sur « Creator » est abandonné, l'italique coupé et les deux coupures EN sont corrigés (06, point 5).
5. **Claims** : aucun n'est renforcé.
   - Conservés : 35 pays, 8 000 entreprises (mis au passé), chiffre d'affaires 2011, « premier système », « premier acteur », faits Orbitvu.
   - Adoucis : « le développement de » l'Alphashot Pro G2 ; causalité « impact de la marque » ; « le distributeur officiel » (D6) ; « pionnier » retiré de la description.
   - Tous sont listés dans 06.
6. **Métadonnées** : metaTitle de 58 caractères (FR) et 56 (EN) ; descriptions de 151 (FR) et 143 caractères (EN), qui intègrent « Sysnext » ; texte alternatif de l'image du corps rédigé après examen de l'image (05).
7. **Slugs conservés** dans les deux langues. L'analyse d'un changement de slug FR figure dans 05 ; la recommandation est de conserver.
8. **Paragraphe formation inchangé**, aligné sur le catalogue Qualiopi par Sébastien le 30/09/2026 (`fc6c9c6b`).
9. **Hors périmètre, signalé** : même effet de bord dans la famille `67e13c063cd0299737798aa4` (commit `4dde4f23`) et ancre « Her complete interview » dans un article EN (06, point 22).

## Fichiers du dossier

- `00-FICHE.md` — cette fiche
- `01-TEXTE_ACTUEL.md` — texte servi (fourni, non modifié)
- `02-ORIGINAL_RETROUVE.md` — version importée et historique (fourni, non modifié)
- `03-ANOMALIES_ANNOTEES.md` — 92 anomalies, par langue, dans l'ordre du texte
- `04-PROPOSITION_FR.md` — texte FR intégral corrigé
- `04-PROPOSITION_EN.md` — texte EN intégral retraduit depuis le FR
- `05-METADONNEES_PROPOSEES.md` — métadonnées, textes alternatifs, analyse des slugs
- `06-VALIDATION_HUMAINE.md` — 23 points à trancher, avec décideur et conséquence
