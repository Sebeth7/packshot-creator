# Fiche — famille 67dd331edc2f76e4765a968b « Quel format d'image pour le web »

Dossier de retraduction P1, audit B du 01/10/2026. Lecture seule du dépôt ; état de référence : `main` `17fc0b3` (01/10/2026).

## Identité

| | FR | EN | de-ch |
|---|---|---|---|
| URL | `/fr/blog/quel-format-d-image-pour-le-web` | `/en/blog/best-image-format-for-the-web` | `/de-ch/blog/welches-bildformat-ist-das-beste-fur-das-web` |
| Fichier | `content/blog/fr/quel-format-d-image-pour-le-web.json` | `content/blog/en/best-image-format-for-the-web.json` | `content/blog/de-ch/welches-bildformat-ist-das-beste-fur-das-web.json` |
| Origine dans le dépôt | import Webflow `56d4bc32` (18/04/2026) | import Webflow `56d4bc32` | création `6a1f2f39` (27/06/2026) |
| Dernière réécriture | `586bf083` (07/05/2026, Sébastien) puis `8ae45f63` (12/06/2026) | jamais réalignée sur le FR | `1ebb469c` (07/07/2026, maillage) |
| Auteur (`author`) | Sébastien Jourdan | PackshotCreator | Sébastien Jourdan |
| Date affichée | 08/02/2024 ; `dateModified` vide | idem | idem |

