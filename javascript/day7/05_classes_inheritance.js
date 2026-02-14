/**
 * ============================================
 * 05 - Classes — Inheritance
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * Inheritance = one class builds on another.
 * This is EXACTLY how Page Object Model works:
 * BasePage → SearchPage, LoginPage, etc.
 * 
 * Run: node 05_classes_inheritance.js
 */

console.log("═══════════════════════════════════════");
console.log("   CLASSES — Inheritance");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. extends & super() — Basics
// ═══════════════════════════════════════
console.log("📌 extends & super() — Basics\n");

// 'extends' makes one class inherit from another — SAME as Java!
// 'super()' calls the parent constructor — SAME as Java's super()!

// PARENT class (base class)
class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    speak() {
        return `${this.name} says ${this.sound}!`;
    }

    describe() {
        return `I am ${this.name}`;
    }
}

// CHILD class — inherits from Animal
class Dog extends Animal {
    constructor(name, breed) {
        // super() MUST be called FIRST in child constructor
        // It calls Animal's constructor with name and "Woof"
        super(name, "Woof");

        // Then you can add child-specific properties
        this.breed = breed;
    }

    // Child-specific method (not in Animal)
    fetch(item) {
        return `${this.name} fetches the ${item}! 🎾`;
    }
}

class Cat extends Animal {
    constructor(name, isIndoor) {
        super(name, "Meow");
        this.isIndoor = isIndoor;
    }

