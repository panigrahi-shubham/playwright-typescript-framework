/**
 * ============================================
 * 06 - Promises — The Foundation
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * Every Playwright command returns a Promise.
 * Understanding promises is the KEY to writing
 * working tests. This file builds the foundation.
 * 
 * Run: node 06_promises_basics.js
 */

console.log("═══════════════════════════════════════");
console.log("   PROMISES — The Foundation");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. WHAT IS ASYNCHRONOUS CODE?
// ═══════════════════════════════════════
console.log("📌 What Is Asynchronous Code?\n");

// SYNCHRONOUS (Java default):
//   Code runs line by line. Line 2 WAITS for Line 1 to finish.
//     driver.findElement(By.id("search")).sendKeys("cotton");  // waits
//     driver.findElement(By.id("btn")).click();                // runs after

// ASYNCHRONOUS (JavaScript for I/O operations):
//   Operations that take time (network, file reads, browser commands)
//   don't block the code. They START and JavaScript moves on.

// Real-world analogy (restaurant style samjho):
//   SYNCHRONOUS:  You order → stand at counter waiting → get food → sit down
//                 Nobody else can order until you're done.
//   ASYNCHRONOUS: You order → get a token number → sit down
//                 Kitchen prepares food. When ready, calls your number.
//                 Meanwhile, others can order too!

console.log("  Synchronous:  Line 1 → wait → Line 2 → wait → Line 3");
console.log("  Asynchronous: Line 1 starts → Line 2 starts → Line 3 starts");
console.log("                Results come back whenever they're ready!\n");

// Demonstrate synchronous code:
console.log("  Synchronous demo:");
console.log("    Step 1: Start");
console.log("    Step 2: Process");
console.log("    Step 3: Done");
console.log("    (All in order — each waits for previous)\n");

// Demonstrate asynchronous behavior:
console.log("  Asynchronous demo:");
console.log("    (setTimeout fires AFTER synchronous code — watch the order!)");

// setTimeout is asynchronous — it doesn't block!
setTimeout(() => {
    console.log("    ⏰ This runs AFTER 0ms timeout (but still after sync code!)");
}, 0);

console.log("    This line runs BEFORE the timeout above! 👆");
console.log("    JavaScript doesn't wait for setTimeout.\n");


// ═══════════════════════════════════════
// 2. WHAT IS A PROMISE?
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 What Is a Promise?\n");

// A Promise is JavaScript's way of saying:
//   "I'll give you the result LATER."
//
// Think of it like ordering food online:
//   - You place the order → Promise created (PENDING)
//   - Food arrives        → Promise FULFILLED (success!)
//   - Order cancelled     → Promise REJECTED (failure!)

// Three states:
//   ⏳ Pending   → Operation still running
//   ✅ Fulfilled → Operation succeeded, here's your data
//   ❌ Rejected  → Operation failed, here's the error

console.log("  Promise States:");
console.log("    ⏳ Pending   → Like 'order placed, cooking...'");
console.log("    ✅ Fulfilled → Like 'food delivered!'");
console.log("    ❌ Rejected  → Like 'sorry, item unavailable'");


// ═══════════════════════════════════════
// 3. CREATING A PROMISE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Creating a Promise\n");

// new Promise((resolve, reject) => { ... })
//   resolve(value) → marks promise as FULFILLED with this value
//   reject(error)  → marks promise as REJECTED with this error

// Simulate an API call that takes 1 second
function fetchProduct(id) {
    return new Promise((resolve, reject) => {
        // Simulate async work (like an API call)
        setTimeout(() => {
            if (id > 0) {
                // SUCCESS → call resolve with the data
                resolve({ id, name: "Cotton Shirt", price: 250 });
            } else {
                // FAILURE → call reject with an error
                reject(new Error("Invalid product ID"));
            }
        }, 100);  // 100ms delay to simulate network
    });
}

console.log("  Created fetchProduct() — returns a Promise");
console.log("  (The actual results will appear at the end of this file)\n");


// ═══════════════════════════════════════
// 4. USING PROMISES — .then() / .catch()
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 Using Promises — .then() / .catch()\n");

// The OLD way to handle promises (before async/await):
//   promise.then(successCallback).catch(errorCallback)

