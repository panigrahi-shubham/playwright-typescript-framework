/**
 * ============================================
 * 05 — Interview Problems & Practice
 * ============================================
 *
 * Day 10: Classes, Access Modifiers & Page Objects
 * Practice exercises combining classes, access
 * modifiers, abstract classes, and design patterns.
 *
 * Run: npx ts-node 05_interview_problems.ts
 */

console.log("═══════════════════════════════════════");
console.log("   INTERVIEW PROBLEMS & PRACTICE");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// PROBLEM 1: CONVERT JS CLASS TO TYPESCRIPT
// ═══════════════════════════════════════
console.log("📌 Problem 1: Convert JS Class to TypeScript\n");

// Original JavaScript (untyped):
// class MessageCenter {
//     constructor(currentUser) {
//         this.currentUser = currentUser;
//         this.messages = [];
//     }
//     sendMessage(to, text) { ... }
//     getUnreadMessages() { ... }
//     markAsRead(messageId) { ... }
// }

// ✅ SOLUTION — Fully typed TypeScript:

type MessageStatus = "sent" | "delivered" | "read";

interface Message {
    id: string;
    from: string;
    to: string;
    text: string;
    status: MessageStatus;
    timestamp: string;
}

class MessageCenter {
    private messages: Message[] = [];

    constructor(private readonly currentUser: string) { }

    sendMessage(to: string, text: string): Message {
        const msg: Message = {
            id: Date.now().toString(),
            from: this.currentUser,
            to,
            text,
            status: "sent",
            timestamp: new Date().toISOString()
        };
        this.messages.push(msg);
        return msg;
    }

    getUnreadMessages(): Message[] {
        return this.messages.filter(
            m => m.status !== "read" && m.to === this.currentUser
        );
    }

    markAsRead(messageId: string): void {
        const msg = this.messages.find(m => m.id === messageId);
        if (msg) msg.status = "read";
    }

    get messageCount(): number {
        return this.messages.length;
    }
}

const center = new MessageCenter("buyer@company.com");
const msg1 = center.sendMessage("supplier@textile.com", "What's your MOQ?");
console.log("  Sent:", msg1);
console.log("  Message count:", center.messageCount);

console.log("\n  TypeScript additions:");
console.log("    ✅ Message interface with strict types");
console.log("    ✅ MessageStatus union type (not just any string)");
console.log("    ✅ private messages[], readonly currentUser");
console.log("    ✅ Parameter property: constructor(private readonly currentUser)");
console.log("    ✅ Return types on all methods");


// ═══════════════════════════════════════
// PROBLEM 2: FIX 6 TYPE ERRORS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 2: Fix 6 Type Errors\n");

console.log("  The buggy code:");
console.log("  ─────────────────────────────────────");
console.log("  class SearchPage extends BasePage {");
console.log("    private results: string;            // 🐛 1: should be string[]");
console.log("    constructor(page: Page) {");
console.log("      this.page = page;                 // 🐛 2: missing super()");
console.log("    }");
console.log("    async search(query): Promise<void>{ // 🐛 3: 'query' needs type");
console.log("      await this.page.fill('#search', query);");
console.log("    }");
console.log("    getResultCount(): number {           // 🐛 4: .count() is async");
console.log("      return this.page.locator('.result').count();");
console.log("    }");
console.log("    private async waitForLoad()...       // 🐛 5: called from outside");
console.log("  }");
console.log("  searchPage.waitForLoad();              // 🐛 6: private method!");

console.log("\n  ✅ Fixes:");
console.log("    1. private results: string[]  (array, not single string)");
console.log("    2. super(page);  (MUST call super before using 'this')");
console.log("    3. async search(query: string)  (add type annotation)");
console.log("    4. async getResultCount(): Promise<number>  (.count() is async)");
console.log("    5. Make waitForLoad() public/protected if called externally");
console.log("    6. Can't call private method from outside the class");


// ═══════════════════════════════════════
// PROBLEM 3: DESIGN PAGE OBJECT HIERARCHY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 3: Design Page Object Hierarchy\n");

// Interface contracts:
interface IPage {
    navigate(path: string): Promise<void>;
    getTitle(): Promise<string>;
    takeScreenshot(name: string): Promise<void>;
    getCurrentURL(): string;
}

interface ISearchable {
    search(query: string): Promise<void>;
    getResultCount(): Promise<number>;
    getResults(): Promise<string[]>;
    clearSearch(): Promise<void>;
}

// Abstract base class with shared logic:
abstract class BasePageTyped implements IPage {
    constructor(protected readonly pageName: string) { }

    // Concrete — shared by all pages:
    async navigate(path: string): Promise<void> {
        console.log(`    → [${this.pageName}] Navigating to ${path}`);
    }

    async getTitle(): Promise<string> {
        return `B2B Platform — ${this.pageName}`;
    }

    async takeScreenshot(name: string): Promise<void> {
        console.log(`    → [${this.pageName}] Screenshot: ${name}.png`);
    }

    getCurrentURL(): string {
        return `https://b2b-platform.com${this.getPageURL()}`;
    }

    // Abstract — each page defines its own:
    abstract getPageURL(): string;
    abstract waitForPageLoad(): Promise<void>;
}

