import { defineField, defineType } from "sanity";

export const iceLabType = defineType({
  name: "iceLab",
  title: "Ice Lab Video Page",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "object",
      fields: [
        defineField({ name: "de", title: "German", type: "string" }),
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "it", title: "Italian", type: "string" }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        defineField({ name: "de", title: "German", type: "text" }),
        defineField({ name: "en", title: "English", type: "text" }),
        defineField({ name: "it", title: "Italian", type: "text" }),
      ],
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      description: "Upload your ice cream making video",
    }),
    defineField({
      name: "videoThumbnail",
      title: "Video Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ctaText",
      title: "Call-to-Action Text",
      type: "object",
      fields: [
        defineField({ name: "de", title: "German", type: "string" }),
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "it", title: "Italian", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaLink",
      title: "Call-to-Action Link",
      type: "string",
      description: "Link for the CTA button (e.g., /menu or /contact)",
    }),
  ],
});
