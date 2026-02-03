/**
 * ============================================
 * 07 - Variables in Automation Context
 * ============================================
 * Run: node 07_automation_variables.js
 */

console.log("═══════════════════════════════════════");
console.log("   AUTOMATION VARIABLES EXAMPLE");
console.log("═══════════════════════════════════════\n");

// ═══════════════════════════════════════
// CONST - Configuration (Never changes)
// ═══════════════════════════════════════

// URLs
const BASE_URL = "https://www.saucedemo.com";
const LOGIN_PAGE = `${BASE_URL}/`;
const INVENTORY_PAGE = `${BASE_URL}/inventory.html`;

// Credentials
const VALID_USERNAME = "standard_user";
const VALID_PASSWORD = "secret_sauce";

// Timeouts
const DEFAULT_TIMEOUT = 30000;
const ELEMENT_TIMEOUT = 5000;

// Selectors
const SELECTORS = {
    usernameInput: "#user-name",
    passwordInput: "#password",
    loginButton: "#login-button",
    cartBadge: ".shopping_cart_badge"
};

console.log("📋 Configuration:");
console.table({
    "Base URL": BASE_URL,
    "Timeout": `${DEFAULT_TIMEOUT}ms`,
    "Username": VALID_USERNAME
});


// ═══════════════════════════════════════
// LET - Test State (Changes during test)
// ═══════════════════════════════════════

console.log("\n─".repeat(40));
console.log("\n📊 Test State Variables\n");

let testStatus = "NOT_STARTED";
let isLoggedIn = false;
let currentPage = "";
let cartCount = 0;
let retryAttempt = 0;

console.log("Initial State:");
console.table({
    "Status": testStatus,
    "Logged In": isLoggedIn,
    "Cart Items": cartCount
});

// Simulating test execution
console.log("\n🧪 Simulating Test...\n");

testStatus = "RUNNING";
currentPage = LOGIN_PAGE;
console.log(`Step 1: Navigate to ${currentPage}`);

isLoggedIn = true;
currentPage = INVENTORY_PAGE;
console.log(`Step 2: Login successful, on ${currentPage}`);

cartCount = 2;
console.log(`Step 3: Added ${cartCount} items to cart`);

testStatus = "PASSED";
console.log(`Step 4: Test ${testStatus}`);

console.log("\nFinal State:");
console.table({
    "Status": testStatus,
    "Logged In": isLoggedIn,
    "Cart Items": cartCount
});

console.log("\n═══════════════════════════════════════\n");
