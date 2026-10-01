# Anomalies annotées — famille 67d1ac647fa7de7306d86cee

Base : `01-TEXTE_ACTUEL.md` (texte servi, `main` `17fc0b3`), HTML des deux JSON, revue `reviews/67d1ac647fa7de7306d86cee.json`, et les six images du corps plus l'image principale, examinées le 01/10/2026 après conversion locale des fichiers `.avif` du dépôt.

Lecture : chaque anomalie donne l'extrait actuel mot pour mot, la catégorie, la gravité, l'explication et la correction retenue dans `04-PROPOSITION_*.md`. « Revue » : anomalie de la revue, vérifiée et confirmée. « Ajout » : anomalie absente de la revue. Dans ce fichier, les corrections FR sont écrites avec des espaces ordinaires ; la version de référence, avec les espaces insécables, est `04-PROPOSITION_FR.md`.

Non comptés : les paragraphes vides (caractère U+200D, espaceurs Webflow) présents 12 fois dans chaque langue, artefact sans effet sur le texte ; les « espaces avant virgule » de l'EN signalés par l'extraction, qui viennent des balises `<strong>` et n'existent pas au rendu (la revue l'avait déjà établi).

---

## Anomalie de la revue retirée

**R1 · EN · lien de formation**
- Revue : « La page EN renvoie vers la page française /fr/academy. La route /[lang]/academy existe dans app/, donc /en/academy est disponible. » Proposition de la revue : lien vers `/en/academy`.
- **Fausse.** Depuis `fc6c9c6b` (30/09/2026, « page réduite au catalogue Qualiopi »), `/en/academy` et `/de-ch/academy` redirigent en 301 vers `/fr/academy` (`next.config.ts`, l. 97 et 99). La page formation n'existe qu'en français ; le même commit a remplacé le lien EN `/en/formations-photographie-produits-packshotcreator` par `/fr/academy`. Pointer vers `/en/academy` ajouterait une redirection sans changer la destination.
- Retenu : lien `/fr/academy` conservé ; seule l'ancre, calquée, est corrigée (E35). L'avertissement au lecteur anglophone est une décision (06).

---

## FR — 55 anomalies (7 majeures)

### Métadonnées

**F01 · h1 · incohérence SEO H1/corps · majeur** (revue)
- Actuel : « Le guide complet de la photographie packshot, 5 »
- Explication : H1 tronqué au numéro de la série, qui n'annonce pas le sujet. Le gabarit (`app/[lang]/blog/[slug]/page.tsx`, l. 127) réutilise le H1 comme texte alternatif de l'image principale, comme dernier maillon du fil d'Ariane et comme `headline` du JSON-LD `Article` (vérifié dans le HTML servi) : les quatre surfaces sont muettes sur le sujet.
- Correction : « Guide de la photographie packshot, 5 : des photos produits professionnelles et homogènes » (05).

**F02 · metaTitle · title case et SEO · majeur** (revue, complétée)
- Actuel : « Photos professionnelles de produits : Guide Photographie Packshot »
- Explication : majuscules artificielles (« Guide Photographie Packshot »), tournure télégraphique, 65 caractères pour une cible de 60. C'est aussi le `<title>` et l'`og:title`. N'annonce ni l'homogénéité ni la seconde moitié de l'article, et ne contient pas, sous cette forme, la première requête de la page, « photographie de produits » (819 impressions, position 14,5).
- Correction : « Photographie de produits : obtenir des photos homogènes » (55 caractères ; variante dans 05).

**F03 · description · SEO · mineur** (ajout ; constat de la revue dans `titre_h1_meta`)
- Actuel : « Découvrez comment prendre des photos professionnelles de vos produits dans ce 5e article de notre guide de la photographie packshot. »
- Explication : 132 caractères ; ne couvre que la première moitié de l'article (la seconde porte sur le choix entre prestataire, studio traditionnel et studio automatisé) ; « Découvrez » d'attaque générique.
- Correction : « Shooting photo produit : comment obtenir des photos homogènes et professionnelles, puis choisir entre prestataire, studio traditionnel ou automatisé. » (149 caractères).

