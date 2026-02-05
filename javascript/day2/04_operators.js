/**
 * ============================================
 * 04 - Operators in JavaScript
 * ============================================
 * 
 * Day 2: Comparison and Logical Operators
 * Run this file: node 04_operators.js
 */

console.log("═══════════════════════════════════════");
console.log("   COMPARISON & LOGICAL OPERATORS");
console.log("═══════════════════════════════════════\n");

// ═══════════════════════════════════════
// EQUALITY: === vs ==
// ═══════════════════════════════════════
console.log("⚖️ EQUALITY OPERATORS\n");

console.log("=== (Strict Equality) - Checks value AND type:");
console.log("  5 === 5:", 5 === 5);
console.log("  5 === '5':", 5 === "5");
console.log("  'hello' === 'hello':", "hello" === "hello");

console.log("\n== (Loose Equality) - Type coercion:");
console.log("  5 == '5':", 5 == "5");
console.log("  true == 1:", true == 1);

console.log("\n⚠️ BEST PRACTICE: Always use === (strict equality)\n");

// ═══════════════════════════════════════
// INEQUALITY: !== vs !=
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n🚫 INEQUALITY OPERATORS\n");

console.log("!== (Strict Inequality):");
console.log("  5 !== 10:", 5 !== 10);
console.log("  5 !== '5':", 5 !== "5");

console.log("\n⚠️ Always use !== (strict inequality)\n");

// ═══════════════════════════════════════
// COMPARISON OPERATORS
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n📊 COMPARISON OPERATORS\n");

const a = 10, b = 5;
console.log(`Using a = ${a}, b = ${b}:\n`);
console.log("  a > b:", a > b);
console.log("  a < b:", a < b);
console.log("  a >= b:", a >= b);
console.log("  a <= b:", a <= b);

// ═══════════════════════════════════════
// LOGICAL AND: &&
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔗 LOGICAL AND (&&)\n");

console.log("Both conditions must be TRUE:\n");
console.log("  true && true:", true && true);
console.log("  true && false:", true && false);
console.log("  false && true:", false && true);

const isLoggedIn = true, hasPermission = true;
console.log(`\n  ${isLoggedIn} && ${hasPermission}:`, isLoggedIn && hasPermission);

// ═══════════════════════════════════════
// LOGICAL OR: ||
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔀 LOGICAL OR (||)\n");

console.log("At least ONE must be TRUE:\n");
console.log("  true || false:", true || false);
console.log("  false || true:", false || true);
console.log("  false || false:", false || false);

// Default value pattern
const userInput = "";
const defaultValue = userInput || "default_user";
console.log(`\n  "" || "default_user": "${defaultValue}"`);

// ═══════════════════════════════════════
// LOGICAL NOT: !
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🔄 LOGICAL NOT (!)\n");

console.log("  !true:", !true);
console.log("  !false:", !false);

console.log("\n  !! (Double NOT - Boolean conversion):");
console.log('  !!"hello":', !!"hello");
console.log('  !!"":', !!"");
console.log("  !!0:", !!0);

// ═══════════════════════════════════════
// COMBINING OPERATORS
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🧩 COMBINING OPERATORS\n");

const user = { isLoggedIn: true, role: "admin", isVerified: true };
const canModerate = user.isLoggedIn && user.role === "admin" && user.isVerified;
console.log("Can moderate:", canModerate);

console.log("\n📋 Precedence: ! → && → ||");
console.log("Use parentheses () to control order!");

// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 OPERATORS SUMMARY\n");

console.log("┌──────────┬────────────────────────────┐");
console.log("│ Operator │ Description                │");
console.log("├──────────┼────────────────────────────┤");
console.log("│ ===      │ Strict equality            │");
console.log("│ !==      │ Strict inequality          │");
console.log("│ >  <     │ Greater/Less than          │");
console.log("│ >= <=    │ Greater/Less or equal      │");
console.log("│ &&       │ AND - both must be true    │");
console.log("│ ||       │ OR - one must be true      │");
console.log("│ !        │ NOT - inverts boolean      │");
console.log("└──────────┴────────────────────────────┘");

console.log("\n═══════════════════════════════════════\n");
