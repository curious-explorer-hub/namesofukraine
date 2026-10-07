# Content license

The code in this repository is licensed under the MIT License (see [LICENSE](../LICENSE)). Everything else is licensed as follows (product_vision.md §7.8):

| What | Where | License |
|---|---|---|
| Site text: profiles, page texts, interface strings | `src/content/people/`, `src/content/pages/`, `src/i18n/`, `src/content/*.json` | [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) |
| Images: portraits, era and hero pictures | `src/content/people/uk/images/`, `src/assets/eras/`, `src/assets/hero/` | Each image keeps its own license: public domain or a free license, with author and source given in the profile's `image` field, `src/content/eras.json` and `src/content/hero.json`, and shown on the site |
| Exception: fair-use portraits | Profiles with `fair_use: true` in the `image` field (Ivan Mykolaichuk, Vasyl Sukhomlynskyi, Iryna Tsybukh, Pavlo Petrychenko, Ostap Vyshnia, Mariia Prymachenko, Petro Yatsyk, Olha Semydianova) | **Not freely licensed** and not covered by CC BY-SA. Used under fair use on this site only (profile and cards; not in share images); don't reuse them. Removed on the rights holder's request |
| Map outlines (oblast borders) | `src/content/geo/ukraine-oblasts.json` | From [geoBoundaries](https://www.geoboundaries.org/) UKR ADM1, © OpenStreetMap contributors, [Open Database License 1.0 (ODbL)](https://opendatacommons.org/licenses/odbl/1-0/); simplified. Credited under the map and on the Credits page |
| Continent outlines (coastlines) | `src/content/geo/world-land.json` | [Natural Earth](https://www.naturalearthdata.com/) 1:110m land, public domain; rounded to 0.1°. No country borders; Ukraine on the continent cards is drawn from the oblast outlines above |
| Fonts (Fixel) | `public/fonts/`, `src/assets/fonts/` | SIL Open Font License 1.1 (see `OFL.txt` next to the fonts) |

To reuse the text, credit «Знай своїх» / "Know Your Own" with a link to the page, and share any adaptation under CC BY-SA 4.0. To reuse an image, follow that image's own license and credit.
