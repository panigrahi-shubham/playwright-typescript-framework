/**
 * ============================================
 * 08 - Practical Patterns
 * ============================================
 * 
 * Day 3: Combining conditionals, loops, and
 * array methods — patterns you'll actually use!
 * 
 * Run: node 08_practical_patterns.js
 */

console.log("═══════════════════════════════════════");
console.log("   PRACTICAL PATTERNS — Day 3 Combo");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. INPUT VALIDATION with Guard Clauses
// ═══════════════════════════════════════
console.log("📌 PATTERN 1: Input Validation\n");

// ❌ Deeply nested — hard to read
function validateUserNested(user) {
    if (user) {
        if (user.name) {
            if (user.age > 0) {
                return `✅ Valid user: ${user.name}, age ${user.age}`;
            } else {
                return "❌ Invalid age";
            }
        } else {
            return "❌ Missing name";
        }
    } else {
        return "❌ No user provided";
    }
}

// ✅ Flat with early returns — much cleaner!
function validateUser(user) {
    if (!user) return "❌ No user provided";
    if (!user.name) return "❌ Missing name";
    if (user.age <= 0) return "❌ Invalid age";

    return `✅ Valid user: ${user.name}, age ${user.age}`;
}

// Test with different inputs
const testUsers = [
    null,
    { name: "", age: 25 },
    { name: "Alice", age: -1 },
    { name: "Bob", age: 30 }
];

for (const user of testUsers) {
    const label = user ? JSON.stringify(user) : "null";
    console.log(`  ${label}`);
    console.log(`    → ${validateUser(user)}\n`);
}


// ═══════════════════════════════════════
// 2. CATEGORIZE & COUNT with Loops
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 PATTERN 2: Categorize & Count\n");

const students = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 72 },
    { name: "Charlie", score: 88 },
    { name: "Diana", score: 45 },
    { name: "Eve", score: 63 },
    { name: "Frank", score: 91 }
];

// Count per grade category using a loop + switch
let gradeA = 0, gradeB = 0, gradeC = 0, gradeD = 0, gradeF = 0;

for (const student of students) {
    let grade;

    if (student.score >= 90) {
        grade = "A";
        gradeA++;
    } else if (student.score >= 80) {
        grade = "B";
        gradeB++;
    } else if (student.score >= 70) {
        grade = "C";
        gradeC++;
    } else if (student.score >= 60) {
        grade = "D";
        gradeD++;
    } else {
        grade = "F";
        gradeF++;
    }

    console.log(`  ${student.name}: ${student.score} → Grade ${grade}`);
}

console.log("\n  Grade Distribution:");
console.log(`    A: ${gradeA} | B: ${gradeB} | C: ${gradeC} | D: ${gradeD} | F: ${gradeF}`);


// ═══════════════════════════════════════
// 3. SEARCH & FIND with break
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 3: Search & Find\n");

const inventory = [
    { id: 101, item: "Laptop", qty: 0 },
    { id: 102, item: "Mouse", qty: 15 },
    { id: 103, item: "Keyboard", qty: 8 },
    { id: 104, item: "Monitor", qty: 0 },
    { id: 105, item: "Webcam", qty: 3 }
];

// Pattern A: Find first out-of-stock item using a for loop + break
console.log("  Finding first out-of-stock item:");
let outOfStock = null;

for (const product of inventory) {
    if (product.qty === 0) {
        outOfStock = product;
        break;
    }
}

if (outOfStock) {
    console.log(`    ⚠️ ${outOfStock.item} (ID: ${outOfStock.id}) is out of stock!`);
} else {
    console.log("    ✅ Everything is in stock");
}

// Pattern B: Same thing using .find() — cleaner!
const outOfStock2 = inventory.find(p => p.qty === 0);
console.log(`\n  Using .find(): ${outOfStock2 ? outOfStock2.item : "all in stock"}`);

// Pattern C: Get ALL out-of-stock items using .filter()
const allOutOfStock = inventory.filter(p => p.qty === 0);
console.log(`  Using .filter(): ${allOutOfStock.map(p => p.item).join(", ")}`);

// Pattern D: Check if ANYTHING is out of stock using .some()
const hasOutOfStock = inventory.some(p => p.qty === 0);
console.log(`  Using .some() — any out of stock? ${hasOutOfStock}`);

// Pattern E: Check if EVERYTHING is in stock using .every()
const allInStock = inventory.every(p => p.qty > 0);
console.log(`  Using .every() — all in stock? ${allInStock}`);


// ═══════════════════════════════════════
// 4. FILTER + TRANSFORM Data Pipeline
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 4: Filter + Transform Pipeline\n");

const orders = [
    { customer: "Alice", amount: 1200, status: "completed" },
    { customer: "Bob", amount: 450, status: "cancelled" },
    { customer: "Charlie", amount: 3200, status: "completed" },
    { customer: "Diana", amount: 800, status: "completed" },
    { customer: "Eve", amount: 150, status: "cancelled" },
    { customer: "Frank", amount: 5600, status: "completed" }
];

// Step 1: Filter only completed orders
const completedOrders = orders.filter(o => o.status === "completed");
console.log(`  Completed orders: ${completedOrders.length} of ${orders.length}`);

// Step 2: Get customer names from completed orders
const completedCustomers = completedOrders.map(o => o.customer);
console.log(`  Customers: ${completedCustomers.join(", ")}`);

