/**
 * ============================================
 * 01 - if / else if / else — The Foundation
 * ============================================
 * 
 * Day 3: Making decisions in code
 * Conditionals let your code make decisions
 * based on conditions — essential for test
 * automation!
 * 
 * Run: node 01_if_else.js
 */

console.log("═══════════════════════════════════════");
console.log("   IF / ELSE IF / ELSE");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BASIC IF/ELSE STRUCTURE
// ═══════════════════════════════════════
console.log("📌 BASIC IF/ELSE STRUCTURE\n");

// Syntax:
// if (condition) {
//     // Run this code if condition is TRUE
// } else if (anotherCondition) {
//     // Run this if first is FALSE but this is TRUE
// } else {
//     // Run this if ALL above are FALSE
// }

const statusCode = 200;

if (statusCode === 200) {
    console.log("  ✅ API call successful");
} else if (statusCode === 401) {
    console.log("  ❌ Unauthorized — check auth token");
} else if (statusCode === 404) {
    console.log("  ❌ Resource not found");
} else {
    console.log(`  ⚠️ Unexpected status: ${statusCode}`);
}


// ═══════════════════════════════════════
// 2. AUTOMATION EXAMPLE — Element Visibility
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 AUTOMATION EXAMPLE — Element Visibility\n");

// In real Playwright tests, you'd do:
// const isVisible = await page.locator(".submit-btn").isVisible();
const isVisible = true; // Simulating for demo

if (isVisible) {
    // await page.locator(".submit-btn").click();
    console.log("  ✅ Button clicked successfully");
} else {
    console.log("  ❌ Button not visible — test cannot proceed");
    // await page.screenshot({ path: "button-missing.png" });
    console.log("  📸 Screenshot taken for debugging");
}


// ═══════════════════════════════════════
// 3. NESTED IF STATEMENTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 NESTED IF STATEMENTS\n");

// Sometimes you need decisions inside decisions:
const user = {
    isLoggedIn: true,
    hasPermission: true,
    accountType: "premium"
};

console.log("  Checking user access...\n");

if (user.isLoggedIn) {
    console.log("  ✓ User is logged in");

    if (user.hasPermission) {
        console.log("  ✓ User has permissions");

        if (user.accountType === "premium") {
            console.log("  ✅ Access granted to premium features");
        } else {
            console.log("  ⚠️ Upgrade to premium required");
        }

    } else {
        console.log("  ❌ Insufficient permissions");
    }

} else {
    console.log("  ❌ Please log in first");
}


// ═══════════════════════════════════════
// 4. FLATTENING NESTED IFS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n💡 BETTER: Flatten Nested ifs with Logical Operators\n");

// ❌ Deeply nested — hard to read (shown above)
// ✅ Flattened — much cleaner:

if (user.isLoggedIn && user.hasPermission && user.accountType === "premium") {
    console.log("  ✅ Access granted (flattened check)");
} else {
    console.log("  ❌ Access denied");
}

// Another example: Multiple conditions
const testResult = { status: "passed", errors: 0, warnings: 2 };

if (testResult.status === "passed" && testResult.errors === 0) {
    const hasWarnings = testResult.warnings > 0;
    console.log(`  ✅ Test passed ${hasWarnings ? "(with warnings)" : "(clean)"}`);
} else {
    console.log("  ❌ Test failed");
}


// ═══════════════════════════════════════
// 5. MULTIPLE CONDITIONS — REAL SCENARIOS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 MULTIPLE CONDITIONS — Real Scenarios\n");

// Scenario 1: Environment-based config
const environment = "staging";

if (environment === "production") {
    console.log("  🔴 Production — extra careful!");
} else if (environment === "staging") {
    console.log("  🟡 Staging — testing before production");
} else if (environment === "development") {
    console.log("  🟢 Development — local testing");
} else {
    console.log(`  ⚠️ Unknown environment: ${environment}`);
}

// Scenario 2: Test priority
const testPriority = "P1";
const isBlocking = true;

if (testPriority === "P0" || (testPriority === "P1" && isBlocking)) {
    console.log("  🚨 CRITICAL — must fix before release");
} else if (testPriority === "P1") {
    console.log("  ⚠️ HIGH — fix in current sprint");
} else if (testPriority === "P2") {
    console.log("  📋 MEDIUM — backlog");
} else {
    console.log("  📝 LOW — nice to have");
}


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 IF/ELSE SUMMARY\n");

console.log("  Key Takeaways:");
console.log("    • if/else if/else handles decision branching");
console.log("    • Nested ifs work but can become hard to read");
console.log("    • Use logical operators (&&, ||) to flatten logic");
console.log("    • Guard clauses (early returns) improve readability");
console.log("    • Always handle the 'else' case for safety");

console.log("\n═══════════════════════════════════════\n");
