/**
 * ============================================
 * 02 - Object Destructuring
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * Destructuring lets you extract properties
 * from objects into variables in ONE line.
 * Used EVERYWHERE in Playwright!
 * 
 * Run: node 02_object_destructuring.js
 */

console.log("═══════════════════════════════════════");
console.log("   OBJECT DESTRUCTURING");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BASIC DESTRUCTURING
// ═══════════════════════════════════════
console.log("📌 Basic Destructuring\n");

const product = {
    name: "Cotton Fabric",
    price: 250,
    moq: 100,
    category: "Textiles"
};

// OLD way — verbose, repetitive
const oldName = product.name;
const oldPrice = product.price;
console.log("  Old way:", oldName, oldPrice);

// NEW way — destructuring ✅
// Pull out multiple properties in ONE line
// The variable names MUST match the property names
const { name, price, moq, category } = product;
console.log("  Destructured name:", name);       // "Cotton Fabric"
console.log("  Destructured price:", price);     // 250
console.log("  Destructured moq:", moq);         // 100
console.log("  Destructured category:", category); // "Textiles"

// You don't have to extract ALL properties — pick what you need
const { name: productName2 } = product;
console.log("\n  Extract just one:", productName2);


// ═══════════════════════════════════════
// 2. RENAMING WHILE DESTRUCTURING
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Renaming While Destructuring\n");

// Sometimes the property name conflicts with an existing variable,
// or you want a more descriptive name.
// Syntax: { originalKey: newVariableName }

const order = {
    name: "Bulk Order #42",
    price: 15000,
    status: "processing"
};

// Rename 'name' to 'orderName' and 'price' to 'orderPrice'
const { name: orderName, price: orderPrice, status: orderStatus } = order;
console.log("  orderName:", orderName);       // "Bulk Order #42"
console.log("  orderPrice:", orderPrice);     // 15000
console.log("  orderStatus:", orderStatus);   // "processing"

// This is useful when you have two objects with the same key names
const supplier = { name: "TextilePro", location: "Shanghai" };
const buyer = { name: "FashionCo", location: "Mumbai" };

const { name: supplierName } = supplier;
const { name: buyerName } = buyer;
console.log("\n  Supplier:", supplierName);  // "TextilePro"
console.log("  Buyer:", buyerName);          // "FashionCo"


// ═══════════════════════════════════════
// 3. DEFAULT VALUES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Default Values\n");

// If a property doesn't exist in the object,
// you can give it a default value.
// Syntax: { key = defaultValue }

const config = {
    baseURL: "https://b2b-platform.com",
    timeout: 30000
};

// 'retries' doesn't exist in config, so it gets default value 3
// 'baseURL' exists in config, so the default is ignored
const { baseURL, timeout, retries = 3 } = config;
console.log("  baseURL:", baseURL);    // "https://b2b-platform.com"
console.log("  timeout:", timeout);    // 30000
console.log("  retries:", retries);    // 3 (default, since it's not in config)

// Combine renaming + defaults
const { baseURL: url, timeout: maxWait = 5000 } = config;
console.log("\n  Renamed + defaults:");
console.log("    url:", url);        // "https://b2b-platform.com"
console.log("    maxWait:", maxWait); // 30000 (exists in config, not the default)


// ═══════════════════════════════════════
// 4. NESTED DESTRUCTURING
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Nested Destructuring\n");

// You can destructure nested objects too!
// Useful when API responses have deeply nested data.

const companyProfile = {
    info: {
        name: "TextilePro",
        address: {
            city: "Shanghai",
            country: "China"
        }
    },
    verification: {
        isVerified: true,
        certifications: ["ISO 9001", "OEKO-TEX"]
    }
};

// Extract nested values in one statement
const {
    info: {
        name: companyName,
        address: { city, country }
    }
} = companyProfile;

console.log("  companyName:", companyName);  // "TextilePro"
console.log("  city:", city);                // "Shanghai"
console.log("  country:", country);          // "China"

// ⚠️ Note: after this destructuring, 'info' is NOT a variable!
// Only the leaf values (companyName, city, country) become variables.
// If you also want 'info' as a variable, you need a separate destructuring.


