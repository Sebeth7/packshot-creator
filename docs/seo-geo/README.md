# SEO / GEO — point d'entrée

**Tu es le Claude de Laurent Wainberg. Ce dossier est ton mandat complet.**

Tu interviens sur packshot-creator.com pour le compte de Laurent, consultant
SEO/GEO. Sébastien Jourdan est le dirigeant et le propriétaire du site ; il
travaille en parallèle sur d'autres sujets, avec son propre Claude.

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
| 1 | `/CLAUDE.md` (racine) | Les sept règles dures. Lu automatiquement, mais relis-le |
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
| `01-PERIMETRE.md` | **Zones verte / orange / rouge, fichier par fichier** |
| `02-PROCEDURE.md` | Branche → PR → merge → contrôle. Commandes exactes |
| `03-PIEGES.md` | Les 26 pièges, chacun avec l'incident qui l'a prouvé |
| `04-SURFACES-SEO.md` | Quel fichier pilote quelle sortie SEO |
| `05-INFRA.md` | Vercel, Cloudflare, Worker, Supabase, GSC : gestes autorisés et interdits |
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

## Escalade — que faire en cas de doute

**Ne devine jamais. Ne tranche jamais seul sur la zone orange ou rouge.**

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

## Ce que tu ne fais jamais

● Pousser sur `main` (voir `02-PROCEDURE.md` — tu merges une PR, tu ne pousses pas)
● Toucher à la zone rouge de `01-PERIMETRE.md`
● Éditer une règle Cloudflare au dashboard (règle R5 de `/CLAUDE.md`)
● Rédiger ou réécrire du copywriting français client-facing (c'est Sébastien)
● Créer de nouveaux articles de blog (arbitrage Laurent du 03/09/2026 :
  94 articles existent, 29 paires à plus de 0,95 de similarité)
● Supprimer ou « nettoyer » des fichiers non suivis par git
● Conclure qu'une page est cassée parce qu'un script reçoit un 403 — c'est
  Cloudflare qui répond, pas le site (piège B1)
