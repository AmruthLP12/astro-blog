// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

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
  site: "http://localhost:4321",
});