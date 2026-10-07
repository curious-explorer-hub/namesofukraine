import { expect, test } from '@playwright/test';

// Uses published profiles (status: approved); update if they change.
const visibleCards = '.catalogue .shelf > li:visible';

test('filters and search narrow the list, and going back from a profile keeps them', async ({ page }) => {
  await page.goto('/uk/');
  await page.locator('select[name="group"]').selectOption('statehood');
  await page.locator('input[name="q"]').fill('орлик');

  await expect(page).toHaveURL(/group=statehood/);
  await expect(page).toHaveURL(/q=/);
  await expect(page.locator(visibleCards)).toHaveCount(1);

  await page.locator(visibleCards).getByRole('link').first().click();
  await expect(page).toHaveURL(/\/uk\/people\/pylyp-orlyk\/$/);
  await expect(page.locator('h1')).toHaveText('Пилип Орлик');

  await page.goBack();
  await expect(page.locator('select[name="group"]')).toHaveValue('statehood');
  await expect(page.locator('input[name="q"]')).toHaveValue('орлик');
  await expect(page.locator(visibleCards)).toHaveCount(1);
});

test('the language switch keeps the same person', async ({ page }) => {
  await page.goto('/uk/people/roksolana/');
  await page.locator('.lang-toggle a:not([aria-current])').click();
  await expect(page).toHaveURL(/\/en\/people\/roksolana\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');

  await page.locator('.lang-toggle a:not([aria-current])').click();
  await expect(page).toHaveURL(/\/uk\/people\/roksolana\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
});

test('a category page lists its people and filters within them', async ({ page }) => {
  await page.goto('/en/groups/performing-arts/');
  const before = await page.locator('.shelf > li:visible').count();
  expect(before).toBeGreaterThan(1);
  await page.locator('input[name="q"]').fill('Lifar');
  await expect(page.locator('.shelf > li:visible')).toHaveCount(1);
});

test('the home page shows one way to browse at a time, as tabs', async ({ page }) => {
  await page.goto('/uk/');
  await expect(page.locator('#panel-search')).toBeVisible();
  await expect(page.locator('#panel-map')).toBeHidden();
  await page.getByRole('tab', { name: 'Епохи' }).click();
  await expect(page.locator('#panel-eras')).toBeVisible();
  await expect(page.locator('#panel-search')).toBeHidden();
  await page.keyboard.press('ArrowRight'); // keyboard: the next tab
  await expect(page.getByRole('tab', { name: 'Карта' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#panel-map')).toBeVisible();
});

test('changing tabs clears the filters, and "/" jumps to the search field', async ({ page }) => {
  await page.goto('/uk/?era=cossack');
  await expect(page.locator('#panel-eras')).toBeVisible(); // opens on the tab of the active filter
  await page.getByRole('tab', { name: 'Галузі' }).click();
  await expect(page).not.toHaveURL(/era=/);
  await expect(page.locator('select[name="era"]')).toHaveValue('');
  await page.keyboard.press('/');
  await expect(page.locator('#panel-search')).toBeVisible();
  await expect(page.locator('input[name="q"]')).toBeFocused();
});

test('the birthplace map filters by region, and the list does the same', async ({ page }) => {
  await page.goto('/uk/');
  await page.getByRole('tab', { name: 'Карта' }).click();
  await page.locator('.map-region[data-region="poltava"]').click();
  await expect(page).toHaveURL(/region=poltava/);
  await expect(page.locator('select[name="region"]')).toHaveValue('poltava');
  await expect(page.locator('.map-region[data-region="poltava"]')).toHaveAttribute('aria-pressed', 'true');
  const found = await page.locator(visibleCards).count();
  expect(found).toBeGreaterThan(1);
  await page.locator('.map-pick[data-region="poltava"]').click(); // a second click clears it
  await expect(page).not.toHaveURL(/region=/);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the home page shows the group tiles, each linking to its category page', async ({ page }) => {
    await page.goto('/uk/');
    await expect(page.locator('.tile')).not.toHaveCount(0);
    await expect(page.locator('.map-svg:not(.map-svg-world)')).toBeVisible(); // every panel is shown, one after another
    await expect(page.locator('.map-world-card')).not.toHaveCount(0); // and the continent cards, as pictures
    await page.locator('.tile').first().click();
    await expect(page).toHaveURL(/\/uk\/groups\/[a-z-]+\/$/);
  });

  test('the full list is shown and the filter bar is hidden', async ({ page }) => {
    await page.goto('/uk/groups/statehood/');
    await expect(page.locator('form.filters')).toBeHidden();
    expect(await page.locator('.shelf > li:visible').count()).toBeGreaterThan(1);
  });
});

test('an unknown address shows the friendly not-found page in the right language', async ({ page }) => {
  const response = await page.goto('/en/people/no-such-person/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Page not found');
  await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/en/');
});
