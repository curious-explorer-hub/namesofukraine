// The "Suggest or correct" form (Tally, decision D17). Builds the URL of the embedded form, passing
// hidden fields so each message arrives tagged with its language, kind and profile.

export const SUGGEST_TYPES = ['person', 'correction', 'photo', 'other'] as const;
export type SuggestType = (typeof SUGGEST_TYPES)[number];

export interface SuggestFields {
  lang: string;
  type?: string | null;
  profile?: string | null;
}

// Share links (tally.so/r/<id>) become embed links (tally.so/embed/<id>), which Tally allows in iframes.
export function suggestEmbedUrl(formUrl: string, fields: SuggestFields): string {
  const url = new URL(formUrl.replace('tally.so/r/', 'tally.so/embed/'));
  url.searchParams.set('hideTitle', '1');
  url.searchParams.set('transparentBackground', '1');
  url.searchParams.set('alignLeft', '1');
  url.searchParams.set('lang', fields.lang);
  // Only known values pass through, so a crafted link can't put arbitrary text into the form.
  if (fields.type && (SUGGEST_TYPES as readonly string[]).includes(fields.type)) url.searchParams.set('type', fields.type);
  if (fields.profile && /^[a-z0-9-]{1,80}$/.test(fields.profile)) url.searchParams.set('profile', fields.profile);
  return url.toString();
}
