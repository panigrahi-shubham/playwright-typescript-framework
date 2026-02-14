/**
 * ============================================
 * 05 - Modules: ES Modules (import/export) ⭐
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * ES Modules are the MODERN standard for JavaScript.
 * This is what you'll use in Playwright & TypeScript.
 * 
 * NOTE: This file teaches ESM concepts but runs as
 * CommonJS because our project defaults to CJS.
 * The syntax shown in comments is exactly what
 * you'll write in your Playwright .ts/.mjs files.
 * 
 * Run: node 05_modules_esm.js
 */

console.log("═══════════════════════════════════════");
console.log("   MODULES — ES MODULES (import/export)");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. NAMED EXPORTS
// ═══════════════════════════════════════
console.log("📌 NAMED EXPORTS\n");

// Named exports let you export MULTIPLE items from one file.
// Each item has a specific name that importers must use.

// --- file: utils/priceHelper.js ---
//
// // Method 1: Export inline (most common)
// export function calculateBulkPrice(unitPrice, quantity, discount = 0) {
//     return unitPrice * quantity * (1 - discount);
// }
//
// export function formatPrice(price) {
//     return `$${price.toFixed(2)}`;
// }
//
// export const TAX_RATE = 0.18;
//
// // Method 2: Export at the bottom (alternative)
// function helperA() { ... }
// function helperB() { ... }
// export { helperA, helperB };

// Simulating named exports for demonstration:
const namedExports = {
    calculateBulkPrice: (unitPrice, quantity, discount = 0) => {
        return unitPrice * quantity * (1 - discount);
    },
    formatPrice: (price) => `$${price.toFixed(2)}`,
    TAX_RATE: 0.18
};

console.log("  Named exports from 'priceHelper.js':");
console.log(`    formatPrice(250): ${namedExports.formatPrice(250)}`);
console.log(`    calculateBulkPrice(10, 100, 0.1): ${namedExports.calculateBulkPrice(10, 100, 0.1)}`);
console.log(`    TAX_RATE: ${namedExports.TAX_RATE}`);

// Importing named exports:
// import { calculateBulkPrice, formatPrice, TAX_RATE } from './utils/priceHelper.js';
//
// Key rule: the NAME must match exactly!
// import { formatPrice }   ← ✅ name matches
// import { fmtPrice }      ← ❌ name doesn't match, will be undefined
//
// You CAN rename with 'as':
// import { formatPrice as fmtPrice } from './utils/priceHelper.js';


// ═══════════════════════════════════════
// 2. DEFAULT EXPORTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 DEFAULT EXPORTS\n");

// Default export = ONE main thing per file.
// Convention: use for classes or main functions.
// No curly braces when importing!

// --- file: pages/SearchPage.js ---
//
// export default class SearchPage {
//     constructor(page) {
//         this.page = page;
//         this.searchBox = '#search-box';
//         this.searchBtn = '#search-btn';
//         this.results = '.results';
//     }
//
//     async search(query) {
//         await this.page.fill(this.searchBox, query);
//         await this.page.click(this.searchBtn);
//     }
// }

// Importing default exports:
// import SearchPage from './pages/SearchPage.js';     ← no curly braces!
// import MySearchPage from './pages/SearchPage.js';   ← ANY name works!
// import SP from './pages/SearchPage.js';             ← ANY name works!
//
// The importer CHOOSES the name (no curly braces = default import)

// Simulating for demonstration:
class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchBox = "#search-box";
        this.searchBtn = "#search-btn";
    }
    async search(query) {
        console.log(`    Filling ${this.searchBox} with "${query}"`);
        console.log(`    Clicking ${this.searchBtn}`);
    }
}

console.log("  Default export: SearchPage class");
const searchPage = new SearchPage("mockPage");
searchPage.search("cotton fabric");


// ═══════════════════════════════════════
// 3. COMBINING DEFAULT + NAMED EXPORTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 COMBINING DEFAULT + NAMED EXPORTS\n");

// A file can have ONE default export AND multiple named exports.
// This is common in Playwright projects.

// --- file: pages/SearchPage.js ---
// export default class SearchPage { ... }
// export const SEARCH_URL = '/search';
// export const SEARCH_TIMEOUT = 10000;

// Importing both:
// import SearchPage, { SEARCH_URL, SEARCH_TIMEOUT } from './pages/SearchPage.js';
//        ↑ default      ↑ named exports (curly braces)

console.log("  Import pattern for combined exports:");
console.log("    import SearchPage, { SEARCH_URL, SEARCH_TIMEOUT }");
console.log("    from './pages/SearchPage.js';");
console.log("");
console.log("    • SearchPage    → default (no braces)");
console.log("    • SEARCH_URL    → named (with braces)");
console.log("    • SEARCH_TIMEOUT → named (with braces)");


// ═══════════════════════════════════════
// 4. NAMED vs DEFAULT — WHEN TO USE WHICH
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 NAMED vs DEFAULT — WHEN TO USE WHICH\n");

// DEFAULT export → ONE main thing per file
//   Use for: Page object classes, main utilities
//   Syntax:  export default class SearchPage { ... }
//   Import:  import SearchPage from '...'
//   Note:    Importer can name it anything

// NAMED exports → multiple items from one file
//   Use for: Constants, utility functions, config values
//   Syntax:  export function formatPrice() { ... }
//   Import:  import { formatPrice } from '...'
//   Note:    Name must match exactly (or use 'as' to rename)

