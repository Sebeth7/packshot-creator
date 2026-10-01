# Anomalies annotées — famille 67d05174a21e0a8b35feb47e

Base : `01-TEXTE_ACTUEL.md` (main `17fc0b3`, 01/10/2026) et JSON source `content/blog/<langue>/<slug>.json`. Chaque anomalie de la revue `reviews/67d05174a21e0a8b35feb47e.json` a été vérifiée contre le texte servi ; les ajouts sont marqués « ajout », les anomalies infirmées sont regroupées en fin de fichier.

Les extraits sont reproduits mot pour mot entre accents graves (gras Markdown compris). Gravité : **majeur** = erreur visible qui nuit au sens, à la crédibilité ou au référencement ; **mineur** = faute de langue, de typographie ou de style ; **info** = constat sans faute de langue, à connaître avant publication.

Bilan : FR 37 anomalies (8 majeures, 29 mineures) et 3 constats ; EN 39 anomalies (9 majeures, 30 mineures) et 3 constats. 9 détections ou propositions de la revue infirmées ou écartées (dernière section).

---

## FR — /fr/blog/joailliers-nos-conseils-pour-reussir-vos-visuels-produits

### Métadonnées

**FR-01 · title** — mineur — titre / typographie (revue)
- Extrait : `Quelle technique pour photographier des bijoux - Tutoriel photo e-commerce`
- Explication : question sans point d'interrogation, trait d'union employé comme séparateur, majuscule après le séparateur. Ce champ n'est pas le `<title>` : il sert de titre aux cartes du blog et des articles liés (`app/[lang]/blog/page.tsx`, `components/blog/RelatedArticles.tsx`) et d'alt à leurs vignettes.
- Correction retenue : `Comment photographier des bijoux : tutoriel photo e-commerce` (reprend la requête « comment photographier des bijoux », la mieux classée de la page : position 9,8).

**FR-02 · h1** — majeur — Title Case (revue)
- Extrait : `Photographier des Bijoux : Techniques Pro pour Joailliers`
- Explication : majuscules à l'anglaise sur « Bijoux », « Techniques », « Joailliers ». Le h1 sert aussi d'alt à l'image principale et de dernier maillon du fil d'Ariane (JSON-LD).
- Correction retenue : `Photographier des bijoux : techniques professionnelles pour joailliers`.

**FR-03 · metaTitle** — majeur — Title Case / longueur (revue)
- Extrait : `Comment Photographier des Bijoux: Techniques Professionnelles pour Joailliers | PackshotCreator`
- Explication : c'est le `<title>` servi et l'`og:title`. Title Case, deux-points collé, 95 caractères (tronqué en page de résultats).
- Correction retenue : `Comment photographier des bijoux en studio | PackshotCreator` (60 caractères).

**FR-04 · description** — majeur — longueur / promesse (revue, complétée)
- Extrait : `Maîtrisez l'art exigeant de la photographie de bijoux avec nos conseils exclusifs: éclairage avancé, technologie Hyperfocus et animations 360°. Découvrez comment sublimer diamants et pierres précieuses pour votre e-commerce de joaillerie.`
- Explication : 238 caractères (extrait tronqué vers 155) ; deux-points sans espace insécable ; « conseils exclusifs » est promotionnel et invérifiable ; « Maîtrisez l'art exigeant » relève de l'emphase.
- Correction retenue : `Photographie de bijoux : studio macro, éclairage, technologie Hyperfocus, animations à 360° et post-production. Nos conseils pour réussir vos visuels.` (150 caractères). « Exclusifs » retiré : 06, point 6.

### Corps

**FR-05 · introduction** — mineur — répétition / impropriété (revue, complétée)
- Extrait : `nécessite une **précision unique**` ; `chaque pierre précieuse raconte une histoire unique` ; au paragraphe suivant `la **texture unique des matériaux utilisés**`
- Explication : « unique » trois fois en deux paragraphes ; « précision unique » est impropre (on attend « rare », « extrême »).
- Correction retenue : `exige une **précision rare**` ; `chaque pierre précieuse a sa propre histoire` ; `la **texture propre aux matériaux employés**`.

**FR-06 · introduction** — mineur — style (ajout)
- Extrait : `Découvrez comment transformer chaque bijou en une pièce visuelle fascinante grâce à des techniques modernes et efficaces.`
- Explication : « pièce visuelle » est impropre et « fascinante » emphatique.
- Correction retenue : `Découvrez comment photographier vos bijoux pour en tirer des visuels saisissants, grâce à des techniques modernes et efficaces.`

**FR-07 · « un art exigeant »** — mineur — syntaxe (ajout)
- Extrait : `La photographie de bijoux demande une attention particulière au **détail**, à la **lumière** et à la **mise au point**, bien au-delà de la photographie classique d’objets volumineux.`
- Explication : la comparaison est bancale : ce n'est pas l'attention qui va « au-delà de la photographie classique », c'est le niveau d'exigence qui dépasse celui des objets volumineux.
- Correction retenue : `demande une attention au **détail**, à la **lumière** et à la **mise au point** bien plus poussée que pour des objets volumineux.`

