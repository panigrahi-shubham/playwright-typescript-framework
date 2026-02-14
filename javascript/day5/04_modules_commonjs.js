/**
 * ============================================
 * 04 - Modules: CommonJS (require/exports)
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * Modules let you split code into separate files
 * and share functionality between them.
 * 
 * CommonJS is the ORIGINAL Node.js module system.
 * You'll see it in older projects and Node.js docs.
 * Uses require() to import, module.exports to export.
 * 
 * Run: node 04_modules_commonjs.js
 */

console.log("═══════════════════════════════════════");
console.log("   MODULES — COMMONJS (require/exports)");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. WHY MODULES MATTER
// ═══════════════════════════════════════
console.log("📌 WHY MODULES MATTER\n");

// Without modules: everything in ONE giant file.
// Imagine ALL your page objects, ALL your tests,
// ALL your utilities — in a single 5000-line file.
// Nightmare to maintain, debug, or share.
//
// Modules let you:
// 1. Split code into logical files
// 2. Share functions/classes between files
// 3. Keep each file focused and testable
// 4. Avoid naming conflicts (each file has its own scope)

console.log("  Without modules: Everything in one giant file 😱");
console.log("  With modules:    Each file does ONE thing 🎯\n");


// ═══════════════════════════════════════
// 2. TWO MODULE SYSTEMS
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 TWO MODULE SYSTEMS IN JAVASCRIPT\n");

// JavaScript has TWO module systems (confusing but important to know):
//
// 1. CommonJS (CJS) — this file
//    - Uses: require() and module.exports
//    - Used in: Node.js (default), older projects
//    - Loads: synchronously
//
// 2. ES Modules (ESM) — next file
//    - Uses: import and export
//    - Used in: Modern JS, TypeScript, Playwright
//    - Loads: asynchronously
//    - Has static analysis (better IDE support)

console.log("  ┌──────────────┬─────────────────────┬──────────────────────┐");
console.log("  │ Feature      │ CommonJS (CJS)      │ ES Modules (ESM)     │");
console.log("  ├──────────────┼─────────────────────┼──────────────────────┤");
console.log("  │ Import       │ require()           │ import               │");
console.log("  │ Export       │ module.exports      │ export / export def  │");
console.log("  │ Loading      │ Synchronous         │ Asynchronous         │");
console.log("  │ Used in      │ Node.js default     │ Modern JS/TS/PW      │");
console.log("  │ File ext     │ .js or .cjs         │ .mjs or .js (w/type) │");
console.log("  │ Tree-shaking │ No                  │ Yes                  │");
console.log("  └──────────────┴─────────────────────┴──────────────────────┘");

console.log("\n  💡 Learn both. Use ES Modules in new projects.");


// ═══════════════════════════════════════
// 3. COMMONJS EXPORTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 COMMONJS EXPORTS\n");

// In a real project, this would be in a separate file.
// We're simulating the pattern here for learning.

// === How module.exports works ===
// Each file has a special 'module.exports' object.
// Whatever you assign to it becomes available to other files.

// Pattern 1: Export an object with multiple items
// --- file: utils/priceHelper.js ---
// function calculateBulkPrice(unitPrice, quantity, discount = 0) {
//     return unitPrice * quantity * (1 - discount);
// }
// function formatPrice(price) {
//     return `$${price.toFixed(2)}`;
// }
// module.exports = { calculateBulkPrice, formatPrice };  ← exports BOTH

// Pattern 2: Export a single class or function
// --- file: pages/SearchPage.js ---
// class SearchPage {
//     constructor(page) { this.page = page; }
// }
// module.exports = SearchPage;  ← exports just the class

// Pattern 3: Add to exports one by one
// --- file: utils/constants.js ---
// module.exports.BASE_URL = 'https://b2b-platform.com';
// module.exports.TIMEOUT = 30000;

// Let's simulate it within this file:
const simulatedExports = {};