    // Override parent method — same concept as Java's @Override
    describe() {
        const location = this.isIndoor ? "indoor" : "outdoor";
        return `I am ${this.name}, an ${location} cat`;
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", true);

// Inherited methods work!
console.log("  dog.speak():", dog.speak());       // "Buddy says Woof!"
console.log("  cat.speak():", cat.speak());       // "Whiskers says Meow!"

// Child-specific methods:
console.log("  dog.fetch():", dog.fetch("ball"));  // "Buddy fetches the ball!"

// Overridden method:
console.log("  dog.describe():", dog.describe());  // "I am Buddy" (parent version)
console.log("  cat.describe():", cat.describe());  // "I am Whiskers, an indoor cat" (overridden)

// instanceof checks:
console.log("\n  dog instanceof Dog:", dog instanceof Dog);       // true
console.log("  dog instanceof Animal:", dog instanceof Animal);   // true
console.log("  cat instanceof Dog:", cat instanceof Dog);         // false


// ═══════════════════════════════════════
// 2. REAL EXAMPLE — Employee Hierarchy
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Real Example — Employee Hierarchy\n");

class Employee {
    constructor(name, department, salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    getAnnualSalary() {
        return this.salary * 12;
    }

    toString() {
        return `${this.name} (${this.department}) — ₹${this.salary}/month`;
    }
}

class Manager extends Employee {
    constructor(name, department, salary, teamSize) {
        super(name, department, salary);
        this.teamSize = teamSize;
    }

    // Managers get a bonus based on team size
    getAnnualSalary() {
        // Call parent's getAnnualSalary() using super
        const base = super.getAnnualSalary();
        const bonus = this.teamSize * 5000;  // ₹5000 per team member
        return base + bonus;
    }

    toString() {
        return `${this.name} (${this.department} Manager, ${this.teamSize} reports) — ₹${this.salary}/month`;
    }
}

class Intern extends Employee {
    constructor(name, department, stipend, duration) {
        super(name, department, stipend);
        this.duration = duration;  // months
    }

    // Interns get the total for their internship period, not annual
    getAnnualSalary() {
        return this.salary * this.duration;
    }

    toString() {
        return `${this.name} (Intern, ${this.department}, ${this.duration} months) — ₹${this.salary}/month`;
    }
}

const employees = [
    new Employee("Alice", "Engineering", 80000),
    new Manager("Bob", "Engineering", 120000, 8),
    new Intern("Charlie", "Engineering", 25000, 6)
];

console.log("  Team:");
for (const emp of employees) {
    console.log(`    ${emp}`);
    console.log(`      Annual/Total: ₹${emp.getAnnualSalary().toLocaleString()}`);
}


// ═══════════════════════════════════════
// 3. POM PREVIEW — BasePage Pattern ⭐⭐
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⭐⭐ POM Preview — BasePage Pattern\n");

// THIS IS EXACTLY HOW YOUR PLAYWRIGHT FRAMEWORK WILL WORK!
// Every page of the app = one class that extends BasePage.
// BasePage has shared methods. Child classes have page-specific methods.

// Base class — shared by ALL page classes
class BasePage {
    constructor(pageName) {
        this.pageName = pageName;
        this.baseURL = "https://b2b-platform.com";
    }

    // Shared methods — every page can use these
    navigateTo(path) {
        // In real Playwright: await this.page.goto(...)
        console.log(`    📍 Navigating to ${this.baseURL}${path}`);
    }

    getTitle() {
        // In real Playwright: return await this.page.title()
        return `${this.pageName} — B2B Platform`;
    }

    waitForPageLoad() {
        // In real Playwright: await this.page.waitForLoadState('networkidle')
        console.log(`    ⏳ Waiting for ${this.pageName} to load...`);
    }

    takeScreenshot(name) {
        // In real Playwright: await this.page.screenshot({ path: ... })
        console.log(`    📸 Screenshot saved: ${name}.png`);
    }
}

// SearchPage — extends BasePage
class SearchPage extends BasePage {
    constructor() {
        super("Search");  // Calls BasePage constructor

        // Page-specific locators (selectors)
        this.searchInput = "#search-box";
        this.searchButton = "#search-btn";
        this.resultItems = ".search-result";
    }

    search(query) {
        this.navigateTo("/search");  // Inherited method!
        // In real Playwright: await this.page.fill(...), await this.page.click(...)
        console.log(`    🔍 Typing "${query}" in ${this.searchInput}`);
        console.log(`    🖱️ Clicking ${this.searchButton}`);
    }

    getResultCount() {
        // In real Playwright: return await this.page.locator(...).count()
        const mockCount = 25;
        console.log(`    📊 Found ${mockCount} results`);
        return mockCount;
    }

    applyFilter(filterName) {
        console.log(`    🏷️ Applying filter: ${filterName}`);
    }
}

// ProductDetailPage — extends BasePage
class ProductDetailPage extends BasePage {
    constructor() {
        super("Product Detail");

        this.productTitle = ".product-title";
        this.priceDisplay = ".product-price";
        this.contactButton = "#contact-supplier";
    }

    openProduct(productId) {
        this.navigateTo(`/product/${productId}`);  // Inherited!
        this.waitForPageLoad();                    // Inherited!
    }

    getProductName() {
        // In real Playwright: return (await this.page.locator(...).textContent()).trim()
        return "Premium Cotton Fabric";
    }

    contactSupplier() {
        console.log(`    📧 Clicking ${this.contactButton}`);
        console.log(`    ✅ Contact form opened`);
    }
}

// USAGE — this is how POM works in practice!
console.log("  --- Simulating a POM test flow ---\n");

const searchPage = new SearchPage();
searchPage.search("cotton fabric");
searchPage.applyFilter("Textiles");
const count = searchPage.getResultCount();
console.log(`    Assertion: count (${count}) > 0 ✅`);

console.log();

const productPage = new ProductDetailPage();
productPage.openProduct(42);
const productName = productPage.getProductName();
console.log(`    Product: ${productName}`);
productPage.contactSupplier();
productPage.takeScreenshot("product_detail");  // Inherited from BasePage!


// ═══════════════════════════════════════
// 4. WHAT REAL PLAYWRIGHT POM LOOKS LIKE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 What Real Playwright POM Looks Like\n");

// Here's the ACTUAL Playwright code you'll write (preview):
console.log("  // BasePage.js");
console.log("  class BasePage {");
console.log("    constructor(page) {");
console.log("      this.page = page;    // Playwright's page object");
console.log("    }");
console.log("    async navigateTo(path) {");
console.log("      await this.page.goto(`https://site.com${path}`);");
console.log("    }");
console.log("  }");
console.log();
console.log("  // SearchPage.js");
console.log("  class SearchPage extends BasePage {");
console.log("    constructor(page) {");
console.log("      super(page);   // Pass page to BasePage");
console.log("      this.searchInput = '#search-box';");
console.log("    }");
console.log("    async search(query) {");
console.log("      await this.page.fill(this.searchInput, query);");
console.log("      await this.page.click('#search-btn');");
console.log("    }");
console.log("  }");
console.log();
console.log("  // In test file:");
console.log("  test('search test', async ({ page }) => {");
console.log("    const searchPage = new SearchPage(page);");
console.log("    await searchPage.search('cotton');");
console.log("  });");

console.log("\n  💡 Notice: EVERY method is 'async' and uses 'await'.");
console.log("     You'll learn async/await in the next files!");


// ═══════════════════════════════════════
// 5. JAVA ↔ JS INHERITANCE COMPARISON
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Java ↔ JS Inheritance Comparison\n");

console.log("  ┌───────────────────────────────┬───────────────────────────────┐");
console.log("  │ Java                          │ JavaScript                    │");
console.log("  ├───────────────────────────────┼───────────────────────────────┤");
console.log("  │ extends (same!)               │ extends (same!)               │");
console.log("  │ super() (same!)               │ super() (same!)               │");
console.log("  │ @Override annotation          │ Just redefine the method      │");
console.log("  │ super.method() (same!)        │ super.method() (same!)        │");
console.log("  │ Multiple interfaces           │ No interfaces (use TS)        │");
console.log("  │ abstract classes              │ No abstract (use TS)          │");
console.log("  │ final classes                 │ No final keyword              │");
console.log("  │ instanceof (same!)            │ instanceof (same!)            │");
console.log("  └───────────────────────────────┴───────────────────────────────┘");

console.log("\n  💡 Java → JS inheritance: almost 1:1 translation!");
console.log("     Your Java POM knowledge transfers directly.");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 INHERITANCE SUMMARY\n");

console.log("  • class Child extends Parent → Inherit everything");
console.log("  • super() in constructor      → Call parent constructor first");
console.log("  • super.method()              → Call parent's version of a method");
console.log("  • Override methods            → Just redefine them in child");
console.log("  • instanceof                  → Check class hierarchy");
console.log("  • POM pattern: BasePage → SearchPage, LoginPage, etc.");
console.log("  • Each page class has locators + action methods");
console.log("  • BasePage has shared methods (navigate, wait, screenshot)");

console.log("\n═══════════════════════════════════════\n");
