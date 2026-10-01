# Validation humaine — famille 67dd7e0cbd182b5e0eec9fc0

Points qui exigent une décision. Décideur pressenti : **Sébastien** (copywriting FR, faits commerciaux, produits, prix, conformité distributeur), **Laurent** (historique de la société, SEO), **Laurent + Sébastien** (noms de personnes, témoignages). Pour chaque point : ce que fait la proposition, et ce qui se passe si personne ne tranche.

Rappel de gouvernance : rien n'est publié. Le FR passe par la validation de Sébastien (D42 étape 5) ; l'EN se recale ensuite sur le FR validé (D42 étape 7). Il n'y a pas de version de-ch dans cette famille, ni de témoignage client.

## Texte et faits techniques

1. **Validation du texte FR** — Sébastien.
   La proposition `04-PROPOSITION_FR.md` traite les 42 anomalies FR relevées en `03` (dont 4 de métadonnées), sans réécriture d'ensemble. Deux coquilles sont visibles aujourd'hui sur la page : « Lla photographie packshot » (conclusion) et « xiste-t-il » (question de FAQ, reprise dans les données structurées FAQPage). Elles peuvent être corrigées seules, tout de suite, sans attendre le reste.
   *Sans décision* : le FR actuel reste en ligne avec ses coquilles, et l'EN ne peut pas être recalé sur un FR validé.

2. **Auteur de l'article** — Laurent + Sébastien.
   L'import Webflow (`56d4bc32`) indiquait « Laurent Wainberg » dans les deux langues. Le commit `4dde4f23` (12/06/2026, « purge anciennes coordonnées ») a posé l'auteur générique « PackshotCreator » sur 13 fichiers, dont ceux-ci : le message du commit montre que c'était un choix délibéré, lié au retrait des anciennes coordonnées. Conformément à la consigne du dossier, la proposition rétablit « Laurent Wainberg » (`05`). Il faut trancher entre un auteur nommé et la signature de marque ; la décision vaut sans doute pour les 12 autres fichiers du même commit (rayon d'action à déclarer, R8).
   *Sans décision* : l'auteur reste « PackshotCreator » ; le champ `author` de la proposition n'est pas appliqué.

3. **IA attribuée à l'objectif** — Sébastien.
   L'actuel écrit que « certains objectifs intégrant des algorithmes d'IA » anticipent la mise au point. La détection et la prédiction de mouvement sont calculées par le système autofocus du boîtier ; le paragraphe suivant parle d'ailleurs de « systèmes d'autofocus ». La proposition écrit « certains systèmes autofocus dotés d'algorithmes d'IA » et « Ces systèmes font gagner… » (FR-10, FR-11, EN-16, EN-18).
   *Sans décision* : l'inexactitude reste dans les deux langues.

4. **Traitements multicouches et aberrations chromatiques** — Sébastien.
   L'actuel attribue la meilleure maîtrise des aberrations chromatiques aux seuls traitements antireflet et anti-halo ; elle dépend surtout de la formule optique et des verres. La proposition ajoute « tout comme les verres eux-mêmes », sans nommer de type de verre, faute de source dans le texte (FR-13, EN-19).
   *Sans décision* : la phrase actuelle, inexacte, reste.

5. **Facteur de recadrage APS-C** — Sébastien.
   « La focale perçue est allongée… un 50 mm devient un 75 mm » devient « le champ cadré correspond à celui d'une focale environ 1,5 fois plus longue ; un 50 mm cadre comme un 75 mm en plein format » (FR-18, EN-30). Le coefficient « environ 1,5 » est conservé ; il varie selon les marques (1,6 chez Canon), précision absente du texte et donc non ajoutée. Ajouter cette précision est une option. La suppression du paragraphe en double (FR-21, EN-33) ne demande pas de décision.
   *Sans décision* : la formulation actuelle, approximative, reste.

