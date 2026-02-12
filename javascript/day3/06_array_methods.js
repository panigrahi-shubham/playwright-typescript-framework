/**
 * ============================================
 * 06 - Array Methods — Functional Looping
 * ============================================
 * 
 * Day 3: Modern JavaScript array methods
 * Often cleaner than traditional loops!
 * 
 * Run: node 06_array_methods.js
 */

console.log("═══════════════════════════════════════");
console.log("   ARRAY METHODS — Functional Looping");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. forEach — Execute for Each Element
// ═══════════════════════════════════════
console.log("📌 forEach — Execute for Each Element\n");

const testCases = ["login", "signup", "checkout", "logout"];

testCases.forEach((testCase, index) => {
    console.log(`  ${index + 1}. Testing ${testCase}`);
});

// ⚠️ IMPORTANT: forEach does NOT wait for async!
// Don't use with await — use for...of instead


// ═══════════════════════════════════════
// 2. map — Transform Each Element
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 map — Transform Each Element\n");

// Returns a NEW array with transformed values
const prices = [100, 200, 300];
const pricesWithGST = prices.map(price => price * 1.18);
console.log("  Original prices:", prices);
console.log("  With 18% GST:  ", pricesWithGST);

// Create URLs from IDs
const productIds = [101, 102, 103];
const urls = productIds.map(id => `https://site.com/product/${id}`);
console.log("\n  Product URLs:");
urls.forEach(url => console.log(`    ${url}`));

// Transform test data
const usernames = ["alice", "bob", "charlie"];
const emails = usernames.map(name => `${name}@test.com`);
console.log("\n  Generated emails:", emails);


// ═══════════════════════════════════════
// 3. filter — Keep Only Matching Elements
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 filter — Keep Only Matching Elements\n");

const users = [
    { name: "Alice", isActive: true },
    { name: "Bob", isActive: false },
    { name: "Charlie", isActive: true }
];

const activeUsers = users.filter(user => user.isActive);
console.log("  All users:", users.map(u => u.name).join(", "));
console.log("  Active users:", activeUsers.map(u => u.name).join(", "));

// Find failed tests
const results = [
    { test: "login", status: "passed" },
    { test: "payment", status: "failed" },
    { test: "search", status: "passed" },
    { test: "checkout", status: "failed" },
    { test: "logout", status: "passed" }
];

const failedTests = results.filter(r => r.status === "failed");
const passedTests = results.filter(r => r.status === "passed");

console.log(`\n  Test Results: ${passedTests.length} passed, ${failedTests.length} failed`);
console.log("  Failed:", failedTests.map(r => r.test).join(", "));


// ═══════════════════════════════════════
// 4. find — Get First Match
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 find — Get FIRST Match Only\n");

const products = [
    { id: 1, name: "Laptop", inStock: false },
    { id: 2, name: "Mouse", inStock: true },
    { id: 3, name: "Keyboard", inStock: true }
];

const firstAvailable = products.find(p => p.inStock);
console.log("  First in-stock product:", firstAvailable.name);
// Returns { id: 2, name: "Mouse", inStock: true }

const laptop = products.find(p => p.name === "Laptop");
console.log("  Found Laptop:", laptop ? `id=${laptop.id}` : "not found");

// find returns undefined if nothing matches
const tablet = products.find(p => p.name === "Tablet");
console.log("  Found Tablet:", tablet || "not found");


// ═══════════════════════════════════════
// 5. some / every — Boolean Checks
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 some / every — Boolean Checks\n");

const scores = [85, 90, 78, 92];

// some → Did ANY match?
const hasHighScore = scores.some(score => score > 90);
console.log(`  Any score > 90? ${hasHighScore}`);  // true

// every → Did ALL match?
const allPassed = scores.every(score => score >= 60);
console.log(`  All scores >= 60? ${allPassed}`);  // true

const allExcellent = scores.every(score => score >= 90);
console.log(`  All scores >= 90? ${allExcellent}`);  // false

// Test automation: Check if any test failed
const testResults = [{ passed: true }, { passed: false }, { passed: true }];
const hasFailures = testResults.some(r => !r.passed);
const allTestsPassed = testResults.every(r => r.passed);

console.log(`\n  Has failures? ${hasFailures}`);      // true
console.log(`  All passed? ${allTestsPassed}`);        // false


// ═══════════════════════════════════════
// 6. reduce — Aggregate Values
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 reduce — Aggregate Values\n");

// Sum all values
const orderAmounts = [1200, 3400, 560, 8990];
const total = orderAmounts.reduce((sum, amount) => sum + amount, 0);
console.log("  Order amounts:", orderAmounts);
console.log(`  Total: ₹${total}`);

// Count occurrences
const statuses = ["passed", "failed", "passed", "passed", "failed"];
const counts = statuses.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
}, {});
console.log("\n  Status counts:", counts);
// { passed: 3, failed: 2 }

// Find max value
const testDurations = [1200, 3400, 560, 8990, 2100];
const longest = testDurations.reduce((max, duration) =>
    duration > max ? duration : max, 0);
console.log(`  Longest test: ${longest}ms`);


// ═══════════════════════════════════════
// 7. CHAINING METHODS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 CHAINING METHODS\n");

// Chain filter + map + forEach for powerful data processing
const allTestResults = [
    { name: "login", time: 1200, status: "passed" },
    { name: "payment", time: 3400, status: "failed" },
    { name: "search", time: 560, status: "passed" },
    { name: "checkout", time: 8990, status: "failed" },
    { name: "logout", time: 200, status: "passed" }
];

// Get names of slow tests (> 1000ms) that also failed
const slowFailures = allTestResults
    .filter(t => t.status === "failed")
    .filter(t => t.time > 1000)
    .map(t => `${t.name} (${t.time}ms)`);

console.log("  Slow failures:", slowFailures);

// Get total time of passed tests
const passedTime = allTestResults
    .filter(t => t.status === "passed")
    .reduce((sum, t) => sum + t.time, 0);

console.log(`  Total passed time: ${passedTime}ms`);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ARRAY METHODS SUMMARY\n");

console.log("  ┌──────────┬──────────────────────────────────────┐");
console.log("  │ Method   │ Purpose                              │");
console.log("  ├──────────┼──────────────────────────────────────┤");
console.log("  │ forEach  │ Execute side effects for each item   │");
console.log("  │ map      │ Transform → new array                │");
console.log("  │ filter   │ Keep matches → new array             │");
console.log("  │ find     │ First match → single item            │");
console.log("  │ some     │ Any match? → boolean                 │");
console.log("  │ every    │ All match? → boolean                 │");
console.log("  │ reduce   │ Aggregate → single value             │");
console.log("  └──────────┴──────────────────────────────────────┘");

console.log("\n  💡 These return new arrays/values — they DON'T");
console.log("     modify the original array!");

console.log("\n═══════════════════════════════════════\n");
