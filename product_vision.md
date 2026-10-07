# Product Vision — Знай своїх / Know Your Own

> What the site is, what it must do, and the rules it follows: enough to rebuild it from scratch.
> **Open work lives in [docs/BACKLOG.md](docs/BACKLOG.md).** What has been built is summarized in §10.
> IDs (§7.x, AC…, D…, L…, I…) are cited from other docs and code comments: keep them stable.

---

## 1. Vision

**Mission:** a modern, beautiful, trustworthy place where anyone (young Ukrainians first, the world second) can discover the people who shaped Ukraine: in statehood, literature, the arts, science, faith, sport and defence.

**Why:** young people should know the people who made Ukraine, and international readers should see Ukrainian contributions as *Ukrainian*, not folded into Russian or Soviet narratives.

**Principles**
1. **Trust over volume.** Every fact is sourced; contested figures are presented neutrally, with the debate (§7).
2. **Snackable first, deep second.** A card answers "who and why" in ~10 seconds; the profile rewards curiosity.
3. **Beautiful and fast.** An editorial, Awwwards-level look on a static, near-zero-cost stack.
4. **Free forever.** No ads, no paywall, no tracking cookies. Voluntary donations are welcome (§3.6).

**Brand:** «Знай своїх» (EN "Know Your Own"). Headline: «Імена, з яких складається Україна» ("The names Ukraine is made of"). Domain: `namesofukraine.com` (soft launch on `namesofukraine.pages.dev`).

## 2. Audiences

| Audience | Needs | So the site has |
|---|---|---|
| **Young Ukrainians** (primary, ~14–25) | Short, visual, mobile, shareable; reasons to return | Mobile-first design, share cards, "newly added", Daily Hero, reading progress, social pages |
| **Ukrainians of all ages** | Accurate, respectful, in Ukrainian | Ukrainian by default, editorial standards (§7) |
| **International readers** | English, context, correct names | Full English version, official transliteration, short historical context |
| **Teachers and students** | Reliable sources | Sources on every profile; printable pages later |

---

## 3. Capabilities and acceptance criteria

### 3.1 Home page
- **Hero:** the headline over a photo, a one-line lead.
- **A row of three cards** (stacked on phones), visible from every tab:
  - **Daily Hero** «Народився цього дня» / "Born on this day". **AC15** The person born (or who died) on the visitor's local date; otherwise a deterministic "person of the day". Approximate dates never count; dates before 1918 are new style.
  - **Reading progress:** "read N of 110" (all published profiles) as a filling ring, with a hint (start / N more / "you know them all").
  - **Observation:** from 3 read profiles, the field read most and someone unread from it (or a field not yet explored); before that, a catalogue fact a day.
  - **AC16** Progress, observation and "read" marks are computed in the browser from `localStorage`; nothing is sent anywhere.
- **AC1 Explore tabs, one way of browsing at a time,** over one results grid: **Пошук / Search** (text field + dropdowns for field, era, region and "unread only"), **Епохи / Eras** (a card per era, with its colour, picture and faces), **Карта / Map** (§3.2), **Галузі / Fields** (a tile per field, opening its page). Changing tabs clears the filters. Below the tabs: the "newly added" row, then the results.
- **AC12 Newly added:** a home row, a `/new/` page grouped by date, a "Нове / New" badge for 30 days, and an RSS feed.

### 3.2 Search, filters and map
- **AC2** Filter by **field** (one `group` per person, 9 groups), **era** (7), and **birth region** (oblast, or "abroad / unknown"); filters combine with AND and live in the URL (`?group=science&era=20th-century`), so views can be shared and "back" restores them.
- **AC3** Search by name, role or keyword in the current language; ignores case and apostrophe variants (`'` `’` `ʼ`); results as you type in < 100 ms.
- **AC19 Birthplace map:** an SVG of all 27 oblast units (including Crimea and Sevastopol), shaded by head count, a dot per birthplace in the field colour; every region names itself on hover; clicking an oblast or the region list filters by region; people born abroad or in an unknown place are in the list. **Born outside Ukraine:** under the map, a small card per continent that has someone (Europe, North America, …), with coastlines only (no borders), Ukraine shaded for orientation, and the same dots; clicking a card filters to "abroad". **Disputed birthplaces:** where historians give one version without certainty, a hollow dashed ring (`birthplace.version: true`, region stays unknown), with a legend; today only Sirko (Murafa, after Yu. Mytsyk).
- **AC4** Works without JavaScript: no tab bar, every panel shown in turn, each field tile links to its page with the full list.

