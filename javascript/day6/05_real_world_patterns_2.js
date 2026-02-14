/**
 * ============================================
 * 05 - Real-World Patterns: Debounce, Curry,
 *      Memoize & Partial Application
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * Advanced functional patterns. You won't write
 * all of these daily, but understanding them
 * helps you read framework code and answer
 * interview questions.
 * 
 * Run: node 05_real_world_patterns_2.js
 */

console.log("═══════════════════════════════════════");
console.log("   REAL-WORLD PATTERNS (Part 2)");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// PATTERN 5: DEBOUNCE
// ═══════════════════════════════════════
console.log("📌 PATTERN 5: DEBOUNCE\n");

// Debounce: wait until user STOPS doing something, then act.
// Real example: search autocomplete — don't make an API call
// on every keystroke. Wait until the user pauses typing.

// Why this matters for Playwright:
// When testing search autocomplete, the suggestions don't appear
// on every keystroke — the app debounces the input. That's why
// you sometimes need waitForSelector after typing.

function debounce(fn, delayMs) {
    let timeoutId;

    return (...args) => {
        // Clear any previously scheduled call
        clearTimeout(timeoutId);

        // Schedule a new call after the delay
        // If the function is called again before delay expires,
        // the old timeout is cleared and a new one is set
        timeoutId = setTimeout(() => fn(...args), delayMs);
    };
}

// Simulate typing with debounced search
const debouncedSearch = debounce((query) => {
    console.log(`    🔍 API call for: "${query}"`);
}, 300);

console.log("  Simulating user typing 'cotton' (fast):");
console.log("    Keystroke: 'c'   → scheduled (will be cancelled)");
console.log("    Keystroke: 'co'  → scheduled (will be cancelled)");
console.log("    Keystroke: 'cot' → scheduled (will be cancelled)");
console.log("    Keystroke: 'cotton' → scheduled → after 300ms...");

// In real code, rapid-fire calls only trigger the last one:
// debouncedSearch("c");       // cancelled
// debouncedSearch("co");      // cancelled
// debouncedSearch("cot");     // cancelled
// debouncedSearch("cotton");  // RUNS after 300ms pause

console.log("    Only 1 API call made, not 4! ✅");

console.log("\n  💡 In Playwright: after page.fill('#search', 'cotton'),");
console.log("     you may need page.waitForSelector('.suggestions')");
console.log("     because the app debounces the search input.\n");


// ═══════════════════════════════════════
// PATTERN 6: THROTTLE
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 PATTERN 6: THROTTLE\n");

// Throttle: act at most once per time period.
// Real example: scroll event handler — don't fire 100 times/sec.
// Similar to debounce but guarantees execution at regular intervals.

function throttle(fn, intervalMs) {
    let lastTime = 0;

    return (...args) => {
        const now = Date.now();
        // Only execute if enough time has passed
        if (now - lastTime >= intervalMs) {
            lastTime = now;
            fn(...args);
        }
    };
}

// Demo: throttled logging
console.log("  Throttle limits calls to once per interval.");
console.log("  Example: 10 scroll events in 2 seconds, throttled to 500ms:");
console.log("    Event 1 (0ms)    → ✅ Executed");
console.log("    Event 2 (200ms)  → ❌ Skipped (too soon)");
console.log("    Event 3 (400ms)  → ❌ Skipped");
console.log("    Event 4 (500ms)  → ✅ Executed");
console.log("    Event 5 (700ms)  → ❌ Skipped");
console.log("    Event 6 (1000ms) → ✅ Executed");
console.log("    ...only 4 executions instead of 10 ✅\n");

console.log("  Debounce vs Throttle:");
console.log("    Debounce: waits for PAUSE, then fires ONCE");
console.log("    Throttle: fires at REGULAR INTERVALS, skips extras");


// ═══════════════════════════════════════
// PATTERN 7: CURRYING & PARTIAL APPLICATION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 7: CURRYING & PARTIAL APPLICATION\n");

// Currying: transform a multi-argument function into a chain
// of single-argument functions.
// Practical: create reusable, pre-configured functions.

// Curried locator creator
// First call: provide the page (once)
// Second call: use repeatedly with different selectors
const createLocator = (pageName) => (selector) =>
    `${pageName} → ${selector}`;

// "Partially applied" — page is locked in
const searchPage = createLocator("SearchPage");
const pdpPage = createLocator("ProductDetailPage");

// Now use with just the selector
console.log("  Curried locator creator:");
console.log(`    ${searchPage("#search-box")}`);
console.log(`    ${searchPage("#search-btn")}`);
console.log(`    ${searchPage(".results")}`);
console.log(`    ${pdpPage(".product-title")}`);
console.log(`    ${pdpPage(".product-price")}`);

