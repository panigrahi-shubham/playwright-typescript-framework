/**
 * ============================================
 * 03 - Data Types in JavaScript
 * ============================================
 * 
 * JavaScript has 7 primitive data types.
 * Understanding them is crucial for automation!
 * 
 * Run this file: node 03_data_types.js
 */

console.log("═══════════════════════════════════════");
console.log("   JAVASCRIPT DATA TYPES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. STRING - Text Data
// ═══════════════════════════════════════
// Strings are text wrapped in quotes.
// Most commonly used type in automation!

console.log("📝 STRING - Text Data\n");

// Three ways to create strings:
const singleQuotes = 'Hello World';
const doubleQuotes = "Hello World";
const backticks = `Hello World`;  // Template literal

console.log("Single quotes:", singleQuotes);
console.log("Double quotes:", doubleQuotes);
console.log("Backticks:", backticks);

// Automation examples:
const loginUrl = "https://www.saucedemo.com";
const username = "standard_user";
const selector = "#login-button";
const errorMessage = "Invalid credentials!";

console.log("\nAutomation Strings:");
console.log("  URL:", loginUrl);
console.log("  User:", username);
console.log("  Selector:", selector);

// Check type with typeof
console.log("\n  typeof username:", typeof username);  // "string"


// ═══════════════════════════════════════
// 2. NUMBER - Numeric Data
// ═══════════════════════════════════════
// Integers and decimals - no differentiation!

console.log("\n─".repeat(45));
console.log("\n🔢 NUMBER - Numeric Data\n");

const age = 25;
const price = 99.99;
const timeout = 30000;      // milliseconds
const negativeValue = -50;
const port = 3000;

console.log("Age:", age);
console.log("Price:", price);
console.log("Timeout:", timeout, "ms");
console.log("Negative:", negativeValue);
console.log("Port:", port);

// Special number values
const infinity = Infinity;
const notANumber = NaN;  // Result of invalid math

console.log("\nSpecial Numbers:");
console.log("  Infinity:", infinity);
console.log("  NaN (Not a Number):", notANumber);
console.log("  typeof age:", typeof age);  // "number"


// ═══════════════════════════════════════
// 3. BOOLEAN - True/False
// ═══════════════════════════════════════
// Only two values: true or false
// Controls logic and conditions

console.log("\n─".repeat(45));
console.log("\n✅ BOOLEAN - True/False\n");

const isLoggedIn = true;
const hasError = false;
const isHeadless = true;
const debugMode = false;

console.log("Is Logged In:", isLoggedIn);
console.log("Has Error:", hasError);
console.log("Headless Mode:", isHeadless);
console.log("Debug Mode:", debugMode);

// Comparison results are booleans
const isAdult = age >= 18;
const isExpensive = price > 100;

console.log("\nComparison Results:");
console.log("  age >= 18:", isAdult);
console.log("  price > 100:", isExpensive);
console.log("  typeof isLoggedIn:", typeof isLoggedIn);  // "boolean"


// ═══════════════════════════════════════
// 4. UNDEFINED - Not Yet Assigned
// ═══════════════════════════════════════
// Variable declared but never given a value

console.log("\n─".repeat(45));
console.log("\n❓ UNDEFINED - No Value Assigned\n");

let futureValue;  // Declared without assignment
let element;      // Element not yet found

console.log("futureValue:", futureValue);  // undefined
console.log("element:", element);          // undefined
console.log("typeof futureValue:", typeof futureValue);  // "undefined"

// Common in automation:
// - Element not found yet
// - API response not received
// - Variable waiting for data


// ═══════════════════════════════════════
// 5. NULL - Intentionally Empty
// ═══════════════════════════════════════
// Explicitly set to "nothing"
// Different from undefined!

console.log("\n─".repeat(45));
console.log("\n🚫 NULL - Intentionally Empty\n");

let apiResponse = null;      // Waiting for response
let selectedUser = null;     // Nothing selected yet
let cachedData = null;       // Cache cleared

console.log("API Response:", apiResponse);
console.log("Selected User:", selectedUser);
console.log("typeof null:", typeof null);  // "object" (JS quirk!)

// Null vs Undefined:
// undefined = "I forgot to set this"
// null = "I deliberately set this to nothing"


// ═══════════════════════════════════════
// 6. TYPEOF - Check Data Types
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🔍 TYPEOF - Type Checking\n");

console.log("typeof 'hello':", typeof "hello");     // string
console.log("typeof 42:", typeof 42);               // number
console.log("typeof true:", typeof true);           // boolean
console.log("typeof undefined:", typeof undefined); // undefined
console.log("typeof null:", typeof null);           // object (bug!)
console.log("typeof {}:", typeof {});               // object
console.log("typeof []:", typeof []);               // object


// ═══════════════════════════════════════
// SUMMARY TABLE
// ═══════════════════════════════════════
console.log("\n─".repeat(45));
console.log("\n📋 DATA TYPES SUMMARY\n");

console.log("┌────────────┬─────────────────────────┐");
console.log("│ Type       │ Example                 │");
console.log("├────────────┼─────────────────────────┤");
console.log("│ string     │ \"hello\", 'world', `hi`  │");
console.log("│ number     │ 42, 3.14, -10, 30000    │");
console.log("│ boolean    │ true, false             │");
console.log("│ undefined  │ undefined               │");
console.log("│ null       │ null                    │");
console.log("└────────────┴─────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
