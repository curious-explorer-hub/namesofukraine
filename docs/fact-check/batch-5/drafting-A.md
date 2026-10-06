# Batch 5 – group A (culture and scholarship) drafting report — 2026-10-06

All 5 drafted (uk + en), `reviewed: false`, parsed with js-yaml and `npx astro sync` (schema OK). Role/summary lengths checked (max: role 40, summary 289). ESU (esu.com.ua) opened directly this time (no 429); ЕІУ via http://history.org.ua/?termin=…; IEU opened directly; image licences via the Commons API and file-page wikitext. vue.gov.ua blocked us (Cloudflare 403), so not used.

| slug | image | open issues |
|---|---|---|
| illia-riepin | File:RepinSelfPortrait.jpg, self-portrait 1887, PD-Art (PD-old-auto, d. 1930), 700×833 | No ESU article (letter Р not published); «Дискусії та оцінки» rests on ЕІУ, IEU, CNN (via ABC17 mirror), Hyperallergic. Kharkiv version of «Запорожці» is Wikipedia-only. |
| ahatanhel-krymskyi | File:Krymski_Ahatanheł,_fot_189x.jpg, 1890s photo, PD-old-100-1923 | Death 25.01.1942 is "reportedly" in IEU; ESU gives "8 languages at 18, 50+ later", IEU says "up to 34 languages" — text attributes the ESU figure. Era set to 20th-century. |
| mykola-zerov | File:Зеров_М.jpg, photo by Anton Kurko, 1914–15, PD-Ukraine | ESU prints the slogan as «A fontes!» (typo); used the standard «Ad fontes!». The larger 1920s photo (File:Mykola_Zerov._1920-s.jpg) has only PD-US-expired, so not used. |
| ivan-dziuba | File:Ivan_Dziuba_(2004).jpg, CC BY-SA 3.0 (from ЕІУ), only 283×354 | Group `civic` (see below). Arrest/expulsion order and dates differ (ESU: expelled 2.03.1972, arrested 18.04.1972, tried 12–16.03.1973; IEU: arrested January, expelled April 1972, sentenced April 1973); text gives years only. «Грані кристала» year: ESU 1976, IEU 1978; no year in text. Added a short «Дискусії та оцінки» on the 1973 recantation. |
| viacheslav-briukhovetskyi | File:Vyacheslav_Bryukhovetskyi.JPG, 2009, PD-self, position 50% 40% | **Living: no death report found** (ESU, uk.wiki, NaUKMA library page updated to 1.01.2026, news searches); `living: true`. Born in Vladikavkaz → region `abroad`, RU. No en.wikipedia article. |

## Illia Riepin (Ilya Repin)
- Dates: 05.08.1844 (24.07 O.S.) Chuhuiv – 29.09.1930 Kuokkala (ЕІУ, IEU agree). Era 19th-century (main work 1870s–1890s).
- §7.5: stated precisely: born and raised in Chuhuiv (Sloboda Ukraine), lived and worked mainly in St Petersburg and Kuokkala. Debates section: traditional "Russian painter" label vs ЕІУ "укр. живописець"; the Met's 2023 relabel ("Ukrainian, born Russian Empire") and criticism (Matiossian, Hyperallergic — his piece is mainly about Aivazovsky; the text says only that critics find such reclassifications hasty). No Repin quotes about his origin (none sourced).
- CNN's line that Repin's "mother-tongue was Ukrainian" was NOT used (unsourced).
- Tie to ivan-sirko: the painting's legend (Sirko leads the Cossacks), matching Sirko's own profile. I didn't name the 1889 Sirko study in the text.
- Links in the text: ivan-sirko, taras-shevchenko (1888 portrait, IEU), mykola-hohol (Taras Bulba illustrations, IEU).

## Ahatanhel Krymskyi
- 15.01.1871 (3.01 O.S.) Volodymyr-Volynskyi (today Volodymyr) – 25.01.1942 Kustanai. Era **20th-century**, the same as Vernadskyi and Hrushevskyi (his key institutional work was the Academy, 1918–1929).
- Ties checked: Vernadskyi invited him (ESU); law signed by Skoropadskyi on 14.11.1918, and Krymskyi was among the first academicians that day, permanent secretary (IEU "National Academy of Sciences"); correspondence with Lesya Ukrainka and Franko (ESU); influenced by Drahomanov (ESU, IEU); NKVD arrest 20.07.1941 (ESU).
- §7.5: Crimean-Tatar/Belarusian lineage, called himself a conscious Ukrainian (ESU).
- Not used: ESU's "1970 UN General Assembly list" (looks like a UNESCO anniversary confusion); ESU's "translated the Quran".

