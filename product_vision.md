# Product Vision — Prominent Ukrainians Platform

> Single source of truth for **vision, requirements, decisions, and progress**. Start with **§0** to resume work.
> Renamed from `plan.md` on 2026-09-29 (see git history for earlier versions and full pros/cons of decisions already made).

---

## 0. Status & resume point

**Content:** 59 profiles (28 in batch 1, 11 in batch 2, 20 in batch 3 incl. 9 Defenders; all drafts, `reviewed: false`). Batch 2 adds 5 women, the first Lithuanian-Polish-era figure (Roksolana), and the first living people (Kostenko, Marchuk).

**Launch readiness:** §11 is the single checklist of everything that must happen before the repo migrates and the site goes public (added 2026-10-03). Check it first.

**Feature backlog:** §10. Items 3–9 are done; open are 1–2 (social and support links) and 10–11 (SEO, security).

**People backlog:** [CANDIDATES.md](CANDIDATES.md): batch 2 done, recommended batch 3 (20; women and early eras), and the rest of the NV «100 великих українців» list, with decisions pending.

**Owner priority (2026-09-29):** site idea, layout, and features come first; text and dates are refined later.

**Latest (2026-09-29): era images and read marks.**
- Each era band on the ribbon shows a faded picture of that era (Wikimedia Commons, credits in `src/content/eras.json` and on the About page).
- "Already read" marks: a profile counts as read when the reader reaches the end of the story (or uses the toggle on the profile). Cards show a ✓ badge; the filter bar shows reading progress («Прочитано 7 з 28», per page) and an «Лише непрочитані» filter (`?unread=1`). Stored in `localStorage` only (`src/scripts/read-marks.ts`), shared by both languages; noted on the About page.

**Earlier: engagement features (option C).**
- *Born on this day* on the home page (`src/components/DailyHero.astro`, logic + tests in `src/scripts/daily-hero.ts`): birthday → death anniversary → deterministic "person of the day" for the visitor's local date; approximate birth dates never count as birthdays.
- *Share cards*: 1200×630 JPEG per person and language (`/og/<lang>/<slug>.jpg`) plus a site card (`/og/<lang>/site.jpg`), generated at build time with Satori + resvg + sharp (`src/lib/og.ts`), same cobalt treatment as the site.
- *About* and *Suggest a person* pages (text in `src/content/pages/<lang>/`), plus a site footer. **Owner action:** create the Tally/Google form and paste its URL into `SUGGEST_FORM_URL` in `src/site.ts`; until then the page says the form is coming soon.

**Earlier: English version.** All pages exist at `/en/…` (home, profiles, categories, new, RSS) with a header language switcher and `hreflang`. Shared layouts in `src/views/`. English text for every card-level field of all 28 profiles lives in `src/content/people/en/` (facts stay in the Ukrainian file); long bios translated for all 28 (the Ukrainian fallback with a note remains for future profiles). Publish rule D3-R enforced: both languages must be `reviewed`. Earlier: home sections preview 4 people each, always on one line (`GROUP_PREVIEW` in `src/lib/people.ts`; swipe row below desktop width), with an «Усі N» link on every section as the only place the count is shown, to a static category page `/groups/<id>/` (all people in the group, plus search/era/region filters; works without JS). Home search and filters still cover everyone. Portraits added (2026-09-29): one CSS treatment (grayscale screened over cobalt, original colours on hover/focus); square crops on cards, 4:5 on profiles; portrait used as the share image (`og:image`).

**Current phase:** Home page design v1 done (2026-09-29): Fixel typeface, era ribbon hero (one cross-stitch per person, doubles as era filter), filter bar (search, group, era, region; state in URL; hidden without JS), group sections (swipe rows on mobile, grid on desktop), "newly added" row and "Нове" badge (shown only for people added after `LAUNCH_DATE` in `src/lib/people.ts`). 28 draft profiles.

### Next actions
1. ~~Schema v2 + migrate the 20 drafts~~ ✅ done 2026-09-29.
2. Fact-check batch 1: ✅ research and fixes done, date choices accepted (2026-09-29), see [docs/fact-check/batch-1.md](docs/fact-check/batch-1.md). Per-profile approval (`reviewed: true`) is deferred until before launch.
3. ~~Home page design v1~~ ✅ · ~~Person page design v1~~ ✅ (two-column long-read with sticky fact panel, fun-fact block, cross-stitch accomplishment bullets, related people). ~~D13 `/new/` page + RSS~~ ✅ (`/new/` groups people by `added` date; `/rss.xml` with autodiscovery; verified by simulating a post-launch addition). ~~Favicon~~ ✅ (stitch rhombus, `public/favicon.svg` + `apple-touch-icon.png`) · ~~Filter tests~~ ✅ (`npm test`: 19 Vitest unit + DOM tests for `src/scripts/filter.ts`, also run in CI).
4. English: ✅ structure, interface, card-level text, and long bios for all 28 (2026-09-29). American spelling throughout. Remaining: review both languages before launch.
5. ~~Migrate and deploy~~ ✅ live at https://namesofukraine.pages.dev (soft launch, 2026-10-05). Next: post-launch checks ([docs/post-launch.md](docs/post-launch.md)), then reach 20 reviewed profiles.

### Phase checklist
- [ ] **Phase 0 — Setup** — ✅ done; deployed 2026-10-05
- [ ] **Phase 1 — MVP / public launch** (§6)
- [ ] **Phase 2 — Growth** (§6)
- [ ] **Phase 3 — Engagement** (§6)

---

## 1. Vision

**Mission:** a modern, interactive, beautifully designed platform where anyone — young Ukrainians first, and the world second — can discover prominent Ukrainians across art, the military, science, literature, state-building, and more. It should be fast to skim, rich to explore, and trustworthy.

**Why it matters:** young people should know and appreciate the people who shaped Ukraine. International audiences should see Ukrainian contributions as *Ukrainian*, not folded into Russian or Soviet narratives.

**Principles**
1. **Trust over volume.** Every fact is sourced. Contested figures are presented neutrally, with the debate included (§7).
2. **Snackable first, deep second.** A card answers "who and why" in about 10 seconds; the long-read rewards curiosity.
3. **Beautiful and fast.** A minimalist, Awwwards-level look on a static, near-zero-cost stack.
4. **Free forever.** No monetization, no ads, no tracking cookies. Hosting is about $0.

## 2. Audiences

| Audience | Needs | Implications |
|---|---|---|
| **Young Ukrainians** (primary, ~14–25) | Short, visual, mobile, shareable; reasons to come back | Mobile-first, share previews (OG images), "newly added" feed, Daily Hero, quiz |
| **Ukrainians of all ages** | Accurate, respectful, in Ukrainian | Ukrainian is the default language; editorial standards |
| **International audience** | English; context a foreigner needs; correct names | Full English version; Ukrainian-standard transliteration (Kyiv, not Kiev); short historical context |
| **Teachers / students** (secondary) | Reliable sources, printable pages | Sources on every page; print styles (Phase 3) |

---

## 3. Features & acceptance criteria

Priority: **M** = must have for launch, **S** = should (Phase 2), **C** = could (Phase 3).

