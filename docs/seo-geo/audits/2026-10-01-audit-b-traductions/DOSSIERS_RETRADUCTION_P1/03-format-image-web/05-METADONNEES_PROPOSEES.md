# Métadonnées proposées — famille 67dd331edc2f76e4765a968b

Valeurs actuelles relevées dans les JSON sur `main` `17fc0b3` (01/10/2026). Comptes en caractères Unicode, espaces comprises (espaces insécables du français comptées pour un caractère). Le site sert `metaTitle` tel quel dans `<title>` (aucun gabarit de suffixe : `app/[lang]/blog/[slug]/page.tsx`, `generateMetadata`), et l'image principale reçoit `alt = h1` (même fichier, `alt={title}` avec `title = article.h1 || article.title`).

Requêtes GSC à préserver (365 jours au 28/09/2026, `GSC_REQUETES_P1.md` ; clics / impressions / position) :
- **FR** : image web 0/562/6,8 ; format web 1/486/8,4 ; format image web 0/441/6,1 ; format d'image 0/383/11,7 ; format image 0/248/11,8 ; les formats d images 0/147/15,7 ; formats d'image numérique 0/103/32,7.
- **EN** : best image format for web 0/572/19,8 ; web image format 0/429/9,2 ; best image format for web pages 0/425/38,6 ; image files for web 0/357/48,4 ; best photo format for web 0/342/27,9 ; web picture format 0/210/9,5 ; best image format 0/208/20,0.
- **de-ch** : bildformate für websites 0/84/13,9 ; web format 0/45/7,0 ; kann webp transparenz 0/43/10,0 ; webformat 0/38/4,6 ; webp bildformat 0/37/16,9 ; webp format 0/35/20,9 ; was ist webp 0/20/24,7.

---

## FR — /fr/blog/quel-format-d-image-pour-le-web

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | JPEG, PNG, RAW, WebP : Quel format d'image pour le web ? | JPEG, PNG, RAW, WebP : quel format d’image pour le web ? | Minuscule après deux-points (FR-05), apostrophe typographique. Garde « format d’image pour le web », qui porte « format image web » (position 6,1) et « format d'image » (11,7). |
| `h1` | identique au `title` | identique au `title` proposé | Idem. Option non retenue : ajouter AVIF au H1 (06, point 12). |
| `metaTitle` | Quel format d'image pour le web : JPEG, WebP, AVIF ? (52 car.) | Quel format d’image pour le web : JPEG, PNG, WebP, AVIF ? (**57 car.**) | Ajoute PNG, traité dans le corps et lié à la transparence ; tête de requête inchangée (« format d’image pour le web »), donc pas de risque sur « format image web » et « format web ». |
| `description` | JPEG, WebP ou AVIF pour vos photos produits ? Comparatif complet : poids, qualité, compatibilité navigateurs et impact sur vos ventes en ligne. (143 car.) | JPEG, PNG, WebP ou AVIF pour vos photos produits ? Poids, qualité, transparence, compatibilité navigateurs : quel format d’image choisir pour le web. (**149 car.**) | Retire deux promesses non tenues par le corps (« Comparatif complet », « impact sur vos ventes en ligne » : FR-07, 06 point 11) ; ajoute PNG et « transparence » ; reprend « format d’image » et « web ». |
| `author` | Sébastien Jourdan | inchangé | Choix de Sébastien (commit `586bf083`) ; l'auteur d'origine est crédité dans l'encart (06, point 1). |
| `date` | 2024-02-08T00:00:00.000Z | inchangé | Question d'historique ouverte (FR-08 ; 06, point 15). |
| `dateModified` | (vide) | 2026-05-07T00:00:00.000Z, ou date de mise en ligne de la version corrigée | Déclare dans le JSON-LD la mise à jour affichée dans l'encart (FR-09). Si la date de mise en ligne est retenue, la ligne de crédit « mis à jour le 7 mai 2026 » doit suivre (06, point 16). |
| `category` | E-commerce | inchangée | Conforme au sujet. |
| `readingTime` | 6 | inchangé | Volume de texte quasi inchangé. |
| `slug` | quel-format-d-image-pour-le-web | **conservé** | Aucun défaut. |

### Images FR

