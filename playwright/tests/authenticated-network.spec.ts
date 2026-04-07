import { expect, test } from '@playwright/test';
import { allure } from 'allure-playwright';

const authEnabled = process.env.RUN_AUTH_TESTS === 'true';

test.describe('Authenticated network flows', () => {
  test.skip(!authEnabled, 'RUN_AUTH_TESTS=true with valid credentials is required for auth + network coverage.');
  test.use({ storageState: './.auth/user.json' });

  test('Logged-in user can reach cart while a user-detail call is intercepted @auth @network @regression', { tag: ['@auth', '@network', '@regression'] }, async ({ page }) => {
    allure.owner('Shubham');
    allure.severity('normal');
    allure.story('Auth + Network - Cart Access');
    allure.feature('Network Interception');

    await page.route('**/api/getUserDetailByEmail**', async route => {
      const realResponse = await route.fetch();
      const realData = await realResponse.json();
      await route.fulfill({
        response: realResponse,
        json: { ...realData },
      });
    });

    await page.goto('/view_cart');

    await expect(page).toHaveURL(/\/view_cart/);
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page.locator('li a:has-text(" Logged in as")')).toBeVisible();
  });

  test('Logged-in user can search products with stored auth state @auth @network @smoke', { tag: ['@auth', '@network', '@smoke'] }, async ({ page }) => {
    allure.owner('Shubham');
    allure.severity('critical');
    allure.story('Auth + Network - Product Search');
    allure.feature('Network Interception');

    const responsePromise = page.waitForResponse(response => response.url().includes('/products?search='));

    await page.goto('/products');
    await page.fill('#search_product', 'dress');
    await page.click('#submit_search');

    const response = await responsePromise;
    const html = await response.text();

    expect(response.status()).toBe(200);
    expect(html).toContain('Searched Products');
    await expect(page).toHaveURL(/\/products\?search=dress/);
    await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();
  });
});
