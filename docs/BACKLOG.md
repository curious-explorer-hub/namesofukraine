# Backlog

Open and in-progress work only. What the site must do, the rules, and what's already built are in [product_vision.md](../product_vision.md) (built items: §10). When an item is done, add a line to §10 and remove it here.

## Status (2026-10-20)

- **Live:** <https://namesofukraine.com> (since 2026-10-08; the soft-launch address `namesofukraine.pages.dev` redirects there), deployed from `main` by GitHub Actions ([PUBLISHING.md](PUBLISHING.md)).
- **Content:** profiles published in Ukrainian and English, and drafts awaiting the owner's review. The counts change with every batch, so they aren't kept here: `status:` in `src/content/people/uk/` gives them.
- **Social:** daily posts on Threads and Instagram (@names_of_ukraine) from monthly plans in `social/`; October–December planned; the rest of the approved profiles are still unused.
- **Next milestone:** public launch = promotion (the feedback form is live, D19).
- **People to add:** [CANDIDATES.md](CANDIDATES.md).

## Now: priorities

In order. Pick from the top.

| # | Item                                                                              | Why now                                                                                                                                                    | Who            |
|---|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| 1 | **Close Tally:** export its old submissions, then close the form | The site's own form (D19) is live and the weekly digest delivers its messages | Owner          |
| 2 | **Content session** C4–C7 below, and the drafts                               | The catalogue and its links now limit the site more than features do | Code + content |
| 3 | **Social upkeep:** February plan by 2027-01-31; both tokens refreshed by 2026-11-29 | Without a plan or with an expired token, nothing is posted, and only the account that last edited a schedule gets GitHub's failure email ([MAINTENANCE.md](MAINTENANCE.md)) | Owner + code   |

### Content session (owner, 2026-10-06)

- **C5. Collections waiting on approvals.** None: `civic-icons`, `neoclassicists` and `executed-renaissance` are live. `civic-icons` still has draft members (Naiiem, Sternenko), which join it on the site as they're approved.
- **C6. Two more collections** (owner, 2026-10-09).
  - `bakhmut`, «Бахмут» / "The Battle for Bakhmut" (2022–23): now part of C8 (draft collection built).
  - `heroes-of-ukraine`, «Герої України» / "Heroes of Ukraine". About 60 profiles mention the title; confirm each by decree, and leave out `stepan-bandera` (the 2010 decree was ruled unlawful) and anyone whose profile mentions the title without saying they got it; check `roman-shukhevych` (2007 award challenged in court). Owner: a collection, or a home-page filter backed by an `awards:` field (schema change).
- **C7. Six more collections** (owner, 2026-10-13). `ukrainian-revolution`, «Українська революція» / "The Ukrainian Revolution" (1917–21), is built; so is `olympians`, «Олімпійці» / "Olympians". Open: Makhno, Vernadskyi, Krymskyi, Olha Basarab and Serhii Yefremov (in or out?); no ZUNR leaders or Kruty students yet (candidates: Yevhen Petrushevych, Dmytro Vitovskyi, Oleksandr Shulhyn, Ivan Steshenko). Still to build:
  - «Революція гідності» / "Revolution of Dignity" (2013–14). About 18 profiles mention the Maidan or the Heavenly Hundred; label only people who took part in it, not those who just mention it. Decide the overlap with `civic-icons`.
  - «Обрали Україну» / "Chose Ukraine": people born elsewhere who made Ukraine their cause. Set the rule first (foreign-born, foreign citizens, or both?).
  - «Гетьмани» / "Hetmans". Existing: Khmelnytskyi, Sahaidachnyi, Vyhovskyi, Doroshenko, Mazepa, Orlyk, Rozumovskyi, Skoropadskyi. Decide whether to include Zaporozhian koshovi and acting hetmans.
  - «Голос України у світі» / "Ukraine's Voice in the World": people who made Ukraine known abroad. Set the scope first (diplomats, artists, diaspora?).
  - Each new collection needs an id in `collections.json`, an image in `src/assets/collections/` and a colour in `global.css` that passes WCAG AA in both themes.
