# Dossier de release — #129, landing « Studios Orbitvu d'occasion »

État au 12/10/2026, complété les 13/10, 14/10 et 16/10 (Claude de Laurent). PR brouillon, DO NOT MERGE.
GO_CODE = YES ; 14/10 : GO_CORRECTIFS_BRANCHE_129, GO_PRÉPARATION_TESTS,
GO_SYNC_MAIN_BRANCHE_129, GO_PUSH_PREVIEW_129, GO_NAVIGATION_129, GO_SEO_OPTION_B,
GO_CORRECTIFS_SEO_BRANCHE_129 = YES (décision D60, ex-D59 de la branche). « Arbitrages groupés pour la
clôture » (14/10, section 0 bis) : GO_CODE ciblé (e-mail « Inscription confirmée »,
fait) ; GO_TEST_REEL_ALERTES, GO_TEST_REEL_RECHERCHE, GO_ENVOI_TEST,
GO_NETTOYAGE_DEPLOIEMENTS, GO_VERCEL_PRODUCTION, GO_MERGE_PR129 et GO_PUBLICATION
= YES **sous conditions** ; **16/10 : publication en deux étapes, A (recherche) puis B (alertes), section 0 ter** ; conservation et validation éditoriale **obtenues**
(validation téléphonique de Sébastien rapportée par Laurent, le 14/10/2026 ;
libellé de l'article 9 `p5` approuvé par Laurent le 15/10/2026, D42 : OUI ;
GO_CORRECTIFS_CONFIDENTIALITÉ_129 = YES ; section 9). GO_ENVOI_REEL (bulletin) = NO.
Ce dossier ne déclenche rien : il liste ce qui est prêt, ce qui manque et l'ordre
de mise en service.

## 0. Décisions métier de Laurent du 14/10/2026

Faits métier transmis par Laurent (« GO Laurent — finalisation active avant
publication »), enregistrés tels quels :
1. **RGPD** : Laurent confirme que le dispositif de collecte et d'alertes est
   compatible avec les exigences du RGPD **selon son appréciation métier**. Ce
   n'est pas un audit juridique indépendant et ce dossier n'en tient pas lieu.
2. **Destinataire Production des recherches d'occasion** :
   `sebastien.jourdan@sysnext.com`, porté par la variable
   `OCCASION_NOTIFICATION_EMAIL` (aucune adresse codée en dur ; section 3).
3. **Publication avec un stock vide** : autorisée sur le principe. Aucune machine
   n'est nécessaire pour ouvrir la page.
4. La page peut proposer la recherche d'un équipement et l'inscription aux
   futures disponibilités **dès lors que les parcours auront été éprouvés et
   autorisés** (section 7).
5. **SEO, option B** (décision définitive, même jour) : page publiée en
   `index, follow` dès sa mise en ligne, même à stock vide (section 2).

Ces décisions, avec le rectificatif de navigation du même jour, sont inscrites
en **D60** (`docs/seo-geo/DECISIONS.md` ; proposée D59 sur la branche, renumérotée le 14/10 : la D59 de `main` concerne la série A/B).

## 0 bis. Arbitrages groupés pour la clôture (Laurent, 14/10/2026)

| # | Objet | Décision | État au 14/10 |
|---|---|---|---|
| 1 | Conservation (actifs, désinscrits, point de départ, purge) et validation éditoriale | EN ATTENTE au matin ; **obtenues** l'après-midi : validation téléphonique de Sébastien rapportée par Laurent, le 14/10/2026 (D60, complément) ; libellé de `p5` approuvé par Laurent le 15/10/2026 (D42 : OUI) | **Levé** : article 9 complété et approuvé, purge documentée (section 9) |
| 2 | Désinscription autonome | **E-MAIL** : un unique e-mail « Inscription confirmée », lien personnel de désinscription, après confirmation effective du double opt-in | **Implémenté** sur la branche (section 10), textes à valider (D42), aucun envoi réel avant GO_ENVOI_TEST |
| 3 | Adresses et plafond | 11 e-mails au plus ; T1, T2, T3 (alertes), B (recherche si nécessaire), désignées par Laurent dans Chrome, jamais dans le dépôt ni les rapports ; début seulement après vérification Resend (statut des adresses, quotas, cumul mensuel) | Phase 0 Chrome à exécuter |
| 4 | GO_TEST_REEL_RECHERCHE | YES conditionnel : reliquat B seulement si la phase 0 confirme qu'il n'est pas établi ; 2 e-mails au plus, dans le plafond | Attend la phase 0 |
| 5 | GO_TEST_REEL_ALERTES | YES conditionnel : fenêtre Preview datée de 2 h au plus ; double opt-in, propriétés, isolation, désinscription, non-réinscription ; verrous refermés, 503 vérifié | Attend la phase 0 |
| 6 | GO_ENVOI_TEST | YES conditionnel : adresses désignées seulement, plafond 11, marge de quota vérifiée ; aucun client réel, aucune campagne, aucun bulletin | Attend la phase 0 |
| 7 | GO_NETTOYAGE_DEPLOIEMENTS | YES conditionnel : seuls les déploiements identifiés de `75d5914` et du futur commit d'ouverture, après vérification des identifiants, des verrous refermés et du 503 | Attend la phase 0 et la fermeture |
| 8 | GO_VERCEL_PRODUCTION | YES conditionnel : les cinq variables de la section 3 seulement, secret Production distinct en Sensitive, aucune valeur affichée | Phase 3 Chrome, exécutable à tout moment |
| 9 | GO_MERGE_PR129 | YES strictement conditionnel (section 8, étape 1) ; prérequis manquant → HOLD | Attend les essais réels et les variables Production |
| 10 | GO_PUBLICATION | YES distinct, strictement conditionnel, après fusion vérifiée ; PR dédiée sur une branche dédiée autorisée pour cette seule publication ; `BULLETIN_ENVOI_AUTORISE = false` ; anomalie bloquante → suspension, retour arrière autorisé | Attend la fusion vérifiée |

