import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { readFields } from './social.mjs';
import { caption, storyParagraphs } from './post-instagram.mjs';

const dir = 'src/content/people/uk';
const profiles = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const markdown = readFileSync(`${dir}/${f}`, 'utf8');
    return { slug: f.slice(0, -3), fields: readFields(markdown), markdown };
  });

describe('caption', () => {
  it('fits the Instagram limit for every profile', () => {
    for (const { slug, fields, markdown } of profiles) expect(() => caption(fields, `https://namesofukraine.com/uk/people/${slug}/`, markdown), slug).not.toThrow();
  });

  it('tells the story in whole paragraphs, then the address as plain text and the tags', () => {
    const fields = { name: 'Агатангел Кримський', born: '1871-01-15', died: '1942-01-25', role: 'Сходознавець', summary: 'Знав понад 50 мов.' };
    const markdown = '---\nname: x\n---\n\n## Поліглот\n\nВін знав [понад 50 мов](https://example.org).\n\nІ **викладав** арабську.\n';
    expect(caption(fields, 'https://namesofukraine.com/uk/people/ahatanhel-krymskyi/', markdown)).toBe(
      'Агатангел Кримський (1871–1942)\nСходознавець\n\nВін знав понад 50 мов.\n\nІ викладав арабську.\n\nПовна історія, фото й джерела — за посиланням у профілі:\nnamesofukraine.com/uk/people/ahatanhel-krymskyi/\n\n#знайсвоїх #історіяукраїни #українці #namesofukraine',
    );
  });

  it('falls back to the summary when there is no story text', () => {
    const fields = { name: 'А', born: '1900-01-01', role: 'Р', summary: 'Коротко.' };
    expect(caption(fields, 'https://namesofukraine.com/uk/people/a/')).toContain('\n\nКоротко.\n\n');
  });
});

describe('storyParagraphs', () => {
  it('drops headings and keeps paragraphs as plain text', () => {
    expect(storyParagraphs('---\na: b\n---\n## Заголовок\n\nРядок один,\nрядок два.\n\n[Лінк](/x/) тут.')).toEqual(['Рядок один, рядок два.', 'Лінк тут.']);
  });
});
