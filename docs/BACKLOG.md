# Backlog & status

What's live, what's next, and the ideas we want to prioritize. The *why* and the rules (vision, requirements, decisions, editorial policy) are in [product_vision.md](../product_vision.md); this file tracks the work. Finished items are summarized at the bottom; full details are in git history.

## Status (2026-10-05)

- **Live:** <https://namesofukraine.pages.dev> (soft launch since 2026-10-05). Deploys from `main` via GitHub Actions ([PUBLISHING.md](PUBLISHING.md)).
- **Content:** 86 profiles, all reviewed and published in Ukrainian and English. 3 Defenders (Tsybukh, Ruf, Kryvtsov) have no portrait yet (initials placeholder; see L15).
- **Phase:** Phase 1 (MVP) is met for the soft launch. Public launch = real domain (L3) + promotion (L11, L13).
- **People backlog:** [CANDIDATES.md](CANDIDATES.md).
- **Owner priority (2026-09-29):** site idea, layout, and features first; text refined later.

## Now: priorities

In order. Pick from the top.

| # | Item | Why now | Who |
|---|---|---|---|
| 1 | **Confirm measurement:** Web Analytics shows page views; set up the UptimeRobot check (L10) | Every later choice (next batch, what to post, "most read") depends on traffic data | Owner |
| 2 | **Social handle + posting routine** (L11, L13) | The main audience (14–25) finds content on Instagram/Telegram, not search; share cards, fun facts and misconceptions are ready-made posts | Owner, then code for `SOCIAL_LINKS` |
| 3 | **Cross-profile links** (I17, steps A + B) | 79 one-way `related:` links; readers notice, and internal links help SEO | Code |
| 4 | **Content balance** (L14) | 5 of 86 living (6%, target ≥ 10%); Lithuanian-Polish era 2, Imperial 1; women not countable (no field) | Code (add a field + count), then content |
| 5 | **Home page that stays short** (I18, option A) | First screen for visitors arriving from social posts; grows with every batch | Code |

## Launch checklist: open items

IDs (L…) are referenced from other docs and code comments; keep them stable.

