# Validation humaine — famille 67dd331edc2f76e4765a968b

Décideurs pressentis : **Sébastien** (copywriting FR, faits commerciaux, produits, conformité distributeur), **Laurent** (historique de la société, SEO), **les deux** (noms de personnes). Ordre : du plus engageant au plus mineur. Les renvois « FR-n », « EN-n », « DE-n » désignent les entrées de `03-ANOMALIES_ANNOTEES.md`.

Rappel de gouvernance : le texte FR relève de la validation de Sébastien (D42 étape 5) ; l'EN et la de-ch se recalent sur le FR validé (D38, D42 étape 7). Tant que le FR n'est pas validé, rien n'est publié dans aucune langue.

---

1. **Crédit de l'auteur d'origine : « Laurent Wainberg » rétabli dans l'encart (FR, de-ch, et EN où l'encart est créé).** — *Laurent + Sébastien*
   Le commit `586bf083` (07/05/2026, Sébastien) écrivait « Article publié à l'origine par Laurent Wainberg en février 2024 » et son message dit « crédit Laurent Wainberg comme auteur original ». Le commit `8ae45f63` (12/06/2026, « auteur générique PackshotCreator sur les articles migrés », motif : cohérence E-E-A-T avec le schéma `Organization`) a remplacé le nom par « PackshotCreator » ; la de-ch, créée le 27/06/2026, a hérité du remplacement. La proposition rétablit le nom (FR-31, DE-26, EN-49).
   *Si on ne tranche pas* : la proposition ne peut pas être publiée en l'état (mention `[À VALIDER]`) ; à défaut, on republie avec « PackshotCreator », c'est-à-dire l'état actuel, et la contradiction avec le message du commit `586bf083` demeure.

2. **Champ `author` de l'EN : « PackshotCreator » → « Sébastien Jourdan » (aligné sur FR et de-ch) ou « Laurent Wainberg » (valeur importée de Webflow).** — *Laurent + Sébastien*
   Le commit `4dde4f23` (12/06/2026) a remplacé « Laurent Wainberg » par « PackshotCreator » dans l'EN seulement ; FR et de-ch ont « Sébastien Jourdan » depuis le choix de Sébastien du 07/05/2026. La proposition retient « Sébastien Jourdan », avec Laurent crédité dans l'encart (EN-07).
   *Si on ne tranche pas* : l'EN garde un auteur différent des deux autres langues dans le JSON-LD `Article`.

3. **Version d'Orbitvu Station pour l'export AVIF : 24.1.0 (corps, FAQ n° 5) ou 24.2.0 (FAQ n° 1, « export des présentations en AVIF et WebP »).** — *Sébastien*
   Pas nécessairement contradictoires (export d'images en 24.1.0, export des présentations en 24.2.0 ?), mais à vérifier sur les notes de version Orbitvu. L'image principale montre l'écran « Orbitvu Station 2024 – 24.1.0 Smooth Shadow » et le lien du corps vise un billet `orbitvu-station-2410-step-your-shadow-game` consacré aux ombres (FR-23, FR-38, EN-28, EN-54, DE-20).
   *Si on ne tranche pas* : on publie les deux versions telles quelles ; le risque est une information produit fausse dans trois langues.

4. **Lien « Cloudinary » qui pointe vers `https://thecssagency.com/`.** — *Laurent* (liens sortants), Sébastien informé
   Erreur présente depuis l'import Webflow, dans les trois langues (FR-28, EN-47, DE-23). Options : donner à l'ancre la cible Cloudinary voulue (non connue de ce dossier : l'historique Git des trois fichiers, toutes branches, ne contient aucune URL `cloudinary.com`, et l'import Webflow du 18/04/2026 portait déjà la mauvaise cible) ou supprimer la phrase.
   *Si on ne tranche pas* : le lien trompeur reste en ligne ; la mention `[À VALIDER]` bloque la publication de la phrase.

5. **Fonctions produit Orbitvu présentées comme acquises.** — *Sébastien* (produits, conformité distributeur)
   Studios : « capturent en très haute qualité, puis traitent les images en local avant de les exporter automatiquement » ; « permettent de régler automatiquement le niveau de compression » ; « n'exportent en PNG que lorsque la transparence est indispensable » ; « double export WebP + JPEG si nécessaire » ; FAQ 4 : « vos visuels sont automatiquement exportés dans le format le plus adapté » (atténué : « idéal » dans l'actuel). Orbitvu SUN (FAQ 2) : sert du WebP et bascule vers JPEG ou PNG, « Cette approche garantit une compatibilité universelle ». Aucun de ces points n'est sourcé dans le texte ; tous sont conservés sans renforcement (FR-17, FR-33, FR-37, EN-17, EN-51, DE-12).
   *Si on ne tranche pas* : ils restent publiés tels quels, comme aujourd'hui, sous la responsabilité du distributeur.

