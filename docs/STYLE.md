# Story style

How profiles are written: curiosity first, facts intact. For readers of every age a profile should read like a story a friend tells, not an encyclopedia entry. Rules on facts and sources stay as in [product_vision.md](../product_vision.md) §7; this guide is about how the text sounds.

## The idea

Every profile and every section opens with a **hook**: a question, a surprise or a twist that makes the reader want the next sentence. Then the text explains what actually happened. The facts are the same as before; only the order and the voice change.

> **Did you know** that Neil Armstrong reportedly scooped up a handful of earth outside a house in Siberia? It belonged to a mechanic from Poltava who, fifty years before Apollo, had worked out how to get to the Moon.

## Focus: people who built Ukraine

The site exists to show the people who built Ukraine and those who still fight for its independence and prosperity. When collecting facts and quotes, and when choosing hooks, put first:

- **The fight for Ukraine and for freedom:** resistance, defence, political prisoners, people who paid with their lives.
- **What their work actually gave Ukraine:** to its language, culture, science, sport, economy and statehood, and how it helped Ukraine grow as a nation and an independent country.
- **Their own words** on Ukraine, freedom, language and dignity, for the quote panel.

A fact that explains this belongs in the story before one that only fills in a career. The focus never bends the facts: everything stays sourced, contested people keep a neutral «Дискусії та оцінки» section, and a person's ties to Ukraine are stated as precisely as they are (§7).

## Quotes

The quote panel is the one place where the reader hears the person directly, so choose words that inspire: words that make a reader want to achieve something and stand up for what is right. A good quote:

- speaks about what is worth living and fighting for: Ukraine, freedom, independence, dignity, democracy, justice, truth, the Ukrainian language, duty to other people;
- encourages: to work, to learn, to stay brave, to defend what is right, not to give in to fear;
- makes sense on its own, without the rest of the profile, and suits readers of all ages (nothing graphic or hateful).

Skip lines that only describe a career, a habit or a hobby ("as a child I loved to draw"), aphorisms about a work method, wit that needs context, and lines about death for its own sake. If none of the person's own words meets this bar, leave the panel empty: no quote is better than a weak one.