// Step 3: Calculate total revenue from completed orders
let totalRevenue = 0;
for (const order of completedOrders) {
    totalRevenue += order.amount;
}
console.log(`  Total revenue: ₹${totalRevenue}`);

// Step 4: Find the biggest order
let biggestOrder = completedOrders[0];
for (const order of completedOrders) {
    if (order.amount > biggestOrder.amount) {
        biggestOrder = order;
    }
}
console.log(`  Biggest order: ${biggestOrder.customer} (₹${biggestOrder.amount})`);

// Step 5: Cancelled order summary
const cancelledTotal = orders
    .filter(o => o.status === "cancelled")
    .map(o => o.amount);

let cancelledSum = 0;
for (const amount of cancelledTotal) {
    cancelledSum += amount;
}
console.log(`  Cancelled: ${cancelledTotal.length} orders, ₹${cancelledSum} lost`);


// ═══════════════════════════════════════
// 5. BUILD A REPORT — Loop + Conditionals
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 5: Build a Test Report\n");

const testResults = [
    { name: "login_basic", time: 1200, status: "passed" },
    { name: "login_invalid", time: 800, status: "passed" },
    { name: "payment_card", time: 3400, status: "failed" },
    { name: "payment_upi", time: 2100, status: "passed" },
    { name: "search_text", time: 560, status: "passed" },
    { name: "checkout", time: 8990, status: "failed" }
];

// Build report using loops and conditionals
let totalTests = 0;
let passed = 0;
let failed = 0;
let totalTime = 0;
let slowestTest = "";
let slowestTime = 0;
const failedNames = [];

for (const test of testResults) {
    totalTests++;
    totalTime += test.time;

    if (test.status === "passed") {
        passed++;
    } else {
        failed++;
        failedNames.push(test.name);
    }

    if (test.time > slowestTime) {
        slowestTime = test.time;
        slowestTest = test.name;
    }
}

console.log("  ┌─────────────────────────────────────┐");
console.log("  │          TEST REPORT                 │");
console.log("  ├─────────────────────────────────────┤");
console.log(`  │  Total:    ${String(totalTests).padEnd(25)}│`);
console.log(`  │  Passed:   ${String(passed).padEnd(25)}│`);
console.log(`  │  Failed:   ${String(failed).padEnd(25)}│`);
console.log(`  │  Time:     ${String(totalTime + "ms").padEnd(25)}│`);
console.log(`  │  Slowest:  ${String(slowestTest).padEnd(25)}│`);
console.log(`  │  Failures: ${String(failedNames.join(", ")).padEnd(25)}│`);
console.log("  └─────────────────────────────────────┘");

// Quick pass/fail verdict
if (failed === 0) {
    console.log("\n  🎉 ALL TESTS PASSED!");
} else {
    console.log(`\n  ⚠️ ${failed} test(s) failed — needs attention`);
}


// ═══════════════════════════════════════
// 6. MENU SYSTEM with switch + while
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 6: Menu / Command Router\n");

// Simulated user commands
const commands = ["help", "list", "add", "delete", "unknown", "exit"];

for (const command of commands) {
    let response;

    switch (command) {
        case "help":
            response = "📖 Available: help, list, add, delete, exit";
            break;
        case "list":
            response = "📋 Showing all items...";
            break;
        case "add":
            response = "➕ Adding new item...";
            break;
        case "delete":
            response = "🗑️ Deleting item...";
            break;
        case "exit":
            response = "👋 Goodbye!";
            break;
        default:
            response = `❓ Unknown command: "${command}"`;
    }

    console.log(`  > ${command} → ${response}`);

    if (command === "exit") {
        console.log("  (Exiting command loop)");
        break;  // Stop processing more commands
    }
}


// ═══════════════════════════════════════
// 7. RETRY PATTERN with while + counter
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 7: Simple Retry Logic\n");

// Simulate a flaky operation (succeeds on attempt 3)
const maxRetries = 5;
let attempt = 0;
let success = false;

while (attempt < maxRetries && !success) {
    attempt++;

    // Simulate: fails on attempt 1 & 2, passes on 3
    if (attempt >= 3) {
        success = true;
        console.log(`  Attempt ${attempt}: ✅ Success!`);
    } else {
        console.log(`  Attempt ${attempt}: ❌ Failed, retrying...`);
    }
}

if (success) {
    console.log(`  🎉 Operation succeeded after ${attempt} attempts`);
} else {
    console.log(`  💥 Operation failed after ${maxRetries} attempts`);
}


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 PATTERNS SUMMARY\n");

console.log("  ┌─────────────────────┬──────────────────────────────────┐");
console.log("  │ Pattern             │ Concepts Used                    │");
console.log("  ├─────────────────────┼──────────────────────────────────┤");
console.log("  │ Input Validation    │ if/else, early return            │");
console.log("  │ Categorize & Count  │ for...of, if/else if             │");
console.log("  │ Search & Find       │ for + break, find, filter, some  │");
console.log("  │ Data Pipeline       │ filter, map, for...of            │");
console.log("  │ Build Report        │ for...of, if/else, counters      │");
console.log("  │ Menu Router         │ switch, for...of, break          │");
console.log("  │ Retry Logic         │ while, counter, boolean flag     │");
console.log("  └─────────────────────┴──────────────────────────────────┘");

console.log("\n  💡 These patterns combine everything from Day 3:");
console.log("     conditionals + loops + array methods = real code!");

console.log("\n═══════════════════════════════════════\n");
