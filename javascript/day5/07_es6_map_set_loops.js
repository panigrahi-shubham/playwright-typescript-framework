/**
 * ============================================
 * 07 - ES6+ Features: for...of, for...in,
 *      Map, Set & Enhanced Object Literals
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * Data structures and iteration patterns
 * that make your test code cleaner.
 * 
 * Run: node 07_es6_map_set_loops.js
 */

console.log("═══════════════════════════════════════");
console.log("   ES6+: MAP, SET & MODERN ITERATION");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. for...of vs for...in — KNOW THE DIFFERENCE
// ═══════════════════════════════════════
console.log("📌 for...of vs for...in\n");

// for...of → iterates VALUES (use for arrays, strings, Sets, Maps)
// for...in → iterates KEYS (use for objects)

// for...of with arrays — gives you the VALUE directly
const products = ["Shirt", "Fabric", "Thread"];

console.log("  for...of (VALUES — use for arrays):");
for (const product of products) {
    // 'product' is the actual value: "Shirt", "Fabric", "Thread"
    console.log(`    ${product}`);
}

// for...in with objects — gives you the KEY
const prices = { shirt: 250, fabric: 800, thread: 50 };

console.log("\n  for...in (KEYS — use for objects):");
for (const item in prices) {
    // 'item' is the key: "shirt", "fabric", "thread"
    // prices[item] is the value: 250, 800, 50
    console.log(`    ${item}: ₹${prices[item]}`);
}

// ❌ COMMON MISTAKE — for...in on arrays gives INDICES (strings!), not values
console.log("\n  ❌ for...in on arrays (WRONG):");
for (const item in products) {
    // 'item' is the string index: "0", "1", "2" — NOT the values!
    console.log(`    ${item} (type: ${typeof item})`);  // "0", "1", "2" as strings
}

console.log("\n  📌 RULE: for...of for arrays, for...in for objects.");
console.log("  📌 NEVER use for...in on arrays.\n");

// for...of with strings — iterates each character
console.log("  for...of with a string:");
const testId = "TC-001";
let chars = "";
for (const char of testId) {
    chars += `[${char}]`;
}
console.log(`    "${testId}" → ${chars}`);


// ═══════════════════════════════════════
// 2. MAP — Key-Value Pairs (Like Java's HashMap)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 MAP — Key-Value Pairs\n");

// Map is like a regular object, but:
// - Keys can be ANY type (not just strings)
// - Maintains insertion order
// - Has a .size property
// - Better performance for frequent additions/deletions

// Creating and using a Map
const pageTimings = new Map();

// .set(key, value) → add or update an entry
pageTimings.set("search", 1200);
pageTimings.set("pdp", 850);
pageTimings.set("checkout", 2100);
pageTimings.set("login", 500);

// .get(key) → retrieve a value
console.log("  pageTimings.get('search'):", pageTimings.get("search"));  // 1200

// .has(key) → check if key exists
console.log("  pageTimings.has('pdp'):   ", pageTimings.has("pdp"));     // true
console.log("  pageTimings.has('signup'):", pageTimings.has("signup"));   // false

// .size → number of entries (like .length for arrays)
console.log("  pageTimings.size:         ", pageTimings.size);            // 4

// .delete(key) → remove an entry
pageTimings.delete("login");
console.log("  After delete('login'):    ", pageTimings.size);            // 3

// Iterating a Map with for...of — gives [key, value] pairs
console.log("\n  Iterating Map:");
for (const [page, time] of pageTimings) {
    // Destructuring! [page, time] = each key-value pair
    const status = time > 1500 ? "🔴 SLOW" : "🟢 OK";
    console.log(`    ${page}: ${time}ms ${status}`);
}

// Map keys can be ANY type — even objects!
console.log("\n  Map with non-string keys:");
const testResults = new Map();
testResults.set(1, "passed");          // Number key
testResults.set(true, "run");          // Boolean key
testResults.set({ id: "TC-001" }, "failed");  // Object key!
console.log("  testResults.get(1):   ", testResults.get(1));     // "passed"
console.log("  testResults.get(true):", testResults.get(true));   // "run"


// ═══════════════════════════════════════
// 3. SET — Unique Values (Like Java's HashSet)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SET — Unique Values Only\n");

// Set is like an array, but:
// - NO duplicates allowed — adding a duplicate is silently ignored
// - Has .has() for O(1) lookup (much faster than array.includes())
// - No indexing — can't do set[0]

// Creating a Set
const categories = new Set();

// .add() → add a value
categories.add("Textiles");
categories.add("Electronics");
categories.add("Textiles");       // Ignored! Already exists
categories.add("Handicrafts");
categories.add("Electronics");    // Ignored! Already exists

console.log("  categories.size:", categories.size);  // 3 (not 5 — duplicates ignored)
console.log("  categories.has('Textiles'):   ", categories.has("Textiles"));    // true
console.log("  categories.has('Automotive'): ", categories.has("Automotive"));  // false

// Iterating a Set
console.log("\n  All unique categories:");
for (const category of categories) {
    console.log(`    • ${category}`);
}

// ⭐ COMMON INTERVIEW TRICK: Remove duplicates from an array
// This is fast, clean, and shows you know modern JavaScript
const rawTags = ["cotton", "fabric", "cotton", "premium", "fabric", "organic"];
const uniqueTags = [...new Set(rawTags)];
// Step 1: new Set(rawTags) → Set with unique values only
// Step 2: [...set]         → spread Set back into an array

console.log("\n  ⭐ Remove duplicates from array:");
console.log("    Input: ", rawTags);
console.log("    Output:", uniqueTags);

