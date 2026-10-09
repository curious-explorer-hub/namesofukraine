// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { initFilters } from './filter';
import { setRead } from './read-marks';

// Mirrors the markup produced by FilterBar, EraRibbon, GroupTiles, PersonCard, and the home page.
// Keeps Cyrillic letters (JS \W would treat them as separators and collapse every name).
const slugOf = (name: string) => name.toLowerCase().replace(/[\s']+/g, '-');
const person = (name: string, group: string, era: string, region: string, collections = '') =>
  `<li class="person-item" data-slug="${slugOf(name)}" data-group="${group}" data-era="${era}" data-region="${region}" data-collections="${collections}" data-search="${name}">${name}</li>`;

const tile = (group: string, n: number) =>
  `<li class="tile-item" data-group="${group}"><a class="tile" href="/?group=${group}" data-total="${n}"><span class="tile-count">${n}</span></a></li>`;

const fixture = `
  <button type="button" class="era" data-era="19th-century" aria-pressed="false">XIX</button>
  <button type="button" class="era" data-era="20th-century" aria-pressed="false">XX</button>
  <form class="filters" hidden>
    <input type="search" name="q" />
    <select name="group"><option value=""></option><option value="literature">literature</option><option value="science">science</option></select>
    <input type="hidden" name="collection" value="" />
    <select name="era"><option value=""></option><option value="19th-century">19</option><option value="20th-century">20</option></select>
    <select name="region"><option value=""></option><option value="lviv">lviv</option><option value="kyiv-city">kyiv</option></select>
    <label><input type="checkbox" name="unread" value="1" /> unread</label>
    <button type="reset">reset</button>
    <p class="filters-status" data-found="Знайдено: {n}"></p>
    <p class="read-progress" data-template="Прочитано {n} з {total}"></p>
  </form>
  <section class="recent"><ul>${person('Іван Франко', 'literature', '19th-century', 'lviv')}</ul></section>
  <section class="tiles"><ul>
    ${tile('literature', 3)}
    ${tile('science', 1)}
  </ul></section>
  <ol class="ribbon-bands">
    <li><button type="button" class="era" data-collection="money-people" aria-pressed="false">money</button></li>
    <li><button type="button" class="era" data-collection="women-army" aria-pressed="false">army</button></li>
  </ol>
  <div class="collection-notes">
    <p data-collection-note="money-people" hidden>about money</p>
    <p data-collection-note="women-army" hidden>about army</p>
  </div>
  <div class="catalogue">
    <section class="group" id="literature" data-group="literature">
      <ul>
        ${person('Іван Франко', 'literature', '19th-century', 'lviv', 'money-people')}
        ${person('Леся Українка', 'literature', '19th-century', 'zhytomyr', 'money-people,women-army')}
        ${person("В'ячеслав Чорновіл", 'literature', 'independence', 'cherkasy')}
      </ul>
    </section>
    <section class="group" id="science" data-group="science">
      <ul>${person('Ігор Сікорський', 'science', '20th-century', 'kyiv-city')}</ul>
    </section>
    <p class="catalogue-empty" hidden data-all-read="all read">empty</p>
  </div>`;

const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const visibleNames = () =>
  [...document.querySelectorAll<HTMLElement>('.catalogue .person-item')]
    .filter((li) => !li.hidden)
    .map((li) => li.textContent);
const type = (name: string, value: string) => {
  const field = $<HTMLInputElement>(`form.filters [name="${name}"]`);
  field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
};

const setup = (query = '') => {
  localStorage.clear();
  history.replaceState(null, '', `/${query}`);
  document.body.innerHTML = fixture;
  initFilters();
};

describe('initFilters', () => {
  beforeEach(() => setup());

  it('reveals the filter form only once JavaScript runs', () => {
    document.body.innerHTML = fixture;
    expect($('form.filters').hidden).toBe(true);
    initFilters();
    expect($('form.filters').hidden).toBe(false);
  });

  it('shows the group tiles, not the results grid, when no filter is active', () => {
    expect($('.tiles').hidden).toBe(false);
    expect(visibleNames()).toHaveLength(4); // the sections themselves are hidden by CSS on the home page
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(false);
    expect($('.recent').hidden).toBe(false);
    expect($('.filters-status').textContent).toBe('');
  });

  it('filters by search text and reports the count', () => {
    type('q', 'леся');
    expect(visibleNames()).toEqual(['Леся Українка']);
    expect($('.filters-status').textContent).toBe('Знайдено: 1');
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(true);
    expect($('form.filters').hasAttribute('data-active')).toBe(true);
    expect($('.recent').hidden).toBe(true);
    expect($('.tiles').hidden).toBe(false); // in their own tab, so they stay for switching fields
  });

  it('a field tile filters in place, marks itself, and a second click clears it', () => {
    const link = $<HTMLAnchorElement>('.tile-item[data-group="science"] .tile');
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true); // stays on the page instead of opening the field page
    expect(visibleNames()).toEqual(['Ігор Сікорський']);
    expect(link.getAttribute('aria-current')).toBe('true');
    expect($('.tiles').hidden).toBe(false);
    expect(new URLSearchParams(location.search).get('group')).toBe('science');

    $<HTMLAnchorElement>('.tile-item[data-group="literature"] .tile').click(); // switch to another field
    expect(visibleNames()).toHaveLength(3);
    expect(link.hasAttribute('aria-current')).toBe(false);

    $<HTMLAnchorElement>('.tile-item[data-group="literature"] .tile').click();
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(false);
    expect(location.search).toBe('');
  });

  it('a collection card filters like an era band: pressed, switchable, and a second click clears it', () => {
    const army = $<HTMLButtonElement>('.era[data-collection="women-army"]');
    const money = $<HTMLButtonElement>('.era[data-collection="money-people"]');
    army.click();
    expect(visibleNames()).toEqual(['Леся Українка']);
    expect(army.getAttribute('aria-pressed')).toBe('true');
    expect(new URLSearchParams(location.search).get('collection')).toBe('women-army');

    money.click();
    expect(visibleNames()).toEqual(['Іван Франко', 'Леся Українка']);
    expect(money.getAttribute('aria-pressed')).toBe('true');
    expect(army.getAttribute('aria-pressed')).toBe('false');

    money.click();
    expect(money.getAttribute('aria-pressed')).toBe('false');
    expect(location.search).toBe('');
  });

  it("shows the selected collection's description, and hides it once the card is released", () => {
    const shownNotes = () =>
      [...document.querySelectorAll<HTMLElement>('[data-collection-note]')].filter((n) => !n.hidden).map((n) => n.textContent);
    expect(shownNotes()).toEqual([]);
    $<HTMLButtonElement>('.era[data-collection="women-army"]').click();
    expect(shownNotes()).toEqual(['about army']);
    $<HTMLButtonElement>('.era[data-collection="money-people"]').click();
    expect(shownNotes()).toEqual(['about money']);
    $<HTMLButtonElement>('.era[data-collection="money-people"]').click();
    expect(shownNotes()).toEqual([]);

    setup('?collection=women-army'); // a shared link
    expect(shownNotes()).toEqual(['about army']);
  });

  it('an era band and a collection card each press only their own kind', () => {
    $<HTMLButtonElement>('.era[data-collection="women-army"]').click();
    expect($('.era[data-era="19th-century"]').getAttribute('aria-pressed')).toBe('false');
    $<HTMLButtonElement>('.era[data-era="19th-century"]').click();
    expect($('.era[data-collection="women-army"]').getAttribute('aria-pressed')).toBe('true');
    expect(visibleNames()).toEqual(['Леся Українка']);
  });

  it('a tile clicked with a modifier key opens its link as usual', () => {
    const click = new MouseEvent('click', { bubbles: true, cancelable: true, metaKey: true });
    $('.tile-item[data-group="science"] .tile').dispatchEvent(click);
    expect(click.defaultPrevented).toBe(false);
    expect($<HTMLSelectElement>('[name="group"]').value).toBe('');
  });

  it('writes the active filters to the URL', () => {
    type('q', 'франко');
    type('group', 'literature');
    expect(new URLSearchParams(location.search).get('q')).toBe('франко');
    expect(new URLSearchParams(location.search).get('group')).toBe('literature');
    expect(location.search).not.toContain('era=');
  });

  it('restores filters from the URL on load', () => {
    setup('?era=19th-century&region=lviv');
    expect($<HTMLSelectElement>('[name="era"]').value).toBe('19th-century');
    expect(visibleNames()).toEqual(['Іван Франко']);
    expect($('.era[data-era="19th-century"]').getAttribute('aria-pressed')).toBe('true');
  });

  it('restores a collection from the URL, shows only its people and presses its card', () => {
    setup('?collection=money-people');
    expect($<HTMLInputElement>('[name="collection"]').value).toBe('money-people');
    expect(visibleNames()).toEqual(['Іван Франко', 'Леся Українка']);
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(true);
    expect($('.era[data-collection="money-people"]').getAttribute('aria-pressed')).toBe('true');
    expect($('.era[data-collection="women-army"]').getAttribute('aria-pressed')).toBe('false');
  });

  it('reset clears the collection too, and releases its card', async () => {
    setup('?collection=money-people');
    $<HTMLFormElement>('form.filters').reset();
    await new Promise((resolve) => setTimeout(resolve));
    expect($<HTMLInputElement>('[name="collection"]').value).toBe('');
    expect(visibleNames()).toHaveLength(4);
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(false);
    expect($('.tiles').hidden).toBe(false);
    expect($('.era[data-collection="money-people"]').getAttribute('aria-pressed')).toBe('false');
    expect(location.search).toBe('');
  });

  it('shows the empty message when nothing matches', () => {
    type('q', 'неіснуюча людина');
    expect(visibleNames()).toEqual([]);
    expect($('.catalogue-empty').hidden).toBe(false);
    expect($('.filters-status').textContent).toBe('Знайдено: 0');
  });

  it('toggles an era from the ribbon, and a second click clears it', () => {
    const band = $<HTMLButtonElement>('.era[data-era="20th-century"]');
    band.click();
    expect(visibleNames()).toEqual(['Ігор Сікорський']);
    expect(band.getAttribute('aria-pressed')).toBe('true');
    expect($('.era[data-era="19th-century"]').getAttribute('aria-pressed')).toBe('false');

    band.click();
    expect(visibleNames()).toHaveLength(4); // back to the grouped layout
    expect($('.tiles').hidden).toBe(false);
    expect(band.getAttribute('aria-pressed')).toBe('false');
    expect(location.search).toBe('');
  });

  it('resets every filter and clears the URL', async () => {
    type('q', 'франко');
    type('region', 'lviv');
    $<HTMLFormElement>('form.filters').reset();
    await new Promise((resolve) => setTimeout(resolve)); // reset handler re-applies on the next tick
    expect(visibleNames()).toHaveLength(4);
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(false);
    expect(location.search).toBe('');
  });

  it('counts each person once for reading progress', () => {
    expect($('.read-progress').textContent).toBe('Прочитано 0 з 4');
    setRead(slugOf('Іван Франко'), true);
    type('q', ''); // any input re-applies the filters and refreshes the count
    expect($('.read-progress').textContent).toBe('Прочитано 1 з 4');
  });

  const tickUnread = () => {
    const box = $<HTMLInputElement>('[name="unread"]');
    box.checked = true;
    box.dispatchEvent(new Event('input', { bubbles: true }));
  };

  it('"unread only" keeps the grouped layout, leaving out people already read', () => {
    setRead(slugOf('Іван Франко'), true);
    tickUnread();
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(false); // sections stay
    expect(visibleNames()).toEqual(['Леся Українка', "В'ячеслав Чорновіл", 'Ігор Сікорський']);
    expect(new URLSearchParams(location.search).get('unread')).toBe('1');
  });

  it('"unread only" updates each tile to the unread count and keeps the filter', () => {
    setRead(slugOf('Іван Франко'), true);
    tickUnread();
    const link = $<HTMLAnchorElement>('.tile-item[data-group="literature"] .tile');
    const count = link.querySelector('.tile-count')!;
    expect(count.textContent).toBe('2');
    expect(link.getAttribute('href')).toBe('/?group=literature&unread=1');
    $<HTMLFormElement>('form.filters').reset();
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        expect(count.textContent).toBe('3');
        expect(link.getAttribute('href')).toBe('/?group=literature');
        resolve();
      }),
    );
  });

  it('"unread only" hides a section and its tile when all its people are read, and says when everyone is read', () => {
    setRead(slugOf('Ігор Сікорський'), true);
    tickUnread();
    expect($('#science').hidden).toBe(true);
    expect($('.tile-item[data-group="science"]').hidden).toBe(true);
    expect($('#literature').hidden).toBe(false);
    for (const n of ['Іван Франко', 'Леся Українка', "В'ячеслав Чорновіл"]) setRead(slugOf(n), true);
    tickUnread();
    expect(visibleNames()).toEqual([]);
    expect($('.catalogue-empty').hidden).toBe(false);
    expect($('.catalogue-empty').textContent).toBe('all read');
  });

  it('search combined with "unread only" still uses the single results grid', () => {
    setRead(slugOf('Іван Франко'), true);
    tickUnread();
    type('q', 'у');
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(true);
    expect(visibleNames()).not.toContain('Іван Франко');
  });

  it('restores "unread only" from the URL', () => {
    history.replaceState(null, '', '/?unread=1');
    document.body.innerHTML = fixture;
    setRead(slugOf('Ігор Сікорський'), true);
    initFilters();
    expect($<HTMLInputElement>('[name="unread"]').checked).toBe(true);
    expect(visibleNames()).not.toContain('Ігор Сікорський');
  });

  it('filters only the catalogue, never the recently-added row', () => {
    type('q', 'сікорський');
    expect($('.recent .person-item').hidden).toBe(false);
  });
});
