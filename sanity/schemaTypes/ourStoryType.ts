import {defineField, defineType} from 'sanity'

export const ourStoryType = defineType({
  name: 'ourStory',
  title: 'Our Story Page',
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
      name: 'p1',
      title: 'Paragraph 1',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'text'}),
        defineField({name: 'en', title: 'English', type: 'text'}),
        defineField({name: 'it', title: 'Italian', type: 'text'}),
      ]
    }),
    defineField({
      name: 'p2',
      title: 'Paragraph 2',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'text'}),
        defineField({name: 'en', title: 'English', type: 'text'}),
        defineField({name: 'it', title: 'Italian', type: 'text'}),
      ]
    }),
    defineField({
      name: 'stat_1_value',
      title: 'Stat 1 Value',
      type: 'string',
    }),
    defineField({
      name: 'stat_1_label',
      title: 'Stat 1 Label',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
      name: 'stat_2_value',
      title: 'Stat 2 Value',
      type: 'string',
    }),
    defineField({
      name: 'stat_2_label',
      title: 'Stat 2 Label',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
      name: 'stat_3_value',
      title: 'Stat 3 Value',
      type: 'string',
    }),
    defineField({
      name: 'stat_3_label',
      title: 'Stat 3 Label',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string'}),
        defineField({name: 'en', title: 'English', type: 'string'}),
        defineField({name: 'it', title: 'Italian', type: 'string'}),
      ]
    }),
    defineField({
        name: 'mainImage',
        title: 'Main Image (Portrait)',
        type: 'image',
        options: { hotspot: true },
    }),
    defineField({
        name: 'secondaryImage',
        title: 'Secondary Image (Landscape)',
        type: 'image',
        options: { hotspot: true },
    }),
  ],
})
