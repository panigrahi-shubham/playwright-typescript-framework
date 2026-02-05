/**
 * ============================================
 * 02 - Reference Types in JavaScript
 * ============================================
 * 
 * Day 2: Arrays and Objects - the workhorses of automation!
 * Reference types store a REFERENCE to data, not the data itself.
 * 
 * Run this file: node 02_reference_types.js
 */

console.log("═══════════════════════════════════════");
console.log("   REFERENCE DATA TYPES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// PRIMITIVE VS REFERENCE
// ═══════════════════════════════════════
console.log("📦 Primitive vs Reference Types:\n");
console.log("  PRIMITIVE: Value stored directly in variable");
console.log("    → string, number, boolean");
console.log("");
console.log("  REFERENCE: Variable holds a pointer to data");
console.log("    → array, object, function\n");


// ═══════════════════════════════════════
// 1. ARRAYS - Ordered Collections
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📚 ARRAYS - Ordered Collections\n");

// Creating arrays
const emptyArray = [];
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "cherry"];
const mixed = [1, "hello", true, null];

console.log("Creating Arrays:");
console.log("  Empty array:", emptyArray);
console.log("  Numbers:", numbers);
console.log("  Fruits:", fruits);
console.log("  Mixed types:", mixed);

// Automation arrays
console.log("\n🤖 Automation Array Examples:");
const testBrowsers = ["chromium", "firefox", "webkit"];
const userCredentials = ["user1", "user2", "admin"];
const testUrls = [
    "https://example.com/login",
    "https://example.com/dashboard",
    "https://example.com/settings"
];
const expectedErrors = [
    "Invalid username",
    "Password required",
    "Account locked"
];

console.log("  Browsers:", testBrowsers);
console.log("  Users:", userCredentials);
console.log("  URLs:", testUrls);
console.log("  Expected Errors:", expectedErrors);

// Accessing array elements (0-indexed!)
console.log("\n🔢 Accessing Elements (0-indexed):");
console.log("  fruits[0] (first):", fruits[0]);
console.log("  fruits[1] (second):", fruits[1]);
console.log("  fruits[2] (third):", fruits[2]);
console.log("  fruits[fruits.length - 1] (last):", fruits[fruits.length - 1]);

// Array properties and methods
console.log("\n📏 Array Properties & Methods:");
console.log("  Length:", fruits.length);

// Adding elements
const colors = ["red", "green"];
console.log("\n  Original:", colors);
colors.push("blue");
console.log("  After push('blue'):", colors);
colors.unshift("yellow");
console.log("  After unshift('yellow'):", colors);

// Removing elements
const removed = colors.pop();
console.log("  After pop():", colors, "- Removed:", removed);
const first = colors.shift();
console.log("  After shift():", colors, "- Removed:", first);

// Finding elements
console.log("\n🔍 Finding Elements:");
const browsers = ["chrome", "firefox", "safari", "edge"];
console.log("  Array:", browsers);
console.log("  indexOf('firefox'):", browsers.indexOf("firefox"));
console.log("  indexOf('opera'):", browsers.indexOf("opera"), "(not found)");
console.log("  includes('safari'):", browsers.includes("safari"));
console.log("  includes('opera'):", browsers.includes("opera"));

// Slicing and splicing
console.log("\n✂️ Slicing Arrays:");
const allBrowsers = ["chrome", "firefox", "safari", "edge", "opera"];
console.log("  Original:", allBrowsers);
console.log("  slice(1, 3):", allBrowsers.slice(1, 3));
console.log("  slice(2):", allBrowsers.slice(2));
console.log("  slice(-2):", allBrowsers.slice(-2));

// Joining arrays
console.log("\n🔗 Joining Arrays:");
const tags = ["smoke", "regression", "login"];
console.log("  Tags:", tags);
console.log("  join(', '):", tags.join(", "));
console.log("  join(' | '):", tags.join(" | "));


// ═══════════════════════════════════════
// 2. OBJECTS - Key-Value Collections
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🏠 OBJECTS - Key-Value Collections\n");

// Creating objects
const emptyObject = {};
const person = {
    name: "John Doe",
    age: 30,
    isActive: true
};

console.log("Creating Objects:");
console.log("  Empty object:", emptyObject);
console.log("  Person:", person);

// Automation object examples
console.log("\n🤖 Automation Object Examples:");

const testUser = {
    username: "standard_user",
    password: "secret_sauce",
    email: "test@example.com",
    role: "customer"
};
console.log("\n  Test User:", testUser);

const browserConfig = {
    headless: true,
    slowMo: 100,
    timeout: 30000,
    screenshot: "only-on-failure",
    video: "retain-on-failure"
};
console.log("\n  Browser Config:", browserConfig);

