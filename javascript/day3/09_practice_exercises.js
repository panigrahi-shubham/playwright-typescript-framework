/**
 * ============================================================
 *  📋 Day 3 — Interview Coding Problems (Loops & Arrays)
 * ============================================================
 *  Topics: for loops, while, array methods, loop control,
 *          practical patterns, conditionals
 *  Rules : Solve each problem in the space provided.
 *          DO NOT use Google / AI — think first, code later.
 *  Run   : node 09_practice_exercises.js
 * ============================================================
 */

// ⚠️⚠️⚠️ STRICT WARNING ⚠️⚠️⚠️
// ─────────────────────────────────────────────────────────────
//  1. DO NOT skip any problem. Solve ALL 6 in order.
//  2. DO NOT use any external library or import.
//  3. DO NOT look at solutions online — struggle is learning.
//  4. You MUST use console.log() to print your output.
//  5. TRY to solve each within the time limit mentioned.
//  6. If stuck for more than the time limit, write pseudocode
//     in comments, then move to the next problem.
// ─────────────────────────────────────────────────────────────


console.log("=".repeat(60));
console.log("🧠 DAY 3 — INTERVIEW CODING PROBLEMS");
console.log("=".repeat(60));


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 1: FizzBuzz (Classic — Every Interview)
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Print numbers from 1 to 30.
//    But:
//      - If divisible by 3, print "Fizz" instead
//      - If divisible by 5, print "Buzz" instead
//      - If divisible by BOTH 3 and 5, print "FizzBuzz"
//      - Otherwise print the number
//
// 📌 EXPECTED OUTPUT (first 15):
//    1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz,
//    11, Fizz, 13, 14, FizzBuzz, ...
//
// 💡 HINT: Check divisible by BOTH first (order matters!)
//
// ⏱️ TIME LIMIT : 5 minutes
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 1: FizzBuzz ---");

// ✍️ YOUR CODE BELOW ⬇️

const results = [];
for (let i = 1; i <= 30; i++) {
    if (i % 15 === 0) results.push("FizzBuzz");
    else if (i % 3 === 0) results.push("Fizz");
    else if (i % 5 === 0) results.push("Buzz");
    else results.push(i);
}
console.log("  FizzBuzz(1-30):", results.join(", "));

// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 2: Find Duplicates in an Array
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given:
//       const testTags = ["smoke", "login", "smoke", "P0",
//                         "regression", "P0", "login", "P1"];
//
//    Find all DUPLICATE tags (tags that appear more than once).
//    Print each duplicate tag and how many times it appears.
//
// 📌 EXPECTED OUTPUT:
//    Duplicates found:
//      smoke → appears 2 times
//      P0    → appears 2 times
//      login → appears 2 times
//
// 💡 HINT: Use an object to count occurrences, then filter
//
// ⏱️ TIME LIMIT : 8 minutes
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 2: Find Duplicate Tags ---");

const testTags = ["smoke", "login", "smoke", "P0",
    "regression", "P0", "login", "P1"];

// ✍️ YOUR CODE BELOW ⬇️

const tagCount = {};
for (const tag of testTags) {
    tagCount[tag] = (tagCount[tag] || 0) + 1;
}

console.log("  Duplicates found:");
for (const [tag, count] of Object.entries(tagCount)) {
    if (count > 1) {
        console.log(`    ${tag} → appears ${count} times`);
    }
}

// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 3: Flatten Nested Arrays
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given this nested array of test suites and test names:
//
//       const suites = [
//           { suite: "Login",    tests: ["valid login", "invalid password"] },
//           { suite: "Search",   tests: ["search by name", "filter by price"] },
//           { suite: "Checkout", tests: ["add to cart", "place order", "confirm"] },
//       ];
//
//    a) Create a FLAT array of ALL test names (no nesting)
//    b) Print total number of tests
//    c) Print tests that contain the word "login" (case-insensitive)
//
// 📌 EXPECTED OUTPUT:
//    All tests: [ "valid login", "invalid password", "search by name", ... ]
//    Total: 7
//    Tests with "login": [ "valid login", "invalid password" ]  ← wait, only "valid login"!
//
// 💡 HINT: Use .flatMap() or .flat()
//
// ⏱️ TIME LIMIT : 8 minutes
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 3: Flatten Test Suites ---");

const suites = [
    { suite: "Login", tests: ["valid login", "invalid password"] },
    { suite: "Search", tests: ["search by name", "filter by price"] },
    { suite: "Checkout", tests: ["add to cart", "place order", "confirm"] },
];

// ✍️ YOUR CODE BELOW ⬇️

const allTests = suites.flatMap(s => s.tests);
console.log("  All tests:", allTests);
console.log("  Total:", allTests.length);

const loginTests = allTests.filter(t => t.toLowerCase().includes("login"));
console.log("  Tests with 'login':", loginTests);

// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 4: Build a Test Summary Report
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given this array of test results:
//
//       const tests = [
//           { name: "Login", status: "passed",  duration: 1200 },
//           { name: "Search", status: "failed", duration: 3400 },
//           { name: "Payment", status: "passed", duration: 900 },
//           { name: "Profile", status: "skipped", duration: 0  },
//           { name: "Logout", status: "passed",  duration: 600 },
//       ];
//
//    Print a formatted summary:
//       Total:    5
//       Passed:   3
//       Failed:   1
//       Skipped:  1
//       Duration: 6.1s
//       Result:   ❌ FAIL
//
// 💡 HINT: Use .filter() for counts, .reduce() for duration
//
// ⏱️ TIME LIMIT : 10 minutes
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 4: Test Summary Report ---");

