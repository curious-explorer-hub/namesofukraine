// Search results show about 160 characters of a page's description. Longer text (a profile's summary,
// up to 300) is cut to the whole sentences that fit, if they say enough (a short hook question alone
// doesn't; nor does a cut after an abbreviation such as "No."), or else at a word, with an ellipsis.
export const MAX_DESCRIPTION = 160;
const MIN_SENTENCES = 100;

export function shortDescription(text: string, max = MAX_DESCRIPTION) {
  if (text.length <= max) return text;
  let out = '';
  for (const sentence of text.split(/(?<=[.!?…])\s+/)) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  if (out.length >= MIN_SENTENCES) return out;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:–-]+$/, '')}…`;
}
