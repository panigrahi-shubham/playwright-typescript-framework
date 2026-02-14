/**
 * ============================================
 * 07 - Async / Await
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * THIS IS THE MOST IMPORTANT FILE IN DAY 7.
 * Every Playwright command uses await.
 * If you don't understand this, you CANNOT
 * write a single working test.
 * 
 * Run: node 07_async_await.js
 */

console.log("═══════════════════════════════════════");
console.log("   ASYNC / AWAIT ⭐⭐⭐");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// Helper function — simulates async operations
// ═══════════════════════════════════════

// This simulates what Playwright does — operations that take time
// In real tests, page.goto(), page.click() etc. work like this
function simulateAsync(value, delayMs = 100) {
    return new Promise(resolve => setTimeout(() => resolve(value), delayMs));
}

function simulateFailure(message, delayMs = 100) {
    return new Promise((_, reject) =>
        setTimeout(() => reject(new Error(message)), delayMs));
}


// ═══════════════════════════════════════
// 1. THE PROBLEM WITHOUT ASYNC/AWAIT
// ═══════════════════════════════════════
console.log("📌 The Problem WITHOUT Async/Await\n");

// ❌ WITHOUT await — THIS IS WHAT BREAKS:
// function searchProduct() {
//     page.goto('https://site.com/search');     // starts navigation...
//     page.fill('#search-box', 'cotton');        // tries to fill BEFORE page loads!
//     page.click('#search-btn');                 // tries to click BEFORE fill completes!
//     const count = page.locator('.result').count(); // tries to count BEFORE results load!
//     console.log(count); // Prints a Promise object, not a number!
// }

// JavaScript says "start goto" and immediately jumps to the next line
// without waiting. Total chaos.

console.log("  ❌ Without await:");
console.log("    page.goto(url)    → starts, doesn't wait");
console.log("    page.fill(...)    → runs BEFORE goto finishes!");
console.log("    page.click(...)   → runs BEFORE fill finishes!");
console.log("    Result: chaos, flaky tests, crashes\n");


// ═══════════════════════════════════════
// 2. async/await — THE CLEAN SOLUTION
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 async/await — The Clean Solution\n");

// RULES:
// 1. A function MUST be declared 'async' to use 'await' inside it
// 2. 'await' PAUSES execution inside that function until the Promise resolves
// 3. 'await' does NOT block the entire program — other code can still run
// 4. If you forget 'await', you get a Promise object instead of the value

// ✅ WITH async/await — WORKS PERFECTLY:
async function searchDemo() {
    console.log("  ✅ With async/await:");

    // Each line WAITS for the previous one to finish
    const nav = await simulateAsync("page loaded", 50);
    console.log(`    Step 1: ${nav}`);

    const typed = await simulateAsync("typed 'cotton'", 50);
    console.log(`    Step 2: ${typed}`);

    const clicked = await simulateAsync("search clicked", 50);
    console.log(`    Step 3: ${clicked}`);

    const results = await simulateAsync(["Product A", "Product B", "Product C"], 50);
    console.log(`    Step 4: Found ${results.length} results`);

    // Now we have ACTUAL values, not Promise objects!
    return results;
}

// Call the async function
searchDemo().then(() => {
    console.log("    All steps completed in order! ✅\n");
});


// ═══════════════════════════════════════
// 3. THE BIGGEST MISTAKE: Forgetting await
// ═══════════════════════════════════════

