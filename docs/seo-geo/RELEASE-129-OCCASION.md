# Dossier de release — #129, landing « Studios Orbitvu d'occasion »

État au 12/10/2026, complété le 13/10 et le 14/10 (Claude de Laurent). PR brouillon, DO NOT MERGE.
GO_CODE = YES ; 14/10 : GO_CORRECTIFS_BRANCHE_129, GO_PRÉPARATION_TESTS,
GO_SYNC_MAIN_BRANCHE_129, GO_PUSH_PREVIEW_129 = YES. Restent à NO ou en attente :
GO_ENVOI_TEST (destinataires et autorisation ciblée), GO_TEST_REEL_ALERTES,
GO_NETTOYAGE_DEPLOIEMENTS, écriture Vercel Production, GO_MERGE, GO_PUBLICATION,
GO_ENVOI_REEL (bulletin).
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

## 1. Contrôle par surface

| Surface | État dans la branche | Preuve | Reste à faire |
|---|---|---|---|
| Landing FR, EN, DE-CH | `/{fr,en,de-ch}/studios-photo-automatises/opportunites`, même chemin, textes par langue (`components/landings/occasion/contenu-*.ts`) | `occasion-langues.test.ts` ; QA trilingue locale | Relecture de la copy par Sébastien ; relecture native EN et DE-CH recommandée |
| Menus et pied de page | Un seul lien : Solutions > Studios (ordinateur et mobile), colonne des studios du pied de page ; « Offres d'occasion », « Pre-owned offers », « Occasionen » ; vers la page de la même langue ; absent en production tant que la page n'est pas publiée | `occasion-langues.test.ts` ; QA (clavier, 390 et 320 px) | Rien |
| Métadonnées | Titre et description par langue, Open Graph par locale ; `noindex, nofollow` ; ni canonique, ni hreflang | Test des pages | Choix A ou B (section 2) |
| Routes | 3 pages + 3 vues `…/exemples-fictifs` (jamais en production) ; `/api/occasion` et `/api/occasion/alertes{,/confirmation,/desinscription}` en 503 sans lecture de la demande | Build `VERCEL_ENV=production` : 6 × 404, 4 × 503 | Rien |
| Recherche (notification commerciale) | Notification interne `[Occasion]` vers `OCCASION_NOTIFICATION_EMAIL`, puis accusé dans la langue de la page ; aucun CRM | `recherche-*.test.ts` ; test réel Preview du 11/10 (A soumis ; B et quatre e-mails non établis) | Reliquat du test réel (section 7) ; variable en Production (`sebastien.jourdan@sysnext.com`, décision du 14/10) |
| Liste d'alerte | Double opt-in, segment et topic dédiés, jamais de réinscription d'un désinscrit ; promesse « nouvelles offres », consentement `occasion-alertes-v3-2026-10-12` (trois langues) ; e-mail de confirmation DE-CH corrigé le 14/10 (le lien de désinscription est promis pour les futurs e-mails d'offres) | `alertes-*.test.ts`, `occasion-langues.test.ts` | Ressources Resend et variables Preview faites (13/10) ; test réel sur GO (section 7) |
| Bulletin d'arrivage | « Nouvelles occasions Orbitvu disponibles », une ou plusieurs machines, FR/EN/DE-CH, par famille ; brouillon, empreinte, validation nominative ; envoi verrouillé ; bulletin de test restreint aux inscrits désignés ; aucune route, aucun cron, aucun n8n | `bulletin.test.ts` ; `scripts/occasion-bulletin.mts apercu` (registre vide : aucun bulletin) | Lecture réelle des inscrits et envoi à vérifier au test réel ; GO_ENVOI_REEL |
| Politique de confidentialité | Article 9 (FR, EN ; DE-CH servi en FR), finalité « nouvelles disponibilités », preuve du consentement, désinscription, Resend | `occasion-langues.test.ts` | **Devient publique dès la fusion.** Durée de conservation des inscrits non écrite : décision et texte préparé en section 9 |
| Fichiers de langue | `messages/{fr,en,de-ch}.json` : bloc `privacy` seulement | Intégrité JSON (CI) | Rien |
| Registre de stock | Vide ; guide `data/occasion/AJOUT-MACHINE.md` ; `FRAICHEUR_MAX_JOURS = 30` **provisoire** | `occasion.test.ts` (garde-fous de saisie) | Publication à stock vide autorisée (14/10). Avant toute première machine : photos de l'unité, garantie écrite, accord Orbitvu |
| SEO | Aucun effet en production : 404, aucun lien, ni sitemap, ni hreflang, ni `Product`/`Offer` | Tests des pages et du sitemap | Proposition retenue le 14/10 : A (`noindex` tant que le stock est vide) |
| Verrous (`lib/occasion/activation.ts`) | `PUBLICATION_AUTORISEE`, `COLLECTE_REELLE_AUTORISEE`, `ALERTES_REELLES_AUTORISEES`, `BULLETIN_ENVOI_AUTORISE` = `false` ; fenêtres de test `null` | `occasion.test.ts`, `bulletin.test.ts` | Ouverture par commit, sur GO |

## 2. Indexation : deux options (décision de Laurent)

**Proposition retenue le 14/10 : A**, page publiée en `noindex` tant que le stock
est vide (état actuel du code, rien à changer). B reste disponible sur arbitrage
contraire de Laurent.

**A — publication en `noindex` (recommandée).** Rien à changer. La page sans stock
affiche « aucune machine » : contenu mince pour l'indexation. Le `noindex` se lève
plus tard par un seul commit.

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

**Volume** : alertes, 3 e-mails de confirmation (6 au plus avec les renvois) et
3 contacts créés ; recherche B, 2 e-mails (notification et accusé). Coût :
[Inférence] nul dans le quota inclus.

**Alertes**
1. Inscription FR, puis EN ou DE-CH, chacune avec une famille, et une « toutes les familles » (T1, T2, T3).
2. E-mail de confirmation reçu (boîte de réception, langue de la page, lien vers la page de la langue).
3. Clic sur « Confirmer mon inscription » : état « Inscription confirmée ».
4. Resend : contact créé, segment Occasion, topic Occasion en `opt_in`, sept propriétés remplies.
5. `occasion_alertes_source` donne la langue, `occasion_alertes_famille` la famille ; `occasion_alertes_version` = v3 de la langue.
6. Aucun autre topic ni segment modifié ; aucun abonnement newsletter (compteurs des autres segments et topics relevés avant et après).
7. Nouveau clic sur le même lien de confirmation : « déjà inscrite », rien d'écrit.
8. **Désinscription manuelle dans Resend** (décision du 13/10) : pour T1, T2 et T3,
   topic Occasion mis à `opt_out` et contact retiré du segment Occasion, sans
   désinscription globale. Puis nouveau clic sur le lien de confirmation initial :
   « Adresse désinscrite », rien n'est réécrit (non-réinscription,
   `lib/occasion/alertes/resend.ts`, `confirmer`).
   **Cette étape ne démontre pas la route publique `POST /api/occasion/alertes/desinscription`** :
   aucun lien de désinscription n'existe hors d'un bulletin. Statut de la route :
   **NON VÉRIFIÉE EN BOUT EN BOUT** (testée avec des doublures seulement,
   `alertes-*.test.ts`), jusqu'au premier bulletin de test ou au dispositif de la
   section 10.
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
   (section 9) ; textes validés (D42, étape 5) ou exception explicite de Laurent ;
   proposition SEO A.
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
   trois langues, aucun lien « Offres d'occasion », `/api/occasion` et
   `/api/occasion/alertes` → `{"disponible":false}` ; article 9 visible sur
   `/fr/confidentialite` et `/en/confidentialite`. Puis `www` dans Chrome (R4).