**Budget d'e-mails de la fenêtre (plafond 11)** : alertes T1, T2, T3 = 3 demandes de
confirmation + 3 « Inscription confirmée » = 6 ; recherche B, si nécessaire = 2 ;
total 8, marge de 3 pour un renvoi. Les clics « déjà inscrite », « Adresse
désinscrite » et les désinscriptions n'envoient rien (testé).

Ne valent pas validation : les claims commerciaux, les droits photographiques et
les textes encore non validés (section 8). Aucune machine, aucun prix, aucune
disponibilité, aucune garantie ni condition commerciale n'est inventé.

**État affiché avec un stock vide** (vérifié dans le code le 14/10) : la page
réelle lit le seul registre `data/occasion/machines.ts` (vide) ; le bloc
« machines » et le bouton « Voir les machines » ne s'affichent qu'avec du stock
(`OccasionOrbitvu.tsx`, `stock && …`) ; la recherche porte l'étiquette « Aucune
machine affichée en ce moment » (EN, DE-CH traduits). Les exemples fictifs ne
vivent que dans la vue `…/exemples-fictifs`, en 404 en production quel que soit
le verrou de publication (`exemplesFictifsServis()`, testé dans
`occasion.test.ts`).

## 0 ter. Publication en deux étapes (décision de Laurent, 16/10/2026)

Cette décision remplace, pour la **première publication**, l'obligation de tester
simultanément la recherche et les alertes. Elle n'efface aucun GO du 14/10 : ils
restent consignés et valent pour l'étape B.

| Étape | Contenu | État au 16/10 |
|---|---|---|
| A (prioritaire) | Landing FR, EN, de-ch à stock vide ; recherche opérationnelle, sans CRM ; notification à `sebastien.jourdan@sysnext.com` (`OCCASION_NOTIFICATION_EMAIL`) ; liste d'alertes fermée et masquée en vue publique | en cours |
| B (ultérieure) | Liste d'alertes et double opt-in (tests T1, T2, T3, cinq variables, variante B du patch de publication) ; bulletin toujours fermé | non lancée ; aucun test T1 à T3 maintenant |

