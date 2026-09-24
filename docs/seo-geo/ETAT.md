# ÉTAT — qui fait quoi, maintenant

**Dernière mise à jour : 2026-09-24 — Claude de Laurent (P0 : PR #29, #30, #32, #33 ouvertes, #31 fermée, rien fusionné ; D29 suspendue, D30, D31)**

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
| P0-A — `WebSite.inLanguage` de-CH sur `/de-ch` | Claude de Laurent | PR #29, CI verte, **non fusionnée** | `components/seo/SchemaOrg.tsx`, `app/[lang]/page.tsx`, `lib/seo/locale-schema.ts` | 24/09 |
| P0-D/E — héritage `/de` → `/de-ch`, chaînes `/industrie/*` à un saut, doublon « -22 » (variante `/amp` en 410) ; `/de/fotostudio/alphashot-xl` inchangé (REVIEW_PRODUCT_MAPPING) | Claude de Laurent | PR #30, CI verte, **non fusionnée** ; Worker **non déployé**, GO séparé de Laurent | `cloudflare-worker/src/index.js` | 24/09 |
| D29 — mapping produit Alphashot XL v2 / XL G2 | Claude de Laurent | **SUSPENDED / REVIEW_PRODUCT_MAPPING** ; aucune redirection automatique XL v2 → XL G2 validée. PR #31 fermée sans fusion (`SUPERSEDED / REVIEW_PRODUCT_MAPPING`), aucune de ses règles conservée. 13 redirections du Worker en production vers `alphashot-xl-g2` et 2 règles de `next.config.ts` vers `alphashot-xl-v2` laissées en l'état ; aucun rollback automatique ; aucun changement XL avant validation du mapping | — | 24/09 |
| D31 — aucun témoignage ni avis client sur `/de-ch`, `Review` et `aggregateRating` compris | Claude de Laurent | PR #32, CI verte, **non fusionnée** ; `aggregateRating` de `/de-ch/ia-photo-produit` retiré (`1c52eb7`) ; `/fr` et `/en` inchangés | `components/testimonials/TestimonialsSection.tsx`, `components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/page.tsx`, `app/[lang]/ia-photo-produit/page.tsx`, `messages/de-ch.json` | 24/09 |
| P0-I — filtre pollution des requêtes GSC (8 fonctions SQL : exclusion générique de `amazon` retirée, opérateurs `site:` exclus) | Claude de Laurent | **READY_FOR_GO, non appliqué** : les 8 fonctions portent encore l'exclusion `amazon` (relu le 24/09) | Supabase `gsc-crawl-seo` | 24/09 |
| P0-F — crawlers IA | Claude de Laurent | **BLOCKED_ACCESS** : pas d'accès aux Security Events Cloudflare ; aucune modification WAF ou SBFM sans mesure | — | 24/09 |
| C6 — pilote de 25 URL, **hygiène de locale** (D28), effet clics ≈ 0 | Claude de Laurent | liste constituée, cycle distinct du lot F | `cloudflare-worker/src/index.js` | 04/09 |
| Consolidation du cluster comparatif | Claude de Laurent | **débloquée** — 0 backlink mesuré le 19/09 avec témoin | `content/**` | 19/09 |
| Renverser l'axe GEO | Claude de Laurent | 3 pages en circuit (b) | `content/**`, `messages/fr.json` | 19/09 |
| Suisse — A1, A3, 8 `branchen` | Claude de Laurent | à instruire | `messages/de-ch.json`, `content/**` | 19/09 |
| Maillage article → offre (Q3) | Claude de Laurent | 23 liens listés, circuit (b) | `content/**` | 19/09 |

---

## Balle chez Sébastien

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| **Pour information — déploiement du Worker portant uniquement #16, cette semaine** | Laurent | 19/09 | Aucune action requise. Objection éventuelle avant le déploiement. Contrôle par URL témoins, rollback par redéploiement |
| Q13 — faits commerciaux pour `hasMerchantReturnPolicy` et `shippingDetails` | Laurent | 19/09 | Voir BOITE-AUX-LETTRES |
| Pour information — Q14, article EN en position 2 sur une requête française | Laurent | 19/09 | Aucune réponse attendue avant J+56 de la page témoin ; recommandation : ne rien faire |
| Clarifier le `03 20 19 90 90` | — | 20/08 | inchangé |
| Pour information — Q6, règle WAF PerplexityBot UA + IP | Laurent | 19/09 | Objection éventuelle avant le 25/09 |
| Pour information — Q12, `sysnext.vercel.app` fermé à l'indexation | Laurent | 19/09 | Aucune action requise |
| Pour information — 5 branches distantes portant des commits absents de `main` | Laurent | 19/09 | inchangé |
| Q15 — fiche Google France : langues, date de création, compte Twitter | Laurent | 23/09 | Voir BOITE-AUX-LETTRES |

---

## Balle chez Laurent

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Q10 — cible de clics : décision | Claude de Laurent | 19/09 | Élément nouveau : les quick wins et la substitution de page ne comblent pas l'écart seuls ; la cible dépend du chantier marque |
| `curl.exe` du lot F (Worker déployé le 23/09) | Claude de Laurent | 23/09 | Témoins listés dans la PR #26 ; résultat à reporter au journal |
| GO fusion — ordre : #29 (P0-A), #30 (P0-D/E), #32 (D31), puis #33 (gouvernance) en dernier ; #31 jamais fusionnée | Claude de Laurent | 24/09 | CI verte ; après chaque fusion, fusionner `main` dans la PR suivante, résoudre `JOURNAL.md` en gardant toutes les entrées et attendre la CI verte |
| GO déploiement du Worker — PR #30 | Claude de Laurent | 24/09 | Après fusion ; resynchronisation préalable (D4, R5) ; témoins `curl.exe` listés dans la PR |
| GO P0-I | Claude de Laurent | 24/09 | Application des 8 fonctions SQL ; rien n'est appliqué sans ce GO |
| D29 — validation du mapping produit Alphashot XL v2 / XL G2 | Claude de Laurent | 24/09 | Préalable à tout changement de redirection XL ; périmètre dans D29 |

---

## En attente de mesure

| Ce qu'on mesure | Déployé le | Lisible à partir du | Où |
|---|---|---|---|
| Correctif du sélecteur de langue (C1) sur la position de marque de `/fr` | 16/09 | 14/10-28/10 | GSC, requête « packshot creator », pays France |
| Canonique des 3 landings après #16 | à venir | J+14 | GSC, inspection d'URL, motif 8 |
| Lot F — 18 chemins de l'annexe K et `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie` sortis des 404/410 | 23/09 | 07/10 | GSC, couverture |
| P0-H — `gsc_pull_bornes` en parcours d'index inversé (migration `p0h_gsc_pull_bornes_index_backward_20260924`) : critère 0 échec de M5 | 24/09 | 08/10 (fenêtre du 25/09 au 08/10) | n8n, exécutions de `M5 · GSC pull` (`Sqdk2jygOSt9XEjL`) |
| Bascule des réponses IA sur le dossier suisse | 22/08 | ~début octobre, si les mails sont partis | Sondes `geo-ultimate` |
| Page témoin substitution — critère de succès unique (landing devant l'article EN) | à venir | J+56 | `gsc_metrics`, requête × page, 28 jours glissants |
| `sku` et `priceValidUntil` des 51 fiches — passage des « Fiches marchand » de non valides à valides | 20/09 | J+7 à J+14 | GSC, rapport « Fiches marchand » ; 2 des 4 champs manquants comblés, Q13 pour les 2 autres |

---

## Prochaines actions

- PR accents (CC2) : rebaser sur `main` après le merge de #22 — les deux touchent `app/[lang]/studio-photo/[slug]/page.tsx`.
- Contrôle de #22 dans Chrome sur `www.packshot-creator.com` et test des résultats enrichis de Google sur 3 fiches : à faire par Laurent (R4).
- Mesures M1-M6 du chantier marque (Chrome, `git log`, DataForSEO ≈ 0,02 $, fiche Google Business Profile).
- Fusion sur GO de Laurent, dans l'ordre #29, #30, #32, #33, avec le contrôle post-déploiement de chacune (`smoke.mjs`, `sysnext.vercel.app`, Chrome). Pas de déploiement automatique du Worker après #30.
- Déploiement du Worker de la PR #30 sur GO séparé de Laurent, après resynchronisation ; contrôle par `curl.exe`.
- Aucun changement de redirection XL avant la validation du mapping produit (D29).

---

## P0 du 24/09 — état

| Élément | État |
|---|---|
| P0-A | PR #29 ouverte, CI verte, non fusionnée |
| P0-B | Verdict `MIXED` retenu par Laurent, livrable hors dépôt ; aucune preuve de pénalité liée au contenu IA |
| P1-Q (réécriture ou suppression du blog) | **Non ouvert.** Aucun commit touchant `content/blog` sur `main` depuis le 01/08 |
| P0-D/E | PR #30 ouverte, CI verte, non fusionnée ; Worker non déployé |
| P0-F | BLOCKED_ACCESS |
| P0-H | Appliqué le 24/09 ; fenêtre de mesure ouverte jusqu'au 08/10 |
| P0-I | READY_FOR_GO, non appliqué |
| D29 | **SUSPENDED / REVIEW_PRODUCT_MAPPING** ; aucune redirection automatique XL v2 → XL G2 validée ; PR #31 fermée sans fusion (`SUPERSEDED / REVIEW_PRODUCT_MAPPING`) ; aucun rollback automatique |
| D30 | **OUT_OF_SCOPE_NO_CHANGE** : aucun prix ni aucune devise modifiés dans ce chantier |
| D31 | PR #32 : aucun témoignage, `Review` ni `aggregateRating` sur `/de-ch` |

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

Q10 (cible D24) — voir BOITE-AUX-LETTRES.md. Q6 et Q12 déposées pour information.
Q1, Q3 closes le 17/09 ; Q2 close le 24/09 par régime tacite ; Q5, Q7, Q8, Q9 et Q11 arbitrées par Laurent le 19/09 sans dépôt, consignées en D26.

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
