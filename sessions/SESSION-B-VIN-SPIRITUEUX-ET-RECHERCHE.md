# Session B — Industrie Vin & Spiritueux + Etude de requetes Solutions

## Contexte

Tu travailles sur le site PackshotCreator — distributeur exclusif
Orbitvu (systemes photo automatises) pour la France et la Suisse.

- Framework : Next.js App Router, next-intl (FR/EN), Tailwind CSS v4, Framer Motion
- URL : https://sysnext.vercel.app/fr
- Dossier : /Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator

## PARTIE 1 — Industrie Vin & Spiritueux (1h)

### Ce que tu dois faire

Creer la page `/industrie/vin-spiritueux` en ajoutant les donnees dans le
systeme existant. Le template est deja pret (refonte faite en session precedente).

### Fichiers a modifier

1. **`data/secteurs.ts`** — Ajouter le secteur complet :
   - slug: 'vin-spiritueux'
   - hero, problematiques, solutions (type hardware + ia), useCases, cta, faq
   - Le contenu doit etre specifique au vin/spiritueux (bouteilles, etiquettes,
     reflets verre, mise en scene cave/bar, etc.)
   - La machine Alphashot XL Wine v2 est deja taggee 'wine' dans le code

2. **`components/shared/SectorGrid.tsx`** — Ajouter le secteur dans DEFAULT_SECTORS
   avec une icone appropriee (Wine de lucide-react est deja importee sur le hub)

3. **`data/sector-machine-map.ts`** — Ajouter le mapping :
   'vin-spiritueux': ['alphashot-xl-wine-v2', ...autres machines pertinentes]

### Contenu a produire

Le document de reference est :
`/Users/photodif/Documents/SYSNEXT/MARKETING/Etude de marché industrie défense.pdf`
Il mentionne le vin (page 7, agroalimentaire). Mais l'essentiel du contenu
est a creer en s'inspirant des autres secteurs.

Points cles du secteur vin :
- Problematiques : reflets sur verre, etiquettes (lisibilite, couleurs fideles),
  formes variees (bordelaise, bourguignonne, champagne), capsules metalliques
- Solutions hardware : Alphashot XL Wine v2 (concu specifiquement pour bouteilles)
- Solutions IA : BlendAI pour mises en scene cave, bar, table
- useCases possibles : documentation cave/domaine, catalogues importateur,
  e-commerce CHR (Cafes Hotels Restaurants)
- FAQ : questions sur les reflets verre, eclairage etiquettes, volumes saison

### Regles
- Ne PAS inventer de chiffres ou statistiques sans validation
- Demander a l'utilisateur pour tout contenu incertain
- S'inspirer du niveau de detail des secteurs existants

---

## PARTIE 2 — Etude de requetes pour landing pages Solutions (2h)

### Contexte

On envisage de creer des landing pages verticales organisees par BESOIN
(pas par secteur) pour capter des requetes SEO que personne ne couvre :
- Controle qualite visuel industriel
- Documentation MRO (Maintenance, Reparation, Revision)
- Catalogage de pieces detachees
- Formation technique 3D/AR

Avant de creer ces pages, il faut valider que les requetes existent et
identifier les termes exacts a cibler.

### Ce que tu dois faire

1. **Recherche de requetes** — Utiliser les outils de recherche web pour
   identifier les termes cherches en France autour de :
   - "controle qualite visuel" / "inspection visuelle automatisee" / "QC photo"
   - "documentation MRO" / "maintenance photo" / "documentation visuelle maintenance"
   - "catalogage pieces detachees" / "catalogue photo pieces" / "photo pieces SAV"
   - "formation technique 3D" / "manuels interactifs 360" / "formation AR maintenance"
   - Et les variantes anglaises pour la version EN

2. **Analyse de la concurrence** — Pour chaque famille de requetes :
   - Qui se positionne actuellement ?
   - Y a-t-il du contenu de qualite ou c'est un desert ?
   - Quelle est l'intention de recherche (informationnelle, transactionnelle) ?

3. **Livrable** — Produire un document structuré :
   ```
   /sessions/RESEARCH-LANDING-PAGES-SOLUTIONS.md

   Pour chaque page proposee :
   - URL recommandee
   - Requete principale ciblee
   - Requetes secondaires (longue traine)
   - Volume estime (si trouvable)
   - Concurrence actuelle
   - Intention utilisateur
   - Angle de contenu recommande
   - Pages internes a mailler (industrie, produits)
   ```

4. **Recommandation finale** — Valider/invalider/reformuler les 4 pages proposees.
   Peut-etre que certaines n'ont pas de volume, ou qu'il en faut d'autres.

### Skills a activer
- `/seo` ou `/geo` pour l'analyse de requetes
- Recherche web pour les volumes et la concurrence

### Regles
- Ne PAS creer de pages dans cette session — juste la recherche
- Presenter les resultats a l'utilisateur pour validation avant la session suivante
