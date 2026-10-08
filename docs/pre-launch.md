# Pre-launch review

Findings from an audit of the live soft-launch site (`https://namesofukraine.pages.dev`) and a production build, done 2026-10-08 before the public launch (BACKLOG L3, L11). Covers page weight and load time, caching, security, SEO, accessibility and the text of the static pages. Tick items here as they're done; move anything left open into [BACKLOG.md](BACKLOG.md) once launch work is finished.

## Summary

The site is already fast and safe: Lighthouse scores 92–100 for performance and 100 for accessibility, best practices and SEO on every page tested; no console or CSP errors; strong security headers. The home page is the one heavy page, static files are never cached, and two static pages say things that aren't accurate.

A first visit can't load in a few milliseconds: connecting to the server (DNS, TLS, first byte) alone takes about 150–275 ms. Realistic targets: about 0.5 s on a first visit on a computer (met now), under 2.5 s for the main content on a slow 4G phone in Lighthouse (home page misses it), and near-instant repeat visits and clicks between pages (needs P0-1 and P1-6).

## Measurements (2026-10-08)

Lighthouse 12.8 on the live site, mobile preset (simulated slow 4G and a slow CPU) unless noted. "Real" timings: Chromium, a new connection each run, median of 3, from the US west coast.

| Page | Perf (mobile) | First paint / main content (Lighthouse) | Real desktop, first visit (main content) | Compressed HTML |
|---|---|---|---|---|
| Home `/uk/` | **92** | 1.7 s / **3.2 s** | 500 ms | **98 KB** (575 KB raw) |
| Home `/uk/`, desktop preset | 100 | 0.5 s / 0.8 s | | |
| Home `/en/` | 99 | 1.3 s / 2.1 s | 500 ms | 87 KB (478 KB raw) |
| Profile `/uk/people/roksolana/` | 99 | 1.1 s / 2.2 s | 512 ms | 19 KB |
| Group `/uk/groups/defenders/` | 100 | 1.0 s / 1.7 s | 372 ms | 20 KB |
| New `/uk/new/` | 97 | 1.2 s / 2.5 s | 400 ms | 46 KB |
| About, Support, Credits | 100 | 1.0 s / 1.5–1.7 s | | 11 KB |
| Feedback | 100 | 1.0 s / 1.5 s | | 11 KB, but **1.7 MB and 64 requests** in total (the Tally form) |

What the 575 KB of home-page HTML holds: 146 full cards with summaries and filter `data-` attributes (~240 KB), map SVGs (~76 KB, in a tab hidden by default), daily-hero data as inline JSON (41 KB), inline CSS (39 KB). All JavaScript on the site together is about 20 KB.

## P0: before launch

