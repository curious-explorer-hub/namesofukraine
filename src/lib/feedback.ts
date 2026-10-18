// The feedback form (decision D19): one set of rules for the page, which pre-fills it, and for the Pages
// Function (functions/api/feedback.ts), which checks every message before it is stored.

export const FEEDBACK_TYPES = ['person', 'correction', 'volunteer', 'other'] as const;
export type FeedbackType = (typeof FEEDBACK_TYPES)[number];
// Kinds about the catalogue, which ask who it's about and for sources; the page hides those fields for the rest.
export const SITE_EDIT_TYPES: readonly FeedbackType[] = ['person', 'correction'];

// Longest accepted answers, also set as maxlength on the fields.
export const FEEDBACK_LIMITS = { about: 200, message: 5000, sources: 2000, email: 200 } as const;

export interface Feedback {
  lang: 'uk' | 'en';
  type: FeedbackType;
  profile: string | null;
  about: string | null;
  message: string;
  sources: string | null;
  email: string | null;
}

export const isFeedbackType = (value: unknown): value is FeedbackType =>
  (FEEDBACK_TYPES as readonly unknown[]).includes(value);

// Only a slug passes, so a crafted link can't put arbitrary text into a message.
export const isProfileSlug = (value: unknown): value is string => typeof value === 'string' && /^[a-z0-9-]{1,80}$/.test(value);

const text = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
};

// Returns the message to store, or null if a required answer is missing or anything is out of bounds.
export function parseFeedback(form: FormData): Feedback | null {
  const lang = text(form, 'lang');
  const type = text(form, 'type');
  const profile = text(form, 'profile');
  const fields = { about: text(form, 'about'), message: text(form, 'message'), sources: text(form, 'sources'), email: text(form, 'email') };
  if (lang !== 'uk' && lang !== 'en') return null;
  if (!isFeedbackType(type) || !fields.message) return null;
  if (profile && !isProfileSlug(profile)) return null;
  for (const [name, value] of Object.entries(fields)) if (value.length > FEEDBACK_LIMITS[name as keyof typeof fields]) return null;
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return null;
  // Answers typed into the hidden fields before switching to another kind aren't kept.
  const siteEdit = SITE_EDIT_TYPES.includes(type);
  return {
    lang,
    type,
    profile: profile || null,
    about: (siteEdit && fields.about) || null,
    message: fields.message,
    sources: (siteEdit && fields.sources) || null,
    email: fields.email || null,
  };
}
