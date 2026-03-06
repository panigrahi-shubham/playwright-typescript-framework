import {test,expect } from '@playwright/test';

test.describe('Locator Practice', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('getByRole - navigate to Products page', async ({ page }) => {
        await page.getByRole('link', { name: 'Products' }).click();
        await expect(page).toHaveURL(/products/);
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });

     // ───────────────────────────────── 
  // TEST 2: getByRole — textbox 
  // ───────────────────────────────── 
  test('getByRole - search box on products page', async ({ page }) => { 
    await page.goto('/products'); 
    // override beforeEach for this test — search box is on /products not homepage 
    const searchBox = page.getByRole('textbox', { name: 'Search Product' }); 
    // getByRole('textbox') → finds text input fields 
    // { name: 'Search Product' } → matches aria-label or associated label 
    // This is what we discovered on Day 1 — getByPlaceholder didn't work here 
    await searchBox.fill('Jeans'); 
    // fill() → clear + type instantly 
    await expect(searchBox).toHaveValue('Jeans'); 
    // toHaveValue() → checks value INSIDE input field 
    // different from toHaveText() which is for divs/spans 
  });

  test('getByAltText - logo is visible', async({page}) => {
    const logo= page.getByAltText('Website for automation practice');

    await expect(logo).toBeVisible();
    
    await expect(logo).toHaveAttribute('src', /logo/);
    // regex: verified correct image file loaded
  })

   // ───────────────────────────────── 
  // TEST 4: getByText — headings and text 
  // ───────────────────────────────── 
  test('getByText - subscription heading in footer', async ({ page }) => { 
    const subscriptionHeading = page.getByText('Subscription'); 
    // getByText() → finds any element containing this visible text 
    // works for h1, h2, div, span, p — any element 
    await expect(subscriptionHeading).toBeVisible(); 
    // verify the Subscription section exists in footer 
    // scroll to bottom first if element is not in viewport: 
    await subscriptionHeading.scrollIntoViewIfNeeded(); 
    // scrollIntoViewIfNeeded() → scrolls page until element is visible 
    // only scrolls if element is outside current viewport 
    // safe to call always — does nothing if already visible 
    await expect(subscriptionHeading).toBeVisible(); 
    // verify again after scroll 
  });
  // ───────────────────────────────── 
  // TEST 5: locator() with CSS ID — last resort 
  // ───────────────────────────────── 
  test('locator CSS id - submit search button', async ({ page }) => { 
    await page.goto('/products'); 
    // navigate to products page where search exists 
    await page.getByRole('textbox', { name: 'Search Product' }).fill('shirt'); 
    // fill search box using Priority 1 locator 
    await page.locator('#submit_search').click(); 
    // locator('#submit_search') → CSS id selector 
    // WHY not getByRole here? The button has NO visible text — only an icon 
    // getByRole('button', { name: 'Search' }) would fail 
    // CSS id is acceptable because: 
    //   1. IDs are meant to be unique in HTML 
    //   2. This ID looks intentionally named (not auto-generated) 
    //   3. All semantic locators fail for this specific element 
    await expect(page).toHaveURL(/search/); 
    // verify search was performed — URL changed 
    await expect(page.getByText('Searched Products')).toBeVisible(); 
    // verify results heading appeared 
  });
  // ───────────────────────────────── 
  // TEST 6: chaining locators — filter 
  // ───────────────────────────────── 
  test('chaining - find specific element in a list', async ({ page }) => { 
    await page.goto('/products'); 
    // navigate to products listing page 
    await page.getByRole('textbox', { name: 'Search Product' }).fill('Top'); 
    await page.locator('#submit_search').click(); 
    // search for products containing 'Top' 
    await expect(page.getByText('Searched Products')).toBeVisible(); 
    // wait for results to appear 
    const productCount = await page.locator('.productinfo').count(); 
    // .count() → returns number of matching elements 
    // useful for asserting how many results returned 
    // productCount is a number — no await on the assignment, just on count() 
    expect(productCount).toBeGreaterThan(0); 
    // verify at least one product was found 
    // toBeGreaterThan() → numerical comparison assertion 
    // no await needed here — productCount is already a number, not a promise 
  });

});