# Product Vision — Prominent Ukrainians Platform

> The **why and the rules**: vision, audiences, requirements, architecture, decisions, and editorial policy.
> **Status, priorities, and the ideas backlog live in [docs/BACKLOG.md](docs/BACKLOG.md)** — start there to resume work.
> Section numbers are referenced elsewhere (e.g. §7.6); keep them stable. Earlier versions, including the full pros and cons of decisions, are in git history.

---

## 1. Vision

**Mission:** a modern, interactive, beautifully designed platform where anyone — young Ukrainians first, and the world second — can discover prominent Ukrainians across art, the military, science, literature, state-building, and more. It should be fast to skim, rich to explore, and trustworthy.

**Why it matters:** young people should know and appreciate the people who shaped Ukraine. International audiences should see Ukrainian contributions as *Ukrainian*, not folded into Russian or Soviet narratives.

**Principles**
1. **Trust over volume.** Every fact is sourced. Contested figures are presented neutrally, with the debate included (§7).
2. **Snackable first, deep second.** A card answers "who and why" in about 10 seconds; the long-read rewards curiosity.
3. **Beautiful and fast.** A minimalist, Awwwards-level look on a static, near-zero-cost stack.
4. **Free forever.** No ads, no paywall, no tracking cookies. Hosting is about $0. Voluntary donations (Patreon, Buy Me a Coffee) are welcome and spent openly (§3.6).

**Brand:** «Знай своїх» (EN "Know Your Own"). Headline: «Імена, з яких складається Україна» (EN "The names Ukraine is made of"). Domain: `namesofukraine.org` (soft launch on `namesofukraine.pages.dev` first).

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
- **AC1** The home page offers **one way to browse at a time, as tabs** over one results grid (D12, D14): **Пошук / Search** (search field and dropdowns for field, era, region and "unread only"), **Епохи / Eras** (a card per era), **Карта / Map** (birthplace map) and **Галузі / Fields** (a tile per group, opening its category page). Changing tabs clears the filters. Above the tabs: the Daily Hero and the visitor's reading progress; below them: the newly added row, then the results.
- **AC2** Filter by **category group**, **era**, and **birth region** (Ukrainian oblast, or "diaspora / abroad"). In the Search tab the dropdowns combine with AND; every filter is reflected in the URL (`?group=science&era=20th-century`), so a filtered view can be shared and "back" restores it.
- **AC3** Search by name, role, or keyword, in the current language. It ignores case and apostrophe variants (`'` `’` `ʼ`) and shows results as you type in under 100 ms.
- **AC4** Works without JavaScript: the tab bar is hidden and every panel is shown one after another (era cards, map, group tiles), each group tile links to its category page with the full list, and filters are an enhancement.
- **Map — S (built 2026-10-06):** a map of Ukraine on the home page with a dot per birthplace and oblasts shaded by head count. Every region names itself on hover; clicking an oblast (or a region in the list under the map) filters by region. People born abroad or in an unknown place are in the list. Later: places of major work and diaspora locations (D15).

### 3.2 Profile: snackable summary + deep dive — M
Every profile **must** have this summary, shown on the card (condensed) and at the top of the page:

| Field | Rule | Example (Shevchenko) |
|---|---|---|
| Name | Full name, in each language | Тарас Шевченко / Taras Shevchenko |
| Years of life | `born`–`died`, "c." for uncertain dates, "b. 1975" for living people | 1814–1861 |
| Role tag | One high-impact label, ≤ 40 characters | «Батько української літератури» |
| Impact summary | 2–3 punchy sentences, ≤ 300 characters | … |
| Fun fact | One surprising, sourced fact | Also a recognized painter — an academician of engraving |

**Deep dive (long-read):** key accomplishments · full story · why it matters today · debates and assessments (where relevant) · sources · image credits — **M**. Quotes, gallery, related people — **S**. Optional "popular misconception" card (`misconception: { claim, truth }`).

**Content files:** one file per person per language (`src/content/people/uk/<slug>.md`, `src/content/people/en/<slug>.md`), same slug. Language-independent facts (dates, places, group) live in the Ukrainian file. The schema is in `src/content.config.ts`.

- **AC5** The build fails if any published profile is missing name, years, role, summary, fun fact, group, era, birthplace, or at least 2 sources.
- **AC6** Every profile has its own shareable URL, with a preview image (OG) showing the portrait, name, and role.

### 3.3 Multilingual (Ukrainian + English) — M
- **AC7** Every page exists in Ukrainian (`/uk/…`) and English (`/en/…`), with a language switcher that stays on the same person or view, and `hreflang` tags.
- **AC8** A profile is published only when **both** language versions are reviewed (D3-R).
- **AC9** English uses the official Ukrainian transliteration (Kyiv, Kharkiv, Mykola, Serhii; surnames in -skyi) and adds brief context for foreigners where needed, e.g. what the Cossack Hetmanate was.