**FR-08 · « Choisir un studio »** — mineur — style (ajout)
- Extrait : `Le choix d’un studio adapté est crucial pour répondre précisément aux exigences techniques` ; `Par exemple, ils permettent une restitution exacte des nuances et des teintes grâce à un **rendu fidèle des couleurs**`
- Explication : « crucial » est un anglicisme de registre ; « Par exemple » introduit à tort la liste des avantages annoncés ; « permettent une restitution » est lourd.
- Correction retenue : `Le choix du studio est déterminant…` ; `Ils offrent un **rendu fidèle des couleurs**, qui restitue exactement les nuances et les teintes, une netteté uniforme…` (supprime aussi la répétition « grâce à… grâce au »)

**FR-09 · « Choisir un studio »** — mineur — appellation (revue)
- Extrait : `comme l'[Alphashot Micro V2 d’Orbitvu](/fr/studio-photo/alphashot-micro-v2)`
- Explication : le référentiel du dépôt nomme ce modèle « Alphashot Micro Pro v2 » (`messages/fr.json` l. 1429, `components/machine-selector/lib/machines.ts` l. 32) ; la citation et la FAQ disent « Alphashot Micro ».
- Correction retenue : aucune, appellation conservée (R7 : pas de correction silencieuse d'un nom de produit). 06, point 2.

**FR-10 · « Choisir un studio »** — mineur — casse / accord (revue)
- Extrait : `grâce à la technologie du [**Focus Stacking**](/fr/guide/comment-faire-focus-stacking-pour-photographier-bracelet) (empilement de mise au point)`
- Explication : majuscules sur un nom commun ; le focus stacking est une technique ; on empile plusieurs mises au point (pluriel).
- Correction retenue : `grâce au [**focus stacking**](…) (empilement de mises au point)`, même cible de lien.

**FR-11 · « Choisir un studio »** — mineur — absolu non sourcé (revue, claims)
- Extrait : `qui contrôle parfaitement les reflets et les éclats`
- Correction retenue : `qui permet de maîtriser finement les reflets et les éclats`. 06, point 6.

**FR-12 · « Techniques avancées d'éclairage »** — mineur — terminologie (ajout)
- Extrait : `leur **taille, clarté, poli et symétrie**`
- Explication : en gemmologie française, le critère que l'anglais appelle *clarity* se dit « pureté » (les quatre critères du diamant : carat, couleur, pureté, taille) ; « clarté » est un calque.
- Correction retenue : `leur **taille, pureté, poli et symétrie**`. 06, point 7.

**FR-13 · « Techniques avancées d'éclairage »** — mineur — style (ajout)
- Extrait : `En utilisant des sources lumineuses modulables, vous pouvez valoriser efficacement` ; `Un éclairage bien contrôlé permet de reproduire fidèlement la brillance que l’on retrouve en joaillerie haut de gamme et d'éliminer les ombres indésirables susceptibles de masquer`
- Explication : gérondif et adverbe superflus ; « permet de… et d'… » alourdit la phrase.
- Correction retenue : `Avec des sources lumineuses modulables, vous pouvez mettre en valeur…` ; `Un éclairage bien contrôlé restitue fidèlement la brillance propre à la joaillerie haut de gamme et élimine les ombres indésirables qui pourraient masquer des détails importants.`

**FR-14 · image 1** — majeur — texte alternatif (revue)
- Extrait : `![__wf_reserved_inherit](/images/blog/67dbae80db22afe6492e9626.avif)`
- Explication : marqueur Webflow non résolu ; aucune description de l'image pour les lecteurs d'écran ni pour Google Images.
- Correction retenue : `Bague dorée sertie d’une pierre rose taille émeraude, photographiée de face sur fond clair` (image examinée).

**FR-15 · « Astuces pratiques »** — mineur — style (ajout)
- Extrait : `Quelques astuces simples peuvent améliorer considérablement` ; `Ajustez minutieusement votre éclairage en commençant par une intensité faible puis en augmentant progressivement` ; `faites tourner le bijou plutôt que votre appareil photo, garantissant ainsi un résultat homogène.`
- Explication : adverbes en cascade ; participe présent final dont le sujet est ambigu (c'est la rotation du bijou qui garantit l'homogénéité).
- Correction retenue : `Quelques astuces simples suffisent à améliorer nettement…` ; `Réglez votre éclairage avec minutie, en partant d’une intensité faible que vous augmentez progressivement…` ; `faites tourner le bijou plutôt que l’appareil photo : le résultat sera plus homogène.`

**FR-16 · intertitre du témoignage** — mineur — style (ajout)
- Extrait : `Témoignage concret : Gad & Co et l'efficacité Orbitvu` ; puis `Pour illustrer concrètement les bénéfices`
- Explication : « concret » puis « concrètement » : redondance ; « l'efficacité Orbitvu » est une apposition de marque (on attend « d'Orbitvu »).
- Correction retenue : `Témoignage : Gad & Co et l’efficacité d’Orbitvu` ; `Pour illustrer les bénéfices d’un équipement adapté…`

