# Backlog

Open and in-progress work only. What the site must do, the rules, and what's already built are in [product_vision.md](../product_vision.md) (built items: §10). When an item is done, add a line to §10 and remove it here.

## Status (2026-10-08)

- **Live:** <https://namesofukraine.com> (since 2026-10-08; the soft-launch address `namesofukraine.pages.dev` redirects there), deployed from `main` by GitHub Actions ([PUBLISHING.md](PUBLISHING.md)).
- **Content:** 138 profiles published in Ukrainian and English; 15 drafts awaiting the owner's review.
- **Next milestone:** public launch = social pages and promotion (L11, L13).
- **People to add:** [CANDIDATES.md](CANDIDATES.md).

## Now: priorities

In order. Pick from the top.

| # | Item                                                                              | Why now                                                                                                                                                    | Who            |
|---|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| 1 | **Social and donation accounts** (L11, L13)                                       | Many readers, younger ones especially, find content on Instagram and Threads, not search. The About and Support pages are ready and show each link once its URL is set | Owner          |
| 2 | **Content session** C1–C4 below, in order                                         | The catalogue and its links now limit the site more than features do                                                                                       | Code + content |

### Content session (owner, 2026-10-06)

- **C5. Three new collections** (owner, 2026-10-08). People and notes: [CANDIDATES.md](CANDIDATES.md#new-collections-and-owner-list-2026-10-08).
  - `executed-renaissance`, «Розстріляне відродження» / "The Executed Renaissance". On the site: Хвильовий, Курбас, Зеров, Остап Вишня. To draft: Куліш, Підмогильний, Яловий, Бойчук.
  - `neoclassicists`, «Київські неокласики» / "The Kyiv Neoclassicists". On the site: Зеров. To draft: Рильський, Филипович, Драй-Хмара, Клен.
  - Civic icons, from «Україна без Кучми» to the Maidan (id and name to pick). On the site: Руслана, Ратушний, Стерненко (draft). To draft: Гонгадзе, Гандзюк, Костенко; owner decisions on Найєм, Сольчаник.
  - Each needs a `collections.json` entry (label, description, freely licensed image) before profiles can list it in `collections:` (the schema only accepts known ids).
- **C6. Two more collections** (owner, 2026-10-09). People and notes: [CANDIDATES.md](CANDIDATES.md#more-collection-ideas-2026-10-09).
  - `bakhmut`, «Бахмут» / "The Battle for Bakhmut". On the site: Коцюбайло, Мацієвський, Межевікін (draft). Needs new candidates.
  - `heroes-of-ukraine`, «Герої України» / "Heroes of Ukraine". About 60 profiles mention the title; confirm each by decree (Бандера's award was annulled). Owner: a collection, or a filter backed by an `awards:` field.
- **C4. Grow the candidate list.** Beyond the NV, ВУ and Rubryka lists: encyclopedias (ESU, Encyclopedia of Ukrainian History), state awards (Shevchenko Prize, Hero of Ukraine), diaspora, science and sport halls of fame, regional figures for empty oblasts (Kherson, Odesa, Zakarpattia, Luhansk and others), women and living people. Each with years, field, era, source and links (C2c).

## Launch checklist

- [ ] **L11. Social and support accounts.** Code done. Open: pick the social handle (`@znaisvoikh` or `@namesofukraine`), create Instagram, Threads and a Monobank jar («банка») (Patreon is set), and set their URLs in `src/site.ts` (`SOCIAL_LINKS`, `SUPPORT_LINKS`); until then the pages say "coming soon". In Tally, add a choice like «Хочу долучитися до команди / I want to join the team» to «Про що ваше повідомлення?» (messages are already tagged by the hidden `type` field). *Owner.*
- [ ] **L13. Instagram/Threads posts per batch** (D13-E). Share cards, fun facts and misconceptions are ready-made posts.
  - **Agreed (owner, 2026-10-08):** two accounts, one on Instagram and one on Threads, posted to through the official APIs on their free tiers (Threads API: 250 posts a day; Instagram Content Publishing API: 100 a day, needs a Business or Creator account). No X for now: its API is pay-per-use, about $0.20 per post with a link.
  - **On demand, not automatic.** A GitHub Actions workflow run by hand (`workflow_dispatch`) takes a profile URL, e.g. `https://namesofukraine.com/uk/people/<slug>/`. A script in `scripts/` reads the slug, loads that profile from the repo (name, years, role, summary) and publishes a post with the profile's share card (`/og/…`, already a public JPEG) and the link. The owner chooses when and which profile to post.
  - **Later, scheduled.** Manual runs are the first step; the goal is automation. At the start of each month the owner commits a plan file listing one profile per day of the month (in post order). The same workflow also runs on a daily schedule (`cron`) and posts the profile for today's day number: entry 1 on the 1st, entry 2 on the 2nd, and so on. A day with no entry posts nothing. The manual run stays available for one-off posts.
  - **Threads first** (links in the text are clickable), then Instagram. Instagram captions can't hold clickable links ("link in bio"), and its feed works better with a 4:5 card than the 1200×630 share card.
  - Tokens go in GitHub Secrets, never in the repo. Meta's long-lived tokens last 60 days and need refreshing. The script only posts profiles with `status: approved` that are live on the site.
  - **Ukrainian first:** posts use the Ukrainian text and the `/uk/` link, since Ukrainian readers are the primary audience. English may come later.
  - Open: the post template; the plan file's format and location; refreshing tokens before they expire.

## Ideas

Not scheduled.

- **I1. "Share this person" buttons** on profiles.
- **I12. Life-path card** (timeline + key places + pull-quote). A prototype on Шевченко worked and was removed pending refinement; `places[]` and `quotes[]` exist in the schema but are empty. Open: keeping a timeline in sync with the prose; a real map vs a list of OpenStreetMap links; whether every profile needs all three.
- **I16. "Most read".** (a) Private, now: Cloudflare Web Analytics → Top paths, adding the `/uk/` and `/en/` rows per person. (b) A public "Most read this month" row: a nightly GitHub Action reads the Web Analytics GraphQL API, writes `src/content/popular.json` and rebuilds (no server code; one read-only token). Only at a few hundred profile views a week.
- **I17 C. Automatic links** to the first mention of each profiled person in the story text, at build time (remark plugin, `aliases.json`, never inside quotes). And a test that fails on one-way `related:` links unless marked intentional.
- **I23. Popular quotes per person.** Design done (product_vision.md §10, 2026-10-09). Open: add quotes in small batches the owner reviews, from [QUOTES-PICK.md](QUOTES-PICK.md) and [QUOTES-STASH.md](QUOTES-STASH.md) (sources and English in [QUOTES-REVIEW.md](QUOTES-REVIEW.md)), one quote per profile; length limit; whether quotes also surface on cards or share cards.
- **I26. Quizzes on their own tab or page** (owner, 2026-10-07: not on the profile page). 2–3 questions per person (myth or fact, what came first; the misconception cards are ready-made first questions), instant answer with a short sourced explanation, and a share card that doesn't give the answers away ("Іван Сірко: 2 з 3 🟦⬜🟦"). Plain JS, nothing stored or sent; answers follow the ≥ 2-source rule. A profile-page prototype on Sirko worked (2026-10-07) and was removed. Open: a quiz tab on the home page vs. `/quiz/` pages, a link from each profile, and how this relates to the Phase 3 personality quiz.
- **Phase 3** (product_vision.md §3.8): personality quiz · printable teacher pages · CMS.
