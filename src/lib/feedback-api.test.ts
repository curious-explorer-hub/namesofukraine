import { afterEach, describe, expect, it, vi } from 'vitest';
import { onRequestPost } from '../../functions/api/feedback';

const ORIGIN = 'https://namesofukraine.com';

function setup(turnstile = true) {
  const rows: unknown[][] = [];
  const env = { TURNSTILE_SECRET: 'secret', DB: { prepare: () => ({ bind: (...values: unknown[]) => ({ run: async () => rows.push(values) }) }) } };
  vi.stubGlobal('fetch', vi.fn(async () => Response.json({ success: turnstile })));
  return { rows, env };
}

function post(fields: Record<string, string>, origin = ORIGIN) {
  const body = new FormData();
  for (const [name, value] of Object.entries(fields)) body.set(name, value);
  return new Request(`${ORIGIN}/api/feedback`, { method: 'POST', body, headers: { Origin: origin } });
}

const valid = { lang: 'en', type: 'correction', profile: 'roksolana', message: 'Wrong date', 'cf-turnstile-response': 'token' };

describe('POST /api/feedback', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('stores a valid message that passed the spam check', async () => {
    const { rows, env } = setup();
    const res = await onRequestPost({ request: post(valid), env });
    expect(res.status).toBe(200);
    expect(rows).toHaveLength(1);
    expect(rows[0].slice(2)).toEqual(['en', 'correction', 'roksolana', null, 'Wrong date', null, null]);
  });

  it('refuses messages from other sites, failed spam checks and invalid forms, storing nothing', async () => {
    const { rows, env } = setup(false);
    expect((await onRequestPost({ request: post(valid, 'https://evil.example'), env })).status).toBe(403);
    expect((await onRequestPost({ request: post(valid), env })).status).toBe(403);
    expect((await onRequestPost({ request: post({ ...valid, message: '' }), env })).status).toBe(400);
    expect((await onRequestPost({ request: post({ ...valid, 'cf-turnstile-response': '' }), env })).status).toBe(403);
    expect(rows).toHaveLength(0);
  });
});
