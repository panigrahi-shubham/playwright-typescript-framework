// tests/e2e/full-framework.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// THIS FILE proves all layers of the framework work together.
// When an interviewer says "walk me through your code" — open this file.
// ─────────────────────────────────────────────────────────────────────────────

// ── IMPORTS ───────────────────────────────────────────────────────────────────

// IMPORT 1: from YOUR fixtures file (not from @playwright/test directly).
// This gives us: the extended test that knows homePage, loginPage, productsPage.
// Path note: this file is in tests/e2e/ — go up ONE level to reach tests/fixtures
import { test, expect } from '../fixtures';
import { allure } from 'allure-playwright';

// IMPORT 2: typed test data from the data layer.
// validUser  → IUser  — TypeScript checks email and password exist.
// searchScenarios → ISearchTest[] — includes the negative test case.
import { validUser, searchScenarios } from '../../data/testdata';

// IMPORT 3: helper function from the utils layer.
// generateRandomEmail() returns a unique email string every time it is called.
import { generateRandomEmail } from '../../utils/helpers';

// IMPORT 4: typed URL and message constants from utils layer.
// URLS.BASE is typed as const — a literal string, not just any string.
import { URLS, MESSAGES } from '../../utils/constants';

const hasConfiguredAuth =
  process.env.RUN_AUTH_TESTS === 'true' &&
  !!process.env.TEST_EMAIL &&
  !!process.env.TEST_PASSWORD &&
  process.env.TEST_EMAIL !== 'your_test_email@example.com' &&
  process.env.TEST_PASSWORD !== 'your_test_password';

// ─────────────────────────────────────────────────────────────────────────────
// TEST 1: Valid Login
// ─────────────────────────────────────────────────────────────────────────────
// What it uses: loginPage fixture + validUser from data/testdata.ts
// loginPage fixture already navigated to /login BEFORE this test started.
// login() fills email, fills password, clicks button — all in ONE call.
test('valid login redirects to account page', async ({ loginPage }) => {
  allure.owner('Shubham');
  allure.severity('critical');
  allure.story('Login flow');
  allure.feature('Authentication');
  allure.epic('Core Platform');

  test.skip(
    !hasConfiguredAuth,
    'Set RUN_AUTH_TESTS=true with valid TEST_EMAIL and TEST_PASSWORD to run real login checks.',
  );

  await loginPage.login(validUser.email, validUser.password);

  // After a successful login, automationexercise.com redirects to /account
  await expect(loginPage.page).toHaveURL(/account/);
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 2: Invalid Login (Negative Test)
// ─────────────────────────────────────────────────────────────────────────────
// loginPage fixture still navigates to /login — but wrong credentials are used.
// isErrorVisible() returns a boolean — true if the red error text is on screen.
test('invalid login shows error message', async ({ loginPage }) => {
  allure.owner('Shubham');
  allure.severity('normal');
  allure.story('Login flow');
  allure.feature('Authentication');
  allure.epic('Core Platform');

  await loginPage.login('nobody@nowhere.com', 'wrongpassword');

  await loginPage.waitForErrorMessage();
  await expect(loginPage.errorMessage).toContainText(MESSAGES.LOGIN_ERROR);
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 3: Data-Driven Search (Parametrised)
// ─────────────────────────────────────────────────────────────────────────────
// Uses: productsPage fixture + searchScenarios (ISearchTest[]) from testdata.ts
// One for...of loop handles ALL scenarios including the negative one.
// Playwright runs the test block once per scenario — 3 test cases total:
//   Run 1: term="jeans",               shouldHaveResults=true
//   Run 2: term="shirt",               shouldHaveResults=true
//   Run 3: term="xyznotarealproduct999", shouldHaveResults=false  ← NEGATIVE
test.describe('Search — data driven', () => {
  for (const scenario of searchScenarios) {

    // Dynamic test name: "Search: "jeans"", "Search: "shirt"", etc.
    test(`Search: "${scenario.term}"`, async ({ productsPage }) => {
      allure.owner('Shubham');
      allure.severity('normal');
      allure.story('Product Search');
      allure.feature('Search');
      allure.epic('Core Platform');

      // productsPage is already at /products (fixture navigated for us)
      await productsPage.searchFor(scenario.term);

      // URL should contain "products" after every search
      await expect(productsPage.page).toHaveURL(new RegExp(scenario.expectedInURL));

      if (scenario.shouldHaveResults) {
        // POSITIVE case: at least one product card must be visible
        const count = await productsPage.getProductCount();
        expect(count).toBeGreaterThan(0);
      } else {
        // NEGATIVE case: zero product cards should appear for nonsense term
        await expect(productsPage.productCards).toHaveCount(0);
      }
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 4: Dynamic Email With Helper
// ─────────────────────────────────────────────────────────────────────────────
// generateRandomEmail() is called at runtime — different value every test run.
// This test verifies the helper function itself works correctly.
test('generated email has correct format', async ({ homePage }) => {
  allure.owner('Shubham');
  allure.severity('minor');
  allure.story('Test Utilities');
  allure.feature('Helpers');
  allure.epic('Core Platform');

  // homePage fixture navigated to the homepage — we just need any page context
  const email = generateRandomEmail();  // e.g. "test_pjx4k2@mail.com"

  expect(email).toContain('@');          // must have @ symbol
  expect(email).toContain('test_');      // must start with test_
  expect(email).toMatch(/^test_[a-z0-9]+@/); // format validated by regex
});

// ─────────────────────────────────────────────────────────────────────────────
// TEST 5: Constants Are Correct Strings
// ─────────────────────────────────────────────────────────────────────────────
// Verifies URLS and MESSAGES from constants.ts are wired up correctly.
// These constants are imported across the whole framework — worth a smoke test.
test('constants have expected values', async ({ homePage }) => {
  allure.owner('Shubham');
  allure.severity('trivial');
  allure.story('Configuration');
  allure.feature('Constants');
  allure.epic('Core Platform');

  expect(URLS.BASE).toBe('https://automationexercise.com');
  expect(URLS.LOGIN).toBe('https://automationexercise.com/login');
  expect(MESSAGES.LOGIN_ERROR).toContain('incorrect');
});
