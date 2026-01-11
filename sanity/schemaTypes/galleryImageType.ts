import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const galleryImageType = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Recommended for responsive images
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text (for SEO and screen readers)',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'it', title: 'Italian', type: 'string', validation: (Rule) => Rule.required()}),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gelato', value: 'gelato' },
          { title: 'Ambiente', value: 'ambiente' },
          { title: 'Handwerk', value: 'handwerk' },
        ],
        layout: 'radio',
      },
      initialValue: 'gelato',
    }),
  ],
  preview: {
    select: {
      title: 'alt.en',
      media: 'image',
      category: 'category',
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        media,
      }
    }
  }
})
