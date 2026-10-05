import type { APIContext } from 'astro';
import { getPeople, byBirth, type Person } from '../../../lib/people';
import { personCard, siteCard } from '../../../lib/og';
import { languages, type Lang } from '../../../i18n';

// /og/<lang>/<slug>.jpg for each person, and /og/<lang>/site.jpg for every other page.
export async function getStaticPaths() {
  const paths = [];
  for (const lang of languages) {
    const people = (await getPeople(lang)).sort(byBirth);
    paths.push({ params: { lang, card: 'site' }, props: { lang, people } });
    for (const person of people) paths.push({ params: { lang, card: person.slug }, props: { lang, person } });
  }
  return paths;
}

export async function GET({ props }: APIContext) {
  const { lang, person, people } = props as { lang: Lang; person?: Person; people?: Person[] };
  const jpg = person ? await personCard(person) : await siteCard(lang, people ?? []);
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
}
