import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly productsSearchBox: Locator;
  readonly productsSearchButton: Locator;
  readonly logo: Locator;
  readonly navProducts: Locator;
  readonly navCart: Locator;
  readonly navSignupLogin: Locator;
  readonly navLoggedInUser: Locator;
  readonly navLogout: Locator;
  readonly sliderCarousel: Locator;
  readonly subscriptionHeading: Locator;
  readonly subscriptionEmail: Locator;
  readonly subscriptionSubmit: Locator;
  readonly subscriptionSuccess: Locator;
  readonly featuredProductCards: Locator;
  readonly firstViewProduct: Locator;

  constructor(page: Page) {
    super(page);
    this.productsSearchBox = page.getByPlaceholder('Search Product');
    this.productsSearchButton = page.locator('#submit_search');
    this.logo = page.getByRole('link', { name: 'Website for automation practice' });
    this.navProducts = page.locator('a[href="/products"]').first();
    this.navCart = page.locator('a[href="/view_cart"]').first();
    this.navSignupLogin = page.locator('a[href="/login"]').first();
    this.navLoggedInUser = page.locator('li a:has-text(" Logged in as")');
    this.navLogout = page.locator('a[href="/logout"]').first();
    this.sliderCarousel = page.locator('#slider-carousel');
    this.subscriptionHeading = page.locator('h2:has-text("Subscription")').first();
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionSubmit = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('.alert-success.alert');
    this.featuredProductCards = page.locator('.features_items .product-image-wrapper');
    this.firstViewProduct = page.locator('.choose a').first();
  }

  async goToHome(): Promise<void> {
    await this.navigate('/');
  }

  async searchFor(term: string): Promise<void> {
    await this.goToProducts();
    await expect(this.productsSearchBox).toBeVisible();
    await this.productsSearchBox.fill(term);
    await this.productsSearchButton.click();
  }

  async isLogoVisible(): Promise<boolean> {
    return this.logo.isVisible();
  }

  async clickProducts(): Promise<void> {
    await this.navProducts.click();
  }

  async goToProducts(): Promise<void> {
    await this.navProducts.click();
  }

  async goToLogin(): Promise<void> {
    await this.navSignupLogin.click();
  }

  async subscribeWithEmail(email: string): Promise<void> {
    await this.subscriptionEmail.fill(email);
    await this.subscriptionSubmit.click();
  }
}
