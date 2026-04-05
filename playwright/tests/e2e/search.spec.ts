import { expect, test } from '../../src/fixtures/fixtures';

test.describe('Search Flow with POM', () => {
  test.describe.configure({ mode: 'parallel' });

  // Mark one fast happy-path check so it can be included in smoke runs.
  test('search for shirt shows results @smoke', async ({ page, homePage, searchPage }) => {
    await homePage.navigateTo('/');
    await homePage.searchFor('shirt');

    await expect(page).toHaveURL(/products/);
    await expect(searchPage.pageHeading).toBeVisible();
  });

  test('logo is visible on homepage', async ({ homePage }) => {
    await homePage.navigateTo('/');
    await expect(homePage.logo).toBeVisible();
  });

  test('search result count is greater than zero', async ({ homePage, searchPage }) => {
    await homePage.navigateTo('/');
    await homePage.searchFor('shirt');

    await expect(searchPage.pageHeading).toBeVisible();
    await expect(searchPage.firstProduct).toBeVisible();

    const count = await searchPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });
});
