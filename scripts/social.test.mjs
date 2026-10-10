import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { slugFrom, readFields, years, parsePlan, kyivDate } from './social.mjs';

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
    expect(years({ born: '0958-01-01', born_circa: 'true', died: '1015-07-15' })).toBe('бл. 958–1015');
  });
});

describe('readFields', () => {
  it('reads every profile, unquoting values', () => {
    for (const { slug, fields } of profiles) {
      for (const key of ['name', 'role', 'summary', 'born']) expect(fields[key], `${slug}: ${key}`).toBeTruthy();
      expect(fields.summary, slug).not.toMatch(/^"|"$/);
    }
  });
});

describe('parsePlan', () => {
  it('reads one entry per day: links, slugs, - for no post, trailing comments', () => {
    const plan = 'https://namesofukraine.com/uk/people/ivan-franko/\n-\nlesya-ukrainka  # birthday\n';
    expect(parsePlan(plan)).toEqual(['ivan-franko', null, 'lesya-ukrainka']);
  });

  it('rejects empty lines and anything that is not a profile', () => {
    expect(() => parsePlan('ivan-franko\n\nlesya-ukrainka')).toThrow(/Line 2/);
    expect(() => parsePlan('Іван Франко')).toThrow();
  });
});

describe('kyivDate', () => {
  it('uses the date in Kyiv, not UTC, in summer (UTC+3) and winter (UTC+2)', () => {
    expect(kyivDate(new Date('2026-09-30T21:30:00Z'))).toBe('2026-10-01');
    expect(kyivDate(new Date('2026-12-31T21:59:00Z'))).toBe('2026-12-31');
    expect(kyivDate(new Date('2026-12-31T22:30:00Z'))).toBe('2027-01-01');
  });
});

describe('plans in social/', () => {
  const plans = existsSync('social') ? readdirSync('social').filter((f) => f.endsWith('.txt')) : [];

  it('are named YYYY-MM.txt, fit their month and list existing profiles', () => {
    const slugs = new Set(profiles.map((p) => p.slug));
    for (const file of plans) {
      const [, year, month] = file.match(/^(\d{4})-(\d{2})\.txt$/) ?? [];
      expect(year, file).toBeTruthy();
      const entries = parsePlan(readFileSync(`social/${file}`, 'utf8'));
      expect(entries.length, file).toBeLessThanOrEqual(new Date(Number(year), Number(month), 0).getDate());
      for (const slug of entries) if (slug) expect(slugs.has(slug), `${file}: ${slug}`).toBe(true);
    }
  });
});
