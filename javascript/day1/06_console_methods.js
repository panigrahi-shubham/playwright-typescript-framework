/**
 * ============================================
 * 06 - Console Methods for Debugging
 * ============================================
 * 
 * Master the console API for effective debugging
 * and test reporting in automation.
 * 
 * Run this file: node 06_console_methods.js
 */

console.log("═══════════════════════════════════════");
console.log("   CONSOLE METHODS FOR DEBUGGING");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. Basic Logging
// ═══════════════════════════════════════

console.log("📝 BASIC LOGGING\n");

// console.log - General output
console.log("This is a regular log message");

// Logging variables
const testName = "Login Test";
const status = "passed";
console.log("Test:", testName);
console.log("Status:", status);

// Logging multiple values
const username = "test_user";
const password = "secret123";
console.log("Credentials:", username, password);


// ═══════════════════════════════════════
// 2. Log Levels (Severity)
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🚦 LOG LEVELS\n");

// Different log levels for different purposes
console.log("ℹ️  INFO: Test execution started");
console.warn("⚠️  WARN: Element took longer than expected");
console.error("❌ ERROR: Login failed - element not found");

// Info vs Debug (console.info is alias for console.log)
console.info("ℹ️  This is console.info");
console.debug("🔍 This is console.debug");

// Use appropriate levels:
// log/info  → General information
// warn      → Something needs attention
// error     → Something went wrong


// ═══════════════════════════════════════
// 3. Template Strings in Logs
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n📋 TEMPLATE STRINGS\n");

const userName = "Shubham";
const loginTime = new Date().toLocaleTimeString();
const browser = "Chrome";
const version = "120.0";

// Clean, readable logs with template literals
console.log(`User "${userName}" logged in at ${loginTime}`);
console.log(`Running tests on ${browser} v${version}`);

// Multi-line logs
console.log(`
Test Summary:
─────────────
User: ${userName}
Browser: ${browser}
Time: ${loginTime}
`);


// ═══════════════════════════════════════
// 4. Console Table (Structured Data)
// ═══════════════════════════════════════

console.log("─".repeat(45));
console.log("\n📊 CONSOLE TABLE\n");

// Perfect for displaying test results
const testResults = [
    { test: "Login", status: "✅ Pass", duration: "2.3s" },
    { test: "Search", status: "✅ Pass", duration: "1.5s" },
    { test: "Checkout", status: "❌ Fail", duration: "3.1s" },
    { test: "Profile", status: "✅ Pass", duration: "1.8s" }
];

console.log("Test Results:");
console.table(testResults);

// Table for objects
const config = {
    browser: "chromium",
    headless: true,
    timeout: 30000,
    retries: 3
};

console.log("\nConfiguration:");
console.table(config);


// ═══════════════════════════════════════
// 5. Console Time (Performance)
// ═══════════════════════════════════════

console.log("─".repeat(45));
console.log("\n⏱️  CONSOLE TIME\n");

// Measure execution time
console.time("Loop Performance");

// Some operation to measure
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}

console.timeEnd("Loop Performance");

// Multiple timers
console.time("Full Test");
console.time("Step 1");

// Step 1: Some operation
for (let i = 0; i < 100000; i++) { }
console.timeEnd("Step 1");

console.time("Step 2");
// Step 2: Another operation
for (let i = 0; i < 200000; i++) { }
console.timeEnd("Step 2");

console.timeEnd("Full Test");


// ═══════════════════════════════════════
// 6. Console Group (Organize Output)
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n📁 CONSOLE GROUP\n");

// Group related logs together
console.group("🧪 Test Suite: Login Module");
console.log("✅ Test 1: Valid credentials - PASSED");
console.log("✅ Test 2: Invalid password - PASSED");
console.log("❌ Test 3: Empty fields - FAILED");
console.log("✅ Test 4: Remember me - PASSED");
console.groupEnd();

