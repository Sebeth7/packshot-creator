# Dossier de release — #129, landing « Studios Orbitvu d'occasion »

État au 12/10/2026, complété le 13/10 (Claude de Laurent). PR brouillon, DO NOT MERGE.
GO_CODE = YES ; GO_ENVOI_REEL, GO_TEST_REEL_ALERTES, GO_MERGE, GO_PUBLICATION = NO.
Ce dossier ne déclenche rien : il liste ce qui est prêt, ce qui manque et l'ordre
de mise en service.

## 1. Contrôle par surface

| Surface | État dans la branche | Preuve | Reste à faire |
|---|---|---|---|
| Landing FR, EN, DE-CH | `/{fr,en,de-ch}/studios-photo-automatises/opportunites`, même chemin, textes par langue (`components/landings/occasion/contenu-*.ts`) | `occasion-langues.test.ts` ; QA trilingue locale | Relecture de la copy par Sébastien ; relecture native EN et DE-CH recommandée |
| Menus et pied de page | Un seul lien : Solutions > Studios (ordinateur et mobile), colonne des studios du pied de page ; « Offres d'occasion », « Pre-owned offers », « Occasionen » ; vers la page de la même langue ; absent en production tant que la page n'est pas publiée | `occasion-langues.test.ts` ; QA (clavier, 390 et 320 px) | Rien |
| Métadonnées | Titre et description par langue, Open Graph par locale ; `noindex, nofollow` ; ni canonique, ni hreflang | Test des pages | Choix A ou B (section 2) |
| Routes | 3 pages + 3 vues `…/exemples-fictifs` (jamais en production) ; `/api/occasion` et `/api/occasion/alertes{,/confirmation,/desinscription}` en 503 sans lecture de la demande | Build `VERCEL_ENV=production` : 6 × 404, 4 × 503 | Rien |
| Recherche (notification commerciale) | Notification interne `[Occasion]` vers `OCCASION_NOTIFICATION_EMAIL`, puis accusé dans la langue de la page ; aucun CRM | `recherche-*.test.ts` ; test réel Preview du 11/10 (A soumis ; B et quatre e-mails non établis) | Compléter le test réel ; variable en Production |
| Liste d'alerte | Double opt-in, segment et topic dédiés, jamais de réinscription d'un désinscrit ; promesse « nouvelles offres », consentement `occasion-alertes-v3-2026-10-12` (trois langues) | `alertes-*.test.ts` | Q25 ; test réel sur GO |
| Bulletin d'arrivage | « Nouvelles occasions Orbitvu disponibles », une ou plusieurs machines, FR/EN/DE-CH, par famille ; brouillon, empreinte, validation nominative ; envoi verrouillé ; bulletin de test restreint aux inscrits désignés ; aucune route, aucun cron, aucun n8n | `bulletin.test.ts` ; `scripts/occasion-bulletin.mts apercu` (registre vide : aucun bulletin) | Lecture réelle des inscrits et envoi à vérifier au test réel ; GO_ENVOI_REEL |
| Politique de confidentialité | Article 9 (FR, EN ; DE-CH servi en FR), finalité « nouvelles disponibilités », preuve du consentement, désinscription, Resend | `occasion-langues.test.ts` | **Devient publique dès la fusion.** Durée de conservation des inscrits non écrite (Q25) |
| Fichiers de langue | `messages/{fr,en,de-ch}.json` : bloc `privacy` seulement | Intégrité JSON (CI) | Rien |
| Registre de stock | Vide ; guide `data/occasion/AJOUT-MACHINE.md` ; `FRAICHEUR_MAX_JOURS = 30` **provisoire** | `occasion.test.ts` (garde-fous de saisie) | Machines réelles, photos, garantie écrite, accord Orbitvu |
| SEO | Aucun effet en production : 404, aucun lien, ni sitemap, ni hreflang, ni `Product`/`Offer` | Tests des pages et du sitemap | Choix A ou B |
| Verrous (`lib/occasion/activation.ts`) | `PUBLICATION_AUTORISEE`, `COLLECTE_REELLE_AUTORISEE`, `ALERTES_REELLES_AUTORISEES`, `BULLETIN_ENVOI_AUTORISE` = `false` ; fenêtres de test `null` | `occasion.test.ts`, `bulletin.test.ts` | Ouverture par commit, sur GO |

