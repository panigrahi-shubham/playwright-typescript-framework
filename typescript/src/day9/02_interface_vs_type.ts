/**
 * ============================================
 * 02 — Interface vs Type Alias
 * ============================================
 *
 * Day 9: Interfaces, Type Guards & Advanced Types
 * Both interface and type can define object shapes.
 * This file clarifies WHEN to use each one.
 *
 * Run: npx ts-node 02_interface_vs_type.ts
 */

console.log("═══════════════════════════════════════");
console.log("   INTERFACE vs TYPE ALIAS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BOTH CAN DEFINE OBJECT SHAPES
// ═══════════════════════════════════════
console.log("📌 Both Define Object Shapes\n");

// Interface way
interface ProductInterface {
    name: string;
    price: number;
}

// Type alias way
type ProductType = {
    name: string;
    price: number;
};

// Both work identically for basic object shapes:
const shirt1: ProductInterface = { name: "Shirt", price: 250 };
const shirt2: ProductType = { name: "Shirt", price: 250 };

console.log("  Interface object:", shirt1);
console.log("  Type alias object:", shirt2);
console.log("  → Both produce identical results for basic shapes ✅");


// ═══════════════════════════════════════
// 2. THINGS ONLY TYPE CAN DO
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Things Only 'type' Can Do\n");

// 1. Union types — interface CANNOT do this
type ProductID = string | number;
type SearchStatus = "idle" | "loading" | "success" | "error";

let id1: ProductID = "PROD-001";    // string ✅
let id2: ProductID = 42;            // number ✅
let status: SearchStatus = "loading";

console.log("  ProductID (union):  string | number →", id1, ",", id2);
console.log("  SearchStatus (literal union):", status);

// 2. Tuple types
type PriceRange = [number, number];
const range: PriceRange = [100, 500];
console.log("  PriceRange (tuple): [100, 500] →", range);

// 3. Primitive aliases
type ID = string;
type Rating = number;
type Active = boolean;

let userId: ID = "USR-001";
console.log("  ID (primitive alias):", userId);

// 4. Mapped / Utility types
type ProductOrNull = ProductInterface | null;
let maybeProduct: ProductOrNull = null;
console.log("  ProductOrNull:", maybeProduct);

console.log("\n  💡 type is more flexible — unions, tuples, primitives, mapped types");


// ═══════════════════════════════════════
// 3. THINGS ONLY INTERFACE CAN DO
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Things Only 'interface' Can Do — Declaration Merging\n");

// Declaration Merging — define the same interface TWICE and TypeScript merges them!

interface Config {
    baseURL: string;
}

interface Config {
    timeout: number;
}

// Config now has BOTH properties:
const myConfig: Config = {
    baseURL: "https://b2b-platform.com",
    timeout: 30000
};

console.log("  Config (merged):", myConfig);
console.log("  → Two separate 'interface Config' declarations merged into one!");

// This is IMPOSSIBLE with type:
// type Config2 = { baseURL: string };
// type Config2 = { timeout: number };   // ❌ ERROR: Duplicate identifier 'Config2'

console.log("\n  💡 Declaration merging is how Playwright extends its own types.");
console.log("     Plugins can add new properties to existing interfaces!");


// ═══════════════════════════════════════
// 4. EXTENDING vs INTERSECTION
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Extending (interface) vs Intersection (type)\n");

// INTERFACE — use 'extends'
interface BaseProduct {
    name: string;
    price: number;
}

interface PremiumProduct extends BaseProduct {
    discount: number;
    warranty: boolean;
}

// TYPE — use '&' (intersection)
type BaseProductType = {
    name: string;
    price: number;
};

type PremiumProductType = BaseProductType & {
    discount: number;
    warranty: boolean;
};

// Both produce the same shape:
const premium1: PremiumProduct = {
    name: "Silk Fabric", price: 800,
    discount: 0.1, warranty: true
};

const premium2: PremiumProductType = {
    name: "Silk Fabric", price: 800,
    discount: 0.1, warranty: true
};

console.log("  PremiumProduct (extends):", premium1);
console.log("  PremiumProductType (&):", premium2);
console.log("  → Same result, different syntax");

console.log("\n  Interface: interface B extends A { ... }");
console.log("  Type:      type B = A & { ... }");


// ═══════════════════════════════════════
// 5. BOTH CAN BE USED WITH 'implements'
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Both Work with 'implements'\n");

interface Printable {
    print(): void;
}

type Loggable = {
    log(): void;
};

// Class can implement BOTH interface and type alias:
class Invoice implements Printable, Loggable {
    constructor(private id: string, private amount: number) { }

    print(): void {
        console.log(`    📄 Invoice #${this.id}: $${this.amount}`);
    }

    log(): void {
        console.log(`    📝 Logging invoice #${this.id}`);
    }
}

const invoice = new Invoice("INV-001", 25000);
invoice.print();
invoice.log();


// ═══════════════════════════════════════
// 6. THE PRACTICAL RULE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 The Practical Rule — When to Use Which\n");

console.log("  ┌────────────────────────┬────────────────────────────────────┐");
console.log("  │ Feature                │ Interface vs Type Alias            │");
console.log("  ├────────────────────────┼────────────────────────────────────┤");
console.log("  │ Object shapes          │ Both ✅                           │");
console.log("  │ Extend/inherit         │ Both (extends vs &)               │");
console.log("  │ Class implements       │ Both ✅                           │");
console.log("  │ Declaration merging    │ Interface only ✅                 │");
console.log("  │ Union types            │ Type only ✅ (A | B)              │");
console.log("  │ Primitive aliases      │ Type only ✅ (type ID = string)   │");
console.log("  │ Tuple types            │ Type only ✅ ([string, number])   │");
console.log("  └────────────────────────┴────────────────────────────────────┘");

console.log("\n  🎯 SIMPLE RULE:");
console.log("     → Use 'interface' for OBJECTS and CLASSES (Product, Page, Config)");
console.log("     → Use 'type' for UNIONS, TUPLES, and UTILITIES");
console.log("     → When in doubt, use 'interface' — it's more flexible for evolving code");


// ═══════════════════════════════════════
// 7. JAVA ↔ TYPESCRIPT COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ TypeScript Comparison\n");

console.log("  ┌──────────────────────────────┬──────────────────────────────┐");
console.log("  │ Java                         │ TypeScript                   │");
console.log("  ├──────────────────────────────┼──────────────────────────────┤");
console.log("  │ Only has interfaces           │ Has interface + type alias   │");
console.log("  │ No union types               │ type X = A | B               │");
console.log("  │ No declaration merging        │ interface merging works      │");
console.log("  │ abstract class for defaults  │ interface + type = flexible  │");
console.log("  │ No tuple type                │ type Pair = [A, B]           │");
console.log("  └──────────────────────────────┴──────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 INTERFACE vs TYPE SUMMARY\n");

console.log("  • interface:  Best for objects, classes, and contracts");
console.log("  • type:       Best for unions, tuples, and primitives");
console.log("  • interface:  Can declaration-merge (add properties later)");
console.log("  • type:       Can do union (A | B) and intersection (A & B)");
console.log("  • Both:       Work with 'implements' in classes");
console.log("  • Rule:       Objects → interface, Combinations → type");

console.log("\n═══════════════════════════════════════\n");

export { };
