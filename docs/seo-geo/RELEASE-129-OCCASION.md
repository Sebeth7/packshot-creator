# Dossier de release — #129, landing « Studios Orbitvu d'occasion »

État au 12/10/2026 (Claude de Laurent). PR brouillon, DO NOT MERGE.
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
| `OCCASION_ALERTES_URL_BASE` | Origine des liens des e-mails | Facultative (origine de la requête à défaut) | À fixer à `https://www.packshot-creator.com` | **Manquante**. [Inférence] Derrière le Worker, l'origine vue par l'application peut être `sysnext.vercel.app` : à vérifier au test réel |

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

## 5. Ordre de mise en service

Voir la checklist de la PR (section « Après la réponse de Sébastien »).
