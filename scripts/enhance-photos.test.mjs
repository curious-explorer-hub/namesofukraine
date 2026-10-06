import { describe, expect, it } from 'vitest';
import { classifyLicense, readImage, sidecar } from './enhance-photos.mjs';

describe('classifyLicense', () => {
  it.each([
    ['Public domain', false, false, false],
    ['PD-UA-exempt', false, false, false],
    ['CC0', false, false, false],
    ['CC BY 4.0', true, false, false],
    ['CC-BY-2.0', true, false, false],
    ['CC BY-SA 4.0 (кадровано)', true, true, false],
    ['CC-BY-SA-3.0', true, true, false],
    ['GFDL 1.2', true, true, false],
    ['fair-use', false, false, true],
    ['unknown', false, false, true],
    ['Усі права захищено', false, false, true],
    ['', false, false, true],
  ])('%s', (license, attribution, shareAlike, review) => {
    expect(classifyLicense(license)).toEqual({ attribution, shareAlike, review });
  });
});

describe('readImage', () => {
  it('reads the image block of a profile', () => {
    const md = '---\nname: X\nimage:\n  src: ./images/x.jpg\n  author: "A. B."\n  license: "CC BY 4.0"\n  source_url: "https://commons.wikimedia.org/wiki/File:X.jpg"\nkey_accomplishments:\n  - a\n---\n';
    expect(readImage(md)).toEqual({
      src: './images/x.jpg',
      author: 'A. B.',
      license: 'CC BY 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:X.jpg',
    });
  });

  it('returns null without a portrait', () => {
    expect(readImage('---\nname: X\nrole: Y\n---\n')).toBeNull();
  });
});

describe('sidecar', () => {
  it('notes share-alike for CC BY-SA derivatives', () => {
    const s = sidecar({ author: 'A', license: 'CC BY-SA 4.0', source_url: 'https://commons.wikimedia.org/x' }, 'x.jpg', '2026-10-05');
    expect(s.attribution_required).toBe(true);
    expect(s.share_alike).toBe(true);
    expect(s.attribution_text).toBe('A, CC BY-SA 4.0, via Wikimedia Commons; enhanced with AI (Gemini), shared under the same license');
    expect(s.manual_review_needed).toBe(false);
  });
});
