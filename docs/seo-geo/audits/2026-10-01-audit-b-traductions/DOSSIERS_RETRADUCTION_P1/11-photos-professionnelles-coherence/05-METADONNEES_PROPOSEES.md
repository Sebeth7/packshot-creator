# Métadonnées proposées — famille 67d1ac647fa7de7306d86cee

Les comptes de caractères incluent les espaces. Les valeurs FR proposées contiennent déjà les espaces insécables ; elles sont prêtes à copier dans le JSON.

Rappel du gabarit (`app/[lang]/blog/[slug]/page.tsx`) :
- `metaTitle` → `<title>` et `og:title` (l. 47) ;
- `h1` → H1 affiché, **texte alternatif de l'image principale**, dernier maillon du fil d'Ariane, `headline` du JSON-LD `Article` (l. 127, vérifié dans le HTML servi) ;
- `title` → cartes de la page blog et des articles liés ;
- `description` → meta description, `og:description`, description du JSON-LD ;
- `faqs` → bloc FAQ et JSON-LD `FAQPage`.

**Slugs : conservés** dans les deux langues (analyse en fin de fichier).

---

## FR — `/fr/blog/comment-avoir-des-photos-professionnelles-guide-packshot-produit`

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `slug` | `comment-avoir-des-photos-professionnelles-guide-packshot-produit` | **conservé** | Voir l'analyse en fin de fichier |
| `title` | Le guide complet de la photographie packshot, 5 : comment avoir des photos plus professionnelles et homogènes (109) | **conservé** | Français correct ; même gabarit que les volets 2, 3 et 4 (« Le guide complet de la photographie packshot, N : … »), ce qui garde la série lisible sur la page blog. Annonce déjà les deux notions (professionnelles, homogènes) |
| `h1` | Le guide complet de la photographie packshot, 5 (47) | `Guide de la photographie packshot, 5 : des photos produits professionnelles et homogènes` (88) | Le H1 tronqué n'annonce pas le sujet (F01). La proposition garde le repère de série, cohérent avec le texte incrusté dans l'image principale (« Le guide complet de la photographie packshot 5 »), dont ce H1 devient l'alt, et reprend les mots du slug (« photos professionnelles ») et le sujet réel (« homogènes ») |
| `metaTitle` | Photos professionnelles de produits : Guide Photographie Packshot (65) | `Photographie de produits : obtenir des photos homogènes` (55) | Supprime le Title Case (F02) et passe sous 60 caractères. Place en tête la première requête de la page, « photographie de produits » (819 impressions, position 14,5), qui couvre aussi « photographie de produit » (531, 15,9). « Homogènes » distingue l'article des autres volets. Variante si Sébastien veut garder « professionnelles » : `Photographie de produits : des photos pro et homogènes` (54), registre plus familier |
| `description` | Découvrez comment prendre des photos professionnelles de vos produits dans ce 5e article de notre guide de la photographie packshot. (132) | `Shooting photo produit : comment obtenir des photos homogènes et professionnelles, puis choisir entre prestataire, studio traditionnel ou automatisé.` (149) | Couvre les deux moitiés de l'article (F03). Ouvre sur la deuxième requête, « shooting photo produit » (644 impressions, position 21,1 ; « shooting produit » 424). Pas de verbe d'appel générique. N'emploie pas « studio photo produit », requête mieux tenue par le volet 2 (556 impressions, position 8,9 contre 17,8 ici) |
| `category` | E-commerce | **conservée** | Catégorie des quatre autres volets de la série |
| `author` | PackshotCreator | **conservé** | Import Webflow : « Laurent Wainberg », remplacé délibérément par `8ae45f63` (12/06/2026, « cohérence E-E-A-T avec le schema Organization »). Ce n'est pas un remplacement erroné dans le corps : décision Laurent + Sébastien (06) |
| `date` / `dateModified` | 2024-03-13 / absent | `date` conservée ; `dateModified` = date de mise en ligne de la version corrigée | Le gabarit transmet `dateModified` au JSON-LD (l. 290) ; signale aux moteurs une révision réelle du texte |
| `readingTime` | 8 | **conservé** | Longueur du texte quasi inchangée |
| Légendes | aucune (figures sans `figcaption`) | aucune | Aucune légende n'existe ; on n'en ajoute pas |

### Textes alternatifs FR (ordre du texte)

Images examinées le 01/10/2026 (conversion locale des `.avif` du dépôt).

