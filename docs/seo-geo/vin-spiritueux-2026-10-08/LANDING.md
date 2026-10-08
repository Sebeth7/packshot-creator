# Landing Vin & Spiritueux — copy, claims, visuels

`/fr/industrie/vin-spiritueux` · Wave 2 · 08/10/2026 · Claude de Laurent

**Statut : COPY READY FOR PREVIEW QA.** Ni publication validée, ni fusion autorisée (`GO_MERGE = NO`, `GO_PUBLICATION = NO`).

Rendu : `app/[lang]/industrie/[slug]/_components/HubVin.tsx` (fr ; en servi en français, `noindex`, D9). `/de-ch/branchen/wein` reste sur le gabarit commun. Texte : entrée `vin-spiritueux` de `data/secteurs.ts` et constantes du composant.

Préparation : rapport A–F et livrables L2–L6 du 08/10/2026 (hors dépôt, transmis à Laurent). Méthode : Standard Landings V1.1 de Laurent, non inscrit dans `DECISIONS.md`.

---

## 1. Copy intégrée

| Élément | Texte |
|---|---|
| Title (65 caractères) | Packshot bouteille de vin et spiritueux : studio photo automatisé |
| Meta description (152 caractères) | Photographiez vos bouteilles de vin et de spiritueux en interne : lumière réglée pour le verre et l’étiquette, rendu cohérent d’une référence à l’autre. |
| Surtitre | Vin et spiritueux |
| H1 | Packshot bouteille : photographier vins et spiritueux avec précision et cohérence |
| CTA principal | Demander une démonstration (→ `#demonstration`) |
| CTA secondaire | Voir les deux studios (→ `#studios`) |

H2, dans l'ordre :

1. Verre, liquide, étiquette : ce qu’une bouteille impose à la prise de vue
2. Comment éclairer une bouteille sans perdre l’étiquette
3. Une gamme cohérente, sous tous les angles
4. De la bouteille aux fichiers publiés
5. Deux studios pour photographier vos bouteilles
6. Questions sur la photographie de bouteilles
7. Parler de votre projet de photographie de bouteilles

Puis : lien existant vers F5, ressources du secteur (table `SECTOR_RESOURCES_MAP`), autres secteurs.

FAQ (6, FAQ visible = `FAQPage`) :

1. Comment photographier une bouteille de vin sans reflets parasites ?
2. Peut-on photographier des bouteilles de formats différents avec un rendu homogène ?
3. Comment montrer la contre-étiquette et la capsule ?
4. Le détourage d’une bouteille transparente est-il automatique ?
5. Faut-il un photographe pour utiliser le studio ?
6. L’IA peut-elle lire les informations de l’étiquette ?

Le texte complet est dans le code (source unique).

### Écarts avec la proposition L3

| Point | L3 | Version intégrée | Motif |
|---|---|---|---|
| Modèles | « Chaque nouvelle bouteille passe par le même réglage » | Base de capture cohérente, ajustée selon la forme, les dimensions, le verre et les finitions | Correction A |
| Éclairage | « jamais en lumière frontale directe » | « on privilégie une lumière diffuse : une lumière directe de face crée des reflets francs » ; ajout de la nuance sur les formes complexes | Correction B |
| XL G2 | « L’évolution de la gamme XL » | « Studio fermé de la gamme XL, conçu pour capturer les images et les données du produit dans le même cycle » ; critères de choix explicites | Correction C |
| AI Retoucher | « atténue les reflets » | « peut atténuer » ; « l’opérateur valide le résultat » | Correction D |
| Formation | Essential Training 4 h, Master Training 1 jour | « La formation de vos équipes est proposée séparément » ; aucune durée, aucun programme | Correction E (gouvernance Academy) |
| Démonstration | « Une première démonstration se fait en visioconférence » | « peut se faire » | Correction F |
| Vues de dessus | Support supérieur cité sans condition | « si le studio est équipé d’un support d’appareil photo supérieur » | Correction C |
| Matières | Quatre blocs, dont « Une gamme mêle les formats » | Quatre blocs alignés sur les quatre macros (verre clair, verre sombre, étiquette, capsule) ; les formats passent dans la section gamme | Intégration des visuels I2 |

