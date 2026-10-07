// The birthplace map (src/components/BirthMap.astro): oblast outlines and birthplace dots, drawn at
// build time as one SVG. Nothing here runs in the browser.
//
// Outlines: geoBoundaries UKR ADM1 (OpenStreetMap contributors, ODbL 1.0), all 27 units including the
// Autonomous Republic of Crimea and Sevastopol; simplified with mapshaper (6%, shared borders kept).

import geo from '../content/geo/ukraine-oblasts.json';

// Equirectangular projection, with longitudes shrunk by cos(48.5°) so Ukraine keeps its shape.
const WEST = 22.05;
const EAST = 40.3;
const NORTH = 52.45;
const SOUTH = 44.1;
const K = 80; // SVG units per degree of latitude
const COS = Math.cos((48.5 * Math.PI) / 180);
export const WIDTH = Math.round((EAST - WEST) * COS * K);
export const HEIGHT = Math.round((NORTH - SOUTH) * K);

export const project = (lon: number, lat: number): [number, number] => [(lon - WEST) * COS * K, (NORTH - lat) * K];

// ISO 3166-2 code of each unit → region id in src/content/regions.json
const ISO: Record<string, string> = {
  'UA-05': 'vinnytsia', 'UA-07': 'volyn', 'UA-09': 'luhansk', 'UA-12': 'dnipropetrovsk', 'UA-14': 'donetsk',
  'UA-18': 'zhytomyr', 'UA-21': 'zakarpattia', 'UA-23': 'zaporizhzhia', 'UA-26': 'ivano-frankivsk',
  'UA-30': 'kyiv-city', 'UA-32': 'kyiv', 'UA-35': 'kirovohrad', 'UA-40': 'sevastopol', 'UA-43': 'crimea',
  'UA-46': 'lviv', 'UA-48': 'mykolaiv', 'UA-51': 'odesa', 'UA-53': 'poltava', 'UA-56': 'rivne', 'UA-59': 'sumy',
  'UA-61': 'ternopil', 'UA-63': 'kharkiv', 'UA-65': 'kherson', 'UA-68': 'khmelnytskyi', 'UA-71': 'cherkasy',
  'UA-74': 'chernihiv', 'UA-77': 'chernivtsi',
};

type Ring = [number, number][];
const ringPath = (ring: Ring) =>
  'M' + ring.map(([lon, lat]) => project(lon, lat).map((v) => v.toFixed(1)).join(',')).join('L') + 'Z';

export interface MapRegion {
  id: string;
  d: string;
  bbox: [number, number, number, number];
}

// Padded so a region fills the view when zoomed in (src/scripts/birth-map.ts) without clipping dots
// right at its border; floored so a small enclave (Kyiv city, Sevastopol) still zooms into a sensible
// amount of space instead of blowing up a single dot to fill the screen.
const PAD = 0.15;
const MIN_W = WIDTH * 0.15;
const MIN_H = HEIGHT * 0.15;
const boxOf = (points: [number, number][]): [number, number, number, number] => {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const [minX, maxX] = [Math.min(...xs), Math.max(...xs)];
  const [minY, maxY] = [Math.min(...ys), Math.max(...ys)];
  const [padX, padY] = [(maxX - minX) * PAD, (maxY - minY) * PAD];
  let [x, y, w, h] = [minX - padX, minY - padY, maxX - minX + 2 * padX, maxY - minY + 2 * padY];
  if (w < MIN_W) [x, w] = [x - (MIN_W - w) / 2, MIN_W];
  if (h < MIN_H) [y, h] = [y - (MIN_H - h) / 2, MIN_H];
  return [x, y, w, h];
};

export const regions: MapRegion[] = (geo as { features: { properties: { shapeISO: string }; geometry: { type: string; coordinates: unknown } }[] }).features.map((f) => {
  const id = ISO[f.properties.shapeISO];
  if (!id) throw new Error(`Map: unknown unit ${f.properties.shapeISO}`);
  const polygons = (f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]) as Ring[][];
  const points = polygons.flatMap((poly) => poly.flatMap((ring) => ring.map(([lon, lat]) => project(lon, lat))));
  // Holes (Kyiv city inside Kyiv Oblast) are drawn with the even-odd rule.
  return { id, d: polygons.flatMap((poly) => poly.map(ringPath)).join(''), bbox: boxOf(points) };
});
