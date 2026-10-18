import { describe, expect, it, vi } from 'vitest';

vi.mock('./people', () => ({
  CATALOGUE_DATE: new Date('2026-10-07T06:23:13Z'),
  groups: [{ id: 'literature' }, { id: 'science' }, { id: 'sport' }],
}));

const { byCentury, byField, byRegion, earliestBorn, genderSplit, growth, longestLife, mostConnected, shade } = await import('./stats');

const person = (slug: string, over: Partial<Record<string, unknown>> = {}) => ({
  slug,
  data: {
    name: slug,
    gender: 'male' as const,
    group: 'literature',
    born: new Date('1900-05-10'),
    born_circa: false,
    died: new Date('1970-05-09'),
    died_circa: false,
    birthplace: { region: 'kyiv' },
    related: [] as string[],
    ...over,
  },
});

describe('stats', () => {
  it('splits by gender and by field, every field included, most people first', () => {
    const people = [person('a'), person('b', { gender: 'female' }), person('c', { group: 'science' })];
    expect(genderSplit(people)).toEqual({ total: 3, women: 1, men: 2 });
    expect(byField(people)).toEqual([
      { id: 'literature', all: 2, women: 1, men: 1 },
      { id: 'science', all: 1, women: 0, men: 1 },
      { id: 'sport', all: 0, women: 0, men: 0 },
    ]);
  });

  it('counts birthplaces and keeps empty centuries between the first and the last', () => {
    const people = [person('a', { born: new Date('0910-01-01') }), person('b', { born: new Date('1201-01-01'), birthplace: { region: 'lviv' } })];
    expect(Object.fromEntries(byRegion(people))).toEqual({ kyiv: 1, lviv: 1 });
    expect(byCentury(people).map((c) => [c.century, c.n])).toEqual([[10, 1], [11, 0], [12, 0], [13, 1]]);
  });

  it('grows day by day from the launch, counting the initial catalogue on launch day', () => {
    const people = [person('a', { published: new Date('2026-10-07T06:23:13Z') }), person('b', { published: new Date('2026-10-09T10:00:00Z') })];
    expect(growth(people, new Date('2026-10-10T12:00:00Z'))).toEqual([
      { date: '2026-10-07', added: 1, total: 1 },
      { date: '2026-10-08', added: 0, total: 1 },
      { date: '2026-10-09', added: 1, total: 2 },
      { date: '2026-10-10', added: 0, total: 2 },
    ]);
  });

  it('counts each tie once, whichever profile names it, and ignores people not on the site', () => {
    const people = [person('a', { related: ['b', 'c', 'gone'] }), person('b', { related: ['a'] }), person('c')];
    expect(mostConnected(people, 2).map((x) => [x.person.slug, x.links])).toEqual([['a', 2], ['b', 1]]);
  });

  it('finds the longest life only among exact dates, counting full years', () => {
    const people = [person('exact'), person('circa', { born: new Date('1700-01-01'), born_circa: true, died: new Date('1810-01-01') }), person('living', { died: undefined })];
    expect(longestLife(people)).toMatchObject({ person: { slug: 'exact' }, years: 69 });
    expect(earliestBorn(people)?.slug).toBe('circa');
  });

  it('shades a region by its share of the busiest one', () => {
    expect([shade(0, 26), shade(1, 26), shade(13, 26), shade(26, 26)]).toEqual([-1, 0, 2, 4]);
  });
});
