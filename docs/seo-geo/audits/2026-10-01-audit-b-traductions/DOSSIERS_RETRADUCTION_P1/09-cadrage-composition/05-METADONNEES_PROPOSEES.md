# Métadonnées proposées — famille 67e41233cb2c0c8643c00c89

Proposition — non publiée. Valeurs actuelles relevées dans `content/blog/<langue>/<slug>.json` sur `main` `17fc0b3` (01/10/2026). Les comptes de caractères sont faits sur la chaîne exacte ; dans les valeurs FR proposées, l'espace avant « : » est une espace insécable (U+00A0), comptée pour un caractère. Requêtes : `GSC_REQUETES_P1.md` (365 jours au 28/09/2026, format clics / impressions / position).

Rappel du gabarit (`app/[lang]/blog/[slug]/page.tsx`) : le `<title>` servi est `metaTitle` (repli : `title`) ; le `<h1>` est `h1` (repli : `title`) ; l'alt de l'image principale est le `h1` (`alt={title}`, aucun champ dédié) ; la `description` sert aussi à `og:description`.

---

## FR — /fr/blog/conseils-photo-le-cadrage-et-la-composition

### `title`

- Actuel : `Conseils photo : le cadrage et la composition` (45 car.)
- Proposé : `Conseils photo : le cadrage et la composition` (45 car.)
- Justification : texte correct, inchangé ; seule l'espace avant « : » devient insécable.

### `h1`

- Actuel : `Conseils photo : cadrage et composition pour vendre` (51 car.)
- Proposé : `Conseils photo : cadrage et composition pour vendre` (51 car.)
- Justification : français correct, intention conservée (« pour vendre » est un objectif, pas une promesse chiffrée). Inchangé, sauf espace insécable. Le `h1` sert aussi d'alt à l'image principale (voir plus bas).

### `metaTitle`

- Actuel : `Photographie Produit : 6 Règles de Cadrage pour des Images Qui Convertissent` (76 car.)
- Proposé : `Cadrage et composition en photo produit : règles et conseils` (60 car.)
- Variante plus courte : `Photo produit : règles de cadrage et de composition` (51 car.)
- Justification :
  - Title Case anglais retiré (majuscules à « Produit », « Règles », « Cadrage », « Images », « Qui », « Convertissent ») ; 76 car. ramenés à 60, donc plus de troncature en SERP.
  - Claims retirés et signalés (`03` FR-03, `06` point 2) : « 6 règles » ne correspond pas au corps (cinq sections de conseil, la 6e est un renvoi produit vers l'Alphashot Pro G2) ; « qui convertissent » est une promesse sans donnée dans le texte.
  - Requêtes FR à préserver : « cadrage produit » 0/24/16,4 ; « qu'est-ce que le cadrage en photographie » 0/33/36,6 ; « conseils shooting produits » 0/54/47,0 ; « meilleures pratiques photo produits » 0/70/47,8 ; « configuration de photographie de produits » 0/112/39,0. Le titre proposé porte « cadrage », « composition », « photo produit », « règles » et « conseils ».
  - Enjeu limité : 33 clics en 365 jours, position moyenne 29,2, et 31 de ces clics passent par l'ancienne URL Webflow redirigée (le gain dépend surtout de la redirection, qui n'est pas touchée).

### `description`

- Actuel : `Maîtrisez l'art de la photographie produit grâce à nos 6 conseils essentiels de cadrage et composition. Découvrez comment transformer vos images e-commerce en véritables outils de vente, qu'importe votre équipement. Guide pratique pour photographes et e-commerçants.` (266 car.)
- Proposé : `Intention, cadre plein ou aéré, règle des tiers, mouvement : nos conseils de cadrage et de composition en photo produit, quel que soit votre équipement.` (152 car.)
- Justification : 266 car. ramenés dans la cible 140-155 ; la description reprend les cinq sections de conseil réelles au lieu de « 6 conseils essentiels » (claim retiré, `06` point 2) ; « transformer vos images en véritables outils de vente » (promesse) retiré ; « qu'importe » remplacé par « quel que soit » ; l'idée « quel que soit votre équipement » est conservée (section 6 : « studio photo e-commerce… ou une solution de prise de vue classique »).

### Images (ordre de la page)

