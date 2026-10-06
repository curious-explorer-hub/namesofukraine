# Backlog

Open and in-progress work only. What the site must do, the rules, and what's already built are in [product_vision.md](../product_vision.md) (built items: §10). When an item is done, add a line to §10 and remove it here.

## Status (2026-10-06)

- **Live:** <https://namesofukraine.pages.dev> (soft launch since 2026-10-05), deployed from `main` by GitHub Actions ([PUBLISHING.md](PUBLISHING.md)).
- **Content:** 86 profiles in Ukrainian and English. 3 without a portrait (initials; L15): Ruf, Kryvtsov, Kyrychenko.
- **Next milestone:** public launch = real domain (L3) + social pages and promotion (L11, L13).
- **People to add:** [CANDIDATES.md](CANDIDATES.md).

## Now: priorities

In order. Pick from the top.

| # | Item | Why now | Who |
|---|---|---|---|
| 1 | **Measurement** (L10): confirm Web Analytics shows page views; set up UptimeRobot | Every later choice (next batch, what to post, "most read") depends on traffic data | Owner |
| 2 | **Social and donation accounts** (L11, L13) | The main audience (14–25) finds content on Instagram and Threads, not search. The About and Support pages are ready and show each link once its URL is set | Owner |
| 3 | **Content session** C1–C4 below, in order | The catalogue and its links now limit the site more than features do | Code + content |

### Content session (owner, 2026-10-06)

- **C1. Colorized and restored portraits** *(in progress, owner).* Black-and-white, faded or damaged portraits redone with AI (Gemini); `ai_edit: colorized` or `restored`; keep the original author, license and source; skip any result that changes the person's look. Most-viewed and most-linked profiles and the field tiles' faces first.
- **C2. Cross-profile links (I17).** (a) Make `related:` links two-way where it makes sense (79 are one-way). (b) Link the mentions of profiled people in the prose, checking each by hand: `src/content/aliases.json` finds 83 profile pairs where one names the other in the Ukrainian text, many of them the Шевченко namesakes (Taras / Andriy). (c) Add a "Links" column to [CANDIDATES.md](CANDIDATES.md): which existing profiles each candidate connects to.
- **C3. Add people, prioritized by connections.** Next batch from CANDIDATES.md by how many profiles each candidate connects to (C2c), weighing the balance by hand (product_vision.md §7.2). Usual workflow: both languages, ≥ 2 sources, fact-check, portraits (free license first), `reviewed: true` in both.
- **C4. Grow the candidate list.** Beyond the NV, ВУ and Rubryka lists: encyclopedias (ESU, Encyclopedia of Ukrainian History), state awards (Shevchenko Prize, Hero of Ukraine), diaspora, science and sport halls of fame, regional figures for empty oblasts (Kherson, Odesa, Zakarpattia, Luhansk and others), women and living people. Each with years, field, era, source and links (C2c).

## Launch checklist

- [ ] **L3. Real domain `namesofukraine.org`.** Register at Cloudflare Registrar (~$10–12/yr), add it under the Pages project's Custom domains, set `site` in `astro.config.mjs`, redeploy, then the domain section of [post-launch.md](post-launch.md). Pick the social handle (`@znaisvoikh` or `@namesofukraine`). *Owner.*
- [ ] **L7. Search engines.** Code done. Open: Google Search Console + Bing Webmaster Tools and sitemap submission, **after L3** (don't submit the `pages.dev` address). *Owner.*
- [ ] **L10. Monitoring.** Confirm Web Analytics data arrives; UptimeRobot on `/uk/`. Routines in [post-launch.md](post-launch.md). Custom events ("read to the end") would need GoatCounter or Plausible: later, once there are readers. *Owner.*
- [ ] **L11. Social and support accounts.** Code done. Open: create Instagram, Threads, Patreon and Buy Me a Coffee, and set their URLs in `src/site.ts` (`SOCIAL_LINKS`, `SUPPORT_LINKS`); until then the pages say "coming soon". In Tally, add a choice like «Хочу долучитися до команди / I want to join the team» to «Про що ваше повідомлення?» (messages are already tagged by the hidden `type` field). *Owner.*
- [ ] **L13. Instagram/Threads posts per batch** (D13-E). Share cards, fun facts and misconceptions are ready-made posts.
- [ ] **L15. Missing and weak portraits.** *Owner.*
  - **No free photo:** Ruf, Kryvtsov, Kyrychenko (initials). Checked uk/en Wikipedia and Commons 2026-10-05; ArmyInform CC BY 4.0 copies are reposts of third-party photos; Commons has only derivative works (Tsybukh's memorial photo, Kyrychenko's plaque), and Ukraine has no freedom of panorama. Next: ask Suspilne or the families for written permission.
  - **Fair use** (D6): Mykolaichuk, Sukhomlynskyi, Tsybukh, Petrychenko. On any rights-holder request, remove the file and the `image:` block the same day. Better: written permission from Dovzhenko Film Studios / the Mykolaichuk museum and the Sukhomlynskyi museum in Pavlysh.
  - **Doubtful tags:** Bykov's *Tamer of Tigers* still is tagged PD-Russia-1996, which looks wrong for a 1955 film; Commons has no clear upgrade (other stills share the tag; a 1961 group photo is `PD-self` and small). Symonenko's photo is PD-Ukraine with no date (needs publication before 1956; not PD in the US): find the first publication, or use `Stamp of Ukraine s1421 (cropped).jpg` (Ukrposhta 2015, PD).
  - **Worth confirming:** Kotliarevskyi's painting (date and artist unknown; a Tropinin portrait is a safe alternative); Hryntsevych and Ratushnyi use government-site photos that may be family or unit photos.

## Ideas

Not scheduled.

- **I1. "Share this person" buttons** on profiles.
- **I12. Life-path card** (timeline + key places + pull-quote). A prototype on Шевченко worked and was removed pending refinement; `places[]` and `quotes[]` exist in the schema but are empty. Open: keeping a timeline in sync with the prose; a real map vs a list of OpenStreetMap links; whether every profile needs all three.
- **I16. "Most read".** (a) Private, now: Cloudflare Web Analytics → Top paths, adding the `/uk/` and `/en/` rows per person. (b) A public "Most read this month" row: a nightly GitHub Action reads the Web Analytics GraphQL API, writes `src/content/popular.json` and rebuilds (no server code; one read-only token). Only at a few hundred profile views a week.
- **I17 C. Automatic links** to the first mention of each profiled person in the story text, at build time (remark plugin, `aliases.json`, never inside quotes). And a test that fails on one-way `related:` links unless marked intentional.
- **I18. Home page that stays short.** A tag cloud by count (needs a `?tag=` filter). Every card is in the home page for the filters (~297 KB HTML at 86 people); past ~200 people, filter from a small JSON index instead.
- **I20. Map, next steps.** 16 people have no dot (10 abroad, 6 unknown; they're in the region list). Places of major work (`places[]`) and a small world inset for the diaspora; zoom into dense areas (Kyiv, Lviv); check Crimea's outline and the borders by eye before the public launch.
- **I11. Periodic security review** (e.g. an OWASP ZAP baseline against the live site); headers, CSP, `dist/` check, `npm audit` and Dependabot are in place ([SECURITY.md](SECURITY.md)). If content ever comes from outside, sanitize Markdown/HTML and keep human review.
- **Phase 3** (product_vision.md §3.8): personality quiz · printable teacher pages · CMS.
