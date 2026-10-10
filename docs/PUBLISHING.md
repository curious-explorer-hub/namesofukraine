# Publishing

How content gets from this repository to the live site, and what to do when it doesn't.

**Live site:** <https://namesofukraine.com> (Cloudflare Pages custom domain; the project's own address `namesofukraine.pages.dev` redirects to it).
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
5. The new version is live at `namesofukraine.com` as soon as the deploy step finishes. Each deploy also gets its own preview address (`https://<id>.namesofukraine.pages.dev`), shown at the end of the deploy step's log.

Pull requests run all the checks but **never deploy**; only `main` does.

**Nothing is published until the owner approves it.** **Moderation:** every new profile starts as `status: draft` in its Ukrainian file. Drafts live in the repository and show in `npm run dev`, but never on the site; links to them in other profiles' text show as plain text until then. Only the owner approves a profile, after reading it: set `status: approved` and add `published: <current UTC time>` (e.g. `published: 2026-10-07T09:00:00Z`) under it. That time orders the New page, the "Нове" badge and RSS. The build fails if an approved profile has no `published`.

## Check before pushing

```sh
npm run check      # types + content schema (role ≤ 40 chars, summary ≤ 300, sources, …)
npm test           # unit tests
npm run test:e2e   # production build + browser smoke tests (desktop + mobile)
npm run dev        # http://localhost:4321, shows drafts too
```

## Did my change go live?

1. **GitHub → Actions → CI**: the run for your commit should be green, with the step **Deploy to Cloudflare Pages** finished (not "skipped").
2. **Cloudflare dashboard → Workers & Pages → `namesofukraine`** (the one marked *Pages*) → **Deployments**: the newest deployment should match your commit.
3. **Open the page** on `namesofukraine.com`. If you still see the old version, reload without cache (Shift + reload), or try a private window.

### If something went wrong