Les trois images ont été examinées visuellement (conversion locale temporaire AVIF vers PNG, fichiers supprimés). Aucune n'a de légende.

| # | `src` | Emplacement | Alt actuel | Alt proposé | Car. |
|---|---|---|---|---|---|
| 0 | `/images/blog/67e40ec4413f376fe0ddd41c.avif` | Image principale (gabarit) | `Conseils photo : cadrage et composition pour vendre` (alt = `h1`, imposé par le gabarit) | Inchangé, faute de champ. Si un champ d'alt est créé : `Flacon de parfum rose cuivré gravé « Lost in You », photographié sur fond blanc` | 79 |
| 1 | `/images/blog/67e40e909cefed03b0448611.avif` | Section 1, après la liste de questions | `__wf_reserved_inherit` | `La même paire de bottines bleues photographiée deux fois : sur fond bleu uni, puis sur fond clair avec une feuille verte et des lunettes de soleil` | 146 |
| 2 | `/images/blog/67dbae6aaff27501162f332a.avif` | Section 4, après la définition de la règle des tiers | `Photo cadrage composition` | `Schéma de la règle des tiers : un cadre divisé en neuf parties égales, avec les lignes de force et les points forts situés à leurs intersections` | 144 |

Justifications :

- Image 0 : elle montre un flacon de parfum rose cuivré gravé « LOST IN YOU », sur fond blanc, sans rapport direct avec le cadrage. Son alt est le `h1` par construction du gabarit ; le corriger demande un champ et une modification du gabarit commun à tous les articles (rayon large, hors de ce dossier). Signalé dans `06`, point 11.
- Image 1 : valeur réservée Webflow servie telle quelle aux lecteurs d'écran (anomalie majeure). L'image montre la même paire de bottines bleues à lacets en deux versions : packshot sur fond bleu uni à gauche, mise en scène sur fond clair dégradé avec une feuille verte et des lunettes de soleil à droite. Elle illustre l'exemple « paire de chaussures dans un environnement lifestyle ».
- Image 2 : ce n'est pas une photo mais un schéma (grille 3 × 3, cotes « 1/3 », libellés « LIGNES DE FORCE » et « POINTS FORTS »). L'alt actuel juxtapose des mots-clés ; l'alt proposé décrit le schéma avec les termes du texte.

### Légendes

- Actuel : aucune. Proposé : aucune.

### Catégorie

- Actuel : `E-commerce` (`categoryId` `104a291d655dd1b3985ecb9a34c0df8a`). Proposé : inchangée.
- Justification : parmi les catégories existantes (E-commerce, Innovations, Produits, Actualités, IA & Photo Produit), aucune ne convient mieux ; aucune catégorie nouvelle n'est créée.

### Autres champs (sans proposition de valeur)

- `author` : `PackshotCreator` (import : `Laurent Wainberg`, remplacé par le commit `8ae45f63` du 12/06/2026, choix délibéré « cohérence E-E-A-T avec le schema Organization »). Conservé ; décision dans `06`, point 10.
- `date` : `2017-09-16T00:00:00.000Z`, `dateModified` absent. Conservés ; incohérence de date dans `06`, point 9.
- `readingTime` : 5. Conservé (volume de texte équivalent).

### Slug

- `conseils-photo-le-cadrage-et-la-composition` : **conservé**. Français correct, sans faute. L'ancienne URL Webflow est redirigée en 301 par le Worker (règle générique `/blog/<slug>` → `/fr/blog/<slug>`, et mapping explicite `/conseils-photo-le-cadrage-et-la-composition` → `/fr/blog/…`, `cloudflare-worker/src/index.js` l. 945 dans le dépôt ; la prod peut diverger, R5). Aucune action.

---

## EN — /en/blog/tips-photo-framing-composition

### `title`

- Actuel : `Photo tips: framing and composition` (35 car.)
- Proposé : inchangé.
- Justification : anglais correct.

### `h1`

- Actuel : `Photo tips: framing and composing to sell` (41 car.)
- Proposé : `Product photography composition: framing rules that help you sell` (65 car.)
- Variante minimale : `Photo tips: framing and composition to sell` (43 car.)
- Justification : « composing to sell » n'est pas naturel. La proposition place la requête « product photography composition » (8/167/7,1, seule requête de tête qui génère des clics) et « framing rules » (« photography framing rules » 0/64/14,5) dans le titre visible, tout en gardant l'intention « pour vendre » du `h1` FR. Le `h1` est aussi l'alt de l'image principale. Décision SEO : `06`, point 3.

