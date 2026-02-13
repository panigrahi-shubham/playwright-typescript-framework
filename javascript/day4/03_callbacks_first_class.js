/**
 * ============================================
 * 03 - First-Class Functions & Callbacks
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * In JavaScript, functions ARE values — just like
 * numbers and strings. You can store, pass, and
 * return them. This is the key to reading
 * Playwright code fluently.
 * 
 * Run: node 03_callbacks_first_class.js
 */

console.log("═══════════════════════════════════════");
console.log("   FIRST-CLASS FUNCTIONS & CALLBACKS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. FUNCTIONS AS VALUES (First-Class Citizens)
// ═══════════════════════════════════════
console.log("📌 FUNCTIONS ARE VALUES\n");

// In Java, methods are tied to classes.
// In JavaScript, functions ARE values — you can:
//   ✅ Store them in variables
//   ✅ Pass them as arguments
//   ✅ Return them from other functions
//   ✅ Store them in arrays/objects

// 1. Store in a variable
const validate = (text) => text.length > 0;
console.log("  validate('cotton'):", validate("cotton"));    // true
console.log("  validate(''):", validate(""));                // false

// 2. Pass as an argument to another function
function runCheck(checkFn, value) {
    // checkFn is a function passed as a value
    return checkFn(value) ? "✅ Valid" : "❌ Invalid";
}

console.log("  runCheck(validate, 'cotton shirts'):", runCheck(validate, "cotton shirts"));
console.log("  runCheck(validate, ''):", runCheck(validate, ""));


// ═══════════════════════════════════════
// 2. FUNCTIONS IN ARRAYS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 FUNCTIONS STORED IN ARRAYS\n");

// You can store multiple functions in an array
// and run them all — like a pipeline of validators
const validators = [
    (text) => text.length > 0,        // Not empty
    (text) => text.length < 100,      // Under 100 chars
    (text) => !text.includes("@"),    // No @ symbol
];

const query = "cotton shirts";

// Run ALL validators on the query using .every()
// .every() returns true only if ALL callbacks return true
const allValid = validators.every(fn => fn(query));
console.log(`  Query: "${query}"`);
console.log("  All validations pass:", allValid);  // true

// Check each individually
validators.forEach((fn, index) => {
    console.log(`  Validator ${index + 1}: ${fn(query) ? "✅ Pass" : "❌ Fail"}`);
});


// ═══════════════════════════════════════
// 3. CALLBACK FUNCTIONS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 CALLBACK FUNCTIONS\n");

// A callback is a function you give to another function,
// saying "call this when you're done" or "use this to process each item."
// It's one of JavaScript's most important patterns.

// Example 1: setTimeout — calls the callback after a delay
// (We won't actually wait, just showing the pattern)
console.log("  setTimeout pattern:");
console.log("    setTimeout(() => { ... }, 2000);  // Runs after 2 seconds");

// Example 2: Array methods use callbacks to process each item
const prices = [100, 250, 50, 800];

// .filter() takes a callback — runs it for EACH price
// Keeps items where the callback returns true
const expensive = prices.filter(price => price > 200);
//                               ↑ this arrow function IS the callback
console.log("\n  Prices:", prices);
console.log("  Expensive (> 200):", expensive);  // [250, 800]

// Example 3: Custom callback function
const processResults = (results, onEach) => {
    console.log(`\n  Processing ${results.length} results:`);
    results.forEach((result, index) => {
        const processed = onEach(result);  // Call the callback
        console.log(`    ${index + 1}. ${result} → ${processed}`);
    });
};

// Pass different callbacks for different behaviours
processResults(["cotton", "silk", "wool"], str => str.toUpperCase());
processResults([100, 200, 300], price => `$${(price * 1.18).toFixed(2)} (with GST)`);


// ═══════════════════════════════════════
// 4. JAVA STREAM vs JAVASCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 JAVA STREAMS vs JAVASCRIPT — Same Logic, Cleaner Syntax\n");

// Java:
// List<Integer> expensive = prices.stream()
//     .filter(p -> p > 200)
//     .collect(Collectors.toList());
//
// JavaScript — same logic, cleaner:
// const expensive = prices.filter(p => p > 200);
// No .stream(), no .collect() — arrays have these methods built-in!

const productPrices = [100, 250, 50, 800, 175];

// Java needs .stream() and .collect()
// JavaScript just calls .filter() directly on the array
const premiumPrices = productPrices.filter(p => p > 200);
console.log("  Product prices:", productPrices);
console.log("  Premium (> 200):", premiumPrices);  // [250, 800]

console.log("\n  💡 In Java:    list.stream().filter(p -> p > 200).collect(...)");
console.log("     In JS:      arr.filter(p => p > 200)");
console.log("     Same concept, fewer steps!");


// ═══════════════════════════════════════
// 5. WHY THIS MATTERS FOR PLAYWRIGHT
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 WHY THIS MATTERS FOR PLAYWRIGHT\n");

// Playwright uses functions-as-values EVERYWHERE:

console.log("  1. page.waitForFunction(() => document.title.includes('Search'))");
console.log("     → You pass an arrow function as argument\n");

console.log("  2. prices.map(p => parseFloat(p.replace('$', '')))");
console.log("     → map() takes a callback to transform each item\n");

console.log("  3. page.route('**/*.png', route => route.abort())");
console.log("     → Event listener takes a callback function\n");

console.log("  4. test('login test', async ({ page }) => { ... })");
console.log("     → Every Playwright test IS a callback function!\n");

console.log("  Understanding first-class functions = reading Playwright fluently.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 FIRST-CLASS FUNCTIONS SUMMARY\n");

console.log("  • Functions ARE values in JS (unlike Java where methods belong to classes)");
console.log("  • You can store, pass, return, and array-ify functions");
console.log("  • Callbacks = functions passed to other functions");
console.log("  • Every array method (map, filter, forEach) takes a callback");
console.log("  • Every Playwright test & event listener uses callbacks");
console.log("  • JS array methods = Java Streams, but simpler syntax");

console.log("\n═══════════════════════════════════════\n");
