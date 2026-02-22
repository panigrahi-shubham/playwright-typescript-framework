/**
 * ============================================
 * 04 — Utility Types
 * ============================================
 *
 * Day 9: Interfaces, Type Guards & Advanced Types
 * TypeScript provides built-in utility types that
 * TRANSFORM existing types. These are used constantly
 * in professional frameworks.
 *
 * Run: npx ts-node 04_utility_types.ts
 */

console.log("═══════════════════════════════════════");
console.log("   UTILITY TYPES");
console.log("═══════════════════════════════════════\n");


// Base interface used throughout this file
interface Product {
    id: string;
    name: string;
    price: number;
    moq: number;
    category: string;
    inStock: boolean;
}


// ═══════════════════════════════════════
// 1. Partial<T> — MAKE ALL PROPERTIES OPTIONAL
// ═══════════════════════════════════════
console.log("📌 Partial<T> — All Properties Optional\n");

// Partial<Product> = every property becomes optional
// Equivalent to: { id?: string; name?: string; price?: number; ... }

function updateProduct(id: string, changes: Partial<Product>): void {
    console.log(`  Updating ${id} with:`, changes);
}

updateProduct("PROD-001", { price: 300 });                    // only price
updateProduct("PROD-001", { price: 300, moq: 200 });         // price + moq
updateProduct("PROD-001", {});                                 // no changes (still valid)

console.log("\n  💡 Perfect for UPDATE functions where you only change some fields");
console.log("     Without Partial, you'd need to pass ALL fields every time!");


// ═══════════════════════════════════════
// 2. Required<T> — MAKE ALL PROPERTIES REQUIRED
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Required<T> — All Properties Required\n");

// Opposite of Partial — makes optional properties required

interface SearchParams {
    query: string;
    page?: number;
    limit?: number;
}

type StrictSearchParams = Required<SearchParams>;
// Now page AND limit are REQUIRED

const strictSearch: StrictSearchParams = {
    query: "cotton",
    page: 1,         // Must include now
    limit: 20        // Must include now
};

console.log("  StrictSearchParams:", strictSearch);
console.log("  → page and limit are now REQUIRED (were optional with ?)");

// This would fail:
// const badSearch: StrictSearchParams = { query: "cotton" };
// ❌ ERROR: page and limit are missing


// ═══════════════════════════════════════
// 3. Pick<T, Keys> — SELECT SPECIFIC PROPERTIES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pick<T, Keys> — Select Specific Properties\n");

// Pick only the properties you need from a larger interface

type ProductSummary = Pick<Product, "name" | "price">;
// Equivalent to: { name: string; price: number; }

type ProductFilter = Pick<Product, "id" | "category">;
// Equivalent to: { id: string; category: string; }

const summary: ProductSummary = { name: "Cotton Shirt", price: 250 };
const filter: ProductFilter = { id: "PROD-001", category: "Textiles" };

console.log("  ProductSummary (name + price):", summary);
console.log("  ProductFilter (id + category):", filter);

console.log("\n  💡 Use Pick when you only need a FEW fields from a large interface");
console.log("     Common for: display components, API query params, summaries");


// ═══════════════════════════════════════
// 4. Omit<T, Keys> — REMOVE SPECIFIC PROPERTIES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Omit<T, Keys> — Remove Specific Properties\n");

// Everything EXCEPT the specified properties

type NewProduct = Omit<Product, "id">;
// Has: name, price, moq, category, inStock — but NOT id
// (Because id is auto-generated when creating new products)

type ProductBasic = Omit<Product, "moq" | "inStock">;
// Has: id, name, price, category

const newProduct: NewProduct = {
    name: "Silk Fabric",
    price: 800,
    moq: 50,
    category: "Textiles",
    inStock: true
};

const basicProduct: ProductBasic = {
    id: "PROD-002",
    name: "Silk Fabric",
    price: 800,
    category: "Textiles"
};

console.log("  NewProduct (omit id):", newProduct);
console.log("  ProductBasic (omit moq, inStock):", basicProduct);

console.log("\n  💡 Use Omit when you need MOST fields but want to EXCLUDE a few");
console.log("     Common for: create forms (no id), simplified views");


// ═══════════════════════════════════════
// 5. Record<Keys, Value> — QUICK OBJECT TYPE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Record<Keys, Value> — Quick Object Type\n");

// Record creates an object type where every key maps to the same value type

