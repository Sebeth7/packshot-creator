# 03 — Anomalies annotées — famille 67d154e9a53d05fd8c219b8c

Base : `01-TEXTE_ACTUEL.md` (`main` `17fc0b3`, 01/10/2026) et JSON `content/blog/<langue>/<slug>.json`. Revue de référence : `reviews/67d154e9a53d05fd8c219b8c.json` (58 erreurs, 12 claims).

Lecture :

- **Extrait actuel** : mot pour mot, marqueurs de gras Markdown retirés ; « ⏎ » = `<br>` dans le HTML.
- **Source** : `R n` = erreur n de la revue ; `C n` = claim n de la revue ; `nouveau` = relevé dans ce dossier.
- **Gravité** : bloquant (sens détruit ou faux), majeur (erreur visible, fait douteux, nom de personne), mineur (style, typographie, imprécision).
- **Correction** : ce que fait la proposition `04-PROPOSITION_<langue>.md`. Les retouches de fluidité sans incidence sur le sens (ordre des mots, connecteurs, répétitions) ne sont pas toutes itemisées : elles se lisent en comparant `01` et `04`.

## Bilan

Une entrée = une anomalie élémentaire ; la FAQ FR est détaillée en sous-entrées FR-52a à FR-52m, comptées une à une. « Revue » = entrée qui reprend une erreur, un claim ou une remarque de la revue (y compris ses sections images, titres, structure) ; « nouvelle » = relevée seulement dans ce dossier.

| Langue | Anomalies | dont issues de la revue | dont nouvelles | Bloquant | Majeur | Mineur |
|---|---|---|---|---|---|---|
| FR | 64 | 35 | 29 | 0 | 11 | 53 |
| EN | 66 | 47 | 19 | 3 | 23 | 40 |
| de-ch | 38 | 25 | 13 | 0 | 10 | 28 |
| **Total** | **168** | **107** | **61** | **3** | **44** | **121** |

Vérification de la revue contre `01-TEXTE_ACTUEL.md` : les 58 erreurs et les 12 claims sont présents dans le texte servi. **Aucune n'est retirée comme fausse.** Deux sont requalifiées : R42 (section terminologique et FAQ supplémentaire de l'EN) n'est pas une faute mais une divergence voulue par `37da2e28` pour la requête « packshot meaning » : elle est conservée et documentée (EN-21, EN-64) ; R36 regroupe cinq occurrences de « a » devant voyelle, réparties ici à leur place dans le texte (EN-17, EN-29, EN-33, EN-47). Les propositions de la revue en anglais britannique (« specialised », « colours ») ne sont pas reprises : l'usage du dépôt est l'anglais américain.

---

## FR — /fr/blog/guide-photographie-packshot-pourquoi-faire-packshots

### Métadonnées et image principale

**FR-01** · incohérence SEO · mineur · R15
- Extrait actuel : « Packshot : définition, techniques et conseils e-commerce — PackshotCreator » (`metaTitle`)
- Explication : 74 caractères ; au-delà d'environ 60, Google tronque le titre. Le gabarit (`app/[lang]/blog/[slug]/page.tsx`) l'emploie tel quel comme `<title>`.
- Correction : `metaTitle` de 58 caractères (voir `05`).

**FR-02** · claim / date · mineur · C12
- Extrait actuel : « Qu'est-ce qu'un packshot ? Définition, caractéristiques, types et conseils pratiques pour réussir vos photos produit e-commerce. Guide complet 2026. » (`description`)
- Explication : millésime qui périme le 01/01/2027 ; « guide complet » alors que le corps se présente comme « ce premier article » d'une série en quatre volets.
- Correction : description sans millésime (voir `05`).

**FR-03** · image / légende · mineur · nouveau
- Extrait actuel : image principale `/images/blog/67dbae71504f03ad3bf5accd.avif`, texte incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 1 ».
- Explication : la numérotation « 1 » a été retirée des titres par `a8a3d3f6` mais reste dans l'image ; la même image, en français, est servie en EN et en de-ch. Son `alt` est le `h1` (gabarit).
- Correction : aucune dans le texte ; décision au point 17 de `06`.

### Corps

**FR-04** · typographie · mineur · nouveau
- Extrait actuel : « Si vous vendez des produits sur internet » / « d'une entreprise sur internet » / « Avec Internet »
- Explication : graphie flottante ; l'intertitre « Internet, une nouvelle ère… » impose la majuscule.
- Correction : « Internet » partout.

**FR-05** · syntaxe · mineur · nouveau
- Extrait actuel : « Par définition, la photographie packshot est une technique photographique spécialisée à destination notamment des sites e-commerce pour capturer des images de produits isolés sur un fond neutre. »
- Explication : enchaînement « à destination notamment de… pour capturer » lourd et ambigu ; c'est la phrase qui a produit le contresens EN (EN-06).
- Correction : « …est une technique photographique spécialisée qui consiste à photographier des produits isolés sur un fond neutre, notamment pour les sites e-commerce. »

**FR-06** · structure · mineur · revue (structure)
- Extrait actuel : 22 « (paragraphe vide) » (U+200D) autour des images et des intertitres.
- Explication : artefacts Webflow, identiques dans les trois langues ; déjà retirés au rendu depuis la PR #50.
- Correction : non reproduits dans les propositions.

**FR-07** · alt · majeur · R14
- Extrait actuel : `alt="__wf_reserved_inherit"` sur `/images/blog/67dbae71504f03ad3bf5ac89.avif`
- Explication : valeur réservée de Webflow, vide de sens pour un lecteur d'écran et pour Google Images.
- Correction : « Packshot d'un sac cabas gris sur fond blanc » (image examinée).

**FR-08** · alt · mineur · revue (images)
- Extrait actuel : `alt="photo détails produit photographie packshot"` sur `…628ca4.avif`
- Explication : suite de mots-clés, ne décrit pas l'image (bottines bleues et trois loupes de détail).
- Correction : « Packshot de bottines bleues à lacets avec trois agrandissements de détails : œillets et lacets, semelle surpiquée, coutures ».

**FR-09** · lexique · mineur · nouveau
- Extrait actuel : « La photographie packshot suppose ainsi une connaissance minutieuse de la lumière »
- Explication : « minutieux » qualifie un travail, pas une connaissance.
- Correction : « une connaissance approfondie ».

**FR-10** · alt · majeur · R14
- Extrait actuel : `alt="__wf_reserved_inherit"` sur `…ac83.avif`
- Correction : « Mains positionnant une pièce métallique cylindrique sur une surface blanche, à l'aide de repères laser verts ».

**FR-11** · alt · mineur · revue (images)
- Extrait actuel : `alt="photographie packshot sur un site e-commerce"` sur `…628cb6.avif`
- Explication : générique ; l'image montre une fiche produit (chaise haute pour enfant, vignettes de vues).
- Correction : « Fiche produit e-commerce présentant le packshot d'une chaise haute pour enfant et les vignettes de ses autres vues ».

**FR-12** · grammaire · mineur · nouveau
- Extrait actuel : « En effet, si vous allez investir dans des photographies packshot, vous seriez en droit de vous attendre à les utiliser au maximum de leur capacité. »
- Explication : concordance fautive (« si » + futur proche → conditionnel) ; « au maximum de leur capacité » est un calque.
- Correction : « Si vous investissez dans des photographies packshot, vous êtes en droit d'attendre qu'elles servent au maximum. »