// Functions to "export"
function calculateBulkPrice(unitPrice, quantity, discount = 0) {
    return unitPrice * quantity * (1 - discount);
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Assign to our simulated exports (like module.exports = {...})
simulatedExports.calculateBulkPrice = calculateBulkPrice;
simulatedExports.formatPrice = formatPrice;

console.log("  Simulated module.exports contains:");
console.log("    calculateBulkPrice:", typeof simulatedExports.calculateBulkPrice);
console.log("    formatPrice:       ", typeof simulatedExports.formatPrice);
console.log("    formatPrice(250):  ", simulatedExports.formatPrice(250));
console.log("    bulkPrice(10,100,0.1):", simulatedExports.formatPrice(
    simulatedExports.calculateBulkPrice(10, 100, 0.1)
));


// ═══════════════════════════════════════
// 4. COMMONJS IMPORTS (require)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 COMMONJS IMPORTS (require)\n");

// require() loads a module and returns its module.exports value
//
// Pattern 1: Import everything
// const priceHelper = require('./utils/priceHelper');
// priceHelper.formatPrice(250);
//
// Pattern 2: Destructure specific items
// const { formatPrice, calculateBulkPrice } = require('./utils/priceHelper');
// formatPrice(250);
//
// Pattern 3: Import a class
// const SearchPage = require('./pages/SearchPage');
// const searchPage = new SearchPage(page);
//
// Pattern 4: Import Node.js built-in modules
// const path = require('path');    ← no ./ means it's a package
// const fs = require('fs');

// We can actually use require() since this IS a CommonJS file:
const path = require("path");
const os = require("os");

console.log("  Built-in module 'path':");
console.log("    path.basename('/users/test/file.js'):", path.basename("/users/test/file.js"));
console.log("    path.extname('test.spec.ts'):        ", path.extname("test.spec.ts"));

console.log("\n  Built-in module 'os':");
console.log("    os.platform():", os.platform());
console.log("    os.homedir():  ", os.homedir());

// Example of how a real Playwright project imports:
console.log("\n  📁 How Playwright projects use require():");
console.log("    const { test, expect } = require('@playwright/test');");
console.log("    const SearchPage = require('./pages/SearchPage');");
console.log("    const { BASE_URL } = require('./utils/constants');");


// ═══════════════════════════════════════
// 5. CJS FULL EXAMPLE (Simulated)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 FULL COMMONJS EXAMPLE (Simulated)\n");

// We'll simulate three files interacting:
// File 1: constants.js → exports config values
// File 2: helpers.js   → exports utility functions
// File 3: test.js      → imports and uses both

// --- Simulated constants.js ---
const constantsModule = {
    BASE_URL: "https://b2b-platform.com",
    TIMEOUTS: { short: 5000, medium: 10000, long: 30000 },
    BROWSERS: ["chromium", "firefox", "webkit"]
};

// --- Simulated helpers.js ---
const helpersModule = {
    formatPrice: (price) => `$${price.toFixed(2)}`,
    generateTestId: () => `test_${Math.floor(Math.random() * 900000 + 100000)}`,
    cleanSearchQuery: (query) => query.trim().toLowerCase().replace(/\s+/g, " ")
};

// --- Simulated test.js (importing from both) ---
// const { BASE_URL, TIMEOUTS } = require('./constants');
// const { formatPrice, generateTestId, cleanSearchQuery } = require('./helpers');

const { BASE_URL, TIMEOUTS } = constantsModule;
const { formatPrice: fmtPrice, generateTestId, cleanSearchQuery } = helpersModule;

console.log("  From constants.js:");
console.log("    BASE_URL:", BASE_URL);
console.log("    TIMEOUTS:", TIMEOUTS);

console.log("\n  From helpers.js:");
console.log("    formatPrice(250):             ", fmtPrice(250));
console.log("    generateTestId():             ", generateTestId());
console.log("    cleanSearchQuery('  COTTON  '):", cleanSearchQuery("  COTTON  "));


// ═══════════════════════════════════════
// 6. JAVA ↔ JAVASCRIPT MODULE COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 JAVA ↔ JAVASCRIPT MODULE COMPARISON\n");

// Java: import com.pages.SearchPage;
// JS:   const SearchPage = require('./pages/SearchPage');
//
// Java: package com.pages;            → file location IS the module in JS
// Java: public class = importable     → must use module.exports to export
// Java: One public class = one file   → one module.exports per file (convention)
// Java: classpath handles resolution  → use relative paths (./  ../)

console.log("  ┌────────────────────────────┬──────────────────────────────────┐");
console.log("  │ Java                       │ JavaScript (CommonJS)            │");
console.log("  ├────────────────────────────┼──────────────────────────────────┤");
console.log("  │ import com.pages.Search... │ const SP = require('./pages/SP') │");
console.log("  │ package com.pages          │ File location = module path      │");
console.log("  │ public class = exportable  │ module.exports = exportable      │");
console.log("  │ import static ...          │ const { fn } = require(...)      │");
console.log("  │ Classpath resolution       │ Relative paths (./  ../)         │");
console.log("  └────────────────────────────┴──────────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 COMMONJS MODULES SUMMARY\n");

console.log("  • module.exports = { ... } → export multiple items");
console.log("  • module.exports = MyClass  → export single item");
console.log("  • require('./path')         → import a local module");
console.log("  • require('name')           → import a package (no ./)");
console.log("  • const { a, b } = require('./mod') → destructured import");
console.log("  • Loads synchronously — blocking");
console.log("  • Default in Node.js — but ESM is the future ⭐");

console.log("\n═══════════════════════════════════════\n");