### 3.1 Browse, filter, search — M
- **AC1** The home page shows people **grouped into sections by category group** (D12, D14). Each section shows several cards at once.
- **AC2** Filter by **category group**, **era**, and **birth region** (Ukrainian oblast, or "diaspora / abroad"). Filters combine with AND and are reflected in the URL (`?group=science&era=20th-century`), so a filtered view can be shared and "back" restores it.
- **AC3** Search by name, role, or keyword, in the current language. It ignores case and apostrophe variants (`'` `’` `ʼ`) and shows results as you type in under 100 ms.
- **AC4** Works without JavaScript: the full grouped list is visible, and filters are an enhancement.
- **Map — C (Phase 3):** an interactive map of birthplaces and places of major work, including diaspora locations worldwide (D15). Needs coordinates in the data from now on (§3.2).

### 3.2 Profile: snackable summary + deep dive — M
Every profile **must** have this summary, shown on the card (condensed) and at the top of the page:

| Field | Rule | Example (Shevchenko) |
|---|---|---|
| Name | Full name, in each language | Тарас Шевченко / Taras Shevchenko |
| Years of life | `born`–`died`, "c." for uncertain dates, "b. 1975" for living people | 1814–1861 |
| **Role tag** (new) | One high-impact label, ≤ 40 characters | «Батько української літератури» |
| **Impact summary** | 2–3 punchy sentences, ≤ 300 characters | … |
| **Fun fact** (new) | One surprising, sourced fact | Also a recognized painter — an academician of engraving |

**Deep dive (long-read)** — M for text and sources, S for extras:
- Key accomplishments · full story · why it matters today · debates and assessments (where relevant) · sources · image credits — **M**
- **Quotes** (with source) — **S**
- **Gallery** of works and places (licensed images with attribution) — **S**
- Related people · previous/next — **S**

**Data model changes** (to apply to all profiles):

```yaml
group: arts                    # top-level category group (D14)
tags: [poet, painter]          # fine-grained roles
role: "Батько української літератури"
summary: "2–3 sentences…"      # replaces short_bio (≤300 chars); the card may truncate it
fun_fact: "…"
birthplace: { name: "Моринці", region: cherkasy, country: UA, lat: <lat>, lon: <lon> }
places: [{ name: "Санкт-Петербург", lat: <lat>, lon: <lon>, note: "навчання, творчість" }]  # for the map (Phase 3)
quotes: [{ text: "…", source: "…" }]                               # optional
gallery: [{ src: ./img/…, caption: "…", author: "…", license: "…", source_url: "…" }]  # optional
```
Content language: one file per person per language (`people/uk/<slug>.md`, `people/en/<slug>.md`), sharing the same slug. Language-independent facts (dates, places, group) live in the Ukrainian file and are validated to match.

- **AC5** The build fails if any published profile is missing name, years, role, summary, fun fact, group, era, birthplace, or at least 2 sources.
- **AC6** Every profile has its own shareable URL, with a preview image (OG) showing the portrait, name, and role.

### 3.3 Multilingual (Ukrainian + English) — M (see D3-R)
- **AC7** Every page exists in Ukrainian (`/uk/…`) and English (`/en/…`), with a language switcher that stays on the same person or view, and `hreflang` tags.
- **AC8** A profile is published only when **both** language versions are reviewed (launch rule if D3-R = A).
- **AC9** English uses the official Ukrainian transliteration (Kyiv, Kharkiv, Mykola, Serhii) and adds brief context for foreigners where needed, e.g. what the Cossack Hetmanate was.

### 3.4 Visual style & UX — M
- Minimalist, modern, editorial feel (Awwwards-level references): lots of white space, strong typography, restrained colour. Ukrainian heritage appears as accents (deep blue, wheat gold, subtle ornament), not flag clichés.
- **Unified portrait style** across all profiles (D16).
- High-quality typography with full Cyrillic support, e.g. *e-Ukraine* / *e-Ukraine Head* (free, from the Ministry of Digital Transformation), or *Inter* plus a serif for long-reads. Fonts are self-hosted.
- Subtle motion (card hover, page transitions) that respects `prefers-reduced-motion`.
- **AC10** Lighthouse on mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90, Best Practices ≥ 90.
- **AC11** Meets WCAG 2.2 AA: contrast, keyboard use, focus, alt text, `lang` per page.

### 3.5 "Newly added" feed — M (R2, D13)
- **AC12** Returning visitors can see what was added recently: a row on the home page, a `/new/` page grouped by date, a "Нове / New" badge for 30 days, and an RSS feed.

### 3.6 Community: "Suggest a Figure" — M (D17)
- **AC13** A form accepts name, reason, sources (optional), and contact (optional). It has spam protection and needs no login.
- **AC14** Suggestions land in a single review queue. The page explains the selection criteria (§7) and says that not every suggestion will be added.

### 3.7 Gamification — S / C
- **Daily Hero — "Народився цього дня" / "Born on this day" (S).** The home page highlights a person born (or who died) on today's date, with a fallback to a random person. This can run in the browser from a small birthdays index, with no backend.
  - **AC15** The correct person is shown for the visitor's local date. If nobody matches, a deterministic "hero of the day" is shown instead.
  - Caveat: dates before 1918 are shown in the Gregorian (new style) calendar; the page says so.
- **Personality quiz — "Хто з видатних українців схожий на тебе?" (C).** 8–10 questions mapped to traits and then to people. The result card is designed to be shared. It needs careful writing so that controversial figures aren't trivialized, and some figures may be excluded from the quiz.

### 3.8 Non-goals (for now)
Accounts/logins, comments, a full CMS or database, monetization, native apps.

---

## 4. Architecture

| Area | Choice | Status |
|---|---|---|
| Framework | **Astro 7** (static output, component-based, minimal client JS) | ✅ built |
| Content | **File-based Markdown + frontmatter**, schema-validated; a headless CMS can be added later on top of the same files (e.g. Decap / Keystatic, both free and git-based) | ✅ built (schema v1) |
| i18n | Both languages prefixed: `/uk/…` and `/en/…` (root `/` redirects to `/uk/` via `public/_redirects` on Cloudflare, with a meta-refresh fallback page); UI strings in `src/i18n/*.json` | ✅ built |
| Search | Client-side over a build-generated index; Fuse.js if typo tolerance is needed | ⏳ |
| Images | Astro image optimization; responsive formats (AVIF/WebP) | ⏳ |
| Map (Phase 3) | See D15 | ⏳ |
| Forms | See D17 | ⏳ |
| Hosting | Cloudflare Pages ($0) | ✅ live at namesofukraine.pages.dev (2026-10-05) |
| Analytics | Cloudflare Web Analytics (no cookies) | ⏳ |

