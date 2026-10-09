import { expect, test } from '@playwright/test';
import collections from '../src/content/collections.json' with { type: 'json' };

// Uses published profiles (status: approved); update if they change.
const visibleCards = '.catalogue .shelf > li:visible';

// An uncaught error in one page script stops the rest (tabs, search, map), so any error fails the test.
test.beforeEach(({ page }, testInfo) => {
  page.on('pageerror', (error) => testInfo.annotations.push({ type: 'pageerror', description: error.message }));
});
test.afterEach(({}, testInfo) => {
  const errors = testInfo.annotations.filter((a) => a.type === 'pageerror').map((a) => a.description);
  expect(errors, 'uncaught script errors on the page').toEqual([]);
});

for (const [lang, tabNames] of [
  ['uk', ['Пошук', 'Епохи', 'Карта', 'Галузі', 'Добірки']],
  ['en', ['Search', 'Eras', 'Map', 'Fields', 'Spotlights']],
] as const) {
  test(`every home-page tab opens its panel (${lang})`, async ({ page }) => {
    await page.goto(`/${lang}/`);
    await expect(page.locator('[data-explore]')).toHaveClass(/is-ready/);
    for (const name of tabNames) {
      const tab = page.getByRole('tab', { name });
      await tab.click();
      await expect(tab).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator(`#${await tab.getAttribute('aria-controls')}`)).toBeVisible();
    }
  });
}

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

test("a profile's era and field link to the home page, filtered", async ({ page }) => {
  await page.goto('/en/people/roksolana/');
  await page.locator('.profile a[href*="?group="]').click();
  await expect(page).toHaveURL(/\/en\/\?group=statehood$/);
  await expect(page.locator('select[name="group"]')).toHaveValue('statehood');
  await expect(page.locator('.tile-item[data-group="statehood"] .tile')).toHaveAttribute('aria-current', 'true');
  expect(await page.locator(visibleCards).count()).toBeGreaterThan(1);
});

for (const lang of ['uk', 'en'] as const) {
  test(`a profile's collections link to the home page, filtered, with the collection's description (${lang})`, async ({ page }) => {
    const [army, mariupol, money] = ['women-army', 'defenders-mariupol', 'money-people'].map(
      (id) => collections.collections.find((c) => c.id === id)!,
    );
    await page.goto(`/${lang}/people/kateryna-polishchuk/`);
    const links = page.locator('.profile-facts a[href*="?collection="]');
    await expect(links).toHaveText([army.label[lang], mariupol.label[lang]]);
    await links.last().click();

    await expect(page).toHaveURL(new RegExp(`/${lang}/\\?collection=defenders-mariupol$`));
    await expect(page.locator('#panel-collections')).toBeVisible();
    await expect(page.locator('button[data-collection="defenders-mariupol"]')).toHaveAttribute('aria-pressed', 'true');
    const name = { uk: ['Катерина Поліщук', 'Тарас Шевченко'], en: ['Kateryna Polishchuk', 'Taras Shevchenko'] }[lang];
    await expect(page.locator(visibleCards).filter({ hasText: name[0] })).toHaveCount(1); // she is in it
    await expect(page.locator(visibleCards).filter({ hasText: name[1] })).toHaveCount(0); // he isn't
    const note = page.locator('.collection-note:visible');
    await expect(note).toHaveText(mariupol.description[lang]);

    await page.locator('button[data-collection="money-people"]').click(); // another card: its description
    await expect(note).toHaveText(money.description[lang]);
    await page.locator('button[data-collection="money-people"]').click(); // released: no description
    await expect(note).toHaveCount(0);
  });
}

test('a profile in no collection has no collections row', async ({ page }) => {
  await page.goto('/uk/people/roksolana/');
  await expect(page.locator('.profile-facts a[href*="?era="]')).toHaveCount(1);
  await expect(page.locator('.profile-facts a[href*="?collection="]')).toHaveCount(0);
});