6. **Chiffres sans source dans la FAQ n° 4 : « Dans 90 % des cas » et « peuvent doubler le temps de chargement d'une page ».** — *Sébastien*
   Conservés tels quels dans les trois langues (FR-37, EN-53, DE-31). Options : les sourcer, les nuancer (« souvent », « peuvent fortement allonger ») ou les garder.
   *Si on ne tranche pas* : ils restent en ligne, non sourcés.

7. **Effet SEO du WebP (FAQ n° 3).** — *Laurent* (fond SEO), *Sébastien* (formulation FR)
   Actuel : « Il améliore également le référencement naturel (SEO). » Proposé, plus prudent : « En accélérant l'affichage des pages, il contribue aussi au référencement naturel (SEO). » (FR-35, EN-52, DE-30).
   *Si on ne tranche pas* : la formulation proposée, moins affirmative, s'applique avec la validation globale du FR ; revenir à l'actuel reste possible.

8. **Affirmations datées sur AVIF : « l'avenir de la performance visuelle », « Ce format est en cours d'adoption et constitue une avance stratégique ».** — *Sébastien*
   À revalider au moment de republier : AVIF est désormais lu par les principaux navigateurs ; l'adoption côté CMS et outils reste partielle. Conservé tel quel (FR-25, EN-29, DE-21).
   *Si on ne tranche pas* : l'affirmation, déjà ancienne, reste publiée.

