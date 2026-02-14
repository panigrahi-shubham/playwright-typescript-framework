/**
 * ============================================
 * 08 - Practice Exercises & Debug Challenge
 * ============================================
 * 
 * Day 7: Objects, Classes & Async/Await
 * Test your understanding! These exercises
 * build directly toward your POM framework.
 * 
 * Run: node 08_practice_exercises.js
 */

console.log("═══════════════════════════════════════");
console.log("   PRACTICE EXERCISES — Day 7");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// EXERCISE 1: Object Mastery
// ═══════════════════════════════════════
console.log("📋 EXERCISE 1: Supplier Profile Object\n");

// Create a supplierProfile object with:
// - Nested object: company (name, location, yearEstablished)
// - Nested object: verification (isVerified, certifications array)
// - Array: products (at least 3 product objects with name, price, moq)
// - Method: getTopProduct() — returns product with highest price
// - Method: getCertificationSummary() — returns formatted string

const supplierProfile = {
    company: {
        name: "TextilePro International",
        location: "Shanghai, China",
        yearEstablished: 2005
    },
    verification: {
        isVerified: true,
        certifications: ["ISO 9001", "OEKO-TEX", "GOTS"]
    },
    products: [
        { name: "Premium Cotton Fabric", price: 250, moq: 100 },
        { name: "Silk Thread Roll", price: 800, moq: 50 },
        { name: "Organic Linen Sheet", price: 1200, moq: 25 },
        { name: "Polyester Blend", price: 150, moq: 200 }
    ],

    // Method: Find the most expensive product
    getTopProduct() {
        // Use reduce to find the product with the highest price
        // Compare each product's price against the current max
        return this.products.reduce((top, product) =>
            product.price > top.price ? product : top
        );
    },

    // Method: Format certifications into a readable string
    getCertificationSummary() {
        const certs = this.verification.certifications;
        return `${certs.join(", ")} (${certs.length} certifications)`;
    }
};

// Test the object
console.log("  Company:", supplierProfile.company.name);
console.log("  Location:", supplierProfile.company.location);
console.log("  Verified:", supplierProfile.verification.isVerified);
console.log("  Top product:", supplierProfile.getTopProduct().name,
    `— ₹${supplierProfile.getTopProduct().price}`);
console.log("  Certifications:", supplierProfile.getCertificationSummary());

// Destructure company name, location, and first certification
const {
    company: { name: companyName, location },
    verification: { certifications: [firstCert] }
} = supplierProfile;

console.log("\n  Destructured:");
console.log("    Company:", companyName);
console.log("    Location:", location);
console.log("    First cert:", firstCert);


// ═══════════════════════════════════════
// EXERCISE 2: Class — MessageCenter
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 2: MessageCenter Class\n");

// Create a MessageCenter class with:
// - Constructor takes userName
// - Properties: messages array, userName
// - sendMessage(recipient, text): adds message with from, to, text, read: false, timestamp
// - getUnreadCount(): returns count of unread messages
// - getConversation(contactName): returns all messages to/from that contact
// - markAsRead(index): marks a specific message as read

class MessageCenter {
    constructor(userName) {
        this.userName = userName;
        this.messages = [];
    }

    // Send a message — creates a message object and adds it to the array
    sendMessage(recipient, text) {
        this.messages.push({
            from: this.userName,
            to: recipient,
            text: text,
            read: false,
            timestamp: Date.now()
        });
    }

    // Receive a message (simulates incoming messages)
    receiveMessage(sender, text) {
        this.messages.push({
            from: sender,
            to: this.userName,
            text: text,
            read: false,
            timestamp: Date.now()
        });
    }

    // Count unread messages
    getUnreadCount() {
        return this.messages.filter(m => !m.read).length;
    }

    // Get all messages with a specific contact (sent or received)
    getConversation(contactName) {
        return this.messages.filter(m =>
            m.from === contactName || m.to === contactName
        );
    }

    // Mark a specific message as read
    markAsRead(index) {
        if (index >= 0 && index < this.messages.length) {
            this.messages[index].read = true;
        }
    }

    // Mark all messages as read
    markAllRead() {
        this.messages.forEach(m => m.read = true);
    }
}

// Test the MessageCenter
const mc = new MessageCenter("Rahul");

mc.sendMessage("Supplier A", "What is the MOQ for cotton?");
mc.sendMessage("Supplier B", "Please send price list");
mc.sendMessage("Supplier A", "Can you offer a discount?");
mc.receiveMessage("Supplier A", "MOQ is 100 units");
mc.receiveMessage("Supplier B", "Attached price list PDF");

console.log(`  User: ${mc.userName}`);
console.log(`  Total messages: ${mc.messages.length}`);
console.log(`  Unread: ${mc.getUnreadCount()}`);