```
src/
├── content.config.ts          # schema — build fails on invalid entries
├── content/
│   ├── categories.json        # groups → tags, labels uk/en (D14)
│   ├── regions.json           # oblasts + "abroad", labels uk/en
│   └── people/{uk,en}/<slug>.md
├── i18n/{uk,en}.json          # UI strings
├── lib/people.ts              # collection helpers (reviewed-only in production)
├── components/                # PersonCard, CategorySection, FilterBar, Search, DailyHero, NewBadge…
├── layouts/BaseLayout.astro   # SEO/OG/hreflang
└── pages/
    ├── index.astro            # grouped home + new additions + daily hero
    ├── people/[slug].astro    # profile (summary + long-read)
    ├── groups/[group].astro       # full category page (home previews 5 per group)
    ├── new.astro  ·  rss.xml.ts  ·  suggest.astro  ·  about.astro
    └── en/…                   # same routes in English
```

---

## 5. Decisions

### 5.1 Decided

| Date | ID | Decision |
|---|---|---|
| 2026-09-29 | D1 | Tech stack: **Astro** (matches the new vision's "component-based, SEO"). |
| 2026-09-29 | D2 | Detail view: **full page per person**, not a modal. |
| 2026-09-29 | D3 | ~~Ukrainian only at launch~~ → **superseded by D3-R**. |
| 2026-09-29 | D4 | Content: **one file per person** (per language). |
| 2026-09-29 | D5 | Writing: **AI drafts from cited sources + mandatory human review** (`reviewed: true`). |
| 2026-09-29 | D6 | Images: **Wikimedia Commons, self-hosted, with attribution**. The *style* is refined by D16. |
| 2026-09-29 | D7 | Hosting: **Cloudflare Pages**, deployed by GitHub Actions (wrangler) after all checks pass. Code on a personal GitHub account, started as a fresh repository (decided 2026-10-04). |
| 2026-09-29 | D8 | **Living people may be included** (extra rules in §7). |
| 2026-09-29 | D9 | Layout: ~~grid + chips~~ → **superseded by D12** (grouped sections). |
| 2026-09-29 | D10 | Search: **simple client-side**. |
| 2026-09-29 | D11 | Analytics: **Cloudflare Web Analytics**. |
| 2026-09-29 | G4 | Selection criteria per §7. |
| 2026-09-29 | — | **Content before promotion:** review locally until ready. |
| 2026-09-29 | D3-R | **Bilingual launch:** a profile is public only when reviewed in both uk and en. |
| 2026-09-29 | D12 | **Grouped home:** group sections + filter/search bar. |
| 2026-09-29 | D13 | **New-additions feed:** home row + `/new/` + "Нове" badge + RSS; social later. |
| 2026-09-29 | D14 | **Categories:** one `group` + many `tags`. |
| 2026-09-29 | D15 | **Map (Phase 3):** Leaflet/MapLibre + OSM tiles. |
| 2026-09-29 | D16 | **Portraits:** free portraits + one automatic visual treatment. |
| 2026-09-29 | D17 | **Suggest form:** Tally / Google Forms. |
| 2026-09-29 | — | **Date rule:** new style (Gregorian) from 1582; earlier dates as in the sources (Julian). Fact-check date choices accepted. |
| 2026-09-29 | — | **Priority:** features and layout before content refinement. |
| 2026-09-29 | — | **Brand:** «Знай своїх» (EN "Know Your Own"). Domain (decided 2026-10-04): **`namesofukraine.org`** (echoes the English headline; free in WHOIS on 2026-10-04). **Soft launch first** on the free `namesofukraine.pages.dev`; the `.org` is bought (Cloudflare Registrar, ~$10–12/yr) before promoting the site widely. Social handle still to choose (`@znaisvoikh` or `@namesofukraine`). Headline: «Імена, з яких складається Україна» (EN "The names Ukraine is made of"). A cross-stitch рушник border and the «вишиванка імен» tagline were tried and rolled back (owner didn't like the style). |
| 2026-09-29 | — | **URLs:** Ukrainian moved under `/uk/` so both languages nest the same way (`uk` is the ISO 639-1 language code; `ua` is the country code). |
| 2026-10-03 | — | **English surnames: official -skyi** (Ukraine's official transliteration, AC9): Hrushevskyi, Vernadskyi, Vyshnevetskyi, Khmelnytskyi, Sheptytskyi. Exceptions: people with an established personal English spelling (Igor Sikorsky, Bohdan Hawrylyshyn, President Zelenskyy), official names of things (the *Akademik Vernadsky* station), and non-Ukrainians. Feminine forms keep -ska. |
| 2026-09-29 | D14 | **Categories renamed** (option A): 8 groups with matching URL IDs and translations; see D14 below. |

### 5.2 Recently decided (options kept for reference)

#### D3-R — Bilingual "from day one" *(new requirement conflicts with D3)*
The new vision requires Ukrainian **and** English from day one. That roughly doubles the content work per profile.

| Option | Pros | Cons |
|---|---|---|
| **A. Public launch only when every published profile exists in both languages** *(recommended)* | Meets "day one" for everyone who sees the site; no half-translated experience | Launch waits for translations; each profile goes through two reviews |
| B. Launch with both interface languages; English content added per profile (missing ones show "English coming soon") | Earlier launch | Patchy English experience; weakens the international goal |
| C. Keep D3: Ukrainian first, English later | Fastest | Contradicts the new vision |

Authoring can still start in Ukrainian. Under A, the launch gate is "both languages reviewed".

- [x] A  - [ ] B  - [ ] C  — **Decided 2026-09-29 (recommended).** Public launch only when every published profile is reviewed in both languages; authoring starts in Ukrainian.

#### D14 — Category model
The new vision names 5 groups (Artists · Military & State Leaders · Writers & Dissidents · Composers & Theatre · Scientists & Inventors). The current data uses 15 fine-grained tags.

| Option | Pros | Cons |
|---|---|---|
| **A. Two levels: 1 group per person (home sections, main filter) + many tags (card chips, secondary filter)** *(recommended)* | Clean home page with no duplicates; still precise (Franko is in *Writers*, tagged poet/scientist/philosopher) | Picking one group is sometimes a judgment call |
| B. Groups only | Simplest | Loses detail (e.g. Amosov as physician vs scientist) |
| C. Tags only, with groups derived from them | No judgment calls | People appear in several sections; section sizes are uneven |

Proposed groups, open to extension (labels uk / en):
**Renamed on 2026-09-29 (owner, option A):** `statehood` Державні й військові діячі / Statesmen & military leaders · `literature` Література / Literature · `visual-arts` Художники й скульптори / Painters & sculptors · `performing-arts` Музика, театр і кіно / Music, stage & screen · `science` Наука й техніка / Science & technology · `civic` Громадські діячі й правозахисники / Activists & human-rights defenders *(new)* · `faith` Релігійні діячі / Religious leaders · `sport` Спорт / Sports. Moves: Shevchenko and Skovoroda to Literature; Chornovil to Civic. Military & state stays one group (option B, a split into rulers and military leaders, was deferred).

- [x] A  - [ ] B  - [ ] C  — **Decided 2026-09-29 (recommended).** One `group` per person + many `tags`.

#### D12 — Home layout (from R1)
| Option | Pros | Cons |
|---|---|---|
| A. Section per group, **horizontal swipe row** + "All →" | Many cards on one screen; natural on mobile | Cards off-screen are hidden |
| B. Section per group, **compact grid** (first 4–8) + "Show all" | Everything visible | Long page |
| **C. A or B for browsing + filter/search bar on top; applying a filter switches to one filtered grid** *(recommended: C with A-style rows on mobile, B-style grid on desktop)* | Browsing and finding both work | Slightly more to build |

- [ ] A  - [ ] B  - [x] C  — **Decided 2026-09-29 (recommended).** Group sections (swipe rows on mobile, grid on desktop) + filter/search bar; filtering switches to a single grid.

#### D13 — "Newly added" feed
Recommended: **A** (home-page row) + **B** (`/new/` page) + **C** ("Нове" badge) + **D** (RSS) at launch; **E** (Telegram/Instagram posts per batch) after launch. See AC12.

- [x] A  - [x] B  - [x] C  - [x] D  - [ ] E  — **Decided 2026-09-29 (recommended).** A+B+C+D at launch; E (Telegram/Instagram) after launch.

#### D16 — Unified portrait style
| Option | Pros | Cons | Cost |
|---|---|---|---|
| **A. Public-domain / CC portraits with one consistent treatment** (same crop, duotone blue or grayscale + grain, applied automatically at build) *(recommended for MVP)* | Authentic; consistent; free; legally clean | Old photos vary in quality; some people lack free portraits | $0 |
| B. Commissioned illustrations in one style | Most distinctive, Awwwards-level | Slow; ~$30–150 per portrait × 100–200 | $$$ |
| C. AI-stylized illustrations based on public-domain portraits | Consistent and fast | Likeness errors; public criticism risk on a heritage site; needs an "illustration" label | ~$0 |

Possible path: A at launch, then B for featured figures if volunteers or artists join.

- [x] A  - [ ] B  - [ ] C  — **Decided 2026-09-29 (recommended).** Public-domain/CC portraits with one automatic treatment; illustrations for featured figures later if possible.

#### D17 — "Suggest a Figure" form
| Option | Pros | Cons |
|---|---|---|
| **A. Tally or Google Forms, embedded or linked** *(recommended for MVP)* | Free, spam protection, results in a sheet, 30 minutes to set up | Third-party look; data sits outside the repo |
| B. Cloudflare Pages Function + Turnstile → email / GitHub issue | Native look, free | Code to maintain; the GitHub issue route depends on repo account limits |
| C. GitHub Issue form | Transparent, zero code | Requires a GitHub account — a barrier for most young users |

- [x] A  - [ ] B  - [ ] C  — **Decided 2026-09-29 (recommended).** Tally or Google Forms for MVP.

#### D15 — Map (Phase 3; the choice only affects data now)
| Option | Pros | Cons |
|---|---|---|
| **A. Leaflet or MapLibre + free OpenStreetMap-based tiles** *(recommended)* | Real zoomable map, worldwide diaspora | ~40–200 KB JS on the map page only; tile provider limits |
| B. Custom SVG map (Ukraine oblasts + world inset) | On-brand, very light, no third party | Less precise; custom work |

**Needed now regardless:** `birthplace` with coordinates in every profile.

- [x] A  - [ ] B  — **Decided 2026-09-29 (recommended).** Leaflet/MapLibre + OSM-based tiles (Phase 3); birthplace coordinates collected now.

---

## 6. Roadmap

| Phase | Scope | Exit criteria |
|---|---|---|
| **0. Setup** | Scaffold, schema v1, CI | ✅ done, except deploy (§11 L2) |
| **1. MVP / public launch** | Schema v2 (§3.2) · grouped home + filters (group, era, region) + search · profile summary and long-read · visual design and portrait treatment · "newly added" feed + RSS · Suggest a Figure · About/criteria page · English (per D3-R) · OG images · Daily Hero *(cheap, pulled into MVP if time allows)* | AC1–AC14 pass; **≥ 20 profiles reviewed** (both languages if D3-R = A); deployed |
| **2. Growth** | Content to 100–200 in batches of 20–25 · quotes and galleries · related people · Daily Hero (if not in MVP) · Telegram/Instagram per batch | Balance targets met (§7) |
| **3. Engagement** | Interactive map · personality quiz · timeline view · printable teacher pages · headless CMS for non-technical editors | Per feature |

### Testing & verification
- Build-time schema validation (AC5), including a uk/en fact-parity check.
- Unit tests: filtering, search normalization (apostrophes), Daily Hero date logic, timezone-safe dates.
- Playwright: home → filter → search → profile → back keeps filters; language switch keeps the page; the Suggest form submits.
- Lighthouse CI (AC10) and an accessibility check (axe); broken-link check on sources.

---

## 7. Editorial policy

1. **Selection criteria** (published on `/about`): lasting impact on Ukrainian statehood, culture, science, or identity, or major world contributions by people of Ukrainian origin. Balance across eras, fields, regions, and gender.
2. **Balance targets for 100 profiles:** at least 25% women; every era represented, including Kyivan Rus and the Lithuanian-Polish period; at least 10% living; diaspora included.
3. **Facts:** at least 2 reputable sources per profile, with at least one encyclopedic source (e.g. Енциклопедія сучасної України, Енциклопедія історії України). Wikipedia alone is not enough to publish.
4. **Contested figures:** neutral tone. State the achievements, and include a "Debates and assessments" section with sources.
5. **"Ukrainian" claims:** state the connection precisely — born in Ukraine, of Ukrainian descent, or worked in Ukraine. Credibility with an international audience depends on not overclaiming.
6. **Living people:** public roles only; freely licensed images; "as of <date>"; removal and correction requests handled promptly.
7. **Corrections** go through the Suggest form (a "Report an error" option).
8. **Licenses:** site text CC BY-SA 4.0; code MIT; image licenses per file.

### Content status — batch 1 (28 drafts, Ukrainian, `reviewed: false`)

| Proposed group (D14) | People (`src/content/people/uk/<slug>.md`) |
|---|---|
| Artists | taras-shevchenko, kateryna-bilokur, oleksandr-arkhypenko |
| Military & State Leaders | yevhen-konovalets, stepan-bandera, petro-sahaidachnyi, ivan-mazepa, roman-shukhevych |
| Writers & Dissidents | vasyl-stus, ivan-franko, lesya-ukrainka, mykola-khvylovyi |
| Composers, Theatre & Film | mykola-lysenko, mykola-leontovych, serhii-paradzhanov |
| Scientists & Inventors | hryhorii-skovoroda, volodymyr-vernadskyi, serhii-korolov, ihor-sikorskyi, mykola-amosov |
| *Batch 1b — added 2026-09-29 from the top 20 of [«Великі українці»](https://uk.wikipedia.org/wiki/Великі_українці) (2008 TV poll), excluding Klitschko brothers (#15) and Yushchenko (#20) per owner; the other 10 were already listed* | |
| Military & State Leaders | volodymyr-velykyi (#16), yaroslav-mudryi (#1), bohdan-khmelnytskyi (#5), mykhailo-hrushevskyi (#14) |
| Writers & Dissidents | viacheslav-chornovil (#7), mykola-hohol (#18) |
| Faith *(new group)* | andrei-sheptytskyi (#19) |
| Sport *(new group)* | valerii-lobanovskyi (#6) |

Each draft has key accomplishments, a long bio, and 2 sources (uk + en Wikipedia; all 56 links checked 2026-09-29).

**Changes made to the owner's source text (to confirm in review):**
- **Konovalets:** commanded the *Sich Riflemen* in Kyiv, not the Legion of Ukrainian Sich Riflemen (an Austrian unit). Added that he founded UVO in 1920.
- **Bilokur:** the Picasso quote has no documentary confirmation, so it is presented as a popular story.
- **Sahaidachny:** the birth year is uncertain. Uses "c. 1582" (the most common date), not "c. 1570".
- **Khvylovy:** "поплатився життям" made precise: he took his own life in protest (1933).
- **Bandera, Shukhevych, Konovalets:** a neutral "Дискусії та оцінки" section was added.
- **Korolov, Vernadsky, Amosov, Parajanov:** the exact Ukrainian connection is stated (rule 5).
- **Batch 1b choices:** Gogol presented as "a writer of Ukrainian origin who wrote in Russian", with a debates section (rule 5). Neutral debates sections for Khmelnytsky (1648 violence against Jews and Poles; Pereiaslav), Sheptytsky (1941 stance, Yad Vashem), Volodymyr (Russian appropriation). Uncertain dates: Volodymyr c. 958, Yaroslav c. 978, Khmelnytsky c. 1595 (birthplace "probably Subotiv"). Volodymyr's birthplace is unknown (region `unknown`). Chornovil's death date is 25 March 1999 (Wikidata also lists 29 March).
- **Corrections found while migrating (Wikidata check):** Shukhevych was born in Krakovets (Lviv oblast), not Lviv. Bilokur's Bohdanivka is now in Kyiv oblast (Poltava gubernia at the time). Removed an unverified claim that Bilokur's birthday is a national folk-art day.

**Gaps before batch 1 can be published:**
- ~~Migrate to schema v2~~ ✅ done. Birthplaces and coordinates come from Wikidata (P19/P625); Amosov's birthplace (Ольхово) has no coordinates yet.
- ~~Add an encyclopedic source to each profile~~ ✅ (49 verified links: ЕСУ, ЕІУ, IEU).
- ~~Check old/new-style dates~~ ✅ (Sikorsky and Mazepa corrected). Date rule: new style from 1582; earlier dates as in the sources (Julian).
- ~~Add portraits (D16)~~ ✅ 2026-09-29: all 28 from Wikimedia Commons (via Wikidata P18), with credits. Low-res sources to upgrade later: Skovoroda, Leontovych, Stus, Shukhevych, Lysenko (<500 px).
- Write the English versions (D3-R).
- Balance: 2 of 28 are women (target ≥25%); Kyivan Rus now covered, Lithuanian-Polish era still missing; no living people yet.

**Review checklist per profile:** facts match ≥2 sources → dates → neutral tone → summary and role within limits → fun fact sourced → English matches Ukrainian → set `reviewed: true` and `last_reviewed`.

---

## 8. Risks & blockers

| Risk | Likelihood | Mitigation |
|---|---|---|
| Deploy pipeline unavailable (GitHub Actions outage, expired Cloudflare token) | Low | Manual fallback from a laptop: `npm run build && npx wrangler pages deploy dist --project-name=namesofukraine` |
| Bilingual requirement doubles content effort | High | D3-R; draft in Ukrainian, AI-assisted translation + human review |
| Factual errors / AI hallucinations | High | Sources + review gate; encyclopedic source required |
| Controversy (selection, contested figures, "Ukrainian" claims) | Medium | Published criteria, neutral tone, debates sections, precise-origin rule |
| Inconsistent portrait quality breaks the "unified style" | Medium | D16-A automatic treatment; illustrations later |
| ⚠️ **Copyright: 5 portraits are not freely licensed** (10 found 2026-10-03, 5 replaced the same day; see §11 L15). Publishing them on a CC BY-SA site without permission is infringement; one comes from a Russian state site | Certain if published as is | Replace with a public-domain/CC image, get written permission, or show the monogram until resolved (D6) |
| Form spam / abuse | Medium | Provider spam protection (D17) |
| Content effort stalls the project | High | MVP at 20 profiles; batches; invite contributors |

## 9. Costs

Hosting, analytics, forms (free tier), fonts, and Commons images: **$0**. Optional: domain ~$10–20 per year; commissioned illustrations (D16-B) only if ever chosen.

---

## 10. Feature backlog (future work)

Ideas captured on 2026-09-29 for later. Not scheduled yet. Each has a note on what it involves; priority is for the owner to set.

### Sharing and community
1. **Social media and contact links.** Links to email and Instagram (where the same stories would be posted), in the footer and on the About page. *Notes:* needs the accounts to exist first. Add one config block (e.g. `SOCIAL_LINKS` in `src/site.ts`) so links appear only once set. Could also add "share this person" buttons on profiles.
2. **Support the project (Patreon).** A "Support us" link on the About page. *Notes:* principle §1.4 says no monetization and no ads. Voluntary support for hosting and content work is compatible with that; state openly what donations pay for. Configure the link in `src/site.ts` like the suggest-form URL.

### Reading experience
3. ✅ *Done 2026-09-29.* **"Read next" skips people already read.** The related-people section on a profile should leave out people marked as read, or put them last. *Notes:* the marks live in `localStorage`, so this runs in the browser (reuse `src/scripts/read-marks.ts`). Show unread related people first and hide read ones; if all are read, hide the section or offer other unread people from the same group.
4. ✅ *Done 2026-09-29.* **Full-colour portrait on the profile page.** Keep the cobalt treatment with the colour-on-hover reveal only where people are browsed (home, category, New people, related cards). On a person's own page, show the portrait in full colour with no hover effect. *Notes:* a CSS change scoped to `.profile-portrait` (and possibly the Daily Hero card). Share cards keep the cobalt style for brand consistency.

### Navigation and header
5. ✅ *Done 2026-09-29* (logo = stitch-rhombus mark + wordmark, with the label «Видатні українці — на головну»). **Remove "До всіх людей" / "All people".** The wordmark «Видатні українці» already goes home, so two home links side by side are redundant. At the same time, **make the wordmark clearly read as the home logo**: e.g. a framed badge with a background colour, or pair it with the stitch-rhombus favicon mark. *Notes:* removing the back link affects the profile, category, and About/Suggest pages; check keyboard and screen-reader navigation still has a clear way home.
6. ✅ *Done 2026-09-29.* **Remove «Нові люди» from the header.** Keep it in the footer only. *Notes:* the header then holds the logo and the language switcher. The "newly added" row on the home page still links to `/new/`.

### Home page
7. ✅ *Done 2026-09-29:* each band shows its head count in large type plus a bar scaled to the fullest era (the bars grow in on load; no animation with reduced motion), and a wheat «нових: N» note when people were added recently. The stitch stays as brand ornament only (logo, favicon, bullets, share cards). **Rethink the era ribbon's cross-stitches.** Replace the × marks, which will not scale (the 20th century could reach ~100 people), and representing people as × marks is not ideal. *Options:* show the number itself in large type per band; a small bar or density strip scaled to the count; or keep a decorative ornament that doesn't encode people one-to-one. *Notes:* the stitch also appears in the favicon, accomplishment bullets, share cards, and the load animation. Decide whether the motif stays as brand ornament elsewhere.
8. ✅ *Done 2026-09-29:* a faded, vignetted photo of the Independence Monument (CC BY-SA 4.0, credited on About), fainter and tucked into the corner on phones. **A richer page header (hero).** The hero looks plain. Add a background image associated with Ukraine's independence, e.g. Maidan Nezalezhnosti in Kyiv, with a low-opacity overlay like the era ribbon. *Notes:* must keep the headline readable (contrast AA). The Independence era band already uses a Maidan photo, so pick a different image or crop to avoid repetition. It needs a free license and a credit on the About page.
9. ✅ *Done 2026-09-29.* **Drop the count from category page titles.** Remove the number after the title (e.g. «Спорт 2») on `/groups/<id>/`. The reading-progress line («Прочитано 0 з 2») already shows the total. *Notes:* the progress line only appears once JavaScript runs. Without JS the page would show no count at all, which is acceptable.

### Discoverability and safety (added 2026-09-29)
10. **SEO: make the site findable in Google and other search engines.**
    *Already in place:* a real HTML page per person and category, built at build time (no content hidden behind JavaScript); a unique `<title>` and meta description per page; canonical URLs; `hreflang` links between Ukrainian and English (with `x-default`); Open Graph and Twitter share cards; `lang` on every page; descriptive image alt text; clean, readable URLs (`/uk/people/<slug>/`).
    *To do:*
    - **Real domain first.** `site` in `astro.config.mjs` is `https://namesofukraine.pages.dev` for the soft launch (2026-10-04); switch it to `https://namesofukraine.org` before submitting to search engines, since canonical, `hreflang`, sitemap and share URLs derive from it.
    - **Sitemap** (`@astrojs/sitemap`, with `hreflang` alternates) and **`robots.txt`** that points to it. Only published (reviewed) profiles should be listed, which the build already guarantees.
    - **Structured data (JSON-LD):** `Person` on each profile (name, birth and death dates and places, `sameAs` links to Wikipedia and Wikidata, image); `WebSite` and `BreadcrumbList` site-wide. This helps rich results and knowledge panels.
    - **Search Console:** verify the site in Google Search Console and Bing Webmaster Tools, submit the sitemap, and watch coverage and Core Web Vitals.
    - **Performance and accessibility budget** (these affect ranking): keep Lighthouse ≥ 90 (AC10); ✅ Lighthouse CI runs in the workflow (`lighthouserc.json`).
    - **Content signals:** Ukrainian-language search terms in titles and summaries; internal links between related people (done); linking from relevant Wikipedia articles or Wikidata entries where appropriate; social sharing (items 1–2).

11. **Security: no injection, and no access to the repository or other resources.**
    *Why the risk is low:* the site is fully static. There's no server code, database, admin panel, login, or API, so there's no server-side injection surface. The only user input is the search box and URL filters, handled in the browser with `textContent` and `setAttribute` (never `innerHTML`). The suggestion form is hosted by Tally or Google. "Read" marks store only profile slugs in `localStorage`.
    *To do:*
    - **Security headers** via Cloudflare Pages `public/_headers`: `Content-Security-Policy` (self-hosted scripts, styles, and fonts; `frame-src` only for the form provider; `frame-ancestors 'none'`), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` that turns off unused features. Test the CSP against the inline `style` attributes and the Daily Hero data block before enforcing it.
    - **Harden the one raw-HTML spot:** `DailyHero.astro` embeds JSON with `set:html`. Escape `<` in that JSON (e.g. as `<`) so content containing `</script>` could never break out of the script block. Content is ours today; this matters once others contribute.
    - **Keep the repository and secrets out of the site:** only `dist/` is deployed (never the repo root), so there's no `.git`, `node_modules`, source, or `.env` online. Add a CI check that fails if `dist/` ever contains such files. The Cloudflare API token lives only in GitHub Actions secrets, scoped to Pages edit. Keep the repo free of credentials (add secret scanning).
    - **Dependencies:** `npm audit` in CI, plus Dependabot or Renovate for updates. Known item: a moderate `fflate` advisory via `satori`, which isn't reachable because it only runs at build time on our own files. Recheck on each update.
    - **External links:** open outside sources with `rel="noopener noreferrer"` where they use `target="_blank"` (today they open in the same tab, which is already safe).
    - **Future contributions:** if content ever comes from outside (a CMS or community submissions), sanitize Markdown and HTML, and keep human review before publishing (already the rule).
    - **Periodic check:** run a security review (e.g. OWASP ZAP baseline against the deployed site) after launch.

### Profile page enrichment (added 2026-09-29)
12. **Life-path card: timeline + key places + pull-quote.** A prototype was built and validated on Тарас Шевченко (timeline of birth → milestones → death, a list of key places linking to a map, and a pull-quote from `quotes[]`), then removed pending refinement — the idea works but needs more thought before a site-wide rollout. *Notes:* the schema already has unused `places[]` and `quotes[]` fields on every profile (empty everywhere today); a `timeline[]` field would need to be re-added. Open questions before re-attempting: how to keep timeline entries in sync with the prose bio without duplicating dates; whether a real map is worth the dependency versus a plain list linking to OpenStreetMap; and whether every profile needs all three pieces or only some (e.g. `quotes` mainly makes sense for writers/thinkers).
13. ✅ *Done 2026-09-29.* **"Popular misconception" card.** A `misconception: { claim, truth }` field (optional, translatable via the English collection) rendered as a distinct card below the fun-fact card, styled to visually contrast (red-toned, strikethrough on the myth). Backfilled for 35 of 38 profiles after dedicated research per person (each claim/truth pair checked against at least one credible source), with English translations also backfilled in `people_en` so the card no longer falls back to Ukrainian text. *Skipped, deliberately:* Богдан Гаврилишин, Іван Марчук, Микола Хвильовий (no genuinely well-documented popular myth found - recent or under-mythologized figures) and Степан Бандера (candidates found were contested political framings rather than a clean, apolitical factual correction, per the site's neutral-tone policy).

### Platform & responsiveness (added 2026-09-29)
14. **Make the site properly mobile-friendly.** A dedicated mobile pass: audit and fix touch-target sizing (buttons, filter chips, the read-toggle, nav links - WCAG recommends ≥24×24px, ideally 44×44px), verify the era ribbon, filter bar, and profile facts sidebar reflow cleanly rather than just "fitting" on narrow viewports, check portrait/image aspect ratios and text legibility at small sizes, and test real devices (not just resized desktop Chrome) for tap-and-scroll feel. *Notes:* the site already has a viewport meta tag and ~12 responsive breakpoints in `src/styles/global.css` (`.profile` regrouping at 64rem, era-ribbon and filter-bar adjustments, etc.), so this isn't a from-scratch build - it's a systematic audit and refinement pass. *To do:* run Lighthouse mobile + manual pass on a real phone for the home page, a profile page, a category page, and the filter bar; fix anything that scores low or feels cramped; add mobile checks to the Lighthouse CI gate mentioned in item 10 so regressions get caught automatically.

### Media & visuals (added 2026-09-30)
15. ⏸️ *Paused 2026-10-03 (owner): some clips looked clumsy and read as disrespectful, so animation is off site-wide via `ANIMATED_PORTRAITS = false` in `src/site.ts`. The 12 clips and `animate: true` flags are kept; flip the switch to restore.* 🧪 *Pilot built 2026-09-30.* **AI-animated portraits: short "revitalized" video clips instead of a static image.** Replace (or offer alongside) the static profile portrait with a short, simple AI-generated video loop of subtle motion - a smile, a slow blink, a small hand wave - using an image-to-video "living portrait" model. *Notes:* the site is fully static (no server, build-time only), so clips would need to be pre-generated per person and checked into the repo or an asset host, not generated on request; each clip adds real weight (autoplay video is heavier than a `webp` portrait) and should be muted, `loop`, short (a few seconds), and lazy-loaded like the portrait is today, with a static-image fallback (`prefers-reduced-motion`, slow connections, and browsers/users that block autoplay). *Open questions before building:* editorial tone - many portraits here are of people who died tragically (executed, assassinated, perished in camps - e.g. Стус, Коновалець, Хмельницький's contemporaries) or are the only image we have of a serious historical figure; a smiling/waving animation may read as flippant or disrespectful on those pages, so this likely needs a per-person opt-in flag rather than a blanket rollout, and may only suit a subset (e.g. subjects with a lighter public image, or only the Daily Hero/home-page context rather than the profile page itself). Also worth checking: which model/tool to use and its cost per clip at ~40 people (and growing), the generated clip's license/rights relative to the source portrait's license (most are public domain or CC, which should carry through, but confirm per tool's ToS), and whether the output still reads as a faithful likeness rather than an uncanny distortion - a bad animation undermines the "get the facts right" credibility the site is built on more than a static portrait ever could.
    *Pilot (in place):* per-person opt-in `animate: true` in the profile frontmatter; `npm run revitalize` (`scripts/revitalize-photos.mjs`) renders a short head-movement clip with LivePortrait (details below) and saves `public/portraits/<slug>.mp4`. *Lifecycle (owner decision 2026-09-30):* the profile shows the static photo by default with a small «Живе фото» / "Live" badge; the clip plays **once** on hover (mouse/trackpad) or on tap/click/keyboard (the portrait is a button), then returns to the photo; moving away or tapping again stops it. No looping: a clip on endless repeat adds noise, not value. Reduced-motion visitors get no hover playback but can still play it explicitly; without JS or without a clip, it is the static photo. Cards and share images stay static. The image credit adds "animated with AI (LivePortrait)". Pilot set: Валерій Лобановський (CC0), Володимир Вернадський and Іван Франко (public domain), chosen for sharp, front-facing photos, open licenses, and no violent death. *Generated 2026-09-30, for free:* `npm run revitalize` runs an open-source LivePortrait checkout on the Mac (~1 min per person; no API key; photos never leave the machine). *Motion (owner decision 2026-09-30):* a copied smile read as creepy and disrespectful, so clips now show **only a gentle head movement, with the face untouched**: `scripts/head-motion.py` rotates the head along a sine curve (0 → 8° → 0 over 3 s), turning toward the camera when the photo is in three-quarter view (or slightly aside if already frontal), or `--motion nod` for a small chin dip. The cloud (fal.ai) path and driving videos were removed. *Approved motion, variant D (owner, 2026-09-30):* the person **turns to face the viewer, nods once, and turns back** (4.5 s: turn up to 18°, never past frontal; 7° nod; eased start and end on the original photo), as if acknowledging that you read their story. It is the script's fixed default, applied to the three pilot clips. *Next:* extend to the remaining eligible portraits with the reusable prompt in [docs/prompts/revitalize-portraits.md](docs/prompts/revitalize-portraits.md) (freely licensed photographs only; Defenders and violent deaths need an owner opt-in).

---

## 11. Launch readiness checklist (added 2026-10-03)

Everything needed before the repo moves to a personal account and the site goes public, in priority order. Items marked *owner* need the owner's own accounts or decisions. Tick them here as they land, so nothing is lost.

### Blockers: without these the site is empty, broken, or not deployed
- [x] **L1. Review at least 20 profiles in both languages** (Phase 1 exit, AC8, D3-R). ✅ **48 of 59 reviewed: launch threshold met** (2026-10-03: groups A and C of batches 2–3; 2026-10-04: 5 of group B and all 28 of batch 1, the last 5 after their portraits were replaced). Held back: Kostenko and Prymachenko, until their portraits are freely licensed (L15); group D (9 Defenders: 2 wording decisions, 3 portraits). Batch 1 (28) is fact-checked ([docs/fact-check/batch-1.md](docs/fact-check/batch-1.md)); the other 31 (batches 2–3, including 9 Defenders) were fact-checked on 2026-10-03 ([docs/fact-check/batch-2-3.md](docs/fact-check/batch-2-3.md)): 22 definite errors found, fixes applied for all 31 (2026-10-03), and **10 portraits flagged as "all rights reserved"** (must be replaced or permitted before those profiles are published, see L15). After the fact-check, the owner reads each page and approves it; only then is `reviewed: true` set. Use the per-profile review checklist in §7. *Owner.*
- [x] **L2. Migrate the repo and deploy** — ✅ done 2026-10-05. Code at [github.com/curious-explorer-hub/namesofukraine](https://github.com/curious-explorer-hub/namesofukraine) (fresh repository, decided 2026-10-04); CI runs on every push and PR and deploys `main` to Cloudflare Pages (project `namesofukraine`, created by CI on the first deploy). Live at **https://namesofukraine.pages.dev** (soft launch, L3); verified: root redirect, both languages, 404 page, all security headers. Still to switch on in GitHub settings: secret scanning and Dependabot alerts. *Owner.*
- [ ] **L3. Real domain: `namesofukraine.org`** (chosen 2026-10-04; alternatives considered: znaisvoikh.org, knowyourown.org, imenaukrainy.org). **Soft launch first (owner, 2026-10-04):** the site runs on the free `https://namesofukraine.pages.dev`, and `site` in `astro.config.mjs` points there. Don't submit to Search Console during the soft launch. Before promoting widely: register the `.org` at Cloudflare Registrar (~$10–12/yr), attach it in the Pages project (Custom domains), set `site` to `https://namesofukraine.org`, redeploy, then follow the domain section of [docs/post-launch.md](docs/post-launch.md). Also pick the social handle.
- [ ] **L4. Suggest / report-an-error form** (AC13–14, D17, §7.7). Create the Tally (or Google) form with a "Report an error" option and paste its URL into `SUGGEST_FORM_URL` in `src/site.ts`. Also the channel for living people's correction and removal requests (§7.6). *Owner.*
- [ ] **L15. Image licenses: 10 portraits were "all rights reserved" (legal risk, open since 2026-10-03; 5 resolved, 5 open: Kostenko, Prymachenko, Tsybukh, Kryvtsov, Ruf; plus 5 found in batch 1 on 2026-10-04 and replaced the same day).** Found by the batch 2–3 fact-check ([report](docs/fact-check/batch-2-3.md)). Decision D6 allows only public-domain or freely licensed (CC) images with attribution, and the site text is CC BY-SA, so none of these may go live as is. Until each is resolved, that profile must stay `reviewed: false` (or fall back to the monogram). *Owner.*

  | Profile | Current image (author, where published) | Recommended fix |
  |---|---|---|
  | ~~anna-yaroslavna~~ ✅ | was: painting by Artur Orlonov | **resolved 2026-10-03:** Delpech lithograph, c. 1820–40, public domain (Commons) |
  | ~~pylyp-orlyk~~ ✅ | was: painting by Artur Orlonov | **resolved 2026-10-03:** Nataliia Pavlusenko's 2021 portrait, CC BY-SA 3.0 (Commons) |
  | ~~petro-kalnyshevskyi~~ ✅ | was: painting by Nataliia Pavlusenko (not on Commons) | **resolved 2026-10-03:** detail of an old icon, public domain (Commons; provenance only "Internet", low risk like Kotliarevskyi) |
  | ~~kniahynia-olha~~ ✅ | was: unknown author, via rgbs.ru (a Russian state site) | **resolved 2026-10-03:** icon c. 1700, public domain (Google Art Project via Commons), cropped so the «Российская» inscription is not shown |
  | ~~danylo-halytskyi~~ ✅ | was: unknown author, via ukrajna.info.hu | **resolved 2026-10-03:** Andrii Korvach's 2007 bronze sculpture, CC BY-SA 4.0 (Commons), cropped |
  | lina-kostenko *(living)* | unknown author, via koroldanylo.com.ua | a CC photo from Commons, or the photographer's permission (§7.6 requires a free license for living people) |
  | mariia-prymachenko | collage, unknown author, via ukrcy.news (owner-chosen) | a PD/CC photo from Commons, or permission |
  | iryna-tsybukh | Suspilne photo (Wikipedia **fair use**, which doesn't carry over to other sites) | written permission from Suspilne |
  | maksym-kryvtsov | unknown author, via «Рівне 1» | permission from the family or the photographer |
  | yurii-ruf | his own Facebook photo, via UNIAN (copyright now with his heirs) | permission from the family |

  | ~~volodymyr-velykyi~~ ✅ | was: all-rights-reserved image | **resolved 2026-10-04:** imagined portrait from Mykola Arkas's *Історія України-Русі* (1912), PD (Commons) |
  | ~~yaroslav-mudryi~~ ✅ | was: all-rights-reserved image | **resolved 2026-10-04:** imagined portrait from Mykola Arkas's *Історія України-Русі* (1912), PD; the uk.wikipedia image (a 1989 Zoloti Vorota metro mosaic) was not used, since the artists' copyright still applies (Commons) |
  | ~~roman-shukhevych~~ ✅ | was: all-rights-reserved image | **resolved 2026-10-04:** 1944 photograph, SBU archive, PD (Commons) |
  | ~~lesya-ukrainka~~ ✅ | was: all-rights-reserved image | **resolved 2026-10-04:** Johann Krzanowski's 1901 photograph (the original, not colorized), PD (Commons) |
  | ~~mykola-khvylovyi~~ ✅ | was: all-rights-reserved image | **resolved 2026-10-04:** O. Korenevych's 1928 photograph, PD (Commons) |

  Lower risk, worth confirming: Kotliarevskyi's Commons file is tagged public domain, but the painting's date and the artist's dates are unknown (a Tropinin portrait is a safe alternative); Hryntsevych and Ratushnyi use photos from government sites (CC BY 4.0 "unless stated otherwise") that may originally be family or unit photos.
- [x] **L5. License files** (§7.8) — ✅ done 2026-10-03: `LICENSE` (MIT, code), `LICENSE-CONTENT.md` (CC BY-SA 4.0 for text; per-file licenses for images; OFL for fonts), a README section, and a text-license line on the credits page in both languages.

### Should land at launch (code; see §10 items 10, 11, 14)
- [x] **L6. Security** (item 11) — ✅ code done 2026-10-03; CSP tested against a full draft build with no violations. Owner part moves to L2 (secret scanning, Dependabot alerts). Scope was: `public/_headers` (CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors), escape `<` in the Daily Hero `set:html` JSON, CI check that `dist/` holds no repo files or secrets, `npm audit` in CI, Dependabot config.
- [ ] **L7. SEO** (item 10) — ✅ code done 2026-10-03 (`@astrojs/sitemap`, `src/pages/robots.txt.ts`, `src/lib/structured-data.ts`); open: Search Console after L3. Scope: sitemap with `hreflang` alternates, `robots.txt`, JSON-LD (`Person`, `WebSite`, `BreadcrumbList`). After L3: Google Search Console + Bing Webmaster Tools, submit the sitemap. *(Search Console is owner.)*
- [x] **L8. Quality gates** (AC10, AC11, item 14) — ✅ done 2026-10-03. Mobile Lighthouse on a full draft build: performance 95–99 (home was 73), accessibility, best practices and SEO 100 on every page type; CLS fixed on category pages; language-switch tap target enlarged to 44 px. `lighthouserc.json` runs in CI, including a profile page. Still worth doing: one pass on a real phone. Scope: Lighthouse mobile ≥ 90 / a11y ≥ 95 / SEO ≥ 90 / Best Practices ≥ 90, WCAG 2.2 AA, mobile touch-target pass; Lighthouse CI in the workflow so regressions fail the build.
- [x] **L9. Friendly 404 page** — ✅ done 2026-10-03 (`src/views/NotFoundView.astro`; Cloudflare serves `uk/404.html` / `en/404.html`). in both languages (unknown URLs such as `/uk/people/<typo>/` currently show the host's default error).
- [ ] **L10. Monitoring after deploy** (D11): **Cloudflare Web Analytics** (Pages project → Metrics → Web Analytics → Enable, then redeploy; no cookies, so no consent banner; already allowed by the CSP in L6), a free **UptimeRobot** check on `/uk/`, and **Search Console + Bing** once the domain is set (L7). Step-by-step, plus first-week and monthly routines: [docs/post-launch.md](docs/post-launch.md). Custom events (for example "read to the end") would need GoatCounter or Plausible; postponed until the basic numbers show real readers. *Owner.*

### Right after launch
- [ ] **L11.** Social and contact links, and the support (Patreon) link (§10 items 1–2). *Owner creates the accounts.*
- [x] **L12.** Playwright smoke tests — ✅ done 2026-10-03 (`e2e/smoke.e2e.ts`, `npm run test:e2e`, also in CI; desktop + mobile): filter + search → profile → back keeps filters; language switch keeps the person; category-page filtering; no-JS view shows the full list without the filter bar; 404 page. Pages are served with the production headers (`scripts/serve-dist.mjs`), so CSP regressions fail too. The no-JS test caught a real regression (the filter bar showed without JavaScript), fixed the same day.
- [ ] **L13.** Telegram/Instagram posts per batch (D13-E).
- [ ] **L14.** Balance targets for content growth (§7.2): recount after batch 3 (59 profiles); targets are ≥ 25% women, every era, ≥ 10% living, diaspora included.

