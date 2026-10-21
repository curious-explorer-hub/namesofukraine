# Profile refresh

A periodic check that published profiles still match the world: someone has died, a defender got a new award, an athlete won a new title. Corrections from readers go through the weekly feedback review instead ([MAINTENANCE.md](MAINTENANCE.md)).

**How often:** monthly for living people (`living: true`); once a year for everyone else. After a major event (Olympic Games, world championships, a batch of Hero of Ukraine decrees) check the affected group straight away.

## What to look for

In order of priority:

1. **Deaths.** A living person has died or been killed: set `died` (and `died_circa` if the exact date is unknown), remove `living: true`, and rewrite the text in the past tense. For fallen defenders: public role and deeds only, nothing graphic (product_vision.md §7.6).
2. **Defenders still serving** (`group: defenders`, and `statehood` profiles with a military role): promotions, new commands, captivity or release.
3. **Athletes still competing** (`group: sport`): Olympic, world and European medals, records, retirement. Confirm results on Olympedia, olympics.com or the sport's federation. A new Olympian goes into the `olympians` collection.
4. **State recognition**, for anyone, including posthumous awards: Hero of Ukraine, the orders (For Courage, Bohdan Khmelnytskyi, Yaroslav the Wise, Princess Olga and others), the Shevchenko Prize, honorary titles. Confirm each by the decree on president.gov.ua or the awarding body's own list; a news report alone isn't enough.
5. **World recognition:** international prizes and honours (Nobel, Sakharov, Time 100, foreign state orders, honorary doctorates, a UN or Council of Europe award). Confirm on the awarding body's site.
6. **Support for Ukraine in the war with Russia:** public deeds that show how the person stood up for Ukraine: speaking out publicly, fundraising or donating (to the army, to rebuilding), volunteering, joining the army, speaking at the European Parliament, the UN or another parliament, refusing to perform in Russia. If it's a real part of their story, add it to the text and to «Чому це важливо сьогодні» / "Why it matters today". Only public, sourced deeds with what was actually done ("raised money for drones for a named brigade", not "helped the army"), no amounts or claims that the source doesn't give, and the same neutral tone as the rest of the profile.
7. **Everyone else who is living:** a new public office, a landmark work.
8. **Stale wording:** "currently", "still", "now" or a number that has changed ("ten-time champion"); replace with "as of <month year>" where needed (§7).

Not a refresh: style rewrites, new sections, or facts that were already true when the profile was written. Note those in [BACKLOG.md](BACKLOG.md) instead.

## How to update a profile

- **Same rules as a new profile** (AGENTS.md, «Content rules»; product_vision.md §7): every new fact backed by a listed source; at most 4 sources, one per site; no Russian sources; no invented numbers or quotes. If a new fact needs a new source and the list is full, replace the weakest one only if every remaining fact is still covered.
- **Both languages:** facts in `uk/<slug>.md`, the same change in the text of `en/<slug>.md`.
- **Where it goes:** a major achievement goes into `key_accomplishments` and a sentence in the matching story section; update `summary` or `role` only if the change is that big (limits: role ≤ 40, summary ≤ 300 characters). Don't touch `published`.
- **Timestamp:** set `last_reviewed` to today's date (UTC, `YYYY-MM-DD`) **only on profiles that changed**. It shows on every profile, in the sources section, as «Станом на» / "As of": the date facts were last checked. Unchanged profiles keep their date.
- **Approved stays approved**, but the owner reviews every change before it's pushed: show Before/After for each edited passage.
- **Unsure?** If sources disagree or the news is unconfirmed (e.g. a reported death without an official statement), don't edit; list it as open in the log.

## Doing it with Claude Code

Ask in this repository:

> Run the profile refresh from docs/PROFILE-REFRESH.md for living people (or: for `group: sport`, for `group: defenders`, for all profiles). For each profile, search for changes since its `last_reviewed` date, check them against reputable sources, and list what changed with sources. Then propose the edits (uk + en) as Before/After tables, set `last_reviewed` only on the changed profiles, and wait for my approval before committing.

For a large run, split it by group so each batch can be reviewed in one sitting.

## Refresh log

One line per run: date · scope · outcome. Slugs only, no private details.

| Date | Scope | Updated | Open |
|---|---|---|---|
