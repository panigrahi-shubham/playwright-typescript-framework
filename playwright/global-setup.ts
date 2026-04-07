import { chromium, type FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ quiet: true });

async function globalSetup(config: FullConfig): Promise<void> {
  const runAuthTests = process.env.RUN_AUTH_TESTS === 'true';
  if (!runAuthTests) {
    console.log('Global setup: auth state disabled because RUN_AUTH_TESTS is not true.');
    return;
  }

  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  if (!email || !password) {
    throw new Error('Global setup: TEST_EMAIL and TEST_PASSWORD are required when RUN_AUTH_TESTS=true.');
  }

  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const authFile = path.join(authDir, 'user.json');
  const baseURL = config.projects[0]?.use?.baseURL ?? config.use?.baseURL ?? 'https://www.automationexercise.com';

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`${baseURL}/login`);
    await page.waitForLoadState('domcontentloaded');

    await page.fill('[data-qa="login-email"]', email);
    await page.fill('[data-qa="login-password"]', password);
    await page.click('[data-qa="login-button"]');

    await page.waitForURL(/automationexercise\.com\/?$/, { timeout: 30_000 });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('li a:has-text(" Logged in as"), a[href="/delete_account"]', { timeout: 30_000 });
    await context.storageState({ path: authFile });

    console.log(`Global setup: storageState saved to ${authFile}`);
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
