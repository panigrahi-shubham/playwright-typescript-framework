/**
 * ============================================
 * 06 — Tuples & Type Assertions
 * ============================================
 *
 * Day 8: TypeScript Fundamentals
 * Tuples = fixed-length arrays with per-position types.
 * Type assertions = "trust me, I know the type."
 *
 * Run: npx ts-node typescript/src/day8/06_tuples_assertions.ts
 */

console.log("═══════════════════════════════════════");
console.log("   TUPLES & TYPE ASSERTIONS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. TUPLE TYPES — FIXED-LENGTH ARRAYS
// ═══════════════════════════════════════
console.log("📌 Tuple Types — Fixed-Length, Per-Position Types\n");

// Regular array — all items SAME type, any length:
let prices: number[] = [100, 250, 50, 999];

// Tuple — FIXED length, each position has its OWN type:
let product: [string, number, boolean] = ["Cotton Shirt", 250, true];
//            pos 0    pos 1    pos 2

console.log("  Regular array:", prices);
console.log("  Tuple:", product);

// TypeScript checks each position individually:
console.log("\n  Position-aware type checking:");
console.log("  product[0]:", product[0], "→ string");                    // "Cotton Shirt"
console.log("  product[0].toUpperCase():", product[0].toUpperCase());    // ✅ string methods
console.log("  product[1]:", product[1], "→ number");                    // 250
console.log("  product[1].toFixed(2):", product[1].toFixed(2));          // ✅ number methods

// TS catches wrong types at each position:
// product[2] = "yes";  // ❌ ERROR: string not assignable to boolean


// ═══════════════════════════════════════
// 2. DESTRUCTURING TUPLES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Destructuring Tuples\n");

// Destructure with full types preserved:
const [productName, productPrice, available] = product;
// productName: string, productPrice: number, available: boolean — ALL typed correctly!

console.log("  Destructured: name =", productName, ", price =", productPrice, ", available =", available);

// Function returning multiple values — great use case for tuples!
function getSearchSummary(): [number, string] {
    return [25, "cotton shirts found"];
}

const [count, description] = getSearchSummary();
console.log("  Search:", count, description);  // "25 cotton shirts found"

// Another real-world example: API result with status
function processOrder(orderId: string): [boolean, string] {
    if (orderId.startsWith("ORD-")) {
        return [true, `Order ${orderId} processed successfully`];
    }
    return [false, `Invalid order ID: ${orderId}`];
}

const [success1, msg1] = processOrder("ORD-123");
const [success2, msg2] = processOrder("INVALID");
console.log(`  ${success1 ? "✅" : "❌"} ${msg1}`);
console.log(`  ${success2 ? "✅" : "❌"} ${msg2}`);


// ═══════════════════════════════════════
// 3. LABELED / NAMED TUPLES (TS 4.0+)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Labeled Tuples — Self-Documenting\n");

// Add labels for readability (doesn't affect runtime, but great in IDE):
type TestResult = [testName: string, passed: boolean, duration: number];

const result: TestResult = ["Login Flow", true, 2.5];
console.log("  TestResult:", result);
console.log("  Test:", result[0], "| Passed:", result[1], "| Time:", result[2] + "s");

// Labels make the type self-documenting in VS Code tooltips!
// When you hover over 'result', you see:
//   [testName: string, passed: boolean, duration: number]
// Instead of just:
//   [string, boolean, number]


// ═══════════════════════════════════════
// 4. TYPE ASSERTIONS — as KEYWORD
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Type Assertions — 'Trust Me, I Know the Type'\n");

// When you know MORE about the type than TypeScript does,
// use 'as' to assert the correct type:

// Example 1: JSON data from an API (TS sees it as 'any')
const jsonString = '{"name": "Cotton Shirt", "price": 250}';
const parsed = JSON.parse(jsonString);  // TypeScript sees: any

// Assert the type — we KNOW what the API returns:
const productData = parsed as { name: string; price: number };
console.log("  Asserted product:", productData.name, "$" + productData.price);

// Example 2: Working with DOM elements (Playwright-relevant!)
// const searchBox = document.getElementById("search") as HTMLInputElement;
// searchBox.value = "cotton";  // TS now treats it as HTMLInputElement ✅
// Without assertion, TS only knows it's Element | null

console.log("\n  🎭 Playwright example:");
console.log("     const body = await response.json() as { name: string; price: number };");
console.log("     console.log(body.name);   // TS knows this is string");
console.log("     console.log(body.price);  // TS knows this is number");


// ═══════════════════════════════════════
// 5. TYPE ASSERTIONS — SAFETY WARNING ⚠️
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 ⚠️ Assertions Are Compile-Time ONLY\n");

// Assertions DON'T validate actual data — they only tell the COMPILER to trust you!
// If you're WRONG, you get a runtime crash with NO compile-time warning.

// ❌ DANGEROUS — wrong assertion, TS won't save you:
const fakeProduct = "not a product" as any as { name: string; price: number };
// fakeProduct.name  →  would crash at runtime!
// TypeScript thinks it's fine because you told it to trust you.

console.log("  ⚠️ Assertions don't validate data at runtime");
console.log("  ⚠️ Wrong assertion = runtime crash, no compile-time warning");
console.log("  ⚠️ Use assertions ONLY when you are confident");

console.log("\n  ┌──────────────────────────────────────────────────┐");
console.log("  │ Rule of Thumb:                                   │");
console.log("  │ • Use assertions for DOM elements & API responses │");
console.log("  │ • Validate data BEFORE asserting                 │");
console.log("  │ • Prefer type narrowing (typeof, instanceof)     │");
console.log("  │   over assertions when possible                  │");
console.log("  └──────────────────────────────────────────────────┘");

// Java comparison:
console.log("\n  💡 Java comparison:");
console.log("     Java: (HTMLInputElement) element  — checked at RUNTIME");
console.log("     TS:   element as HTMLInputElement  — NO runtime check");


// ═══════════════════════════════════════
// 6. CONST ASSERTIONS (as const)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 const Assertions — Lock Everything Down\n");

// as const makes all properties readonly and types literal:
const CONFIG = {
    browser: "chromium",
    headless: true,
    retries: 3,
    environments: ["staging", "production"]
} as const;

// Every property is now:
//   browser: "chromium" (not just string!)
//   headless: true (not just boolean!)
//   retries: 3 (not just number!)
//   environments: readonly ["staging", "production"]

console.log("  CONFIG:", CONFIG);
console.log("  CONFIG.browser:", CONFIG.browser, "→ type: 'chromium' (literal)");
// CONFIG.browser = "firefox";     // ❌ ERROR: readonly!
// CONFIG.retries = 5;             // ❌ ERROR: readonly!
console.log("  All properties are readonly — cannot modify ✅");

// Great for Playwright configs that should never change after setup!


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TUPLES & ASSERTIONS SUMMARY\n");

console.log("  • Tuple:        [string, number, boolean] — fixed length & types");
console.log("  • Destructure:  const [a, b] = tuple — full type safety");
console.log("  • Labeled:      [name: string, age: number] — self-documenting");
console.log("  • Assertion:    value as Type — 'trust me' to compiler");
console.log("  • as const:     makes everything readonly + literal");
console.log("  • ⚠️ Assertions are compile-time ONLY — no runtime check");
console.log("  • Prefer type narrowing (typeof, instanceof) over assertions");

console.log("\n═══════════════════════════════════════\n");

export { };
