/**
 * ============================================
 * 04 - Real-World Patterns: Config, Factory,
 *      Builder & Event Emitter
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * These patterns separate "I learned JS" from
 * "I write professional JS." Every one appears
 * in real Playwright frameworks.
 * 
 * Run: node 04_real_world_patterns_1.js
 */

console.log("═══════════════════════════════════════");
console.log("   REAL-WORLD PATTERNS (Part 1)");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// PATTERN 1: CONFIGURATION BUILDER
// ═══════════════════════════════════════
console.log("📌 PATTERN 1: CONFIGURATION BUILDER\n");

// Why: Every test framework needs configuration that varies
// by environment (staging vs prod), CI vs local, browser, etc.
// This pattern merges defaults with environment-specific
// settings with user overrides — in that priority order.

const createTestConfig = (overrides = {}) => {
    // Determine environment from env var or default to 'staging'
    const env = process.env.TEST_ENV ?? "staging";

    // Environment-specific configurations
    const envConfigs = {
        staging: {
            baseURL: "https://staging.b2b-platform.com",
            apiURL: "https://api-staging.b2b-platform.com",
            timeout: 30000
        },
        production: {
            baseURL: "https://b2b-platform.com",
            apiURL: "https://api.b2b-platform.com",
            timeout: 15000    // Lower timeout in prod — should be faster
        },
        local: {
            baseURL: "http://localhost:3000",
            apiURL: "http://localhost:8080",
            timeout: 60000    // Higher timeout locally — debugging
        }
    };

    // Safely get env config, fallback to staging if unknown env
    const envConfig = envConfigs[env] ?? envConfigs.staging;

    // Merge order: env config → base defaults → user overrides
    return {
        ...envConfig,          // Environment settings (base)
        retries: 2,            // Default retries
        headless: true,        // Default headless mode
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        ...overrides           // User overrides WIN (spread last)
    };
};

// Different configs for different scenarios
const defaultConfig = createTestConfig();
const debugConfig = createTestConfig({ headless: false, retries: 0, timeout: 120000 });
const ciConfig = createTestConfig({ retries: 3, screenshot: "on", video: "on" });

console.log("  Default config:", JSON.stringify(defaultConfig, null, 4).split("\n").slice(0, 5).join("\n    "), "...");
console.log("\n  Debug overrides: headless=false, retries=0, timeout=120000");
console.log("  CI overrides:    retries=3, screenshot=on, video=on");


// ═══════════════════════════════════════
// PATTERN 2: DATA FACTORY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 2: DATA FACTORY\n");

// Why: Hardcoding test data in tests makes them brittle.
// A factory gives smart defaults + easy overrides.
// createProduct({ price: 5000 }) = expensive product with all fields filled.

