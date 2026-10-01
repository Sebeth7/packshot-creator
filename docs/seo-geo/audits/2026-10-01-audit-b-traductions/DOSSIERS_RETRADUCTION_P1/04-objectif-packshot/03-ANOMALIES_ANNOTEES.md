# Anomalies annotées — famille 67dd7e0cbd182b5e0eec9fc0

Base : `01-TEXTE_ACTUEL.md` (`main` `17fc0b3`, 01/10/2026), contrôlé contre le JSON source (`content/blog/<lang>/<slug>.json`) et contre la revue `reviews/67dd7e0cbd182b5e0eec9fc0.json`.

Conventions :

- les extraits sont cités mot pour mot, dans le rendu Markdown de `01` (les `**` marquent le gras du HTML) ;
- gravité : **bloquant** (sens perdu ou phrase incompréhensible), **majeur** (erreur visible ou fausse pour un lecteur averti), **mineur** (correction de qualité) ;
- « Correction retenue » renvoie au texte de `04-PROPOSITION_FR.md` ou `04-PROPOSITION_EN.md`, cité ici sans les espaces insécables, qui sont posées dans `04` ;
- la mention **[revue n]** renvoie à l'index de l'erreur dans le JSON de revue ; **[ajout]** signale une anomalie absente de la revue.

## Bilan du contrôle de la revue

- Les 47 erreurs de la revue (14 FR, 33 EN) ont toutes été retrouvées dans `01` et dans le JSON : aucune n'est fausse.
- Deux d'entre elles ne sont pas appliquées telles que proposées, sans être fausses : la revue [3] (ouverture f/4 ou f/5.6 en cosmétique) reste une question d'arbitrage, signalée `[À VALIDER]` dans la proposition ; la revue [12] (lien « textiles ») n'est pas repointée, car la consigne impose de garder les cibles d'URL ; la recommandation passe en `06`.
- Anomalie automatique **retirée** : « Packshot Creator (espacé) », détectée dans `families/67dd7e0cbd182b5e0eec9fc0.md`. C'est un artefact d'extraction : le HTML réel est `Packshot<em>Creator</em>`, rendu « PackshotCreator » avec « Creator » en italique (voir FR-02).
- Anomalie automatique « PackshotCreator remplace LW » : confirmée, mais elle porte sur le champ `author` et non sur le corps (voir FR-M3).
- 63 anomalies ajoutées, absentes de la liste d'erreurs de la revue (FR : 27 ; EN : 36). Certaines reprennent des constats que la revue mentionnait seulement dans ses remarques (structure, alt, date, catégorie).

---

## FR — /fr/blog/comment-choisir-objectif-en-photographie-packshot

### Métadonnées

**FR-M1** — metaTitle trop long · incohérence SEO · mineur · [revue 13]
- Extrait : « Quel objectif photo choisir pour réussir vos packshots ? Guide complet »
- Problème : 70 caractères, tronqué dans les résultats de recherche. Le fond est juste et porte la requête « quel objectif photo ».
- Correction retenue : « Quel objectif photo choisir pour le packshot ? Guide complet » (60 caractères), voir `05`.

**FR-M2** — description trop longue · incohérence SEO · mineur · [revue 13]
- Extrait : « Découvrez comment choisir le meilleur objectif pour sublimer vos produits en photographie packshot. Macro, focale fixe, zoom : notre guide vous aide à allier précision, productivité et créativité, avec l’expertise PackshotCreator & Orbitvu. »
- Problème : 240 caractères pour une cible de 140 à 155.
- Correction retenue : description de 143 caractères, voir `05`.

**FR-M3** — auteur remplacé · nom de personne · à valider · [ajout, détection automatique confirmée]
- Extrait : `author` : « PackshotCreator »
- Problème : l'import Webflow (`56d4bc32`) portait « Laurent Wainberg ». Le commit `4dde4f23` (12/06/2026, « purge anciennes coordonnées ») a posé l'auteur générique « PackshotCreator » sur 13 fichiers, dont celui-ci.
- Correction retenue : la proposition rétablit « Laurent Wainberg », conformément à la consigne du dossier, et soumet le point à Laurent et Sébastien (`06`, point 2).

**FR-M4** — date de publication douteuse · métadonnée · à valider · [ajout, d'après les remarques de la revue]
- Extrait : `date` : « 2024-02-21T00:00:00.000Z »
- Problème : l'item Webflow a été créé le 21/03/2025 (horodatage de l'ObjectId) et le texte cite l'Alphashot Pro G2. La date affichée est peut-être antérieure à la rédaction réelle.
- Correction retenue : aucune (date conservée), décision en `06`, point 20.

### Corps

