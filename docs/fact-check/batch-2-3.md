# Fact-check report: batches 2–3 (31 profiles)

**Date:** 2026-10-03 · **Method:** as in [batch 1](batch-1.md). Four research agents read each profile (uk and en) and checked every claim against encyclopedia articles they opened (ЕСУ, ЕІУ, IEU). For the Defenders they used official sources (Hero of Ukraine decrees on zakon.rada.gov.ua, Ministry of Defence) and reputable media, with Wikipedia only as a cross-check. They also opened every source link and image page and compared the English files with the Ukrainian ones. **Status:** fixes applied for all four groups (A and C by the research agents; B and D, whose agent edits were blocked by the permission system, applied by the editor after owner approval on 2026-10-03). **Owner approval:** groups A and C (15 profiles) approved on 2026-10-03; group B's 5 ready profiles (Kotliarevskyi, Vovchok, Teliha, Marchuk, Malevich) on 2026-10-04. Kostenko approved on 2026-10-04 once her portrait was freely licensed. Pending: Prymachenko (portrait license) and group D (policy D5).

Full per-profile reports, each with exact quotes, replacements, source URLs, an "Applied" list and a "Left for owner" list:
[A: statehood](batch-2-3/a-statehood.md) · [B: literature and visual arts](batch-2-3/b-literature-arts.md) · [C: performing arts, science, sport](batch-2-3/c-performing-science-sport.md) · [D: Defenders](batch-2-3/d-defenders.md)

## Result

| Group | Profiles | Definite errors | Status |
|---|---|---|---|
| A | anna-yaroslavna, kniahynia-olha, danylo-halytskyi, dmytro-vyshnevetskyi, pylyp-orlyk, petro-kalnyshevskyi, roksolana | 4 | ✅ applied (20 edits; Roksolana needed none) |
| B | ivan-kotliarevskyi, marko-vovchok, olena-teliha, lina-kostenko, ivan-marchuk, kazymyr-malevych, mariia-prymachenko | 5 | ✅ applied |
| C | kvitka-tsisyk, mariia-zankovetska, serzh-lyfar, solomiia-krushelnytska, vira-kholodna, ivan-piddubnyi, borys-paton, bohdan-havrylyshyn | 7 | ✅ applied (Havrylyshyn needed none) |
| D | andrii-pilshchykov, dmytro-kotsiubailo, iryna-tsybukh, maksym-kryvtsov, nazarii-hryntsevych, oleksandr-matsiievskyi, roman-ratushnyi, valerii-chybinieiev, yurii-ruf | 6 | ✅ applied |

All dates of death of the Defenders and all 8 award decrees match the official texts. Every profile has at least one working encyclopedic or official source (Kholodna's empty ВУЕ stub was replaced with ЕІУ).

## Most important corrections

- **Lyfar** (applied): the misconception card said it is documented that he showed Hitler around the Opera in 1940. The opposite is documented: a 1946 purge committee found that accusation false (Franko, *Vingtième Siècle*, 2016, now a source).
- **Piddubnyi** (applied): "never lost a tournament" was the legend itself; he lost twice to Stecher in 1926.
- **Paton** (applied): his father's bridge was not the world's first fully welded one; also fixed the Russian word «мост».
- **Orlyk** (applied): death date set to new style (5 June 1742), per the site's date rule.
- **Danylo Halytskyi** (applied): took Volodymyr in 1215, not "ruled Volhynia from 1221".
- **Vovchok** (B, applied): Shevchenko's bracelet was sent in July 1858, not 1859.
- **Malevich** (B, applied): the 2015 inscription on the *Black Square* was read under a microscope, not found by X-ray, and its authorship is disputed.
- **Kotsiubailo** (D, applied): there is a fountain in his honor in Lviv, not a street; he started as a platoon commander.
- **Hryntsevych** (D, applied): he denied being "the youngest Azovstal defender" in the cited interview.

## Owner decisions

1. **Image licenses (legal risk, blocks publishing; tracked as L15 in the vision doc):** 10 portraits are "all rights reserved" images from third-party sites: anna-yaroslavna, kniahynia-olha (from rgbs.ru, a Russian state site), danylo-halytskyi, pylyp-orlyk, petro-kalnyshevskyi, lina-kostenko, mariia-prymachenko, iryna-tsybukh, maksym-kryvtsov, yurii-ruf. The Commons public-domain tag on Kotliarevskyi's portrait couldn't be verified. Under D6 each needs a free (PD/CC) image, written permission, or the monogram fallback.
2. ~~Apply groups B and D~~ ✅ done 2026-10-03. Not applied, deliberately (owner decisions in item 3): Kryvtsov's fun fact and quote, Hryntsevych's "youngest defender" framing, and all image fields. Teliha's antisemitic-articles sentence is now attributed to critics (the Ukrainian Jewish Committee); a scholarly source (e.g. Berkhoff, *Harvest of Despair*) would let it be stated directly.
3. **Wording and conflicts** (recommendations in each report): Vyshnevetskyi's role ("перший відомий козацький ватажок" overclaims); Kryvtsov's violet fun fact and quote; Hryntsevych's "youngest defender" framing; Kholodna's film count; Krushelnytska's "first Salome"; Chybinieiev's rank (captain vs lieutenant colonel).
   *Resolved 2026-10-03 (owner):* Vyshnevetskyi's role → «Один з перших козацьких ватажків»; Kholodna's film count → «кілька десятків»; Krushelnytska's "first Salome" and Lyfar's "On the Dnieper" kept as is; Orlyk's new-style date, Zankovetska's 1923 and the spelling Hawrylyshyn kept.
4. **Site-wide English conventions:** ~~-sky vs -skyi~~ resolved 2026-10-03: official -skyi everywhere (see the decisions table in the vision doc). Date format: the majority style "23 June 1940" is used.

## Owner approval checklist

For each profile, read the page at `http://localhost:4321/uk/people/<slug>/` (and `/en/…`) and reply "approve <slug>" (or "approve group A"). Claude then sets `reviewed: true` and `last_reviewed` in both files. Profiles with an open image-license item (decision 1) should not be approved until that's resolved.