**FR-13** · logique / structure · majeur · R3
- Extrait actuel : « Dans le secteur des meubles, des images détaillées peuvent aider les clients à apprécier la qualité et le design des pièces, facilitant ainsi leur décision d'achat : »
- Explication : la phrase s'intercale entre « multiples usages » et la liste des usages qu'elle introduit par deux-points ; le lecteur attend une liste propre au mobilier. Présente dès l'import Webflow, reprise en EN et en de-ch.
- Correction : la liste est introduite par « …elles se prêtent à de multiples usages : » ; la phrase sur le meuble passe en tête du paragraphe suivant, comme premier exemple (« Dans le secteur du meuble, par exemple… »), avant celui du magasin de vêtements. Aucun contenu retiré.

**FR-14** · style · mineur · nouveau
- Extrait actuel : « dans le cadre d'une communication publicitaire et promotionnelle de votre entreprise et de ses produits via l'utilisation de visuels publicitaires » / « dans le cadre d'une communication en interne (formation des employés sur les caractéristiques d'un produit par exemple) »
- Explication : « dans le cadre de » répété, « via l'utilisation de » redondant, « former sur » au lieu de « former à ».
- Correction : « dans la communication publicitaire et promotionnelle de votre entreprise et de ses produits : visuels publicitaires… » ; « dans la communication interne (pour former les employés aux caractéristiques d'un produit, par exemple) ».

**FR-15** · registre · mineur · nouveau
- Extrait actuel : « tout en communiquant dessus dans des campagnes publicitaires en ligne ou sur des brochures promotionnelles »
- Explication : « communiquer dessus » est familier.
- Correction : « tout en mettant cette collection en avant dans des campagnes publicitaires en ligne ou des brochures promotionnelles ».

**FR-16** · grammaire · mineur · nouveau
- Extrait actuel : « Cependant, l'usage premier de photographies packshot demeure dans les fiches produits d'un site e-commerce, c'est donc sur cette utilisation que nous nous concentrerons »
- Explication : article manquant (« des photographies »), « demeurer dans » impropre.
- Correction : « L'usage premier des photographies packshot reste toutefois la fiche produit d'un site e-commerce : c'est donc sur cet usage que nous nous concentrerons… »

**FR-17** · fait non sourcé · majeur · R2, C5
- Extrait actuel : « Le terme « packshot » est officiellement reconnu en France. Le Journal officiel a établi la terminologie officielle de la photographie publicitaire de produit dès le décret de 1983, complété en 2000. […] Cette reconnaissance institutionnelle illustre la place que la photographie packshot occupe dans la communication commerciale moderne — bien au-delà du simple visuel e-commerce. »
- Explication : affirmation institutionnelle sans source, ajoutée par `a8a3d3f6`. Trois points fragiles : (1) la nature du texte (« décret ») et ses dates ; (2) « officiellement reconnu » : le dispositif de terminologie officielle publie en principe des équivalents français à préférer aux termes étrangers, ce qui pourrait signifier l'inverse [inférence, non vérifiée : aucun accès web dans ce dossier] ; (3) « photographie publicitaire de produit » contredit la FAQ du même article (« Années 1980-1990 : Le packshot est exclusivement un terme de production vidéo publicitaire »).
- Correction : formulation prudente, cohérente avec la FAQ et sans « reconnu » ni « décret » (« Le terme « packshot » est issu de la publicité et figure dans la terminologie officielle française : le Journal officiel a publié la terminologie de ce domaine dès 1983, avec un complément en 2000. »), marquée `[À VALIDER]`. Claim non supprimé ; décision au point 3 de `06`.

**FR-18** · fait non sourcé · mineur · C6
- Extrait actuel : « Au Québec, on parle plutôt de « photo d'emballage ». »
- Explication : usage terminologique non sourcé.
- Correction : conservé, marqué `[À VALIDER]` ; point 4 de `06`.

**FR-19** · lexique · mineur · nouveau
- Extrait actuel : « avec la photographie lifestyle et la photographie nature morte » (et plus loin « Une photographie nature morte vise elle à »)
- Explication : on dit « photographie de nature morte » ; l'intertitre de la section dit d'ailleurs « en nature morte ».
- Correction : « photographie de nature morte ».

**FR-20** · alt · mineur · revue (images)
- Extrait actuel : `alt="Packshot multi vues d'un casque moto"` sur `…ac90.avif`
- Explication : « multivue » s'écrit soudé ; « casque de moto » ; le nombre de vues et le fond ne sont pas décrits.
- Correction : « Packshot multivue d'un casque de moto intégral, présenté sous cinq angles sur fond blanc ».

**FR-21** · alt · mineur · revue (images)
- Extrait actuel : `alt="photo de chaussures en nature morte"` sur `…628cbf.avif`
- Correction : « Nature morte : deux baskets mises en scène en suspension sur fond gris clair ».

**FR-22** · ambiguïté · mineur · nouveau
- Extrait actuel : « un photographe produit en nature morte peut ainsi ajouter une dimension artistique »
- Explication : « photographe produit » se lit comme un participe (« photographe [qui a] produit ») ; c'est l'origine du « photographer produced » de l'EN (EN-29).
- Correction : « le photographe spécialisé en nature morte peut apporter une dimension artistique ».

**FR-23** · grammaire · mineur · nouveau
- Extrait actuel : « Ainsi, la photographie de produit en nature morte n'est pas vraiment adaptée à une utilisation e-commerce comme le produit n'est pas nécessairement représenté fidèlement. »
- Explication : « comme » causal se place en tête de phrase ; « ainsi » répété deux phrases de suite.
- Correction : « Comme le produit n'y est pas forcément représenté fidèlement, la nature morte n'est pas vraiment adaptée à l'e-commerce. »

**FR-24** · accord · mineur · R9
- Extrait actuel : « En revanche, ce type de technique est idéale pour une campagne publicitaire. »
- Correction : « Ce type de photographie est en revanche idéal pour une campagne publicitaire. »

**FR-25** · alt · mineur · revue (images)
- Extrait actuel : `alt="exemple d'une image lifestyle d'une montre"` sur `…628cdd.avif`
- Correction : « Photo lifestyle d'une montre portée au poignet, bracelet textile bleu et vert, avec chemise rayée et veste claire ».

**FR-26** · syntaxe · mineur · nouveau
- Extrait actuel : « Elle permet de montrer aux clients comment utiliser les produits entre autres. Elle permet aussi de leur donner une idée de la taille et de la pertinence du produit dans leur vie quotidienne. »
- Explication : « entre autres » mal placé ; « pertinence du produit dans leur vie » est un calque de « relevance ».
- Correction : « Elle permet notamment de montrer aux clients comment utiliser les produits, et de leur donner une idée de leur taille et de leur utilité dans la vie quotidienne. »

**FR-27** · anglicisme · mineur · nouveau
- Extrait actuel : « ouvrant un workflow hybride packshot + IA pour les catalogues e-commerce »
- Explication : signe « + » dans une phrase ; « workflow » est l'usage du métier et reste.
- Correction : « ce qui ouvre la voie à un workflow hybride, associant packshot et IA, pour les catalogues e-commerce ».

**FR-28** · pléonasme · mineur · nouveau
- Extrait actuel : « une photographie packshot est davantage centrée sur le produit en lui-même, plutôt que sur l'environnement »
- Explication : « davantage… plutôt que » redouble la comparaison.
- Correction : « la photographie packshot est centrée sur le produit lui-même plutôt que sur l'environnement ».

**FR-29** · calque · mineur · R8
- Extrait actuel : « Cela les aidera à prendre une décision d'achat informée. »
- Correction : « …ce qui les aide à prendre une décision d'achat éclairée ».

**FR-30** · ponctuation · mineur · nouveau
- Extrait actuel : « Une photographie nature morte vise elle à mettre en valeur les qualités esthétiques du produit »
- Explication : pronom de reprise sans virgules (« elle, vise ») ; lu comme une interrogation, il a produit le « Does a still life photograph aim » de l'EN (EN-35).
- Correction : « La photographie de nature morte, elle, vise à mettre en valeur… »

**FR-31** · typographie · mineur · nouveau
- Extrait actuel : « ses couleurs et ses textures... malgré la barrière de l'écran ? »
- Correction : points de suspension en un caractère (« textures… malgré »).

**FR-32** · grammaire · mineur · nouveau
- Extrait actuel : « Se démarquer de vos concurrents en faisant bonne impression » (h3)
- Explication : infinitif pronominal impersonnel (« se ») mêlé à « vos ».
- Correction : « Se démarquer de la concurrence en faisant bonne impression ».

**FR-33** · syntaxe · mineur · R10
- Extrait actuel : « Et l'inverse l'est encore plus : rien de tel que des packshots de mauvaise qualité pour faire fuir vos clients. »
- Correction : « L'inverse est encore plus vrai : rien de tel… »

**FR-34** · connecteur · mineur · nouveau
- Extrait actuel : « En sachant cela, beaucoup peuvent avoir recours à la solution de facilité […] Mais est-ce seulement une bonne idée ? En effet, cette solution semble pratique et peu coûteuse, mais elle peut également se retourner contre vous. »
- Explication : « En effet » introduit une concession, pas une justification ; « En sachant cela » pour « Sachant cela ».
- Correction : « Sachant cela, beaucoup sont tentés par la solution de facilité […] Mais est-ce vraiment une bonne idée ? Pratique et peu coûteuse en apparence, cette solution peut se retourner contre vous : … »

**FR-35** · claim SEO · mineur · nouveau
- Extrait actuel : « Et les photographies de produits de qualité peuvent influencer considérablement ce classement. » / « Autrement dit, elles peuvent être indexées et référencées de la même manière que les pages web classiques. Ainsi, de mauvaises photographies packshot peuvent entraîner une baisse de votre positionnement dans les résultats de recherche. »
- Explication : affirmations SEO générales, non sourcées ; les images ne sont pas indexées « de la même manière » que les pages (index et résultats d'images distincts).
- Correction : « …indexées et apparaître dans les résultats de recherche, au même titre que les pages web » ; les deux autres affirmations sont conservées (« peuvent »). Point 13 de `06`.

**FR-36** · style · mineur · nouveau
- Extrait actuel : « N'oublions pas non plus la fonctionnalité de recherche d'images des moteurs de recherche. »
- Correction : « N'oublions pas non plus la recherche d'images proposée par les moteurs de recherche : … »

**FR-37** · alt · mineur · revue (images)
- Extrait actuel : `alt="exemple de photo de montre pour e-commerce sur Google"` sur `…ac93.avif`
- Explication : l'image est une capture de résultats Google (annonces sponsorisées, requête « montre homme »).
- Correction : « Résultats Google pour la requête « montre homme » : annonces sponsorisées de montres présentées en packshot ».

**FR-38** · alt · mineur · revue (images)
- Extrait actuel : `alt="Exemple photographies packshot produits taille moyenne"` sur `…628d11.avif`
- Correction : « Packshots sur fond blanc de trois produits de taille moyenne : valise jaune, guitare électrique et fauteuil de bureau ».

**FR-39** · claim · mineur · nouveau
- Extrait actuel : « En montrant le produit tel qu'il est vraiment, vous évitez ainsi les retours et les déceptions de vos clients. »
- Explication : promesse absolue ; aucune photographie n'évite tous les retours.
- Correction : « vous limitez les retours et les déceptions » (atténuation signalée, point 14 de `06`).

**FR-40** · style · mineur · nouveau
- Extrait actuel : « Et si possible en environnement studio. L'éclairage est en effet primordial dans cette quête d'un produit authentique. »
- Explication : phrase nominale isolée ; « quête d'un produit authentique » impropre (c'est le rendu qui doit être fidèle).
- Correction : « …si possible en environnement studio. L'éclairage est en effet primordial pour obtenir un rendu fidèle : … »

**FR-41** · alt · majeur · R14
- Extrait actuel : `alt="__wf_reserved_inherit"` sur `…ac9b.avif`
- Explication : l'image (embouts de vissage, un seul net, les autres flous) illustre une faible profondeur de champ, alors que le paragraphe dit « Bannissez ainsi toute notion de flou » ; choix d'image signalé au point 21 de `06`.
- Correction : « Embouts de vissage alignés : l'embout doré au centre est net, les autres sont flous ».

**FR-42** · impropriété · mineur · nouveau
- Extrait actuel : « Bannissez ainsi toute notion de flou de vos photos. »
- Explication : on bannit le flou, pas sa « notion » ; origine du « banish any notion of fuzzy » de l'EN.
- Correction : « Bannissez donc tout flou de vos photos : … »

**FR-43** · syntaxe · mineur · nouveau
- Extrait actuel : « Cela signifie également que vous devez présenter le produit dans un cadre simple. C'est-à-dire sans objets, couleurs ou textures en arrière-plan »
- Correction : une seule phrase : « Le produit doit donc être présenté dans un cadre simple, sans objets, couleurs ou textures en arrière-plan… »

**FR-44** · alt · majeur · R14
- Extrait actuel : `alt="__wf_reserved_inherit"` sur `…ac98.avif`
- Correction : « Packshot de la roue avant d'un VTT sur fond blanc : pneu à crampons, rayons et disque de frein ».

**FR-45** · accord · mineur · R6
- Extrait actuel : « C'est là qu'interviennent les studio photo automatisé. »
- Correction : « …les studios photo automatisés » (ancre du lien, même cible `/fr/studios-photo-automatises`).

**FR-46** · claim · mineur · C4
- Extrait actuel : « fond blanc parfait sans retouche, détourage automatique »
- Correction : « fond blanc obtenu sans retouche » (« parfait » retiré, signalé) ; point 7 de `06`.

**FR-47** · claim chiffré · majeur · C1
- Extrait actuel : « Un opérateur sans formation photo avancée peut produire 200 à 500 packshots par jour avec une qualité constante du premier au dernier visuel. »
- Explication : chiffre de productivité non sourcé, présenté comme général ; des chiffres de même nature ont été retirés de la landing F5 (D37, D38).
- Correction : conservé, `[À VALIDER]` ; point 7 de `06`.

**FR-48** · anglicisme · mineur · R7
- Extrait actuel : « Pour une marque qui scale son catalogue »
- Correction : « Pour une marque dont le catalogue s'agrandit ».

**FR-49** · claim / terminologie · majeur · C3, R13, C2
- Extrait actuel : « le studio automatisé devient la seule réponse rentable. Le ROI typique se situe entre 6 et 12 mois pour les entreprises produisant plus de 500 visuels par an, avec une réduction du coût par image de l'ordre de 60 à 80 %. »
- Explication : superlatif exclusif ; le ROI est un ratio, pas une durée ; chiffres non sourcés ; [inférence de la revue] un seuil de 500 visuels **par an** s'accorde mal avec une capacité de 200 à 500 packshots **par jour** et un amortissement en 6 à 12 mois.
- Correction : « devient une réponse rentable » (exclusivité retirée, signalée) ; « Le retour sur investissement intervient généralement en 6 à 12 mois… » ; chiffres conservés, `[À VALIDER]` ; point 7 de `06`.

**FR-50** · claim / lien · mineur · C10
- Extrait actuel : « Sébastien Jourdan est directeur de PackshotCreator – Sysnext, fondateur de blendai.studio et photographe spécialisé en photographie packshot depuis plus de 20 ans. »
- Explication : ancienneté déclarative ; l'ancre « blendai.studio », nom de domaine, mène à la page interne `/fr/ia-photo-produit`.
- Correction : texte et cible conservés ; point 10 de `06`.

**FR-51** · nom de personne · majeur · R1
- Extrait actuel : « Article publié à l'origine par PackshotCreator en janvier 2024 — mis à jour le 2 mai 2026 par Sébastien Jourdan. »
- Explication : `0a65c654` (02/05/2026) écrivait « publié à l'origine par <strong>Laurent Wainberg</strong> » ; `8ae45f63` (12/06/2026, « auteur générique PackshotCreator sur les articles migrés ») a remplacé le nom par la marque. L'import Webflow (`56d4bc32`) avait pour auteur Laurent Wainberg. Le champ `author` (Sébastien Jourdan) date de `0a65c654` et n'a pas été touché par `8ae45f63`.
- Correction : « Article publié à l'origine par Laurent Wainberg en janvier 2024 — mis à jour le 2 mai 2026 par Sébastien Jourdan. » ; point 1 de `06`.

### FAQ

**FR-52** · FAQ FR, détaillée en sous-entrées dans l'ordre des questions :

- **FR-52a** · confusion · mineur · nouveau — « Une photographie packshot est une technique photographique professionnelle spécialisée » : une photographie n'est pas une technique. Correction : « Une photographie packshot est l'image d'un produit isolé […], réalisée selon une technique photographique professionnelle spécialisée ». Même phrase : « notamment pour le e-commerce » → « notamment dans l'e-commerce » (élision alignée sur le `h1`).
- **FR-52b** · claim léger · mineur · nouveau — « Cette approche méthodique garantit une cohérence visuelle » : « garantit » → « assure ».
- **FR-52c** · typographie · mineur · nouveau — « Photographie packshot : Approche minimaliste », « Photographie lifestyle : Place », « Photographie en nature morte : Met » : majuscule après deux-points. Correction : minuscule, et « Photographie de nature morte ».
- **FR-52d** · typographie · mineur · R12 — « Au lieu de se concentrer sur "ce qu'est" le produit, elle montre "comment" et "pourquoi" l'utiliser. » : guillemets droits. Correction : « ce qu'est », « comment », « pourquoi ».
- **FR-52e** · structure · mineur · R5 — « Voici les spécifications essentielles qui définissent l'excellence en matière de photographie packshot : » : annonce plusieurs spécifications, n'en donne qu'une (troncature présente dès l'import). Correction : « La première est la résolution. » `[À VALIDER]`, point 11 de `06`.
- **FR-52f** · terminologie / claim · mineur · nouveau, C11 — « une résolution minimale de 2000 pixels sur le côté le plus long (idéalement 3000 à 4000 pixels) » : en photographie, le nombre de pixels est la définition ; espace des milliers manquante ; seuils présentés comme une norme générale, sans source. Correction : « une définition minimale de 2 000 pixels sur le plus grand côté (idéalement 3 000 à 4 000 pixels) » ; seuils conservés, point 11 de `06`.
- **FR-52g** · erreur technique · majeur · R4 — « La densité de pixels (DPI) doit être d'au moins 300, assurant ainsi une netteté irréprochable même en cas d'agrandissement ou d'impression. » : la valeur DPI/PPI inscrite dans un fichier n'a aucun effet à l'écran ni au zoom ; 300 ne vaut que pour l'impression à une taille donnée ; DPI (points d'impression) confondu avec PPI (pixels par pouce). Correction : « Pour l'impression, on vise au moins 300 pixels par pouce (ppp) à la taille d'impression finale ; à l'écran, seule la définition en pixels détermine le niveau de détail. » ; point 11 de `06`.
- **FR-52h** · typographie · mineur · R12 — « Quelle est l'origine du terme "packshot" ? » Correction : « « packshot » ».
- **FR-52i** · style / structure · mineur · nouveau — « Cette transition représente un exemple fascinant d'adaptation terminologique entre différents médias : Années 1980-1990 : … » : emphase ; première étape de la chronologie collée à la phrase d'introduction ; « Fin des années 1990 - début 2000 ». Correction : « Cette évolution montre comment un terme peut passer d'un média à l'autre : » puis une étape par ligne ; « Fin des années 1990 – début des années 2000 ».
- **FR-52j** · claim · majeur · C8 — « C'est PackshotCreator qui a révolutionné le domaine en inventant le concept du studio packshot automatisé. » (+ « le premier système intégré », « des milliers d'entreprises ») : revendication d'invention et d'antériorité non sourcée, alors que le corps présente PackshotCreator comme distributeur des systèmes Orbitvu. Correction : « PackshotCreator est à l'origine du concept de studio packshot automatisé. » (« révolutionné » retiré, invention conservée), `[À VALIDER]` ; point 8 de `06`.
- **FR-52k** · calque · mineur · R11 — « Leur innovation majeure a consisté à créer » : « leur » pour une entreprise au singulier. Correction : « Son innovation majeure a consisté à réunir ».
- **FR-52l** · structure · mineur · revue (structure) — FAQ 2 (« différences entre packshot, photo lifestyle et nature morte ») et FAQ 6 (« différence entre un packshot et une photo lifestyle ») se recoupent. Correction : les deux sont conservées (FAQ 6 ajoutée par `a8a3d3f6` pour le SEO) ; point 22 de `06`.
- **FR-52m** · claim · mineur · C9 — « permettent de produire des packshots professionnels en quelques secondes » : délai non sourcé. Correction : conservé, `[À VALIDER]` ; point 9 de `06`.


