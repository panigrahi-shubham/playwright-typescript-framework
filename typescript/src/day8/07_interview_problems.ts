/**
 * ============================================================
 *  📋 Day 8 — Interview Coding Problems (TypeScript Types)
 * ============================================================
 *  Topics: Annotations, Inference, Unions, Type Aliases,
 *          Enums, Tuples, Type Assertions
 *  Rules : Solve each problem in the space provided.
 *          DO NOT use Google / AI — think first, code later.
 *  Run   : npx ts-node typescript/src/day8/07_interview_problems.ts
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
console.log("🧠 DAY 8 — INTERVIEW CODING PROBLEMS (TypeScript)");
console.log("=".repeat(60));


// ═══════════════════════════════════════════════════════════
// 🟢 PROBLEM 1: Annotate Everything
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Given the following JavaScript-style variables (no types),
//    ADD proper TypeScript type annotations to each one.
//    Then create a function called `createTestReport` that:
//      - Takes: suiteName (string), total (number), passed (number)
//      - Returns: an object with: { suite, total, passed, failed, passRate }
//      - passRate should be a string like "88%"
//
// 📌 EXPECTED OUTPUT:
//    report: {
//      suite: "Login Tests",
//      total: 25,
//      passed: 22,
//      failed: 3,
//      passRate: "88%"
//    }
//
// ⏱️ TIME LIMIT : 8 minutes
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 1: Annotate Everything ---");

// Step 1: Add type annotations to these variables
let testName = "Login Tests";
let totalTests = 25;
let passed = 22;
let isAutomated = true;
let tags = ["smoke", "regression", "login"];

// Step 2: Create the function below
// ✍️ YOUR CODE BELOW ⬇️



// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟡 PROBLEM 2: Union Type Handler
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    Create a function called `processInput` that:
//      - Takes a parameter `input` of type: string | number | boolean
//      - Returns a string based on the type:
//        - If string → return it in UPPERCASE
//        - If number → return "Number: " + the number doubled
//        - If boolean → return "Flag is ON" or "Flag is OFF"
//      - Use typeof for type narrowing
//
// 📌 EXPECTED OUTPUT:
//    processInput("hello")  → "HELLO"
//    processInput(21)       → "Number: 42"
//    processInput(true)     → "Flag is ON"
//    processInput(false)    → "Flag is OFF"
//
// ⏱️ TIME LIMIT : 8 minutes
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 2: Union Type Handler ---");

// ✍️ YOUR CODE BELOW ⬇️



// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟡 PROBLEM 3: Build a Type-Safe Config System
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    a) Create a string enum called `TestEnvironment` with values:
//       Local = "http://localhost:3000"
//       Staging = "https://staging.example.com"
//       Production = "https://example.com"
//
//    b) Create a type alias `TestConfig` with these properties:
//       - browser: literal type "chromium" | "firefox" | "webkit"
//       - headless: boolean
//       - timeout: number
//       - retries: number
//       - baseURL: TestEnvironment (the enum you created)
//       - tags?: string[]          (optional)
//
//    c) Create TWO config objects using your type:
//       - localConfig  → chromium, headless false, timeout 30000, 0 retries, Local
//       - ciConfig     → firefox, headless true, timeout 60000, 3 retries, Staging,
//                        tags: ["smoke", "regression"]
//
//    d) Print both configs using console.table()
//
// ⏱️ TIME LIMIT : 10 minutes
// ⏳ TIME COMP  : O(1)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 3: Type-Safe Config System ---");

// ✍️ YOUR CODE BELOW ⬇️



// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🟠 PROBLEM 4: Tuple Operations
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    a) Create a type alias `TestResult` as a labeled tuple:
//       [testName: string, passed: boolean, durationMs: number]
//
//    b) Create an array of 3 TestResults:
//       - ["Login Test", true, 1500]
//       - ["Search Test", false, 3200]
//       - ["Checkout Test", true, 2100]
//
//    c) Write a function `summarizeResults` that:
//       - Takes: TestResult[]
//       - Returns: a tuple [totalPassed: number, totalFailed: number, avgDuration: number]
//       - Loop through and calculate the results
//
//    d) Destructure the returned tuple and print:
//       "Passed: X, Failed: Y, Avg Duration: Z ms"
//
// ⏱️ TIME LIMIT : 10 minutes
// ⏳ TIME COMP  : O(n)
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 4: Tuple Operations ---");

// ✍️ YOUR CODE BELOW ⬇️



// ✍️ YOUR CODE ABOVE ⬆️


// ═══════════════════════════════════════════════════════════
// 🔴 PROBLEM 5: Debug Challenge — Find the Type Errors!
// ═══════════════════════════════════════════════════════════
//
// 📝 QUESTION:
//    The code below has 5 TypeScript errors.
//    Find ALL 5 errors. Write what the error is in a comment
//    and then write the FIXED version below.
//
//    DO NOT uncomment the buggy code — just write the fixes.
//
// BUGGY CODE (DO NOT UNCOMMENT):
// ──────────────────────────────
//    type User = {
//        name: string;
//        age: number;
//        email: string;
//    };
//
//    // Bug 1:
//    let userName: String = "Alice";
//
//    // Bug 2:
//    function getAge(user: User) {
//        return user.age;
//    }
//    const age: string = getAge({ name: "Alice", age: 30, email: "a@b.com" });
//
//    // Bug 3:
//    let scores: number[] = [90, 85, "78", 92];
//
//    // Bug 4:
//    function greet(name: string): number {
//        return `Hello, ${name}!`;
//    }
//
//    // Bug 5:
//    let config: { browser: "chromium" | "firefox" } = { browser: "safari" };
//
// ⏱️ TIME LIMIT : 8 minutes
// ─────────────────────────────────────────────────────────────

console.log("\n--- Problem 5: Debug Challenge ---");

// ✍️ YOUR FIXES BELOW ⬇️
// For each bug, write:
//   // Bug N: [explain what's wrong]
//   // Fix:
//   [your corrected code]



// ✍️ YOUR FIXES ABOVE ⬆️


console.log("\n" + "=".repeat(60));
console.log("✅ ALL PROBLEMS ATTEMPTED — Great job! 💪");
console.log("=".repeat(60));

export { };
