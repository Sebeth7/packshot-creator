# Anomalies annotées — famille 67e41233cb2c0c8643c00c89

Base : `01-TEXTE_ACTUEL.md` (texte servi le 01/10/2026, `main` `17fc0b3`), contrôlé contre le HTML des JSON `content/blog/fr/conseils-photo-le-cadrage-et-la-composition.json` et `content/blog/en/tips-photo-framing-composition.json`. Les extraits sont cités mot pour mot dans le rendu de `01` (le gras `**…**` et les collages de texte y sont ceux du HTML). Les espaces parasites de `families/67e41233….md` (« L' environnement », « " points forts " ») sont des artefacts de l'extraction, pas des anomalies : ils ont été vérifiés dans le HTML et écartés.

## Contrôle de la revue `reviews/67e41233cb2c0c8643c00c89.json`

- 36 anomalies dans la revue (11 FR, 25 EN), plus deux remarques (« Ce que nous venons de voir ne sont pas… » et le collage « ofinstinct »). **Toutes sont confirmées** contre `01` et le HTML ; **aucune n'est retirée**.
- Une gravité est relevée : l'alt « Photo cadrage composition » sur la page EN passe de mineur à **majeur** (alt dans une autre langue, ce que les consignes excluent).
- Points repris des autres rubriques de la revue (remarques, claims, titres) : 2 en FR (FR-03, FR-23), 5 en EN (EN-01 à EN-04, EN-43).
- Anomalies ajoutées par ce dossier : 20 en FR, 23 en EN (marquées « ajout »).
- Total : **FR 33** (3 transversales + 30), **EN 53** (2 transversales + 51). Gravité : FR 1 majeure, 32 mineures ; EN 16 majeures, 37 mineures.

Dans les corrections FR citées ici, les espaces insécables ne sont pas matérialisées ; le texte de référence est `04-PROPOSITION_FR.md`.

Gravité : **majeur** = sens faux, phrase incompréhensible, texte dans une autre langue, alt inexploitable ; **mineur** = typographie, style, calque compréhensible, métadonnée perfectible, claim à signaler.

---

## FR — /fr/blog/conseils-photo-le-cadrage-et-la-composition

### Transversales

**FR-T1 · Tout le texte et les métadonnées — ajout**
- Extrait actuel : `une question essentielle doit être posée :` (exemple ; aucune espace insécable dans `content`, `faqs`, `title`, `h1`, `metaTitle`, `description`)
- Catégorie : typographie
- Gravité : mineur
- Explication : les espaces avant « : ; ? ! » sont des espaces ordinaires ; la ponctuation peut se retrouver seule en début de ligne.
- Correction retenue : espaces insécables (U+00A0) avant « : ; ? ! » et à l'intérieur des guillemets, dans `04-PROPOSITION_FR.md` et les valeurs FR de `05`.

**FR-T2 · Corps — ajout**
- Extrait actuel : `(paragraphe vide)` ×4, plus un caractère ZWJ dans le gras du chapeau (`ressentir ? ⏎ **`)
- Catégorie : artefact Webflow
- Gravité : mineur
- Explication : quatre `<p>` ne contenant qu'un caractère ZWJ (U+200D) entourent les deux images ; cinq ZWJ au total.
- Correction retenue : paragraphes vides et ZWJ non repris.

**FR-T3 · Intertitres — ajout**
- Extrait actuel : `### 1. **L'intention avant la technique : définissez votre message visuel**` (même gras dans les six intertitres numérotés)
- Catégorie : artefact Webflow
- Gravité : mineur
- Explication : `<h2>1. <strong>…</strong></h2>` ; le gras dans un intertitre est redondant et le numéro reste hors du gras.
- Correction retenue : intertitres sans gras.

### Métadonnées

**FR-01 · `metaTitle` — revue, confirmée**
- Extrait actuel : `Photographie Produit : 6 Règles de Cadrage pour des Images Qui Convertissent`
- Catégorie : Title Case, longueur, claim
- Gravité : mineur
- Explication : majuscules anglaises appliquées au français ; 76 caractères, tronqué en SERP ; c'est aussi le `<title>` servi. « 6 règles » ne correspond pas au corps (la 6e section est un renvoi produit) ; « qui convertissent » est une promesse sans donnée.
- Correction retenue : `Cadrage et composition en photo produit : règles et conseils` (60 car.). Claims retirés, signalés dans `06`, point 2.

**FR-02 · `description` — revue, confirmée et complétée**
- Extrait actuel : `Maîtrisez l'art de la photographie produit grâce à nos 6 conseils essentiels de cadrage et composition. Découvrez comment transformer vos images e-commerce en véritables outils de vente, qu'importe votre équipement. Guide pratique pour photographes et e-commerçants.`
- Catégorie : longueur, claim, registre
- Gravité : mineur
- Explication : 266 caractères ; « 6 conseils essentiels » (même écart que FR-01) ; « véritables outils de vente » (promesse) ; « qu'importe » est littéraire et mal venu ici (« quel que soit ») ; « Maîtrisez l'art » est une emphase creuse.
- Correction retenue : `Intention, cadre plein ou aéré, règle des tiers, mouvement : nos conseils de cadrage et de composition en photo produit, quel que soit votre équipement.` (152 car.). Claims retirés, `06`, point 2.

**FR-03 · `date` — revue (remarques), confirmée**
- Extrait actuel : `date : 2017-09-16T00:00:00.000Z ; dateModified : None`
- Catégorie : date incohérente
- Gravité : mineur
- Explication : l'item Webflow a été créé le 26/03/2025 (horodatage ObjectId `67e41233`, inférence), les deux images du corps datent des 20 et 26/03/2025, et le corps cite l'Alphashot Pro G2. Une date de 2017 est donc au mieux celle d'une version antérieure disparue.
- Correction retenue : aucune dans la proposition ; décision `06`, point 9.

**FR-04 · `author` — ajout (information)**
- Extrait actuel : `auteur : PackshotCreator`
- Catégorie : attribution
- Gravité : mineur
- Explication : l'import Webflow portait « Laurent Wainberg » ; remplacé par `8ae45f63` (12/06/2026), commit qui revendique un choix délibéré (« cohérence E-E-A-T avec le schema Organization »). Aucun nom de personne n'a été remplacé dans le corps. Le remplacement n'est donc pas établi comme fautif et la proposition ne le rétablit pas.
- Correction retenue : aucune ; décision `06`, point 10.

**FR-05 · Image principale `/images/blog/67e40ec4413f376fe0ddd41c.avif` — ajout**
- Extrait actuel : alt servi = `Conseils photo : cadrage et composition pour vendre` (le `h1`, imposé par le gabarit)
- Catégorie : alt, pertinence de l'image
- Gravité : mineur
- Explication : l'image montre un flacon de parfum rose cuivré gravé « LOST IN YOU » sur fond blanc ; l'alt ne la décrit pas et l'image n'illustre pas le cadrage. Aucun champ d'alt n'existe pour l'image principale.
- Correction retenue : aucune dans le contenu (gabarit commun, rayon large) ; alt descriptif préparé dans `05` ; décision `06`, point 11.

### Corps

**FR-06 · Chapeau — ajout**
- Extrait actuel : `**Pourquoi prenez-vous cette photo ?**Autrement dit,`
- Catégorie : typographie (espace manquante)
- Gravité : mineur
- Explication : dans le HTML, `</strong>Autrement dit` : le texte s'affiche « photo ?Autrement dit ».
- Correction retenue : `**pourquoi prenez-vous cette photo ?** Autrement dit,`

**FR-07 · Chapeau — ajout**
- Extrait actuel : `une question essentielle doit être posée :`
- Catégorie : style
- Gravité : mineur
- Explication : passif impersonnel, alors que tout l'article s'adresse au lecteur.
- Correction retenue : `posez-vous une question essentielle :`

**FR-08 · Chapeau — ajout**
- Extrait actuel : `C'est encore plus vrai dans le cadre de la **photographie produit**`
- Catégorie : style
- Gravité : mineur
- Explication : « dans le cadre de » alourdit la phrase et crée un écho involontaire avec le « cadre » photographique, sujet de l'article.
- Correction retenue : `C'est encore plus vrai en **photographie produit**`

**FR-09 · Section 1, liste — ajout**
- Extrait actuel : `plutôt **montrer une scène globale** ?`
- Catégorie : style (calque probable de « global scene »)
- Gravité : mineur
- Explication : « scène d'ensemble » est l'expression usuelle.
- Correction retenue : `plutôt **montrer une scène d'ensemble** ?`

**FR-10 · Section 1, image `/images/blog/67e40e909cefed03b0448611.avif` — revue, confirmée**
- Extrait actuel : `![__wf_reserved_inherit](/images/blog/67e40e909cefed03b0448611.avif)`
- Catégorie : alt
- Gravité : **majeur**
- Explication : valeur réservée Webflow, servie telle quelle (aucune substitution dans `lib/`, `components/`, `app/`).
- Correction retenue : `La même paire de bottines bleues photographiée deux fois : sur fond bleu uni, puis sur fond clair avec une feuille verte et des lunettes de soleil` (image examinée).

**FR-11 · Section 2 — revue, confirmée**
- Extrait actuel : `qui l'entoure.Quelques repères utiles :`
- Catégorie : typographie (espace manquante)
- Gravité : mineur
- Explication : point collé à la phrase suivante dans le HTML.
- Correction retenue : `qui l'entoure. Quelques repères utiles :`

**FR-12 · Sections 2 et 5 — ajout**
- Extrait actuel : `(ex : vignettes e-commerce)` ; `(ex : un pas, une rotation)`
- Catégorie : typographie
- Gravité : mineur
- Explication : l'abréviation s'écrit « ex. » ; ici « par exemple » se lit mieux, et la seconde parenthèse n'en a pas besoin (sa jumelle « (un regard, une orientation) » n'en a pas).
- Correction retenue : `(par exemple, les vignettes e-commerce)` ; `(un pas, une rotation)`

