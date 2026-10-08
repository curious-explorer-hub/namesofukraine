# Contributing

Thank you for helping «Знай своїх» / Know Your Own. The site is a non-profit project by volunteers: short, sourced profiles of the people who made Ukraine, in Ukrainian and English.

## Ways to help

| You want to… | Do this |
|---|---|
| Suggest a person, report a mistake, offer a photo | Use the form on the site: [Зворотний зв'язок / Feedback](https://namesofukraine.com/uk/feedback/). No GitHub account needed. |
| Join the team (research, writing, translation, photos, code) | Choose "Join the team" in the same form; we'll reply with a starter task. |
| Fix or add something yourself | Open a pull request (below). |
| Report a security problem | Privately, see [docs/SECURITY.md](docs/SECURITY.md). Never in a public issue. |

## Principles

1. **Everything goes through a pull request.** Nobody pushes to `main` except the owner. A push to `main` publishes the site within minutes, so every outside change is reviewed first.
2. **Facts need sources.** Every fact is backed by a reputable source, at least one of them an encyclopedia; Wikipedia alone is never enough. A profile lists at most 4 sources, one per website ([product_vision.md](product_vision.md) §7).
3. **Neutral, short and engaging.** Write for a curious reader of any age: what the person did and why it matters, not every date and office.
4. **Both languages.** Ukrainian holds the facts; English mirrors the text. A profile goes live only when the owner approves it.
5. **Respect people.** Living people: public role only. Fallen defenders: public service and deeds; nothing private or graphic.
6. **Only images you may use:** public domain or a free license (Wikimedia Commons), or written permission. Say so in the pull request.
7. **Keep the code small.** Same stack (Astro, TypeScript, plain CSS), no new dependencies without agreement, no inline scripts (the security policy blocks them). See [AGENTS.md](AGENTS.md).
8. **One topic per pull request.** A new person, a correction, or one code change: easier to review, quicker to merge.

## Making a pull request

1. **Fork** the repository on GitHub and clone your fork. Node 22 (`.nvmrc`).
2. Create a branch: `git checkout -b add-<slug>` (or `fix-…`).
3. Make the change:
   - **New person:** `src/content/people/uk/<slug>.md` (all facts + Ukrainian text) and `src/content/people/en/<slug>.md` (English text), with `status: draft` in the Ukrainian file; copy the structure of an existing profile such as `taras-shevchenko.md`. Add the name to `src/content/aliases.json`. Check [docs/CANDIDATES.md](docs/CANDIDATES.md) first.
   - **Correction:** change both language files where the text differs, and add or replace the source that backs it.
   - **Portrait:** `src/content/people/uk/images/<slug>.jpg` (long side ≤ 1600 px) with author, license and source page in the `image:` block.
4. Check it:
   ```sh
   npm ci
   npm run check      # types + content schema
   npm test           # unit tests
   npm run test:e2e   # build + browser smoke tests
   npm run dev        # http://localhost:4321, shows drafts too
   ```
5. Open the pull request against `main` and fill in the template. The checks run automatically; for a first-time contributor they start once a maintainer approves them.

**Review:** the owner (or an editor) checks the facts against the sources, the tone and the image licence, may push small fixes, and merges. A new profile stays a draft until the owner approves it; fixes to published profiles go live when merged.

## License of contributions

By opening a pull request you agree that your text is published under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) and your code under the [MIT License](LICENSE), and that you have the right to contribute it. Images keep their own license ([docs/LICENSE-CONTENT.md](docs/LICENSE-CONTENT.md)).
