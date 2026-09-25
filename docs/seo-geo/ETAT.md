# ÉTAT — qui fait quoi, maintenant

**Dernière mise à jour : 2026-09-25 — Claude de Laurent (resynchronisation P0-K ; P0-I APPLIED / PASS le 25/09 ; P0-J OPEN, différé après la fenêtre P0-H du 08/10 ; arbitrages de Laurent du 25/09 : Q2, Q4, Q6, Q12 à Q15 closes, D32 à D36 ; seule Q10 reste ouverte. P0 : #29, #30, #32, #33 fusionnées, #31 fermée sans fusion ; Worker P0-D/E CLOSED, version `27b0153c` ; D29 suspendue, D30, D31)**

Ce fichier est **écrasé**, pas complété. Il décrit l'état du monde à l'instant.
L'historique vit dans `JOURNAL.md`.

**Mets-le à jour à l'ouverture et à la fermeture de chaque chantier.** Une ligne
périmée ici coûte plus cher qu'une ligne absente.

---

## Chantiers ouverts

| Chantier | Qui | État | Fichiers réservés | Depuis |
|---|---|---|---|---|
| Marque — choix de page sur « packshot creator » (D28) | Claude de Laurent | M1, M2, M6 faits le 23/09 ; H1 écartée ; gain réévalué 10-20 clics/mois ; M5 le 14-28/10 ; fiche Google France corrigée par Laurent | — (mesure) | 19/09 |
| Substitution de page — page témoin `/fr/packshot-e-commerce` (711 → ~2 200 mots) | Claude de Laurent | brief CC5, circuit (b) ; aucun lien entrant ajouté avant J+56 | `messages/fr.json` (`packshotEcommerce.longform`), `components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/packshot-e-commerce/page.tsx` | 19/09 |
| Accents — `fr.json` (211 clés), `machines.ts` (FAQ + JSON-LD) et meta `alphashot-360` | Claude de Laurent | PR à ouvrir, circuit (a) | `messages/fr.json`, `components/calculators/ROICalculator/lib/machines.ts`, `app/[lang]/studio-photo/[slug]/page.tsx` | 19/09 |
| Lot F — annexe K, lot C, verticale de-ch, doublon l. 282/1006, 10 entrées `alphashot-xl-v2`, l. 1134 et 1139 vers le FR | Claude de Laurent | PR #26 fusionnée et Worker déployé le 23/09 (version `05c5c47c`) ; reste le contrôle `curl.exe` de Laurent à reporter au journal | — | 19/09 |
| D29 — mapping produit Alphashot XL v2 / XL G2 | Claude de Laurent | **SUSPENDED / REVIEW_PRODUCT_MAPPING** ; aucune redirection automatique XL v2 → XL G2 validée. PR #31 fermée sans fusion (`SUPERSEDED / REVIEW_PRODUCT_MAPPING`), aucune de ses règles conservée. 13 redirections du Worker en production vers `alphashot-xl-g2` et 2 règles de `next.config.ts` vers `alphashot-xl-v2` laissées en l'état ; aucun rollback automatique ; aucun changement XL avant validation du mapping | — | 24/09 |
| P0-F — crawlers IA | Claude de Laurent | **DEFERRED_BLOCKED_ACCESS** : différé faute d'accès aux Security Events Cloudflare ; aucune modification WAF ou SBFM sans mesure | — | 24/09 |
| P0-J — device + watchdog | Claude de Laurent | **OPEN, différé** : `gsc_metrics_device` figée au 20/06/2026 (sites 2 et 3) ; aucune collecte active (M5 ne collecte que requête, pays et page) ; aucun watchdog (absente de `data_freshness_expected`). Exécution après la fin de la fenêtre P0-H le 08/10 ; M5 et `gsc_pull_bornes` ne sont pas modifiés d'ici là | — (n8n M5 `Sqdk2jygOSt9XEjL`, Supabase `gsc_pull_bornes`, `data_freshness_expected`) | 25/09 |
| C6 — pilote de 25 URL, **hygiène de locale** (D28), effet clics ≈ 0 | Claude de Laurent | liste constituée, cycle distinct du lot F | `cloudflare-worker/src/index.js` | 04/09 |
| Consolidation du cluster comparatif | Claude de Laurent | **débloquée** — 0 backlink mesuré le 19/09 avec témoin | `content/**` | 19/09 |
| Renverser l'axe GEO | Claude de Laurent | 3 pages en circuit (b) | `content/**`, `messages/fr.json` | 19/09 |
| Suisse — A1, A3, 8 `branchen` | Claude de Laurent | à instruire | `messages/de-ch.json`, `content/**` | 19/09 |
| Maillage article → offre (Q3) | Claude de Laurent | 23 liens listés, circuit (b) | `content/**` | 19/09 |

---

## Balle chez Sébastien

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Clarifier le `03 20 19 90 90` | — | 20/08 | inchangé |
| Pour information — 5 branches distantes portant des commits absents de `main` | Laurent | 19/09 | inchangé |

---

## Balle chez Laurent

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Q10 — cible de clics : décision | Claude de Laurent | 19/09 | Élément nouveau : les quick wins et la substitution de page ne comblent pas l'écart seuls ; la cible dépend du chantier marque |
| `curl.exe` du lot F (Worker déployé le 23/09) | Claude de Laurent | 23/09 | Témoins listés dans la PR #26 ; résultat à reporter au journal |
| Contrôle visuel Chrome sur `www` de #29 et #32 (R4) : `/fr`, `/en`, `/de-ch` | Claude de Laurent | 24/09 | Seul contrôle restant. Le site charge normalement ; sur `/de-ch`, aucun bloc d'avis ni de témoignages. Le JSON-LD `inLanguage` a déjà été contrôlé sur `sysnext.vercel.app` le 24/09 |
| D29 — validation du mapping produit Alphashot XL v2 / XL G2 | Claude de Laurent | 24/09 | Préalable à tout changement de redirection XL ; périmètre dans D29 |

---

## En attente de mesure

| Ce qu'on mesure | Déployé le | Lisible à partir du | Où |
|---|---|---|---|
| Correctif du sélecteur de langue (C1) sur la position de marque de `/fr` | 16/09 | 14/10-28/10 | GSC, requête « packshot creator », pays France |
| Canonique des 3 landings après #16 (Worker déployé le 20/09, version `167d7a15`) | 20/09 | ~04/10 (J+14) | GSC, inspection d'URL, motif 8 |
| Lot F — 18 chemins de l'annexe K et `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie` sortis des 404/410 | 23/09 | 07/10 | GSC, couverture |
| P0-D/E — Worker `27b0153c` : 30 premiers sauts vers une page de-ch équivalente, un successeur documenté ou une chaîne à un saut | 25/09 | 09/10 | GSC, couverture et pages de destination |
| P0-H — `gsc_pull_bornes` en parcours d'index inversé (migration `p0h_gsc_pull_bornes_index_backward_20260924`) : critère 0 échec de M5. M5 et `gsc_pull_bornes` sont gelés jusqu'au 08/10 | 24/09 | 08/10 (fenêtre du 25/09 au 08/10) | n8n, exécutions de `M5 · GSC pull` (`Sqdk2jygOSt9XEjL`) |
| Bascule des réponses IA sur le dossier suisse | 22/08 | ~début octobre, si les mails sont partis | Sondes `geo-ultimate` |
| Page témoin substitution — critère de succès unique (landing devant l'article EN) | à venir | J+56 | `gsc_metrics`, requête × page, 28 jours glissants |
| `sku` et `priceValidUntil` des 51 fiches — passage des « Fiches marchand » de non valides à valides | 20/09 | J+7 à J+14 | GSC, rapport « Fiches marchand » ; 2 des 4 champs manquants comblés ; les 2 autres relèvent de D32, mise en œuvre à faire |

---

## Prochaines actions

- PR accents (CC2) : rebaser sur `main` après le merge de #22 — les deux touchent `app/[lang]/studio-photo/[slug]/page.tsx`.
- Contrôle de #22 dans Chrome sur `www.packshot-creator.com` et test des résultats enrichis de Google sur 3 fiches : à faire par Laurent (R4).
- Mesures M1-M6 du chantier marque (Chrome, `git log`, DataForSEO ≈ 0,02 $, fiche Google Business Profile).
- #29 et #32 : `smoke.mjs` et contrôle sur `sysnext.vercel.app` faits le 24/09 (PASS). Reste le contrôle visuel Chrome sur `www` (`/fr`, `/en`, `/de-ch`), par Laurent.
- P0-J, **après le 08/10** (fin de la fenêtre P0-H) et sur GO :
  - ajouter la dimension device à M5 (brouillon n8n, puis publication) ;
  - ajouter la borne device à `gsc_pull_bornes` ;
  - reprendre l'historique depuis le 21/06 ;
  - inscrire `gsc_metrics_device` (sites 2 et 3) dans `data_freshness_expected`, pour que M0 alerte en cas de retard.
  - Une dernière PR documentaire fermera ensuite le P0.
- Aucun changement de redirection XL avant la validation du mapping produit (D29).
- D32 : balisage `hasMerchantReturnPolicy` (aucun retour) et `shippingDetails` (livraison et installation facturées en supplément, délai indicatif d'environ 10 jours, jamais garanti ; même règle en France et en Suisse), dans une PR applicative distincte.
- D33 :
  - aligner `foundingDate` de 2004 sur 2001 (`components/seo/SchemaOrg.tsx:72`), dans une PR applicative distincte ;
  - relire les quatre textes qui annoncent en allemand l'ensemble du service, formation et SAV compris : `messages/fr.json:189`, `messages/de-ch.json:167`, `messages/en.json:93` et `app/[lang]/distributeur-orbitvu-suisse/page.tsx:36`. Reformulation éventuelle vers « accompagnement commercial en allemand », sans aucune modification dans #34 ;
  - fiche Google (Laurent, hors dépôt) : si elle déclare l'espagnol parlé, la corriger ; sa mention « Allemand non parlé » est à revoir au regard de D33.
- D36 : `noindex` de `sysnext.vercel.app`, à exécuter puis à vérifier, sans toucher `www` ; tenir compte de `smoke.mjs`, qui lit la balise `robots` et non l'en-tête.
- D22 (Q6 close) : créer la règle WAF « Skip SBFM — PerplexityBot », conditionnée au user-agent et aux adresses publiées ; contrôle à J+3. Modification Cloudflare, non exécutée au 25/09.

---

## P0 du 24/09 — état

| Élément | État |
|---|---|
| P0-A | **APPLIED** : PR #29 fusionnée le 24/09 (`6c16108`). Contrôlé sur `sysnext.vercel.app` le 24/09 : `inLanguage` `fr-FR`, `en-US` et `de-CH`, smoke vert. Reste le contrôle visuel Chrome sur `www` |
| P0-B | Verdict `MIXED` retenu par Laurent, livrable hors dépôt ; aucune preuve de pénalité liée au contenu IA |
| P1-Q (réécriture ou suppression du blog) | **Non ouvert.** Aucun commit touchant `content/blog` sur `main` depuis le 01/08 |
| P0-D/E | **CLOSED** le 25/09. PR #30 fusionnée (`665f5ef`) ; Worker déployé depuis `main` (`69cd647`), version `27b0153c-5516-432a-91a4-20cddce250ca`, vérifié depuis le poste de Laurent (16 témoins PASS, aucun rollback). Rollback disponible : `05c5c47c-4b60-41af-9acd-b3778be1e508`. Mappings XL existants inchangés, `REVIEW_PRODUCT_MAPPING` |
| P0-F | **DEFERRED_BLOCKED_ACCESS** : différé faute d'accès aux Security Events Cloudflare |
| P0-H | **APPLIED / MEASUREMENT WINDOW OPEN** jusqu'au 08/10 (critère : 0 échec de M5) ; M5 et `gsc_pull_bornes` gelés d'ici là |
| P0-I | **APPLIED / PASS** le 25/09 à 06:13 UTC. Migration `p0i_filtre_pollution_gsc_site_20260925` : `amazon` retiré des motifs de pollution des 8 fonctions, `(^|\s)site:` ajouté ; clics inchangés, dry-run reproduit exactement. Rollback gardé par md5 consigné au JOURNAL du 25/09 |
| P0-J | **OPEN, différé** : `gsc_metrics_device` figée au 20/06/2026 (sites 2 et 3) ; aucune collecte active ; aucun watchdog. Exécution après la fin de la fenêtre P0-H, le 08/10, pour ne modifier ni M5 ni `gsc_pull_bornes` pendant la mesure |
| P0-K | Resynchronisation documentaire du 25/09 dans la PR #35 : `ETAT`, `JOURNAL`, boîte aux lettres et `DECISIONS` sont mis en cohérence. Effective à la fusion de #35 |
| D29 | **SUSPENDED / REVIEW_PRODUCT_MAPPING** ; aucune redirection automatique XL v2 → XL G2 validée ; aucun rollback automatique |
| #31 | **CLOSED / NOT MERGED** (`SUPERSEDED / REVIEW_PRODUCT_MAPPING`) ; aucune de ses règles conservée |
| D30 | **OUT_OF_SCOPE_NO_CHANGE** : aucun prix ni aucune devise modifiés dans ce chantier |
| D31 | **APPLIED** : PR #32 fusionnée le 24/09 (`c9f8aa5`). Aucun témoignage, `Review` ni `aggregateRating` sur `/de-ch`, contrôlé sur `sysnext.vercel.app` le 24/09 (48 pages de-ch) |

P0-C et P0-G sont hors de cette resynchronisation : leur état n'est pas établi par les sources du dépôt. Pour P0-C, il s'agit de constats de marque déclarés par Laurent, dont le livrable n'est pas dans le dépôt (JOURNAL du 24/09).

---

## Accès de Laurent — vérifiés au dashboard le 16/09

| Accès | État réel |
|---|---|
| Dépôt GitHub `Sebeth7/packshot-creator` | **Écriture**, déjà en place |
| Équipe Vercel `sebs-projects-ca1e93a7` | **Déjà membre** — `laurent.wainberg@sysnext.com`, rôle Member, 2FA active. Portée : les 8 projets de l'équipe, arbitré et assumé (D14) |
| Jeton de contournement des Preview | **Créé le 16/09** — toujours pas transmis. Constaté le 20/09 sur la PR #22 : sans lui, un Preview répond 302 vers `vercel.com/sso-api` et aucun contrôle par script n'y est possible |
| Cloudflare | En place |
| Supabase `gsc-crawl-seo` | Sa propre base |

Rien ne bloque son démarrage, une fois le jeton transmis et
`docs/seo-geo/README.md` partagé.

L'attribution de rôles **par projet** sur Vercel est réservée au plan
Enterprise ; sur le plan Pro, l'accès est au niveau de l'équipe. C'est donc
l'accès équipe qui fait foi — voir D14.

Côté GitHub, `Sebeth7` est un compte personnel : l'accès collaborateur y est
strictement par dépôt. Laurent n'a que `packshot-creator`, vérifié le 16/09 sur
les 9 dépôts.

---

## Questions ouvertes

**Seule question ouverte : Q10** (cible D24), voir BOITE-AUX-LETTRES.md.

Questions closes :
- Q1 et Q3, le 17/09.
- Q2, Q4, Q6, Q12, Q13, Q14 et Q15, par Laurent le 25/09. Q2 selon le régime tacite prévu au 24/09 ; les réponses sont consignées en D15, D22 et D32 à D36.
- Q5, Q7, Q8, Q9 et Q11 : arbitrées par Laurent le 19/09 sans dépôt, consignées en D26.

Q16 à Q18 n'ont jamais été déposées ; leur absence a été acceptée par Laurent le 24/09.

---

## Gabarit

```markdown
| Chantier | Qui | État | Fichiers réservés | Depuis |
|---|---|---|---|---|
| <nom> | Claude de Laurent | en cours \| PR #<n> \| en attente d'arbitrage \| bloqué | `chemin/a.ts`, `chemin/b.json` | JJ/MM |
```

États possibles : `en cours` · `PR #<n>` · `en attente d'arbitrage` ·
`bloqué (raison)` · `en attente de mesure`.

Rappel : « en attente d'arbitrage » ne concerne que ce qui engage l'entreprise
vis-à-vis d'un tiers (`01-RAYON-ACTION.md`). Le reste se merge sans attendre.

Un chantier terminé **sort de ce tableau** et entre dans `JOURNAL.md`.