**FR-13 · Section 3, trois amorces — revue, confirmée**
- Extrait actuel : `➤ **Décentrer le sujet**C'est une règle` ; `➤ **Laissez de l'espace** autour du sujetÉvitez de coller` ; `➤ **Ne pas suivre les axes centraux**Sauf exception`
- Catégorie : typographie, cohérence
- Gravité : mineur
- Explication : chaque amorce est collée au texte qui suit ; la deuxième n'est qu'à moitié en gras et passe à l'impératif, alors que les deux autres sont à l'infinitif.
- Correction retenue : `➤ **Décentrer le sujet.** C'est…` ; `➤ **Laisser de l'espace autour du sujet.** Évitez…` ; `➤ **Ne pas suivre les axes centraux.** Sauf…`

**FR-14 · Section 3 — ajout**
- Extrait actuel : `Évitez de coller l'objet aux bordures.`
- Catégorie : lexique
- Gravité : mineur
- Explication : une bordure est un ornement ou une limite décorative ; en photo on parle des bords du cadre.
- Correction retenue : `Évitez de coller l'objet aux bords du cadre.`

**FR-15 · Section 3 — ajout**
- Extrait actuel : `Laissez-lui respirer visuellement`
- Catégorie : grammaire
- Gravité : mineur
- Explication : « laisser quelqu'un respirer » se construit avec un complément direct : « laissez-le respirer ».
- Correction retenue : `Laissez-le respirer visuellement`

