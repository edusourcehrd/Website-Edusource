import {defineField, defineType} from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Course URL Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'courseImage',
      title: 'Course Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Example: 6 Months, 1 Year, 90 Days',
    }),
    defineField({
      name: 'mode',
      title: 'Learning Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Online', value: 'Online'},
          {title: 'Offline', value: 'Offline'},
          {title: 'Hybrid', value: 'Hybrid'},
        ],
      },
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility',
      type: 'string',
      description: 'Example: Plus Two / Degree / SSLC',
    }),
    defineField({
      name: 'features',
      title: 'Course Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Example: Practical training, Expert mentors, Government approved certificate',
    }),
    defineField({
      name: 'syllabus',
      title: 'Syllabus / Topics Covered',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'contactNumber',
      title: 'Course Contact Number',
      type: 'string',
      description: 'Example: +91 96334 92021',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first',
      initialValue: 1,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
  ],
})