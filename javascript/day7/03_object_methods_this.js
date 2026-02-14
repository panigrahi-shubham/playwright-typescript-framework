/**
 * ============================================
 * 03 - Object Methods, this, Spread & JSON
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * Objects can have methods (functions), the
 * 'this' keyword, and powerful utilities like
 * spread, Object.keys/values/entries, and JSON.
 * 
 * Run: node 03_object_methods_this.js
 */

console.log("═══════════════════════════════════════");
console.log("   OBJECT METHODS, this, SPREAD & JSON");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. METHODS — Functions Inside Objects
// ═══════════════════════════════════════
console.log("📌 Methods — Functions Inside Objects\n");

// A method is just a function that lives inside an object.
// Methods can access the object's properties using 'this'.

const messageCenter = {
    messages: [],
    unreadCount: 0,

    // Method: shorthand syntax (no 'function' keyword needed)
    sendMessage(text, recipient) {
        // 'this' refers to the messageCenter object itself
        this.messages.push({ text, recipient, read: false });
        this.unreadCount++;
        console.log(`    ✉️ Sent to ${recipient}: "${text}"`);
    },

    getUnread() {
        // 'this.messages' accesses the messages array on this object
        return this.messages.filter(m => !m.read);
    },

    markAllRead() {
        this.messages.forEach(m => m.read = true);
        this.unreadCount = 0;
        console.log("    ✅ All messages marked as read");
    }
};

// Using the methods
messageCenter.sendMessage("Quote request", "Supplier A");
messageCenter.sendMessage("Follow up", "Supplier B");
messageCenter.sendMessage("Invoice query", "Supplier A");

console.log("  Unread count:", messageCenter.getUnread().length);  // 3
messageCenter.markAllRead();
console.log("  Unread after markAllRead:", messageCenter.getUnread().length);  // 0


// ═══════════════════════════════════════
// 2. THE 'this' KEYWORD
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 The 'this' Keyword\n");

// In an object method, 'this' refers to the object the method belongs to.
// Similar to Java's 'this', but JavaScript's 'this' has some quirks.

const calculator = {
    result: 0,

    add(value) {
        this.result += value;   // 'this' = the calculator object
        return this;            // returning 'this' allows chaining!
    },

    subtract(value) {
        this.result -= value;
        return this;
    },

    multiply(value) {
        this.result *= value;
        return this;
    },

    reset() {
        this.result = 0;
        return this;
    },

    getResult() {
        return this.result;
    }
};

// Method chaining — possible because each method returns 'this'
calculator.add(10).add(5).subtract(3).multiply(2);
console.log("  Calculator result:", calculator.getResult());  // 24

calculator.reset();
console.log("  After reset:", calculator.getResult());  // 0

// ⚠️ GOTCHA: Arrow functions don't have their own 'this'!
const brokenObj = {
    name: "Broken",
    // ❌ Arrow function — 'this' is NOT the object!
    getName: () => {
        // 'this' here refers to the OUTER scope (global/module), not brokenObj
        return "this.name is: " + typeof this;  // undefined in strict mode
    },
    // ✅ Regular method — 'this' IS the object
    getNameCorrect() {
        return this.name;
    }
};

console.log("\n  ⚠️ Arrow function 'this':", brokenObj.getName());
console.log("  ✅ Regular method 'this':", brokenObj.getNameCorrect());
console.log("  Rule: NEVER use arrow functions as object methods!");


// ═══════════════════════════════════════
// 3. SPREAD OPERATOR WITH OBJECTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Spread Operator ( ...obj )\n");

// The spread operator (...) copies all properties from one object into another.
// Creates a NEW object — does NOT modify the original.

// COPY an object
const original = { name: "Shirt", price: 250 };
const copy = { ...original };
copy.price = 300;  // changing copy doesn't affect original

console.log("  Original:", original);  // { name: "Shirt", price: 250 }
console.log("  Copy:", copy);          // { name: "Shirt", price: 300 }

// MERGE objects (later ones overwrite earlier ones)
const defaults = { page: 1, limit: 20, sort: "relevance" };
const userPrefs = { limit: 50, sort: "price" };
const finalConfig = { ...defaults, ...userPrefs };
// userPrefs overwrites defaults for 'limit' and 'sort'
console.log("\n  Merged config:", finalConfig);
// { page: 1, limit: 50, sort: "price" }

// ADD or OVERRIDE properties
const updatedProduct = { ...original, price: 300, discount: 0.1 };
console.log("  Updated product:", updatedProduct);
// { name: "Shirt", price: 300, discount: 0.1 }

// ⚠️ REMINDER: Spread is a SHALLOW copy
// Nested objects are still shared by reference!
const deep = { name: "Test", nested: { value: 42 } };
const shallowCopy = { ...deep };
shallowCopy.nested.value = 99;
console.log("\n  ⚠️ Shallow copy gotcha:");
console.log("    deep.nested.value:", deep.nested.value);         // 99 — CHANGED!
console.log("    shallowCopy.nested.value:", shallowCopy.nested.value); // 99