## 2. Indexation : deux options (décision de Laurent)

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
| `OCCASION_NOTIFICATION_EMAIL` | Destinataire de la notification de recherche | Créée par Laurent le 11/10, limitée à la branche | Absente | Établie en Preview (valeur non vue) ; **manquante** en Production |
| `OCCASION_ALERTES_SEGMENT_ID` | Segment Occasion | Absente | Absente | **Manquante** (Q25) |
| `OCCASION_ALERTES_TOPIC_ID` | Topic Occasion (« opt_out » par défaut) | Absente | Absente | **Manquante** (Q25) |
| `OCCASION_ALERTES_SECRET` | Clé des jetons, 32 caractères aléatoires au moins | Absente | Absente | **Manquante** ; une valeur par environnement |
| `OCCASION_ALERTES_URL_BASE` | Origine des liens des e-mails | Facultative (origine de la requête à défaut) | À fixer à `https://www.packshot-creator.com` | **Manquante**. [Inférence] Le Worker du dépôt relaie vers `NEXTJS_ORIGIN` (`cloudflare-worker/src/index.js`, fin du gestionnaire) : sans cette variable, les liens pointeraient vers l'origine Vercel. Le Worker déployé peut différer du dépôt (R5) |

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
- Le segment est commun à la Preview et à la Production : les adresses du test
  réel des alertes servent au bulletin de test (`--test`, publication non
  exigée, aucune machine marquée annoncée), puis sont désinscrites par le lien
  du bulletin reçu ; sinon elles recevraient les vrais bulletins.

## 5. Q25 au 13/10 : accès Resend de Laurent, inventaire à faire en lecture seule

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

## 7. Test réel des alertes (sur GO_TEST_REEL_ALERTES seulement)

Adresses autorisées par écrit avant le test. Fenêtre datée par commit
(`ALERTES_REELLES_AUTORISEES = true`, `FENETRE_TEST_ALERTES_JUSQUA` à 2 h au plus),
Preview de la branche seulement.
1. Inscription FR, puis EN ou DE-CH, chacune avec une famille, et une « toutes les familles ».
2. E-mail de confirmation reçu (boîte de réception, langue de la page, lien vers la page de la langue).
3. Clic sur « Confirmer mon inscription » : état « Inscription confirmée ».
4. Resend : contact créé, segment Occasion, topic Occasion en `opt_in`, sept propriétés remplies.
5. `occasion_alertes_source` donne la langue, `occasion_alertes_famille` la famille ; `occasion_alertes_version` = v3 de la langue.
6. Aucun autre topic ni segment modifié ; aucun abonnement newsletter.
7. Nouvelle confirmation de la même adresse : « déjà inscrite », rien d'écrit.
8. Désinscription par le lien : topic Occasion en `opt_out`, sortie du segment, état `desinscrit` ; autres préférences intactes ; nouvelle demande puis clic de confirmation : « Adresse désinscrite », rien n'est réécrit (non-réinscription).
9. Bulletin de test (`--test`, adresses désignées) si une machine réelle existe ; sinon reporté.
10. Fermeture par commit (`ALERTES_REELLES_AUTORISEES = false`, fenêtre `null`), 503 vérifié sur l'alias, déploiement du commit d'ouverture supprimé puis 404, contacts de test désinscrits.

## 8. Dernière checklist de release

1. Revue de la Preview dans les trois langues (Chrome).
2. Validation éditoriale de Sébastien (FR, EN, DE-CH ; bloc distributeur ; licence hors EEE).
3. Durée de conservation des inscrits décidée et écrite à l'article 9.
4. Choix SEO : A (`noindex`) ou B (section 2).
5. Configuration Production (section 6, V2) vérifiée sans valeur affichée.
6. GO_MERGE, puis GO_PUBLICATION : commit ouvrant `PUBLICATION_AUTORISEE`, `COLLECTE_REELLE_AUTORISEE`, `ALERTES_REELLES_AUTORISEES` (`BULLETIN_ENVOI_AUTORISE` reste fermé).
7. Contrôle `sysnext.vercel.app` puis `www` dans Chrome : page, liens, formulaires, une inscription réelle autorisée.
8. Retour arrière : commit refermant les verrous (ou `git revert` du commit de fusion), production en environ 3 minutes.
