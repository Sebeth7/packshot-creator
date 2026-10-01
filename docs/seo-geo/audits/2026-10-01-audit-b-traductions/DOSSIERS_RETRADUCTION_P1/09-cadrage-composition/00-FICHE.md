# Fiche — famille 67e41233cb2c0c8643c00c89 (« Conseils photo : le cadrage et la composition »)

Dossier de retraduction P1, audit B, 01/10/2026. Dépôt lu sur `main` `17fc0b3`, en lecture seule.

## Identité

| | FR | EN |
|---|---|---|
| URL publique | https://www.packshot-creator.com/fr/blog/conseils-photo-le-cadrage-et-la-composition | https://www.packshot-creator.com/en/blog/tips-photo-framing-composition |
| URL d'origine (hors Cloudflare) | https://sysnext.vercel.app/fr/blog/conseils-photo-le-cadrage-et-la-composition | https://sysnext.vercel.app/en/blog/tips-photo-framing-composition |
| Slug | `conseils-photo-le-cadrage-et-la-composition` | `tips-photo-framing-composition` |
| Fichier | `content/blog/fr/conseils-photo-le-cadrage-et-la-composition.json` | `content/blog/en/tips-photo-framing-composition.json` |
| `title` | Conseils photo : le cadrage et la composition | Photo tips: framing and composition |
| `h1` | Conseils photo : cadrage et composition pour vendre | Photo tips: framing and composing to sell |
| `<title>` servi (`metaTitle`) | Photographie Produit : 6 Règles de Cadrage pour des Images Qui Convertissent | Product Photography: 6 Framing Rules for Images That Convert |
| Structure | 7 h2, 2 images, 2 liens, 5 FAQ, 723 mots | identique, 717 mots |

- ID Webflow : `67e41233cb2c0c8643c00c89` ; création de l'item le 26/03/2025 à 14:41 UTC (horodatage ObjectId, inférence).
- de-ch : aucune version. `content/blog/alternates.json` ne lie que FR et EN.
- Date affichée : 16/09/2017 ; `dateModified` absent ; catégorie E-commerce ; auteur « PackshotCreator » (import : « Laurent Wainberg ») ; temps de lecture 5 min.
- Sujet : cadrage et composition appliqués à la photo produit (intention, cadre plein ou aéré, décentrage, règle des tiers, mouvement), renvoi vers l'Alphashot Pro G2, FAQ technique (distance, fond, reflets, réglages, packshot ou lifestyle).

## Trafic et liens (données fournies)

- Famille : **168 clics** sur 365 jours.
- FR : 33 clics sur 365 jours, dont 31 sur l'ancienne URL Webflow ; 523 impressions sur 90 jours ; position moyenne 29,2.
- EN : **135 clics** sur 365 jours ; 1 798 impressions sur 90 jours ; position moyenne 13,5. L'EN est la langue la plus performante.
- Backlink : 1 domaine (AS 46, lien suivi) vers l'URL EN actuelle.
- Requêtes à préserver (`GSC_REQUETES_P1.md`, clics / impressions / position) :
  - EN : « product photography rules » 0/636/12,6 ; « top composition rules for small object product shots » 0/177/9,5 ; « product photography composition » 8/167/7,1 ; « rule of thirds product photography » 0/96/7,9 ; « photography framing rules » 0/64/14,5.
  - FR : « configuration de photographie de produits » 0/112/39,0 ; « meilleures pratiques photo produits » 0/70/47,8 ; « conseils shooting produits » 0/54/47,0 ; « qu'est-ce que le cadrage en photographie » 0/33/36,6 ; « cadrage produit » 0/24/16,4.
- Redirections présentes dans le dépôt (`cloudflare-worker/src/index.js` ; la prod peut avoir divergé, R5) : règle générique `/blog/<slug>` → `/fr/blog/<slug>`, ou `/en/blog/<slug>` pour les slugs de `BLOG_EN_REDIRECTS` (qui contient `tips-photo-framing-composition`, l. 38) ; mappings explicites `/conseils-photo-le-cadrage-et-la-composition` → FR (l. 945), `/en/blog/conseils-photo-le-cadrage-et-la-composition` → EN (l. 992), `/fr/blog/tips-photo-framing-composition` → EN (l. 1155).
- Liens internes entrants : aucun trouvé dans `content/`, `data/`, `lib/`, `components/`, `messages/`.
- Liens sortants : `/fr|en/blog/guide-photographie-packshot-pourquoi-faire-packshots` ↔ `packshot-photography-guide-why-make-product-packshots` ; `/fr|en/studio-photo/alphashot-pro-g2`.

## PR concernée

Aucune PR ouverte ne modifie les fichiers de cette famille.

## Historique depuis l'import (`02-ORIGINAL_RETROUVE.md`)

