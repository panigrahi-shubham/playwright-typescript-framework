/**
 * ============================================
 * 09 - Practice Exercises & Debug Challenges
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * Complete ALL 5 exercises + debug challenge.
 * These directly prepare you for Playwright tests.
 * 
 * Run: node 09_practice_exercises.js
 */

console.log("═══════════════════════════════════════");
console.log("   PRACTICE EXERCISES — DAY 4");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// EXERCISE 1 — Function Practice
// ═══════════════════════════════════════
console.log("📝 EXERCISE 1 — Three Versions of the Same Function\n");

// Task: Write calculateBulkPrice in 3 ways:
//   - Function declaration
//   - Function expression
//   - Arrow function
// Parameters: unitPrice, quantity, discount (default: 0)
// Logic: unitPrice × quantity × (1 - discount)
// Test: calculateBulkPrice(10, 100, 0.15) should return 850

// Way 1 — Function Declaration
function calculateBulkPriceDeclaration(unitPrice, quantity, discount = 0) {
    return unitPrice * quantity * (1 - discount);
}

// Way 2 — Function Expression
const calculateBulkPriceExpression = function (unitPrice, quantity, discount = 0) {
    return unitPrice * quantity * (1 - discount);
};

// Way 3 — Arrow Function
const calculateBulkPriceArrow = (unitPrice, quantity, discount = 0) => {
    return unitPrice * quantity * (1 - discount);
};

// Even shorter arrow — single expression, implicit return:
const calculateBulkPriceShort = (unitPrice, quantity, discount = 0) =>
    unitPrice * quantity * (1 - discount);

// Testing all versions:
console.log("  Declaration:", calculateBulkPriceDeclaration(10, 100, 0.15));  // 850
console.log("  Expression:", calculateBulkPriceExpression(10, 100, 0.15));    // 850
console.log("  Arrow:", calculateBulkPriceArrow(10, 100, 0.15));              // 850
console.log("  Short arrow:", calculateBulkPriceShort(10, 100, 0.15));        // 850

// Test with default discount (0):
console.log("  No discount:", calculateBulkPriceArrow(10, 100));              // 1000


// ═══════════════════════════════════════
// EXERCISE 2 — Array Operations on B2B Data
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📝 EXERCISE 2 — Array Operations on B2B Data\n");

const products = [
    { name: "Cotton Fabric", category: "Textiles", price: 120, moq: 200, inStock: true },
    { name: "Steel Bolts", category: "Hardware", price: 45, moq: 500, inStock: true },
    { name: "LED Panels", category: "Electronics", price: 850, moq: 50, inStock: false },
    { name: "Silk Thread", category: "Textiles", price: 210, moq: 300, inStock: true },
    { name: "Copper Wire", category: "Hardware", price: 320, moq: 1500, inStock: true },
    { name: "Wool Yarn", category: "Textiles", price: 95, moq: 400, inStock: false },
];

// Task 1: Get all product names that are in stock (filter + map)
const inStockNames = products
    .filter(p => p.inStock)    // Keep only in-stock items
    .map(p => p.name);         // Extract just the names

console.log("  1. In-stock names:", inStockNames);
// ["Cotton Fabric", "Steel Bolts", "Silk Thread", "Copper Wire"]

// Task 2: Total inventory value (price × moq for each, then sum)
const totalValue = products
    .map(p => p.price * p.moq)                    // Calculate value for each
    .reduce((sum, value) => sum + value, 0);       // Sum all values

console.log("  2. Total inventory value:", totalValue);
// 120×200 + 45×500 + 850×50 + 210×300 + 320×1500 + 95×400
// = 24000 + 22500 + 42500 + 63000 + 480000 + 38000 = 670000

// Task 3: All Textiles sorted by price, cheapest first
const textilesByPrice = products
    .filter(p => p.category === "Textiles")         // Keep Textiles only
    .sort((a, b) => a.price - b.price);              // Sort by price ascending

console.log("  3. Textiles by price:", textilesByPrice.map(p => `${p.name} ($${p.price})`));
// Wool Yarn ($95), Cotton Fabric ($120), Silk Thread ($210)

// Task 4: Any product with MOQ above 1000?
const hasHighMOQ = products.some(p => p.moq > 1000);
console.log("  4. Any MOQ > 1000?", hasHighMOQ);  // true (Copper Wire: 1500)

// Task 5: Most expensive product's name (reduce)
const mostExpensive = products.reduce((max, p) =>
    p.price > max.price ? p : max
);
console.log("  5. Most expensive:", mostExpensive.name, `($${mostExpensive.price})`);
// LED Panels ($850)

// Alternative: using sort
const mostExpensiveAlt = [...products]
    .sort((a, b) => b.price - a.price)[0];
console.log("     (via sort):", mostExpensiveAlt.name);


// ═══════════════════════════════════════
// EXERCISE 3 — String Manipulation for Testing
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📝 EXERCISE 3 — String Manipulation for Testing\n");

