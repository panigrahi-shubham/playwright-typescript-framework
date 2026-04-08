import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginHeading: Locator;
  readonly errorMessage: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginErrorText: Locator;
  readonly loginFormHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-qa="login-email"]'); // data-qa='login-email': preferred stable test hook over CSS/id changes
    this.passwordInput = page.locator('[data-qa="login-password"]'); // data-qa='login-password': preferred stable test hook over CSS/id changes
    this.loginButton = page.locator('[data-qa="login-button"]'); // data-qa='login-button': preferred stable test hook over CSS/id changes
    this.loginHeading = page.locator('h2:has-text("Login to your account")'); // :has-text('Login to your account'): no data-qa; heading text is stable UX copy
    this.errorMessage = page.locator('p:has-text("Your email or password is incorrect!")'); // :has-text('Your email or password is incorrect!'): no data-qa; exact error copy is the assertion target
    this.loginEmail = this.emailInput; // alias: keep ergonomic naming without duplicating locator logic
    this.loginPassword = this.passwordInput; // alias: keep ergonomic naming without duplicating locator logic
    this.loginErrorText = this.errorMessage; // alias: keep ergonomic naming without duplicating locator logic
    this.loginFormHeading = this.loginHeading; // alias: keep ergonomic naming without duplicating locator logic
  }

  async goToLogin(): Promise<void> {
    await this.navigate('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginWith(email, password);
  }

  async loginWith(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async isLoginHeadingVisible(): Promise<boolean> {
    return this.loginHeading.isVisible();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  async waitForErrorMessage(): Promise<void> {
    await this.errorMessage.waitFor({ state: 'visible' });
  }
}
