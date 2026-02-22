/**
 * ============================================
 * 03 — TypeScript Patterns in Playwright Code
 * ============================================
 *
 * Day 11: Advanced Patterns, tsconfig & Wrap-Up
 * Real TypeScript patterns you'll encounter in
 * Playwright: test() types, fixtures, config,
 * expect() types, and the complete type picture.
 *
 * Run: npx ts-node 03_playwright_type_patterns.ts
 */

console.log("═══════════════════════════════════════");
console.log("   TYPESCRIPT PATTERNS IN PLAYWRIGHT");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. HOW Playwright's test() IS TYPED
// ═══════════════════════════════════════
console.log("📌 Pattern 1: How Playwright's test() Function Is Typed\n");

// Playwright defines an interface for the fixture args:
interface PlaywrightPage {
    goto(url: string): Promise<void>;
    fill(selector: string, value: string): Promise<void>;
    click(selector: string): Promise<void>;
    title(): Promise<string>;
}

// The test function accepts a destrucured parameter object:
type TestArgs = {
    page: PlaywrightPage;
    baseURL: string;
};

// This is how Playwright's test() function signature looks (simplified):
type TestFunction = (args: TestArgs) => Promise<void>;

function testSimulation(title: string, fn: TestFunction): void {
    console.log(`    → test('${title}') registered`);
    // Playwright runs fn with real { page, baseURL } at runtime
}

// When YOU write a test:
testSimulation("search products", async ({ page, baseURL }) => {
    // TypeScript knows:
    //   page is PlaywrightPage  → .goto(), .fill(), .click()
    //   baseURL is string       → baseURL.includes(...)
    await page.goto("/search");
});

console.log("\n  The { page, baseURL } is OBJECT DESTRUCTURING.");
console.log("  Playwright defines the shape — TypeScript enforces it.");
console.log("  You get full autocomplete for page.goto(), page.fill() etc.");


// ═══════════════════════════════════════
// 2. PLAYWRIGHT FIXTURES — Generics in Action
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 2: Custom Fixtures with Generics\n");

// Simulate Playwright's Page Object classes:
class SearchPagePO {
    constructor(private pageName: string) { }

    async search(query: string): Promise<void> {
        console.log(`    → [${this.pageName}] Searching: "${query}"`);
    }

    async getResultCount(): Promise<number> { return 42; }
}

class ProductPagePO {
    constructor(private pageName: string) { }

    async getProductName(): Promise<string> { return "Cotton Shirt"; }
    async getPrice(): Promise<number> { return 250; }
}

class APIClientSim {
    constructor(private baseURL: string) { }
    async getProducts(): Promise<{ id: string; name: string }[]> {
        console.log(`    → [APIClient] GET ${this.baseURL}/api/products`);
        return [{ id: "1", name: "Cotton Shirt" }];
    }
}

// Your custom fixture type — extends Playwright's base type:
type MyFixtures = {
    searchPage: SearchPagePO;
    productPage: ProductPagePO;
    apiClient: APIClientSim;
};

// In real Playwright, this is how you extend the test:
// const test = base.extend<MyFixtures>({
//     searchPage: async ({ page }, use) => {
//         const p = new SearchPage(page);
//         await use(p);   // setup
//         // code after use() runs as teardown
//     },
//     productPage: async ({ page }, use) => {
//         await use(new ProductPage(page));
//     },
//     apiClient: async ({}, use) => {
//         await use(new APIClient("https://staging..."));
//     }
// });

// Simulation of the fixture resolution:
async function runTestWithFixtures(
    title: string,
    fn: (fixtures: MyFixtures) => Promise<void>
) {
    const fixtures: MyFixtures = {
        searchPage: new SearchPagePO("Search"),
        productPage: new ProductPagePO("Product"),
        apiClient: new APIClientSim("https://staging.b2b-platform.com")
    };

    console.log(`  [Playwright] Running: "${title}"`);
    await fn(fixtures);
}

(async () => {
    await runTestWithFixtures("search with fixtures", async ({ searchPage, apiClient }) => {
        // TypeScript knows searchPage is SearchPagePO — full autocomplete!
        await searchPage.search("cotton");
        const count = await searchPage.getResultCount();
        console.log(`    → Result count: ${count}`);

        const products = await apiClient.getProducts();
        console.log(`    → API products: ${products.length} items`);
    });
})();

