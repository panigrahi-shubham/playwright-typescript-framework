import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly logo: Locator;
  readonly navProducts: Locator;

  constructor(page: Page) {
    
     super(page);
    this.searchBox = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');
    this.logo = page.getByAltText('Website for automation practice');
    this.navProducts = page.getByRole('link', { name: 'Products' });
  }

  async searchFor(term: string): Promise<void> {
    await this.navigateTo('/products');
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async clickProducts(): Promise<void> {
    await this.navProducts.click();
  }
}
