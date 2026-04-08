import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProducts: Locator;
  readonly productCards: Locator;
  readonly allProductsHeading: Locator;
  readonly searchedProductsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product'); // #search_product: unique id; stable and fast
    this.searchButton = page.locator('#submit_search'); // #submit_search: unique id; shared across pages but unique within DOM
    this.searchedProducts = page.locator('.productinfo'); // .productinfo: no data-qa; stable product info card class used in results grid
    this.productCards = page.locator('.features_items .product-image-wrapper'); // CSS container scoping: stable section/classes for products grid
    this.allProductsHeading = page.locator('h2:has-text("All Products")'); // :has-text('All Products'): no data-qa; heading text is stable UX copy
    this.searchedProductsHeading = page.locator('h2:has-text("Searched Products")'); // :has-text('Searched Products'): no data-qa; heading text is stable UX copy
  }

  async goToProducts(): Promise<void> {
    await this.navigate('/products');
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getProductCount(): Promise<number> {
    return this.searchedProducts.count();
  }
}
