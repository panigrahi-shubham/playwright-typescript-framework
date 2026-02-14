/**
 * ============================================
 * 01 - Objects — Basics
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * Objects are EVERYWHERE in JavaScript.
 * Every Playwright element, every API response,
 * every config — it's all objects.
 * 
 * Run: node 01_objects_basics.js
 */

console.log("═══════════════════════════════════════");
console.log("   OBJECTS — Basics");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. WHAT IS AN OBJECT?
// ═══════════════════════════════════════
console.log("📌 What Is an Object?\n");

// An object is a collection of key-value pairs.
// Think of it like a real-world product — it has
// a name, a price, a category, a supplier.
// Each property is a key-value pair.

// In Java, you'd create a class first:
//   public class Product {
//       String name;
//       double price;
//       int moq;
//       public Product(String name, double price, int moq) {
//           this.name = name; this.price = price; this.moq = moq;
//       }
//   }
//   Product shirt = new Product("Cotton Shirt", 250.0, 100);

// In JavaScript, you just... write it:
const shirt = {
    name: "Cotton Shirt",
    price: 250,
    moq: 100
};

// No class needed. No constructor. No 'new'. 
// Just curly braces and you're done.
// This is called an OBJECT LITERAL.

console.log("  shirt:", shirt);
console.log("  Type:", typeof shirt);  // "object"


// ═══════════════════════════════════════
// 2. CREATING AN OBJECT
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Creating an Object\n");

// Object literal — the most common way
// Keys (properties) on the left, values on the right, separated by colons
// Each key-value pair separated by commas

const product = {
    name: "Premium Cotton Fabric",         // string value
    price: 250,                            // number value
    moq: 100,                              // number value
    category: "Textiles",                  // string value
    isVerified: true,                      // boolean value
    supplier: {                            // nested object (object inside object!)
        name: "TextilePro Ltd",
        location: "Shanghai",
        rating: 4.8
    },
    tags: ["cotton", "fabric", "premium", "bulk"]  // array value
};

console.log("  product:", product);
console.log("  Keys count:", Object.keys(product).length);  // 7


// ═══════════════════════════════════════
// 3. ACCESSING PROPERTIES — Two Ways
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Accessing Properties — Two Ways\n");

// WAY 1: Dot notation (preferred — cleaner, easier to read)
// Use when you KNOW the property name at code-writing time
console.log("  Dot notation:");
console.log("    product.name:", product.name);                    // "Premium Cotton Fabric"
console.log("    product.price:", product.price);                  // 250
console.log("    product.supplier.location:", product.supplier.location);  // "Shanghai"
console.log("    product.tags[0]:", product.tags[0]);              // "cotton"

// WAY 2: Bracket notation (needed for dynamic keys or special characters)
// Use when the key is stored in a variable, or has spaces/special chars
console.log("\n  Bracket notation:");
console.log("    product['name']:", product["name"]);              // "Premium Cotton Fabric"

// The POWER of bracket notation — dynamic access!
const key = "price";
console.log(`    Dynamic key '${key}':`, product[key]);            // 250

// This is useful when looping over properties
const fieldsToCheck = ["name", "price", "category"];
console.log("\n  Dynamic access loop:");
for (const field of fieldsToCheck) {
    console.log(`    ${field}: ${product[field]}`);
}

// ⚠️ You can't do this with dot notation:
// product.key → looks for a property literally called "key"!
// product[key] → looks for the property stored in the variable 'key'


// ═══════════════════════════════════════
// 4. MODIFYING OBJECTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Modifying Objects\n");

const item = {
    name: "Silk Scarf",
    price: 500,
    color: "red"
};

console.log("  Before:", item);

// Change existing property
item.price = 450;
console.log("  After price change:", item.price);  // 450

// Add NEW property (doesn't need to be declared first!)
item.discount = 0.1;
item.inStock = true;
console.log("  After adding properties:", item);

// Delete a property
delete item.color;
console.log("  After delete color:", item);

// ⚠️ IMPORTANT: Even though we declared 'item' with const,
// we CAN change its properties. const means you can't reassign
// the variable itself (item = something_else), but you CAN
// modify the object it points to.

// item = {};  ← This would throw an error (can't reassign const)
// item.name = "New Name";  ← This works fine!


