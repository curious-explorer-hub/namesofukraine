import { describe, expect, it } from 'vitest';
import { regions, WIDTH, HEIGHT } from './map';

describe('region bounding boxes (zoom target, src/scripts/birth-map.ts)', () => {
  it('gives every region a box inside the full map, padded past its own shape', () => {
    for (const r of regions) {
      const [x, y, w, h] = r.bbox;
      expect(w, r.id).toBeGreaterThan(0);
      expect(h, r.id).toBeGreaterThan(0);
      expect(x, r.id).toBeGreaterThanOrEqual(-w);
      expect(y, r.id).toBeGreaterThanOrEqual(-h);
      expect(x + w, r.id).toBeLessThanOrEqual(WIDTH + w);
      expect(y + h, r.id).toBeLessThanOrEqual(HEIGHT + h);
    }
  });

  it('gives a smaller region (Kyiv city) a tighter box than a larger oblast', () => {
    const kyivCity = regions.find((r) => r.id === 'kyiv-city')!;
    const kyivOblast = regions.find((r) => r.id === 'kyiv')!;
    expect(kyivCity.bbox[2] * kyivCity.bbox[3]).toBeLessThan(kyivOblast.bbox[2] * kyivOblast.bbox[3]);
  });

  it('floors a tiny enclave (Kyiv city, Sevastopol) to a minimum share of the full map', () => {
    for (const id of ['kyiv-city', 'sevastopol']) {
      const [, , w, h] = regions.find((r) => r.id === id)!.bbox;
      expect(w, id).toBeGreaterThanOrEqual(WIDTH * 0.15);
      expect(h, id).toBeGreaterThanOrEqual(HEIGHT * 0.15);
    }
  });
});
