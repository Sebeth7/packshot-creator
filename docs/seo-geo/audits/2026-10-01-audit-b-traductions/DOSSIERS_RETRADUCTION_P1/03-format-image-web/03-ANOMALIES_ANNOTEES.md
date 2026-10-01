# Anomalies annotées — famille 67dd331edc2f76e4765a968b

Base de contrôle : `01-TEXTE_ACTUEL.md` et les JSON `content/blog/<langue>/<slug>.json` sur `main` `17fc0b3` (01/10/2026). Chaque anomalie de la revue `reviews/67dd331edc2f76e4765a968b.json` a été vérifiée mot pour mot contre ces sources.

Gravités : **bloquant** (illisible ou dans la mauvaise langue), **majeur** (sens, fait, lien ou nom erroné), **mineur** (langue, typographie, style, métadonnée). La colonne « revue » indique : *confirmée*, *requalifiée*, *ajout* (absente de la revue).

## Bilan

| Langue | Anomalies | Bloquant | Majeur | Mineur | Dont ajouts à la revue |
|---|---|---|---|---|---|
| FR | 38 | 0 | 7 | 31 | 15 |
| EN | 54 | 4 | 18 | 32 | 19 |
| de-ch | 31 | 0 | 6 | 25 | 17 |
| **Total** | **123** | **4** | **31** | **88** | **51** |

Le décompte est plus élevé que l'estimation de la revue (13, 40, 11) parce que les claims, les liens, les textes alternatifs et les défauts transversaux y sont comptés comme des entrées distinctes.

### Retours sur la revue

- **Aucune anomalie de la revue n'est retirée** : toutes ont été retrouvées mot pour mot dans le texte servi.
- **Requalifiée — version d'Orbitvu Station (FR-23, EN-28, DE-20).** La revue parle de « contradiction interne ». Le corps dit « Depuis la version 24.1.0, Orbitvu Station propose l'export en AVIF » ; la FAQ n° 1 dit « Orbitvu Station 24.2.0 supporte désormais l'export **des présentations** en formats AVIF et WebP, aussi bien en local que vers Orbitvu SUN Cloud ». Les deux phrases peuvent être vraies ensemble (export d'images en AVIF en 24.1.0, export des présentations en AVIF et WebP en 24.2.0). C'est une incohérence apparente, à trancher sur les notes de version d'Orbitvu, pas une contradiction établie. Indice relevé : l'image principale de l'article montre l'écran de démarrage « Orbitvu Station 2024 – 24.1.0 Smooth Shadow », et le lien du corps cible un billet `orbitvu-station-2410-step-your-shadow-game` consacré aux ombres ; rien, hors ligne, ne permet de vérifier qu'il annonce l'export AVIF.
- **Requalifiée — description FR (FR-07).** La revue écrit que le corps « ne traite pas l'impact sur les ventes ». Le chapeau le traite, mais seulement sur le plan qualitatif (« Optimiser ses images, c'est optimiser ses ventes », « levier de performance commerciale ») : aucune donnée. La promesse « Comparatif complet » reste, elle, non tenue.
- **Précision — images EN.** La revue note que les fichiers image EN diffèrent de ceux du FR (« même contenu supposé, non vérifié »). Vérifié : empreintes MD5 identiques deux à deux (`67dedf2eaf5ef558512ef84f` = `67dbae6e74e3ee07a6f4fd76`, `67dedf2eaf5ef558512ef852` = `67dbae6e74e3ee07a6f4fd79`, `67dbae6f3caa81895e35e498` = `67dd321935817184385715d4`, image principale `67dedf2faf5ef558512ef862` = `67dd2ff25622e5086d8a6d85`). Les textes alternatifs proposés valent donc pour les deux jeux de fichiers.
- **Précision — FAQ EN.** La revue la juge « correcte » ; elle l'est pour l'essentiel, mais garde « natural referencing (SEO) » et « in 2025 » (EN-52).

---

## FR — /fr/blog/quel-format-d-image-pour-le-web

### Défauts transversaux

**FR-01 · corps · structure · mineur · ajout**
- Extrait : `<p id="">‍</p>` (caractère invisible U+200D), six fois, avant et après chacune des trois figures.
- Explication : paragraphes vides hérités de Webflow, utilisés comme espacement ; ils n'ont aucun contenu et alourdissent le DOM.
- Correction retenue : non reproduits dans la proposition. À décider à la conversion HTML (supprimer, ou remplacer par une marge CSS de la figure).

