import { test, expect } from '@playwright/test';

test.describe('Playwright Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ✅ FIX 1: Assertions moved INSIDE the test callback body
  test('page title and URL', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page).toHaveURL('https://automationexercise.com/');
  });

  test('visibility and text assertions', async ({ page }) => {
    const logo = page.getByAltText('Website for automation practice');
    await expect(logo).toBeVisible();
    await expect(logo).not.toBeHidden();

    const heading = page.getByRole('heading', { name: /Full-Fledged/i });
    await expect(heading).toContainText('practice');
  });

  test('input value assertion', async ({ page }) => {
    // ✅ FIX 2: getByPlaceholder fails on this site — use getByRole instead
    await page.goto('/products');
    const searchBox = page.getByRole('textbox', { name: 'Search Product' });
    await searchBox.fill('laptop');
    await expect(searchBox).toHaveValue('laptop');
  });

  test('product count assertion', async ({ page }) => {
    await page.goto('/products');
    const products = page.locator('.productinfo');
    await expect(products).toHaveCount(34);
  });

  test('soft assertions — all run even if one fails', async ({ page }) => {
    await expect.soft(page).toHaveTitle(/Automation Exercise/);
    await expect.soft(page.getByAltText('Website for automation practice')).toBeVisible();
    // If title check fails, logo check STILL runs — that's the point of .soft()
  });

  test('custom failure message', async ({ page }) => {
    await expect(page, 'Homepage must have correct title').toHaveTitle(/Automation Exercise/);
  });

}); // ✅ FIX 3: Closing brace for test.describe added