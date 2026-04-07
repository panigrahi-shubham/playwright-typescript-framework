import { expect, test } from '@playwright/test';
import { allure } from 'allure-playwright';

const authEnabled = process.env.RUN_AUTH_TESTS === 'true';

test.describe('Authenticated flows', () => {
  test.skip(!authEnabled, 'RUN_AUTH_TESTS=true with valid credentials is required for logged-in coverage.');
  test.use({ storageState: './.auth/user.json' });

  test('Logged-in user sees their name in the navigation bar @auth @smoke', { tag: ['@auth', '@smoke'] }, async ({ page }) => {
    allure.owner('Shubham');
    allure.severity('critical');
    allure.story('Auth - Logged-In State Verification');
    allure.feature('Authentication');

    await page.goto('/');

    await expect(page.locator('li a:has-text(" Logged in as")')).toBeVisible();
  });

  test('Logged-in user can log out successfully @auth @regression', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    allure.owner('Shubham');
    allure.severity('normal');
    allure.story('Auth - Logout');
    allure.feature('Authentication');

    await page.goto('/');
    await page.click('a[href="/logout"]');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('li a:has-text(" Logged in as")')).not.toBeVisible();
  });

  test('Logged-in user can add a product to cart from products page @auth @regression', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    allure.owner('Shubham');
    allure.severity('normal');
    allure.story('Auth - Add To Cart');
    allure.feature('Authentication');

    await page.goto('/products');

    const firstProduct = page.locator('.product-image-wrapper').first();
    await firstProduct.hover();
    await firstProduct.locator('.add-to-cart').first().click();

    const continueBtn = page.getByRole('button', { name: 'Continue Shopping' });
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    await expect(page.locator('a[href="/view_cart"]').first()).toBeVisible();
  });
});