**FR-02 · intertitres · structure HTML · mineur · ajout**
- Extrait : `<h2 id=""><strong id="">Les formats d’image les plus utilisés pour le web</strong></h2>` (même schéma pour les 8 intertitres du corps).
- Explication : `<strong>` à l'intérieur d'un intertitre est redondant (l'intertitre est déjà en gras) ; c'est un réflexe de mise en forme Webflow.
- Correction retenue : intertitres sans `<strong>`.

**FR-03 · tout le texte · typographie · mineur · ajout**
- Extrait : « quel format d'image » (title, h1, metaTitle), « À propos de l'auteur », « Article publié à l'origine », « l'export des présentations » (FAQ 1), « les formats d'images » (FAQ 2), contre « d’image », « l’univers », « l’export en AVIF » dans le corps.
- Explication : apostrophes droites et typographiques mélangées.
- Correction retenue : apostrophe typographique (’) partout dans la proposition, métadonnées comprises.

**FR-04 · corps et FAQ · calque (anglicisme) · mineur · revue : confirmée et complétée**
- Extraits : « support de la transparence » ; « Il est supporté par la plupart des navigateurs modernes » ; « tout en supportant la transparence » ; FAQ : « Quels sont les nouveaux formats supportés par Orbitvu ? », « Orbitvu Station 24.2.0 supporte désormais », « lorsque le navigateur le supporte », « si votre CMS le supporte » (7 occurrences ; la revue en citait 3).
- Explication : « supporter » au sens anglais de *to support* ; le français dit « prendre en charge », « gérer ».
- Correction retenue : « gestion de la transparence », « La plupart des navigateurs modernes le prennent en charge », « tout en gérant la transparence », « pris en charge », « permet désormais d’exporter », « le prend en charge » (×2).

### Métadonnées

**FR-05 · title et h1 · typographie · mineur · revue : confirmée**
- Extrait : « JPEG, PNG, RAW, WebP : Quel format d'image pour le web ? »
- Explication : majuscule après deux-points, fautive en français quand la suite n'est pas une citation ni un nom propre. Le titre n'annonce pas AVIF, que l'article traite (observation, non corrigée : voir 06, point 12).
- Correction retenue : « JPEG, PNG, RAW, WebP : quel format d’image pour le web ? »

**FR-06 · metaTitle · incohérence SEO · mineur · revue : confirmée**
- Extrait : « Quel format d'image pour le web : JPEG, WebP, AVIF ? »
- Explication : PNG, traité dans le corps et pertinent pour la transparence, n'apparaît pas.
- Correction retenue : « Quel format d’image pour le web : JPEG, PNG, WebP, AVIF ? » (57 caractères ; voir 05).

**FR-07 · description · claim non tenu · mineur · revue : requalifiée**
- Extrait : « JPEG, WebP ou AVIF pour vos photos produits ? Comparatif complet : poids, qualité, compatibilité navigateurs et impact sur vos ventes en ligne. »
- Explication : le corps (536 mots) présente cinq formats en un paragraphe chacun : ce n'est pas un « comparatif complet ». L'« impact sur vos ventes » n'est abordé que qualitativement dans le chapeau. PNG absent.
- Correction retenue : nouvelle description sans « comparatif complet » ni « impact sur vos ventes » (149 caractères ; voir 05). Claim retiré : listé dans 06, point 11.

**FR-08 · date et ligne de crédit · cohérence de datation · mineur · ajout**
- Extraits : `date` = « 2024-02-08 » ; « Article publié à l'origine par PackshotCreator en février 2024 ».
- Explication : le texte cite Orbitvu Station 24.1.0 et 24.2.0 (versions « 2024 », d'après l'écran de démarrage de l'image principale) et une FAQ « en 2025 » ; l'item Webflow `67dd331e…` a été créé le 21/03/2025 et les images du corps le 20 et le 21/03/2025 (horodatage des identifiants ObjectId, inférence). Le texte servi semble donc dater de mars 2025, sur une première publication possible en février 2024 (d'anciennes versions ES, NL et DE existaient : redirections du Worker `/es/blog/que-formato-para-wweb`, `/blog/welk-beeldformaat-voor-het-web`).
- Correction retenue : aucune (date et mention conservées). Question d'historique posée à Laurent : 06, point 15.

**FR-09 · dateModified · métadonnée · mineur · revue : confirmée**
- Extrait : `dateModified` vide, alors que l'encart annonce « mis à jour le 7 mai 2026 par Sébastien Jourdan ».
- Explication : le JSON-LD `Article` est servi sans `dateModified` ; la mise à jour affichée n'est pas déclarée aux moteurs.
- Correction retenue : renseigner `dateModified` (voir 05 ; décision 06, point 16).

### Corps

**FR-10 · intertitre d'ouverture · structure · mineur · ajout**
- Extrait : « Optimiser ses images, c’est optimiser ses ventes » est un H3 placé avant le premier H2.
- Explication : hiérarchie H1 → H3 → H2 ; sans gravité pour le rendu, imparfaite pour l'accessibilité et le plan du document.
- Correction retenue : aucune (niveau conservé pour garder la structure ; passage en H2 possible, voir 06, point 12).

**FR-11 · chapeau · grammaire · mineur · revue : confirmée**
- Extrait : « Dans l’univers du e-commerce et de la photographie de produits »
- Explication : élision attendue devant voyelle.
- Correction retenue : « Dans l’univers de l’e-commerce et de la photographie de produits ».

**FR-12 · chapeau · typographie · mineur · ajout**
- Extrait : « entre JPEG, PNG, WebP, et le récent AVIF »
- Explication : pas de virgule avant le « et » final d'une énumération en français.
- Correction retenue : « entre JPEG, PNG, WebP et le récent AVIF ».

**FR-13 · alt image RAW · texte alternatif · mineur · ajout**
- Extrait : `alt="format d'image RAW"` (`/images/blog/67dbae6e74e3ee07a6f4fd76.avif`)
- Explication : ne décrit pas l'image (capture d'un logiciel de développement RAW : pick-up Chevrolet bleu et panneau de réglages « RAW Fine Tuning »).
- Correction retenue : « Développement d’un fichier au format RAW : photo d’un pick-up Chevrolet bleu et panneau de réglages du logiciel » (garde « format RAW »).

**FR-14 · section RAW · fait technique · majeur · ajout**
- Extrait : « Le format RAW contient l’ensemble des données d’image capturées par le capteur de l’appareil photo, sans compression ni traitement. »
- Explication : « sans compression » est inexact en général : de nombreux formats RAW sont compressés, sans perte (DNG, la plupart des NEF et CR2) ou même avec perte selon les boîtiers (C-RAW de Canon, RAW compressé de Sony ou de Nikon). Ce qui définit le RAW, c'est l'absence de développement (dématriçage, balance des blancs, etc.). Erreur certaine, corrigée a minima.
- Correction retenue : « Le format RAW contient l’ensemble des données brutes enregistrées par le capteur de l’appareil photo, avant tout traitement. » Signalé dans 06, point 10.

**FR-15 · section RAW · calque · mineur · revue : confirmée**
- Extrait : « Il offre une souplesse maximale pour l’édition »
- Explication : « édition » au sens anglais d'*editing*.
- Correction retenue : « Il offre une souplesse maximale en post-traitement ».

**FR-16 · section RAW · construction · mineur · revue : confirmée**
- Extrait : « mais ne convient jamais pour une diffusion en ligne en raison de son poids élevé et de son incompatibilité avec les navigateurs »
- Explication : « convenir à », pas « convenir pour » ; « son poids élevé » pour un format (c'est le fichier qui pèse).
- Correction retenue : « mais ne convient jamais à une diffusion en ligne, en raison du poids de ses fichiers et de son incompatibilité avec les navigateurs ».

**FR-17 · sections RAW, JPEG, PNG, WebP · claims produit · majeur · revue : confirmée**
- Extraits : « Les studios Orbitvu capturent en très haute qualité, puis traitent les images en local avant de les exporter automatiquement dans des formats optimisés pour le web. » ; « Les studios Orbitvu permettent de régler automatiquement le niveau de compression en fonction de vos objectifs » ; « Les studios Orbitvu exportent en PNG uniquement lorsque la transparence est essentielle. » ; « Les studios Orbitvu gèrent cela automatiquement, avec un double export WebP + JPEG si nécessaire. »
- Explication : fonctions produit présentées comme acquises, sans source dans le texte ; conservées par Sébastien lors du nettoyage du 07/05/2026.
- Correction retenue : conservées sans renforcement (reformulation de surface seulement). Validation : 06, point 5.

**FR-18 · alt image JPEG · mélange linguistique · mineur · ajout**
- Extrait : `alt="JPEG compression Example"` (`/images/blog/67dbae6e74e3ee07a6f4fd79.avif`)
- Explication : texte alternatif en anglais (repris du nom du fichier Wikimedia) sur la page française.
- Correction retenue : « Exemple de compression JPEG : deux versions côte à côte de la même photo d’un oiseau perché sur une branche ». La proposition ne dit pas laquelle des deux moitiés est la plus compressée : ce n'est pas établi.

**FR-19 · section JPEG · phrase confuse · mineur · revue : confirmée**
- Extrait : « Il est toutefois à utiliser avec modération dans la compression pour éviter une dégradation de l’image. »
- Explication : c'est la compression qu'il faut doser, pas le format.
- Correction retenue : « Sa compression est toutefois à doser avec soin : trop poussée, elle dégrade l’image. »

**FR-20 · section JPEG · construction · mineur · ajout**
- Extrait : « en fonction de vos objectifs : qualité visuelle ou vitesse de chargement prioritaire »
- Explication : « prioritaire » ne porte que sur le second terme ; l'alternative est boiteuse.
- Correction retenue : « selon votre priorité : la qualité visuelle ou la vitesse de chargement ».

**FR-21 · section WebP · anglicisme · mineur · revue : confirmée**
- Extrait : « Pour les navigateurs plus anciens, un fallback JPEG est recommandé. »
- Explication : « fallback » : le français dit « version de repli ».
- Correction retenue : « pour les navigateurs plus anciens, il est recommandé de prévoir une version JPEG de repli ».

**FR-22 · section WebP · observation technique · mineur · ajout**
- Extrait : « Il est supporté par la plupart des navigateurs modernes. »
- Explication : en 2026, tous les grands navigateurs actuels lisent le WebP ; « la plupart » sous-estime sans être faux.
- Correction retenue : sens conservé (« La plupart des navigateurs modernes le prennent en charge ») ; pas d'erreur certaine, donc pas de correction de fond.

**FR-23 · section AVIF · fait produit · majeur · revue : requalifiée**
- Extrait : « Depuis la version 24.1.0, Orbitvu Station propose l’export en AVIF. »
- Explication : voir « Retours sur la revue » : incohérence apparente avec la FAQ n° 1 (24.2.0, export des présentations), pas contradiction établie.
- Correction retenue : conservé, marqué `[À VALIDER]` ; 06, point 3.

**FR-24 · section AVIF · usage · mineur · ajout**
- Extrait : « aux exigences futures en termes de performances et de SEO »
- Explication : « en termes de » au sens de « en matière de » est critiqué par l'usage soigné.
- Correction retenue : « en matière de performances et de SEO ».

**FR-25 · section AVIF · claim daté · mineur · revue : confirmée**
- Extrait : « Ce format est en cours d’adoption et constitue une avance stratégique pour ceux qui veulent préparer leur site aux exigences futures »
- Explication : affirmation à revalider au moment de republier (AVIF est désormais lu par les principaux navigateurs ; l'adoption côté CMS et outils reste partielle).
- Correction retenue : conservé tel quel. 06, point 8.

**FR-26 · alt image 3 · texte alternatif · majeur · revue : confirmée**
- Extrait : `alt="__wf_reserved_inherit"` (`/images/blog/67dd321935817184385715d4.avif`)
- Explication : valeur réservée Webflow servie comme texte alternatif. L'image est un schéma en anglais : « Scan barcode », « Capture », « Remove Background », « Post-process », « Replace Background », « Crop », « Align », « Scale », « Output results — Save or publish directly on-line ».
- Correction retenue : « Schéma d’un flux de production automatisé : scan du code-barres, prise de vue, suppression ou remplacement du fond, recadrage, alignement, mise à l’échelle, puis enregistrement ou publication en ligne ». Le schéma ne porte pas le nom d'Orbitvu : l'alt ne l'attribue pas (06, point 20).

**FR-27 · Ressources · lien · mineur · ajout**
- Extrait : « Pour un guide complet sur les formats d’image, consultez The CSS Agency. » → `https://thecssagency.com/`
- Explication : le lien mène à la page d'accueil d'une agence, pas à un guide sur les formats d'image.
- Correction retenue : conservé (même cible). 06, point 19.

**FR-28 · Ressources · lien erroné · majeur · revue : confirmée**
- Extrait : « Pour des conseils sur l’optimisation des images, visitez Cloudinary. » → `https://thecssagency.com/`
- Explication : l'ancre « Cloudinary » pointe vers la même cible que « The CSS Agency ». Erreur présente dans les trois langues depuis l'import Webflow.
- Correction retenue : cible conservée, phrase marquée `[À VALIDER]` (corriger la cible ou supprimer la phrase) ; « visitez » devient « rendez-vous sur ». 06, point 4.

**FR-29 · encart auteur · claim biographique · mineur · revue : confirmée**
- Extrait : « Sébastien Jourdan est directeur de PackshotCreator – Sysnext, fondateur de blendai.studio et photographe spécialisé en photographie packshot depuis plus de 20 ans. »
- Explication : donnée biographique non sourcée dans le texte, à confirmer par l'intéressé.
- Correction retenue : conservé tel quel. 06, point 17.

**FR-30 · encart auteur · lien · mineur · revue : confirmée**
- Extrait : ancre « blendai.studio » → `/fr/ia-photo-produit`
- Explication : l'ancre annonce un domaine externe, le lien mène à une page interne.
- Correction retenue : conservé. 06, point 18.

**FR-31 · encart auteur · appellation (nom de personne) · majeur · revue : confirmée**
- Extrait : « Article publié à l'origine par PackshotCreator en février 2024 — mis à jour le 7 mai 2026 par Sébastien Jourdan. »
- Explication : le commit `586bf083` (07/05/2026, Sébastien) avait écrit « Laurent Wainberg », conformément à son message (« crédit Laurent Wainberg comme auteur original ») ; le commit `8ae45f63` (12/06/2026, « auteur générique PackshotCreator sur les articles migrés ») a remplacé le nom. La version importée de Webflow avait pour auteur « Laurent Wainberg ».
- Correction retenue : « Article publié à l’origine par Laurent Wainberg en février 2024 — mis à jour le 7 mai 2026 par Sébastien Jourdan. » 06, point 1.

### FAQ

**FR-32 · FAQ 1 · grammaire · mineur · ajout**
- Extrait : « l'export des présentations en formats AVIF et WebP » ; « Ces formats nouvelle génération »
- Explication : « aux formats » ; « de nouvelle génération ».
- Correction retenue : « permet désormais d’exporter les présentations aux formats AVIF et WebP, en local comme vers Orbitvu SUN Cloud. Ces formats de nouvelle génération… ».

**FR-33 · FAQ 2 · grammaire et claim · mineur · revue : confirmée (claim)**
- Extrait : « bascule automatiquement vers le JPEG ou PNG si nécessaire. Cette approche garantit une compatibilité universelle. »
- Explication : article manquant devant « PNG » ; « garantit une compatibilité universelle » est une promesse produit sans source.
- Correction retenue : « vers le JPEG ou le PNG » ; promesse conservée. 06, point 5.

**FR-34 · FAQ 3 (question) · date figée · mineur · revue : confirmée**
- Extrait : « Quel est le meilleur format d’image pour un site e-commerce en 2025 ? »
- Explication : année dépassée dans un article mis à jour en 2026.
- Correction retenue : « Quel est aujourd’hui le meilleur format d’image pour un site e-commerce ? » 06, point 9.

**FR-35 · FAQ 3 (réponse) · ponctuation et claim · mineur · revue : confirmée (claim)**
- Extrait : « entre qualité visuelle, poids réduit, et vitesse de chargement. Il améliore également le référencement naturel (SEO). »
- Explication : virgule avant « et » ; effet SEO direct affirmé sans source (l'effet passe par la vitesse d'affichage).
- Correction retenue : « entre qualité visuelle, poids réduit et vitesse de chargement. En accélérant l’affichage des pages, il contribue aussi au référencement naturel (SEO). » : formulation plus prudente, pas de renforcement. 06, point 7.

**FR-36 · FAQ 4 (question) · grammaire · mineur · revue : confirmée**
- Extrait : « Pourquoi mes images produits ralentissent mon site web ? »
- Explication : interrogation directe sans reprise du sujet.
- Correction retenue : « Pourquoi mes images produits ralentissent-elles mon site web ? »

**FR-37 · FAQ 4 (réponse) · claims chiffrés · majeur · revue : confirmée**
- Extrait : « Dans 90 % des cas, c’est parce qu’elles sont trop lourdes ou mal compressées. Des formats comme le PNG (utilisé à tort) ou des JPEG non optimisés peuvent doubler le temps de chargement d’une page. Grâce aux studios Orbitvu, vos visuels sont automatiquement exportés dans le format idéal »
- Explication : statistique et ordre de grandeur sans source ; « le format idéal » est absolu.
- Correction retenue : chiffres conservés tels quels ; « Un PNG utilisé à tort ou des JPEG non optimisés » ; « dans le format le plus adapté » (atténuation). 06, point 6.

**FR-38 · FAQ 5 · sujet imprécis · mineur · ajout**
- Extrait : « Le format AVIF offre une compression plus puissante que WebP » ; « Depuis la version 24.1.0, Orbitvu prend en charge l’export AVIF. »
- Explication : « Orbitvu » (la société) pour le logiciel Orbitvu Station, alors que le corps dit « Orbitvu Station » ; « plus puissante » pour une compression (on dit « plus poussée », « plus efficace »).
- Correction retenue : « une compression plus poussée » ; « Depuis la version 24.1.0, Orbitvu Station prend en charge l’export AVIF. » Version : 06, point 3.

---

## EN — /en/blog/best-image-format-for-the-web

Verdict d'ensemble : traduction automatique d'une version FR antérieure au 07/05/2026, jamais réalignée. **Correction retenue pour toutes les entrées EN : retraduction intégrale depuis `04-PROPOSITION_FR.md`** ; la colonne « correction » indique la formulation retenue dans `04-PROPOSITION_EN.md`.

### Défauts transversaux

**EN-01 · corps · structure · mineur · ajout** — Paragraphes vides `‍` autour des trois figures et `<strong>` dans les 14 intertitres, comme en FR (FR-01, FR-02). Correction : non reproduits.

**EN-02 · corps · majuscules parasites · majeur · revue : confirmée** — « And of the », « One Product image Poor quality », « AVIF Offer a », « performances And of SEO », « ergonomic improvements And technical fixes », « product photography Or a professional photographer ». Explication : capitales de traduction automatique au milieu des phrases. Correction : retraduction.

**EN-03 · corps · calque · mineur · revue : confirmée** — « The format RAW », « The format JPEG », « The format PNG », « The format WebP », « The format AVIF ». Explication : ordre des mots français (« le format JPEG »). Correction : « The RAW format », puis « JPEG », « PNG », « WebP », « AVIF » seuls.

### Métadonnées

**EN-04 · title et h1 · SEO et langue · mineur · ajout** — « JPEG, PNG, RAW, WebP: What image format for the web? ». Explication : question elliptique calquée sur le FR ; la requête principale « best image format for web » (572 impressions, position 19,8) n'y figure pas, alors qu'elle est dans le slug. Correction : « JPEG, PNG, RAW, WebP: What's the best image format for the web? » (06, point 14).

**EN-05 · metaTitle · incohérence SEO · mineur · revue : confirmée** — « Web image formats: the guide to product photography ». Explication : traduit de l'ancien metaTitle FR (avant le 07/05/2026) ; ne correspond ni au H1 ni au FR actuel ; promet un guide de photographie produit. Correction : « Best image format for the web: JPEG, PNG, WebP or AVIF? » (05).

**EN-06 · description · calque et décalage · mineur · ajout** — « Discover the best image formats (JPEG, WebP, AVIF...) for product, commercial and e-commerce photography. Optimize quality, weight and SEO. ». Explication : traduite de l'ancienne description FR ; « weight » pour « poids » (taille de fichier). Correction : nouvelle description (05).

**EN-07 · author · appellation · majeur · ajout** — `author` = « PackshotCreator » (import : « Laurent Wainberg » ; FR et de-ch : « Sébastien Jourdan »). Explication : nom de personne remplacé par la marque (commit `4dde4f23`, 12/06/2026) ; auteur différent selon la langue. Correction : « Sébastien Jourdan », aligné sur le FR, avec Laurent Wainberg crédité dans l'encart (06, points 1 et 2).

**EN-08 · date et dateModified · métadonnée · mineur · ajout** — mêmes constats que FR-08 et FR-09. Correction : voir 05 et 06, points 15 et 16.

### Corps

**EN-09 · chapeau · traduction automatique · majeur · revue : confirmée** — « In the universe of e-commerce And of the product photography, every visual detail influences the act of purchase. » Correction : « In e-commerce and product photography, every visual detail influences the buying decision. »

**EN-10 · chapeau · traduction automatique · majeur · revue : confirmée** — « One Product image Poor quality, too slow to load, or poorly adapted to mobile displays can scare a customer away in a split second. » Correction : « A poor-quality product image that loads too slowly or displays badly on mobile can drive a customer away in a split second. »

**EN-11 · chapeau · agrammatical · majeur · revue : confirmée** — « The choosing the image format is therefore not a secondary technical decision: it is a commercial performance lever. » Correction : « Choosing an image format is therefore not a minor technical decision: it is a lever for business performance. »

**EN-12 · chapeau · incompréhensible · majeur · revue : confirmée** — « But then, come in JPEG, PNG, WebP, and the recent AVIF, which one should you choose for your product visuals? » Explication : « come in » est un calque déformé de « entre ». Correction : « So, between JPEG, PNG, WebP and the newer AVIF, which one should you choose for your product visuals? »

**EN-13 · H2 · usage · mineur · ajout** — « The most used image formats for the web ». Explication : « most used » est maladroit ; la requête « web image format » (429 impressions, position 9,2) peut y figurer naturellement. Correction : « The most widely used web image formats ».

**EN-14 · alt image RAW · mélange linguistique · mineur · revue : confirmée** — `alt="format d'image RAW"`. Correction : « Processing a RAW file: photo of a blue Chevrolet pickup truck with the editing software's adjustment panel ».

**EN-15 · section RAW · calque et fait technique · majeur · ajout** — « The format RAW contains all image data captured by the camera sensor, without compression or processing. » Explication : calque, et même inexactitude technique que FR-14. Correction : « The RAW format contains all the unprocessed data recorded by the camera's sensor. »

**EN-16 · section RAW · agrammatical · mineur · revue : confirmée** — « It offers a maximum editing flexibility, but never suitable for a online broadcast due to its heavy weight and its incompatibility with browsers. » Explication : verbe manquant, « a online », « broadcast » pour « diffusion en ligne ». Correction : « It offers maximum flexibility in post-processing but is never suitable for online publishing, because the files are large and browsers cannot display them. »

**EN-17 · section RAW · mélange linguistique · bloquant · revue : confirmée** — « Les Orbitvu Studios capture the images in very high quality, then process the images locally before automatically exporting them to formats optimized for the web. » Explication : déterminant français. Correction : « Orbitvu studios capture in very high quality, then process the images locally before automatically exporting them to web-optimized formats. » Claim produit : 06, point 5.

**EN-18 · H3 JPEG · calque · mineur · ajout** — « JPEG — the effective classic ». Explication : « efficace » rendu par « effective » (qui produit l'effet voulu) au lieu d'« efficient ». Correction : « JPEG — the efficient classic ».

**EN-19 · alt image JPEG · texte alternatif · mineur · ajout** — `alt="JPEG compression Example"`. Explication : capitale fautive, non descriptif. Correction : « JPEG compression example: two side-by-side versions of the same photo of a bird perched on a branch ».

**EN-20 · section JPEG · traduction automatique · majeur · revue : confirmée** — « He is slight, widely compatible and offers a good compromise between quality and weights. » Correction : « It is lightweight, widely compatible and offers a good balance between quality and file size. »

**EN-21 · section JPEG · phrase confuse · mineur · ajout** — « However, it should be used sparingly in compression to avoid image degradation. » Explication : reprend la confusion du FR (FR-19). Correction : « Its compression should be applied with care, though: pushed too far, it degrades the image. »

**EN-22 · section JPEG · calque · mineur · revue : confirmée** — « Orbitvu studios allow you to automatically adjust the compression level according to your goals: visual quality or priority loading speed. » Correction : « Orbitvu studios let you set the compression level automatically according to your priority: visual quality or loading speed. »

**EN-23 · section PNG · faux ami métier · majeur · revue : confirmée** — « (logos, cropped images) and to keep a sharp image thanks to his lossless compression. » Explication : « images détourées » rendu par « cropped » (recadrées) : contresens ; « his » pour un format. Correction : « (logos, cut-out images) and for keeping images sharp, thanks to its lossless compression. »

**EN-24 · section PNG · style · mineur · ajout** — « Its main disadvantage: heavier files, so slower to load. » Correction : « Its main drawback: larger files, which take longer to load. »

**EN-25 · H3 WebP · gallicisme · mineur · ajout** — « WebP — the web format par excellence ». Explication : correct mais affecté en anglais américain. Correction : « WebP — the web format of choice ».

**EN-26 · section WebP · calque · mineur · ajout** — « combines effective compression » ; « with a double WebP + JPEG export if required ». Correction : « efficient compression » ; « a dual WebP + JPEG export when needed ».

**EN-27 · section AVIF · traduction automatique · majeur · revue : confirmée** — « The format AVIF Offer a even more powerful compression than WebP, while supporting the transparency and by maintaining a very high visual quality. » Correction : « AVIF offers even more efficient compression than WebP, while supporting transparency and preserving very high visual quality. »

**EN-28 · section AVIF · grammaire et fait produit · majeur · revue : requalifiée** — « Since the version 24.1.0, Orbitvu Station offers export to the AVIF format. » Explication : article superflu, temps (« has offered ») ; version à vérifier (FR-23). Correction : « Since version 24.1.0, Orbitvu Station has offered AVIF export. » 06, point 3.

**EN-29 · section AVIF · calque · mineur · revue : confirmée** — « This format is in the process of being adopted and constitutes a strategic advance for those who want to prepare their site for future requirements in terms of performances And of SEO. » Explication : « performances » au pluriel, « And of », « strategic advance » pour « avance stratégique ». Correction : « The format is still being adopted and gives a strategic head start to anyone who wants to prepare their site for future performance and SEO requirements. » Claim daté : 06, point 8.

**EN-30 · alt image 3 · texte alternatif · majeur · revue : confirmée** — `alt="__wf_reserved_inherit"` (`/images/blog/67dbae6f3caa81895e35e498.avif`). Correction : « Diagram of an automated production workflow: barcode scan, capture, background removal or replacement, crop, alignment, scaling, then saving or publishing online ».

### Bloc Orbitvu supprimé du FR le 07/05/2026 (EN-31 à EN-46)

**EN-31 · bloc entier · structure · majeur · revue : confirmée** — Sections « Orbitvu: a software in continuous improvement » et « Orbitvu support: personalized and responsive support » (2 H2, 4 H3, 3 puces, environ 420 mots). Explication : bloc promotionnel retiré du FR par Sébastien (commit `586bf083`), resté en EN. Correction : **non repris** (l'EN suit le FR). Claims retirés listés dans 06, point 13.

**EN-32 · H2 · grammaire · mineur · revue : confirmée** — « Orbitvu: a software in continuous improvement » (« software » est indénombrable). Correction : bloc non repris.

**EN-33 · paragraphe · mélange linguistique · bloquant · revue : confirmée** — « Les Orbitvu Studios are equipped with a automated photography software which is constantly evolving. » Correction : bloc non repris.

**EN-34 · paragraphe · calque et claim · mineur · revue : confirmée** — « The solution Orbitvu Station is the subject of several updates per year, bringing new features, of ergonomic improvements And technical fixes. » Claim : « plusieurs mises à jour par an ». Correction : bloc non repris.

**EN-35 · paragraphe · claim · mineur · ajout** — « This ensures that your commercial photography studio stays up to date, without requiring frequent hardware replacement. You are investing in a sustainable technology, which is improving over time and continuously adapting to web standards. » Correction : bloc non repris.

**EN-36 · H2 · répétition · mineur · ajout** — « Orbitvu support: personalized and responsive support ». Correction : bloc non repris.

**EN-37 · paragraphe · traduction automatique et claim · majeur · revue : confirmée** — « One of the strengths ofOrbitvu resides in his exceptional customer support, designed to support users at every stage of their journey. » Explication : mots collés, « his » pour une entreprise, superlatif promotionnel. Correction : bloc non repris.

**EN-38 · paragraphe · grammaire · mineur · ajout** — « Whether you are a novice in product photography Or a professional photographer, Orbitvu is committed to offering you a quality support, adapted to your specific needs. » (« a quality support » : indénombrable). Correction : bloc non repris.

**EN-39 · liste · typographie et claim · mineur · revue : confirmée** — « Email and phone support : direct contact with the Orbitvu team, available in several countries. » (espace avant les deux-points dans les trois puces ; claim « available in several countries »). Correction : bloc non repris.

**EN-40 · liste · construction · mineur · revue : confirmée** — « Blog and educational resources : articles and tips for progressing in Packshot photography, optimize your workflows and enrich your skills. » Correction : bloc non repris.

**EN-41 · lien · langue et graphie · mineur · ajout** — « Packshot*Creator* offers personalized training » → `/fr/academy` (page FR depuis l'EN ; « Creator » en italique, graphie non conforme à « PackshotCreator »). Correction : bloc non repris.

**EN-42 · paragraphe · fait (lieu) · majeur · revue : confirmée** — « Near Lyon, the Orbitvu Experience Center allows you to test the equipment, attend demonstrations, and discuss with experts on best practices in commercial photography. » Explication : lieu modifié le 12/06/2026 (commit `4dde4f23`, purge des anciennes coordonnées) ; version importée : « TO Levallois-Perret » ; FR importé : « À Levallois-Perret ». Correction : bloc non repris ; fait à confirmer si le bloc devait revenir (06, point 13).

**EN-43 · paragraphe · mots collés · mineur · revue : confirmée** — « The Orbitvu technical support intervenes when necessary to ensure the installation, configuration andoptimizing your studios. » Correction : bloc non repris.

**EN-44 · paragraphe · mélange linguistique · bloquant · revue : confirmée** — « Les regular software updates ensure that your tools remain compatible with current e-commerce photography standards. » Correction : bloc non repris.

**EN-45 · paragraphe · claim · mineur · revue : confirmée** — « This proactive approach limits interruptions and maximizes the lifespan of your investment. » Correction : bloc non repris.

**EN-46 · paragraphe · agrammatical · bloquant · revue : confirmée** — « Their support team is at your side for maximize your productivity, speed up your production flows and guarantee the quality of your e-commerce visuals, day after day. » ; « For a demonstration or a personalized advice in product photography, contact us via our online form or go to theExperience Center. » Correction : bloc non repris.

### Ressources, encart, FAQ

**EN-47 · Ressources · lien erroné · majeur · revue : confirmée** — « For tips on optimizing images, visit Cloudinary. » → `https://thecssagency.com/` (FR-28). Correction : cible conservée, `[À VALIDER]` ; 06, point 4.

**EN-48 · Ressources · liens · mineur · revue : confirmée** — « read this article by Etowline » → article en français ; « For a complete guide to image formats, see The CSS Agency » → page d'accueil (FR-27). Correction : « (in French) » ajouté après l'ancre Etowline ; cibles conservées. 06, point 19.

**EN-49 · encart auteur · structure · majeur · revue : confirmée** — Encart « About the author » absent. Correction : ajouté, traduit du FR (06, points 1, 2 et 17).

**EN-50 · FAQ 1 · calque · mineur · ajout** — « What are the new formats supported by Orbitvu? » ; « These new generation formats allow optimal compression while maintaining image quality. » Correction : « What new formats does Orbitvu support? » ; « These next-generation formats provide optimal compression while preserving image quality. »

**EN-51 · FAQ 2 · claim · mineur · revue : confirmée** — « The Orbitvu SUN service intelligently manages image formats by using WebP when the browser supports it [...] This approach ensures universal compatibility. » Correction : « it serves WebP when the browser supports it and automatically falls back to JPEG or PNG when needed » ; promesse conservée (06, point 5).

**EN-52 · FAQ 3 · date figée et calque · mineur · revue : confirmée** — « What is the best image format for an e-commerce site in 2025? » ; « It also improves natural referencing (SEO). » Correction : « What is the best image format for an e-commerce site today? » ; « By making pages load faster, it also contributes to your SEO. » (06, points 7 et 9).

**EN-53 · FAQ 4 · claims chiffrés · majeur · revue : confirmée** — « In 90% of cases [...] can double the loading time of a page. Thanks to Orbitvu studios, your visuals are automatically exported in the ideal format ». Correction : chiffres conservés ; « in the most suitable format » (06, point 6).

**EN-54 · FAQ 5 · usage · mineur · ajout** — « while maintaining exceptional visual quality and managing transparency » ; « Since version 24.1.0, Orbitvu supports AVIF export. » Correction : « supporting transparency » ; « Orbitvu Station has supported AVIF export » (06, point 3).

---

## DE-CH — /de-ch/blog/welches-bildformat-ist-das-beste-fur-das-web

Verdict d'ensemble : allemand suisse naturel (aucun Eszett, « neu » helvétique), traduit du FR actuel après le 12/06/2026 ; calques ponctuels et défauts éditoriaux hérités du FR.

### Défauts transversaux

**DE-01 · corps · structure · mineur · ajout** — Paragraphes vides `‍` et `<strong>` dans les intertitres, comme en FR. Correction : non reproduits.

**DE-02 · corps · calque · mineur · ajout** — « Das Format RAW », « Das Format JPEG », « Das Format PNG », « Das Format WebP », « Das Format AVIF ». Explication : ordre des mots français ; l'allemand dit « Das RAW-Format » ou le nom seul. Correction : « Das RAW-Format », « JPEG », « Das PNG-Format », « Das WebP-Format », « Das AVIF-Format ».

### Métadonnées

**DE-03 · metaTitle · incohérence SEO · mineur · ajout** — « Welches Bildformat für das Web: JPEG, WebP, AVIF? » (PNG absent, comme en FR). Correction : « Welches Bildformat für das Web: JPEG, PNG, WebP, AVIF? » (05).

**DE-04 · description · claim non tenu · mineur · revue : confirmée** — « Vollständiger Vergleich: Dateigrösse, Qualität, Browser-Kompatibilität und Auswirkung auf Ihre Online-Verkäufe. » (FR-07). Correction : nouvelle description (05) ; 06, point 11.

**DE-05 · slug · translittération · mineur · revue : confirmée, non appliquée** — `welches-bildformat-ist-das-beste-fur-das-web` (« für » rendu par « fur » au lieu de « fuer »). Correction : **slug conservé** (backlink suivi vers l'ancienne URL `/de/blog/…`, redirigée vers ce slug) ; analyse dans 05 ; 06, point 21.

**DE-06 · date et dateModified · métadonnée · mineur · ajout** — mêmes constats que FR-08 et FR-09.

### Corps

**DE-07 · chapeau · ordre des mots · mineur · ajout** — « Doch welches Format wählen Sie für Ihre Produktbilder zwischen JPEG, PNG, WebP und dem neueren AVIF? » Explication : « zwischen » rejeté en fin de question, calque de « entre … lequel choisir ». Correction : « Doch welches Format sollten Sie für Ihre Produktbilder wählen: JPEG, PNG, WebP oder das neuere AVIF? »

**DE-08 · chapeau · calque · mineur · ajout** — « Hier ist ein einfacher, präziser und geschäftsorientierter Leitfaden, um die richtige Wahl zu treffen. » (« Voici » rendu par « Hier ist »). Correction : « Dieser einfache, präzise und geschäftsorientierte Leitfaden hilft Ihnen bei der richtigen Wahl. »

**DE-09 · H2 · ajustement SEO (pas une faute) · mineur · ajout** — « Die meistgenutzten Bildformate für das Web ». Explication : la requête de-ch principale est « bildformate für websites » (84 impressions, position 13,9). Correction : « Die meistgenutzten Bildformate für Websites ».

**DE-10 · alt image RAW · texte alternatif · mineur · ajout** — `alt="Bildformat RAW"`. Correction : « Bearbeitung einer Datei im RAW-Format: Foto eines blauen Chevrolet-Pick-ups mit dem Einstellungsfenster der Software ».

**DE-11 · section RAW · fait technique · majeur · ajout** — « Das Format RAW enthält sämtliche vom Sensor der Kamera erfassten Bilddaten, ohne Komprimierung oder Bearbeitung. » (FR-14). Correction : « Das RAW-Format enthält sämtliche Rohdaten, die der Kamerasensor aufzeichnet, noch vor jeder Bearbeitung. »

**DE-12 · sections RAW à WebP · claims produit · majeur · revue : confirmée** — « Die Orbitvu-Studios nehmen in sehr hoher Qualität auf », « ermöglichen es, den Komprimierungsgrad automatisch an Ihre Ziele anzupassen », « exportieren nur dann in PNG », « erledigen dies automatisch, mit einem doppelten Export WebP + JPEG » (FR-17). Correction : conservés sans renforcement ; 06, point 5.

**DE-13 · alt image JPEG · texte alternatif · mineur · ajout** — `alt="Beispiel JPEG-Komprimierung"`. Explication : correct mais peu descriptif ; « Beispiel JPEG-Komprimierung » sans préposition. Correction : « Beispiel für JPEG-Komprimierung: zwei Versionen desselben Fotos eines Vogels auf einem Ast, nebeneinander ».

**DE-14 · légende · mélange linguistique · mineur · revue : confirmée** — « Credit: JJ Harrison, CC BY-SA 3.0 ». Correction : « Bild: JJ Harrison, CC BY-SA 3.0 » (liens et licence inchangés).

**DE-15 · section JPEG · calque · mineur · ajout** — « Es ist leicht » (« léger » pour un fichier). Correction : « Es erzeugt kompakte Dateien ».

**DE-16 · section JPEG · phrase confuse · mineur · revue : confirmée** — « Bei der Komprimierung ist es jedoch mit Mass einzusetzen, um eine Verschlechterung des Bildes zu vermeiden. » Correction : « Die Komprimierung sollte jedoch massvoll eingesetzt werden: Ist sie zu stark, leidet die Bildqualität. »

**DE-17 · section JPEG · calque · mineur · ajout** — « visuelle Qualität oder vorrangige Ladegeschwindigkeit » (FR-20). Correction : « automatisch nach Ihrer Priorität einstellen: visuelle Qualität oder Ladegeschwindigkeit ».

**DE-18 · section PNG · coordination · mineur · ajout** — « ist ideal für Bilder, die Transparenz benötigen (Logos, freigestellte Bilder), und um dank seiner verlustfreien Komprimierung ein scharfes Bild zu bewahren. » Explication : coordination d'un groupe nominal et d'une infinitive, calquée sur le FR. Correction : « …, und dank seiner verlustfreien Komprimierung bleiben die Bilder scharf. »

**DE-19 · section AVIF · calque · mineur · revue : confirmée** — « und unterstützt dabei die Transparenz sowie die Bewahrung einer sehr hohen visuellen Qualität. » Correction : « unterstützt Transparenz und bewahrt dabei eine sehr hohe visuelle Qualität. »

**DE-20 · section AVIF · fait produit · majeur · revue : requalifiée** — « Seit der Version 24.1.0 bietet Orbitvu Station den Export in AVIF an » (FR-23). Correction : conservé, `[À VALIDER]` ; 06, point 3.

**DE-21 · section AVIF · calque · mineur · revue : confirmée** — « Dieses Format befindet sich in der Verbreitung ». Correction : « Die Verbreitung des Formats nimmt zu » (sens d'« en cours d'adoption », sans renforcement ; la revue proposait « setzt sich zunehmend durch », légèrement plus affirmatif).

**DE-22 · alt image 3 · texte alternatif · majeur · revue : confirmée** — `alt="__wf_reserved_inherit"`. Correction : « Schema eines automatisierten Produktionsablaufs: Barcode scannen, Aufnahme, Hintergrund entfernen oder ersetzen, Zuschneiden, Ausrichten, Skalieren, danach Speichern oder Online-Veröffentlichung ».

**DE-23 · Ressources · lien erroné · majeur · revue : confirmée** — « Tipps zur Bildoptimierung finden Sie bei Cloudinary. » → `https://thecssagency.com/`. Correction : `[À VALIDER]` ; 06, point 4.

**DE-24 · Ressources · lien · mineur · ajout** — « in diesem Artikel von Etowline » → article en français. Correction : « (auf Französisch) » ajouté ; 06, point 19.

**DE-25 · encart auteur · usage · mineur · revue : confirmée** — « Sébastien Jourdan ist Direktor von PackshotCreator – Sysnext ». Explication : « Direktor » est peu usuel pour un dirigeant d'entreprise ; « Geschäftsführer » désigne une fonction juridique précise, non établie ici. Correction : « Sébastien Jourdan leitet PackshotCreator – Sysnext » ; 06, point 17.

**DE-26 · encart auteur · appellation (nom de personne) · majeur · revue : confirmée** — « Artikel ursprünglich veröffentlicht von PackshotCreator im Februar 2024 — aktualisiert am 7. Mai 2026 von Sébastien Jourdan. » (FR-31). Correction : « Ursprünglich veröffentlicht von Laurent Wainberg im Februar 2024 – aktualisiert am 7. Mai 2026 von Sébastien Jourdan. » ; 06, point 1.

**DE-27 · encart auteur · typographie · mineur · ajout** — tiret cadratin « — » dans la ligne de crédit. Explication : l'allemand emploie le tiret demi-cadratin espacé (« – »). Correction : « – ».

### FAQ

**DE-28 · FAQ 1 · style nominal · mineur · ajout** — « bei gleichzeitiger Bewahrung der Bildqualität ». Correction : « bei gleichbleibender Bildqualität ».

**DE-29 · FAQ 3 (question) · date figée · mineur · revue : confirmée** — « Welches ist das beste Bildformat für eine E-Commerce-Website im Jahr 2025? » Correction : « Welches Bildformat ist heute das beste für eine E-Commerce-Website? » ; 06, point 9.

**DE-30 · FAQ 3 (réponse) · calque et claim · mineur · revue : confirmée** — « Es verbessert zudem das natürliche Ranking (SEO). » Correction : « und trägt durch schneller ladende Seiten auch zum organischen Ranking (SEO) bei » ; 06, point 7.

**DE-31 · FAQ 4 · usage et claims · mineur · ajout** — « dass sie zu schwer oder schlecht komprimiert sind » ; « nicht optimierte JPEG » ; « Formate wie PNG (zu Unrecht verwendet) ». Explication : « schwer » pour une taille de fichier ; « JPEG » sans nom au pluriel. Chiffres « 90 % » et « verdoppeln » sans source. Correction : « zu gross », « nicht optimierte JPEG-Dateien », « Ein unnötig eingesetztes PNG » ; chiffres conservés (06, point 6).