---

## EN — /en/blog/packshot-photography-guide-why-make-product-packshots

Verdict d'ensemble : corps d'origine Webflow traduit automatiquement du FR (preuves internes dans la revue) ; seuls les ajouts de `37da2e28` (section terminologique, section studio automatisé, bio, FAQ « What does packshot mean? ») sont en anglais natif. La proposition est une retraduction complète depuis le FR corrigé ; les anomalies ci-dessous documentent l'état actuel.

### Métadonnées et image principale

**EN-01** · incohérence SEO · mineur · revue (titre)
- Extrait actuel : « Packshot — Definition, Techniques & E-commerce Best Practices | PackshotCreator » (`metaTitle`)
- Explication : 79 caractères, tronqué dans les résultats.
- Correction : `metaTitle` de 51 caractères (voir `05`).

**EN-02** · claim / date · mineur · C12
- Extrait actuel : « …practical tips for professional product photography in e-commerce. Complete guide 2026. » (`description`)
- Correction : description sans millésime (voir `05`).

**EN-03** · image · mineur · nouveau
- Extrait actuel : image principale `…accd.avif` avec texte français « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 1 ».
- Correction : aucune dans le texte ; point 17 de `06`.

### Corps

**EN-04** · majuscule · mineur · R39
- Extrait actuel : « Welcome to the complete guide to Packshot photography »
- Correction : « Welcome to our complete guide to packshot photography ».

