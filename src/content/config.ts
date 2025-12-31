import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),

      // ✅ OPTIONAL hero image
      heroImageDark: image().optional(),
      heroImageLight: image().optional(),

      // Category (single)
      category: z.enum(["astro", "web", "ui", "backend", "personal"]),

      // Tags (multiple)
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  blog,
};
