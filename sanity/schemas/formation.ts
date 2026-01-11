import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'formation',
  type: 'document',
  title: 'Formation',
  fields: [
    defineField({
      name: 'titre',
      type: 'string',
      title: 'Titre',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug URL',
      options: {
        source: 'titre',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categorie',
      type: 'string',
      title: 'Catégorie',
      options: {
        list: [
          { title: 'Packshot', value: 'packshot' },
          { title: 'IA Photo Produit', value: 'ia' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'niveau',
      type: 'number',
      title: 'Niveau',
      options: {
        list: [
          { title: 'Niveau 1 - Fondation', value: 1 },
          { title: 'Niveau 2 - Maîtrise', value: 2 },
          { title: 'Niveau 3 - Expert', value: 3 },
        ],
      },
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'format',
      type: 'string',
      title: 'Format disponible',
      options: {
        list: [
          { title: 'Blended Learning', value: 'blended' },
          { title: 'Présentiel', value: 'presentiel' },
          { title: 'Les deux', value: 'both' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prix_blended',
      type: 'number',
      title: 'Prix Blended (€ HT)',
      description: 'Laisser vide si non disponible',
    }),
    defineField({
      name: 'prix_presentiel',
      type: 'number',
      title: 'Prix Présentiel (€ HT)',
      validation: (Rule) => Rule.required().min(100),
    }),
    defineField({
      name: 'duree_heures',
      type: 'number',
      title: 'Durée (heures)',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'description_courte',
      type: 'text',
      title: 'Description courte',
      description: '1-2 phrases résumé (150 caractères max)',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'programme',
      type: 'array',
      title: 'Programme détaillé',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'objectifs',
      type: 'array',
      title: 'Objectifs pédagogiques',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'public_cible',
      type: 'string',
      title: 'Public cible',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'prerequis',
      type: 'text',
      title: 'Prérequis',
      description: 'Optionnel - laisser vide si aucun prérequis',
    }),
    defineField({
      name: 'eligible_opco',
      type: 'boolean',
      title: 'Éligible OPCO',
      initialValue: true,
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      title: 'Vignette formation',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        },
      ],
    }),
    defineField({
      name: 'livrables',
      type: 'array',
      title: 'Livrables garantis',
      of: [{ type: 'string' }],
    }),
  ],
});