**EN-05** · calque / grammaire · mineur · nouveau
- Extrait actuel : « Indeed, when a potential customer visits your website » / « Conversely, a quality packshot photography can attract the attention of consumers »
- Explication : « Indeed » calque « En effet » en ouverture ; article devant un indénombrable.
- Correction : « When potential customers land on your website… » ; « Conversely, high-quality packshot photography can catch shoppers' attention… »

**EN-06** · calque · mineur · nouveau
- Extrait actuel : « In this first article, we decipher for you what packshot photography is »
- Correction : « In this first article, we explain what packshot photography is… »

**EN-07** · traduction automatique · majeur · R21
- Extrait actuel : « By definition, the Packshot photography Is a specialized photographic technique especially for e-commerce sites to capture product images isolated on a neutral background. »
- Explication : article défini calqué, majuscules parasites (« Packshot », « Is »), construction incorrecte.
- Correction : « By definition, packshot photography is a specialized photographic technique that consists of photographing products isolated on a neutral background, particularly for e-commerce sites. »

**EN-08** · alt · majeur · R34, R14
- Extrait actuel : les 11 images portent les `alt` français ou réservés du FR : `…ac89` « __wf_reserved_inherit » ; `…628ca4` « photo détails produit photographie packshot » ; `…ac83` « __wf_reserved_inherit » ; `…628cb6` « photographie packshot sur un site e-commerce » ; `…ac90` « Packshot multi vues d'un casque moto » ; `…628cbf` « photo de chaussures en nature morte » ; `…628cdd` « exemple d'une image lifestyle d'une montre » ; `…ac93` « exemple de photo de montre pour e-commerce sur Google » ; `…628d11` « Exemple photographies packshot produits taille moyenne » ; `…ac9b` et `…ac98` « __wf_reserved_inherit ».
- Correction : 11 `alt` anglais descriptifs (liste dans `05`).

