// Creative Commons licenses ask the credit to link to the license; other labels (public domain,
// fair use, a source's own terms) have no deed to link to.
export function licenseUrl(name: string): string | undefined {
  if (name === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/';
  const m = name.match(/^CC (BY(?:-SA)?) (\d\.\d)(?: ([A-Z]{2}))?$/);
  if (!m) return undefined;
  return `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/${m[3] ? `${m[3].toLowerCase()}/` : ''}`;
}
