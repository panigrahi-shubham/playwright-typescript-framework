/**
 * ============================================
 * 04 - Classes — Basics
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * Classes are the BACKBONE of Playwright's
 * Page Object Model (POM). Every page of your
 * app will be a class!
 * 
 * Run: node 04_classes_basics.js
 */

console.log("═══════════════════════════════════════");
console.log("   CLASSES — Basics");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. WHAT IS A CLASS?
// ═══════════════════════════════════════
console.log("📌 What Is a Class?\n");

// A class is a BLUEPRINT for creating objects.
// Think of it like a cookie cutter — one class, many objects (cookies).
//
// In Java, you MUST use classes for everything.
// In JavaScript, classes are optional but very useful when you want:
//   - Reusable templates for objects
//   - Encapsulation (group data + methods together)
//   - Inheritance (share behavior between related things)
//   - Page Object Model pattern (Playwright!)

// Java class:
//   public class Product {
//       String name;
//       double price;
//       public Product(String name, double price) {
//           this.name = name;
//           this.price = price;
//       }
//   }

// JavaScript class — almost identical structure!
class Product {
    // constructor — runs automatically when you do 'new Product(...)'
    // Same concept as Java's constructor (same name as class)
    // In JS, it's ALWAYS called 'constructor'
    constructor(name, price, moq) {
        // 'this' refers to the new object being created
        // These become properties on the new object
        this.name = name;
        this.price = price;
        this.moq = moq;
        this.inStock = true;  // default value — not passed as argument
    }
}

// Creating instances with 'new' — same keyword as Java!
const shirt = new Product("Cotton Shirt", 250, 100);
const fabric = new Product("Silk Fabric", 800, 50);

console.log("  shirt:", shirt);
console.log("  fabric:", fabric);
console.log("  shirt.name:", shirt.name);
console.log("  shirt.inStock:", shirt.inStock);  // true (default)


// ═══════════════════════════════════════
// 2. METHODS — Functions Inside a Class
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Methods — Functions Inside a Class\n");

// Methods are defined directly in the class body.
// No 'function' keyword needed.
// No commas between methods (unlike object literals).

class ProductWithMethods {
    constructor(name, price, moq, category) {
        this.name = name;
        this.price = price;
        this.moq = moq;
        this.category = category;
        this.inStock = true;
    }

    // Method — calculates bulk price with optional discount
    getBulkPrice(quantity, discount = 0) {
        // Guard clause — validate input
        if (quantity < this.moq) {
            return `❌ Minimum order is ${this.moq} units`;
        }
        // Calculate: price × quantity × (1 - discount)
        const total = this.price * quantity * (1 - discount);
        return `₹${total.toFixed(2)}`;
    }

    // Method — returns a display string
    getSummary() {
        return `${this.name} | ₹${this.price}/unit | MOQ: ${this.moq}`;
    }

    // Method — toggle stock status
    setOutOfStock() {
        this.inStock = false;
    }
}

const cotton = new ProductWithMethods("Cotton Fabric", 250, 100, "Textiles");

console.log("  Summary:", cotton.getSummary());
console.log("  Bulk price (200 units):", cotton.getBulkPrice(200));
console.log("  Bulk price (200 units, 10% off):", cotton.getBulkPrice(200, 0.1));
console.log("  Below MOQ:", cotton.getBulkPrice(50));

cotton.setOutOfStock();
console.log("  In stock:", cotton.inStock);  // false


// ═══════════════════════════════════════
// 3. GETTERS AND SETTERS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Getters and Setters\n");

// Getters look like properties but run a function.
// Setters let you control how a property is set.
// Accessed WITHOUT parentheses — looks like a regular property!

class Temperature {
    constructor(celsius) {
        this._celsius = celsius;  // _ prefix = convention for "private-ish"
    }

    // Getter — called as .celsius (NO parentheses)
    get celsius() {
        return this._celsius;
    }

    // Getter — calculated property
    get fahrenheit() {
        return (this._celsius * 9 / 5) + 32;
    }

    // Getter — summary
    get display() {
        return `${this._celsius}°C (${this.fahrenheit}°F)`;
    }

    // Setter — called as .celsius = value (NO parentheses)
    set celsius(value) {
        if (typeof value !== "number") {
            console.log("    ⚠️ Temperature must be a number!");
            return;
        }
        if (value < -273.15) {
            console.log("    ⚠️ Below absolute zero!");
            return;
        }
        this._celsius = value;
    }
}

