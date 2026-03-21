import { defineCollection, z, reference } from "astro:content";
import { glob } from "astro/loaders";

const parseDate = z.union([z.string(), z.date()]).transform((value) => {
  if (value instanceof Date) return value;
  return new Date(value.replace(" ", "T") + ":00+05:30");
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/authors" }),
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
      linkedin: z.string().url().optional(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: reference("authors"),
      Purpose: z.string().optional(),
      pubDate: parseDate,
      updatedDate: parseDate.optional(),

      heroImageDark: image().optional(),
      heroImageLight: image().optional(),

      category: z
        .enum([
          "web",
          "backend",
          "ui",
          "database",
          "devops",
          "deploy",
          "testing",
          "lms",
          "cms",
          "erp",
          "platform",
          "astro",
          "tools",
          "dev",
          "learning",
          "productivity",
          "personal",
          "misc",
          "other",
        ])
        .optional(),

      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  blog,
  authors,
};
