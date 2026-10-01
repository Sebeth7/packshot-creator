# Fiche — logiciel PackshotCreator ou Ortery perdu : solutions

Dossier de retraduction P1, audit B, 01/10/2026. Lecture seule du dépôt ; aucune modification de `content/`.

## Identité

| Élément | Valeur |
|---|---|
| ID de famille (item Webflow) | `681a1a294d5ce94156610507` |
| Création de l'item Webflow | 06/05/2025 14:18 (horodatage de l'ObjectId, inférence) ; champ `date` : 2025-05-06 ; `dateModified` absent |
| FR | `https://www.packshot-creator.com/fr/blog/logiciel-packshotcreator-ortery-perdu-solution` — `content/blog/fr/logiciel-packshotcreator-ortery-perdu-solution.json` |
| EN | `https://www.packshot-creator.com/en/blog/lost-packshotcreator-ortery-software-solution` — `content/blog/en/lost-packshotcreator-ortery-software-solution.json` |
| de-ch | aucune version (`content/blog/alternates.json` : FR et EN seulement) |
| Catégorie / auteur / lecture | Produits, Products / « PackshotCreator » (import : « Laurent Wainberg », remplacé par `8ae45f63`) / 5 min |
| État servi | 200 sur `sysnext.vercel.app` le 01/10/2026 (`main` `17fc0b3`) |
| Historique depuis l'import | `56d4bc32` import Webflow (18/04/2026) ; `44d780f1` images locales ; `8ae45f63` auteur générique ; `74dff0ce` « distributeur officiel » Orbitvu (l'« exclusif » Ortery laissé volontairement) ; `1ebb469c` lien Alphashot Pro G2 repointé |

## Trafic (Google Search Console)

- Famille : **251 clics sur 365 jours**.
- FR : 70 clics sur 365 jours, dont 41 sur d'anciennes URL ; 314 impressions sur 90 jours ; position moyenne 14,0.
- EN : 181 clics sur 365 jours ; 1 353 impressions sur 90 jours ; position moyenne 8,0.
- Requêtes EN de marque : « packshot creator » (1 467 impressions, position 1,7), « packshot creator software download » (12 clics, 139 impressions, position 1,7), « packshotcreator », « packshot-creator », « ortery », « ortery software », « packshot replacement ». La page EN est la porte d'entrée des anciens clients ; une vingtaine d'anciennes URL d'aide et de logiciel y sont redirigées par le Worker (14 vers l'EN, 5 vers le FR).
- Requêtes FR : « packshot creator » (2 clics, position 4,8), « packshotcreator » (position 20,6), « packshot creator software download ».

## Pull requests