---

## 2. Registre des claims

Niveaux : A = source constructeur actuelle (lue le 08/10/2026) ; B = source constructeur datée, dépôt ou décision.

| # | Affirmation | Source | Niveau |
|---|---|---|---|
| S1 | Distributeur officiel en France et en Suisse ; conseil, installation, formation | `messages/fr.json` l. 194 ; D6 (« officiel, jamais exclusif ») | B |
| S2 | Le verre renvoie la lumière et l’environnement ; poussière et traces visibles ; gants en coton | orbitvu.com/blog/how-photograph-glass-products-e-commerce (23/02/2021) | B |
| S3 | Reflet du plateau sur une bouteille sombre ; support surélevé | orbitvu.com/blog/product-photography-wine-bottles-alphashot-xl-wine (02/05/2016) | B |
| S4 | L’étiquette bloque le contre-jour et ressort plus sombre ; lumière dirigée vers l’étiquette | Article de 2021, « Method 3 » | B |
| S5 | Lumière diffuse ; lumière directe de face déconseillée ; contre-jour pour la transparence ; lumières latérales pour la forme ; formes complexes plus exigeantes ; surfaces sombres sur les côtés | Article de 2021 | B |
| S6 | Finitions d’étiquette, capsule, muselet, bouchon, formats de bouteilles | Page précédente (`problematiques.items`), reformulée sans claim | B |
| S7 | 170 panneaux LED pilotés en direction et en intensité ; chambre fermée à paroi courbe ; support bouteille en accessoire ; AI Photo Assistant, choix final à l’opérateur ; objet 60 × 40 × 70 cm (W × D × H) ; variante MDC ; images et données dans le même cycle ; prise en main après courte formation | orbitvu.com/products/alphashot-xl-g2 ; D45 `conforme` pour l’objet maximal | A |
| S8 | Supports transparents détectés et retirés ; IQ Mask par seconde exposition ; AI Mask ; un modèle par type de produit ; une correction appliquée à une série ; publication vers Shopify, Shopware, Magento, PrestaShop, WooCommerce | orbitvu.com/software/orbitvu-station | A |
| S9 | Support bouteille, kit antireflet, cache textile noir et modèle Station utilisés sur l’Alphashot XL Pro v2 pour des bouteilles en verre ; le logiciel pilote appareil, lumière et plateau | orbitvu.com/blog/honza-beer-challenge-… (15/05/2019) | B |
| S10 | Contenu d’un modèle (images, lumière, angles, appareil, ouverture, vitesse, IQ Mask) | Article de 2019 | B |
| S11 | Rotation de 6 à 180 images ; export HTML5 ou vidéo ; mode transparent | Captures des guides PSC (360°, objet transparent) | B |
| S12 | Support d’appareil photo supérieur pour les vues de dessus | orbitvu.com/products/alphashot-xl-g2 | A |
| S13 | AI Retoucher : reflets, imperfections, couleurs, sur la photo réelle ; reflets forts sur le verre : retouche manuelle possible | orbitvu.com/software/ai ; orbitvu.com/blog/ai-retoucher-remove-reflections-fix-blemishes (14/07/2026) | A |
| S14 | AI OCR : plusieurs vues, champs définis, prévisualisation | orbitvu.com/blog/what-is-ai-ocr-how-does-it-work (23/07/2026) | A |
| S15 | Fonctions IA réservées aux abonnements ; AI OCR et AI Retoucher annoncés en bêta en juin 2026 | Note Orbitvu Station 26.2 (23/06/2026) | A |
| S16 | XL Pro v2 recommandé pour les bouteilles | `lib/roiChat/systemPrompt.ts` l. 65 (règle de Sébastien, 07/08/2026) | B |
| S17 | Formation proposée séparément du studio | Fiches machines (« facturés séparément ») ; aucune durée ni programme repris | B |
| S18 | Démonstration en visioconférence ; showroom sur rendez-vous avec ses propres produits | `messages/fr.json` l. 621-641 (page Contact rendue) | B |
| S19 | Usages : fiche produit, catalogue, distributeurs, importateurs | Cas d’usage de la page précédente, sans chiffre | B |

