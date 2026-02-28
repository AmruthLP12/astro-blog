import { getCollection } from "astro:content";

// src/pages/feed.json.ts
export const GET = async () => {
  const posts = await getCollection("blog");

  return new Response(JSON.stringify(posts), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
