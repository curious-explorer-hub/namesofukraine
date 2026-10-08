import { describe, expect, it } from 'vitest';
import { observe, type InsightData, type InsightPerson } from './insight';

const data: InsightData = {
  groups: {
    literature: { label: 'Література', url: '/uk/?group=literature' },
    science: { label: 'Наука', url: '/uk/?group=science' },
    sport: { label: 'Спорт', url: '/uk/?group=sport' },
  },
  facts: [{ text: 'fact A', href: '/a/', link: 'A' }, { text: 'fact B' }],
  strings: {
    interest: '{field}: {n} of {total}',
    allRead: 'all of {field}',
    varied: '{k} of {all} fields',
    next: 'Next: {name}',
    labelYou: 'You',
    labelFact: 'Fact',
    openField: 'Open {field}',
  },
};
const person = (slug: string, group: string): InsightPerson => ({ slug, group, name: slug.toUpperCase(), url: `/p/${slug}/` });
const people = [
  person('l1', 'literature'), person('l2', 'literature'), person('l3', 'literature'), person('l4', 'literature'),
  person('s1', 'science'), person('s2', 'science'),
  person('p1', 'sport'),
];
const day = new Date(2026, 9, 6);

describe('observe', () => {
  it('shows a catalogue fact until three profiles are read', () => {
    const o = observe(people, new Set(['l1', 'l2']), data, day);
    expect(o.kind).toBe('fact');
    expect(o.label).toBe('Fact');
    expect(['fact A', 'fact B']).toContain(o.text);
  });

  it('picks the same fact all day and moves on the next day', () => {
    const a = observe(people, new Set(), data, day).text;
    expect(observe(people, new Set(), data, new Date(2026, 9, 6, 23, 59)).text).toBe(a);
    expect(observe(people, new Set(), data, new Date(2026, 9, 7)).text).not.toBe(a);
  });

  it('names the field read most and suggests someone unread from it', () => {
    const o = observe(people, new Set(['l1', 'l2', 's1']), data, day);
    expect(o).toMatchObject({ kind: 'interest', text: 'Література: 2 of 3', group: 'literature' });
    expect(['/p/l3/', '/p/l4/']).toContain(o.href);
    expect(o.link).toMatch(/^Next: L[34]$/);
  });

  it('when that field is read in full, points to the least-read other field', () => {
    const o = observe(people, new Set(['l1', 'l2', 'l3', 'l4', 's1']), data, day);
    expect(o).toMatchObject({ kind: 'all-read', text: 'all of Література', href: '/p/p1/' });
  });

  it('with no clear favourite, counts the fields read and opens one not explored yet', () => {
    const withFaith = { ...data, groups: { ...data.groups, faith: { label: 'Віра', url: '/f/' } } };
    const o = observe([...people, person('f1', 'faith')], new Set(['l1', 's1', 'p1']), withFaith, day);
    // one of three each: no field reaches 40%
    expect(o).toMatchObject({ kind: 'varied', text: '3 of 4 fields', group: 'faith', href: '/f/', link: 'Open Віра' });
  });

  it('with every field explored, gives no link', () => {
    const o = observe(people, new Set(['l1', 's1', 'p1']), data, day);
    expect(o).toMatchObject({ kind: 'varied', text: '3 of 3 fields' });
    expect(o.href).toBeUndefined();
  });
});
