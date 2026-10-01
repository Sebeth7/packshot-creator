# 05 — Métadonnées proposées — famille 67d154e9a53d05fd8c219b8c

Valeurs actuelles lues dans `content/blog/<langue>/<slug>.json` (`main` `17fc0b3`). Comptes en caractères Unicode, espaces comprises (une espace insécable compte pour un caractère). Le gabarit `app/[lang]/blog/[slug]/page.tsx` sert `metaTitle` (à défaut `title`) tel quel comme `<title>` et `og:title`, sans suffixe de marque ajouté ; le `h1` sert aussi d'`alt` à l'image principale.

Requêtes GSC à préserver (365 jours au 28/09/2026, `GSC_REQUETES_P1.md`) :

- FR : packshot (5 082 impressions, position 9,9) ; photographe packshot (1 865 ; 6,2) ; packshot produit (1 693 ; 10,1) ; photo packshot (1 329 ; 5,3) ; packshots (1 088 ; 14,3) ; pack shot (997 ; 15,6) ; packshot def (850 ; 5,3) ; packshot photo (473 ; 6,3).
- EN : packshot (23 903 ; 7,3) ; product packshot (11 726 ; 6,9) ; packshots (10 692 ; 11,3) ; pack shot (6 022 ; 8,1) ; packshot meaning (5 769 ; 3,8) ; packshot photography (5 644 ; 10,0) ; pack shots (2 597 ; 9,4) ; product packshot photography (2 511 ; 6,0).
- de-ch : volumes très faibles (packshot 30 impressions ; packshot fotostudio 23 ; packshot fotos 19 ; packshots 13 ; packshot fotograf 11 ; packshot fotografie 10 ; packshots definition 5).

Principe : « packshot » reste le premier mot de chaque `title`, `h1` et `metaTitle` (choix de `a8a3d3f6` et `37da2e28` pour viser le top 1-2) ; les `title` et `h1` actuels, cohérents avec le corps, sont conservés ; seuls les `metaTitle` (trop longs) et les `description` (millésime « 2026 ») changent.

---

## FR — `guide-photographie-packshot-pourquoi-faire-packshots`

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | Packshot : définition, techniques et conseils e-commerce (56) | **inchangé** (espace insécable avant « : ») | « packshot » en tête ; utilisé dans les listes du blog. |
| `h1` | Packshot : définition, types et bonnes pratiques pour l'e-commerce (66) | **inchangé** (espace insécable avant « : ») | Cohérent avec le corps (définition, types, caractéristiques). |
| `metaTitle` | Packshot : définition, techniques et conseils e-commerce — PackshotCreator (**74**) | Packshot : définition, types et conseils pour l'e-commerce (**58**) | Sous 60 caractères, plus de troncature ; « packshot » en tête ; « définition » couvre « packshot def » (position 5,3) ; « types » reprend le `h1`. La marque saute : Google affiche le nom du site à part. Variante avec marque, si Sébastien y tient : « Packshot : définition, types et conseils \| PackshotCreator » (58). |
| `description` | Qu'est-ce qu'un packshot ? Définition, caractéristiques, types et conseils pratiques pour réussir vos photos produit e-commerce. Guide complet 2026. (148) | Qu'est-ce qu'un packshot ? Définition, caractéristiques d'une bonne photo packshot, différences avec la photo lifestyle et conseils pour l'e-commerce. (**150**) | Retire le millésime (périmé au 01/01/2027) et la promesse « guide complet » démentie par « ce premier article » ; ajoute « photo packshot » (position 5,3) ; annonce le comparatif packshot / lifestyle traité dans le corps et en FAQ. |
| catégorie | E-commerce (`categoryId` 104a291d…) | **inchangée** | — |
| `author` | Sébastien Jourdan | **inchangé** | Choix de `0a65c654` ; la ligne de crédit est traitée au point 1 de `06`. |
| `dateModified` | 2026-05-02 | à mettre à la date de republication | Mise à jour réelle du texte. |

### Images (même ordre, même `src` ; aucune légende actuelle, aucune ajoutée)

