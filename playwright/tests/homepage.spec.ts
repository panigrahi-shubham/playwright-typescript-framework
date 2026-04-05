import { test, expect } from './fixtures';

test.describe.configure({ mode: 'parallel' });

test('homepage title is correct @smoke', async ({ homePage }) => {
  await expect(homePage.page).toHaveTitle(/Automation Exercise/);
});

test('logo is visible @smoke', async ({ homePage }) => {
  await expect(homePage.logo).toBeVisible();
});

// This fixture starts on /products, so the assertion can stay focused on the UI contract.
test('search box is present on products page', async ({ productsPage }) => {
  await expect(productsPage.searchInput).toBeVisible();
});