// Fixed keys:
type BrowserResults = Record<"chromium" | "firefox" | "webkit", boolean>;
// Equivalent to: { chromium: boolean; firefox: boolean; webkit: boolean; }

const testPassed: BrowserResults = {
    chromium: true,
    firefox: true,
    webkit: false
};

console.log("  BrowserResults:", testPassed);

// Dynamic keys:
type PriceMap = Record<string, number>;
const prices: PriceMap = {
    "PROD-001": 250,
    "PROD-002": 800,
    "PROD-003": 15
};

console.log("  PriceMap:", prices);

// Test results per environment:
type TestResultMap = Record<string, { passed: number; failed: number }>;
const results: TestResultMap = {
    staging: { passed: 45, failed: 2 },
    production: { passed: 50, failed: 0 }
};

console.log("  TestResultMap:", results);

console.log("\n  💡 Record<K, V> = every key of type K maps to value of type V");
console.log("     Common for: test results, config maps, locator dictionaries");


// ═══════════════════════════════════════
// 6. COMBINING UTILITY TYPES — REAL PATTERNS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Combining Utility Types — Real Framework Patterns\n");

// Full product interface with timestamps
interface FullProduct {
    id: string;
    name: string;
    price: number;
    moq: number;
    category: string;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
}

// For creating — no id, no timestamps (auto-generated)
type CreateProductInput = Omit<FullProduct, "id" | "createdAt" | "updatedAt">;

// For updating — id is required, everything else is optional
type UpdateProductInput = Pick<FullProduct, "id"> & Partial<Omit<FullProduct, "id">>;

// For search results — only essential fields
type ProductListItem = Pick<FullProduct, "id" | "name" | "price" | "category" | "inStock">;

// For test data factory — all optional (use defaults for missing)
type ProductTestOverrides = Partial<FullProduct>;

console.log("  CreateProductInput:  Omit<FullProduct, 'id' | 'createdAt' | 'updatedAt'>");
console.log("  UpdateProductInput:  Pick<..., 'id'> & Partial<Omit<..., 'id'>>");
console.log("  ProductListItem:     Pick<..., 'id' | 'name' | 'price' | ...>");
console.log("  ProductTestOverrides: Partial<FullProduct>");

// Test Data Factory — extremely useful pattern!
function createTestProduct(overrides: ProductTestOverrides = {}): FullProduct {
    return {
        id: `PROD-${Math.random().toString(36).slice(2, 8)}`,
        name: "Test Product",
        price: 100,
        moq: 50,
        category: "Textiles",
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides   // Overrides replace defaults
    };
}

console.log("\n  Test Data Factory in action:");
console.log("  Default:", createTestProduct());
console.log("  Custom:", createTestProduct({ name: "Premium Silk", price: 999 }));

console.log("\n  💡 Define the FULL shape once → derive variations with utility types");
console.log("     This is how professional TypeScript frameworks are built!");


// ═══════════════════════════════════════
// 7. Pick vs Omit DECISION TABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pick vs Omit — When to Use Which\n");

console.log("  ┌───────────────────────┬────────────────────────────────────────┐");
console.log("  │ Utility               │ When to Use                            │");
console.log("  ├───────────────────────┼────────────────────────────────────────┤");
console.log("  │ Partial<T>            │ Update functions (change some fields)  │");
console.log("  │ Required<T>           │ Force all optional fields to be set    │");
console.log("  │ Pick<T, Keys>         │ Need only a FEW fields (summary)      │");
console.log("  │ Omit<T, Keys>         │ Need MOST fields, exclude a few       │");
console.log("  │ Record<K, V>          │ Object with uniform value types       │");
console.log("  │ Pick + Partial combo  │ Required id + optional rest (update)  │");
console.log("  │ Omit + Partial combo  │ Factory overrides pattern (testing)   │");
console.log("  └───────────────────────┴────────────────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 UTILITY TYPES SUMMARY\n");

console.log("  • Partial<T>:      All properties become optional");
console.log("  • Required<T>:     All properties become required");
console.log("  • Pick<T, Keys>:   Select only specific properties");
console.log("  • Omit<T, Keys>:   Remove specific properties");
console.log("  • Record<K, V>:    Object with keys K and values V");
console.log("  • Combine them:    Omit + Partial, Pick + Partial, etc.");
console.log("  • Factory pattern: Partial<T> for test data overrides");
console.log("  • 💡 Define full shape ONCE, derive variations with utilities");

console.log("\n═══════════════════════════════════════\n");

export { };
