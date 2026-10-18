import { describe, expect, it } from 'vitest';
import { countryShares, daily, profileSlug, profileTotals, ranking, trending } from './readers.mjs';

describe('readers', () => {
  it('adds up both languages of a profile and ignores other pages', () => {
    expect(profileSlug('/en/people/ivan-franko/')).toBe('ivan-franko');
    expect(profileSlug('/uk/new/')).toBeUndefined();
    const totals = profileTotals([
      { path: '/uk/people/ivan-franko/', count: 5 },
      { path: '/en/people/ivan-franko', count: 2 },
      { path: '/uk/', count: 50 },
    ]);
    expect(Object.fromEntries(totals)).toEqual({ 'ivan-franko': 7 });
  });

  it('ranks profiles and says how far each moved, or that it is new', () => {
    const now = new Map([['a', 9], ['b', 8], ['c', 7]]);
    const before = new Map([['b', 9], ['a', 3]]);
    expect(ranking(now, before, 3)).toEqual([
      { slug: 'a', move: 1 },
      { slug: 'b', move: -1 },
      { slug: 'c', move: 'new' },
    ]);
  });

  it('finds the biggest rises among profiles read often enough', () => {
    const now = new Map([['a', 40], ['b', 12], ['c', 5], ['d', 10]]);
    const before = new Map([['a', 10], ['b', 12], ['d', 20]]);
    expect(trending(now, before, 5)).toEqual([{ slug: 'a', rise: 300 }]);
    expect(trending(new Map([['e', 30]]), new Map(), 5)).toEqual([{ slug: 'e', rise: 300 }]);
  });

  it('fills every day and shares countries out of the total', () => {
    expect(daily(['2026-10-01', '2026-10-02'], [{ date: '2026-10-02', visits: 3 }], [])).toEqual([
      { date: '2026-10-01', uk: 0, en: 0 },
      { date: '2026-10-02', uk: 3, en: 0 },
    ]);
    const rows = [{ country: 'UA', visits: 60 }, { country: 'PL', visits: 30 }, { country: 'DE', visits: 10 }];
    expect(countryShares(rows, 2)).toEqual({ count: 3, top: [['UA', 60], ['PL', 30], ['other', 10]] });
    expect(countryShares([])).toEqual({ count: 0, top: [] });
  });
});