const createProduct = (overrides = {}) => ({
    // Every field has a sensible default
    id: `PROD_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    name: "Test Product",
    price: 100,
    moq: 50,             // Minimum Order Quantity
    category: "Textiles",
    inStock: true,
    supplier: {
        name: "Test Supplier",
        verified: true,
        rating: 4.5
    },
    createdAt: new Date().toISOString(),
    ...overrides           // Your overrides replace any default
});

// Generate specific variations quickly
const expensive = createProduct({ name: "Premium Silk", price: 5000, moq: 10 });
const outOfStock = createProduct({ name: "Rare Fabric", inStock: false });
const unverified = createProduct({ supplier: { name: "NewCo", verified: false, rating: 2.1 } });

console.log("  Factory-generated products:\n");
console.log(`    Expensive:  ${expensive.name} ($${expensive.price}, MOQ: ${expensive.moq})`);
console.log(`    Out of stock: ${outOfStock.name} (inStock: ${outOfStock.inStock})`);
console.log(`    Unverified: supplier=${unverified.supplier.name}, verified=${unverified.supplier.verified}`);

// Generate a batch — 5 products with sequential names and prices
const batch = Array.from({ length: 5 }, (_, i) =>
    createProduct({ name: `Product ${i + 1}`, price: (i + 1) * 200 })
);

console.log("\n  Batch of 5 products:");
batch.forEach(p => console.log(`    ${p.name}: $${p.price}`));


// ═══════════════════════════════════════
// PATTERN 3: FLUENT / BUILDER API
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 3: FLUENT BUILDER API\n");

// Why: Makes complex object construction readable.
// 'return this' enables method chaining.
// Java comparison: Identical to Java's Builder pattern!
// Like StringBuilder.append().append().toString()

class SearchBuilder {
    constructor() {
        this.params = {
            query: "",
            page: 1,
            limit: 20,
            sort: "relevance",
            filters: {}
        };
    }

    // Each method sets one property and returns 'this' for chaining
    withQuery(query) {
        this.params.query = query;
        return this;  // ← enables chaining
    }

    withPage(page) {
        this.params.page = page;
        return this;
    }

    withLimit(limit) {
        this.params.limit = limit;
        return this;
    }

    sortBy(field) {
        this.params.sort = field;
        return this;
    }

    filterByCategory(category) {
        this.params.filters.category = category;
        return this;
    }

    filterByPriceRange(min, max) {
        this.params.filters.minPrice = min;
        this.params.filters.maxPrice = max;
        return this;
    }

    filterByVerified(verified = true) {
        this.params.filters.verified = verified;
        return this;
    }

    build() {
        return { ...this.params };  // Return a copy (spread prevents mutation)
    }
}

// Clean, readable usage — read it like English!
const searchParams = new SearchBuilder()
    .withQuery("cotton fabric")
    .filterByCategory("Textiles")
    .filterByPriceRange(100, 500)
    .filterByVerified()
    .sortBy("price_low")
    .withLimit(50)
    .build();

console.log("  Search params (built with chaining):");
console.log(`    query:    "${searchParams.query}"`);
console.log(`    sort:     ${searchParams.sort}`);
console.log(`    limit:    ${searchParams.limit}`);
console.log(`    filters:  ${JSON.stringify(searchParams.filters)}`);


// ═══════════════════════════════════════
// PATTERN 4: EVENT EMITTER
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 4: EVENT EMITTER\n");

// Why: Playwright uses event-driven patterns internally.
// page.on('dialog'), page.on('console') — same concept.
// Understanding this helps you understand Playwright's architecture.

class TestEventEmitter {
    constructor() {
        // Store listeners as a Map of event name → array of callbacks
        this.listeners = {};
    }

    // Register a listener for an event
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        return this;  // Enable chaining
    }

    // Trigger an event — calls ALL registered listeners
    emit(event, data) {
        const callbacks = this.listeners[event] ?? [];
        callbacks.forEach(cb => cb(data));
    }

    // Remove all listeners for an event
    off(event) {
        delete this.listeners[event];
    }
}

// Track test execution events
const tracker = new TestEventEmitter();

// Register multiple listeners (like Playwright's page.on())
tracker
    .on("testStart", (name) => console.log(`    ▶ Starting: ${name}`))
    .on("testPass", (name) => console.log(`    ✅ Passed: ${name}`))
    .on("testFail", ({ name, error }) => console.log(`    ❌ Failed: ${name} — ${error}`))
    .on("testFail", ({ name }) => console.log(`    📸 Screenshot saved for: ${name}`));

// Emit events — all registered listeners fire
console.log("  Test execution events:\n");
tracker.emit("testStart", "Search Test");
tracker.emit("testPass", "Search Test");
tracker.emit("testStart", "PDP Test");
tracker.emit("testFail", { name: "PDP Test", error: "Element not found" });

// Playwright equivalent:
// page.on('dialog', async dialog => await dialog.accept());
// page.on('console', msg => console.log('Browser:', msg.text()));
// page.on('pageerror', error => console.log('Page error:', error));

console.log("\n  💡 Playwright's page.on('dialog') works exactly like this!");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 PATTERNS SUMMARY\n");

console.log("  Config Builder → Merge defaults + env + overrides with spread");
console.log("  Data Factory   → Smart defaults + overrides for test data");
console.log("  Fluent Builder → 'return this' for readable chaining");
console.log("  Event Emitter  → Decouple actions from reactions (page.on)");

console.log("\n═══════════════════════════════════════\n");