const convoA = mc.getConversation("Supplier A");
console.log(`\n  Conversation with Supplier A (${convoA.length} messages):`);
convoA.forEach(m => {
    console.log(`    ${m.from} → ${m.to}: "${m.text}"`);
});

mc.markAsRead(0);
mc.markAsRead(1);
console.log(`\n  After marking 2 as read: ${mc.getUnreadCount()} unread`);

mc.markAllRead();
console.log(`  After markAllRead: ${mc.getUnreadCount()} unread`);


// ═══════════════════════════════════════
// EXERCISE 3: Inheritance — Page Classes
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 3: Page Object Inheritance\n");

// Create BasePage and two child classes.
// Methods log what they would do (since we don't have Playwright yet).

class BasePage {
    constructor(pageName) {
        this.pageName = pageName;
        this.baseURL = "https://b2b-platform.com";
    }

    navigate(path) {
        console.log(`    [${this.pageName}] Navigating to ${this.baseURL}${path}`);
    }

    getPageTitle() {
        return `${this.pageName} — B2B Platform`;
    }

    waitForLoad() {
        console.log(`    [${this.pageName}] Waiting for page to load...`);
    }
}

class SearchPage extends BasePage {
    constructor() {
        super("Search");
        this.searchInput = "#search-box";
        this.searchButton = "#search-btn";
        this.resultsSelector = ".search-result";
    }

    search(query) {
        this.navigate("/search");
        console.log(`    [Search] Typing "${query}" into ${this.searchInput}`);
        console.log(`    [Search] Clicking ${this.searchButton}`);
        this.waitForLoad();
    }

    getResultCount() {
        console.log(`    [Search] Counting ${this.resultsSelector} elements`);
        return 25;  // mock
    }

    applyFilter(category) {
        console.log(`    [Search] Applying filter: ${category}`);
    }
}

class CompanyPage extends BasePage {
    constructor() {
        super("Company");
        this.companyTitle = ".company-name";
        this.productList = ".product-card";
        this.contactBtn = "#contact-btn";
    }

    openCompany(companyId) {
        this.navigate(`/company/${companyId}`);
        this.waitForLoad();
    }

    getCompanyName() {
        console.log(`    [Company] Reading ${this.companyTitle}`);
        return "TextilePro International";  // mock
    }

    getProductList() {
        console.log(`    [Company] Getting all ${this.productList}`);
        return ["Cotton Fabric", "Silk Thread", "Linen Sheet"];  // mock
    }
}

// Test the page classes
console.log("  --- Search Test Flow ---");
const search = new SearchPage();
search.search("cotton fabric");
search.applyFilter("Textiles");
const resultCount = search.getResultCount();
console.log(`    Assertion: ${resultCount} results > 0 ✅`);

console.log("\n  --- Company Test Flow ---");
const companyPage = new CompanyPage();
companyPage.openCompany(42);
const name = companyPage.getCompanyName();
const productList = companyPage.getProductList();
console.log(`    Company: ${name}`);
console.log(`    Products: ${productList.join(", ")}`);
console.log(`    Title: ${companyPage.getPageTitle()}`);


// ═══════════════════════════════════════
// EXERCISE 4: Async/Await Simulation
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 4: Async/Await Simulation\n");

// Helper to simulate async operations
const simulateAsync = (value, delayMs = 100) => {
    return new Promise(resolve => setTimeout(() => resolve(value), delayMs));
};

// Write an async function that simulates a search test flow
async function runSearchTest() {
    console.log("  Running simulated search test...\n");

    // Step 1: Navigate
    const nav = await simulateAsync("Navigated to /search");
    console.log(`    1. ${nav}`);

    // Step 2: Type search query
    const typed = await simulateAsync("Typed 'cotton fabric'");
    console.log(`    2. ${typed}`);

    // Step 3: Click search
    const clicked = await simulateAsync("Clicked search button");
    console.log(`    3. ${clicked}`);

    // Step 4: Wait for results
    const results = await simulateAsync(["Product A", "Product B", "Product C"]);
    console.log(`    4. Got ${results.length} results`);

    // Step 5: Check results
    if (results.length > 0) {
        console.log("    5. ✅ Assertion passed: results.length > 0");
    }

    // Step 6: Loop through results with for...of + await
    console.log("\n    Verifying each result:");
    for (const result of results) {
        const verified = await simulateAsync(`Verified: ${result}`, 30);
        console.log(`      ${verified}`);
    }

    console.log("\n    🎉 Search test completed!\n");
}


// ═══════════════════════════════════════
// EXERCISE 5: The Forbidden forEach
// ═══════════════════════════════════════

