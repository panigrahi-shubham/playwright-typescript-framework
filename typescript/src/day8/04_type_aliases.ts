/**
 * ============================================
 * 04 — Type Aliases & Special Types
 * ============================================
 *
 * Day 8: TypeScript Fundamentals
 * When types get complex or reused,
 * give them a name with the 'type' keyword.
 * Also: any vs unknown — the escape hatches.
 *
 * Run: npx ts-node typescript/src/day8/04_type_aliases.ts
 */

console.log("═══════════════════════════════════════");
console.log("   TYPE ALIASES & SPECIAL TYPES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. TYPE ALIASES — NAMING COMPLEX TYPES
// ═══════════════════════════════════════
console.log("📌 Type Aliases — Naming Complex Types\n");

// Without alias — messy and hard to reuse:
// let product: { id: string | number; name: string; price: number; moq: number; category: string; inStock: boolean };
// let product2: { id: string | number; name: string; price: number; moq: number; category: string; inStock: boolean };
// 😫 Repeating this everywhere is painful!

// With alias — clean and reusable:
type ProductID = string | number;   // Simple alias for a union

type Product = {
    id: ProductID;    // Using another alias inside!
    name: string;
    price: number;
    moq: number;       // Minimum Order Quantity
    category: string;
    inStock: boolean;
};

// Now use it everywhere — clean and consistent:
const shirt: Product = {
    id: "PROD-001",
    name: "Cotton Shirt",
    price: 250,
    moq: 100,
    category: "Textiles",
    inStock: true
};

const fabric: Product = {
    id: 1002,
    name: "Silk Fabric",
    price: 800,
    moq: 50,
    category: "Textiles",
    inStock: false
};

console.log("  shirt:", shirt);
console.log("  fabric:", fabric);

// Type aliases work with arrays too:
let catalog: Product[] = [shirt, fabric];
console.log("  catalog length:", catalog.length);


// ═══════════════════════════════════════
// 2. TYPE ALIASES WITH FUNCTIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Type Aliases with Functions\n");

// Functions using type aliases — self-documenting!
function getExpensiveProducts(products: Product[], minPrice: number): Product[] {
    return products.filter(p => p.price > minPrice);
}

const expensive = getExpensiveProducts(catalog, 300);
console.log("  Products > $300:", expensive.map(p => `${p.name} ($${p.price})`));

// Function type alias — give a name to a function signature
type PriceFormatter = (price: number) => string;

const formatUSD: PriceFormatter = (price) => `$${price.toFixed(2)}`;
const formatINR: PriceFormatter = (price) => `₹${price.toFixed(2)}`;

console.log("  formatUSD(250):", formatUSD(250));
console.log("  formatINR(250):", formatINR(250));


// ═══════════════════════════════════════
// 3. NESTED TYPE ALIASES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Nested Type Aliases\n");

// Build complex types by composing simpler ones:
type Address = {
    street: string;
    city: string;
    state: string;
    pincode: string;
};

type Supplier = {
    name: string;
    email: string;
    rating: number;
    address: Address;        // Nested type alias!
    products: ProductID[];   // Array of ProductIDs
};

const supplier: Supplier = {
    name: "TextilePro Ltd",
    email: "contact@textilepro.com",
    rating: 4.8,
    address: {
        street: "123 Trade Street",
        city: "Shanghai",
        state: "Shanghai",
        pincode: "200000"
    },
    products: ["PROD-001", 1002, "PROD-003"]
};

console.log("  supplier:", supplier.name);
console.log("  city:", supplier.address.city);
console.log("  products:", supplier.products);


// ═══════════════════════════════════════
// 4. OPTIONAL PROPERTIES & READONLY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Optional Properties & Readonly\n");

// Optional with ?
type SearchFilters = {
    query: string;           // required
    category?: string;       // optional — may or may not be provided
    minPrice?: number;       // optional
    maxPrice?: number;       // optional
    page?: number;           // optional
};

const basicSearch: SearchFilters = { query: "cotton" };
const advancedSearch: SearchFilters = {
    query: "cotton",
    category: "Textiles",
    minPrice: 100,
    maxPrice: 500,
    page: 2
};

console.log("  basicSearch:", basicSearch);
console.log("  advancedSearch:", advancedSearch);

// Readonly — prevents modification after creation
type Config = {
    readonly apiUrl: string;
    readonly timeout: number;
    readonly retries: number;
};

const testConfig: Config = {
    apiUrl: "https://api.b2b-platform.com",
    timeout: 30000,
    retries: 3
};

console.log("  testConfig:", testConfig);
// testConfig.timeout = 60000;  // ❌ ERROR: Cannot assign to 'timeout' — it is read-only
console.log("  Cannot modify readonly properties ✅");


// ═══════════════════════════════════════
// 5. any vs unknown — THE ESCAPE HATCHES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 any vs unknown — The Escape Hatches\n");

// ──── any: DISABLES ALL type checking ────
// Accept any value, use it any way — NO safety
let dataAny: any = "hello";
dataAny = 42;
dataAny = { foo: "bar" };
// dataAny.foo.bar.baz.qux;  // No error! any skips ALL checks.
// Even if this would crash at runtime, TS says nothing.

console.log("  any: accepts anything, no checks at all");
console.log("  any is like removing your seatbelt 🚗💥");

// ──── unknown: the SAFE alternative ────
// Accept any value, but FORCES you to check type before using
let dataUnknown: unknown = "hello";
dataUnknown = 42;
dataUnknown = { name: "test" };

// dataUnknown.name;  // ❌ ERROR: Object is of type 'unknown'
// Must narrow first:
if (typeof dataUnknown === "object" && dataUnknown !== null) {
    console.log("  unknown: after typeof check, TS allows access");
}

console.log("\n  🚨 KNOW THE DIFFERENCE:");
console.log("  ┌──────────────────────────────────────────────────────┐");
console.log("  │ any     = 'I trust this, skip all checks'  → AVOID  │");
console.log("  │ unknown = 'I don't know — I'll check first' → USE   │");
console.log("  └──────────────────────────────────────────────────────┘");
console.log("  Aim for ZERO any types in your Playwright framework!");

// Real-world example: API response
// const response = await fetch("/api/product");
// const body: unknown = await response.json(); // unknown — we don't trust the API
// Now we must validate before using — this is SAFE coding!


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TYPE ALIASES & SPECIAL TYPES SUMMARY\n");

console.log("  • type Name = { ... }  — name a complex type");
console.log("  • type Union = A | B   — name a union type");
console.log("  • Compose types:       type Order = { product: Product }");
console.log("  • Optional: key?: type — property may not exist");
console.log("  • Readonly: readonly key: type — cannot modify");
console.log("  • any: disables ALL checks — avoid in production");
console.log("  • unknown: safe alternative — must check before use");
console.log("  • Goal: ZERO any types in your framework");

console.log("\n═══════════════════════════════════════\n");

export { };