// ═══════════════════════════════════════
// 5. DESTRUCTURING FUNCTION PARAMETERS ⭐
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ Destructuring in Function Parameters\n");

// Instead of receiving a whole object and then accessing properties,
// you can destructure directly in the function signature!

// WITHOUT destructuring — verbose
function displayProductOld(product) {
    console.log(`    ${product.name} — ₹${product.price} (MOQ: ${product.moq})`);
}

// WITH destructuring — clean! ✅
function displayProduct({ name, price, moq }) {
    console.log(`    ${name} — ₹${price} (MOQ: ${moq})`);
}

const products = [
    { name: "Cotton Fabric", price: 250, moq: 100 },
    { name: "Silk Thread", price: 800, moq: 50 },
    { name: "Leather Roll", price: 1200, moq: 25 }
];

console.log("  Product list:");
products.forEach(displayProduct);

// With defaults in parameters
function createUser({ name, role = "viewer", active = true } = {}) {
    console.log(`    User: ${name}, Role: ${role}, Active: ${active}`);
}

console.log("\n  Users with defaults:");
createUser({ name: "Alice", role: "admin" });    // role = admin (overridden)
createUser({ name: "Bob" });                      // role = viewer (default)
createUser({ name: "Charlie", active: false });   // active = false (overridden)


// ═══════════════════════════════════════
// 6. PLAYWRIGHT RELEVANCE ⭐⭐ 
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐⭐ Playwright Destructuring (Preview)\n");

// You'll write this in EVERY Playwright test file:
// const { test, expect } = require('@playwright/test');
// ↑ This destructures test and expect from the Playwright module!

console.log("  Line you'll write DAILY:");
console.log("    const { test, expect } = require('@playwright/test');");

// In test functions, fixtures are destructured:
// test('my test', async ({ page, context, browser }) => { ... });
// ↑ page, context, browser are destructured from the fixture object!

console.log("\n  Test function signature:");
console.log("    test('search', async ({ page, context }) => {");
console.log("      // page and context are destructured from fixtures");
console.log("    });");

// API response destructuring:
// const { status, data } = await response.json();

console.log("\n  API response:");
console.log("    const { status, data } = await response.json();");

console.log("\n  💡 Destructuring is not optional in Playwright —");
console.log("     it's the standard way to write tests!");


// ═══════════════════════════════════════
// 7. ARRAY DESTRUCTURING (Bonus)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Array Destructuring (Bonus)\n");

// Works with arrays too — by position instead of name

const rgb = [255, 128, 0];
const [red, green, blue] = rgb;
console.log("  RGB:", red, green, blue);  // 255 128 0

// Skip elements with empty slots
const scores = [95, 82, 78, 91, 88];
const [first, , third] = scores;  // skip second
console.log("  First:", first, "Third:", third);  // 95 78

// Rest pattern — collect remaining elements
const [champion, ...others] = scores;
console.log("  Champion:", champion);    // 95
console.log("  Others:", others);        // [82, 78, 91, 88]

// Swap variables without a temp!
let a = 1, b = 2;
[a, b] = [b, a];
console.log("\n  After swap: a =", a, ", b =", b);  // a = 2, b = 1

// Playwright usage:
// const [page1, page2] = await Promise.all([
//     context.newPage(),
//     context.newPage()
// ]);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 DESTRUCTURING SUMMARY\n");

console.log("  ┌────────────────────────────┬──────────────────────────────────┐");
console.log("  │ Syntax                     │ What It Does                     │");
console.log("  ├────────────────────────────┼──────────────────────────────────┤");
console.log("  │ { name, price } = obj      │ Extract properties               │");
console.log("  │ { name: myVar } = obj      │ Extract + rename                 │");
console.log("  │ { x = 10 } = obj           │ Extract + default if missing     │");
console.log("  │ { a: { b } } = obj         │ Nested destructuring             │");
console.log("  │ function({ name }) { }     │ Destructure in parameters        │");
console.log("  │ [a, b, c] = arr            │ Array destructuring (by index)   │");
console.log("  │ [first, ...rest] = arr     │ Rest pattern                     │");
console.log("  └────────────────────────────┴──────────────────────────────────┘");

console.log("\n  💡 You'll use destructuring in EVERY Playwright file!");

console.log("\n═══════════════════════════════════════\n");
