// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://e-d.github.io',
  base: '/learn_gsd/',
  integrations: [mdx(), preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
