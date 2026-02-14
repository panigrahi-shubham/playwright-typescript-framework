/**
 * ============================================
 * 03 - Error Handling in Playwright Patterns
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * These are REAL patterns you'll use in every
 * Playwright framework. Soft assertions, retry
 * logic, conditional flows, and screenshots.
 * 
 * NOTE: These are SIMULATED examples since we
 * don't have a browser running. The patterns
 * shown here are exactly what you'll write in
 * your real test framework from Day 12 onwards.
 * 
 * Run: node 03_playwright_error_patterns.js
 */

console.log("═══════════════════════════════════════");
console.log("   PLAYWRIGHT ERROR HANDLING PATTERNS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. ASYNC ERROR HANDLING — CRITICAL RULE
// ═══════════════════════════════════════
console.log("📌 ASYNC ERROR HANDLING — CRITICAL RULE\n");

// The #1 mistake in Playwright error handling:
// try/catch ONLY catches async errors if you AWAIT the promise

// ❌ WRONG — try/catch doesn't catch async errors without await
// try {
//   page.goto('https://example.com');  // Missing await!
// } catch (error) {
//   // This catch block will NEVER execute
//   // The error becomes an "unhandled promise rejection"
// }

// ✅ CORRECT — await inside try block
// try {
//   await page.goto('https://example.com');  // ← await is CRITICAL
// } catch (error) {
//   console.log("Caught:", error.message);    // This works!
// }

// Demonstration with a simulated async operation
async function simulatePageLoad(url) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simulate failure for invalid URLs
    if (url.includes("404")) {
        throw new Error(`Page not found: ${url}`);
    }
    return { status: 200, title: "Test Page" };
}

// ✅ CORRECT — with await
async function demo1() {
    try {
        const result = await simulatePageLoad("https://example.com/404");
    } catch (error) {
        console.log("  ✅ Caught with await:", error.message);
    }
}

// ❌ WRONG — without await (error escapes the catch)
async function demo2() {
    try {
        // Without await, this returns a Promise, not a result
        // The error happens LATER, outside the try/catch
        const promise = simulatePageLoad("https://example.com/404");
        console.log("  ❌ No await — catch won't fire, got Promise:", typeof promise);
        // We need to await to actually trigger the error
        await promise;  // Now it throws
    } catch (error) {
        console.log("  ✅ Eventually caught:", error.message);
    }
}

await demo1();
await demo2();

console.log("\n  ⚠️  RULE: try/catch catches async errors ONLY with await.\n");


// ═══════════════════════════════════════
// 2. PATTERN: CONDITIONAL FLOW (Optional Elements)
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 PATTERN 1: CONDITIONAL FLOW\n");

// In B2B apps, some elements appear conditionally:
// - Promo popups
// - Cookie consent banners
// - Session timeout warnings
// - First-time user tutorials
//
// You CANNOT assert these will exist — use try/catch

// Simulated page elements
const pageElements = {
    searchBox: true,
    promoBanner: Math.random() > 0.5,  // 50% chance it appears
    cookieConsent: true,
    header: true
};

async function handleOptionalElements() {
    // Handle optional promo popup
    try {
        if (!pageElements.promoBanner) {
            throw new Error("Element not found");
        }
        // Simulate: await page.locator('.promo-popup-close').click({ timeout: 3000 });
        console.log("  Promo popup found → closed it ✅");
    } catch {
        // No popup — that's fine, continue the test
        // Note: catch without (error) is valid — you don't need the error object
        console.log("  No promo popup present → continuing ✅");
    }

    // Handle cookie consent
    try {
        if (!pageElements.cookieConsent) {
            throw new Error("Element not found");
        }
        console.log("  Cookie consent found → accepted ✅");
    } catch {
        console.log("  No cookie consent → continuing ✅");
    }

    // Continue with actual test — this should NOT be in try/catch
    // because if the search box is missing, the test should FAIL
    console.log("  Search box ready → proceeding with test ✅");
}

await handleOptionalElements();

console.log("\n  💡 Use try/catch for OPTIONAL elements only.");
console.log("  💡 Required elements should fail the test if missing.\n");