`alt` rédigés après examen visuel des fichiers AVIF du dépôt le 01/10/2026 (conversion locale temporaire, supprimée). Les marques visibles sur les objets photographiés ne sont pas nommées.

| # | `src` | `alt` actuel | `alt` proposé |
|---|---|---|---|
| 1 | `/images/blog/67dbae71504f03ad3bf5ac89.avif` | __wf_reserved_inherit | Packshot d'un sac cabas gris sur fond blanc |
| 2 | `/images/blog/67d14eadad46b55ee8628ca4.avif` | photo détails produit photographie packshot | Packshot de bottines bleues à lacets avec trois agrandissements de détails : œillets et lacets, semelle surpiquée, coutures |
| 3 | `/images/blog/67dbae71504f03ad3bf5ac83.avif` | __wf_reserved_inherit | Mains positionnant une pièce métallique cylindrique sur une surface blanche, à l'aide de repères laser verts |
| 4 | `/images/blog/67d14eadad46b55ee8628cb6.avif` | photographie packshot sur un site e-commerce | Fiche produit e-commerce présentant le packshot d'une chaise haute pour enfant et les vignettes de ses autres vues |
| 5 | `/images/blog/67dbae71504f03ad3bf5ac90.avif` | Packshot multi vues d'un casque moto | Packshot multivue d'un casque de moto intégral, présenté sous cinq angles sur fond blanc |
| 6 | `/images/blog/67d14eadad46b55ee8628cbf.avif` | photo de chaussures en nature morte | Nature morte : deux baskets mises en scène en suspension sur fond gris clair |
| 7 | `/images/blog/67d14eadad46b55ee8628cdd.avif` | exemple d'une image lifestyle d'une montre | Photo lifestyle d'une montre portée au poignet, bracelet textile bleu et vert, avec chemise rayée et veste claire |
| 8 | `/images/blog/67dbae71504f03ad3bf5ac93.avif` | exemple de photo de montre pour e-commerce sur Google | Résultats Google pour la requête « montre homme » : annonces sponsorisées de montres présentées en packshot |
| 9 | `/images/blog/67d14eaead46b55ee8628d11.avif` | Exemple photographies packshot produits taille moyenne | Packshots sur fond blanc de trois produits de taille moyenne : valise jaune, guitare électrique et fauteuil de bureau |
| 10 | `/images/blog/67dbae71504f03ad3bf5ac9b.avif` | __wf_reserved_inherit | Embouts de vissage alignés : l'embout doré au centre est net, les autres sont flous |
| 11 | `/images/blog/67dbae71504f03ad3bf5ac98.avif` | __wf_reserved_inherit | Packshot de la roue avant d'un VTT sur fond blanc : pneu à crampons, rayons et disque de frein |
| principale | `/images/blog/67dbae71504f03ad3bf5accd.avif` | = `h1` (gabarit) | inchangé ; image à texte français incrusté « LE GUIDE COMPLET DE LA PHOTOGRAPHIE PACKSHOT 1 » : point 17 de `06` |

Observations : l'image 4 est une maquette de fiche produit à l'en-tête « ORBITVU.COM » (visuel de provenance probablement Orbitvu ; aucun crédit dans le texte actuel) ; l'image 10 illustre une faible profondeur de champ dans la section « La netteté avant tout » (point 21 de `06`).

---

