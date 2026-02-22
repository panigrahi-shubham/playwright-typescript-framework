/**
 * ============================================================
 *  📋 Day 2 — Interview Coding Problems (Data Types & Operators)
 * ============================================================
 *  Topics: Primitives, Reference Types, Template Literals,
 *          Operators, Truthy/Falsy
 *  Rules : Solve each problem in the space provided.
 *          DO NOT use Google / AI — think first, code later.
 *  Run   : node 07_interview_problems.js
 * ============================================================
 */

// ⚠️⚠️⚠️ STRICT WARNING ⚠️⚠️⚠️
// ─────────────────────────────────────────────────────────────
//  1. DO NOT skip any problem. Solve ALL 5 in order.
//  2. DO NOT use any external library or import.
//  3. DO NOT look at solutions online — struggle is learning.
//  4. You MUST use console.log() to print your output.
//  5. TRY to solve each within the time limit mentioned.
//  6. If stuck for more than the time limit, write pseudocode
//     in comments, then move to the next problem.
// ─────────────────────────────────────────────────────────────


console.log("=".repeat(60));
console.log("🧠 DAY 2 — INTERVIEW CODING PROBLEMS");
console.log("=".repeat(60));


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 1: Type Detective
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given the following variables, use `typeof` to print the
//    type of EACH value. Then answer in a comment: which ones
//    are PRIMITIVE and which are REFERENCE types?
//
//       const val1 = "Playwright";
//       const val2 = 42;
//       const val3 = true;
//       const val4 = null;
//       const val5 = undefined;
//       const val6 = [1, 2, 3];
//       const val7 = { name: "test" };
//
// 📌 EXPECTED OUTPUT:
//    val1 → string    (primitive)
//    val2 → number    (primitive)
//    val3 → boolean   (primitive)
//    val4 → object    (primitive — this is a famous JS bug!)
//    val5 → undefined (primitive)
//    val6 → object    (reference)
//    val7 → object    (reference)
//
// ⏱️ TIME LIMIT : 5 minutes
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 1: Type Detective ---");

const val1 = "Playwright";
const val2 = 42;
const val3 = true;
const val4 = null;
const val5 = undefined;
const val6 = [1, 2, 3];
const val7 = { name: "test" };

// ✍️ YOUR CODE BELOW ⬇️

console.log("Type of val1 : ", typeof val1);
console.log("Type of val2 : ", typeof val2);
console.log("Type of val3 : ", typeof val3);
console.log("Type of val4 : ", typeof val4);
console.log("Type of val5 : ", typeof val5);
console.log("Type of val6 : ", typeof val6);
console.log("Type of val7 : ", typeof val7);



// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 2: Build a Dynamic Test Report Using Template Literals
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    You are given the following variables:
//       const testName = "Login Flow";
//       const totalTests = 25;
//       const passed = 22;
//       const failed = 3;
//       const duration = 14.5;
//
//    Using ONLY template literals (backticks), build and print
//    a test report in this EXACT format (multiline):
//
// 📌 EXPECTED OUTPUT:
//    ┌──────────────────────────────┐
//    │       TEST REPORT            │
//    ├──────────────────────────────┤
//    │ Suite   : Login Flow         │
//    │ Total   : 25                 │
//    │ Passed  : 22 (88%)           │
//    │ Failed  : 3                  │
//    │ Duration: 14.5s              │
//    │ Result  : ❌ FAIL            │
//    └──────────────────────────────┘
//
//    💡 HINTS:
//       - Calculate pass percentage: (passed / totalTests * 100)
//       - Result is "✅ PASS" if failed === 0, else "❌ FAIL"
//       - You MUST use template literals, not string concatenation
//
// ⏱️ TIME LIMIT : 10 minutes
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 2: Dynamic Test Report ---");

const testName = "Login Flow";
const totalTests = 25;
const passed = 22;
const failed = 3;
const duration = 14.5;


const percentage = ((passed / totalTests) * 100).toFixed(0);
const result = failed === 0 ? " Passs" : " fail";
const testReport = `+--------------------------+
|       ${testName}       |
+--------------------------+
| Total Tests: ${totalTests} |
| Passed: ${passed} (${percentage}%) |
| Failed: ${failed} |
| Duration: ${duration}s |
| Result: ${result} |
+--------------------------+`;

