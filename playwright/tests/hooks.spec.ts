import { test, expect } from "@playwright/test";
test.describe("Hooks Demo", () => {
    // ── RUNS ONCE before all 3 tests. Receives browser. ─────────────────────
    test.beforeAll(async ({ browser }) => {
        console.log("beforeAll fired. Browser:", browser.version());
        // Note: page is NOT available here — only browser
    });
    // ── RUNS before EACH test. Receives page. ───────────────────────────────
    // Fires 3 times total (once before each of the 3 tests below)
    test.beforeEach(async ({ page }) => {
        await page.goto("https://automationexercise.com");
        // Each test now starts at the homepage automatically
    });
    // ── RUNS after EACH test. Screenshot only on failure. ───────────────────
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === "failed") {
            await page.screenshot({
                path: `screenshots/${testInfo.title}.png`,
                fullPage: true,
            });
        }
    });
    // ── RUNS ONCE after all 3 tests complete. ───────────────────────────────
    test.afterAll(async ({ browser }) => {
        console.log("afterAll fired. All done.");
    });
    // ── THE ACTUAL TESTS ─────────────────────────────────────────────────────
    // No page.goto() needed — beforeEach already navigated to homepage.
    test("homepage has correct title", async ({ page }) => {
        await expect(page).toHaveTitle(/Automation Exercise/);
    });
    test("logo is visible on homepage", async ({ page }) => {
        await expect(page.locator("img[alt='Website for automation practice']")).toBeVisible();
  });
    test("navigation header exists", async ({ page }) => {
        await expect(page.locator("#header")).toBeVisible();
    });
});