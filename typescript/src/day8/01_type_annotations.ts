/**
 * ============================================
 * 01 — Type Annotations
 * ============================================
 *
 * Day 8: TypeScript Fundamentals
 * Type annotations tell TypeScript what type
 * a variable, parameter, or return value should be.
 * Syntax:  variableName: type
 *
 * Run: npx ts-node typescript/src/day8/01_type_annotations.ts
 */

console.log("═══════════════════════════════════════");
console.log("   TYPE ANNOTATIONS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. PRIMITIVE TYPE ANNOTATIONS
// ═══════════════════════════════════════
console.log("📌 Primitive Type Annotations\n");

// String
let productName: string = "Cotton Fabric";
console.log("  productName:", productName, "→ type:", typeof productName);

// Number — covers int, float, double (JS has only ONE number type)
let price: number = 250;
let rating: number = 4.8;
console.log("  price:", price, "→ type:", typeof price);
console.log("  rating:", rating, "→ type:", typeof rating);

// Boolean
let isVerified: boolean = true;
console.log("  isVerified:", isVerified, "→ type:", typeof isVerified);

// Null and Undefined
let promoCode: null = null;
let selectedQty: undefined = undefined;
console.log("  promoCode:", promoCode);
console.log("  selectedQty:", selectedQty);

// ⚠️ IMPORTANT: Always use LOWERCASE types in TypeScript
//    ✅ string, number, boolean
//    ❌ String, Number, Boolean  ← These are JS wrapper objects — NEVER use in annotations!

console.log("\n  ⚠️ Always lowercase: string, number, boolean");
console.log("     NOT: String, Number, Boolean (those are JS wrapper objects)");


// ═══════════════════════════════════════
// 2. ARRAY TYPES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Array Types\n");

// Two equivalent syntaxes:
let prices: number[] = [100, 250, 50];
let names: Array<string> = ["Shirt", "Fabric"];  // Generic syntax (like Java's List<String>)

console.log("  prices (number[]):", prices);
console.log("  names (Array<string>):", names);

// ⚠️ Empty arrays MUST have a type annotation — otherwise TS infers any[]
let results: string[] = [];
results.push("Cotton Shirt");    // ✅ OK — string matches string[]
// results.push(42);             // ❌ ERROR: number is not assignable to string
console.log("  results after push:", results);

// Mixed type arrays — use union types (covered in file 03)
let mixed: (string | number)[] = ["hello", 42, "world", 100];
console.log("  mixed array:", mixed);


// ═══════════════════════════════════════
// 3. FUNCTION TYPE ANNOTATIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Function Type Annotations\n");

// This is where TypeScript SHINES for test automation
// You know exactly what goes in and what comes out

// Parameters + return type
function calculateBulkPrice(
    price: number,
    quantity: number,
    discount: number = 0      // default parameter — still typed as number
): number {                    // return type after the closing parenthesis
    return price * quantity * (1 - discount);
}

console.log("  calculateBulkPrice(250, 100, 0.1):", calculateBulkPrice(250, 100, 0.1));
// calculateBulkPrice("250", 100, "10%");
// ❌ Would give ERROR: string is not assignable to number
// This is THE reason TypeScript exists — catches wrong types BEFORE runtime!

// Arrow function with types
const formatPrice = (price: number): string => `$${price.toFixed(2)}`;
console.log("  formatPrice(250):", formatPrice(250));      // "$250.00"

// void — function returns nothing (same keyword as Java!)
function logTestResult(testName: string, passed: boolean): void {
    console.log(`  ${testName}: ${passed ? "✅ PASS" : "❌ FAIL"}`);
}
logTestResult("Login Test", true);
logTestResult("Search Test", false);

// Function with optional parameter (? makes it optional)
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}!`;
}
console.log("\n  greet('Shubham'):", greet("Shubham"));
console.log("  greet('Shubham', 'Hey'):", greet("Shubham", "Hey"));


// ═══════════════════════════════════════
// 4. OBJECT TYPE ANNOTATIONS (INLINE)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Object Type Annotations (Inline)\n");

// Inline object type — you define the shape right in the declaration
let supplier: { name: string; location: string; rating: number } = {
    name: "TextilePro",
    location: "Shanghai",
    rating: 4.8
};

console.log("  supplier:", supplier);

// TypeScript PREVENTS adding undeclared properties — catches typos!
// supplier.email = "info@textilepro.com";
// ❌ ERROR: Property 'email' does not exist on type

// Optional properties with ?
let config: { browser: string; headless: boolean; timeout?: number } = {
    browser: "chromium",
    headless: true
    // timeout is optional — no error if missing
};
console.log("  config:", config);
console.log("  config.timeout:", config.timeout);  // undefined (not set, but no error)

// 💡 Inline types get messy for complex objects.
//    Type aliases solve this — covered in file 04!


// ═══════════════════════════════════════
// 5. JAVA ↔ TYPESCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ TypeScript Comparison\n");

console.log("  ┌─────────────────────────────────┬─────────────────────────────────┐");
console.log("  │ Java                            │ TypeScript                      │");
console.log("  ├─────────────────────────────────┼─────────────────────────────────┤");
console.log("  │ String name = \"Shirt\";           │ let name: string = \"Shirt\";     │");
console.log("  │ int price = 250;                │ let price: number = 250;        │");
console.log("  │ boolean active = true;          │ let active: boolean = true;     │");
console.log("  │ final String X = \"Y\";           │ const X: string = \"Y\";          │");
console.log("  │ public int add(int a, int b)    │ function add(a: number,         │");
console.log("  │                                 │   b: number): number            │");
console.log("  │ public void log(String msg)     │ function log(msg: string): void │");
console.log("  └─────────────────────────────────┴─────────────────────────────────┘");

console.log("\n  💡 Key difference: Type comes AFTER the variable name with a colon");
console.log("     Java:       int price = 250");
console.log("     TypeScript: let price: number = 250");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TYPE ANNOTATIONS SUMMARY\n");

console.log("  • Primitives:  let x: string, let y: number, let z: boolean");
console.log("  • Arrays:      let arr: number[] or Array<string>");
console.log("  • Functions:   (param: type): returnType => { ... }");
console.log("  • void:        function with no return value");
console.log("  • Optional:    param?: type (parameter is optional)");
console.log("  • Objects:     { key: type; key2: type }");
console.log("  • ⚠️ Always lowercase: string NOT String");

console.log("\n═══════════════════════════════════════\n");

export { };