- **C8. Five key battles of the full-scale war** (owner, 2026-10-20). One collection per battle. The owner's list of 50 names came from a chatbot and was checked: about half the people have no trace in reputable sources, and most of the real ones were placed in the wrong battle or given wrong units, awards or call signs. Only verified people went to [CANDIDATES.md](CANDIDATES.md) (marked "Verified 2026-10-20"); the names with no trace were dropped (Глібов, Царенко, Лініч, Майборода, Дермін, Шарков, Ковалевський, Поправка, Чубар, О. Лисенко, Жорновський, Мамедов, О. Найда, Ярмак, Філіппов, Корнійчук, В. Чорний, Кураш, Данчук, Салатенко, Бабій, Невгад, Світін). Members are labelled only where their own profile text places them in the battle.
  - Built as drafts (`"draft": true` in `collections.json`, dev only): `battle-of-kyiv` (Oksanchenko, Chybinieiev, Tsvila, Mezhevikin, Ratushnyi), `kharkiv-counteroffensive` (Mezhevikin), `bakhmut` (Kotsiubailo, Matsiievskyi, Mezhevikin; drafts Brovdi, Filimonov, Torkotiuk), `kherson-counteroffensive` (none yet). Mariupol is the live `defenders-mariupol` collection.
  - To publish each: an image in `src/assets/collections/` with its credit, a colour in `global.css` that passes WCAG AA in both themes, and enough members (drafts join as they're approved).
  - Owner to decide: widen Kharkiv and Kherson to "defence and liberation, 2022"? Most verified heroes there are from February–spring 2022 (Fedosenko, Ponomarenko, Hromadskyi; Chavalakh, and `vitalii-skakun` at the Henichesk bridge), not from the September and autumn offensives. Not labelled: `vadym-voroshylov` (no source ties him to Kharkiv), `vladyslav-datskyi` (his draft doesn't mention Bakhmut), `oksana-rubaniak` and `oleksandr-trepak` (see C6).
- **C4. Grow the candidate list.** Beyond the NV, ВУ and Rubryka lists: encyclopedias (ESU, Encyclopedia of Ukrainian History), state awards (Shevchenko Prize, Hero of Ukraine), diaspora, science and sport halls of fame, regional figures for empty oblasts (Kherson, Odesa, Zakarpattia, Luhansk and others), women and living people. Each with years, field, era, source and links (C2c).

## Ideas

Not scheduled.

- **I29. Social posts, next steps** (from L13). Automatic token refresh (a monthly workflow that refreshes both tokens and saves them back to the secrets, which needs a GitHub token that can write secrets) a richer post template (fun fact or misconception as a second post or carousel); English posts.
- **I1. "Share this person" buttons** on profiles.
- **I12. Life-path card** (timeline + key places + pull-quote). A prototype on Шевченко worked and was removed pending refinement; `places[]` and `quotes[]` are filled in most profiles. Open: keeping a timeline in sync with the prose; a real map vs a list of OpenStreetMap links; whether every profile needs all three.
- **I16. "Most read".** Readers' numbers are already on the Stats page (D20). Still open, a public "Most read this month" row: a nightly GitHub Action reads the Web Analytics GraphQL API, writes `src/content/popular.json` and rebuilds (no server code; one read-only token). Only at a few hundred profile views a week.
- **I17 C. Automatic links** to the first mention of each profiled person in the story text, at build time (remark plugin, `aliases.json`, never inside quotes). And a test that fails on one-way `related:` links unless marked intentional.
- **I23. Popular quotes per person.** Design done (product_vision.md §10, 2026-10-09). Open: add quotes in small batches the owner reviews, following "Quotes" in [STYLE.md](STYLE.md) (the candidate pool was used up and cleared in October 2026; live quotes are only in the profiles), one quote per profile; length limit; whether quotes also surface on cards or share cards.
- **I26. Quizzes on their own tab or page** (owner, 2026-10-07: not on the profile page). 2–3 questions per person (myth or fact, what came first; the misconception cards are ready-made first questions), instant answer with a short sourced explanation, and a share card that doesn't give the answers away ("Іван Сірко: 2 з 3 🟦⬜🟦"). Plain JS, nothing stored or sent; answers follow the ≥ 2-source rule. A profile-page prototype on Sirko worked (2026-10-07) and was removed. Open: a quiz tab on the home page vs. `/quiz/` pages, a link from each profile, and how this relates to the Phase 3 personality quiz.
- **I30. Recognition page for supporters** (owner, 2026-10-12). A page listing the patrons who support the site on Patreon or Monobase. Open: only people who opt in, under the name they choose (consent asked on Patreon and at donation); a hand-kept list in `src/content/` vs. pulled from the Patreon API at build time (a token as a secret); tiers or one plain list; a link from the Support page.
- **I31. Monobase as a donation option** (owner, 2026-10-12). Add it to `SUPPORT_LINKS` in `src/site.ts` and the Support page, next to Patreon and the Monobank jar. Open: confirm which service is meant and whether it adds anything the jar doesn't (recurring donations, a public supporter list for I30).
- **I33. Telegram channel** (owner, 2026-10-12). A channel next to Threads and Instagram: add it to `SOCIAL_LINKS` in `src/site.ts` (shown on About and the Support page once set). Open: post the same daily plan from `social/` automatically (a `post-telegram.mjs` on the shared `social.mjs`, using the Bot API with a bot token as a secret) or by hand; channel name to match @names_of_ukraine.
- **I34. Short video biographies** (owner, 2026-10-21). A YouTube channel with a short video for each profile (portrait, key places, the hook and a few facts), posted also as Instagram Reels and TikTok, so readers who prefer video find the profiles and the site reaches more people. Site and videos link to each other: each video's description links to the profile, and the profile links to its video (an optional video field in the uk file, played with the click-to-play YouTube player, D18). Open: how videos are made (by hand vs. generated from profile data, AI voice or none, subtitles in both languages); one channel with both languages or one per language; posting automatically from `social/` (like `post-instagram.mjs`) or by hand; the same ≥ 2-source rule and image licenses apply to everything shown in a video; channel name to match @names_of_ukraine.
- **Phase 3** (product_vision.md §3.8): personality quiz · printable teacher pages · CMS.
