/**
 * ============================================
 * 06 - The Big Three: map, filter, forEach
 *      + reduce, chaining, and more
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * These array methods are the MOST important in JS.
 * You'll use them in almost every Playwright test.
 * 
 * 🚨 CRITICAL: Know forEach vs map cold — always
 * asked in interviews!
 * 
 * Run: node 06_array_methods.js
 */

console.log("═══════════════════════════════════════");
console.log("   ARRAY METHODS — THE POWER TOOLS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. forEach — Do Something With Each Item
// ═══════════════════════════════════════
console.log("📌 forEach — Do Something With Each Item\n");

// Calls a function for EACH element.
// Does NOT return anything (returns undefined).
// Use for side effects: logging, asserting, etc.

const prices = [100, 250, 50, 800, 175];

prices.forEach(price => console.log(`  Price: $${price}`));

// With index (2nd callback parameter):
console.log();
prices.forEach((price, index) => {
    console.log(`  ${index + 1}. Price: $${price}`);
});


// ═══════════════════════════════════════
// 2. map — Transform Each Item
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 map — Transform Each Item Into Something New\n");

// Returns a NEW ARRAY with transformed values.
// Original array is UNCHANGED.
// Use when converting data from one form to another.

// Add 18% GST to each price
const withGST = prices.map(price => price * 1.18);
console.log("  Original prices:", prices);
console.log("  With 18% GST:", withGST);
console.log("  Original UNCHANGED:", prices);  // Still [100, 250, 50, 800, 175]

// Extract just names from objects
const products = [
    { name: "Shirt", price: 250 },
    { name: "Fabric", price: 800 },
    { name: "Cap", price: 150 },
];

const names = products.map(p => p.name);
console.log("\n  Product objects:", JSON.stringify(products));
console.log("  Names only:", names);  // ["Shirt", "Fabric", "Cap"]


// ═══════════════════════════════════════
// 3. filter — Keep Only Matching Items
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 filter — Keep Only Items That Match\n");

// Returns a NEW ARRAY with only items where callback returned true.
// Original is UNCHANGED.

const affordable = prices.filter(price => price < 200);
console.log("  All prices:", prices);
console.log("  Affordable (< 200):", affordable);  // [100, 50, 175]

// Filter with multiple conditions
const inventory = [
    { name: "Shirt", category: "Textiles", inStock: true },
    { name: "LED", category: "Electronics", inStock: false },
    { name: "Fabric", category: "Textiles", inStock: true },
];

const availableTextiles = inventory.filter(
    p => p.inStock && p.category === "Textiles"
);
console.log("  Available textiles:", availableTextiles.map(p => p.name));
// ["Shirt", "Fabric"]


// ═══════════════════════════════════════
// 🚨 CRITICAL: forEach vs map
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🚨 CRITICAL: forEach vs map — #1 Beginner Mistake\n");

// forEach returns undefined.
// map returns a new array.

const arr = [1, 2, 3, 4, 5];

const forEachResult = arr.forEach(x => x * 2);
const mapResult = arr.map(x => x * 2);

console.log("  forEach result:", forEachResult);  // undefined ← NOT an array!
console.log("  map result:", mapResult);           // [2, 4, 6, 8, 10] ← correct!

// ❌ WRONG: Using forEach when you need transformed data
// const doubled = arr.forEach(x => x * 2);  // doubled is undefined!

// ✅ RIGHT: Use map when you need the result
// const doubled = arr.map(x => x * 2);      // doubled is [2, 4, 6, 8, 10]

console.log("\n  Remember:");
console.log("    forEach = DO something (side effects, no return)");
console.log("    map     = TRANSFORM into something new (returns new array)");


// ═══════════════════════════════════════
// 4. reduce — Combine Into One Value
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 reduce — Combine Everything Into One Value\n");

// The most powerful array method.
// Takes all items and combines them into a SINGLE value.
// reduce(callback, initialValue)
// callback receives: (accumulator, currentItem)

const total = prices.reduce((sum, price) => sum + price, 0);

console.log("  Prices:", prices);
console.log("  Total:", total);  // 1375

// Step-by-step breakdown:
console.log("\n  Step by step:");
prices.reduce((sum, price, index) => {
    const newSum = sum + price;
    console.log(`    Step ${index + 1}: sum=${sum} + price=${price} → ${newSum}`);
    return newSum;
}, 0);
// sum=0     + price=100  → 100
// sum=100   + price=250  → 350
// sum=350   + price=50   → 400
// sum=400   + price=800  → 1200
// sum=1200  + price=175  → 1375

// Find the maximum value using reduce
const maxPrice = prices.reduce((max, price) => price > max ? price : max, 0);
console.log("\n  Max price:", maxPrice);  // 800


// ═══════════════════════════════════════
// 5. METHOD CHAINING — The Power Move
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ METHOD CHAINING — The Power Move\n");

// Since filter() and map() return new arrays,
// you can CHAIN them to build powerful data pipelines.
// This is exactly like Java Streams but cleaner.

const allProducts = [
    { name: "Cotton Shirt", price: 250, inStock: true },
    { name: "Silk Scarf", price: 800, inStock: false },
    { name: "Wool Cap", price: 150, inStock: true },
    { name: "Linen Pants", price: 500, inStock: true },
];

// Chain: filter in-stock → get names → sort A-Z
const availableNames = allProducts
    .filter(p => p.inStock)    // Step 1: Keep in-stock only
    .map(p => p.name)          // Step 2: Extract names
    .sort();                   // Step 3: Sort alphabetically

console.log("  Available products (sorted):", availableNames);
// ["Cotton Shirt", "Linen Pants", "Wool Cap"]

// Read it like a sentence:
// "From products, FILTER those in stock, MAP to get names, then SORT"

// More complex chain:
const totalInStockValue = allProducts
    .filter(p => p.inStock)                 // Keep in-stock
    .map(p => p.price)                      // Get prices
    .reduce((sum, price) => sum + price, 0); // Sum them

console.log("  Total in-stock value: $" + totalInStockValue);  // 900


// ═══════════════════════════════════════
// 6. OTHER ESSENTIAL METHODS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 OTHER ESSENTIAL ARRAY METHODS\n");

const nums = [10, 5, 20, 15, 30, 8];
console.log("  nums:", nums);

// some() — Does ANY item match? Returns boolean
console.log("  some(n => n > 25):", nums.some(n => n > 25));    // true  (30 > 25)

// every() — Do ALL items match? Returns boolean
console.log("  every(n => n > 0):", nums.every(n => n > 0));    // true  (all positive)
console.log("  every(n => n > 10):", nums.every(n => n > 10));  // false (5 isn't)

// find() — First matching item, or undefined (NOT null!)
const found = nums.find(n => n > 15);
console.log("  find(n => n > 15):", found);  // 20 (first match)

const notFound = nums.find(n => n > 100);
console.log("  find(n => n > 100):", notFound);  // undefined ⚠️ NOT null!

// findIndex() — Index of first match, or -1
console.log("  findIndex(n => n > 15):", nums.findIndex(n => n > 15));  // 2
console.log("  findIndex(n => n > 100):", nums.findIndex(n => n > 100)); // -1

// includes() — Is this exact value in the array?
console.log("  includes(20):", nums.includes(20));  // true
console.log("  includes(99):", nums.includes(99));  // false

// join() — Combine into a string
console.log("  join(', '):", nums.join(", "));  // "10, 5, 20, 15, 30, 8"
console.log("  join(' → '):", nums.join(" → "));

// flat() — Flatten nested arrays
const nested = [[1, 2], [3, 4], [5]];
console.log("  flat():", nested.flat());  // [1, 2, 3, 4, 5]


// ═══════════════════════════════════════
// 7. ⚠️ sort() MUTATES — PROTECT YOUR DATA
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚠️  sort() MUTATES! Protect Your Data\n");

// sort() MODIFIES the original array!
// To sort safely, spread into a new array first: [...arr].sort()

// ❌ Without comparator, sort converts to STRINGS:
const badSort = [10, 2, 1, 20].sort();
console.log("  [10, 2, 1, 20].sort():", badSort);  // [1, 10, 2, 20] ← WRONG!
// Alphabetical string sort: "1" < "10" < "2" < "20"

// ✅ Always pass a compare function for numbers:
const goodSort = [10, 2, 1, 20].sort((a, b) => a - b);
console.log("  .sort((a,b) => a-b):", goodSort);  // [1, 2, 10, 20] ← Correct!

// ✅ Safe sort — copy first, then sort:
const original = [30, 10, 20];
const sorted = [...original].sort((a, b) => a - b);
console.log("\n  Original:", original);  // [30, 10, 20] ← unchanged!
console.log("  Sorted copy:", sorted);  // [10, 20, 30]


// ═══════════════════════════════════════
// 8. ⚠️ find() and indexOf() NOT-FOUND BEHAVIOUR
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚠️  find() and indexOf() — 'Not Found' Behaviour\n");

const testArr = [10, 20, 30];

// find() returns UNDEFINED (not null!) when no match
const findResult = testArr.find(x => x > 100);
console.log("  find(x => x > 100):", findResult);              // undefined
console.log("  Is it null?", findResult === null);              // false
console.log("  Is it undefined?", findResult === undefined);   // true

// indexOf() returns -1 when not found
const indexResult = testArr.indexOf(99);
console.log("\n  indexOf(99):", indexResult);                   // -1
console.log("  Check: result !== -1:", indexResult !== -1);    // false

console.log("\n  💡 Common bug: treating find() result as null");
console.log("     Always check: result !== undefined");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ARRAY METHODS SUMMARY\n");

console.log("  ┌────────────┬────────────────┬──────────────────────────┐");
console.log("  │ Method     │ Returns        │ Purpose                  │");
console.log("  ├────────────┼────────────────┼──────────────────────────┤");
console.log("  │ forEach    │ undefined      │ Side effects (logging)   │");
console.log("  │ map        │ New array      │ Transform each item      │");
console.log("  │ filter     │ New array      │ Keep matching items      │");
console.log("  │ reduce     │ Single value   │ Combine/aggregate        │");
console.log("  │ find       │ Item/undefined │ First match              │");
console.log("  │ some       │ boolean        │ Any match?               │");
console.log("  │ every      │ boolean        │ All match?               │");
console.log("  │ sort       │ Mutated array  │ ⚠️  Use [...arr].sort()  │");
console.log("  └────────────┴────────────────┴──────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
