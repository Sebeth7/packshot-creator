# Anomalies annotées — interview du fondateur (famille `67e2ad276291f90c1cf0dc8b`)

Base vérifiée : `01-TEXTE_ACTUEL.md` et les JSON de `main` `17fc0b3` (balisage HTML compris), comparés à l'import `56d4bc32` (`02-ORIGINAL_RETROUVE.md`). Chaque anomalie de la revue `reviews/67e2ad276291f90c1cf0dc8b.json` a été contrôlée contre ces sources.

Statut par rapport à la revue : **confirmée** (présente et exacte), **ajoutée** (absente de la revue), **rectifiée** (présente mais mal qualifiée), **retirée** (fausse).

Gravité : **bloquant** (défaut servi qui rend un élément faux ou incompréhensible), **majeur** (erreur de fait, de sens ou d'attribution visible), **mineur** (langue, typographie, mise en forme), **à arbitrer** (point qui dépend d'une décision humaine, 06), **signalement** (constaté, hors périmètre de la proposition).

## Bilan

| Langue | Entrées | Bloquant | Majeur | À arbitrer | Mineur | Signalement |
|---|---|---|---|---|---|---|
| FR | 41 | 4 | 10 | 3 | 23 | 1 |
| EN | 51 | 5 | 15 | 0 | 30 | 1 |
| **Total** | **92** | **9** | **25** | **3** | **53** | **2** |

Les points « à arbitrer » de la FAQ 1 (FR-32, FR-33) valent pour les deux langues ; en EN ils sont rattachés à EN-44 et ne sont pas recomptés.

Éléments de la revue et de la détection automatique retirés ou rectifiés :

- **retirée** — « typo_espace_avant_virgule » (7, EN) : artefact de l'extraction `families/*.md`, où les balises ont été remplacées par des espaces ; le HTML ne contient aucune espace avant une virgule ;
- **rectifiée** — « Packshot Creator (espacé) » (7 FR, 5 EN) : même artefact ; le vrai sujet est l'italique sur « Creator » (FR-10, EN-11) ;
- **rectifiée** — « majuscule_apres_deux_points » sur le H1 et le metaTitle FR : la capitale suit un tiret, pas un deux-points (FR-03) ;
- **rectifiée** — « coquille "interviewe" » dans le slug FR : c'est « interviewé » translittéré, pas une faute (FR-06) ;
- **confirmées** — « typo_espace_avant_ponctuation_en » (2) : EN-22 et EN-41 ; « artefact_zwj » (2) : FR-18 et EN-25.

---

## FR

### Métadonnées

**FR-01 · `title` · appellation · bloquant** — confirmée
- Actuel : « Interview de PackshotCreator, fondateur de PackshotCreator »
- Explication : le commit `8ae45f63` (12/06/2026), dont le message ne vise que le champ auteur, a remplacé « Laurent Wainberg » par « PackshotCreator ». Le titre devient tautologique. Le champ `title` s'affiche sur les cartes du blog et des articles liés (`components/blog/BlogGrid.tsx`, `RelatedArticles.tsx`), et sert aussi de texte alternatif de leur vignette.
- Correction retenue : « Interview de Laurent Wainberg, fondateur de PackshotCreator » (version importée).

**FR-02 · `h1` · appellation · bloquant** — confirmée
- Actuel : « PackshotCreator, fondateur de PackshotCreator – Interview »
- Explication : même remplacement. Le H1 sert aussi de texte alternatif de l'image principale (`app/[lang]/blog/[slug]/page.tsx`, ligne 206) et de `headline` dans le JSON-LD `Article`.
- Correction retenue : « Laurent Wainberg, fondateur de PackshotCreator – interview ».

**FR-03 · `h1` et `metaTitle` · typographie · mineur** — confirmée, catégorie rectifiée
- Actuel : « … – Interview »
- Explication : rien n'impose de capitale après un tiret dans un titre français ; « interview » est un nom commun.
- Correction retenue : « … – interview ».

**FR-04 · `metaTitle` · appellation · bloquant** — confirmée
- Actuel : « PackshotCreator, fondateur de PackshotCreator – Interview »
- Explication : c'est le `<title>` servi en production (relevé de la famille), l'`og:title` et le texte de l'image OG générée (`/api/og?title=…`). Le défaut s'affiche tel quel dans les résultats de recherche et les partages.
- Correction retenue : « Laurent Wainberg, fondateur de PackshotCreator – interview » (58 caractères).

