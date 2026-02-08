# SESSION S5B-bis : Enrichissement Fiches Machines `/fr/studio-photo/[slug]`

## CONTEXTE

Tu es sur le projet PackshotCreator (Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl fr/en).

### Document maître
Lis d'abord : `/Users/photodif/Documents/SYSNEXT/SITE WEB/DOCS FINAUX/Phase 4 de plan action/livrables/SESSION_PILOTE_MASTER_REFERENCE.md`

### Memory
Lis : `/Users/photodif/.claude/projects/-Users-photodif-Documents-SYSNEXT-SITE-WEB-packshot-creator/memory/MEMORY.md`

### Rapport session précédente
Lis : `livrables/S5B-rapport-intermediaire.md`

---

## OBJECTIF

Enrichir les 16 fiches machines (`app/[lang]/studio-photo/[slug]/page.tsx`) en s'inspirant des fiches produit Orbitvu (ex: `https://orbitvu.com/products/alphashot-pro-g2/`).

Les fiches sont générées dynamiquement à partir des données dans `components/calculators/ROICalculator/lib/machines.ts` (16 machines). Le fichier page.tsx fait 503 lignes.

---

## MÉTHODOLOGIE

1. **Ouvrir dans le navigateur** une fiche machine existante (ex: `http://localhost:3333/fr/studio-photo/alphashot-pro-g2`) ET la fiche Orbitvu correspondante (`https://orbitvu.com/products/alphashot-pro-g2/`)
2. **Comparer** les deux pages, section par section
3. **Proposer** au PO les enrichissements sous forme de tableau (#A, #B, #C...)
4. **Attendre validation** du PO avant d'implémenter
5. **Implémenter** uniquement les sections validées

---

## STRUCTURE ACTUELLE DE LA FICHE MACHINE

Le fichier `app/[lang]/studio-photo/[slug]/page.tsx` (503 lignes) contient :

| Section | Description |
|---------|-------------|
| Hero | Gradient dark, nom machine, badges (Orbitvu, IA Ready), quick specs (taille, poids, capacité, espace), 2 CTA (devis, démo), image machine |
| Features | Badges des features (packshot, 360, vidéo, ghost, flat-lay, lifestyle) |
| Advantages | Grille verte des points forts (keyAdvantages) |
| Limitations | Grille ambre des limites (limitations) |
| Volume recommandé | Barre bleue (volumeRange min-max) |
| Section IA | Si iaReady: bloc avec lien vers /ia-photo-produit |
| Section Formation | Bloc avec niveau de formation recommandé + lien academy |
| CTA final | Bande gradient avec 2 CTA |
| SchemaOrg | Product schema + breadcrumb + organization |

### Données disponibles par machine (type Machine dans `components/calculators/ROICalculator/lib/types.ts`) :
- `id`, `nom`, `prix`, `tailleMax`, `poidsMax`
- `capaciteJour`, `spaceRequired`, `automationLevel`
- `features[]` (packshot, 360, video, ghost-mannequin, flat-lay, lifestyle)
- `useCases[]` (textes libres)
- `keyAdvantages[]` (BilingualText[])
- `limitations[]` (BilingualText[])
- `volumeRange` {min, max}
- `sectors[]` (jewelry, fashion, footwear, etc.)
- `tailleCategories[]`

### Images machines disponibles :
Map dans `getMachineImage()` (lignes 13-33 du fichier). Les images sont dans `/images/machines/*.avif` — ce sont des SVG line-art, pas des photos.

---

## ENRICHISSEMENTS PROBABLES (à valider avec le PO)

En comparant avec Orbitvu, voici les sections qui manquent potentiellement :

### A - Galerie de résultats
Orbitvu montre des exemples de photos prises avec chaque machine (packshots réels, vues 360, vidéos). Nos fiches n'ont aucun exemple visuel des résultats.
→ **Proposition** : Section "Exemples de résultats" avec grille d'images placeholder par type de contenu (packshot, 360, vidéo selon les features de la machine).

### B - Spécifications techniques détaillées
Orbitvu a un tableau de spécifications complet (dimensions exactes, poids machine, connectique, logiciel inclus, etc.). Nos fiches n'ont que 4 quick specs.
→ **Proposition** : Section "Spécifications techniques" avec tableau détaillé. Les données existent déjà partiellement dans `machines.ts`.

### C - Comparaison avec machines similaires
Orbitvu propose des liens "See also" vers les machines de la même gamme.
→ **Proposition** : Section "Machines similaires" avec 2-3 cartes de machines du même segment (même taille ou mêmes features). Utiliser les données existantes pour filtrer.

### D - FAQ spécifique à la machine
Nos fiches n'ont pas de FAQ. Chaque machine a des questions spécifiques (ex: "L'Alphashot Pro G2 peut-il photographier des bijoux ?").
→ **Proposition** : 3-4 questions FAQ générées à partir des données machine + FAQ schema.org.

### E - Témoignage / Use case client
Orbitvu montre des case studies par machine.
→ **Proposition** : Bloc "Cas d'usage" avec les secteurs de la machine illustrés (lien vers les pages /industrie/[slug]).

### F - Vidéo de démonstration
Orbitvu intègre des vidéos YouTube sur les fiches produit.
→ **Proposition** : Placeholder vidéo avec lien YouTube (le PO fournira les URLs plus tard).

---

## PATTERNS CRITIQUES À RESPECTER

```tsx
// Link : TOUJOURS depuis @/i18n/routing
import { Link } from '@/i18n/routing';

// Pages : self-contained, PAS de Header/Footer
// [lang] param : Promise<{ lang: string }>

// Animations : whileInView, PAS useInView
// useReducedMotion() → fallback plain <div>
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/animations';

// SchemaOrg : default export
import SchemaOrg, { organizationSchema } from '@/components/seo/SchemaOrg';

// Boutons sur fond sombre
className="bg-transparent border border-white/40"

// Couleurs brandbook
// Hero: bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800
// Sections: py-20, max-w-7xl mx-auto px-4 sm:px-6
// Cards: rounded-2xl border border-neutral-100 bg-white
// Primary button: bg-very-peri-500 hover:bg-very-peri-600
// Text: text-future-dusk-900 (headings), text-future-dusk-600 (body)

// PAS d'emojis - Lucide icons uniquement
// PAS de brand-red → very-peri partout
```

## i18n
Les fiches machines N'UTILISENT PAS next-intl (pas de `getTranslations`). Elles utilisent un pattern `isFr` avec des textes inline et les données bilingues de `machines.ts` (`BilingualText`). Garder ce pattern.

## DONNÉES MACHINES
Fichier source : `components/calculators/ROICalculator/lib/machines.ts`
Types : `components/calculators/ROICalculator/lib/types.ts`

## BUILD
Toujours vérifier avec `npx next build` après les modifications.

## ANTI-COMPACT
- Modèle : Opus 4.6
- Sauvegarder l'état dans un fichier avant 80K tokens
- Pas d'agents récursifs
- Écrire les fichiers AVANT d'analyser

---

## LIVRABLE ATTENDU

1. Proposer les enrichissements au PO (tableau #A-#F)
2. Implémenter les sections validées
3. Mettre à jour `livrables/S5B-rapport-intermediaire.md` avec les modifications
4. Build clean
