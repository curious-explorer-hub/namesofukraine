import type { APIContext } from 'astro';
import { getPeople, type Person } from '../../../../lib/people';
import { instagramSlide, instagramSlides, type Slide } from '../../../../lib/og';

// /og/instagram/<slug>/<n>.jpg: the carousel's text slides after the portrait card (n = 2, 3, 4).
export async function getStaticPaths() {
  return (await getPeople('uk')).flatMap((person) => {
    const slides = instagramSlides(person);
    return slides.map((slide, i) => ({ params: { slug: person.slug, n: String(i + 2) }, props: { person, slide, total: slides.length + 1 } }));
  });
}

export async function GET({ props, params }: APIContext) {
  const { person, slide, total } = props as { person: Person; slide: Slide; total: number };
  const jpg = await instagramSlide(person, slide, Number(params.n), total);
  return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } });
}
