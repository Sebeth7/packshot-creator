# Fiche — « Comment choisir l'objectif en photographie packshot » (FR + EN)

Dossier de retraduction P1, audit B du 01/10/2026. Lecture seule du dépôt ; rien n'est publié.

## Identité

| Élément | Valeur |
|---|---|
| ID de famille (item Webflow) | `67dd7e0cbd182b5e0eec9fc0` |
| Sujet | Choisir un objectif photo pour le packshot : macro, focale fixe, zoom, grand angle, critères techniques (focale, grandissement, distance de mise au point, ouverture), objectif par type de produit, vidéo, petit budget, entretien ; adossé aux studios automatisés Orbitvu |
| FR | `https://www.packshot-creator.com/fr/blog/comment-choisir-objectif-en-photographie-packshot` — `content/blog/fr/comment-choisir-objectif-en-photographie-packshot.json` |
| EN | `https://www.packshot-creator.com/en/blog/how-to-choose-best-lens-for-product-photography` — `content/blog/en/how-to-choose-best-lens-for-product-photography.json` |
| de-ch | aucune version (`content/blog/alternates.json` : fr et en seulement) |
| Date affichée | 21/02/2024 (création de l'item Webflow : 21/03/2025, inférence par ObjectId ; à vérifier, `06` point 20) |
| Auteur | « PackshotCreator » depuis `4dde4f23` (12/06/2026) ; « Laurent Wainberg » à l'import |
| Catégorie | FR « E-commerce » ; EN « Innovations » |
| Volume | 2 110 mots en FR ; 9 h2, 14 h3, 9 médias (dont une vidéo .mp4), 1 vidéo YouTube, 5 questions de FAQ ; parité de structure FR/EN complète |
| Historique | Import Webflow `56d4bc32` (18/04/2026) ; images locales `44d780f1` ; auteur et localisation `4dde4f23` ; maillage `ed5dc135`, `3cfa2e73` (FR), `1ebb469c`. Texte FR identique à l'import à 99,9 % ; aucun commit n'a retouché la langue |
| PR concernée | aucune PR ouverte ne modifie ces fichiers |

## Trafic (fourni par la consigne)

| Périmètre | Clics (365 j) | Impressions (90 j) | Position moyenne (90 j) |
|---|---|---|---|
| Famille | 713 | — | — |
| FR | 252, dont 221 sur l'ancienne URL Webflow | 659 | 12,7 |
| EN | 461, dont 296 sur d'anciennes URL redirigées | 3 118 | 15,1 |

Backlink : 1 domaine (AS 49, lien suivi), vers l'URL EN actuelle.

Requêtes GSC principales (365 j, clics / impressions / position) :

- FR : quel objectif 0/23/8,8 ; quel objectif photo 0/8/9,6 ; materiel pour packshot 0/142/18,1 ; appareil photo pour shooting produit 0/95/24,3.
- EN : best lens for product photography 6/3 157/10,0 ; best lens product photography 0/780/16,5 ; lens for product photography 3/777/13,3 ; best focal length for product photography 0/632/8,9 ; best camera lens for product photography 0/617/14,9 ; product photography lens 1/600/13,2 ; lenses for product photography 2/440/15,2.

L'EN est la langue qui porte la famille : environ deux tiers des clics et près de cinq fois les impressions du FR, sur une intention « best lens for product photography » que ni son title, ni son h1, ni son metaTitle actuels ne reprennent.

## Origine linguistique

**FR → EN, preuve interne** (reprise de la revue, vérifiée contre `01` et le JSON) :

- déterminants français restés dans l'anglais : « Les multilayer treatments applied to lenses », « La cross polarization can be very useful » ;
- « objectif » rendu par « objective » ou « goals » : « an adapted objective », « An objective 100 mm macro », « Store goals in a airtight box » ;
- « piqué » rendu par « stitch » : « a Upper stitch and less distortion only a zoom » (« qu'un zoom » devenu « only a zoom »), « very correct stitching » ;
- « qu'en grand format imprimé » rendu par « What about large format printed » ; « monture/boîtier » par « frame/case compatibility » ; « mis au point » par « developed » ;
- espace française avant les deux-points dans le JSON EN : « Sigma 105mm f/2.8 Macro : very good quality/price ratio ».

Le FR est le texte source ; l'EN en est une traduction automatique non relue. La version importée de Webflow (`02`) est identique à l'actuelle, hormis les liens internes, l'auteur et « de Levallois » devenu « près de Lyon ».

## Verdict par langue

| Langue | Qualité (revue) | Anomalies (`03`) | Verdict |
|---|---|---|---|
| FR | B | 42 (0 bloquant, 6 majeures, 34 mineures, 2 à valider) | Français natif et techniquement pertinent. Retouches localisées : deux coquilles visibles, un paragraphe en double, six alt techniques, quelques imprécisions optiques, une vidéo invisible. Pas de réécriture d'ensemble. |
| EN | D | 70 (7 bloquantes, 19 majeures, 43 mineures, 1 à valider) | Traduction automatique : faux amis systématiques (objective, goals, stitch, fixed focus, plans, brilliant), phrases incompréhensibles, déterminants français, alt en français. Retraduction intégrale. |
| de-ch | — | — | Sans objet. |

Contrôle de la revue : ses 47 erreurs sont toutes confirmées ; une anomalie automatique (« Packshot Creator » espacé) est retirée, c'est un artefact d'extraction ; 63 anomalies ont été ajoutées (`03`).

## Décisions proposées (résumé)

1. **FR** : corrections localisées (`04-PROPOSITION_FR.md`) — coquilles « Lla » et « xiste-t-il », paragraphe APS-C en double supprimé, typographie française, intertitre « Vidéo packshot », anglicismes (« frame par frame », « social media »), artefacts Webflow retirés. Structure, liens, images et FAQ conservés.
2. **Faits optiques corrigés seulement quand l'erreur est certaine**, tous soumis à Sébastien (`06`, points 3 à 8 et 10) : IA attribuée au système autofocus et non à l'objectif ; aberrations chromatiques liées aux verres autant qu'aux traitements ; facteur APS-C formulé comme une équivalence de champ ; un 1:2 limite le détail, pas la netteté ; focus stacking décrit par plans de netteté ; « une même séance » au lieu d'« une seule prise de vue » ; « fabricants tiers » accordé à la liste. L'ouverture f/4 ou f/5,6 en cosmétique reste `[À VALIDER]` (point 9).
3. **EN** : retraduction intégrale depuis le FR corrigé (`04-PROPOSITION_EN.md`), en anglais américain, avec l'intention « best lens for product photography » dans le h1, le metaTitle, la description et cinq intertitres, dont « Best focal length for product photography » (`05`, `06` point 22).
4. **Métadonnées** : metaTitle FR à 60 caractères et description à 143 ; metaTitle EN à 58 et description à 146 ; neuf alt rédigés par langue d'après les images elles-mêmes ; catégorie EN alignée sur « E-commerce » (à valider) ; **slugs conservés** dans les deux langues.
5. **Claims** : aucun renforcé ni supprimé ; tous listés en `06` (points 12 à 14).
6. **Auteur** : « Laurent Wainberg » rétabli dans la proposition, conformément à la consigne, sous réserve d'une décision Laurent + Sébastien (`06`, point 2).
7. **Hors texte** : la vidéo .mp4 servie dans une balise `<img>` ne s'affiche pas (6 fichiers du blog concernés) ; correction technique à décider (`06`, point 16).

## Fichiers du dossier

- `01-TEXTE_ACTUEL.md`, `02-ORIGINAL_RETROUVE.md` : entrées, non modifiées.
- `03-ANOMALIES_ANNOTEES.md` : 112 anomalies (FR 42, EN 70).
- `04-PROPOSITION_FR.md`, `04-PROPOSITION_EN.md` : textes intégraux proposés.
- `05-METADONNEES_PROPOSEES.md` : title, h1, metaTitle, description, alt, catégorie, analyse des slugs.
- `06-VALIDATION_HUMAINE.md` : 24 points à trancher.
