import { describe, expect, it } from 'vitest';
import { pickHero } from './daily-hero';

const people = [
  { slug: 'taras-shevchenko', born: '03-09', died: '03-10' },
  { slug: 'lesya-ukrainka', born: '02-25', died: '08-01' },
  { slug: 'ivan-franko', born: '08-27', died: '05-28' },
  { slug: 'volodymyr-velykyi', born: null, died: '07-15' }, // approximate birth date
];
const day = (m: number, d: number) => new Date(2026, m - 1, d, 12);

describe('pickHero', () => {
  it('features someone born on the visitor’s date', () => {
    expect(pickHero(people, day(3, 9))).toEqual({ entry: people[0], kind: 'born' });
  });

  it('falls back to someone who died on that date', () => {
    expect(pickHero(people, day(3, 10))).toEqual({ entry: people[0], kind: 'died' });
    expect(pickHero(people, day(7, 15))).toEqual({ entry: people[3], kind: 'died' });
  });

  it('prefers a birthday over a death anniversary on the same day', () => {
    const both = [...people, { slug: 'someone-else', born: '08-01', died: null }];
    expect(pickHero(both, day(8, 1))?.kind).toBe('born');
  });

  it('never treats an approximate birth date as a birthday', () => {
    expect(pickHero(people, day(1, 1))?.kind).toBe('featured');
  });

  it('picks a person of the day that is stable within a day and varies across days', () => {
    const a = pickHero(people, new Date(2026, 9, 1, 8));
    const b = pickHero(people, new Date(2026, 9, 1, 22));
    expect(a).toEqual(b);
    expect(a?.kind).toBe('featured');
    const picks = new Set(Array.from({ length: 30 }, (_, i) => pickHero(people, day(10, 1 + i))?.entry.slug));
    expect(picks.size).toBeGreaterThan(1);
  });

  it('does not depend on the order of entries', () => {
    const d = day(10, 5);
    expect(pickHero([...people].reverse(), d)).toEqual(pickHero(people, d));
  });

  it('returns null when there is no one', () => {
    expect(pickHero([], day(1, 1))).toBeNull();
  });
});
