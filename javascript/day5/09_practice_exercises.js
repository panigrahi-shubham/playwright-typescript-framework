/**
 * ============================================
 * 09 - Practice Exercises & Interview Answers
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * ALL 5 exercises + debug challenge + interview
 * question answers. Complete each exercise,
 * then compare with the solution below it.
 * 
 * Run: node 09_practice_exercises.js
 */

console.log("═══════════════════════════════════════");
console.log("   DAY 5 — PRACTICE EXERCISES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// EXERCISE 1: CUSTOM ERROR HIERARCHY
// ═══════════════════════════════════════
console.log("📝 EXERCISE 1: Custom Error Hierarchy\n");

// Task:
// Create an error class hierarchy for your B2B framework:
// - FrameworkError extends Error (base — adds timestamp, testName)
// - LoginError extends FrameworkError (adds username)
// - SearchError extends FrameworkError (adds searchQuery, filterApplied)
// - APIError extends FrameworkError (adds statusCode, endpoint, method)
//
// Create instances of each, log their properties.
// Throw a SearchError inside try/catch and log caught error's details.

// === SOLUTION ===

// Base error for the entire framework
// All other custom errors will extend this.
// Adds 'timestamp' and 'testName' to every error automatically.
class FrameworkError extends Error {
    constructor(message, testName = "unknown") {
        super(message);                            // Pass message to Error constructor
        this.name = "FrameworkError";              // Override default "Error" name
        this.testName = testName;                  // Which test threw this error?
        this.timestamp = new Date().toISOString(); // When did it happen?
    }
}

// Login-specific error — adds 'username' context
// When login fails, you want to know WHICH user failed
class LoginError extends FrameworkError {
    constructor(username, reason) {
        // Build a descriptive message from the parameters
        super(`Login failed for user "${username}": ${reason}`, "LoginTest");
        this.name = "LoginError";
        this.username = username;   // Which user tried to log in?
        this.reason = reason;       // Why did it fail?
    }
}

// Search-specific error — adds search query and filter context
// When search fails, you want to know WHAT was searched
class SearchError extends FrameworkError {
    constructor(searchQuery, filterApplied = "none") {
        super(
            `Search failed for query "${searchQuery}" with filter "${filterApplied}"`,
            "SearchTest"
        );
        this.name = "SearchError";
        this.searchQuery = searchQuery;        // What was searched?
        this.filterApplied = filterApplied;    // Any filters active?
    }
}

// API-specific error — adds HTTP status, endpoint, method
// When an API call fails, you want to know the full request details
class APIError extends FrameworkError {
    constructor(statusCode, endpoint, method = "GET") {
        super(
            `API ${method} ${endpoint} returned ${statusCode}`,
            "APITest"
        );
        this.name = "APIError";
        this.statusCode = statusCode;   // HTTP status code (404, 500, etc.)
        this.endpoint = endpoint;       // Which URL was called?
        this.method = method;           // Which HTTP method? (GET, POST, etc.)
    }
}

// Create instances and log properties
console.log("  Creating instances:\n");

const loginErr = new LoginError("admin@company.com", "Invalid password");
console.log("  LoginError:");
console.log(`    name:      ${loginErr.name}`);
console.log(`    message:   ${loginErr.message}`);
console.log(`    username:  ${loginErr.username}`);
console.log(`    testName:  ${loginErr.testName}`);
console.log(`    timestamp: ${loginErr.timestamp}`);

const searchErr = new SearchError("cotton fabric", "category=textiles");
console.log("\n  SearchError:");
console.log(`    name:    ${searchErr.name}`);
console.log(`    message: ${searchErr.message}`);
console.log(`    query:   ${searchErr.searchQuery}`);
console.log(`    filter:  ${searchErr.filterApplied}`);

const apiErr = new APIError(503, "/api/v2/products", "POST");
console.log("\n  APIError:");
console.log(`    name:     ${apiErr.name}`);
console.log(`    message:  ${apiErr.message}`);
console.log(`    status:   ${apiErr.statusCode}`);
console.log(`    endpoint: ${apiErr.endpoint}`);
console.log(`    method:   ${apiErr.method}`);

// Throw SearchError inside try/catch
console.log("\n  Throwing SearchError in try/catch:");
try {
    // Simulate a search that finds no results
    throw new SearchError("organic silk premium", "price>1000");
} catch (error) {
    // Check the type with instanceof
    if (error instanceof SearchError) {
        console.log(`    Caught SearchError!`);
        console.log(`    Query:  "${error.searchQuery}"`);
        console.log(`    Filter: "${error.filterApplied}"`);
        console.log(`    Test:   ${error.testName}`);
    }
    // Verify inheritance chain
    console.log(`    Is FrameworkError? ${error instanceof FrameworkError}`);  // true
    console.log(`    Is Error?          ${error instanceof Error}`);           // true
}


// ═══════════════════════════════════════
// EXERCISE 2: MODULE PRACTICE
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📝 EXERCISE 2: Module Practice\n");

// Task:
// Create three files (simulated here):
// File 1: constants.js — exports BASE_URL, TIMEOUTS, BROWSERS
// File 2: helpers.js — exports formatPrice, generateTestId, cleanSearchQuery, default TestConfig
// File 3: searchTest.js — imports from both and uses them

// === SOLUTION ===

// ═══ File 1: constants.js ═══
// In a real file, each would have 'export' keyword:
// export const BASE_URL = '...';
// export const TIMEOUTS = { ... };
// export const BROWSERS = [ ... ];

const constants = (() => {
    const BASE_URL = "https://b2b-platform.com";

    const TIMEOUTS = {
        short: 5000,       // Quick checks (element visibility)
        medium: 10000,     // Page loads, API calls
        long: 30000        // Complex operations, file uploads
    };

    const BROWSERS = ["chromium", "firefox", "webkit"];

    return { BASE_URL, TIMEOUTS, BROWSERS };
})();

console.log("  📁 constants.js (named exports):");
console.log(`    BASE_URL:  ${constants.BASE_URL}`);
console.log(`    TIMEOUTS:  ${JSON.stringify(constants.TIMEOUTS)}`);
console.log(`    BROWSERS:  ${constants.BROWSERS}`);


// ═══ File 2: helpers.js ═══
// Named exports: formatPrice, generateTestId, cleanSearchQuery
// Default export: TestConfig class

const helpers = (() => {
    // Named export: formats a number as USD price string
    function formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    // Named export: generates a unique test ID with random 6-digit number
    function generateTestId() {
        return `test_${Math.floor(Math.random() * 900000 + 100000)}`;
    }

    // Named export: cleans a search query (trim, lowercase, remove extra spaces)
    function cleanSearchQuery(query) {
        return query
            .trim()                     // Remove leading/trailing whitespace
            .toLowerCase()              // Normalize to lowercase
            .replace(/\s+/g, " ");      // Replace multiple spaces with single space
    }

    // Default export: TestConfig class that merges overrides with defaults
    class TestConfig {
        constructor(overrides = {}) {
            // Default settings
            const defaults = {
                baseURL: "https://b2b-platform.com",
                timeout: 30000,
                retries: 2,
                headless: true,
                browser: "chromium"
            };
            // Merge defaults with overrides (spread operator)
            // overrides properties win when keys conflict
            Object.assign(this, { ...defaults, ...overrides });
        }

        toString() {
            return JSON.stringify(this, null, 2);
        }
    }

    return { formatPrice, generateTestId, cleanSearchQuery, TestConfig };
})();

console.log("\n  📁 helpers.js (named + default export):");
console.log(`    formatPrice(250):              ${helpers.formatPrice(250)}`);
console.log(`    generateTestId():              ${helpers.generateTestId()}`);
console.log(`    cleanSearchQuery("  COTTON  "): "${helpers.cleanSearchQuery("  COTTON  ")}"`);


// ═══ File 3: searchTest.js ═══
// Import statements (what the real file would have):
//
// import { BASE_URL, TIMEOUTS } from './constants.js';          ← named imports
// import TestConfig from './helpers.js';                          ← default import
// import { formatPrice, cleanSearchQuery } from './helpers.js';  ← named imports

console.log("\n  📁 searchTest.js (imports from both files):");
console.log("\n  Import statements:");
console.log("    import { BASE_URL, TIMEOUTS } from './constants.js';");
console.log("    import TestConfig from './helpers.js';");
console.log("    import { formatPrice, cleanSearchQuery } from './helpers.js';");

// Simulate using the imports
const { BASE_URL: baseUrl, TIMEOUTS: timeouts } = constants;
const { formatPrice, cleanSearchQuery, TestConfig } = helpers;

// Create a TestConfig with overrides
const config = new TestConfig({
    headless: false,
    timeout: 60000
});

console.log("\n  Usage:");
console.log(`    BASE_URL:  ${baseUrl}`);
console.log(`    TIMEOUTS:  short=${timeouts.short}, long=${timeouts.long}`);
console.log(`    Config:    ${config.toString()}`);
console.log(`    formatPrice(999.5):  ${formatPrice(999.5)}`);
console.log(`    cleanSearchQuery("  COTTON  FABRIC  "): "${cleanSearchQuery("  COTTON  FABRIC  ")}"`);


// ═══════════════════════════════════════
// EXERCISE 3: MODERN JS REFACTORING
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📝 EXERCISE 3: Modern JS Refactoring\n");

// Task: Refactor old-style JavaScript into clean, modern ES6+ code.
// Use: const, arrow functions, map, optional chaining, nullish coalescing,
// enhanced object literals, and destructuring.

// ═══ OLD CODE (what we're refactoring) ═══
console.log("  ❌ OLD CODE (before refactoring):\n");
console.log("    var products = [...]");
console.log("    var result = [];");
console.log("    for (var i = 0; i < products.length; i++) { ... }");
console.log("    // 15 lines of verbose code\n");

// ═══ REFACTORED CODE ═══
console.log("  ✅ REFACTORED CODE:\n");

// Source data — same as the original
const products = [
    { name: "Shirt", price: 250, supplier: null },
    { name: "Fabric", price: 800, supplier: { name: "TexPro", verified: true } },
    { name: "Thread", price: 50, supplier: { name: "SilkCo", verified: false } }
];

// Refactored: ONE clean expression instead of 15 lines
// Uses: const, .map(), destructuring, ?., ??, ternary (not redundant)
const result = products.map(({ name, price, supplier }) => ({
    // Destructuring in the parameter — pulls out name, price, supplier

    name,                                           // Enhanced object literal (shorthand)
    price,                                          // Enhanced object literal (shorthand)
    supplierName: supplier?.name ?? "Unknown",      // Optional chaining + nullish coalescing
    isExpensive: price > 500                        // Direct boolean (no redundant ternary)
}));

// Display the result
console.log("  Result:");
for (const item of result) {
    const expensiveTag = item.isExpensive ? "💰" : "  ";
    console.log(`    ${expensiveTag} ${item.name}: $${item.price} (Supplier: ${item.supplierName})`);
}

// What changed:
console.log("\n  Improvements:");
console.log("    • var → const (block-scoped, can't reassign)");
console.log("    • for loop → .map() (declarative, returns new array)");
console.log("    • if/else for supplier → ?.  + ?? (one-liner!)");
console.log("    • ? true : false → just the expression (already boolean)");
console.log("    • { name: name } → { name } (shorthand property)");
console.log("    • function parameter destructuring");


// ═══════════════════════════════════════
// EXERCISE 4: ERROR HANDLING SCENARIOS
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📝 EXERCISE 4: Error Handling Scenarios\n");

// === Scenario 1: Search with Retry ===
console.log("  Scenario 1: Search with retry\n");

// Custom SearchError for this exercise
class SearchRetryError extends Error {
    constructor(query, attempts) {
        super(`Search for "${query}" failed after ${attempts} attempts`);
        this.name = "SearchRetryError";
        this.query = query;
        this.attempts = attempts;
    }
}

async function searchWithRetry(query, maxRetries = 3, delayMs = 500) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Simulate search — 70% chance of failure
            if (Math.random() < 0.7) {
                throw new Error("Search timeout — server busy");
            }
            console.log(`    Attempt ${attempt}: ✅ Found results for "${query}"`);
            return { results: ["Product A", "Product B"], count: 2 };
        } catch (error) {
            console.log(`    Attempt ${attempt}: ❌ ${error.message}`);

            if (attempt === maxRetries) {
                // All retries exhausted — throw custom error with context
                throw new SearchRetryError(query, maxRetries);
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

try {
    await searchWithRetry("organic cotton", 3, 100);
} catch (error) {
    if (error instanceof SearchRetryError) {
        console.log(`    Final: ${error.message}`);
        console.log(`    Query: ${error.query}, Attempts: ${error.attempts}`);
    }
}


// === Scenario 2: API Response Validation ===
console.log("\n  Scenario 2: API response validation\n");

function validateAPIResponse(response) {
    // Step 1: Check if response body is valid JSON
    let parsed;
    try {
        parsed = JSON.parse(response.body);
    } catch (error) {
        console.log("    ❌ Invalid JSON format:", error.message);
        return null;
    }

    // Step 2: Check if results array exists and is non-empty
    try {
        if (!parsed.results || parsed.results.length === 0) {
            throw new Error("Results array is empty or missing");
        }
    } catch (error) {
        console.log("    ❌ Empty results:", error.message);
        return null;
    }

    // Step 3: Check if first result has a name field
    try {
        const firstName = parsed.results[0].name;
        if (!firstName) {
            throw new Error("First result has no 'name' field");
        }
        console.log(`    ✅ First result name: "${firstName}"`);
        return firstName;
    } catch (error) {
        console.log("    ❌ Missing name:", error.message);
        return null;
    }
}

// Test cases
const testResponses = [
    { label: "Valid response", body: '{"results": [{"name": "Shirt"}]}' },
    { label: "Invalid JSON", body: "not json at all" },
    { label: "Empty results", body: '{"results": []}' },
    { label: "Missing name", body: '{"results": [{"price": 250}]}' }
];

for (const { label, body } of testResponses) {
    console.log(`    --- ${label} ---`);
    validateAPIResponse({ status: 200, body });
}


// === Scenario 3: Multiple Assertions ===
console.log("\n  Scenario 3: Multiple assertions (all checks run)\n");

function validateProductCompletely(product) {
    let passed = 0;
    let failed = 0;
    const failures = [];

    // Helper — wraps each check in its own try/catch
    // so ALL checks run even if some fail
    function check(name, fn) {
        try {
            fn();
            passed++;
            console.log(`    ✅ ${name}`);
        } catch (error) {
            failed++;
            failures.push(`${name}: ${error.message}`);
            console.log(`    ❌ ${name}: ${error.message}`);
        }
    }

    // Check 1: Name
    check("Name is non-empty", () => {
        if (!product.name?.trim()) throw new Error("Name is empty or missing");
    });

    // Check 2: Price is positive number
    check("Price is valid", () => {
        if (typeof product.price !== "number" || product.price <= 0) {
            throw new Error(`Invalid price: ${product.price}`);
        }
    });

    // Check 3: Category exists
    check("Category exists", () => {
        if (!product.category) throw new Error("Category is missing");
    });

    // Check 4: Supplier has name
    check("Supplier has name", () => {
        if (!product.supplier?.name) throw new Error("Supplier name missing");
    });

    // Check 5: Tags array is non-empty
    check("Has at least one tag", () => {
        if (!product.tags?.length) throw new Error("No tags found");
    });

    // Summary — ALL checks ran regardless of individual failures
    console.log(`\n    Summary: ${passed} passed, ${failed} failed out of 5 checks`);
    if (failures.length > 0) {
        console.log("    Failures:");
        failures.forEach(f => console.log(`      → ${f}`));
    }
}

validateProductCompletely({
    name: "Cotton Shirt",
    price: 250,
    category: null,          // Missing — fails check 3
    supplier: { name: "" },  // Empty name — fails check 4
    tags: ["cotton"]         // Valid — passes check 5
});


// ═══════════════════════════════════════
// EXERCISE 5: REAL-WORLD MODULE DESIGN
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📝 EXERCISE 5: Real-World Module Design\n");

// Task: Design the module structure for your B2B framework.
// Show import/export lines and class/function signatures for each file.

console.log("  📁 pages/BasePage.ts");
console.log("  ─────────────────────────────────────────");
console.log("  // Default export: base class all pages extend");
console.log("  export default class BasePage {");
console.log("    protected page: Page;");
console.log("    constructor(page: Page) { ... }");
console.log("    async navigate(path: string) { ... }");
console.log("    async waitForPageLoad() { ... }");
console.log("    async screenshot(name: string) { ... }");
console.log("  }");

console.log("\n  📁 pages/SearchPage.ts");
console.log("  ─────────────────────────────────────────");
console.log("  import BasePage from './BasePage';");
console.log("  import { TIMEOUTS } from '../utils/constants';");
console.log("  ");
console.log("  export default class SearchPage extends BasePage {");
console.log("    readonly searchBox = '#search-box';");
console.log("    readonly searchBtn = '#search-btn';");
console.log("    readonly results = '.search-results';");
console.log("    async search(query: string) { ... }");
console.log("    async getResultCount(): Promise<number> { ... }");
console.log("    async getResultTitles(): Promise<string[]> { ... }");
console.log("  }");

console.log("\n  📁 pages/ProductDetailPage.ts");
console.log("  ─────────────────────────────────────────");
console.log("  import BasePage from './BasePage';");
console.log("  ");
console.log("  export default class ProductDetailPage extends BasePage {");
console.log("    readonly title = '.product-title';");
console.log("    readonly price = '.product-price';");
console.log("    readonly contactBtn = '#contact-supplier';");
console.log("    async getProductTitle(): Promise<string> { ... }");
console.log("    async getPrice(): Promise<number> { ... }");
console.log("    async contactSupplier() { ... }");
console.log("  }");

console.log("\n  📁 utils/constants.ts");
console.log("  ─────────────────────────────────────────");
console.log("  // All named exports — no default");
console.log("  export const BASE_URL = 'https://b2b-platform.com';");
console.log("  export const TIMEOUTS = { short: 5000, medium: 10000, long: 30000 };");
console.log("  export const BROWSERS = ['chromium', 'firefox', 'webkit'] as const;");
console.log("  export const API_ENDPOINTS = {");
console.log("    search: '/api/v2/search',");
console.log("    products: '/api/v2/products',");
console.log("    messages: '/api/v2/messages'");
console.log("  };");

console.log("\n  📁 utils/helpers.ts");
console.log("  ─────────────────────────────────────────");
console.log("  import { TestFailureError } from './errors';");
console.log("  ");
console.log("  export async function retry(action, options?) { ... }");
console.log("  export function buildTestConfig(overrides?) { ... }");
console.log("  export function uniqueValues<T>(arr: T[]): T[] { ... }");
console.log("  export function formatPrice(price: number): string { ... }");

console.log("\n  📁 test-data/searchData.ts");
console.log("  ─────────────────────────────────────────");
console.log("  // Named exports for each data set");
console.log("  export const searchTestData = [");
console.log("    { query: 'cotton', expectedMinResults: 5 },");
console.log("    { query: 'silk premium', expectedMinResults: 2 },");
console.log("    { query: 'xyznonexistent', expectedMinResults: 0 }");
console.log("  ];");
console.log("  export const filterData = { ... };");

console.log("\n  📁 tests/search.spec.ts");
console.log("  ─────────────────────────────────────────");
console.log("  import { test, expect } from '@playwright/test';  ← named (framework)");
console.log("  import SearchPage from '../pages/SearchPage';      ← default (page class)");
console.log("  import { searchTestData } from '../test-data/searchData'; ← named (data)");
console.log("  import { BASE_URL } from '../utils/constants';    ← named (config)");
console.log("  ");
console.log("  test('search for products', async ({ page }) => { ... });");

console.log("\n  📁 tests/productDetail.spec.ts");
console.log("  ─────────────────────────────────────────");
console.log("  import { test, expect } from '@playwright/test';");
console.log("  import ProductDetailPage from '../pages/ProductDetailPage';");
console.log("  import { BASE_URL, TIMEOUTS } from '../utils/constants';");
console.log("  ");
console.log("  test('verify product details', async ({ page }) => { ... });");


// ═══════════════════════════════════════
// DEBUG CHALLENGE
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n🐛 DEBUG CHALLENGE\n");

console.log("  What's wrong with this code?\n");
console.log("    // pages/SearchPage.js");
console.log("    export default class SearchPage { ... }\n");
console.log("    // tests/search.test.js");
console.log("    import { SearchPage } from './pages/SearchPage.js';  ← ❌\n");

console.log("  ANSWER:");
console.log("  SearchPage is a DEFAULT export, but the import uses");
console.log("  curly braces (NAMED import syntax).\n");
console.log("    ❌ import { SearchPage } from '...'  ← named import syntax");
console.log("    ✅ import SearchPage from '...'       ← default import syntax\n");

console.log("  Error message you'd see:");
console.log("    'SearchPage is not a constructor'");
console.log("    or 'SearchPage is undefined'\n");
console.log("  💡 When you see these errors → check your import statement!");


// ═══════════════════════════════════════
// INTERVIEW ANSWERS (Day 5)
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n🎤 INTERVIEW ANSWERS\n");

console.log("  Q1: How do you handle errors in Playwright tests?");
console.log("  ─────────────────────────────────────────");
console.log("  'I handle errors at multiple levels. At the test level,");
console.log("   I use try/catch for optional elements like popup dismissals.");
console.log("   For assertions, I use expect.soft() to collect ALL failures.");
console.log("   At the framework level, I have custom error classes like");
console.log("   SearchError and NavigationError that add context — so reports");
console.log("   show meaningful messages instead of generic timeouts. I also");
console.log("   take automatic screenshots on failure for debugging.'\n");

console.log("  Q2: CommonJS vs ES Modules?");
console.log("  ─────────────────────────────────────────");
console.log("  'CommonJS uses require/module.exports, loads synchronously.");
console.log("   ES Modules use import/export, support tree-shaking and");
console.log("   static analysis. I use ESM in Playwright because TypeScript");
console.log("   compiles to it and it gives better IDE auto-import support.'\n");

console.log("  Q3: Difference between ?? and ||?");
console.log("  ─────────────────────────────────────────");
console.log("  '|| triggers on ANY falsy value (0, \"\", false, null, undefined).");
console.log("   ?? triggers ONLY on null/undefined. Example: if a product MOQ");
console.log("   is 0 (no minimum), moq || 1 incorrectly changes it to 1,");
console.log("   but moq ?? 1 correctly keeps 0. I use ?? when 0 or empty");
console.log("   string are valid values.'\n");

console.log("  Q4: How do you organize test automation project files?");
console.log("  ─────────────────────────────────────────");
console.log("  'Modular structure. pages/ has Page Object classes extending");
console.log("   BasePage. tests/ has spec files by feature. utils/ has helpers");
console.log("   like retry logic and custom errors. test-data/ has JSON/TS.");
console.log("   Page classes use default exports, utilities use named exports.");
console.log("   This means I can change locators without touching tests.'\n");

console.log("  Q5: What ES6+ features do you use regularly?");
console.log("  ─────────────────────────────────────────");
console.log("  'Arrow functions for callbacks. Destructuring for Playwright");
console.log("   fixtures and API responses. Template literals for dynamic");
console.log("   locators. Optional chaining for safe nested access. Spread");
console.log("   for merging configs. const/let instead of var. for...of");
console.log("   with await for sequential async operations.'");


// ═══════════════════════════════════════
// COMMON MISTAKES TABLE
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n⚠️  COMMON MISTAKES FROM DAY 5\n");

console.log("  ┌────────────────────────────────┬─────────────────────────────────┐");
console.log("  │ Mistake                        │ Correct Way                     │");
console.log("  ├────────────────────────────────┼─────────────────────────────────┤");
console.log("  │ try/catch without await         │ Always await inside try block   │");
console.log("  │ Catch + ignore silently         │ At minimum, log the error       │");
console.log("  │ require() in TypeScript/ESM     │ Use import/export               │");
console.log("  │ import { X } for default export│ import X (no curly braces)      │");
console.log("  │ for...in on arrays              │ Use for...of for arrays         │");
console.log("  │ || for defaults with valid 0    │ Use ?? instead                  │");
console.log("  │ Not re-throwing errors          │ throw error after handling      │");
console.log("  └────────────────────────────────┴─────────────────────────────────┘");


// ═══════════════════════════════════════
// DAY 5 COMPLETE!
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n🎯 DAY 5 COMPLETE!\n");

console.log("  You can now confidently say in an interview:\n");
console.log("  'I write robust automation code with proper error handling —");
console.log("   custom error classes for meaningful failure messages,");
console.log("   try/catch for graceful recovery, and retry utilities for");
console.log("   handling flaky operations. I organize my framework using");
console.log("   ES Modules with clear import/export patterns, and I use");
console.log("   modern JavaScript features like optional chaining, nullish");
console.log("   coalescing, and destructuring to write clean, maintainable");
console.log("   test code.'");

console.log("\n  📅 Day 6: Loops Deep Dive, Array/Object Practice");
console.log("             & Real-World JavaScript Patterns");

console.log("\n═══════════════════════════════════════\n");