// Task 1: cleanPrice(" $12.50/unit ") → returns the number 12.50
const cleanPrice = (text) => {
    // 1. Trim whitespace
    // 2. Remove $ and /unit
    // 3. Convert to float
    const cleaned = text.trim().replace("$", "").replace("/unit", "");
    return parseFloat(cleaned);
};

console.log("  1. cleanPrice(' $12.50/unit '):", cleanPrice(" $12.50/unit "));  // 12.5
console.log("     cleanPrice('$99.99/unit'):", cleanPrice("$99.99/unit"));      // 99.99

// Task 2: formatSearchQuery(" COTTON shirts ") → "cotton shirts"
const formatSearchQuery = (query) => {
    // Trim whitespace, convert to lowercase
    return query.trim().toLowerCase();
};

console.log("  2. formatSearchQuery(' COTTON shirts '):", formatSearchQuery(" COTTON shirts "));
// "cotton shirts"

// Task 3: extractUnreadCount("You have 5 unread messages") → 5
const extractUnreadCount = (text) => {
    // Use regex to find all numbers, take the first one
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
};

console.log("  3. extractUnreadCount('You have 5 unread messages'):",
    extractUnreadCount("You have 5 unread messages"));  // 5
console.log("     extractUnreadCount('No new messages'):",
    extractUnreadCount("No new messages"));             // 0

// Task 4: isValidSupplierEmail(email) → true if contains @ and .
const isValidSupplierEmail = (email) => {
    // Check that the email contains both @ and .
    return email.includes("@") && email.includes(".");
};

console.log("  4. isValidSupplierEmail('supplier@trade.com'):",
    isValidSupplierEmail("supplier@trade.com"));      // true
console.log("     isValidSupplierEmail('not-an-email'):",
    isValidSupplierEmail("not-an-email"));             // false
console.log("     isValidSupplierEmail('missing@dot'):",
    isValidSupplierEmail("missing@dot"));              // false


// ═══════════════════════════════════════
// EXERCISE 4 — Callback & Higher-Order Function
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📝 EXERCISE 4 — Callback & Higher-Order Function\n");

const testCases = [
    { input: "cotton shirts", expected: "COTTON SHIRTS" },
    { input: "silk saree", expected: "SILK SAREE" },
    { input: "led panel", expected: "LED PANEL" },
];

// runTestCases(cases, callbackFn):
//   1. Loops over each test case
//   2. Runs callbackFn(testCase.input)
//   3. Compares result to testCase.expected
//   4. Logs PASS or FAIL

const runTestCases = (cases, callbackFn) => {
    cases.forEach(testCase => {
        const actual = callbackFn(testCase.input);     // Run the callback
        const passed = actual === testCase.expected;    // Compare result

        if (passed) {
            console.log(`  ✅ PASS: ${testCase.input}`);
        } else {
            console.log(`  ❌ FAIL: ${testCase.input} — Expected: "${testCase.expected}", Got: "${actual}"`);
        }
    });
};

// Call with toUpperCase callback
console.log("  Testing toUpperCase callback:\n");
runTestCases(testCases, str => str.toUpperCase());
// ✅ PASS: cotton shirts
// ✅ PASS: silk saree
// ✅ PASS: led panel

// Bonus: Test with a different callback to see FAIL
console.log("\n  Testing trim callback (should fail):\n");
runTestCases(testCases, str => str.trim());
// ❌ FAIL for all — trim doesn't uppercase


// ═══════════════════════════════════════
// EXERCISE 5 — Message Centre (Combine Everything)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📝 EXERCISE 5 — Message Centre\n");

const messages = [
    { id: 1, from: "Supplier A", text: "Quote ready", read: false, timestamp: 1707820800 },
    { id: 2, from: "Supplier B", text: "Shipment delayed", read: true, timestamp: 1707734400 },
    { id: 3, from: "Supplier A", text: "Payment received", read: false, timestamp: 1707907200 },
    { id: 4, from: "Supplier C", text: "New catalogue", read: true, timestamp: 1707648000 },
    { id: 5, from: "Supplier A", text: "Order confirmed", read: false, timestamp: 1707993600 },
];

// Task 1: Count unread messages
const unreadCount = messages.filter(m => !m.read).length;
console.log("  1. Unread messages:", unreadCount);  // 3

// Task 2: Get all messages from "Supplier A", sorted newest first
const supplierAMessages = messages
    .filter(m => m.from === "Supplier A")         // Only Supplier A
    .sort((a, b) => b.timestamp - a.timestamp);    // Newest first (highest timestamp)

console.log("  2. Supplier A messages (newest first):");
supplierAMessages.forEach(m => {
    console.log(`     - [${m.timestamp}] "${m.text}" (${m.read ? "read" : "unread"})`);
});

// Task 3: Build summary string
const readCount = messages.filter(m => m.read).length;
// Find the latest message (highest timestamp)
const latestMessage = messages.reduce((latest, m) =>
    m.timestamp > latest.timestamp ? m : latest
);
const summary = `${unreadCount} unread, ${readCount} read — Latest from: ${latestMessage.from}`;
console.log("  3. Summary:", summary);
// "3 unread, 2 read — Latest from: Supplier A"

