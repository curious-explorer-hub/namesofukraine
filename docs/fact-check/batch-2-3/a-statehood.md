# Fact-check report — batch A (7 profiles)

**Date:** 2026-10-03 · **Method:** same as `docs/fact-check/batch-1.md`. Every claim was checked against encyclopedia articles that were actually opened and read: **ЕІУ** (history.org.ua, Institute of History, NAS of Ukraine) and **IEU** (encyclopediaofukraine.com). Wikipedia was used only as a secondary cross-check. Every `sources:` URL was fetched. Commons image metadata was checked through the Commons API. **No repo files were edited.**

**Link check:** every `sources:` URL returns HTTP 200 and names the person. The only failing link is one image `source_url`: `libr.dp.ua` (Anna) returned **503** on three tries. Every profile already has two encyclopedic sources (ЕІУ + IEU).

---

### anna-yaroslavna
- **Confirmed:**
  - Yaroslav's daughter; birth year 1024/25 or 1032; born in Kyiv (IEU). The dates are uncertain (ЕІУ new edition: "р.н. невід.").
  - Married Henry I on 19 May 1051 in Reims cathedral; that date is Prou's conjecture (ЕІУ).
  - Three sons; Philip became king (ЕІУ, IEU).
  - Union with Raoul de Valois; protector role (ЕІУ).
  - 28 documents; royal council (ЕІУ).
  - St Vincent's monastery in Senlis, 1065–1069 (ЕІУ).
  - Died between 1075 and 1079 (ЕІУ).
  - Pope Nicholas II's letter of 1059 (ЕІУ).
  - The Reims Gospel link is a myth (ЕІУ).
  - The "letter to her father" is a Druon hoax (ЕІУ).
  - First monument: Senlis, 2005 (ЕІУ).
  - Sources: ЕІУ http://history.org.ua/?termin=Anna_Y · IEU AnnaYaroslavna.htm
- **Issues:**
  - **ERROR (minor)** — uk `misconception.truth`: "а вилки поширилися в Європі лише в XVI столітті - через Італію". Forks were in use in Italy (and Byzantium) long before the 16th century. Only in **France** did they appear no earlier than the 16th century.
    - → uk: "а виделки з'явилися у Франції не раніше XVI століття - через Італію, а не завдяки Анні."
    - → en: "and forks did not reach France until the 16th century - via Italy, not through Anna."
    - Source (also supports the Charlemagne bathing point): https://localhistory.org.ua/texts/statti/piat-mifiv-pro-annu-iaroslavnu/ . The ЕІУ supports the "enlightener myth from Druon's letter" part.
    - Suggest adding the localhistory URL to `sources:`, since the Charlemagne and fork points are not in ЕІУ or IEU.
  - **LINK** — `image.source_url` https://www.libr.dp.ua/?do=ukrainica&lng=2&id=98&idg=728 returns 503, so the credit can't be verified. The author is spelled "А. Орлонов" here, but the same artist appears as "Артур Орльонов" in pylyp-orlyk, where UINP's caption confirms "Художник Артур Орльонов".
    - → uk `author`: "Артур Орльонов, опубліковано Дніпропетровською обласною науковою бібліотекою" and `alt`: "…роботи Артура Орльонова, 2019".
    - → en `image_alt`: "…by Artur Orlionov, 2019". Do this only after the link loads and confirms it is the same artist.
  - **Note (no change required)** — `died: 1075 (circa)` displays as "c. 1075", but ЕІУ gives "між 1075 і 1079" (the body text says this correctly). Acceptable under the "бл." rule.
- **Conflicts:**
  - Birth year: IEU "1024/25 or 1032"; old ЕІУ (Kotliar) "бл. 1032"; new ЕІУ (Vortman) "невідомий". The profile keeps "бл. 1025" with both options in the text. Recommend keeping it.
  - Henry I's marriages: IEU says Anna was his "third wife", old ЕІУ says "second". The profile avoids the number. Keep it that way.

