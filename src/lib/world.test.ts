import { describe, expect, it } from 'vitest';
import { continentOf, frame } from './world';

describe('continent cards', () => {
  it('puts each birthplace on the card of its part of the world', () => {
    expect(continentOf(30.32, 59.95)).toBe('europe'); // Saint Petersburg
    expect(continentOf(44.79, 41.72)).toBe('europe'); // Tbilisi: the Caucasus goes with Europe
    expect(continentOf(-73.83, 40.71)).toBe('north-america'); // New York
    expect(continentOf(-58.4, -34.6)).toBe('south-america'); // Buenos Aires
    expect(continentOf(151.2, -33.9)).toBe('oceania'); // Sydney
  });

  it('fails the build for a birthplace no card frames, instead of dropping the dot', () => {
    expect(() => continentOf(-20, 75)).toThrow(/no continent card/);
  });

  it('draws Ukraine (the site\'s own oblast outlines) only where it is in the frame', () => {
    const europe = frame('europe');
    expect(europe.ukraine).not.toBe('');
    expect(europe.land.length).toBeGreaterThan(100);
    expect(frame('north-america').ukraine).toBe('');
  });
});
