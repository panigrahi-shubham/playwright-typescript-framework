import { expect, test } from '@playwright/test';
import { feature, owner, severity, story } from 'allure-js-commons';
import { LoginPage } from '../src/pages/LoginPage';

test.use({ storageState: undefined });

test(
  'Login page renders all required fields @smoke @regression @auth',
  { tag: ['@smoke', '@regression', '@auth'] },
  async ({ page }) => {
    owner('Shubham');
    severity('critical');
    story('Login - Render');
    feature('Authentication');

    const loginPage = new LoginPage(page);
    await loginPage.goToLogin();

    await expect(page).toHaveURL(/\/login/);
    await expect(loginPage.loginFormHeading).toBeVisible();
    await expect(loginPage.loginEmail).toBeVisible();
    await expect(loginPage.loginPassword).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  },
);

test('Signup form renders alongside login form @regression @auth', { tag: ['@regression', '@auth'] }, async ({ page }) => {
  owner('Shubham');
  severity('normal');
  story('Signup - Render');

  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();

  const signupHeading = page.locator('h2:has-text("New User Signup!")');
  const signupName = page.locator('[data-qa="signup-name"]');
  const signupEmail = page.locator('[data-qa="signup-email"]');
  const signupButton = page.locator('[data-qa="signup-button"]');

  await expect(signupHeading).toBeVisible();
  await expect(signupName).toBeVisible();
  await expect(signupEmail).toBeVisible();
  await expect(signupButton).toBeVisible();
});