const temp = new Temperature(25);
console.log("  temp.celsius:", temp.celsius);         // 25 (getter, no ())
console.log("  temp.fahrenheit:", temp.fahrenheit);   // 77 (getter, no ())
console.log("  temp.display:", temp.display);         // "25°C (77°F)"

temp.celsius = 100;  // Calls the setter
console.log("  After setting to 100:", temp.display);

temp.celsius = "hot";  // Setter validates!
temp.celsius = -300;   // Setter validates!
console.log("  Still:", temp.display);  // Unchanged because setters rejected


// ═══════════════════════════════════════
// 4. STATIC METHODS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Static Methods\n");

// Static methods belong to the CLASS, not to instances.
// Called on the class itself: ClassName.method()
// Can't access 'this' (since there's no instance).
// Similar to static methods in Java.

class MathHelper {
    // Regular method — needs an instance
    constructor(value) {
        this.value = value;
    }

    double() {
        return this.value * 2;
    }

    // Static method — called on the CLASS, not an instance
    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }

    static isPositive(num) {
        return num > 0;
    }
}

// Static methods — called on the class itself
console.log("  MathHelper.add(5, 3):", MathHelper.add(5, 3));         // 8
console.log("  MathHelper.multiply(4, 7):", MathHelper.multiply(4, 7)); // 28
console.log("  MathHelper.isPositive(-5):", MathHelper.isPositive(-5)); // false

// Instance methods — called on an instance
const num = new MathHelper(10);
console.log("  num.double():", num.double());  // 20

// ⚠️ You CANNOT call static methods on instances:
// num.add(1, 2)  → TypeError: num.add is not a function

// Real use case: compare function for sorting
class ProductSortable {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    // Static — compares two instances without needing an instance
    static compareByPrice(a, b) {
        return a.price - b.price;
    }
}

const products = [
    new ProductSortable("Silk", 800),
    new ProductSortable("Cotton", 250),
    new ProductSortable("Leather", 1200)
];

const sorted = [...products].sort(ProductSortable.compareByPrice);
console.log("\n  Sorted by price:");
sorted.forEach(p => console.log(`    ${p.name}: ₹${p.price}`));


// ═══════════════════════════════════════
// 5. toString() — Custom Display
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 toString() — Custom Display\n");

// Override toString() to control how your class looks when printed.
// Same concept as Java's toString()!

class User {
    constructor(name, role, active = true) {
        this.name = name;
        this.role = role;
        this.active = active;
    }

    toString() {
        const status = this.active ? "🟢" : "🔴";
        return `${status} ${this.name} (${this.role})`;
    }
}

const alice = new User("Alice", "Admin");
const bob = new User("Bob", "Viewer", false);

// toString() is called automatically in template literals
console.log("  Alice:", `${alice}`);  // "🟢 Alice (Admin)"
console.log("  Bob:", `${bob}`);      // "🔴 Bob (Viewer)"


// ═══════════════════════════════════════
// 6. JAVA ↔ JAVASCRIPT CLASS COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ JavaScript Class Comparison\n");

console.log("  ┌───────────────────────────────┬───────────────────────────────┐");
console.log("  │ Java                          │ JavaScript                    │");
console.log("  ├───────────────────────────────┼───────────────────────────────┤");
console.log("  │ public class Product          │ class Product                 │");
console.log("  │ public Product(String name)   │ constructor(name)             │");
console.log("  │ private String name           │ this.name = name (in constr.) │");
console.log("  │ public void method()          │ method() or async method()    │");
console.log("  │ private, public, protected    │ No access modifiers (yet)     │");
console.log("  │ int getPrice()               │ get price() { }               │");
console.log("  │ static int compare()         │ static compare() { }          │");
console.log("  │ new Product(...)             │ new Product(...)              │");
console.log("  │ Must declare types            │ No types (see TypeScript)     │");
console.log("  └───────────────────────────────┴───────────────────────────────┘");

console.log("\n  💡 If you know Java classes, JS classes will feel very familiar.");
console.log("     The biggest difference: no access modifiers, no type declarations.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 CLASSES BASICS SUMMARY\n");

console.log("  • class ClassName { }         → Define a class");
console.log("  • constructor(args) { }       → Initialize properties");
console.log("  • this.prop = value           → Create instance properties");
console.log("  • method() { }               → Define methods");
console.log("  • get prop() { }             → Getter (accessed without ())");
console.log("  • set prop(val) { }          → Setter (validated assignment)");
console.log("  • static method() { }        → Called on class, not instance");
console.log("  • toString() { }             → Custom string representation");
console.log("  • new ClassName(args)        → Create an instance");

console.log("\n═══════════════════════════════════════\n");
