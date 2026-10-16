import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import tailwind from '@astrojs/tailwind';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? 'missing-project-id';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION ?? '2026-03-01';

export default defineConfig({
  integrations: [
    tailwind(),
    sanity({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    }),
  ],
  site: process.env.PUBLIC_SITE_URL ?? 'https://glickages.pages.dev',
});