### Retiré ou tenu hors de la page (HOLD)

| # | Point | Traitement |
|---|---|---|
| H1 | Alphashot XL Wine : disponibilité et remplacement non établis | Absente de la page |
| H2 | Dimensions et axes de l’XL Pro v2 (Q20.7) | Non affichés |
| H3 | Caractéristiques de l’XL Pro v2 propres au catalogue PSC (éclairages coulissants, laser, portes, 5 caméras) | Non affichées |
| H4 | Alphashot Pro G2 pour les bouteilles | Non mentionné |
| H5 | Statut bêta actuel d’AI OCR et d’AI Retoucher | « Annoncés en bêta en juin 2026 » |
| H6 | Exactitude de l’OCR sur des étiquettes de bouteille | Aucun taux ; vérification de l’opérateur |
| H7 | Provenance et droits des photos réelles de bouteilles présentes dans le dépôt | Aucune utilisée |
| H8 | Visuel propre à l’XL Pro v2 | Visuel partagé de la fiche (XL v2, même châssis, `10ade46`) |
| H9 | BlendAI, visuels d’ambiance générés | Retirés, sans remplacement |
| H10 | Cadences, ROI chiffré, délais, durée et gratuité de la démonstration, adresse du showroom | Retirés |

---

## 3. Visuels

Huit illustrations éditoriales générées par IA (outil natif ChatGPT), archive `PackshotCreator_Vin_Spiritueux_Wave2_Visuels.zip` fournie par Laurent le 08/10/2026 (`MANIFESTE.md`, `manifest.json`). Bouteilles et étiquettes fictives, aucune marque. Statut `EDITORIAL_ILLUSTRATION` : aucune image ne prouve une capacité, une performance ou un résultat d’un studio Orbitvu. Les PNG sources ne sont pas commités.

Conversion : AVIF qualité 80, chroma 4:4:4, dimensions natives, sans agrandissement (Pillow). Écart mesuré contre le PNG : PSNR de 41,1 à 48,2 dB ; aucune dégradation visible à 100 % sur le verre, la dorure et les reflets.

