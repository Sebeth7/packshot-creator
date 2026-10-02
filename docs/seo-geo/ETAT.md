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
| Contrôle | 02/10/2026, 13:10 UTC, Claude de Laurent |
| `main` | `de6c4cd` — fusion de #81 (documentation seule), 02/10 à 13:47:51 UTC. Avant : `8c0dd06`, fusion de #80, 02/10 à 12:48:08 UTC ; production Vercel `success` à 12:49:13 UTC |
| Dernière mise à jour documentaire | 02/10 — Claude de Laurent : landing catalogue Orbitvu All-in-One, V5 poussée sur #82 (ruban continu des studios, vraies pages K1–K6 du catalogue ; brouillon, bloquée `PDF/EXTERNALS PENDING`, ligne en B). Avant : 02/10, V4 sur #82 (frise, vidéo recadrée) ; 02/10, V3 sur #82 ; droits de diffusion du catalogue confirmés par Laurent. Avant : 02/10, ouverture de #82. Avant : 02/10 — Claude de Laurent : rangement GitHub (#81, brouillon, documentation seule), précisé le 02/10 avant GO. Avant : 02/10, #80 (Claude de Sébastien) ; 02/10, #76 (D43 à 200 USD par mois) |
| PR ouvertes | 10 sur GitHub après la fusion de #81 et l'ouverture de #82 (landing catalogue, brouillon). Les 9 PR opérationnelles inventoriées avant #81 : #27, #59, #60, #64, #65, #67, #70, #77, #79 — toutes en conflit avec `main` au moins sur le haut du JOURNAL |
| Questions ouvertes | Q10, Q19 (`BOITE-AUX-LETTRES.md`) |

Règles transverses en vigueur, rappel :
- **D29** : aucune redirection XL v2 / XL G2, nouvelle ou annulée, avant validation du mapping produit.
- **D37, D39** : aucun lien entrant vers F5 avant le 23/11/2026, y compris depuis la landing Mode.
- **D41** : satellites AI Act B, C, D non créés ; #61 à #63 ne se rouvrent pas.
- **D42** : circuit éditorial en huit étapes ; une CI verte ou une fusion ne valent pas validation.
- **D43** : 200 USD par mois pour les services payants de recherche SEO/GEO, GO explicite de Laurent avant tout appel. Aucun registre de consommation dans `docs/seo-geo/` au 02/10 : la consommation d'octobre n'y est pas établie ; toute demande de GO l'indique, sans supposer un solde de 200 USD.

---

## B. Travaux actifs

Les 9 PR opérationnelles inventoriées avant #81 ; #81, documentaire, n'y figure pas. Détail, fichiers et conflits : `REVUE-PR-BRANCHES-2026-10-02.md`, § 2.

