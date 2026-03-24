import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// LoginPage wraps the /login screen of automationexercise.com.
// It stores locators and exposes actions — tests never touch raw page calls.
export class LoginPage extends BasePage {
  // ── LOCATORS ──────────────────────────────────────────────────────────────
  // readonly: prevents accidental reassignment after construction
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginHeading: Locator;
  readonly errorMessage: Locator;   // red error text shown on failed login

  constructor(page: Page) {
    // super(page) MUST be first — triggers BasePage constructor to run,
    // which stores "page" as this.page. Without this, "this" is not available.
    super(page);

    // data-qa attributes are chosen because they are stable:
    // they survive CSS redesigns and class name changes.
    this.emailInput    = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton   = page.locator('button[data-qa="login-button"]');
    this.loginHeading  = page.getByRole('heading', { name: 'Login to your account' });
    // Shown in red when credentials are invalid
    this.errorMessage  = page.locator('p[style*="color: red"]');
  }

  // ── ACTIONS ───────────────────────────────────────────────────────────────

  // login() — replaces 3 raw page actions with one meaningful method call.
  // After this call: page redirects to /account (success) OR shows error (fail).
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);       // type into email field
    await this.passwordInput.fill(password); // type into password field
    await this.loginButton.click();          // submit the form
  }

  // isLoginHeadingVisible() — confirms the /login page has fully loaded
  async isLoginHeadingVisible(): Promise<boolean> {
    return await this.loginHeading.isVisible();
  }

  // isErrorVisible() — returns true when the red error message is on screen.
  // Used in negative tests: const isError = await loginPage.isErrorVisible()
  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  // getErrorMessage() — returns full error text for text-based assertions.
  // Example: expect(await loginPage.getErrorMessage()).toContain("incorrect")
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async waitForErrorMessage(): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible' });
  }
}
