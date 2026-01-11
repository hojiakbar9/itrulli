import {defineType, defineField} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
        name: 'quote',
        type: 'text',
    }),
    defineField({
        name: 'rating',
        type: 'number',
        validation: Rule => Rule.min(1).max(5),
    }),
    defineField({
      name: 'language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'German', value: 'de'},
          {title: 'Italian', value: 'it'},
        ],
      },
    }),
  ],
})