// Partial application — pre-fill some arguments
// Create URL builders for different environments
console.log("\n  Curried URL builder:");
const createURL = (baseURL) => (path) => `${baseURL}${path}`;

const stagingURL = createURL("https://staging.b2b-platform.com");
const prodURL = createURL("https://b2b-platform.com");

console.log(`    ${stagingURL("/search")}`);
console.log(`    ${stagingURL("/product/123")}`);
console.log(`    ${prodURL("/search")}`);
console.log(`    ${prodURL("/product/123")}`);

// More practical currying — create test assertion helpers
const assertGreaterThan = (min) => (actual) => {
    const passed = actual > min;
    return { passed, message: `${actual} > ${min} → ${passed ? "✅" : "❌"}` };
};

const assertPositive = assertGreaterThan(0);
const assertAbove100 = assertGreaterThan(100);

console.log("\n  Curried assertions:");
console.log(`    assertPositive(5):    ${assertPositive(5).message}`);
console.log(`    assertPositive(-2):   ${assertPositive(-2).message}`);
console.log(`    assertAbove100(250):  ${assertAbove100(250).message}`);
console.log(`    assertAbove100(50):   ${assertAbove100(50).message}`);


// ═══════════════════════════════════════
// PATTERN 8: MEMOIZATION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 8: MEMOIZATION (Caching)\n");

// Memoization: cache the results of expensive function calls.
// If the same inputs are seen again, return cached result instantly.
// Uses a Map for the cache — O(1) lookup.

function memoize(fn) {
    const cache = new Map();

    return (...args) => {
        // Create a unique key from the arguments
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log(`    ⚡ Cache HIT for args: ${key}`);
            return cache.get(key);
        }

        console.log(`    🔄 Cache MISS for args: ${key} — computing...`);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Memoize an "expensive" calculation
const calculateDiscount = memoize((price, percentage) => {
    // Simulate expensive computation
    return price * (1 - percentage / 100);
});

console.log("  Memoized discount calculator:");
console.log(`    Result: $${calculateDiscount(1000, 20)}`);    // Cache MISS
console.log(`    Result: $${calculateDiscount(1000, 20)}`);    // Cache HIT
console.log(`    Result: $${calculateDiscount(500, 10)}`);     // Cache MISS (different args)
console.log(`    Result: $${calculateDiscount(1000, 20)}`);    // Cache HIT

// Real use: cache API responses during test setup
// So multiple tests that need the same data don't make redundant API calls.
console.log("\n  💡 Real use: cache API responses during test setup");
console.log("     so multiple tests don't make redundant API calls.");


// ═══════════════════════════════════════
// PATTERN 9: PIPE / COMPOSE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 9: PIPE (Chaining Functions)\n");

// Pipe: pass a value through a sequence of functions,
// where each function's output becomes the next one's input.
// Left to right: pipe(fn1, fn2, fn3)(value) = fn3(fn2(fn1(value)))

const pipe = (...fns) => (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

// Data processing pipeline for search queries
const trim = (str) => str.trim();
const lowercase = (str) => str.toLowerCase();
const removeExtraSpaces = (str) => str.replace(/\s+/g, " ");
const encodeForURL = (str) => encodeURIComponent(str);

// Compose a clean search query processor
const cleanSearchQuery = pipe(trim, lowercase, removeExtraSpaces);
const prepareForAPI = pipe(trim, lowercase, removeExtraSpaces, encodeForURL);

const rawQuery = "  COTTON   Premium   FABRIC  ";
console.log(`  Raw input:          "${rawQuery}"`);
console.log(`  cleanSearchQuery:   "${cleanSearchQuery(rawQuery)}"`);
console.log(`  prepareForAPI:      "${prepareForAPI(rawQuery)}"`);

// More complex: data validation pipeline
const parsePrice = (str) => parseFloat(str) || 0;
const ensurePositive = (num) => Math.max(0, num);
const roundTo2Decimals = (num) => Math.round(num * 100) / 100;
const formatAsCurrency = (num) => `$${num.toFixed(2)}`;

const processPrice = pipe(parsePrice, ensurePositive, roundTo2Decimals, formatAsCurrency);

console.log(`\n  processPrice("249.999"):  ${processPrice("249.999")}`);
console.log(`  processPrice("-50"):      ${processPrice("-50")}`);
console.log(`  processPrice("invalid"):  ${processPrice("invalid")}`);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 PATTERNS SUMMARY\n");

console.log("  Debounce     → Wait for pause, then act (search autocomplete)");
console.log("  Throttle     → Act at regular intervals (scroll handlers)");
console.log("  Currying     → Chain of single-arg functions (locator creators)");
console.log("  Memoization  → Cache expensive results (API responses)");
console.log("  Pipe         → Chain functions left-to-right (data processing)");

console.log("\n═══════════════════════════════════════\n");