- **Sujet** : choix du format d'image pour le web et l'e-commerce (RAW, JPEG, PNG, WebP, AVIF) et prise en charge de ces formats par les studios et le logiciel Orbitvu.
- **Correspondance des langues** : `content/blog/alternates.json`, l. 72-76.
- **Redirections du Worker vers la famille** (`cloudflare-worker/src/index.js`) : `/quel-format-d-image-pour-le-web` → FR ; `/de/blog/welches-bildformat-ist-das-beste-fur-das-web` → de-ch ; `/es/blog/que-formato-para-wweb` et `/best-image-format-for-the-web` → EN ; croisements `/en/blog/quel-format-…` et `/fr/blog/best-image-format-…` corrigés.
- **PR concernée** : aucune PR ouverte ne modifie ces trois fichiers (information fournie par la consigne, non revérifiée ici faute d'accès web).

## Trafic (Search Console, fourni par la consigne)

| | Clics 365 j | Impressions 90 j | Position moyenne 90 j | Remarque |
|---|---|---|---|---|
| **Famille** | **605** | — | — | — |
| FR | 490 | 9 100 | 9,0 | dont 419 clics sur l'ancienne URL Webflow |
| EN | 67 | 6 203 | 13,5 | requête principale « best image format for web » en position 19,8 |
| de-ch | 48 | 3 157 | 9,3 | dont 43 clics sur l'ancienne URL `/de/blog/…` |

**Backlink** : 1 domaine (AS 64, lien suivi) vers l'ancienne URL `/de/blog/welches-bildformat-ist-das-beste-fur-das-web`, redirigée en 301 vers la version de-ch. **Le slug de-ch ne doit pas bouger** (analyse dans 05).

## Origine linguistique et preuve

- **FR = langue d'origine de la famille ; EN traduit du FR (preuve interne, reprise de la revue).** L'EN garde des déterminants français (« Les Orbitvu Studios capture the images », « Les Orbitvu Studios are equipped », « Les regular software updates »), rend « Il est léger » par « He is slight », le possessif « sa » par « his » (« thanks to his lossless compression »), « et de la » par « And of the », « images détourées » par « cropped images », « référencement naturel » par « natural referencing (SEO) » ; la version importée rendait « À Levallois-Perret » par « TO Levallois-Perret ». L'EN a été traduit d'une version FR **antérieure** au 07/05/2026 : il garde le bloc Orbitvu et l'ancien metaTitle FR.
- **de-ch traduit du FR actuel, après le 12/06/2026 (preuve interne).** Même structure que le FR réécrit (sans bloc Orbitvu, avec l'encart auteur), crédit « PackshotCreator » hérité du commit `8ae45f63` du 12/06/2026, calques du français (« das natürliche Ranking (SEO) », « Direktor », « unterstützt … die Bewahrung », « befindet sich in der Verbreitung », « Credit: »). Le commit de création `6a1f2f39` ne documente pas la source : **SOURCE ORIGINALE NON ÉTABLIE** au sens documentaire (`02-ORIGINAL_RETROUVE.md`), mais la filiation FR → de-ch est établie par le texte.
- **Datation** : le texte servi semble dater de mars 2025 (item Webflow créé le 21/03/2025, images des 20 et 21/03/2025, FAQ « en 2025 »), pour une date affichée au 08/02/2024. Point ouvert (06, point 15).

## Verdict par langue

| Langue | Qualité (revue) | Verdict de ce dossier | Anomalies (03) |
|---|---|---|---|
| FR | B | **Retouches.** Texte natif et clair ; anglicismes (« supporter », « fallback », « édition »), une phrase confuse, une inexactitude technique sur le RAW, un alt Webflow, un lien erroné, le nom de l'auteur d'origine remplacé, des métadonnées à aligner. Base de la retraduction. | 38 (7 majeures) |
| EN | D | **Retraduction complète depuis le FR proposé.** Traduction automatique jamais réalignée : 4 passages bloquants (déterminants français, « for maximize »), bloc Orbitvu supprimé du FR toujours présent, pas d'encart auteur, metaTitle et description de l'ancienne version. | 54 (4 bloquantes, 18 majeures) |
| de-ch | B | **Retouches.** Allemand suisse naturel, sans Eszett ; quelques calques, défauts hérités du FR (alt, lien, crédit, « 2025 »). | 31 (6 majeures) |

## Résumé des décisions proposées

1. **FR** : corrections de langue et de typographie ; correction certaine d'un fait technique (« RAW sans compression ») ; textes alternatifs réels pour les trois images ; crédit « Laurent Wainberg » rétabli dans l'encart ; FAQ « en 2025 » → « aujourd'hui » ; claim SEO du WebP formulé plus prudemment ; claims chiffrés et fonctions Orbitvu conservés sans renforcement et listés pour validation.
2. **EN** : retraduction intégrale depuis `04-PROPOSITION_FR.md` ; bloc promotionnel Orbitvu (environ 420 mots) non repris ; encart « About the author » ajouté ; `author` aligné sur « Sébastien Jourdan » ; H1 et metaTitle recentrés sur « best image format for the web ».
3. **de-ch** : adaptation depuis le FR proposé ; mêmes corrections de fond ; H2 « Bildformate für Websites » ; légende « Bild: » au lieu de « Credit: » ; **slug conservé**.
4. **Métadonnées** : metaTitle avec PNG dans les trois langues (57, 55 et 54 caractères) ; descriptions sans « comparatif complet » ni « impact sur vos ventes » (149, 151 et 153 caractères) ; `dateModified` à renseigner.
5. **Non modifié, à trancher** (06) : version d'Orbitvu Station (24.1.0 ou 24.2.0), cible du lien « Cloudinary », date de publication, fonctions produit, diffusion de l'image principale marquée « For internal use only! ».

## Fichiers du dossier

- `00-FICHE.md` — cette fiche.
- `01-TEXTE_ACTUEL.md`, `02-ORIGINAL_RETROUVE.md` — entrées, non modifiées.
- `03-ANOMALIES_ANNOTEES.md` — 123 anomalies (FR 38, EN 54, de-ch 31).
- `04-PROPOSITION_FR.md`, `04-PROPOSITION_EN.md`, `04-PROPOSITION_DE-CH.md` — textes intégraux proposés, non publiés.
- `05-METADONNEES_PROPOSEES.md` — métadonnées, textes alternatifs, légendes, analyse des slugs.
- `06-VALIDATION_HUMAINE.md` — 22 points à trancher.
