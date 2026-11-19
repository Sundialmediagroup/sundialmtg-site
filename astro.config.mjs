// @ts-check
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  // Canonical origin, used for the sitemap and canonical URLs.
  site: process.env.SITE_URL ?? "https://sundialmg.com",
  output: "static",
  // `/about/index.html`: S3 website hosting serves it at `/about/`.
  build: { format: "directory" },
  // Internal links end in "/" so S3 serves them without a redirect.
  trailingSlash: "always",
  integrations: [react(), sitemap({ filter: (page) => !page.includes("/styleguide") })],
  vite: {
    css: {
      preprocessorOptions: {
        // Lets every .module.scss do `@use "abstracts" as *;`
        scss: { loadPaths: [fileURLToPath(new URL("./src/styles", import.meta.url))] },
      },
    },
  },
});
