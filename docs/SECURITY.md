# Security

## Reporting a problem

Please report security issues **privately**: on GitHub, open the repository's **Security** tab → **Report a vulnerability**. Don't open a public issue for security problems.

Factual errors in profiles aren't security issues: use the suggestion form on the site, or open an issue.

## How the content is protected

- **Only the owner can change the repository.** There are no collaborators, deploy keys or webhooks. Anyone else can only propose changes through a pull request, which the owner reviews.
- **`main` is protected** (repository ruleset "Protect main"): it can't be deleted or force-pushed, and history stays linear, so published content can't be silently rewritten.
- **Workflows from outside contributors** need the owner's approval before they run, and they never receive repository secrets. The workflow token is read-only (`permissions: contents: read`), and only GitHub-owned actions are allowed.
- **Deploys** happen only from `main`, after every check in `.github/workflows/ci.yml` passes. The Cloudflare token lives only in GitHub's encrypted Actions secrets and is limited to Cloudflare Pages.
- **Secrets never enter the repository:** GitHub secret scanning with push protection blocks commits that contain credentials, and CI fails if the deploy folder contains repository files or secrets (`scripts/check-dist.mjs`).
- **Dependencies:** Dependabot alerts and security updates are on; CI fails on any new, unreviewed advisory (`scripts/check-audit.mjs`).
- **The website** is static files only (no server, database or login), served with a strict Content-Security-Policy (`public/_headers`).

## For the owner

- Keep two-factor authentication on for the GitHub and Cloudflare accounts.
- Use short-lived, fine-grained tokens; never paste tokens into chats, issues or files. Revoke any token that was exposed.
- Review pull requests from others before merging, especially changes to `.github/`, `scripts/`, `package.json` and `public/_headers`.

## Access for collaborators

Contributors never need a role on the repository: on a public repo anyone can fork it and open a pull request ([CONTRIBUTING.md](../CONTRIBUTING.md)). That is how most open-source projects stay tight: many people propose, few can merge, one person administers.

| Who | Access | Can | Can't |
|---|---|---|---|
| Anyone | none (fork + pull request) | propose changes, comment | push, merge, run workflows unapproved, see secrets |
| Editors (trusted regulars) | **Triage** (needs an organization, below) | label and close issues, request reviews, review pull requests | push, merge, change settings |
| Maintainers (if ever) | **Write**, held back by the ruleset | merge pull requests a code owner approved | push to `main` directly, force-push, delete `main`, change settings or secrets |
| Owner | Admin | everything; pushes to `main` directly (ruleset bypass) | — |

**Teams need an organization.** This repository belongs to a personal account, which has only the owner and collaborators (collaborators get Write, with no finer roles or teams). To give a group access without adding individuals, move the repository to a free GitHub organization (e.g. `namesofukraine`): Settings → Transfer. Old URLs and clones redirect. Secrets and rulesets move with the repository, but check them and run a deploy afterwards; CODEOWNERS and the docs then need the new owner's name. Then create teams (`editors` with Triage, later `maintainers` with Write) and manage people in the team, not on the repo. Keep the owner the organization's only owner, with 2FA required for all members.

### Settings checklist (owner, before inviting anyone)

1. **Ruleset "Protect main"** (Settings → Rules): keep *no deletion*, *no force push*, *linear history*; add *require a pull request* (1 approval, **review from code owners**, dismiss stale approvals, resolve conversations) and *require status checks* (`build`, up to date with `main`). Add the owner (Repository admin role) to the **bypass list**, so the owner's direct pushes still deploy.
2. **Actions** (Settings → Actions → General): require approval for workflows from **all outside collaborators**; default workflow permissions **read**; don't let Actions create or approve pull requests.
3. **Merging** (Settings → General): squash merging only; delete branches after merge.
4. **Security** (Settings → Code security): private vulnerability reporting, secret scanning and push protection, Dependabot alerts (already on).
5. **CI** (`.github/workflows/ci.yml`): move the Cloudflare secrets from the job's `env` into a separate deploy job that runs only on pushes to `main` (ideally with a `production` environment limited to `main`), so no build or test step ever holds the token; pin third-party actions to a commit SHA (Dependabot updates them). Never use `pull_request_target` with a checkout of PR code.
6. **Test** with a pull request from a second account: the checks wait for approval, merging is blocked without the owner's review, and no secret appears in the log.

`.github/CODEOWNERS` makes the owner the reviewer of everything; editors can later own `src/content/`, while `.github/`, `scripts/`, `public/_headers`, `src/site.ts` and `package.json` stay with the owner.