console.log("\n  base.extend<MyFixtures>() — generics tell Playwright what types");
console.log("  to add to the test argument. Zero runtime overhead.");


// ═══════════════════════════════════════
// 3. THE as const PATTERN IN REAL CODE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 3: as const in Real Test Code\n");

// 🐛 DEBUG CHALLENGE — Why does this fail?
// const testData = {
//     browsers: ["chromium", "firefox", "webkit"],
//     environments: ["staging", "production"]
// };
// function runTest(browser: "chromium"|"firefox"|"webkit", env: "staging"|"production") { }
// testData.browsers.forEach(browser => {
//     testData.environments.forEach(env => {
//         runTest(browser, env);  // ❌ ERROR: string not assignable to literal union
//     });
// });

// WHY: testData.browsers is typed as string[] — not literal union
// FIX: add as const

const testData = {
    browsers: ["chromium", "firefox", "webkit"],
    environments: ["staging", "production"]
} as const;
// Now: browsers is readonly ["chromium", "firefox", "webkit"]
// Each item is "chromium" | "firefox" | "webkit" — not just string!

function runTest(
    browser: "chromium" | "firefox" | "webkit",
    env: "staging" | "production"
): void {
    console.log(`    → ${browser} × ${env}`);
}

console.log("  Running test matrix:");
testData.browsers.forEach(browser => {
    testData.environments.forEach(env => {
        runTest(browser, env);  // ✅ No error! Literals match literals
    });
});

console.log("\n  💡 'as const' = the single most common Day 11 fix");
console.log("     Freezes array/object to literal types, not wider 'string'");


// ═══════════════════════════════════════
// 4. TYPE-SAFE expect() PATTERNS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 4: Type-Safe expect() Patterns\n");

// Playwright's expect() is typed — it knows WHAT assertions are valid
// based on the type of value you pass in.

// Simulating the type behaviour (not real Playwright, but shows the typing):
function expectStr(value: string) {
    return {
        toBe: (expected: string) => {
            const pass = value === expected;
            console.log(`    expect("${value}").toBe("${expected}") → ${pass ? "✅" : "❌"}`);
        },
        toContain: (sub: string) => {
            const pass = value.includes(sub);
            console.log(`    expect("${value}").toContain("${sub}") → ${pass ? "✅" : "❌"}`);
        }
        // .toBeGreaterThan() is NOT here — strings don't have numeric assertions!
    };
}

function expectNum(value: number) {
    return {
        toBe: (expected: number) => {
            const pass = value === expected;
            console.log(`    expect(${value}).toBe(${expected}) → ${pass ? "✅" : "❌"}`);
        },
        toBeGreaterThan: (min: number) => {
            const pass = value > min;
            console.log(`    expect(${value}).toBeGreaterThan(${min}) → ${pass ? "✅" : "❌"}`);
        }
        // .toContain() is NOT here — numbers don't have string assertions!
    };
}

const title = "Search Results";
expectStr(title).toBe("Search Results");
expectStr(title).toContain("Search");
// expectStr(title).toBeGreaterThan(5);  // ❌ Type error — not a number assertion

const count = 42;
expectNum(count).toBeGreaterThan(0);
expectNum(count).toBe(42);
// expectNum(count).toContain("42");     // ❌ Type error — not a string assertion

console.log("\n  TypeScript makes assertions TYPE-SAFE.");
console.log("  Wrong assertion (string method on number) = compile error.");
console.log("  Bugs in test code caught before running.");


// ═══════════════════════════════════════
// 5. PLAYWRIGHT CONFIG TYPE SAFETY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 5: Config Type Safety (defineConfig)\n");

// defineConfig() validates your entire playwright.config.ts
// Mistyped options = compile error, not silent misconfig

