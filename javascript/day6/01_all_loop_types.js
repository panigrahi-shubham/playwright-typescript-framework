/**
 * ============================================
 * 01 - All Loop Types: The Complete Picture
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * You've seen forEach, for...of, for...in.
 * Let's cover ALL loop types side by side
 * and know EXACTLY when to use each one.
 * 
 * Run: node 01_all_loop_types.js
 */

console.log("═══════════════════════════════════════");
console.log("   ALL LOOP TYPES — THE COMPLETE PICTURE");
console.log("═══════════════════════════════════════\n");

// Sample data for all examples
const products = ["Cotton Shirt", "Silk Scarf", "Wool Cap", "Linen Pants"];


// ═══════════════════════════════════════
// 1. CLASSIC for LOOP
// ═══════════════════════════════════════
console.log("📌 1. CLASSIC for LOOP\n");

// Syntax: for (init; condition; increment)
// Java comparison: IDENTICAL syntax — no differences at all!
// When to use:
//   - You need the index (e.g., nth-child selectors)
//   - You need to skip items or loop backwards
//   - You need to iterate a specific range of indices

for (let i = 0; i < products.length; i++) {
    // 'i' is the index (0, 1, 2, 3)
    // products[i] is the value at that index
    console.log(`  ${i + 1}. ${products[i]}`);
}

// Loop backwards — useful for removing items from arrays
console.log("\n  Backwards:");
for (let i = products.length - 1; i >= 0; i--) {
    console.log(`  ${i}: ${products[i]}`);
}

// Skip every other item
console.log("\n  Every other item (i += 2):");
for (let i = 0; i < products.length; i += 2) {
    console.log(`  ${products[i]}`);
}


// ═══════════════════════════════════════
// 2. for...of LOOP ⭐ (Iterate VALUES)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ 2. for...of LOOP (VALUES)\n");

// Iterates the VALUE of each element directly
// No index needed, cleaner than classic for
// WORKS ON: arrays, strings, Maps, Sets, generators
// CRITICAL: only loop that works correctly with await!

for (const product of products) {
    // 'product' IS the value — "Cotton Shirt", "Silk Scarf", etc.
    // No [i] indexing needed
    console.log(`  • ${product}`);
}

// If you need index WITH for...of, use .entries()
console.log("\n  With index (using .entries()):");
for (const [index, product] of products.entries()) {
    // Destructuring: [index, product] from each entry
    console.log(`  ${index + 1}. ${product}`);
}

// Works on strings — iterates each character
console.log("\n  for...of on a string:");
for (const char of "TEST") {
    process.stdout.write(`  [${char}]`);
}
console.log();


// ═══════════════════════════════════════
// 3. for...in LOOP (Iterate KEYS)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 3. for...in LOOP (KEYS)\n");

// Iterates the KEYS (property names) of an object
// Use ONLY for objects — never for arrays!

const pricing = { shirt: 250, scarf: 800, cap: 150, pants: 600 };

for (const item in pricing) {
    // 'item' is the KEY: "shirt", "scarf", "cap", "pants"
    // pricing[item] is the VALUE: 250, 800, 150, 600
    console.log(`  ${item}: ₹${pricing[item]}`);
}

// ❌ for...in on arrays — DON'T DO THIS
console.log("\n  ❌ for...in on array (gives string indices!):");
for (const idx in products) {
    // idx is "0", "1", "2", "3" — STRINGS, not numbers!
    console.log(`    idx="${idx}" (type: ${typeof idx})`);
}
console.log("  → Use for...of for arrays, for...in for objects ONLY!");


// ═══════════════════════════════════════
// 4. while LOOP
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 4. while LOOP\n");

// Checks condition BEFORE each iteration
// Use when you don't know how many iterations in advance
// Java comparison: Identical syntax

// Simulating retry attempts
let attempts = 0;
const maxAttempts = 3;

while (attempts < maxAttempts) {
    attempts++;
    console.log(`  Attempt ${attempts} of ${maxAttempts}`);
    // In real code: check if action succeeded, break if yes
}

