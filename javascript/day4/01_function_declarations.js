/**
 * ============================================
 * 01 - Functions: Three Ways to Write Them
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * Functions are reusable blocks of code.
 * Every Playwright test IS a function.
 * Every page action IS a function call.
 * 
 * Run: node 01_function_declarations.js
 */

console.log("═══════════════════════════════════════");
console.log("   FUNCTIONS — THREE WAYS TO WRITE THEM");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. FUNCTION DECLARATION (Traditional)
// ═══════════════════════════════════════
console.log("📌 WAY 1 — Function Declaration\n");

// Uses the 'function' keyword.
// Most similar to Java methods.
// KEY FEATURE: Hoisted — can be called BEFORE it appears in the code.
function add(a, b) {
    return a + b;
}

console.log("  add(5, 3):", add(5, 3));       // 8
console.log("  add(10, 20):", add(10, 20));    // 30

// Automation example — reusable function to build URLs
function buildUrl(baseUrl, path) {
    return `${baseUrl}${path}`;
}

const loginUrl = buildUrl("https://saucedemo.com", "/login");
console.log("  Login URL:", loginUrl);



// ═══════════════════════════════════════
// 2. FUNCTION EXPRESSION (Stored in a Variable)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 WAY 2 — Function Expression\n");

// The function is assigned to a variable using const.
// NOT hoisted — must be defined BEFORE you call it.
// Semicolon required at the end (it's a variable assignment).
const subtract = function (a, b) {
    return a - b;
};  // ← semicolon required

console.log("  subtract(10, 4):", subtract(10, 4));    // 6
console.log("  subtract(100, 25):", subtract(100, 25)); // 75

// Use when: you want to pass a function as a value,
// or want functions that can't be accidentally overwritten.


// ═══════════════════════════════════════
// 3. ARROW FUNCTION ⭐ (90% of Your Playwright Code)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ WAY 3 — Arrow Function (ES6+)\n");

// Introduced in ES6 (2015). The modern standard.
// Shorter syntax, no 'this' binding (inherits from parent scope).

// Full syntax — with curly braces and explicit return
const multiply = (a, b) => {
    return a * b;
};
console.log("  Full syntax — multiply(4, 5):", multiply(4, 5));  // 20

// Short syntax — single expression, skip {} and return
// The return is AUTOMATIC (implicit return)
const divide = (a, b) => a / b;
console.log("  Short syntax — divide(20, 4):", divide(20, 4));   // 5

// Single parameter — can skip parentheses around the parameter
const double = x => x * 2;
console.log("  Single param — double(7):", double(7));            // 14

// No parameters — empty parentheses required
const greet = () => "Hello, Tester!";
console.log("  No params — greet():", greet());

// Multi-line — need {} and explicit return
const calculateTax = (price) => {
    const taxRate = 0.18;       // 18% GST
    const tax = price * taxRate;
    return price + tax;
};
console.log("  Multi-line — calculateTax(1000):", calculateTax(1000)); // 1180


// ═══════════════════════════════════════
// 🚨 CRITICAL: THE IMPLICIT RETURN TRAP
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🚨 THE IMPLICIT RETURN TRAP\n");

// If you use curly braces {}, you MUST write 'return' explicitly.
// Without braces, the return is automatic.

const correct1 = (x) => x * 2;              // ✅ Returns x * 2 automatically
const broken = (x) => { x * 2 };          // ❌ Returns undefined! Missing 'return'
const correct2 = (x) => { return x * 2; };  // ✅ Works with explicit return

console.log("  (x) => x * 2        →", correct1(5));   // 10
console.log("  (x) => { x * 2 }    →", broken(5));      // undefined ← BUG!
console.log("  (x) => { return x*2 } →", correct2(5));  // 10

console.log("\n  ⚠️  This is one of the most common arrow function bugs.");
console.log("  ⚠️  Interviewers test this. Know it cold.");


// ═══════════════════════════════════════
// HOISTING & TEMPORAL DEAD ZONE (TDZ)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 HOISTING & TEMPORAL DEAD ZONE (TDZ)\n");

// Function declarations are HOISTED — callable anywhere in the file.
// JavaScript reads the entire file first and lifts all function
// declarations to the top.

// ✅ This works — calling greetUser BEFORE its declaration
console.log("  Calling greetUser before declaration:", greetUser("Shubham"));

function greetUser(name) {
    return `Hello, ${name}!`;
}

// ❌ const/let variables are hoisted but NOT initialised.
// Accessing them before declaration throws a ReferenceError.
// This gap is called the Temporal Dead Zone (TDZ).

// The following would crash:
// console.log(sayHi("World"));  // ❌ ReferenceError: Cannot access before init
// const sayHi = (name) => `Hi, ${name}!`;

// Instead, declare first, then call:
const sayHi = (name) => `Hi, ${name}!`;
console.log("  Calling sayHi after declaration:", sayHi("World"));

console.log("\n  💡 Interview tip: Explain hoisting AND TDZ together.");
console.log("     'Function declarations are hoisted and initialised.'");
console.log("     'const/let are hoisted but NOT initialised — TDZ applies.'");


// ═══════════════════════════════════════
// JAVA ↔ JAVASCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 JAVA ↔ JAVASCRIPT COMPARISON\n");

// Java:  public int add(int a, int b) { return a + b; }
// JS:    const add = (a, b) => a + b;
//        ↑ Much shorter, no types needed

// Java Lambda:  (a, b) -> a + b     (uses ->)
// JS Arrow:     (a, b) => a + b     (uses =>)
//               Almost identical! Just -> vs =>

// Java: Methods MUST be inside a class
// JS:   Functions can exist ANYWHERE — they are first-class values

// Java: Method overloading (same name, different params)
// JS:   NOT supported — use default parameters instead (next section)

console.log("  ┌────────────────────────┬──────────────────────────────┐");
console.log("  │ Java                   │ JavaScript                   │");
console.log("  ├────────────────────────┼──────────────────────────────┤");
console.log("  │ public int add(a, b)   │ const add = (a, b) => a + b  │");
console.log("  │ (a, b) -> a + b        │ (a, b) => a + b  (=> not ->) │");
console.log("  │ Must be inside a class │ Can exist anywhere            │");
console.log("  │ Method overloading     │ Default parameters instead    │");
console.log("  └────────────────────────┴──────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 FUNCTION TYPES SUMMARY\n");

console.log("  • Declaration: function name() {}  — hoisted, traditional");
console.log("  • Expression:  const fn = function() {}  — not hoisted");
console.log("  • Arrow:       const fn = () => {}  — modern, 90% of Playwright");
console.log("  • Arrow functions inherit 'this' from parent scope");
console.log("  • Watch out for the implicit return trap with {}");
console.log("  • TDZ affects const/let — declare before use");

console.log("\n═══════════════════════════════════════\n");
