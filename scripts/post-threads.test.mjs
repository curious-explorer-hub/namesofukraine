import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { readFields } from './social.mjs';
import { postTexts } from './post-threads.mjs';

const dir = 'src/content/people/uk';
const profiles = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const markdown = readFileSync(`${dir}/${f}`, 'utf8');
    return { slug: f.slice(0, -3), fields: readFields(markdown), markdown };
  });

describe('postTexts', () => {
  it('fits the Threads limit in every post and reply, for every profile', () => {
    for (const { slug, fields, markdown } of profiles) expect(() => postTexts(fields, `https://namesofukraine.com/uk/people/${slug}/`, markdown), slug).not.toThrow();
  });

  it('puts name and years, role, summary, the closing section and the link in one post when they fit', () => {
    const fields = { name: 'Агатангел Кримський', born: '1871-01-15', died: '1942-01-25', role: 'Сходознавець', summary: 'Знав понад 50 мов.' };
    const markdown = '---\nname: x\n---\n\n## Поліглот\n\nТекст.\n\n## Чому це важливо сьогодні\n\nВін [заснував](/uk/x/) сходознавство.\n\n## Дискусії та оцінки\n\nСпір.\n';
    expect(postTexts(fields, 'https://namesofukraine.com/uk/people/ahatanhel-krymskyi/', markdown)).toEqual([
      'Агатангел Кримський (1871–1942)\nСходознавець\n\nЗнав понад 50 мов.\n\nЧому це важливо сьогодні\n\nВін заснував сходознавство.\n\nhttps://namesofukraine.com/uk/people/ahatanhel-krymskyi/',
    ]);
  });

  it('moves the closing section into replies when it does not fit, with the link at the end', () => {
    const fields = { name: 'А', born: '1900-01-01', role: 'Р', summary: 'С'.repeat(250) };
    const markdown = `## Чому це важливо сьогодні\n\n${'Речення про важливе. '.repeat(30)}`;
    const texts = postTexts(fields, 'https://namesofukraine.com/uk/people/a/', markdown);
    expect(texts.length).toBeGreaterThan(2);
    expect(texts[0]).not.toContain('https://');
    expect(texts.at(-1).endsWith('https://namesofukraine.com/uk/people/a/')).toBe(true);
    for (const t of texts) expect([...t].length).toBeLessThanOrEqual(500);
  });
});
