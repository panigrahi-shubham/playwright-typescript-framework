/**
 * ============================================
 * 08 - Practical Patterns with Loops & Arrays
 * ============================================
 *
 * Day 3: Real-world JavaScript patterns that
 * combine conditionals, loops, and array methods.
 * These patterns appear directly in Playwright tests.
 *
 * Run: node 08_practical_patterns.js
 */

console.log("═══════════════════════════════════════");
console.log("   PRACTICAL PATTERNS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. FILTERING + TRANSFORMING DATA
// ═══════════════════════════════════════
console.log("📌 Pattern 1: Filter + Transform (map + filter)\n");

// Raw API response — product list
const rawProducts = [
    { id: 1, name: "Cotton Shirt", price: 250, inStock: true },
    { id: 2, name: "Silk Fabric", price: 800, inStock: false },
    { id: 3, name: "Linen Cloth", price: 450, inStock: true },
    { id: 4, name: "Polyester Mix", price: 150, inStock: true },
    { id: 5, name: "Rare Velvet", price: 1200, inStock: false },
];

// Get only in-stock products under ₹500, return just their names
const affordableInStock = rawProducts
    .filter(p => p.inStock && p.price < 500)      // keep matching
    .map(p => p.name);                             // extract names

console.log("  In-stock products under ₹500:", affordableInStock);

// Get total value of in-stock inventory
const totalValue = rawProducts
    .filter(p => p.inStock)
    .reduce((sum, p) => sum + p.price, 0);

console.log("  Total in-stock value: ₹" + totalValue);

// 🤖 Playwright use: extract all product names from search results
// const names = await page.locator('.product-name').allTextContents();
// const filtered = names.filter(n => n.includes('Cotton')).map(n => n.trim());


// ═══════════════════════════════════════
// 2. GROUPING DATA WITH reduce()
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 2: Grouping with reduce()\n");

const orders = [
    { id: "ORD-1", status: "delivered", amount: 500 },
    { id: "ORD-2", status: "pending", amount: 1200 },
    { id: "ORD-3", status: "delivered", amount: 300 },
    { id: "ORD-4", status: "cancelled", amount: 800 },
    { id: "ORD-5", status: "pending", amount: 450 },
];

// Group orders by status
const groupedByStatus = orders.reduce((groups, order) => {
    const status = order.status;
    if (!groups[status]) {
        groups[status] = [];
    }
    groups[status].push(order);
    return groups;
}, {});

console.log("  Grouped orders:");
for (const [status, group] of Object.entries(groupedByStatus)) {
    const total = group.reduce((sum, o) => sum + o.amount, 0);
    console.log(`    ${status}: ${group.length} orders, ₹${total} total`);
}

// 💡 Great for test data: group test cases by priority, suite, or tag


// ═══════════════════════════════════════
// 3. FLATTENING NESTED DATA
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 3: Flattening Nested Data\n");

const categories = [
    { name: "Textiles", products: ["Cotton Shirt", "Silk Fabric"] },
    { name: "Electronics", products: ["Laptop", "Tablet"] },
    { name: "Books", products: ["JavaScript Guide", "Clean Code"] },
];

// Get ALL products in one flat array
const allProducts = categories.flatMap(cat => cat.products);
console.log("  All products:", allProducts);

// Get all products WITH their category
const withCategory = categories.flatMap(cat =>
    cat.products.map(name => ({ name, category: cat.name }))
);
console.log("  With category:", withCategory);

// 🤖 Playwright use: flatten nested menu items, tab content, accordion rows


// ═══════════════════════════════════════
// 4. FINDING & CHECKING
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 4: Finding & Checking (find, some, every)\n");

const testResults = [
    { test: "Login", passed: true, duration: 1200 },
    { test: "Search", passed: true, duration: 2500 },
    { test: "Checkout", passed: false, duration: 5000 },
    { test: "Profile", passed: true, duration: 800 },
];

// find() — first match
const firstFailure = testResults.find(t => !t.passed);
console.log("  First failure:", firstFailure?.test ?? "None");

// findIndex() — first match index
const failureIndex = testResults.findIndex(t => !t.passed);
console.log("  Failure index:", failureIndex);

// some() — "at least one"
const hasFailures = testResults.some(t => !t.passed);
console.log("  Has failures:", hasFailures);

// every() — "all of them"
const allPassed = testResults.every(t => t.passed);
console.log("  All passed:", allPassed);

// Slow tests (> 2 sec)
const slowTests = testResults.filter(t => t.duration > 2000).map(t => t.test);
console.log("  Slow tests (>2s):", slowTests);

// 🤖 Playwright use:
// hasFailures → decide whether to take screenshot
// allPassed → assertion after running test suite
// find → locate specific test in report


// ═══════════════════════════════════════
// 5. DEDUPLICATION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 5: Deduplication\n");

const tags = ["smoke", "login", "smoke", "P0", "login", "regression", "P0"];

// Remove duplicates using Set
const uniqueTags = [...new Set(tags)];
console.log("  Original tags:", tags);
console.log("  Unique tags:", uniqueTags);

// Deduplicate objects by ID
const items = [
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 1, name: "Item A (duplicate)" },
    { id: 3, name: "Item C" },
];

