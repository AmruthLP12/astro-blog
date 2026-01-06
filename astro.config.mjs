// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": "src",
      },
    },

    plugins: [tailwindcss()],
  },

  output: "static",

  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },

<<<<<<< HEAD
  site: "https://tecnodrishti.vercel.app",
  integrations: [sitemap(), mdx()],
});
=======
  site: "https://technodrishti.vercel.app",
  integrations: [sitemap()],
});
>>>>>>> 47cddbb (fix: correct spelling of "Tecno" to "Techno" and update site URL in multiple files)
