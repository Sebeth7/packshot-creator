# Anomalies annotées — famille 670e262cabb4626493da23e4

Base : `01-TEXTE_ACTUEL.md` (texte servi sur `main` `17fc0b3`, 01/10/2026) et HTML des JSON `content/blog/fr/comment-avoir-meilleure-photo-produit-e-commerce.json` et `content/blog/en/how-to-e-commerce-product-photography.json`. Revue de départ : `reviews/670e262cabb4626493da23e4.json` (13 erreurs FR, 36 erreurs EN détaillées, 8 claims).

Chaque anomalie de la revue a été vérifiée contre le texte servi et le HTML : toutes sont confirmées, sauf une remarque de structure rectifiée (voir « Rectifications de la revue »). Les entrées marquées « (revue) » viennent de la revue ; les autres ont été ajoutées à la relecture.

- « Actuel » : extrait mot pour mot du texte servi (gras retiré).
- « Retenu » : forme reprise dans `04-PROPOSITION_FR.md` ou `04-PROPOSITION_EN.md`.
- Gravité : bloquant (incompréhensible ou faux pour le lecteur) ; majeur (faute visible, traduction automatique manifeste, alt inutilisable) ; mineur (correction locale de langue, de style ou de typographie).

Totaux : FR 57 entrées (2 majeures, 55 mineures), dont 22 issues de la revue et 35 ajoutées ; EN 73 entrées (1 bloquante, 25 majeures, 47 mineures), dont 30 issues de la revue et 43 ajoutées. Certaines entrées groupées de la revue sont ici scindées par emplacement (les deux valeurs `__wf_reserved_*`, les quatre alts français de la version EN, les mots collés « tooptimize » et « touse »).

---

## FR — /fr/blog/comment-avoir-meilleure-photo-produit-e-commerce

### Métadonnées

**FR-01** · title · claim / SEO · mineur (revue, claims)
- Actuel : « Les 10 astuces infaillibles pour créer une photo de produit vendeuse ! »
- Explication : superlatif « infaillibles » sans fondement (aucune astuce n'est infaillible) ; 70 caractères ; « photo de produit » alors que la requête principale est « photo produit e-commerce ». Ce champ alimente les cartes du blog et le `headline` du schema Article.
- Retenu : « 10 astuces pour créer une photo produit e-commerce vendeuse » (claim retiré, signalé dans `06`).

**FR-02** · h1 · claim · mineur (revue, claims)
- Actuel : « Photo produit e-commerce : les 10 astuces infaillibles »
- Explication : même superlatif ; le corps parle de « conseils éprouvés » et d'« astuces », pas de méthode infaillible. Le H1 sert aussi d'alt à l'image principale.
- Retenu : « Photo produit e-commerce : 10 astuces pour réussir vos visuels » (signalé dans `06`).

**FR-03** · metaTitle · SEO / style · mineur
- Actuel : « Photo produit e-commerce : 10 astuces pour une photo efficace ! »
- Explication : 63 caractères (cible ≤ 60) ; « photo » répété ; point d'exclamation inutile dans une balise title.
- Retenu : « Photo produit e-commerce : 10 astuces pour vendre en ligne » (58 caractères ; détail dans `05`).

**FR-04** · description · SEO · mineur
- Actuel : « Découvrez nos 10 astuces pour créer une meilleure photo produit e-commerce. Optimisez votre catalogue et boostez vos ventes en ligne ! »
- Explication : 134 caractères (cible 140-155) ; n'annonce pas le contenu réel (angles, détails, lifestyle, dimensions, poids des images, SEO).
- Retenu : voir `05` (155 caractères).

### Transversal

**FR-05** · 12 paragraphes vides · technique / structure · mineur
- Actuel : « (paragraphe vide) » ×12, avant et après chacune des six images (`<p>` contenant un caractère ZWJ hérité de Webflow).
- Explication : artefact de l'éditeur Webflow, sans contenu ; crée des espacements irréguliers.
- Retenu : non reproduits dans la proposition (l'espacement relève de la feuille de style ; point de contrôle visuel dans `06`).

**FR-06** · apostrophes · typographie · mineur
- Actuel : alternance de l'apostrophe typographique (« d’expérience », « n’est », « l’attention », « l’éclairage », « C’est », « N’oubliez ») et de l'apostrophe droite (toutes les autres).
- Explication : incohérence héritée de Webflow.
- Retenu : apostrophe droite partout, comme dans la quasi-totalité du site.

**FR-07** · ponctuation haute · typographie · mineur
- Actuel : espaces ordinaires avant « : », « ? », « ! » (par exemple « de votre site ? », « Pour faire court : »).
- Explication : la typographie française demande une espace insécable, sinon le signe peut passer seul en début de ligne.
- Retenu : espaces insécables avant « : ; ? ! » et à l'intérieur des guillemets « ».

### Corps — point 1

**FR-08** · paragraphe · style · mineur
- Actuel : « que ce soit dans le secteur du mobilier ou autre »
- Explication : « ou autre » ne se rattache à rien (il faudrait « ou dans un autre secteur »).
- Retenu : « que ce soit dans le secteur du mobilier ou ailleurs »

**FR-09** · paragraphe · syntaxe · mineur
- Actuel : « il est primordial de respecter les bonnes pratiques de la photographie packshot, dont voici quelques-uns des grands principes : »
- Explication : « dont » renvoie aux « bonnes pratiques » mais annonce des « principes » ; la phrase se lit mal et a produit le calque anglais « including here are » (EN-14).
- Retenu : « il est primordial de respecter les bonnes pratiques de la photographie packshot. Voici quelques-uns de ses grands principes : »

**FR-10** · paragraphe · grammaire (accord) · mineur (revue)
- Actuel : « une série d'articles que nous avons écrit à l'attention des débutants »
- Explication : participe passé avec avoir, COD « que » placé avant : accord obligatoire.
- Retenu : « une série d'articles que nous avons écrits »

**FR-11** · paragraphe · terminologie / registre · mineur
- Actuel : « à l'attention des débutants et des moins débutants »
- Explication : « à l'attention de » s'emploie pour un destinataire de courrier ; pour un public visé, « à l'intention de ». « Les moins débutants » est familier.
- Retenu : « à l'intention des débutants comme des photographes plus confirmés »

### Corps — point 2

**FR-12** · intertitre · structure · mineur
- Actuel : « 2. Minimum 2 ou 3 images par produit »
- Explication : seul intertitre nominal, alors que les autres sont à l'impératif (Respectez, N'oubliez pas, Zoomez, Montrez…).
- Retenu : « 2. Prévoyez au moins 2 ou 3 images par produit »

**FR-13** · paragraphe · syntaxe (connecteur) · mineur
- Actuel : « Pour ce faire, il est recommandé d'avoir au minimum deux ou trois images par produit. »
- Explication : « Pour ce faire » annonce le moyen d'une action, or la phrase précédente n'exprime aucune action (« Les acheteurs en ligne ont besoin d'informations… ») ; le lien logique est une conséquence.
- Retenu : « C'est pourquoi il est recommandé de proposer au moins deux ou trois images par produit. »

### Corps — point 3

**FR-14** · paragraphe · grammaire (préposition) · mineur
- Actuel : « peut également apporter une réelle plus-value sur votre fiche produit ! »
- Explication : on apporte une plus-value « à » quelque chose.
- Retenu : « peut également apporter une réelle plus-value à votre fiche produit ! »

### Corps — point 4

**FR-15** · alt de l'image `67d18f947ba281b286aa3c6e.avif` · alt · mineur (revue)
- Actuel : « zoom produit qualitatif  » (avec espace finale)
- Explication : texte vague qui ne décrit pas l'image (vue rapprochée d'un sac jaune en cuir effet croco) ; espace parasite.
- Retenu : « Vue rapprochée d'un sac en cuir jaune effet croco : grain du cuir et coutures » (`05`).

**FR-16** · paragraphe · style · mineur
- Actuel : « Certains produits, en particulier ceux avec des détails complexes, nécessitent davantage de travail »
- Explication : « ceux avec » est un tour oral.
- Retenu : « Certains produits, en particulier ceux qui présentent des détails complexes, demandent davantage de travail »

**FR-17** · paragraphe · syntaxe · mineur
- Actuel : « comme pour montrer de plus près le tissu d'un vêtement ou les gravures délicates d'un pendentif »
- Explication : « comme pour » suggère une comparaison ; le sens est « par exemple pour ». C'est ce tour qui a produit « as if to show » en anglais (EN-25).
- Retenu : « par exemple pour montrer de plus près le tissu d'un vêtement ou les gravures délicates d'un pendentif »

**FR-18** · paragraphe · grammaire (gérondif) · mineur
- Actuel : « Par exemple, en montrant les coutures d'un vêtement, les clients peuvent constater que le produit est bien construit et durable. »
- Explication : le gérondif « en montrant » a pour sujet implicite le vendeur, pas « les clients » : construction fautive.
- Retenu : « Par exemple, en montrant les coutures d'un vêtement, vous permettez aux clients de constater que le produit est bien construit et durable. »

**FR-19** · paragraphe · style · mineur
- Actuel : « Cela peut justifier un prix plus élevé et convaincre les clients que cela en vaut la peine. »
- Explication : « cela… cela » dans la même phrase, avec deux référents différents.
- Retenu : « Cela peut justifier un prix plus élevé et convaincre les clients que le produit vaut son prix. »

### Corps — point 5

**FR-20** · intertitre · structure · mineur (revue)
- Actuel : « 5. Incorporer une ou plusieurs photos lifestyle »
- Explication : infinitif au milieu d'intertitres à l'impératif.
- Retenu : « 5. Incorporez une ou plusieurs photos lifestyle »

**FR-21** · alt de l'image `678915240464b5b6eb2a0050.avif` · alt / accord · mineur (revue)
- Actuel : « Photo lifestyle mobilier réalisé avec studio packshot »
- Explication : « réalisée » (accord avec « photo ») ; article manquant ; ne dit pas ce que montre l'image (une femme assise sur un canapé, sur le plateau d'un grand studio).
- Retenu : « Photo lifestyle de mobilier réalisée en studio packshot : une femme assise sur un canapé » (`05`).

