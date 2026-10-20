import { describe, expect, it } from 'vitest';
import { WARN_DAYS, row, verdict } from './check-tokens.mjs';

describe('verdict', () => {
  const now = new Date('2026-11-01T00:00:00Z');
  const inDays = (n) => new Date(now.getTime() + n * 864e5).toISOString();

  it('is ok without an expiry date or well before it', () => {
    expect(verdict(undefined, now)).toBe('ok');
    expect(verdict(inDays(WARN_DAYS + 1), now)).toBe('ok');
  });

  it(`warns within ${WARN_DAYS} days and after expiry`, () => {
    expect(verdict(inDays(WARN_DAYS), now)).toBe('soon');
    expect(verdict(inDays(1), now)).toBe('soon');
    expect(verdict(inDays(0), now)).toBe('expired');
    expect(verdict(inDays(-3), now)).toBe('expired');
  });
});

describe('row', () => {
  const now = new Date('2026-11-01T00:00:00Z');

  it('shows the date and whole days left, and the action only when something is wrong', () => {
    expect(row('THREADS_ACCESS_TOKEN', 'ok', '2026-12-09T10:00:00Z', 'refresh', now)).toBe('| THREADS_ACCESS_TOKEN | ✅ ok | 2026-12-09 | 38 |  |');
    expect(row('INSTAGRAM_ACCESS_TOKEN', 'soon', '2026-11-05', 'refresh', now)).toBe('| INSTAGRAM_ACCESS_TOKEN | ⚠️ soon | 2026-11-05 | 4 | refresh |');
  });

  it('says so when a token has no expiry date', () => {
    expect(row('CLOUDFLARE_API_TOKEN', 'ok', undefined, 'roll', now)).toBe('| CLOUDFLARE_API_TOKEN | ✅ ok | no expiry | - |  |');
  });

  it("leaves the expiry blank for a token that doesn't work", () => {
    expect(row('CLOUDFLARE_D1_TOKEN', 'invalid', undefined, 'roll', now)).toBe('| CLOUDFLARE_D1_TOKEN | ⚠️ invalid | - | - | roll |');
  });
});
