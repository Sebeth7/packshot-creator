import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'headers',
      title: 'Headers',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(2).max(5).error('Table doit avoir 2 à 5 colonnes')
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          title: 'Row',
          fields: [
            {
              name: 'label',
              title: 'Label (première colonne)',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'values',
              title: 'Values (colonnes suivantes)',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(1).max(5)
            }
          ],
          preview: {
            select: {
              label: 'label',
              values: 'values'
            },
            prepare(selection) {
              const { label, values } = selection;
              return {
                title: label,
                subtitle: values?.join(' | ') || ''
              };
            }
          }
        })
      ],
      validation: Rule => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      headers: 'headers',
      rows: 'rows'
    },
    prepare(selection) {
      const { headers, rows } = selection;
      return {
        title: 'Comparison Table',
        subtitle: `${headers?.length || 0} columns × ${rows?.length || 0} rows`
      };
    }
  }
});