**FR-16 · Sections 3 et 4 — revue, confirmée**
- Extrait actuel : `s'il "regarde" dans une direction` ; `sont appelés "**points forts**"`
- Catégorie : typographie (guillemets)
- Gravité : mineur
- Explication : guillemets droits anglais au lieu des guillemets français.
- Correction retenue : `s'il « regarde » dans une direction` ; `« **points forts** »`

**FR-17 · Section 3 — ajout**
- Extrait actuel : `Sauf exception esthétique volontaire, mieux vaut ne pas aligner les éléments importants sur les axes verticaux ou horizontaux du centre du cadre.`
- Catégorie : style, précision
- Gravité : mineur
- Explication : « exception volontaire » est flou ; il n'y a qu'un axe vertical et qu'un axe horizontal centraux, et « axes du centre » est maladroit.
- Correction retenue : `Sauf choix esthétique délibéré, mieux vaut ne pas aligner les éléments importants sur l'axe vertical ou l'axe horizontal qui passent par le centre du cadre.`

**FR-18 · Section 4 — ajout**
- Extrait actuel : `à l'aide de deux lignes horizontales et deux verticales. ⏎ Les **points d'intersection** de ces lignes sont appelés "**points forts**".`
- Catégorie : clarté
- Gravité : mineur
- Explication : l'exemple suivant parle de « ligne de force » sans que le terme ait été défini dans le texte ; il figure seulement sur le schéma (« LIGNES DE FORCE »). La définition est reprise du schéma, rien n'est ajouté.
- Correction retenue : `à l'aide de deux lignes horizontales et de deux lignes verticales.` puis `Ces lignes sont appelées « **lignes de force** », et leurs **points d'intersection**, « **points forts** ».`

**FR-19 · Section 4, image `/images/blog/67dbae6aaff27501162f332a.avif` — revue, confirmée**
- Extrait actuel : `![Photo cadrage composition](/images/blog/67dbae6aaff27501162f332a.avif)`
- Catégorie : alt
- Gravité : mineur
- Explication : mots-clés juxtaposés ; l'image n'est d'ailleurs pas une photo mais un schéma de la règle des tiers.
- Correction retenue : `Schéma de la règle des tiers : un cadre divisé en neuf parties égales, avec les lignes de force et les points forts situés à leurs intersections`

**FR-20 · Section 4, exemples — revue, confirmée**
- Extrait actuel : `Pour un produit tenu en main, faites en sorte que le **regard du modèle** tombe sur l'un des points forts.`
- Catégorie : ambiguïté
- Gravité : mineur
- Explication : se lit comme la direction du regard, alors que le conseil classique vise la position des yeux sur un point fort.
- Correction retenue : `Pour un produit tenu en main, placez les **yeux du modèle** sur l'un des points forts.` marqué `[À VALIDER]`, `06`, point 6.

