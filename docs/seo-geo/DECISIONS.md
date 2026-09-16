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

## D14 · 2026-09-16 · L'accès Vercel de Laurent reste à l'échelle de l'équipe

**Décidé par** : Sébastien
**Statut** : en vigueur

**La décision** — Laurent garde le rôle `Member` sur l'équipe Vercel
`sebs-projects-ca1e93a7`, donc l'accès aux 8 projets qu'elle contient. Arbitrage
rendu en connaissance de cause : « tant pis on lui laisse l'accès total Vercel,
pas très risqué ».

**Le contexte** — Question posée à l'origine sur GitHub, où la réponse est
nette : `Sebeth7` est un compte personnel, l'accès collaborateur y est par
dépôt, et Laurent n'a que `packshot-creator`. Rien à corriger.

Sur Vercel en revanche, l'équipe héberge `sysnext`, `jade-tdb`, `frontend`,
`packshot-art`, `packshot-art-next`, `packshot-evolution`, `sebjourdanphoto` et
`recraft-studio-backend`. Le rôle `Member` porte sur les huit : créer des
déploiements, gérer intégrations et domaines.

**Pourquoi c'est resté ainsi** — Le cloisonnement par projet est réservé au plan
Enterprise ; les cinq rôles du plan Pro sont tous à l'échelle de l'équipe. Les
seules sorties réelles étaient de le passer en `Viewer`, de migrer `sysnext`
dans une équipe dédiée, ou de le retirer. Aucune n'a paru justifiée au regard du
risque.

À noter : Laurent a présidé cette société. Son accès Vercel est vraisemblablement
hérité de l'ancienne configuration, pas accordé récemment.

**Ce qu'elle ferme** — Ne pas rouvrir ce sujet sans élément nouveau. Si un
cloisonnement devenait nécessaire, la migration de `sysnext` vers une équipe
dédiée est un chantier à part : re-liaison GitHub, domaines à revérifier, et un
abonnement supplémentaire.

**Non vérifié** — Si le rôle `Viewer` donne accès à Observability sur le plan
Pro. Sans objet tant que D14 tient, mais à savoir si la question revient.

---

## D13 · 2026-09-16 · Quartier libre — le risque à écarter est celui des conséquences non mesurées

**Décidé par** : Sébastien
**Statut** : en vigueur — **remplace le cadre de permissions initial de D12**

**La décision** — Laurent a quartier libre sur le site. Le mandat ne se définit
pas par ce qu'il a le droit de toucher, mais par ce dont il doit avoir mesuré
les conséquences avant d'agir. Dans ses mots :

> Laurent est l'ancien propriétaire de la société, c'est une personne de
> confiance. Le seul risque qu'il faut ôter est celui d'une dégradation de
> l'existant par des actions dont les pleines conséquences n'auraient pas été
> prises en compte. Pour le reste il a quartier libre.

**Le contexte** — La première version de cette gouvernance découpait le dépôt en
zones verte, orange et rouge, avec une liste d'interdits. Le modèle était
calibré sur un prestataire extérieur inconnu. Il ne correspondait pas à la
réalité : Laurent a dirigé cette société et la connaît mieux que quiconque.

**Ce qu'elle change** — Il n'y a plus de zone interdite. `01-PERIMETRE.md`
devient `01-RAYON-ACTION.md` : une carte des dépendances, pas une clôture. Le
contrôle `garde-perimetre`, qui bloquait des fichiers, devient
`garde-consequences`, qui affiche ce qui dépend de ce qui est touché et exige
que la PR le déclare. Il ne juge pas la réponse : il s'assure que la question a
été posée.

**Ce qui reste fermé** — Quatre choses, dont aucune ne tient à la confiance :
un secret dans un dépôt public (irréversible) ; les prix affichés (conformité
distributeur Orbitvu) ; le copywriting français client-facing (la voix de
Sébastien) ; la suppression d'une URL portant des backlinks.

---

## D12 · 2026-09-16 · Laurent merge ses propres pull requests

**Décidé par** : Sébastien
**Statut** : en vigueur, dans les termes révisés par D13

**La décision** — Le Claude de Laurent merge ses propres pull requests dès lors
que le contrôle d'intégration est vert et le Preview contrôlé. Seul ce qui
engage l'entreprise vis-à-vis d'un tiers passe par Sébastien.

**Le contexte** — `main` était figé depuis douze jours, le correctif de la cause
structurelle n°1 attendant en branche. Le filet humain était devenu le goulot.
Il est remplacé par des filets techniques : carte des dépendances rappelée par
le CI, porte d'intégration, journal obligatoire.

**Ce qu'elle interdit** — Pousser directement sur `main` : un push sur `main`
est un déploiement en production. Merger avec un contrôle d'intégration rouge.

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
sans entrée au journal.

**Ce qu'elle ouvre** — Le canal est symétrique. Le Claude de Sébastien y pose
aussi ses questions : Laurent a dirigé cette société et sait des choses sur
l'historique du site qui ne sont écrites nulle part.

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
