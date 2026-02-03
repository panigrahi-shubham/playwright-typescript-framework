/**
 * ============================================
 * 08 - Practice Exercises
 * ============================================
 * Test your Day 1 knowledge!
 * Run: node 08_practice_exercises.js
 */

console.log("═══════════════════════════════════════");
console.log("   DAY 1 PRACTICE EXERCISES");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// EXERCISE 1: Variable Declaration
// ═══════════════════════════════════════
console.log("📝 EXERCISE 1: Variables\n");

// TODO: Create a const for your name
const myName = "YOUR_NAME_HERE";

// TODO: Create a const for your age
const myAge = 0;

// TODO: Create a let for your current mood
let currentMood = "happy";

console.log(`Hello, I'm ${myName}!`);
console.log(`I'm ${myAge} years old.`);
console.log(`Current mood: ${currentMood}`);

// Try changing currentMood
currentMood = "excited";
console.log(`Updated mood: ${currentMood}\n`);


// ═══════════════════════════════════════
// EXERCISE 2: Data Types
// ═══════════════════════════════════════
console.log("─".repeat(40));
console.log("\n📝 EXERCISE 2: Data Types\n");

// TODO: Create variables of each type
const websiteUrl = "https://example.com";  // string
const timeout = 5000;                       // number
const isHeadless = true;                    // boolean
let apiResponse = null;                     // null
let notYetDefined;                          // undefined

console.log("Type check:");
console.log(`  websiteUrl: ${typeof websiteUrl}`);
console.log(`  timeout: ${typeof timeout}`);
console.log(`  isHeadless: ${typeof isHeadless}`);
console.log(`  apiResponse: ${typeof apiResponse}`);
console.log(`  notYetDefined: ${typeof notYetDefined}\n`);


// ═══════════════════════════════════════
// EXERCISE 3: String Methods
// ═══════════════════════════════════════
console.log("─".repeat(40));
console.log("\n📝 EXERCISE 3: String Methods\n");

const pageTitle = "  Welcome to Amazon Shopping  ";

// TODO: Clean and analyze the title
console.log("Original:", `"${pageTitle}"`);
console.log("Trimmed:", `"${pageTitle.trim()}"`);
console.log("Length:", pageTitle.trim().length);
console.log("Uppercase:", pageTitle.trim().toUpperCase());
console.log("Contains 'Amazon':", pageTitle.includes("Amazon"));
console.log("Starts with 'Welcome':", pageTitle.trim().startsWith("Welcome"));


// ═══════════════════════════════════════
// EXERCISE 4: Objects
// ═══════════════════════════════════════
console.log("\n─".repeat(40));
console.log("\n📝 EXERCISE 4: Objects\n");

// TODO: Create a test configuration object
const testConfig = {
    browser: "chrome",
    headless: true,
    timeout: 30000,
    viewport: {
        width: 1920,
        height: 1080
    }
};

console.log("Browser:", testConfig.browser);
console.log("Headless:", testConfig.headless);
console.log("Viewport:", `${testConfig.viewport.width}x${testConfig.viewport.height}`);


// ═══════════════════════════════════════
// EXERCISE 5: Arrays
// ═══════════════════════════════════════
console.log("\n─".repeat(40));
console.log("\n📝 EXERCISE 5: Arrays\n");

const browsers = ["chrome", "firefox", "safari"];

console.log("Browsers:", browsers);
console.log("First:", browsers[0]);
console.log("Count:", browsers.length);

// Add edge to the array
browsers.push("edge");
console.log("After push:", browsers);

// Check if includes
console.log("Has 'chrome':", browsers.includes("chrome"));


// ═══════════════════════════════════════
// CHALLENGE: Build a Test Report
// ═══════════════════════════════════════
console.log("\n─".repeat(40));
console.log("\n🏆 CHALLENGE: Build a Test Report\n");

const testResults = [
    { name: "Login Test", status: "passed", duration: 2.3 },
    { name: "Search Test", status: "passed", duration: 1.5 },
    { name: "Checkout Test", status: "failed", duration: 3.1 }
];

let totalTests = testResults.length;
let passedTests = 0;
let failedTests = 0;
let totalDuration = 0;

// Count results manually
for (const test of testResults) {
    if (test.status === "passed") {
        passedTests++;
    } else {
        failedTests++;
    }
    totalDuration += test.duration;
}

console.log("Test Report:");
console.log(`  Total: ${totalTests}`);
console.log(`  Passed: ${passedTests}`);
console.log(`  Failed: ${failedTests}`);
console.log(`  Duration: ${totalDuration.toFixed(1)}s`);
console.log(`  Pass Rate: ${((passedTests / totalTests) * 100).toFixed(0)}%`);

console.table(testResults);


console.log("\n═══════════════════════════════════════");
console.log("   ✅ Great job completing Day 1!");
console.log("═══════════════════════════════════════\n");
