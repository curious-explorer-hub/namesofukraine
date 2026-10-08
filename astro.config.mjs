// @ts-check
import { renameSync, rmdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cloudflare Pages serves the nearest `404.html` for unknown URLs, but Astro builds `/uk/404/` as
// `uk/404/index.html`. Move each language's error page to `uk/404.html` / `en/404.html`.
/** @type {import('astro').AstroIntegration} */
const languageNotFoundPages = {
  name: 'language-404-pages',
  hooks: {
    'astro:build:done': ({ dir }) => {
      for (const lang of ['uk', 'en']) {
        const folder = fileURLToPath(new URL(`${lang}/404/`, dir));
        renameSync(`${folder}index.html`, fileURLToPath(new URL(`${lang}/404.html`, dir)));
        rmdirSync(folder);
      }
    },
  },
};

// The draft review pages (`/uk/admin/drafts/`, `/en/admin/drafts/`) are for `npm run dev` only. A static
// build can't answer 404 for a page, so remove them from the output.
/** @type {import('astro').AstroIntegration} */
const devOnlyPages = {
  name: 'dev-only-pages',
  hooks: {
    'astro:build:done': ({ dir }) => {
      for (const lang of ['uk', 'en']) rmSync(fileURLToPath(new URL(`${lang}/admin/`, dir)), { recursive: true, force: true });
    },
  },
};

export default defineConfig({
  integrations: [
    languageNotFoundPages,
    devOnlyPages,
    // Lists every built page (production builds hold only reviewed profiles) with uk/en alternates.
    // Left out: the error pages, the dev-only admin pages and the bare root, which only redirects to /uk/.
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/\/404\/?$/.test(path) && !/^\/(uk|en)\/admin\//.test(path) && path !== '/';
      },
      i18n: { defaultLocale: 'uk', locales: { uk: 'uk-UA', en: 'en-US' } },
    }),
  ],
  // Inline the (small, ~5 KB compressed) stylesheet: removes the render-blocking request that held back
  // the first paint on mobile (Lighthouse, AC10). Allowed by style-src 'unsafe-inline' in public/_headers.
  build: { inlineStylesheets: 'always' },
  // Fetch a page when the pointer rests on or focuses its link, so the click opens it at once.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    build: {
      // Never inline scripts, so the Content-Security-Policy in public/_headers can allow only
      // same-origin script files (script-src 'self') without per-page hashes. Other assets: default.
      assetsInlineLimit: (file) => (file.endsWith('.js') ? false : undefined),
    },
  },
  // Soft launch on Cloudflare's free address (2026-10-04); switch to https://namesofukraine.com when it's
  // registered (docs/BACKLOG.md, L3). Drives canonical, hreflang, sitemap, robots.txt, JSON-LD and share-card URLs.
  site: 'https://namesofukraine.pages.dev',
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    // Both languages are prefixed (/uk/, /en/); the bare root redirects to Ukrainian.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false }, // root redirect: src/pages/index.astro + public/_redirects
  },
});
