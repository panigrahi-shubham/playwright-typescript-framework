/**
 * ============================================
 * 09 - Practice Exercises & Debug Challenges
 * ============================================
 * 
 * Day 3: Test your understanding of
 * conditionals and loops!
 * 
 * Run: node 09_practice_exercises.js
 */

console.log("═══════════════════════════════════════");
console.log("   PRACTICE EXERCISES & CHALLENGES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// EXERCISE 1: Grade Calculator
// ═══════════════════════════════════════
console.log("📋 EXERCISE 1: Grade Calculator\n");

// Returns letter grade for a score
// 90-100: "A" | 80-89: "B" | 70-79: "C" | 60-69: "D" | Below 60: "F"
// Handle invalid inputs (negative, >100, non-numbers)

function getGrade(score) {
    // Guard clauses for invalid input
    if (typeof score !== "number") return "Invalid: not a number";
    if (isNaN(score)) return "Invalid: NaN";
    if (score < 0) return "Invalid: negative score";
    if (score > 100) return "Invalid: score above 100";

    // Grade calculation — no else needed with returns!
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}

// Test cases
const gradeTests = [95, 82, 73, 65, 45, -5, 150, "A", NaN];

for (const score of gradeTests) {
    const display = typeof score === "string" ? `"${score}"` : score;
    console.log(`  Score: ${String(display).padEnd(6)} → Grade: ${getGrade(score)}`);
}


// ═══════════════════════════════════════
// EXERCISE 2: FizzBuzz (Classic Interview!)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 2: FizzBuzz\n");

// Print numbers 1-30
// Multiples of 3: "Fizz"
// Multiples of 5: "Buzz"  
// Both: "FizzBuzz"

const fizzBuzzResults = [];

for (let i = 1; i <= 30; i++) {
    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";

    fizzBuzzResults.push(output || i);
}

// Print in rows of 10 for readability
console.log("  " + fizzBuzzResults.slice(0, 10).join(", "));
console.log("  " + fizzBuzzResults.slice(10, 20).join(", "));
console.log("  " + fizzBuzzResults.slice(20, 30).join(", "));

// 💡 Key insight: Build the string with += 
// rather than checking "divisible by both" separately


// ═══════════════════════════════════════
// EXERCISE 3: Find First Duplicate
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 3: Find First Duplicate\n");

function firstDuplicate(arr) {
    const seen = new Set();

    for (const item of arr) {
        if (seen.has(item)) {
            return item; // Found duplicate!
        }
        seen.add(item);
    }

    return null; // No duplicates
}

// Test cases
console.log("  [2, 3, 3, 1, 5, 2] →", firstDuplicate([2, 3, 3, 1, 5, 2]));  // 3
console.log("  [1, 2, 3, 4]       →", firstDuplicate([1, 2, 3, 4]));          // null
console.log("  [5, 1, 5, 2, 2]    →", firstDuplicate([5, 1, 5, 2, 2]));      // 5
console.log("  []                 →", firstDuplicate([]));                     // null

// 💡 Key insight: Use a Set for O(1) lookups
// Much faster than nested loops!


// ═══════════════════════════════════════
// EXERCISE 4: Retry Failed Tests
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 4: Retry Failed Tests\n");

// Simulate test execution (random pass/fail)
function simulateTestRun(name) {
    return Math.random() > 0.4; // 60% pass rate
}

function runTestsWithRetry(tests, maxRetries = 2) {
    const finalResults = [];

    for (const test of tests) {
        let passed = test.passed;
        let retryCount = 0;

        // Only retry failed tests
        while (!passed && retryCount < maxRetries) {
            retryCount++;
            console.log(`    Retrying ${test.name} (attempt ${retryCount})...`);
            passed = simulateTestRun(test.name);
        }

        const status = passed ? "✅" : "❌";
        const retryInfo = retryCount > 0 ? ` (${retryCount} retries)` : "";
        console.log(`    ${status} ${test.name}${retryInfo}`);

        finalResults.push({
            name: test.name,
            passed: passed,
            retries: retryCount
        });
    }

    return finalResults;
}

const initialResults = [
    { name: "login", passed: true },
    { name: "payment", passed: false },   // Will retry
    { name: "search", passed: true },
    { name: "checkout", passed: false }   // Will retry
];

console.log("  Running tests with retry (max 2 retries):\n");
const finalResults = runTestsWithRetry(initialResults);

const retried = finalResults.filter(r => r.retries > 0);
console.log(`\n  Summary: ${retried.length} tests were retried`);


// ═══════════════════════════════════════
// EXERCISE 5: Process Paginated API
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 5: Process Paginated API\n");

// Simulate API: returns { data: [], hasMore: boolean }
function fetchPage(page) {
    const itemsPerPage = 3;
    const totalItems = 10;
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, totalItems);

    const data = [];
    for (let i = start; i < end; i++) {
        data.push(`user_${i + 1}`);
    }

    return {
        data: data,
        hasMore: end < totalItems,
        page: page
    };
}

