import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("Site is not defined. Check your Astro config.");

  const posts = await getCollection("blog");

  const items = await Promise.all(
    posts.map(async (post) => {
      const authorEntry = await getEntry(post.data.author);

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}/`,

        // ✅ FIX 1 — categories must be string[]
        categories: post.data.category ? [post.data.category] : undefined,

        // ✅ Tags as custom XML (optional)
        customData: post.data.tags?.length
          ? `<tags>${post.data.tags
              .map((t) => `<tag>${t}</tag>`)
              .join("")}</tags>`
          : undefined,

        // ✅ FIX 2 — resolve author reference properly
        author: authorEntry?.data.name,
      };
    }),
  );

  return rss({
    title: "Astro Blog",
    description: "Writing about Astro, web dev, and things I learn",
    site,
    items,
  });
};
