# ÉTAT — qui fait quoi, maintenant

**Dernière mise à jour : 2026-09-20 — Claude de Laurent (page témoin F5)**

Ce fichier est **écrasé**, pas complété. Il décrit l'état du monde à l'instant.
L'historique vit dans `JOURNAL.md`.

**Mets-le à jour à l'ouverture et à la fermeture de chaque chantier.** Une ligne
périmée ici coûte plus cher qu'une ligne absente.

---

## Chantiers ouverts

| Chantier | Qui | État | Fichiers réservés | Depuis |
|---|---|---|---|---|
| Marque — choix de page sur « packshot creator » (D28) | Claude de Laurent | **priorité 1**, mesures M1-M6 avant toute action | — (mesure) | 19/09 |
| Substitution de page — page témoin `/fr/packshot-e-commerce` (711 → ~2 200 mots) | Claude de Laurent | **PR ouverte** `content/f5-packshot-e-commerce`, circuit (b) — **ne pas fusionner avant réécriture de la prose par Laurent** ; aucun lien entrant ajouté avant J+56 | `messages/fr.json` (`packshotEcommerce.longform`, `faq.q4`-`q8`), `components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/packshot-e-commerce/page.tsx` | 19/09 |
| Accents — `fr.json` (211 clés), `machines.ts` (FAQ + JSON-LD) et meta `alphashot-360` | Claude de Laurent | PR à ouvrir, circuit (a) | `messages/fr.json`, `components/calculators/ROICalculator/lib/machines.ts`, `app/[lang]/studio-photo/[slug]/page.tsx` | 19/09 |
| Données structurées — `priceValidUntil` glissant, `sku` | Claude de Laurent | **PR #22** ouverte le 20/09, circuit (a) ; `mpn` écarté, aucune référence constructeur dans `machines.ts` | `lib/leasing.ts`, `components/seo/SchemaOrg.tsx`, `app/[lang]/studio-photo/[slug]/page.tsx` | 19/09 |
| Déploiement du Worker portant uniquement #16 | Claude de Laurent | GO Laurent après notification | `cloudflare-worker/src/index.js` | 19/09 |
| Lot F — annexe K, lot C, verticale de-ch, doublon l. 282/1006, 10 entrées `alphashot-xl-v2`, l. 1134 et 1139 vers le FR | Claude de Laurent | après contrôle du déploiement #16 | `cloudflare-worker/src/index.js`, `next.config` | 19/09 |
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
| **Chiffres de `/fr/packshot-e-commerce` — meta et stats contre REGLES §4** | Laurent | 20/09 | « ROI 4-8 mois », « 80 % », « 500+ produits/jour » affichés contre « 12-15 mois », « -86 % », « jusqu'à 300/jour ». Alignement proposé dans la PR, non appliqué. Objection ou arbitrage avant fusion |
| Q13 — faits commerciaux pour `hasMerchantReturnPolicy` et `shippingDetails` | Laurent | 19/09 | Voir BOITE-AUX-LETTRES |
| Pour information — Q14, article EN en position 2 sur une requête française | Laurent | 19/09 | Aucune réponse attendue avant J+56 de la page témoin ; recommandation : ne rien faire |
| Clarifier le `03 20 19 90 90` | — | 20/08 | inchangé |
| Pour information — Q6, règle WAF PerplexityBot UA + IP | Laurent | 19/09 | Objection éventuelle avant le 25/09 |
| Pour information — Q12, `sysnext.vercel.app` fermé à l'indexation | Laurent | 19/09 | Aucune action requise |
| Pour information — 5 branches distantes portant des commits absents de `main` | Laurent | 19/09 | inchangé |

---

## Balle chez Laurent

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Q10 — cible de clics : décision | Claude de Laurent | 19/09 | Élément nouveau : les quick wins et la substitution de page ne comblent pas l'écart seuls ; la cible dépend du chantier marque |
| GO déploiement du Worker #16 | Claude de Laurent | 19/09 | Après fusion de la PR de notification |
| **Réécriture de la prose de la page témoin** | Claude de Laurent | 20/09 | `packshotEcommerce.longform.*` et `faq.q4`-`q8` sont un premier jet de modèle. La PR ne se fusionne pas en l'état |

---

## En attente de mesure

| Ce qu'on mesure | Déployé le | Lisible à partir du | Où |
|---|---|---|---|
| Correctif du sélecteur de langue (C1) sur la position de marque de `/fr` | 16/09 | 14/10-28/10 | GSC, requête « packshot creator », pays France |
| Canonique des 3 landings après #16 | à venir | J+14 | GSC, inspection d'URL, motif 8 |
| Bascule des réponses IA sur le dossier suisse | 22/08 | ~début octobre, si les mails sont partis | Sondes `geo-ultimate` |
| Page témoin substitution — critère de succès unique (landing devant l'article EN) | à venir (PR ouverte le 20/09) | J+56 | `gsc_metrics`, requête × page, 28 jours glissants ; point de départ à figer à la fusion |

---

## Prochaines actions

- Merge de la PR données structurées, puis PR accents (CC2) — les deux touchent `app/[lang]/studio-photo/[slug]/page.tsx`, conflit possible.
- Mesures M1-M6 du chantier marque (Chrome, `git log`, DataForSEO ≈ 0,02 $, fiche Google Business Profile).
- Déploiement du Worker #16 sur GO de Laurent, contrôle par `curl.exe`.

---

## Accès de Laurent — vérifiés au dashboard le 16/09

| Accès | État réel |
|---|---|
| Dépôt GitHub `Sebeth7/packshot-creator` | **Écriture**, déjà en place |
| Équipe Vercel `sebs-projects-ca1e93a7` | **Déjà membre** — `laurent.wainberg@sysnext.com`, rôle Member, 2FA active. Portée : les 8 projets de l'équipe, arbitré et assumé (D14) |
| Jeton de contournement des Preview | **Créé le 16/09** — reste à lui transmettre |
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
