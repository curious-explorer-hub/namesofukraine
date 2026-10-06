// Site-wide settings the owner may change.

// Feedback form «Зворотний зв'язок» / "Feedback" (decision D17: Tally), created on 2026-10-04 in the
// owner's Tally workspace. It has hidden fields `lang`, `type` and `profile`, which the site fills in
// (src/lib/suggest.ts). Set to '' to hide the form; the page then says it's coming soon.
export const SUGGEST_FORM_URL = 'https://tally.so/r/A7Vpkl';

// Social accounts (product_vision.md §3.6, AC17; BACKLOG L11), shown on About and the Support page. A link appears only once its
// URL is set, so there are no dead links before the accounts exist.
export const SOCIAL_LINKS = {
  instagram: '', // e.g. 'https://www.instagram.com/<handle>/'
  threads: '', // e.g. 'https://www.threads.net/@<handle>'
};

// Donation pages (product_vision.md §3.6, AC17), shown on the Support page. Same rule: empty means hidden.
export const SUPPORT_LINKS = {
  patreon: '', // e.g. 'https://www.patreon.com/<handle>'
  buymeacoffee: '', // e.g. 'https://buymeacoffee.com/<handle>'
};
