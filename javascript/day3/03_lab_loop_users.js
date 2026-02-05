/**
 * ============================================
 * 03 - Lab: Loop Through Test Users
 * ============================================
 * 
 * Day 3 Lab: Validate conditions with loops
 * Run: node 03_lab_loop_users.js
 */

console.log("═══════════════════════════════════════");
console.log("   LAB: LOOP THROUGH TEST USERS");
console.log("═══════════════════════════════════════\n");

// ═══════════════════════════════════════
// TEST DATA
// ═══════════════════════════════════════
const testUsers = [
    { username: "standard_user", password: "secret_sauce", role: "customer", active: true },
    { username: "locked_out_user", password: "secret_sauce", role: "customer", active: false },
    { username: "admin_user", password: "admin123", role: "admin", active: true },
    { username: "problem_user", password: "secret_sauce", role: "customer", active: true }
];

console.log(`Total users: ${testUsers.length}\n`);


// ═══════════════════════════════════════
// EXERCISE 1: Loop and display all users
// ═══════════════════════════════════════
console.log("📋 EXERCISE 1: Display All Users\n");

for (const user of testUsers) {
    const status = user.active ? "✓ Active" : "✗ Locked";
    console.log(`  ${user.username} (${user.role}) - ${status}`);
}


// ═══════════════════════════════════════
// EXERCISE 2: Filter active users only
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 2: Active Users Only\n");

for (const user of testUsers) {
    if (!user.active) continue;  // Skip inactive
    console.log(`  ✓ ${user.username} can login`);
}


// ═══════════════════════════════════════
// EXERCISE 3: Find admin user
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 3: Find Admin\n");

let adminFound = null;

for (const user of testUsers) {
    if (user.role === "admin") {
        adminFound = user;
        break;  // Stop once found
    }
}

if (adminFound) {
    console.log(`  Admin found: ${adminFound.username}`);
} else {
    console.log("  No admin user found");
}


// ═══════════════════════════════════════
// EXERCISE 4: Validate all users
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 4: Validate Users\n");

let validCount = 0;
let invalidCount = 0;

for (const user of testUsers) {
    // Validation rules
    const hasUsername = user.username && user.username.length > 0;
    const hasPassword = user.password && user.password.length >= 6;
    const isValid = hasUsername && hasPassword;

    if (isValid) {
        validCount++;
        console.log(`  ✓ ${user.username} - Valid`);
    } else {
        invalidCount++;
        console.log(`  ✗ ${user.username} - Invalid`);
    }
}

console.log(`\n  Results: ${validCount} valid, ${invalidCount} invalid`);


// ═══════════════════════════════════════
// EXERCISE 5: Simulate login tests
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 EXERCISE 5: Simulate Login Tests\n");

for (let i = 0; i < testUsers.length; i++) {
    const user = testUsers[i];
    const testNumber = i + 1;

    // Simulate test result based on active status
    const testResult = user.active ? "PASSED" : "FAILED (locked)";

    console.log(`  Test ${testNumber}: Login as ${user.username} - ${testResult}`);
}


// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 SUMMARY\n");

console.log("  Patterns used:");
console.log("    • for...of to iterate arrays");
console.log("    • continue to skip items");
console.log("    • break to stop early");
console.log("    • if-else for validation");
console.log("    • ternary for inline conditions");

console.log("\n═══════════════════════════════════════\n");
