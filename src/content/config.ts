import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z
        .string()
        .transform((value) => {
          // Convert "YYYY-MM-DD HH:mm" IST → Date
          return new Date(value.replace(" ", "T") + ":00+05:30");
        }),

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
