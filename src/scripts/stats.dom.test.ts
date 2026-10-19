// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { initStats } from './stats';
import { STORAGE_KEY } from './read-marks';

// Mirrors the parts of src/views/StatsView.astro the script works with.
const page = `
  <div data-stats>
    <nav class="stats-tabs"><a href="#you" data-you-tab hidden>You</a></nav>
    <div class="stats-seg" data-switch="fields" hidden>
      <button type="button" data-value="all" aria-pressed="true">All</button>
      <button type="button" data-value="women" aria-pressed="false">Women</button>
    </div>
    <ul id="fields" data-mode="all"><li><span data-when="all">5</span><span data-when="women" hidden>2</span></li></ul>
    <section data-you hidden>
      <b data-you-count>0</b>
      <span data-you-pct>0%</span>
      <svg><circle class="stats-ring-fill" /></svg>
      <ul data-you-fields data-template-unread="Not opened yet: {list}.">
        <li data-slugs="a b" data-label="Literature"><span class="stats-bar-val"></span></li>
        <li data-slugs="c" data-label="Sport"><span class="stats-bar-val"></span></li>
      </ul>
      <p data-you-note data-none="Nothing read yet."></p>
    </section>
  </div>
  <div data-stats-tip hidden></div>`;

const store = (read: string[] | null): Storage => {
  const data = new Map(read ? [[STORAGE_KEY, JSON.stringify(read)]] : []);
  return { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => data.set(k, v) } as unknown as Storage;
};

describe('initStats', () => {
  beforeEach(() => {
    document.documentElement.lang = 'en';
    document.body.innerHTML = page;
  });

  it('shows the switches and swaps what each setting shows', () => {
    initStats(document, store(null));
    const group = document.querySelector<HTMLElement>('[data-switch]')!;
    expect(group.hidden).toBe(false);
    document.querySelector<HTMLButtonElement>('[data-value="women"]')!.click();
    expect(document.getElementById('fields')!.dataset.mode).toBe('women');
    expect(document.querySelector<HTMLElement>('[data-when="women"]')!.hidden).toBe(false);
    expect(document.querySelector<HTMLElement>('[data-when="all"]')!.hidden).toBe(true);
    expect(document.querySelector('[data-value="women"]')!.getAttribute('aria-pressed')).toBe('true');
  });

  it("counts the visitor's read profiles by field and names the fields not opened yet", () => {
    initStats(document, store(['a', 'zzz']));
    const section = document.querySelector<HTMLElement>('[data-you]')!;
    expect(section.hidden).toBe(false);
    expect(document.querySelector('[data-you-tab]')!.hasAttribute('hidden')).toBe(false);
    expect(section.querySelector('[data-you-count]')!.textContent).toBe('1');
    expect(section.querySelector('[data-you-pct]')!.textContent).toBe('33%');
    expect([...section.querySelectorAll('.stats-bar-val')].map((v) => v.textContent)).toEqual(['1/2 (50%)', '0/1 (0%)']);
    expect(section.querySelector('[data-you-note]')!.textContent).toBe('Not opened yet: Sport.');
  });

  it('says so when nothing is read yet', () => {
    initStats(document, store([]));
    expect(document.querySelector('[data-you-note]')!.textContent).toBe('Nothing read yet.');
  });
});
