import { expect, test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

test('Home page loads with correct title @smoke', { tag: '@smoke' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('critical');
  allure.story('Home Page');

  const home = new HomePage(page);
  await home.goToHome();

  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(home.navProducts).toBeVisible();
  await expect(home.navCart).toBeVisible();
  await expect(home.navSignupLogin).toBeVisible();
  await expect(home.featuredProductCards.first()).toBeVisible();
});

test('Products page loads all products @smoke', { tag: '@smoke' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('critical');
  allure.story('Products Page');

  const productsPage = new ProductsPage(page);
  await productsPage.goToProducts();

  await expect(page).toHaveURL(/\/products/);
  await expect(productsPage.allProductsHeading).toBeVisible();

  const count = await productsPage.productCards.count();
  expect(count).toBeGreaterThan(0);
});

test('Search for "dress" returns relevant results @smoke', { tag: '@smoke' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('critical');
  allure.story('Search');

  const productsPage = new ProductsPage(page);
  await productsPage.goToProducts();
  await productsPage.searchFor('dress');

  await expect(page).toHaveURL(/\/products/);

  const count = await productsPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});

test('Login page renders with form fields visible @smoke', { tag: '@smoke' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('critical');
  allure.story('Login');

  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();

  await expect(page).toHaveURL(/\/login/);
  await expect(loginPage.loginFormHeading).toBeVisible();
  await expect(loginPage.loginEmail).toBeVisible();
  await expect(loginPage.loginPassword).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('Footer subscription form is present on home page @smoke', { tag: '@smoke' }, async ({ page }) => {
  allure.owner('Shubham');
  allure.severity('normal');
  allure.story('Subscription');

  const home = new HomePage(page);
  await home.goToHome();

  await home.subscriptionHeading.scrollIntoViewIfNeeded();
  await expect(home.subscriptionHeading).toBeVisible();
  await expect(home.subscriptionEmail).toBeVisible();
  await expect(home.subscriptionSubmit).toBeVisible();
});
