/**
 * ============================================
 * 03 - Iterators & Generators
 * ============================================
 * 
 * Day 6: Loops Deep Dive, Iterators & Patterns
 * You won't use generators daily, but they power
 * for...of loops and the spread operator under
 * the hood. Interviewers ask about them.
 * 
 * Run: node 03_iterators_generators.js
 */

console.log("═══════════════════════════════════════");
console.log("   ITERATORS & GENERATORS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. ITERABLES — WHAT MAKES for...of WORK
// ═══════════════════════════════════════
console.log("📌 1. ITERABLES\n");

// Any object with a Symbol.iterator method is "iterable"
// Arrays, strings, Maps, Sets are all iterable out of the box.
// That's WHY for...of works on them.

// Strings are iterable — each character is a value
console.log("  String iteration:");
for (const char of "HELLO") {
    process.stdout.write(`  [${char}]`);
}
console.log();

// Maps are iterable — each entry is [key, value]
console.log("\n  Map iteration:");
const config = new Map([
    ["browser", "chromium"],
    ["headless", "true"],
    ["timeout", "30000"]
]);
for (const [key, value] of config) {
    console.log(`    ${key} = ${value}`);
}

// Sets are iterable — each unique value
console.log("\n  Set iteration:");
const uniqueTags = new Set(["cotton", "premium", "organic", "cotton"]);
for (const tag of uniqueTags) {
    console.log(`    • ${tag}`);
}
console.log(`    (3 items — "cotton" deduplicated)`);


// ═══════════════════════════════════════
// 2. CUSTOM ITERATOR — Under the Hood
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 2. HOW ITERATORS WORK\n");

// An iterator is an object with a next() method
// next() returns { value: ..., done: true/false }
// When done=true, the iteration is finished.

// Let's manually iterate an array to see how for...of works internally:
const fruits = ["Apple", "Banana", "Cherry"];
const iterator = fruits[Symbol.iterator]();  // Get the iterator

console.log("  Manual iteration with .next():");
console.log(`    ${JSON.stringify(iterator.next())}`);  // { value: "Apple", done: false }
console.log(`    ${JSON.stringify(iterator.next())}`);  // { value: "Banana", done: false }
console.log(`    ${JSON.stringify(iterator.next())}`);  // { value: "Cherry", done: false }
console.log(`    ${JSON.stringify(iterator.next())}`);  // { value: undefined, done: true }

// When you write for...of, JavaScript does exactly this under the hood:
// 1. Gets the iterator via [Symbol.iterator]()
// 2. Calls .next() repeatedly
// 3. Uses .value as the loop variable
// 4. Stops when .done is true

// Custom iterable object — make any object work with for...of
console.log("\n  Custom iterable (product catalog):");
const productCatalog = {
    products: ["Shirt", "Scarf", "Cap", "Pants"],

    // This method makes the object "iterable"
    [Symbol.iterator]() {
        let index = 0;
        const items = this.products;

        return {
            next() {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};

// Now for...of works on our custom object!
for (const product of productCatalog) {
    console.log(`    📦 ${product}`);
}

// Spread also works because it uses the iterator protocol!
console.log(`    Spread: [${[...productCatalog]}]`);


// ═══════════════════════════════════════
// 3. GENERATORS — FUNCTIONS THAT PAUSE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 3. GENERATOR FUNCTIONS\n");

// Generator: a function that can PAUSE at 'yield' and RESUME later
// Syntax: function* (asterisk after 'function')
// Returns an iterator automatically!

// Java comparison: Java has no generators. Closest is an Iterator with
// hasNext() and next() — but generators are more elegant.

function* countUpTo(max) {
    for (let i = 1; i <= max; i++) {
        yield i;  // Pauses here, returns i, resumes on next call
    }
}

const counter = countUpTo(5);
console.log("  Manual calls:");
console.log(`    ${JSON.stringify(counter.next())}`);  // { value: 1, done: false }
console.log(`    ${JSON.stringify(counter.next())}`);  // { value: 2, done: false }
console.log(`    ${JSON.stringify(counter.next())}`);  // { value: 3, done: false }

// for...of works with generators too!
console.log("\n  for...of with generator:");
for (const num of countUpTo(5)) {
    process.stdout.write(`  [${num}]`);
}
console.log();


// ═══════════════════════════════════════
// 4. PRACTICAL: UNIQUE ID GENERATOR
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 4. PRACTICAL: TEST ID GENERATOR\n");

// Infinite generator — keeps producing IDs forever
// Only creates values when you ask for them (lazy evaluation)
function* testIdGenerator(prefix = "TEST") {
    let count = 1;
    while (true) {
        yield `${prefix}_${String(count).padStart(3, "0")}`;
        count++;
    }
}

const idGen = testIdGenerator("PROD");
console.log("  Generated IDs:");
console.log(`    ${idGen.next().value}`);  // PROD_001
console.log(`    ${idGen.next().value}`);  // PROD_002
console.log(`    ${idGen.next().value}`);  // PROD_003

// Generate a batch of IDs
const orderIdGen = testIdGenerator("ORD");
const orderIds = [];
for (let i = 0; i < 5; i++) {
    orderIds.push(orderIdGen.next().value);
}
console.log(`    Order IDs: [${orderIds.join(", ")}]`);


// ═══════════════════════════════════════
// 5. PRACTICAL: TEST DATA GENERATOR
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 5. PRACTICAL: TEST DATA GENERATOR\n");

// Generator that creates unique test products on demand
function* productDataGenerator() {
    const names = ["Cotton Shirt", "Silk Scarf", "Wool Cap", "Linen Pants", "Denim Jacket"];
    const categories = ["Textiles", "Accessories", "Apparel"];
    let id = 1;

    while (true) {
        yield {
            id: `PROD_${id}`,
            name: names[(id - 1) % names.length],       // Cycles through names
            price: Math.floor(Math.random() * 900) + 100, // Random 100-999
            category: categories[id % categories.length],
            timestamp: new Date().toISOString()
        };
        id++;
    }
}

const gen = productDataGenerator();
console.log("  Generated test data:");
for (let i = 0; i < 3; i++) {
    const product = gen.next().value;
    console.log(`    ${product.id}: ${product.name} ($${product.price}) [${product.category}]`);
}


// ═══════════════════════════════════════
// 6. yield* — DELEGATING TO ANOTHER GENERATOR
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 6. yield* — DELEGATION\n");

// yield* delegates iteration to another iterable/generator

function* textiles() {
    yield "Cotton Shirt";
    yield "Silk Scarf";
}

function* electronics() {
    yield "LED Panel";
    yield "Circuit Board";
}

// Combine multiple generators into one
function* allProducts() {
    yield* textiles();      // Yields all items from textiles()
    yield* electronics();   // Then all items from electronics()
    yield "Custom Item";    // Then a single item
}

console.log("  Combined generator:");
for (const product of allProducts()) {
    console.log(`    📦 ${product}`);
}


// ═══════════════════════════════════════
// INTERVIEW ANSWER
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🎤 INTERVIEW ANSWER\n");

console.log("  Q: What are generators in JavaScript?");
console.log("  ─────────────────────────────────────────");
console.log("  'Generators are functions that can pause with yield");
console.log("   and resume later. They return an iterator, so they");
console.log("   work with for...of and spread. They're great for");
console.log("   lazy sequences — like generating unique test IDs");
console.log("   without pre-creating a huge array. I don't use them");
console.log("   daily, but understanding them helps me understand");
console.log("   how for...of and spread work under the hood.'");

console.log("\n═══════════════════════════════════════\n");