| # | `src` | Alt actuel | Alt proposé | Justification |
|---|---|---|---|---|
| 0 | `/images/blog/67dbae7489928f8e5c79753c.avif` (image principale) | = H1 (gabarit) | = H1 proposé | Image : appareil photo sur trépied, écran de visée avec grille, texte incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 5 ». Le H1 proposé reprend ce texte |
| 1 | `/images/blog/67dbae7389928f8e5c7974b2.avif` | Série photographique de chaussure avec studio Orbitvu | `Catalogue de chaussures photographiées sous des angles différents, sur des fonds tantôt gris clair, tantôt gris foncé : exemple de série de photos non homogène` | Contre-exemple de l'article ; l'alt actuel y associait Orbitvu (F09) |
| 2 | `/images/blog/67d1a9b8f6428d7e0d19c7b5.avif` | Logiciel aide série photographique chaussure Orbitvu Station␣ | `Logiciel Orbitvu Station : grille de cadrage et image fantôme superposée pour placer chaque chaussure exactement au même endroit` | Décrit la fonction montrée, citée dans le texte (gabarit, grille, image fantôme) (F15) |
| 3 | `/images/blog/67d1a9b7f6428d7e0d19c75b.avif` | __wf_reserved_decorative | `Studio photo traditionnel avec fond blanc, boîtes à lumière sur pieds et projecteurs suspendus` | Illustre la solution 2 ; marqueur Webflow supprimé (F28) |
| 4 | `/images/blog/6787d343815aa433b695f1bd.avif` | Studio photo produit automatisé | `Utilisatrice pilotant un studio photo produit automatisé Orbitvu depuis un écran, pendant la prise de vue d’une montre` | Alt générique remplacé ; garde « studio photo produit » (F39). Le modèle, partiellement lisible sur la machine, n'est pas nommé |
| 5 | `/images/blog/67d1a9b8f6428d7e0d19c7b8.avif` | logiciel d'automatisation et d'édition Orbitvu Station | `Logiciel Orbitvu Station : réglages de retouche appliqués à une série de photos de baskets détourées` | « Édition » était un calque de « editing » (F42) |
| 6 | `/images/blog/67d1a9b8f6428d7e0d19c798.avif` | Fashion studio photo produit automatisée | `Fashion Studio d’Orbitvu, studio photo produit automatisé pour la mode, avec une personne photographiée en pied` | Accord et graphie du nom produit corrigés (F45) ; « Fashion Studio » et « Orbitvu » sont lisibles sur la machine |

---

## EN — `/en/blog/how-to-ensure-consistency-between-photos-packshot-photography-guide`

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `slug` | `how-to-ensure-consistency-between-photos-packshot-photography-guide` | **conservé** | Voir l'analyse en fin de fichier |
| `title` | The complete guide to packshot photography, 5: how to get more professional and consistent photos (97) | **conservé** | Anglais correct ; gabarit commun aux volets EN 3 et 4 ; contient « packshot photography » et « consistent » |
| `h1` | The complete guide to packshot photography, 5 (45) | `Packshot photography guide, 5: consistent, professional product photos` (70) | Annonce le sujet (E01) ; « packshot photography » en tête (2 493 impressions, position 23,7 ; « product packshot photography » 718) ; « consistent » rejoint le slug. Devient l'alt de l'image principale |
| `metaTitle` | Professional Product Photos: Packshot Photography Guide (55) | `Packshot photography: how to get consistent product photos` (58) | Requête principale en tête ; angle « consistent » qui distingue cet article du volet 1, lequel tient déjà « packshot photography » (5 644 impressions, position 10,0) ; casse de phrase, comme les autres volets EN (E02) |
| `description` | Learn how to take professional photos of your products in this 5th article in our packshot photography guide. (109) | `Packshot photography guide, part 5: keep your product photos consistent, then choose between an outside provider, a traditional studio or an automated one.` (155) | Couvre les deux moitiés de l'article (E03) |
| `category` | E-commerce | **conservée** | Identique au FR |
| `author` | PackshotCreator | **conservé** | Voir FR et 06 |
| `date` / `dateModified` | 2024-03-13 / absent | `dateModified` = date de mise en ligne | Comme en FR |
| `readingTime` | 8 | **conservé** | — |
| Légendes | aucune | aucune | — |

Intertitres EN adaptés pour les requêtes, sans écart de sens avec le FR : H2 « Which packshot photography solution is right for your needs? » (FR « Quelle solution choisir pour photographier vos produits en fonction de vos besoins ? ») ; H2 « Why choose an Orbitvu automated studio for packshot photography? » (le paragraphe suivant dit déjà « designed specifically for packshot photography » ; requêtes « packshot photography studio » 1 059 et « professional packshot photography studio » 332) ; H3 « Solution 2: set up a traditional photo studio and hire a freelance packshot photographer » (requête « packshot photographer », 622 impressions, position 9,2, seul clic de la liste).

### Textes alternatifs EN (ordre du texte)

| # | `src` | Alt actuel | Alt proposé |
|---|---|---|---|
| 0 | `/images/blog/67dbae7489928f8e5c79753c.avif` (image principale) | = H1 (gabarit) | = H1 proposé. L'image porte un texte en français (06) |
| 1 | `/images/blog/67dbae7389928f8e5c7974b2.avif` | Série photographique de chaussure avec studio Orbitvu | `Shoe catalog shot from different angles against light gray or dark gray backgrounds: an example of an inconsistent photo series` |
| 2 | `/images/blog/67d1a9b8f6428d7e0d19c7b5.avif` | Logiciel aide série photographique chaussure Orbitvu Station␣ | `Orbitvu Station software: framing grid and ghost image overlay used to place each shoe in exactly the same spot` |
| 3 | `/images/blog/67d1a9b7f6428d7e0d19c75b.avif` | __wf_reserved_decorative | `Traditional photo studio with a white backdrop, softboxes on stands and overhead lights` |
| 4 | `/images/blog/6787d343815aa433b695f1bd.avif` | Studio photo produit automatisé | `User operating an Orbitvu automated product photo studio from a control screen while a watch is being photographed` |
| 5 | `/images/blog/67d1a9b8f6428d7e0d19c7b8.avif` | logiciel d'automatisation et d'édition Orbitvu Station | `Orbitvu Station software: retouching adjustments applied to a series of cut-out sneaker photos` |
| 6 | `/images/blog/67d1a9b8f6428d7e0d19c798.avif` | Fashion studio photo produit automatisée | `Orbitvu Fashion Studio, an automated product photo studio for fashion, with a model photographed full length` |