**FR-05 · `description` · appellation et casse · majeur** — confirmée
- Actuel : « Découvrez l’histoire du Packshot automatisé à travers l’interview de PackshotCreator, pionnier et fondateur de PackshotCreator. »
- Explication : même remplacement ; « packshot » est un nom commun, sans capitale ; 127 caractères, sous la cible de 140 à 155.
- Correction retenue : « Découvrez l’histoire du packshot automatisé à travers l’interview de Laurent Wainberg, fondateur de Sysnext, la société à l’origine de PackshotCreator. » (151 caractères). « Pionnier » sort de la description (allègement d'un claim, 06, point 9) ; « Sysnext » y entre (requête FR « sysnext », 05).

**FR-06 · slug · URL · mineur** — rectifiée
- Actuel : `decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator`
- Explication : la revue y voit une coquille « interviewe ». C'est « interviewé » privé de son accent par la translittération, pas une faute. Les vrais défauts sont le préfixe hérité de l'ancienne rubrique Webflow (« décryptages »), la longueur (83 caractères) et le mot « dirigeant », devenu inexact : Laurent Wainberg a cédé la société en janvier 2026 (`docs/seo-geo/00-BRIEFING.md`). Une fois le nom rétabli, le slug redevient cohérent avec le H1.
- Correction retenue : aucune, slug conservé (analyse dans 05).

**FR-07 · `author` · décision séparée · signalement**
- Actuel : « PackshotCreator »
- Explication : c'est le seul changement voulu par `8ae45f63` (« auteur générique », cohérence avec le schéma `Organization`) ; Sébastien l'a choisi.
- Correction retenue : aucune (06, point 2).

**FR-08 · `date` · chronologie · majeur** — confirmée (remarques de la revue)
- Actuel : `date` 2017-10-04, `dateModified` absent.
- Explication : l'article s'affiche au 4 octobre 2017, mais il cite des faits de 2023 (distribution Orbitvu) et l'Alphashot Pro G2 ; l'item Webflow a été créé le 25/03/2025 (horodatage de l'ObjectId, inférence). Le JSON-LD `Article` déclare `datePublished` 2017, sans `dateModified`.
- Correction retenue : aucune dans la proposition (06, point 15).

### Corps

**FR-09 · chapeau · fait daté · majeur** — confirmée
- Actuel : « Créée en 2003, la société Sysnext »
- Explication : contredit D33 (25/09/2026 : « date de création : 2001 »). Le site est lui-même incohérent : `foundingDate` 2004 (`components/seo/SchemaOrg.tsx`, ligne 72) et « Depuis 2004 » sur la page À propos.
- Correction retenue : « Créée en 2001 [D33] » (06, point 3).

**FR-10 · nom de marque · graphie · mineur** — confirmée et étendue
- Actuel : `Packshot<em>Creator</em>`, 7 occurrences (lien du chapeau, « À ses débuts », « ce que proposait », « s’est imposé », « Les studios », « propose également », « n’a pas tué »), et `Packshot<em>Creato</em>r`, 1 occurrence (avant-dernier paragraphe).
- Explication : l'italique sur « Creator » reprend le style de l'ancien logo ; le texte mélange cette forme et « PackshotCreator » en romain. « Creato</em>r » est une erreur de balisage visible (italique coupé avant la dernière lettre).
- Correction retenue : « PackshotCreator » en romain partout (06, point 5).

**FR-11 · chapeau · chronologie et claim · majeur** — confirmée
- Actuel : « Dix ans après ses débuts, la société affiche une présence dans plus de 35 pays, près de 8 000 entreprises équipées et une conviction toujours aussi forte »
- Explication : fait daté d'une dizaine d'années après la création (vraisemblablement l'époque de l'interview GNPP de 2012) mais présenté au présent ; zeugme « affiche une présence…, près de 8 000 entreprises… et une conviction ». Chiffres sans source dans le texte.
- Correction retenue : « Dix ans après ses débuts, la société était présente dans plus de 35 pays et avait équipé près de 8 000 entreprises, avec une conviction toujours aussi forte ». Chiffres inchangés (06, point 6).

**FR-12 · citation 1 · appellation · majeur** — confirmée
- Actuel : « … et nous y avons répondu avec une solution adaptée », rappelle PackshotCreator.
- Explication : une citation à la première personne (« nous ») est attribuée à une marque. Version importée : « rappelle Laurent Wainberg ».
- Correction retenue : « rappelle Laurent Wainberg ».

**FR-13 · élision · mineur** — confirmée
- Actuel : « Le e-commerce explosait »
- Explication : « e-commerce » commence par un son voyelle ; l'article s'élide, comme le fait déjà la FAQ (« de l’e-commerce »).
- Correction retenue : « L’e-commerce explosait ».

**FR-14 · ponctuation et terminologie · mineur** — ajoutée
- Actuel : « de **productivité**, de **standardisation**, et d’un **contrôle interne** sur leur production visuelle »
- Explication : virgule superflue devant « et ». « Contrôle interne » désigne d'abord le dispositif de contrôle comptable et d'audit, alors que le sens voulu est « garder la main en interne » ; « contrôle… sur » est un calque.
- Correction retenue : « de **productivité**, de **standardisation** et d’une **maîtrise en interne** de leur production visuelle ».

**FR-15 · anglicisme · mineur** — confirmée, correction différente
- Actuel : « la chaîne de valeur du commerce digital »
- Explication : « digital » au sens de « numérique » est un anglicisme. La revue propose « commerce en ligne », qui ferait écho à « e-commerçants » dans la même phrase.
- Correction retenue : « commerce numérique ».

**FR-16 · typographie et balisage · mineur** — ajoutée
- Actuel : `<a href="/fr/industrie/food-alimentaire">agroalimentaire </a>:` (rendu « agroalimentaire : », espace soulignée dans le lien)
- Explication : l'espace qui précède le deux-points se trouve dans le lien et elle est sécable.
- Correction retenue : lien sur « agroalimentaire » seul, puis espace insécable et deux-points.

**FR-17 · impropriété · mineur** — ajoutée
- Actuel : « faciliter la création de visuels qualitatifs, cohérents et interactifs »
- Explication : « qualitatif » veut dire « relatif à la qualité » (par opposition à « quantitatif ») ; l'emploi au sens de « de qualité » est critiqué.
- Correction retenue : « visuels de qualité, cohérents et interactifs ».

**FR-18 · mise en forme · mineur** — ajoutée (détection « artefact_zwj »)
- Actuel : deux paragraphes vides `<p>‍</p>`, contenant chacun un U+200D, avant et après la figure.
- Explication : espaceurs hérités de Webflow ; caractère invisible compté comme contenu.
- Correction retenue : supprimés.

**FR-19 · image · texte alternatif · majeur** — confirmée
- Actuel : `alt="__wf_reserved_inherit"` sur `/images/blog/67e2aa0213158b42087cf052.avif`
- Explication : valeur réservée de Webflow servie comme texte alternatif.
- Correction retenue : « Espace de démonstration réunissant plusieurs studios photo automatisés, dont une table de prise de vue Orbitvu Alphadesk ». L'image a été examinée : « ALPHADESK » et le logo Orbitvu sont lisibles sur la table (05 ; 06, point 17).

**FR-20 · intertitre · claim · mineur** — ajoutée
- Actuel : « Une croissance soutenue et une reconnaissance internationale »
- Explication : la section parle de chiffre d'affaires, de R&D et de pédagogie ; aucune « reconnaissance internationale » n'y est étayée (seuls les « 35 pays » du chapeau s'en approchent).
- Correction retenue : aucune, intertitre conservé (06, point 13).

**FR-21 · redondance · mineur** — ajoutée
- Actuel : « en croissance de +11 % »
- Explication : « croissance de » et le signe « + » font double emploi.
- Correction retenue : « en hausse de 11 % » (chiffre inchangé).

**FR-22 · ambiguïté · mineur** — ajoutée
- Actuel : « une stratégie d’accompagnement des clients à forte valeur ajoutée »
- Explication : se lit « des clients à forte valeur ajoutée », alors que c'est l'accompagnement qui l'est.
- Correction retenue : « sur une stratégie d’accompagnement client à forte valeur ajoutée ».

**FR-23 · mise en forme · mineur** — ajoutée
- Actuel : trois `<br>` séparent deux paragraphes dans un même `<p>` : « … à forte valeur ajoutée.⏎La technologie, seule… » ; « … cohérence et efficacité.⏎Les photographes, eux… » ; « … performance visuelle.⏎Aujourd’hui encore… ».
- Explication : artefact Webflow ; deux idées distinctes collées sans espacement de paragraphe.
- Correction retenue : deux paragraphes distincts à chaque fois, ordre inchangé.

**FR-24 · citation 2 · appellation · majeur** — confirmée
- Actuel : « … par les utilisateurs finaux », souligne PackshotCreator.
- Explication : même défaut qu'en FR-12. Version importée : « souligne Laurent Wainberg ».
- Correction retenue : « souligne Laurent Wainberg ».

**FR-25 · style · mineur** — ajoutée
- Actuel : « Dans un monde où les délais sont tendus, les contenus nombreux et les canaux multiples »
- Explication : tournure-cliché, proscrite par les consignes de rédaction ; « quand » dit la même chose.
- Correction retenue : « Quand les délais sont tendus, les contenus nombreux et les canaux multiples ».

**FR-26 · grammaire · mineur** — ajoutée
- Actuel : « sans sacrifier la qualité ou la créativité »
- Explication : après « sans », la coordination se fait avec « ni ».
- Correction retenue : « sans sacrifier la qualité ni la créativité ».

**FR-27 · exactitude produit · majeur** — ajoutée
- Actuel : « à travers sa collaboration avec Orbitvu et le développement de solutions comme l’Alphashot Pro G2, PackshotCreator continue d’innover »
- Explication : l'Alphashot Pro G2 est un studio Orbitvu, que PackshotCreator distribue (FAQ 5). « Le développement de » prête à PackshotCreator la conception d'un produit du fabricant : c'est un sujet de conformité distributeur.
- Correction retenue : « et des solutions comme l’Alphashot Pro G2 » (claim adouci, 06, point 11).

**FR-28 · lien GNPP · appellation et balisage · majeur** — confirmée
- Actuel : « … les débuts de Packshot*Creato*r et la vision de son fondateur, **vous pouvez la (re)lire ici** : [Interview PackshotCreator – GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/). »
- Explication : ancre modifiée par `8ae45f63`, alors que l'URL cible porte le nom ; italique coupé (FR-10).
- Correction retenue : « [Interview Laurent Wainberg – GNPP](…) », URL inchangée ; virgule ajoutée devant la relative explicative « qui revient sur… ».

**FR-29 · lien GNPP · technique · mineur** — ajoutée
- Actuel : `target="_new"`
- Explication : `_new` n'est pas une valeur réservée ; il ouvre une fenêtre nommée « _new », réutilisée d'un clic à l'autre. Le lien Orbitvu, lui, utilise `_blank`.
- Correction retenue : aucune dans le texte ; à l'intégration, `target="_blank" rel="noopener"` est recommandé.

### FAQ (champ `faqs`, repris dans le JSON-LD `FAQPage`)

**FR-30 · question 1 · casse · mineur** — ajoutée
- Actuel : « Qui a inventé le concept de Packshot automatisé ? »
- Correction retenue : « … de packshot automatisé ? ».

**FR-31 · réponse 1 · appellation · bloquant** — confirmée
- Actuel : « C’est PackshotCreator, fondateur de la société Sysnext, qui a introduit dès 2003 en Europe le premier système de photographie automatisée pour les produits. »
- Explication : une marque présentée comme « fondateur » d'une société. La réponse est reprise telle quelle dans le JSON-LD `FAQPage`, donc dans ce que lisent les moteurs et les assistants IA.
- Correction retenue : « C’est Laurent Wainberg, fondateur de la société Sysnext, … ».

**FR-32 · réponse 1 · date (D33) · à arbitrer** — ajoutée (consigne du dossier)
- Actuel : « qui a introduit dès 2003 en Europe le premier système »
- Explication : la consigne signale un conflit avec D33. Vérification faite (R7) : ici, 2003 date le premier système, pas la création de la société, et D33 ne fixe que la date de création (2001). Le rapport maître (`PSC_RAPPORT_MAITRE_CONSOLIDE_INTEGRAL_2026-09-26.md`, ligne 2938) conclut de même (« D33 (2001) ne contredit pas une livraison dès 2003 »), et l'article `logiciel-packshotcreator-ortery-perdu-solution` évoque des studios fournis « entre 2003 et 2024 ». Écrire 2001 ici affirmerait une date de lancement que rien n'établit.
- Correction retenue : 2003 conservé, marqué « [D33 : … à confirmer] » (06, point 4).

**FR-33 · question et réponse 1 · claim d'antériorité · à arbitrer** — ajoutée (claim relevé par la revue)
- Actuel : « Qui a inventé le concept de Packshot automatisé ? » / « … le premier système de photographie automatisée pour les produits »
- Explication : l'antériorité n'est pas sourcée. Le site écrit ailleurs : « Tous les logiciels fournis avec les studios PackshotCreator entre 2003 et 2024 ont été développés par Ortery Technologies, […] pionnière de la photographie automatisée depuis 2001 » (`content/blog/fr/logiciel-packshotcreator-ortery-perdu-solution.json`). La réponse dit « introduit en Europe », la question dit « inventé ».
- Correction retenue : aucune, claim conservé (06, point 8).

**FR-34 · réponse 2 · tournure · mineur** — ajoutée
- Actuel : « Le nom est né avec la volonté de démocratiser »
- Correction retenue : « né de la volonté de démocratiser ».

**FR-35 · réponse 2 · grammaire · mineur** — ajoutée
- Actuel : « n’était plus réservé aux agences ou aux photographes experts »
- Correction retenue : « ni aux photographes experts ».

**FR-36 · réponse 2 · claim et typographie · majeur** — confirmée (claims de la revue)
- Actuel : « Le terme "Packshot" est même devenu un générique utilisé dans l’industrie, ce qui témoigne de l’impact de la marque. »
- Explication : guillemets droits et capitale sur un nom commun. Le lien de causalité entre la marque et la diffusion du mot « packshot » est affirmé sans preuve, alors que la marque est bâtie sur ce mot.
- Correction retenue : « Le terme « packshot » s’est d’ailleurs imposé dans tout le secteur. », suivi d'une note [À VALIDER]. La causalité est retirée (06, point 10).

**FR-37 · réponse 4 · claim · à arbitrer** — confirmée (claims de la revue)
- Actuel : « PackshotCreator a été le premier acteur à structurer le marché européen de la photographie automatisée. »
- Correction retenue : aucune, claim conservé (06, point 9).

**FR-38 · réponse 4 · ponctuation · mineur** — ajoutée
- Actuel : « pour les PME, les grands groupes, et les photographes eux-mêmes »
- Correction retenue : virgule supprimée devant « et ».

**FR-39 · réponse 5 · ponctuation et fait · mineur** — ajoutée
- Actuel : « Orbitvu est une société polonaise innovante, qui a émergé dans les années 2010 »
- Explication : relative déterminative séparée par une virgule. La décennie d'émergence d'Orbitvu n'est pas sourcée.
- Correction retenue : virgule supprimée ; fait conservé (06, point 12).

**FR-40 · réponse 5 · doctrine D6 et claim · mineur** — ajoutée (périmètre relevé par la revue)
- Actuel : « PackshotCreator est devenu en 2023 le distributeur officiel d’Orbitvu en France et dans plusieurs pays francophones »
- Explication : l'article défini « le » laisse entendre un distributeur unique ; D6 : « officiel, jamais exclusif ». Le périmètre « plusieurs pays francophones » diffère d'autres pages du site (« France et Suisse ») ; la date 2023 n'est pas sourcée.
- Correction retenue : « est devenu en 2023 distributeur officiel d’Orbitvu » ; périmètre et date inchangés (06, point 12).

**FR-41 · réponse 5 · syntaxe et claim · mineur** — ajoutée (claim relevé par la revue)
- Actuel : « intégrant ces nouvelles solutions plus performantes, plus fiables et conçues pour les standards actuels de l’e-commerce et du marketing visuel »
- Explication : participe présent flottant ; comparatif implicite avec l'ancienne gamme, sans source.
- Correction retenue : « et a intégré à son offre ces nouvelles solutions, plus performantes, plus fiables et conçues pour… » ; comparatif conservé (06, point 12).

### Vérifié sans anomalie (FR)

- Paragraphe formation (« PackshotCreator propose également des formations aux studios photo Orbitvu… ») : réécrit par Sébastien le 30/09/2026 (`fc6c9c6b`, alignement sur le catalogue Qualiopi avant l'audit du 16/10/2026). Repris mot pour mot, hors graphie du nom. La version importée (« Depuis 2016… maroquinerie, bouteilles de vin… ») n'est **pas** rétablie.
- FAQ 4, « en formant de nombreux utilisateurs » : adouci par le même commit (import : « des milliers d'utilisateurs »). Conservé.
- Liens internes (`/fr/a-propos`, `/fr/industrie/…`, `/fr/academy`, `/fr/studio-photo/alphashot-pro-g2`) et externes (Orbitvu, GNPP) : cibles inchangées.
- « Caissons automatisés de prise de vue à LED », « une nouvelle preuve », « Une approche business », « storytelling visuel » : registre marketing courant, conservés.
- FAQ 3 : correcte.

---

## EN

### Métadonnées

**EN-01 · `title` · appellation · bloquant** — confirmée
- Actuel : « Interview with PackshotCreator, founder of PackshotCreator »
- Explication : remplacement de `8ae45f63` (FR-01).
- Correction retenue : « Interview with Laurent Wainberg, founder of PackshotCreator » (version importée).

**EN-02 · `h1` · appellation · bloquant** — confirmée
- Actuel : « PackshotCreator, founder of PackshotCreator — Interview »
- Correction retenue : « Laurent Wainberg, founder of PackshotCreator — Interview ».

**EN-03 · `metaTitle` · appellation · bloquant** — confirmée
- Actuel : « PackshotCreator, founder of PackshotCreator — Interview »
- Explication : `<title>` servi, `og:title`, image OG. La page reçoit des impressions sur la requête de marque « packshot creator » (position 3,8).
- Correction retenue : « Laurent Wainberg, founder of PackshotCreator — Interview » (56 caractères).

**EN-04 · `description` · appellation et calque · majeur** — confirmée
- Actuel : « Discover the history of automated Packshot through an interview with PackshotCreator, pioneer and founder of PackshotCreator. »
- Explication : même remplacement ; « automated Packshot » employé seul n'est pas idiomatique, et porte une capitale.
- Correction retenue : « The story of automated packshot photography through an interview with Laurent Wainberg, founder of Sysnext, the company behind PackshotCreator. » (143 caractères).

**EN-05 · `author` · décision séparée · signalement**
- Actuel : « PackshotCreator ». Non modifié (FR-07 ; 06, point 2).

**EN-06 · `date` · chronologie · majeur** — confirmée
- Actuel : `date` 2017-10-04, `dateModified` absent. Même incohérence qu'en FR-08 (06, point 15).

### Corps

**EN-07 · chapeau · date (D33) et calques · majeur** — confirmée
- Actuel : « Created in 2003, the company Sysnext — at the origin of the concept PackshotCreator — has shaken up the codes of product photography. »
- Explication : date contraire à D33 ; « at the origin of the concept », « the codes of » et le present perfect sont calqués du français.
- Correction retenue : « Founded in 2001 [D33], Sysnext — the company behind the PackshotCreator concept — shook up the conventions of product photography. »

**EN-08 · chapeau · phrase nominale · mineur** — ajoutée
- Actuel : « With a simple but daring idea: to make visual production faster, more accessible and more consistent for businesses. »
- Explication : phrase sans verbe principal, calquée sur le français.
- Correction retenue : « Its idea was simple but bold: make visual production faster, more accessible and more consistent for businesses. »

**EN-09 · chapeau · chronologie et zeugme · majeur** — confirmée (FR-11)
- Actuel : « Ten years after its beginnings, the company has a presence in more than 35 countries, nearly 8,000 equipped companies and a conviction that is still as strong as ever »
- Correction retenue : « Ten years after it started, the company was present in more than 35 countries and had equipped nearly 8,000 businesses, with a conviction as strong as ever » ; chiffres inchangés.

**EN-10 · chapeau · contresens · majeur** — confirmée
- Actuel : « **the visuals produced are a strategic driver of performance.** »
- Explication : « visuels produits » (visuels de produits) a été lu comme un participe (« produced »).
- Correction retenue : « **product visuals are a strategic driver of performance.** »

**EN-11 · nom de marque · graphie · mineur** — confirmée et étendue
- Actuel : `Packshot<em>Creator</em>`, 5 occurrences (lien du chapeau, « In its early days », « has established itself », « also offers », « did not kill »), et `Packshot<em>Creato</em>r`, 1 occurrence. Les deux occurrences coupées par la traduction automatique font l'objet d'EN-19 et EN-23.
- Correction retenue : « PackshotCreator » en romain partout.

**EN-12 · intertitre H2 · temps · mineur** — ajoutée
- Actuel : « An innovation that has long been misunderstood »
- Explication : le present perfect laisse entendre que l'incompréhension dure encore ; le français dit « longtemps incomprise ».
- Correction retenue : « A long-misunderstood innovation ».

**EN-13 · temps et registre · mineur** — confirmée
- Actuel : « In its early days, Packshot*Creator* has received strong criticism, in particular from some professional photographers. »
- Explication : present perfect fautif avec « In its early days » ; « strong » affaiblit « virulentes ».
- Correction retenue : « In its early days, PackshotCreator faced fierce criticism, particularly from some professional photographers. »

**EN-14 · contresens · majeur** — confirmée
- Actuel : « Automated LED cameras were seen as a threat to the profession. »
- Explication : « caissons automatisés de prise de vue à LED » désigne des caissons éclairés par LED, pas des appareils photo.
- Correction retenue : « Automated LED light boxes were seen as a threat to the profession. »

**EN-15 · citation 1 · contresens et calque · majeur** — ajoutée
- Actuel : « “Some cried out for the death of photography. However, the reality was quite different: the market had simply evolved, and we responded to it with an adapted solution,” »
- Explication : « cry out for » veut dire « réclamer » : les détracteurs auraient exigé la mort de la photographie, l'inverse du sens. « An adapted solution » est un calque.
- Correction retenue : « “Some people declared photography dead. But the reality was quite different: the market had simply evolved, and we responded with the right solution,” »

**EN-16 · citation 1 · appellation · majeur** — confirmée
- Actuel : « recalls PackshotCreator. »
- Correction retenue : « recalls Laurent Wainberg. »

**EN-17 · faux ami · mineur** — ajoutée (relevé dans la preuve de langue de la revue)
- Actuel : « E-commerce was exploding, the volume of references to be photographed was increasing, the deadlines were getting shorter. »
- Explication : « références » (articles du catalogue) n'est pas « references » ; article défini superflu devant « deadlines ».
- Correction retenue : « E-commerce was booming, the number of SKUs to photograph kept growing and turnaround times were getting shorter. »

**EN-18 · traduction automatique · majeur** — confirmée
- Actuel : « they needed **productivity**, of **standardizing**, and of a **internal control** on their visual production. »
- Explication : partitifs français résiduels, « a internal », « control on ».
- Correction retenue : « they needed **productivity**, **standardization** and **in-house control** over their visual production. »

**EN-19 · marque coupée · bloquant** — confirmée
- Actuel : « That's exactly what Packshot was offering.*Creator*, long before automation became a hot topic. »
- Explication : la traduction automatique a coupé `Packshot<em>Creator</em>` : phrase incompréhensible, avec un point au milieu.
- Correction retenue : « That is exactly what PackshotCreator offered, long before automation became a buzzword. »

**EN-20 · intertitre H2 · calque · mineur** — ajoutée
- Actuel : « A business approach focused on uses »
- Explication : « usages » se rend par « use cases ».
- Correction retenue : « A business approach centered on use cases ».

**EN-21 · orthographe et calques · mineur** — ajoutée
- Actuel : « Packshot*Creator* has established itself as a fully-fledged player in the digital commerce value chain, supporting not only e-retailers, but also marketing, R&D and communication departments in many sectors. »
- Explication : « fully-fledged » est britannique (américain : « full-fledged ») ; « communications departments » en usage américain ; virgule superflue avant « but also ».
- Correction retenue : « PackshotCreator established itself as a full-fledged player in the digital commerce value chain, supporting not only online retailers but also marketing, R&D and communications departments across many industries. »

**EN-22 · liste de secteurs · typographie et calques · mineur** — confirmée
- Actuel : « [Cosmetics](/en/industrie/cosmetiques-beaute), [industry](/en/industrie/pieces-techniques-industrie), luxury, pharmacy, [Agri-food ](/en/industrie/food-alimentaire): uses have multiplied, as have functionalities. »
- Explication : capitale à « Agri-food » et espace avant le deux-points dans le lien ; « pharmacy » désigne l'officine ; « industry » ne nomme pas un secteur dans une liste ; « functionalities » est lourd.
- Correction retenue : « [Cosmetics](…), [manufacturing](…), luxury goods, pharmaceuticals, [food](…): use cases have multiplied, and so have features. » URL inchangées, ancres traduites.

**EN-23 · marque coupée · majeur** — confirmée
- Actuel : « Packshot Studios*Creator* have evolved at the pace of needs »
- Correction retenue : « PackshotCreator studios have evolved as needs changed ».

**EN-24 · calques · mineur** — confirmée
- Actuel : « **Still photographs, multi-angle visuals, 360° animations, hemispheric 3D views**... » / « while maintaining a constant philosophy: **facilitate the creation of qualitative, coherent and interactive visuals.** »
- Explication : trois points au lieu de l'ellipse ; « qualitative » veut dire « qualitatif » au sens méthodologique ; infinitif calqué.
- Correction retenue : « **Still photos, multi-angle views, 360° animations, hemispherical 3D views**… » / « while keeping the same philosophy: **making it easier to create high-quality, consistent and interactive visuals.** »

**EN-25 · mise en forme · mineur** — ajoutée (« artefact_zwj »)
- Actuel : deux `<p>‍</p>` (U+200D) autour de la figure. Correction retenue : supprimés.

**EN-26 · image · texte alternatif · majeur** — confirmée
- Actuel : `alt="__wf_reserved_inherit"` sur `/images/blog/67e2aa0213158b42087cf052.avif`
- Correction retenue : « Demo space with several automated photo studios, including an Orbitvu Alphadesk shooting table ».

**EN-27 · terminologie · mineur** — ajoutée
- Actuel : « In 2011, Sysnext already had a turnover of 4 million euros, up +11%. »
- Explication : « turnover » désigne d'abord la rotation du personnel en anglais américain (le chiffre d'affaires y est « revenue ») ; « up » et « + » font double emploi.
- Correction retenue : « In 2011, Sysnext already had revenue of €4 million, up 11%. »

**EN-28 · ambiguïté · mineur** — ajoutée
- Actuel : « The following year started with even stronger momentum (+20%). This development was based on a sustained R&D policy and a strategy to support customers with high added value. »
- Explication : « customers with high added value » qualifie les clients.
- Correction retenue : « The following year got off to an even stronger start (+20%). This growth was built on a sustained R&D effort and a high-value customer support strategy. »

**EN-29 · mise en forme · mineur** — ajoutée
- Actuel : trois `<br>` collant deux paragraphes, aux mêmes endroits qu'en FR-23. Correction retenue : paragraphes séparés.

**EN-30 · calque · mineur** — ajoutée
- Actuel : « success also requires **pedagogy and the acculturation of teams** »
- Correction retenue : « success also depends on **education and team onboarding** ».

**EN-31 · citation 2 · appellation, ponctuation et calque · majeur** — confirmée
- Actuel : « “We've never just sold an automated photo studio. We have always focused on support, training and the appropriation of the tool by end users”, underlines PackshotCreator. »
- Explication : citation attribuée à une marque ; virgule hors des guillemets (l'usage américain la place à l'intérieur) ; « appropriation of the tool » et « underlines » sont calqués.
- Correction retenue : « “We have never settled for simply selling an automated photo studio. We have always focused on support, training and helping end users take ownership of the tool,” says Laurent Wainberg. »

**EN-32 · intertitre H3 · calque · mineur** — ajoutée
- Actuel : « From productivity to the control of visual flows »
- Correction retenue : « From productivity to control of visual workflows ».

**EN-33 · parallélisme · mineur** — confirmée
- Actuel : « In a world where deadlines are tight, numerous contents and multiple channels, **automated photography is not a simple option: it is a strategic response**. »
- Correction retenue : « When deadlines are tight, content volumes are high and channels multiply, **automated photography is not just an option: it is a strategic response**. »

**EN-34 · calques · mineur** — ajoutée
- Actuel : « PackshotCreator allows businesses to keep control of their content production, without sacrificing quality or creativity. By integrating these studios into the product or marketing teams themselves, companies gain in **agility, consistency and efficiency**. »
- Correction retenue : « PackshotCreator lets businesses stay in control of their content production without sacrificing quality or creativity. By bringing these studios right into product or marketing teams, companies become more **agile, consistent and efficient**. »

**EN-35 · faux amis · mineur** — ajoutée
- Actuel : « Photographers, on the other hand, were not excluded from the process. On the contrary: by relieving them of repetitive and technical tasks, automated solutions allow them to **refocus on artistic direction, high-end retouching and projects with high added value.** »
- Explication : « on the other hand » ne rend pas « eux » ; « direction artistique » se dit « art direction ».
- Correction retenue : « Photographers, for their part, have not been pushed out of the process. Quite the opposite: by taking repetitive, technical tasks off their hands, automated solutions let them **refocus on art direction, high-end retouching and high-value projects.** »

**EN-36 · intertitre H3 · faux ami · mineur** — confirmée
- Actuel : « The human at the heart of the device »
- Correction retenue : « People at the heart of the approach ».

**EN-37 · calques · mineur** — confirmée
- Actuel : « (in French), for the teams who use them every day. It is a new proof of the brand's commitment to **transmission of knowledge and the raising of visual standards.** »
- Correction retenue : « (in French) for the teams who use them every day. It is further proof of the brand’s commitment to **sharing know-how and raising visual standards.** » Lien `/fr/academy` et mention « (in French) » conservés (`fc6c9c6b`).

**EN-38 · calques · mineur** — ajoutée
- Actuel : « **Packshot*Creator* did not kill photography: it revealed new uses of it.** Thanks to a vision resolutely focused on business challenges, the company was able to impose automation as a strategic ally in the service of visual performance. »
- Correction retenue : « **PackshotCreator did not kill photography: it revealed new ways to use it.** With a vision firmly focused on business needs, the company succeeded in making automation a strategic ally for visual performance. »

**EN-39 · exactitude produit et mots collés · majeur** — confirmée (mots collés) et étendue (claim)
- Actuel : « Even today, [through its collaboration with Orbitvu](…) and the development of solutions such as[Alphashot Pro G2](/en/studio-photo/alphashot-pro-g2), PackshotCreator continues to innovate. »
- Explication : « such asAlphashot » collé ; même claim de développement qu'en FR-27.
- Correction retenue : « Today, [through its collaboration with Orbitvu](…) and solutions such as the [Alphashot Pro G2](…), PackshotCreator continues to innovate ».

**EN-40 · phrase nominale et calques · mineur** — ajoutée
- Actuel : « With a promise that has remained the same since its inception: to help brands create **powerful, coherent and controlled images**, in complete autonomy. »
- Correction retenue : « , with the same promise it has made from the start: helping brands create **striking, consistent, well-controlled images** on their own. »

**EN-41 · lien GNPP · appellation et typographie · majeur** — confirmée
- Actuel : « To dive back into this founding interview that looks back on the beginnings of Packshot*Creato*r and the vision of its founder, **You can (re) read it here** : [Interview with PackshotCreator — GNPP](https://gnpp.wordpress.com/2012/09/17/interview-laurent-wainberg-de-packshotcreator-2/). »
- Explication : ancre modifiée par `8ae45f63` ; italique coupé ; capitale à « You » en milieu de phrase ; espace avant le deux-points ; « (re) read ».
- Correction retenue : « To go back to the original interview, which looks at PackshotCreator’s early days and its founder’s vision, **you can read it (again) here**: [Interview with Laurent Wainberg — GNPP](…). » URL inchangée.

**EN-42 · lien GNPP · technique · mineur** — ajoutée
- Actuel : `target="_new"`. Même remarque qu'en FR-29.

### FAQ

**EN-43 · question 1 · casse · mineur** — ajoutée
- Actuel : « Who invented the automated Packshot concept? »
- Correction retenue : « Who invented the automated packshot concept? »

**EN-44 · réponse 1 · appellation · bloquant** — confirmée
- Actuel : « It was PackshotCreator, founder of the company Sysnext, who introduced the first automated product photography system in Europe in 2003. »
- Explication : même défaut qu'en FR-31 ; « the company Sysnext » est calqué. L'année 2003 et le claim d'antériorité relèvent des mêmes arbitrages qu'en FR-32 et FR-33.
- Correction retenue : « It was Laurent Wainberg, founder of Sysnext, who introduced the first automated product photography system in Europe, as early as 2003 [D33 : … à confirmer]. »

**EN-45 · réponse 1 · calques · mineur** — ajoutée
- Actuel : « to allow companies to produce quality visuals internally, without always depending on an external photo studio »
- Correction retenue : « enable companies to produce quality visuals in-house, without always relying on an outside photo studio ».

**EN-46 · réponse 2 · claim et calques · majeur** — confirmée (claim) et étendue
- Actuel : « The name was born with the desire to democratize the creation of product visuals, also called packshots. With PackshotCreator, the packshot was no longer reserved for agencies or expert photographers: it became accessible, automated and repeatable in business. The term “Packshot” has even become a generic term used in the industry, a testament to the impact of the brand. »
- Explication : « born with the desire » et « in business » sont calqués ; capitale à « Packshot » ; causalité sans source (FR-36).
- Correction retenue : « The name grew out of a desire to democratize the creation of product visuals, also known as packshots. With PackshotCreator, packshots were no longer reserved for agencies or specialist photographers: they became accessible, automated and repeatable in-house. The word “packshot” has since become standard across the industry. », suivi d'une note [À VALIDER].

**EN-47 · question et réponse 3 · temps et calques · mineur** — ajoutée
- Actuel : « How has the profession reacted to these innovations? » / « focus on missions with high added value: artistic direction, universe creation, visual storytelling... »
- Correction retenue : « How did the profession react to these innovations? » / « focus on high-value work: art direction, set and mood creation, visual storytelling… »

**EN-48 · réponse 4 · calques · mineur** — ajoutée (claim : 06, point 9)
- Actuel : « PackshotCreator was the first player to structure the European automated photography market. The company also played a strong educational role, by explaining the challenges of visual productivity, by training many users and by making this technology intelligible for SMEs, large groups, and the photographers themselves. »
- Explication : « enjeux » n'est pas « challenges » ; « SMEs » et « large groups » sont des usages européens ; virgule de série isolée dans un texte qui n'en met pas.
- Correction retenue : « PackshotCreator was the first player to structure the European market for automated photography. The company also played a strong educational role, explaining what was at stake in visual productivity, training many users and making the technology understandable for small and midsize businesses, large corporations and photographers themselves. »

**EN-49 · question 5 · pronom · mineur** — confirmée
- Actuel : « Who is Orbitvu and how does he fit into this story? »
- Correction retenue : « Who is Orbitvu, and how does it fit into this story? »

**EN-50 · réponse 5 · doctrine D6 et syntaxe · mineur** — ajoutée (claims : 06, point 12)
- Actuel : « In 2023, PackshotCreator became the official distributor of Orbitvu in France and in several French-speaking countries, integrating these new solutions that are more efficient, more reliable and designed for current e-commerce and visual marketing standards. »
- Correction retenue : « In 2023, PackshotCreator became an official Orbitvu distributor in France and several French-speaking countries, adding these new solutions to its range: more efficient, more reliable and designed for today’s e-commerce and visual marketing standards. »

**EN-51 · typographie · mineur** — ajoutée
- Actuel : apostrophes droites (« That's », « We've », « brand's », « PackshotCreator's ») mêlées aux guillemets courbes “ ”.
- Correction retenue : apostrophe typographique ’ partout.

### Vérifié sans anomalie (EN)

- Slug `interview-laurent-wainberg-founder-packshotcreator` : correct, cohérent avec le H1 rétabli.
- Lien formation vers `/fr/academy` avec « (in French) » : conforme à `fc6c9c6b` (la page `/en/academy` redirige vers `/fr/academy`).
- Cibles des liens inchangées.
