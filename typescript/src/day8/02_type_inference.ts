/**
 * ============================================
 * 02 — Type Inference
 * ============================================
 *
 * Day 8: TypeScript Fundamentals
 * TypeScript reads your mind — it figures out
 * types automatically from assigned values.
 * You don't always need to write types!
 *
 * Run: npx ts-node typescript/src/day8/02_type_inference.ts
 */

console.log("═══════════════════════════════════════");
console.log("   TYPE INFERENCE");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. HOW INFERENCE WORKS
// ═══════════════════════════════════════
console.log("📌 How Inference Works\n");

// No annotations written — TypeScript figures it out from the value:
let productName = "Cotton Fabric";           // inferred: string
let price = 250;                             // inferred: number
let isActive = true;                         // inferred: boolean
let categories = ["Textiles", "Electronics"]; // inferred: string[]

console.log("  productName:", productName, "→ TS infers: string");
console.log("  price:", price, "→ TS infers: number");
console.log("  isActive:", isActive, "→ TS infers: boolean");
console.log("  categories:", categories, "→ TS infers: string[]");

// Still fully type-safe — you CANNOT break the inferred contract:
// productName = 42;          // ❌ ERROR: number is not assignable to string
// price = "expensive";       // ❌ ERROR: string is not assignable to number
// categories.push(100);      // ❌ ERROR: number not assignable to string

console.log("\n  Even without annotations, TS enforces types!");
console.log("  productName = 42  → ❌ ERROR (inferred as string)");
console.log("  price = 'text'    → ❌ ERROR (inferred as number)");


// ═══════════════════════════════════════
// 2. INFERENCE ON FUNCTIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Inference on Functions\n");

// TypeScript infers the RETURN TYPE automatically:
function add(a: number, b: number) {
    return a + b;  // TS infers return type: number
}

const sum = add(10, 20);  // sum is inferred as number
console.log("  add(10, 20) =", sum, "→ return type inferred as: number");

// Arrow function inference
const multiply = (a: number, b: number) => a * b;
console.log("  multiply(5, 3) =", multiply(5, 3), "→ inferred: number");

// ⚠️ IMPORTANT: TypeScript CANNOT infer parameter types
// function broken(a, b) { return a + b; }
// ❌ Parameter 'a' implicitly has an 'any' type
// You MUST always annotate parameters!

console.log("\n  ⚠️ Rule: TS can infer return types but NOT parameter types");
console.log("     Always annotate function parameters!");


// ═══════════════════════════════════════
// 3. CONST vs LET — INFERENCE DIFFERENCE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 const vs let — Inference Difference\n");

// With let — inferred as the GENERAL type
let browser = "chromium";   // type: string (any string allowed)

// With const — inferred as the LITERAL type (exact value)
const defaultBrowser = "chromium";  // type: "chromium" (ONLY this value)

console.log("  let browser = 'chromium'     → type: string (any string)");
console.log("  const defaultBrowser = 'chromium' → type: \"chromium\" (literal)");
console.log("");
console.log("  Why? const can never change, so TS narrows to the exact value.");
console.log("  let CAN change, so TS keeps it as the wider type.");

// This matters for Playwright config:
// const config = { browser: "chromium" as const };
//                                      ^^^^^^ tells TS this is literally "chromium"


// ═══════════════════════════════════════
// 4. WHEN TO ANNOTATE vs. WHEN TO INFER
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 When to Annotate vs. When to Infer\n");

console.log("  ┌────────────────────────────────────┬──────────────┬─────────────────────┐");
console.log("  │ Situation                          │ Use          │ Example             │");
console.log("  ├────────────────────────────────────┼──────────────┼─────────────────────┤");
console.log("  │ Value assigned on declaration      │ Inference ✅ │ let name = 'Shirt'  │");
console.log("  │ Variable declared without value    │ Annotation ✅│ let results: string[]│");
console.log("  │ Function parameters                │ Annotation ✅│ (query: string)     │");
console.log("  │ Function return (public API)       │ Annotation ✅│ ): Product[]        │");
console.log("  │ Complex object types               │ Type alias ✅│ type Product = {}   │");
console.log("  └────────────────────────────────────┴──────────────┴─────────────────────┘");

// ❌ UNNECESSARY — inference handles this (redundant code!)
let name1: string = "Shirt";
let count1: number = 0;
let active1: boolean = true;
console.log("\n  ❌ Unnecessary annotations:");
console.log("     let name: string = 'Shirt'   → redundant, TS already knows");

// ✅ LET INFERENCE WORK — cleaner code
let name2 = "Shirt";
let count2 = 0;
let active2 = true;
console.log("\n  ✅ Let inference work:");
console.log("     let name = 'Shirt'   → clean, TS infers string");

// ✅ ANNOTATION NEEDED — no initial value
let searchResults: string[];
console.log("\n  ✅ Annotation needed (no initial value):");
console.log("     let searchResults: string[]   → TS can't infer without a value");

// ✅ ALWAYS annotate function parameters
function search(query: string, page: number = 1): string[] {
    return [`Result for '${query}' on page ${page}`];
}
console.log("\n  ✅ Always annotate parameters:");
console.log("    ", search("cotton fabric"));


// ═══════════════════════════════════════
// 5. JAVA COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java var vs TypeScript Inference\n");

console.log("  Java 10+ has 'var' for local type inference:");
console.log("     var name = \"Shirt\";  // Java infers String");
console.log("");
console.log("  TypeScript inference is the SAME concept but MORE powerful:");
console.log("     let name = \"Shirt\";  // TS infers string");
console.log("");
console.log("  TS inference works on arrays, objects, return types,");
console.log("  and even complex generic types — Java's var is more limited.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TYPE INFERENCE SUMMARY\n");

console.log("  • TS infers types from assigned values automatically");
console.log("  • let x = 5 → number (wider type)");
console.log("  • const x = 5 → literal type 5 (exact value)");
console.log("  • Parameters: ALWAYS annotate (TS can't infer)");
console.log("  • Return types: can infer, but annotate for public APIs");
console.log("  • No initial value: MUST annotate");
console.log("  • Don't write redundant annotations — keep code clean");

console.log("\n═══════════════════════════════════════\n");

export { };
