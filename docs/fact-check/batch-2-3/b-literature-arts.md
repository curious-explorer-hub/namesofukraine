# Fact-check report — batch B (7 profiles)

**Date:** 2026-10-03 · **Method:** same as batch 1. Every `sources:` URL was downloaded and its text searched. Claims were checked against the encyclopedia articles themselves (ЕСУ, ЕІУ, IEU); Wikipedia and Wikidata were used only as a cross-check. Image credits were checked against the Wikimedia Commons API (author, license, date). Repo files were **not** edited.

Abbreviations: **ЕСУ** — Енциклопедія сучасної України · **ЕІУ** — Енциклопедія історії України (history.org.ua) · **IEU** — Internet Encyclopedia of Ukraine.

**Link check:** 33 of 35 source URLs return 200 and mention the person. Two fail: `museumshevchenko.org.ua/element.php?id=171` returns **404** (Vovchok), and `vue.gov.ua/Примаченко,_Марія_Овксентіївна` returns **403** (a Cloudflare bot block, so it may still load in a browser; Prymachenko). Every profile has at least one encyclopedic source that loads.

**Lengths:** every role (≤40) and summary (≤300) in both languages is within the limit. The longest is the EN Marchuk summary at 285.

---

### ivan-kotliarevskyi

- **Confirmed:** born 09.09(29.08).1769 and died 10.11(29.10).1838 in Poltava, new style is correct (ЕІУ; IEU) · Poltava Theological Seminary 1780–89 (ЕІУ; IEU) · clerk and private tutor (ЕІУ) · army service from 1796 (ЕІУ "1796–1808") · Russo-Turkish War 1806–1812 (ЕІУ) · from 1810, trustee of the home for children of poor nobles (ЕІУ; IEU) · *Eneida* parts 1–3 printed in St Petersburg in 1798 without his knowledge (ЕІУ), paid for by Maksym Parpura (IEU) · first full edition in 1842, after his death (ЕІУ; IEU) · *Natalka Poltavka* and *Moskal-charivnyk* written in 1819 for the Poltava theatre, the start of new Ukrainian drama (ЕІУ) · artistic director of the Poltava theatre 1819–21 (ЕІУ) · 1903 monument in Poltava (ЕІУ) · the misconception: "first work of new Ukrainian literature written in the vernacular", not the first Ukrainian work (ЕІУ; IEU "founder of modern Ukrainian literature") · Poltava coordinates (Wikidata). Image: Commons author "Леонтій Каштелянчук", "Public domain" — matches.
- **Issues:**
  - **OVERSTATEMENT** — uk `key_accomplishments[3]`: "Під час війни 1812 року сформував і очолив 5-й козачий полк". The body has the same wording ("сформував і очолив 5-й козачий полк"), and en says "raised and commanded" in both places. ЕІУ: "сформував 5-й козац. полк, отримав чин майора". IEU: "organized a Cossack cavalry regiment … and served in it as a major". Neither source says he commanded it. → uk: "Під час війни 1812 року сформував 5-й козачий полк і отримав чин майора". → en: "During the war of 1812 he raised the 5th Cossack Regiment and was made a major". Sources: ЕІУ (source 1), IEU (source 2).
  - **EN-MISMATCH (spelling)** — en `key_accomplishments[2]` "Headed the Poltava theatre" and body "headed the Poltava theatre", "the new Ukrainian theatre". → "theater" (American spelling).
  - **LINK / license (owner decision)** — `image`: the Commons page tags the file `{{PD-Art|PD-old-70}}`, but the date is "?" and the only source is a tweet. I could not find the artist's dates, so I could not verify that the author died more than 70 years ago. The credit fields do match Commons. Low risk, but if a better-documented portrait is ever needed, the Tropinin portrait is a safe public-domain choice.
- **Conflicts:**
  - Poltava theatre directorship: ЕІУ **1819–21** · IEU **1812–21** ("Poltava Free Theater") · uk.wikipedia **1816–1821**. Recommend keeping 1819–21 (ЕІУ).
- **Wikipedia only (low risk):** that cultural figures from both sides of the Russian–Austrian border attended the 1903 monument opening (uk.wikipedia, photo caption and Plokhy reference).
- Encyclopedic source: present (ЕІУ + IEU).

### marko-vovchok

