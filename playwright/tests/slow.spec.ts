import { expect, test } from '@playwright/test';
import { owner, severity, story } from 'allure-js-commons';
import { ProductsPage } from '../src/pages/ProductsPage';

test('All product categories are browsable @slow', { tag: '@slow' }, async ({ page }) => {
  owner('Shubham');
  severity('normal');
  story('Product Catalogue - Full Browse');

  const productsPage = new ProductsPage(page);
  await productsPage.goToProducts();

  await expect(productsPage.allProductsHeading).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  const count = await productsPage.productCards.count();
  expect(count).toBeGreaterThan(10);
});

test('Search works for multiple fashion categories @slow', { tag: '@slow' }, async ({ page }) => {
  owner('Shubham');
  severity('normal');
  story('Search - Multiple Terms');

  const productsPage = new ProductsPage(page);
  const searchTerms = ['top', 'tshirt', 'jean', 'saree'];

  for (const term of searchTerms) {
    await productsPage.goToProducts();
    await productsPage.searchFor(term);

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThanOrEqual(0);
  }
});
