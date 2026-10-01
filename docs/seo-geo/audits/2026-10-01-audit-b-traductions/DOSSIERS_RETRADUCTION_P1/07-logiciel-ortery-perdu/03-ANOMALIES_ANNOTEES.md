# Anomalies annotées — famille 681a1a294d5ce94156610507

Sources : `01-TEXTE_ACTUEL.md` (texte servi, `main` `17fc0b3`), JSON `content/blog/fr/logiciel-packshotcreator-ortery-perdu-solution.json` et `content/blog/en/lost-packshotcreator-ortery-software-solution.json` (HTML brut, pour les artefacts), revue `reviews/681a1a294d5ce94156610507.json`. Les extraits actuels sont cités mot pour mot ; quand le défaut est dans le balisage, l'extrait est donné en HTML entre accents graves. Les renvois « 06-n » pointent vers `06-VALIDATION_HUMAINE.md`.

Gravité : **majeur** (contresens, contradiction, claim ou conformité), **moyen** (gêne la compréhension, le référencement ou l'accessibilité), **mineur** (typographie, style, artefact sans effet sur le sens).

## Synthèse

| Langue | Majeur | Moyen | Mineur | Total |
|---|---|---|---|---|
| FR | 9 | 8 | 30 | 47 |
| EN | 14 | 23 | 18 | 55 |
| **Total** | **23** | **31** | **48** | **102** |

### Contrôle de la revue

- Les 11 anomalies FR et les 12 anomalies EN de la revue sont **confirmées** contre `01-TEXTE_ACTUEL.md`, ainsi que ses 9 claims à revérifier.
- **Rectifiée** : l'alt proposé par la revue (« Exemple de studio PackshotCreator/Ortery ») est inexact. L'image `681a16ed96fe1ef9fd011a22.avif`, examinée après conversion en PNG, montre l'étiquette signalétique d'un Photosimile 200 d'Ortery Technologies Inc. (modèle, alimentation, numéro de série, marquages CE et FCC, « Made in Taiwan »), pas un studio. Voir FR-15 et EN-16.
- **Confirmée** : l'infirmation par la revue de l'anomalie automatique « titlecase_intertitre » sur « Étape 2 : Contactez Ortery Technologies » (pas de Title Case : « Technologies » appartient au nom propre). La majuscule après les deux-points reste un point typographique distinct (FR-14, FR-18).
- **Divergence assumée** : la revue proposait de conserver la FAQ EN, idiomatique. Elle est retraduite depuis le FR, car elle ajoute ou renforce des claims (EN-48 à EN-55).
- **Complétée** : 34 entrées FR et 36 entrées EN ne correspondent à aucune erreur listée par la revue. Une partie reprend ses claims à revérifier ou ses remarques de structure (exclusivité, « rarement possible », FAQ 1, facteur trois à cinq, offre de reprise, écarts de la FAQ EN) ; les autres sont nouvelles, dont deux points de cohérence avec le dépôt : la formation présentée comme comprise dans l'offre de reprise (FR-46) et les « 74 lampes » généralisées à toute la gamme (FR-30).
- **Information** : le chantier C13 (`docs/seo-geo/06-CHANTIERS.md`, coquille « en sur la zone EMEA ») est noté « clos le 19/09 », mais la coquille est toujours sur `main` : `git log -S "en sur la zone EMEA"` ne montre que l'import `56d4bc32` et un commit de documentation (06-21).

---

## FR — /fr/blog/logiciel-packshotcreator-ortery-perdu-solution

### FR-01 · title · Espace finale
- **Extrait actuel** : `"title": "Vous avez perdu votre logiciel PackshotCreator ou Ortery ? "`
- **Catégorie / gravité** : technique · mineur
- **Explication** : espace parasite en fin de champ ; l'espace avant « ? » doit être insécable.
- **Correction retenue** : « Vous avez perdu votre logiciel PackshotCreator ou Ortery ? » (espace insécable, sans espace finale).

### FR-02 · metaTitle · Longueur et ponctuation
- **Extrait actuel** : « Récupérer votre logiciel PackshotCreator ou Ortery perdu - Solutions et alternatives »
- **Catégorie / gravité** : SEO · moyen
- **Explication** : 84 caractères, tronqué dans les résultats ; trait d'union employé comme séparateur ; capitale à « Solutions ».
- **Correction retenue** : « Logiciel PackshotCreator ou Ortery perdu : que faire ? » (54 caractères), voir 05.

### FR-03 · description · Longueur, ponctuation et promesse non tenue
- **Extrait actuel** : « Problèmes avec votre logiciel PackshotCreator ou Ortery? Découvrez comment récupérer votre licence, résoudre les problèmes de compatibilité Windows 11 et explorer les alternatives modernes. »
- **Catégorie / gravité** : SEO et claim · moyen
- **Explication** : 189 caractères ; pas d'espace avant « ? » ; l'article ne résout pas les problèmes de compatibilité, il explique qu'une remise en service n'est pas toujours possible et oriente vers Ortery ou vers une migration.
- **Correction retenue** : « Logiciel PackshotCreator ou Ortery perdu ? Où le télécharger, comment réactiver une licence, les limites sous Windows 11 et les alternatives Orbitvu. » (149 caractères), 06-20.

### FR-04 · Chapeau · Marqueur temporel daté
- **Extrait actuel** : « Cependant, en 2025, nombreux sont les utilisateurs qui nous contactent pour un même problème »
- **Catégorie / gravité** : date périmée · majeur
- **Explication** : article daté du 06/05/2025 et toujours servi en octobre 2026 ; « en 2025 » le date à la lecture. Même défaut en FAQ 4 (FR-44).
- **Correction retenue** : « Depuis la fin du support, cependant, de nombreux utilisateurs nous contactent pour un même problème » (06-1). La phrase précédente commence alors par « En plus de 20 ans » au lieu de « Depuis plus de 20 ans », pour éviter deux « depuis » de suite.

### FR-05 · Chapeau · Énumération mal construite
- **Extrait actuel** : « perte de logiciel PackshotCreator, studio non reconnu sous Windows 11, ou impossibilité de réinstaller le système après un changement d'ordinateur »
- **Catégorie / gravité** : style · mineur
- **Explication** : « perte de logiciel » sans article, virgule avant « ou ».
- **Correction retenue** : « logiciel PackshotCreator perdu, studio non reconnu sous Windows 11 ou impossibilité de réinstaller le système après un changement d'ordinateur ».

### FR-06 · Chapeau · Fraîcheur affirmée
- **Extrait actuel** : « Si vous êtes concerné, voici les informations à jour pour comprendre la situation et connaître les solutions disponibles. »
- **Catégorie / gravité** : claim de fraîcheur · mineur
- **Explication** : « à jour » engage sur l'actualité des informations, dont plusieurs n'ont pas été revérifiées depuis mai 2025.
- **Correction retenue** : « Si vous êtes dans ce cas, voici ce qu'il faut savoir pour comprendre la situation et connaître les solutions disponibles. » (06-1).

### FR-07 · Chapeau · Claim non chiffré
- **Extrait actuel** : « PackshotCreator a permis à des milliers d'entreprises de produire en interne des visuels de qualité professionnelle »
- **Catégorie / gravité** : claim · mineur
- **Explication** : « des milliers d'entreprises » sans source dans le texte ; cohérent avec « 5 000+ entreprises équipées » de `messages/fr.json`, lui-même non sourcé.
- **Correction retenue** : conservé tel quel (06-13).

### FR-08 · Pourquoi… · Date de fondation d'Ortery
- **Extrait actuel** : « une entreprise basée à Taïwan, pionnière de la photographie automatisée depuis 2001 »
- **Catégorie / gravité** : claim sur un tiers, contradiction interne · moyen
- **Explication** : `messages/fr.json` (comparatif Orbitvu, Ortery, Styleshoots) écrit « Fondé en 2002 à PanChiao (Taiwan) ».
- **Correction retenue** : conservé (« depuis 2001 ») en attendant l'arbitrage (06-4).

### FR-09 · Pourquoi… · Bornes 2003-2024
- **Extrait actuel** : « Tous les logiciels fournis avec les studios PackshotCreator entre 2003 et 2024 »
- **Catégorie / gravité** : claim historique, contradiction interne · moyen
- **Explication** : d'autres pages du site datent les premiers studios de 2004 (`messages/fr.json` « Depuis 2004 », « (2004-2024) », `foundingDate` 2004) ; le rapport maître du 26/09 relève la contradiction.
- **Correction retenue** : conservé (06-3).

### FR-10 · Pourquoi… · « Distributeur exclusif »
- **Extrait actuel** : « PackshotCreator a été pendant plus de 20 ans le distributeur exclusif d'Ortery en sur la zone EMEA »
- **Catégorie / gravité** : conformité D6 · majeur
- **Explication** : D6 proscrit « exclusif » de toute revendication de distribution, dans toutes les langues. Le commit `74dff0ce` l'a laissé ici volontairement (« ancien partenariat Ortery »). Le caractère historique de la revendication ne figure pas dans le texte de D6 : arbitrage nécessaire.
- **Correction retenue** : « Pendant plus de 20 ans, PackshotCreator a été le distributeur d'Ortery sur la zone EMEA » (06-2).

### FR-11 · Pourquoi… · Coquille
- **Extrait actuel** : « en sur la zone EMEA »
- **Catégorie / gravité** : coquille · mineur
- **Explication** : double préposition. Le chantier C13, qui la visait, est noté clos alors qu'elle est toujours en ligne (06-21).
- **Correction retenue** : « sur la zone EMEA ».

### FR-12 · Pourquoi… · Liste introduite par deux-points
- **Extrait actuel** : « PackshotCreator ne distribue plus les logiciels Ortery » / « Le support PackshotCreator sur ces solutions a officiellement pris fin au 31 décembre 2024 »
- **Catégorie / gravité** : typographie et grammaire · mineur
- **Explication** : liste qui prolonge la phrase « Mais depuis fin 2024 : » : minuscule initiale et ponctuation (« ; », « . ») attendues ; « prendre fin le » plutôt que « au » pour un fait passé. La date elle-même est un fait engageant (06-8).
- **Correction retenue** : « PackshotCreator ne distribue plus les logiciels Ortery ; » / « le support PackshotCreator sur ces solutions a officiellement pris fin le 31 décembre 2024. »

### FR-13 · Pourquoi… · Ponctuation et injonction
- **Extrait actuel** : « Pour toute question technique, réinstallation, ou demande de licence, vous devez contacter directement l'éditeur. »
- **Catégorie / gravité** : style · mineur
- **Explication** : virgule avant « ou », énumération sans déterminants, « vous devez » inutilement comminatoire.
- **Correction retenue** : « Pour toute question technique, toute réinstallation ou toute demande de licence, adressez-vous directement à l'éditeur. »

### FR-14 · Que faire… · Intertitre d'étape 1
- **Extrait actuel** : `<h3>Étape 1 : Identifiez votre matériel<br><br><strong><em>‍</em></strong></h3>` (précédé de « Voici la marche à suivre en cas de problème : »)
- **Catégorie / gravité** : artefact Webflow et typographie · mineur
- **Explication** : deux `<br>` et un caractère ZWJ (U+200D) en gras italique dans un intertitre ; majuscule après deux-points ; la phrase d'annonce se termine par deux-points devant un intertitre.
- **Correction retenue** : « Voici la marche à suivre. » puis « Étape 1 : identifiez votre matériel ».

### FR-15 · Étape 1 · Texte alternatif
- **Extrait actuel** : `alt="__wf_reserved_inherit"` (image `/images/blog/681a16ed96fe1ef9fd011a22.avif`)
- **Catégorie / gravité** : accessibilité · moyen
- **Explication** : marqueur interne Webflow lu par les lecteurs d'écran. L'image montre l'étiquette signalétique d'un Photosimile 200 d'Ortery Technologies, ce qui illustre précisément l'étape (nom du modèle, numéro de série).
- **Correction retenue** : « Étiquette signalétique d'un Photosimile 200 d'Ortery Technologies indiquant le modèle et le numéro de série » (06-19).

### FR-16 · Étape 1 · Paragraphes vides
- **Extrait actuel** : `<p id="">‍</p>` (trois occurrences : après l'image, avant et après la vidéo)
- **Catégorie / gravité** : artefact Webflow · mineur
- **Explication** : paragraphes ne contenant qu'un ZWJ, qui créent des blancs irréguliers.
- **Correction retenue** : supprimés.

### FR-17 · Étape 1 · Abréviation et points de suspension
- **Extrait actuel** : « (ex. PackshotOne, R3 Mark II, Spin O3T...) »
- **Catégorie / gravité** : typographie · mineur
- **Explication** : « ex. » et trois points au lieu du caractère « … ». Les graphies des modèles sont à confirmer (06-9).
- **Correction retenue** : « (par exemple PackshotOne, R3 Mark II, Spin O3T…) » ; « Numéro de série, s'il est disponible ».

### FR-18 · Étape 2 · Intertitre et liste
- **Extrait actuel** : « Étape 2 : Contactez Ortery Technologies » / « Télécharger un logiciel PackshotCreator ou PackshotSpin » / « Réactiver une licence » / « Obtenir un support technique sur les versions antérieures »
- **Catégorie / gravité** : typographie et anglicisme · mineur
- **Explication** : majuscule après deux-points (intertitre et liste introduite par « pour : ») ; « support technique » calqué sur l'anglais.
- **Correction retenue** : « Étape 2 : contactez Ortery Technologies » ; « télécharger un logiciel PackshotCreator ou PackshotSpin ; réactiver une licence ; obtenir une assistance technique sur les versions antérieures. »

### FR-19 · Étape 2 · Rôle exclusif d'Ortery
- **Extrait actuel** : « Ortery est aujourd'hui votre seul interlocuteur pour : »
- **Catégorie / gravité** : claim sur un tiers · moyen
- **Explication** : engage Ortery (téléchargement, licences, assistance sur des logiciels vendus sous la marque PackshotCreator) sans source dans le texte.
- **Correction retenue** : conservé (06-8).

### FR-20 · Étape 2 · Adresse
- **Extrait actuel** : « Cypresbaan 45 BG, 2908LT Capelle aan den Ijssel, Rotterdam, Pays-Bas »
- **Catégorie / gravité** : orthographe · mineur
- **Explication** : le digramme néerlandais s'écrit « IJ » (« IJssel », graphie de `messages/fr.json`) ; le code postal néerlandais s'écrit « 2908 LT » ; Capelle aan den IJssel est une commune voisine de Rotterdam, d'où les parenthèses (formule de `messages/fr.json`).
- **Correction retenue** : « Cypresbaan 45 BG, 2908 LT Capelle aan den IJssel (Rotterdam), Pays-Bas » (06-7).

### FR-21 · Étape 2 · Téléphone
- **Extrait actuel** : « +31 64121-8909 »
- **Catégorie / gravité** : typographie · mineur
- **Explication** : groupement inhabituel ; les chiffres correspondent à un numéro mobile néerlandais (+31 6…). Mêmes chiffres, dans le même ordre, regroupés.
- **Correction retenue** : « +31 6 4121 8909 » (06-7).

### FR-22 · Étape 2 · URL affichée
- **Extrait actuel** : `<a href="https://ortery.eu/contact-ortery-technologies-inc/" target="_blank">https:www.ortery.eu/contact-ortery-technologies-inc</a>`
- **Catégorie / gravité** : lien · moyen
- **Explication** : texte affiché mal formé (« https:www » sans « // ») et différent de la cible (sans « www. »). La cible n'a pas été vérifiée (pas d'accès web).
- **Correction retenue** : texte « ortery.eu/contact-ortery-technologies-inc », cible inchangée, `rel="noopener"` à ajouter.

### FR-23 · Étape 2 · Artefact dans l'adresse
- **Extrait actuel** : `<strong id="">Ortery Technologies B.V.<br>‍</strong>`
- **Catégorie / gravité** : artefact Webflow · mineur
- **Explication** : ZWJ et retour à la ligne à l'intérieur du gras.
- **Correction retenue** : « **Ortery Technologies B.V.** » suivi d'un `<br>`.

### FR-24 · Compatibilité · Intertitre peu explicite
- **Extrait actuel** : « Problèmes de compatibilité importants »
- **Catégorie / gravité** : SEO et clarté · mineur
- **Explication** : l'intertitre ne nomme pas Windows 11, objet de la section et des recherches d'anciens clients (anciennes pages d'aide « compatibilite-windows11-packshotcreator » redirigées ici).
- **Correction retenue** : « Compatibilité avec Windows 11 : des limites importantes » (06-20).

### FR-25 · Compatibilité · Anglicisme
- **Extrait actuel** : « Même en retrouvant le logiciel, il est important de noter certaines limitations : »
- **Catégorie / gravité** : style · mineur
- **Explication** : « limitations » au sens de « limites » est un anglicisme ; tournure lourde.
- **Correction retenue** : « Même si vous retrouvez le logiciel, certaines limites sont à connaître. »

### FR-26 · Compatibilité · Contradiction avec la FAQ 1
- **Extrait actuel** : « Les solutions Ortery présentent une compatibilité limitée avec Windows 11. »
- **Catégorie / gravité** : contradiction et claim sur un tiers · majeur
- **Explication** : la FAQ 1 affirme que « les logiciels Ortery les plus récents sont compatibles avec Windows 11 » ; le corps généralise à toutes les solutions Ortery une limite que la FAQ et l'article « Migrer un ancien studio PackshotCreator » réservent aux versions livrées entre 2003 et 2020. Dans son contexte (« Même en retrouvant le logiciel »), la phrase vise le logiciel perdu, donc les anciennes versions.
- **Correction retenue** : « Les anciennes versions des logiciels Ortery livrées avec les studios PackshotCreator présentent une compatibilité limitée avec Windows 11. » (06-5).

### FR-27 · Compatibilité · Tautologie
- **Extrait actuel** : « Vous pourriez rencontrer des problèmes si votre appareil photo n'est plus reconnu. L'installation du logiciel peut échouer ou se bloquer sur les systèmes récents. »
- **Catégorie / gravité** : logique · mineur
- **Explication** : un appareil non reconnu est le problème, pas sa condition.
- **Correction retenue** : « Votre appareil photo peut ne plus être reconnu, et l'installation du logiciel peut échouer ou se bloquer sur les systèmes récents. »

### FR-28 · Compatibilité · Affirmation défavorable à un tiers
- **Extrait actuel** : « Dans ces cas, une remise en fonctionnement est rarement possible. Il est alors temps d'envisager une migration vers une solution moderne et compatible avec les standards actuels. »
- **Catégorie / gravité** : claim sur un tiers, tension avec la FAQ 2 · majeur
- **Explication** : la FAQ 2 indique qu'on peut tenter une remise en service auprès d'Ortery, sous conditions. « Rarement possible » n'est pas sourcé.
- **Correction retenue** : « Dans ces situations, une remise en service n'est pas toujours possible : elle suppose que votre matériel soit encore pris en charge et que votre configuration (appareil photo, connectique, système d'exploitation) soit compatible. Sinon, il est temps d'envisager une migration vers une solution moderne, compatible avec les standards actuels. » Conditions reprises de la FAQ 2 (06-6).

### FR-29 · Orbitvu · Ponctuation
- **Extrait actuel** : « les solutions Orbitvu, plus rapides, intuitives, et compatibles avec les technologies modernes (Windows 11, Mac, cloud...) »
- **Catégorie / gravité** : typographie · mineur
- **Explication** : virgule avant « et », comparatif non répété, trois points. La promesse de compatibilité est listée en 06-12.
- **Correction retenue** : « les solutions Orbitvu : plus rapides, plus intuitives et compatibles avec les technologies actuelles (Windows 11, Mac, cloud…) ».

### FR-30 · Avantages · Intertitre et « 74 lampes »
- **Extrait actuel** : « Les avantages des solutions Orbitvu modernes : » / « Éclairage virtuel avec 74 lampes pilotables séparément »
- **Catégorie / gravité** : typographie (mineur) ; claim généralisé (majeur)
- **Explication** : deux-points en fin d'intertitre. Les 74 sources sont une caractéristique de l'Alphashot Pro G2 (titre de l'iframe : « … I ALPHASHOT PRO G2 » ; `messages/en.json` ; article « Migrer ») ; présentées comme un avantage de toutes les solutions Orbitvu, elles contredisent les « 170 panneaux LED » de l'Alphashot XL G2 relevés par le rapport maître du 26/09.
- **Correction retenue** : « Les avantages des solutions Orbitvu modernes » ; « Éclairage virtuel avec 74 lampes pilotables séparément (Alphashot Pro G2) » (06-11). Compté comme une anomalie majeure.

### FR-31 · Avantages · Compatibilité « complète »
- **Extrait actuel** : « Compatibilité complète avec Mac/PC, PIM, DAM, marketplaces, e-commerce »
- **Catégorie / gravité** : claim · moyen
- **Explication** : promesse absolue sans source ; énumération elliptique.
- **Correction retenue** : « Compatibilité complète avec Mac et PC, PIM, DAM, marketplaces et sites e-commerce », claim conservé (06-12).

### FR-32 · Avantages · Lien produit
- **Extrait actuel** : « Découvrir Alphashot PRO G2 » (`<a href="/fr/studio-photo/alphashot-pro-g2" target="_blank">`)
- **Catégorie / gravité** : appellation · mineur
- **Explication** : la fiche produit et `messages/*.json` écrivent « Alphashot Pro G2 ». Hors texte : un lien interne qui ouvre un nouvel onglet (absent en EN) est à retirer lors de la conversion.
- **Correction retenue** : « Découvrir l'Alphashot Pro G2 », cible inchangée.

### FR-33 · Principaux avantages · Graphie de macOS
- **Extrait actuel** : « support complet de Windows 11 et MacOS, contrairement aux anciens studios limités à Windows XP, 7 ou 10 »
- **Catégorie / gravité** : appellation et anglicisme · mineur
- **Explication** : graphie officielle « macOS » ; « support » au sens de prise en charge.
- **Correction retenue** : « prise en charge complète de Windows 11 et de macOS, quand les anciens studios se limitaient à Windows XP, 7 ou 10 » (claim : 06-12).

### FR-34 · Principaux avantages · « Fonds » ambigu
- **Extrait actuel** : « élimination instantanée des fonds sans manipulation manuelle »
- **Catégorie / gravité** : ambiguïté · mineur
- **Explication** : le pluriel « fonds » prête à confusion (il a produit le contresens EN « disposal of funds ») ; « manipulation manuelle » est redondant.
- **Correction retenue** : « suppression instantanée du fond, sans intervention manuelle ».

### FR-35 · Principaux avantages · Ponctuation de liste
- **Extrait actuel** : « Assistant utilisateur intuitif : guidage pas à pas même pour les débutants » / « contrôle précis via des sources virtuelles multiples »
- **Catégorie / gravité** : typographie · mineur
- **Explication** : liste introduite par deux-points sans ponctuation finale ; virgule manquante avant « même ».
- **Correction retenue** : items terminés par « ; » puis « . » ; « guidage pas à pas, même pour les débutants » ; « contrôle précis grâce à de multiples sources virtuelles ».

### FR-36 · Principaux avantages · Ancre « À lire aussi »
- **Extrait actuel** : « Comparatif Alphashot XL PRO vs PackshotCreator R3 »
- **Catégorie / gravité** : appellation · mineur
- **Explication** : le site écrit « Alphashot XL Pro ».
- **Correction retenue** : « Comparatif Alphashot XL Pro vs PackshotCreator R3 », cible inchangée.

### FR-37 · Réinternaliser · Liste
- **Extrait actuel** : « Les nouveaux outils Orbitvu vous permettent de : » suivi de « Réduire vos coûts externes », « Accélérer la mise en ligne de vos produits », « Maintenir une qualité visuelle homogène », « Automatiser le détourage, le nommage et l'export »
- **Catégorie / gravité** : typographie · mineur
- **Explication** : la liste prolonge « vous permettent de : » : minuscules et ponctuation de liste.
- **Correction retenue** : « réduire vos coûts externes ; accélérer la mise en ligne de vos produits ; maintenir une qualité visuelle homogène ; automatiser le détourage, le nommage et l'export. »

### FR-38 · Réinternaliser · Formule de renvoi
- **Extrait actuel** : « À lire : Est-il utile d'internaliser sa production de photos packshot ? »
- **Catégorie / gravité** : cohérence · mineur
- **Explication** : « À lire : » ici, « À lire aussi : » plus haut.
- **Correction retenue** : « À lire aussi : », ancre et cible inchangées.

### FR-39 · En résumé · Gras, majuscules, article
- **Extrait actuel** : `<strong>Si vous avez perdu votre logiciel PackshotCreator ou PackshotSpin</strong> : Contactez directement <strong>Ortery Technologies</strong>, l'éditeur et développeur.<strong><br>Si votre matériel n'est plus compatible avec Windows 11</strong> : Planifiez une démonstration`
- **Catégorie / gravité** : typographie et balisage · mineur
- **Explication** : majuscules après deux-points ; `<br>` enfermé dans le gras ; « l'éditeur et développeur » sans second déterminant.
- **Correction retenue** : « **Vous avez perdu votre logiciel PackshotCreator ou PackshotSpin ?** Contactez directement **Ortery Technologies**, qui l'édite et le développe. » / « **Votre matériel n'est plus compatible avec Windows 11 ?** Planifiez une démonstration **Orbitvu** pour découvrir les alternatives modernes. »

### FR-40 · En résumé · Ancre du lien de contact
- **Extrait actuel** : « Contactez notre équipe ou consultez notre site pour découvrir l'ensemble de nos solutions Orbitvu. » (phrase entière liée à `/fr/contact`)
- **Catégorie / gravité** : lien · mineur
- **Explication** : ancre trop longue, qui promet « notre site » et mène au formulaire de contact.
- **Correction retenue** : « [Contactez notre équipe](/fr/contact) ou consultez notre site pour découvrir l'ensemble de nos solutions Orbitvu. »

### FR-41 · FAQ 1 · « Oui » contredit
- **Extrait actuel** : « Oui, les logiciels Ortery les plus récents sont compatibles avec Windows 11. En revanche, les versions livrées avec les studios PackshotCreator entre 2003 et 2020 ne le sont généralement pas. »
- **Catégorie / gravité** : logique et claim sur un tiers · majeur
- **Explication** : la réponse commence par « Oui » puis exclut les versions que possède le lecteur de cet article. Affirmation sur un tiers non sourcée (la version EN la renforce : EN-48).
- **Correction retenue** : « Cela dépend de la version. Les logiciels Ortery les plus récents sont compatibles avec Windows 11. En revanche, … » ; ajout final « Pour vérifier votre configuration, adressez-vous à Ortery. », déduit de l'étape 2 (06-5).

### FR-42 · FAQ 2 · Retour à la ligne parasite
- **Extrait actuel** : `"answer": "\nTechniquement, vous pouvez tenter…"`
- **Catégorie / gravité** : technique · mineur
- **Explication** : saut de ligne en tête de réponse, repris dans les données structurées FAQPage.
- **Correction retenue** : supprimé.

### FR-43 · FAQ 3 · « Via »
- **Extrait actuel** : « Orbitvu bénéficie également d'un accompagnement local complet via PackshotCreator : démonstrations, formations, conseils d'intégration. »
- **Catégorie / gravité** : style · mineur
- **Explication** : « via » s'emploie pour un lieu ou un canal, pas pour un prestataire.
- **Correction retenue** : « Orbitvu bénéficie en outre d'un accompagnement local complet par PackshotCreator : démonstrations, formations et conseils d'intégration. »

### FR-44 · FAQ 4 · « En 2025 »
- **Extrait actuel** : « En 2025, Orbitvu permet une production autonome »
- **Catégorie / gravité** : date périmée · majeur
- **Explication** : même défaut que FR-04.
- **Correction retenue** : « Orbitvu permet aujourd'hui une production autonome » (06-1).

### FR-45 · FAQ 4 · Gain chiffré non sourcé
- **Extrait actuel** : « Dans la majorité des cas, le temps de production est réduit d'un facteur de trois à cinq, avec un impact direct sur vos coûts et vos délais. »
- **Catégorie / gravité** : claim · majeur
- **Explication** : fourchette chiffrée et fréquence (« dans la majorité des cas ») sans source ; D42 exclut les promesses non sourcées.
- **Correction retenue** : « Selon les cas, le temps de production peut être divisé par trois à cinq, avec un effet direct sur vos coûts et vos délais. » Chiffre conservé, modalité atténuée (06-14).

### FR-46 · FAQ 5 · Contenu de l'offre de reprise
- **Extrait actuel** : « Proposez-vous des offres de mise à jour ou de reprise… » / « Cette offre comprend un diagnostic gratuit, une évaluation de reprise de votre matériel, une remise commerciale sur un nouveau studio Orbitvu adapté à vos besoins (packshot fixe, 360°, vidéo), ainsi qu'un accompagnement complet incluant démonstration, formation et intégration. L'objectif est de vous permettre une transition rapide, sans interruption d'activité »
- **Catégorie / gravité** : engagement commercial, cohérence entre articles · majeur
- **Explication** : « mise à jour » désigne mal une montée de gamme (« mise à niveau »). L'offre est un engagement commercial non sourcé (gratuité, remise). « Comprend […] formation » laisse entendre une formation comprise, alors que l'article natif « Migrer un ancien studio PackshotCreator » (Sébastien, 25/09/2026) la dit « facturée séparément » et optionnelle, et parle d'une reprise étudiée « au cas par cas ».
- **Correction retenue** : question « offres de mise à niveau ou de reprise » ; réponse qui conserve diagnostic gratuit, évaluation de reprise et remise commerciale, puis « Nous vous accompagnons ensuite tout au long du projet : démonstration, formation et intégration. » (06-15, 06-16).

### FR-47 · Métadonnées · Auteur
- **Extrait actuel** : `"author": "PackshotCreator"` (import : « Laurent Wainberg »)
- **Catégorie / gravité** : information · mineur
- **Explication** : remplacement délibéré du 12/06/2026 (`8ae45f63`, « cohérence E-E-A-T avec le schema Organization ») sur le seul champ auteur ; aucun nom de personne remplacé dans le corps.
- **Correction retenue** : aucune ; signalé pour décision (06-18).

---

## EN — /en/blog/lost-packshotcreator-ortery-software-solution

Le corps EN est une traduction automatique non relue du FR ; la FAQ EN est rédigée en anglais idiomatique mais s'écarte du FR. Toutes les corrections renvoient à `04-PROPOSITION_EN.md`, retraduit depuis le FR corrigé.

### EN-01 · title · Espace finale
- **Extrait actuel** : `"title": "Have you lost your PackshotCreator or Ortery software? "`
- **Catégorie / gravité** : technique · mineur
- **Explication** : espace parasite.
- **Correction retenue** : « Have you lost your PackshotCreator or Ortery software? »

### EN-02 · h1 · Sens de « récupérer » perdu
- **Extrait actuel** : « Get your PackshotCreator or Ortery software »
- **Catégorie / gravité** : titre littéral · moyen
- **Explication** : « Get » évoque une acquisition et ne dit pas qu'on récupère un logiciel perdu ; décalage avec le metaTitle (« Recover »).
- **Correction retenue** : « Recover your PackshotCreator or Ortery software ».

### EN-03 · metaTitle · Longueur et casse
- **Extrait actuel** : « Recover your lost PackshotCreator or Ortery software - Solutions and alternatives »
- **Catégorie / gravité** : SEO · moyen
- **Explication** : 81 caractères, tronqué ; trait d'union comme séparateur.
- **Correction retenue** : « Lost PackshotCreator or Ortery software? Where to get it » (56 caractères), voir 05.

### EN-04 · description · Promesse non tenue
- **Extrait actuel** : « Problems with your PackshotCreator or Ortery software? Learn how to get your license back, fix Windows 11 compatibility issues, and explore modern alternatives. »
- **Catégorie / gravité** : SEO et claim · moyen
- **Explication** : 160 caractères ; « fix Windows 11 compatibility issues » promet ce que l'article ne fait pas ; la requête de marque « packshot creator software download » (12 clics) n'y trouve pas « download ».
- **Correction retenue** : « Lost your PackshotCreator or Ortery software? Where to download it, how to reactivate a license, Windows 11 limitations and Orbitvu alternatives. » (145 caractères), voir 05.

### EN-05 · Chapeau · Phrase coupée
- **Extrait actuel** : « PackshotCreator has enabled thousands of companies to produce professional quality visuals in-house. Thanks to automated photography solutions. »
- **Catégorie / gravité** : traduction automatique · moyen
- **Explication** : point à l'intérieur de l'ancre, puis fragment sans verbe ; « professional quality » sans trait d'union en position d'adjectif.
- **Correction retenue** : « Over the past 20-plus years, [PackshotCreator has helped thousands of companies produce professional-quality visuals in-house](/en/a-propos) with automated photography solutions. »

### EN-06 · Chapeau · Date et temps
- **Extrait actuel** : « However, in 2025, many users contacted us for the same problem »
- **Catégorie / gravité** : date périmée et grammaire · majeur
- **Explication** : marqueur daté (voir FR-04) ; prétérit au lieu du present perfect ; « contact for » incorrect.
- **Correction retenue** : « Since support ended, however, many users have contacted us with the same problem » (06-1).

### EN-07 · Chapeau · Énumération agrammaticale
- **Extrait actuel** : « loss of PackshotCreator software, studio Not recognized on Windows 11, or impossibility of Reinstall the system after a computer change »
- **Catégorie / gravité** : traduction automatique · majeur
- **Explication** : « impossibility of Reinstall » agrammatical, majuscules aléatoires, articles manquants.
- **Correction retenue** : « lost PackshotCreator software, a studio not recognized by Windows 11, or no way to reinstall the system after changing computers ».

### EN-08 · Chapeau · Faux ami « concerned »
- **Extrait actuel** : « If you are concerned, here is the up-to-date information to understand the situation and to know what solutions are available. »
- **Catégorie / gravité** : faux ami · moyen
- **Explication** : « concerned » signifie « inquiet », pas « concerné » ; « up-to-date » : voir FR-06.
- **Correction retenue** : « If this sounds familiar, here is what you need to know to understand the situation and find the right solution. »

### EN-09 · Pourquoi… · Double apposition
- **Extrait actuel** : « a company based in Taiwan, a pioneer in automated photography since 2001 »
- **Catégorie / gravité** : style · mineur
- **Explication** : deux appositions juxtaposées. Fait à confirmer (06-4).
- **Correction retenue** : « a Taiwan-based company that has been a pioneer of automated photography since 2001 ».

### EN-10 · Pourquoi… · « Exclusive Distributor »
- **Extrait actuel** : « PackshotCreator was for over 20 years the Exclusive Distributor of Ortery In EMEA, marketing these software and hardware solutions under its own brand. »
- **Catégorie / gravité** : conformité D6 et Title Case · majeur
- **Explication** : voir FR-10 ; majuscules parasites ; ordre des mots non idiomatique.
- **Correction retenue** : « For more than 20 years, PackshotCreator was Ortery's distributor in the EMEA region and sold these software and hardware solutions under its own brand. » (06-2).

### EN-11 · Pourquoi… · Temps fautif
- **Extrait actuel** : « PackshotCreator No longer distributed Ortery software »
- **Catégorie / gravité** : traduction automatique · majeur
- **Explication** : prétérit qui contredit « no longer » ; majuscule parasite.
- **Correction retenue** : « PackshotCreator no longer distributes Ortery software; »

### EN-12 · Pourquoi… · Phrase agrammaticale
- **Extrait actuel** : « The PackshotCreator support On these solutions to Officially ended on December 31, 2024 »
- **Catégorie / gravité** : traduction automatique · majeur
- **Explication** : « to Officially ended » ; préposition « on » fautive.
- **Correction retenue** : « PackshotCreator support for these solutions officially ended on December 31, 2024. » (06-8).

### EN-13 · Pourquoi… · « Relocation »
- **Extrait actuel** : « Software development is continuing at Ortery. For any technical questions, relocation, or license requests, you must Contact the publisher directly. »
- **Catégorie / gravité** : contresens · majeur
- **Explication** : « réinstallation » rendu par « relocation » (déménagement) ; majuscule parasite ; « is continuing » plus lourd que « continues ».
- **Correction retenue** : « Software development continues at Ortery. For any technical question, reinstallation or license request, please contact the publisher directly. »

### EN-14 · Que faire… · Intertitre et annonce
- **Extrait actuel** : « What should you do if you lost the software or changed your PC? » / « Here are the steps to follow in case of problems: »
- **Catégorie / gravité** : grammaire et calque · mineur
- **Explication** : present perfect attendu ; « in case of problems » calque « en cas de problème » et annonce un intertitre par deux-points.
- **Correction retenue** : « What should you do if you've lost the software or changed your PC? » / « Here are the steps to follow. »

### EN-15 · Étape 1 · Artefacts dans l'intertitre
- **Extrait actuel** : `<h3>Step 1: Identify your hardware<br><br><strong><em>‍</em></strong></h3>`
- **Catégorie / gravité** : artefact Webflow · mineur
- **Explication** : voir FR-14.
- **Correction retenue** : « Step 1: Identify your hardware ».

### EN-16 · Étape 1 · Texte alternatif
- **Extrait actuel** : `alt="__wf_reserved_inherit"`
- **Catégorie / gravité** : accessibilité · moyen
- **Explication** : voir FR-15.
- **Correction retenue** : « Rating plate of an Ortery Technologies Photosimile 200 showing the model and serial number » (06-19).

### EN-17 · Étape 1 · Paragraphes vides
- **Extrait actuel** : `<p id="">‍</p>` (trois occurrences)
- **Catégorie / gravité** : artefact Webflow · mineur
- **Explication** : voir FR-16.
- **Correction retenue** : supprimés.

### EN-18 · Étape 1 · Nom de modèle déformé
- **Extrait actuel** : « Studio name (e.g. PackshoTone, R3 Mark II, Spin O3T...) »
- **Catégorie / gravité** : appellation · moyen
- **Explication** : « PackshoTone » pour « PackshotOne » ; l'usage américain écrit « e.g., » ; trois points.
- **Correction retenue** : « Studio name (e.g., PackshotOne, R3 Mark II, Spin O3T…) » (06-9).

### EN-19 · Étape 1 · Majuscules parasites
- **Extrait actuel** : « Serial number If available » / « Purchase year And version of the software used »
- **Catégorie / gravité** : Title Case · mineur
- **Explication** : majuscules en milieu de puce ; « purchase year » moins naturel que « year of purchase ».
- **Correction retenue** : « Serial number, if available » / « Year of purchase and the software version you were using ».

### EN-20 · Étape 2 · Calque « interlocutor »
- **Extrait actuel** : « Ortery is now your Only Interlocutor For: »
- **Catégorie / gravité** : calque · moyen
- **Explication** : « interlocutor » ne s'emploie pas pour un contact commercial ; majuscules parasites. Claim : 06-8.
- **Correction retenue** : « Ortery is now your only point of contact to: »

### EN-21 · Étape 2 · « A software »
- **Extrait actuel** : « Download a PackshotCreator or PackshotSpin software »
- **Catégorie / gravité** : grammaire · moyen
- **Explication** : « software » est indénombrable. La puce porte la requête « packshot creator software download » : à garder avec « download » et « software ».
- **Correction retenue** : « download PackshotCreator or PackshotSpin software; »

### EN-22 · Étape 2 · « Helpdesk »
- **Extrait actuel** : « Get a Helpdesk On previous versions »
- **Catégorie / gravité** : terminologie · moyen
- **Explication** : on n'obtient pas « un helpdesk » ; « support technique » se dit « technical support ».
- **Correction retenue** : « get technical support for earlier versions. »

### EN-23 · Étape 2 · Adresse et téléphone
- **Extrait actuel** : « Cypresbaan 45 BG, 2908LT Capelle aan den Ijssel, Rotterdam, Netherlands » / « +31 64121-8909 »
- **Catégorie / gravité** : orthographe et typographie · mineur
- **Explication** : voir FR-20 et FR-21.
- **Correction retenue** : « Cypresbaan 45 BG, 2908 LT Capelle aan den IJssel (Rotterdam), Netherlands » / « +31 6 4121 8909 » (06-7).

### EN-24 · Étape 2 · URL affichée fautive
- **Extrait actuel** : « https://www.ortery.eu/contact-ortery-technologes-inc »
- **Catégorie / gravité** : lien · moyen
- **Explication** : coquille « technologes » et « www. » absent de la cible réelle.
- **Correction retenue** : « ortery.eu/contact-ortery-technologies-inc », cible inchangée.

### EN-25 · Compatibilité · Intertitre et annonce
- **Extrait actuel** : « Significant compatibility issues » / « Even when you find the software, it is important to note some limitations: »
- **Catégorie / gravité** : SEO et style · mineur
- **Explication** : l'intertitre ne nomme pas Windows 11 (voir FR-24) ; « Even when » au lieu de « Even if ».
- **Correction retenue** : « Windows 11 compatibility: significant limitations » / « Even if you find the software, there are some limitations to be aware of. »

### EN-26 · Compatibilité · Phrase agrammaticale et généralisation
- **Extrait actuel** : « Ortery solutions present at Limited compatibility with Windows 11. »
- **Catégorie / gravité** : traduction automatique et contradiction · majeur
- **Explication** : « present at » agrammatical ; même généralisation qu'en FR (FR-26).
- **Correction retenue** : « Older versions of the Ortery software supplied with PackshotCreator studios have limited compatibility with Windows 11. » (06-5).

### EN-27 · Compatibilité · Title Case et « Crash »
- **Extrait actuel** : « You May Run Into Problems If Your Camera is no longer recognized. Installing the software can Fail or Crash On recent systems. »
- **Catégorie / gravité** : Title Case et faux sens · moyen
- **Explication** : majuscules à chaque mot ; « se bloquer » signifie geler (« freeze »), pas planter.
- **Correction retenue** : « Your camera may no longer be recognized, and installation may fail or freeze on recent systems. »

### EN-28 · Compatibilité · Calque et claim
- **Extrait actuel** : « In these cases, a return to operation is seldom possible. »
- **Catégorie / gravité** : calque et claim sur un tiers · majeur
- **Explication** : « return to operation » n'est pas idiomatique ; claim : voir FR-28.
- **Correction retenue** : « In these situations, getting the studio running again is not always possible: your hardware must still be supported, and your setup (camera, connections, operating system) must be compatible. » (06-6).

### EN-29 · Compatibilité · Phrase agrammaticale
- **Extrait actuel** : « It is then time to consider a Migration to a Modern Solution and compatible with current standards. »
- **Catégorie / gravité** : traduction automatique · moyen
- **Explication** : coordination impossible (« a solution and compatible ») ; Title Case.
- **Correction retenue** : « If not, it is time to consider migrating to a modern solution that meets today's standards. »

### EN-30 · Orbitvu · Intertitre en Title Case
- **Extrait actuel** : « Orbitvu: The New Generation of Automated Studios »
- **Catégorie / gravité** : Title Case · mineur
- **Explication** : seul intertitre en Title Case ; les autres sont en casse de phrase.
- **Correction retenue** : « Orbitvu: the new generation of automated studios ».

### EN-31 · Orbitvu · Temps et article défini
- **Extrait actuel** : « Since 2023, PackshotCreator is the official distributor of Orbitvu solutions, faster, more intuitive, and Compatible with Modern Technologies (Windows 11, Mac, cloud...). »
- **Catégorie / gravité** : grammaire et conformité D6 · moyen
- **Explication** : « Since » exige le present perfect ; « the official distributor » se lit en anglais comme un distributeur unique, ce que D6 écarte (« Personne n'est exclusif sur la Suisse ») ; majuscules parasites.
- **Correction retenue** : « Since 2023, PackshotCreator has offered Orbitvu solutions as an official distributor: faster, more intuitive and compatible with current technologies (Windows 11, Mac, cloud…). » (06-10).

### EN-32 · Avantages · Intertitre
- **Extrait actuel** : « The advantages of modern Orbitvu solutions: »
- **Catégorie / gravité** : typographie · mineur
- **Explication** : deux-points en fin d'intertitre.
- **Correction retenue** : « The advantages of modern Orbitvu solutions ».

### EN-33 · Avantages · Puces en Title Case
- **Extrait actuel** : « AI photo assistant Integrated to Guide Your Shots » / « Virtual lighting With 74 lamps that can be controlled separately » / « Automated clipping and retouching To Save Time » / « E-commerce export in one click To the Main Platforms » / « 360° animation and product videos Professional quality »
- **Catégorie / gravité** : Title Case et traduction automatique · moyen
- **Explication** : majuscules aléatoires ; « clipping » n'est pas le terme anglais du détourage (« background removal ») ; « Professional quality » sans préposition. « 74 lamps » : voir FR-30.
- **Correction retenue** : « AI photo assistant built in to guide your shots » / « Virtual lighting with 74 individually controllable lights (Alphashot Pro G2) » / « Automated background removal and retouching to save time » / « One-click e-commerce export to the main platforms » / « 360° animation and product videos of professional quality » (06-11).

### EN-34 · Avantages · Lien produit
- **Extrait actuel** : « Discover Alphashot PRO G2 »
- **Catégorie / gravité** : appellation · mineur
- **Explication** : graphie du site « Alphashot Pro G2 ».
- **Correction retenue** : « Discover the Alphashot Pro G2 ».

### EN-35 · Principaux avantages · Accord et casse
- **Extrait actuel** : « Modern Orbitvu solutions offers several major advantages over the old packshotcreator/Ortery solutions: »
- **Catégorie / gravité** : grammaire et appellation · moyen
- **Explication** : « solutions offers » ; marque en minuscules.
- **Correction retenue** : « Current Orbitvu solutions offer several major advantages over the old PackshotCreator/Ortery solutions: »

### EN-36 · Principaux avantages · Espace avant deux-points
- **Extrait actuel** : « Extensive compatibility : full support for Windows 11 and MacOS » (et les quatre puces suivantes)
- **Catégorie / gravité** : typographie · mineur
- **Explication** : espace à la française avant « : », absente en anglais ; « MacOS » ; « Extensive » moins juste que « Broader ».
- **Correction retenue** : « Broader compatibility: full support for Windows 11 and macOS, whereas the old studios were limited to Windows XP, 7 or 10 » (06-12).

### EN-37 · Principaux avantages · « Disposal of funds »
- **Extrait actuel** : « Automatic clipping : instant disposal of funds without manual manipulation »
- **Catégorie / gravité** : contresens · majeur
- **Explication** : « fonds » (arrière-plans) traduit par « funds » (argent) : la phrase parle d'élimination instantanée de fonds financiers.
- **Correction retenue** : « Automatic background removal: backgrounds removed instantly, with no manual work ».

### EN-38 · Principaux avantages · Title Case
- **Extrait actuel** : « Intuitive user assistant : Step-by-Step Guidance Even for Beginners » / « Automated e-commerce export : Considerable Time Savings When Putting It Online » / « Advanced and controllable lighting : precise control via multiple virtual sources »
- **Catégorie / gravité** : Title Case et calque · moyen
- **Explication** : majuscules aléatoires ; « Putting It Online » calque « mise en ligne ».
- **Correction retenue** : « Intuitive user assistant: step-by-step guidance, even for beginners » / « Automated e-commerce export: considerable time savings when publishing products online » / « Advanced, controllable lighting: precise control through multiple virtual light sources ».

### EN-39 · Principaux avantages · « Also to read »
- **Extrait actuel** : « Also to read: Comparison of Alphashot XL PRO vs PackshotCreator R3 »
- **Catégorie / gravité** : calque · mineur
- **Explication** : « Also to read » calque « À lire aussi » ; « Comparison of X vs Y » redondant.
- **Correction retenue** : « See also: Alphashot XL Pro vs PackshotCreator R3 comparison », cible inchangée.

### EN-40 · Réinternaliser · Intertitre
- **Extrait actuel** : « Why reinternalize your visual production? »
- **Catégorie / gravité** : calque · moyen
- **Explication** : « reinternalize » n'existe pas en anglais courant.
- **Correction retenue** : « Why bring your visual production back in-house? »

### EN-41 · Réinternaliser · Liste
- **Extrait actuel** : « Reduce your external costs » / « Accelerate the online process Of your products » / « Maintain a Consistent visual quality »
- **Catégorie / gravité** : traduction automatique · moyen
- **Explication** : « the online process of your products » n'a pas de sens ; majuscules parasites ; « external costs » ambigu (coûts externes au sens économique).
- **Correction retenue** : « reduce outsourcing costs; » / « get your products online faster; » / « maintain consistent visual quality; »

### EN-42 · Réinternaliser · « Automaton »
- **Extrait actuel** : « Automaton Clipping, Naming and Exporting »
- **Catégorie / gravité** : contresens · majeur
- **Explication** : le verbe « Automatiser » rendu par le nom « Automaton » (automate) ; Title Case.
- **Correction retenue** : « automate background removal, file naming and export. »

### EN-43 · Réinternaliser · « To read »
- **Extrait actuel** : « To read: Is it useful to internalize your packshot photo production? »
- **Catégorie / gravité** : calque · mineur
- **Explication** : « To read » calque « À lire » ; ancre littérale.
- **Correction retenue** : « See also: Is it worth bringing packshot production in-house? », cible inchangée.

### EN-44 · En résumé · Ponctuation, casse, ordre des mots
- **Extrait actuel** : « If you have lost your PackshotCreator or PackshotSpin software : Contact directly Ortery Technologies, the publisher and developer. »
- **Catégorie / gravité** : traduction automatique · moyen
- **Explication** : espace avant « : » ; majuscule ; « Contact directly X » non idiomatique ; balisage du gras fautif (voir FR-39).
- **Correction retenue** : « **Lost your PackshotCreator or PackshotSpin software?** Contact its publisher and developer, **Ortery Technologies**, directly. »

### EN-45 · En résumé · « A demo Orbitvu »
- **Extrait actuel** : « If your hardware is no longer compatible with Windows 11 : Schedule a demo Orbitvu To discover modern alternatives. »
- **Catégorie / gravité** : traduction automatique · moyen
- **Explication** : ordre des mots français ; majuscules parasites.
- **Correction retenue** : « **Is your hardware no longer compatible with Windows 11?** Schedule an **Orbitvu** demo to discover modern alternatives. »

### EN-46 · En résumé · « There to support you »
- **Extrait actuel** : « Our team is there to support you. »
- **Catégorie / gravité** : calque · mineur
- **Explication** : calque de « est là pour vous accompagner ».
- **Correction retenue** : « Our team is here to help. »

### EN-47 · En résumé · Ancre du lien de contact
- **Extrait actuel** : « Contact our team or visit our site to discover all of our Orbitvu solutions. » (phrase entière liée à `/en/contact`)
- **Catégorie / gravité** : lien · mineur
- **Explication** : voir FR-40.
- **Correction retenue** : « [Contact our team](/en/contact) or browse our site to discover our full range of Orbitvu solutions. »

### EN-48 · FAQ 1 · Claim renforcé
- **Extrait actuel** : « Yes, the most recent Ortery software versions are fully compatible with Windows 11. »
- **Catégorie / gravité** : renforcement de claim sur un tiers · majeur
- **Explication** : « fully » n'est pas dans le FR (« compatibles ») ; « Yes » contredit la phrase suivante (voir FR-41).
- **Correction retenue** : « It depends on the version. The most recent Ortery software is compatible with Windows 11. » ; ajout final « To check your own setup, contact Ortery. » (06-5).

### EN-49 · FAQ 2 · Question
- **Extrait actuel** : « Why not just continue with my PackshotCreator Studio if the software is updated at Ortery? »
- **Catégorie / gravité** : casse et calque · mineur
- **Explication** : « Studio » en capitale ; « updated at Ortery » calque « mis à jour chez Ortery ».
- **Correction retenue** : « Why not just keep using my PackshotCreator studio if Ortery is updating the software? »

### EN-50 · FAQ 2 · Ajout « productivity »
- **Extrait actuel** : « In practice, keeping an old studio in operation often becomes a constraint in terms of time, reliability, and productivity. »
- **Catégorie / gravité** : ajout au FR · moyen
- **Explication** : le FR dit « tant en termes de temps que de fiabilité » ; « productivity » est ajouté.
- **Correction retenue** : « In practice, keeping an old studio running often becomes a burden, in terms of both time and reliability. »

### EN-51 · FAQ 3 · Ajouts et écarts
- **Extrait actuel** : « Orbitvu takes a more modern and fully integrated approach, designed for current content production workflows. The studios come with advanced features such as real-time background removal, software-controlled virtual lighting, and a guided interface to simplify operations. Everything is centralized within Orbitvu Station, a single, professional-grade software platform. In addition, Orbitvu solutions are backed by full local support through PackshotCreator, including demonstrations, training, and tailored integration advice. »
- **Catégorie / gravité** : ajouts au FR · moyen
- **Explication** : « fully integrated », « software-controlled », « tailored » ajoutés ; « a guided interface » remplace « un assistant intelligent qui guide l'utilisateur » ; « professional-grade » remplace « conçu pour des usages professionnels intensifs ».
- **Correction retenue** : traduction fidèle du FR, voir `04-PROPOSITION_EN.md`.

### EN-52 · FAQ 4 · Question
- **Extrait actuel** : « My Ortery/PackshotCreator Studio is still working. Why should I consider replacing it? »
- **Catégorie / gravité** : casse · mineur
- **Explication** : « Studio » en capitale.
- **Correction retenue** : « My Ortery/PackshotCreator studio still works. Why should I consider replacing it? »

### EN-53 · FAQ 4 · Écart de sens et date
- **Extrait actuel** : « Just because a system works doesn't mean it's still effective. The real question is whether it allows you to produce visual content quickly, easily, and to current standards. In 2025, Orbitvu enables full autonomy »
- **Catégorie / gravité** : écart au FR et date périmée · majeur
- **Explication** : le FR oppose « faire fonctionner un studio » à « produire des visuels rapidement, sans retouche manuelle, et de façon homogène » ; l'EN remplace ces critères par « easily, and to current standards ». « In 2025 » : voir FR-44. « full autonomy » renforce « production autonome ».
- **Correction retenue** : « A system that works is not necessarily an efficient one. The challenge is no longer keeping a studio running, but producing visuals quickly, consistently and without manual retouching. Orbitvu now enables autonomous production… » (06-1).

### EN-54 · FAQ 4 · Gain chiffré
- **Extrait actuel** : « For most teams, production time is reduced by a factor of three to five, with a direct impact on cost and delivery times. »
- **Catégorie / gravité** : claim · majeur
- **Explication** : voir FR-45.
- **Correction retenue** : « Depending on the case, production time can be cut by a factor of three to five, with a direct impact on your costs and lead times. » (06-14).

### EN-55 · FAQ 5 · « Takeover » et « commercial offer »
- **Extrait actuel** : « Do you offer upgrade or takeover offers for the old PackshotCreator or Ortery studios? » / « a commercial offer on a new Orbitvu studio adapted to your needs (static, 360°, or video photography), and complete support including demonstration, training, and integration. The goal is to ensure a smooth, fast transition »
- **Catégorie / gravité** : faux sens et écart d'engagement · majeur
- **Explication** : « takeover » désigne un rachat d'entreprise ; « a commercial offer » ne dit pas « remise commerciale » (l'engagement diffère d'une langue à l'autre) ; « smooth » ajouté ; formation présentée comme comprise (voir FR-46).
- **Correction retenue** : « Do you offer upgrade or trade-in programs for old PackshotCreator or Ortery studios? » / « …and a discount on a new Orbitvu studio suited to your needs (still packshots, 360° or video). We then support you throughout the project: demonstration, training and integration. The goal is a fast transition… » (06-15).
