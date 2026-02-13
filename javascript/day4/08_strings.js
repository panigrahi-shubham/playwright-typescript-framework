/**
 * ============================================
 * 08 - Strings: Methods & Playwright Patterns
 * ============================================
 * 
 * Day 4: Functions, Arrays & Strings
 * Strings are the backbone of testing: URLs,
 * selectors, text assertions, API bodies.
 * If you can manipulate strings, you can
 * handle any Playwright scenario.
 * 
 * Run: node 08_strings.js
 */

console.log("═══════════════════════════════════════");
console.log("   STRINGS — METHODS & TESTING PATTERNS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. ESSENTIAL STRING METHODS
// ═══════════════════════════════════════
console.log("📌 ESSENTIAL STRING METHODS\n");

const productName = " Premium Cotton Fabric - Grade A ";
console.log(`  Raw: "${productName}"`);

// LENGTH — number of characters (includes spaces!)
// ⚠️  .length is a PROPERTY, not a method — NO parentheses!
// Java: str.length()   ← method with ()
// JS:   str.length     ← property, NO ()
console.log("  .length:", productName.length);  // 35

// TRIM — remove whitespace from BOTH ends
// 🔥 THIS IS THE MOST IMPORTANT STRING METHOD FOR TESTING
console.log("\n  Trim methods:");
console.log(`  .trim():      "${productName.trim()}"`);
console.log(`  .trimStart():  "${productName.trimStart()}"`);
console.log(`  .trimEnd():   "${productName.trimEnd()}"`);

// CASE CONVERSION
console.log("\n  Case conversion:");
console.log("  .toLowerCase():", productName.trim().toLowerCase());
console.log("  .toUpperCase():", productName.trim().toUpperCase());


// ═══════════════════════════════════════
// 2. SEARCHING WITHIN STRINGS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SEARCHING WITHIN STRINGS\n");

const text = "Premium Cotton Fabric - Grade A";

// includes() — does it contain this substring?
// Java calls this .contains() — different name!
console.log("  includes('Cotton'):", text.includes("Cotton"));      // true
console.log("  includes('cotton'):", text.includes("cotton"));      // false (case-sensitive!)
console.log("  includes('Silk'):", text.includes("Silk"));          // false

// startsWith() / endsWith()
console.log("\n  startsWith('Premium'):", text.startsWith("Premium")); // true
console.log("  endsWith('Grade A'):", text.endsWith("Grade A"));      // true
console.log("  endsWith('Grade B'):", text.endsWith("Grade B"));      // false

// indexOf() — position of first occurrence, or -1 if not found
console.log("\n  indexOf('Cotton'):", text.indexOf("Cotton"));    // 8
console.log("  indexOf('Missing'):", text.indexOf("Missing"));    // -1 ⚠️ returns -1!


// ═══════════════════════════════════════
// 3. EXTRACTING PARTS OF STRINGS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 EXTRACTING PARTS\n");

const str = "Premium Cotton Fabric";

// slice(start, end) — extract from start up to (not including) end
console.log("  slice(0, 7):", str.slice(0, 7));        // "Premium"
console.log("  slice(8, 14):", str.slice(8, 14));      // "Cotton"
console.log("  slice(-6):", str.slice(-6));              // "Fabric" (last 6 chars)

// substring(start, end) — similar to slice, but no negative indices
console.log("  substring(8, 14):", str.substring(8, 14)); // "Cotton"


// ═══════════════════════════════════════
// 4. REPLACING TEXT
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 REPLACING TEXT\n");

// replace() — replaces FIRST match only
console.log("  'Grade A'.replace('A', 'B'):", "Grade A".replace("A", "B"));
// "Grade B"

// ⚠️  In Java, replace() replaces ALL occurrences.
// In JavaScript, replace() only replaces the FIRST!
console.log("  'a-b-c-d'.replace('-', '/'):", "a-b-c-d".replace("-", "/"));
// "a/b-c-d" ← only first dash replaced!

// replaceAll() — replaces ALL matches
console.log("  'a-b-c-d'.replaceAll('-', '/'):", "a-b-c-d".replaceAll("-", "/"));
// "a/b/c/d" ← all dashes replaced


// ═══════════════════════════════════════
// 5. SPLIT & JOIN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SPLIT & JOIN\n");

// split() — break string into array (same as Java!)
const csv = "Cotton,Silk,Wool,Linen";
const fabrics = csv.split(",");
console.log("  Split CSV:", fabrics);  // ["Cotton", "Silk", "Wool", "Linen"]

// join() — combine array into string (opposite of split)
console.log("  Join with ' | ':", fabrics.join(" | "));
// "Cotton | Silk | Wool | Linen"

// Practical: Parse breadcrumb navigation
const breadcrumb = "Home > Textiles > Cotton > Premium";
const crumbs = breadcrumb.split(" > ");
console.log("\n  Breadcrumb:", crumbs);
console.log("  Current page:", crumbs[crumbs.length - 1]);  // "Premium"

// padStart() — pad with characters (useful for formatting)
console.log("\n  padStart examples:");
console.log("  '42'.padStart(5, '0'):", "42".padStart(5, "0"));    // "00042"
console.log("  '7'.padStart(3, '0'):", "7".padStart(3, "0"));     // "007"


// ═══════════════════════════════════════
// 6. 🚨 WHY trim() IS NON-NEGOTIABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🚨 WHY trim() IS NON-NEGOTIABLE IN UI TESTING\n");

// Web elements ALMOST ALWAYS have hidden whitespace:
//   - Leading/trailing spaces
//   - Newlines (\n)
//   - Non-breaking spaces from CSS
//
// If you assert RAW text without trimming, your test fails
// even though the VISIBLE content is correct!

// Example of the problem:
const elementText = "  Cotton Fabric  \n";  // Hidden whitespace from DOM
const expected = "Cotton Fabric";

console.log(`  Raw element text: "${elementText}"`);
console.log(`  Expected:         "${expected}"`);
console.log("  Raw === Expected:", elementText === expected);       // false ❌
console.log("  Trimmed === Expected:", elementText.trim() === expected); // true ✅

console.log("\n  🔥 ALWAYS write:  expect(text.trim()).toBe('Expected')");
console.log("     NEVER write:   expect(text).toBe('Expected')");
console.log("\n  This single habit prevents hundreds of flaky test failures.");


// ═══════════════════════════════════════
// 7. JAVA ↔ JAVASCRIPT STRING COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 JAVA ↔ JAVASCRIPT STRING COMPARISON\n");

console.log("  ┌──────────────────┬────────────────────┬──────────────────────┐");
console.log("  │ Operation        │ Java               │ JavaScript           │");
console.log("  ├──────────────────┼────────────────────┼──────────────────────┤");
console.log("  │ Length           │ str.length()       │ str.length  (no ())  │");
console.log("  │ Compare          │ str.equals('test') │ str === 'test'       │");
console.log("  │ Contains         │ str.contains('x')  │ str.includes('x')    │");
console.log("  │ Split            │ str.split(',')     │ str.split(',')  Same!│");
console.log("  │ Trim             │ str.trim()         │ str.trim()      Same!│");
console.log("  │ Replace          │ str.replace('a','b')│ str.replace('a','b')│");
console.log("  │ Not found        │ indexOf → -1       │ indexOf → -1   Same!│");
console.log("  └──────────────────┴────────────────────┴──────────────────────┘");

console.log("\n  Good news: Most string methods are identical!");
console.log("  Key differences: .length (no ()), .includes() not .contains(),");
console.log("  === instead of .equals(), replace() is first-match only in JS.");


// ═══════════════════════════════════════
// 8. STRINGS IN PLAYWRIGHT — 6 Daily Patterns
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 STRINGS IN PLAYWRIGHT — 6 Patterns You'll Use Daily\n");

// 1. TRIM before assertion (always do this!)
console.log("  1. TRIM before assertion:");
const title = "  Cotton Fabric  ";
console.log(`     Raw: "${title}" → Trimmed: "${title.trim()}"`);
// expect(title.trim()).toBe("Cotton Fabric");

// 2. CASE-INSENSITIVE comparison
console.log("\n  2. Case-insensitive compare:");
const status = "  DELIVERED  ";
console.log(`     "${status.trim().toLowerCase()}" === "delivered":`, status.trim().toLowerCase() === "delivered");

// 3. PARTIAL text match
console.log("\n  3. Partial match:");
const notification = "You have a message from Supplier ABC";
console.log(`     Contains 'message from':`, notification.includes("message from"));

// 4. EXTRACT number from text
console.log("\n  4. Extract number from price text:");
const priceText = "$12.50/unit";
const cleaned = priceText.replace("$", "").replace("/unit", "");
const price = parseFloat(cleaned);
console.log(`     "${priceText}" → ${price}`);  // 12.5

// 5. DYNAMIC locators with template literals
console.log("\n  5. Dynamic locators:");
const categoryName = "Electronics";
const selector = `[data-category="${categoryName}"]`;
console.log(`     Selector: ${selector}`);
// await page.locator(selector).click();

// 6. SPLIT text to extract parts
console.log("\n  6. Split for breadcrumbs:");
const nav = "Home > Textiles > Cotton > Premium";
const parts = nav.split(" > ");
console.log(`     Last crumb: "${parts[parts.length - 1]}"`);  // "Premium"


// ═══════════════════════════════════════
// 9. REGEX — Quick Introduction
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 REGULAR EXPRESSIONS — Quick Introduction\n");

// Regex = patterns for matching text. Playwright uses them for
// flexible matching in assertions and locators.
// You don't need to master regex today — just know it exists.

// Extract numbers from text
const resultText = "Showing 25 of 150 results";
const numbersFound = resultText.match(/\d+/g);
console.log(`  Text: "${resultText}"`);
console.log("  Numbers found:", numbersFound);  // ["25", "150"]

// Test if a string matches a pattern
const email = "test@example.com";
const hasAtSign = /@/.test(email);
console.log(`\n  Email "${email}" contains @:`, hasAtSign);  // true

// In Playwright:
// await expect(page).toHaveURL(/.*\/search\?q=cotton/);
// await page.locator('text=/cotton/i').click(); // i = case-insensitive
console.log("\n  💡 We'll go deeper into regex when building Playwright tests.");
console.log("     For now, know it's a tool for pattern matching in strings.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 STRINGS SUMMARY\n");

console.log("  • .length is a PROPERTY (no parentheses!)");
console.log("  • ALWAYS .trim() before asserting text in tests");
console.log("  • .includes() = JS version of Java's .contains()");
console.log("  • === for comparison (not .equals())");
console.log("  • .replace() only replaces FIRST match; use .replaceAll()");
console.log("  • .split() → array,  .join() → string");
console.log("  • Template literals `${var}` for dynamic strings");
console.log("  • Regex exists for advanced pattern matching");

console.log("\n═══════════════════════════════════════\n");
