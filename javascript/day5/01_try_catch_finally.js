/**
 * ============================================
 * 01 - Try / Catch / Finally
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * In automation, if your test hits an unexpected
 * error and you haven't handled it, you get a
 * cryptic stack trace that tells you nothing useful.
 * Good error handling = professional framework.
 * 
 * Run: node 01_try_catch_finally.js
 */

console.log("═══════════════════════════════════════");
console.log("   TRY / CATCH / FINALLY");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BASIC TRY/CATCH
// ═══════════════════════════════════════
console.log("📌 BASIC TRY/CATCH\n");

// try   → code that MIGHT fail goes here
// catch → runs ONLY if the try block throws an error
// The 'error' object gives us details about what went wrong

try {
    // Simulate a risky operation — parsing invalid JSON
    const data = JSON.parse("this is not valid json");
    console.log("  Parsed data:", data);  // Never runs — line above throws
} catch (error) {
    // 'error' is the Error object that was thrown
    // .message = human-readable description of what went wrong
    // .name    = the error type (e.g., "SyntaxError")
    console.log("  ✅ Error caught!");
    console.log("  Error name:", error.name);        // "SyntaxError"
    console.log("  Error message:", error.message);   // "Unexpected token..."
}

// The program continues normally after the catch block
console.log("  Program still running after error! 🎉\n");


// ═══════════════════════════════════════
// 2. TRY / CATCH / FINALLY
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 TRY / CATCH / FINALLY\n");

// finally → runs ALWAYS, whether try succeeded or catch ran
// Use for cleanup: closing connections, resetting state, freeing resources

// Example 1: Error occurs → catch runs, then finally runs
console.log("  Scenario 1: Error occurs");
try {
    const result = undefined.toString();  // TypeError!
} catch (error) {
    console.log("    Catch ran:", error.message);
} finally {
    // This runs NO MATTER WHAT
    // Success? → finally runs
    // Error?   → finally runs
    // Return?  → finally STILL runs!
    console.log("    Finally ran: cleanup complete ✅");
}

// Example 2: No error → catch skipped, finally still runs
console.log("\n  Scenario 2: No error");
try {
    const result = 10 + 20;
    console.log("    Try ran successfully:", result);
} catch (error) {
    console.log("    Catch ran:", error.message);  // Never runs
} finally {
    console.log("    Finally ran: cleanup complete ✅");
}


// ═══════════════════════════════════════
// 3. THE 'error' OBJECT PROPERTIES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 THE ERROR OBJECT PROPERTIES\n");

// Every Error object has these properties:
// .name    → type of error (e.g., "TypeError", "ReferenceError")
// .message → description of what went wrong
// .stack   → full stack trace showing WHERE the error happened

try {
    // Calling a method on null triggers a TypeError
    const value = null;
    value.toUpperCase();
} catch (error) {
    console.log("  error.name:   ", error.name);     // "TypeError"
    console.log("  error.message:", error.message);   // "Cannot read properties of null..."

    // .stack includes the error message PLUS the call stack
    // Shows the exact file and line number where the error was thrown
    console.log("  error.stack (first 200 chars):");
    console.log("   ", error.stack.substring(0, 200));
}


// ═══════════════════════════════════════
// 4. THROWING YOUR OWN ERRORS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 THROWING YOUR OWN ERRORS\n");

// Use 'throw' to create errors on purpose
// Useful for: validation, enforcing rules, signaling invalid state

// throw new Error("message") — creates a generic Error
// You can throw any value, but ALWAYS throw Error objects
// because they include the stack trace

function validatePrice(price) {
    // Guard clause — throw if input is invalid
    if (typeof price !== "number") {
        throw new TypeError(`Price must be a number, got ${typeof price}`);
    }
    if (price < 0) {
        throw new RangeError(`Price cannot be negative: ${price}`);
    }
    if (price > 1000000) {
        throw new RangeError(`Price exceeds maximum: ${price}`);
    }
    return `$${price.toFixed(2)}`;
}

// Test valid input
console.log("  Valid price:", validatePrice(250));     // "$250.00"

// Test invalid inputs — each throws a different error type
const testCases = [
    { input: "abc", label: "string input" },
    { input: -50, label: "negative price" },
    { input: 9999999, label: "too high price" }
];

for (const { input, label } of testCases) {
    try {
        validatePrice(input);
    } catch (error) {
        // error.name tells us WHICH type of error
        // error.message tells us WHY it failed
        console.log(`  ${label}: [${error.name}] ${error.message}`);
    }
}


// ═══════════════════════════════════════
// 5. RE-THROWING ERRORS ⭐
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ RE-THROWING ERRORS\n");

