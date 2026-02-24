import { test, expect } from '@playwright/test';

// ============================================================
// 📝 Day 12: First Playwright Tests
// Module 4: Playwright Core (Day 1 of 8)
// Target Site: https://playwright.dev
// ============================================================

// --------------------------------------------------
// 🧪 Test 1: Basic Navigation and Title Check
// --------------------------------------------------
test('homepage has correct title', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://playwright.dev');

    // Assert the page title contains "Playwright"
    await expect(page).toHaveTitle(/Playwright/);
});

// --------------------------------------------------
// 🧪 Test 2: Interacting with Elements
// --------------------------------------------------
test('search for Playwright documentation', async ({ page }) => {
    await page.goto('https://playwright.dev');

    // Click the search button (role-based locator — Tier 1!)
    await page.getByRole('button', { name: 'Search' }).click();

    // Type in the search box
    await page.getByPlaceholder('Search docs').fill('locators');

    // Verify search results appear — look for any result containing "Locator"
    await expect(page.getByRole('listbox').first()).toBeVisible();
});

// --------------------------------------------------
// 🧪 Test 3: Multiple Assertions
// --------------------------------------------------
test('verify page elements', async ({ page }) => {
    await page.goto('https://playwright.dev');

    // Assert page title
    await expect(page).toHaveTitle(/Playwright/);

    // Assert URL
    await expect(page).toHaveURL('https://playwright.dev/');

    // Assert "Get started" link is visible
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

    // Assert heading contains "Playwright"
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Playwright');
});

// --------------------------------------------------
// 🧪 Test 4: Navigation After Click
// --------------------------------------------------
test('clicking Get started navigates to intro page', async ({ page }) => {
    await page.goto('https://playwright.dev');

    // Click "Get started"
    await page.getByRole('link', { name: 'Get started' }).click();

    // Assert URL changed to intro page
    await expect(page).toHaveURL(/.*intro/);

    // Assert the intro page has Installation heading
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});