**EN-09** · faux ami · majeur · R31
- Extrait actuel : « Concretely, packshot photographs are Primordial for any business »
- Explication : « primordial » = originel en anglais ; majuscule parasite ; « Concretely » calque.
- Correction : « In practice, packshot photographs are essential for any business… »

**EN-10** · typographie / calque · mineur · R41
- Extrait actuel : « It also aims to represent the product as accurately as possible : the customer will thus not have an unpleasant surprise when receiving the product afterwards. »
- Correction : « It also aims to represent the product as accurately as possible, so customers get no unpleasant surprises when it arrives. »

**EN-11** · lien · mineur · R43
- Extrait actuel : « Packshot photographs are generally taken in a [professional studio](/en/studios-photo-automatises) »
- Explication : lien propre à l'EN (absent en FR et de-ch) ; l'ancre décrit un studio traditionnel, la cible est la page des studios automatisés.
- Correction : ancre et cible conservées, signalées ; point 6 de `06`.

**EN-12** · faux ami / grammaire · majeur · R30
- Extrait actuel : « Packshot photography thus assumes a thorough knowledge light, camera, and composition »
- Correction : « Packshot photography therefore requires in-depth knowledge of light, cameras and composition… »

**EN-13** · calque · mineur · nouveau
- Extrait actuel : « Indeed, if you are going to invest in packshot photographs, you would be entitled to expect to use them to the maximum of their capacity. »
- Correction : « If you invest in packshot photography, you are entitled to expect to get the most out of it. »

**EN-14** · article · mineur · nouveau
- Extrait actuel : « The primary purpose of the packshot photographs is to highlight products of a company on the internet »
- Correction : « The primary purpose of packshot photographs is to showcase a company's products online… »

**EN-15** · logique / structure · majeur · R3 (EN)
- Extrait actuel : « In the furniture sector, detailed images can help customers appreciate the quality and design of the pieces, thus facilitating their purchase decision: »
- Correction : déplacée après la liste, comme en FR (FR-13).

**EN-16** · majuscule / lexique · mineur · nouveau
- Extrait actuel : « On your e-commerce site of course, where they allow you to arouse the interest of customers » / « On social networks like Instagram or Pinterest to expand your audience and reach a new audience, »
- Explication : majuscules en début d'item non homogènes ; « arouse » a une connotation sexuelle en anglais courant ; « audience » répété.
- Correction : « on your e-commerce site, of course, where they spark customers' interest… » ; « on social media such as Instagram or Pinterest, to expand your audience and reach new people; »

**EN-17** · article · mineur · R36
- Extrait actuel : « as part of a advertising and promotional communication » / « as part of a internal communication »
- Correction : « in your company's advertising and promotional communication about its products: … » ; « in internal communication (…) ».

**EN-18** · faux ami / majuscule · mineur · R37
- Extrait actuel : « or even in the edition of Leaflets for your customers. »
- Correction : « or in the instruction leaflets you provide to your customers. »

**EN-19** · calque / personne · majeur · R25
- Extrait actuel : « For example, a clothing store can use packshot photographs to present their new collection on their website, Increase your conversion rate and improve your natural referencing, while communicating about it »
- Explication : passage de « their » à « your », majuscule fautive, « natural referencing » inexistant en anglais.
- Correction : « …increase its conversion rate and improve its organic search rankings, while also promoting that collection… »

**EN-20** · calque · mineur · R40
- Extrait actuel : « However, the primary use of packshot photographs remains in product sheets of an e-commerce site, it is therefore on this use that we will focus primarily on in this series of articles. »
- Correction : « That said, the main use of packshot photographs remains the e-commerce product page, so that is the use this series of articles will focus on first. »

**EN-21** · structure · mineur · R42 (requalifiée)
- Extrait actuel : section « Packshot meaning & official terminology » en deux paragraphes (origine publicitaire, IAB, « pack shot », Journal officiel) au lieu du paragraphe FR (Journal officiel, Québec).
- Explication : divergence voulue par `37da2e28` pour « packshot meaning » (5 769 impressions, position 3,8) et « pack shot » (6 022) ; pas une faute de traduction.
- Correction : la proposition traduit le FR corrigé et conserve, signalées, les phrases propres à l'EN ; point 5 de `06`.

**EN-22** · claim · mineur · C7
- Extrait actuel : « In the UK, the IAB (Interactive Advertising Bureau) and broadcast standards bodies have codified packshot requirements for digital advertising. »
- Correction : conservée, `[À VALIDER]` ; point 5 de `06`.

**EN-23** · claim élargi / orthographe · majeur · C5, nouveau
- Extrait actuel : « In French-speaking markets, the term is officially recognised in the Journal officiel français (1983 decree, updated 2000), which established standardised terminology for commercial product photography. This institutional recognition reflects how central the packshot has become in modern commercial communication — far beyond its origins as a video advertising convention. »
- Explication : le FR dit « en France » ; l'EN étend le fait à tous les « marchés francophones » (le Journal officiel est français) ; mêmes fragilités que FR-17 ; orthographe britannique (« recognised », « standardised »).
- Correction : « In France, the term appears in the official terminology published in the Journal officiel, which has covered this field since 1983, with an addition in 2000. » `[À VALIDER]` ; point 3 de `06`.

**EN-24** · calque · mineur · nouveau
- Extrait actuel : « There are various product photography techniques, each with its own particularities and advantages. […] So which one should you choose according to your needs? »
- Correction : « …each with its own characteristics and strengths. […] So which one should you choose for your needs? »

**EN-25** · mélange de langues · majeur · R22
- Extrait actuel : « La Packshot photography is a technique that allows you to take pictures of isolated products on a uniform background. »
- Correction : « Packshot photography is a technique that consists of photographing isolated products on a uniform background. »

**EN-26** · calque · mineur · nouveau
- Extrait actuel : « Product photography in still life » (h3)
- Correction : « Still life product photography ».

**EN-27** · grammaire · majeur · nouveau
- Extrait actuel : « Conversely, the still life product photography is a technique that consists of stage the product creatively using various decor elements. »
- Correction : « Still life product photography, by contrast, consists of staging the product creatively with various props and set elements. »

**EN-28** · incompréhensible · bloquant · R17
- Extrait actuel : « By using combinations of compositions and colors, a photographer produced in still life can thus add a artistic dimension to the brand image of a company. »
- Correction : « By playing with composition and color, a still life photographer can add an artistic dimension to a company's brand image. »

**EN-29** · article · mineur · R36
- Extrait actuel : « On the other hand, this type of technique is ideal for a advertising campaign. »
- Correction : « It is, however, ideal for an advertising campaign. »

**EN-30** · mélange de langues · majeur · R23
- Extrait actuel : « La lifestyle product photography is for its part a technique that consists in staging products in their context of use. »
- Correction : « Lifestyle product photography, for its part, stages products in their context of use. »

