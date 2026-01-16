// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

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
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },

  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },

  site: "https://tecnodrishti.vercel.app",
  integrations: [sitemap()],
});
