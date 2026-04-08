import { expect, test } from '@playwright/test';
import { feature, owner, severity, story } from 'allure-js-commons';

const productsPathPattern = '**/products';
const searchPathPattern = '**/products?search=*';
const productImagePattern = '**/get_product_picture/*';

type ProductCard = {
  id: number;
  name: string;
  price: string;
};

function annotate(storyName: string, severityLevel: 'minor' | 'normal' | 'critical' = 'normal'): void {
  owner('Shubham');
  severity(severityLevel);
  story(storyName);
  feature('Network Interception');
}

function buildProductsHtml(title: string, heading: string, products: ProductCard[], extraSidebarItem?: string): string {
  const cards = products
    .map(
      product => `
        <div class="product-image-wrapper">
          <div class="single-products">
            <div class="productinfo text-center">
              <img src="/get_product_picture/${product.id}" alt="ecommerce website products">
              <h2>${product.price}</h2>
              <p>${product.name}</p>
              <a class="btn btn-default add-to-cart">Add to cart</a>
            </div>
          </div>
          <ul class="nav nav-pills nav-justified">
            <li><a href="/product_details/${product.id}">View Product</a></li>
          </ul>
        </div>`,
    )
    .join('');

  const sidebarItem = extraSidebarItem ? `<li><a href="/brand_products/${extraSidebarItem}">${extraSidebarItem}</a></li>` : '';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body>
        <section>
          <div class="left-sidebar">
            <div class="brands_products">
              <h2>Brands</h2>
              <div class="brands-name">
                <ul class="nav nav-pills nav-stacked">
                  <li><a href="/brand_products/Polo">Polo</a></li>
                  ${sidebarItem}
                </ul>
              </div>
            </div>
          </div>
          <div class="features_items">
            <h2 class="title text-center">${heading}</h2>
            ${cards}
          </div>
        </section>
      </body>
    </html>`;
}

test('Products page renders mock products from intercepted document response @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Mock products document');

  await page.route(productsPathPattern, async route => {
    const url = new URL(route.request().url());
    if (url.searchParams.has('search')) {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: buildProductsHtml('Automation Exercise - Mock Products', 'All Products', [
        { id: 9001, name: 'Mock Playwright T-Shirt', price: 'Rs. 999' },
      ]),
    });
  });

  await page.goto('/products');

  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('h2:has-text("All Products")')).toBeVisible();
  await expect(page.locator('.features_items .product-image-wrapper')).toHaveCount(1);
  await expect(page.locator('.productinfo')).toContainText('Mock Playwright T-Shirt');
});

test('Products page handles empty intercepted document response @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Empty products document');

  await page.route(productsPathPattern, async route => {
    const url = new URL(route.request().url());
    if (url.searchParams.has('search')) {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: buildProductsHtml('Automation Exercise - Empty Products', 'All Products', []),
    });
  });

  await page.goto('/products');

  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('h2:has-text("All Products")')).toBeVisible();
  await expect(page.locator('.features_items .product-image-wrapper')).toHaveCount(0);
});

test('Products page surfaces a mocked 500 document response @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Server error response');

  await page.route(productsPathPattern, async route => {
    const url = new URL(route.request().url());
    if (url.searchParams.has('search')) {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 500,
      contentType: 'text/html',
      body: '<html><head><title>Automation Exercise - Server Error</title></head><body><h1>Internal Server Error</h1></body></html>',
    });
  });

  const response = await page.goto('/products');

  expect(response?.status()).toBe(500);
  await expect(page).toHaveURL(/\/products/);
  await expect(page).toHaveTitle(/Server Error/);
  await expect(page.locator('h1')).toContainText('Internal Server Error');
});

test('Products page stays readable when product images are aborted @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Abort asset requests');

  await page.route(productImagePattern, async route => {
    await route.abort('failed');
  });

  await page.goto('/products');

  await expect(page).toHaveURL(/\/products/);
  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(page.locator('h2:has-text("All Products")')).toBeVisible();
  await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();
});

test('Search results show mock data from intercepted search page @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Mock search results');

  let capturedSearchTerm = '';

  await page.route(searchPathPattern, async route => {
    const url = new URL(route.request().url());
    capturedSearchTerm = url.searchParams.get('search') ?? '';

    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: buildProductsHtml('Automation Exercise - Search Results', 'Searched Products', [
        { id: 8001, name: 'Mock Dress', price: 'Rs. 1500' },
      ]),
    });
  });

  await page.goto('/products');
  await page.fill('#search_product', 'dress');
  await page.click('#submit_search');

  await expect(page).toHaveURL(/\/products\?search=dress/);
  expect(capturedSearchTerm).toBe('dress');
  await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();
  await expect(page.locator('.features_items .product-image-wrapper')).toHaveCount(1);
  await expect(page.locator('.productinfo')).toContainText('Mock Dress');
});

test('Products document can be augmented with an injected brand using fetch-and-modify @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Fetch and modify document', 'minor');

  await page.route(productsPathPattern, async route => {
    const url = new URL(route.request().url());
    if (url.searchParams.has('search')) {
      await route.continue();
      return;
    }

    const realResponse = await route.fetch();
    const realHtml = await realResponse.text();
    const brandsSectionStart = realHtml.indexOf('brands-name');
    const brandsListEnd = realHtml.indexOf('</ul>', brandsSectionStart);
    const injectedHtml =
      brandsSectionStart !== -1 && brandsListEnd !== -1
        ? `${realHtml.slice(0, brandsListEnd)}<li><a href="/brand_products/Playwright Test Brand">Playwright Test Brand</a></li>${realHtml.slice(brandsListEnd)}`
        : realHtml;

    await route.fulfill({
      response: realResponse,
      body: injectedHtml,
    });
  });

  await page.goto('/products');

  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('h2:has-text("All Products")')).toBeVisible();
  await expect(page.locator('.brands-name')).toContainText('Playwright Test Brand');
});

test('Products search makes a GET request to /products with the expected query @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Request verification');

  await page.goto('/products');
  const requestPromise = page.waitForRequest(request => request.url().includes('/products?search='));

  await page.fill('#search_product', 'dress');
  await page.click('#submit_search');

  const request = await requestPromise;
  const url = new URL(request.url());

  expect(request.method()).toBe('GET');
  expect(url.pathname).toBe('/products');
  expect(url.searchParams.get('search')).toBe('dress');
});

test('Search page returns HTTP 200 and the searched products heading @network @regression', { tag: ['@network', '@regression'] }, async ({ page }) => {
  annotate('Response verification');

  await page.goto('/products');
  const responsePromise = page.waitForResponse(response => response.url().includes('/products?search='));

  await page.fill('#search_product', 'dress');
  await page.click('#submit_search');

  const response = await responsePromise;
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain('Searched Products');
  expect(html).toContain('dress');
});
