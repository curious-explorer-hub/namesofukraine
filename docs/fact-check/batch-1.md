# Fact-check report — batch 1 (28 profiles)

**Date:** 2026-09-29 · **Method:** 4 research agents read each profile and checked every claim against encyclopedia articles they opened. Wikipedia was used only as a secondary cross-check. All fixes were applied by one editor so the style stays consistent. **Status:** fixes applied; **owner approval pending** — no profile is marked `reviewed: true` yet (policy D5).

Abbreviations: **ЕСУ** — Енциклопедія сучасної України (esu.com.ua); **ЕІУ** — Енциклопедія історії України, Інститут історії України НАН (history.org.ua); **IEU** — Internet Encyclopedia of Ukraine, CIUS (encyclopediaofukraine.com). Britannica blocked automated access (HTTP 403) and was not used.

## Result

- **~330 claims confirmed, ~100 issues fixed** (definite errors, overstatements, unsourced claims, tone).
- **Every profile now has ≥1 encyclopedic source** (49 links in total). Each link was checked: it returns 200 and the page contains the person's name.
- Schema check, 19 tests, production build, and all 28 pages: pass.

## 1. Decisions for the owner

Sources disagree on these points. **Owner accepted all "Chosen" values on 2026-09-29**, including the proposed date rule. Text and dates can be refined later.

| # | Profile | Conflict | Chosen | Alternative |
|---|---|---|---|---|
| 1 | **Shukhevych** — birthplace | ЕІУ (Institute of History, NAS): **Lviv**. IEU and Wikidata: Krakovets. | "Львів (за іншими даними — Краковець)", Lviv on the map | Krakovets only |
| 2 | **Mazepa** — death | ЕІУ: **3 Oct** 1709 (22 Sep old style). IEU and Wikipedia: 2 Oct. | 3 Oct (ЕІУ) | 2 Oct |
| 3 | **Mazepa** — birth | ЕІУ: date unknown; traditionally 20 Mar 1639 | "бл. 1639" | "20 березня 1639" |
| 4 | **Bilokur** — death | ЕСУ: **9 June** 1961. Wikipedia: 10 June. | 9 June (ЕСУ) | 10 June |
| 5 | **Amosov** — death | ЕСУ: 13 Dec 2002. Wikipedia: 12 Dec. | 12 Dec (kept) | 13 Dec. ✅ *Resolved 2026-10-03:* 12 Dec confirmed by the National Academy of Sciences of Ukraine (nas.gov.ua) and the Vernadsky National Library (nbuv.gov.ua); ЕСУ is the only authoritative source giving the 13th. NAS page added as a source. |
| 6 | **Arkhypenko** — death | ЕСУ: 24 Feb 1964. IEU and Wikipedia: 25 Feb. | 25 Feb (kept) | 24 Feb |
| 7 | **Stus** — birth | ЕІУ and Wikipedia: 6 Jan 1938. IEU: 8 Jan (the documented date). | 6 Jan (kept) | 8 Jan |
| 8 | **Khmelnytsky** — birth year | Traditional 27 Dec 1595 old style = 6 Jan **1596** new style | "бл. 1595" (the commonly cited year) | "бл. 1596" (strict new style) |
| 9 | **Medieval dates** (Volodymyr, Yaroslav) | Julian dates as the sources give them; converting would add 6 days | Not converted — standard practice, and what ЕІУ/IEU do | Convert |

**Proposed site rule:** dates from 1582 on are new style (Gregorian). Earlier dates are given as in the sources (Julian) and are not converted.

## 2. Most important corrections (definite errors)

- **Sikorsky:** the birth date was old style → **6 June 1889** (ЕІУ "06.06(25.05).1889").
- **Mazepa:** birthplace Біла Церква → **Мазепинці (біля Білої Церкви)** (ЕІУ, IEU).
- **Lesya Ukrainka:** the pseudonym was **chosen by her mother**, Olena Pchilka. It was not Lesya's own "challenge to the empire" (ЕІУ).
- **Chornovil:** "близько 15 років" in prison → **понад 13 років** (ЕСУ).
- **Parajanov:** "понад три десятки нагород" → **16 festival awards** (IEU).
- **Vernadsky:** removed "завжди підкреслював зв'язок з Україною", which ЕСУ and IEU contradict (he held moderate federalist views). His father was **from Kyiv**, not Poltava.
- **Hrushevsky:** the 1931 events were in the wrong order (he was moved to Moscow first, then arrested). He emigrated in **March 1919**, not "after the UNR's defeat".
- **Shukhevych:** "понад шість років" of resistance → **майже шість** (1944–1950).
- **Bilokur:** her works were **not** exhibited in Moscow. The Picasso note now follows ЕСУ, which states he praised her work.
- **Shevchenko:** the role "Батько нової української літератури" (a title traditionally given to Kotliarevsky) → **"Національний поет України"**.

