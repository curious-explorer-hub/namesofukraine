// @ts-check
import { readdirSync, readFileSync, renameSync, rmdirSync, rmSync } from 'node:fs';
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

// Sitemap <lastmod> for profile pages (both languages): the later of `last_reviewed` and `published` in
// the uk file's frontmatter.
const peopleDir = new URL('./src/content/people/uk/', import.meta.url);
const profileDates = new Map(
  readdirSync(peopleDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const frontmatter = readFileSync(new URL(f, peopleDir), 'utf8').split(/\n---/)[0];
      const dates = [...frontmatter.matchAll(/^(?:last_reviewed|published): *(\S+)/gm)].map((m) => new Date(m[1]).getTime());
      return [f.slice(0, -3), new Date(Math.max(...dates)).toISOString()];
    }),
);

export default defineConfig({
  integrations: [
    languageNotFoundPages,
    devOnlyPages,
    // Lists every built page (production builds hold only reviewed profiles) with uk/en alternates.
    // Left out: the error pages, the dev-only admin pages, the home page's card list (a fragment, not a
    // page) and the bare root, which only redirects to /uk/.
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/\/404\/?$/.test(path) && !/^\/(uk|en)\/(admin|home-cards)\//.test(path) && path !== '/';
      },
      i18n: { defaultLocale: 'uk', locales: { uk: 'uk-UA', en: 'en-US' } },
      serialize: (item) => {
        const slug = new URL(item.url).pathname.match(/^\/(?:uk|en)\/people\/([^/]+)\/$/)?.[1];
        return slug && profileDates.has(slug) ? { ...item, lastmod: profileDates.get(slug) } : item;
      },
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
  // Drives canonical, hreflang, sitemap, robots.txt, JSON-LD and share-card URLs.
  site: 'https://namesofukraine.com',
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    // Both languages are prefixed (/uk/, /en/); the bare root redirects to Ukrainian.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false }, // root redirect: src/pages/index.astro + public/_redirects
  },
});
