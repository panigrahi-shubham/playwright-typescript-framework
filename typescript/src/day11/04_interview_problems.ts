/**
 * ============================================
 * 04 — Module 3 Complete Review + Interview Problems
 * ============================================
 *
 * Day 11: Advanced Patterns, tsconfig & Wrap-Up
 * Complete cheat sheet for Days 8-11 + interview
 * problems combining ALL Module 3 concepts.
 * Includes the as-const debug challenge.
 *
 * Run: npx ts-node 04_interview_problems.ts
 */

console.log("═══════════════════════════════════════");
console.log("   MODULE 3 REVIEW & INTERVIEW PROBLEMS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// MODULE 3 CHEAT SHEET
// ═══════════════════════════════════════
console.log("📌 Module 3 Cheat Sheet (Days 8-11)\n");

console.log("  ── Day 8: Types & Annotations ──────");
console.log("  let name: string = 'Shirt';");
console.log("  let price: number = 250;");
console.log("  let id: string | number = 'P-1';    ← union");
console.log("  let status: 'pass' | 'fail';        ← literal");
console.log("  let data: unknown;                   ← safe any");
console.log("  let items: string[] = [];");
console.log("  let pair: [string, number];          ← tuple");
console.log("  enum Browser { Chrome, Firefox }");

console.log("\n  ── Day 9: Interfaces & Types ────────");
console.log("  interface Product { name: string; price?: number; }");
console.log("  interface SearchPage extends BasePage { }");
console.log("  type ID = string | number;");
console.log("  Partial<T>, Required<T>, Readonly<T>, Pick<T,K>, Omit<T,K>");
console.log("  typeof x === 'string'       ← type guard");
console.log("  x instanceof SearchError    ← instanceof guard");
console.log("  function isX(v): v is X     ← custom guard");

console.log("\n  ── Day 10: Classes ──────────────────");
console.log("  class SearchPage extends BasePage implements ISearch {");
console.log("    constructor(private readonly page: Page) { super(page); }");
console.log("    get searchBox() { return this.page.locator('#s'); }");
console.log("    static create(page) { return new SearchPage(page); }");
console.log("  }");
console.log("  abstract class BasePage { abstract waitForLoad(): Promise<void>; }");
console.log("  Patterns: Factory<T>, Builder (.withX().build()), Singleton");

console.log("\n  ── Day 11: Advanced ─────────────────");
console.log("  type MyPartial<T> = { [K in keyof T]?: T[K] };  ← mapped");
console.log("  type IsStr<T> = T extends string ? 'y' : 'n';   ← conditional");
console.log("  type Handler = `on${Capitalize<Events>}`;         ← template literal");
console.log("  type Keys = keyof Product;    ← 'name'|'price'|...");
console.log("  type Config = typeof config;  ← derive type from value");
console.log("  [...arr] as const             ← freeze to literal types");


// ═══════════════════════════════════════
// PROBLEM 1: TYPE A COMPLETE FRAMEWORK
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 1: Type a Complete Test Flow\n");

// ✅ Type the INTERFACES (contracts) for a Playwright test flow:

interface TestConfig {
    baseURL: string;
    apiURL: string;
    browser: "chromium" | "firefox" | "webkit";
    timeout: number;
    environment: "staging" | "production" | "local";
    credentials: {
        username: string;
        password: string;
    };
}

interface ILoginPage {
    navigate(): Promise<void>;
    fillUsername(user: string): Promise<void>;
    fillPassword(pass: string): Promise<void>;
    submit(): Promise<void>;
    getErrorMessage(): Promise<string | null>;
}

interface ISearchPage {
    search(query: string): Promise<void>;
    getResults(): Promise<string[]>;
    applyFilter(category: string): Promise<void>;
    getResultCount(): Promise<number>;
    paginate(pageNum: number): Promise<void>;
}

interface APISearchResponse<T> {
    status: "success" | "error";
    data: T extends "success"
    ? { results: SearchItem[]; total: number; page: number }
    : { code: string; message: string };
}

interface SearchItem {
    id: string;
    name: string;
    price: number;
    category: string;
}

interface SearchQueryData {
    query: string;
    expectedCount: number;
    category: string;
    sortBy: "price" | "relevance" | "newest";
}

// Custom fixture type:
type TestFixtures = {
    loginPage: ILoginPage;
    searchPage: ISearchPage;
    apiClient: { getProducts(): Promise<SearchItem[]> };
};

console.log("  ✅ TestConfig — environment + credentials typed");
console.log("  ✅ ILoginPage — navigate, fill, submit, getError");
console.log("  ✅ ISearchPage — search, filter, paginate, count");
console.log("  ✅ APISearchResponse<T> — typed discriminated response");
console.log("  ✅ SearchQueryData — test data shape");
console.log("  ✅ TestFixtures — loginPage, searchPage, apiClient");
console.log("\n  💡 This IS your Day 12 framework — just add implementations!");


// ═══════════════════════════════════════
// PROBLEM 2: READ AND EXPLAIN TYPES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 2: Read and Explain Types\n");

interface User {
    name: string;
    email: string;
    age: number;
    isAdmin: boolean;
}

// Without running — what does each resolve to?

type TypeA = keyof User;
// → "name" | "email" | "age" | "isAdmin"

type TypeB = Partial<Pick<User, "name" | "email">>;
// → { name?: string; email?: string }
// Pick selects 2 props, Partial makes them optional

type TypeC = Omit<User, "age" | "isAdmin">;
// → { name: string; email: string }

type TypeD = Record<"alice" | "bob", User>;
// → { alice: User; bob: User }

type TypeE = Required<{ name?: string; age?: number }>;
// → { name: string; age: number }  (removes the ?)

type TypeF = Readonly<Pick<User, "name" | "age">>;
// → { readonly name: string; readonly age: number }

// Demonstrate:
const demoUser: User = { name: "Alice", email: "a@b.com", age: 30, isAdmin: true };

const bValue: TypeB = { name: "Alice" };                   // email is optional ✅
const dValue: TypeD = { alice: demoUser, bob: demoUser };  // mapped record ✅
const fValue: TypeF = { name: "Alice", age: 30 };
// fValue.name = "Bob";  // ❌ readonly

console.log("  type A = keyof User          → 'name' | 'email' | 'age' | 'isAdmin'");
console.log("  type B = Partial<Pick<...>>  → { name?: string; email?: string }");
console.log("  type C = Omit<User, ...>     → { name: string; email: string }");
console.log("  type D = Record<'alice'|'bob', User> → { alice: User; bob: User }");
console.log("  type E = Required<{...?}>    → removes all ? marks");
console.log("  type F = Readonly<Pick<...>> → both pick and make readonly");
console.log("\n  TypeB value:", bValue);
console.log("  TypeF value:", fValue);


// ═══════════════════════════════════════
// PROBLEM 3: FIX TYPE ERRORS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 3: Fix 5 TypeScript Errors\n");

console.log("  Buggy code:");
console.log("  1. const browsers = ['chromium', 'firefox'];");
console.log("     function run(b: 'chromium'|'firefox') {}");
console.log("     browsers.forEach(b => run(b));    // 🐛 string not assignable");
console.log("  FIX: add 'as const' to the array declaration\n");

console.log("  2. const title = await page.locator('.h1').textContent();");
console.log("     expect(title).toHaveLength(10);  // 🐛 title is string|null");
console.log("  FIX: const title = ... ?? '';  or  const title = ...!;\n");

console.log("  3. class ProductPage extends BasePage {");
console.log("     constructor(page: Page) { this.page = page; } // 🐛 no super()");
console.log("  FIX: add super(page); as first line\n");

console.log("  4. function getField(product: Product, field: string) {");
console.log("     return product[field]; // 🐛 'string' can't index type 'Product'");
console.log("  FIX: field: keyof Product  (constrain to valid keys)\n");

console.log("  5. async getResultCount(): number {  // 🐛 should be Promise<number>");
console.log("     return await locator.count();");
console.log("  FIX: async getResultCount(): Promise<number> {\n");

// Demonstrate the fixes:

// Fix 1 — as const
const browsersFixed = ["chromium", "firefox"] as const;
function runBrowser(b: "chromium" | "firefox"): void {
    console.log(`    ✅ runBrowser("${b}")`);
}
browsersFixed.forEach(b => runBrowser(b));

// Fix 2 — nullish coalescing
const rawTitle: string | null = null;
const safeTitle: string = rawTitle ?? "No Title";
console.log("    ✅ safeTitle:", safeTitle);

// Fix 4 — keyof
interface ProductFixed { name: string; price: number; }
function getFieldFixed<T>(obj: T, field: keyof T): T[keyof T] {
    return obj[field];
}
const p: ProductFixed = { name: "Shirt", price: 250 };
console.log("    ✅ getField(p, 'name'):", getFieldFixed(p, "name"));


// ═══════════════════════════════════════
// DEBUG CHALLENGE: as const gotcha
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Debug Challenge: The as const Gotcha 🐛\n");

// This is the MOST COMMON Day 11 TypeScript gotcha:
console.log("  🐛 The problem:");
console.log("     const data = {");
console.log("         browsers: ['chromium', 'firefox', 'webkit'],  // string[]");
console.log("         envs: ['staging', 'production']               // string[]");
console.log("     };");
console.log("     function run(b: 'chromium'|'firefox'|'webkit') {}");
console.log("     data.browsers.forEach(b => run(b));  // ❌ string not assignable!");
console.log("\n  💡 WHY: TypeScript infers browsers as 'string[]' — too wide.");
console.log("     'string' is NOT assignable to 'chromium'|'firefox'|'webkit'\n");

console.log("  ✅ The fix: as const");
const testMatrix = {
    browsers: ["chromium", "firefox", "webkit"],
    envs: ["staging", "production"]
} as const;
// Now: browsers is readonly ["chromium", "firefox", "webkit"]
// Each element is the literal type, not just 'string'!

type AllowedBrowsers = typeof testMatrix.browsers[number];
// "chromium" | "firefox" | "webkit"

function runOnBrowser(b: AllowedBrowsers): void {
    console.log(`    → Running on: ${b}`);
}

testMatrix.browsers.forEach(b => runOnBrowser(b));  // ✅ No error

console.log("\n  Derived type:", '"chromium" | "firefox" | "webkit"');
console.log("  💡 Rule of thumb: if you have an array of string literals");
console.log("     that you'll also use as a union type → always add 'as const'");


// ═══════════════════════════════════════
// INTERVIEW Q&A (Quick Reference)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Interview Q&A Quick Reference\n");

const qAndA = [
    ["What is keyof?", "Gets all property names of T as a union: keyof Product = 'name'|'price'|..."],
    ["What is typeof (type)?", "Gets the TYPE of a runtime value: type Conf = typeof config"],
    ["What does as const do?", "Freezes arrays/objects to literal types instead of wide string/number"],
    ["What is a .d.ts file?", "Pure type declarations — no code. Enables autocomplete for libraries"],
    ["What is strictNullChecks?", "null/undefined are NOT assignable to other types — forces safe handling"],
    ["When to use '!'?", "Non-null assertion — rarely. Only when you're 100% certain it's not null"],
    ["Mapped type syntax?", "{ [K in keyof T]: T[K] } — iterate properties to transform the type"],
    ["Guard vs Assertion fn?", "Guard (is) → narrows in if-block. Assertion (asserts) → narrows after call"],
    ["? vs ?? operator?", ". → optional chain. ?? → null/undefined fallback (nullish coalescing)"],
    ["Best tsconfig options?", "strict:true, target:ES2022, paths for aliases, skipLibCheck:true"],
];

qAndA.forEach(([q, a]) => {
    console.log(`  Q: ${q}`);
    console.log(`  A: ${a}\n`);
});


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📋 MODULE 3 COMPLETE — KEY TAKEAWAYS\n");

console.log("  Day 8  → Types, unions, literals, enums, unknown, tuples");
console.log("  Day 9  → Interfaces, type guards, utility types, generics");
console.log("  Day 10 → Classes, access modifiers, abstract, design patterns");
console.log("  Day 11 → Mapped types, keyof/typeof, as const, tsconfig, Playwright types");

console.log("\n  🎤 Interview answer:");
console.log('     "I configure TypeScript with strict mode, path aliases, and');
console.log('      proper source structure. I understand mapped types, keyof,');
console.log('      typeof, and as const. I can read Playwright\'s type definitions');
console.log('      and understand how its fixture system uses generics. I set up');
console.log('      tsconfig.json for full type safety and great DX."');

console.log("\n═══════════════════════════════════════\n");

export { };
