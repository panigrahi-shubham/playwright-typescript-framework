/**
 * ============================================
 * 05 - Objects and Arrays
 * ============================================
 * 
 * Complex data structures for organizing
 * test data, config, and collections.
 * 
 * Run this file: node 05_objects_and_arrays.js
 */

console.log("═══════════════════════════════════════");
console.log("   OBJECTS AND ARRAYS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. OBJECTS - Key-Value Pairs
// ═══════════════════════════════════════
// Objects group related data together
// Perfect for configuration and test data

console.log("📦 OBJECTS\n");

// Basic object syntax
const user = {
    firstName: "Shubham",
    lastName: "Panigrahi",
    email: "shubham@example.com",
    age: 25,
    isActive: true
};

console.log("User Object:", user);

// Accessing properties (two ways)
console.log("\nAccessing Properties:");
console.log("  Dot notation:", user.firstName);
console.log("  Bracket notation:", user["lastName"]);

// When to use bracket notation
const propertyName = "email";
console.log("  Dynamic access:", user[propertyName]);


// ═══════════════════════════════════════
// 2. Nested Objects
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🏠 NESTED OBJECTS\n");

const testConfig = {
    browser: "chromium",
    headless: true,
    viewport: {
        width: 1920,
        height: 1080
    },
    timeouts: {
        navigation: 30000,
        element: 5000,
        assertion: 10000
    },
    credentials: {
        username: "standard_user",
        password: "secret_sauce"
    }
};

console.log("Test Config:", testConfig);

// Accessing nested properties
console.log("\nNested Access:");
console.log("  Browser:", testConfig.browser);
console.log("  Width:", testConfig.viewport.width);
console.log("  Nav Timeout:", testConfig.timeouts.navigation);
console.log("  Username:", testConfig.credentials.username);


// ═══════════════════════════════════════
// 3. Modifying Objects
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n✏️  MODIFYING OBJECTS\n");

const settings = {
    theme: "light",
    language: "en"
};

console.log("Before:", settings);

// Update existing property
settings.theme = "dark";

// Add new property
settings.notifications = true;

// Delete property
delete settings.language;

console.log("After:", settings);


// ═══════════════════════════════════════
// 4. ARRAYS - Ordered Lists
// ═══════════════════════════════════════
// Arrays store multiple values in order
// Perfect for lists and collections

console.log("\n─".repeat(45));
console.log("\n📋 ARRAYS\n");

// Creating arrays
const browsers = ["chrome", "firefox", "safari", "edge"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null];

console.log("Browsers:", browsers);
console.log("Numbers:", numbers);
console.log("Mixed:", mixed);

// Accessing elements (0-indexed!)
console.log("\nAccessing Elements:");
console.log("  First browser:", browsers[0]);   // chrome
console.log("  Second browser:", browsers[1]);  // firefox
console.log("  Last browser:", browsers[browsers.length - 1]);  // edge


// ═══════════════════════════════════════
// 5. Array Properties & Methods
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🔧 ARRAY METHODS\n");

const fruits = ["apple", "banana", "orange"];

console.log("Original:", fruits);
console.log("Length:", fruits.length);

// Add to end
fruits.push("mango");
console.log("After push:", fruits);

// Remove from end
const removed = fruits.pop();
console.log("After pop:", fruits, "| Removed:", removed);

// Add to beginning
fruits.unshift("grape");
console.log("After unshift:", fruits);

// Remove from beginning
fruits.shift();
console.log("After shift:", fruits);

// Check if includes
console.log("Has banana?", fruits.includes("banana"));  // true
console.log("Has kiwi?", fruits.includes("kiwi"));      // false

// Find index
console.log("Index of orange:", fruits.indexOf("orange"));


// ═══════════════════════════════════════
// 6. Array of Objects (Common Pattern!)
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🎯 ARRAY OF OBJECTS\n");

const testCases = [
    { id: 1, name: "Login Test", status: "passed", duration: "2.3s" },
    { id: 2, name: "Search Test", status: "passed", duration: "1.5s" },
    { id: 3, name: "Checkout Test", status: "failed", duration: "3.1s" },
    { id: 4, name: "Profile Test", status: "passed", duration: "1.8s" }
];

console.log("Test Cases:");
console.table(testCases);

// Accessing specific test
console.log("\nFirst test:", testCases[0].name);
console.log("Third test status:", testCases[2].status);


// ═══════════════════════════════════════
// 7. Destructuring (Modern Syntax)
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n✨ DESTRUCTURING\n");

// Object destructuring
const config = {
    url: "https://example.com",
    port: 3000,
    debug: true
};

// Extract values into variables
const { url, port, debug } = config;

console.log("Destructured values:");
console.log("  URL:", url);
console.log("  Port:", port);
console.log("  Debug:", debug);

// Array destructuring
const colors = ["red", "green", "blue"];
const [primary, secondary, tertiary] = colors;

console.log("\nArray destructured:");
console.log("  Primary:", primary);
console.log("  Secondary:", secondary);


// ═══════════════════════════════════════
// 8. Spread Operator
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🌟 SPREAD OPERATOR\n");

// Copy array
const original = [1, 2, 3];
const copy = [...original];
console.log("Original:", original);
console.log("Copy:", copy);

// Merge arrays
const set1 = [1, 2];
const set2 = [3, 4];
const merged = [...set1, ...set2];
console.log("Merged:", merged);

// Copy object with modifications
const defaultConfig = { timeout: 5000, retries: 3 };
const customConfig = { ...defaultConfig, retries: 5, debug: true };
console.log("\nDefault:", defaultConfig);
console.log("Custom:", customConfig);


// ═══════════════════════════════════════
// 9. Practical Automation Examples
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🎯 AUTOMATION EXAMPLES\n");

// Example 1: Test Configuration
const playwrightConfig = {
    use: {
        baseURL: "https://saucedemo.com",
        trace: "on-first-retry",
        screenshot: "only-on-failure"
    },
    projects: [
        { name: "chrome", use: { browserName: "chromium" } },
        { name: "firefox", use: { browserName: "firefox" } }
    ]
};

console.log("Playwright Config:");
console.log(JSON.stringify(playwrightConfig, null, 2));

// Example 2: Page Object Selectors
const loginPage = {
    url: "/login",
    selectors: {
        usernameInput: "#user-name",
        passwordInput: "#password",
        loginButton: "#login-button",
        errorMessage: ".error-message-container"
    }
};

console.log("\nLogin Page Selectors:", loginPage.selectors.loginButton);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n─".repeat(45));
console.log("\n📋 SUMMARY\n");

console.log("OBJECTS:  { key: value } - Group related data");
console.log("ARRAYS:   [ item1, item2 ] - Ordered collections");
console.log("ACCESS:   obj.key or arr[index]");
console.log("METHODS:  push, pop, includes, indexOf");
console.log("MODERN:   Destructuring, Spread operator");

console.log("\n═══════════════════════════════════════\n");
