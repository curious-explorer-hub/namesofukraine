import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPeople, personUrl } from './people';
import { t, type Lang } from '../i18n';

export async function feed(context: APIContext, lang: Lang) {
  const people = (await getPeople(lang)).sort((a, b) => b.data.added.getTime() - a.data.added.getTime());
  return rss({
    title: t('site.title', lang),
    description: t('new.feed_description', lang),
    site: context.site!,
    customData: `<language>${lang}</language>`,
    items: people.map((p) => ({
      title: `${p.data.name}: ${p.data.role}`,
      pubDate: p.data.added,
      description: p.data.summary,
      link: personUrl(p),
    })),
  });
}