### `metaTitle`

- Actuel : `Product Photography: 6 Framing Rules for Images That Convert` (60 car.)
- Proposé : `Product Photography Rules: Framing and Composition Tips` (55 car.)
- Variante conservatrice : garder l'actuel (anglais correct, Title Case normal en anglais).
- Justification :
  - Requête principale de la page : « product photography rules » 0/636/12,6, reprise en tête et à l'identique ; « product photography composition » 8/167/7,1 et « photography framing rules » 0/64/14,5 restent couverts par « Framing and Composition ». « top composition rules for small object product shots » 0/177/9,5 est couvert par « Composition » et « Rules ».
  - Claims retirés et signalés : « 6 » (même écart qu'en FR) et « That Convert » (promesse sans donnée).
  - Risque : l'EN porte 135 des 168 clics de la famille et le backlink ; tout changement de `<title>` peut faire bouger le classement quelques semaines. D'où la variante conservatrice, au choix de Laurent (`06`, point 3).

### `description`

- Actuel : `Master the art of product photography with our 6 essential framing and composition tips. Discover how to transform your e-commerce images into real sales tools, regardless of your equipment. Practical guide for photographers and e-retailers.` (241 car.)
- Proposé : `Product photography rules for framing and composition: start with intent, fill the frame or leave space, use the rule of thirds and create movement.` (148 car.)
- Justification : 241 car. ramenés dans la cible ; « product photography rules » en ouverture, « rule of thirds » ajouté (« rule of thirds product photography » 0/96/7,9) ; claims « 6 essential tips » et « real sales tools » retirés, comme en FR.

### Images (ordre de la page)

| # | `src` | Alt actuel | Alt proposé | Car. |
|---|---|---|---|---|
| 0 | `/images/blog/67e40ec4413f376fe0ddd41c.avif` | `Photo tips: framing and composing to sell` (alt = `h1`, gabarit) | Suit le `h1` retenu. Si un champ d'alt est créé : `Copper-pink perfume bottle embossed with “Lost in You,” shot on a white background` | 82 |
| 1 | `/images/blog/67e40e909cefed03b0448611.avif` | `__wf_reserved_inherit` | `The same pair of blue lace-up boots photographed twice: on a plain blue background, then on a light background with a green leaf and sunglasses` | 143 |
| 2 | `/images/blog/67dbae6aaff27501162f332a.avif` | `Photo cadrage composition` (en français sur la page anglaise) | `Rule of thirds diagram: a frame divided into nine equal parts, with the thirds lines and the power points where they intersect` | 126 |

Justifications : mêmes constats qu'en FR. Image 2 : le schéma lui-même porte des libellés français (« LIGNES DE FORCE », « POINTS FORTS ») ; l'alt anglais décrit le schéma avec les termes du texte EN (« thirds lines », « power points ») ; une version anglaise du schéma serait un nouveau fichier, donc hors de ce dossier (`06`, point 12).

### Légendes

- Actuel : aucune. Proposé : aucune.

### Catégorie

- Actuel : `E-commerce` (même `categoryId`). Proposé : inchangée.

### Autres champs

- `author`, `date`, `readingTime` : comme en FR (`06`, points 9 et 10).

### Slug

- `tips-photo-framing-composition` : **conservé**.
- Analyse : l'ordre des mots n'est pas idiomatique (« photo tips » serait l'ordre naturel), mais le slug n'a ni faute ni mot d'une autre langue. Il porte 135 clics en 365 jours et le seul backlink de la famille (1 domaine, AS 46, lien suivi).
- Ce qu'un changement imposerait : redirection 301 de l'ancien slug (Worker, après resynchronisation avec la prod, R5 et `05-INFRA.md`, ou `next.config.ts`) ; mise à jour de `content/blog/alternates.json` (clé `67e41233cb2c0c8643c00c89`) ; mise à jour des trois entrées du Worker qui citent ce slug (`BLOG_EN_REDIRECTS` l. 38, mappings l. 992 et l. 1155) pour éviter une chaîne de redirections ; perte temporaire de signaux sur l'URL qui porte le backlink.
- Recommandation : ne pas changer. Le gain est nul face au risque.
