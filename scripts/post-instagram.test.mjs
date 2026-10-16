import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { readFields } from './social.mjs';
import { caption, hashtags, nameTag, storyParagraphs } from './post-instagram.mjs';

const dir = 'src/content/people/uk';
const profiles = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const markdown = readFileSync(`${dir}/${f}`, 'utf8');
    return { slug: f.slice(0, -3), fields: readFields(markdown), markdown, enName: readFields(readFileSync(`src/content/people/en/${f}`, 'utf8')).name };
  });

describe('caption', () => {
  it('fits the Instagram limit for every profile', () => {
    for (const { slug, fields, markdown, enName } of profiles) expect(() => caption(fields, `https://namesofukraine.com/uk/people/${slug}/`, markdown, enName), slug).not.toThrow();
  });

  it('tells the story in whole paragraphs, then the address as plain text and the tags', () => {
    const fields = { name: 'Агатангел Кримський', born: '1871-01-15', died: '1942-01-25', group: 'science', role: 'Сходознавець', summary: 'Знав понад 50 мов.' };
    const markdown = '---\nname: x\n---\n\n## Поліглот\n\nВін знав [понад 50 мов](https://example.org).\n\nІ **викладав** арабську.\n';
    expect(caption(fields, 'https://namesofukraine.com/uk/people/ahatanhel-krymskyi/', markdown, 'Ahatanhel Krymskyi')).toBe(
      '🇺🇦 Агатангел Кримський (1871–1942) 🇺🇦\n🔬 Сходознавець 🔬\n\nВін знав понад 50 мов.\n\nІ викладав арабську.\n\nПовна історія, фото й джерела — за посиланням у профілі:\nnamesofukraine.com/uk/people/ahatanhel-krymskyi/\n\n#знайсвоїх #історіяукраїни #ukraine #українськанаука #Krymskyi',
    );
  });

  it('falls back to the summary when there is no story text', () => {
    const fields = { name: 'А', born: '1900-01-01', group: 'sport', role: 'Р', summary: 'Коротко.' };
    expect(caption(fields, 'https://namesofukraine.com/uk/people/a/')).toContain('\n\nКоротко.\n\n');
  });
});

describe('hashtags', () => {
  it('uses at most 5 distinct tags for every profile, the Instagram limit', () => {
    for (const { slug, fields, enName } of profiles) {
      const tags = hashtags(fields, enName).split(' ');
      expect(tags.length, slug).toBe(5);
      expect(new Set(tags).size, slug).toBe(5);
      for (const tag of tags) expect(tag, slug).toMatch(/^#[\p{L}\d]+$/u);
    }
  });
});

describe('nameTag', () => {
  it('uses the English surname, without hyphens or a name in brackets', () => {
    expect(nameTag('Taras Shevchenko')).toBe('#Shevchenko');
    expect(nameTag('Borys Antonenko-Davydovych')).toBe('#AntonenkoDavydovych');
    expect(nameTag('Ivan Ohiienko (Metropolitan Ilarion)')).toBe('#Ohiienko');
    expect(nameTag('Roksolana')).toBe('#Roksolana');
  });

  it('uses the whole name when there is no surname', () => {
    expect(nameTag('Yaroslav the Wise')).toBe('#YaroslavTheWise');
    expect(nameTag('Anna of Kyiv')).toBe('#AnnaOfKyiv');
  });
});

describe('storyParagraphs', () => {
  it('drops headings and keeps paragraphs as plain text', () => {
    expect(storyParagraphs('---\na: b\n---\n## Заголовок\n\nРядок один,\nрядок два.\n\n[Лінк](/x/) тут.')).toEqual(['Рядок один, рядок два.', 'Лінк тут.']);
  });
});
