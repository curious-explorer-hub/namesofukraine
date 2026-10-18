// Site-wide settings the owner may change.

// Feedback form «Зворотний зв'язок» / "Feedback" (decision D19): the page's own form, sent to the Pages
// Function functions/api/feedback.ts. This is the public site key of its Cloudflare Turnstile widget (spam
// check); the matching secret is a Pages secret, never in the repo. Set to '' to hide the form; the page
// then says it's coming soon.
export const FEEDBACK_SITEKEY = '0x4AAAAAAFZr_lIFmcwO5_9B';

// Social accounts (product_vision.md §3.6, AC17; BACKLOG L11), shown on About and the Support page. A link appears only once its
// URL is set, so there are no dead links before the accounts exist.
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/names_of_ukraine/',
  threads: 'https://www.threads.com/@names_of_ukraine',
};

// Donation pages (product_vision.md §3.6, AC17), shown on the Support page. Same rule: empty means hidden.
export const SUPPORT_LINKS = {
  monobank: 'https://send.monobank.ua/jar/8o3gVQtFuC', // the Monobank jar («банка»)
  patreon: 'https://www.patreon.com/cw/NamesOfUkraine/membership',
};
