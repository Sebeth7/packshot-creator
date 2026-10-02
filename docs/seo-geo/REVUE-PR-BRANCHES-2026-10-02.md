# Revue GitHub — PR et branches — photographie du 2026-10-02

**Photographie figée.** Ce fichier ne se met pas à jour : il décrit GitHub au
02/10/2026 vers 13:10 UTC. L'état courant vit dans `ETAT.md`, l'historique dans
`JOURNAL.md`, les arbitrages dans `DECISIONS.md`.

Rédigé par le Claude de Laurent, mission « grand rangement GitHub » du 02/10
(lecture seule, puis une PR documentaire en brouillon). Aucune PR fusionnée ni
fermée, aucune branche supprimée.

**Méthode** — clone complet (`git fetch --unshallow` : un clone superficiel
fausse les comptes d'avance et de retard, voir § 4) ; `git rev-list --count`
pour l'avance et le retard ; `git cherry` pour les patchs absents de `main` ;
`git merge-tree --write-tree` pour les conflits contre `main` `8c0dd06` ; API
GitHub pour les PR, les check runs, les statuts Vercel, les revues et les
commentaires.

---

## 1. État de GitHub

| | |
|---|---|
| `main` | `8c0dd067c0880e1a355d52edd8659b32446b50c6`, fusion de #80, 02/10 à 12:48:08 UTC |
| Déploiement de production de `main` | Statut Vercel `success`, « Deployment has completed », 02/10 à 12:49:13 UTC |
| CI sur `main` | Aucune : les trois workflows (`pr-checks`, `garde-journal`, `garde-consequences`) ne tournent que sur `pull_request` |
| PR ouvertes | 9 PR opérationnelles au relevé : #27, #59, #60, #64, #65, #67, #70, #77, #79. #81 (cette revue, documentaire) ouverte ensuite, à 13:20 UTC : GitHub affiche 10 PR ouvertes |
| PR fermées | 71 : 62 fusionnées, 9 fermées sans fusion |
| Branches distantes | 59 hors `main` |
| Revues GitHub sur les 9 PR opérationnelles | 0 |
| Commentaires humains sur les 9 PR opérationnelles | 0 de `Sebeth7` ; les commentaires de `lwainberg` sont des sessions Claude de Laurent ; les autres sont de `vercel[bot]` |

Vingt derniers commits de `main` : `git log --oneline -20 8c0dd06`. Le dernier
commit non-fusion est `f441bc1` (#80, Claude de Sébastien).

---

## 2. Registre des PR ouvertes

Les 9 PR opérationnelles inventoriées avant #81 ; #81, documentaire, n'y figure pas.

Toutes sont en conflit avec `main` `8c0dd06`, au minimum sur le haut de
`JOURNAL.md` (#80 y a ajouté une entrée). GitHub affiche `dirty` pour #79 et
`unknown` pour les autres (non recalculé). **Une CI verte ne vaut pas
validation éditoriale (D42).**

### #27 — maillage article → offre (Q3) ; contrôle post-déploiement du lot F

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/27 |
| Auteur, création | `lwainberg` (Claude de Laurent), 23/09 07:55 UTC |
| Tête, base | `e81e5c0` ; base `da2796f` ; **164 commits de retard** |
| Brouillon | Non. Revue demandée à `Sebeth7` depuis le 23/09, aucune revue |
| Fichiers | 15 : 9 JSON `content/{blog,guides}/fr/`, 3 articles TSX, `messages/fr.json`, `ETAT.md`, `JOURNAL.md` |
| Conflits | `app/[lang]/blog/formation-photo-produit-…/page.tsx` (supprimé sur `main` par #71, modifié ici), `comment-avoir-meilleures-images-amazon.json`, `promod-revolutionne-….json`, `ETAT.md`, `JOURNAL.md` |
| CI, Vercel | 4/4 verts et `success` sur `e81e5c0` (23/09) |
| Validation métier | Circuit (b) : validation de Sébastien attendue, non rendue |
| Contenu unique | Seule trace du contrôle `curl.exe` du lot F (23/09, 07:45-07:46 UTC, « tout conforme », jeton révoqué), absent de `main` ; 14 liens article → offre |
| Prochain geste | Aucun développement. Conserver les preuves (citées au JOURNAL du 02/10) ; sort de la PR sur GO distinct de Laurent |

### #59 — pilier AI Act A (FR)

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/59 |
| Auteur, création | `lwainberg` (Claude de Laurent, session `01UR9YwSQwVs1JYcvuJREAzF`), 29/09 18:57 UTC |
| Tête, base | `2a36322` ; base `9400eaa` ; 2 commits de retard |
| Brouillon | Oui, `DO_NOT_MERGE = YES` |
| Fichiers | 10 : `content/blog/fr/ai-act-images-produit.json`, 7 AVIF, `ETAT.md`, `JOURNAL.md` |
| Conflits | `JOURNAL.md` |
| CI, Vercel | 4/4 verts, `success` sur `2a36322` (02/10 09:12 UTC) |
| Statut déclaré | « Prêt pour la relecture visuelle de Laurent sur la Preview (02/10) » ; 7 visuels sur 7 ; la description indique « mail à Sébastien non envoyé » ; Zalando `UNRESOLVED / À ARBITRER` ; traductions non commencées (D38) |
| Transmission à Sébastien | Rapportée par le pilotage externe du 02/10 (« Dossier IA & images produit : nos 5 articles sont prêts pour ta relecture ») ; information du pilotage, non établie par GitHub ; accusé de réception non établi |
| Validation métier | Non établie : aucune trace GitHub (D42, étape 5) |
| Prochain geste | Relecture visuelle de Laurent sur la Preview (SSO) |

### #60 — article Suisse S (FR)

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/60 |
| Auteur, création | `lwainberg` (Claude de Laurent, session `01UR9YwSQwVs1JYcvuJREAzF`), 29/09 19:03 UTC |
| Tête, base | `74ae921` ; base `9400eaa` ; 2 commits de retard |
| Brouillon | Oui, `DO_NOT_MERGE = YES` |
| Fichiers | 9 : `content/blog/fr/images-ia-ecommerce-suisse.json`, 6 AVIF, `ETAT.md`, `JOURNAL.md` |
| Conflits | `JOURNAL.md` |
| CI, Vercel | 4/4 verts, `success` sur `74ae921` (02/10 09:13 UTC) |
| Statut déclaré | « Prêt pour la relecture visuelle de Laurent sur la Preview (02/10) » ; 6 visuels sur 6 ; la description indique « mail à Sébastien non envoyé » ; Zalando à arbitrer ; adaptation de-ch après validation du FR (D38) |
| Transmission à Sébastien | Idem #59 : rapportée par le pilotage externe du 02/10, non établie par GitHub ; accusé de réception non établi |
| Validation métier | Non établie : aucune trace GitHub |
| Prochain geste | Relecture visuelle de Laurent sur la Preview (SSO) |

### #64 — D33, patch factuel sûr

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/64 |
| Auteur, création | `lwainberg` (Claude de Laurent, session `016Y5ggEQS7yXQTKC4Y1bY7v`), 30/09 12:14 UTC |
| Tête, base | `63e1e92` ; base `17fc0b3` ; 31 commits de retard |
| Brouillon | Oui, « DO NOT MERGE » ; aucune fusion sans décision explicite de Laurent et Sébastien |
| Fichiers | 18 : 6 articles TSX, `contact`, `distributeur-orbitvu-suisse`, `components/seo/SchemaOrg.tsx`, 4 JSON `content/blog`, `messages/{fr,en,de-ch}.json`, `ETAT.md`, `JOURNAL.md` |
| Conflits | `ETAT.md`, `JOURNAL.md` |
| CI, Vercel | 4/4 verts, `success` sur `63e1e92` (01/10 11:58 UTC) |
| Validation métier | Preview à contrôler par Laurent (desktop, tablette, mobile) ; validation de Sébastien non rendue |
| Points ouverts déclarés | Date de création (2001, 2003 ou 2004 selon les sources) ; claims non sourcés restants (`guide-achat-studio-2026`, `comment-calculer-le-roi-…`) ; 10 jours (D32, F5) contre 12 jours (#64) ; D1 et `00-BRIEFING.md` citent Saint-Bonnet-de-Mure |
| Prochain geste | Contrôle de la Preview par Laurent |

### #65 — D40, circuit Preview Vercel → Sébastien (proposée)

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/65 |
| Auteur, création | `lwainberg` (Claude de Laurent, session `01PJjBeJPpKiBdZKqhkxBGR8`), 30/09 15:42 UTC |
| Tête, base | `c5e15a8` ; base `8ec89c1` ; 53 commits de retard |
| Brouillon | Oui |
| Fichiers | 6, documentation seule : `08-PREVIEW-VALIDATION.md` (nouveau), `02-PROCEDURE.md`, `DECISIONS.md`, `ETAT.md`, `JOURNAL.md`, `README.md` |
| Conflits | `DECISIONS.md`, `ETAT.md`, `JOURNAL.md` |
| CI, Vercel | 4/4 verts, `success` sur `c5e15a8` (01/10 05:31 UTC) |
| Écart avec la gouvernance en vigueur | D40 n'est pas en vigueur ; D42 et D43 (fusionnées par #76) imposent 17 modifications listées au JOURNAL du 01/10 (« arbitrages finaux »), budget actualisé le 02/10 (D43) ; la description mentionne encore « accès de Sébastien non établi », contredit par le fait métier du 01/10 |
| Prochain geste | Sort de #65 à arbitrer par Laurent (harmoniser puis fusionner, ou fermer) |

### #67 — D36, `noindex` de `sysnext.vercel.app`

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/67 |
| Auteur, création | `lwainberg` (Claude de Laurent, session `01JejYWDTDBaefZpZw5g35id`), 30/09 16:00 UTC |
| Tête, base | `62ebfae` ; base `7ad0ca3` ; 60 commits de retard |
| Brouillon | Oui, « DO NOT MERGE » |
| Fichiers | 6 : `next.config.ts`, `cloudflare-worker/src/index.js`, 2 tests, `ETAT.md`, `JOURNAL.md` |
| Conflits | `cloudflare-worker/test/d36-origine-noindex.test.ts` (ajout des deux côtés : #68 en a fusionné une version à 27 cas), `ETAT.md`, `JOURNAL.md` |
| CI, Vercel | 4/4 verts, `success` sur `62ebfae` (30/09 16:27 UTC) |
| Porte de vérification | #68 fusionnée le 01/10 (`2ef01b2`) : le bloc Worker D36 est dans `main`. Déploiement du Worker après #68 : **rapporté le 01/10 par les transmissions de pilotage**, non consigné au JOURNAL, non vérifié par cette revue. Version active à confirmer par lecture Cloudflare READ ONLY ; contrôle de `www` à faire |
| Prochain geste | Lecture Cloudflare READ ONLY du Worker actif, puis contrôle de `www` ; aucune décision sur #67 avant ; aucun nouveau déploiement autorisé |

### #70 — Ubersuggest, `metaTitle` de `/fr/blog/photographie-2d-de-produits`

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/70 |
| Auteur, création | `lwainberg` (Claude de Laurent, session `01J7a1EA3TyDAsVYUaZ6PaHJ`), 30/09 18:38 UTC |
| Tête, base | `ef0bc89` ; base `a8c85ca` ; 57 commits de retard |
| Brouillon | Oui, « DO NOT MERGE » |
| Fichiers | 3 : `content/blog/fr/photographie-2d-de-produits.json`, `ETAT.md`, `JOURNAL.md` |
| Conflits | `JOURNAL.md` |
| CI, Vercel | 4/4 verts, `success` sur `ef0bc89` (30/09 18:47 UTC) |
| Point ouvert | Un `<title>` relève-t-il du copywriting client-facing réservé à Sébastien (`01-RAYON-ACTION.md`) ? Non tranché |
| Prochain geste | Arbitrage séparé de Laurent |

### #77 — AI Act Q2, deux formulations juridiques (FR, EN, de-ch)

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/77 |
| Auteur, création | `lwainberg` (Claude de Laurent, session `018rcMPyepo18GrUacyYtVYk`), 01/10 11:40 UTC |
| Tête, base | `a207fe3` ; base `17fc0b3` ; 31 commits de retard |
| Brouillon | Oui, `DO_NOT_MERGE = YES` |
| Fichiers | 6 : 4 JSON `content/blog/{fr,en,de-ch}/`, `ETAT.md`, `JOURNAL.md` |
| Conflits | `JOURNAL.md` |
| CI, Vercel | 4/4 verts, `success` sur `a207fe3` (01/10 12:09 UTC) |
| Statut déclaré | Micro-correction finale de Laurent appliquée ; prête pour transmission à Sébastien, « non transmise » selon la description du 01/10, état ultérieur non établi ; `content/blog/**` est la prose de Sébastien |
| Prochain geste | Transmission à Sébastien pour validation (décision de Laurent) |

### #79 — REVIEW ONLY, Previews privées AI Act B/C/D

| | |
|---|---|
| URL | https://github.com/Sebeth7/packshot-creator/pull/79 |
| Auteur, création | `lwainberg` (Claude de Laurent, sessions `0113bRweR75CqP3mWQJvu8uo` et `01NL8AtHNTsiNk6TRNLBfDCt`), 02/10 06:04 UTC |
| Tête, base | `a4a62ac` ; base `9400eaa` ; 2 commits de retard |
| Brouillon | Oui, `DO_NOT_MERGE = YES` ; D41 en vigueur |
| Fichiers | 56, tous nouveaux sauf le JOURNAL : `app/[lang]/revue-interne/ai-act/**`, `content/revue-interne/ai-act/**` (3 JSON, 8 modules, 25 SVG, 10 AVIF), `lib/revue-interne/acces.ts`, un test, `JOURNAL.md` |
| Conflits | `JOURNAL.md` (GitHub : `dirty`) |
| CI, Vercel | 4/4 verts, `success` sur `a4a62ac` (02/10 09:31 UTC) |
| Garde | Pages construites sur Preview Vercel et en développement seulement ; 404 en production (relevé de la PR sur `sysnext.vercel.app`) |
| Transmission à Sébastien | [Inférence] Possiblement comprise dans le dossier « nos 5 articles » rapporté par le pilotage externe du 02/10 ; non établi par GitHub |
| Prochain geste | Contrôle humain de la Preview (SSO) ; toute publication exige une nouvelle mesure D16 et une décision de Laurent (D41) |

---

## 3. PR fusionnées et fermées

### Fusionnées du 28/09 au 02/10

| PR | Objet | Fusion (UTC) | Commit de fusion | Contrôle restant |
|---|---|---|---|---|
| #80 | `/api/contact` accepte `de-ch` (Claude de Sébastien) | 02/10 12:48:08 | `8c0dd06` | Sonde et envoi réel de bout en bout depuis `/de-ch/kontakt`, suppression de la fiche test |
| #76 | D42, D43 (200 USD par mois), réconciliation avec D40 | 02/10 04:42:30 | `9400eaa` | Q19 (prise de connaissance par Sébastien) |
| #78 | Documentation : #66 fusionnée et contrôlée | 01/10 17:30:39 | `6b80e6a` | — |
| #66 | Landing Mode FR, EN, de-ch | 01/10 16:26:04 | `4093d3d` | Chrome sur `www` ; mesure J+28 le 29/10, J+56 le 26/11 |
| #75 | Documentation : #74 fusionnée et contrôlée | 01/10 14:57:19 | `f1a3491` | — |
| #73 | Archivage AI Act, D41, backlog | 01/10 11:19:49 | `17fc0b3` | — |
| #74 | UB-04, fil d'Ariane hors du H1 | 01/10 10:29:43 | `8365c73` | Chrome sur `www` |
| #72 | Inter auto-hébergée | 01/10 09:02:01 | `a6760da` | Chrome sur `www`, onglet Réseau |
| #68 | D36, protection Worker | 01/10 06:58:31 | `2ef01b2` | Déploiement rapporté le 01/10 (pilotage), version active à confirmer (Cloudflare READ ONLY) ; contrôle de `www` |
| #71 | Academy réduite au catalogue Qualiopi (Claude de Sébastien) | 30/09 20:40:44 | `8ec89c1` | Reliquat CGU et confidentialité (Sébastien) |
| #69 | Centrage des articles de blog (Claude de Sébastien) | 30/09 18:33:22 | `a8c85ca` | — |
| #57 | Documentation : #55 et #58 | 30/09 04:17:33 | `7ad0ca3` | — |
| #58 | R01, sélecteur de langue des hubs de-ch | 29/09 18:48:26 | `e2e1027` | Chrome sur `www` |
| #55 | JSON-LD, fils d'Ariane de-ch et `solutions`, `dateModified` | 29/09 18:35:25 | `e88e528` | Chrome sur `www` ; mesure GSC ~06-13/10 |
| #56 | Documentation : #52 | 29/09 17:49:09 | `37146c2` | — |
| #54 | `llms.txt` (D6, date, 16 secteurs) | 29/09 16:31:38 | `2854c27` | Chrome sur `www` non consigné |
| #52 | Blog phase 2A, embeds Webflow | 29/09 15:25:54 | `9ced920` | Chrome sur `www` |
| #51 | Documentation : #50 | 29/09 10:43:29 | `06483a3` | — |
| #50 | Blog phase 1 structurelle | 29/09 10:33:43 | `28a1169` | Chrome sur `www` |
| #49 | Documentation : #44 | 29/09 08:39:04 | `2de576a` | — |
| #44 | Vidéos YouTube en façade | 29/09 08:17:26 | `b10bb5e` | Chrome sur `www` |
| #47 | Documentation : #46 | 29/09 05:51:36 | `a1771be` | — |
| #46 | YouTube 153, `referrerpolicy` | 29/09 05:31:58 | `cd17aeb` | Chrome sur `www` |
| #45 | Documentation : F5, contrôle sur `www` | 29/09 05:16:08 | `e3197e0` | — |
| #42 | Documentation : F5 publiée | 28/09 18:53:43 | `96489d9` | — |
| #39 | Landing F5 FR, EN, de-ch | 28/09 18:42:03 | `04919f8` | Mesure J+28 le 26/10, J+56 le 23/11 |
| #41 | Documentation : #40 | 28/09 17:02:38 | `b26f6e9` | — |
| #40 | Intégrations obsolètes retirées | 28/09 15:51:30 | `15469e5` | Chrome sur `www` ; suites hors dépôt |

Commits de fusion relevés par `git log --merges` sur `main`.

### Fermées sans fusion (9)

| PR | Objet | Fermée le | Tête (`refs/pull/<n>/head`) | Branche | Ce qui en reste |
|---|---|---|---|---|---|
| #63 | AI Act, satellite D | 01/10 | `b6495d1` | conservée | Mesures D16 (D41) |
| #62 | AI Act, satellite C | 01/10 | `8f2f42b` | conservée | Mesures D16 (D41) |
| #61 | AI Act, satellite B | 01/10 | `250e34a` | conservée | Mesures D16 (D41) |
| #53 | Illustrations de l'article AI Act | 01/10 | `9e86b9b` | conservée | BL-53-1 |
| #43 | Article AI Act et corrections E1 à E7 | 01/10 | `175a9d5` | conservée | BL-43-1 à BL-43-4 ; mesures D16 de A archivées au JOURNAL |
| #48 | Blocs vidéo Webflow sans vide | 29/09 | `5fe4e5f` | conservée (`claude/youtube-153-…`) | Règle reprise par #50 |
| #24 | Page témoin F5, première version | 28/09 | `d03f372` | conservée | Remplacée par #39 |
| #31 | Anciennes URL XL et G2 vers `alphashot-xl-g2` | 24/09 | `1a421dd` | conservée | D29, `SUPERSEDED / REVIEW_PRODUCT_MAPPING` |
| #1 | Skills « claude-mastery » | 27/07 | `d35091b` | la branche pointe sur `fd112ce`, contenu dans `main` | Rien d'unique sur la branche |

Les têtes des 9 PR fermées restent lisibles par `refs/pull/<n>/head` sur
GitHub, relevé `git ls-remote` du 02/10. Aucune de ces PR n'est à rouvrir
(D41 pour #61 à #63).

---

## 4. Registre des branches

59 branches distantes hors `main` :

| Classe | Nombre | Sens |
|---|---|---|
| ACTIVE | 8 | PR ouverte, travail poursuivi (#27, ouverte mais inactive depuis le 23/09, est classée HISTORICAL_PRESERVE) |
| HISTORICAL_PRESERVE | 7 | Historique, preuves ou travail unique ; à conserver |
| CLOSED_UNMERGED_REVIEW | 3 | PR fermée sans fusion, commits absents de `main` ; décision au cas par cas |
| UNKNOWN | 2 | Sans PR, commits absents de `main`, utilité non établie |
| MERGED_CANDIDATE_DELETE | 39 | Aucun commit absent de `main` ; suppression envisageable **sur GO seulement** |

20 branches portent des commits absents de `main` : toutes celles des classes
ACTIVE, HISTORICAL_PRESERVE, CLOSED_UNMERGED_REVIEW et UNKNOWN (8 + 7 + 3 + 2).
Aucune suppression n'est faite par cette revue.

**Correction du relevé du 19/09** (JOURNAL, entrée « nettoyage du suivi ») — il
comptait « 5 sans PR portant des commits absents de `main` (399, 372, 51, 5, 2)
— toutes de Sébastien ». Sur clone complet, le 02/10 : seules
`feat/sysnext-industrial` (4 commits) et `feat/geo-referentiels-prix`
(2 commits) portent des commits absents de `main` ; `feat/schema-markup-overhaul`,
`feature/brandbook-2025-foundations` et les autres branches de Sébastien sans PR
n'en portent aucun. [Inférence] Les valeurs 399, 372 et 51 sont exactement
celles qu'a produites ce jour un clone superficiel (`--depth`) avant
`git fetch --unshallow` ; le relevé du 19/09 a vraisemblablement été fait sur un
clone superficiel. Cela repose sur des schémas observés.

Protection particulière : `claude/pensive-cannon-zl2oh4`, commit
`ec2b4c62cee81b98de0e8660043866656d3c8c45`, Audit B (traductions historiques
Webflow), 160 fichiers ajoutés, aucune PR. **Ne pas supprimer.**

| Classe | Branche | Dernier commit | Date | Auteur | PR | Commits absents de `main` (dont patchs uniques) | Retard sur `main` | Recommandation |
|---|---|---|---|---|---|---|---|---|
| ACTIVE | `claude/keen-maxwell-xdtf23` | `62ebfae` | 2026-09-30 | Claude | #67 ouverte | 5 (4) | 60 | Conserver ; bloquée par sa porte Worker |
| ACTIVE | `seo/ubersuggest-safe-fixes-2026-09-30` | `ef0bc89` | 2026-09-30 | Claude | #70 ouverte | 4 (3) | 57 | Conserver ; arbitrage séparé |
| ACTIVE | `claude/busy-gauss-cfe9m8` | `c5e15a8` | 2026-10-01 | Claude | #65 ouverte | 5 (4) | 53 | Conserver ; sort de #65 à arbitrer |
| ACTIVE | `claude/laughing-knuth-i5ibnv` | `a207fe3` | 2026-10-01 | Claude | #77 ouverte | 5 (5) | 31 | Conserver |
| ACTIVE | `seo/d33-factual-safe-patch-2026-09-30` | `63e1e92` | 2026-10-01 | Claude | #64 ouverte | 11 (7) | 31 | Conserver |
| ACTIVE | `review/ai-act-bcd-private-previews-2026-10-02` | `a4a62ac` | 2026-10-02 | Claude | #79 ouverte | 6 (6) | 2 | Conserver. REVIEW ONLY, ne pas fusionner (D41) |
| ACTIVE | `seo/ai-act-images-produit-pilier-2026-09-29` | `2a36322` | 2026-10-02 | Claude | #59 ouverte | 31 (22) | 2 | Conserver |
| ACTIVE | `seo/images-ia-ecommerce-suisse-2026-09-29` | `74ae921` | 2026-10-02 | Claude | #60 ouverte | 29 (20) | 2 | Conserver |
| HISTORICAL_PRESERVE | `content/maillage-q3` | `e81e5c0` | 2026-09-23 | Claude | #27 ouverte | 1 (1) | 164 | Conserver : seule trace du contrôle `curl.exe` du lot F et des 14 liens Q3 ; ne pas fusionner globalement |
| HISTORICAL_PRESERVE | `seo/ai-act-images-produit-2026-09-28` | `175a9d5` | 2026-09-28 | Claude | #43 fermée sans fusion | 7 (5) | 104 | Conserver : source de BL-43-1 à BL-43-4 |
| HISTORICAL_PRESERVE | `seo/ai-act-illustrations-2026-09-29` | `9e86b9b` | 2026-09-29 | Claude | #53 fermée sans fusion | 10 (8) | 104 | Conserver : source de BL-53-1 |
| HISTORICAL_PRESERVE | `seo/ai-act-mannequins-virtuels-2026-09-30` | `8f2f42b` | 2026-09-30 | Claude | #62 fermée sans fusion | 3 (3) | 60 | Conserver : mesures D16 de C (D41) |
| HISTORICAL_PRESERVE | `seo/ai-act-metadonnees-marketplaces-2026-09-30` | `b6495d1` | 2026-09-30 | Claude | #63 fermée sans fusion | 3 (3) | 60 | Conserver : mesures D16 de D (D41) |
| HISTORICAL_PRESERVE | `seo/ai-act-retouche-image-produit-2026-09-30` | `250e34a` | 2026-09-30 | Claude | #61 fermée sans fusion | 3 (3) | 60 | Conserver : mesures D16 de B (D41) |
| HISTORICAL_PRESERVE | `claude/pensive-cannon-zl2oh4` | `ec2b4c6` | 2026-10-01 | Claude | aucune | 1 (1) | 31 | **Ne pas supprimer** : Audit B, `ec2b4c6`, 160 fichiers |
| CLOSED_UNMERGED_REVIEW | `content/f5-packshot-e-commerce` | `d03f372` | 2026-09-20 | Claude | #24 fermée sans fusion (remplacée par #39) | 4 (2) | 168 | Décision de Laurent ; 2 commits non repris (bloc approfondi optionnel) |
| CLOSED_UNMERGED_REVIEW | `fix/alphashot-xl-g2-next-config-2026-09` | `1a421dd` | 2026-09-24 | Claude | #31 fermée sans fusion | 2 (2) | 162 | Conserver tant que D29 est suspendue |
| CLOSED_UNMERGED_REVIEW | `claude/youtube-153-referrer-policy-ykjqx9` | `5fe4e5f` | 2026-09-29 | Claude | #46, #47 fusionnées ; #48 fermée sans fusion | 1 (1) | 95 | Commit `5fe4e5f` (#48) repris sous une autre forme par #50 (JOURNAL du 29/09) ; décision de Laurent |
| UNKNOWN | `feat/sysnext-industrial` | `03b3a28` | 2026-04-19 | Sébastien | aucune | 4 (3) | 363 | Conserver ; question à Sébastien (mini-site Sysnext Industrial, 4 commits) |
| UNKNOWN | `feat/geo-referentiels-prix` | `370f86a` | 2026-08-07 | Sébastien | aucune | 2 (2) | 243 | Conserver ; question à Sébastien (pages référentiels prix, 2 commits ; sujet « prix ») |
| MERGED_CANDIDATE_DELETE | `feature/brandbook-2025-foundations` | `606167d` | 2026-01-22 | Sébastien | aucune | 0 (0) | 680 | Branche de Sébastien, aucun commit absent de `main` ; décision de Sébastien |
| MERGED_CANDIDATE_DELETE | `feat/schema-markup-overhaul` | `802ac1a` | 2026-05-08 | Sébastien | aucune | 0 (0) | 332 | Branche de Sébastien, aucun commit absent de `main` ; décision de Sébastien |
| MERGED_CANDIDATE_DELETE | `feat/de-ch-locale` | `818cac8` | 2026-06-27 | Sébastien | aucune | 0 (0) | 298 | Branche de Sébastien, aucun commit absent de `main` ; décision de Sébastien |
| MERGED_CANDIDATE_DELETE | `claude/claude-mastery-skills-gqkl1j` | `fd112ce` | 2026-07-24 | Sébastien | #1 fermée sans fusion | 0 (0) | 273 | Pointe sur `fd112ce`, contenu dans `main` ; tête de #1 (`d35091b`) conservée par GitHub sous `refs/pull/1/head` |
| MERGED_CANDIDATE_DELETE | `feat/roi-chat` | `219a960` | 2026-08-06 | Sébastien | aucune | 0 (0) | 260 | Branche de Sébastien, aucun commit absent de `main` ; décision de Sébastien |
| MERGED_CANDIDATE_DELETE | `feat/audit-laurent-0309` | `0e8949f` | 2026-09-04 | Sébastien | aucune | 0 (0) | 235 | Branche de Sébastien, aucun commit absent de `main` ; décision de Sébastien |
| MERGED_CANDIDATE_DELETE | `feat/roi-public` | `ff5658b` | 2026-09-04 | Sébastien | aucune | 0 (0) | 236 | Branche de Sébastien, aucun commit absent de `main` ; décision de Sébastien |
| MERGED_CANDIDATE_DELETE | `docs/journal-schema-fiches-2026-09-20` | `aa80452` | 2026-09-20 | Claude | #25 fusionnée(s) | 0 (0) | 172 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `docs/plan-solutions-2026-09-19` | `98d6a81` | 2026-09-20 | Claude | #21 fusionnée(s) | 0 (0) | 178 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/accents-fr-2026-09` | `652b6bb` | 2026-09-20 | Claude | #23 fusionnée(s) | 0 (0) | 171 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/schema-fiches-2026-09` | `dc5e57d` | 2026-09-20 | Claude | #22 fusionnée(s) | 0 (0) | 174 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `docs/marque-mesures-2026-09-23` | `c9b97b4` | 2026-09-23 | Claude | #28 fusionnée(s) | 0 (0) | 163 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/worker-lot-f` | `e5a5dcc` | 2026-09-23 | Claude | #26 fusionnée(s) | 0 (0) | 166 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `docs/gouvernance-p0-2026-09-24` | `8778fb6` | 2026-09-24 | Claude | #33 fusionnée(s) | 0 (0) | 141 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/de-ch-inlanguage-2026-09` | `4673715` | 2026-09-24 | Claude | #29 fusionnée(s) | 0 (0) | 160 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/de-ch-masquer-temoignages-2026-09` | `fd830b2` | 2026-09-24 | Claude | #32 fusionnée(s) | 0 (0) | 147 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/p0-de-ch-heritage-chaines-2026-09` | `d54c3ff` | 2026-09-24 | Claude | #30 fusionnée(s) | 0 (0) | 154 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/lucid-mayer-tz2mk8` | `b9196f2` | 2026-09-25 | Claude | #34, #35 fusionnée(s) | 0 (0) | 134 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `content/article-migrer-ancien-pkc` | `422bdb8` | 2026-09-25 | Sébastien | #36 fusionnée(s) | 0 (0) | 131 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/slug-en-article-migration` | `c9f7e2c` | 2026-09-25 | Sébastien | #37 fusionnée(s) | 0 (0) | 129 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `docs/audit-maitre-consolide-integral-2026-09-26` | `9dc953d` | 2026-09-26 | Claude | #38 fusionnée(s) | 0 (0) | 127 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `seo/f5-packshot-e-commerce-2026-09-28` | `55ea992` | 2026-09-28 | Claude | #39 fusionnée(s) | 0 (0) | 107 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/admiring-hypatia-7pir8f` | `bc9cc1a` | 2026-09-29 | Claude | #40, #41, #44, #49 fusionnée(s) | 0 (0) | 89 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/awesome-dirac-j9uvw1` | `c6ae39b` | 2026-09-29 | Claude | #52, #56 fusionnée(s) | 0 (0) | 75 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/busy-dirac-jghkub` | `d1f0923` | 2026-09-29 | Claude | #54 fusionnée(s) | 0 (0) | 77 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/focused-maxwell-22sv6h` | `6a0e3b4` | 2026-09-29 | Claude | #42, #45 fusionnée(s) | 0 (0) | 103 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/gracious-dijkstra-efzyen` | `0e232c2` | 2026-09-29 | Claude | #58 fusionnée(s) | 0 (0) | 65 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/blog-structure-phase1-2026-09` | `e77c800` | 2026-09-29 | Claude | #50, #51 fusionnée(s) | 0 (0) | 85 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `ccr-28357f20-j8452h` | `ef89f87` | 2026-09-30 | Claude | #55, #57 fusionnée(s) | 0 (0) | 61 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `feat/academy-qualiopi` | `824da6c` | 2026-09-30 | Sébastien | #71 fusionnée(s) | 0 (0) | 54 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/blog-article-centrage` | `5d5fe87` | 2026-09-30 | Sébastien | #69 fusionnée(s) | 0 (0) | 58 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `ccr-17831c0e-6vstuz` | `7f8abbf` | 2026-10-01 | Claude | #72 fusionnée(s) | 0 (0) | 42 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/dazzling-dirac-0hl0pm` | `d8ce088` | 2026-10-01 | Claude | #73 fusionnée(s) | 0 (0) | 32 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/exciting-cannon-x48wud` | `1b6a638` | 2026-10-01 | Claude | #66, #78 fusionnée(s) | 0 (0) | 10 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `seo/d36-protection-worker-2026-09-30` | `05ac2f2` | 2026-10-01 | Claude | #68 fusionnée(s) | 0 (0) | 49 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `seo/ub04-controle-production-2026-10-01` | `7b1d35b` | 2026-10-01 | Claude | #75 fusionnée(s) | 0 (0) | 29 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `seo/ub04-h1-fil-ariane-2026-10-01` | `d51f69c` | 2026-10-01 | Claude | #74 fusionnée(s) | 0 (0) | 45 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `claude/vibrant-dijkstra-8g0ae5` | `7f47388` | 2026-10-02 | Claude | #76 fusionnée(s) | 0 (0) | 3 | Suppression envisageable sur GO : aucun commit absent de `main` |
| MERGED_CANDIDATE_DELETE | `fix/contact-locale-de-ch` | `f441bc1` | 2026-10-02 | Sébastien | #80 fusionnée(s) | 0 (0) | 1 | Suppression envisageable sur GO : aucun commit absent de `main` |

Colonnes : « Commits absents de `main` » = `git rev-list --count main..branche` ;
entre parenthèses, les patchs sans équivalent dans `main` (`git cherry`).
« Auteur » = auteur du dernier commit.

---

## 5. Contradictions documentaires relevées

| # | Où | Ce qui est écrit | Ce que montre GitHub ou le dépôt | Traitement |
|---|---|---|---|---|
| 1 | `ETAT.md`, « Décisions récentes » | D42 et D43 : « #76, non fusionnée » | #76 fusionnée le 02/10 à 04:42:30 UTC, `9400eaa` | Corrigé dans `ETAT.md` |
| 2 | `ETAT.md`, « Balle chez Laurent », #65 | « #65 reprend `main` après une éventuelle fusion autorisée de #76 » | #76 fusionnée ; #65 a 53 commits de retard et 3 fichiers en conflit | Corrigé dans `ETAT.md` |
| 3 | `ETAT.md`, « Chantiers ouverts » | Academy (#71), UB-04 (#74), `llms.txt` (#54), R01 (#58), Mode (#66) présentés comme chantiers ouverts | Toutes fusionnées (§ 3) | Déplacées en « Dernières livraisons » ; contrôles restants conservés |
| 4 | `ETAT.md`, chantier « Accents » et « Prochaines actions » | « PR à ouvrir, circuit (a) » ; « PR accents (CC2) : rebaser sur `main` après le merge de #22 » | #23 (« accents du français restaurés — fr.json, machines.ts, meta alphashot-360 ») fusionnée le 20/09 à 17:30:55 UTC ; JOURNAL du 20/09 | Corrigé dans `ETAT.md` |
| 5 | `ETAT.md`, lot F | Contrôle `curl.exe` « à reporter au journal » | Résultat « tout conforme » consigné le 23/09 dans le JOURNAL de la branche de #27 (`e81e5c0`), jamais fusionné | Preuve citée au JOURNAL du 02/10 ; clôture à confirmer par Laurent |
| 6 | `ETAT.md`, « Prochaines actions » | « Mesures M1-M6 du chantier marque » | M3, M4 faites le 19/09, M1, M2, M6 le 23/09 (JOURNAL) ; reste M5 (14-28/10) | Corrigé dans `ETAT.md` |
| 7 | `ETAT.md`, P0-K | « Effective à la fusion de #35 » | #35 fusionnée le 25/09 à 06:38:55 UTC | Corrigé dans `ETAT.md` |
| 8 | `ETAT.md`, « Balle chez Sébastien » | 5 branches sans PR portant des commits absents de `main` (19/09) | 2 sur clone complet (§ 4) | Corrigé dans `ETAT.md` |
| 9 | `ETAT.md`, « En attente de mesure » | Page témoin : « à venir », « J+56 » | F5 publiée le 28/09 (J0 18:43 UTC) : J+28 le 26/10, J+56 le 23/11 | Corrigé dans `ETAT.md` |
| 10 | `ETAT.md`, D36 | « à exécuter puis à vérifier » | #68 fusionnée : bloc Worker D36 dans `main` ; déploiement rapporté le 01/10 par le pilotage, non consigné au JOURNAL, version active à confirmer ; #67 en conflit sur le test Worker | Précisé dans `ETAT.md` |
| 11 | `JOURNAL.md`, entrée #80 du 02/10 | « PR : à venir » | PR #80, fusionnée à 12:48:08 UTC | Signalé ; entrée non modifiée (JOURNAL en ajout seul) |
| 12 | Description de #65 | « Accès de Sébastien aux Preview : non établi » | Fait métier de Laurent du 01/10 : accès confirmé (D42) | Point 3 des 17 modifications de #65 |
| 13 | D33 contre #64 | `foundingDate` à aligner sur 2001 | Faits métier du 30/09 cités par #64 : Sysnext 2001, lancement de PackshotCreator 2004 ; le site affiche 2001, 2003 et 2004 | À trancher par Laurent ; `DECISIONS.md` non modifié |
| 14 | D32 contre #64 | Délai indicatif d'environ 10 jours (aussi dans F5) | #64 écrit « environ 12 jours », fait métier du 30/09 selon sa description | À trancher ; D32 non modifiée |
| 15 | D1, `00-BRIEFING.md` contre #64 | Showroom à Saint-Bonnet-de-Mure | #64 : 198 allée de la Tour, 01700 Beynost (fait métier du 30/09) ; non fusionné | Signalé ; aucun fichier modifié |
| 16 | `README.md`, `06-CHANTIERS.md` | « Le backlog SEO/GEO, avec état et priorité », classé « vivant » | Fichier arrêté au 19/09 ; C4 (lot F, #26) et le volet accents de C14 (#23) ont avancé sans mise à jour du fichier | Bandeau historique ajouté ; ligne du `README.md` précisée |
| 17 | `ETAT.md`, en-tête | 25 « mises à jour précédentes » enchaînées | Chacune correspond à une entrée du JOURNAL | En-tête réduit ; version intégrale accessible par le lien permanent vers `8c0dd06` |
| 18 | `PSC_RAPPORT_MAITRE_CONSOLIDE_INTEGRAL_2026-09-26.md` | Statuts au 24-26/09 | Plusieurs PR fusionnées ou fermées depuis | Référence de raisonnement, pas état de production ; non modifié |

---

## 6. Opérations soumises à un GO distinct

Aucune n'est exécutée par cette revue.

| Opération | Préalable | Recommandation |
|---|---|---|
| Fermeture de #27 | Preuves conservées (fait : JOURNAL du 02/10 cite le contrôle lot F et les 14 liens ; la branche reste) | Possible sur GO de Laurent ; les 14 liens sont à reprendre dans le futur backlog de maillage, pas à fusionner tels quels (164 commits de retard, un fichier supprimé par #71) |
| Sort de #65 | Arbitrage de Laurent | Soit harmonisation (17 modifications, reprise de `main` `8c0dd06`), soit fermeture sans fusion avec D40 laissée non adoptée |
| Fermeture d'autres PR ouvertes | — | Aucune obsolescence démontrée : #59, #60, #64, #67, #70, #77, #79 portent un travail en cours ou une porte de vérification |
| Suppression des 39 branches MERGED_CANDIDATE_DELETE | GO de Laurent ; pour les 7 branches de Sébastien sans PR (dont `claude/claude-mastery-skills-gqkl1j`), décision de Sébastien | Rien n'est perdu côté commits ; garder au moins `fix/contact-locale-de-ch` jusqu'au contrôle de bout en bout de #80 |
| Sort des 3 branches CLOSED_UNMERGED_REVIEW | Décision de Laurent | Conserver `fix/alphashot-xl-g2-next-config-2026-09` tant que D29 est suspendue |
| Sort des 2 branches UNKNOWN | Question à Sébastien | Conserver |
| HISTORICAL_PRESERVE | — | Aucune suppression ; `claude/pensive-cannon-zl2oh4` exclue de tout rangement automatique |
