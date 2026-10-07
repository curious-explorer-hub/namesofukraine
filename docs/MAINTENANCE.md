# Maintenance

Recurring work that keeps the site accurate and alive. Publishing mechanics are in [docs/PUBLISHING.md](PUBLISHING.md); the post-launch checks in [docs/post-launch.md](post-launch.md).

## Weekly: review feedback (about 30–60 minutes, e.g. every Monday)

Readers send messages through «Зворотний зв'язок» / "Feedback" (`/uk/feedback/`), a Tally form (<https://tally.so/r/A7Vpkl>). Every profile links to it with the profile pre-filled.

### 1. Pull the submissions

```sh
npm run feedback                      # last 7 days
npm run feedback -- --since 2026-10-01
npm run feedback -- --show-email      # only when you need to reply
```

The script (`scripts/pull-feedback.mjs`) reads the Tally API key from `$TALLY_API_KEY` or `~/.tally-key` and prints a Markdown summary grouped by topic: new person, correction, photo, other. For each submission it shows the profile and a link to it. Email addresses stay hidden unless you ask.

**Privacy:** submissions contain personal data (names, emails, sometimes about living people). Read them in the terminal or the Tally dashboard; **never paste them into this public repository**, its issues or commit messages. Refer to a submission by its id (e.g. `EqrD1LL`) when needed.

### 2. Triage each submission

| Topic | What to do |
|---|---|
| **New person** | Check against the selection criteria (product_vision.md §7). If it fits, add a row to [CANDIDATES.md](CANDIDATES.md) (status Backlog, source "Reader suggestion"); if not, note why in the log. |
| **Correction** | Treat as a claim to verify, not a fact: check the profile against ≥ 2 reputable sources (encyclopedias first; product_vision.md §7.3). Fix if confirmed, in **both** `uk` and `en` files. If the sources disagree, keep the better-sourced value and mention the other. |
| **Photo or addition** | Use only images that are public domain or freely licensed, or with written permission from the rights holder ([BACKLOG.md](BACKLOG.md), L15). Keep the permission (email) privately; credit as agreed. |
| **Living people** | Removal or correction requests by or about a living person go first and are answered within days (§7.6). |
| **Spam or abuse** | Delete in Tally. |

### 3. Propose the edits

- Summarize the week: how many submissions, what was accepted, what was rejected and why, and what's still open.
- Make the accepted changes on a branch or directly on `main`. Run the checks before pushing:

```sh
npm run check && npm test && npm run test:e2e
```

  Every push to `main` deploys after CI passes ([docs/PUBLISHING.md](PUBLISHING.md)).
- Record the week in the log below: date, submission ids, outcome. No personal data.
- If the sender left an email and asked for a reply, answer (`--show-email`).

### Doing it with Claude Code

Ask in this repository:

> Run `npm run feedback` for the last 7 days, summarize the submissions by topic, check each correction against reputable sources, propose the edits (uk + en) and new CANDIDATES.md rows, and wait for my approval before changing anything. Don't copy personal data into the repo.

## Monthly (about 15 minutes)

- Traffic and search: Cloudflare Web Analytics and Search Console (see [docs/post-launch.md](post-launch.md), "Every month").
- Dependabot pull requests: review and merge; CI fails on new, unreviewed advisories (`scripts/check-audit.mjs`).
- Portraits still missing ([BACKLOG.md](BACKLOG.md), L15): follow up on permission requests.

## Feedback log

One line per weekly review: date · submissions reviewed (ids) · outcome. No names of senders, no emails.

| Week of | Submissions | Outcome |
|---|---|---|
| 2026-10-05 | EqrD1LL (correction: vasyl-stus) | Open: asks for a different photo and more detail on his imprisonment and persecution |
