/**
 * ============================================
 * 05 — Enums
 * ============================================
 *
 * Day 8: TypeScript Fundamentals
 * Enums give friendly names to sets of values.
 * Prefer string enums — they're readable
 * in logs and debuggers.
 *
 * Run: npx ts-node typescript/src/day8/05_enums.ts
 */

console.log("═══════════════════════════════════════");
console.log("   ENUMS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. NUMERIC ENUMS — AUTO-INCREMENT
// ═══════════════════════════════════════
console.log("📌 Numeric Enums\n");

// Numeric enums auto-increment from 0
enum TestStatus {
    Pass,      // 0
    Fail,      // 1
    Skip,      // 2
    Pending    // 3
}

console.log("  TestStatus.Pass:", TestStatus.Pass);         // 0
console.log("  TestStatus.Fail:", TestStatus.Fail);         // 1
console.log("  TestStatus.Skip:", TestStatus.Skip);         // 2
console.log("  TestStatus.Pending:", TestStatus.Pending);   // 3

// You can set custom starting values:
enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
    ServerError = 500
}

console.log("\n  HttpStatus.OK:", HttpStatus.OK);           // 200
console.log("  HttpStatus.NotFound:", HttpStatus.NotFound); // 404

// Reverse mapping — get the NAME from the value (only numeric enums):
console.log("  HttpStatus[200]:", HttpStatus[200]);         // "OK"
console.log("  HttpStatus[404]:", HttpStatus[404]);         // "NotFound"


// ═══════════════════════════════════════
// 2. STRING ENUMS — PREFERRED ✨
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 String Enums — PREFERRED for Readability\n");

// String enums require explicit values for each member
// But they're MUCH more readable in logs, debuggers, and API responses!

enum Browser {
    Chromium = "chromium",
    Firefox = "firefox",
    WebKit = "webkit"
}

enum Environment {
    Local = "http://localhost:3000",
    Staging = "https://staging.b2b-platform.com",
    Production = "https://b2b-platform.com"
}

console.log("  Browser.Chromium:", Browser.Chromium);         // "chromium"
console.log("  Browser.Firefox:", Browser.Firefox);           // "firefox"
console.log("  Environment.Staging:", Environment.Staging);   // full URL!

// Real B2B example: message status flow
enum MessageStatus {
    Sent = "sent",
    Delivered = "delivered",
    Read = "read",
    Failed = "failed"
}

function updateMessageStatus(id: string, status: MessageStatus): void {
    console.log(`    Message ${id} → status: ${status}`);
}

console.log("\n  Updating message statuses:");
updateMessageStatus("MSG-001", MessageStatus.Sent);
updateMessageStatus("MSG-001", MessageStatus.Delivered);
updateMessageStatus("MSG-001", MessageStatus.Read);
// updateMessageStatus("MSG-001", "random");  // ❌ ERROR — only enum values allowed!


// ═══════════════════════════════════════
// 3. USING ENUMS IN FUNCTIONS & LOGIC
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Enums in Functions & Logic\n");

enum OrderStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Shipped = "shipped",
    Delivered = "delivered",
    Cancelled = "cancelled"
}

function getOrderEmoji(status: OrderStatus): string {
    switch (status) {
        case OrderStatus.Pending: return "⏳";
        case OrderStatus.Confirmed: return "✅";
        case OrderStatus.Shipped: return "🚚";
        case OrderStatus.Delivered: return "📦";
        case OrderStatus.Cancelled: return "❌";
    }
}

const statuses = [
    OrderStatus.Pending,
    OrderStatus.Confirmed,
    OrderStatus.Shipped,
    OrderStatus.Delivered,
    OrderStatus.Cancelled
];

for (const status of statuses) {
    console.log(`  ${getOrderEmoji(status)} ${status}`);
}


// ═══════════════════════════════════════
// 4. ENUM vs LITERAL TYPE — WHEN TO USE WHICH
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Enum vs Literal Type\n");

// LITERAL TYPE approach:
type BrowserLiteral = "chromium" | "firefox" | "webkit";
let myBrowser: BrowserLiteral = "chromium";  // ✅

// ENUM approach:
// enum Browser — already defined above
let myBrowser2: Browser = Browser.Chromium;  // ✅

console.log("  Literal type: 'chromium' (direct string value)");
console.log("  Enum:         Browser.Chromium (named constant)");

console.log("\n  ┌────────────────────┬──────────────────────────────┐");
console.log("  │ Feature            │ Enum vs Literal Type         │");
console.log("  ├────────────────────┼──────────────────────────────┤");
console.log("  │ Readability        │ Enum — named constants       │");
console.log("  │ Simplicity         │ Literal — less code          │");
console.log("  │ Iteration          │ Enum — can loop over values  │");
console.log("  │ Bundle size        │ Literal — zero runtime cost  │");
console.log("  │ Playwright uses    │ Literal types (no enums)     │");
console.log("  │ Your framework     │ Enums for status/config 👍   │");
console.log("  └────────────────────┴──────────────────────────────┘");

// 💡 Playwright prefers literal types ("chromium" | "firefox").
//    Use enums in YOUR framework for test status, environments, and config.


// ═══════════════════════════════════════
// 5. JAVA ↔ TYPESCRIPT ENUM COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ TypeScript Enum Comparison\n");

console.log("  ┌──────────────────────────────┬──────────────────────────────┐");
console.log("  │ Java                         │ TypeScript                   │");
console.log("  ├──────────────────────────────┼──────────────────────────────┤");
console.log("  │ enum Browser {               │ enum Browser {               │");
console.log("  │   CHROMIUM, FIREFOX, WEBKIT  │   Chromium = 'chromium',     │");
console.log("  │ }                            │   Firefox  = 'firefox',      │");
console.log("  │                              │   WebKit   = 'webkit'        │");
console.log("  │                              │ }                            │");
console.log("  ├──────────────────────────────┼──────────────────────────────┤");
console.log("  │ Browser.CHROMIUM             │ Browser.Chromium             │");
console.log("  │ Auto values (ordinal)        │ String enums need values     │");
console.log("  │ Can have methods             │ Cannot have methods          │");
console.log("  └──────────────────────────────┴──────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ENUMS SUMMARY\n");

console.log("  • Numeric enum:   enum Status { Pass, Fail }  (auto: 0, 1)");
console.log("  • String enum:    enum Browser { Chrome = 'chrome' }  (explicit)");
console.log("  • Prefer string enums — readable in logs and debuggers");
console.log("  • Use enums for: test status, environments, config options");
console.log("  • Playwright itself uses literal types, not enums");
console.log("  • Java enums are similar — TS string enums need explicit values");

console.log("\n═══════════════════════════════════════\n");

export { };
