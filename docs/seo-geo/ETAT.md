# ÉTAT — qui fait quoi, maintenant

**Dernière mise à jour : 2026-09-17 — Claude de Laurent (mesures C2, C3, 5xx horaires)**

Ce fichier est **écrasé**, pas complété. Il décrit l'état du monde à l'instant.
L'historique vit dans `JOURNAL.md`.

**Mets-le à jour à l'ouverture et à la fermeture de chaque chantier.** Une ligne
périmée ici coûte plus cher qu'une ligne absente.

---

## Chantiers ouverts

| Chantier | Qui | État | Fichiers réservés | Depuis |
|---|---|---|---|---|
*(aucun chantier ouvert — C1 est en production depuis le 16/09)*

---

## Balle chez Sébastien

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Envoyer les 3 brouillons Gmail du dossier suisse | — | 22/08 | Orbitvu (le coup décisif), fotointern.ch, booster-magazine.ch. Conditionne la mesure C12 |
| Export mensuel geo-ultimate → Supabase PSC | Laurent | ~10/08 | En retard. Le dashboard affiche des P0 obsolètes |
| Clarifier le `03 20 19 90 90` | — | 20/08 | Vrai numéro ou reliquat ? Sélecteur machines et calendrier Academy |
| Pour information — Q2 (prose rédigée côté Laurent, validation par Sébastien) | Laurent | 17/09 | Aucune action requise. Objection éventuelle avant le 24/09 ; sans réponse, (b) et D15 s'appliquent |

---

## Balle chez Laurent

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Décider la règle WAF de Skip des 7 crawlers IA (C2) | Mesure de Laurent | 04/09 | Remesuré le 17/09 : GPTBot 77,9 %, Perplexity-User 75,7 %, PerplexityBot 74,9 %, ChatGPT-User 64,6 %, ClaudeBot 59,1 %, OAI-SearchBot 51,0 %, Claude-SearchBot 45,9 % de 403. Challenges issus d'une règle managée, pas de Super Bot Fight Mode. GO requis ; mesure 403 × ASN recommandée avant. Amazonbot à 31,4 % (écart à D8) — voir `JOURNAL.md` 17/09 |
| Lancer le contrôle post-déploiement L.3 | Claude de Sébastien | 16/09 | Les correctifs du sélecteur sont en production. Recrawl Screaming Frog (liens d'en-tête non-200 → 0, Link Score `/fr` > `/en`) + inspection des 17 URL de l'annexe L.1 |
| Liste du lot pilote « redirections legacy → /fr » | Sébastien | 04/09 | Bloque C6 |
| Planificateur n8n à l'arrêt | Constat du 17/09 | 15/09 | Aucune exécution planifiée depuis le 15/09 05:01 UTC ; `cf_traffic_daily` arrêtée au 13/09 ; Heartbeat muet |

---

## En attente de mesure

| Ce qu'on mesure | Déployé le | Lisible à partir du | Où |
|---|---|---|---|
| Effet du correctif de sélecteur de langue (C1) | 16/09 | Link Score au prochain crawl hebdomadaire ; position « packshot creator » à 4-6 semaines | Crawl Screaming Frog, GSC |
| Bascule des réponses IA sur le dossier suisse | 22/08 (site) | ~début octobre, **et seulement si les mails sont partis** | Sondes `geo-ultimate` |

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

Q2 (régime tacite jusqu'au 24/09) — voir BOITE-AUX-LETTRES.md. Q1 et Q3 closes le 17/09.

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
