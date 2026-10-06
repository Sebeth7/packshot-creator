# Cluster AI Act — publication coordonnée de cinq articles en FR, EN et de-ch

Dossier de la mission « Finalisation et publication complète du cluster AI Act » du 06/10/2026 (Claude de Laurent). Décision : D46. Registre juridique : `REGISTRE-JURIDIQUE.md` (même dossier). Statut de publication : `PUBLICATION_AUTHORITY = LAURENT`, `SEBASTIEN_VALIDATION = NOT_RECEIVED` (précisions de Laurent du 06/10, mission de continuation, consignées dans D46). Ne jamais écrire que les articles sont validés par Sébastien.

---

## 1. Fresh-check initial (06/10/2026)

| Élément | Valeur relevée |
|---|---|
| `main` | `9b19e6d` (fusion de #95, 04/10, Claude de Sébastien) ; `ETAT.md` indiquait encore `de6c4cd` |
| PR ouvertes | 19 : #27, #59, #60, #64, #65, #67, #70, #77, #79, #82, #84, #85, #88 à #94 |
| #59 (A) | brouillon, tête `2a36322`, 27 commits de retard, 31 d'avance |
| #60 (S) | brouillon, tête `74ae921`, 27 de retard, 29 d'avance |
| #77 | brouillon, tête `a207fe3`, 56 de retard ; fichiers de contenu inchangés sur `main` depuis sa base |
| #79 | brouillon « REVIEW ONLY », tête `a4a62ac`, 27 de retard |
| #61, #62, #63 | fermées sans fusion le 01/10 (têtes `250e34a`, `8f2f42b`, `b6495d1`) |
| Gouvernance | D41 en vigueur au matin du 06/10 ; D16, D38, D42 en vigueur ; aucune réponse de Sébastien sur le dossier AI Act dans `BOITE-AUX-LETTRES.md` ni sur GitHub |

## 2. Construction

- Une seule PR, sur `main` courant : #59, #60 et #77 y sont fusionnées (historique et JOURNAL conservés), B, C et D y sont créés, les traductions et le maillage y sont ajoutés. Une seule fusion publie les 15 URL ensemble : aucun lien vers une URL inexistante, à aucun moment.
- #79 n'est pas fusionnée. Repris de #79 : textes de B, C, D (réécriture du 02/10), FAQ, 5 AVIF (B0, B1, C0, C2, D0), copiés à l'octet (SHA-256 identiques). Non repris : routes `/revue-interne/`, garde Preview, composant `ModuleRevue`, 8 modules SVG (statuts « SOURCE GRAPHIQUE ATTENDUE » et « FONCTIONNEL PROVISOIRE »), bandeaux et notes de relecture.
- #61, #62, #63 : non réutilisées.

## 3. Architecture et anti-cannibalisation

| Article | Intention principale | Requête centrale | Ce qu'il ne cible pas |
|---|---|---|---|
| A — pilier | Comprendre ce que l'article 50 impose aux images produit (qui marque, qui signale, quand), vue d'ensemble décisionnelle | ai act images produit ; faut-il signaler une image IA | Le geste de retouche (B), les procédés de mannequin (C), la préparation des fichiers (D), le droit suisse (S) |
| S — Suisse | Savoir ce qui s'applique en Suisse, quand l'AI Act peut viser une entreprise suisse, et les plateformes | images IA Suisse obligation ; ai act Suisse | Le détail des cas européens (renvoi vers A) ; l'AI Act présenté comme droit suisse |
| B — retouche | Contrôler la fidélité d'une photo produit retouchée par IA, opération par opération | retouche ia photo produit | La qualification juridique générale (renvoi vers A) ; les métadonnées (renvoi vers D) |
| C — mannequins | Distinguer mannequin invisible, modèle synthétique, photo transformée, avatar ; contrôler le vêtement porté | mannequin virtuel ia ; mannequin invisible ia | « Faut-il signaler un mannequin virtuel » (FAQ de A) ; les métadonnées Amazon (D) |
| D — métadonnées | Préparer et vérifier les métadonnées attendues par Google, Amazon, Zalando, jusqu'au fichier livré | métadonnées image ia marketplace ; iptc digitalsourcetype | Le cadre légal (renvoi vers A) ; le droit suisse (S) |

Vérifications faites sur le FR : titles, H1, metas et premiers paragraphes distincts ; aucune FAQ dupliquée entre articles (la FAQ « mannequin virtuel signalé ? » n'existe que dans A ; « C2PA ou IPTC imposés ? » n'existe que dans A, D traite de la pratique) ; S sans FAQ (choix maintenu depuis le 29/09), ses intertitres interrogatifs portent les questions.

## 4. Maillage interne

| De | Vers | Ancre (FR) | Où |
|---|---|---|---|
| A | B | « retouche IA d'une photo produit » | Fin de « Le détourage a changé de qualification » |
| A | C | « mannequin invisible, modèle virtuel, avatar » | Cas 7 |
| A | D | « métadonnées des images produit générées par IA » | Section plateformes |
| A | S | titre de S | « Et si votre entreprise est en Suisse ? » |
| A | Mode | « packshot mode » | Cas 3 (lien de #59, arbitré le 02/10) |
| S | A | « article consacré à l'AI Act… » et titre de A | « Huit situations », section UE |
| S | D | « métadonnées des images produit générées par IA » | « C2PA et IPTC sont-ils obligatoires en Suisse ? » |
| S | Mode | « packshot mode » | Cas 2 (lien de #60, arbitré le 02/10) |
| B | A | « article dédié aux obligations de l'AI Act… » | Introduction |
| B | D | « métadonnées des images produit générées par IA » | « Une fiche de validation » |
| C | B | « détourage par IA qui reconstruit une partie du produit » | Mannequin invisible |
| C | D | « politiques de plateforme » | « La bonne fiche de production » |
| C | A | « article consacré à l'AI Act… » | « La bonne fiche de production » |
| D | A | « article 50 de l'AI Act » | « Distinguez la loi, la plateforme et le standard » |
| D | C | « mannequin invisible, modèle virtuel, avatar » | Amazon |
| de-ch A, B, C, D | de-ch S | titre de S | Phrase de cadrage suisse (adaptation D38) |
| `generer-images-produit-ia` (FR) | A | « des obligations de transparence » | Paragraphe corrigé par #77 |
| `migrer-ancien-packshotcreator` (FR), EN, de-ch | A dans la même langue | « l'article 50 du règlement européen sur l'IA » | Paragraphe corrigé par #77 |
| `public/llms.txt` | A, S (FR) | — | « Ressources éditoriales » |

Mêmes liens en EN et de-ch (table de correspondance des slugs). Aucun lien vers F5 (`/packshot-e-commerce`) ; aucun fichier de Mode modifié ; les liens vers Mode existaient dans #59 et #60 (arbitrage du 02/10) et sont repris dans les traductions : variable concomitante pour la mesure Mode (section 9).

## 5. Visuels

Toutes les illustrations sont générées par IA (création ChatGPT selon les paquets de #59, #60, #79) et signalées comme telles : légende « Illustration générée par IA… » dans le corps, phrase « L'image d'en-tête est une illustration générée par IA. » dans la note d'ouverture de chaque article (le gabarit n'affiche pas de légende sous l'en-tête). Contrôle visuel du 06/10 sur planche contact : aucune marque tierce ni texte lisible relevé [Inférence : contrôle à résolution réduite, 640 px de large]. Droits d'utilisation : non établis par le dépôt.

| Article | Visuel | Section | Statut |
|---|---|---|---|
| A | `cover.avif` (A1), `marquage-machine-mention-visible` (A7), `detourage-meme-tasse-quatre-etapes` (A2), `correction-recolorisation-variantes` (A4), `produit-net-decor-flou` (A3), `poussiere-image-rayure-produit` (A5), `chemise-a-plat-mannequin-invisible-portee` (A6) | En-tête ; « Deux obligations » ; mise en forme standard ; cas 3 ; cas 4 ; cas 6 ; cas 7 | Arbitrés par Laurent les 30/09, 01/10, 02/10 (#59) |
| S | `cover-trois-couches` (S1), `fidelite-produit-quatre-rendus` (S3), `matiere-finition-gros-plans` (S4), `personne-photo-transformation-synthese` (S5), `suisse-ue-plateformes-couches` (S2), `meme-article-trois-destinations` (S6) | En-tête ; comparer au produit ; cas 5 ; personnes ; AI Act et Suisse ; plateformes | Arbitrés par Laurent (#60) |
| B | `cover-montre-occasion-rayures` (B0), `collier-chainette-pendentif` (B1) | En-tête ; Détourage | « HERO PROPOSÉ » et « ILLUSTRATION CONTEXTUELLE » dans #79 ; validation de Laurent non établie par le dépôt |
| C | `cover-blouse-sans-buste-et-portee` (C0), `bijoux-portes-trois-gros-plans` (C2) | En-tête ; liste des points de contrôle | C0 « HERO ALTERNATIF À VALIDER » (écart au brief : personne générée photoréaliste) ; C2 hors emplacement du module ; validation non établie |
| D | `cover-parcours-image-chaussure` (D0) | En-tête | « HERO ALTERNATIF À VALIDER » (écart au brief : produit et panneaux, proche de S1) ; validation non établie ; D3 (capture technique réelle datée) toujours absent |

ALT et légendes : ceux des sources (#59, #60, #79), traduits en EN et de-ch. Formats : AVIF, 1 092 à 1 672 px de large, 11 à 178 Ko.

**QA finale des visuels B, C, D (06/10, mission de continuation, § 7)** — utilisation autorisée par Laurent après cette QA ; ce n'est pas une validation de Sébastien.

| Visuel | Marque tierce | Texte parasite | Personne | Cohérence section | ALT, légende, mention IA | Rendu |
|---|---|---|---|---|---|---|
| B0 (en-tête de B) | Aucune (cadran sans logo, contrôle à 100 %) | Aucun | Aucune | Montre d'occasion, lumière rasante : rayures, sujet de B | Mention IA dans la note d'ouverture (FR, EN, de-ch) | Pleine largeur, sans recadrage, 1440 à 360 px |
| B1 (Détourage) | Aucune | Aucun | Aucune | Chaînette et pierre ajourée citées juste avant | ALT et légende « Illustration générée par IA… » | Chargée, ratio 1,78 |
| C0 (en-tête de C) | Aucune | Aucun | Personne générée par IA selon la provenance de #79 (bloc C2PA du PNG source : chaînes « trainedAlgorithmicMedia », « OpenAI », signature non vérifiée) ; ressemblance avec une personne réelle : non vérifiable | Vêtement sans corps, puis porté | Note d'ouverture précisée : « la personne qui porte la blouse est entièrement synthétique, ce n'est pas une personne réelle » (3 langues) | Pleine largeur, sans recadrage |
| C2 (liste « Bijou ») | Aucune identifiable ; cadran de la montre : quelques signes de pseudo-texte illisibles à 100 %, imperceptibles à la taille d'affichage (662 px) [Inférence] | Voir colonne précédente | Fragments d'une personne générée (oreille, main, poignet) | Point « Bijou » | ALT et légende « Illustration générée par IA… » | Chargée |
| D0 (en-tête de D) | Aucune (chaussure sans logo) | Aucun texte sur les panneaux | Aucune | Parcours d'une image produit, de la prise de vue au colis | Mention IA dans la note d'ouverture | Pleine largeur, sans recadrage |

Aucun visuel retiré. Aucune nouvelle génération.

## 6. Mesure

### Baseline (avant publication), `gsc-crawl-seo`, site 3, table `gsc_metrics` (requête × page)

Relevé du 06/10/2026, données jusqu'au 03/10/2026.

| Indicateur | Fenêtre | Valeur |
|---|---|---|
| Site entier | 06/09 au 03/10/2026 (28 jours) | 142 clics, 47 455 impressions |
| Requêtes du thème (AI Act, règlement IA, KI-Verordnung, deepfake, hypertrucage, C2PA, IPTC, XMP, métadonnées, mannequin virtuel ou invisible, retouche IA, image IA + signal/mention/obligation…) | 90 jours | 2 requêtes, 2 impressions, 0 clic (aucune sur une URL du cluster, qui n'existe pas encore) |
| `/fr/blog/generer-images-produit-ia` (page source de lien) | 28 jours | 4 clics, 348 impressions, position moyenne 15,1 |
| `/fr/blog/migrer-ancien-packshotcreator` | 28 jours | 0 clic, 3 impressions |
| `/en/blog/migrate-legacy-packshotcreator-studio` | 28 jours | 0 clic, 7 impressions |
| `/de-ch/blog/altes-packshotcreator-studio-migrieren` | 28 jours | aucune ligne |
| `/fr/ia-photo-produit` (thème voisin, non modifié) | 28 jours | 1 clic, 103 impressions |

Liens entrants internes vers les URL du cluster avant publication : 0 (URL inexistantes). État d'indexation : sans objet avant publication.

### Calendrier

J0 = date de mise en production effective (fusion, puis déploiement `sysnext`).

| Jalon | Contrôle |
|---|---|
| J0 | 15 URL : HTTP, canonical, robots, hreflang, JSON-LD, images, liens croisés, sitemap, sur `sysnext.vercel.app` ; `www` dans Chrome (R4) |
| J+7 | Technique : couverture GSC (inspection d'URL des 5 FR au moins), erreurs d'exploration, sitemap lu |
| J+28 | SEO/GEO : impressions et requêtes par URL ; relevé des réponses IA sur 5 à 10 requêtes du thème (méthode hors dépôt, à définir avec Laurent) |
| J+56 | Consolidation : décision de maintien, fusion ou réécriture par article |

Variables concomitantes à ne pas attribuer au cluster : Mode (J+28 le 29/10, J+56 le 26/11, liens entrants depuis A et S), F5 (J+28 le 26/10, J+56 le 23/11), marque M5 (14/10 au 28/10), PR de lot 1 V4.3 (#88 à #94) si elles sont fusionnées, hero vidéo de l'accueil (#95, 04/10), mise à jour du blog listing (le pilier devient l'article mis en avant sur `/fr/blog`, `/en/blog`, `/de-ch/blog`).

## 7. SEO par article et par langue (relevé sur `next start` local, build de la branche, 06/10/2026)

Communs aux 15 URL : `ROBOTS` = aucune balise (indexable) ; `CANONICAL` = URL absolue de la page elle-même ; `HREFLANG` = fr, fr-CH, en, de-CH, x-default (fr), identiques sur les trois langues d'un article ; `BREADCRUMB` = accueil de la langue › blog › article ; `DATE_PUBLISHED` = `DATE_MODIFIED` = 2026-10-06 dans la branche, à remplacer au dernier commit avant fusion par la date réelle de publication, identique dans les trois langues d'un article ; `AUTHOR` = « PackshotCreator » (schéma : `{"@id": "…/#organization"}`, aucun profil personnel ni `sameAs`), appliqué le 06/10 (mission de continuation) ; `OG_TITLE` = title ; `OG_DESCRIPTION` = description ; `OG_IMAGE` = image d'en-tête (AVIF) ; `TWITTER` = carte `summary_large_image` héritée du site (titre du site, pas celui de l'article : BL-43-1) ; `og:url`, `og:locale` et `Article.inLanguage` absents (gabarit, BL-43-1) ; `SITEMAP` = présent (15/15).

| Article | Langue | Slug | Title (car.) | Description (car.) | H1 = title éditorial | JSON-LD | FAQ visibles / FAQPage |
|---|---|---|---|---|---|---|---|
| A | fr | `ai-act-images-produit` | AI Act et images produit : ce qu'une marque doit signaler (57) | 155 | oui | Organization, BreadcrumbList, Article, FAQPage | 7 / 7 |
| A | en | `ai-act-product-images` | AI Act and product images: what a brand must disclose (53) | 151 | oui | Organization, BreadcrumbList, Article, FAQPage | 7 / 7 |
| A | de-ch | `ai-act-produktbilder` | AI Act und Produktbilder: Was in der EU zu kennzeichnen ist (59) | 154 | oui | Organization, BreadcrumbList, Article, FAQPage | 7 / 7 |
| S | fr | `images-ia-ecommerce-suisse` | Images IA en Suisse : obligations, UE et marketplaces (53) | 146 | oui | Organization, BreadcrumbList, Article | 0 / 0 |
| S | en | `ai-images-ecommerce-switzerland` | AI images in Switzerland: obligations, EU and marketplaces (58) | 142 | oui | Organization, BreadcrumbList, Article | 0 / 0 |
| S | de-ch | `ki-bilder-e-commerce-schweiz` | KI-Bilder in der Schweiz: Pflichten, EU und Marktplätze (55) | 147 | oui | Organization, BreadcrumbList, Article | 0 / 0 |
| B | fr | `retouche-ia-photo-produit` | Retouche IA d’une photo produit : contrôler la fidélité (55) | 139 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| B | en | `ai-retouching-product-photos` | AI retouching of product photos: checking fidelity (50) | 145 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| B | de-ch | `ki-retusche-produktfoto` | KI-Retusche von Produktfotos: Produkttreue prüfen (49) | 147 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| C | fr | `mannequin-invisible-modele-virtuel-avatar` | Mannequin virtuel ou invisible : distinguer les procédés (56) | 141 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| C | en | `invisible-mannequin-virtual-model-avatar` | Virtual model or invisible mannequin: know the difference (57) | 146 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| C | de-ch | `ghost-mannequin-virtuelles-model-avatar` | Virtuelles Model oder Ghost Mannequin: Verfahren unterscheiden (62) | 144 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| D | fr | `images-ia-metadonnees-marketplaces` | Images produit IA : métadonnées pour Google, Amazon, Zalando (60) | 132 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| D | en | `ai-product-images-metadata-marketplaces` | AI product images: metadata for Google, Amazon, Zalando (55) | 125 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |
| D | de-ch | `ki-produktbilder-metadaten-marktplaetze` | KI-Produktbilder: Metadaten für Google, Amazon, Zalando (55) | 131 | oui | Organization, BreadcrumbList, Article, FAQPage | 5 / 5 |

## 8. GEO

- Réponse explicite en ouverture de chaque article, encadré de synthèse (A, S), définitions (fournisseur, déployeur, hypertrucage, mise en forme standard), tableaux de décision (A : qui doit quoi, calendrier, autres situations, plateformes ; S : situations ; B : défauts ; C : procédés ; D : standards).
- Trois couches distinguées partout : obligation légale (AI Act, droit suisse ou français), règle de plateforme, recommandation de méthode. Degrés de certitude signalés (« selon la Commission », « probablement », « à notre lecture », « non tranché ») et conservés en EN et de-ch (comptages de A de-ch : 28 « wahrscheinlich », 19 « nicht entschieden », identiques au FR).
- Dates de vérification en tête et en fin d'article ; sources primaires liées.
- `llms.txt` : pilier et article suisse ajoutés aux ressources éditoriales.
- Aucun texte ajouté uniquement pour « faire GEO ».

## 9. Tests et QA

| Contrôle | Résultat |
|---|---|
| `node scripts/seo/verifier-json.mjs` | 195 fichiers valides |
| `npx tsc --noEmit` | vert |
| `npx vitest run` | 400/400 |
| `npx next build` (variables factices) | vert, 386 pages (371 sur `main`) |
| QA navigateur, 15 URL × 5 formats (1440, 1180, 820 tactile, 390 et 360 mobiles) | 200, 0 débordement de page, images chargées, 0 erreur de console, 0 requête en échec, 1 `h1`, FAQ = FAQPage, 0 ancre cassée, liens internes en 200 |
| Tableaux | aucune colonne hors champ à 820 px et plus ; défilement interne en mobile pour les tableaux larges de A (4) et D (1) |
| e2e `seo`, `language-switch`, `mobile-overflow`, `machine-selector`, `internal-links`, `internal-links-all`, `responsive` | branche : 299 réussis, 24 échecs ; `main` (même build, worktree) : 299 réussis, 24 échecs ; listes d'échecs identiques (titles et descriptions hors bornes de pages existantes, hreflang de `/fr/packshot-bijoux`, débordements de `/fr`, `/fr/studios-photo-automatises`, `/fr/ia-photo-produit`, `/fr/industrie-defense`, traduction de l'en-tête) |
| Effet de `globals.css` sur les 6 articles existants à tableau | 1440 px inchangé ; 390 px : colonnes hors champ réduites, aucune page dégradée |
| `verifier-consequences` | rayon large : `content/blog/alternates.json` ; section « Rayon d'action » dans la PR |

Non contrôlé : Preview Vercel (SSO), `www` (R4), Safari, Firefox, appareils réels.

## 10. Checkpoint final avant fusion (06/10/2026, mission de continuation)

```
MAIN = 9b19e6dfc40403e8a98bd030ea2a441fc88517dd (inchangé depuis la mission initiale)
PR96_HEAD = voir la PR (commit de la mission de continuation)

A_READY = YES
S_READY = YES
B_READY = YES
C_READY = YES
D_READY = YES

FR_READY = YES (5/5)
EN_READY = YES (5/5)
DE_CH_READY = YES (5/5, adaptation suisse)

LEGAL_QA = YES — registre du 06/10 ; réserves appliquées (lignes directrices non formellement adoptées, Google FR/DE ≠ EN, Zalando citée sans obligation certaine) ; Amazon et Légifrance : dernières lectures datées du 30/09, non revérifiables par script
SEO_QA = YES pour les champs portés par l'article ; BL-43-1 (gabarit global) hors #96
GEO_QA = YES
LINKING_QA = YES — liens internes en 200 dans les 3 langues ; aucun lien vers F5 ; aucun fichier de Mode modifié
UX_QA = YES — 15 URL × 5 formats : 0 débordement de page, tableaux et <pre> contenus dans leur cadre
VISUAL_QA = YES — QA finale B, C, D (§ 5) ; aucun visuel retiré

READING_WIDTH_OK = YES — article = 656 px (max-w-prose) sur les 15 URL à 1440 et 1180 px, identique à l'article témoin migrer-ancien-packshotcreator ; seul le <code> de D dépasse, dans son <pre> à défilement interne
TOC_CURRENT_IMPLEMENTATION_OK = YES (desktop) — 15/15 : entrées = titres, clic → titre à 96 px du haut ; mobile : liste repliable présente, mais après un toucher le titre visé finit au-dessus de l'écran (de −230 à −795 px), comportement identique sur 4 articles existants (gabarit actuel, défaut corrigé par #84) ; non bloquant selon la mission (§ 13)
D44_PR84_NOT_DUPLICATED = YES — components/blog/TableOfContents.tsx non modifié ; aucune barre collante ajoutée

CI = SUCCESS sur la tête précédente 9aaaecc ; à relire sur la nouvelle tête
PREVIEW_DEPLOYED = YES sur 9aaaecc ; à relire sur la nouvelle tête
PREVIEW_HUMAN_VERIFIED = NO

BLOCKERS = contrôle humain de la Preview (checklist § 11) ; date réelle de publication à inscrire au dernier commit avant fusion
READY_TO_PUBLISH = NO tant que PREVIEW_HUMAN_VERIFIED = NO ; techniquement prêt
```

### Décisions de Laurent appliquées (06/10, mission de continuation)

| Point | Décision | Application |
|---|---|---|
| Validation de Sébastien | `PUBLICATION_AUTHORITY = LAURENT`, `SEBASTIEN_VALIDATION = NOT_RECEIVED`, pour ce cluster seulement ; D42 inchangée hors cluster | D46 complétée ; Q23 reste une information, sans valeur de blocage |
| D16 | `D16_EXCEPTION = YES`, périmètre AI Act B, C, D, autorité Laurent, 06/10/2026 ; D16 inchangée pour les articles futurs ; aucun appel DataForSEO | D46 complétée |
| Auteur | « PackshotCreator » | 15 fichiers ; schéma `Article.author` = organisation, sans profil personnel |
| Date | Date réelle de publication | À appliquer au dernier commit avant fusion |
| Visuels B, C, D | Utilisation autorisée après QA finale | QA du § 5 ; note de C précisée (personne synthétique) |

### Contradictions résolues

- D41 / mission du 06/10 : D46 remplace D41 sur le seul principe des satellites ; le reste de D41 est maintenu.
- #79 « ne pas publier » / B, C, D à publier : nouveaux articles construits sur `main`, #79 non fusionnée.
- Zalando « à confirmer » : source recontrôlée ; ambiguïté de la source elle-même rapportée par citation.
- Lignes directrices « publiées le 20 juillet » / document « Approval of the content of the draft Communication » : formulation corrigée dans les 15 articles.
- Google : refus du produit présent dans les aides FR et DE, absent de l'aide EN restructurée : les trois versions sont décrites.
- #77 : intégrée (corrections présentes dans les articles qui restent publics, liens vers A ajoutés).
- Validation de Sébastien et copywriting FR : décision de Laurent pour ce cluster (`AUTHORIZED_FOR_THIS_CLUSTER = YES`) ; `01-RAYON-ACTION.md` et `README.md` non modifiés.
- Auteur : « PackshotCreator ».
- D16 : exception explicite de Laurent.

### Contradictions restantes

- **Articles « migrer »** : la phrase « Un seul cas limite y est signalé » attribuée à l'analyse d'Orbitvu ne rend pas compte de cette page, qui en signale plusieurs et se contredit (registre, § 15) ; lien Orbitvu à la place des lignes directrices (BL-43-3, E3 à E6). Non modifié : hors périmètre de #77.
- **Calendrier suisse** : Chancellerie fédérale « d'ici à la fin 2026 » contre Portail PME « printemps 2027 » : les deux sont cités dans S.
- **Sommaire mobile** : défaut du gabarit commun, corrigé par #84, non dupliqué ici.

### Points non établis

- Adoption formelle des lignes directrices de la Commission (non constatée au 06/10).
- Contenu actuel des pages Amazon et Légifrance citées (inaccessibles par script le 06/10 ; dernière lecture : 30/09).
- Statut exact du marquage invisible Zalando (la source mêle recommandation et exigence).
- Droits d'utilisation des illustrations générées ; ressemblance éventuelle de C0 avec une personne réelle.
- Comportement du `www` derrière Cloudflare (R4) et rendu de la Preview Vercel (SSO).

## 11. Checklist de contrôle humain de la Preview (Laurent)

Preview de la branche : `https://sysnext-git-ccr-e0a4796e-2p18xn-sebs-projects-ca1e93a7.vercel.app` (connexion Vercel). Désactiver la traduction automatique de Chrome sur les pages de-ch (piège B5).

1. **A FR, desktop** — `/fr/blog/ai-act-images-produit` : en-tête, encadré « L'essentiel », 4 tableaux lisibles, 6 figures avec légende, sommaire latéral (clic sur « Sept cas concrets »), FAQ (7) qui s'ouvre, liens vers B, C, D, S.
2. **A FR, mobile** — même URL : aucun défilement horizontal de la page ; tableaux défilant dans leur cadre ; sommaire repliable.
3. **B ou C, mobile** — `/fr/blog/mannequin-invisible-modele-virtuel-avatar` : en-tête (personne synthétique annoncée dans la note), tableau, figure bijoux, FAQ.
4. **D, desktop et mobile** — `/fr/blog/images-ia-metadonnees-marketplaces` : tableau IPTC / XMP / C2PA, bloc ExifTool sur fond sombre qui défile dans son cadre en mobile, sans élargir la page.
5. **S de-ch** — `/de-ch/blog/ki-bilder-e-commerce-schweiz` : texte entièrement allemand, « ss » sans « ß », liens Fedlex et admin.ch en allemand, sélecteur de langue vers FR et EN de S.
6. **Navigation** — depuis A FR : lien vers B, retour vers A depuis B ; sélecteur de langue de A vers `/en/blog/ai-act-product-images` et `/de-ch/blog/ai-act-produktbilder`.

Résultat à consigner : `PREVIEW_HUMAN_VERIFIED = YES | NO`, avec les écarts relevés.