**EN-31** · orthographe · mineur · nouveau
- Extrait actuel : « opening up a hybrid packshot + AI workflow for e-commerce catalogues »
- Correction : « …a hybrid workflow that combines packshots and AI for e-commerce catalogs ».

**EN-32** · incompréhensible · bloquant · R18
- Extrait actuel : « As you can see, a packshot photograph is more focused on produced by itself, rather than on the environment in which it is used. »
- Correction : « As you can see, packshot photography focuses on the product itself rather than on the environment in which it is used. »

**EN-33** · calque / article · mineur · nouveau, R36
- Extrait actuel : « This will help them take a informed purchase decision. »
- Correction : « …which helps them make an informed purchase decision. »

**EN-34** · contresens · bloquant · R19
- Extrait actuel : « Instead, lifestyle photography attempts to create a printout to the viewer »
- Explication : « impression » (effet produit) rendu par « printout » (tirage papier).
- Correction : « Lifestyle photography instead aims to make an impression on viewers… »

**EN-35** · incompréhensible · majeur · R20
- Extrait actuel : « Does a still life photograph aim to highlight aesthetic qualities of the product, the photographer's artistic vision and the brand's message. »
- Correction : « Still life photography, for its part, aims to highlight the product's aesthetic qualities… »

**EN-36** · calque · mineur · nouveau
- Extrait actuel : « Internet, a new era that changes everything for the presentation of your products » (h3) / « With the Internet, online shopping has become more and more common, until it has become the norm nowadays. »
- Correction : « The internet: a new era that changes everything for product presentation » ; « …has become increasingly common, to the point of becoming the norm. »

**EN-37** · grammaire · majeur · nouveau
- Extrait actuel : « A new challenge then arises: how make the product real and palpable for the consumer? How to faithfully bring out its details, colors and textures... despite the screen barrier? »
- Correction : « …how do you make the product real and tangible for consumers? How do you faithfully convey its details, colors and textures… despite the barrier of the screen? »

**EN-38** · mélange de langues · majeur · R24
- Extrait actuel : « La online competition is extremely strong, and the first impression is essential. »
- Correction : « Online competition is fierce, and first impressions are crucial. »

**EN-39** · calque · mineur · nouveau
- Extrait actuel : « And the opposite is even more so: nothing like poor quality packshots to scare away your customers. »
- Correction : « The reverse is even more true: nothing drives customers away like poor-quality packshots. »

**EN-40** · calque · majeur · R32, nouveau
- Extrait actuel : « Knowing this, many can take the easy way out: simply use photos from their supplier. But is that just a good idea? Indeed, this solution seems practical and inexpensive, but it can also backfire. »
- Explication : « just » perd le sens de « est-ce seulement » ; « Indeed » introduit une concession.
- Correction : « …But is that really a good idea? It may seem practical and inexpensive, but it can backfire: … »

**EN-41** · calque · majeur · R26
- Extrait actuel : « A key element for the natural referencing of your e-commerce site » (h3) / « photographs are essential for the natural referencing or SEO (Search Engine Optimization) »
- Correction : « A key element for your e-commerce site's SEO » ; « Photographs are also essential for search engine optimization, or SEO. »

**EN-42** · grammaire / calque · mineur · nouveau
- Extrait actuel : « The images are in fact considered to be contents by search engines. In other words, they can be indexed and referenced in the same way as traditional web pages. »
- Explication : « content » est indénombrable ; « referenced » calque « référencées ».
- Correction : « Search engines treat images as content: they can be indexed and appear in search results, just like web pages. »

**EN-43** · traduction automatique · mineur · R38
- Extrait actuel : « Let's also not forget the functionality of image search search engines. »
- Correction : « And let's not forget search engines' image search: … »

**EN-44** · majuscule · mineur · R39
- Extrait actuel : « should be Preferably white, or neutral » / « should represent the product As it is »
- Correction : « should preferably be white, or at least neutral » ; « should show the product as it is ».

**EN-45** · claim · mineur · nouveau
- Extrait actuel : « By showing the product as it really is, you avoid returns and disappointments from your customers. »
- Correction : « …you reduce returns and customer disappointment. » (comme FR-39).

**EN-46** · faux ami · majeur · R27
- Extrait actuel : « Packshot photography must be the most precise and clean possible. »
- Correction : « A packshot must be as precise and sharp as possible. »

**EN-47** · article / fragment · mineur · R36, nouveau
- Extrait actuel : « with a adapted lighting and appropriate settings. And if possible in studio environment. Lighting is indeed essential in this quest for an authentic product. »
- Correction : « …with a professional camera, suitable lighting and the right settings, ideally in a studio environment. Lighting is key to an accurate rendering: … »

**EN-48** · terminologie · mineur · R28
- Extrait actuel : « between too present shadows that could darken the product and an absence of shade that would cause it to lose all depth »
- Correction : « between shadows so strong that they darken the product and a complete absence of shadow, which would rob it of all depth ».

**EN-49** · traduction automatique · majeur · R29
- Extrait actuel : « So banish any notion of fuzzy of your photos. »
- Correction : « So eliminate all blur from your photos: … »

**EN-50** · majuscule / article · mineur · R39
- Extrait actuel : « The Focus Stacking can thus be useful in taking packshot photographs. »
- Correction : « Focus stacking can help you achieve this in packshot photography. » (même cible de lien).

**EN-51** · calque · mineur · nouveau
- Extrait actuel : « Without distraction » (h3)
- Correction : « No distractions ».

**EN-52** · ambiguïté / fragment · mineur · nouveau
- Extrait actuel : « It also means that you need to present the product in a simple frame. That is, without objects, colors, or textures in the background »
- Explication : « frame » se lit comme le cadre photographique ; phrase nominale isolée.
- Correction : « The product should therefore be presented in a simple setting, with no objects, colors or textures in the background… »

**EN-53** · majuscule / calque · mineur · nouveau
- Extrait actuel : « The equipment needed to take good packshot photographs », « How to properly capture the specificities of your product » (ancres de liste)
- Explication : majuscules non homogènes entre les quatre items ; « specificities » calque.
- Correction : « the equipment you need… », « how to capture your product's specific features » (mêmes cibles).

**EN-54** · orthographe / claim · mineur · nouveau, C4
- Extrait actuel : « identically calibrated lighting across the entire catalogue, perfect white background with no retouching, automated cut-out »
- Correction : « calibrated lighting that stays identical across the entire catalog, a white background achieved without retouching, automatic background removal » (« perfect » retiré, signalé).

**EN-55** · claim chiffré · majeur · C1
- Extrait actuel : « An operator with no advanced photography skills can produce 200 to 500 packshots per day »
- Correction : conservé, `[À VALIDER]` ; point 7 de `06`.

**EN-56** · claim / terminologie · majeur · C2, C3
- Extrait actuel : « the automated studio becomes the only economically viable answer. Typical ROI lands between 6 and 12 months for businesses producing more than 500 visuals per year, with cost-per-image reductions of 60 to 80%. »
- Correction : « …becomes a cost-effective answer. Return on investment is generally reached within 6 to 12 months… » ; chiffres conservés, `[À VALIDER]`.

**EN-57** · orthographe / claim · mineur · nouveau, C10
- Extrait actuel : « a photographer specialised in packshot photography for over 20 years »
- Correction : « a photographer who has specialized in packshot photography for more than 20 years » ; ancienneté conservée, point 10 de `06`.

**EN-58** · nom de personne / date · majeur · R16
- Extrait actuel : « Article originally published by PackshotCreator in January 2024 — updated on 2 May 2026 by Sébastien Jourdan. »
- Explication : `37da2e28` écrivait « Laurent Wainberg » ; remplacé par `8ae45f63`. Date au format britannique.
- Correction : « Article originally published by Laurent Wainberg in January 2024 — updated May 2, 2026, by Sébastien Jourdan. »

