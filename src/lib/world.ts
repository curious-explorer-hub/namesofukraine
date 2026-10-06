// Continent cards under the birthplace map (src/components/BirthMap.astro): where the people born outside
// Ukraine come from. Drawn at build time; nothing here runs in the browser.
//
// Land: Natural Earth 1:110m land (public domain), coastlines only, so there are no country borders to
// get wrong. Ukraine, for orientation, is drawn from the site's own oblast outlines (geoBoundaries,
// including Crimea and Sevastopol), not from Natural Earth, whose default edition puts Crimea in Russia.

import land from '../content/geo/world-land.json';
import oblasts from '../content/geo/ukraine-oblasts.json';

type Point = [number, number];

// Each card frames one part of the world (degrees). A birthplace goes to the first frame that holds it,
// so Europe takes the Caucasus and the Middle East edge before Asia does.
export const CONTINENTS = [
  { id: 'europe', west: 2, east: 48, south: 38, north: 62 },
  { id: 'north-america', west: -128, east: -60, south: 14, north: 56 },
  { id: 'south-america', west: -85, east: -33, south: -56, north: 13 },
  { id: 'africa', west: -19, east: 52, south: -36, north: 34 },
  { id: 'asia', west: 50, east: 150, south: -10, north: 62 },
  { id: 'oceania', west: 110, east: 180, south: -48, north: -10 },
] as const;
export type ContinentId = (typeof CONTINENTS)[number]['id'];

const WIDTH = 300; // SVG units across every card; the height follows the frame's shape

export function continentOf(lon: number, lat: number): ContinentId {
  const c = CONTINENTS.find((f) => lon >= f.west && lon <= f.east && lat >= f.south && lat <= f.north);
  if (!c) throw new Error(`Map: no continent card frames ${lat}, ${lon}; add or widen one in src/lib/world.ts`);
  return c.id;
}

export interface ContinentFrame {
  id: ContinentId;
  width: number;
  height: number;
  project: (lon: number, lat: number) => Point;
  land: string;
  ukraine: string;
}

// Cuts a ring to a box (Sutherland–Hodgman), so a card carries only the coast it shows.
function clip(ring: Point[], b: { west: number; east: number; south: number; north: number }): Point[] {
  const edges: [(p: Point) => boolean, (p: Point, q: Point) => Point][] = [
    [(p) => p[0] >= b.west, (p, q) => [b.west, p[1] + ((q[1] - p[1]) * (b.west - p[0])) / (q[0] - p[0])]],
    [(p) => p[0] <= b.east, (p, q) => [b.east, p[1] + ((q[1] - p[1]) * (b.east - p[0])) / (q[0] - p[0])]],
    [(p) => p[1] >= b.south, (p, q) => [p[0] + ((q[0] - p[0]) * (b.south - p[1])) / (q[1] - p[1]), b.south]],
    [(p) => p[1] <= b.north, (p, q) => [p[0] + ((q[0] - p[0]) * (b.north - p[1])) / (q[1] - p[1]), b.north]],
  ];
  let out = ring;
  for (const [inside, cross] of edges) {
    const input = out;
    out = [];
    input.forEach((p, i) => {
      const q = input[(i + 1) % input.length];
      if (inside(p)) out.push(p);
      if (inside(p) !== inside(q)) out.push(cross(p, q));
    });
    if (!out.length) break;
  }
  return out;
}

// Equirectangular, with longitudes shrunk by the cosine of the frame's middle latitude.
export function frame(id: ContinentId): ContinentFrame {
  const f = CONTINENTS.find((c) => c.id === id)!;
  const cos = Math.cos((((f.north + f.south) / 2) * Math.PI) / 180);
  const k = WIDTH / ((f.east - f.west) * cos);
  const project = (lon: number, lat: number): Point => [(lon - f.west) * cos * k, (f.north - lat) * k];
  // Whole SVG units are enough at this size (a card is 300 units across).
  const path = (ring: Point[]) => 'M' + ring.map(([lon, lat]) => project(lon, lat).map(Math.round).join(',')).join('L') + 'Z';
  const box = { west: f.west - 1, east: f.east + 1, south: f.south - 1, north: f.north + 1 };
  const touches = (ring: Point[]) => ring.some(([lon, lat]) => lon >= box.west && lon <= box.east && lat >= box.south && lat <= box.north);

  const ukraineRings = (oblasts as { features: { geometry: { type: string; coordinates: unknown } }[] }).features.flatMap((o) =>
    ((o.geometry.type === 'MultiPolygon' ? o.geometry.coordinates : [o.geometry.coordinates]) as Point[][][]).map((poly) => poly[0]),
  );
  return {
    id,
    width: WIDTH,
    height: Math.round((f.north - f.south) * k),
    project,
    // Coast cut to the frame (plus a degree of margin); the viewBox crops the rest.
    land: (land.polygons as Point[][]).map((ring) => clip(ring, box)).filter((ring) => ring.length > 2).map(path).join(''),
    ukraine: ukraineRings.some(touches) ? ukraineRings.map(path).join('') : '',
  };
}
