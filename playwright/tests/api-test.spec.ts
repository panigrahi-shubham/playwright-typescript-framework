
import { test, expect } from "@playwright/test";

// ── TEST 1: GET — retrieve all products ─────────────────────────────────
test("GET /api/productsList returns 200 with products", async ({ request }) => {
  const response = await request.get("https://automationexercise.com/api/productsList");
  expect(response.status()).toBe(200);                        // HTTP transport OK
  const body = await response.json();
  expect(body.responseCode).toBe(200);                    // application layer OK
  expect(body.products).toBeDefined();                    // products key exists
  expect(body.products.length).toBeGreaterThan(0);             // at least one product
});

// ── TEST 2: POST — search by term ───────────────────────────────────────
test("POST /api/searchProduct returns results for valid term", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    { form: { search_product: "top" } }
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.products.length).toBeGreaterThan(0);
});

// ── TEST 3: Hybrid — API count matches UI count ──────────────────────────
test("UI product count matches API product count", async ({ page, request }) => {
  // Step 1: Get count from API — no browser yet
  const apiResponse = await request.get("https://automationexercise.com/api/productsList");
  const apiBody = await apiResponse.json();
  const apiCount = apiBody.products.length;
  
  // Step 2: Open browser and count products on screen
  await page.goto("https://automationexercise.com/products");
  const uiCount = await page.locator(".productinfo").count();
  
  // Step 3: Both must match — catches data sync bugs
  expect(uiCount).toBe(apiCount);
});

// ── TEST 4: Negative API — empty POST body ───────────────────────────────
test("POST without required param returns error responseCode", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    { form: {} }  // empty body — missing search_product
  );
  expect(response.status()).toBe(200);  // HTTP 200 — server didn't crash
  const body = await response.json();
  expect(body.responseCode).toBe(400);  // 400 — API rejected the malformed request
});