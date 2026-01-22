# PackshotCreator Migration Guidelines

## Design System Reference

**PRIMARY DESIGN REFERENCE**: `design_system_final.md`

## Brandbook 2025 - Migration Notes

### Couleurs Principales
- **Primary Orbitvu**: `#6667AB` (Very Peri) - Remplace #EC3655
- **Secondary Orbitvu**: `#4c5578` (Future Dusk) - Remplace #24A1B4

### Palettes Étendues

#### Very Peri Extended Palette (20 shades)
La couleur principale dispose de 15 nuances du blanc au noir pour une flexibilité maximale :
- `--very-peri-0` à `--very-peri-10` (incluant demi-tons)
- BASE: `--very-peri-5` (#6667AB)
- Disponibles via classes Tailwind : `very-peri-{0|50|100|150|200|300|400|500|600|700|800|850|900|950|1000}`

#### Future Dusk Extended Palette (20 shades)
La couleur secondaire dispose également de 15 nuances :
- `--future-dusk-0` à `--future-dusk-10` (incluant demi-tons)
- BASE: `--future-dusk-5` (#4c5578)
- Disponibles via classes Tailwind : `future-dusk-{0|50|100|150|200|300|400|500|600|700|800|850|900|950|1000}`

#### Couleurs d'Accent (11 colors)
Palette de couleurs pour highlights et variations :
- `--accent-green`: #27eb9f
- `--accent-lime`: #CBE857
- `--accent-light-blue`: #cdcdfd
- `--accent-blue`: #4a4aff
- `--accent-orange`: #ff7809
- `--accent-yellow`: #ffde05
- `--accent-coral`: #ff6f61
- `--accent-pink`: #ee68b2
- `--accent-cyan`: #62bbd3
- `--accent-gray-light`: #A0ABB6
- `--accent-gray-medium`: #A9AAAD

### Couleurs par Section
Pour identifier visuellement les différentes sections du site :
- **Création**: Orange `#ff7809` (`--primary-creation`)
- **Formation**: Bleu clair `#cdcdfd` (`--primary-formation`)
- **Blog**: Lime `#CBE857` (`--primary-blog`)

### Typographie
- **Primary font (Headings)**: Inter - Remplace Cairo
  - Variable CSS : `--font-inter`
  - Poids utilisés : 700
  - Line-height recommandé : 1.4 à 1.6 × font-size
- **Secondary font (Body)**: Roboto (maintenu)
  - Variable CSS : `--font-roboto`
  - Poids utilisés : 400, 500

### Couleurs Legacy (maintenues pour compatibilité)
- **Text Dark** (Body): #0D171A
- **Heading Dark**: #001D26
- **Neutral Medium**: #546E7A
- **BG Light Gray**: #F8FAFB
- **BG Off-White**: #FBFBFB
- **Accent Gold**: #FFB300
- **Accent Success**: #00C853
- **Accent Alert**: #FF6F00

## Migration Rules

### RÈGLE CRITIQUE : Copie Intégrale des Pages

**Toutes les pages doivent être copiées intégralement depuis Webflow, incluant :**

1. **Tous les éléments visuels**
   - Header et navigation
   - Footer avec toutes ses sections
   - Sections intermédiaires
   - Logos clients
   - Tous les composants visuels

2. **Animations et interactions**
   - Les animations doivent être reproduites en React
   - Utiliser des équivalences React/Framer Motion si nécessaire
   - Les animations peuvent différer légèrement du Webflow original si techniquement nécessaire
   - Maintenir l'esprit et le timing des animations originales

3. **Structure et contenu**
   - Respecter l'ordre exact des sections
   - Conserver tous les textes et images
   - Maintenir la hiérarchie visuelle

### Workflow de Migration

1. **Analyse via Chrome MCP**
   - Screenshot complet de la page Webflow
   - Identification de tous les éléments
   - Documentation des animations et transitions

2. **Comparaison**
   - Vérifier tous les éléments présents
   - Identifier les éléments manquants
   - Noter les animations à reproduire

3. **Implémentation**
   - Créer les composants manquants
   - Implémenter les animations avec Framer Motion ou équivalent
   - Ajouter toutes les traductions (FR, EN, DE, ES, NL)

4. **Validation**
   - Build sans erreurs
   - Vérification visuelle
   - Test des animations
   - Validation SEO (content parity)

### Réutilisabilité des Composants (RÈGLE #7)

- Créer des composants réutilisables pour les patterns communs
- Un composant créé pour FR doit fonctionner pour EN, DE, ES, NL
- Éviter la duplication de code
- Privilégier les props pour la personnalisation

### Stack Technique

- **Framework**: Next.js 14.1.1 (App Router)
- **Styling**: Tailwind CSS v4 (inline @theme in globals.css)
- **i18n**: next-intl 4.6.1
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion (recommandé)

### Références Design

- **Design principal**: design_system_final.md
- **Design complémentaire**: brief_design_system.md
- **Benchmarks**: Orbitvu.com, Stripe.com, Photoroom.com
