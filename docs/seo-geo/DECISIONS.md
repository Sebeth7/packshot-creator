# DÉCISIONS

Les arbitrages rendus. **On ne les rejoue pas.** Si le contexte a changé au
point de justifier un réexamen, on ouvre une question dans
`BOITE-AUX-LETTRES.md` — on ne décide pas silencieusement l'inverse.

Append-only. Plus récent en haut.

---

## Gabarit

```markdown
## D<n> · AAAA-MM-JJ · <titre>

**Décidé par** : Sébastien | Laurent | les deux
**Statut** : en vigueur | remplacée par D<n>

**La décision** — en une ou deux phrases, à l'impératif.

**Le contexte** — ce qui la motivait.

**Ce qu'elle interdit** — les gestes que cette décision ferme.
```

---

## D12 · 2026-09-16 · Laurent merge lui-même la zone verte

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Le Claude de Laurent merge ses propres pull requests sur la
zone verte, dès lors que le contrôle d'intégration est vert et le Preview
contrôlé. La zone orange exige l'arbitrage de Sébastien. La zone rouge est
fermée.

**Le contexte** — `main` était figé depuis douze jours, le correctif de la cause
structurelle n°1 attendant en branche. Le filet humain était devenu le goulot.
Il est remplacé par des filets techniques : périmètre appliqué par le CI, porte
d'intégration, journal obligatoire.

**Ce qu'elle interdit** — Pousser directement sur `main`. Merger une PR touchant
la zone orange ou rouge. Merger avec un contrôle d'intégration rouge.

---

## D11 · 2026-09-16 · La passerelle vit dans le dépôt

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Toute coordination entre le Claude de Laurent et le Claude de
Sébastien passe par `docs/seo-geo/` : `ETAT.md`, `JOURNAL.md`, `DECISIONS.md`,
`BOITE-AUX-LETTRES.md`. Un doute s'écrit dans la boîte aux lettres ; le chantier
se met en pause ; le Claude de Sébastien répond à sa session suivante.

**Le contexte** — Aucun canal ne reliait les deux côtés. Conséquences déjà
constatées : une liste de travaux « à faire » dont la moitié était livrée la
veille ; un pont de données gelé le jour où il était décidé de le relancer.

**Ce qu'elle interdit** — Coordonner par mail sans trace dans le dépôt. Livrer
sans entrée au journal. Trancher seul un doute de zone orange.

---

## D10 · 2026-09-04 · Vertical défense abandonné

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Abandonner le vertical « défense et sécurité » au profit d'un
vertical **industrie / aéronautique / automobile**. Page cible à définir.

**Ce qu'elle interdit** — Investir sur `industrie-defense`. La fusion prévue à
l'annexe K sur ce sujet est à revoir.

---

## D9 · 2026-09-04 · Traduire les 30 pages `/en` plutôt que les rediriger

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Les 30 pages `/en` qui servent du contenu français seront
**traduites**, par lots, et non redirigées ni supprimées. Les sets
`NOINDEX_EN_*` de `lib/seo-config.ts` pilotent la réactivation : retirer un slug
réactive la page dans robots, sitemap et sélecteur simultanément.

**Ce qu'elle interdit** — Poser un 301 sur ces pages. Retirer un slug d'un set
avant que la traduction soit en ligne.

---

## D8 · 2026-09-04 · Amazonbot reste bloqué

**Décidé par** : Sébastien
**Statut** : en vigueur, tant que durent les 504

**La décision** — Amazonbot (97 % bloqué, 18 946 requêtes sur sept jours) reste
bloqué tant que le taux de 504 ne redescend pas. Les sept autres crawlers IA
doivent être débloqués.

---

## D7 · 2026-09-04 · `price` = mensualité de leasing

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Le champ `price` au niveau `Offer` du schema Product porte la
**mensualité de leasing** : prix comptant × 1,3 réparti sur 60 mois. Google la
lira comme le prix du produit ; c'est assumé.

**Ce qu'elle interdit** — Substituer le prix comptant sans nouvel arbitrage.

---

## D6 · 2026-08-20 · Doctrine de formulation : officiel, jamais exclusif

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — PackshotCreator est distributeur **officiel** d'Orbitvu.
Le mot « exclusif » est proscrit de toute revendication de distribution, dans
toutes les langues. Personne n'est exclusif sur la Suisse.

**Ce qu'elle interdit** — Écrire « exclusif » dans une revendication de
distribution. **Ne concerne pas** les textes juridiques qui emploient
« propriété exclusive de SYSNEXT » — ceux-là ne se touchent pas.

---

## D5 · 2026-09-03 · Ne pas créer de nouveaux articles

**Décidé par** : Laurent, accepté par Sébastien
**Statut** : en vigueur

**La décision** — Ne pas ajouter d'articles de blog. 94 articles existent, dont
29 paires à plus de 0,95 de similarité. Le problème est la cannibalisation.

**Ce qu'elle interdit** — Créer un article. La réponse à un manque de couverture
est la fusion, l'optimisation ou la désindexation.

---

## D4 · 2026-07-24 · Le dépôt est la source unique du Worker

**Décidé par** : Laurent, accepté sans réserve
**Statut** : en vigueur

**La décision** — Toute règle du Worker Cloudflare passe par un commit dans
`cloudflare-worker/src/index.js`, puis un déploiement depuis le dépôt. Plus
aucune édition au dashboard, par personne — « y compris pour désactiver une
règle Cloudflare » (mail de Laurent, 24/07/2026).

**Le contexte** — Deux violations en trois semaines. La seconde a cassé toutes
les vidéos produit en production pendant une journée, par suppression d'une
règle WAF et par un passthrough vide redirigeant un sous-domaine actif.

**Ce qu'elle interdit** — Éditer le Worker au dashboard. Déployer sans avoir
resynchronisé au préalable.

---

## D3 · 2026-06/07 · Le `noindex` sur `/en` est réversible par conception

**Décidé par** : Sébastien et Laurent
**Statut** : en vigueur

**La décision** — Les pages `/en` servant du contenu français sont en `noindex`,
pas en 301. Bascule en 301 ciblée uniquement si un export de backlinks révèle
des liens externes entrants.

---

## D2 · 2026-06 · Orientation B du `robots.txt`

**Décidé par** : Sébastien et Laurent
**Statut** : en vigueur

**La décision** — Ouvrir les crawlers de **citation** (visibilité GEO), bloquer
ceux d'**entraînement et d'extraction**. En-tête
`Content-Signal: search=yes, ai-input=yes, ai-train=no`. `Google-Extended` n'est
pas bloqué.

**Prérequis** — « Block AI bots » et « AI Labyrinth » désactivés côté
Cloudflare, sans quoi le `robots.txt` ne sert à rien.

---

## D1 · 2026-06/08 · La commune du showroom hors de l'éditorial

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — L'éditorial dit « près de Lyon ». La commune exacte
(Saint-Bonnet-de-Mure) n'apparaît que sur la page contact, dans le schema, dans
les mentions légales et sur la fiche Google Business.

**Le contexte** — Déménagement possible.
