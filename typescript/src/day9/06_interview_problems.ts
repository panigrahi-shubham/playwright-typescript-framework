/**
 * ============================================
 * 06 — Interview Problems & Practice
 * ============================================
 *
 * Day 9: Interfaces, Type Guards & Advanced Types
 * Practice exercises combining interfaces,
 * type guards, utility types, and generics.
 * Each problem includes the solution.
 *
 * Run: npx ts-node 06_interview_problems.ts
 */

console.log("═══════════════════════════════════════");
console.log("   INTERVIEW PROBLEMS & PRACTICE");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// PROBLEM 1: DEFINE B2B INTERFACES
// ═══════════════════════════════════════
console.log("📌 Problem 1: Define B2B Interfaces\n");

// Task: Define interfaces for Supplier, Message, and SearchFilters

interface Supplier {
    id: string;
    name: string;
    location: string;
    rating: number;
    isVerified: boolean;
    products: SupplierProduct[];
    registeredAt: string;
}

interface SupplierProduct {
    name: string;
    price: number;
}

interface B2BMessage {
    id: string;
    from: string;
    to: string;
    text: string;
    status: "sent" | "delivered" | "read";
    timestamp: string;
    attachments?: string[];
}

interface SearchFilters {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    sortBy?: "price" | "relevance" | "newest";
    inStockOnly?: boolean;
}

// Create valid objects:
const supplier: Supplier = {
    id: "SUP-001",
    name: "TextilePro",
    location: "Shanghai",
    rating: 4.8,
    isVerified: true,
    products: [
        { name: "Cotton Shirt", price: 250 },
        { name: "Silk Fabric", price: 800 }
    ],
    registeredAt: "2024-01-15"
};

const message: B2BMessage = {
    id: "MSG-001",
    from: "buyer@company.com",
    to: "supplier@textilepro.com",
    text: "What's your MOQ for cotton shirts?",
    status: "delivered",
    timestamp: new Date().toISOString(),
    attachments: ["spec-sheet.pdf"]
};

const filters: SearchFilters = {
    category: "Textiles",
    priceMin: 100,
    priceMax: 500,
    sortBy: "price",
    inStockOnly: true
};

console.log("  Supplier:", supplier.name, "→", supplier.products.length, "products");
console.log("  Message:", message.from, "→", message.status);
console.log("  Filters:", filters);
console.log("  ✅ All interfaces defined and validated");


// ═══════════════════════════════════════
// PROBLEM 2: FIX TYPE ERRORS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 2: Fix Type Errors\n");

// Original code had 5 errors. Here's the FIXED version:

interface User {
    name: string;
    email: string;
    age: number;
    isAdmin?: boolean;
}

// FIX 1: Missing 'age' property
const user: User = {
    name: "Shubham",
    email: "shubham@test.com",
    age: 25              // ← was missing
};

// FIX 2: Return type should be string, not number
function greetUser(u: User): string {     // ← was 'number'
    return `Hello, ${u.name}!`;
}

// FIX 3: isAdmin should be boolean, not string
// FIX 4: 'role' does not exist in User interface
const admin: User = {
    name: "Admin",
    email: "admin@test.com",
    age: 30,
    isAdmin: true         // ← was "yes" (string)
    // role: "superadmin"  ← removed (not in interface)
};

// FIX 5: email is string, cannot assign number
// user.email = 42;       ← type error! string ≠ number
user.email = "new@email.com";  // ✅ correct

console.log("  user:", user);
console.log("  greetUser:", greetUser(user));
console.log("  admin:", admin);

console.log("\n  Errors found and fixed:");
console.log("    1. Missing 'age' property → added age: 25");
console.log("    2. Return type 'number' → changed to 'string'");
console.log("    3. isAdmin: 'yes' (string) → true (boolean)");
console.log("    4. Extra 'role' property → removed (not in interface)");
console.log("    5. email = 42 (number) → email = 'new@email.com' (string)");


// ═══════════════════════════════════════
// PROBLEM 3: API RESPONSE TYPE SYSTEM
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 3: API Response Type System\n");

// Generic API response with discriminated union

interface SuccessResponse<T> {
    status: "success";
    data: T;
    timestamp: string;
}

interface ErrorResponse {
    status: "error";
    error: string;
    timestamp: string;
}

type APIResponse<T> = SuccessResponse<T> | ErrorResponse;

// Specific response types
interface ProductData {
    id: string;
    name: string;
    price: number;
}

type ProductListResponse = APIResponse<ProductData[]>;
type SingleProductResponse = APIResponse<ProductData>;

// Custom type guard
function isSuccessResponse<T>(response: APIResponse<T>): response is SuccessResponse<T> {
    return response.status === "success";
}

// Handle response with type safety
function handleProductResponse(response: SingleProductResponse): string {
    if (isSuccessResponse(response)) {
        // TypeScript KNOWS this is SuccessResponse<ProductData>
        return `✅ Product: ${response.data.name} — $${response.data.price}`;
    } else {
        // TypeScript KNOWS this is ErrorResponse
        return `❌ Error: ${response.error}`;
    }
}

const successRes: SingleProductResponse = {
    status: "success",
    data: { id: "PROD-001", name: "Cotton Shirt", price: 250 },
    timestamp: new Date().toISOString()
};

const errorRes: SingleProductResponse = {
    status: "error",
    error: "Product not found",
    timestamp: new Date().toISOString()
};