// Task 4: Mark ALL messages as read — NEW array, do NOT mutate original
// Use map + spread to create copies with read: true
const allRead = messages.map(m => ({ ...m, read: true }));
// { ...m } spreads all properties of m into a new object
// Then we override 'read' with true

console.log("  4. All marked as read:");
allRead.forEach(m => {
    console.log(`     - "${m.text}" read: ${m.read}`);
});

// Verify original is unchanged
console.log("     Original still has unread:", messages.filter(m => !m.read).length, "unread");


// ═══════════════════════════════════════
// 🐛 DEBUG CHALLENGE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🐛 DEBUG CHALLENGE — What's Wrong?\n");

console.log("  const searchResults = ['Cotton Shirt', 'Silk Scarf', 'Wool Cap'];");
console.log("  const upperResults = searchResults.forEach(item => item.toUpperCase());");
console.log("  console.log(upperResults);");
console.log("  // Expected: ['COTTON SHIRT', 'SILK SCARF', 'WOOL CAP']");

// Let's run it to see the actual output:
const searchResults = ["Cotton Shirt", "Silk Scarf", "Wool Cap"];
const upperResults = searchResults.forEach(item => item.toUpperCase());
console.log("\n  Actual output:", upperResults);  // undefined!

console.log("\n  🔍 Answer: upperResults is UNDEFINED.");
console.log("     forEach returns undefined — it does NOT return a new array.");
console.log("     The developer should have used map instead.");

// ✅ Correct solution:
const correctResults = searchResults.map(item => item.toUpperCase());
console.log("\n  ✅ Correct (using map):", correctResults);
// ["COTTON SHIRT", "SILK SCARF", "WOOL CAP"]

console.log("\n  Remember:");
console.log("    forEach = DO something (side effects, undefined return)");
console.log("    map     = TRANSFORM into new array (returns new array)");


// ═══════════════════════════════════════
// COMMON MISTAKES QUICK REFERENCE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚠️  COMMON MISTAKES QUICK REFERENCE\n");

console.log("  ┌────────────────────────────┬───────────────────────────────┐");
console.log("  │ Mistake                    │ Correct Way                   │");
console.log("  ├────────────────────────────┼───────────────────────────────┤");
console.log("  │ str.length() with ()       │ str.length (property, no ())  │");
console.log("  │ sort() without copy        │ [...arr].sort() to preserve   │");
console.log("  │ Forgetting trim()          │ Always .trim() element text   │");
console.log("  │ forEach expecting return   │ Use map for transformation    │");
console.log("  │ (x) => { x * 2 }          │ (x) => x * 2 or { return }   │");
console.log("  │ arr.find() === null        │ find returns undefined!       │");
console.log("  │ Arrow function before decl │ const/let have TDZ — declare  │");
console.log("  │ replace() replaces all     │ Only first match! Use replaceAll│");
console.log("  └────────────────────────────┴───────────────────────────────┘");


// ═══════════════════════════════════════
// INTERVIEW QUICK-FIRE ANSWERS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🎯 INTERVIEW QUICK-FIRE ANSWERS\n");

console.log("  Q: Regular function vs arrow function?");
console.log("  A: Arrow functions don't have 'this' — they inherit from parent.");
console.log("     Shorter syntax, perfect for callbacks.\n");

console.log("  Q: Explain map, filter, reduce?");
console.log("  A: map transforms each item, filter keeps matches,");
console.log("     reduce combines into one value. Like Java Streams.\n");

console.log("  Q: What is a closure?");
console.log("  A: Function that remembers parent scope variables after");
console.log("     the parent has returned. JS version of private fields.\n");

console.log("  Q: How do you handle arrays in Playwright?");
console.log("  A: allTextContents() → map to clean → forEach to assert.\n");

console.log("  Q: Why trim() in UI tests?");
console.log("  A: DOM text has hidden whitespace. Always trim before asserting.");


// ═══════════════════════════════════════
// DAY 4 CHECKLIST
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n✅ DAY 4 CHECKLIST\n");

console.log("  ☐ Explain three ways to write functions");
console.log("  ☐ Arrow functions vs regular — 'this' binding difference");
console.log("  ☐ Explain hoisting AND the Temporal Dead Zone (TDZ)");
console.log("  ☐ forEach vs map — know this cold");
console.log("  ☐ Use filter, map, and reduce with real examples");
console.log("  ☐ Explain method chaining");
console.log("  ☐ Explain closures — what + real use case");
console.log("  ☐ sort() mutates — use [...arr].sort()");
console.log("  ☐ find() returns undefined (not null)");
console.log("  ☐ Always trim() text before asserting");
console.log("  ☐ Completed all 5 exercises");
console.log("  ☐ Solved the debug challenge (forEach vs map)");
console.log("  ☐ git commit -m 'Day 4: Functions, Arrays & Strings'");

console.log("\n═══════════════════════════════════════\n");
