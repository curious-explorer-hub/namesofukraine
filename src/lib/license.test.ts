import { describe, expect, it } from 'vitest';
import { licenseUrl } from './license';

describe('licenseUrl', () => {
  it('links Creative Commons licenses to their deeds', () => {
    expect(licenseUrl('CC BY 4.0')).toBe('https://creativecommons.org/licenses/by/4.0/');
    expect(licenseUrl('CC BY-SA 2.5')).toBe('https://creativecommons.org/licenses/by-sa/2.5/');
    expect(licenseUrl('CC0')).toBe('https://creativecommons.org/publicdomain/zero/1.0/');
  });

  it('links ported licenses to the country version', () => {
    expect(licenseUrl('CC BY-SA 3.0 PL')).toBe('https://creativecommons.org/licenses/by-sa/3.0/pl/');
    expect(licenseUrl('CC BY 3.0 DE')).toBe('https://creativecommons.org/licenses/by/3.0/de/');
  });

  it('leaves other labels unlinked', () => {
    for (const name of ['Public domain', 'Fair use', 'Attribution', 'AI-generated']) expect(licenseUrl(name)).toBeUndefined();
  });
});
