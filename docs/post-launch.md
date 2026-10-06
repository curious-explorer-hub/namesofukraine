# Post-launch checklist

Do these once the site is live on Cloudflare Pages (done 2026-10-05, [product_vision.md](../product_vision.md) §10) and, where noted, on its real domain (L3). During the soft launch the site runs on `https://namesofukraine.pages.dev`; use that address for the launch-day steps and skip the domain section until `namesofukraine.org` is registered. Each step is free and takes minutes. Tick them here as they're done.

## Launch day

- [ ] **Smoke check the live site.** Open `/` (should redirect to `/uk/`), a profile in each language, a category page, and a made-up URL such as `/uk/people/test/` (should show the friendly 404 page). Use the language switch once.
- [ ] **Security headers are live.** In the browser's developer tools, open Network → the page request → Response headers, and check for `Content-Security-Policy` and `Strict-Transport-Security`. Or run the site through <https://securityheaders.com>; it should score A or better. The console must show no CSP errors.
- [ ] **Cloudflare Web Analytics** (L10, decision D11). In the Cloudflare dashboard open **Workers & Pages → your Pages project → Metrics → Web Analytics → Enable**, then deploy again. Cloudflare adds the measurement script itself; the site's CSP already allows it (`static.cloudflareinsights.com`, `cloudflareinsights.com`). Within an hour, visit the site yourself and confirm a page view appears. The script uses no cookies, so no consent banner is needed.
- [ ] **Uptime monitor.** Create a free monitor at <https://uptimerobot.com>: HTTP(s), URL `https://namesofukraine.pages.dev/uk/` (change it to the `.org` later), every 5 minutes, alert by email.

## Once the real domain is set (L3)

- [ ] **Register `namesofukraine.org`** at Cloudflare Registrar and add it under the Pages project's **Custom domains** (Cloudflare creates the DNS record and certificate). Add `www.namesofukraine.org` too, redirecting to the bare domain.
- [ ] **Redirect the soft-launch address.** Make `namesofukraine.pages.dev` send visitors to the `.org` (a Cloudflare Bulk Redirect, or a `_redirects` rule), so early links keep working.
- [ ] **`site` points to the domain** in `astro.config.mjs` (`https://namesofukraine.org`), and the site is redeployed. Check that `https://namesofukraine.org/robots.txt` lists `https://namesofukraine.org/sitemap-index.xml` and that a page's `<link rel="canonical">` uses the domain.
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
