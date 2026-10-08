import { describe, expect, it } from 'vitest';
import { shortDescription } from './meta';

describe('shortDescription (meta description for search results)', () => {
  it('keeps text that already fits', () => {
    expect(shortDescription('Коротко і головне.')).toBe('Коротко і головне.');
  });

  it('keeps the whole sentences that fit', () => {
    const first = 'Як дівчина з Русі, яку продали на невільничому ринку Стамбула, стала законною дружиною султана Сулеймана I?';
    const second = `Друге речення ${'дуже '.repeat(15)}довге, тож разом із першим не вміщується.`;
    expect(shortDescription(`${first} ${second}`)).toBe(first);
  });

  it('cuts at a word instead of keeping only a short hook or a cut after an abbreviation', () => {
    const text = `He wrote Order No. 1 for the new army, ${'and much more '.repeat(12)}.`;
    const out = shortDescription(text);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out.startsWith('He wrote Order No. 1 for the new army')).toBe(true);
    expect(out.endsWith('…')).toBe(true);
  });

  it('cuts one long sentence at a word, with an ellipsis', () => {
    const out = shortDescription('слово, '.repeat(40), 50);
    expect(out.length).toBeLessThanOrEqual(50);
    expect(out).toMatch(/слово…$/);
  });
});