- [ ] **L3. Real domain `namesofukraine.org`** (chosen 2026-10-04). Soft launch first; before promoting widely: register at Cloudflare Registrar (~$10–12/yr), add it under the Pages project's Custom domains, set `site` in `astro.config.mjs`, redeploy, then follow the domain section of [post-launch.md](post-launch.md). Also pick the social handle (`@znaisvoikh` or `@namesofukraine`). *Owner.*
- [ ] **L7. Search engines.** Code done (sitemap, `robots.txt`, JSON-LD). Open: Google Search Console + Bing Webmaster Tools and sitemap submission, **after L3** (don't submit the `pages.dev` address). *Owner.*
- [ ] **L10. Monitoring.** Cloudflare Web Analytics enabled 2026-10-04 (confirm data arrives). Open: UptimeRobot on `/uk/`. Routines in [post-launch.md](post-launch.md). Custom events ("read to the end") would need GoatCounter or Plausible; postponed until there are real readers. *Owner.*
- [ ] **L11. Social, contact and support links** (I1, I2). *Owner creates the accounts.*
- [ ] **L13. Telegram/Instagram posts per batch** (decision D13-E).
- [ ] **L14. Balance targets** (product_vision.md §7.2): ≥ 25% women, every era, ≥ 10% living, diaspora included. Recount after each batch.
- [ ] **L15. Missing portraits.** All copyrighted images are out of the repo. Tsybukh, Ruf and Kryvtsov are published with initials: no free photo exists (the ArmyInform CC BY 4.0 copies are reposts of third-party photos). Open: ask Suspilne or the families for written permission. Symonenko's photo (since 2026-10-05, owner decision) is only on uk.wikipedia, tagged PD-Ukraine with no date; that tag needs publication before 1956, and it isn't PD in the US: find the first publication, or fall back to the 2015 Ukrposhta stamp (PD, Commons). Lower risk, worth confirming: Kotliarevskyi's painting (date and artist unknown; a Tropinin portrait is a safe alternative); Hryntsevych and Ratushnyi use government-site photos that may be family or unit photos. *Owner.*

## Ideas backlog

Not scheduled. IDs (I…) keep the numbers they had in the vision doc's old feature backlog.

### Sharing and community
- **I1. Social and contact links** in the footer and on About; one `SOCIAL_LINKS` block in `src/site.ts` so links appear only once set. Maybe "share this person" buttons on profiles.
- **I2. Support link (Patreon)** on About. Compatible with "no monetization, no ads" if it states openly what donations pay for. Configure in `src/site.ts`.

### Content and reading
- **I17. Cross-profile links.** 78 profiles have `related:`, but 79 links are one-way; about 160 unlinked mentions of profiled people (many false matches: «Шевченко» can be Taras or Andriy).
  - **A. Crawl and curate:** add the missing `related:` entries, both directions, unless the connection is trivial.
  - **B. Test:** fail on one-way links (unless marked intentional) and list unlinked mentions, using `src/content/aliases.json` (name forms per slug, including declined forms).
  - **C. Later:** link the first mention of each profiled person in the story text at build time (remark plugin, same alias file, never inside quotes).
- **I12. Life-path card** (timeline + key places + pull-quote). A prototype on Шевченко worked, then was removed pending refinement. `places[]` and `quotes[]` exist in the schema but are empty everywhere. Open: keeping a timeline in sync with the prose; real map vs a list of OpenStreetMap links; whether every profile needs all three.

### Home page
- **I18. Home page that stays short as the catalogue grows.** Goal: one or two screens on desktop, easy to scan on a phone.

  | Option | Home page shows | Pros | Cons |
  |---|---|---|---|
  | **A. Category tiles + tag cloud** *(recommended)* | Hero, Daily Hero, search; tiles for the 9 groups (name, count, 2–3 portraits); tag cloud by count; era ribbon; one "newly added" row | Fixed height; two ways to browse; reuses group pages and filters | Fewer faces up front; needs `?tag=` |
  | B. One shelf with group tabs | One card row with tabs | Faces up front; short | Hides most groups; tabs fiddly on phones |
  | C. Collapsed sections | Today's sections, collapsed | Smallest change | Still a long list of headings |

  Keep the no-JS fallback. Measure page height at 1280 px and 390 px, and Lighthouse, before and after.

### Insights
- **I16. Views per person / "most read".**
  - **(a) Private, available now:** Cloudflare Web Analytics → Top paths; add the `/uk/` and `/en/` rows per person.
  - **(b) Public "Most read this month" row:** recommended option is a nightly GitHub Action that reads the Web Analytics GraphQL API, writes `src/content/popular.json` and rebuilds (no server code; one read-only token). Alternatives: a Pages Function + D1/KV counter (first server code, wider security surface) or GoatCounter/Plausible. Build only at a few hundred profile views a week, so it doesn't spotlight random early clicks.

### Safety
- **I11. Periodic security review** (e.g. an OWASP ZAP baseline against the live site). Security headers, CSP, `dist/` check, `npm audit` and Dependabot are already in place ([SECURITY.md](SECURITY.md)). If content ever comes from outside (CMS, community), sanitize Markdown/HTML and keep human review.

### Phase 3 (product_vision.md §6)
Interactive map (D15) · personality quiz · timeline view · printable teacher pages · headless CMS for non-technical editors.

## Done (summary)

| Date | What |
|---|---|
| 2026-09-29 | Schema v2; home page v1 (era ribbon, filter bar, group sections, "newly added", Нове badge); profile page v1; `/new/` + RSS; English version; portraits with one treatment; Daily Hero; share cards; About page; read marks; era images; "popular misconception" card; header and home tweaks (I3–I9, I13) |
| 2026-10-03 | Security headers and CI checks (L6); SEO code (L7); Lighthouse budget in CI (L8); 404 page (L9); Playwright smoke tests (L12); license files (L5); batch 2–3 fact-check |
| 2026-10-04 | All 86 profiles reviewed in both languages (L1); copyrighted portraits replaced or removed (L15, mostly); feedback form on Tally (L4); Web Analytics enabled |
| 2026-10-05 | Migrated to GitHub and deployed (L2); secret scanning and Dependabot alerts on; stale `*.workers.dev` Worker deleted; real-phone mobile pass (I14) |
