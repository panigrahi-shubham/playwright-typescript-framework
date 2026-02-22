/**
 * ============================================
 * 01 — Interfaces
 * ============================================
 *
 * Day 9: Interfaces, Type Guards & Advanced Types
 * Interfaces define the SHAPE (contract) of an object.
 * They specify what properties and methods an object
 * MUST have — without any implementation.
 *
 * Run: npx ts-node 01_interfaces.ts
 */

console.log("═══════════════════════════════════════");
console.log("   INTERFACES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BASIC INTERFACE — DEFINING OBJECT SHAPES
// ═══════════════════════════════════════
console.log("📌 Basic Interface — The Blueprint\n");

// An interface is a contract — it defines what a valid object looks like.
// Think of it as a job description: it lists requirements, but doesn't DO anything.

interface Product {
    id: string;
    name: string;
    price: number;
    moq: number;           // minimum order quantity
    category: string;
    inStock: boolean;
}

// Any object of type Product MUST have ALL these properties with EXACTLY these types
const shirt: Product = {
    id: "PROD-001",
    name: "Cotton Shirt",
    price: 250,
    moq: 100,
    category: "Textiles",
    inStock: true
};

console.log("  shirt:", shirt);

// Missing property? → COMPILE ERROR (uncomment to see)
// const fabric: Product = {
//     id: "PROD-002",
//     name: "Silk Fabric",
//     price: 800,
//     // ❌ ERROR: Property 'moq' is missing
//     category: "Textiles",
//     inStock: true
// };

// Wrong type? → COMPILE ERROR
// const bolt: Product = {
//     id: "PROD-003",
//     name: "Steel Bolt",
//     price: "15",  // ❌ ERROR: string not assignable to number
//     moq: 5000,
//     category: "Hardware",
//     inStock: true
// };

// Extra property? → COMPILE ERROR
// const wire: Product = {
//     ...shirt,
//     color: "copper"  // ❌ ERROR: 'color' does not exist in type 'Product'
// };

console.log("\n  ✅ TypeScript checks EVERY object against its interface");
console.log("     Missing, wrong type, or extra properties → all caught at compile time!\n");


// ═══════════════════════════════════════
// 2. OPTIONAL PROPERTIES (?)
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 Optional Properties (?)\n");

// Not every property is always required. The ? makes it optional.

interface SearchParams {
    query: string;              // REQUIRED — every search needs a query
    page?: number;              // OPTIONAL — defaults to page 1
    limit?: number;             // OPTIONAL — defaults to 20
    category?: string;          // OPTIONAL — search all categories
    priceRange?: {              // OPTIONAL — nested optional object
        min: number;
        max: number;
    };
}

// All of these are valid:
const search1: SearchParams = { query: "cotton" };
const search2: SearchParams = { query: "cotton", page: 2 };
const search3: SearchParams = { query: "cotton", category: "Textiles", limit: 50 };
const search4: SearchParams = { query: "cotton", priceRange: { min: 100, max: 500 } };

console.log("  search1 (query only):", search1);
console.log("  search2 (+ page):", search2);
console.log("  search3 (+ category, limit):", search3);
console.log("  search4 (+ priceRange):", search4);

// But query is required:
// const search5: SearchParams = { page: 1 };
// ❌ ERROR: Property 'query' is missing

// When accessing optional properties, TypeScript knows they might be undefined:
function buildSearchURL(params: SearchParams): string {
    let url = `/search?q=${params.query}`;

    // Must handle optional properties — they could be undefined
    if (params.page) {
        url += `&page=${params.page}`;
    }

    // Nullish coalescing (??) provides a default value
    url += `&limit=${params.limit ?? 20}`;

    return url;
}

console.log("\n  buildSearchURL({ query: 'cotton', page: 3 }):");
console.log("   ", buildSearchURL({ query: "cotton", page: 3 }));
console.log("  buildSearchURL({ query: 'silk' }):");
console.log("   ", buildSearchURL({ query: "silk" }));


// ═══════════════════════════════════════
// 3. READONLY PROPERTIES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Readonly Properties\n");

// Prevent properties from being changed after creation — like Java's final

interface TestConfig {
    readonly baseURL: string;
    readonly timeout: number;
    readonly browser: "chromium" | "firefox" | "webkit";
    retries: number;            // This CAN be changed
}

const config: TestConfig = {
    baseURL: "https://b2b-platform.com",
    timeout: 30000,
    browser: "chromium",
    retries: 2
};

config.retries = 3;           // ✅ OK — not readonly
// config.baseURL = "https://other.com";  // ❌ ERROR: Cannot assign to 'baseURL' (readonly)
// config.timeout = 60000;               // ❌ ERROR: readonly

console.log("  config:", config);
console.log("  config.retries updated to 3 ✅");
console.log("  config.baseURL = '...' → ❌ ERROR (readonly)");
console.log("\n  💡 readonly = Java's 'final' — once set, can't change");


// ═══════════════════════════════════════
// 4. INTERFACE METHODS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Interface Methods\n");

// Interfaces can define method signatures — what methods an object MUST have

interface PageObject {
    readonly pageName: string;

    // Method signatures — no implementation, just the contract
    navigate(path: string): Promise<void>;
    getTitle(): Promise<string>;
    waitForLoad(): Promise<void>;

    // Optional method
    takeScreenshot?(name: string): Promise<void>;
}

// Any class implementing this MUST have all required methods:
class SearchPage implements PageObject {
    readonly pageName = "Search Page";

    async navigate(path: string): Promise<void> {
        console.log(`    → Navigating to ${path}`);
    }

    async getTitle(): Promise<string> {
        return "B2B Search Results";
    }

    async waitForLoad(): Promise<void> {
        console.log("    → Waiting for page load...");
    }
    // takeScreenshot is optional — we can omit it
}

const searchPage = new SearchPage();
console.log("  searchPage.pageName:", searchPage.pageName);

// Run the async methods
(async () => {
    await searchPage.navigate("/search?q=cotton");
    const title = await searchPage.getTitle();
    console.log("  title:", title);
    await searchPage.waitForLoad();
})();


// ═══════════════════════════════════════
// 5. EXTENDING INTERFACES (INHERITANCE)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Extending Interfaces (Inheritance)\n");

// Just like classes, interfaces can extend other interfaces

interface BasePageInterface {
    navigate(path: string): Promise<void>;
    getTitle(): Promise<string>;
}

interface SearchPageInterface extends BasePageInterface {
    search(query: string): Promise<void>;
    getResultCount(): Promise<number>;
    applyFilter(category: string): Promise<void>;
}

interface ProductPageInterface extends BasePageInterface {
    getProductName(): Promise<string>;
    getPrice(): Promise<number>;
    contactSupplier(): Promise<void>;
}

// Multiple inheritance — extends BOTH interfaces
interface FullPageInterface extends SearchPageInterface, ProductPageInterface {
    // Has ALL methods from both SearchPageInterface and ProductPageInterface
    // Plus BasePageInterface methods (inherited through both)
}

console.log("  BasePageInterface:    navigate(), getTitle()");
console.log("  SearchPageInterface:  + search(), getResultCount(), applyFilter()");
console.log("  ProductPageInterface: + getProductName(), getPrice(), contactSupplier()");
console.log("  FullPageInterface:    has ALL of the above ✅");
console.log("\n  💡 Same as Java: interface B extends A, interface C extends A, B");


// ═══════════════════════════════════════
// 6. STRUCTURAL TYPING — TYPESCRIPT'S SUPERPOWER
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Structural Typing\n");

// BIGGEST difference between Java and TypeScript!
// Java = Nominal Typing  → types match by NAME
// TypeScript = Structural Typing → types match by SHAPE

interface Dog { name: string; age: number; }
interface Person { name: string; age: number; }

let myDog: Dog = { name: "Rex", age: 5 };
let myPerson: Person = myDog;  // ✅ WORKS! Same shape = compatible

console.log("  myDog:", myDog);
console.log("  myPerson (assigned from myDog):", myPerson);
console.log("  Same shape → compatible, even though different interface names!");

// Even without ANY interface, if the shape matches, it works:
function greetEntity(entity: { name: string }): string {
    return `Hello, ${entity.name}!`;
}

// ⚠️ Structural typing works when passing through a VARIABLE (not direct literal)
// Direct literals get "excess property checking" — TS rejects extra properties
const rex = { name: "Rex", age: 5 };         // has extra 'age' — that's fine
const supplier2 = { name: "TextilePro", rating: 4.8 };

console.log("\n  greetEntity(rex):", greetEntity(rex));               // ✅ Works! Has 'name'
console.log("  greetEntity(supplier2):", greetEntity(supplier2));     // ✅ Works! Has 'name'
console.log("  greetEntity({ name: 'Alice' }):", greetEntity({ name: "Alice" }));
// TypeScript only checks: does it have 'name: string'? Yes? Then it's valid.

console.log("\n  ⚠️ Java: Dog ≠ Person (even if same fields) — nominal typing");
console.log("  ✅ TypeScript: Dog = Person (same shape) — structural typing");


// ═══════════════════════════════════════
// 7. INDEX SIGNATURES — DYNAMIC PROPERTY NAMES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Index Signatures — Dynamic Property Names\n");

// When you don't know all property names in advance:

interface PriceMap {
    [productId: string]: number;   // any string key → number value
}

const prices: PriceMap = {
    "PROD-001": 250,
    "PROD-002": 800,
    "PROD-003": 15
};

prices["PROD-004"] = 350;             // ✅ OK — string key, number value
// prices["PROD-005"] = "expensive";  // ❌ ERROR: string not assignable to number

console.log("  prices:", prices);
console.log("  prices['PROD-004']:", prices["PROD-004"]);

console.log("\n  💡 Useful for: API response maps, config objects, locator dictionaries");


// ═══════════════════════════════════════
// 8. JAVA ↔ TYPESCRIPT INTERFACE COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ TypeScript Interface Comparison\n");

console.log("  ┌────────────────────────────────┬────────────────────────────────┐");
console.log("  │ Java Interfaces                │ TypeScript Interfaces          │");
console.log("  ├────────────────────────────────┼────────────────────────────────┤");
console.log("  │ Define method signatures       │ Define properties + methods    │");
console.log("  │ Class says 'implements X'      │ Just match the shape (duck)    │");
console.log("  │ Nominal typing (by name)       │ Structural typing (by shape)   │");
console.log("  │ Exist at runtime               │ Erased at compile time (zero)  │");
console.log("  │ Can't have properties directly │ Properties are primary use     │");
console.log("  │ Used for polymorphism          │ Used for data shapes, configs  │");
console.log("  └────────────────────────────────┴────────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 INTERFACES SUMMARY\n");

console.log("  • Interface:     interface Product { name: string; price: number; }");
console.log("  • Optional:      property?: type  (can be missing)");
console.log("  • Readonly:      readonly property: type  (can't change after init)");
console.log("  • Methods:       methodName(param: type): returnType");
console.log("  • Extends:       interface B extends A { ... }");
console.log("  • Structural:    Same shape = compatible (no 'implements' needed)");
console.log("  • Index sig:     [key: string]: valueType  (dynamic keys)");
console.log("  • 💡 Interfaces are erased at compile time — zero runtime cost");

console.log("\n═══════════════════════════════════════\n");

export { };