### FAQ

**EN-59** · calque · mineur · nouveau
- Extrait actuel : « Packshot photography is a specialized professional photographic technique that consists in capturing images » / « This methodical approach guarantees visual coherence […] facilitating the navigation of users on e-commerce platforms. »
- Correction : « A packshot photo is an image of a product isolated… » ; « This methodical approach ensures visual consistency […] makes it easier for users to navigate e-commerce platforms. »

**EN-60** · calque / contresens · majeur · R33, R40, nouveau
- Extrait actuel : « Ideal for e-commerce product sheets. » / « Lifestyle photography: Place the product in its context of use » / « It tells a story and helps customers plan ahead. »
- Explication : « product sheets » ; impératif au lieu de la 3e personne ; « se projeter » rendu par « plan ahead » (planifier).
- Correction : « Ideal for e-commerce product pages. » ; « places the product… » ; « helps customers picture themselves using the product ».

**EN-61** · structure / erreur technique · majeur · R5, R4
- Extrait actuel : « Here are the essential specifications that define excellence in packshot photography: » / « The pixel density (DPI) should be at least 300, thus ensuring flawless sharpness even when magnified or printed. »
- Correction : comme FR-52e et FR-52g.

**EN-62** · calque / temps · mineur · R35, nouveau
- Extrait actuel : « Years 1980-1990: », « End of the 1990s - beginning of 2000: », « Years 2000: », « Years 2010-2020: » ; « professional photographers are beginning to appropriate », « The term is becoming standard »
- Correction : « 1980s–1990s: », « Late 1990s–early 2000s: », « 2000s: », « 2010s–2020s: » ; présent de narration homogène.

**EN-63** · claim / pronom · majeur · C8, nouveau
- Extrait actuel : « PackshotCreator revolutionized the field by inventing the concept of the automated packshot studio. » / « Their major innovation consisted in creating »
- Correction : « PackshotCreator originated the concept of the automated packshot studio. » `[À VALIDER]` ; « Its key innovation was to bring… ».

**EN-64** · structure / orthographe · mineur · R42 (requalifiée), nouveau
- Extrait actuel : FAQ « What does packshot mean? » (absente en FR et de-ch) ; « typically white or grey »
- Correction : FAQ conservée, signalée (point 5 de `06`) ; « gray ».

**EN-65** · claim renforcé · mineur · C9
- Extrait actuel : « Systems like Orbitvu allow e-commerce teams to produce professional-quality packshots in seconds, with no photography expertise required. »
- Explication : le FR dit « sans compétences photographiques avancées » ; l'EN supprime « avancées » et renforce la promesse.
- Correction : « …without advanced photography skills » ; « in seconds » `[À VALIDER]`.

**EN-66** · orthographe · mineur · revue (remarques)
- Extrait actuel : « catalogue », « specialised », « recognised », « standardised », « grey » à côté de « colors », « specialized », « catalogs ».
- Correction : anglais américain partout.

---

## DE-CH — /de-ch/blog/leitfaden-packshot-fotografie-warum-packshots-machen

Verdict d'ensemble : allemand fluide, conventions suisses respectées (« ss », guillemets « », « Lancierungen », « Mitarbeitenden ») ; calques du FR, `alt` français, quatre liens vers des articles français, attribution remplacée.

### Métadonnées et image principale

**DE-01** · incohérence SEO · mineur · revue (titre)
- Extrait actuel : « Packshot: Definition, Techniken und E-Commerce-Tipps — PackshotCreator » (`metaTitle`)
- Correction : 70 caractères → 54 (voir `05`).

**DE-02** · claim / date · mineur · C12
- Extrait actuel : « …für gelungene Produktfotos im E-Commerce. Vollständiger Leitfaden 2026. » (`description`)
- Correction : sans millésime (voir `05`).

**DE-03** · image · mineur · nouveau
- Extrait actuel : image principale `…accd.avif`, texte français incrusté.
- Correction : point 17 de `06`.

**DE-04** · alt · majeur · R47
- Extrait actuel : les 11 `alt` sont ceux du FR (7 en français, 4 « __wf_reserved_inherit »), par exemple `alt="photo de chaussures en nature morte"` sur `…628cbf.avif`.
- Correction : 11 `alt` allemands (liste dans `05`).

### Corps

**DE-05** · anglicisme · mineur · nouveau
- Extrait actuel : « welch grossen Unterschied eine gute Packshot-Fotografie machen kann »
- Correction : « wie viel eine gute Packshot-Fotografie ausmachen kann ».

**DE-06** · syntaxe / terminologie · mineur · nouveau
- Extrait actuel : « eine spezialisierte Fototechnik, die sich insbesondere an E-Commerce-Websites richtet, um Bilder von Produkten freigestellt vor einem neutralen Hintergrund aufzunehmen »
- Explication : une technique ne « s'adresse » pas à des sites ; « freigestellt » désigne le détourage en post-production, pas la prise de vue.
- Correction : « eine spezialisierte Fototechnik, bei der Produkte isoliert vor einem neutralen Hintergrund fotografiert werden, insbesondere für E-Commerce-Websites ». « Freistellen » est gardé là où il signifie détourage (section studio automatisé).

**DE-07** · logique / structure · majeur · R3 (de-ch)
- Extrait actuel : « In der Möbelbranche können detaillierte Bilder den Kunden helfen, die Qualität und das Design der Stücke einzuschätzen, und so ihre Kaufentscheidung erleichtern: »
- Correction : déplacée après la liste, comme FR-13.

**DE-08** · anglicisme · mineur · nouveau
- Extrait actuel : « durch den Einsatz von Werbevisuals, Plakaten, Flyern »
- Correction : « Werbesujets » (usage suisse).

**DE-09** · calque · mineur · R49
- Extrait actuel : « sein natürliches Ranking zu verbessern »
- Correction : « sein organisches Ranking zu verbessern ».

**DE-10** · calque · mineur · R52
- Extrait actuel : « Der hauptsächliche Einsatz von Packshot-Fotografien bleibt jedoch in den Produktseiten einer E-Commerce-Website »
- Correction : « Hauptsächlich werden Packshot-Fotografien jedoch auf den Produktseiten einer E-Commerce-Website eingesetzt ».

**DE-11** · fait non sourcé · majeur · C5
- Extrait actuel : « Der Begriff «Packshot» ist in Frankreich offiziell anerkannt. Das Journal officiel hat die offizielle Terminologie der werblichen Produktfotografie bereits im Dekret von 1983 festgelegt, ergänzt im Jahr 2000. »
- Correction : comme FR-17, `[À VALIDER]` ; points 3 et 19 de `06`.

**DE-12** · incohérence · majeur · R45
- Extrait actuel : « In Québec spricht man eher von «Verpackungsfoto». »
- Explication : traduire le terme québécois en allemand fait croire qu'on parle allemand au Québec.
- Correction : « In Québec spricht man eher von «photo d'emballage» («Verpackungsfoto»). » `[À VALIDER]`.

**DE-13** · ordre des mots · mineur · nouveau
- Extrait actuel : « Welche also sollten Sie je nach Ihren Bedürfnissen wählen? »
- Correction : « Welche sollten Sie also je nach Bedarf wählen? »

**DE-14** · calque · mineur · nouveau
- Extrait actuel : « kann ein Stillleben-Produktfotograf so eine künstlerische Dimension zur Markenidentität eines Unternehmens hinzufügen »
- Explication : « eine Dimension hinzufügen » calque ; « image de marque » = Markenimage.
- Correction : « kann ein Stillleben-Fotograf dem Markenimage eines Unternehmens eine künstlerische Dimension verleihen ».