for (const [lang, title, text] of [
  ['uk', 'Відомі цитати', '«Світ ловив мене, та не спіймав.»'],
  ['en', 'Famous quotes', '“The world tried to catch me, but did not catch me.”'],
] as const) {
  test(`a profile with quotes shows them in its language, with the source (${lang})`, async ({ page }) => {
    await page.goto(`/${lang}/people/hryhorii-skovoroda/`);
    const quotes = page.locator('.profile-quotes');
    await expect(quotes.getByRole('heading')).toHaveText(title);
    await expect(quotes.locator('blockquote')).toHaveText([text]);
    await expect(quotes.locator('figcaption')).toHaveCount(1);
  });
}

test('verse in a quote keeps its line breaks', async ({ page }) => {
  await page.goto('/uk/people/lesya-ukrainka/');
  await expect(page.locator('.profile-quotes blockquote br')).toHaveCount(3);
});

test('a profile without quotes has no quotes section', async ({ page }) => {
  await page.goto('/uk/people/roksolana/');
  await expect(page.locator('.profile-facts dl')).toBeVisible();
  await expect(page.locator('.profile-quotes')).toHaveCount(0);
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

  test('the home page shows the group tiles, each linking to its filter', async ({ page }) => {
    await page.goto('/uk/');
    await expect(page.locator('.tile')).not.toHaveCount(0);
    await expect(page.locator('.map-svg:not(.map-svg-world)')).toBeVisible(); // every panel is shown, one after another
    await expect(page.locator('.map-world-card')).not.toHaveCount(0); // and the continent cards, as pictures
    await page.locator('.tile').first().click();
    await expect(page).toHaveURL(/\/uk\/\?group=[a-z-]+$/);
  });

  test('the full list is shown and the filter bar is hidden', async ({ page }) => {
    await page.goto('/uk/?group=statehood');
    await expect(page.locator('form.filters')).toBeHidden();
    expect(await page.locator('.shelf > li:visible').count()).toBeGreaterThan(1);
  });
});

test('a collection card filters like an era, and the highlight slides to the next card', async ({ page }) => {
  await page.goto('/uk/');
  await page.getByRole('tab', { name: 'Добірки' }).click();
  await expect(page.locator('#panel-collections')).toBeVisible();
  const money = page.locator('button[data-collection="money-people"]');
  const army = page.locator('button[data-collection="women-army"]');
  const indicator = page.locator('#panel-collections .ribbon-indicator');

  await money.click();
  await expect(page).toHaveURL(/collection=money-people/);
  await expect(money).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator(visibleCards).filter({ hasText: 'Тарас Шевченко' })).toHaveCount(1);
  await expect(page.locator(visibleCards).filter({ hasText: 'Пилип Орлик' })).toHaveCount(0);
  await expect(indicator).toHaveAttribute('data-active');
  await expect.poll(async () => (await indicator.boundingBox())?.x).toBeCloseTo((await money.boundingBox())!.x, 0);

  await army.click(); // switch collection: the highlight follows
  await expect(army).toHaveAttribute('aria-pressed', 'true');
  await expect(money).toHaveAttribute('aria-pressed', 'false');
  await expect.poll(async () => {
    const [a, b] = [await indicator.boundingBox(), await army.boundingBox()];
    return Math.round(a!.x - b!.x) + Math.round(a!.y - b!.y);
  }).toBe(0);
  await expect(page.locator('[data-explore] [role="tab"]')).toHaveCount(5); // tabs still there

  await page.reload(); // a shared link opens on the collections tab, card pressed
  await expect(page.locator('#panel-collections')).toBeVisible();
  await expect(army).toHaveAttribute('aria-pressed', 'true');
});

test('changing tabs clears a collection, and the field tiles work again', async ({ page }) => {
  await page.goto('/uk/?collection=defenders-mariupol');
  await page.getByRole('tab', { name: 'Галузі' }).click();
  await expect(page).not.toHaveURL(/collection=/);
  await expect(page.locator('input[name="collection"]')).toHaveValue('');
  await expect(page.locator('.catalogue')).not.toHaveAttribute('data-filtering');
  await expect(page.locator('#panel-groups .tile').first()).toBeVisible();
});