9. **FAQ n° 3 : « en 2025 » → « aujourd'hui ».** — *Sébastien*
   L'année est dépassée ; « aujourd'hui » suppose que la recommandation (WebP d'abord, AVIF en alternative) vaut toujours en 2026 (FR-34, EN-52, DE-29).
   *Si on ne tranche pas* : à défaut de validation, garder « en 2025 » plutôt que de laisser la proposition affirmer une actualité non vérifiée.

10. **Correction technique sur le RAW : « sans compression ni traitement » → « données brutes […] avant tout traitement ».** — *Sébastien* (validation du FR)
    Erreur certaine : de nombreux formats RAW sont compressés, sans perte (DNG, la plupart des NEF et CR2) et parfois avec perte (C-RAW de Canon, RAW compressé de Sony ou de Nikon). Seule correction de fait technique du dossier (FR-14, EN-15, DE-11). Aucun autre fait technique sur JPEG, PNG, WebP et AVIF n'a été jugé faux ; « la plupart des navigateurs modernes » pour WebP sous-estime sans être faux, et n'est pas corrigé (FR-22).
    *Si on ne tranche pas* : l'inexactitude reste en ligne dans les trois langues.

11. **Descriptions : retrait de « Comparatif complet » / « Vollständiger Vergleich » et de « impact sur vos ventes en ligne » / « Auswirkung auf Ihre Online-Verkäufe ».** — *Laurent* (SEO), *Sébastien* (copywriting FR)
    Promesses non tenues par le corps (FR-07, DE-04) ; la description FR actuelle est celle que Sébastien a écrite le 07/05/2026 pour cibler « format image web ». Les nouvelles valeurs sont dans 05 (149, 151 et 153 caractères).
    *Si on ne tranche pas* : les descriptions actuelles restent, avec leur promesse non tenue ; l'EN garde sa description héritée de l'ancienne version FR.

12. **FR : `metaTitle` avec PNG, minuscule après deux-points dans `title` et `h1` ; options non retenues.** — *Laurent*
    Retenu : « Quel format d'image pour le web : JPEG, PNG, WebP, AVIF ? » (57 caractères) et « JPEG, PNG, RAW, WebP : quel format d'image pour le web ? ». Non retenu, à décider : ajouter AVIF au H1 (le H1 annonce RAW, que l'article déconseille pour le web, mais pas AVIF) ; passer l'intertitre d'ouverture « Optimiser ses images, c'est optimiser ses ventes » de H3 en H2 (FR-05, FR-06, FR-10).
    *Si on ne tranche pas* : seules les corrections retenues s'appliquent ; le H1 garde sa liste actuelle.

13. **EN : suppression du bloc promotionnel Orbitvu (environ 420 mots) pour suivre le FR.** — *Sébastien* (faits commerciaux) + *Laurent* (historique, SEO de l'EN)
    Le FR l'a perdu le 07/05/2026 (« nettoyage Orbitvu ») ; l'EN le garde. La retraduction ne le reprend pas (EN-31 à EN-46). Claims retirés de l'EN : « exceptional customer support » ; « several updates per year » ; « You are investing in a sustainable technology » ; « available in several countries » ; « maximizes the lifespan of your investment » ; « growth partner for product photographers » ; formation PackshotCreator avec lien vers `/fr/academy` (page FR depuis l'EN) ; « Near Lyon, the Orbitvu Experience Center » — lieu changé le 12/06/2026 (commit `4dde4f23`) alors que la version importée disait « Levallois-Perret » : fait d'historique à confirmer si le bloc devait revenir.
    *Si on ne tranche pas* : l'EN reste désaligné du FR (D38) et continue de servir ces claims et ses défauts de traduction automatique, dont trois bloquants.

14. **EN : `title` et `h1` réécrits pour porter « best image format for the web ».** — *Laurent*
    « JPEG, PNG, RAW, WebP: What's the best image format for the web? » (EN-04) ; requête principale à la position 19,8.
    *Si on ne tranche pas* : on garde « What image format for the web? », correct mais sans la requête principale.

15. **Date de publication « février 2024 ».** — *Laurent* (historique)
    Le texte servi cite Orbitvu Station 24.1.0 et 24.2.0 et une FAQ « en 2025 » ; l'item Webflow a été créé le 21/03/2025 et les images du corps les 20 et 21/03/2025 (horodatage ObjectId, inférence). Il est possible qu'une première version, sous d'anciennes URL ES, NL et DE, date de février 2024, et que le texte actuel en soit une refonte de mars 2025. Conservé tel quel (FR-08).
    *Si on ne tranche pas* : la date et la mention « publié à l'origine […] en février 2024 » restent ; risque faible, mais incohérence visible avec « en 2025 » si la FAQ n'est pas corrigée.

16. **`dateModified` vide dans les trois langues.** — *Laurent* (données structurées), *Sébastien* (ligne de crédit)
    Proposé : 2026-05-07, conforme à l'encart, ou la date de mise en ligne de la version corrigée ; dans ce second cas, la ligne « mis à jour le 7 mai 2026 par Sébastien Jourdan » doit suivre (FR-09).
    *Si on ne tranche pas* : le JSON-LD reste sans `dateModified`, comme aujourd'hui.

17. **Bio de Sébastien Jourdan : fonction et ancienneté.** — *Sébastien*
    « directeur de PackshotCreator – Sysnext » (FR, inchangé) ; « heads PackshotCreator – Sysnext » (EN) ; « leitet PackshotCreator – Sysnext » (de-ch, au lieu de « Direktor » ; « Geschäftsführer » non retenu faute de connaître la fonction juridique) ; « depuis plus de 20 ans » (FR-29, DE-25, EN-49).
    *Si on ne tranche pas* : la bio FR reste telle quelle ; les formulations EN et de-ch proposées, neutres, s'appliquent.

18. **Ancre « blendai.studio » qui mène à la page interne `/…/ia-photo-produit`.** — *Sébastien*
    L'ancre annonce un domaine externe (FR-30). Conservée ; l'EN pointe vers `/en/ia-photo-produit`, route existante.
    *Si on ne tranche pas* : le lien reste tel quel.

19. **Autres liens sortants : « The CSS Agency » (page d'accueil, présentée comme « un guide complet sur les formats d'image ») et « Etowline » (article en français lié depuis l'EN et la de-ch).** — *Laurent*
    Cibles conservées ; mention « (in French) » / « (auf Französisch) » ajoutée après l'ancre Etowline (FR-27, EN-48, DE-24).
    *Si on ne tranche pas* : les cibles restent ; la mention de langue s'applique avec la proposition.

20. **Images : attribution du schéma, image principale et licence.** — *Sébastien* (conformité distributeur)
    a) Le schéma `67dd3219…` (« Scan barcode », « Capture », « Remove Background »…) ne porte aucun nom : l'alt proposé ne l'attribue pas à Orbitvu Station. À préciser si c'est bien une capture Orbitvu.
    b) L'image principale `67dd2ff2…` reproduit l'écran de démarrage « Orbitvu Station 2024 – 24.1.0 Smooth Shadow » avec les mentions « For internal use only! », « Shot by Julia Banduch with ALPHASHOT XL PRO v2 » et « © Orbitvu Sp. z o.o. All right reserved ». Vérifier que la diffusion publique de ce visuel est autorisée par Orbitvu.
    c) Photo JJ Harrison (CC BY-SA 3.0) : crédit et lien de licence conservés dans les trois langues. Le fichier publié est une conversion AVIF de l'original ; la licence demande d'indiquer si des modifications ont été faites : une mention « (converti au format AVIF) » est possible si on l'estime nécessaire.
    *Si on ne tranche pas* : les visuels restent en ligne tels quels ; seuls les textes alternatifs changent.

