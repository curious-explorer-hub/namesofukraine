import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import uk from './uk.json';
import en from './en.json';

const here = dirname(fileURLToPath(import.meta.url));
const profiles = (lang: string) =>
  readdirSync(join(here, '..', 'content', 'people', lang))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3))
    .sort();

describe('interface strings', () => {
  it('English and Ukrainian define exactly the same keys', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(uk).sort());
  });

  it('keep the same {placeholders} in both languages', () => {
    const vars = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort();
    for (const key of Object.keys(uk) as (keyof typeof uk)[]) {
      expect(vars(en[key]), key).toEqual(vars(uk[key]));
    }
  });
});

describe('profile translations', () => {
  it('every Ukrainian profile has an English translation, and vice versa', () => {
    expect(profiles('en')).toEqual(profiles('uk'));
  });

  it('translations contain only translated text, never facts', () => {
    const facts = /^(born|died|era|group|tags|birthplace|sources|image|added):/m;
    for (const slug of profiles('en')) {
      const text = readFileSync(join(here, '..', 'content', 'people', 'en', `${slug}.md`), 'utf8');
      expect(text, slug).not.toMatch(facts);
    }
  });
});
