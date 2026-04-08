import { expect, test } from '@playwright/test';
import { owner, severity, story } from 'allure-js-commons';
import { CartPage } from '../src/pages/CartPage';

test('Add first product to cart @regression', { tag: '@regression' }, async ({ page }) => {
  owner('Shubham');
  severity('critical');
  story('Add to cart');

  const cartPage = new CartPage(page);
  await cartPage.addFirstProductToCart();
  await cartPage.continueShoppingFromModal();
  await cartPage.goToCart();

  await expect(cartPage.cartInfoTable).toBeVisible();
});

test('Cart quantity shows 1 item @regression', { tag: '@regression' }, async ({ page }) => {
  owner('Shubham');
  severity('normal');
  story('Cart quantity');

  const cartPage = new CartPage(page);

  // Ensure there is at least one item to assert quantity
  await cartPage.addFirstProductToCart();
  await cartPage.goToCart();

  const qty = await cartPage.getCartItemCount();
  expect(qty).toBe(1);
});

test('Remove item from cart @regression', { tag: '@regression' }, async ({ page }) => {
  owner('Shubham');
  severity('critical');
  story('Remove from cart');

  const cartPage = new CartPage(page);

  // Ensure there is at least one item to remove
  await cartPage.addFirstProductToCart();
  await cartPage.goToCart();

  await cartPage.removeFirstCartItem();
  await expect(cartPage.emptyCartContainer).toBeVisible();
});