| PR | Objet | Propriétaire | Statut | Blocage | Prochain geste |
|---|---|---|---|---|---|
| #59 | Pilier AI Act A, FR (`/fr/blog/ai-act-images-produit`) | Claude de Laurent | Brouillon, `DO_NOT_MERGE` ; tête `2a36322`, 7 visuels sur 7 | Zalando à arbitrer ; validation de Sébastien (D42, étape 5) ; traductions après validation du FR (D38) | Relecture visuelle de Laurent sur la Preview ; transmission à Sébastien rapportée par le pilotage du 02/10, validation non établie (D) |
| #60 | Article Suisse S, FR (`/fr/blog/images-ia-ecommerce-suisse`) | Claude de Laurent | Brouillon, `DO_NOT_MERGE` ; tête `74ae921`, 6 visuels sur 6 | Idem #59 ; adaptation de-ch après validation du FR | Relecture visuelle de Laurent sur la Preview ; transmission à Sébastien rapportée par le pilotage du 02/10, validation non établie (D) |
| #77 | AI Act : deux formulations juridiques corrigées (FR, EN, de-ch), BL-43-2 et paragraphe de BL-43-3 | Claude de Laurent | Brouillon, `DO_NOT_MERGE` ; tête `a207fe3` ; micro-correction finale de Laurent appliquée | `content/blog/**` est la prose de Sébastien : sa validation est requise | Transmission à Sébastien, sur décision de Laurent |
| #79 | Previews privées AI Act B, C, D — REVIEW ONLY | Claude de Laurent | Brouillon, `DO_NOT_MERGE` ; tête `a4a62ac` ; pages en 404 hors Preview | D41 : aucune publication sans nouvelle mesure D16 et nouvelle décision | Contrôle humain de la Preview (SSO) ; validation de Sébastien |
| #64 | D33, patch factuel (showroom Beynost, Orbitvu 2023, conditions commerciales, allemand, garantie, D25, comparatif Orbitvu) | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `63e1e92`, 31 commits de retard | Fusion sur décision explicite de Laurent et de Sébastien ; points ouverts en C | Contrôle de la Preview par Laurent (desktop, tablette, mobile) |
| #65 | D40 proposée : circuit Preview Vercel → Sébastien (documentation) | Claude de Laurent | Brouillon ; tête `c5e15a8`, 53 commits de retard ; conflits `DECISIONS`, `ETAT`, `JOURNAL` | D40 non en vigueur ; 17 modifications imposées par D42 et D43 (JOURNAL du 01/10, « arbitrages finaux ») | Sort à arbitrer par Laurent (C) |
| #67 | D36 : `noindex` de l'origine `sysnext.vercel.app` | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `62ebfae`, 60 commits de retard ; conflit sur le test Worker (#68) | Porte imposée avant toute décision sur #67 : version active du Worker confirmée (présence du bloc D36), puis `www` contrôlé. Déploiement après #68 rapporté le 01/10 par les transmissions de pilotage ; non consigné au JOURNAL, non vérifié par ce rangement | Lecture Cloudflare READ ONLY, puis contrôle de `www` (C). Aucun nouveau déploiement autorisé |
| #70 | Ubersuggest : `metaTitle` de `/fr/blog/photographie-2d-de-produits` | Claude de Laurent | Brouillon, « DO NOT MERGE » ; tête `ef0bc89` | Point ouvert : un `<title>` relève-t-il du copywriting réservé à Sébastien ? | Arbitrage séparé de Laurent |
| #82 | Landing catalogue Orbitvu All-in-One `/fr/catalogue-orbitvu-all-in-one` — **V5 du 02/10** : ruban fin des studios en défilement continu (boucle sans saut, copies inertes), vraies pages du catalogue (couverture K1, doubles pages K5 et K4, matrice K6 agrandissable ; exports du PDF QA). V4 du même jour : frise des studios après le hero (9 studios tirés de `MACHINES` et `getMachineImage`, exclusions motivées au JOURNAL), vidéo du hero recadrée sur le studio et l'écran (rectangle translucide présent dans le fichier source, diagnostic au JOURNAL). V3 du même jour : H1 « Vos produits comme vous ne les avez jamais vus. », vidéo de la home dans le hero (variante locale `VideoStudio`, `HeroVideo` non modifié), sections « Imaginez les possibilités » et « Trouvez le studio adapté à vos produits », formulaire inchangé | Claude de Laurent | Brouillon, **BLOQUÉE `PDF/EXTERNALS PENDING`**, DO NOT MERGE. Page FR seule, `noindex, nofollow`, sans canonique, hreflang ni sitemap ; 404 sur la production Vercel tant que `PUBLICATION_AUTORISEE` est faux ; `/api/catalogue` fermée (503), aucun adaptateur Pipedrive, Resend ni stockage ; six exports WebP K1–K6 du PDF QA sous `public/images/catalogue-all-in-one/` ; PDF non intégré ni téléchargeable (QA, non approuvé). **Droits de diffusion du catalogue : confirmés par Laurent le 02/10 (fait métier)**. Fichiers réservés : `app/[lang]/catalogue-orbitvu-all-in-one/**`, `components/landings/catalogue-all-in-one/**`, `app/api/catalogue/**`, `lib/catalogue/**`, `e2e/catalogue-all-in-one.spec.ts`, futur `public/images/catalogue-all-in-one/` ; une ligne dans `i18n/routing.ts` et `i18n/deChCoverage.ts` | Validation du PDF QA, destination des QR « démo » (`orbitvu.fr/contact/`), hébergement du PDF, stockage et règle CRM, mention données (D) ; URL, indexation, header, revue graphique et éditoriale V5 (C) | Revue de la Preview V5 par Laurent ; points métier de Sébastien |
| #27 | Maillage article → offre (Q3, 14 liens) et contrôle `curl.exe` du lot F | Claude de Laurent | Ouverte, non brouillon, inactive depuis le 23/09 ; 164 commits de retard ; conflit sur un fichier supprimé par #71 | Historique : ne pas fusionner globalement. Revue demandée à Sébastien depuis le 23/09, non rendue | Aucun développement ; sort sur GO distinct de Laurent, preuves conservées (JOURNAL du 02/10) |