// Sometimes you want to:
// 1. Catch an error to log it or take a screenshot
// 2. Then re-throw it so the test STILL fails
// If you catch but DON'T re-throw, the test passes silently — BAD!

function processOrder(orderId) {
    try {
        if (!orderId) {
            throw new Error("Order ID is required");
        }
        console.log(`  Processing order: ${orderId}`);
        // Simulate random failure
        if (Math.random() > 0.5) {
            throw new Error("Payment gateway timeout");
        }
        return { status: "success", orderId };
    } catch (error) {
        // Log the error (or take a screenshot in Playwright)
        console.log(`  ⚠️ Error logged: ${error.message}`);

        // RE-THROW so the calling code knows it failed
        // Without this line, the error is silently swallowed!
        throw error;  // ← CRITICAL: re-throw after handling
    }
}

// The caller handles the re-thrown error
try {
    processOrder(null);  // Will throw "Order ID is required"
} catch (error) {
    console.log(`  Caller caught re-thrown error: ${error.message}`);
}

console.log("\n  ⚠️  Rule: ALWAYS re-throw in tests after logging/screenshot.");
console.log("  ⚠️  Swallowing errors = tests pass when they should fail!\n");


// ═══════════════════════════════════════
// 6. JAVA ↔ JAVASCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 JAVA ↔ JAVASCRIPT ERROR HANDLING\n");

// Java: try { } catch (Exception e) { }
// JS:   try { } catch (error) { }
// → Nearly identical syntax!

// Java: e.getMessage()        → JS: error.message        (property, not method!)
// Java: e.printStackTrace()   → JS: console.error(error.stack)
// Java: throw new Exception() → JS: throw new Error()

// KEY DIFFERENCES:
// Java has CHECKED exceptions (must declare with 'throws')
// JS has NO checked exceptions — all errors are unchecked
// Java has MULTIPLE catch blocks for different types
// JS has ONE catch block — use instanceof to check type

console.log("  ┌──────────────────────────────┬──────────────────────────────┐");
console.log("  │ Java                         │ JavaScript                   │");
console.log("  ├──────────────────────────────┼──────────────────────────────┤");
console.log("  │ catch (Exception e)          │ catch (error)                │");
console.log("  │ e.getMessage()               │ error.message (property!)    │");
console.log("  │ e.printStackTrace()          │ console.error(error.stack)   │");
console.log("  │ throw new Exception()        │ throw new Error()            │");
console.log("  │ Multiple catch blocks        │ Single catch + instanceof    │");
console.log("  │ Checked exceptions exist     │ All errors are unchecked     │");
console.log("  │ finally identical            │ finally identical            │");
console.log("  └──────────────────────────────┴──────────────────────────────┘");


// ═══════════════════════════════════════
// 7. CHECKING ERROR TYPES WITH instanceof
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 CHECKING ERROR TYPES (instanceof)\n");

// Since JS has only ONE catch block, use instanceof to
// determine what kind of error occurred

function riskyDivision(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Both arguments must be numbers");
    }
    if (b === 0) {
        throw new RangeError("Cannot divide by zero");
    }
    return a / b;
}

// Test multiple error types
const divisionTests = [
    { a: 10, b: 2, label: "normal" },
    { a: "x", b: 5, label: "string input" },
    { a: 10, b: 0, label: "divide by zero" }
];

for (const { a, b, label } of divisionTests) {
    try {
        const result = riskyDivision(a, b);
        console.log(`  ${label}: result = ${result}`);
    } catch (error) {
        // Java equivalent: multiple catch blocks
        // JS equivalent: single catch + instanceof checks
        if (error instanceof TypeError) {
            console.log(`  ${label}: TYPE ERROR → ${error.message}`);
        } else if (error instanceof RangeError) {
            console.log(`  ${label}: RANGE ERROR → ${error.message}`);
        } else {
            // Generic fallback — always have this!
            console.log(`  ${label}: UNKNOWN ERROR → ${error.message}`);
        }
    }
}


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TRY/CATCH/FINALLY SUMMARY\n");

console.log("  • try     → code that might fail");
console.log("  • catch   → runs only if try throws an error");
console.log("  • finally → runs ALWAYS (cleanup)");
console.log("  • throw new Error('msg') → create your own errors");
console.log("  • error.message → what went wrong");
console.log("  • error.stack   → where it went wrong");
console.log("  • Re-throw after logging — don't swallow errors!");
console.log("  • Use instanceof to check error type (replaces multi-catch)");

console.log("\n═══════════════════════════════════════\n");
