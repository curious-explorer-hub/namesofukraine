# Batch 5, group C (science, economy, faith): drafting report, 2026-10-06

All 4 drafted (uk + en), `reviewed: false`. Both js-yaml and `astro sync` pass. ESU and ЕІУ were opened with curl (both responded). Image licenses were checked through the Commons API.

| slug | image | open issues |
|---|---|---|
| yurii-kondratiuk | File:Кондратюк,_Юрий.jpg, 1941 photo, PD-Russia-1996, **238×381 (small)** | Death date: ESU gives 22–25 Feb 1942 near Kryvtsovo (Oryol obl.), IEU gives Oct 1941 in Kozelsk raion; we chose ESU (`died_circa`) and put both in «Дискусії». The Houbolt quote in ESU is left out (no original found). The Armstrong fun fact rests on NASA's "reportedly". |
| vadym-hetman | File:НДУ_2_Гетьман_Вадим_Петрович.jpg, Rada open data, "Attribution", **150×200 (tiny)** | The brief said "first head of NBU": he was the **second** (after V. Matviienko), Mar–Dec 1992 (ESU, ЕІУ). The text gives the murder case neutrally (conviction 2003; the prosecutors' Lazarenko version; his denial). No debates section. |
| liubomyr-huzar | File:Lubomyr_Husar_(His_Eminent_Beatitude).jpg, 2010, CC BY-SA 3.0 (Водник) | **Owner decision:** English name. We used the official "Liubomyr Huzar" (IEU, current en.wiki) and added "also spelled Lubomyr Husar" (his own Western spelling). Synod date: 25 Jan 2001 (IEU) vs 26 Jan (ЕІУ), so the text says "January". |
| volodymyr-boiko | File:Бойко,_Владимир_Семёнович_0067_Чуприна_Вадим_А.jpg, 2013, CC BY-SA 4.0, `position: 48% 30%` | **The brief has the wrong death year:** he died 10 June **2015** (ESU, LB.ua), not 2012. Identity confirmed as #50 of «Великі українці» (UNIAN, en/uk.wiki list). We kept **group `civic`** as the brief asked, but it is a weak fit: owner, consider `statehood`, or keep it. |

## yurii-kondratiuk
- **Conflicts:**
  - IEU says *Tem, kto budet chitat'…* was published in 1919. ESU says he wrote it in 1918–19 and it was first printed in 1964. We say "wrote".
  - Death date and place differ (see the table).
  - uk.wiki also lists fringe versions (died in the US in 1952; died in a camp, from Wikipedia and a Segodnya story). We left them out: no encyclopedic support.
- **Unverified:** the ESU snippet about an "oxygen-hydrogen" rocket (dropped). The BBC piece on lunar orbit rendezvous could not be fetched.
- **Name:** "Yurii Kondratiuk" (official transliteration, as IEU uses). "Yuri Kondratyuk" (NASA, en.wiki) is not his own chosen spelling.
- **Ties:**
  - Korolov is verified: they met in Moscow in 1933 (ESU). The inline link is in the body.
  - Kadeniuk has no direct tie. We added him to `related` only as a thematic link, with no inline link. Drop him if related must be direct ties.
- **Back-links:** add `yurii-kondratiuk` to `related` in serhii-korolov (and optionally in leonid-kadeniuk). No existing profile mentions him.
- **Aliases:** `"yurii-kondratiuk": { "uk": ["Юрі Кондратюк", "Кондратюк", "Шаргей"], "en": ["Yurii Kondratiuk", "Yuri Kondratyuk", "Kondratiuk", "Kondratyuk", "Shargei"] }`

## vadym-hetman
- **Group and era:** `statehood` (head of the central bank, MP for two convocations) and `independence` (his main work was in 1990–98). Tags: `economist`, `politician`.
- **Conflicts:**
  - Birth date: ESU says "12.07 (за ін. даними 18.01) 1935". We used 12.07 (ЕІУ, ESU).
  - Chairing the UMVB exchange committee: ESU says 1996, uk.wiki says from 1993, ZN says until his death. The text says "1996".
  - The LB.ua dossier gives "NBU 1992–1995", which contradicts both encyclopedias. Ignored.
- **Unverified:**
  - The Hero of Ukraine decree number (2005). The title is backed by ESU only.
  - The outcome of the court case for Lazarenko himself. The text says only that the prosecutors named him and that he denies it.
- **Ties:** none. The Petrychenko mention is an institution name, so no link (as instructed).
- **Aliases:** `"vadym-hetman": { "uk": ["Вадим Гетьман"], "en": ["Vadym Hetman", "Vadim Getman"] }`. Full name only, because «гетьман» is a common noun. **Note:** this stem will also match «університет імені Вадима Гетьмана» in pavlo-petrychenko. That match needs a human "no".

## liubomyr-huzar
- **Conflicts:** ЕІУ places the Studite monastery in Grottaferrata, IEU near Castel Gandolfo. We used IEU, the newer source (2025).
- **Tie to Sheptytskyi:** both ЕІУ and IEU confirm that his 1972 doctoral thesis was about Sheptytskyi's ecumenism. The inline link is placed there.
- **Back-link:** add `liubomyr-huzar` to `related` in andrei-sheptytskyi.
- **Aliases:** `"liubomyr-huzar": { "uk": ["Любомир Гузар", "Гузар"], "en": ["Liubomyr Huzar", "Lubomyr Husar", "Huzar", "Husar"] }`

## volodymyr-boiko
- **⚖️ Debates section:**
  - The 2000 special privatization law and Pozhyvanov's 2007 challenge in the Constitutional Court. The ruling's outcome is not verified: the ccu.gov.ua PDF could not be read, so the text does not state an outcome.
  - The 2010 ownership dispute (ZN, EP) and the Metinvest deal, in which he got a 5% stake worth an estimated $1–1.2 bn (EP 2011).
  - No unsourced praise or criticism.
- **Wikipedia-only facts we left out:**
  - the nickname "народний директор"
  - honorary citizen of Mariupol (1998)
  - the stadium named after him (2018)
  - the Order of Danylo Halytskyi for football (ESU lists the order but not the reason)
- **Tag:** `entrepreneur` only. `politician` is possible, since he was an MP for three convocations.
- **Ties:** none in existing profiles. `related` is empty.
- **Aliases:** `"volodymyr-boiko": { "uk": ["Володимир Бойк"], "en": ["Volodymyr Boiko", "Volodymyr Boyko"] }`. Full name only, because Boiko is a very common surname. A namesake, the Batkivshchyna MP Volodymyr Boiko, needs a human check.
