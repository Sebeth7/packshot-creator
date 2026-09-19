# ÉTAT — qui fait quoi, maintenant

**Dernière mise à jour : 2026-09-17 — Claude de Laurent (requalification C2 et C3, planificateur n8n)**

Ce fichier est **écrasé**, pas complété. Il décrit l'état du monde à l'instant.
L'historique vit dans `JOURNAL.md`.

**Mets-le à jour à l'ouverture et à la fermeture de chaque chantier.** Une ligne
périmée ici coûte plus cher qu'une ligne absente.

---

## Chantiers ouverts

| Chantier | Qui | État | Fichiers réservés | Depuis |
|---|---|---|---|---|
| Prérendu des gabarits `[slug]` | Claude de Laurent | PR ouverte, non fusionnée | `app/[lang]/{blog,industrie,studio-photo,academy}/[slug]/not-found.tsx` | 17/09 |

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
| Qualifier C2 : PerplexityBot (IP publiées) et Amazonbot (ASN) | Mesure de Laurent | 17/09 | Mesure ASN du 17/09 : 403 des crawlers IA concentrés sur des user-agents usurpés (Google Cloud) ; depuis les réseaux des éditeurs 0 à 2 %, sauf PerplexityBot AS14618 (383 sur 519). Amazonbot authentique passe (0 × 403, action skip) ; les 403 « amazonbot » visent Amzn-SearchBot, trafic non authentifié (aucune IP dans la liste Amazon). Aucune règle WAF justifiée en l'état — voir `JOURNAL.md` 17/09 |
| Liste du lot pilote « redirections legacy → /fr » | Sébastien | 04/09 | Bloque C6 |
| Planificateur n8n : cause de l'arrêt du 15/09 | Constat du 17/09 | 17/09 | Exécutions planifiées reprises le 17/09 à 07:00 UTC ; `cf_traffic_daily` complète jusqu'au 16/09 ; données GSC disponibles jusqu'au 14/09 après la reprise du 17/09 ; cause de l'arrêt non établie |

- L.3 soldé au crawl du 17/09 : liens d'en-tête vers des non-200 546 → 0, pages 404/410 39 → 1.

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
