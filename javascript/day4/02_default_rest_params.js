/**
 * ============================================
 * 02 - Default Parameters & Rest Parameters
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * Default parameters replace Java's method overloading.
 * Rest parameters collect unlimited arguments.
 * 
 * Run: node 02_default_rest_params.js
 */

console.log("═══════════════════════════════════════");
console.log("   DEFAULT & REST PARAMETERS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. DEFAULT PARAMETERS
// ═══════════════════════════════════════
console.log("📌 DEFAULT PARAMETERS\n");

// In Java, optional parameters require METHOD OVERLOADING —
// writing the same method multiple times with different param counts.
// JavaScript handles this elegantly with default values:

function searchProducts(query, page = 1, limit = 20) {
    console.log(`  Searching "${query}" — page ${page}, limit ${limit}`);
}

// Call with different numbers of arguments:
searchProducts("cotton shirts");        // page=1, limit=20  (defaults used)
searchProducts("cotton shirts", 3);     // page=3, limit=20  (only limit defaults)
searchProducts("cotton shirts", 2, 50); // page=2, limit=50  (no defaults needed)

// ⚠️  Default parameters must come AFTER required parameters
// function bad(page = 1, query) {}  // ❌ Required after default is confusing


// ═══════════════════════════════════════
// 2. DEFAULTS IN ARROW FUNCTIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 DEFAULTS IN ARROW FUNCTIONS\n");

// Arrow functions support defaults the same way
const navigate = (url, options = { timeout: 30000 }) => {
    console.log(`  Navigating to: ${url}`);
    console.log(`  Timeout: ${options.timeout}ms`);
};

navigate("https://saucedemo.com");
navigate("https://saucedemo.com", { timeout: 5000 });

// Practical: config builder with defaults
const createTestConfig = (browser = "chromium", headless = true, retries = 0) => {
    return { browser, headless, retries };
};

console.log("\n  Default config:", createTestConfig());
console.log("  Custom config:", createTestConfig("firefox", false, 2));


// ═══════════════════════════════════════
// 3. REST PARAMETERS (...args)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 REST PARAMETERS (...args)\n");

// When you don't know how many arguments a function will receive,
// the rest operator (...) collects ALL remaining arguments into an ARRAY.
// Java equivalent: public void log(String... results) — same concept.

function logTestResults(testName, ...results) {
    // testName = first argument
    // results  = array of ALL remaining arguments
    console.log(`  Test: ${testName}`);
    console.log(`  Total checks: ${results.length}`);
    results.forEach(r => console.log(`    - ${r}`));
}

logTestResults("Search Test", "Pass", "Fail", "Pass", "Skip");
// Test: Search Test
// Total checks: 4
// - Pass   - Fail   - Pass   - Skip

// ⚠️  Rest parameter MUST be the LAST parameter
// function bad(...args, lastParam) {}  // ❌ SyntaxError


// ═══════════════════════════════════════
// 4. REST WITH ARROW FUNCTIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 REST WITH ARROW FUNCTIONS\n");

// Sum any number of values
const sum = (...numbers) => numbers.reduce((total, n) => total + n, 0);

console.log("  sum(1, 2, 3):", sum(1, 2, 3));           // 6
console.log("  sum(10, 20):", sum(10, 20));              // 30
console.log("  sum(5, 10, 15, 20, 25):", sum(5, 10, 15, 20, 25)); // 75

// Build log message with named first param + rest
const logAction = (action, ...details) => {
    console.log(`\n  🔹 Action: ${action}`);
    if (details.length > 0) {
        details.forEach(d => console.log(`      └─ ${d}`));
    }
};

logAction("Click", "selector: #submit-btn", "force: true");
logAction("Navigate", "url: /dashboard");


// ═══════════════════════════════════════
// 5. COMBINING DEFAULT + REST
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 COMBINING DEFAULT + REST\n");

// Default parameters first, rest parameter last
const generateReport = (title = "Test Report", ...sections) => {
    console.log(`  📄 ${title}`);
    console.log(`  Sections: ${sections.length}`);
    sections.forEach((section, index) => {
        console.log(`    ${index + 1}. ${section}`);
    });
};

generateReport("Regression Report", "Login Tests", "Search Tests", "Cart Tests");
generateReport(undefined, "Smoke Test 1", "Smoke Test 2");  // Uses default title


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 DEFAULT & REST PARAMETERS SUMMARY\n");

console.log("  • Default params replace Java's method overloading");
console.log("  • Syntax: function(a, b = defaultValue) {}");
console.log("  • Default params must come AFTER required params");
console.log("  • Rest (...args) collects remaining args into an array");
console.log("  • Rest param MUST be the last parameter");
console.log("  • Java equivalent: String... args (varargs)");

console.log("\n═══════════════════════════════════════\n");
