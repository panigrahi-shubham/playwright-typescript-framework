/**
 * ============================================
 * 03 — Abstract Classes
 * ============================================
 *
 * Day 10: Classes, Access Modifiers & Page Objects
 * Abstract classes = blueprints with shared logic
 * + contracts that child classes MUST fulfill.
 * Identical to Java abstract classes.
 *
 * Run: npx ts-node 03_abstract_classes.ts
 */

console.log("═══════════════════════════════════════");
console.log("   ABSTRACT CLASSES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BASIC ABSTRACT CLASS
// ═══════════════════════════════════════
console.log("📌 Basic Abstract Class\n");

// Abstract = can't be instantiated directly
// It's a TEMPLATE that defines shared logic + required methods

abstract class BasePage {
    constructor(protected pageName: string) { }

    // Concrete method — shared implementation (all children get this)
    navigate(path: string): void {
        console.log(`    → Navigating to ${path}`);
    }

    getTitle(): string {
        return `B2B Platform — ${this.pageName}`;
    }

    takeScreenshot(name: string): void {
        console.log(`    → Screenshot saved: screenshots/${name}.png`);
    }

    // Abstract methods — children MUST implement these
    abstract getPageURL(): string;
    abstract waitForPageLoad(): void;
}

// ❌ Cannot create BasePage directly:
// const page = new BasePage("test");  // ERROR: Cannot create instance of abstract class

console.log("  ❌ new BasePage() → ERROR (abstract)");
console.log("  ✅ Must extend and implement abstract methods\n");


// ═══════════════════════════════════════
// 2. CHILD CLASSES — IMPLEMENTING ABSTRACT METHODS
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📌 Child Classes — Implementing Abstract Methods\n");

class SearchPage extends BasePage {
    constructor() {
        super("Search");  // MUST call super() first
    }

    // MUST implement abstract methods:
    getPageURL(): string {
        return "/search";
    }

    waitForPageLoad(): void {
        console.log("    → Waiting for search results container...");
    }

    // Own methods:
    search(query: string): void {
        console.log(`    → Searching for: "${query}"`);
        this.waitForPageLoad();
    }

    getResultCount(): number {
        return 42;  // simulated
    }
}

class ProductDetailPage extends BasePage {
    constructor() {
        super("Product Detail");
    }

    getPageURL(): string {
        return "/product";
    }

    waitForPageLoad(): void {
        console.log("    → Waiting for product detail container...");
    }

    getProductName(): string {
        return "Cotton Shirt";
    }

    getPrice(): number {
        return 250;
    }
}

// Use the child classes:
const searchPage = new SearchPage();
console.log("  SearchPage:");
console.log("    getTitle():", searchPage.getTitle());       // inherited concrete
console.log("    getPageURL():", searchPage.getPageURL());   // implemented abstract
searchPage.navigate(searchPage.getPageURL());                  // inherited concrete
searchPage.search("cotton");
console.log("    getResultCount():", searchPage.getResultCount());

console.log("\n  ProductDetailPage:");
const productPage = new ProductDetailPage();
console.log("    getTitle():", productPage.getTitle());
console.log("    getPageURL():", productPage.getPageURL());
productPage.navigate(productPage.getPageURL());
productPage.waitForPageLoad();
console.log("    getProductName():", productPage.getProductName());
console.log("    getPrice():", productPage.getPrice());


// ═══════════════════════════════════════
// 3. ABSTRACT vs INTERFACE — WHEN TO USE WHICH
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Abstract Class vs Interface\n");

console.log("  ┌──────────────────────────┬─────────────────┬──────────────────┐");
console.log("  │ Feature                  │ Interface       │ Abstract Class   │");
console.log("  ├──────────────────────────┼─────────────────┼──────────────────┤");
console.log("  │ Has implementation       │ No (signatures) │ Yes (concrete)   │");
console.log("  │ Has constructor          │ No              │ Yes              │");
console.log("  │ Multiple inheritance     │ Many interfaces │ One class only   │");
console.log("  │ Runtime existence        │ Erased at build │ Exists at runtime│");
console.log("  │ Use for                  │ Data shapes     │ Base with logic  │");
console.log("  └──────────────────────────┴─────────────────┴──────────────────┘");


// ═══════════════════════════════════════
// 4. COMBINING BOTH — EXTENDS + IMPLEMENTS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Combining Both — extends + implements\n");

// Interface for search capability
interface Searchable {
    search(query: string): void;
    getResultCount(): number;
}

// Interface for filtering capability
interface Filterable {
    applyFilter(category: string): void;
    clearFilters(): void;
}

// Abstract base class with shared logic
abstract class BasePageV2 {
    constructor(protected pageName: string) { }

    navigate(path: string): void {
        console.log(`    → Navigating to ${path}`);
    }

    abstract getPageURL(): string;
    abstract waitForPageLoad(): void;
}

// Extends ONE class + implements MANY interfaces (same as Java!)
class AdvancedSearchPage extends BasePageV2 implements Searchable, Filterable {
    constructor() {
        super("Advanced Search");
    }

    // From abstract class:
    getPageURL(): string { return "/search"; }
    waitForPageLoad(): void { console.log("    → Waiting for results..."); }

    // From Searchable interface:
    search(query: string): void {
        console.log(`    → Searching: "${query}"`);
    }
    getResultCount(): number { return 42; }

    // From Filterable interface:
    applyFilter(category: string): void {
        console.log(`    → Filter: ${category}`);
    }
    clearFilters(): void {
        console.log("    → Filters cleared");
    }
}

const advSearch = new AdvancedSearchPage();
advSearch.navigate(advSearch.getPageURL());   // from abstract class
advSearch.search("silk fabric");               // from Searchable
advSearch.applyFilter("Textiles");             // from Filterable
advSearch.clearFilters();
console.log("  getResultCount():", advSearch.getResultCount());

console.log("\n  💡 Same as Java: class SearchPage extends BasePage implements Searchable, Filterable");
console.log("     → extends ONE class + implements MANY interfaces");


// ═══════════════════════════════════════
// 5. TEMPLATE METHOD PATTERN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Template Method Pattern\n");

// Abstract class defines the TEMPLATE (algorithm skeleton)
// Child classes fill in the DETAILS

abstract class BaseTest {
    // Template method — defines the workflow
    run(): void {
        console.log(`\n    ── ${this.getTestName()} ──`);
        this.setup();
        this.execute();
        this.verify();
        this.teardown();
        console.log(`    ── DONE ──`);
    }

    // Shared implementation:
    protected setup(): void {
        console.log("    [Setup] Opening browser...");
    }

    protected teardown(): void {
        console.log("    [Teardown] Closing browser...");
    }

    // Abstract — each test defines its own:
    abstract getTestName(): string;
    abstract execute(): void;
    abstract verify(): void;
}

class SearchTest extends BaseTest {
    getTestName(): string { return "Search Flow Test"; }

    execute(): void {
        console.log("    [Execute] Searching for 'cotton'...");
        console.log("    [Execute] Clicking first result...");
    }

    verify(): void {
        console.log("    [Verify] Checking result count > 0 ✅");
    }
}

class LoginTest extends BaseTest {
    getTestName(): string { return "Login Flow Test"; }

    execute(): void {
        console.log("    [Execute] Typing username...");
        console.log("    [Execute] Typing password...");
        console.log("    [Execute] Clicking login...");
    }

    verify(): void {
        console.log("    [Verify] Checking dashboard visible ✅");
    }
}

// Run both — same template, different implementations:
new SearchTest().run();
new LoginTest().run();

console.log("\n  💡 Template Method = define the STEPS, let children fill in DETAILS");
console.log("     This is exactly how test frameworks like TestNG/JUnit work!");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 ABSTRACT CLASSES SUMMARY\n");

console.log("  • abstract class:   Can't instantiate directly — only extend");
console.log("  • abstract method:  No body — child MUST implement");
console.log("  • concrete method:  Has body — child inherits it");
console.log("  • extends:          One class only (single inheritance)");
console.log("  • implements:       Multiple interfaces (multi-interface)");
console.log("  • super():          Call parent constructor first in child");
console.log("  • Template pattern: Define workflow, let children fill in steps");
console.log("  • 💡 Same as Java abstract classes — knowledge transfers directly");

console.log("\n═══════════════════════════════════════\n");

export { };