console.log("  " + handleProductResponse(successRes));
console.log("  " + handleProductResponse(errorRes));
console.log("\n  ✅ Generic APIResponse<T> + discriminated union + type guard");


// ═══════════════════════════════════════
// PROBLEM 4: TEST DATA FACTORY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 4: Test Data Factory with Utility Types\n");

interface TestProduct {
    id: string;
    name: string;
    price: number;
    moq: number;
    category: string;
    inStock: boolean;
}

// Factory function using Partial for overrides
function createProduct(overrides: Partial<TestProduct> = {}): TestProduct {
    return {
        id: `PROD-${Math.random().toString(36).slice(2, 8)}`,
        name: "Default Product",
        price: 100,
        moq: 50,
        category: "General",
        inStock: true,
        ...overrides
    };
}

// Create multiple products with minimal config
const defaultProduct = createProduct();
const expensiveProduct = createProduct({ name: "Premium Silk", price: 999, category: "Textiles" });
const outOfStock = createProduct({ name: "Rare Item", inStock: false });

console.log("  Default:", defaultProduct);
console.log("  Expensive:", expensiveProduct);
console.log("  Out of stock:", outOfStock);
console.log("\n  💡 Partial<TestProduct> lets tests provide ONLY the fields they care about");


// ═══════════════════════════════════════
// PROBLEM 5: DEBUG CHALLENGE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 5: Debug Challenge 🐛\n");

console.log("  The buggy code:");
console.log("  ─────────────────────────────────────");
console.log("  interface SearchResult {");
console.log("    name: string;");
console.log("    price: number;     // ← expects number!");
console.log("    inStock: boolean;");
console.log("  }");
console.log("");
console.log("  async function getResults(page: any): Promise<SearchResult[]> {");
console.log("    const texts = await page.locator('.result-name').allTextContents();");
console.log("    const prices = await page.locator('.result-price').allTextContents();");
console.log("    return texts.map((name, i) => ({");
console.log("      name: name,");
console.log("      price: prices[i],     // 🐛 BUG 1");
console.log("      inStock: true          // 🐛 BUG 2");
console.log("    }));");
console.log("  }");

console.log("\n  🐛 Bug 1 (TypeScript error):");
console.log("     prices[i] is a STRING (allTextContents returns string[])");
console.log("     But interface expects NUMBER → type mismatch!");
console.log("     Fix: price: parseFloat(prices[i]) or Number(prices[i])");

console.log("\n  🐛 Bug 2 (Logic bug — TS can't catch this):");
console.log("     If there are MORE names than prices, prices[i] = undefined");
console.log("     inStock is hardcoded 'true' — should read from actual DOM");
console.log("     Fix: Add array length validation + read actual inStock status");

// Corrected version:
interface SearchResult {
    name: string;
    price: number;
    inStock: boolean;
}

function getResultsCorrected(names: string[], priceTexts: string[], stockStatuses: boolean[]): SearchResult[] {
    // Validate: all arrays should be same length
    const minLength = Math.min(names.length, priceTexts.length, stockStatuses.length);

    return names.slice(0, minLength).map((name, i) => ({
        name: name,
        price: parseFloat(priceTexts[i]),  // ✅ Convert string → number
        inStock: stockStatuses[i]           // ✅ Read actual status
    }));
}

const corrected = getResultsCorrected(
    ["Cotton Shirt", "Silk Fabric"],
    ["250.00", "800.50"],
    [true, false]
);
console.log("\n  Corrected results:", corrected);


// ═══════════════════════════════════════
// COMMON MISTAKES TABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Common Mistakes\n");

console.log("  ┌────────────────────────────────┬────────────────────────────────┐");
console.log("  │ Mistake                        │ Correct Way                    │");
console.log("  ├────────────────────────────────┼────────────────────────────────┤");
console.log("  │ interface & type mixed randomly │ interface=objects, type=unions │");
console.log("  │ Not using ? for optional fields │ Mark optional with ?           │");
console.log("  │ Using 'as' instead of guard    │ Use typeof/instanceof/in/is   │");
console.log("  │ Forgetting readonly on config  │ readonly on immutable props    │");
console.log("  │ Not using utility types         │ Use Partial, Pick, Omit       │");
console.log("  │ Making everything generic      │ Generic only when truly needed │");
console.log("  └────────────────────────────────┴────────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 DAY 9 KEY TAKEAWAYS\n");

console.log("  • Interfaces define the SHAPE of objects (contract)");
console.log("  • interface for objects/classes, type for unions/tuples");
console.log("  • Type guards narrow types: typeof, instanceof, in, is");
console.log("  • Discriminated unions use a 'kind' property for narrowing");
console.log("  • Utility types: Partial, Required, Pick, Omit, Record");
console.log("  • Generics: function<T>, interface<T> — write once, use for any type");
console.log("  • Factory pattern: Partial<T> for test data with smart defaults");
console.log("  • Structural typing: same shape = compatible (unlike Java)");

console.log("\n  🎤 Interview answer:");
console.log('     "I design my framework with TypeScript interfaces for type safety.');
console.log('      I use interfaces for page objects, typed test data with optional');
console.log('      properties, and generic API response types with discriminated');
console.log('      unions. I leverage Partial, Pick, and Omit to avoid duplication."');

console.log("\n═══════════════════════════════════════\n");

export { };
