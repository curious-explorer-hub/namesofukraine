// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { FALLBACK_LIMIT, STORAGE_KEY, getRead, initProfile, markCards, setRead, updateReadNext } from './read-marks';

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '';
});

describe('read storage', () => {
  it('starts empty and remembers marks', () => {
    expect(getRead().size).toBe(0);
    setRead('ivan-franko', true);
    setRead('lesya-ukrainka', true);
    expect([...getRead()].sort()).toEqual(['ivan-franko', 'lesya-ukrainka']);
  });

  it('can unmark, and marking twice keeps one entry', () => {
    setRead('ivan-franko', true);
    setRead('ivan-franko', true);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(['ivan-franko']);
    setRead('ivan-franko', false);
    expect(getRead().has('ivan-franko')).toBe(false);
  });

  it('ignores corrupted storage instead of breaking the page', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    expect(getRead().size).toBe(0);
    localStorage.setItem(STORAGE_KEY, '{"a":1}');
    expect(getRead().size).toBe(0);
    setRead('ivan-franko', true);
    expect([...getRead()]).toEqual(['ivan-franko']);
  });
});

describe('cards', () => {
  it('flags only the cards of people already read', () => {
    document.body.innerHTML = `
      <li class="person-item" data-slug="ivan-franko"></li>
      <li class="person-item" data-slug="lesya-ukrainka"></li>`;
    setRead('ivan-franko', true);
    markCards();
    const [franko, lesya] = document.querySelectorAll('.person-item');
    expect(franko.classList.contains('is-read')).toBe(true);
    expect(lesya.classList.contains('is-read')).toBe(false);
  });
});

describe('profile toggle', () => {
  const profile = () => {
    document.body.innerHTML = `
      <article data-read-slug="ivan-franko">
        <button data-read-toggle hidden data-label-read="Read" data-label-unread="Mark as read"></button>
      </article>`;
    initProfile();
    return document.querySelector<HTMLButtonElement>('[data-read-toggle]')!;
  };

  it('shows the toggle and reflects the stored state', () => {
    setRead('ivan-franko', true);
    const button = profile();
    expect(button.hidden).toBe(false);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.textContent).toBe('Read');
  });

  it('marks and unmarks on click', () => {
    const button = profile();
    expect(button.textContent).toBe('Mark as read');
    button.click();
    expect(getRead().has('ivan-franko')).toBe(true);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    button.click();
    expect(getRead().has('ivan-franko')).toBe(false);
    expect(button.textContent).toBe('Mark as read');
  });
});

describe('read next', () => {
  // Mirrors PersonView: related cards first, then hidden same-group backups.
  const page = (related: string[], backups: string[], sectionHidden = related.length === 0) => {
    const card = (slug: string, fallback = false) =>
      `<li class="person-item" data-slug="${slug}"${fallback ? ' data-fallback hidden' : ''}>${slug}</li>`;
    document.body.innerHTML = `
      <section data-read-next${sectionHidden ? ' hidden' : ''}><ul>
        ${related.map((s) => card(s)).join('')}${backups.map((s) => card(s, true)).join('')}
      </ul></section>`;
    updateReadNext();
  };
  const shown = () =>
    [...document.querySelectorAll<HTMLElement>('[data-read-next] .person-item')].filter((i) => !i.hidden).map((i) => i.dataset.slug);
  const section = () => document.querySelector<HTMLElement>('[data-read-next]')!;

  it('shows related people when none are read, and keeps backups hidden', () => {
    page(['a', 'b'], ['x', 'y']);
    expect(shown()).toEqual(['a', 'b']);
    expect(section().hidden).toBe(false);
  });

  it('leaves out related people already read', () => {
    setRead('a', true);
    page(['a', 'b'], ['x']);
    expect(shown()).toEqual(['b']);
  });

  it('suggests unread people from the same group once every related person is read', () => {
    setRead('a', true);
    setRead('b', true);
    setRead('x', true);
    page(['a', 'b'], ['x', 'y', 'z']);
    expect(shown()).toEqual(['y', 'z']);
    expect(section().hidden).toBe(false);
  });

  it('limits backup suggestions', () => {
    const backups = Array.from({ length: FALLBACK_LIMIT + 3 }, (_, i) => `p${i}`);
    page([], backups);
    expect(shown()).toHaveLength(FALLBACK_LIMIT);
    expect(section().hidden).toBe(false); // hidden without JS when there are no related people
  });

  it('hides the section when everyone is read', () => {
    for (const s of ['a', 'x']) setRead(s, true);
    page(['a'], ['x']);
    expect(shown()).toEqual([]);
    expect(section().hidden).toBe(true);
  });

  it('updates when marks change', () => {
    page(['a'], ['x']);
    expect(shown()).toEqual(['a']);
    setRead('a', true);
    updateReadNext();
    expect(shown()).toEqual(['x']);
  });
});
