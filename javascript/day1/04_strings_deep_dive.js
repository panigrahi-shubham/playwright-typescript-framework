/**
 * ============================================
 * 04 - Strings Deep Dive
 * ============================================
 * 
 * Strings are the most used data type in automation.
 * Master these methods for effective testing!
 * 
 * Run this file: node 04_strings_deep_dive.js
 */

console.log("═══════════════════════════════════════");
console.log("   STRING METHODS & OPERATIONS");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. Template Literals (Backticks)
// ═══════════════════════════════════════
// The modern way to create dynamic strings

console.log("📝 TEMPLATE LITERALS\n");

const userName = "Shubham";
const userAge = 25;
const browser = "Chrome";

// Old way (concatenation)
const oldWay = "Hello, " + userName + "! You are " + userAge + " years old.";

// New way (template literals)
const newWay = `Hello, ${userName}! You are ${userAge} years old.`;

console.log("Old way:", oldWay);
console.log("New way:", newWay);

// Dynamic selectors (common in Playwright!)
const userId = "12345";
const selector = `#user-${userId}`;
const apiUrl = `https://api.example.com/users/${userId}`;

console.log("\nDynamic Examples:");
console.log("  Selector:", selector);
console.log("  API URL:", apiUrl);


// ═══════════════════════════════════════
// 2. String Properties
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n📏 STRING PROPERTIES\n");

const pageTitle = "Welcome to Dashboard";

console.log("String:", pageTitle);
console.log("Length:", pageTitle.length);  // 20 characters


// ═══════════════════════════════════════
// 3. Case Conversion
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🔤 CASE CONVERSION\n");

const mixedCase = "HeLLo WoRLd";

console.log("Original:", mixedCase);
console.log("Uppercase:", mixedCase.toUpperCase());  // HELLO WORLD
console.log("Lowercase:", mixedCase.toLowerCase());  // hello world

// Useful for case-insensitive comparison
const userInput = "ADMIN";
const expected = "admin";
const isMatch = userInput.toLowerCase() === expected.toLowerCase();
console.log("\nCase-insensitive match:", isMatch);  // true


// ═══════════════════════════════════════
// 4. Search Methods
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🔍 SEARCH METHODS\n");

const message = "Error: Login failed - invalid credentials";

// includes() - Check if contains substring
console.log("Contains 'Error':", message.includes("Error"));      // true
console.log("Contains 'Success':", message.includes("Success"));  // false

// startsWith() - Check beginning
console.log("Starts with 'Error':", message.startsWith("Error")); // true

// endsWith() - Check ending
console.log("Ends with 'credentials':", message.endsWith("credentials")); // true

// indexOf() - Find position (returns -1 if not found)
console.log("Index of 'Login':", message.indexOf("Login"));  // 7
console.log("Index of 'XYZ':", message.indexOf("XYZ"));      // -1


// ═══════════════════════════════════════
// 5. Trim & Clean
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n✂️  TRIM & CLEAN\n");

const dirtyInput = "   test@email.com   ";

console.log("Original: '" + dirtyInput + "'");
console.log("Trimmed: '" + dirtyInput.trim() + "'");
console.log("Trim Start: '" + dirtyInput.trimStart() + "'");
console.log("Trim End: '" + dirtyInput.trimEnd() + "'");

// Critical for form validation!
const email = "  user@test.com  ";
const cleanEmail = email.trim();
console.log("\nClean email:", cleanEmail);


// ═══════════════════════════════════════
// 6. Split & Join
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🔪 SPLIT & JOIN\n");

// Split - Break string into array
const csvData = "John,Doe,john@email.com,Active";
const fields = csvData.split(",");

console.log("CSV:", csvData);
console.log("Split result:", fields);
console.log("Email field:", fields[2]);

// Join - Combine array into string
const path = ["home", "user", "documents"];
const fullPath = path.join("/");
console.log("\nJoined path:", fullPath);  // home/user/documents

// Split by spaces
const sentence = "Welcome to Playwright Testing";
const words = sentence.split(" ");
console.log("Words:", words);


// ═══════════════════════════════════════
// 7. Slice & Substring
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n✂️  SLICE & SUBSTRING\n");

const longText = "JavaScript Automation";

// slice(start, end) - Extract portion
console.log("Full:", longText);
console.log("slice(0, 10):", longText.slice(0, 10));   // JavaScript
console.log("slice(11):", longText.slice(11));         // Automation
console.log("slice(-10):", longText.slice(-10));       // Automation (from end)

// Get first N characters
const preview = longText.slice(0, 5) + "...";
console.log("Preview:", preview);  // "JavaS..."


// ═══════════════════════════════════════
// 8. Replace
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🔄 REPLACE\n");

const original = "Hello World, World is great";

// replace() - First occurrence only
console.log("Original:", original);
console.log("Replace first:", original.replace("World", "JavaScript"));

// replaceAll() - All occurrences
console.log("Replace all:", original.replaceAll("World", "JS"));


// ═══════════════════════════════════════
// 9. Practical Automation Examples
// ═══════════════════════════════════════

console.log("\n─".repeat(45));
console.log("\n🎯 AUTOMATION EXAMPLES\n");

// Example 1: Validate page title
const actualTitle = "  Shopping Cart - Amazon  ";
const expectedTitle = "Shopping Cart";

const isValidTitle = actualTitle.trim().includes(expectedTitle);
console.log("Title Valid:", isValidTitle);

// Example 2: Parse error message
const errorLog = "Error 404: Page not found";
const errorCode = errorLog.split(":")[0].slice(-3);
console.log("Error Code:", errorCode);  // "404"

// Example 3: Build dynamic URL
const baseUrl = "https://api.example.com";
const endpoint = "/users";
const id = 123;
const fullUrl = `${baseUrl}${endpoint}/${id}`;
console.log("Full URL:", fullUrl);

// Example 4: Clean and validate email
const rawEmail = "  USER@Example.COM  ";
const normalizedEmail = rawEmail.trim().toLowerCase();
console.log("Normalized:", normalizedEmail);


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n─".repeat(45));
console.log("\n📋 STRING METHODS SUMMARY\n");

console.log("┌──────────────────┬─────────────────────────┐");
console.log("│ Method           │ Use Case                │");
console.log("├──────────────────┼─────────────────────────┤");
console.log("│ .length          │ Count characters        │");
console.log("│ .toUpperCase()   │ Convert to uppercase    │");
console.log("│ .toLowerCase()   │ Convert to lowercase    │");
console.log("│ .includes()      │ Check if contains       │");
console.log("│ .startsWith()    │ Check beginning         │");
console.log("│ .endsWith()      │ Check ending            │");
console.log("│ .trim()          │ Remove whitespace       │");
console.log("│ .split()         │ Break into array        │");
console.log("│ .slice()         │ Extract portion         │");
console.log("│ .replace()       │ Replace text            │");
console.log("└──────────────────┴─────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