## EN — `packshot-photography-guide-why-make-product-packshots`

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | Packshot — Definition, Techniques & E-commerce Best Practices (61) | **inchangé** | Title Case légitime en anglais ; « packshot » en tête. |
| `h1` | Packshot — Definition, Types & Best Practices for E-commerce (60) | **inchangé** | Cohérent avec le corps ; la position 7,3 sur « packshot » ne justifie pas de toucher au `h1`. |
| `metaTitle` | Packshot — Definition, Techniques & E-commerce Best Practices \| PackshotCreator (**79**) | Packshot: Meaning, Types & Product Photography Tips (**51**) | Sous 60 caractères ; « packshot » en tête ; « Meaning » reprend la requête « packshot meaning » (position 3,8, extrait optimisé visé par `37da2e28`) et l'intertitre « Packshot meaning & official terminology » ; « Product Photography » couvre « product packshot » / « product packshot photography ». Variante avec marque : « Packshot: Meaning, Types & Tips \| PackshotCreator » (49). |
| `description` | What is a packshot? Definition, types, characteristics and practical tips for professional product photography in e-commerce. Complete guide 2026. (146) | What is a packshot? Learn the meaning, types and key qualities of product packshot photography, and how it differs from lifestyle and still life shots. (**151**) | Retire le millésime ; place « packshot meaning » (sous la forme « the meaning ») et « product packshot photography » ; suit le FR proposé (définition, caractéristiques, comparatif lifestyle). |
| catégorie | E-commerce | **inchangée** | — |
| `author` | Sébastien Jourdan | **inchangé** | Point 1 de `06`. |
| `dateModified` | 2026-05-02 | à mettre à la date de republication | — |

### Images

