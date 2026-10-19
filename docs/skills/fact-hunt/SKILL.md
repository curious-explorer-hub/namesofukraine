---
name: fact-hunt
description: Find new, verified, interesting facts about people with profiles, before the owner reviews or approves them. Searches Ukrainian and international sources, keeps only facts confirmed on a page that was opened, and proposes where each one fits (a hook from docs/STYLE.md, fun_fact, misconception, a section). Use when the owner asks for interesting facts or "top facts" about a person, or to prepare drafts for review. Argument - a slug, a profile link, several of them, or "drafts" (optionally with a number, e.g. "drafts 5").
---

# Fact hunt

Replaces the owner's manual step of asking a chatbot for "top 3 interesting facts" while reviewing a profile. The result is a table of proposals in chat; **profile text is never edited** until the owner picks facts or asks to enrich the profiles (step 7).

Rules that apply throughout: [AGENTS.md](../../../AGENTS.md) (content rules), [product_vision.md](../../../product_vision.md) §7 (editorial policy), [STYLE.md](../../STYLE.md) (hooks, quotes, writing).

## 1. Pick the profiles

- A slug or a link (`/uk/people/<slug>/`): that profile.
- `drafts`: the files in `src/content/people/uk/` with `status: draft`, five at a time unless the owner gives another number, oldest `last_reviewed` first. Say how many drafts are left after the batch.
- For more than two profiles, run one subagent per profile in parallel, give it steps 2–5 and the output format of step 6, and check the excerpts it returns before reporting.

## 2. Read what the profile already says

Read `src/content/people/uk/<slug>.md` and `src/content/people/en/<slug>.md`: the story, `summary`, `fun_fact`, `misconception`, `key_accomplishments`, `quotes` and `sources`. A fact the profile already tells (even in other words) is not new.

## 3. Search

- At least four searches per person, in Ukrainian and in English: the name with «цікаві факти», «маловідомі факти», the person's main role or work, and the places and years of their life.
- Good places: ЕСУ (esu.com.ua), ЕІУ (history.org.ua), Internet Encyclopedia of Ukraine, UINP (uinp.gov.ua), museums, archives and universities, major Ukrainian media (Радіо Свобода, Історична правда, Укрінформ, ZAXID.NET, Збруч, День, Суспільне), international encyclopedias and media.
- **Never** Russian media, publishers, institutions or `.ru` sites (ru.wikipedia and ru.wikisource included), not even as leads.
- Wikipedia, Wikiquote and listicles are leads only: follow them to a source that can be cited.

## 4. Verify

- Open every page a fact comes from and copy the sentence that says it. A fact that isn't on a page you opened is dropped, however well known.
- **Confidence:** *high* means an encyclopedia, or two independent reputable pages, say it; *medium* means one reputable page says it.
- When a source contradicts the profile (dates, places, numbers, who did what), report it under "Conflicts with the profile": these are as valuable as new facts.
- No invented quotes or numbers. A quote goes in only verbatim, following "Quotes" in STYLE.md.

## 5. Choose

Up to five facts per person, best first. A good fact:

- surprises: it isn't what a reader would guess about this person;
- is specific: a name, a number, a date, an object, a place;
- shows character or deeds, ideally tied to why the person matters;
- suits readers of all ages. For living people and fallen defenders: public role and deeds only, nothing private or graphic;
- is neutral for contested figures: no praise or blame in the wording.

For each fact, pick the hook it fits from "Hooks to choose from" in STYLE.md (Did you know, The question, The twist, The object, The number, Myth vs fact, The name) and where it would go: `fun_fact`, `misconception` (claim and truth), the opening hook of a named section, a new sentence in a named section, or a quote.

## 6. Report

Per person, a heading with the name and the profile link, then:

| # | Факт (uk) | Fact (en) | Hook | Where | Source | Confidence |
|---|---|---|---|---|---|---|

- **Source:** the link, and the supporting sentence quoted in the original language.
- After the table: **Conflicts with the profile** (if any), and **Source limits**: whether using a fact would add a source beyond 4, or a second one from the same website.
- End with the question of which facts to add.

- Set `last_reviewed:` in the uk file to today's date (the page shows it as «Станом на …» / "As of …"): the facts were checked against sources today. This is the only edit before the owner picks facts.

## 7. When the owner picks facts

Apply only those; when the owner asks to *enrich* the profiles (or to add all high-confidence facts), apply every high-confidence fact and fix the conflicts the sources settle, without asking first. Follow AGENTS.md: both languages; the source added to `sources:` (at most 4 per profile, one per website; say so if a pick breaks this); profile prose never names the encyclopedia or outlet («вважають» / "is believed"); " - " for dashes in Ukrainian; role ≤ 40 and summary ≤ 300 characters. Show the changes as Before/After tables. Don't commit unless asked.
