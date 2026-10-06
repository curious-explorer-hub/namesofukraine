import { describe, expect, it } from 'vitest';
import { suggestEmbedUrl } from './suggest';

describe('suggestEmbedUrl', () => {
  it('turns a Tally share link into an embed link with hidden fields', () => {
    const url = new URL(suggestEmbedUrl('https://tally.so/r/abc123', { lang: 'uk', type: 'correction', profile: 'les-kurbas' }));
    expect(url.origin + url.pathname).toBe('https://tally.so/embed/abc123');
    expect(url.searchParams.get('lang')).toBe('uk');
    expect(url.searchParams.get('type')).toBe('correction');
    expect(url.searchParams.get('profile')).toBe('les-kurbas');
  });

  it('passes the "join the team" kind through', () => {
    const url = new URL(suggestEmbedUrl('https://tally.so/r/abc123', { lang: 'uk', type: 'volunteer' }));
    expect(url.searchParams.get('type')).toBe('volunteer');
  });

  it('drops unknown kinds and anything that is not a slug', () => {
    const url = new URL(suggestEmbedUrl('https://tally.so/r/abc123', { lang: 'en', type: 'spam', profile: '<script>' }));
    expect(url.searchParams.has('type')).toBe(false);
    expect(url.searchParams.has('profile')).toBe(false);
  });
});
