import {defineField, defineType} from 'sanity'

export const menuCategoryType = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'it', title: 'Italian', type: 'string', validation: (Rule) => Rule.required()}),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'A number to sort the categories on the menu (e.g., 1, 2, 3).',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
