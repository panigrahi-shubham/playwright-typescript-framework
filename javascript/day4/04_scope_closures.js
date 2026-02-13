/**
 * ============================================
 * 04 - Scope & Closures
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * Scope = where variables are accessible.
 * Closures = when functions remember their
 * parent scope even after the parent is gone.
 * Both are interview favourites.
 * 
 * Run: node 04_scope_closures.js
 */

console.log("═══════════════════════════════════════");
console.log("   SCOPE & CLOSURES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. SCOPE — Where Variables Live
// ═══════════════════════════════════════
console.log("📌 SCOPE — Where Variables Are Accessible\n");

// The SCOPE CHAIN: Functions can see variables from:
//   ✅ Their OWN scope
//   ✅ ALL PARENT scopes (looking outward)
//   ❌ NEVER from child scopes (looking inward)

const globalVar = "I am everywhere";       // Global scope — visible to ALL

function outerFunction() {
    const outerVar = "I am in outer";      // Function scope — visible to inner

    function innerFunction() {
        const innerVar = "I am in inner";  // Inner scope — only visible here
        console.log("  innerFunction can see:");
        console.log("    globalVar:", globalVar);  // ✅ can see global
        console.log("    outerVar:", outerVar);    // ✅ can see parent scope
        console.log("    innerVar:", innerVar);    // ✅ can see own scope
    }

    innerFunction();
    console.log("\n  outerFunction can see:");
    console.log("    globalVar:", globalVar);       // ✅ can see global
    console.log("    outerVar:", outerVar);         // ✅ can see own scope
    // console.log(innerVar);                       // ❌ ERROR — cannot see child scope
    console.log("    innerVar: ❌ NOT accessible (child scope)");
}

outerFunction();


// ═══════════════════════════════════════
// 2. BLOCK SCOPE vs FUNCTION SCOPE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 BLOCK SCOPE (let/const) vs FUNCTION SCOPE (var)\n");

// let and const are BLOCK-scoped — they exist only inside { }
// var is FUNCTION-scoped — it leaks out of blocks (dangerous!)

if (true) {
    let blockScoped = "I exist only in this block";
    const alsoBlockScoped = "Me too";
    var functionScoped = "I leak out!";  // ⚠️ var leaks!
}

// console.log(blockScoped);       // ❌ ReferenceError
// console.log(alsoBlockScoped);   // ❌ ReferenceError
console.log("  var leaks out of blocks:", functionScoped);  // ✅ Works! (bad)

console.log("\n  ⚠️  This is why we NEVER use 'var' in modern JavaScript.");
console.log("     Always use 'const' (default) or 'let' (when reassigning).");


// ═══════════════════════════════════════
// 3. CLOSURES — Functions That Remember
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ CLOSURES — Functions That Remember\n");

// A CLOSURE happens when a function retains access to its
// parent scope's variables even AFTER the parent function
// has finished executing.
//
// It's like the function carries a backpack containing
// all variables it might need.

function createCounter() {
    let count = 0;  // This variable is "closed over"

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
// createCounter() has FINISHED executing at this point.
// But the returned functions STILL remember "count"!

console.log("  counter.increment():", counter.increment());  // 1
console.log("  counter.increment():", counter.increment());  // 2
console.log("  counter.increment():", counter.increment());  // 3
console.log("  counter.decrement():", counter.decrement());  // 2
console.log("  counter.getCount():", counter.getCount());    // 2

// count is NOT accessible from outside — true privacy!
// console.log(count);  // ❌ ReferenceError: count is not defined
console.log("\n  💡 'count' is private — only the returned functions can access it.");
console.log("     In Java, you'd use private fields + getters for this.");
console.log("     Closures are JavaScript's elegant version.");


// ═══════════════════════════════════════
// 4. PRACTICAL CLOSURE EXAMPLES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PRACTICAL CLOSURE EXAMPLES\n");

// Example 1: Logger with prefix
function createLogger(prefix) {
    // 'prefix' is closed over — remembered even after createLogger returns
    return (message) => console.log(`  [${prefix}] ${message}`);
}

const infoLog = createLogger("INFO");
const errorLog = createLogger("ERROR");
const testLog = createLogger("TEST");

infoLog("Server started");       // [INFO] Server started
errorLog("Connection failed");   // [ERROR] Connection failed
testLog("Login test passed");    // [TEST] Login test passed

// Example 2: Multiplier factory
console.log();
function createMultiplier(factor) {
    // 'factor' is closed over
    return (number) => number * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const withGST = createMultiplier(1.18);

console.log("  double(5):", double(5));       // 10
console.log("  triple(5):", triple(5));       // 15
console.log("  withGST(100):", withGST(100)); // 118

// Example 3: Test retry tracker
console.log();
function createRetryTracker(maxRetries) {
    let attempts = 0;  // Closed over — private state

    return {
        attempt: () => {
            attempts++;
            const canRetry = attempts <= maxRetries;
            console.log(`  Attempt ${attempts}/${maxRetries} — ${canRetry ? "✅ Trying..." : "❌ Max reached"}`);
            return canRetry;
        },
        reset: () => { attempts = 0; },
        getAttempts: () => attempts
    };
}

const retry = createRetryTracker(3);
retry.attempt();  // Attempt 1/3 — ✅ Trying...
retry.attempt();  // Attempt 2/3 — ✅ Trying...
retry.attempt();  // Attempt 3/3 — ✅ Trying...
retry.attempt();  // Attempt 4/3 — ❌ Max reached


// ═══════════════════════════════════════
// 5. THE CLASSIC CLOSURE INTERVIEW GOTCHA
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🚨 CLASSIC CLOSURE INTERVIEW QUESTION\n");

// What does this print?
const functions = [];
for (let i = 0; i < 3; i++) {
    functions.push(() => console.log(`  i = ${i}`));
}

// Each function remembers its OWN value of 'i'
// because 'let' creates a new scope for each iteration
functions[0]();  // i = 0
functions[1]();  // i = 1
functions[2]();  // i = 2

console.log("\n  With 'let': each iteration gets its OWN copy of 'i' ✅");

// ⚠️  With 'var', all three would print i = 3!
// Because var is function-scoped, all closures share the SAME 'i'.
// var i = 0 → after loop, i = 3 → all functions see i = 3.
console.log("  With 'var': all would print i = 3 ❌ (shared scope)");
console.log("\n  This is another reason to ALWAYS use 'let', never 'var'.");


// ═══════════════════════════════════════
// INTERVIEW-READY EXPLANATION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🎯 INTERVIEW-READY EXPLANATION\n");

console.log("  \"A closure is when a function remembers the variables from");
console.log("   its outer scope even after that outer function has finished");
console.log("   executing. It's how JavaScript achieves data encapsulation");
console.log("   without classes.\"\n");

console.log("  \"Think of it like this: when createCounter() finishes, the");
console.log("   count variable should be garbage collected. But because the");
console.log("   returned functions still reference it, JavaScript keeps it");
console.log("   alive in memory. Those functions 'closed over' the variable");
console.log("   — hence the name 'closure'.\"\n");

console.log("  \"In Java, you'd use private fields and getters to achieve");
console.log("   the same encapsulation. Closures are JavaScript's elegant");
console.log("   version of that.\"");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 SCOPE & CLOSURES SUMMARY\n");

console.log("  • Scope chain: own scope → parent → grandparent → global");
console.log("  • let/const = block scope {}. var = function scope (avoid!)");
console.log("  • Closure = function remembers parent scope after parent returns");
console.log("  • Closures enable private state (like Java private fields)");
console.log("  • 'let' in loops creates separate closures; 'var' shares one");
console.log("  • Closures are used in Playwright for configs and utilities");

console.log("\n═══════════════════════════════════════\n");