[Auteur « PackshotCreator » au lieu de « Laurent Wainberg » à l'import : remplacement délibéré (`8ae45f63`), pas une anomalie de langue. Traité dans 05 et 06.]

### Corps

**F04 · typographie · mineur** (revue)
- Actuel : « Bienvenue dans le 5ème et dernier article »
- Explication : l'abréviation correcte est « 5e », déjà employée dans la description et, pour « 2e » et « 3e », dans le corps.
- Correction : « Bienvenue dans le 5e et dernier article ».

**F05 · style (lourdeur) · mineur** (ajout)
- Actuel : « En effet, le fait de garantir une cohérence et une homogénéité entre chacune de vos photos de produits sur le long terme permet en retour de donner une impression de grande qualité de vos produits »
- Explication : « le fait de… permet en retour de donner » alourdit la phrase sans rien ajouter. C'est cette phrase qui a produit le contresens EN « high quality printing » (E05).
- Correction : « En effet, garantir dans la durée l’homogénéité de toutes vos photos de produits donne une impression de grande qualité de vos produits » (« la cohérence et l’homogénéité » figure déjà dans la phrase précédente).

**F06 · ponctuation · mineur** (ajout)
- Actuel : « pour attirer les clients et les convaincre d'acheter, c’est un point que nous avons vu et revu dans l’ensemble de cette série. »
- Explication : deux propositions indépendantes juxtaposées par une virgule.
- Correction : « …les convaincre d’acheter : c’est un point que nous avons vu et revu tout au long de cette série. »

**F07 · syntaxe · mineur** (ajout)
- Actuel : « dès lors qu’on a plus d’un produit à présenter et vendre »
- Explication : la préposition se répète devant le second infinitif.
- Correction : « à présenter et à vendre ».

**F08 · répétition · mineur** (ajout)
- Actuel : « nuire à votre image de marque. Pire encore, cela peut vraiment nuire à l’expérience d’achat et repousser vos utilisateurs. »
- Explication : « nuire » deux fois en deux phrases ; « repousser vos utilisateurs » est maladroit pour des acheteurs.
- Correction : « Pire encore, cela peut vraiment dégrader l’expérience d’achat et faire fuir vos visiteurs. »

**F09 · texte alternatif · majeur** (revue : inférence confirmée sur l'image)
- Actuel : `![Série photographique de chaussure avec studio Orbitvu](/images/blog/67dbae7389928f8e5c7974b2.avif)`
- Explication : l'image montre une grille de 18 chaussures photographiées sous des angles différents, sur des fonds tantôt gris clair, tantôt gris foncé. C'est le contre-exemple que le texte introduit (« un site web présentant ces produits de cette façon »). L'alt l'attribue à un studio Orbitvu : il associe la marque au mauvais exemple.
- Correction : « Catalogue de chaussures photographiées sous des angles différents, sur des fonds tantôt gris clair, tantôt gris foncé : exemple de série de photos non homogène ». Provenance de l'image : 06.

**F10 · typographie · mineur** (ajout)
- Actuel : « un éclairage non-homogène »
- Explication : « non » ne prend pas de trait d'union devant un adjectif.
- Correction : « un éclairage non homogène ».

**F11 · style · mineur** (ajout)
- Actuel : « des arrière-plans de multiples couleurs »
- Correction : « des arrière-plans de couleurs variées ».

**F12 · liste · mineur** (ajout)
- Actuel : « des détails tels que : » puis « l'éclairage, / la position du produit, / les réglages de l'appareil photo, / ou encore l'arrière-plan. »
- Explication : « des détails tels que » reprend « chaque détail » ; « ou encore » en fin d'énumération, avec des virgules en fin de puce, est lâche.
- Correction : « notamment : » puis « l’éclairage ; / la position du produit ; / les réglages de l’appareil photo ; / l’arrière-plan. »

**F13 · grammaire et ponctuation · mineur** (revue)
- Actuel : « assurez-vous que toutes les photos soient prises dans les mêmes conditions d'éclairage, de mise au point, et de fond » ; « assurez-vous qu'il sache exactement » ; « le contraste, la couleur, et la netteté »
- Explication : « s'assurer que » se construit avec l'indicatif ; virgule avant « et » à l'anglaise.
- Correction : « sont prises… de mise au point et de fond » ; « qu’il sait exactement » ; « le contraste, la couleur et la netteté ».

**F14 · calque · mineur** (ajout)
- Actuel : « Cela signifie que vous devriez utiliser le même type de lumière »
- Explication : le conditionnel « devriez » calque « you should » et affaiblit une consigne.
- Correction : « Concrètement, vous devez utiliser le même type de lumière ».

**F15 · texte alternatif · mineur** (revue, dans `images_alt_legendes`)
- Actuel : `![Logiciel aide série photographique chaussure Orbitvu Station ](/images/blog/67d1a9b8f6428d7e0d19c7b5.avif)`
- Explication : alt télégraphique, terminé par une espace. L'image montre l'interface du logiciel avec une grille de cadrage et l'image fantôme d'une basket superposée à la suivante.
- Correction : « Logiciel Orbitvu Station : grille de cadrage et image fantôme superposée pour placer chaque chaussure exactement au même endroit ».

**F16 · ancre de lien · mineur** (ajout)
- Actuel : « portant sur **l’**[**équipement et les notions à connaître**](/fr/blog/materiel-photo-guide-photographie-packshot) »
- Explication : l'article élidé « l’ » est mis en gras hors du lien ; l'ancre « équipement » ne reprend ni le titre de l'article cible (« matériel photo et notions à connaître ») ni sa requête (« materiel pour packshot »).
- Correction : « consacré au [**matériel photo et aux notions à connaître**](/fr/blog/materiel-photo-guide-photographie-packshot) » (cible inchangée).

**F17 · registre · mineur** (revue)
- Actuel : « où nous sommes davantage rentrés dans les détails sur la nécessité de faire un plan précis »
- Correction : « nous y avons expliqué plus en détail pourquoi il faut établir un plan précis ».

**F18 · répétition · mineur** (ajout)
- Actuel : « Vous donnerez ainsi une image professionnelle et cohérente à vos clients, leur donnant envie d'acheter »
- Correction : « Vous offrirez ainsi à vos clients une image professionnelle et cohérente, qui leur donnera envie d’acheter ».

**F19 · coquille · mineur** (revue)
- Actuel : « mettre une place un studio photo traditionnel »
- Correction : « mettre en place un studio photo traditionnel ».

**F20 · pléonasme · mineur** (ajout)
- Actuel : « déléguer votre photographie packshot à l'extérieur en faisant appel à un prestataire »
- Correction : « confier votre photographie packshot à un prestataire extérieur ».

**F21 · ponctuation (paragraphes fusionnés) · mineur** (revue)
- Actuel : « investir dans un studio photo automatisé ?Il n’y a pas forcément de solution supérieure aux autres. »
- Explication : espace manquante, présente dans le HTML source.
- Correction : « investir dans un studio photo automatisé ? Il n’y a pas forcément… ».

**F22 · accentuation · mineur** (revue)
- Actuel : « Etudions tout cela. »
- Correction : « Étudions-les une à une. » (le même défaut « Etant donné » est traité en F44).

**F23 · typographie · mineur** (ajout)
- Actuel : « Solution n°1 : », « Solution n°2 : », « Solution n°3 : » (trois H3)
- Explication : espace insécable attendue entre « n° » et le chiffre.
- Correction : « Solution n° 1 : », etc.

**F24 · syntaxe · mineur** (ajout)
- Actuel : « vous n'avez pas besoin de vous soucier de l'achat de matériel photo coûteux ou de réserver un espace dans vos locaux pour le shooting. **Tout est pris en charge à l'extérieur**. »
- Explication : construction non parallèle (nom, puis infinitif) ; point final hors du gras.
- Correction : « vous n’avez à vous soucier ni de l’achat d’un matériel photo coûteux, ni de la réservation d’un espace dans vos locaux pour le shooting. **Tout est pris en charge à l’extérieur.** »

**F25 · anacoluthe · mineur** (ajout)
- Actuel : « Vous devrez trouver un prestataire de confiance, organiser la logistique pour l'envoi et la récupération de vos produits et le processus d'allers-retours peut prendre plus de temps. »
- Explication : l'énumération des infinitifs dépendant de « Vous devrez » bascule sur un nouveau sujet.
- Correction : « Vous devrez trouver un prestataire de confiance et organiser la logistique d’envoi et de récupération de vos produits, et ce processus d’allers-retours peut prendre plus de temps. »

**F26 · style · mineur** (ajout)
- Actuel : « Dans tous les cas, cette solution peut être une option intéressante pour les entreprises qui débutent […] et qui ont besoin d'une alternative rapide et pratique »
- Explication : « option » puis « alternative » au sens d'option (anglicisme toléré, mais redondant ici).
- Correction : « Quoi qu’il en soit, cette solution peut être intéressante pour les entreprises qui débutent […] et qui ont besoin d’une option rapide et pratique ».

**F27 · terminologie · mineur** (ajout)
- Actuel : H3 « monter un studio photo traditionnel et embaucher un freelance » ; corps « et d'embaucher un photographe produit en freelance »
- Explication : on n'embauche pas un indépendant, on fait appel à lui (« engager », employé plus loin, convient aussi).
- Correction : « faire appel à un freelance » ; « faire appel à un photographe produit freelance » (« Engager un photographe freelance », plus loin, est conservé).

**F28 · texte alternatif · majeur** (revue)
- Actuel : `![__wf_reserved_decorative](/images/blog/67d1a9b7f6428d7e0d19c75b.avif)`
- Explication : marqueur interne Webflow servi comme texte alternatif. L'image n'est pas décorative : elle illustre la solution 2 (studio traditionnel avec fond blanc, boîtes à lumière sur pieds et projecteurs suspendus).
- Correction : « Studio photo traditionnel avec fond blanc, boîtes à lumière sur pieds et projecteurs suspendus ».

**F29 · anglicismes · mineur** (ajout)
- Actuel : « surtout si vous n'êtes pas familier avec le matériel de photographie » ; « ce qui peut être un défi dans les environnements de travail plus petits »
- Correction : « surtout si vous connaissez mal le matériel photo » ; « ce qui peut poser problème dans des locaux plus petits ».

**F30 · ponctuation · mineur** (ajout)
- Actuel : « votre studio photo flambant neuf... »
- Explication : trois points au lieu du caractère « … », et effet de suspension sans fonction.
- Correction : « votre studio photo flambant neuf. »

**F31 · style · mineur** (ajout)
- Actuel : « en termes de prise de vue et de temps de réponse amélioré »
- Correction : « en matière de prise de vue et de réactivité ».

**F32 · ponctuation et ambiguïté · mineur** (ajout)
- Actuel : « plus économique sur le long terme même si cela représente un investissement certain au début »
- Explication : virgule manquante avant « même si » ; « investissement certain » se lit « investissement assuré ».
- Correction : « plus économique sur le long terme, même si cela représente un investissement non négligeable au départ ».

**F33 · terminologie · mineur** (ajout)
- Actuel : « toutes les photos doivent être prises et modifiées dans un certain délai »
- Explication : en photographie, on retouche ; « modifiées » est à l'origine du faux ami EN « amended » (E33).
- Correction : « toutes les photos doivent alors être prises et retouchées dans un délai donné ».

**F34 · claim non sourcé · mineur, à valider** (revue, `claims_a_reverifier`)
- Actuel : « Cependant, si vous avez un studio photo automatisé en interne, **vous pouvez prendre des photos de vos produits à tout moment**, sans avoir à payer de frais supplémentaires. »
- Explication : « sans frais supplémentaires » ignore les coûts d'exploitation et de maintenance ; « Cependant » suit un paragraphe introduit par « En effet », c'est une opposition (« En revanche »).
- Correction (formulation plus prudente, signalée dans 06) : « En revanche, si vous disposez d’un studio photo automatisé en interne, **vous pouvez photographier vos produits à tout moment**, sans frais de prestation supplémentaires. »

**F35 · jargon · mineur** (ajout ; source du calque EN E34)
- Actuel : « ou bien un employé basé au stock »
- Correction : « ou d’un magasinier ».

**F36 · claim et conformité formation · à valider** (revue, `claims_a_reverifier`)
- Actuel : « il suffit de suivre une [courte formation pour savoir se servir du studio](/fr/academy) »
- Explication : promesse de prise en main, à confronter au catalogue Qualiopi (audit de surveillance du 16/10/2026, `fc6c9c6b` : « le site ne doit plus rien affirmer qui contredise le catalogue »). Le lien `/fr/academy` est celui posé par `fc6c9c6b`.
- Correction : texte et lien conservés ; décision dans 06.

**F37 · syntaxe · mineur** (ajout)
- Actuel : « pour vous assurer qu'elles correspondent à vos attentes et vos normes »
- Correction : « et vous assurer qu’elles correspondent à vos attentes et à vos normes ».

**F38 · claims conservés et calque · mineur** (revue pour les claims ; ajout pour le calque)
- Actuel : « vous économisez du temps et de l'argent sur le long terme » ; « ce qui en retour améliorera également votre productivité » ; « ces machines prennent bien moins de place dans vos locaux qu'un studio photo traditionnel » ; « Ainsi, et même si cette solution est plus coûteuse au départ, vous avez tout à y gagner sur le long terme. »
- Explication : promesses non chiffrées ni sourcées ; l'encombrement dépend du modèle (le Fashion Studio et le Bike Studio, cités plus loin, sont de grande taille). « en retour » calque « in turn ».
- Correction : claims conservés tels quels, listés dans 06 ; « ce qui améliore aussi votre productivité » ; « Ainsi, même si… ».

**F39 · texte alternatif · mineur** (ajout)
- Actuel : `![Studio photo produit automatisé](/images/blog/6787d343815aa433b695f1bd.avif)`
- Explication : alt générique. L'image montre une utilisatrice qui pilote un studio Orbitvu depuis un écran affichant une montre.
- Correction : « Utilisatrice pilotant un studio photo produit automatisé Orbitvu depuis un écran, pendant la prise de vue d’une montre ».

**F40 · ponctuation · mineur** (ajout)
- Actuel : H2 « Pourquoi choisir un studio photo automatisé Orbitvu »
- Correction : « Pourquoi choisir un studio photo automatisé Orbitvu ? »

**F41 · accord et claim · mineur** (revue)
- Actuel : « nous vous recommandons chaudement les studios Orbitvu, à la pointe de la technologie et spécifiquement pensé pour la photographie packshot »
- Explication : le participe se rapporte à « les studios ». « À la pointe de la technologie » : superlatif promotionnel, conservé et listé dans 06.
- Correction : « …et spécifiquement pensés pour la photographie packshot ».

**F42 · texte alternatif, faux ami · mineur** (revue)
- Actuel : `![logiciel d'automatisation et d'édition Orbitvu Station](/images/blog/67d1a9b8f6428d7e0d19c7b8.avif)`
- Explication : « édition » calque « editing ». L'image montre l'écran de retouche du logiciel : curseurs de réglage, boutons « Apply to all », série de photos de baskets détourées.
- Correction : « Logiciel Orbitvu Station : réglages de retouche appliqués à une série de photos de baskets détourées ».

**F43 · style · mineur** (ajout)
- Actuel : « enregistrer vos réglages sous forme de profil » ; « Ce logiciel puissant reste très intuitif à utiliser, et sera d’une grande aide »
- Explication : « profil » au singulier pour plusieurs réglages ; « intuitif à utiliser » est un pléonasme ; virgule avant « et ».
- Correction : « sous forme de profils » ; « Puissant, ce logiciel reste très intuitif et vous sera d’une grande aide ».

**F44 · accentuation et claim absolu · mineur** (revue)
- Actuel : « Etant donné que le studio fait tout à votre place, le shooting est bien plus rapide et efficace. Cela vous permet ainsi de gagner en productivité et en qualité. »
- Explication : majuscule non accentuée ; « fait tout à votre place » est un absolu (un opérateur place le produit, règle, valide).
- Correction (formulation plus prudente, signalée dans 06) : « Comme le studio automatise la prise de vue, le shooting est bien plus rapide et efficace. Vous gagnez ainsi en productivité et en qualité. »

**F45 · texte alternatif · mineur** (revue)
- Actuel : `![Fashion studio photo produit automatisée](/images/blog/67d1a9b8f6428d7e0d19c798.avif)`
- Explication : accord fautif (« automatisée » pour un studio) ; nom du produit en bas de casse. L'image montre le Fashion Studio d'Orbitvu (nom lisible sur la machine) avec une personne photographiée en pied.
- Correction : « Fashion Studio d’Orbitvu, studio photo produit automatisé pour la mode, avec une personne photographiée en pied ».

**F46 · coquille dans un intertitre · majeur** (revue)
- Actuel : H3 « Pensés spéficiquement pour certains produits »
- Explication : coquille visible dans un intertitre, sujet implicite.
- Correction : « Des studios pensés spécifiquement pour certains produits ».

**F47 · syntaxe · mineur** (ajout)
- Actuel : « Par exemple, le [**Fashion Studio**](/fr/studio-photo/fashion-studio) ou le [**Bike Studio**](/fr/studio-photo/bike-studio) sont des studios spécifiques qui ont été développés pour répondre respectivement aux besoins des vêtements et accessoires de mode pour l'un, et des vélos pour l'autre. »
- Explication : « ou » avec un verbe au pluriel ; « respectivement » double « pour l'un… pour l'autre ».
- Correction : « Par exemple, le Fashion Studio a été développé pour répondre aux besoins des vêtements et accessoires de mode, et le Bike Studio à ceux des vélos. » (liens conservés sur les deux noms).

**F48 · ponctuation (paragraphes fusionnés) · mineur** (revue)
- Actuel : « et avec une grande facilité de surcroît !En somme, l'utilisation d'un studio photo automatisé »
- Explication : deux paragraphes Webflow fusionnés, sans espace.
- Correction : nouveau paragraphe à « En somme, un studio photo automatisé comme ceux que propose Orbitvu… ».

**F49 · structure et accord · mineur** (ajout)
- Actuel : « …pour votre entreprise ?<br>Si vous souhaitez en savoir plus sur les studios photos d’Orbitvu »
- Explication : saut de ligne `<br>` à l'intérieur du paragraphe au lieu d'un paragraphe ; « studios photos » (on écrit « studios photo », comme partout ailleurs dans l'article).
- Correction : paragraphe distinct « Si vous souhaitez en savoir plus sur les studios photo Orbitvu… ».

**F50 · typographie générale · mineur** (ajout)
- Actuel : apostrophes droites et courbes mêlées dans tout le texte (« l'homogénéité » / « l’homogénéité ») ; guillemets droits dans la FAQ (« La fonction "image fantôme" »).
- Correction : apostrophe typographique « ’ » et guillemets « » partout.

### FAQ

**F51 · claim renforcé · majeur** (revue)
- Actuel : « Une cohérence visuelle parfaite entre vos photos produits renforce votre image de marque et la confiance des clients. Le logiciel Orbitvu Station permet de sauvegarder des configurations complètes d'éclairage et de paramètres, garantissant une homogénéité parfaite sur l'ensemble de votre catalogue. »
- Explication : « parfaite » deux fois et garantie absolue, alors que le corps dit seulement que le logiciel « sera d’une grande aide pour garantir l’homogénéité ». La FAQ alimente le JSON-LD `FAQPage`, donc les extraits repris par les moteurs.
- Correction (claim supprimé, signalé dans 06) : « Des photos produits visuellement cohérentes renforcent votre image de marque et la confiance de vos clients, et elles facilitent la comparaison entre les produits. Le logiciel Orbitvu Station permet d’enregistrer vos configurations d’éclairage et vos réglages sous forme de profils, ce qui aide à maintenir l’homogénéité sur l’ensemble de votre catalogue. »

**F52 · contenu et typographie · mineur** (ajout)
- Actuel : « Le studio automatisé permet de contrôler précisément l'éclairage, la position du produit, les réglages de l'appareil photo et l'arrière-plan. La fonction "image fantôme" d'Orbitvu aide à placer chaque produit exactement au même endroit, assurant une présentation uniforme. »
- Explication : la réponse saute directement au studio automatisé sans reprendre la règle du corps (chaque détail identique d'une prise de vue à l'autre) ; la fonction appartient au logiciel Orbitvu Station ; guillemets droits.
- Correction : « Chaque détail doit rester identique d’une prise de vue à l’autre : l’éclairage, la position du produit, les réglages de l’appareil photo et l’arrière-plan. Un studio automatisé permet de contrôler précisément ces paramètres, et la fonction « image fantôme » du logiciel Orbitvu Station aide à placer chaque produit exactement au même endroit dans le cadre, pour une présentation uniforme. »

**F53 · claim renforcé, contradiction avec le corps · majeur** (revue)
- Actuel : « Le studio automatisé Orbitvu offre le meilleur compromis entre qualité et productivité. Il permet à n'importe quel employé de réaliser des photos professionnelles après une courte formation, sans expertise photo particulière, tout en garantissant une cohérence parfaite. »
- Explication : le corps dit l'inverse du superlatif : « Il n’y a pas forcément de solution supérieure aux autres. Tout dépend du temps et de l'argent que vous souhaitez y consacrer ». « Tout en garantissant une cohérence parfaite » n'a pas d'appui dans le corps.
- Correction (superlatif ramené à « un bon compromis », garantie supprimée, signalé dans 06) : « Tout dépend du temps et de l’argent que vous souhaitez y consacrer : prestataire externe, studio photo traditionnel avec un photographe freelance ou studio photo automatisé, chaque solution a ses mérites et ses inconvénients. Un studio automatisé comme ceux d’Orbitvu offre un bon compromis entre qualité et productivité : il représente un investissement au départ, mais peut se révéler plus économique sur le long terme, et n’importe quel collaborateur peut l’utiliser après une courte formation, sans expertise photo particulière. »

**F54 · fonctionnalité à confirmer · à valider** (revue, `claims_a_reverifier`)
- Actuel : « Le système automatise la capture et la post-production, permettant de traiter plus de produits en moins de temps qu'avec un studio traditionnel. »
- Explication : l'automatisation de la post-production n'est pas mentionnée dans le corps (l'image du logiciel montre des réglages de retouche appliqués en série, ce qui ne suffit pas à l'établir). Fait produit à confirmer.
- Correction : claim conservé, tournure allégée : « Le système automatise la prise de vue et la post-production : vous traitez ainsi plus de produits en moins de temps qu’avec un studio traditionnel. » Décision dans 06.

**F55 · claim · mineur** (ajout)
- Actuel : « Orbitvu propose des studios spécialisés comme le Fashion Studio pour les vêtements ou le Bike Studio pour les vélos. Chaque studio intègre des fonctionnalités spécifiques optimisées pour son domaine d'application, garantissant des résultats professionnels homogènes. »
- Explication : « fonctionnalités spécifiques optimisées » et « garantissant » vont au-delà du corps, qui dit seulement que ces studios « ont été développés pour répondre aux besoins » de leur type de produits.
- Correction (signalée dans 06) : « Orbitvu propose des studios spécialisés, comme le Fashion Studio pour les vêtements et accessoires de mode ou le Bike Studio pour les vélos. Chacun a été développé pour répondre aux besoins de son type de produits, ce qui aide à obtenir des résultats professionnels et homogènes. »

---

## EN — 53 anomalies (17 majeures)

Le texte EN est retraduit intégralement depuis le FR corrigé (`04-PROPOSITION_EN.md`). La colonne « correction » indique la solution retenue dans cette retraduction.

### Métadonnées et image principale

**E01 · h1 · incohérence SEO H1/corps · majeur** (revue)
- Actuel : « The complete guide to packshot photography, 5 »
- Explication : même défaut qu'en F01, mêmes surfaces (alt de l'image principale, fil d'Ariane, `headline`).
- Correction : « Packshot photography guide, 5: consistent, professional product photos ».

**E02 · metaTitle · SEO · mineur** (ajout)
- Actuel : « Professional Product Photos: Packshot Photography Guide »
- Explication : le Title Case est admis en anglais américain, mais les autres articles EN de la série sont en casse de phrase. Le titre ne dit rien de la cohérence, qui est le sujet du slug, et place « packshot photography » (2 493 impressions) en seconde moitié.
- Correction : « Packshot photography: how to get consistent product photos » (58 caractères).

**E03 · description · SEO · mineur** (ajout)
- Actuel : « Learn how to take professional photos of your products in this 5th article in our packshot photography guide. »
- Explication : 109 caractères, première moitié de l'article seulement, « in this 5th article in our » maladroit.
- Correction : « Packshot photography guide, part 5: keep your product photos consistent, then choose between an outside provider, a traditional studio or an automated one. » (155 caractères).

**E04 · image principale en français · mineur** (ajout ; vérifié sur l'image)
- Actuel : `/images/blog/67dbae7489928f8e5c79753c.avif`, servie aussi en `og:image` sur la page EN.
- Explication : l'image porte le texte incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 5 ».
- Correction : aucune dans le texte ; visuel EN à décider (06).

### Corps

**E05 · faux ami et calque · majeur** (revue)
- Actuel : « Indeed, the fact of guaranteeing consistency and homogeneity between each of your product photos over the long term makes it possible in return to give a high quality printing of your products »
- Explication : « impression » (sentiment) rendu par « printing » (impression papier) ; tournure calquée.
- Correction : « Keeping all your product photos consistent over time gives an **impression of high quality** and a **much more professional brand image**. »

**E06 · calques · mineur** (revue, complétée)
- Actuel : « in your photo shootings in order to ensure this homogeneity, then we will present the various means at your disposal to facilitate this process »
- Correction : « what to keep an eye on during your photo shoots to maintain that consistency, then walk you through the options available to make the process easier ».

**E07 · terminologie · mineur** (ajout)
- Actuel : « Homogeneity and packshot photography » (H2), « homogeneity is part of a good presentation », « non-homogeneous lighting », « To guarantee this homogeneity », « in a homogeneous way », « Why is homogeneity crucial » (FAQ)
- Explication : « homogeneity » calque « homogénéité » ; en photographie produit, l'anglais dit « consistency » ou « uniformity ». C'est aussi le mot du slug EN.
- Correction : « consistency », « consistent », « uniform » selon le contexte ; H2 « Consistency in packshot photography: the secret to professional photos ».

**E08 · calque · mineur** (revue)
- Actuel : « which is something we have seen and reviewed throughout this series »
- Correction : « it's a point we've made again and again throughout this series ».

**E09 · lexique · mineur** (ajout)
- Actuel : « hinder the shopping experience and repel your users »
- Correction : « hurt the shopping experience and drive visitors away ».

**E10 · textes alternatifs en français · majeur** (revue)
- Actuel : sur la page EN, « Série photographique de chaussure avec studio Orbitvu », « Logiciel aide série photographique chaussure Orbitvu Station », « Studio photo produit automatisé », « logiciel d'automatisation et d'édition Orbitvu Station », « Fashion studio photo produit automatisée ».
- Explication : cinq alts en français sur une page anglaise, avec en plus les défauts F09, F15, F39, F42, F45.
- Correction : cinq alts anglais décrivant les images (05) ; le premier ne mentionne plus Orbitvu.

**E11 · grammaire · mineur** (ajout)
- Actuel : « a different staging, non-homogeneous lighting and multiple color backgrounds »
- Correction : « different staging, inconsistent lighting and backgrounds in various colors ».

**E12 · calque · mineur** (revue)
- Actuel : « and that's normal »
- Correction : « which is perfectly understandable ».

**E13 · traduction automatique · majeur** (revue)
- Actuel : « it is therefore It is important to ensure that every detail is the same from one photo shoot to the next »
- Correction : « it is therefore **important to make sure every detail stays the same from one photo shoot to the next** ».

**E14 · calque · mineur** (ajout)
- Actuel : « or even the background. »
- Explication : « or even » marque la surprise en anglais ; le français « ou encore » ne fait qu'ajouter.
- Correction : liste « lighting / product position / camera settings / background ».

**E15 · grammaire · mineur** (ajout)
- Actuel : « a smooth and quality user experience »
- Correction : « a smooth, high-quality user experience ».

**E16 · grammaire · mineur** (ajout)
- Actuel : H3 « How to ensure consistency between all your photos for a professional result? »
- Explication : « How to… » n'est pas une question ; « between all » est maladroit.
- Correction : « How can you ensure consistency across all your photos for a professional result? »

**E17 · traduction automatique · majeur** (revue)
- Actuel : « make sure that all photos are taken under the same conditions lighting, focus, and background »
- Correction : « make sure **all your photos are taken under the same conditions** of lighting, focus and background ».

**E18 · espace manquante · mineur** (ajout ; vérifié dans le HTML : `allow you to<strong>standardize`)
- Actuel : « This will allow you to**standardize all of your packshot photos** » (rendu « tostandardize »)
- Correction : « This lets you **standardize all your packshot photos** for a professional finish. »

**E19 · terminologie · mineur** (revue)
- Actuel : « This will make the reframing process easier »
- Correction : « This makes cropping easier ».

**E20 · calque et ancre · mineur** (ajout)
- Actuel : « We also refer you to the 2nd article in this series, on **the**[**equipment and the concepts you need to know**](/en/blog/packshot-photography-guide-product-photography-equipment) »
- Explication : « We refer you » calque « Nous vous renvoyons » ; article hors du lien ; l'ancre ne reprend pas le sujet de l'article cible (« Photo Equipment and What You Need to Know »).
- Correction : « We also recommend the second article in this series, on [**photo equipment and the key concepts to know**](/en/blog/packshot-photography-guide-product-photography-equipment) » (cible inchangée).

**E21 · faux ami · majeur** (revue)
- Actuel : « in order to always replace them at exactly the same distances »
- Correction : « so that you can always reposition them at exactly the same distances ».

**E22 · calque · mineur** (ajout)
- Actuel : H2 « What solution should you choose to photograph your products according to your needs? »
- Correction : « Which packshot photography solution is right for your needs? » (requête « packshot photography »).

**E23 · calque · mineur** (revue)
- Actuel : « Are you going to delegate your packshot photography outside by using a service provider »
- Correction : « Will you outsource your packshot photography to a service provider ».

**E24 · calque · mineur** (revue)
- Actuel : « Let's study all of this. »
- Correction : « Let's look at them one by one. »

**E25 · calque · mineur** (ajout)
- Actuel : H3 « Solution 1: send your products to have them photographed externally »
- Correction : « Solution 1: send your products out to be photographed ».

**E26 · calques en série · mineur** (ajout)
- Actuel : « A first possible solution » ; « Everything is taken care of outside » ; « less control on the final rendering of your photos » ; « through detailed specifications for your service provider »
- Correction : « The first option » ; « Everything is handled off-site. » ; « less control over how your final photos turn out » ; « in a detailed brief for your provider ».

**E27 · traduction automatique · majeur** (revue)
- Actuel : « you may want to consider **Set up a traditional photo studio on your premises** and to hire a freelance product photographer »
- Correction : « you might consider **setting up a traditional photo studio on your premises** and hiring a freelance product photographer ».

**E28 · texte alternatif · majeur** (revue)
- Actuel : `![__wf_reserved_decorative](/images/blog/67d1a9b7f6428d7e0d19c75b.avif)`
- Correction : « Traditional photo studio with a white backdrop, softboxes on stands and overhead lights ».

**E29 · calques · mineur** (revue, complétée)
- Actuel : « a better control on the shots » ; « the circuit is shorter » ; « all the necessary hardware »
- Correction : « better control over the shots » ; « turnaround is shorter » ; « all the necessary equipment ».

**E30 · traduction automatique · majeur** (revue)
- Actuel : « You will also need a **experienced photographer to make the most of your photo studio** brand new... »
- Correction : « You'll also need an **experienced photographer to get the most out of your brand-new photo studio**. »

**E31 · calque · mineur** (ajout)
- Actuel : « in terms of shooting and improved response time »
- Correction : « in terms of shooting and responsiveness ».

**E32 · calques · mineur** (ajout)
- Actuel : « **the use of an automated photo studio internally** » ; « even if it represents a certain investment at the beginning »
- Correction : « **using an automated photo studio in-house** » ; « even though it requires a significant upfront investment ».

**E33 · faux ami · majeur** (revue)
- Actuel : « all photos must be taken and amended within a certain period of time »
- Correction : « all the photos have to be taken and retouched within a set timeframe ».

**E34 · calque et majuscule parasite · majeur** (revue)
- Actuel : « or an employee based in stock, **Anyone can use this type of automated studio without the need for photography expertise** »
- Correction : « or a stockroom employee, **anyone can use this type of automated studio without photography expertise** ».

**E35 · typographie et ancre · mineur** (revue, corrigée par R1)
- Actuel : « expertise** : all you have to do is follow a [short training to know how to use the studio](/fr/academy) »
- Explication : espace avant le deux-points (typographie française, présente dans le HTML) ; ancre calquée. La cible `/fr/academy` est correcte (R1).
- Correction : « expertise**: all it takes is a [short training course on how to use the studio](/fr/academy) ».

**E36 · grammaire · mineur** (ajout)
- Actuel : « you benefit from a **greater flexibility and much better control** on your packshots, which in turn will also improve your productivity »
- Correction : « gain **greater flexibility and much better control** over your packshots, which also improves your productivity ».

**E37 · traduction automatique · majeur** (revue)
- Actuel : « these machines take well **less space** on your premises »
- Correction : « These machines also take up **far less space** on your premises ».

**E38 · calque · mineur** (ajout)
- Actuel : « Thus, and even if this solution is more expensive at the start »
- Correction : « So even though this option costs more upfront ».

**E39 · ponctuation · mineur** (ajout)
- Actuel : H2 « Why choose an Orbitvu automated photo studio »
- Correction : « Why choose an Orbitvu automated studio for packshot photography? » (requête « packshot photography »).

**E40 · ordre des mots · mineur** (revue, complétée)
- Actuel : « The [**software *Orbitvu Station***](https://orbitvu.com/software/orbitvu-station/) allows you to set and control the studio in a homogeneous way. You can even **save your settings** in profile form »
- Correction : « The ***Orbitvu Station* software** lets you set up and control the studio consistently. You can even **save your settings** as profiles ».

**E41 · traduction automatique · majeur** (revue)
- Actuel : « Orbitvu's automated studios also allow you to: **Create all types of media with ease** : still photographs, 360-degree animations, videos, etc. »
- Correction : « Orbitvu's automated studios also let you **create all types of media with ease**: still photos, 360-degree animations, videos and more. »

**E42 · claim et calque · mineur** (revue)
- Actuel : « Since the studio does everything for you, shooting is much faster and more efficient. This allows you to gain in productivity and quality. »
- Correction (alignée sur F44) : « Because the studio automates the shoot, the process is much faster and more efficient. You gain in both productivity and quality. »

**E43 · calque · mineur** (ajout)
- Actuel : « as we told you about in the 3rd article of this series on [**the best way to highlight your products**](/en/blog/product-showcase-how-to-packshot-photography-guide) »
- Correction : « as we discussed in the third article of this series, on [**the best way to showcase your products**](…) ».

**E44 · traduction automatique · majeur** (revue)
- Actuel : « For example, the [**Fashion Studio**](/en/studio-photo/fashion-studio) Or the [**Bike Studio**](/en/studio-photo/bike-studio) are specific studios that have been developed to meet the needs of clothing and fashion accessories for one, and bicycles for the other, respectively. »
- Correction : « For example, the **Fashion Studio** was developed to meet the needs of clothing and fashion accessories, and the **Bike Studio** those of bicycles. »

**E45 · calque · mineur** (ajout)
- Actuel : « With them, take professional photos of these products, and with great ease! »
- Correction : « With them, you can photograph these products professionally, and with great ease! »

**E46 · traduction automatique · majeur** (revue)
- Actuel : « if you are aiming for a **high quality packshot photography** while looking for a **easy to use all-in-one solution** »
- Correction : « if you're aiming for **high-quality packshot photography** and want an **easy-to-use all-in-one solution** ».

**E47 · typographie et calque · mineur** (revue)
- Actuel : « **do not hesitate to**[**contact us**](/en/contact) : we will be happy to answer you and guide you. »
- Correction : « **feel free to** [**contact us**](/en/contact): we'll be happy to answer your questions and point you in the right direction. »

### FAQ

**E48 · gallicisme · mineur** (ajout)
- Actuel : « Why is homogeneity crucial for my e-commerce? »
- Explication : « mon e-commerce » (ma boutique en ligne) n'a pas d'équivalent nominal en anglais.
- Correction : « Why is consistency crucial for my online store? »

**E49 · claim renforcé · majeur** (revue, `ecart_fr_en`)
- Actuel : « Perfect visual consistency between your product photos reinforces your brand image and customer trust. The Orbitvu Station software allows you to save complete lighting and parameter configurations, guaranteeing perfect consistency across your entire catalog. »
- Correction : alignée sur F51.

**E50 · calque · mineur** (ajout)
- Actuel : « How do you ensure perfect visual coherence? »
- Correction : « How do you ensure perfect visual consistency? »

**E51 · claim renforcé · majeur** (revue, `ecart_fr_en`)
- Actuel : « The Orbitvu automated studio offers the best compromise between quality and productivity. […] while guaranteeing perfect consistency. »
- Correction : alignée sur F53 (« a good balance between quality and productivity », garantie supprimée).

**E52 · fonctionnalité à confirmer · à valider** (revue)
- Actuel : « The system automates capture and post-production, allowing more products to be processed in less time than with a traditional studio. »
- Correction : conservée, tournure allégée : « The system automates both capture and post-production, so you can process more products in less time than with a traditional studio. »

**E53 · claim · mineur** (ajout)
- Actuel : « Orbitvu offers specialized studios such as the Fashion Studio for clothing or the Bike Studio for bikes. Each studio integrates specific functionalities optimized for its field of application, guaranteeing consistent professional results. »
- Correction : alignée sur F55.