**FR-17 · citation de Benzi Gad** — mineur — citation chiffrée / superlatif (revue, claims)
- Extrait : `« Depuis que nous utilisons Orbitvu, le processus est devenu beaucoup plus efficace. Aujourd’hui, nous réalisons facilement plus de 100 photos par jour, alimentant efficacement notre activité e-commerce avec une qualité constante. Le retour sur investissement depuis l'acquisition de l’Alphashot Micro est absolument exceptionnel. »`
- Explication : répétition « efficace / efficacement », superlatif « absolument exceptionnel », chiffre « plus de 100 photos par jour ». La citation est probablement traduite d'un original anglais (inférence de la revue : vidéo YouTube intégrée, entreprise anglophone).
- Correction retenue : aucune sur le fond (une citation ne se réécrit pas sans sa source) ; apostrophes harmonisées. 06, point 4.

**FR-18 · « Animations à 360° »** — mineur — emphase / redondance (revue, complétée)
- Extrait : `offrent à vos clients une expérience interactive exceptionnelle. Ils peuvent explorer complètement les bijoux sous tous les angles et utiliser un zoom progressif précis`
- Explication : « exceptionnelle » est promotionnel ; « explorer complètement … sous tous les angles » est redondant.
- Correction retenue : `offrent à vos clients une expérience interactive riche. Ils peuvent examiner le bijou sous tous les angles et zoomer progressivement…` 06, point 6.

**FR-19 · « Animations à 360° »** — mineur — absolu non sourcé (revue, claims)
- Extrait : `Ces animations fluides sont parfaitement optimisées pour les plateformes e-commerce.`
- Correction retenue : `Fluides, ces animations sont optimisées pour les plateformes e-commerce.` 06, point 6.

