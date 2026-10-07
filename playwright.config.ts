import { defineConfig, devices } from '@playwright/test';

// Smoke tests against the production build (reviewed profiles only). Build first: `npm run test:e2e`.
export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.e2e.ts', // not *.test.ts / *.spec.ts, so Vitest doesn't pick these up
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://127.0.0.1:4390', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // Serves dist/ with the production headers (CSP), unlike `astro preview`.
    command: 'node scripts/serve-dist.mjs 4390',
    url: 'http://127.0.0.1:4390/uk/',
    // Always a fresh server on dist/: reusing one (e.g. a dev server left on this port) tests the wrong site.
    reuseExistingServer: false,
  },
});
