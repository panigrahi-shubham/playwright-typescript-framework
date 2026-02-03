/**
 * ============================================
 * 02 - Variables: const, let, and var
 * ============================================
 * 
 * Variables are containers that store data.
 * Think of them as labeled boxes where you 
 * keep information for later use.
 * 
 * Run this file: node 02_variables_basics.js
 */

console.log("═══════════════════════════════════════");
console.log("   JAVASCRIPT VARIABLES EXPLAINED");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. CONST - Constant (Cannot be changed)
// ═══════════════════════════════════════
// Use const when the value should NEVER change.
// This is your DEFAULT choice - use it 90% of time!

console.log("📌 CONST - Fixed Values\n");

const APP_NAME = "My Automation Framework";
const BASE_URL = "https://www.saucedemo.com";
const MAX_RETRIES = 3;
const PI = 3.14159;

console.log("App Name:", APP_NAME);
console.log("Base URL:", BASE_URL);
console.log("Max Retries:", MAX_RETRIES);
console.log("PI Value:", PI);

// ❌ This would cause an error (uncomment to test):
// BASE_URL = "https://google.com";  // TypeError!

console.log("\n✅ Rule: Use const for config, URLs, limits\n");


// ═══════════════════════════════════════
// 2. LET - Can be changed (Reassignable)
// ═══════════════════════════════════════
// Use let when the value WILL change during execution.
// Common for counters, status flags, and dynamic data.

console.log("─".repeat(45));
console.log("\n📌 LET - Changeable Values\n");

let currentPage = "Login";
let retryCount = 0;
let isLoggedIn = false;
let userEmail = "";

console.log("Initial State:");
console.log("  Page:", currentPage);
console.log("  Retries:", retryCount);
console.log("  Logged In:", isLoggedIn);

// Now let's change them (simulating test flow)
currentPage = "Dashboard";
retryCount = 1;
isLoggedIn = true;
userEmail = "test@example.com";

console.log("\nAfter Update:");
console.log("  Page:", currentPage);
console.log("  Retries:", retryCount);
console.log("  Logged In:", isLoggedIn);
console.log("  Email:", userEmail);

console.log("\n✅ Rule: Use let for state, counters, dynamic data\n");


// ═══════════════════════════════════════
// 3. VAR - Old Way (DON'T USE!)
// ═══════════════════════════════════════
// var was used before 2015 (ES6). It has scoping 
// issues that can cause unexpected bugs.

console.log("─".repeat(45));
console.log("\n⚠️  VAR - Avoid This!\n");

var oldVariable = "I'm from the past";
console.log("var example:", oldVariable);

// Problems with var:
// 1. Function-scoped (not block-scoped)
// 2. Can be redeclared accidentally
// 3. Hoisted in confusing ways

var oldVariable = "I just got redeclared!"; // No error! 🐛
console.log("Redeclared:", oldVariable);

console.log("\n❌ Rule: Never use var - use const or let\n");


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📋 SUMMARY\n");
console.log("  const  → Cannot change (90% usage)");
console.log("  let    → Can change (10% usage)");
console.log("  var    → Don't use ever! ❌");
console.log("\n═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// TRY IT YOURSELF
// ═══════════════════════════════════════
// 1. Create a const for your name
// 2. Create a let for your current mood
// 3. Update your mood and print both
