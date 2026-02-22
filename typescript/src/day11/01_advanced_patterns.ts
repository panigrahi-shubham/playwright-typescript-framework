/**
 * ============================================
 * 01 — Advanced TypeScript Patterns
 * ============================================
 *
 * Day 11: Advanced Patterns, tsconfig & Wrap-Up
 * Mapped types, conditional types, template literal
 * types, keyof, typeof, as const — the internals
 * behind everything you've used so far.
 *
 * Run: npx ts-node 01_advanced_patterns.ts
 */

console.log("═══════════════════════════════════════");
console.log("   ADVANCED TYPESCRIPT PATTERNS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. MAPPED TYPES — How Utility Types Work Under the Hood
// ═══════════════════════════════════════
console.log("📌 Mapped Types — How Partial<T>, Readonly<T> work\n");

interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

// keyof Product = "name" | "price" | "inStock"
type ProductKeys = keyof Product;
console.log("  keyof Product = union of:", '"name" | "price" | "inStock"');

// ─── This is HOW Partial<T> is actually implemented: ───
// type Partial<T> = { [K in keyof T]?: T[K]; };
//
// Let's break it down step by step:
//   keyof T         → gets all property NAMES as a union
//   K in keyof T    → iterate over each property name (like for..in for types)
//   ?               → make each property optional
//   T[K]            → the TYPE of property K in T

// Write our own versions:
type MyPartial<T> = { [K in keyof T]?: T[K] };         // all optional
type MyRequired<T> = { [K in keyof T]-?: T[K] };         // all required (remove ?)
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };  // all readonly

// Use them:
type PartialProduct = MyPartial<Product>;   // { name?: string; price?: number; ... }
type RequiredProduct = MyRequired<PartialProduct>;   // back to required
type ReadonlyProduct = MyReadonly<Product>;  // { readonly name: string; ... }

const partialItem: PartialProduct = { name: "Shirt" };   // price is optional ✅
const readonlyItem: ReadonlyProduct = { name: "Silk", price: 800, inStock: true };
// readonlyItem.price = 900;   // ❌ ERROR: Cannot assign to readonly

console.log("  MyPartial<Product> — only name:", partialItem);
console.log("  MyReadonly<Product>:", readonlyItem);


// ─── Custom Mapped Types ───
console.log("\n  Custom mapped types:");

// Make all properties nullable (useful for form data)
type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableProduct = Nullable<Product>;

const emptyForm: NullableProduct = { name: null, price: null, inStock: null };
console.log("  Nullable form:", emptyForm);

// Make all properties into getter functions (like a proxy)
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type ProductGetters = Getters<Product>;
// → { getName: () => string; getPrice: () => number; getInStock: () => boolean; }
console.log("  Getters<Product> creates: { getName(), getPrice(), getInStock() }");

// Record<K, V> is also a mapped type:
// type Record<K extends string, V> = { [P in K]: V };
const pageStatus: Record<"search" | "login" | "checkout", boolean> = {
    search: true,
    login: true,
    checkout: false
};
console.log("  Record<pages, boolean>:", pageStatus);


// ═══════════════════════════════════════
// 2. CONDITIONAL TYPES — Types with if/else
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Conditional Types — T extends U ? X : Y\n");

// Syntax: "If T is assignable to U, use type X, otherwise use type Y"
type IsString<T> = T extends string ? "yes" : "no";
type IsArray<T> = T extends any[] ? "yes" : "no";
type IsNullable<T> = T extends null | undefined ? "yes" : "no";

type A = IsString<string>;    // "yes"
type B = IsString<number>;    // "no"
type C = IsArray<string[]>;   // "yes"
type D = IsArray<string>;     // "no"

console.log("  IsString<string>  = 'yes'");
console.log("  IsString<number>  = 'no'");
console.log("  IsArray<string[]> = 'yes'");

