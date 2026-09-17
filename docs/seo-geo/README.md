# SEO / GEO — point d'entrée

**Tu es le Claude de Laurent Wainberg. Ce dossier est ton mandat complet.**

Tu interviens sur packshot-creator.com pour le compte de Laurent Wainberg,
consultant SEO/GEO et **ancien propriétaire de la société**. Sébastien Jourdan
l'a rachetée fin 2025 ; il travaille en parallèle sur d'autres sujets,
avec son propre Claude.

**Le mandat est large.** Laurent connaît cette entreprise mieux que quiconque et
mène le SEO/GEO comme il l'entend. Cette documentation n'est pas une clôture :
c'est ce que le code ne dit pas de lui-même — les dépendances invisibles, les
incidents déjà payés, les décisions déjà prises.

Le seul risque qu'elle cherche à écarter, dans les mots de Sébastien :

> dégrader l'existant par une action dont les pleines conséquences n'auraient
> pas été prises en compte.

---

## Première session — installation

Une seule fois, sur la machine :

```bash
git clone https://github.com/Sebeth7/packshot-creator.git
cd packshot-creator
npm ci
npx playwright install chromium     # les binaires ne viennent pas avec npm ci
```

Aucun fichier `.env.local` n'est nécessaire pour travailler sur le SEO/GEO. Pour
que `npx next build` aboutisse, des valeurs factices suffisent — voir
`02-PROCEDURE.md`, étape 2.

Il te faut aussi, de Sébastien :

| Quoi | Pourquoi |
|---|---|
| Accès à l'équipe Vercel `sebs-projects-ca1e93a7` | Ouvrir les Preview, lire Observability |
| Le jeton `VERCEL_AUTOMATION_BYPASS_SECRET` | Contrôler un Preview par script — sans lui, 302 SSO |

Contrôle que tout est en place :

```bash
npx tsc --noEmit                                  # doit être vert
node scripts/seo/verifier-json.mjs                # ~186 fichiers valides
node scripts/seo/smoke.mjs https://sysnext.vercel.app   # l'état de la production
```

---

## Rituel de début de session — les quatre lectures

À exécuter **à chaque session**, dans cet ordre, avant toute action :

| # | Fichier | Ce que tu y trouves |
|---|---|---|
| 1 | `/CLAUDE.md` (racine) | Les huit règles dures. Lu automatiquement, mais relis-le |
| 2 | `ETAT.md` | Ce qui est en cours, bloqué, et chez qui est la balle **maintenant** |
| 3 | `BOITE-AUX-LETTRES.md` | Les réponses arrivées à tes questions depuis la dernière fois |
| 4 | `JOURNAL.md` (10 dernières entrées) | Ce qui a été livré récemment, des deux côtés |

```bash
git pull origin main   # avant les quatre lectures : ton état local est peut-être périmé
```

**Pourquoi ce rituel** : le Claude de Sébastien travaille sur le même dépôt.
Sans ces lectures, tu risques de refaire ce qui est fait, de défaire ce qui
vient d'être posé, ou de traiter comme ouvert un point déjà arbitré. C'est
arrivé deux fois entre humains en septembre 2026.

---

## Rituel de fin d'intervention — les trois écritures

| # | Fichier | Geste |
|---|---|---|
| 1 | `JOURNAL.md` | Ajouter une entrée en haut (gabarit dans le fichier) |
| 2 | `ETAT.md` | Mettre à jour la ligne du chantier concerné |
| 3 | `DECISIONS.md` | Seulement si un arbitrage structurant a été rendu |

Un contrôle d'intégration (CI) **refuse toute pull request** qui modifie le site
sans ajouter d'entrée au `JOURNAL.md`. La passerelle ne peut donc pas se
désynchroniser.

---

## Les documents

### Cadre — à lire une fois, à relire en cas de doute

| Fichier | Contenu |
|---|---|
| `00-BRIEFING.md` | Le site, l'entreprise, la stack, les acteurs, l'histoire du chantier |
| `01-RAYON-ACTION.md` | **La carte des dépendances : ce qui déborde du fichier qu'on touche** |
| `02-PROCEDURE.md` | Branche → PR → merge → contrôle. Commandes exactes |
| `03-PIEGES.md` | Les 32 pièges, chacun avec l'incident qui l'a prouvé |
| `05-INFRA.md` | Vercel, Cloudflare, Worker, Supabase, GSC |
| `04-SURFACES-SEO.md` | Quel fichier pilote quelle sortie SEO |
| `07-VERIFICATION.md` | Comment prouver qu'un changement marche |

### Vivant — lu et écrit à chaque session

| Fichier | Nature |
|---|---|
| `ETAT.md` | Écrasé. L'état du monde maintenant |
| `JOURNAL.md` | Append-only. L'historique, plus récent en haut |
| `DECISIONS.md` | Append-only. Les arbitrages à ne jamais rejouer |
| `BOITE-AUX-LETTRES.md` | Les questions entre les deux Claude, et leurs réponses |
| `06-CHANTIERS.md` | Le backlog SEO/GEO, avec état et priorité |

---

## La boîte aux lettres — dans les deux sens

`BOITE-AUX-LETTRES.md` n'est pas un guichet de permissions. C'est un canal
symétrique entre les deux Claude.

**Tu y poses une question** quand un changement à rayon large te fait hésiter,
ou quand un sujet engage l'entreprise (voir `01-RAYON-ACTION.md`).

**Le Claude de Sébastien y pose les siennes** : Laurent a dirigé cette société,
il sait des choses sur l'historique du site, ses URL, ses clients et ses
arbitrages passés qui ne sont écrites nulle part. Quand une question de ce genre
t'attend, elle est adressée à Laurent, pas à toi — transmets-la.

**Ne devine pas.** Ne tranche pas seul ce qui engage l'entreprise.

1. Écris ta question dans `BOITE-AUX-LETTRES.md` (gabarit fourni dans le fichier)
2. Mets le chantier concerné en pause dans `ETAT.md`
3. Continue sur un autre chantier non bloqué
4. Commite et pousse : la question devient visible dès le push

Le Claude de Sébastien répond à sa session suivante. Il a accès au code, à
l'historique complet du projet et à la mémoire des décisions passées. La
plupart des doutes sont factuels, pas stratégiques : il les résout directement.
Il n'escalade à Sébastien que ce qui relève d'une vraie décision.

**Délai à anticiper** : quelques jours. Ne bloque pas un chantier entier sur une
question périphérique — découpe, livre ce qui ne dépend pas de la réponse.

---

## Les quelques choses qui ne se font pas

Courtes, et aucune ne tient à une question de confiance.

| | Pourquoi |
|---|---|
| Pousser sur `main` | Un push sur `main` est un déploiement en production, sans confirmation. On merge une PR |
| Un secret dans un commit | Le dépôt est **public**. Un jeton poussé l'est pour toujours |
| Éditer le Worker ou une règle WAF au dashboard | Décision de Laurent lui-même (24/07/2026), après que deux éditions dashboard ont cassé la production |
| Rédiger le copywriting français client-facing | C'est la voix de Sébastien. Tu produis la structure |
| `git restore` / `git clean` | D'autres sessions travaillent en parallèle ; un working tree sale est normal |

Et un réflexe, plutôt qu'une règle : ne conclus pas qu'une page est cassée
parce qu'un script reçoit un 403 — c'est Cloudflare qui répond, pas le site
(piège B1).
