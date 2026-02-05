/**
 * ============================================
 * 01 - Primitive Types in JavaScript
 * ============================================
 * 
 * Day 2: Understanding the foundational data types
 * Primitives are immutable and stored directly in memory.
 * 
 * Run this file: node 01_primitive_types.js
 */

console.log("═══════════════════════════════════════");
console.log("   PRIMITIVE DATA TYPES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// WHAT ARE PRIMITIVES?
// ═══════════════════════════════════════
// Primitives are the most basic data types.
// They are IMMUTABLE (cannot be changed after creation).
// JavaScript has 7 primitive types, we focus on 3 main ones.

console.log("📦 The 3 Main Primitives:\n");
console.log("  1. string  - Text data");
console.log("  2. number  - Numeric data");
console.log("  3. boolean - True/False\n");


// ═══════════════════════════════════════
// 1. STRING - Text Data
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📝 STRING - Text Data\n");

// Three ways to create strings
const withSingleQuotes = 'Hello World';
const withDoubleQuotes = "Hello World";
const withBackticks = `Hello World`;

console.log("Creating Strings:");
console.log("  Single quotes: '" + withSingleQuotes + "'");
console.log("  Double quotes: \"" + withDoubleQuotes + "\"");
console.log("  Backticks:     `" + withBackticks + "`");

// Automation-relevant string examples
console.log("\n🤖 Automation Examples:");
const baseUrl = "https://www.saucedemo.com";
const username = "standard_user";
const password = "secret_sauce";
const cssSelector = "#login-button";
const xpathSelector = "//button[@type='submit']";

console.log("  Base URL:", baseUrl);
console.log("  Username:", username);
console.log("  Password:", password);
console.log("  CSS Selector:", cssSelector);
console.log("  XPath:", xpathSelector);

// String properties and methods
console.log("\n📏 String Properties:");
const message = "Playwright Testing";
console.log("  Text:", message);
console.log("  Length:", message.length);
console.log("  Uppercase:", message.toUpperCase());
console.log("  Lowercase:", message.toLowerCase());
console.log("  First char:", message[0]);
console.log("  Last char:", message[message.length - 1]);

// Escaping special characters
console.log("\n🔤 Special Characters:");
const withNewline = "Line 1\nLine 2";
const withTab = "Column1\tColumn2";
const withQuotes = "He said \"Hello!\"";
const withBackslash = "Path: C:\\Users\\test";

console.log("  Newline:");
console.log(withNewline);
console.log("  Tab:", withTab);
console.log("  Quotes:", withQuotes);
console.log("  Backslash:", withBackslash);


// ═══════════════════════════════════════
// 2. NUMBER - Numeric Data
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔢 NUMBER - Numeric Data\n");

// JavaScript has only ONE number type (no int vs float)
const integer = 42;
const decimal = 99.99;
const negative = -50;
const scientific = 2.5e6;  // 2,500,000

console.log("Number Types:");
console.log("  Integer:", integer);
console.log("  Decimal:", decimal);
console.log("  Negative:", negative);
console.log("  Scientific:", scientific);

// Automation-relevant numbers
console.log("\n⏱️ Automation Numbers:");
const timeout = 30000;       // 30 seconds in ms
const retryCount = 3;
const maxItems = 100;
const priceLimit = 49.99;
const port = 3000;

console.log("  Timeout:", timeout, "ms");
console.log("  Retry Count:", retryCount);
console.log("  Max Items:", maxItems);
console.log("  Price Limit: $" + priceLimit);
console.log("  Server Port:", port);

// Number operations
console.log("\n🧮 Basic Math:");
const a = 10;
const b = 3;
console.log("  a =", a, ", b =", b);
console.log("  a + b =", a + b);
console.log("  a - b =", a - b);
console.log("  a * b =", a * b);
console.log("  a / b =", a / b);
console.log("  a % b =", a % b, "(remainder/modulo)");
console.log("  a ** b =", a ** b, "(power)");

// Special number values
console.log("\n⚠️ Special Numbers:");
console.log("  Infinity:", Infinity);
console.log("  -Infinity:", -Infinity);
console.log("  NaN (Not a Number):", NaN);
console.log("  Max Safe Integer:", Number.MAX_SAFE_INTEGER);

// Parsing strings to numbers
console.log("\n🔄 String to Number Conversion:");
const numString = "42";
const floatString = "99.99";
console.log("  parseInt('42'):", parseInt("42"));
console.log("  parseFloat('99.99'):", parseFloat("99.99"));
console.log("  Number('42'):", Number("42"));
console.log("  +'42' (unary plus):", +"42");


// ═══════════════════════════════════════
// 3. BOOLEAN - True/False
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n✅ BOOLEAN - True/False\n");

// Only two possible values
const isLoggedIn = true;
const hasErrors = false;

console.log("Boolean Values:");
console.log("  isLoggedIn:", isLoggedIn);
console.log("  hasErrors:", hasErrors);

// Automation-relevant booleans
console.log("\n🤖 Automation Booleans:");
const isHeadless = true;
const debugMode = false;
const takeScreenshot = true;
const slowMotion = false;
const videoRecord = true;

console.log("  Headless mode:", isHeadless);
console.log("  Debug mode:", debugMode);
console.log("  Screenshot:", takeScreenshot);
console.log("  Slow motion:", slowMotion);
console.log("  Video record:", videoRecord);

// Booleans from comparisons
console.log("\n🔍 Comparison Results (always boolean):");
const score = 85;
console.log("  score =", score);
console.log("  score > 80:", score > 80);
console.log("  score < 50:", score < 50);
console.log("  score === 85:", score === 85);
console.log("  score !== 100:", score !== 100);

// Boolean logic
console.log("\n🧠 Boolean Operations:");
const x = true;
const y = false;
console.log("  x = true, y = false");
console.log("  x && y (AND):", x && y);
console.log("  x || y (OR):", x || y);
console.log("  !x (NOT):", !x);
console.log("  !y (NOT):", !y);


// ═══════════════════════════════════════
// TYPE CHECKING WITH TYPEOF
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔍 TYPE CHECKING - typeof operator\n");

console.log("typeof 'hello':", typeof "hello");
console.log("typeof 42:", typeof 42);
console.log("typeof 3.14:", typeof 3.14);
console.log("typeof true:", typeof true);
console.log("typeof false:", typeof false);
console.log("typeof undefined:", typeof undefined);


// ═══════════════════════════════════════
// PRIMITIVES ARE IMMUTABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔒 PRIMITIVES ARE IMMUTABLE\n");

let greeting = "Hello";
console.log("Original:", greeting);

// This creates a NEW string, doesn't modify the original
greeting = greeting + " World";
console.log("After concatenation:", greeting);

// String methods return NEW strings
const upper = greeting.toUpperCase();
console.log("Uppercase (new string):", upper);
console.log("Original unchanged:", greeting);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 PRIMITIVE TYPES SUMMARY\n");

console.log("┌──────────┬──────────────────────────────────┐");
console.log("│ Type     │ Examples                         │");
console.log("├──────────┼──────────────────────────────────┤");
console.log("│ string   │ 'hello', \"world\", `template`     │");
console.log("│ number   │ 42, 3.14, -10, 2.5e6             │");
console.log("│ boolean  │ true, false                      │");
console.log("└──────────┴──────────────────────────────────┘");

console.log("\n💡 Key Points:");
console.log("  • Primitives are stored directly in memory");
console.log("  • Primitives are immutable (cannot be changed)");
console.log("  • Use typeof to check the type of a value");
console.log("  • Strings are the most common type in automation");

console.log("\n═══════════════════════════════════════\n");
