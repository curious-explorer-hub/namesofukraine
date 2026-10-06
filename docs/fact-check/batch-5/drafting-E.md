# Batch 5 – group E (sport) drafting report — 2026-10-06

All 4 drafted (uk + en), `reviewed: false`, parsed with js-yaml; role/summary within limits (counted). `vitest`: the internal-link tests pass; the only failures are `aliases.json` missing the 4 new slugs (the coordinator adds them) and another group's unpaired `yurii-kondratiuk`. ESU articles were read as the site's PDF exports (esu.com.ua/pdf/file/<id>.pdf). Image licenses checked through the Commons API.

| slug | image | open issues |
|---|---|---|
| oleh-blokhin | File:Oleg_Blokhin_1977.jpg, Anefo / Nationaal Archief, CC0 (b/w, 1112×1447, not upscaled) | Soviet national-team caps: ESU 109/39 vs en.wiki 112/42 (text just says "record holder"); first Ukrainian Ballon d'Or rests on en.wiki + the Shevchenko profile, ESU only says "best footballer of Europe 1975" |
| serhii-bubka | File:Sergey_Bubka_2013.jpg, Vinod Divakaran / Doha Stadium Plus, CC BY 2.0 | **Owner: English spelling** (see below); ⚖️ «Дискусії та оцінки» on the 2023 Mont Blanc/occupied-territories case; date of the first 6 m (13 June vs 13 July 1985) left out |
| vitalii-klychko | File:2014-09-12_-_Vitali_Klitschko_-_9019_(cropped).jpg, Sven Teschke, CC BY-SA 3.0 DE | Mayor "as of October 2026": the latest I could confirm is June 2026 (kyivcity.gov.ua URC-2026 news, search snippet only; site behind Cloudflare) and uk.wiki; family's move to Ukraine 1984 (kyivcity, snippet) vs 1985 (uk.wiki), so the text says "mid-1980s" |
| volodymyr-klychko | File:Volodymyr_Klychko_(Vladimir_Klitschko)_..._17_February_2023_-_(cropped).jpg, MSC/Kuhlmann, CC BY 3.0 DE | **Birthplace conflict**: ESU says Solnechnyi (now Zhangiztobe), Wikipedia says Semipalatinsk; I used ESU (see below) |

## oleh-blokhin
- **Parliament** (the brief said "Communist faction 1998–2006"; that's not quite right). The ESU and LB.ua dossiers agree: 3rd convocation (1998–2002) on the **Hromada** list, then the Batkivshchyna faction, then the KPU (Communist Party) faction from 2001; 4th convocation (2002–2006) on the **KPU list**, and after about 5 months the **SDPU(o)** (Social Democratic Party, united) faction. In 2006 he ran with the "Ne Tak!" bloc, which didn't get in. The text gives only the two election lists and the move to SDPU(o), in one sentence.
- Coaching: Ukraine 2003–2007 and 2011–2012, Dynamo 2012–2014 (LB.ua, en.wiki); Olympiacos Greek Cup 1992 (ESU).
- Fun fact (15 years in a row in the "33 best" list, 13 times No. 1) is from ESU.
- Lobanovskyi coached Dynamo "from the mid-1970s" (he took over in 1973–74): check that wording.
- **Back-links / inline links for existing profiles:**
  - `valerii-lobanovskyi`: add `oleh-blokhin` to `related:`; link «Олег Блохін» / "Oleh Blokhin" in the sentence on the Ballon d'Or winners (uk «гравці Олег Блохін та Ігор Бєланов отримали «Золотий м'яч»»).
  - `andrii-shevchenko`: add `oleh-blokhin` to `related:` (Blokhin was his national-team coach at the 2006 World Cup); link «Олега Блохіна» / "Oleh Blokhin" in the last sentence on the three Ballon d'Or winners.
- Aliases: `"oleh-blokhin": { "uk": ["Олег Блохін", "Блохін"], "en": ["Oleh Blokhin", "Oleg Blokhin", "Blokhin"] }`