// ═══════════════════════════════════════
// 5. CHECKING IF A PROPERTY EXISTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Checking if a Property Exists\n");

const user = {
    name: "Alice",
    email: "alice@test.com",
    age: 0,           // falsy but EXISTS
    bio: "",           // falsy but EXISTS
    isActive: false    // falsy but EXISTS
};

// Method 1: 'in' operator — checks if key exists (recommended)
console.log("  'name' in user:", "name" in user);       // true
console.log("  'phone' in user:", "phone" in user);     // false
console.log("  'age' in user:", "age" in user);         // true (0 is a valid value!)

// Method 2: hasOwnProperty() — same thing, but only own properties
console.log("\n  hasOwnProperty:");
console.log("    user.hasOwnProperty('email'):", user.hasOwnProperty("email"));  // true
console.log("    user.hasOwnProperty('toString'):", user.hasOwnProperty("toString")); // false (inherited)

// ⚠️ GOTCHA: Don't check with truthy/falsy!
// These properties EXIST but are falsy:
console.log("\n  ⚠️ Truthy check gotcha:");
console.log("    user.age:", user.age);                 // 0 (falsy!)
console.log("    Boolean(user.age):", Boolean(user.age)); // false — but age EXISTS!
console.log("    'age' in user:", "age" in user);       // true — correct way to check


// ═══════════════════════════════════════
// 6. NESTED OBJECTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Nested Objects\n");

// Objects inside objects — very common in API responses and configs
const company = {
    name: "B2B Marketplace",
    address: {
        street: "123 Trade Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
    },
    contacts: {
        primary: {
            name: "Rahul Sharma",
            phone: "+91-9876543210"
        },
        secondary: {
            name: "Priya Patel",
            phone: "+91-9876543211"
        }
    }
};

// Accessing nested properties — chain the dot notation
console.log("  Company:", company.name);
console.log("  City:", company.address.city);                    // "Mumbai"
console.log("  Primary contact:", company.contacts.primary.name); // "Rahul Sharma"

// ⚠️ SAFE ACCESS — What if a nested property doesn't exist?
// company.warehouse.address.city → CRASH! (warehouse is undefined)

// Use optional chaining (?.) to safely access:
console.log("\n  Safe access with ?.:");
console.log("    company.warehouse?.address:", company.warehouse?.address);  // undefined (no crash!)
console.log("    company.address?.city:", company.address?.city);            // "Mumbai"

// This is CRITICAL in Playwright when reading API responses
// that might have missing fields


// ═══════════════════════════════════════
// 7. JAVA ↔ JAVASCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ JavaScript Object Comparison\n");

console.log("  ┌──────────────────────────────┬──────────────────────────────┐");
console.log("  │ Java                         │ JavaScript                   │");
console.log("  ├──────────────────────────────┼──────────────────────────────┤");
console.log("  │ Must define a class first    │ Object literal — just { }    │");
console.log("  │ new Product(...)             │ { name: '...', price: 250 } │");
console.log("  │ product.getName()            │ product.name (direct!)       │");
console.log("  │ Can't add new fields         │ product.newField = value     │");
console.log("  │ Can't delete fields          │ delete product.field         │");
console.log("  │ Strong typing                │ Any value, any type          │");
console.log("  │ HashMap<K,V> for dynamic     │ Objects ARE dynamic by       │");
console.log("  │                              │ default                      │");
console.log("  └──────────────────────────────┴──────────────────────────────┘");

console.log("\n  💡 JS objects are like Java HashMaps with syntactic sugar.");
console.log("     They're flexible, dynamic, and EVERYWHERE.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 OBJECTS BASICS SUMMARY\n");

console.log("  • Object literal: { key: value, key2: value2 }");
console.log("  • Dot notation:   obj.key (clean, preferred)");
console.log("  • Bracket notation: obj['key'] (dynamic, flexible)");
console.log("  • Add property:   obj.newKey = value");
console.log("  • Delete:         delete obj.key");
console.log("  • Check exists:   'key' in obj (not truthy check!)");
console.log("  • Safe access:    obj?.nested?.deep (optional chaining)");
console.log("  • const + object: can modify properties, can't reassign variable");

console.log("\n═══════════════════════════════════════\n");
