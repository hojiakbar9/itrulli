import { defineArrayMember, defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "info_title",
      title: "Direct Line Title",
      type: "object",
      fields: [
        defineField({ name: "de", title: "German", type: "string" }),
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "it", title: "Italian", type: "string" }),
      ],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "faq",
      title: "Frequently Asked Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "object",
              fields: [
                defineField({ name: "de", title: "German", type: "string" }),
                defineField({ name: "en", title: "English", type: "string" }),
                defineField({ name: "it", title: "Italian", type: "string" }),
              ],
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "object",
              fields: [
                defineField({ name: "de", title: "German", type: "text" }),
                defineField({ name: "en", title: "English", type: "text" }),
                defineField({ name: "it", title: "Italian", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "info_title.en",
    },
    prepare({ title }) {
      return {
        title: title || "Contact Page Content",
      };
    },
  },
});
