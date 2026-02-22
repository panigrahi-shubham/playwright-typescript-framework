/**
 * ============================================
 * 04 — Framework Patterns (Design Patterns)
 * ============================================
 *
 * Day 10: Classes, Access Modifiers & Page Objects
 * Practical design patterns used in professional
 * Playwright frameworks: Factory, Builder,
 * Singleton, and typed API client.
 *
 * Run: npx ts-node 04_framework_patterns.ts
 */

console.log("═══════════════════════════════════════");
console.log("   FRAMEWORK PATTERNS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. GENERIC TEST DATA FACTORY
// ═══════════════════════════════════════
console.log("📌 Pattern 1: Generic Test Data Factory\n");

class TestDataFactory<T> {
    constructor(private defaults: T) { }

    // Create ONE item with optional overrides
    create(overrides: Partial<T> = {}): T {
        return { ...this.defaults, ...overrides };
    }

    // Create MANY identical items
    createMany(count: number, overrides: Partial<T> = {}): T[] {
        return Array.from({ length: count }, () => this.create(overrides));
    }

    // Create BATCH with index-based variations
    createBatch(count: number, modifier: (index: number) => Partial<T>): T[] {
        return Array.from({ length: count }, (_, i) => this.create(modifier(i)));
    }
}

// Define data shape
interface ProductData {
    id: string;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

// Create a typed factory with defaults
const productFactory = new TestDataFactory<ProductData>({
    id: "PROD-DEFAULT",
    name: "Test Product",
    price: 100,
    category: "Textiles",
    inStock: true
});

// Usage — fully type-safe:
const defaultProduct = productFactory.create();
const shirt = productFactory.create({ name: "Cotton Shirt", price: 250 });
const outOfStock = productFactory.create({ name: "Rare Item", inStock: false });

console.log("  Default:", defaultProduct);
console.log("  Shirt:", shirt);
console.log("  Out of stock:", outOfStock);

// Create a batch with unique IDs and prices:
const products = productFactory.createBatch(3, (i) => ({
    id: `PROD-${i + 1}`,
    name: `Product ${i + 1}`,
    price: (i + 1) * 100
}));

console.log("\n  Batch (3 products):");
products.forEach(p => console.log(`    ${p.id}: ${p.name} — ₹${p.price}`));

// Works with ANY data shape — not just products:
interface SupplierData {
    id: string;
    name: string;
    location: string;
    rating: number;
}

const supplierFactory = new TestDataFactory<SupplierData>({
    id: "SUP-DEFAULT",
    name: "Test Supplier",
    location: "Shanghai",
    rating: 4.0
});

const supplier = supplierFactory.create({ name: "SilkMaster", rating: 4.9 });
console.log("\n  Supplier:", supplier);

console.log("\n  💡 ONE generic class → works for products, suppliers, messages, configs...");
console.log("     Partial<T> = only override the fields you care about");


// ═══════════════════════════════════════
// 2. BUILDER PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 2: Builder Pattern\n");

interface TestScenario {
    name: string;
    browser: "chromium" | "firefox" | "webkit";
    viewport: { width: number; height: number };
    baseURL: string;
    retries: number;
    tags: string[];
    timeout: number;
}

class TestScenarioBuilder {
    private scenario: TestScenario;

    constructor(name: string) {
        // Start with sensible defaults
        this.scenario = {
            name,
            browser: "chromium",
            viewport: { width: 1280, height: 720 },
            baseURL: "https://staging.b2b-platform.com",
            retries: 2,
            tags: [],
            timeout: 30000
        };
    }

    // Each method returns 'this' → enables chaining
    withBrowser(browser: TestScenario["browser"]): this {
        this.scenario.browser = browser;
        return this;
    }

    withViewport(width: number, height: number): this {
        this.scenario.viewport = { width, height };
        return this;
    }

    withBaseURL(url: string): this {
        this.scenario.baseURL = url;
        return this;
    }

    withTags(...tags: string[]): this {
        this.scenario.tags.push(...tags);
        return this;
    }

    withTimeout(ms: number): this {
        this.scenario.timeout = ms;
        return this;
    }

    withRetries(count: number): this {
        this.scenario.retries = count;
        return this;
    }

    // Final build — returns a frozen (immutable) object
    build(): Readonly<TestScenario> {
        return Object.freeze({ ...this.scenario });
    }
}

// Usage — clean, readable, type-safe method chaining:
const smokeTest = new TestScenarioBuilder("Search Smoke Test")
    .withBrowser("chromium")
    .withTags("smoke", "search", "P0")
    .build();

const mobileTest = new TestScenarioBuilder("Mobile Search Test")
    .withBrowser("webkit")
    .withViewport(375, 812)
    .withTags("mobile", "responsive")
    .withTimeout(60000)
    .build();

const regressionTest = new TestScenarioBuilder("Full Regression")
    .withBrowser("firefox")
    .withRetries(3)
    .withTags("regression", "P1")
    .withBaseURL("https://prod.b2b-platform.com")
    .build();

console.log("  Smoke test:", smokeTest);
console.log("\n  Mobile test:", mobileTest);
console.log("\n  Regression test:", regressionTest);

// Type safety catches errors:
// new TestScenarioBuilder("Bad").withBrowser("safari").build();
// ❌ ERROR: "safari" is not assignable to "chromium" | "firefox" | "webkit"

console.log("\n  💡 Builder pattern = complex object with many optional fields");
console.log("     Method chaining with 'return this' makes it readable");
console.log("     Object.freeze() makes the built result immutable");


// ═══════════════════════════════════════
// 3. SINGLETON PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 3: Singleton Pattern\n");

class FrameworkConfig {
    private static instance: FrameworkConfig;

    // Private constructor — can't use 'new' from outside
    private constructor(
        public readonly baseURL: string,
        public readonly apiURL: string,
        public readonly timeout: number
    ) { }

    static getInstance(): FrameworkConfig {
        if (!FrameworkConfig.instance) {
            FrameworkConfig.instance = new FrameworkConfig(
                process.env.BASE_URL ?? "https://staging.b2b-platform.com",
                process.env.API_URL ?? "https://api-staging.b2b-platform.com",
                Number(process.env.TIMEOUT ?? 30000)
            );
        }
        return FrameworkConfig.instance;
    }
}

// Same instance everywhere in your framework:
const config1 = FrameworkConfig.getInstance();
const config2 = FrameworkConfig.getInstance();

console.log("  config1 === config2:", config1 === config2);  // true — same instance!
console.log("  config1.baseURL:", config1.baseURL);
console.log("  config1.timeout:", config1.timeout);

// Can't create with 'new':
// const config3 = new FrameworkConfig(...);  // ❌ ERROR: private constructor

console.log("\n  💡 Singleton = ONE instance shared everywhere");
console.log("     Private constructor prevents new FrameworkConfig()");
console.log("     Use for: configs, database connections, logger");


// ═══════════════════════════════════════
// 4. TYPED API CLIENT (DEMO)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 4: Typed API Client\n");

interface APIResponse<T> {
    status: "success" | "error";
    data: T;
    message?: string;
}

interface ProductAPIData {
    id: string;
    name: string;
    price: number;
    supplier: { name: string; verified: boolean };
}

class APIClient {
    constructor(
        private baseURL: string,
        private headers: Record<string, string> = {}
    ) { }

    // Generic private method — all requests flow through here
    private request<T>(method: string, endpoint: string): APIResponse<T> {
        console.log(`    → ${method} ${this.baseURL}${endpoint}`);
        // In real code: await fetch(...) and parse response
        // This is a demo — returning simulated data
        return {
            status: "success",
            data: {} as T,
            message: "OK"
        };
    }

    getProduct(id: string): APIResponse<ProductAPIData> {
        return this.request<ProductAPIData>("GET", `/api/products/${id}`);
    }

    getProducts(): APIResponse<ProductAPIData[]> {
        return this.request<ProductAPIData[]>("GET", "/api/products");
    }
}

const api = new APIClient("https://staging.b2b-platform.com", {
    "Authorization": "Bearer token-123"
});

const productResponse = api.getProduct("PROD-001");
console.log("  Response status:", productResponse.status);

const listResponse = api.getProducts();
console.log("  List response status:", listResponse.status);

console.log("\n  💡 Generic APIResponse<T> = ONE type for all endpoints");
console.log("     TypeScript knows: response.data.supplier.verified is boolean");
console.log("     TypeScript knows: listResponse.data is ProductAPIData[]");


// ═══════════════════════════════════════
// 5. FRAMEWORK ARCHITECTURE OVERVIEW
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Framework Architecture Overview\n");

console.log("  project/");
console.log("  ├── interfaces/");
console.log("  │   ├── pages.ts          ← Page contracts (interfaces)");
console.log("  │   ├── test-data.ts      ← Data shapes (interfaces)");
console.log("  │   └── api.ts            ← API response types (interfaces + generics)");
console.log("  ├── pages/");
console.log("  │   ├── BasePage.ts       ← Abstract class with shared logic");
console.log("  │   ├── SearchPage.ts     ← extends BasePage implements ISearchPage");
console.log("  │   ├── ProductPage.ts    ← extends BasePage implements IProductPage");
console.log("  │   └── MessagePage.ts    ← extends BasePage implements IMessagePage");
console.log("  ├── utils/");
console.log("  │   ├── TestDataFactory.ts ← Generic factory class");
console.log("  │   ├── APIClient.ts      ← Typed API client");
console.log("  │   └── Config.ts         ← Singleton config");
console.log("  ├── test-data/");
console.log("  │   ├── products.ts       ← Typed product data");
console.log("  │   └── suppliers.ts      ← Typed supplier data");
console.log("  ├── tests/");
console.log("  │   ├── search.spec.ts    ← Tests using typed page objects");
console.log("  │   └── product.spec.ts");
console.log("  └── playwright.config.ts");

console.log("\n  → Every file is typed. Your IDE knows everything. No guessing.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 FRAMEWORK PATTERNS SUMMARY\n");

console.log("  • Factory<T>:   Generic class → one factory for any data shape");
console.log("  • Builder:      Method chaining → clean config with .withX().build()");
console.log("  • Singleton:    Private constructor → one shared instance");
console.log("  • API Client:   Generic request<T> → typed responses for all endpoints");
console.log("  • 💡 All patterns are from Java — now you know them in TypeScript!");

console.log("\n═══════════════════════════════════════\n");

export { };
