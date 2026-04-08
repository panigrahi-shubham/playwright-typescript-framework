import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly firstProductCard: Locator;
  readonly firstProductAddToCart: Locator;
  readonly continueShoppingButton: Locator;
  readonly modalViewCartLink: Locator;
  readonly navCartLink: Locator;

  readonly cartInfoTable: Locator;
  readonly cartQuantityButtons: Locator;
  readonly removeFromCartButtons: Locator;
  readonly emptyCartContainer: Locator;
  readonly cartEmptyText: Locator;
  readonly addToCartModal: Locator;

  constructor(page: Page) {
    super(page);

    // Products listing
    this.firstProductCard = page.locator('.product-image-wrapper').first();
    // AutomationExercise often renders multiple "Add to cart" anchors per product card.
    // Scope to the first product card and pick the first match to avoid strict-mode ambiguity.
    this.firstProductAddToCart = this.firstProductCard.locator('a.add-to-cart').first();

    // Add-to-cart modal actions
    this.addToCartModal = page.locator('.modal-content').filter({ hasText: /Added!/i });

    // Prefer data-qa when present, otherwise fall back to the modal button used by the site.
    this.continueShoppingButton = page
      .locator('[data-qa="continue-shopping"]')
      .or(page.locator('.modal-content button[data-dismiss="modal"]').filter({ hasText: /Continue Shopping/i }))
      .or(page.getByRole('button', { name: /Continue Shopping/i }))
      .first();

    // In the add-to-cart modal the primary action is "View Cart".
    this.modalViewCartLink = page
      .locator('[data-qa="view-cart"]')
      .or(page.locator('.modal-content a[href="/view_cart"]'))
      .or(page.getByRole('link', { name: /View Cart/i }))
      .first();

    // Header/nav cart
    this.navCartLink = page.locator('a[href="/view_cart"]').first();

    // Cart page
    this.cartInfoTable = page.locator('#cart_info_table');
    this.cartQuantityButtons = page.locator('.cart_quantity button');
    this.removeFromCartButtons = page.locator('[data-qa="remove-from-cart"]').or(page.locator('.cart_quantity_delete'));
    this.emptyCartContainer = page.locator('#empty_cart');
    this.cartEmptyText = page.getByText(/Cart is empty!/i);
  }

  async addFirstProductToCart(): Promise<void> {
    await this.navigate('/products');
    await expect(this.firstProductCard).toBeVisible();
    await this.firstProductCard.hover();
    await expect(this.firstProductAddToCart).toBeVisible();
    await this.firstProductAddToCart.click();
    await expect(this.addToCartModal).toBeVisible();
  }

  async continueShoppingFromModal(): Promise<void> {
    await expect(this.continueShoppingButton).toBeVisible();
    await this.continueShoppingButton.click();
  }

  async goToCart(): Promise<void> {
    // If the add-to-cart modal is open, use its "View Cart" action.
    if (await this.addToCartModal.isVisible().catch(() => false)) {
      await this.modalViewCartLink.click();
    } else {
      await this.navCartLink.click();
    }

    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  async getCartItemCount(): Promise<number> {
    // Cart can legitimately be empty (no table rendered).
    if (await this.cartEmptyText.isVisible().catch(() => false)) {
      return 0;
    }

    await expect(this.cartInfoTable).toBeVisible();

    // AutomationExercise displays quantity in a button within .cart_quantity
    const qtyText: string | null = await this.cartQuantityButtons.first().textContent();
    const qty = Number.parseInt((qtyText ?? '').trim(), 10);
    return Number.isFinite(qty) ? qty : 0;
  }

  async removeFirstCartItem(): Promise<void> {
    await this.navigate('/view_cart');
    await expect(this.cartInfoTable).toBeVisible();
    await this.removeFromCartButtons.first().click();
  }
}

