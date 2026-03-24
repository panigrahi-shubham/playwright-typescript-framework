// tests/fixtures.ts
// ─────────────────────────────────────────────────────────────────────────────
// WHY THIS FILE EXISTS:
// Instead of importing from "@playwright/test" in every spec file, you import
// from this file. This gives every spec: the extended test function + expect.
// ─────────────────────────────────────────────────────────────────────────────

// "test as base" — rename the original Playwright test so we can create our own.
// "expect" — re-exported at the bottom so specs only need ONE import.
import { test as base, expect } from '@playwright/test';
import { HomePage }     from '../src/pages/HomePage';
import { LoginPage }    from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

// ── TYPE ALIAS ────────────────────────────────────────────────────────────────
// Tells TypeScript what custom fixtures we are adding.
// Without this, TypeScript flags { homePage } / { loginPage } as unknown params.
type PageFixtures = {
  homePage: HomePage;       // any test can request this in its parameters
  loginPage: LoginPage;     // any test can request this in its parameters
  productsPage: ProductsPage; // any test can request this in its parameters
};

// ── EXTENDED TEST FUNCTION ─────────────────────────────────────────────────────
// base.extend<PageFixtures>({ ... }) returns a NEW test function.
// <PageFixtures> tells TypeScript which fixtures we added.
// Each property inside { } is one fixture definition.
export const test = base.extend<PageFixtures>({

  // ── FIXTURE: homePage ───────────────────────────────────────────────────────
  // Receives { page } from Playwright (built-in fixture).
  // Receives use() — the function that hands the fixture value to the test.
  homePage: async ({ page }, use) => {
    // SETUP — runs before the test (like beforeEach)
    const homePage = new HomePage(page);
    await homePage.navigateTo('https://automationexercise.com');

    // use() — pauses here, runs the test, then resumes for teardown
    await use(homePage);

    // TEARDOWN — runs after the test (Playwright closes the page automatically)
  },

  // ── FIXTURE: loginPage ──────────────────────────────────────────────────────
  // Same pattern — navigates to /login before the test starts.
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://automationexercise.com/login');
    await use(loginPage);
  },

  // ── FIXTURE: productsPage ───────────────────────────────────────────────────
  // Navigates to /products before the test starts.
  // The search box (#search_product) only exists on this page.
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigateTo('https://automationexercise.com/products');
    await use(productsPage);
  },
});

// ── RE-EXPORT expect ───────────────────────────────────────────────────────────
// Spec files import BOTH test and expect from this one file:
//   import { test, expect } from "../fixtures";
// This means every spec file has ONE import line instead of two.
export { expect };