import { defineCollection, z, reference } from "astro:content";

const parseDate = z.union([z.string(), z.date()]).transform((value) => {
  if (value instanceof Date) return value;
  return new Date(value.replace(" ", "T") + ":00+05:30");
});

const authors = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string().optional(),
      bio: z.string(),
      avatar: image().optional(),
      website: z.string().url().optional(),
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      portfolio: z.string().url().optional(),
    }),
});

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: reference("authors"),
      Purpose: z.string().optional(),
      pubDate: parseDate,
      updatedDate: parseDate.optional(),

      // ✅ OPTIONAL hero image
      heroImageDark: image().optional(),
      heroImageLight: image().optional(),

      // Category (single)
      category: z
        .enum([
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
        ])
        .optional(),

      // Tags (multiple)
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  blog,
  authors,
};
