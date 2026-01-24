import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'ℹ️ Info', value: 'info' },
          { title: '⚠️ Warning', value: 'warning' },
          { title: '✅ Success', value: 'success' },
          { title: '🔴 Alert', value: 'alert' }
        ],
        layout: 'radio'
      },
      initialValue: 'info',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
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
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type'
    },
    prepare(selection) {
      const { title, type } = selection;
      const icons = {
        info: 'ℹ️',
        warning: '⚠️',
        success: '✅',
        alert: '🔴'
      };
      return {
        title: title || 'Callout',
        subtitle: `${icons[type as keyof typeof icons]} ${type}`
      };
    }
  }
});
