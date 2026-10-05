# Fact-check report — batch C (8 profiles)

**Date:** 2026-10-03 · **Method:** one agent read every claim in `uk/<slug>.md` and `en/<slug>.md` and checked it against encyclopedia articles opened in full: ЕСУ (esu.com.ua), ЕІУ (history.org.ua), IEU (encyclopediaofukraine.com) and ВУЕ (vue.gov.ua). Wikipedia (uk/en/fr) was used only as a secondary cross-check. No repo files were edited.

**Links:** all 37 `sources:` URLs and all 8 `image.source_url` pages return HTTP 200. One loads but has no content (Kholodna's ВУЕ page, see below). The Commons metadata (author, license, date) matches the frontmatter for all 8 images.
**Lengths:** every `role` is ≤ 40 characters (Lyfar uk = exactly 40) and every `summary` is ≤ 300 (Zankovetska en = 299).
**Coordinates:** checked against uk-Wikipedia infoboxes. All are roughly right. Zankovetska has none (see that profile).

---

### kvitka-tsisyk
- **Confirmed:**
  - Born 04.04.1953 in Queens; died 29.03.1998 in New York (ВУЕ).
  - The family lived in Lviv until 1944 (ВУЕ: memorial plaque at вул. Глибока 8). Her father, violinist Volodymyr Cisyk, taught her from early childhood (ВУЕ).
  - Ukrainian studies school, Plast camps, violin at Mannes, academic singing in 1972–74 (ВУЕ).
  - Backing vocals for Carly Simon, Linda Ronstadt and Michael Bolton (ВУЕ).
  - "You Light Up My Life" (1977, Joe Brooks); the song won an Oscar (ВУЕ).
  - Ford jingle from 1981; Ford estimated 20 billion listens (ВУЕ, giving 1987; en-WP, giving 1989). Coca-Cola and McDonald's jingles (ВУЕ).
  - Two albums, 1980 and 1989, at her own expense (ВУЕ). Unofficial visit to Ukraine in 1983 (ВУЕ).
  - A street in Lviv (2010) and a memorial museum in Lviv school No. 54 (2011) (ВУЕ). Streets in Kyiv, Dnipro and Poltava (en-WP).
  - Image: Commons gives "Pavlo1, brentramsey.com", CC BY 2.0, 1989 — matches.
  - **Ukrainian connection is stated precisely:** born in the US to Ukrainian emigrants from Lviv. Her self-identification is documented in the dedication to *Two Colors*: «бажанням мого українського серця» (ВУЕ). No overclaiming.
- **Issues:**
  - **ERROR / UNSOURCED** — uk `misconception.truth`: «Пізніший кавер Деббі Бун, яка свідомо імітувала манеру Цісик, став хітом і отримав «Ґреммі» - тому голоси й переплутали.»
    - **Problem:** No source says Boone *deliberately imitated* Cisyk. Boone's record did not itself "win a Grammy": the song (songwriter Brooks) shared Song of the Year, and Boone won Best New Artist.
    - **Proposed uk:** «Окремий запис пісні у виконанні Деббі Бун, спродюсований тим самим Бруксом, 10 тижнів очолював чарт Billboard, а голоси співачок дуже схожі - тому їх і переплутали.»
    - **Proposed en:** "Debby Boone's separate recording of the song, produced by the same Brooks, topped the Billboard chart for ten weeks, and the two singers' voices are very similar, which is how they got mixed up."
    - **Sources:** https://en.wikipedia.org/wiki/Kvitka_Cisyk (section on the film), https://vue.gov.ua/Цісик,_Квітка_Володимирівна
  - **Note:** WebFetch gets HTTP 403 from vue.gov.ua, but the page loads with a browser user-agent (curl 200) and contains the full article. Not a link problem.
- **Conflicts:** Year of Ford's 20-billion estimate: ВУЕ says 1987, en-WP says 1989. The text gives no year, so no change is needed.
- **Encyclopedic source:** ВУЕ is present. OK.

### mariia-zankovetska
- **Confirmed:**
  - 04.08 (23.07 O.S.) 1854 in Zanky; 04.10.1934 in Kyiv (ЕСУ, ЕІУ, IEU).
  - Born Adasovska; Khlystova by marriage from 1875 to 1888 (ЕСУ). Noble family (ЕСУ; ЕІУ: "небагатій дворянській, предки… від козацької старшини").
  - Boarding school in Chernihiv, 1874 (ЕСУ). Singing studies at the Helsingfors branch of the Petersburg Conservatory (ЕСУ).
  - Debut on 27 Oct 1882 in Yelysavethrad as Natalka, in Kropyvnytskyi's troupe (ЕІУ).
  - Troupes of Kropyvnytskyi, Starytskyi, Saksahanskyi and Karpenko-Karyi (1900–03), and Sadovskyi (ЕІУ, ЕСУ).
  - Roles of Halia and Kharytyna (ЕСУ, ЕІУ).
  - Tours to Moscow and St Petersburg; compared with Sarah Bernhardt (ЕСУ).
  - 1907: organized the first permanent theatre in Kyiv with Sadovskyi (ЕІУ).
  - 1918: her own troupe in Nizhyn (ЕСУ). Last appearance on stage 15.12.1922 (ЕСУ).
  - Buried at Baikove (ЕІУ).
  - Memorials: the Lviv theatre bears her name; museums in Kyiv (1960) and Zanky (1964); a prize in her name from 1993 (ЕСУ).
  - Image: public domain, 1892, author unknown — matches Commons.
- **Issues:**
  - **ERROR** — the roles count.
    - **Current text:** uk `summary` «Створила понад 40 ролей»; uk `key_accomplishments[1]` «Понад 40 ролей…»; uk body «і створила понад 40 ролей»; en `summary`, `key_accomplishments` and body "over 40 / more than 40 roles".
    - **Problem:** IEU says "over 30 dramatic-heroic roles" and uk-WP says «більше 30 ролей». ЕСУ and ЕІУ give no number.
    - **Proposed:** «понад 30 ролей» / "more than 30 roles".
    - **Source:** https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CZ%5CA%5CZankovetskaMariia.htm
  - **OVERSTATEMENT (minor)** — the length of her career.
    - **Current text:** uk `summary` «понад 40 років грала»; uk body «впродовж понад 40 років»; en "for 40-plus years" / "For more than 40 years".
    - **Problem:** Her stage career ran from 1882 to 1922, which is exactly 40 years (ЕСУ: her 40th stage anniversary on 15.12.1922).
    - **Proposed:** «40 років» / "for 40 years".
    - **Source:** https://esu.com.ua/article-14895
  - **UNSOURCED** — the "first women" claim.
    - **Current text:** uk `key_accomplishments[3]` «…- одна з перших жінок-керівниць театру в Україні»; uk body «і стала однією з перших жінок, що очолили театр в Україні» (and the en equivalents).
    - **Problem:** No encyclopedic support.
    - **Proposed uk:** «1918 року очолила в Ніжині власну трупу» / body «1918 року організувала в Ніжині власну трупу.»
    - **Proposed en:** "In 1918 she headed her own troupe in Nizhyn."
    - **Source:** https://esu.com.ua/article-14895
  - **UNSOURCED (Wikipedia-only)** — the origin of the stage name.
    - **Current text:** uk `fun_fact` «Сценічне ім'я Заньковецька вона взяла на згадку про щасливе дитинство в рідному селі Заньки».
    - **Problem:** The motive appears only in uk-WP, with no citation.
    - **Proposed uk:** «Справжнє прізвище акторки - Адасовська. Сценічне ім'я Заньковецька вона утворила від назви рідного села Заньки на Чернігівщині.»
    - **Proposed en:** "…She formed the stage name Zankovetska from the name of her native village of Zanky in the Chernihiv region."
    - **Sources:** ЕСУ (stage name, debut) https://esu.com.ua/article-14895; ЕІУ (birthplace).
  - **DATA (minor)** — `birthplace` has no `lat`/`lon`. Zanky is at about **51.197, 31.984** (uk-WP infobox «51°11′49″ N 31°59′02″ E»).
  - **EN style (low priority, site-wide)** — common nouns use British "theatre" ("Ukrainian theatre", "lead a theatre", "permanent Ukrainian theatre"). Under the "American spelling" rule these would be "theater". Proper names can keep "Theatre". This needs one site-wide decision (Kotliarevskyi and Lysenko also use "theatre").
- **Conflicts:** Year of the People's Artist title. ЕСУ: **12 Jan 1923** (РНК УСРР decree). ЕІУ: 1922. **Recommend keeping 1923** — ЕСУ gives the exact decree date.
- **Encyclopedic source:** ЕСУ and ЕІУ are present. Optional third: IEU URL above.

### serzh-lyfar
- **Confirmed:**
  - Kyiv Conservatory; sang in the St Sophia choir (ЕСУ, IEU). Nijinska's studio in 1921 (ЕСУ).
  - Diaghilev's Ballets Russes 1923–29 (ЕСУ).
  - Head of the Paris Opera Ballet 1930–44 and 1947–58 (ЕСУ; also 1962–63 and 1977).
  - More than 200 ballets; «На Дніпрі» 1932, «Ікар» 1935, «Сюїта в білому» 1943 (ЕСУ).
  - Founder of the neoclassical direction (ЕСУ).
  - Institute of Choreography in 1947; Sorbonne from 1955 (ЕСУ, IEU). Visit to Kyiv in 1961 (IEU).
  - Lifar competition in Kyiv from 1994 (ЕСУ, IEU).
  - Died 15.12.1986 (ЕСУ, IEU).
  - Image: Herbert Behrens / Anefo, CC0, 19.03.1961, "Nederlands Ballet" rehearsal — matches.
  - **Ukrainian connection is precise:** "Уродженець Києва". IEU adds "born into a Ukrainian noble family descended from Cossack starshyna". No overclaiming.
  - The Opéra de Paris link loads and mentions Lifar.
- **Issues:**
  - **ERROR** — uk `misconception.truth`: «Документально підтверджено лише, що 23 червня 1940 року Лифар супроводжував Гітлера під час короткого візиту до порожньої Опери - виступів не було. Чуток вистачило, щоб Рух Опору заочно засудив його, а суд тимчасово заборонив виступати на сценах Франції.» (en: "What's documented is only that on June 23, 1940, Lifar accompanied Hitler…")
    - **Problem:** The opposite is documented. A 19 June 1946 statement by the Comité national d'épuration says the claim that Lifar received Hitler at the Opera "a été avéré faux" (was found false) during the investigation. Arno Breker's account of the visit does not mention Lifar, and Lifar is absent from the photos and film of it.
    - **Problem:** The sanction came from a purge committee, not a court. "Заочно засудив Рух Опору" is unsourced (Radio Londres called him a traitor in 1943).
    - **Proposed uk:** «Цю історію не підтверджено: 1946 року комітет з «очищення» визнав неправдивим звинувачення, ніби Лифар приймав Гітлера в Опері 23 червня 1940 року, а на фото й кінозйомці того візиту його немає. Покарали його за інше - за контакти з окупаційною владою: 1945 року на рік відсторонили від виступів на французьких сценах.»
    - **Proposed en:** "This story is unconfirmed: in 1946 the purge committee found false the accusation that Lifar had received Hitler at the Opera on 23 June 1940, and he does not appear in the photos or film of that visit. He was punished for something else, his contacts with the occupation authorities: in 1945 he was suspended from French stages for a year."
    - **Sources:** M. Franko, «Serge Lifar et la question de la collaboration…», *Vingtième Siècle* 132 (2016) https://www.cairn.info/revue-vingtieme-siecle-revue-d-histoire-2016-4-page-27.htm, cited in https://fr.wikipedia.org/wiki/Serge_Lifar (Occupation section, quoting the 1946 document). **Recommend adding the Franko article to `sources:`.**
  - **Consistency (minor)** — uk body «відсторонив від роботи в Опері на рік» vs the misconception's «на сценах Франції».
    - Franko and fr-WP: suspended for a year from all French stages, effective 1 Oct 1945.
    - **Proposed uk body:** «…засудив його й на рік відсторонив від виступів на французьких сценах.»
    - **Proposed en:** "…condemned him and suspended him from French stages for a year."
  - **EN (optional)** — "On the Dnieper (1932)". This is the ballet's established English title, but it conflicts with the site's transliteration rule. Option: "On the Dnipro (Sur le Borysthène)". Owner decision.
- **Conflicts:**
  - **Birth year:** ЕСУ says 02(15).04.**1904**; IEU and the profile say 15.04.**1905**. The profile already says «за іншими даними - 1904». Keep as is.
  - **Birthplace:** ЕСУ: Kyiv. IEU: Pyrohovo (now part of Kyiv). They do not contradict each other; keep Pyrohiv.
  - **Nouveau Ballet de Monte-Carlo:** ЕСУ gives 1945–47; IEU and the profile give 1944–47. Keep.
- **Encyclopedic source:** ЕСУ and IEU are present. OK.

### solomiia-krushelnytska
- **Confirmed:**
  - 23.09.1872 in Biliavyntsi; 16.11.1952 in Lviv; childhood in Bila (ЕСУ).
  - Lviv Conservatory 1893; debut in Lviv the same year in «Фаворитка»; studies in Milan and Vienna (ЕСУ).
  - Stages: Odesa, Warsaw, St Petersburg, Paris, Naples, La Scala, Colón (ЕСУ).
  - Butterfly in 1904 at the Teatro Grande at Puccini's invitation, after the La Scala failure (ЕСУ). Puccini's quote (ЕСУ).
  - Three-octave voice; sang in the original languages; Lysenko, Liudkevych, Sichynskyi (ЕСУ).
  - Married Cesare Riccioni in 1910 and lived in Viareggio (ЕСУ).
  - Left opera in the mid-1920s; concerts in Western Europe, Canada and the US (ЕСУ).
  - Returned to Lviv in 1939; professor 1944–51 (ЕСУ).
  - Lviv Opera named after her in 2001; museums in Bila and Lviv; Lysenko's «Не забудь юних днів» (ЕСУ).
  - Learned a role in 2–3 days (ЕСУ).
  - Coordinates are about right. Image: Mario Nunes Vais, public domain, c. 1905–1910 — matches.
- **Issues:**
  - **OVERSTATEMENT / UNSOURCED** — uk `misconception.truth`: «Попри це, вона завжди наголошувала на своєму українському походженні і незмінно завершувала виступи українськими народними піснями, навіть на концерті для російського імператора.»
    - **Problem:** "завжди", "незмінно" and the concert for the tsar are popular-biography claims. No encyclopedia supports them.
    - **Proposed uk:** «Крушельницька - українка з Тернопільщини. Вона активно популяризувала українську музику - співала народні пісні, твори Миколи Лисенка, Станіслава Людкевича, Дениса Січинського, - а 1939 року повернулася до Львова, де прожила до кінця життя.»
    - **Proposed en:** "Krushelnytska was a Ukrainian from the Ternopil region. She actively promoted Ukrainian music, singing folk songs and works by Mykola Lysenko, Stanyslav Liudkevych and Denys Sichynskyi, and in 1939 she returned to Lviv, where she lived for the rest of her life."
    - **Source:** https://esu.com.ua/article-219
  - **EN style (minor)** — en body "Lviv Opera and Ballet Theater" vs Lysenko's "Ballet Theatre". Pick one site-wide; see the note under Zankovetska.
- **Conflicts:**
  - ***Salome* (1906):** ЕСУ calls her the first performer of the lead role in Italy. en-WP (Gemma Bellincioni) says Bellincioni starred in the Italian premiere (Turin, December 1906). Krushelnytska's La Scala *Salome* under Toscanini came days later (IEU: "Because of her and Arturo Toscanini, … Salome was a great success at La Scala (1906)").
    - **Recommend (owner decision)** the safer wording, uk `key_accomplishments[2]` and body: «Виконала заголовні партії в перших постановках опер Ріхарда Штрауса «Саломея» (1906) та «Електра» (1909) в міланському «Ла Скала»».
    - **en:** "Sang the title roles in the first La Scala productions of Richard Strauss's Salome (1906) and Elektra (1909)."
  - **Professorship:** ЕСУ gives 1944–51; IEU gives 1944–52. Keep ЕСУ.
- **Suggested second encyclopedic source:** IEU — https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CK%5CR%5CKrushelnytskaSolomiia.htm (checked: 200, full article).

### vira-kholodna
- **Confirmed:**
  - Born Levchenko, 05.08.1893 in Poltava; died 16.02.1919 in Odesa (ЕІУ). Father was a teacher of literature (ЕІУ: teacher; zn.ua: «вчителя словесності»).
  - Bolshoi ballet school, 1903 (ЕІУ). Debut in «Анна Кареніна» (1914, Gardin) (ЕІУ).
  - Breakthrough with Bauer's «Пісня торжествуючого кохання» (1915) (ЕІУ). Directors Bauer and Chardynin (ЕІУ).
  - Films «Діти століття», «Міражі», «Життя за життя», «Останнє танго» (ЕІУ).
  - Kharitonov's troupe moved to Odesa in summer 1918 (uk-WP).
  - Spanish flu; the poisoning rumours; the family confirmed the flu (zn.ua; uk-WP).
  - Image: unknown author, public domain, 1910s — matches.
- **Issues:**
  - **LINK** — `sources[0]` «Велика українська енциклопедія - Холодна, Віра Василівна» https://vue.gov.ua/Холодна,_Віра_Василівна
    - **Problem:** The page loads (200) but is an empty stub with only a title line («(1893–1919), актриса, зірка німого кінематографу, Україна – Росія») and no article. This profile therefore has **no working encyclopedic source**.
    - **Proposed:** Replace it with or add `title: "Енциклопедія історії України - Холодна Віра Василівна"`, `url: "https://www.history.org.ua/?termin=Kholodna_V"` (checked: full article, 2013).
  - **ERROR / Conflict** — the film count.
    - **Current text:** uk `summary` «знялася в понад 50 фільмах»; `fun_fact` «Із понад 50 фільмів»; `key_accomplishments[1]` «Понад 50 ролей у кіно»; body «понад 50 фільмів» (and en).
    - **Problem:** ЕІУ says «Знялася в 44 фільмах». uk-WP gives "50, за іншими даними — 80"; 5.ua gives 80.
    - **Proposed:** «у кількох десятках фільмів» or «понад 40 фільмів» / "dozens of films" or "more than 40 films". Owner decision.
    - **Sources:** https://www.history.org.ua/?termin=Kholodna_V vs https://uk.wikipedia.org/wiki/Холодна_Віра_Василівна
  - **ERROR (minor)** — the flu death toll.
    - **Current text:** uk `misconception.truth` «пандемічний грип, від якого 1918–1919 років помирали сотні тисяч людей»; en "killed hundreds of thousands of people".
    - **Problem:** The pandemic killed millions. The cited zn.ua article itself says «забрала тоді життя багатьох мільйонів людей».
    - **Proposed:** «від якого 1918–1919 років у світі померли мільйони людей» / "that killed millions of people worldwide in 1918–1919".
    - **Source:** https://zn.ua/ukr/HISTORY/yak-ubivali-veliku-nimu-302913_.html
  - **OVERSTATEMENT (minor, owner decision)** — the "first great star" claim.
    - **Current text:** uk `summary` and `key_accomplishments[0]` «перша велика зірка німого кіно в Російській імперії».
    - **Problem:** ЕІУ says «одна із "зірок німого кіно"».
    - **Proposed:** «одна з перших великих зірок німого кіно в Російській імперії» / "one of the first great stars of silent cinema in the Russian Empire".
  - **EN spelling** — en `misconception.truth` "rumours" → "rumors".
- **Conflicts:** The film count, as above. Recommend the ЕІУ-safe wording, «понад 40» / «кілька десятків».

### ivan-piddubnyi
- **Confirmed:** Nearly all of the text follows ЕІУ closely:
  - 08.10 (26.09 O.S.) 1871 – 08.08.1949; Krasenivka, Zolotonosha county, Poltava governorate (coordinates correct).
  - Six younger siblings, also very strong; loader in Sevastopol in 1893; Feodosia; professional from 1898.
  - Tours to Kyiv, Odesa and Katerynoslav; world record holder with the barbell.
  - Commercial tournaments unofficially billed as world championships in 1904–09; "Чемпіон чемпіонів"; the "Hamburg score".
  - His farm in 1910–13; the US in the mid-1920s, "best freestyle wrestler"; Yeysk.
  - Poverty and harassment, including for his "українськість"; lived through the occupation.
  - Honored Artist of the RSFSR (1939), Honored Master of Sport (1945); physique-contest prizes after age 50.
  - The Strunnikov / Yavornytskyi Cossack portrait.
  - Image: unknown author, public domain, before 1917 — matches.
  - **No popular legend appears in the body or the card fields. The exception is the misconception:**
- **Issues:**
  - **UNSOURCED (legend) + ERROR in detail** — uk `misconception.truth`: «Піддубний не програв жодного турніру за понад чотири десятиліття кар'єри, але окремі поєдинки таки втрачав: 1903 року в Парижі йому присудили поразку від … Рауля Ле Буше, а під час туру в США в 1926–1927 роках, уже в похилому віці, він програв Джо Стечеру.»
    - **Problem:** "Never lost a tournament in four decades" is the legend this field is meant to correct. ЕІУ says only that he «виграв чимало… турнірів» and had «славу нездоланного». Also, at the 1903 Paris tournament he did not win; Pedersen did (uk-WP).
    - **Problem:** The Stecher losses were on 2 Feb 1926 (New York) and 16 Jun 1926 (Los Angeles), not "1926–1927", and there were two.
    - **Proposed uk:** «Піддубний мав славу нездоланного й виграв чимало турнірів, але окремі поєдинки програвав: 1903 року в Парижі судді присудили перемогу французові Раулю Ле Буше, а 1926 року в США, у 54 роки, він двічі програв чемпіонові світу Джо Стечеру.»
    - **Proposed en:** "Piddubnyi had a reputation as unbeatable and won many tournaments, but he did lose individual bouts: in 1903 in Paris the judges gave the win to the Frenchman Raoul Le Boucher, and in 1926 in the United States, aged 54, he lost twice to world champion Joe Stecher."
    - **Sources:** ЕІУ http://history.org.ua/?termin=Piddubnyj_I (reputation). For the bouts, Wikipedia only: https://en.wikipedia.org/wiki/Ivan_Poddubny (Stecher, with 1926 newspaper citations) and https://uk.wikipedia.org/wiki/Піддубний_Іван_Максимович (Le Boucher, citing Приліпко 2006). Low risk, but Wikipedia-only.
  - **EN (trivial)** — "1926-1927" uses a hyphen where the site uses an en dash. This goes away with the replacement above.
- **Conflicts:** None in the encyclopedias. Note: ВУЕ's page for him is an unfinished stub («Замовлено»), and its snippet "six-time world champion" should **not** be used.
- **Encyclopedic source:** ЕІУ is present. OK. No IEU or ЕСУ article was found.

### borys-paton
- **Confirmed:**
  - 27.11.1918 in Kyiv; died 19.08.2020 in Kyiv (ЕСУ).
  - Son of Yevhen Paton. Kyiv Industrial Institute 1941; engineer at Krasnoye Sormovo in Gorky (ЕСУ, ЕІУ).
  - Institute of Electric Welding from 1942, evacuated to Nizhny Tagil; automatic welding of armour steel (ЕСУ).
  - Director 1953–2020 (ЕСУ).
  - Electroslag welding with H. Voloshkevych in 1949; uses for power plants and heavy equipment (ЕСУ).
  - Soyuz-6 / "Vulkan" in 1969; open space in 1984 (ЕСУ).
  - President of the Academy 1962–2020; academy names (ЕІУ: АН УРСР → АН України 1991 → НАНУ 1994).
  - Academician of the USSR Academy (1962); Stalin (1950) and Lenin (1957) prizes; Hero of Socialist Labor 1969, 1978; USSR Supreme Soviet 1962–89; Hero of Ukraine 1998 (ЕСУ).
  - Preserved the scientific schools after 1991 (ЕСУ).
  - Live-tissue welding from 1990, used in surgery (ЕСУ).
  - National Prize renamed after him in 2021 (ЕСУ).
  - Bridge opened in November 1953 (5 Nov), about 3 months after Yevhen's death (12 Aug 1953).
  - Image: Russian Presidential Press and Information Office, CC BY 4.0, 18.06.2010 — matches.
- **Issues:**
  - **ERROR** — the "first fully welded bridge" claim.
    - **Current text:** uk `misconception.truth` «…Євгена Патона, який спроєктував першу у світі повністю зварну мостову конструкцію»; en "who designed the world's first fully welded bridge structure".
    - **Problem:** The first all-welded bridges were Turtle Creek (USA, 1928) and Maurzyce (Poland, 1928–29). en-WP calls the Paton Bridge "one of the world's first all-welded bridges".
    - **Proposed uk:** «…Євгена Патона, під керівництвом якого спорудили один із перших у світі великих суцільнозварних мостів; він помер…»
    - **Proposed en:** "…Yevhen Paton, under whose direction one of the world's first large all-welded bridges was built; he died…"
    - **Sources:** https://en.wikipedia.org/wiki/Paton_Bridge, https://en.wikipedia.org/wiki/Maurzyce_Bridge (both Wikipedia; ЕСУ on Yevhen Paton could be checked as a third source).
  - **TONE / language** — uk `misconception.claim` «(«мост Патона»)» uses the Russian word.
    - **Proposed:** «(«міст Патона»)».
  - **EN check:** "armor" and "Labor" are American. OK.
- **Conflicts:** None.
- **Encyclopedic source:** ЕСУ and ЕІУ are present. OK.

### bohdan-havrylyshyn
- **Confirmed (all from ЕСУ):**
  - 19.10.1926 in Koropets; 24.10.2016 in Kyiv (coordinates exact).
  - Forced labour in Germany in 1943; Canada from 1947; Toronto MA 1954; Switzerland from 1960.
  - IMI Geneva: graduated 1958, worked there from 1960, director 1968–86 (= 18 years); PhD Geneva 1976.
  - Club of Rome report *Road Maps to the Future*, translated into 8 languages.
  - From 1989 worked with Ukrainian institutions; chair of the Consultative Advisory Council 1991–98; co-chair of «Відродження»; co-founder of IMI Kyiv.
  - Foreign member of NASU (1990); honorary consul from 2003.
  - His Club of Rome participation is in ЕСУ «Римський клуб».
  - Image: Perohanych, CC BY-SA 3.0, 22.02.2012, «у київському офісі» — matches.
  - The "Ukrainian-born, diaspora" framing is precise.
- **Issues:** None that need a fix.
  - **Low risk (Wikipedia-only):** "the 1990 merger of IMI and IMEDE into IMD in Lausanne" is not in ЕСУ, but it is well known and consistent with en-WP.
  - **Note:** The EN name "Hawrylyshyn" is his own published spelling (like "Cisyk"), so it is acceptable despite the official transliteration rule. Owner may confirm.
- **Conflicts:** None.
- **Encyclopedic source:** ЕСУ (×2) is present. OK.

---

## Site-wide notes (low priority)
- **EN date format:** Lyfar's misconception uses "June 23, 1940"; most EN profiles use "23 June 1940". The proposed replacement above uses the majority style.
- **"theatre" vs "theater":** this is inconsistent across EN files. Decide once: either American "theater" for common nouns or keep British throughout. The vision doc says "American spelling throughout."

## Summary

| slug | #errors | #other issues | ready-after-fixes |
|---|---|---|---|
| kvitka-tsisyk | 1 | 0 | yes |
| mariia-zankovetska | 1 | 4 (overstatement, unsourced ×2, missing coords) + EN style | yes (1923 vs 1922 kept per ЕСУ) |
| serzh-lyfar | 1 | 2 (consistency, optional EN title) | yes — add the Franko source |
| solomiia-krushelnytska | 0 | 2 (overstatement/unsourced, EN style) | needs owner decision (*Salome* "first in Italy" wording) |
| vira-kholodna | 2 | 3 (LINK — no working encyclopedic source, overstatement, EN spelling) | needs owner decision (film count 44 vs 50+) |
| ivan-piddubnyi | 1 | 1 (legend in misconception; bout details Wikipedia-only) | yes |
| borys-paton | 1 | 1 (Russian word «мост») | yes |
| bohdan-havrylyshyn | 0 | 0 | yes |

## Applied

Edits were made only to `src/content/people/{uk,en}/<slug>.md` for the 8 slugs. A script made each edit and confirmed the old string appeared exactly once before replacing it; all matched.
**Verification not run:** the follow-up step (spelling grep, length check, `npx vitest run src/content`) was denied by the permission classifier.

### kvitka-tsisyk
- uk+en `misconception.truth`: "Boone's cover deliberately imitated Cisyk… won a Grammy" → "Boone's separate recording, produced by the same Brooks, topped Billboard for 10 weeks; the voices are very similar".

### mariia-zankovetska
- uk+en `summary`, `key_accomplishments`, body: "понад 40 ролей / over 40 roles" → "понад 30 ролей / more than 30 roles".
- uk+en `summary` and body: "понад 40 років / 40-plus years" → "40 років / 40 years".
- uk+en `key_accomplishments[3]` and body: removed "одна з перших жінок-керівниць театру" → "очолила в Ніжині власну трупу / her own troupe in Nizhyn".
- uk+en `fun_fact`: "на згадку про щасливе дитинство" → "утворила від назви рідного села Заньки / formed … from the name of her native village".
- uk `birthplace`: added `lat: 51.197, lon: 31.984`.
- en: "theatre" → "theater" in running text (role, summary, accomplishments, body). The proper name "National Academic Ukrainian Drama Theatre" is unchanged.

### serzh-lyfar
- uk+en `misconception.truth`: "documented that he accompanied Hitler… Resistance sentenced him, court banned him" → "unconfirmed; the 1946 purge committee found the accusation false; he is absent from the photos/film; suspended from French stages for a year in 1945". The en version now uses the "23 June 1940" date format.
- uk+en body: "suspended from the Opera for a year" → "suspended from French stages for a year".
- uk `sources`: added Franko, *Vingtième Siècle* 2016 (cairn.info).

### solomiia-krushelnytska
- uk+en `misconception.truth`: "always emphasized… invariably closed with folk songs, even for the tsar" → ЕСУ-based text (a Ukrainian from the Ternopil region; promoted Lysenko, Liudkevych, Sichynskyi; returned to Lviv in 1939).
- uk `sources`: added the IEU Krushelnytska article.

### vira-kholodna
- uk+en `summary` and `key_accomplishments[0]`: "перша велика зірка / the first great star" → "одна з перших великих зірок / one of the first great stars".
- uk+en `misconception.truth`: "сотні тисяч / hundreds of thousands" → "у світі померли мільйони / millions worldwide".
- en: "rumours" → "rumors".
- uk `sources`: replaced the empty ВУЕ stub with ЕІУ https://www.history.org.ua/?termin=Kholodna_V.

### ivan-piddubnyi
- uk+en `misconception.truth`: "never lost a tournament in four decades… lost to Stecher in 1926–27" → "had a reputation as unbeatable, won many tournaments; Le Boucher 1903; lost twice to Stecher in 1926, aged 54".

### borys-paton
- uk `misconception.claim`: «мост Патона» → «міст Патона».
- uk+en `misconception.truth`: "designed the world's first fully welded bridge" → "under whose direction one of the world's first large all-welded bridges was built".

### bohdan-havrylyshyn
- No changes.

## Left for owner
- **Kholodna — film count:** the text says "понад 50"; ЕІУ says 44; uk-Wikipedia says 50–80. Left unchanged. **Recommend:** «у кількох десятках фільмів» / "dozens of films".
- **Krushelnytska — "first Salome in Italy":** ЕСУ supports it, but Bellincioni sang at the Turin premiere in December 1906. Left unchanged. **Recommend:** "the title roles in the first La Scala productions of Salome (1906) and Elektra (1909)".
- **Zankovetska — People's Artist year:** kept 1923 (ЕСУ decree of 12 Jan 1923; ЕІУ says 1922).
- **Lyfar — EN ballet title:** "On the Dnieper" is the established English title but conflicts with the Dnipro transliteration rule. Left unchanged. Optional: "On the Dnipro (Sur le Borysthène)".
- **Havrylyshyn — EN name:** "Hawrylyshyn" is his own published spelling. Left unchanged. **Recommend** keeping it.
- **EN date format** (site-wide): open question. Only Lyfar's rewritten line changed, to the majority "23 June 1940" style.
- **Untouched by rule:** image fields; `reviewed`, `last_reviewed`, `added`, `animate`.
- **Needs running:** `npx vitest run src/content`, plus a check that role ≤ 40 and summary ≤ 300. Estimated longest summary after edits: Kholodna en ≈ 294 characters.