**FR-01** — lien d'ancre trop générique · maillage · mineur · [revue 12]
- Extrait : « [textiles](/fr/industrie) »
- Problème : l'ancre « textiles » pointe vers la page générique des industries, alors que la page `/fr/industrie/mode-textile` existe (`data/secteurs.ts`) et que l'EN pointe vers `/en/industrie/mode-textile`. Historique : la cible d'origine `/fr/industrie/shootings-photo` a été repointée vers `/fr/industrie` par `ed5dc135` (maillage, rapport Laurent V4), conformément à la règle du Worker `/fr/industrie/shootings-photo` → `/fr/industrie`.
- Correction retenue : cible conservée (consigne : mêmes cibles d'URL) ; repointage proposé en `06`, point 17.

**FR-02** — graphie de la marque · appellation · mineur · [ajout]
- Extrait : « Dans ce guide, Packshot*Creator* vous aide à comprendre »
- Problème : HTML `Packshot<em>Creator</em>`, ancien style de marque avec « Creator » en italique, alors que la conclusion du même article écrit « **PackshotCreator** » en clair. Ce balisage existe dans 43 fichiers du blog.
- Correction retenue : « PackshotCreator » en clair, en un mot (`06`, point 21).

**FR-03** — typographie et claim · typographie · mineur · [ajout ; claim relevé par la revue]
- Extrait : « dans un workflow 100% maîtrisé »
- Problème : espace insécable manquante avant « % ». « 100 % maîtrisé » est une affirmation promotionnelle sans source.
- Correction retenue : « dans un workflow 100 % maîtrisé » ; claim conservé et listé en `06`, point 12.

**FR-04** — artefacts Webflow · structure · mineur · [ajout, constat de la revue]
- Extrait : « (paragraphe vide) » (18 occurrences) ; « ⏎ Attention toutefois : tous les zooms ne se valent pas. »
- Problème : 18 paragraphes vides et 19 caractères ZWJ (U+200D) hérités de Webflow, dont un `<br>` en tête du paragraphe « Attention toutefois ».
- Correction retenue : paragraphes vides, ZWJ et `<br>` parasite retirés.

**FR-05** — vidéo d'illustration hors sujet · pertinence · mineur · [ajout]
- Extrait : « [iframe: https://www.youtube.com/embed/9Yrf5vwJsu4] »
- Problème : l'attribut `title` de l'iframe est « What is Virtual Lights and how it works? I ALPHASHOT PRO G2 ». La vidéo, en anglais, présente l'éclairage virtuel de l'Alphashot Pro G2 et non le choix d'un objectif.
- Correction retenue : vidéo conservée, pertinence soumise en `06`, point 15.

**FR-06** — gras dans les intertitres · balisage · mineur · [ajout]
- Extrait : « ### **Pourquoi le choix de l’objectif photo est devenu un enjeu stratégique en photographie packshot** » (même cas pour 7 autres h2) ; « #### **Intelligence artificielle** et **autofocus prédictif** » ; « #### **Nouvelles générations de verres optiques** »
- Problème : balises `<strong>` à l'intérieur des `<h2>` et `<h3>`, héritées de Webflow.
- Correction retenue : intertitres sans `<strong>`.

**FR-07** — construction bancale · syntaxe · mineur · [ajout]
- Extrait : « Un bon objectif garantit non seulement une **image nette**, mais aussi **fidèle en couleurs**, **sans déformations**, ni **reflets parasites**. »
- Problème : « non seulement une image nette, mais aussi fidèle » coordonne un nom et un adjectif ; virgule fautive avant « ni ».
- Correction retenue : « Un bon objectif garantit une image non seulement **nette**, mais aussi **fidèle en couleurs**, **sans déformation** ni **reflet parasite**. »

**FR-08** — guillemets droits · typographie · mineur · [ajout]
- Extrait : « la simple notion de "bon zoom" ou "objectif lumineux" »
- Correction retenue : « la simple notion de « bon zoom » ou d’« objectif lumineux » ».

**FR-09** — textes alternatifs techniques · alt · majeur · [revue 8]
- Extraits : `alt="__wf_reserved_inherit"` sur `67dd6ee23d3570fece5357e7.avif`, `67dd6f968e9151bd18fee572.avif`, `67dd701ff8366b61902286f9.avif`, `67dd77110556988f23924fbf.avif` et `67dd78ab2ada2492494ff04d.mp4` ; `alt="__wf_reserved_decorative"` sur `67dbae6589928f8e5c796347.avif`.
- Problème : valeurs internes de Webflow servies telles quelles ; aucun texte alternatif réel.
- Correction retenue : alt descriptifs rédigés d'après l'image elle-même (fichiers examinés le 01/10/2026), voir `05`. Les trois alt réels existants sont aussi précisés.

**FR-10** — IA attribuée à l'objectif · fait technique et construction · mineur · [revue 4]
- Extrait : « certains objectifs intégrant des **algorithmes d'IA** sont capables d'**anticiper et maintenir la mise au point** pendant toute la rotation »
- Problème : la détection et la prédiction de mouvement par IA sont calculées par le système autofocus du boîtier, pas par l'objectif ; le paragraphe suivant parle d'ailleurs de « systèmes d'autofocus ». Faute de construction : « capables d'anticiper et de maintenir ».
- Correction retenue : « certains **systèmes autofocus** dotés d’**algorithmes d’IA** savent **anticiper et maintenir la mise au point** pendant toute la rotation » (`06`, point 3).

**FR-11** — sujet incohérent après correction · cohérence · mineur · [ajout]
- Extrait : « Ces objectifs offrent un gain de temps non négligeable lors de la prise de vues en série »
- Problème : suite de FR-10 ; le gain de temps vient du système autofocus.
- Correction retenue : « Ces systèmes font gagner un temps appréciable lors des prises de vues en série ».

**FR-12** — calque et accord · calque · mineur · [revue 5]
- Extrait : « avec des temps d'acquisition aussi bas que 0,05 secondes pour certains modèles haut de gamme »
- Problème : « aussi bas que » calque « as low as » ; « seconde » reste au singulier sous 2. Chiffre non sourcé.
- Correction retenue : « avec des temps d’acquisition qui descendent à 0,05 seconde sur certains modèles haut de gamme » ; chiffre conservé et listé en `06`, point 12.

**FR-13** — cause technique inexacte · fait technique · mineur · [ajout]
- Extrait : « Les **traitements multicouches** appliqués aux lentilles (notamment les technologies **anti-reflets** et **anti-halos**) ont fait d'énormes progrès. Résultat : les franges colorées en bord de produit (aberrations chromatiques) sont mieux contrôlées »
- Problème : les traitements de surface réduisent reflets internes et halos ; les aberrations chromatiques se corrigent par la formule optique et la nature des verres. La phrase attribue ce « résultat » aux seuls traitements, alors que l'intertitre parle bien de « verres optiques ».
- Correction retenue : « Les **traitements multicouches** appliqués aux lentilles (notamment **antireflet** et **anti-halo**) ont fait d’énormes progrès, tout comme les verres eux-mêmes. Résultat : […] mieux maîtrisées » (`06`, point 4). Aucun type de verre n'est nommé, faute de source dans le texte.

**FR-14** — ancres incohérentes pour un même lien · cohérence · mineur · [ajout]
- Extraits : « Canon EF 100mm f/2.8L Macro IS USM » puis « Canon EF 100 mm f/2.8 L Macro IS USM » ; « Sigma 105mm f/2.8 DG DN Macro Art » puis « Sigma 105 mm f/2.8 Macro Art »
- Problème : deux graphies pour chacun des deux objectifs, qui pointent pourtant vers les mêmes pages.
- Correction retenue : « Canon EF 100 mm f/2.8L Macro IS USM » et « Sigma 105 mm f/2.8 DG DN Macro Art » aux deux endroits.

**FR-15** — notation du modèle · terminologie · mineur · [ajout]
- Extrait : « [**Canon 24-105 mm f/4 L**] » ; FAQ : « type Canon 24-105 mm f/4 L »
- Problème : Canon note « f/4L » ; le lien vise l'EF 24-105 mm f/4L IS II USM.
- Correction retenue : « Canon EF 24-105 mm f/4L » (ancre) et « Canon 24-105 mm f/4L » (FAQ).

**FR-16** — terme incorrect · terminologie · mineur · [ajout]
- Extrait : « il introduit une **distorsion perspective** (effet bombé) »
- Problème : « distorsion perspective » n'est pas une forme française correcte.
- Correction retenue : « une **distorsion de perspective** (effet bombé) ». Le fond (déformation propre au grand angle) n'est pas modifié.

**FR-17** — calque · calque · mineur · [ajout]
- Extrait : « pour créer des images contextuelles ou des packshots stylisés, par exemple dans les secteurs déco ou sport »
- Correction retenue : « pour créer des images d’ambiance ou des packshots stylisés, par exemple dans la décoration ou le sport ».

**FR-18** — facteur de recadrage mal formulé · fait technique · mineur · [ajout ; remarque de la revue]
- Extrait : « sur un appareil à capteur APS-C, la focale perçue est allongée d’environ 1,5x. Un 50 mm devient alors un 75 mm »
- Problème : la focale d'un objectif ne change pas ; c'est le champ cadré qui équivaut à celui d'une focale 1,5 fois plus longue en plein format. « 1,5x » est un symbole anglais. Le coefficient « environ 1,5 » est une approximation acceptable (il varie selon les marques).
- Correction retenue : « sur un boîtier à capteur APS-C, le champ cadré correspond à celui d’une focale environ 1,5 fois plus longue. Un 50 mm cadre alors comme un 75 mm en plein format » (`06`, point 5).

**FR-19** — conséquence technique inexacte · fait technique · mineur · [revue 10]
- Extrait : « Avec un objectif 1:2, l’image sur le capteur sera deux fois plus petite que l’objet réel — ce qui limite la netteté dans les gros plans. »
- Problème : un rapport 1:2 limite le grandissement, donc le niveau de détail enregistré, pas la netteté.
- Correction retenue : « Avec un objectif 1:2, l’image sur le capteur est deux fois plus petite que l’objet réel, ce qui limite le niveau de détail dans les gros plans. » (`06`, point 6).

**FR-20** — tournure familière · style · mineur · [ajout]
- Extrait : « En dessous de 30 cm, vous êtes à l’aise sur la majorité des petits produits. »
- Correction retenue : « En dessous de 30 cm, vous couvrez confortablement la plupart des petits produits. » Chiffre conservé et listé en `06`, point 12.

**FR-21** — paragraphe en double · structure · majeur · [revue 2]
- Extrait (section « Distance minimale de mise au point ») : « Attention : sur un appareil à capteur APS-C, la focale perçue est allongée d'environ 1,5x. Un 50 mm devient alors un 75 mm, ce qui peut être un avantage pour les objets de petite taille. »
- Problème : copie du paragraphe de la section « Distance focale minimale recommandée : 50 mm », hors sujet ici. Présent dès l'import Webflow.
- Correction retenue : seconde occurrence supprimée ; la première est corrigée (FR-18).

**FR-22** — formulation ambiguë et décimale · terminologie et typographie · mineur · [ajout]
- Extrait : « En dessous de f/5.6, le flou d'arrière-plan peut devenir problématique. »
- Problème : « en dessous de f/5.6 » se lit de deux façons (nombre f plus petit ou ouverture plus petite) ; le sens voulu est « à plus grande ouverture ». Décimale à point en français.
- Correction retenue : « En deçà de f/5,6, c’est-à-dire à plus grande ouverture, le flou d’arrière-plan peut devenir gênant. » Les noms commerciaux d'objectifs gardent la notation du fabricant (« f/2.8L », « f/1.8 STM »).

**FR-23** — contradiction technique interne · fait technique · majeur · [revue 3]
- Extrait : « Le **macro** est aussi conseillé ici, avec une grande ouverture (f/4 ou f/5.6) pour valoriser le relief. »
- Problème : l'article recommande f/8 à f/11 et prévient que, plus ouvert que f/5.6, le flou devient gênant. L'exception n'est pas justifiée. L'erreur n'est pas certaine : une faible profondeur de champ peut être voulue sur une texture.
- Correction retenue : valeurs conservées (f/5,6 en notation française), note `[À VALIDER]` dans la proposition, arbitrage en `06`, point 9.

**FR-24** — intertitre contradictoire · titre littéral · mineur · [revue 9]
- Extrait : « Photographie vidéo packshot : quels objectifs utiliser pour filmer des produits en mouvement ? »
- Correction retenue : « Vidéo packshot : quels objectifs utiliser pour filmer des produits en mouvement ? »

**FR-25** — anglicisme · calque · mineur · [ajout]
- Extrait : « Le contenu vidéo devient central dans les stratégies e-commerce et social media. »
- Correction retenue : « La vidéo prend une place centrale dans les stratégies e-commerce et sur les réseaux sociaux. »

**FR-26** — mode verbal et signe « + » · grammaire · mineur · [revue 7]
- Extrait : « **Stabilité** si vous travaillez à main levée (ou préférer un rail + plateau motorisé en studio) »
- Correction retenue : « **Stabilité**, si vous filmez à main levée (en studio, préférez un rail et un plateau motorisé) ».

**FR-27** — vidéo servie comme image · structure · majeur · [ajout ; la revue signale seulement l'alt]
- Extrait : `![__wf_reserved_inherit](/images/blog/67dd78ab2ada2492494ff04d.mp4)`
- Problème : le JSON contient `<img src="/images/blog/67dd78ab2ada2492494ff04d.mp4">`. Aucun navigateur n'affiche un `.mp4` dans une balise `<img>`, et `lib/blog-utils.ts` ne transforme pas ce cas (seules les bannières `.mp4` d'en-tête passent en `<video>`). Le visiteur voit une image cassée. La vidéo (1,8 s, 776 × 444) montre un appareil photo sur le bras d'un studio, objectif qui zoome.
- Correction retenue : `src` et position conservés, alt rédigé ; intégration en `<video>` soumise en `06`, point 16 (rayon : d'autres articles peuvent être concernés, R8).

**FR-28** — double espace · typographie · mineur · [ajout]
- Extrait : « Certains studios Orbitvu  permettent d’automatiser ces mouvements » (espace suivie d'une espace insécable, `&nbsp;` dans le JSON)
- Correction retenue : espace simple.

**FR-29** — anglicisme · calque · mineur · [revue 6]
- Extrait : « tout en conservant une lumière parfaitement maîtrisée, frame par frame »
- Correction retenue : « tout en conservant une lumière parfaitement maîtrisée, image par image ».

**FR-30** — affirmation contredite par la liste · cohérence · mineur · [ajout]
- Extrait : « Plusieurs fabricants tiers proposent aujourd’hui des objectifs performants à prix maîtrisé. »
- Problème : la liste qui suit cite aussi un Canon et un Nikkor, objectifs de marques d'appareils et non de fabricants tiers.
- Correction retenue : « Les fabricants tiers, mais aussi les marques d’appareils elles-mêmes, proposent aujourd’hui des objectifs performants à prix maîtrisé. » (`06`, point 10).

**FR-31** — compatibilité à vérifier · fait produit · mineur · [ajout]
- Extrait : « **Sigma 105 mm f/2.8 Macro** : très bon rapport qualité/prix, autofocus efficace, compatible Canon/Nikon/Sony »
- Problème : l'article recommande plus haut le Sigma 105 mm f/2.8 DG DN Macro Art, conçu pour les hybrides ; la compatibilité « Canon/Nikon/Sony » correspond plutôt à l'ancienne génération reflex de ce Sigma. Le modèle visé n'est pas précisé et l'erreur n'est pas certaine.
- Correction retenue : fait conservé (« compatible Canon, Nikon et Sony », « rapport qualité-prix ») ; vérification en `06`, point 11.

**FR-32** — coquille · orthographe · majeur · [revue 0]
- Extrait : « Lla photographie packshot ne se résume plus à une simple image nette sur fond blanc. »
- Correction retenue : « La photographie packshot ne se résume plus à une simple image nette sur fond blanc : c’est une stratégie visuelle à part entière. »

**FR-33** — article fautif · grammaire · mineur · [ajout ; relevé par la revue dans les claims]
- Extrait : « nous vous accueillons au [**Orbitvu Experience Center**](/fr/contact), près de Lyon »
- Problème : « au Orbitvu » au lieu de « à l’Orbitvu ». La localisation « près de Lyon » remplace « de Levallois » depuis `4dde4f23` (décision de Sébastien, adresse centralisée sur la page contact).
- Correction retenue : « nous vous accueillons à l’[**Orbitvu Experience Center**](/fr/contact), près de Lyon » ; existence et localisation à confirmer en `06`, point 14.

**FR-34** — trois paragraphes fusionnés · structure · mineur · [ajout]
- Extrait : « …impact sur vos ventes. ⏎ Chaque produit, chaque usage, chaque workflow a ses exigences. […] ⏎ Pour tester les objectifs… »
- Problème : un seul `<p>` découpé par deux `<br>`.
- Correction retenue : trois paragraphes.

**FR-35** — inexactitude technique · fait technique · mineur · [ajout]
- Extrait : « Avec Orbitvu, vous ajoutez à cela des animations, des vidéos 360°, ou du focus stacking : créativité et cohérence, réunies dans une seule prise de vue. »
- Problème : le focus stacking et l'animation 360° reposent par définition sur plusieurs prises de vue.
- Correction retenue : « créativité et cohérence, réunies au cours d’une même séance de prise de vue » (`06`, point 8).

**FR-36** — logique de la réponse · syntaxe · mineur · [ajout]
- Extrait : « Non, si vous choisissez un zoom pro (type Canon 24-105 mm f/4 L) et que vous travaillez dans un environnement multi-produits. Mais pour les objets précieux… »
- Problème : « Non, si… » se lit comme une condition négative.
- Correction retenue : « Pas si vous choisissez un zoom pro (type Canon 24-105 mm f/4L) et que vous travaillez dans un environnement multiproduit. En revanche, pour les objets précieux… »

**FR-37** — question de FAQ amputée · orthographe · majeur · [revue 1]
- Extrait : « xiste-t-il une solution pour tout voir… sans rien rater ? »
- Problème : visible sur la page et repris dans les données structurées FAQPage (`app/[lang]/blog/[slug]/page.tsx`).
- Correction retenue : « Existe-t-il une solution pour tout voir… sans rien rater ? »

**FR-38** — description fausse du focus stacking · fait technique · mineur · [revue 11]
- Extrait : « Chaque point du produit est mis au point séparément, puis fusionné automatiquement. »
- Problème : le focus stacking procède par plans de netteté successifs, pas point par point.
- Correction retenue : « L’appareil prend une série d’images en décalant la mise au point d’un plan à l’autre du produit, puis les fusionne automatiquement. » (`06`, point 7).

### Retouches de style FR (non fautives, sans incidence sur le fond)

Introduction resserrée (« De nos jours… À l'heure où… » → « La qualité d'un visuel produit ne dépend plus seulement… Quand la précision… ») ; « contraintes spécifiques » → « particulières » ; « Les plans doivent être » → « Les prises de vue doivent être » ; « La qualité finale » → « Le rendu final » ; « angle de vue » → « angle de champ » ; « piqué supérieur » → « meilleur piqué » ; « lecture ultra-précise » → « lecture très précise du détail » ; « points brûlés » → « zones brûlées » ; « Pour renforcer cet effet » → « Pour réduire encore les reflets » ; « compatibilité monture/boîtier » → « la monture de l'objectif est compatible avec votre boîtier » ; « une décennie » → « dix ans » ; « Stocker » → « Ranger » ; « Et pour aller plus loin » → « Pour aller plus loin » ; apostrophes et guillemets typographiques, espaces insécables. Les claims ne sont ni renforcés ni supprimés.

### Constat hors texte (FR)

- L'image `67dbae6589928f8e5c79631f.avif` (schéma du rapport de grandissement) porte des légendes incrustées en anglais (« Magnification ratio 1 : 1 ») sur la page française. Signalé en `06`, point 24.

---

## EN — /en/blog/how-to-choose-best-lens-for-product-photography

Verdict : traduction automatique non relue du FR. Toutes les anomalies ci-dessous disparaissent avec la retraduction intégrale de `04-PROPOSITION_EN.md` ; la colonne « correction » cite le texte retenu.

### Métadonnées

**EN-M1** — title littéral et hors requête · SEO · mineur · [ajout]
- Extrait : « How do you choose the best lens for packshot photography? All the questions to ask »
- Problème : « All the questions to ask » calque « Toutes les questions à se poser » ; la requête principale de la page est « best lens for product photography » (3 157 impressions, position 10,0).
- Correction retenue : « How to choose the best lens for product photography: the questions to ask » (`05`).

**EN-M2** — h1 littéral et hors requête · SEO · mineur · [ajout]
- Extrait : « How do I choose the best lens for a packshot? »
- Correction retenue : « How to choose the best lens for product photography » (`05`).

**EN-M3** — metaTitle trop long · SEO · mineur · [ajout ; constat de la revue]
- Extrait : « What photo lens should you choose for successful packshots? Complete guide »
- Problème : 74 caractères, traduction littérale, sans la requête principale.
- Correction retenue : « Best lens for product photography: complete packshot guide » (58 caractères).

**EN-M4** — description fautive · faux ami · majeur · [revue 36]
- Extrait : « Find out how to choose the best lens to enhance your packshot photography products. Macro, fixed focus, zoom: our guide helps you combine precision, productivity and creativity, with PackshotCreator & Orbitvu expertise. »
- Problème : « fixed focus » désigne un objectif sans mise au point (il faut « prime ») ; ordre des mots calqué ; 219 caractères.
- Correction retenue : description de 146 caractères (`05`).

**EN-M5** — catégorie divergente · métadonnée · mineur · [ajout ; constat de la revue]
- Extrait : `category` : « Innovations » (FR : « E-commerce »)
- Correction retenue : alignement proposé sur « E-commerce » (même `categoryId` que le FR), `06`, point 19.

**EN-M6** — auteur remplacé · nom de personne · à valider · [ajout]
- Extrait : `author` : « PackshotCreator » (import : « Laurent Wainberg », commit `4dde4f23`)
- Correction retenue : comme FR-M3.

### Corps

**EN-01** — calque · calque · mineur · [revue 37]
- Extrait : « Nowadays, the quality of a visual product no longer depends solely on light or decor. »
- Correction retenue : « The quality of a product image no longer depends only on lighting or set design »

**EN-02** — « optique » rendu par « approach » · faux ami · majeur · [revue 14]
- Extrait : « choosing the right approach becomes a strategic step for any company that wants to promote its products through image. »
- Correction retenue : « choosing the right lens becomes a strategic step for any company that wants to showcase its products through imagery. »

**EN-03** — « objectif » rendu par « objective » · faux ami · majeur · [revue 15]
- Extrait : « [technical objects](/en/industrie/pieces-techniques-industrie), shiny surfaces, textured materials... each product category requires a different finish, and therefore an adapted objective. »
- Correction retenue : « [technical parts](/en/industrie/pieces-techniques-industrie), shiny surfaces, textured materials… every product category calls for a different rendering, and therefore a suitable lens. » (cibles de liens inchangées).

**EN-04** — graphie de marque et calque · appellation, calque · mineur · [revue 38 ; ajout pour la graphie]
- Extrait : « In this guide, Packshot*Creator* helps you understand major technological developments, critical criteria […] We also share our feedback with Orbitvu automated studios — […] — which make it possible to reveal the full potential »
- Correction retenue : « In this guide, PackshotCreator walks you through the major technological developments, the key selection criteria […] We also share our experience with Orbitvu automated studios, especially the Alphashot Pro G2, which let you unlock the full potential »

**EN-05** — artefacts Webflow · structure · mineur · [ajout, constat de la revue]
- Extrait : 18 « (paragraphe vide) », 19 ZWJ, `<strong>` dans 8 h2 et 2 h3, `<br>` en tête de « ⏎ Be careful though », conclusion en un seul `<p>` à deux `<br>`.
- Correction retenue : comme FR-04, FR-06 et FR-34.

**EN-06** — vidéo hors sujet · pertinence · mineur · [ajout]
- Extrait : « [iframe: https://www.youtube.com/embed/9Yrf5vwJsu4] »
- Correction retenue : comme FR-05.

**EN-07** — phrase agrammaticale · traduction automatique · bloquant · [revue 16]
- Extrait : « A good lens not only guarantees a **sharp image**, but also **True to color**, **without deformations**, nor **parasitic reflections**. »
- Correction retenue : « A good lens delivers an image that is not only **sharp**, but also **true to color**, with **no distortion** and **no stray reflections**. »

**EN-08** — calque · calque · mineur · [ajout]
- Extrait : « It allows you to accurately reproduce the reality of the product »
- Correction retenue : « It lets you reproduce the product accurately, exactly as it is »

**EN-09** — faux amis et majuscules · faux ami · majeur · [revue 17]
- Extrait : « The products are **Fixed**, often **Small**, sometimes **Brilliant** »
- Correction retenue : « Products are **static**, often **small**, sometimes **shiny** »

**EN-10** — calque · calque · mineur · [ajout]
- Extrait : « The decor is generally **neutral** or **transparent** »
- Correction retenue : « The background is usually **neutral** or **transparent** »

**EN-11** — « plans » rendu par « plans » · faux ami · majeur · [revue 18]
- Extrait : « The plans should be **constant**, **reproducible**, often in the context of**automation** »
- Correction retenue : « Shots must be **consistent** and **reproducible**, often in an **automated** setup »

**EN-12** — phrase incompréhensible · incompréhensible · bloquant · [revue 19]
- Extrait : « The final quality must be usable both in **e-commerce thumbnail** What about **large format printed** »
- Correction retenue : « The final image must work both as an **e-commerce thumbnail** and as a **large-format print** »

**EN-13** — terme photo inexact · terminologie · mineur · [ajout]
- Extrait : « the simple notion of “good zoom” or “bright lens” »
- Problème : « objectif lumineux » se dit « fast lens ».
- Correction retenue : « the simple idea of a “good zoom” or a “fast lens,” »

**EN-14** — textes alternatifs · alt, mélange linguistique · majeur · [revue 35 et 8]
- Extraits : `alt="__wf_reserved_inherit"` sur `67dedf2c5b1d1dd831c27c66.avif`, `67dedf2c5b1d1dd831c27c60.avif`, `67dedf2c5b1d1dd831c27c63.avif`, `67dedf2c5b1d1dd831c27c6c.avif`, `67dedf2d5b1d1dd831c27c99.mp4` ; `alt="__wf_reserved_decorative"` sur `67dedf2c5b1d1dd831c27c69.avif` ; alt en français sur `67dedf2d5b1d1dd831c27c7b.avif` (« photographie packshot d'un bijou en argent »), `67dedf2d5b1d1dd831c27c6f.avif` (« photographie e-commerce canapé jaune ») et `67dedf2d5b1d1dd831c27c86.avif` (« rapport de grandissement appareil photo »).
- Correction retenue : neuf alt rédigés en anglais (`05`).

**EN-15** — article superflu · calque · mineur · [ajout]
- Extrait : « New camera lens technologies and their impact on the packshot »
- Correction retenue : « New lens technologies and their impact on packshot photography »

**EN-16** — phrase agrammaticale · traduction automatique · bloquant · [revue 20]
- Extrait : « If your products are photographed in **Turntable movement**, some objectives integrating **AI algorithms** are capable of**anticipate and maintain focus** throughout the rotation. »
- Correction retenue : « If your products are photographed **while rotating on a turntable**, some **autofocus systems** with **AI algorithms** can **anticipate and maintain focus** throughout the rotation. » (même correction de fond que FR-10).

**EN-17** — phrase incompréhensible · incompréhensible · bloquant · [revue 21]
- Extrait : « These modern autofocus systems use artificial intelligence algorithms to **Predicting movement** topics and **Adjust the focus** accordingly. »
- Correction retenue : « These modern autofocus systems rely on artificial intelligence to **predict subject movement** and **adjust focus** accordingly. »

**EN-18** — calques · calque · mineur · [ajout]
- Extrait : « These lenses save a significant amount of time when shooting serially, especially if you use an automated studio that combines multiple angles and formats. »
- Problème : « combines » rend mal « enchaîne » ; sujet « lenses » à corriger comme en FR-11.
- Correction retenue : « These systems save a significant amount of time when you shoot in series, especially if you use an automated studio that runs through multiple angles and formats. »

**EN-19** — déterminant français résiduel · traduction automatique · majeur · [revue 22]
- Extrait : « Les **multilayer treatments** applied to lenses (in particular technologies **anti-glare** and **anti-halos**) have made enormous progress. »
- Correction retenue : « **Multilayer coatings** applied to lens elements (notably **anti-reflective** and **anti-flare** coatings) have made enormous progress, and so has the glass itself. » (même correction de fond que FR-13).

**EN-20** — faux ami · faux ami · mineur · [ajout]
- Extrait : « the shiny surfaces (bottles, plastics, polished metal) are restored more cleanly. »
- Correction retenue : « shiny surfaces (bottles, plastics, polished metal) are rendered more cleanly. »

**EN-21** — calques et majuscule · calque · mineur · [ajout]
- Extrait : « The macro lens remains the **reference** […] to fully exploit the function of **Focus Stacking** in automated studios, which makes it possible to obtain a **total sharpness** even on complex volumes. »
- Correction retenue : « The macro lens remains the **go-to choice** […] to get the most out of **focus stacking** in automated studios, which delivers **front-to-back sharpness** even on complex shapes. »

**EN-22** — ancre fautive et liens vers des sites français · typographie, maillage externe · mineur · [ajout ; remarque de la revue]
- Extrait : « [Canon EF100mm f/2.8L Macro IS USM](https://www.canon.fr/lenses/ef-100mm-f-2-8l-macro-is-usm-lens/) » ; « [Sigma 105mm f/2.8 Macro Art](https://www.sigma-photo.fr/…) »
- Problème : espace manquante dans « EF100mm » ; deux graphies du Sigma ; les liens de la page EN mènent à canon.fr et sigma-photo.fr.
- Correction retenue : « Canon EF 100mm f/2.8L Macro IS USM » et « Sigma 105mm f/2.8 DG DN Macro Art » aux deux endroits ; URL inchangées, question en `06`, point 18.

**EN-23** — calque · calque · mineur · [ajout]
- Extrait : « anything that requires ultra-precise reading. »
- Correction retenue : « anything that calls for a highly precise rendering of detail. »

**EN-24** — « focale fixe » rendu par « fixed focus » · faux ami · majeur · [revue 23]
- Extraits : « Fixed focus lens: for maximum sharpness and consistent professional results » ; « A fixed focus lens (for example **50 mm**… » ; FAQ « With a fixed focus lens (50 to 100mm) »
- Correction retenue : « Prime lens: maximum sharpness and consistent professional results » ; « A prime lens » ; « With a prime lens (50 to 100mm) ».

**EN-25** — phrase incompréhensible · incompréhensible · bloquant · [revue 24]
- Extrait : « generally offers a **Upper stitch** and **less distortion** only a zoom. »
- Correction retenue : « generally offers **better sharpness** and **less distortion** than a zoom. »

**EN-26** — calques · calque · mineur · [ajout]
- Extrait : « The absence of zoom forces the photographer to adapt his distance to the product, but guarantees a constant angle of view, very useful in the production of serial visuals. […] recorded for later reuse as it is. »
- Correction retenue : « Without a zoom, the photographer has to adjust the distance to the product, but the angle of view stays constant, which is very useful when producing images in series. […] saved and reused exactly. »

**EN-27** — calques et majuscule · calque · mineur · [ajout]
- Extrait : « several families of products » ; « models from **Pro or semi-pro series** »
- Correction retenue : « several product families » ; « **professional or semi-professional** models ».

**EN-28** — calques · calque · mineur · [ajout]
- Extrait : « Wide-angle lens: to be reserved for bulky objects or for staging […] furniture, appliances, or models. But it introduces a **Perspective distortion** (domed effect) […] for creating contextual images or stylized packshots, for example in the decoration or sports sectors. »
- Problème : intertitre calqué ; « mannequins » (FR) rendu par « models » ; majuscule parasite ; « contextual images » calque « images contextuelles ».
- Correction retenue : « Wide-angle lens: best kept for bulky objects or staged shots » ; « furniture, home appliances or mannequins » ; « **perspective distortion** (a bulging effect) » ; « lifestyle images or styled packshots, for example in home decor or sports ».

**EN-29** — répétition absurde · incompréhensible · majeur · [revue 25]
- Extrait : « to get natural perspectives and a good perspective. »
- Correction retenue : « to get a natural perspective and enough working distance. »

**EN-30** — calque et terme inexact · traduction automatique · majeur · [revue 26]
- Extrait : « Attention: on an APS-C sensor device, the perceived focal length is extended by approximately 1.5x. A 50mm then becomes a 75mm »
- Correction retenue : « Note: on an APS-C camera, the field of view matches that of a focal length about 1.5 times longer. A 50mm lens then frames like a 75mm on full frame » (même correction de fond que FR-18).

**EN-31** — calques · calque · mineur · [ajout]
- Extrait : « a ring, a bottle or a careful packaging. » ; « the image on the sensor will be twice as small as the real object — which limits sharpness in close-ups. »
- Correction retenue : « a ring, a bottle or carefully crafted packaging » ; « the image on the sensor is half the size of the real object, which limits the level of detail in close-ups » (même correction de fond que FR-19).

**EN-32** — calques · calque · mineur · [revue 43 et 44]
- Extrait : « you can't always move the camera deeply. » ; « The technical data sheets specify this distance. Below 30 cm, you are comfortable with the majority of small products. »
- Correction retenue : « you can't always move the camera closer or farther away » ; « Spec sheets list this distance. With a minimum focusing distance under 30 cm, you can comfortably handle most small products. »

**EN-33** — paragraphe en double · structure · majeur · [revue 26]
- Extrait (section « Minimum focus distance ») : « Attention: on an APS-C sensor device, the perceived focal length is extended by approximately 1.5x. A 50mm then becomes a 75mm, which can be an advantage for small objects. »
- Correction retenue : seconde occurrence supprimée, comme FR-21.

**EN-34** — formulation ambiguë · terminologie · mineur · [ajout]
- Extrait : « Below f/5.6, background blur can become a problem. »
- Correction retenue : « At apertures wider than f/5.6, background blur can become a problem. »

**EN-35** — article superflu · calque · mineur · [ajout]
- Extrait : « you can consider the [**automated focus stacking**](/en/blog/focus-on-the-focus-stacking) »
- Correction retenue : « consider [**automated focus stacking**](/en/blog/focus-on-the-focus-stacking) ».

**EN-36** — répétition et calque · calque · mineur · [ajout]
- Extrait : « These are the products that require the most image sharpness. The sharpness must be perfect, the reflections controlled, the stones or textures well legible. »
- Correction retenue : « These are the products that demand the finest image quality: sharpness must be perfect, reflections controlled, and stones and textures clearly legible. »

**EN-37** — « objectif » rendu par « objective » · faux ami · majeur · [revue 27]
- Extrait : « An objective **100 mm macro**, associated with **automatic focus stacking** from an Orbitvu studio, is the ideal combination here. »
- Correction retenue : « A **100mm macro lens** combined with the **automatic focus stacking** of an Orbitvu studio is the ideal pairing here. »

**EN-38** — faux ami · faux ami · mineur · [ajout]
- Extrait : « Cosmetics and fine textures: valorize materials »
- Correction retenue : « Cosmetics and fine textures: bringing materials to life »

**EN-39** — faux ami et calques · faux ami · mineur · [revue 39]
- Extrait : « Pearls, exfoliating grains, foams or oils... the sensory richness of cosmetic textures must be translated visually. The **macro** is also recommended here »
- Correction retenue : « Pearlescent finishes, exfoliating grains, foams or oils… the sensory richness of cosmetic textures has to come through in the image. A **macro** lens is also recommended here »

**EN-40** — contradiction technique interne · fait technique · majeur · [revue 3, version EN]
- Extrait : « with a large aperture (f/4 or f/5.6) to enhance the relief. »
- Correction retenue : comme FR-23 (valeurs conservées, `[À VALIDER]`).

**EN-41** — déterminant français résiduel · traduction automatique · majeur · [revue 28]
- Extrait : « La **cross polarization** can be very useful on glossy packaging to remove parasitic reflections. »
- Correction retenue : « **Cross-polarization** can be very useful on glossy packaging to eliminate stray reflections. »

**EN-42** — « focale » rendu par « focus » · faux ami · majeur · [revue 29]
- Extrait : « Clothing and textile products: a balanced focus for natural volumes »
- Correction retenue : « Clothing and textiles: a balanced focal length for natural proportions »

**EN-43** — faux ami · faux ami · mineur · [ajout]
- Extrait : « On a mannequin or bust, the textile requires a good restoration of proportions. »
- Correction retenue : « On a mannequin or bust form, textiles require faithful rendering of proportions. »

**EN-44** — calque · faux ami · mineur · [revue 40]
- Extrait : « to homogenize the light and avoid burnt spots »
- Correction retenue : « to even out the light and avoid blown highlights »

**EN-45** — ordre des mots · calque · mineur · [revue 41]
- Extrait : « **Precise positioning** LEDs to create controlled and rewarding reflections »
- Correction retenue : « **Precise LED positioning** to create controlled, flattering reflections »

**EN-46** — terme inexact · terminologie · mineur · [ajout]
- Extrait : « To reinforce this effect, some photographers also use **mattifying sprays** (temporary optical powder) »
- Problème : le terme photo anglais est « dulling spray » ; « mattifying » relève de la cosmétique.
- Correction retenue : « To reduce reflections even further, some photographers also use **dulling sprays** (a temporary optical powder) »

**EN-47** — intertitre contradictoire · titre littéral · mineur · [ajout ; équivalent de la revue 9]
- Extrait : « Packshot video photography: what lenses should you use to film moving products? »
- Correction retenue : « Product video: which lenses should you use to film products in motion? »

**EN-48** — majuscule parasite · traduction automatique · mineur · [ajout]
- Extrait : « **Silent and smooth autofocus** To avoid extraneous sounds during recording »
- Correction retenue : « **Quiet, smooth autofocus**, to avoid unwanted noise in your recordings »

**EN-49** — termes photo inexacts · faux ami · mineur · [revue 42]
- Extrait : « **Stability** if you work freehand (or prefer a rail + motorized platter in the studio) »
- Correction retenue : « **Stability**, if you shoot handheld (in the studio, use a rail and a motorized turntable instead) »

**EN-50** — phrase incompréhensible · incompréhensible · majeur · [revue 30]
- Extrait : « **Medium or macro focus** by the type of plan »
- Correction retenue : « **Medium or macro focal length**, depending on the type of shot »

**EN-51** — vidéo servie comme image · structure · majeur · [ajout]
- Extrait : `![__wf_reserved_inherit](/images/blog/67dedf2d5b1d1dd831c27c99.mp4)`
- Correction retenue : comme FR-27.

**EN-52** — calques · calque · mineur · [ajout]
- Extrait : « Yes, as long as you make the right compromises. Several third-party manufacturers now offer high-performance lenses at controlled prices. »
- Correction retenue : « Yes, as long as you make the right trade-offs. Third-party manufacturers, as well as the camera brands themselves, now offer high-performing lenses at reasonable prices. » (même correction de fond que FR-30).

**EN-53** — ponctuation française et calques · typographie, calque · mineur · [ajout ; signalé dans la preuve de langue]
- Extrait : « **Sigma 105mm f/2.8 Macro** : very good quality/price ratio » ; « **Canon 50mm f/1.8 STM** : reliable entry-level, widely used » (espace avant les deux-points sur les quatre puces)
- Correction retenue : « **Sigma 105mm f/2.8 Macro**: very good value for money » ; « **Canon 50mm f/1.8 STM**: a reliable entry-level lens, widely used »

**EN-54** — « piqué » rendu par « stitching » · faux ami · majeur · [revue 33]
- Extrait : « **Tamron SP 90mm f/2.8 Di Macro** : very correct stitching, often used in the studio »
- Correction retenue : « **Tamron SP 90mm f/2.8 Di Macro**: very respectable sharpness, often used in the studio »

**EN-55** — verbe manquant, faux ami · incompréhensible · bloquant · [revue 31]
- Extrait : « However, be sure to **frame/case compatibility**, and check that the lens is **recognized by your Orbitvu software** »
- Correction retenue : « Make sure, however, that the **lens mount is compatible with your camera body**, and check that the lens is **recognized by your Orbitvu software** »

**EN-56** — calque · calque · mineur · [revue 45]
- Extrait : « And to go further: maintain and perpetuate your photo lenses »
- Correction retenue : « Going further: caring for your lenses so they last »

**EN-57** — article fautif · grammaire · mineur · [ajout]
- Extrait : « Use a **alcohol-free optical solution** »
- Correction retenue : « Use an **alcohol-free lens cleaning solution** »

**EN-58** — « objectifs » rendu par « goals » · faux ami · bloquant · [revue 32]
- Extrait : « Store goals in a **airtight box** with anti-humidity bag if possible »
- Correction retenue : « Store your lenses in an **airtight box**, with a desiccant pack if possible »

**EN-59** — ordre des mots · calque · mineur · [ajout]
- Extrait : « Thanks to the solutions offered by **PackshotCreator** and to automated studios **Orbitvu** »
- Correction retenue : « With the solutions offered by **PackshotCreator** and **Orbitvu** automated studios »

**EN-60** — article manquant · grammaire · mineur · [revue 46]
- Extrait : « we welcome you to [**Orbitvu Experience Center**](/en/contact), near Lyon. »
- Correction retenue : « we welcome you at the [**Orbitvu Experience Center**](/en/contact), near Lyon, France: »

**EN-61** — calque · calque · mineur · [ajout]
- Extrait (FAQ) : « What lens makes it possible to produce striking visuals... without retouching? »
- Correction retenue : « Which lens produces striking visuals… without retouching? »

**EN-62** — calques et inexactitude · calque, fait technique · mineur · [ajout]
- Extrait (FAQ) : « Modern lenses (especially macro and wide apertures) reveal matter, texture, and reliefs. […] creativity and coherence, combined in a single shot. »
- Correction retenue : « Modern lenses (especially macro and fast lenses) reveal material, texture and relief. […] creativity and consistency, combined in a single photo session. » (même correction de fond que FR-35).

**EN-63** — faux ami · faux ami · mineur · [ajout]
- Extrait (FAQ) : « the macro lens remains essential to restore every detail without compromise. »
- Correction retenue : « the macro lens remains essential to render every detail without compromise. »

**EN-64** — « mis au point » rendu par « developed » · faux ami · majeur · [revue 34]
- Extrait (FAQ) : « Each point in the product is developed separately and then automatically merged. »
- Correction retenue : « The camera takes a series of images, shifting focus from one plane of the product to the next, then merges them automatically. » (même correction de fond que FR-38).

---

## Décompte

| Langue | Métadonnées | Corps | Total | dont bloquant | dont majeur | dont mineur | à valider |
|---|---|---|---|---|---|---|---|
| FR | 4 | 38 | 42 | 0 | 6 | 34 | 2 |
| EN | 6 | 64 | 70 | 7 | 19 | 43 | 1 |
| **Total** | **10** | **102** | **112** | **7** | **25** | **77** | **3** |

Les anomalies EN regroupent parfois plusieurs fautes d'une même phrase ; le volume réel de fautes EN reste proche de l'estimation de la revue (65).
