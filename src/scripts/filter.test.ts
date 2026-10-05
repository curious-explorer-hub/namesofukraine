import { describe, expect, it } from 'vitest';
import { matches, normalize } from './filter';

const none = { q: '', group: '', era: '', region: '', unread: '' };

const franko = {
  slug: 'ivan-franko',
  group: 'literature',
  era: '19th-century',
  region: 'lviv',
  search: 'Іван Франко Письменник, учений, мислитель Поет Науковець',
};
const chornovil = {
  slug: 'viacheslav-chornovil',
  group: 'literature',
  era: 'independence',
  region: 'cherkasy',
  search: "В'ячеслав Чорновіл Дисидент і лідер Народного руху",
};

describe('normalize', () => {
  it('lowercases Cyrillic, including і, ї, є and ґ', () => {
    expect(normalize('ІВАН ЇЖАК ЄВГЕН ҐАНОК')).toBe('іван їжак євген ґанок');
  });

  it('treats every apostrophe variant as the same character', () => {
    const expected = "в'ячеслав";
    for (const variant of ["В'ячеслав", 'В’ячеслав', 'Вʼячеслав', 'В`ячеслав', 'В‘ячеслав']) {
      expect(normalize(variant)).toBe(expected);
    }
  });

  it('trims and collapses whitespace', () => {
    expect(normalize('  Іван \n  Франко  ')).toBe('іван франко');
  });
});

describe('matches', () => {
  it('matches everyone when no filter is set', () => {
    expect(matches(franko, none)).toBe(true);
    expect(matches(chornovil, none)).toBe(true);
  });

  it('filters by group, era, and region', () => {
    expect(matches(franko, { ...none, group: 'literature' })).toBe(true);
    expect(matches(franko, { ...none, group: 'science' })).toBe(false);
    expect(matches(franko, { ...none, era: '19th-century' })).toBe(true);
    expect(matches(franko, { ...none, era: 'independence' })).toBe(false);
    expect(matches(franko, { ...none, region: 'lviv' })).toBe(true);
    expect(matches(franko, { ...none, region: 'kyiv' })).toBe(false);
  });

  it('combines filters with AND', () => {
    expect(matches(franko, { ...none, group: 'literature', era: '19th-century' })).toBe(true);
    expect(matches(chornovil, { ...none, group: 'literature', era: '19th-century' })).toBe(false);
  });

  it('searches name, role, and tags as a case-insensitive substring', () => {
    expect(matches(franko, { ...none, q: 'франко' })).toBe(true);
    expect(matches(franko, { ...none, q: 'МИСЛИТЕЛЬ' })).toBe(true);
    expect(matches(franko, { ...none, q: 'науков' })).toBe(true);
    expect(matches(franko, { ...none, q: 'шевченко' })).toBe(false);
  });

  it('finds a name typed with a different apostrophe than the data', () => {
    expect(matches(chornovil, { ...none, q: 'В’ячеслав' })).toBe(true);
    expect(matches(chornovil, { ...none, q: 'вʼячеслав чорновіл' })).toBe(true);
  });

  it('ignores extra spaces in the query', () => {
    expect(matches(franko, { ...none, q: '  іван   франко ' })).toBe(true);
  });

  it('with "unread only", hides people already read', () => {
    const read = new Set(['ivan-franko']);
    expect(matches(franko, { ...none, unread: '1' }, read)).toBe(false);
    expect(matches(chornovil, { ...none, unread: '1' }, read)).toBe(true);
    expect(matches(franko, none, read)).toBe(true); // off by default
  });

  it('does not match an item without search text when a query is set', () => {
    expect(matches({ group: 'literature' }, { ...none, q: 'франко' })).toBe(false);
  });
});
