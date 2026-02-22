/**
 * ============================================
 * 01 — Classes & Access Modifiers
 * ============================================
 *
 * Day 10: Classes, Access Modifiers & Page Objects
 * TypeScript classes are nearly identical to Java.
 * Key additions: parameter properties, #private,
 * and compile-time access checking.
 *
 * Run: npx ts-node 01_classes_access_modifiers.ts
 */

console.log("═══════════════════════════════════════");
console.log("   CLASSES & ACCESS MODIFIERS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BASIC CLASS — JAVA vs TYPESCRIPT
// ═══════════════════════════════════════
console.log("📌 Basic Class\n");

class Product {
    private name: string;
    private price: number;
    private moq: number;

    constructor(name: string, price: number, moq: number) {
        this.name = name;
        this.price = price;
        this.moq = moq;
    }

    getName(): string { return this.name; }
    getPrice(): number { return this.price; }

    getBulkPrice(quantity: number): number {
        if (quantity < this.moq) {
            throw new Error(`Below MOQ of ${this.moq}`);
        }
        return this.price * quantity;
    }

    toString(): string {
        return `${this.name} — ₹${this.price} (MOQ: ${this.moq})`;
    }
}

const shirt = new Product("Cotton Shirt", 250, 100);
console.log("  shirt:", shirt.toString());
console.log("  getName():", shirt.getName());
console.log("  getBulkPrice(200):", shirt.getBulkPrice(200));

try {
    shirt.getBulkPrice(10);  // Below MOQ
} catch (e: unknown) {
    console.log("  getBulkPrice(10): ❌", (e as Error).message);
}

console.log("\n  💡 Almost line-for-line identical to Java:");
console.log("     • 'constructor' instead of class name");
console.log("     • Methods are public by default (no 'public' needed)");
console.log("     • 'number' instead of int/double");


// ═══════════════════════════════════════
// 2. ACCESS MODIFIERS — public, protected, private
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Access Modifiers — Same 3 as Java\n");

class Supplier {
    public name: string;           // Accessible everywhere (default)
    protected rating: number;      // Accessible in this class + subclasses
    private apiKey: string;        // Accessible ONLY in this class

    constructor(name: string, rating: number, apiKey: string) {
        this.name = name;
        this.rating = rating;
        this.apiKey = apiKey;
    }

    public getProfile(): string {
        return `${this.name} (${this.rating}/5)`;
    }

    protected isHighRated(): boolean {
        return this.rating >= 4.0;
    }

    private authenticate(): boolean {
        return this.apiKey.length > 0;
    }

    // Public method that uses private method internally
    public getStatus(): string {
        const auth = this.authenticate();
        const rated = this.isHighRated();
        return `${this.name}: auth=${auth}, highRated=${rated}`;
    }
}

const supplier = new Supplier("TextilePro", 4.8, "secret-key-123");
console.log("  supplier.name:", supplier.name);               // ✅ public
console.log("  supplier.getProfile():", supplier.getProfile()); // ✅ public method
console.log("  supplier.getStatus():", supplier.getStatus());   // ✅ uses private internally

// These would FAIL at compile time:
// supplier.rating;         // ❌ protected
// supplier.apiKey;         // ❌ private
// supplier.isHighRated();  // ❌ protected
// supplier.authenticate(); // ❌ private

console.log("\n  ┌───────────┬──────────────────────────────────┐");
console.log("  │ Modifier  │ Accessible From                  │");
console.log("  ├───────────┼──────────────────────────────────┤");
console.log("  │ public    │ Everywhere (default)             │");
console.log("  │ protected │ Same class + child classes        │");
console.log("  │ private   │ Same class ONLY                  │");
console.log("  └───────────┴──────────────────────────────────┘");


// ═══════════════════════════════════════
// 3. PROTECTED IN ACTION — CHILD CLASS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Protected in Action — Child Class\n");

class PremiumSupplier extends Supplier {
    private tier: string;

    constructor(name: string, rating: number, apiKey: string, tier: string) {
        super(name, rating, apiKey);  // MUST call super() first!
        this.tier = tier;
    }

    getFullProfile(): string {
        // ✅ Can access 'name' (public) and 'rating' (protected)
        // ❌ Cannot access 'apiKey' (private to Supplier)
        const highRated = this.isHighRated();  // ✅ protected method accessible
        return `${this.name} [${this.tier}] — ${this.rating}/5 ${highRated ? "⭐" : ""}`;
    }
}

const premium = new PremiumSupplier("SilkMaster", 4.9, "premium-key", "Gold");
console.log("  premium.getFullProfile():", premium.getFullProfile());
console.log("  premium.name:", premium.name);  // ✅ public

console.log("\n  💡 protected = designed for inheritance (same as Java)");


// ═══════════════════════════════════════
// 4. # PRIVATE FIELDS — RUNTIME PRIVACY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 # Private Fields — TRUE Runtime Privacy\n");

// TypeScript's 'private' is compile-time only — JS runtime can still access it
// '#' fields are TRULY private — even at runtime (JavaScript private fields)

class SecureConfig {
    #secretKey: string;          // Truly private — not accessible even at runtime

    constructor(key: string) {
        this.#secretKey = key;
    }

    getKeyHint(): string {
        return this.#secretKey.slice(0, 3) + "***";
    }
}

const secureConfig = new SecureConfig("my-secret-123");
console.log("  secureConfig.getKeyHint():", secureConfig.getKeyHint());
// secureConfig.#secretKey;  // ❌ ERROR at compile AND runtime

console.log("\n  ┌──────────────────┬───────────────────────────────┐");
console.log("  │ Feature          │ private vs #private           │");
console.log("  ├──────────────────┼───────────────────────────────┤");
console.log("  │ Compile-time     │ Both block access ✅          │");
console.log("  │ Runtime          │ private: accessible 😬        │");
console.log("  │                  │ #private: truly private ✅    │");
console.log("  │ Use in framework │ 'private' keyword is enough  │");
console.log("  │ Use for security │ '#' private fields           │");
console.log("  └──────────────────┴───────────────────────────────┘");


// ═══════════════════════════════════════
// 5. JAVA ↔ TYPESCRIPT CLASS COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ TypeScript Class Comparison\n");

console.log("  ┌──────────────────────────────┬──────────────────────────────┐");
console.log("  │ Java                         │ TypeScript                   │");
console.log("  ├──────────────────────────────┼──────────────────────────────┤");
console.log("  │ public/protected/private     │ public/protected/private     │");
console.log("  │ package-private (default)    │ No equivalent (public)       │");
console.log("  │ ClassName(params) { }        │ constructor(params) { }      │");
console.log("  │ methods need access modifier │ Methods are public by default│");
console.log("  │ private is runtime-enforced  │ private is compile-time only │");
console.log("  │ No #private equivalent       │ #private = runtime privacy   │");
console.log("  │ No parameter properties      │ constructor(private x: T)    │");
console.log("  └──────────────────────────────┴──────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 CLASSES & ACCESS MODIFIERS SUMMARY\n");

console.log("  • public:     Accessible everywhere (default)");
console.log("  • protected:  Class + subclasses only");
console.log("  • private:    Same class only (compile-time)");
console.log("  • #private:   Same class only (compile + runtime)");
console.log("  • constructor: Same as Java constructor, use 'super()' first");
console.log("  • extends:    class Child extends Parent (same as Java)");
console.log("  • 💡 For Playwright frameworks, 'private' keyword is sufficient");

console.log("\n═══════════════════════════════════════\n");

export { };