const uniqueItems = [...new Map(items.map(i => [i.id, i])).values()];
console.log("  Unique items:", uniqueItems);

// 💡 Use in test data: deduplicate locators, tags, result names


// ═══════════════════════════════════════
// 6. SORTING DATA
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 6: Sorting\n");

const products = [
    { name: "Silk Fabric", price: 800 },
    { name: "Linen Cloth", price: 450 },
    { name: "Cotton Shirt", price: 250 },
    { name: "Rare Velvet", price: 1200 },
];

// Sort by price ascending (cheapest first)
const byPriceAsc = [...products].sort((a, b) => a.price - b.price);
console.log("  By price (asc):", byPriceAsc.map(p => `${p.name}: ₹${p.price}`));

// Sort by price descending (expensive first)
const byPriceDesc = [...products].sort((a, b) => b.price - a.price);
console.log("  By price (desc):", byPriceDesc.map(p => `₹${p.price}`));

// Sort by name alphabetically
const byName = [...products].sort((a, b) => a.name.localeCompare(b.name));
console.log("  By name:", byName.map(p => p.name));

// ⚠️ ALWAYS use [...products] to avoid mutating original array
console.log("  Original still intact:", products[0].name === "Silk Fabric");

// 🤖 Playwright use: verify products are sorted on page
// const prices = await page.locator('.price').allTextContents();
// const nums = prices.map(p => parseFloat(p.replace('₹', '')));
// const isSorted = nums.every((n, i) => i === 0 || nums[i-1] <= n);


// ═══════════════════════════════════════
// 7. BUILDING OBJECTS FROM ARRAYS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 7: Build Objects from Arrays\n");

// Selectors map — array of [key, selector] pairs to object
const locatorPairs = [
    ["searchBox", "#search-input"],
    ["searchButton", "#search-btn"],
    ["resultCount", ".result-count"],
    ["productCards", ".product-card"],
];

// Build selector object using Object.fromEntries
const selectors = Object.fromEntries(locatorPairs);
console.log("  Selectors map:", selectors);

// Build a lookup map from an array (O(1) access later)
const productById = Object.fromEntries(
    rawProducts.map(p => [p.id, p])
);
console.log("  productById[3]:", productById[3]);

// 💡 Lookup maps are much faster than .find() in loops


// ═══════════════════════════════════════
// 8. CHAINING MULTIPLE OPERATIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Pattern 8: Chaining Operations\n");

// Full pipeline: raw data → filtered → sorted → reported
const testSuiteResults = [
    { suite: "Search", tests: 12, passed: 12, duration: 4500 },
    { suite: "Login", tests: 8, passed: 7, duration: 2100 },
    { suite: "Checkout", tests: 15, passed: 13, duration: 8900 },
    { suite: "Profile", tests: 6, passed: 6, duration: 1800 },
];

console.log("  Failing suites, sorted by pass rate:\n");

testSuiteResults
    .filter(s => s.passed < s.tests)                     // only failures
    .map(s => ({
        ...s,
        passRate: Math.round((s.passed / s.tests) * 100),
        failed: s.tests - s.passed
    }))
    .sort((a, b) => a.passRate - b.passRate)              // worst first
    .forEach(s => {
        console.log(`    ${s.suite}: ${s.passed}/${s.tests} (${s.passRate}%) — ${s.failed} failing`);
    });

console.log("\n  💡 Chain filter → map → sort → forEach for data pipelines");
console.log("     Each method returns an array — chaining is clean and readable");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 PRACTICAL PATTERNS SUMMARY\n");

console.log("  • filter + map:     Select and transform in a pipeline");
console.log("  • reduce:           Aggregate, group, or build objects");
console.log("  • flatMap:          Flatten nested arrays in one step");
console.log("  • find/some/every:  Single-use array checks");
console.log("  • Set:              Deduplication in one line");
console.log("  • sort:             Use [...arr] to avoid mutation");
console.log("  • fromEntries:      Build lookup maps from arrays — O(1) access");
console.log("  • Chaining:         filter → map → sort → forEach for pipelines");
console.log("  • 🤖 All used in Playwright: extracting, filtering, asserting data");

console.log("\n═══════════════════════════════════════\n");
