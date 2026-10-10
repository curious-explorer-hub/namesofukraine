import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { readFields } from './social.mjs';
import { postText } from './post-threads.mjs';

const dir = 'src/content/people/uk';
const profiles = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.slice(0, -3), fields: readFields(readFileSync(`${dir}/${f}`, 'utf8')) }));

describe('postText', () => {
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
