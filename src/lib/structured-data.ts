// schema.org JSON-LD for search engines (backlog item 10). Rendered by BaseLayout.
import type { Person } from './people';

// Uncertain dates ("бл. 1595") are given as the year only, as schema.org allows.
const isoDate = (date: Date, circa: boolean) =>
  circa ? String(date.getUTCFullYear()) : date.toISOString().slice(0, 10);

// Pages about the same person on Wikipedia and in encyclopedias identify them for knowledge panels.
const identityHosts = /(wikipedia\.org|wikidata\.org|esu\.com\.ua|history\.org\.ua|encyclopediaofukraine\.com)$/;

export const personLd = (person: Person, url: URL, image?: URL) => {
  const { data } = person;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    url: url.href,
    description: data.summary,
    disambiguatingDescription: data.role,
    birthDate: isoDate(data.born, data.born_circa),
    ...(data.died && { deathDate: isoDate(data.died, data.died_circa) }),
    birthPlace: { '@type': 'Place', name: data.birthplace.name },
    ...(image && { image: image.href }),
    sameAs: data.sources.map((s) => s.url).filter((u) => identityHosts.test(new URL(u).hostname)),
  };
};

export const breadcrumbLd = (items: { name: string; url: URL }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url.href })),
});

export const websiteLd = (name: string, url: URL, lang: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url: url.href,
  inLanguage: lang,
  description,
});
