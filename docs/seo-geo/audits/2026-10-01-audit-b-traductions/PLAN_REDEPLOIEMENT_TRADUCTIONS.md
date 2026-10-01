# Plan de redéploiement des traductions — articles hérités de Webflow

**Date** : 01/10/2026 · **Auteur** : Claude de Laurent · **Statut** : proposition. Aucune PR n'a été créée, aucun fichier du site n'a été modifié.
**Entrées** : `AUDIT_LINGUISTIQUE_GLOBAL.md`, `TABLEAU_FAMILLES_EDITORIALES.csv`, `ANOMALIES_DETAILLEES.csv`, `CLAIMS_A_REVERIFIER.csv`, `DOSSIERS_RETRADUCTION_P1/`.

---

## 1. Cadre qui s'impose à chaque lot

| Règle | Effet sur ce plan |
|---|---|
| **D42** (PR #76, brouillon non fusionnée, appliquée ici par anticipation) | Circuit en 8 étapes pour chaque lot : cadrage ; rédaction ; visuels ; Preview sur ordinateur, tablette et mobile ; validation de Sébastien ; maillage et SEO ; traduction EN et adaptation de-ch **depuis le FR validé** ; QA, publication, contrôle et mesure. « Pas de fusion assimilée à une validation » |
| **D38** | L'EN et le de-ch se traduisent depuis le FR validé, jamais depuis un brouillon. Le de-ch ne transpose aucune règle de l'UE ou de la France |
| **D15** | Réécriture sans prix ni suppression d'URL à backlinks : validation tacite au bout de 5 jours ouvrés sans objection de Sébastien |
| **`01-RAYON-ACTION.md`** | `content/blog/**` : `content` et `faqs` sont « la prose de Sébastien ». Le copywriting FR client relève de lui. `alternates.json`, le Worker et `next.config.ts` ont un rayon large |
| **D17** | L'effort sur `/en` (C5) passe après C1 à C4 et C6. **La retraduction EN des articles demande un arbitrage de Laurent** (§ 4, A4) |
| **D5 / D16** | Pas de création. Fusionner, optimiser ou réécrire est permis |
| **D6, D25, D30, D31, D33** | Pas d'« exclusif » ; pas de prix dans un comparatif ; pas de prix ni de devise ajoutés en de-ch ; aucun témoignage en de-ch ; date de création 2001 |
| **R1, R2, R5, R6** | Build vert avant push ; vérifier la branche ; Worker uniquement depuis le dépôt ; aucun `git restore` ni `git clean` |
| **Slugs** | **Aucun changement de slug proposé.** 8 articles reçoivent des backlinks (`TABLEAU_FAMILLES_EDITORIALES.csv`, colonne `BACKLINKS`), et toutes les anciennes URL Webflow sont redirigées par le Worker vers les slugs actuels |

### PR ouvertes qui touchent le corpus : attendre leur sort ou se rebaser dessus

| PR | Fichiers du corpus | Lots concernés |
|---|---|---|
| #27 (maillage Q3, ouverte, non brouillon) | FR : `comment-avoir-meilleures-images-amazon`, `comment-mettre-en-valeur-…`, `eclairage-photos-produits`, `est-il-utile-dinternaliser-…`, `photographie-de-produits-a-360-degres-en-interne`, `promod-…` | L0 bis, L1, L8 |
| #64 (D33, brouillon) | FR et EN : `comparatif-de-solutions-…` et `evolution-e-commerce-packshot` | L0 (comparatif), L8 |
| #70 (metaTitle, brouillon) | FR : `photographie-2d-de-produits` | L1 |
| #77 (AI Act Q2, brouillon) | Natifs seulement | aucun |

Aucune de ces PR n'est modifiée par ce plan.

---

## 2. Lots de PR proposés

Chaque lot fait l'objet d'**une PR par sujet** (règle 5 du rapport maître). Les lots L0 à L4 n'exigent aucune traduction. Les volumes comptent des fichiers JSON.

### L0 — Rétablir le nom du fondateur remplacé à tort

| | |
|---|---|
| **Objet** | Remplacer « PackshotCreator » par « Laurent Wainberg » là où les commits `8ae45f63` et `4dde4f23` ont touché le texte, hors champ `author` |
| **Périmètre** | **L0a** (sans débat, 6 familles, 10 fichiers) : interview FR et EN (8 emplacements par langue), ebooks FR et EN, occasion EN, automatiser FR et EN, focus stacking FR et EN. **L0b** (comparatif FR et EN) : après le sort de #64. **L0c** (lignes de crédit du guide « packshot » FR, EN et de-ch et du format d'image FR et de-ch) : seulement si Sébastien confirme que le remplacement n'était pas voulu |
| **Source** | Import `56d4bc32`, mot pour mot. Seul le nom change : aucune autre correction dans cette PR |
| **Décideurs** | Laurent (son nom) et Sébastien (il a choisi l'auteur générique). Le champ `author` n'est pas touché |
| **Rayon** | Local : contenu de 10 à 15 JSON. Ni slug, ni `alternates.json`, ni données structurées hors title et description |
| **Tests** | Script de garde : diff limité à la chaîne du nom, avec le même nombre d'occurrences qu'à l'import ; `verifier-json.mjs` ; `npx tsc --noEmit` ; `npm run test:unit` ; `npx next build` ; Preview : `<title>` et H1 de l'interview |
| **Effort** | Environ 1 heure, plus la décision |
| **Dossier prêt** | `DOSSIERS_RETRADUCTION_P1/01-interview-fondateur/` (texte complet proposé en FR et en EN) |

### L1 — Les 3 pages `/en` servies en français

| | |
|---|---|
| **Objet** | `/en/blog/photographie-2d-de-produits`, `/en/blog/photographie-3d-de-produits-…`, `/en/blog/photographie-de-produits-a-360-degres-en-interne` |
| **Constat** | Contenu intégralement français ; `noindex, follow` ; hors sitemap ; 0 à 1 clic sur 365 jours ; aucun backlink relevé. Les FR décrivent l'ancienne gamme PackshotCreator comme actuelle |
| **Options** | (a) Retirer les 3 JSON EN, retirer `en` des 3 entrées d'`alternates.json`, retirer les 3 slugs de `NOINDEX_EN_BLOG_SLUGS` et répondre **410** (`GONE_PATHS` du Worker, R5) ou **301 vers le FR** (`next.config.ts`). (b) Traduire, une fois réglé le sort des FR. (c) Statu quo |
| **Préalable** | Sort des 3 FR : page historique de l'ancienne gamme, mise à jour vers la gamme Orbitvu, ou retrait. Décision de Sébastien, car c'est une offre produit |
| **Rayon** | **Large** : `alternates.json` (sélecteur de langue), `lib/seo-config.ts` (7 fichiers dépendants), Worker ou `next.config.ts`. Section « Rayon d'action » obligatoire |
| **Tests** | `lib/__tests__/locale-switch-de-ch.test.ts` ; `verifier-json.mjs` ; `smoke.mjs` sur le Preview (jeton de contournement) ; e2e `language-switch.spec.ts` et `redirections.spec.ts` ; après déploiement, témoin `curl.exe` depuis le poste de Laurent (D23) |
| **Effort** | Environ 2 heures pour l'option (a), plus le déploiement du Worker si 410 |

### L2 — Prix, exclusivité, conformité distributeur (Sébastien)

| Article | Constat | Décision attendue |
|---|---|---|
| `quel-retour-sur-investissement-avec-un-studio-photo-en-interne` FR | « Coût : 12.000 € à 30.000 € (environ 350 €/mois sur 5 ans) », plus les chiffres qui en découlent (0,48 €, 86 %, 12-18 mois). Retirés de l'EN le 30/06 pour « violation contractuelle Orbitvu » | Aligner le FR sur l'EN (« sur devis ») ou autre formulation |
| `focus-sur-lhyperfocus` FR | « PackshotCreator distribue exclusivement les solutions Orbitvu » (D6) | « distributeur officiel », comme dans l'EN |
| `logiciel-packshotcreator-ortery-perdu-solution` FR et EN | « distributeur exclusif d'Ortery » (historique, laissé volontairement le 30/06) | Garder (fait historique) ou reformuler |
| `comparatif-de-solutions-…` FR et EN | Économies chiffrées en euros (« 12 346,4 € par an ») dans un comparatif (D25) | À traiter dans #64 |

Effort : environ 1 heure après décision. Tests : comme L0, plus une relecture du Preview.

### L3 — Métadonnées FR (title, H1, metaTitle, description)

| | |
|---|---|
| **Périmètre** | Environ 25 articles FR : Title Case (16 metas, 49 intertitres sur 14 articles) ; incohérences title / H1 / metaTitle / description (55 en FR) ; « en 2025 » ; emojis (📸, 👉 : 4 champs FR et 4 champs EN, dans 6 articles) ; description qui déforme des statistiques (`revolution-e-commerce-…`) |
| **Règle SEO** | Garder les requêtes qui ramènent du trafic (`DOSSIERS_RETRADUCTION_P1/*/05-METADONNEES_PROPOSEES.md` pour les 11 P1). Ne changer ni slug ni date |
| **Décideur** | Sébastien (copywriting FR) ; D15 tacite si sans prix |
| **Rayon** | Local par fichier, mais `<title>` visible dans Google : mesure GSC à J+28 page par page |
| **Tests** | `verifier-json.mjs`, `tsc`, `test:unit`, `next build`, `smoke.mjs` sur le Preview (title, description, canonical, hreflang inchangés hors title et description) |
| **Effort** | Environ une demi-journée |

### L4 — Textes alternatifs et légendes

| | |
|---|---|
| **L4a, technique** | Dans le rendu (`lib/blog-utils.ts`), neutraliser `__wf_reserved_decorative` en `alt=""` (23 images). Ne pas neutraliser `__wf_reserved_inherit` par un `alt` vide sans décision : ce sont des images informatives. **Rayon large** : gabarit commun aux 125 articles ; test unitaire à ajouter |
| **L4b, éditorial** | Rédiger les 167 `alt` `__wf_reserved_inherit` (73 articles) et traduire les 69 `alt` restés dans la mauvaise langue (26 articles), en regardant chaque image. Corriger les coquilles (« massacra ») et les légendes « Credit: » en de-ch |
| **Découpage** | Par lots de 10 à 15 articles, en commençant par les P1 (leurs `alt` sont proposés dans les dossiers P1) |
| **Tests** | `test:unit`, `next build`, contrôle Preview ; aucune `src` modifiée (garde de parité, § 3) |
| **Effort** | L4a : environ 1 heure. L4b : environ 2 à 3 minutes par image, soit environ 10 heures pour 236 `alt` |

### L5 — P1, français (11 dossiers prêts)

| | |
|---|---|
| **Périmètre** | 11 familles, 11 FR : les dossiers `DOSSIERS_RETRADUCTION_P1/01` à `11`. Fichier `04-PROPOSITION_FR.md` : texte corrigé intégral |
| **Découpage** | 3 PR : L5a (01 à 04), L5b (05 à 08), L5c (09 à 11), ou une PR par article si Sébastien préfère relire article par article |
| **Préalable** | Points de `06-VALIDATION_HUMAINE.md` tranchés (faits, affirmations, noms) |
| **Décideur** | Sébastien ; D15 tacite sauf prix |
| **Tests** | § 3 en entier ; `dateModified` : si on l'ajoute, mettre à jour `lib/seo/__tests__/json-ld-techniques.test.ts`, qui attend exactement 3 porteurs |
| **Effort** | Conversion du Markdown en HTML JSON : environ 1 heure par article, soit environ 11 heures, plus la relecture de Sébastien |

### L6 — P1, anglais (après L5 fusionné)

| | |
|---|---|
| **Périmètre** | 11 EN. `04-PROPOSITION_EN.md` est rédigé depuis la **proposition** FR : à recaler sur le FR **validé** avant PR (D38, D42 « pas de traduction depuis un brouillon ») |
| **Préalable** | Arbitrage A4 (D17) |
| **SEO** | L'EN est la langue la plus performante pour l'objectif (« best lens for product photography »), la bague, le cadrage, le logiciel Ortery et le guide « packshot » (23 903 impressions sur « packshot »). Garder les termes de requête dans title et H1 |
| **Tests** | § 3 ; hreflang FR ↔ EN inchangé ; contrôle Preview |
| **Effort** | Recalage et conversion : environ 1 heure par article |

### L7 — de-ch (3 articles de familles Webflow, après L5 et L6)

`leitfaden-packshot-fotografie-warum-packshots-machen`, `welches-bildformat-ist-das-beste-fur-das-web` (propositions dans les dossiers 02 et 03) et `produkt-vorstellen-leitfaden-packshot-fotografie` (P2, note B, 20 liens vers `/fr/` : pas de proposition rédigée). Règles : D38, D30, D31, « ss ». Tests : `locale-switch-de-ch.test.ts`, contrôle Chrome **sans traduction automatique** (piège B5). Effort : environ 3 heures.

### L8 — P2, par vagues (19 familles)

4 vagues de 4 à 5 familles, triées par trafic (`TABLEAU_FAMILLES_EDITORIALES.csv`, `PRIORITE_REPRISE` = P2). Chaque famille suit le même circuit : FR corrigé puis validé, puis EN retraduit, puis de-ch si la famille en a un. Les familles P0 dont le défaut d'intégrité est corrigé en L0, L1, L2 ou L3 gardent leurs défauts de traduction. Elles passent en **tête de la vague 1** : `utilisez-votre-studio-photo-…` (paragraphe corrompu FR et EN, à réparer d'abord), `est-il-utile-…` (FAQ EN corrompue), `acheter-studio-photo-packshot-occasion` (EN = autre article), `focus-sur-lhyperfocus`, `comment-automatiser-…`, `comparatif-…` (après #64), `quel-retour-sur-investissement-…`. Effort : environ 2 heures par famille (relecture comprise), soit environ 40 heures. Dossiers à produire sur le modèle des P1.

### L9 — P3 : arbitrage avant tout effort (18 familles)

Pour chaque famille : conserver, fusionner (D5), ou retirer et rediriger (Sébastien si backlinks ; aucun backlink relevé sur les familles P3 dans la table `backlinks`). Candidats évidents à l'arbitrage : contenus datés de 2013 à 2018 (Oscaro, WiziShop, ebooks 2017, SEO des images 2017) ; cas clients de l'ancienne gamme (Promod, SportOkay) ; contenus ShotFlow aux statistiques non sourcées. Effort : environ 2 heures de cadrage, puis selon les décisions.

### Récapitulatif

| Lot | Articles (JSON) | Familles | Prérequis | Décideur | Effort indicatif |
|---|---|---|---|---|---|
| L0a | 10 | 6 | — | Laurent + Sébastien | 1 h |
| L0b / L0c | 2 / 5 | 1 / 2 | #64 / confirmation | Sébastien | 0,5 h |
| L1 | 3 EN (+ 3 FR à arbitrer) | 3 | sort des FR | Sébastien (offre), Laurent | 2 h |
| L2 | 4 | 4 | — | Sébastien | 1 h |
| L3 | environ 25 FR | environ 25 | — | Sébastien (D15) | 4 h |
| L4a / L4b | 125 (gabarit) / 73 | — | — | Laurent / Sébastien pour le FR | 1 h / 10 h |
| L5 | 11 FR | 11 | `06-VALIDATION_HUMAINE` | Sébastien | 11 h + relecture |
| L6 | 11 EN | 11 | L5 fusionné, A4 | Laurent | 11 h |
| L7 | 3 de-ch | 3 | L5, L6 | Laurent | 3 h |
| L8 | environ 40 | 19 | L5 comme modèle | Sébastien, Laurent | 40 h |
| L9 | environ 30 | 18 | arbitrage | Sébastien, Laurent | 2 h + |

Ordre recommandé : **L0a → L2 → L1 → L5 → L3 → L4a → L6 → L7 → L8 → L4b → L9**. L0a, L2 et L1 corrigent ce qui est faux ou absurde aujourd'hui ; L5 et L6 traitent le trafic.

---

## 3. Tests communs à toute PR de contenu

```bash
git branch --show-current                       # R2
node scripts/seo/verifier-json.mjs              # JSON valides (messages/ et content/)
npx tsc --noEmit
npm run test:unit                               # json-ld-techniques (3 porteurs de dateModified),
                                                # youtube (57 intégrations, 49 fichiers, 23 vidéos),
                                                # blog-utils, locale-switch-de-ch
NEXT_PUBLIC_SUPABASE_URL=https://exemple.supabase.co \
NEXT_PUBLIC_SUPABASE_ANON_KEY=factice SUPABASE_SERVICE_ROLE_KEY=factice \
npx next build                                  # R1
node scripts/seo/smoke.mjs https://<preview>.vercel.app   # avec le jeton de contournement
PLAYWRIGHT_BASE_URL=https://<preview>.vercel.app npx playwright test \
  e2e/youtube-consent.spec.ts e2e/language-switch.spec.ts e2e/seo.spec.ts e2e/internal-links-all.spec.ts
```

**Garde de parité**, script à écrire avant L5 ; il n'existe pas aujourd'hui. Pour chaque JSON modifié, il compare l'ancienne et la nouvelle version. Les ensembles suivants doivent rester identiques, sauf écart déclaré dans la PR :
- `href` des liens ;
- `src` des images et des iframes ;
- nombre de tableaux et de figures ;
- intégrations YouTube (le test `youtube.test.ts` échoue sinon) ;
- `slug`, `date` et `webflowItemId`.

**Contrôles manuels (D42 étape 4)** : sur le Preview, ordinateur, tablette et mobile, en portrait et en paysage ; sommaire, façade YouTube, tableaux, images. Puis, après fusion : `sysnext.vercel.app`, Chrome sur `www` (R4, D23), et GSC à J+28 sur les URL touchées (title, CTR, position).

---

## 4. Arbitrages nécessaires avant exécution

| # | Question | Décideur | Lot bloqué | Si on ne tranche pas |
|---|---|---|---|---|
| A1 | Rétablir « Laurent Wainberg » dans le texte des 6 familles L0a ; les lignes de crédit (L0c) restent-elles génériques ? | Laurent + Sébastien | L0 | Le title absurde de l'interview et les phrases fausses restent servis |
| A2 | Sort des 3 pages `/en` en français et des 3 FR de l'ancienne gamme | Sébastien (offre) + Laurent | L1 | Statu quo : pages `noindex` sans effet SEO, mais fausses pour un visiteur EN |
| A3 | Prix FR de l'article ROI, « exclusivement » FR, « distributeur exclusif d'Ortery » | Sébastien | L2 | Prix toujours publiés en FR alors que l'EN les a retirés pour motif contractuel |
| A4 | La retraduction EN (L6, L8) est-elle autorisée avant la clôture de C1 à C4 et C6 (D17) ? | Laurent | L6, L8 | 42 articles EN en qualité D restent en ligne |
| A5 | Graphies de référence : ShotFlow ou Shotflow ; SuperFocus ou Hyperfocus ; Alphashot Micro v2 ou Micro Pro v2 ; PackshotCreator sans italique | Sébastien | L5, L6 | Les propositions gardent la forme actuelle de chaque article |
| A6 | Sort des contenus datés (2013-2018) et des statistiques sans source (L9, et « arbitrage éditorial » dans 14 familles) | Sébastien + Laurent | L8, L9 | Les affirmations non sourcées restent en ligne |
| A7 | Données produit contraires au catalogue (Furniture Studio 4 t contre 500 kg ; Pro G2 50 cm contre 35 × 35 × 40 cm ; 150 contre 200 bijoux par jour) | Sébastien | L5, L8 | Les propositions gardent le texte actuel, signalé |

---

## 5. Entrée de JOURNAL prête à reprendre (non écrite dans le dépôt)

```markdown
## 2026-10-01 · Audit B — traductions historiques Webflow · Claude de Laurent

**Chantier** : audit linguistique des articles hérités de Webflow (lecture seule) | **PR** : aucune | **Commit** : livrables sur `claude/pensive-cannon-zl2oh4`, non fusionnés

**Quoi** — 125 articles servis revérifiés (63 FR, 57 EN, 5 de-ch ; 115 importés de Webflow, 3 de-ch dérivés, 7 natifs). 60 familles relues en entier : FR 31 B / 28 C / 1 D ; EN 1 B / 9 C / 42 D / 3 X ; de-ch 2 B / 1 C. Sens FR → EN prouvé dans 52 familles. 1 869 erreurs relevées, 574 affirmations à revérifier. 11 dossiers P1 avec propositions FR, EN et de-ch.

**Pourquoi** — Mission « Audit B » du 01/10. Les traductions Webflow n'avaient jamais été auditées (hors périmètre de #50 et #52).

**Constat majeur** — `8ae45f63` et `4dde4f23` (12/06) ont remplacé « Laurent Wainberg » par « PackshotCreator » à 31 endroits, dans 14 fichiers : `<title>` servi « PackshotCreator, fondateur de PackshotCreator – Interview ». Prix FR résiduels (ROI) retirés de l'EN seulement. 3 pages `/en` en français.

**Non regardé** — `www` (R4) ; archives Wayback (connexion refusée) ; guides ; articles natifs ; faits métier non vérifiés auprès d'Orbitvu ou d'Ortery.

**Suite** — Arbitrages A1 à A7 (plan, § 4), puis lots L0a → L2 → L1 → L5.
```
