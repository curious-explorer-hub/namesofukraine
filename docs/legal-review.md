# Legal review: copyright and image rights

Review of 2026-10-12 of everything published (text, images, quotes, videos) and of the Credits page. It is research, not legal advice: have a Ukrainian IP lawyer check the conclusions before relying on them. Where the owner lives matters for enforcement; Ukrainian courts can hear claims about a site aimed at Ukrainian readers wherever it is hosted.

**Status:** round 1 (P0 fixes and the Credits rewrite) and round 2 (labels of portraits approved on main) done on branch `legal-review`. Open items are under [To do](#to-do).

## Summary

- **Text, map, fonts, icons and videos are in good shape.**
- **The exposure is the non-free portraits:** 56 of 183 published portraits have `fair_use: true` (after round 2), plus 6 story photos and 1 collection image.
- **"Fair use" has no legal effect in Ukraine.** Law No. 2811-IX, art. 22(3): the list of free uses is "вичерпним" (exhaustive), and none covers a whole photo used to show who a person is.
  - Quotation (22(2)(1)) needs a *fragment*, marked as a quote, for a critical, polemical, scientific or informational purpose.
  - The teaching exceptions (22(2)(2)–(4)) apply only to educational bodies in a closed environment.
  - Orphan works (art. 29) are for libraries, archives and museums only, and exclude photos.
  - Three-step test in art. 22(4).
- **In the US the defence is weak too.** Using a portrait only to show what someone looks like is the weakest fair-use claim: *Warhol v. Goldsmith* (2023), *Philpot v. Independent Journal Review* (4th Cir. 2024), *Barcroft v. Coed* (S.D.N.Y. 2017), *Otto v. Hearst* (S.D.N.Y. 2018). Non-profit status and donations don't change much (*Hachette v. Internet Archive*, 2d Cir. 2024). Credit helps a little; a missing credit hurts.
- **Realistic risk:** takedown requests and demand letters, not lawsuits.
  - Agency collectors (PicRights for AFP and Reuters, Copytrack, Getty) usually ask for hundreds to a few thousand dollars per image.
  - Ukrainian statutory compensation (art. 55): 2 to 200 subsistence minimums per work, about ₴6,656 to ₴665,600 at the 2026 minimum. Alternatively 2× the license fee (3× if intentional), plus a 10% fine.
  - Art. 56: the site owner must remove within 48 hours of a notice. Removal lowers damages; it doesn't make the use lawful.
  - A DMCA agent wouldn't help. That safe harbour covers user uploads; this site publishes everything itself.

## Findings

### Already well handled

- Fair-use images never go into share cards, Instagram slides or structured data (`freeImage()` in `src/lib/people.ts`).
- Videos are low risk: youtube-nocookie, click-to-play, official channels, no thumbnail stored on the site. Lawful in the EU (*BestWater* C-348/13, *VG Bild-Kunst* C-392/19) and under the US server test (*Perfect 10*; S.D.N.Y. disagrees in *Nicklen v. Sinclair*). Only add videos from the publisher's own channel.
- Map data (ODbL, credited), fonts (OFL) and icons (CC0, trademark note) are fine.
- AI edits are labelled. Under CC 4.0, an AI edit of a CC BY-SA photo is an adaptation: keep BY-SA and say it was changed (done).

### Image rights of the people shown (Civil Code)

- Art. 307: consent to being photographed is presumed at public events.
- Art. 308: showing a photo of a person needs their consent. After death it needs the consent of the next of kin named in art. 303(4): children and spouse, otherwise parents and siblings. There is no explicit public-figure exception.
- For fallen defenders this formally means family consent. Practical rule: prefer photos the family or an official memorial published, and replace or remove at once when a family asks (the Credits page now says so).
- Personal data law, art. 25(2): processing for journalistic and creative purposes is exempt, so sourced biographies are plausibly covered.

### Benchmark: Wikipedia's non-free content criteria

Wikipedia allows non-free images only where no free one exists (NFCC #1). It rejects non-free photos of **living people** (a free one could still be taken) and **press-agency photos** unless the photo itself is the subject. Our tiers follow this.

### Reuse terms of the source sites (checked 2026-10-12)

- **CC BY 4.0 "unless otherwise noted"** (usable with credit, only for the outlet's own photos, not Reuters, AP or UNIAN):
  - mod.gov.ua (formerly mil.gov.ua), rada.gov.ua, kmu.gov.ua, dpsu.gov.ua, mva.gov.ua, ngu.gov.ua, General Staff, texty.org.ua.
  - president.gov.ua: only photos uploaded before 4 Oct 2022.
  - Commons has license templates for these government sources.
- **ArmyInform:** the footer says CC BY 4.0 but links to the BY-NC-ND deed. Use only its own photos and save a copy of the notice on the day you take one.
- **Written permission needed:** Ukrinform, Ukrainska Pravda, Kyiv Independent, RFE/RL (Radio Svoboda; its photos are not public domain), Kyiv Post, Forbes.ua, ESU (third-party photos), KPI, Memorybook, Ukrainky, Local History, Gazeta.
- **Link-only or no clear photo license** (memorial.ua, detector.media, imi.org.ua, streetcodes.in.ua): "link required" is not a photo license. memorial.ua also bans social-media use without written permission. We don't post these images to social media.

### Quotes

- One-line quotes with a source are low risk.
- Three reproduce a **whole stanza by a protected author**: Rybchynskyi (4 lines, living, a song text), Polishchuk (4 lines, living) and Drach (4 lines, died 2018).
- Our English translations are derivative works, which adds to the reproduction.

## Non-free portraits by risk (published, after round 2)

**P1. Living people (14).** Highest risk: replace with a free photo or get written permission.
andriana-susak-arekhta (gmfus.org), denys-prokopenko (ArmyInform: check whether it's their own photo, then CC BY 4.0), ihor-hordiichuk (source link wrong), illia-samoilenko (Kyiv Post), kateryna-polishchuk (Ukrainska Pravda), lev-pashko (Forbes.ua), lina-kostenko (arkushi.com), mariana-mamonova (Ukrainska Pravda), mykhailo-dianov (vikna.tv; plus 2 story photos), roman-hrybov (gazeta.ua), valentyn-sylvestrov (huxley.media), valeriia-karpylenko (imi.org.ua), yaryna-chornohuz (Kyiv Independent), yurii-rybchynskyi (uacrr.org.ua).

**P2. Died 2014 or later (21):** fallen defenders, the Heavenly Hundred, recent deaths. Copyright plus family consent (art. 308).
bohdan-havrylyshyn (source link wrong), bohdan-solchanyk (ESU), borys-paton (KPI), ihor-branovytskyi (Radio Svoboda), ihor-kostenko (detector.media), ihor-zinych (memorybook), iryna-tsvila (Ukrinform), iryna-tsybukh (uk.wikipedia), ivan-drach (nashformat.ua), ivan-zubkov (memorybook), kateryna-handziuk (texty.org.ua: CC BY 4.0 if it's their own photo), maksym-kryvtsov (memorial.ua), maksym-yalovtsov (memorial.ua), nina-matviienko (ArmyInform: check, possibly CC BY 4.0), olha-semydianova (uk.wikipedia), pavlo-petrychenko (memorial.ua), petro-polytsiak (ESU), serhii-tabala (memorybook), sviatoslav-horbenko (knu.ua), yevhenii-brakh (memorial.ua), yurii-ruf (espreso.tv).

**P3. Died before 2014 (21).** Lowest risk; keep, with removal on request.
heorhii-honhadze, ivan-fedorov (modern drawing, artist unknown), ivan-mykolaichuk, ivan-sirko (AI image; source link wrong), ivan-svitlychnyi, ivan-vyhovskyi (AI rendering closely following a modern painting), mariia-prymachenko (AI colorization of a non-free photo), mykhailo-drai-khmara, mykhailyna-kotsiubynska, mykola-vinhranovskyi, nazarii-yaremchuk, oleksa-hirnyk, olena-stepaniv, opanas-zalyvakha, ostap-vyshnia (AI rendering; source photo unknown, license "Невідомо"), petro-yatsyk, raisa-kyrychenko (Facebook), serhii-paradzhanov (WikiArt), valerii-marchenko, vasyl-sukhomlynskyi, viacheslav-chornovil (texty.org.ua: check, possibly CC BY 4.0).

**Other non-free images:**
- Story photos with `fair_use: true` in andrii-shevchenko, dmytro-kozatskyi, liliia-podkopaieva, mykhailo-dianov (2) and oleksii-anulia.
- `donetsk-airport.jpg` in `src/content/collections.json`: "Fair use", unknown author, empty `source_url`.
- Draft: serhii-kulchytskyi.

Don't make new AI edits of non-free photos or of modern artworks: an unauthorised derivative weakens the defence further, even when AI redraws it. AI edits of public-domain originals are free; label them with the original's license, not "Fair use".

## Done (round 1, branch `legal-review`)

- **Zaitsev and Mikats relabelled.** Their portraits are AI edits of free Commons photos (Volkov, CC BY-SA 4.0; Ministry of Defence, CC BY-SA 2.0), checked against the Commons API and by eye. `fair_use` removed, so they now also appear in share cards.
- **Credits page rewritten** (UK and EN), renamed "Авторські права та зображення" / "Copyright and images", with five sections: our texts, images, images without a free license, quotes and videos, and rights holders and families (48-hour removal). It describes the practice rather than claiming fair use as a right.
- **Footer link** renamed "Авторські права" / "Copyright".
- **Note under non-free images** rephrased: "без вільної ліцензії, використано лише на цьому сайті; не підпадає під ліцензію CC BY-SA" / "not freely licensed, used on this site only; …".
- **License names link to their deeds** in every image credit: `licenseUrl()` in `src/lib/license.ts` (tested) and `src/components/License.astro`.
- **`docs/LICENSE-CONTENT.md`:** the out-of-date list of fair-use people replaced by a rule that finds them all.
- Checked and left as is: Hetman's "Attribution" is the real Commons tag for the Rada.

## Done (round 2, branch `legal-review`)

- **Relabelled as public domain** after main approved them as fair use: Nalyvaiko, Kostomarov (Petr Borel lithograph) and Doroshenko. Each is an AI edit of a 19th-century original on Commons, checked against the Commons API and by eye; source links now point to those files.
- **Kept as fair use, source links corrected:** Fedorov (a modern drawing, not an AI image) and Vyhovskyi (AI rendering of a modern painting). Both linked a Rivne library page that shows neither image.

## To do

1. **Owner:** correct the source links of Sirko, Havrylyshyn (their images don't come from the cited Commons files) and Hordiichuk (it links to Rybchynskyi's page).
2. **Owner:** replace or remove the Donetsk airport collection image. The Commons photos of the tower are stills from separatist YouTube channels; try Commons "Photo Project «Nezlamni kiborhy»".
3. **Owner:** cut the Rybchynskyi, Polishchuk and Drach quotes to 1–2 lines.
4. **P1:** for the 14 living people, look for free replacements (government CC BY 4.0 sites, ArmyInform own photos, Commons). Otherwise send a one-line permission request (keep the replies outside the repo).
5. **P2:** check whether the ArmyInform and texty.org.ua photos are the outlet's own (Prokopenko, Matviienko, Handziuk, Chornovil); if so relicense to CC BY 4.0. Ask memorial platforms and families where possible.
6. **Optional:** generate the list of non-free images on the Credits page from the data, so it can't go out of date.
7. **Optional:** Symonenko is "Public domain (Ukraine)" from a uk.wikipedia file, so it may not be public domain in the US.
8. **Before relying on this:** have a Ukrainian IP lawyer review it. zakon.rada.gov.ua was unreachable, so the law's text was read from WIPO Lex (consolidated to April 2023); check for later amendments.
