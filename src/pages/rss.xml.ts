import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("Site is not defined. Check your Astro config.");
  
  const posts = await getCollection("blog");

  return rss({
    title: "Astro Blog",
    description: "Writing about Astro, web dev, and things I learn",
    site, // now guaranteed to be defined
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category],
      customData: post.data.tags ? `<tags>${post.data.tags.map(t => `<tag>${t}</tag>`).join('')}</tags>` : undefined,
      author: "Amruth",
    })),
  });
};