5. **GO_PUBLICATION** : PR dédiée, un seul fichier (`lib/occasion/activation.ts`) :
   `PUBLICATION_AUTORISEE`, puis `COLLECTE_REELLE_AUTORISEE` et
   `ALERTES_REELLES_AUTORISEES` pour les seuls parcours éprouvés. Fusion = production
   en environ 3 minutes.
6. **Contrôles après publication** : `sysnext.vercel.app`, puis `www` dans Chrome :
   pages 200 dans les trois langues, `noindex` présent (option A), état « Aucune
   machine affichée en ce moment », liens du menu et du pied de page, routes
   `GET` → `{"disponible":true}`, une inscription réelle autorisée. Un build Vercel
   « Ready » n'est pas une publication vérifiée.
7. **Retour arrière** : `git revert` de la PR de publication (verrous refermés :
   page en 404, liens retirés, routes en 503), production en environ 3 minutes ;
   si le défaut vient du code fusionné, `git revert -m 1` du commit de fusion de
   #129. Les contacts déjà inscrits restent chez Resend.

## 9. Conservation des inscrits : décision nécessaire et texte préparé

L'article 4 (« 3 ans pour les données prospects ») ne vaut pas décision pour les
alertes (Q25). Décision attendue (Sébastien, Q25 ; aucune durée n'est inventée ici) :
1. **Durée** de conservation d'un inscrit actif.
2. **Point de départ** : confirmation de l'inscription, ou dernier envoi reçu,
   ou dernière interaction.
3. **Adresse désinscrite** : la règle de non-réinscription suppose de la garder
   (topic `opt_out` chez Resend). Durée de cette conservation, limitée à cette fin.
4. **Purge** : qui la fait et à quel rythme, à la main dans Resend (ni cron ni n8n).

Texte à insérer dans l'article 9 (paragraphe `p5`, `messages/{fr,en,de-ch}.json`,
le bloc DE-CH étant la copie française), crochets à remplacer par la décision :
- FR : « Les adresses inscrites aux alertes sont conservées [DURÉE] à compter de
  [POINT DE DÉPART], puis supprimées. Après une désinscription, l'adresse est
  conservée [DURÉE] pour la seule fin de ne pas vous réinscrire, puis supprimée. »
