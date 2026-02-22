/**
 * ============================================
 * 02 — Parameter Properties, Getters & Static
 * ============================================
 *
 * Day 10: Classes, Access Modifiers & Page Objects
 * TypeScript shortcuts that Java doesn't have:
 * parameter properties, get/set keywords,
 * and static members.
 *
 * Run: npx ts-node 02_parameter_properties_getters.ts
 */

console.log("═══════════════════════════════════════");
console.log("   PARAMETER PROPERTIES, GETTERS & STATIC");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. PARAMETER PROPERTIES — TS SHORTCUT
// ═══════════════════════════════════════
console.log("📌 Parameter Properties — TypeScript's Shortcut\n");

// LONG way (Java-style):
class ProductLong {
    private name: string;
    private price: number;
    readonly category: string;

    constructor(name: string, price: number, category: string) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    toString(): string { return `${this.name} — ₹${this.price}`; }
}

// SHORT way (TypeScript parameter properties):
class ProductShort {
    constructor(
        private name: string,
        private price: number,
        readonly category: string
    ) {
        // That's it! No this.x = x needed.
        // Adding an access modifier in the constructor parameter automatically:
        // 1. Declares the property
        // 2. Assigns the parameter value to it
    }

    toString(): string { return `${this.name} — ₹${this.price} [${this.category}]`; }
}

const longProduct = new ProductLong("Shirt", 250, "Textiles");
const shortProduct = new ProductShort("Shirt", 250, "Textiles");

console.log("  Long way:", longProduct.toString());
console.log("  Short way:", shortProduct.toString());
console.log("  → Both produce identical classes — short way saves 6 lines!\n");

// Playwright use case — MOST COMMON pattern you'll see:
class SearchPageExample {
    constructor(private page: any) {
        // 'this.page' is now a private property, automatically assigned
    }

    async search(query: string): Promise<void> {
        console.log(`    → Searching for "${query}" on ${typeof this.page}`);
    }
}

const searchExample = new SearchPageExample({ fill: () => { }, click: () => { } });
searchExample.search("cotton");

console.log("\n  💡 EVERY Playwright Page Object uses this pattern:");
console.log('     constructor(private page: Page) { }');
console.log("     → One line does declaration + assignment");
console.log("\n  ⚠️ Java has NO equivalent — Lombok's @AllArgsConstructor is the closest");


// ═══════════════════════════════════════
// 2. GETTERS AND SETTERS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Getters and Setters\n");

class ProductWithAccessors {
    constructor(
        private _name: string,      // underscore convention for backing field
        private _price: number
    ) { }

    // Getter — accessed like a PROPERTY (no parentheses!)
    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    // Setter — with validation
    set price(value: number) {
        if (value < 0) {
            throw new Error("Price cannot be negative");
        }
        this._price = value;
    }

    // Computed getter — derived value, no storage needed
    get priceWithGST(): number {
        return this._price * 1.18;
    }

    get summary(): string {
        return `${this._name} — ₹${this._price} (incl. GST: ₹${this.priceWithGST.toFixed(0)})`;
    }
}

const product = new ProductWithAccessors("Cotton Shirt", 250);

// Getters look like property access (no parentheses):
console.log("  product.name:", product.name);                 // calls get name()
console.log("  product.price:", product.price);               // calls get price()
console.log("  product.priceWithGST:", product.priceWithGST); // computed getter
console.log("  product.summary:", product.summary);

// Setter looks like assignment:
product.price = 300;                    // calls set price(300) — validation runs
console.log("  After price = 300:", product.summary);

// Validation catches bad values:
try {
    product.price = -50;
} catch (e: unknown) {
    console.log("  price = -50: ❌", (e as Error).message);
}

console.log("\n  ┌───────────────────────┬───────────────────────────────────┐");
console.log("  │ Java                  │ TypeScript                        │");
console.log("  ├───────────────────────┼───────────────────────────────────┤");
console.log("  │ product.getName()     │ product.name  (looks like prop)   │");
console.log("  │ product.setPrice(300) │ product.price = 300               │");
console.log("  │ No computed props     │ get priceWithGST() { return ... } │");
console.log("  └───────────────────────┴───────────────────────────────────┘");


// ═══════════════════════════════════════
// 3. STATIC MEMBERS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Static Members\n");

class TestUtils {
    // Static property — shared across all instances
    static readonly DEFAULT_TIMEOUT = 30000;
    static testCount = 0;

    // Static method — called on the CLASS, not an instance
    static generateId(prefix: string = "TEST"): string {
        TestUtils.testCount++;
        return `${prefix}_${TestUtils.testCount}`;
    }

    static formatDuration(ms: number): string {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(1)}s`;
    }

    static delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Called on the CLASS — no 'new' needed:
console.log("  TestUtils.DEFAULT_TIMEOUT:", TestUtils.DEFAULT_TIMEOUT);
console.log("  TestUtils.generateId('PROD'):", TestUtils.generateId("PROD"));
console.log("  TestUtils.generateId('PROD'):", TestUtils.generateId("PROD"));
console.log("  TestUtils.testCount:", TestUtils.testCount);
console.log("  TestUtils.formatDuration(2500):", TestUtils.formatDuration(2500));
console.log("  TestUtils.formatDuration(450):", TestUtils.formatDuration(450));

// Cannot call static on instance:
// const utils = new TestUtils();
// utils.generateId();  // ❌ ERROR — static methods are on the class

console.log("\n  💡 Use static for: utility functions, constants, counters, formatters");
console.log("     Same concept as Java's static methods and fields");


// ═══════════════════════════════════════
// 4. readonly PROPERTIES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 readonly Properties\n");

class TestConfig {
    constructor(
        public readonly baseURL: string,
        public readonly timeout: number,
        public readonly browser: "chromium" | "firefox" | "webkit",
        public retries: number     // NOT readonly — can be changed
    ) { }
}

const config = new TestConfig("https://b2b-platform.com", 30000, "chromium", 2);
config.retries = 3;                 // ✅ OK — not readonly
// config.baseURL = "other";        // ❌ ERROR: readonly
// config.timeout = 60000;          // ❌ ERROR: readonly

console.log("  config:", {
    baseURL: config.baseURL,
    timeout: config.timeout,
    browser: config.browser,
    retries: config.retries
});
console.log("  config.retries = 3 ✅ (not readonly)");
console.log("  config.baseURL = '...' ❌ (readonly)");

console.log("\n  💡 readonly = Java's 'final' — set once in constructor, never changes");
console.log("     Use for: page references, config values, dependency injection");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 SUMMARY\n");

console.log("  • Parameter props: constructor(private x: T) — auto-declare + assign");
console.log("  • Getters:         get name() → accessed as product.name (no parens)");
console.log("  • Setters:         set price(v) → used as product.price = v");
console.log("  • Static:          Class-level, no 'new' needed — TestUtils.method()");
console.log("  • readonly:        Set once in constructor, never changes — like Java final");
console.log("  • 💡 Playwright pattern: constructor(private readonly page: Page)");

console.log("\n═══════════════════════════════════════\n");

export { };
