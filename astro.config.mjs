import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://www.weibaichao.com',
  integrations: [
    expressiveCode({
      themes: ['github-light'],
      styleOverrides: {
        borderRadius: '0.5rem',
      },
    }),
    sitemap(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
