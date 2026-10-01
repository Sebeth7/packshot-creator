# Métadonnées proposées — interview du fondateur (famille `67e2ad276291f90c1cf0dc8b`)

Comptes en caractères Unicode, espaces comprises. Chemins des champs dans le gabarit (`app/[lang]/blog/[slug]/page.tsx`) :

- `metaTitle` : `<title>`, `og:title` et texte de l'image OG générée (`/api/og?title=…`) ;
- `h1` : titre de page, texte alternatif de l'image principale (ligne 206) et `headline` du JSON-LD `Article` ;
- `title` : cartes du blog et articles liés, texte et texte alternatif de la vignette (`components/blog/BlogGrid.tsx`, `RelatedArticles.tsx`) ;
- `description` : meta description, `og:description` et JSON-LD `Article` ;
- `faqs` : bloc FAQ et JSON-LD `FAQPage`.

Requêtes GSC à préserver (365 jours au 28/09/2026, `GSC_REQUETES_P1.md`) :

- FR : « sysnext » 0 clic / 3 impressions / position 1,7 ;
- EN : « packshot creator » 2 / 165 / 3,8 ; « packshotcreator » 0 / 114 / 65,9 ; « packshot-creator » 0 / 87 / 1,0 ; « laurent wainberg » 0 / 4 / 2,8.

Trafic de la famille : FR 18 clics sur 365 jours, dont 17 sur l'ancienne URL Webflow, et 27 impressions sur 90 jours ; EN 6 clics sur 365 jours et 53 impressions sur 90 jours. Ce sont des requêtes de marque : l'enjeu des métadonnées est d'arrêter de servir un titre absurde sur ces requêtes, pas de gagner du volume.

---

## FR — `/fr/blog/decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator`

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | Interview de PackshotCreator, fondateur de PackshotCreator (58) | **Interview de Laurent Wainberg, fondateur de PackshotCreator** (59) | Version importée `56d4bc32` ; supprime la tautologie affichée sur les cartes du blog (06, point 1). |
| `h1` | PackshotCreator, fondateur de PackshotCreator – Interview (57) | **Laurent Wainberg, fondateur de PackshotCreator – interview** (58) | Version importée ; « interview » en minuscule après le tiret (FR-03). |
| `metaTitle` | PackshotCreator, fondateur de PackshotCreator – Interview (57) | **Laurent Wainberg, fondateur de PackshotCreator – interview** (58, cible ≤ 60 atteinte) | C'est le `<title>` servi ; garde « PackshotCreator » et rétablit le nom. |
| `description` | Découvrez l’histoire du Packshot automatisé à travers l’interview de PackshotCreator, pionnier et fondateur de PackshotCreator. (127) | **Découvrez l’histoire du packshot automatisé à travers l’interview de Laurent Wainberg, fondateur de Sysnext, la société à l’origine de PackshotCreator.** (151, dans la cible 140-155) | Nom rétabli ; « packshot » en minuscule ; ajoute « Sysnext », seule requête FR de la page, en reprenant « fondateur de la société Sysnext » de la FAQ 1. « Pionnier » sort (06, point 9). Variante minimale si l'allègement est refusé : « Découvrez l’histoire du packshot automatisé à travers l’interview de Laurent Wainberg, pionnier et fondateur de PackshotCreator. » (128, sous la cible). |
| `alt` image principale `/images/blog/67e2a882c6b1faecf8a7d34d.avif` | = h1 : « PackshotCreator, fondateur de PackshotCreator – Interview » | = h1 corrigé : « Laurent Wainberg, fondateur de PackshotCreator – interview » | Imposé par le gabarit, aucun champ dédié. La photo montre trois personnes sur un stand PackshotCreator de salon ; un alt dédié exige une modification de gabarit (06, point 16). |
| `alt` image du corps `/images/blog/67e2aa0213158b42087cf052.avif` | `__wf_reserved_inherit` | **Espace de démonstration réunissant plusieurs studios photo automatisés, dont une table de prise de vue Orbitvu Alphadesk** (120) | Rédigé après examen de l'image : studio vertical à bras, armoires de prise de vue, poste mobile à écran, table à arceau d'éclairage marquée « ALPHADESK » et logo Orbitvu. Lieu non nommé (D1). Variante sans produit : 06, point 17. |
| Légendes | aucune | aucune | Pas de légende dans l'actuel ni dans l'import ; aucune n'est ajoutée. |
| `category` | Actualités | Actualités (inchangée) | Portrait historique plutôt qu'actualité ; changement de taxonomie hors périmètre (06, point 20). |
| `author` | PackshotCreator | PackshotCreator (inchangé) | Décision séparée de Sébastien (06, point 2). |
| `date` / `dateModified` | 2017-10-04 / absent | inchangée / à renseigner à la republication | Recommandation, sans valeur inventée (06, point 15). |
| `readingTime` | 4 | 4 | Volume de texte quasi identique. |
| FAQ, question 1 | Qui a inventé le concept de Packshot automatisé ? | Qui a inventé le concept de packshot automatisé ? | Casse ; les quatre autres questions sont inchangées. |

### Slug FR — conservé

`decryptages-interviewe-laurent-wainberg-fondateur-et-dirigeant-de-packshotcreator` (83 caractères)

**Analyse.**

- « interviewe » n'est pas une faute : c'est « interviewé » translittéré (la revue le classait en coquille, FR-06).
- Les défauts réels sont le préfixe hérité de l'ancienne rubrique Webflow (« décryptages »), la longueur, et « dirigeant », inexact depuis la cession de janvier 2026.
- Le nom rétabli dans le H1 rend le slug de nouveau cohérent avec la page.

