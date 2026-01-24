import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // Métadonnées de base
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description (Meta)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(160).warning('Description optimale : 150-160 caractères')
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Sébastien Jourdan'
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'IA & Technologie', value: 'IA & Technologie' },
          { title: 'Hardware & Studios', value: 'Hardware & Studios' },
          { title: 'Formation & Academy', value: 'Formation & Academy' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords (SEO)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(60)
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        }
      ]
    }),

    // Contenu principal (Portable Text)
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        // Blocs de texte standard
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    validation: Rule => Rule.required()
                  }
                ]
              }
            ]
          }
        },

        // Composant Callout
        {
          type: 'callout'
        },

        // Composant ComparisonTable
        {
          type: 'comparisonTable'
        },

        // Bloc de code
        {
          type: 'code',
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' }
            ]
          }
        }
      ]
    }),

    // SEO avancé
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'seoTitle',
          title: 'SEO Title (if different from title)',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'seoDescription',
          title: 'SEO Description (if different from description)',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string'
        },
        {
          name: 'noIndex',
          title: 'No Index (exclude from search engines)',
          type: 'boolean',
          initialValue: false
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'image',
      date: 'date'
    },
    prepare(selection) {
      const { title, author, date } = selection;
      return {
        title: title,
        subtitle: `${author} - ${date}`
      };
    }
  }
});
