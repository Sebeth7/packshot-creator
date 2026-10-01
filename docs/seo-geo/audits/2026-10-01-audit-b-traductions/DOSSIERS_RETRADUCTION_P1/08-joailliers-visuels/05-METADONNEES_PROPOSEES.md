# Métadonnées proposées — famille 67d05174a21e0a8b35feb47e

Comptes en caractères, espaces insécables comprises (Python `len`). Rôle des champs dans le code, vérifié sur `main` `17fc0b3` :

- `metaTitle` → `<title>` et `og:title` (`app/[lang]/blog/[slug]/page.tsx`, `generateMetadata`) ; le suffixe « | PackshotCreator » est écrit dans le champ, pas ajouté par un gabarit ;
- `description` → meta description et `og:description` ;
- `h1` → titre affiché, nom du dernier maillon du fil d'Ariane, alt de l'image principale (l. 127 et 206) ;
- `title` → titre des cartes du blog et des articles liés, alt de leurs vignettes (`app/[lang]/blog/page.tsx`, `components/blog/RelatedArticles.tsx`).

Requêtes GSC à préserver (365 jours au 28/09/2026, clics / impressions / position) :

- FR : photographe de bijoux 0/145/29,9 ; photographe bijoux 0/89/28,4 ; **comment photographier des bijoux 0/82/9,8** ; photographie bijoux 0/80/36,6 ; photographe haute joaillerie 0/70/20,2 ; packshot bijoux 0/66/13,9.
- EN : **jewelry photography 0/1050/49,8** ; jewellery photography 1/867/61,0 ; jewelry product photography 0/492/47,2 ; necklace product photography 0/408/58,3 ; ecommerce jewellery photography 0/344/37,9.

---

## FR — /fr/blog/joailliers-nos-conseils-pour-reussir-vos-visuels-produits

**title** (74 → 60)
- Actuel : Quelle technique pour photographier des bijoux - Tutoriel photo e-commerce
- Proposé : Comment photographier des bijoux : tutoriel photo e-commerce
- Justification : question sans point d'interrogation et trait d'union séparateur corrigés ; reprend mot pour mot « comment photographier des bijoux », seule requête FR en première page (9,8), dans le titre des cartes et des liens internes.

