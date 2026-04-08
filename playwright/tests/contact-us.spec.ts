import { expect, test } from '@playwright/test';
import { owner, severity, story } from 'allure-js-commons';
import { ContactUsPage } from '../src/pages/ContactUsPage';

test('Contact Us page loads with all form fields visible @smoke', { tag: '@smoke' }, async ({ page }) => {
  owner('Shubham');
  severity('critical');
  story('Contact Us - Page Load');

  const contactUs = new ContactUsPage(page);
  await contactUs.goToContactUs();

  await expect(contactUs.nameInput).toBeVisible();
  await expect(contactUs.emailInput).toBeVisible();
  await expect(contactUs.subjectInput).toBeVisible();
  await expect(contactUs.messageTextarea).toBeVisible();
  await expect(contactUs.uploadFileInput).toBeVisible();
  await expect(contactUs.submitButton).toBeVisible();
});

test('Submit Contact Us form with valid data shows success message @regression', { tag: '@regression' }, async ({ page }) => {
  owner('Shubham');
  severity('normal');
  story('Contact Us - Submit Success');

  const contactUs = new ContactUsPage(page);
  await contactUs.goToContactUs();
  await contactUs.submitContactForm('Shubham', 'shubham@example.com', 'Test Subject', 'This is a test message.');

  await contactUs.waitForSuccessMessage();
});

test('Submitting Contact Us with empty name stays on contact_us @regression', { tag: '@regression' }, async ({ page }) => {
  owner('Shubham');
  severity('minor');
  story('Contact Us - Validation');

  const contactUs = new ContactUsPage(page);
  await contactUs.goToContactUs();
  await contactUs.submitContactForm('', 'shubham@example.com', 'Test Subject', 'This is a test message.');

  await expect(page).toHaveURL(/\/contact_us/);
});

