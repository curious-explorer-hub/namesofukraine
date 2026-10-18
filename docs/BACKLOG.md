# Backlog

Open and in-progress work only. What the site must do, the rules, and what's already built are in [product_vision.md](../product_vision.md) (built items: §10). When an item is done, add a line to §10 and remove it here.

## Status (2026-10-10)

- **Live:** <https://namesofukraine.com> (since 2026-10-08; the soft-launch address `namesofukraine.pages.dev` redirects there), deployed from `main` by GitHub Actions ([PUBLISHING.md](PUBLISHING.md)).
- **Content:** 151 profiles published in Ukrainian and English; 22 drafts awaiting the owner's review.
- **Social:** daily posts on Threads and Instagram (@names_of_ukraine) from monthly plans in `social/`; October–December planned, 83 of the 151 profiles used, 68 left (about two months).
- **Next milestone:** public launch = the feedback form going live (D19, below) and promotion.
- **People to add:** [CANDIDATES.md](CANDIDATES.md).

## Now: priorities

In order. Pick from the top.

| # | Item                                                                              | Why now                                                                                                                                                    | Who            |
|---|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| 1 | **Feedback form (D19):** after it goes live, send a test message and check `npm run feedback`; then export and close Tally | The site's own form replaces Tally (and adds «join the team», the rest of L11); Cloudflare setup done 2026-10-17 | Owner          |
| 2 | **Content session** C4–C7 below, and the 22 drafts                            | The catalogue and its links now limit the site more than features do, and daily posts use a profile a day: 68 unposted profiles last until about February | Code + content |
| 3 | **Social upkeep:** January plan by 2026-12-31; both tokens refreshed by 2026-11-29 | Without a plan or with an expired token, nothing is posted, and only the account that last edited a schedule gets GitHub's failure email ([MAINTENANCE.md](MAINTENANCE.md)) | Owner + code   |

### Content session (owner, 2026-10-06)

- **C5. Collections waiting on approvals.** None: `civic-icons`, `neoclassicists` and `executed-renaissance` are live. `civic-icons` still has draft members (Solchanyk, Honhadze, Kostenko, Handziuk, Naiiem, Sternenko), which join it on the site as they're approved.
- **C6. Two more collections** (owner, 2026-10-09).
  - `bakhmut`, «Бахмут» / "The Battle for Bakhmut" (2022–23). To label: `dmytro-kotsiubailo`, `oleksandr-matsiievskyi`, `yevhen-mezhevikin` (draft); check `oksana-rubaniak` (draft; only mentions driving ammunition towards Bakhmut); not `oleksandr-trepak` (killed in 2014). Needs new candidates: research Heroes of Ukraine decrees and unit histories for Aug 2022 – May 2023.
  - `heroes-of-ukraine`, «Герої України» / "Heroes of Ukraine". About 60 profiles mention the title; confirm each by decree, and leave out `stepan-bandera` (the 2010 decree was ruled unlawful) and anyone whose profile mentions the title without saying they got it; check `roman-shukhevych` (2007 award challenged in court). Owner: a collection, or a home-page filter backed by an `awards:` field (schema change).
- **C7. Six more collections** (owner, 2026-10-13). `ukrainian-revolution`, «Українська революція» / "The Ukrainian Revolution" (1917–21), is built: 8 approved and 8 draft members. Open: Makhno, Vernadskyi, Krymskyi and Olha Basarab (in or out?); no ZUNR leaders or Kruty students yet (candidates: Yevhen Petrushevych, Dmytro Vitovskyi, Serhii Yefremov, Oleksandr Shulhyn, Ivan Steshenko). Still to build:
  - «Революція гідності» / "Revolution of Dignity" (2013–14). About 18 profiles mention the Maidan or the Heavenly Hundred; label only people who took part in it, not those who just mention it. Decide the overlap with `civic-icons`.
  - «Обрали Україну» / "Chose Ukraine": people born elsewhere who made Ukraine their cause. Set the rule first (foreign-born, foreign citizens, or both?).
  - «Олімпійці» / "Olympians". Of the 12 profiles that mention the Olympics, label only those who competed in them; confirm each through the Olympic committee or Olympedia.
  - «Гетьмани» / "Hetmans". Existing: Khmelnytskyi, Sahaidachnyi, Vyhovskyi, Doroshenko, Mazepa, Orlyk, Rozumovskyi, Skoropadskyi. Decide whether to include Zaporozhian koshovi and acting hetmans.
  - «Голос України у світі» / "Ukraine's Voice in the World": people who made Ukraine known abroad. Set the scope first (diplomats, artists, diaspora?).
  - Each new collection needs an id in `collections.json`, an image in `src/assets/collections/` and a colour in `global.css` that passes WCAG AA in both themes.
