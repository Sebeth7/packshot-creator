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
| Contrôle | 06/10/2026, Claude de Laurent (synchronisation de #96 avec `main` `1e0901b`, relevé GitHub) |
| `main` | `1e0901b` — fusion de #84 (sommaire du blog, D44), 06/10 à 10:26:23 UTC ; relevé le 06/10. Fusionnées depuis le 03/10 : #87, #83, #86, #95, #84. Production de #84 contrôlée par Laurent dans Chrome sur `www` le 06/10 (molette, dernière entrée et « Sources » accessibles) ; déploiement non relevé par script (R4) |
| Dernière mise à jour documentaire | 06/10 — Claude de Laurent : #96 synchronisée avec `main` `1e0901b` (#84), sommaire de A vérifié, CTA de fin d'article localisés. Avant : 06/10 — cluster AI Act, D46, Q23 (PR #96). Avant : 03/10 — Claude de Laurent : revue pré-fusion #83 à #87 (`PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md`) ; D44 et D45 inscrites, `docs/standards/`, Q21 (#87, brouillon). Avant : 02/10, #81 (rangement GitHub, fusionnée, `de6c4cd`) ; 02/10, #80 (Claude de Sébastien) |
| PR ouvertes | 19 au 06/10 : #27, #59, #60, #64, #65, #67, #70, #77, #79, #82, #85, #88 à #94, et #96 (cluster AI Act, qui intègre #59, #60 et #77) |
| Questions ouvertes | Q10, Q19 ; Q20 (caractéristiques produit) ; Q21 (D44, D45 et `/CLAUDE.md`) ; Q22 (pour information : CI et interface) ; Q23 (pour information : cluster AI Act, D46, copywriting FR et auteur) |

Règles transverses en vigueur, rappel :
- **D29** : aucune redirection XL v2 / XL G2, nouvelle ou annulée, avant validation du mapping produit.
- **D37, D39** : aucun lien entrant vers F5 avant le 23/11/2026, y compris depuis la landing Mode.
- **D46** (06/10) : cluster AI Act de cinq articles (A, S, B, C, D) en FR, EN et de-ch, publication sur GO explicite de Laurent ; remplace D41 sur le seul principe des satellites ; #61 à #63 ne se rouvrent pas (D41 maintenue sur ce point).
- **D42** : circuit éditorial en huit étapes ; une CI verte ou une fusion ne valent pas validation.
- **D43** : 200 USD par mois pour les services payants de recherche SEO/GEO, GO explicite de Laurent avant tout appel. Aucun registre de consommation dans `docs/seo-geo/` au 02/10 : la consommation d'octobre n'y est pas établie ; toute demande de GO l'indique, sans supposer un solde de 200 USD.

Approuvées par Laurent le 03/10, **non encore applicables sur `main`** (inscription en PR brouillon ; application à la fusion de chaque PR de mise en œuvre) :
- **D44** (R-UX-LONG) : navigation des pages longues par famille de gabarits ; jamais deux navigations collantes. Règle écrite : #87 ; mise en œuvre : #84 (blog, fusionnée le 06/10), #85 (barre, registre `data/navigation/pages-longues.ts`) ; CI : #86. Référence : `docs/standards/R-UX-LONG.md`.
- **D45** (R-PRODUCT-DIM) : dimensions, encombrements et charges des machines : référentiel obligatoire, contradictions conservées, aucune valeur commerciale contradictoire remplacée avant la réponse de Sébastien (Q20). Règle écrite : #87 ; référentiel et contrôle : #83 ; CI : #86. Référence : `docs/standards/R-PRODUCT-DIM.md`.

---

## B. Travaux actifs

Les 9 PR opérationnelles inventoriées avant #81 ; #81, documentaire, n'y figure pas. Détail, fichiers et conflits : `REVUE-PR-BRANCHES-2026-10-02.md`, § 2.

| PR | Objet | Propriétaire | Statut | Blocage | Prochain geste |
|---|---|---|---|---|---|
| #96 | Cluster AI Act : A, S, B, C, D en FR, EN et de-ch ; intègre #59, #60 et #77 ; D46 ; registre juridique du 06/10 | Claude de Laurent | Brouillon ; synchronisée le 06/10 avec `main` `1e0901b` (#84) par fusion, sans rebase ; 15 articles identiques à l'octet à la tête précédente `8d5b131` ; sommaire de A conforme (spec `sommaire-blog` 25/25, `CLUSTER.md` § 12) ; date de publication `2026-10-06` maintenue ; auteur « PackshotCreator » ; `PUBLICATION_AUTHORITY = LAURENT`, `SEBASTIEN_VALIDATION = NOT_RECEIVED` | Contrôle Chrome final de la Preview (checklist § 11) | « GO MERGE #96 » de Laurent, puis fusion et contrôle J0 |
| #59 | Pilier AI Act A, FR | Claude de Laurent | Brouillon ; tête `2a36322` **intégrée à #96** | — | Se ferme avec #96 (aucun développement séparé) |
| #60 | Article Suisse S, FR | Claude de Laurent | Brouillon ; tête `74ae921` **intégrée à #96** | — | Se ferme avec #96 |
| #77 | AI Act : deux formulations juridiques corrigées (FR, EN, de-ch) | Claude de Laurent | Brouillon ; tête `a207fe3` **intégrée à #96** (liens vers A ajoutés dans les mêmes paragraphes) | — | Se ferme avec #96 |
| #79 | Previews privées AI Act B, C, D — REVIEW ONLY | Claude de Laurent | Brouillon, `DO_NOT_MERGE` ; tête `a4a62ac` ; matière reprise dans #96 (textes, 5 AVIF), pages et modules non repris | Ne se fusionne pas (D46) | Fermeture sur décision de Laurent après la publication |
| #64 | D33, patch factuel (showroom Beynost, Orbitvu 2023, conditions commerciales, allemand, garantie, D25, comparatif Orbitvu) | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `63e1e92`, 31 commits de retard | Fusion sur décision explicite de Laurent et de Sébastien ; points ouverts en C | Contrôle de la Preview par Laurent (desktop, tablette, mobile) |
| #65 | D40 proposée : circuit Preview Vercel → Sébastien (documentation) | Claude de Laurent | Brouillon ; tête `c5e15a8`, 53 commits de retard ; conflits `DECISIONS`, `ETAT`, `JOURNAL` | D40 non en vigueur ; 17 modifications imposées par D42 et D43 (JOURNAL du 01/10, « arbitrages finaux ») | Sort à arbitrer par Laurent (C) |
| #67 | D36 : `noindex` de l'origine `sysnext.vercel.app` | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `62ebfae`, 60 commits de retard ; conflit sur le test Worker (#68) | Porte imposée avant toute décision sur #67 : version active du Worker confirmée (présence du bloc D36), puis `www` contrôlé. Déploiement après #68 rapporté le 01/10 par les transmissions de pilotage ; non consigné au JOURNAL, non vérifié par ce rangement | Lecture Cloudflare READ ONLY, puis contrôle de `www` (C). Aucun nouveau déploiement autorisé |
| #70 | Ubersuggest : `metaTitle` de `/fr/blog/photographie-2d-de-produits` | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `ef0bc89` | Point ouvert : un `<title>` relève-t-il du copywriting réservé à Sébastien ? | Arbitrage séparé de Laurent |
| #83 | D45 — référentiel des dimensions, contrôle Vitest (23 tests), registre des écarts, Q20 | Claude de Laurent | Brouillon ; tête `1c31ac6`, CI verte ; garde de la valeur retirée : capacité et objet distingués (revue pré-fusion) ; aucune valeur affichée modifiée | Vitest exécuté en CI seulement après #86 (le workflow de `main` n'en lance pas) | GO de fusion de Laurent ; réponse de Sébastien à Q20 pour la suite (PR PRODUCT-DATA) |
| #85 | D44 — barre de sommaire collante mutualisée, registre, 90 pages (guides, fiches, IA, solutions, 2 articles) | Claude de Laurent | Brouillon ; tête `c331c40` ; Studios retirée et guides de #91 en HOLD temporaire (arbitrages du 03/10) ; spec 45/45 | — | Preview d'une page par famille ; GO de fusion ; retrait des exceptions de #91 à sa clôture |
| #93 | ROI — CTA directs vers le calculateur réel (D47), spec ROI sur l'outil réellement servi ; option B d'AR-01 abandonnée | Claude de Laurent | Brouillon ; synchronisée le 06/10 avec `main` `8247217` (#96) par fusion, sans rebase ; 18 liens corrigés dans 7 fichiers (36 rendus, 14 pages) ; Studios et témoin du sélecteur identiques à `main` ; `/api/**` simulé dans les tests | Date de fusion non arbitrée ; #94 à réconcilier | Contrôle de la Preview par Laurent ; arbitrage de la date ; GO de fusion distinct |
| #86 | CI — Vitest et parcours Playwright ciblés dans `pr-checks`, garde-conséquences étendu, spec du sélecteur réécrit | Claude de Laurent | Brouillon ; tête `5cc5bf8`, CI verte ; inventaire explicite des specs dans le résumé du job, `--pass-with-no-tests` retiré (revue pré-fusion) | Modification d'infrastructure ; `anchors.spec` non exécuté avant AR-01 | GO de Laurent ; information de Sébastien |
| #87 | UX-GOV : D44, D45, `docs/standards/`, Q21, Q22, ce fichier, état du chantier, revue pré-fusion et finalisation | Claude de Laurent | Brouillon, documentation seule ; branche `ccr-79f70eb9-7ls0wm` | — | GO de fusion de Laurent ; à fusionner en premier |
| #27 | Maillage article → offre (Q3, 14 liens) et contrôle `curl.exe` du lot F | Claude de Laurent | Ouverte, non brouillon, inactive depuis le 23/09 ; 164 commits de retard ; conflit sur un fichier supprimé par #71 | Historique : ne pas fusionner globalement. Revue demandée à Sébastien depuis le 23/09, non rendue | Aucun développement ; sort sur GO distinct de Laurent, preuves conservées (JOURNAL du 02/10) |

---

## C. Balle chez Laurent

### Décisions

| Sujet | Depuis | Détail |
|---|---|---|
| #65 — harmoniser ou fermer | 01/10 | #76 est fusionnée : si #65 est conservée, elle reprend `main` (`8c0dd06` au moins) et applique les 17 modifications listées au JOURNAL du 01/10 (« arbitrages finaux »), budget D43 du 02/10 compris. Fusion après validation et autorisation finale de Laurent. Aucune modification de protection Vercel, de lien public ni d'autorisation |
| #27 — sort de la PR | 02/10 | Preuves conservées : contrôle `curl.exe` du lot F et liste des 14 liens cités au JOURNAL du 02/10 ; branche `content/maillage-q3` conservée. Fermeture possible sur GO distinct |
| Lot F — clôture du contrôle `curl.exe` (Worker déployé le 23/09, version `05c5c47c`) | 23/09 | Résultat « tout conforme » consigné le 23/09 dans le JOURNAL de la branche de #27 (`e81e5c0`), jamais fusionné ; cité au JOURNAL du 02/10. À confirmer par Laurent pour clore |
| Cluster AI Act (#96) — contrôle humain de la Preview, puis « GO MERGE #96 » | 06/10 | Décisions de Laurent du 06/10 appliquées (D46 complétée : publication par Laurent, exception D16, auteur « PackshotCreator », date réelle, visuels autorisés après QA). Reste : checklist Preview (`CLUSTER.md` § 11), date réelle de publication au dernier commit, GO de fusion |
| CTA de fin d'article (« Réservez votre démo », « Calculez votre ROI ») — observation de Laurent sur la Preview #96 | 06/10 | Les 15 articles portent `components/blog/ArticleCTA.tsx` (« Demander une démo », « Calculer mon ROI », bandeau sans visuel), commun à 201 pages (articles et guides). Les cartes « Réservez votre démo » / « Calculez votre ROI » appartiennent à la section finale de l'accueil (`app/[lang]/page.tsx`, `FloatingCalendar`) et de 6 autres gabarits : 114 pages au total, aucune sur le blog. À confirmer : quel bloc est visé. Recommandation : PR dédiée, hors #96 (`CLUSTER.md` § 12) |
| Zalando (A, S, D) | 06/10 | Page « Updated October 1, 2026 » relevée : intitulé « required by December 2026 » et « We strongly recommend » ; formulation prudente citée, sans obligation certaine (#96) |
| #64 — date de création | 01/10 | D33 dit 2001 ; faits métier du 30/09 cités par #64 : Sysnext 2001, lancement de PackshotCreator 2004 ; `foundingDate` 2004 ; le site affiche 2001, 2003 et 2004 selon les pages. `DECISIONS.md` non modifié |
| #64 — autres points | 30/09 | Délai : 10 jours (D32, F5) contre 12 jours (#64) ; showroom : D1 et `00-BRIEFING.md` citent Saint-Bonnet-de-Mure, #64 Beynost ; claims non sourcés restants dans `guide-achat-studio-2026` et `comment-calculer-le-roi-…` |
| #70 — `<title>` et copywriting | 30/09 | Point de gouvernance ouvert, à trancher avant toute fusion |
| D36 / #67 — confirmer le Worker actif | 01/10 | Déploiement du Worker après #68 rapporté le 01/10 par les transmissions de pilotage ; non consigné au JOURNAL, version active non vérifiée par ce rangement. Ordre : (1) lecture Cloudflare **READ ONLY** du script actif : version, présence de `x-packshot-origin-noindex` (bloc D36 de `main` depuis #68), écart éventuel avec le dépôt (R5) ; (2) contrôle de `www` ; (3) seulement ensuite, décision sur #67 : reprise de `main` (garder le test Worker de `main`) et nouveau GO. **Aucun nouveau déploiement autorisé** |
| D29 — mapping produit Alphashot XL v2 / XL G2 | 24/09 | `SUSPENDED / REVIEW_PRODUCT_MAPPING`. Préalable à tout changement de redirection XL : 13 redirections du Worker vers `alphashot-xl-g2` et 2 règles de `next.config.ts` vers `alphashot-xl-v2` laissées en l'état ; aucun rollback automatique |
| Q10 — cible de clics | 19/09 | Les quick wins et la substitution de page ne comblent pas l'écart seuls ; la cible dépend du chantier marque (M5, 14-28/10) |
| D33 — fiche Google (hors dépôt) | 25/09 | Si elle déclare l'espagnol parlé, la corriger ; sa mention « Allemand non parlé » est à revoir au regard de D33 |
| P0-J — GO après le 08/10 | 25/09 | Voir E |
| D42 — positionner chaque PR de contenu dans le circuit en huit étapes | 01/10 | PR ouvertes touchant `content/**`, `messages/**` ou un composant de landing : #27, #59, #60, #64, #70, #77, et #79 (`content/revue-interne/**`). Étape atteinte non établie (relevé du 01/10 sur `main` `6b80e6a`). #65 et #67 ne touchent aucun fichier de contenu ; #66 est acquise (arbitrage 6) |
| D44, D45 — ordre de fusion et GO | 03/10 | Proposé après revue : #87, #83, #86, puis AR-01 (lot autonome, si arbitré), #84, #85 (variante sans Studios si arbitrée). Fusion d'essai locale de cette séquence : conflits limités à `JOURNAL.md` et `BOITE-AUX-LETTRES.md` ; build vert ; Vitest 408/408 ; parcours 74/74. Chaque fusion sur GO distinct ; aucune fusion automatique. Détail : `PSC_REVUE_PRE_FUSION_83_87_ALIGNEMENT_V43_2026-10-03.md` |
| Studios — #85 et pilote coordonné | 03/10 | **Décidé par Laurent** : Studios retirée de #85 (`c331c40`) ; barre de Studios dans le chantier commercial, sous validation spécifique |
| AR-01 — CTA ROI | 03/10, remplacé le 06/10 | **Option B du 03/10 (ancre permanente `#calculateur-roi` sur Studios) abandonnée.** D47, décision de Laurent du 06/10 : les CTA ROI de 7 sources visent le calculateur localisé (FR `/fr/calculateur-roi`, EN `/en/calculateur-roi`, de-ch `/de-ch/roi-rechner`) ; véhicule #93 ; Studios identique à `main`, sans `id` ajouté ; témoin `studio-photo/selecteur-machines` inchangé ; GA4 séparé ; `anchors` et `roi-calculator` non activés en CI. **Reste à décider : date de fusion de #93** (avant fusion, GO distinct). #94 décrit encore l'option B et la réservation de Studios « exclusivement l'`id` » : réconciliation requise, sur GO séparé |
| D44 — guides de #91 (lot 1) | 03/10 | **Décidé par Laurent** : formulation actuelle de D44 ; trois guides en exception temporaire dans #85 jusqu'à la clôture de #91. Si #91 est fusionnée avant #85 : contrôle sur `main` puis retrait (scénario vérifié en local : guides éligibles) |
| D44 — libellé actif de la barre (#85) | 03/10 | **Décidé par Laurent** : emplacement fixe à droite des numéros ; le déplacement dynamique de Mode n'est pas repris |
| Branches — suppressions éventuelles | 02/10 | 39 branches sans commit absent de `main` ; 3 branches de PR fermées sans fusion ; décision sur GO seulement. Registre : `REVUE-PR-BRANCHES-2026-10-02.md`, § 4 et § 6 |

### Contrôles Chrome sur `www` (R4)

Le contrôle sur `sysnext.vercel.app` est fait et consigné au JOURNAL pour chaque ligne, sauf mention contraire.

| PR (fusion) | Pages | À vérifier |
|---|---|---|
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
| Q23 — cluster AI Act publié sur autorisation de Laurent (D46) | Laurent | 06/10 | Information seulement, sans blocage ; auteur passé à « PackshotCreator » le 06/10. Ligne précédente conservée : |
| Dossier « IA & images produit » (AI Act) — relecture | Laurent | 02/10 | **Transmission** : rapportée par le pilotage externe du 02/10, message intitulé « Dossier IA & images produit : nos 5 articles sont prêts pour ta relecture » ; information du pilotage, non établie par GitHub (les descriptions de #59 et #60 portent encore « mail à Sébastien non envoyé »). Périmètre des 5 articles non établi par GitHub ; [Inférence] A (#59), S (#60) et B, C, D (#79). **Accusé de réception** : non établi. **Validation métier** (D42, étape 5) : non établie, aucune trace GitHub (0 revue, 0 commentaire de `Sebeth7`) |
| Autres validations (D42, étape 5) | Laurent | — | #77 : « non transmise » selon sa description du 01/10, état ultérieur non établi. #64 : après contrôle de la Preview par Laurent. Seule demande formelle sur GitHub : revue de #27, demandée le 23/09, dont le sort est d'abord à décider par Laurent |
| #80 — contrôle de bout en bout du formulaire de-ch | Claude de Sébastien (JOURNAL du 02/10) | 02/10 | Envoi réel depuis `/de-ch/kontakt` (il crée un vrai deal et deux courriels), puis suppression de la fiche test ; confirmation en allemand à décider ; test e2e qui envoie le formulaire dans les trois langues à écrire. Exécutant non désigné dans le JOURNAL |
| Academy (#71) — reliquat légal, audit Qualiopi du 16/10 | Claude de Sébastien (JOURNAL du 30/09) | 30/09 | CGU (article 1, article 4, article 5 « PackshotCreator Academy est certifié Qualiopi ») et politique de confidentialité citent encore le simulateur OPCO ou l'Academy comme entité certifiée ; formulation « formation(s) certifiée(s) Qualiopi », une vingtaine d'occurrences au moins, à arbitrer avec la consultante ; fiche Master du catalogue (« à distance » pour une formation en présentiel). À trancher : « suivi post-formation » du guide d'achat ; « Formateurs experts 10+ ans » et témoignages Marie D. et Camille R. (comparatif Orbitvu) ; « 5 000+ entreprises » (accueil) contre « plus de 500 entreprises » (guide budget). Textes légaux non modifiés par le Claude de Laurent |
| Branches sans PR portant des commits absents de `main` | Laurent | 19/09, recompté le 02/10 | Sur clone complet : `feat/sysnext-industrial` (4 commits, mini-site Sysnext Industrial) et `feat/geo-referentiels-prix` (2 commits, pages référentiels prix). Les 3 autres branches comptées le 19/09 n'en portent aucune (`REVUE-PR-BRANCHES-2026-10-02.md`, § 4). Pour information : conserver ou abandonner |
| Q20 — caractéristiques produit contradictoires | Laurent (D45) | 03/10 | 16 points avec les deux valeurs et leur provenance : Furniture Studio, versions XXL et autres « Pro v2 », encombrements XXL, XL G2, Micro, Alphatable, Alphadesk, axes, XL Pro v2, charges E-Comm et Fashion, produits sans source, documents fabricant, produits retirés du catalogue PSC mais actifs chez Orbitvu, catégories de taille, cadences, contenus historiques, prompt des leads. Bloque la PR PRODUCT-DATA seulement |
| Q21 — D44 et D45, mention dans `/CLAUDE.md` | Laurent | 03/10 | Prise de connaissance ; texte proposé pour `/CLAUDE.md`, décision de Sébastien (Q19, option A) |
| Information — #84, #85, #86 | Laurent | 03/10 | Transmise à Sébastien par Q22 (#87) : CI renforcée (Vitest, parcours Playwright, rayon d'action), barre sur 90 pages, sommaire du blog |
| Clarifier le `03 20 19 90 90` | — | 20/08 | Inchangé |

---

## E. Mesures en cours

| Mesure | Déployé, J0 | Lecture | Où | Règle pendant la mesure |
|---|---|---|---|---|
| P0-H — `gsc_pull_bornes` en parcours d'index inversé (migration `p0h_gsc_pull_bornes_index_backward_20260924`), critère 0 échec de M5 | 24/09 | Fenêtre du 25/09 au **08/10** | n8n, exécutions de `M5 · GSC pull` (`Sqdk2jygOSt9XEjL`) | M5 et `gsc_pull_bornes` gelés jusqu'au 08/10 |
| P0-J — device et watchdog | — | **Après le 08/10, sur GO** | n8n M5, Supabase `gsc_pull_bornes`, `data_freshness_expected` | `gsc_metrics_device` figée au 20/06/2026 (sites 2 et 3). Étapes : dimension device dans M5 (brouillon n8n, puis publication) ; borne device dans `gsc_pull_bornes` ; reprise de l'historique depuis le 21/06 ; `gsc_metrics_device` dans `data_freshness_expected`. Une PR documentaire fermera ensuite le P0 |
| F5 — page témoin `/fr/packshot-e-commerce` (D37) | 28/09, 18:43 UTC (#39) | **J+28 le 26/10, J+56 le 23/11** | `gsc_metrics`, requête × page, 28 jours glissants ; critère : landing FR devant l'article EN | Mesure principale sur la landing FR ; aucun lien entrant avant J+56 ; article EN inchangé (D35) ; gabarit partagé non modifié. Fichiers réservés par le chantier F5 : blocs `packshotEcommerce` de `messages/{fr,en,de-ch}.json`, `components/landings/PackshotEcommerce.tsx`, `app/[lang]/packshot-e-commerce/page.tsx`, `public/images/packshot-e-commerce/` ; ponctuellement `components/forms/ContactForm.tsx` (prop `hideRequestType`) et l'entrée `alphastudio-compact-v2` des deux `machines.ts`. Contrôle visuel sur `www` fait le 29/09 |
| Mode — `/packshot-mode` FR, EN, de-ch (D39) | 01/10 (#66) | **J+28 le 29/10, J+56 le 26/11** | GSC | Aucun lien vers F5 avant le 23/11 ; hub `/fr/industrie/mode-textile` distinct, non modifié |
| Marque — M5 et effet du sélecteur de langue (C1) sur `/fr` (D28) | 16/09 | **14/10 au 28/10** | GSC, requête « packshot creator », France | M1 à M4 et M6 faits (19/09 et 23/09) ; H1 écartée ; gain réévalué à 10-20 clics par mois ; fiche Google France corrigée par Laurent |
| Fils d'Ariane de-ch et `solutions` (#55) | 29/09 | ~06/10-13/10 | GSC, rapport « Fils d'Ariane » | — |
| Canonique des 3 landings après #16 (Worker `167d7a15`) | 20/09 | ~04/10 | GSC, inspection d'URL, motif 8 | — |
| Lot F — 18 chemins de l'annexe K et `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie` sortis des 404/410 | 23/09 | 07/10 | GSC, couverture | — |
| P0-D/E — Worker `27b0153c` : 30 premiers sauts | 25/09 | 09/10 | GSC, couverture et pages de destination | Rollback disponible : `05c5c47c-4b60-41af-9acd-b3778be1e508` |
| `sku` et `priceValidUntil` des 51 fiches (#22) | 20/09 | Lisible depuis ~04/10 (J+14) | GSC, « Fiches marchand » | 2 des 4 champs manquants comblés ; les 2 autres relèvent de D32 |
| Bascule des réponses IA sur le dossier suisse | 22/08 | ~début octobre, si les mails sont partis | Sondes `geo-ultimate` | — |
| Cluster AI Act (#96) | À la fusion (J0) | **J+7 technique, J+28 SEO/GEO, J+56 consolidation** | GSC par URL et par requête ; réponses IA (méthode à définir) | Baseline et variables concomitantes : `docs/seo-geo/cluster-ai-act-2026-10-06/CLUSTER.md`, section 6 |
| TDE | — | **HOLD** | — | Correctifs méthodologiques avant toute nouvelle exécution (consigne de Laurent du 02/10). Aucun document TDE dans le dépôt |

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

### F2. AI Act

06/10 : A, S, B, C, D réunis dans #96 (D46), avec #77 ; #79 reste matière de revue. Anciennes PR #43, #53, #61 à #63 fermées sans fusion, à ne pas rouvrir. Dossier : `docs/seo-geo/cluster-ai-act-2026-10-06/`.

- BL-43-1 : gabarit des articles, `og:url`, `og:site_name`, `og:locale` et carte `twitter` par article, import `HeadingData` inutilisé (`app/[lang]/blog/[slug]/page.tsx`, #43 `4aa305e`). PR applicative distincte, rayon large (125 articles JSON), réécrite sur `main`, sans cherry-pick.
- BL-43-2 : E1/E2, `generer-images-produit-ia` (corps l. 16, FAQ l. 36) attribue à l'AI Act une règle de non-tromperie qui relève du droit de la consommation (#43 `4aa305e`). Correction proposée dans #77 ; validation de Sébastien ; renvoi vers A seulement après sa publication.
- BL-43-3 : E3 à E7, articles « migrer » FR, EN et de-ch (#43 `4aa305e`, `216f324`, `175a9d5`). Paragraphe AI Act corrigé dans #77 ; restent hors paragraphe (E3 à E6) : « sans rien changer à l'exactitude de ses caractéristiques », FAQ n° 3, lien Orbitvu à la place des lignes directrices. À revalider contre le texte final de A ; de-ch selon D38.
- BL-43-4 : mesures D16 de création de A (28/09), archivées au JOURNAL et sur #43, absentes de #59 : y renvoyer à la fusion de #59.
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

Acquis : #44, #46, #50, #52, #69, #74 (et #72 pour la police). Ne pas recréer de PR pour ces anomalies. Suites non traitées :
- Sommaire mobile (antérieur à #50, présent sur `main`) : à 390 px, après un clic dans le sommaire, le `h2` visé reste partiellement masqué ; même défaut au toucher en tablette (relevé par #59).
- Articles à page dédiée, hors gabarit commun : 2 articles (FR et EN, 4 pages) portent encore le fil d'Ariane dans le H1 (hors périmètre de UB-04).
- Intégrations legacy à traiter avec preuve (décision de Laurent du 29/09) : 6 `<img src="*.mp4">` (GIF Webflow convertis en MP4, nombre de boucles d'origine non établi ; nom accessible des 4 dont l'`alt` vaut `__wf_reserved_inherit` à arbitrer) ; 2 liens `target="_new"` (gnpp.wordpress.com, FR et EN) ; F10 (3 iframes sans `title` : saasphoto FR et EN, Vimeo EN) ; saasphoto (iframe 300 × 150, 302 puis 402 depuis le conteneur, à contrôler dans Chrome) ; Sketchfab (iframe 300 × 150) ; `alt` Webflow ; traductions (voir F1, Audit B).
- Consentement : **GOOGLE_MAPS_PRIVACY_AUDIT_REQUIRED = YES** — l'iframe Google Maps de `app/[lang]/contact/page.tsx` (l. 154 au 28/09) se charge à l'affichage, sans consentement ; 6 autres iframes tierces se chargent à l'affichage : `player.vimeo.com` (success story Shotflow FR/EN), `sketchfab.com` (photogrammétrie FR/EN), `saasphoto.com` (« photographie de produits à 360 degrés en interne » FR/EN). La catégorie « Vidéos YouTube » ne couvre que YouTube.
- Bandeau cookies en Pixel 5 : le clic « Personnaliser » échoue dans `e2e/cookie-banner.spec.ts` (existait sur `main` avant #44), à instruire.
- Rendu `prose` des guides, CGU, mentions légales et distributeur (même plugin inactif).
- `addYouTubeReferrerPolicy` (#46) reste en garde après la façade, sans effet aujourd'hui ; retrait possible sur décision.
- Cloudflare : vérifier si la Managed Transform « Add security headers » est active. [Inférence] Source probable de `Referrer-Policy: same-origin` devant `www`. Aucune modification Cloudflare décidée.
- Erreur React #418 intermittente, observée aussi sur des pages non modifiées par #66 (JOURNAL du 01/10) ; cause non établie.
- Hub `/fr/industrie/mode-textile` : chiffres non sourcés, PR distincte recommandée.

### F4 bis. Suites de D44 et D45 (03/10)

- PRODUCT-DATA : correction des valeurs après Q20 ; catégorie A d'abord (encombrements XL G2 et Micro), puis dérivation des deux catalogues depuis le référentiel. Valeurs F5 après le 23/11, Mode après le 26/11.
- Contenus historiques à dimensions fausses (registre `docs/standards/registre-ecarts-dimensions.md`, H1 à H19) : circuit de Sébastien ; `guide-achat-studio-2026` et `orbitvu-vs-concurrents` coordonnés avec #64 et #27.
- `lib/lead-enrichment.ts` : liste de machines du prompt à générer depuis les catalogues, sur accord de Sébastien (Q20.16) ; aucun test sans GO (appels Gemini payants).
- Images d'articles sans dimensions : elles allongent la page pendant le défilement (cause racine du troisième défaut corrigé par #84) ; contenus de Sébastien.
- `e2e/anchors.spec.ts` reste différé en CI (D47, 06/10) : son test préexistant « #calculateur-roi exists on /fr/studios-photo-automatises » échoue tant que le témoin du sélecteur garde son lien vers Studios ; les 16 tests ciblés des 7 sources ROI (#93) sont exécutés en local. Activation d'`anchors` et de `roi-calculator` en CI : décision séparée.
- Mode : bascule sur le composant mutualisé après le 26/11 (parité, décision de Laurent). F5 : réexamen après le 23/11.
- `guide-achat-studio-2026` : débordement horizontal à 1 024 px, préexistant (page sous #64).

### F5. Données structurées (backlog de #55)

`Product.url` et `Offer.url` des 13 fiches de-ch en `/de-ch/studio-photo/<slug>` (307) ; `Service.url` des 8 `branchen/*` en `/de-ch/industrie/<slug>` (301) ; `author.url` `/fr/a-propos` sur les articles de-ch ; nœud `provider` `Organization` sans `@id` sur `ia-photo-produit` (bloc `AggregateRating`) ; variante d'`Organization` de `/fr` et `/en/distributeur-orbitvu-suisse` (`distributorOrganizationSchema` : téléphones à tirets, sans `email`, `ContactPoint` CH sans `German`), à traiter avec D33.

### F6. Décisions à mettre en œuvre

- D32 : `hasMerchantReturnPolicy` (aucun retour) et `shippingDetails` (livraison et installation facturées en supplément, délai indicatif d'environ 10 jours, jamais garanti ; même règle en France et en Suisse), PR applicative distincte. Écart à trancher avec #64 (12 jours), voir C.
- D33 : `foundingDate` (`components/seo/SchemaOrg.tsx:72` au 25/09, `'2004'`) à aligner après arbitrage de la date (voir C) ; relire les quatre textes qui annoncent en allemand l'ensemble du service, formation et SAV compris (relevé du 25/09 : `messages/fr.json:189`, `messages/de-ch.json:167`, `messages/en.json:93`, `app/[lang]/distributeur-orbitvu-suisse/page.tsx:36`) — traités en partie par #64.
- D36 : #67, après confirmation du Worker actif (Cloudflare READ ONLY) et contrôle de `www` (voir C) ; `smoke.mjs` lit la balise `robots`, pas l'en-tête.
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

Liste complète du 28/09 au 02/10, commits de fusion compris : `REVUE-PR-BRANCHES-2026-10-02.md`, § 3. Contrôles Chrome restants : C.

| PR | Objet | Fusion (UTC) | Reste |
|---|---|---|---|
| #84 | D44 — sommaire du blog : titre visé atteint en mobile et en desktop, liste latérale plafonnée et défilante, entrée active juste, molette du lecteur respectée | 06/10 10:26 | Contrôlée par Laurent dans Chrome sur `www` le 06/10 ; Firefox, Safari et appareils réels non regardés |
| #80 | `/api/contact` accepte `de-ch` : les demandes des pages de-ch étaient refusées en 400 (Claude de Sébastien) | 02/10 12:48 | Contrôle de bout en bout (D) ; ne pas recréer le correctif |
| #76 | D42, D43 (200 USD par mois), réconciliation avec D40 | 02/10 04:42 | Q19 ; harmonisation de #65 |
| #66, #78 | Landing Mode FR, EN, de-ch ; documentation | 01/10 16:26 et 17:30 | Chrome ; mesure (E) |
| #74, #75 | UB-04, fil d'Ariane hors du H1 ; documentation | 01/10 10:29 et 14:57 | Chrome |
| #73 | Archivage AI Act, D41, backlog BL-43 / BL-53 / RV28 | 01/10 11:19 | — |
| #72 | Inter auto-hébergée | 01/10 09:02 | Chrome |
| #68 | D36, protection Worker | 01/10 06:58 | Déploiement rapporté le 01/10 par le pilotage ; version active à confirmer (Cloudflare READ ONLY), puis `www` ; #67 (C) |
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
| Landing « Télécharger le catalogue Orbitvu All-in-One » | Non établi par le dépôt | Conception en cours ; **pas une landing publiée** | Cadrage D42, étape 1 | Aucune |
| Programme visuel AI Act | Claude de Laurent ; validation de Laurent puis de Sébastien | Illustrations intégrées aux Preview de A (7), S (6) et B/C/D (#79), toutes générées par IA et légendées comme telles ; D3 attend une capture réelle datée | Relecture visuelle de Laurent ; validation avec les textes | #59, #60, #79 |
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

**Ouvertes : Q10** (cible D24) **et Q19** (D42 au Claude de Sébastien ; D43 pour information), voir `BOITE-AUX-LETTRES.md`.

Closes : Q1 et Q3 le 17/09 ; Q2, Q4, Q6, Q12, Q13, Q14 et Q15 par Laurent le 25/09 (Q2 selon le régime tacite prévu au 24/09 ; réponses en D15, D22 et D32 à D36) ; Q5, Q7, Q8, Q9 et Q11 arbitrées le 19/09 sans dépôt, consignées en D26. Q16 à Q18 jamais déposées, absence acceptée par Laurent le 24/09 ; la numérotation reprend à Q19.

### Décisions récentes

| Décision | État | Où vit le texte |
|---|---|---|
| D39 | En vigueur | `main` (#66) |
| D40 | **Proposée**, non fusionnée ; en vigueur à la fusion de #65, selon son propre statut | #65, tête `c5e15a8` |
| D46 | En vigueur pour la préparation, complétée le 06/10 (publication par Laurent, exception D16 pour B, C, D) ; fusion sur « GO MERGE #96 » | #96 |
| D41 | Remplacée par D46 sur le principe des satellites ; maintenue pour #61 à #63 | `main` (#73) |
| D42 | En vigueur depuis la décision de Laurent du 01/10, applicable aux PR déjà ouvertes | `main` (#76, fusionnée le 02/10, `9400eaa`) |
| D43 | En vigueur depuis la décision de Laurent du 02/10 : 200 USD par mois, GO explicite avant tout appel payant | `main` (#76, fusionnée le 02/10, `9400eaa`) |
| D44 | Principe approuvé par Laurent le 03/10 ; inscription préparée, non fusionnée ; application à la fusion de #87 (règle), #84 et #85 (mise en œuvre), #86 (CI) | #87, brouillon |
| D45 | Principe approuvé par Laurent le 03/10 ; inscription préparée, non fusionnée ; application à la fusion de #87 (règle), #83 (référentiel), #86 (CI) | #87, brouillon |

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