function fetchAllPages() {
    const allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const result = fetchPage(page);
        allData.push(...result.data);

        console.log(`  Page ${page}: [${result.data.join(", ")}] (hasMore: ${result.hasMore})`);

        hasMore = result.hasMore;
        page++;

        // Safety limit
        if (page > 100) {
            console.log("  ⚠️ Safety limit reached");
            break;
        }
    }

    return allData;
}

const allUsers = fetchAllPages();
console.log(`\n  Total users fetched: ${allUsers.length}`);


// ═══════════════════════════════════════
// DEBUG CHALLENGE 1: Infinite Loop
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🐛 DEBUG CHALLENGE 1: Infinite Loop\n");

console.log("  // What's wrong here?");
console.log("  for (let i = 0; i < 10; i--) {");
console.log("      console.log(i);");
console.log("  }");
console.log("\n  ❌ Bug: i-- DECREMENTS, so i goes 0, -1, -2...");
console.log("     It never reaches 10!");
console.log("  ✅ Fix: Change i-- to i++\n");

// Fixed version
console.log("  Fixed output (first 5):");
for (let i = 0; i < 5; i++) { // i++ not i--
    process.stdout.write(`  ${i} `);
}
console.log();


// ═══════════════════════════════════════
// DEBUG CHALLENGE 2: Async in forEach
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🐛 DEBUG CHALLENGE 2: Async in forEach\n");

console.log('  // Why does "All done!" print BEFORE fetches?');
console.log("  urls.forEach(async (url) => {");
console.log("      const data = await fetch(url);");
console.log("  });");
console.log('  console.log("All done!");');

console.log("\n  ❌ Bug: forEach doesn't wait for async callbacks!");
console.log("     It fires all promises and moves on immediately.");

console.log("\n  ✅ Fix: Use for...of for sequential:");
console.log("  for (const url of urls) {");
console.log("      const data = await fetch(url);");
console.log("  }");
console.log('  console.log("All done!"); // Now waits correctly');

console.log("\n  ✅ Fix: Use Promise.all for parallel:");
console.log("  await Promise.all(urls.map(url => fetch(url)));");


// ═══════════════════════════════════════
// DEBUG CHALLENGE 3: Closure in Loops
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🐛 DEBUG CHALLENGE 3: Closure in Loops\n");

console.log("  // What does this output?");
console.log("  for (var i = 0; i < 3; i++) {");
console.log("      setTimeout(() => console.log(i), 100);");
console.log("  }");
console.log("\n  Output: 3, 3, 3  (NOT 0, 1, 2!)");
console.log("\n  ❌ Bug: var is function-scoped, not block-scoped");
console.log("     By the time callbacks run, i is already 3");

console.log("\n  ✅ Fix: Use let (block-scoped):");

for (let i = 0; i < 3; i++) {
    // setTimeout(() => console.log(i), 0); // Would print 0, 1, 2
}
console.log("  for (let i = 0; i < 3; i++) { ... }");
console.log("  Output with let: 0, 1, 2 ✅");


// ═══════════════════════════════════════
// INTERVIEW QUICK REFERENCE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 INTERVIEW QUICK REFERENCE\n");

console.log("  ┌──────────────────────────────┬─────────────────────────────────┐");
console.log("  │ Question                     │ Answer                          │");
console.log("  ├──────────────────────────────┼─────────────────────────────────┤");
console.log("  │ for vs for...of vs for...in? │ for: index, of: values, in:keys│");
console.log("  │ while vs for?                │ while: unknown, for: known     │");
console.log("  │ Exit loop early?             │ break, continue, return        │");
console.log("  │ break vs return?             │ break: loop, return: function  │");
console.log("  │ Async in loops?              │ for...of or Promise.all+map    │");
console.log("  │ Avoid forEach with async?    │ Yes — it doesn't await         │");
console.log("  └──────────────────────────────┴─────────────────────────────────┘");


// ═══════════════════════════════════════
// DAY 3 CHECKLIST
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n✅ DAY 3 CHECKLIST\n");

const checklist = [
    "Write if/else if/else chains",
    "Use ternary operator for simple conditions",
    "Write switch statements with proper break",
    "Use truthy/falsy in conditions",
    "Write for, while, and do...while loops",
    "Use for...of for arrays, for...in for objects",
    "Use break and continue effectively",
    "Apply array methods: map, filter, find, some, every, reduce",
    "Handle async operations in loops correctly",
    "Solve all 5 practice exercises",
    "Understand closure/scope issues in loops"
];

checklist.forEach((item, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. ${item}`);
});

console.log("\n  🚀 Tomorrow: Day 4 — Functions & Scope!");

console.log("\n═══════════════════════════════════════\n");