| Ordre | `src` | `alt` actuel | `alt` proposé | Légende |
|---|---|---|---|---|
| Principale | `/images/blog/67dd2ff25622e5086d8a6d85.avif` | = `h1` (généré) | = `h1` proposé (généré, rien à saisir) | aucune |
| 1 (RAW) | `/images/blog/67dbae6e74e3ee07a6f4fd76.avif` | format d'image RAW | Développement d’un fichier au format RAW : photo d’un pick-up Chevrolet bleu et panneau de réglages du logiciel | aucune |
| 2 (JPEG) | `/images/blog/67dbae6e74e3ee07a6f4fd79.avif` | JPEG compression Example | Exemple de compression JPEG : deux versions côte à côte de la même photo d’un oiseau perché sur une branche | **inchangée** (seule l’espace avant le deux-points devient insécable) : « Crédit : [JJ Harrison](https://commons.wikimedia.org/wiki/File:JPEG_compression_Example.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) » |
| 3 (schéma) | `/images/blog/67dd321935817184385715d4.avif` | `__wf_reserved_inherit` | Schéma d’un flux de production automatisé : scan du code-barres, prise de vue, suppression ou remplacement du fond, recadrage, alignement, mise à l’échelle, puis enregistrement ou publication en ligne | aucune |

Les textes alternatifs ont été rédigés d'après les images elles-mêmes (converties pour examen, sans modification des fichiers du dépôt). Ce que l'image ne dit pas n'est pas affirmé : l'alt 2 ne dit pas quelle moitié est la plus compressée, l'alt 3 n'attribue pas le schéma à Orbitvu (06, point 20).

---

## EN — /en/blog/best-image-format-for-the-web

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | JPEG, PNG, RAW, WebP: What image format for the web? | JPEG, PNG, RAW, WebP: What's the best image format for the web? | Contient la requête principale « best image format for web » (572 impressions, position 19,8) et « best image format », déjà présentes dans le slug ; question complète (EN-04 ; 06, point 14). Majuscule après deux-points normale en anglais devant une question directe. |
| `h1` | identique au `title` | identique au `title` proposé | Idem. |
| `metaTitle` | Web image formats: the guide to product photography (51 car.) | Best image format for the web: JPEG, PNG, WebP or AVIF? (**55 car.**) | L'actuel est traduit de l'ancien metaTitle FR, sans rapport avec le H1 (EN-05). La proposition ouvre sur la requête principale et suit le metaTitle FR. « web image format » (position 9,2) reste porté par le H2 « The most widely used web image formats ». |
| `description` | Discover the best image formats (JPEG, WebP, AVIF...) for product, commercial and e-commerce photography. Optimize quality, weight and SEO. (139 car.) | JPEG, PNG, WebP or AVIF for your product photos? File size, quality, transparency and browser support: how to choose the best image format for the web. (**151 car.**) | Traduite de la description FR proposée ; « weight » remplacé par « file size » ; reprend « best image format for the web ». |
| `author` | PackshotCreator | Sébastien Jourdan | Alignement sur le FR et la de-ch ; l'encart ajouté crédite Laurent Wainberg comme auteur d'origine. Variante : « Laurent Wainberg » (valeur importée de Webflow). Décision : 06, point 2. |
| `date` | 2024-02-08T00:00:00.000Z | inchangé | 06, point 15. |
| `dateModified` | (vide) | même valeur que le FR | 06, point 16. |
| `category` | E-commerce | inchangée | — |
| `readingTime` | 6 | inchangé | Après retrait du bloc Orbitvu (environ 420 mots), l'EN a le volume du FR, dont la valeur est 6. |
| `slug` | best-image-format-for-the-web | **conservé** | Aucun défaut ; contient déjà la requête principale. |

### Images EN

Fichiers différents de nom mais identiques au FR (empreintes MD5 égales).

| Ordre | `src` | `alt` actuel | `alt` proposé | Légende |
|---|---|---|---|---|
| Principale | `/images/blog/67dedf2faf5ef558512ef862.avif` | = `h1` (généré) | = `h1` proposé (généré) | aucune |
| 1 (RAW) | `/images/blog/67dedf2eaf5ef558512ef84f.avif` | format d'image RAW (en français) | Processing a RAW file: photo of a blue Chevrolet pickup truck with the editing software's adjustment panel | aucune |
| 2 (JPEG) | `/images/blog/67dedf2eaf5ef558512ef852.avif` | JPEG compression Example | JPEG compression example: two side-by-side versions of the same photo of a bird perched on a branch | **inchangée** : « Credit: [JJ Harrison](https://commons.wikimedia.org/wiki/File:JPEG_compression_Example.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) » |
| 3 (schéma) | `/images/blog/67dbae6f3caa81895e35e498.avif` | `__wf_reserved_inherit` | Diagram of an automated production workflow: barcode scan, capture, background removal or replacement, crop, alignment, scaling, then saving or publishing online | aucune |

---

## DE-CH — /de-ch/blog/welches-bildformat-ist-das-beste-fur-das-web

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | JPEG, PNG, RAW, WebP: Welches Bildformat ist das beste für das Web? | inchangé | Correct et idiomatique ; porte « Bildformat » et « Web » ; même formulation que l'ancienne URL qui reçoit le backlink. |
| `h1` | identique au `title` | inchangé | Idem. |
| `metaTitle` | Welches Bildformat für das Web: JPEG, WebP, AVIF? (49 car.) | Welches Bildformat für das Web: JPEG, PNG, WebP, AVIF? (**54 car.**) | Suit le FR : ajoute PNG (DE-03). |
| `description` | JPEG, WebP oder AVIF für Ihre Produktfotos? Vollständiger Vergleich: Dateigrösse, Qualität, Browser-Kompatibilität und Auswirkung auf Ihre Online-Verkäufe. (155 car.) | JPEG, PNG, WebP oder AVIF für Ihre Produktfotos? Dateigrösse, Qualität, Transparenz, Browser-Kompatibilität: das richtige Bildformat für Websites wählen. (**153 car.**) | Retire « Vollständiger Vergleich » et « Auswirkung auf Ihre Online-Verkäufe » (DE-04) ; ajoute « Transparenz » (requête « kann webp transparenz », position 10,0) et « Bildformat für Websites » (requête « bildformate für websites », position 13,9). |
| `author` | Sébastien Jourdan | inchangé | Comme le FR. |
| `date` | 2024-02-08T00:00:00.000Z | inchangé | 06, point 15. |
| `dateModified` | (vide) | même valeur que le FR | 06, point 16. |
| `category` | E-commerce | inchangée | — |
| `readingTime` | 6 | inchangé | — |
| `slug` | welches-bildformat-ist-das-beste-fur-das-web | **conservé** | Voir l'analyse ci-dessous. |

Intertitre modifié dans le corps pour le SEO (hors métadonnées, signalé ici pour mémoire) : H2 « Die meistgenutzten Bildformate für das Web » → « Die meistgenutzten Bildformate für Websites » (DE-09).

### Images de-ch

| Ordre | `src` | `alt` actuel | `alt` proposé | Légende |
|---|---|---|---|---|
| Principale | `/images/blog/67dd2ff25622e5086d8a6d85.avif` | = `h1` (généré) | inchangé (`h1` inchangé) | aucune |
| 1 (RAW) | `/images/blog/67dbae6e74e3ee07a6f4fd76.avif` | Bildformat RAW | Bearbeitung einer Datei im RAW-Format: Foto eines blauen Chevrolet-Pick-ups mit dem Einstellungsfenster der Software | aucune |
| 2 (JPEG) | `/images/blog/67dbae6e74e3ee07a6f4fd79.avif` | Beispiel JPEG-Komprimierung | Beispiel für JPEG-Komprimierung: zwei Versionen desselben Fotos eines Vogels auf einem Ast, nebeneinander | « Credit: … » → « Bild: [JJ Harrison](https://commons.wikimedia.org/wiki/File:JPEG_compression_Example.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) » (mêmes liens, même licence) |
| 3 (schéma) | `/images/blog/67dd321935817184385715d4.avif` | `__wf_reserved_inherit` | Schema eines automatisierten Produktionsablaufs: Barcode scannen, Aufnahme, Hintergrund entfernen oder ersetzen, Zuschneiden, Ausrichten, Skalieren, danach Speichern oder Online-Veröffentlichung | aucune |

### Analyse du slug de-ch (aucun changement proposé)

- **Défaut** : « für » translittéré « fur » au lieu de « fuer ». Purement cosmétique : Google lit l'URL sans difficulté, et l'utilisateur voit le titre, pas le slug.
- **Ce qui en dépend** :
  - le seul backlink externe de la famille (1 domaine, AS 64, lien suivi) vise l'ancienne URL `/de/blog/welches-bildformat-ist-das-beste-fur-das-web`, redirigée en 301 vers le slug actuel par le Worker (`cloudflare-worker/src/index.js`, table `DE_CH_MAP`, l. 781) ; 43 des 48 clics de-ch sur 365 jours sont encore enregistrés sur cette ancienne URL ;
  - `content/blog/alternates.json` (l. 72-76) : correspondance FR / EN / de-ch qui alimente le sélecteur de langue et les `hreflang` ;
  - `GONE_PATHS` du Worker contient `/blog/welches-bildformat-ist-das-beste-fur-das-web` (variante sans `/de/`, servie en 410) : non concernée par un changement de slug, mais à ne pas confondre.
- **Si on le changeait** : nouveau 301 de l'ancien slug de-ch vers le nouveau (Worker ou `next.config.ts`) ; mise à jour de `DE_CH_MAP` pour que `/de/blog/…` pointe directement vers le nouveau slug (sinon chaîne de deux redirections sur l'URL qui porte le backlink) ; resynchronisation préalable du Worker de production (R5, `05-INFRA.md`) ; mise à jour d'`alternates.json`. Perte temporaire des signaux accumulés sur l'URL actuelle, pour un gain nul.
- **Recommandation** : **conserver le slug**, comme le demande la consigne.
- **Dépendance relevée en passant (R8)** : `e2e/redirections.spec.ts` (l. 126) attend `/de/blog/welches-bildformat-ist-das-beste-fur-das-web` → `/en/blog/best-image-format-for-the-web`, alors que le Worker du dépôt redirige vers la version de-ch. Le test est en retard sur le Worker ; hors périmètre de ce dossier, signalé dans 06, point 21.

### Slugs FR et EN

Aucun défaut : conservés. Aucune redirection ni modification d'`alternates.json` n'est nécessaire.
