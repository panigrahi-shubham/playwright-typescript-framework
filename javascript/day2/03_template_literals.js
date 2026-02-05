/**
 * ============================================
 * 03 - Template Literals in JavaScript
 * ============================================
 * 
 * Day 2: Modern string syntax with backticks!
 * Template literals make string building much easier.
 * 
 * Run this file: node 03_template_literals.js
 */

console.log("═══════════════════════════════════════");
console.log("   TEMPLATE LITERALS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// WHAT ARE TEMPLATE LITERALS?
// ═══════════════════════════════════════
console.log("📝 What are Template Literals?\n");
console.log("  Template literals use BACKTICKS (`) instead of quotes");
console.log("  They allow embedded expressions with ${...}\n");

// Old way vs New way
console.log("Old Way (concatenation):");
const name1 = "John";
const age1 = 25;
const oldWay = "Hello, my name is " + name1 + " and I am " + age1 + " years old.";
console.log("  " + oldWay);

console.log("\nNew Way (template literal):");
const name2 = "John";
const age2 = 25;
const newWay = `Hello, my name is ${name2} and I am ${age2} years old.`;
console.log("  " + newWay);


// ═══════════════════════════════════════
// BASIC SYNTAX: ${expression}
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 BASIC SYNTAX: ${expression}\n");

const username = "standard_user";
const browser = "chromium";
const testCount = 42;

console.log("Variables in strings:");
console.log(`  Username: ${username}`);
console.log(`  Browser: ${browser}`);
console.log(`  Tests run: ${testCount}`);


// ═══════════════════════════════════════
// EXPRESSIONS INSIDE ${}
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🧮 EXPRESSIONS INSIDE ${}\n");

// Math operations
const price = 29.99;
const quantity = 3;
console.log("Math operations:");
console.log(`  Price: $${price}`);
console.log(`  Quantity: ${quantity}`);
console.log(`  Total: $${price * quantity}`);
console.log(`  With tax (8%): $${(price * quantity * 1.08).toFixed(2)}`);

// Method calls
const message = "hello world";
console.log("\nMethod calls:");
console.log(`  Original: ${message}`);
console.log(`  Uppercase: ${message.toUpperCase()}`);
console.log(`  Length: ${message.length} characters`);

// Ternary operator
const isLoggedIn = true;
const items = 5;
console.log("\nTernary operator:");
console.log(`  Status: ${isLoggedIn ? "Logged In" : "Logged Out"}`);
console.log(`  Items: ${items === 0 ? "Cart is empty" : items + " items in cart"}`);

// Function calls
const getGreeting = (name) => `Hello, ${name}!`;
console.log("\nFunction calls:");
console.log(`  Greeting: ${getGreeting("Tester")}`);


// ═══════════════════════════════════════
// MULTI-LINE STRINGS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📄 MULTI-LINE STRINGS\n");

console.log("Old way (with \\n):");
const oldMultiline = "Line 1\nLine 2\nLine 3";
console.log(oldMultiline);

console.log("\nNew way (template literal):");
const newMultiline = `Line 1
Line 2
Line 3`;
console.log(newMultiline);

// Practical example: HTML template
console.log("\n🌐 HTML Template Example:");
const productName = "Sauce Labs Backpack";
const productPrice = 29.99;
const productId = "item-4";

const htmlCard = `
<div class="product-card" id="${productId}">
    <h3>${productName}</h3>
    <p class="price">$${productPrice}</p>
    <button class="add-to-cart">Add to Cart</button>
</div>
`;
console.log(htmlCard);


// ═══════════════════════════════════════
// AUTOMATION USE CASES
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n🤖 AUTOMATION USE CASES\n");

// 1. Building URLs
console.log("1. Building URLs:");
const baseUrl = "https://www.saucedemo.com";
const endpoint = "inventory";
const productId2 = 4;

console.log(`  Base: ${baseUrl}`);
console.log(`  Inventory page: ${baseUrl}/${endpoint}`);
console.log(`  Product page: ${baseUrl}/product/${productId2}`);

// 2. Dynamic selectors
console.log("\n2. Dynamic Selectors:");
const userId = 123;
const rowIndex = 5;
const columnName = "email";

const cssSelector = `#user-${userId}`;
const dataTestId = `[data-testid="row-${rowIndex}"]`;
const nthChild = `table tr:nth-child(${rowIndex}) td.${columnName}`;

console.log(`  CSS: ${cssSelector}`);
console.log(`  Data TestId: ${dataTestId}`);
console.log(`  Complex: ${nthChild}`);

// 3. XPath construction
console.log("\n3. XPath Construction:");
const buttonText = "Add to cart";
const linkText = "View Details";

const xpathButton = `//button[text()='${buttonText}']`;
const xpathLink = `//a[contains(text(), '${linkText}')]`;

console.log(`  Button xpath: ${xpathButton}`);
console.log(`  Link xpath: ${xpathLink}`);

// 4. Test messages
console.log("\n4. Test Messages & Assertions:");
const expected = "Swag Labs";
const actual = "Swag Labs";
const testName = "Login Test";

console.log(`  ✓ ${testName}: Expected "${expected}", got "${actual}"`);
console.log(`  Test completed at ${new Date().toLocaleTimeString()}`);

// 5. Log messages
console.log("\n5. Logging:");
const action = "click";
const element = "#login-button";
const timestamp = new Date().toISOString();

console.log(`  [${timestamp}] Action: ${action} on ${element}`);

// 6. API request bodies
console.log("\n6. API Request Bodies:");
const apiUsername = "testuser";
const apiPassword = "testpass123";

const jsonBody = `{
    "username": "${apiUsername}",
    "password": "${apiPassword}",
    "timestamp": "${new Date().toISOString()}"
}`;
console.log("  Request Body:");
console.log(jsonBody);


// ═══════════════════════════════════════
// NESTING TEMPLATE LITERALS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🎭 NESTING TEMPLATE LITERALS\n");

const items2 = ["apple", "banana", "cherry"];
const list = `Items: ${items2.map(item => `[${item.toUpperCase()}]`).join(" ")}`;
console.log(list);

// Conditional HTML
const isAdmin = true;
const adminBadge = `User: ${username} ${isAdmin ? `<span class="badge">ADMIN</span>` : ""}`;
console.log(adminBadge);


// ═══════════════════════════════════════
// TAGGED TEMPLATE LITERALS (Advanced)
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🏷️ TAGGED TEMPLATES (Advanced)\n");

// Simple tag function
function highlight(strings, ...values) {
    let result = "";
    strings.forEach((str, i) => {
        result += str;
        if (i < values.length) {
            result += `**${values[i]}**`;
        }
    });
    return result;
}

const item = "Sauce Labs Backpack";
const cost = 29.99;
const tagged = highlight`Product: ${item} costs $${cost}`;
console.log("Tagged result:", tagged);


// ═══════════════════════════════════════
// ESCAPING IN TEMPLATE LITERALS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔤 ESCAPING SPECIAL CHARACTERS\n");

// Escaping backticks
const withBacktick = `This has a backtick: \``;
console.log("Backtick:", withBacktick);

// Escaping ${
const dollarSign = `Price: \${price} is the variable`;
console.log("Literal ${:", dollarSign);


// ═══════════════════════════════════════
// COMPARISON TABLE
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 COMPARISON: OLD vs NEW\n");

console.log("┌──────────────────┬────────────────────────────────┐");
console.log("│ Old Way          │ Template Literal               │");
console.log("├──────────────────┼────────────────────────────────┤");
console.log("│ 'Hello ' + name  │ `Hello ${name}`                │");
console.log("│ 'Line1\\nLine2'   │ `Line1                         │");
console.log("│                  │  Line2`                        │");
console.log("│ str.concat(a,b)  │ `${a}${b}`                     │");
console.log("└──────────────────┴────────────────────────────────┘");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 TEMPLATE LITERALS SUMMARY\n");

console.log("💡 Key Points:");
console.log("  • Use backticks (`) instead of quotes");
console.log("  • Embed variables with ${variableName}");
console.log("  • Embed expressions with ${expression}");
console.log("  • Multi-line strings without \\n");
console.log("  • Perfect for URLs, selectors, HTML, logs");
console.log("  • Escape with \\ when needed");

console.log("\n🤖 Automation Benefits:");
console.log("  • Dynamic URL construction");
console.log("  • Dynamic CSS/XPath selectors");
console.log("  • Clean log messages");
console.log("  • Readable test assertions");

console.log("\n═══════════════════════════════════════\n");
