# Anomalies annotées — famille 67d16fc7ca69ff54d95f3dae

Base : `01-TEXTE_ACTUEL.md` (texte servi, `main` `17fc0b3`) et les JSON sources. Revue : `reviews/67d16fc7ca69ff54d95f3dae.json`.

Les extraits « Actuel » sont cités mot pour mot (balises retirées). « Retenu » renvoie à la formulation de `04-PROPOSITION_FR.md` ou `04-PROPOSITION_EN.md`. Origine : « revue » = anomalie de la revue, vérifiée contre `01` ; « ajout » = relevée pendant la rédaction du dossier.

## Bilan

| | FR | EN |
|---|---|---|
| Anomalies de la revue vérifiées | 15 sur 15 confirmées | 22 sur 22 confirmées, plus 1 claim de la revue (EN-19) ; les deux entrées groupées « textes alternatifs » sont éclatées ici image par image (9 entrées), soit 30 entrées issues de la revue |
| Anomalies de la revue retirées comme fausses | 0 | 0 |
| Anomalies de la revue corrigées sur un point | 1 : FR-46 (l'image « __wf_reserved_decorative » n'est pas décorative, un alt vide ne convient pas) | 1 : EN-53 (même image) |
| Anomalies ajoutées | 43 | 40 |
| Total numéroté | **58** (56 dans l'ordre du texte + 2 transversales) | **70** (68 dans l'ordre du texte + 2 transversales) |
| Dont majeures | 2 | 20 |
| Observations hors texte (sans correction dans la proposition) | 2 | 1 |

Gravité : **majeur** = faute visible qui dégrade la compréhension, l'accessibilité ou le crédit métier ; **mineur** = faute de langue, de typographie ou de style sans perte de sens.

---

## FR

### Métadonnées

**FR-01** · `title` · casse · mineur · revue
- Actuel : « Le Guide complet de la photographie packshot, 2 : matériel photo et notions à connaître »
- Problème : majuscule artificielle à « Guide », incohérente avec le H1 (« Le guide complet… ») et avec les volets 3 à 5.
- Retenu : « Le guide complet de la photographie packshot, 2 : matériel photo et notions à connaître »

**FR-02** · `h1` · incohérence SEO H1 / sujet · mineur · revue
- Actuel : « Le guide complet de la photographie packshot, 2 »
- Problème : le H1 ne dit pas le sujet (le matériel photo), que portent le `title`, le `metaTitle` et le corps ; il sert aussi d'alt à l'image principale. Convention partagée par les volets 3 à 5 : décision Laurent (06, point 2).
- Retenu : H1 = `title` corrigé.

**FR-03** · `metaTitle` · casse, registre, longueur · mineur · revue (longueur : ajout)
- Actuel : « Quel matériel photo pour de la Photographie Packshot ? [Guide] »
- Problème : majuscules artificielles ; « pour de la photographie » relâché ; 62 caractères, au-dessus de la cible de 60.
- Retenu : « Quel matériel photo pour la photographie packshot ? [Guide] » (59 caractères).

**FR-04** · `description` · casse, longueur · mineur · revue (longueur : ajout)
- Actuel : « Dans ce 2e article de notre Guide de la Photographie Packshot, découvrez le matériel photo nécessaire pour créer de bons packshots ! »
- Problème : majuscules artificielles ; 132 caractères, sous la cible de 140 à 155 ; ne nomme aucun des matériels traités.
- Retenu : « Appareil photo, éclairage, fond, logiciel : le matériel pour réussir vos packshots produits. 2e volet de notre guide de la photographie packshot. » (145 caractères ; justification dans `05`).

### Corps, dans l'ordre du texte

