/**
 * ============================================
 * 08 - Putting It All Together: Combined Module
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * This file combines EVERYTHING from today into
 * one realistic utility module — the kind of file
 * you'd actually have in a professional framework.
 * 
 * Shows: Custom errors + retry utility + config
 * builder + Set usage + spread + nullish coalescing
 * + optional chaining + destructuring — ALL in one.
 * 
 * Run: node 08_combined_utility.js
 */

console.log("═══════════════════════════════════════");
console.log("   COMBINED UTILITY — ALL DAY 5 TOPICS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// PART 1: CUSTOM ERROR (Error Handling)
// ═══════════════════════════════════════
console.log("📌 PART 1: CUSTOM ERROR CLASS\n");

// This custom error adds context to test failures.
// Instead of "Timeout exceeded", you get:
// 'Test "Search Test" failed at step "search": Element not found'
class TestFailureError extends Error {
    // Constructor uses destructuring for clean parameter handling
    constructor(testName, step, originalError) {
        // super() calls parent Error constructor with descriptive message
        super(`Test "${testName}" failed at step "${step}": ${originalError.message}`);
        this.name = "TestFailureError";
        this.testName = testName;          // Which test?
        this.step = step;                   // Which step?
        this.originalError = originalError; // Original error preserved
        this.timestamp = new Date().toISOString(); // When?
    }
}

// Show the custom error in action
const sampleError = new TestFailureError(
    "Search Test",
    "click search button",
    new Error("Element intercepted by overlay")
);

console.log("  TestFailureError created:");
console.log(`    name:     ${sampleError.name}`);
console.log(`    message:  ${sampleError.message}`);
console.log(`    testName: ${sampleError.testName}`);
console.log(`    step:     ${sampleError.step}`);
console.log(`    original: ${sampleError.originalError.message}`);
console.log(`    time:     ${sampleError.timestamp}`);


// ═══════════════════════════════════════
// PART 2: RETRY UTILITY (Async + Error Handling)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PART 2: RETRY UTILITY\n");

// Uses: async/await, error handling, destructuring, default params, ?? operator

async function retry(action, options = {}) {
    // Destructuring with defaults — clean parameter handling
    // ?? ensures maxAttempts of 0 wouldn't be replaced (unlikely but safe)
    const {
        maxAttempts = 3,
        delayMs = 1000,
        name = "action"
    } = options;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Await the action — critical for catching async errors!
            const result = await action();
            console.log(`    [Retry] ${name} — attempt ${attempt}/${maxAttempts} ✅`);
            return result;
        } catch (error) {
            const isLastAttempt = attempt === maxAttempts;
            console.log(`    [Retry] ${name} — attempt ${attempt}/${maxAttempts} ❌`);

            if (isLastAttempt) {
                // Throw our custom error with context
                throw new TestFailureError(name, `attempt ${attempt}`, error);
            }

            // Wait before retrying — give the system time to recover
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

// Test the retry utility
let counter = 0;

console.log("  Scenario: Operation succeeds on 3rd attempt\n");
try {
    const result = await retry(
        async () => {
            counter++;
            if (counter < 3) {
                throw new Error("Button not clickable");
            }
            return "Order submitted successfully!";
        },
        { maxAttempts: 3, delayMs: 200, name: "Submit Order" }
    );
    console.log(`\n    Result: ${result}`);
} catch (error) {
    console.log(`\n    Failed: ${error.message}`);
}


// ═══════════════════════════════════════
// PART 3: CONFIG BUILDER (Spread + ??)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PART 3: CONFIG BUILDER\n");

// Uses: spread operator, nullish coalescing, enhanced object literals

function buildTestConfig(overrides = {}) {
    // Default configuration — the base settings
    const defaults = {
        baseURL: "https://b2b-platform.com",
        timeout: 30000,
        retries: 2,
        headless: true,
        screenshot: "only-on-failure",
        browser: "chromium"
    };

    // Spread operator merges defaults with overrides
    // Later properties win — overrides replace defaults
    return { ...defaults, ...overrides };
}

// Create configs for different scenarios
const devConfig = buildTestConfig({
    headless: false,     // Override: see the browser
    timeout: 60000,      // Override: longer timeout for debugging
    browser: "firefox"   // Override: test on Firefox
});

const ciConfig = buildTestConfig({
    retries: 3,          // Override: more retries in CI
    screenshot: "on"     // Override: always screenshot in CI
});

// Default config — no overrides at all
const defaultConfig = buildTestConfig();

console.log("  Dev config:    ", devConfig);
console.log("  CI config:     ", ciConfig);
console.log("  Default config:", defaultConfig);


// ═══════════════════════════════════════
// PART 4: UNIQUE VALUES HELPER (Set)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PART 4: UNIQUE VALUES HELPER\n");

// Uses: Set, spread operator, arrow function

// Simple utility — removes duplicates from any array
const uniqueValues = (arr) => [...new Set(arr)];

// Test data with duplicates
const rawCategories = [
    "Textiles", "Electronics", "Textiles",
    "Handicrafts", "Electronics", "Automotive",
    "Textiles"
];

const unique = uniqueValues(rawCategories);
console.log("  Input:  ", rawCategories);
console.log("  Output: ", unique);
console.log(`  Removed ${rawCategories.length - unique.length} duplicates\n`);

// Practical: collect unique error messages from test runs
const testErrors = [
    "Timeout exceeded",
    "Element not found",
    "Timeout exceeded",
    "Network error",
    "Element not found",
    "Timeout exceeded"
];

const uniqueErrors = uniqueValues(testErrors);
console.log("  Unique test errors:");
uniqueErrors.forEach(err => console.log(`    • ${err}`));
console.log(`  (${testErrors.length} total, ${uniqueErrors.length} unique)`);


// ═══════════════════════════════════════
// PART 5: DATA PROCESSOR (Everything Combined)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PART 5: FULL DATA PROCESSOR\n");

// Uses: optional chaining, nullish coalescing, destructuring,
// map, filter, enhanced object literals, ternary, for...of

const productData = [
    {
        name: "Cotton Fabric",
        price: 800,
        supplier: { name: "TexPro", verified: true, rating: 4.5 },
        tags: ["cotton", "premium", "textile"]
    },
    {
        name: "Silk Thread",
        price: 50,
        supplier: null,
        tags: ["silk"]
    },
    {
        name: "Organic Cotton",
        price: 1200,
        supplier: { name: "GreenTex", verified: true, rating: 4.8 },
        tags: ["cotton", "organic", "sustainable", "premium"]
    },
    {
        name: "Polyester Blend",
        price: 300,
        supplier: { name: "FastFab", verified: false },
        tags: null
    }
];

// Process products using ALL Day 5 concepts
const processed = productData.map(product => {
    // Destructuring
    const { name, price, supplier, tags } = product;

    return {
        // Enhanced object literal (shorthand for name: name, price: price)
        name,
        price,

        // Optional chaining + nullish coalescing
        supplierName: supplier?.name ?? "Unknown",
        verified: supplier?.verified ?? false,
        rating: supplier?.rating ?? "N/A",

        // Ternary operator
        priceCategory: price > 500 ? "Premium" : "Standard",

        // Optional chaining on array + nullish coalescing
        tagCount: tags?.length ?? 0,
        primaryTag: tags?.[0] ?? "untagged"
    };
});

// Display results
console.log("  Processed product data:\n");
for (const p of processed) {
    console.log(`  📦 ${p.name}`);
    console.log(`     Price: $${p.price} (${p.priceCategory})`);
    console.log(`     Supplier: ${p.supplierName} ${p.verified ? "✅" : "⚠️"}`);
    console.log(`     Rating: ${p.rating} | Tags: ${p.tagCount} (first: ${p.primaryTag})`);
    console.log();
}

// Collect unique tags across all products (Set + optional chaining + flatMap)
const allTags = productData
    .flatMap(p => p?.tags ?? [])  // Safely flatten all tags arrays
    .filter(Boolean);              // Remove any null/undefined
const uniqueTags = [...new Set(allTags)];
console.log("  All unique tags:", uniqueTags);


// ═══════════════════════════════════════
// PART 6: HOW THIS BECOMES A REAL MODULE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 HOW THIS BECOMES A REAL MODULE\n");

// In your actual framework, this file would look like:
//
// --- file: utils/testHelpers.js (or .ts) ---
//
// // Custom Error (exported)
// export class TestFailureError extends Error { ... }
//
// // Retry utility (exported)
// export async function retry(action, options = {}) { ... }
//
// // Config builder (exported)  
// export function buildTestConfig(overrides = {}) { ... }
//
// // Unique values helper (exported)
// export function uniqueValues(arr) { return [...new Set(arr)]; }
//
// --- file: tests/search.spec.ts (importing) ---
//
// import { retry, buildTestConfig, TestFailureError } from '../utils/testHelpers';
//
// const config = buildTestConfig({ headless: false });
//
// test('search products', async ({ page }) => {
//   await retry(async () => {
//     await page.goto(`${config.baseURL}/search`);
//     await page.fill('#search', 'cotton');
//   }, { maxAttempts: 2, name: 'Search Test' });
// });

console.log("  This single file demonstrates:");
console.log("    ✅ Custom error classes (Error Handling)");
console.log("    ✅ Retry with async/await (Error Handling)");
console.log("    ✅ Config builder with spread (ES6+)");
console.log("    ✅ Set for deduplication (ES6+)");
console.log("    ✅ Optional chaining ?. (ES6+)");
console.log("    ✅ Nullish coalescing ?? (ES6+)");
console.log("    ✅ Destructuring (ES6+)");
console.log("    ✅ Enhanced object literals (ES6+)");
console.log("    ✅ for...of iteration (ES6+)");
console.log("    ✅ Module structure preview (Modules)");

console.log("\n═══════════════════════════════════════\n");
