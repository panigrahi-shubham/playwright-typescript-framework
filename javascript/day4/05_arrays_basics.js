/**
 * ============================================
 * 05 - Arrays: Basics & Mutations
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * Arrays are ordered lists. In testing, they're
 * everywhere: search results, product prices,
 * test data sets. This file covers creating,
 * accessing, adding, and removing items.
 * 
 * Run: node 05_arrays_basics.js
 */

console.log("═══════════════════════════════════════");
console.log("   ARRAYS — BASICS & MUTATIONS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. CREATING ARRAYS
// ═══════════════════════════════════════
console.log("📌 CREATING ARRAYS\n");

// Arrays use square brackets [ ]  (NOT curly braces { } like Java)
const fruits = ["Apple", "Banana", "Mango"];
const numbers = [10, 20, 30, 40, 50];
const mixed = [1, "two", true, null, undefined];  // JS arrays hold ANY type!

console.log("  fruits:", fruits);
console.log("  numbers:", numbers);
console.log("  mixed:", mixed);

// Java comparison:
// Java:  int[] nums = {1, 2, 3};           // Fixed type, fixed size
//        ArrayList<String> list = new ArrayList<>();
// JS:    const nums = [1, 2, 3];           // Dynamic type, dynamic size


// ═══════════════════════════════════════
// 2. ACCESSING ELEMENTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 ACCESSING ELEMENTS (0-indexed)\n");

// Arrays are ZERO-INDEXED — first item is at index 0
console.log("  fruits[0]:", fruits[0]);                   // "Apple"
console.log("  fruits[1]:", fruits[1]);                   // "Banana"
console.log("  fruits[2]:", fruits[2]);                   // "Mango"
console.log("  fruits[99]:", fruits[99]);                 // undefined (no error!)

// Last element — use length - 1
console.log("  Last item:", fruits[fruits.length - 1]);   // "Mango"

// ⚠️  .length is a PROPERTY, not a method — NO parentheses!
// Java:   list.size()       ← method call with ()
// JS:     arr.length        ← property access, NO ()
// Writing arr.length() will throw: TypeError: arr.length is not a function
console.log("\n  ⚠️  arr.length (NO parentheses!) — not arr.length()");
console.log("  fruits.length:", fruits.length);  // 3


// ═══════════════════════════════════════
// 3. ADDING ELEMENTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 ADDING ELEMENTS\n");

const cart = ["Shirt", "Fabric", "Thread"];
console.log("  Starting cart:", cart);

// push() — Add to END
cart.push("Buttons");
console.log("  After push('Buttons'):", cart);
// ["Shirt", "Fabric", "Thread", "Buttons"]

// unshift() — Add to BEGINNING
cart.unshift("Dye");
console.log("  After unshift('Dye'):", cart);
// ["Dye", "Shirt", "Fabric", "Thread", "Buttons"]

// Memory trick: push/pop = END (stacking plates)
//               shift/unshift = BEGINNING (shifting a queue)


// ═══════════════════════════════════════
// 4. REMOVING ELEMENTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 REMOVING ELEMENTS\n");

const items = ["A", "B", "C", "D", "E"];
console.log("  Starting:", items);

// pop() — Remove from END (returns the removed item)
const lastItem = items.pop();
console.log("  pop() removed:", lastItem);  // "E"
console.log("  After pop():", items);        // ["A", "B", "C", "D"]

// shift() — Remove from BEGINNING (returns the removed item)
const firstItem = items.shift();
console.log("  shift() removed:", firstItem);  // "A"
console.log("  After shift():", items);         // ["B", "C", "D"]


// ═══════════════════════════════════════
// 5. SPLICE — Insert/Remove at ANY Position
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SPLICE — Insert/Remove at Any Position\n");

// splice(startIndex, deleteCount, ...itemsToInsert)
// ⚠️  splice MUTATES the original array!

const products = ["Shirt", "Pants", "Cap", "Socks"];
console.log("  Starting:", products);

// Remove 1 item at index 1
const removed = products.splice(1, 1);
console.log("  splice(1, 1) removed:", removed);  // ["Pants"]
console.log("  After:", products);                  // ["Shirt", "Cap", "Socks"]

// Insert "Scarf" at index 1 without removing (deleteCount = 0)
products.splice(1, 0, "Scarf");
console.log("  splice(1, 0, 'Scarf') inserted:");
console.log("  After:", products);  // ["Shirt", "Scarf", "Cap", "Socks"]

// Replace — remove 1 at index 2, insert "Jacket"
products.splice(2, 1, "Jacket");
console.log("  splice(2, 1, 'Jacket') replaced:");
console.log("  After:", products);  // ["Shirt", "Scarf", "Jacket", "Socks"]


// ═══════════════════════════════════════
// 6. SLICE — Copy a Portion (Non-Mutating)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SLICE vs SPLICE\n");

// slice(start, end) — extracts a portion, does NOT mutate
// splice() — modifies the original array, DOES mutate
// Remember: slicE = safE, splicE = editE

const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];

const subset = colors.slice(1, 4);  // From index 1 up to (not including) 4
console.log("  Original:", colors);
console.log("  slice(1, 4):", subset);       // ["Green", "Blue", "Yellow"]
console.log("  Original unchanged:", colors); // Still all 5 colors ✅

// slice() with no args = full copy
const copy = colors.slice();
console.log("  Full copy:", copy);


// ═══════════════════════════════════════
// 7. JAVA ↔ JAVASCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 JAVA ↔ JAVASCRIPT ARRAY COMPARISON\n");

console.log("  ┌─────────────────────────┬──────────────────────────────┐");
console.log("  │ Java                    │ JavaScript                    │");
console.log("  ├─────────────────────────┼──────────────────────────────┤");
console.log("  │ int[] nums = {1,2,3};   │ const nums = [1, 2, 3];      │");
console.log("  │ ArrayList<String>       │ const list = [];  (dynamic)   │");
console.log("  │ Fixed type: String[]    │ Mixed: [1, 'two', true]       │");
console.log("  │ list.size()             │ list.length  (property, no ())│");
console.log("  │ list.get(0)             │ list[0]  (direct index)       │");
console.log("  │ list.add('item')        │ list.push('item')             │");
console.log("  └─────────────────────────┴──────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ARRAY BASICS SUMMARY\n");

console.log("  • Arrays use [ ] and are 0-indexed");
console.log("  • .length is a PROPERTY (no parentheses!)");
console.log("  • push/pop = add/remove from END");
console.log("  • unshift/shift = add/remove from BEGINNING");
console.log("  • splice() = insert/remove at any position (MUTATES)");
console.log("  • slice() = copy a portion (SAFE, no mutation)");
console.log("  • JS arrays can hold mixed types (unlike Java)");

console.log("\n═══════════════════════════════════════\n");
