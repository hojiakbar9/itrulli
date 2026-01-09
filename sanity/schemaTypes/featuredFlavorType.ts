import {defineField, defineType} from 'sanity'

export const featuredFlavorType = defineType({
  name: 'featuredFlavor',
  title: 'Featured Flavor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        defineField({
          name: 'de',
          title: 'German',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'it',
          title: 'Italian',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({
          name: 'de',
          title: 'German',
          type: 'text',
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
        }),
        defineField({
          name: 'it',
          title: 'Italian',
          type: 'text',
        }),
      ]
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'color',
      title: 'Card Color',
      type: 'string',
      description: 'Select a color for the card background accents.',
      options: {
        list: [
          { title: 'Pistachio Green', value: 'bg-[#93C572]' },
          { title: 'Chocolate Brown', value: 'bg-[#3B2F2F]' },
          { title: 'Lemon Yellow', value: 'bg-[#F4E04D]' },
          { title: 'Strawberry Red', value: 'bg-[#D23C3C]' },
          { title: 'Stracciatella (Stone)', value: 'bg-[#E7E5E4]' },
          { title: 'Vanilla Cream', value: 'bg-[#FDFBF7]' },
          { title: 'Amarena Cherry', value: 'bg-[#7B1D3A]' },
          { title: 'Mango Orange', value: 'bg-[#FFC300]' },
        ],
      },
    }),
  ],
})
