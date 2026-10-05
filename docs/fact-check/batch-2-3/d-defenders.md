# Fact-check report D: defenders (9 profiles)

**Date:** 2026-10-03 · **Scope:** `src/content/people/{uk,en}/<slug>.md` for andrii-pilshchykov, dmytro-kotsiubailo, iryna-tsybukh, maksym-kryvtsov, nazarii-hryntsevych, oleksandr-matsiievskyi, roman-ratushnyi, valerii-chybinieiev, yurii-ruf. Nothing in the repo was edited.

**Method:** I read both language files for each profile. I fetched every `sources:` URL and every `image.source_url` (66 fetches). I checked each claim against the decree texts on zakon.rada.gov.ua, ЕСУ where an article exists, official bodies (MoD/ArmyInform, MVS, SBU via RS, Nizhyn council, Solomianska district administration), reputable media, and the Wikimedia Commons file pages. Wikipedia was used only as a cross-check.

**Link status:** every URL resolves (HTTP 200) and mentions the person, with one exception. **president.gov.ua returns HTTP 403 to every automated client.** That affects 6 links: Kotsiubailo ×2, Tsybukh, Hryntsevych, Matsiievskyi, Chybinieiev. These pages probably open in a normal browser, but I could not verify them. Each decree's text was confirmed on its zakon.rada.gov.ua mirror instead (number, date, rank and wording all match). suspilne.media and life.pravda.com.ua also block curl, so I read them in a headless browser.