test('a field tile filters on the home page, keeping the tabs and the other fields', async ({ page }) => {
  await page.goto('/uk/');
  await page.getByRole('tab', { name: 'Галузі' }).click();
  const statehood = page.locator('[data-group="statehood"] .tile');
  await statehood.click();
  await expect(page).toHaveURL(/\/uk\/\?group=statehood$/);
  await expect(statehood).toHaveAttribute('aria-current', 'true');
  await expect(page.locator(visibleCards).filter({ hasText: 'Пилип Орлик' })).toHaveCount(1);
  await expect(page.locator(visibleCards).filter({ hasText: 'Леся Українка' })).toHaveCount(0);
  await expect(page.getByRole('tab', { name: 'Епохи' })).toBeVisible();
  await expect(page.locator('#panel-groups .tile')).not.toHaveCount(1); // every field still offered

  const literature = page.locator('[data-group="literature"] .tile');
  await literature.click(); // switch field without leaving
  await expect(page).toHaveURL(/group=literature/);
  await expect(literature).toHaveAttribute('aria-current', 'true');
  await expect(statehood).not.toHaveAttribute('aria-current');
  await expect(page.locator(visibleCards).filter({ hasText: 'Леся Українка' })).toHaveCount(1);

  await literature.click(); // a second click clears it
  await expect(page).not.toHaveURL(/group=/);
  await expect(page.locator('.catalogue')).not.toHaveAttribute('data-filtering');
});

test('the daily hero is filled in from the card list fetched after load', async ({ page }) => {
  await page.goto('/uk/');
  const hero = page.locator('[data-daily-hero]');
  await expect(hero).not.toHaveAttribute('data-pending');
  await expect(hero.locator('[data-hero-name]')).not.toBeEmpty();
  await expect(hero.locator('[data-hero-link]')).toHaveAttribute('href', /^\/uk\/people\/[^/]+\/$/);
});

test('the language switch names the other language in the language of the page', async ({ page }) => {
  await page.goto('/uk/');
  const other = page.locator('.lang-toggle a:not([aria-current])');
  await expect(other).toHaveAccessibleName('EN - читати англійською');
  await expect(other.locator('.visually-hidden')).toHaveAttribute('lang', 'uk');
});

test.describe('feedback form', () => {
  // Tally is never contacted from tests; only whether the page asks for it.
  test.beforeEach(({ page }) => page.route('https://tally.so/**', (route) => route.fulfill({ body: '' })));

  test('loads only after "Write to us" is clicked', async ({ page }) => {
    const tally: string[] = [];
    page.on('request', (r) => r.url().startsWith('https://tally.so/') && tally.push(r.url()));
    await page.goto('/uk/feedback/');
    const frame = page.locator('iframe[data-suggest-form]');
    await expect(frame).toBeHidden();
    await expect(frame).not.toHaveAttribute('src');
    expect(tally).toEqual([]);

    await page.getByRole('button', { name: 'Написати нам' }).click();
    await expect(frame).toBeVisible();
    await expect(frame).toHaveAttribute('src', /^https:\/\/tally\.so\//);
    await expect(page.getByRole('button', { name: 'Написати нам' })).toHaveCount(0);
  });

  test('opens at once from a "Report a mistake" link, tagged with the profile', async ({ page }) => {
    await page.goto('/en/feedback/?type=correction&profile=roksolana#form');
    const frame = page.locator('iframe[data-suggest-form]');
    await expect(frame).toBeVisible();
    await expect(frame).toHaveAttribute('src', /profile=roksolana/);
    await expect(frame).toHaveAttribute('src', /type=correction/);
    await expect(page.getByRole('button', { name: 'Write to us' })).toHaveCount(0);
  });
});

test('an unknown address shows the friendly not-found page in the right language', async ({ page }) => {
  const response = await page.goto('/en/people/no-such-person/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Page not found');
  await expect(page.getByRole('link', { name: 'Go to the home page' })).toHaveAttribute('href', '/en/');
});