| ID | PNG source (SHA-256, 16 premiers caractères) | Fichier intégré | Dimensions | Octets | Emplacement | Légende affichée | Réserve conservée |
|---|---|---|---|---|---|---|---|
| I1 | `I1_hero_cinq_bouteilles.png` (`a4aae92e44e3b004`) | `vin-i1-hero-cinq-bouteilles.avif` | 1 536 × 1 024 | 132 038 | Hero, ≥ 768 px | Illustration générée par IA, bouteilles et étiquettes fictives. | Éléments imaginaires, pas des photographies d’un studio Orbitvu |
| I1-mobile | `I1_hero_mobile_4x5.png` (`931d9adb464f5820`) | `vin-i1-hero-mobile-4x5.avif` | 800 × 1 000 | 92 099 | Hero, < 768 px | Idem | Recadrage 4:5 de I1, sans nouvelle génération |
| I2-A | `I2-A_macro_capsule_metal.png` (`cfe48a867bb3b28a`) | `vin-i2-a-capsule-metal.avif` | 1 254 × 1 254 | 67 895 | Matières, « Capsule et col » | Illustration générée par IA, bouteilles et étiquettes fictives. (sous la grille) | Capsule à géométrie fictive |
| I2-B | `I2-B_macro_etiquette_texturee.png` (`c72094f96e1d59a5`) | `vin-i2-b-etiquette-texturee.avif` | 1 254 × 1 254 | 237 570 | Matières, « Étiquette » | Idem | Gaufrage et dorure simulés, non vérifiés sur support |
| I2-C | `I2-C_macro_verre_liquide_ambre.png` (`85b023209adf2c8d`) | `vin-i2-c-verre-liquide-ambre.avif` | 1 254 × 1 254 | 72 493 | Matières, « Verre clair et liquide » | Idem | Réfraction simulée, non mesurée |
| I2-D | `I2-D_macro_epaule_verre_sombre.png` (`40ef5472749e8f49`) | `vin-i2-d-epaule-verre-sombre.avif` | 1 254 × 1 254 | 23 048 | Matières, « Verre sombre » | Idem | Reflet principal plus large qu’un filet fin |
| I3 | `I3_coherence_collection_six_bouteilles.png` (`274a5dc4f5aadf0d`) | `vin-i3-gamme-six-bouteilles.avif` | 1 536 × 1 024 | 129 475 | Gamme | Illustration générée par IA, bouteilles et étiquettes fictives. Elle figure une présentation homogène, pas le résultat d’un réglage de studio. | Plus de deux silhouettes : pas une preuve de réglages identiques |
| I4 | `I4_vues_fiche_produit_quatre_panneaux.png` (`db9a1706f2bea9f7`) | `vin-i4-vues-fiche-produit.avif` | 1 536 × 1 024 | 80 092 | Vues | Illustration générée par IA, flacon et étiquettes fictifs. Vues conceptuelles, sans correspondance géométrique mesurée. | Quatre vues non contrôlées par un modèle 3D |

Textes alternatifs : dans `HubVin.tsx` (constantes `HERO`, `MATIERES`, `GAMME_VISUEL`, `VUES_VISUEL`).

Schémas :

- D1 : `SchemaEclairageBouteille.tsx`, SVG en ligne (`role="img"`, `<title>`, `<desc>`), repères numérotés et légende HTML. Vue de dessus : le support surélevé n’y figure pas. Légende : « Schéma de principe, vu de dessus. Les positions varient selon la bouteille et le studio. »
- D2 : liste ordonnée HTML de sept étapes, avec la mention « Opérateur » aux étapes où il intervient.

Preuves réelles toujours absentes (aucun emplacement rendu) : photo d’une bouteille sans marque tierce prise dans l’un des deux studios ; 360° de bouteille ; capture d’Orbitvu Station en mode transparent sur une bouteille neutre ; photo réelle de l’XL Pro v2.

---

## 4. Correctifs séparés, hors de cette landing

### P0-B — Gabarit commun (recommandation, non appliquée)

- Bouton « Comparer tous les modèles » illisible : variante `outline` = `bg-background` (blanc) avec `text-white`. `app/[lang]/industrie/[slug]/page.tsx` (bloc `CTA comparer`) et `app/[lang]/solutions/[slug]/page.tsx` (même bloc). Correctif proposé : `bg-transparent` dans les deux `className`.
- Blocs « Visuel solution » visibles : mise en page à deux solutions du gabarit des hubs (15 hubs sur 17).
- Rayon : 16 hubs FR et EN restant sur le gabarit, 8 hubs de-ch, 3 pages solutions. Gel : hub `mode-textile` jusqu’au 26/11 (D39). GO distinct de Laurent ; décision sur le gel Mode.
- Le composant vin n’hérite pas du défaut : son bouton est sur fond blanc, sans `text-white`.

### P0-C — `/industrie/bouteilles` (contrôle en lecture seule)

Selon le dépôt : 301 unique vers `/fr/industrie/vin-spiritueux` (règle générique `/industrie/*` du Worker et entrée `/fr/industrie/bouteilles`). À contrôler en production par Laurent, dans Chrome ou par requête HEAD (D23) : `/industrie/bouteilles`, `/fr/industrie/bouteilles`, `/de/branchen/flaschen`, `/en/sector/wine-spirits`, `/industrie/wine-spirits`. Aucune modification du Worker.
