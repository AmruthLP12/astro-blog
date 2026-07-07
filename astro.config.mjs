// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
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

  site: "https://technodrishti.vercel.app",
  integrations: [sitemap()],
});
