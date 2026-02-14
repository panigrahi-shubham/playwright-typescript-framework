/**
 * ============================================
 * 08 - Practice Exercises, Code Review
 *      & Interview Answers
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * Loop mastery (5 ways), code review exercise,
 * debug challenge, and interview answers.
 * 
 * Run: node 08_practice_exercises.js
 */

console.log("═══════════════════════════════════════");
console.log("   DAY 6 — PRACTICE EXERCISES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// EXERCISE 1: LOOP MASTERY — 5 WAYS
// ═══════════════════════════════════════
console.log("📝 EXERCISE 1: Find Products Over ₹200 (5 Ways)\n");

// Task: Find all products with price > 200 using 5 different approaches.
// All 5 should produce the same result.

const productList = [
    { name: "Shirt", price: 250 },
    { name: "Cap", price: 150 },
    { name: "Scarf", price: 800 },
    { name: "Socks", price: 50 },
    { name: "Pants", price: 600 },
    { name: "Belt", price: 200 },    // Not > 200, exactly 200
    { name: "Jacket", price: 1200 }
];

// Way 1: Classic for loop
console.log("  Way 1: Classic for loop");
const result1 = [];
for (let i = 0; i < productList.length; i++) {
    if (productList[i].price > 200) {
        result1.push(productList[i].name);
    }
}
console.log(`    → [${result1}]\n`);

// Way 2: while loop
console.log("  Way 2: while loop");
const result2 = [];
let idx = 0;
while (idx < productList.length) {
    if (productList[idx].price > 200) {
        result2.push(productList[idx].name);
    }
    idx++;
}
console.log(`    → [${result2}]\n`);

// Way 3: for...of loop
console.log("  Way 3: for...of loop");
const result3 = [];
for (const product of productList) {
    if (product.price > 200) {
        result3.push(product.name);
    }
}
console.log(`    → [${result3}]\n`);

// Way 4: .filter() method ⭐ (most readable)
console.log("  Way 4: .filter() + .map() ⭐ (BEST for this use case)");
const result4 = productList
    .filter(p => p.price > 200)
    .map(p => p.name);
console.log(`    → [${result4}]\n`);

// Way 5: .reduce() method
console.log("  Way 5: .reduce()");
const result5 = productList.reduce((acc, p) => {
    if (p.price > 200) acc.push(p.name);
    return acc;
}, []);
console.log(`    → [${result5}]\n`);

// Verdict
console.log("  ✅ All 5 produce the same result!");
console.log("  🏆 filter() + map() is most readable — use in Playwright tests");
console.log("  🏆 for...of is best when you need await inside the loop");


// ═══════════════════════════════════════
// EXERCISE 6: CODE REVIEW
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n📝 EXERCISE 6: CODE REVIEW\n");

console.log("  Review this code — at least 8 issues:\n");
console.log("  ┌─────────────────────────────────────────────────┐");
console.log("  │ var testData = {name: 'shirt', price: 250}      │");
console.log("  │                                                  │");
console.log("  │ async function testSearch(page) {                │");
console.log("  │   page.goto('https://b2b-platform.com/search')  │");
console.log("  │   page.fill('#search', testData.name)            │");
console.log("  │   page.click('#search-btn')                      │");
console.log("  │                                                  │");
console.log("  │   var results = page.locator('.result')          │");
console.log("  │                     .allTextContents()           │");
console.log("  │                                                  │");
console.log("  │   results.forEach(async (result) => {            │");
console.log("  │     await expect(result).toContain(testData.name)│");
console.log("  │   })                                             │");
console.log("  │                                                  │");
console.log("  │   if (results.length == 0) {                     │");
console.log("  │     console.log('no results')                    │");
console.log("  │   }                                              │");
console.log("  │                                                  │");
console.log("  │   testData.price = 999                           │");
console.log("  │ }                                                │");
console.log("  └─────────────────────────────────────────────────┘\n");

console.log("  ═══ 8 ISSUES FOUND: ═══\n");

console.log("  1️⃣  var testData → should be const (use const for data that won't be reassigned)");
console.log("  2️⃣  Missing await on page.goto() → won't wait for navigation");
console.log("  3️⃣  Missing await on page.fill() → won't wait for typing");
console.log("  4️⃣  Missing await on page.click() → won't wait for click");
console.log("  5️⃣  Missing await on .allTextContents() → results is a Promise, not array!");
console.log("  6️⃣  forEach + async → assertions fire but forEach doesn't wait for them");
console.log("  7️⃣  == instead of === → should use strict equality");
console.log("  8️⃣  testData.price = 999 → mutating shared data! Other tests see this change\n");

console.log("  ═══ CORRECTED VERSION: ═══\n");
console.log("  const testData = { name: 'shirt', price: 250 };");
console.log("");
console.log("  async function testSearch(page) {");
console.log("    // Deep copy to prevent cross-test contamination");
console.log("    const data = structuredClone(testData);");
console.log("");
console.log("    await page.goto('https://b2b-platform.com/search');   // + await");
console.log("    await page.fill('#search', data.name);                // + await");
console.log("    await page.click('#search-btn');                      // + await");
console.log("");
console.log("    const results = await page.locator('.result')         // + await + const");
console.log("                         .allTextContents();");
console.log("");
console.log("    // for...of instead of forEach for async operations");
console.log("    for (const result of results) {");
console.log("      expect(result).toContain(data.name);               // no async needed here");
console.log("    }");
console.log("");
console.log("    if (results.length === 0) {                           // === not ==");
console.log("      console.log('no results');");
console.log("    }");
console.log("");
console.log("    // Removed: testData.price = 999 — never mutate shared data!");
console.log("  }");


// ═══════════════════════════════════════
// DEBUG CHALLENGE
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n🐛 DEBUG CHALLENGE\n");

console.log("  What's wrong with this code?\n");
console.log("    async function getAllProducts(page) {");
console.log("      const categories = ['Textiles', 'Electronics', 'Hardware'];");
console.log("      const allProducts = [];");
console.log("      ");
console.log("      categories.forEach(async (category) => {        ← ❌");
console.log("        await page.goto(`/search?category=${category}`);");
console.log("        const products = await page.locator('.product').allTextContents();");
console.log("        allProducts.push(...products);");
console.log("      });");
console.log("      ");
console.log("      console.log(`Found ${allProducts.length} total products`);");
console.log("      return allProducts;  // Always empty!");
console.log("    }\n");

console.log("  TWO PROBLEMS:\n");
console.log("  1️⃣  forEach + async → function returns BEFORE any iteration completes");
console.log("     allProducts is empty when console.log runs!\n");
console.log("  2️⃣  Even if forEach worked, navigating to different URLs");
console.log("     in the SAME page simultaneously causes chaos.\n");

console.log("  ✅ FIX (Sequential — single page):\n");
console.log("    for (const category of categories) {");
console.log("      await page.goto(`/search?category=${category}`);");
console.log("      const products = await page.locator('.product').allTextContents();");
console.log("      allProducts.push(...products);");
console.log("    }\n");

console.log("  ✅ FIX (Parallel — multiple pages):\n");
console.log("    const results = await Promise.all(");
console.log("      categories.map(async (category) => {");
console.log("        const page = await browser.newPage();");
console.log("        await page.goto(`/search?category=${category}`);");
console.log("        const products = await page.locator('.product').allTextContents();");
console.log("        await page.close();");
console.log("        return products;");
console.log("      })");
console.log("    );");
console.log("    const allProducts = results.flat();");


// ═══════════════════════════════════════
// INTERVIEW ANSWERS (Day 6)
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n🎤 INTERVIEW ANSWERS\n");

console.log("  Q1: How do you handle looping through elements in Playwright?");
console.log("  ─────────────────────────────────────────");
console.log("  'It depends on the need. For getting all text, I use");
console.log("   allTextContents() which returns an array, then process");
console.log("   with map, filter, or forEach. For interacting sequentially");
console.log("   — like clicking each result — I use for...of with await.");
console.log("   I NEVER use forEach with async because it fires all");
console.log("   iterations simultaneously. For parallel operations like");
console.log("   validating multiple API responses, I use Promise.all.'\n");

console.log("  Q2: Shallow copy vs deep copy — when does it matter?");
console.log("  ─────────────────────────────────────────");
console.log("  'Shallow copy duplicates top level but shares nested");
console.log("   references. Deep copy is fully independent. This matters");
console.log("   critically in test data — if Test 1 modifies a nested");
console.log("   property in shared data, Test 2 sees it. I use");
console.log("   structuredClone() in beforeEach to ensure test isolation.'\n");

console.log("  Q3: Promise.all vs Promise.allSettled?");
console.log("  ─────────────────────────────────────────");
console.log("  'Promise.all fails fast — if ANY one rejects, all results");
console.log("   are lost. Promise.allSettled waits for ALL and reports");
console.log("   each individually. I use .all for setup (must succeed).");
console.log("   I use .allSettled for health checks (collect all results).'\n");

console.log("  Q4: How do you manage test data?");
console.log("  ─────────────────────────────────────────");
console.log("  'Factory pattern with createProduct()-style functions.");
console.log("   Smart defaults + overrides. createProduct({ price: 5000 })");
console.log("   gives an expensive product with all other fields filled.");
console.log("   Data lives in separate modules, not hardcoded in tests.");
console.log("   Deep copy shared data in beforeEach for isolation.'\n");

console.log("  Q5: for...of vs for...in?");
console.log("  ─────────────────────────────────────────");
console.log("  'for...of = values (arrays, strings, Maps, Sets).");
console.log("   for...in = keys (objects only).");
console.log("   Common mistake: for...in on arrays gives string indices.");
console.log("   I use for...of for arrays, Object.entries() for objects.'");


// ═══════════════════════════════════════
// DAY 6 COMPLETE!
// ═══════════════════════════════════════
console.log("\n" + "═".repeat(45));
console.log("\n🎯 DAY 6 COMPLETE!\n");

console.log("  You can now confidently say:\n");
console.log("  'I write production-quality JavaScript with proper loop");
console.log("   patterns for async operations, test data factories for");
console.log("   isolated data, and configuration builders for flexible");
console.log("   framework setup. I understand JS gotchas like shallow vs");
console.log("   deep copy, this binding, and floating-point precision —");
console.log("   and I design my test framework to avoid these pitfalls.'");

console.log("\n  📅 Day 7: Consolidation + Mini-Project Day");
console.log("             Combine everything into a practical JS project");

console.log("\n═══════════════════════════════════════\n");