// Collapsed group (starts collapsed)
console.groupCollapsed("📋 Detailed Logs (click to expand)");
console.log("Step 1: Navigate to login page");
console.log("Step 2: Enter username");
console.log("Step 3: Enter password");
console.log("Step 4: Click login button");
console.groupEnd();

// Nested groups
console.group("🔧 Browser Tests");
console.group("Chrome");
console.log("✅ All tests passed");
console.groupEnd();

console.group("Firefox");
console.log("⚠️  1 flaky test");
console.groupEnd();
console.groupEnd();


// ═══════════════════════════════════════
// 7. Console Count (Counting)
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🔢 CONSOLE COUNT\n");

// Count how many times something happens
console.count("Login attempts");
console.count("Login attempts");
console.count("Login attempts");

console.count("Search queries");
console.count("Search queries");

console.count("Login attempts");  // Count continues

// Reset the counter
console.countReset("Login attempts");
console.count("Login attempts");  // Starts from 1 again


// ═══════════════════════════════════════
// 8. Console Assert (Validation)
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n✅ CONSOLE ASSERT\n");

// Only logs if condition is FALSE
const pageTitle = "Dashboard";
const expectedTitle = "Dashboard";

console.assert(pageTitle === expectedTitle, "Title mismatch!");
// Nothing logged - assertion passed

const wrongTitle = "Home";
console.assert(wrongTitle === expectedTitle, `Expected "${expectedTitle}" but got "${wrongTitle}"`);
// Error logged - assertion failed


// ═══════════════════════════════════════
// 9. Console Clear
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🧹 CONSOLE CLEAR\n");

console.log("Use console.clear() to clear the console");
console.log("Useful at the start of new test runs");
// console.clear();  // Uncomment to test


// ═══════════════════════════════════════
// 10. Formatting with CSS (Browser Only)
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🎨 STYLED LOGS (Browser Only)\n");

// These work in browser DevTools, not Node.js
console.log("In browsers, you can use CSS:");
console.log('%c This would be styled! ', 'background: #222; color: #bada55; padding: 5px;');

// For Node.js, use ANSI codes or just emojis
console.log("✅ SUCCESS: Test passed");
console.log("❌ FAILURE: Test failed");
console.log("⚠️  WARNING: Flaky test");
console.log("ℹ️  INFO: Test started");


// ═══════════════════════════════════════
// PRACTICAL AUTOMATION EXAMPLE
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🎯 AUTOMATION LOGGING EXAMPLE\n");

// Simulate a test with proper logging
console.group("🧪 Login Test Execution");

console.time("Total Execution");

console.log("ℹ️  Starting login test...");
console.log("📍 Navigating to: https://saucedemo.com");

console.time("Page Load");
// Simulated page load
console.timeEnd("Page Load");

console.log("📝 Entering username: standard_user");
console.log("🔑 Entering password: ********");
console.log("🖱️  Clicking login button...");

console.time("Login Request");
// Simulated login
console.timeEnd("Login Request");

console.log("✅ Login successful!");
console.log("📍 Redirected to: /inventory.html");

console.timeEnd("Total Execution");

console.groupEnd();


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n─".repeat(45));
console.log("\n📋 CONSOLE METHODS SUMMARY\n");

console.log("┌─────────────────┬─────────────────────────────┐");
console.log("│ Method          │ Use Case                    │");
console.log("├─────────────────┼─────────────────────────────┤");
console.log("│ console.log     │ General output              │");
console.log("│ console.warn    │ Warnings                    │");
console.log("│ console.error   │ Errors                      │");
console.log("│ console.table   │ Display structured data     │");
console.log("│ console.time    │ Measure performance         │");
console.log("│ console.group   │ Organize output             │");
console.log("│ console.count   │ Count occurrences           │");
console.log("│ console.assert  │ Conditional logging         │");
console.log("│ console.clear   │ Clear console               │");
console.log("└─────────────────┴─────────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
