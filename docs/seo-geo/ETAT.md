# ÉTAT — qui fait quoi, maintenant

**Dernière mise à jour : 2026-09-19 — Claude de Laurent (nettoyage du suivi, fusion des lots A à E)**

Ce fichier est **écrasé**, pas complété. Il décrit l'état du monde à l'instant.
L'historique vit dans `JOURNAL.md`.

**Mets-le à jour à l'ouverture et à la fermeture de chaque chantier.** Une ligne
périmée ici coûte plus cher qu'une ligne absente.

---

## Chantiers ouverts

| Chantier | Qui | État | Fichiers réservés | Depuis |
|---|---|---|---|---|
| C6 — liste du lot pilote « redirections legacy → /fr » | Claude de Laurent | **priorité 1**, GO du 19/09 pour constituer la liste ; déploiement en porte séparée | `cloudflare-worker/src/index.js` | 04/09 |
| Lot F — annexe K, 3 URL du lot C, 6 verticales de-ch, doublon l. 282, `/fr/blog/[slug]` littéral, 6 articles perdus, 10 entrées ciblant `alphashot-xl-v2` | Claude de Laurent | à ouvrir après #16 | `cloudflare-worker/src/index.js` | 19/09 |
| Accents et champs marchands | Claude de Laurent | à ouvrir | `messages/fr.json`, FAQ des fiches machines, `lib/seo-config.ts` | 19/09 |
| Suisse — A1, A3, 8 `branchen` | Claude de Laurent | à ouvrir | `messages/de-ch.json`, `content/**` | 19/09 |
| Renverser l'axe GEO | Claude de Laurent | à instruire | `content/**` | 19/09 |
| Consolidation du cluster comparatif | Claude de Laurent | **bloqué** — contrôle des backlinks par URL requis avant toute fusion de pages | `content/**` | 19/09 |

---

## Balle chez Sébastien

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Clarifier le `03 20 19 90 90` | — | 20/08 | Sélecteur de machines et calendrier Academy. Le JSON-LD de production du 19/09 ne porte que `+33147426666` et `+41445804384` : vérifier si le numéro subsiste ailleurs, sinon clore |
| Pour information — Q6, règle WAF d'exemption de PerplexityBot par user-agent et adresse IP | Laurent | 19/09 | Aucune action requise. Objection éventuelle avant le 25/09 |
| Pour information — Q12, `sysnext.vercel.app` fermé à l'indexation | Laurent | 19/09 | Aucune action requise |
| Pour information — 5 branches distantes portant des commits absents de `main` | Laurent | 19/09 | `feat/schema-markup-overhaul` (399), `feat/sysnext-industrial` (372), `feature/brandbook-2025-foundations` (51), `feat/de-ch-locale` (5), `feat/geo-referentiels-prix` (2). Hors périmètre de Laurent, non touchées |

---

## Balle chez Laurent

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Liste du lot pilote « redirections legacy → /fr » | Sébastien | 04/09 | Bloque C6, devenu priorité 1. GO donné le 19/09 pour la constituer : parmi les 548 URL routées vers `/en`, celles dont le contenu cible est français et qui portent des impressions ou des backlinks |
| Contrôle des backlinks par URL des 4 landings et des 4 comparatifs | Mesure du 19/09 | 19/09 | `backlinks/backlinks` DataForSEO, ≈ 0,08 $. Bloque la consolidation du cluster comparatif : la conclusion « 0 backlink » est redevenue [Non vérifié] |

---

## En attente de mesure

| Ce qu'on mesure | Déployé le | Lisible à partir du | Où |
|---|---|---|---|
| Effet du correctif de sélecteur de langue (C1) | 16/09 | Link Score au prochain crawl hebdomadaire ; position « packshot creator » à 4-6 semaines | Crawl Screaming Frog, GSC |
| Bascule des réponses IA sur le dossier suisse | 22/08 (site) | ~début octobre, **et seulement si les mails sont partis** | Sondes `geo-ultimate` |
| 504 requalifiés (C3) : confirmation côté Google | 17/09 (mesure) | Dès lecture des statistiques d'exploration GSC | GSC, Cloudflare (Early Hints) |

---

## Prochaines actions

- Déployer le Worker après fusion de la PR de redirections legacy (GO Laurent requis).
- Mesurer à J+14 : part des 404 et 301 dans les statistiques d'exploration, cache des gabarits.

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