console.log("  ┌──────────────────┬─────────────────────┬────────────────────────┐");
console.log("  │ Feature          │ Default Export       │ Named Export           │");
console.log("  ├──────────────────┼─────────────────────┼────────────────────────┤");
console.log("  │ Count per file   │ ONE only             │ Multiple allowed       │");
console.log("  │ Import syntax    │ import X from '...'  │ import { X } from '..' │");
console.log("  │ Naming           │ Importer chooses     │ Must match exactly     │");
console.log("  │ Rename           │ Automatic (any name) │ import { X as Y }      │");
console.log("  │ Best for         │ Classes, main func   │ Utils, constants       │");
console.log("  │ Convention       │ PascalCase classes    │ camelCase/UPPER funcs  │");
console.log("  └──────────────────┴─────────────────────┴────────────────────────┘");


// ═══════════════════════════════════════
// 5. HOW PLAYWRIGHT PROJECTS USE MODULES ⭐
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐ HOW PLAYWRIGHT PROJECTS USE MODULES\n");

// Every file in your Playwright project will have imports at the top.
// Here's what a real project looks like:

console.log("  📁 playwright.config.ts:");
console.log("    import { defineConfig, devices } from '@playwright/test';");
console.log("    // defineConfig = named export from the @playwright/test package");

console.log("\n  📁 tests/search.spec.ts:");
console.log("    import { test, expect } from '@playwright/test';     ← named");
console.log("    import SearchPage from '../pages/SearchPage';        ← default");
console.log("    import { testData } from '../test-data/searchData';  ← named");
console.log("    import { BASE_URL, TIMEOUTS } from '../utils/constants'; ← named");

console.log("\n  📁 pages/SearchPage.ts:");
console.log("    export default class SearchPage {    ← default export");
console.log("      constructor(page) { ... }");
console.log("    }");

console.log("\n  📁 utils/constants.ts:");
console.log("    export const BASE_URL = 'https://b2b-platform.com';  ← named");
console.log("    export const TIMEOUTS = { short: 5000, long: 30000 }; ← named");


// ═══════════════════════════════════════
// 6. YOUR FRAMEWORK'S MODULE STRUCTURE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 YOUR FRAMEWORK'S MODULE STRUCTURE\n");

// Preview of how your B2B framework files will be organized:

console.log("  playwright-b2b-automation/");
console.log("  ├── pages/");
console.log("  │   ├── BasePage.ts          → export default class BasePage");
console.log("  │   ├── SearchPage.ts        → export default class SearchPage extends BasePage");
console.log("  │   ├── ProductDetailPage.ts → export default class ProductDetailPage");
console.log("  │   └── MessageCenterPage.ts → export default class MessageCenterPage");
console.log("  ├── utils/");
console.log("  │   ├── constants.ts         → export const BASE_URL, TIMEOUTS...");
console.log("  │   └── commonActions.ts     → export function retry(), screenshot()...");
console.log("  ├── test-data/");
console.log("  │   └── searchData.ts        → export const searchTestData = [...]");
console.log("  ├── tests/");
console.log("  │   ├── search.spec.ts       → import SearchPage from '../pages/SearchPage'");
console.log("  │   └── pdp.spec.ts          → import ProductDetailPage from '../pages/PDP'");
console.log("  └── playwright.config.ts     → import { defineConfig } from '@playwright/test'");

console.log("\n  Every file imports what it needs and exports what others need.");
console.log("  Clean. Organized. Professional. 🎯");


// ═══════════════════════════════════════
// 7. THE DEBUG CHALLENGE — COMMON BUG! 🐛
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🐛 COMMON MODULE BUG\n");

// This is one of the most common bugs with modules:

console.log("  --- pages/SearchPage.js ---");
console.log("  export default class SearchPage { ... }\n");

console.log("  --- tests/search.test.js ---");
console.log("  ❌ import { SearchPage } from './pages/SearchPage.js';");
console.log("     → curly braces = named import, but SearchPage is DEFAULT!\n");
console.log("  ✅ import SearchPage from './pages/SearchPage.js';");
console.log("     → no curly braces = default import ✅\n");

console.log("  💡 Error message: 'SearchPage is not a constructor'");
console.log("     or 'SearchPage is undefined'");
console.log("  💡 When you see this → check your import statement!\n");

// Another common mistake:
console.log("  ❌ import SearchPage from 'SearchPage';         ← missing ./");
console.log("  ✅ import SearchPage from './pages/SearchPage';  ← correct path");
console.log("\n  Without ./ → Node looks for a package in node_modules");
console.log("  With ./    → Node looks for a local file (relative path)");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ES MODULES SUMMARY\n");

console.log("  Named exports:");
console.log("    • export function fn() { }    → import { fn } from '...'");
console.log("    • export const X = value      → import { X } from '...'");
console.log("    • Names must match (or use 'as' to rename)");

console.log("\n  Default exports:");
console.log("    • export default class X { }  → import X from '...'");
console.log("    • ONE default per file, importer chooses name");
console.log("    • No curly braces in the import!");

console.log("\n  Playwright conventions:");
console.log("    • Page classes → default export");
console.log("    • Utils, constants → named exports");
console.log("    • test, expect → named imports from @playwright/test");

console.log("\n═══════════════════════════════════════\n");
