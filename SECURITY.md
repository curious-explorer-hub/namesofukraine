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
