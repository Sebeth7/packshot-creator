# Métadonnées proposées — famille 670e262cabb4626493da23e4

Usage des champs, vérifié dans `app/[lang]/blog/[slug]/page.tsx` et `components/blog/` :

- `metaTitle` : balise `<title>` et titre Open Graph, sans suffixe ajouté (`article.metaTitle || article.title`, aucun gabarit) ;
- `h1` : titre affiché, fil d'Ariane, schema Article et **texte alternatif de l'image principale** (`alt={title}` avec `title = article.h1 || article.title`) ;
- `title` : cartes de la liste du blog et des articles liés (`BlogGrid`, `RelatedArticles`, texte et alt de la vignette) ;
- `description` : meta description et Open Graph.

Requêtes GSC à préserver (365 jours au 28/09/2026, clics / impressions / position) :

- FR : photo produit 0/520/14,6 ; photo produit e-commerce 0/478/14,7 ; photo e commerce 0/412/14,6 ; photo pour vente en ligne 0/354/11,0 ; photo e-commerce astuces 0/263/4,7 ; photographe produit e commerce 0/236/23,6.
- EN : product photography for ecommerce 0/819/59,3 ; ecommerce product photography 1/631/61,9 ; e commerce product photography 0/468/17,4 ; photography for ecommerce 0/438/32,9 ; e commerce photography 0/431/16,2.

Les comptes de caractères incluent espaces et ponctuation (une espace insécable compte pour un caractère).

---

## FR — /fr/blog/comment-avoir-meilleure-photo-produit-e-commerce

### title

- Actuel : « Les 10 astuces infaillibles pour créer une photo de produit vendeuse ! » (70 caractères)
- Proposé : « 10 astuces pour créer une photo produit e-commerce vendeuse » (59 caractères)
- Justification : retire le superlatif « infaillibles » (FR-01, `06`) ; place « photo produit e-commerce » (requêtes « photo produit », « photo produit e-commerce ») et « astuces » (« photo e-commerce astuces », position 4,7) ; garde « vendeuse », déjà présent.

### h1

- Actuel : « Photo produit e-commerce : les 10 astuces infaillibles » (54 caractères)
- Proposé : « Photo produit e-commerce : 10 astuces pour réussir vos visuels » (62 caractères)
- Justification : le début « Photo produit e-commerce : » est conservé à l'identique ; « infaillibles » retiré (FR-02, `06`). Ce texte devient aussi l'alt de l'image principale.

### metaTitle

- Actuel : « Photo produit e-commerce : 10 astuces pour une photo efficace ! » (63 caractères)
- Proposé : « Photo produit e-commerce : 10 astuces pour vendre en ligne » (58 caractères)
- Justification : passe sous 60 caractères ; supprime la répétition de « photo » ; garde « Photo produit e-commerce » en tête et « astuces » ; « vendre en ligne » rejoint « photo pour vente en ligne » (354 impressions, position 11,0).

### description

- Actuel : « Découvrez nos 10 astuces pour créer une meilleure photo produit e-commerce. Optimisez votre catalogue et boostez vos ventes en ligne ! » (134 caractères)
- Proposé : « 10 astuces pour réussir vos photos produit e-commerce : angles, détails, photos lifestyle, dimensions, poids des images et SEO, pour mieux vendre en ligne. » (155 caractères)
- Justification : annonce le contenu réel des dix points ; garde « photos produit e-commerce », « astuces » et « vendre en ligne » ; ramène la promesse « boostez vos ventes » à « mieux vendre ».

### Textes alternatifs (ordre du texte)

