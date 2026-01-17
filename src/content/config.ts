import { defineCollection, z } from "astro:content";

const parseDate = z.union([z.string(), z.date()]).transform((value) => {
  if (value instanceof Date) return value;
  return new Date(value.replace(" ", "T") + ":00+05:30");
});

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string().optional(),
      Purpose: z.string().optional(),
      pubDate: parseDate,
      updatedDate: parseDate.optional(),

      // ✅ OPTIONAL hero image
      heroImageDark: image().optional(),
      heroImageLight: image().optional(),

      // Category (single)
      category: z.enum([
        // Core development
        "web",
        "backend",
        "ui",
        "database",
        "devops",
        "deploy",
        "testing",

        // Platforms / Systems
        "lms",
        "cms",
        "erp",
        "platform",

        // Tools & frameworks
        "astro",
        "tools",
        "dev",

        // Learning & productivity
        "learning",
        "productivity",

        // Personal / misc
        "personal",
        "misc",
        "other",
      ]).optional(),


      // Tags (multiple)
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  blog,
};
