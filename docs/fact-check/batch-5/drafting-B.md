# Batch 5, group B (statehood, civic, defenders): drafting report, 2026-10-06

All 5 drafted (uk + en), `reviewed: false`, YAML parsed with js-yaml, role/summary lengths checked (max: role 40, summary 299). ЕІУ, IEU and ESU read directly (HTML). ВУЕ answers only with browser headers (Sentsov entry is a one-line stub). The decree text is from zakon.rada.gov.ua (president.gov.ua returns 403). Image licenses checked with the Commons API.

| slug | image | open issues |
|---|---|---|
| volodymyr-vynnychenko | File:Винниченко_Володимир.2.jpg, PD (unknown author, early 20th c., from the TsDAVO archive), 740×1073 | Death 6 Mar 1951 (ЕІУ, IEU) vs 5 Mar (ESU); birthplace Veselyi Kut (ЕІУ) vs Yelysavethrad (ESU), both now Kropyvnytskyi; Solukha 1973 and Soldatenko 2007 are cited from the IEU bibliography only (books not opened). |
| vasyl-vyshyvanyi | File:Василь_Вишиваний,_1920.jpg, PD-old (anonymous 1920 photo with his autograph), 582×892, `position: 50% 10%` | Death 18 Aug 1948 (IEU, Radio Svoboda, Snyder via Kirkus) vs 18 Sep (ESU); arrest date differs (Aug/Sep 1947, stated in the text); Sheptytskyi tie NOT sourced, so left out; 1930s rest on Gazeta.ua + Kirkus + Radio Svoboda (Snyder's book not opened). |
| mustafa-dzhemiliev | File:Mustafa_Dzhemilev_Senate_of_Poland_02_(cropped).JPG, CC BY-SA 3.0 PL (Senate of Poland, VRTS-confirmed), 1215×1600 | Years in prison: ЕІУ says 15, KHPG adds up sentences to ~13.5 (text uses 15); the decree number 749/2023 comes from zn.ua (zakon/president.gov.ua pages not opened). |
| oleh-sentsov | File:Oleh_Sentsov_Mariupol.jpg, CC BY-SA 4.0 (Ivasykus), 1200×1600, `position: 50% 20%` | Group: **civic** (see below); military status is "as of 2023" (no 2025–26 source found); «Носоріг» is backed only by Wikipedia and a Derzhkino Commons file; detention date 10 vs 11 May 2014 (text: "May 2014"). |
| maksym-yalovtsov | none (no free portrait; the mural photo on Commons was not used, because Ukraine has no freedom of panorama for artworks) | **Unit and birthplace stay disputed** (see below). Publishable in my view: date of birth, date of death, the award, rugby, sport and burial are each backed by ≥2 sources, including the primary decree. |

## Volodymyr Vynnychenko
- Born 28 (16) July 1880: ЕІУ, ESU. IEU's "27 July" is treated as a conversion slip. Died 6 Mar 1951: ЕІУ, IEU (ESU: 5 Mar).
- Birthplace: region kirovohrad, the dot is the Kropyvnytskyi city centre, marked with a YAML comment (Veselyi Kut is now part of the city).
- Debates: his politics (ЕІУ: a Marxist who wavered between independence and a Soviet Ukraine; ESU: "одягти більшовизм в українську одежу"; defenders' points from ESU and ЕІУ); his conflicts (IEU: the Directory's rightist, pro-Entente course); his literary reception (IEU: "individualism and amorality"). The Solukha and Soldatenko titles are named as examples. A checker may want them removed if the books can't be checked.
- Not used: his supposed opposition to a regular army (no source found).
- Back-links: add `volodymyr-vynnychenko` to `related` in symon-petliura, mykhailo-hrushevskyi and pavlo-skoropadskyi. None of them mentions him in the text today, so no inline link is possible without a text edit.

## Vasyl Vyshyvanyi
- §7.5: the text says plainly that he was not Ukrainian by birth or descent: born in Pula (now Croatia), Ukrainian by choice. Region `abroad`, HR.
- ESU calls him a "grandson of Franz Joseph I", which is wrong (he was a distant relative). Not used.
- "Some circles saw him as hetman; he refused the Petriv/Bolbochan plan" and the 1928 Berlin talks with Skoropadskyi: ESU. Leaving UPR service in protest at the alliance with Poland: ESU.
- Not used (Wikipedia only): the 1935 Paris fraud case, the 1989 rehabilitation, "burial place unknown" (Gazeta.ua 2015 suggests Lukianivske cemetery).
- English name: "Vasyl Vyshyvanyi (Wilhelm von Habsburg)". IEU spells it "Vyshyvany"; the -yi form follows the site's transliteration rule.
- Back-links: add `vasyl-vyshyvanyi` to `related` in pavlo-skoropadskyi and yevhen-konovalets (symon-petliura is optional). andrei-sheptytskyi: the tie needs a source first (Commons has a photo, File:Guzhkowsky,_Sheptytskyj,_Habsburg.jpg, but no text source was found).

## Mustafa Dzhemilev
- English spelling **Mustafa Dzhemilev**: used by KHPG, en.wikipedia and most English-language media; slug kept as `mustafa-dzhemiliev`.
- §7.5: "a Crimean Tatar, a native of Crimea, a citizen and politician of Ukraine".
- Era `20th-century` as briefed (his main work, the movement and the prison years, falls before 1991).
- 9th convocation and European Solidarity: Slovo i Dilo and Radio Svoboda; as of Oct 2026 the 9th Rada is still sitting.
- `related: [oleh-sentsov]` is a thematic link (Crimea, Kremlin persecution) with no personal tie. Remove it if that's too loose.

## Oleh Sentsov
- **Group civic, not performing-arts:** the prize he is known for worldwide (Sakharov) and his public weight come from the hunger strike for other political prisoners. His filmography is short (Gamer, Numbers, Rhino). Tags as briefed: filmmaker, human-rights. Consider adding `warrior`.
- English **Oleh Sentsov**: official transliteration, and it is also the en.wikipedia title. The text adds "often spelled Oleg Sentsov".
- The term was served in the Yamalo-Nenets region (Lantos Commission); the map dot is Labytnangi, with a YAML comment saying so.
- Not used: claims about his activism against the annexation (only Wikipedia and an unopened snippet); the summary says "after the occupation".

## Maksym Yalovtsov
- **Agreed:** born 05.08.1990 (Sports Committee of Ukraine "Angels of Sport"; Memorial); died 21.09.2022 on the Zaporizhzhia front (Memorial; uk.wiki); Order for Courage 3rd class, posthumous: **decree 81/2023 of 15.02.2023, verified in the text**, where he is listed as "солдат" under **«у Національній гвардії України»**. Rugby at RC Aviator, grappling titles, the Mriia volunteer unit, the Retroville rescue, burial on 18.10.2022 at Lisove, the mural: Sports Committee and Memorial.
- **Unit:** the decree says the National Guard; Memorial says the Defence Intelligence (HUR) of the MoD; uk.wiki says the Armed Forces. The text says plainly that sources differ and names both.
- **Birthplace:** Memorial and uk.wiki say Russia (RSFSR); the Kyiv and "mid-air" versions from the earlier check were not found in the sources I opened. The data uses `region: unknown, country: RU` with a YAML comment, and the text says sources differ.
- "Регбіст" is his call sign. He was a rugby player and a martial artist; the role reads "Спортсмен і доброволець, «Регбіст»". Nothing graphic: the cause of death (a mine) is left out.
- Back-link (optional): add `maksym-yalovtsov` to `related` in nazarii-hryntsevych.

## Aliases for `src/content/aliases.json`
```json
"maksym-yalovtsov": { "uk": ["Максим Яловцов", "Яловцов"], "en": ["Maksym Yalovtsov", "Yalovtsov"] },
"mustafa-dzhemiliev": { "uk": ["Мустаф Джемілєв", "Джемілєв"], "en": ["Mustafa Dzhemilev", "Dzhemilev", "Dzhemiliev", "Cemilev"] },
"oleh-sentsov": { "uk": ["Олег Сенцов", "Сенцов"], "en": ["Oleh Sentsov", "Oleg Sentsov", "Sentsov"] },
"vasyl-vyshyvanyi": { "uk": ["Васил Вишиван", "Вільгельм Габсбург", "Вишиван"], "en": ["Vasyl Vyshyvanyi", "Vyshyvanyi", "Vyshyvany", "Wilhelm von Habsburg", "Archduke Wilhelm"] },
"volodymyr-vynnychenko": { "uk": ["Володимир Винниченк", "Винниченк"], "en": ["Volodymyr Vynnychenko", "Vynnychenko"] }
```
Note: the bare stem "Вишиван" also matches «Вишиванка» at the start of a sentence, so every match needs a human check.
