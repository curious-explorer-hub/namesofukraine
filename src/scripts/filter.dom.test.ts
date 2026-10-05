// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { initFilters } from './filter';
import { setRead } from './read-marks';

// Mirrors the markup produced by FilterBar, EraRibbon, PersonCard, and the home page.
// Keeps Cyrillic letters (JS \W would treat them as separators and collapse every name).
const slugOf = (name: string) => name.toLowerCase().replace(/[\s']+/g, '-');
const person = (name: string, group: string, era: string, region: string) =>
  `<li class="person-item" data-slug="${slugOf(name)}" data-group="${group}" data-era="${era}" data-region="${region}" data-search="${name}">${name}</li>`;

const fixture = `
  <button type="button" class="era" data-era="19th-century" aria-pressed="false">XIX</button>
  <button type="button" class="era" data-era="20th-century" aria-pressed="false">XX</button>
  <form class="filters" hidden>
    <input type="search" name="q" />
    <select name="group"><option value=""></option><option value="literature">literature</option><option value="science">science</option></select>
    <select name="era"><option value=""></option><option value="19th-century">19</option><option value="20th-century">20</option></select>
    <select name="region"><option value=""></option><option value="lviv">lviv</option><option value="kyiv-city">kyiv</option></select>
    <label><input type="checkbox" name="unread" value="1" /> unread</label>
    <button type="reset">reset</button>
    <p class="filters-status" data-found="Знайдено: {n}"></p>
    <p class="read-progress" data-template="Прочитано {n} з {total}"></p>
  </form>
  <section class="recent"><ul>${person('Іван Франко', 'literature', '19th-century', 'lviv')}</ul></section>
  <div class="catalogue" data-preview="2">
    <section class="group" id="literature">
      <div class="section-head"><a class="section-all" href="/groups/literature/" data-label="All {n}" data-aria-label="All literature: {n}">All 3</a></div>
      <ul>
        ${person('Іван Франко', 'literature', '19th-century', 'lviv')}
        ${person('Леся Українка', 'literature', '19th-century', 'zhytomyr')}
        ${person("В'ячеслав Чорновіл", 'literature', 'independence', 'cherkasy')}
      </ul>
    </section>
    <section class="group" id="science">
      <div class="section-head"><a class="section-all" href="/groups/science/" data-label="All {n}" data-aria-label="All science: {n}">All 1</a></div>
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

  it('previews the first N people of each section when no filter is active', () => {
    expect(visibleNames()).toEqual(['Іван Франко', 'Леся Українка', 'Ігор Сікорський']);
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
    expect(visibleNames()).toHaveLength(3); // back to the grouped preview
    expect(band.getAttribute('aria-pressed')).toBe('false');
    expect(location.search).toBe('');
  });

  it('resets every filter and clears the URL', async () => {
    type('q', 'франко');
    type('region', 'lviv');
    $<HTMLFormElement>('form.filters').reset();
    await new Promise((resolve) => setTimeout(resolve)); // reset handler re-applies on the next tick
    expect(visibleNames()).toHaveLength(3);
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

  it('"unread only" keeps the grouped layout, refilling each preview with unread people', () => {
    setRead(slugOf('Іван Франко'), true);
    tickUnread();
    expect($('.catalogue').hasAttribute('data-filtering')).toBe(false); // sections stay
    expect(visibleNames()).toEqual(['Леся Українка', "В'ячеслав Чорновіл", 'Ігор Сікорський']);
    expect(new URLSearchParams(location.search).get('unread')).toBe('1');
  });

  it('"unread only" updates each "All N" link to the unread count and keeps the filter', () => {
    setRead(slugOf('Іван Франко'), true);
    tickUnread();
    const link = $<HTMLAnchorElement>('#literature .section-all');
    expect(link.textContent).toBe('All 2');
    expect(link.getAttribute('href')).toBe('/groups/literature/?unread=1');
    $<HTMLFormElement>('form.filters').reset();
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        expect(link.textContent).toBe('All 3');
        expect(link.getAttribute('href')).toBe('/groups/literature/');
        resolve();
      }),
    );
  });

  it('"unread only" hides a section whose people are all read, and says when everyone is read', () => {
    setRead(slugOf('Ігор Сікорський'), true);
    tickUnread();
    expect($('#science').hidden).toBe(true);
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
