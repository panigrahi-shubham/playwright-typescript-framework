/**
 * ============================================
 * 03 - Truthy/Falsy in Conditionals
 * ============================================
 * 
 * Day 3: Cleaner condition checks using
 * truthy/falsy values (from Day 2)
 * 
 * Run: node 03_truthy_falsy_conditionals.js
 */

console.log("═══════════════════════════════════════");
console.log("   TRUTHY/FALSY IN CONDITIONALS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. VERBOSE vs CLEAN CHECKS
// ═══════════════════════════════════════
console.log("📌 VERBOSE vs CLEAN CHECKS\n");

const searchResults = [];
const errorMessage = "";
const userName = null;

// ❌ Verbose checks
console.log("  ❌ Verbose way:");
if (searchResults.length !== 0) {
    console.log("    Results found");
} else {
    console.log("    searchResults.length !== 0 → false (empty array)");
}

if (errorMessage !== "" && errorMessage !== null && errorMessage !== undefined) {
    console.log("    Has error");
} else {
    console.log('    errorMessage !== "" && ... → false (empty string)');
}

if (userName !== null && userName !== undefined) {
    console.log("    Has username");
} else {
    console.log("    userName !== null && ... → false (null)");
}

// ✅ Clean truthy checks
console.log("\n  ✅ Clean way (using truthy/falsy):");

if (searchResults.length) {
    console.log("    Results found");
} else {
    console.log("    searchResults.length → 0 is falsy");
}

if (errorMessage) {
    console.log("    Has error");
} else {
    console.log('    errorMessage → "" is falsy');
}

if (userName) {
    console.log("    Has username");
} else {
    console.log("    userName → null is falsy");
}


// ═══════════════════════════════════════
// 2. CHECKING EMPTY ARRAYS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 CHECKING EMPTY ARRAYS\n");

const items = [];
const products = ["Laptop", "Mouse", "Keyboard"];

// ⚠️ Remember: empty array [] is TRUTHY!
if (items) {
    console.log("  ⚠️ items is TRUTHY even though it's empty!");
}

// ✅ Check .length instead
if (items.length === 0) {
    console.log("  ✅ items.length === 0 → correct empty check");
}

// Or with falsy:
if (!items.length) {
    console.log("  ✅ !items.length → 0 is falsy, so !0 is true");
}

// Products has items
if (products.length) {
    console.log(`  ✅ products has ${products.length} items`);
}


// ═══════════════════════════════════════
// 3. EARLY RETURN PATTERN (Guard Clauses)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 EARLY RETURN PATTERN\n");

// Common in test automation — exit early on bad data

function processApiResponse(apiResponse) {
    // Guard clause 1: Check response exists
    if (!apiResponse) {
        console.log("    ❌ API returned null/undefined");
        return null;
    }

    // Guard clause 2: Check data exists
    if (!apiResponse.data) {
        console.log("    ❌ No data field in response");
        return null;
    }

    // Guard clause 3: Check data has items
    if (!apiResponse.data.length) {
        console.log("    ⚠️ Data array is empty");
        return [];
    }

    // Safe to proceed
    console.log(`    ✅ Processing ${apiResponse.data.length} items`);
    return apiResponse.data;
}

console.log("  Test 1 — null response:");
processApiResponse(null);

console.log("  Test 2 — no data field:");
processApiResponse({ status: 200 });

console.log("  Test 3 — empty data:");
processApiResponse({ data: [] });

console.log("  Test 4 — valid data:");
processApiResponse({ data: ["item1", "item2", "item3"] });


// ═══════════════════════════════════════
// 4. AUTOMATION PATTERNS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 AUTOMATION PATTERNS\n");

// Pattern 1: Check element text before asserting
const buttonText = "Submit Order";
if (buttonText) {
    console.log(`  ✅ Button text found: "${buttonText}"`);
} else {
    console.log("  ❌ Button has no text");
}

// Pattern 2: Conditional test steps
const testConfig = {
    runSmoke: true,
    runRegression: false,
    browser: "chromium",
    viewport: null
};

console.log("\n  Test config check:");

if (testConfig.runSmoke) {
    console.log("    ✓ Smoke tests will run");
}

if (testConfig.runRegression) {
    console.log("    ✓ Regression tests will run");
} else {
    console.log("    ✗ Regression tests skipped");
}

if (testConfig.viewport) {
    console.log(`    ✓ Custom viewport: ${testConfig.viewport}`);
} else {
    console.log("    ✗ Using default viewport (1280x720)");
}


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TRUTHY/FALSY CONDITIONALS SUMMARY\n");

console.log("  Quick Reference:");
console.log("    if (value)          → check if truthy");
console.log("    if (!value)         → check if falsy");
console.log("    if (arr.length)     → check if array has items");
console.log("    if (!arr.length)    → check if array is empty");
console.log("    if (obj.property)   → check if property exists & truthy");
console.log('    if (str)            → check if string is non-empty');

console.log("\n═══════════════════════════════════════\n");