---

## C. Balle chez Laurent

### Décisions

| Sujet | Depuis | Détail |
|---|---|---|
| #82 — landing catalogue All-in-One : revue V5, URL, indexation, header, GO | 02/10 | Revue graphique et éditoriale de la Preview V5 (ruban continu des studios ; vraies pages du catalogue ; recadrage de la vidéo du hero ou séquence de remplacement à fournir ; liste des 9 studios et exclusions) ; URL définitive, indexation et canonique (`noindex` jusqu'à l'activation ; title et meta description encore ceux du copydeck V2) ; Header partagé conservé ou variante compacte (option locale dans `Header.tsx`) ; GO de fusion et de publication séparé (D42). Captures de travail locales transmises dans la session, hors dépôt |
| #65 — harmoniser ou fermer | 01/10 | #76 est fusionnée : si #65 est conservée, elle reprend `main` (`8c0dd06` au moins) et applique les 17 modifications listées au JOURNAL du 01/10 (« arbitrages finaux »), budget D43 du 02/10 compris. Fusion après validation et autorisation finale de Laurent. Aucune modification de protection Vercel, de lien public ni d'autorisation |
| #27 — sort de la PR | 02/10 | Preuves conservées : contrôle `curl.exe` du lot F et liste des 14 liens cités au JOURNAL du 02/10 ; branche `content/maillage-q3` conservée. Fermeture possible sur GO distinct |
| Lot F — clôture du contrôle `curl.exe` (Worker déployé le 23/09, version `05c5c47c`) | 23/09 | Résultat « tout conforme » consigné le 23/09 dans le JOURNAL de la branche de #27 (`e81e5c0`), jamais fusionné ; cité au JOURNAL du 02/10. À confirmer par Laurent pour clore |
| #59 et #60 — Zalando | 02/10 | `UNRESOLVED / À ARBITRER` ; formulation commune A / S de Laurent en place dans les deux PR |
| #64 — date de création | 01/10 | D33 dit 2001 ; faits métier du 30/09 cités par #64 : Sysnext 2001, lancement de PackshotCreator 2004 ; `foundingDate` 2004 ; le site affiche 2001, 2003 et 2004 selon les pages. `DECISIONS.md` non modifié |
| #64 — autres points | 30/09 | Délai : 10 jours (D32, F5) contre 12 jours (#64) ; showroom : D1 et `00-BRIEFING.md` citent Saint-Bonnet-de-Mure, #64 Beynost ; claims non sourcés restants dans `guide-achat-studio-2026` et `comment-calculer-le-roi-…` |
| #70 — `<title>` et copywriting | 30/09 | Point de gouvernance ouvert, à trancher avant toute fusion |
| D36 / #67 — confirmer le Worker actif | 01/10 | Déploiement du Worker après #68 rapporté le 01/10 par les transmissions de pilotage ; non consigné au JOURNAL, version active non vérifiée par ce rangement. Ordre : (1) lecture Cloudflare **READ ONLY** du script actif : version, présence de `x-packshot-origin-noindex` (bloc D36 de `main` depuis #68), écart éventuel avec le dépôt (R5) ; (2) contrôle de `www` ; (3) seulement ensuite, décision sur #67 : reprise de `main` (garder le test Worker de `main`) et nouveau GO. **Aucun nouveau déploiement autorisé** |
| D29 — mapping produit Alphashot XL v2 / XL G2 | 24/09 | `SUSPENDED / REVIEW_PRODUCT_MAPPING`. Préalable à tout changement de redirection XL : 13 redirections du Worker vers `alphashot-xl-g2` et 2 règles de `next.config.ts` vers `alphashot-xl-v2` laissées en l'état ; aucun rollback automatique |
| Q10 — cible de clics | 19/09 | Les quick wins et la substitution de page ne comblent pas l'écart seuls ; la cible dépend du chantier marque (M5, 14-28/10) |
| D33 — fiche Google (hors dépôt) | 25/09 | Si elle déclare l'espagnol parlé, la corriger ; sa mention « Allemand non parlé » est à revoir au regard de D33 |
| P0-J — GO après le 08/10 | 25/09 | Voir E |
| D42 — positionner chaque PR de contenu dans le circuit en huit étapes | 01/10 | PR ouvertes touchant `content/**`, `messages/**` ou un composant de landing : #27, #59, #60, #64, #70, #77, et #79 (`content/revue-interne/**`). Étape atteinte non établie (relevé du 01/10 sur `main` `6b80e6a`). #65 et #67 ne touchent aucun fichier de contenu ; #66 est acquise (arbitrage 6) |
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
| #82 — landing catalogue All-in-One : points métier avant activation | Laurent (kit, V3 et V5 du 02/10) | 02/10 | Relecture des textes V3 (hero de Laurent, légendes des visuels proposées) et de la mention données ; validation du PDF corrigé (copie QA du 02/10, CropBox remise au cadrage réel, non approuvée) et des versions de produits qu'il nomme (Alphadesk, « XL Pro ») ; destinations des QR « démo » (aujourd'hui `orbitvu.fr/contact/`) ; hébergement du PDF ; stockage durable des demandes et reprise des échecs e-mail/CRM ; règle Pipedrive (proposition : personne et organisation à chaque demande, affaire seulement si consultant demandé, étape à fixer). Droits de diffusion : confirmés par Laurent le 02/10. Détail : description de #82 |
| Dossier « IA & images produit » (AI Act) — relecture | Laurent | 02/10 | **Transmission** : rapportée par le pilotage externe du 02/10, message intitulé « Dossier IA & images produit : nos 5 articles sont prêts pour ta relecture » ; information du pilotage, non établie par GitHub (les descriptions de #59 et #60 portent encore « mail à Sébastien non envoyé »). Périmètre des 5 articles non établi par GitHub ; [Inférence] A (#59), S (#60) et B, C, D (#79). **Accusé de réception** : non établi. **Validation métier** (D42, étape 5) : non établie, aucune trace GitHub (0 revue, 0 commentaire de `Sebeth7`) |
| Autres validations (D42, étape 5) | Laurent | — | #77 : « non transmise » selon sa description du 01/10, état ultérieur non établi. #64 : après contrôle de la Preview par Laurent. Seule demande formelle sur GitHub : revue de #27, demandée le 23/09, dont le sort est d'abord à décider par Laurent |
| #80 — contrôle de bout en bout du formulaire de-ch | Claude de Sébastien (JOURNAL du 02/10) | 02/10 | Envoi réel depuis `/de-ch/kontakt` (il crée un vrai deal et deux courriels), puis suppression de la fiche test ; confirmation en allemand à décider ; test e2e qui envoie le formulaire dans les trois langues à écrire. Exécutant non désigné dans le JOURNAL |
| Academy (#71) — reliquat légal, audit Qualiopi du 16/10 | Claude de Sébastien (JOURNAL du 30/09) | 30/09 | CGU (article 1, article 4, article 5 « PackshotCreator Academy est certifié Qualiopi ») et politique de confidentialité citent encore le simulateur OPCO ou l'Academy comme entité certifiée ; formulation « formation(s) certifiée(s) Qualiopi », une vingtaine d'occurrences au moins, à arbitrer avec la consultante ; fiche Master du catalogue (« à distance » pour une formation en présentiel). À trancher : « suivi post-formation » du guide d'achat ; « Formateurs experts 10+ ans » et témoignages Marie D. et Camille R. (comparatif Orbitvu) ; « 5 000+ entreprises » (accueil) contre « plus de 500 entreprises » (guide budget). Textes légaux non modifiés par le Claude de Laurent |
| Branches sans PR portant des commits absents de `main` | Laurent | 19/09, recompté le 02/10 | Sur clone complet : `feat/sysnext-industrial` (4 commits, mini-site Sysnext Industrial) et `feat/geo-referentiels-prix` (2 commits, pages référentiels prix). Les 3 autres branches comptées le 19/09 n'en portent aucune (`REVUE-PR-BRANCHES-2026-10-02.md`, § 4). Pour information : conserver ou abandonner |
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

Distincts : A (#59), S (#60), B/C/D en maquettes privées (#79), corrections existantes (#77). Anciennes PR #43, #53, #61 à #63 fermées sans fusion, branches conservées, à ne pas rouvrir (D41). Détail : JOURNAL du 2026-10-01 ; verdict B/C/D : D41.

- BL-43-1 : gabarit des articles, `og:url`, `og:site_name`, `og:locale` et carte `twitter` par article, import `HeadingData` inutilisé (`app/[lang]/blog/[slug]/page.tsx`, #43 `4aa305e`). PR applicative distincte, rayon large (125 articles JSON), réécrite sur `main`, sans cherry-pick.
- BL-43-2 : E1/E2, `generer-images-produit-ia` (corps l. 16, FAQ l. 36) attribue à l'AI Act une règle de non-tromperie qui relève du droit de la consommation (#43 `4aa305e`). Correction proposée dans #77 ; validation de Sébastien ; renvoi vers A seulement après sa publication.
- BL-43-3 : E3 à E7, articles « migrer » FR, EN et de-ch (#43 `4aa305e`, `216f324`, `175a9d5`). Paragraphe AI Act corrigé dans #77 ; restent hors paragraphe (E3 à E6) : « sans rien changer à l'exactitude de ses caractéristiques », FAQ n° 3, lien Orbitvu à la place des lignes directrices. À revalider contre le texte final de A ; de-ch selon D38.
- BL-43-4 : mesures D16 de création de A (28/09), archivées au JOURNAL et sur #43, absentes de #59 : y renvoyer à la fusion de #59.
- BL-53-1 (optionnel, idée seulement) : arbre « faut-il signaler cette image ? » (#53 `2d4e66d`), à reconstruire depuis le texte juridique final de A si Laurent le décide, sans l'ancien HTML/CSS.
- Reliquat de la revue préalable du 28/09 (JOURNAL du 2026-10-01, entrée « reliquat de la revue du 28/09 ») ; constats à vérifier, aucune correction décidée, aucune validation juridique :
  - RV28-E8 à RV28-E13, contenus du site, formulations présentes sur `main` `2ef01b2` : BlendAI.studio « solution propriétaire » et JSON-LD `provider` (E8) ; FTC et Californie dans `studio-ia-vs-ia-generative` (E9, E10) ; « photo réelle auditable, métadonnées préservées » (E11) ; « zéro hallucination », « jamais au produit », « fidèles à 100 % » (E12) ; témoignage « ne font pas la différence » (E13) ;
  - RV28-H1 à RV28-H3, site blendai.studio, hors dépôt : « Résultats indiscernables du réel », « Conformité juridique garantie », pages légales en 404 au 28/09 ; état actuel NON VÉRIFIÉ ;
  - faits BlendAI de l'évaluation du 28/09, déclaratifs et non reconfirmés : marquage des exports en développement, mannequins virtuels non vérifiés, société exploitante en création.
- Style commun : `app/globals.css`, `.prose .table-wrap thead th { white-space: nowrap }` peut masquer une colonne sur smartphone (relevé par #59, #60, #79) ; à corriger avant publication de A et S.

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
| D41 | En vigueur | `main` (#73) |
| D42 | En vigueur depuis la décision de Laurent du 01/10, applicable aux PR déjà ouvertes | `main` (#76, fusionnée le 02/10, `9400eaa`) |
| D43 | En vigueur depuis la décision de Laurent du 02/10 : 200 USD par mois, GO explicite avant tout appel payant | `main` (#76, fusionnée le 02/10, `9400eaa`) |

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