async function exercise5() {
    console.log("─".repeat(45));
    console.log("\n📋 EXERCISE 5: The Forbidden forEach\n");

    // EXPLAIN: Why is this code broken?
    //
    // const productIds = [101, 102, 103, 104, 105];
    // productIds.forEach(async (id) => {
    //     const response = await fetch(`/api/product/${id}`);
    //     const data = await response.json();
    //     console.log(`Product ${id}: ${data.name}`);
    // });
    // console.log("All products loaded!");
    //
    // ANSWER:
    // forEach does NOT wait for async callbacks.
    // It fires ALL iterations simultaneously and moves on.
    // "All products loaded!" prints BEFORE any product is fetched.
    // forEach ignores the Promises returned by each callback.

    console.log("  Why forEach + async is broken:");
    console.log("    1. forEach fires all callbacks simultaneously");
    console.log("    2. It does NOT await the Promises from callbacks");
    console.log("    3. Code after forEach runs BEFORE callbacks finish");
    console.log("    4. Order is unpredictable\n");

    const productIds = [101, 102, 103];

    // ✅ FIX 1: Sequential (for...of)
    console.log("  ✅ Fix 1: Sequential (for...of)");
    for (const id of productIds) {
        const product = await simulateAsync({ id, name: `Product ${id}` }, 30);
        console.log(`    Loaded: ${product.name}`);
    }
    console.log("    All loaded (in order) ✅\n");

    // ✅ FIX 2: Parallel (Promise.all + map)
    console.log("  ✅ Fix 2: Parallel (Promise.all + map)");
    const allProducts = await Promise.all(
        productIds.map(id => simulateAsync({ id, name: `Product ${id}` }, 30))
    );
    allProducts.forEach(p => console.log(`    Loaded: ${p.name}`));
    console.log("    All loaded (simultaneously, fastest) ✅");
}


// ═══════════════════════════════════════
// DEBUG CHALLENGE
// ═══════════════════════════════════════

async function debugChallenge() {
    console.log("\n" + "─".repeat(45));
    console.log("\n🐛 DEBUG CHALLENGE: Find 3 Bugs\n");

    // What's wrong with this class?
    console.log("  What's wrong with this code?");
    console.log();
    console.log("    class ProductPage {");
    console.log("      constructor(page) {");
    console.log("        this.page = page;");
    console.log("        this.title = '.product-title';");
    console.log("        this.price = '.product-price';");
    console.log("      }");
    console.log("      getProductInfo() {");
    console.log("        const name = this.page.locator(this.title).textContent();");
    console.log("        const price = this.page.locator(this.price).textContent();");
    console.log("        return { name, price };");
    console.log("      }");
    console.log("    }");

    console.log("\n  💭 Think for 30 seconds...\n");

    console.log("  ANSWER — 3 bugs:");
    console.log("    1. ❌ getProductInfo() is NOT marked as 'async'");
    console.log("    2. ❌ textContent() is NOT 'await'ed — returns Promises!");
    console.log("    3. ❌ Return value contains Promise objects, not strings");

    console.log("\n  ✅ Fixed version:");
    console.log("    async getProductInfo() {");
    console.log("      const name = await this.page.locator(this.title).textContent();");
    console.log("      const price = await this.page.locator(this.price).textContent();");
    console.log("      return { name: name.trim(), price: price.trim() };");
    console.log("    }");

    console.log("\n  Also added .trim() — always trim text from web elements!");


    // ═══════════════════════════════════════
    // CHECKLIST
    // ═══════════════════════════════════════
    console.log("\n" + "─".repeat(45));
    console.log("\n📋 DAY 7 CHECKLIST\n");

    const checklist = [
        "Create and access objects (dot and bracket notation)",
        "Use destructuring to extract properties",
        "Add methods to objects and understand 'this'",
        "Use spread operator to copy/merge objects",
        "Loop over objects with Object.keys/values/entries",
        "Parse and stringify JSON",
        "Create classes with constructors and methods",
        "Use getters, setters, and static methods",
        "Implement inheritance with extends and super()",
        "Understand POM pattern (BasePage → child pages)",
        "Create and use Promises",
        "Write async/await functions",
        "Know sequential vs parallel async patterns",
        "NEVER use forEach with async/await",
        "Solve all 5 practice exercises"
    ];

    checklist.forEach((item, i) => {
        console.log(`  ${String(i + 1).padStart(2)}. ${item}`);
    });

    console.log("\n  🎯 After today, you can confidently say:");
    console.log("     'I understand objects, classes, and async/await.");
    console.log("      I can build a Page Object Model framework.'");

    console.log("\n═══════════════════════════════════════\n");
}

// Run all async exercises in sequence
async function runAll() {
    await runSearchTest();
    await exercise5();
    await debugChallenge();
}

runAll();