const playwrightConfig = {
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: false,       // process.env.CI ? true : false
    retries: 2,              // number ✅  — "two" would be ❌
    workers: 4,
    reporter: "html",        // "html" | "list" | ... ✅ — "excel" would be ❌
    use: {
        baseURL: "https://staging.b2b-platform.com",
        trace: "on-first-retry",    // valid trace option ✅
        screenshot: "only-on-failure",
        actionTimeout: 10000,
        navigationTimeout: 30000
    },
    projects: [
        { name: "chromium", use: { channel: "chrome" } },
        { name: "firefox", use: {} },
        { name: "webkit", use: {} },
        { name: "mobile", use: { viewport: { width: 375, height: 812 } } }
    ]
};

console.log("  playwright.config.ts → defineConfig() validates ALL properties");
console.log("  retries: 2    ✅   (number)");
console.log("  retries: 'two' ❌  (string — type error!)");
console.log("  trace: 'on-first-retry' ✅");
console.log("  trace: 'always-on'      ❌  (not a valid trace option)");
console.log("  reporter: 'html' ✅");
console.log("  reporter: 'excel' ❌ (not a valid reporter)");
console.log("\n  Config:", JSON.stringify(playwrightConfig.use, null, 4).split("\n").slice(0, 6).map(l => "  " + l).join("\n"), "...");


// ═══════════════════════════════════════
// 6. COMPLETE TYPE ARCHITECTURE OVERVIEW
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Complete Type Architecture\n");

// The type hierarchy in your Playwright framework:

// 1. INTERFACES — contracts (Day 9)
interface IPage {
    navigate(path: string): Promise<void>;
    getTitle(): Promise<string>;
}

interface ISearchable {
    search(query: string): Promise<void>;
    getResultCount(): Promise<number>;
}

// 2. ABSTRACT BASE CLASS — shared behaviour (Day 10)
abstract class BasePageSim implements IPage {
    constructor(protected readonly name: string) { }

    async navigate(path: string): Promise<void> {
        console.log(`    → [${this.name}] navigate(${path})`);
    }

    async getTitle(): Promise<string> {
        return `Platform — ${this.name}`;
    }

    abstract waitForLoad(): Promise<void>;
}

// 3. CONCRETE PAGE — extends + implements (Day 10)
class SearchPageFull extends BasePageSim implements ISearchable {
    constructor() { super("Search"); }

    async waitForLoad(): Promise<void> {
        console.log("    → [Search] waitForLoad()");
    }

    async search(query: string): Promise<void> {
        console.log(`    → [Search] search("${query}")`);
        await this.waitForLoad();
    }

    async getResultCount(): Promise<number> { return 42; }
}

// 4. GENERICS — reusable factory (Day 9-10)
class TestDataFactory<T> {
    constructor(private defaults: T) { }
    create(overrides: Partial<T> = {}): T {
        return { ...this.defaults, ...overrides };
    }
}

interface SearchQuery {
    query: string;
    category: string;
    sortBy: "price" | "relevance";
    expectedCount: number;
}

const queryFactory = new TestDataFactory<SearchQuery>({
    query: "cotton",
    category: "Textiles",
    sortBy: "relevance",
    expectedCount: 10
});

// 5. ADVANCED TYPES — Day 11
type QueryKeys = keyof SearchQuery;  // "query" | "category" | "sortBy" | "expectedCount"
type LooseQuery = Partial<SearchQuery>;  // all optional

// Use it all together:
const sp = new SearchPageFull();
const testQuery = queryFactory.create({ query: "silk", sortBy: "price" });

(async () => {
    await sp.navigate("/search");
    await sp.search(testQuery.query);
    const resultCount = await sp.getResultCount();
    console.log(`  Search count: ${resultCount}`);
    console.log(`  Test query:`, testQuery);
    console.log(`  QueryKeys = '${["query", "category", "sortBy", "expectedCount"].join("' | '")}' `);
})();


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 PLAYWRIGHT TYPE PATTERNS SUMMARY\n");

console.log("  • test({ page }) — destructuring a typed parameter object");
console.log("  • base.extend<MyFixtures>() — generics add typed fixtures");
console.log("  • as const — makes string arrays literal unions (no more 'string[]')");
console.log("  • expect(string) — only string assertions available");
console.log("  • expect(number) — only numeric assertions available");
console.log("  • defineConfig() — validates every playwright.config option");
console.log("  • Full stack: Interface → Abstract → Concrete + Generics");

console.log("\n═══════════════════════════════════════\n");

export { };
