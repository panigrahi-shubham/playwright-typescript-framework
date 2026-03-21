import { test, expect } from "@playwright/test";
import { searchProducts, searchScenarios, validUser } from "../data/testdata";

test.describe("Product Search — Data Driven", () => {
  for (const product of searchProducts) {
    test(`Search: ${product.searchTerm} in category ${product.category}`, async ({ page }) => {
      await page.goto("https://automationexercise.com/products");
      await page.locator("#search_product").fill(product.searchTerm);  // ✅ fixed
      await page.locator("#submit_search").click();
      await expect(page).toHaveURL(/products/);
      const count = await page.locator(".productinfo").count();
      expect(count).toBeGreaterThan(0);
    });
  }
});

test.describe("Search Scenarios", () => {
  for (const scenario of searchScenarios) {
    test(`"${scenario.term}" — results expected: ${scenario.shouldHaveResults}`, async ({ page }) => {
      await page.goto("https://automationexercise.com/products");
      await page.locator("#search_product").fill(scenario.term);  // ✅ fixed
      await page.locator("#submit_search").click();
      await expect(page).toHaveURL(new RegExp(scenario.expectedInURL));

      if (scenario.shouldHaveResults) {
        const count = await page.locator(".productinfo").count();
        expect(count).toBeGreaterThan(0);
      } else {
        
        await expect(page.locator(".productinfo")).toHaveCount(0);
      }
    });
  }
});