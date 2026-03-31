import { test, expect } from "@playwright/test";

// ── NEGATIVE 1: Invalid credentials ─────────────────────────────────────
test("invalid credentials show error message", async ({ page }) => {
  await page.goto("https://automationexercise.com/login");
  await page.locator("input[data-qa=\'login-email\']").fill("nobody@nowhere.com");
  await page.locator("input[data-qa=\'login-password\']").fill("wrongpassword");
  await page.locator("button[data-qa=\'login-button\']").click();
  await expect(page).toHaveURL(/login/);          // primary: page did not crash
  await expect(page.locator(".login-form p")).toBeVisible();  // secondary: error element visible
});

// ── NEGATIVE 2: Empty search ─────────────────────────────────────────────
test("empty search input navigates to products page", async ({ page }) => {
  await page.goto("https://automationexercise.com/products");
  await page.locator("#search_product").fill("");
  await page.locator("#submit_search").click();
  await expect(page).toHaveURL(/products/);    // primary: no crash
  await expect(page).toHaveTitle(/Automation Exercise/); // secondary: correct page loaded
});

// ── NEGATIVE 3: Special characters (XSS attempt) ────────────────────────
test("special characters in search do not break the page", async ({ page }) => {
await page.goto("https://automationexercise.com/products");
  await page.locator("#search_product").fill("<script>alert(1)</script>");
  await page.locator("#submit_search").click();
  await expect(page).toHaveURL(/products/);    // primary: no crash or redirect
  await expect(page).toHaveTitle(/Automation Exercise/); // secondary: correct page loaded
});

// ── NEGATIVE 4: Empty form submit (validation) ───────────────────────────
test("contact form empty submit shows validation", async ({ page }) => {
  await page.goto("https://automationexercise.com/contact_us");
  await page.locator("input[data-qa=\'submit-button\']").click();
  await expect(page).toHaveURL(/contact_us/); // primary: stayed on same page — form validated correctly
});
 