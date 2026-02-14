/**
 * ============================================
 * 06 - ES6+ Features: Optional Chaining,
 *      Nullish Coalescing & Short-Circuit
 * ============================================
 * 
 * Day 5: Error Handling, Modules & ES6+
 * Modern JavaScript features that make your
 * code shorter, safer, and more professional.
 * Interviewers notice when you use these!
 * 
 * Run: node 06_es6_optional_nullish.js
 */

console.log("═══════════════════════════════════════");
console.log("   ES6+: OPTIONAL CHAINING & NULLISH");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. OPTIONAL CHAINING (?.) — Safe Property Access
// ═══════════════════════════════════════
console.log("📌 OPTIONAL CHAINING (?.)\n");

// Problem: accessing nested properties that might not exist CRASHES your code.
// product.supplier.name → TypeError if supplier is null/undefined!

const products = [
    {
        name: "Cotton Fabric",
        price: 800,
        // supplier exists with full details
        supplier: {
            name: "TexPro",
            verified: true,
            certs: ["ISO9001", "OEKO-TEX"],
            getRating: () => 4.5
        }
    },
    {
        name: "Thread Bundle",
        price: 50,
        // supplier is null — no supplier info available
        supplier: null
    },
    {
        name: "Silk Cloth",
        price: 1200,
        // supplier exists but has minimal info
        supplier: {
            name: "SilkCo"
            // No certs array, no getRating method
        }
    }
];

for (const product of products) {
    console.log(`  Product: ${product.name}`);

    // ❌ OLD WAY — verbose and ugly
    // const name = product.supplier && product.supplier.name;

    // ✅ OPTIONAL CHAINING — clean and safe
    // If ANY part of the chain is null/undefined, returns undefined (no crash!)
    const supplierName = product?.supplier?.name;
    console.log(`    Supplier name:  ${supplierName}`);       // "TexPro", undefined, "SilkCo"

    // ?. works on arrays too — safe index access
    const firstCert = product?.supplier?.certs?.[0];
    console.log(`    First cert:     ${firstCert}`);           // "ISO9001", undefined, undefined

    // ?. works on methods — safe method call
    // If the method doesn't exist, returns undefined instead of throwing
    const rating = product?.supplier?.getRating?.();
    console.log(`    Rating:         ${rating}`);               // 4.5, undefined, undefined

    console.log();
}

console.log("  💡 ?. reads as: 'if this exists, access the next thing'");
console.log("  💡 Replaces: if (obj && obj.prop && obj.prop.nested)\n");


// ═══════════════════════════════════════
// 2. NULLISH COALESCING (??) — Smart Defaults
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 NULLISH COALESCING (??)\n");

// ?? returns the RIGHT side ONLY if the left is null or undefined
// || returns the RIGHT side if left is ANY falsy value (0, "", false, null, undefined)

// This difference is CRITICAL when 0, "", or false are valid values!

// Example: Minimum Order Quantity (MOQ)
// MOQ of 0 means "no minimum" — it's a VALID value
// MOQ of null means "not specified" — use default

const productMOQs = [
    { name: "Fabric", moq: 100 },     // MOQ is 100
    { name: "Thread", moq: 0 },        // MOQ is 0 (no minimum — valid!)
    { name: "Silk", moq: null },        // MOQ not specified — need default
    { name: "Cotton", moq: undefined }  // MOQ not specified — need default
];

console.log("  MOQ with ?? vs ||:\n");
console.log("  Product   | moq   | moq ?? 1 | moq || 1 |");
console.log("  ─────────────────────────────────────────");

for (const p of productMOQs) {
    const withNullish = p.moq ?? 1;     // Only replaces null/undefined
    const withOr = p.moq || 1;          // Replaces ALL falsy (including 0!)

    const moqStr = String(p.moq).padEnd(9);
    const nullishStr = String(withNullish).padEnd(8);
    const orStr = String(withOr);

    console.log(`  ${p.name.padEnd(9)} | ${moqStr} | ${nullishStr} | ${orStr}`);
}

console.log("\n  ⚠️  Thread's MOQ is 0 (valid 'no minimum'):");
console.log("    moq ?? 1 → 0  ✅ keeps valid 0");
console.log("    moq || 1 → 1  ❌ treats 0 as falsy, replaces it — BUG!\n");

// More examples showing the difference
console.log("  More examples:");
console.log(`    ""    ?? "default" → "${"" ?? "default"}"  (keeps empty string)`);
console.log(`    ""    || "default" → ${"" || "default"}  (replaces empty string)`);
console.log(`    false ?? true      → ${false ?? true}   (keeps false)`);
console.log(`    false || true      → ${false || true}    (replaces false)`);
console.log(`    0     ?? 10        → ${0 ?? 10}     (keeps 0)`);
console.log(`    0     || 10        → ${0 || 10}    (replaces 0)`);
console.log(`    null  ?? "fallback"→ ${null ?? "fallback"} (replaces null — intended!)`);

