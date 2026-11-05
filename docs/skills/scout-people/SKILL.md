---
name: scout-people
description: Find people worth adding to docs/CANDIDATES.md in the recent posts of Threads accounts about Ukrainian history and culture. Reads the last posts of each account in a logged-in browser, pulls out the named people, drops those who already have a profile or a row (scripts/check-names.mjs), and proposes new rows for the owner to pick. Use when the owner asks to look through Threads (or similar) accounts for people or candidates. Argument - one or more Threads handles or profile links, optionally with a number of posts (default 100), e.g. "@chronothreads.ua 50".
---

# Scout people

Replaces the owner's manual step of scrolling history accounts for people to add. The result is a table of proposed rows in chat; **`docs/CANDIDATES.md` is changed only after the owner picks rows** (step 6).

Rules that apply throughout: [AGENTS.md](../../../AGENTS.md) (content rules), [product_vision.md](../../../product_vision.md) §7 (editorial policy), the Editorial notes and the **Don't add** table in [CANDIDATES.md](../../CANDIDATES.md).

## 1. Accounts

Accounts the owner has used before (add to this list when the owner names a new one):

| Account | What it posts | Yield (last run) |
|---|---|---|
| `@chronothreads.ua` | "This day in history", plus war news | Good: many named historical people, mostly already profiled |
| `@__ruta__cherlena` | OUN (Melnyk wing), UPA, Konovalets and Melnyk; quotes and photos from books | Good for the OUN and émigré circle; one-sided, so check everything |
| `@odesytkafolk` | AI-generated folk scenes and family stories of deportations | Low: almost no named public figures |

## 2. Read the posts

Threads shows posts only to a logged-in reader, and its API (`/profile_posts`, permission `threads_profile_discovery`) reads other accounts only after Meta App Review. So use the Playwright browser:

1. `browser_navigate` to `https://www.threads.com/@<handle>`. If the page shows **Log in**, ask the owner to log in in that browser window, then go on.
2. `browser_evaluate` the collector below with `filename: ".playwright-mcp/threads-<handle>.json"` (`.playwright-mcp/` is git-ignored; the tool can't write elsewhere). It scrolls slowly until it has `N` of the account's own posts (default 100) or nothing new loads. Reposts and replies to others are skipped; long threads give only their first post, so open a post (`/post/<id>`) when its first part names someone and the rest matters.

```js
async () => { const N = 100; const user = location.pathname.slice(2).split('/')[0]; const seen = new Map(); let idle = 0;
  while (seen.size < N && idle < 6) { const before = seen.size;
    for (const c of document.querySelectorAll('div[data-pressable-container]')) {
      const a = [...c.querySelectorAll('a[href*="/post/"]')].find((x) => x.querySelector('time')); if (!a) continue;
      const url = new URL(a.getAttribute('href'), location.origin).href.split('?')[0];
      if (!url.includes('/@' + user + '/') || seen.has(url)) continue;
      seen.set(url, { url, time: a.querySelector('time').getAttribute('datetime'), text: c.innerText }); }
    idle = seen.size === before ? idle + 1 : 0; window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1000)); }
  return JSON.stringify([...seen.values()].slice(0, N)); }
```

3. Say how many posts each account gave and the date range; an account that posts rarely may reach back months.

## 3. Pull out the people

Read every post and list each **named, real person**. Leave out private people from family stories, call signs without a name, and people named only as context (foreign leaders, the post's author). Posts are leads, not sources: they can be wrong, slanted or AI-generated, so take no fact from them unverified.

## 4. Drop the known ones

```sh
node scripts/check-names.mjs < names.txt   # or names as arguments; prints profile <slug>, a CANDIDATES.md row, or "new"
```

Give names as «Ім'я Прізвище» in Ukrainian. Rulers and saints are profiled under titles (Княгиня Ольга, Ярослав Мудрий): check those by hand with `grep -i` on `src/content/people/uk/`. A "new" name can still be a near-miss (another spelling, a maiden name): grep the surname before proposing it.

## 5. Vet the new ones

For each "new" person, a quick check, not full research: one or two searches in an encyclopedia (ЕСУ esu.com.ua, ЕІУ history.org.ua, IEU) or other reputable sources, **never Russian sources**. Keep a person when they have a clear public deed that fits §7, and note:

- years, field and group (`src/content/categories.json`), the flags used in CANDIDATES.md (👩 🟢 ⚖️ 🌍 👥) and a collection it could join (`src/content/collections.json`, or an idea);
- what the post claimed and whether the source confirms it; anything still unchecked ends with "check";
- why it might need an owner decision: contested, serving leader or current politician, a collective, a Soviet-establishment figure, thin sources (see Editorial notes).

Drop people the **Don't add** table names, and say so.

## 6. Report, then write

Report in chat, one table per account or one overall:

| # | Person | Years | Field (group) | Flags | Proposed section | Why (one line) | Seen in |
|---|---|---|---|---|---|---|---|

"Seen in" is the post link. Put the strongest first and keep "skipped" names in a short list with the reason. Then wait. When the owner picks rows, add them to **To draft** or **Needs a decision** in CANDIDATES.md in its format (Notes start with "Threads scout YYYY-MM-DD (@handle)."), and update the Yield column in step 1.
