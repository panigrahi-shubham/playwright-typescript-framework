/**
 * ============================================
 * 06 - JavaScript Gotchas & Interview Tricks
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * These are questions that trip up candidates
 * in interviews. Know them cold. Each one has
 * a practical testing implication.
 * 
 * Run: node 06_javascript_gotchas.js
 */

console.log("═══════════════════════════════════════");
console.log("   JAVASCRIPT GOTCHAS — INTERVIEW TRICKS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// GOTCHA 1: OBJECT REFERENCE vs COPY
// ═══════════════════════════════════════
console.log("📌 GOTCHA 1: REFERENCE vs COPY\n");

// This is the #1 source of flaky tests.
// If two tests share test data and one modifies it,
// the other test sees the modification — order-dependent failures!

const original = { name: "Shirt", price: 250, tags: ["cotton", "premium"] };

// ❌ NOT a copy — it's the SAME object in memory
const notACopy = original;
notACopy.price = 999;
console.log(`  original.price after notACopy.price=999: ${original.price}`);
console.log("  → SAME reference — mutating one mutates both! ❌\n");

// ✅ Shallow copy — spread operator
const shallowCopy = { ...original };
shallowCopy.price = 500;
console.log(`  original.price after shallowCopy.price=500: ${original.price}`);
console.log("  → Top-level is independent ✅");

// BUT nested objects/arrays are STILL shared!
shallowCopy.tags.push("new-tag");
console.log(`  original.tags after shallowCopy.tags.push: [${original.tags}]`);
console.log("  → Nested array is SHARED! ❌ (shallow copy only copies top level)\n");

// ✅ Deep copy — structuredClone() (modern, built-in)
const deepCopy = structuredClone(original);
deepCopy.tags.push("deep-tag");
console.log(`  original.tags after deepCopy.tags.push: [${original.tags}]`);
console.log("  → Deep copy is fully independent ✅");

// Alternative deep copy: JSON trick (older but works)
const jsonDeepCopy = JSON.parse(JSON.stringify(original));
console.log("  Alternative: JSON.parse(JSON.stringify(obj)) — same result");

console.log("\n  ⚠️  TESTING RULE: Always deepCopy shared test data in beforeEach!");
console.log("     Otherwise tests affect each other — flaky, order-dependent.");


// ═══════════════════════════════════════
// GOTCHA 2: == WEIRDNESS COLLECTION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 GOTCHA 2: == WEIRDNESS\n");

// == does type coercion — converts values before comparing
// === checks value AND type — no conversion, no surprises

const weirdComparisons = [
    { expr: '[] == false', result: [] == false },           // true — [] → "" → 0, false → 0
    { expr: '[] == ![]', result: [] == ![] },               // true — yes, really!
    { expr: 'null == undefined', result: null == undefined },// true
    { expr: 'null === undefined', result: null === undefined },// false
    { expr: 'NaN === NaN', result: NaN === NaN },           // false — NaN is NEVER equal to itself!
    { expr: '"" == false', result: "" == false },           // true
    { expr: '"0" == false', result: "0" == false },         // true
    { expr: '"" == 0', result: "" == 0 },                   // true
    { expr: '0.1 + 0.2 === 0.3', result: 0.1 + 0.2 === 0.3 } // false!
];

console.log("  Comparison table:");
for (const { expr, result } of weirdComparisons) {
    const emoji = result ? "✅ true " : "❌ false";
    console.log(`    ${expr.padEnd(25)} → ${emoji}`);
}

// Floating point fix
console.log("\n  Floating point:");
console.log(`    0.1 + 0.2 = ${0.1 + 0.2}`);
console.log(`    Fix: Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON → ${Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON}`);
console.log("    In Playwright: expect(0.1 + 0.2).toBeCloseTo(0.3)");

// NaN check
console.log(`\n    NaN === NaN → ${NaN === NaN} (use Number.isNaN() instead)`);
console.log(`    Number.isNaN(NaN) → ${Number.isNaN(NaN)} ✅`);

console.log("\n  ⚠️  RULE: Always use === in tests. Never == .");


// ═══════════════════════════════════════
// GOTCHA 3: typeof QUIRKS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 GOTCHA 3: typeof QUIRKS\n");

const typeofChecks = [
    { expr: 'typeof null', result: typeof null },               // "object" — 1995 bug!
    { expr: 'typeof []', result: typeof [] },                   // "object"
    { expr: 'typeof NaN', result: typeof NaN },                 // "number"
    { expr: 'typeof undefined', result: typeof undefined },     // "undefined"
    { expr: 'typeof "hello"', result: typeof "hello" },         // "string"
    { expr: 'typeof 42', result: typeof 42 },                   // "number"
    { expr: 'typeof true', result: typeof true },               // "boolean"
    { expr: 'typeof function(){}', result: typeof function () { } }, // "function"
    { expr: 'typeof {}', result: typeof {} },                   // "object"
    { expr: 'typeof Symbol()', result: typeof Symbol() }        // "symbol"
];

console.log("  typeof results:");
for (const { expr, result } of typeofChecks) {
    const surprise = (expr === 'typeof null' || expr === 'typeof []' || expr === 'typeof NaN') ? " ⚠️" : "";
    console.log(`    ${expr.padEnd(25)} → "${result}"${surprise}`);
}

// Better type checking
console.log("\n  Better ways to check types:");
console.log(`    Array.isArray([])       → ${Array.isArray([])}`);       // true
console.log(`    value === null          → ${null === null}`);            // true (direct check)
console.log(`    Number.isNaN(NaN)       → ${Number.isNaN(NaN)}`);       // true
console.log(`    value instanceof Date   → ${new Date() instanceof Date}`); // true


// ═══════════════════════════════════════
// GOTCHA 4: HOISTING
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 GOTCHA 4: HOISTING\n");

// Hoisting: JavaScript moves declarations to the top of their scope
// BEFORE your code runs. But only DECLARATIONS, not assignments.

// var is hoisted — declaration moves up, value stays undefined
console.log("  var hoisting:");
console.log(`    Value of hoistedVar BEFORE declaration: ${hoistedVar}`); // undefined (not error!)
var hoistedVar = 5;
console.log(`    Value of hoistedVar AFTER declaration:  ${hoistedVar}`); // 5

// let/const are hoisted BUT stay in "Temporal Dead Zone" until declaration
console.log("\n  let/const hoisting:");
console.log("    Accessing let/const before declaration → ReferenceError");
console.log("    (Temporal Dead Zone — more predictable than var's undefined)");

// Function declarations are FULLY hoisted — name AND body
console.log("\n  Function declaration hoisting:");
console.log(`    Called before declaration: ${hoistedFunction()}`);
function hoistedFunction() { return "I work before my declaration! ✅"; }

// Function expressions (arrow/const) are NOT hoisted
console.log("    Arrow/const functions: NOT hoisted → ReferenceError if called early");

console.log("\n  ⚠️  RULE: Use const/let everywhere. Forget var exists.");
console.log("     This eliminates hoisting surprises entirely.");


// ═══════════════════════════════════════
// GOTCHA 5: 'this' IN DIFFERENT CONTEXTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 GOTCHA 5: 'this' BINDING\n");

const product = {
    name: "Shirt",

    // Regular method — 'this' = the object that owns the method
    getNameRegular() {
        return this.name; // "Shirt" ✅
    },

    // Arrow function — 'this' = outer scope (NOT the object!)
    getNameArrow: () => {
        return typeof globalThis.name !== "undefined" ? globalThis.name : undefined;
    },

    // Callback scenario — the classic trap
    delayedLog() {
        // Regular function in callback — 'this' is lost!
        const self = this; // Old fix: save 'this' in a variable

        // Modern fix: use arrow function (inherits 'this' from parent)
        return {
            regularResult: "undefined (this is lost in regular callback)",
            arrowResult: this.name // Arrow function preserves 'this'
        };
    }
};

console.log(`  Regular method:  ${product.getNameRegular()}`);     // "Shirt"
console.log(`  Arrow as method: ${product.getNameArrow()}`);       // undefined ❌
console.log(`  Delayed results: ${JSON.stringify(product.delayedLog())}`);

console.log("\n  RULES:");
console.log("    ✅ Regular functions for object METHODS (this = object)");
console.log("    ✅ Arrow functions for CALLBACKS within methods (inherits this)");
console.log("    ❌ Arrow functions as object methods (this ≠ object)");

// In classes, this works correctly with both
console.log("\n  In CLASSES:");
class Product {
    constructor(name) { this.name = name; }
    getName() { return this.name; }          // ✅ works
    // Arrow methods in classes also work because of class field syntax:
    // getNameArrow = () => this.name;       // ✅ works (class field)
}
const p = new Product("Cap");
console.log(`    class method: ${p.getName()}`); // "Cap" ✅


// ═══════════════════════════════════════
// GOTCHA 6: ARRAY COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 GOTCHA 6: ARRAY & OBJECT COMPARISON\n");

// Arrays and objects are compared by REFERENCE, not by VALUE
const a = [1, 2, 3];
const b = [1, 2, 3];
const c = a;

console.log(`  [1,2,3] === [1,2,3]  → ${a === b}`);  // false — different objects in memory
console.log(`  a === c (same ref)   → ${a === c}`);    // true — same reference

// How to compare arrays by value
console.log("\n  How to compare by VALUE:");
console.log(`    JSON.stringify:  ${JSON.stringify(a) === JSON.stringify(b)}`); // true
console.log(`    Every element:   ${a.length === b.length && a.every((v, i) => v === b[i])}`); // true

console.log("\n  ⚠️  In Playwright: expect(array).toEqual(array) does deep comparison ✅");


// ═══════════════════════════════════════
// GOTCHA QUIZ — PREDICT THE OUTPUT
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🧠 GOTCHA QUIZ — ANSWERS\n");

// Q1
console.log("  Q1: typeof typeof 42");
console.log(`      → "${typeof typeof 42}"`);
console.log("      typeof 42 = 'number', typeof 'number' = 'string'\n");

// Q2
const arr = [1, 2, 3];
arr[10] = 11;
console.log("  Q2: arr = [1,2,3]; arr[10] = 11; arr.length?");
console.log(`      → ${arr.length}`);
console.log("      Creates 'holes' — indices 3-9 are empty slots\n");

// Q3
console.log("  Q3: '5' - 3 and '5' + 3");
console.log(`      '5' - 3 = ${"5" - 3}  (- converts string to number)`);
console.log(`      '5' + 3 = ${"5" + 3}  (+ concatenates with string)\n`);

// Q4
const obj = { a: 1, b: 2, c: 3 };
const { a: aVal, ...rest } = obj;
console.log("  Q4: const { a, ...rest } = { a:1, b:2, c:3 }; rest?");
console.log(`      → ${JSON.stringify(rest)}`);
console.log("      Rest collects remaining properties\n");

// Q5
console.log("  Q5: [...'hello']");
console.log(`      → [${[..."hello"].map(c => `"${c}"`).join(", ")}]`);
console.log("      Spread on string splits into characters\n");

// Q6
console.log("  Q6: [1,2,3] === [1,2,3]");
console.log(`      → ${[1, 2, 3] === [1, 2, 3]}`);
console.log("      Different references — objects compared by reference\n");

// Q7
console.log("  Q7: 0.1 + 0.2 === 0.3");
console.log(`      → ${0.1 + 0.2 === 0.3}  (floating point: 0.1 + 0.2 = ${0.1 + 0.2})\n`);

// Q8
console.log("  Q8: (() => arguments)() — arrow function + arguments");
console.log("      → ReferenceError");
console.log("      Arrow functions don't have their own 'arguments' object");
console.log("      Use ...rest parameters instead: (...args) => args");


// ═══════════════════════════════════════
// COMMON MISTAKES TABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚠️  COMMON MISTAKES — DAY 6 EDITION\n");

console.log("  ┌────────────────────────────────┬──────────────────────────────────┐");
console.log("  │ Mistake                        │ Correct Way                      │");
console.log("  ├────────────────────────────────┼──────────────────────────────────┤");
console.log("  │ Mutating shared test data      │ structuredClone() in beforeEach  │");
console.log("  │ for...in on arrays             │ for...of for arrays              │");
console.log("  │ forEach with async/await       │ for...of with await              │");
console.log("  │ Shallow copy for nested data   │ structuredClone() for deep copy  │");
console.log("  │ Arrow functions as methods     │ Regular functions for methods    │");
console.log("  │ == for comparison              │ Always use ===                   │");
console.log("  │ 0.1 + 0.2 === 0.3             │ Use toBeCloseTo() assertion      │");
console.log("  │ Ignoring Promise.all rejection │ try/catch or Promise.allSettled  │");
console.log("  └────────────────────────────────┴──────────────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
