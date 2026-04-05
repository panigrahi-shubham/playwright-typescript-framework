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
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProducts = page.locator('.productinfo');
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.allProductsHeading = page.locator('h2:has-text("All Products")');
    this.searchedProductsHeading = page.locator('h2:has-text("Searched Products")');
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
