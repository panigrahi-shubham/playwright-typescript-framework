import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly pageHeading: Locator;
  readonly productCards: Locator;
  readonly firstProduct: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productCards = page.locator('.productinfo');
    this.firstProduct = this.productCards.first();
  }

  async isResultsHeadingVisible(): Promise<boolean> {
    return await this.pageHeading.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async clickFirstProduct(): Promise<void> {
    await this.firstProduct.getByRole('link', { name: 'View Product' }).click();
  }
}
