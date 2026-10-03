# PSC — Revue pré-fusion des PR #83 à #87, alignement V4.3

Revue du **03/10/2026**, Claude de Laurent, à la demande du pilotage global. Mission : revérifier les cinq PR brouillon du chantier « Standard UX des pages longues et fiabilité des données produit » avant toute autorisation de fusion.

Aucune fusion, aucune publication, aucun appel payant. Aucune modification Cloudflare, Supabase ou n8n. Aucune nouvelle PR.

Le Programme Directeur SEO/GEO V4.3, l'inventaire Maillage V2, le scénario P2 et le tableau de suivi V4.3 ne figurent pas dans le dépôt. Je n'ai pas accès à ces documents. Les éléments qui en viennent sont repris de la demande du pilotage et signalés comme tels.

---

## 1. État actuel vérifié des cinq PR

Relevé GitHub et `git` du 03/10, entre 10:40 et 11:15 UTC.

**`main`** : `de6c4cd83f3f33766d01c5fd9d52f3a2f43f9a32`, fusion de #81 (documentation seule) le 02/10 à 13:47:51 UTC. Inchangé depuis.
- `ETAT.md` citait `8c0dd06` (fusion de #80) : corrigé dans #87.
- Statut du déploiement de production de `de6c4cd` : non relevé.

**Les cinq PR** :

| PR | Branche | Tête | CI sur la tête | Base |
|---|---|---|---|---|
| #87 UX-GOV | `ccr-79f70eb9-7ls0wm` | commit qui ajoute ce document | à lire sur la PR (précédente tête `965bdbc` : verte) | `de6c4cd` |
| #83 PRODUCT-TEST | `ccr-79f70eb9-product-test` | `1c31ac6` | verte, run 37117798213, terminé à 10:54:01 UTC | `de6c4cd` |
| #86 CI | `ccr-79f70eb9-ci` | `5cc5bf8` | verte, run 37117616571, terminé à 10:51:30 UTC ; 12/12 parcours | `de6c4cd` |
| #84 UX-BLOG | `ccr-79f70eb9-ux-blog` | `a4b27c6` | verte, job 111157276954, terminé à 07:39:38 UTC | `de6c4cd` |
| #85 UX-STICKY | `ccr-79f70eb9-ux-sticky` | `1e0118b` | verte, job 111168398674, terminé à 08:49:15 UTC | `de6c4cd` |

**Couverture réelle de ces CI.** Pour un événement `pull_request`, GitHub exécute le workflow du commit de fusion, soit celui de `main` sauf pour #86. Conséquences :
- #83, #84, #85 et #87 n'exécutent ni Vitest ni Playwright : seulement types, JSON, lint (non bloquant) et build ;
- leurs tests propres ont été exécutés en local (§ 5).

**Fichiers partagés entre les cinq PR** :

| Fichier | PR concernées | Résultat de la fusion d'essai (§ 7) |
|---|---|---|
| `docs/seo-geo/JOURNAL.md` | les 5 | conflit à chaque étape, entrées à conserver toutes |
| `docs/seo-geo/BOITE-AUX-LETTRES.md` | #83 (Q20), #87 (Q21) | conflit, même point d'insertion |
| `docs/seo-geo/02-PROCEDURE.md` | #86, #87 | fusion automatique |

Aucun fichier de code n'est partagé entre les cinq PR.

**Autres PR ouvertes.** 15 PR au total, aucune créée depuis #82 (02/10 14:18 UTC).
- Aucun fichier de code commun avec #83 à #87.
- `JOURNAL.md` est partagé avec les 10 autres PR.
- `ETAT.md` (#87) est partagé avec #27, #59, #60, #64, #65, #67, #70, #77 et #82.
- #65 touche aussi `DECISIONS.md`, `README.md` et `02-PROCEDURE.md`.
- #64 modifie 6 pages dédiées du blog. Elles portent 16 des 18 liens vers `#calculateur-roi` (§ 4), mais #64 ne modifie pas ces liens. Même constat pour #27 sur `guide-achat-studio-2026`.

---

## 2. Anomalies confirmées et corrections

| # | Anomalie | Preuve | Traitement |
|---|---|---|---|
| A1 | `ETAT.md` : `main` à `8c0dd06` | `git log origin/main` : `de6c4cd` | Corrigé, #87 |
| A2 | D44 et D45 « en vigueur » alors que non fusionnées | `DECISIONS.md` de #87 | Statut à trois niveaux (principe approuvé / inscription en brouillon / application à la fusion) dans `DECISIONS.md`, `docs/standards/`, `ETAT.md`, état du chantier. Corrigé, #87 |
| A3 | « 11 produits conformes » lisible comme une validation des versions | D45 de #87 ; statut `conforme` de #83 | Défini comme correspondance numérique avec la fiche fabricant consultée, sans validation de version. Corrigé dans #83 (référentiel, registre) et #87 (D45, R-PRODUCT-DIM, état du chantier) |
| A4 | Garde « valeur retirée » de #83 : signalait tout triplet 100 / 70 / 190, y compris un objet photographié | Test lu ; deux mutations (§ 5) | Garde restreinte aux énoncés de capacité ; cinq cas synthétiques. Toujours 23 tests. Corrigé, #83 |
| A5 | #86 : `--pass-with-no-tests` pouvait valider un passage sans aucun test ; le rapport ne distinguait pas les specs exécutés des specs à venir | Mesuré : un filtre sans correspondance est ignoré quand un autre en a une ; sans test du tout, code de sortie 1 sans l'option, 0 avec | Option retirée. Le résumé du job inventorie chaque spec (exécuté / absent, avec la PR qui l'apporte / différé), et l'étape échoue si aucun spec n'est présent. Vérifié sur la CI de `5cc5bf8`. Corrigé, #86 |
| A6 | Durée CI estimée de 3 à 4 minutes dans le JOURNAL de #86 | Mesurée : 40 s d'étapes ajoutées | Correction dans une nouvelle entrée (le JOURNAL ne s'efface pas). Corrigé, #86 |
| A7 | #85 : l'`id` `calculateur-roi` de Studios dépend de `barreActive()` | Diff de #85 sur Studios | Lot AR-01 autonome préparé (§ 4). **Non poussé : arbitrage** |
| A8 | #85 modifie la page Studios, en pilote coordonné | Diff de #85 | Retrait préparé et testé (§ 3). **Non poussé : arbitrage** |
| A9 | Activation d'`anchors.spec` liée à #85 dans la documentation | `ETAT.md` F4 bis, JOURNAL de #86 | Liée à AR-01. Corrigé, #86 et #87 |
| A10 | `e2e/roi-calculator.spec.ts` cherche un calculateur intégré à Studios, retiré le 22/03/2026 (commit `d5a7fea`) | Lecture du spec | Signalé seulement. Ne pas l'ajouter à la CI en l'état : il échouerait même après AR-01, la section ROI étant une accroche |
| A11 | Q20.15 citait H1 à H17, le registre en compte 19 | Registre de #83 | Corrigé le 03/10 (`e4f7ab5`) |

**Écart non résolu** : le pilotage cite 22 liens ROI inventoriés dans Maillage V2. J'en relève 18 dans le code et 37 rendus (§ 4). Sans l'inventaire Maillage V2, je ne peux pas expliquer cet écart.

---

## 3. Collision Studios / Maillage V2 / #85

**Ce que #85 modifie sur Studios.** Fichier `app/[lang]/studios-photo-automatises/page.tsx`. Un seul fichier sert les trois langues (`/fr`, `/en`, `/de-ch/studios-photo-automatises`).

| Modification | Nature |
|---|---|
| Import de `SommaireCollant`, `barreActive`, `LIBELLES_BARRE` | Barre UX |
| Barre de sommaire, 5 entrées : `orientation`, `studios`, `accompagnement`, `calculateur-roi`, `faq` | Barre UX |
| `id={ancre('orientation')}`, `id={ancre('accompagnement')}`, `id={ancre('faq')}` | Barre UX : `id` posés seulement si la barre est active |
| `id={ancre('calculateur-roi')}` sur la section « Quel est le vrai coût de votre production photo actuelle ? » | **Correctif fonctionnel AR-01**, conditionné à la barre |
| `id="studios"` | Existant sur `main`, réutilisé, non modifié |

Aucun texte, aucune image, aucune section, aucun lien n'est modifié par #85 sur Studios. La restructuration commerciale de Studios n'est pas touchée.

**Proposition : retirer Studios de #85, sans désactivation dans le code.** Variante préparée et testée en local, non poussée : `docs/seo-geo/propositions-2026-10-03/85-sans-studios.patch`.

Ce qu'elle change :
- `studios-photo-automatises/page.tsx` revient à l'état de `main` : #85 ne touche plus ce fichier ;
- registre : famille `landing-gamme` en HOLD. Exception motivée : « pilote Studios coordonné avec Landings & Hubs et le Maillage V2 ; J0 commun proposé le 29/10/2026 (scénario P2, sous réserve de Laurent) ». Sortie : activation dans le lot Studios ;
- tests :
  - Vitest : nouveau cas « pilote Studios gelé jusqu'au J0 coordonné », l'assertion contraire est retirée ;
  - spec : Studios FR et EN sortent des pages équipées, Studios FR entre dans les pages gelées ;
- périmètre de #85 : **93 pages** au lieu de 96.

Résultats sur le build local :
- HTML de Studios identique à `main` dans les trois langues (0 ligne de différence hors scripts) ;
- Vitest du registre 8/8 ;
- `navigation-pages-longues` 44/44 ;
- `anchors` 6/7 : le test `#calculateur-roi`, comme sur `main`, puisque l'ancre part dans AR-01.

Variante écartée : désactivation par le registre en laissant le code de #85 dans le fichier. Le rendu serait identique, mais le fichier resterait modifié, avec un risque de conflit avec les travaux du pilote Studios.

**Autres pages équipées par #85.** Guides, fiches, IA photo produit, solutions, 2 articles. Toutes conservées, sous réserve de leurs gels :
- 3 guides FR (#27) ;
- `budget-studio-photo-automatise` (#27) ;
- `prestataire-packshot-vs-studio-interne` (sous le seuil de longueur).

**Pages IA.** `app/[lang]/ia-photo-produit/page.tsx` n'est touché par aucune autre PR ouverte. Je ne sais pas si cette page fait partie du pilote Landings & Hubs. Si c'est le cas, le même traitement s'applique : famille `landing-ia` en HOLD et fichier ramené à `main`. À confirmer par Laurent.

**PR éditoriales ouvertes** (#27, #59, #60, #64, #70, #77, #79, #82) : aucun fichier de code commun avec #85.

---

## 4. Stratégie indépendante pour AR-01

**Constat.**
- La section ROI de Studios portait `id="calculateur-roi"` jusqu'au 22/03/2026. Le commit `d5a7fea` (restructuration de Studios) l'a retirée en remplaçant le calculateur intégré par une accroche vers `/calculateur-roi`.
- Depuis, les liens vers `/studios-photo-automatises#calculateur-roi` arrivent en haut de la page.

**Inventaire des liens** (`main`, build local) :

| Source | Liens dans le code | Liens rendus |
|---|---|---|
| `blog/blendai-vs-flair-ai-…` (#64) | 2 | FR 2, EN 2 |
| `blog/blendai-vs-photoroom-…` (#64) | 2 | FR 2, EN 2 |
| `blog/comment-calculer-le-roi-…` (#64) | 6 | FR 6, EN 6 |
| `blog/guide-achat-studio-2026` (#64, #27) | 5 | FR 5, EN 5 |
| `blog/ia-photo-produit-guide-2026` (#64) | 1 | FR 1, EN 1 |
| `blog/orbitvu-vs-concurrents` (#64) | 1 | FR 1, EN 1 |
| `studio-photo/selecteur-machines` | 1 | FR 1, EN 1, de-ch 1 (`/de-ch/fotostudio/maschinen-finder`) |
| **Total** | **18 dans 7 fichiers** | **37 sur 15 pages** |

**Destinations et identifiants.**
- Les destinations sont `/fr/`, `/en/` et `/de-ch/studios-photo-automatises#calculateur-roi`. Les trois pages répondent 200.
- Aucun lien vers `#cout` dans le code, les contenus, les messages ou les tests de `main`, ni dans l'historique (`git log -S`). Aucun `id="cout"`.
- Le correctif ajoute un identifiant et n'en retire aucun.

**Section ROI de Studios et page autonome sont deux cibles distinctes** :
- la section ROI de Studios (« Quel est le vrai coût de votre production photo actuelle ? ») est une accroche ; son bouton mène à la page autonome ;
- la page autonome `/[lang]/calculateur-roi` (de-ch : `/roi-rechner`) porte le calculateur.

Faire pointer les 18 liens directement vers la page autonome serait une décision de maillage : elle toucherait 6 fichiers gelés par #64 et #27. Hors de ce correctif.

**Correctif préparé**, base `de6c4cd`, testé en local, non poussé : `docs/seo-geo/propositions-2026-10-03/AR-01-ancre-calculateur-roi.patch`.
- `id="calculateur-roi"` permanent sur la section, sans `barreActive()` ni `ancre()`. Commentaire : « Ne pas la conditionner ni la renommer ».
- `e2e/anchors.spec.ts` : le test FR existant est conservé ; trois tests ajoutés :
  - ancre présente en EN ;
  - ancre présente en de-ch ;
  - lien du sélecteur → section ROI → bouton vers `/fr/calculateur-roi`.
- Entrée au JOURNAL.

**Résultats sur le build local :**
- `anchors` 10/10, contre 6/7 sur `main` ;
- HTML rendu FR, EN, de-ch : seule différence avec `main`, l'attribut `id` ;
- arrivée mesurée sur les trois cibles, à 390 et 1 440 px : titre à 200 et 280 px du haut, sous l'en-tête de 65 px.

**Rattachement proposé.**
- AR-01 devient une PR brouillon du lot Maillage V2, autonome, sans dépendance à #85.
- Sa seule collision possible : avec #85 si Studios y restait, sur la même ligne. On garderait alors l'`id` permanent.

**Conséquence sur la baseline Studios.**
- L'attribut ne change ni texte, ni URL, ni lien, ni données structurées : le JSON-LD de Studios est identique à `main` (12 blocs).
- [Inférence] Effet d'indexation nul. Cela repose sur des schémas observés.
- En revanche, les visiteurs venus des 37 liens arriveront sur la section ROI et non plus en haut de page. Défilement, temps passé et clics vers `/calculateur-roi` peuvent bouger sur Studios.
- Publié avant le 29/10, AR-01 se mêle à la période de référence du pilote. Recommandation : le publier au J0 commun du 29/10, avec le Maillage V2. S'il est publié plus tôt pour arrêter l'arrivée en haut de page, en consigner la date comme événement de baseline.

---

## 5. Couverture CI réelle après intégration

**Par étape d'intégration :**

| Après fusion de | Vitest en CI | Parcours Playwright en CI |
|---|---|---|
| #87, #83 | non (workflow de `main`) | non |
| #86 | oui : 400 tests (377 + 23 de #83) | `machine-selector` 12 tests ; `sommaire-blog` et `navigation-pages-longues` signalés absents ; `anchors` signalé différé |
| AR-01 (si arbitré) | idem | idem, plus `anchors` : passer `anchors:AR-01` de la liste des différés à celle des attendus, dans la PR AR-01 |
| #84 | idem | plus `sommaire-blog`, 8 tests |
| #85 (variante) | 408 tests (+ 8 du registre) | plus `navigation-pages-longues`, 44 tests |

**Contrôle sur build cumulé**, fusion d'essai locale de `main` + #87 + #83 + #86 + AR-01 + #84 + #85 en variante :
- types et build verts ;
- Vitest 408/408 ;
- `machine-selector`, `sommaire-blog`, `navigation-pages-longues` et `anchors` : **74/74 en 1,0 min avec 4 workers** ;
- liens ROI : 37 sur 37 aboutissent ;
- JSON-LD identique à `main` sur fiche, solution, IA, guide, articles et Studios.

[Inférence] En CI, avec 2 workers : environ 2 minutes de parcours. Cela repose sur des schémas observés (mesure locale).

**`anchors.spec.ts`** : absent du job, parce que son test `#calculateur-roi` échoue sur `main` et rendrait toute PR rouge. Les 6 autres tests passent sur `main`. Il est désormais affiché « non exécuté : activation après AR-01 » dans chaque résumé de job.

**Limites.**
- Chromium seulement.
- `retries: 2` en CI dans `playwright.config.ts` (réglage existant) : un test réussi au deuxième essai est compté « flaky », pas en échec.

---

## 6. Pages gelées

Comparaison du HTML rendu (hors scripts) : `main` contre le build cumulé ci-dessus.

| Page | Gel | Différence |
|---|---|---|
| `/fr`, `/en`, `/de-ch` | M5, 28/10 | 0 ligne |
| `/packshot-mode` FR, EN, de-ch | Mode, 26/11 | 0 ligne ; barre d'origine conservée |
| `/packshot-e-commerce` FR, EN, de-ch | F5, 23/11 | 0 ligne |
| `/fr/industrie/mode-textile` | 26/11 | 0 ligne |
| 3 guides FR | #27 | 0 ligne |
| `budget-studio-photo-automatise`, `prestataire-packshot-vs-studio-interne` | #27 ; seuil | 0 ligne |
| Studios FR, EN, de-ch | pilote, J0 29/10 proposé | 2 lignes : l'attribut AR-01 seul, aucune barre |
| 6 pages dédiées du blog | #64, #27 | Fichiers non modifiés ; balisage du sommaire partagé (#84) seulement : `type`, `data-toc-id`, `aria-current`, conteneur plafonné |

---

## 7. Ordre final de fusion proposé

Cet ordre n'est pas une autorisation : chaque fusion demande un GO distinct de Laurent. Aucune fusion automatique.

| Étape | PR | Dépendances | Collisions | Validations humaines | Tests à relancer après fusion de l'étape précédente | Calendrier SEO |
|---|---|---|---|---|---|---|
| 1 | #87 | aucune | JOURNAL ; ETAT avec 9 PR ouvertes ; BOITE avec #83 ; README, DECISIONS et 02-PROCEDURE avec #65 | GO de Laurent | CI de la PR | Aucun effet (documentation) |
| 2 | #83 | aucune ; exécution en CI après #86 | JOURNAL ; BOITE (Q20 sous Q21, garder les deux) | GO de Laurent | `npx vitest run lib/produits` sur `main` à jour | Aucun effet (pas de rendu) |
| 3 | #86 | après #83 pour que Vitest couvre D45 dès la fusion | JOURNAL ; 02-PROCEDURE (fusion automatique à l'essai) | GO d'infrastructure de Laurent ; information de Sébastien (CI plus longue de 40 s ; rayon d'action exigé sur ses PR des catalogues) | Première PR suivante, ou `workflow_dispatch` : vérifier le résumé du job | Aucun effet |
| — | AR-01 (piste parallèle) | après #86 pour activer `anchors` en CI | JOURNAL ; Studios avec #85 seulement si Studios y reste | Arbitrage de rattachement et de date | `anchors` 10/10 ; contrôle des 37 liens | Date recommandée : J0 Studios du 29/10 |
| 4 | #84 | après #86 pour que son spec tourne en CI | JOURNAL | Contrôle de la Preview (§ 8) ; information de Sébastien (pages de #64 et #27) | `sommaire-blog` sur `main` à jour ; `smoke.mjs` sur `sysnext.vercel.app` ; Chrome sur `www` | Aucune mesure en cours sur le blog dans `ETAT.md` (E) |
| 5 | #85 (variante si arbitrée) | après #86 ; indépendante de #84 | JOURNAL | Arbitrage Studios ; décision sur le libellé actif ; Preview d'une page par famille ; information de Sébastien (fiches, IA, solutions) | `navigation-pages-longues` et `anchors` sur `main` à jour ; `smoke.mjs` ; Chrome sur `www` | JSON-LD inchangé : sans effet attendu sur les mesures « Fils d'Ariane » (#55, 06-13/10) et « Fiches marchand » (#22). Pages IA : appartenance au pilote à confirmer |

---

## 8. Checklist de validation Preview pour Laurent (#84)

**Preview** : `https://sysnext-git-ccr-79f70eb9-ux-blog-sebs-projects-ca1e93a7.vercel.app` (connexion Vercel requise). Comparer chaque cas avec la même URL sur `https://sysnext.vercel.app` (production hors Cloudflare). Ne pas fusionner avant ce contrôle.

| # | Cas | URL et appareil | Geste | Attendu |
|---|---|---|---|---|
| 1 | Sommaire repliable, mobile | `/fr/blog/generer-images-produit-ia`, téléphone (ou 390 px) | Ouvrir « Sommaire », toucher la 3e entrée, puis la dernière | Le panneau se replie ; le titre visé est entièrement visible sous l'en-tête |
| 2 | Sommaire latéral très long, desktop | `/fr/blog/optimiser-travail-production-visuelle` (liste de 1 670 px sur `main`), 1 440 × 900 | Faire défiler la liste du sommaire jusqu'en bas ; cliquer la dernière entrée | Liste défilante, dernière entrée accessible ; titre visé sous l'en-tête |
| 3 | Images chargées pendant le défilement | `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots` (+3 662 px pendant le chargement), desktop, cache vidé | Depuis le haut, cliquer la dernière entrée du sommaire | Arrivée sur le titre visé, pas plus haut (sur `main` : titre à 3 759 px sous le haut de l'écran) |
| 4 | Page dédiée touchée indirectement (#64, #27) | `/fr/blog/guide-achat-studio-2026`, desktop ; puis `/fr/blog/orbitvu-vs-concurrents`, mobile | Parcourir le sommaire latéral ; ouvrir le sommaire repliable | Contenus identiques à la production ; seul le comportement du sommaire change |

---

## 9. Modifications à reporter dans le tableau de suivi V4.3

Je n'ai pas accès au tableau V4.3. Lignes proposées :

| Ligne | Mise à jour |
|---|---|
| `main` | `de6c4cd` (fusion de #81, 02/10 13:47:51 UTC) |
| #83 | Tête `1c31ac6`, CI verte ; garde capacité / objet ; « correspondance numérique » ; prête pour GO |
| #84 | Tête `a4b27c6`, CI verte ; en attente du contrôle de la Preview (§ 8) |
| #85 | Tête `1e0118b`, CI verte ; arbitrage Studios ouvert (variante à 93 pages prête) ; décision sur le libellé actif |
| #86 | Tête `5cc5bf8`, CI verte ; inventaire des specs ; 40 s d'étapes ajoutées ; `anchors` après AR-01 |
| #87 | D44 et D45 : principe approuvé / inscription en brouillon / application à la fusion ; `ETAT.md` à jour |
| AR-01, nouvelle ligne du lot Maillage V2 | 18 liens (37 rendus) vers une ancre absente depuis le 22/03 ; correctif prêt (`propositions-2026-10-03/`) ; publication proposée au J0 du 29/10 |
| Écart d'inventaire | 22 liens (Maillage V2) contre 18 dans le code et 37 rendus : à rapprocher |
| Backlog | `e2e/roi-calculator.spec.ts` périmé (calculateur retiré de Studios le 22/03) |
| Pages IA | Appartenance au pilote Landings & Hubs à confirmer avant la fusion de #85 |

---

## 10. GO encore nécessaires

1. **Studios / #85** : retrait de Studios (variante préparée, recommandée), désactivation par le registre, ou maintien. Je pousse sur #85 seulement après cet arbitrage.
2. **AR-01** :
   - rattachement au lot Maillage V2 autonome ;
   - création d'une PR brouillon dédiée (aucune PR créée sans accord) ;
   - date de publication : J0 du 29/10 recommandé.
3. **Pages IA** : dans le pilote Landings & Hubs ou non. Si oui, même traitement que Studios.
4. **#84** : contrôle de la Preview par Laurent (§ 8).
5. **#85** : décision de conception sur le libellé actif, puis Preview d'une page par famille.
6. **#86** : GO d'infrastructure de Laurent ; information de Sébastien.
7. **Fusion** : GO distinct de Laurent pour chaque PR, dans l'ordre du § 7.
8. **Sébastien** : réponses à Q20 (PR #83 ; conditionne la PR PRODUCT-DATA) et à Q21 (PR #87 ; renvoi dans `/CLAUDE.md`). `/CLAUDE.md` n'est pas modifié.
9. **Après chaque fusion** : `node scripts/seo/smoke.mjs https://sysnext.vercel.app`, puis Chrome sur `www` (R4).

---

## Annexe — reproduire

Les deux correctifs proposés sont versionnés comme documentation, sans effet sur le site, dans `docs/seo-geo/propositions-2026-10-03/` :
- `AR-01-ancre-calculateur-roi.patch` : `id` permanent et trois tests, à appliquer sur `main` ;
- `85-sans-studios.patch` : retrait de Studios, registre et tests, à appliquer sur la branche de #85.

```bash
git fetch origin
# AR-01, sur une branche partie de main (le bloc JOURNAL peut demander une reprise manuelle)
git am -3 docs/seo-geo/propositions-2026-10-03/AR-01-ancre-calculateur-roi.patch
# Variante de #85, sur ccr-79f70eb9-ux-sticky
git am -3 docs/seo-geo/propositions-2026-10-03/85-sans-studios.patch
npx vitest run
PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test machine-selector sommaire-blog navigation-pages-longues anchors --project=chromium
```

Sur arbitrage : AR-01 devient une PR brouillon du lot Maillage V2 ; la variante devient un commit sur #85.
