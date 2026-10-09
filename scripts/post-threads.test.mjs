import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { slugFrom, readFields, years, postText } from './post-threads.mjs';

const dir = 'src/content/people/uk';
const profiles = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.slice(0, -3), fields: readFields(readFileSync(`${dir}/${f}`, 'utf8')) }));

describe('slugFrom', () => {
  it('accepts a profile link in either language, a path or a bare slug', () => {
    for (const input of [
      'https://namesofukraine.com/uk/people/ivan-franko/',
      'https://namesofukraine.com/en/people/ivan-franko',
      '/uk/people/ivan-franko/',
      ' ivan-franko ',
    ])
      expect(slugFrom(input)).toBe('ivan-franko');
  });

  it('rejects anything else', () => {
    for (const input of ['https://namesofukraine.com/uk/', 'https://namesofukraine.com/uk/people/', '../etc/passwd', 'Іван Франко'])
      expect(() => slugFrom(input)).toThrow();
  });
});

describe('years', () => {
  it('formats exact, circa and living dates', () => {
    expect(years({ born: '1871-01-15', died: '1942-01-25' })).toBe('1871–1942');
    expect(years({ born: '1610-01-01', born_circa: 'true', died: '1680-08-01' })).toBe('бл. 1610–1680');
    expect(years({ born: '1930-02-27', living: 'true' })).toBe('нар. 1930');
  });
});

describe('postText', () => {
  it('reads every profile, unquoting values', () => {
    for (const { slug, fields } of profiles) {
      for (const key of ['name', 'role', 'summary', 'born']) expect(fields[key], `${slug}: ${key}`).toBeTruthy();
      expect(fields.summary, slug).not.toMatch(/^"|"$/);
    }
  });

  it('fits the Threads limit for every profile', () => {
    for (const { slug, fields } of profiles) expect(() => postText(fields, `https://namesofukraine.com/uk/people/${slug}/`), slug).not.toThrow();
  });

  it('puts name and years, role, summary and link in that order', () => {
    const fields = { name: 'Агатангел Кримський', born: '1871-01-15', died: '1942-01-25', role: 'Сходознавець', summary: 'Знав понад 50 мов.' };
    expect(postText(fields, 'https://namesofukraine.com/uk/people/ahatanhel-krymskyi/')).toBe(
      'Агатангел Кримський (1871–1942)\nСходознавець\n\nЗнав понад 50 мов.\n\nhttps://namesofukraine.com/uk/people/ahatanhel-krymskyi/',
    );
  });
});
