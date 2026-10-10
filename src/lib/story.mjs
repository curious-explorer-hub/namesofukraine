// Reads parts of a profile's story from its Markdown, as plain text. Shared by the share cards (src/lib/og.ts)
// and the posting scripts (scripts/post-*.mjs), which run under plain Node, hence JavaScript.

// Links reduced to their text, emphasis marks dropped, line breaks inside a paragraph joined.
export const plain = (text) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*?|__?/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim();

/**
 * The story's closing section, the one on why the person matters («Чому це важливо сьогодні», «Як його пам'ятають»…):
 * the last `##` section that isn't «Дискусії та оцінки». Null if the story has no sections.
 * @param {string} markdown a profile file, or just its body
 * @returns {{ heading: string, text: string } | null}
 */
export function closingSection(markdown) {
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  const sections = body.split(/^## /m).slice(1).filter((s) => !s.startsWith('Дискусії'));
  const last = sections.at(-1);
  if (!last) return null;
  const [heading, ...rest] = last.split('\n');
  const text = rest.join('\n').split(/\n\s*\n/).map(plain).filter(Boolean).join('\n\n');
  return text ? { heading: heading.trim(), text } : null;
}
