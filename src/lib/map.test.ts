import { describe, expect, it } from 'vitest';
import { regions, ringPath, svgPath, project, WIDTH, HEIGHT } from './map';

describe('region outlines', () => {
  it('writes relative steps that land on every point, rounded to 0.1 unit', () => {
    const ring: [number, number][] = [[24.03, 49.84], [30.52, 50.45], [30.52, 50.45], [36.23, 49.99], [24.03, 49.84]];
    const [, first, rest] = ringPath(ring).match(/^M([^l]+)l(.*)Z$/)!;
    let [x, y] = first.split(',').map(Number);
    const landed = [[x, y]];
    for (const step of rest.split(' ')) {
      const [dx, dy] = step.split(',').map(Number);
      [x, y] = [x + dx, y + dy];
      landed.push([x, y]);
    }
    const expected = ring.filter((p, i) => i === 0 || p.join() !== ring[i - 1].join()).map(([lon, lat]) => project(lon, lat));
    expect(landed).toHaveLength(expected.length); // the repeated point is dropped
    landed.forEach(([lx, ly], i) => {
      expect(Math.abs(lx - expected[i][0])).toBeLessThanOrEqual(0.05 + 1e-9);
      expect(Math.abs(ly - expected[i][1])).toBeLessThanOrEqual(0.05 + 1e-9);
    });
  });

  it('leaves out a ring that rounds to fewer than 3 points', () => {
    expect(svgPath([[1.01, 1.01], [1.02, 1.02], [1.01, 1.03]], 1)).toBe('');
  });

  it('draws every region', () => {
    for (const r of regions) expect(r.d, r.id).toMatch(/^(M[^MZ]+Z)+$/);
  });
});

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