// Built-in utility types that USE conditional types:
// ReturnType<T>    → ReturnType<() => string> = string
// Parameters<T>   → Parameters<(x: number) => void> = [number]
// Extract<T, U>   → Extract<'a' | 'b' | 'c', 'a' | 'c'> = 'a' | 'c'
// Exclude<T, U>   → Exclude<'a' | 'b' | 'c', 'a'> = 'b' | 'c'

function navigate(url: string): Promise<void> {
    return new Promise(resolve => resolve());
}

type NavReturn = ReturnType<typeof navigate>;       // Promise<void>
type NavParams = Parameters<typeof navigate>;       // [string]

console.log("  ReturnType<typeof navigate> = Promise<void>");
console.log("  Parameters<typeof navigate> = [string]");

// infer keyword — TypeScript fills in the type variable:
type UnpackPromise<T> = T extends Promise<infer R> ? R : T;
type Unwrapped = UnpackPromise<Promise<string>>;    // string
type Plain = UnpackPromise<number>;              // number (not a Promise)

console.log("  UnpackPromise<Promise<string>> = string");
console.log("  UnpackPromise<number> = number");
console.log("\n  💡 You'll READ these in library types — you rarely write them");


// ═══════════════════════════════════════
// 3. TEMPLATE LITERAL TYPES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Template Literal Types — String shapes at type level\n");

// String manipulation at the type level (like template literals in JS)
type EventName = "click" | "hover" | "focus";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onHover" | "onFocus"

type Env = "staging" | "production" | "local";
type EnvURL = `https://${Env}.b2b-platform.com`;
// "https://staging.b2b-platform.com" | "https://production.b2b-platform.com" | ...

// Enforce API endpoint patterns:
type APIEndpoint = `/api/${string}`;
const validEndpoint: APIEndpoint = "/api/products";     // ✅
// const invalidEndpoint: APIEndpoint = "/products";      // ❌

// Enforce data-testid selector pattern:
type DataTestId = `[data-testid="${string}"]`;
const validTestId: DataTestId = '[data-testid="search-box"]';   // ✅
// const badTestId:  DataTestId = '#search-box';                  // ❌

// Getter/Setter naming convention enforcement:
type ProductField = "name" | "price" | "inStock";
type Getter = `get${Capitalize<ProductField>}`;  // "getName" | "getPrice" | "getInStock"
type Setter = `set${Capitalize<ProductField>}`;  // "setName" | "setPrice" | "setInStock"

console.log("  EventHandler type = 'onClick' | 'onHover' | 'onFocus'");
console.log("  EnvURL type = all environment URL strings");
console.log("  APIEndpoint only allows '/api/...' — catches '/products' at compile time!");
console.log("  DataTestId enforces '[data-testid=\"...\"]' pattern");
console.log("  Getter = 'getName' | 'getPrice' | 'getInStock'");

// Validation example:
function callEndpoint(endpoint: APIEndpoint): void {
    console.log(`  ✅ Calling: ${endpoint}`);
}
callEndpoint("/api/products");
callEndpoint("/api/products/123");
// callEndpoint("/products");  // ❌ Type error at compile time!


// ═══════════════════════════════════════
// 4. keyof AND typeof
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 keyof and typeof — Extract Types from Values\n");

// keyof — get all property names as a union:
interface Config {
    baseURL: string;
    timeout: number;
    retries: number;
    browser: "chromium" | "firefox" | "webkit";
}

type ConfigKey = keyof Config;   // "baseURL" | "timeout" | "retries" | "browser"

// Practical: type-safe property getter:
function getConfigValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const stagingConfig: Config = {
    baseURL: "https://staging.b2b-platform.com",
    timeout: 30000,
    retries: 2,
    browser: "chromium"
};

const url = getConfigValue(stagingConfig, "baseURL");   // typed as string
const timeout = getConfigValue(stagingConfig, "timeout");   // typed as number
// const bad = getConfigValue(stagingConfig, "color");      // ❌ 'color' not in Config

console.log("  getConfigValue(config, 'baseURL') =", url);
console.log("  getConfigValue(config, 'timeout') =", timeout);