// .then() runs when the promise FULFILLS (succeeds)
// .catch() runs when the promise REJECTS (fails)

// Success case:
console.log("  Calling fetchProduct(1) — success case:");
fetchProduct(1)
    .then(product => {
        console.log("    .then() ran — Success!");
        console.log("    Product:", product);
    })
    .catch(error => {
        console.log("    .catch() ran — Error:", error.message);
    });

// Failure case:
console.log("  Calling fetchProduct(-1) — failure case:");
fetchProduct(-1)
    .then(product => {
        console.log("    .then() ran:", product);  // Won't run
    })
    .catch(error => {
        console.log("    .catch() ran — Error:", error.message);
    });


// ═══════════════════════════════════════
// 5. CHAINING .then() CALLS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Chaining .then() Calls\n");

// You can chain .then() calls — each one receives the return value
// of the previous .then()

function getUserName(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Alice"), 50);
    });
}

function getOrdersForUser(userName) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([
            { id: 1, item: "Cotton", amount: 5000 },
            { id: 2, item: "Silk", amount: 12000 }
        ]), 50);
    });
}

console.log("  Chained promise calls:");
getUserName(42)
    .then(name => {
        console.log("    Step 1 — Got user:", name);
        return getOrdersForUser(name);  // Return another promise
    })
    .then(orders => {
        console.log("    Step 2 — Got orders:", orders.length, "orders");
        // Calculate total
        const total = orders.reduce((sum, o) => sum + o.amount, 0);
        return total;
    })
    .then(total => {
        console.log("    Step 3 — Total:", `₹${total}`);
    })
    .catch(error => {
        console.log("    Error anywhere in chain:", error.message);
    });

// This chain reads like:
//   Get user → then get their orders → then calculate total
//
// BUT it's messy with complex logic. That's why async/await exists!
// (Next file: 07_async_await.js)


// ═══════════════════════════════════════
// 6. Promise.resolve() & Promise.reject()
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Promise.resolve() & Promise.reject()\n");

// Shortcuts to create already-resolved or already-rejected promises
// Useful for testing and mocking

// Already resolved — .then() runs immediately
const resolved = Promise.resolve("instant data");
resolved.then(data => console.log("  Resolved:", data));

// Already rejected — .catch() runs immediately
const rejected = Promise.reject(new Error("instant error"));
rejected.catch(error => console.log("  Rejected:", error.message));


// ═══════════════════════════════════════
// 7. WHY PLAYWRIGHT NEEDS PROMISES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Why Playwright Needs Promises\n");

// Every Playwright command is asynchronous because:
//   - page.goto() → sends HTTP request, waits for response
//   - page.click() → sends click command to browser, waits for action
//   - page.fill() → types text, waits for input
//   - page.locator().textContent() → reads DOM, waits for element
//
// All of these TAKE TIME. Without promises, your code would
// try to click before the page even loads!

console.log("  Every Playwright command returns a Promise:");
console.log("    page.goto(url)                → Promise<void>");
console.log("    page.click(selector)          → Promise<void>");
console.log("    page.fill(selector, text)     → Promise<void>");
console.log("    page.locator(sel).textContent()→ Promise<string>");
console.log("    page.title()                  → Promise<string>");

console.log("\n  Without 'await', you get Promise objects, not values!");
console.log("  With 'await', you get actual values — next file! →");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
// Using setTimeout to let all async output print first
setTimeout(() => {
    console.log("\n" + "─".repeat(45));
    console.log("\n📋 PROMISES SUMMARY\n");

    console.log("  • Synchronous:   each line waits for the previous");
    console.log("  • Asynchronous:  operations start and finish later");
    console.log("  • Promise:       'I'll give you the result later'");
    console.log("  • States:        pending → fulfilled OR rejected");
    console.log("  • .then(fn):     runs when promise succeeds");
    console.log("  • .catch(fn):    runs when promise fails");
    console.log("  • Chaining:      .then().then().catch()");
    console.log("  • Playwright:    every command returns a Promise");

    console.log("\n  💡 .then()/.catch() works but gets messy.");
    console.log("     async/await is the CLEAN way → next file!");

    console.log("\n═══════════════════════════════════════\n");
}, 500);