**FR-21 · Section 6 — revue, confirmée et complétée**
- Extrait actuel : `Découvrez par exemple comment une boutique en ligne peut photographier ses chaussures avec un **studio photo interne** pour garantir un rendu **homogène**, **cohérent** et **percutant**.`
- Catégorie : lien manquant, claim
- Gravité : mineur
- Explication : « Découvrez » annonce un contenu, mais aucun lien ne suit ; « garantir » est une promesse attachée au studio interne, sans source.
- Correction retenue : lien vers `/fr/blog/la-chaussure-un-secteur-incontournable-du-e-commerce-dynamise-avec-packshotcreator` (article « Photographie de chaussures pour l'e-commerce en interne ») sur « photographier ses chaussures avec un studio photo interne » ; « garantir » → « obtenir ». Marqué `[À VALIDER]`, variante sans lien fournie ; `06`, points 4 et 5.

**FR-22 · Conclusion, intertitre — revue, confirmée**
- Extrait actuel : `### Conclusion : Règles… ou repères ?`
- Catégorie : majuscule
- Gravité : mineur
- Explication : pas de majuscule après le deux-points en français.
- Correction retenue : `Conclusion : règles… ou repères ?`

**FR-23 · Conclusion — revue (remarques), confirmée**
- Extrait actuel : `Ce que nous venons de voir ne sont pas des lois figées`
- Catégorie : grammaire
- Gravité : mineur
- Explication : sujet singulier (« ce que… ») avec un verbe au pluriel ; la reprise par « ce » est nécessaire.
- Correction retenue : `Ce que nous venons de voir, ce ne sont pas des lois figées`

**FR-24 · Conclusion, dernière phrase — ajout**
- Extrait actuel : `Avant de penser au cadrage ou à la composition de vos photos, demandez-vous pourquoi vous voulez prendre cette photo, ce que vous voulez montrer, raconter ou faire ressentir avec cette dernière.`
- Catégorie : style
- Gravité : mineur
- Explication : « vos photos » puis « cette photo » ; « avec cette dernière » alourdit la chute ; la phrase répète le chapeau sans le signaler.
- Correction retenue : `Avant de penser au cadrage ou à la composition, demandez-vous donc pourquoi vous prenez cette photo : ce que vous voulez montrer, raconter ou faire ressentir.`

### FAQ

**FR-25 · FAQ 1 — ajout**
- Extrait actuel : `Pour les petits objets nécessitant des détails (bijoux, montres)` ; `reculez suffisamment pour capturer l'ensemble` ; `L'essentiel est de maintenir la netteté`
- Catégorie : style (anglicisme « capturer »)
- Gravité : mineur
- Explication : un objet ne « nécessite » pas des détails ; « capturer » calque l'anglais ; « maintenir » est raide.
- Correction retenue : `Pour les petits objets dont il faut montrer les détails` ; `reculez suffisamment pour cadrer l'ensemble` ; `L'essentiel est de garder la netteté`

**FR-26 · FAQ 2 — ajout**
- Extrait actuel : `Non, bien que le fond blanc soit standard pour les sites e-commerce, d'autres options peuvent valoriser votre produit.` ; `L'important est la cohérence à travers votre catalogue.`
- Catégorie : anglicisme
- Gravité : mineur
- Explication : « à travers » calque « across » ; la concessive alourdit la réponse.
- Correction retenue : `Non. Le fond blanc est la norme sur les sites e-commerce, mais d'autres options peuvent valoriser votre produit.` ; `L'important est la cohérence sur l'ensemble de votre catalogue.`

**FR-27 · FAQ 3 — revue, confirmée et complétée**
- Extrait actuel : `utilisez un éclairage diffus avec des softbox ou des parapluies` ; `N'hésitez pas à utiliser des polariseurs pour éliminer les reflets spéculaires.`
- Catégorie : terminologie, nuance technique
- Gravité : mineur
- Explication : le terme usuel est « filtre polarisant » ; « éliminer » est trop fort, notamment pour les objets métalliques cités dans la question. « softbox » gagne à être explicité.
- Correction retenue : `avec des boîtes à lumière (softbox) ou des parapluies` ; `Un filtre polarisant peut aussi atténuer certains reflets spéculaires.` Marqué `[À VALIDER]`, `06`, point 7. Aucune précision technique nouvelle n'est ajoutée.

**FR-28 · FAQ 3, JSON — ajout**
- Extrait actuel : réponse terminée par un saut de ligne (`…reflets spéculaires.\n` dans `faqs[2].answer`)
- Catégorie : artefact
- Gravité : mineur
- Explication : caractère parasite repris dans le JSON-LD `FAQPage`.
- Correction retenue : supprimé.

**FR-29 · FAQ 4 — ajout**
- Extrait actuel : `une faible sensibilité ISO (100-200)` ; `ajustez votre balance des blancs selon votre éclairage pour des couleurs fidèles` ; `pour plus de flexibilité en post-traitement`
- Catégorie : typographie, style
- Gravité : mineur
- Explication : intervalle en toutes lettres dans un texte courant ; « flexibilité » calque « flexibility » (« latitude » est le terme du métier).
- Correction retenue : `(100 à 200)` ; `ajustez la balance des blancs selon votre éclairage pour obtenir des couleurs fidèles` ; `pour plus de latitude en post-traitement`

**FR-30 · FAQ 5 — ajout**
- Extrait actuel : `ses caractéristiques et détails` ; `packshots pour informer, lifestyle pour inspirer et créer une connexion émotionnelle.`
- Catégorie : anglicisme, syntaxe
- Gravité : mineur
- Explication : « connexion émotionnelle » calque « emotional connection » ; déterminants manquants.
- Correction retenue : `ses caractéristiques et ses détails` ; `des packshots pour informer, des images lifestyle pour inspirer et créer un lien émotionnel.`

---

## EN — /en/blog/tips-photo-framing-composition

Constat d'ensemble : le corps EN est une traduction automatique du FR (déterminants français, majuscules de segments recollés, contresens de métier). La FAQ et les métadonnées sont en anglais correct. Le corps est **retraduit intégralement** depuis `04-PROPOSITION_FR.md` ; chaque anomalie ci-dessous est corrigée par cette retraduction, la colonne « correction retenue » donne le texte qui la remplace.

### Transversales

**EN-T1 · Corps — ajout**
- Extrait actuel : `(paragraphe vide)` ×4, ZWJ dans le gras du chapeau
- Catégorie : artefact Webflow
- Gravité : mineur
- Explication : comme FR-T2.
- Correction retenue : non repris.

**EN-T2 · Intertitres — ajout**
- Extrait actuel : `### 1. **Intent over technique: define your visual message**` (même gras dans les six intertitres numérotés)
- Catégorie : artefact Webflow
- Gravité : mineur
- Explication : comme FR-T3.
- Correction retenue : intertitres sans gras.

### Métadonnées

**EN-01 · `h1` — revue (titre_h1_meta), confirmée**
- Extrait actuel : `Photo tips: framing and composing to sell`
- Catégorie : idiomatisme, SEO
- Gravité : mineur
- Explication : « composing to sell » n'est pas naturel ; le titre visible ne porte pas « product photography », alors que les requêtes de la page le contiennent.
- Correction retenue : `Product photography composition: framing rules that help you sell` (variante minimale dans `05`) ; `06`, point 3.

**EN-02 · `metaTitle` — revue (claims), confirmée**
- Extrait actuel : `Product Photography: 6 Framing Rules for Images That Convert`
- Catégorie : claim
- Gravité : mineur
- Explication : même écart « 6 » qu'en FR, promesse « That Convert » sans donnée. L'anglais est correct.
- Correction retenue : `Product Photography Rules: Framing and Composition Tips` (55 car.), ou maintien de l'actuel ; `06`, points 2 et 3.

**EN-03 · `description` — revue (titre_h1_meta), confirmée**
- Extrait actuel : `Master the art of product photography with our 6 essential framing and composition tips. Discover how to transform your e-commerce images into real sales tools, regardless of your equipment. Practical guide for photographers and e-retailers.`
- Catégorie : longueur, claim
- Gravité : mineur
- Explication : 241 caractères ; mêmes claims qu'en FR.
- Correction retenue : `Product photography rules for framing and composition: start with intent, fill the frame or leave space, use the rule of thirds and create movement.` (148 car.)

**EN-04 · `date`, `author`, image principale — revue et ajout**
- Extrait actuel : `date : 2017-09-16T00:00:00.000Z` ; `auteur : PackshotCreator` ; alt de l'image principale = `Photo tips: framing and composing to sell`
- Catégorie : date, attribution, alt
- Gravité : mineur
- Explication : comme FR-03, FR-04, FR-05. L'alt de l'image principale suivra le `h1` retenu.
- Correction retenue : aucune dans le contenu ; `06`, points 9, 10 et 11.

### Corps

**EN-05 · Chapeau — ajout**
- Extrait actuel : `**Why are you taking this photo?**In other words,`
- Catégorie : typographie (espace manquante)
- Gravité : mineur
- Explication : `</strong>In other words` dans le HTML : affiché « photo?In other words ».
- Correction retenue : `**why are you taking this photo?** In other words,`

**EN-06 · Chapeau — revue, confirmée**
- Extrait actuel : `In other words, **What do you want to show, tell, or make people feel?`
- Catégorie : traduction automatique (majuscule)
- Gravité : mineur
- Explication : majuscule au milieu de la phrase.
- Correction retenue : `In other words, **what do you want to show, tell or make people feel?**`

**EN-07 · Chapeau — ajout**
- Extrait actuel : `throughout the shooting`
- Catégorie : calque (« la prise de vue »)
- Gravité : mineur
- Explication : en anglais, « the shoot ».
- Correction retenue : `throughout the shoot`

**EN-08 · Chapeau — revue, confirmée**
- Extrait actuel : `This is even more true in the context of **Product photography**, where each image should **Capturing attention**, **To build trust**... and **sell**.`
- Catégorie : traduction automatique
- Gravité : **majeur**
- Explication : segments recollés (« should Capturing », « To build »), majuscules parasites, phrase agrammaticale.
- Correction retenue : `This is even more true in **product photography**, where every image has to **grab attention**, **build trust**… and **sell**.`

**EN-09 · Section 1, liste — revue, confirmée**
- Extrait actuel : `**What is the main topic?**`
- Catégorie : faux ami
- Gravité : mineur
- Explication : « sujet » photographique = « subject », pas « topic ».
- Correction retenue : `**What is the main subject?**`

**EN-10 · Section 1, liste — ajout**
- Extrait actuel : `**What is the context** to be included or to be excluded?`
- Catégorie : calque
- Gravité : mineur
- Explication : double passif lourd, calqué sur « à intégrer ou à exclure ».
- Correction retenue : `**What context** should you include or leave out?`

**EN-11 · Section 1, liste — revue, confirmée**
- Extrait actuel : `Is it necessary **Valuing details** Or rather **show a global scene** ?`
- Catégorie : traduction automatique
- Gravité : **majeur**
- Explication : phrase agrammaticale, majuscules parasites, espace française avant « ? ».
- Correction retenue : `Should you **highlight details** or **show the whole scene**?`

**EN-12 · Section 1, liste — ajout**
- Extrait actuel : `**How should the observer feel** looking at this image?`
- Catégorie : calque
- Gravité : mineur
- Explication : « observer » calque « observateur » ; « viewer » est le terme usuel.
- Correction retenue : `**What should the viewer feel** when looking at this image?`

**EN-13 · Section 1, image `/images/blog/67e40e909cefed03b0448611.avif` — revue, confirmée**
- Extrait actuel : `![__wf_reserved_inherit](/images/blog/67e40e909cefed03b0448611.avif)`
- Catégorie : alt
- Gravité : **majeur**
- Explication : comme FR-10.
- Correction retenue : `The same pair of blue lace-up boots photographed twice: on a plain blue background, then on a light background with a green leaf and sunglasses`

**EN-14 · Section 1, exemples — ajout**
- Extrait actuel : `A luxury piece of jewelry with meticulous finishes?`
- Catégorie : calque
- Gravité : mineur
- Explication : « finitions soignées » rendu mot à mot ; « finishes » au pluriel sonne faux.
- Correction retenue : `A luxury piece of jewelry with a fine finish?`

**EN-15 · Section 1, exemples — ajout**
- Extrait actuel : `→ **Leave space** around to tell a story.`
- Catégorie : syntaxe
- Gravité : mineur
- Explication : « around » sans complément.
- Correction retenue : `→ **Leave space** around them to tell a story.`

**EN-16 · Section 1, exemples — revue, confirmée**
- Extrait actuel : `A carried bag?`
- Catégorie : calque
- Gravité : mineur
- Explication : « Un sac porté » rendu mot à mot.
- Correction retenue : `A bag being worn?`

**EN-17 · Section 2, intertitre — revue, confirmée**
- Extrait actuel : `### 2. **Fill or aerate: find the right balance for your product**`
- Catégorie : calque
- Gravité : mineur
- Explication : « aerate » (aérer) a un sens technique ou agricole en anglais.
- Correction retenue : `## 2. Fill the frame or leave space: find the right balance for your product`

**EN-18 · Section 2 — revue, confirmée**
- Extrait actuel : `One of the first compositional choices is to decide on **Relationship between subject and space** that surrounds it.Some useful landmarks:`
- Catégorie : calque, typographie
- Gravité : **majeur**
- Explication : article manquant, majuscule parasite, point collé ; « landmarks » calque « repères ».
- Correction retenue : `One of the first composition choices is deciding on the **relationship between the subject and the space** around it. A few useful guidelines:`

**EN-19 · Section 2, amorces de listes — ajout**
- Extrait actuel : `**Fill the frame** If:` ; `**Do not fill the frame** If:`
- Catégorie : traduction automatique (majuscule)
- Gravité : mineur
- Explication : « If » en milieu de phrase.
- Correction retenue : `**Fill the frame** if:` ; `**Don't fill the frame** if:`

**EN-20 · Section 2, liste — ajout**
- Extrait actuel : `You want to create a **strong relationship with the observer**`
- Catégorie : calque
- Gravité : mineur
- Explication : « relationship with the observer » est un mot à mot.
- Correction retenue : `You want to create a **strong connection with the viewer**`

**EN-21 · Section 2, liste — revue, confirmée**
- Extrait actuel : `You are looking to **maximizing visual impact** in a small space (e.g. e-commerce stickers)`
- Catégorie : faux ami, grammaire
- Gravité : **majeur**
- Explication : « vignettes » (miniatures) rendu par « stickers » (autocollants) : contresens ; « looking to maximizing » agrammatical.
- Correction retenue : `You want to **maximize visual impact** in a small space (for example, e-commerce thumbnails)`

**EN-22 · Section 2, liste — revue, confirmée**
- Extrait actuel : `THE**environment** Or the **staging** Give meaning to the image`
- Catégorie : incompréhensible
- Gravité : **majeur**
- Explication : « THE » collé, majuscules parasites, accord faux.
- Correction retenue : `The **setting** or the **styling** is what gives the image its meaning`

**EN-23 · Section 2, liste — revue, confirmée**
- Extrait actuel : `You want **Suggest a universe or an atmosphere**`
- Catégorie : traduction automatique, calque
- Gravité : **majeur**
- Explication : « to » manquant ; « universe » calque « univers ».
- Correction retenue : `You want to **suggest a world or a mood**`

**EN-24 · Section 2, liste — revue, confirmée**
- Extrait actuel : `The **movement** Or the **View of the subject** Ask for space to express yourself`
- Catégorie : incompréhensible
- Gravité : **majeur**
- Explication : « View » pour « regard », « yourself » au lieu du sujet, majuscules parasites.
- Correction retenue : `The subject's **movement** or **gaze** needs room to express itself`

**EN-25 · Section 3, intertitre — revue, confirmée**
- Extrait actuel : `### 3. **The composition at the service of your product**`
- Catégorie : calque
- Gravité : mineur
- Explication : « au service de » rendu mot à mot.
- Correction retenue : `## 3. Composition that serves your product`

**EN-26 · Section 3 — revue, confirmée**
- Extrait actuel : `➤ **Decentralize the subject**It's a basic rule of photography: avoid placing the subject in the center of the image. A subject that is too focused often gives a static, frozen impression.`
- Catégorie : faux ami, contresens
- Gravité : **majeur**
- Explication : « Decentralize » ne s'emploie pas en composition ; « too focused » (mise au point) au lieu de « trop centré » ; amorce collée.
- Correction retenue : `➤ **Off-center the subject.** It's a basic rule of photography: avoid placing the subject in the center of the frame. A subject that is too centered often looks static, even frozen.`

**EN-27 · Section 3 — revue, confirmée**
- Extrait actuel : `➤ **Leave space** around the subjectAvoid sticking the object to the borders. Let him breathe visually, especially if he is in motion or “looking” in one direction.`
- Catégorie : traduction automatique
- Gravité : mineur
- Explication : texte collé ; « him », « he » pour un objet ; « sticking to the borders » calque.
- Correction retenue : `➤ **Leave space around the subject.** Don't push the object up against the edges of the frame. Give it room to breathe, especially if it is moving or “looking” in a particular direction.`

**EN-28 · Section 3 — ajout**
- Extrait actuel : `➤ **Do not follow the central axes**Except for voluntary aesthetic exceptions, it is better not to align important elements on the vertical or horizontal axes of the center of the frame.`
- Catégorie : calque, typographie
- Gravité : mineur
- Explication : amorce collée ; « voluntary aesthetic exceptions » est un mot à mot opaque.
- Correction retenue : `➤ **Stay off the central axes.** Unless you are deliberately going for that look, avoid lining up key elements on the vertical or horizontal axis that runs through the center of the frame.`

**EN-29 · Section 4 — revue, confirmée**
- Extrait actuel : `La **Rule of thirds** is a classical method of visual composition, inherited from painting.`
- Catégorie : mélange linguistique
- Gravité : **majeur**
- Explication : déterminant français « La ».
- Correction retenue : `The **rule of thirds** is a classic composition method inherited from painting.`

**EN-30 · Section 4 — revue, confirmée**
- Extrait actuel : `Les **intersection points** of these lines are called”**strengths**“.`
- Catégorie : mélange linguistique, contresens
- Gravité : **majeur**
- Explication : déterminant français « Les » ; « points forts » rendu par « strengths » (qualités) ; guillemets inversés et collés.
- Correction retenue : `These are the **thirds lines**, and the **points where they intersect** are called **power points**.` (la définition des lignes suit FR-18)

**EN-31 · Section 4, image `/images/blog/67dbae6aaff27501162f332a.avif` — revue, confirmée, gravité relevée**
- Extrait actuel : `![Photo cadrage composition](/images/blog/67dbae6aaff27501162f332a.avif)`
- Catégorie : alt dans une autre langue
- Gravité : **majeur** (mineur dans la revue)
- Explication : alt français sur la page anglaise, fait de mots-clés.
- Correction retenue : `Rule of thirds diagram: a frame divided into nine equal parts, with the thirds lines and the power points where they intersect`

**EN-32 · Section 4, contenu de l'image — ajout**
- Extrait actuel : libellés incrustés dans l'image : « LIGNES DE FORCE », « POINTS FORTS »
- Catégorie : image dans une autre langue
- Gravité : mineur
- Explication : le schéma affiché sur la page anglaise est en français ; le texte ne peut pas le corriger.
- Correction retenue : aucune (`src` conservé) ; `06`, point 12.

**EN-33 · Section 4, exemples — ajout**
- Extrait actuel : `place the horizon over the **lower or upper third**, never in the center.`
- Catégorie : préposition
- Gravité : mineur
- Explication : « over » change le sens (au-dessus de) ; « on ».
- Correction retenue : `place the horizon on the **lower or upper third**, never in the center.`

**EN-34 · Section 4, exemples — revue, confirmée et complétée**
- Extrait actuel : `For a packshot of glasses, position the lenses on a **Line of force**, and not right in the center of the image.`
- Catégorie : faux ami, ambiguïté
- Gravité : mineur
- Explication : « Line of force » (terme de physique) rendu mot à mot ; « glasses » peut désigner des verres à boire.
- Correction retenue : `For an eyewear packshot, position the lenses on one of the **thirds lines** rather than right in the center of the image.`

**EN-35 · Section 4, exemples — revue, confirmée**
- Extrait actuel : `For a hand-held product, ensure that the **Model look** falls on one of the highlights.`
- Catégorie : faux ami, contresens
- Gravité : **majeur**
- Explication : « highlights » = hautes lumières en photographie, pas les points forts ; « Model look » calque « regard du modèle ».
- Correction retenue : `For a hand-held product, place the **model's eyes** on one of the power points.` marqué `[À VALIDER]` comme FR-20.

**EN-36 · Section 5 — ajout**
- Extrait actuel : `Even in a fixed packshot,` ; `This creates a **visual dynamics**.`
- Catégorie : calque, grammaire
- Gravité : mineur
- Explication : « fixed » pour « fixe » (on dit « still ») ; « a visual dynamics » agrammatical.
- Correction retenue : `Even in a still packshot,` ; `This creates **visual momentum**.`

**EN-37 · Section 5 — revue, confirmée**
- Extrait actuel : `Let the movement be **real** (e.g. one step, one rotation) or **suggested** (a look, an orientation), he must have space to express himself in the image.`
- Catégorie : traduction automatique
- Gravité : **majeur**
- Explication : « Que le mouvement soit » rendu par l'impératif « Let » ; « he… himself » renvoie au mouvement.
- Correction retenue : `Whether the movement is **real** (a step, a rotation) or **implied** (a glance, an orientation), it needs room to play out in the image.`

**EN-38 · Section 6, intertitre — revue, confirmée**
- Extrait actuel : `### 6. **From the pro studio to the internal solution: accessible quality**`
- Catégorie : calque
- Gravité : mineur
- Explication : « internal solution » calque « solution interne ».
- Correction retenue : `## 6. From pro studio to in-house setup: quality within reach`

**EN-39 · Section 6 — ajout**
- Extrait actuel : `All of these rules also apply to [**Packshot photography**](/en/blog/packshot-photography-guide-why-make-product-packshots), even automated.`
- Catégorie : majuscule, syntaxe
- Gravité : mineur
- Explication : majuscule parasite dans l'ancre ; « even automated » sans support.
- Correction retenue : `All of these rules also apply to [**packshot photography**](/en/blog/packshot-photography-guide-why-make-product-packshots), even when it's automated.` (même cible)

**EN-40 · Section 6 — ajout**
- Extrait actuel : `Whether you are using a **e-commerce photo studio** Like the[Alphashot Pro G2](/en/studio-photo/alphashot-pro-g2)`
- Catégorie : grammaire, typographie
- Gravité : mineur
- Explication : « a e-commerce » ; « Like » en majuscule ; espace placée dans le lien (`Like the<a> Alphashot…`).
- Correction retenue : `Whether you use an **e-commerce photo studio** like the [Alphashot Pro G2](/en/studio-photo/alphashot-pro-g2)` (même cible)

**EN-41 · Section 6 — revue, confirmée et complétée**
- Extrait actuel : `For example, find out how an online store can photograph its shoes with a **internal photo studio** to guarantee a result **homogenous**, **consistent** and **hard-hitting**.`
- Catégorie : traduction automatique, lien manquant, claim
- Gravité : **majeur**
- Explication : « a internal » ; ordre des mots français ; « internal » au lieu de « in-house » ; « guarantee » (claim) ; aucun lien malgré « find out how ».
- Correction retenue : `See, for example, how an online store can [photograph its shoes with an **in-house photo studio**](/en/blog/shoes-the-unmissable-e-business-sector-boosted-with-packshotcreator) to get **uniform**, **consistent** and **striking** results.` marqué `[À VALIDER]` ; `06`, points 4 et 5.

**EN-42 · Conclusion — revue, confirmée**
- Extrait actuel : `What we have just seen are not fixed laws, but **landmarks** to help you structure your shots.`
- Catégorie : calque
- Gravité : mineur
- Explication : « landmarks » calque « repères ».
- Correction retenue : `The points we've just covered aren't fixed laws but **guidelines** to help you structure your shots.`

**EN-43 · Conclusion — revue (remarque), confirmée**
- Extrait actuel : `Photography is also a matter of**instinct**.`
- Catégorie : typographie (espace manquante)
- Gravité : mineur
- Explication : affiché « ofinstinct ».
- Correction retenue : `Photography is also a matter of **instinct**.`

**EN-44 · Conclusion — revue, confirmée**
- Extrait actuel : `If another composition seems more **aesthetics**, plus **true to your visual message**, make that choice.`
- Catégorie : mélange linguistique
- Gravité : **majeur**
- Explication : « plus » laissé en français ; « more aesthetics » agrammatical.
- Correction retenue : `If another composition looks more **aesthetically pleasing** or **truer to your visual message**, go with it.`

**EN-45 · Conclusion — ajout**
- Extrait actuel : `and with **The end use** of the image.`
- Catégorie : majuscule
- Gravité : mineur
- Explication : « The » en milieu de phrase.
- Correction retenue : `and with the **end use** of the image.`

**EN-46 · Conclusion, dernière phrase — ajout**
- Extrait actuel : `Before thinking about framing or composing your photos, ask yourself why you want to take this photo, what you want to show, tell, or make people feel with it.`
- Catégorie : style
- Gravité : mineur
- Explication : « your photos » puis « this photo » ; « make people feel with it » maladroit (même correction que FR-24).
- Correction retenue : `So before you think about framing or composition, ask yourself why you're taking this photo: what do you want to show, tell or make people feel?`

### FAQ

**EN-47 · FAQ 1 — ajout**
- Extrait actuel : `For small items that require detail (jewelry, watches), get closer using a macro lens.` ; `go back enough to capture the whole while maintaining good definition. The main thing is to maintain sharpness`
- Catégorie : style
- Gravité : mineur
- Explication : « go back enough » n'est pas idiomatique ; « maintain » répété.
- Correction retenue : `For small items whose details you need to show (jewelry, watches), move in close with a macro lens.` ; `step back far enough to capture the whole item while keeping good definition. The key is to keep the important elements sharp`

**EN-48 · FAQ 2 — ajout**
- Extrait actuel : `No, although the white background is standard for e-commerce sites,` ; `The background must be chosen according to your target` ; `A background that is contextual can tell a story`
- Catégorie : style
- Gravité : mineur
- Explication : tournures calquées sur le français, lourdes en anglais.
- Correction retenue : `No. A white background is the standard on e-commerce sites,` ; `Choose the background based on your target audience` ; `a contextual background can tell a story`

**EN-49 · FAQ 3 — ajout (même point que FR-27)**
- Extrait actuel : `For shiny products (jewelry, glasses, metal objects)` ; `a diffusion tent may be required. Feel free to use polarizers to eliminate specular reflections.`
- Catégorie : nuance technique, ambiguïté
- Gravité : mineur
- Explication : « glasses » ambigu (lunettes) ; « eliminate » trop fort ; « light tent » est le terme courant.
- Correction retenue : `(jewelry, glassware, metal objects)` ; `you may need a light tent. A polarizing filter can also reduce some specular reflections.` marqué `[À VALIDER]`.

**EN-50 · FAQ 3, JSON — ajout**
- Extrait actuel : `…specular reflections.\n` dans `faqs[2].answer`
- Catégorie : artefact
- Gravité : mineur
- Explication : comme FR-28.
- Correction retenue : supprimé.

**EN-51 · FAQ 5 — ajout**
- Extrait actuel : `It is essential for e-commerce product sheets.` ; `shows the product in a situation of use`
- Catégorie : calque
- Gravité : mineur
- Explication : « product sheets » calque « fiches produits » (en anglais : « product pages ») ; « in a situation of use » calque « en situation d'utilisation ».
- Correction retenue : `It is essential for e-commerce product pages.` ; `shows the product in use`

---

## Anomalies de la revue retirées

Aucune. Les 36 anomalies de la revue sont exactes ; seule la gravité d'EN-31 est modifiée (voir plus haut).

## Claims touchés par la proposition (rappel, détail dans `06`)

| Réf. | Claim actuel | Traitement |
|---|---|---|
| FR-01, EN-02 | « 6 Règles de Cadrage… Qui Convertissent » / « 6 Framing Rules for Images That Convert » | Retiré du `metaTitle` (EN : maintien possible) |
| FR-02, EN-03 | « 6 conseils essentiels », « véritables outils de vente » / « 6 essential… tips », « real sales tools » | Retiré de la `description` |
| FR-21, EN-41 | « pour garantir un rendu… » / « to guarantee a result… » | Atténué : « obtenir » / « get » |
| FR-27, EN-49 | « polariseurs pour éliminer les reflets spéculaires » / « polarizers to eliminate specular reflections » | Atténué : « atténuer certains reflets » / « reduce some specular reflections » |