## 3. Sensitive sections rewritten — please read in full

These "Дискусії та оцінки" sections were expanded to reflect the scholarly debate. They keep a neutral tone and avoid both whitewashing and propaganda framing:

- **Bandera** — OUN(b) cooperation with the Abwehr (1939–41; Nachtigall/Roland); the 30 June 1941 Act's text declaring cooperation with Nazi Germany; antisemitic provisions in OUN(b) 1941 documents and the debate over the militia's role in the July 1941 Lviv pogrom; the debate over leadership responsibility for Volhynia (he was imprisoned at the time); the Hero of Ukraine decree annulled by courts (2010–11). Role changed to "Провідник ОУН(р)".
- **Shukhevych** — named the German units plainly (Abwehr-formed Nachtigall; Schutzmannschaft battalion 201 in Belarus, including anti-partisan operations); the Volhynia killings began before he took command, while the 1944 anti-Polish actions in Eastern Galicia took place under his command; the legal status of his Hero title.
- **Konovalets** — UVO/OUN terror methods; integral-nationalist, authoritarian ideology; contacts with foreign intelligence services; and, for balance, his own warnings against over-reliance on terror (ЕСУ).
- **Sheptytsky** — his welcome of the 1941 Act; the **February 1942 letter to Himmler** protesting the killing of Jews; the reason Yad Vashem gives for not recognising him; his brother Klymentii *is* recognised. "Кілька сотень" rescued → "понад 150 (до 200)". Role changed to "Митрополит УГКЦ".
- **Khmelnytsky** — added the Berestechko defeat and the cost of the Crimean alliance (captive-taking). Pereiaslav is now "прийняв протекцію царя".
- **New debates sections:** Sahaidachny (his loyalist policy toward the Commonwealth), Vernadsky (his federalist views).
- **Balance additions:** Khvylovy (communist from 1919, left VAPLITE in 1927, public recantation in 1928); Mazepa (about 20 years as the tsar's ally, the destruction of Baturyn, reburial in Galați); Volodymyr (took power by defeating his brother Yaropolk); Gogol (religious crisis, burning of *Dead Souls* vol. 2). Removed the editorial line "імперія привласнювала таланти".

## 4. Still supported by Wikipedia only (low risk; kept, hedged where needed)

Bandera's brothers in Auschwitz (1942) · the Konovalets–Sudoplatov method (attributed to Sudoplatov's own account) · Shukhevych at the Lysenko Music Institute · Stus's Hero of Ukraine (2005) · Sheptytsky declared Venerable (2015) · Shchedryk at Carnegie Hall (1922) · Amosov's "1000 рухів" and 2nd place in «Великі українці» · Lobanovskyi's 1999 Champions League semi-final, Zelentsov, and the Ballon d'Or players · the naming of KPI and Zhuliany after Sikorsky · Parajanov's Hutsul-dialect film · Leontovych born to a priest's family · Bilokur's rejection by the Myrhorod technical school (hedged: "за спогадами").

## 5. Owner approval checklist

**2026-10-04:** owner approved batch 1. 23 profiles are now `reviewed: true`. The other 5 (volodymyr-velykyi, yaroslav-mudryi, roman-shukhevych, lesya-ukrainka, mykola-khvylovyi) followed the same day, once their all-rights-reserved portraits were replaced with public-domain images. All 28 are published.

For each profile, read the page at `http://localhost:4321/people/<slug>/` and reply "approve <slug>" (or "approve all"). Then Claude sets `reviewed: true` and `last_reviewed`.

| Group | Profiles | Needs your decision |
|---|---|---|
| Artists | taras-shevchenko, kateryna-bilokur, oleksandr-arkhypenko | #4, #6 |
| Military & State | volodymyr-velykyi, yaroslav-mudryi, petro-sahaidachnyi, bohdan-khmelnytskyi, ivan-mazepa, yevhen-konovalets, stepan-bandera, roman-shukhevych, mykhailo-hrushevskyi | #1, #2, #3, #8, #9; **read §3** |
| Writers & Dissidents | ivan-franko, lesya-ukrainka, mykola-khvylovyi, mykola-hohol, vasyl-stus, viacheslav-chornovil | #7 |
| Composers, Theatre & Film | mykola-lysenko, mykola-leontovych, serhii-paradzhanov | — |
| Scientists & Inventors | hryhorii-skovoroda, volodymyr-vernadskyi, serhii-korolov, ihor-sikorskyi, mykola-amosov | #5 |
| Faith | andrei-sheptytskyi | **read §3** |
| Sport | valerii-lobanovskyi | — |