- [x] **1. Cache static files.** Everything is served with `cache-control: public, max-age=0, must-revalidate`, including `/_astro/*`, whose file names are content-hashed. Every visit re-checks every image, font and script. Add long-lived caching for `/_astro/*` and `/fonts/*` (rename a font file whenever it changes, since its name isn't hashed), and a day for `/og/*`, in `public/_headers`. *Done 2026-10-08; after the deploy, check with `curl -sI https://namesofukraine.pages.dev/fonts/FixelText-Regular.woff2 | grep -i cache-control`.*
- [x] **2. The draft review page leaks into production.** `/uk/admin/drafts/` and `/en/admin/drafts/` are built, listed in `sitemap-0.xml`, and answer **200** with the "not found" page in them (a soft 404). The dev-only gate (`return new Response(null, { status: 404 })`) doesn't apply to a static build. Don't build these pages in production. *Done 2026-10-08: removed from the build output and the sitemap (`astro.config.mjs`); `npm run dev` still shows them.*
- [ ] **3. Credits page says something untrue** (uk and en). It says every image comes from Wikimedia Commons and is public domain or freely licensed. In fact 23 published profiles use fair-use images (`fair_use: true`), 56 have AI edits (`ai_edit`), and some photos come from government sites (УІНП, CC BY 4.0). Each profile labels its own image correctly; the page-level wording must match. BACKLOG L15 also still says "6 fair use". *Text drafted 2026-10-08 in both languages; awaiting the owner's review.*
- [ ] **4. Privacy section is incomplete** (About → Privacy, uk and en). It mentions only the "read" marks. Add: Cloudflare Web Analytics (no cookies, no personal data); the feedback form is run by Tally, what it collects and how to ask for deletion. The Support page promises "no tracking", so this section has to back that up. *Text drafted 2026-10-08 in both languages; awaiting the owner's review.*
- [ ] **5. The soft-launch address becomes a duplicate site** once `namesofukraine.com` is live (L3). Redirect `*.pages.dev` with a Cloudflare Bulk Redirect (301), or at least send `X-Robots-Tag: noindex` there (`https://namesofukraine.pages.dev/*` block in `_headers`). Then change `site` in `astro.config.mjs`: today every canonical, hreflang, sitemap entry and share card points to `pages.dev`. Don't add the noindex before the domain works, or the current site drops out of search. Steps are also in [post-launch.md](post-launch.md).

## P1: a lighter home page

Target: under 50 KB compressed HTML and main content under 2.5 s in Lighthouse mobile.

- [x] **6. Prefetch links** with Astro's built-in prefetch (`prefetch: true` in `astro.config.mjs`) so clicks between pages feel instant. No new dependency; it ships as a script file, so the CSP allows it. *Done 2026-10-08 (on hover or focus; 2.5 KB script).*
- [x] **7. Card portrait `sizes`** (`src/components/PersonCard.astro`). Lighthouse flags 152 KB of waste on the home page: cards show at about 300 CSS px on a phone and phones get the 624–640 px file. *Checked 2026-10-08: no change needed. Lighthouse compares with CSS pixels; at 2–3 device pixels per CSS pixel, the 640 px file is the right one, and `80vw` is close to the real card width (`min(80%, 20rem)`).*
- [x] **8. Main image lazy-loaded on Group and New pages.** The first card's portrait is the largest thing on screen but has `loading="lazy"`. Load the first card's portrait eagerly with `fetchpriority="high"`. *Done 2026-10-08; the profile portrait now also gets `fetchpriority="high"` (Lighthouse's LCP-discovery hint on profiles).*
- [x] **9. Smaller map.** 76 KB of SVG sits in a hidden tab. *Done 2026-10-08 (owner chose option A: keep the map in the page for AC4, smaller shapes): outlines written as relative steps at the same 0.1-unit precision, points that round onto the previous one dropped; pixel-identical to before at full view and zoomed in. Saved 2.4 KB compressed, less than the ~5 KB estimated: compression already handled the repeated digits well. Loading the map only when its tab opens (about 14 KB more) would need a no-JS map page to keep AC4.*
- [ ] **10. Move the daily-hero data out of the HTML.** 41 KB of inline JSON could be a hashed `.json` file fetched after load (and cached, with P0-1).
- [x] **11. Cards out of the home page** (BACKLOG I18). At 146 cards this is due now rather than "past ~200". *Done 2026-10-08: the result cards are a separate file (`/uk/home-cards/`, `/en/home-cards/`, built from the same `PersonCard`) fetched after load; filters, the map, the insight card and read marks start once it arrives. Without JavaScript nothing changes (the cards were never shown; AC4).*
- [ ] **12. Feedback page:** load the Tally iframe when the reader clicks a button, so the 1.7 MB isn't loaded on every visit.

## P2: polish and launch hygiene

- [x] **13. Skip link.** No "skip to content" link (WCAG 2.4.1). *Done 2026-10-08: «Перейти до змісту» / "Skip to content", shown on Tab, moves focus to `main`.*
- [x] **14. Language switch label.** It shows "EN" but is labelled "Читати англійською" (and on English pages shows "УКР" but is labelled "Читати українською"), failing Lighthouse's label-content-name-mismatch (WCAG 2.5.3) on every page. Start the label with the visible text. *Done 2026-10-08: the link reads "EN - читати англійською" (visible text plus hidden text, no `aria-label`).*
- [x] **15. Meta descriptions.** Profiles use the 300-character summary (Google cuts at about 160); `en/about` (40 characters) and `en/new` (33) are too short. *Done 2026-10-08: search descriptions are cut to 100–160 characters (whole sentences when they say enough, else at a word with "…", `src/lib/meta.ts`); share cards keep the full summary. About and New got longer descriptions in both languages (text awaits the owner's review).*
- [x] **16. Sitemap `lastmod`**, from `last_reviewed` or `published`. *Done 2026-10-08: profiles (both languages) get the later of `last_reviewed` and `published`; other pages have none.*
- [x] **17. `/.well-known/security.txt`**, pointing to the contact in [SECURITY.md](SECURITY.md). *Done 2026-10-08: `public/.well-known/security.txt` points to GitHub's private vulnerability reporting (on, repository public); expires 2027-10-08, renewal added to MAINTENANCE.md (Yearly).*
- [x] **18. `theme-color` meta tag and a web manifest** (for "add to home screen" on phones). *Done 2026-10-08: `theme-color` per theme and `public/site.webmanifest` (name, start page, the SVG and 180 px icons).*
- [ ] **19. About page: who runs the site, a contact, and the corrections and sourcing policy** for readers (product_vision.md §7 has it, but it isn't public). *Partly done 2026-10-08: a «Як ми перевіряємо факти» / "How we check facts" section (sources, neutral tone, approval, how to report a mistake) drafted in both languages from §7, awaiting the owner's review. Open: who runs the site, which only the owner can write.*
- [x] **20. Analytics preconnect.** Lighthouse suggests a preconnect to `cloudflareinsights.com` (about 240 ms); the beacon loads after the page, so this matters little. *Checked 2026-10-08: no change. Cloudflare adds the beacon after the page loads; an early connection to a third party on every page would compete with the main image on slow phones.*

## Content to settle before promotion

From [BACKLOG.md](BACKLOG.md); listed here so launch work sees them in one place.

- [ ] **Map:** check Crimea's outline and the borders by eye (I20).
- [ ] **Portraits:** AI portraits marked "to redo", doubtful licence tags, fair-use images (L15).
- [ ] **Accounts:** Instagram, Threads and Monobank links in `src/site.ts` are still empty (L11).

## Already meets the bar

- **Security headers:** strict CSP (same-origin scripts only, `frame-ancestors 'none'`), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP. HTTP redirects to HTTPS (301). Unknown URLs return a real 404 with `no-store`.
- **Delivery:** Brotli-compressed HTML, self-hosted fonts with preload and `font-display: swap`, the hero image preloaded per screen size, a small inlined stylesheet, about 20 KB of JavaScript in total.
- **SEO:** canonical and hreflang (uk, en, x-default), JSON-LD (`WebSite`, `Person`, `BreadcrumbList`), RSS, `robots.txt`, sitemap, share cards for every page, exactly one `h1` and a `main` on each page, alt text on every image.
- **No errors:** no console errors or CSP violations on the pages tested.