**DE-15** · calque · mineur · R51
- Extrait actuel : « Sie haben es verstanden: »
- Correction : « Kurz gesagt: ».

**DE-16** · grammaire · mineur · nouveau
- Extrait actuel : « Internet, eine neue Ära, die alles für die Präsentation Ihrer Produkte verändert » (h3)
- Explication : « Internet » sans article en allemand.
- Correction : « Das Internet: eine neue Ära, die die Präsentation Ihrer Produkte grundlegend verändert ».

**DE-17** · ordre des mots · mineur · nouveau
- Extrait actuel : « Sich von der Konkurrenz abheben durch einen guten ersten Eindruck » (h3)
- Correction : « Sich mit einem guten ersten Eindruck von der Konkurrenz abheben ».

**DE-18** · calque · mineur · nouveau
- Extrait actuel : « Sie können auf dieselbe Weise wie klassische Webseiten indexiert und referenziert werden. »
- Correction : « Sie können indexiert werden und wie Webseiten in den Suchergebnissen erscheinen. »

**DE-19** · claim · mineur · nouveau
- Extrait actuel : « vermeiden Sie Retouren und Enttäuschungen Ihrer Kunden »
- Correction : « verringern Sie Retouren und Enttäuschungen » (comme FR-39).

**DE-20** · calque · mineur · nouveau
- Extrait actuel : « Die Beleuchtung ist nämlich entscheidend auf dem Weg zu einem authentischen Produkt. »
- Correction : « Die Beleuchtung ist entscheidend für eine naturgetreue Wiedergabe: … »

**DE-21** · intertitre · mineur · R54
- Extrait actuel : « Schärfe vor allem » (h3)
- Correction : « Schärfe hat Vorrang ».

**DE-22** · terminologie · mineur · R57
- Extrait actuel : « Eine unscharfe, schlecht ausgerichtete oder schlecht beleuchtete Fotografie »
- Correction : « schlecht kadrierte » (usage suisse pour « mal cadrée »).

**DE-23** · lien inter-langue · majeur · R48
- Extrait actuel : « Das [Focus Stacking](/fr/guide/comment-faire-focus-stacking-pour-photographier-bracelet) kann Ihnen so bei der Aufnahme von Packshot-Fotografien nützlich sein. »
- Explication : ancre allemande vers un guide français ; pas de version de-ch du guide (`content/guides/alternates.json` : FR et EN seulement).
- Correction : cible conservée, signalée ; point 18 de `06`.

**DE-24** · calque · mineur · R50
- Extrait actuel : « Das gesagt, ahnen Sie sicher, dass wir hier das weite Thema der Packshot-Fotografie nur angekratzt haben. »
- Correction : « Sie ahnen sicher, dass wir das weite Thema der Packshot-Fotografie hier nur angekratzt haben. »

**DE-25** · lien inter-langue · majeur · R48
- Extrait actuel : liens de la série vers `/fr/blog/materiel-photo-guide-photographie-packshot`, `/fr/blog/choix-media-guide-de-la-photographie-packshot-4`, `/fr/blog/comment-avoir-des-photos-professionnelles-guide-packshot-produit` (ancres allemandes).
- Explication : `content/blog/alternates.json` ne connaît pas de version de-ch de ces trois articles (seul `produkt-vorstellen-leitfaden-packshot-fotografie` existe).
- Correction : cibles conservées, signalées ; point 18 de `06`.

**DE-26** · faux ami · mineur · R53
- Extrait actuel : « schnell an ihre Grenzen: Fristen, Kosten und vor allem eine visuelle Einheitlichkeit »
- Correction : « Durchlaufzeiten, Kosten und vor allem… »

**DE-27** · lexique / claim · mineur · revue (remarques), C1
- Extrait actuel : « Ein Operator ohne fortgeschrittene Fotoausbildung kann 200 bis 500 Packshots pro Tag […] produzieren »
- Correction : « Eine Bedienperson… » ; chiffre conservé, `[À VALIDER]`.

**DE-28** · claim · mineur · C4
- Extrait actuel : « perfekter weisser Hintergrund ohne Retusche »
- Correction : « weisser Hintergrund ohne Retusche ».

**DE-29** · claim / terminologie · majeur · C2, C3
- Extrait actuel : « wird das automatisierte Studio zur einzigen rentablen Antwort. Der typische ROI liegt zwischen 6 und 12 Monaten »
- Correction : « …zu einer rentablen Antwort. Die Investition amortisiert sich in der Regel innerhalb von 6 bis 12 Monaten… » `[À VALIDER]`.

**DE-30** · claim · mineur · C10
- Extrait actuel : « seit über 20 Jahren auf Packshot-Fotografie spezialisierter Fotograf »
- Correction : conservé ; point 10 de `06`.

**DE-31** · nom de personne · majeur · R44
- Extrait actuel : « Artikel ursprünglich veröffentlicht von PackshotCreator im Januar 2024 — aktualisiert am 2. Mai 2026 von Sébastien Jourdan. »
- Correction : « …von Laurent Wainberg… » ; point 1 de `06`.

### FAQ

**DE-32** · confusion / lexique · mineur · nouveau
- Extrait actuel : « Eine Packshot-Fotografie ist eine spezialisierte, professionelle Fototechnik » / « um die unterscheidenden Merkmale jedes Produkts hervorzubringen »
- Explication : même confusion image/technique qu'en FR ; « hervorbringen » signifie « produire, engendrer », pas « faire ressortir ».
- Correction : « Eine Packshot-Fotografie ist das Bild eines Produkts, das isoliert […] aufgenommen wird » ; « welche die besonderen Merkmale jedes Produkts zur Geltung bringt ».

**DE-33** · erreur technique / structure · majeur · R46, R5
- Extrait actuel : « Die Pixeldichte (DPI) sollte mindestens 300 betragen und so eine tadellose Schärfe selbst bei Vergrösserung oder Druck sicherstellen. »
- Correction : « Für den Druck empfiehlt sich eine Auflösung von mindestens 300 ppi in der Endgrösse; am Bildschirm bestimmt allein die Pixelzahl den Detailgrad. » ; troncature traitée comme FR-52e.

**DE-34** · calque / claim · majeur · R55, C8
- Extrait actuel : « Es ist PackshotCreator, das den Bereich revolutioniert hat, indem es das Konzept des automatisierten Packshot-Studios erfunden hat. »
- Correction : « PackshotCreator steht am Ursprung des Konzepts des automatisierten Packshot-Studios. » `[À VALIDER]`.

**DE-35** · calque · mineur · nouveau (cité dans la preuve de la revue)
- Extrait actuel : « Ihre wesentliche Innovation bestand darin »
- Explication : « Ihre » calque le « Leur » du FR ; PackshotCreator est ici neutre singulier.
- Correction : « Seine wesentliche Innovation bestand darin ».

**DE-36** · claim renforcé · mineur · R56
- Extrait actuel : « in einem kompakten und weitgehend automatisierten Gerät zu schaffen »
- Explication : FR « relativement automatisé » ; « weitgehend » (largement) renforce.
- Correction : « in einem kompakten und teilweise automatisierten Gerät zu vereinen ».

**DE-37** · calque · mineur · R58
- Extrait actuel : « das Lifestyle inspiriert (es hilft ihm, sich die Nutzung vorzustellen). »
- Correction : « das Lifestyle-Foto inspiriert (es hilft ihm, sich die Nutzung vorzustellen). »

**DE-38** · claim · mineur · C9
- Extrait actuel : « professionelle Packshots in wenigen Sekunden zu produzieren »
- Correction : conservé, `[À VALIDER]`.