console.log("\n  📌 RULE:");
console.log("    Use ?? when 0, '', or false are VALID values");
console.log("    Use || only when ALL falsy values should trigger default\n");


// ═══════════════════════════════════════
// 3. COMBINING ?. AND ??
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 COMBINING ?. AND ??\n");

// These two operators work beautifully together!
// ?. → safely access nested properties (returns undefined if missing)
// ?? → provide a fallback for undefined/null results

const product = {
    name: "Cotton T-Shirt",
    price: 250,
    supplier: null,
    tags: ["cotton", "premium"]
};

// Safely access AND provide default in ONE expression:
const supplierName = product?.supplier?.name ?? "Unknown";
const firstTag = product?.tags?.[0] ?? "untagged";
const rating = product?.supplier?.getRating?.() ?? "No rating";
const moq = product?.moq ?? 1;

console.log(`  Supplier:  ${supplierName}`);   // "Unknown" (supplier is null)
console.log(`  First tag: ${firstTag}`);        // "cotton"
console.log(`  Rating:    ${rating}`);           // "No rating"
console.log(`  MOQ:       ${moq}`);             // 1

// Playwright use case:
// const promoDiscount = (await promoText?.match(/\\d+%/))?.[0] ?? 'No discount';
console.log("\n  💡 ?. + ?? = safe access + smart default in ONE line!");


// ═══════════════════════════════════════
// 4. SHORT-CIRCUIT EVALUATION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 SHORT-CIRCUIT EVALUATION\n");

// && and || don't just return true/false — they return VALUES!
// This enables clean conditional logic without if statements.

// && → returns first falsy value, or last truthy value
// || → returns first truthy value, or last falsy value

// && — execute right side ONLY if left is truthy
const isLoggedIn = true;
isLoggedIn && console.log("  && example: Welcome back! ✅");  // Logs

const isAdmin = false;
isAdmin && console.log("  && example: Admin panel ready");     // Doesn't log

// || — use first truthy value as the result
const username = "" || "Guest";
console.log(`  || example: username = "${username}"`);  // "Guest"

const validName = "Shubham" || "Guest";
console.log(`  || example: validName = "${validName}"`);  // "Shubham"

// Practical: Conditionally add properties to an object
const headless = true;
const slowMo = 0;

// Using spread + && to conditionally add properties
const testConfig = {
    browser: "chromium",
    ...(headless && { headless: true }),
    ...(slowMo && { slowMo: parseInt(slowMo) })  // Won't add since slowMo is 0 (falsy)
};

console.log("\n  Conditional object properties:");
console.log("  testConfig:", testConfig);

// ⚠️ Note: slowMo is 0 which is falsy, so it's NOT included above.
// If 0 is a valid value, use ?? or explicit check instead:
const betterConfig = {
    browser: "chromium",
    ...(headless !== undefined && { headless }),
    ...(slowMo !== undefined && { slowMo })  // Now includes slowMo: 0
};
console.log("  betterConfig:", betterConfig);


// ═══════════════════════════════════════
// 5. TERNARY OPERATOR — One-Line If/Else
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 TERNARY OPERATOR\n");

// condition ? valueIfTrue : valueIfFalse
// Replaces simple if/else blocks

// Simple ternary
const count = 5;
const status = count > 0 ? "Results found" : "No results";
console.log(`  count = ${count} → "${status}"`);

// In variable assignment
const isProduction = false;
const baseUrl = isProduction
    ? "https://b2b-platform.com"
    : "https://staging.b2b-platform.com";
console.log(`  Environment: ${baseUrl}`);

// In Playwright assertions
const loggedIn = true;
const expectedTitle = loggedIn ? "Dashboard" : "Login Page";
console.log(`  Expected title: "${expectedTitle}"`);

// Nested ternary (use sparingly — readability drops fast!)
const severity = "major";
const priority = severity === "critical" ? "P0"
    : severity === "major" ? "P1"
        : severity === "minor" ? "P2"
            : "P3";
console.log(`  Severity "${severity}" → Priority ${priority}`);

console.log("\n  ⚠️  Nested ternaries are hard to read.");
console.log("  ⚠️  If more than 2 levels, use if/else instead.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ES6+ OPERATORS SUMMARY\n");

console.log("  • ?.  → optional chaining — safe nested access (no crash)");
console.log("  • ??  → nullish coalescing — default for null/undefined ONLY");
console.log("  • ||  → logical OR — default for ANY falsy value");
console.log("  • &&  → logical AND — execute right side if left is truthy");
console.log("  • ? : → ternary — inline if/else");
console.log("");
console.log("  🎯 Rule: Use ?? when 0, '', false are valid values");
console.log("  🎯 Rule: ?. + ?? together = safe access + smart default");
console.log("  🎯 Rule: Max 1-2 levels of nested ternary");

console.log("\n═══════════════════════════════════════\n");
