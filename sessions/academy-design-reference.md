# Academy Pages — Design Reference

> Ce document capture les decisions design prises sur la page formations-packshot
> pour servir de template aux sessions suivantes sur les autres pages /academy.

## Couleur secondaire : Vert (Emerald)

Les pages Academy utilisent le **vert emerald** comme couleur secondaire (cohérence avec Qualiopi/certification) :
- Labels categorie : `text-emerald-600` (au lieu de `text-primary-orbitvu`)
- Bold selectif : `<strong className="text-emerald-700 font-semibold">` (au lieu de `text-heading-dark`)
- Exception : le label du Catalogue utilise `text-very-peri-500` (couleur brand) pour varier

## Bold selectif — Fonction render

```tsx
const renderBold = (chunks: React.ReactNode) => (
  <strong className="text-emerald-700 font-semibold">{chunks}</strong>
);
```

Usage dans le JSX :
```tsx
{t.rich('section.description', { bold: renderBold })}
```

## Modifications appliquees par section

### Hero
- Bold selectif dans la description (3 segments max)
- Pas de changement de layout

### Benefits (Pourquoi se former)
- Titre : `text-4xl lg:text-6xl` (display)
- Bold selectif dans les descriptions des cartes
- Animations : FadeInView left/right au lieu de ScrollReveal uniforme
- Label existant conserve

### Catalogue (Formations)
- **Label categorie ajoute** : "FORMATIONS" en `text-very-peri-500`
- Titre : `text-4xl lg:text-6xl` (display) + TextReveal
- Heading aligne a gauche avec `max-w-3xl`
- **Fond change en `bg-white`** (pour casser le doublon avec Financement en neutral-50)
- Bold selectif dans les descriptions
- Animations variees : FadeInView avec directions alternees
- Spacing : `py-20 lg:py-32`

### Financement (Qualiopi & OPCO)
- Titre : `text-4xl lg:text-6xl` (display)
- Bold selectif dans description sticky + textes cartes
- Label existant "FINANCEMENT" conserve en `text-emerald-500`
- Fond `bg-neutral-50` conserve (le Catalogue au-dessus est passe en white)
- Animations variees : FadeInView left/right
- Spacing : `py-20 lg:py-32`

### CTA Final
- Titre : `text-4xl lg:text-6xl` (display)
- Spacing : `py-20 lg:py-32`

## Rythme des fonds (formations-packshot)

| Section | Fond |
|---|---|
| Hero | `bg-future-dusk-900` (dark) |
| Benefits | `bg-white` |
| Catalogue | `bg-white` |
| Financement | `bg-neutral-50` |
| CTA Final | `bg-future-dusk-900` (dark) |

Note : Benefits et Catalogue sont tous deux sur fond blanc mais visuellement distincts (Benefits = bento cards avec bordures, Catalogue = cartes pleines avec barres couleur).

## Traductions — Pattern

Les textes avec bold selectif utilisent la syntaxe next-intl `t.rich()` :
```json
"description": "Texte normal avec <bold>mots importants</bold> et suite."
```

Max 2-3 segments `<bold>` par paragraphe. Bold = chiffres cles, resultats, mots d'impact.

## Checklist par page Academy

- [ ] Labels categorie sur chaque section majeure
- [ ] Titres display `text-4xl lg:text-6xl` + TextReveal
- [ ] Bold selectif emerald dans les descriptions
- [ ] Rythme des fonds (pas 2 identiques consecutifs)
- [ ] Animations variees (FadeInView left/right, pas tout ScrollReveal)
- [ ] Spacing `py-20 lg:py-32`
- [ ] Traductions FR + EN synchronisees
