# Maintenance

Recurring work that keeps the site accurate and alive. Publishing mechanics are in [docs/PUBLISHING.md](PUBLISHING.md).

## Recurring tasks

### Weekly: review feedback (about 30–60 minutes, e.g. every Monday)

Readers send messages through «Зворотний зв'язок» / "Feedback" (`/uk/feedback/`), a Tally form (<https://tally.so/r/A7Vpkl>). Every profile links to it with the profile pre-filled.

#### 1. Pull the submissions

```sh
npm run feedback                      # last 7 days
npm run feedback -- --since 2026-10-01
npm run feedback -- --show-email      # only when you need to reply
```

The script (`scripts/pull-feedback.mjs`) reads the Tally API key from `$TALLY_API_KEY` or `~/.tally-key` and prints a Markdown summary grouped by topic: new person, correction, photo, other. For each submission it shows the profile and a link to it. Email addresses stay hidden unless you ask.

**Privacy:** submissions contain personal data (names, emails, sometimes about living people). Read them in the terminal or the Tally dashboard; **never paste them into this public repository**, its issues or commit messages. Refer to a submission by its id (e.g. `EqrD1LL`) when needed.

#### 2. Triage each submission

| Topic | What to do |
|---|---|
| **New person** | Check against the selection criteria (product_vision.md §7). If it fits, add a row to [CANDIDATES.md](CANDIDATES.md) (status Backlog, source "Reader suggestion"); if not, note why in the log. |
| **Correction** | Treat as a claim to verify, not a fact: check the profile against ≥ 2 reputable sources (encyclopedias first; product_vision.md §7.3). Fix if confirmed, in **both** `uk` and `en` files. If the sources disagree, keep the better-sourced value and mention the other. |
| **Photo or addition** | Use only images that are public domain or freely licensed, or with written permission from the rights holder. Keep the permission (email) privately; credit as agreed. |
| **Living people** | Removal or correction requests by or about a living person go first and are answered within days (§7.6). |
| **Spam or abuse** | Delete in Tally. |

#### 3. Propose the edits

- Summarize the week: how many submissions, what was accepted, what was rejected and why, and what's still open.
- Make the accepted changes on a branch or directly on `main`. Run the checks before pushing:

```sh
npm run check && npm test && npm run test:e2e
```

  Every push to `main` deploys after CI passes ([docs/PUBLISHING.md](PUBLISHING.md)).
- Record the week in the log below: date, submission ids, outcome. No personal data.
- If the sender left an email and asked for a reply, answer (`--show-email`).

#### Doing it with Claude Code

Ask in this repository:

> Run `npm run feedback` for the last 7 days, summarize the submissions by topic, check each correction against reputable sources, propose the edits (uk + en) and new CANDIDATES.md rows, and wait for my approval before changing anything. Don't copy personal data into the repo.

### Every ~50 days: refresh the Threads token

The daily Threads posts ([PUBLISHING.md](PUBLISHING.md#posting-to-threads)) use a long-lived token in the `THREADS_ACCESS_TOKEN` repository secret. It lasts 60 days; once it expires, the workflow fails and nothing is posted. **Current token expires 2026-12-09; refresh by 2026-11-29.** A refresh gives a new 60-day token and works only while the old one is still valid (and at least a day old).

1. Get the current token: the secret can't be read back from GitHub, so use the copy you keep in your password manager. If it's lost or expired, generate a new one instead (PUBLISHING.md, one-time setup, step 3).
2. Refresh it, in a terminal (`read -s` keeps it out of the shell history):

   ```sh
   read -s "TOKEN?Current token: "; echo
   curl -s "https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=$TOKEN"
   ```

   The reply is `{"access_token":"TH…","token_type":"bearer","expires_in":5183944}`; `expires_in` is in seconds (≈ 60 days).
3. Check the new token and note its expiry date:

   ```sh
   read -s "NEW?New token: "; echo
   curl -s "https://graph.threads.net/v1.0/me?fields=username&access_token=$NEW"   # names_of_ukraine
   curl -s "https://graph.threads.net/v1.0/debug_token?input_token=$NEW&access_token=$NEW"   # expires_at, Unix time
   ```

4. Save it: GitHub → repository **Settings → Secrets and variables → Actions → `THREADS_ACCESS_TOKEN` → Update secret** (or `gh secret set THREADS_ACCESS_TOKEN`), and in your password manager.
5. Update the expiry date above, and set a calendar reminder 50 days ahead.

Never paste a token into an issue, a commit or a chat.

### Every ~50 days: refresh the Instagram token

The same routine for the `INSTAGRAM_ACCESS_TOKEN` secret ([PUBLISHING.md](PUBLISHING.md#posting-to-instagram)). **Expiry: not set up yet** (note the date here once the token exists, and refresh 10 days before it).

```sh
read -s "TOKEN?Current token: "; echo
curl -s "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$TOKEN"   # new access_token, expires_in ≈ 60 days
read -s "NEW?New token: "; echo
curl -s "https://graph.instagram.com/me?fields=user_id,username&access_token=$NEW"   # the site's account
```

Then save it in the secret and your password manager, update the date above and set a reminder, as for Threads. The refresh works only while the token is valid and at least a day old; if it has expired, generate a new one (PUBLISHING.md, Instagram setup, step 4).

### Monthly (about 15 minutes)

- **Next month's Threads plan.** Before the 1st, commit `social/YYYY-MM.txt` for the coming month: one approved profile per day, `-` for a day off, anniversaries on their day (format in [PUBLISHING.md](PUBLISHING.md#posting-to-threads)). Without it, nothing is posted that month.

- **Traffic trend and top pages** (Cloudflare Web Analytics). Which people are read most; which referrers grow. Use this to pick who goes into the next batch and what to post on social media.
- **Search queries** (Search Console → Performance). Which searches show the site, where it ranks, and which pages get impressions but few clicks (those may need a better title or summary).
- **Dependency updates.** Review and merge Dependabot pull requests; CI fails on any new, unreviewed advisory (`scripts/check-audit.mjs`).
- Portraits still missing or weak: follow up on permission requests.

### Quarterly: security review (about 30 minutes)

CI already runs the headers, CSP, `dist/` check and `npm audit`, and Dependabot opens update PRs ([SECURITY.md](SECURITY.md)). Once a quarter, check the live site from the outside:

- Run an OWASP ZAP baseline scan: `docker run --rm -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://namesofukraine.com/uk/`. Fix or note each warning.
- <https://securityheaders.com> still scores A or better; the browser console shows no CSP errors.
- Repository settings still match [SECURITY.md](SECURITY.md) (rulesets, secret scanning, Actions permissions, collaborator access).
- If content ever comes from outside (reader submissions, a CMS), sanitize Markdown/HTML and keep human review.

### Yearly

- `public/.well-known/security.txt`: move `Expires` a year ahead (next: before 2027-10-08); an expired file tells reporters the contact is stale.

## Feedback log

One line per weekly review: date · submissions reviewed (ids) · outcome. No names of senders, no emails.

| Week of | Submissions | Outcome |
|---|---|---|
| 2026-10-05 | EqrD1LL (correction: vasyl-stus) | Open: asks for a different photo and more detail on his imprisonment and persecution |
