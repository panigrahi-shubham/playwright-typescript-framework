/**
 * ============================================
 * 05 — Generics Introduction
 * ============================================
 *
 * Day 9: Interfaces, Type Guards & Advanced Types
 * Generics let you create REUSABLE types and functions
 * that work with different data types. Like Java's
 * List<T> and Map<K, V>.
 *
 * Run: npx ts-node 05_generics_intro.ts
 */

console.log("═══════════════════════════════════════");
console.log("   GENERICS — INTRODUCTION");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. THE PROBLEM — WITHOUT GENERICS
// ═══════════════════════════════════════
console.log("📌 The Problem — Without Generics\n");

// Without generics, you'd need separate functions for each type:
function firstString(arr: string[]): string | undefined { return arr[0]; }
function firstNumber(arr: number[]): number | undefined { return arr[0]; }
function firstBoolean(arr: boolean[]): boolean | undefined { return arr[0]; }

console.log("  firstString(['cotton', 'silk']):", firstString(["cotton", "silk"]));
console.log("  firstNumber([100, 250, 50]):", firstNumber([100, 250, 50]));
console.log("  firstBoolean([true, false]):", firstBoolean([true, false]));

console.log("\n  ⚠️ Problem: Same logic duplicated 3 times!");
console.log("     What if you need it for 10 types? 100 types?");
console.log("     → Generics solve this with ONE function for ALL types.\n");


// ═══════════════════════════════════════
// 2. GENERIC FUNCTIONS — ONE FUNCTION, ANY TYPE
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 Generic Functions\n");

// <T> is a "type parameter" — a placeholder for any type
// T is a convention (like Java) — stands for "Type"
function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

// TypeScript infers T automatically from the argument:
console.log("  first(['cotton', 'silk']):", first(["cotton", "silk"]));          // T = string
console.log("  first([100, 250, 50]):", first([100, 250, 50]));                 // T = number
console.log("  first([true, false]):", first([true, false]));                    // T = boolean

// You CAN specify T explicitly (rarely needed):
console.log("  first<string>(['a', 'b']):", first<string>(["a", "b"]));

// Another generic function — last element
function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

console.log("  last(['cotton', 'silk', 'linen']):", last(["cotton", "silk", "linen"]));
console.log("  last([100, 250, 50]):", last([100, 250, 50]));

// Generic function with two type parameters
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

console.log("  pair('cotton', 250):", pair("cotton", 250));           // [string, number]
console.log("  pair(true, 'success'):", pair(true, "success"));       // [boolean, string]


// ═══════════════════════════════════════
// 3. GENERIC INTERFACES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Generic Interfaces\n");

// The MOST practical use of generics — typed API responses!

interface APIResponse<T> {
    status: "success" | "error";
    data: T;
    timestamp: string;
}

// Product data
interface ProductData {
    id: string;
    name: string;
    price: number;
}

// Message data
interface MessageData {
    id: string;
    from: string;
    text: string;
}

// Create specific response types using the generic:
type ProductResponse = APIResponse<ProductData>;
type MessageListResponse = APIResponse<MessageData[]>;
type CountResponse = APIResponse<number>;

// Now each response type has fully typed .data:
const productRes: ProductResponse = {
    status: "success",
    data: { id: "PROD-001", name: "Cotton Shirt", price: 250 },
    timestamp: new Date().toISOString()
};

const messageRes: MessageListResponse = {
    status: "success",
    data: [
        { id: "MSG-001", from: "Buyer", text: "What's your MOQ?" },
        { id: "MSG-002", from: "Seller", text: "100 units minimum" }
    ],
    timestamp: new Date().toISOString()
};

const countRes: CountResponse = {
    status: "success",
    data: 42,
    timestamp: new Date().toISOString()
};

console.log("  ProductResponse.data:", productRes.data);
console.log("  MessageListResponse.data:", messageRes.data);
console.log("  CountResponse.data:", countRes.data);

console.log("\n  💡 ONE interface (APIResponse<T>) → infinite specific types!");
console.log("     → ProductResponse.data is typed as ProductData");
console.log("     → CountResponse.data is typed as number");


