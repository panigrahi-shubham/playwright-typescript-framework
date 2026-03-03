import { test, expect } from '@playwright/test';

test('search for jeans and verify results', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByPlaceholder('Search Product').fill('Jeans');
  await page.getByRole('button', { name: 'Search' }).click();
  
  // assertions — THIS is what makes it a real test
  await expect(page).toHaveURL(/search/);
  await expect(page.getByText('Searched Products')).toBeVisible();
});