GO accordés pour l'étape A : GO_CODE_129_OPTION_A (adaptations nécessaires seulement) ;
commit et push sur la branche #129 ; GO_TEST_REEL_RECHERCHE_B (deux e-mails, plafond
strict de deux acceptations Resend, adresse prospect de test désignée par Laurent,
notification à Sébastien) ; ouverture et fermeture de la collecte recherche seule ;
GO_VERCEL_PRODUCTION_A (la seule variable `OCCASION_NOTIFICATION_EMAIL`, en
Production uniquement) ; GO_RESYNC_129 après le test B ; GO_MERGE_129_A conditionnel
(test B PASS, fermeture prouvée, configuration Production, QA ciblée, CI verte) ;
GO_PUBLICATION_129_A conditionnel et distinct (PR dédiée, après fusion vérifiée,
option B d'indexation, D60). Aucun GO pour activer les alertes, le bulletin ou une
campagne.

Phase 0 Chrome du 16/10 (rapportée par Laurent, non revérifiée par Claude Code) :
PASS sur la configuration (clé Resend en Full access, segment et topic, quota, alias
de test) ; cinq variables `OCCASION_*` en Preview, aucune en Production ; recherche B
non prouvée (les deux e-mails historiques correspondent à A).

Dépendances de l'étape A, vérifiées dans le code le 16/10 : la recherche exige
`COLLECTE_REELLE_AUTORISEE` (et, en production, `PUBLICATION_AUTORISEE`),
`RESEND_API_KEY`, `RESEND_FROM_EMAIL` et `OCCASION_NOTIFICATION_EMAIL`
(`lib/occasion/services.ts`). Les quatre autres variables `OCCASION_*` (segment,
topic, secret, URL de base) ne servent qu'aux alertes (`lib/occasion/alertes/services.ts`),
fermées par `ALERTES_REELLES_AUTORISEES` : elles ne sont pas des prérequis de l'étape A.
La variable `OCCASION_NOTIFICATION_EMAIL` doit exister en Production **avant** la
fusion : une variable ne s'applique qu'aux déploiements construits ensuite, et sans
elle la recherche répond 503.

Affichage : en vue publique, la section « liste d'alerte » et le lien qui y mène
n'apparaissent que si la liste est ouverte (`lib/occasion/alertes/affichage.ts`) ;
l'aperçu interne la montre toujours. Le mécanisme des alertes, ses textes, son
consentement et ses verrous ne changent pas : ouvrir les alertes (étape B) fait
réapparaître la section. Décision éditoriale de Laurent (16/10) : les promesses
d'alertes non disponibles sont retirées des descriptions SEO (FR, EN, de-ch) et de
l'encadré des deux articles de blog, rien d'autre (titres, Hn, URL, canonique,
hreflang, liens de l'encadré inchangés) ; à rétablir avec l'étape B.

Rectification (R7) : l'étape 5 de la section 8 indiquait « un seul fichier ». C'est
inexact (vérifié le 16/10 sur copie) : ouvrir `PUBLICATION_AUTORISEE` et
`COLLECTE_REELLE_AUTORISEE` fait échouer sept tests dans quatre fichiers qui figent
l'état fermé, et `occasion.test.ts` exige la collecte ouverte dès la publication. La PR
de publication porte donc `lib/occasion/activation.ts` et trois fichiers de tests
(étape A), ou quatre (étape B, alertes comprises).

Précision de confidentialité (16/10) : le premier paragraphe de l'article 9 sur les alertes
(`privacy.article9.p2`, FR, EN, et de-ch en copie française) commence par une phrase
validée par Laurent : FR « Les inscriptions aux alertes de disponibilité ne sont pas encore
ouvertes. », EN « Sign-ups for availability alerts are not yet open. ». Rien d'autre n'est
modifié dans l'article 9. **À supprimer à l'activation de l'étape B** (liste de contrôle de
l'étape B : retirer cette phrase de `p2` dans `messages/{fr,en,de-ch}.json` et adapter le
test d'`occasion-langues.test.ts` qui la fige).

## 1. Contrôle par surface

| Surface | État dans la branche | Preuve | Reste à faire |
|---|---|---|---|
| Landing FR, EN, DE-CH | `/{fr,en,de-ch}/studios-photo-automatises/opportunites`, même chemin, textes par langue (`components/landings/occasion/contenu-*.ts`) | `occasion-langues.test.ts` ; QA trilingue locale | Relecture de la copy par Sébastien ; relecture native EN et DE-CH recommandée |
| Menus et pied de page | Décision définitive de Laurent du 16/10 (remplace celles du 10/10 et du 14/10) : **aucun lien dans le menu haut** (ni menu Solutions, ni sous-menu, desktop et mobile) ; pied de page seulement, **colonne Solutions après « Questions clés »**, une seule occurrence, absent de la colonne des studios ; « Matériel d'occasion », « Pre-owned equipment », « Occasionsgeräte » ; vers la page de la même langue ; absent en production tant que la page n'est pas publiée ; aucun autre bouton ni élément promotionnel | `occasion-langues.test.ts` (emplacements, mis à jour le 16/10) | Rien |
| Trois modèles présentés (sans stock) | Décision de Laurent du 16/10 (D60 point 14) : à stock vide, section « Trois modèles Orbitvu, présentés avec leur contexte d'usage » entre le hero et la recherche : Alphadesk (showroom), Alphashot Micro v2 (démonstrations clients), Alphastudio XXL v2 (retour de salon) ; **aucun prix, remise, promotion, déstockage ni reconditionnement** ; aucune valeur fictive des exemples (état, inspection, licence, garantie, OCC-0x) ; **badges = cadres d'usage** (showroom, démonstration, salon), ligne « Contexte » et non « Origine » (D42, 16/10) ; visuels du modèle, pas d'une unité ; aucune disponibilité affirmée ; aucun `Offer` ; bouton « Demander des informations » vers le formulaire existant ; section absente dès qu'une machine réelle s'affiche | `modeles.test.ts` (32 tests) | Rien |
| Métadonnées | Option B (14/10) : titre et description par langue, exacts à stock vide (disponibilité au conditionnel) ; Open Graph par locale ; canonique par langue sur www ; hreflang `fr`, `fr-CH`, `en`, `de-CH`, `x-default` ; `index, follow` sur la production publiée seulement, `noindex, nofollow` en Preview et en local (`lib/occasion/seo.ts`) | `occasion-langues.test.ts` ; builds du 14/10 (Preview : balises relues ; production verrous fermés : 404) | Validation des titres et descriptions modifiés (D42) |
| Routes | 3 pages + 3 vues `…/exemples-fictifs` (jamais en production) ; `/api/occasion` et `/api/occasion/alertes{,/confirmation,/desinscription}` en 503 sans lecture de la demande | Build `VERCEL_ENV=production` : 6 × 404, 4 × 503 | Rien |
| Recherche (notification commerciale) | Notification interne `[Occasion]` vers `OCCASION_NOTIFICATION_EMAIL`, puis accusé dans la langue de la page ; aucun CRM | `recherche-*.test.ts` ; test réel Preview du 11/10 (A soumis ; B et quatre e-mails non établis) | Reliquat du test réel (section 7) ; variable en Production (`sebastien.jourdan@sysnext.com`, décision du 14/10) |
| Liste d'alerte | Double opt-in, segment et topic dédiés, jamais de réinscription d'un désinscrit ; promesse « nouvelles offres », consentement `occasion-alertes-v3-2026-10-12` (trois langues) ; e-mail de confirmation DE-CH corrigé le 14/10 (le lien de désinscription est promis pour les futurs e-mails d'offres) | `alertes-*.test.ts`, `occasion-langues.test.ts` | Ressources Resend et variables Preview faites (13/10) ; test réel sur GO (section 7) |
| Bulletin d'arrivage | « Nouvelles occasions Orbitvu disponibles », une ou plusieurs machines, FR/EN/DE-CH, par famille ; brouillon, empreinte, validation nominative ; envoi verrouillé ; bulletin de test restreint aux inscrits désignés ; aucune route, aucun cron, aucun n8n | `bulletin.test.ts` ; `scripts/occasion-bulletin.mts apercu` (registre vide : aucun bulletin) | Lecture réelle des inscrits et envoi à vérifier au test réel ; GO_ENVOI_REEL |
| Politique de confidentialité | Article 9 (FR, EN ; DE-CH servi en FR), finalité « nouvelles disponibilités », preuve du consentement, désinscription, Resend | `occasion-langues.test.ts` | **Devient publique dès la fusion.** Durée de conservation des inscrits non écrite : décision et texte préparé en section 9 |
| Fichiers de langue | `messages/{fr,en,de-ch}.json` : bloc `privacy` seulement | Intégrité JSON (CI) | Rien |
| Registre de stock | Vide ; guide `data/occasion/AJOUT-MACHINE.md` ; `FRAICHEUR_MAX_JOURS = 30` **provisoire** | `occasion.test.ts` (garde-fous de saisie) | Publication à stock vide autorisée (14/10). Avant toute première machine : photos de l'unité, garantie écrite, accord Orbitvu |
| SEO | Option B (D60). Avant publication, aucun effet en production : 404, aucun lien, aucune entrée de sitemap. À la publication : `index, follow`, trois entrées de sitemap (`cheminsSitemapOccasion`), encadré de maillage sous deux articles de blog (FR `acheter-studio-photo-packshot-occasion`, EN `second-hand-packshot-photo-studio`) ; jamais `Product`/`Offer` sans machine réelle ; exemples fictifs en 404 et hors sitemap | `occasion-langues.test.ts` ; build `VERCEL_ENV=production` du 14/10 (6 × 404, sitemap et articles sans lien) | Rien avant publication |
| Verrous (`lib/occasion/activation.ts`) | `PUBLICATION_AUTORISEE`, `COLLECTE_REELLE_AUTORISEE`, `ALERTES_REELLES_AUTORISEES`, `BULLETIN_ENVOI_AUTORISE` = `false` ; fenêtres de test `null` | `occasion.test.ts`, `bulletin.test.ts` | Ouverture par commit, sur GO |

## 2. Indexation : option B, décision définitive de Laurent du 14/10 (D60)

**Décidé et implémenté le 14/10** : page publiée en `index, follow` dès sa mise
en ligne, y compris sans machine disponible. Remplace la recommandation A.

Implémentation (`lib/occasion/seo.ts`, sans nouveau verrou) :
- `pageOccasionIndexable()` : `index, follow` seulement si `VERCEL_ENV` vaut
  `production` **et** `PUBLICATION_AUTORISEE` est vrai ; `noindex, nofollow` en
  Preview, en local et en production avant publication (où la page est en 404).
  Les Previews restent par ailleurs protégées (Vercel Authentication).
- `canoniqueOccasion(langue)` : `https://www.packshot-creator.com/<langue>/studios-photo-automatises/opportunites`.
- `hreflangOccasion()` : `buildLanguages` (`fr`, `fr-CH`, `en`, `de-CH`, `x-default` vers `/fr`), identique pour les trois versions.
- `cheminsSitemapOccasion()` : les trois chemins seulement si `PUBLICATION_AUTORISEE` ; `app/sitemap.ts` les ajoute (priorité 0,7, hebdomadaire).
- Exemples fictifs : inchangés (`noindex`, sans canonique, 404 en production, hors sitemap).
- Aucun balisage `Product` ni `Offer`.
- `public/robots.txt` relu : aucun blocage des moteurs ni des robots de citation
  sur ces chemins (seuls les robots d'entraînement sont bloqués partout, D1).
- Titres et descriptions des trois langues alignés sur un stock vide et sur les
  intentions (studio photo packshot / Orbitvu d'occasion, recherche sur demande,
  alertes) : « … quand ils sont disponibles » au lieu de « découvrez nos
  équipements ». À valider (D42).
- **Maillage blog** : encadré sous l'article FR `acheter-studio-photo-packshot-occasion`
  et l'article EN `second-hand-packshot-photo-studio`
  (`components/landings/occasion/EncadreOccasionBlog.tsx`, textes dans
  `lib/occasion/navigation.ts`), rendu aux mêmes conditions que le lien du pied de page : visible
  en Preview, absent de la production jusqu'à la publication, puis visible sans
  autre commit. Le texte des articles et leurs mises en garde sur le matériel
  ancien ne sont pas modifiés ; aucune garantie, remise en état ni disponibilité
  annoncée.
- État publié (`index, follow`, trois URL au sitemap) vérifié par tests unitaires
  seulement : aucun build avec `PUBLICATION_AUTORISEE = true` n'a été fait.

Pour mémoire, l'option écartée et la description d'origine de B :

**A — publication en `noindex`.** Écartée le 14/10.

**B — publication indexable.** Trois changements, dans un commit dédié :
1. `app/[lang]/studios-photo-automatises/opportunites/page.tsx`, `generateMetadata` :
   `robots` indexable ; `alternates.canonical` =
   `https://www.packshot-creator.com/${lang}/studios-photo-automatises/opportunites` ;
   `alternates.languages` = `buildLanguages('/fr/studios-photo-automatises/opportunites', { en: '/en/…', deCh: '/de-ch/…' })`
   (`lib/hreflang.ts` : `fr`, `fr-CH`, `en`, `de-CH`, `x-default` vers `/fr`).
2. `app/sitemap.ts` : trois entrées (`/fr`, `/en`, `/de-ch`).
3. Tests `occasion-langues.test.ts` (« gardent noindex », « n'entre pas dans le
   sitemap ») réécrits pour l'état indexable. La vue `…/exemples-fictifs` reste
   `noindex` et hors sitemap.
Dans les deux cas : aucun balisage `Product` ni `Offer`.

## 3. Variables Vercel (projet `sysnext`, jamais la CLI)

| Variable | Rôle | Preview (branche) | Production | Statut |
|---|---|---|---|---|
| `RESEND_API_KEY` | Envois Resend | Présente, « All Environments » | Présente | **Non vérifiée** par cette session (relevé de l'agent Chrome du 11/10) |
| `RESEND_FROM_EMAIL` | Expéditeur | Présente | Présente | **Non vérifiée** (même relevé) |
| `OCCASION_NOTIFICATION_EMAIL` | Destinataire de la notification de recherche | Créée par Laurent le 11/10, limitée à la branche | Absente | Établie en Preview (valeur non vue). Production : `sebastien.jourdan@sysnext.com` (décision de Laurent du 14/10), à créer sur GO d'écriture Production |
| `OCCASION_ALERTES_SEGMENT_ID` | Segment Occasion | Créée, limitée à la branche (contrôle Chrome du 13/10, identifiant concordant avec Resend) | Absente | Production : même identifiant, sur GO d'écriture Production |
| `OCCASION_ALERTES_TOPIC_ID` | Topic Occasion (« opt_out » par défaut) | Créée, limitée à la branche (même contrôle) | Absente | Production : même identifiant, sur GO d'écriture Production |
| `OCCASION_ALERTES_SECRET` | Clé des jetons, 32 caractères aléatoires au moins | Créée, limitée à la branche, masquée (Sensitive déduit de l'interface) | Absente | Production : **secret distinct** de celui de Preview, sur GO d'écriture Production |
| `OCCASION_ALERTES_URL_BASE` | Origine des liens des e-mails | Créée, limitée à la branche : alias de branche protégé (même contrôle) | Absente ; à fixer à `https://www.packshot-creator.com` | [Inférence] Le Worker du dépôt relaie vers `NEXTJS_ORIGIN` (`cloudflare-worker/src/index.js`, fin du gestionnaire) : sans cette variable, les liens pointeraient vers l'origine Vercel. Le Worker déployé peut différer du dépôt (R5) |

Relevé des variables Preview : contrôle de Claude dans Chrome du 13/10, rapporté par
Laurent ; aucune de ces quatre variables `OCCASION_ALERTES_*` n'existe en Production.
Cette session n'a pas d'accès à Vercel : valeurs jamais vues.

Script du bulletin (poste de la personne qui envoie, jamais dans le dépôt) :
`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `OCCASION_ALERTES_SEGMENT_ID`,
`OCCASION_ALERTES_TOPIC_ID`, `OCCASION_ALERTES_SECRET` **de Production** (sinon les
liens de désinscription sont refusés), `OCCASION_ALERTES_URL_BASE`.

## 4. Dédoublonnage des annonces : ce qui est couvert, ce qui ne l'est pas

- Couvert, sans nouvelle ressource : une machine annoncée porte `annonce` dans le
  registre (commit juste après l'envoi) et n'est plus jamais annonçable ; l'envoi
  refuse une machine déjà annoncée ; chaque tranche porte une clé d'idempotence
  Resend (relance sans doublon pendant la validité de la clé, fixée par Resend).
- Non couvert : un second envoi lancé **après** l'expiration de la clé et **avant**
  le commit `annonce`. Prérequis pour le fermer sans dépendre de la procédure :
  un journal durable des envois (propriété de contact Resend supplémentaire, ou
  autre stockage). **Non décidé, non créé** : la procédure (commit immédiat) suffit
  pour un envoi manuel validé.
- Le segment est commun à la Preview et à la Production : les contacts du test
  réel des alertes doivent finir désinscrits, sinon ils recevraient les vrais
  bulletins. Le bulletin de test étant reporté (registre vide), ils sont
  désinscrits à la main dans Resend à la fin du test (section 7, étape 8).

## 5. Q25 au 13/10 : accès Resend de Laurent, inventaire à faire en lecture seule

**État au 14/10 : inventaire et configuration faits.** Par une personne, contrôlés
par Claude dans Chrome le 13/10 et rapportés par Laurent : segment
`PackshotCreator — Occasions Orbitvu` ; topic `Disponibilités Orbitvu d'occasion`,
Opt-out / Private ; sept propriétés `occasion_alertes_*` ; identifiants concordants
avec les variables Vercel ; aucun contact inscrit au dernier contrôle. Une
propriété supplémentaire malformée existe, sans effet identifié : **conservée**.
Compte affiché : `sebphot` ; rattachement à Sysnext à confirmer (section 7,
préalables). Ne pas refaire ces vérifications. Le texte ci-dessous est l'état
du 13/10, conservé pour mémoire.

Accès accordé à Laurent par Sébastien (13/10). Cette session Claude Code n'a ni
clé Resend ni navigateur : rien n'est **vérifié** côté Resend ou Vercel tant que
l'inventaire ci-dessous n'est pas rapporté.

**Documentation primaire Resend relue le 13/10** (sources : docs « Topics »,
« Create topic », « Create contact property », « Batch sending », tarifs) :
- topic : `default_subscription` obligatoire, `opt_in` ou `opt_out`, **non
  modifiable après création** ; `opt_out` : « Subscribers will not receive the
  email unless they have explicitly subscribed to that Topic » (seuls les
  inscrits explicites reçoivent, ce que fait la confirmation) ; `visibility`
  `private` par défaut (visible sur la page de désinscription des seuls inscrits) ;
- propriété de contact : clé de 50 caractères au plus (lettres, chiffres,
  souligné), type `string` ou `number`, valeur de repli facultative ;
- offre gratuite : 1 000 contacts, **3 segments** ; Pro : segments illimités. Pas de
  limite publiée pour les topics et les propriétés. Envois transactionnels et
  marketing comptés séparément ;
- envoi groupé (`batch`) : 100 messages au plus par appel ; la documentation
  oriente les campagnes marketing vers **Broadcasts**. Le bulletin d'arrivage
  utilise `batch` (lien de désinscription personnel, filtrage par famille dans le
  code) : non interdit par la documentation lue, **à arbitrer avant le premier
  envoi réel** (aucun impact sur le test des alertes).

**Consigne unique pour Claude dans Chrome (lecture seule, aucune création, aucune
modification, aucune valeur de clé ni de secret affichée)** :
1. Resend, compte Sysnext : nom de l'équipe, rôle de Laurent ; offre (Billing) ;
   nombre de contacts et de segments existants.
2. Domaines : domaine de `RESEND_FROM_EMAIL`, statut (vérifié ou non), région.
3. Clés API : nom, permission (accès complet ou envoi seulement), restriction de
   domaine, dernière utilisation. **Les routes d'alerte lisent et écrivent des
   contacts : une clé « envoi seulement » ne suffit pas** [Non vérifié : à lire
   sur la page de la clé].
4. Contacts : présence du segment `PackshotCreator — Occasions Orbitvu`, du topic
   `Disponibilités Orbitvu d'occasion` (et son abonnement par défaut), des sept
   propriétés `occasion_alertes_*` (et leur type) ; doublons de nom.
5. Vercel, projet `sysnext`, variables : pour chacune des sept variables de la
   section 3, présence, environnements (Production, Preview, branche), type
   « Sensitive » ; ne jamais afficher une valeur.
6. Vercel, déploiements de la branche : le déploiement de `75d5914` existe-t-il
   encore ?
Rapport attendu : un tableau, une ligne par élément, « présent / absent /
illisible », sans aucune valeur secrète.

## 6. Lot de configuration à valider (un seul GO, après l'inventaire)

**État au 14/10** : R1, R2, R3 et V1 faits (13/10). R4 : permission de la clé
non rapportée ; [Inférence] une clé « envoi seulement » ferait échouer la
confirmation (étape 3 du test : erreur technique, la lecture du contact étant
refusée avant toute écriture). V2 : en attente du GO d'écriture
Production (section 8).

Ne créer que ce que l'inventaire déclare absent.

| # | Où | Action | Coût, quota | Réversible |
|---|---|---|---|---|
| R1 | Resend | Segment `PackshotCreator — Occasions Orbitvu` | Aucun coût publié ; compte dans la limite de 3 segments de l'offre gratuite | Oui (suppression) |
| R2 | Resend | Topic `Disponibilités Orbitvu d'occasion`, `opt_out`, `private`, description « Nouvelles offres de studios Orbitvu d'occasion (PackshotCreator) » | Aucun coût publié | Le topic oui ; **l'abonnement par défaut non** |
| R3 | Resend | Sept propriétés de type `string`, sans valeur de repli | Aucun coût publié | Oui |
| R4 | Resend | Seulement si la clé en place est « envoi seulement » : clé dédiée à accès complet, restreinte si possible | Aucun | Oui (révocation) |
| V1 | Vercel Preview, branche de #129 | `OCCASION_ALERTES_SEGMENT_ID`, `OCCASION_ALERTES_TOPIC_ID` ; `OCCASION_ALERTES_SECRET` (secret A) | Aucun ; un redéploiement de la branche | Oui |
| V2 | Vercel Production | Mêmes identifiants ; `OCCASION_ALERTES_SECRET` (secret B, distinct de A) ; `OCCASION_ALERTES_URL_BASE` = `https://www.packshot-creator.com` ; `OCCASION_NOTIFICATION_EMAIL` | Aucun ; sans effet tant que les verrous du code sont fermés | Oui |

Secrets A et B : 48 octets aléatoires chacun, générés par la personne qui les
saisit (par exemple `openssl rand -base64 48` dans son terminal), collés
directement dans Vercel en type « Sensitive », jamais dans une conversation, un
fichier ou un commit. Contacts : chaque inscrit confirmé est un contact Resend et
compte dans le quota de contacts de l'offre.

## 7. Tests réels : alertes, et reliquat de la recherche (préparés le 14/10)

Aucun envoi sans GO ciblé : GO_TEST_REEL_ALERTES ; GO_TEST_REEL_RECHERCHE (nouvelle
fenêtre) seulement si le test B reste indispensable. Preview de la branche
seulement ; fenêtre datée par commit, deux heures au plus ; si les deux GO sont
donnés, une seule fenêtre (`COLLECTE_REELLE_AUTORISEE` et `ALERTES_REELLES_AUTORISEES`
ouverts ensemble, même heure de fin), donc un seul déploiement à supprimer. La
publication, le bulletin et la Production restent fermés (en production, la
publication est exigée par le code).

**Préalables, en lecture seule (Claude dans Chrome), avant toute ouverture**
- Compte Resend `sebphot` : rattachement à Sysnext (équipe, domaine d'envoi
  vérifié) ; à faire confirmer par Sébastien si l'interface ne suffit pas.
- Quota transactionnel : offre, envois du jour et du mois, plafonds (offre
  gratuite publiée : 100 par jour, 3 000 par mois, quota commun à tout le site).
  **Pas d'ouverture sans marge suffisante.**
- Adresses de test : autorisées nommément par Laurent ; absentes des contacts
  Resend existants (une adresse déjà présente ne sert pas). Désignées T1, T2,
  T3 (alertes) et B (recherche) dans tout rapport ; aucune adresse dans le dépôt.
- Déploiements du commit `75d5914` : identifiant, URL, statut ;
  `GET /api/occasion` attendu `{"disponible":false}` ; **aucune suppression** sans
  GO_NETTOYAGE_DEPLOIEMENTS portant sur ces identifiants.
- Accès au Preview protégé : navigateur connecté à un compte Vercel ayant accès
  au projet ; ouvrir l'alias avant de coller un lien reçu par e-mail (le cookie
  d'accès est propre à chaque URL). La protection n'est jamais désactivée.

**Volume** (plafond du 14/10 : 11 e-mails, section 0 bis) : alertes, 3 demandes de
confirmation et 3 e-mails « Inscription confirmée », 3 contacts créés ; recherche
B, 2 e-mails (notification et accusé) ; total 8. Coût : [Inférence] nul dans le
quota inclus.

**Alertes**
1. Inscription FR, puis EN ou DE-CH, chacune avec une famille, et une « toutes les familles » (T1, T2, T3).
2. E-mail de confirmation reçu (boîte de réception, langue de la page, lien vers la page de la langue).
3. Clic sur « Confirmer mon inscription » : état « Inscription confirmée » ; puis
   e-mail « Inscription confirmée » reçu (boîte de réception, langue de la page),
   un seul, avec le lien personnel de désinscription vers la page de la langue.
4. Resend : contact créé, segment Occasion, topic Occasion en `opt_in`, sept propriétés remplies.
5. `occasion_alertes_source` donne la langue, `occasion_alertes_famille` la famille ; `occasion_alertes_version` = v3 de la langue.
6. Aucun autre topic ni segment modifié ; aucun abonnement newsletter (compteurs des autres segments et topics relevés avant et après).
7. Nouveau clic sur le même lien de confirmation : « déjà inscrite », rien d'écrit.
8. **Désinscription par le lien de l'e-mail « Inscription confirmée »** (décision
   du 14/10, section 10) : pour T1, T2 et T3, ouvrir le lien dans le navigateur
   connecté, cliquer « Me désinscrire » (ou équivalent de la langue) : état
   « désinscription faite ». Resend : topic Occasion en `opt_out`, contact retiré
   du segment Occasion, ne restent que `etat` = `desinscrit` et `desinscrit_le`
   (les cinq autres propriétés effacées, section 9), statut global inchangé.
   Puis nouveau clic sur le lien de confirmation initial : « Adresse désinscrite »,
   rien n'est réécrit ni envoyé (non-réinscription,
   `lib/occasion/alertes/resend.ts`, `confirmer`). Cette étape démontre la route
   publique `POST /api/occasion/alertes/desinscription` en bout en bout.
   Repli si l'e-mail n'est pas reçu : désinscription manuelle dans Resend (topic
   `opt_out`, retrait du segment, jamais de désinscription globale), et la route
   reste alors NON VÉRIFIÉE EN BOUT EN BOUT.
9. Bulletin de test : reporté (registre vide, GO_ENVOI_REEL = NO).
10. Fermeture par commit (verrous et fenêtres remis), `GET /api/occasion/alertes`
    → `{"disponible":false}` et `POST` → 503 sur l'alias ; déploiement du commit
    d'ouverture supprimé puis 404 (sur GO_NETTOYAGE_DEPLOIEMENTS) ; contacts de
    test désinscrits (étape 8).

**Reliquat de la recherche** (seulement sur GO_TEST_REEL_RECHERCHE) : test B, tous
les champs facultatifs, entreprise `TEST PR129 B - a ignorer`, adresse B ;
Resend : 2 envois `delivered` ; boîte de la notification (Preview) et boîte B :
messages en boîte de réception. Si le relevé Resend du 11/10 montre que B et les
quatre e-mails sont déjà établis, aucune nouvelle fenêtre.

Rapport : PASS / FAIL par étape, preuves sans aucune donnée personnelle
(T1 à T3, B, identifiants de déploiement, statuts, heures UTC).

## 8. Séquence de mise en ligne et retour arrière

Fusion et activation publique sont **deux opérations distinctes**. Le verrou
`BULLETIN_ENVOI_AUTORISE` reste fermé dans toutes les étapes.

1. **Préalables** : tests réels de la section 7 en PASS, ou reliquat explicitement
   reporté par Laurent ; décision de conservation écrite à l'article 9
   (section 9, fait le 14/10) ; textes validés (D42, étape 5 : validation
   téléphonique de Sébastien rapportée par Laurent, le 14/10/2026 ; libellé de
   `p5` approuvé par Laurent le 15/10/2026) ;
   SEO option B en place dans le code (D60, section 2).
2. **Configuration Production** (sur GO d'écriture Vercel Production, dashboard,
   jamais la CLI) : `OCCASION_NOTIFICATION_EMAIL` = `sebastien.jourdan@sysnext.com` ;
   `OCCASION_ALERTES_SEGMENT_ID` et `OCCASION_ALERTES_TOPIC_ID` = identifiants
   existants ; `OCCASION_ALERTES_SECRET` = nouveau secret, distinct de celui de
   Preview, généré par la personne qui le saisit et collé directement en Sensitive ;
   `OCCASION_ALERTES_URL_BASE` = `https://www.packshot-creator.com`. Vérification
   sans afficher de valeur. À faire **avant** la fusion : une variable ne
   s'applique qu'aux déploiements construits ensuite. Sans effet tant que les
   verrous du code sont fermés.
3. **Synchronisation** avec le `main` courant, CI verte sur la tête définitive.
4. **GO_MERGE_PR129** : fusion, verrous fermés. Contrôle de
   `https://sysnext.vercel.app` (Chrome ou script) : pages occasion en 404 dans les
   trois langues, aucun lien vers la landing (libellé du pied de page « Matériel d'occasion » compris), `/api/occasion` et
   `/api/occasion/alertes` → `{"disponible":false}` ; article 9 visible sur
   `/fr/confidentialite` et `/en/confidentialite`. Puis `www` dans Chrome (R4).
5. **GO_PUBLICATION** : PR dédiée : `lib/occasion/activation.ts` et les fichiers de
   tests qui figent l'état fermé (trois à l'étape A, quatre à l'étape B ; section 0 ter) :
   `PUBLICATION_AUTORISEE` et `COLLECTE_REELLE_AUTORISEE`, puis
   `ALERTES_REELLES_AUTORISEES` pour les seuls parcours éprouvés. Fusion = production
   en environ 3 minutes. Le même commit ouvre, sans autre changement : la page, les
   lien du pied de page, l'encadré des deux articles de blog,
   `index, follow` et les trois entrées de sitemap (option B).
6. **Contrôles après publication** : `sysnext.vercel.app`, puis `www` dans Chrome :
   pages 200 dans les trois langues ; `<meta name="robots">` `index, follow` ;
   canonique de chaque langue sur www ; hreflang `fr`, `fr-CH`, `en`, `de-CH`,
   `x-default` ; trois URL dans `https://www.packshot-creator.com/sitemap.xml` ;
   sur `www`, aucun en-tête `X-Robots-Tag: noindex` (D36 : le Worker retire celui
   de l'origine) ; aucun `Product` ni `Offer` ; état « Aucune machine affichée en
   ce moment » ; lien du pied de page et encadrés des deux articles de blog (aucun lien dans le menu haut) ;
   exemples fictifs en 404 ; routes `GET` → `{"disponible":true}` ; une inscription
   réelle autorisée. Puis inspection d'URL dans Google Search Console (Laurent).
   Un build Vercel « Ready » n'est pas une publication vérifiée.
7. **Retour arrière** : `git revert` de la PR de publication (verrous refermés :
   page en 404, liens et encadrés retirés, sitemap sans la page, routes en 503),
   production en environ 3 minutes ;
   si le défaut vient du code fusionné, `git revert -m 1` du commit de fusion de
   #129. Les contacts déjà inscrits restent chez Resend.

## 9. Conservation des inscrits : décision du 14/10 et purge trimestrielle

**Décision** (Q25, point 4 ; D60, complément) — validation téléphonique de Sébastien
rapportée par Laurent, le 14/10/2026. Fait métier, pas un audit juridique :
1. **Inscrit actif** : trois ans à compter de la confirmation de l'inscription
   (`occasion_alertes_confirme_le`).
2. **Adresse désinscrite** : trois ans à compter de la désinscription
   (`occasion_alertes_desinscrit_le`), avec les seules informations nécessaires au
   respect de l'opposition.
3. **Purge** : contrôle manuel trimestriel, sous la responsabilité de Sébastien ;
   aucun cron, aucun n8n, aucune purge automatique.
4. **Non-réinscription** : tenue tant que la désinscription est conservée ; aucun
   blocage perpétuel promis ; après la purge, une nouvelle demande repasse par un
   nouveau consentement explicite et le double opt-in (le code le fait déjà : un
   contact absent est traité comme une première inscription ; testé).

**Approbation du libellé (D42), Laurent, 15/10/2026** — Le texte de `p5` en FR et en EN
(section ci-dessous, `messages/fr.json` et `messages/en.json`) et la conservation sur
trois ans sont approuvés tels quels : validation métier et éditoriale D42 de `p5` : OUI.
Textes existants conservés, rien à réécrire ; aucun développement ni audit RGPD
supplémentaire. Le bloc de-ch de `de-ch.json` n'est pas servi (`/de-ch/confidentialite`
répond 404) et reste inchangé.

**Dans le code** — `desinscrire` (`lib/occasion/alertes/resend.ts`) passe le topic
Occasion en `opt_out`, retire le contact du segment Occasion, puis ne laisse que
`occasion_alertes_etat` = `desinscrit` et `occasion_alertes_desinscrit_le` :
`demande_le`, `confirme_le`, `version`, `source` et `famille` sont effacées
(valeur `null`, prévue par les types du SDK `resend` 6.9.3 ; [Inférence] effacement
réel par l'API à constater pendant le test réel, section 7, étape 8). La
non-réinscription repose sur l'état et le topic, qui restent. Consentement v3
inchangé.

**Article 9, paragraphe `p5`** (`messages/{fr,en,de-ch}.json`, bloc DE-CH en copie
française ; rendu par `app/[lang]/confidentialite/page.tsx`) — FR : « Conservation des
alertes : une adresse inscrite est conservée trois ans à compter de la confirmation
de son inscription, puis supprimée de la liste. Après une désinscription, seules
votre adresse et la date de votre désinscription sont conservées, trois ans à
compter de celle-ci et pour la seule fin de respecter votre opposition, puis
supprimées. Ces suppressions sont faites lors d'un contrôle trimestriel. Une fois
l'adresse supprimée, une nouvelle inscription suppose une nouvelle demande et un
nouveau consentement, confirmé par e-mail. » EN : traduction fidèle. Test :
`occasion-langues.test.ts` exige ces durées et refuse toute promesse perpétuelle.

**Procédure de purge trimestrielle** (manuelle, Resend, Sébastien ou une personne
qu'il désigne ; à ne pas déclencher avant la première échéance) :
1. Resend, Contacts, filtre sur le segment Occasion puis sur le topic Occasion :
   relever, sans les copier hors de Resend, les contacts concernés.
2. **Actifs échus** (topic `opt_in`, `occasion_alertes_confirme_le` de plus de trois
   ans) : si le contact ne sert à aucune autre liste (aucun autre segment, aucun
   autre topic en `opt_in`), le supprimer ; sinon, le retirer du segment Occasion,
   passer le topic Occasion à `opt_out` et effacer toutes les propriétés
   `occasion_alertes_*` (sans état ni date, l'adresse redevient inscriptible par
   double opt-in).
3. **Désinscrits échus** (`occasion_alertes_etat` = `desinscrit`,
   `occasion_alertes_desinscrit_le` de plus de trois ans) : même règle (suppression,
   ou effacement des propriétés `occasion_alertes_*` si le contact sert ailleurs).
4. **Désinscrits sans date** (sortis du topic par un autre moyen que notre lien, ou
   propriétés résiduelles) : poser `occasion_alertes_etat` = `desinscrit` et
   `occasion_alertes_desinscrit_le` = date du contrôle, effacer les autres propriétés
   `occasion_alertes_*`.
5. Ne jamais toucher au statut global (`unsubscribed`) ni aux autres segments et
   topics ; consigner au JOURNAL la date du contrôle et les nombres traités, sans
   aucune adresse.

## 10. Désinscription autonome : e-mail « Inscription confirmée » (implémenté le 14/10)

Constat initial : un inscrit confirmé n'avait pas de lien de désinscription tant
qu'aucun bulletin n'était parti. Décision du 13/10 maintenue : pas de lien dans
l'e-mail de double opt-in (le destinataire n'est pas encore inscrit). Décision de
Laurent du 14/10 (option E-MAIL, GO_CODE ciblé) : implémentée sur la branche.

Fonctionnement (`lib/occasion/alertes/gestionnaires.ts`, `confirmation`) :
- envoyé **seulement** quand le clic crée l'inscription (`registre.confirmer` →
  `inscrit`) ; rien pour `deja_inscrit` ni `desinscrit` (non-réinscription
  intacte) ; double clic simultané : un seul traitement, donc un seul e-mail
  (`confirmationsEnCours`, mémoire de l'instance) ;
- envoyé **après** l'écriture du contact : le consentement V3 et sa preuve sont
  enregistrés comme avant, rien n'est changé dans le registre ;
- échec d'envoi : l'inscription reste enregistrée (200 `inscrit`), journal
  `alertes.inscription_confirmee.echec_envoi` sans donnée personnelle, pas de
  renvoi automatique ; l'inscrit garde le recours de l'article 9 (`p3`) ;
- réutilise le jeton de désinscription existant (chiffré, sans expiration), le
  lien `#desinscrire-alerte=` vers la page de la langue (`OCCASION_ALERTES_URL_BASE`
  prioritaire), la route et l'écran de désinscription existants ;
- textes FR, EN, DE-CH (`lib/occasion/alertes/courriel.ts`,
  `composerInscriptionConfirmee`), alignés sur l'écran « Inscription confirmée »
  de la page : aucune offre, aucun prix, aucune garantie.

**Textes à valider (D42)**, objet puis corps :
- FR : « Inscription confirmée : nouvelles offres Orbitvu d'occasion » ; « Votre
  inscription est confirmée : vous recevrez par e-mail les nouvelles offres de
  studios Orbitvu d'occasion ([famille]) lorsqu'elles seront disponibles. Cette
  liste est indépendante de la newsletter. Pour vous désinscrire à tout moment,
  utilisez ce lien : [lien] » ; bouton « Me désinscrire ».
- EN : “Subscription confirmed: new pre-owned Orbitvu offers”; “Your subscription
  is confirmed: you will receive emails about new offers on pre-owned Orbitvu
  studios ([family]) when they become available. This list is separate from the
  newsletter. To unsubscribe at any time, use this link: [link]”; “Unsubscribe”.
- DE-CH : „Anmeldung bestätigt: neue Orbitvu-Occasionsangebote“ ; „Ihre Anmeldung
  ist bestätigt: Sie erhalten per E-Mail neue Angebote für Orbitvu-Studios als
  Occasion ([Familie]), wenn sie verfügbar sind. Diese Liste ist vom Newsletter
  unabhängig. Über diesen Link können Sie sich jederzeit abmelden: [Link]“ ;
  « Abmelden ».

Article 9, `p3` (« le lien présent dans chaque message ») : cohérent sans
modification, chaque message reçu après l'inscription portant désormais ce lien.
Coût : un e-mail transactionnel par inscrit. Tests :
`alertes-gestionnaires.test.ts` (bloc « E-mail « Inscription confirmée » »),
`alertes-registre.test.ts`, `occasion-langues.test.ts`.