**FR-20 · visionneuse 360° Orbitvu** — info — bloc intégré (ajout)
- Extrait (JSON, absent du rendu de `01`, qui l'affiche comme deux paragraphes vides) : `<div data-rt-embed-type='true'><script src="//orbitvu.co/share/RgHtEmJGrtsxUJDjt6BkfW/6530158/360/script?width=auto&height=auto&content2=yes&partial_load=yes"></script>…</div>`
- Explication : la section 360° intègre une visionneuse Orbitvu. `sanitizeHtml` (`lib/sanitize.ts`) renvoie le HTML tel quel ; son affichage effectif en production n'est pas vérifiable par script (R4).
- Correction retenue : bloc conservé à l'identique, à sa place. 06, point 13.

**FR-21 · « Simplifier la post-production »** — mineur — style (ajout)
- Extrait : `Grâce aux logiciels modernes intégrés dans les studios spécialisés, la post-production devient à la fois rapide et intuitive. Vous pouvez facilement effectuer des corrections chromatiques précises, ajuster le contraste et la luminosité pour affiner chaque image`
- Explication : « effectuer des corrections chromatiques » est lourd ; « facilement » et « à la fois » n'ajoutent rien.
- Correction retenue : `Grâce aux logiciels modernes intégrés aux studios spécialisés, la post-production devient rapide et intuitive. Vous pouvez corriger précisément les couleurs, ajuster le contraste et la luminosité de chaque image…`

**FR-22 · image 2** — majeur — texte alternatif (revue)
- Extrait : `![__wf_reserved_inherit](/images/blog/67dbae80db22afe6492e962a.avif)`
- Explication : même marqueur Webflow. L'image montre une capture d'écran d'un logiciel de retouche généraliste (photo de bague sur fond blanc, outil de correction agrandi).
- Correction retenue : `Photo de bague dorée ornée d’une petite pierre, sur fond blanc, en cours de retouche dans un logiciel d’édition d’image`. 06, point 14.

**FR-23 · intertitre du résumé** — mineur — typographie (revue)
- Extrait : `Résumé des conseils pratiques pour réussir vos photographies de bijoux :`
- Correction retenue : deux-points final supprimé.

**FR-24 · résumé, puce 1** — info — préférence de style (ajout)
- Extrait : `Sélectionnez un équipement adapté à la photographie macro.`
- Explication : correct ; « choisir » est plus naturel dans une liste de conseils et reprend le verbe de la section « Choisir un studio photo spécialisé ».
- Correction retenue : `Choisissez un équipement adapté à la photographie macro.`

**FR-25 · résumé, puce 3** — majeur — appellation / absolu (revue, complétée)
- Extrait : `Utilisez la technologie d’Hyperfocus pour assurer une netteté parfaite.`
- Explication : « Hyperfocus » n'est jamais présenté dans le corps (qui parle de focus stacking) ; le reste du dépôt nomme la fonction « SuperFocus » ou « Super Focus » (`content/blog/fr/focus-sur-lhyperfocus.json`, `components/machine-selector/lib/machines.ts` l. 51, `data/secteurs.ts`) ; « d'Hyperfocus » met un article devant un nom propre ; « netteté parfaite » est un absolu.
- Correction retenue : `Utilisez la technologie Hyperfocus, un focus stacking avancé, pour obtenir une netteté uniforme sur toute la profondeur du bijou.` Le nom est conservé sans arbitrage ; le rattachement au focus stacking reprend la FAQ (Q4 : « Hyperfocus (ou Focus Stacking avancé) »). 06, points 1 et 6.

**FR-26 · résumé, puce 4** — mineur — emphase (ajout)
- Extrait : `Proposez des animations interactives afin d'améliorer considérablement l’expérience utilisateur.`
- Correction retenue : `Proposez des animations interactives à 360° pour enrichir l’expérience utilisateur.`

**FR-27 · conclusion** — mineur — concordance / registre (ajout)
- Extrait : `vous assurez une présentation visuelle professionnelle qui valorisera pleinement chaque bijou, renforçant ainsi l'attractivité de votre catalogue produit.`
- Explication : présent puis futur sans raison ; participe présent final ; « attractivité » relève du registre administratif.
- Correction retenue : `vous obtiendrez une présentation professionnelle qui met pleinement en valeur chaque bijou et renforce l’attrait de votre catalogue produit.`

**FR-28 · ensemble du texte** — mineur — typographie (ajout)
- Extrait : `l'**éclairage**` / `l’éclat` ; `d'Orbitvu` / `d’Orbitvu`
- Explication : apostrophes droites et typographiques mêlées.
- Correction retenue : apostrophe typographique partout.

**FR-29 · paragraphes vides** — info — artefact Webflow (revue)
- Extrait : `<p id="">‍</p>` (ZWJ), 8 occurrences.
- Explication : déjà retirés au rendu par `removeEmptyParagraphs` (`lib/blog-utils.ts`) ; sans effet visible.
- Correction retenue : non reproduits dans la proposition.

### FAQ

**FR-30 · Q1 et R1** — mineur — faute d'accord (revue)
- Extrait : `En quoi la photographie de joaillerie haute gamme diffère-t-elle` ; `La photographie de joaillerie haute gamme transcende`
- Explication : la locution « haut de gamme » est invariable.
- Correction retenue : `joaillerie haut de gamme` (deux occurrences).

**FR-31 · R1** — mineur — emphase (ajout)
- Extrait : `transcende la simple documentation visuelle pour devenir un art de précision microscopique` ; `exige une maîtrise technique exceptionnelle`
- Correction retenue : `va bien au-delà de la simple documentation visuelle : c’est un travail de précision presque microscopique` ; `exige une maîtrise technique poussée`.

**FR-32 · R1** — mineur — impropriété (ajout)
- Extrait : `Chaque bijou représente une pièce unique avec ses propres caractéristiques de réfraction, dispersion lumineuse et structure cristalline. Cette spécificité nécessite non seulement une expertise photographique, mais également des connaissances gemmologiques pour capturer fidèlement l'essence et la valeur réelle de chaque création.`
- Explication : « représente » est impropre ; réfraction, dispersion et structure cristalline sont des propriétés des pierres, pas du bijou ; « capturer l'essence » est un calque emphatique.
- Correction retenue : `Chaque bijou est une pièce unique, et chaque pierre a sa propre réfraction, sa propre dispersion de la lumière et sa propre structure cristalline. Il faut donc, en plus du savoir-faire photographique, des connaissances en gemmologie pour restituer fidèlement le caractère et la valeur réelle de chaque création.`

**FR-33 · R2** — mineur — généralisation d'un témoignage (ajout, claims)
- Extrait : `il est possible de réaliser plus de 100 photos par jour tout en maintenant une qualité constante, comme en témoigne l'expérience de Gad & Co mentionnée dans l'article.`
- Explication : le chiffre d'un seul client est présenté comme une capacité générale de l'équipement, la source n'arrivant qu'en fin de phrase.
- Correction retenue : `D’après le témoignage de Gad & Co cité dans cet article, un équipement spécialisé comme l’Alphashot Micro d’Orbitvu permet de réaliser plus de 100 photos par jour tout en maintenant une qualité constante.` 06, point 5.

**FR-34 · R3** — mineur — casse / absolu (revue, complétée)
- Extrait : `une netteté uniforme sur toute la profondeur du bijou (technologie Focus Stacking), et un éclairage précis et modulable pour contrôler parfaitement les reflets et éclats.`
- Correction retenue : `une netteté uniforme sur toute la profondeur du bijou grâce au focus stacking, et un éclairage précis et modulable pour maîtriser finement les reflets et les éclats.`

**FR-35 · Q4** — mineur — superlatif (revue, claims)
- Extrait : `Comment la technologie Hyperfocus révolutionne-t-elle la netteté des images en joaillerie ?`
- Correction retenue : `Comment la technologie Hyperfocus améliore-t-elle la netteté des images en joaillerie ?` Même question, sans superlatif. 06, points 1 et 6.

**FR-36 · R4** — mineur — emphase (revue, claims)
- Extrait : `représente une évolution majeure dans la photographie de haute joaillerie` ; `cette approche sophistiquée`
- Correction retenue : `constitue une évolution importante pour la photographie de haute joaillerie` ; « sophistiquée » supprimé.

**FR-37 · R4** — majeur — affirmation technique invérifiable (revue)
- Extrait : `utilise des algorithmes propriétaires qui analysent la topographie tridimensionnelle du bijou et calculent automatiquement les séquences optimales de mise au point.`
- Explication : aucune source dans le texte ni dans le dépôt.
- Correction retenue : contenu conservé sans renforcement : `elle s’appuie sur des algorithmes propriétaires qui analysent le relief du bijou en trois dimensions et calculent automatiquement la séquence de mises au point la plus adaptée.` 06, point 3.

**FR-38 · R4** — majeur — chiffres non sourcés / calque (revue, complétée)
- Extrait : `L'Alphashot Micro V2 peut capturer jusqu'à 200 images à différents plans focaux avec des incréments micrométriques (aussi précis que 10 microns), puis les fusionner intelligemment`
- Explication : « 200 images » et « 10 microns » n'apparaissent ni dans le corps ni dans le dépôt (le seul « 200 » du référentiel est `capaciteJour: 200`, une capacité journalière) ; `content/blog/fr/focus-sur-lhyperfocus.json` donne ailleurs « 6 à 20 prises de vues » pour un empilement efficace. « Aussi précis que 10 microns » calque l'anglais *as accurate as* ; « intelligemment » est promotionnel.
- Correction retenue : chiffres conservés, tournure corrigée, marqueur `[À VALIDER]` : `peut capturer jusqu’à 200 images sur des plans focaux différents, par pas micrométriques pouvant descendre jusqu’à 10 microns, puis les fusionner en conservant les informations de profondeur.` 06, point 3.

**FR-39 · R4** — mineur — typographie / absolu (revue, complétée)
- Extrait : `et les caractéristiques internes des gemmes - un niveau de détail impossible à obtenir avec des méthodes conventionnelles.`
- Explication : trait d'union employé comme tiret ; « impossible » est un absolu non sourcé.
- Correction retenue : `…apparaissent nets sur une même image, un niveau de détail difficile à atteindre avec des méthodes conventionnelles.` 06, point 6.

**FR-40 · R5** — mineur — impropriété / construction (ajout)
- Extrait : `faites tourner le bijou plutôt que l'appareil photo pour garantir un résultat homogène, assurez une lumière constante pendant toute la séquence, utilisez un équipement spécialisé comme l'Alphashot Micro qui automatise ce processus, et veillez à ce que`
- Explication : « assurez une lumière constante » est impropre (on veille à, on garde) ; phrase-liste de quatre impératifs ; virgule manquante avant la relative explicative « qui automatise ».
- Correction retenue : `Faites tourner le bijou plutôt que l’appareil photo pour obtenir un résultat homogène, gardez un éclairage constant pendant toute la séquence et utilisez un équipement spécialisé comme l’Alphashot Micro, qui automatise le processus. Veillez enfin à ce que…`

---

## EN — /en/blog/technique-photograph-jewelry-tutorial

La version EN est intégralement retraduite depuis le FR corrigé (`04-PROPOSITION_EN.md`). Les corrections ci-dessous indiquent la tournure retenue dans cette retraduction.

### Métadonnées

**EN-01 · title** — mineur — titre littéral (revue)
- Extrait : `What technique to photograph jewelry - E-commerce photo tutorial`
- Explication : calque agrammatical du title FR ; trait d'union employé comme séparateur.
- Correction retenue : `Jewelry photography: an e-commerce photo tutorial`.

**EN-02 · h1** — mineur — cohérence / requête (ajout)
- Extrait : `Photographing Jewelry: Pro Techniques for Jewelers`
- Explication : le Title Case est admis en anglais, mais les H1 EN du blog sont majoritairement en casse de phrase ; la requête principale de la page, « jewelry photography » (1 050 impressions), n'y figure pas sous cette forme.
- Correction retenue : `Jewelry photography: professional techniques for jewelers`.

**EN-03 · metaTitle** — mineur — longueur (revue)
- Extrait : `How to Photograph Jewelry: Professional Techniques for Jewelers | PackshotCreator`
- Explication : 81 caractères, tronqué en page de résultats.
- Correction retenue : `Jewelry photography: studio techniques | PackshotCreator` (56 caractères).

**EN-04 · description** — mineur — longueur / promesse (revue, complétée)
- Extrait : `Master the demanding art of jewelry photography with our exclusive tips: advanced lighting, Hyperfocus technology, and 360° animations. Discover how to enhance diamonds and precious stones for your jewelry e-commerce.`
- Explication : 217 caractères ; « exclusive tips » promotionnel ; « your jewelry e-commerce » est un calque.
- Correction retenue : `Jewelry photography for e-commerce: macro studio, controlled lighting, Hyperfocus technology, 360° animations, and post-production. Tips for jewelers.` (150 caractères).

### Corps

**EN-05 · introduction** — majeur — traduction automatique (revue)
- Extrait : `requires a **unique precision** to return all of their **beauty** And their **sheen**`
- Explication : « restituer » rendu par *return* ; majuscule parasite ; *their* renvoie à un singulier (*jewelry*).
- Correction retenue : `takes **rare precision** to capture all of its **beauty** and **sparkle**`.

**EN-06 · introduction** — mineur — calque (ajout)
- Extrait : `deserves an adapted approach to fully reveal its natural splendor`
- Correction retenue : `deserves a tailored approach that fully reveals its natural splendor`.

**EN-07 · introduction** — mineur — calque (ajout)
- Extrait : `Discover how to transform each piece of jewelry into a fascinating visual piece using modern and effective techniques.`
- Correction retenue : `Here is how to photograph your jewelry and turn it into striking visuals, using modern, effective techniques.`

**EN-08 · « a demanding art »** — majeur — traduction automatique (revue)
- Extrait : `requires particular attention to **detail**, at the **light** And at the **Focus**, well beyond the classic photography of large objects.`
- Explication : prépositions calquées sur « à la lumière », majuscules parasites, comparaison calquée.
- Correction retenue : `calls for far closer attention to **detail**, **light**, and **focus** than photographing bulky objects.`

**EN-09 · « a demanding art »** — majeur — faux ami (revue, complétée)
- Extrait : `such as **brilliance of the stones**, the **fineness of crimping** Or the **unique texture of the materials used**.`
- Explication : en joaillerie, « sertissage » se dit *setting* (*crimping* désigne un sertissage mécanique de câbles ou de tôles) ; *Or* en majuscule ; article manquant devant *brilliance*.
- Correction retenue : `the **brilliance of the stones**, the **delicacy of the setting**, or the **texture of the materials used**`.

**EN-10 · « Choosing a specialized photo studio »** — mineur — article (revue)
- Extrait : `such as [Orbitvu Alphashot Micro V2](/en/studio-photo/alphashot-micro-v2)`
- Correction retenue : `such as the [Orbitvu Alphashot Micro V2](…)`, même cible.

**EN-11 · « Choosing a specialized photo studio »** — mineur — article (revue)
- Extrait : `thanks to a **accurate color rendering**`
- Correction retenue : `with **accurate color rendering**`.

**EN-12 · « Choosing a specialized photo studio »** — mineur — calque (revue)
- Extrait : `thanks to the technology of [**Focus Stacking**](/en/guide/how-to-do-focus-stacking-for-bracelet-photography) (focus stack)`
- Explication : tournure calquée, majuscules, glose *(focus stack)* inutile en anglais (le FR glose un terme anglais ; l'anglais n'a rien à gloser).
- Correction retenue : `through [**focus stacking**](…)`, même cible.

**EN-13 · « Choosing a specialized photo studio »** — mineur — vocabulaire (ajout)
- Extrait : `over the entire depth of the jewel` ; aussi `to better highlight the jewel` (astuces) et `over the entire depth of the jewel` (FAQ R3)
- Explication : *jewel* désigne une pierre ou un joyau ; pour un article de bijouterie, l'anglais dit *piece* ou *piece of jewelry*.
- Correction retenue : `the piece` (trois occurrences).

**EN-14 · « Choosing a specialized photo studio »** — mineur — article / absolu (revue, complétée)
- Extrait : `offer a **precise and adjustable lighting** that perfectly controls reflections and sparkles.`
- Explication : article devant un indénombrable ; *sparkles* au pluriel ; absolu *perfectly*.
- Correction retenue : `provide **precise, adjustable lighting** that gives you fine control over reflections and sparkle.` 06, point 6.

**EN-15 · intertitre sur l'éclairage** — mineur — structure (revue)
- Extrait : `#### Advanced lighting techniques to enhance precious stones` (H3)
- Explication : H2 en FR, H3 en EN : hiérarchie divergente.
- Correction retenue : H2, texte inchangé (l'ancre du sommaire ne bouge pas). 06, point 10.

**EN-16 · « Advanced lighting techniques »** — mineur — espace manquante (ajout)
- Extrait : `the mastery of**lighting** is indispensable`
- Explication : le HTML colle `of<strong>lighting</strong>` (rendu « oflighting ») ; *the mastery of* est lourd.
- Correction retenue : `mastering **lighting** is essential`.

**EN-17 · « Advanced lighting techniques »** — mineur — faux ami (revue)
- Extrait : `By using modular light sources`
- Correction retenue : `With adjustable light sources`.

**EN-18 · « Advanced lighting techniques »** — majeur — terminologie gemmologique (revue)
- Extrait : `their **size, clarity, polish, and symmetry**`
- Explication : la « taille » d'une pierre est sa *cut*, pas sa *size*.
- Correction retenue : `their **cut, clarity, polish, and symmetry**`.

**EN-19 · image 1** — majeur — texte alternatif (revue)
- Extrait : `![__wf_reserved_inherit](/images/blog/67dbae80db22afe6492e9626.avif)`
- Correction retenue : `Gold-colored ring set with an emerald-cut pink stone, photographed from the front on a light background`.

**EN-20 · intertitre des astuces** — mineur — calque (ajout)
- Extrait : `Practical tips: succeed in your jewelry photography`
- Correction retenue : `Practical tips for better jewelry photography`.

**EN-21 · « Practical tips »** — mineur — terminologie (ajout)
- Extrait : `simplify clipping in post-production`
- Explication : « détourage » se dit *cutout* ou *clipping path* ; *clipping* seul évoque l'écrêtage des hautes lumières.
- Correction retenue : `simplifies cutouts in post-production`.

**EN-22 · « Practical tips »** — mineur — calque (revue)
- Extrait : `Use light diffusers to avoid too pronounced reflections on shiny surfaces.`
- Correction retenue : `Use light diffusers to avoid overly strong reflections on shiny surfaces.`

**EN-23 · intertitre du témoignage** — mineur — calque (revue)
- Extrait : `Concrete testimony: Gad & Co and Orbitvu efficiency`
- Explication : *testimony* relève du registre judiciaire.
- Correction retenue : `Testimonial: Gad & Co and the efficiency of Orbitvu`.

**EN-24 · présentation du témoignage** — mineur — typographie / calque (revue, complétée)
- Extrait : `To concretely illustrate the benefits of adapted equipment, here is the testimony of Benzi Gad, marketing manager at [Gad & Co](https://gaddiamonds.com/home/) :`
- Explication : espace avant le deux-points (typographie française) ; *adapted equipment* et *testimony* calqués.
- Correction retenue : `To illustrate the benefits of the right equipment, here is what Benzi Gad, marketing manager at [Gad & Co](https://gaddiamonds.com/home/), has to say:`

**EN-25 · citation de Benzi Gad** — info — citation chiffrée (revue, claims)
- Extrait : `“Since using Orbitvu, the process has become much more efficient. Today, we easily take more than 100 photos per day, effectively feeding our e-commerce business with consistent quality. The return on investment since the acquisition of the Alphashot Micro has been absolutely exceptional.”`
- Explication : anglais correct ; probablement le plus proche de l'original (inférence). Le temps diffère du FR (*has been* / « est »).
- Correction retenue : conservée mot pour mot, non retraduite depuis le FR. 06, point 4.

**EN-26 · « 360° animations »** — mineur — calque / emphase (revue, complétée)
- Extrait : `The animations at **360°** offer your customers an exceptional interactive experience. They can fully explore jewelry from any angle and use a precise progressive zoom`
- Correction retenue : `**360°** animations give your customers a rich interactive experience. They can examine the piece from every angle and zoom in progressively…` 06, point 6.

**EN-27 · « 360° animations »** — majeur — faux ami (revue)
- Extrait : `observe details such as the punches, finish, or setting.`
- Explication : les « poinçons » d'orfèvrerie se disent *hallmarks* ; *punches* désigne l'outil.
- Correction retenue : `see details such as hallmarks, finish, or setting.`

**EN-28 · « 360° animations »** — mineur — absolu (revue, claims)
- Extrait : `These smooth animations are perfectly optimized for e-commerce platforms.`
- Correction retenue : `These smooth animations are optimized for e-commerce platforms.` 06, point 6.

**EN-29 · visionneuse 360° Orbitvu** — info — bloc intégré (ajout)
- Même bloc qu'en FR (FR-20), conservé à l'identique. 06, point 13.

**EN-30 · image 2** — majeur — texte alternatif (revue)
- Extrait : `![__wf_reserved_inherit](/images/blog/67dbae80db22afe6492e962a.avif)`
- Correction retenue : `Photo of a gold-colored ring with a small stone, on a white background, being retouched in image-editing software`.

**EN-31 · intertitre du résumé** — mineur — typographie (ajout)
- Extrait : `Summary of practical tips for successful jewelry photography:`
- Correction retenue : deux-points final supprimé.

**EN-32 · résumé, puce 2** — info — recalage sur le FR, pas une faute (ajout)
- Extrait : `Control the lighting to reveal even the smallest details.`
- Correction retenue : `Master your lighting to reveal the finest details.` (suit le FR « Maîtrisez l'éclairage »).

**EN-33 · résumé, puce 3** — majeur — appellation / absolu (revue)
- Extrait : `Use Hyperfocus technology to ensure perfect sharpness.`
- Explication : même problème qu'en FR (FR-25).
- Correction retenue : `Use Hyperfocus technology, an advanced form of focus stacking, to get uniform sharpness across the entire depth of the piece.` 06, points 1 et 6.

**EN-34 · résumé, puce 4** — mineur — emphase (ajout)
- Extrait : `Offer interactive animations to significantly improve the user experience.`
- Correction retenue : `Offer interactive 360° animations to enhance the user experience.`

**EN-35 · conclusion** — mineur — calque (ajout)
- Extrait : `thus strengthening the attractiveness of your product catalog.`
- Correction retenue : `and makes your product catalog more appealing.`

### FAQ

**EN-36 · R1** — mineur — emphase / répétition (ajout)
- Extrait : `transcends simple visual documentation to become an art of microscopic precision` ; `Each piece of jewelry represents a unique piece with its own characteristics of refraction`
- Correction retenue : `goes well beyond simple visual documentation: it is precision work on an almost microscopic scale` ; `Every piece of jewelry is unique, and each stone has its own refraction, light dispersion, and crystal structure.`

**EN-37 · R3** — mineur — contresens (ajout)
- Extrait : `to perfectly control reflections and flashes.`
- Explication : *flashes* ne rend pas « éclats » (*sparkle*) ; absolu *perfectly*.
- Correction retenue : `for fine control over reflections and sparkle.`

**EN-38 · Q4** — mineur — superlatif (revue, claims)
- Extrait : `How is Hyperfocus technology revolutionizing the sharpness of jewelry images?`
- Correction retenue : `How does Hyperfocus technology improve sharpness in jewelry images?`

**EN-39 · R4** — majeur — chiffres et affirmations non sourcés (revue)
- Extrait : `uses proprietary algorithms that analyze the jewelry's three-dimensional topography` ; `can capture up to 200 images at various focal planes with micrometer increments (as accurate as 10 microns) and then intelligently merge them`
- Correction retenue : contenu conservé sans renforcement, marqueur `[À VALIDER]`. 06, point 3.

**EN-40 · R4** — mineur — typographie / absolu (revue, complétée)
- Extrait : `the internal characteristics of gemstones to be visualized simultaneously - a level of detail impossible to achieve with conventional methods.`
- Correction retenue : `…all appear sharp in a single image, a level of detail that is hard to achieve with conventional methods.`

**EN-41 · Q5** — mineur — trait d'union (ajout)
- Extrait : `How do you create professional quality 360° animations?`
- Correction retenue : `How do you create professional-quality 360° animations?`

**EN-42 · R5** — mineur — répétition (ajout)
- Extrait : `to ensure a consistent result, ensure consistent light throughout the sequence, use specialized equipment like the Alphashot Micro that automates this process, and ensure that the animations`
- Explication : *ensure* trois fois, *consistent* deux fois.
- Correction retenue : `for a consistent result, keep the lighting constant throughout the sequence, and use specialized equipment such as the Alphashot Micro, which automates the process. Finally, make sure the animations…`

---

## Détections et propositions infirmées ou écartées

1. **EN, détection « espace avant virgule » (5) et signatures « espace_avant_ponct » `l ,`, `s ,`, `2 ,`, `g ,`** : infirmées. Artefact de l'extraction (`families/*.md` remplace les balises par des espaces) : le HTML écrit `<strong>detail</strong>, at`, sans espace. Seul `Gad & Co :` est réel (EN-24).
2. **FR, détection « majuscule après deux-points » sur le title** : infirmée (déjà par la revue) ; le title n'a pas de deux-points, le défaut réel est le trait d'union séparateur (FR-01).
3. **FR, signature de traduction « Focus »** : infirmée (déjà par la revue) ; terme technique admis, seule la casse est fautive (FR-10).
4. **Revue, FR « Alphashot Micro Pro v2 (appellation à confirmer) »** : non appliquée ; R7 interdit de corriger en silence un nom de produit, renvoyé en 06 (point 2).
5. **Revue, FR « Utilisez le focus stacking (SuperFocus chez Orbitvu…) »** : non appliquée ; consigne de ne pas trancher entre Hyperfocus et SuperFocus (06, point 1).
6. **Revue, FAQ « Supprimer les valeurs chiffrées »** : non appliquée ; un claim n'est pas supprimé sans décision humaine. Phrase de repli fournie en 06 (point 3).
7. **Revue, metaTitle FR « Photographier des bijoux : techniques professionnelles | PackshotCreator »** : écartée, 72 caractères (cible ≤ 60) et perte de « comment », alors que « comment photographier des bijoux » est la requête la mieux classée (position 9,8).
8. **Revue, title FR « Quelle technique pour photographier des bijoux ? Tutoriel photo e-commerce »** : écartée au profit de « Comment photographier des bijoux : tutoriel photo e-commerce » (même requête).
9. **Revue, intertitre EN « Customer story »** : écarté au profit de *Testimonial* : rien dans le texte n'établit que Gad & Co soit client de PackshotCreator ; le témoignage porte sur Orbitvu.