### 3.3 Profile
Every profile has this summary, condensed on its card and in full at the top of its page:

| Field | Rule |
|---|---|
| Name | Full name in each language |
| Years | `born`–`died`; "c." when uncertain; "b. 1975" for the living |
| Role | One high-impact label, ≤ 40 characters |
| Summary | 2–3 punchy sentences, ≤ 300 characters |
| Fun fact | One surprising, sourced fact |

Then: key accomplishments · the story · why it matters today · debates and assessments (where relevant) · an optional "popular misconception" card · sources · image credit · related people · "mark as read" · "report a mistake" (opens the feedback form tagged with the profile).

- **AC5** The build fails if a published profile lacks name, years, role, summary, fun fact, group, era, birthplace, or ≥ 2 sources.
- **AC6** Every profile has its own URL and a share card (OG image: portrait, name, role).
- **Content files:** one Markdown file per person per language (`src/content/people/{uk,en}/<slug>.md`). Facts that don't depend on language (dates, places, group, sources, image) live only in the Ukrainian file. Schema: `src/content.config.ts`. Name forms for cross-links: `src/content/aliases.json`.

### 3.4 Two languages
- **AC7** Every page exists in Ukrainian (`/uk/…`) and English (`/en/…`), with a УКР | EN switch in the header that keeps the page (plain links, so it works without JavaScript), and `hreflang` tags. `/` redirects to `/uk/`.
- **AC8** A profile is public only when **both** languages are reviewed (D3-R).
- **AC9** English uses the official Ukrainian transliteration (Kyiv, Kharkiv, Mykola, surnames in -skyi) and adds context a foreigner needs.

### 3.5 Look and feel
- Editorial and minimalist: white space, strong type (self-hosted Fixel, full Cyrillic), restrained colour. Ukrainian heritage as accents (cobalt, wheat gold, the stitch-rhombus mark), not flag clichés. A colour per field and per era.
- **Portraits** in full colour; black-and-white or damaged photos colorized or restored with AI and credited as such (D6, D16).
- Subtle motion (portrait transition from card to profile, hover light, sliding highlights) that respects `prefers-reduced-motion`.
- **AC18 Light and dark theme** on every page: follows the system until the visitor picks one with the sun | moon switch in the header (saved in this browser); no flash on load. Both header switches show both options, with a thumb that slides to the active one.
- **AC10** Lighthouse on mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90, Best Practices ≥ 90 (enforced in CI).
- **AC11** WCAG 2.2 AA in both themes: contrast, keyboard use, focus, alt text, `lang` per page.

### 3.6 Community: feedback, team, support, social
- **AC13** A feedback form (no login, spam-protected) takes suggestions of new people, corrections (with the profile), photos, sources and contact (both optional).
- **AC14** Submissions land in one review queue; the page explains the selection criteria (§7) and that not every suggestion is added.
- **AC17** The feedback page offers **joining the team** (research, fact-checking, writing, translation, photos, social media, design, code), which opens the same form tagged `type=volunteer`. A **Support** page (`/support/`, in the footer) has a Monobank jar, Patreon and Buy Me a Coffee, "join the team", and the social pages. **About** links to Support, joining, and the social pages (Instagram, Threads), where the same stories are posted for the community. Every external link is set in `src/site.ts` and hidden until its URL is set.

### 3.7 Other pages
About (mission, selection criteria, privacy) · Image credits · a friendly 404 in each language.

