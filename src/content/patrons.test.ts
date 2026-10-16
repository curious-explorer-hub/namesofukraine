import { describe, expect, it } from 'vitest';
import tiers from './patrons.json';

describe('patrons', () => {
  it('each tier has a unique id, a price and text in both languages', () => {
    expect(new Set(tiers.map((tier) => tier.id)).size).toBe(tiers.length);
    for (const tier of tiers) {
      expect(tier.price, tier.id).toBeGreaterThan(0);
      for (const lang of ['uk', 'en'] as const) {
        expect(tier.name[lang], tier.id).toBeTruthy();
        expect(tier.description[lang], tier.id).toBeTruthy();
      }
    }
  });

  // Only the name a patron agreed to show; never an email or a link.
  it('lists names only, each once', () => {
    const names = tiers.flatMap((tier) => tier.patrons as string[]);
    expect(new Set(names).size).toBe(names.length);
    for (const name of names) expect(name.trim()).not.toMatch(/^$|@|https?:|www\./);
  });
});
