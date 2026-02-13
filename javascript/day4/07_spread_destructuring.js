/**
 * ============================================
 * 07 - Spread, Destructuring & Playwright Patterns
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * Modern array syntax — spread operator for
 * copying/merging, destructuring for clean
 * extraction, and real Playwright test patterns.
 * 
 * Run: node 07_spread_destructuring.js
 */

console.log("═══════════════════════════════════════");
console.log("   SPREAD, DESTRUCTURING & PATTERNS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. SPREAD OPERATOR (...) — Copy & Merge
// ═══════════════════════════════════════
console.log("📌 SPREAD OPERATOR — Copying & Merging Arrays\n");

// The spread operator (...) expands an array into individual elements.
// Think of it as "unpacking" the array.

// Merge arrays
const fruits = ["Apple", "Banana"];
const veggies = ["Carrot", "Pea"];
const all = [...fruits, ...veggies];
console.log("  fruits:", fruits);
console.log("  veggies:", veggies);
console.log("  Merged:", all);  // ["Apple", "Banana", "Carrot", "Pea"]

// Copy an array (creates an INDEPENDENT copy)
const original = ["A", "B", "C"];
const copy = [...original];
copy.push("D");
console.log("\n  Original:", original);  // ["A", "B", "C"] ← unchanged!
console.log("  Copy:", copy);            // ["A", "B", "C", "D"]

// ⚠️  Without spread, you'd get a REFERENCE (not a copy):
// const bad = original;   // Both point to SAME array!
// bad.push("D");          // Modifies original too!

// Add items while copying
const withExtra = ["Start", ...fruits, "End"];
console.log("\n  With extras:", withExtra);
// ["Start", "Apple", "Banana", "End"]


// ═══════════════════════════════════════
// 2. DESTRUCTURING — Extract Values Cleanly
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 ARRAY DESTRUCTURING\n");

// Extract values from arrays into named variables in ONE line.
const searchResult = ["Cotton Shirt", 250, "Textiles"];

// ❌ Old way — verbose
const name0 = searchResult[0];
const price0 = searchResult[1];
console.log("  Old way — name:", name0, "price:", price0);

// ✅ Destructuring — clean and modern
const [productName, productPrice, category] = searchResult;
console.log("  Destructured — name:", productName, "price:", productPrice, "category:", category);

// Skip items with empty commas
const [, , onlyCategory] = searchResult;
console.log("  Skip first two:", onlyCategory);  // "Textiles"

// With rest: get first, collect the rest into an array
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log("\n  first:", first);    // 1
console.log("  second:", second);   // 2
console.log("  rest:", rest);       // [3, 4, 5]

// Default values in destructuring
const [a, b, c = "default"] = ["x", "y"];
console.log("\n  With defaults — a:", a, "b:", b, "c:", c);
// a = "x", b = "y", c = "default" (no third element, so default used)

// Swap variables without a temp variable
let x = "first";
let y = "second";
[x, y] = [y, x];
console.log("\n  After swap — x:", x, "y:", y);  // x="second", y="first"


// ═══════════════════════════════════════
// 3. PLAYWRIGHT + ARRAYS: REAL PATTERNS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 PLAYWRIGHT + ARRAYS: Patterns You'll Use Daily\n");

// These patterns show EXACTLY how arrays work in Playwright tests.
// The page.locator() calls are commented out since we're not in a browser.

console.log("  Pattern 1: GET → ASSERT count\n");
console.log("    // Get all search result titles as an array");
console.log("    const titles = await page.locator('.search-result-title').allTextContents();");
console.log("    // ['Cotton Shirt', 'Silk Scarf', 'Wool Cap']");
console.log("    expect(titles.length).toBe(3);");
console.log("    expect(titles).toContain('Cotton Shirt');");

// Simulated example:
const titles = ["Cotton Shirt", "Silk Scarf", "Wool Cap"];
console.log("\n    Simulated titles:", titles);
console.log("    Length:", titles.length);
console.log("    Contains 'Cotton Shirt':", titles.includes("Cotton Shirt"));

console.log("\n  Pattern 2: GET → TRANSFORM → ASSERT each\n");
console.log("    // Get prices, clean them, verify price range");
console.log("    const priceTexts = await page.locator('.price').allTextContents();");
console.log("    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));");
console.log("    prices.forEach(price => {");
console.log("        expect(price).toBeGreaterThanOrEqual(100);");
console.log("        expect(price).toBeLessThanOrEqual(500);");
console.log("    });");

// Simulated example:
const priceTexts = ["$120.00", "$250.00", "$175.50"];
const cleanPrices = priceTexts.map(p => parseFloat(p.replace("$", "")));
console.log("\n    Raw prices:", priceTexts);
console.log("    Cleaned prices:", cleanPrices);  // [120, 250, 175.5]

// Verify each is in range
cleanPrices.forEach(price => {
    const inRange = price >= 100 && price <= 500;
    console.log(`    $${price} in range [100-500]: ${inRange ? "✅" : "❌"}`);
});

console.log("\n  Pattern 3: GET → FILTER → ASSERT\n");
console.log("    // Verify all results contain search term");
console.log("    titles.forEach(title => {");
console.log("        expect(title.toLowerCase()).toContain('cotton');");
console.log("    });");


// ═══════════════════════════════════════
// 4. THE 3-STEP PLAYWRIGHT ARRAY PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ THE 3-STEP PLAYWRIGHT ARRAY PATTERN\n");

console.log("  1. GET elements as array     — allTextContents()");
console.log("  2. TRANSFORM if needed       — map()");
console.log("  3. ASSERT on each            — forEach() + expect()\n");

console.log("  This three-step pattern covers 90% of array usage");
console.log("  in Playwright tests. Master it and you're set.");

// Full simulated example:
console.log("\n  Full example:");
const rawResults = ["  Cotton Fabric  ", "Cotton Shirt", "  Cotton Thread "];
console.log("    Raw results:", rawResults);

const cleaned = rawResults.map(r => r.trim().toLowerCase());
console.log("    After map(trim + lower):", cleaned);

cleaned.forEach(result => {
    const containsCotton = result.includes("cotton");
    console.log(`    "${result}" contains 'cotton': ${containsCotton ? "✅" : "❌"}`);
});


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 SPREAD & DESTRUCTURING SUMMARY\n");

console.log("  • Spread [...arr] creates a COPY (not a reference)");
console.log("  • Merge: [...arr1, ...arr2]");
console.log("  • Destructure: const [a, b, c] = array");
console.log("  • Skip items: const [, , third] = array");
console.log("  • Rest: const [first, ...rest] = array");
console.log("  • Playwright pattern: GET → MAP → ASSERT");

console.log("\n═══════════════════════════════════════\n");
