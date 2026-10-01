# Anomalies annotées — famille 67d0561565ef40a9406f1bac (bague en 8 étapes)

Base : `01-TEXTE_ACTUEL.md` (JSON `main` `17fc0b3`), HTML brut des deux JSON, revue `reviews/67d0561565ef40a9406f1bac.json`. Les extraits sont cités mot pour mot entre accents graves, avec le balisage Markdown de `01` (le gras `**` y est conservé, ce qui rend visibles les mots collés de l'EN).

Échelle de gravité : **bloquant** (mot d'une autre langue, phrase inutilisable) · **majeur** (contresens, phrase fausse ou agrammaticale, contradiction, appellation produit) · **mineur** (calque, typographie, style, alt) · **info** (claim conservé dans la proposition, à trancher dans `06`).

Bilan : **FR : 68 anomalies** (FR-01 à FR-68 : 9 majeures, 46 mineures, 13 claims « info ») + 3 points de métadonnées (FR-M1 à FR-M3) ; **EN : 118 anomalies** (EN-01 à EN-118, dont 4 bloquantes) + 2 points de métadonnées (EN-M1, EN-M2) ; **5 anomalies globales** (G-1 à G-5). Total : **196 entrées**. Toutes les anomalies de la revue ont été vérifiées contre `01` : aucune n'est fausse ; trois sont requalifiées et une correction de la revue est amendée (section finale). Un faux positif d'extraction est écarté.

---

## FR

### Métadonnées

**FR-M1 · description**
- Extrait actuel : `Découvrez 8 astuces pour photographier une bague, en maîtrisant le cadrage, l'éclairage et l'arrière-plan pour des visuels exceptionnels !`
- Catégorie : métadonnée / promesse non tenue · Gravité : mineur
- Explication : le cadrage n'est traité dans aucune des 8 étapes (objectif, plateau, adhésif, spots, réflecteurs, éclairage, logiciel, plateau noir) ; « astuces » alors que l'article parle d'étapes.
- Correction retenue : voir `05` (description réécrite, 149 caractères).

**FR-M2 · auteur**
- Extrait actuel : `auteur : PackshotCreator`
- Catégorie : métadonnée / historique · Gravité : info
- Explication : l'import Webflow (`56d4bc32`) portait « Laurent Wainberg » ; remplacé par le commit `8ae45f63` (12/06/2026, choix délibéré : cohérence E-E-A-T avec le schema Organization). Aucun nom de personne n'a été remplacé dans le corps.
- Correction retenue : aucune dans la proposition ; décision en `06` (point 27).

**FR-M3 · date**
- Extrait actuel : `date : 2023-04-11T00:00:00.000Z ; dateModified : None`
- Catégorie : métadonnée / historique · Gravité : info
- Explication : l'ObjectId Webflow `67d05615…` correspond au 11/03/2025 (15:26 UTC) ; les images inline datent de février-mars 2025 ; le texte présente le « nouveau design » de la Micro v2. La date de 2023 est peut-être celle d'une publication antérieure sur l'ancien site : non vérifiable dans le dépôt.
- Correction retenue : aucune ; décision en `06` (point 28).

### Introduction

**FR-01 · §1**
- Extrait actuel : `Photographier une bague représente un **défi considérable** pour les [professionnels du secteur de la bijouterie]`
- Catégorie : style (calque « représente », périphrase) · Gravité : mineur
- Correction retenue : « Photographier une bague est un vrai défi pour les [professionnels de la bijouterie] » (même cible de lien).

**FR-02 · §1**
- Extrait actuel : `Les **reflets de la lumière**, la **brillance des pierres précieuses**, et la **finesse** des bijoux`
- Catégorie : ponctuation · Gravité : mineur
- Explication : virgule devant le « et » final d'une énumération simple.
- Correction retenue : « les reflets de la lumière, la brillance des pierres précieuses et la finesse de la pièce ».

**FR-03 · §2**
- Extrait actuel : `Mais ne vous inquiétez pas, [**Orbitvu**](https://www.orbitvu.com/) a la solution !`
- Catégorie : style (ton publicitaire familier) · Gravité : mineur
- Correction retenue : « Orbitvu apporte une réponse à ces enjeux. » (lien et `target="_blank"` conservés).

**FR-04 · §2**
- Extrait actuel : `Le studio photo **Alphashot Micro Pro v2**, offre aujourd'hui`
- Catégorie : ponctuation (virgule entre sujet et verbe) · Gravité : mineur
- Correction retenue : « Son studio photo Alphashot Micro Pro v2 s'appuie sur… ».

**FR-05 · §2**
- Extrait actuel : `une **technologie innovante et unique** pour maintenir et photographier une bague avec une facilité déconcertante`
- Catégorie : claim contradictoire · Gravité : majeur
- Explication : l'étape 3 affirme que l'appareil « ne dispose pas d'un système intégré pour maintenir les bagues » ; « unique » n'est pas démontré. Confirmé (revue).
- Correction retenue : « s'appuie sur une technologie innovante qui rend la prise de vue d'une bague remarquablement simple » ; « unique » et « maintenir » retirés → `06` point 5.

**FR-06 · §2**
- Extrait actuel : `vous pouvez garantir des **résultats exceptionnels**`
- Catégorie : claim (« garantir ») · Gravité : info
- Correction retenue : « Vous obtenez des résultats exceptionnels » → `06` point 6.

**FR-07 · §3**
- Extrait actuel : `grâce au studio de phoographie Orbitvu`
- Catégorie : coquille · Gravité : mineur (visible). Confirmé (revue).
- Correction retenue : « avec le studio photo Orbitvu ».

**FR-08 · §3**
- Extrait actuel : `avec une **précision inégalée**`
- Catégorie : claim (superlatif non démontré) · Gravité : info
- Correction retenue : « avec une grande précision » → `06` point 7.

### Présentation vidéo

**FR-09 · intertitre et 4 autres occurrences**
- Extraits actuels : `Présentation vidéo de l'Alphashot Micro V2` ; `l'[**Alphashot Micro Version 2**](/fr/studio-photo/alphashot-micro-v2)` ; `Le nouveau design de l'Alphashot Micro V2` ; `synchronisé avec l'Alphashot Micro V2` ; `l'Alphashot Micro V2 **ne dispose pas**`
- Catégorie : appellation produit · Gravité : majeur
- Explication : trois noms pour un seul produit (« Micro V2 », « Micro Version 2 », « Micro Pro v2 »). Le catalogue du site (`components/calculators/ROICalculator/lib/machines.ts`, id `alphashot-micro-v2`) et le reste de l'article disent « Alphashot Micro Pro v2 ». Le boîtier visible sur l'image `…075d0` porte « ALPHASHOT MICRO v2 ». Confirmé (revue).
- Correction retenue : « Alphashot Micro Pro v2 » partout → `06` point 2.

**FR-10 · §1**
- Extrait actuel : `est un dispositif spécialement conçu pour photographier les bijoux et articles de luxe`
- Catégorie : style · Gravité : mineur
- Correction retenue : « est un studio conçu spécialement pour photographier les bijoux et les articles de luxe ».

**FR-11 · liste, puce 1 à 5**
- Extrait actuel : `- Une **forme cylindrique** créant un **environnement fermé** où tout peut être contrôlé étape par étape` (et puces suivantes)
- Catégorie : typographie de liste · Gravité : mineur
- Explication : puces introduites par deux-points, commençant par une majuscule et sans ponctuation finale ; participes présents en série (« créant »).
- Correction retenue : minuscule initiale, point-virgule, point final ; relatives (« qui crée »).

**FR-12 · liste, puce 2**
- Extrait actuel : `**Position de caméra ajustable** de l'horizontale à la verticale avec un bouton de protection pour la sécurité`
- Catégorie : calque (« caméra » pour appareil photo) + redondance · Gravité : mineur. Confirmé (revue).
- Correction retenue : « une position de l'appareil photo réglable de l'horizontale à la verticale, avec un bouton de sécurité ».

**FR-13 · liste, puce 3**
- Extrait actuel : `contrôlables individuellement via le logiciel en termes d'**intensité** et de **lumière**`
- Catégorie : formulation vide · Gravité : mineur. Confirmé (revue).
- Explication : l'intensité est déjà une grandeur de la lumière ; « et de lumière » ne porte aucune information.
- Correction retenue : « dont l'intensité se règle individuellement depuis le logiciel » (« et de lumière » supprimé, sans perte de sens).

**FR-14 · liste, puce 4**
- Extrait actuel : `**Plateforme rotative** à la base pour créer des présentations à **un angle**, **multi-angles**, **360°**`
- Catégorie : terminologie (« plateau tournant ») + calque · Gravité : mineur. Confirmé (revue).
- Correction retenue : « un plateau tournant à la base, pour réaliser des vues sous un seul angle, multi-angles, à 360° ou même des vidéos ».

**FR-15 · liste, puce 5**
- Extrait actuel : `La fonction exclusive **Brilliance Light** qui combine deux configurations différentes :`
- Catégorie : claim (« exclusive ») + virgule manquante devant la relative explicative · Gravité : info
- Correction retenue : « la fonction exclusive Brilliance Light, qui combine deux dispositifs : » (« exclusive » conservé) → `06` point 9.

**FR-16 · sous-puce 1**
- Extrait actuel : `Un **spotlight** pour une lumière focalisée sur certaines pierres ou diamants`
- Catégorie : anglicisme · Gravité : mineur. Confirmé (revue).
- Correction retenue : « un spot qui concentre la lumière sur certaines pierres ou certains diamants ».

**FR-17 · sous-puce 2**
- Extrait actuel : `Des **LED Brilliance** situées au-dessus et en dessous de la caméra`
- Catégorie : calque (« caméra ») · Gravité : mineur
- Correction retenue : « des LED Brilliance placées au-dessus et en dessous de l'appareil photo ».

**FR-18 · §2**
- Extrait actuel : `Toutes ces fonctionnalités sont contrôlables à **100% depuis le logiciel**`
- Catégorie : typographie (espace avant %) + calque · Gravité : mineur
- Correction retenue : « Toutes ces fonctions se pilotent entièrement depuis le logiciel ».

**FR-19 · §2**
- Extrait actuel : `Le support de caméra permet de connecter l'appareil directement à la solution, garantissant la même position exacte à chaque prise de vue.`
- Catégorie : calques (« caméra », « solution », « même position exacte ») · Gravité : mineur. Confirmé (revue).
- Correction retenue : « Le support d'appareil photo permet de fixer le boîtier directement sur le studio, ce qui garantit exactement la même position à chaque prise de vue. »

**FR-20 · §3**
- Extrait actuel : `Le nouveau design de l'Alphashot Micro V2 est équipé d'un **port USB Type-C** qui le rend compatible avec les dernières technologies d'appareils photo sans miroir et permet un **transfert de données ultra-rapide**`
- Catégorie : claim daté (« nouveau design », « ultra-rapide ») + terminologie (« hybrides ») · Gravité : info
- Correction retenue : formulation conservée, « appareils photo hybrides (sans miroir) les plus récents » → `06` point 10.

**FR-21 · §4**
- Extrait actuel : `La combinaison de **multiples sources lumineuses** vous offre la possibilité de photographier différents contrastes du même produit grâce aux **préréglages par défaut** intégrés au logiciel.`
- Catégorie : style (lourdeur, « photographier des contrastes » impropre) · Gravité : mineur
- Correction retenue : « En combinant plusieurs sources lumineuses, vous pouvez photographier un même produit avec différents contrastes grâce aux préréglages fournis avec le logiciel. »

**FR-22 · §5**
- Extrait actuel : `Une autre fonctionnalité du logiciel Orbitvu Station synchronisé avec l'Alphashot Micro V2 est la **gestion des reflets** sur la photo du produit. Vous pouvez contrôler l'apparence finale en choisissant différents arrière-plans (noir, blanc ou autre) tout en conservant les reflets professionnels pour un rendu optimal.`
- Catégorie : style (« synchronisé » impropre, « les reflets professionnels » vague) · Gravité : mineur
- Correction retenue : « Le logiciel Orbitvu Station, associé à l'Alphashot Micro Pro v2, assure également la gestion des reflets… tout en conservant des reflets de qualité professionnelle ».

**FR-23 · §6**
- Extrait actuel : `Comme le confirment nos utilisateurs, l'objectif **100mm macro** donne d'excellents résultats`
- Catégorie : témoignage non sourcé (info) + ordre calqué et espace d'unité (mineur) · Gravité : info. Confirmé (revue).
- Correction retenue : « Nos utilisateurs le confirment : un objectif macro 100 mm donne d'excellents résultats » → `06` point 8.

### Étape 1

**FR-24 · §1**
- Extrait actuel : `le choix de l'**objectif** est crucial pour obtenir des clichés de **qualité professionnelle**. La sélection de l'objectif doit être faite avec soin pour garantir des images parfaites.`
- Catégorie : style (redondance, voix passive) · Gravité : mineur
- Correction retenue : « le choix de l'objectif est déterminant pour obtenir des clichés de qualité professionnelle ; il mérite donc d'être fait avec soin. »

**FR-25 · image**
- Extrait actuel : `![__wf_reserved_inherit](/images/blog/67dbae7e4d8a2c44393a7fc0.avif)`
- Catégorie : texte alternatif réservé Webflow · Gravité : majeur (requalifié, la revue disait mineur : image clé sans aucune description)
- Correction retenue : « Objectif Canon Macro 100 mm posé à côté d'un zoom Canon 24-70 mm, sur fond bleu-vert » (contenu de l'image vérifié).

**FR-26 · §2**
- Extrait actuel : `nous recommandons l'**objectif macro Canon 100mm**`
- Catégorie : typographie (espace avant l'unité) · Gravité : mineur. Confirmé (revue).
- Correction retenue : « objectif macro Canon 100 mm ».

**FR-27 · §2**
- Extrait actuel : `soulignant la **qualité** et l'**artisanat** de vos créations`
- Catégorie : terminologie (« artisanat » pour savoir-faire) · Gravité : mineur
- Correction retenue : « souligne la qualité et le savoir-faire de vos créations ».

**FR-28 · §2**
- Extrait actuel : `Si ce n'est pas le cas, vous pouvez toujours utiliser la fonction **Superfocus**, incluse dans le logiciel de l'Alphashot Micro Pro v2, pour éliminer tout flou progressif.`
- Catégorie : incompréhensible (connecteur sans antécédent) · Gravité : majeur. Confirmé (revue).
- Correction retenue : « Si vous souhaitez une image nette de bout en bout, utilisez la fonction Superfocus (empilement de mises au point), incluse dans le logiciel de l'Alphashot Micro Pro v2, pour éliminer le flou progressif. » (« empilement de mises au point » repris de la FAQ.)

**FR-29 · §2 et FAQ**
- Extrait actuel : `**Superfocus**`
- Catégorie : appellation · Gravité : mineur
- Explication : le catalogue et la fiche produit du site écrivent « Super Focus » (`machines.ts`, `app/[lang]/studio-photo/[slug]/page.tsx`), les guides du site « Superfocus ».
- Correction retenue : « Superfocus » (graphie de l'article) → `06` point 4.

### Étape 2

**FR-30 · intertitre**
- Extrait actuel : `2. Utiliser le plateau transparent pour photographier une bague et améliorer l'apparence des bijoux`
- Catégorie : style / SEO (intertitre long, « photographier une bague » répété dans 3 intertitres) · Gravité : mineur
- Correction retenue : « 2. Utiliser le plateau transparent pour mettre la bague en valeur ».

**FR-31 · §1**
- Extrait actuel : `Il offre un **arrière-plan propre et sans distraction**`
- Catégorie : calque (« distraction-free ») · Gravité : mineur
- Correction retenue : « un arrière-plan net et sans élément parasite ».

**FR-32 · image**
- Extrait actuel : `![plateau interchangeable de l'Alphashot Micro Pro v2](/images/blog/67d05590a1bdfbab969075e5.avif)`
- Catégorie : alt / cohérence image-texte · Gravité : mineur
- Explication : l'image montre des mains gantées installant un plateau sombre, alors que le paragraphe parle du plateau transparent ; alt sans majuscule initiale et peu descriptif.
- Correction retenue : « Mains gantées installant un plateau interchangeable dans l'Alphashot Micro Pro v2 » → `06` point 24.

### Étape 3

**FR-33 · §1**
- Extrait actuel : `Une fois que vous avez votre plateau transparent à disposition et que votre appareil photo est prêt, vous pouvez placer la bague à **plat** ou la faire tenir **debout**`
- Catégorie : style (lourdeur) · Gravité : mineur
- Correction retenue : « Une fois le plateau transparent en place et l'appareil photo prêt, vous pouvez poser la bague à plat ou la faire tenir debout ».

**FR-34 · §1**
- Extrait actuel : `Contrairement à d'autres solutions sur le marché, l'Alphashot Micro V2 **ne dispose pas d'un système intégré pour maintenir les bagues** en position verticale.`
- Catégorie : claim comparatif (concurrents) · Gravité : info
- Correction retenue : sens conservé, appellation harmonisée → `06` point 11.

**FR-35 · §1**
- Extrait actuel : `Assurez-vous que l'**éclairage** soit bien ajusté pour éviter les **ombres indésirables**.`
- Catégorie : grammaire (indicatif après « s'assurer que ») · Gravité : mineur. Confirmé (revue).
- Correction retenue : « Assurez-vous que l'éclairage est bien réglé ».

**FR-36 · §1**
- Extrait actuel : `Cet adhésif pourra ensuite être **retiré facilement** à l'aide d'outils de retouche, via le logiciel, garantissant ainsi que vos images restent **impeccables**.`
- Catégorie : style (passif, participe en cascade) · Gravité : mineur
- Correction retenue : « L'adhésif se retire ensuite facilement avec les outils de retouche du logiciel, pour des images impeccables. »

**FR-37 · image**
- Extrait actuel : `![photographier une bague avec un adhésif transparent pour la fixer sur le plateau de l'Alphashot Micro Pro v2](…075cd.avif)`
- Catégorie : alt rédigé comme une requête · Gravité : mineur
- Correction retenue : « Bague maintenue debout par un adhésif transparent sur le plateau en verre de l'Alphashot Micro Pro v2 ».

### Étape 4

**FR-38 · intertitre**
- Extrait actuel : `4. Positionner les spots réglables pour photographier une bague, ajouter de la brillance et adoucir la lumière avec des diffuseurs`
- Catégorie : style / SEO (intertitre trop long, bourrage) · Gravité : mineur
- Correction retenue : « 4. Positionner les spots réglables pour faire briller la bague et adoucir la lumière avec des diffuseurs ».

**FR-39 · §1**
- Extrait actuel : `L'**intensité** du spot peut être modifiée de **1 à 100%**`
- Catégorie : typographie · Gravité : mineur
- Correction retenue : « se règle de 1 à 100 % » (espace insécable).

**FR-40 · §1**
- Extrait actuel : `offre une **flexibilité** supplémentaire pour illuminer chaque **facette** et **reflet**`
- Catégorie : anglicisme (« flexibilité ») · Gravité : mineur
- Correction retenue : « une grande souplesse de réglage pour éclairer chaque facette et chaque reflet ».

**FR-41 · image**
- Extrait actuel : `![Spot additionnel réglable studio photo](…075d3.avif)`
- Catégorie : alt télégraphique · Gravité : mineur
- Correction retenue : « Spot additionnel sur bras flexible et objectif de l'appareil photo au-dessus d'une bague, à l'intérieur du studio ».

### Étape 5

**FR-42 · §1**
- Extrait actuel : `les **incrustations de pierres précieuses**`
- Catégorie : terminologie joaillière (sertissage) · Gravité : mineur
- Correction retenue : « les pierres serties ».

**FR-43 · §2**
- Extrait actuel : `utilisez le **réflecteur argenté** de manière à créer des **éclats lumineux** peut donner un effet **scintillant impressionnant**.`
- Catégorie : syntaxe cassée (impératif + sujet infinitif fusionnés) · Gravité : majeur. Confirmé (revue).
- Correction retenue : « orienter le réflecteur argenté de façon à créer des éclats lumineux peut produire un effet scintillant impressionnant » (modal « peut » conservé).

**FR-44 · §2**
- Extrait actuel : `utilisez un **réflecteur noir** pour accentuer les ombres peut ajouter de la **profondeur** et du **mystère** à l'image finale.`
- Catégorie : syntaxe cassée · Gravité : majeur. Confirmé (revue).
- Correction retenue : « utiliser un réflecteur noir pour accentuer les ombres peut apporter de la profondeur et une part de mystère à l'image finale ».

### Étape 6

**FR-45 · §1**
- Extrait actuel : `certaines pierres, comme l'**ambre**, peuvent réagir négativement à un éclairage intense`
- Catégorie : calque (« react negatively ») · Gravité : mineur
- Correction retenue : « peuvent mal réagir à un éclairage intense ».

**FR-46 · image**
- Extrait actuel : `![Eclairage du studio Alphashot Micro Pro v2](…07600.avif)`
- Catégorie : accent sur capitale manquant · Gravité : mineur. Confirmé (revue).
- Correction retenue : « Intérieur éclairé de l'Alphashot Micro Pro v2 : bandeaux LED, spot orientable et objectif de l'appareil photo ».

**FR-47 · §2**
- Extrait actuel : `Lorsqu'elle est maîtrisée, elle sublime les **couleurs**`
- Catégorie : référence ambiguë · Gravité : mineur
- Explication : « elle » renvoie grammaticalement à « la configuration la plus flatteuse » (dernier nom féminin), alors que le sens vise « la lumière », citée deux blocs plus haut, avant l'image.
- Correction retenue : « Bien maîtrisée, la lumière sublime les couleurs ».

**FR-48 · §2**
- Extrait actuel : `L'Alphashot Micro Pro v2 est équipé d'un système exclusif d'**éclairage cylindrique** autour des objets.`
- Catégorie : claim (« exclusif ») · Gravité : info
- Correction retenue : conservé (« qui entoure l'objet ») → `06` point 9.

**FR-49 · §2**
- Extrait actuel : `Il permet également une **interaction virtuelle** avec votre prospect.`
- Catégorie : incompréhensible · Gravité : majeur (requalifié, la revue disait mineur : phrase sans sens dans un paragraphe sur l'éclairage)
- Correction retenue : phrase retirée du texte publiable, note `[À VALIDER]` avec reformulation conditionnelle → `06` point 13.

### Étape 7

**FR-50 · intertitre**
- Extrait actuel : `7. Utiliser le logiciel pour la post-production et ajuster les couleurs des bijoux en argent ou en or`
- Catégorie : style (intertitre long) · Gravité : mineur
- Correction retenue : « 7. Post-production : ajuster dans le logiciel les couleurs des bijoux en argent ou en or ».

**FR-51 · image**
- Extrait actuel : `![photographier une bague en ajustant les couleurs en argent ou en or](…075b6.avif)`
- Catégorie : alt rédigé comme une requête · Gravité : mineur
- Correction retenue : « Deux bagues solitaires, l'une en or jaune, l'autre argentée, sur fond blanc ».

**FR-52 · §2**
- Extrait actuel : `De plus, utilisez le logiciel de **retouche**, intégré au studio photo Orbitvu.`
- Catégorie : ponctuation (virgule superflue) · Gravité : mineur
- Correction retenue : « Utilisez ensuite le logiciel de retouche intégré au studio photo Orbitvu. »

**FR-53 · §2**
- Extrait actuel : `les **couleurs véritables** des bijoux apparaissent **nettes** et **éclatantes** sans capturer les reflets environnants`
- Catégorie : illogisme (la retouche ne « capture » rien) · Gravité : mineur
- Correction retenue : « Les couleurs réelles des bijoux apparaissent ainsi nettes et éclatantes, sans être faussées par les reflets de l'environnement. »

### Étape 8

**FR-54 · intertitre / §2**
- Extraits actuels : `8. Utiliser une configuration de plateau noir et un réflecteur noir` / `Notre configuration de **table noire** et **réflecteur noir**`
- Catégorie : incohérence terminologique · Gravité : mineur
- Correction retenue : « plateau noir » partout.

**FR-55 · §1**
- Extrait actuel : `un plateau vous permet de présenter vos produits comme vous souhaitez`
- Catégorie : grammaire (pronom « le » omis) · Gravité : mineur
- Correction retenue : « comme vous le souhaitez ».

**FR-56 · §1**
- Extrait actuel : `En effet, avec cette technique, vous pourrez créer des photos **uniques** et **captivantes**`
- Catégorie : connecteur impropre (« En effet » sans lien causal) · Gravité : mineur
- Correction retenue : « Cette technique vous permet de créer des photos uniques et captivantes ».

**FR-57 · image**
- Extrait actuel : `![Packshot d'une montre sur fond noir et réflecteur noir](…075d9.avif)`
- Catégorie : cohérence image-texte · Gravité : mineur
- Explication : une montre (marque tierce lisible sur le cadran) illustre un article sur les bagues.
- Correction retenue : image conservée, alt précisé (« Packshot d'une montre à cadran bleu sur fond noir avec réflecteur noir ») → `06` point 23.

### Conclusion

**FR-58 · §1**
- Extrait actuel : `En effet, ces techniques soulignent chaque **détail**`
- Catégorie : connecteur impropre · Gravité : mineur
- Correction retenue : « : chaque détail est souligné, la brillance des pierres précieuses est accentuée ».

**FR-59 · §2**
- Extrait actuel : `Cela attire l'attention des clients et augmente vos **ventes**.`
- Catégorie : claim commercial non sourcé · Gravité : info
- Correction retenue : « de quoi retenir l'attention de vos clients et soutenir vos ventes » (formulation plus prudente) → `06` point 15.

**FR-60 · §2–3 et étape 8**
- Extraits actuels : `Cela est essentiel pour bâtir la **confiance** et la **satisfaction**` ; `notre studio de photographie spécialisé en bijouterie` ; `notre **technologie avancée**` ; `Notre configuration`
- Catégorie : style (« Cela est », « bâtir la satisfaction ») + conformité distributeur (« notre » pour un matériel Orbitvu) · Gravité : info
- Correction retenue : style corrigé ; « notre » conservé → `06` point 16.

### FAQ (champ `faqs`, repris en JSON-LD FAQPage)

**FR-61 · réponse 1 et réponse 5**
- Extraits actuels : `permet de traiter jusqu'à 150 bijoux par jour` ; `(jusqu'à 150 produits par jour)`
- Catégorie : chiffre non sourcé, en désaccord avec le catalogue (200 produits/jour, `machines.ts`) · Gravité : majeur (info pour la proposition : chiffre conservé)
- Correction retenue : 150 conservé → `06` point 17.

**FR-62 · réponse 2**
- Extrait actuel : `même les plus petits détails36`
- Catégorie : artefact d'outil (appel de note collé) · Gravité : majeur (requalifié, la revue disait mineur : l'artefact est publié dans le JSON-LD FAQPage)
- Correction retenue : « jusque dans les plus petits détails ».

**FR-63 · réponse 2**
- Extrait actuel : `Combinée à une ouverture optimale (f/16-f/22), cette technologie garantit une netteté irréprochable`
- Catégorie : claim technique (« garantit », « optimale ») + typographie de plage · Gravité : info
- Explication : en macro, f/16-f/22 expose à la diffraction ; le focus stacking sert justement à s'en affranchir (revue). À valider par un photographe.
- Correction retenue : « Combinée à une ouverture de f/16 à f/22, elle permet d'obtenir une netteté irréprochable » → `06` point 18.

**FR-64 · réponse 3**
- Extraits actuels : `des portes latérales rétroéclairées ajustables` (FAQ) / `**portes latérales amovibles rétroéclairées LED**` (étape 6)
- Catégorie : incohérence produit (amovibles / ajustables) · Gravité : mineur
- Correction retenue : chaque mention conservée telle quelle (« réglables » en FAQ) → `06` point 12.

**FR-65 · réponse 3**
- Extrait actuel : `Le logiciel propose des préréglages spécifiques pour différents matériaux (or, diamant, saphir, émeraude, perle, rubis), optimisant automatiquement l'éclairage`
- Catégorie : claim fonctionnel · Gravité : info → `06` point 19.

**FR-66 · réponse 4**
- Extrait actuel : `Le studio intègre des paramètres préconfigurés conformes aux exigences des principales plateformes e-commerce.`
- Catégorie : claim fonctionnel · Gravité : info → `06` point 20.

**FR-67 · question 5**
- Extrait actuel : `Quel est le retour sur investissement pour un studio photo automatisé ?`
- Catégorie : préposition · Gravité : mineur
- Correction retenue : « Quel est le retour sur investissement d'un studio photo automatisé ? »

**FR-68 · réponse 5**
- Extrait actuel : `Le ROI est optimisé grâce à plusieurs facteurs : … la réduction significative du temps de traitement (jusqu'à 150 produits par jour), et l'élimination des coûts de sous-traitance photo.`
- Catégorie : logique (un débit présenté comme une durée) + claim (« élimination ») + virgule avant « et » · Gravité : info
- Correction retenue : « un temps de traitement nettement réduit (jusqu'à 150 produits par jour) et la suppression des coûts de sous-traitance photo » → `06` point 21.

[Note de décompte : FR-09 rassemble 5 occurrences de la même anomalie d'appellation, FR-60 et FR-64 en rassemblent plusieurs ; chaque rubrique compte pour une anomalie.]

---

## EN

Verdict : traduction automatique non relue, faite sur le HTML français (mots collés aux balises). Correction retenue pour toutes les lignes : **retraduction intégrale** depuis le FR corrigé (`04-PROPOSITION_EN.md`) ; la colonne « Correction » donne la formulation retenue quand elle est utile. Les claims sont traités comme en FR (renvois `06`).

### Métadonnées

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-M1 | `Photographing a ring like a pro in 8 steps` (title, h1, metaTitle) | SEO | mineur | Correct mais ne porte pas les requêtes principales « how to photograph rings » (310 impr.) et « ring photography » (270 impr.). | voir `05` |
| EN-M2 | `Discover 8 tips for shooting a ring, mastering the framing, lighting and background for exceptional visuals!` | promesse non tenue | mineur | « framing » non traité ; 108 caractères. | voir `05` |

### Introduction

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-01 | `represents a **considerable challenge** For the` | calque + majuscule parasite | mineur | « represents » calque ; « For » en milieu de phrase. | « Ring photography is a real challenge for » |
| EN-02 | `[professionals in the jewelry sector]` | calque | mineur | Périphrase lourde. | « [jewelry professionals] » (même cible) |
| EN-03 | `Capture all **particulars** and reduce the time of **retouching** are daily challenges.` | agrammatical + faux ami | bloquant | Impératifs en sujet ; « particulars » ≠ détails. | « Capturing every detail while keeping retouching time down… » |
| EN-04 | `which require special attention to reveal all their splendor` | accord | mineur | « their » pour « each piece ». | « needs specific attention to reveal its full splendor » |
| EN-05 | `Les **reflections of light**` | mot français | bloquant | Article français « Les ». | « light reflections » |
| EN-06 | `and the **finesse** jewelry must be carefully highlighted` | agrammatical | majeur | « of » manquant ; « finesse » impropre. | « the delicacy of the piece » |
| EN-07 | `The photo studio **Alphashot Micro Pro v2**, is offering today a **innovative and unique technology**` | ponctuation + article + claim | majeur | Virgule sujet/verbe ; « a innovative » ; claim « unique » (cf. FR-05). | « Its Alphashot Micro Pro v2 photo studio relies on innovative technology » |
| EN-08 | `to maintain and photograph a ring with disconcerting ease` | contresens + calque | majeur | « maintain » (entretenir) pour « maintenir » (tenir) ; « disconcerting » calque. | « makes photographing a ring remarkably simple » |
| EN-09 | `you can guarantee **exceptional results** that will highlight the**sheen** And the **quality**` | mot collé + majuscule + claim | majeur | « thesheen » au rendu ; « And » ; « guarantee » (cf. FR-06). | « You get exceptional results that highlight the brilliance and quality » |
| EN-10 | `will allow you to **Sublimate** every detail` | calque + majuscule | mineur | « sublimate » = sublimer (chimie). | « brings out every detail » |
| EN-11 | `with a **unparalleled precision**` | article + claim | mineur | « a unparalleled » ; superlatif (cf. FR-08). | « with great precision » |

### Présentation vidéo

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-12 | `Alphashot Micro V2 video presentation` | appellation + ordre calqué | majeur | Cf. FR-09. | « Alphashot Micro Pro v2 video overview » |
| EN-13 | `the[**Alphashot Micro Version 2**]` | mot collé (lien) + appellation | majeur | « theAlphashot » au rendu (20e mot collé, non compté par la revue). | « the [Alphashot Micro Pro v2] » |
| EN-14 | `Here are its main characteristics:` | calque | mineur | « features » plus naturel. | « Here are its main features: » |
| EN-15 | `One **cylindrical shape** creating a **closed environment**` | calque (« Une » → « One ») | majeur | Article numéral. | « A cylindrical shape that creates an enclosed environment » |
| EN-16 | `with a protective button for safety` | calque | mineur | Redondance. | « with a safety button » |
| EN-17 | `in terms of**loudness** And of **light**` | contresens + mot collé | majeur | « loudness » = volume sonore. | « whose intensity can be adjusted individually » |
| EN-18 | `**Rotating platform** at the base to create presentations at **An angle**` | terminologie + majuscule | majeur | « turntable » ; « An » ; « presentations at an angle » incompréhensible. | « A turntable at the base for single-angle, multi-angle and 360° views » |
| EN-19 | `The exclusive function **Brilliance Light** which combines two different configurations:` | ordre des mots + claim | mineur | « function » + nom propre calqué ; « exclusive » (cf. FR-15). | « The exclusive Brilliance Light feature, which combines two setups: » |
| EN-20 | `One **Spotlight** for focused light on certain stones or diamonds` | calque + majuscule | mineur | « One » ; « Spotlight ». | « a spotlight that focuses light on specific stones or diamonds » |
| EN-21 | `Of **LED Brilliance** located above and below the camera` | calque (« Des » → « Of ») | majeur | Puce agrammaticale. | « LED Brilliance lights positioned above and below the camera » |
| EN-22 | `can be controlled at **100% from the software**` | calque | mineur | « at 100% ». | « are fully controlled from the software » |
| EN-23 | `allows the camera to be connected directly to the solution` | calque | mineur | « solution » pour le studio. | « attaches the camera directly to the studio » |
| EN-24 | `The new design of the Alphashot Micro V2` | appellation + claim daté | info | Cf. FR-09, FR-20. | « The new design of the Alphashot Micro Pro v2 » |
| EN-25 | `offers you the possibility of photographing different contrasts` | calque | mineur | Lourdeur. | « you can photograph the same product with different levels of contrast » |
| EN-26 | `You can also create your own models` | faux ami | mineur | « modèles » = templates. | « your own templates » |
| EN-27 | `the Orbitvu Station software synchronized with the Alphashot Micro V2 is the **glare management**` | calque + appellation | mineur | « synchronized » ; V2. | « The Orbitvu Station software that works with the Alphashot Micro Pro v2 also handles reflection management » |
| EN-28 | `As confirmed by our users, the objective **100mm macro**` | faux ami + ordre + témoignage | majeur | « objective » ≠ lens. | « Our users confirm it: a 100mm macro lens » |

### Étape 1

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-29 | `1. Choosing the right lens to shoot a ring` | incohérence d'intertitres | mineur | Gérondif seul, étapes 2 à 8 à l'impératif. Confirmé (revue). | « 1. Choose the right lens to photograph a ring » |
| EN-30 | `the choice of**purpose** is crucial` | contresens + mot collé | majeur | « purpose » pour « objectif » optique. | « the choice of lens is critical » |
| EN-31 | `THE**macro lens** is perfect` | majuscules + mot collé | majeur | « THEmacro » au rendu. | « A macro lens is ideal » |
| EN-32 | `the **sharpness** And the **particulars** products` | agrammatical + faux ami | majeur | « of » manquant, « particulars ». | « the sharpness and detail of the product » |
| EN-33 | `you can capture **smallest details**` | article manquant | mineur | — | « the finest details » |
| EN-34 | `![__wf_reserved_inherit](…7fc0.avif)` | alt réservé | majeur | Aucune description. | « Canon Macro 100mm lens next to a Canon 24-70mm zoom lens on a teal background » |
| EN-35 | `we recommend the**Canon 100mm macro lens**` | mot collé | majeur | « theCanon ». | « the Canon 100mm macro lens » |
| EN-36 | `capture **breathtaking details** very closely` | calque | mineur | « very closely » impropre. | « render striking detail at very close range » |
| EN-37 | `This lens will highlight the smallest details of your rings, highlighting the **quality** And the**handwork**` | répétition + mot collé + faux ami | majeur | « highlight… highlighting » ; « handwork » (≠ craftsmanship). | « showcases the quality and craftsmanship » |
| EN-38 | `the effect of **fuzzy** Due to a **low depth of field**` | agrammatical + terminologie | majeur | « fuzzy » adjectif ; « low » → shallow. Confirmé (revue). | « the blur caused by a shallow depth of field » |
| EN-39 | `If not, you can always use the function **Superfocus**` | incompréhensible + ordre | majeur | Cf. FR-28. | « If you want an image that is sharp from front to back, use the Superfocus feature (focus stacking) » |

### Étape 2

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-40 | `2. Use the transparent tray to photograph a ring and improve the appearance of the jewelry` | style | mineur | Intertitre long. Confirmé (revue). | « 2. Use the transparent tray to showcase the ring » |
| EN-41 | `Thanks to his **smooth and homogeneous surface**` | pronom | mineur | « his » pour un objet. Confirmé (revue). | « Thanks to its smooth, even surface » |
| EN-42 | `highlights the **meticulous details** And the **sheen** jewelry` | agrammatical | majeur | « of » manquant ; « meticulous details » impropre. | « brings out the finest details and the brilliance of the jewelry » |
| EN-43 | `aligning the ring with the**axis of rotation**` | mot collé | majeur | « theaxis ». | « the axis of rotation » |
| EN-44 | `presentation** of each room.` | contresens | majeur | « pièce » → « room ». Confirmé (revue). | « of every piece » |
| EN-45 | `![plateau interchangeable de l'Alphashot Micro Pro v2](…75e5.avif)` | alt en français | majeur | Confirmé (revue). | « Gloved hands installing an interchangeable tray in the Alphashot Micro Pro v2 » |
| EN-46 | `that it's secure **Fixed** at this location` | agrammatical + majuscule | mineur | Confirmé (revue). | « is securely held in place » |
| EN-47 | `the **beauty** And the**sheen** of your creations` | mot collé + majuscule | majeur | « thesheen ». | « the beauty and brilliance of your creations » |

### Étape 3

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-48 | `Once you have your transparent tray ready and your camera is ready` | répétition | mineur | « ready… ready ». | « Once the transparent tray is in place and your camera is ready » |
| EN-49 | `you can place the ring in **flat** Or make it stick **up**` | incompréhensible | majeur | Confirmé (revue). | « lay the ring flat or stand it upright » |
| EN-50 | `Make sure that the**lighting** be well adjusted` | mot collé + subjonctif calqué | majeur | « thelighting » ; « be ». | « Make sure the lighting is properly adjusted » |
| EN-51 | `Remember to check the**alignment** And the **Focus**` | mot collé + majuscules + omission | majeur | « thealignment » ; « régulièrement » non traduit. | « Remember to check alignment and focus regularly » |
| EN-52 | `![photographier une bague avec un adhésif transparent…](…75cd.avif)` | alt en français | majeur | Confirmé (revue). | « Ring held upright with clear adhesive on the glass tray of the Alphashot Micro Pro v2 » |

### Étape 4

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-53 | `4. Position the adjustable spots to shoot a ring, add shine and soften the light with diffusers` | calque | mineur | « spots » (spotlights). | « 4. Position the adjustable spotlights to make the ring sparkle and soften the light with diffusers » |
| EN-54 | `perfect for adding **sheen** and highlight the**natural shine** precious stones` | parallélisme + mot collé + « of » manquant | majeur | « thenatural ». | « perfect for adding sparkle and bringing out the natural brilliance of gemstones » |
| EN-55 | `These spots are of a great **precision**` | calque | mineur | — | « These highly precise spotlights » |
| EN-56 | `THE**loudness** of the spot can be changed from **1 to 100%**` | contresens + mot collé + majuscules | majeur | Confirmé (revue). | « Spotlight intensity can be set from 1 to 100% » |
| EN-57 | `can be used for **soften the light**` | agrammatical | mineur | « for » + base verbale. | « can be used to soften the light » |
| EN-58 | `offers a **flexibility** additional to illuminate each **facet** and **Reflection** precious stones` | ordre + majuscule + « of » manquant | majeur | — | « give you extra flexibility to light every facet and reflection of the stones » |
| EN-59 | `photos of a **exceptional quality**` | article | mineur | « a exceptional ». | « shots of exceptional quality » |
| EN-60 | `![Spot additionnel réglable studio photo](…75d3.avif)` | alt en français | majeur | Confirmé (revue). | « Additional spotlight on a flexible arm and camera lens above a ring inside the studio » |

### Étape 5

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-61 | `Create a **adequate contrast** is crucial` | agrammatical + article | majeur | Impératif en sujet ; « a adequate ». | « Getting the right contrast is crucial » |
| EN-62 | `such as **gemstone inlays** And the **fine details**` | terminologie + majuscule | mineur | « inlays » (cf. FR-42). | « such as set gemstones and the finest details » |
| EN-63 | `optimize the **color rendering** And **textures**` | majuscule | mineur | — | « improve the color rendering and textures » |
| EN-64 | `sublimating each piece in a refined way` | calque | mineur | — | « for a refined presentation of every piece » |
| EN-65 | `![Réflecteurs argentés et noirs de l'Alphashot Micro Pro v2](…75d0.avif)` | alt en français | majeur | Confirmé (revue). | « Exploded view of the Alphashot Micro Pro v2 with its interchangeable silver and black reflectors » |
| EN-66 | `use the **silver reflector** in order to create **bright flashes** can give an effect **impressive sparkly**` | agrammatical + ordre | majeur | Hérite de FR-43, aggravé. | « angling the silver reflector to create bright highlights can produce an impressive sparkling effect » |
| EN-67 | `capture **Light games**` | calque + majuscule | mineur | « jeux de lumière » = plays of light. | « capture plays of light » |
| EN-68 | `enhance the elegance of the room` | contresens | majeur | « pièce » → « room ». | « enhance the elegance of the piece » |
| EN-69 | `highlight the **sheen** And the **purity** precious stones` | « of » manquant + majuscule | mineur | — | « bringing out the brilliance and purity of the stones » |
| EN-70 | `in matt metal` | orthographe britannique | mineur | US : matte. | « in matte metal » |
| EN-71 | `use a **black reflector** to accentuate the shadows can add **depth** And of **mystery**` | agrammatical | majeur | Hérite de FR-44. | « using a black reflector to deepen the shadows can add depth and a touch of mystery » |
| EN-72 | `adding a touch **dramatic**` | ordre des mots | mineur | — | « adding a dramatic touch » |

### Étape 6

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-73 | `6. Adapt the lighting for particular stones such as amber` | faux ami | mineur | « particular » ≠ particulier/spécial. | « 6. Adapt the lighting for special stones such as amber » |
| EN-74 | `a series of photos **Coherent** and **True to reality**` | majuscules + calque | mineur | — | « consistent and true to life » |
| EN-75 | `such as**amber**` | mot collé | majeur | « asamber ». | « such as amber » |
| EN-76 | `may react negatively to intense lighting` | calque | mineur | Cf. FR-45. | « can react poorly to intense lighting » |
| EN-77 | `It is therefore essential to**adapt your approach**` | mot collé | majeur | « toadapt ». | « so it is essential to adapt your approach » |
| EN-78 | `Avoid lamps that could hide the **natural beauty** stones and experience different **light settings**` | « of » manquant + contresens | majeur | « experience » ≠ expérimenter. | « Avoid lamps that could mask the natural beauty of these stones, and try different lighting settings » |
| EN-79 | `to find the most suitable configuration **flattering**` | ordre + doublon | mineur | — | « to find the most flattering setup » |
| EN-80 | `![Eclairage du studio Alphashot Micro Pro v2](…7600.avif)` | alt en français | majeur | Confirmé (revue). | « Lit interior of the Alphashot Micro Pro v2: LED strips, adjustable spotlight and camera lens » |
| EN-81 | `When mastered, it enhances the **colours**` | référence ambiguë + orthographe britannique | mineur | Cf. FR-47 ; US : colors. | « When you master it, light enhances colors » |
| EN-82 | `reveals the **particulars**, the **brilliances** And the**sheen** of the stone` | faux ami + mot collé | majeur | « thesheen ». | « reveals the details, highlights and brilliance of the stone » |
| EN-83 | `an exclusive system of**cylindrical lighting** around objects` | mot collé + claim | majeur | « ofcylindrical » ; « exclusive » (cf. FR-48). | « an exclusive cylindrical lighting system that surrounds the object » |
| EN-84 | `while benefiting from more lighting **subtle**` | ordre des mots | mineur | — | « while providing more subtle lighting » |
| EN-85 | `It also allows a **virtual interaction** with your prospect.` | incompréhensible | majeur | Cf. FR-49. | retirée, note `[À VALIDER]` |

### Étape 7

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-86 | `The **embedded software** Accelerate it **post-production**` | agrammatical | majeur | Confirmé (revue). | « The built-in software speeds up the post-production of your content » |
| EN-87 | `a multitude of**tools** And of **functionalities**` | mot collé + calque | majeur | « oftools » ; « functionalities ». | « a wide range of tools and features » |
| EN-88 | `offers the possibility of**Adjust colors selectively**` | mot collé + agrammatical | majeur | « ofAdjust ». | « it lets you adjust colors selectively » |
| EN-89 | `Photographing a ring in **silver** Or in **gold**` | majuscule | mineur | — | « Photographing a silver or gold ring » |
| EN-90 | `to avoid **hard shadows** And the **unwanted reflections**` | majuscule + article | mineur | — | « to avoid harsh shadows and unwanted reflections » |
| EN-91 | `to highlight the pieces and to highlight their **natural shine**` | répétition | mineur | — | « to showcase the pieces and bring out their natural shine » |
| EN-92 | `![photographier une bague en ajustant les couleurs en argent ou en or](…75b6.avif)` | alt en français | majeur | Confirmé (revue). | « Two solitaire rings, one in yellow gold and one in silver-toned metal, on a white background » |
| EN-93 | `use the software of **retouching**` | calque | mineur | — | « use the retouching software » |
| EN-94 | `Adjust the shades **greys** and **yolks**` | contresens | majeur | « yolks » = jaunes d'œuf. Confirmé (revue). | « Adjust gray and yellow tones » |
| EN-95 | `by playing on the **Gray tolerance**, the **saturation** And the **luminosity**` | majuscules + calque | mineur | « luminosity » → brightness. | « using the gray tolerance, saturation and brightness settings » |
| EN-96 | `the **true colors** jewels appear **Net** and **Brilliant** without capturing the surrounding reflections` | agrammatical + mots français | majeur | « Net » ; cf. FR-53. Confirmé (revue). | « the true colors of the jewelry look sharp and vivid, without being distorted by surrounding reflections » |
| EN-97 | `the **quality** jewelry photographed` | « of » manquant | mineur | — | « the beauty and quality of the jewelry » |
| EN-98 | `to correct the small **imperfections** to get a final result **spotless** !` | ordre + espace avant « ! » | mineur | Typographie française en anglais. | « correct small imperfections for a flawless final result! » |

### Étape 8

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-99 | `Let it be **white**, **black** Or in **glass**` | calque | majeur | « Qu'il soit » rendu littéralement. | « White, black or glass, a tray lets you present… » |
| EN-100 | `highlight **particulars** And the **Subjects** of your jewelry` | contresens | majeur | « matières » → « Subjects ». | « highlight the details and materials of your pieces » |
| EN-101 | `create photos **Uniques** and **captivating**` | mot français + ordre | bloquant | Confirmé (revue). | « create unique, captivating photos » |
| EN-102 | `![Packshot d'une montre sur fond noir et réflecteur noir](…75d9.avif)` | alt en français | majeur | Confirmé (revue). | « Packshot of a watch with a blue dial on a black background with a black reflector » |
| EN-103 | `Our configuration of **Black table** and **black reflector** Sublimate your jewelry` | calque + accord + majuscules | majeur | Confirmé (revue) ; « table » (cf. FR-54). | « Our black tray and black reflector setup makes your jewelry shine » |
| EN-104 | `It highlights their **sheen** And their **particulars**` | faux ami + majuscule | mineur | — | « it highlights its brilliance and detail » |
| EN-105 | `Perfect for images **captivating** and **professionals**, it gives your jewelry an appeal **elegant**` | ordre + accord | majeur | Confirmé (revue). | « gives it an elegant look, for captivating, professional images » |
| EN-106 | `capture each **facet** and **Reflection**` | majuscule | mineur | — | « capture every facet and reflection » |

### Conclusion

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-107 | `and at the**Alphashot Micro Pro v2**` | mot collé + préposition | majeur | « theAlphashot ». | « and the Alphashot Micro Pro v2 » |
| EN-108 | `optimizes your **workflows** for results **exceptional** and **homogeneous**` | ordre + calque | mineur | — | « streamlines your workflow for exceptional, consistent results » |
| EN-109 | `highlight your jewelry in a **occupational**` | contresens + phrase incomplète | majeur | Confirmé (revue). | « showcase your jewelry professionally » |
| EN-110 | `accentuate the **sheen** precious stones` | « of » manquant | mineur | — | « the brilliance of gemstones is enhanced » |
| EN-111 | `La **precision** And the **clearness** of Orbitvu equipment bring out the **beauty** of each room.` | mot français + contresens | bloquant | Confirmé (revue). | « The precision and clarity of Orbitvu equipment bring out the beauty of every piece » |
| EN-112 | `It attracts customer attention and increases your **Sales**.` | majuscule + claim | info | Cf. FR-59. | « helping you capture your customers' attention and support your sales » |
| EN-113 | `You will win in **efficiency**` | calque | mineur | « gagner en » → « win in ». | « You'll work more efficiently » |

### FAQ

| # | Extrait actuel | Catégorie | Gravité | Explication | Correction |
|---|---|---|---|---|---|
| EN-114 | `How to maximize productivity with an automated studio?` (et `How to effectively manage…?`, `How to optimize visuals for e-commerce?`) | forme interrogative | mineur | « How to … ? » n'est pas une question complète. | « How can you maximize… » / « How do you manage… » / « How do you optimize… » |
| EN-115 | `can process up to 150 jewels per day` | faux ami + claim | mineur | « jewels » = joyaux ; 150 vs 200 (cf. FR-61). Confirmé (revue). | « up to 150 pieces of jewelry per day » |
| EN-116 | `including the removal of transparent media` | faux ami | mineur | Confirmé (revue). | « removing transparent supports » |
| EN-117 | `even the smallest details36` | artefact | majeur | Cf. FR-62. Confirmé (revue). | « down to the smallest details » |
| EN-118 | `(gold, diamond, diamond, sapphire, emerald, pearl, rubies)` | doublon + pluriel | mineur | Doublon absent du FR. Confirmé (revue). | « (gold, diamond, sapphire, emerald, pearl, ruby) » |

[Lignes EN-01 à EN-118 : 118 anomalies. Mots collés vérifiés dans le HTML : 19 cas `mot<strong>` (liste de la revue confirmée) + 1 cas `the<a>` (EN-13) = 20.]

---

## Anomalies globales (FR et EN)

**G-1 · surcharge de gras** — 209 segments `<strong>` dans chaque langue (souvent un mot isolé). Catégorie : mise en forme / lisibilité · Gravité : mineur. Correction retenue : gras limité aux termes clés (environ 100 segments par langue, questions de FAQ comprises) → `06` point 34.

**G-2 · paragraphes vides** — 17 paragraphes `<p>‍</p>` (ZWJ) hérités de Webflow, dans chaque langue. Catégorie : artefact · Gravité : mineur. Correction retenue : non reproduits.

**G-3 · lien EN vers une page FR** — `[professionals in the jewelry sector](/en/industrie/bijoux-joaillerie)` : cible inscrite dans `NOINDEX_EN_INDUSTRIE_SLUGS` (`lib/seo-config.ts`). Catégorie : maillage · Gravité : mineur. Correction retenue : cible conservée, ancre traduite → `06` point 31.

**G-4 · textes alternatifs EN** — 7 alt sur 8 en français, 1 réservé (`__wf_reserved_inherit`). Détail en EN-34, 45, 52, 60, 65, 80, 92, 102. Gravité : majeur.

**G-5 · espaces avant la ponctuation haute (FR)** — `exceptionnels !`, `automatisé ?`, `principales :` etc. : espaces ordinaires dans tout le JSON FR (corps, description, FAQ), donc risque de ponctuation rejetée seule en début de ligne. Catégorie : typographie · Gravité : mineur. Correction retenue : espaces insécables dans `04-PROPOSITION_FR.md` et dans les valeurs FR de `05`.

---

## Écarts avec la revue

- **Aucune anomalie de la revue n'est fausse** : les 15 anomalies FR et 24 anomalies EN listées dans le JSON ont toutes été retrouvées mot pour mot dans `01`.
- **Requalifiées** : `__wf_reserved_inherit` (FR-25) et `détails36` (FR-62) passent de mineur à majeur (image clé sans description ; artefact publié dans le JSON-LD FAQPage) ; « interaction virtuelle » (FR-49) passe de mineur à majeur.
- **Correction de la revue amendée** : la revue propose « grey » (EN-94/95) ; la proposition retient « gray », graphie américaine conforme à l'usage du dépôt.
- **Complément** : la revue compte 19 mots collés ; un 20e existe sur le lien produit (`the[**Alphashot Micro Version 2**]`, EN-13).
- **Faux positif écarté** : dans `01`, `deux configurations différentes :Un **spotlight**` paraît collé, mais le HTML contient une liste imbriquée correcte (`:<ul><li>Un`) ; ce n'est pas une anomalie de texte. La proposition conserve la liste imbriquée.
