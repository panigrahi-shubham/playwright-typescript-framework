/**
 * ============================================
 * 02 - Loops + Async/Await: Critical Patterns
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * The #1 area where developers make mistakes:
 * combining loops with async/await. Get this
 * wrong and your tests silently pass when they
 * should fail, or run in wrong order.
 * 
 * Run: node 02_async_loop_patterns.js
 */

console.log("═══════════════════════════════════════");
console.log("   LOOPS + ASYNC/AWAIT — CRITICAL");
console.log("═══════════════════════════════════════\n");


// Helper: simulate async operations with delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchProduct(id) {
    await delay(50);  // Simulate network latency
    return { id, name: `Product ${id}`, price: id * 100 };
}


// ═══════════════════════════════════════
// 1. SEQUENTIAL PROCESSING (for...of + await)
// ═══════════════════════════════════════
console.log("📌 1. SEQUENTIAL — for...of with await\n");

// Use when: each iteration depends on the previous one
// Example: clicking links, navigating pages, sequential API calls

// ✅ CORRECT — processes one at a time, in order
async function processSequential() {
    const ids = [101, 102, 103];

    for (const id of ids) {
        // Each await completes BEFORE the next one starts
        const product = await fetchProduct(id);
        console.log(`  Fetched: ${product.name} ($${product.price})`);
    }
    console.log("  → All done sequentially ✅");
}

await processSequential();

// Playwright equivalent:
// const links = await page.locator('.product-link').all();
// for (const link of links) {
//     await link.click();              // Click one link
//     await page.waitForLoadState();   // Wait for page to load
//     // ... verify page content ...
//     await page.goBack();             // Go back to list
// }


// ═══════════════════════════════════════
// 2. ❌ forEach WITH async — THE #1 MISTAKE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n❌ 2. forEach + async — THE #1 MISTAKE\n");

// forEach does NOT wait for async callbacks!
// It fires ALL iterations immediately and returns
// Your code AFTER forEach runs BEFORE the async work finishes

async function processWithForEach() {
    const ids = [201, 202, 203];
    const results = [];

    // ❌ WRONG — forEach ignores the returned promises
    ids.forEach(async (id) => {
        const product = await fetchProduct(id);
        results.push(product);
        // This runs, but forEach doesn't wait for it
    });

    // This runs IMMEDIATELY — before any fetch completes!
    console.log(`  Results after forEach: ${results.length} items`); // 0 !!!
    console.log("  → forEach returned before async work finished ❌");
}

await processWithForEach();
await delay(200);  // Wait for the orphaned promises to finish

console.log("\n  ⚠️  RULE: NEVER use forEach with async/await.");
console.log("  ⚠️  Use for...of for sequential, Promise.all for parallel.\n");


// ═══════════════════════════════════════
// 3. PARALLEL PROCESSING (Promise.all + map)
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 3. PARALLEL — Promise.all + map\n");

// Use when: iterations are INDEPENDENT of each other
// All operations run simultaneously — much faster!
// Example: validating multiple API responses, fetching test data

async function processParallel() {
    const ids = [301, 302, 303, 304, 305];

    const start = Date.now();

    // .map() creates an array of Promises
    // Promise.all() waits for ALL of them to complete
    const results = await Promise.all(
        ids.map(async (id) => {
            const product = await fetchProduct(id);
            return product;
        })
    );

    const elapsed = Date.now() - start;
    console.log(`  Fetched ${results.length} products in ${elapsed}ms (parallel!)`);
    results.forEach(p => console.log(`    ${p.name}: $${p.price}`));
}

await processParallel();

console.log("\n  💡 Sequential: 5 × 50ms = ~250ms");
console.log("  💡 Parallel:   all at once = ~50ms");
console.log("  💡 Use parallel when operations don't depend on each other.");


// ═══════════════════════════════════════
// 4. Promise.all vs Promise.allSettled
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 4. Promise.all vs Promise.allSettled\n");

// Promise.all:       Fails FAST — if ANY promise rejects, ALL results are lost
// Promise.allSettled: Fails SAFE — waits for ALL, reports each result individually

async function fetchOrFail(id) {
    await delay(30);
    if (id === 402) throw new Error(`Product ${id} not found`);
    return { id, name: `Product ${id}` };
}

// Promise.all — one failure kills everything
console.log("  Promise.all (fails fast):");
try {
    const results = await Promise.all([
        fetchOrFail(401),
        fetchOrFail(402),  // This one will fail!
        fetchOrFail(403)
    ]);
    console.log("  Results:", results);
} catch (error) {
    console.log(`  ❌ ALL results lost: ${error.message}`);
}