### 3.4 Visual style & UX — M
- Minimalist, editorial feel: lots of white space, strong typography, restrained colour. Ukrainian heritage appears as accents (deep blue, wheat gold, the stitch-rhombus mark), not flag clichés.
- **Consistent portraits** across profiles: full colour on the site, with black-and-white or damaged photos colorized or restored with AI and credited as such (D16, §5).
- Self-hosted fonts with full Cyrillic support (Fixel).
- Subtle motion that respects `prefers-reduced-motion`.
- **Light and dark theme** on every page: follows the system setting until the visitor picks one with the header toggle (saved in this browser only). Dark colours meet the same AA contrast rules (AC11).
- **AC10** Lighthouse on mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90, Best Practices ≥ 90 (enforced in CI).
- **AC11** Meets WCAG 2.2 AA: contrast, keyboard use, focus, alt text, `lang` per page.

### 3.5 "Newly added" feed — M (D13)
- **AC12** Returning visitors can see what was added recently: a row on the home page, a `/new/` page grouped by date, a "Нове / New" badge for 30 days, and an RSS feed.

### 3.6 Community: feedback, joining the team, support — M (D17)
- **AC13** A form accepts suggestions of new people and corrections (with the profile it's about), sources (optional), and contact (optional). It has spam protection and needs no login.
- **AC14** Submissions land in a single review queue. The page explains the selection criteria (§7) and says that not every suggestion will be added.
- **AC14a** The feedback page also offers **joining the team** (research, fact-checking, writing, translation, photos, social media, design, code): its link opens the same form tagged `type=volunteer`.
- **AC14b** About links to the social pages (Instagram, Threads), where the same stories are posted to bring readers back and forth, and to a **Support** page (`/support/`, also in the footer) with Patreon and Buy Me a Coffee and the "join the team" link. Each link is set in `src/site.ts` (`SOCIAL_LINKS`, `SUPPORT_LINKS`) and stays hidden until its URL is set; the page says what donations pay for.

### 3.7 Gamification — S / C
- **Daily Hero — "Народився цього дня" / "Born on this day" (S).** The home page highlights a person born (or who died) on today's date.
  - **AC15** The correct person is shown for the visitor's local date. If nobody matches, a deterministic "hero of the day" is shown instead. Approximate dates never count; dates before 1918 are new style.
- **Personality quiz — "Хто з видатних українців схожий на тебе?" (C).** 8–10 questions mapped to traits and then to people, with a shareable result card. Written carefully so controversial figures aren't trivialized; some may be excluded.

### 3.8 Non-goals (for now)
Accounts/logins, comments, a full CMS or database, server code, monetization, native apps.

---

## 4. Architecture

| Area | Choice |
|---|---|
| Framework | **Astro**, static output, minimal client JS |
| Content | File-based Markdown + frontmatter, schema-validated (`src/content.config.ts`); a git-based CMS (Decap / Keystatic) could be added later on the same files |
| i18n | Both languages prefixed (`/uk/…`, `/en/…`); `/` redirects to `/uk/` (`public/_redirects`); UI strings in `src/i18n/*.json` |
| Search & filters | Client-side, over the rendered page (`src/scripts/filter.ts`) |
| Images | Astro image optimization; portraits from Wikimedia Commons with credits |
| Share cards | Generated at build time (Satori + resvg + sharp, `src/lib/og.ts`) |
| Forms | Tally, embedded on the feedback page (D17) |
| Hosting | Cloudflare Pages ($0), deployed by GitHub Actions after all checks pass ([docs/PUBLISHING.md](docs/PUBLISHING.md)) |
| Analytics | Cloudflare Web Analytics (no cookies) |
| Map | Static SVG drawn at build time from geoBoundaries (OpenStreetMap, ODbL) oblast borders (D15) |
| Name aliases | `src/content/aliases.json`: word stems of each person's names in uk/en, for finding mentions of profiled people in other profiles (I17) |

Code layout: `src/pages/{uk,en}/` are thin route files that render shared views in `src/views/`; components in `src/components/`; collection helpers (published = reviewed in both languages) in `src/lib/people.ts`; browser scripts in `src/scripts/`.

---

## 5. Decisions

| Date | ID | Decision |
|---|---|---|
| 2026-09-29 | D1 | Tech stack: **Astro**. |
| 2026-09-29 | D2 | Detail view: **full page per person**, not a modal. |
| 2026-09-29 | D3-R | **Bilingual launch:** a profile is public only when reviewed in both uk and en; authoring starts in Ukrainian. (Replaced D3, "Ukrainian only at launch".) |
| 2026-09-29 | D4 | Content: **one file per person** per language. |
| 2026-09-29 | D5 | Writing: **AI drafts from cited sources + mandatory human review** (`reviewed: true`). |
| 2026-09-29 | D6 | Images: **public domain or freely licensed (Wikimedia Commons), self-hosted, with attribution**, or written permission from the rights holder. |
| 2026-09-29 | D7 | Hosting: **Cloudflare Pages**, deployed by GitHub Actions; code on a personal GitHub account, in a fresh repository (2026-10-04). |
| 2026-09-29 | D8 | **Living people may be included** (extra rules in §7.6). |
| 2026-09-29 | D10 | Search: **simple client-side**. |
| 2026-09-29 | D11 | Analytics: **Cloudflare Web Analytics**. |
| 2026-09-29 | D12 | **Home layout:** group sections (swipe rows on mobile, grid on desktop) + filter/search bar; filtering switches to one grid. (Replaced D9, grid + chips.) *Changed 2026-10-06:* explore tabs (Search, Eras, Map, Fields), one at a time, over one results grid; the group sections became tiles in the Fields tab, and the header search was folded into the Search tab. |
| 2026-09-29 | D13 | **New-additions feed:** home row + `/new/` + "Нове" badge + RSS at launch; Telegram/Instagram posts per batch after launch (D13-E). *Changed 2026-10-06:* the social pages are Instagram and Threads (§3.6). |
| 2026-09-29 | D14 | **Categories:** one `group` per person + many `tags`. Groups: `statehood`, `literature`, `visual-arts`, `performing-arts`, `science`, `civic`, `faith`, `sport`, `defenders` (labels in `src/content/categories.json`). |
| 2026-09-29 | D15 | **Map (Phase 3):** Leaflet/MapLibre + OSM-based tiles; birthplace coordinates collected now. *Changed 2026-10-06:* a static SVG of the oblasts (all 27 units, including Crimea and Sevastopol) drawn at build time, with no tiles or third-party requests; on the home page, tied to the filters. |
| 2026-09-29 | D16 | **Portraits:** free portraits with one automatic visual treatment (grayscale over cobalt on cards, full colour on the profile); commissioned illustrations for featured figures later, if possible. *Changed 2026-10-05:* the site shows portraits in full colour everywhere; the cobalt treatment remains only on share images (OG). |
| 2026-09-29 | D17 | **Feedback form:** Tally (free, spam protection, no login). |
| 2026-09-29 | G4 | Selection criteria per §7. |
| 2026-09-29 | — | **Content before promotion:** review locally until ready; soft launch on `pages.dev` before buying the domain and promoting. |
| 2026-09-29 | — | **Date rule:** new style (Gregorian) from 1582; earlier dates as in the sources (Julian). |
| 2026-09-29 | — | **URLs:** Ukrainian under `/uk/` (`uk` is the ISO 639-1 language code; `ua` is the country). |
| 2026-10-03 | — | **English surnames: official -skyi** (Hrushevskyi, Khmelnytskyi). Exceptions: established personal spellings (Igor Sikorsky, Bohdan Hawrylyshyn, Zelenskyy), official names of things (the *Akademik Vernadsky* station), and non-Ukrainians. Feminine forms keep -ska. |
| 2026-10-05 | — | **Animated portraits removed** (paused 2026-10-03: some clips read as disrespectful; dropped as a feature, clips and scripts deleted; see git history). |
| 2026-10-04 | — | **Domain:** `namesofukraine.org`, bought before wide promotion. A рушник border and the «вишиванка імен» tagline were tried and rolled back. |
| 2026-10-05 | — | **Fair-use portraits, as an exception to D6** (owner decision, against the recommendation): Mykolaichuk and Sukhomlynskyi, AI-colorized from uk.wikipedia fair-use files. `fair_use: true` keeps them on the site only (profile and cards; share cards and structured data leave them out), the credit says they aren't CC BY-SA, and they come down at once on a rights holder's request. Risk: Ukraine has no general fair use, and a modified copy is weaker under US law (§8). |
| 2026-10-06 | — | **Content balance is checked by hand, with no quotas** (owner decision): no fixed share of women or living people, and no gender field in the schema. Editors weigh eras, fields, regions, women and men, living people and the diaspora when choosing each batch (§7.2). |
| 2026-10-06 | — | **Donations and volunteers:** a Support page with Patreon and Buy Me a Coffee, social links (Instagram, Threads) on About, and "join the team" on the feedback form (§3.6). Donations are voluntary and don't change "no ads, no paywall" (§1). |
| 2026-10-05 | — | **AI-colorized portraits allowed**, made by hand in the Gemini app from the same free source photo. Mark it with `ai_edit: colorized` (or `restored`) in the profile's `image:` block; the credit keeps the original author, license and source and adds "colorized with AI (Gemini)" (or "restored…"). A result that shows a different photo than the credited one is not used. |

---

## 6. Roadmap

| Phase | Scope | Exit criteria |
|---|---|---|
| **0. Setup** | Scaffold, schema, CI, deploy | ✅ done 2026-10-05 |
| **1. MVP / public launch** | Grouped home + filters + search · profile summary and long-read · visual design and portraits · "newly added" + RSS · feedback form · About/criteria page · English · OG images · Daily Hero | AC1–AC14 pass; ≥ 20 profiles reviewed in both languages; deployed. ✅ met for the soft launch (86 profiles); public launch after the real domain |
| **2. Growth** | Content to 100–200 in batches of 20–25 · quotes and galleries · Instagram/Threads posts per batch | A balanced catalogue, checked by hand (§7.2) |
| **3. Engagement** | Personality quiz · printable teacher pages · headless CMS for non-technical editors | Per feature |

**Testing:** build-time schema validation (AC5) with a uk/en fact-parity check; `aliases.json` has exactly one entry per profile; Vitest unit tests (filters, search normalization, Daily Hero dates); Playwright smoke tests (filters survive "back", language switch keeps the page, no-JS view, 404); Lighthouse CI (AC10); dependency audit; a check that `dist/` holds nothing private.

---

## 7. Editorial policy

1. **Selection criteria** (published on About): lasting impact on Ukrainian statehood, culture, science, or identity, or major world contributions by people of Ukrainian origin. Balance across eras, fields, regions, and gender.
2. **Balance, checked by hand:** no quotas. When choosing each batch, editors look at what's thin: eras (including Kyivan Rus and the Lithuanian-Polish period), fields, regions (the map shows empty oblasts), women and men, living people, and the diaspora.
3. **Facts:** at least 2 reputable sources per profile, with at least one encyclopedic source (e.g. Енциклопедія сучасної України, Енциклопедія історії України). Wikipedia alone is not enough to publish.
4. **Contested figures:** neutral tone. State the achievements, and include a "Debates and assessments" section with sources.
5. **"Ukrainian" claims:** state the connection precisely — born in Ukraine, of Ukrainian descent, or worked in Ukraine. Credibility with an international audience depends on not overclaiming.
6. **Living people:** public roles only; freely licensed images; "as of <date>"; removal and correction requests handled promptly.
7. **Corrections** go through the feedback form ("Report a mistake" on every profile).
8. **Licenses:** site text CC BY-SA 4.0; code MIT; image licenses per file ([docs/LICENSE-CONTENT.md](docs/LICENSE-CONTENT.md)).

**Review checklist per profile:** facts match ≥ 2 sources → dates → neutral tone → summary and role within limits → fun fact sourced → English matches Ukrainian → set `reviewed: true` and `last_reviewed`. Fact-check reports are in [docs/fact-check/](docs/fact-check/); day-to-day upkeep in [docs/MAINTENANCE.md](docs/MAINTENANCE.md).

---

## 8. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Factual errors / AI hallucinations | High | Sources + review gate; encyclopedic source required (§7.3) |
| Content effort stalls the project | High | Batches of 20–25; AI drafts + human review; invite contributors |
| Bilingual requirement doubles content effort | High | D3-R; draft in Ukrainian, AI-assisted translation + human review |
| Controversy (selection, contested figures, "Ukrainian" claims) | Medium | Published criteria, neutral tone, debates sections, precise-origin rule |
| Image copyright | Medium | D6: only free or permitted images; per-file licenses; initials placeholder until resolved (BACKLOG L15). Exception: 4 fair-use portraits (Mykolaichuk, Sukhomlynskyi, Tsybukh, Petrychenko; §5), on the site only (profile and cards, never share cards), removed on request |
| Inconsistent portrait quality (old, faded or black-and-white photos) | Medium | AI colorizing or restoring from the credited free photo, checked against the original (§5); commissioned illustrations later (D16) |
| Form spam / abuse | Medium | Tally spam protection + reCAPTCHA |
| Deploy pipeline unavailable (GitHub Actions outage, expired Cloudflare token) | Low | Manual deploy from a laptop ([docs/PUBLISHING.md](docs/PUBLISHING.md)) |

## 9. Costs

Hosting, analytics, forms (free tier), fonts, and Commons images: **$0**. Domain ~$10–12 per year. Commissioned illustrations only if ever chosen (D16). Donations (§3.6) go to these costs and to photo permissions.
