import { test, expect } from "@playwright/test";

test.describe("Hooks Demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://automationexercise.com");
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
      await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true,
      });
    }
  });

  test("homepage has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test("logo is visible on homepage", async ({ page }) => {
    await expect(
      page.locator("img[alt='Website for automation practice']"),
    ).toBeVisible();
  });

  test("navigation header exists", async ({ page }) => {
    await expect(page.locator("#header")).toBeVisible();
  });
});
