import { describe, expect, it } from 'vitest';
import { contemporaries, yearsInCommon } from './timeline';

const d = (iso: string) => new Date(`${iso}T00:00:00Z`);
const now = d('2026-10-07');
const person = (slug: string, born: string, died?: string, group = 'statehood', tags = ['warrior']) => ({
  slug,
  data: { born: d(born), died: died ? d(died) : undefined, group, tags },
});

describe('yearsInCommon', () => {
  it('is the overlap of two lifetimes', () => {
    expect(yearsInCommon(person('a', '1618-01-01', '1680-08-11').data, person('b', '1639-03-20', '1709-10-02').data)).toBe(41);
  });

  it('is zero when the lives do not meet', () => {
    expect(yearsInCommon(person('a', '1618-01-01', '1680-08-11').data, person('b', '1690-01-01', '1803-11-12').data)).toBe(0);
  });

  it('counts the living up to now', () => {
    expect(yearsInCommon(person('a', '1990-01-01').data, person('b', '2000-01-01').data, now)).toBe(26);
  });
});

describe('contemporaries', () => {
  const sirko = person('sirko', '1618-01-01', '1680-08-11');
  const people = [
    sirko,
    person('mazepa', '1639-03-20', '1709-10-02'),
    person('khmelnytskyi', '1595-12-27', '1657-08-06'),
    person('kalnyshevskyi', '1690-01-01', '1803-11-12'),
    person('bohun', '1618-01-01', '1664-02-17'),
  ];

  it('lists overlapping lives, longest overlap first, without the person or excluded slugs', () => {
    expect(contemporaries(sirko, people, ['bohun'], 6, now).map((c) => [c.person.slug, c.years])).toEqual([
      ['mazepa', 41],
      ['khmelnytskyi', 39],
    ]);
  });

  it('keeps at most `limit`', () => {
    expect(contemporaries(sirko, people, [], 1, now)).toHaveLength(1);
  });

  it('puts people from the same field first, then fills up with others', () => {
    const skovoroda = person('skovoroda', '1722-12-03', '1794-11-09', 'literature', ['philosopher', 'poet']);
    const crowd = [
      person('rozumovskyi', '1728-03-18', '1803-01-09'),
      person('kalnyshevskyi', '1690-01-01', '1803-11-12'),
      person('kotliarevskyi', '1769-09-09', '1838-11-10', 'literature', ['writer']),
      person('borovykovskyi', '1757-07-24', '1825-04-06', 'visual-arts', ['artist', 'poet']),
    ];
    expect(contemporaries(skovoroda, crowd, [], 3, now).map((c) => c.person.slug)).toEqual(['borovykovskyi', 'kotliarevskyi', 'kalnyshevskyi']);
  });
});
