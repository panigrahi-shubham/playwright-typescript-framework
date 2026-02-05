/**
 * ============================================
 * 05 - Truthy and Falsy Values
 * ============================================
 * 
 * Day 2: Understanding JavaScript's type coercion
 * Critical for writing conditions in automation!
 * 
 * Run this file: node 05_truthy_falsy.js
 */

console.log("═══════════════════════════════════════");
console.log("   TRUTHY AND FALSY VALUES");
console.log("═══════════════════════════════════════\n");

// ═══════════════════════════════════════
// WHAT ARE TRUTHY/FALSY?
// ═══════════════════════════════════════
console.log("📝 What are Truthy/Falsy Values?\n");
console.log("  JavaScript converts values to boolean in conditions.");
console.log("  FALSY = converts to false");
console.log("  TRUTHY = converts to true\n");

// ═══════════════════════════════════════
// THE 6 FALSY VALUES
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n❌ THE 6 FALSY VALUES\n");

console.log("These values convert to FALSE:\n");

const falsyValues = [
    { value: false, name: "false" },
    { value: 0, name: "0" },
    { value: "", name: '""' },
    { value: null, name: "null" },
    { value: undefined, name: "undefined" },
    { value: NaN, name: "NaN" }
];

falsyValues.forEach(item => {
    console.log(`  ${item.name.padEnd(12)} → ${Boolean(item.value)}`);
});

console.log("\n  💡 Tip: Memorize these 6 - everything else is truthy!");

// ═══════════════════════════════════════
// TRUTHY VALUES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n✅ TRUTHY VALUES (Everything Else!)\n");

const truthyValues = [
    { value: true, name: "true" },
    { value: 1, name: "1" },
    { value: -1, name: "-1" },
    { value: "hello", name: '"hello"' },
    { value: " ", name: '" " (space)' },
    { value: "0", name: '"0" (string)' },
    { value: [], name: "[] (empty array)" },
    { value: {}, name: "{} (empty object)" }
];

truthyValues.forEach(item => {
    console.log(`  ${item.name.padEnd(18)} → ${Boolean(item.value)}`);
});

console.log("\n  ⚠️ Note: Empty arrays [] and objects {} are TRUTHY!");

// ═══════════════════════════════════════
// USING IN CONDITIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔍 USING IN CONDITIONS\n");

// Checking if value exists
const username = "standard_user";
const password = "";
const apiToken = null;

console.log("Checking if values exist:\n");

if (username) {
    console.log("  ✓ Username is set:", username);
}

if (!password) {
    console.log("  ✗ Password is empty/missing");
}

if (!apiToken) {
    console.log("  ✗ API token is null/missing");
}

// Array length check
console.log("\n  Array length check:");
const items = [];
const products = ["item1", "item2"];

if (items.length) {
    console.log("    Items has elements");
} else {
    console.log("    Items is empty (length = 0, falsy)");
}

if (products.length) {
    console.log("    Products has elements");
}

// ═══════════════════════════════════════
// AUTOMATION PATTERNS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 AUTOMATION PATTERNS\n");

// 1. Default values with ||
console.log("1. Default values with ||:\n");
const inputTimeout = 0;
const envTimeout = process.env.TIMEOUT;
const defaultTimeout = 30000;

const timeout1 = inputTimeout || defaultTimeout;
const timeout2 = envTimeout || defaultTimeout;

console.log(`   inputTimeout: ${inputTimeout}`);
console.log(`   timeout1 (inputTimeout || 30000): ${timeout1}`);
console.log("   ⚠️ Problem: 0 is falsy, so default is used!\n");

// 2. Nullish coalescing ?? (ES2020)
console.log("2. Nullish coalescing ?? (better for 0/empty string):\n");
const timeout3 = inputTimeout ?? defaultTimeout;
console.log(`   timeout3 (inputTimeout ?? 30000): ${timeout3}`);
console.log("   ✓ Now 0 is preserved (only null/undefined trigger default)\n");

// 3. Checking for element
console.log("3. Checking if element exists:\n");
const element = null; // Simulating element not found
const elementFound = document?.querySelector?.("#btn") ?? null;

if (!element) {
    console.log("   Element not found on page");
}

// 4. Validating API response
console.log("\n4. Validating API response:\n");
const apiResponse = {
    data: [],
    error: null,
    message: ""
};

if (apiResponse.error) {
    console.log("   Has error");
} else {
    console.log("   ✓ No error (error is null/falsy)");
}

if (apiResponse.data.length) {
    console.log("   Data has items");
} else {
    console.log("   ✓ Data array is empty");
}

// ═══════════════════════════════════════
// COMMON PITFALLS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚠️ COMMON PITFALLS\n");

// Pitfall 1: 0 is falsy
console.log("1. Zero (0) is falsy:");
const count = 0;
if (count) {
    console.log("   Has items");
} else {
    console.log("   ✗ Treated as 'no items' even though count exists");
}
console.log("   ✓ Fix: Use count !== undefined or count >= 0\n");

// Pitfall 2: Empty string is falsy
console.log("2. Empty string is falsy:");
const searchTerm = "";
if (searchTerm) {
    console.log("   Search for:", searchTerm);
} else {
    console.log("   ✗ Empty search term is treated as missing");
}
console.log('   ✓ Fix: Use searchTerm !== undefined\n');

// Pitfall 3: Empty arrays are truthy
console.log("3. Empty arrays are truthy:");
const results = [];
if (results) {
    console.log("   ✗ This runs even though array is empty!");
}
console.log("   ✓ Fix: Use results.length\n");

// ═══════════════════════════════════════
// BOOLEAN CONVERSION
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n🔄 BOOLEAN CONVERSION\n");

console.log("Convert any value to boolean:\n");
console.log("  Boolean('hello'):", Boolean('hello'));
console.log("  Boolean(''):", Boolean(''));
console.log("  Boolean(42):", Boolean(42));
console.log("  Boolean(0):", Boolean(0));
console.log("  !!'hello' (double NOT):", !!'hello');
console.log("  !!'' (double NOT):", !!'');

// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TRUTHY/FALSY SUMMARY\n");

console.log("┌─────────────────────────────────────────┐");
console.log("│ FALSY (6 values)   │ TRUTHY (all else) │");
console.log("├─────────────────────────────────────────┤");
console.log("│ false              │ true              │");
console.log("│ 0                  │ Any other number  │");
console.log('│ "" (empty string)  │ Any non-empty str │');
console.log("│ null               │ [] (empty array)  │");
console.log("│ undefined          │ {} (empty object) │");
console.log("│ NaN                │ Functions         │");
console.log("└─────────────────────────────────────────┘");

console.log("\n💡 Key Takeaways:");
console.log("  • 0 and empty string are falsy - watch out!");
console.log("  • Empty arrays/objects are truthy");
console.log("  • Use ?? for null/undefined only defaults");
console.log("  • Use .length to check arrays");

console.log("\n═══════════════════════════════════════\n");
