/**
 * ============================================
 * 01 - Conditionals (if-else & ternary)
 * ============================================
 * 
 * Day 3: Making decisions in code
 * Run: node 01_conditionals.js
 */

console.log("═══════════════════════════════════════");
console.log("   CONDITIONALS");
console.log("═══════════════════════════════════════\n");

// ═══════════════════════════════════════
// IF-ELSE STATEMENT
// ═══════════════════════════════════════
console.log("📌 IF-ELSE STATEMENT\n");

const isLoggedIn = true;

if (isLoggedIn) {
    console.log("  ✓ User is logged in - show dashboard");
} else {
    console.log("  ✗ User not logged in - redirect to login");
}

// Automation example: Check test result
console.log("\n🤖 Automation Example:");
const testStatus = "passed";
const errorCount = 0;

if (testStatus === "passed" && errorCount === 0) {
    console.log("  ✓ Test PASSED");
} else if (testStatus === "failed") {
    console.log("  ✗ Test FAILED");
} else {
    console.log("  ⚠ Test has warnings");
}


// ═══════════════════════════════════════
// TERNARY OPERATOR (? :)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 TERNARY OPERATOR (condition ? true : false)\n");

// Syntax: condition ? valueIfTrue : valueIfFalse
const score = 85;
const result = score >= 60 ? "PASS" : "FAIL";
console.log(`  Score: ${score} → ${result}`);

// Automation example: Set browser mode
const isCI = true;
const browserMode = isCI ? "headless" : "headed";
console.log(`  Browser mode: ${browserMode}`);

// Inline in template literals
const itemCount = 3;
console.log(`  Cart: ${itemCount} ${itemCount === 1 ? "item" : "items"}`);


// ═══════════════════════════════════════
// COMPARISON PATTERNS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 COMMON PATTERNS\n");

// Check if value exists
const username = "standard_user";
if (username) {
    console.log(`  Username provided: ${username}`);
}

// Check array has items
const errors = [];
if (errors.length === 0) {
    console.log("  No errors found ✓");
}


console.log("\n═══════════════════════════════════════\n");
