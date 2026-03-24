// tests/homepage.spec.ts
// Uses the homePage and productsPage fixtures from fixtures.ts.
// Each test has zero setup code — the fixture handles navigation.
import { test, expect } from './fixtures';

// ── TEST 1: Page Title ────────────────────────────────────────────────────────
// homePage fixture already navigated to automationexercise.com
test('homepage title is correct', async ({ homePage }) => {
  await expect(homePage.page).toHaveTitle(/Automation Exercise/);
});

// ── TEST 2: Logo Visibility ───────────────────────────────────────────────────
// homePage.logo is a Locator defined in HomePage.ts
test('logo is visible', async ({ homePage }) => {
  await expect(homePage.logo).toBeVisible();
});

// ── TEST 3: Search Box on Products Page ──────────────────────────────────────
// The search box (#search_product) only exists on /products — NOT the homepage.
// productsPage fixture navigates directly to /products before this test starts.
test('search box is present on products page', async ({ productsPage }) => {
  await expect(productsPage.searchInput).toBeVisible();
});
