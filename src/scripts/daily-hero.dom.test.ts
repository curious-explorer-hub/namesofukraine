// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { cardEntries } from './daily-hero';

// Mirrors PersonCard with `dates` (src/components/HomeCatalogue.astro).
const card = (slug: string, born: string | null, img: boolean) => `
  <li class="person-item" data-slug="${slug}"${born ? ` data-born="${born}"` : ''} data-died="07-11">
    <article class="person">
      ${img ? `<div class="portrait person-portrait"><img src="/a/${slug}-640.webp" srcset="/a/${slug}-400.webp 400w, /a/${slug}-240.webp 240w, /a/${slug}-640.webp 640w" alt="Портрет ${slug}"></div>` : '<div class="portrait portrait-monogram person-portrait" aria-hidden="true"><span>ОО</span></div>'}
      <p class="person-years">бл. 910–969</p>
      <h3 class="person-name"><a href="/uk/people/${slug}/">Ім'я ${slug}</a></h3>
      <p class="person-role">Роль</p>
    </article>
  </li>`;

describe('cardEntries (daily hero candidates from the home page cards)', () => {
  it('reads each person once, with dates, the smallest portrait and its alt text', () => {
    document.body.innerHTML = `<div class="catalogue">${card('olha', null, true)}${card('franko', '08-27', false)}${card('olha', null, true)}</div>`;
    expect(cardEntries()).toEqual([
      { slug: 'olha', born: null, died: '07-11', name: "Ім'я olha", role: 'Роль', years: 'бл. 910–969', url: '/uk/people/olha/', img: '/a/olha-240.webp', alt: 'Портрет olha' },
      { slug: 'franko', born: '08-27', died: '07-11', name: "Ім'я franko", role: 'Роль', years: 'бл. 910–969', url: '/uk/people/franko/', img: null, alt: null },
    ]);
  });
});
