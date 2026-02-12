/**
 * ============================================
 * 05 - while & do...while Loops
 * ============================================
 * 
 * Day 3: Condition-based repetition
 * Use when you don't know how many
 * iterations you need!
 * 
 * Run: node 05_while_do_while.js
 */

console.log("═══════════════════════════════════════");
console.log("   WHILE & DO...WHILE LOOPS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. WHILE LOOP — Basics
// ═══════════════════════════════════════
console.log("📌 WHILE LOOP — Basics\n");

// Syntax: while (condition) { ... }
// Runs WHILE the condition is true

let count = 0;
while (count < 3) {
    console.log(`  Count: ${count}`);
    count++;
}
console.log(`  Final count: ${count}\n`);

// ⚠️ WARNING: Always ensure the condition will
// eventually become false, or you get an infinite loop!


// ═══════════════════════════════════════
// 2. WHILE — Retry Pattern (Common!)
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n🤖 WHILE — Retry Pattern\n");

let attempts = 0;
let isSuccess = false;

while (!isSuccess && attempts < 5) {
    attempts++;
    console.log(`  Attempt ${attempts}...`);

    // Simulate: success on 3rd try
    if (attempts === 3) {
        isSuccess = true;
        console.log("  ✅ Success!");
    } else {
        console.log("  ❌ Failed, retrying...");
    }
}

if (!isSuccess) {
    console.log("  ❌ Failed after 5 attempts");
}


// ═══════════════════════════════════════
// 3. WHILE — Fetch with Retry (Real-World)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 WHILE — Network Retry with Backoff\n");

// Simulating fetchWithRetry function
function fetchWithRetry(url, maxRetries = 3) {
    let lastError = null;
    let attempt = 0;

    while (attempt < maxRetries) {
        attempt++;

        // Simulate random success/failure
        const succeeded = attempt === 2; // Succeeds on 2nd try

        if (succeeded) {
            console.log(`  ✅ Attempt ${attempt}: Success for ${url}`);
            return { ok: true, status: 200 };
        }

        lastError = `Connection timeout`;
        console.log(`  ❌ Attempt ${attempt} failed: ${lastError}`);

        if (attempt < maxRetries) {
            const delay = 1000 * attempt; // Exponential backoff
            console.log(`     Waiting ${delay}ms before retry...`);
        }
    }

    console.log(`  ❌ Failed after ${maxRetries} attempts: ${lastError}`);
    return { ok: false, error: lastError };
}

fetchWithRetry("/api/users");


// ═══════════════════════════════════════
// 4. DO...WHILE — Execute At Least Once
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 DO...WHILE — Runs At Least Once\n");

// Syntax: do { ... } while (condition);
// Key difference: checks condition AFTER first execution

// The body runs AT LEAST ONCE, even if condition is false
let x = 10;
do {
    console.log(`  x = ${x} (runs even though x >= 5)`);
    x++;
} while (x < 5);
// Output: x = 10 — ran once despite condition being false!

console.log("  Loop ended. do...while guarantees at least 1 execution");


// ═══════════════════════════════════════
// 5. DO...WHILE — Wait for Element
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 DO...WHILE — Wait for Loading to Complete\n");

let isReady = false;
let checks = 0;

do {
    checks++;
    // Simulate: loading completes on check #4
    isReady = checks >= 4;

    if (!isReady) {
        console.log(`  Check ${checks}: Still loading...`);
    } else {
        console.log(`  Check ${checks}: ✅ Loading complete!`);
    }
} while (!isReady && checks < 20);
// Check at least once, max 20 times

if (!isReady) {
    console.log("  ❌ Loading didn't complete in time");
} else {
    console.log(`  Completed after ${checks} checks`);
}


// ═══════════════════════════════════════
// 6. WHILE vs DO...WHILE vs FOR
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 WHEN TO USE WHICH?\n");

console.log("  ┌──────────────┬──────────────────────────────────┐");
console.log("  │ Loop         │ When to Use                      │");
console.log("  ├──────────────┼──────────────────────────────────┤");
console.log("  │ for          │ Known/countable iterations       │");
console.log("  │ for...of     │ Iterating array values           │");
console.log("  │ for...in     │ Iterating object keys            │");
console.log("  │ while        │ Unknown iterations, condition    │");
console.log("  │ do...while   │ Need at least 1 execution       │");
console.log("  └──────────────┴──────────────────────────────────┘");

console.log("\n  Common while patterns:");
console.log("    • Retry failed operations");
console.log("    • Wait for condition to be true");
console.log("    • Process paginated API responses");
console.log("    • Poll for status changes");

console.log("\n═══════════════════════════════════════\n");