- EN : “Email addresses subscribed to alerts are kept for [DURATION] from
  [STARTING POINT], then deleted. After you unsubscribe, your address is kept for
  [DURATION] solely to ensure you are not subscribed again, then deleted.”
À la même occasion : test `occasion-langues.test.ts` (« sans durée de conservation
inventée ») réécrit pour exiger la durée décidée.

## 10. Désinscription autonome sans bulletin : constat et proposition (non implémentée)

Constat : un inscrit confirmé n'a pas de lien de désinscription tant qu'aucun
bulletin n'est parti (le jeton n'est créé que par `lib/occasion/bulletin/envoi.ts`).
Moyen existant : écrire à info@sysnext.com (article 9, `p3`). Les bulletins n'ayant
pas de fréquence fixe, l'attente peut être longue. Décision du 13/10 : pas de lien
dans l'e-mail de double opt-in (le destinataire n'est pas encore inscrit).

Plus petit dispositif fiable proposé, **à n'implémenter que sur GO** : un e-mail
« Inscription confirmée », envoyé une fois après le clic de confirmation réussi,
portant le lien personnel `#desinscrire-alerte=` (jeton existant, sans expiration),
en FR, EN et DE-CH. Il réutilise le jeton, le lien, la route et la page de
désinscription existants ; son échec d'envoi n'annule pas l'inscription. Coût : un
e-mail transactionnel par inscrit. Effet de bord utile : la route publique de
désinscription devient testable en bout en bout sans bulletin. Texte à valider
(D42). Alternative sans e-mail : afficher ce lien sur l'écran « Inscription
confirmée » (moins fiable : le visiteur ne le conserve pas forcément).
