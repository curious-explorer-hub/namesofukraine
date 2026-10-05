import { describe, expect, it } from 'vitest';
import { jsonForScript } from './json';

describe('jsonForScript', () => {
  it('cannot close the surrounding script block', () => {
    const out = jsonForScript({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(JSON.parse(out)).toEqual({ name: '</script><script>alert(1)</script>' });
  });
});