| # | `src` | Actuel | Proposé | Justification |
|---|---|---|---|---|
| Principale | `/images/blog/67b7328a7301c83348414f8e.avif` | (pas de champ : alt = `h1`) | (alt = nouveau `h1`) | Image : maillots de bain à plat avec un chapeau de paille sur fond turquoise. Pas de champ alt dédié dans le JSON ; aucune modification proposée. |
| Point 1 | `/images/blog/67dbae73b8c0e26556f4e206.avif` | « photo produit e-commerce d'un fauteuil » | « Photo produit e-commerce d'un fauteuil jaune sur fond blanc » | Garde la requête « photo produit e-commerce » ; décrit l'image (fauteuil jaune vu de face, fond blanc). |
| Point 3 | `/images/blog/67dbae73b8c0e26556f4e1fe.avif` | « un fauteuil jaune présenté sous différents angles » | « Fauteuil jaune présenté sous trois angles différents » | L'image montre trois vues (face, trois-quarts avant, trois-quarts arrière). |
| Point 4 | `/images/blog/67d18f947ba281b286aa3c6e.avif` | « zoom produit qualitatif  » | « Vue rapprochée d'un sac en cuir jaune effet croco : grain du cuir et coutures » | Alt vague avec espace finale (FR-15) ; décrit le gros plan. |
| Point 5 | `/images/blog/678915240464b5b6eb2a0050.avif` | « Photo lifestyle mobilier réalisé avec studio packshot » | « Photo lifestyle de mobilier réalisée en studio packshot : une femme assise sur un canapé » | Accord (FR-21) ; l'image montre une femme assise sur un canapé ocre, sur le plateau d'un grand studio éclairé par des panneaux. |
| Point 8 | `/images/blog/67dbae73b8c0e26556f4e203.avif` | « __wf_reserved_decorative » | « Page d'accueil de TinyPNG, outil en ligne de compression d'images » | Valeur Webflow (FR-30) ; l'image est une capture de tinypng.com, l'outil cité juste en dessous. |
| Point 10 | `/images/blog/67dd85edd8fd350b34495f9a.avif` | « __wf_reserved_inherit » | « Studios photo automatisés Orbitvu de différentes tailles, alignés du plus compact au plus grand » | Valeur Webflow (FR-44) ; l'image aligne sur fond noir des studios Orbitvu, du petit plateau tournant à la grande cabine « FASHIONSTUDIO ». |

Les alts ont été rédigés après examen des fichiers images du dépôt (`public/images/blog/`).

### Légendes

- Actuel : aucune légende.
- Proposé : aucune légende.

### Catégorie

- Actuel : « E-commerce » (`categoryId` `104a291d655dd1b3985ecb9a34c0df8a`)
- Proposé : inchangée.

### Autres champs

- `author` : actuel « PackshotCreator » ; à l'import Webflow (`56d4bc32`) : « Laurent Wainberg ». Remplacement délibéré par Sébastien (commit `8ae45f63`, 12/06/2026, « cohérence E-E-A-T avec le schema Organization »), pas une erreur d'outil. Proposé : inchangé dans ce dossier ; décision dans `06`.
- `date` : 2024-03-06, inchangée. `dateModified` : absente ; à renseigner avec la date réelle de mise en ligne si la proposition est publiée (`06`).
- `readingTime` : 7, inchangé (longueur du texte quasi identique).

### Slug

- Actuel et proposé : `comment-avoir-meilleure-photo-produit-e-commerce` (**conservé**).
- Analyse : l'article « la » manque, sans gêne de lecture ; le slug contient « photo-produit-e-commerce », cœur des requêtes FR. Le Worker du dépôt redirige déjà vers cette URL plusieurs anciennes adresses (`/comment-avoir-meilleure-photo-produit-e-commerce`, `/fr/focus-sur-les-photos-e-commerce-0`, `/articles/focus-sur-les-photos-e-commerce-0`, `/guide-photo-ecommerce-2018`) ; un changement créerait des chaînes de redirections et toucherait `content/blog/alternates.json`, `data/content-maillage.ts` (deux occurrences) et `components/landings/PackshotEcommerce.tsx`. Aucun problème ne le justifie. Recommandation : ne pas toucher.

---

## EN — /en/blog/how-to-e-commerce-product-photography

### title

- Actuel : « E-commerce product photography: 10 foolproof tips for creating a great-selling product photo! » (93 caractères)
- Proposé : « Product photography for e-commerce: 10 tips for photos that sell » (64 caractères)
- Justification : retire « foolproof » (EN-01) et « great-selling » ; place la forme exacte de la requête la plus vue, « product photography for ecommerce » (819 impressions, position 59,3), dans le titre des cartes et du schema Article, sans toucher à la tête du `<title>` qui porte les requêtes déjà mieux classées.

### h1

- Actuel : « E-commerce product photography: 10 foolproof tips » (49 caractères)
- Proposé : « E-commerce product photography: 10 tips for better visuals » (58 caractères)
- Justification : début conservé (« e commerce product photography », position 17,4) ; « foolproof » retiré ; suit le H1 FR. Devient l'alt de l'image principale.

### metaTitle

- Actuel : « E-commerce product photo: 10 tips for an effective photo! » (57 caractères)
- Proposé : « E-commerce product photography: 10 tips for photos that sell » (60 caractères)
- Justification : « product photo » devient « product photography », terme de toutes les requêtes EN (« ecommerce product photography », « e commerce product photography », « e commerce photography ») ; supprime la répétition de « photo » ; 60 caractères.

