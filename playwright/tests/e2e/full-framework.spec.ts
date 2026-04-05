import { test, expect } from '../fixtures';
import { allure } from 'allure-playwright';
import { validUser, searchScenarios } from '../../data/testdata';
import { generateRandomEmail } from '../../utils/helpers';
import { URLS, MESSAGES } from '../../utils/constants';

const hasConfiguredAuth =
  process.env.RUN_AUTH_TESTS === 'true' &&
  !!process.env.TEST_EMAIL &&
  !!process.env.TEST_PASSWORD &&
  process.env.TEST_EMAIL !== 'your_test_email@example.com' &&
  process.env.TEST_PASSWORD !== 'your_test_password';

test.describe('Full framework flow', () => {
  test.describe.configure({ mode: 'parallel' });

  test('valid login redirects to account page @smoke', async ({ loginPage }) => {
    allure.owner('Shubham');
    allure.severity('critical');
    allure.story('Login flow');
    allure.feature('Authentication');
    allure.epic('Core Platform');

    // Real credentials are optional, so keep local runs deterministic unless explicitly enabled.
    test.skip(
      !hasConfiguredAuth,
      'Set RUN_AUTH_TESTS=true with valid TEST_EMAIL and TEST_PASSWORD to run real login checks.',
    );

    await loginPage.login(validUser.email, validUser.password);
    await expect(loginPage.page).toHaveURL(/account/);
  });

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

  test.describe('Search - data driven', () => {
    for (const scenario of searchScenarios) {
      test(`Search: "${scenario.term}"`, async ({ productsPage }) => {
        allure.owner('Shubham');
        allure.severity('normal');
        allure.story('Product Search');
        allure.feature('Search');
        allure.epic('Core Platform');

        await productsPage.searchFor(scenario.term);
        await expect(productsPage.page).toHaveURL(new RegExp(scenario.expectedInURL));

        if (scenario.shouldHaveResults) {
          const count = await productsPage.getProductCount();
          expect(count).toBeGreaterThan(0);
          return;
        }

        await expect(productsPage.productCards).toHaveCount(0);
      });
    }
  });

  test('generated email has correct format', async () => {
    allure.owner('Shubham');
    allure.severity('minor');
    allure.story('Test Utilities');
    allure.feature('Helpers');
    allure.epic('Core Platform');

    const email = generateRandomEmail();

    expect(email).toContain('@');
    expect(email).toContain('test_');
    expect(email).toMatch(/^test_[a-z0-9]+@/);
  });

  test('constants have expected values @smoke', async () => {
    allure.owner('Shubham');
    allure.severity('trivial');
    allure.story('Configuration');
    allure.feature('Constants');
    allure.epic('Core Platform');

    expect(URLS.BASE).toBe('https://automationexercise.com');
    expect(URLS.LOGIN).toBe('https://automationexercise.com/login');
    expect(MESSAGES.LOGIN_ERROR).toContain('incorrect');
  });
});
