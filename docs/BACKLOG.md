# Backlog & status

What's live, what's next, and the ideas we want to prioritize. The *why* and the rules (vision, requirements, decisions, editorial policy) are in [product_vision.md](../product_vision.md); this file tracks the work. Finished items are summarized at the bottom; full details are in git history.

## Status (2026-10-05)

- **Live:** <https://namesofukraine.pages.dev> (soft launch since 2026-10-05). Deploys from `main` via GitHub Actions ([PUBLISHING.md](PUBLISHING.md)).
- **Content:** 86 profiles, all reviewed and published in Ukrainian and English. 3 have no portrait yet (initials placeholder; see L15): Defenders Ruf and Kryvtsov, and singer Raisa Kyrychenko.
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
- [ ] **L15. Missing portraits.** All copyrighted images are out of the repo. Ruf, Kryvtsov and Kyrychenko are published with initials: no free photo exists for them or for Tsybukh and Petrychenko (checked uk/en Wikipedia and Commons 2026-10-05; the ArmyInform CC BY 4.0 copies are reposts of third-party photos). uk.wikipedia has fair-use photos for Tsybukh, Kryvtsov, Petrychenko and Kyrychenko; on Commons there is only a memorial photo of Tsybukh (her portrait among others on the Maidan) and Kyrychenko's memorial plaque with an engraved portrait: both are derivative works, and Ukraine has no freedom of panorama. Added 2026-10-05 from Commons: Yaremchuk (1984 concert photo, CC0 by the uploader) and Bykov (still from *Tamer of Tigers*). **Bykov's still is tagged PD-Russia-1996**, which covers works whose Russian copyright ended by 1996; for a 1955 Lenfilm film that looks wrong. Low risk, but a safer replacement would be good. Open: ask Suspilne or the families for written permission. **Fair-use portraits** (owner decisions 2026-10-05): Mykolaichuk and Sukhomlynskyi; Tsybukh (uk.wikipedia fair-use file) and Petrychenko (memorial.ua photo). On the site only (not in share cards). On any rights-holder request, remove the file and the `image:` block the same day (the stamp and NBU coin are in git history). Better: ask Dovzhenko Film Studios / the Mykolaichuk museum and the Sukhomlynskyi museum in Pavlysh for written permission. Symonenko's photo (since 2026-10-05, owner decision) is only on uk.wikipedia, tagged PD-Ukraine with no date; that tag needs publication before 1956, and it isn't PD in the US: find the first publication, or fall back to the 2015 Ukrposhta stamp (PD, Commons). Lower risk, worth confirming: Kotliarevskyi's painting (date and artist unknown; a Tropinin portrait is a safe alternative); Hryntsevych and Ratushnyi use government-site photos that may be family or unit photos. *Owner.*

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
- **I19. Era ribbon.** Done (see Done): colour, motion, sliding highlight, faces. A timeline strip of people under the bands was tried and dropped (2026-10-06, owner decision); the birthplace map takes its place.
- **I21. Fill the row above the tabs.** The Daily Hero (max 36rem) and the progress card (max 24rem) leave empty space on the right on wide screens. Options: **(a)** two equal halves (50/50) of the page width; **(b)** a third card with a personal observation drawn from this browser's read marks, e.g. «Здається, вас цікавить література: 6 із 10 прочитаних - звідти» ("You seem to like literature: 6 of your 10 read are from there"), with a link to that field and a suggestion of someone unread from it; before anything is read, a fact about the catalogue instead (e.g. the busiest region or era). (b) stays private like the read marks: computed in the browser, nothing sent anywhere. Needs at least ~3 read profiles before guessing an interest; on phones the third card goes under the other two.
- **I20. Birthplace map: next steps.** Built (see Done). Open: 18 people have no dot: 10 born abroad and 6 in an unknown place (they are in the region list), and 2 born in Ukraine without `lat`/`lon` (Mazepyntsi, Pustoviitivka: add coordinates); places of major work (`places[]`) and a small world inset for the diaspora; a way to zoom into dense areas (Kyiv, Lviv); check the outline of Crimea and the borders by eye before the public launch.
- **I18. Home page that stays short as the catalogue grows.** Option A is in (group tiles, now the Fields tab; see Done). Open: the tag cloud by count, which needs a `?tag=` filter. Every card is still in the home page for the filters (~297 KB HTML at 86 people); past ~200 people, consider filtering from a small JSON index instead.