| Symptom | Cause | Fix |
|---|---|---|
| CI is red | One of the checks failed | Open the failed step's log, fix, push again. Nothing was deployed. |
| Deploy step "skipped" | The Cloudflare secrets aren't set (or the run wasn't on `main`) | Add the two repository secrets below |
| Deploy step fails with an authentication error | The Cloudflare API token expired or lost its permission | Create a new token and update the secret |
| The page you expect is a 404 | The profile is still `status: draft`, its English file is missing, or the slug differs | Check both files; build locally and look in `dist/` |
| A browser can't open the site at all, but CI deployed | Your computer cached an old DNS answer | Try another network, a phone, or a private window |
| You're looking at `*.workers.dev` and it's out of date | That's a separate **Worker**, not this site (see below) | Use `namesofukraine.com` |

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
| same | `THREADS_ACCESS_TOKEN` | A long-lived Threads user token for posting (see [Posting to Threads](#posting-to-threads)); expires after 60 days |
| same | `INSTAGRAM_ACCESS_TOKEN` | A long-lived Instagram user token for posting (see [Posting to Instagram](#posting-to-instagram)); expires after 60 days |
| `astro.config.mjs` | `site` | The public address; canonical, `hreflang`, sitemap, `robots.txt`, structured data and share cards are built from it |
| `.github/workflows/ci.yml` | `--project-name=namesofukraine` | The Cloudflare Pages project the site deploys to |
| `public/_headers` | — | Security headers (CSP and others), applied by Cloudflare Pages |
| `public/_redirects` | — | Redirects (`/` → `/uk/`), applied by Cloudflare Pages |

Repository protections (protected `main`, approval for outside contributors' workflows, secret scanning) are described in [SECURITY.md](SECURITY.md). Never commit tokens, `.env` files or keys; CI fails if `dist/` contains repository files or secrets (`scripts/check-dist.mjs`).

## The domain

`namesofukraine.com` is registered at Cloudflare Registrar (auto-renew on) and added under the Pages project's **Custom domains**; `site` in `astro.config.mjs` uses it for canonical URLs and the sitemap. `www.namesofukraine.com` and `namesofukraine.pages.dev` redirect to it with an account-level Cloudflare Bulk Redirect (`_redirects` can't match on the host name).

## The feedback form (Tally)

The page «Зворотний зв'язок» / "Feedback" (`/uk/feedback/`, `/en/feedback/`) embeds one bilingual Tally form: **<https://tally.so/r/A7Vpkl>**, in the owner's Tally workspace (free plan). Every profile ends with a "Report a mistake" link that opens the page as `/feedback/?type=correction&profile=<slug>`; the page passes `lang`, `type` and `profile` into the form as **hidden fields** (`src/lib/suggest.ts`), so each response shows which profile it's about.

**Questions** (bilingual labels): what the message is about (new person / correction to a profile / photo or other addition / something else, required) · who it's about (optional) · the message (required) · sources or links (optional) · email for a reply (optional) · reCAPTCHA. Email notifications for new responses go to the owner's Tally account.

**Editing:** change questions in the Tally dashboard; keep the three hidden fields with exactly these names. Responses are under the form's **Submissions** tab (they can also go to a Google Sheet via Integrations).

**Turning the form off:** set `SUGGEST_FORM_URL` in `src/site.ts` to `''` and push; the page then says the form is coming soon.

Answer corrections from or about living people promptly (product_vision.md §7.6).

## Posting to Threads

**Post a profile:** GitHub → Actions → **Post to Threads** → Run workflow, paste a profile link (e.g. `https://namesofukraine.com/uk/people/ivan-franko/`). The first run is a dry run by default: the log shows the post without publishing it. Untick **Dry run** to publish; the log ends with the post's link. The post is in Ukrainian: the profile's share card (portrait in full colour) with name and years, role, summary, then the story's closing section on why the person matters («Чому це важливо сьогодні» and the like) and the profile link. When that doesn't fit in 500 characters, the closing section follows as replies to the post, split between sentences, and the link ends the last reply. Only profiles live on the site can be posted. Locally: `node scripts/post-threads.mjs <link> --dry-run`.

**Monthly plan:** at the start of each month, commit `social/YYYY-MM.txt` (e.g. `social/2026-11.txt`) to `main`. Line N is the post for day N: a profile link or slug, or `-` for a day with no post; anything after `#` is a comment. Every day at 07:00 UTC (10:00 Kyiv in summer, 09:00 in winter) the workflow posts that day's entry, by the Kyiv date; a manual run with an empty profile link does the same. A month with no plan, a `-` line or a day past the last line posts nothing. Don't leave a line empty: `npm test` fails, so a stray blank line can't shift the rest of the month by a day. The tests also check that each entry is an existing profile; a draft passes them, but its day fails at posting time because it isn't on the site, so plan only approved profiles. To check today's entry, run the workflow by hand with an empty profile link and **Dry run** ticked.

```text
ivan-franko                                              # 1st
lesya-ukrainka                                           # 2nd
-                                                        # 3rd: no post
https://namesofukraine.com/uk/people/taras-shevchenko/   # 4th
```

**One-time setup** (the Threads profile needs an Instagram account):

1. At <https://developers.facebook.com/apps>, create an app with the use case **Access the Threads API**, and add the permissions `threads_basic` and `threads_content_publish`.
2. Under **App roles → Roles**, add the site's Threads profile as a **Threads Tester**, then accept the invite in Threads (Settings → Account → Website permissions → Invites). The app can stay in development mode: it only posts to accounts that have a role in it.
3. Generate a user token for that profile in the use case's settings, and exchange it for a long-lived one (60 days): `https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=<app secret>&access_token=<token>`.
4. Save the long-lived token as the `THREADS_ACCESS_TOKEN` repository secret.

**Every ~50 days:** refresh the token before it expires; steps in [MAINTENANCE.md](MAINTENANCE.md#every-50-days-refresh-the-threads-token). An expired token makes the workflow fail; nothing is posted.

## Posting to Instagram

**Post a profile:** GitHub → Actions → **Post to Instagram** → Run workflow, as for Threads: a profile link, or empty for today's entry in the same monthly plan (`social/YYYY-MM.txt`), and **Dry run** ticked by default. The post is a carousel, so it reads in full in the app (Instagram captions can't hold clickable links): the profile's 4:5 card (`/og/instagram/<slug>.jpg`, 1080×1350, built with the site, portrait in full colour; profiles with a fair-use portrait get a text-only card), then text slides `/og/instagram/<slug>/2.jpg…` with the summary, the first three key accomplishments, the story's closing section on why the person matters, and the quote or else the fun fact. The Ukrainian caption is name and years, role, the start of the story in whole paragraphs (up to about 1,500 characters), then «Повна історія, фото й джерела — за посиланням у профілі:», the profile address as plain text and hashtags. Like Threads, it also posts that day's entry every day at 07:00 UTC; the two workflows run separately, so one failing doesn't stop the other. Locally: `node scripts/post-instagram.mjs <link> --dry-run`.

**Preview before posting:** `npm run build`, then `node scripts/preview-social.mjs <link or slug> [more…]` writes `.social-preview/<slug>.html` (not committed) from the local build: the carousel to swipe, the caption folded as Instagram shows it, and the Threads post with its card. Use it to check a change to the cards or captions on a branch, before it reaches the live site.

**One-time setup** (in the same Meta developer account as Threads):

1. Make the site's Instagram account a **professional** account (Business or Creator): Instagram → Settings → **Account type and tools → Switch to professional account**. Set the bio link to `https://namesofukraine.com/uk/`.
2. Create a separate Meta app for Instagram (<https://developers.facebook.com/apps> → **Create app**): the Instagram API needs a **Business** type app, which the Threads app isn't. Use case **Manage messaging & content on Instagram**; app type **Business** if asked; it can stay in development mode. No App Review is needed: Standard Access covers accounts you own and have added to the app. Open **API setup with Instagram login**, and add the permissions `instagram_business_basic` and `instagram_business_content_publish`.
3. If the dashboard asks for it, add the account under **App roles → Roles → Instagram Tester** and accept the invite (Instagram on the web → Settings → **Apps and websites → Tester invites**).
4. In **Instagram → API setup with Instagram business login → 1. Generate access tokens**, click **Add account**, log in as the site's Instagram account and approve, then **Generate token**. Dashboard tokens are already long-lived (60 days); no exchange step as for Threads. Skip the webhooks and business login sections.
5. Check it: `curl -s "https://graph.instagram.com/me?fields=user_id,username&access_token=<token>"` returns the account's username.
6. Save it as the `INSTAGRAM_ACCESS_TOKEN` repository secret, and in your password manager.

**Every ~50 days:** refresh the token; steps in [MAINTENANCE.md](MAINTENANCE.md#every-50-days-refresh-the-instagram-token).