- `56d4bc32` (18/04/2026) : import Webflow, plus ancienne version conservée ; aucun export brut antérieur.
- `44d780f1` (23/05/2026) : images rapatriées du CDN Webflow.
- `8ae45f63` (12/06/2026) : auteur « Laurent Wainberg » → « PackshotCreator », choix revendiqué (E-E-A-T, schema Organization).
- `1ebb469c` (07/07/2026) : lien Alphashot repointé de `alphashot-g2` (redirigé par le Worker vers l'XL G2) vers `alphashot-pro-g2`, conforme à l'ancre.
- Le texte n'a pas changé depuis l'import, en dehors de ce lien.

## Origine linguistique et preuve

**FR → EN, établie par preuve interne** (revue `reviews/67e41233cb2c0c8643c00c89.json`, vérifiée contre `01` et le HTML) :

- déterminants français restés dans le corps EN : « **La** Rule of thirds is a classical method », « **Les** intersection points of these lines » ;
- mot français non traduit : « seems more aesthetics, **plus** true to your visual message » ;
- calques directs du FR : « Fill or aerate » (aérer), « Some useful landmarks » (repères), « e-commerce stickers » (vignettes), « called strengths » (points forts), « a Line of force » (ligne de force), « Decentralize the subject » (décentrer), « Let him breathe… if he is in motion » (laissez-lui, s'il) ;
- majuscules de segments traduits séparément puis recollés : « should Capturing attention, To build trust », « THE environment Or the staging Give meaning ».

La FAQ EN est en anglais fluide : [Inférence] elle a été traduite ou rédigée à part, avec plus de soin. Les métadonnées EN sont aussi en anglais correct.

## Verdict par langue

| Langue | Qualité (revue) | Anomalies (`03`) | Verdict |
|---|---|---|---|
| FR | B | 33 (1 majeure, 32 mineures) | **Retouche** : français natif et clair ; typographie, quelques fautes de grammaire, anglicismes dans la FAQ, alts à refaire, métadonnées à reprendre |
| EN | D | 53 (16 majeures, 37 mineures) | **Retraduction complète du corps** depuis le FR corrigé ; FAQ et métadonnées correctes, retouchées |
| de-ch | — | — | Néant |

Les 36 anomalies de la revue sont toutes confirmées ; aucune n'est retirée ; une gravité est relevée (alt français sur la page EN).

## Résumé des décisions proposées

1. **FR** (`04-PROPOSITION_FR.md`) : même structure et même ordre ; corrections de typographie (espaces insécables, guillemets, collages), de grammaire (« Laissez-le respirer », « ce ne sont pas des lois figées ») et de style ; définition des « lignes de force » reprise du schéma ; FAQ débarrassée de ses anglicismes ; paragraphes vides Webflow supprimés.
2. **EN** (`04-PROPOSITION_EN.md`) : corps retraduit intégralement depuis le FR corrigé, en anglais américain ; termes de métier rétablis (« off-center », « thumbnails », « thirds lines », « power points ») ; FAQ retouchée sans changer ses questions.
3. **Alts** : les deux images du corps reçoivent un alt descriptif dans la langue de la page (images examinées) ; l'alt de l'image principale, imposé par le gabarit, est signalé.
4. **Métadonnées** (`05`) : `metaTitle` FR ramené à 60 caractères sans Title Case ; descriptions FR et EN ramenées à 152 et 148 caractères ; `h1` et `metaTitle` EN réorientés vers « product photography rules / composition », avec une variante conservatrice ; `title` FR et EN, `h1` FR et catégorie inchangés.
5. **Claims** : « 6 règles », « qui convertissent », « outils de vente » retirés des métadonnées ; « garantir » → « obtenir » ; « éliminer les reflets » → « atténuer certains reflets ». Chiffres techniques (45°, ISO, ouvertures) conservés tels quels.
6. **Lien** : ajout proposé vers l'article sur la photographie de chaussures en interne, là où le texte annonçait un contenu sans lien (variante sans lien fournie).
7. **Slugs conservés** (FR et EN) ; aucun changement de redirection, d'`alternates.json` ni de Worker.
8. **Non tranché ici** (`06`) : date de 2017, auteur, image principale, schéma en français sur la page EN, produit cité.

## Fichiers du dossier

- `01-TEXTE_ACTUEL.md`, `02-ORIGINAL_RETROUVE.md` : entrées, non modifiées.
- `03-ANOMALIES_ANNOTEES.md` : 86 anomalies (FR 33, EN 53).
- `04-PROPOSITION_FR.md`, `04-PROPOSITION_EN.md` : textes intégraux proposés. Pas de `04-PROPOSITION_DE-CH.md` (pas de version de-ch).
- `05-METADONNEES_PROPOSEES.md` : métadonnées, alts, catégories, analyse des slugs.
- `06-VALIDATION_HUMAINE.md` : 13 points à trancher.
