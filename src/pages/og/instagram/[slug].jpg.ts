import type { APIContext } from 'astro';
import { getPeople, type Person } from '../../../lib/people';
import { instagramCard } from '../../../lib/og';

// /og/instagram/<slug>.jpg: the 4:5 card that scripts/post-instagram.mjs posts (Ukrainian only, like the posts).
export async function getStaticPaths() {
  return (await getPeople('uk')).map((person) => ({ params: { slug: person.slug }, props: { person } }));
}

export async function GET({ props }: APIContext) {
  const jpg = await instagramCard((props as { person: Person }).person);
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
}