// Promise.allSettled — each result independent
console.log("\n  Promise.allSettled (fails safe):");
const settled = await Promise.allSettled([
    fetchOrFail(401),
    fetchOrFail(402),  // Fails
    fetchOrFail(403)
]);

for (const result of settled) {
    if (result.status === "fulfilled") {
        console.log(`  ✅ ${result.value.name}`);
    } else {
        console.log(`  ❌ ${result.reason.message}`);
    }
}

console.log("\n  Use Promise.all:        when ALL must succeed (setup data)");
console.log("  Use Promise.allSettled:  when you want ALL results (health checks)");


// ═══════════════════════════════════════
// 5. RETRY LOOP PATTERN ⭐
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ 5. RETRY LOOP WITH BACKOFF\n");

// Professional pattern: retry with increasing delay
// Attempt 1: wait 1s, Attempt 2: wait 2s, Attempt 3: wait 3s
// This is called "linear backoff" — gives the system more time to recover

async function retryWithBackoff(action, { maxAttempts = 3, name = "action" } = {}) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await action();
            console.log(`    Attempt ${attempt}: ✅ Success`);
            return result;
        } catch (error) {
            console.log(`    Attempt ${attempt}: ❌ ${error.message}`);

            if (attempt === maxAttempts) {
                throw new Error(`${name} failed after ${maxAttempts} attempts: ${error.message}`);
            }

            // Increasing delay: 100ms, 200ms, 300ms... (scaled down for demo)
            const backoffMs = attempt * 100;
            console.log(`    Waiting ${backoffMs}ms before retry...`);
            await delay(backoffMs);
        }
    }
}

// Simulate: succeeds on 3rd attempt
let attemptCounter = 0;
console.log("  Scenario: flaky search (succeeds on attempt 3)");
try {
    await retryWithBackoff(async () => {
        attemptCounter++;
        if (attemptCounter < 3) throw new Error("No search results yet");
        return { results: ["Product A", "Product B"] };
    }, { maxAttempts: 3, name: "Search" });
} catch (error) {
    console.log(`  Final failure: ${error.message}`);
}


// ═══════════════════════════════════════
// 6. PAGINATION LOOP PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 6. PAGINATION LOOP\n");

// Simulate paginated API — returns items + whether more pages exist
function getPage(pageNum, pageSize = 3) {
    const allItems = ["A", "B", "C", "D", "E", "F", "G"];
    const start = (pageNum - 1) * pageSize;
    const end = start + pageSize;
    return {
        items: allItems.slice(start, end),
        hasMore: end < allItems.length
    };
}

// Loop through ALL pages until no more data
async function getAllPaginatedResults() {
    const allResults = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const response = getPage(page);
        allResults.push(...response.items);
        console.log(`  Page ${page}: got [${response.items}] (hasMore: ${response.hasMore})`);

        hasMore = response.hasMore;
        page++;
    }

    return allResults;
}

const allItems = await getAllPaginatedResults();
console.log(`  Total items: [${allItems}] (${allItems.length} items)`);


// ═══════════════════════════════════════
// 7. BATCH PROCESSING PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 7. BATCH PROCESSING\n");

// Process items in groups to avoid overwhelming the system
// Example: testing 10 product pages, 3 at a time (avoid rate limits)

async function processBatches(items, batchSize, processFn) {
    const results = [];

    // Step through items in chunks of batchSize
    for (let i = 0; i < items.length; i += batchSize) {
        // .slice(i, i+batchSize) extracts the current batch
        const batch = items.slice(i, i + batchSize);
        const batchNum = Math.floor(i / batchSize) + 1;
        console.log(`  Batch ${batchNum}: items [${batch}]`);

        // Process each batch in parallel (within the batch)
        const batchResults = await Promise.all(
            batch.map(item => processFn(item))
        );
        results.push(...batchResults);
    }

    return results;
}

const productIds = [1, 2, 3, 4, 5, 6, 7, 8];
const batchResults = await processBatches(productIds, 3, async (id) => {
    await delay(30);
    return { id, verified: true };
});
console.log(`  Processed ${batchResults.length} items in batches ✅`);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ASYNC LOOP PATTERNS SUMMARY\n");

console.log("  • for...of + await       → Sequential (one at a time) ⭐");
console.log("  • Promise.all + map      → Parallel (all at once)");
console.log("  • Promise.allSettled     → Parallel + fail-safe");
console.log("  • ❌ forEach + async      → NEVER (doesn't wait!)");
console.log("  • Retry loop             → for loop + try/catch + backoff");
console.log("  • Pagination             → while (hasMore) loop");
console.log("  • Batch processing       → for loop + Promise.all per batch");

console.log("\n═══════════════════════════════════════\n");
