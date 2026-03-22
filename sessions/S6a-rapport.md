# Rapport Session S6a : Academy + Formations + A propos

## Statut : TERMINE
- **Build** : OK (164 pages, 0 erreur)
- **Pages modifiees** : 4/4

---

## 1. Academy Hub (`app/[lang]/academy/page.tsx`)

| # | Section | Layout AVANT | Layout APRES |
|---|---------|-------------|--------------|
| 1 | Hero | HeroSection split | Inchange |
| 2 | Qualiopi | Grid 2 cols, fond emerald-50 | **Ruban sombre** : bg-future-dusk-900, 3 stats geants 7xl (Qualiopi / 100% / 25+), badges benefits en verre |
| 3 | Formations | Grid 2 cols centree | **Split 4/8** : heading sticky gauche + TextReveal, 2 cartes ScrollReveal + SpringCard droite |
| 4 | Tools | Grid 2 cols, fond blanc | **Fond sombre** : gradient + dot pattern, 2 cartes blanches flottantes shadow-2xl dans SpringCard |
| 5 | FAQ | Accordeon centre max-w-4xl | **FAQ split** : heading sticky gauche, accordeon droite, ChevronDown rotate-180 |
| 6 | CTA Final | Centre gradient | **CTA asymetrique** : grille 5 cols, 3/5 emerald dominant + 2/5 glassmorphism |

**Imports ajoutes** : TextReveal, ScrollReveal, SpringCard, ChevronDown (ChevronRight retire)

---

## 2. Formations Packshot (`app/[lang]/academy/formations-packshot/page.tsx`)

| # | Section | Layout AVANT | Layout APRES |
|---|---------|-------------|--------------|
| 1 | Hero | HeroSection split, badges | Inchange |
| 2 | Benefits | Grid 3 cols egal | **Bento grid** : hero card grande gauche (Productivite x10), 2 compactes droite |
| 3 | Catalogue | Grid 3 cols StaggerContainer | 3 cols + **ScrollReveal + SpringCard** par carte + ghost numbers 01/02/03 |
| 4 | Qualiopi/OPCO | Grid 2 cols egal | **Split 4/8** : heading sticky gauche "Financement", cartes SpringCard droite |
| 5 | CTA | Centre gradient very-peri | **CTA asymetrique** : 3/5 calendrier (gradient very-peri) + 2/5 contact (glassmorphism) |

**Imports ajoutes** : TextReveal, ScrollReveal, SpringCard

---

## 3. Formations IA (`app/[lang]/academy/formations-ia/page.tsx`)

| # | Section | Layout AVANT | Layout APRES |
|---|---------|-------------|--------------|
| 1 | Hero | HeroSection split, gradient custom | Inchange |
| 2 | Benefits | Grid 3 cols egal | **Bento grid** : hero card gauche (Creativite augmentee), 2 compactes droite |
| 3 | Catalogue | Grid 3 cols StaggerContainer | 3 cols + **ScrollReveal + SpringCard** + ghost numbers |
| 4 | What you'll learn | Grid 2x2 amber | **Timeline editoriale** : numeros geants 9xl, icones amber, separateurs border-b |
| 5 | Qualiopi/OPCO | Grid 2 cols egal | **Split 4/8** : heading sticky gauche, cartes SpringCard droite |
| 6 | CTA | Centre gradient amber | **CTA asymetrique** : 3/5 amber dominant + 2/5 glassmorphism |

**Imports ajoutes** : TextReveal, ScrollReveal, SpringCard

---

## 4. A propos (`app/[lang]/a-propos/page.tsx`)

| # | Section | Layout AVANT | Layout APRES |
|---|---------|-------------|--------------|
| 1 | Hero | HeroSection simple | Inchange |
| 2 | Mission | Centre, gradient very-peri-50 | **Split 4/8** : TextReveal heading sticky gauche, carte gradient droite |
| 3 | Values | Grid 3 cols egal | **Bento grid** : hero card Innovation gauche, 2 compactes droite (Performance + Excellence) |
| 4 | Timeline | Alternating left/right | **Ameliore** : ScrollReveal par item, years 3xl, fond alterne blanc/neutral-50 |
| 5 | Stats | Grid 4 cols, texte 4xl-5xl | **Ruban stats** : gradient lateral, chiffres 7xl, dividers white/10 |
| 6 | CTA | Centre gradient very-peri | **CTA asymetrique** : 3/5 very-peri dominant + 2/5 glassmorphism |

**Imports ajoutes** : TextReveal, ScrollReveal, SpringCard
**Aucun contenu invente** : uniquement des changements de layout.

---

## Composants motion utilises

| Composant | Utilisation |
|-----------|------------|
| TextReveal | Headings principaux de chaque section split |
| ScrollReveal | Items de timeline, cartes individuelles, ruban stats |
| SpringCard | Toutes les cartes interactives (bento, CTA, catalogues) |
| FadeInView | Conserve la ou deja present |
| StaggerContainer + StaggerItem | Conserve pour ruban stats, retire la ou remplace par ScrollReveal |

## Alternance fond clair/sombre (par page)

- **Academy Hub** : sombre (Qualiopi) > clair (formations) > sombre (tools) > clair (FAQ) > sombre (CTA)
- **Formations Packshot** : clair (benefits) > neutre (catalogue) > neutre (financement) > sombre (CTA)
- **Formations IA** : clair (benefits) > neutre (catalogue) > clair (timeline) > neutre (financement) > sombre (CTA)
- **A propos** : clair (mission) > neutre (values) > clair (timeline) > sombre (stats) > sombre (CTA)