// ═══════════════════════════════════════
// 3. PATTERN: RETRY LOGIC ⭐
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n⭐ PATTERN 2: RETRY LOGIC\n");

// Some operations are "flaky" — they fail sometimes but work on retry.
// Examples:
// - Click didn't register because of animation
// - API call timed out due to server load
// - Element was briefly covered by a loading spinner
//
// A retry function wraps any action and re-attempts it

async function retryAction(action, maxRetries = 3, delayMs = 500) {
    // Loop through attempts
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Try to execute the action
            const result = await action();
            // If successful, return the result immediately
            console.log(`    Attempt ${attempt}: ✅ Success`);
            return result;
        } catch (error) {
            // Log the failure
            console.log(`    Attempt ${attempt}: ❌ Failed — ${error.message}`);

            // If this was the last attempt, throw instead of retrying
            if (attempt === maxRetries) {
                throw new Error(
                    `Failed after ${maxRetries} attempts: ${error.message}`
                );
            }

            // Wait before retrying (give the app time to recover)
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

// Simulate a flaky operation — fails first 2 times, succeeds on 3rd
let attemptCount = 0;

console.log("  Scenario: Flaky button click (succeeds on attempt 3)");
try {
    await retryAction(async () => {
        attemptCount++;
        if (attemptCount < 3) {
            throw new Error("Button click intercepted by overlay");
        }
        return "Order submitted!";
    }, 3, 200);  // 3 retries, 200ms delay
} catch (error) {
    console.log(`  Final failure: ${error.message}`);
}

// Simulate a permanently failing operation
console.log("\n  Scenario: API always fails");
try {
    await retryAction(async () => {
        throw new Error("API server unreachable");
    }, 3, 100);
} catch (error) {
    console.log(`  ⚠️ ${error.message}`);
}


// ═══════════════════════════════════════
// 4. PATTERN: SOFT ASSERTIONS (Preview)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 3: SOFT ASSERTIONS\n");

// Normal assertions STOP the test at the first failure.
// Soft assertions COLLECT all failures and report them at the end.
//
// In Playwright:
//   await expect.soft(locator).toBeVisible();  ← doesn't stop
//   await expect(locator).toBeVisible();       ← stops on failure
//
// Here's the concept demonstrated without Playwright:

function softAssert(condition, description, failures) {
    // Instead of throwing, push failures to an array
    if (condition) {
        console.log(`    ✅ ${description}`);
    } else {
        console.log(`    ❌ ${description}`);
        failures.push(description);
    }
}

// Simulate checking multiple things on a product page
const failures = [];
const productPage = {
    title: "Cotton Fabric",
    price: null,           // Missing — this would fail
    supplier: "TexPro",
    contactBtn: false,     // Disabled — this would fail
    image: true
};

console.log("  Checking product detail page:");
softAssert(productPage.title !== null, "Product title visible", failures);
softAssert(productPage.price !== null, "Product price visible", failures);
softAssert(productPage.supplier !== null, "Supplier info visible", failures);
softAssert(productPage.contactBtn === true, "Contact button enabled", failures);
softAssert(productPage.image === true, "Product image loaded", failures);

// Report ALL failures at the end, not just the first one
console.log(`\n  Results: ${5 - failures.length}/5 passed, ${failures.length}/5 failed`);
if (failures.length > 0) {
    console.log("  Failed checks:");
    failures.forEach(f => console.log(`    → ${f}`));
}

console.log("\n  💡 In Playwright, use expect.soft() for this pattern.");
console.log("  💡 Test report shows ALL failures, not just the first.");


// ═══════════════════════════════════════
// 5. PATTERN: ERROR SCREENSHOTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 4: ERROR SCREENSHOTS\n");

// Professional pattern:
// 1. Wrap test actions in try/catch
// 2. On failure: take screenshot for debugging
// 3. Re-throw the error so the test still FAILS
//
// Playwright code (what you'll write):
//
// try {
//     await page.goto('https://b2b-platform.com/search');
//     await page.fill('#search-box', 'cotton');
//     await page.click('#search-btn');
//     await expect(page.locator('.results')).toBeVisible();
// } catch (error) {
//     await page.screenshot({
//         path: `screenshots/failure-${Date.now()}.png`,
//         fullPage: true
//     });
//     throw error;  // ← RE-THROW so test still fails
// }

// Simulated demonstration:
async function simulateTestWithScreenshot(testName, shouldPass) {
    try {
        console.log(`  Running "${testName}"...`);

        if (!shouldPass) {
            throw new Error("Element .results not visible after 5000ms");
        }

        console.log(`  ✅ "${testName}" passed`);
    } catch (error) {
        // In real Playwright: await page.screenshot(...)
        const screenshotPath = `screenshots/failure-${Date.now()}.png`;
        console.log(`  📸 Screenshot saved: ${screenshotPath}`);

        // RE-THROW — critical! Without this, the test appears to pass
        // throw error;  // Would re-throw in real code
        console.log(`  ❌ "${testName}" failed: ${error.message}`);
    }
}

await simulateTestWithScreenshot("Search Products", true);
await simulateTestWithScreenshot("Filter Results", false);

console.log("\n  ⚠️  ALWAYS re-throw after taking the screenshot!");
console.log("  ⚠️  Playwright also has built-in screenshot-on-failure config.\n");


// ═══════════════════════════════════════
// 6. PATTERN: MULTIPLE ASSERTIONS FUNCTION
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 PATTERN 5: MULTIPLE CHECKS WITH ERROR COLLECTION\n");

// Check multiple properties, collect all failures
// Similar to soft assertions but manual implementation

function validateProduct(product) {
    const checks = [];   // Array of { passed, name, message }

    // Check 1: Name exists and is non-empty
    try {
        if (!product.name || product.name.trim() === "") {
            throw new Error("Product name is empty");
        }
        checks.push({ passed: true, name: "Name check" });
    } catch (error) {
        checks.push({ passed: false, name: "Name check", message: error.message });
    }

    // Check 2: Price is valid number
    try {
        if (typeof product.price !== "number" || product.price <= 0) {
            throw new Error(`Invalid price: ${product.price}`);
        }
        checks.push({ passed: true, name: "Price check" });
    } catch (error) {
        checks.push({ passed: false, name: "Price check", message: error.message });
    }

    // Check 3: Category exists
    try {
        if (!product.category) {
            throw new Error("Category is missing");
        }
        checks.push({ passed: true, name: "Category check" });
    } catch (error) {
        checks.push({ passed: false, name: "Category check", message: error.message });
    }

    // Check 4: MOQ is non-negative
    try {
        if (product.moq < 0) {
            throw new Error(`MOQ cannot be negative: ${product.moq}`);
        }
        checks.push({ passed: true, name: "MOQ check" });
    } catch (error) {
        checks.push({ passed: false, name: "MOQ check", message: error.message });
    }

    // Report results
    const passed = checks.filter(c => c.passed).length;
    const failed = checks.filter(c => !c.passed).length;

    console.log(`  Results: ${passed} passed, ${failed} failed`);
    for (const check of checks) {
        const icon = check.passed ? "✅" : "❌";
        const msg = check.passed ? "" : ` → ${check.message}`;
        console.log(`    ${icon} ${check.name}${msg}`);
    }

    return failed === 0;
}

console.log("  Product 1 (valid):");
validateProduct({ name: "Cotton Shirt", price: 250, category: "Textiles", moq: 100 });

console.log("\n  Product 2 (multiple issues):");
validateProduct({ name: "", price: -50, category: null, moq: -1 });


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 PLAYWRIGHT ERROR PATTERNS SUMMARY\n");

console.log("  • ALWAYS await async operations inside try/catch");
console.log("  • Use try/catch for OPTIONAL elements (popups, banners)");
console.log("  • Don't wrap REQUIRED elements — let them fail naturally");
console.log("  • Retry pattern for flaky operations (3 attempts + delay)");
console.log("  • Soft assertions → check ALL conditions, report at end");
console.log("  • Screenshot on failure → debug from HTML report");
console.log("  • ALWAYS re-throw after handling → don't hide failures");

console.log("\n═══════════════════════════════════════\n");