**ЕСУ coverage, newly found:** articles exist for Pilshchykov (https://esu.com.ua/article-886448), Kotsiubailo (https://esu.com.ua/article-77556) and Chybinieiev (https://esu.com.ua/article-77717). Only Matsiievskyi's profile currently cites ЕСУ. Policy §7.3 asks for an encyclopedic source, so I recommend adding these three. I found no ЕСУ article for Tsybukh, Kryvtsov, Ratushnyi or Ruf.

**Tone overall:** sober and respectful. No profile glorifies violence. Several sources quote harsh battlefield language (Ruf, Ratushnyi, Kotsiubailo), and the profiles correctly leave it out. One English word choice is flagged (Ruf, "militant").

---

### andrii-pilshchykov

- **Confirmed:**
  - Born 3 Feb 1993 in Kharkiv; died 25 Aug 2023 near Sinhury, Zhytomyr region, in a collision of two L-39s, together with Minka and Prokazin (ЕСУ 886448; Ukrinform citing the Air Force and the Prosecutor General's Office; Radio Svoboda).
  - Hero of Ukraine, decree No. 658/2024 of 30 Sep 2024, "майору (посмертно)" (zakon.rada.gov.ua/go/658/2024).
  - Promoted to major posthumously (RS; ЕСУ).
  - MiG-29 pilot in the 40th Tactical Aviation Brigade, Vasylkiv (ЕСУ).
  - Spotter and co-founder of the Kharkiv spotter movement; had his eyesight corrected before entering the Kozhedub university; call sign "Juice" from Clear Sky 2018 because he never ordered alcohol (RS).
  - June 2022 Washington visit with "Moonfish" and meeting with US senators (RS; Wikipedia).
  - $13k of his own savings for helmets (RS).
  - "Ghost of Kyiv" is a collective image, per Air Force Command on 30 Apr 2022 (LB.ua). His quote «ми просто робили свою роботу» (RS).
  - Image: Commons, author "Ministry of Defense of Ukraine", CC BY 4.0. The license matches.
- **Issues:**
  - **OVERSTATEMENT.** The profile says he defended Kyiv's sky "from the first days". Both sources say otherwise. ЕСУ: he served until 2021, rejoined after 24 Feb 2022, and flew "101 бойовий виліт" from March 2022. RS: "Перші дні він виконував «непілотну» роботу … був у підрозділі оборони аеродрому", then "трохи згодом" began flying.
    - uk `summary` «який з перших днів повномасштабної війни захищав небо над Києвом» → «який після початку повномасштабної війни повернувся до бригади й захищав небо над Києвом».
    - uk `key_accomplishments[1]` «З лютого 2022 року захищав небо над Києвом» → «З березня 2022 року виконував бойові вильоти, зокрема захищав небо над Києвом (101 виліт до серпня 2023)».
    - uk body «Від перших днів вторгнення 2022 року він разом з бригадою захищав небо над Києвом» → «2021 року він звільнився зі служби, але з початком вторгнення 2022 року повернувся до бригади й незабаром почав виконувати бойові вильоти, зокрема над Києвом».
    - EN to match: "from the first days of the full-scale war" / "from February 2022" → "after the full-scale invasion began he returned to his brigade…" / "Flew combat missions from March 2022, including over Kyiv (101 sorties by August 2023)".
    - Sources: https://esu.com.ua/article-886448, https://www.radiosvoboda.org/a/juice-story/32568523.html
  - **UNSOURCED (minor).** uk `fun_fact` «у барі він замовляв лише сік». RS does not say "bar"; it only says he never ordered alcoholic drinks (the bar detail is Wikipedia only). Proposed: «…він ніколи не замовляв алкоголю, лише сік». EN: drop "at the bar".
  - **IMAGE (minor).** `image.alt` «…, 2023». Commons gives only the date the Air Force published the photo (30 Aug 2023, after his death); when it was taken is unknown. Proposed: «Андрій Пільщиков з льотним шоломом» (drop the year). EN likewise.
  - **EN spelling.** "travelled" → "traveled".
- **Suggested additional source:** ЕСУ https://esu.com.ua/article-886448 (encyclopedic). It also gives the Order for Courage 3rd class (2022) and 2nd class (2023, posthumously), which you could add to the accomplishments.

### dmytro-kotsiubailo

- **Confirmed:**
  - Born 1 Nov 1995 in Zadnistrianske; died 7 Mar 2023 near Bakhmut, aged 27 (ЕСУ 77556; UNIAN; LB.ua; Forbes).
  - Hero of Ukraine, decree No. 608/2021 of 30 Nov 2021, as a "добровольцю ДУК «Правий сектор»" (zakon). First volunteer to receive the title in his lifetime (UNIAN; Forbes; RS).
  - Gold Star presented in the Verkhovna Rada on 1 Dec 2021 (Commons file description).
  - Badly wounded at Pisky in 2014 (ЕСУ; LB).
  - Company expanded into the 1st Separate Battalion "Da Vinci Wolves" of the 67th Brigade in spring 2022 (Wikipedia; RS; Ukrinform).
  - Forbes "30 Under 30" (2022) (Forbes).
  - Buried at Askold's Grave on 10 Mar 2023 (ЕСУ).
  - Monument unveiled 21 Nov 2024: full-height figure with three wolves (Obozrevatel).
  - Bovshiv school now bears his name (Ukrinform).
  - Call sign from his drawing talent (Ukrinform; Wikipedia).
  - Image: Commons, Office of the President, CC BY 4.0 (valid for president.gov.ua uploads before 4 Oct 2022; this photo is from 1 Dec 2021). The license matches.
- **Issues:**
  - **ERROR (streets).** uk body «Його ім'ям назвали вулиці у Львові, Харкові, Запоріжжі та інших містах». ЕСУ lists streets in Kramatorsk, Pokrovsk, Avdiivka, Nikopol, Zaporizhzhia, Kharkiv, Kupiansk, Mala Rohan, Ivano-Frankivsk and Yahotyn. Lviv has a **fountain** in his honor, not a street.
    - Proposed: «Його ім'ям назвали вулиці в Харкові, Запоріжжі, Івано-Франківську та інших містах, а у Львові на його честь відкрили фонтан».
    - EN: "Streets in Kharkiv, Zaporizhzhia, Ivano-Frankivsk and other cities bear his name, and a fountain in Lviv is dedicated to him".
    - Source: https://esu.com.ua/article-77556
  - **ERROR (minor, place of farewell).** uk body «10 березня 2023 року на Майдані Незалежності з Коцюбайлом попрощалися тисячі людей, серед них - Президент України й прем'єр-міністр Фінляндії Санна Марін». The President and Marin attended the service at St Michael's Golden-Domed Monastery; the thousands gathered afterwards on the Maidan.
    - Proposed: «10 березня 2023 року з Коцюбайлом попрощалися в Михайлівському Золотоверхому соборі, де були Президент України й прем'єр-міністр Фінляндії Санна Марін, а потім тисячі людей - на Майдані Незалежності».
    - EN to match.
    - Sources: https://www.radiosvoboda.org/a/news-proshchannia-dmytro-kotsibaylo/32312010.html, https://lb.ua/society/2023/03/10/548482_kiievi_poproshchalisya_z_geroiem_ukraini.html
  - **OVERSTATEMENT/UNSOURCED.** uk `summary` «виріс із командира відділення до командира батальйону». ЕСУ says he commanded a **platoon** of volunteers in 2014 and a company from 2015. Proposed: «виріс із командира взводу до командира батальйону». EN: "from squad leader" → "from platoon commander".
  - **UNSOURCED.** uk `fun_fact`, the tamed wolf at the Avdiivka base. None of the 8 cited sources mentions it; I found it only on library and aggregator pages (lib.kherson.ua, streetcodes). Either add a reputable source or cut the fun fact to the sourced part: «Вовки стали символом його бійців: …на пам'ятнику на Аскольдовій могилі поруч із ним стоять три вовки» (Obozrevatel).
  - **UNSOURCED (minor).** uk body «Восени 2014 року … поранення в Пісках». The sources give only the year 2014. Proposed: «2014 року».
  - **LINK.** Both president.gov.ua links return 403 to automated checks. Swap the decree link for https://zakon.rada.gov.ua/laws/show/608/2021 (verified), or keep both.
- **Conflicts:**
  - **"Youngest company commander at 21".** UNIAN and Obozrevatel say "у 21 рік". ЕСУ says he commanded a company "від 2015" (age 19–20), and Obozrevatel gives his appointment to the 1st Separate Assault Company as 17 Mar 2016 (age 20). **Recommendation:** drop the exact age: «з 2015 року - командир роти, згодом 1-ї штурмової роти ДУК «Вовки Да Вінчі»». If the owner prefers to keep "21", hedge it: «за повідомленнями ЗМІ, наймолодший командир роти».
- **Suggested additional source:** ЕСУ https://esu.com.ua/article-77556. It also adds posthumous lieutenant (2023) and the Cross of Combat Merit (2023, posthumously).

### iryna-tsybukh

- **Confirmed:**
  - Born 1 Jun 1998 in Lviv; died 29 May 2024 during a rotation on the Kharkiv front, two days before turning 26 (Suspilne, quoting the Hospitallers; UP Life; Ukrinform).
  - Lviv Polytechnic; joined Suspilne in 2017; educational projects in remote Donetsk and Luhansk villages (Suspilne). Kyiv School of Economics, master's in public administration (Wikipedia only, low risk).
  - Paramedic trips from 2015 (Ukrinform; UP Life).
  - Film «Відстань» presented in Pokrovsk and Kramatorsk on 22–23 Feb 2022 (Ukrinform interview; Suspilne).
  - Led the 5th crew (Suspilne's own note of hers mentions «з 5 екіпажем»; Wikipedia); remained a volunteer (Ukrinform interview).
  - The stove fitted in the evacuation vehicle and the film about the refit (Ukrinform interview, in her own words).
  - Order of Merit 3rd class, Nov 2023 (Suspilne).
  - Hero of Ukraine, decree No. 144/2025 of 26 Feb 2025, as "керівниці екіпажу добровольчого батальйону «Госпітальєри» (посмертно)" (zakon).
  - Quote «Вшанування – не для загиблих…» (Ukrinform headline).
  - Farewell at St Michael's and the Maidan (2 Jun 2024); burial on the Field of Mars, Lviv; Chekafest (Wikipedia; Suspilne Lviv is cited there).
- **Issues:**
  - **IMAGE-LICENSE (high, legal risk).** `image`: author «Суспільне (добропорядне використання, Вікіпедія)», license «Усі права захищено», source a uk.wikipedia **fair-use** file page. Fair use claimed on Wikipedia does not carry over to a third-party site. The photo is Suspilne's copyright.
    - Options: (a) ask Suspilne for written permission; (b) find a freely licensed photo (I found none on Commons); (c) publish without a portrait.
    - Do not publish this image as is.
  - **EN spelling.** "programme" → "program"; "centres" → "centers"; "Honouring"/"honour"/"honoured" → "Honoring"/"honor"/"honored"; "travelling" → "traveling".
  - **EN consistency.** She has "on Independence Square in Kyiv"; Kotsiubailo has "Maidan Nezalezhnosti". Pick one form for all profiles (suggest "Independence Square (Maidan Nezalezhnosti)" on first use).
  - **LINK.** The president.gov.ua decree link returns 403. Add or replace with https://zakon.rada.gov.ua/laws/show/144/2025.
- **Conflicts:**
  - **Start of front-line paramedic work.** Ukrinform and UP Life say 2015; Suspilne's obituary says rotations "ще з 2014-го". Recommend keeping **2015** (two sources), which also fits "at 17".
- Sources are sufficient (decree + Suspilne + UP + Ukrinform).

### maksym-kryvtsov

- **Confirmed:**
  - Born 22 Jan 1990 in Rivne; died 7 Jan 2024 in Kharkiv region (Memorial.ua; Novynarnia; Hromadske).
  - Technical college in Rivne; KNUTD, footwear and leather-goods design (graduated 2014); jobs (nonwovens factory, shop assistant, atelier, photographer/SMM) (Novynarnia; Memorial).
  - Revolution of Dignity; 5th Battalion of the Volunteer Corps (Nov 2014 – Oct 2015); senior machine gunner in the National Guard Rapid Reaction Brigade (2016–2019); YARMIZ and Veteran Hub (Novynarnia).
  - From 2022 a machine gunner in the 3rd Separate Special Operations Regiment (Memorial).
  - «Вірші з бійниці», Nash Format, 2023, named one of the best books of 2023 by PEN Ukraine (Zbruc; Suspilne; Rivne 1).
  - Songs by Yurcash (Wikipedia; Chytomo mentions other artists).
  - Violet variety «RUD-Далі» by Yevhen Rudnytskyi (Hromadske).
  - Kyiv lane renamed in Aug 2024 (Chytomo).
  - Hero of Ukraine, decree No. 608/2025 of 22 Aug 2025, as "учаснику бойових дій (посмертно)" (zakon). Order of Merit 3rd class, 2024, posthumously (Wikipedia; Memorial lists the order).
- **Issues:**
  - **ERROR (misquote).** uk `fun_fact` «Один з віршів Кривцова закінчувався словами «А навесні розквітну фіалками»». That is the breeder's paraphrase in his Facebook post (Hromadske quotes it as his words). The real poem, published by Novynarnia and analyzed by Zbruc, ends «та скоріше б уже весна / щоб нарешті / розквітнути / фіалкою».
    - Proposed: «Його вірш, написаний за два дні до загибелі, закінчується рядками «та скоріше б уже весна / щоб нарешті / розквітнути / фіалкою». Після його загибелі селекціонер із Дніпра Євген Рудницький вивів новий сорт фіалки й назвав його «RUD-Далі»».
    - EN: "…ends with the lines 'and may spring come soon / so that at last / I can bloom / as a violet'…".
    - Sources: https://novynarnia.com/2024/01/07/na-vijni-za-ukrayinu-zagynuv-dobrovolecz-poet-maksym-kryvczov/, https://zbruc.eu/node/117523
  - **ERROR (quote attribution).** `quotes[0]` «Я поверну собі своє життя / обіцяю» is attributed as his own words. In the poem (Bukvy, https://bukvy.org/virshi-maksyma-kryvczova-yakogo-vbyla-rosiya/) these lines are **graffiti he quotes**: «"Я поверну собі своє життя / обіцяю" / написано маркером на стіні одного / популярного закладу Києва». The poem later runs «спокійне життя – це хвороба … втікай звідси / у свій бліндаж».
    - Option A: change `source` to «Максим Кривцов, вірш «Я поверну собі своє життя…» (рядки напису на стіні, які цитує поет; «Букви», 2024)» and add the Bukvy URL to `sources`.
    - Option B: use a line that is his own, e.g. «я поверну собі життя» (same poem). Owner decision.
  - **OVERSTATEMENT.** uk `summary` «який десять років провів на фронті». He served 2014–2019 and 2022–2024 (Wikipedia service years; Novynarnia dates), about 7½ years, with civilian work in between. Zbruc does use "десять років". Proposed: «Поет і фотограф із позивним «Далі», доброволець з 2014 року, а з 2022-го - кулеметник Сил спеціальних операцій.» EN: "who spent ten years at the front" → "a volunteer from 2014 and, from 2022, a special forces machine gunner".
  - **OVERSTATEMENT.** uk body «у березні 2024 року вона була найпопулярнішою книжкою в мережі книгарень «Сенс»». Suspilne reports the top seller at Sens's **new Khreshchatyk shop** in its first month, based on the shop's own social posts. Proposed: «у березні 2024 року вона очолила продажі нової книгарні «Сенс» на Хрещатику». EN: "it topped sales at the new Sens bookshop on Khreshchatyk".
  - **TONE/interpretation (soft).** uk body «показує війну очима людини, яка найбільше хотіла повернутися до звичайного життя». His poems are more ambivalent ("спокійне життя – це хвороба"), and the phrase reads as an editorial verdict. Proposed: «Його поезія показує війну зсередини - з її жахом, побутом і тугою за звичайним життям». EN to match.
  - **IMAGE-LICENSE (high).** `image`: «Невідомий автор, опубліковано «Рівне 1»», «Усі права захищено». No free license; I found nothing usable on Commons. Get permission (the family or the "У пам'ять про Максима «Далі» Кривцова" page) or publish without a portrait.
  - **EN-MISMATCH.** `role`: uk «Поет, фотограф і воїн ССО», en "Poet, photographer and soldier" (drops the special forces). Proposed: "Poet, photographer, SSO soldier" (31 chars).
  - **EN spelling.** "centre" ×2 → "center"; "honour" → "honor".
- Sources are sufficient (decree + Memorial + Novynarnia + Hromadske + Suspilne).

### nazarii-hryntsevych

- **Confirmed:**
  - Born 10 Mar 2003 in Vinnytsia; died 6 May 2024 near Kreminna, aged 21 (Ukrinform; MVS; Wikipedia; ЕСУ entry per search).
  - Hero of Ukraine, decree No. 467/2025 of 8 Jul 2025, "молодшому лейтенанту (посмертно)" (zakon).
  - Azov basic course before he turned 18 while a first-year student (UP interview).
  - Combat medic; wounded; captivity from May 2022; freed in the 21–22 Sep 2022 exchange of 215 (Ukrinform; UP; MVS).
  - Order for Courage 3rd class (2 Apr 2022) (Wikipedia; Ukrinform).
  - The ascorbic-acid tablets and energy drink on his 19th birthday (UP interview).
  - «Любіть маму, їжте кашу і любіть Україну» (UP).
  - «Я не вважаю, що щось зробив прям "вау". Я – звичайний солдат» (UP, verbatim).
  - Co-founded "Kontakt 12" (Ukrinform; MVS).
- **Issues:**
  - **OVERSTATEMENT (owner decision).** «Наймолодший оборонець/захисник «Азовсталі»» in uk `role`, `summary` and body. MVS and Ukrinform use the label, but **he rejected it himself** in the cited UP interview: «Насправді я не наймолодший захисник "Азовсталі". Там були хлопці молодші за мене… Міф склався так: коли був мій обмін, я в тому обміні був наймолодший».
    - Proposed uk `role`: «Бойовий медик «Азову», «Грєнка»» (31 chars). EN: "Azov combat medic, “Hrienka”".
    - Proposed `summary` start: «Бойовий медик «Азову», одного з наймолодших захисників «Азовсталі», якого так і назвали «наймолодшим»…». Shorter: «…один із наймолодших захисників «Азовсталі»…».
    - Better still, use the schema's `misconception` field. **claim:** «Назарій Гринцевич був наймолодшим захисником «Азовсталі».» **truth:** «Так його називали в медіа й навіть в офіційних повідомленнях, але сам він заперечував: на заводі були й молодші бійці, а наймолодшим він був у своєму обміні полоненими.»
    - Source: https://www.pravda.com.ua/articles/2023/08/3/7413772/
  - **ERROR.** uk `summary` «командував відділенням розвідки» and body «командував у ньому відділенням». Ukrinform and Wikipedia: «командиром взводу оптичних спостерігачів». MVS: «очолив новостворений взвод повітряної розвідки «Контакт 12»».
    - Proposed: «командував взводом розвідки» / «командував у ньому взводом оптичних спостерігачів».
    - EN "led a reconnaissance squad" / "led a squad in it" → "led a reconnaissance platoon" / "commanded a platoon of optical observers".
    - Sources: https://www.ukrinform.ua/rubric-society/4012727-bijcu-azova-nazariu-grincevicu-posmertno-prisvoili-zvanna-geroa-ukraini.html, https://mvs.gov.ua/news/naimolodsomu-zaxisniku-azovstali-nazariiu-grincevicu-grinci-prisvojeno-zvannia-geroia-ukrayini-posmertno
  - **UNSOURCED.** uk body «вступив на юридичний факультет». The sources say only "Донецький університет ім. Стуса" (Wikipedia) and "перший курс університету" (UP). Proposed: «вступив до Донецького національного університету імені Василя Стуса…» (drop the faculty).
  - **IMAGE-LICENSE (low–medium).** The source is an mvs.gov.ua news page, not a Commons file. The site footer says CC BY 4.0 "якщо не зазначено інше", but the portrait may be an Azov or family photo republished by MVS. Acceptable with attribution «МВС України (mvs.gov.ua), CC BY 4.0». Ideally upload it to Commons with a review, or confirm its origin.
  - **EN spelling/style.** "defence" → "defense"; "Love your mum" → "Love your mom" (an American reader would expect "mom"; owner may keep "mum" as a deliberate translation choice).
  - **LINK.** The president.gov.ua decree link returns 403 (verified via https://zakon.rada.gov.ua/laws/show/467/2025). The MVS URL is also used for the image; fine.
- Sources are sufficient.

### oleksandr-matsiievskyi

- **Confirmed:**
  - Born 10 May 1980 in Chișinău; died 30 Dec 2022 near Soledar (ЕСУ 877833; Wikipedia; RS quoting TrO "Pivnich").
  - Moved to Nizhyn in 2008; worked as an electrician (ЕСУ; Nizhyn council).
  - Enlisted 11 Mar 2022 in the 163rd Battalion of the 119th TrO Brigade; sniper on the Bakhmut axis from Nov 2022; group cut off near Soledar (ЕСУ; Nizhyn council).
  - Video appeared 6 Mar 2023; SBU confirmed identity 12 Mar 2023 (ЕСУ; RS).
  - Hero of Ukraine, decree No. 146/2023 of 13 Mar 2023, "солдату (посмертно)" (zakon).
  - Buried on the Alley of Glory in Nizhyn (Nizhyn council).
  - Monuments in Nizhyn, Kyiv (sculpture at the Kyiv Fortress museum) and Tbilisi (12 Sep 2023) (Wikipedia, citing Espreso).
  - Streets in Nizhyn, Chernihiv, Kramatorsk and Izium (ЕСУ).
  - Image: Commons, from ssu.gov.ua, CC BY 4.0. The license matches.
- **Issues:**
  - **ERROR (place name).** uk `key_accomplishments[3]` «…Ізюмі та Гребінці». ЕСУ: «1-го Травня у с-щі **Гребінки** Білоцерківського р-ну Київської обл.» (a lane, per Wikipedia). «Гребінці» is the locative of Hrebinka, a different town in Poltava region.
    - Proposed: «Його ім'ям названо вулиці в Ніжині, Чернігові, Краматорську, Ізюмі та провулок у селищі Гребінки на Київщині».
    - uk body «його ім'я носять вулиці в п'яти містах» → «вулиці й провулок у п'яти населених пунктах».
    - EN: "Hrebinka" → "Hrebinky (Kyiv region)"; "streets in five cities" → "streets in five towns and villages".
    - Source: https://esu.com.ua/article-877833
  - **Sequence (minor, could mislead).** uk body: «13 березня 2023 року … присвоїли звання Героя України. Його поховали на Алеї Слави в Ніжині.» The order implies burial after the award. ЕСУ: buried **14 Feb 2023**, before he was identified as the man in the video. Proposed: move the burial sentence before the video paragraph: «Його тіло повернули й 14 лютого 2023 року поховали на Алеї Слави в Ніжині.» EN to match.
  - **IMAGE (credit detail).** Commons gives "Author: Unknown author", source ssu.gov.ua. The current `author: "Служба безпеки України"` is acceptable as the CC BY attribution, but more precise is «Невідомий автор; Служба безпеки України (ssu.gov.ua)».
  - **EN spelling.** "Territorial Defence" ×4 / "defence" → "Defense"/"defense" (the force's own English name is "Territorial Defense Forces"); "honour" → "honor".
  - **LINK.** The president.gov.ua decree link returns 403 (verified via https://zakon.rada.gov.ua/laws/show/146/2023).
- Sources are sufficient (ЕСУ + decree + Nizhyn council + RS).

### roman-ratushnyi

- **Confirmed:**
  - Born 5 Jul 1997 in Kyiv; died near Izium, 9 Jun 2022 per the Solomianska district administration ("09.06.2022") and Novynarnia ("загинув під Ізюмом ще 9 червня").
  - Parents Taras Ratushnyi (Save Old Kyiv) and Svitlana Povaliaieva; Finance and Law College (2012); call sign "Seneca" (Wikipedia; Solomianska administration).
  - Beaten by Berkut on the night of 30 Nov 2013 (Solomianska administration; Hromadske).
  - Led "Protect Protasiv Yar" from 2018; threats in 2019 (Hromadske). Three 40-storey towers (Wikipedia).
  - Kyiv City Council restored green-space status on 27 Jun 2020; the Cassation Administrative Court (part of the Supreme Court) upheld the ban on 4 Jan 2022 (Wikipedia).
  - Defended Kyiv, then Sumy region, then Kharkiv region from April as a scout in the 93rd Brigade (Solomianska administration).
  - Order for Courage 3rd class, posthumously, decree No. 647/2022 of 13 Sep 2022 (Novynarnia reproduces the decree).
  - "Black Square" flashmob after the 29 Mar 2021 house arrest based on near-black photos (Espreso).
  - Reserve named after him in Nov 2023 (Ukrinform).
- **Issues:**
  - **UNSOURCED (fix by adding a source).** uk `fun_fact` «Менш ніж за місяць арешт скасували» and «справу прозвали «справою Малевича»». Both are true, but neither is in the cited sources. The Kyiv Court of Appeal lifted the arrest on 21 Apr 2021. Add https://www.radiosvoboda.org/a/news-ratushnyi-skasuvannia-areshtu/31215405.html. The "Malevich case" nickname is in Wikipedia.
  - **Context (neutrality, optional).** The fun fact omits why he was arrested: a suspicion of hooliganism at the 20 Mar 2021 protest outside the Office of the President in support of Sternenko. Suggest «…під домашній арешт у справі про акцію під Офісом Президента, а доказом слугувало…».
  - **UNSOURCED (minor).** uk body «писав як журналіст про київських чиновників і сумнівні тендери». The Solomianska administration confirms only that he worked as a journalist. Low risk; soften to «працював журналістом» or add a source.
  - **IMAGE-LICENSE (low–medium).** The source is a kyivcity.gov.ua district page (site-wide CC BY 4.0 "якщо не зазначено інше"). The photo is probably a family or unit photo republished there. Acceptable with attribution; confirm its origin if possible.
  - **EN spelling.** "40-storey" → "40-story"; "defence" (if any) → "defense".
- **Conflicts:**
  - **Date of death.** 9 Jun 2022 (Solomianska district administration, an official body; Novynarnia; the profile) versus 8 Jun 2022 (uk Wikipedia infobox and body). Recommend keeping **9 June**: two independent sources, one official.
- Sources are sufficient (Suspilne, Hromadske, Novynarnia, Ukrinform, Espreso + official district page).

### valerii-chybinieiev

- **Confirmed:**
  - Born 3 Mar 1988 in Berdiansk; died 3 Mar 2022 at Hostomel, on his 34th birthday (ЕСУ 77717; Novynarnia; Glavkom; ArmyInform).
  - Orphaned early; boarding school (Glavkom; ArmyInform).
  - Commanded the sniper company of the 79th Brigade; Lyman, Biriukove, Izvaryne (2014); Donetsk airport (Jan 2015); Avdiivka in July 2016 and wounded at the end of that month (ЕСУ; Glavkom; Novynarnia).
  - Hero of Ukraine, decree No. 348/2016 of 23 Aug 2016, "капітану" (zakon). Gold Star presented at the Khreshchatyk parade on 24 Aug 2016 (Glavkom; Novynarnia).
  - Later served in HUR (ArmyInform; Glavkom).
  - Brother Roman, 79th Brigade, killed 11 Apr 2019. Chernihivska Street in Darnytskyi district renamed Brothers Chybinieiev Street in Feb 2024 (ЕСУ; ArmyInform).
  - Image: Commons, from gur.gov.ua, CC BY 4.0. The license matches.
- **Issues:**
  - **LINK.** The president.gov.ua decree link returns 403 (verified via https://zakon.rada.gov.ua/laws/show/348/2016).
  - **EN spelling.** "Defence Intelligence (HUR)" is HUR's own English name ("Defence Intelligence of Ukraine"), so it may stay as a proper name (owner's call). Generic "defence" ×3 → "defense"; "honour" ×2 → "honor".
- **Conflicts:**
  - **Rank at death.** «підполковник» (ArmyInform, MoD, 20 Apr 2023: «Підполковник Валерій Чибінєєв»; RBC citing the HUR press service; Wikipedia) versus «Капітан» (ЕСУ, which appears to give his rank at the 2016 award). Recommend keeping **підполковник**, citing ArmyInform: https://armyinform.com.ua/2023/04/20/pamyati-rozvidnyka-geroya-ukrayiny-valeriya-chybinyeyeva/
  - **Military education.** The profile says he graduated from the Sahaidachny Academy of Land Forces in Lviv in 2010. ArmyInform and Glavkom agree: Odesa academy (intelligence faculty), then transferred to Lviv, graduated 2010. ЕСУ says he "закінчив Військовий інститут Одеського політехнічного університету (2010)". Recommend keeping **Lviv** (two sources incl. MoD) and optionally adding «навчався також в Одесі».
  - **Lyceum (minor).** The profile has «Запорізькому військовому ліцеї». ЕСУ: «Запорізькому військовому ліцеї «Захисник» (2003–05)»; Glavkom/ArmyInform: «ліцей з посиленою фізичною підготовкою «Захисник»». Suggest adding the name «Захисник».
- **Suggested additional sources:** ЕСУ https://esu.com.ua/article-77717 and ArmyInform (link above) for the rank.

### yurii-ruf

- **Confirmed:**
  - Yurii Dadak, born 26 Sep 1980 in Berezhany to a scientist's family; grew up in Lviv; Lyceum No. 93; National Forestry University; Candidate of Sciences (2008) with a dissertation on dust capture in wood processing; associate professor in the department of sawmilling, joinery and wooden building products (Espreso.Zakhid; Wikipedia).
  - Wrote poems from age 14; pen name chosen in 2011 for «Багряна лірика» (2012); «Час Революції» (2014); «На зламі епох» (2015); «Казковик» (2018); «Ваніль чи сталь?!» (2021) (Espreso.Zakhid).
  - "Dukh Natsii" NGO (2015); long-time host of the Kholodnyi Yar festival (UNIAN; Glavkom).
  - Joined the 24th Brigade on 24 Feb 2022; first battle 3 Mar; Popasna (UNIAN; Glavkom; Memorial).
  - Killed by mortar fire on 1 Apr 2022; buried at Lychakiv on 9 Apr (Espreso.Zakhid; Memorial).
  - Order for Courage 3rd class, posthumously, in decree No. 334/2022 of 14 May 2022 ("ДАДАКА Юрія Романовича (посмертно) - солдата") (zakon).
  - Lviv street (Espreso.Zakhid, 30 Jun 2022).
  - "Popular in nationalist circles" (Wikipedia: «у правому націоналістичному середовищі»); his critique of "victim" poetry (NLTU library; Wikipedia).
- **Issues:**
  - **IMAGE-LICENSE (high).** `image`: «Юрій Руф (Facebook), опубліковано УНІАН», «Усі права захищено». A selfie from his own Facebook, reposted by UNIAN. The copyright now belongs to his heirs. Get the family's permission (widow Iryna) or publish without a portrait. Commons has only a photo of his grave.
  - **UNSOURCED (fix by adding sources).**
    - uk body «Його ім'я носять вулиці у Львові, Хмельницькому…» and «2024 року у Львові відкрили мурал на його честь». Lviv is sourced; Khmelnytskyi and the mural are not.
    - Add https://zaxid.net/vulitsyu_u_hmelnitskomu_nazvali_na_chest_lvivyanina_yuriya_rufa_n1541901 (Khmelnytskyi street and lane, Apr 2022).
    - Add https://suspilne.media/lviv/764171-u-lvovi-vidkrili-mural-na-cest-vijskovogo-ta-poeta-uria-rufa/ (mural, 8 Jun 2024, Kolomyiska St 8, Sykhiv).
  - **UNSOURCED (quote).** `quotes[0]` «Ми лише дрова у вогні великої Ідеї» is attributed to the NLTU library, which is not among the sources. Add https://library.nltu.edu.ua/index.php/novyny/1518-my-lyshe-drova-u-vohni-velykoi-idei-yurii-ruf-dadak
  - **TONE (EN).** en body "saw his own militant, patriotic lyrics as an answer to it". In English "militant" suggests aggression or extremism; the uk «мілітарну» means military-themed. Proposed: "saw his own patriotic, military-themed poetry as an answer to it".
  - **EN spelling.** "criticised" → "criticized"; "honour" → "honor".
- **Conflicts:**
  - **Date of death.** 1 Apr 2022 (UNIAN; Espreso.Zakhid; Memorial; Suspilne Lviv) versus 2 Apr 2022 (Glavkom, citing 24 Kanal). Keep **1 April**.
- Sources are sufficient for key facts once the three URLs above are added.

---

## Cross-cutting notes

1. **Image licenses (legal risk).**
   - Three profiles use all-rights-reserved photos: **iryna-tsybukh** (Suspilne, Wikipedia fair use), **maksym-kryvtsov** (Rivne 1, unknown author) and **yurii-ruf** (his own Facebook via UNIAN). Do not publish these until permission is obtained or the images are removed.
   - Two use government-site photos with CC BY 4.0 "unless otherwise stated": **hryntsevych** (MVS) and **ratushnyi** (Solomianska district administration). These are usable with attribution; medium-low risk.
   - The other four (Pilshchykov, Kotsiubailo, Matsiievskyi, Chybinieiev) are Commons CC BY 4.0, and their credits match the file pages.
2. **president.gov.ua links** fail automated checks (403). Prefer the zakon.rada.gov.ua decree pages (`/laws/show/<n>/<year>`), which load and match.
3. **American spelling** in the en files: "defence", "honour", "centre", "programme", "travelled", "storey", "criticised" and "mum" occur across 8 of 9 files (only dmytro-kotsiubailo is clean). Proper names may keep their official forms ("Defence Intelligence of Ukraine").
4. **Encyclopedic sources:** add ЕСУ for Pilshchykov, Kotsiubailo and Chybinieiev (links above). Tsybukh, Kryvtsov, Ratushnyi and Ruf have no ЕСУ article. Under §7.3 the owner must decide whether official sources (decrees, MoD, MVS, city councils) satisfy the "encyclopedic" requirement for recent defenders.

## Summary table

| slug | #errors | #other issues | ready-after-fixes |
|---|---|---|---|
| andrii-pilshchykov | 0 | 4 | yes |
| dmytro-kotsiubailo | 2 | 5 | yes (conflict on "21" resolved by dropping the age) |
| iryna-tsybukh | 0 | 4 | needs owner decision (image license) |
| maksym-kryvtsov | 2 | 6 | needs owner decision (image license; choice of quote) |
| nazarii-hryntsevych | 1 | 5 | needs owner decision ("youngest defender" framing) |
| oleksandr-matsiievskyi | 1 | 4 | yes |
| roman-ratushnyi | 0 | 4 | yes |
| valerii-chybinieiev | 0 | 3 | yes (keep "підполковник", per ArmyInform) |
| yurii-ruf | 0 | 5 | needs owner decision (image license) |

## Applied

**Nothing applied.** The repo edits were blocked by the permission system (auto-mode classifier). The original task also said the repo is read-only. No file under `src/` was changed. Below is the exact change set, ready to apply once the user allows it. Each item is old → new, and every uk change has a matching en change.

- **andrii-pilshchykov:**
  - summary: «з перших днів … захищав небо над Києвом» → «після початку повномасштабної війни повернувся до бригади й захищав небо над Києвом».
  - fun_fact: «у барі він замовляв лише сік і ніколи не пив алкоголю» → «він ніколи не замовляв алкоголю, лише сік».
  - accomplishment: «З лютого 2022 року захищав небо над Києвом» → «З березня 2022 року виконував бойові вильоти, зокрема захищав небо над Києвом».
  - body: «Від перших днів вторгнення…» → «2021 року він звільнився зі служби, але з початком вторгнення 2022 року повернувся до бригади й від березня виконував бойові вильоти…».
  - Add the ЕСУ article-886448 source.
  - en: "travelled" → "traveled".
- **dmytro-kotsiubailo:**
  - summary: «з командира відділення» → «з командира взводу».
  - fun_fact: drop the unsourced Avdiivka wolf; keep the three wolves on the monument (Obozrevatel).
  - accomplishment: drop «у 21 рік - наймолодший»; replace with «командир взводу (2014), роти (з 2015), з 2016 року - 1-ї штурмової роти «Вовки Да Вінчі»» (ЕСУ).
  - body: «Восени 2014» → «2014».
  - body: farewell → service at St Michael's with Zelensky and Marin, then thousands of people on the Maidan.
  - body: streets → Kharkiv, Zaporizhzhia, Ivano-Frankivsk, plus a fountain in Lviv.
  - Sources: add ЕСУ article-77556; decree link → zakon 608/2021; president.gov.ua farewell news → RS 32312010.
- **iryna-tsybukh:**
  - Decree link → zakon 144/2025.
  - en: program, centers, Honoring/honor/honored, traveling.
- **maksym-kryvtsov:**
  - summary: «десять років провів на фронті» → «провів у війську близько семи з половиною років».
  - body: Sens → «очолила продажі нової книгарні «Сенс» на Хрещатику».
  - body: last sentence → «показує війну зсередини - з її жахом, побутом і тугою за звичайним життям».
  - en role → "Poet, photographer, SSO soldier".
  - en: center, honor.
- **nazarii-hryntsevych:**
  - summary and body: «відділенням» → «взводом (оптичних спостерігачів)».
  - body: remove «юридичний факультет».
  - Decree link → zakon 467/2025.
  - en: platoon; defense; mom.
- **oleksandr-matsiievskyi:**
  - accomplishment: «Гребінці» → «провулок у селищі Гребінки на Київщині».
  - body: «у п'яти містах» → «вулиці й провулок у п'яти населених пунктах».
  - body: move the burial (14 Feb 2023) before the video paragraph.
  - Decree link → zakon 146/2023.
  - en: Hrebinky; Defense/defense; honor.
- **roman-ratushnyi:**
  - fun_fact: add the context (the protest outside the Office of the President); remove the «справа Малевича» nickname (Wikipedia only); «арешт скасували» → «апеляційний суд арешт скасував».
  - Add the RS 31215405 source.
  - body: «писав… про… тендери» → «працював журналістом».
  - en: "40-story".
- **valerii-chybinieiev:**
  - Lyceum → «ліцеї «Захисник»».
  - Add ЕСУ article-77717 and ArmyInform 2023 as sources; decree link → zakon 348/2016.
  - Rank «підполковник» and the Lviv academy are already the current values and each has two sources, so no change.
  - en: generic "defence" → "defense"; "honour" → "honor".
- **yurii-ruf:**
  - Add 3 sources: NLTU library (quote), ZAXID (Khmelnytskyi street), Suspilne Lviv (mural, 8 Jun 2024).
  - en: "militant, patriotic lyrics" → "patriotic, military-themed poetry"; criticized; honor.

## Left for owner

- **Image licenses:** the Tsybukh, Kryvtsov and Ruf portraits are all-rights-reserved. Recommendation: get permission (Suspilne; the Kryvtsov family; Ruf's widow) or publish without a portrait.
- **Pilshchykov image alt** «…, 2023»: the photo's date is unknown. Recommendation: drop the year (an image field, so left to you).
- **Matsiievskyi image author:** recommend «Невідомий автор; СБУ (ssu.gov.ua)».
- **Kryvtsov violet fun fact:** recommend quoting the real ending lines «та скоріше б уже весна / щоб нарешті / розквітнути / фіалкою» (Novynarnia, Zbruc). Alternative: present the breeder's version as his own paraphrase.
- **Kryvtsov quote** «Я поверну собі своє життя / обіцяю». Option A: keep it, note in the source that he is quoting graffiti, and add the Bukvy URL. Option B: use his own line «я поверну собі життя».
- **Hryntsevych "youngest Azovstal defender".** He denied this himself (UP 2023). Option 1: role «Бойовий медик «Азову», «Грєнка»» and summary «один із наймолодших». Option 2: keep the role and add a `misconception` card. Recommendation: option 1 plus the card.
- **Chybinieiev "Defence Intelligence of Ukraine (HUR)":** HUR's own English name uses British spelling. Recommendation: keep it as a proper name.
- **Not touched:** the -sky/-skyi spelling question, and the `reviewed`, `last_reviewed`, `added` and `animate` fields.