// typeof — get the type of a runtime value:
const environments = {
    staging: { baseURL: "https://staging.b2b-platform.com", apiURL: "https://api-staging.b2b.com" },
    production: { baseURL: "https://b2b-platform.com", apiURL: "https://api.b2b.com" }
} as const;

type EnvironmentName = keyof typeof environments;
// "staging" | "production"  — derived from the OBJECT, no duplication!

type EnvironmentConfig = typeof environments[EnvironmentName];

function getEnvConfig(env: EnvironmentName): typeof environments[typeof env] {
    return environments[env];
}

console.log("\n  typeof environments → derives type from runtime value");
console.log("  EnvironmentName = 'staging' | 'production'");
console.log("  getEnvConfig('staging') =", getEnvConfig("staging"));

// as const — freeze arrays to literal types:
const browsers = ["chromium", "firefox", "webkit"] as const;
// Without as const: type is string[]
// With as const:    type is readonly ["chromium", "firefox", "webkit"]

type BrowserLiteral = typeof browsers[number];
// "chromium" | "firefox" | "webkit" — a union from the ARRAY values

console.log("\n  browsers = ['chromium', 'firefox', 'webkit'] as const");
console.log("  typeof browsers[number] = 'chromium' | 'firefox' | 'webkit'");
console.log("  💡 as const converts string[] to a tuple of string literals");


// ═══════════════════════════════════════
// 5. ASSERTION FUNCTIONS (asserts v is T)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Assertion Functions vs Type Guards\n");

interface SearchResult {
    id: string;
    title: string;
    price: number;
}

// Type GUARD — returns boolean, narrows inside if-block
function isSearchResult(value: unknown): value is SearchResult {
    return (
        typeof value === "object" && value !== null &&
        "id" in value && "title" in value && "price" in value
    );
}

// Assertion FUNCTION — throws if wrong, narrows for ALL code after the call
function assertSearchResult(value: unknown): asserts value is SearchResult {
    if (
        typeof value !== "object" || value === null ||
        !("id" in value) || !("title" in value) || !("price" in value)
    ) {
        throw new Error(`Value is not a valid SearchResult: ${JSON.stringify(value)}`);
    }
}

// Usage comparison:
const apiResponse: unknown = { id: "PROD-1", title: "Cotton Shirt", price: 250 };

// Guard — handle both cases:
if (isSearchResult(apiResponse)) {
    console.log("  isSearchResult (guard)  → title:", apiResponse.title);
}
// apiResponse is still 'unknown' here

// Assertion — throws if invalid, continues if valid:
assertSearchResult(apiResponse);
console.log("  assertSearchResult (assertion) → title:", apiResponse.title);
// apiResponse is now SearchResult for the REST of the function

console.log("\n  ┌────────────────────────┬──────────────────────────┐");
console.log("  │ Type Guard (is)        │ Assertion (asserts)       │");
console.log("  ├────────────────────────┼──────────────────────────┤");
console.log("  │ Returns boolean        │ Returns void / throws     │");
console.log("  │ Narrows inside if      │ Narrows after call        │");
console.log("  │ Handle valid + invalid │ Crash-on-invalid          │");
console.log("  │ if (isX(data)) { }     │ assertX(data); data.prop  │");
console.log("  └────────────────────────┴──────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ADVANCED PATTERNS SUMMARY\n");

console.log("  • Mapped types:    [K in keyof T]: transform every property");
console.log("  • Custom Partial:  [K in keyof T]?: T[K]  (add ?= optional)");
console.log("  • Custom Readonly: readonly [K in keyof T]: T[K]");
console.log("  • Conditional:     T extends U ? X : Y — if/else for types");
console.log("  • infer:           TypeScript fills in a type variable");
console.log("  • Template literal: `on${Capitalize<Events>}` — string patterns");
console.log("  • keyof:           Property names as union ('a' | 'b' | 'c')");
console.log("  • typeof:          Derive type from runtime value");
console.log("  • as const:        Freeze array/object to literal types");
console.log("  • Guard vs Assert: 'is' = check both, 'asserts' = crash-on-invalid");

console.log("\n═══════════════════════════════════════\n");

export { };