console.log(testReport);


// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 3: Strict vs Loose Equality Challenge
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    For each pair below, predict what `==` and `===` will
//    return. First write your prediction as a COMMENT, then
//    verify with console.log().
//
//       Pair A:  5  and  "5"
//       Pair B:  0  and  false
//       Pair C:  null  and  undefined
//       Pair D:  ""  and  false
//       Pair E:  1  and  true
//
// 📌 EXPECTED OUTPUT (for each pair):
//    Pair A → ==: true,  ===: false
//    Pair B → ==: true,  ===: false
//    Pair C → ==: true,  ===: false
//    Pair D → ==: true,  ===: false
//    Pair E → ==: true,  ===: false
//
// ⏱️ TIME LIMIT : 8 minutes
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 3: Strict vs Loose Equality ---");

// ✍️ YOUR CODE BELOW ⬇️
// Write your PREDICTION first as a comment, then verify!
// Prediction -  Pair A → ==: true,  ===: false
const pairA = console.log("Pair A - ==: ", 5 == "5", " ===: ", 5 === "5");
const pairB = console.log("Pair B - ==: ", 0 == false, " ===: ", 0 === false);
const pairC = console.log("Pair C - ==: ", null == undefined, " ===: ", null === undefined);
const pairD = console.log("Pair D - ==: ", "" == false, " ===: ", "" === false);
const pairE = console.log("Pair E - ==: ", 1 == true, " ===: ", 1 === true);




// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 4: Truthy / Falsy Filter
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given the following array:
//
//       const mixedData = [0, "hello", "", null, 42, undefined,
//                          "Playwright", false, NaN, [], "0"];
//
//    WITHOUT using .filter(), loop through the array and
//    separate the values into two new arrays:
//       - `truthyValues` → all truthy items
//       - `falsyValues`  → all falsy items
//
//    Print both arrays.
//
// 📌 EXPECTED OUTPUT:
//    Truthy: [ "hello", 42, "Playwright", [], "0" ]
//    Falsy : [ 0, "", null, undefined, false, NaN ]
//
// ⏱️ TIME LIMIT : 8 minutes
// 📦 SPACE      : O(n)
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 4: Truthy / Falsy Filter ---");

const mixedData = [0, "hello", "", null, 42, undefined,
    "Playwright", false, NaN, [], "0"];

// ✍️ YOUR CODE BELOW ⬇️




// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 5: Merge & Query Config Objects
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    You have two config objects:
//
//       const defaultConfig = {
//           browser: "chromium",
//           headless: true,
//           timeout: 30000,
//           retries: 0,
//           baseURL: "http://localhost:3000"
//       };
//
//       const userConfig = {
//           headless: false,
//           timeout: 60000,
//           retries: 2
//       };
//
//    a) Create a NEW object `finalConfig` that merges both,
//       where `userConfig` values OVERRIDE `defaultConfig`.
//       (Use the spread operator: { ...obj1, ...obj2 })
//
//    b) Print the finalConfig using console.table().
//
//    c) Print how many keys finalConfig has.
//
//    d) Print ONLY the keys where the user overrode the default
//       (i.e., keys that exist in BOTH objects).
//
// 📌 EXPECTED OUTPUT:
//    (console.table of finalConfig)
//    Total keys : 5
//    Overridden : headless, timeout, retries
//
// ⏱️ TIME LIMIT : 10 minutes
// ⏳ TIME COMP  : O(n) — where n is number of keys
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 5: Merge & Query Config Objects ---");

const defaultConfig = {
    browser: "chromium",
    headless: true,
    timeout: 30000,
    retries: 0,
    baseURL: "http://localhost:3000"
};

const userConfig = {
    headless: false,
    timeout: 60000,
    retries: 2
};

// ✍️ YOUR CODE BELOW ⬇️




// ✍️ YOUR CODE ABOVE ⬆️


console.log("\n" + "=".repeat(60));
console.log("✅ ALL PROBLEMS ATTEMPTED — Great job! 💪");
console.log("=".repeat(60));