// Concrete pages:
class TypedSearchPage extends BasePageTyped implements ISearchable {
    constructor() { super("Search"); }

    getPageURL(): string { return "/search"; }

    async waitForPageLoad(): Promise<void> {
        console.log("    → [Search] Waiting for results...");
    }

    async search(query: string): Promise<void> {
        console.log(`    → [Search] Searching: "${query}"`);
        await this.waitForPageLoad();
    }

    async getResultCount(): Promise<number> { return 42; }

    async getResults(): Promise<string[]> {
        return ["Cotton Shirt", "Silk Fabric", "Linen Cloth"];
    }

    async clearSearch(): Promise<void> {
        console.log("    → [Search] Cleared");
    }
}

class TypedProductPage extends BasePageTyped {
    constructor() { super("Product Detail"); }

    getPageURL(): string { return "/product"; }

    async waitForPageLoad(): Promise<void> {
        console.log("    → [Product] Waiting for detail...");
    }

    async getProductName(): Promise<string> { return "Cotton Shirt"; }
    async getPrice(): Promise<number> { return 250; }
}

// Page Factory — static generic method:
class PageFactory {
    static createPage<T extends BasePageTyped>(PageClass: new () => T): T {
        const page = new PageClass();
        console.log(`    → PageFactory created: ${page.getCurrentURL()}`);
        return page;
    }
}

// Usage:
const search = PageFactory.createPage(TypedSearchPage);
const productDetail = PageFactory.createPage(TypedProductPage);

(async () => {
    await search.search("cotton");
    const count = await search.getResultCount();
    console.log("  Result count:", count);
    console.log("  Product URL:", productDetail.getCurrentURL());
})();

console.log("\n  💡 This IS your Playwright framework architecture:");
console.log("     • Interfaces define contracts");
console.log("     • Abstract class provides shared behavior");
console.log("     • Child classes implement page-specific logic");
console.log("     • PageFactory creates typed page instances");


// ═══════════════════════════════════════
// PROBLEM 4: DEBUG CHALLENGE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Problem 4: Debug Challenge 🐛\n");

console.log("  The code:");
console.log("  ─────────────────────────────────────");
console.log("  class SearchPage extends BasePage {");
console.log("    private searchBox = this.page.locator('#search-box');");
console.log("    private searchBtn = this.page.locator('#search-btn');");
console.log("");
console.log("    constructor(page: Page) {");
console.log("      super(page);");
console.log("    }");
console.log("");
console.log("    async search(query: string) {");
console.log("      await this.searchBox.fill(query);");
console.log("      await this.searchBtn.click();");
console.log("    }");
console.log("  }");

console.log("\n  🐛 Design concern:");
console.log("     Locators are stored as FIXED references at construction time.");
console.log("     In Selenium, this causes StaleElementReferenceException.");
console.log("     In Playwright, locators are LAZY (evaluate when used),");
console.log("     so both approaches work — but getters are cleaner:");

console.log("\n  ✅ Better pattern — getters (fresh locator each time):");
console.log("     get searchBox() { return this.page.locator('#search-box'); }");
console.log("     get searchBtn() { return this.page.locator('#search-btn'); }");
console.log("\n  → Creates a fresh locator each time, more maintainable");


// ═══════════════════════════════════════
// COMMON MISTAKES TABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 Common Mistakes\n");

console.log("  ┌─────────────────────────────────┬─────────────────────────────────┐");
console.log("  │ Mistake                         │ Correct Way                     │");
console.log("  ├─────────────────────────────────┼─────────────────────────────────┤");
console.log("  │ Not using parameter properties  │ constructor(private page: Page) │");
console.log("  │ Everything public               │ private internal, public API    │");
console.log("  │ Abstract class, no abstract     │ Add abstract methods or make    │");
console.log("  │   methods                       │   it a regular class            │");
console.log("  │ Forgetting super() in child     │ First line: super(...)          │");
console.log("  │ No readonly on dependencies     │ private readonly page: Page     │");
console.log("  │ Singleton with public constr.   │ private constructor()           │");
console.log("  │ Class when object literal works │ Data-only? Use interface        │");
console.log("  └─────────────────────────────────┴─────────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 DAY 10 KEY TAKEAWAYS\n");

console.log("  • Classes: Nearly identical to Java — constructor, extends, super()");
console.log("  • Access modifiers: public (default), protected, private");
console.log("  • Parameter props: constructor(private x: T) — auto-declare");
console.log("  • Getters/Setters: get x() / set x(v) — called like properties");
console.log("  • Static: Class-level members — TestUtils.generateId()");
console.log("  • Abstract: Blueprint with shared logic + required contracts");
console.log("  • Patterns: Factory<T>, Builder, Singleton, API Client");
console.log("  • Framework: BasePage → SearchPage/ProductPage + interfaces");

console.log("\n  🎤 Interview answer:");
console.log('     "I build my Playwright framework with TypeScript classes using');
console.log('      proper encapsulation — private for internal state, protected');
console.log('      for inheritance, public for the test API. My BasePage is abstract');
console.log('      with shared methods and abstract contracts. I use generics for');
console.log('      reusable factories, Builder pattern for configs, and Singleton');
console.log('      for framework settings."');

console.log("\n═══════════════════════════════════════\n");

export { };