const tests = [
    { name: "Login", status: "passed", duration: 1200 },
    { name: "Search", status: "failed", duration: 3400 },
    { name: "Payment", status: "passed", duration: 900 },
    { name: "Profile", status: "skipped", duration: 0 },
    { name: "Logout", status: "passed", duration: 600 },
];

// ✍️ YOUR CODE BELOW ⬇️

const totalDuration = tests.reduce((sum, t) => sum + t.duration, 0);
const passedCount = tests.filter(t => t.status === "passed").length;
const failedCount = tests.filter(t => t.status === "failed").length;
const skippedCount = tests.filter(t => t.status === "skipped").length;
const overallResult = failedCount === 0 ? "✅ PASS" : "❌ FAIL";

console.log(`  Total:    ${tests.length}`);
console.log(`  Passed:   ${passedCount}`);
console.log(`  Failed:   ${failedCount}`);
console.log(`  Skipped:  ${skippedCount}`);
console.log(`  Duration: ${(totalDuration / 1000).toFixed(1)}s`);
console.log(`  Result:   ${overallResult}`);

// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟡 PROBLEM 5: Find the Most Expensive In-Stock Product
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given:
//       const products = [
//           { name: "Cotton Shirt",  price: 250,  inStock: true  },
//           { name: "Silk Fabric",   price: 800,  inStock: false },
//           { name: "Linen Cloth",   price: 450,  inStock: true  },
//           { name: "Polyester Mix", price: 150,  inStock: true  },
//           { name: "Premium Silk",  price: 1200, inStock: false },
//       ];
//
//    Without using .sort(), find:
//    a) The most expensive IN-STOCK product
//    b) The cheapest IN-STOCK product
//    c) The average price of IN-STOCK products
//
// 📌 EXPECTED OUTPUT:
//    Most expensive in-stock: Linen Cloth (₹450)
//    Cheapest in-stock:       Polyester Mix (₹150)
//    Average in-stock price:  ₹283.33
//
// 💡 HINT: Use .filter() first, then .reduce() with Math.max/min
//
// ⏱️ TIME LIMIT : 10 minutes
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 5: In-Stock Price Analysis ---");

const products = [
    { name: "Cotton Shirt", price: 250, inStock: true },
    { name: "Silk Fabric", price: 800, inStock: false },
    { name: "Linen Cloth", price: 450, inStock: true },
    { name: "Polyester Mix", price: 150, inStock: true },
    { name: "Premium Silk", price: 1200, inStock: false },
];

// ✍️ YOUR CODE BELOW ⬇️

const inStock = products.filter(p => p.inStock);

const mostExpensive = inStock.reduce((max, p) => p.price > max.price ? p : max, inStock[0]);
const cheapest = inStock.reduce((min, p) => p.price < min.price ? p : min, inStock[0]);
const avgPrice = inStock.reduce((sum, p) => sum + p.price, 0) / inStock.length;

console.log(`  Most expensive in-stock: ${mostExpensive.name} (₹${mostExpensive.price})`);
console.log(`  Cheapest in-stock:       ${cheapest.name} (₹${cheapest.price})`);
console.log(`  Average in-stock price:  ₹${avgPrice.toFixed(2)}`);

// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🔴 PROBLEM 6: Paginate Results
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    You have a large list of search results and need to paginate.
//    Write a function: paginate(items, pageSize, pageNumber)
//
//    Given:
//       const searchResults = ["Item A", "Item B", "Item C", "Item D",
//                              "Item E", "Item F", "Item G", "Item H",
//                              "Item I", "Item J"];
//    And pageSize = 3, print:
//       Page 1: [ "Item A", "Item B", "Item C" ]
//       Page 2: [ "Item D", "Item E", "Item F" ]
//       Page 3: [ "Item G", "Item H", "Item I" ]
//       Page 4: [ "Item J" ]
//       Total pages: 4
//
// 💡 HINT: Use .slice(start, end)
//    start = (pageNumber - 1) * pageSize
//    end   = start + pageSize
//
// ⏱️ TIME LIMIT : 10 minutes
// ⏳ TIME COMP  : O(1) per page fetch, O(n) to print all
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 6: Pagination ---");

const searchResults = [
    "Item A", "Item B", "Item C", "Item D",
    "Item E", "Item F", "Item G", "Item H",
    "Item I", "Item J"
];

// ✍️ YOUR CODE BELOW ⬇️

function paginate(items, pageSize, pageNumber) {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
}

const pageSize = 3;
const totalPages = Math.ceil(searchResults.length / pageSize);

for (let page = 1; page <= totalPages; page++) {
    const pageItems = paginate(searchResults, pageSize, page);
    console.log(`  Page ${page}:`, pageItems);
}
console.log(`  Total pages: ${totalPages}`);

// ✍️ YOUR CODE ABOVE ⬆️


console.log("\n" + "=".repeat(60));
console.log("✅ ALL PROBLEMS ATTEMPTED — Great job! 💪");
console.log("=".repeat(60));
