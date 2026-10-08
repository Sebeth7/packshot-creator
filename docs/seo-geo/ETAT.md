# ÉTAT — qui fait quoi, maintenant

Ce fichier est **écrasé**, pas complété. Il décrit l'état du monde à l'instant.
L'historique vit dans `JOURNAL.md`, les arbitrages dans `DECISIONS.md`.

**Mets-le à jour à l'ouverture et à la fermeture de chaque chantier.** Une ligne
périmée ici coûte plus cher qu'une ligne absente.

Lecture : A (où en est `main`), B (ce qui est en cours), C et D (chez qui est la
balle), E (ce qui se mesure), F (backlog), G (ce qui vient d'être livré),
H (projets parallèles). Une PR fusionnée sort de B ; ses contrôles restants
vont en C ou D, ses mesures en E.

- Version intégrale avant le rangement du 02/10, avec son en-tête de
  25 mises à jour successives :
  https://github.com/Sebeth7/packshot-creator/blob/8c0dd067c0880e1a355d52edd8659b32446b50c6/docs/seo-geo/ETAT.md
- Photographie datée des PR et des branches au 02/10 (registres complets,
  contradictions relevées) : `REVUE-PR-BRANCHES-2026-10-02.md`

---

## A. État actuel

| | |
|---|---|
| Contrôle | 07/10/2026, Claude de Laurent (resynchronisation documentaire post-fusions ; relevé GitHub et `git` du 07/10) |
| `main` | `bf8c1c7` — fusion de #102 (PACK-L), 07/10 à 10:26:33 UTC ; avant : `35d250c` (#100, 07/10 06:01:10 UTC) et `262da03` (#101, 07/10 05:34:49 UTC) ; heures du commit de fusion. Fusionnées du 03/10 au 06/10 (horodatage `merged_at` GitHub, UTC) : #87 (03/10 17:51), #83 (03/10 19:49), #86 (04/10 06:23), #95 (04/10 09:10), #84 (06/10 10:26), #96 (06/10 12:41, avec #59, #60 et #77), #89 (13:29), #97 (14:09), #93 (14:18), #90 (14:24), #98 (14:56, documentation), #92 (15:17), #91 (15:52), #88 (16:03), #99 (16:44), #85 (17:46). Fermées sans fusion le 06/10 : #94 (14:59), #67 (16:56). SHA : G. QA `www` du 07/10 : C et G |
| Dernière mise à jour documentaire | 07/10 — Claude de Laurent : clôture post-fusion de #102 (PR documentaire brouillon ; seules les lignes touchées par #102 sont actualisées). Avant : 07/10 — Claude de Laurent : resynchronisation post-fusions et QA `www` du 07/10 (PR brouillon, DO NOT MERGE). Avant : 06/10 — #98 (clôture #97, #93, #90, fusionnée `c236705`) ; 06/10 — #96 synchronisée avec `main` `1e0901b`. Avant : 03/10 — revue pré-fusion #83 à #87 (`PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`) ; D44 et D45 inscrites (#87). Avant : 02/10, #81 (rangement GitHub, `de6c4cd`) ; 02/10, #80 (Claude de Sébastien) |
| PR ouvertes | **6 au 07/10 après la fusion de #102** (GitHub, 10:26 UTC) : #27, #64, #65, #70, #79, #82 ; plus la PR documentaire de clôture de #102. #100 et #101 fusionnées le 07/10 |
| Questions ouvertes | Q10, Q19 ; Q20 (caractéristiques produit) ; Q21 (D44, D45 et `/CLAUDE.md`) ; Q22 (pour information : CI et interface ; note du 07/10 : 93 pages, et non 90) ; Q23 (pour information : cluster AI Act, D46, copywriting FR ; auteur décidé par Laurent le 06/10 et implémenté dans #96 ; risque de doublon de numéro avec la Q23 de la branche de #82, non fusionnée) |

Règles transverses en vigueur, rappel :
- **D29** : aucune redirection XL v2 / XL G2, nouvelle ou annulée, avant validation du mapping produit.
- **D37, D39** : aucun lien entrant vers F5 avant le 23/11/2026, y compris depuis la landing Mode.
- **D46** (06/10) : cluster AI Act de cinq articles (A, S, B, C, D) en FR, EN et de-ch ; #96 fusionnée le 06/10 sur GO de Laurent ; `SEBASTIEN_VALIDATION = NOT_RECEIVED` ; remplace D41 sur le seul principe des satellites ; #61 à #63 ne se rouvrent pas (D41 maintenue sur ce point).
- **D47** (06/10) : CTA ROI vers le calculateur localisé, sans détour par Studios ; appliquée par #93, fusionnée le 06/10. AR-01 clos, non rouvert.
- **D42** : circuit éditorial en huit étapes ; une CI verte ou une fusion ne valent pas validation.
- **D43** : 200 USD par mois pour les services payants de recherche SEO/GEO, GO explicite de Laurent avant tout appel. Aucun registre de consommation dans `docs/seo-geo/` au 02/10 : la consommation d'octobre n'y est pas établie ; toute demande de GO l'indique, sans supposer un solde de 200 USD.

Approuvées par Laurent le 03/10, **applicables sur `main` depuis la fusion de leurs PR de mise en œuvre** (note d'exécution du 07/10 dans `DECISIONS.md`) :
- **D44** (R-UX-LONG) : navigation des pages longues par famille de gabarits ; jamais deux navigations collantes. Règle : #87 (03/10) ; mise en œuvre : #84 (blog, 06/10), #85 (barre, registre `data/navigation/pages-longues.ts`, 93 pages, 06/10) ; CI : #86 (04/10). Studios en HOLD ; Mode garde sa barre d'origine. Réserve UX du 07/10 : section active parfois décalée, diagnostic P2 proposé (F4 bis). Référence : `docs/standards/R-UX-LONG.md`.
- **D45** (R-PRODUCT-DIM) : dimensions, encombrements et charges des machines : référentiel obligatoire, contradictions conservées, aucune valeur commerciale contradictoire remplacée avant la réponse de Sébastien (Q20, **ouverte**). Règle : #87 ; référentiel et contrôle : #83 (03/10) ; CI : #86. Référence : `docs/standards/R-PRODUCT-DIM.md`.
- **D36** : `noindex` de l'origine `sysnext.vercel.app` implémenté (#68 pour le Worker, #99 pour Next) et contrôlé le 07/10 (C et G).

---

## B. Travaux actifs

Les 6 PR ouvertes au 07/10 après la fusion de #102 (GitHub). La PR documentaire de clôture de #102 n'y figure pas. Les PR fusionnées ou fermées depuis le 03/10 sont sorties de B (liste en A, détail en G). Inventaire antérieur, fichiers et conflits au 02/10 : `REVUE-PR-BRANCHES-2026-10-02.md`, § 2. Retard compté en commits de `main` `30482a0` absents de la branche (relevé du 07/10, non actualisé).

| PR | Objet | Propriétaire | Statut | Blocage | Prochain geste |
|---|---|---|---|---|---|
| (numéro à l'ouverture) | JSON-LD : `Product.url` et `Offer.url` des 17 fiches de-ch sur l'URL canonique `/de-ch/fotostudio/<slug>` (backlog F5) ; aucun texte visible modifié | Claude de Laurent | Brouillon, « DO NOT MERGE » ; branche `claude/wizardly-davinci-7i092p`, base `main` `06b18e2` ; ouverte le 08/10 (sprint SEO/GEO Recovery) | GO de fusion non donné ; `Service.url` des 8 hubs `branchen` exclu (#104, #107 HOLD ; gel Mode) | Contrôle de la Preview (source JSON-LD de 2 fiches de-ch) ; fusion sur GO distinct ; test des résultats enrichis et GSC « Fiches marchand » à J+14/J+28 |
| #106 | Pages EN servies en français (D9) : gate claims et arbitrages ; **0 page traduite**, 31 pages en HOLD ; PR documentaire seule (`docs/seo-geo/PACK-D9-GATE-2026-10-07.md`) | Claude de Laurent | Brouillon, « DO NOT MERGE » ; branche `claude/charming-bohr-6tu0j5`, base `main` `b806291` ; aucun fichier du site modifié | 15 hubs `UNVERIFIED_RENDERED_CLAIM` (BlendAI rendu, cadences Q20.14, ROI en %, conformités) ; 3 solutions et 3 articles en HOLD sur décision de Laurent du 07/10 ; D9-05 (#104), D9-16 (gel Mode), D9-24 à D9-31 inchangés | Décisions séparées sur les claims (hubs, solutions) et sur les articles de la gamme PackshotCreator/Ortery ; traduction ensuite, depuis la FR retenue ; GO de fusion distinct |
| #82 | Landing catalogue Orbitvu All-in-One, parcours fonctionnel V1 verrouillé, PDF en ligne | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `452d49b`, base `1e0901b`, 142 commits de retard ; touche `ETAT.md`, `JOURNAL.md` et `BOITE-AUX-LETTRES.md` (une seconde « Q23 », voir A) | **HOLD : ne pas publier** ; GO externes et publication | Aucun geste sans GO ; points CRM, notification et sous-traitants adressés à Sébastien dans la Q23 de la branche |
| #79 | Previews privées AI Act B, C, D — REVIEW ONLY | Claude de Laurent | Brouillon, `DO_NOT_MERGE` ; tête `a4a62ac`, 173 commits de retard ; matière reprise dans #96 (fusionnée le 06/10) ; pages et modules non repris | Ne se fusionne pas (D46) | Fermeture sur GO distinct de Laurent |
| #64 | D33, patch factuel (showroom Beynost, Orbitvu 2023, conditions commerciales, allemand, garantie, D25, comparatif Orbitvu) | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `63e1e92`, 202 commits de retard | Fusion sur décision explicite de Laurent et de Sébastien ; points ouverts en C | Contrôle de la Preview par Laurent (desktop, tablette, mobile) |
| #65 | D40 proposée : circuit Preview Vercel → Sébastien (documentation) | Claude de Laurent | Brouillon ; tête `c5e15a8`, 224 commits de retard ; touche `DECISIONS`, `ETAT`, `JOURNAL` | D40 non en vigueur ; 17 modifications imposées par D42 et D43 (JOURNAL du 01/10, « arbitrages finaux ») | Sort à arbitrer par Laurent (C) |
| #70 | Ubersuggest : `metaTitle` de `/fr/blog/photographie-2d-de-produits` | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `ef0bc89`, 228 commits de retard | Point ouvert : un `<title>` relève-t-il du copywriting réservé à Sébastien ? | Arbitrage séparé de Laurent |
| #27 | Maillage article → offre (Q3, 14 liens) et contrôle `curl.exe` du lot F | Claude de Laurent | Ouverte, non brouillon, inactive depuis le 23/09 ; tête `e81e5c0`, 333 commits de retard ; conflit sur un fichier supprimé par #71 | Historique : ne pas fusionner globalement. Revue demandée à Sébastien depuis le 23/09, non rendue | Aucun développement ; sort sur GO distinct de Laurent, preuves conservées (JOURNAL du 02/10) |

Collisions documentaires des PR ouvertes avec ce fichier et ses voisins (relevé du 07/10, diff depuis la base de chaque branche) : `JOURNAL.md` touché par les 7 ; `ETAT.md` par #82, #70, #65, #64, #27 ; `DECISIONS.md` par #65 ; `BOITE-AUX-LETTRES.md` par #82 ; `docs/standards/R-UX-LONG.md` par aucune.

---

## C. Balle chez Laurent

### Décisions

| Sujet | Depuis | Détail |
|---|---|---|
| #65 — harmoniser ou fermer | 01/10 | #76 est fusionnée : si #65 est conservée, elle reprend `main` (`8c0dd06` au moins) et applique les 17 modifications listées au JOURNAL du 01/10 (« arbitrages finaux »), budget D43 du 02/10 compris. Fusion après validation et autorisation finale de Laurent. Aucune modification de protection Vercel, de lien public ni d'autorisation |
| #27 — sort de la PR | 02/10 | Preuves conservées : contrôle `curl.exe` du lot F et liste des 14 liens cités au JOURNAL du 02/10 ; branche `content/maillage-q3` conservée. Fermeture possible sur GO distinct |
| Lot F — clôture du contrôle `curl.exe` (Worker déployé le 23/09, version `05c5c47c`) | 23/09 | Résultat « tout conforme » consigné le 23/09 dans le JOURNAL de la branche de #27 (`e81e5c0`), jamais fusionné ; cité au JOURNAL du 02/10. À confirmer par Laurent pour clore |
| Cluster AI Act (#96) — QA `www` restante après fusion | 06/10, mis à jour le 07/10 | #96 fusionnée le 06/10 à 12:41 UTC (`8247217`) sur GO de Laurent. QA `www` du 07/10 : 5 pages FR représentatives PASS. Les 15 versions linguistiques n'ont pas été contrôlées une à une. Contrôle J0 des 15 URL sur `sysnext.vercel.app` (`CLUSTER.md` § 6) : non consigné au 07/10. Instant du premier déploiement `www` : non établi (présence constatée le 07/10) |
| CTA de fin d'article (« Réservez votre démo », « Calculez votre ROI ») — observation de Laurent sur la Preview #96 | 06/10 | Les 15 articles portent `components/blog/ArticleCTA.tsx` (« Demander une démo », « Calculer mon ROI », bandeau sans visuel), commun à 201 pages (articles et guides). Les cartes « Réservez votre démo » / « Calculez votre ROI » appartiennent à la section finale de l'accueil (`app/[lang]/page.tsx`, `FloatingCalendar`) et de 6 autres gabarits : 114 pages au total, aucune sur le blog. À confirmer : quel bloc est visé. Recommandation : PR dédiée, hors #96 (`CLUSTER.md` § 12) |
| Zalando (A, S, D) | 06/10 | Page « Updated October 1, 2026 » relevée : intitulé « required by December 2026 » et « We strongly recommend » ; formulation prudente citée, sans obligation certaine (#96) |
| #64 — date de création | 01/10 | D33 dit 2001 ; faits métier du 30/09 cités par #64 : Sysnext 2001, lancement de PackshotCreator 2004 ; `foundingDate` 2004 ; le site affiche 2001, 2003 et 2004 selon les pages. `DECISIONS.md` non modifié |
| #64 — autres points | 30/09 | Délai : 10 jours (D32, F5) contre 12 jours (#64) ; showroom : D1 et `00-BRIEFING.md` citent Saint-Bonnet-de-Mure, #64 Beynost ; claims non sourcés restants dans `guide-achat-studio-2026` et `comment-calculer-le-roi-…` |
| #70 — `<title>` et copywriting | 30/09 | Point de gouvernance ouvert, à trancher avant toute fusion |
| D36 / #99 — reliquat après fusion | 06/10, mis à jour le 07/10 | **Implémentée et contrôlée.** #99 fusionnée le 06/10 à 16:44 UTC (`e830419`) ; #67 fermée sans fusion le 06/10 à 16:56 UTC. `sysnext.vercel.app` : 9 documents HTML sur 9 portent les en-têtes `noindex` attendus (mission du 07/10). `www` : 4 URL contrôlées par Laurent en requête HEAD PowerShell depuis son poste (D23) : HTTP 200, en-têtes D36 absents ; preuve tirée de ces requêtes HEAD, pas des captures Chrome. Reste : `smoke.mjs` post-fusion non consigné ; il lit la balise `robots`, pas l'en-tête (F6). Aucun déploiement du Worker requis |
| D29 — mapping produit Alphashot XL v2 / XL G2 | 24/09 | `SUSPENDED / REVIEW_PRODUCT_MAPPING`. Préalable à tout changement de redirection XL : 13 redirections du Worker vers `alphashot-xl-g2` et 2 règles de `next.config.ts` vers `alphashot-xl-v2` laissées en l'état ; aucun rollback automatique |
| Q10 — cible de clics | 19/09 | Les quick wins et la substitution de page ne comblent pas l'écart seuls ; la cible dépend du chantier marque (M5, 14-28/10) |
| D33 — fiche Google (hors dépôt) | 25/09 | Si elle déclare l'espagnol parlé, la corriger ; sa mention « Allemand non parlé » est à revoir au regard de D33 |
| P0-J — GO après le 08/10 | 25/09 | Voir E |
| D42 — positionner chaque PR de contenu dans le circuit en huit étapes | 01/10, liste mise à jour le 07/10 | PR ouvertes touchant `content/**`, `messages/**` ou un composant de landing, au 07/10 : #27, #64, #70, #79 (`content/revue-interne/**`), #82 (`components/landings/**`), #100 (`content/guides/**`). Étape atteinte non établie. #59, #60 et #77 sont fusionnées avec #96 (06/10) ; #65 ne touche aucun fichier de contenu ; #66 est acquise (arbitrage 6) |
| Studios — pilote coordonné | 03/10 | **Décidé par Laurent** : Studios retirée de #85 (`c331c40`) ; #85 fusionnée le 06/10 sans Studios (HOLD au registre). Barre de Studios dans le chantier commercial, sous validation spécifique |
| Activation d'`anchors` et de `roi-calculator` en CI | 06/10 | Décision séparée (D47, F4 bis). AR-01 est clos le 06/10 et ne se rouvre pas ; #94 fermée sans fusion le 06/10 à 14:59 UTC |
| D44 — réserve UX de la section active (#85) | 07/10 | QA `www` du 07/10 : surbrillance de la section active parfois décalée. Diagnostic P2 **proposé**, non arbitré ; aucune correction autorisée à ce jour (F4 bis) |
| Balise `<a>` sans `href` sur `/fr/blog/eclairage-photos-produits` | 07/10 | Anomalie distincte de la précédente, **hors périmètre de #92** : « intelligence artificielle dédiée » dans une balise `<a id="">` sans `href` (`content/blog/fr/eclairage-photos-produits.json`, présent sur `main` `30482a0` ; fichier absent du diff de #92). Aucune correction décidée (F4) |
| Accueil — gel D44 et hero modifié par #95 | 07/10 | Contradiction signalée, non arbitrée : D44 (« Ce qu'elle interdit ») et `R-UX-LONG.md` § 4 gèlent l'accueil jusqu'au 28/10 (M5) ; #95 (demande de Sébastien, Claude de Sébastien) a modifié son hero le 04/10. [Inférence] Le gel D44 vise la navigation ; son texte (« aucune modification de la page ») est plus large. Consigné comme événement de baseline de M5 (E) |
| #79, #100, #82 — gestes sur GO distinct | 07/10 | #79 : fermeture sur GO distinct (REVIEW ONLY). #100 : brouillon, ne pas fusionner sans GO. #82 : HOLD, ne pas publier |
| Branches — suppressions éventuelles | 02/10 | 39 branches sans commit absent de `main` ; 3 branches de PR fermées sans fusion ; décision sur GO seulement. Registre : `REVUE-PR-BRANCHES-2026-10-02.md`, § 4 et § 6. Non recompté depuis le 02/10 |

### Contrôles Chrome sur `www` (R4)

Le contrôle sur `sysnext.vercel.app` est fait et consigné au JOURNAL pour chaque ligne, sauf mention contraire.

Contrôles `www` du 07/10 déclarés PASS (#85 représentatif, #88, #89, #95, #96 partiel, D36 par HEAD, #102 sur 9 pages) : G et JOURNAL du 07/10. #91 : PASS antérieur, non retesté le 07/10 (consigne de Laurent). Les trois premières lignes ci-dessous ne portent que les limites de preuve restantes ; pour #84, #85, #88, #89, #91, #92, #95 et #96, aucun contrôle `sysnext.vercel.app` post-fusion n'est consigné au JOURNAL au 07/10.

| PR (fusion) | Pages | À vérifier |
|---|---|---|
| #85 D44 (`30482a0`, 06/10) | Une page par famille équipée | PASS représentatif du 07/10 sur six familles ; Studios sans barre commune ; Mode avec une seule barre. Limites : 768 px contrôlé via une iframe de même origine ; viewport principal limité à 1 321 px (1 440 px non observé directement) ; Firefox, Safari, appareils réels non regardés. Réserve : section active parfois décalée (C) |
| #92 A04b (`2a53727`, 06/10) | Ancienne URL MacroSphère | MacroSphère retirée comme lien ; ancienne URL observée dans Chrome le 07/10 : destination finale HTTP 404. Nombre de redirections intermédiaires : non établi |
| #96 cluster AI Act (`8247217`, 06/10) | 15 URL (5 articles × FR, EN, de-ch) | 5 pages FR représentatives PASS le 07/10 ; les autres versions non contrôlées une à une |
| #66 Mode (`4093d3d`, 01/10) | `/fr/packshot-mode`, `/en/packshot-mode`, `/de-ch/packshot-mode`, desktop puis mobile ; `/fr/studio-photo/alphastudio-xxl-v2` | Nouveau contenu (H1 « Packshot mode : des photos fidèles… »), aucun « 500+ » ni « -80 % », sommaire collant en desktop, sélecteur de langue vers la même page, CTA « Demander une démonstration » vers le formulaire (ne pas l'envoyer) ; fiche XXL : 100x90x190 cm |
| #74 UB-04 (`8365c73`, 01/10) | `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`, `/en/blog/packshot-photography-guide-why-make-product-packshots`, `/de-ch/blog/leitfaden-packshot-fotografie-warum-packshots-machen` | Titre seul dans le H1, fil d'Ariane au-dessus, rendu inchangé ; dans la source, `nav` étiqueté juste avant `<h1>` |
| #72 Inter (`a6760da`, 01/10), demande de Sébastien | `/fr` et 3 articles | Onglet Réseau : un seul `Inter_Bold_subset*.woff2` de 34 200 o, aucune requête Google Fonts |
| #58 R01 (`e2e1027`, 29/09) | `/de-ch/branchen/uhren` | Sélecteur de langue des hubs de-ch (« Suite » de l'entrée R01 du JOURNAL) |
| #55 JSON-LD (`e88e528`, 29/09) | `/de-ch/fotostudio/alphashot-pro-g2` ; `/fr/solutions/documentation-technique-visuelle` ; `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots` | `BreadcrumbList` en `/de-ch/fotostudio/…`, sans `/studio-photo/` ; fil à 2 éléments, sans `/fr/solutions` ; `dateModified` `2026-05-02` |
| #54 `llms.txt` (`2854c27`, 29/09) | `/llms.txt` | Contrôle sur `www` non consigné ; `sysnext.vercel.app` contrôlé le 01/10 |
| #52 blog phase 2A (`9ced920`, 29/09) | `/fr/blog/photographie-2d-de-produits`, `/fr/blog/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter` ; `/fr/blog/focus-sur-lhyperfocus` | Façade YouTube à la place du texte `[embed]`, aucun débordement en mobile, aucune requête YouTube avant clic ; le lien « À propos » s'ouvre dans le même onglet, un lien externe d'article dans un nouvel onglet. Desktop puis mobile |
| #50 blog phase 1 (`28a1169`, 29/09) | `/en/blog/8-steps-to-professional-jewelry-photography`, `/fr/blog/generer-images-produit-ia`, `/fr/blog/optimiser-collaboration-equipe-success-story-shotflow` | Puces, paragraphes, liens ; natif, encadré TL;DR inchangé ; Vimeo sans vide. Desktop puis mobile |
| #44 YouTube en façade (`b10bb5e`, 29/09) | Un article à vidéo, par exemple `/fr/blog/5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste` | Nouvelle visite, onglet Réseau : aucune requête YouTube avant clic ; clic : fenêtre d'information, puis « Autoriser et lire la vidéo » : lecture sans erreur 153 ; bandeau cookies : catégorie « Vidéos YouTube ». Desktop, puis mobile réel |
| #46 YouTube 153 (`cd17aeb`, 29/09) | `/en/blog/5-cameras-realistic-3d-animation`, `/fr/blog/5-appareils-photo-en-simultane-pour-de-lanimation-3d-realiste` | Requête `youtube.com/embed/VssNUk1qsXg` : `Referer: https://www.packshot-creator.com/` ; lecture après clic, aucune erreur 153 ; noter l'en-tête `referrer-policy` de la page. Desktop, puis Safari iOS et Chrome Android réels |
| #40 intégrations obsolètes (`15469e5`, 28/09) | `/fr`, `/fr/contact`, `/fr/studio-photo/alphashot-pro-g2`, `/calculateur-roi`, `/etude-clients-2026` et les 5 articles nettoyés | Onglet Réseau : aucune requête `lemlist` ni `iframe.packshot-creator.com` |
| #29 et #32, P0-A et D31 (24/09) | `/fr`, `/en`, `/de-ch` | Le site charge normalement ; sur `/de-ch`, aucun bloc d'avis ni de témoignages. `inLanguage` déjà contrôlé sur `sysnext.vercel.app` le 24/09 |
| #22 fiches (20/09) | 3 fiches machines | Chrome sur `www` et test des résultats enrichis de Google |

---

## D. Balle chez Sébastien

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Q19 — prise de connaissance de D42 (standard éditorial, applicable aux contenus des deux environnements Claude) et de D43 (pour information) | Laurent (D42, arbitrage 5) | 01/10 | Transmission seule ; `/CLAUDE.md` et le périmètre du Claude de Sébastien non modifiés ; aucun arbitrage n'étend D43 à son environnement |
| Q23 — cluster AI Act publié sur autorisation de Laurent (D46) | Laurent | 06/10 | Information seulement, sans blocage ; auteur passé à « PackshotCreator » le 06/10 ; #96 fusionnée le 06/10 ; `SEBASTIEN_VALIDATION = NOT_RECEIVED`. Risque de doublon de numéro avec la Q23 de la branche de #82 (note du 07/10 dans `BOITE-AUX-LETTRES.md`). Ligne précédente conservée : |
| Dossier « IA & images produit » (AI Act) — relecture | Laurent | 02/10 | **Transmission** : rapportée par le pilotage externe du 02/10, message intitulé « Dossier IA & images produit : nos 5 articles sont prêts pour ta relecture » ; information du pilotage, non établie par GitHub (les descriptions de #59 et #60 portent encore « mail à Sébastien non envoyé »). Périmètre des 5 articles non établi par GitHub ; [Inférence] A (#59), S (#60) et B, C, D (#79). **Accusé de réception** : non établi. **Validation métier** (D42, étape 5) : non établie, aucune trace GitHub (0 revue, 0 commentaire de `Sebeth7`) |
| Autres validations (D42, étape 5) | Laurent | — | #77 : « non transmise » selon sa description du 01/10 ; fusionnée avec #96 le 06/10 sur l'autorisation de Laurent (D46), validation de Sébastien non établie. #64 : après contrôle de la Preview par Laurent. Seule demande formelle sur GitHub : revue de #27, demandée le 23/09, dont le sort est d'abord à décider par Laurent |
| #80 — contrôle de bout en bout du formulaire de-ch | Claude de Sébastien (JOURNAL du 02/10) | 02/10 | Envoi réel depuis `/de-ch/kontakt` (il crée un vrai deal et deux courriels), puis suppression de la fiche test ; confirmation en allemand à décider ; test e2e qui envoie le formulaire dans les trois langues à écrire. Exécutant non désigné dans le JOURNAL |
| Academy (#71) — reliquat légal, audit Qualiopi du 16/10 | Claude de Sébastien (JOURNAL du 30/09) | 30/09 | CGU (article 1, article 4, article 5 « PackshotCreator Academy est certifié Qualiopi ») et politique de confidentialité citent encore le simulateur OPCO ou l'Academy comme entité certifiée ; formulation « formation(s) certifiée(s) Qualiopi », une vingtaine d'occurrences au moins, à arbitrer avec la consultante ; fiche Master du catalogue (« à distance » pour une formation en présentiel). À trancher : « suivi post-formation » du guide d'achat ; « Formateurs experts 10+ ans » et témoignages Marie D. et Camille R. (comparatif Orbitvu) ; « 5 000+ entreprises » (accueil) contre « plus de 500 entreprises » (guide budget). Textes légaux non modifiés par le Claude de Laurent |
| Branches sans PR portant des commits absents de `main` | Laurent | 19/09, recompté le 02/10 | Sur clone complet : `feat/sysnext-industrial` (4 commits, mini-site Sysnext Industrial) et `feat/geo-referentiels-prix` (2 commits, pages référentiels prix). Les 3 autres branches comptées le 19/09 n'en portent aucune (`REVUE-PR-BRANCHES-2026-10-02.md`, § 4). Pour information : conserver ou abandonner |
| Q20 — caractéristiques produit contradictoires | Laurent (D45) | 03/10 | 16 points avec les deux valeurs et leur provenance : Furniture Studio, versions XXL et autres « Pro v2 », encombrements XXL, XL G2, Micro, Alphatable, Alphadesk, axes, XL Pro v2, charges E-Comm et Fashion, produits sans source, documents fabricant, produits retirés du catalogue PSC mais actifs chez Orbitvu, catégories de taille, cadences, contenus historiques, prompt des leads. Bloque la PR PRODUCT-DATA seulement |
| Q21 — D44 et D45, mention dans `/CLAUDE.md` | Laurent | 03/10 | Prise de connaissance ; texte proposé pour `/CLAUDE.md`, décision de Sébastien (Q19, option A) |
| Information — #84, #85, #86 | Laurent | 03/10, mis à jour le 07/10 | Transmise à Sébastien par Q22 (#87) : CI renforcée (Vitest, parcours Playwright, rayon d'action), barre, sommaire du blog. Les trois PR sont fusionnées (#86 le 04/10, #84 et #85 le 06/10). Barre sur **93 pages**, et non 90 (note du 07/10 sous Q22). Aucune réponse consignée |
| Clarifier le `03 20 19 90 90` | — | 20/08 | Inchangé |

---

## E. Mesures en cours

| Mesure | Déployé, J0 | Lecture | Où | Règle pendant la mesure |
|---|---|---|---|---|
| P0-H — `gsc_pull_bornes` en parcours d'index inversé (migration `p0h_gsc_pull_bornes_index_backward_20260924`), critère 0 échec de M5 | 24/09 | Fenêtre du 25/09 au **08/10** | n8n, exécutions de `M5 · GSC pull` (`Sqdk2jygOSt9XEjL`) | M5 et `gsc_pull_bornes` gelés jusqu'au 08/10 |
| P0-J — device et watchdog | — | **Après le 08/10, sur GO** | n8n M5, Supabase `gsc_pull_bornes`, `data_freshness_expected` | `gsc_metrics_device` figée au 20/06/2026 (sites 2 et 3). Étapes : dimension device dans M5 (brouillon n8n, puis publication) ; borne device dans `gsc_pull_bornes` ; reprise de l'historique depuis le 21/06 ; `gsc_metrics_device` dans `data_freshness_expected`. Une PR documentaire fermera ensuite le P0 |
| F5 — page témoin `/fr/packshot-e-commerce` (D37) | 28/09, 18:43 UTC (#39) | **J+28 le 26/10, J+56 le 23/11** | `gsc_metrics`, requête × page, 28 jours glissants ; critère : landing FR devant l'article EN | Mesure principale sur la landing FR ; aucun lien entrant avant J+56 ; article EN inchangé (D35) ; gabarit partagé non modifié. Fichiers réservés par le chantier F5 : blocs `packshotEcommerce` de `messages/{fr,en,de-ch}.json`, `components/landings/PackshotEcommerce.tsx`, `app/[lang]/packshot-e-commerce/page.tsx`, `public/images/packshot-e-commerce/` ; ponctuellement `components/forms/ContactForm.tsx` (prop `hideRequestType`) et l'entrée `alphastudio-compact-v2` des deux `machines.ts`. Contrôle visuel sur `www` fait le 29/09 |
| Mode — `/packshot-mode` FR, EN, de-ch (D39) | 01/10 (#66) | **J+28 le 29/10, J+56 le 26/11** | GSC | Aucun lien vers F5 avant le 23/11 ; hub `/fr/industrie/mode-textile` distinct, non modifié |
| Marque — M5 et effet du sélecteur de langue (C1) sur `/fr` (D28) | 16/09 | **14/10 au 28/10** | GSC, requête « packshot creator », France | M1 à M4 et M6 faits (19/09 et 23/09) ; H1 écartée ; gain réévalué à 10-20 clics par mois ; fiche Google France corrigée par Laurent. **Événement de baseline** : hero de l'accueil modifié le 04/10 (#95, fusion à 09:10 UTC, `9b19e6d`), avant la fenêtre ; aucun gain SEO ne lui est attribué ; contradiction avec le gel D44 de l'accueil signalée en C |
| Fils d'Ariane de-ch et `solutions` (#55) | 29/09 | ~06/10-13/10 | GSC, rapport « Fils d'Ariane » | — |
| Canonique des 3 landings après #16 (Worker `167d7a15`) | 20/09 | ~04/10 | GSC, inspection d'URL, motif 8 | — |
| Lot F — 18 chemins de l'annexe K et `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie` sortis des 404/410 | 23/09 | 07/10 | GSC, couverture | — |
| P0-D/E — Worker `27b0153c` : 30 premiers sauts | 25/09 | 09/10 | GSC, couverture et pages de destination | Rollback disponible : `05c5c47c-4b60-41af-9acd-b3778be1e508` |
| `sku` et `priceValidUntil` des 51 fiches (#22) | 20/09 | Lisible depuis ~04/10 (J+14) | GSC, « Fiches marchand » | 2 des 4 champs manquants comblés ; les 2 autres relèvent de D32 |
| Bascule des réponses IA sur le dossier suisse | 22/08 | ~début octobre, si les mails sont partis | Sondes `geo-ultimate` | — |
| Cluster AI Act (#96) | J0 = mise en production effective (`CLUSTER.md` § 6) : fusion le 06/10 à 12:41 UTC ; instant du déploiement non établi ; présence sur `www` constatée le 07/10. J0 est donc le 06/10 ou le 07/10 | **J+7 technique** (13 ou 14/10), **J+28 SEO/GEO** (03 ou 04/11), **J+56 consolidation** (01 ou 02/12) ; dates calculées depuis les deux bornes de J0 | GSC par URL et par requête ; réponses IA (méthode à définir) | Baseline et variables concomitantes : `docs/seo-geo/cluster-ai-act-2026-10-06/CLUSTER.md`, section 6. Contrôle J0 `sysnext` des 15 URL non consigné |
| D36 — origine `sysnext.vercel.app` en `noindex` (#99) | 06/10, 16:44 UTC (fusion) | Sans date : sortie progressive des index au rythme des recrawls | Moteurs de réponse et index ; aucune méthode de mesure fixée dans le dépôt | D'anciennes citations de l'origine peuvent persister (JOURNAL du 06/10) |
| Événement concomitant du 07/10, à ne pas attribuer à une mesure | 07/10, 10:26 UTC (#102, `bf8c1c7`) | — | — | PACK-L : pages EN et de-CH des gabarits traduites, FR identique. A30 change `og:*` et `twitter:*` de 17 pages de-CH, dont `/de-ch/blog/ai-act-produktbilder` (J+7 AI Act le 13 ou 14/10) ; `<title>`, canonical et hreflang inchangés. Métadonnées sociales seulement : aucune cause SEO démontrée |
| Événements concomitants du 04/10 au 06/10, à ne pas attribuer à une mesure | — | — | — | #95 (hero de l'accueil, 04/10) ; #85 (barre D44 sur 93 pages, 06/10, effet UX seul) ; #84 (sommaire du blog, 06/10) ; #88 (`hreflang` de `/fr/blog/generer-images-produit-ia`, 06/10) ; #89, #90, #91, #92 (liens, 06/10) ; #93 (CTA ROI, 06/10) ; #97 (note BlendAI retirée, 06/10) ; #96 (cluster AI Act, 06/10) |
| TDE | — | **HOLD** | — | Correctifs méthodologiques avant toute nouvelle exécution (consigne de Laurent du 02/10). Aucun document TDE dans le dépôt |

Lectures échues au 07/10 (canonique des 3 landings, ~04/10 ; `sku` et `priceValidUntil`, ~04/10 ; fils d'Ariane, à partir du 06/10 ; lot F, 07/10) : aucune lecture consignée au JOURNAL depuis le 04/10 (relevé du 07/10). Aucune lecture faite par la resynchronisation du 07/10 (aucun nouvel audit).

---

## F. Backlog qualifié

Renvois seulement. Ce backlog n'autorise aucun chantier : chaque ligne suit
D42 et passe par une décision avant d'être ouverte. Backlog historique des
chantiers `C<n>`, arrêté au 19/09 : `06-CHANTIERS.md`.

### F1. Audits SEO/GEO A à E, F/F2

- Collecte en cours ; confrontation et backlog correctif dédoublonné confiés à un nouveau chat maître, hors dépôt. **Aucune correction de maillage ni de traduction issue de ces audits n'est lancée avant ce backlog.**
- Audit B (traductions historiques Webflow) : branche `claude/pensive-cannon-zl2oh4`, commit `ec2b4c6`, 160 fichiers, aucune PR. Plan de redéploiement en lots L0 à L9, non engagé ; aucune réécriture en masse autorisée.
- Audits A, C, D, E, F/F2 : absents du dépôt au 02/10.
- Audit de maillage du 29/09 : R01 livré (#58) ; R02 à R19 non traités.
- Audit Ubersuggest du 30/09 et plan du 01/10 : UB-04 livré (#74) ; seule correction sûre de l'audit : #70.
- Maillage Q3 : 14 liens dans #27 (16 paires listées, 2 non réalisables), à reprendre dans le backlog consolidé.
- Lot 1 V4.3 (#88 à #92) : les cinq PR fusionnées le 06/10. Corrections faites, à ne pas rouvrir.
- Registres V4.3 : un refresh de 36 lots et 582 occurrences a été effectué en **lecture seule** (mission du 07/10 ; hors dépôt). Ses annexes **ne sont pas** mises à jour dans le dépôt ; ses classifications sont provisoires et ne valent pas décisions. Les 36 lots et 582 occurrences restent un chantier documentaire distinct, non ouvert ici.

### F2. AI Act

06/10 : A, S, B, C, D réunis dans #96 (D46), avec #77 ; **#96 fusionnée le 06/10 à 12:41 UTC** (`8247217`), #59, #60 et #77 incluses (têtes `2a36322`, `74ae921`, `a207fe3` dans `main`). #79 reste ouverte, matière de revue. Anciennes PR #43, #53, #61 à #63 fermées sans fusion, à ne pas rouvrir. Dossier : `docs/seo-geo/cluster-ai-act-2026-10-06/`. Les lignes BL et RV28 ci-dessous sont reprises du 06/10 sans réévaluation : leur état après la fusion de #96 n'est pas revérifié le 07/10 (aucun nouvel audit).

- BL-43-1 : gabarit des articles, `og:url`, `og:site_name`, `og:locale` et carte `twitter` par article, import `HeadingData` inutilisé (`app/[lang]/blog/[slug]/page.tsx`, #43 `4aa305e`). PR applicative distincte, rayon large (125 articles JSON), réécrite sur `main`, sans cherry-pick.
- BL-43-2 : E1/E2, `generer-images-produit-ia` (corps l. 16, FAQ l. 36) attribue à l'AI Act une règle de non-tromperie qui relève du droit de la consommation (#43 `4aa305e`). Correction proposée dans #77 ; validation de Sébastien ; renvoi vers A seulement après sa publication. 07/10 : #77 et A fusionnées avec #96 le 06/10 ; effet sur ce constat non revérifié.
- BL-43-3 : E3 à E7, articles « migrer » FR, EN et de-ch (#43 `4aa305e`, `216f324`, `175a9d5`). Paragraphe AI Act corrigé dans #77 ; restent hors paragraphe (E3 à E6) : « sans rien changer à l'exactitude de ses caractéristiques », FAQ n° 3, lien Orbitvu à la place des lignes directrices. À revalider contre le texte final de A ; de-ch selon D38.
- BL-43-4 : mesures D16 de création de A (28/09), archivées au JOURNAL et sur #43, absentes de #59 : y renvoyer à la fusion de #59. 07/10 : #59 fusionnée avec #96 le 06/10 ; renvoi non vérifié.
- BL-53-1 (optionnel, idée seulement) : arbre « faut-il signaler cette image ? » (#53 `2d4e66d`), à reconstruire depuis le texte juridique final de A si Laurent le décide, sans l'ancien HTML/CSS.
- Reliquat de la revue préalable du 28/09 (JOURNAL du 2026-10-01, entrée « reliquat de la revue du 28/09 ») ; constats à vérifier, aucune correction décidée, aucune validation juridique :
  - RV28-E8 à RV28-E13, contenus du site, formulations présentes sur `main` `2ef01b2` : BlendAI.studio « solution propriétaire » et JSON-LD `provider` (E8) ; FTC et Californie dans `studio-ia-vs-ia-generative` (E9, E10) ; « photo réelle auditable, métadonnées préservées » (E11) ; « zéro hallucination », « jamais au produit », « fidèles à 100 % » (E12) ; témoignage « ne font pas la différence » (E13) ;
  - RV28-H1 à RV28-H3, site blendai.studio, hors dépôt : « Résultats indiscernables du réel », « Conformité juridique garantie », pages légales en 404 au 28/09 ; état actuel NON VÉRIFIÉ ;
  - faits BlendAI de l'évaluation du 28/09, déclaratifs et non reconfirmés : marquage des exports en développement, mannequins virtuels non vérifiés, société exploitante en création.
- Style commun des tableaux : corrigé sous 640 px par #96 (en-têtes sur plusieurs lignes) ; défilement interne maintenu pour les tableaux larges (A, D) en mobile.
- BL-43-1 (gabarit : `twitter:*`, `og:url`, `og:locale`, `inLanguage`) : non traité par #96, toujours ouvert. `og:image` en AVIF : non lu par plusieurs réseaux sociaux, préexistant.

### F3. Academy et Qualiopi

Livrée par #71. Reliquat juridique : voir D. Chantier distinct, validation de Sébastien ; aucun texte légal modifié par ce rangement.

### F4. Blog et UX

Acquis : #44, #46, #50, #52, #69, #74 (et #72 pour la police) ; #84 (sommaire du blog, 06/10) ; #89, #90, #91, #92 (liens, 06/10). Ne pas recréer de PR pour ces anomalies. Suites non traitées :
- ~~Sommaire mobile : à 390 px, `h2` visé partiellement masqué après un clic ; même défaut en tablette (relevé par #59)~~ — **traité par #84**, fusionnée le 06/10 (titre visé atteint en mobile et en desktop ; spec `sommaire-blog` au toucher à 390 px ; comparaison sur 7 largeurs dont 768 px, JOURNAL du 03/10) ; contrôle `www` de Laurent du 06/10. Tablette réelle non regardée. Ne pas rouvrir.
- Balise `<a>` sans `href` (07/10) : `/fr/blog/eclairage-photos-produits`, « intelligence artificielle dédiée » dans `<a id="">` (`content/blog/fr/eclairage-photos-produits.json`, sur `main` `30482a0`). Hors périmètre de #92 (fichier absent de son diff). Aucune correction décidée ; distincte de la réserve D44 (F4 bis).
- Articles à page dédiée, hors gabarit commun : 2 articles (FR et EN, 4 pages) portent encore le fil d'Ariane dans le H1 (hors périmètre de UB-04).
- Intégrations legacy à traiter avec preuve (décision de Laurent du 29/09) : 6 `<img src="*.mp4">` (GIF Webflow convertis en MP4, nombre de boucles d'origine non établi ; nom accessible des 4 dont l'`alt` vaut `__wf_reserved_inherit` à arbitrer) ; 2 liens `target="_new"` (gnpp.wordpress.com, FR et EN) ; F10 (3 iframes sans `title` : saasphoto FR et EN, Vimeo EN) ; saasphoto (iframe 300 × 150, 302 puis 402 depuis le conteneur, à contrôler dans Chrome) ; Sketchfab (iframe 300 × 150) ; `alt` Webflow ; traductions (voir F1, Audit B).
- Consentement : **GOOGLE_MAPS_PRIVACY_AUDIT_REQUIRED = YES** — l'iframe Google Maps de `app/[lang]/contact/page.tsx` (l. 154 au 28/09) se charge à l'affichage, sans consentement ; 6 autres iframes tierces se chargent à l'affichage : `player.vimeo.com` (success story Shotflow FR/EN), `sketchfab.com` (photogrammétrie FR/EN), `saasphoto.com` (« photographie de produits à 360 degrés en interne » FR/EN). La catégorie « Vidéos YouTube » ne couvre que YouTube.
- Bandeau cookies en Pixel 5 : le clic « Personnaliser » échoue dans `e2e/cookie-banner.spec.ts` (existait sur `main` avant #44), à instruire.
- Rendu `prose` des guides, CGU, mentions légales et distributeur (même plugin inactif).
- `addYouTubeReferrerPolicy` (#46) reste en garde après la façade, sans effet aujourd'hui ; retrait possible sur décision.
- Cloudflare : vérifier si la Managed Transform « Add security headers » est active. [Inférence] Source probable de `Referrer-Policy: same-origin` devant `www`. Aucune modification Cloudflare décidée.
- Erreur React #418 intermittente, observée aussi sur des pages non modifiées par #66 (JOURNAL du 01/10) ; cause non établie.
- Hub `/fr/industrie/mode-textile` : chiffres non sourcés, PR distincte recommandée.
- P3 (06/10) — `/en/blog/what-return-on-investment-with-an-internal-photo-studio` : ancre visible « Packshot for theoptics And eyewear » (espace manquant avant `<strong>optics</strong>`, capitalisation de « And »). Antériorité à #90 : établie par git, texte identique dans `f529bd5` (20/09) et `6cbb903` (avant #90) ; #90 n'a modifié que le `href`. Non corrigé ; ni P0 ni P1.

### F4 bis. Suites de D44 et D45 (03/10)

- PRODUCT-DATA : correction des valeurs après Q20 ; catégorie A d'abord (encombrements XL G2 et Micro), puis dérivation des deux catalogues depuis le référentiel. Valeurs F5 après le 23/11, Mode après le 26/11.
- Contenus historiques à dimensions fausses (registre `docs/standards/registre-ecarts-dimensions.md`, H1 à H19) : circuit de Sébastien ; `guide-achat-studio-2026` et `orbitvu-vs-concurrents` coordonnés avec #64 et #27.
- `lib/lead-enrichment.ts` : liste de machines du prompt à générer depuis les catalogues, sur accord de Sébastien (Q20.16) ; aucun test sans GO (appels Gemini payants).
- Images d'articles sans dimensions : elles allongent la page pendant le défilement (cause racine du troisième défaut corrigé par #84) ; contenus de Sébastien.
- `e2e/anchors.spec.ts` reste différé en CI (D47, 06/10) : son test préexistant « #calculateur-roi exists on /fr/studios-photo-automatises » échoue tant que le témoin du sélecteur garde son lien vers Studios ; les 16 tests ciblés des 7 sources ROI (#93) sont exécutés en local. Activation d'`anchors` et de `roi-calculator` en CI : décision séparée.
- Mode : bascule sur le composant mutualisé après le 26/11 (parité, décision de Laurent). F5 : réexamen après le 23/11.
- `guide-achat-studio-2026` : débordement horizontal à 1 024 px, préexistant (page sous #64).
- Réserve UX de #85 (07/10) : surbrillance de la section active parfois décalée dans la barre commune. Diagnostic P2 **proposé**, non arbitré ; aucune correction autorisée. Comportement attendu de `R-UX-LONG.md` § 3.1 inchangé.

### F5. Données structurées (backlog de #55)

`Product.url` et `Offer.url` des 13 fiches de-ch en `/de-ch/studio-photo/<slug>` (307) — 17 fiches avec les 4 `delisted`, corrigé dans la PR brouillon du 08/10 (B), non fusionnée ; `Service.url` des 8 `branchen/*` en `/de-ch/industrie/<slug>` (301), laissé en HOLD (#104, #107, gel Mode) ; `author.url` `/fr/a-propos` sur les articles de-ch ; nœud `provider` `Organization` sans `@id` sur `ia-photo-produit` (bloc `AggregateRating`) ; variante d'`Organization` de `/fr` et `/en/distributeur-orbitvu-suisse` (`distributorOrganizationSchema` : téléphones à tirets, sans `email`, `ContactPoint` CH sans `German`), à traiter avec D33.

### F6. Décisions à mettre en œuvre

- D32 : `hasMerchantReturnPolicy` (aucun retour) et `shippingDetails` (livraison et installation facturées en supplément, délai indicatif d'environ 10 jours, jamais garanti ; même règle en France et en Suisse), PR applicative distincte. Écart à trancher avec #64 (12 jours), voir C.
- D33 : `foundingDate` (`components/seo/SchemaOrg.tsx:72` au 25/09, `'2004'`) à aligner après arbitrage de la date (voir C) ; relire les quatre textes qui annoncent en allemand l'ensemble du service, formation et SAV compris (relevé du 25/09 : `messages/fr.json:189`, `messages/de-ch.json:167`, `messages/en.json:93`, `app/[lang]/distributeur-orbitvu-suisse/page.tsx:36`) — traités en partie par #64.
- D36 : **implémentée** (#68 pour le Worker, #99 pour Next, fusionnée le 06/10 ; #67 fermée sans fusion) **et contrôlée** le 07/10 (voir C). Reste : `smoke.mjs` lit la balise `robots`, pas l'en-tête ; son passage post-fusion n'est pas consigné.
- D22 (Q6 close) : règle WAF « Skip SBFM — PerplexityBot », conditionnée au user-agent et aux adresses publiées ; contrôle à J+3. Modification Cloudflare, non exécutée au 25/09.
- D29 : aucun changement de redirection XL avant validation du mapping (voir C).

### F7. Suites hors dépôt de #40

Non exécutées : vérifier puis supprimer les variables `WEBFLOW_*` du projet Vercel `sysnext` si elles existent ; révoquer la clé API Webflow si elle existe ; désactiver le tracking visiteurs côté compte Lemlist ; vérifier puis supprimer l'enregistrement DNS `iframe.`. `trail.packshot-creator.com` reste en `PASSTHROUGH_HOSTS` tant que l'usage e-mail de Lemlist n'est pas explicitement abandonné. `.env.example` : 4 lignes `WEBFLOW_*` à retirer par une PR dédiée (garde-conséquences).

### F8. Chantiers ouverts le 19/09, sans activité depuis

État et réservations inchangés ; à requalifier par le backlog consolidé (F1).

| Chantier | Qui | État | Fichiers réservés | Depuis |
|---|---|---|---|---|
| C6 — pilote de 25 URL, hygiène de locale (D28), effet clics ≈ 0 | Claude de Laurent | Liste constituée, cycle distinct du lot F | `cloudflare-worker/src/index.js` | 04/09 |
| Consolidation du cluster comparatif | Claude de Laurent | Débloquée — 0 backlink mesuré le 19/09 avec témoin | `content/**` | 19/09 |
| Renverser l'axe GEO | Claude de Laurent | 3 pages en circuit (b) | `content/**`, `messages/fr.json` | 19/09 |
| Suisse — A1, A3, 8 `branchen` | Claude de Laurent | À instruire | `messages/de-ch.json`, `content/**` | 19/09 |
| Maillage article → offre (Q3) | Claude de Laurent | #27 (voir B) | `content/**` | 19/09 |

Autres : P0-F (crawlers IA) `DEFERRED_BLOCKED_ACCESS`, faute d'accès aux Security Events Cloudflare, aucune modification WAF ou SBFM sans mesure ; P1-Q (réécriture ou suppression du blog) non ouvert.

### F9. Points non vérifiés de #64

Liste complète au JOURNAL de la branche de #64 (entrée du 01/10 « micro-corrections finales du comparatif Orbitvu ») et dans sa description : valeurs des tableaux du comparatif, temps du workflow Orbitvu → BlendAI, seuils de profil, appréciations qualitatives, métadonnées. #64 ne vaut pas validation factuelle intégrale de `/fr/blog/orbitvu-vs-concurrents`.

---

## G. Dernières livraisons

Liste complète du 28/09 au 02/10, commits de fusion compris : `REVUE-PR-BRANCHES-2026-10-02.md`, § 3. Du 03/10 au 06/10 : lignes ci-dessous, horodatage `merged_at` GitHub (le commit de fusion peut porter une seconde de moins). Contrôles `www` du 07/10 : source, mission de Laurent du 07/10 ; QA représentative, pas exhaustive. Contrôles Chrome restants : C.

| PR | Objet | Fusion (UTC) | Reste |
|---|---|---|---|
| #102 (`bf8c1c7`) | PACK-L — i18n EN/de-CH des gabarits : A07, A29 et 18 reliquats P2/P3 ; FR identique (161/161) ; entrée `alphastudio-compact-v2` et surfaces F5 inchangées | 07/10 10:26 | `sysnext` 07/10 : smoke vert (17 pages, 3 ressources), QA 8 URL et modale 19/19, `<head>` de 11 pages identique au build testé. `www` 07/10 dans Chrome : PASS sur 9 pages (2 fiches de-CH, 1 fiche EN, 2 guides A29, sélecteur et modale, IA de-CH, 2 secteurs de-CH), 1280 et 390 px ; réserves A, B, C inchangées. Relecture EN/DE : 15 groupes. Dettes séparées A, B, C (JOURNAL du 07/10) |
| #85 (`30482a0`) | D44 — barre de sommaire collante mutualisée, registre, **93 pages** ; Studios HOLD ; Mode avec sa barre d'origine ; exceptions de #91 retirées | 06/10 17:46 | `www` 07/10 : PASS représentatif sur six familles ; Studios sans barre commune ; Mode avec une seule barre ; 768 px via iframe de même origine ; viewport principal limité à 1 321 px. Réserve : section active parfois décalée, P2 proposé (C, F4 bis) |
| #99 (`e830419`) | D36 — `noindex` de l'origine `sysnext.vercel.app`, partie Next ; remplace #67 (fermée sans fusion à 16:56) | 06/10 16:44 | `sysnext` : 9/9 documents HTML avec les en-têtes attendus ; `www` : 4 URL en HEAD PowerShell par Laurent, HTTP 200, en-têtes D36 absents (07/10) ; `smoke.mjs` non consigné |
| #88 (`62b3b8d`) | C08 — `hreflang` de `/fr/blog/generer-images-produit-ia` | 06/10 16:03 | `www` 07/10 sur l'URL exacte : PASS ; canonical auto-référent ; `hreflang` fr, fr-CH, x-default ; ni en ni de-CH |
| #91 (`3b427d7`) | A03 — 4 liens de guides vers leur destination finale | 06/10 15:52 | `www` déjà PASS ; non retesté le 07/10 (consigne de Laurent) |
| #92 (`2a53727`) | A04b — liens externes morts et balises sans `href` (10 articles), MacroSphère retirée comme lien | 06/10 15:17 | Ancienne URL MacroSphère dans Chrome (07/10) : destination finale 404 ; redirections intermédiaires non établies. Anomalie distincte hors #92 : `<a>` sans `href` sur `/fr/blog/eclairage-photos-produits` (F4) |
| #98 (`c236705`) | Documentation : clôture de #97, #93, #90 | 06/10 14:56 | — |
| #97, #93, #90 | P0 intégrité : note BlendAI 4,9/5 × 100, non sourcée, retirée ; D47 : CTA ROI directs vers le calculateur localisé ; A02 : liens des articles ROI interne (URL Orbitvu, Photoshop, lunetterie) | 06/10 14:09, 14:18 et 14:24 | Contrôlées par Laurent dans Chrome sur `www` le 06/10 (PASS) ; `sysnext.vercel.app` contrôlé (JOURNAL) ; P3 de l'ancre EN « eyewear » en F4 |
| #89 (`a168b33`) | A04a — liens Skeelbox retirés, texte et statistique inchangés | 06/10 13:29 | 07/10 : aucun lien Skeelbox dans le scan des 323 URL du sitemap ; mention éditoriale conservée |
| #96 (`8247217`), avec #59, #60, #77 | Cluster AI Act : A, S, B, C, D en FR, EN et de-ch (D46) | 06/10 12:41 | `www` 07/10 : 5 pages FR représentatives PASS ; 15 versions non contrôlées une à une ; instant du premier déploiement `www` non établi ; mesure (E) |
| #84 | D44 — sommaire du blog : titre visé atteint en mobile et en desktop, liste latérale plafonnée et défilante, entrée active juste, molette du lecteur respectée | 06/10 10:26 | Contrôlée par Laurent dans Chrome sur `www` le 06/10 ; Firefox, Safari et appareils réels non regardés |
| #95 (`9b19e6d`) | Accueil : film de la gamme Orbitvu dans le hero (Claude de Sébastien) | 04/10 09:10 | `www` 07/10 : hero et vidéo Orbitvu PASS. Événement de baseline de M5 (E) ; Safari, Firefox, iOS, CWV non regardés (JOURNAL du 04/10) |
| #86 (`0ac062b`) | CI — Vitest et parcours Playwright ciblés dans `pr-checks`, garde-conséquences étendu | 04/10 06:23 | `anchors` différé en CI (F4 bis) |
| #83 (`1bc7195`) | D45 — référentiel des dimensions, contrôle de cohérence, registre des écarts, Q20 | 03/10 19:49 | Q20 ouverte ; PRODUCT-DATA après réponse de Sébastien |
| #87 (`17a4248`) | UX-GOV — D44, D45, `docs/standards/`, Q21, Q22 | 03/10 17:51 | Q21, Q22 sans réponse consignée |
| #80 | `/api/contact` accepte `de-ch` : les demandes des pages de-ch étaient refusées en 400 (Claude de Sébastien) | 02/10 12:48 | Contrôle de bout en bout (D) ; ne pas recréer le correctif |
| #76 | D42, D43 (200 USD par mois), réconciliation avec D40 | 02/10 04:42 | Q19 ; harmonisation de #65 |
| #66, #78 | Landing Mode FR, EN, de-ch ; documentation | 01/10 16:26 et 17:30 | Chrome ; mesure (E) |
| #74, #75 | UB-04, fil d'Ariane hors du H1 ; documentation | 01/10 10:29 et 14:57 | Chrome |
| #73 | Archivage AI Act, D41, backlog BL-43 / BL-53 / RV28 | 01/10 11:19 | — |
| #72 | Inter auto-hébergée | 01/10 09:02 | Chrome |
| #68 | D36, protection Worker | 01/10 06:58 | Déployée le 01/10 à 06:59:53 UTC, version `107715bc`, confirmée le 06/10 (Cloudflare, lecture seule) ; `www` contrôlé dans Chrome le 06/10 ; partie Next : #99, fusionnée le 06/10 (ligne ci-dessus) |
| #71 | Academy réduite au catalogue Qualiopi (Claude de Sébastien) | 30/09 20:40 | Reliquat légal (D) |
| #69 | Centrage des articles de blog (Claude de Sébastien) | 30/09 18:33 | — |
| #58 | R01, sélecteur de langue des 8 hubs `/de-ch/branchen/*` (26 liens en 404 et 6 redirections ramenés à 0) | 29/09 18:48 | Chrome |
| #55 | JSON-LD, fils d'Ariane de-ch et `solutions`, `dateModified` | 29/09 18:35 | Chrome ; mesure (E) ; backlog F5 |
| #54 | `llms.txt` : « officiel » (D6), date retirée, 16 secteurs | 29/09 16:31 | `www` non consigné |
| #52, #50, #44, #46 | Blog : embeds Webflow, structure, YouTube en façade, erreur 153 | 29/09 | Chrome |
| #39, #40 | Landing F5 ; intégrations obsolètes retirées | 28/09 | Mesure F5 (E) ; Chrome et suites hors dépôt de #40 (F7) |
| #23 | Accents du français restaurés (`fr.json`, `machines.ts`, meta `alphashot-360`) | 20/09 17:30 | — (chantier « Accents » encore listé ouvert avant le 02/10) |

---

## H. Projets parallèles

Sources : consigne de Laurent du 02/10 et traces du dépôt. Ce ne sont pas tous des PR en cours.

| Projet | Propriétaire | Statut réel | Prochain gate | Trace dans le dépôt |
|---|---|---|---|---|
| Landing « Télécharger le catalogue Orbitvu All-in-One » | Claude de Laurent (#82) | **Pas une landing publiée** ; #82 en brouillon, HOLD, ne pas publier (B) | GO externes et publication ; réponses de Sébastien (Q23 de la branche de #82) | #82, non fusionnée |
| Programme visuel AI Act | Claude de Laurent ; validation de Laurent puis de Sébastien | Illustrations intégrées aux Preview de A (7), S (6) et B/C/D (#79), toutes générées par IA et légendées comme telles ; D3 attend une capture réelle datée. Visuels de A, S, B, C, D fusionnés avec #96 le 06/10 (D46 : utilisation autorisée après QA, sans validation de Sébastien) | Validation de Sébastien non reçue (`NOT_RECEIVED`) | #96 (fusionnée), #79 (REVIEW ONLY) |
| Mode | Claude de Laurent | Landing publiée le 01/10 (#66) ; phase de mesure | J+28 le 29/10 | `main` |
| Academy | Claude de Sébastien, Sébastien | Publication acquise (#71) ; reliquat légal | Audit Qualiopi du 16/10 ; validation de Sébastien | `main` ; JOURNAL du 30/09 |
| Traduction Webflow | Claude de Laurent | Audit B livré en lecture seule ; aucune réécriture en masse autorisée | Backlog consolidé (F1) | `claude/pensive-cannon-zl2oh4` |
| Consolidation des audits A à E, F/F2 | Nouveau chat maître, pour Laurent | Collecte en cours | Backlog correctif dédoublonné | Audit B seulement |
| TDE | Non établi par le dépôt | **HOLD** | Correctifs méthodologiques | Aucune |
| Screaming Frog / n8n | Laurent (`gsc-crawl-seo`, `05-INFRA.md`) | Infrastructure de collecte existante ; M5 gelé jusqu'au 08/10 (P0-H) | P0-J après le 08/10, sur GO | `05-INFRA.md` ; aucune exécution de workflow par ce rangement |
| GEO et mesure PSC + orbitvu.fr | Non établi par le dépôt | Hors dépôt ; relevé SERP ponctuel au JOURNAL (24/09, 5 requêtes exécutées sur 10 : orbitvu.fr dans le top 10 sur 3, devant PSC à chaque fois) | Non établi | JOURNAL du 24/09 |
| PSC 2.0 / Content Refinery | Non établi par le dépôt | Orientation stratégique ; **aucune création de pages autorisée** | Décision de Laurent | Aucune |

---

## Référence

### P0 du 24/09

| Élément | État |
|---|---|
| P0-A | **APPLIED** : #29 fusionnée le 24/09 (`6c16108`) ; `inLanguage` `fr-FR`, `en-US` et `de-CH` contrôlés sur `sysnext.vercel.app` le 24/09 ; reste Chrome sur `www` (C) |
| P0-B | Verdict `MIXED` retenu par Laurent, livrable hors dépôt ; aucune preuve de pénalité liée au contenu IA |
| P1-Q | Non ouvert. Relevé du 25/09 : aucun commit touchant `content/blog` sur `main` depuis le 01/08 |
| P0-D/E | **CLOSED** le 25/09 : #30 fusionnée (`665f5ef`) ; Worker déployé depuis `main` (`69cd647`), version `27b0153c-5516-432a-91a4-20cddce250ca`, 16 témoins PASS depuis le poste de Laurent ; rollback `05c5c47c-4b60-41af-9acd-b3778be1e508` ; mappings XL inchangés |
| P0-F | **DEFERRED_BLOCKED_ACCESS** |
| P0-H | **APPLIED / MEASUREMENT WINDOW OPEN** jusqu'au 08/10 (E) |
| P0-I | **APPLIED / PASS** le 25/09 à 06:13 UTC, migration `p0i_filtre_pollution_gsc_site_20260925` : `amazon` retiré des motifs de pollution des 8 fonctions, `(^\|\s)site:` ajouté ; clics inchangés, dry-run reproduit exactement. Rollback gardé par md5 au JOURNAL du 25/09 |
| P0-J | **OPEN, différé** après le 08/10 (E) |
| P0-K | Resynchronisation documentaire du 25/09, effective : #35 fusionnée le 25/09 à 06:38:55 UTC |
| D29 | **SUSPENDED / REVIEW_PRODUCT_MAPPING** (C) |
| #31 | **CLOSED / NOT MERGED** (`SUPERSEDED / REVIEW_PRODUCT_MAPPING`) ; aucune de ses règles conservée ; branche conservée |
| D30 | **OUT_OF_SCOPE_NO_CHANGE** : aucun prix ni aucune devise modifiés |
| D31 | **APPLIED** : #32 fusionnée le 24/09 (`c9f8aa5`). Aucun témoignage, `Review` ni `aggregateRating` sur `/de-ch`, contrôlé sur `sysnext.vercel.app` le 24/09 (48 pages de-ch) |

P0-C et P0-G : état non établi par les sources du dépôt (P0-C : constats de marque déclarés par Laurent, livrable hors dépôt).

### Questions

**Ouvertes au 07/10 : Q10** (cible D24), **Q19** (D42 au Claude de Sébastien ; D43 pour information), **Q20** (caractéristiques produit), **Q21** (D44, D45 et `/CLAUDE.md`), **Q22** (information ; note du 07/10 : 93 pages) et **Q23** (information, cluster AI Act ; doublon de numéro possible avec la branche de #82), voir `BOITE-AUX-LETTRES.md`.

Closes : Q1 et Q3 le 17/09 ; Q2, Q4, Q6, Q12, Q13, Q14 et Q15 par Laurent le 25/09 (Q2 selon le régime tacite prévu au 24/09 ; réponses en D15, D22 et D32 à D36) ; Q5, Q7, Q8, Q9 et Q11 arbitrées le 19/09 sans dépôt, consignées en D26. Q16 à Q18 jamais déposées, absence acceptée par Laurent le 24/09 ; la numérotation reprend à Q19.

### Décisions récentes

| Décision | État | Où vit le texte |
|---|---|---|
| D39 | En vigueur | `main` (#66) |
| D40 | **Proposée**, non fusionnée ; en vigueur à la fusion de #65, selon son propre statut | #65, tête `c5e15a8` |
| D47 | En vigueur ; appliquée par #93, fusionnée le 06/10 (`6cbb903`) ; AR-01 clos | `main` (#93) ; note d'exécution du 07/10 |
| D46 | En vigueur, complétée le 06/10 (publication par Laurent, exception D16 pour B, C, D) ; #96 fusionnée le 06/10 (`8247217`) ; QA `www` partielle | `main` (#96) ; note d'exécution du 07/10 |
| D41 | Remplacée par D46 sur le principe des satellites ; maintenue pour #61 à #63 | `main` (#73) |
| D42 | En vigueur depuis la décision de Laurent du 01/10, applicable aux PR déjà ouvertes | `main` (#76, fusionnée le 02/10, `9400eaa`) |
| D43 | En vigueur depuis la décision de Laurent du 02/10 : 200 USD par mois, GO explicite avant tout appel payant | `main` (#76, fusionnée le 02/10, `9400eaa`) |
| D44 | Principe approuvé par Laurent le 03/10 ; appliquée : #87 (règle, 03/10), #84 et #85 (mise en œuvre, 06/10, 93 pages), #86 (CI, 04/10) ; réserve UX du 07/10 | `main` (#87) ; note d'exécution du 07/10 |
| D45 | Principe approuvé par Laurent le 03/10 ; contrôles présents : #87 (règle), #83 (référentiel, 03/10), #86 (CI) ; Q20 ouverte | `main` (#87) ; note d'exécution du 07/10 |
| D36 | En vigueur ; implémentée (#68, #99) et contrôlée le 07/10 | `main` (D36 du 25/09) ; note d'exécution du 07/10 |

### Accès de Laurent — vérifiés au dashboard le 16/09

| Accès | État réel |
|---|---|
| Dépôt GitHub `Sebeth7/packshot-creator` | **Écriture** |
| Équipe Vercel `sebs-projects-ca1e93a7` | **Membre** — `laurent.wainberg@sysnext.com`, rôle Member, 2FA active. Portée : les 8 projets de l'équipe, arbitré et assumé (D14) |
| Jeton de contournement des Preview | Créé le 16/09 ; non transmis au 20/09 (constat sur #22 : sans lui, un Preview répond 302 vers `vercel.com/sso-api`). État ultérieur non consigné |
| Cloudflare | En place |
| Supabase `gsc-crawl-seo` | Sa propre base |

Fait métier de Laurent du 01/10 (D42) : Sébastien ouvre les Preview Vercel protégées.

Note du 16/09, conservée : rien ne bloquait le démarrage de Laurent, une fois le
jeton transmis et `docs/seo-geo/README.md` partagé.

L'attribution de rôles par projet sur Vercel est réservée au plan Enterprise ;
sur le plan Pro, l'accès est au niveau de l'équipe (D14). Côté GitHub, `Sebeth7`
est un compte personnel : l'accès collaborateur y est strictement par dépôt ;
Laurent n'a que `packshot-creator`, vérifié le 16/09 sur les 9 dépôts.

---

## Gabarit

```markdown
| PR | Objet | Propriétaire | Statut | Blocage | Prochain geste |
|---|---|---|---|---|---|
| #<n> | <objet> | Claude de Laurent | brouillon \| prête \| en attente d'arbitrage \| bloquée (raison) | <ce qui bloque> | <geste suivant> |
```

Une PR fusionnée **sort de B** : une ligne en G, ses contrôles en C ou D, ses
mesures en E. Un chantier sans PR ni activité va en F.

Rappel : « en attente d'arbitrage » ne concerne que ce qui engage l'entreprise
vis-à-vis d'un tiers (`01-RAYON-ACTION.md`). Le reste se merge sans attendre,
dans le respect de D42 pour les contenus éditoriaux.