## serhii-bubka
- **English spelling (owner decision):** World Athletics (Hall of Fame and news), Britannica and en.wiki use **"Sergey Bubka"**; the IOC/olympics.com now uses **"Sergii Bubka"**; Ukrainian media in English use "Serhii/Serhiy". I drafted **"Sergey Bubka"** as the established spelling and add "(Serhii)" in the first sentence. If you prefer official transliteration, the name is "Serhii Bubka" (the slug already matches).
- NOC presidency 2005–2022 and IAAF vice-presidency 2007–2023 are from ESU. He didn't stand for the World Athletics Council in 2023. "IOC member (since 1999)": I couldn't confirm he is still a member as of 2026 (olympics.com timed out). LB.ua says that in 2018 his membership became an individual one. Check this or drop "since".
- Parliament 2002–2006 (For a United Ukraine! list, then the Party of Regions faction) and unpaid adviser to Yanukovych 2010–2014: LB.ua dossier + en.wiki.
- **Debates section (⚖️):** Bihus.Info's July 2023 investigation (the Russian-registered company Mont Blanc, co-owned by Serhii and Vasyl Bubka, supplied fuel to the occupation authorities) is reported by Babel (6 Sep 2023, with Bubka's denial) and Ukrainska Pravda (3 Nov 2023: Vasyl Bubka served a notice of suspicion in absentia; proceedings concerning Serhii, but **no suspicion served on him**). Heraskevych's call to strip the Hero title (26 Feb 2026) and Minister Bidnyi's reply (9 Apr 2026) are from Espreso. The section doesn't say how things stand now. I couldn't open the Bihus.Info original, so it's cited through Babel and UP.
- Not used: LB.ua's notes on NOC tenders (2007) and Rodovid Bank. They are older, single-source, and not needed.
- Fun fact (he nearly skipped the Paris 1985 meet) is from the World Athletics 2025 feature. The WA HoF page and en.wiki give 13 June 1985 and the WA feature 13 July, so the day is left out.
- Back-links: none existing (no profile names him). A possible later tie is the Donetsk/Luhansk sport theme.
- Aliases: `"serhii-bubka": { "uk": ["Сергі Бубк", "Бубк", "Бубц"], "en": ["Sergey Bubka", "Serhii Bubka", "Serhiy Bubka", "Sergii Bubka", "Bubka"] }`. Note: "Бубк"/"Bubka" also matches his brother Vasyl, but only inside this profile.

## vitalii-klychko
- 🌍 Born in Belovodskoye (Chüy Region, Kyrgyzstan), where his father, a Soviet officer, was serving (ESU; father's service from uk.wiki and zn.ua). The family moved through many garrisons and settled in Kyiv in the mid-1980s (zn.ua; kyivcity 1984 / uk.wiki 1985). Coordinates 42.83, 74.10 (en.wiki).
- Framed by sport as instructed. Politics gets one short paragraph with no assessments: UDAR leader from 2010 (founded in 2010), MP and faction head 2012–2014, mayor of Kyiv since May 2014, re-elected 2015 and 2020 (Interfax, uk.wiki). Not mentioned: the Kyiv City State Administration and the wartime disputes.
- The 2005 retirement (injuries) and the 2008 comeback are from en.wiki; WBC 2004–05 and from 2008 are from ESU; the December 2013 vacating of the title is from SI.
- Fun fact: asteroid 212723 Klitschko, named in 2007 (ESU).
- Aliases: `"vitalii-klychko": { "uk": ["Віталі Кличк", "Віталій Кличко"], "en": ["Vitali Klitschko", "Vitalii Klychko", "Vitaliy Klitschko"] }`. Full-name forms only, because "Кличк"/"Klitschko" is shared by the brothers.

## volodymyr-klychko
- 🌍 **Birthplace:** ESU (2013): "селище Солнечний, нині Жангіз-Тобе Східно-Казахстанська обл."; uk/en.wiki: Semipalatinsk (Semey). zn.ua: "в Казахстане, недалеко от Семипалатинска", which fits Solnechnyi. I chose ESU (encyclopedic), used Zhangiztobe's coordinates (49.22, 81.214, ru.wiki), added a YAML comment, and the text gives both versions. It doesn't affect the map region (abroad, KZ).
- Title reigns: ESU (through 2013) + uk.wiki; the 2015 Fury loss, the 2017 Joshua defeat and the retirement are from Arab News (AFP) and WBA; 64–5, 53 KO. The 2 Feb 2022 Territorial Defence registration is from Al Jazeera.
- Fun fact (1996 medal auctioned for $1M in March 2012 for the Klitschko Brothers Foundation; the buyer returned it) is from PolitiFact. I left out a misconception card: the 2022 "he sold it for the war" version is a single viral post, not an established myth.
- `related:` the brothers point to each other (both files exist), with an inline link in each "Хто він" / "Who he is".
- Aliases: `"volodymyr-klychko": { "uk": ["Володимир Кличко", "Володимира Кличк", "Володимир Кличк"], "en": ["Wladimir Klitschko", "Volodymyr Klychko", "Vladimir Klitschko"] }`. Full-name forms only (namesake brothers).