- **C4. Grow the candidate list.** Beyond the NV, ВУ and Rubryka lists: encyclopedias (ESU, Encyclopedia of Ukrainian History), state awards (Shevchenko Prize, Hero of Ukraine), diaspora, science and sport halls of fame, regional figures for empty oblasts (Kherson, Odesa, Zakarpattia, Luhansk and others), women and living people. Each with years, field, era, source and links (C2c).

## Launch checklist

- [ ] **L11. Social and support accounts.** Done: handle `@names_of_ukraine`, Instagram and Threads created and set in `src/site.ts`, Patreon and the Monobank jar set (2026-10-10). Open: «Хочу долучитися до команди» / "I'd like to join the team" is a choice in the site's own feedback form (D19), live once its Cloudflare setup is done. *Owner.*

## Ideas

Not scheduled.

- **I29. Social posts, next steps** (from L13). Automatic token refresh (a monthly workflow that refreshes both tokens and saves them back to the secrets, which needs a GitHub token that can write secrets) or a reminder run that fails 10 days before expiry; a richer post template (fun fact or misconception as a second post or carousel); English posts.
- **I1. "Share this person" buttons** on profiles.
- **I12. Life-path card** (timeline + key places + pull-quote). A prototype on Шевченко worked and was removed pending refinement; `places[]` and `quotes[]` exist in the schema but are empty. Open: keeping a timeline in sync with the prose; a real map vs a list of OpenStreetMap links; whether every profile needs all three.
- **I16. "Most read".** (a) Private, now: Cloudflare Web Analytics → Top paths, adding the `/uk/` and `/en/` rows per person. (b) Done as part of the Stats page (D20): CI reads Cloudflare before each build and nightly. Original idea, a public "Most read this month" row: a nightly GitHub Action reads the Web Analytics GraphQL API, writes `src/content/popular.json` and rebuilds (no server code; one read-only token). Only at a few hundred profile views a week.
- **I17 C. Automatic links** to the first mention of each profiled person in the story text, at build time (remark plugin, `aliases.json`, never inside quotes). And a test that fails on one-way `related:` links unless marked intentional.
- **I23. Popular quotes per person.** Design done (product_vision.md §10, 2026-10-09). Open: add quotes in small batches the owner reviews, following "Quotes" in [STYLE.md](STYLE.md) (the candidate pool was used up and cleared in October 2026; live quotes are only in the profiles), one quote per profile; 153 approved profiles have one as of October 2026; length limit; whether quotes also surface on cards or share cards.
- **I26. Quizzes on their own tab or page** (owner, 2026-10-07: not on the profile page). 2–3 questions per person (myth or fact, what came first; the misconception cards are ready-made first questions), instant answer with a short sourced explanation, and a share card that doesn't give the answers away ("Іван Сірко: 2 з 3 🟦⬜🟦"). Plain JS, nothing stored or sent; answers follow the ≥ 2-source rule. A profile-page prototype on Sirko worked (2026-10-07) and was removed. Open: a quiz tab on the home page vs. `/quiz/` pages, a link from each profile, and how this relates to the Phase 3 personality quiz.
- **I30. Recognition page for supporters** (owner, 2026-10-12). A page listing the patrons who support the site on Patreon or Monobase. Open: only people who opt in, under the name they choose (consent asked on Patreon and at donation); a hand-kept list in `src/content/` vs. pulled from the Patreon API at build time (a token as a secret); tiers or one plain list; a link from the Support page.
- **I31. Monobase as a donation option** (owner, 2026-10-12). Add it to `SUPPORT_LINKS` in `src/site.ts` and the Support page, next to Patreon and the Monobank jar. Open: confirm which service is meant and whether it adds anything the jar doesn't (recurring donations, a public supporter list for I30).
- [x] **I32. Statistics page** (owner, 2026-10-12; built 2026-10-17 as `/stats/`, D20; readers' part waits for the `CLOUDFLARE_ANALYTICS_TOKEN` secret, [PUBLISHING.md](PUBLISHING.md#the-stats-page)). Original note: Two panels side by side (stacked on a phone): **personal** (profiles you've read, groups and eras covered, kept only in the browser's `localStorage`, never sent; a "clear" button) and **general** (most visited profiles, from the nightly Web Analytics export in I16 (b)). Open: no tracking cookies and nothing sent, so personal stats stay local by design (say so on the page); the general panel waits for the I16 traffic threshold; what else to show (profiles per group, per oblast).
- **I33. Telegram channel** (owner, 2026-10-12). A channel next to Threads and Instagram: add it to `SOCIAL_LINKS` in `src/site.ts` (shown on About and the Support page once set). Open: post the same daily plan from `social/` automatically (a `post-telegram.mjs` on the shared `social.mjs`, using the Bot API with a bot token as a secret) or by hand; channel name to match @names_of_ukraine.
- **Phase 3** (product_vision.md §3.8): personality quiz · printable teacher pages · CMS.
