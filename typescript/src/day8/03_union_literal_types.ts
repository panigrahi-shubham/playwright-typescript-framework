/**
 * ============================================
 * 03 — Union Types & Literal Types
 * ============================================
 *
 * Day 8: TypeScript Fundamentals
 * A variable can be MORE than one type using
 * union types. Literal types restrict to exact values.
 *
 * Run: npx ts-node typescript/src/day8/03_union_literal_types.ts
 */

console.log("═══════════════════════════════════════");
console.log("   UNION TYPES & LITERAL TYPES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. UNION TYPES — | OPERATOR
// ═══════════════════════════════════════
console.log("📌 Union Types — The | Operator\n");

// Use | (pipe) when a value can legitimately be one of several types:

// Result count is null before search runs, then a number
let resultCount: number | null = null;
console.log("  resultCount (before search):", resultCount);
resultCount = 25;
console.log("  resultCount (after search):", resultCount);
// resultCount = "many";   // ❌ ERROR: string not in number | null

// Product ID — comes as string from URL, number from database
let productId: string | number;
productId = "PROD-123";   // ✅ string
console.log("  productId (string):", productId);
productId = 456;           // ✅ number
console.log("  productId (number):", productId);
// productId = true;       // ❌ ERROR: boolean not in string | number


// ═══════════════════════════════════════
// 2. TYPE NARROWING — TS TRACKS TYPES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Type Narrowing — TS Tracks Types in Branches\n");

// TypeScript narrows the type inside if/else blocks automatically!

function displayMessage(message: string | string[]): void {
    if (Array.isArray(message)) {
        // TS KNOWS: message is string[] here
        message.forEach(msg => console.log(`    📩 ${msg}`));
    } else {
        // TS KNOWS: message is string here
        console.log(`    📩 ${message}`);
    }
}

console.log("  Single message:");
displayMessage("Order confirmed!");

console.log("  Array of messages:");
displayMessage(["Item shipped", "Tracking: TRK-456", "ETA: 3 days"]);

// 🔑 Type narrowing is POWERFUL and has NO direct equivalent in Java.
//    After Array.isArray(), TS gives you array methods.
//    In the else, TS gives you string methods.

// Another narrowing example with typeof:
function formatId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();      // TS knows: string → .toUpperCase() available
    } else {
        return `ID-${id.toString()}`;  // TS knows: number → .toString() available
    }
}
console.log("\n  formatId('prod-123'):", formatId("prod-123"));
console.log("  formatId(456):", formatId(456));


// ═══════════════════════════════════════
// 3. LITERAL TYPES — EXACT VALUES AS TYPES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Literal Types — Restrict to Exact Values\n");

// Instead of just string, restrict to SPECIFIC strings:
let orderStatus: "pending" | "confirmed" | "shipped" | "delivered";
orderStatus = "confirmed";   // ✅
// orderStatus = "cancelled";  // ❌ ERROR — not in the list!

console.log("  orderStatus:", orderStatus);

// This is AMAZING for test framework configuration!
// Catches typos at compile time, not at runtime:

type Browser = "chromium" | "firefox" | "webkit";
type TestEnv = "staging" | "production" | "local";
type LogLevel = "debug" | "info" | "warn" | "error";

let testBrowser: Browser = "chromium";  // ✅
// let testBrowser2: Browser = "safari"; // ❌ ERROR — catches typo at compile time!

let testEnv: TestEnv = "staging";       // ✅
let logLevel: LogLevel = "info";        // ✅

console.log("  testBrowser:", testBrowser);
console.log("  testEnv:", testEnv);
console.log("  logLevel:", logLevel);

// Numeric literal types work too:
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4;   // ✅
// let roll2: DiceRoll = 7; // ❌ ERROR — not a valid dice value


// ═══════════════════════════════════════
// 4. COMBINING UNIONS + NARROWING
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Combining Unions with Narrowing\n");

// Real-world B2B example:
type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

function handlePayment(status: PaymentStatus, amount: number): string {
    switch (status) {
        case "pending":
            return `⏳ Payment of $${amount} is pending`;
        case "completed":
            return `✅ Payment of $${amount} completed successfully`;
        case "failed":
            return `❌ Payment of $${amount} failed — retry needed`;
        case "refunded":
            return `↩️ Payment of $${amount} has been refunded`;
        // No default needed — TS knows all cases are covered!
    }
}

console.log(" ", handlePayment("completed", 250));
console.log(" ", handlePayment("pending", 1000));
console.log(" ", handlePayment("failed", 500));

// 💡 Playwright relevance:
// Playwright uses literal types everywhere:
//   await page.click('#btn', { button: 'left' | 'right' | 'middle' });
//   browser.newContext({ colorScheme: 'dark' | 'light' | 'no-preference' });


// ═══════════════════════════════════════
// 5. UNION WITH null — NULLABLE TYPES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Nullable Types — Union with null\n");

// In strict mode, you must EXPLICITLY allow null:
function findProduct(id: number): string | null {
    const products: Record<number, string> = {
        1: "Cotton Shirt",
        2: "Silk Scarf",
        3: "Denim Jacket"
    };
    return products[id] || null;  // Returns null if not found
}

const found = findProduct(1);
const notFound = findProduct(99);

console.log("  findProduct(1):", found);
console.log("  findProduct(99):", notFound);

// Must check for null before using string methods:
if (found) {
    console.log("  found.toUpperCase():", found.toUpperCase());  // TS knows: string here
}

if (notFound) {
    console.log("  This won't print — notFound is null");
} else {
    console.log("  notFound is null — handled safely! ✅");
}


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 UNION & LITERAL TYPES SUMMARY\n");

console.log("  • Union type:    string | number | null");
console.log("  • Literal type:  'chromium' | 'firefox' | 'webkit'");
console.log("  • Type narrowing: TS auto-narrows in if/else and switch");
console.log("  • typeof check:  typeof x === 'string' narrows to string");
console.log("  • Array.isArray: narrows union to array type");
console.log("  • Nullable:      string | null — forces null check before use");
console.log("  • Playwright:    uses literal types for button, colorScheme, etc.");

console.log("\n═══════════════════════════════════════\n");

export { };
