import { expect, test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

test('Search for nonexistent product shows zero results @regression', { tag: '@regression' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('normal');
  allure.story('Search - Negative');

  const productsPage = new ProductsPage(page);
  await productsPage.goToProducts();
  await productsPage.searchFor('xyzzy_does_not_exist_12345');

  await expect(productsPage.searchedProductsHeading).toBeVisible();

  const count = await productsPage.productCards.count();
  expect(count).toBe(0);
});

test('Login with invalid credentials shows error message @regression', { tag: '@regression' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('normal');
  allure.story('Login - Negative');

  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.loginWith('invalid@example.com', 'WrongPassword99');

  await expect(page).toHaveURL(/\/login/);
  await expect(loginPage.loginErrorText).toBeVisible();
});

test('Login with empty fields does not submit successfully @regression', { tag: '@regression' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('minor');
  allure.story('Login - Empty Fields');

  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.loginButton.click();

  await expect(page).toHaveURL(/\/login/);
  await expect(loginPage.loginEmail).toBeVisible();
});

test('Cart page is accessible from home navigation @regression', { tag: '@regression' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('normal');
  allure.story('Cart Navigation');

  const home = new HomePage(page);
  await home.goToHome();
  await home.navCart.click();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(page.locator('li.active')).toContainText('Shopping Cart');
});

test('Subscription with empty email shows validation @regression', { tag: '@regression' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('minor');
  allure.story('Subscription - Negative');

  const home = new HomePage(page);
  await home.goToHome();
  await home.subscriptionHeading.scrollIntoViewIfNeeded();
  await home.subscriptionSubmit.click();

  await expect(home.subscriptionSuccess).not.toBeVisible();
  await expect(page).toHaveURL(/https:\/\/(www\.)?automationexercise\.com\/?/);
});
