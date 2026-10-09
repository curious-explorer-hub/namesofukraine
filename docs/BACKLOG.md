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
- **C4. Grow the candidate list.** Beyond the NV, ВУ and Rubryka lists: encyclopedias (ESU, Encyclopedia of Ukrainian History), state awards (Shevchenko Prize, Hero of Ukraine), diaspora, science and sport halls of fame, regional figures for empty oblasts (Kherson, Odesa, Zakarpattia, Luhansk and others), women and living people. Each with years, field, era, source and links (C2c).

## Launch checklist

- [ ] **L11. Social and support accounts.** Code done. Open: pick the social handle (`@znaisvoikh` or `@namesofukraine`), create Instagram, Threads and a Monobank jar («банка») (Patreon is set), and set their URLs in `src/site.ts` (`SOCIAL_LINKS`, `SUPPORT_LINKS`); until then the pages say "coming soon". In Tally, add a choice like «Хочу долучитися до команди / I want to join the team» to «Про що ваше повідомлення?» (messages are already tagged by the hidden `type` field). *Owner.*
- [ ] **L13. Instagram/Threads posts per batch** (D13-E). Share cards, fun facts and misconceptions are ready-made posts.

## Ideas

Not scheduled.

- **I1. "Share this person" buttons** on profiles.
- **I12. Life-path card** (timeline + key places + pull-quote). A prototype on Шевченко worked and was removed pending refinement; `places[]` and `quotes[]` exist in the schema but are empty. Open: keeping a timeline in sync with the prose; a real map vs a list of OpenStreetMap links; whether every profile needs all three.
- **I16. "Most read".** (a) Private, now: Cloudflare Web Analytics → Top paths, adding the `/uk/` and `/en/` rows per person. (b) A public "Most read this month" row: a nightly GitHub Action reads the Web Analytics GraphQL API, writes `src/content/popular.json` and rebuilds (no server code; one read-only token). Only at a few hundred profile views a week.
- **I17 C. Automatic links** to the first mention of each profiled person in the story text, at build time (remark plugin, `aliases.json`, never inside quotes). And a test that fails on one-way `related:` links unless marked intentional.
- **I23. Popular quotes per person.** A short, sourced quote (or a few) attached to a profile, shown alongside or instead of the pull-quote in I12. Open: schema field(s) and limits (count, length), sourcing bar (same ≥2-source rule as facts, or tighter since quotes are easy to misattribute), translation (uk original + en rendering, not a retranslation), and where it surfaces (card, life-path, share card).
- **I26. Quizzes on their own tab or page** (owner, 2026-10-07: not on the profile page). 2–3 questions per person (myth or fact, what came first; the misconception cards are ready-made first questions), instant answer with a short sourced explanation, and a share card that doesn't give the answers away ("Іван Сірко: 2 з 3 🟦⬜🟦"). Plain JS, nothing stored or sent; answers follow the ≥ 2-source rule. A profile-page prototype on Sirko worked (2026-10-07) and was removed. Open: a quiz tab on the home page vs. `/quiz/` pages, a link from each profile, and how this relates to the Phase 3 personality quiz.
- **Phase 3** (product_vision.md §3.8): personality quiz · printable teacher pages · CMS.
