/**
 * ============================================
 * 07 - Loop Control: break, continue & Labels
 * ============================================
 * 
 * Day 3: Controlling loop execution flow
 * Run: node 07_loop_control.js
 */

console.log("═══════════════════════════════════════");
console.log("   LOOP CONTROL: break & continue");
console.log("═══════════════════════════════════════\n");


// ═══════════════════════════════════════
// 1. BREAK — Exit Loop Immediately
// ═══════════════════════════════════════
console.log("📌 BREAK — Exit Loop Immediately\n");

// Find first premium user and stop
const users = [
    { name: "Alice", type: "basic" },
    { name: "Bob", type: "premium" },
    { name: "Charlie", type: "premium" }
];

let firstPremium = null;

for (const user of users) {
    if (user.type === "premium") {
        firstPremium = user;
        break; // Stop looking, we found one!
    }
    console.log(`  Checked: ${user.name} (${user.type})`);
}

console.log(`  First premium: ${firstPremium.name}`);
console.log("  ✅ Didn't check Charlie — break stopped the loop\n");


// ═══════════════════════════════════════
// 2. BREAK — Automation: Stop at First Failure
// ═══════════════════════════════════════
console.log("─".repeat(45));
console.log("\n🤖 BREAK — Stop at First Critical Failure\n");

const criticalElements = [".header", ".nav", ".main-content", ".footer"];

// Simulate element visibility
const elementStatus = {
    ".header": true,
    ".nav": true,
    ".main-content": false,  // This one is missing!
    ".footer": true
};

for (const selector of criticalElements) {
    const isVisible = elementStatus[selector];

    if (!isVisible) {
        console.log(`  ❌ Critical element missing: ${selector}`);
        console.log("  📸 Taking screenshot...");
        break; // Stop test — can't proceed
    }
    console.log(`  ✅ Found: ${selector}`);
}


// ═══════════════════════════════════════
// 3. CONTINUE — Skip to Next Iteration
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 CONTINUE — Skip to Next Iteration\n");

// Process only active users, skip inactive
const allUsers = [
    { name: "Alice", isActive: true },
    { name: "Bob", isActive: false },    // Skip this
    { name: "Charlie", isActive: true },
    { name: "Dave", isActive: false }    // Skip this
];

for (const user of allUsers) {
    if (!user.isActive) {
        continue; // Skip inactive users
    }

    // Only runs for active users
    console.log(`  ✅ Notified ${user.name}`);
}


// ═══════════════════════════════════════
// 4. CONTINUE — Skip Known Flaky Tests
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n🤖 CONTINUE — Skip Known Issues\n");

const testCases = [
    { name: "login", skip: false },
    { name: "payment", skip: true },     // Known issue
    { name: "search", skip: false },
    { name: "checkout", skip: false },
    { name: "profile", skip: true }      // Known issue
];

for (const test of testCases) {
    if (test.skip) {
        console.log(`  ⏭️ Skipping ${test.name} (known issue)`);
        continue;
    }

    console.log(`  ✅ Running ${test.name}`);
}


// ═══════════════════════════════════════
// 5. CONTINUE — Skip Invalid Data
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 CONTINUE — Skip Invalid Data\n");

const ids = [1, -1, 2, null, 3, undefined, 4, -5];

console.log("  Processing valid IDs only:");
for (const id of ids) {
    if (!id || id < 0) {
        continue; // Skip null, undefined, negative
    }
    console.log(`  ✅ Processing ID: ${id}`);
}


// ═══════════════════════════════════════
// 6. LABELED STATEMENTS — Break Outer Loop
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📌 LABELED STATEMENTS — Break Outer Loop\n");

// Find matching product in nested categories
const categories = [
    { name: "Electronics", products: ["Phone", "Laptop", "Tablet"] },
    { name: "Clothing", products: ["Shirt", "Pants", "Jacket"] },
    { name: "Books", products: ["Fiction", "Non-Fiction"] }
];

const searchFor = "Laptop";
let foundCategory = null;

outer: for (const category of categories) {
    for (const product of category.products) {
        if (product === searchFor) {
            foundCategory = category.name;
            console.log(`  ✅ Found "${searchFor}" in ${category.name}`);
            break outer; // Break out of BOTH loops
        }
    }
    console.log(`  Searched: ${category.name} — not here`);
}

// Without 'break outer', only the inner loop would break
// and we'd continue searching other categories unnecessarily


// ═══════════════════════════════════════
// 7. BREAK vs RETURN
// ═══════════════════════════════════════
console.log("\n" + "─".repeat(45));
console.log("\n📋 BREAK vs RETURN vs CONTINUE\n");

console.log("  ┌───────────┬──────────────────────────────────┐");
console.log("  │ Keyword   │ What it Does                     │");
console.log("  ├───────────┼──────────────────────────────────┤");
console.log("  │ break     │ Exits the LOOP only              │");
console.log("  │ continue  │ Skips to NEXT iteration          │");
console.log("  │ return    │ Exits the ENTIRE function        │");
console.log("  └───────────┴──────────────────────────────────┘");

// Demonstration
function findAdmin(userList) {
    for (const user of userList) {
        if (user.type === "admin") {
            return user; // Exits FUNCTION, not just loop
        }
    }
    return null;
}

const admin = findAdmin(users);
console.log(`\n  findAdmin returned: ${admin ? admin.name : "null"}`);

console.log("\n═══════════════════════════════════════\n");