### kniahynia-olha
- **Confirmed:**
  - Born c. 910 (ЕІУ); died 11 July 969 (IEU).
  - Ihor killed in autumn 944; married c. 930; baptismal name Olena (ЕІУ).
  - Derevlianian tribal principality abolished, 945 (ЕІУ).
  - Pohosty and stations; replaced poliuddia (ЕІУ, IEU).
  - Preferred diplomacy; visit 946/957; De Ceremoniis; baptized in Hagia Sophia, "за версією ЕІУ" (ЕІУ). IEU gives the 955 (Chronicle) and the Kyiv-before-957 versions, so "946, 955 або 957" is accurate.
  - Embassy to Otto I, c. 959 (ЕІУ, IEU).
  - Pagan opposition led by Sviatoslav; handed over power in 964; Christian burial (ЕІУ).
  - Ruled during his campaigns (IEU: regent "during his minority… and his later military campaigns").
  - First Rus' ruler to become Christian (IEU).
  - Venerated as equal to the apostles (ЕІУ, IEU).
- **Issues:**
  - **UNSOURCED** — uk `fun_fact`: "Ольгу звільнили від обов'язкового поклону до землі перед троном - рідкісна честь для іноземної гості." Neither ЕІУ, IEU nor the cited РІСУ article says this. It is a common reading of De Ceremoniis (she stood while her retinue prostrated), found in church and popular sources (e.g. spzh.eu, history-rf). Hedge it:
    - → uk: "…за тлумаченням істориків, Ольгу звільнили від обов'язкового поклону до землі перед троном - рідкісна честь для іноземної гості."
    - → en: "…according to historians' reading of the text, Olha was excused from the customary prostration…"
    - Better still, cite a scholarly source, e.g. Featherstone, "Olga's Visit to Constantinople in De Cerimoniis" (https://www.researchgate.net/publication/272462978). Otherwise swap the fun fact for the IEU-sourced one: Otto I sent Bishop Adalbert to Kyiv.
  - **Data (minor)** — `birthplace.country: UA` with "за літописом - Плесков". Pleskov = Pskov (Russia). If `country` drives the birth-region filter, set the country to unknown or leave it as is with `region: unknown`. Owner decision.
  - **Licensing (owner decision)** — the image is from rgbs.ru (Russian State Library for the Blind), "Усі права захищено". It is a Russian state site and the image is not freely licensed. Consider a PD/CC image from Commons.
- **Conflicts:** birth: ЕІУ "бл. 910" vs IEU "ca 890". Recommend ЕІУ (kept).

### danylo-halytskyi
- **Confirmed:**
  - 1201–1264; probably born in old Halych (ЕІУ: "Н., очевидно, в Галичі (давньому)").
  - Elder son of Roman; father died in 1205; fled to Hungary, then to small Volhynian appanages (ЕІУ, IEU).
  - Halych secured in 1238 with the townspeople's support (IEU).
  - Voivode Dmytro in Kyiv; Kyiv, Volodymyr and Halych destroyed (IEU).
  - Battle of Yaroslav, summer 1245, against Rostyslav, the boyars, and Hungarian and Polish troops (ЕІУ; IEU: 17 Aug 1245).
  - Visit to the Horde in 1246 (IEU).
  - Kholm and Kremenets among the new fortresses (ЕІУ).
  - Infantry from the peasantry (IEU).
  - Crown from Innocent IV in Dorohychyn, 1253; the crusade never happened (ЕІУ).
  - Burundai forced the fortifications to be dismantled (ЕІУ, IEU).
  - Died in Kholm; buried in the cathedral of the Holy Mother of God (ЕІУ).
  - Built Lviv (IEU).
- **Issues:**
  - **ERROR** — uk body: "з 1221 року він правив там, а до 1229-го об'єднав волинські землі". ЕІУ: "1214–15 Д.Г. і Василько сіли у Володимирі". He then expelled the Poles from western Volhynia (peace of 1222) and took Lutsk, Peresopnytsia and Chortoryisk in 1227–28. IEU: "Following a long struggle… (1219–27) Danylo unified Volhynia." The year 1221 is not supported (it is the year Mstyslav and Danylo drove the Hungarians from Halych).
    - → uk: "Повертати батьківську спадщину Данило почав з Волині: 1215 року разом із братом Васильком він сів у Володимирі, а до кінця 1220-х об'єднав волинські землі."
    - → en: "Danylo began reclaiming his father's inheritance in Volhynia: in 1215 he and his brother Vasylko took the throne of Volodymyr, and by the end of the 1220s he had unified the Volhynian lands."
    - "(до 1229)" in `key_accomplishments` can stay; it is consistent with both sources.
  - **EN-MISMATCH (spelling)** — en body: "Danylo travelled to the Horde" → "traveled".
  - **EN (consistency, minor)** — en `image_alt`: "King Danylo of Galicia" while `name` is "Danylo of Halych" → "Imagined portrait of King Danylo of Halych wearing a crown, modern painting".
  - **Licensing (owner decision)** — the image is from ukrajna.info.hu, "Усі права захищено", author unknown.
- **Conflicts:** year of Burundai's demand to dismantle the fortifications. IEU: 1260. ЕІУ: Burundai sent "1258". uk Wikipedia: campaign 1259, troops left in 1260. Recommend keeping 1260 (IEU). Optional neutral form: "1259–1260 року".

### dmytro-vyshnevetskyi
- **Confirmed:**
  - Birth year unknown (ЕІУ "р.н. невід."; IEU "b after 1516"). Died 29 Oct 1563 in Istanbul (IEU).
  - Father Ivan Mykhailovych, a starosta; mother a granddaughter of K. Ostrozky through her mother (ЕІУ).
  - Starosta of Cherkasy and Kaniv from the 1540s; relied on the Cossacks (ЕІУ).
  - In 1554 Sigismund II Augustus made him "стражник на Хортиці" (ЕІУ).
  - Began building on Mala Khortytsia (Baida Island) in 1555 (ЕІУ).
  - Campaigns against Ochakiv and Islam-Kermen (ЕІУ).
  - Tatar campaign of Oct 1557 forced him to leave (ЕІУ).
  - Muscovite service 1557–61 (IEU); returned to Sigismund II (ЕІУ).
  - Moldavian campaign of 1563; captured; refused Turkish service; executed (ЕІУ, IEU).
  - Hero of the Baida duma (ЕІУ, IEU).
  - Baida Island and remains of his fortress (Khortytsia reserve page).
- **Image:** Commons file confirmed — unknown artist, 18th century, Public domain, credit "Портрет князя Дмитра Вишневецького (Байди). Невідомий художник. XVIII ст." Matches.
- **Issues:**
  - **OVERSTATEMENT (owner decision)** — uk `role`: "Перший відомий козацький ватажок". IEU calls him "the first Cossack otaman", but ЕІУ says only "один з органiзаторiв запороз. козацтва". Earlier Cossack leaders are documented (e.g. Ostafii Dashkevych, Predslav Liantskoronskyi in the 1510s–1530s), and en.wikipedia notes he "has been called the first Cossack Hetman, although he is not mentioned with this title in 16th-century sources".
    - → uk `role`: "Один з перших козацьких ватажків" (31 chars).
    - → en `role`: "One of the first Cossack leaders".
    - The body sentence "Вишневецького вважають першим достовірно відомим…" is attributed, so it is acceptable. Optionally soften it to "одним з перших відомих".
  - **OVERSTATEMENT (minor)** — uk body: "1563 року під час походу в Молдову, де він претендував на господарський престол". Neither ЕІУ nor IEU mentions a throne claim; en.wikipedia says "perhaps hoping to obtain the throne".
    - → uk: "…в Молдову, де він, імовірно, сподівався здобути господарський престол,…"
    - → en: "…in Moldavia, where he probably hoped to win the throne of the hospodar (ruling prince),…"
  - **EN transliteration (owner decision)** — "Vyshnevetsky", "Ostrozky" are IEU/older style; the official system gives **Vyshnevetskyi**, **Ostrozkyi** (cf. this batch's "Kalnyshevskyi"). The site is already mixed (Hrushevsky, Khvylovy), so treat this as a site-wide decision.
- **Conflicts:**
  - Castle date: ЕІУ "1555" (and the profile's "1555–1556") vs IEU "ca 1552". Recommend ЕІУ (kept).
  - Birthplace: en.wikipedia says Vyshnivets; ЕІУ and IEU are silent. Recommend keeping "Невідомо".
  - Identification with Baida: IEU notes that Soviet historians disputed it; the modern consensus accepts it. No change.

### pylyp-orlyk
- **Confirmed:**
  - Born 21 (11) Oct 1672 in Kosuta, now Belarus, into a noble family (ЕІУ, IEU).
  - Jesuit academy in Vilnius; Kyiv college, 1694 (ЕІУ).
  - Metropolitan's chancellery, then the General Military Chancellery; general chancellor (ЕІУ, IEU).
  - Panegyrics to Mazepa (ЕІУ, IEU).
  - Elected at Bender on 16 (5) Apr 1710 (ЕІУ, IEU). The Pacts were adopted the same day: ЕІУ "Пакти та конституції" article, "ухвалені 16 (5) квітня 1710".
  - Chief author (IEU).
  - 1711 campaign failed (IEU, 1711–14).
  - Sweden 1714, Silesia 1720, Commonwealth 1721; Salonika 1722–1734; Budjak; Moldavia (IEU).
  - Died in Iași (IEU).
  - Diary 1720–32, 5 vols, French MFA archives (IEU).
  - Image credit: the UINP page caption reads "Пилип Орлик. Художник Артур Орльонов". Matches.
- **Issues:**
  - **ERROR (date rule)** — uk `died: 1742-05-26`. ЕІУ gives "05.06(26.05).1742": 26 May is the **old-style** date, 5 June is new style. `born` (21 Oct) already follows new style. Under the site rule (Gregorian from 1582), the death date should be **1742-06-05**. IEU gives 26 May (unmarked); uk.wikipedia gives 24 May. → `died: 1742-06-05`. Text fields mention only the year, so no text change. Source: ЕІУ Orlyk_P (the URL in `sources:`). **Needs owner OK** because sources disagree.
  - **UNSOURCED → add source** — uk `misconception.truth`: "в традиції польсько-литовських pacta conventa". The only cited support is the Artefact pop-history article, which doesn't say this. ЕІУ's article on the document calls it "договір, укладений між обраним гетьманом П.Орликом та козацькою старшиною і козаками", and its Latin title reads "…publico utriusque partis laudo conventa…". That supports the "agreement" framing.
    - Add to `sources:`: "Енциклопедія історії України - «Пакти та конституції…» 1710", https://history.org.ua/?termin=Pakty_i_Konstytutsiia_prav_i_volnostej_Vijska_Zaporozkoho_1710
    - Optionally, if no source for the pacta conventa analogy is added: → uk "…як угоду (договір) гетьмана зі старшиною й запорожцями, подібну до польсько-литовських pacta conventa."
  - **EN-MISMATCH (spelling)** — en body: "panegyrics in Mazepa’s honour" → "honor".
- **Conflicts:**
  - Death date: ЕІУ 5 June NS / 26 May OS; IEU 26 May; uk.wikipedia 24 May. Recommend ЕІУ, 5 June (new style).
  - Salonika: ЕІУ says "з 1734 жив у Салоніках"; IEU says Salonika **until** 1734. The IEU entry is more detailed and was updated in 2026. Recommend IEU (kept).
  - Became general chancellor in 1706 (IEU) or 1707 (ЕІУ). Not stated in the profile; no action.

### petro-kalnyshevskyi
- **Confirmed:**
  - Born 1691 (ЕІУ: "лип. 1691"); IEU gives 1690. The text already gives both.
  - Born in Pustoviitivka, now Romny raion, Sumy oblast (ЕІУ).
  - Military judge in 1760; first elected kish otaman in 1762; re-elected 1765–1775 (ЕІУ, IEU).
  - Encouraged settlement, farming and trade (IEU).
  - Several missions to St Petersburg (ЕІУ: deputations of 1755–56, 1762, 1765).
  - Russo-Turkish War 1768–74; gold medal with diamonds (ЕІУ).
  - Arrested in July 1775; sent to the Solovetsky Monastery prison (ЕІУ).
  - Freed by Alexander I in 1801 and chose to stay (ЕІУ).
  - Died 12 Nov (31 Oct) 1803 (ЕІУ).
  - Canonized by the UOC-KP in 2008 as "Петро Багатостраждальний" (uk.wikipedia, citing the 2008 Local Council materials; listed in "Список святих УПЦ КП").
- **Issues:**
  - **ERROR (minor)** — uk body: "За переказами, на Запорозьку Січ він потрапив ще юнаком і пройшов шлях від молодших посад". ЕІУ: "куди, за переказами, К. потрапив ще в дитячому віці, він пройшов шлях від джури".
    - → uk: "За переказами, на Запорозьку Січ він потрапив ще в дитячому віці й пройшов шлях від джури (зброєносця) до найвищих посад…"
    - → en: "According to tradition, he came to the Zaporozhian Sich as a child and rose from dzhura (an officer's attendant) to the highest posts…"
  - **EN-MISMATCH (spelling)** — en `key_accomplishments[2]` "Travelled" → "Traveled"; en body "he travelled" → "he traveled". "St Petersburg" (summary, accomplishment, body) → "St. Petersburg" (American style).
  - **Licensing (owner decision)** — the image is from pavlusenkoart.com.ua, "Усі права захищено". The page loads and is titled "Калнишевський | Наталя Павлусенко", so the credit matches.
- **Conflicts:**
  - Age at death: ЕІУ "на 112-му році життя"; uk.wikipedia "на 113 році життя" / "112 років". The profile's "112 або 113 років" covers both. Keep.
  - Optional: the UOC-MP also canonized him (2014/2015, uk.wikipedia). No change required.

### roksolana
- **Confirmed (all against ЕІУ, O. Halenko's article Roksolana_N, unless noted):**
  - c. 1505 – 15.04.1558.
  - Real name unknown.
  - Venetian envoys: "з Русі"; Michalo Lituanus: captured by Crimean Tatars; probably sold at the Istanbul slave market.
  - "Хуррем" is Persian for "радість"; the title haseki was created for her first.
  - Six children; the one-son-per-concubine custom.
  - Canonical marriage, probably in the 1530s.
  - Mihrimah married Rüstem Pasha, grand vizier from 28 Nov 1544.
  - Probably persuaded Suleiman against Mustafa; Mustafa executed in 1553.
  - Selim II succeeded.
  - Busbecq invented the name "Роксолана" from Sarmatian tribal names (the fun fact is confirmed verbatim).
  - Twardowski, 17th c.: Rohatyn origin. "Олександра / Настя Лісовська" are 19th-century names without reliable evidence.
  - The "Sultanate of Women"; Busbecq's image of her as witch and schemer.
  - The patriot image goes back to the 19th century (Antonovych and Drahomanov, 1874); TV series 1996–2003; Rohatyn monument 1999; "малохудожній і нереалістичний".
  - Foundations in Istanbul (mosque, women's hospital, madrasas, school, soup kitchen), Edirne, Jerusalem, Mecca and Medina (soup kitchens).
  - Titian portrait c. 1552; all portraits are imaginary.
- **Image:** Commons `File:Khourrem.jpg` — "anonymous / Unidentified painter", 16th century, Public domain. Matches the credit.
- **Issues:** none found. The "Дискусії та оцінки" section is neutral and matches ЕІУ.
- **Conflicts:** IEU (1993 text) states as fact "née Nastia Lisovska, b 1505 in Rohatyn" and death "15 April 1558 (other sources cite 1561)". The newer ЕІУ article rejects the Lisovska name and treats Rohatyn as tradition. Recommend ЕІУ (kept).

---

## Cross-batch notes for the owner
1. **Copyright:** five portraits are "Усі права захищено" from third-party sites: anna-yaroslavna, kniahynia-olha (Russian state site rgbs.ru), danylo-halytskyi, pylyp-orlyk, petro-kalnyshevskyi. These are not fact errors, but they are a licensing risk for a public site. Prefer PD/CC images from Commons or written permission.
2. **American spelling:** 5 fixes (travelled ×3 → traveled, honour → honor, St Petersburg ×3 → St. Petersburg).
3. **Transliteration:** -sky vs -skyi is mixed across the site (Vyshnevetsky vs Kalnyshevskyi). This needs one site-wide rule.

## Summary

| slug | #errors | #other issues | ready-after-fixes |
|---|---|---|---|
| anna-yaroslavna | 1 | 1 (LINK/credit spelling) | yes |
| kniahynia-olha | 0 | 2 (UNSOURCED fun fact; birthplace country) + licensing | yes (licensing: owner) |
| danylo-halytskyi | 1 | 2 (EN spelling, EN alt consistency) + licensing | yes |
| dmytro-vyshnevetskyi | 0 | 3 (role OVERSTATEMENT, throne-claim hedge, transliteration) | needs owner decision (role, transliteration) |
| pylyp-orlyk | 1 (death date, NS rule) | 2 (add ЕІУ source for pacta conventa; EN "honour") | needs owner decision (death date) |
| petro-kalnyshevskyi | 1 | 1 (EN spelling ×2 types) + licensing | yes |
| roksolana | 0 | 0 | yes |

## Applied

Only `src/content/people/{uk,en}/<slug>.md` for these 7 slugs were edited. `role`, `summary`, image fields, `reviewed`, `last_reviewed` and `added` are untouched.

**Not verified:** `npx vitest run src/content` was blocked by the permission system. A substitute YAML-parse check was also blocked. Every edit is either a plain substring change inside existing text or quoted strings, or new `sources:` entries in the same format as the existing ones. Please run the content tests before merging.

### anna-yaroslavna
- uk `misconception.truth`: "а вилки поширилися в Європі лише в XVI столітті - через Італію, а не через Анну." → "а виделки з'явилися у Франції не раніше XVI століття - через Італію, а не завдяки Анні."
- en `misconception.truth`: "forks only spread across Europe in the 16th century" → "forks did not reach France until the 16th century"
- uk `sources:` added "Локальна історія - П'ять міфів про Анну Ярославну" (https://localhistory.org.ua/texts/statti/piat-mifiv-pro-annu-iaroslavnu/)

### kniahynia-olha
- uk `fun_fact`: "«Про церемонії»: Ольгу звільнили…" → "«Про церемонії»; за тлумаченням істориків, Ольгу звільнили…"
- en `fun_fact`: "Book of Ceremonies: Olha was excused…" → "Book of Ceremonies; according to historians’ reading of the text, Olha was excused…"

### danylo-halytskyi
- uk body: "з 1221 року він правив там, а до 1229-го об'єднав" → "1215 року разом із братом Васильком він сів у Володимирі, а до кінця 1220-х об'єднав"
- en body: same change ("in 1215 he and his brother Vasylko took the throne of Volodymyr, and by the end of the 1220s…")
- en body: "travelled" → "traveled"

### dmytro-vyshnevetskyi
- uk body: "де він претендував на господарський престол" → "де він, імовірно, сподівався здобути господарський престол"
- en body: "where he claimed the throne of the hospodar" → "where he probably hoped to win the throne of the hospodar"

### pylyp-orlyk
- uk `died`: 1742-05-26 → **1742-06-05** (ЕІУ new style; follows the accepted rule)
- uk `misconception.truth`: "як угоду … в традиції польсько-литовських pacta conventa" → "як угоду (договір) …, подібну до польсько-литовських pacta conventa"
- en `misconception.truth`: same change ("an agreement (a treaty) … similar to the Polish-Lithuanian pacta conventa")
- uk `sources:` added ЕІУ "«Пакти та конституції законів і вольностей Війська Запорозького» 1710" (https://history.org.ua/?termin=Pakty_i_Konstytutsiia_prav_i_volnostej_Vijska_Zaporozkoho_1710)
- en body: "honour" → "honor"

### petro-kalnyshevskyi
- uk body: "потрапив ще юнаком і пройшов шлях від молодших посад до найвищих" → "потрапив ще в дитячому віці й пройшов шлях від джури (зброєносця) до найвищих посад"
- en body: same change ("as a child and rose from dzhura (an officer’s attendant) to the highest posts")
- en: "Travelled"/"travelled" → "Traveled"/"traveled"; "St Petersburg" ×3 → "St. Petersburg"

### roksolana
- No changes.

## Left for owner
1. **pylyp-orlyk death date.** Applied as 1742-06-05 because it follows the accepted rule. IEU says 26 May and uk.wikipedia says 24 May. If you disagree, revert to 1742-05-26.
2. **Vyshnevetskyi role** "Перший відомий козацький ватажок" / "First known Cossack leader". Recommend "Один з перших козацьких ватажків" / "One of the first Cossack leaders" (ЕІУ: "один з організаторів").
3. **-sky / -skyi transliteration** (Vyshnevetsky, Ostrozky vs Kalnyshevskyi). Recommend one site-wide rule; the official system gives -skyi.
4. **Image credits and licenses (not touched).**
   - Anna: the libr.dp.ua `source_url` returns 503. The artist is spelled "А. Орлонов" but is probably "Артур Орльонов" (as UINP confirms in Orlyk's profile). Fix once the link loads.
   - "Усі права захищено" portraits: anna, olha (rgbs.ru, a Russian state site), danylo, orlyk, kalnyshevskyi. Recommend replacing them with PD/CC images from Commons or getting permission.
   - Danylo en `image_alt`: "King Danylo of Galicia". Recommend "of Halych", to match `name`.
5. **kniahynia-olha `birthplace.country: UA`** for Pleskov (= Pskov). Recommend leaving it unless `country` feeds the region filter.
