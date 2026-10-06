# Names of Ukraine — namesofukraine.com

**«Знай своїх»** (Know Your Own). A free static website about the people who made Ukraine, for the young generation.

Product vision, requirements, and decisions: see [product_vision.md](product_vision.md). Status, priorities and the ideas backlog: [docs/BACKLOG.md](docs/BACKLOG.md) (start there to resume work). How changes go live (CI, Cloudflare Pages, rollback): [docs/PUBLISHING.md](docs/PUBLISHING.md). Weekly feedback review and other recurring work: [MAINTENANCE.md](docs/MAINTENANCE.md). People we plan to add: [CANDIDATES.md](docs/CANDIDATES.md).

## Development

Requires Node 22 (`.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321 — shows unreviewed entries too
npm run build    # production build → dist/ (reviewed entries only)
npm run check    # type + content schema check
npm test         # unit + DOM tests (Vitest)
```

Add a person:
1. `src/content/people/uk/<slug>.md` — all facts plus the Ukrainian text (see `taras-shevchenko.md`; schema in `src/content.config.ts`).
2. `src/content/people/en/<slug>.md` — English text only (name, role, summary, fun fact, accomplishments, birthplace name, image alt). The Markdown body (long bio) is optional; until it's written, the English page shows the Ukrainian original with a note.
3. Set `reviewed: true` in **both** files only after fact-checking; a profile is published only when both languages are reviewed.

Pages exist in both languages at the same depth: Ukrainian under `/uk/`, English under `/en/` (e.g. `/uk/people/ivan-marchuk/`). The bare root `/` redirects to `/uk/`. Page layouts live in `src/views/`; the files in `src/pages/uk/` and `src/pages/en/` are thin wrappers.

## License

Code: [MIT](LICENSE). Site text: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Images: each under its own free license, credited on the site. Details: [LICENSE-CONTENT.md](docs/LICENSE-CONTENT.md).
