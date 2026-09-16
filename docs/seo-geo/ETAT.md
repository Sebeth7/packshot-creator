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
| Gouvernance SEO/GEO | Claude de Sébastien | PR ouverte | `CLAUDE.md`, `docs/seo-geo/**`, `.github/**`, `scripts/seo/**`, `playwright.config.ts` | 16/09 |

*(aucun autre chantier ouvert à ce jour)*

---

## Balle chez Sébastien

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Merger `feat/audit-laurent-0309` (`0e8949f`) | Laurent, via l'audit du 03/09 | 04/09 | Correctif du sélecteur de langue = cause structurelle n°1. Rebaser et rebuilder avant merge. Voir `06-CHANTIERS.md` C1 |
| Débloquer les 7 crawlers IA au dashboard Cloudflare | Mesure de Laurent | 04/09 | ~10 min. GPTBot et Perplexity-User bloqués à 100 % |
| Vérifier et renouveler le jeton `psc-n8n-publisher` | — | 10/09 | Expiré. Le pipeline n8n de Laurent est probablement à l'arrêt |
| Créer le jeton « Protection Bypass for Automation » sur Vercel | Claude de Sébastien | 16/09 | **Prérequis à l'autonomie de Laurent** : sans lui, les Preview sont inaccessibles en script (302 SSO). Vercel → `sysnext` → Settings → Deployment Protection. À transmettre à Laurent |
| Ajouter `lwainberg` à l'équipe Vercel `sebs-projects-ca1e93a7` | Claude de Sébastien | 16/09 | Sans quoi il ne peut pas ouvrir un Preview dans son navigateur, ni lire Observability pour le chantier 504 |
| Créer le libellé `zone-rouge-autorisee` dans le dépôt | Claude de Sébastien | 16/09 | Seul moyen de lever le garde-périmètre quand un chantier SEO l'exige |
| Envoyer les 3 brouillons Gmail du dossier suisse | — | 22/08 | Orbitvu (le coup décisif), fotointern.ch, booster-magazine.ch. Conditionne la mesure C12 |
| Réponse à Laurent sur l'audit du 03/09 | Laurent | 04/09 | Aucune envoyée à ce jour |
| Export mensuel geo-ultimate → Supabase PSC | Laurent | ~10/08 | En retard. Le dashboard affiche des P0 obsolètes |
| Clarifier le `03 20 19 90 90` | — | 20/08 | Vrai numéro ou reliquat ? Sélecteur machines et calendrier Academy |

---

## Balle chez Laurent

| Sujet | Demandé par | Depuis | Détail |
|---|---|---|---|
| Transmettre le fichier Worker **de production** | Claude de Sébastien | 03/09 | Promis, jamais reçu. **Bloque C4, donc C6 et 15 réparations de 404** |
| Liste du lot pilote « redirections legacy → /fr » | Sébastien | 04/09 | Bloque C6 |
| Répartition horaire des 5xx | Laurent l'a proposée | 04/09 | Aide à cibler C3 |

---

## En attente de mesure

| Ce qu'on mesure | Déployé le | Lisible à partir du | Où |
|---|---|---|---|
| Effet de `images.minimumCacheTTL` sur les 504 | 04/09 | 05/09 — **donc lisible maintenant, personne ne l'a lu** | `cf_traffic_daily` |
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

Un chantier terminé **sort de ce tableau** et entre dans `JOURNAL.md`.
