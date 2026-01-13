import { defineArrayMember, defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

export const locationsType = defineType({
  name: "locations",
  title: "Location and Hours",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "locations",
      title: "Locations",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "location",
          title: "Location",
          fields: [
            defineField({ name: "city", type: "string" }),
            defineField({ name: "address", type: "string" }),
            defineField({ name: "phone", type: "string" }),
            defineField({
              name: "schedule",
              title: "Weekly Schedule",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "days",
                      title: "Days",
                      type: "object",
                      fields: [
                        defineField({
                          name: "de",
                          title: "German",
                          type: "string",
                        }),
                        defineField({
                          name: "en",
                          title: "English",
                          type: "string",
                        }),
                        defineField({
                          name: "it",
                          title: "Italian",
                          type: "string",
                        }),
                      ],
                    }),
                    defineField({
                      name: "time",
                      title: "Time",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: "imageColor",
              title: "Card Color",
              type: "string",
              description:
                'Background color for the card accent. Use a Tailwind class (e.g., "bg-green-200").',
              options: {
                list: [
                  { title: "Pistachio Green", value: "bg-[#93C572]" },
                  { title: "Strawberry Red", value: "bg-[#D23C3C]" },
                  { title: "Lemon Yellow", value: "bg-[#F4E04D]" },
                  { title: "Chocolate Brown", value: "bg-[#3B2F2F]" },
                ],
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Location and Hours",
      };
    },
  },
});
