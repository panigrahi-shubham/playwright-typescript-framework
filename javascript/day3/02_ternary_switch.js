/**
 * ============================================
 * 02 - Ternary Operator & Switch Statement
 * ============================================
 * 
 * Day 3: Compact decisions & multiple matches
 * Run: node 02_ternary_switch.js
 */

console.log("═══════════════════════════════════════");
console.log("   TERNARY OPERATOR & SWITCH");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. TERNARY OPERATOR — Compact Decisions
// ═══════════════════════════════════════
console.log("📌 TERNARY OPERATOR (? :)\n");

// Syntax: condition ? valueIfTrue : valueIfFalse
// Shorthand for simple if/else

const age = 12;
const status = age >= 19 ? "adult" : "minor";
console.log(`  Age ${age} → ${status}`);

// Equivalent if/else:
// let status;
// if (age >= 18) {
//     status = "adult";
// } else {
//     status = "minor";
// }


// ═══════════════════════════════════════
// 2. TERNARY IN AUTOMATION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 TERNARY IN AUTOMATION\n");

// Set timeout based on environment
const isCI = false;
const timeout = isCI ? 30000 : 10000;
console.log(`  Timeout: ${timeout}ms (${isCI ? "CI" : "local"})`);

// Choose selector strategy
const isMobile = false;
const menuSelector = isMobile ? ".mobile-menu" : ".desktop-menu";
console.log(`  Menu selector: ${menuSelector}`);

// Inline in log messages
const testPassed = false;
const message = testPassed ? "Order placed" : "❌ Order failed and payment returned";
console.log(`  Status: ${message}`);

// Cart display
const itemCount = 10;
console.log(`  Cart: ${itemCount} ${itemCount === 1 ? "item" : "items"}`);


// ═══════════════════════════════════════
// 3. NESTED TERNARY (Use Sparingly!)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n NESTED TERNARY (Use Sparingly!)\n");
console.log("\n run the code");

const isPremium = false;
const isMember = true;

// Nested ternary — compact but less readable
const discount = isPremium ? 20 : isMember ? 10 : 0;
console.log(`  Discount: ${discount}%`);

// Better as if/else for readability:
let discountReadable;
if (isPremium) {
    discountReadable = 20;
} else if (isMember) {
    discountReadable = 10;
} else {
    discountReadable = 0;
}
console.log(`  Discount (readable): ${discountReadable}%`);
console.log("\n  💡 Rule: Use ternary for SIMPLE choices only");


// ═══════════════════════════════════════
// 4. SWITCH STATEMENT — Multiple Exact Matches
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SWITCH STATEMENT\n");

// Use switch when checking one variable against many exact values
const browserName = "firefox";
let launchOptions;

switch (browserName) {
    case "chromium":
        console.log("  🌐 Running on Chrome/Edge");
        launchOptions = { headless: true };
        break;

    case "firefox":
        console.log("  🦊 Running on Firefox");
        launchOptions = { headless: true, firefoxUserPrefs: {} };
        break;

    case "webkit":
        console.log("  🍎 Running on Safari");
        launchOptions = { headless: true };
        break;

    default:
        console.log("  ⚠️ Unknown browser, defaulting to Chromium");
        launchOptions = {};
}

console.log("  Options:", JSON.stringify(launchOptions));

// ⚠️ CRITICAL: Always use break!
// Without it, execution "falls through" to the next case


// ═══════════════════════════════════════
// 5. SWITCH — Intentional Fall-Through
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SWITCH — Grouping Cases (Fall-Through)\n");

// Group related cases together
const responseCode = 404;

switch (responseCode) {
    case 400:
    case 401:
    case 403:
    case 404:
        console.log(`  ❌ Client error (${responseCode}) — check your request`);
        break;

    case 500:
    case 502:
    case 503:
        console.log(`  ❌ Server error (${responseCode}) — try again later`);
        break;

    case 200:
    case 201:
        console.log(`  ✅ Success (${responseCode})`);
        break;

    default:
        console.log(`  Processing response ${responseCode}...`);
}


// ═══════════════════════════════════════
// 6. SWITCH vs IF/ELSE — When to Use What
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 SWITCH vs IF/ELSE\n");

console.log("  Use SWITCH when:");
console.log("    • Comparing ONE variable against EXACT values");
console.log("    • Multiple cases (3+) for the same variable");
console.log("    • Values are discrete (strings, numbers)\n");

console.log("  Use IF/ELSE when:");
console.log("    • Comparing ranges (score > 90)");
console.log("    • Complex conditions (a && b || c)");
console.log("    • Different variables in each condition");

// Example: switch is cleaner here
const dayOfWeek = "Monday";

switch (dayOfWeek) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        console.log(`\n  📅 ${dayOfWeek} — Weekday (run full test suite)`);
        break;
    case "Saturday":
    case "Sunday":
        console.log(`\n  📅 ${dayOfWeek} — Weekend (run smoke tests only)`);
        break;
}


console.log("\n═══════════════════════════════════════\n");