- **Aucune PR ouverte ne modifie cette famille.**
- Article natif voisin à ne pas contredire : « Migrer un ancien studio PackshotCreator vers Orbitvu et son IA » (`content/blog/fr/migrer-ancien-packshotcreator.json`, EN `migrate-legacy-packshotcreator-studio`, de-ch `altes-packshotcreator-studio-migrieren`, Sébastien, 25/09/2026). Il renvoie vers cette page (FR et de-ch vers le FR, EN vers l'EN) pour « logiciel perdu, ou refusé par Windows 11 ». La **PR #77**, non fusionnée, ne le modifie que sur le paragraphe AI Act (marquage lisible par machine, `5357bfb2`) : aucun recouvrement avec ce dossier. Lu sur `main` et sur `pr/77`, non modifié.
- Cohérence vérifiée avec ce voisin : fin du support au 31/12/2024 ; versions livrées entre 2003 et 2020 sous Windows XP, 7 ou 10 et en général pas sous Windows 11 ; Ortery suivi depuis Rotterdam ; 74 sources lumineuses sur l'Alphashot Pro G2 ; Orbitvu Station sous Windows 10 et 11 et macOS ; diagnostic gratuit et reprise ; production sans interruption. **Un écart** : la FAQ 5 laisse entendre une formation comprise dans l'offre de reprise, le voisin la dit facturée séparément (03, FR-46 ; 06-15). La proposition ne contredit plus le voisin.

## Origine linguistique

**FR → EN, preuve interne** (revue, vérifiée contre `01-TEXTE_ACTUEL.md`). Le corps EN porte des calques du FR qui n'ont de sens qu'à partir de lui :

- « instant disposal of funds without manual manipulation » ← « élimination instantanée des fonds sans manipulation manuelle » (« fonds » au sens d'arrière-plans lu comme « fonds » financiers) ;
- « relocation » ← « réinstallation » ;
- « Automaton Clipping, Naming and Exporting » ← « Automatiser le détourage, le nommage et l'export » ;
- « your Only Interlocutor For: » ← « votre seul interlocuteur pour : » ;
- « or impossibility of Reinstall the system » ← « ou impossibilité de réinstaller le système » ;
- « Also to read: » et « To read: » ← « À lire aussi : » et « À lire : » ; « Schedule a demo Orbitvu » ← « Planifiez une démonstration Orbitvu » ;
- espaces avant deux-points à la française conservées dans le HTML EN (« Extensive compatibility : full support »).

La FAQ EN, idiomatique et plus développée que le FR (« fully integrated », « and productivity », « fully compatible »), semble rédigée ou adaptée à part : sa direction n'est pas établie [inférence de la revue].

## Verdict par langue

| Langue | Qualité (revue) | Verdict du dossier |
|---|---|---|
| FR | B | **Retouches et arbitrages factuels.** Français natif et utile ; 47 anomalies, dont 9 majeures : marqueurs « en 2025 », « distributeur exclusif » (D6), contradiction corps/FAQ sur Windows 11, affirmation défavorable à Ortery, « 74 lampes » généralisées, gain « trois à cinq » non sourcé, offre de reprise en écart avec l'article « Migrer ». |
| EN | D | **Retraduction complète, corps et FAQ.** Corps traduit automatiquement et non relu (contresens « funds », « relocation », « Automaton », phrases agrammaticales, Title Case aléatoire) ; FAQ idiomatique mais qui ajoute ou renforce des claims. 55 anomalies, dont 14 majeures. |
| de-ch | — | Sans objet (pas de version). |

## Résumé des décisions proposées

1. **FR** : texte corrigé intégral (`04-PROPOSITION_FR.md`), même structure ; corrections de langue, de typographie et d'artefacts Webflow ; les faits sont conservés ou formulés plus prudemment, jamais renforcés.
2. **Marqueurs datés** : « en 2025 » retiré (chapeau, FAQ 4) ; dateModified à renseigner à la publication.
3. **Ortery** : « distributeur exclusif » ramené à « distributeur » (D6, à confirmer) ; compatibilité Windows 11 restreinte aux anciennes versions dans le corps, FAQ 1 ouverte par « Cela dépend de la version » ; « rarement possible » remplacé par les conditions de la FAQ 2 ; coordonnées conservées, graphie corrigée, non vérifiées.
4. **Orbitvu** : « 74 lampes » rattachées à l'Alphashot Pro G2 ; promesses de compatibilité conservées sans renforcement ; « facteur de trois à cinq » atténué en « peut être divisé » ; offre de reprise conservée, accompagnement détaché de son contenu.
5. **EN** : retraduction intégrale depuis le FR corrigé (`04-PROPOSITION_EN.md`), en anglais américain, sans « fully compatible » ni autres ajouts, en gardant « PackshotCreator software », « Ortery software » et « download ».
6. **Métadonnées** (`05`) : slugs conservés ; metaTitle FR 54 et EN 56 caractères ; descriptions FR 149 et EN 145 caractères, sans la promesse de « résoudre » les problèmes Windows 11 ; h1 EN « Recover… » ; alt de l'image du corps décrit d'après l'image réelle (étiquette d'un Photosimile 200 d'Ortery Technologies).
7. **Validation** (`06`) : 23 points, dont 6 en validation explicite de Sébastien (engagements vis-à-vis d'Ortery et offre commerciale) ; signalement du chantier C13 noté clos alors que la coquille est toujours en ligne.

## Fichiers du dossier

- `01-TEXTE_ACTUEL.md`, `02-ORIGINAL_RETROUVE.md` : entrées, non modifiées.
- `03-ANOMALIES_ANNOTEES.md` : 102 anomalies (FR 47, EN 55).
- `04-PROPOSITION_FR.md`, `04-PROPOSITION_EN.md` : textes intégraux proposés.
- `05-METADONNEES_PROPOSEES.md` : métadonnées, alt, analyse des slugs.
- `06-VALIDATION_HUMAINE.md` : 23 points à trancher.
