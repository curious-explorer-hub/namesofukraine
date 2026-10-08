# AGENTS.md

Context for AI agents working in this repository. Read it before changing anything.

## What this is

**«Знай своїх» / Know Your Own** (<https://namesofukraine.com>; soft launch was at `namesofukraine.pages.dev`, which now redirects): a free, non-profit, static website about the people who made Ukraine, for readers of all ages. Each person has a short, sourced profile in Ukrainian and English, plus a portrait, birthplace and links to related people. No ads, no paywall, no login, no tracking cookies.

**Goals:** accurate, neutral, sourced profiles; fast and accessible on a phone; $0 hosting; easy to keep up to date. The full spec (capabilities, acceptance criteria, decisions, editorial policy) is in [product_vision.md](product_vision.md).

## Tech stack

- **Astro** (static output) with TypeScript; minimal client JS in `src/scripts/`; plain CSS in `src/styles/global.css` (`light-dark()` tokens for the theme).
- Content: Markdown + frontmatter in content collections, validated by zod (`src/content.config.ts`).
- Tests: Vitest (unit and happy-dom), Playwright (smoke tests in `e2e/`), Lighthouse budget (`lighthouserc.json`).
- Share cards: Satori + resvg at build time (`src/lib/og.ts`). Map: a static SVG built at build time (`src/lib/map.ts`, `src/lib/world.ts`).
- Hosting: Cloudflare Pages, deployed by GitHub Actions. Forms: Tally (embedded). Analytics: Cloudflare Web Analytics.
- Node 22 (`.nvmrc`). Runtime dependencies: `astro`, `@astrojs/rss`, `@astrojs/sitemap`, and nothing else.

## Layout

| Path | What |
|---|---|
| `src/content/people/uk/<slug>.md` | All facts (dates, places, group, tags, sources, image, related) + Ukrainian text |
| `src/content/people/en/<slug>.md` | English text only (same slug); facts are never repeated here |
| `src/content/people/uk/images/` | Portraits (self-hosted, credited per file) |
| `src/content/aliases.json` | Name stems per profile for cross-profile link checks (one entry per profile, tested) |
| `src/content/{categories,eras,regions}.json` | Allowed groups/tags, eras, map regions |
| `src/content/pages/{uk,en}/` | Text of About, Support, Feedback, Credits |
| `src/i18n/{uk,en}.json` | UI strings (same keys in both, tested) |
| `src/pages/{uk,en}/` | Thin routes; layouts live in `src/views/` |
| `src/components/`, `src/lib/`, `src/scripts/` | Components; build-time helpers; browser scripts |
| `src/site.ts` | Site settings (form, social and donation URLs) |
| `public/_headers`, `public/_redirects` | CSP and security headers; redirects |
| `scripts/` | CI checks (`check-dist.mjs`, `check-audit.mjs`), feedback pull |

## Docs

| Doc | Read it for |
|---|---|
| [product_vision.md](product_vision.md) | Vision, audiences, capabilities with ACs (§3), architecture (§4), decisions D1–D17 (§5), roadmap, **editorial policy (§7)**, risks, what's been built (§10) |
| [docs/BACKLOG.md](docs/BACKLOG.md) | Current status and open items (**start here to resume work**) |
| [docs/STYLE.md](docs/STYLE.md) | How profiles are written: hook first, short, for readers of all ages |
| [docs/CANDIDATES.md](docs/CANDIDATES.md) | People planned for future batches, with flags and editorial notes |
| [docs/PUBLISHING.md](docs/PUBLISHING.md) | How a change goes live, CI, rollback, manual deploy, the Tally form |
| [docs/MAINTENANCE.md](docs/MAINTENANCE.md) | Recurring work: weekly feedback triage, corrections |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How outside people contribute: principles, pull requests, licensing |
| [docs/SECURITY.md](docs/SECURITY.md) | Repository protections, secrets, reporting, access model for collaborators |
| [docs/LICENSE-CONTENT.md](docs/LICENSE-CONTENT.md) | Licenses for text, images, map data, fonts; the fair-use exceptions |
| [docs/post-launch.md](docs/post-launch.md) | Domain, Search Console and monitoring checklist |

## Contribution principles

- **Keep the stack consistent.** No new frameworks, UI libraries, CSS frameworks or runtime dependencies unless the owner asks. Prefer platform features (CSS, SVG, plain DOM).
- **Keep code clean and lean.** Make the smallest change that solves the task, match the surrounding style and naming, and don't refactor unrelated code.
- **Comments only where they add something** the code can't say (a why, a constraint). No narration, no commented-out code.
- **Both languages, always.** Every UI string goes in both `uk.json` and `en.json`; every profile change touches both files where the text differs.
- **No inline scripts or styles that need `unsafe-inline`.** The CSP in `public/_headers` forbids them; use files in `src/scripts/` or `public/` (e.g. `public/theme.js`).
- **Static only:** no server code, no third-party requests at runtime (fonts, map and images are self-hosted).
- **Nothing private in the repo:** no tokens, `.env` contents, emails or reader submissions. Don't rewrite git history.

## Content rules (summary of product_vision.md §7)

- **Every new profile is a draft** (`status: draft` in the uk file) until the owner reviews it. Never set `status: approved` or `published` unless the owner tells you to approve that profile; then set `status: approved` and add `published: <current UTC time>` (e.g. `published: 2026-10-07T09:00:00Z`) under it. Drafts are not on the site, and links to them render as plain text.
- **Facts:** ≥ 2 reputable sources per profile, at least one encyclopedic (ЕСУ esu.com.ua, ЕІУ history.org.ua, Internet Encyclopedia of Ukraine). Wikipedia alone is never enough. Don't invent quotes, numbers or awards.
- **Sources listed:** at most 4 per profile, no more than one per website, together backing every fact in the text. Fact-checking may use more; if a fact rests only on a source that doesn't make the list, shorten or drop the fact.
- **Limits:** role ≤ 40 characters, summary ≤ 300, in both languages (the schema enforces them).
- **Dates:** Gregorian from 1582; `born_circa` / `died_circa` when uncertain. Living people: `living: true`, and no wording that goes stale ("currently", "still lives"); use "as of <month year>" where needed.
- **Contested figures:** neutral tone and a «Дискусії та оцінки» / "Debates and assessments" section with sources. **"Ukrainian" claims:** state the connection precisely.
- **Gender:** `gender: male` or `female` in the uk file (required); for women the Ukrainian tags show in feminine form (Поетеса, Військова); every tag in `categories.json` has a `uk_female` form.
- **Living people and fallen defenders:** public role and deeds only; nothing private or graphic.
- **Images:** public domain or a free license (Wikimedia Commons; check the license through the API), or written permission; credit author, license and source. Mark AI edits with `ai_edit` (`colorized`, `restored`, `rendered`). Fair use only by owner decision (`fair_use: true`).
- **English names:** official transliteration with -skyi; established personal spellings are exceptions (§5).
- **Cross-links:** link a name in the story text to the profile at the sentence that explains the tie, in both languages; add the slug to `related:`; add the new person to `aliases.json`.

## Build and verify

```sh
npm ci
npm run dev         # http://localhost:4321, shows drafts too
npm run check       # types + content schema
npm test            # Vitest unit and DOM tests
npm run test:e2e    # production build + Playwright smoke tests (desktop + mobile)
node scripts/check-dist.mjs   # after a build: nothing private in dist/
```

Run `check`, `test` and `test:e2e` before every commit. For UI changes, also look at the page in a browser in both themes, both languages and at a phone width.

## Deployment

**Every push to `main` is released to production automatically.** CI (`.github/workflows/ci.yml`) runs the dependency audit, schema check, unit tests, build, `dist/` check, smoke tests and the Lighthouse budget, then deploys `dist/` to Cloudflare Pages (live in about 5–8 minutes). If any step fails, nothing is deployed. Pull requests run the checks but never deploy.

So: verify locally first, commit only when asked, and treat a push to `main` as publishing. Commit messages are plain: no `Co-Authored-By` or other AI attribution lines. After a push, watch CI in the background rather than blocking on it. Roll back from the Cloudflare dashboard (see [docs/PUBLISHING.md](docs/PUBLISHING.md)), then fix in git.