**FR-05** · introduction, § 1 · usage · mineur · ajout
- Actuel : « Bienvenue dans le second volet de notre guide complet sur la photographie packshot. »
- Problème : « second » suppose une série de deux ; le guide compte cinq volets (l'article renvoie aux volets 3, 4 et 5). « guide complet sur » diverge du titre « guide complet de ».
- Retenu : « Bienvenue dans le deuxième volet de notre guide complet de la photographie packshot. »

**FR-06** · H2 n° 1 · typographie · mineur · ajout
- Actuel : « Matériel photo : De quoi avez-vous besoin pour prendre des photographies packshot de vos produits ? »
- Problème : majuscule fautive après le deux-points ; « prendre des photographies packshot de vos produits » est lourd.
- Retenu : « Matériel photo : de quoi avez-vous besoin pour réaliser les packshots de vos produits ? » (« matériel photo » et « packshots… produits » conservés pour les requêtes).

**FR-07** · image 1, alt · texte alternatif · mineur · ajout
- Actuel : alt « un studio photo traditionnel » (espace finale, `/images/blog/67d15a1ea67d40a54ffcc3c3.avif`)
- Problème : alt télégraphique qui ne décrit pas l'image ; espace parasite en fin de valeur.
- Retenu : « Studio photo traditionnel avec fond blanc, boîtes à lumière sur pied et éclairages suspendus au plafond » (`05`).

**FR-08** · liste à puces, puce 2 · lourdeur, comparatif · mineur · ajout
- Actuel : « sachez qu'ils bénéficient d'un format bien plus compact qu'un studio photo plus traditionnel. »
- Problème : « bénéficier d'un format » est une périphrase ; « plus traditionnel » n'a pas de sens comparatif ici.
- Retenu : « sachez que ces studios sont bien plus compacts qu'un studio photo traditionnel. »

**FR-09** · § « Peu importe votre choix » · registre, anglicisme · mineur · ajout
- Actuel : « Peu importe votre choix, il vous faudra également suffisamment d'espace à côté de votre studio pour rassembler vos produits avant de les photographier, ainsi qu'une surface pour les ouvrir, les préparer et les nettoyer si besoin, puis les repackager. »
- Problème : « Peu importe » est familier en tête de phrase ; « repackager » est un anglicisme ; « les ouvrir » (des produits) est imprécis.
- Retenu : « Quel que soit votre choix, prévoyez aussi de la place à côté du studio pour rassembler vos produits avant de les photographier, ainsi qu'un plan de travail pour les déballer, les préparer, les nettoyer si besoin, puis les remballer. »

**FR-10** · § « Pour réussir une photographie packshot » · anglicisme, rupture logique · mineur · revue (complétée)
- Actuel : « Dans l'industrie du skincare et des cosmétiques, un appareil avec une excellente reproduction des couleurs est essentiel pour représenter fidèlement les teintes des produits. Celui-ci peut en effet faire une énorme différence en matière de qualité d'image et d'impact visuel. »
- Problème : anglicisme « skincare » ; la phrase de maillage, insérée au milieu du raisonnement, fait de « Celui-ci » un référent ambigu (l'appareil en général ou l'appareil à bonne colorimétrie ?).
- Retenu : la phrase sur l'impact de l'appareil est remontée ; l'exemple sectoriel suit avec « par exemple » : « …en particulier votre appareil photo : il peut faire une énorme différence en matière de qualité d'image et d'impact visuel. Dans le secteur des cosmétiques et des soins de la peau, par exemple, un appareil offrant une excellente reproduction des couleurs est essentiel pour restituer fidèlement les teintes des produits. » Lien et cible inchangés ; ancre « cosmétiques et des soins de la peau » (06, point 15).

**FR-11** · § « Mais quel type d'appareil photo choisir ? » · référent, répétition, typographie · mineur · ajout
- Actuel : « Ils sont en effet disponibles dans une vaste gamme de types et de prix... »
- Problème : « Ils » renvoie à un pluriel absent (« quel type d'appareil ») ; « type… types » ; trois points au lieu du caractère de points de suspension.
- Retenu : « L'offre est vaste, en types d'appareils comme en prix… »

**FR-12** · image 2, alt · texte alternatif · mineur · ajout
- Actuel : alt « Différence qualité packshot produit » (`/images/blog/67dbae71507d67953210f1b0.avif`)
- Problème : suite de mots-clés, ne décrit pas les deux photos comparées.
- Retenu : « Le même flacon compte-gouttes de soin cosmétique photographié au smartphone sur fond gris, puis avec un studio photo Orbitvu sur fond blanc » (`05`).

**FR-13** · légende de l'image 2 · typographie, construction · mineur · revue
- Actuel : « Différence entre un packshot produit fait avec un smartphone VS un studio photo spécialisé Orbitvu »
- Problème : « VS » en capitales, anglicisme typographique ; la comparaison oppose un packshot à un studio.
- Retenu : « Différence entre un packshot réalisé au smartphone et un packshot réalisé avec un studio photo spécialisé Orbitvu »

**FR-14** · § « Nous vous recommandons plutôt » · calque · mineur · ajout
- Actuel : « Les appareils photo reflex (DSLR) sont largement considérés comme la norme de facto pour la photographie packshot de produits : ils offrent en effet des images haute résolution et une grande polyvalence. »
- Problème : « norme de facto » calque « de facto standard » ; « photographie packshot de produits » redondant ; « en effet » superflu. L'affirmation elle-même est datée : 06, point 8.
- Retenu : « Les appareils photo reflex (DSLR) sont largement considérés comme la référence en photographie packshot : ils offrent des images haute résolution et une grande polyvalence. » (même force d'affirmation).

**FR-15** · même §, segment 3 · fait technique · mineur · revue (claim)
- Actuel : « Les tailles de capteur les plus courantes sont le plein format (35 mm de largeur) et l'APS-C (24 mm de largeur). »
- Problème : « 35 mm » désigne le format de film de référence ; le capteur plein format mesure 36 × 24 mm. « 24 mm » pour l'APS-C est un arrondi.
- Retenu : « le plein format (environ 35 mm de largeur) et l'APS-C (environ 24 mm de largeur) », suivi d'une note `[À VALIDER]` recommandant « 36 mm » (06, point 6). Aucun chiffre nouveau n'est publié sans validation.

**FR-16** · même §, segment 3 · ponctuation, collocation · mineur · ajout
- Actuel : « nous recommandons d'opter pour l'APS-C qui offre une profondeur de champ plus élevée et donc un produit plus net dans le cadre. »
- Problème : relative explicative sans virgule ; on dit « une plus grande profondeur de champ ». Le fond (affirmation simplifiée) relève de 06, point 7.
- Retenu : « nous recommandons l'APS-C, qui offre une plus grande profondeur de champ, et donc un produit plus net dans le cadre. »

**FR-17** · même §, segment 4 · accord · mineur · ajout
- Actuel : « vous devrez également penser au reste de votre matériel photo, tels que les objectifs et les trépieds. »
- Problème : « tel que » s'accorde avec le nom qui précède (« matériel », masculin singulier) : « tels » est fautif.
- Retenu : « pensez au reste de votre matériel photo, comme les objectifs et les trépieds. »

**FR-18** · même §, segment 4 · insertion de maillage, calque · mineur · ajout (signalé dans les remarques de la revue)
- Actuel : « Pour le secteur du high-tech, de l'électroménager et de l'informatique, des objectifs macro peuvent être nécessaires pour capturer les petits composants avec précision. »
- Problème : phrase de maillage plaquée sans transition ; « capturer » calque l'anglais « capture ».
- Retenu : « Dans les secteurs du high-tech, de l'électroménager et de l'informatique, par exemple, des objectifs macro peuvent être nécessaires pour photographier avec précision les petits composants. » Lien et cible inchangés.

**FR-19** · même §, segment 4 · terminologie · mineur · ajout
- Actuel : « tandis que les trépieds aident à maintenir la stabilité de l'appareil photo et à minimiser les flous de mouvement. »
- Problème : le trépied supprime le flou de bougé (mouvement de l'appareil), pas le flou de mouvement (sujet qui bouge) ; le texte emploie d'ailleurs « flous de bougé » plus loin.
- Retenu : « tandis que le trépied assure la stabilité de l'appareil et limite le flou de bougé. »

**FR-20** · § 1 de « Soignez votre éclairage » · syntaxe · mineur · ajout
- Actuel : « Pour réaliser des photographies packshot de qualité, l'éclairage est un élément crucial qu'il ne faut pas négliger »
- Problème : anacoluthe : le sujet sous-entendu de « réaliser » n'est pas « l'éclairage ».
- Retenu : « L'éclairage joue un rôle crucial dans la qualité d'un packshot et ne doit pas être négligé : une bonne mise en lumière fait ressortir… »

**FR-21** · même §, segment 2 · grammaire · mineur · ajout
- Actuel : « sans ombres ou reflets indésirables. »
- Problème : après « sans », la coordination négative se fait avec « ni ».
- Retenu : « sans ombres ni reflets indésirables. »

**FR-22** · même §, segment 3 · syntaxe · mineur · ajout
- Actuel : « Pour cela, plusieurs solutions et matériel photo sont envisageables »
- Problème : coordination d'un pluriel dénombrable et d'un singulier collectif sous un même verbe.
- Retenu : « Pour cela, plusieurs solutions s'offrent à vous »

**FR-23** · image 3, alt · texte alternatif · mineur · ajout
- Actuel : alt « importance températures couleur photo produit » (`/images/blog/67d15a1ea67d40a54ffcc3d2.avif`)
- Problème : suite de mots-clés.
- Retenu : « Le même clavier photographié sous trois températures de couleur : froide, neutre et chaude » (`05`).

**FR-24** · § « Il est également important » · typographie, répétition · mineur · revue (répétition : ajout)
- Actuel : « Il est également important de prendre en compte la température de couleur de l'éclairage utilisé. En effet, la température de couleur de la lumière peut influencer la perception de vos produits. […] avec une température de couleur de 5500K. »
- Problème : « 5500K » sans espace insécable ni séparateur de milliers ; « température de couleur » trois fois en trois phrases.
- Retenu : « Tenez également compte de la température de couleur de l'éclairage, qui peut influencer la perception de vos produits. […] d'une température de couleur de 5 500 K. » La valeur elle-même : 06, point 10.

**FR-25** · § « Autre détail du côté du matériel photo » · redondance, calque · mineur · ajout
- Actuel : « Autre détail du côté du matériel photo : nous vous conseillons par ailleurs de travailler avec un trépied pour éviter les flous de bougé, surtout si vous utilisez une faible vitesse d'obturation pour une meilleure luminosité. »
- Problème : « Autre détail… par ailleurs » redondant ; « faible vitesse d'obturation » (on dit « vitesse lente ») ; « pour une meilleure luminosité » imprécis.
- Retenu : « Autre point côté matériel : nous vous conseillons de travailler avec un trépied pour éviter le flou de bougé, surtout si vous utilisez une vitesse d'obturation lente pour obtenir une image plus lumineuse. »

**FR-26** · § 1 de « Optez pour un arrière-plan adapté » · collocation · mineur · ajout
- Actuel : « L'objectif est en effet de ne pas distraire l'attention du produit. »
- Problème : on « détourne » l'attention de quelque chose ; « en effet » superflu.
- Retenu : « …le plus simple possible : l'objectif est de ne pas détourner l'attention du produit. »

**FR-27** · image 4, alt · texte alternatif · mineur · ajout
- Actuel : alt « Importance arrière plan photo produit » (`/images/blog/67d15a1ea67d40a54ffcc40b.avif`)
- Problème : suite de mots-clés ; « arrière-plan » sans trait d'union.
- Retenu : « La même petite voiture en bois photographiée sur fond blanc, sur fond gris et sur fond rouge » (`05`).

**FR-28** · § « Un fond trop chargé » · structure · mineur · ajout
- Actuel : le paragraphe commence par un caractère invisible suivi d'un `<br>` (« ⏎ Un fond trop chargé… »).
- Problème : ce paragraphe n'est pas retiré au rendu (il contient une balise) et s'affiche avec une ligne blanche en tête.
- Retenu : paragraphe sans saut de ligne initial.

**FR-29** · même § · typographie · mineur · ajout
- Actuel : « De même, un fond gris ou noir peut "écraser" le produit. »
- Problème : guillemets droits anglais.
- Retenu : « De même, un fond gris ou noir peut « écraser » le produit. »

**FR-30** · même §, segment 2 · syntaxe, terminologie · mineur · ajout
- Actuel : « Il n'en sera d'ailleurs que plus simple pour détourer l'image par la suite afin d'obtenir un fond transparent pour d'autres supports ! »
- Problème : « Il n'en sera que plus simple pour détourer » est fautif (« de détourer ») ; on détoure le produit, pas l'image.
- Retenu : « Le détourage n'en sera que plus facile si vous avez besoin, par la suite, d'un fond transparent pour d'autres supports ! »

**FR-31** · § 1 de « Veillez à la répétabilité » · changement de personne, harmonisation · mineur · ajout
- Actuel : « Lorsque l'on réalise des photographies packshot pour mettre en valeur ses produits sur internet, […] pour que l'ensemble de vos produits soit présenté de manière cohérente »
- Problème : passage de « ses produits » à « vos produits » dans le même paragraphe ; « prises de vues » et « prise de vue » alternent dans l'article.
- Retenu : « Lorsque vous réalisez des packshots pour mettre en valeur vos produits sur internet… » ; graphie unique « prise(s) de vue », y compris dans l'intertitre.

**FR-32** · image 5, alt · texte alternatif · mineur · ajout
- Actuel : alt « Exemple placement de lumière studio photo » (`/images/blog/67d15a1ea67d40a54ffcc411.avif`)
- Problème : suite de mots-clés. Le schéma lui-même est légendé en anglais (« white background », « lamp 1 », « lamp 2 ») sur la page française (06, point 18).
- Retenu : « Schéma d'installation vu de dessus : fond blanc, produit au centre, deux lampes de part et d'autre et appareil photo face au produit » [à vérifier sur l'image — 06, point 17].

**FR-33** · § « Cependant, maintenir cette homogénéité » · pléonasme, lourdeur · mineur · ajout
- Actuel : « Cependant, maintenir cette homogénéité peut s'avérer être une tâche ardue […]. La logistique qui entoure la mise en place de chaque produit peut rapidement devenir contraignante et rendre difficile l'obtention d'un niveau acceptable d'homogénéité. »
- Problème : « s'avérer être » est un pléonasme critiqué ; « La logistique qui entoure la mise en place » et « l'obtention d'un niveau » alourdissent.
- Retenu : « Cependant, cette homogénéité peut s'avérer difficile à maintenir […]. La mise en place de chaque produit peut vite devenir contraignante, au point qu'il devient difficile d'atteindre un niveau d'homogénéité acceptable. »

**FR-34** · § « C'est pourquoi » · zeugme, ordre logique · mineur · ajout
- Actuel : « en mesurant attentivement les distances et les angles, ainsi que les divers réglages utilisés, […] Cette rigueur vous évitera d'avoir à retoucher chaque photo individuellement en phase de post-production, même si cela vous prendra nécessairement du temps en préparation. »
- Problème : on ne « mesure » pas des réglages ; la concession placée en fin de phrase inverse l'ordre coût / bénéfice.
- Retenu : « en relevant soigneusement les distances, les angles et les réglages utilisés, pour garantir que chaque prise de vue sera semblable à la précédente. Cette rigueur demande forcément du temps de préparation, mais elle vous évitera de retoucher chaque photo une à une en post-production. »

**FR-35** · § « À noter » · calque, participe, verbe impropre · mineur · revue (complétée)
- Actuel : « vous pouvez enregistrer toutes vos positions et réglages pour les réutiliser en un clic d'une photo à l'autre, rendant cette étape totalement triviale ! Vous aurez également beaucoup moins de matériel photo à ressortir et replacer à chaque fois. »
- Problème : « triviale » au sens anglais de « trivial » ; participe « rendant » sans sujet clair ; « replacer » pour « remettre en place ».
- Retenu : « vous pouvez enregistrer toutes vos positions et tous vos réglages pour les réutiliser en un clic d'une photo à l'autre. Cette étape devient alors un jeu d'enfant ! Vous aurez aussi beaucoup moins de matériel à ressortir et à remettre en place à chaque fois. » Promesse produit inchangée en force : 06, point 11.

**FR-36** · § 1 de « Utilisez un bon logiciel » · construction, locution · mineur · revue (construction : ajout)
- Actuel : « permet non seulement de supprimer les éventuelles imperfections […], mais il permet surtout d'effectuer les ajustements […] : tout autant d'étapes indispensables pour obtenir un packshot parfait. »
- Problème : « non seulement… mais il permet surtout » rompt le parallélisme ; « tout autant de » est fautif dans ce sens (« autant de »).
- Retenu : « permet non seulement de supprimer les éventuelles imperfections susceptibles d'altérer la qualité de l'image, mais surtout d'ajuster la luminosité et la netteté, de recadrer ou encore de supprimer l'arrière-plan : autant d'étapes indispensables pour obtenir un packshot parfait. »

**FR-37** · § « Dans cette optique » · anglicisme, connecteur · mineur · ajout
- Actuel : « est un excellent exemple de logiciel de post-production pour éditer des photographies packshot. Ce logiciel est après tout reconnu pour sa capacité… »
- Problème : « éditer » au sens anglais d'« edit » (retoucher) ; « après tout » n'a pas de valeur argumentative ici.
- Retenu : « est un excellent exemple de logiciel de post-production pour retoucher des packshots. Il est reconnu pour sa capacité… »

**FR-38** · § « Cependant, l'utilisation de ce type de logiciel » · illogisme · mineur · ajout
- Actuel : « Apprendre à manipuler les différentes options de traitement d'image nécessite ainsi une certaine expertise que seul un utilisateur expérimenté pourra acquérir. »
- Problème : un utilisateur expérimenté possède déjà l'expertise ; l'idée est qu'elle s'acquiert avec l'expérience.
- Retenu : « Maîtriser les fonctionnalités de Photoshop demande du temps et de la pratique : manipuler ses différentes options de traitement d'image exige une certaine expertise, qui ne s'acquiert qu'avec l'expérience. »

**FR-39** · § d'ouverture du H2 n° 2 · calque · mineur · revue
- Actuel : « Il peut être extrêmement bénéfique d'investir dans un studio photo automatisé en interne pour les entreprises en raison de plusieurs facteurs clés. »
- Problème : ordre des compléments calqué sur l'anglais (« beneficial for businesses due to several key factors »).
- Retenu : « Pour une entreprise, investir dans un studio photo automatisé en interne peut être extrêmement bénéfique, et ce pour plusieurs raisons. »

**FR-40** · § 1 de « Homogénéité et standardisation » · syntaxe, connecteur · mineur · ajout
- Actuel : « Tout d'abord, la notion de flux est primordiale à bien comprendre : au cours de l'année, les prises de vues de produits s'enchaînent en fonction du calendrier, de la mise en stock, du marketing et autres. Cependant, toutes les photos doivent rester cohérentes… »
- Problème : « primordiale à bien comprendre » est maladroit ; « et autres » est relâché ; « Cependant » marque une opposition là où il y a une contrainte (« Or »).
- Retenu : « Il faut d'abord bien comprendre la notion de flux : tout au long de l'année, les prises de vue de produits s'enchaînent au gré du calendrier, des mises en stock, des besoins du marketing, etc. Or toutes les photos doivent rester cohérentes et homogènes pour refléter une image de marque professionnelle. »

**FR-41** · image 6, alt · texte alternatif · mineur · ajout
- Actuel : alt « logiciel Orbitvu Station automatisation » (espace finale, `/images/blog/67d15a1ea67d40a54ffcc3c9.avif`)
- Problème : suite de mots-clés ; espace parasite.
- Retenu : « Captures d'écran du logiciel Orbitvu Station : réglages de l'image et commande de l'éclairage du studio » (`05`).

**FR-42** · § « Et comme nous vous l'expliquions » · phrase sans principale, impropriété · mineur · ajout
- Actuel : « …tout le matériel photo que cela comporte… Alors qu'un studio photo automatisé est conçu de manière à simplifier considérablement cette notion de flux et d'homogénéité. »
- Problème : la seconde phrase, introduite par « Alors que », n'a pas de proposition principale ; on simplifie la gestion d'un flux, pas une « notion ».
- Retenu : « Comme nous l'avons vu plus haut, cette exigence demande beaucoup d'efforts avec un studio photo traditionnel et tout le matériel qu'il comporte. Un studio photo automatisé, lui, est conçu pour simplifier considérablement la gestion de ce flux et le maintien de l'homogénéité. »

**FR-43** · § « En effet, grâce à un matériel photo spécialisé » · juxtaposition, lourdeur · mineur · ajout
- Actuel : « grâce à un matériel photo spécialisé et entièrement contrôlé par un logiciel intuitif facile à utiliser, vous êtes aisément en mesure d'obtenir… »
- Problème : « spécialisé et entièrement contrôlé » coordonne mal ; deux adjectifs juxtaposés sans liaison ; « vous êtes aisément en mesure » est lourd.
- Retenu : « Grâce à un matériel photo spécialisé, entièrement piloté par un logiciel intuitif et facile à utiliser, vous obtenez aisément une qualité d'image constante et cohérente… » Promesse inchangée en force : 06, point 11.

**FR-44** · image 7, alt · texte alternatif · mineur · ajout
- Actuel : alt « Gamme studios photo automatisés Orbitvu » (`/images/blog/67d15a1ea67d40a54ffcc41a.avif`)
- Problème : style télégraphique (préposition manquante).
- Retenu : « Gamme de studios photo automatisés Orbitvu, du plus compact au plus grand » (`05`).

**FR-45** · § « Par ailleurs, un studio photo automatisé combine » · impropriété · mineur · ajout
- Actuel : « un studio photo automatisé combine l'ensemble du matériel photo dans un seul et même système : l'éclairage, l'arrière-plan, le positionnement des produits, les vues à 360 degrés et la post-production. »
- Problème : l'énumération contient des fonctions (positionnement, vues à 360 degrés, post-production) qui ne sont pas du « matériel ».
- Retenu : « un studio photo automatisé réunit dans un seul et même système l'éclairage, l'arrière-plan, le positionnement des produits, les vues à 360 degrés et la post-production. » La suite (gain de temps, réduction des erreurs et des coûts, qualité « garantie ») est conservée telle quelle : 06, point 11.

**FR-46** · image 8, alt · texte alternatif · **majeur** · revue (corrigée)
- Actuel : alt `__wf_reserved_decorative` (`/images/blog/67d15a1ea67d40a54ffcc3c6.avif`)
- Problème : valeur réservée de Webflow servie comme texte alternatif. Correction de la revue : l'image n'est pas décorative ; elle montre un menu « 2D / 360° / Video » à côté d'un appareil compact et illustre la section « Accès à plusieurs médias ». Un alt vide ferait perdre l'information.
- Retenu : « Appareil photo compact à côté d'un menu de choix du média : 2D, 360° ou vidéo » (`05`).

**FR-47** · § « Investir dans un studio photo automatisé » · pléonasme, connecteur · mineur · ajout
- Actuel : « Outre le gain de temps et les économies de coûts, […] Nous en parlerons toutefois davantage dans les articles suivants de cette série. »
- Problème : « économies de coûts » est pléonastique ; « toutefois » marque une restriction qui n'existe pas.
- Retenu : « Outre le gain de temps et les économies réalisées, […] Nous y reviendrons plus en détail dans les prochains articles de cette série. »

**FR-48** · § 1 de « La présentation » · impropriété · mineur · ajout
- Actuel : « de le placer dans un angle favorable à la lumière »
- Problème : « placer dans un angle » signifie « dans un coin » ; l'idée est l'orientation par rapport à la lumière.
- Retenu : « de l'orienter sous un angle favorable à la lumière »

**FR-49** · § 2 de « La présentation » · répétition · mineur · ajout
- Actuel : « Cela peut sembler évident, mais cela peut faire une grande différence lors de la prise de vue. »
- Problème : « cela peut… cela peut ».
- Retenu : « Cela peut sembler évident, mais ce soin peut faire une grande différence lors de la prise de vue. »

**FR-50** · image 9, alt · texte alternatif · **majeur** · revue
- Actuel : alt `__wf_reserved_inherit` (`/images/blog/67dbae71507d67953210f1b8.avif`)
- Problème : valeur réservée de Webflow servie comme texte alternatif.
- Retenu : « Packshot de lunettes de soleil blanches sur fond noir, nettes sur toute leur profondeur » (`05`).

**FR-51** · § « Enfin, il est crucial d'éviter le flou » · typographie, redondance · mineur · revue
- Actuel : « en utilisant la technique du "focus stacking". Cette technique consiste à prendre plusieurs photos en changeant le point de mise au point à chaque prise de vue »
- Problème : guillemets droits (le guillemet fermant est en outre isolé dans sa propre balise `<strong>`) ; « point de mise au point » redondant.
- Retenu : « en utilisant la technique du « focus stacking ». Elle consiste à prendre plusieurs photos en décalant la mise au point à chaque prise de vue » (guillemets hors du lien).

**FR-52** · même § · construction · mineur · ajout
- Actuel : « Si cette technique du focus stacking est assez chronophage avec un studio photo traditionnel, sachez qu'elle peut se faire de manière automatique grâce à un studio photo automatisé. »
- Problème : « Si… sachez que » relie mal une concession à une information ; « grâce à un studio photo automatisé » répète « automatique ».
- Retenu : « Assez chronophage avec un studio photo traditionnel, le focus stacking peut être réalisé automatiquement avec un studio photo automatisé. » Promesse produit : 06, point 11.

**FR-53** · § 1 de « Les détails » · répétition · mineur · ajout
- Actuel : « il faut ainsi veiller à soigner chaque détail, à utiliser les bonnes techniques de prise de vue, et à utiliser les outils de retouche adéquats. C'est également là qu'on peut voir à quel point… »
- Problème : « utiliser » répété ; virgule avant « et » ; « ainsi » sans valeur.
- Retenu : « Réussir des packshots de qualité, c'est donc soigner chaque détail, employer les bonnes techniques de prise de vue et utiliser les outils de retouche adéquats. C'est aussi là que l'on mesure à quel point… »

**FR-54** · FAQ 3 · ponctuation, collocation · mineur · ajout
- Actuel : « Un studio photo automatisé permet de créer des visuels uniques qui renforcent votre identité de marque et améliorent la confiance des clients qui voient exactement ce qu'ils achètent. »
- Problème : sans virgule, « des clients qui voient exactement ce qu'ils achètent » devient restrictif (seuls certains clients) ; on « renforce » la confiance plutôt qu'on ne l'« améliore ».
- Retenu : « …des visuels uniques, qui renforcent votre identité de marque et la confiance de vos clients : ils voient exactement ce qu'ils achètent. »

**FR-55** · FAQ 4 · numération, redondance · mineur · ajout
- Actuel : « une vue frontale principale qui présente le produit de face, deux à trois vues d'angles différents […] et une à deux vues détaillées »
- Problème : entre deux entiers consécutifs, on écrit « deux ou trois », « une ou deux » ; « vue frontale… de face » redondant.
- Retenu : « une vue de face principale, deux ou trois vues sous différents angles […] et une ou deux vues de détail ». Les chiffres (24 à 72 images, 5 à 7 photos) sont conservés : 06, point 12.

**FR-56** · FAQ 5 · typographie des unités · mineur · revue
- Actuel : « Un objectif macro dans la plage 85mm-105mm est idéal […] un objectif standard à focale fixe de 50mm avec une bonne ouverture (f/1.8 ou f/1.4) […] comme un 24-70mm »
- Problème : unités collées, plage écrite à l'anglaise, point décimal.
- Retenu : « Un objectif macro de 85 à 105 mm est idéal […] de 50 mm avec une bonne ouverture (f/1,8 ou f/1,4) […] comme un 24-70 mm ». Recommandations conservées : 06, point 12.

### Transversales FR

**FR-T1** · tout l'article · typographie · mineur · ajout
- Actuel : espaces ordinaires avant « : ? ! » (ex. « Matériel photo : », « Mais quel type d'appareil photo choisir ? », « prend rapidement de la place ! »).
- Problème : la typographie française demande une espace insécable, faute de quoi la ponctuation peut passer seule à la ligne.
- Retenu : espaces insécables partout dans la proposition.

**FR-T2** · tout l'article · tics de rédaction · mineur · ajout
- Actuel : « en effet » 10 fois, « ainsi » 11 fois, souvent sans valeur logique (« Ils sont en effet disponibles », « Il est ainsi recommandé », « Il est ainsi indispensable… Vous devez donc »).
- Problème : connecteurs mécaniques qui alourdissent le texte et ont été recopiés en série dans l'EN (« Indeed », « in fact », « therefore »).
- Retenu : connecteurs retirés ou remplacés là où ils n'expriment ni cause ni conséquence.

### Observations hors texte FR (aucune correction dans la proposition)

- **FR-O1** · structure : les 13 intertitres H3 sont enveloppés dans `<strong>` (export Webflow). Sans effet sur le texte ; à retirer ou non selon le gabarit au moment de la conversion.
- **FR-O2** · cohérence image / texte : l'illustration de « La netteté » montre un produit sur fond noir, alors que l'article déconseille deux sections plus haut le fond gris ou noir. Choix de visuel : 06, point 18.

### Retouches de fluidité sans anomalie caractérisée

Pour transparence, ces reformulations de la proposition ne corrigent pas une faute mais allègent la phrase ; aucune ne modifie un fait ni la force d'une affirmation : « ce guide complet vous offrira une véritable mine » → « ce guide vous offrira une mine » ; « En effet, le matériel photo prend rapidement de la place ! » → « car le matériel photo prend vite de la place » ; « Mais ce qui importe réellement » → « Mais ce qui compte vraiment » ; « Celui-ci… Cela aura en effet une influence notable » → « qui ont une influence notable » ; « Attention, cela ne veut pas pour autant dire » → « Attention : cela ne veut pas dire » ; « Le choix du fond est encore une fois » → « est, là encore, » ; « l'objectif premier est de mettre en avant le produit et ce, de manière fidèle » → « l'objectif premier est de présenter le produit fidèlement » ; « Il y a encore bien d'autres éléments… éléments que nous verrons » → « Bien d'autres éléments entrent en jeu… Nous les aborderons » ; « Il pourrait être tentant d'en rester aux smartphones, mais leur qualité d'image » → « Il pourrait être tentant de s'en tenir au smartphone, mais sa qualité d'image » ; « Tout d'abord, il convient de savoir que » → « Sachez d'abord que » ; « Il est également important de prendre en compte » → « Tenez également compte de » ; « Un packshot… révèle tous les détails et caractéristiques du produit » → « révèle tous ses détails et toutes ses caractéristiques » ; ancres des liens vers les volets 3 et 5 légèrement resserrées (06, point 15).

---

## EN

L'EN est une traduction automatique non relue du français (preuve dans `00-FICHE.md`). La proposition est une retraduction intégrale depuis le FR corrigé ; chaque anomalie ci-dessous est donc corrigée par construction. La colonne « Retenu » cite la formulation de `04-PROPOSITION_EN.md`.

### Métadonnées et visuel principal

**EN-01** · `title` · numérotation de série · mineur · ajout
- Actuel : « The Complete Guide to Packshot Photography, 2: Photo Equipment and What You Need to Know »
- Problème : « , 2: » calque la numérotation française ; l'anglais dit « Part 2 ».
- Retenu : « The Complete Guide to Packshot Photography, Part 2: Photo Equipment and What You Need to Know » (06, point 4).

**EN-02** · `h1` · incohérence SEO H1 / sujet · mineur · ajout (pendant de FR-02)
- Actuel : « The complete guide to packshot photography, 2 »
- Problème : H1 tronqué, sans le sujet ; sert d'alt à l'image principale.
- Retenu : H1 = `title` proposé (06, point 2).

**EN-03** · `metaTitle` · titre calqué · **majeur** · revue
- Actuel : « What photo equipment for Packshot Photography? [Guide] »
- Problème : calque mot à mot de « Quel matériel photo pour… » ; question sans verbe ; casse incohérente.
- Retenu : « Packshot Photography Equipment: What Do You Need? [Guide] » (57 caractères).

**EN-04** · `description` · calque, casse, longueur · mineur · ajout
- Actuel : « In this 2nd article of our Packshot Photography Guide, discover the camera equipment needed to create good packshots! »
- Problème : « discover » calque « découvrez » ; majuscules artificielles ; 117 caractères.
- Retenu : « Camera, lighting, background, software: the equipment you need for professional product packshots, in part 2 of our complete guide to packshot photography. » (155 caractères).

**EN-05** · image principale `/images/blog/67dbae71507d67953210f224.avif` · mélange linguistique · **majeur** · ajout
- Actuel : visuel portant le texte incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 2 », servi en tête de la page anglaise.
- Problème : premier élément vu par un lecteur anglophone, en français.
- Retenu : non corrigeable dans le texte ; déclinaison EN du visuel à décider (06, point 14).

### Corps, dans l'ordre du texte

**EN-06** · introduction, § 2 · calque · mineur · revue (« a real wealth » : ajout)
- Actuel : « Whether you are a company looking to maximize the sales of its products online, a beginner professional, or an experienced photographer looking to improve in this field, this comprehensive guide will offer you a real wealth of practical and technical information »
- Problème : « a beginner professional » calque « professionnel débutant » ; « a real wealth » calque « une véritable mine » ; « improve in this field » plat.
- Retenu : « Whether you're a company looking to maximize online sales of your products, a professional just starting out, or an experienced photographer looking to sharpen your skills, this guide offers a wealth of practical and technical information… »

**EN-07** · même § · traduction automatique · **majeur** · revue
- Actuel : « Proven tips, helpful tips, and cutting-edge techniques will help you get the most out of your camera equipment »
- Problème : « conseils éprouvés, astuces utiles » rendus par deux fois « tips ».
- Retenu : « Proven advice, practical tips, and advanced techniques will help you get the most out of your photo equipment »

**EN-08** · H2 n° 1 · calque · mineur · ajout
- Actuel : « Camera equipment: What do you need to take packshot photographs of your products? »
- Problème : « take packshot photographs of your products » est lourd ; « camera equipment » restreint le sujet à l'appareil.
- Retenu : « Packshot photography equipment: what do you need to shoot your products? » (porte la requête « packshot photography »).

**EN-09** · H3 n° 1 · calque, préposition · mineur · revue
- Actuel : « Make sure you have enough space in your premises in advance »
- Problème : calque de « Veillez au préalable… dans vos locaux » ; on dit « on your premises ».
- Retenu : « First, make sure you have enough space on your premises »

**EN-10** · § 1 du H3 n° 1 · calque · mineur · ajout
- Actuel : « Indeed, photo equipment takes up space quickly! »
- Problème : « Indeed » calque « En effet » en tête de phrase.
- Retenu : « …to shoot your packshots, because photo equipment quickly takes up room. »

**EN-11** · image 1, alt · mélange linguistique · **majeur** · revue
- Actuel : alt « un studio photo traditionnel » (`/images/blog/67d15a1ea67d40a54ffcc3c3.avif`)
- Problème : alt en français sur la page anglaise.
- Retenu : « Traditional photo studio with a white backdrop, softboxes on stands, and ceiling-mounted lights »

**EN-12** · puce 2 · article, calque · mineur · revue
- Actuel : « If you opt instead for a automated photo studio like the ones we sell, know that they benefit from a much more compact format than a more traditional photo studio. »
- Problème : « a automated » ; « know that they benefit from » calque « sachez qu'ils bénéficient de » ; « more traditional ».
- Retenu : « If you opt instead for an automated photo studio like the ones we sell, you'll find these studios are much more compact than a traditional photo studio. »

**EN-13** · H3 n° 2 · calque · mineur · ajout
- Actuel : « Choose your camera equipment carefully and in particular the camera »
- Problème : calque ; « camera equipment… the camera » redondant.
- Retenu : « Choose your photo equipment carefully, especially the camera »

**EN-14** · § 1 du H3 n° 2 · calque, référent · mineur · revue (référent : ajout)
- Actuel : « In the industry of Skincare and cosmetics, a device with excellent color reproduction is essential to accurately represent product hues. In fact, it can make a huge difference in image quality and visual impact. »
- Problème : « In the industry of » calqué ; majuscule à « Skincare » ; « device » pour un appareil photo ; « it » ambigu (même rupture que FR-10).
- Retenu : « …especially your camera: it can make a huge difference in image quality and visual impact. In skincare and cosmetics, for example, a camera with excellent color reproduction is essential to render product shades accurately. »

**EN-15** · § 2 du H3 n° 2 · calque · mineur · ajout
- Actuel : « They are in fact available in a wide range of types and prices... »
- Problème : « in fact » calque « en effet » ; trois points.
- Retenu : « The range is vast, in both types and prices… »

**EN-16** · image 2, alt · mélange linguistique · **majeur** · revue
- Actuel : alt « Différence qualité packshot produit » (`/images/blog/67dbae71507d67953210f1b0.avif`)
- Retenu : « The same cosmetic dropper bottle photographed with a smartphone on a gray background, then with an Orbitvu photo studio on a white background »

**EN-17** · légende de l'image 2 · ordre des mots calqué · mineur · revue
- Actuel : « Difference between a packshot product made with a smartphone vs a specialized photo studio Orbitvu »
- Retenu : « Packshot taken with a smartphone vs. packshot taken with a specialized Orbitvu photo studio »

**EN-18** · § « Instead, we recommend » · calque, typographie · mineur · ajout
- Actuel : « SLR cameras (DSLR) are widely considered to be the de facto standard for product packshot photography: they offer high resolution images and great versatility. ⏎ But what really matters is the sensor size and quality of your camera. This will in fact have a significant influence… »
- Problème : « SLR cameras (DSLR) » redondant ; « high resolution images » sans trait d'union ; « in fact » calqué.
- Retenu : « DSLR cameras are widely considered the benchmark for packshot photography: they deliver high-resolution images and great versatility. ⏎ But what really matters is your camera's sensor size and quality, which have a significant influence… »

**EN-19** · même §, segment 3 · fait technique · mineur · revue (claim)
- Actuel : « The most common sensor sizes are full frame (35mm wide) and APS-C (24mm wide). »
- Retenu : « full frame (about 35mm wide) and APS-C (about 24mm wide) » + note `[À VALIDER]` (06, point 6), comme FR-15.

**EN-20** · même §, segment 3 · collocation, ponctuation · mineur · ajout
- Actuel : « we recommend opting for the APS-C which offers a higher depth of field »
- Problème : « higher depth of field » (on dit « greater ») ; virgule manquante ; article superflu.
- Retenu : « we recommend APS-C, which offers greater depth of field »

**EN-21** · même §, segment 4 · traduction automatique · **majeur** · revue
- Actuel : « For the high-tech, household appliances and computer sector, of macro lenses may be required to capture small components accurately. »
- Problème : partitif « des » traduit par « of » : phrase agrammaticale.
- Retenu : « In the high-tech, household appliance, and computing sectors, for example, macro lenses may be needed to photograph small components accurately. »

**EN-22** · même §, segment 4 · terminologie · mineur · ajout
- Actuel : « while tripods help maintain camera stability and minimize motion blur. »
- Problème : même confusion que FR-19 : le trépied limite le « camera shake ».
- Retenu : « while a tripod keeps the camera steady and limits camera shake. »

**EN-23** · § 1 de « Take care of your lighting » · calque · mineur · ajout
- Actuel : « the good lighting of your products will allow you to highlight their characteristics, their texture and their details, and thus make them attractive in the eyes of your customers. »
- Problème : « the good lighting of », « allow you to », « in the eyes of » calqués.
- Retenu : « good lighting brings out your products' features, texture, and details, and makes them attractive to your customers. »

**EN-24** · même §, segment 2 · calque, connecteur · mineur · ajout
- Actuel : « Be careful, this does not mean that you should not leave any shadows in the final shot […] On the other hand, care must be taken not to add superfluous shadows. »
- Problème : « Be careful » calque « Attention » ; « On the other hand » traduit à contresens « en revanche ».
- Retenu : « That doesn't mean the final shot should have no shadows at all […] What you need to avoid is adding unnecessary shadows. »

**EN-25** · même §, segment 3 · terminologie, syntaxe · **majeur** · ajout
- Actuel : « For this, several solutions and photo equipment are possible: use a light box (also called softbox) »
- Problème : en anglais, « light box » désigne une tente ou un cube de prise de vue, pas une boîte à lumière ; « softbox » est le terme ; coordination fautive (« solutions and photo equipment are possible »).
- Retenu : « To achieve this, you have several options: use a softbox »

**EN-26** · image 3, alt · mélange linguistique · **majeur** · revue
- Actuel : alt « importance températures couleur photo produit » (`/images/blog/67d15a1ea67d40a54ffcc3d2.avif`)
- Retenu : « The same keyboard photographed under three color temperatures: cool, neutral, and warm »

**EN-27** · § « It is also important » · faux ami métier · **majeur** · revue (« Indeed » : ajout)
- Actuel : « Indeed, the color temperature of the light can influence the perception of your products. For example, light that is too cold may give the impression of sterility, while light that is too hot may alter the colors of your product. »
- Problème : en température de couleur, l'anglais dit « cool / warm », pas « cold / hot » ; « Indeed » calqué.
- Retenu : « For example, light that is too cool can make the image feel sterile, while light that is too warm can distort the product's colors. »

**EN-28** · § « Another detail » · terminologie · mineur · ajout
- Actuel : « we also recommend that you work with a tripod to avoid blur, especially if you use a low shutter speed for better brightness. »
- Problème : « low shutter speed » (on dit « slow ») ; « for better brightness » calqué ; « blur » trop vague (camera shake).
- Retenu : « we recommend working with a tripod to avoid camera shake, especially if you use a slow shutter speed to get a brighter image. »

**EN-29** · § 1 de « Opt for a suitable background » · calque · mineur · ajout
- Actuel : « The objective is in fact not to distract attention from the product. »
- Retenu : « the goal is to keep attention on the product. »

**EN-30** · image 4, alt · mélange linguistique · **majeur** · revue
- Actuel : alt « Importance arrière plan photo produit » (`/images/blog/67d15a1ea67d40a54ffcc40b.avif`)
- Retenu : « The same wooden toy car photographed on a white, a gray, and a red background »

**EN-31** · § « An overly loaded » · structure · mineur · ajout
- Actuel : paragraphe ouvert par un caractère invisible et un `<br>` (comme FR-28).
- Retenu : paragraphe sans saut de ligne initial.

**EN-32** · même § · calque · mineur · revue
- Actuel : « An overly loaded or colored background may distract the customer's eye and hinder the presentation of your product. Likewise, a gray or black background can “crush” the product. »
- Retenu : « A busy or colorful background can distract the customer's eye and detract from your product. Likewise, a gray or black background can make the product look flat. »

**EN-33** · même §, segment 2 · faux sens métier · **majeur** · revue
- Actuel : « It will also be even easier to crop the image later in order to obtain a transparent background for other supports! »
- Problème : « détourer » traduit par « crop » (recadrer) ; « supports » au sens français.
- Retenu : « It will also make it easier to cut out the product later if you need a transparent background for other media! »

**EN-34** · § 1 de « Ensure the repeatability » · préposition manquante · mineur · revue
- Actuel : « it is essential to pay particular attention to repeatability and homogeneity shots. »
- Retenu : « it's essential to pay close attention to the repeatability and uniformity of your shots. » ; intertitre « Make your shots repeatable ».

**EN-35** · image 5, alt · mélange linguistique · **majeur** · revue
- Actuel : alt « Exemple placement de lumière studio photo » (`/images/blog/67d15a1ea67d40a54ffcc411.avif`)
- Retenu : « Top-down setup diagram: white background, product in the center, two lamps on either side, and the camera facing the product » [à vérifier sur l'image — 06, point 17].

**EN-36** · § « However, maintaining this consistency » · sens opaque · mineur · revue
- Actuel : « The logistics that surround the implementation of each product can quickly become restrictive and make it difficult to obtain an acceptable level of homogeneity. »
- Retenu : « Setting up each product can quickly become a burden and make it difficult to reach an acceptable level of uniformity. »

**EN-37** · § « That is why » · calque, renforcement · mineur · ajout (renforcement signalé dans les claims de la revue)
- Actuel : « draw a precise installation plan of your camera equipment […] to ensure that each shot is the same as the last. This rigor will avoid having to retouch each photo individually »
- Problème : « installation plan » calqué ; « the same as » plus fort que « semblable » ; « This rigor will avoid having to » sans sujet logique.
- Retenu : « drawing up a precise setup plan for your photo equipment […] to ensure that each shot is similar to the previous one. This rigor inevitably takes time up front, but it saves you from retouching every photo individually in post-production. »

**EN-38** · § « Note that if you use » · faux ami · mineur · ajout
- Actuel : « You'll also have a lot less photo equipment to take out and replace each time. »
- Problème : « replace » signifie « remplacer », pas « remettre en place ».
- Retenu : « You'll also have far less equipment to take out and set back up each time. » ; « totally trivial » → « child's play » (même force, 06, point 11).

**EN-39** · § 1 de « Use good post-production software » · nom indénombrable, calque · mineur · revue
- Actuel : « A powerful post-production software not only makes it possible to remove any imperfections »
- Retenu : « Powerful post-production software not only lets you remove any imperfections »

**EN-40** · § « With this in mind » · calque · mineur · ajout
- Actuel : « After all, this software is recognized for its ability to process high quality images »
- Retenu : « It is known for its ability to process high-quality images »

**EN-41** · § « However, the use of this type » · calque, illogisme · mineur · ajout
- Actuel : « However, the use of this type of photo software cannot be improvised. […] requires a certain amount of expertise that only an experienced user can acquire. »
- Problème : « cannot be improvised » calque « ne s'improvise pas » ; même illogisme que FR-38.
- Retenu : « However, this type of photo software isn't something you can pick up on the fly. […] requires a degree of expertise that only comes with experience. »

**EN-42** · H2 n° 2 · faux ami · mineur · revue
- Actuel : « How can an automated in-house photo studio be interesting for your business? »
- Problème : « intéressant » au sens d'« avantageux » ; « interesting » ne porte pas ce sens.
- Retenu : « How can an in-house automated photo studio benefit your business? »

**EN-43** · § d'ouverture du H2 n° 2 · calque · mineur · ajout
- Actuel : « can be extremely beneficial for businesses due to several key factors. »
- Retenu : « For a business, investing in an in-house automated photo studio can be extremely beneficial, for several reasons. »

**EN-44** · H3 « Homogeneity and standardization » · terme peu idiomatique · mineur · ajout
- Retenu : « Consistency and standardization »

**EN-45** · § 1 de ce H3 · calque · mineur · ajout
- Actuel : « First of all, the concept of flow is essential to fully understand: during the year, product shots are taken according to the calendar, inventory, marketing and others. »
- Retenu : « First, you need to understand the idea of flow: throughout the year, product shoots follow one after another, driven by the calendar, incoming stock, marketing needs, and more. »

**EN-46** · même § · traduction automatique · **majeur** · revue
- Actuel : « However, all photos should remain consistent and consistent to reflect a professional brand image. »
- Retenu : « Yet all photos must remain consistent and uniform to project a professional brand image. »

**EN-47** · image 6, alt · mélange linguistique · **majeur** · revue
- Actuel : alt « logiciel Orbitvu Station automatisation » (`/images/blog/67d15a1ea67d40a54ffcc3c9.avif`)
- Retenu : « Orbitvu Station software screenshots: image adjustments and studio lighting controls »

**EN-48** · § « And as we explained above » · répétition, fragment · mineur · ajout
- Actuel : « this requirement requires a lot of effort […]... Whereas an automated photo studio is designed to considerably simplify this notion of flow and homogeneity. »
- Retenu : « meeting this requirement takes a lot of effort […]. An automated photo studio, on the other hand, is designed to make it considerably simpler to manage this flow and keep images consistent. »

**EN-49** · § « In fact, thanks to » · traduction automatique · **majeur** · revue
- Actuel : « In fact, thanks to specialized photo equipment and fully controlled by a intuitive easy to use software, you can easily achieve consistent and consistent photo quality no matter the time of year. »
- Retenu : « With specialized photo equipment fully controlled by intuitive, easy-to-use software, you can easily achieve steady, consistent image quality, whatever the time of year. »

**EN-50** · image 7, alt · mélange linguistique · **majeur** · revue
- Actuel : alt « Gamme studios photo automatisés Orbitvu » (`/images/blog/67d15a1ea67d40a54ffcc41a.avif`)
- Retenu : « The Orbitvu range of automated photo studios, from the most compact to the largest »

**EN-51** · § « In addition, an automated photo studio » · calque · mineur · ajout
- Actuel : « In addition, an automated photo studio combines all photo equipment into a single system […] You are thus in a position to increase your productivity while ensuring superior photography quality. »
- Problème : même impropriété que FR-45 ; « You are thus in a position to » calque.
- Retenu : « What's more, an automated photo studio brings lighting, background, product positioning, 360-degree views, and post-production together in a single system. […] You can thus increase your productivity while guaranteeing superior image quality. » (force du FR « vous garantissant » rétablie, 06, point 11).

**EN-52** · § « An automated photo studio also allows » · typographie, calque · mineur · ajout
- Actuel : « it is therefore often possible to create 360 degree views, videos, and animations »
- Problème : « therefore » calque « ainsi » ; « 360-degree » prend un trait d'union en position d'adjectif.
- Retenu : « it is often possible to create 360-degree views, videos, and animations »

**EN-53** · image 8, alt · valeur réservée Webflow · **majeur** · revue (corrigée)
- Actuel : alt `__wf_reserved_decorative` (`/images/blog/67d15a1ea67d40a54ffcc3c6.avif`)
- Problème : comme FR-46 ; l'image n'est pas décorative.
- Retenu : « Compact camera next to a media selection menu: 2D, 360°, or video »

**EN-54** · § « Investing in an automated in-house photo studio » · traduction automatique · **majeur** · revue
- Actuel : « using an automated photo studio allows for professional, consistent, and consistent photos »
- Retenu : « it delivers professional, consistent, and uniform photos »

**EN-55** · même § · connecteur · mineur · ajout
- Actuel : « However, we will talk more about this in the following articles in this series. »
- Problème : « However » traduit le « toutefois » fautif du FR (FR-47).
- Retenu : « We'll come back to this in more detail in the next articles in this series. »

**EN-56** · H3 « The presentation », « The background », « The sharpness », « The details » · article calqué · mineur · ajout
- Problème : l'article défini calque « La présentation », « L'arrière-plan »… ; un intertitre anglais s'en passe.
- Retenu : « Presentation », « Background », « Sharpness », « Details ».

**EN-57** · § 1 de « The presentation » · calque · mineur · revue
- Actuel : « First of all, the presentation must be careful: it is important to take the time to properly arrange the product, to place it in an angle favorable to the light »
- Retenu : « First of all, presentation must be meticulous: take the time to arrange the product carefully, position it at an angle that works with the light »

**EN-58** · § 2 de « The presentation » · calque · mineur · ajout
- Actuel : « Spots or scratches on the object would in fact have a negative impact on the final image. »
- Retenu : « stains or scratches on the item would spoil the final image. »

**EN-59** · § de « The background » · ponctuation, faux sens · mineur · ajout
- Actuel : « Remember: we have no artistic pretensions here, the primary objective is to promote the product faithfully. »
- Problème : deux propositions soudées par une virgule ; « promote » (promouvoir) au lieu de « présenter ».
- Retenu : « Remember: we have no artistic ambitions here. The primary goal is to present the product faithfully. »

**EN-60** · image 9, alt · valeur réservée Webflow · **majeur** · revue
- Actuel : alt `__wf_reserved_inherit` (`/images/blog/67dbae71507d67953210f1b8.avif`)
- Retenu : « Packshot of white sunglasses on a black background, sharp from front to back »

**EN-61** · § « Finally, it is crucial » · faux sens, typographie · **majeur** · revue
- Actuel : « Finally, it is crucial to avoid vagueness over the entire product by using the technique of”Focus Stacking“. »
- Problème : « flou » traduit par « vagueness » ; guillemets inversés et collés ; majuscules artificielles.
- Retenu : « Finally, it's crucial to avoid blur anywhere on the product by using focus stacking. »

**EN-62** · même § · calques · mineur · ajout
- Actuel : « This technique consists of taking several photos by changing the focus point each time you take a shot, and then combining them to obtain a clear picture of the entire object. This way, the product is actually represented as it is, and all the sharpness is maintained. If this focus stacking technique is quite time-consuming with a traditional photo studio, know that it can be done automatically »
- Problème : « clear » (lisible) au lieu de « sharp » ; « actually represented as it is » et « know that » calqués.
- Retenu : « …and then combining them to get an image that is sharp across the entire object. The product is thus shown exactly as it is, with full sharpness. Focus stacking is fairly time-consuming with a traditional photo studio, but it can be done automatically with an automated photo studio. »

**EN-63** · § 1 de « The details » · calque · mineur · ajout
- Actuel : « To succeed in quality packshot photographs, you must therefore take care of every detail »
- Retenu : « Successful, high-quality packshots therefore come down to taking care of every detail »

**EN-64** · § 2 de « The details » et liste · calque · mineur · ajout
- Actuel : « There are still many other elements to take into account to take good packshot photographs that will really highlight your products, elements that we will see in the following articles: » ; ancre « How to adapt your photographs and settings according to the type of product and its specificities »
- Retenu : « Many other factors come into play when creating packshots that truly showcase your products. We'll cover them in the next articles: » ; ancre « How to adapt your photos and settings to the type of product and its specific features » (cibles inchangées).

**EN-65** · FAQ 2 · article, préposition · mineur · ajout
- Actuel : « The packshot focuses on the faithful representation […] while still life uses an artistic approach to brand communication. »
- Retenu : « Packshot photography focuses on representing the product faithfully […] while still life takes an artistic approach in service of brand communication. »

**EN-66** · FAQ 3 · calque, ponctuation · mineur · ajout
- Actuel : « Using the same photos as your competitors is detrimental to your differentiation. […] improve the trust of customers who see exactly what they are buying. »
- Retenu : « Using the same photos as your competitors undermines your differentiation. […] strengthen your brand identity and your customers' trust: they see exactly what they are buying. »

**EN-67** · FAQ 4 · calque, numération · mineur · ajout
- Actuel : « two to three views […] one to two detailed views […] a 360 view […] to give a complete vision of the product »
- Retenu : « two or three views […] one or two detail views […] a 360-degree view […] to give a complete view of the product »

**EN-68** · FAQ 5 · typographie, répétition · mineur · ajout
- Actuel : « A macro lens in the 85mm-105mm range […] a professional-quality zoom lens like a 24-70mm lens »
- Retenu : « A macro lens in the 85–105mm range […] a professional-quality zoom such as a 24–70mm »

### Transversales EN

**EN-T1** · tout l'article · connecteurs calqués · mineur · ajout
- Actuel : « Indeed » 3 fois, « in fact » 6 fois, « therefore » 7 fois, en majorité sans valeur logique : rendu mécanique des « en effet » et « ainsi » du FR (FR-T2).
- Retenu : supprimés par la retraduction.

**EN-T2** · tout l'article · terminologie flottante · mineur · ajout
- Actuel : « photo equipment » 9 fois, « camera equipment » 5 fois, « camera gear » 1 fois, pour un même référent (le matériel photo).
- Retenu : « photo equipment » pour le matériel en général, « camera » pour l'appareil seul ; « packshot photography equipment » dans l'intertitre principal.

### Observation hors texte EN

- **EN-O1** · même remarque que FR-O2 (illustration de la netteté sur fond noir).