// ═══════════════════════════════════════
// 4. GENERIC WITH CONSTRAINTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Generic Constraints (extends)\n");

// Sometimes you need T to be "at least" a certain shape
// Use `extends` to constrain the generic

interface HasId {
    id: string;
}

// T must have at least an 'id' property
function findById<T extends HasId>(items: T[], id: string): T | undefined {
    return items.find(item => item.id === id);
}

const products: ProductData[] = [
    { id: "PROD-001", name: "Cotton Shirt", price: 250 },
    { id: "PROD-002", name: "Silk Fabric", price: 800 }
];

const messages: MessageData[] = [
    { id: "MSG-001", from: "Buyer", text: "Hello" },
    { id: "MSG-002", from: "Seller", text: "Hi there" }
];

// Works with ProductData (has id) ✅
const found1 = findById(products, "PROD-001");
console.log("  findById(products, 'PROD-001'):", found1);

// Works with MessageData (has id) ✅
const found2 = findById(messages, "MSG-002");
console.log("  findById(messages, 'MSG-002'):", found2);

// Won't work with plain numbers (no id) ❌
// findById([1, 2, 3], "1");  // ERROR: number doesn't have 'id'

console.log("\n  💡 T extends HasId = 'T can be anything, AS LONG AS it has an id'");


// ═══════════════════════════════════════
// 5. GENERIC UTILITY EXAMPLE — WRAPPER
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Practical Example — Generic Wrapper\n");

// A pattern you'll see in Playwright test helpers:
interface TestResult<T> {
    testName: string;
    passed: boolean;
    data: T;
    duration: number;  // ms
}

function createTestResult<T>(
    testName: string,
    passed: boolean,
    data: T,
    duration: number
): TestResult<T> {
    return { testName, passed, data, duration };
}

const loginResult = createTestResult(
    "Login Flow",
    true,
    { userId: "USR-001", token: "abc123" },
    1250
);

const searchResult = createTestResult(
    "Product Search",
    true,
    ["Cotton Shirt", "Silk Fabric", "Linen Cloth"],
    890
);

console.log("  Login test result:", loginResult);
console.log("  Search test result:", searchResult);
console.log("\n  → loginResult.data is { userId, token }");
console.log("  → searchResult.data is string[]");
console.log("  → TypeScript knows the exact type of .data!");


// ═══════════════════════════════════════
// 6. JAVA ↔ TYPESCRIPT GENERICS COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ TypeScript Generics Comparison\n");

console.log("  ┌────────────────────────────────┬────────────────────────────────┐");
console.log("  │ Java                           │ TypeScript                     │");
console.log("  ├────────────────────────────────┼────────────────────────────────┤");
console.log("  │ List<String>                   │ Array<string> or string[]      │");
console.log("  │ Map<String, Integer>           │ Map<string, number>            │");
console.log("  │ <T> T first(List<T> list)      │ function first<T>(arr: T[]): T │");
console.log("  │ <T extends Comparable>         │ <T extends HasId>              │");
console.log("  │ Type erasure at runtime        │ Types erased at compile time   │");
console.log("  │ Wildcard: ? extends X          │ No wildcard needed             │");
console.log("  └────────────────────────────────┴────────────────────────────────┘");

console.log("\n  💡 Syntax is nearly identical — angle brackets and all!");
console.log("     Your Java generics knowledge transfers directly.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 GENERICS SUMMARY\n");

console.log("  • Generic function:  function first<T>(arr: T[]): T");
console.log("  • Generic interface: interface APIResponse<T> { data: T }");
console.log("  • Constraint:        <T extends HasId> (T must have id)");
console.log("  • Multiple params:   <A, B> for two type parameters");
console.log("  • Inference:         TS usually infers T automatically");
console.log("  • Use case:          API responses, wrappers, utilities, collections");
console.log("  • 💡 Same concept as Java's <T>, List<T>, Map<K,V>");

console.log("\n═══════════════════════════════════════\n");

export { };