**h1** (57 → 70)
- Actuel : Photographier des Bijoux : Techniques Pro pour Joailliers
- Proposé : Photographier des bijoux : techniques professionnelles pour joailliers
- Justification : Title Case supprimé ; « pro » développé (registre d'un H1). Garde « photographier des bijoux » et « joailliers » (public visé, et seul mot du h1 actuel qui renvoie au slug). Le h1 devient aussi l'alt de l'image principale.

**metaTitle** (95 → 60)
- Actuel : Comment Photographier des Bijoux: Techniques Professionnelles pour Joailliers | PackshotCreator
- Proposé : Comment photographier des bijoux en studio | PackshotCreator
- Justification : 60 caractères, dans la cible ; conserve en tête la formulation actuellement servie « Comment photographier des bijoux », qui porte la meilleure position de la page (9,8) ; « en studio » résume l'angle de l'article (studio macro). « Techniques professionnelles pour joailliers » est reporté dans le h1. Variante si l'on veut garder « joailliers » au prix de « comment » : `Photographie de bijoux : conseils aux joailliers | PackshotCreator` (66 caractères, hors cible).

**description** (238 → 150)
- Actuel : Maîtrisez l'art exigeant de la photographie de bijoux avec nos conseils exclusifs: éclairage avancé, technologie Hyperfocus et animations 360°. Découvrez comment sublimer diamants et pierres précieuses pour votre e-commerce de joaillerie.
- Proposé : Photographie de bijoux : studio macro, éclairage, technologie Hyperfocus, animations à 360° et post-production. Nos conseils pour réussir vos visuels.
- Justification : dans la cible 140-155 ; ouvre sur « photographie de bijoux » (requête « photographie bijoux », complémentaire du metaTitle) ; énumère les thèmes réellement traités par l'article ; « exclusifs » retiré (promesse invérifiable, 06 point 6) ; « réussir vos visuels » fait écho au slug. « Hyperfocus » conservé (06 point 1) : si l'appellation change, la description change avec elle.

**Images**

| src | alt actuel | alt proposé | car. |
|---|---|---|---|
| /images/blog/67dbae80db22afe6492e9626.avif | `__wf_reserved_inherit` | Bague dorée sertie d’une pierre rose taille émeraude, photographiée de face sur fond clair | 90 |
| /images/blog/67dbae80db22afe6492e962a.avif | `__wf_reserved_inherit` | Photo de bague dorée ornée d’une petite pierre, sur fond blanc, en cours de retouche dans un logiciel d’édition d’image | 119 |
| /images/blog/67dbae80db22afe6492e967e.avif (image principale) | = h1 (calculé par le code) | sans champ dans le JSON : l'alt devient le h1 proposé. Description de l'image si un champ est ajouté un jour : « Quatre bagues sur fond blanc, dont un solitaire et une bague à pierre bleu foncé » (80) | — |

Les trois images ont été examinées (conversion locale en PNG). Les alts décrivent ce qui se voit sans nommer de matière ni de pierre précise : la couleur dorée ne prouve pas l'or, la pierre rose n'est pas identifiable sur photo. L'image 962a est une capture d'un logiciel de retouche généraliste (06, point 14).

**Légendes** : aucune dans l'actuel ; aucune ajoutée.

**Catégorie** : Innovations → Innovations (conservée). L'article relève plutôt du tutoriel ; « E-commerce » est la seule autre catégorie générale existante. Changement facultatif, 06 point 16.

**Slug** : `joailliers-nos-conseils-pour-reussir-vos-visuels-produits` — conservé. Analyse : français correct, sans faute ; il ne contient pas « photographier » mais la requête est portée par le title, le h1 et le metaTitle. L'ancienne URL Webflow `/joailliers-nos-conseils-pour-reussir-vos-visuels-produits` (86 des 103 clics FR sur 365 jours) aboutit ici par le Worker (`cloudflare-worker/src/index.js`, `LEGACY_REDIRECTS` l. 1324 et règle `/blog/*` l. 1811-1816) ; `/e-commerce-comment-photographier-vos-bijoux-et-creations` aussi (l. 968). Un changement de slug imposerait une nouvelle redirection 301 (Worker, avec resynchronisation préalable, R5, ou `next.config.ts`), la mise à jour de `content/blog/alternates.json` (l. 152) et de `data/content-maillage.ts`, et réécrirait les liens entrants des articles « série d'ebooks ». Recommandation : ne pas le changer.

**Ancres du sommaire** (id calculé sur le texte de l'intertitre, `processHtmlContent`) : une seule change, `temoignage-concret-gad-amp-co-et-l-efficacite-orbitvu` → `temoignage-gad-amp-co-et-l-efficacite-d-orbitvu`. Aucun lien du dépôt ne vise une ancre de cet article (recherche dans `content`, `app`, `components`, `data`, `messages`).

---

## EN — /en/blog/technique-photograph-jewelry-tutorial

**title** (64 → 49)
- Actuel : What technique to photograph jewelry - E-commerce photo tutorial
- Proposé : `Jewelry photography: an e-commerce photo tutorial`
- Justification : suit le FR (« tutoriel photo e-commerce ») en ouvrant sur la requête EN principale, « jewelry photography » (1 050 impressions) ; supprime le calque agrammatical.

**h1** (50 → 57)
- Actuel : Photographing Jewelry: Pro Techniques for Jewelers
- Proposé : `Jewelry photography: professional techniques for jewelers`
- Justification : traduction du h1 FR proposé ; contient « jewelry photography » ; casse de phrase, majoritaire dans les H1 EN du blog et cohérente avec le FR.

**metaTitle** (81 → 56)
- Actuel : How to Photograph Jewelry: Professional Techniques for Jewelers | PackshotCreator
- Proposé : `Jewelry photography: studio techniques | PackshotCreator`
- Justification : dans la cible ; même angle que le FR (« en studio ») ; place la requête principale en tête. « How to photograph jewelry » n'a aucune impression notable dans les requêtes fournies, contrairement à « jewelry photography ».

**description** (217 → 150)
- Actuel : Master the demanding art of jewelry photography with our exclusive tips: advanced lighting, Hyperfocus technology, and 360° animations. Discover how to enhance diamonds and precious stones for your jewelry e-commerce.
- Proposé : `Jewelry photography for e-commerce: macro studio, controlled lighting, Hyperfocus technology, 360° animations, and post-production. Tips for jewelers.`
- Justification : dans la cible ; reprend « jewelry photography » et l'angle e-commerce (requête « ecommerce jewellery photography ») ; « exclusive » retiré.

**Graphie « jewellery »** : non ajoutée (usage du dépôt : anglais américain). Les impressions déjà obtenues sur « jewellery photography » (867) et « ecommerce jewellery photography » (344) montrent que Google rattache cette graphie à la page sans qu'elle figure dans le texte.

**Images**

| src | alt actuel | alt proposé | car. |
|---|---|---|---|
| /images/blog/67dbae80db22afe6492e9626.avif | `__wf_reserved_inherit` | Gold-colored ring set with an emerald-cut pink stone, photographed from the front on a light background | 103 |
| /images/blog/67dbae80db22afe6492e962a.avif | `__wf_reserved_inherit` | Photo of a gold-colored ring with a small stone, on a white background, being retouched in image-editing software | 113 |
| /images/blog/67dbae80db22afe6492e967e.avif (image principale) | = h1 (calculé par le code) | sans champ : l'alt devient le h1 proposé. Description si un champ est ajouté : « Four rings on a white background, including a solitaire and a ring with a dark blue stone » (89) | — |

**Légendes** : aucune ; aucune ajoutée.

**Catégorie** : Innovations → Innovations (conservée, même remarque qu'en FR).

**Slug** : `technique-photograph-jewelry-tutorial` — conservé. Analyse : anglais peu idiomatique (« technique photograph » est une juxtaposition), sans faute d'orthographe ni de langue. Il porte le seul backlink connu de la famille (1 domaine, AS 64, lien suivi) et reçoit cinq redirections du Worker : `/en/blog/ecommerce-jewelry-photography-tutorial` (l. 1001), `/en/blog/joailliers-nos-conseils-pour-reussir-vos-visuels-produits` (l. 1008), `/fr/blog/technique-photograph-jewelry-tutorial` (l. 1154), `/es/blog/aprender-fotografia-joyas-ecommerce` (l. 1851), `/es/blog/ecommerce-como-fotografiar-joyas` (l. 1859), plus `/blog/technique-photograph-jewelry-tutorial` via `BLOG_EN_REDIRECTS` (l. 37). 66 des 86 clics EN sur 365 jours arrivent par ces anciennes URL. Un changement imposerait une redirection de plus (chaîne à éviter : il faudrait repointer les cinq règles existantes), la mise à jour de `alternates.json` (l. 153) et de `BLOG_EN_REDIRECTS`, et exposerait le backlink à une redirection. Recommandation : ne pas le changer.

**Structure et ancres** : l'intertitre sur l'éclairage passe de H3 à H2 (même ancre, `advanced-lighting-techniques-to-enhance-precious-stones` ; il remonte d'un niveau dans le sommaire). Deux ancres changent : `practical-tips-succeed-in-your-jewelry-photography` → `practical-tips-for-better-jewelry-photography` ; `concrete-testimony-gad-amp-co-and-orbitvu-efficiency` → `testimonial-gad-amp-co-and-the-efficiency-of-orbitvu`. Aucun lien du dépôt ne vise ces ancres.

**Cannibalisation** : `/en/blog/8-steps-to-professional-jewelry-photography` reçoit aussi des impressions sur « jewelry photography » (0/150/54,5). Les deux pages restent distinctes (bague en huit étapes / conseils généraux et studio), mais le choix de faire porter « jewelry photography » par cette page-ci relève de Laurent (06, point 9).

---

## de-ch

Aucune version de-ch dans la famille (`alternates.json` : fr et en seulement). Aucun fichier `04-PROPOSITION_DE-CH.md`.