**Risque SEO d'un changement.** Signal très faible mais réel : 17 des 18 clics de l'année arrivent par l'ancienne URL Webflow, que le Worker redirige déjà. Les liens entrants externes ne sont pas connus (aucune donnée dans ce dossier). Un nouveau slug ajouterait un saut de redirection à ces visites.

**Ce qu'un changement imposerait.**

- **Worker** (`cloudflare-worker/src/index.js`, source unique, R5 : resynchroniser la production avant toute nouvelle règle) :
  - la règle générique `/blog/<slug>` → `/fr/blog/<slug>` (vers la ligne 1816) produirait une chaîne : ajouter un mapping explicite de l'ancien chemin vers le nouveau slug ;
  - repointer la ligne 957 (`/decryptages-…` → `/fr/blog/decryptages-…`) ;
  - repointer la ligne 1136 (`/fr/blog/interview-laurent-wainberg-founder-packshotcreator` → slug FR) ;
  - ajouter `/fr/blog/<ancien>` → `/fr/blog/<nouveau>` en 301 (Worker ou `redirects` de `next.config.ts`).
- **`content/blog/alternates.json`** : clé `fr` de `67e2ad276291f90c1cf0dc8b`.
- **Fichier de contenu** : renommer `content/blog/fr/<slug>.json` et changer son champ `slug`.
- **Lien interne** : `content/blog/fr/lancement-dune-serie-debooks-dediee-au-ecommerce.json` (« son interview complète »).
- Sitemap et hreflang suivent automatiquement.

**Recommandation.** Conserver le slug. Le gain (retirer « dirigeant » d'une URL que personne ne lit) ne justifie ni le saut de redirection supplémentaire ni les quatre modifications du Worker. À réexaminer seulement si le nom de Laurent Wainberg n'est pas rétabli (06, point 1) : le slug contredirait alors la page.

---

## EN — `/en/blog/interview-laurent-wainberg-founder-packshotcreator`

| Champ | Actuel | Proposé | Justification |
|---|---|---|---|
| `title` | Interview with PackshotCreator, founder of PackshotCreator (58) | **Interview with Laurent Wainberg, founder of PackshotCreator** (59) | Version importée ; garde « PackshotCreator » (requête « packshot creator », position 3,8) et « Laurent Wainberg » (requête « laurent wainberg », position 2,8). |
| `h1` | PackshotCreator, founder of PackshotCreator — Interview (55) | **Laurent Wainberg, founder of PackshotCreator — Interview** (56) | Version importée ; « Interview » en capitale après le tiret, usage anglais courant pour un libellé. |
| `metaTitle` | PackshotCreator, founder of PackshotCreator — Interview (55) | **Laurent Wainberg, founder of PackshotCreator — Interview** (56, cible ≤ 60 atteinte) | `<title>` servi sur les requêtes de marque. |
| `description` | Discover the history of automated Packshot through an interview with PackshotCreator, pioneer and founder of PackshotCreator. (125) | **The story of automated packshot photography through an interview with Laurent Wainberg, founder of Sysnext, the company behind PackshotCreator.** (143, dans la cible) | Nom rétabli ; « automated packshot photography » au lieu de « automated Packshot » ; parallèle à la description FR. Variante minimale : « Discover the history of automated packshot photography through an interview with Laurent Wainberg, pioneer and founder of PackshotCreator. » (138). |
| `alt` image principale `/images/blog/67e2a882c6b1faecf8a7d34d.avif` | = h1 actuel | = h1 corrigé : « Laurent Wainberg, founder of PackshotCreator — Interview » | Imposé par le gabarit (06, point 16). |
| `alt` image du corps `/images/blog/67e2aa0213158b42087cf052.avif` | `__wf_reserved_inherit` | **Demo space with several automated photo studios, including an Orbitvu Alphadesk shooting table** (94) | Traduction de l'alt FR. Variante sans produit : « Demo space with several automated photo studios ». |
| Légendes | aucune | aucune | — |
| `category` | News | News (inchangée) | Comme en FR. |
| `author` | PackshotCreator | PackshotCreator (inchangé) | 06, point 2. |
| `date` / `dateModified` | 2017-10-04 / absent | comme en FR | 06, point 15. |
| `readingTime` | 4 | 4 | — |
| FAQ, questions 1, 3 et 5 | Who invented the automated Packshot concept? / How has the profession reacted to these innovations? / Who is Orbitvu and how does he fit into this story? | Who invented the automated packshot concept? / How did the profession react to these innovations? / Who is Orbitvu, and how does it fit into this story? | Casse, temps, pronom (EN-43, EN-47, EN-49). Questions 2 et 4 inchangées. |

### Slug EN — conservé

`interview-laurent-wainberg-founder-packshotcreator` : anglais correct, cohérent avec le H1 rétabli. L'ancienne URL Webflow `/blog/interview-laurent-wainberg-founder-packshotcreator` est redirigée vers `/en/blog/…` par l'ensemble `BLOG_EN_REDIRECTS` du Worker (ligne 27). Les versions ES, DE et NL de l'ancien site (`/blog/entrevista-…`, `/blog/interview-laurent-wainberg-grunder-…`, `/blog/interview-laurent-wainberg-oprichter-…`) sont en 410 (`GONE_PATHS`). Aucune action.

---

## de-ch

Pas de version de-ch pour cette famille (`alternates.json` : FR et EN). Rien à proposer.