| # | `src` | `alt` actuel | `alt` proposé |
|---|---|---|---|
| 1 | `…ac89.avif` | __wf_reserved_inherit | Packshot of a gray tote bag on a white background |
| 2 | `…628ca4.avif` | photo détails produit photographie packshot | Packshot of blue lace-up boots with three close-ups of details: eyelets and laces, stitched sole, seams |
| 3 | `…ac83.avif` | __wf_reserved_inherit | Hands positioning a cylindrical metal part on a white surface using green laser guides |
| 4 | `…628cb6.avif` | photographie packshot sur un site e-commerce | E-commerce product page showing a packshot of a child's high chair, with thumbnails of its other views |
| 5 | `…ac90.avif` | Packshot multi vues d'un casque moto | Multi-view packshot of a full-face motorcycle helmet shown from five angles on a white background |
| 6 | `…628cbf.avif` | photo de chaussures en nature morte | Still life: a pair of sneakers staged in midair on a light gray background |
| 7 | `…628cdd.avif` | exemple d'une image lifestyle d'une montre | Lifestyle photo of a watch worn on the wrist, with a blue and green fabric strap, a striped shirt and a light-colored jacket |
| 8 | `…ac93.avif` | exemple de photo de montre pour e-commerce sur Google | Google results for the query "montre homme" (men's watch): sponsored listings of watches shown as packshots |
| 9 | `…628d11.avif` | Exemple photographies packshot produits taille moyenne | White-background packshots of three medium-sized products: a yellow suitcase, an electric guitar and an office chair |
| 10 | `…ac9b.avif` | __wf_reserved_inherit | Row of screwdriver bits: the gold bit in the center is sharp, the others are blurred |
| 11 | `…ac98.avif` | __wf_reserved_inherit | Packshot of a mountain bike's front wheel on a white background: knobby tire, spokes and disc brake |
| principale | `…accd.avif` | = `h1` | inchangé ; texte français incrusté (point 17 de `06`) |

(`src` complets : identiques au tableau FR, préfixe `/images/blog/67…`.)

---

## DE-CH — `leitfaden-packshot-fotografie-warum-packshots-machen`

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | Packshot: Definition, Techniken und E-Commerce-Tipps (52) | **inchangé** | — |
| `h1` | Packshot: Definition, Arten und Best Practices für den E-Commerce (65) | **inchangé** | « Best Practices » : anglicisme courant en Suisse alémanique, acceptable. |
| `metaTitle` | Packshot: Definition, Techniken und E-Commerce-Tipps — PackshotCreator (**70**) | Packshot: Definition, Arten und Tipps für Produktfotos (**54**) | Sous 60 caractères ; aligné sur le `h1` (« Arten ») ; « Produktfotos » rejoint « packshot fotos ». Variante avec marque : « Packshot: Definition, Arten und Tipps \| PackshotCreator » (55). |
| `description` | Was ist ein Packshot? Definition, Merkmale, Arten und praktische Tipps für gelungene Produktfotos im E-Commerce. Vollständiger Leitfaden 2026. (142) | Was ist ein Packshot? Definition, Merkmale guter Packshot-Fotos, Unterschiede zu Lifestyle und Stillleben sowie praktische Tipps für den E-Commerce. (**148**) | Retire le millésime ; suit la description FR proposée ; « Packshot-Fotos » rejoint « packshot fotos » ; « Definition » couvre « packshots definition ». |
| catégorie | E-commerce | **inchangée** | — |
| `author` | Sébastien Jourdan | **inchangé** | Point 1 de `06`. |
| `dateModified` | 2026-05-02 | à mettre à la date de republication | — |

### Images

| # | `src` | `alt` actuel | `alt` proposé |
|---|---|---|---|
| 1 | `…ac89.avif` | __wf_reserved_inherit | Packshot einer grauen Henkeltasche vor weissem Hintergrund |
| 2 | `…628ca4.avif` | photo détails produit photographie packshot | Packshot blauer Schnürstiefel mit drei Detailvergrösserungen: Ösen und Schnürung, abgesteppte Sohle, Nähte |
| 3 | `…ac83.avif` | __wf_reserved_inherit | Hände positionieren ein zylindrisches Metallteil auf einer weissen Fläche, ausgerichtet an grünen Laserlinien |
| 4 | `…628cb6.avif` | photographie packshot sur un site e-commerce | E-Commerce-Produktseite mit dem Packshot eines Kinderhochstuhls und Miniaturansichten weiterer Perspektiven |
| 5 | `…ac90.avif` | Packshot multi vues d'un casque moto | Mehransichten-Packshot eines Integral-Motorradhelms aus fünf Blickwinkeln vor weissem Hintergrund |
| 6 | `…628cbf.avif` | photo de chaussures en nature morte | Stillleben: zwei Sneaker, schwebend inszeniert vor hellgrauem Hintergrund |
| 7 | `…628cdd.avif` | exemple d'une image lifestyle d'une montre | Lifestyle-Foto einer am Handgelenk getragenen Uhr mit blau-grünem Textilarmband, gestreiftem Hemd und heller Jacke |
| 8 | `…ac93.avif` | exemple de photo de montre pour e-commerce sur Google | Google-Ergebnisse für die Suchanfrage «montre homme» (Herrenuhr): gesponserte Anzeigen von Uhren als Packshots |
| 9 | `…628d11.avif` | Exemple photographies packshot produits taille moyenne | Packshots dreier mittelgrosser Produkte vor weissem Hintergrund: gelber Koffer, E-Gitarre und Bürostuhl |
| 10 | `…ac9b.avif` | __wf_reserved_inherit | Aufgereihte Schrauberbits: Das goldene Bit in der Mitte ist scharf, die übrigen sind unscharf |
| 11 | `…ac98.avif` | __wf_reserved_inherit | Packshot des Vorderrads eines Mountainbikes vor weissem Hintergrund: Stollenreifen, Speichen und Bremsscheibe |
| principale | `…accd.avif` | = `h1` | inchangé ; texte français incrusté (point 17 de `06`) |

---

## Slugs — conservés dans les trois langues

| Langue | Slug | Analyse |
|---|---|---|
| FR | `guide-photographie-packshot-pourquoi-faire-packshots` | Correct, en français, sans faute. Il reflète l'ancien titre de série (« pourquoi faire des packshots ») plutôt que le titre actuel (« définition »), sans gravité : l'URL porte « packshot » deux fois. Aucun changement recommandé. |
| EN | `packshot-photography-guide-why-make-product-packshots` | Correct, en anglais. Même remarque. Aucun changement recommandé : l'URL concentre l'essentiel des impressions de la famille (44 372 impressions sur 90 jours). |
| de-ch | `leitfaden-packshot-fotografie-warum-packshots-machen` | Correct, en allemand, sans « ß ». Aucun changement recommandé. |

Aucun slug ne justifie de redirection : pas de modification du Worker, de `next.config.ts` ni de `content/blog/alternates.json` (entrée `67d154e9a53d05fd8c219b8c` : fr, en, de-ch, à laisser telle quelle).
