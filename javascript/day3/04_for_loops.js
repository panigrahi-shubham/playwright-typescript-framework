/**
 * ============================================
 * 04 - for, for...of, and for...in Loops
 * ============================================
 * 
 * Day 3: Repeating actions with counter-based
 * and value-based loops
 * 
 * Run: node 04_for_loops.js
 */

console.log("═══════════════════════════════════════");
console.log("   FOR LOOPS (for, for...of, for...in)");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. CLASSIC FOR LOOP
// ═══════════════════════════════════════
console.log("📌 CLASSIC FOR LOOP\n");

// Syntax: for (init; condition; increment) { ... }
for (let i = 0; i < 5; i++) {
    console.log(`  Iteration ${i}`);
}

// Breakdown:
// let i = 0     → Start at 0
// i < 5         → Continue while i is less than 5
// i++           → Add 1 after each iteration

console.log("\n  💡 Output: 0, 1, 2, 3, 4 (5 iterations)");


// ═══════════════════════════════════════
// 2. FOR LOOP — Processing Test Data
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 FOR LOOP — Processing Test Data\n");

const testUsers = [
    { email: "user1@test.com", password: "Pass1" },
    { email: "user2@test.com", password: "Pass2" },
    { email: "user3@test.com", password: "Pass3" }
];

for (let i = 0; i < testUsers.length; i++) {
    const user = testUsers[i];
    console.log(`  Test ${i + 1}: Login as ${user.email}`);

    // In real Playwright:
    // await page.fill("#email", user.email);
    // await page.fill("#password", user.password);
    // await page.click("#login");
}

// Pagination example
console.log("\n  Pagination example:");
for (let pageNum = 1; pageNum <= 5; pageNum++) {
    console.log(`  → Navigated to page ${pageNum}`);
    // await page.locator(".next-page").click();
    // await page.waitForLoadState("networkidle");
}


// ═══════════════════════════════════════
// 3. FOR...OF LOOP — Iterate Values (Modern)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 FOR...OF LOOP (Preferred for Arrays)\n");

// Use when you don't need the index, just the values
const products = ["Laptop", "Mouse", "Keyboard"];

// ❌ Traditional for loop
console.log("  ❌ Traditional:");
for (let i = 0; i < products.length; i++) {
    console.log(`    ${products[i]}`);
}

// ✅ for...of — cleaner
console.log("\n  ✅ for...of (cleaner):");
for (const product of products) {
    console.log(`    ${product}`);
}


// ═══════════════════════════════════════
// 4. FOR...OF — Automation Example
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 FOR...OF — Test Multiple Products\n");

const productIds = ["PROD-001", "PROD-002", "PROD-003", "PROD-004"];

for (const productId of productIds) {
    // In real Playwright:
    // await test.step(`Testing product ${productId}`, async () => {
    //     await page.goto(`/product/${productId}`);
    //     await expect(page.locator(".product-detail")).toBeVisible();
    // });

    console.log(`  ✅ Product ${productId} verified`);
}


// ═══════════════════════════════════════
// 5. FOR...IN LOOP — Iterate Object Keys
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 FOR...IN LOOP (For Objects, NOT Arrays!)\n");

const config = {
    baseURL: "https://api.example.com",
    timeout: 30000,
    retries: 3,
    headless: true
};

console.log("  Config values:");
for (const key in config) {
    console.log(`    ${key}: ${config[key]}`);
}


// ═══════════════════════════════════════
// 6. FOR...IN — Validate Config Keys
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 FOR...IN — Validate Config Keys\n");

const allowedKeys = ["baseURL", "timeout", "retries"];

for (const key in config) {
    if (!allowedKeys.includes(key)) {
        console.log(`  ⚠️ Unexpected config key: "${key}"`);
    } else {
        console.log(`  ✅ Valid key: "${key}"`);
    }
}


// ═══════════════════════════════════════
// 7. COMPARISON TABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 LOOP COMPARISON\n");

console.log("  ┌────────────┬────────────────────────────────────┐");
console.log("  │ Loop       │ Best For                           │");
console.log("  ├────────────┼────────────────────────────────────┤");
console.log("  │ for        │ Index control, known count         │");
console.log("  │ for...of   │ Array values (modern, preferred)   │");
console.log("  │ for...in   │ Object keys (NEVER for arrays)     │");
console.log("  └────────────┴────────────────────────────────────┘");

console.log("\n  ⚠️ Don't use for...in on arrays — it iterates");
console.log("     over keys (indices as strings), not values!");

console.log("\n═══════════════════════════════════════\n");
