# Post-launch checklist

The site is live on `https://namesofukraine.com` (since 2026-10-08; the soft-launch address `namesofukraine.pages.dev` redirects there). Setup steps already done (domain, Web Analytics, uptime monitor) are in [product_vision.md](../product_vision.md) §10. Each step below is free and takes minutes; remove it here once it's done.

## Launch day

- [ ] **Smoke check the live site.** Open `/` (should redirect to `/uk/`), a profile in each language, a field filter such as `/uk/?group=science`, and a made-up URL such as `/uk/people/test/` (should show the friendly 404 page). Use the language switch once.
- [ ] **Security headers are live.** In the browser's developer tools, open Network → the page request → Response headers, and check for `Content-Security-Policy` and `Strict-Transport-Security`. Or run the site through <https://securityheaders.com>; it should score A or better. The console must show no CSP errors.

## On the real domain

- [ ] **Google Search Console** (L7). Add a *Domain* property, verify it with the DNS TXT record (Cloudflare DNS → Add record), then **Sitemaps → submit `sitemap-index.xml`**. Use **URL inspection** on the home page and one profile, and press *Request indexing*.
- [ ] **Bing Webmaster Tools.** Sign in at <https://www.bing.com/webmasters> and import the site from Search Console. This also covers DuckDuckGo and Yahoo.
- [ ] **Share previews.** Paste a profile URL into a Telegram chat and into <https://www.opengraph.xyz>, and check that the share card shows the portrait, name, and role.

## First week

- [ ] **Read the numbers.** Cloudflare Web Analytics: visits, top pages (who gets read), referrers (where people come from), countries (Ukrainian vs international audience). Treat the figures as a lower bound: ad blockers hide some visitors.
- [ ] **Search Console coverage.** Pages should move from "Discovered" to "Indexed" over a few days to a few weeks. Fix anything under "Not indexed" that should be indexed.
- [ ] **Core Web Vitals.** Cloudflare shows real-user load times; they should agree with the Lighthouse budget in CI (performance ≥ 90 on mobile).

## Every month (about 15 minutes)

- [ ] **Traffic trend and top pages** (Cloudflare). Which people are read most; which referrers grow. Use this to pick who goes into the next batch and what to post on social media.
- [ ] **Search queries** (Search Console → Performance). Which searches show the site, where it ranks, and which pages get impressions but few clicks (those may need a better title or summary).
- [ ] **Dependency updates.** Merge or review Dependabot PRs; CI fails on any new, unreviewed advisory (`scripts/check-audit.mjs`).
- [ ] **Suggestions and corrections** from the feedback form (product_vision.md §3.6): answer removal or correction requests about living people promptly (§7.6).

## Later, if the basic numbers aren't enough

Cloudflare Web Analytics can't count custom events, such as how many readers reach the end of a story or use the filters. If that becomes worth knowing, add a cookie-free event tool. **GoatCounter** is free for non-commercial sites; **Plausible** is about $9 a month. The site already detects when a story has been read (`src/scripts/read-marks.ts`), so the signal exists. Adding a tool takes about an hour: the script, a CSP update in `public/_headers`, a note on the About page, and a decision recorded in product_vision.md.