6. **Objectif 1:2** — Sébastien.
   « ce qui limite la netteté dans les gros plans » devient « ce qui limite le niveau de détail dans les gros plans » : un grandissement 1:2 limite le détail enregistré, pas la netteté (FR-19, EN-31).
   *Sans décision* : l'affirmation actuelle, inexacte, reste.

7. **Description du focus stacking dans la FAQ** — Sébastien.
   « Chaque point du produit est mis au point séparément, puis fusionné » devient « L'appareil prend une série d'images en décalant la mise au point d'un plan à l'autre du produit, puis les fusionne automatiquement » (FR-38, EN-64). La FAQ alimente les données structurées FAQPage.
   *Sans décision* : la FAQ décrit le procédé de façon erronée (et l'EN parle de « developed »).

8. **« Réunies dans une seule prise de vue »** (FAQ) — Sébastien.
   Focus stacking et animation 360° supposent plusieurs prises de vue. La proposition écrit « au cours d'une même séance de prise de vue » (FR-35, EN-62).
   *Sans décision* : la formule actuelle, contradictoire, reste.

9. **Ouverture conseillée pour les textures cosmétiques (f/4 ou f/5,6)** — Sébastien, avec l'avis d'un photographe.
   L'article recommande f/8 à f/11 et prévient que, plus ouvert que f/5,6, le flou devient gênant ; la section cosmétique conseille pourtant f/4 ou f/5,6 « pour valoriser le relief ». Valeurs conservées, note `[À VALIDER]` dans les deux propositions (FR-23, EN-40). Options : (a) assumer l'exception et l'expliquer (profondeur de champ réduite voulue sur une texture) ; (b) aligner sur f/8 à f/11, avec focus stacking si besoin.
   *Sans décision* : retirer la note `[À VALIDER]` avant publication ; la contradiction reste.

10. **« Fabricants tiers » et liste incluant Canon et Nikkor** — Sébastien.
    La proposition écrit « Les fabricants tiers, mais aussi les marques d'appareils elles-mêmes, proposent… » pour accorder la phrase à la liste (FR-30, EN-52).
    *Sans décision* : la phrase actuelle reste, contredite par sa propre liste.

11. **Objectifs recommandés** — Sébastien (expert produit, conformité avec les configurations Orbitvu).
    Modèles cités : Canon EF 100 mm f/2.8L Macro IS USM, Sigma 105 mm f/2.8 DG DN Macro Art, Canon EF 24-105 mm f/4L, Sigma 105 mm f/2.8 Macro, Tamron SP 90 mm f/2.8 Di Macro, Canon 50 mm f/1.8 STM, Nikkor 50 mm f/1.8 G. À vérifier : (a) le Sigma de la liste « petit budget » est-il le DG DN recommandé plus haut, conçu pour les hybrides, auquel cas « compatible Canon/Nikon/Sony » serait faux, ou l'ancienne version reflex (FR-31) ; (b) ces références EF et F, toutes reflex, restent-elles pertinentes pour les boîtiers que pilotent aujourd'hui les studios Orbitvu ; (c) la reconnaissance des objectifs par le logiciel Orbitvu. Rien n'a été modifié ni ajouté ; seules les graphies sont harmonisées (FR-14, FR-15).
    *Sans décision* : les recommandations restent telles quelles.

## Claims et faits commerciaux

12. **Chiffres et promesses sans source, conservés tels quels** — Sébastien.
    Aucun n'a été renforcé ni supprimé. Repérés :
    - « workflow 100 % maîtrisé » (introduction) ;
    - « temps d'acquisition qui descendent à 0,05 seconde sur certains modèles haut de gamme » ;
    - « sans perte de netteté » (objectifs 1:1) ; « des images plus fidèles, moins de retouches et un workflow plus rapide » ;
    - « pour garantir une netteté parfaite sur l'ensemble du volume » (focus stacking automatisé) ;
    - « Elle garantit une netteté continue sur toute la profondeur du produit » (macro 100 mm + focus stacking Orbitvu) ;
    - FAQ : « netteté parfaite sur l'ensemble du produit […] une image exploitable immédiatement, sans retouche, dans tous les formats » et la question « … sans retouche ? » ;
    - FAQ : « Productivité maximale » ;
    - « Un bon objectif peut durer dix ans ou plus » (actuel : « une décennie ») ;
    - repères techniques chiffrés : focale d'au moins 50 mm, grand angle sous 35 mm, macro 100 mm, ouverture f/8 à f/11, seuils f/5,6 et f/16, coefficient 1,5, distance minimale de 30 cm, 50 à 85 mm pour le textile, 50 à 100 mm dans la FAQ.
    Variantes plus prudentes, si Sébastien le souhaite : « une image exploitable immédiatement, avec peu ou pas de retouche » ; « Elle assure une netteté continue… » ; « Un vrai gain de productivité. »
    *Sans décision* : statu quo, aucune exposition nouvelle.

13. **Affirmations sur les produits Orbitvu** — Sébastien.
    À confirmer : les studios Orbitvu « intègrent » éclairage multi-sources, filtres polarisants sur les sources et sur l'objectif, positionnement précis des LED ; l'objectif doit être « reconnu par votre logiciel Orbitvu » ; « certains studios Orbitvu » automatisent rotation, variation de zoom et changement d'angle ; focus stacking automatique ; mémorisation des réglages, éclairage et cadrage automatisés (FAQ) ; animations et vidéos 360° (FAQ) ; dans l'Alphashot Pro G2, on ne peut pas toujours avancer ou reculer le boîtier.
    *Sans décision* : conservées telles quelles.

14. **Orbitvu Experience Center, « près de Lyon »** — Sébastien ; pour mémoire, Laurent.
    L'import indiquait « Orbitvu Experience Center de Levallois » ; `4dde4f23` a remplacé la commune par « près de Lyon », l'adresse précise étant centralisée sur la page contact. À confirmer : nom exact du lieu, ouverture aux visiteurs pour tester des objectifs, lien vers `/fr/contact` et `/en/contact`. La proposition corrige seulement « au Orbitvu » en « à l'Orbitvu » (FR-33, EN-60) ; l'EN ajoute « France » après « Lyon » pour le lecteur étranger.
    *Sans décision* : texte conservé.

15. **Vidéo YouTube en tête d'article** (`9Yrf5vwJsu4`) — Sébastien.
    Son titre, « What is Virtual Lights and how it works? I ALPHASHOT PRO G2 », annonce une présentation de l'éclairage virtuel de l'Alphashot Pro G2, en anglais, sans rapport direct avec le choix d'un objectif (FR-05). Options : garder, remplacer par une vidéo sur les objectifs si elle existe, retirer.
    *Sans décision* : la vidéo reste.

## Technique et SEO

16. **Vidéo `.mp4` servie dans une balise `<img>`** — Sébastien (technique ; rayon large, R8).
    `67dd78ab2ada2492494ff04d.mp4` (FR) et `67dedf2d5b1d1dd831c27c99.mp4` (EN) sont dans des `<img>` : aucun navigateur ne les affiche, et `lib/blog-utils.ts` ne convertit pas ce cas (seules les bannières `.mp4` d'en-tête passent en `<video>`). Le même défaut touche 6 fichiers du blog. Options : corriger le JSON de ces deux pages, ou traiter le cas dans `lib/blog-utils.ts` pour tout le blog (rayon : 6 fichiers, à déclarer). La proposition garde `src` et position, et rédige l'alt (FR-27, EN-51).
    *Sans décision* : l'animation reste invisible.

17. **Lien « textiles » de l'introduction FR** — Laurent.
    Il pointe vers `/fr/industrie` (repointage de `ed5dc135` depuis `/fr/industrie/shootings-photo`), alors que la page `/fr/industrie/mode-textile` existe et que l'EN pointe vers `/en/industrie/mode-textile`. Recommandation : repointer vers `/fr/industrie/mode-textile`. La proposition garde la cible actuelle (consigne) (FR-01).
    *Sans décision* : lien conservé vers la page générique.

18. **Liens externes de la page EN vers des sites français** — Laurent.
    Les trois liens produits de la page EN mènent à `canon.fr` et `sigma-photo.fr`. Cibles conservées (consigne). Option : pointer vers les pages internationales ou américaines des mêmes produits (EN-22).
    *Sans décision* : un lecteur anglophone arrive sur des pages en français.

19. **Catégorie EN** — Laurent.
    FR « E-commerce », EN « Innovations ». Proposition : aligner l'EN sur « E-commerce » (`104a291d655dd1b3985ecb9a34c0df8a`, catégorie qui existe en EN). Effet : l'article change de rubrique dans la liste du blog EN, sans changement d'URL (EN-M5).
    *Sans décision* : divergence conservée.

20. **Date de publication et date de mise à jour** — Laurent.
    Date affichée : 21/02/2024 ; l'item Webflow a été créé le 21/03/2025 (inférence par ObjectId) et le texte cite l'Alphashot Pro G2. `dateModified` est vide. À décider : garder ou corriger la date de publication ; renseigner `dateModified` à la mise en ligne de la retraduction (FR-M4).
    *Sans décision* : dates inchangées.

21. **Graphie des noms** — Sébastien.
    Le corps écrit `Packshot<em>Creator</em>` (ancien style, « Creator » en italique, 43 fichiers du blog) puis « PackshotCreator » en clair dans la conclusion. Proposition : « PackshotCreator » en clair, en un mot, partout dans cet article (FR-02). Shotflow n'apparaît pas dans cette famille : aucune graphie à arrêter ici. Orbitvu, Alphashot Pro G2, Orbitvu Experience Center et Orbitvu Fashion Studio (alt) sont écrits de façon constante.
    *Sans décision* : la proposition s'applique avec la graphie en clair ; l'italique reste ailleurs sur le site.

22. **Réorientation des métadonnées EN vers « best lens for product photography »** — Laurent.
    L'EN est la langue qui porte la famille (461 clics sur 365 jours ; 3 157 impressions et position 10,0 sur « best lens for product photography »). Le title, le h1 et le metaTitle actuels, traduits du FR, ne contiennent pas cette requête ; seul le slug la porte. Proposition : h1 « How to choose the best lens for product photography », metaTitle « Best lens for product photography: complete packshot guide », description corrigée (« prime » au lieu de « fixed focus »), cinq intertitres porteurs de la requête (`05`). Risque : tout changement de `<title>` et de h1 fait bouger le classement pendant quelques semaines, dans un sens ou dans l'autre ; à suivre dans GSC après mise en ligne.
    *Sans décision* : retraduire au minimum la description, qui contient l'erreur « fixed focus », et garder les titres actuels.

23. **metaTitle et description FR** — Laurent.
    metaTitle ramené de 70 à 60 caractères (« Quel objectif photo choisir pour le packshot ? Guide complet »), description de 240 à 143 caractères ; une variante de 152 caractères garde Orbitvu (`05`).
    *Sans décision* : le metaTitle reste tronqué dans les résultats de recherche, sans autre dommage.

24. **Textes alternatifs et images** — Sébastien.
    (a) Objectif zoom Canon (`67dd701ff8366b61902286f9.avif`) : la focale n'est pas lisible sur l'image ; l'alt dit « Objectif zoom Canon EF de la série L, à stabilisateur », à préciser si c'est bien l'EF 24-105 mm f/4L IS II USM. (b) Vidéo `.mp4` : description à confirmer en lecture. (c) Lamelles de diaphragme (`67dbae6589928f8e5c796347.avif`, actuellement « décorative ») : alt court proposé, `alt=""` reste défendable. (d) Le schéma du rapport de grandissement (`67dbae6589928f8e5c79631f.avif`) porte des légendes incrustées en anglais sur la page française : en faire une version française est une option.
    *Sans décision* : les alt proposés s'appliquent tels quels ; aucun n'invente d'information.
