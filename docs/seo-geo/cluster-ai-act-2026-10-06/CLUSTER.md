# Cluster AI Act — publication coordonnée de cinq articles en FR, EN et de-ch

Dossier de la mission « Finalisation et publication complète du cluster AI Act » du 06/10/2026 (Claude de Laurent). Décision : D46. Registre juridique : `REGISTRE-JURIDIQUE.md` (même dossier). Statut de publication à employer : `PUBLICATION_AUTHORIZED_BY_LAURENT`, jamais `VALIDATED_BY_SEBASTIEN`.

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
