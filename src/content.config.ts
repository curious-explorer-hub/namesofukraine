import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import categories from './content/categories.json';
import eras from './content/eras.json';
import regions from './content/regions.json';

const ids = (items: { id: string }[]) => items.map((i) => i.id) as [string, ...string[]];


const credit = {
  author: z.string(),
  license: z.string(),
  source_url: z.url(),
};

// Ukrainian profiles hold all facts: src/content/people/uk/<slug>.md → entry id "uk/<slug>"
const people = defineCollection({
  loader: glob({ base: './src/content/people', pattern: 'uk/[^_]*.md' }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string(),
        born: z.coerce.date(),
        born_circa: z.boolean().default(false), // exact birth date unknown → shown as "бл. <year>"
        died: z.coerce.date().optional(),
        died_circa: z.boolean().default(false), // exact death date unknown → shown as "бл. <year>"
        living: z.boolean().default(false),
        added: z.coerce.date(), // date published on the site — drives the "new additions" feed
        last_reviewed: z.coerce.date(),
        era: z.enum(ids(eras)),
        group: z.enum(ids(categories.groups)), // one per person — home-page section
        tags: z.array(z.enum(ids(categories.tags))).min(1),
        role: z.string().max(40), // one high-impact label
        summary: z.string().max(300), // 2–3 punchy sentences
        fun_fact: z.string(),
        // Optional: a widely believed claim about this person that isn't actually true.
        misconception: z.object({ claim: z.string(), truth: z.string() }).optional(),
        key_accomplishments: z.array(z.string()).min(1),
        birthplace: z.object({
          name: z.string(),
          region: z.enum(ids(regions)),
          country: z.string().length(2), // ISO 3166-1 alpha-2
          lat: z.number().optional(),
          lon: z.number().optional(),
          // The place is one version among several (region stays `unknown`): drawn as a hollow ring,
          // "one of the versions", and never counted in a region. Needs lat/lon.
          version: z.boolean().default(false),
        }).refine((b) => !b.version || (b.lat !== undefined && b.lon !== undefined && b.region === 'unknown'), {
          message: 'birthplace.version needs lat/lon and region: unknown',
        }),
        places: z
          .array(z.object({ name: z.string(), lat: z.number(), lon: z.number(), note: z.string() }))
          .default([]),
        // `position` is the CSS object-position used to crop to the face (default: centred, upper third)
        // `ai_edit`: the photo was colorized or restored with AI (Gemini), or a painting was rendered as a
        // photo-like image (`rendered`); the credit says so, and for `rendered` that it isn't a real photograph.
        // `fair_use`: not freely licensed (owner decision); shown on the site (profile, cards), never in
        // share images or structured data, and excluded from the site's CC BY-SA license.
        image: z.object({ src: image(), alt: z.string(), position: z.string().optional(), ai_edit: z.enum(['colorized', 'restored', 'rendered']).optional(), fair_use: z.boolean().optional(), ...credit }).optional(),
        quotes: z.array(z.object({ text: z.string(), source: z.string() })).default([]),
        gallery: z.array(z.object({ src: image(), caption: z.string(), ...credit })).default([]),
        sources: z.array(z.object({ title: z.string(), url: z.url() })).min(2),
        related: z.array(z.string()).default([]),
        reviewed: z.boolean().default(false),
      })
      .refine((p) => p.living || p.died, { message: 'Set `died` or `living: true`' }),
});

// English translations hold only the text that is translated; dates, places, group, sources, and
// images come from the Ukrainian file, so facts can't drift between languages.
// src/content/people/en/<slug>.md → entry id "<slug>". The Markdown body (long bio) is optional.
const people_en = defineCollection({
  loader: glob({ base: './src/content/people/en', pattern: '[^_]*.md' }),
  schema: z.object({
    name: z.string(),
    role: z.string().max(40),
    summary: z.string().max(300),
    fun_fact: z.string(),
    misconception: z.object({ claim: z.string(), truth: z.string() }).optional(),
    key_accomplishments: z.array(z.string()).min(1),
    birthplace_name: z.string(),
    image_alt: z.string().optional(),
    reviewed: z.boolean().default(false),
  }),
});

// Editorial pages (About, Suggest), one Markdown file per language: src/content/pages/<lang>/<page>.md
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '*/[^_]*.md' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

export const collections = { people, people_en, pages };
