import { describe, expect, it } from 'vitest';
import { parseFeedback } from './feedback';

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
};
const valid = { lang: 'uk', type: 'correction', profile: 'les-kurbas', message: '  Дата народження неправильна  ' };

describe('parseFeedback', () => {
  it('keeps a valid message, trimmed, with empty answers as null', () => {
    expect(parseFeedback(form({ ...valid, about: '', email: '' }))).toEqual({
      lang: 'uk',
      type: 'correction',
      profile: 'les-kurbas',
      about: null,
      message: 'Дата народження неправильна',
      sources: null,
      email: null,
    });
  });

  it('accepts the "join the team" kind and a message without a profile', () => {
    expect(parseFeedback(form({ lang: 'en', type: 'volunteer', message: 'I can translate' }))?.type).toBe('volunteer');
  });

  it('drops who-it-is-about and sources for messages that are not about the catalogue', () => {
    const parsed = parseFeedback(form({ lang: 'en', type: 'other', about: 'Les Kurbas', sources: 'https://example.com', message: 'Hi' }));
    expect(parsed?.about).toBeNull();
    expect(parsed?.sources).toBeNull();
    expect(parseFeedback(form({ ...valid, about: 'Les Kurbas' }))?.about).toBe('Les Kurbas');
  });

  it('rejects a missing message, an unknown kind or language, and a profile that is not a slug', () => {
    expect(parseFeedback(form({ ...valid, message: '   ' }))).toBeNull();
    expect(parseFeedback(form({ ...valid, type: 'spam' }))).toBeNull();
    expect(parseFeedback(form({ ...valid, lang: 'ru' }))).toBeNull();
    expect(parseFeedback(form({ ...valid, profile: '<script>' }))).toBeNull();
  });

  it('rejects answers over the limits and an email that is not one', () => {
    expect(parseFeedback(form({ ...valid, message: 'x'.repeat(5001) }))).toBeNull();
    expect(parseFeedback(form({ ...valid, about: 'x'.repeat(201) }))).toBeNull();
    expect(parseFeedback(form({ ...valid, email: 'not an email' }))).toBeNull();
    expect(parseFeedback(form({ ...valid, email: 'name@example.com' }))?.email).toBe('name@example.com');
  });
});
