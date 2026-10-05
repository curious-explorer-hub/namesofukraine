// Site-wide settings the owner may change.

// Feedback form «Зворотний зв'язок» / "Feedback" (decision D17: Tally), created on 2026-10-04 in the
// owner's Tally workspace. It has hidden fields `lang`, `type` and `profile`, which the site fills in
// (src/lib/suggest.ts). Set to '' to hide the form; the page then says it's coming soon.
export const SUGGEST_FORM_URL = 'https://tally.so/r/A7Vpkl';

// AI-animated portraits (backlog item 15). Off: every profile shows the static photo. The clips in
// public/portraits/ and the per-person `animate: true` flags are kept, so switching back on is one line.
export const ANIMATED_PORTRAITS = false;
