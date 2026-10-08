# Pre-launch change log

Changes made for [pre-launch.md](pre-launch.md), newest last, with the effect measured or expected. "Measured" numbers come from a local production build (`npm run build`; HTML sizes raw and Brotli-compressed at quality 11, as Cloudflare serves them) or from Lighthouse on the live site after deploy; "expected" numbers are estimates until a deploy confirms them.

Starting point (live site, 2026-10-08): home `/uk/` 575 KB raw / 98 KB over the network, Lighthouse mobile 92, main content (LCP) 3.2 s; static files cached for 0 s.

| Date | Item | Change | Files | Effect |
|---|---|---|---|---|
| 2026-10-08 | P0-1 | Long-lived browser caching: `/_astro/*` and `/fonts/*` for a year (`immutable`), `/og/*` for a day | `public/_headers` | **Expected:** a repeat visit to the home page re-checks 1 file (the HTML) instead of ~29; images, fonts and scripts load from the browser's cache with no network wait. To confirm after deploy with `curl -sI`. |
| 2026-10-08 | P0-2 | Draft review pages (`/uk/admin/drafts/`, `/en/admin/drafts/`) left out of the production build and the sitemap | `astro.config.mjs` | **Measured:** 2 soft-404 pages and 2 sitemap entries gone (sitemap 308 → 306 URLs). |
| 2026-10-08 | P1-6 | Astro prefetch on hover or focus for every link | `astro.config.mjs` | **Expected:** on a computer, the next page is usually loaded before the click (pointer rests ~100–300 ms first), so it opens almost at once. Costs one 2.5 KB script. |
| 2026-10-08 | P1-8 | First card's portrait on Group and New pages loads eagerly with `fetchpriority="high"`; profile portraits also get `fetchpriority="high"` | `PersonCard.astro`, `Portrait.astro`, `GroupView.astro`, `NewView.astro` | **Expected:** main content on Group and New pages earlier on mobile (Lighthouse flagged the lazy main image; New was 2.5 s). To confirm with Lighthouse after deploy. |
| 2026-10-08 | P0-3, P0-4 | Credits text corrected (fair use, AI edits, other open sources); Privacy section covers Cloudflare Web Analytics and the Tally form | `src/content/pages/{uk,en}/{credits,about}.md` | Accuracy, not speed. Text awaits the owner's review. |
| 2026-10-08 | P1-7 | Card `sizes` checked | — | No change: on 2–3× phone screens the 640 px file is the right one; the Lighthouse warning compares against CSS pixels. |
