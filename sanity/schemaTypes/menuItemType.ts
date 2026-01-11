import {defineField, defineType} from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      description: 'Optional: e.g., ingredients like "Vanilleeis, frische Erdbeeren, Erdbeersoße, Sahne"',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'price_large',
        title: 'Price (Large)',
        type: 'number',
        description: 'Optional: Fill this in if there is a "Groß" price variant.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'menuCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isAlcoholic',
      title: 'Contains Alcohol',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'A number to sort the items within a category (e.g., 1, 2, 3).',
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name.de',
      subtitle: 'category.title.de',
      price: 'price'
    },
    prepare({ title, subtitle, price }) {
      return {
        title,
        subtitle: `${subtitle} | €${price}`
      }
    }
  }
})
