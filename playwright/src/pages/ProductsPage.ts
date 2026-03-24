import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// ProductsPage wraps the /products screen.
// This is where the search feature lives — search box is only on this page.
export class ProductsPage extends BasePage {
  // ── LOCATORS ──────────────────────────────────────────────────────────────
  readonly productCards: Locator;  // each product result card on the page
  readonly searchInput: Locator;   // the search text input box
  readonly searchButton: Locator;  // the search submit button

  constructor(page: Page) {
    // super(page) runs BasePage constructor first — stores this.page
    super(page);

    // .productinfo wraps each product card — used to COUNT results
    this.productCards = page.locator('.productinfo');

    // Placeholder text selector — the search box on /products
    this.searchInput  = page.getByPlaceholder('Search Product');

    // CSS id for the search submit button
    this.searchButton = page.locator('#submit_search');
  }

  // ── ACTIONS ───────────────────────────────────────────────────────────────

  // searchFor() — fills the search box and submits.
  // After this call: URL changes and results (or empty) are displayed.
  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);  // type the search term
    await this.searchButton.click();    // press the search button
  }

  // getProductCount() — returns the number of product cards on screen.
  // Tests use this: expect(count).toBeGreaterThan(0) or expect(count).toBe(0)
  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }
}