**FR-22** · paragraphe · style · mineur
- Actuel : « vos clients peuvent ainsi visualiser comment leur vie sera une fois qu'ils auront acheté le produit. Cela les aide à se projeter et à considérer le produit comme faisant déjà partie de leur vie quotidienne. »
- Explication : « comment leur vie sera » est maladroit ; « vie » revient deux fois.
- Retenu : « vos clients peuvent ainsi visualiser à quoi ressemblera leur vie une fois le produit acheté. Cela les aide à se projeter et à considérer le produit comme faisant déjà partie de leur quotidien. »

**FR-23** · paragraphe · terminologie · mineur
- Actuel : « L'exposition de votre produit dans un contexte réel vous permet également de mettre en avant ses fonctionnalités et avantages. »
- Explication : « exposition » est ambigu (exposition photographique, exposition au public) ; c'est lui qui a produit « Exposing your product » en anglais (EN-31).
- Retenu : « Montrer votre produit en situation réelle vous permet également de mettre en avant ses fonctionnalités et avantages. »

### Corps — point 6

**FR-24** · paragraphe · syntaxe (parallélisme) · mineur
- Actuel : « réaliser un tutoriel sous forme de schéma ou d'un montage d'images à intégrer directement à votre fiche produit »
- Explication : coordination déséquilibrée (« de schéma » / « d'un montage »).
- Retenu : « réaliser un tutoriel sous forme de schéma ou de montage d'images, à intégrer directement à votre fiche produit »

**FR-25** · paragraphes des points 6, 7 et 8 · technique / structure · mineur
- Actuel : un seul `<p>` coupé par `<br><br>` (« …votre fiche produit. ⏎ ⏎ En montrant… », « …qu'en image. ⏎ ⏎ C'est pourquoi… », « …nuire à votre entreprise. ⏎ ⏎ Il s'agit pourtant… »).
- Explication : deux paragraphes simulés par des sauts de ligne, hérités de Webflow.
- Retenu : deux paragraphes distincts à chaque fois.

**FR-26** · paragraphe · grammaire (accord du pronom) · mineur
- Actuel : « vous allez offrir une expérience d'achat optimale à votre clientèle, les rassurer et augmenter vos chances de vendre »
- Explication : « les » reprend « votre clientèle », nom singulier.
- Retenu : « vous offrez à vos clients une expérience d'achat optimale, vous les rassurez et vous augmentez vos chances de vendre »

### Corps — point 7

**FR-27** · intertitre · syntaxe · mineur (revue)
- Actuel : « 7. Informez sur les dimensions de votre produit »
- Explication : « informer » appelle un complément de personne (« informez vos clients sur… »).
- Retenu : « 7. Indiquez les dimensions de votre produit »

**FR-28** · paragraphe · syntaxe / style · mineur
- Actuel : « on peut s'imaginer un produit plus grand ou plus petit qu'il n'est réellement par exemple, et ce, sans que les intentions du vendeur ne soient trompeuses à l'origine. »
- Explication : « par exemple » rejeté en fin de proposition ; « qu'il ne l'est » attendu ; « trompeuse » / « trompeuses » à une ligne d'écart ; « ne » explétif après « sans que », déconseillé.
- Retenu : « on peut par exemple s'imaginer un produit plus grand ou plus petit qu'il ne l'est réellement, sans que le vendeur ait cherché à induire qui que ce soit en erreur. »

**FR-29** · paragraphe · claim · mineur (revue, claims)
- Actuel : « Donner ce type d'indications claires à vos clients vous évitera par ailleurs bien des retours et réclamations. »
- Explication : promesse au futur certain, sans source.
- Retenu : « Donner ce type d'indications claires à vos clients peut par ailleurs vous éviter bien des retours et réclamations. » (`06`)

### Corps — point 8

**FR-30** · alt de l'image `67dbae73b8c0e26556f4e203.avif` · alt · majeur (revue)
- Actuel : « __wf_reserved_decorative »
- Explication : valeur technique Webflow lue telle quelle par les lecteurs d'écran ; l'image n'est pas décorative : c'est une capture de la page d'accueil de TinyPNG, l'outil cité dans le paragraphe.
- Retenu : « Page d'accueil de TinyPNG, outil en ligne de compression d'images » (`05`).

**FR-31** · paragraphe · ponctuation · mineur
- Actuel : « Il s'agit pourtant d'un problème que l'on peut aisément régler, il suffit bien souvent d'optimiser »
- Explication : la seconde proposition explique la première : deux-points plutôt que virgule.
- Retenu : « Il s'agit pourtant d'un problème que l'on peut aisément régler : il suffit bien souvent d'optimiser »

**FR-32** · paragraphe · terminologie · mineur
- Actuel : « En réduisant la taille de ces fichiers »
- Explication : « taille » est ambigu dans un point qui traite aussi des dimensions en pixels ; pour un fichier, on parle de poids.
- Retenu : « En réduisant le poids de ces fichiers »

**FR-33** · paragraphe · grammaire (préposition) · mineur
- Actuel : « économiser de l'espace de stockage pour votre hébergeur »
- Explication : l'espace est économisé chez l'hébergeur, pas pour lui.
- Retenu : « économiser de l'espace de stockage chez votre hébergeur »

**FR-34** · paragraphe · information datée / claim · mineur (revue)
- Actuel : « Le format JPEG est le format d'image le plus couramment utilisé sur le web car il offre une bonne qualité d'image tout en étant facile à compresser. »
- Explication : affirmation absolue non sourcée ; ne mentionne ni WebP ni AVIF (le site sert lui-même ses images en AVIF). Aucun fait nouveau n'est ajouté ici.
- Retenu : « Le format JPEG est l'un des formats d'image les plus utilisés sur le web, car il offre une bonne qualité d'image tout en étant facile à compresser. » (mise à jour éventuelle dans `06`)

**FR-35** · paragraphe · grammaire / redondance · mineur
- Actuel : « Vous pouvez par ailleurs optimiser vos photos de produit pour votre e-commerce directement sur un logiciel de retouche comme Photoshop, ou vous pouvez également utiliser des outils en ligne gratuits »
- Explication : on travaille « dans » un logiciel ; « pour votre e-commerce » et « vous pouvez également » sont redondants.
- Retenu : « Vous pouvez par ailleurs optimiser vos photos de produit directement dans un logiciel de retouche comme Photoshop, ou utiliser des outils en ligne gratuits »

**FR-36** · paragraphe · grammaire · mineur
- Actuel : « Une image trop grande prendra plus de temps à charger qu'une image ayant la bonne taille. »
- Explication : c'est l'image qui se charge (pronominal) ; « ayant la bonne taille » est lourd.
- Retenu : « Une image trop grande mettra plus de temps à se charger qu'une image à la bonne taille. »

### Corps — point 9

**FR-37** · intertitre · structure · mineur
- Actuel : « 9. Mettez-les à profit pour booster votre référencement naturel (SEO) »
- Explication : « les » n'a pas d'antécédent dans l'intertitre lui-même, qui est lu isolément dans le sommaire de l'article.
- Retenu : « 9. Mettez vos photos à profit pour booster votre référencement naturel (SEO) »

**FR-38** · paragraphe · registre / redondance · mineur
- Actuel : « peut aussi vous aider à ramener plus de clients sur votre site, et ce, grâce au référencement naturel ou SEO (Search Engine Optimization) en anglais. En effet, vos images peuvent également avoir un impact significatif »
- Explication : « ramener » est familier ; « aussi… également » à une phrase d'écart.
- Retenu : « peut aussi vous aider à attirer davantage de clients sur votre site, grâce au référencement naturel, ou SEO (Search Engine Optimization) en anglais. En effet, vos images peuvent avoir un impact significatif »

**FR-39** · paragraphe · typographie · mineur
- Actuel : « de votre site.Voici comment mettre vos photos de produit à profit »
- Explication : espace absente dans le HTML (`site.<strong>Voici`) : les deux phrases sont collées à l'écran. La revue l'avait relevé en EN seulement.
- Retenu : « de votre site. Voici comment mettre vos photos de produit à profit »

**FR-40** · liste · ponctuation · mineur
- Actuel : « Renommez vos images de manière descriptive, cela facilitera également leur indexation »
- Explication : deux propositions indépendantes séparées par une virgule.
- Retenu : « Renommez vos images de manière descriptive : cela facilitera également leur indexation »

**FR-41** · liste · terminologie · mineur (revue)
- Actuel : « Téléchargez une sitemap de vos images pour permettre aux moteurs de recherche de les trouver facilement »
- Explication : « télécharger » se lit comme « download » (d'où le contresens anglais, EN-52) ; un sitemap se soumet aux moteurs ; le mot est usuellement masculin. La fin de phrase « vous permettent de le faire facilement » est ajustée pour ne pas prêter aux plugins une soumission qu'ils ne font pas eux-mêmes.
- Retenu : « Soumettez un sitemap de vos images aux moteurs de recherche pour leur permettre de les trouver facilement […] (de nombreux plugins SEO pour WordPress, comme Yoast SEO ou Rank Math SEO, facilitent cette étape) »

**FR-42** · liste · appellation · mineur (revue)
- Actuel : « de nombreux plugins SEO sur Wordpress, comme YoastSEO ou Rank Math SEO »
- Explication : graphies officielles « WordPress » et « Yoast SEO » ; un plugin est « pour » WordPress. Liens inchangés (fr.wordpress.org, cohérent pour la version FR).
- Retenu : « de nombreux plugins SEO pour WordPress, comme Yoast SEO ou Rank Math SEO »

**FR-43** · liste · claim · mineur
- Actuel : « (la vitesse de chargement de vos pages est un facteur crucial pour Google !) »
- Explication : « crucial » surestime le poids de la vitesse parmi les critères de classement ; affirmation non sourcée.
- Retenu : « (la vitesse de chargement de vos pages est un facteur important pour Google !) » (`06`)

### Corps — point 10

**FR-44** · alt de l'image `67dd85edd8fd350b34495f9a.avif` · alt · majeur (revue)
- Actuel : « __wf_reserved_inherit »
- Explication : valeur technique Webflow. L'image montre une gamme de studios photo automatisés Orbitvu, du plus petit au plus grand, sur fond noir.
- Retenu : « Studios photo automatisés Orbitvu de différentes tailles, alignés du plus compact au plus grand » (`05`).

**FR-45** · paragraphe · style · mineur
- Actuel : « Vous avez au grand minimum besoin d'un bon appareil photo et d'un éclairage de qualité avec un fond blanc neutre. »
- Explication : « au grand minimum » est familier ; construction lourde.
- Retenu : « Il vous faut au minimum un bon appareil photo et un éclairage de qualité, avec un fond blanc neutre. »

**FR-46** · paragraphe · claim · mineur (revue, claims)
- Actuel : « Ce type de studio vous garantit un standard de qualité extrêmement élevé, le tout avec une facilité déconcertante. »
- Explication : garantie de résultat sans source ; « standard de qualité » est un calque de l'anglais.
- Retenu : « Ce type de studio vous permet d'atteindre un niveau de qualité très élevé, avec une grande facilité d'utilisation. » (`06`)

**FR-47** · paragraphe · claim · mineur (revue, claims)
- Actuel : « vous pouvez produire des photos de produits e-commerce de qualité professionnelle en quelques minutes seulement »
- Explication : promesse de délai sans source. Conservée telle quelle (aucun chiffre à adoucir sans trahir le sens).
- Retenu : inchangé ; décision dans `06`.

**FR-48** · paragraphe · terminologie · mineur
- Actuel : « rendre la prise de photo facile, rapide et accessible à tout le monde »
- Explication : le terme du métier est « prise de vue ».
- Retenu : « rendre la prise de vue facile, rapide et accessible à tout le monde »

**FR-49** · paragraphe · grammaire (accord) · mineur (revue)
- Actuel : « des images optimisées et prête à publier sur votre site e-commerce »
- Explication : « prêtes » s'accorde avec « images ».
- Retenu : « des images optimisées et prêtes à publier sur votre site e-commerce »

**FR-50** · paragraphe · lien · mineur (revue)
- Actuel : « n'hésitez pas à consulter notre guide plus poussé sur la photographie packshot »
- Explication : le guide est annoncé mais pas lié (idem en EN).
- Retenu : lien ajouté vers `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`, la cible déjà utilisée au point 1 (maillage : décision dans `06`).

**FR-51** · paragraphe · grammaire (infinitif) · mineur (revue)
- Actuel : « ou à nous contactez si vous souhaitez aller plus loin ! »
- Explication : infinitif attendu après « à ».
- Retenu : « ou à nous contacter si vous souhaitez aller plus loin ! »

### FAQ

**FR-52** · ensemble de la FAQ · structure / positionnement · mineur (revue, remarques)
- Actuel : questions génériques (« Comment obtenir des photos vendeuses pour mon e-commerce ? ») auxquelles toutes les réponses répondent par Orbitvu.
- Explication : décalage entre la question et la réponse ; choix éditorial, pas faute de langue.
- Retenu : questions et orientation Orbitvu conservées ; décision dans `06`.

**FR-53** · réponse 1 · claim / terminologie · mineur
- Actuel : « Le système intègre un éclairage optimisé et des fonds parfaitement uniformes, essentiels pour des photos e-commerce impactantes. »
- Explication : « parfaitement » est absolu ; « impactant » est un anglicisme critiqué.
- Retenu : « Le système intègre un éclairage optimisé et des fonds d'une grande uniformité, essentiels pour des photos e-commerce percutantes. » (`06`)

**FR-54** · réponse 2 · claim · mineur (revue, claims)
- Actuel : « Le logiciel Orbitvu Station automatise la post-production pour garantir des photos de haute qualité : détourage parfait, couleurs fidèles et netteté optimale. »
- Explication : garantie et « détourage parfait » sans source.
- Retenu : « Le logiciel Orbitvu Station automatise la post-production pour obtenir des photos de haute qualité : détourage précis, couleurs fidèles et netteté optimale. » (`06`)

**FR-55** · réponse 3 · typographie / claim · mineur (revue)
- Actuel : « La fonction "image fantôme" garantit un positionnement cohérent pour une présentation professionnelle. »
- Explication : guillemets droits anglais ; « garantit » est un claim.
- Retenu : « La fonction « image fantôme » facilite un positionnement cohérent des produits, pour une présentation professionnelle. » (`06`)

**FR-56** · réponse 4 · référent / claim · mineur
- Actuel : « Le logiciel permet de sauvegarder des configurations complètes (éclairage, cadrage, post-production) pour chaque type de produit. Cette standardisation assure une qualité professionnelle constante, même avec différents opérateurs. »
- Explication : « Le logiciel » n'a pas de référent quand la réponse est lue seule (extraits de FAQ, données structurées) ; « assure » est un claim.
- Retenu : « Le logiciel des studios Orbitvu permet de sauvegarder des configurations complètes (éclairage, cadrage, post-production) pour chaque type de produit. Cette standardisation aide à maintenir une qualité professionnelle constante, même avec différents opérateurs. » (`06`)

**FR-57** · réponse 5 · claim (fonctionnalité) · mineur (revue, claims)
- Actuel : « Les studios automatisés Orbitvu intègrent des paramètres préconfigurés pour les principales plateformes e-commerce. »
- Explication : fonctionnalité produit à confirmer.
- Retenu : inchangé ; vérification dans `06`.

---

## EN — /en/blog/how-to-e-commerce-product-photography

La version EN est retraduite intégralement depuis la proposition FR. Les entrées ci-dessous documentent l'état actuel ; la colonne « Retenu » renvoie à la nouvelle traduction.

### Métadonnées

**EN-01** · title · claim / style · mineur
- Actuel : « E-commerce product photography: 10 foolproof tips for creating a great-selling product photo! »
- Explication : « foolproof » (calque d'« infaillibles ») ; « great-selling » n'est pas idiomatique ; 93 caractères ; « product photo(graphy) » répété.
- Retenu : « Product photography for e-commerce: 10 tips for photos that sell » (`05`, `06`).

**EN-02** · h1 · claim · mineur
- Actuel : « E-commerce product photography: 10 foolproof tips »
- Explication : même superlatif que le FR.
- Retenu : « E-commerce product photography: 10 tips for better visuals »

**EN-03** · metaTitle · SEO / style · mineur
- Actuel : « E-commerce product photo: 10 tips for an effective photo! »
- Explication : « photo » répété ; ne contient pas « product photography », terme de toutes les requêtes EN de la page.
- Retenu : « E-commerce product photography: 10 tips for photos that sell » (60 caractères).

**EN-04** · description · claim renforcé · mineur (revue)
- Actuel : « 10 foolproof e-commerce product photography tips for creating the best-selling e-commerce product photo and boosting your online sales! »
- Explication : « the best-selling » ajoute un superlatif absent du FR (« une meilleure photo ») ; « e-commerce product photo(graphy) » deux fois.
- Retenu : voir `05` (144 caractères).

### Transversal

**EN-05** · 12 paragraphes vides · technique · mineur
- Actuel : « (paragraphe vide) » ×12 autour des six images.
- Explication : artefact Webflow (ZWJ), comme en FR (FR-05).
- Retenu : non reproduits.

**EN-06** · points 6, 7 et 8 · technique · mineur
- Actuel : `<br><br>` dans un seul `<p>` (« …into your product sheet. ⏎ ⏎ By showing… », etc.).
- Explication : comme FR-25.
- Retenu : paragraphes distincts.

**EN-07** · majuscules en milieu de phrase · traduction automatique · majeur
- Actuel : « One Well thought-out », « It is recommended », « our Complete guide », « The lighting With », « Another idea… Is of Show… How does », « We can imagine », « the Image alt tag », « Descriptively », « a Sitemap », « Last but not least: The quality », « our A more in-depth guide », « at Contact us ».
- Explication : capitales héritées du découpage des segments en gras par l'outil de traduction ; détaillées entrée par entrée ci-dessous.
- Retenu : casse normale partout.

**EN-08** · « thus » · calque · mineur
- Actuel : « and thus boost your sales », « can thus visualize », « and thus increase your chances of ranking », « and thus increase your conversion rate », « thus optimizing your online upload process ».
- Explication : traduction systématique de « ainsi », lourde en anglais.
- Retenu : supprimé ou remplacé (« in turn », « streamlining »…).

### Chapeau

**EN-09** · paragraphe 1 · incompréhensible · bloquant (revue)
- Actuel : « You are looking to increase sales of your site? La quality of your visuals can play a decisive role. One Well thought-out product photo does not just present an article: she returns it desirable, clear and incurring. »
- Explication : première phrase de l'article : déterminant français « La », « One » pour « Une », « she returns it » (contresens sur « elle le rend »), « incurring » pour « engageant ».
- Retenu : « Looking to increase sales on your website? The quality of your visuals can play a decisive role. A well-thought-out product photo does more than present an item: it makes it desirable, clear and engaging. »

**EN-10** · paragraphe 2 · traduction automatique · majeur (revue)
- Actuel : « Here it is 10 proven tips to improve your e-commerce visuals »
- Explication : calque de « Voici ».
- Retenu : « Here are 10 proven tips to improve your product photography for e-commerce » (reprend la requête « product photography for ecommerce »).

### Point 1

**EN-11** · intertitre · calque · mineur
- Actuel : « 1. Respect the main principles of packshot photography in your e-commerce product photos »
- Explication : « respect » pour « respecter des principes » ; l'anglais dit « follow ».
- Retenu : « 1. Follow the core principles of packshot photography in your e-commerce product photos »

**EN-12** · alt de l'image `67dbae73b8c0e26556f4e206.avif` · mélange linguistique · majeur (revue)
- Actuel : « photo produit e-commerce d'un fauteuil »
- Explication : alt en français dans la page anglaise.
- Retenu : « E-commerce product photo of a yellow armchair on a white background »

**EN-13** · paragraphe · syntaxe · mineur
- Actuel : « whether in the furniture sector or other »
- Explication : « or other » est agrammatical ; « industry » est plus usuel que « sector » en anglais américain.
- Retenu : « whether in the furniture industry or elsewhere » (même lien `/en/industrie/mobilier-decoration`).

**EN-14** · paragraphe · traduction automatique · majeur (revue)
- Actuel : « it is essential to respect the best practices of packshot photography, including here are some of the main principles: »
- Explication : calque de « dont voici » ; phrase agrammaticale.
- Retenu : « it is essential to follow the best practices of packshot photography. Here are some of its core principles: »

**EN-15** · liste · traduction automatique · majeur
- Actuel : « Represent faithfully the product, without useless contrivances »
- Explication : ordre des mots français ; « useless contrivances » ne veut rien dire ici.
- Retenu : « Show the product accurately, without unnecessary embellishment »

**EN-16** · liste · typographie / calque · mineur
- Actuel : « Avoid deceptive retouching : a customer disappointed in reality is not a loyal customer »
- Explication : espace avant les deux-points (typographie française) ; « disappointed in reality » est un calque.
- Retenu : « Avoid misleading retouching: a customer who is disappointed by the real thing is not a loyal customer »

**EN-17** · liste · traduction automatique · majeur (revue)
- Actuel : « mastering The lighting With a neutral color temperature to guarantee a faithful return »
- Explication : majuscules parasites, gérondif au lieu de l'impératif, « restitution » rendu par « return ».
- Retenu : « Control the lighting with a neutral color temperature to ensure accurate color rendering »

**EN-18** · paragraphe · calque / casse · mineur
- Actuel : « If you want to know more, we invite you to read our Complete guide to packshot photography »
- Explication : « we invite you » calque « nous vous invitons » ; capitale à « Complete ».
- Retenu : « If you want to learn more, read our complete guide to packshot photography »

**EN-19** · paragraphe · calque · mineur (revue)
- Actuel : « a series of articles that we have written for beginners and less beginners »
- Explication : calque de « les débutants et les moins débutants ».
- Retenu : « a series of articles we wrote for beginners and more experienced photographers alike »

### Point 2

**EN-20** · intertitre · structure · mineur
- Actuel : « 2. Minimum 2 or 3 images per product »
- Explication : suit la correction FR-12 (intertitre à l'impératif).
- Retenu : « 2. Use at least 2 or 3 images per product »

**EN-21** · paragraphe · syntaxe / casse · mineur
- Actuel : « To do this, It is recommended to have at least two or three images per product. »
- Explication : connecteur illogique (FR-13) ; capitale à « It ».
- Retenu : « That is why it is recommended to provide at least two or three images per product. »

### Point 3

**EN-22** · alt de l'image `67dbae73b8c0e26556f4e1fe.avif` · mélange linguistique · majeur (revue)
- Actuel : « un fauteuil jaune présenté sous différents angles »
- Explication : alt en français.
- Retenu : « Yellow armchair shown from three different angles »

**EN-23** · paragraphe · traduction automatique · majeur (revue)
- Actuel : « One 360 degree animation can also bring real added value to your product sheet! »
- Explication : « One » pour « Une » ; « product sheet » calque « fiche produit » (l'anglais dit « product page ») ; trait d'union manquant à « 360-degree ».
- Retenu : « A 360-degree animation can also add real value to your product page! » (même lien `/en/studios-photo-automatises`).

### Point 4

**EN-24** · alt de l'image `67d18f947ba281b286aa3c6e.avif` · mélange linguistique · majeur (revue)
- Actuel : « zoom produit qualitatif  »
- Explication : alt en français, vague, avec espace finale.
- Retenu : « Close-up of a yellow croc-embossed leather bag: leather grain and stitching »

**EN-25** · paragraphe · calque / terminologie · mineur (revue)
- Actuel : « So do not hesitate to make close-up views of some details, as if to show more closely the fabric of a garment or the delicate carvings on a pendant. »
- Explication : « make views » ; « as if to » trahit « comme pour » (= par exemple) ; « gravures » se dit « engravings ».
- Retenu : « So don't hesitate to take close-ups of certain details, for example to show the fabric of a garment or the delicate engravings on a pendant up close. »

**EN-26** · paragraphe · ponctuation · mineur
- Actuel : « The more details you can show the better. »
- Explication : virgule attendue dans la structure « the more…, the better ».
- Retenu : « The more details you can show, the better. »

**EN-27** · paragraphe · syntaxe · mineur
- Actuel : « For example, by showing the stitching of a garment, customers can see that the product is well-constructed and durable. »
- Explication : participe mal rattaché (comme FR-18).
- Retenu : « For example, by showing the stitching on a garment, you let customers see that the product is well made and durable. »

### Point 5

**EN-28** · alt de l'image `678915240464b5b6eb2a0050.avif` · mélange linguistique · majeur (revue)
- Actuel : « Photo lifestyle mobilier réalisé avec studio packshot »
- Explication : alt en français, avec la faute d'accord du FR.
- Retenu : « Furniture lifestyle photo taken in a packshot studio: a woman sitting on a sofa »

**EN-29** · paragraphe · calque · mineur (revue)
- Actuel : « That's where the lifestyle photography intervenes. »
- Explication : article superflu ; « intervenes » calque « intervient ».
- Retenu : « That's where lifestyle photography comes in. »

**EN-30** · paragraphe · calque · mineur
- Actuel : « your customers can thus visualize how their lives will be once they have purchased the product. This helps them to project themselves »
- Explication : « how their lives will be » est maladroit ; « project themselves » calque « se projeter ».
- Retenu : « your customers can picture what their life will look like once they have bought the product. It helps them imagine owning it »

**EN-31** · paragraphe · calque · mineur
- Actuel : « Exposing your product in a real context also allows you to highlight its features and benefits. »
- Explication : calque de « L'exposition de votre produit » (FR-23).
- Retenu : « Showing your product in a real-life setting also lets you highlight its features and benefits. »

### Point 6

**EN-32** · intertitre · grammaire · mineur
- Actuel : « 6. Show how the product works or installs »
- Explication : « install » n'est pas intransitif en ce sens.
- Retenu : « 6. Show how the product works or how to install it »

**EN-33** · paragraphe · incompréhensible · majeur (revue)
- Actuel : « As an extension of lifestyle photographs, Another idea to incorporate into your e-commerce product photos Is of Show how the product is installed if it is not intuitive, or How does the product work afterwards. »
- Explication : calque de « est de montrer », majuscules parasites, interrogative insérée dans une affirmative.
- Retenu : « As an extension of lifestyle photos, another idea to build into your e-commerce product photos is to show how the product is installed if this is not intuitive, or how the product works afterwards. »

**EN-34** · paragraphe · calque · mineur
- Actuel : « It is in fact completely possible to create a tutorial in the form of a diagram or an image montage to be integrated directly into your product sheet. »
- Explication : « in fact », « to be integrated », « product sheet » : calques.
- Retenu : « It is entirely possible to create a tutorial in the form of a diagram or an image sequence and add it directly to your product page. »

### Point 7

**EN-35** · intertitre · calque · mineur
- Actuel : « 7. Inform about the dimensions of your product »
- Explication : « inform » sans complément de personne (calque de FR-27).
- Retenu : « 7. Make your product's dimensions clear »

**EN-36** · paragraphe · syntaxe / casse · mineur
- Actuel : « On the internet, our perception can quickly be misleading: We can imagine a product bigger or smaller than it really is for example, without the seller's intentions being initially misleading. »
- Explication : capitale après deux-points, « for example » mal placé, fin de phrase confuse.
- Retenu : « Online, our perception can easily be misleading: we may, for example, imagine a product to be bigger or smaller than it really is, without the seller ever meaning to mislead anyone. »

**EN-37** · liste · calque · mineur
- Actuel : « thanks to a diagram representing its exact dimensions »
- Explication : « thanks to » calque « grâce à ».
- Retenu : « with a diagram showing its exact dimensions »

**EN-38** · paragraphe · claim / syntaxe · mineur
- Actuel : « Giving this type of clear information to your customers will also avoid a lot of returns and complaints. »
- Explication : promesse au futur certain (FR-29) ; « avoid » n'a pas le bon sujet.
- Retenu : « Giving your customers this kind of clear information can also save you a lot of returns and complaints. »

### Point 8

**EN-39** · alt de l'image `67dbae73b8c0e26556f4e203.avif` · alt · majeur (revue)
- Actuel : « __wf_reserved_decorative »
- Explication : comme FR-30.
- Retenu : « TinyPNG home page, an online image compression tool »

**EN-40** · paragraphe · traduction automatique / mots collés · majeur (revue)
- Actuel : « However, this is a problem that can easily be solved, it is often enough tooptimize and compress product photos for your e-commerce. »
- Explication : « tooptimize » est réel (pas d'espace avant `<strong>`) ; virgule entre deux propositions ; « your e-commerce » calque « votre e-commerce ».
- Retenu : « Yet this is a problem that is easy to fix: very often, all you need to do is optimize and compress the product photos on your online store. »

**EN-41** · paragraphe · calque · mineur
- Actuel : « you can also save storage space for your host »
- Explication : calque de FR-33.
- Retenu : « but can also save storage space with your hosting provider »

**EN-42** · paragraphe · information datée / claim · mineur
- Actuel : « The JPEG format is the most commonly used image format on the web »
- Explication : comme FR-34.
- Retenu : « The JPEG format is one of the most widely used image formats on the web »

**EN-43** · paragraphe · grammaire / terminologie · mineur
- Actuel : « You can also optimize your product photos for your e-commerce directly on a retouching software like Photoshop, or you can also use free online tools »
- Explication : « software » est indénombrable (« a software ») ; « in », pas « on » ; « photo editing software » est le terme usuel ; « also… also ».
- Retenu : « You can optimize your product photos directly in photo editing software such as Photoshop, or use free online tools »

**EN-44** · paragraphe · traduction automatique · majeur (revue)
- Actuel : « Have images with the right dimensions is also important for optimizing your website. »
- Explication : infinitif français calqué ; gérondif attendu.
- Retenu : « Having images with the right dimensions also matters when optimizing your website. »

### Point 9

**EN-45** · intertitre · calque · majeur (revue)
- Actuel : « 9. Use them to boost your natural referencing (SEO) »
- Explication : « natural referencing » n'existe pas en anglais ; « them » sans antécédent (FR-37).
- Retenu : « 9. Use your photos to boost your SEO »

**EN-46** · paragraphe · contresens / grammaire · mineur (revue en partie)
- Actuel : « Having photos of selling products is one thing, but having a e-commerce site that attracts many visitors from the search engines, it's even better! »
- Explication : « photos of selling products » trahit « photos vendeuses » ; « a e-commerce » ; reprise « it's » fautive.
- Retenu : « Having product photos that sell is one thing, but having an e-commerce site that attracts plenty of visitors from search engines is even better! »

**EN-47** · paragraphe · faux ami · mineur
- Actuel : « However, the e-commerce product photo that you are looking to optimize »
- Explication : « Or » (= « and », « now ») rendu par « However », qui introduit une opposition absente.
- Retenu : « And the e-commerce product photo you are trying to optimize »

**EN-48** · paragraphe · incompréhensible · majeur (revue)
- Actuel : « thanks to natural referencing or SEO (Search Engine Optimization) in English »
- Explication : « in English » conservé dans un texte anglais ; « natural referencing ».
- Retenu : « through search engine optimization (SEO) »

**EN-49** · paragraphe · syntaxe / typographie · mineur
- Actuel : « your images can also have a significant impact on SEO of your site.Here's how to use your product photos to boost your SEO: »
- Explication : « on SEO of your site » ; espace manquante réelle (`site.<strong>Here's`).
- Retenu : « your images can have a significant impact on your site's SEO. Here's how to use your product photos to boost your SEO: »

**EN-50** · liste · calque / casse · mineur
- Actuel : « Please fill in the Image alt tag by describing what it represents »
- Explication : « Please » déplacé dans une liste de conseils ; capitale ; « alt text » est le terme recommandé.
- Retenu : « Fill in the image alt text, describing what the image shows »

**EN-51** · liste · casse / ponctuation · mineur
- Actuel : « Rename your images Descriptively, it will also make it easier for search engines to index them. »
- Explication : capitale ; virgule entre deux propositions.
- Retenu : « Rename your image files descriptively: this also makes it easier for search engines to index them. »

**EN-52** · liste · contresens · majeur (revue)
- Actuel : « Download a Sitemap of your images to allow search engines to find them easily »
- Explication : un sitemap se soumet (submit), il ne se télécharge pas.
- Retenu : « Submit an image sitemap to search engines so they can find your images easily »

**EN-53** · liste · appellation / lien · mineur (revue)
- Actuel : « many SEO plugins on Wordpress, such as YoastSEO or Rank Math SEO, allow you to do it easily »
- Explication : graphies « WordPress », « Yoast SEO » ; les deux liens visent fr.wordpress.org (pages en français) dans la version anglaise.
- Retenu : « many WordPress SEO plugins, such as Yoast SEO and Rank Math SEO, make this step easier », liens vers `https://wordpress.org/plugins/wordpress-seo/` et `https://wordpress.org/plugins/seo-by-rank-math/` (même ressource, version anglaise ; décision dans `06`).

**EN-54** · liste · calque / claim · mineur
- Actuel : « as we told you in our previous point (the loading speed of your pages is a crucial factor for Google!) »
- Explication : « as we told you » calque ; « crucial » (FR-43).
- Retenu : « as explained in the previous tip (page loading speed is an important factor for Google!) »

### Point 10

**EN-55** · alt de l'image `67dbae79db22afe6492e916e.avif` · alt · majeur (revue)
- Actuel : « __wf_reserved_inherit »
- Explication : comme FR-44 (même image, voir « Rectifications de la revue »).
- Retenu : « Orbitvu automated photo studios in a range of sizes, lined up from the most compact to the largest »

**EN-56** · paragraphe · casse · mineur
- Actuel : « Last but not least: The quality of your product photos is absolutely essential. »
- Explication : capitale après deux-points.
- Retenu : « Last but not least: the quality of your product photos is absolutely essential. »

**EN-57** · paragraphe · calque · mineur
- Actuel : « Indeed, the first thing that online shoppers notice is the quality of your visuals. »
- Explication : « Indeed » calque « En effet » en tête de phrase.
- Retenu : « The first thing online shoppers notice is the quality of your visuals. »

**EN-58** · paragraphe · mots collés · majeur (revue)
- Actuel : « It is therefore imperative touse quality equipment to take your photos. »
- Explication : « touse » est réel à l'écran (pas d'espace avant `<strong>`).
- Retenu : « That is why it is vital to use quality equipment to take your photos. »

**EN-59** · paragraphe · traduction automatique · majeur (revue)
- Actuel : « You have at the very least need a good camera and quality lighting with a neutral white background. »
- Explication : phrase agrammaticale.
- Retenu : « At the very least, you need a good camera and quality lighting, along with a neutral white background. »

**EN-60** · paragraphe · grammaire (article) · mineur
- Actuel : « we recommend investing in a automated photo studio »
- Explication : « an » devant voyelle.
- Retenu : « we recommend investing in an automated photo studio »

**EN-61** · paragraphe · claim / grammaire · majeur (revue)
- Actuel : « This type of studio guarantees you a extremely high quality standard, all with disconcerting ease. »
- Explication : « a extremely » ; « disconcerting » maladroit ; garantie (FR-46).
- Retenu : « This type of studio lets you achieve a very high level of quality, while being very easy to use. »

**EN-62** · paragraphe · incompréhensible · majeur (revue)
- Actuel : « This material is designed to make the easy, fast and accessible photo shooting for everyone. »
- Explication : ordre des mots français ; « matériel » rendu par « material ».
- Retenu : « This equipment is designed to make product photography easy, fast and accessible to everyone. »

**EN-63** · paragraphe · terminologie · mineur
- Actuel : « the integrated retouching software allows you to correct small imperfections »
- Explication : « integrated retouching » calque ; « built-in editing software » est l'usage.
- Retenu : « the built-in editing software lets you correct any small imperfections »

**EN-64** · paragraphe · calque · mineur
- Actuel : « to make Internet users want to buy your products »
- Explication : « Internet users » calque « internautes » ; le contexte vise des acheteurs.
- Retenu : « to make shoppers want to buy your products »

**EN-65** · paragraphe · traduction automatique / lien · majeur (revue)
- Actuel : « so do not hesitate to consult our A more in-depth guide to packshot photography or at Contact us if you want to go further! »
- Explication : segments mal découpés (« our A more », « or at Contact us ») ; guide annoncé non lié (FR-50).
- Retenu : « so feel free to read our more in-depth guide to packshot photography or contact us if you want to go further! » (lien ajouté vers `/en/blog/packshot-photography-guide-why-make-product-packshots` ; `06`).

### FAQ

**EN-66** · question 1 · calque · majeur (revue)
- Actuel : « How do I get selling photos for my e-commerce? »
- Explication : « selling photos » calque « photos vendeuses » ; « my e-commerce » calque.
- Retenu : « How can I get product photos that sell for my online store? »

**EN-67** · réponse 1 · calque / claim · mineur
- Actuel : « The system integrates optimized lighting and perfectly uniform backgrounds, essential for impactful e-commerce photos. »
- Explication : « integrates » calque « intègre » ; « perfectly » (FR-53).
- Retenu : « The system includes optimized lighting and highly uniform backgrounds, which are essential for compelling e-commerce photos. »

**EN-68** · réponse 2 · faux ami / claim · majeur (revue)
- Actuel : « Orbitvu Station software automates post-production to ensure high-quality photos: perfect cropping, accurate colors, and optimal sharpness. »
- Explication : « détourage » rendu par « cropping » (recadrage) : contresens métier ; « ensure… perfect » (FR-54).
- Retenu : « Orbitvu Station software automates post-production to deliver high-quality photos: precise background removal, accurate colors and optimal sharpness. »

**EN-69** · question 3 · cohérence · mineur
- Actuel : « How do you create visuals that stand out from the competition? »
- Explication : « you » alors que les autres questions disent « I ».
- Retenu : « How can I create visuals that stand out from the competition? »

**EN-70** · réponse 3 · claim · mineur
- Actuel : « The “ghost image” function ensures consistent positioning for a professional presentation. »
- Explication : garantie (FR-55) ; « feature » est l'usage pour une fonction logicielle.
- Retenu : « The “ghost image” feature makes it easier to position products consistently, for a professional presentation. »

**EN-71** · question 4 · préposition · mineur
- Actuel : « How do I maintain consistent quality on my catalog? »
- Explication : « across my catalog ».
- Retenu : « How can I maintain consistent quality across my catalog? »

**EN-72** · réponse 4 · référent / claim · mineur
- Actuel : « The software allows you to save complete configurations (lighting, framing, post-production) for each type of product. This standardization ensures constant professional quality, even with different operators. »
- Explication : comme FR-56.
- Retenu : « The Orbitvu studio software lets you save complete configurations (lighting, framing, post-production) for each product type. This standardization helps maintain consistent professional quality, even with different operators. »

**EN-73** · réponse 5 · calque · mineur
- Actuel : « The system automates the export of images to the required formats and dimensions, thus optimizing your online upload process. »
- Explication : « thus optimizing », « online upload process » lourds.
- Retenu : « The system automates image export in the required formats and dimensions, streamlining your upload process. »

---

## Rectifications de la revue

1. **Image du point 10 (remarque « structure_fr_en »).** La revue indique que l'image du point 10 « n'est pas la même » en FR (`67dd85edd8fd350b34495f9a.avif`) et en EN (`67dbae79db22afe6492e916e.avif`). Les deux fichiers de `public/images/blog/` sont identiques octet pour octet (même empreinte MD5 `f8ecb5ab468ddf47b52486850b847382`, 141 299 octets) : même visuel sous deux noms. Aucune correction de contenu ; chaque langue garde son `src` (consigne). Unifier les deux noms serait un nettoyage technique facultatif.
2. **Nombre d'erreurs FR.** La revue estime 13 erreurs FR ; la relecture en retient 57 entrées, dont la plupart sont des retouches mineures de style ou de typographie. La note de qualité B reste juste : aucune n'empêche la compréhension.

Aucune anomalie de la revue n'a été retirée comme fausse.

## Vérifications sans anomalie visible

- **Espaces incluses dans les liens ou le gras** (FR et EN) : `notre<a> <strong>guide`, `degrés</strong> </a>peut`, `considérablement<strong> améliorer` (et leurs équivalents EN `our<a> <strong>Complete`, `animation</strong> </a>can`, `considerably<strong> improve`). L'affichage est correct (« notre guide », « degrés peut »), mais l'espace est soulignée avec le lien. À nettoyer lors de la conversion en HTML ; aucune incidence sur le texte.
- **Cibles de liens.** Toutes les routes internes existent dans le dépôt (`/fr|en/industrie/mobilier-decoration`, `/fr/studio-photo/selecteur-machines`, `/en/studios-photo-automatises`, `/fr|en/besoins-photographie-produit`, `/fr|en/contact`, guides FR et EN). Le lien « animation à 360 degrés » vise une page différente selon la langue (FR : sélecteur de machines ; EN : studios automatisés, repointage du commit `1ebb469c`) : conservé tel quel.
- **Auteur.** Le corps ne contient aucun nom de personne. Seul le champ `author` a changé (import « Laurent Wainberg » → « PackshotCreator », commit `8ae45f63`) : voir `05` et `06`.