### description

- Actuel : « 10 foolproof e-commerce product photography tips for creating the best-selling e-commerce product photo and boosting your online sales! » (135 caractères)
- Proposé : « Angles, close-ups, lifestyle shots, dimensions, file size, SEO: 10 tips to improve your product photography for e-commerce and sell more online. » (144 caractères)
- Justification : retire le superlatif ajouté « best-selling » (EN-04) et la répétition ; contient « product photography for e-commerce » ; annonce le contenu réel.

### Textes alternatifs (ordre du texte)

| # | `src` | Actuel | Proposé | Justification |
|---|---|---|---|---|
| Principale | `/images/blog/67b7328a7301c83348414f8e.avif` | (pas de champ : alt = `h1`) | (alt = nouveau `h1`) | Inchangé. |
| Point 1 | `/images/blog/67dbae73b8c0e26556f4e206.avif` | « photo produit e-commerce d'un fauteuil » | « E-commerce product photo of a yellow armchair on a white background » | Alt français dans la page EN (EN-12). |
| Point 3 | `/images/blog/67dbae73b8c0e26556f4e1fe.avif` | « un fauteuil jaune présenté sous différents angles » | « Yellow armchair shown from three different angles » | Alt français (EN-22). |
| Point 4 | `/images/blog/67d18f947ba281b286aa3c6e.avif` | « zoom produit qualitatif  » | « Close-up of a yellow croc-embossed leather bag: leather grain and stitching » | Alt français et vague (EN-24). |
| Point 5 | `/images/blog/678915240464b5b6eb2a0050.avif` | « Photo lifestyle mobilier réalisé avec studio packshot » | « Furniture lifestyle photo taken in a packshot studio: a woman sitting on a sofa » | Alt français (EN-28). |
| Point 8 | `/images/blog/67dbae73b8c0e26556f4e203.avif` | « __wf_reserved_decorative » | « TinyPNG home page, an online image compression tool » | Valeur Webflow (EN-39). |
| Point 10 | `/images/blog/67dbae79db22afe6492e916e.avif` | « __wf_reserved_inherit » | « Orbitvu automated photo studios in a range of sizes, lined up from the most compact to the largest » | Valeur Webflow (EN-55). Fichier identique octet pour octet à celui de la version FR (`03`, rectifications). |

### Légendes

- Actuel : aucune légende.
- Proposé : aucune légende.

### Catégorie

- Actuel : « E-commerce » (même `categoryId`)
- Proposé : inchangée.

### Autres champs

- `author` : comme en FR (« PackshotCreator », import « Laurent Wainberg ») ; décision dans `06`.
- `date`, `dateModified`, `readingTime` : comme en FR.

### Slug

- Actuel et proposé : `how-to-e-commerce-product-photography` (**conservé**).
- Analyse : le slug est bancal en anglais (« how to » sans verbe), mais il contient la suite exacte « e-commerce-product-photography », qui correspond à la requête EN la mieux classée de la page (« e commerce product photography », position 17,4).
- Risque d'un changement : perte temporaire des signaux accumulés (102 clics en 365 jours) le temps de la réindexation, pour un gain faible.
- Ce qu'il faudrait toucher : une redirection 301 de l'ancien vers le nouveau slug (Worker `cloudflare-worker/src/index.js`, ou `next.config.ts`) ; la clé `670e262cabb4626493da23e4` → `en` de `content/blog/alternates.json` ; dans le Worker, l'ensemble `BLOG_EN_REDIRECTS` (`/blog/<slug>` → `/en/blog/<slug>`), l'entrée `GONE_PATHS` `/en/how-to-e-commerce-product-photography/` et les redirections `/en/blog/comment-avoir-meilleure-photo-produit-e-commerce` et `/fr/blog/how-to-e-commerce-product-photography`, qui pointent toutes deux vers ce slug. Le Worker du dépôt fait foi, mais la production peut avoir divergé : resynchroniser avant tout mapping (R5).
- Recommandation : ne pas changer le slug.
- Observation annexe (sans changement proposé) : dans le Worker du dépôt, l'ancienne URL racine `/how-to-e-commerce-product-photography` redirige vers `/en/studios-photo-automatises` et non vers l'article, alors que son équivalent FR (`/comment-avoir-meilleure-photo-produit-e-commerce`) redirige vers l'article FR. Choix à confirmer (`06`).
