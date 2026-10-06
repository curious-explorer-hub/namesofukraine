# Batch 5 – group D (music) drafting report — 2026-10-06

All 5 drafted (uk + en), `reviewed: false`, parsed with js-yaml; role/summary counted (max: role 37, summary 273 en Ivasiuk). `vitest`: only the expected `aliases.json` failure (new slugs need entries). ESU read as PDF exports (esu.com.ua/pdf/file/<id>.pdf); ВУЕ via curl (full articles only for Солов'яненко and Івасюк; Сильвестров, Кузьменко, Вакарчук are one-line stubs). Licenses checked through the Commons API (wikitext of the file page).

**Note for all groups:** `sips -Z 1600` **upscales** images smaller than 1600 px (it did here, I re-copied the originals). Only Sylvestrov needed resizing (3396 → 1600). Other groups' small portraits may be upscaled.

| slug | image | open issues |
|---|---|---|
| anatolii-solovianenko | File:Anatoliy_Solovianenko_-_Soviet_Life,_October_1984.jpg, 780×820; Commons tag **only {{PD-US-1978-89}}** (US magazine, no notice) | **Owner decision on image** (same kind of case as Skoropadskyi, batch 4); Kyiv Opera soloist from 1962 (ВУЕ, Shevchenko Committee) vs 1965 (IEU) |
| valentyn-sylvestrov | File:Valentyn_Silvestrov,_composer_(July_2022,_Kurort_Gohrisch,_Germany).jpg, Solobratscher, CC BY-SA 4.0 | **Owner: English name** "Valentin Silvestrov" (his publisher's and international spelling) vs official "Valentyn Sylvestrov"; I used the established form and give the official one in the text |
| volodymyr-ivasiuk | File:Володимир_Івасюк.jpg, УІНП, CC BY 4.0 ({{uinp.gov.ua}}), 650×474 b/w | ⚖️ debates section written; IEU gives birth 4 **April** 1949 (ВУЕ, ЕСУ, Committee: 4 March, used); Sopot-74 result: ВУЕ 2nd place vs ЕСУ 1st place (text says only "sang at Sopot") |
| kuzma-skriabin | File:Kuzma_Skriabin_2014.jpg, DENAMAX, CC BY-SA 4.0, 642×817 | Not flagged ⚖️, but I added two neutral sentences on the controversy over the 2020 Hero title (ZAXID.NET); «Старі фотографії» as a best-known song rests on Wikipedia only |
| sviatoslav-vakarchuk | File:Svyatoslav_Vakarchuk_July_2016.jpg, U.S. Embassy Kyiv, PD-USGov-DOS | **Birthplace conflict**: ЕСУ (2005) Lviv vs Mukachevo (Слово і Діло, Wikipedia); used Mukachevo. **He was an MP twice** (2007–2008 too, not only 2019–2020). **Owner: English name** "Svyatoslav" (his usage) vs official "Sviatoslav" |

## anatolii-solovianenko
- Name: `Анатолій Солов'яненко` / "Anatolii Solovianenko" (official transliteration; en.wiki has "Anatoliy").
- Kyiv Opera: ВУЕ and the Shevchenko Committee say from 1962 (trainee group, then soloist); IEU says from 1965. Used 1962–1992 (ВУЕ: he left in 1992 after a conflict with the management; worded neutrally).
- Hero of Ukraine: decree 615/2008 of 03.07.2008, read on zakon.rada.gov.ua (president.gov.ua gives 403).
- Died and buried in Kozyn (ВУЕ: monument on his grave in Kozyn; IEU, Committee: died there).
- Teacher "Дж. Барра" (ВУЕ only gives the initial); en "G. Barra".
- Fun fact (engineer who taught descriptive geometry for 8 years, 1954–1962): Shevchenko Committee + ВУЕ.
- Links: inline link to Mykola Lysenko (he sang Petro in Natalka Poltavka: IEU, Committee).
- **Back-links:** `mykola-lysenko` could add `anatolii-solovianenko` to `related:` (no sentence to link).
- Aliases: `"anatolii-solovianenko": { "uk": ["Анатолі Солов'яненк", "Солов'яненк"], "en": ["Anatolii Solovianenko", "Anatoliy Solovianenko", "Solovianenko"] }`

## valentyn-sylvestrov
- Studies 1958–1964 under Liatoshynskyi (composition) and Levko Revutskyi (counterpoint): IEU, Schott. Committee says graduated 1964; uk.wiki says 1963 (not used).
- Exclusion from the Composers' Union: IEU "temporarily excluded" (wiki: 1970). Text says only "temporarily", no year.
- Koussevitzky Prize 1967 for Symphony No. 3 (Schott), Gaudeamus 1970 (IEU, Schott).
- Number of symphonies differs (IEU 2011: seven; Committee: eight; wiki: nine), so no number is given.
- Shevchenko Prize 1995 for Symphony No. 5, String Quartet No. 1 and a cantata to Shevchenko's words for a cappella choir (Committee): inline link to Taras Shevchenko there.
- Berlin since March 2022 "at his family's request" (Schott; "daughter and granddaughter" left out as private). "As of October 2026" rests on the Schott page (current, lists 2026–27 concerts).
- "Maidan – Kyiv" is from the Committee's work list; "prayers for Ukraine" from Schott ("Prayers for Ukraine"), not given as a title (Lysenko's «Молитва за Україну» is a different work).
- Not used (Wikipedia only): the 2023 Nobel ceremony opening, the 2026 Paris VIII honorary doctorate.
- **Back-links:** `taras-shevchenko` could add `valentyn-sylvestrov` to `related:` (no sentence to link).
- Aliases: `"valentyn-sylvestrov": { "uk": ["Валентин Сильвестров", "Сильвестров"], "en": ["Valentin Silvestrov", "Valentyn Sylvestrov", "Silvestrov", "Sylvestrov"] }`

## volodymyr-ivasiuk
- Death date unknown: `died: 1979-04-24` with `died_circa: true` (shown as "c. 1979") and a YAML comment. ВУЕ: left home 24.04, found 18.05, certificate says 24–27 April; ЕСУ: "between 24 April and 18 May".
- Debates section: the 1979 suicide verdict (case closed July 1979: UNIAN 2019); the family vs Tetiana Zhukova (Radio Svoboda 2009); IEU (1988) "circumstantial evidence points to the KGB" vs ВУЕ/ЕСУ "unexplained circumstances"; reopened February 2009 (Radio Svoboda), investigation 2009–2012 closed November 2012, closure overturned as unfounded June 2014 (Interfax citing the Prosecutor General's Office); 2019 forensic experiment: he could not have hanged himself alone (UNIAN). No one has been charged; ВУЕ "investigation ongoing". I did not find a current (2024–2026) status of the case.
- Hero of Ukraine: decree 110/2009 of 01.03.2009 (zakon.rada.gov.ua).
- 107 songs and 53 instrumental works: Shevchenko Committee and Interfax (ЕСУ: "over 100"; IEU 1988: "about 50").
- Funeral: "over 10,000" (IEU); "the authorities tried to prevent a mass farewell" (Radio Svoboda).
- Vakarchuk was the patron of the 2011 Lviv monument (ВУЕ, list of monuments).
- **Inline links for existing profiles:** `nazarii-yaremchuk` body, uk «працював з композитором Володимиром Івасюком» → `[Володимиром Івасюком](/uk/people/volodymyr-ivasiuk/)`; en "worked with the composer Volodymyr Ivasiuk" → link; add `volodymyr-ivasiuk` to its `related:`. `oles-honchar`: add `volodymyr-ivasiuk` to `related:` (Ivasiuk wrote music for the stage version of «Прапороносці»; Honchar's text is about the novel, so no inline link).
- Aliases: `"volodymyr-ivasiuk": { "uk": ["Володимир Івасюк", "Івасюк"], "en": ["Volodymyr Ivasiuk", "Volodymyr Ivasyuk", "Ivasiuk", "Ivasyuk"] }`. Note: "Івасюк" is shared with the painter Mykola Ivasiuk (credited in ivan-bohun's image, frontmatter only), so the bare stem may need a human check.

## kuzma-skriabin
- **`name`**: «Кузьма Скрябін» / "Kuzma Skriabin", the pseudonym, as with lesya-ukrainka and marko-vovchok; the real name is in the summary and the first sentence (as in marko-vovchok). ЕСУ uses the headword «Кузьма»; Wikipedia «Кузьма Скрябін».
- English: official transliteration "Skriabin" for the band and the stage name; "Skryabin" is common in media (in aliases).
- Facts from ЕСУ: Sambir, Petrozavodsk 1985, Lviv Medical Institute 1993, band since 1989, "Andrii Kill" at Chervona Ruta 1991 (3rd prize), Yevshan CD 1992, TV/radio work, 16 albums (I counted ЕСУ's list), book 2006, buried in Briukhovychi, monuments in Lutsk and Kyiv. Order of Merit 2015 (ЕСУ). Hero: decree 323/2020 (zakon).
- Crash: Espreso (2015, Toyota vs milk truck, concert in Kryvyi Rih on 1 Feb), UNIAN (2019, police version: crossed into the oncoming lane on a bend). UNIAN's "secret witness" claim of a staged crash left out (single unverified witness).
- Controversy (2004 tour for Yanukovych; dispute over the Hero title): ZAXID.NET opinion piece (2020). Two sentences in "why it matters"; the coordinator may prefer a short «Дискусії та оцінки» section.
- Tie to Ivasiuk: both graduated from the Lviv Medical Institute (ЕСУ for both); inline link there.
- Aliases: `"kuzma-skriabin": { "uk": ["Кузьм Скрябін", "Андрі Кузьменк", "Кузьменк"], "en": ["Kuzma Skriabin", "Kuzma Skryabin", "Andrii Kuzmenko", "Andriy Kuzmenko", "Kuzmenko"] }`. "Скрябін" alone also matches the band name (and the Russian composer), so not listed bare.

## sviatoslav-vakarchuk
- **Birthplace**: ЕСУ (2005, updated 2016) says Lviv; Слово і Діло and uk.wiki say Mukachevo (wiki: the family returned to Lviv two months later). Used Mukachevo (`zakarpattia`), with a YAML comment; the text says he grew up in Lviv.
- **Parliament**: 2007–2008 (Our Ukraine–People's Self-Defense list; gave up his seat Sept 2008, the Rada ended it 16 Dec 2008: Слово і Діло) and 2019–2020 (Holos; Rada refused to end his powers 18 June 2020, so he left the faction to lose the seat through removal from the list: Interfax, ZN.UA). The exact date his 2020 mandate ended is not in my sources, so the text has no date. Kept brief and neutral.
- Military: lieutenant under contract with the Armed Forces from March 2022, assigned to the Lviv military-civil administration (ArmyInform). His current (2026) status is unclear in the media (ukranews headline "unclear status in the AFU"), so the text only says what he announced in 2022, in the past tense.
- Order of Freedom 2016 (ЕСУ; Слово і Діло says Order of Yaroslav the Wise, not used); "National Legend of Ukraine" 2025 (ВУЕ stub); Yale World Fellow 2015 and the supersymmetry dissertation (Слово і Діло). The fun fact (dissertation and the 2003 album «Суперсиметрія») joins Слово і Діло and ЕСУ.
- Okean Elzy formed 1994 (ЕСУ); 12 October 1994 and the 1998 move to Kyiv (uk.wiki; the move year only in the text).
- nina-matviienko: her sentence is about singing with the band «Океан Ельзи», not with Vakarchuk, so no link (as the brief asked).
- Aliases: `"sviatoslav-vakarchuk": { "uk": ["Святослав Вакарчук", "Вакарчук"], "en": ["Svyatoslav Vakarchuk", "Sviatoslav Vakarchuk", "Vakarchuk"] }`. "Вакарчук" alone also matches his father Ivan Vakarchuk (mentioned in his own profile only).

## Links between the new profiles (this group)
volodymyr-ivasiuk ↔ kuzma-skriabin, sviatoslav-vakarchuk (inline links and `related:` in both directions). These slugs exist only after this batch lands.
