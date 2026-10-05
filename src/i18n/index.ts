import uk from './uk.json';
import en from './en.json';

export type Key = keyof typeof uk;
// Every language must define every key (checked by the type system and by i18n.test.ts).
const strings: Record<'uk' | 'en', Record<Key, string>> = { uk, en };
export type Lang = keyof typeof strings;
export const languages: Lang[] = ['uk', 'en'];

// Placeholders like {n} are replaced from `vars`.
export const t = (key: Key, lang: Lang = 'uk', vars: Record<string, string | number> = {}) =>
  strings[lang][key].replace(/\{(\w+)\}/g, (_, v) => String(vars[v] ?? `{${v}}`));