21. **Slug de-ch `…-fur-das-web` conservé ; test e2e en retard sur le Worker.** — *Laurent*
    Slug conservé (backlink suivi vers `/de/blog/…`, 43 des 48 clics de-ch sur l'ancienne URL) : analyse dans 05. En passant (R8) : `e2e/redirections.spec.ts` l. 126 attend une redirection de `/de/blog/welches-bildformat-ist-das-beste-fur-das-web` vers l'EN, alors que le Worker du dépôt redirige vers la de-ch. Le test est à mettre à jour par la session qui en a la charge ; rien n'est modifié ici (lecture seule).
    *Si on ne tranche pas* : aucun effet sur la page ; le test e2e reste faux s'il est exécuté contre la production.

22. **Graphies retenues.** — *Sébastien*
    « PackshotCreator – Sysnext » (en un mot, sans l'italique « Packshot*Creator* » de l'ancien bloc EN) ; « Orbitvu », « Orbitvu Station », « Orbitvu SUN », « Orbitvu SUN Cloud », « studios Orbitvu » (FR) / « Orbitvu studios » (EN) / « Orbitvu-Studios » (de-ch). Alphashot et Shotflow n'apparaissent pas dans le texte (seulement « ALPHASHOT XL PRO v2 » dans l'image principale, non modifiable). Aucun témoignage client dans aucune langue (D31 sans objet).
    *Si on ne tranche pas* : les graphies ci-dessus s'appliquent.