// We need to chain everything because of async
async function runAllExamples() {

    // Wait for previous example to finish
    await new Promise(resolve => setTimeout(resolve, 300));

    console.log("─".repeat(45));
    console.log("\n⚠️ The Biggest Mistake: Forgetting 'await'\n");

    // ❌ WITHOUT await — you get a Promise object, not the value!
    const withoutAwait = simulateAsync("Hello World", 10);
    console.log("  ❌ Without await:", withoutAwait);   // Promise { <pending> }

    // ✅ WITH await — you get the actual value!
    const withAwait = await simulateAsync("Hello World", 10);
    console.log("  ✅ With await:   ", withAwait);      // "Hello World"

    console.log("\n  How to spot this bug:");
    console.log("    If you see 'Promise { <pending> }' in logs → forgot await!");
    console.log("    If you see '[object Promise]' → forgot await!");
    console.log("    If you get 'undefined' where you expected a value → forgot await!");


    // ═══════════════════════════════════════
    // 4. SEQUENTIAL vs PARALLEL
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n📌 Sequential vs Parallel Execution\n");

    // SEQUENTIAL — one after another (when ORDER matters)
    console.log("  Sequential (one by one):");
    const startSeq = Date.now();
    const step1 = await simulateAsync("A", 100);
    const step2 = await simulateAsync("B", 100);
    const step3 = await simulateAsync("C", 100);
    const seqTime = Date.now() - startSeq;
    console.log(`    Results: ${step1}, ${step2}, ${step3}`);
    console.log(`    Time: ~${seqTime}ms (each waited for previous)\n`);

    // PARALLEL — all at once (when order DOESN'T matter)
    // Promise.all() runs ALL promises simultaneously and waits for ALL to finish
    console.log("  Parallel (all at once):");
    const startPar = Date.now();
    const [r1, r2, r3] = await Promise.all([
        simulateAsync("X", 100),
        simulateAsync("Y", 100),
        simulateAsync("Z", 100)
    ]);
    const parTime = Date.now() - startPar;
    console.log(`    Results: ${r1}, ${r2}, ${r3}`);
    console.log(`    Time: ~${parTime}ms (all ran simultaneously!)\n`);

    console.log("  📊 Sequential: ~300ms vs Parallel: ~100ms");
    console.log("  ⚡ Parallel is 3x faster when order doesn't matter!");

    // Java comparison:
    console.log("\n  Java equivalent:");
    console.log("    Sequential → normal code");
    console.log("    Parallel   → CompletableFuture.allOf()");


    // ═══════════════════════════════════════
    // 5. Promise.race() — First One Wins
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n📌 Promise.race() — First One Wins\n");

    // Promise.race() returns the result of whichever promise finishes FIRST
    // Useful for: "wait for either success OR error message"

    const winner = await Promise.race([
        simulateAsync("🐢 Slow response", 200),
        simulateAsync("🐇 Fast response", 50),
        simulateAsync("🐌 Slowest response", 300)
    ]);

    console.log("  Winner:", winner);  // "🐇 Fast response"

    // Playwright use case:
    console.log("\n  Playwright use case:");
    console.log("    // Wait for EITHER success OR error message");
    console.log("    const result = await Promise.race([");
    console.log("      page.waitForSelector('.success-message'),");
    console.log("      page.waitForSelector('.error-message')");
    console.log("    ]);");


    // ═══════════════════════════════════════
    // 6. ERROR HANDLING — try/catch with async
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n📌 Error Handling — try/catch with async\n");

    // try/catch works EXACTLY the same with async/await!
    // Same as Java's try/catch — syntax nearly identical.

    async function riskyOperation() {
        try {
            console.log("    Attempting risky operation...");
            const result = await simulateFailure("Network timeout!", 50);
            console.log("    Result:", result);  // Never runs
        } catch (error) {
            // Catches the rejected promise's error
            console.log("    ❌ Caught error:", error.message);
        }
    }

    await riskyOperation();

    // Playwright example:
    console.log("\n  Playwright error handling:");
    console.log("    try {");
    console.log("      await page.goto('https://site.com/product/99999');");
    console.log("      await page.waitForSelector('.title', { timeout: 5000 });");
    console.log("    } catch (error) {");
    console.log("      const text = await page.locator('.error').textContent();");
    console.log("      expect(text).toContain('not found');");
    console.log("    }");


    // ═══════════════════════════════════════
    // 7. THE FORBIDDEN forEach ⚠️⚠️⚠️
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n⚠️⚠️⚠️ The Forbidden forEach\n");

    // THIS IS AN INTERVIEW TOPIC AND A REAL BUG!
    // forEach does NOT wait for async callbacks!

    console.log("  ❌ WRONG — forEach with async:");
    console.log("    items.forEach(async (item) => {");
    console.log("      await processItem(item);  // These all fire at once!");
    console.log("    });");
    console.log("    console.log('Done!'); // Runs BEFORE any item is processed!\n");

    // Let's prove it:
    const items = ["A", "B", "C"];

    console.log("  Proof — forEach fires all at once:");
    items.forEach(async (item) => {
        const result = await simulateAsync(`Processed ${item}`, 50);
        // These will print AFTER "forEach done!" below
    });
    console.log("    'forEach done!' prints IMMEDIATELY (before any processing)");

    // Wait a bit to let forEach's async callbacks finish
    await new Promise(resolve => setTimeout(resolve, 200));

    // ✅ CORRECT WAY 1: for...of (sequential)
    console.log("\n  ✅ CORRECT — for...of (sequential, one by one):");
    for (const item of items) {
        const result = await simulateAsync(`Processed ${item}`, 30);
        console.log(`    ${result}`);
    }
    console.log("    for...of done! (after ALL items processed) ✅");

    // ✅ CORRECT WAY 2: Promise.all + map (parallel)
    console.log("\n  ✅ CORRECT — Promise.all + map (parallel, all at once):");
    const results = await Promise.all(
        items.map(async (item) => {
            return await simulateAsync(`Processed ${item}`, 30);
        })
    );
    console.log(`    Results: ${results.join(", ")}`);
    console.log("    Promise.all done! (after ALL items processed) ✅");

    console.log("\n  📌 RULES:");
    console.log("    Sequential (order matters)  → for...of + await");
    console.log("    Parallel (speed matters)    → Promise.all + .map()");
    console.log("    NEVER                       → forEach + async  ❌");


    // ═══════════════════════════════════════
    // 8. FULL PLAYWRIGHT TEST PREVIEW ⭐⭐⭐
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n⭐⭐⭐ Full Playwright Test Preview\n");

    // THIS is what your actual tests will look like.
    // Notice how EVERY concept from Day 7 appears!

    console.log("  // Destructuring (objects)");
    console.log("  const { test, expect } = require('@playwright/test');");
    console.log();
    console.log("  // Class (for POM)");
    console.log("  class SearchPage {");
    console.log("    constructor(page) {");
    console.log("      this.page = page;");
    console.log("      this.searchInput = '#search-box';");
    console.log("    }");
    console.log("    async search(query) {");
    console.log("      await this.page.fill(this.searchInput, query);");
    console.log("      await this.page.click('#search-btn');");
    console.log("    }");
    console.log("    async getResults() {");
    console.log("      return await this.page.locator('.result').allTextContents();");
    console.log("    }");
    console.log("  }");
    console.log();
    console.log("  // Test using async/await");
    console.log("  test('search products', async ({ page }) => {");
    console.log("    const searchPage = new SearchPage(page);");
    console.log("    await searchPage.search('cotton');");
    console.log("    const results = await searchPage.getResults();");
    console.log("    expect(results.length).toBeGreaterThan(0);");
    console.log("  });");

    console.log("\n  💡 Everything from Days 2-7 is in that one test:");
    console.log("     variables, strings, arrays, objects, classes,");
    console.log("     destructuring, async/await, arrow functions.");


    // ═══════════════════════════════════════
    // 9. JAVA ↔ JS ASYNC COMPARISON
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n📌 Java ↔ JavaScript Async Comparison\n");

    console.log("  ┌──────────────────────────────┬──────────────────────────────┐");
    console.log("  │ Java                         │ JavaScript                   │");
    console.log("  ├──────────────────────────────┼──────────────────────────────┤");
    console.log("  │ Synchronous by default       │ I/O returns Promises         │");
    console.log("  │ CompletableFuture<T>         │ Promise<T>                   │");
    console.log("  │ .get() blocks the thread     │ await pauses the function    │");
    console.log("  │ Thread, ExecutorService       │ Event loop (single thread)   │");
    console.log("  │ No equivalent                │ async/await keywords         │");
    console.log("  │ CompletableFuture.allOf()    │ Promise.all()                │");
    console.log("  │ try/catch (same!)            │ try/catch (same!)            │");
    console.log("  └──────────────────────────────┴──────────────────────────────┘");


    // ═══════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n📋 ASYNC/AWAIT SUMMARY\n");

    console.log("  ┌──────────────────────────┬─────────────────────────────────┐");
    console.log("  │ Concept                  │ Key Point                       │");
    console.log("  ├──────────────────────────┼─────────────────────────────────┤");
    console.log("  │ async function            │ Declares function uses await    │");
    console.log("  │ await expression          │ Pauses until Promise resolves   │");
    console.log("  │ Forget await             │ Get Promise object, not value   │");
    console.log("  │ Sequential               │ for...of + await               │");
    console.log("  │ Parallel                 │ Promise.all + .map()           │");
    console.log("  │ Racing                   │ Promise.race — first wins      │");
    console.log("  │ Error handling           │ try/catch (same as Java!)      │");
    console.log("  │ forEach + async          │ NEVER — it doesn't await       │");
    console.log("  └──────────────────────────┴─────────────────────────────────┘");

    console.log("\n  🎯 Every Playwright test function is async.");
    console.log("     Every Playwright command needs await.");
    console.log("     This is non-negotiable — no await = broken tests.");

    console.log("\n═══════════════════════════════════════\n");
}

// Run all the async examples
runAllExamples();
