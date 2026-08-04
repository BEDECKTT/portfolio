// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  markdown: {
    shikiConfig: {
      // Dark-mode-compatible theme for syntax highlighting
      theme: 'one-dark-pro',
    },
  },
});