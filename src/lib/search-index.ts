import { getImage } from 'astro:assets';
import { getPeople, personUrl, lifespan, searchText, byBirth } from './people';
import type { Lang } from '../i18n';

// One entry per person for the site-wide search (src/scripts/search.ts), served as /<lang>/search.json.
// Short keys keep the file small; it is fetched only when someone opens the search.
export interface SearchEntry {
  n: string; // name
  r: string; // role
  y: string; // years
  u: string; // profile URL
  g: string; // group id (accent colour)
  s: string; // text to match: the same as the home-page filter
  i?: string; // small portrait
  p?: string; // its object-position
}

export async function searchIndex(lang: Lang): Promise<SearchEntry[]> {
  const people = (await getPeople(lang)).sort(byBirth);
  return Promise.all(
    people.map(async (p) => {
      const image = p.data.image;
      const thumb = image ? (await getImage({ src: image.src, width: 96, format: 'webp', quality: 70 })).src : undefined;
      return {
        n: p.data.name,
        r: p.data.role,
        y: lifespan(p),
        u: personUrl(p),
        g: p.data.group,
        s: searchText(p),
        ...(thumb && { i: thumb, p: image?.position ?? '50% 22%' }),
      };
    }),
  );
}
