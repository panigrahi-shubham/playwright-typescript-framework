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
    this.productsSearchBox = page.getByPlaceholder('Search Product'); // placeholder='Search Product': user-facing placeholder is stable; no data-qa available
    this.productsSearchButton = page.locator('#submit_search'); // #submit_search: unique id is stable and fast
    this.logo = page.getByRole('link', { name: 'Website for automation practice' }); // role=link + name: accessible locator; resilient to layout/CSS changes
    this.navProducts = page.locator('a[href="/products"]').first(); // a[href="/products"] + .first(): multiple nav instances; first is primary header link
    this.navCart = page.locator('a[href="/view_cart"]').first(); // a[href="/view_cart"] + .first(): multiple nav instances; first is primary header link
    this.navSignupLogin = page.locator('a[href="/login"]').first(); // a[href="/login"] + .first(): multiple nav instances; first is primary header link
    this.navLoggedInUser = page.locator('li a:has-text(" Logged in as")'); // :has-text('Logged in as'): no data-qa; text is the UX indicator we assert on
    this.navLogout = page.locator('a[href="/logout"]').first(); // a[href="/logout"] + .first(): multiple matches; first is the header/logout nav
    this.sliderCarousel = page.locator('#slider-carousel'); // #slider-carousel: unique id for homepage hero component
    this.subscriptionHeading = page.locator('h2:has-text("Subscription")').first(); // :has-text('Subscription') + .first(): text is stable; multiple headings possible
    this.subscriptionEmail = page.locator('#susbscribe_email'); // #susbscribe_email: unique id for subscription email field
    this.subscriptionSubmit = page.locator('#subscribe'); // #subscribe: unique id for subscription submit button
    this.subscriptionSuccess = page.locator('.alert-success.alert'); // .alert-success.alert: no data-qa; Bootstrap success alert is stable component class
    this.featuredProductCards = page.locator('.features_items .product-image-wrapper'); // CSS container scoping: stable section/classes for featured products grid
    this.firstViewProduct = page.locator('.choose a').first(); // .choose a + .first(): multiple "View Product" links; first is the primary/top item
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