// Simulate: keep processing until queue is empty
console.log("\n  Processing queue:");
const queue = ["Task A", "Task B", "Task C"];
while (queue.length > 0) {
    // .shift() removes and returns the first element
    const task = queue.shift();
    console.log(`  ✅ Processed: ${task} (${queue.length} remaining)`);
}


// ═══════════════════════════════════════
// 5. do...while LOOP
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 5. do...while LOOP\n");

// Executes body FIRST, then checks condition
// Guarantees at least ONE execution
// Java comparison: Identical syntax
// Rare in test automation, but know it for interviews

let count = 0;
do {
    count++;
    console.log(`  Iteration ${count}`);
} while (count < 3);

// Key difference from while:
console.log("\n  do...while runs at least once, even if condition is false:");
let x = 100;
do {
    console.log(`  x = ${x} (condition x < 5 is ${x < 5})`);
    x++;
} while (x < 5);
// Runs once even though 100 < 5 is false!


// ═══════════════════════════════════════
// 6. break AND continue
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 6. break AND continue\n");

// break    → stops the loop entirely, exits immediately
// continue → skips the REST of the current iteration, moves to next

const allProducts = ["Shirt", "ERROR_PRODUCT", "Cap", "SKIP_ME", "Pants"];

// break — stop when we hit an error
console.log("  break example:");
for (const product of allProducts) {
    if (product.startsWith("ERROR")) {
        console.log(`  🛑 Error found: "${product}" — stopping!`);
        break;  // Loop ends here
    }
    console.log(`  ✅ Processing: ${product}`);
}

// continue — skip invalid items
console.log("\n  continue example:");
for (const product of allProducts) {
    if (product.startsWith("ERROR") || product.startsWith("SKIP")) {
        console.log(`  ⏭️  Skipping: "${product}"`);
        continue;  // Jumps to next iteration
    }
    console.log(`  ✅ Processing: ${product}`);
}

// Java comparison: break and continue work EXACTLY the same in Java!


// ═══════════════════════════════════════
// 7. LABELED LOOPS (Interview-Worthy)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 7. LABELED LOOPS (Advanced)\n");

// Labels let you break/continue an OUTER loop from inside an inner loop
// Without labels, break/continue only affect the innermost loop

const categories = [
    { name: "Textiles", products: [{ name: "Shirt", price: 250 }, { name: "Silk", price: 12000 }] },
    { name: "Electronics", products: [{ name: "LED", price: 500 }, { name: "Panel", price: 800 }] },
    { name: "Hardware", products: [{ name: "Bolt", price: 15 }] }
];

console.log("  Finding first product over ₹10000:");
outerLoop: for (const category of categories) {
    for (const product of category.products) {
        if (product.price > 10000) {
            console.log(`  Found: ${product.name} (₹${product.price}) in ${category.name}`);
            break outerLoop;  // Breaks the OUTER loop, not just the inner one
        }
    }
}


// ═══════════════════════════════════════
// 8. LOOP SELECTION GUIDE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 LOOP SELECTION GUIDE FOR PLAYWRIGHT\n");

console.log("  ┌──────────────────────────────┬──────────────┬────────────────────────┐");
console.log("  │ Scenario                     │ Best Loop    │ Why                    │");
console.log("  ├──────────────────────────────┼──────────────┼────────────────────────┤");
console.log("  │ Iterate array values         │ for...of  ⭐ │ Clean, async-safe      │");
console.log("  │ Need index + value           │ Classic for  │ Full control           │");
console.log("  │ Object properties            │ for...in     │ Keys from objects      │");
console.log("  │ Unknown # of iterations      │ while        │ Condition-based        │");
console.log("  │ Must run at least once        │ do...while   │ Body before condition  │");
console.log("  │ Transform array → new array  │ .map()       │ Returns new array      │");
console.log("  │ Filter items                 │ .filter()    │ Returns filtered array │");
console.log("  │ Retry until success           │ for or while │ Known or unknown max   │");
console.log("  │ Process with await            │ for...of  ⭐ │ ONLY async-safe loop   │");
console.log("  └──────────────────────────────┴──────────────┴────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