---

## Graphies retenues

Orbitvu ; Orbitvu Station (en italique dans le lien du corps, comme dans l'actuel) ; Fashion Studio ; Bike Studio ; PackshotCreator (champ auteur uniquement). Alphashot et Shotflow n'apparaissent pas dans le texte (le libellé « ALPHASHOT XL v2 » n'est visible que dans une capture d'écran). Aucune graphie concurrente à trancher dans cette famille.

---

## Analyse des slugs : écart « photos professionnelles » / « consistency »

**Constat.** Les deux slugs ne disent pas la même chose : le FR met en avant des photos professionnelles (`comment-avoir-des-photos-professionnelles-guide-packshot-produit`), l'EN la cohérence entre les photos (`how-to-ensure-consistency-between-photos-packshot-photography-guide`). Le reste des métadonnées est pourtant parallèle : les deux `title` annoncent « professionnelles et homogènes » / « professional and consistent » ; les deux `metaTitle` et les deux descriptions ne parlent que de photos professionnelles. L'écart d'angle est donc **dans les slugs seulement**, et en EN il oppose le slug (« consistency ») au `<title>` servi (« Professional Product Photos »).

**Ce que dit le corps.** L'homogénéité est le moyen, des photos professionnelles le résultat : le premier H2 le dit (« Homogénéité et photographie packshot : le secret pour des photos professionnelles »). La seconde moitié de l'article (choix entre prestataire, studio traditionnel et studio automatisé) n'apparaît dans aucun des deux slugs. Les ancres des liens internes entrants retiennent toutes l'angle de la cohérence, en FR comme en EN : « l'importance de la cohérence entre les photos et la meilleure manière d'y parvenir » (volet 1 FR), « la notion d’homogénéité » (volet 4 FR), « the importance of consistency between photos » (volet 1 EN), « The concept of homogeneity » (volet 4 EN).

**Ce que dit la Search Console.** Aucune des requêtes principales ne porte sur « professionnelles » ni sur « consistency ». La page FR est vue sur des requêtes génériques (« photographie de produits », « shooting photo produit »), la page EN sur « packshot photography », « packshot photography studio » et « packshot photographer ». Les mots qui distinguent les deux slugs ne sont donc pas ce qui fait apparaître la page ; le sujet, le corps et les métadonnées le sont.

**Risque d'un changement de slug.**
- FR : 8 016 impressions sur 365 jours sur l'URL actuelle, plus 4 944 impressions et les 16 clics de l'année sur l'ancienne URL Webflow, déjà redirigée par le Worker. Un nouveau slug créerait une chaîne de redirections, sauf à réécrire les entrées du Worker.
- Redirection nécessaire : 301 de l'ancien slug vers le nouveau dans `next.config.ts`, **et** mise à jour des destinations du Worker (`cloudflare-worker/src/index.js`, l. 913 et 944 pour le FR ; l. 24, 981, 1133, 1264 et 1856 pour l'EN), après resynchronisation du Worker déployé (R5, `05-INFRA.md`).
- `content/blog/alternates.json`, l. 118-119, à mettre à jour, sous peine de casser en silence le sélecteur de langue et les hreflang (`01-RAYON-ACTION.md`).
- Liens internes à réécrire : trois articles FR (volets 1, 2 et 4), quatre articles EN (volets 1 à 4) et l'article de-ch du volet 1, qui pointe vers la version FR.

**Recommandation : conserver les deux slugs.** Ils sont corrects, dans la bonne langue, sans faute, et l'écart d'angle ne coûte rien de mesurable. On aligne plutôt, dans chaque langue, `h1`, `metaTitle` et `description` sur les deux notions (professionnelles + homogènes / consistent + professional), avec la première requête de chaque langue en tête. Aucune redirection, aucune modification d'`alternates.json`.

---

## Hors périmètre, à transmettre

- Le volet 3 EN (`product-showcase-how-to-packshot-photography-guide`) pointe vers **cet** article avec l'ancre « choose the media that best suits your needs (still photo, 360° animation, video) », qui annonce le volet 4 (`media-photography-complete-guide-to-packshot-photography-4`). Erreur de cible à corriger dans la famille du volet 3.
- Les H1 des volets 2, 3 et 4 sont tronqués de la même façon (« …, 2 », « …, 3 », « …, 4 ») ; le volet 1 a déjà été retitré. Harmonisation de la série : 06.