// Set operations (common in data processing)
const userA_features = new Set(["search", "filter", "sort", "export"]);
const userB_features = new Set(["search", "filter", "import", "dashboard"]);

// Union (combine all)
const union = new Set([...userA_features, ...userB_features]);
console.log("\n  Union:", [...union]);

// Intersection (common items)
const intersection = new Set([...userA_features].filter(x => userB_features.has(x)));
console.log("  Intersection:", [...intersection]);

// Difference (in A but not B)
const difference = new Set([...userA_features].filter(x => !userB_features.has(x)));
console.log("  Difference (A-B):", [...difference]);


// ═══════════════════════════════════════
// 4. JAVA ↔ JAVASCRIPT: Map & Set
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 JAVA ↔ JAVASCRIPT: Map & Set\n");

console.log("  ┌─────────────────────────┬─────────────────────────┐");
console.log("  │ Java                    │ JavaScript              │");
console.log("  ├─────────────────────────┼─────────────────────────┤");
console.log("  │ HashMap<K,V>            │ Map                     │");
console.log("  │ HashSet<E>              │ Set                     │");
console.log("  │ map.put(key, value)     │ map.set(key, value)     │");
console.log("  │ map.get(key)            │ map.get(key) (same!)    │");
console.log("  │ map.containsKey(key)    │ map.has(key)            │");
console.log("  │ set.add(element)        │ set.add(element) (same!)│");
console.log("  │ set.contains(element)   │ set.has(element)        │");
console.log("  │ map.size()              │ map.size (property!)    │");
console.log("  └─────────────────────────┴─────────────────────────┘");


// ═══════════════════════════════════════
// 5. ENHANCED OBJECT LITERALS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 ENHANCED OBJECT LITERALS\n");

// ES6 added shorthand syntax for objects.
// Makes your code cleaner and less repetitive.

const name = "Cotton Shirt";
const price = 250;
const category = "Textiles";

// ❌ OLD WAY — repetitive key:value when name matches
const productOld = {
    name: name,
    price: price,
    category: category,
    getInfo: function () {
        return `${this.name} - $${this.price}`;
    }
};

// ✅ MODERN WAY — shorthand properties + method shorthand
const productNew = {
    name,             // Same as name: name (shorthand property)
    price,            // Same as price: price
    category,         // Same as category: category
    getInfo() {       // Method shorthand — no 'function' keyword needed
        return `${this.name} - $${this.price}`;
    }
};

console.log("  Old style: { name: name, price: price }");
console.log("  New style: { name, price }      ← same result, cleaner!");
console.log(`  productNew.getInfo(): "${productNew.getInfo()}"`);


// ═══════════════════════════════════════
// 6. COMPUTED PROPERTY NAMES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 COMPUTED PROPERTY NAMES\n");

// Use [expression] as a key in an object literal
// The expression is evaluated to determine the key name

const field = "category";
const value = "Textiles";

// Dynamic key computed at runtime
const filter = {
    [field]: value,              // category: "Textiles"
    [`min_${field}`]: 0,         // min_category: 0
    [`max_${field}`]: 100        // max_category: 100
};

console.log("  Dynamic filter object:", filter);

// Useful for building dynamic test data
function createTestData(fieldName, fieldValue) {
    return {
        [fieldName]: fieldValue,
        timestamp: Date.now()
    };
}

const searchData = createTestData("searchQuery", "cotton");
const filterData = createTestData("filterCategory", "Textiles");

console.log("  searchData:", searchData);
console.log("  filterData:", filterData);

// Real-world: building dynamic API payloads
const updateField = "email";
const updateValue = "test@example.com";
const apiPayload = { [updateField]: updateValue };
console.log("  API payload:", apiPayload);  // { email: "test@example.com" }


// ═══════════════════════════════════════
// 7. TAGGED TEMPLATE LITERALS (Advanced)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 TAGGED TEMPLATE LITERALS (Advanced)\n");

// A function can be used as a "tag" for template literals.
// It receives the string parts and interpolated values separately.
// Useful for building CSS selectors, SQL queries, etc.

// Custom locator builder — tags a template literal
function css(strings, ...values) {
    // strings = array of static string parts
    // values  = array of interpolated ${...} values
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ?? "");
    }, "");
}

const role = "supplier";
const status = "verified";
const selector = css`[data-role="${role}"][data-status="${status}"]`;
console.log("  Built selector:", selector);
// '[data-role="supplier"][data-status="verified"]'

// Logging helper with tags
function log(strings, ...values) {
    const timestamp = new Date().toISOString().split("T")[1].split(".")[0];
    const message = strings.reduce((result, str, i) => {
        return result + str + (values[i] ?? "");
    }, "");
    return `[${timestamp}] ${message}`;
}

console.log("  " + log`User ${role} is ${status}`);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 MAP, SET & MODERN SYNTAX SUMMARY\n");

console.log("  Iteration:");
console.log("    • for...of → VALUES (arrays, strings, Sets, Maps)");
console.log("    • for...in → KEYS (objects only, NEVER arrays)");

console.log("\n  Map:");
console.log("    • .set(key, value) → add entry");
console.log("    • .get(key) → retrieve value");
console.log("    • .has(key) → check existence");
console.log("    • Keys can be ANY type");

console.log("\n  Set:");
console.log("    • NO duplicates — add() silently ignores dupes");
console.log("    • [...new Set(arr)] → remove duplicates from array ⭐");
console.log("    • .has() for O(1) lookups");

console.log("\n  Object shortcuts:");
console.log("    • { name } instead of { name: name }");
console.log("    • method() instead of method: function()");
console.log("    • [expr]: value for computed/dynamic keys");

console.log("\n═══════════════════════════════════════\n");
