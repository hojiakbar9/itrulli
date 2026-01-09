import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Banner',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'text'}),
        defineField({name: 'en', title: 'English', type: 'text'}),
        defineField({name: 'it', title: 'Italian', type: 'text'}),
      ]
    }),
    defineField({
      name: 'cta_menu',
      title: 'CTA Menu',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
      name: 'cta_locations',
      title: 'CTA Locations',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
        name: 'badge_title',
        title: 'Badge Title',
        type: 'object',
        fields: [
            defineField({name: 'de', title: 'German', type: 'string'}),
            defineField({name: 'en', title: 'English', type: 'string'}),
            defineField({name: 'it', title: 'Italian', type: 'string'}),
        ]
    }),
    defineField({
        name: 'badge_flavor',
        title: 'Badge Flavor',
        type: 'object',
        fields: [
            defineField({name: 'de', title: 'German', type: 'string'}),
            defineField({name: 'en', title: 'English', type: 'string'}),
            defineField({name: 'it', title: 'Italian', type: 'string'}),
        ]
    }),
    defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
    }),
  ],
})
