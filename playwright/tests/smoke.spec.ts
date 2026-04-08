import { expect, test } from '@playwright/test';
import { owner, severity, story } from 'allure-js-commons';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

test('Home page loads with correct title @smoke', { tag: '@smoke' }, async ({ page }) => {
  owner('Shubham');
  severity('critical');
  story('Home Page');

  const home = new HomePage(page);
  await home.goToHome();

  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(page).toHaveURL(/https:\/\/(www\.)?automationexercise\.com\/?/); // Added: user-visible breakage if the app redirects/lands on wrong host
  await expect(home.logo).toBeVisible(); // Added: primary branding element a user expects on a healthy home page
  await expect(home.navProducts).toBeVisible();
  await expect(home.navCart).toBeVisible();
  await expect(home.navSignupLogin).toBeVisible();
  await expect(home.sliderCarousel).toBeVisible(); // Added: homepage hero carousel is a key above-the-fold element
  await expect(home.featuredProductCards.first()).toBeVisible();
});

test('Products page loads all products @smoke', { tag: '@smoke' }, async ({ page }) => {
  owner('Shubham');
  severity('critical');
  story('Products Page');

  const productsPage = new ProductsPage(page);
  await productsPage.goToProducts();

  await expect(page).toHaveURL(/\/products/);
  await expect(productsPage.allProductsHeading).toBeVisible();
  await expect(productsPage.productCards.first()).toBeVisible(); // Added: ensures at least one product card is actually rendered, not just counted later

  const count = await productsPage.productCards.count();
  expect(count).toBeGreaterThan(0);
});

test('Search for "dress" returns relevant results @smoke', { tag: '@smoke' }, async ({ page }) => {
  owner('Shubham');
  severity('critical');
  story('Search');

  const productsPage = new ProductsPage(page);
  await productsPage.goToProducts();
  await productsPage.searchFor('dress');

  await expect(page).toHaveURL(/\/products/);
  await expect(productsPage.searchedProductsHeading).toBeVisible(); // Added: user-visible confirmation that the search results section loaded

  const count = await productsPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});

test('Login page renders with form fields visible @smoke', { tag: '@smoke' }, async ({ page }) => {
  owner('Shubham');
  severity('critical');
  story('Login');

  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();

  await expect(page).toHaveURL(/\/login/);
  await expect(loginPage.loginFormHeading).toBeVisible();
  await expect(loginPage.loginEmail).toBeVisible();
  await expect(loginPage.loginPassword).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('Footer subscription form is present on home page @smoke', { tag: '@smoke' }, async ({ page }) => {
  owner('Shubham');
  severity('normal');
  story('Subscription');

  const home = new HomePage(page);
  await home.goToHome();

  await home.subscriptionHeading.scrollIntoViewIfNeeded();
  await expect(home.subscriptionHeading).toBeVisible();
  await expect(home.subscriptionEmail).toBeVisible();
  await expect(home.subscriptionSubmit).toBeVisible();
});