const pageLocators = {
    loginButton: "#login-button",
    usernameInput: "#user-name",
    passwordInput: "#password",
    errorMessage: ".error-message",
    submitBtn: "button[type='submit']"
};
console.log("\n  Page Locators:", pageLocators);

// Accessing object properties
console.log("\n🔍 Accessing Object Properties:");
console.log("  Two ways to access properties:");
console.log("    1. Dot notation: object.property");
console.log("    2. Bracket notation: object['property']\n");

console.log("  testUser.username:", testUser.username);
console.log("  testUser['password']:", testUser["password"]);

// Bracket notation is needed for:
const propName = "email";
console.log("  Using variable:", testUser[propName]);
console.log("  Keys with special chars: obj['my-key']");

// Adding and modifying properties
console.log("\n✏️ Modifying Objects:");
const settings = {
    theme: "dark",
    language: "en"
};
console.log("  Original:", settings);

settings.theme = "light";
console.log("  After settings.theme = 'light':", settings);

settings.notifications = true;
console.log("  After adding notifications:", settings);

delete settings.language;
console.log("  After delete settings.language:", settings);

// Checking properties
console.log("\n🔎 Checking Properties:");
const config = { timeout: 5000, retries: 3 };
console.log("  Object:", config);
console.log("  'timeout' in config:", "timeout" in config);
console.log("  'browser' in config:", "browser" in config);
console.log("  config.hasOwnProperty('retries'):", config.hasOwnProperty("retries"));

// Object methods
console.log("\n📋 Object Methods:");
const testData = { name: "Test", value: 100, active: true };
console.log("  Object:", testData);
console.log("  Object.keys():", Object.keys(testData));
console.log("  Object.values():", Object.values(testData));
console.log("  Object.entries():", Object.entries(testData));


// ═══════════════════════════════════════
// 3. NESTED STRUCTURES
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🎭 NESTED STRUCTURES\n");

// Objects containing arrays
const testSuite = {
    name: "Login Tests",
    browsers: ["chromium", "firefox"],
    tags: ["smoke", "regression"],
    timeout: 30000
};
console.log("Object with Arrays:");
console.log(testSuite);
console.log("  First browser:", testSuite.browsers[0]);

// Arrays containing objects
const users = [
    { username: "admin", role: "admin" },
    { username: "user1", role: "customer" },
    { username: "user2", role: "customer" }
];
console.log("\nArray of Objects:");
console.log(users);
console.log("  First user's role:", users[0].role);

// Deeply nested structure (common in API responses)
const apiResponse = {
    status: 200,
    data: {
        user: {
            id: 123,
            profile: {
                name: "John Doe",
                email: "john@example.com"
            }
        },
        products: [
            { id: 1, name: "Product A", price: 29.99 },
            { id: 2, name: "Product B", price: 49.99 }
        ]
    }
};
console.log("\nDeeply Nested (API Response style):");
console.log("  User name:", apiResponse.data.user.profile.name);
console.log("  First product:", apiResponse.data.products[0].name);


// ═══════════════════════════════════════
// 4. REFERENCE BEHAVIOR
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n⚠️ REFERENCE BEHAVIOR (Important!)\n");

// Primitives are copied by value
let num1 = 10;
let num2 = num1;
num2 = 20;
console.log("Primitives (copied by value):");
console.log("  num1 =", num1);
console.log("  num2 =", num2);
console.log("  Changing num2 doesn't affect num1!\n");

// References point to the same object
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log("References (point to same data):");
console.log("  arr1 =", arr1);
console.log("  arr2 =", arr2);
console.log("  Changing arr2 DOES affect arr1!\n");

// How to copy arrays/objects
console.log("📋 Creating True Copies:");
const original = [1, 2, 3];
const copy = [...original];  // Spread operator
copy.push(4);
console.log("  Original:", original);
console.log("  Copy:", copy);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 REFERENCE TYPES SUMMARY\n");

console.log("┌───────────┬────────────────────────────────────┐");
console.log("│ Type      │ Use Case                           │");
console.log("├───────────┼────────────────────────────────────┤");
console.log("│ Array     │ Lists: browsers, users, URLs       │");
console.log("│ Object    │ Config: credentials, selectors     │");
console.log("│ Nested    │ API responses, complex test data   │");
console.log("└───────────┴────────────────────────────────────┘");

console.log("\n💡 Key Points:");
console.log("  • Arrays are ordered, accessed by index [0, 1, 2...]");
console.log("  • Objects are key-value pairs, accessed by key");
console.log("  • References point to data, not copy it");
console.log("  • Use spread operator [...] to create copies");

console.log("\n═══════════════════════════════════════\n");