### 3.8 Later and non-goals
- **Later (Phase 3):** personality quiz «Хто з видатних українців схожий на тебе?» (8–10 questions, shareable result, written so controversial figures aren't trivialized) · printable teacher pages · a git-based CMS for non-technical editors.
- **Non-goals:** accounts, comments, a database or server code, ads, native apps.

---

## 4. Architecture

| Area | Choice |
|---|---|
| Framework | **Astro**, static output, minimal client JS (`src/scripts/`) |
| Content | Markdown + frontmatter, schema-validated (`src/content.config.ts`) |
| i18n | Both languages prefixed; UI strings in `src/i18n/{uk,en}.json` (same keys, tested) |
| Search and filters | Client-side over the rendered cards (`src/scripts/filter.ts`) |
| Map | Static SVG drawn at build time from geoBoundaries (OpenStreetMap, ODbL); continent cards from Natural Earth land (public domain), with Ukraine from the oblast outlines, because Natural Earth's default edition puts Crimea in Russia (`src/lib/world.ts`) |
| Images | Astro image optimization; free portraits self-hosted with credits |
| Share cards | Built at build time (Satori + resvg + sharp, `src/lib/og.ts`) |
| Theme | `light-dark()` colour tokens; `public/theme.js` sets it before paint (the CSP allows no inline scripts) |
| Forms | Tally, embedded (D17) |
| Hosting | Cloudflare Pages ($0), deployed by GitHub Actions after all checks ([docs/PUBLISHING.md](docs/PUBLISHING.md)) |
| Analytics | Cloudflare Web Analytics (no cookies) |
| Security | Strict CSP and headers (`public/_headers`), `dist/` check, `npm audit`, Dependabot ([docs/SECURITY.md](docs/SECURITY.md)) |

Code layout: thin routes in `src/pages/{uk,en}/` render shared views in `src/views/`; components in `src/components/`; helpers in `src/lib/` (published = reviewed in both languages: `src/lib/people.ts`); site settings in `src/site.ts`.

**Quality gates (CI):** schema validation with a uk/en fact-parity check (AC5) · Vitest unit tests (filters, search normalization, Daily Hero dates, read marks, observation, theme, `aliases.json` has one entry per profile) · Playwright smoke tests under the real CSP (filters survive "back", language switch, no-JS view, 404) · Lighthouse budget (AC10) · dependency audit · `dist/` holds nothing private.

---

## 5. Decisions

| Date | ID | Decision |
|---|---|---|
| 2026-09-29 | D1 | Tech stack: **Astro**. |
| 2026-09-29 | D2 | Detail view: **a full page per person**, not a modal. |
| 2026-09-29 | D3-R | **Bilingual launch:** a profile is public only when reviewed in uk and en; authoring starts in Ukrainian. |
| 2026-09-29 | D4 | **One file per person** per language. |
| 2026-09-29 | D5 | **AI drafts from cited sources + mandatory human review** (`reviewed: true`). |
| 2026-09-29 | D6 | Images: **public domain or freely licensed (Wikimedia Commons), self-hosted, with attribution**, or written permission. Exception: 6 fair-use portraits (Mykolaichuk, Sukhomlynskyi, Tsybukh, Petrychenko, owner decision 2026-10-05, against the recommendation; 2026-10-06: Ostap Vyshnia, an AI-made image whose source photograph is not identified, and Prymachenko, AI-colorized from the uk.wikipedia fair-use photo), marked `fair_use: true`: on the site only, never in share cards or structured data, removed the same day on a rights holder's request. AI-colorized or restored versions of a free photo are allowed (`ai_edit:`); the credit keeps the original author, license and source and says so; a result that changes the person's look is not used (owner exceptions, 2026-10-06, against the recommendation: Mechnykov; Dovzhenko, Petliura and Solovianenko, whose AI versions change the face, clothes or insignia and are labelled `rendered`, not a real photograph; Amosov, Kondratiuk, Korolov and Prymachenko, whose faces also changed, labelled colorized at the owner's request). A painting may be rendered as a photo-like image (`ai_edit: rendered`, owner decision 2026-10-06, first: Repin's 1887 self-portrait); its credit says it is not a real photograph. |
| 2026-09-29 | D7 | Hosting: **Cloudflare Pages**, deployed by GitHub Actions from a personal GitHub account. |
| 2026-09-29 | D8 | **Living people may be included** (§7.6). |
| 2026-09-29 | D10 | Search: **simple, client-side**. |
| 2026-09-29 | D11 | Analytics: **Cloudflare Web Analytics**. |
| 2026-10-06 | D12 | **Home layout:** explore tabs (Search, Eras, Map, Fields), one at a time, over one results grid; changing tabs clears the filters. (Replaced group sections + filter bar, and before that a grid with chips.) |
| 2026-09-29 | D13 | **New additions:** home row + `/new/` + "Нове" badge + RSS; social posts per batch after launch, on Instagram and Threads (D13-E). |
| 2026-09-29 | D14 | **Categories:** one `group` per person + many `tags`. Groups: `statehood`, `literature`, `visual-arts`, `performing-arts`, `science`, `civic`, `faith`, `sport`, `defenders` (`src/content/categories.json`). |
| 2026-10-06 | D15 | **Map:** a static SVG of the oblasts drawn at build time, no tiles or third-party requests, tied to the filters. (Replaced Leaflet/MapLibre.) |
| 2026-10-05 | D16 | **Portraits in full colour** everywhere on the site; the cobalt treatment remains only on share cards. Commissioned illustrations for featured figures later, if ever. |
| 2026-09-29 | D17 | **Feedback form:** Tally (free, spam protection, no login). |
| 2026-09-29 | G4 | Selection criteria per §7. |
| 2026-09-29 | — | **Content before promotion:** soft launch on `pages.dev`; buy the domain before promoting widely. |
| 2026-09-29 | — | **Dates:** new style (Gregorian) from 1582; earlier dates as in the sources (Julian). |
| 2026-09-29 | — | **URLs:** Ukrainian under `/uk/` (`uk` is the language code; `ua` is the country). |
| 2026-10-03 | — | **English surnames: official -skyi** (Hrushevskyi). Exceptions: established personal spellings (Igor Sikorsky, Bohdan Hawrylyshyn, Zelenskyy), official names of things (*Akademik Vernadsky* station), non-Ukrainians. Feminine forms keep -ska. |
| 2026-10-05 | — | **No animated portraits** (tried, some clips read as disrespectful; removed). A рушник border and the «вишиванка імен» tagline were tried and rolled back. A timeline strip under the eras was tried and dropped for the map. |
| 2026-10-06 | — | **Content balance is checked by hand, with no quotas** and no gender field (§7.2). |
| 2026-10-06 | — | **Batch 5 published after an independent AI fact-check, without the owner's review** (owner decision; an exception to D5 for this batch): every profile drafted from cited sources, then checked fact by fact by a separate agent. Bubka, the Klitschko brothers and Yalovtsov, earlier excluded, were reinstated. Fallen defenders whom no encyclopedia covers yet (Yalovtsov, like Tsybukh, Kryvtsov, Hryntsevych) rest on the state-award decree and official sources instead of the encyclopedic source in §7.3. |
| 2026-10-06 | — | **Donations and volunteers:** Support page, social links, "join the team" (§3.6). Donations are voluntary and don't change "no ads, no paywall". |

---

## 6. Roadmap

| Phase | Scope | Status |
|---|---|---|
| **0. Setup** | Scaffold, schema, CI, deploy | ✅ 2026-10-05 |
| **1. MVP** | §3.1–3.7, ≥ 20 profiles in both languages | ✅ soft launch 2026-10-05 (86 profiles); public launch after the domain and promotion |
| **2. Growth** | 100–200 profiles in batches of 20–25, linked to each other · social posts per batch · quotes and galleries | In progress: 110 profiles (batch 5 and Farion, 2026-10-06) |
| **3. Engagement** | Quiz · printable teacher pages · CMS | Later |

---

## 7. Editorial policy

1. **Selection criteria** (published on About): lasting impact on Ukrainian statehood, culture, science or identity, or major world contributions by people of Ukrainian origin.
2. **Balance, checked by hand:** no quotas. When choosing each batch, editors look at what's thin: eras (including Kyivan Rus and the Lithuanian-Polish period), fields, regions (the map shows empty oblasts), women and men, living people, and the diaspora.
3. **Facts:** ≥ 2 reputable sources per profile, at least one encyclopedic (e.g. Енциклопедія сучасної України, Енциклопедія історії України). Wikipedia alone is not enough.
4. **Contested figures:** neutral tone; state the achievements and include "Debates and assessments" with sources.
5. **"Ukrainian" claims:** state the connection precisely: born in Ukraine, of Ukrainian descent, or worked in Ukraine. Don't overclaim.
6. **Living people:** public roles only; freely licensed images; "as of <date>"; removal and correction requests handled promptly.
7. **Corrections** go through the feedback form ("Report a mistake" on every profile).
8. **Licenses:** site text CC BY-SA 4.0; code MIT; images per file ([docs/LICENSE-CONTENT.md](docs/LICENSE-CONTENT.md)).

**Review checklist per profile:** facts match ≥ 2 sources → dates → neutral tone → summary and role within limits → fun fact sourced → English matches Ukrainian → `reviewed: true` and `last_reviewed`. Upkeep: [docs/MAINTENANCE.md](docs/MAINTENANCE.md).

---

## 8. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Factual errors / AI hallucinations | High | Sources + review gate; encyclopedic source required (§7.3) |
| Content effort stalls the project | High | Batches of 20–25; AI drafts + human review; volunteers (§3.6) |
| Two languages double the effort | High | Draft in Ukrainian, AI-assisted translation + review (D3-R) |
| Controversy (selection, contested figures, "Ukrainian" claims) | Medium | Published criteria, neutral tone, debates sections, precise origins (§7) |
| Image copyright | Medium | Free or permitted images only, per-file licenses, initials until resolved; the 6 fair-use portraits come down on request (D6) |
| Uneven portrait quality | Medium | AI colorizing/restoring from the credited photo, checked against the original (D6) |
| Form spam | Medium | Tally spam protection |
| Deploy pipeline unavailable | Low | Manual deploy from a laptop ([docs/PUBLISHING.md](docs/PUBLISHING.md)) |

## 9. Costs

Hosting, analytics, forms, fonts and Commons images: **$0**. Domain ~$10–12 per year. Donations go to these costs, photo permissions and, if ever, commissioned illustrations.

---

## 10. Built so far

Closed backlog items, by ID; details are in git history.

| Date | What |
|---|---|
| 2026-09-29 | Content schema; home page v1 (era ribbon, filter bar, group sections, newly added, Нове badge); profile page; `/new/` + RSS; English version; Daily Hero; share cards; About; read marks; era pictures; misconception card (I3–I9, I13) |
| 2026-10-03 | Security headers and CI checks (L6); SEO code: sitemap, `robots.txt`, JSON-LD (L7, code part); Lighthouse budget (L8); 404 page (L9); Playwright smoke tests (L12); license files (L5) |
| 2026-10-04 | All profiles reviewed in both languages (L1); copyrighted portraits replaced or removed; feedback form on Tally (L4); Web Analytics on |
| 2026-10-05 | On GitHub and deployed (L2); secret scanning and Dependabot; real-phone mobile pass (I14); colours per field and motion; portraits in full colour (D16); field tiles instead of sections (I18 A); era ribbon with colour, pictures, faces and a sliding highlight (I19) |
| 2026-10-06 | Birthplace map (I20); explore tabs (D12); reading progress and observation cards above the tabs (I21); Support page, "join the team", social links (I1, I2); light and dark theme; `aliases.json` for cross-profile links (I17 B, first part); manual content balance (L14) |
| 2026-10-06 | Cross-profile links, first pass (I17 A/B): names in the story text link to the profile at the sentence that explains the tie, both languages, guarded by a test; 20 new `related:` entries; a "Links" column in CANDIDATES.md |
| 2026-10-06 | Born outside Ukraine on the map (I20): continent cards (Natural Earth coastlines, Ukraine from the oblast outlines), a dot for each of the 10 people born abroad; coordinates for Orlyk, and approximate ones for Teliha and Amosov |
| 2026-10-06 | Disputed birthplaces on the map: a hollow ring for "one of the versions" (Sirko at Murafa, after Yu. Mytsyk); Sirko's birth year corrected to c. 1618 (Encyclopedia of the History of Ukraine); the other five unknown birthplaces researched and kept unknown |
| 2026-10-06 | Cross-profile links, second pass (I17 A): the one-way `related:` links reviewed: 21 made two-way where there is a personal tie (Drahomanov, Hrushevskyi and Kotsiubynskyi with Franko; Orlyk with Mazepa; Bohun and Sirko with Khmelnytskyi; Stus with Chornovil, Kostenko and Paradzhanov; and others), 18 more links in the text; 56 left one-way on purpose (influence or theme) |
| 2026-10-06 | Batch 5: 23 profiles (86 → 109): Repin, Krymskyi, Zerov, Dziuba, Briukhovetskyi, Vynnychenko, Vyshyvanyi, Dzhemilev, Sentsov, Yalovtsov, Kondratiuk, Hetman, Huzar, Boiko, Solovianenko, Silvestrov, Ivasiuk, Kuzma Skriabin, Vakarchuk, Blokhin, Bubka, Vitali and Wladimir Klitschko; drafted and fact-checked in five groups (8 errors found and fixed); linked to existing profiles in both directions |
| 2026-10-06 | Iryna Farion (110): drafted and fact-checked by separate agents (4 errors fixed), published on the same terms as batch 5; contested-figure section covers the 2010 and 2023 controversies, the dismissal case and the first-instance verdict of 1 October 2026 |
