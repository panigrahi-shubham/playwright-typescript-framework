import { expect, test } from '@playwright/test';
import { feature, owner, severity, story } from 'allure-js-commons';

const authEnabled = process.env.RUN_AUTH_TESTS === 'true';

test.describe('Authenticated flows', () => {
  test.skip(!authEnabled, 'RUN_AUTH_TESTS=true with valid credentials is required for logged-in coverage.');
  test.use({ storageState: './.auth/user.json' });

  test('Logged-in user sees their name in the navigation bar @auth @smoke', { tag: ['@auth', '@smoke'] }, async ({ page }) => {
    owner('Shubham');
    severity('critical');
    story('Auth - Logged-In State Verification');
    feature('Authentication');

    await page.goto('/');

    await expect(page.locator('li a:has-text(" Logged in as")')).toBeVisible();
  });

  test('Logged-in user can log out successfully @auth @regression', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    owner('Shubham');
    severity('normal');
    story('Auth - Logout');
    feature('Authentication');

    await page.goto('/');
    await page.click('a[href="/logout"]');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('li a:has-text(" Logged in as")')).not.toBeVisible();
  });

  test('Logged-in user can add a product to cart from products page @auth @regression', { tag: ['@auth', '@regression'] }, async ({ page }) => {
    owner('Shubham');
    severity('normal');
    story('Auth - Add To Cart');
    feature('Authentication');

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