// Real B2B use case:
console.log("\n  Real use case — search params:");
const defaultSearch = { query: "", page: 1, limit: 20, sort: "relevance" };
const userSearch = { query: "cotton", sort: "price_low" };
const searchParams = { ...defaultSearch, ...userSearch };
console.log("   ", searchParams);


// ═══════════════════════════════════════
// 4. Object.keys(), Object.values(), Object.entries()
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Object.keys / values / entries\n");

const item = { name: "Cotton Fabric", price: 250, moq: 100 };

// Object.keys() → array of all KEY names
const keys = Object.keys(item);
console.log("  Keys:", keys);  // ["name", "price", "moq"]

// Object.values() → array of all VALUES
const values = Object.values(item);
console.log("  Values:", values);  // ["Cotton Fabric", 250, 100]

// Object.entries() → array of [key, value] pairs
const entries = Object.entries(item);
console.log("  Entries:", entries);
// [["name", "Cotton Fabric"], ["price", 250], ["moq", 100]]

// LOOPING over object properties using entries + destructuring
console.log("\n  Looping with entries:");
for (const [key, value] of Object.entries(item)) {
    console.log(`    ${key}: ${value}`);
}

// forEach version:
console.log("\n  forEach version:");
Object.entries(item).forEach(([key, value]) => {
    console.log(`    ${key} → ${value}`);
});

// Practical: Count properties
console.log("\n  Property count:", Object.keys(item).length);  // 3

// Practical: Check if object is empty
const emptyObj = {};
console.log("  Is empty?", Object.keys(emptyObj).length === 0);  // true


// ═══════════════════════════════════════
// 5. JSON — JavaScript Object Notation
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 JSON — JavaScript Object Notation\n");

// JSON is how data travels between browser and server.
// Every API response you'll test in Playwright is JSON.

// JSON looks ALMOST like a JavaScript object, but:
// - Keys MUST be in double quotes: "name" (not name)
// - No trailing commas
// - No functions/methods
// - Only strings, numbers, booleans, null, arrays, objects

// Object → JSON string (serialization)
const product2 = { name: "Shirt", price: 250, inStock: true };
const jsonString = JSON.stringify(product2);
console.log("  Object → JSON:");
console.log("   ", jsonString);
// '{"name":"Shirt","price":250,"inStock":true}'

// JSON string → Object (parsing)
const jsonInput = '{"name":"Laptop","price":45000,"brand":"Dell"}';
const parsed = JSON.parse(jsonInput);
console.log("\n  JSON → Object:");
console.log("    parsed.name:", parsed.name);    // "Laptop"
console.log("    parsed.price:", parsed.price);  // 45000

// Pretty printing — great for debugging!
// JSON.stringify(obj, replacer, indent)
// The third argument (2) means indent with 2 spaces
console.log("\n  Pretty printed:");
console.log(JSON.stringify(product2, null, 2));

// ⚠️ Common errors with JSON:
console.log("\n  ⚠️ Common JSON mistakes:");
try {
    // Single quotes are NOT valid JSON
    JSON.parse("{'name': 'test'}");
} catch (error) {
    console.log("    Single quotes:", error.message.substring(0, 40));
}

try {
    // Trailing comma is NOT valid JSON
    JSON.parse('{"name": "test",}');
} catch (error) {
    console.log("    Trailing comma:", error.message.substring(0, 40));
}

// Playwright API testing preview:
console.log("\n  Playwright API testing preview:");
console.log("    // Send JSON in request");
console.log("    const response = await request.post('/api/search', {");
console.log("      data: { query: 'cotton', page: 1 }");
console.log("    });");
console.log("    // Parse JSON response");
console.log("    const body = await response.json();");
console.log("    expect(body.results.length).toBeGreaterThan(0);");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 METHODS, SPREAD & JSON SUMMARY\n");

console.log("  ┌──────────────────────────┬─────────────────────────────────┐");
console.log("  │ Concept                  │ Key Point                       │");
console.log("  ├──────────────────────────┼─────────────────────────────────┤");
console.log("  │ Methods                  │ Functions inside objects         │");
console.log("  │ this                     │ Refers to the owning object     │");
console.log("  │ ⚠️ Arrow + this          │ Arrow functions break 'this'    │");
console.log("  │ { ...obj }              │ Shallow copy / merge objects    │");
console.log("  │ Object.keys(obj)         │ Array of key names              │");
console.log("  │ Object.values(obj)       │ Array of values                 │");
console.log("  │ Object.entries(obj)      │ Array of [key, value] pairs     │");
console.log("  │ JSON.stringify(obj)      │ Object → JSON string            │");
console.log("  │ JSON.parse(str)          │ JSON string → Object            │");
console.log("  └──────────────────────────┴─────────────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
