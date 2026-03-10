import { test, expect} from '@playwright/test' ;

test.describe('Playwright Actions', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

    }) ;

    test('fill vs type difference', async ( { page }) => {
        await page.getByRole('link', { name: 'Products' }).click();
        await expect(page).toHaveURL(/products/);
        const searchBox = page.getByPlaceholder('Search Product');
        await searchBox.fill('Shirts');
        await expect(searchBox).toHaveValue('Shirts');
        await searchBox.clear();
        await searchBox.type('jeans');
        await expect(searchBox).toHaveValue('jeans');




    });

 

test('Keyboard Enter submit search', async ({ page }) => {

  await page.getByRole('link', { name: 'Products' }).click();
  await page.waitForURL(/products/);

  await expect(page).toHaveURL(/products/);

  await page.getByPlaceholder('Search Product').fill('Shirts');

  // Enter does not trigger search on this site
  // await page.keyboard.press('Enter');

  await page.locator('#submit_search').click();

  await page.waitForURL(/search/);

  await expect(page).toHaveURL(/search/);

});



});