Finding and adding quotes (BACKLOG I23; live quotes are only in the profiles' frontmatter, `quotes:`):

- **One quote per profile**, picked by the owner. Propose candidates in a table in chat (uk, en, source, confidence) and apply only the ones the owner approves.
- **Where they go:** uk text and source in `src/content/people/uk/<slug>.md` after `key_accomplishments:` (before `sources:`); en text and source at the end of the en frontmatter, same order. ` / ` marks a line break in verse. The source line doesn't repeat the person's name.
- **Sourcing:** the person's own words, verbatim, checked against a source that was opened (their published work, an encyclopedia, UINP, a museum or official site, or major media), never a Russian one (§7.3). Wikiquote, Goodreads and listicles are leads only. osvita.ua and ukrlib are used for the text of classic literature. Mark cuts with […].
- **Confidence:** "high" means the wording was checked against the primary text or a reputable outlet quoting it; "medium" means a reputable outlet prints it without naming the primary source, so treat it as optional.
- **English:** our own translation unless a published one exists; then name it. If a line was said in English, use the original and translate the uk.

## Hooks to choose from

Use one or two per profile, and vary them across profiles, so the site doesn't repeat one trick.

| Hook | Shape | Example |
|---|---|---|
| **Did you know** | «Чи знали ви, що…?» / "Did you know…?", then the answer | Did you know a Ukrainian washed dishes in Toronto before he gave 16 million dollars to universities? |
| **The question** | A real question the story answers | How do you fly to the Moon without taking the whole rocket there and back? |
| **The twist** | What you'd expect, then what happened | His bosses jailed him because his granary would collapse. It stood for 60 years. |
| **The object** | Start from a thing: a painting, a letter, a building, a song | A wooden granary without a single nail. |
| **The number** | One number that matters, then why | 16 million dollars, and he lived in a modest house. |
| **Myth vs fact** | A common belief, then the correction | Many think Sikorsky was Russian. He was born in Kyiv. |
| **The name** | A name, call sign or nickname that hides a story | Why did a Ukrainian machine gunner go by «Малі»? |

## Headings

Section headings can be hooks too, in place of the plain «Хто він», «Головне», «Чому це важливо сьогодні»:

- «Як полтавець вигадав дорогу на Місяць» / "How a boy from Poltava found the way to the Moon"
- «Чому про нього знає NASA» / "Why NASA knows his name"

Keep «Дискусії та оцінки» / "Debates and assessments" as it is: it signals a neutral section.

## Writing

- **Short sentences, active verbs, concrete details.** "He built a granary without nails" beats "he was engaged in the construction of agricultural facilities".
- **Keep the story in time order** where you can (ideally, not a hard rule). After the opening hook, sections follow the life from early to late, so the profile doesn't go birth, death, and then back to an interesting fact from their youth. A later section may step back in time only when it clearly has its own theme (a debate, a legacy, a single thread like a song's journey).
- **One idea per paragraph.** About 200–350 words of story in all; cut what a reader won't miss: minor dates, offices, committees, institution names, sums.
- **Explain context in a clause,** not a paragraph: "the Soviet secret police (NKVD)".
- **Talk to the reader** now and then ("уявіть", "imagine"), but don't overdo it.
- **End on why it matters today** (see [The ending](#the-ending-why-this-person-matters)).
- **Don't name reference works in the text.** Not «Енциклопедія історії України пов'язує цей арешт…» or "The Internet Encyclopedia of Ukraine says…", but «Цей арешт пов'язують…», "It is considered…". Where two views meet (debates): «Одні дослідники пишуть… Інші зазначають…» / "Some scholars write… Others note…". Where sources disagree on a fact: «За різними даними…» / "Sources give…". Sources belong in `sources:` only; a work may be named when it is itself the subject (someone edited or funded it) or in an image credit.
- **English is not a translation.** Keep the same hook and facts, written the way an English speaker would say it.

## The ending: why this person matters

The last section, «Чому це важливо сьогодні» / "Why it matters today" or a hook heading in its place, is the reason the person is on the site. It answers one question: **what did this person change for Ukraine, for people, for the world, and why can we be proud of them?** A reader should finish it knowing what the person gave and feeling that it is worth carrying on. It is the key section of the profile.

It must be the **last section**, always («Дискусії та оцінки», where there is one, comes before it): it is also the text posted to social media. A story section such as «Як він повернувся» can come before it, but it never replaces it.

- **Short:** five sentences at most.
- **Why, not what.** The story above gives the facts; the ending says why they matter to other people. Don't retell the story or list results: "she won Madrid and reached two Grand Slam semifinals" doesn't say why the nation should care. Say what it means for Ukraine and the world: for its culture, science, statehood or development, for how the world sees Ukraine (did they carry Ukraine's name onto the world stage, at competitions, in science, in art?), for the people who came after.
- **Motivate the reader,** mostly a reader in Ukraine: show what this life proves is possible and what is worth fighting for, so they want to learn, build, compete or stand up for what is right.
- **Impact, not remembrance.** Say what their work, choices or way of thinking changed: what we still read, sing, use or build on; what they proved was possible; what they defended; who followed them. Death, burial, awards, streets, monuments, museums and reprints are how a person is remembered, not why. They get at most one closing clause, and only when they add something (a banknote, a mass reburial).
- **Built from the story.** The ending draws on facts already told and sourced in the profile. It adds no new facts, and interpretations stay close to them: "his plays began modern Ukrainian drama", not "he changed everything".
- **Proud and motivating, without pathos.** Plain words, a concrete link to today, now and then to the reader ("кожен, хто…", "anyone who…"). No preaching, no slogans, no superlatives without a source.
- **Contested people:** state the impact as plainly and neutrally as the rest; the debates stay in «Дискусії та оцінки».
- **Not a «Як його пам'ятають» section.** If memorial facts are worth keeping, fold the important one into the ending and drop the rest.

> Before: "Her funeral became a gathering of the Sixtiers… A street in Vasylkiv now bears her name."
> After: "Alla Horska showed that being Ukrainian can be a choice: as an adult she learned the language no one had taught her… The Suchasnyk club she helped found became a home for the Sixtiers…"

## Limits (these don't bend)

- **The hook must be true** and backed by the profile's sources. No invented scenes, thoughts, feelings, dialogue or quotes. A scene opener is allowed only when a source describes the scene.
- **No misleading clickbait.** The answer must deliver what the hook promises. Superlatives ("the first", "the biggest") only when a source says so.
- **Tone follows the subject.** Deaths, wars, repressions, the fallen and their families: plain and respectful, no playful hooks about the death itself. Contested people: the debates section stays neutral; hooks never take a side.
- **Fallen defenders:** hooks come from their life and service (a call sign, a first, a choice they made), never from their death or the fighting. The death gets one plain sentence with the full name, place and age. The story ends on what their service gave: what they held, whom they saved, what they showed others; how they are remembered gets one sentence at most. No battle drama, no graphic detail, nothing private about the family.
- **Living people:** public role only, as always.
- **Limits stay:** role ≤ 40 characters, summary ≤ 300, one source per website (§7.3).

## Profile fields

- **Summary:** the hook in one sentence, then who the person was. It shows on cards, so it has to make someone tap.
- **Fun fact:** a "did you know" that isn't already the main hook.
- **Key accomplishments:** short, concrete, no padding.
- **Misconception card:** the place for "myth vs fact" when a sourced myth exists.

## Checklist

1. Does the summary make you want to open the profile?
2. Does each section start with something other than a date?
3. Is every hook true, sourced and answered?
4. Could a 15-year-old retell the story after one reading?
5. Is anything left that nobody would miss?
6. Do Ukrainian and English say the same things, each in its own voice?
7. Does the ending say, in five sentences or fewer and without retelling the story, what this person changed, why it matters to Ukraine and the world, and why it should inspire the reader?
8. Do the sections run in time order after the hook, without jumping back?
