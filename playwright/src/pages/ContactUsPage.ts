import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly getInTouchHeading: Locator;

  constructor(page: Page) {
    super(page);

    // Form fields (data-qa present for most inputs)
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageTextarea = page.locator('[data-qa="message"]');

    // File upload has no data-qa on AutomationExercise
    this.uploadFileInput = page.locator('input[type="file"][name="upload_file"]');

    // Submit button uses data-qa
    this.submitButton = page.locator('[data-qa="submit-button"]');

    // Success message exists but is initially display:none; becomes visible after submit
    this.successMessage = page.locator('.status.alert.alert-success');

    this.getInTouchHeading = page.locator('h2:has-text("Get In Touch")');
  }

  async goToContactUs(): Promise<void> {
    await this.navigate('/contact_us');
    await expect(this.getInTouchHeading).toBeVisible();
  }

  async submitContactForm(name: string, email: string, subject: string, message: string): Promise<void> {
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageTextarea.fill(message);

    // AutomationExercise shows a confirmation dialog on submit.
    this.page.once('dialog', async (dialog) => dialog.accept());
    await this.submitButton.click();
  }

  async waitForSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }
}

