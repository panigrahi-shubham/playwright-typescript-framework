import { test, expect } from '@playwright/test';

test('IndiaMart - Search for Mouse and open product', async ({ page }) => {

  // Step 1: Navigate to homepage
  await page.goto('https://www.indiamart.com/');

  // Step 2: Search for "Mouse"
  const searchBox = page.locator('#search_string'); // ✅ Fixed: unique ID
  await searchBox.fill('Mouse');
  await searchBox.press('Enter');

  // Step 3: Handle optional "Skip" popup (ad/survey)
  const skipButton = page.getByText('Skip');
  if (await skipButton.isVisible()) {
    await skipButton.click();
  }

  // Step 4: Verify search results loaded
  await expect(page).toHaveURL(/search/);
  await expect(page.locator('#header')).toContainText('IndiaMART');

  // Step 5: Assert search results contain mouse products ✅ Fixed
  await expect(page).toHaveURL(/mouse/i);
  await expect(page.getByText(/Computer Mouse/i).first()).toBeVisible();

  // Step 6: Click a product and handle new tab
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: /Computer Mouse/i }).first().click();
  const page1 = await page1Promise;

  // Step 7: Verify the new tab loaded
  await page1.waitForLoadState('domcontentloaded');
  await expect(page1).toHaveURL(/indiamart\.com/);
});