- **Confirmed (ЕСУ unless noted):** born 10(22).12.1833 on the Yekaterininskoye estate (Lipetsk Oblast); died 10.08.1907, new style correct · noble family of Ukrainian-Polish origin (supports the misconception's "truth") · Kharkiv boarding school 1846–48 · married O. Markovych in 1851 · lived in Chernihiv (1851–53), Kyiv (1853–55) and Nemyriv (1856–58), where she studied the language and folklore · *Народні оповідання* · Petersburg in early 1859 with Shevchenko, who dedicated the poem «Марку Вовчку» to her (1859) and called her "доне" (litopys.org.ua) · abroad 1859–67 in Germany, Britain, Switzerland, France and Italy · ran the journal «Переводы лучших иностранных писателей» and translated 15 Jules Verne novels plus Darwin and Brehm · second husband Lobach-Zhuchenko (from 1878) · Kulish's pen name and «Маруся» as a children's book in France (IEU; uk.wikipedia). Image matches Commons (unknown author, PD).
- **Issues:**
  - **ERROR** — uk `fun_fact`: "1859 року Тарас Шевченко разом з друзями в Петербурзі зібрав гроші, купив золотий браслет і надіслав його Марку Вовчку до Немирова…". The bracelet was bought and sent in **July 1858**: the Petersburg community collected 120 roubles at Shevchenko's initiative. In 1859 she was no longer in Nemyriv. → "1858 року Тарас Шевченко разом з друзями в Петербурзі зібрав гроші, купив золотий браслет і надіслав його Марку Вовчку до Немирова - разом з автографом свого вірша «Сон»." en: "In 1858 Taras Shevchenko…". Sources: https://www.t-shevchenko.name/uk/Guide/VovchokM.html ("у липні 1858 року … зібрала 120 карбованців і придбала … золотий браслет"); Ukrinform (source 2): "13 липня 1858 р. … надіслав у Немирів".
  - **ERROR (sequence)** — uk body: "1859 року в Петербурзі письменниця познайомилася з Тарасом Шевченком: він присвятив їй вірш «Марку Вовчку», де називав її «моя ти доне», і разом з друзями надіслав їй у подарунок золотий браслет." The bracelet came *before* they met. → "Ще 1858 року Шевченко разом з друзями надіслав їй до Немирова золотий браслет, а на початку 1859 року в Петербурзі вони познайомилися особисто: він присвятив їй вірш «Марку Вовчку», де називав її «моя ти доне»." Make the matching change in en. Sources: as above, plus ЕСУ ("На поч. 1859 жила у С.-Петербурзі").
  - **ERROR (minor)** — uk body: "померла 1907 року в селі Долинське поблизу Нальчика". ЕСУ: "х. Долинськ, нині у межах м. Нальчик". → "померла 1907 року на хуторі Долинськ (нині в межах Нальчика)". en: "died in 1907 at the Dolinsk farmstead (now part of Nalchik)". Source: ЕСУ (source 1).
  - **LINK** — `sources[2]` "Національний музей Тараса Шевченка - Вересень в житті Шевченка" (http://museumshevchenko.org.ua/element.php?id=171) returns **404**. → Replace it with "Тарас Шевченко. Енциклопедичний довідник - Вовчок Марко": https://www.t-shevchenko.name/uk/Guide/VovchokM.html. This page loads and supports the bracelet fact.
  - **Precision (low)** — uk body: "Іван Тургенєв видав російський переклад її оповідань". ЕСУ: "рос. переклад за ред. І. Тургенєва". uk.wikipedia notes the translator was most likely Kulish. → "Російський переклад її оповідань вийшов за редакцією Івана Тургенєва (1859)." en: "A Russian translation of her stories, edited by Ivan Turgenev, came out in 1859." Source: ЕСУ.
  - Optional: `birthplace` has no coordinates. Wikidata (Єкатерининське, Q2421158) gives lat 52.614, lon 38.327.
- **Conflicts:**
  - *Народні оповідання* date: ЕСУ **1857** · uk.wikipedia and t-shevchenko.name: printed with an **1858** title page and released early 1858. Recommend keeping 1857 (ЕСУ, and the commonly cited censorship/printing year).
- **Suggested additional encyclopedic source:** IEU — Vovchok, Marko: https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CV%5CO%5CVovchokMarko.htm (verified 200, entry present). ЕСУ already satisfies the policy.

### olena-teliha

- **Confirmed (ЕІУ unless noted):** born 21.07.1906 in Іллінське (Moscow gubernia) · moved to Kyiv in 1918, Poděbrady in 1922 · studied at УВПІ in Prague 1923–29 · married Mykhailo Teliha in 1926 · Warsaw 1929–39, teaching at a Ukrainian school · *Вістник* (Dontsov) from 1933 · joined OUN in December 1939 and worked in the cultural section under Olzhych · headed «Зарево» in Cracow · arrived in Kyiv on 22.10.1941 with the expeditionary groups · headed the Union of Ukrainian Writers and edited «Літаври» · saved Yakiv Halperin · arrested 09.02.1942 · death date 13 or 21 Feb · *Душа на сторожі* (1946) · refused to cooperate after *Ukrainske slovo* was replaced (IEU) · equal role of women (IEU) · 1992 cross at Babyn Yar (IEU) · language anecdote and her words "говорити лише українською мовою" (Radio Svoboda, quoting *Вісник* 1934) · 2017 Babyn Yar monument and the Ukrainian Jewish Committee's objection (JTA; Radio Svoboda) · 2007 NBU coin (uk.wikipedia). The debates section is neutral and balanced. Image matches Commons (unknown author, PD, ca. 1929).
- **Issues:**
  - **EN-MISMATCH / name form** — uk body: "Олена Шовгенева … в родині інженера-гідротехніка Івана Шовгенева". en: "Olena Shovheniva … Ivan Shovheniv". The two files differ, and ЕІУ uses **Шовгеніва / Шовгенів**. → uk: "Олена Шовгеніва … в родині інженера-гідротехніка Івана Шовгеніва". en is then correct. Source: ЕІУ (source 1).
  - **UNSOURCED (low)** — uk body: "бандуриста й колишнього старшину армії УНР Михайла Телігу". The sources call him a Kuban Cossack, bandurist and student of the Ukrainian Husbandry Academy (ЕІУ; Radio Svoboda). "Вояк Армії УНР" is attested, but "старшина" (officer) is not. → "бандуриста, кубанського козака й колишнього вояка Армії УНР Михайла Телігу". en: "Mykhailo Teliha, a bandura player, Kuban Cossack and former soldier of the army of the Ukrainian People's Republic". Sources: Radio Svoboda (source 3); uk.wikipedia «Теліга Михайло Якович».
  - **Precision (low)** — uk body: "У грудні 1939 року Теліга вступила до ОУН (крило Андрія Мельника)". The OUN did not formally split until 1940, so in December 1939 there was no "Melnyk wing" yet. ЕІУ just says "вступила до ОУН" and places her in Olzhych's cultural section of the ПУН. → "У грудні 1939 року Теліга вступила до ОУН (після розколу 1940 року - на боці Андрія Мельника)". en: "joined the OUN (after the 1940 split, on the side of Andrii Melnyk)". Source: ЕІУ.
  - **UNSOURCED** — uk debates: "Газета «Українське слово» … восени 1941 року друкувала й антисемітські матеріали". The only listed source is JTA, which reports this as an accusation by Eduard Dolinsky (and names the paper wrongly). The fact is well documented in scholarship, but no scholarly source is cited. → Keep the text and add a scholarly source, e.g. K. Berkhoff, *Harvest of Despair* (2004), ch. on the press, or Rudling (2011), already cited in en.wikipedia. If no source is added, attribute the claim: "За оцінкою істориків, газета «Українське слово» … друкувала й антисемітські матеріали."
  - **TONE (low)** — uk `summary`: "яка виросла в російськомовній родині". Her father was Ukrainian (uk.wikipedia), and the source (Radio Svoboda) and the body both say "середовище". → "яка виросла в російськомовному середовищі". en: "who grew up in a Russian-speaking environment".
  - **EN-MISMATCH (spelling)** — en body: "a coin in her honour" → "honor".
- **Conflicts (already disclosed in the text, fine):**
  - Birth: ЕІУ **21.07.1906, Іллінське** · IEU **21 July 1907, Saint Petersburg**. Keep ЕІУ (also Wikidata/uk.wikipedia).
  - Death: **21 Feb** · **13 Feb** (Shtul-Zhdanovych, ЕІУ). Keep 21 Feb as the commemorated date. "найімовірніше" for the Babyn Yar burial is appropriately hedged (ЕІУ states it flatly).
- Encyclopedic source: present (ЕІУ + IEU).

### lina-kostenko (living)

- **Confirmed:** born 19.03.1930 in Rzhyshchiv, coordinates correct (ЕСУ; IEU; Wikidata) · teachers' family and move to Kyiv in 1936 (uk.wikipedia) · first poems 1946 (ЕСУ) · Kyiv Pedagogical Institute and Literary Institute 1952–56 (ЕСУ) · the three collections 1957/1958/1961 (ЕСУ; IEU) · Skaba 1963 and the "ідейна нечіткість" charge (ЕСУ) · «Зоряний інтеграл» and «Княжа гора» pulled from production (ЕСУ) · 16-year gap until 1977 (ЕСУ) · open letters in 1965 and 1968 (IEU) · *Маруся Чурай* (1979) + *Неповторність* → Shevchenko Prize 1987 (IEU) · *Берестечко* written mainly in the late 1960s, published 1999 (ЕСУ) · Chornobyl heritage work (ЕСУ) · *Записки українського самашедшого* 2011 (ЕСУ) · "one of the earliest" Sixtiers (IEU) · the *Берестечко* quote, word for word (ЕСУ) · never imprisoned (no source mentions an arrest).
- **Issues:**
  - **POLICY (living person)** — the text has no "as of <date>" marker (§7.6). The body uses the present tense ("Костенко багато працює…"). → Add, for example, at the end of «Головне»: "(станом на жовтень 2026 року)". en: "(as of October 2026)".
  - **POLICY / license (owner decision)** — `image.license: "Усі права захищено"`, from koroldanylo.com.ua (the page loads). §7.6 requires freely licensed images for living people. → Replace it with a freely licensed Commons photo, or drop the image until one is found.
  - **UNSOURCED** — uk `misconception.truth`: "Її переслідували - 16 років не друкували книжок, викликали на допити, - але…". No source I checked (ЕСУ, IEU, uk/en.wikipedia) mentions interrogations. → "Її переслідували - 16 років не друкували її книжок, вилучали збірки з виробництва, - але, на відміну від багатьох колег-шістдесятників, тюремного терміну вона не мала." en: "She was persecuted - her books went unpublished for 16 years and collections were pulled from production - but unlike many…". Source: ЕСУ (source 1).
- **Conflicts:**
  - First publication: ЕСУ **1946** · IEU **"early 1950s"**. The fun fact depends on 1946. Recommend keeping ЕСУ.
  - *Записки…*: ЕСУ **2011** · uk.wikipedia **2010** (released Dec 2010, bestseller of 2011). Keep 2011 (ЕСУ).
  - *Берестечко* composition: ЕСУ "late 1960s" · IEU "1966". The text's "наприкінці 1960-х" is compatible with both.
- Encyclopedic source: present (ЕСУ + IEU).

### ivan-marchuk (living)

- **Confirmed (ЕСУ unless noted):** born 12.05.1936 in Moskalivka, Lanivtsi raion, Ternopil oblast; coordinates 49.746/26.132 match Wikidata Q4303621 · painter, graphic artist and sculptor · Lviv school of applied art (1956) and Lviv institute (1965) · Kyiv: monumental-decorative art combine (1968–84) and magazine illustration · official non-recognition and KGB pressure · Union of Artists 1988 (also IEU) · Australia 1989, Canada 1990, USA 1990–2001, returned 2001 · *пльонтанізм*, first used in 1972, and its description · «Голос моєї Душі» incl. «Шевченкіана» 1982–84 · the cycles «Кольорові прелюдії» and «Біла планета» · holdings in NAMU, the National Museum in Lviv and Kaniv · Shevchenko Prize 1997 · People's Artist 2002 · «Національна легенда України» 2021 · 2026 retrospective at the Museum of Kyiv History, 12 Mar–17 May 2026 (Kyiv Post, source 3). Image matches Commons (Yurii Hanchuk, CC BY 4.0, Rome, 10 Feb 2025).
- **Issues:**
  - **ERROR** — uk body: "1965 року - Інститут декоративного та прикладного мистецтва, де його викладачами були, зокрема, Карло Звіринський і Роман Сельський". ЕСУ lists Zvirynskyi (and O. Shatkivskyi) at the **училище**, and D. Dovboshynskyi and R. Selskyi at the **institute**. → "1956 року закінчив училище прикладного мистецтва (серед викладачів - Карло Звіринський), а 1965 року - Інститут декоративного та прикладного мистецтва (серед викладачів - Роман Сельський)." en: "in 1956 he graduated from the School of Applied Art (his teachers included Karlo Zvirynskyi), and in 1965 from the Institute of Decorative and Applied Art (his teachers included Roman Selskyi)." Source: ЕСУ (source 1).
  - **EN-MISMATCH** — en heading "## Who he was". He is living. → "## Who he is".
  - **POLICY (living person)** — no "as of <date>" marker. → e.g. "Він лауреат Шевченківської премії (1997) і народний художник України (2002) (станом на жовтень 2026 року)." / "(as of October 2026)". Optionally add the Order of Freedom (2016) and the Order of Prince Yaroslav the Wise, 5th class (2026), both listed in ЕСУ.
  - FYI, not a profile issue: Wikidata Q115440831 gives his birthplace as Brest (wrong). The profile follows ЕСУ/IEU correctly.
- **Conflicts:** none material. IEU gives the birthplace as "Kremianets county, Volhynia voivodeship", the interwar Polish administrative unit, which is consistent.
- Encyclopedic source: present (ЕСУ + IEU).

### kazymyr-malevych

- **Confirmed (ЕСУ unless noted):** born 11(23).02.1879 in Kyiv; died 15.05.1935 in Leningrad; new style correct · Murashko's Kyiv Drawing School 1895–96 · Vitebsk 1919–22 · director of the Institute of Artistic Culture in Leningrad 1923–26 · professor at the Kyiv Art Institute 1928–30 · solo exhibition in Kyiv in 1930 · the start of repression in Ukraine made him return to Leningrad · founder of Suprematism · *Чорний квадрат*, *Чорне коло*, *Чорний хрест* (all 1915) · books «От кубизма к супрематизму» (1916) and «Супрематизм» (1920) · folk-art and icon features · student Lissitzky · Kyiv street named in 2012 · articles in *Нова ґенерація* (ЕСУ; IEU "13 articles … 1928–9") · Polish family, with sources differing on his mother (IEU: Ukrainian mother from Poltava region) · shifting self-identification as Polish or Ukrainian · post-2022 relabeling by the Met and the Stedelijk, and no consensus (en.wikipedia). **The Ukrainian connection is stated precisely and does not overclaim:** born in Kyiv, Polish family, worked in Ukraine, self-identification contextual. This meets §7.5. Image matches Commons (unknown author, PD, c. 1925). The EN name "Kazimir Malevich" follows the precedent of Gogol, Archipenko and Sikorsky (established English form).
- **Issues:**
  - **ERROR** — uk `misconception.truth`: "За версією Третьяковської галереї, рентген і інфрачервоне сканування «Чорного квадрата» 2015 року виявили авторський напис, що, можливо, відсилає саме до цього жарту." The 2015 pencil inscription was found and read under a **binocular microscope**. X-ray and infrared imaging revealed the earlier paint layers, not this inscription. The Tretyakov team attributed the writing to Malevich, but this is disputed: A. Shatskikh argues it was later vandalism. → "2015 року фахівці Третьяковської галереї під мікроскопом прочитали на білому полі «Чорного квадрата» олівцевий напис «Битва негрів…», який, можливо, відсилає саме до цього жарту. Галерея вважає напис авторським, але частина дослідників це заперечує." en: "In 2015 Tretyakov Gallery researchers, working under a microscope, read a pencil inscription on the white border of Black Square, “Battle of negroes…”, which may allude to exactly this joke. The gallery attributes it to Malevich, but some scholars dispute this." Sources: https://www.e-flux.com/journal/85/155475/inscribed-vandalism-the-black-square-at-one-hundred ; https://publicdomainreview.org/essay/black-squares-before-malevich/
  - **UNSOURCED** — the misconception (Allais and the 2015 inscription) has no supporting entry in `sources:`. → Add the two URLs above.
  - **Precision (low; owner check)** — uk `fun_fact`: "Малевич друкував свої статті про мистецтво українською мовою". He wrote in Russian, and the Kharkiv journal printed the articles in Ukrainian. As worded, it suggests he wrote in Ukrainian. → "Наприкінці 1920-х статті Малевича про мистецтво виходили українською мовою в харківському журналі «Нова ґенерація»." en: "In the late 1920s Malevich's articles on art appeared in Ukrainian in the Kharkiv journal Nova Generatsiia." Sources: IEU (source 2), ЕСУ (source 1, article titles in Ukrainian). The original-language point is common knowledge, but I did not confirm it in an encyclopedia, so the new wording simply avoids the implication.
- **Conflicts:**
  - Birth year: ЕСУ **1879** (also Wikipedia, Wikidata) · IEU **1878** (Commons caption also says 1878). Keep 1879.
  - Kyiv Art Institute: ЕСУ **1928–30** · IEU **1927–9** · uk.wikipedia **1927–1930**. Keep 1928–30 (ЕСУ).
  - *Black Square* date: ЕСУ **1915** · IEU **1913**, the date Malevich himself backdated it to. Keep 1915.
  - «От кубизма к супрематизму»: ЕСУ **1916**. The first edition, with a different subtitle, came out in 1915. Keeping 1916 (ЕСУ) is acceptable.
- Encyclopedic source: present (ЕСУ + IEU).

### mariia-prymachenko

- **Confirmed (ЕІУ unless noted):** born 30.12.1908 (12.01.1909) in Bolotnia; died 18.08.1997 there; new style correct · childhood polio and lifelong disability · learned embroidery · from 1935 at the School of Folk Art Masters / Central Experimental Workshops at the Lavra, working there 1935–38 · mentors were folk masters and professional artists (Krychevsky, Kasiian, Petrytsky…) · 1936 First Republican Exhibition in Kyiv, Moscow and Leningrad, with first prize and 1st-class diploma · 1937 World's Fair in Paris (ЕІУ exhibition list) · watercolour, then gouache · coloured backgrounds from the mid-1960s · more than 60 years of work · more than 120 exhibitions · verse captions from the 1970s · children's book illustrations · Chornobyl series 1986 · Shevchenko Republican Prize 1966 · People's Artist of the UkrSSR 1988 · UNESCO 2009 · "понад 800 робіт" and the largest collection at НМУНДМ (650; uk.wikipedia) · the Picasso phrase correctly hedged (Meduza, source 4) · Ivankiv museum hit around 28 Feb 2022 and works carried out by the guard and his wife (Хмарочос, source 3).
- **Issues:**
  - **POLICY / license (owner decision)** — `image.license: "Усі права захищено"`, a collage from ukrcy.news (the page loads). The site text is CC BY-SA, and this image is not freely licensed (§7.8). → Replace it with a freely licensed Commons file, or get permission. I know this image was chosen by the owner, so this is flagged for awareness only.
  - **LINK** — `sources[1]` "Велика українська енциклопедія - Примаченко…" (vue.gov.ua) returns **403** to automated requests (Cloudflare). I could not verify its content. → Open it in a browser. If it does not load, remove it. ЕІУ already satisfies the policy, and IEU has no entry (the PrymachenkoMaria.htm file is not found).
  - **UNSOURCED (low)** — uk body: "Охоронець музею з дружиною та односельцями під обстрілом винесли…". The cited source (Хмарочос) names only the guard Anatolii and his wife Nataliia. → "Охоронець музею разом із дружиною під обстрілом винесли з палаючої будівлі роботи Примаченко, і вони вціліли." en: "The museum's guard and his wife carried Prymachenko's works out of the burning building under fire, and they survived." Source: Хмарочос (source 3).
  - **Precision (low)** — uk body: "і прожила там усе життя". In the same paragraph she lives in Kyiv in 1935–38. → "і прожила там майже все життя". en: "and lived there almost all her life". Source: ЕІУ.
  - **EN-MISMATCH (spelling)** — en body: "unusual colours", "watercolour", "coloured ones". → "colors", "watercolor", "colored ones" (American spelling).
  - Optional: `birthplace` has no coordinates. Wikidata Q4090952 (Болотня, Ivankiv raion) gives lat 50.964, lon 29.878.
- **Conflicts:**
  - 1937 Paris award: ЕІУ **silver medal** · uk.wikipedia **gold medal**. Not stated in the profile, so no change is needed. If added later, use ЕІУ.
  - Union of Artists membership: ЕІУ gives both **1959** (header) and **1960** (body). Not in the profile.
- Encyclopedic source: present (ЕІУ). VUE is unverified (403).

---

## Summary

| slug | #errors | #other issues | ready-after-fixes |
|---|---|---|---|
| ivan-kotliarevskyi | 0 | 3 (overstatement "очолив", EN spelling, image PD tag unverifiable) | yes (image: owner decision, low risk) |
| marko-vovchok | 3 (bracelet 1858; event order; death place) | 3 (dead link, Turgenev wording, optional coords/IEU) | yes |
| olena-teliha | 0 | 6 (maiden-name mismatch uk/en, "старшина", "Melnyk wing" 1939, antisemitism claim needs scholarly source, summary wording, EN spelling) | yes |
| lina-kostenko | 0 | 3 ("as of" missing, non-free image, unsourced "допити") | needs owner decision (image license, living person) |
| ivan-marchuk | 1 (teachers at the wrong school) | 2 (EN "Who he was", "as of" missing) | yes |
| kazymyr-malevych | 1 (2015 inscription: method and attribution) | 2 (misconception unsourced, fun-fact wording) | yes |
| mariia-prymachenko | 0 | 5 (non-free image, VUE 403, "односельцями", "усе життя", EN spelling) | needs owner decision (image license) |

**Totals:** 5 errors · 24 other issues · 2 profiles need an owner decision, both because of all-rights-reserved images.

## Applied

**Nothing applied.** The coordinator asked for the fixes to be made in `src/content/people/{uk,en}/<slug>.md`. The permission system blocked the write ("Modify Shared Resources"), and the original brief said the repo is read-only for this task. The repo files for these 7 slugs are unchanged. The edits below are ready to apply as soon as the user approves writing to the repo. Each one's exact old → new text is in the per-profile sections above.

Planned edits, uk + en in each case:
- **ivan-kotliarevskyi:** "сформував і очолив 5-й козачий полк" → "сформував 5-й козачий полк і отримав чин майора" (accomplishment + body). en: "theatre" → "theater" (3×), "St Petersburg" → "St. Petersburg" (2×).
- **marko-vovchok:** fun_fact 1859 → 1858. Rewrite the bracelet/meeting order. Turgenev → "за редакцією Івана Тургенєва (1859)". Death place → "хутір Долинськ (нині в межах Нальчика)". Replace the dead museumshevchenko link with t-shevchenko.name. Add the IEU source. Add coordinates 52.614/38.327.
- **olena-teliha:** Шовгенева → Шовгеніва (2×). "старшину" → "кубанського козака й колишнього вояка Армії УНР". "крило Андрія Мельника" → "після розколу 1940 року - на боці Андрія Мельника". Antisemitic-articles sentence → attributed to the Ukrainian Jewish Committee's director, which JTA supports. Summary "родині" → "середовищі". en: "honour" → "honor".
- **lina-kostenko:** misconception: remove "викликали на допити", replace it with "вилучали збірки з виробництва".
- **ivan-marchuk:** teachers moved to the right schools (Звіринський at the училище, Сельський at the institute). en: "Who he was" → "Who he is".
- **kazymyr-malevych:** misconception: microscope instead of X-ray/IR, and the attribution is disputed. Add the e-flux and Public Domain Review sources. Fun fact → "статті … виходили українською".
- **mariia-prymachenko:** "усе життя" → "майже все життя". Remove "та односельцями". en: colours/watercolour/coloured → American spelling. Add coordinates 50.964/29.878.

## Left for owner

- **Images:** Kostenko and Prymachenko portraits are "Усі права захищено". Recommend replacing both with freely licensed Commons files. Kotliarevskyi's PD-old-70 tag can't be verified; it's low risk, so keep it or switch to Tropinin's portrait.
- **VUE link (Prymachenko):** returns 403 to bots. Open it in a browser; remove it if it doesn't load. ЕІУ already covers the policy.
- **Kept as is (sources conflict, current value recommended):**
  - Malevich: birth 1879, Kyiv institute 1928–30, *Black Square* 1915.
  - Teliha: birth 1906 in Іллінське, death 21 Feb.
  - Kostenko: first poems 1946, *Записки* 2011.
  - Vovchok: *Народні оповідання* 1857.
  - Kotliarevskyi: theater 1819–21.
- **Not added, per the coordinator:** "as of" text for living people (the site shows "Станом на <last_reviewed>" automatically).