## Mykola Zerov
- 26.04.1890 (14.04 O.S.) Zinkiv – 03.11.1937 Sandarmokh (ESU, ЕІУ, IEU agree).
- Kurbas tie checked: ЕІУ "Соловецькі розстріли 1937–1938" lists Zerov and Kurbas in the same group of Ukrainian prisoners sentenced by the Leningrad NKVD troika (protocols of 9–14 October) and shot 27 Oct – 4 Nov 1937. ESU: Zerov's case reviewed 9.10.1937. Both died on 3 Nov per the profiles.
- Khvylovyi tie: met December 1923; supported him at the 24.05.1925 debate and in «До джерел» (ESU, written by I. Dziuba); ЕІУ "Літературна дискусія" names Zerov among participants. Khvylovyi was not at Sandarmokh (suicide 1933), so he's linked only for the discussion.

## Ivan Dziuba
- 26.07.1931 Mykolaivka (Volnovakha raion) – 22.02.2022 Kyiv. Coordinates from Wikidata Q7221982 (YAML comment added).
- **Group `civic`**: he is best known for the dissident treatise and the 1965 protest, and later as minister; this matches Chornovil (civic). The tags `writer` and `human-rights` keep the literary side visible.
- Ties: the Stus/Chornovil 1965 protest (Radio Svoboda 2025 + Korohodskyi memoir quoted there); Kostenko and Symonenko named by IEU as part of the Sixtiers whose aims he voiced; ESU: Symonenko memorial evenings; Paradzhanov (film premiere); author of the ESU Zerov entry; book on Khvylovyi (2005); Shevchenko monograph.

## Viacheslav Briukhovetskyi
- **Living check:** no death found. ESU (no death date), uk.wiki, NaUKMA library collection page (current to 1.01.2026), web searches for «помер»/«пішов з життя» found nothing. `living: true`, "станом на жовтень 2026" on the honorary presidency.
- Era **independence** (his main work, the revival of NaUKMA, is 1991–2007). Group civic; tags `scientist`, `writer` (literary scholar, Writers' Union member since 1982).
- Born in Vladikavkaz; the family returned to Cherkasy two weeks later (Україна молода interview 2012). Private family details from uk.wiki were left out (§7.6). CPSU membership, Rukh co-founding and the «Першого грудня» group are Wikipedia-only, so also left out.
- Ties: books on Lina Kostenko and Mykola Zerov (ESU).

## Suggested back-links / inline links (for the coordinator; not edited)
- ivan-sirko (uk l.63, en equivalent): «картина Іллі Рєпіна» → `[Іллі Рєпіна](/uk/people/illia-riepin/)`; add `illia-riepin` to related.
- vasyl-stus (uk l.44, en): «протест Івана Дзюби» → `[Івана Дзюби](/uk/people/ivan-dziuba/)`; related + ivan-dziuba.
- viacheslav-chornovil, serhii-paradzhanov (l.48 protest sentence), lina-kostenko, vasyl-symonenko: related + ivan-dziuba (Kostenko also + viacheslav-briukhovetskyi).
- les-kurbas: related + mykola-zerov. mykola-khvylovyi: related + mykola-zerov, ivan-dziuba.
- volodymyr-vernadskyi, lesya-ukrainka, ivan-franko, mykhailo-drahomanov: related + ahatanhel-krymskyi.
- taras-shevchenko, mykola-hohol: optional related + illia-riepin.

## Aliases (src/content/aliases.json)
```
"illia-riepin": { "uk": ["Ілл Рєпін", "Рєпін"], "en": ["Ilya Repin", "Illia Riepin", "Repin"] },
"ahatanhel-krymskyi": { "uk": ["Агатангел Кримськ"], "en": ["Ahatanhel Krymskyi", "Ahatanhel Krymsky", "Agatangel Krymsky"] },
"mykola-zerov": { "uk": ["Микол Зеров", "Зеров"], "en": ["Mykola Zerov", "Zerov"] },
"ivan-dziuba": { "uk": ["Іван Дзюб", "Дзюб"], "en": ["Ivan Dziuba", "Ivan Dzyuba", "Dziuba"] },
"viacheslav-briukhovetskyi": { "uk": ["В'ячеслав Брюховецьк"], "en": ["Viacheslav Briukhovetskyi", "Viacheslav Briukhovetsky"] },
```
Notes: «Рєпін» also matches the village Рєпіно (human check). Кримськ- has full-name forms only («Кримське ханство», «кримський хан»). Брюховецьк- has full-name forms only (Hetman Ivan Briukhovetskyi is a namesake). Зеров- also matches his brothers Dmytro and Mykhailo Zerov (human check).