### Insights
- **I16. Views per person / "most read".**
  - **(a) Private, available now:** Cloudflare Web Analytics → Top paths; add the `/uk/` and `/en/` rows per person.
  - **(b) Public "Most read this month" row:** recommended option is a nightly GitHub Action that reads the Web Analytics GraphQL API, writes `src/content/popular.json` and rebuilds (no server code; one read-only token). Alternatives: a Pages Function + D1/KV counter (first server code, wider security surface) or GoatCounter/Plausible. Build only at a few hundred profile views a week, so it doesn't spotlight random early clicks.

### Safety
- **I11. Periodic security review** (e.g. an OWASP ZAP baseline against the live site). Security headers, CSP, `dist/` check, `npm audit` and Dependabot are already in place ([SECURITY.md](SECURITY.md)). If content ever comes from outside (CMS, community), sanitize Markdown/HTML and keep human review.

### Phase 3 (product_vision.md §6)
Personality quiz · printable teacher pages · headless CMS for non-technical editors.

## Done (summary)

| Date | What |
|---|---|
| 2026-09-29 | Schema v2; home page v1 (era ribbon, filter bar, group sections, "newly added", Нове badge); profile page v1; `/new/` + RSS; English version; portraits with one treatment; Daily Hero; share cards; About page; read marks; era images; "popular misconception" card; header and home tweaks (I3–I9, I13) |
| 2026-10-03 | Security headers and CI checks (L6); SEO code (L7); Lighthouse budget in CI (L8); 404 page (L9); Playwright smoke tests (L12); license files (L5); batch 2–3 fact-check |
| 2026-10-04 | All 86 profiles reviewed in both languages (L1); copyrighted portraits replaced or removed (L15, mostly); feedback form on Tally (L4); Web Analytics enabled |
| 2026-10-05 | Migrated to GitHub and deployed (L2); secret scanning and Dependabot alerts on; stale `*.workers.dev` Worker deleted; real-phone mobile pass (I14) |
| 2026-10-05 | Group colours and motion (card → profile portrait transition, hover light, headline shimmer, stitch band); portraits in full colour (D16) |
| 2026-10-05 | Home page tiles for the 9 groups instead of sections (I18 option A): height 8672 → 3171 px at 1280 px, 8216 → 2972 px at 390 px; site-wide search dialog (header, `/`, Ctrl/⌘+K) on `/<lang>/search.json` |
| 2026-10-05 | Era ribbon (I19): a colour per era, pictures in colour that come alive on hover, counts that tick up and bars that grow on load, other bands step back on hover, a highlight that slides to the selected era; faces of each era's most-linked people; filter results rise in |
| 2026-10-06 | Birthplace map on the home page (I20, D15 changed): SVG of all 27 oblast units from geoBoundaries/OSM, shaded by head count, a dot per birthplace in the group colour (numbered for shared places), tooltips; click an oblast or the region list to filter by region; follows search, field and era |
| 2026-10-06 | Home page "explore" tabs: Search (search + dropdowns), Eras, Map, Fields; one panel at a time, shared filters, a sliding highlight, the new panel slides in and the box eases to its height; the map names every region on hover, also those with no one yet. Then: changing tabs clears the filters (one way of narrowing at a time); eras as larger cards in rows (4 + 3; 2 per row on phones), the highlight slides between rows; faint drawings of each field on its tile (a ball and a dumbbell for sport, an open book for literature); the header search button and dialog removed (the Search tab is the search; "/" jumps to it) |
| 2026-10-06 | Reading progress as a card next to the Daily Hero, above the tabs (seen from every tab): a ring that fills in wheat to cobalt and a percentage that counts up, with a hint (start / N more / "you know them all"); product_vision.md AC1, AC2, AC4 and D12 describe the tabbed home page |
