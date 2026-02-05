/**
 * ============================================
 * 06 - Lab: Test Data Variables
 * ============================================
 * 
 * Day 2 Lab Exercise
 * Create variables for automation test data!
 * 
 * Run this file: node 06_lab_test_data.js
 */

console.log("═══════════════════════════════════════");
console.log("   LAB: TEST DATA VARIABLES");
console.log("═══════════════════════════════════════\n");

// ═══════════════════════════════════════
// EXERCISE 1: User Credentials
// ═══════════════════════════════════════
console.log("📋 EXERCISE 1: User Credentials\n");

// TODO: Create test user credentials
const validUsername = "standard_user";
const validPassword = "secret_sauce";
const invalidUsername = "invalid_user";
const invalidPassword = "wrong_password";
const lockedUsername = "locked_out_user";

console.log("Valid Credentials:");
console.log(`  Username: ${validUsername}`);
console.log(`  Password: ${validPassword}`);

console.log("\nInvalid Credentials:");
console.log(`  Username: ${invalidUsername}`);
console.log(`  Password: ${invalidPassword}`);

console.log("\nLocked User:");
console.log(`  Username: ${lockedUsername}`);


// ═══════════════════════════════════════
// EXERCISE 2: Product Data
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📦 EXERCISE 2: Product Data\n");

// TODO: Create product test data
const productName = "Sauce Labs Backpack";
const productPrice = 29.99;
const productDescription = "Carry all your items in this lightweight backpack";
const productId = "sauce-labs-backpack";
const inStock = true;
const quantity = 1;

console.log("Product Details:");
console.log(`  Name: ${productName}`);
console.log(`  Price: $${productPrice}`);
console.log(`  ID: ${productId}`);
console.log(`  In Stock: ${inStock}`);
console.log(`  Quantity: ${quantity}`);


// ═══════════════════════════════════════
// EXERCISE 3: Environment Config
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚙️ EXERCISE 3: Environment Config\n");

// TODO: Create environment configuration
const baseUrl = "https://www.saucedemo.com";
const apiBaseUrl = "https://api.saucedemo.com";
const timeout = 30000;
const retries = 3;
const headless = true;
const slowMo = 0;

console.log("Environment Config:");
console.log(`  Base URL: ${baseUrl}`);
console.log(`  API URL: ${apiBaseUrl}`);
console.log(`  Timeout: ${timeout}ms`);
console.log(`  Retries: ${retries}`);
console.log(`  Headless: ${headless}`);
console.log(`  Slow Motion: ${slowMo}ms`);


// ═══════════════════════════════════════
// EXERCISE 4: Page Selectors
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🎯 EXERCISE 4: Page Selectors\n");

// TODO: Create CSS selectors for login page
const selectors = {
    usernameInput: "#user-name",
    passwordInput: "#password",
    loginButton: "#login-button",
    errorMessage: "[data-test='error']",
    logo: ".login_logo"
};

console.log("Login Page Selectors:");
Object.entries(selectors).forEach(([name, selector]) => {
    console.log(`  ${name}: "${selector}"`);
});


// ═══════════════════════════════════════
// EXERCISE 5: Test Data Object
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🗂️ EXERCISE 5: Combined Test Data Object\n");

// TODO: Create a comprehensive test data object
const testData = {
    users: {
        standard: { username: "standard_user", password: "secret_sauce" },
        locked: { username: "locked_out_user", password: "secret_sauce" },
        problem: { username: "problem_user", password: "secret_sauce" }
    },
    products: [
        { name: "Sauce Labs Backpack", price: 29.99 },
        { name: "Sauce Labs Bike Light", price: 9.99 },
        { name: "Sauce Labs Bolt T-Shirt", price: 15.99 }
    ],
    config: {
        baseUrl: "https://www.saucedemo.com",
        timeout: 30000,
        headless: true
    }
};

console.log("Test Data Object:");
console.log(JSON.stringify(testData, null, 2));


// ═══════════════════════════════════════
// EXERCISE 6: Using Template Literals
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📝 EXERCISE 6: Template Literals in Action\n");

// Build URLs dynamically
const loginUrl = `${baseUrl}/`;
const inventoryUrl = `${baseUrl}/inventory.html`;
const cartUrl = `${baseUrl}/cart.html`;

console.log("Dynamic URLs:");
console.log(`  Login: ${loginUrl}`);
console.log(`  Inventory: ${inventoryUrl}`);
console.log(`  Cart: ${cartUrl}`);

// Build log messages
const testName = "Login Test";
const testStatus = "PASSED";
const duration = 2.5;

const logMessage = `[${new Date().toISOString()}] ${testName}: ${testStatus} (${duration}s)`;
console.log(`\nLog Message:\n  ${logMessage}`);


// ═══════════════════════════════════════
// EXERCISE 7: Assertions with Operators
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n✅ EXERCISE 7: Assertions with Operators\n");

// Simulate test assertions
const actualTitle = "Swag Labs";
const expectedTitle = "Swag Labs";
const actualPrice = 29.99;
const maxPrice = 50.00;
const cartItemCount = 3;
const isLoggedIn = true;

console.log("Test Assertions:");

// Equality check
const titleMatch = actualTitle === expectedTitle;
console.log(`  Title matches: ${titleMatch}`);

// Range check
const priceInRange = actualPrice > 0 && actualPrice <= maxPrice;
console.log(`  Price in range (0-50): ${priceInRange}`);

// Existence check
const hasItems = cartItemCount > 0;
console.log(`  Cart has items: ${hasItems}`);

// Combined check
const canCheckout = isLoggedIn && hasItems;
console.log(`  Can checkout: ${canCheckout}`);

// All assertions pass?
const allPassed = titleMatch && priceInRange && hasItems && canCheckout;
console.log(`\n  All assertions PASSED: ${allPassed}`);


// ═══════════════════════════════════════
// EXERCISE 8: Error Messages
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚠️ EXERCISE 8: Error Messages\n");

const errorMessages = {
    invalidCredentials: "Epic sadance: Username and password do not match",
    lockedOut: "Epic sadance: Sorry, this user has been locked out",
    requiredUsername: "Epic sadance: Username is required",
    requiredPassword: "Epic sadance: Password is required"
};

console.log("Expected Error Messages:");
Object.entries(errorMessages).forEach(([key, message]) => {
    console.log(`  ${key}:`);
    console.log(`    "${message}"`);
});


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 LAB SUMMARY\n");

console.log("You've created test data for:");
console.log("  ✓ User credentials (valid, invalid, locked)");
console.log("  ✓ Product information");
console.log("  ✓ Environment configuration");
console.log("  ✓ Page selectors");
console.log("  ✓ Combined test data objects");
console.log("  ✓ Dynamic URLs with template literals");
console.log("  ✓ Assertions using operators");
console.log("  ✓ Expected error messages");

console.log("\n💡 Next Steps:");
console.log("  • Move this data to a separate data file");
console.log("  • Use this data in your Playwright tests");
console.log("  • Add more test scenarios");

console.log("\n═══════════════════════════════════════\n");
