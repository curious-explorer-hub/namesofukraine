# Publishing

How content gets from this repository to the live site, and what to do when it doesn't.

**Live site:** <https://namesofukraine.pages.dev> (soft launch; `namesofukraine.org` later, see product_vision.md §11 L3).
**Hosting:** Cloudflare **Pages** project `namesofukraine`.
**Deploys:** GitHub Actions, workflow `.github/workflows/ci.yml`.

## How a change goes live

```
edit files ──► commit ──► push to main ──► CI (GitHub Actions) ──► Cloudflare Pages ──► live in ~5–8 min
```

1. **Edit** content (`src/content/…`) or code, and check it locally (see "Check before pushing" below).
2. **Commit and push to `main`.** A push to `main` (or a merged pull request) starts the **CI** workflow.
3. **CI runs every check**, in this order, and stops at the first failure:
   dependency advisories → type and content schema check → unit tests → production build → "nothing private in `dist/`" → browser smoke tests → Lighthouse budget.
4. **CI deploys** `dist/` to the Cloudflare Pages project with `wrangler pages deploy` (the first run also creates the project if it's missing).
5. The new version is live at `namesofukraine.pages.dev` as soon as the deploy step finishes. Each deploy also gets its own preview address (`https://<id>.namesofukraine.pages.dev`), shown at the end of the deploy step's log.

Pull requests run all the checks but **never deploy**; only `main` does.

**Nothing is published unless it's reviewed.** The production build includes a profile only when `reviewed: true` is set in **both** `src/content/people/uk/<slug>.md` and `src/content/people/en/<slug>.md` (decision D3-R). A profile with `reviewed: false` is visible in `npm run dev` but not on the live site.

## Check before pushing

```sh
npm run check      # types + content schema (role ≤ 40 chars, summary ≤ 300, sources, …)
npm test           # unit tests
npm run test:e2e   # production build + browser smoke tests (desktop + mobile)
npm run dev        # http://localhost:4321, shows unreviewed profiles too
```

## Did my change go live?

1. **GitHub → Actions → CI**: the run for your commit should be green, with the step **Deploy to Cloudflare Pages** finished (not "skipped").
2. **Cloudflare dashboard → Workers & Pages → `namesofukraine`** (the one marked *Pages*) → **Deployments**: the newest deployment should match your commit.
3. **Open the page** on `namesofukraine.pages.dev`. If you still see the old version, reload without cache (Shift + reload), or try a private window.

### If something went wrong

| Symptom | Cause | Fix |
|---|---|---|
| CI is red | One of the checks failed | Open the failed step's log, fix, push again. Nothing was deployed. |
| Deploy step "skipped" | The Cloudflare secrets aren't set (or the run wasn't on `main`) | Add the two repository secrets below |
| Deploy step fails with an authentication error | The Cloudflare API token expired or lost its permission | Create a new token and update the secret |
| The page you expect is a 404 | The profile isn't `reviewed: true` in both languages, or the slug differs | Check both files; build locally and look in `dist/` |
| A browser can't open the site at all, but CI deployed | Your computer cached an old DNS answer | Try another network, a phone, or a private window |
| You're looking at `*.workers.dev` and it's out of date | That's a separate **Worker**, not this site (see below) | Use `namesofukraine.pages.dev` |

### A separate Worker exists: ignore or delete it

`namesofukraine.curious-explorer-hub.workers.dev` is a **Worker** created by hand in the Cloudflare dashboard (the dashboard's "Create" button defaults to Workers). It holds an old one-off upload, and **CI never updates it**. To avoid stale copies of the site (and duplicate content for search engines), delete it: **Workers & Pages → the `namesofukraine` entry marked *Worker* → Settings → Delete**. Keep the entry marked *Pages*.

## Undo a bad deploy

**Cloudflare dashboard → Workers & Pages → `namesofukraine` (Pages) → Deployments**, find the last good deployment → **⋯ → Rollback to this deployment**. This takes seconds and doesn't change the repository; fix the problem in Git afterwards, or the next push brings it back.

## Deploy by hand (fallback)

If GitHub Actions is unavailable, deploy from your own computer (you'll be asked to log in to Cloudflare the first time):

```sh
npm ci
npm run build
npx wrangler@4 pages deploy dist --project-name=namesofukraine --branch=main
```

This skips the CI checks, so run `npm run check`, `npm test` and `npm run test:e2e` first.

## Settings this depends on

Names only; the values live in GitHub and Cloudflare, never in this repository.

| Where | Name | What it is |
|---|---|---|
| GitHub → Settings → Secrets and variables → Actions | `CLOUDFLARE_API_TOKEN` | A Cloudflare API token with the permission **Account · Cloudflare Pages · Edit** |
| same | `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account ID (shown in the dashboard URL and on the account overview) |
| `astro.config.mjs` | `site` | The public address; canonical, `hreflang`, sitemap, `robots.txt`, structured data and share cards are built from it |
| `.github/workflows/ci.yml` | `--project-name=namesofukraine` | The Cloudflare Pages project the site deploys to |
| `public/_headers` | — | Security headers (CSP and others), applied by Cloudflare Pages |
| `public/_redirects` | — | Redirects (`/` → `/uk/`), applied by Cloudflare Pages |

Repository protections (protected `main`, approval for outside contributors' workflows, secret scanning) are described in [SECURITY.md](SECURITY.md). Never commit tokens, `.env` files or keys; CI fails if `dist/` contains repository files or secrets (`scripts/check-dist.mjs`).

## Moving to the real domain

See the domain section of [post-launch.md](post-launch.md): register `namesofukraine.org`, add it under the Pages project's **Custom domains**, set `site` in `astro.config.mjs`, push, and redirect the `pages.dev` address to it.

## The feedback form (Tally)

The page «Зворотний зв'язок» / "Feedback" (`/uk/feedback/`, `/en/feedback/`; the old `/suggest/` addresses redirect) embeds one bilingual Tally form: **<https://tally.so/r/A7Vpkl>**, in the owner's Tally workspace (free plan). Every profile ends with a "Report a mistake" link that opens the page as `/feedback/?type=correction&profile=<slug>`; the page passes `lang`, `type` and `profile` into the form as **hidden fields** (`src/lib/suggest.ts`), so each response shows which profile it's about.

**Questions** (bilingual labels): what the message is about (new person / correction to a profile / photo or other addition / something else, required) · who it's about (optional) · the message (required) · sources or links (optional) · email for a reply (optional) · reCAPTCHA. Email notifications for new responses go to the owner's Tally account.

**Editing:** change questions in the Tally dashboard; keep the three hidden fields with exactly these names. Responses are under the form's **Submissions** tab (they can also go to a Google Sheet via Integrations).

**Turning the form off:** set `SUGGEST_FORM_URL` in `src/site.ts` to `''` and push; the page then says the form is coming soon.

Answer corrections from or about living people promptly (product_vision.md §7.6).
