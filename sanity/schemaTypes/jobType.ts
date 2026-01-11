import {defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons'

export const jobType = defineType({
  name: 'job',
  title: 'Job Opening',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'object',
      fields: [
        defineField({name: 'de', title: 'German', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required()}),
        defineField({name: 'it', title: 'Italian', type: 'string', validation: (Rule) => Rule.required()}),
      ]
    }),
    defineField({
      name: 'jobType',
      title: 'Job Type (e.g., Vollzeit / Teilzeit)',
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
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'A number to sort the job listings (e.g., 1, 2, 3).',
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
      title: 'title.en',
      subtitle: 'jobType.en',
    },
  },
})
