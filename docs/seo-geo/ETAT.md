# ÉTAT — qui fait quoi, maintenant

**Dernière mise à jour : 2026-09-16 — Claude de Sébastien (mise en place de la gouvernance)**

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
| Débloquer les 7 crawlers IA | Mesure de Laurent | 04/09 | **Diagnostic corrigé le 16/09** : les AI bot policies sont déjà sur Allow. La cause est Super Bot Fight Mode + Javascript Detections. Correctif = règle WAF de Skip. Remesurer d'abord — voir `05-INFRA.md` |
| Transmettre le nouveau jeton `psc-n8n-publisher` à Laurent | — | 16/09 | Régénéré le 16/09. À lui faire parvenir par un canal privé — **jamais dans le dépôt, qui est public** |
| Créer le jeton « Protection Bypass for Automation » sur Vercel | Claude de Sébastien | 16/09 | **Prérequis à l'autonomie de Laurent** : sans lui, les Preview sont inaccessibles en script (302 SSO). Vercel → `sysnext` → Settings → Deployment Protection. À transmettre à Laurent |
| Ajouter `lwainberg` à l'équipe Vercel `sebs-projects-ca1e93a7` | Claude de Sébastien | 16/09 | Sans quoi il ne peut pas ouvrir un Preview dans son navigateur, ni lire Observability pour le chantier 504 |
| Envoyer les 3 brouillons Gmail du dossier suisse | — | 22/08 | Orbitvu (le coup décisif), fotointern.ch, booster-magazine.ch. Conditionne la mesure C12 |
| Réponse à Laurent sur l'audit du 03/09 | Laurent | 04/09 | Aucune envoyée à ce jour |
| Export mensuel geo-ultimate → Supabase PSC | Laurent | ~10/08 | En retard. Le dashboard affiche des P0 obsolètes |
| Clarifier le `03 20 19 90 90` | — | 20/08 | Vrai numéro ou reliquat ? Sélecteur machines et calendrier Academy |

---

## Balle chez Laurent

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Transmettre le fichier Worker **de production** | Claude de Sébastien | 03/09 | Promis, jamais reçu. **Bloque C4, donc C6 et 15 réparations de 404** |
| Lancer le contrôle post-déploiement L.3 | Claude de Sébastien | 16/09 | Les correctifs du sélecteur sont en production. Recrawl Screaming Frog (liens d'en-tête non-200 → 0, Link Score `/fr` > `/en`) + inspection des 17 URL de l'annexe L.1 |
| Remesurer les 403 par user-agent | Claude de Sébastien | 16/09 | Ses chiffres datent du 04/09 et la config Cloudflare a changé depuis — voir `05-INFRA.md` |
| Liste du lot pilote « redirections legacy → /fr » | Sébastien | 04/09 | Bloque C6 |
| Répartition horaire des 5xx | Laurent l'a proposée | 04/09 | Aide à cibler C3 |

---

## En attente de mesure

| Ce qu'on mesure | Déployé le | Lisible à partir du | Où |
|---|---|---|---|
| Effet de `images.minimumCacheTTL` sur les 504 | 04/09 | 05/09 — **donc lisible maintenant, personne ne l'a lu** | `cf_traffic_daily` |
| Effet du correctif de sélecteur de langue (C1) | 16/09 | Link Score au prochain crawl hebdomadaire ; position « packshot creator » à 4-6 semaines | Crawl Screaming Frog, GSC |
| Bascule des réponses IA sur le dossier suisse | 22/08 (site) | ~début octobre, **et seulement si les mails sont partis** | Sondes `geo-ultimate` |

---

## Questions ouvertes

Voir `BOITE-AUX-LETTRES.md`. Aucune question en attente à ce jour.

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
