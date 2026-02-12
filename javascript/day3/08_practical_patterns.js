/**
 * ============================================
 * 08 - Practical Patterns
 * ============================================
 * 
 * Day 3: Real-world patterns combining
 * conditionals and loops for test automation
 * 
 * Run: node 08_practical_patterns.js
 */

console.log("═══════════════════════════════════════");
console.log("   PRACTICAL PATTERNS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. EARLY RETURN (Guard Clauses)
// ═══════════════════════════════════════
console.log("📌 PATTERN 1: Early Return (Guard Clauses)\n");

// ❌ Nested ifs — Hard to read
function processOrderBad(order) {
    if (order) {
        if (order.isValid) {
            if (order.items.length > 0) {
                return `Processing ${order.items.length} items`;
            } else {
                return "No items";
            }
        } else {
            return "Invalid order";
        }
    } else {
        return "No order";
    }
}

// ✅ Early returns — Flat, clean, readable
function processOrder(order) {
    if (!order) return "No order";
    if (!order.isValid) return "Invalid order";
    if (order.items.length === 0) return "No items";

    // Happy path — process the order
    return `✅ Processing ${order.items.length} items`;
}

// Test both approaches
const testOrders = [
    null,
    { isValid: false, items: [] },
    { isValid: true, items: [] },
    { isValid: true, items: ["item1", "item2"] }
];

console.log("  Testing processOrder:");
testOrders.forEach((order, i) => {
    console.log(`    Test ${i + 1}: ${processOrder(order)}`);
});


// ═══════════════════════════════════════
// 2. RETRY WITH EXPONENTIAL BACKOFF
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 2: Retry with Exponential Backoff\n");

function waitForCondition(checkFn, options = {}) {
    const {
        maxAttempts = 10,
        baseDelay = 100,
        maxDelay = 5000
    } = options;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const result = checkFn(attempt);

        if (result) {
            console.log(`    ✅ Success on attempt ${attempt}!`);
            return true;
        }

        // Calculate delay: 100ms, 200ms, 400ms, 800ms... capped at 5s
        const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
        console.log(`    Attempt ${attempt} failed, would wait ${delay}ms...`);
    }

    console.log(`    ❌ Max attempts reached`);
    return false;
}

console.log("  Scenario: Element loads on attempt 4");
waitForCondition(
    (attempt) => attempt >= 4,  // Simulates element appearing on attempt 4
    { maxAttempts: 6, baseDelay: 100 }
);


// ═══════════════════════════════════════
// 3. PARALLEL vs SEQUENTIAL EXECUTION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 3: Parallel vs Sequential\n");

const productIds = ["P1", "P2", "P3", "P4", "P5"];

// ❌ Sequential (slow) — one at a time
// for (const id of productIds) {
//     await validateProduct(id);  // Wait for EACH to complete
// }
// Total time = sum of all validations
console.log("  ❌ Sequential: Process one by one (slow)");
console.log("     Total time = sum of all durations\n");

// ✅ Parallel (fast) — all at once
// await Promise.all(productIds.map(id => validateProduct(id)));
// Total time = longest validation only
console.log("  ✅ Parallel: Process all at once (fast)");
console.log("     Total time = longest single duration\n");

// ⚠️ Batching — balance speed and rate limits
console.log("  ⚖️ Batching: Best of both worlds");
const batchSize = 2;
for (let i = 0; i < productIds.length; i += batchSize) {
    const batch = productIds.slice(i, i + batchSize);
    console.log(`     Batch: [${batch.join(", ")}]`);
    // await Promise.all(batch.map(id => validateProduct(id)));
    // await delay(1000); // Small delay between batches
}


// ═══════════════════════════════════════
// 4. PROCESS PAGINATED API
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 4: Process Paginated API\n");

// Simulate paginated API responses
function simulateApiPage(page) {
    const maxPages = 3;
    return {
        data: [`item_${page}a`, `item_${page}b`],
        hasMore: page < maxPages
    };
}

function fetchAllPages(baseUrl) {
    const allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        console.log(`    Fetching page ${page}...`);

        const result = simulateApiPage(page);
        allData.push(...result.data);

        hasMore = result.hasMore;
        page++;

        // Safety limit
        if (page > 100) {
            console.log("    ⚠️ Reached max page limit");
            break;
        }
    }

    return allData;
}

const allItems = fetchAllPages("/api/products");
console.log(`  Total items fetched: ${allItems.length}`);
console.log(`  Items: [${allItems.join(", ")}]`);


// ═══════════════════════════════════════
// 5. ACCUMULATE AND REPORT
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 PATTERN 5: Test Report Accumulator\n");

const testResults = [
    { name: "login_basic", duration: 1200, status: "passed" },
    { name: "login_invalid", duration: 800, status: "passed" },
    { name: "payment_card", duration: 3400, status: "failed" },
    { name: "payment_upi", duration: 2100, status: "passed" },
    { name: "search_text", duration: 560, status: "passed" },
    { name: "checkout", duration: 8990, status: "failed" }
];

// Build report using reduce
const report = testResults.reduce((acc, test) => {
    acc.total++;
    acc.totalTime += test.duration;

    if (test.status === "passed") {
        acc.passed++;
    } else {
        acc.failed++;
        acc.failures.push(test.name);
    }

    if (test.duration > acc.slowest.duration) {
        acc.slowest = { name: test.name, duration: test.duration };
    }

    return acc;
}, { total: 0, passed: 0, failed: 0, totalTime: 0, failures: [], slowest: { name: "", duration: 0 } });

console.log("  ┌─────────────────────────────────────┐");
console.log("  │          TEST REPORT                 │");
console.log("  ├─────────────────────────────────────┤");
console.log(`  │  Total:    ${String(report.total).padEnd(25)}│`);
console.log(`  │  Passed:   ${String(report.passed).padEnd(25)}│`);
console.log(`  │  Failed:   ${String(report.failed).padEnd(25)}│`);
console.log(`  │  Time:     ${String(report.totalTime + "ms").padEnd(25)}│`);
console.log(`  │  Slowest:  ${String(report.slowest.name).padEnd(25)}│`);
console.log(`  │  Failures: ${String(report.failures.join(", ")).padEnd(25)}│`);
console.log("  └─────────────────────────────────────┘");


console.log("\n═══════════════════════════════════════\n");
